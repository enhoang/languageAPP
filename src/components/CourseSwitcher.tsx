import { useEffect, useId, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COURSE_IDS, COURSES } from '../courses';
import { useAppData, useCourse } from '../state/AppDataContext';
import { useI18n } from '../i18n/LocaleContext';
import { Icon } from './Icon';
import { cx } from './ui';
import type { Course } from '../types';

/**
 * Course name for use inside a sentence: Vietnamese writes "học tiếng Trung" in lower case
 * (the name itself is capitalised as a standalone label).
 */
export function useInlineCourseName() {
  const { tr, lang } = useI18n();
  return (c: Course) => {
    const n = tr(c.name);
    return lang === 'vi' ? n.charAt(0).toLowerCase() + n.slice(1) : n;
  };
}

/**
 * "Studying" picker for the navigation: shows the active course (endonym + name), switches quickly to
 * another course (each keeps its own progress) and links to the full language list (/courses).
 * `compact` (mobile top bar) shows the endonym only.
 */
export function CourseSwitcher({ className, compact = false, onNavigate }: { className?: string; compact?: boolean; onNavigate?: () => void }) {
  const { course, chosen } = useCourse();
  const { setCurrentCourse } = useAppData();
  const { t, tr } = useI18n();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!chosen) {
    return (
      <Link to="/courses" onClick={onNavigate} className={cx('inline-flex min-w-0 items-center gap-1.5 rounded-lg border border-sky-300 bg-sky-50 px-2.5 py-1.5 text-sm font-medium text-sky-700 hover:bg-sky-100', className)}>
        <span className="truncate">{t('layout.chooseCourse')}</span>
      </Link>
    );
  }

  const switchTo = (id: typeof course.id) => {
    setCurrentCourse(id);
    setOpen(false);
    onNavigate?.();
    navigate('/');
  };

  return (
    <div ref={ref} className={cx('relative min-w-0', className)}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls={menuId} aria-haspopup="true"
        aria-label={t('layout.studyingAria', { name: tr(course.name) })} title={t('layout.studyingAria', { name: tr(course.name) })}
        className="flex w-full min-w-0 items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-1.5 text-left text-sm hover:border-sky-300 focus-visible:outline-2 focus-visible:outline-sky-400">
        <span lang={course.speechLang} className={cx('shrink-0 font-semibold text-sky-700', course.fontClass)}>{course.endonym}</span>
        {!compact && <span className="min-w-0 flex-1 truncate text-muted">{tr(course.name)}</span>}
        <Icon name="right" className={cx('h-3.5 w-3.5 shrink-0 text-stone-400 transition-transform', open ? '-rotate-90' : 'rotate-90')} />
      </button>
      {open && (
        <div id={menuId} className="fade-in absolute left-0 top-full z-50 mt-1 w-60 max-w-[calc(100vw-2rem)] rounded-xl border border-line bg-white p-1.5 shadow-lg">
          <div className="px-2 pb-1 pt-0.5 text-[11px] font-medium uppercase tracking-wide text-muted">{t('layout.switchTo')}</div>
          <ul>
            {COURSE_IDS.map((id) => {
              const c = COURSES[id];
              const current = id === course.id;
              return (
                <li key={id}>
                  <button type="button" onClick={() => (current ? setOpen(false) : switchTo(id))} aria-current={current ? 'true' : undefined}
                    className={cx('flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm', current ? 'bg-sky-50 text-sky-700' : 'hover:bg-stone-50')}>
                    <span lang={c.speechLang} className={cx('w-16 shrink-0 font-semibold', c.fontClass)}>{c.endonym}</span>
                    <span className="min-w-0 flex-1 truncate">{tr(c.name)}</span>
                    {current && <Icon name="check" className="h-4 w-4 shrink-0" />}
                  </button>
                </li>
              );
            })}
          </ul>
          <Link to="/courses" onClick={() => { setOpen(false); onNavigate?.(); }} className="mt-1 block rounded-lg border-t border-line px-2 py-1.5 text-sm text-sky-600 hover:bg-sky-50">
            {t('layout.allCourses')}
          </Link>
        </div>
      )}
    </div>
  );
}
