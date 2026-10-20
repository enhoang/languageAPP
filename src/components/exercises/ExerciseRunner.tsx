import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Exercise, ExerciseResponse, GradeResult, Txt } from '../../types';
import { grade, toView } from '../../lib/grading';
import { useI18n } from '../../i18n/LocaleContext';
import { useAppData, useCourse, useSpeech } from '../../state/AppDataContext';
import { AudioButton } from '../Audio';
import { Prose } from '../Prose';
import { Icon } from '../Icon';
import { Badge, Button, ProgressBar, cx } from '../ui';
import { ArrangeInput, ChoiceInput, MatchInput, TypeInput } from './inputs';

export interface RunResult {
  exercise: Exercise;
  correct: boolean;
  given: Txt;
}

/**
 * Presents exercises one at a time. Components only receive the answer-free view;
 * grading happens here after the learner submits.
 */
export function ExerciseRunner({ exercises, onComplete, record = true, finishLabel }: {
  exercises: Exercise[];
  onComplete: (results: RunResult[]) => void;
  record?: boolean;
  finishLabel?: string;
}) {
  const { t, tr } = useI18n();
  const { data } = useAppData();
  const { course, recordAnswer } = useCourse();
  const { speak, hasVoice } = useSpeech();
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<RunResult[]>([]);
  const [response, setResponse] = useState<ExerciseResponse | null>(null);
  const [graded, setGraded] = useState<GradeResult | null>(null);
  const [revealPron, setRevealPron] = useState(false);

  const ex = exercises[index];
  const view = useMemo(() => (ex ? toView(ex, course) : null), [ex, course]);
  const isLast = index === exercises.length - 1;
  const showPron = data.settings.showPron || revealPron;

  // Listening items without visible target text play automatically.
  useEffect(() => {
    if (view?.audio && !view.text && hasVoice) {
      const timer = window.setTimeout(() => speak(view.audio!), 250);
      return () => window.clearTimeout(timer);
    }
  }, [view, hasVoice, speak]);

  const submit = useCallback(() => {
    if (!ex || !response || graded) return;
    const g = grade(ex, response);
    setGraded(g);
    setResults((r) => [...r, { exercise: ex, correct: g.correct, given: g.given }]);
    if (record) recordAnswer({ exercise: ex, correct: g.correct, given: g.given });
  }, [ex, response, graded, record, recordAnswer]);

  const next = useCallback(() => {
    if (!graded) return;
    if (isLast) {
      onComplete(results);
      return;
    }
    setIndex((i) => i + 1);
    setResponse(null);
    setGraded(null);
    setRevealPron(false);
  }, [graded, isLast, onComplete, results]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return;
      if ((e.target as HTMLElement)?.tagName === 'INPUT' && !graded) return; // the form handles it
      e.preventDefault();
      if (graded) next();
      else submit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [graded, next, submit]);

  if (!ex || !view) return <p className="text-muted">{t('exercise.empty')}</p>;

  const replayText = ex.audio ?? ex.text;
  // Plain strings are target-language text (or its pronunciation); Txt objects are meanings / prose.
  const answerLang = (x: Txt) => (typeof x === 'string' ? course.speechLang : undefined);

  return (
    <div className="fade-in" key={`${index}-${ex.id}`}>
      <div className="mb-2 flex items-center justify-between text-sm text-muted">
        <span>{t('exercise.progress', { current: index + 1, total: exercises.length })}</span>
        <Badge tone="peach">{t(`common.skill.${ex.skill}`)}</Badge>
      </div>
      <ProgressBar value={(index / exercises.length) * 100} className="mb-5" />

      <h3 className="text-lg font-medium">{tr(view.prompt)}</h3>

      {(view.text || view.audio) && (
        <div className="my-5 flex flex-col items-center gap-3 rounded-2xl bg-cream px-4 py-6">
          {view.text && (
            <>
              {view.pron && (showPron ? (
                <div className="text-lg font-medium text-sky-600">{view.pron}</div>
              ) : (
                <button type="button" onClick={() => setRevealPron(true)} className="text-xs text-sky-500 underline decoration-dotted">
                  {t('exercise.showPron', { name: tr(course.pronName) })}
                </button>
              ))}
              <div className={cx('text-center text-4xl leading-snug sm:text-5xl', course.fontClass)} lang={course.speechLang}>{view.text}</div>
            </>
          )}
          {view.audio && <AudioButton text={view.audio} size="lg" />}
        </div>
      )}
      <div className={cx(!(view.text || view.audio) && 'mt-4')}>
        {view.kind === 'choice' && <ChoiceInput view={view} onChange={setResponse} graded={graded} />}
        {view.kind === 'match' && <MatchInput view={view} onChange={setResponse} graded={graded} />}
        {view.kind === 'arrange' && <ArrangeInput view={view} onChange={setResponse} graded={graded} />}
        {view.kind === 'type' && <TypeInput view={view} onChange={setResponse} graded={graded} onSubmit={submit} />}
      </div>

      {graded && (
        <div className={cx('fade-in mt-5 rounded-2xl border p-4', graded.correct ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50')} role="status">
          <div className={cx('flex items-center gap-2 font-semibold', graded.correct ? 'text-emerald-700' : 'text-rose-700')}>
            <Icon name={graded.correct ? 'check' : 'x'} />
            {graded.correct ? t('exercise.correct') : t('exercise.incorrect')}
          </div>
          {!graded.correct && (
            <div className="mt-2 space-y-1 text-sm">
              <div><span className="text-muted">{t('exercise.correctAnswer')}</span><span className={cx('text-base font-medium', course.fontClass)} lang={answerLang(graded.correctAnswer)}>{tr(graded.correctAnswer)}</span></div>
              {graded.given !== '' && <div><span className="text-muted">{t('exercise.yourAnswer')}</span><span className={course.fontClass} lang={answerLang(graded.given)}>{tr(graded.given)}</span></div>}
            </div>
          )}
          {graded.hint && <div className="mt-1 text-sm text-amber-700">{tr(graded.hint)}</div>}
          <div className="mt-2 flex items-start justify-between gap-3">
            <p className="text-sm text-ink"><Prose text={ex.explanation} /></p>
            {replayText && <AudioButton text={replayText} size="sm" />}
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        {!graded ? (
          <Button onClick={submit} disabled={!response}>{t('common.actions.check')}</Button>
        ) : (
          <Button onClick={next}>{isLast ? (finishLabel ?? t('common.actions.seeResults')) : t('common.actions.continue')} <Icon name="right" className="h-4 w-4" /></Button>
        )}
      </div>
    </div>
  );
}
