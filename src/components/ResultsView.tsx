import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Skill, Txt } from '../types';
import type { RunResult } from './exercises/ExerciseRunner';
import { correctAnswerText } from '../lib/grading';
import { percent, tallyBySkill } from '../lib/appData';
import { lessonRef } from '../lib/stats';
import { useI18n } from '../i18n/LocaleContext';
import { grammarOf, lessonOf, wordOf } from '../courses';
import { useAppData, useCourse } from '../state/AppDataContext';
import { AudioButton } from './Audio';
import { Prose } from './Prose';
import { Icon } from './Icon';
import { Card, ProgressBar, cx } from './ui';

/** Score, per-skill breakdown, wrong answers with explanations, and review suggestions. */
export function ResultsView({ results, actions, passMark }: { results: RunResult[]; actions?: ReactNode; passMark?: number }) {
  const { t, tr, gl } = useI18n();
  const { course } = useCourse();
  const { data } = useAppData();
  const showPron = data.settings.showPron;
  const correct = results.filter((r) => r.correct).length;
  const pct = percent(correct, results.length);
  const bySkill = tallyBySkill(results.map((r) => ({ skill: r.exercise.skill, correct: r.correct })));
  const wrong = results.filter((r) => !r.correct);

  const lessonIds = new Set<string>();
  const wordIds = new Set<string>();
  for (const r of wrong) {
    if (r.exercise.lessonId) lessonIds.add(r.exercise.lessonId);
    const g = r.exercise.grammarId ? grammarOf(course, r.exercise.grammarId) : undefined;
    if (g) lessonIds.add(g.lessonId);
    for (const id of r.exercise.wordIds ?? []) {
      const w = wordOf(course, id);
      if (!w) continue;
      wordIds.add(id);
      lessonIds.add(w.lessonId);
    }
  }
  const passed = passMark === undefined || pct >= passMark;

  return (
    <div className="fade-in space-y-5">
      <Card className="text-center">
        <div className={cx('text-5xl font-semibold', passed ? 'text-sky-600' : 'text-peach-600')}>{pct}%</div>
        <div className="mt-1 text-muted">{t('results.score', { correct, count: results.length })}</div>
        {passMark !== undefined && (
          <div className={cx('mt-2 text-sm font-medium', passed ? 'text-emerald-700' : 'text-peach-600')}>
            {passed ? t('results.passed') : t('results.failed', { mark: passMark })}
          </div>
        )}
        {actions && <div className="mt-4 flex flex-wrap justify-center gap-2">{actions}</div>}
      </Card>

      <Card>
        <h3 className="mb-3 font-semibold">{t('results.bySkill')}</h3>
        <div className="space-y-3">
          {(Object.entries(bySkill) as [Skill, { correct: number; total: number }][]).map(([skill, s]) => (
            <div key={skill}>
              <div className="mb-1 flex justify-between text-sm"><span>{t(`common.skill.${skill}`)}</span><span className="text-muted">{s.correct}/{s.total}</span></div>
              <ProgressBar value={percent(s.correct, s.total)} color={s.correct === s.total ? 'bg-emerald-400' : 'bg-sky-400'} />
            </div>
          ))}
        </div>
      </Card>

      {wrong.length > 0 && (
        <Card>
          <h3 className="mb-3 font-semibold">{t('results.wrongTitle', { n: wrong.length })}</h3>
          <ul className="space-y-3">
            {wrong.map((r, i) => (
              <li key={`${r.exercise.id}-${i}`} className="rounded-xl bg-rose-50/60 p-3 text-sm">
                <div className="font-medium">{tr(r.exercise.prompt)}</div>
                {r.exercise.text && (
                  <div>
                    <span className={cx('text-lg', course.fontClass)} lang={course.speechLang}>{r.exercise.text}</span>
                    {r.exercise.pron && showPron && <span className="ml-2 text-sky-600">{r.exercise.pron}</span>}
                  </div>
                )}
                <div className="mt-1"><span className="text-muted">{t('results.yourAnswer')}</span><span className={course.fontClass} lang={typeof r.given === 'string' && r.given !== '' ? course.speechLang : undefined}>{r.given === '' ? '—' : tr(r.given)}</span></div>
                <div><span className="text-muted">{t('results.correctAnswer')}</span><CorrectAnswer text={correctAnswerText(r.exercise)} fontClass={course.fontClass} lang={course.speechLang} /></div>
                <div className="mt-1 flex items-start justify-between gap-2">
                  <p className="text-ink"><Prose text={r.exercise.explanation} /></p>
                  {(r.exercise.audio ?? r.exercise.text) && <AudioButton text={(r.exercise.audio ?? r.exercise.text)!} size="sm" showSlow={false} />}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {(lessonIds.size > 0 || wordIds.size > 0) && (
        <Card>
          <h3 className="mb-3 font-semibold">{t('results.suggestions')}</h3>
          {lessonIds.size > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {[...lessonIds].flatMap((id) => {
                const lesson = lessonOf(course, id);
                return lesson ? [(
                  <Link key={id} to={`/lesson/${id}`} className="inline-flex items-center gap-1 rounded-lg bg-sky-50 px-3 py-1.5 text-sm text-sky-700 hover:bg-sky-100">
                    <Icon name="book" className="h-4 w-4" /> {tr(lessonRef(lesson))}
                  </Link>
                )] : [];
              })}
            </div>
          )}
          {wordIds.size > 0 && (
            <div className="flex flex-wrap gap-2">
              {[...wordIds].flatMap((id) => {
                const w = wordOf(course, id);
                return w ? [(
                  <span key={id} className="rounded-lg bg-peach-50 px-2.5 py-1 text-sm">
                    <span className={course.fontClass} lang={course.speechLang}>{w.text}</span>
                    {w.pron && showPron && <> <span className="text-sky-600">{w.pron}</span></>} <span className="text-muted">{gl(w)}</span>
                  </span>
                )] : [];
              })}
            </div>
          )}
          <p className="mt-3 text-xs text-muted">{t('results.queued')}</p>
        </Card>
      )}
    </div>
  );
}

/** Correct answer: target-language text (plain string) in the target font, meanings as normal text. */
function CorrectAnswer({ text, fontClass, lang }: { text: Txt; fontClass: string; lang: string }) {
  const { tr } = useI18n();
  return <span className={cx('font-medium text-emerald-700', fontClass)} lang={typeof text === 'string' ? lang : undefined}>{tr(text)}</span>;
}
