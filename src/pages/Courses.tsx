import { useNavigate } from 'react-router-dom';
import { COURSE_IDS, COURSES } from '../courses';
import { useAppData } from '../state/AppDataContext';
import { useI18n } from '../i18n/LocaleContext';
import { completedLessonIds, dueWordIds, hasStarted, isActiveDay, learnedWordIds } from '../lib/stats';
import { percent } from '../lib/appData';
import { formatDate } from '../lib/dates';
import type { Course, CourseProgress } from '../types';
import { LanguageSelect } from '../components/LanguageSwitcher';
import { Badge, Button, Card, PageHeader, ProgressBar, cx } from '../components/ui';

/** Figures shown for one course on the language list, the dashboard and the progress page. */
export function courseSummary(course: Course, cp: CourseProgress, now: Date = new Date()) {
  const days = Object.keys(cp.activity).filter((k) => isActiveDay(cp.activity[k])).sort();
  const acts = Object.values(cp.activity);
  const answers = acts.reduce((s, a) => s + a.answers, 0);
  const correct = acts.reduce((s, a) => s + a.correct, 0);
  return {
    lessonsDone: completedLessonIds(course, cp).length,
    lessonsTotal: course.lessons.length,
    wordsLearned: learnedWordIds(course, cp).length,
    due: dueWordIds(cp, now).length,
    lastActive: days[days.length - 1] ?? null,
    answers,
    accuracy: answers > 0 ? percent(correct, answers) : null,
    quizzes: cp.quizzes.length,
    started: hasStarted(cp),
  };
}

/**
 * Language selection: the three courses with their own progress. Shown instead of the course pages
 * until the learner picks one (`firstRun`), and reachable any time from the course switcher.
 */
export default function Courses({ firstRun = false }: { firstRun?: boolean }) {
  const { data, setCurrentCourse } = useAppData();
  const { t, tr, locale } = useI18n();
  const navigate = useNavigate();
  const current = data.currentCourse;

  const choose = (id: Course['id']) => {
    setCurrentCourse(id);
    navigate('/');
  };

  return (
    <div className="space-y-6">
      <PageHeader title={firstRun ? t('courses.firstTitle') : t('courses.title')} subtitle={firstRun ? t('courses.firstSubtitle') : t('courses.subtitle')} />

      {firstRun && (
        <Card className="flex flex-wrap items-center justify-between gap-3 bg-sky-50/60">
          <p className="min-w-0 flex-1 text-sm text-muted">{t('courses.interfaceNote')}</p>
          <div className="w-full sm:w-52">
            <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted">{t('layout.interfaceLanguage')}</div>
            <LanguageSelect className="w-full" />
          </div>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {COURSE_IDS.map((id) => {
          const c = COURSES[id];
          const s = courseSummary(c, data.courses[id]);
          const isCurrent = id === current;
          return (
            <Card key={id} className={cx('flex flex-col', isCurrent && 'border-2 border-sky-400 bg-sky-50/40')}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div lang={c.speechLang} className={cx('text-3xl font-semibold text-sky-700', c.fontClass)}>{c.endonym}</div>
                  <div className="mt-0.5 font-medium">{tr(c.name)}</div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  {isCurrent && <Badge tone="sky">{t('courses.current')}</Badge>}
                  <Badge tone="gray">{c.framework}</Badge>
                </div>
              </div>
              <p className="mt-2 text-sm text-muted">{tr(c.tagline)}</p>

              <dl className="mt-4 space-y-1.5 text-sm">
                <div>
                  <div className="mb-1 flex justify-between gap-2"><dt className="text-muted">{t('courses.lessons')}</dt><dd className="font-medium">{s.lessonsDone}/{s.lessonsTotal}</dd></div>
                  <ProgressBar value={s.lessonsTotal ? (s.lessonsDone / s.lessonsTotal) * 100 : 0} />
                </div>
                <div className="flex justify-between gap-2"><dt className="text-muted">{t('courses.wordsLearned')}</dt><dd className="font-medium">{s.wordsLearned}</dd></div>
                <div className="flex justify-between gap-2"><dt className="text-muted">{t('courses.due')}</dt><dd className="font-medium">{s.due}</dd></div>
                <div className="flex justify-between gap-2"><dt className="text-muted">{t('courses.lastActive')}</dt><dd className="font-medium">{s.lastActive ? formatDate(`${s.lastActive}T12:00:00`, locale) : t('courses.never')}</dd></div>
              </dl>

              <div className="mt-auto pt-4">
                <Button className="w-full" variant={isCurrent ? 'primary' : s.started ? 'secondary' : 'primary'} onClick={() => choose(id)}>
                  {s.started || isCurrent ? t('courses.continue') : t('courses.study')}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <p className="text-sm text-muted">{t('courses.separateNote')}</p>
    </div>
  );
}
