import type { ChoiceExercise, Contrast, Course, CourseProgress, Exercise, Gloss, Lesson, TestSkill, ToneSet, Txt, Word } from '../types';
import { fixedExerciseOf, wordOf } from '../courses';
import { isLessonCompleted, isLessonUnlocked } from './stats';
import { shuffle } from './text';

type Rng = () => number;

const meaning = (x: Gloss): Gloss => ({ vi: x.vi, en: x.en });

/**
 * Pick n distinct distractors (different from `correct`). Falls back to all words of the course.
 * `keys` lists the values that must be unique (e.g. the Vietnamese and the English meaning).
 */
function distractors<T>(course: Course, correct: Word, pool: Word[], pick: (w: Word) => T, keys: (w: Word) => string[], n: number, rng: Rng, filter: (w: Word) => boolean = () => true): T[] {
  const seen = new Set(keys(correct));
  const out: T[] = [];
  for (const source of [shuffle(pool, rng), shuffle(course.words, rng)]) {
    for (const w of source) {
      if (out.length >= n) return out;
      const k = keys(w);
      if (k.some((x) => seen.has(x)) || !filter(w)) continue;
      k.forEach((x) => seen.add(x));
      out.push(pick(w));
    }
  }
  return out;
}

const byMeaning = (w: Word) => [`vi:${w.vi}`, `en:${w.en}`];
const bySentence = (w: Word) => [`vi:${w.example.vi}`, `en:${w.example.en}`];
const byText = (w: Word) => [w.text.toLowerCase()];

/** Multiple choice with the correct option first (the view shuffles). */
function mc(base: Omit<ChoiceExercise, 'kind' | 'options' | 'answer'>, answer: Txt, wrong: Txt[]): ChoiceExercise {
  return { ...base, kind: 'choice', options: [answer, ...wrong], answer: 0 };
}

/** "妈妈 (māma)", "hello (/həˈloʊ/)", "안녕하세요 (annyeonghaseyo)" */
const withPron = (text: string, pron?: string) => (pron ? `${text} (${pron})` : text);
const wordParams = (w: Word) => ({ word: withPron(w.text, w.pron), text: w.text, pron: w.pron ?? '', meaning: meaning(w) });
const label = (x: Word) => (x.pron ? `${x.text} · ${x.pron}` : x.text);

// Ids: `gen-<kind>-<wordId>`. They are stable, so saved mistakes can be rebuilt (exerciseById).

/** Target word shown → choose its meaning. */
export function meaningChoice(course: Course, w: Word, pool: Word[], rng: Rng = Math.random): Exercise {
  return mc({ id: `gen-meaning-${w.id}`, skill: 'vocabulary', prompt: { k: 'ex.chooseMeaning' }, text: w.text, pron: w.pron, audio: w.audio ?? w.text, explanation: { k: 'ex.meansExplain', p: wordParams(w) }, wordIds: [w.id] },
    meaning(w), distractors(course, w, pool, meaning, byMeaning, 3, rng));
}

/** Meaning shown → choose the target word. */
export function wordChoice(course: Course, w: Word, pool: Word[], rng: Rng = Math.random): Exercise {
  return { ...mc({ id: `gen-reverse-${w.id}`, skill: 'vocabulary', prompt: { k: 'ex.chooseWord', p: { meaning: meaning(w) } }, explanation: { k: 'ex.isWordExplain', p: wordParams(w) }, wordIds: [w.id] },
    w.text, distractors(course, w, pool, (x) => x.text, byText, 3, rng, (x) => x.vi !== w.vi && x.en !== w.en)), targetOptions: true };
}

export function listenWord(course: Course, w: Word, pool: Word[], rng: Rng = Math.random): Exercise {
  return mc({ id: `gen-listen-${w.id}`, skill: 'listening', prompt: { k: 'ex.listenWord' }, audio: w.audio ?? w.text, explanation: { k: 'ex.heardExplain', p: wordParams(w) }, wordIds: [w.id] },
    label(w), distractors(course, w, pool, label, (x) => [label(x)], 3, rng, (x) => x.text !== w.text && (x.pron ?? x.text) !== (w.pron ?? w.text)));
}

export function listenMeaning(course: Course, w: Word, pool: Word[], rng: Rng = Math.random): Exercise {
  return mc({ id: `gen-listenmean-${w.id}`, skill: 'listening', prompt: { k: 'ex.listenMeaning' }, audio: w.audio ?? w.text, explanation: { k: 'ex.heardExplain', p: wordParams(w) }, wordIds: [w.id] },
    meaning(w), distractors(course, w, pool, meaning, byMeaning, 3, rng));
}

function pinyinVariants(py: string): string[] {
  // 不 is written with its changed tone (bú) — also accept the citation tone.
  return py.includes('bú') ? [py, py.replace('bú', 'bù')] : [py];
}

/** Chinese: type the pinyin of the word shown. */
export function typePron(w: Word): Exercise | null {
  if (!w.pron) return null;
  return { id: `gen-pron-${w.id}`, kind: 'type', mode: 'pinyin', skill: 'writing', prompt: { k: 'ex.typePinyinWord', p: { meaning: meaning(w) } }, text: w.text, audio: w.audio ?? w.text, accepted: pinyinVariants(w.pron), explanation: { k: 'ex.readsAs', p: wordParams(w) }, wordIds: [w.id] };
}

/** Write the word: characters (zh, with pinyin shown), spelling dictation (en), Hangul with audio (ko). */
export function writeWord(course: Course, w: Word): Exercise {
  const mode = course.writeMode;
  const prompt: Txt = { k: `ex.write.${mode}`, p: wordParams(w) };
  return { id: `gen-write-${w.id}`, kind: 'type', mode, skill: 'writing', prompt, audio: mode === 'hanzi' ? undefined : w.audio ?? w.text, accepted: [w.text], explanation: { k: 'ex.writtenAs', p: wordParams(w) }, wordIds: [w.id] };
}

const sentenceExplain = (w: Word): Txt => ({ k: 'ex.sentenceExplain', p: { sentence: withPron(w.example.text, w.example.pron), meaning: meaning(w.example) } });

/** Find the word in its example sentence: whole words for English, substrings for Chinese / Korean. */
function locate(course: Course, sentence: string, word: string): { start: number; end: number } | null {
  if (course.id === 'en') {
    const re = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    const hits = [...sentence.matchAll(re)];
    return hits.length === 1 ? { start: hits[0].index!, end: hits[0].index! + hits[0][0].length } : null;
  }
  const at = sentence.indexOf(word);
  if (at < 0 || sentence.indexOf(word, at + 1) >= 0) return null;
  return { start: at, end: at + word.length };
}

/** Fill-in-the-blank from the word's example sentence. Distractors have a different word type. */
export function fillBlank(course: Course, w: Word, pool: Word[], rng: Rng = Math.random): Exercise | null {
  const s = w.example.text;
  const hit = locate(course, s, w.text);
  if (!hit || s.replace(/[\s\p{P}]/gu, '').length - w.text.replace(/\s/g, '').length < 2) return null;
  const wrong = distractors(course, w, pool, (x) => x.text, byText, 3, rng, (x) => x.type !== w.type && !s.toLowerCase().includes(x.text.toLowerCase()) && !x.text.includes(w.text));
  if (wrong.length < 3) return null;
  const blank = course.id === 'zh' ? '＿＿' : '____';
  return { ...mc({ id: `gen-fill-${w.id}`, skill: 'reading', prompt: { k: 'ex.fillBlank', p: { meaning: meaning(w.example) } }, text: s.slice(0, hit.start) + blank + s.slice(hit.end), explanation: sentenceExplain(w), wordIds: [w.id] }, w.text, wrong), targetOptions: true };
}

export function readSentence(course: Course, w: Word, pool: Word[], rng: Rng = Math.random): Exercise {
  const wrong = distractors(course, w, pool, (x) => meaning(x.example), bySentence, 3, rng);
  return mc({ id: `gen-read-${w.id}`, skill: 'reading', prompt: { k: 'ex.readSentence' }, text: w.example.text, explanation: sentenceExplain(w), wordIds: [w.id] }, meaning(w.example), wrong);
}

export function listenSentence(course: Course, w: Word, pool: Word[], rng: Rng = Math.random): Exercise {
  const wrong = distractors(course, w, pool, (x) => meaning(x.example), bySentence, 3, rng);
  return mc({ id: `gen-listens-${w.id}`, skill: 'listening', prompt: { k: 'ex.listenSentence' }, audio: w.example.text, explanation: sentenceExplain(w), wordIds: [w.id] }, meaning(w.example), wrong);
}

/** Chinese: hear a syllable, choose its tone. */
export function toneExercise(set: ToneSet, item: ToneSet['items'][number]): Exercise {
  return { id: `gen-tone-${item.text}`, kind: 'choice', skill: 'pronunciation', prompt: { k: 'ex.listenTone' }, audio: item.text, options: set.items.map((i) => i.pron), answer: set.items.indexOf(item),
    explanation: { k: 'ex.toneExplain', p: { text: item.text, pron: item.pron, tone: item.tone, meaning: meaning(item) } } };
}

/**
 * Hear one item of a minimal pair / contrast, choose what was said.
 * Chinese options are pinyin (the characters would give the answer away); other courses show the written word.
 */
export function contrastExercise(course: Course, c: Contrast, item: Contrast['items'][number]): Exercise {
  const option = (i: Contrast['items'][number]) => (course.id === 'zh' ? i.pron : i.text);
  return { id: `gen-contrast-${item.text}`, kind: 'choice', skill: 'pronunciation', prompt: { k: 'ex.listenContrast', p: { pair: c.title } }, audio: item.text, options: c.items.map(option), answer: c.items.indexOf(item), targetOptions: course.id !== 'zh',
    explanation: { k: 'ex.contrastExplain', p: { word: withPron(item.text, item.pron), meaning: meaning(item), note: c.note } } };
}

export function allToneExercises(course: Course): Exercise[] {
  return course.toneSets.flatMap((s) => s.items.map((i) => toneExercise(s, i)));
}

export function allContrastExercises(course: Course): Exercise[] {
  return course.contrasts.flatMap((c) => c.items.map((i) => contrastExercise(course, c, i)));
}

// ---------- rebuilding exercises from their id ----------

const WORD_MAKERS: [string, (c: Course, w: Word) => Exercise | null][] = [
  ['gen-meaning-', (c, w) => meaningChoice(c, w, c.words)],
  ['gen-reverse-', (c, w) => wordChoice(c, w, c.words)],
  ['gen-listenmean-', (c, w) => listenMeaning(c, w, c.words)],
  ['gen-listens-', (c, w) => listenSentence(c, w, c.words)],
  ['gen-listen-', (c, w) => listenWord(c, w, c.words)],
  ['gen-pron-', (_c, w) => typePron(w)],
  ['gen-write-', (c, w) => writeWord(c, w)],
  ['gen-fill-', (c, w) => fillBlank(c, w, c.words)],
  ['gen-read-', (c, w) => readSentence(c, w, c.words)],
];

/** Id prefixes used before the multi-course upgrade (schema ≤ 2, Chinese only). */
export const LEGACY_ID_PREFIXES: [string, string][] = [
  ['gen-zh2vi-', 'gen-meaning-'],
  ['gen-vi2zh-', 'gen-reverse-'],
  ['gen-listenvi-', 'gen-listenmean-'],
  ['gen-py-', 'gen-pron-'],
  ['gen-hz-', 'gen-write-'],
];

export function upgradeExerciseId(id: string): string {
  for (const [from, to] of LEGACY_ID_PREFIXES) if (id.startsWith(from)) return to + id.slice(from.length);
  return id;
}

/**
 * The exercise with this id in the course, in its current, language-independent form.
 * Saved mistakes store only the id, so they display in whichever interface language is active.
 * Generated multiple-choice items get fresh distractors. Returns null for unknown ids.
 */
export function exerciseById(course: Course, id: string): Exercise | null {
  const fixed = fixedExerciseOf(course, id);
  if (fixed) return fixed;
  if (id.startsWith('gen-tone-')) {
    const text = id.slice('gen-tone-'.length);
    for (const set of course.toneSets) for (const item of set.items) if (item.text === text) return toneExercise(set, item);
    return null;
  }
  if (id.startsWith('gen-contrast-')) {
    const text = id.slice('gen-contrast-'.length);
    for (const c of course.contrasts) for (const item of c.items) if (item.text === text) return contrastExercise(course, c, item);
    return null;
  }
  for (const [prefix, make] of WORD_MAKERS) {
    if (!id.startsWith(prefix)) continue;
    const w = wordOf(course, id.slice(prefix.length));
    return w ? make(course, w) : null;
  }
  return null;
}

// ---------- pools ----------

export function unlockedLessons(course: Course, cp: CourseProgress): Lesson[] {
  return course.lessons.filter((l) => isLessonUnlocked(cp, l));
}

/** Words available for practice: words of unlocked lessons (completed + current). */
export function availableWords(course: Course, cp: CourseProgress): Word[] {
  const ids = new Set(unlockedLessons(course, cp).flatMap((l) => l.wordIds));
  return course.words.filter((w) => ids.has(w.id));
}

/** Lessons a test may draw from: completed lessons, or Day 1 for a brand-new learner. */
export function testedLessons(course: Course, cp: CourseProgress): Lesson[] {
  const done = course.lessons.filter((l) => isLessonCompleted(cp, l.id));
  return done.length ? done : course.lessons.slice(0, 1);
}

function lessonExercises(course: Course, lessons: Lesson[]): Exercise[] {
  const lessonIds = new Set(lessons.map((l) => l.id));
  return [
    ...lessons.flatMap((l) => [...l.practice, ...l.quiz]),
    ...course.grammar.filter((g) => lessonIds.has(g.lessonId)).flatMap((g) => g.exercises),
  ];
}

/** Word practice modes. 'pron' (type the pinyin) exists only for courses with `typePron`. */
export type PracticeMode = 'meaning' | 'reverse' | 'listen' | 'pron' | 'write' | 'fill' | 'mixed';

export function practiceModes(course: Course): PracticeMode[] {
  return ['meaning', 'reverse', 'listen', ...(course.typePron ? (['pron'] as const) : []), 'write', 'fill', 'mixed'];
}

export function exerciseForWord(course: Course, w: Word, mode: PracticeMode, pool: Word[], rng: Rng = Math.random): Exercise {
  switch (mode) {
    case 'meaning': return meaningChoice(course, w, pool, rng);
    case 'reverse': return wordChoice(course, w, pool, rng);
    case 'listen': return rng() < 0.5 ? listenWord(course, w, pool, rng) : listenMeaning(course, w, pool, rng);
    case 'pron': return typePron(w) ?? meaningChoice(course, w, pool, rng);
    case 'write': return writeWord(course, w);
    case 'fill': return fillBlank(course, w, pool, rng) ?? meaningChoice(course, w, pool, rng);
    case 'mixed': {
      const makers: ((x: Word) => Exercise | null)[] = [
        (x) => meaningChoice(course, x, pool, rng),
        (x) => wordChoice(course, x, pool, rng),
        (x) => listenWord(course, x, pool, rng),
        (x) => listenMeaning(course, x, pool, rng),
        (x) => (course.typePron ? typePron(x) : writeWord(course, x)),
        (x) => fillBlank(course, x, pool, rng),
      ];
      return makers[Math.floor(rng() * makers.length)](w) ?? wordChoice(course, w, pool, rng);
    }
  }
}

export function buildWordPractice(course: Course, wordIds: string[], mode: PracticeMode, pool: Word[], count: number, rng: Rng = Math.random): Exercise[] {
  return wordIds.slice(0, count).flatMap((id) => {
    const w = wordOf(course, id);
    return w ? [exerciseForWord(course, w, mode, pool, rng)] : [];
  });
}

export type { TestSkill };

export function buildTest(course: Course, cp: CourseProgress, skill: TestSkill, count: number, rng: Rng = Math.random): Exercise[] {
  const lessons = testedLessons(course, cp);
  const wordIds = new Set(lessons.flatMap((l) => l.wordIds));
  const words = course.words.filter((w) => wordIds.has(w.id));
  const fixed = lessonExercises(course, lessons);
  // Sound contrasts are taught from Day 2 on.
  const contrasts = lessons.some((l) => l.day >= 2) ? allContrastExercises(course) : [];
  const gens: Record<Exclude<TestSkill, 'mixed'>, () => Exercise[]> = {
    vocabulary: () => [
      ...words.flatMap((w) => [meaningChoice(course, w, words, rng), wordChoice(course, w, words, rng)]),
      ...fixed.filter((e) => e.skill === 'vocabulary'),
    ],
    pronunciation: () => [
      ...allToneExercises(course),
      ...contrasts,
      ...fixed.filter((e) => e.skill === 'pronunciation'),
    ],
    grammar: () => fixed.filter((e) => e.skill === 'grammar'),
    reading: () => [
      ...words.map((w) => readSentence(course, w, words, rng)),
      ...words.map((w) => fillBlank(course, w, words, rng)).filter((e): e is Exercise => !!e),
      ...fixed.filter((e) => e.skill === 'reading'),
    ],
    listening: () => [
      ...words.flatMap((w) => [listenWord(course, w, words, rng), listenSentence(course, w, words, rng)]),
      ...fixed.filter((e) => e.skill === 'listening'),
    ],
  };

  let pool: Exercise[];
  if (skill === 'mixed') {
    // Round-robin across skills so each is represented.
    const perSkill = (Object.keys(gens) as (keyof typeof gens)[]).map((k) => dedupe(shuffle(gens[k](), rng)));
    pool = [];
    for (let i = 0; pool.length < count && perSkill.some((p) => i < p.length); i++) {
      for (const p of perSkill) if (p[i] && pool.length < count) pool.push(p[i]);
    }
    pool = dedupe(pool);
  } else {
    pool = dedupe(shuffle(gens[skill](), rng));
  }
  return shuffle(pool.slice(0, count), rng);
}

function dedupe(list: Exercise[]): Exercise[] {
  const seen = new Set<string>();
  return list.filter((e) => (seen.has(e.id) ? false : (seen.add(e.id), true)));
}
