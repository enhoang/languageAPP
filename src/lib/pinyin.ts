/**
 * Pinyin comparison that accepts tone marks (nǐ hǎo) or tone numbers (ni3 hao3),
 * ignores case, spaces and apostrophes, and accepts v / u: for ü.
 */

const MARKED: Record<string, [string, number]> = {};
const VOWELS: Record<string, string> = { a: 'āáǎà', e: 'ēéěè', i: 'īíǐì', o: 'ōóǒò', u: 'ūúǔù', ü: 'ǖǘǚǜ' };
for (const [base, marks] of Object.entries(VOWELS)) {
  [...marks].forEach((m, i) => (MARKED[m] = [base, i + 1]));
}

export interface ParsedPinyin {
  letters: string;
  tones: number[];
}

export function parsePinyin(input: string): ParsedPinyin {
  const s = input.normalize('NFC').toLowerCase().replace(/u:/g, 'ü').replace(/v/g, 'ü');
  let letters = '';
  const tones: number[] = [];
  for (const ch of s) {
    const marked = MARKED[ch];
    if (marked) {
      letters += marked[0];
      tones.push(marked[1]);
    } else if (/[a-zü]/.test(ch)) {
      letters += ch;
    } else if (/[1-4]/.test(ch)) {
      tones.push(Number(ch));
    }
    // 5 / 0 (neutral tone), spaces, apostrophes and punctuation are ignored
  }
  return { letters, tones };
}

export type PinyinMatch = 'correct' | 'tone' | 'wrong';

export function comparePinyin(given: string, expected: string): PinyinMatch {
  const g = parsePinyin(given);
  const e = parsePinyin(expected);
  if (!g.letters || g.letters !== e.letters) return 'wrong';
  return g.tones.join(',') === e.tones.join(',') ? 'correct' : 'tone';
}

/** Remove tone marks: "nǐ hǎo" -> "ni hao". Used for search. */
export function stripTones(s: string): string {
  let out = '';
  for (const ch of s.normalize('NFC').toLowerCase()) out += MARKED[ch]?.[0] ?? ch;
  return out.replace(/ü/g, 'u');
}
