import { useState } from 'react';
import type { ConvMessage, ConvSession, Feedback, ReplyChip } from '../../conversation/types';
import { phraseId } from '../../conversation/store';
import { useConv } from '../../conversation/ConvContext';
import { useI18n } from '../../i18n/LocaleContext';
import { AudioButton } from '../Audio';
import { Icon } from '../Icon';
import { cx } from '../ui';
import { PronLine, targetProps, useGloss } from './shared';

/** A partner line: target-script text, audio, pronunciation, translation (toggle) and "save this line". */
export function PartnerBubble({ m, session }: { m: ConvMessage; session: ConvSession }) {
  const { t } = useI18n();
  const { data, savePhrase } = useConv();
  const { setup } = session;
  const { g, gLang } = useGloss(setup.lang);
  const [showTr, setShowTr] = useState(false);
  const tp = targetProps(setup.lang);
  const translation = g(m.translation);
  const trVisible = data.settings.showTranslation || showTr;
  const saved = !!data.saved[phraseId(setup.lang, m.text)];
  return (
    <div className="flex justify-start">
      <div className="max-w-[92%] rounded-2xl rounded-tl-sm border border-line bg-white px-4 py-3 shadow-sm sm:max-w-[80%]">
        <div className="sr-only">{t('conv.chat.partner')}:</div>
        <p lang={tp.lang} className={cx(tp.className, 'whitespace-pre-wrap break-words text-lg leading-snug text-ink')}>{m.text}</p>
        <PronLine lang={setup.lang} pron={m.pron} level={setup.level} className="mt-1" />
        {translation && trVisible && <p className="mt-1 text-sm text-stone-600" lang={gLang}>{translation}</p>}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <AudioButton text={m.text} size="sm" courseId={setup.lang} />
          {translation && !data.settings.showTranslation && (
            <button type="button" onClick={() => setShowTr((v) => !v)} aria-expanded={showTr} className="rounded-full px-2 py-1 text-xs text-sky-700 hover:bg-sky-50">
              {showTr ? t('conv.chat.hideTranslate') : t('conv.chat.translate')}
            </button>
          )}
          <button type="button" disabled={saved}
            onClick={() => savePhrase({ lang: setup.lang, text: m.text, pron: m.pron ?? {}, meaning: m.translation ?? { vi: '', en: '' }, scenario: setup.scenario, sessionId: session.id })}
            className="rounded-full px-2 py-1 text-xs text-stone-600 hover:bg-stone-100 disabled:text-emerald-700 disabled:hover:bg-transparent">
            {saved ? <><Icon name="check" className="mr-0.5 inline h-3.5 w-3.5 align-[-2px]" />{t('conv.chat.savedLine')}</> : t('conv.chat.saveLine')}
          </button>
        </div>
      </div>
    </div>
  );
}

/** A learner message with AI feedback or (demo) sample answers underneath. */
export function LearnerBubble({ m, session }: { m: ConvMessage; session: ConvSession }) {
  const { t } = useI18n();
  const tp = targetProps(session.setup.lang);
  return (
    <div className="flex flex-col items-end gap-2">
      <div className="max-w-[92%] rounded-2xl rounded-tr-sm bg-sky-500 px-4 py-3 text-white sm:max-w-[80%]">
        <div className="sr-only">{t('conv.chat.you')}:</div>
        <p lang={tp.lang} className={cx(tp.className, 'whitespace-pre-wrap break-words text-lg leading-snug')}>{m.text}</p>
      </div>
      {m.feedback && <FeedbackView fb={m.feedback} session={session} />}
      {m.modelAnswers && m.modelAnswers.length > 0 && <ModelAnswers answers={m.modelAnswers} session={session} />}
    </div>
  );
}

const VERDICT = {
  correct: { tone: 'bg-emerald-50 text-emerald-800 ring-emerald-200', icon: 'check' as const },
  style: { tone: 'bg-sky-50 text-sky-800 ring-sky-200', icon: 'star' as const },
  mistakes: { tone: 'bg-rose-50 text-rose-800 ring-rose-200', icon: 'flag' as const },
};

function FeedbackView({ fb, session }: { fb: Feedback; session: ConvSession }) {
  const { t, lang: ui } = useI18n();
  const { data } = useConv();
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const tp = targetProps(session.setup.lang);
  const v = VERDICT[fb.verdict] ?? VERDICT.style;
  return (
    <div className="w-full max-w-[92%] rounded-2xl border border-line bg-white p-3 text-sm sm:max-w-[80%]">
      <span className={cx('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1', v.tone)}>
        <Icon name={v.icon} className="h-3.5 w-3.5" />{t(`conv.feedback.verdict.${fb.verdict}`)}
      </span>
      {fb.items.length > 0 && (
        <ul className="mt-2 space-y-2">
          {fb.items.map((it, i) => {
            const mistake = it.kind === 'mistake';
            const showExp = data.settings.showDetails || open[i];
            return (
              <li key={i} className={cx('rounded-xl border-l-4 px-3 py-2', mistake ? 'border-rose-400 bg-rose-50/60' : 'border-sky-300 bg-sky-50/60')}>
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className={cx('rounded px-1.5 py-0.5 font-semibold', mistake ? 'bg-rose-600 text-white' : 'bg-white text-sky-700 ring-1 ring-sky-200')}>{t(`conv.feedback.kind.${it.kind}`)}</span>
                  <span className="text-muted">{t(`conv.feedback.category.${it.category}`)}</span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 break-words">
                  <span lang={tp.lang} className={cx(tp.className, mistake ? 'text-rose-700 line-through decoration-rose-300' : 'text-stone-600')}>{it.original}</span>
                  <Icon name="right" className="h-4 w-4 shrink-0 text-muted" />
                  <span lang={tp.lang} className={cx(tp.className, 'font-medium text-emerald-800')}>{it.better}</span>
                </div>
                {it.explanation && (showExp ? (
                  <p className="mt-1 text-stone-700" lang={ui}>{it.explanation}
                    {!data.settings.showDetails && <button type="button" onClick={() => setOpen((o) => ({ ...o, [i]: false }))} className="ml-2 text-xs text-sky-700 underline">{t('conv.feedback.hideExplanation')}</button>}
                  </p>
                ) : (
                  <button type="button" onClick={() => setOpen((o) => ({ ...o, [i]: true }))} aria-expanded={false} className="mt-1 text-xs text-sky-700 underline">{t('conv.feedback.showExplanation')}</button>
                ))}
              </li>
            );
          })}
        </ul>
      )}
      {fb.corrected && (
        <div className="mt-2 rounded-xl bg-emerald-50 px-3 py-2">
          <div className="text-xs font-medium text-emerald-800">{t('conv.feedback.corrected')}</div>
          <div className="mt-0.5 flex flex-wrap items-center gap-2">
            <span lang={tp.lang} className={cx(tp.className, 'break-words text-base text-emerald-900')}>{fb.corrected}</span>
            <AudioButton text={fb.corrected} size="sm" showSlow={false} courseId={session.setup.lang} />
          </div>
        </div>
      )}
      {fb.encouragement && <p className="mt-2 text-stone-600" lang={ui}>{fb.encouragement}</p>}
    </div>
  );
}

function ModelAnswers({ answers, session }: { answers: ReplyChip[]; session: ConvSession }) {
  const { t } = useI18n();
  const { g, gLang } = useGloss(session.setup.lang);
  const { data } = useConv();
  const tp = targetProps(session.setup.lang);
  return (
    <div className="w-full max-w-[92%] rounded-2xl border border-amber-200 bg-amber-50/60 p-3 text-sm sm:max-w-[80%]">
      <div className="font-medium text-amber-900">{t('conv.feedback.modelTitle')}</div>
      <ul className="mt-2 space-y-2">
        {answers.map((a, i) => (
          <li key={i} className="flex items-start justify-between gap-2 rounded-xl bg-white px-3 py-2">
            <div className="min-w-0">
              <div lang={tp.lang} className={cx(tp.className, 'break-words text-base')}>{a.text}</div>
              {data.settings.showTranslation && g(a.translation) && <div className="text-xs text-stone-600" lang={gLang}>{g(a.translation)}</div>}
            </div>
            <AudioButton text={a.text} size="sm" showSlow={false} courseId={session.setup.lang} className="shrink-0" />
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-amber-800">{t('conv.feedback.modelNote')}</p>
    </div>
  );
}
