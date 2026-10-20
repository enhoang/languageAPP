import { describe, expect, it } from 'vitest';
import { comparePinyin, parsePinyin, stripTones } from '../lib/pinyin';

describe('pinyin', () => {
  it('parses tone marks and numbers to the same form', () => {
    expect(parsePinyin('nǐ hǎo')).toEqual(parsePinyin('ni3 hao3'));
    expect(parsePinyin('Zhōngguó')).toEqual({ letters: 'zhongguo', tones: [1, 2] });
  });
  it('accepts correct answers in either notation', () => {
    expect(comparePinyin('ni3hao3', 'nǐ hǎo')).toBe('correct');
    expect(comparePinyin('NǏ HǍO', 'nǐ hǎo')).toBe('correct');
    expect(comparePinyin('ma1ma', 'māma')).toBe('correct');
    expect(comparePinyin('ma1ma5', 'māma')).toBe('correct');
    expect(comparePinyin('lv4', 'lǜ')).toBe('correct');
    expect(comparePinyin('lu:4', 'lǜ')).toBe('correct');
  });
  it('detects tone errors separately from spelling errors', () => {
    expect(comparePinyin('ma3', 'mā')).toBe('tone');
    expect(comparePinyin('mama', 'māma')).toBe('tone');
    expect(comparePinyin('lu4', 'lǜ')).toBe('wrong');
    expect(comparePinyin('', 'mā')).toBe('wrong');
  });
  it('strips tones for search', () => {
    expect(stripTones('Nǐ hǎo')).toBe('ni hao');
  });
});
