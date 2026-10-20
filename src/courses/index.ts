import type { Course, CourseId, Exercise, GrammarPoint, Lesson, Word } from '../types';
import { ZH } from './zh';
import { EN } from './en';
import { KO } from './ko';

/** Display order of the courses (target languages). */
export const COURSE_IDS: CourseId[] = ['zh', 'en', 'ko'];

/** Lesson exercises get their lesson id; everything is indexed once. */
function prepare(c: Course): Course {
  return {
    ...c,
    lessons: c.lessons.map((l) => ({
      ...l,
      practice: l.practice.map((e) => ({ ...e, lessonId: l.id })),
      quiz: l.quiz.map((e) => ({ ...e, lessonId: l.id })),
    })),
  };
}

export const COURSES: Record<CourseId, Course> = { zh: prepare(ZH), en: prepare(EN), ko: prepare(KO) };

export function isCourseId(v: unknown): v is CourseId {
  return v === 'zh' || v === 'en' || v === 'ko';
}

interface Index {
  lesson: Record<string, Lesson>;
  word: Record<string, Word>;
  grammar: Record<string, GrammarPoint>;
  /** hand-written exercises: lesson practice + quizzes, grammar exercises */
  fixed: Record<string, Exercise>;
  fixedList: Exercise[];
}

const INDEX = Object.fromEntries(COURSE_IDS.map((id) => {
  const c = COURSES[id];
  const fixedList = [...c.lessons.flatMap((l) => [...l.practice, ...l.quiz]), ...c.grammar.flatMap((g) => g.exercises)];
  const idx: Index = {
    lesson: Object.fromEntries(c.lessons.map((l) => [l.id, l])),
    word: Object.fromEntries(c.words.map((w) => [w.id, w])),
    grammar: Object.fromEntries(c.grammar.map((g) => [g.id, g])),
    fixed: Object.fromEntries(fixedList.map((e) => [e.id, e])),
    fixedList,
  };
  return [id, idx];
})) as Record<CourseId, Index>;

export const lessonOf = (c: Course, id: string): Lesson | undefined => INDEX[c.id].lesson[id];
export const wordOf = (c: Course, id: string): Word | undefined => INDEX[c.id].word[id];
export const grammarOf = (c: Course, id: string): GrammarPoint | undefined => INDEX[c.id].grammar[id];
export const fixedExerciseOf = (c: Course, id: string): Exercise | undefined => INDEX[c.id].fixed[id];
export const fixedExercises = (c: Course): Exercise[] => INDEX[c.id].fixedList;

/** Which course a lesson id belongs to (lesson ids are unique across courses). */
export function courseOfLesson(lessonId: string): Course | undefined {
  return COURSE_IDS.map((id) => COURSES[id]).find((c) => INDEX[c.id].lesson[lessonId]);
}

/** Minimum quiz score (%) to complete a lesson. */
export const PASS_PERCENT = 60;
