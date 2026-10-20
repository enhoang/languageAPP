import type { MasteryStatus, WordProgress } from '../types';
import { addDays, dayKey, startOfDay } from './dates';

/**
 * Simple spaced-repetition scheduler (a light SM-2 variant).
 *
 * - Correct answer: interval grows 0 → 1 → 3 → interval × ease (max 180 days).
 *   Only the first correct answer of a day advances the interval (unless the word
 *   was forgotten earlier — then one recovery step back to 1 day is allowed).
 * - Wrong answer: interval resets to 0, word is due immediately, ease −0.2 (min 1.3),
 *   lapses +1. Forgotten words are shown first in the review queue.
 * - Status: new (never reviewed) · learning (< 3 days) · familiar (3–20 days) · mastered (≥ 21 days).
 */

export const DEFAULT_EASE = 2.3;
export const MIN_EASE = 1.3;
export const MAX_EASE = 2.8;
export const MAX_INTERVAL = 180;

export function newWordProgress(): WordProgress {
  return {
    status: 'new',
    interval: 0,
    ease: DEFAULT_EASE,
    due: null,
    reps: 0,
    lapses: 0,
    correct: 0,
    incorrect: 0,
    lastReviewed: null,
    lastAdvanceDay: null,
    favorite: false,
    difficult: false,
  };
}

export function statusForInterval(interval: number, reps: number): MasteryStatus {
  if (reps === 0) return 'new';
  if (interval >= 21) return 'mastered';
  if (interval >= 3) return 'familiar';
  return 'learning';
}

export function nextInterval(interval: number, ease: number): number {
  if (interval <= 0) return 1;
  if (interval === 1) return 3;
  return Math.min(MAX_INTERVAL, Math.round(interval * ease));
}

export function reviewWord(prev: WordProgress | undefined, correct: boolean, now: Date = new Date()): WordProgress {
  const p: WordProgress = { ...(prev ?? newWordProgress()) };
  const today = dayKey(now);
  p.reps += 1;
  p.lastReviewed = now.toISOString();
  if (correct) {
    p.correct += 1;
    const canAdvance = p.lastAdvanceDay !== today || p.interval === 0;
    if (canAdvance) {
      p.interval = nextInterval(p.interval, p.ease);
      p.ease = Math.min(MAX_EASE, p.ease + 0.05);
      p.due = addDays(startOfDay(now), p.interval).toISOString();
      p.lastAdvanceDay = today;
    }
  } else {
    p.incorrect += 1;
    p.lapses += 1;
    p.ease = Math.max(MIN_EASE, p.ease - 0.2);
    p.interval = 0;
    p.due = now.toISOString();
  }
  p.status = statusForInterval(p.interval, p.reps);
  return p;
}

/** Mark lesson words as introduced: they become due for a first review tomorrow. */
export function introduceWord(prev: WordProgress | undefined, now: Date = new Date()): WordProgress {
  if (prev && prev.reps > 0) return prev;
  const p = { ...(prev ?? newWordProgress()) };
  p.due = addDays(startOfDay(now), 1).toISOString();
  p.status = 'learning';
  return p;
}

export function isDue(p: WordProgress | undefined, now: Date = new Date()): boolean {
  return !!p?.due && new Date(p.due).getTime() <= now.getTime();
}

/** Due word ids, forgotten/difficult words first, then most overdue. */
export function dueQueue(words: Record<string, WordProgress>, now: Date = new Date()): string[] {
  return Object.entries(words)
    .filter(([, p]) => isDue(p, now))
    .sort(([, a], [, b]) => {
      const fa = a.interval === 0 && a.lapses > 0 ? 1 : 0;
      const fb = b.interval === 0 && b.lapses > 0 ? 1 : 0;
      if (fa !== fb) return fb - fa;
      if (a.difficult !== b.difficult) return a.difficult ? -1 : 1;
      if (a.lapses !== b.lapses) return b.lapses - a.lapses;
      return new Date(a.due!).getTime() - new Date(b.due!).getTime();
    })
    .map(([id]) => id);
}

export function wordStatus(p: WordProgress | undefined): MasteryStatus {
  if (!p) return 'new';
  return p.reps === 0 && p.status !== 'learning' ? 'new' : p.status;
}

/** Display order. Labels: dictionary keys `common.status.<status>`. */
export const MASTERY_STATUSES: MasteryStatus[] = ['new', 'learning', 'familiar', 'mastered'];
