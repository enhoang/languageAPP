import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type { ConvSetup, DemoScript, Pron } from '../conversation/types';
import { SCENARIOS } from '../conversation/types';
import * as S from '../conversation/store';
import { DemoProvider, HttpProvider, ConversationError, demoScriptFor, backendUrl } from '../conversation/provider';
import { enrichPron, onlyOwnSystem } from '../conversation/pron';
import { DEMO_SCRIPTS } from '../conversation/demo';

const setup: ConvSetup = { lang: 'zh', level: 'beginner', scenario: 'food', mode: 'guided', explainLang: 'vi' };
const NOW = new Date('2026-10-20T10:00:00Z');

class MemStorage {
  m = new Map<string, string>();
  get length() { return this.m.size; }
  clear() { this.m.clear(); }
  getItem(k: string) { return this.m.get(k) ?? null; }
  key(i: number) { return [...this.m.keys()][i] ?? null; }
  removeItem(k: string) { this.m.delete(k); }
  setItem(k: string, v: string) { this.m.set(k, v); }
}

describe('conversation data', () => {
  it('lives under its own key and never touches language or ISTQB progress', () => {
    const st = new MemStorage();
    st.setItem('clc:data', '{"schemaVersion":3}');
    st.setItem('clc:qa', '{"schemaVersion":1}');
    st.setItem('clc:lang', 'vi');
    const d = S.savePhrase(S.emptyConv(), { lang: 'zh', text: '你好', pron: { pinyin: 'nǐ hǎo' }, meaning: { vi: 'xin chào', en: 'hello' }, scenario: 'greetings' }, NOW);
    expect(S.saveConv(d, st as unknown as Storage)).toBe(true);
    expect(st.getItem('clc:data')).toBe('{"schemaVersion":3}');
    expect(st.getItem('clc:qa')).toBe('{"schemaVersion":1}');
    expect(st.getItem('clc:lang')).toBe('vi');
    expect(S.loadConv(st as unknown as Storage).saved['zh:你好'].text).toBe('你好');
  });

  it('keeps a corrupt copy instead of losing it', () => {
    const st = new MemStorage();
    st.setItem(S.CONV_KEY, '{"hello":1}');
    expect(S.loadConv(st as unknown as Storage).sessions).toEqual([]);
    expect([...st.m.keys()].some((k) => k.startsWith('clc:conv:corrupt:'))).toBe(true);
  });

  it('applies turns: feedback goes on the learner message, the partner line is appended', () => {
    let s = S.createSession(setup, 'ai', NOW);
    s = S.applyTurn(s, { intro: { scenario: 'Quán ăn', role: 'Bạn là khách' }, partner: { text: '欢迎！', translation: { vi: 'Chào mừng!', en: 'Welcome!' } }, replies: [] }, NOW);
    s = { ...s, messages: [...s.messages, S.learnerMessage('我要茶', NOW)] };
    s = S.applyTurn(s, { feedback: { verdict: 'style', items: [{ kind: 'style', category: 'naturalness', original: '我要茶', better: '我要一杯茶', explanation: '...' }], encouragement: 'Tốt!' }, partner: { text: '好的。', translation: { vi: 'Được.', en: 'OK.' } }, replies: [{ text: '谢谢', translation: { vi: 'Cảm ơn', en: 'Thanks' } }] }, NOW);
    expect(s.intro?.role).toBe('Bạn là khách');
    expect(s.messages.map((m) => m.role)).toEqual(['partner', 'learner', 'partner']);
    expect(s.messages[1].feedback?.verdict).toBe('style');
    expect(s.replies).toHaveLength(1);
    expect(S.setStatus(s, 'finished', NOW).endedAt).toBe(NOW.toISOString());
  });

  it('saves phrases once, marks difficult (due now) and reviews with spaced repetition', () => {
    let d = S.emptyConv();
    const p = { lang: 'ko' as const, text: '감사합니다', pron: { romanization: 'gamsahamnida', spoken: '[감사함니다]' }, meaning: { vi: 'cảm ơn', en: 'thank you' }, scenario: 'shopping' as const };
    d = S.savePhrase(d, p, NOW);
    d = S.savePhrase(d, { ...p, text: ' 감사합니다 ' }, NOW);
    expect(Object.keys(d.saved)).toHaveLength(1);
    const id = Object.keys(d.saved)[0];
    expect(S.dueSaved(d, 'ko', NOW)).toEqual([]); // first review tomorrow
    d = S.setDifficult(d, id, true, NOW);
    expect(S.dueSaved(d, 'ko', NOW)).toEqual([id]);
    d = S.reviewPhrase(d, id, true, NOW);
    expect(S.dueSaved(d, 'ko', NOW)).toEqual([]);
    expect(d.reviews[0]).toMatchObject({ id, correct: true });
  });

  it('backs up without the access code and restores', () => {
    const d = { ...S.emptyConv(), settings: { ...S.DEFAULT_SETTINGS, apiUrl: 'https://x.example', accessCode: 'secret' } };
    const text = S.exportConv(d, NOW);
    expect(text).not.toMatch(/secret/);
    const r = S.parseConvBackup(text);
    expect(r.ok && r.data.settings.apiUrl).toBe('https://x.example');
    expect(S.parseConvBackup('{"app":"chinese-learning-companion:qa","data":{}}')).toEqual({ ok: false, error: 'notBackup' });
  });

  it('counts completed sessions and topics', () => {
    let s = S.createSession(setup, 'demo', NOW);
    s = { ...s, messages: [S.learnerMessage('你好', NOW)], status: 'finished' };
    const st = S.convStats(S.upsertSession(S.emptyConv(), s));
    expect(st.completed).toBe(1);
    expect(st.topics).toEqual([{ id: 'food', count: 1 }]);
    expect(st.byLang.zh).toBe(1);
  });
});

describe('pronunciation systems', () => {
  it('uses checked course data for course words', () => {
    expect(enrichPron('zh', '妈妈', { pinyin: 'mama', source: 'ai' })).toEqual({ pinyin: 'māma', source: 'course' });
    expect(enrichPron('en', 'no', { ipaUS: '/no/', source: 'ai' })).toEqual({ ipaUS: '/noʊ/', ipaUK: '/nəʊ/', source: 'course' });
    expect(enrichPron('ko', '있다', undefined)).toEqual({ romanization: 'itda', spoken: '[읻따]', source: 'course' });
  });
  it('never shows another language\'s system', () => {
    const mixed: Pron = { pinyin: 'nǐ', ipaUS: '/x/', romanization: 'x', spoken: '[x]', respelling: 'x', source: 'ai' };
    expect(onlyOwnSystem('zh', mixed)).toEqual({ pinyin: 'nǐ', source: 'ai' });
    expect(onlyOwnSystem('en', mixed)).toEqual({ ipaUS: '/x/', respelling: 'x', source: 'ai' });
    expect(onlyOwnSystem('ko', mixed)).toEqual({ romanization: 'x', spoken: '[x]', source: 'ai' });
    expect(onlyOwnSystem('zh', { ipaUS: '/x/' })).toBeUndefined();
  });
});

describe('AI backend client', () => {
  it('posts to the backend with the access code, never an API key, and maps errors', async () => {
    const calls: { url: string; init: RequestInit }[] = [];
    const fake = (status: number, body: unknown) => (async (url: string, init: RequestInit) => {
      calls.push({ url, init });
      return new Response(JSON.stringify(body), { status });
    }) as unknown as typeof fetch;
    const turn = { partner: { text: '妈妈好！', translation: { vi: 'Chào mẹ!', en: 'Hi, Mom!' }, pron: { pinyin: 'mama hao', source: 'ai' } }, replies: [] };
    const p = new HttpProvider('https://api.example', 'code1', fake(200, turn));
    const out = await p.start(setup);
    expect(calls[0].url).toBe('https://api.example/api/conversation');
    const headers = calls[0].init.headers as Record<string, string>;
    expect(headers['X-Access-Code']).toBe('code1');
    expect(JSON.stringify(calls[0].init)).not.toMatch(/sk-ant|x-api-key|anthropic/i);
    expect(JSON.parse(calls[0].init.body as string)).toMatchObject({ action: 'start', setup, history: [] });
    expect(out.partner.text).toBe('妈妈好！');
    await expect(new HttpProvider('https://api.example', '', fake(401, { error: 'access code required' })).start(setup)).rejects.toMatchObject({ kind: 'auth' });
    await expect(new HttpProvider('https://api.example', '', fake(429, { error: 'busy' })).start(setup)).rejects.toMatchObject({ kind: 'rate' });
    const down = (async () => { throw new TypeError('fetch failed'); }) as unknown as typeof fetch;
    await expect(new HttpProvider('https://api.example', '', down).start(setup)).rejects.toBeInstanceOf(ConversationError);
  });
  it('uses the demo when no backend URL is configured', () => {
    expect(backendUrl({ ...S.DEFAULT_SETTINGS })).toBe(import.meta.env.VITE_CONVERSATION_API_URL ? import.meta.env.VITE_CONVERSATION_API_URL : null);
    expect(backendUrl({ ...S.DEFAULT_SETTINGS, apiUrl: 'https://a.example/' })).toBe('https://a.example');
  });
});

describe('no API key in client code', () => {
  it('src never references a provider secret', () => {
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const f of readdirSync(dir)) {
        const p = join(dir, f);
        if (statSync(p).isDirectory()) walk(p);
        else if (/\.(ts|tsx)$/.test(f) && !p.includes('/tests/')) files.push(p);
      }
    };
    walk(join(__dirname, '..'));
    for (const f of files) expect(readFileSync(f, 'utf8'), f).not.toMatch(/ANTHROPIC_API_KEY|sk-ant-|x-api-key|VITE_ANTHROPIC/);
  });
});

describe('demo scripts (prewritten scenario practice)', () => {
  const HANGUL = /[가-힯]/;
  const HAN = /[一-鿿]/;
  const TONE = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/;

  it('cover every scenario in every language', () => {
    for (const lang of ['zh', 'en', 'ko'] as const)
      for (const sc of SCENARIOS.filter((s) => s !== 'custom'))
        expect(demoScriptFor({ ...setup, lang, scenario: sc }), `${lang} ${sc}`).toBeDefined();
    expect(new Set(DEMO_SCRIPTS.map((s) => s.id)).size).toBe(DEMO_SCRIPTS.length);
  });

  const checkPron = (s: DemoScript, text: string, p: Pron | undefined, where: string, required: boolean) => {
    if (!p) {
      expect(required, `${where}: missing pron`).toBe(false);
      return;
    }
    const keys = Object.keys(p).filter((k) => k !== 'source' && k !== 'note');
    if (s.lang === 'zh') {
      expect(keys, where).toEqual(['pinyin']);
      expect(TONE.test(p.pinyin!) || /^(de|le|ma|ne|ba|a|zi|men|ge|me)\b/i.test(p.pinyin!), `${where}: pinyin without tone marks: ${p.pinyin}`).toBe(true);
      expect(HAN.test(p.pinyin!) || HANGUL.test(p.pinyin!), where).toBe(false);
      expect(HAN.test(text), `${where}: not Chinese characters: ${text}`).toBe(true);
    } else if (s.lang === 'ko') {
      expect(keys.every((k) => k === 'romanization' || k === 'spoken'), `${where}: ${keys}`).toBe(true);
      expect(HANGUL.test(text), `${where}: Korean must be Hangul: ${text}`).toBe(true);
      if (p.romanization) expect(/^[a-zA-Z\s'’.,!?;:\-…()]+$/.test(p.romanization), `${where}: romanization ${p.romanization}`).toBe(true);
      if (p.spoken) expect(/^\[.*\]$/.test(p.spoken) && HANGUL.test(p.spoken), `${where}: spoken ${p.spoken}`).toBe(true);
    } else {
      expect(keys.every((k) => ['ipaUS', 'ipaUK', 'respelling'].includes(k)), `${where}: ${keys}`).toBe(true);
      for (const k of ['ipaUS', 'ipaUK'] as const) if (p[k]) expect(/^\/.+\/$/.test(p[k]!), `${where}: ${k} ${p[k]}`).toBe(true);
      expect(HAN.test(text) || HANGUL.test(text), where).toBe(false);
    }
  };

  it('use each language\'s own script and pronunciation system, with translations', () => {
    for (const s of DEMO_SCRIPTS) {
      expect(s.turns.length, s.id).toBeGreaterThanOrEqual(6);
      for (const l of ['vi', 'en', 'zh'] as const) expect(s.intro.scenario[l] && s.intro.role[l], `${s.id} intro ${l}`).toBeTruthy();
      s.turns.forEach((t, i) => {
        checkPron(s, t.partner.text, t.partner.pron, `${s.id} turn ${i}`, s.lang !== 'en');
        expect(t.partner.translation.vi && t.partner.translation.en, `${s.id} turn ${i} translation`).toBeTruthy();
        expect(t.replies.length, `${s.id} turn ${i} replies`).toBeGreaterThanOrEqual(i === s.turns.length - 1 ? 1 : 2);
        for (const r of t.replies) {
          expect(r.translation.vi && r.translation.en, `${s.id} turn ${i} reply`).toBeTruthy();
          if (s.lang === 'ko') expect(HANGUL.test(r.text), `${s.id} reply ${r.text}`).toBe(true);
          if (s.lang === 'zh') expect(HAN.test(r.text), `${s.id} reply ${r.text}`).toBe(true);
        }
      });
      for (const lvl of ['word', 'phrase', 'sentence'] as const) expect(s.suggestions.filter((x) => x.level === lvl).length, `${s.id} ${lvl}`).toBeGreaterThanOrEqual(3);
      for (const x of s.suggestions) {
        checkPron(s, x.text, x.pron, `${s.id} suggestion ${x.text}`, x.level !== 'sentence' || s.lang !== 'en');
        expect(x.meaning.vi && x.meaning.en && x.example && x.exampleTranslation.vi && x.exampleTranslation.en, `${s.id} suggestion ${x.text}`).toBeTruthy();
      }
    }
  });

  it('demo mode walks through the script and returns sample answers, never pretending to evaluate', async () => {
    const demo = new DemoProvider();
    const st = { ...setup, lang: 'en' as const, scenario: 'shopping' as const };
    const script = demoScriptFor(st)!;
    const first = await demo.start(st);
    expect(first.partner.text).toBe(script.turns[0].partner.text);
    expect(first.intro?.role).toBe(script.intro.role.vi);
    const next = await demo.reply(st, [], { feedback: true, demoTurn: 0, demoScriptId: script.id });
    expect(next.feedback).toBeUndefined();
    expect(next.modelAnswers).toEqual(script.turns[0].replies);
    expect(next.partner.text).toBe(script.turns[1].partner.text);
    const words = await demo.suggest(st, [], 'word', { demoScriptId: script.id });
    expect(words.every((w) => w.level === 'word')).toBe(true);
    const sum = await demo.summarize(st, [S.learnerMessage('Hello', NOW)], { demoScriptId: script.id });
    expect(sum.corrections).toEqual([]);
    expect(sum.review).toEqual(['Hello']);
    await expect(demo.reply(st, [], { feedback: true, demoTurn: script.turns.length - 1, demoScriptId: script.id })).rejects.toBeInstanceOf(ConversationError);
  });
});
