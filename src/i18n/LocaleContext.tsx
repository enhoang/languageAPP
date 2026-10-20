import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { Gloss, GlossLang, Lang, Txt } from '../types';
import i18n from './index';
import { AppDataContext } from '../state/AppDataContext';
import { glossLangFor, LANG_KEY, LANG_TAG, readLang, readSupportLang, SUPPORT_LANG_KEY, isGlossLang, isLang, writePref } from './langs';
import { glossOf, resolveTxt } from './resolve';

interface LocaleCtx {
  lang: Lang;
  /** Translation language chosen for the Chinese interface. */
  supportLang: GlossLang;
  setLang: (l: Lang) => void;
  setSupportLang: (l: GlossLang) => void;
}

const Ctx = createContext<LocaleCtx | null>(null);

/**
 * Interface language state. The choice is stored under its own localStorage key and applied
 * immediately (no reload). Learner progress (clc:data) is never read or written here.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang);
  const [supportLang, setSupportState] = useState<GlossLang>(readSupportLang);

  useEffect(() => {
    if (i18n.language !== lang) void i18n.changeLanguage(lang);
    document.documentElement.lang = LANG_TAG[lang];
    document.title = i18n.t('common.app.docTitle', { lng: lang });
  }, [lang]);

  // Keep several open tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LANG_KEY && isLang(e.newValue)) setLangState(e.newValue);
      if (e.key === SUPPORT_LANG_KEY && isGlossLang(e.newValue)) setSupportState(e.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value = useMemo<LocaleCtx>(() => ({
    lang,
    supportLang,
    setLang: (l) => {
      writePref(LANG_KEY, l);
      void i18n.changeLanguage(l);
      setLangState(l);
    },
    setSupportLang: (l) => {
      writePref(SUPPORT_LANG_KEY, l);
      setSupportState(l);
    },
  }), [lang, supportLang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/**
 * Everything a component needs for localized text:
 * - `t(key, params)`: interface dictionary (type-checked keys)
 * - `tr(txt)`: content (LText / Gloss / Msg / plain string) in the current language
 * - `gl(item)`: meaning of a Chinese item (Word, Example…) in the gloss language
 * - `locale`: BCP 47 tag for Intl formatting
 */
export function useI18n() {
  const { t } = useTranslation();
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useI18n must be used inside LocaleProvider');
  const { lang, supportLang } = ctx;
  // The course matters: studying English with the English interface shows meanings in the support language.
  const course = useContext(AppDataContext)?.data.currentCourse ?? null;
  const glossLang = glossLangFor(lang, supportLang, course);
  const tr = useCallback(
    (x: Txt | undefined | null) => resolveTxt(x, { lang, glossLang, t: i18n.getFixedT(lang) as (k: string, p?: Record<string, unknown>) => string }),
    [lang, glossLang],
  );
  const gl = useCallback((g: Gloss) => glossOf(g, glossLang), [glossLang]);
  return { t, tr, gl, glossLang, locale: LANG_TAG[lang], ...ctx };
}
