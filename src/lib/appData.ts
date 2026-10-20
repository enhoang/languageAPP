import type { AppData, Course, CourseId, CourseProgress, DayActivity, Exercise, QuizAttempt, Settings, Skill, Txt } from '../types';
import { lessonOf, PASS_PERCENT } from '../courses';
import { dayKey } from './dates';
import { introduceWord, newWordProgress, reviewWord } from './srs';

/**
 * 1: Chinese only. 2: mistakes keep only the exercise id; quiz attempts store ids instead of titles.
 * 3: several courses (target languages), each with its own progress record.
 */
export const SCHEMA_VERSION = 3;
export const MAX_MISTAKES = 200;
export const MAX_QUIZZES = 200;

export const DEFAULT_SETTINGS: Settings = {
  sessionMinutes: 20,
  speechRate: 0.85,
  voices: {},
  showPron: true,
  englishAccent: 'en-US',
};

export function emptyCourseProgress(): CourseProgress {
  return { lessons: {}, words: {}, activity: {}, skillStats: {}, quizzes: [], mistakes: [] };
}

export function createEmptyData(now: Date = new Date()): AppData {
  return {
    schemaVersion: SCHEMA_VERSION,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    settings: { ...DEFAULT_SETTINGS },
    currentCourse: null,
    courses: { zh: emptyCourseProgress(), en: emptyCourseProgress(), ko: emptyCourseProgress() },
  };
}

function emptyDay(): DayActivity {
  return { seconds: 0, answers: 0, correct: 0, lessonsCompleted: 0 };
}

/** Copy-on-write update of one course's progress. Other courses are never touched. */
function updateCourse(prev: AppData, id: CourseId, now: Date, fn: (cp: CourseProgress) => CourseProgress): AppData {
  return { ...prev, updatedAt: now.toISOString(), courses: { ...prev.courses, [id]: fn(prev.courses[id]) } };
}

function touchDay(cp: CourseProgress, now: Date): { cp: CourseProgress; day: DayActivity } {
  const key = dayKey(now);
  const day = { ...(cp.activity[key] ?? emptyDay()) };
  return { cp: { ...cp, activity: { ...cp.activity, [key]: day } }, day };
}

export interface AnswerRecord {
  exercise: Exercise;
  correct: boolean;
  given: Txt;
}

export function recordAnswer(prev: AppData, courseId: CourseId, rec: AnswerRecord, now: Date = new Date()): AppData {
  return updateCourse(prev, courseId, now, (start) => {
    const { cp, day } = touchDay(start, now);
    day.answers += 1;
    if (rec.correct) day.correct += 1;

    const skill = rec.exercise.skill;
    const s = cp.skillStats[skill] ?? { correct: 0, total: 0 };
    cp.skillStats = { ...cp.skillStats, [skill]: { correct: s.correct + (rec.correct ? 1 : 0), total: s.total + 1 } };

    if (rec.exercise.wordIds?.length) {
      const words = { ...cp.words };
      for (const id of new Set(rec.exercise.wordIds)) words[id] = reviewWord(words[id], rec.correct, now);
      cp.words = words;
    }

    const idx = cp.mistakes.findIndex((m) => m.id === rec.exercise.id);
    if (!rec.correct) {
      const mistakes = [...cp.mistakes];
      if (idx >= 0) {
        const m = mistakes[idx];
        mistakes.splice(idx, 1);
        mistakes.unshift({ ...m, at: now.toISOString(), given: rec.given, count: m.count + 1, resolved: false });
      } else {
        mistakes.unshift({ id: rec.exercise.id, at: now.toISOString(), given: rec.given, count: 1, resolved: false });
      }
      cp.mistakes = mistakes.slice(0, MAX_MISTAKES);
    } else if (idx >= 0 && !cp.mistakes[idx].resolved) {
      cp.mistakes = cp.mistakes.map((m, i) => (i === idx ? { ...m, resolved: true } : m));
    }
    return cp;
  });
}

export function startLesson(prev: AppData, courseId: CourseId, lessonId: string, now: Date = new Date()): AppData {
  if (prev.courses[courseId].lessons[lessonId]) return prev;
  return updateCourse(prev, courseId, now, (cp) => ({
    ...cp,
    lessons: { ...cp.lessons, [lessonId]: { status: 'in_progress', step: 0, startedAt: now.toISOString(), attempts: 0 } },
  }));
}

export function setLessonStep(prev: AppData, courseId: CourseId, lessonId: string, step: number, now: Date = new Date()): AppData {
  const lp = prev.courses[courseId].lessons[lessonId];
  if (!lp || lp.step === step) return prev;
  return updateCourse(prev, courseId, now, (cp) => ({ ...cp, lessons: { ...cp.lessons, [lessonId]: { ...lp, step } } }));
}

export type SkillTally = Partial<Record<Skill, { correct: number; total: number }>>;

export function tallyBySkill(items: { skill: Skill; correct: boolean }[]): SkillTally {
  const out: SkillTally = {};
  for (const it of items) {
    const t = out[it.skill] ?? { correct: 0, total: 0 };
    out[it.skill] = { correct: t.correct + (it.correct ? 1 : 0), total: t.total + 1 };
  }
  return out;
}

export function percent(correct: number, total: number): number {
  return total === 0 ? 0 : Math.round((correct / total) * 100);
}

/** Record a lesson knowledge check. Completes the lesson when the pass mark is reached. */
export function finishLessonQuiz(
  prev: AppData,
  course: Course,
  lessonId: string,
  results: { skill: Skill; correct: boolean }[],
  now: Date = new Date(),
): { data: AppData; passed: boolean; score: number } {
  const lesson = lessonOf(course, lessonId);
  const correct = results.filter((r) => r.correct).length;
  const total = results.length;
  const score = percent(correct, total);
  const passed = score >= PASS_PERCENT;

  let data = startLesson(prev, course.id, lessonId, now);
  data = updateCourse(data, course.id, now, (start) => {
    let cp = start;
    const lp = cp.lessons[lessonId];
    const firstCompletion = passed && lp.status !== 'completed';
    cp = {
      ...cp,
      lessons: {
        ...cp.lessons,
        [lessonId]: {
          ...lp,
          attempts: lp.attempts + 1,
          bestScore: Math.max(lp.bestScore ?? 0, score),
          status: passed || lp.status === 'completed' ? 'completed' : 'in_progress',
          completedAt: firstCompletion ? now.toISOString() : lp.completedAt,
        },
      },
    };
    if (firstCompletion) {
      const t = touchDay(cp, now);
      cp = t.cp;
      t.day.lessonsCompleted += 1;
      const words = { ...cp.words };
      for (const id of lesson?.wordIds ?? []) words[id] = introduceWord(words[id], now);
      cp.words = words;
    }
    return cp;
  });
  data = addQuizAttempt(data, course.id, {
    id: `${lessonId}-${now.getTime()}`,
    at: now.toISOString(),
    kind: 'lesson',
    lessonId,
    correct,
    total,
    bySkill: tallyBySkill(results),
  });
  return { data, passed, score };
}

export function addQuizAttempt(prev: AppData, courseId: CourseId, attempt: QuizAttempt): AppData {
  return updateCourse(prev, courseId, new Date(attempt.at), (cp) => ({ ...cp, quizzes: [attempt, ...cp.quizzes].slice(0, MAX_QUIZZES) }));
}

export function addStudySeconds(prev: AppData, courseId: CourseId, seconds: number, now: Date = new Date()): AppData {
  return updateCourse(prev, courseId, now, (start) => {
    const { cp, day } = touchDay(start, now);
    day.seconds += seconds;
    return cp;
  });
}

export function toggleWordFlag(prev: AppData, courseId: CourseId, wordId: string, flag: 'favorite' | 'difficult', now: Date = new Date()): AppData {
  return updateCourse(prev, courseId, now, (cp) => {
    const wp = { ...(cp.words[wordId] ?? newWordProgress()) };
    wp[flag] = !wp[flag];
    return { ...cp, words: { ...cp.words, [wordId]: wp } };
  });
}

export function setCurrentCourse(prev: AppData, courseId: CourseId, now: Date = new Date()): AppData {
  if (prev.currentCourse === courseId) return prev;
  return { ...prev, currentCourse: courseId, updatedAt: now.toISOString() };
}

export function updateSettings(prev: AppData, patch: Partial<Settings>, now: Date = new Date()): AppData {
  return { ...prev, updatedAt: now.toISOString(), settings: { ...prev.settings, ...patch } };
}
