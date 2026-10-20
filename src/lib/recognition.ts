/**
 * Speech recognition through the browser (Web Speech API: SpeechRecognition / webkitSpeechRecognition).
 * Free, but availability and accuracy vary a lot by browser, device and accent — Chrome sends audio to
 * its own service, Safari uses the OS, Firefox has none. Results are a rough hint, never a score.
 */
import { levenshtein, normalizeScript, normalizeSpelling } from './text';

interface RecognitionAlternative { transcript: string; confidence: number }
interface RecognitionResultEvent { results: ArrayLike<ArrayLike<RecognitionAlternative> & { isFinal: boolean }> }
interface Recognition {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  start(): void;
  abort(): void;
  onresult: ((e: RecognitionResultEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}
type RecognitionCtor = new () => Recognition;

function ctor(): RecognitionCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function recognitionSupported(): boolean {
  return ctor() !== null;
}

export type ListenError = 'unsupported' | 'no-speech' | 'not-allowed' | 'network' | 'other';

export interface ListenResult {
  ok: true;
  /** best guesses, most likely first */
  transcripts: string[];
}

/** Listen once in the given language (BCP 47, e.g. 'ko-KR'). Resolves when the learner stops speaking. */
export function listenOnce(lang: string, timeoutMs = 8000): { result: Promise<ListenResult | { ok: false; error: ListenError }>; cancel: () => void } {
  const C = ctor();
  if (!C) return { result: Promise.resolve({ ok: false, error: 'unsupported' }), cancel: () => {} };
  const rec = new C();
  rec.lang = lang;
  rec.interimResults = false;
  rec.maxAlternatives = 5;
  rec.continuous = false;
  let timer = 0;
  const result = new Promise<ListenResult | { ok: false; error: ListenError }>((resolve) => {
    let done = false;
    const finish = (v: ListenResult | { ok: false; error: ListenError }) => {
      if (done) return;
      done = true;
      window.clearTimeout(timer);
      resolve(v);
    };
    rec.onresult = (e) => {
      const first = e.results[0];
      const transcripts = first ? Array.from({ length: first.length }, (_, i) => first[i].transcript).filter(Boolean) : [];
      finish(transcripts.length ? { ok: true, transcripts } : { ok: false, error: 'no-speech' });
    };
    rec.onerror = (e) => finish({ ok: false, error: e.error === 'no-speech' ? 'no-speech' : e.error === 'not-allowed' || e.error === 'service-not-allowed' ? 'not-allowed' : e.error === 'network' ? 'network' : 'other' });
    rec.onend = () => finish({ ok: false, error: 'no-speech' });
    timer = window.setTimeout(() => { rec.abort(); finish({ ok: false, error: 'no-speech' }); }, timeoutMs);
    try {
      rec.start();
    } catch {
      finish({ ok: false, error: 'other' });
    }
  });
  return { result, cancel: () => rec.abort() };
}

/** Rough pronunciation levels, from worst to best. */
export const SPEAK_LEVELS = ['none', 'retry', 'improve', 'good'] as const;
export type SpeakLevel = (typeof SPEAK_LEVELS)[number];

/**
 * How close the best recognized transcript is to the target, 0–1. Case, spacing and punctuation are ignored;
 * text is compared after canonical decomposition, so a Hangul syllable or a toned Vietnamese/pinyin letter
 * that is partly right gets partial credit.
 */
export function transcriptSimilarity(target: string, transcripts: string[]): number {
  const loose = (s: string) => normalizeScript(normalizeSpelling(s)).normalize('NFD');
  const t = loose(target);
  if (!t) return 0;
  return Math.max(0, ...transcripts.map((x) => {
    const h = loose(x);
    return 1 - levenshtein(t, h) / Math.max(t.length, h.length);
  }));
}

/** Map similarity to a level: ≥ 90 % good · ≥ 70 % needs improvement · ≥ 40 % say it again · else not similar. */
export function speakLevel(target: string, transcripts: string[]): SpeakLevel {
  const s = transcriptSimilarity(target, transcripts);
  return s >= 0.9 ? 'good' : s >= 0.7 ? 'improve' : s >= 0.4 ? 'retry' : 'none';
}
