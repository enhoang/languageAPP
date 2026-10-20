import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import i18n, { resources } from '../i18n';
import { glossLangFor, LANG_KEY, readLang, readSupportLang, SUPPORT_LANG_KEY, writePref } from '../i18n/langs';
import { isLText, resolveTxt, type TFn } from '../i18n/resolve';
import type { Lang, Txt } from '../types';
import { COURSE_IDS, COURSES } from '../courses';
import { createEmptyData, finishLessonQuiz } from '../lib/appData';
import { loadData, migrate, saveData, STORAGE_KEY } from '../lib/storage';

class MemStorage {
  m = new Map<string, string>();
  getItem(k: string) { return this.m.get(k) ?? null; }
  setItem(k: string, v: string) { this.m.set(k, v); }
}

/** Letters that occur in Vietnamese but not in English or Hanyu Pinyin. */
const VIETNAMESE_ONLY = /[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹãĩõũ]/i;
const CJK = /\p{Script=Han}/u;

/** English may quote Vietnamese only when it is explicitly comparing with Vietnamese ("like Vietnamese 'ư'"). */
const englishOk = (en: string) =>
  !VIETNAMESE_ONLY.test(en.replace(/\b\p{Lu}[\p{L}]*/gu, '')) || /Vietnamese|Tiếng Việt/.test(en); // capitalized words: names like "Nguyễn Thị Lan"
/** Chinese is written in Chinese, or (for punctuation / pinyin formulas) at least is not a copy of another language. */
const chineseOk = (zh: string, vi: string, en: string) => CJK.test(zh) || (zh !== vi && zh !== en);

/** Flatten a dictionary into "a.b.c" → string. */
function leaves(obj: object, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') out[key] = v;
    else Object.assign(out, leaves(v as object, key));
  }
  return out;
}

const dict = {
  vi: leaves(resources.vi.translation),
  en: leaves(resources.en.translation),
  zh: leaves(resources.zh.translation),
};
const vars = (s: string) => [...s.matchAll(/\{\{\s*(\w+)\s*\}\}/g)].map((m) => m[1]).sort();

describe('interface dictionaries', () => {
  it('have the same keys in all three languages and no empty strings', () => {
    const keys = Object.keys(dict.vi).sort();
    expect(keys.length).toBeGreaterThan(100);
    expect(Object.keys(dict.en).sort()).toEqual(keys);
    expect(Object.keys(dict.zh).sort()).toEqual(keys);
    for (const lang of ['vi', 'en', 'zh'] as const) {
      for (const [k, v] of Object.entries(dict[lang])) expect(v.trim(), `${lang} ${k}`).not.toBe('');
    }
  });

  it('use the same interpolation variables in every language', () => {
    for (const k of Object.keys(dict.vi)) {
      expect(vars(dict.en[k]), `en ${k}`).toEqual(vars(dict.vi[k]));
      expect(vars(dict.zh[k]), `zh ${k}`).toEqual(vars(dict.vi[k]));
    }
  });

  it('define plural keys in pairs', () => {
    for (const k of Object.keys(dict.vi)) {
      if (k.endsWith('_one')) expect(dict.vi[k.replace(/_one$/, '_other')], k).toBeDefined();
      if (k.endsWith('_other')) expect(dict.vi[k.replace(/_other$/, '_one')], k).toBeDefined();
    }
  });

  it('English has no Vietnamese text and Chinese is written in Chinese', () => {
    for (const k of Object.keys(dict.vi)) {
      const neutral = dict.vi[k] === dict.en[k] && dict.en[k] === dict.zh[k]; // e.g. "{{zh}} — {{pinyin}}"
      expect(englishOk(dict.en[k]), `en ${k}: ${dict.en[k]}`).toBe(true);
      if (!neutral) expect(chineseOk(dict.zh[k], dict.vi[k], dict.en[k]), `zh ${k}: ${dict.zh[k]}`).toBe(true);
    }
  });

  it('falls back to Vietnamese, never to a raw key', () => {
    const t = i18n.getFixedT('en');
    expect(t('common.nav.home')).toBe('Overview');
    i18n.addResource('vi', 'translation', 'common.__onlyVi', 'Chỉ có tiếng Việt');
    expect(i18n.getFixedT('en')('common.__onlyVi' as never)).toBe('Chỉ có tiếng Việt');
    expect(i18n.getFixedT('zh')('common.__onlyVi' as never)).toBe('Chỉ có tiếng Việt');
  });
});

describe('language preference', () => {
  it('defaults to Vietnamese and restores a saved choice', () => {
    const s = new MemStorage() as unknown as Storage;
    expect(readLang(s)).toBe('vi');
    expect(readSupportLang(s)).toBe('vi');
    writePref(LANG_KEY, 'zh', s);
    writePref(SUPPORT_LANG_KEY, 'en', s);
    expect(readLang(s)).toBe('zh');
    expect(readSupportLang(s)).toBe('en');
    writePref(LANG_KEY, 'fr', s);
    expect(readLang(s)).toBe('vi');
  });

  it('is stored apart from learner progress, which stays unchanged', () => {
    const s = new MemStorage();
    const data = finishLessonQuiz(createEmptyData(), COURSES.zh, 'd1', [{ skill: 'vocabulary', correct: true }]).data;
    saveData(data, s as unknown as Storage);
    const before = s.getItem(STORAGE_KEY);
    for (const l of ['en', 'zh', 'vi'] as Lang[]) writePref(LANG_KEY, l, s as unknown as Storage);
    expect(s.getItem(STORAGE_KEY)).toBe(before);
    expect(loadData(s as unknown as Storage).courses.zh.lessons.d1.status).toBe('completed');
  });

  it('uses the support language for meanings in the Chinese interface, or when the interface is the language studied', () => {
    expect(glossLangFor('vi', 'en', 'zh')).toBe('vi');
    expect(glossLangFor('en', 'vi', 'ko')).toBe('en');
    expect(glossLangFor('zh', 'en', 'zh')).toBe('en');
    expect(glossLangFor('zh', 'vi', 'ko')).toBe('vi');
    expect(glossLangFor('en', 'vi', 'en')).toBe('vi');
  });
});

describe('resolveTxt', () => {
  const ctx = (lang: Lang, glossLang: 'vi' | 'en' = lang === 'en' ? 'en' : 'vi') => ({ lang, glossLang, t: i18n.getFixedT(lang) as unknown as TFn });
  const lt = { vi: 'Thanh 1', en: 'Tone 1', zh: '第一声' };
  const gloss = { vi: 'mẹ', en: 'mom' };

  it('picks the interface language for prose and the gloss language for meanings', () => {
    expect(resolveTxt(lt, ctx('vi'))).toBe('Thanh 1');
    expect(resolveTxt(lt, ctx('en'))).toBe('Tone 1');
    expect(resolveTxt(lt, ctx('zh'))).toBe('第一声');
    expect(resolveTxt(gloss, ctx('zh', 'vi'))).toBe('mẹ');
    expect(resolveTxt(gloss, ctx('zh', 'en'))).toBe('mom');
    expect(resolveTxt('妈妈', ctx('en'))).toBe('妈妈');
  });

  it('resolves dictionary messages with nested params and plurals', () => {
    const m: Txt = { k: 'ex.meansExplain', p: { word: '妈妈 (māma)', meaning: gloss } };
    expect(resolveTxt(m, ctx('en'))).toBe('妈妈 (māma) means "mom".');
    expect(resolveTxt(m, ctx('vi'))).toBe('妈妈 (māma) nghĩa là "mẹ".');
    expect(resolveTxt({ k: 'common.questions', p: { count: 1 } }, ctx('en'))).toBe('1 question');
    expect(resolveTxt({ k: 'common.questions', p: { count: 3 } }, ctx('en'))).toBe('3 questions');
    expect(resolveTxt({ seq: ['水', ' = ', gloss], sep: '' }, ctx('en'))).toBe('水 = mom');
  });
});

// ---------- content translations ----------

type Found = { path: string; value: unknown };

/** Walk any content structure and collect localized objects and dictionary messages. */
function collect(node: unknown, path: string, out: { lt: Found[]; msg: Found[]; gloss: Found[] }) {
  if (Array.isArray(node)) return node.forEach((n, i) => collect(n, `${path}[${i}]`, out));
  if (!node || typeof node !== 'object') return;
  const o = node as Record<string, unknown>;
  if (typeof o.k === 'string' && Object.keys(o).every((x) => x === 'k' || x === 'p')) {
    out.msg.push({ path, value: o });
    if (o.p) collect(o.p, `${path}.p`, out);
    return;
  }
  if (isLText(o as unknown as Txt) && typeof o.vi === 'string' && typeof o.en === 'string' && typeof o.zh === 'string' && Object.keys(o).length === 3) {
    out.lt.push({ path, value: o });
    return;
  }
  if (typeof o.vi === 'string' && typeof o.en === 'string' && Object.keys(o).every((x) => x === 'vi' || x === 'en')) out.gloss.push({ path, value: o });
  for (const [k, v] of Object.entries(o)) collect(v, `${path}.${k}`, out);
}

const found = { lt: [] as Found[], msg: [] as Found[], gloss: [] as Found[] };
for (const id of COURSE_IDS) collect(COURSES[id], id, found);

describe('learning content translations', () => {
  it('found the localized content', () => {
    expect(found.lt.length).toBeGreaterThan(300);
    expect(found.gloss.length).toBeGreaterThan(50);
  });

  it('every LText has Vietnamese, English and Chinese', () => {
    for (const { path, value } of found.lt) {
      const t = value as { vi: string; en: string; zh: string };
      expect(t.vi.trim() && t.en.trim() && t.zh.trim(), path).toBeTruthy();
      const neutral = t.vi === t.en && t.en === t.zh; // e.g. a pinyin-only title "j – zh – z"
      if (neutral) {
        expect(VIETNAMESE_ONLY.test(t.vi), `${path}: untranslated "${t.vi}"`).toBe(false);
        continue;
      }
      if (VIETNAMESE_ONLY.test(t.vi)) expect(t.en, `${path}: English is a copy of Vietnamese`).not.toBe(t.vi);
      expect(englishOk(t.en), `${path} en: ${t.en}`).toBe(true);
      expect(chineseOk(t.zh, t.vi, t.en), `${path} zh: ${t.zh}`).toBe(true);
    }
  });

  it('every meaning has Vietnamese and English', () => {
    for (const id of COURSE_IDS) for (const w of COURSES[id].words) expect(w.vi.trim() && w.en.trim(), w.id).toBeTruthy();
    for (const { path, value } of found.gloss) {
      const g = value as { vi: string; en: string };
      expect(g.vi.trim() && g.en.trim(), path).toBeTruthy();
      expect(englishOk(g.en), `${path} en: ${g.en}`).toBe(true);
    }
  });

  it('only references dictionary keys that exist', () => {
    for (const { path, value } of found.msg) {
      const k = (value as { k: string }).k;
      expect(dict.vi[k] ?? dict.vi[`${k}_other`], `${path}: ${k}`).toBeDefined();
    }
  });

  it('meanings are never written in the target script', () => {
    for (const id of COURSE_IDS) {
      for (const w of COURSES[id].words) {
        expect(CJK.test(w.en) || /\p{Script=Hangul}/u.test(w.en), `${id} ${w.id} en: ${w.en}`).toBe(false);
        expect(CJK.test(w.vi) || /\p{Script=Hangul}/u.test(w.vi), `${id} ${w.id} vi: ${w.vi}`).toBe(false);
      }
    }
  });
});

// ---------- migration ----------

describe('schema v1 → v3 migration', () => {
  it('keeps progress, rebuilds mistakes from ids and turns quiz titles into ids', () => {
    const v1 = {
      createdAt: '2026-09-01T00:00:00Z',
      updatedAt: '2026-10-01T00:00:00Z',
      settings: { sessionMinutes: 20, speechRate: 0.85, voiceURI: null, showPinyin: true },
      activity: {},
      skillStats: {},
      schemaVersion: 1,
      lessons: { d1: { status: 'completed', step: 4, startedAt: '2026-10-01T00:00:00Z', attempts: 1, bestScore: 80 } },
      words: { mama: { status: 'learning', interval: 1, ease: 2.3, due: null, reps: 1, lapses: 0, correct: 1, incorrect: 0, lastReviewed: null, lastAdvanceDay: null, favorite: true, difficult: false } },
      mistakes: [
        { id: 'd1-q1', at: '2026-10-01T00:00:00Z', exercise: { id: 'd1-q1', prompt: 'Nghe và chọn đáp án đúng' }, given: 'mā', count: 2, resolved: false },
        { id: 'gen-zh2vi-mama', at: '2026-10-01T00:00:00Z', exercise: {}, given: 'bố', count: 1, resolved: true },
        { id: 'removed-exercise', at: '2026-10-01T00:00:00Z', exercise: {}, given: 'x', count: 1, resolved: false },
      ],
      quizzes: [
        { id: 'a', at: '2026-10-01T00:00:00Z', kind: 'lesson', title: 'Ngày 1: Làm quen', lessonId: 'd1', correct: 4, total: 5, bySkill: {} },
        { id: 'b', at: '2026-10-01T00:00:00Z', kind: 'test', title: 'Kiểm tra Nghe hiểu · 10 câu', correct: 7, total: 10, bySkill: {} },
      ],
    };
    const all = migrate(JSON.parse(JSON.stringify(v1)))!;
    expect(all.schemaVersion).toBe(3);
    expect(all.currentCourse).toBe('zh');
    const data = all.courses.zh;
    expect(data.lessons).toEqual(v1.lessons);
    expect(data.words).toEqual(v1.words);
    expect(data.mistakes.map((m) => m.id)).toEqual(['d1-q1', 'gen-meaning-mama']);
    expect(data.mistakes[0]).toEqual({ id: 'd1-q1', at: '2026-10-01T00:00:00Z', given: 'mā', count: 2, resolved: false });
    expect(data.quizzes.map((q) => ('title' in q ? 'title' : q.testSkill ?? q.lessonId))).toEqual(['d1', 'listening']);
  });
});

// ---------- no hardcoded Vietnamese in components ----------

function tsxFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((f: string) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? tsxFiles(p) : p.endsWith('.tsx') ? [p] : [];
  });
}

describe('components', () => {
  it('contain no hardcoded Vietnamese interface text', () => {
    const root = fileURLToPath(new URL('..', import.meta.url));
    for (const file of [...tsxFiles(join(root, 'pages')), ...tsxFiles(join(root, 'components')), join(root, 'App.tsx')]) {
      const code = readFileSync(file, 'utf8')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/(^|[^:])\/\/.*$/gm, '$1');
      const hits = code.split('\n').filter((l: string) => VIETNAMESE_ONLY.test(l));
      expect(hits, file).toEqual([]);
    }
  });
});
