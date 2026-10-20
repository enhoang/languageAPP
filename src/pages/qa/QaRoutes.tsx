import { Route, Routes } from 'react-router-dom';
import { QaProvider } from '../../qa/QaContext';
import { QaNav } from '../../components/qa/QaNav';
import QaHome from './QaHome';
import QaTopic from './QaTopic';
import { QaGlossary, QaTermDetail } from './QaGlossary';
import QaLearn from './QaLearn';
import QaFlashcards from './QaFlashcards';
import QaQuiz from './QaQuiz';
import QaExam from './QaExam';
import QaProgressPage from './QaProgress';
import QaSources from './QaSources';

/** ISTQB & QA Knowledge module (route /qa/*). Its progress is stored separately from the language courses. */
export default function QaRoutes() {
  return (
    <QaProvider>
      <QaNav />
      <Routes>
        <Route index element={<QaHome />} />
        <Route path="topic/:id" element={<QaTopic />} />
        <Route path="glossary" element={<QaGlossary />} />
        <Route path="glossary/:id" element={<QaTermDetail />} />
        <Route path="learn" element={<QaLearn />} />
        <Route path="flashcards" element={<QaFlashcards />} />
        <Route path="quiz" element={<QaQuiz />} />
        <Route path="exam" element={<QaExam />} />
        <Route path="progress" element={<QaProgressPage />} />
        <Route path="sources" element={<QaSources />} />
      </Routes>
    </QaProvider>
  );
}
