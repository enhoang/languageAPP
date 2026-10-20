import { Link } from 'react-router-dom';
import { useCourse } from '../state/AppDataContext';
import { PASS_PERCENT } from '../courses';
import { isLessonUnlocked, lessonRef, nextLesson } from '../lib/stats';
import { useI18n } from '../i18n/LocaleContext';
import { Prose } from '../components/Prose';
import { Icon } from '../components/Icon';
import { Badge, Card, PageHeader, ProgressBar, cx } from '../components/ui';

export default function LearningPath() {
  const { course, cp } = useCourse();
  const { t, tr } = useI18n();
  const next = nextLesson(course, cp);
  const total = course.lessons.length;
  const doneCount = course.lessons.filter((l) => cp.lessons[l.id]?.status === 'completed').length;

  return (
    <div>
      <PageHeader title={t('path.title', { name: tr(course.name) })} subtitle={t('path.subtitle', { pct: PASS_PERCENT })}>
        <div className="w-48 max-w-full">
          <div className="mb-1 text-right text-sm text-muted">{t('path.lessonsCount', { done: doneCount, count: total })}</div>
          <ProgressBar value={total ? (doneCount / total) * 100 : 0} />
        </div>
      </PageHeader>

      <div className="space-y-8">
        {course.stages.map((stage) => {
          const lessons = course.lessons.filter((l) => l.stage === stage.id);
          const planned = course.roadmap.filter((r) => r.stage === stage.id);
          return (
            <section key={stage.id}>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold">{tr(stage.title)}</h2>
                <Badge tone="sky">{stage.level}</Badge>
              </div>
              <p className="mb-3 text-sm text-muted"><Prose text={stage.description} /></p>
              <div className="space-y-2">
                {lessons.map((l) => {
                  const lp = cp.lessons[l.id];
                  const unlocked = isLessonUnlocked(cp, l);
                  const completed = lp?.status === 'completed';
                  const isNext = next?.id === l.id;
                  const inner = (
                    <div className={cx('flex items-center gap-4 rounded-2xl border p-4 transition',
                      isNext ? 'border-sky-300 bg-sky-50' : 'border-line bg-white', unlocked && 'hover:border-sky-300', !unlocked && 'opacity-60')}>
                      <div className={cx('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-semibold',
                        completed ? 'bg-emerald-100 text-emerald-700' : unlocked ? 'bg-sky-100 text-sky-700' : 'bg-stone-100 text-stone-400')}>
                        {completed ? <Icon name="check" /> : unlocked ? t('path.dayShort', { day: l.day }) : <Icon name="lock" className="h-4 w-4" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium">{tr(lessonRef(l))}</span>
                          {isNext && <Badge tone="peach">{lp ? t('path.inProgress') : t('path.next')}</Badge>}
                          {completed && lp.bestScore !== undefined && <Badge tone="green">{t('path.best', { pct: lp.bestScore })}</Badge>}
                        </div>
                        <div className="truncate text-sm text-muted">{tr(l.subtitle)}</div>
                        {!unlocked && <div className="text-xs text-muted">{t('path.unlockHint', { day: l.day - 1 })}</div>}
                      </div>
                      <div className="hidden shrink-0 text-sm text-muted sm:block">~{t('common.minutes', { count: l.minutes })}</div>
                    </div>
                  );
                  return unlocked ? <Link key={l.id} to={`/lesson/${l.id}`} className="block">{inner}</Link> : <div key={l.id} aria-disabled="true">{inner}</div>;
                })}
                {planned.length > 0 && (
                  <Card className="border-dashed bg-transparent">
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted"><Badge tone="gray">{t('path.comingSoon')}</Badge> {t('path.planned')}</div>
                    <ul className="grid gap-1 text-sm sm:grid-cols-2">
                      {planned.map((r) => (
                        <li key={r.day} className="text-stone-500"><span className="font-medium text-stone-600">{t('path.plannedDay', { day: r.day })}</span> {tr(r.title)} <span className="text-xs">· {tr(r.topics)}</span></li>
                      ))}
                    </ul>
                  </Card>
                )}
              </div>
            </section>
          );
        })}
      </div>
      <p className="mt-8 text-xs text-muted">
        {t('path.frameworkNote', { framework: course.framework })}
      </p>
    </div>
  );
}
