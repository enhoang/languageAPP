import { describe, expect, it } from 'vitest';
import { dueQueue, introduceWord, reviewWord } from '../lib/srs';

const d = (s: string) => new Date(s);

describe('spaced repetition', () => {
  it('grows the interval on correct answers across days', () => {
    let p = reviewWord(undefined, true, d('2026-10-01T10:00:00'));
    expect(p.interval).toBe(1);
    expect(p.status).toBe('learning');
    p = reviewWord(p, true, d('2026-10-02T10:00:00'));
    expect(p.interval).toBe(3);
    expect(p.status).toBe('familiar');
    p = reviewWord(p, true, d('2026-10-05T10:00:00'));
    expect(p.interval).toBe(7);
  });
  it('only advances once per day', () => {
    let p = reviewWord(undefined, true, d('2026-10-01T10:00:00'));
    p = reviewWord(p, true, d('2026-10-01T11:00:00'));
    expect(p.interval).toBe(1);
    expect(p.correct).toBe(2);
  });
  it('resets on a wrong answer and makes the word due immediately', () => {
    let p = reviewWord(undefined, true, d('2026-10-01T10:00:00'));
    p = reviewWord(p, true, d('2026-10-02T10:00:00'));
    const now = d('2026-10-05T10:00:00');
    p = reviewWord(p, false, now);
    expect(p.interval).toBe(0);
    expect(p.lapses).toBe(1);
    expect(new Date(p.due!).getTime()).toBeLessThanOrEqual(now.getTime());
    // recovery step on the same day is allowed
    p = reviewWord(p, true, d('2026-10-05T10:05:00'));
    expect(p.interval).toBe(1);
  });
  it('introduced words are due tomorrow', () => {
    const p = introduceWord(undefined, d('2026-10-01T22:00:00'));
    expect(new Date(p.due!).toDateString()).toBe(d('2026-10-02T00:00:00').toDateString());
  });
  it('queue puts forgotten words first', () => {
    const now = d('2026-10-10T10:00:00');
    const ok = reviewWord(undefined, true, d('2026-10-01T10:00:00'));
    const forgotten = reviewWord(ok, false, d('2026-10-09T10:00:00'));
    const notDue = reviewWord(undefined, true, d('2026-10-10T09:00:00'));
    expect(dueQueue({ a: ok, b: forgotten, c: notDue }, now)).toEqual(['b', 'a']);
  });
});
