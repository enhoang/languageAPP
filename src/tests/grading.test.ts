import { describe, expect, it } from 'vitest';
import type { Exercise } from '../types';
import { grade, toView as view } from '../lib/grading';
import { COURSES } from '../courses';

const toView = (ex: Exercise) => view(ex, COURSES.zh);

const choice: Exercise = { id: 'c', kind: 'choice', skill: 'vocabulary', prompt: 'p', options: ['a', { vi: 'b', en: 'B' }, 'c'], answer: 1, explanation: '' };
const match: Exercise = { id: 'm', kind: 'match', skill: 'vocabulary', prompt: 'p', explanation: '', pairs: [{ text: '水', pron: 'shuǐ', vi: 'nước', en: 'water' }, { text: '鱼', pron: 'yú', vi: 'cá', en: 'fish' }] };
const arrange: Exercise = { id: 'a', kind: 'arrange', skill: 'grammar', prompt: 'p', explanation: '', tokens: ['我', '是', '学生'], answers: ['我是学生'] };
const typePy: Exercise = { id: 't', kind: 'type', mode: 'pinyin', skill: 'writing', prompt: 'p', explanation: '', accepted: ['xièxie'] };
const typeHz: Exercise = { id: 'h', kind: 'type', mode: 'hanzi', skill: 'writing', prompt: 'p', explanation: '', accepted: ['我是学生'] };

describe('views never contain answer keys', () => {
  it('omits answer fields', () => {
    for (const ex of [choice, match, arrange, typePy, typeHz]) {
      const v = toView(ex) as unknown as Record<string, unknown>;
      expect(v.answer).toBeUndefined();
      expect(v.answers).toBeUndefined();
      expect(v.accepted).toBeUndefined();
      expect(v.pairs).toBeUndefined();
      expect(v.explanation).toBeUndefined();
    }
  });
  it('hanzi palette contains the answer characters', () => {
    const v = toView(typeHz);
    expect(v.kind === 'type' && v.palette).toEqual(expect.arrayContaining(['我', '是', '学', '生']));
  });
});

describe('grade', () => {
  it('choice compares option keys, not displayed text', () => {
    const v = toView(choice);
    expect(v.kind === 'choice' && v.options.map((o) => o.key).sort()).toEqual(['0', '1', '2']);
    expect(grade(choice, { kind: 'choice', value: '1' }).correct).toBe(true);
    expect(grade(choice, { kind: 'choice', value: '0' })).toMatchObject({ correct: false, correctKey: '1', correctAnswer: { vi: 'b', en: 'B' }, given: 'a' });
  });
  it('match reports wrong pairs', () => {
    expect(grade(match, { kind: 'match', value: { 水: 'nước', 鱼: 'cá' } }).correct).toBe(true);
    const r = grade(match, { kind: 'match', value: { 水: 'cá', 鱼: 'nước' } });
    expect(r.correct).toBe(false);
    expect(r.wrongKeys).toEqual(['水', '鱼']);
  });
  it('arrange', () => {
    expect(grade(arrange, { kind: 'arrange', value: ['我', '是', '学生'] }).correct).toBe(true);
    expect(grade(arrange, { kind: 'arrange', value: ['是', '我', '学生'] }).correct).toBe(false);
  });
  it('type pinyin with tone hint', () => {
    expect(grade(typePy, { kind: 'type', value: 'xie4xie' }).correct).toBe(true);
    const r = grade(typePy, { kind: 'type', value: 'xiexie' });
    expect(r.correct).toBe(false);
    expect(r.hint).toEqual({ k: 'ex.toneHint' });
  });
  it('type hanzi ignores punctuation and spaces', () => {
    expect(grade(typeHz, { kind: 'type', value: ' 我是学生。' }).correct).toBe(true);
    expect(grade(typeHz, { kind: 'type', value: '我是老师' }).correct).toBe(false);
  });
});

describe('English and Korean answers', () => {
  const spell: Exercise = { id: 's', kind: 'type', mode: 'spelling', skill: 'writing', prompt: 'p', explanation: '', accepted: ['teacher'] };
  const sentence: Exercise = { id: 's2', kind: 'type', mode: 'spelling', skill: 'writing', prompt: 'p', explanation: '', accepted: ["I'm a student."] };
  const hangul: Exercise = { id: 'k', kind: 'type', mode: 'hangul', skill: 'writing', prompt: 'p', explanation: '', accepted: ['안녕하세요'] };
  const enArrange: Exercise = { id: 'ea', kind: 'arrange', skill: 'grammar', prompt: 'p', explanation: '', tokens: ['I', 'am', 'a', 'student'], answers: ['I am a student'] };

  it('spelling ignores case, end punctuation, extra spaces and curly apostrophes', () => {
    expect(grade(spell, { kind: 'type', value: ' Teacher ' }).correct).toBe(true);
    expect(grade(sentence, { kind: 'type', value: 'i’m  a student' }).correct).toBe(true);
  });
  it('a one-letter slip is wrong, with a spelling hint', () => {
    const r = grade(spell, { kind: 'type', value: 'teachr' });
    expect(r.correct).toBe(false);
    expect(r.hint).toEqual({ k: 'ex.spellingHint' });
    expect(grade(spell, { kind: 'type', value: 'doctor' }).hint).toBeUndefined();
  });
  it('Hangul ignores spacing and punctuation, and gets a syllable palette', () => {
    expect(grade(hangul, { kind: 'type', value: '안녕 하세요!' }).correct).toBe(true);
    expect(grade(hangul, { kind: 'type', value: '안녕히 가세요' }).correct).toBe(false);
    const v = view(hangul, COURSES.ko);
    expect(v.kind === 'type' && v.palette).toEqual(expect.arrayContaining(['안', '녕', '하', '세', '요']));
    expect(view(spell, COURSES.en)).not.toHaveProperty('palette');
  });
  it('English word order is case-insensitive', () => {
    expect(grade(enArrange, { kind: 'arrange', value: ['I', 'am', 'a', 'student'] }).correct).toBe(true);
    expect(grade(enArrange, { kind: 'arrange', value: ['am', 'I', 'a', 'student'] }).correct).toBe(false);
  });
});
