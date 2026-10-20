import type { ConvData, ConvMessage, ConvSession, ConvSettings, ConvSetup, ProviderKind, SavedPhrase, ScenarioId, TurnResult } from './types';
import { SCENARIOS } from './types';
import { dueQueue, introduceWord, reviewWord } from '../lib/srs';

/**
 * Conversation-practice data under its own localStorage key. Independent of the language courses (clc:data),
 * the ISTQB module (clc:qa) and the interface language: none of them is ever touched from here.
 */
export const CONV_KEY = 'clc:conv';
export const CONV_SCHEMA = 1;
const EXPORT_APP = 'chinese-learning-companion:conversation';
const MAX_SESSIONS = 60;
const MAX_REVIEWS = 500;

export const DEFAULT_SETTINGS: ConvSettings = { showTranslation: true, showPron: true, showDetails: true, feedback: true };

export function emptyConv(): ConvData {
  return { schemaVersion: CONV_SCHEMA, sessions: [], saved: {}, reviews: [], settings: { ...DEFAULT_SETTINGS } };
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Validate stored data. Returns null when it is not conversation data. */
export function migrateConv(raw: unknown): ConvData | null {
  if (!isObj(raw) || typeof raw.schemaVersion !== 'number' || raw.schemaVersion < 1 || raw.schemaVersion > CONV_SCHEMA) return null;
  const s = isObj(raw.settings) ? raw.settings : {};
  return {
    schemaVersion: CONV_SCHEMA,
    sessions: Array.isArray(raw.sessions) ? (raw.sessions as ConvSession[]).filter((x) => isObj(x) && typeof x.id === 'string' && Array.isArray(x.messages)) : [],
    saved: isObj(raw.saved) ? (raw.saved as Record<string, SavedPhrase>) : {},
    reviews: Array.isArray(raw.reviews) ? (raw.reviews as ConvData['reviews']) : [],
    settings: {
      showTranslation: s.showTranslation !== false,
      showPron: s.showPron !== false,
      showDetails: s.showDetails !== false,
      feedback: s.feedback !== false,
      apiUrl: typeof s.apiUrl === 'string' && s.apiUrl ? s.apiUrl : undefined,
      accessCode: typeof s.accessCode === 'string' && s.accessCode ? s.accessCode : undefined,
    },
  };
}

export function loadConv(storage: Storage | undefined = globalThis.localStorage): ConvData {
  try {
    const text = storage?.getItem(CONV_KEY);
    if (!text) return emptyConv();
    const d = migrateConv(JSON.parse(text));
    if (d) return d;
    storage?.setItem(`${CONV_KEY}:corrupt:${Date.now()}`, text);
  } catch {
    /* unreadable: start fresh; the corrupt copy is kept when possible */
  }
  return emptyConv();
}

export function saveConv(d: ConvData, storage: Storage | undefined = globalThis.localStorage): boolean {
  try {
    storage?.setItem(CONV_KEY, JSON.stringify(d));
    return true;
  } catch {
    return false;
  }
}

/** Backup without the access code (a secret of the backend owner). */
export function exportConv(d: ConvData, now: Date = new Date()): string {
  const { accessCode: _omit, ...settings } = d.settings;
  return JSON.stringify({ app: EXPORT_APP, exportedAt: now.toISOString(), data: { ...d, settings } }, null, 2);
}

export function parseConvBackup(text: string): { ok: true; data: ConvData } | { ok: false; error: 'notJson' | 'notBackup' | 'invalid' } {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, error: 'notJson' };
  }
  if (!isObj(raw) || raw.app !== EXPORT_APP) return { ok: false, error: 'notBackup' };
  const data = migrateConv(raw.data);
  return data ? { ok: true, data } : { ok: false, error: 'invalid' };
}

// ---------- sessions (pure, copy-on-write) ----------

export const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export function createSession(setup: ConvSetup, provider: ProviderKind, now: Date = new Date(), demoScriptId?: string): ConvSession {
  const at = now.toISOString();
  return { id: newId(), setup, provider, status: 'active', startedAt: at, updatedAt: at, messages: [], replies: [], demo: demoScriptId ? { scriptId: demoScriptId, turn: 0 } : undefined };
}

const putSession = (d: ConvData, s: ConvSession): ConvData => {
  const others = d.sessions.filter((x) => x.id !== s.id);
  // keep unfinished sessions, then the most recent ones
  return { ...d, sessions: [s, ...others].slice(0, MAX_SESSIONS) };
};

export const upsertSession = putSession;

export function learnerMessage(text: string, now: Date = new Date()): ConvMessage {
  return { id: newId(), role: 'learner', text, at: now.toISOString() };
}

/** Apply a provider turn: feedback / model answers go on the learner's last message, then the partner line. */
export function applyTurn(s: ConvSession, turn: TurnResult, now: Date = new Date()): ConvSession {
  const at = now.toISOString();
  const messages = [...s.messages];
  const last = messages.at(-1);
  if (last?.role === 'learner' && (turn.feedback || turn.modelAnswers)) messages[messages.length - 1] = { ...last, feedback: turn.feedback, modelAnswers: turn.modelAnswers };
  messages.push({ id: newId(), role: 'partner', text: turn.partner.text, at, translation: turn.partner.translation, pron: turn.partner.pron });
  return {
    ...s,
    intro: turn.intro ?? s.intro,
    messages,
    replies: turn.replies,
    updatedAt: at,
    status: 'active',
    demo: s.demo ? { ...s.demo, turn: s.demo.turn + 1 } : undefined,
  };
}

export function setStatus(s: ConvSession, status: ConvSession['status'], now: Date = new Date()): ConvSession {
  const at = now.toISOString();
  return { ...s, status, updatedAt: at, endedAt: status === 'finished' ? at : s.endedAt };
}

// ---------- saved phrases ----------

export const phraseId = (lang: string, text: string) => `${lang}:${text.normalize('NFC').trim().toLowerCase()}`;

export function savePhrase(d: ConvData, p: Omit<SavedPhrase, 'id' | 'savedAt' | 'progress' | 'difficult'> & { difficult?: boolean }, now: Date = new Date()): ConvData {
  const id = phraseId(p.lang, p.text);
  const prev = d.saved[id];
  const phrase: SavedPhrase = prev
    ? { ...prev, ...p, difficult: p.difficult ?? prev.difficult }
    : { ...p, id, difficult: p.difficult ?? false, savedAt: now.toISOString(), progress: introduceWord(undefined, now) };
  return { ...d, saved: { ...d.saved, [id]: phrase } };
}

export function removePhrase(d: ConvData, id: string): ConvData {
  const { [id]: _gone, ...rest } = d.saved;
  return { ...d, saved: rest };
}

/** Mark as difficult: it also becomes due now. */
export function setDifficult(d: ConvData, id: string, difficult: boolean, now: Date = new Date()): ConvData {
  const p = d.saved[id];
  if (!p) return d;
  const progress = difficult ? { ...p.progress, due: now.toISOString(), difficult: true } : { ...p.progress, difficult: false };
  return { ...d, saved: { ...d.saved, [id]: { ...p, difficult, progress } } };
}

export function reviewPhrase(d: ConvData, id: string, correct: boolean, now: Date = new Date()): ConvData {
  const p = d.saved[id];
  if (!p) return d;
  return {
    ...d,
    saved: { ...d.saved, [id]: { ...p, progress: { ...reviewWord(p.progress, correct, now), difficult: p.difficult } } },
    reviews: [{ id, at: now.toISOString(), correct }, ...d.reviews].slice(0, MAX_REVIEWS),
  };
}

export function dueSaved(d: ConvData, lang?: string, now: Date = new Date()): string[] {
  const pool = Object.fromEntries(Object.entries(d.saved).filter(([, p]) => !lang || p.lang === lang).map(([id, p]) => [id, p.progress]));
  return dueQueue(pool, now);
}

// ---------- stats ----------

export function convStats(d: ConvData) {
  const finished = d.sessions.filter((s) => s.status === 'finished');
  const topics: Partial<Record<ScenarioId, number>> = {};
  for (const s of d.sessions) if (s.messages.some((m) => m.role === 'learner')) topics[s.setup.scenario] = (topics[s.setup.scenario] ?? 0) + 1;
  const learnerMessages = d.sessions.reduce((n, s) => n + s.messages.filter((m) => m.role === 'learner').length, 0);
  return {
    completed: finished.length,
    learnerMessages,
    topics: SCENARIOS.filter((id) => topics[id]).map((id) => ({ id, count: topics[id]! })).sort((a, b) => b.count - a.count),
    byLang: { zh: 0, en: 0, ko: 0, ...Object.fromEntries(['zh', 'en', 'ko'].map((l) => [l, finished.filter((s) => s.setup.lang === l).length])) } as Record<'zh' | 'en' | 'ko', number>,
  };
}
