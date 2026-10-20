import type { Assist, QaAttempt, QaProgress, QaTermProgress } from './types';
import { dueQueue, introduceWord, reviewWord } from '../lib/srs';

/**
 * ISTQB & QA progress, stored under its own localStorage key. It is independent of language-learning
 * data (clc:data) and of the interface language (clc:lang): switching either never touches it.
 */
export const QA_KEY = 'clc:qa';
export const QA_SCHEMA = 1;
const EXPORT_APP = 'chinese-learning-companion:qa';
const MAX_REVIEWS = 500;
const MAX_ATTEMPTS = 200;

export function emptyQa(now: Date = new Date()): QaProgress {
  return { schemaVersion: QA_SCHEMA, createdAt: now.toISOString(), updatedAt: now.toISOString(), topics: {}, terms: {}, reviews: [], attempts: [], misses: {}, settings: { assist: 'full' } };
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Validate (and in future upgrade) stored data. Returns null when it is not a QA progress record. */
export function migrateQa(raw: unknown): QaProgress | null {
  if (!isObj(raw) || typeof raw.schemaVersion !== 'number' || raw.schemaVersion > QA_SCHEMA || raw.schemaVersion < 1) return null;
  const e = emptyQa();
  const assist = isObj(raw.settings) && ['full', 'tap', 'none'].includes(raw.settings.assist as string) ? (raw.settings.assist as Assist) : 'full';
  return {
    schemaVersion: QA_SCHEMA,
    createdAt: typeof raw.createdAt === 'string' ? raw.createdAt : e.createdAt,
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : e.updatedAt,
    topics: isObj(raw.topics) ? (raw.topics as QaProgress['topics']) : {},
    terms: isObj(raw.terms) ? (raw.terms as QaProgress['terms']) : {},
    reviews: Array.isArray(raw.reviews) ? (raw.reviews as QaProgress['reviews']) : [],
    attempts: Array.isArray(raw.attempts) ? (raw.attempts as QaAttempt[]) : [],
    misses: isObj(raw.misses) ? (raw.misses as QaProgress['misses']) : {},
    settings: { assist },
  };
}

export function loadQa(storage: Storage | undefined = globalThis.localStorage): QaProgress {
  try {
    const text = storage?.getItem(QA_KEY);
    if (!text) return emptyQa();
    const p = migrateQa(JSON.parse(text));
    if (p) return p;
    storage?.setItem(`${QA_KEY}:corrupt:${Date.now()}`, text);
  } catch {
    /* unreadable: start fresh, the corrupt copy is kept when possible */
  }
  return emptyQa();
}

export function saveQa(p: QaProgress, storage: Storage | undefined = globalThis.localStorage): boolean {
  try {
    storage?.setItem(QA_KEY, JSON.stringify(p));
    return true;
  } catch {
    return false;
  }
}

export function exportQa(p: QaProgress, now: Date = new Date()): string {
  return JSON.stringify({ app: EXPORT_APP, exportedAt: now.toISOString(), data: p }, null, 2);
}

export function parseQaBackup(text: string): { ok: true; data: QaProgress } | { ok: false; error: 'notJson' | 'notBackup' | 'invalid' } {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, error: 'notJson' };
  }
  if (!isObj(raw) || raw.app !== EXPORT_APP) return { ok: false, error: 'notBackup' };
  const data = migrateQa(raw.data);
  return data ? { ok: true, data } : { ok: false, error: 'invalid' };
}

// ---------- updates (pure, copy-on-write) ----------

const touch = (p: QaProgress, now: Date): QaProgress => ({ ...p, updatedAt: now.toISOString() });

export function markSectionRead(p: QaProgress, topicId: string, section: string, now: Date = new Date()): QaProgress {
  const t = p.topics[topicId] ?? { status: 'in_progress' as const, startedAt: now.toISOString(), readSections: [] };
  if (t.readSections.includes(section)) return p;
  return { ...touch(p, now), topics: { ...p.topics, [topicId]: { ...t, readSections: [...t.readSections, section] } } };
}

export function setTopicCompleted(p: QaProgress, topicId: string, completed: boolean, now: Date = new Date()): QaProgress {
  const t = p.topics[topicId] ?? { status: 'in_progress' as const, startedAt: now.toISOString(), readSections: [] };
  return { ...touch(p, now), topics: { ...p.topics, [topicId]: { ...t, status: completed ? 'completed' : 'in_progress', completedAt: completed ? now.toISOString() : undefined } } };
}

/** Learner's own mark in Learn mode. Marking "review" also puts the term in the review queue. */
export function markTerm(p: QaProgress, termId: string, mark: 'understood' | 'review' | undefined, now: Date = new Date()): QaProgress {
  // A term first met in Learn mode joins the review schedule (first review tomorrow).
  let tp: QaTermProgress = { ...(p.terms[termId] ?? introduceWord(undefined, now)), mark };
  if (mark === 'review') tp = { ...tp, due: now.toISOString(), difficult: true };
  if (mark === 'understood') tp = { ...tp, difficult: false };
  return { ...touch(p, now), terms: { ...p.terms, [termId]: tp } };
}

/**
 * Record an answer. Item ids: "q:<questionId>" for practice questions, "t:<termId>" for terminology items.
 * Terms get a spaced-repetition review; wrong answers are added to the misses list, right ones resolve it.
 */
export function recordQa(p: QaProgress, itemId: string, correct: boolean, termIds: string[] = [], now: Date = new Date()): QaProgress {
  const next = touch(p, now);
  if (termIds.length) {
    const terms = { ...p.terms };
    for (const id of new Set(termIds)) terms[id] = { ...reviewWord(terms[id], correct, now), mark: terms[id]?.mark };
    next.terms = terms;
    next.reviews = [...termIds.map((id) => ({ id, at: now.toISOString(), correct })), ...p.reviews].slice(0, MAX_REVIEWS);
  }
  const m = p.misses[itemId];
  if (!correct) next.misses = { ...p.misses, [itemId]: { count: (m?.count ?? 0) + 1, lastAt: now.toISOString(), resolved: false } };
  else if (m && !m.resolved) next.misses = { ...p.misses, [itemId]: { ...m, resolved: true } };
  return next;
}

export function addQaAttempt(p: QaProgress, attempt: QaAttempt): QaProgress {
  return { ...touch(p, new Date(attempt.at)), attempts: [attempt, ...p.attempts].slice(0, MAX_ATTEMPTS) };
}

export function setAssist(p: QaProgress, assist: Assist, now: Date = new Date()): QaProgress {
  return { ...touch(p, now), settings: { ...p.settings, assist } };
}

/** Terms due for review now, most urgent first. */
export function dueTerms(p: QaProgress, now: Date = new Date()): string[] {
  return dueQueue(p.terms, now);
}
