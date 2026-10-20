import type { CourseId, GlossLang, Lang } from '../types';

export const LANGS: Lang[] = ['vi', 'en', 'zh'];
export const DEFAULT_LANG: Lang = 'vi';
export const DEFAULT_SUPPORT_LANG: GlossLang = 'vi';

/** localStorage keys. Kept apart from learner data (clc:data) so switching language never touches progress. */
export const LANG_KEY = 'clc:lang';
export const SUPPORT_LANG_KEY = 'clc:support-lang';

/** BCP 47 tags for <html lang>, Intl formatting and lang attributes. */
export const LANG_TAG: Record<Lang, string> = { vi: 'vi-VN', en: 'en-US', zh: 'zh-CN' };

/** Each language's own name (endonym), shown the same in every interface language. */
export const LANG_NAME: Record<Lang, string> = { vi: 'Tiếng Việt', en: 'English', zh: '简体中文' };

export function isLang(v: unknown): v is Lang {
  return v === 'vi' || v === 'en' || v === 'zh';
}

export function isGlossLang(v: unknown): v is GlossLang {
  return v === 'vi' || v === 'en';
}

function safeStorage(): Storage | undefined {
  try {
    return globalThis.localStorage;
  } catch {
    return undefined;
  }
}

export function readLang(storage: Storage | undefined = safeStorage()): Lang {
  try {
    const v = storage?.getItem(LANG_KEY);
    return isLang(v) ? v : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

export function readSupportLang(storage: Storage | undefined = safeStorage()): GlossLang {
  try {
    const v = storage?.getItem(SUPPORT_LANG_KEY);
    return isGlossLang(v) ? v : DEFAULT_SUPPORT_LANG;
  } catch {
    return DEFAULT_SUPPORT_LANG;
  }
}

export function writePref(key: string, value: string, storage: Storage | undefined = safeStorage()): void {
  try {
    storage?.setItem(key, value);
  } catch {
    /* private mode / storage full: the choice still applies to this session */
  }
}

/**
 * Language for meanings and translations: the interface language — or the chosen support language
 * when the interface is Chinese, or when the interface is the language being studied
 * (English interface + English course), since a meaning in the same language would not help.
 */
export function glossLangFor(lang: Lang, supportLang: GlossLang, course: CourseId | null = null): GlossLang {
  return lang === 'zh' || lang === course ? supportLang : lang;
}

/** Whether the translation-language choice applies (see glossLangFor). */
export function usesSupportLang(lang: Lang, course: CourseId | null): boolean {
  return lang === 'zh' || lang === course;
}
