import { useEffect, useState } from 'react';
import { useCourse, useStudyTimer } from '../state/AppDataContext';
import { PASS_PERCENT } from '../courses';
import { buildTest, type TestSkill } from '../lib/generate';
import { percent, tallyBySkill } from '../lib/appData';
import { formatDateTime } from '../lib/dates';
import type { Exercise } from '../types';
import { ExerciseRunner, type RunResult } from '../components/exercises/ExerciseRunner';
import { ResultsView } from '../components/ResultsView';
import { NoVoiceNotice } from '../components/Audio';
import { useI18n } from '../i18n/LocaleContext';
import { quizTitle } from '../lib/stats';
import { Button, Card, PageHeader, cx } from '../components/ui';

// Labels: common.testSkill.<id>
const TEST_SKILLS: TestSkill[] = ['mixed', 'vocabulary', 'pronunciation', 'grammar', 'reading', 'listening'];

export default function Tests() {
  const { course, cp, addTestAttempt } = useCourse();
  const { t, tr, locale } = useI18n();
  useStudyTimer();
  const [skill, setSkill] = useState<TestSkill>('mixed');
  const [length, setLength] = useState<5 | 10 | 20>(10);
  const [test, setTest] = useState<{ items: Exercise[]; key: number; skill: TestSkill } | null>(null);
  const [results, setResults] = useState<RunResult[] | null>(null);

  // Switching course cancels a running test (its questions belong to the other course).
  useEffect(() => {
    setTest(null);
    setResults(null);
  }, [course.id]);

  const start = () => {
    const items = buildTest(course, cp, skill, length);
    setResults(null);
    setTest({ items, key: Date.now(), skill });
  };

  const finish = (r: RunResult[]) => {
    setResults(r);
    addTestAttempt({
      id: `test-${Date.now()}`,
      at: new Date().toISOString(),
      kind: 'test',
      testSkill: test!.skill,
      correct: r.filter((x) => x.correct).length,
      total: r.length,
      bySkill: tallyBySkill(r.map((x) => ({ skill: x.exercise.skill, correct: x.correct }))),
    });
  };

  const history = cp.quizzes.filter((q) => q.kind === 'test');
  // Built at render so it follows the interface language.
  const testTitle = test ? t('common.testTitle', { skill: t(`common.testSkill.${test.skill}`), count: test.items.length }) : '';

  return (
    <div className="space-y-6">
      <PageHeader title={t('tests.title')} subtitle={t('tests.subtitle', { course: tr(course.name) })} />
      <NoVoiceNotice />
      <Card>
        {!test ? (
          <div className="space-y-5">
            <div>
              <div className="mb-2 text-sm font-medium">{t('tests.skill')}</div>
              <div className="flex flex-wrap gap-2">
                {TEST_SKILLS.map((s) => (
                  <button key={s} type="button" onClick={() => setSkill(s)} aria-pressed={skill === s}
                    className={cx('rounded-xl border px-3 py-1.5 text-sm', skill === s ? 'border-sky-300 bg-sky-50 text-sky-700' : 'border-line bg-white')}>{t(`common.testSkill.${s}`)}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 text-sm font-medium">{t('tests.length')}</div>
              <div className="flex gap-2">
                {([5, 10, 20] as const).map((n) => (
                  <button key={n} type="button" onClick={() => setLength(n)} aria-pressed={length === n}
                    className={cx('w-16 rounded-xl border py-1.5 text-sm', length === n ? 'border-sky-300 bg-sky-50 text-sky-700' : 'border-line bg-white')}>{n}</button>
                ))}
              </div>
            </div>
            <Button onClick={start}>{t('tests.start')}</Button>
          </div>
        ) : results ? (
          <div>
            <h2 className="mb-4 text-lg font-semibold">{testTitle}</h2>
            <ResultsView results={results} actions={<><Button onClick={start}>{t('tests.newTest')}</Button><Button variant="secondary" onClick={() => { setTest(null); setResults(null); }}>{t('tests.changeType')}</Button></>} />
          </div>
        ) : test.items.length === 0 ? (
          <div>
            <p className="mb-4 text-muted">{t('tests.notEnough')}</p>
            <Button variant="secondary" onClick={() => setTest(null)}>{t('common.actions.back')}</Button>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">{testTitle}</h2>
              <button type="button" onClick={() => setTest(null)} className="text-sm text-muted hover:text-ink">{t('tests.cancelTest')}</button>
            </div>
            {test.items.length < length && <p className="mb-4 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">{t('tests.fewer', { count: test.items.length })}</p>}
            <ExerciseRunner key={test.key} exercises={test.items} onComplete={finish} />
          </div>
        )}
      </Card>

      <Card>
        <h2 className="mb-3 text-lg font-semibold">{t('tests.history')}</h2>
        {history.length === 0 ? <p className="text-sm text-muted">{t('tests.noHistory')}</p> : (
          <ul className="divide-y divide-line text-sm">
            {history.slice(0, 15).map((q) => (
              <li key={q.id} className="flex justify-between gap-3 py-2">
                <span>{tr(quizTitle(course, q))}</span>
                <span className="shrink-0 text-muted">{formatDateTime(q.at, locale)} · <b className={percent(q.correct, q.total) >= PASS_PERCENT ? 'text-emerald-700' : 'text-peach-600'}>{percent(q.correct, q.total)}%</b></span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
