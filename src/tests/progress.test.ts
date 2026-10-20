import { describe, expect, it } from 'vitest';
import { createEmptyData, finishLessonQuiz, recordAnswer, setCurrentCourse, toggleWordFlag } from '../lib/appData';
import { computeStreak, isLessonUnlocked, nextLesson, totalActivity } from '../lib/stats';
import { exportBackup, loadData, migrate, parseBackup, saveData, STORAGE_KEY } from '../lib/storage';
import { COURSES, lessonOf } from '../courses';
import type { Exercise } from '../types';

const ZH = COURSES.zh;
const ex: Exercise = { id: 'x1', kind: 'choice', skill: 'vocabulary', prompt: '', options: ['a', 'b'], answer: 0, explanation: '', wordIds: ['mama'] };

class MemStorage {
  m = new Map<string, string>();
  getItem(k: string) { return this.m.get(k) ?? null; }
  setItem(k: string, v: string) { this.m.set(k, v); }
}

describe('lesson progression', () => {
  it('unlocks lessons in order only after passing', () => {
    let data = createEmptyData();
    expect(nextLesson(ZH, data.courses.zh)?.id).toBe('d1');
    expect(isLessonUnlocked(data.courses.zh, lessonOf(ZH, 'd2')!)).toBe(false);
    let r = finishLessonQuiz(data, ZH, 'd1', [{ skill: 'vocabulary', correct: true }, { skill: 'vocabulary', correct: false }, { skill: 'vocabulary', correct: false }]);
    expect(r.passed).toBe(false);
    expect(isLessonUnlocked(r.data.courses.zh, lessonOf(ZH, 'd2')!)).toBe(false);
    r = finishLessonQuiz(r.data, ZH, 'd1', [{ skill: 'vocabulary', correct: true }, { skill: 'vocabulary', correct: true }, { skill: 'vocabulary', correct: false }]);
    expect(r.passed).toBe(true);
    data = r.data;
    expect(data.courses.zh.lessons.d1).toMatchObject({ status: 'completed', attempts: 2, bestScore: 67 });
    expect(isLessonUnlocked(data.courses.zh, lessonOf(ZH, 'd2')!)).toBe(true);
    expect(nextLesson(ZH, data.courses.zh)?.id).toBe('d2');
    expect(data.courses.zh.words.baba.status).toBe('learning');
    expect(data.courses.zh.quizzes).toHaveLength(2);
  });
});

describe('several courses', () => {
  it('keep separate progress; switching course never overwrites another', () => {
    let data = createEmptyData();
    expect(data.currentCourse).toBeNull();
    data = setCurrentCourse(data, 'zh');
    data = finishLessonQuiz(data, ZH, 'd1', [{ skill: 'vocabulary', correct: true }]).data;
    data = toggleWordFlag(data, 'zh', 'mama', 'favorite');
    const zhBefore = JSON.stringify(data.courses.zh);
    data = setCurrentCourse(data, 'ko');
    data = recordAnswer(data, 'ko', { exercise: { ...ex, id: 'k1', wordIds: [] }, correct: false, given: 'x' });
    data = setCurrentCourse(data, 'en');
    data = recordAnswer(data, 'en', { exercise: { ...ex, id: 'e1', wordIds: [] }, correct: true, given: 'a' });
    expect(JSON.stringify(data.courses.zh)).toBe(zhBefore);
    expect(data.courses.ko.mistakes.map((m) => m.id)).toEqual(['k1']);
    expect(data.courses.en.mistakes).toEqual([]);
    expect(data.courses.ko.lessons).toEqual({});
    data = setCurrentCourse(data, 'zh');
    expect(data.courses.zh.lessons.d1.status).toBe('completed');
  });

  it('adds up activity of all courses for the streak and daily goal', () => {
    const now = new Date('2026-10-10T08:00:00');
    let data = createEmptyData();
    data = recordAnswer(data, 'zh', { exercise: { ...ex, wordIds: [] }, correct: true, given: 'a' }, new Date('2026-10-09T08:00:00'));
    data = recordAnswer(data, 'ko', { exercise: { ...ex, wordIds: [] }, correct: true, given: 'a' }, now);
    expect(computeStreak(data.courses.zh.activity, now)).toBe(1);
    expect(computeStreak(totalActivity(data), now)).toBe(2);
    expect(totalActivity(data)['2026-10-10'].answers).toBe(1);
  });
});

describe('answers and mistakes', () => {
  it('records activity, skill stats, word reviews and resolves mistakes', () => {
    const now = new Date('2026-10-01T10:00:00');
    let data = recordAnswer(createEmptyData(), 'zh', { exercise: ex, correct: false, given: 'b' }, now);
    const zh = () => data.courses.zh;
    expect(zh().mistakes).toHaveLength(1);
    expect(zh().words.mama.lapses).toBe(1);
    expect(zh().skillStats.vocabulary).toEqual({ correct: 0, total: 1 });
    data = recordAnswer(data, 'zh', { exercise: ex, correct: true, given: 'a' }, now);
    expect(zh().mistakes[0].resolved).toBe(true);
    expect(zh().activity['2026-10-01']).toMatchObject({ answers: 2, correct: 1 });
  });
});

describe('streak', () => {
  const day = { seconds: 0, answers: 3, correct: 2, lessonsCompleted: 0 };
  it('counts consecutive active days, allowing today to be empty', () => {
    const now = new Date('2026-10-10T08:00:00');
    expect(computeStreak({ '2026-10-09': day, '2026-10-08': day, '2026-10-06': day }, now)).toBe(2);
    expect(computeStreak({ '2026-10-10': day, '2026-10-09': day }, now)).toBe(2);
    expect(computeStreak({ '2026-10-07': day }, now)).toBe(0);
  });
});

describe('storage and backup', () => {
  it('persists and reloads data', () => {
    const s = new MemStorage() as unknown as Storage;
    let data = finishLessonQuiz(createEmptyData(), ZH, 'd1', [{ skill: 'vocabulary', correct: true }]).data;
    data = setCurrentCourse(data, 'ko');
    saveData(data, s);
    const back = loadData(s);
    expect(back.courses.zh.lessons.d1.status).toBe('completed');
    expect(back.currentCourse).toBe('ko');
  });
  it('keeps a copy of corrupt data and starts fresh', () => {
    const s = new MemStorage();
    s.setItem(STORAGE_KEY, '{oops');
    const data = loadData(s as unknown as Storage);
    expect(data.courses.zh.lessons).toEqual({});
    expect([...s.m.keys()].some((k) => k.includes('corrupt'))).toBe(true);
  });
  it('round-trips a backup and rejects invalid files', () => {
    const data = recordAnswer(createEmptyData(), 'zh', { exercise: ex, correct: true, given: 'a' });
    const r = parseBackup(exportBackup(data));
    expect(r.ok && r.data.courses.zh.words.mama.correct).toBe(1);
    expect(parseBackup('not json').ok).toBe(false);
    expect(parseBackup('{"foo":1}').ok).toBe(false);
    expect(parseBackup(JSON.stringify({ app: 'chinese-learning-companion', data: { ...data, schemaVersion: 99 } })).ok).toBe(false);
  });
});

describe('schema v2 → v3 migration (Chinese-only app → several courses)', () => {
  const v2 = {
    schemaVersion: 2,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-10-01T00:00:00Z',
    settings: { sessionMinutes: 30, speechRate: 0.7, voiceURI: 'Tingting', showPinyin: false },
    lessons: { d1: { status: 'completed', step: 4, startedAt: '2026-10-01T00:00:00Z', attempts: 1, bestScore: 80 } },
    words: { mama: { status: 'learning', interval: 1, ease: 2.3, due: '2026-10-02T00:00:00Z', reps: 1, lapses: 0, correct: 1, incorrect: 0, lastReviewed: null, lastAdvanceDay: null, favorite: true, difficult: false } },
    activity: { '2026-10-01': { seconds: 600, answers: 12, correct: 10, lessonsCompleted: 1 } },
    skillStats: { vocabulary: { correct: 10, total: 12 } },
    quizzes: [{ id: 'a', at: '2026-10-01T00:00:00Z', kind: 'lesson', lessonId: 'd1', correct: 4, total: 5, bySkill: {} }],
    mistakes: [
      { id: 'gen-zh2vi-mama', at: '2026-10-01T00:00:00Z', given: 'bố', count: 1, resolved: false },
      { id: 'd1-q1', at: '2026-10-01T00:00:00Z', given: 'mā', count: 2, resolved: false },
    ],
  };

  it('moves every bit of progress into the Chinese course', () => {
    const data = migrate(JSON.parse(JSON.stringify(v2)))!;
    expect(data.schemaVersion).toBe(3);
    expect(data.currentCourse).toBe('zh');
    expect(data.createdAt).toBe(v2.createdAt);
    const zh = data.courses.zh;
    expect(zh.lessons).toEqual(v2.lessons);
    expect(zh.words).toEqual(v2.words);
    expect(zh.activity).toEqual(v2.activity);
    expect(zh.skillStats).toEqual(v2.skillStats);
    expect(zh.quizzes).toEqual(v2.quizzes);
    expect(zh.mistakes.map((m) => m.id)).toEqual(['gen-meaning-mama', 'd1-q1']);
    expect(data.courses.en).toEqual({ lessons: {}, words: {}, activity: {}, skillStats: {}, quizzes: [], mistakes: [] });
    expect(data.settings).toMatchObject({ sessionMinutes: 30, speechRate: 0.7, voices: { zh: 'Tingting' }, showPron: false, englishAccent: 'en-US' });
    expect('voiceURI' in data.settings || 'showPinyin' in data.settings).toBe(false);
  });

  it('a brand-new v2 record asks the learner to pick a course', () => {
    const fresh = { ...v2, lessons: {}, words: {}, quizzes: [], mistakes: [], activity: {} };
    expect(migrate(fresh)!.currentCourse).toBeNull();
  });

  it('restores an old backup file', () => {
    const r = parseBackup(JSON.stringify({ app: 'chinese-learning-companion', data: v2 }));
    expect(r.ok && r.data.courses.zh.lessons.d1.status).toBe('completed');
  });
});
