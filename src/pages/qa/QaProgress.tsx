import { useRef, useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { EXAMS, TERMS, TERM_BY_ID, TOPICS, TOPIC_BY_ID } from '../../qa/content';
import { dueTerms, exportQa, parseQaBackup } from '../../qa/store';
import { useQa } from '../../qa/QaContext';
import type { QaAttempt } from '../../qa/types';
import { useI18n } from '../../i18n/LocaleContext';
import { MASTERY_STATUSES, wordStatus } from '../../lib/srs';
import { formatDateTime } from '../../lib/dates';
import { Badge, Button, Card, PageHeader, ProgressBar, SectionTitle, Stat } from '../../components/ui';
import { Icon } from '../../components/Icon';
import { TopicButton, TopicButtonLink, TopicTermChip, missTerms, missTopics, topicStat, weakTopicList } from '../../components/qa/TopicHelpers';

const MASTERY_COLORS = { new: 'bg-stone-200', learning: 'bg-amber-300', familiar: 'bg-sky-400', mastered: 'bg-emerald-500' } as const;
const pct = (c: number, n: number) => (n ? Math.round((c / n) * 100) : 0);

/** /qa/progress — ISTQB & QA progress, review history, attempts, frequent mistakes, backup. */
export default function QaProgressPage() {
  const { t, tr, locale } = useI18n();
  const { progress, replace, reset, saveError } = useQa();
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null);
  const now = new Date();

  // chapters
  const stats = TOPICS.map((topic) => ({ topic, stat: topicStat(topic, progress) }));
  const completed = stats.filter((x) => x.stat.completed).length;
  const sectionsRead = stats.reduce((a, x) => a + x.stat.read, 0);
  const sectionsTotal = stats.reduce((a, x) => a + x.stat.total, 0);

  // terms
  const counts = Object.fromEntries(MASTERY_STATUSES.map((s) => [s, 0])) as Record<(typeof MASTERY_STATUSES)[number], number>;
  for (const term of TERMS) counts[wordStatus(progress.terms[term.id])] += 1;
  const learned = counts.learning + counts.familiar + counts.mastered;
  const tps = Object.entries(progress.terms).filter(([id]) => TERM_BY_ID[id]);
  const understood = tps.filter(([, p]) => p.mark === 'understood').length;
  const needsReview = tps.filter(([, p]) => p.mark === 'review' || p.difficult).length;
  const due = dueTerms(progress, now).filter((id) => TERM_BY_ID[id]);

  // reviews
  const reviews = progress.reviews;
  const reviewCorrect = reviews.filter((r) => r.correct).length;

  // attempts
  const attempts = progress.attempts;
  const totalAnswers = attempts.reduce((a, x) => a + x.total, 0);
  const totalCorrect = attempts.reduce((a, x) => a + x.correct, 0);

  // frequent misses: by term, plus questions without a linked term by chapter
  const byTerm = new Map<string, number>();
  const otherByTopic = new Map<string, number>();
  for (const [id, m] of Object.entries(progress.misses)) {
    if (m.resolved) continue;
    const terms = missTerms(id);
    if (terms.length) for (const tid of terms) byTerm.set(tid, (byTerm.get(tid) ?? 0) + m.count);
    else for (const tp of missTopics(id)) otherByTopic.set(tp, (otherByTopic.get(tp) ?? 0) + m.count);
  }
  const missList = [
    ...[...byTerm.entries()].map(([id, count]) => ({ kind: 'term' as const, id, count })),
    ...[...otherByTopic.entries()].map(([id, count]) => ({ kind: 'topic' as const, id, count })),
  ].sort((a, b) => b.count - a.count).slice(0, 10);

  const weak = weakTopicList(progress);

  const attemptTitle = (a: QaAttempt) => {
    if (a.kind === 'exam') {
      const exam = EXAMS.find((e) => e.id === a.examId);
      return exam ? tr(exam.title) : t('qa.progress.kind.exam');
    }
    if (a.topicId && TOPIC_BY_ID[a.topicId]) return `${t('qa.progress.kind.topic')} · ${t('qa.common.chapter', { n: TOPIC_BY_ID[a.topicId].number })}`;
    return t(`qa.progress.kind.${a.kind}`);
  };

  const doExport = () => {
    const blob = new Blob([exportQa(progress)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `istqb-qa-progress-${now.toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const res = parseQaBackup(await file.text());
    if (!res.ok) {
      setMessage({ tone: 'error', text: t(`qa.progress.backupError.${res.error}`) });
      return;
    }
    if (!window.confirm(t('qa.progress.confirmImport'))) return;
    replace(res.data);
    setMessage({ tone: 'ok', text: t('qa.progress.imported') });
  };

  const doReset = () => {
    if (!window.confirm(t('qa.progress.confirmReset'))) return;
    reset();
    setMessage({ tone: 'ok', text: t('qa.progress.resetDone') });
  };

  return (
    <div className="space-y-6">
      <PageHeader title={t('qa.progress.title')} subtitle={t('qa.progress.subtitle')}>
        <TopicButtonLink to="/qa/quiz?mode=review"><Icon name="refresh" className="h-4 w-4" />{t('qa.progress.startReview')}</TopicButtonLink>
      </PageHeader>
      <p className="-mt-3 text-sm text-emerald-800">{t('qa.progress.separate')}</p>
      {saveError && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">{t('qa.progress.saveError')}</p>}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <Stat label={t('qa.progress.stat.chapters')} value={`${completed}/${TOPICS.length}`} />
        <Stat label={t('qa.progress.stat.sections')} value={`${sectionsRead}/${sectionsTotal}`} />
        <Stat label={t('qa.progress.stat.termsLearned')} value={learned} hint={t('qa.progress.ofTotal', { total: TERMS.length })} />
        <Stat label={t('qa.progress.stat.due')} value={due.length} />
        <Stat label={t('qa.progress.stat.accuracy')} value={totalAnswers ? `${pct(totalCorrect, totalAnswers)}%` : '—'} />
        <Stat label={t('qa.progress.stat.attempts')} value={attempts.length} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle>{t('qa.progress.chaptersTitle')}</SectionTitle>
          <ul className="space-y-3">
            {stats.map(({ topic, stat }) => (
              <li key={topic.id}>
                <Link to={`/qa/topic/${topic.id}`} className="block hover:text-emerald-800">
                  <div className="mb-1 flex flex-wrap justify-between gap-x-2 text-sm">
                    <span className="min-w-0"><b>{topic.number}.</b> <span lang="en">{topic.title}</span></span>
                    <span className="text-xs text-muted">
                      {t('qa.home.readProgress', { read: stat.read, total: stat.total })}
                      {stat.completed && <> · {t('qa.common.completed')}</>}
                    </span>
                  </div>
                  <ProgressBar value={stat.total ? (stat.read / stat.total) * 100 : 0} color="bg-emerald-500" className="bg-emerald-100" />
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <SectionTitle>{t('qa.progress.termsTitle')}</SectionTitle>
          <div className="flex h-4 w-full gap-0.5 overflow-hidden rounded-full bg-stone-100" role="img" aria-label={t('qa.progress.termsTitle')}>
            {MASTERY_STATUSES.map((k) => counts[k] > 0 && <div key={k} className={MASTERY_COLORS[k]} style={{ width: `${(counts[k] / Math.max(1, TERMS.length)) * 100}%` }} />)}
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {MASTERY_STATUSES.map((k) => (
              <li key={k} className="flex items-center gap-2"><span className={`h-3 w-3 rounded-sm ${MASTERY_COLORS[k]}`} />{t(`common.status.${k}`)}: <b>{counts[k]}</b></li>
            ))}
          </ul>
          <ul className="mt-4 space-y-1 border-t border-line pt-3 text-sm">
            <li className="flex justify-between"><span>{t('qa.progress.understood')}</span><b>{understood}</b></li>
            <li className="flex justify-between"><span>{t('qa.progress.needsReview')}</span><b>{needsReview}</b></li>
            <li className="flex justify-between"><span>{t('qa.progress.dueNow')}</span><b>{due.length}</b></li>
          </ul>
          {due.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {due.slice(0, 12).map((id) => <TopicTermChip key={id} id={id} />)}
            </div>
          )}
          {due.length > 0 && <div className="mt-3"><TopicButtonLink to="/qa/flashcards" tone="secondary">{t('qa.home.reviewNow')}</TopicButtonLink></div>}
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle>{t('qa.progress.missesTitle')}</SectionTitle>
          <p className="mb-3 text-xs text-muted">{t('qa.progress.missesHint')}</p>
          {missList.length === 0 ? <p className="text-sm text-muted">{t('qa.progress.missesEmpty')}</p> : (
            <ol className="space-y-2">
              {missList.map((m) => {
                const term = m.kind === 'term' ? TERM_BY_ID[m.id] : undefined;
                const topic = m.kind === 'topic' ? TOPIC_BY_ID[m.id] : undefined;
                return (
                  <li key={`${m.kind}-${m.id}`}>
                    <Link to={term ? `/qa/glossary/${m.id}` : `/qa/quiz?topic=${m.id}`}
                      className="flex flex-wrap justify-between gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm hover:bg-amber-100">
                      <span lang={term ? 'en' : undefined} className="font-medium">{term ? term.term : t('qa.progress.missOther', { n: topic?.number ?? '?' })}</span>
                      <span className="text-muted">{t('qa.progress.missCount', { count: m.count })}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          )}
        </Card>

        <Card>
          <SectionTitle>{t('qa.progress.recommendTitle')}</SectionTitle>
          {weak.length === 0 ? <p className="text-sm text-muted">{t('qa.progress.recommendEmpty')}</p> : (
            <ul className="space-y-2">
              {weak.slice(0, 6).map(({ topic, stat, accuracy }) => (
                <li key={topic.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line px-3 py-2 text-sm">
                  <span className="min-w-0">
                    <b>{t('qa.common.chapter', { n: topic.number })}</b> <span lang="en">{topic.title}</span>
                    <span className="block text-xs text-muted">
                      {accuracy === null ? t('qa.home.weakDetailNoAccuracy', { misses: stat.misses }) : t('qa.home.weakDetail', { accuracy, misses: stat.misses })}
                    </span>
                  </span>
                  <span className="flex gap-2">
                    <Link to={`/qa/topic/${topic.id}`} className="text-xs text-emerald-700 underline">{t('qa.home.open')}</Link>
                    <Link to={`/qa/quiz?topic=${topic.id}`} className="text-xs text-emerald-700 underline">{t('qa.home.practice')}</Link>
                  </span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4"><TopicButtonLink to="/qa/quiz?mode=review" tone="secondary">{t('qa.progress.startReview')}</TopicButtonLink></div>
        </Card>
      </div>

      <Card>
        <SectionTitle>{t('qa.progress.reviewsTitle')}</SectionTitle>
        {reviews.length === 0 ? <p className="text-sm text-muted">{t('qa.progress.reviewsEmpty')}</p> : (
          <>
            <p className="mb-3 text-sm text-muted">{t('qa.progress.reviewsSummary', { count: reviews.length, accuracy: pct(reviewCorrect, reviews.length) })}</p>
            <ul className="divide-y divide-line text-sm">
              {reviews.slice(0, 12).map((r, i) => (
                <li key={`${r.id}-${r.at}-${i}`} className="flex flex-wrap items-center justify-between gap-2 py-1.5">
                  {TERM_BY_ID[r.id] ? <Link to={`/qa/glossary/${r.id}`} lang="en" className="font-medium hover:text-emerald-800">{TERM_BY_ID[r.id].term}</Link> : <span lang="en">{r.id}</span>}
                  <span className="flex items-center gap-2 text-xs text-muted">
                    {formatDateTime(r.at, locale)}
                    <Badge tone={r.correct ? 'green' : 'rose'}>{r.correct ? t('qa.progress.correct') : t('qa.progress.wrong')}</Badge>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </Card>

      <Card>
        <SectionTitle>{t('qa.progress.attemptsTitle')}</SectionTitle>
        {attempts.length === 0 ? <p className="text-sm text-muted">{t('qa.progress.attemptsEmpty')}</p> : (
          <ul className="divide-y divide-line">
            {attempts.slice(0, 30).map((a) => (
              <li key={a.id} className="py-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium">{attemptTitle(a)}</span>
                  <span className="flex flex-wrap items-center gap-2">
                    <b>{a.correct}/{a.total} · {pct(a.correct, a.total)}%</b>
                    {a.passed !== undefined && <Badge tone={a.passed ? 'green' : 'rose'}>{a.passed ? t('qa.progress.passed') : t('qa.progress.failed')}</Badge>}
                  </span>
                </div>
                <div className="mt-0.5 text-xs text-muted">{formatDateTime(a.at, locale)}</div>
                {Object.keys(a.byTopic ?? {}).length > 1 && (
                  <div className="mt-1.5 flex flex-wrap gap-1.5" aria-label={t('qa.progress.table.byChapter')}>
                    {Object.entries(a.byTopic).sort(([x], [y]) => x.localeCompare(y)).map(([tid, b]) => (
                      <span key={tid} className="rounded-md bg-stone-100 px-2 py-0.5 text-xs">
                        {t('qa.common.chapter', { n: TOPIC_BY_ID[tid]?.number ?? tid })}: {b.correct}/{b.total}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <SectionTitle>{t('qa.progress.backupTitle')}</SectionTitle>
        <p className="mb-3 text-sm text-muted">{t('qa.progress.backupHint')}</p>
        <div className="flex flex-wrap gap-2">
          <TopicButton tone="secondary" onClick={doExport}>{t('qa.progress.export')}</TopicButton>
          <TopicButton tone="secondary" onClick={() => fileRef.current?.click()}>{t('qa.progress.import')}</TopicButton>
          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={onFile} aria-label={t('qa.progress.import')} />
          <Button variant="danger" onClick={doReset}>{t('qa.progress.reset')}</Button>
        </div>
        {message && (
          <p className={`mt-3 rounded-xl px-3 py-2 text-sm ${message.tone === 'ok' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-700'}`} role="status">{message.text}</p>
        )}
      </Card>
    </div>
  );
}
