import { Route, Routes } from 'react-router-dom';
import { ConvProvider } from '../../conversation/ConvContext';
import ConvHome from './ConvHome';
import ConvChat from './ConvChat';
import ConvReview from './ConvReview';
import ConvSettingsPage from './ConvSettings';

/** Conversation practice (route /conversation/*). Its data is stored separately from courses and the ISTQB module. */
export default function ConversationRoutes() {
  return (
    <ConvProvider>
      <Routes>
        <Route index element={<ConvHome />} />
        <Route path="session/:id" element={<ConvChat />} />
        <Route path="review" element={<ConvReview />} />
        <Route path="settings" element={<ConvSettingsPage />} />
      </Routes>
    </ConvProvider>
  );
}
