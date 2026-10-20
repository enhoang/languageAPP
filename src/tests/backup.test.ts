import { describe, expect, it } from 'vitest';
import * as B from '../backup/backup';
import { createEmptyData, finishLessonQuiz, toggleWordFlag } from '../lib/appData';
import { exportBackup, STORAGE_KEY } from '../lib/storage';
import { COURSES } from '../courses';
import { emptyQa, markSectionRead, recordQa, addQaAttempt, exportQa, QA_KEY } from '../qa/store';
import { emptyConv, savePhrase, createSession, upsertSession, learnerMessage, exportConv, CONV_KEY, DEFAULT_SETTINGS } from '../conversation/store';
import { reviewWord } from '../lib/srs';
import type { AppData } from '../types';

class MemStorage {
  m = new Map<string, string>();
  failOn?: (key: string, n: number) => boolean;
  writes = 0;
  get length() { return this.m.size; }
  clear() { this.m.clear(); }
  getItem(k: string) { return this.m.get(k) ?? null; }
  key(i: number) { return [...this.m.keys()][i] ?? null; }
  removeItem(k: string) { this.m.delete(k); }
  setItem(k: string, v: string) {
    this.writes += 1;
    if (this.failOn?.(k, this.writes)) throw new DOMException('quota', 'QuotaExceededError');
    this.m.set(k, v);
  }
}
const asStorage = (m: MemStorage) => m as unknown as Storage;

const T0 = new Date('2026-10-01T08:00:00Z');
const T1 = new Date('2026-10-10T08:00:00Z');
const T2 = new Date('2026-10-20T08:00:00Z');
const quiz = (n: number) => Array.from({ length: 10 }, (_, i) => ({ skill: 'vocabulary' as const, correct: i < n }));

/** A device with progress in all four sections. */
function device(): MemStorage {
  const st = new MemStorage();
  let d: AppData = { ...createEmptyData(T0), currentCourse: 'zh' };
  d = finishLessonQuiz(d, COURSES.zh, 'd1', quiz(9), T0).data;
  d = toggleWordFlag(d, 'zh', 'mama', 'favorite', T0);
  st.setItem(STORAGE_KEY, JSON.stringify(d));
  let q = markSectionRead(emptyQa(T0), 'ch1', '1.1', T0);
  q = recordQa(q, 't:test-oracle:def', false, ['test-oracle'], T0);
  q = addQaAttempt(q, { id: 'a1', at: T0.toISOString(), kind: 'topic', topicId: 'ch1', correct: 7, total: 10, byTopic: { ch1: { correct: 7, total: 10 } } });
  st.setItem(QA_KEY, JSON.stringify(q));
  let c = savePhrase(emptyConv(), { lang: 'ko', text: '감사합니다', pron: { romanization: 'gamsahamnida' }, meaning: { vi: 'cảm ơn', en: 'thank you' }, scenario: 'shopping' }, T0);
  const s = { ...createSession({ lang: 'ko', level: 'beginner', scenario: 'shopping', mode: 'guided', explainLang: 'vi' }, 'demo', T0), messages: [learnerMessage('안녕하세요', T0)] };
  c = upsertSession(c, s);
  c = { ...c, settings: { ...DEFAULT_SETTINGS, apiUrl: 'https://api.example', accessCode: 'very-secret-code' } };
  st.setItem(CONV_KEY, JSON.stringify(c));
  st.setItem('clc:lang', 'en');
  st.setItem('clc:support-lang', 'vi');
  st.setItem('clc:pwa-install-dismissed', T0.toISOString());
  return st;
}

describe('creating a backup', () => {
  it('contains every section, a format version, timestamp and checksum, but no secret or cache data', async () => {
    const doc = await B.createBackup(B.readSections(asStorage(device())), T1);
    expect(doc).toMatchObject({ app: 'language-companion', kind: 'backup', formatVersion: 1, createdAt: T1.toISOString(), checksum: { algorithm: 'SHA-256' } });
    expect(doc.checksum.value).toMatch(/^[0-9a-f]{64}$/);
    expect(doc.meta.sections).toEqual(['courses', 'qa', 'conversation', 'preferences']);
    const text = B.toFileText(doc);
    expect(text).not.toMatch(/very-secret-code/);
    expect(text).not.toMatch(/pwa-install-dismissed/);
    expect(text).toMatch(/https:\/\/api\.example/); // the backend URL is not a secret
  });

  it('round-trips as a file and as a compressed code', async () => {
    const doc = await B.createBackup(B.readSections(asStorage(device())), T1);
    for (const input of [B.toFileText(doc), await B.toCode(doc)]) {
      const p = await B.parseBackupInput(input);
      expect(p.kind).toBe('backup');
      if (p.kind === 'backup') expect(p.doc.sections).toEqual(doc.sections);
    }
    const code = await B.toCode(doc);
    expect(code.startsWith('LCB1.g.')).toBe(true);
    expect(code.length).toBeLessThan(B.toFileText(doc).length);
  });

  it('summarizes what will be restored', async () => {
    const doc = await B.createBackup(B.readSections(asStorage(device())), T1);
    const s = B.summarize(doc);
    expect(s.courses?.find((c) => c.course === 'zh')).toMatchObject({ lessonsCompleted: 1, quizzes: 1 });
    expect(s.qa).toMatchObject({ attempts: 1 });
    expect(s.conversation).toMatchObject({ sessions: 1, saved: 1 });
    expect(s.preferences).toEqual({ lang: 'en', supportLang: 'vi' });
  });
});

describe('encryption (Web Crypto)', () => {
  it('encrypts with a password and refuses a wrong one', async () => {
    const doc = await B.createBackup(B.readSections(asStorage(device())), T1);
    const encd = await B.encryptBackup(doc, 'correct horse battery');
    const text = B.toFileText(encd);
    expect(text).not.toMatch(/감사합니다|test-oracle|very-secret/);
    const p = await B.parseBackupInput(await B.toCode(encd));
    expect(p.kind).toBe('encrypted');
    if (p.kind !== 'encrypted') return;
    await expect(B.decryptBackup(p.enc, 'wrong password')).rejects.toMatchObject({ code: 'wrongPassword' });
    await expect(B.decryptBackup(p.enc, '')).rejects.toMatchObject({ code: 'needPassword' });
    const back = await B.decryptBackup(p.enc, 'correct horse battery');
    expect(back.sections).toEqual(doc.sections);
    const tampered = { ...p.enc, data: p.enc.data.slice(0, -8) + 'AAAAAAA=' };
    await expect(B.decryptBackup(tampered, 'correct horse battery')).rejects.toMatchObject({ code: 'wrongPassword' });
  }, 30000);
});

describe('rejecting bad input — without touching data', () => {
  it('rejects malformed, corrupted, tampered and unsupported backups', async () => {
    const doc = await B.createBackup(B.readSections(asStorage(device())), T1);
    const reject = async (input: string, code: B.BackupError) => expect(B.parseBackupInput(input)).rejects.toMatchObject({ code });
    await reject('', 'empty');
    await reject('hello', 'notBackup');
    await reject('{"a":', 'notJson');
    await reject('{"app":"other"}', 'notBackup');
    const code = await B.toCode(doc);
    await reject(code.slice(0, code.length - 40), 'corruptCode');
    await reject(code.replace('LCB1.', 'LCB9.'), 'newerFormat');
    const tampered = JSON.parse(B.toFileText(doc));
    tampered.sections.qa.attempts[0].correct = 10;
    await reject(JSON.stringify(tampered), 'checksum');
    await reject(JSON.stringify({ ...doc, formatVersion: 7 }), 'newerFormat');
    // a section newer than this app (valid checksum) gives a clear migration error
    const newer = await B.createBackup({ qa: { ...doc.sections.qa!, schemaVersion: 99 } }, T1);
    await reject(B.toFileText(newer), 'tooNew');
    const broken = await B.createBackup({ courses: { nonsense: true } as unknown as AppData }, T1);
    await reject(B.toFileText(broken), 'invalidSection');
  });

  it('a failing write leaves every key as it was (atomic restore)', async () => {
    const src = device();
    const doc = await B.createBackup(B.readSections(asStorage(src)), T1);
    const target = new MemStorage();
    target.setItem(STORAGE_KEY, JSON.stringify(createEmptyData(T2)));
    target.setItem(QA_KEY, JSON.stringify(emptyQa(T2)));
    const before = new Map(target.m);
    target.writes = 0;
    target.failOn = (_k, n) => n === 3; // the third write fails (e.g. storage full)
    expect(() => B.restoreBackup(asStorage(target), doc, 'replace', B.SECTION_IDS, T2)).toThrow();
    expect(new Map(target.m)).toEqual(before);
  });
});

describe('restoring', () => {
  it('replace: a reinstalled app (empty storage) gets everything back exactly', async () => {
    const src = device();
    const doc = await B.createBackup(B.readSections(asStorage(src)), T1);
    const fresh = new MemStorage();
    fresh.setItem(CONV_KEY, JSON.stringify({ ...emptyConv(), settings: { ...DEFAULT_SETTINGS, accessCode: 'this-device-code' } }));
    const parsed = await B.parseBackupInput(await B.toCode(doc));
    if (parsed.kind !== 'backup') throw new Error('unexpected');
    B.restoreBackup(asStorage(fresh), parsed.doc, 'replace', B.SECTION_IDS, T2);
    const a = B.readSections(asStorage(src));
    const b = B.readSections(asStorage(fresh));
    expect(b.courses).toEqual(a.courses);
    expect(b.qa).toEqual(a.qa);
    expect(b.conversation?.sessions).toEqual(a.conversation?.sessions);
    expect(b.conversation?.saved).toEqual(a.conversation?.saved);
    expect(fresh.getItem('clc:lang')).toBe('en');
    // the access code never travels in a backup; this device keeps its own
    expect(JSON.parse(fresh.getItem(CONV_KEY)!).settings.accessCode).toBe('this-device-code');
  });

  it('replace only touches the selected sections', async () => {
    const doc = await B.createBackup(B.readSections(asStorage(device())), T1);
    const st = new MemStorage();
    const myQa = JSON.stringify(markSectionRead(emptyQa(T2), 'ch6', '6.1', T2));
    st.setItem(QA_KEY, myQa);
    B.restoreBackup(asStorage(st), doc, 'replace', ['courses'], T2);
    expect(st.getItem(QA_KEY)).toBe(myQa);
    expect(st.getItem(STORAGE_KEY)).not.toBeNull();
    expect(st.getItem(CONV_KEY)).toBeNull();
  });

  it('merge: combines records by id without duplicates and keeps local data the backup does not have', async () => {
    // backup device: lesson d1 (90%), word mama reviewed at T0, a QA attempt, a saved phrase
    const doc = await B.createBackup(B.readSections(asStorage(device())), T1);
    // this device: lesson d2 completed, mama reviewed later (T2), another word, different QA section, own phrase
    const st = new MemStorage();
    let d: AppData = { ...createEmptyData(T2), currentCourse: 'en', settings: { ...createEmptyData(T2).settings, speechRate: 0.8 } };
    d = finishLessonQuiz(d, COURSES.zh, 'd1', quiz(7), T2).data; // 70% here vs 90% in the backup
    d = { ...d, courses: { ...d.courses, zh: { ...d.courses.zh, words: { ...d.courses.zh.words, mama: reviewWord(d.courses.zh.words.mama, true, T2), baba: reviewWord(undefined, true, T2) } } } };
    st.setItem(STORAGE_KEY, JSON.stringify(d));
    st.setItem(QA_KEY, JSON.stringify(markSectionRead(emptyQa(T2), 'ch1', '1.2', T2)));
    st.setItem(CONV_KEY, JSON.stringify(savePhrase(emptyConv(), { lang: 'zh', text: '你好', pron: { pinyin: 'nǐ hǎo' }, meaning: { vi: 'xin chào', en: 'hello' }, scenario: 'greetings' }, T2)));
    st.setItem('clc:lang', 'zh');

    B.restoreBackup(asStorage(st), doc, 'merge', B.SECTION_IDS, T2);
    const r = B.readSections(asStorage(st));
    const zh = r.courses!.courses.zh;
    expect(zh.lessons.d1.status).toBe('completed');
    expect(zh.lessons.d1.bestScore).toBe(90);
    expect(zh.words.mama.lastReviewed).toBe(T2.toISOString()); // the newer review wins
    expect(zh.words.baba).toBeDefined(); // local-only record kept
    expect(zh.quizzes).toHaveLength(2);
    expect(r.courses!.settings.speechRate).toBe(0.8); // local settings kept
    expect(r.courses!.currentCourse).toBe('en');
    expect(r.qa!.topics.ch1.readSections.sort()).toEqual(['1.1', '1.2']);
    expect(r.qa!.attempts).toHaveLength(1);
    expect(Object.keys(r.conversation!.saved).sort()).toEqual(['ko:감사합니다', 'zh:你好']);
    expect(r.conversation!.sessions).toHaveLength(1);
    expect(st.getItem('clc:lang')).toBe('zh'); // merge keeps local preferences

    // merging the same backup again changes nothing (no duplicated lessons, quizzes, reviews, phrases)
    const once = new Map(st.m);
    B.restoreBackup(asStorage(st), doc, 'merge', B.SECTION_IDS, T2);
    expect(JSON.parse(st.getItem(STORAGE_KEY)!).courses).toEqual(JSON.parse(once.get(STORAGE_KEY)!).courses);
    expect(JSON.parse(st.getItem(QA_KEY)!).reviews).toEqual(JSON.parse(once.get(QA_KEY)!).reviews);
    expect(st.getItem(CONV_KEY)).toBe(once.get(CONV_KEY));
  });

  it('reads the older single-module backups', async () => {
    const src = device();
    const courses = B.readSections(asStorage(src)).courses!;
    for (const [text, section] of [
      [exportBackup(courses, T0), 'courses'],
      [exportQa(JSON.parse(src.getItem(QA_KEY)!), T0), 'qa'],
      [exportConv(JSON.parse(src.getItem(CONV_KEY)!), T0), 'conversation'],
    ] as const) {
      const p = await B.parseBackupInput(text);
      expect(p.kind).toBe('legacy');
      if (p.kind === 'legacy') expect(B.summarize(p.doc).sections).toEqual([section]);
    }
  });
});
