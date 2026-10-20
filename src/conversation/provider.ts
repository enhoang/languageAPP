import type { ConvMessage, ConvSettings, ConvSetup, DemoScript, HintLevel, ProviderKind, SessionSummary, Suggestion, TurnResult } from './types';
import { DEMO_SCRIPTS } from './demo';
import { enrichPron } from './pron';

/**
 * Where conversation turns come from. The UI only talks to this interface, so the AI provider can be replaced
 * (another backend, another model vendor) without touching the pages.
 *
 * - `ai`: a backend (server/ in this repo) that holds the API key and calls the model. The browser never sees a key.
 * - `demo`: prewritten scenario practice. It does not understand the learner's messages and says so in the UI.
 */
export interface ConversationProvider {
  kind: ProviderKind;
  start(setup: ConvSetup): Promise<TurnResult>;
  /** history ends with the learner's message */
  reply(setup: ConvSetup, history: ConvMessage[], opts: { feedback: boolean; demoTurn?: number; demoScriptId?: string }): Promise<TurnResult>;
  suggest(setup: ConvSetup, history: ConvMessage[], level: HintLevel, opts?: { demoScriptId?: string }): Promise<Suggestion[]>;
  summarize(setup: ConvSetup, history: ConvMessage[], opts?: { demoScriptId?: string }): Promise<SessionSummary>;
}

export class ConversationError extends Error {
  constructor(message: string, readonly kind: 'network' | 'auth' | 'rate' | 'server' | 'input' | 'refused') {
    super(message);
  }
}

// ---------- AI backend ----------

/** Backend URL: the learner's own setting, else the build-time VITE_CONVERSATION_API_URL (a public URL, not a secret). */
export function backendUrl(settings: ConvSettings): string | null {
  const url = settings.apiUrl || (import.meta.env.VITE_CONVERSATION_API_URL as string | undefined) || '';
  return url ? url.replace(/\/+$/, '') : null;
}

const forWire = (history: ConvMessage[]) => history.map((m) => ({ role: m.role, text: m.text }));

export class HttpProvider implements ConversationProvider {
  kind = 'ai' as const;
  constructor(private base: string, private accessCode?: string, private fetchImpl: typeof fetch = (...a) => fetch(...a)) {}

  private async call<T>(body: Record<string, unknown>): Promise<T> {
    let res: Response;
    try {
      res = await this.fetchImpl(`${this.base}/api/conversation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(this.accessCode ? { 'X-Access-Code': this.accessCode } : {}) },
        body: JSON.stringify(body),
      });
    } catch {
      throw new ConversationError('network', 'network');
    }
    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      /* non-JSON error page */
    }
    if (!res.ok) {
      const msg = (data as { error?: string } | null)?.error ?? `HTTP ${res.status}`;
      const kind = res.status === 401 || res.status === 403 ? 'auth' : res.status === 429 || res.status === 503 ? 'rate' : res.status === 400 ? 'input' : res.status === 422 ? 'refused' : 'server';
      throw new ConversationError(msg, kind);
    }
    return data as T;
  }

  /** Check the backend: reachable, and whether it needs an access code. */
  static async health(base: string, fetchImpl: typeof fetch = (...a) => fetch(...a)): Promise<{ ok: boolean; accessCodeRequired?: boolean; model?: string }> {
    try {
      const r = await fetchImpl(`${base.replace(/\/+$/, '')}/health`);
      if (!r.ok) return { ok: false };
      const j = (await r.json()) as { ok?: boolean; accessCodeRequired?: boolean; model?: string };
      return { ok: j.ok === true, accessCodeRequired: j.accessCodeRequired, model: j.model };
    } catch {
      return { ok: false };
    }
  }

  async start(setup: ConvSetup) {
    return enrichTurn(setup, await this.call<TurnResult>({ action: 'start', setup, history: [] }));
  }
  async reply(setup: ConvSetup, history: ConvMessage[], opts: { feedback: boolean }) {
    return enrichTurn(setup, await this.call<TurnResult>({ action: 'reply', setup, history: forWire(history), feedback: opts.feedback }));
  }
  async suggest(setup: ConvSetup, history: ConvMessage[], level: HintLevel) {
    const r = await this.call<{ items: Omit<Suggestion, 'level'>[] }>({ action: 'suggest', setup, history: forWire(history), hintLevel: level });
    return r.items.map((x) => ({ ...x, level, pron: enrichPron(setup.lang, x.text, x.pron) ?? {} }));
  }
  async summarize(setup: ConvSetup, history: ConvMessage[]) {
    const r = await this.call<SessionSummary>({ action: 'summary', setup, history: forWire(history) });
    return { ...r, vocabulary: r.vocabulary.map((v) => ({ ...v, pron: enrichPron(setup.lang, v.text, v.pron) ?? {} })) };
  }
}

const enrichTurn = (setup: ConvSetup, t: TurnResult): TurnResult => ({ ...t, partner: { ...t.partner, pron: enrichPron(setup.lang, t.partner.text, t.partner.pron) } });

// ---------- demo: prewritten scenario practice ----------

/** The demo script for a setup: same language and scenario (custom topics fall back to daily life). */
export function demoScriptFor(setup: ConvSetup): DemoScript | undefined {
  const scenario = setup.scenario === 'custom' ? 'daily' : setup.scenario;
  return DEMO_SCRIPTS.find((s) => s.lang === setup.lang && s.scenario === scenario);
}

const scriptById = (id?: string) => DEMO_SCRIPTS.find((s) => s.id === id);

export class DemoProvider implements ConversationProvider {
  kind = 'demo' as const;

  async start(setup: ConvSetup): Promise<TurnResult> {
    const script = demoScriptFor(setup);
    if (!script) throw new ConversationError('no demo script', 'input');
    const first = script.turns[0];
    const pick = (l: { vi: string; en: string; zh: string }) => l[setup.explainLang];
    return { intro: { scenario: pick(script.intro.scenario), role: pick(script.intro.role) }, partner: first.partner, replies: first.replies, scriptEnded: script.turns.length === 1 };
  }

  /** Next prewritten line. The learner's message is not analysed; the previous line's sample answers are returned to compare with. */
  async reply(_setup: ConvSetup, _history: ConvMessage[], opts: { feedback?: boolean; demoTurn?: number; demoScriptId?: string }): Promise<TurnResult> {
    const script = scriptById(opts.demoScriptId);
    const i = opts.demoTurn ?? 0; // index of the partner line just answered
    if (!script) throw new ConversationError('no demo script', 'input');
    const answered = script.turns[i];
    const next = script.turns[i + 1];
    if (!next) throw new ConversationError('script ended', 'input');
    return { modelAnswers: answered?.replies ?? [], partner: next.partner, replies: next.replies, scriptEnded: i + 2 >= script.turns.length };
  }

  async suggest(setup: ConvSetup, _history: ConvMessage[], level: HintLevel, opts?: { demoScriptId?: string }): Promise<Suggestion[]> {
    const script = scriptById(opts?.demoScriptId) ?? demoScriptFor(setup);
    return (script?.suggestions ?? []).filter((s) => s.level === level);
  }

  /** Demo summary: the scenario's key vocabulary and the learner's own sentences; no corrections (nothing was evaluated). */
  async summarize(setup: ConvSetup, history: ConvMessage[], opts?: { demoScriptId?: string }): Promise<SessionSummary> {
    const script = scriptById(opts?.demoScriptId) ?? demoScriptFor(setup);
    return {
      overall: '',
      vocabulary: (script?.suggestions ?? []).filter((s) => s.level !== 'sentence').slice(0, 8).map((s) => ({ text: s.text, pron: s.pron, meaning: s.meaning })),
      corrections: [],
      review: history.filter((m) => m.role === 'learner').map((m) => m.text),
    };
  }
}

/** The provider to use: the AI backend when one is configured, otherwise the demo. */
export function providerFor(settings: ConvSettings): ConversationProvider {
  const url = backendUrl(settings);
  return url ? new HttpProvider(url, settings.accessCode) : new DemoProvider();
}
