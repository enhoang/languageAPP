import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCourse, useStudyTimer } from '../state/AppDataContext';
import { grammarOf, lessonOf } from '../courses';
import { isLessonUnlocked, lessonRef, openGrammarMistakes } from '../lib/stats';
import { useI18n } from '../i18n/LocaleContext';
import { GrammarBlock } from '../components/GrammarBlock';
import { ExerciseRunner, type RunResult } from '../components/exercises/ExerciseRunner';
import { ResultsView } from '../components/ResultsView';
import { Icon } from '../components/Icon';
import { Badge, Button, ButtonLink, Card, PageHeader, cx } from '../components/ui';

export function GrammarList() {
  const { course, cp } = useCourse();
  const { t, tr } = useI18n();
  return (
    <div>
      <PageHeader title={t('grammar.title')} subtitle={t('grammar.subtitle')} />
      {course.grammar.length === 0 && <div className="rounded-2xl border border-dashed border-line py-16 text-center text-muted">{t('grammar.empty')}</div>}
      <div className="grid gap-3 md:grid-cols-2">
        {course.grammar.map((g) => {
          const lesson = lessonOf(course, g.lessonId);
          if (!lesson) return null;
          const unlocked = isLessonUnlocked(cp, lesson);
          const miss = openGrammarMistakes(course, cp, g.id);
          const body = (
            <Card className={unlocked ? 'h-full transition hover:border-sky-300' : 'h-full opacity-60'}>
              <div className="flex items-start justify-between gap-2">
                <div className={cx(course.fontClass, 'text-lg font-semibold')}>{tr(g.title)}</div>
                {unlocked ? <Badge>{t('common.day', { day: lesson.day })}</Badge> : <Icon name="lock" className="h-4 w-4 text-stone-400" />}
              </div>
              <div className={cx(course.fontClass, 'mt-1 text-sm text-sky-700')}>{tr(g.pattern)}</div>
              <div className="mt-2 text-sm text-muted">{unlocked ? tr(g.meaning[0]) : t('grammar.unlocksAt', { lesson: tr(lessonRef(lesson)) })}</div>
              {miss > 0 && <div className="mt-2"><Badge tone="rose">{t('grammar.mistakesToFix', { count: miss })}</Badge></div>}
            </Card>
          );
          return unlocked ? <Link key={g.id} to={`/grammar/${g.id}`}>{body}</Link> : <div key={g.id}>{body}</div>;
        })}
      </div>
    </div>
  );
}

export function GrammarDetail() {
  const { id = '' } = useParams();
  const { course, cp } = useCourse();
  const g = grammarOf(course, id);
  const { t, tr } = useI18n();
  useStudyTimer();
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<RunResult[] | null>(null);
  const [runKey, setRunKey] = useState(0);
  if (!g) return <p className="text-muted">{t('grammar.notFound')}</p>;
  const lesson = lessonOf(course, g.lessonId);
  if (!lesson) return <p className="text-muted">{t('grammar.notFound')}</p>;
  if (!isLessonUnlocked(cp, lesson)) {
    return (
      <Card className="mx-auto max-w-lg text-center">
        <Icon name="lock" className="mx-auto h-8 w-8 text-stone-400" />
        <p className="mt-2">{t('grammar.lockedBody', { day: lesson.day })}</p>
        <ButtonLink to="/path" className="mt-4">{t('grammar.backToPath')}</ButtonLink>
      </Card>
    );
  }
  return (
    <div className="space-y-5">
      <Link to="/grammar" className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink"><Icon name="left" className="h-4 w-4" /> {t('common.nav.grammar')}</Link>
      <PageHeader title={tr(g.title)} subtitle={t('grammar.learnedIn', { lesson: tr(lessonRef(lesson)) })} />
      <Card><GrammarBlock g={g} /></Card>
      <Card>
        <h2 className="mb-3 text-lg font-semibold">{t('grammar.exercises', { count: g.exercises.length })}</h2>
        {!running ? (
          <Button onClick={() => setRunning(true)}>{t('common.actions.start')}</Button>
        ) : results ? (
          <ResultsView results={results} actions={<Button onClick={() => { setResults(null); setRunKey((k) => k + 1); }}>{t('common.actions.retry')}</Button>} />
        ) : (
          <ExerciseRunner key={runKey} exercises={g.exercises} onComplete={setResults} />
        )}
      </Card>
    </div>
  );
}
