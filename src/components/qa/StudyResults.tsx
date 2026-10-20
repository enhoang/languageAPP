import { useState } from 'react';
import type { Assist } from '../../qa/types';
import { useI18n } from '../../i18n/LocaleContext';
import { ItemView, displayOrder, resultsByTopic, type ItemResult } from './ItemRunner';
import { AssistHelpButton } from './AssistToggle';
import { useChapterLabel } from './TermCard';
import { Badge, Button, Card, ProgressBar, SectionTitle, Stat, cx } from '../ui';

const fmtDuration = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

/** Score, per-chapter breakdown and a review of the answers (wrong ones, or all of them for an exam). */
export function StudyResults({ results, assist, seconds, passPercent, reviewAll = false, onRetry, onBack, retryLabel }: {
  results: ItemResult[];
  assist: Assist;
  seconds?: number;
  passPercent?: number;
  reviewAll?: boolean;
  onRetry?: () => void;
  onBack?: () => void;
  retryLabel?: string;
}) {
  const { t } = useI18n();
  const chapter = useChapterLabel();
  const [showAll, setShowAll] = useState(reviewAll);
  const [help, setHelp] = useState(false);
  const [orders] = useState(() => results.map((r) => r.order ?? displayOrder(r.item)));
  const correct = results.filter((r) => r.correct).length;
  const total = results.length;
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const passed = passPercent !== undefined ? pct >= passPercent : undefined;
  const byTopic = Object.entries(resultsByTopic(results)).sort(([a], [b]) => a.localeCompare(b));
  const shown = results.map((r, i) => ({ r, i })).filter(({ r }) => showAll || !r.correct);

  return (
    <div className="space-y-6">
      <Card className={cx(passed === true && 'border-emerald-200', passed === false && 'border-rose-200')}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm text-muted">{t('qaStudy.results.title')}</div>
            <div className="text-3xl font-semibold tabular-nums">{correct}/{total} <span className="text-lg text-muted">({pct}%)</span></div>
          </div>
          {passed !== undefined && (
            <div className="text-right">
              <Badge tone={passed ? 'green' : 'rose'}>{passed ? t('qaStudy.results.passed') : t('qaStudy.results.failed')}</Badge>
              <div className="mt-1 text-xs text-muted">{t('qaStudy.results.passMark', { pct: passPercent })}</div>
            </div>
          )}
        </div>
        <ProgressBar value={pct} className="mt-4" color={passed === false ? 'bg-rose-400' : 'bg-emerald-500'} />
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat label={t('qaStudy.results.correct')} value={correct} />
          <Stat label={t('qaStudy.results.wrong')} value={total - correct} />
          {seconds !== undefined && <Stat label={t('qaStudy.results.time')} value={fmtDuration(seconds)} />}
        </div>
        {passed !== undefined && <p className="mt-3 text-xs text-muted">{t('qaStudy.results.practiceNote')}</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          {onRetry && <Button onClick={onRetry} className="bg-emerald-600 hover:bg-emerald-700">{retryLabel ?? t('common.actions.retry')}</Button>}
          {onBack && <Button variant="secondary" onClick={onBack}>{t('qaStudy.results.back')}</Button>}
        </div>
      </Card>

      {byTopic.length > 0 && (
        <section>
          <SectionTitle>{t('qaStudy.results.byChapter')}</SectionTitle>
          <Card className="space-y-3">
            {byTopic.map(([topicId, s]) => {
              const p = s.total ? Math.round((s.correct / s.total) * 100) : 0;
              return (
                <div key={topicId}>
                  <div className="mb-1 flex flex-wrap justify-between gap-2 text-sm">
                    <span className="min-w-0 break-words">{chapter(topicId)}</span>
                    <span className="tabular-nums text-muted">{s.correct}/{s.total} · {p}%</span>
                  </div>
                  <ProgressBar value={p} color={p >= 65 ? 'bg-emerald-500' : 'bg-amber-400'} />
                </div>
              );
            })}
          </Card>
        </section>
      )}

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">{showAll ? t('qaStudy.results.reviewAll') : t('qaStudy.results.reviewWrong')}</h2>
          <div className="flex flex-wrap items-center gap-2">
            <AssistHelpButton assist={assist} help={help} onToggle={() => setHelp((h) => !h)} />
            <Button variant="ghost" className="px-2.5 py-1.5 text-xs" onClick={() => setShowAll((s) => !s)}>{showAll ? t('qaStudy.results.onlyWrong') : t('qaStudy.results.showAll')}</Button>
          </div>
        </div>
        {shown.length === 0 ? (
          <Card className="text-center text-muted">{t('qaStudy.results.allCorrect')}</Card>
        ) : (
          <div className="space-y-3">
            {shown.map(({ r, i }) => (
              <Card key={r.item.id}>
                <div className="mb-3 text-xs font-medium text-muted">{t('qaStudy.results.questionN', { n: i + 1 })}</div>
                <ItemView item={r.item} order={orders[i]} response={r.response} revealed assist={assist} help={help} />
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
