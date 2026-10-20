import { NavLink } from 'react-router-dom';
import { useI18n } from '../../i18n/LocaleContext';
import { cx } from '../ui';

const SECTIONS = [
  { to: '/qa', key: 'path', end: true },
  { to: '/qa/glossary', key: 'glossary' },
  { to: '/qa/learn', key: 'learn' },
  { to: '/qa/flashcards', key: 'flashcards' },
  { to: '/qa/quiz', key: 'quiz' },
  { to: '/qa/exam', key: 'exam' },
  { to: '/qa/progress', key: 'progress' },
  { to: '/qa/sources', key: 'sources' },
] as const;

/** Section tabs of the ISTQB & QA module. */
export function QaNav() {
  const { t } = useI18n();
  return (
    <nav aria-label={t('qa.nav.label')} className="-mx-1 mb-6 flex gap-1 overflow-x-auto px-1 pb-1">
      {SECTIONS.map((s) => (
        <NavLink key={s.to} to={s.to} end={'end' in s}
          className={({ isActive }) => cx('whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition',
            isActive ? 'bg-emerald-600 font-medium text-white' : 'bg-white text-stone-600 ring-1 ring-line hover:bg-emerald-50')}>
          {t(`qa.nav.${s.key}`)}
        </NavLink>
      ))}
    </nav>
  );
}
