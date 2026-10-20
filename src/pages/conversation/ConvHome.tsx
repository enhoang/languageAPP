import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CONV_LEVELS, SCENARIOS, type ConvLang, type ConvLevel, type ConvMode, type ConvSession, type ScenarioId } from '../../conversation/types';
import { convStats, dueSaved } from '../../conversation/store';
import { useConv } from '../../conversation/ConvContext';
import { useAppData } from '../../state/AppDataContext';
import { COURSE_IDS, COURSES } from '../../courses';
import { LANG_NAME } from '../../i18n/langs';
import { useI18n } from '../../i18n/LocaleContext';
import { Badge, Button, ButtonLink, Card, PageHeader, SectionTitle, Stat, cx } from '../../components/ui';
import { Icon } from '../../components/Icon';
import { ConvNav, ProviderBadge, errorKindOf, startConversation, useBackendHealth, useDateFmt, useScenarioLabel, type ErrorKind } from '../../components/conversation/shared';

const MAX_TOPIC = 200;
const MODES: ConvMode[] = ['guided', 'free'];

/** /conversation — provider status, new conversation setup, sessions to resume, stats. */
export default function ConvHome() {
  const { t } = useI18n();
  const { data, provider, deleteSession } = useConv();
  const stats = convStats(data);
  const due = dueSaved(data).length;
  const savedCount = Object.keys(data.saved).length;
  const open = data.sessions.filter((s) => s.status !== 'finished');
  const finished = data.sessions.filter((s) => s.status === 'finished').slice(0, 6);

  return (
    <div className="space-y-6">
      <ConvNav />
      <PageHeader title={t('conv.home.title')} subtitle={t('conv.home.subtitle')} />
      <ProviderStatus />
      <SetupForm demo={provider.kind === 'demo'} />

      <section>
        <SectionTitle>{t('conv.resume.title')}</SectionTitle>
        {open.length === 0 ? <p className="text-sm text-muted">{t('conv.resume.empty')}</p> : (
          <ul className="grid gap-2 md:grid-cols-2">
            {open.map((s) => (
              <SessionRow key={s.id} s={s} action={t('conv.resume.continue')}
                onDelete={() => { if (window.confirm(t('conv.resume.deleteConfirm'))) deleteSession(s.id); }} />
            ))}
          </ul>
        )}
      </section>

      <section>
        <SectionTitle>{t('conv.resume.recentTitle')}</SectionTitle>
        {finished.length === 0 ? <p className="text-sm text-muted">{t('conv.resume.recentEmpty')}</p> : (
          <ul className="grid gap-2 md:grid-cols-2">
            {finished.map((s) => (
              <SessionRow key={s.id} s={s} action={t('conv.resume.open')}
                onDelete={() => { if (window.confirm(t('conv.resume.deleteConfirm'))) deleteSession(s.id); }} />
            ))}
          </ul>
        )}
      </section>

      <section>
        <SectionTitle>{t('conv.stats.title')}</SectionTitle>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label={t('conv.stats.completed')} value={stats.completed} />
          <Stat label={t('conv.stats.learnerMessages')} value={stats.learnerMessages} />
          <Stat label={t('conv.stats.saved')} value={savedCount} hint={due ? t('conv.stats.due', { count: due }) : t('conv.stats.noDue')} />
          <div className="rounded-2xl border border-line bg-white p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-muted">{t('conv.stats.topics')}</div>
            {stats.topics.length === 0 ? <p className="mt-1 text-sm text-muted">{t('conv.stats.noTopics')}</p> : (
              <ul className="mt-1 space-y-0.5 text-sm">
                {stats.topics.slice(0, 3).map((x) => (
                  <li key={x.id} className="flex justify-between gap-2"><span className="truncate">{t(`conv.scenario.${x.id}`)}</span><span className="shrink-0 text-muted">{t('conv.stats.topicCount', { count: x.count })}</span></li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {savedCount > 0 && <ButtonLink to="/conversation/review" variant="secondary" className="mt-3">{t('conv.stats.review')}</ButtonLink>}
      </section>
      <p className="text-xs text-muted">{t('conv.home.independent')}</p>
    </div>
  );
}

function ProviderStatus() {
  const { t } = useI18n();
  const h = useBackendHealth();
  const link = <Link to="/conversation/settings" className="font-medium underline">{t('conv.home.settingsLink')}</Link>;
  if (h.s === 'demo') {
    return (
      <Card className="border-amber-200 bg-amber-50/60">
        <div className="flex items-center gap-2"><ProviderBadge kind="demo" /><span className="font-semibold">{t('conv.home.demoTitle')}</span></div>
        <p className="mt-2 text-sm leading-relaxed text-amber-900">{t('conv.home.demoText')}</p>
        <p className="mt-2 text-sm">{link}</p>
      </Card>
    );
  }
  return (
    <Card className={h.s === 'ok' ? 'border-emerald-200 bg-emerald-50/60' : h.s === 'checking' ? '' : 'border-rose-200 bg-rose-50/60'}>
      <div className="flex items-center gap-2"><ProviderBadge kind="ai" /><span className="font-semibold">{t('conv.home.aiTitle')}</span></div>
      <p className="mt-2 break-words text-sm" aria-live="polite">
        {h.s === 'checking' && t('conv.home.aiChecking')}
        {h.s === 'ok' && (h.model ? t('conv.home.aiModel', { model: h.model }) : t('conv.settings.testOkNoModel'))}
        {h.s === 'needsCode' && t('conv.home.aiNeedsCode')}
        {h.s === 'unreachable' && t('conv.home.aiUnreachable', { url: h.url })}
      </p>
      <p className="mt-2 text-sm">{link}</p>
    </Card>
  );
}

function SessionRow({ s, action, onDelete }: { s: ConvSession; action: string; onDelete: () => void }) {
  const { t, tr } = useI18n();
  const scenario = useScenarioLabel();
  const date = useDateFmt();
  const n = s.messages.filter((m) => m.role === 'learner').length;
  return (
    <li className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4">
      <div className="min-w-0">
        <div className="truncate font-medium">{scenario(s.setup)}</div>
        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted">
          <Badge tone="sky">{tr(COURSES[s.setup.lang].name)}</Badge>
          <Badge tone="gray">{t(`conv.level.${s.setup.level}`)}</Badge>
          <ProviderBadge kind={s.provider} />
          {s.status === 'paused' && <Badge tone="amber">{t('conv.status.paused')}</Badge>}
          <span>{t('conv.resume.messages', { count: n })}</span>
          <span>· {date(s.updatedAt)}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <ButtonLink to={`/conversation/session/${s.id}`} variant="secondary" className="px-3 py-2">{action}</ButtonLink>
        <Button variant="ghost" className="px-3 py-2" onClick={onDelete} aria-label={`${t('conv.resume.delete')}: ${scenario(s.setup)}`}><Icon name="x" className="h-4 w-4" /></Button>
      </div>
    </li>
  );
}

function SetupForm({ demo }: { demo: boolean }) {
  const { t, tr, lang: ui } = useI18n();
  const { data: appData } = useAppData();
  const { provider, putSession } = useConv();
  const navigate = useNavigate();
  const [lang, setLang] = useState<ConvLang>(appData.currentCourse ?? 'en');
  const [level, setLevel] = useState<ConvLevel>('beginner');
  const [scenario, setScenario] = useState<ScenarioId>('greetings');
  const [topic, setTopic] = useState('');
  const [mode, setMode] = useState<ConvMode>('guided');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<ErrorKind | 'topic' | null>(null);

  const start = async () => {
    if (scenario === 'custom' && !topic.trim()) {
      setError('topic');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const s = await startConversation(provider, { lang, level, scenario, customTopic: scenario === 'custom' ? topic.trim() : undefined, mode, explainLang: ui });
      putSession(s);
      navigate(`/conversation/session/${s.id}`);
    } catch (e) {
      setError(errorKindOf(e));
      setBusy(false);
    }
  };

  const chip = (on: boolean) => cx('rounded-full px-3 py-1.5 text-sm transition focus-visible:outline-2 focus-visible:outline-sky-400', on ? 'bg-sky-500 font-medium text-white' : 'bg-white text-stone-700 ring-1 ring-line hover:bg-sky-50');

  return (
    <Card>
      <SectionTitle>{t('conv.setup.title')}</SectionTitle>
      <div className="space-y-5">
        <fieldset>
          <legend className="mb-2 text-sm font-medium">{t('conv.setup.language')}</legend>
          <div className="flex flex-wrap gap-2">
            {COURSE_IDS.map((id) => (
              <button key={id} type="button" aria-pressed={lang === id} onClick={() => setLang(id)} className={chip(lang === id)}>
                <span lang={COURSES[id].speechLang} className={COURSES[id].fontClass}>{COURSES[id].endonym}</span> · {tr(COURSES[id].name)}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-medium">{t('conv.setup.level')}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {CONV_LEVELS.map((l) => (
              <label key={l} className={cx('flex cursor-pointer items-start gap-2 rounded-xl border p-3 text-sm', level === l ? 'border-sky-300 bg-sky-50' : 'border-line')}>
                <input type="radio" name="conv-level" checked={level === l} onChange={() => setLevel(l)} className="mt-1 accent-sky-500" />
                <span><span className="font-medium">{t(`conv.level.${l}`)}</span><span className="block text-xs text-muted">{t(`conv.levelDesc.${l}`)}</span></span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-medium">{t('conv.setup.scenario')}</legend>
          <div className="flex flex-wrap gap-2">
            {SCENARIOS.map((id) => (
              <button key={id} type="button" aria-pressed={scenario === id} onClick={() => { setScenario(id); if (error === 'topic') setError(null); }} className={chip(scenario === id)}>
                {t(`conv.scenario.${id}`)}
              </button>
            ))}
          </div>
          {scenario === 'custom' && (
            <div className="mt-3">
              <label htmlFor="conv-topic" className="mb-1 block text-sm">{t('conv.setup.customLabel')}</label>
              <input id="conv-topic" value={topic} maxLength={MAX_TOPIC} onChange={(e) => setTopic(e.target.value.slice(0, MAX_TOPIC))}
                placeholder={t('conv.setup.customPlaceholder')} className="w-full rounded-xl border border-line px-3 py-2 text-sm outline-none focus:border-sky-300" />
              <div className="mt-1 text-right text-xs text-muted">{t('conv.setup.customCount', { n: topic.length, max: MAX_TOPIC })}</div>
              {demo && <p className="mt-1 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">{t('conv.setup.demoCustomNote')}</p>}
            </div>
          )}
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-medium">{t('conv.setup.mode')}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {MODES.map((m) => (
              <label key={m} className={cx('flex cursor-pointer items-start gap-2 rounded-xl border p-3 text-sm', mode === m ? 'border-sky-300 bg-sky-50' : 'border-line')}>
                <input type="radio" name="conv-mode" checked={mode === m} onChange={() => setMode(m)} className="mt-1 accent-sky-500" />
                <span><span className="font-medium">{t(`conv.mode.${m}`)}</span><span className="block text-xs text-muted">{t(`conv.modeDesc.${m}`)}</span></span>
              </label>
            ))}
          </div>
        </fieldset>

        {demo && <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">{t('conv.setup.demoLevelNote')}</p>}
        <p className="text-xs text-muted">{t('conv.setup.explainNote', { name: LANG_NAME[ui] })}</p>

        <div aria-live="polite">
          {error === 'topic' && <p className="mb-2 text-sm text-rose-700">{t('conv.setup.customRequired')}</p>}
          {error && error !== 'topic' && (
            <p className="mb-2 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{demo && error === 'input' ? t('conv.setup.noScript') : t(`conv.errors.${error}`)}</p>
          )}
        </div>
        <Button onClick={start} disabled={busy}>
          {busy ? t('conv.setup.starting') : <><Icon name="chat" className="h-4 w-4" />{t('conv.setup.start')}</>}
        </Button>
      </div>
    </Card>
  );
}
