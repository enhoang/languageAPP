import type { Course, Exercise, ExerciseResponse, ExerciseView, GradeResult, MatchPair, Txt, TypeMode } from '../types';
import { comparePinyin } from './pinyin';
import { levenshtein, normalizeScript, normalizeSpelling, shuffle, shuffleChanged } from './text';

const gloss = (p: MatchPair) => ({ vi: p.vi, en: p.en });

const charPools = new Map<string, string[]>();
/** Characters / Hangul syllables used in a course, for the on-screen typing palette. */
function charPool(course: Course): string[] {
  let pool = charPools.get(course.id);
  if (!pool) {
    pool = [...new Set(course.words.flatMap((w) => [...normalizeScript(w.text)]))];
    charPools.set(course.id, pool);
  }
  return pool;
}

/** Typing modes that offer an on-screen palette of characters (for learners without an IME). */
export const PALETTE_MODES: TypeMode[] = ['hanzi', 'hangul'];

/**
 * Build the presentation object. It never contains the answer key.
 * Text stays localizable (Txt), so switching language mid-exercise updates it.
 */
export function toView(ex: Exercise, course: Course, rng: () => number = Math.random): ExerciseView {
  const base = { id: ex.id, skill: ex.skill, prompt: ex.prompt, text: ex.text, pron: ex.pron, audio: ex.audio };
  switch (ex.kind) {
    case 'choice':
      return { ...base, kind: 'choice', options: shuffle(ex.options.map((text, i) => ({ key: String(i), text })), rng), targetOptions: ex.targetOptions };
    case 'match':
      return {
        ...base,
        kind: 'match',
        left: shuffle(ex.pairs.map((p) => ({ text: p.text, pron: p.pron })), rng),
        // The key is the Vietnamese meaning (unique within an exercise); it says nothing about which word it belongs to.
        right: shuffle(ex.pairs.map((p) => ({ key: p.vi, text: gloss(p) })), rng),
      };
    case 'arrange':
      return { ...base, kind: 'arrange', tokens: shuffleChanged(ex.tokens, rng) };
    case 'type': {
      if (!PALETTE_MODES.includes(ex.mode)) return { ...base, kind: 'type', mode: ex.mode };
      const answerChars = [...new Set([...normalizeScript(ex.accepted[0])])];
      const extra = shuffle(charPool(course).filter((c) => !answerChars.includes(c)), rng).slice(0, Math.max(4, 8 - answerChars.length));
      return { ...base, kind: 'type', mode: ex.mode, palette: shuffle([...answerChars, ...extra], rng) };
    }
  }
}

function pairsText(items: { text: string; meaning: Txt }[]): Txt {
  return { seq: items.map((p) => ({ seq: [p.text, ' = ', p.meaning] })), sep: ' · ' };
}

export function correctAnswerText(ex: Exercise): Txt {
  switch (ex.kind) {
    case 'choice':
      return ex.options[ex.answer];
    case 'match':
      return pairsText(ex.pairs.map((p) => ({ text: p.text, meaning: gloss(p) })));
    case 'arrange':
      return ex.answers[0];
    case 'type':
      return ex.accepted[0];
  }
}

/** Check a typed answer in the given mode. */
function gradeTyped(mode: TypeMode, value: string, accepted: string[]): { correct: boolean; hint?: GradeResult['hint'] } {
  switch (mode) {
    case 'pinyin': {
      const results = accepted.map((a) => comparePinyin(value, a));
      if (results.includes('correct')) return { correct: true };
      return { correct: false, hint: results.includes('tone') ? { k: 'ex.toneHint' } : undefined };
    }
    case 'spelling': {
      const v = normalizeSpelling(value);
      const targets = accepted.map(normalizeSpelling);
      if (targets.includes(v)) return { correct: true };
      // One slip (two for longer words) counts as wrong, with a hint to check the spelling.
      const close = targets.some((a) => levenshtein(v, a) <= (a.length >= 7 ? 2 : 1));
      return { correct: false, hint: close && v.length > 0 ? { k: 'ex.spellingHint' } : undefined };
    }
    case 'hanzi':
    case 'hangul': {
      const v = normalizeScript(value);
      return { correct: accepted.some((a) => normalizeScript(a) === v) };
    }
  }
}

export function grade(ex: Exercise, res: ExerciseResponse): GradeResult {
  const correctAnswer = correctAnswerText(ex);
  if (ex.kind !== res.kind) return { correct: false, correctAnswer, given: '' };

  switch (ex.kind) {
    case 'choice': {
      const key = res.value as string;
      const correctKey = String(ex.answer);
      return { correct: key === correctKey, correctAnswer, correctKey, given: ex.options[Number(key)] ?? '' };
    }
    case 'match': {
      const value = res.value as Record<string, string>;
      const byKey = new Map(ex.pairs.map((p) => [p.vi, p]));
      const wrongKeys = ex.pairs.filter((p) => value[p.text] !== p.vi).map((p) => p.text);
      const given = pairsText(ex.pairs.map((p) => {
        const chosen = byKey.get(value[p.text]);
        return { text: p.text, meaning: chosen ? gloss(chosen) : '—' };
      }));
      return { correct: wrongKeys.length === 0, correctAnswer, given, wrongKeys };
    }
    case 'arrange': {
      const value = res.value as string[];
      const joined = normalizeScript(value.join(''));
      const ok = ex.answers.some((a) => normalizeScript(a) === joined);
      return { correct: ok, correctAnswer, given: value.join(' ') };
    }
    case 'type': {
      const value = (res.value as string).trim();
      const r = gradeTyped(ex.mode, value, ex.accepted);
      return { correct: r.correct, correctAnswer, given: value, hint: r.hint };
    }
  }
}
