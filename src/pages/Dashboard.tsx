import { Link } from 'react-router-dom';
import { useAppData, useCourse } from '../state/AppDataContext';
import { COURSE_IDS, COURSES } from '../courses';
import { dayKey } from '../lib/dates';
import { percent } from '../lib/appData';
import { completedLessonIds, computeStreak, currentStage, dueWordIds, isActiveDay, learnedWordIds, lessonRef, nextLesson, quizTitle, recommendNext, totalActivity, weeklySeconds } from '../lib/stats';
import { courseSummary } from './Courses';
import { useInlineCourseName } from '../components/CourseSwitcher';
import { formatDateTime } from '../lib/dates';
import { WeeklyChart } from '../components/WeeklyChart';
import { Icon } from '../components/Icon';
import { NoVoiceNotice } from '../components/Audio';
import { ButtonLink, Card, ProgressBar, Stat, cx } from '../components/ui';
import { useI18n } from '../i18n/LocaleContext';
import type { CourseId, Settings } from '../types';

/** "Hello" in each target language, shown next to the greeting. */
const HELLO: Record<CourseId, string> = { zh: '你好！', en: 'Hello!', ko: '안녕하세요!' };

const REVIEW_LIMIT: Record<Settings['sessionMinutes'], number> = { 10: 5, 20: 10, 30: 20 };

export default function Dashboard() {
  const { data, updateSettings, setCurrentCourse } = useAppData();
  const { course, cp } = useCourse();
  const { t, tr, locale } = useI18n();
  const inline = useInlineCourseName();
  const now = new Date();
  // Streak, daily goal and the weekly chart add up every language studied.
  const all = totalActivity(data);
  const todayKey = dayKey(now);
  const goal = data.settings.sessionMinutes;
  const minutesToday = Math.floor((all[todayKey]?.seconds ?? 0) / 60);
  const due = dueWordIds(cp, now);
  const next = nextLesson(course, cp);
  const rec = recommendNext(course, cp, now);
  const done = completedLessonIds(course, cp);
  const stage = course.stages.find((s) => s.id === currentStage(course, cp));
  const openMistakes = cp.mistakes.filter((m) => !m.resolved).length;
  const lessonDoneToday = (cp.activity[todayKey]?.lessonsCompleted ?? 0) > 0;
  const isNew = Object.keys(cp.lessons).length === 0 && cp.quizzes.length === 0;
  const others = COURSE_IDS.filter((id) => id !== course.id);

  // "Welcome back" when the last active day (any language) was 3+ days ago.
  const activeDays = Object.keys(all).filter((k) => isActiveDay(all[k])).sort();
  const lastActive = activeDays[activeDays.length - 1];
  const daysAway = lastActive ? Math.floor((now.getTime() - new Date(lastActive + 'T00:00:00').getTime()) / 86_400_000) : 0;

  const limit = REVIEW_LIMIT[goal];
  const steps = [
    {
      title: t('dashboard.steps.review'),
      detail: due.length === 0
        ? t('dashboard.steps.reviewNone')
        : due.length > limit
          ? t('dashboard.steps.reviewDueOfTotal', { count: limit, total: due.length })
          : t('dashboard.steps.reviewDue', { count: due.length }),
      done: due.length === 0,
      to: '/practice?mode=review',
    },
    {
      title: lessonDoneToday ? t('dashboard.steps.lessonDoneToday') : next ? t('dashboard.steps.lessonDay', { day: next.day }) : t('dashboard.steps.allLessonsDone'),
      detail: lessonDoneToday
        ? next ? t('dashboard.steps.learnMore', { lesson: tr(lessonRef(next)) }) : t('dashboard.steps.noMoreLessons')
        : next
          ? t(next.grammarIds.length ? 'dashboard.steps.lessonDetailGrammar' : 'dashboard.steps.lessonDetail', { title: tr(next.title) })
          : t('dashboard.steps.pathComing'),
      done: lessonDoneToday || !next,
      to: next ? `/lesson/${next.id}` : '/path',
    },
    ...(goal >= 20
      ? [{ title: t('dashboard.steps.listening'), detail: t('dashboard.steps.listeningDetail', { count: 10 }), done: false, to: '/pronunciation#drill' }]
      : []),
    ...(goal >= 30 ? [{ title: t('dashboard.steps.miniTest'), detail: t('dashboard.steps.miniTestDetail', { count: 10 }), done: false, to: '/tests' }] : []),
    {
      title: t('dashboard.steps.mistakes'),
      detail: openMistakes > 0 ? t('dashboard.steps.mistakesOpen', { count: openMistakes }) : t('dashboard.steps.mistakesNone'),
      done: openMistakes === 0,
      to: '/practice?mode=mistakes',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted">{now.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          {isNew ? t('dashboard.welcomeNew') : t('dashboard.welcome')}{' '}<span lang={course.speechLang} className={cx('text-sky-600', course.fontClass)}>{HELLO[course.id]}</span>
        </h1>
        <p className="mt-1 text-sm text-muted">{t('dashboard.studying', { name: inline(course), framework: course.framework })}</p>
      </div>
      <NoVoiceNotice />

      {daysAway >= 3 && (
        <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
          {t('dashboard.welcomeBack', { count: daysAway })}
        </div>
      )}

      <Card className="bg-gradient-to-br from-sky-50 to-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-sky-600">{isNew ? t('dashboard.startHere') : t('dashboard.nextUp')}</div>
            <div className="mt-1 text-xl font-semibold">{tr(rec.title)}</div>
            <div className="mt-1 text-muted">{tr(rec.detail)}</div>
          </div>
          <ButtonLink to={rec.to} className="px-6 py-3 text-base">{tr(rec.cta)} <Icon name="right" className="h-4 w-4" /></ButtonLink>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">{t('dashboard.todaySession')}</h2>
            <div className="flex rounded-xl bg-stone-100 p-1 text-sm" role="radiogroup" aria-label={t('dashboard.sessionLength')}>
              {([10, 20, 30] as const).map((m) => (
                <button key={m} type="button" role="radio" aria-checked={goal === m} onClick={() => updateSettings({ sessionMinutes: m })}
                  className={cx('rounded-lg px-3 py-1 transition', goal === m ? 'bg-white font-medium shadow-sm' : 'text-muted hover:text-ink')}>
                  {t(m === 10 ? 'dashboard.length.short' : m === 20 ? 'dashboard.length.standard' : 'dashboard.length.long')}
                </button>
              ))}
            </div>
          </div>
          <ol className="space-y-2">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Link to={s.to} className="flex items-center gap-3 rounded-xl border border-line p-3 transition hover:border-sky-200 hover:bg-sky-50/50">
                  <span className={cx('flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold', s.done ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700')}>
                    {s.done ? <Icon name="check" className="h-4 w-4" /> : i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{s.title}</span>
                    <span className="block text-sm text-muted">{s.detail}</span>
                  </span>
                  <Icon name="right" className="h-4 w-4 text-stone-400" />
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-sm">
              <span className="inline-flex items-center gap-1.5"><Icon name="clock" className="h-4 w-4 text-muted" /> {t('dashboard.todayGoal')}</span>
              <span className="text-muted">{t('dashboard.goalProgress', { done: minutesToday, count: goal })}</span>
            </div>
            <ProgressBar value={percent(minutesToday, goal)} color={minutesToday >= goal ? 'bg-emerald-400' : 'bg-sky-400'} />
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">{t('dashboard.last7Days')}</h2>
          <WeeklyChart days={weeklySeconds(all, now)} goalMinutes={goal} />
          <p className="mt-3 text-xs text-muted">{t('dashboard.timeNote')}</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <Stat label={t('dashboard.stat.stage')} value={stage?.id ?? 1} hint={stage ? `${tr(stage.name)} · ${stage.level}` : undefined} />
        <Stat label={t('dashboard.stat.lessonsDone')} value={`${done.length}/${course.lessons.length}`} />
        <Stat label={t('dashboard.stat.wordsLearned')} value={learnedWordIds(course, cp).length} />
        <Stat label={t('dashboard.stat.wordsDue')} value={due.length} />
        <Stat label={t('dashboard.stat.streak')} value={<span className="inline-flex items-center gap-1">{computeStreak(all, now)} <Icon name="flame" className="h-5 w-5 text-peach-500" /></span>} hint={t('dashboard.stat.allLanguages')} />
      </div>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t('dashboard.recentQuizzes')}</h2>
          <Link to="/progress" className="text-sm text-sky-600 hover:underline">{t('dashboard.seeAll')}</Link>
        </div>
        {cp.quizzes.length === 0 ? (
          <p className="text-sm text-muted">{t('dashboard.noQuizzes')}</p>
        ) : (
          <ul className="divide-y divide-line">
            {cp.quizzes.slice(0, 4).map((q) => (
              <li key={q.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                <span className="min-w-0 truncate">{tr(quizTitle(course, q))}</span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="text-muted">{formatDateTime(q.at, locale)}</span>
                  <span className={cx('font-semibold', percent(q.correct, q.total) >= 60 ? 'text-emerald-700' : 'text-peach-600')}>{q.correct}/{q.total}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">{t('dashboard.yourLanguages')}</h2>
          <Link to="/courses" className="text-sm text-sky-600 hover:underline">{t('dashboard.allLanguages')}</Link>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {others.map((id) => {
            const c = COURSES[id];
            const s = courseSummary(c, data.courses[id], now);
            return (
              <li key={id}>
                <button type="button" onClick={() => setCurrentCourse(id)} aria-label={t('dashboard.switchTo', { name: inline(c) })}
                  className="flex w-full items-center gap-3 rounded-xl border border-line p-3 text-left transition hover:border-sky-200 hover:bg-sky-50/50">
                  <span lang={c.speechLang} className={cx('w-16 shrink-0 text-lg font-semibold text-sky-700', c.fontClass)}>{c.endonym}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{tr(c.name)}</span>
                    <span className="block text-sm text-muted">
                      {s.started
                        ? t('dashboard.otherProgress', { done: s.lessonsDone, total: s.lessonsTotal, words: s.wordsLearned, due: s.due })
                        : t('dashboard.notStarted')}
                    </span>
                  </span>
                  <Icon name="right" className="h-4 w-4 shrink-0 text-stone-400" />
                </button>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
