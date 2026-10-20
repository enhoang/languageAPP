import { describe, expect, it } from 'vitest';
import type { Course, Exercise, ExerciseResponse } from '../types';
import { COURSE_IDS, COURSES, fixedExercises, grammarOf, wordOf } from '../courses';
import { grade, toView } from '../lib/grading';
import { normalizeScript } from '../lib/text';
import { parsePinyin } from '../lib/pinyin';
import { buildTest, buildWordPractice, exerciseById, fillBlank, practiceModes } from '../lib/generate';
import { createEmptyData, finishLessonQuiz } from '../lib/appData';

const same = (o: unknown) => JSON.stringify(o);
const HAN = /\p{Script=Han}/u;
const HANGUL = /\p{Script=Hangul}/u;
const LATIN = /[A-Za-z]/;

/** The response a learner would give if they answered exactly as the key says. */
function perfectResponse(ex: Exercise): ExerciseResponse {
  switch (ex.kind) {
    case 'choice': return { kind: 'choice', value: String(ex.answer) };
    case 'match': return { kind: 'match', value: Object.fromEntries(ex.pairs.map((p) => [p.text, p.vi])) };
    case 'type': return { kind: 'type', value: ex.accepted[0] };
    case 'arrange': {
      // rebuild the token order that spells answers[0]
      const target = normalizeScript(ex.answers[0]);
      const order: string[] = [];
      const left = [...ex.tokens];
      let rest = target;
      while (rest) {
        const i = left.findIndex((t) => normalizeScript(t) && rest.startsWith(normalizeScript(t)));
        if (i < 0) throw new Error(`${ex.id}: tokens cannot form answer`);
        order.push(left[i]);
        rest = rest.slice(normalizeScript(left[i]).length);
        left.splice(i, 1);
      }
      expect(left, `${ex.id}: unused tokens`).toEqual([]);
      return { kind: 'arrange', value: order };
    }
  }
}

/** Script the course's target text must be written in. */
function inTargetScript(course: Course, s: string): boolean {
  if (course.id === 'zh') return HAN.test(s);
  if (course.id === 'ko') return HANGUL.test(s);
  return LATIN.test(s) && !HAN.test(s) && !HANGUL.test(s);
}

function completeAll(course: Course) {
  let data = createEmptyData();
  for (const l of course.lessons) data = finishLessonQuiz(data, course, l.id, [{ skill: 'vocabulary', correct: true }]).data;
  return data.courses[course.id];
}

describe.each(COURSE_IDS.map((id) => [id, COURSES[id]] as const))('%s course', (id, course) => {
  const allFixed = fixedExercises(course);

  it('has 7 complete lessons in prerequisite order', () => {
    expect(course.lessons.map((l) => l.day)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    course.lessons.forEach((l, i) => {
      expect(l.prerequisites, l.id).toEqual(i === 0 ? [] : [course.lessons[i - 1].id]);
      expect(l.objectives.length, l.id).toBeGreaterThan(0);
      expect(l.intro.length, l.id).toBeGreaterThan(0);
      expect(l.sections.length, l.id).toBeGreaterThanOrEqual(3);
      expect(l.summary.length, l.id).toBeGreaterThan(0);
      expect(l.practice.length, l.id).toBeGreaterThanOrEqual(5);
      expect(l.quiz.length, l.id).toBeGreaterThanOrEqual(5);
    });
  });

  it('has a roadmap, stages, pronunciation module and enough vocabulary', () => {
    expect(course.stages.length).toBe(4);
    for (const s of course.stages) expect(s.level, `stage ${s.id}`).toBeTruthy();
    expect(course.roadmap.length).toBeGreaterThanOrEqual(7);
    expect(course.pronunciation.tabs.length).toBeGreaterThanOrEqual(2);
    expect(course.contrasts.length).toBeGreaterThanOrEqual(3);
    expect(course.words.length).toBeGreaterThanOrEqual(40);
    expect(course.grammar.length).toBeGreaterThanOrEqual(4);
  });

  it('uses ids that do not collide with other courses', () => {
    for (const other of COURSE_IDS.filter((o) => o !== id)) {
      const otherLessons = new Set(COURSES[other].lessons.map((l) => l.id));
      for (const l of course.lessons) expect(otherLessons.has(l.id), `${l.id} also in ${other}`).toBe(false);
    }
  });

  it('references only existing words and grammar', () => {
    for (const l of course.lessons) {
      for (const w of l.wordIds) expect(wordOf(course, w), `${l.id} word ${w}`).toBeDefined();
      for (const g of l.grammarIds) expect(grammarOf(course, g), `${l.id} grammar ${g}`).toBeDefined();
      for (const s of l.sections) {
        if (s.kind === 'words') s.wordIds.forEach((w) => expect(wordOf(course, w), w).toBeDefined());
        if (s.kind === 'grammar') expect(grammarOf(course, s.grammarId), s.grammarId).toBeDefined();
      }
    }
    for (const ex of allFixed) for (const w of ex.wordIds ?? []) expect(wordOf(course, w), `${ex.id} -> ${w}`).toBeDefined();
    for (const w of course.words) expect(course.lessons.find((l) => l.id === w.lessonId)?.wordIds, w.id).toContain(w.id);
    for (const g of course.grammar) expect(course.lessons.find((l) => l.id === g.lessonId)?.grammarIds, g.id).toContain(g.id);
  });

  it('has unique word ids and exercise ids', () => {
    expect(new Set(course.words.map((w) => w.id)).size).toBe(course.words.length);
    expect(new Set(allFixed.map((e) => e.id)).size).toBe(allFixed.length);
    for (const e of allFixed) expect(e.id.startsWith('gen-'), e.id).toBe(false);
  });

  it('vocabulary is written in the target script with meanings, examples and levels', () => {
    for (const w of course.words) {
      expect(inTargetScript(course, w.text), `${w.id}: ${w.text}`).toBe(true);
      expect(inTargetScript(course, w.example.text), `${w.id}: ${w.example.text}`).toBe(true);
      expect(w.vi && w.en && w.example.vi && w.example.en && w.level, w.id).toBeTruthy();
      if (id === 'zh') {
        expect(w.pron, w.id).toBeTruthy();
        const chars = [...w.text].length;
        expect(parsePinyin(w.pron!).tones.length, w.id).toBeLessThanOrEqual(chars);
        if (w.type !== 'particle') expect(parsePinyin(w.pron!).tones.length, w.id).toBeGreaterThan(0);
      }
      // Pinyin is only for Chinese: IPA for English, romanization for Korean.
      if (id === 'en' && w.pron) expect(w.pron, w.id).toMatch(/^\/.+\/$/);
      if (id === 'ko' && w.pron) expect(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/.test(w.pron), `${w.id} pinyin-like romanization`).toBe(false);
    }
    expect(new Set(course.words.map((w) => w.vi)).size, 'duplicate Vietnamese meanings').toBe(course.words.length);
    expect(new Set(course.words.map((w) => w.en)).size, 'duplicate English meanings').toBe(course.words.length);
  });

  it('grammar points have ≥3 examples, mistakes and exercises', () => {
    for (const g of course.grammar) {
      expect(g.examples.length, g.id).toBeGreaterThanOrEqual(3);
      expect(g.mistakes.length, g.id).toBeGreaterThan(0);
      expect(g.exercises.length, g.id).toBeGreaterThan(0);
    }
  });

  it('every fixed exercise has a consistent, gradable answer key', () => {
    for (const ex of allFixed) {
      expect(ex.explanation, ex.id).toBeTruthy();
      if (ex.kind === 'choice') {
        expect(Number.isInteger(ex.answer) && ex.answer >= 0 && ex.answer < ex.options.length, `${ex.id} answer index`).toBe(true);
        expect(new Set(ex.options.map(same)).size, `${ex.id} duplicate options`).toBe(ex.options.length);
      }
      if (ex.kind === 'match') {
        expect(new Set(ex.pairs.map((p) => p.text)).size).toBe(ex.pairs.length);
        expect(new Set(ex.pairs.map((p) => p.vi)).size).toBe(ex.pairs.length);
        expect(new Set(ex.pairs.map((p) => p.en)).size).toBe(ex.pairs.length);
      }
      if (ex.kind === 'type') {
        const allowed = id === 'zh' ? ['pinyin', 'hanzi'] : id === 'en' ? ['spelling'] : ['hangul'];
        expect(allowed, `${ex.id} type mode ${ex.mode}`).toContain(ex.mode);
      }
      toView(ex, course);
      expect(grade(ex, perfectResponse(ex)).correct, ex.id).toBe(true);
    }
  });

  it('every fixed and generated exercise can be rebuilt from its id (saved mistakes store only ids)', () => {
    for (const ex of allFixed) expect(exerciseById(course, ex.id), ex.id).toBe(ex);
    const cp = completeAll(course);
    const generated = [
      ...practiceModes(course).flatMap((m) => buildWordPractice(course, course.words.map((w) => w.id), m, course.words, course.words.length)),
      ...(['pronunciation', 'reading', 'listening'] as const).flatMap((s) => buildTest(course, cp, s, 300)),
    ];
    for (const ex of generated) {
      const rebuilt = exerciseById(course, ex.id);
      expect(rebuilt, ex.id).not.toBeNull();
      expect(rebuilt!.kind, ex.id).toBe(ex.kind);
      expect(same(rebuilt!.prompt), ex.id).toBe(same(ex.prompt));
    }
    expect(exerciseById(course, 'gen-meaning-nope')).toBeNull();
    expect(exerciseById(course, 'unknown')).toBeNull();
  });

  it('generated practice items for every mode are gradable with distinct options', () => {
    for (const mode of practiceModes(course)) {
      for (const ex of buildWordPractice(course, course.words.map((w) => w.id), mode, course.words, course.words.length)) {
        if (ex.kind === 'choice') {
          expect(ex.options[ex.answer]).toBeDefined();
          expect(new Set(ex.options.map(same)).size, `${ex.id} ${same(ex.options)}`).toBe(ex.options.length);
          const ens = ex.options.map((o) => (typeof o === 'object' && 'en' in o ? o.en : same(o)));
          expect(new Set(ens).size, `${ex.id} ${ens}`).toBe(ex.options.length);
          expect(ex.options.length).toBeGreaterThanOrEqual(2);
        }
        expect(grade(ex, perfectResponse(ex)).correct, ex.id).toBe(true);
      }
    }
  });

  it('fill-in-the-blank never offers another word of the same type', () => {
    for (const w of course.words) {
      const ex = fillBlank(course, w, course.words);
      if (!ex || ex.kind !== 'choice') continue;
      const others = ex.options.filter((_, i) => i !== ex.answer).map((o) => course.words.find((x) => x.text === o)!);
      for (const o of others) expect(o.type, `${w.id} vs ${o.id}`).not.toBe(w.type);
    }
  });

  it('tests respect length and only use completed lessons', () => {
    const fresh = createEmptyData();
    const t = buildTest(course, fresh.courses[id], 'mixed', 10);
    expect(t.length).toBeLessThanOrEqual(10);
    expect(t.length).toBeGreaterThan(0);
    const allowed = new Set(course.lessons[0].wordIds);
    for (const ex of t) for (const w of ex.wordIds ?? []) expect(allowed.has(w), `${ex.id} uses ${w}`).toBe(true);
    // after finishing Day 1, Day 2 (unlocked but not studied) must not be tested
    const afterD1 = finishLessonQuiz(fresh, course, course.lessons[0].id, [{ skill: 'vocabulary', correct: true }]).data.courses[id];
    for (const ex of buildTest(course, afterD1, 'mixed', 20)) {
      for (const w of ex.wordIds ?? []) expect(allowed.has(w), `${ex.id} uses ${w}`).toBe(true);
      expect(ex.lessonId === undefined || ex.lessonId === course.lessons[0].id, ex.id).toBe(true);
      expect(ex.id.startsWith('gen-contrast'), ex.id).toBe(false);
    }
    const cp = completeAll(course);
    for (const skill of ['mixed', 'vocabulary', 'pronunciation', 'grammar', 'reading', 'listening'] as const) {
      const items = buildTest(course, cp, skill, 20);
      expect(items.length, skill).toBe(20);
      expect(new Set(items.map((e) => e.id)).size).toBe(items.length);
    }
  });
});
