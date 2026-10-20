import type { AppData, CourseProgress, Mistake, QuizAttempt, TestSkill } from '../types';
import { COURSE_IDS, COURSES, isCourseId } from '../courses';
import { createEmptyData, DEFAULT_SETTINGS, emptyCourseProgress, SCHEMA_VERSION } from './appData';
import { exerciseById, upgradeExerciseId } from './generate';
import { hasStarted } from './stats';

export const STORAGE_KEY = 'clc:data';
const EXPORT_APP = 'chinese-learning-companion';

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

type Raw = Record<string, unknown>;

/**
 * Validate and upgrade raw data to the current schema. Older versions are upgraded step by step
 * (1 → 2 → 3) and no progress is dropped. Returns null when the data is not a recognisable learner record.
 */
export function migrate(raw: unknown): AppData | null {
  if (!isObj(raw) || typeof raw.schemaVersion !== 'number') return null;
  if (raw.schemaVersion > SCHEMA_VERSION || raw.schemaVersion < 1) return null;
  let r: Raw = raw;
  if (r.schemaVersion === 1) {
    if (!isChineseRecord(r)) return null;
    r = migrateV1(r);
  }
  if (r.schemaVersion === 2) {
    if (!isChineseRecord(r)) return null;
    r = migrateV2(r);
  }
  // Future migrations: `if (r.schemaVersion === 3) { ...upgrade to 4... }`
  if (!isObj(r.courses)) return null;
  const empty = createEmptyData();
  const rawCourses = r.courses as Raw;
  const courses = Object.fromEntries(COURSE_IDS.map((id) => [id, normalizeCourse(rawCourses[id])])) as AppData['courses'];
  const settings = { ...DEFAULT_SETTINGS, ...(isObj(r.settings) ? (r.settings as object) : {}) } as AppData['settings'];
  return {
    ...empty,
    createdAt: typeof r.createdAt === 'string' ? r.createdAt : empty.createdAt,
    updatedAt: typeof r.updatedAt === 'string' ? r.updatedAt : empty.updatedAt,
    settings: { ...settings, voices: isObj(settings.voices) ? settings.voices : {} },
    currentCourse: isCourseId(r.currentCourse) ? r.currentCourse : null,
    courses,
    schemaVersion: SCHEMA_VERSION,
  };
}

/** Schema 1–2: progress fields at the top level (Chinese was the only course). */
function isChineseRecord(r: Raw): boolean {
  return isObj(r.lessons) && isObj(r.words) && isObj(r.activity) && Array.isArray(r.quizzes) && Array.isArray(r.mistakes);
}

function normalizeCourse(v: unknown): CourseProgress {
  const c = isObj(v) ? v : {};
  const empty = emptyCourseProgress();
  return {
    lessons: isObj(c.lessons) ? (c.lessons as CourseProgress['lessons']) : empty.lessons,
    words: isObj(c.words) ? (c.words as CourseProgress['words']) : empty.words,
    activity: isObj(c.activity) ? (c.activity as CourseProgress['activity']) : empty.activity,
    skillStats: isObj(c.skillStats) ? (c.skillStats as CourseProgress['skillStats']) : empty.skillStats,
    quizzes: Array.isArray(c.quizzes) ? (c.quizzes as QuizAttempt[]) : empty.quizzes,
    mistakes: Array.isArray(c.mistakes) ? (c.mistakes as Mistake[]) : empty.mistakes,
  };
}

/**
 * v2 → v3: the existing (Chinese) progress becomes the Chinese course's record, unchanged.
 * Generated-exercise ids get their new names; settings get per-course voices and `showPron`.
 * A learner who already studied continues with Chinese; a fresh record picks a course first.
 */
function migrateV2(r: Raw): Raw {
  const mistakes = (r.mistakes as unknown[]).filter(isObj).map((m) => ({ ...m, id: upgradeExerciseId(String(m.id)) }));
  const zh = normalizeCourse({ ...r, mistakes });
  const old = isObj(r.settings) ? r.settings : {};
  const { voiceURI, showPinyin, ...rest } = old;
  const settings = {
    ...rest,
    voices: typeof voiceURI === 'string' ? { zh: voiceURI } : {},
    showPron: typeof showPinyin === 'boolean' ? showPinyin : DEFAULT_SETTINGS.showPron,
  };
  const empty = createEmptyData();
  return {
    schemaVersion: 3,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
    settings,
    currentCourse: hasStarted(zh) ? 'zh' : null,
    courses: { ...empty.courses, zh },
  };
}

/** Vietnamese test labels used in v1 quiz titles ("Kiểm tra Từ vựng · 10 câu"). */
const V1_TEST_LABELS: Record<string, TestSkill> = {
  'Tổng hợp': 'mixed',
  'Từ vựng': 'vocabulary',
  'Nhận biết phát âm': 'pronunciation',
  'Ngữ pháp': 'grammar',
  'Đọc hiểu': 'reading',
  'Nghe hiểu': 'listening',
};

/**
 * v1 → v2: progress is kept as is. Mistakes drop the stored copy of the exercise (with Vietnamese text)
 * and are rebuilt from their id; quiz titles become ids so history shows in any interface language.
 */
function migrateV1(raw: Raw): Raw {
  const mistakes = (raw.mistakes as unknown[]).filter(isObj).flatMap((m): Mistake[] => {
    if (typeof m.id !== 'string' || !exerciseById(COURSES.zh, upgradeExerciseId(m.id))) return [];
    return [{ id: m.id, at: String(m.at ?? ''), given: typeof m.given === 'string' ? m.given : '', count: Number(m.count) || 1, resolved: !!m.resolved }];
  });
  const quizzes = (raw.quizzes as unknown[]).filter(isObj).map((q) => {
    const { title, ...rest } = q;
    const attempt = rest as unknown as QuizAttempt;
    if (attempt.kind === 'test' && !attempt.testSkill && typeof title === 'string') {
      const label = title.replace(/^Kiểm tra /, '').split(' · ')[0];
      const skill = V1_TEST_LABELS[label];
      if (skill) attempt.testSkill = skill;
    }
    return attempt;
  });
  return { ...raw, mistakes, quizzes, schemaVersion: 2 };
}

export function loadData(storage: Storage | undefined = globalThis.localStorage): AppData {
  if (!storage) return createEmptyData();
  const text = storage.getItem(STORAGE_KEY);
  if (!text) return createEmptyData();
  try {
    const data = migrate(JSON.parse(text));
    if (data) return data;
  } catch {
    /* fall through */
  }
  // Keep the unreadable copy instead of silently discarding it.
  storage.setItem(`${STORAGE_KEY}:corrupt:${Date.now()}`, text);
  return createEmptyData();
}

export function saveData(data: AppData, storage: Storage | undefined = globalThis.localStorage): boolean {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function exportBackup(data: AppData, now: Date = new Date()): string {
  return JSON.stringify({ app: EXPORT_APP, exportedAt: now.toISOString(), data }, null, 2);
}

/** `error` is a message key under `common.backup` in the interface dictionary. */
export type BackupError = 'notJson' | 'notBackup' | 'newerVersion' | 'invalid';
export type ParseResult = { ok: true; data: AppData } | { ok: false; error: BackupError; version?: number };

export function parseBackup(text: string): ParseResult {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, error: 'notJson' };
  }
  if (!isObj(raw) || raw.app !== EXPORT_APP || !isObj(raw.data)) {
    return { ok: false, error: 'notBackup' };
  }
  const v = raw.data.schemaVersion;
  if (typeof v === 'number' && v > SCHEMA_VERSION) {
    return { ok: false, error: 'newerVersion', version: v };
  }
  const data = migrate(raw.data);
  if (!data) return { ok: false, error: 'invalid' };
  return { ok: true, data };
}
