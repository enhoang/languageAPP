/**
 * Full local backup and restore: every piece of learner data in one versioned, checksummed JSON document,
 * as a downloadable file or a copyable code. Everything runs in the browser — nothing is sent anywhere.
 *
 * Included: language-course progress and settings (clc:data), ISTQB progress (clc:qa), conversation sessions,
 * summaries, saved phrases and their settings (clc:conv, WITHOUT the backend access code), interface preferences
 * (clc:lang, clc:support-lang). Not included: curriculum/ISTQB/demo content (part of the app), service-worker caches,
 * install-reminder state, corrupt-data copies, any secret.
 *
 * Optional encryption uses the browser's Web Crypto API (PBKDF2-SHA-256 → AES-256-GCM) — no custom cryptography.
 */
import type { AppData, CourseId, CourseProgress, GlossLang, Lang, LessonProgress, WordProgress } from '../types';
import type { QaProgress } from '../qa/types';
import type { ConvData } from '../conversation/types';
import { migrate, STORAGE_KEY } from '../lib/storage';
import { SCHEMA_VERSION, MAX_MISTAKES, MAX_QUIZZES } from '../lib/appData';
import { migrateQa, QA_KEY, QA_SCHEMA } from '../qa/store';
import { migrateConv, CONV_KEY, CONV_SCHEMA } from '../conversation/store';
import { LANG_KEY, SUPPORT_LANG_KEY, isLang, isGlossLang } from '../i18n/langs';

export const BACKUP_APP = 'language-companion';
export const BACKUP_FORMAT = 1;
/** formats this version can read; older formats get a migration step here when the format changes */
export const SUPPORTED_FORMATS = [1];
export const CODE_PREFIX = 'LCB1';
/** above this many characters a code is unreliable to copy/paste (mobile clipboards, chat apps) */
export const CODE_COPY_LIMIT = 150_000;
export const PBKDF2_ITERATIONS = 600_000;

export type SectionId = 'courses' | 'qa' | 'conversation' | 'preferences';
export const SECTION_IDS: SectionId[] = ['courses', 'qa', 'conversation', 'preferences'];

export interface BackupSections {
  courses?: AppData;
  qa?: QaProgress;
  conversation?: ConvData;
  preferences?: { lang: Lang; supportLang: GlossLang };
}

export interface BackupDoc {
  app: typeof BACKUP_APP;
  kind: 'backup';
  formatVersion: number;
  createdAt: string;
  /** schema version of each data store at backup time */
  schemas: { courses: number; qa: number; conversation: number };
  sections: BackupSections;
  meta: { sections: SectionId[]; note: string };
  checksum: { algorithm: 'SHA-256'; value: string };
}

export interface EncryptedDoc {
  app: typeof BACKUP_APP;
  kind: 'backup-encrypted';
  formatVersion: number;
  createdAt: string;
  kdf: { name: 'PBKDF2'; hash: 'SHA-256'; iterations: number; salt: string };
  cipher: { name: 'AES-GCM'; iv: string };
  data: string;
}

export type BackupError =
  | 'empty' | 'notBackup' | 'corruptCode' | 'notJson' | 'newerFormat' | 'unsupportedFormat'
  | 'checksum' | 'invalidSection' | 'needPassword' | 'wrongPassword' | 'noCrypto' | 'tooNew';

export class BackupFailure extends Error {
  constructor(readonly code: BackupError, readonly detail?: string) {
    super(code);
  }
}

// ---------- helpers ----------

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** JSON with object keys sorted at every level, so the checksum does not depend on key order. */
export function canonicalJson(v: unknown): string {
  if (Array.isArray(v)) return `[${v.map(canonicalJson).join(',')}]`;
  if (isObj(v)) return `{${Object.keys(v).filter((k) => v[k] !== undefined).sort().map((k) => `${JSON.stringify(k)}:${canonicalJson(v[k])}`).join(',')}}`;
  return JSON.stringify(v);
}

function subtle(): SubtleCrypto {
  const s = globalThis.crypto?.subtle;
  if (!s) throw new BackupFailure('noCrypto');
  return s;
}

const enc = new TextEncoder();
const dec = new TextDecoder();

export async function sha256Hex(text: string): Promise<string> {
  const h = await subtle().digest('SHA-256', enc.encode(text));
  return [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function toB64(bytes: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}
function fromB64(s: string): Uint8Array {
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
const toB64Url = (b: Uint8Array) => toB64(b).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromB64Url = (s: string) => fromB64(s.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (s.length % 4)) % 4));

async function streamThrough(bytes: Uint8Array, stream: CompressionStream | DecompressionStream): Promise<Uint8Array> {
  const out = new Response(new Blob([bytes as BlobPart]).stream().pipeThrough(stream));
  return new Uint8Array(await out.arrayBuffer());
}

const hasCompression = () => typeof CompressionStream !== 'undefined' && typeof DecompressionStream !== 'undefined';

// ---------- reading the current data ----------

const read = (storage: Storage, key: string): unknown => {
  const t = storage.getItem(key);
  if (!t) return null;
  try {
    return JSON.parse(t);
  } catch {
    return null;
  }
};

/** Current data of each section (validated), or undefined when there is nothing stored. */
export function readSections(storage: Storage = localStorage): BackupSections {
  const courses = read(storage, STORAGE_KEY);
  const qa = read(storage, QA_KEY);
  const conv = read(storage, CONV_KEY);
  const lang = storage.getItem(LANG_KEY);
  const support = storage.getItem(SUPPORT_LANG_KEY);
  const c = migrateConv(conv);
  return {
    courses: migrate(courses) ?? undefined,
    qa: migrateQa(qa) ?? undefined,
    // the access code is a secret of the backend owner: never part of a backup
    conversation: c ? { ...c, settings: { ...c.settings, accessCode: undefined } } : undefined,
    preferences: lang || support ? { lang: isLang(lang) ? lang : 'vi', supportLang: isGlossLang(support) ? support : 'vi' } : undefined,
  };
}

// ---------- creating ----------

export async function createBackup(sections: BackupSections, now: Date = new Date()): Promise<BackupDoc> {
  const present = SECTION_IDS.filter((id) => sections[id] !== undefined);
  const body = {
    app: BACKUP_APP as typeof BACKUP_APP,
    kind: 'backup' as const,
    formatVersion: BACKUP_FORMAT,
    createdAt: now.toISOString(),
    schemas: { courses: SCHEMA_VERSION, qa: QA_SCHEMA, conversation: CONV_SCHEMA },
    sections: Object.fromEntries(present.map((id) => [id, sections[id]])) as BackupSections,
    meta: { sections: present, note: 'Learner data only; lesson and ISTQB content is part of the app.' },
  };
  return { ...body, checksum: { algorithm: 'SHA-256', value: await sha256Hex(canonicalJson(body)) } };
}

export async function encryptBackup(doc: BackupDoc, password: string): Promise<EncryptedDoc> {
  const s = subtle();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt, PBKDF2_ITERATIONS);
  const ct = await s.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(JSON.stringify(doc)));
  return {
    app: BACKUP_APP,
    kind: 'backup-encrypted',
    formatVersion: BACKUP_FORMAT,
    createdAt: doc.createdAt,
    kdf: { name: 'PBKDF2', hash: 'SHA-256', iterations: PBKDF2_ITERATIONS, salt: toB64(salt) },
    cipher: { name: 'AES-GCM', iv: toB64(iv) },
    data: toB64(new Uint8Array(ct)),
  };
}

async function deriveKey(password: string, salt: Uint8Array, iterations: number): Promise<CryptoKey> {
  const s = subtle();
  const base = await s.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return s.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt: salt as BufferSource, iterations }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}

/** File contents (pretty JSON). */
export const toFileText = (doc: BackupDoc | EncryptedDoc) => JSON.stringify(doc, null, 2);

/** Copyable code: "LCB1.g.<base64url(gzip(json))>" (or ".j." without compression when the browser lacks CompressionStream). */
export async function toCode(doc: BackupDoc | EncryptedDoc): Promise<string> {
  const bytes = enc.encode(JSON.stringify(doc));
  if (hasCompression()) return `${CODE_PREFIX}.g.${toB64Url(await streamThrough(bytes, new CompressionStream('gzip')))}`;
  return `${CODE_PREFIX}.j.${toB64Url(bytes)}`;
}

export const backupFileName = (now: Date = new Date()) => `language-companion-backup-${now.toISOString().slice(0, 10)}.json`;

// ---------- reading a backup ----------

export type Parsed =
  | { kind: 'backup'; doc: BackupDoc; legacy: false }
  | { kind: 'legacy'; doc: BackupDoc; legacy: true; source: 'courses' | 'qa' | 'conversation' }
  | { kind: 'encrypted'; enc: EncryptedDoc };

/** Turn pasted text (a code or file JSON) into a JSON value. */
async function decodeInput(text: string): Promise<unknown> {
  const t = text.trim();
  if (!t) throw new BackupFailure('empty');
  if (t.startsWith('{')) {
    try {
      return JSON.parse(t);
    } catch {
      throw new BackupFailure('notJson');
    }
  }
  const m = /^LCB(\d+)\.([gj])\.([A-Za-z0-9_-]+)$/.exec(t.replace(/\s+/g, ''));
  if (!m) throw new BackupFailure('notBackup');
  if (m[1] !== '1') throw new BackupFailure('newerFormat', m[1]);
  try {
    let bytes = fromB64Url(m[3]);
    if (m[2] === 'g') {
      if (!hasCompression()) throw new BackupFailure('noCrypto');
      bytes = await streamThrough(bytes, new DecompressionStream('gzip'));
    }
    return JSON.parse(dec.decode(bytes));
  } catch (e) {
    if (e instanceof BackupFailure) throw e;
    throw new BackupFailure('corruptCode');
  }
}

/** Validate a section with the same rules the app uses when loading its own data. */
function validateSections(raw: unknown): BackupSections {
  if (!isObj(raw)) throw new BackupFailure('invalidSection', 'sections');
  const out: BackupSections = {};
  if (raw.courses !== undefined) {
    const v = isObj(raw.courses) ? raw.courses.schemaVersion : undefined;
    if (typeof v === 'number' && v > SCHEMA_VERSION) throw new BackupFailure('tooNew', 'courses');
    out.courses = migrate(raw.courses) ?? fail('courses');
  }
  if (raw.qa !== undefined) {
    const v = isObj(raw.qa) ? raw.qa.schemaVersion : undefined;
    if (typeof v === 'number' && v > QA_SCHEMA) throw new BackupFailure('tooNew', 'qa');
    out.qa = migrateQa(raw.qa) ?? fail('qa');
  }
  if (raw.conversation !== undefined) {
    const v = isObj(raw.conversation) ? raw.conversation.schemaVersion : undefined;
    if (typeof v === 'number' && v > CONV_SCHEMA) throw new BackupFailure('tooNew', 'conversation');
    const c = migrateConv(raw.conversation) ?? fail('conversation');
    out.conversation = { ...c, settings: { ...c.settings, accessCode: undefined } };
  }
  if (raw.preferences !== undefined) {
    const p = raw.preferences;
    if (!isObj(p) || !isLang(p.lang) || !isGlossLang(p.supportLang)) fail('preferences');
    out.preferences = { lang: (p as { lang: Lang }).lang, supportLang: (p as { supportLang: GlossLang }).supportLang };
  }
  return out;
}
function fail(section: string): never {
  throw new BackupFailure('invalidSection', section);
}

/**
 * Parse and fully validate a backup (code or file text). Throws BackupFailure; never touches storage.
 * Also reads the older single-module exports (course backup, ISTQB backup, conversation backup).
 */
export async function parseBackupInput(text: string): Promise<Parsed> {
  const raw = await decodeInput(text);
  if (!isObj(raw)) throw new BackupFailure('notBackup');

  // older exports of a single module
  const legacy = { 'chinese-learning-companion': 'courses', 'chinese-learning-companion:qa': 'qa', 'chinese-learning-companion:conversation': 'conversation' } as const;
  if (typeof raw.app === 'string' && raw.app in legacy && isObj(raw.data)) {
    const source = legacy[raw.app as keyof typeof legacy];
    const sections = validateSections({ [source]: raw.data });
    const createdAt = typeof raw.exportedAt === 'string' ? raw.exportedAt : new Date(0).toISOString();
    const doc: BackupDoc = {
      app: BACKUP_APP, kind: 'backup', formatVersion: 0, createdAt,
      schemas: { courses: SCHEMA_VERSION, qa: QA_SCHEMA, conversation: CONV_SCHEMA },
      sections, meta: { sections: [source], note: 'legacy' }, checksum: { algorithm: 'SHA-256', value: '' },
    };
    return { kind: 'legacy', doc, legacy: true, source };
  }

  if (raw.app !== BACKUP_APP) throw new BackupFailure('notBackup');
  const fv = raw.formatVersion;
  if (typeof fv !== 'number') throw new BackupFailure('notBackup');
  if (fv > BACKUP_FORMAT) throw new BackupFailure('newerFormat', String(fv));
  if (!SUPPORTED_FORMATS.includes(fv)) throw new BackupFailure('unsupportedFormat', String(fv));

  if (raw.kind === 'backup-encrypted') {
    const e = raw as unknown as EncryptedDoc;
    if (!isObj(e.kdf) || !isObj(e.cipher) || typeof e.data !== 'string' || e.kdf.name !== 'PBKDF2' || e.cipher.name !== 'AES-GCM') throw new BackupFailure('notBackup');
    return { kind: 'encrypted', enc: e };
  }
  if (raw.kind !== 'backup') throw new BackupFailure('notBackup');
  return { kind: 'backup', doc: await verifyDoc(raw), legacy: false };
}

async function verifyDoc(raw: Record<string, unknown>): Promise<BackupDoc> {
  const cs = raw.checksum;
  if (!isObj(cs) || cs.algorithm !== 'SHA-256' || typeof cs.value !== 'string') throw new BackupFailure('checksum');
  const { checksum: _c, ...body } = raw;
  if ((await sha256Hex(canonicalJson(body))) !== cs.value) throw new BackupFailure('checksum');
  if (typeof raw.createdAt !== 'string') throw new BackupFailure('notBackup');
  const sections = validateSections(raw.sections);
  return { ...(raw as unknown as BackupDoc), sections };
}

export async function decryptBackup(e: EncryptedDoc, password: string): Promise<BackupDoc> {
  if (!password) throw new BackupFailure('needPassword');
  let plain: ArrayBuffer;
  try {
    const key = await deriveKey(password, fromB64(e.kdf.salt), e.kdf.iterations);
    plain = await subtle().decrypt({ name: 'AES-GCM', iv: fromB64(e.cipher.iv) as BufferSource }, key, fromB64(e.data) as BufferSource);
  } catch (err) {
    if (err instanceof BackupFailure) throw err;
    throw new BackupFailure('wrongPassword');
  }
  let raw: unknown;
  try {
    raw = JSON.parse(dec.decode(plain));
  } catch {
    throw new BackupFailure('corruptCode');
  }
  if (!isObj(raw) || raw.app !== BACKUP_APP || raw.kind !== 'backup') throw new BackupFailure('notBackup');
  return verifyDoc(raw);
}

// ---------- preview ----------

export interface Summary {
  createdAt: string;
  formatVersion: number;
  sections: SectionId[];
  courses?: { course: CourseId; lessonsCompleted: number; words: number; quizzes: number; days: number }[];
  qa?: { topicsCompleted: number; terms: number; attempts: number };
  conversation?: { sessions: number; finished: number; saved: number };
  preferences?: { lang: Lang; supportLang: GlossLang };
}

export function summarize(doc: BackupDoc): Summary {
  const s = doc.sections;
  return {
    createdAt: doc.createdAt,
    formatVersion: doc.formatVersion,
    sections: SECTION_IDS.filter((id) => s[id] !== undefined),
    courses: s.courses ? (Object.entries(s.courses.courses) as [CourseId, CourseProgress][]).map(([course, c]) => ({
      course,
      lessonsCompleted: Object.values(c.lessons).filter((l) => l.status === 'completed').length,
      words: Object.keys(c.words).length,
      quizzes: c.quizzes.length,
      days: Object.keys(c.activity).length,
    })) : undefined,
    qa: s.qa ? { topicsCompleted: Object.values(s.qa.topics).filter((t) => t.status === 'completed').length, terms: Object.keys(s.qa.terms).length, attempts: s.qa.attempts.length } : undefined,
    conversation: s.conversation ? { sessions: s.conversation.sessions.length, finished: s.conversation.sessions.filter((x) => x.status === 'finished').length, saved: Object.keys(s.conversation.saved).length } : undefined,
    preferences: s.preferences,
  };
}

// ---------- merge rules ----------

const later = (a?: string | null, b?: string | null) => (b ?? '') > (a ?? '');
/** the more recently reviewed record wins; ties keep the local one */
const newerWord = <T extends Pick<WordProgress, 'lastReviewed'>>(local: T, incoming: T) => (later(local.lastReviewed, incoming.lastReviewed) ? incoming : local);

function mergeRecord<T>(local: Record<string, T>, incoming: Record<string, T>, pick: (l: T, i: T) => T): Record<string, T> {
  const out = { ...local };
  for (const [k, v] of Object.entries(incoming)) out[k] = k in out ? pick(out[k], v) : v;
  return out;
}

function unionById<T extends { id: string }>(local: T[], incoming: T[], pick: (l: T, i: T) => T, sortKey: (x: T) => string, cap: number): T[] {
  const m = new Map(local.map((x) => [x.id, x]));
  for (const x of incoming) m.set(x.id, m.has(x.id) ? pick(m.get(x.id)!, x) : x);
  return [...m.values()].sort((a, b) => (sortKey(b) > sortKey(a) ? 1 : sortKey(b) < sortKey(a) ? -1 : 0)).slice(0, cap);
}

const minIso = (a?: string, b?: string) => (!a ? b : !b ? a : a < b ? a : b);

function mergeLesson(l: LessonProgress, i: LessonProgress): LessonProgress {
  const completed = l.status === 'completed' || i.status === 'completed';
  const best = Math.max(l.bestScore ?? -1, i.bestScore ?? -1);
  return {
    status: completed ? 'completed' : 'in_progress',
    step: Math.max(l.step, i.step),
    startedAt: minIso(l.startedAt, i.startedAt) ?? l.startedAt,
    completedAt: completed ? minIso(l.status === 'completed' ? l.completedAt : undefined, i.status === 'completed' ? i.completedAt : undefined) : undefined,
    bestScore: best >= 0 ? best : undefined,
    attempts: Math.max(l.attempts, i.attempts),
  };
}

function mergeCourse(l: CourseProgress, i: CourseProgress): CourseProgress {
  return {
    lessons: mergeRecord(l.lessons, i.lessons, mergeLesson),
    words: mergeRecord(l.words, i.words, newerWord),
    // the same day recorded on two devices: keep the larger numbers rather than adding (avoids double counting the same session)
    activity: mergeRecord(l.activity, i.activity, (a, b) => ({ seconds: Math.max(a.seconds, b.seconds), answers: Math.max(a.answers, b.answers), correct: Math.max(a.correct, b.correct), lessonsCompleted: Math.max(a.lessonsCompleted, b.lessonsCompleted) })),
    skillStats: mergeRecord(l.skillStats as Record<string, { correct: number; total: number }>, i.skillStats as Record<string, { correct: number; total: number }>, (a, b) => (b.total > a.total ? b : a)),
    quizzes: unionById(l.quizzes, i.quizzes, (a) => a, (x) => x.at, MAX_QUIZZES),
    mistakes: unionById(l.mistakes, i.mistakes, (a, b) => (later(a.at, b.at) ? b : a), (x) => x.at, MAX_MISTAKES),
  };
}

export function mergeCourses(local: AppData, incoming: AppData, now: Date = new Date()): AppData {
  const courses = { ...local.courses };
  for (const id of Object.keys(incoming.courses) as CourseId[]) courses[id] = courses[id] ? mergeCourse(courses[id], incoming.courses[id]) : incoming.courses[id];
  return {
    ...local, // local settings and current course are kept
    currentCourse: local.currentCourse ?? incoming.currentCourse,
    createdAt: minIso(local.createdAt, incoming.createdAt) ?? local.createdAt,
    updatedAt: now.toISOString(),
    courses,
  };
}

const reviewKey = (r: { id: string; at: string; correct: boolean }) => `${r.id}|${r.at}|${r.correct}`;
function mergeReviews<T extends { id: string; at: string; correct: boolean }>(a: T[], b: T[], cap: number): T[] {
  const m = new Map(a.map((r) => [reviewKey(r), r]));
  for (const r of b) if (!m.has(reviewKey(r))) m.set(reviewKey(r), r);
  return [...m.values()].sort((x, y) => (y.at > x.at ? 1 : y.at < x.at ? -1 : 0)).slice(0, cap);
}

export function mergeQa(local: QaProgress, incoming: QaProgress, now: Date = new Date()): QaProgress {
  return {
    ...local, // local settings kept
    createdAt: minIso(local.createdAt, incoming.createdAt) ?? local.createdAt,
    updatedAt: now.toISOString(),
    topics: mergeRecord(local.topics, incoming.topics, (a, b) => {
      const completed = a.status === 'completed' || b.status === 'completed';
      return {
        status: completed ? 'completed' : 'in_progress',
        startedAt: minIso(a.startedAt, b.startedAt) ?? a.startedAt,
        completedAt: completed ? minIso(a.status === 'completed' ? a.completedAt : undefined, b.status === 'completed' ? b.completedAt : undefined) : undefined,
        readSections: [...new Set([...a.readSections, ...b.readSections])],
      };
    }),
    terms: mergeRecord(local.terms, incoming.terms, newerWord),
    reviews: mergeReviews(local.reviews, incoming.reviews, 500),
    attempts: unionById(local.attempts, incoming.attempts, (a) => a, (x) => x.at, 200),
    misses: mergeRecord(local.misses, incoming.misses, (a, b) => (later(a.lastAt, b.lastAt) ? b : a)),
  };
}

export function mergeConv(local: ConvData, incoming: ConvData): ConvData {
  return {
    ...local, // local settings (backend URL, access code, display toggles) kept
    sessions: unionById(local.sessions, incoming.sessions, (a, b) => (later(a.updatedAt, b.updatedAt) ? b : a), (x) => x.updatedAt, 60),
    saved: mergeRecord(local.saved, incoming.saved, (a, b) => (later(a.progress.lastReviewed, b.progress.lastReviewed) ? b : a)),
    reviews: mergeReviews(local.reviews, incoming.reviews, 500),
  };
}

// ---------- restoring ----------

export type RestoreMode = 'replace' | 'merge';

/** The storage writes a restore would make (key → new value). Pure: computes everything before anything is written. */
export function planRestore(storage: Storage, doc: BackupDoc, mode: RestoreMode, sections: SectionId[], now: Date = new Date()): Record<string, string> {
  const cur = readSections(storage);
  const s = doc.sections;
  const writes: Record<string, string> = {};
  if (sections.includes('courses') && s.courses) {
    const next = mode === 'merge' && cur.courses ? mergeCourses(cur.courses, s.courses, now) : s.courses;
    writes[STORAGE_KEY] = JSON.stringify(migrate(next) ?? fail('courses'));
  }
  if (sections.includes('qa') && s.qa) {
    const next = mode === 'merge' && cur.qa ? mergeQa(cur.qa, s.qa, now) : s.qa;
    writes[QA_KEY] = JSON.stringify(migrateQa(next) ?? fail('qa'));
  }
  if (sections.includes('conversation') && s.conversation) {
    // keep this browser's backend access code (backups never contain it)
    const localCode = migrateConv(read(storage, CONV_KEY))?.settings.accessCode;
    const base = mode === 'merge' && cur.conversation ? mergeConv(cur.conversation, s.conversation) : s.conversation;
    const next = { ...base, settings: { ...base.settings, accessCode: localCode } };
    writes[CONV_KEY] = JSON.stringify(migrateConv(next) ?? fail('conversation'));
  }
  if (sections.includes('preferences') && s.preferences && mode === 'replace') {
    writes[LANG_KEY] = s.preferences.lang;
    writes[SUPPORT_LANG_KEY] = s.preferences.supportLang;
  }
  return writes;
}

/**
 * Write all planned values, or none: on any storage error (e.g. quota) every key is put back as it was.
 * Returns the keys written.
 */
export function applyWrites(storage: Storage, writes: Record<string, string>): string[] {
  const keys = Object.keys(writes);
  const before = new Map(keys.map((k) => [k, storage.getItem(k)]));
  const done: string[] = [];
  try {
    for (const k of keys) {
      storage.setItem(k, writes[k]);
      done.push(k);
    }
    return keys;
  } catch (e) {
    for (const k of done) {
      const v = before.get(k);
      try {
        if (v === null || v === undefined) storage.removeItem(k);
        else storage.setItem(k, v);
      } catch {
        /* best effort; the original value is still in `before` */
      }
    }
    throw e;
  }
}

export function restoreBackup(storage: Storage, doc: BackupDoc, mode: RestoreMode, sections: SectionId[], now: Date = new Date()): string[] {
  return applyWrites(storage, planRestore(storage, doc, mode, sections, now));
}

/** Approximate size in bytes of a string as UTF-8. */
export const byteSize = (s: string) => enc.encode(s).length;
