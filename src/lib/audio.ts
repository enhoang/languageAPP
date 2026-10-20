/**
 * Audio through the browser's built-in Web Speech API (free, no network API key).
 * Quality depends on the voices installed in the browser / operating system.
 */

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

const norm = (lang: string) => lang.replace('_', '-').toLowerCase();

/**
 * Voices for a language, best first.
 * - zh-CN: Mandarin — zh-CN, then zh-SG / zh-TW. Cantonese (zh-HK, yue) is excluded.
 * - en-US / en-GB: the requested accent first, then other English voices.
 * - ko-KR: Korean voices.
 */
export function voicesFor(speechLang: string): SpeechSynthesisVoice[] {
  if (!speechSupported()) return [];
  const all = window.speechSynthesis.getVoices();
  const want = norm(speechLang);
  const base = want.split('-')[0];
  const rank = (v: SpeechSynthesisVoice) => {
    const lang = norm(v.lang);
    if (base === 'zh') {
      if (/cantonese|粤|粵|hong kong/i.test(v.name) || lang.startsWith('zh-hk') || lang.startsWith('yue')) return 9;
      if (lang.startsWith('zh-cn') || lang === 'zh' || lang.startsWith('cmn')) return 0;
      if (lang.startsWith('zh-sg')) return 1;
      if (lang.startsWith('zh-tw')) return 2;
      return 9;
    }
    if (lang === want || lang.startsWith(`${want}-`)) return 0;
    if (lang === base || lang.startsWith(`${base}-`)) return 1;
    return 9;
  };
  return all
    .filter((v) => rank(v) < 9)
    .sort((a, b) => rank(a) - rank(b) || Number(b.localService) - Number(a.localService));
}

export function pickVoice(speechLang: string, voiceURI: string | null | undefined): SpeechSynthesisVoice | null {
  const voices = voicesFor(speechLang);
  return voices.find((v) => v.voiceURI === voiceURI) ?? voices[0] ?? null;
}

export interface SpeakOptions {
  lang: string;
  rate: number;
  voiceURI: string | null | undefined;
}

export function speak(text: string, { lang, rate, voiceURI }: SpeakOptions): boolean {
  if (!speechSupported()) return false;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  const voice = pickVoice(lang, voiceURI);
  if (voice) u.voice = voice;
  u.rate = rate;
  synth.speak(u);
  return true;
}

/** Subscribe to voice-list changes (voices load asynchronously in Chrome). */
export function onVoicesChanged(cb: () => void): () => void {
  if (!speechSupported()) return () => {};
  const synth = window.speechSynthesis;
  synth.addEventListener('voiceschanged', cb);
  return () => synth.removeEventListener('voiceschanged', cb);
}
