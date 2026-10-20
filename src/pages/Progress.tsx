import { Link } from 'react-router-dom';
import { useAppData, useCourse } from '../state/AppDataContext';
import { COURSE_IDS, COURSES, wordOf } from '../courses';
import { percent } from '../lib/appData';
import { formatDateTime } from '../lib/dates';
import { completedLessonIds, computeStreak, dueWordIds, lessonRef, masteryCounts, quizTitle, recommendNext, totalActivity, weakTopics, weeklySeconds } from '../lib/stats';
import { useI18n } from '../i18n/LocaleContext';
import type { Skill, Word } from '../types';
import { courseSummary } from './Courses';
import { cx } from '../components/ui';
import { WeeklyChart } from '../components/WeeklyChart';
import { ButtonLink, Card, PageHeader, ProgressBar, SectionTitle, Stat } from '../components/ui';

const MASTERY_COLORS = { new: 'bg-stone-200', learning: 'bg-amber-300', familiar: 'bg-sky-400', mastered: 'bg-emerald-400' } as const;

export default function Progress() {
  const { data } = useAppData();
  const { course, cp } = useCourse();
  const { t, tr, locale } = useI18n();
  const now = new Date();
  const mastery = masteryCounts(course, cp);
  const totalWords = Object.values(mastery).reduce((a, b) => a + b, 0);
  const due = dueWordIds(cp, now);
  const weak = weakTopics(course, cp);
  const rec = recommendNext(course, cp, now);
  const acts = Object.values(cp.activity);
  const totalMinutes = Math.round(acts.reduce((s, a) => s + a.seconds, 0) / 60);
  const totalAnswers = acts.reduce((s, a) => s + a.answers, 0);
  const totalCorrect = acts.reduce((s, a) => s + a.correct, 0);
  const { showPron, englishAccent } = data.settings;
  const pronOf = (w: Word) => (course.id === 'en' && englishAccent === 'en-GB' && w.pronUK ? w.pronUK : w.pron);

  return (
    <div className="space-y-6">
      <PageHeader title={t('progress.title', { name: tr(course.name) })} subtitle={t('progress.subtitle')} />

      <Card className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-br from-sky-50 to-white">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-sky-600">{t('progress.recommended')}</div>
          <div className="mt-1 font-semibold">{tr(rec.title)}</div>
          <div className="text-sm text-muted">{tr(rec.detail)}</div>
        </div>
        <ButtonLink to={rec.to}>{tr(rec.cta)}</ButtonLink>
      </Card>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label={t('progress.stat.lessonsCompleted')} value={`${completedLessonIds(course, cp).length}/${course.lessons.length}`} />
        <Stat label={t('progress.stat.totalTime')} value={t('common.minutes', { count: totalMinutes })} />
        <Stat label={t('progress.stat.accuracy')} value={`${percent(totalCorrect, totalAnswers)}%`} hint={t('progress.stat.answered', { count: totalAnswers })} />
        <Stat label={t('progress.stat.streak')} value={computeStreak(totalActivity(data), now)} hint={t('progress.stat.allLanguages')} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle>{t('progress.activity')}</SectionTitle>
          <WeeklyChart days={weeklySeconds(cp.activity, now)} goalMinutes={data.settings.sessionMinutes} />
          <p className="mt-3 text-xs text-muted">{t('progress.activityNote', { name: tr(course.name) })}</p>
        </Card>
        <Card>
          <SectionTitle>{t('progress.mastery')}</SectionTitle>
          <div className="flex h-4 w-full gap-0.5 overflow-hidden rounded-full" role="img" aria-label={t('progress.masteryAria')}>
            {(Object.keys(mastery) as (keyof typeof mastery)[]).map((k) => mastery[k] > 0 && (
              <div key={k} className={MASTERY_COLORS[k]} style={{ width: `${totalWords ? (mastery[k] / totalWords) * 100 : 0}%` }} />
            ))}
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {(Object.keys(mastery) as (keyof typeof mastery)[]).map((k) => (
              <li key={k} className="flex items-center gap-2"><span className={`h-3 w-3 rounded-sm ${MASTERY_COLORS[k]}`} />{t(`common.status.${k}`)}: <b>{mastery[k]}</b></li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle>{t('progress.skills')}</SectionTitle>
          {Object.keys(cp.skillStats).length === 0 ? <p className="text-sm text-muted">{t('progress.skillsEmpty')}</p> : (
            <div className="space-y-3">
              {(Object.entries(cp.skillStats) as [Skill, { correct: number; total: number }][]).map(([k, s]) => (
                <div key={k}>
                  <div className="mb-1 flex justify-between text-sm"><span>{t(`common.skill.${k}`)}</span><span className="text-muted">{percent(s.correct, s.total)}% · {t('common.questions', { count: s.total })}</span></div>
                  <ProgressBar value={percent(s.correct, s.total)} />
                </div>
              ))}
            </div>
          )}
        </Card>
        <Card>
          <SectionTitle>{t('progress.weak')}</SectionTitle>
          {weak.length === 0 ? <p className="text-sm text-muted">{t('progress.weakEmpty')}</p> : (
            <ul className="space-y-2">
              {weak.slice(0, 6).map((w) => (
                <li key={`${w.link}-${tr(w.label)}`}><Link to={w.link} className="flex justify-between gap-2 rounded-xl bg-peach-50 px-3 py-2 text-sm hover:bg-peach-100"><span>{tr(w.label)}</span><span className="text-muted">{tr(w.detail)}</span></Link></li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <SectionTitle>{t('progress.reviewQueue', { count: due.length })}</SectionTitle>
          {due.length > 0 && <ButtonLink to="/practice?mode=review" variant="secondary">{t('progress.reviewNow')}</ButtonLink>}
        </div>
        {due.length === 0 ? <p className="text-sm text-muted">{t('progress.noDue')}</p> : (
          <div className="flex flex-wrap gap-2">
            {due.slice(0, 40).map((id) => {
              const w = wordOf(course, id);
              const p = cp.words[id];
              const pron = w && showPron ? pronOf(w) : undefined;
              return w && p && (
                <span key={id} className={`rounded-lg px-2.5 py-1 text-sm ${p.lapses > 0 && p.interval === 0 ? 'bg-rose-50' : 'bg-sky-50'}`} title={t('progress.lapses', { count: p.lapses })}>
                  <span lang={course.speechLang} className={course.fontClass}>{w.text}</span>{pron && <> <span className="text-sky-600">{pron}</span></>}
                </span>
              );
            })}
          </div>
        )}
        <p className="mt-2 text-xs text-muted">{t('progress.lapsedLegend')}</p>
      </Card>

      <Card>
        <SectionTitle>{t('progress.allCourses')}</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[22rem] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                <th scope="col" className="py-2 pr-2 font-medium">{t('progress.table.course')}</th>
                <th scope="col" className="px-2 py-2 text-right font-medium">{t('progress.table.lessons')}</th>
                <th scope="col" className="px-2 py-2 text-right font-medium">{t('progress.table.words')}</th>
                <th scope="col" className="px-2 py-2 text-right font-medium">{t('progress.table.accuracy')}</th>
                <th scope="col" className="py-2 pl-2 text-right font-medium">{t('progress.table.quizzes')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {COURSE_IDS.map((id) => {
                const c = COURSES[id];
                const sm = courseSummary(c, data.courses[id], now);
                return (
                  <tr key={id} className={cx(id === course.id && 'bg-sky-50/60')}>
                    <th scope="row" className="py-2 pr-2 text-left font-medium">
                      <span lang={c.speechLang} className={cx('mr-1.5', c.fontClass)}>{c.endonym}</span>
                      <span className="text-muted">{tr(c.name)}</span>
                    </th>
                    <td className="px-2 py-2 text-right">{sm.lessonsDone}/{sm.lessonsTotal}</td>
                    <td className="px-2 py-2 text-right">{sm.wordsLearned}</td>
                    <td className="px-2 py-2 text-right">{sm.accuracy === null ? '—' : `${sm.accuracy}%`}</td>
                    <td className="py-2 pl-2 text-right">{sm.quizzes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <SectionTitle>{t('progress.lessons')}</SectionTitle>
        <ul className="divide-y divide-line text-sm">
          {course.lessons.map((l) => {
            const lp = cp.lessons[l.id];
            return (
              <li key={l.id} className="flex items-center justify-between gap-3 py-2">
                <Link to={`/lesson/${l.id}`} className="hover:underline">{tr(lessonRef(l))}</Link>
                <span className="shrink-0 text-muted">
                  {lp?.status === 'completed' ? <span className="text-emerald-700">✓ {lp.bestScore}%</span> : lp ? (lp.attempts && lp.bestScore !== undefined ? t('progress.inProgressBest', { pct: lp.bestScore }) : t('progress.inProgress')) : t('progress.notStarted')}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card>
        <SectionTitle>{t('progress.quizHistory')}</SectionTitle>
        {cp.quizzes.length === 0 ? <p className="text-sm text-muted">{t('progress.noQuizzes')}</p> : (
          <ul className="divide-y divide-line text-sm">
            {cp.quizzes.slice(0, 20).map((q) => (
              <li key={q.id} className="flex justify-between gap-3 py-2">
                <span className="min-w-0 truncate">{tr(quizTitle(course, q))}</span>
                <span className="shrink-0 text-muted">{formatDateTime(q.at, locale)} · <b>{q.correct}/{q.total}</b></span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
