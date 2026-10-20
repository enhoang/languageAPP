import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppData, useCourse, useStudyTimer } from '../state/AppDataContext';
import { courseOfLesson, grammarOf, lessonOf, PASS_PERCENT, wordOf } from '../courses';
import { isLessonUnlocked, lessonRef } from '../lib/stats';
import { useI18n } from '../i18n/LocaleContext';
import { Prose } from '../components/Prose';
import type { Course, Lesson, LessonSection } from '../types';
import { ExerciseRunner, type RunResult } from '../components/exercises/ExerciseRunner';
import { ResultsView } from '../components/ResultsView';
import { GrammarBlock } from '../components/GrammarBlock';
import { WordCard } from '../components/WordCard';
import { SoundGrid } from '../components/SoundGrid';
import { TargetText } from '../components/TargetText';
import { SpeakPractice } from '../components/SpeakPractice';
import { StrokeOrder } from '../components/StrokeOrder';
import { NoVoiceNotice } from '../components/Audio';
import { Icon } from '../components/Icon';
import { Badge, Button, ButtonLink, Card, cx } from '../components/ui';

const STEPS = ['goals', 'lesson', 'practice', 'quiz', 'summary'] as const;

function Section({ s, course }: { s: LessonSection; course: Course }) {
  const { t, tr } = useI18n();
  switch (s.kind) {
    case 'text':
      return (
        <Card>
          <h3 className="mb-2 font-semibold">{tr(s.title)}</h3>
          <div className="space-y-2 text-ink">{s.body.map((p, i) => <p key={i}><Prose text={p} /></p>)}</div>
        </Card>
      );
    case 'tip':
      return (
        <div className="rounded-2xl border border-peach-200 bg-peach-50 p-4">
          <div className="mb-1 font-semibold text-peach-600">💡 {tr(s.title)}</div>
          <p className="text-sm text-ink"><Prose text={s.body} /></p>
        </div>
      );
    case 'sounds':
      return (
        <Card>
          <h3 className="mb-1 font-semibold">{tr(s.title)}</h3>
          {s.intro && <p className="mb-3 text-sm text-muted"><Prose text={s.intro} /></p>}
          <SoundGrid items={s.items} />
        </Card>
      );
    case 'words':
      return (
        <div>
          <h3 className="mb-2 font-semibold">{tr(s.title)}</h3>
          <div className="grid gap-3 md:grid-cols-2">{s.wordIds.map((id) => wordOf(course, id)).filter((w) => !!w).map((w) => <WordCard key={w.id} word={w} />)}</div>
        </div>
      );
    case 'examples':
      return (
        <Card>
          <h3 className="mb-3 font-semibold">{tr(s.title)}</h3>
          <div className="divide-y divide-line">
            {s.examples.map((e) => <div key={e.text} className="py-2"><TargetText text={e.text} pron={e.pron} meaning={e} size="sm" /></div>)}
          </div>
        </Card>
      );
    case 'grammar': {
      const g = grammarOf(course, s.grammarId);
      if (!g) return null;
      return (
        <Card>
          <div className="mb-3 flex items-center gap-2"><Badge tone="peach">{t('common.skill.grammar')}</Badge><h3 className="font-semibold">{tr(g.title)}</h3></div>
          <GrammarBlock g={g} />
        </Card>
      );
    }
    case 'speak':
      return (
        <Card>
          <h3 className="mb-1 font-semibold">{tr(s.title)}</h3>
          {s.intro && <p className="mb-3 text-sm text-muted"><Prose text={s.intro} /></p>}
          <SpeakPractice items={s.items} />
        </Card>
      );
    case 'strokes':
      return (
        <Card>
          <h3 className="mb-1 font-semibold">{tr(s.title)}</h3>
          {s.intro && <p className="mb-3 text-sm text-muted"><Prose text={s.intro} /></p>}
          <StrokeOrder chars={s.chars} />
        </Card>
      );
  }
}

export default function LessonPage() {
  const { id = '' } = useParams();
  const { setCurrentCourse } = useAppData();
  const { course, cp } = useCourse();
  const { t, tr } = useI18n();
  const owner = courseOfLesson(id);
  // A link to another course's lesson switches the course being studied.
  useEffect(() => {
    if (owner && owner.id !== course.id) setCurrentCourse(owner.id);
  }, [owner, course.id]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!owner) return <p className="text-muted">{t('lesson.notFound')} <Link className="text-sky-600 underline" to="/path">{t('lesson.backToPath')}</Link></p>;
  if (owner.id !== course.id) return <p className="text-muted">{t('lesson.switching', { course: tr(owner.name) })}</p>;
  const lesson = lessonOf(course, id);
  if (!lesson) return <p className="text-muted">{t('lesson.notFound')} <Link className="text-sky-600 underline" to="/path">{t('lesson.backToPath')}</Link></p>;
  if (!isLessonUnlocked(cp, lesson)) {
    const prev = lesson.prerequisites.map((p) => lessonOf(course, p)).find((l) => l && !isLessonUnlocked(cp, l)) ?? lessonOf(course, lesson.prerequisites[0]);
    return (
      <Card className="mx-auto max-w-lg text-center">
        <Icon name="lock" className="mx-auto h-8 w-8 text-stone-400" />
        <h1 className="mt-2 text-xl font-semibold">{t('lesson.locked.title')}</h1>
        <p className="mt-1 text-muted">{prev ? t('lesson.locked.body', { lesson: tr(lessonRef(prev)) }) : t('lesson.noPrevious')}</p>
        {prev ? <ButtonLink to={`/lesson/${prev.id}`} className="mt-4">{t('lesson.locked.goTo', { day: prev.day })}</ButtonLink> : <ButtonLink to="/path" className="mt-4">{t('lesson.backToPath')}</ButtonLink>}
      </Card>
    );
  }
  return <LessonFlow key={`${course.id}-${lesson.id}`} course={course} lesson={lesson} />;
}

function LessonFlow({ course, lesson }: { course: Course; lesson: Lesson }) {
  const { cp, startLesson, setLessonStep, finishLessonQuiz } = useCourse();
  const navigate = useNavigate();
  const { t, tr } = useI18n();
  useStudyTimer();
  const lp = cp.lessons[lesson.id];
  const completed = lp?.status === 'completed';
  const [step, setStep] = useState(() => (completed ? 0 : Math.min(lp?.step ?? 0, 3)));
  const [practiceResults, setPracticeResults] = useState<RunResult[] | null>(null);
  const [quizResults, setQuizResults] = useState<RunResult[] | null>(null);
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    startLesson(lesson.id);
  }, [lesson.id]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setLessonStep(lesson.id, step);
    window.scrollTo(0, 0);
  }, [step, lesson.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const lessons = course.lessons;
  const idx = lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = idx > 0 ? lessons[idx - 1] : undefined;
  const nextLessonItem = lessons[idx + 1] as Lesson | undefined;
  const nextUnlocked = !!nextLessonItem && isLessonUnlocked(cp, nextLessonItem);
  // Steps after "Bài học" are reachable once the learner has opened them before or completed the lesson.
  const maxReachable = completed ? 4 : Math.max(lp?.step ?? 0, step);

  const onQuizDone = (results: RunResult[]) => {
    finishLessonQuiz(lesson.id, results.map((r) => ({ skill: r.exercise.skill, correct: r.correct })));
    setQuizResults(results);
    setStep(4);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-2 text-sm">
        <Link to="/path" className="inline-flex items-center gap-1 text-muted hover:text-ink"><Icon name="left" className="h-4 w-4" /> {t('common.nav.path')}</Link>
        <div className="flex items-center gap-2">
          {completed && <Badge tone="green">{t('lesson.completed')}</Badge>}
          <span className="text-muted">~{t('common.minutes', { count: lesson.minutes })}</span>
        </div>
      </div>
      <div className="mb-1 text-sm font-medium text-peach-600">{t('common.day', { day: lesson.day })} · {t('common.stage', { n: lesson.stage })}</div>
      <h1 className="text-2xl font-semibold tracking-tight">{tr(lesson.title)}</h1>
      <p className="mt-1 text-muted">{tr(lesson.subtitle)}</p>

      <nav className="my-6 flex gap-1 overflow-x-auto rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-line" aria-label={t('lesson.steps.label')}>
        {STEPS.map((stepId, i) => {
          const reachable = i <= maxReachable || (i === 4 && !!quizResults);
          return (
            <button key={stepId} type="button" disabled={!reachable} onClick={() => setStep(i)} aria-current={step === i ? 'step' : undefined}
              className={cx('flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2 text-sm transition',
                step === i ? 'bg-sky-500 font-medium text-white' : reachable ? 'text-ink hover:bg-sky-50' : 'text-stone-300')}>
              <span className={cx('flex h-5 w-5 items-center justify-center rounded-full text-[11px]', step === i ? 'bg-white/25' : 'bg-stone-100')}>{i + 1}</span>
              {t(`lesson.steps.${stepId}`)}
            </button>
          );
        })}
      </nav>

      <NoVoiceNotice />

      {step === 0 && (
        <div className="space-y-4 fade-in">
          <Card>
            <h2 className="mb-3 text-lg font-semibold">{t('lesson.objectives')}</h2>
            <ul className="space-y-2">
              {lesson.objectives.map((o, i) => <li key={i} className="flex gap-2"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-sky-500" /><span><Prose text={o} /></span></li>)}
            </ul>
          </Card>
          <Card>
            <h2 className="mb-3 text-lg font-semibold">{t('lesson.intro')}</h2>
            <div className="space-y-3 leading-relaxed">{lesson.intro.map((p, i) => <p key={i}><Prose text={p} /></p>)}</div>
          </Card>
          <div className="flex justify-end"><Button onClick={() => setStep(1)}>{t('lesson.enterLesson')} <Icon name="right" className="h-4 w-4" /></Button></div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5 fade-in">
          {lesson.sections.map((s, i) => <Section key={i} s={s} course={course} />)}
          <div className="flex justify-end"><Button onClick={() => setStep(2)}>{t('lesson.toPractice')} <Icon name="right" className="h-4 w-4" /></Button></div>
        </div>
      )}

      {step === 2 && (
        <Card className="fade-in">
          {!practiceResults ? (
            <>
              <p className="mb-4 rounded-xl bg-sky-50 px-3 py-2 text-sm text-sky-800">{t('lesson.practice.intro')}</p>
              <ExerciseRunner key={`p-${runKey}`} exercises={lesson.practice} onComplete={setPracticeResults} finishLabel={t('lesson.practice.finish')} />
            </>
          ) : (
            <div className="text-center">
              <div className="text-lg font-semibold">{t('lesson.practice.done', { correct: practiceResults.filter((r) => r.correct).length, total: practiceResults.length })}</div>
              <p className="mt-1 text-muted">{t('lesson.practice.ready', { pass: PASS_PERCENT })}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Button variant="secondary" onClick={() => { setPracticeResults(null); setRunKey((k) => k + 1); }}><Icon name="refresh" className="h-4 w-4" /> {t('lesson.practice.again')}</Button>
                <Button onClick={() => setStep(3)}>{t('lesson.practice.takeQuiz')} <Icon name="right" className="h-4 w-4" /></Button>
              </div>
            </div>
          )}
          {!practiceResults && <button type="button" onClick={() => setStep(3)} className="mt-4 text-sm text-muted underline decoration-dotted">{t('lesson.practice.skip')}</button>}
        </Card>
      )}

      {step === 3 && (
        <Card className="fade-in">
          <p className="mb-4 rounded-xl bg-peach-50 px-3 py-2 text-sm text-peach-600">{t('lesson.quiz.intro', { count: lesson.quiz.length, pass: PASS_PERCENT })}</p>
          <ExerciseRunner key={`q-${runKey}`} exercises={lesson.quiz} onComplete={onQuizDone} />
        </Card>
      )}

      {step === 4 && (
        <div className="space-y-5 fade-in">
          {quizResults && (
            <ResultsView results={quizResults} passMark={PASS_PERCENT} actions={
              <Button variant="secondary" onClick={() => { setQuizResults(null); setRunKey((k) => k + 1); setStep(3); }}><Icon name="refresh" className="h-4 w-4" /> {t('lesson.quiz.retake')}</Button>
            } />
          )}
          <Card>
            <h2 className="mb-3 text-lg font-semibold">{t('lesson.summary.title')}</h2>
            <ul className="space-y-2">
              {lesson.summary.map((s, i) => <li key={i} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" /><span><Prose text={s} /></span></li>)}
            </ul>
            {!quizResults && lp?.bestScore !== undefined && <p className="mt-3 text-sm text-muted">{t('lesson.summary.bestScore', { score: lp.bestScore, count: lp.attempts })}</p>}
          </Card>
          <Card className={cx(completed ? 'bg-emerald-50/60' : 'bg-peach-50/60')}>
            {completed ? (
              <>
                <div className="font-semibold text-emerald-700">✓ {t('lesson.summary.completedTitle', { day: lesson.day })}</div>
                <p className="mt-1 text-sm text-muted">{t('lesson.summary.completedBody')}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {nextLessonItem && nextUnlocked ? (
                    <Button onClick={() => navigate(`/lesson/${nextLessonItem.id}`)}>{t('lesson.summary.nextLesson', { day: nextLessonItem.day })} <Icon name="right" className="h-4 w-4" /></Button>
                  ) : (
                    <ButtonLink to="/path">{t('lesson.summary.viewPath')}</ButtonLink>
                  )}
                  <ButtonLink to="/practice" variant="secondary">{t('lesson.summary.morePractice')}</ButtonLink>
                  <ButtonLink to="/" variant="ghost">{t('common.actions.home')}</ButtonLink>
                </div>
                {nextLessonItem && <p className="mt-3 text-xs text-muted">{t('lesson.summary.hint')}</p>}
              </>
            ) : (
              <>
                <div className="font-semibold text-peach-600">{t('lesson.summary.notCompletedTitle')}</div>
                <p className="mt-1 text-sm text-muted">{t('lesson.summary.notCompletedBody', { pass: PASS_PERCENT })}</p>
                <div className="mt-3 flex gap-2">
                  <Button variant="secondary" onClick={() => setStep(1)}>{t('lesson.summary.reviewLesson')}</Button>
                  <Button onClick={() => { setQuizResults(null); setRunKey((k) => k + 1); setStep(3); }}>{t('lesson.summary.retakeQuiz')}</Button>
                </div>
              </>
            )}
          </Card>
        </div>
      )}

      <div className="mt-8 flex justify-between border-t border-line pt-4 text-sm">
        {prevLesson ? <Link to={`/lesson/${prevLesson.id}`} className="inline-flex items-center gap-1 text-muted hover:text-ink"><Icon name="left" className="h-4 w-4" /> {t('common.day', { day: prevLesson.day })}</Link> : <span />}
        {nextLessonItem && (nextUnlocked
          ? <Link to={`/lesson/${nextLessonItem.id}`} className="inline-flex items-center gap-1 text-muted hover:text-ink">{t('common.day', { day: nextLessonItem.day })} <Icon name="right" className="h-4 w-4" /></Link>
          : <span className="inline-flex items-center gap-1 text-stone-300"><Icon name="lock" className="h-4 w-4" /> {t('common.day', { day: nextLessonItem.day })}</span>)}
      </div>
    </div>
  );
}
