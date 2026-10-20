/**
 * Speech recognition through the browser (Web Speech API: SpeechRecognition / webkitSpeechRecognition).
 * Free, but availability and accuracy vary a lot by browser, device and accent — Chrome sends audio to
 * its own service, Safari uses the OS, Firefox has none. Results are a rough hint, never a score.
 */
import { normalizeScript, normalizeSpelling } from './text';

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

/** Does any recognized transcript match the target text? Case, spacing and punctuation are ignored. */
export function transcriptMatches(target: string, transcripts: string[]): boolean {
  const loose = (s: string) => normalizeScript(normalizeSpelling(s));
  const t = loose(target);
  return transcripts.some((x) => loose(x) === t);
}
