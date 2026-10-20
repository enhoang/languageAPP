import type { ConvSession } from '../../conversation/types';
import { phraseId } from '../../conversation/store';
import { useConv } from '../../conversation/ConvContext';
import { useI18n } from '../../i18n/LocaleContext';
import { AudioButton } from '../Audio';
import { Icon } from '../Icon';
import { Card, SectionTitle, cx } from '../ui';
import { PronLine, targetProps, useGloss } from './shared';

/**
 * End-of-conversation summary. AI: overall comment, useful vocabulary, corrections, review items.
 * Demo: nothing was evaluated — the scenario's key vocabulary and the learner's own sentences only.
 */
export function SummaryCard({ session }: { session: ConvSession }) {
  const { t, lang: ui } = useI18n();
  const { data, savePhrase } = useConv();
  const { setup, summary } = session;
  const { g, gLang } = useGloss(setup.lang);
  const tp = targetProps(setup.lang);
  if (!summary) return null;
  const demo = session.provider === 'demo';
  const h3 = 'mb-2 mt-4 text-sm font-semibold uppercase tracking-wide text-muted';

  return (
    <Card className="border-sky-200">
      <SectionTitle>{t('conv.summary.title')}</SectionTitle>
      {demo ? <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">{t('conv.summary.demoNote')}</p> : summary.overall && (
        <>
          <h3 className={h3}>{t('conv.summary.overall')}</h3>
          <p className="text-sm leading-relaxed" lang={ui}>{summary.overall}</p>
        </>
      )}

      <h3 className={h3}>{demo ? t('conv.summary.keyVocab') : t('conv.summary.vocabulary')}</h3>
      {summary.vocabulary.length === 0 ? <p className="text-sm text-muted">{t('conv.summary.none')}</p> : (
        <ul className="grid gap-2 sm:grid-cols-2">
          {summary.vocabulary.map((v, i) => {
            const saved = !!data.saved[phraseId(setup.lang, v.text)];
            return (
              <li key={`${v.text}-${i}`} className="flex items-start justify-between gap-2 rounded-xl border border-line p-3">
                <div className="min-w-0">
                  <div lang={tp.lang} className={cx(tp.className, 'break-words text-lg')}>{v.text}</div>
                  <PronLine lang={setup.lang} pron={v.pron} level={setup.level} />
                  <div className="text-sm text-stone-700" lang={gLang}>{g(v.meaning)}</div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <AudioButton text={v.text} size="sm" showSlow={false} courseId={setup.lang} />
                  <button type="button" disabled={saved} onClick={() => savePhrase({ lang: setup.lang, text: v.text, pron: v.pron, meaning: v.meaning, scenario: setup.scenario, sessionId: session.id })}
                    className="rounded-full px-2 py-1 text-xs text-sky-700 hover:bg-sky-50 disabled:text-emerald-700">
                    {saved ? <><Icon name="check" className="mr-0.5 inline h-3.5 w-3.5 align-[-2px]" />{t('conv.suggest.saved')}</> : t('conv.suggest.save')}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {demo ? (
        <>
          <h3 className={h3}>{t('conv.summary.yourSentences')}</h3>
          {summary.review.length === 0 ? <p className="text-sm text-muted">{t('conv.summary.noSentences')}</p> : (
            <ul className="space-y-1">
              {summary.review.map((s, i) => <li key={i} lang={tp.lang} className={cx(tp.className, 'break-words rounded-lg bg-stone-50 px-3 py-1.5')}>{s}</li>)}
            </ul>
          )}
        </>
      ) : (
        <>
          <h3 className={h3}>{t('conv.summary.corrections')}</h3>
          {summary.corrections.length === 0 ? <p className="text-sm text-muted">{t('conv.summary.none')}</p> : (
            <ul className="space-y-2">
              {summary.corrections.map((c, i) => (
                <li key={i} className="rounded-xl border-l-4 border-rose-300 bg-rose-50/50 px-3 py-2 text-sm">
                  <div className="flex flex-wrap items-center gap-x-2 break-words">
                    <span lang={tp.lang} className={cx(tp.className, 'text-rose-700 line-through decoration-rose-300')}>{c.original}</span>
                    <Icon name="right" className="h-4 w-4 shrink-0 text-muted" />
                    <span lang={tp.lang} className={cx(tp.className, 'font-medium text-emerald-800')}>{c.better}</span>
                  </div>
                  {c.note && <p className="mt-1 text-stone-700" lang={ui}>{c.note}</p>}
                </li>
              ))}
            </ul>
          )}
          <h3 className={h3}>{t('conv.summary.review')}</h3>
          {summary.review.length === 0 ? <p className="text-sm text-muted">{t('conv.summary.none')}</p> : (
            <ul className="list-disc space-y-1 pl-5 text-sm" lang={ui}>
              {summary.review.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          )}
        </>
      )}
    </Card>
  );
}
