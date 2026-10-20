import type { GlossLang, Gloss, Lang, LText, Msg, Txt } from '../types';

export type TFn = (key: string, params?: Record<string, unknown>) => string;

export interface ResolveCtx {
  lang: Lang;
  glossLang: GlossLang;
  t: TFn;
}

export function isMsg(x: Txt): x is Msg {
  return typeof x === 'object' && 'k' in x;
}

/** LText always has a `zh` field; a Gloss never does. */
export function isLText(x: Txt): x is LText {
  return typeof x === 'object' && 'zh' in x && 'en' in x && 'vi' in x && !('k' in x);
}

/**
 * Turn displayable content into a string for the current interface language.
 * - string: language-neutral (Chinese, pinyin) — returned as is
 * - LText: the interface language (Vietnamese if a translation is empty)
 * - Gloss: the gloss language (interface language, or the support language in the Chinese interface)
 * - Msg: looked up in the interface dictionary, params resolved recursively
 */
export function resolveTxt(x: Txt | undefined | null, c: ResolveCtx): string {
  if (x === undefined || x === null) return '';
  if (typeof x === 'string') return x;
  if ('seq' in x) return x.seq.map((p) => resolveTxt(p, c)).join(x.sep ?? '');
  if ('k' in x) {
    const params: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(x.p ?? {})) params[k] = typeof v === 'number' ? v : resolveTxt(v, c);
    return c.t(x.k, params);
  }
  if (isLText(x)) return x[c.lang] || x.vi;
  return (x as Gloss)[c.glossLang] || (x as Gloss).vi;
}

/** Pick the meaning of a Chinese item (Word, Example, MatchPair…) in the gloss language. */
export function glossOf(g: Gloss, glossLang: GlossLang): string {
  return g[glossLang] || g.vi;
}
