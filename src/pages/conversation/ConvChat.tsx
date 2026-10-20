import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { ConvSession, ConvSettings } from '../../conversation/types';
import { applyTurn, learnerMessage, setStatus } from '../../conversation/store';
import { DemoProvider } from '../../conversation/provider';
import { DEMO_SCRIPTS } from '../../conversation/demo';
import { useConv } from '../../conversation/ConvContext';
import { speechLangOf, useAppData } from '../../state/AppDataContext';
import { listenOnce, recognitionSupported, type ListenError } from '../../lib/recognition';
import { COURSES } from '../../courses';
import { useI18n } from '../../i18n/LocaleContext';
import { Badge, Button, ButtonLink, Card, cx } from '../../components/ui';
import { Icon } from '../../components/Icon';
import { LearnerBubble, PartnerBubble } from '../../components/conversation/Messages';
import { SuggestPanel } from '../../components/conversation/SuggestPanel';
import { SummaryCard } from '../../components/conversation/SummaryCard';
import { ProviderBadge, appendToDraft, errorKindOf, startConversation, targetProps, useGloss, useScenarioLabel, type ErrorKind } from '../../components/conversation/shared';

const MAX_DRAFT = 500;

/** /conversation/session/:id — the chat, or the read-only transcript and summary of a finished conversation. */
export default function ConvChat() {
  const { id } = useParams();
  const { t } = useI18n();
  const { session } = useConv();
  const s = session(id);
  if (!s) {
    return (
      <Card>
        <p className="text-sm">{t('conv.chat.notFound')}</p>
        <ButtonLink to="/conversation" variant="secondary" className="mt-3">{t('conv.chat.back')}</ButtonLink>
      </Card>
    );
  }
  return <Chat key={s.id} s={s} />;
}

type MicState = { s: 'idle' } | { s: 'listening' } | { s: 'error'; error: ListenError };

function Chat({ s }: { s: ConvSession }) {
  const { t, tr } = useI18n();
  const { data, provider, putSession, updateSettings } = useConv();
  const { data: appData } = useAppData();
  const navigate = useNavigate();
  const scenarioLabel = useScenarioLabel();
  const { setup } = s;
  const course = COURSES[setup.lang];
  const tp = targetProps(setup.lang);
  const { g, gLang } = useGloss(setup.lang);
  const settings = data.settings;

  // A session keeps the kind of partner it started with; a demo session always continues with the demo.
  const sessionProvider = useMemo(() => (s.provider === provider.kind ? provider : s.provider === 'demo' ? new DemoProvider() : null), [s.provider, provider]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState<'reply' | 'finish' | 'restart' | null>(null);
  const [error, setError] = useState<{ kind: ErrorKind; op: 'reply' | 'finish' | 'restart' } | null>(null);
  const [scriptOver, setScriptOver] = useState(false);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [mic, setMic] = useState<MicState>({ s: 'idle' });
  const [canListen] = useState(recognitionSupported);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const cancelMic = useRef<(() => void) | null>(null);
  useEffect(() => () => cancelMic.current?.(), []);

  const finished = s.status === 'finished';
  const last = s.messages.at(-1);
  const script = s.demo ? DEMO_SCRIPTS.find((x) => x.id === s.demo!.scriptId) : undefined;
  const ended = scriptOver || (!!script && !!s.demo && s.demo.turn >= script.turns.length && last?.role === 'partner');
  const unanswered = !finished && last?.role === 'learner' && busy !== 'reply';

  // Reopening a paused conversation makes it active again.
  useEffect(() => {
    if (s.status === 'paused') putSession(setStatus(s, 'active'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [s.messages.length, busy]);

  const requestReply = async (cur: ConvSession) => {
    setError(null);
    if (!sessionProvider) {
      setError({ kind: 'network', op: 'reply' });
      return;
    }
    setBusy('reply');
    try {
      const turn = await sessionProvider.reply(cur.setup, cur.messages, { feedback: settings.feedback, demoTurn: cur.demo ? cur.demo.turn - 1 : undefined, demoScriptId: cur.demo?.scriptId });
      putSession(applyTurn(cur, turn));
      if (turn.scriptEnded) setScriptOver(true);
    } catch (e) {
      const kind = errorKindOf(e);
      if (cur.provider === 'demo' && kind === 'input') setScriptOver(true);
      else setError({ kind, op: 'reply' });
    } finally {
      setBusy(null);
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const send = () => {
    const text = draft.trim();
    if (!text || busy || finished || ended) return;
    const now = new Date();
    const next: ConvSession = { ...s, messages: [...s.messages, learnerMessage(text, now)], updatedAt: now.toISOString(), status: 'active' };
    putSession(next);
    setDraft('');
    void requestReply(next);
  };

  const finish = async (withSummary = true) => {
    setError(null);
    if (!withSummary || !sessionProvider) {
      if (!withSummary) putSession(setStatus(s, 'finished'));
      else setError({ kind: 'network', op: 'finish' });
      return;
    }
    setBusy('finish');
    try {
      const summary = await sessionProvider.summarize(setup, s.messages, { demoScriptId: s.demo?.scriptId });
      putSession({ ...setStatus(s, 'finished'), summary });
    } catch (e) {
      setError({ kind: errorKindOf(e), op: 'finish' });
    } finally {
      setBusy(null);
    }
  };

  const restart = async () => {
    setError(null);
    setBusy('restart');
    try {
      const fresh = await startConversation(provider, setup);
      if (!finished) putSession(setStatus(s, 'paused'));
      putSession(fresh);
      navigate(`/conversation/session/${fresh.id}`);
    } catch (e) {
      setError({ kind: errorKindOf(e), op: 'restart' });
      setBusy(null);
    }
  };

  const pause = () => {
    putSession(setStatus(s, 'paused'));
    navigate('/conversation');
  };

  const insert = (text: string, focus = true) => {
    setDraft((d) => appendToDraft(d, text, setup.lang).slice(0, MAX_DRAFT));
    if (focus) inputRef.current?.focus();
  };

  const listen = async () => {
    cancelMic.current?.();
    setMic({ s: 'listening' });
    const { result, cancel } = listenOnce(speechLangOf(course, appData.settings));
    cancelMic.current = cancel;
    const r = await result;
    cancelMic.current = null;
    if (r.ok) {
      setMic({ s: 'idle' });
      insert(r.transcripts[0]);
    } else setMic({ s: 'error', error: r.error });
  };
  const stopMic = () => {
    cancelMic.current?.();
    cancelMic.current = null;
    setMic({ s: 'idle' });
  };

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send();
    }
  };

  const toggle = (key: keyof Pick<ConvSettings, 'showTranslation' | 'showPron' | 'showDetails' | 'feedback'>, disabled = false) => (
    <label className={cx('inline-flex items-center gap-1.5 text-sm', disabled && 'opacity-50')}>
      <input type="checkbox" className="accent-sky-500" checked={settings[key] && !disabled} disabled={disabled} onChange={(e) => updateSettings({ [key]: e.target.checked })} />
      {t(`conv.chat.${key}`)}
    </label>
  );

  const canCompose = !finished && !ended;

  return (
    <div className="space-y-4">
      <div>
        <Link to="/conversation" className="inline-flex items-center gap-1 text-sm text-sky-700 hover:underline"><Icon name="left" className="h-4 w-4" />{t('conv.chat.back')}</Link>
        <h1 className="mt-2 break-words text-xl font-semibold">{scenarioLabel(setup)}</h1>
        <div className="mt-1 flex flex-wrap gap-1.5">
          <Badge tone="sky"><span lang={course.speechLang} className={cx(course.fontClass, 'mr-1')}>{course.endonym}</span>{tr(course.name)}</Badge>
          <Badge tone="gray">{t(`conv.level.${setup.level}`)}</Badge>
          <Badge tone="gray">{t(`conv.mode.${setup.mode}`)}</Badge>
          <ProviderBadge kind={s.provider} />
          {finished && <Badge tone="green">{t('conv.status.finished')}</Badge>}
        </div>
      </div>

      {s.provider === 'demo' && !finished && <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800">{t('conv.home.demoText')}</p>}

      <details className="rounded-xl border border-line bg-white px-3 py-2 text-sm">
        <summary className="cursor-pointer font-medium">{t('conv.chat.options')}</summary>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
          {toggle('showTranslation')}
          {toggle('showPron')}
          {toggle('showDetails')}
          {toggle('feedback', s.provider === 'demo')}
          {s.provider === 'demo' && <span className="text-xs text-muted">{t('conv.chat.feedbackAiOnly')}</span>}
        </div>
      </details>

      {s.intro && (
        <Card className="bg-gradient-to-br from-sky-50 to-white p-4">
          <div className="text-xs font-medium uppercase tracking-wide text-sky-700">{t('conv.chat.introScenario')}</div>
          <p className="mt-0.5 text-sm">{s.intro.scenario}</p>
          <div className="mt-2 text-xs font-medium uppercase tracking-wide text-sky-700">{t('conv.chat.introRole')}</div>
          <p className="mt-0.5 text-sm">{s.intro.role}</p>
        </Card>
      )}

      <div role="log" aria-live="polite" aria-label={t('conv.chat.messagesLabel')} className="space-y-3">
        {s.messages.map((m) => (m.role === 'partner' ? <PartnerBubble key={m.id} m={m} session={s} /> : <LearnerBubble key={m.id} m={m} session={s} />))}
        {busy === 'reply' && (
          <div className="flex justify-start"><div className="rounded-2xl bg-white px-4 py-3 text-sm text-muted ring-1 ring-line"><span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-sky-400" aria-hidden="true" />{t('conv.chat.waiting')}</div></div>
        )}
        <div ref={endRef} />
      </div>

      <div aria-live="assertive">
        {error && (
          <div className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">
            <p>{t(`conv.errors.${error.kind}`)}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {error.op === 'reply' && <Button variant="secondary" className="px-3 py-1.5" onClick={() => void requestReply(s)}><Icon name="refresh" className="h-4 w-4" />{t('conv.chat.retry')}</Button>}
              {error.op === 'finish' && <Button variant="secondary" className="px-3 py-1.5" onClick={() => void finish()}><Icon name="refresh" className="h-4 w-4" />{t('conv.chat.retry')}</Button>}
              {error.op === 'finish' && <Button variant="ghost" className="px-3 py-1.5" onClick={() => void finish(false)}>{t('conv.chat.finishAnyway')}</Button>}
            </div>
          </div>
        )}
        {!error && unanswered && !ended && (
          <div className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">
            {t('conv.chat.noReply')}
            <Button variant="secondary" className="ml-2 px-3 py-1.5" onClick={() => void requestReply(s)}><Icon name="refresh" className="h-4 w-4" />{t('conv.chat.retry')}</Button>
          </div>
        )}
        {!finished && ended && <p className="rounded-xl bg-sky-50 px-3 py-2 text-sm text-sky-800">{t('conv.chat.scriptEnded')}</p>}
      </div>

      {finished ? (
        <>
          <p className="text-sm text-muted">{t('conv.chat.finished')}</p>
          <SummaryCard session={s} />
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => void restart()} disabled={busy !== null}><Icon name="refresh" className="h-4 w-4" />{t('conv.chat.practiceAgain')}</Button>
            <ButtonLink to="/conversation" variant="secondary">{t('conv.chat.newSession')}</ButtonLink>
          </div>
        </>
      ) : (
        <div className="sticky bottom-[4.25rem] z-20 -mx-4 space-y-2 border-t border-line bg-cream/95 px-4 pb-3 pt-2 backdrop-blur sm:-mx-6 sm:px-6 lg:bottom-0 lg:-mx-10 lg:px-10">
          {canCompose && s.replies.length > 0 && (
            <div>
              <div className="mb-1 text-xs text-muted">{t('conv.chat.replies')}</div>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {s.replies.map((r, i) => (
                  <button key={i} type="button" onClick={() => insert(r.text)} title={g(r.translation)}
                    className="shrink-0 rounded-full bg-white px-3 py-1.5 text-left text-sm ring-1 ring-sky-200 hover:bg-sky-50">
                    <span lang={tp.lang} className={tp.className}>{r.text}</span>
                    {settings.showTranslation && g(r.translation) && <span className="ml-1.5 text-xs text-muted" lang={gLang}>{g(r.translation)}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {canCompose && (
            <>
              <label htmlFor="conv-draft" className="sr-only">{t('conv.chat.composerLabel')}</label>
              <textarea id="conv-draft" ref={inputRef} value={draft} maxLength={MAX_DRAFT} rows={2} lang={tp.lang}
                onChange={(e) => setDraft(e.target.value.slice(0, MAX_DRAFT))} onKeyDown={onKey}
                placeholder={t('conv.chat.placeholder', { name: tr(course.name) })}
                className={cx(tp.className, 'block w-full resize-y rounded-xl border border-line bg-white px-3 py-2 text-base outline-none focus:border-sky-300')} />
              <div className="flex flex-wrap items-center gap-2">
                <Button onClick={send} disabled={!draft.trim() || busy !== null}><Icon name="send" className="h-4 w-4" />{t('conv.chat.send')}</Button>
                <Button variant="secondary" onClick={() => setSuggestOpen(true)}><Icon name="bulb" className="h-4 w-4" />{t('conv.chat.suggestWords')}</Button>
                {canListen && (mic.s === 'listening' ? (
                  <Button variant="ghost" className="text-rose-600 ring-2 ring-rose-200" onClick={stopMic}><span className="h-2 w-2 animate-pulse rounded-full bg-rose-500" aria-hidden="true" />{t('conv.chat.micStop')}</Button>
                ) : (
                  <Button variant="ghost" onClick={() => void listen()} aria-label={t('conv.chat.micAria')}><Icon name="mic" className="h-4 w-4" />{t('conv.chat.mic')}</Button>
                ))}
                <span className="ml-auto text-xs text-muted">{t('conv.chat.charCount', { n: draft.length, max: MAX_DRAFT })}</span>
              </div>
              <div aria-live="polite" className="text-xs">
                {mic.s === 'listening' && <p className="text-sky-700">{t('conv.chat.listening')}</p>}
                {mic.s === 'error' && <p className="text-amber-800">{t(`conv.chat.micError.${mic.error}`)}</p>}
                <p className="text-muted">{canListen ? t('conv.chat.micNote') : t('conv.chat.micUnsupported')}</p>
              </div>
            </>
          )}

          <div className="flex flex-wrap gap-2 border-t border-line pt-2">
            <Button variant="ghost" className="px-3 py-1.5" onClick={pause} disabled={busy !== null}><Icon name="pause" className="h-4 w-4" />{t('conv.chat.pause')}</Button>
            <Button variant="ghost" className="px-3 py-1.5" onClick={() => void restart()} disabled={busy !== null}><Icon name="refresh" className="h-4 w-4" />{t('conv.chat.restart')}</Button>
            <Button variant={ended ? 'primary' : 'secondary'} className="px-3 py-1.5" onClick={() => void finish()} disabled={busy !== null}>
              <Icon name="flag" className="h-4 w-4" />{busy === 'finish' ? t('conv.chat.finishing') : t('conv.chat.finish')}
            </Button>
          </div>
        </div>
      )}

      {suggestOpen && <SuggestPanel session={s} onInsert={(x) => insert(x, false)} onClose={() => setSuggestOpen(false)} />}
    </div>
  );
}
