import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { TERMS, TERM_BY_ID, TOPICS } from '../../qa/content';
import { useQa } from '../../qa/QaContext';
import { useI18n } from '../../i18n/LocaleContext';
import { Badge, Button, Card, PageHeader, ProgressBar, SectionTitle, cx } from '../../components/ui';
import { Icon } from '../../components/Icon';
import { AssistHelpButton, AssistToggle, useAssist } from '../../components/qa/AssistToggle';
import { TermHeading, TermNameLine, TermStudyDetails, termNeedsReview, useChapterLabel } from '../../components/qa/TermCard';

const BATCH = 5;

interface Session { setLabel: string; queue: string[]; batch: number }

/** /qa/learn — learn terms in small batches: English term first, reveal the meaning, mark it. */
export default function QaLearn() {
  const { t } = useI18n();
  const { progress } = useQa();
  const chapter = useChapterLabel();
  const [session, setSession] = useState<Session | null>(null);

  const sets = useMemo(() => {
    const now = new Date();
    const review = TERMS.filter((x) => termNeedsReview(progress.terms[x.id], now)).map((x) => x.id);
    const fresh = [
      ...TERMS.filter((x) => x.keyword && !progress.terms[x.id]),
      ...TERMS.filter((x) => !x.keyword && x.topicIds.length > 0 && !progress.terms[x.id]),
    ].map((x) => x.id);
    return { review, fresh };
  }, [progress.terms]);

  // Unmarked / not yet understood terms first.
  const order = (ids: string[]) => [...ids.filter((id) => progress.terms[id]?.mark !== 'understood'), ...ids.filter((id) => progress.terms[id]?.mark === 'understood')];
  const start = (setLabel: string, ids: string[]) => setSession({ setLabel, queue: ids.filter((id) => TERM_BY_ID[id]), batch: 0 });

  if (session) return <LearnSession key={`${session.setLabel}-${session.batch}`} session={session} onNext={() => setSession({ ...session, batch: session.batch + 1 })} onExit={() => setSession(null)} />;

  return (
    <div>
      <PageHeader title={t('qaStudy.learn.title')} subtitle={t('qaStudy.learn.subtitle', { n: BATCH })} />
      <AssistToggle className="mb-6" />

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <Card>
          <div className="flex items-center gap-2 font-medium"><Icon name="flag" className="h-5 w-5 text-amber-600" /> {t('qaStudy.learn.setReview')}</div>
          <p className="mt-1 text-sm text-muted">{t('qaStudy.learn.setReviewHint', { count: sets.review.length })}</p>
          <Button className="mt-3 bg-emerald-600 hover:bg-emerald-700" disabled={!sets.review.length} onClick={() => start(t('qaStudy.learn.setReview'), sets.review)}>{t('common.actions.start')}</Button>
        </Card>
        <Card>
          <div className="flex items-center gap-2 font-medium"><Icon name="star" className="h-5 w-5 text-emerald-600" /> {t('qaStudy.learn.setNew')}</div>
          <p className="mt-1 text-sm text-muted">{t('qaStudy.learn.setNewHint', { count: sets.fresh.length })}</p>
          <Button className="mt-3 bg-emerald-600 hover:bg-emerald-700" disabled={!sets.fresh.length} onClick={() => start(t('qaStudy.learn.setNew'), sets.fresh)}>{t('common.actions.start')}</Button>
        </Card>
      </div>

      <SectionTitle>{t('qaStudy.learn.byChapter')}</SectionTitle>
      <div className="grid gap-3 md:grid-cols-2">
        {TOPICS.map((topic) => {
          const ids = topic.keywordIds;
          const understood = ids.filter((id) => progress.terms[id]?.mark === 'understood').length;
          return (
            <Card key={topic.id}>
              <div className="font-medium">{chapter(topic.id)}</div>
              <p className="mt-1 text-sm text-muted">{t('qaStudy.learn.keywordsCount', { count: ids.length, understood })}</p>
              <ProgressBar value={ids.length ? (understood / ids.length) * 100 : 0} className="mt-2" color="bg-emerald-500" />
              <Button className="mt-3" variant="secondary" disabled={!ids.length} onClick={() => start(chapter(topic.id), order(ids))}>
                {understood > 0 && understood < ids.length ? t('qaStudy.learn.continue') : t('common.actions.start')}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function LearnSession({ session, onNext, onExit }: { session: Session; onNext: () => void; onExit: () => void }) {
  const { t } = useI18n();
  const { markTerm } = useQa();
  const assist = useAssist();
  const [batch] = useState(() => session.queue.slice(session.batch * BATCH, session.batch * BATCH + BATCH));
  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [help, setHelp] = useState(false);
  const [marks, setMarks] = useState<Record<string, 'understood' | 'review'>>({});
  const totalBatches = Math.ceil(session.queue.length / BATCH);
  const hasMore = (session.batch + 1) * BATCH < session.queue.length;

  if (!batch.length) {
    return (
      <Card className="text-center">
        <p className="mb-4 text-muted">{t('qaStudy.learn.emptySet')}</p>
        <Button variant="secondary" onClick={onExit}>{t('qaStudy.learn.chooseSet')}</Button>
      </Card>
    );
  }

  const header = (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
      <div>
        <div className="font-medium">{session.setLabel}</div>
        <div className="text-xs text-muted">{t('qaStudy.learn.batchOf', { n: session.batch + 1, total: totalBatches })}</div>
      </div>
      <Button variant="ghost" className="px-2.5 py-1.5 text-xs" onClick={onExit}>{t('qaStudy.learn.chooseSet')}</Button>
    </div>
  );

  if (i >= batch.length) {
    return (
      <div>
        {header}
        <Card>
          <h2 className="text-lg font-semibold">{t('qaStudy.learn.summary')}</h2>
          <p className="mt-1 text-sm text-muted">{t('qaStudy.learn.summaryHint', { understood: Object.values(marks).filter((m) => m === 'understood').length, review: Object.values(marks).filter((m) => m === 'review').length })}</p>
          <ul className="mt-4 divide-y divide-line">
            {batch.map((id) => {
              const term = TERM_BY_ID[id];
              return (
                <li key={id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                  <div className="min-w-0">
                    <Link to={`/qa/glossary/${id}`} lang="en" className="font-medium hover:text-emerald-700 hover:underline">{term.term}</Link>
                    {assist !== 'none' && <div className="text-sm text-muted"><TermNameLine term={term} /></div>}
                  </div>
                  <Badge tone={marks[id] === 'understood' ? 'green' : 'amber'}>{marks[id] === 'understood' ? t('qaStudy.mark.understood') : t('qaStudy.mark.review')}</Badge>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {hasMore && <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={onNext}>{t('qaStudy.learn.nextBatch')}</Button>}
            <Button variant="secondary" onClick={onExit}>{t('qaStudy.learn.chooseSet')}</Button>
          </div>
        </Card>
      </div>
    );
  }

  const term = TERM_BY_ID[batch[i]];
  const mark = (m: 'understood' | 'review') => {
    markTerm(term.id, m);
    setMarks((x) => ({ ...x, [term.id]: m }));
    setI(i + 1);
    setRevealed(false);
    setHelp(false);
  };

  return (
    <div>
      {header}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm text-muted">{t('qaStudy.learn.termOf', { n: i + 1, total: batch.length })}</span>
        <div className="flex flex-wrap items-center gap-2">
          {revealed && <AssistHelpButton assist={assist} help={help} onToggle={() => setHelp((h) => !h)} />}
        </div>
      </div>
      <div className="mb-4 flex gap-1" aria-hidden>
        {batch.map((id, k) => <span key={id} className={cx('h-1.5 flex-1 rounded-full', k < i ? 'bg-emerald-500' : k === i ? 'bg-emerald-300' : 'bg-stone-200')} />)}
      </div>
      <Card>
        <TermHeading term={term} size="xl" />
        {term.synonyms.length > 0 && <p lang="en" className="mt-1 text-sm text-muted">{t('qaStudy.detail.synonyms')} {term.synonyms.join(', ')}</p>}
        {!revealed ? (
          <div className="mt-6">
            <p className="mb-3 text-sm text-muted">{t('qaStudy.learn.thinkFirst')}</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setRevealed(true)}>{t('qaStudy.learn.reveal')}</Button>
          </div>
        ) : (
          <div className="mt-5">
            <TermStudyDetails term={term} assist={assist} help={help} />
            <div className="mt-5 flex flex-wrap gap-2">
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => mark('understood')}><Icon name="check" className="h-4 w-4" /> {t('qaStudy.mark.understood')}</Button>
              <Button variant="coral" onClick={() => mark('review')}><Icon name="flag" className="h-4 w-4" /> {t('qaStudy.mark.review')}</Button>
              <Link to={`/qa/glossary/${term.id}`} className="self-center text-sm text-emerald-700 hover:underline">{t('qaStudy.learn.openDetail')}</Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
