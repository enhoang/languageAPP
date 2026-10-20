import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import LearningPath from './pages/LearningPath';
import LessonPage from './pages/LessonPage';
import Vocabulary from './pages/Vocabulary';
import Pronunciation from './pages/Pronunciation';
import { GrammarDetail, GrammarList } from './pages/Grammar';
import Practice from './pages/Practice';
import Tests from './pages/Tests';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import Guide from './pages/Guide';
import Courses from './pages/Courses';
import { useCourse } from './state/AppDataContext';

/** ISTQB & QA module: loaded on demand, independent of the language courses. */
const QaRoutes = lazy(() => import('./pages/qa/QaRoutes'));
import { ButtonLink } from './components/ui';
import { useI18n } from './i18n/LocaleContext';

function NotFound() {
  const { t } = useI18n();
  return (
    <div className="py-20 text-center">
      <p className="mb-4 text-muted">{t('common.notFound')}</p>
      <ButtonLink to="/">{t('common.actions.home')}</ButtonLink>
    </div>
  );
}

/** Pages that make sense before a course is chosen; everything else shows the language picker first. */
const OPEN_BEFORE_CHOICE = ['/courses', '/settings', '/guide'];

export default function App() {
  const { chosen } = useCourse();
  const { pathname } = useLocation();
  // The ISTQB & QA module never requires choosing a language course.
  const needsChoice = !chosen && !OPEN_BEFORE_CHOICE.includes(pathname) && !pathname.startsWith('/qa');
  return (
    <Layout>
      {needsChoice ? <Courses firstRun /> : (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/path" element={<LearningPath />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/pronunciation" element={<Pronunciation />} />
        <Route path="/grammar" element={<GrammarList />} />
        <Route path="/grammar/:id" element={<GrammarDetail />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/courses" element={<Courses firstRun={!chosen} />} />
        <Route path="/qa/*" element={<Suspense fallback={<div className="py-20 text-center text-muted">…</div>}><QaRoutes /></Suspense>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      )}
    </Layout>
  );
}
