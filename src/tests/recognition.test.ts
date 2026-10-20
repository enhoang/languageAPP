import { describe, expect, it } from 'vitest';
import { speakLevel, transcriptSimilarity } from '../lib/recognition';

describe('speech recognition levels', () => {
  it('ignores case, spacing and punctuation', () => {
    expect(speakLevel('H, W, Y', ['Hwy'])).toBe('good');
    expect(speakLevel('How do you spell it?', ['how do you spell it'])).toBe('good');
    expect(speakLevel('My name is Lan. L - A - N.', ['my name is Lan l a n'])).toBe('good');
    expect(speakLevel('apple', ['Apple'])).toBe('good');
    expect(speakLevel('你好', ['你好。'])).toBe('good');
  });

  it('uses the best of the alternatives', () => {
    expect(speakLevel('apple', ['April', 'apple'])).toBe('good');
  });

  it('gives four levels by similarity', () => {
    expect(speakLevel('How do you spell it?', ['how do you'])).toBe('retry');
    expect(speakLevel('G, J', ['Gigi'])).toBe('none');
    expect(speakLevel('How do you spell it?', ['how do you spell'])).toBe('improve');
    expect(speakLevel('apple', ['banana'])).toBe('none');
    expect(speakLevel('apple', [])).toBe('none');
  });

  it('gives partial credit inside Hangul syllables', () => {
    // 감사합니다 vs 감사함니다: one final consonant differs
    expect(transcriptSimilarity('감사합니다', ['감사함니다'])).toBeGreaterThan(0.9);
    expect(speakLevel('안녕하세요', ['안녕하세요'])).toBe('good');
  });
});
