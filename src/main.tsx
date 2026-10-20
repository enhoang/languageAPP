import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AppDataProvider } from './state/AppDataContext';
import { LocaleProvider } from './i18n/LocaleContext';
import './i18n';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider>
      <HashRouter>
        <AppDataProvider>
          <App />
        </AppDataProvider>
      </HashRouter>
    </LocaleProvider>
  </StrictMode>,
);
