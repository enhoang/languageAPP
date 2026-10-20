import type { CourseId, Gloss, LText, WordProgress } from '../types';

/**
 * Conversation practice: a chat with an AI partner (when an AI backend is configured) or prewritten
 * scenario practice (demo mode). Independent of the daily lessons; progress lives in localStorage `clc:conv`.
 */

export type ConvLang = CourseId;
export type ConvLevel = 'beginner' | 'elementary' | 'intermediate' | 'advanced';
export const CONV_LEVELS: ConvLevel[] = ['beginner', 'elementary', 'intermediate', 'advanced'];
export type ScenarioId = 'greetings' | 'daily' | 'shopping' | 'food' | 'travel' | 'hobbies' | 'work' | 'interview' | 'custom';
export const SCENARIOS: ScenarioId[] = ['greetings', 'daily', 'shopping', 'food', 'travel', 'hobbies', 'work', 'interview', 'custom'];
export type ConvMode = 'guided' | 'free';
/** language of explanations and feedback = the interface language */
export type ExplainLang = 'vi' | 'en' | 'zh';
export type HintLevel = 'word' | 'phrase' | 'sentence';
export const HINT_LEVELS: HintLevel[] = ['word', 'phrase', 'sentence'];

export interface ConvSetup {
  lang: ConvLang;
  level: ConvLevel;
  scenario: ScenarioId;
  /** only for scenario 'custom' */
  customTopic?: string;
  mode: ConvMode;
  explainLang: ExplainLang;
}

/**
 * Pronunciation aid in the target language's own system — never another language's:
 * Chinese → Hanyu Pinyin with tone marks; English → IPA (US/UK) and an optional plain respelling;
 * Korean → Revised Romanization (optional aid) and the actual pronunciation in Hangul with a sound-change note.
 */
export interface Pron {
  pinyin?: string;
  ipaUS?: string;
  ipaUK?: string;
  /** English only: easy respelling for beginners, e.g. "HEL-oh" */
  respelling?: string;
  romanization?: string;
  /** Korean only: actual pronunciation in Hangul when it differs from the spelling, e.g. "[한구거]" */
  spoken?: string;
  /** Korean sound-change note (batchim rules), English stress note, Chinese tone-sandhi note */
  note?: Gloss;
  /** 'course' = taken from the app's checked course data; 'ai' = generated, may contain mistakes; 'script' = prewritten */
  source?: 'course' | 'ai' | 'script';
}

export interface ReplyChip {
  text: string;
  translation: Gloss;
}

export interface FeedbackItem {
  /** 'mistake' = an actual error; 'style' = optional, more natural alternative */
  kind: 'mistake' | 'style';
  category: 'grammar' | 'vocabulary' | 'naturalness' | 'spelling' | 'word-order' | 'politeness';
  original: string;
  better: string;
  /** in the explanation language */
  explanation: string;
}

export interface Feedback {
  /** 'correct' = correct and natural (no items) · 'style' = correct, optional improvements · 'mistakes' = has errors */
  verdict: 'correct' | 'style' | 'mistakes';
  items: FeedbackItem[];
  /** full corrected sentence when there are mistakes */
  corrected?: string;
  /** short, level-appropriate encouragement in the explanation language */
  encouragement: string;
}

export interface ConvMessage {
  id: string;
  role: 'partner' | 'learner';
  text: string;
  at: string;
  translation?: Gloss;
  pron?: Pron;
  /** learner messages (AI mode): feedback on this message */
  feedback?: Feedback;
  /** learner messages (demo mode): prewritten sample answers to compare with */
  modelAnswers?: ReplyChip[];
}

export interface Suggestion {
  level: HintLevel;
  text: string;
  pron: Pron;
  meaning: Gloss;
  example: string;
  exampleTranslation: Gloss;
}

export interface SessionSummary {
  /** in the explanation language */
  overall: string;
  vocabulary: { text: string; pron: Pron; meaning: Gloss }[];
  corrections: { original: string; better: string; note: string }[];
  /** recommended review items, in the explanation language */
  review: string[];
}

export interface ScenarioIntro {
  /** in the explanation language */
  scenario: string;
  role: string;
}

/** Result of starting a conversation or answering a learner message. */
export interface TurnResult {
  intro?: ScenarioIntro;
  /** feedback on the learner's last message (AI mode, when enabled) */
  feedback?: Feedback;
  /** demo mode: sample answers to the previous partner line */
  modelAnswers?: ReplyChip[];
  partner: { text: string; translation: Gloss; pron?: Pron };
  /** suggested replies (never sent automatically) */
  replies: ReplyChip[];
  /** demo mode: the script has ended */
  scriptEnded?: boolean;
}

export type ProviderKind = 'ai' | 'demo';

export interface ConvSession {
  id: string;
  setup: ConvSetup;
  provider: ProviderKind;
  status: 'active' | 'paused' | 'finished';
  startedAt: string;
  updatedAt: string;
  endedAt?: string;
  intro?: ScenarioIntro;
  messages: ConvMessage[];
  /** latest suggested replies */
  replies: ReplyChip[];
  summary?: SessionSummary;
  /** demo mode: script id and position */
  demo?: { scriptId: string; turn: number };
}

export interface SavedPhrase {
  id: string;
  lang: ConvLang;
  text: string;
  pron: Pron;
  meaning: Gloss;
  example?: string;
  exampleTranslation?: Gloss;
  scenario: ScenarioId;
  sessionId?: string;
  difficult: boolean;
  savedAt: string;
  progress: WordProgress;
}

export interface ConvSettings {
  showTranslation: boolean;
  showPron: boolean;
  showDetails: boolean;
  /** ask the AI for feedback on each learner message */
  feedback: boolean;
  /** AI backend URL set by the learner (overrides the build-time VITE_CONVERSATION_API_URL) */
  apiUrl?: string;
  /** access code required by the backend, if its owner set one (not an API key) */
  accessCode?: string;
}

export interface ConvData {
  schemaVersion: number;
  sessions: ConvSession[];
  saved: Record<string, SavedPhrase>;
  reviews: { id: string; at: string; correct: boolean }[];
  settings: ConvSettings;
}

// ---------- prewritten scenario practice (demo mode) ----------

export interface DemoTurn {
  partner: { text: string; translation: Gloss; pron?: Pron };
  /** 2–3 sample replies, shown as suggestions and, after the learner answers, as model answers */
  replies: ReplyChip[];
}

export interface DemoScript {
  id: string;
  lang: ConvLang;
  scenario: Exclude<ScenarioId, 'custom'>;
  /** level the script is written for */
  level: ConvLevel;
  intro: { scenario: LText; role: LText };
  turns: DemoTurn[];
  /** "Suggest words" items for this scenario: ~6 words, ~5 phrases, ~4 sentences */
  suggestions: Suggestion[];
}
