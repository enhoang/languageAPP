import type { AppData, Course, CourseId, CourseProgress, DayActivity, Lesson, Msg, QuizAttempt, Skill, StageId, TopicId, Txt } from '../types';
import { COURSE_IDS, fixedExerciseOf, grammarOf, lessonOf } from '../courses';
import { addDays, dayKey, lastDays } from './dates';
import { dueQueue, wordStatus } from './srs';

export function isActiveDay(a: DayActivity | undefined): boolean {
  return !!a && (a.answers > 0 || a.lessonsCompleted > 0 || a.seconds >= 60);
}

/** Consecutive active days ending today (or yesterday, if today has no activity yet). */
export function computeStreak(activity: Record<string, DayActivity>, now: Date = new Date()): number {
  let cursor = isActiveDay(activity[dayKey(now)]) ? now : addDays(now, -1);
  let streak = 0;
  while (isActiveDay(activity[dayKey(cursor)])) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

/** Daily activity of all courses added together — the streak and the daily goal count every language studied. */
export function totalActivity(data: AppData, only?: CourseId[]): Record<string, DayActivity> {
  const out: Record<string, DayActivity> = {};
  for (const id of only ?? COURSE_IDS) {
    for (const [day, a] of Object.entries(data.courses[id].activity)) {
      const t = out[day] ?? { seconds: 0, answers: 0, correct: 0, lessonsCompleted: 0 };
      out[day] = { seconds: t.seconds + a.seconds, answers: t.answers + a.answers, correct: t.correct + a.correct, lessonsCompleted: t.lessonsCompleted + a.lessonsCompleted };
    }
  }
  return out;
}

export function isLessonUnlocked(cp: CourseProgress, lesson: Lesson): boolean {
  return lesson.prerequisites.every((id) => cp.lessons[id]?.status === 'completed');
}

export function isLessonCompleted(cp: CourseProgress, lessonId: string): boolean {
  return cp.lessons[lessonId]?.status === 'completed';
}

/** First lesson (in curriculum order) that is not completed, or null when all are done. */
export function nextLesson(course: Course, cp: CourseProgress): Lesson | null {
  return course.lessons.find((l) => !isLessonCompleted(cp, l.id) && isLessonUnlocked(cp, l)) ?? null;
}

export function currentStage(course: Course, cp: CourseProgress): StageId {
  return (nextLesson(course, cp) ?? course.lessons[course.lessons.length - 1])?.stage ?? 1;
}

export function completedLessonIds(course: Course, cp: CourseProgress): string[] {
  return course.lessons.filter((l) => isLessonCompleted(cp, l.id)).map((l) => l.id);
}

/** True when the learner has done anything in this course. */
export function hasStarted(cp: CourseProgress): boolean {
  return Object.keys(cp.lessons).length > 0 || Object.keys(cp.words).length > 0 || cp.quizzes.length > 0;
}

/** Words the learner has met: from completed lessons or already reviewed. */
export function learnedWordIds(course: Course, cp: CourseProgress): string[] {
  const done = new Set(completedLessonIds(course, cp));
  return course.words.filter((w) => done.has(w.lessonId) || (cp.words[w.id]?.reps ?? 0) > 0).map((w) => w.id);
}

export function dueWordIds(cp: CourseProgress, now: Date = new Date()): string[] {
  return dueQueue(cp.words, now);
}

export function weeklySeconds(activity: Record<string, DayActivity>, now: Date = new Date()): { day: string; seconds: number; answers: number }[] {
  return lastDays(7, now).map((day) => ({ day, seconds: activity[day]?.seconds ?? 0, answers: activity[day]?.answers ?? 0 }));
}

export function masteryCounts(course: Course, cp: CourseProgress): Record<'new' | 'learning' | 'familiar' | 'mastered', number> {
  const out = { new: 0, learning: 0, familiar: 0, mastered: 0 };
  for (const w of course.words) out[wordStatus(cp.words[w.id])] += 1;
  return out;
}

export interface WeakTopic {
  label: Txt;
  detail: Txt;
  link: string;
  score: number; // lower = weaker
}

/** Weak areas derived from actual answer history. */
export function weakTopics(course: Course, cp: CourseProgress): WeakTopic[] {
  const out: WeakTopic[] = [];
  const byTopic = new Map<TopicId, { c: number; i: number }>();
  for (const w of course.words) {
    const p = cp.words[w.id];
    if (!p || p.reps === 0) continue;
    const t = byTopic.get(w.topic) ?? { c: 0, i: 0 };
    byTopic.set(w.topic, { c: t.c + p.correct, i: t.i + p.incorrect });
  }
  for (const [topic, { c, i }] of byTopic) {
    const total = c + i;
    if (total >= 3 && c / total < 0.75) {
      out.push({
        label: { k: 'common.stats.weakVocab', p: { topic: { k: `common.topic.${topic}` } } },
        detail: { k: 'common.stats.correctTimes', p: { correct: c, total } },
        link: `/vocabulary?topic=${topic}`,
        score: c / total,
      });
    }
  }
  const grammarMiss = new Map<string, number>();
  for (const m of cp.mistakes) {
    const gid = fixedExerciseOf(course, m.id)?.grammarId;
    if (m.resolved || !gid) continue;
    grammarMiss.set(gid, (grammarMiss.get(gid) ?? 0) + m.count);
  }
  for (const [gid, n] of grammarMiss) {
    const g = grammarOf(course, gid);
    if (g) out.push({ label: { k: 'common.stats.weakGrammar', p: { title: g.title } }, detail: { k: 'common.stats.openMistakes', p: { count: n } }, link: `/grammar/${gid}`, score: 1 / (1 + n) });
  }
  for (const [skill, s] of Object.entries(cp.skillStats) as [Skill, { correct: number; total: number }][]) {
    if (s.total >= 5 && s.correct / s.total < 0.7) {
      out.push({
        label: { k: 'common.stats.weakSkill', p: { skill: { k: `common.skill.${skill}` } } },
        detail: { k: 'common.stats.accuracy', p: { pct: Math.round((s.correct / s.total) * 100) } },
        link: '/practice',
        score: s.correct / s.total,
      });
    }
  }
  return out.sort((a, b) => a.score - b.score);
}

/** Display order. Labels: dictionary keys `common.skill.<skill>`. */
export const SKILLS: Skill[] = ['vocabulary', 'pronunciation', 'grammar', 'reading', 'listening', 'writing'];

/** Open (unresolved) mistakes on exercises of a grammar point. */
export function openGrammarMistakes(course: Course, cp: CourseProgress, grammarId: string): number {
  return cp.mistakes.filter((m) => !m.resolved && fixedExerciseOf(course, m.id)?.grammarId === grammarId).length;
}

/** "Day 3: <title>" for a lesson. */
export function lessonRef(lesson: Lesson): Msg {
  return { k: 'common.lessonRef', p: { day: lesson.day, title: lesson.title } };
}

/** Display title of a quiz attempt (lesson check or mini test). */
export function quizTitle(course: Course, q: QuizAttempt): Txt {
  const lesson = q.lessonId ? lessonOf(course, q.lessonId) : undefined;
  if (q.kind === 'lesson' && lesson) return lessonRef(lesson);
  return { k: 'common.testTitle', p: { skill: { k: `common.testSkill.${q.testSkill ?? 'mixed'}` }, count: q.total } };
}

export interface Recommendation {
  title: Txt;
  detail: Txt;
  to: string;
  cta: Txt;
}

/** Recommended next action in a course, derived from saved data. */
export function recommendNext(course: Course, cp: CourseProgress, now: Date = new Date()): Recommendation {
  const due = dueWordIds(cp, now).length;
  const next = nextLesson(course, cp);
  const openMistakes = cp.mistakes.filter((m) => !m.resolved).length;
  const doneToday = cp.activity[dayKey(now)]?.lessonsCompleted ?? 0;
  if (due >= 5 || (due > 0 && doneToday > 0)) {
    return { title: { k: 'common.stats.rec.reviewTitle', p: { count: due } }, detail: { k: 'common.stats.rec.reviewDetail' }, to: '/practice?mode=review', cta: { k: 'common.stats.rec.reviewCta' } };
  }
  if (next) {
    const lp = cp.lessons[next.id];
    return {
      title: lessonRef(next),
      detail: lp ? { k: 'common.stats.rec.lessonContinueDetail' } : next.subtitle,
      to: `/lesson/${next.id}`,
      cta: { k: lp ? 'common.stats.rec.lessonContinue' : 'common.stats.rec.lessonStart' },
    };
  }
  if (openMistakes > 0) {
    return { title: { k: 'common.stats.rec.mistakesTitle', p: { count: openMistakes } }, detail: { k: 'common.stats.rec.mistakesDetail' }, to: '/practice?mode=mistakes', cta: { k: 'common.stats.rec.mistakesCta' } };
  }
  return { title: { k: 'common.stats.rec.testTitle' }, detail: { k: 'common.stats.rec.testDetail' }, to: '/tests', cta: { k: 'common.stats.rec.testCta' } };
}
