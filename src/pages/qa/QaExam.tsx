import { useState } from 'react';
import type { ExamSpec } from '../../qa/types';
import { EXAMS } from '../../qa/content';
import { buildExam, examAvailability, type QaItem } from '../../qa/quiz';
import { useQa } from '../../qa/QaContext';
import { useI18n } from '../../i18n/LocaleContext';
import { Badge, Button, Card, PageHeader } from '../../components/ui';
import { Icon } from '../../components/Icon';
import { ProvenanceTag } from '../../components/qa/Provenance';
import { ItemRunner, resultsByTopic, type ItemResult } from '../../components/qa/ItemRunner';
import { StudyResults } from '../../components/qa/StudyResults';
import { useChapterLabel } from '../../components/qa/TermCard';

const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

/** /qa/exam — practice exams in this app's own format (not the official exam structure). */
export default function QaExam() {
  const { t, tr } = useI18n();
  const { progress, addAttempt } = useQa();
  const chapter = useChapterLabel();
  const [run, setRun] = useState<{ spec: ExamSpec; items: QaItem[]; n: number } | null>(null);
  const [done, setDone] = useState<{ results: ItemResult[]; seconds: number } | null>(null);
  // Exams are shown with the learner's assist level; the review after submitting uses the same.
  const assist = progress.settings.assist;

  const start = (spec: ExamSpec) => {
    const items = buildExam(spec);
    if (!items) return;
    setDone(null);
    setRun((r) => ({ spec, items, n: (r?.n ?? 0) + 1 }));
  };

  const finish = (results: ItemResult[], seconds: number) => {
    const spec = run!.spec;
    const correct = results.filter((r) => r.correct).length;
    const passed = results.length > 0 && (correct / results.length) * 100 >= spec.passPercent;
    addAttempt({ id: newId(), at: new Date().toISOString(), kind: 'exam', examId: spec.id, correct, total: results.length, seconds, passed, byTopic: resultsByTopic(results) });
    setDone({ results, seconds });
  };

  if (run && done) {
    return (
      <div>
        <PageHeader title={tr(run.spec.title)} subtitle={t('qaStudy.exam.resultSubtitle')} />
        <StudyResults results={done.results} seconds={done.seconds} assist={assist} passPercent={run.spec.passPercent} reviewAll
          onRetry={() => start(run.spec)} retryLabel={t('qaStudy.exam.again')}
          onBack={() => { setRun(null); setDone(null); }} />
      </div>
    );
  }
  if (run) {
    return (
      <div>
        <PageHeader title={tr(run.spec.title)} subtitle={t('qaStudy.exam.runHint')} />
        <ItemRunner key={run.n} items={run.items} assist={assist} exam minutes={run.spec.minutes} onFinish={finish} onQuit={() => setRun(null)} />
      </div>
    );
  }

  const last = (id: string) => progress.attempts.find((a) => a.kind === 'exam' && a.examId === id);

  return (
    <div>
      <PageHeader title={t('qaStudy.exam.title')} subtitle={t('qaStudy.exam.subtitle')} />
      <div className="mb-5 flex flex-wrap items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900" role="note">
        <ProvenanceTag kind="practice" />
        <span className="min-w-0 flex-1">{t('qaStudy.exam.disclaimer')}</span>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {EXAMS.map((spec) => {
          const av = examAvailability(spec);
          const prev = last(spec.id);
          return (
            <Card key={spec.id} className="flex flex-col">
              <h2 className="text-lg font-semibold">{tr(spec.title)}</h2>
              <div className="mt-2 flex flex-wrap gap-2 text-sm">
                <Badge tone="gray">{t('common.questions', { count: spec.questionCount })}</Badge>
                <Badge tone="gray"><Icon name="clock" className="mr-1 h-3.5 w-3.5" />{t('common.minutes', { count: spec.minutes })}</Badge>
                <Badge tone="gray">{t('qaStudy.exam.passMark', { pct: spec.passPercent })}</Badge>
              </div>
              <div className="mt-4">
                <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted">{t('qaStudy.exam.distribution')}</div>
                <ul className="space-y-1 text-sm">
                  {Object.entries(spec.perTopic).map(([topicId, n]) => (
                    <li key={topicId} className="flex justify-between gap-2">
                      <span className="min-w-0 break-words">{chapter(topicId)}</span>
                      <span className="shrink-0 tabular-nums text-muted">
                        {t('common.questions', { count: n })}
                        {av.missing[topicId] ? <span className="ml-1 text-rose-700">{t('qaStudy.exam.missing', { count: av.missing[topicId] })}</span> : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted">{tr(spec.basis)}</p>
              {!av.ok && <p className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-800" role="alert">{t('qaStudy.exam.unavailable')}</p>}
              {prev && (
                <p className="mt-3 text-sm text-muted">
                  {t('qaStudy.exam.lastAttempt', { correct: prev.correct, total: prev.total })}{' '}
                  <Badge tone={prev.passed ? 'green' : 'rose'}>{prev.passed ? t('qaStudy.results.passed') : t('qaStudy.results.failed')}</Badge>
                </p>
              )}
              <div className="mt-auto pt-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700" disabled={!av.ok} onClick={() => start(spec)}>{t('qaStudy.exam.start')}</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
