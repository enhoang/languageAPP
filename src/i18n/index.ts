import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import vi from './locales/vi';
import en from './locales/en';
import zh from './locales/zh';
import { DEFAULT_LANG, LANGS, readLang } from './langs';

export const resources = {
  vi: { translation: vi },
  en: { translation: en },
  zh: { translation: zh },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: readLang(),
  // A missing English/Chinese string shows the Vietnamese one instead of a raw key.
  fallbackLng: DEFAULT_LANG,
  supportedLngs: LANGS,
  interpolation: { escapeValue: false }, // React escapes already
  initAsync: false,
});

export default i18n;
