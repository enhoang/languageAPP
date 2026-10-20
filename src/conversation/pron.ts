import type { ConvLang, Pron } from './types';
import type { Word } from '../types';
import { COURSES } from '../courses';

/** Which pronunciation fields belong to each language's own system. */
const FIELDS: Record<ConvLang, (keyof Pron)[]> = {
  zh: ['pinyin'],
  en: ['ipaUS', 'ipaUK', 'respelling'],
  ko: ['romanization', 'spoken'],
};

const key = (s: string) => s.normalize('NFC').toLowerCase().replace(/[\s\p{P}\p{S}]/gu, '');

let index: Partial<Record<ConvLang, Map<string, Word>>> = {};
function courseWord(lang: ConvLang, text: string): Word | undefined {
  if (!index[lang]) index = { ...index, [lang]: new Map(COURSES[lang].words.map((w) => [key(w.text), w])) };
  return index[lang]!.get(key(text));
}

/** Keep only the fields of the language's own system (never pinyin for English, never romanization for Chinese…). */
export function onlyOwnSystem(lang: ConvLang, p: Pron | undefined): Pron | undefined {
  if (!p) return undefined;
  const out: Pron = {};
  for (const f of FIELDS[lang]) if (typeof p[f] === 'string' && (p[f] as string).trim()) (out as Record<string, unknown>)[f] = (p[f] as string).trim();
  if (p.note && (p.note.vi || p.note.en)) out.note = p.note;
  if (p.source) out.source = p.source;
  return FIELDS[lang].some((f) => out[f]) || out.note ? out : undefined;
}

/**
 * Prefer the app's checked course data when the text is a course word (pinyin, US/UK IPA, romanization and
 * actual Korean pronunciation); otherwise keep the given (AI or script) pronunciation, filtered to the language's system.
 */
export function enrichPron(lang: ConvLang, text: string, p: Pron | undefined): Pron | undefined {
  const w = courseWord(lang, text);
  if (w?.pron) {
    const fromCourse: Pron =
      lang === 'zh' ? { pinyin: w.pron }
        : lang === 'en' ? { ipaUS: w.pron, ...(w.pronUK ? { ipaUK: w.pronUK } : {}), ...(p?.respelling ? { respelling: p.respelling } : {}) }
          : { romanization: w.pron, ...(w.spoken ? { spoken: w.spoken } : {}) };
    return { ...fromCourse, ...(p?.note ? { note: p.note } : {}), source: 'course' };
  }
  return onlyOwnSystem(lang, p);
}
