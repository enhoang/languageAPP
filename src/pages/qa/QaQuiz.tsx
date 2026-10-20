import { useMemo, useState, type ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { QaAttempt } from '../../qa/types';
import { QUESTIONS, TERMS, TOPICS, TOPIC_BY_ID } from '../../qa/content';
import { questionItem, reviewQuiz, termQuiz, topicQuiz, type QaItem, type TermMode } from '../../qa/quiz';
import { dueTerms } from '../../qa/store';
import { useQa } from '../../qa/QaContext';
import { shuffle } from '../../lib/text';
import { useI18n } from '../../i18n/LocaleContext';
import { Button, Card, PageHeader, cx } from '../../components/ui';
import { Icon } from '../../components/Icon';
import { AssistToggle } from '../../components/qa/AssistToggle';
import { ItemRunner, resultsByTopic, type ItemResult } from '../../components/qa/ItemRunner';
import { StudyResults } from '../../components/qa/StudyResults';
import { useChapterLabel } from '../../components/qa/TermCard';

const SELECT = 'min-w-0 max-w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-emerald-300';

type Kind = 'topic' | 'terms' | 'scenario' | 'review';
type TermChoice = 'definition' | 'match' | 'fill' | 'confused' | 'names';
const TERM_CHOICES: TermChoice[] = ['definition', 'match', 'fill', 'confused', 'names'];
const MODES: Record<TermChoice, TermMode[]> = { definition: ['defToTerm', 'termToDef'], match: ['match'], fill: ['fill'], confused: ['confused'], names: ['termToName'] };

interface Config {
  kind: Kind;
  topicId: string;
  termChoices: TermChoice[];
  scope: 'keywords' | 'syllabus';
  count: number;
}

const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

/** /qa/quiz — chapter quizzes, terminology quizzes, scenario questions, review. ?topic=chN · ?mode=review */
export default function QaQuiz() {
  const [params] = useSearchParams();
  return <QuizPage key={params.toString()} />;
}

function QuizPage() {
  const { t } = useI18n();
  const { progress, addAttempt } = useQa();
  const chapter = useChapterLabel();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const paramTopic = params.get('topic');
  const reviewParam = params.get('mode') === 'review';

  const [cfg, setCfg] = useState<Config>(() => ({
    kind: reviewParam ? 'review' : 'topic',
    topicId: paramTopic && TOPIC_BY_ID[paramTopic] ? paramTopic : 'ch1',
    termChoices: ['definition'],
    scope: 'keywords',
    count: 10,
  }));
  const [englishOnly, setEnglishOnly] = useState(false);

  const missIds = useMemo(() => Object.entries(progress.misses).filter(([, m]) => !m.resolved).sort(([, a], [, b]) => b.lastAt.localeCompare(a.lastAt)).map(([id]) => id), [progress.misses]);
  const due = useMemo(() => dueTerms(progress), [progress]);

  const build = (c: Config): QaItem[] => {
    switch (c.kind) {
      case 'topic': return topicQuiz(c.topicId, c.count);
      case 'terms': {
        const pool = TERMS.filter((x) => (c.scope === 'keywords' ? x.keyword : x.topicIds.length > 0) && (!c.topicId || c.topicId === 'all' || x.topicIds.includes(c.topicId))).map((x) => x.id);
        return termQuiz(pool, c.termChoices.flatMap((m) => MODES[m]), c.count);
      }
      case 'scenario':
        return shuffle(QUESTIONS.filter((q) => q.scenario && (c.topicId === 'all' || q.topicId === c.topicId))).slice(0, c.count).map(questionItem);
      case 'review': return reviewQuiz(due, missIds, c.count);
    }
  };

  const [run, setRun] = useState<{ cfg: Config; items: QaItem[]; n: number } | null>(() => {
    if (!paramTopic && !reviewParam) return null;
    const items = build(cfg);
    return items.length ? { cfg, items, n: 0 } : null;
  });
  const [error, setError] = useState(() => (!!paramTopic || reviewParam) && !run);
  const [done, setDone] = useState<{ results: ItemResult[]; seconds: number } | null>(null);
  const assist = englishOnly ? 'none' : progress.settings.assist;

  const start = (c: Config = cfg) => {
    const items = build(c);
    setError(!items.length);
    if (!items.length) return;
    setDone(null);
    setRun((r) => ({ cfg: c, items, n: (r?.n ?? 0) + 1 }));
  };

  const finish = (results: ItemResult[], seconds: number) => {
    const c = run!.cfg;
    const attempt: QaAttempt = {
      id: newId(),
      at: new Date().toISOString(),
      kind: c.kind === 'topic' ? 'topic' : c.kind === 'terms' ? 'terms' : 'mixed',
      topicId: c.kind === 'topic' || ((c.kind === 'terms' || c.kind === 'scenario') && TOPIC_BY_ID[c.topicId]) ? c.topicId : undefined,
      correct: results.filter((r) => r.correct).length,
      total: results.length,
      seconds,
      byTopic: resultsByTopic(results),
    };
    addAttempt(attempt);
    setDone({ results, seconds });
  };

  const back = () => {
    setRun(null);
    setDone(null);
    if (paramTopic || reviewParam) navigate('/qa/quiz', { replace: true });
  };

  const title = (c: Config) => (c.kind === 'topic' ? t('qaStudy.quiz.topicTitle', { chapter: chapter(c.topicId) }) : t(`qaStudy.quiz.kind.${c.kind}`));

  if (run && done) {
    return (
      <div>
        <PageHeader title={title(run.cfg)} />
        <StudyResults results={done.results} seconds={done.seconds} assist={assist} onRetry={() => start(run.cfg)} onBack={back} retryLabel={t('qaStudy.quiz.newQuiz')} />
      </div>
    );
  }
  if (run) {
    return (
      <div>
        <PageHeader title={title(run.cfg)} subtitle={t('qaStudy.quiz.practiceNote')} />
        <ItemRunner key={run.n} items={run.items} assist={assist} onFinish={finish} onQuit={back} />
      </div>
    );
  }

  const set = (p: Partial<Config>) => { setCfg((c) => ({ ...c, ...p })); setError(false); };
  const scenarioCount = (topicId: string) => QUESTIONS.filter((q) => q.scenario && (topicId === 'all' || q.topicId === topicId)).length;
  const kindCard = (kind: Kind, icon: 'test' | 'book' | 'pencil' | 'refresh', body: ReactNode) => (
    <Card className={cx('cursor-pointer transition', cfg.kind === kind ? 'ring-2 ring-emerald-300' : 'hover:border-emerald-200')}>
      <label className="flex cursor-pointer items-start gap-3">
        <input type="radio" name="kind" checked={cfg.kind === kind} onChange={() => set({ kind, topicId: kind === 'topic' ? (TOPIC_BY_ID[cfg.topicId] ? cfg.topicId : 'ch1') : cfg.topicId })} className="mt-1 accent-emerald-600" />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2 font-medium"><Icon name={icon} className="h-4 w-4 text-emerald-600" /> {t(`qaStudy.quiz.kind.${kind}`)}</span>
          <span className="mt-1 block text-sm text-muted">{t(`qaStudy.quiz.kindHint.${kind}`)}</span>
        </span>
      </label>
      {cfg.kind === kind && <div className="mt-3 space-y-3 pl-7">{body}</div>}
    </Card>
  );

  return (
    <div>
      <PageHeader title={t('qaStudy.quiz.title')} subtitle={t('qaStudy.quiz.subtitle')} />
      <div className="grid gap-3 lg:grid-cols-2">
        {kindCard('topic', 'test', (
          <select className={`${SELECT} w-full`} value={cfg.topicId} onChange={(e) => set({ topicId: e.target.value })} aria-label={t('qaStudy.glossary.chapter')}>
            {TOPICS.map((x) => <option key={x.id} value={x.id}>{chapter(x.id)} · {t('qaStudy.quiz.questionsAvailable', { count: x.questionIds.length })}</option>)}
          </select>
        ))}
        {kindCard('terms', 'book', (
          <>
            <fieldset>
              <legend className="mb-1 text-xs font-medium uppercase tracking-wide text-muted">{t('qaStudy.quiz.termModes')}</legend>
              <div className="flex flex-wrap gap-2">
                {TERM_CHOICES.map((m) => {
                  const on = cfg.termChoices.includes(m);
                  return (
                    <button key={m} type="button" aria-pressed={on}
                      onClick={() => set({ termChoices: on ? (cfg.termChoices.length > 1 ? cfg.termChoices.filter((x) => x !== m) : cfg.termChoices) : [...cfg.termChoices, m] })}
                      className={cx('rounded-full px-3 py-1.5 text-xs font-medium ring-1', on ? 'bg-emerald-600 text-white ring-emerald-600' : 'bg-white text-stone-600 ring-line hover:bg-emerald-50')}>
                      {t(`qaStudy.quiz.termMode.${m}`)}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <div className="flex flex-wrap gap-2">
              <select className={SELECT} value={cfg.scope} onChange={(e) => set({ scope: e.target.value as Config['scope'] })} aria-label={t('qaStudy.glossary.scope')}>
                <option value="keywords">{t('qaStudy.glossary.scopeKeywords')}</option>
                <option value="syllabus">{t('qaStudy.glossary.scopeSyllabus')}</option>
              </select>
              <select className={SELECT} value={TOPIC_BY_ID[cfg.topicId] ? cfg.topicId : 'all'} onChange={(e) => set({ topicId: e.target.value })} aria-label={t('qaStudy.glossary.chapter')}>
                <option value="all">{t('qaStudy.glossary.allChapters')}</option>
                {TOPICS.map((x) => <option key={x.id} value={x.id}>{chapter(x.id, false)}</option>)}
              </select>
            </div>
          </>
        ))}
        {kindCard('scenario', 'pencil', (
          <select className={`${SELECT} w-full`} value={TOPIC_BY_ID[cfg.topicId] ? cfg.topicId : 'all'} onChange={(e) => set({ topicId: e.target.value })} aria-label={t('qaStudy.glossary.chapter')}>
            <option value="all">{t('qaStudy.glossary.allChapters')} · {t('qaStudy.quiz.questionsAvailable', { count: scenarioCount('all') })}</option>
            {TOPICS.map((x) => <option key={x.id} value={x.id}>{chapter(x.id, false)} · {t('qaStudy.quiz.questionsAvailable', { count: scenarioCount(x.id) })}</option>)}
          </select>
        ))}
        {kindCard('review', 'refresh', (
          <p className="text-sm text-muted">{t('qaStudy.quiz.reviewCounts', { misses: missIds.length, due: due.length })}</p>
        ))}
      </div>

      <Card className="mt-4 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted">{t('qaStudy.quiz.count')}</span>
          <div className="inline-flex gap-1 rounded-xl bg-stone-100 p-1" role="radiogroup" aria-label={t('qaStudy.quiz.count')}>
            {[10, 20].map((n) => (
              <button key={n} type="button" role="radio" aria-checked={cfg.count === n} onClick={() => set({ count: n })}
                className={cx('rounded-lg px-3 py-1.5 text-xs font-medium', cfg.count === n ? 'bg-white text-emerald-700 shadow-sm' : 'text-stone-600')}>
                {t('common.questions', { count: n })}
              </button>
            ))}
          </div>
        </div>
        <AssistToggle />
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" checked={englishOnly} onChange={(e) => setEnglishOnly(e.target.checked)} className="mt-0.5 accent-emerald-600" />
          <span>{t('qaStudy.quiz.englishOnly')}<span className="block text-xs text-muted">{t('qaStudy.quiz.englishOnlyHint')}</span></span>
        </label>
        {error && <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800" role="alert">{t('qaStudy.quiz.notEnough')}</p>}
        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => start()}>{t('qaStudy.quiz.start')}</Button>
      </Card>
    </div>
  );
}
