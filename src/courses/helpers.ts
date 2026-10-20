import type { ArrangeExercise, ChoiceExercise, Exercise, Gloss, GrammarPoint, Lesson, Skill, StageId, Txt, TypeMode, Word } from '../types';

// Small helpers to keep lesson authoring concise; shared by every course.
// Prompts that repeat across lessons come from the interface dictionary (src/i18n/locales/*/ex.ts).

/** Listening multiple choice. `answer` is the index of the correct option. */
export function listen(id: string, audio: string, options: Txt[], answer: number, explanation: Txt, extra: Partial<ChoiceExercise> = {}): ChoiceExercise {
  return { id, kind: 'choice', skill: 'listening', prompt: { k: 'ex.listenChoose' }, audio, options, answer, explanation, ...extra };
}

/** Multiple choice. `answer` is the index of the correct option. */
export function choice(id: string, skill: Skill, prompt: Txt, options: Txt[], answer: number, explanation: Txt, extra: Partial<ChoiceExercise> = {}): ChoiceExercise {
  return { id, kind: 'choice', skill, prompt, options, answer, explanation, ...extra };
}

/** Type an answer (spelling, Hangul, characters, pinyin). The first accepted answer is shown as the correct one. */
export function typeIt(id: string, mode: TypeMode, prompt: Txt, accepted: string[], explanation: Txt, extra: Partial<Exercise> = {}): Exercise {
  return { id, kind: 'type', skill: 'writing', mode, prompt, accepted, explanation, ...extra } as Exercise;
}

/**
 * Put tokens in order to say `meaning`. `joiner` is how the course writes them together
 * ('' for Chinese, ' ' for English / Korean). Grading ignores spaces, punctuation and case.
 */
export function arrangeWith(joiner: string) {
  return (id: string, meaning: Gloss, tokens: string[], explanation: Txt, wordIds?: string[], answers?: string[]): ArrangeExercise =>
    ({ id, kind: 'arrange', skill: 'grammar', prompt: { k: 'ex.arrange', p: { meaning } }, tokens, answers: answers ?? [tokens.join(joiner)], explanation, wordIds });
}

/** Match pairs prompt, shared by all lessons. */
export const MATCH_PROMPT: Txt = { k: 'ex.matchMeaning' };

/** One day of a course: the lesson plus the words and grammar points it introduces. */
export interface DayContent {
  lesson: Lesson;
  words: Word[];
  grammar: GrammarPoint[];
}

type WordInput = Omit<Word, 'lessonId' | 'stage' | 'example'> & {
  /** example: [sentence, Vietnamese, English] or [sentence, Vietnamese, English, pronunciation aid] */
  ex: [string, string, string] | [string, string, string, string];
};

/** Words of one lesson: fills in lessonId, stage and the example object. */
export function wordsOf(lessonId: string, stage: StageId, list: WordInput[]): Word[] {
  return list.map(({ ex, ...w }) => ({ ...w, lessonId, stage, example: { text: ex[0], vi: ex[1], en: ex[2], ...(ex[3] ? { pron: ex[3] } : {}) } }));
}

/** Merge day files into course content. */
export function mergeDays(days: DayContent[]): { lessons: Lesson[]; words: Word[]; grammar: GrammarPoint[] } {
  return { lessons: days.map((d) => d.lesson), words: days.flatMap((d) => d.words), grammar: days.flatMap((d) => d.grammar) };
}
