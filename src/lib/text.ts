/** Remove Vietnamese diacritics (and pinyin tone marks) for accent-insensitive search. Also fine for English. */
export function foldVietnamese(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

/**
 * Remove whitespace, punctuation and case for answer comparison (Chinese characters, Hangul,
 * word-order answers). Korean spacing mistakes are therefore not marked wrong.
 */
export function normalizeScript(s: string): string {
  return s.normalize('NFC').replace(/[\s\p{P}\p{S}]/gu, '').toLowerCase();
}

/** English spelling comparison: case, curly apostrophes, extra spaces and end punctuation are ignored. */
export function normalizeSpelling(s: string): string {
  return s
    .normalize('NFC')
    .replace(/[\u2018\u2019\u02BC]/g, "'")
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^[\s.,!?;:"]+|[\s.,!?;:"]+$/g, '');
}

/** Edit distance (insert / delete / substitute), for "almost right" spelling hints. */
export function levenshtein(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return row[b.length];
}

export function shuffle<T>(arr: readonly T[], rng: () => number = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Shuffle, trying to avoid returning the original order. */
export function shuffleChanged<T>(arr: readonly T[], rng: () => number = Math.random): T[] {
  if (arr.length < 2) return [...arr];
  for (let i = 0; i < 10; i++) {
    const s = shuffle(arr, rng);
    if (s.some((x, k) => x !== arr[k])) return s;
  }
  return [...arr].reverse();
}

export function sample<T>(arr: readonly T[], n: number, rng: () => number = Math.random): T[] {
  return shuffle(arr, rng).slice(0, n);
}
