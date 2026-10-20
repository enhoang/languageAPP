// ---------- Localized text ----------

/** Interface language. Content in Chinese (the language being learned) is never translated. */
export type Lang = 'vi' | 'en' | 'zh';
/** Language used for meanings and translations of Chinese text. In the Chinese interface the learner picks one. */
export type GlossLang = 'vi' | 'en';

/** Prose (explanations, instructions, titles) written in all three interface languages. */
export interface LText {
  vi: string;
  en: string;
  zh: string;
}

/** Meaning / translation of a Chinese word or sentence. There is no Chinese version: the source is Chinese. */
export interface Gloss {
  vi: string;
  en: string;
}

/** A message from the interface dictionary (src/i18n/locales), resolved when rendered. */
export interface Msg {
  k: string;
  p?: Record<string, MsgParam>;
}
export type MsgParam = string | number | LText | Gloss | Msg | TxtSeq;

/** Several pieces joined together, e.g. "妈妈 = mẹ · 爸爸 = bố". */
export interface TxtSeq {
  seq: Txt[];
  sep?: string;
}

/**
 * Anything displayable. A plain string is language-neutral (Chinese, pinyin, numbers).
 * Resolve with `tr()` from `useI18n()`.
 */
export type Txt = string | LText | Gloss | Msg | TxtSeq;

// ---------- Courses (target languages) ----------

/**
 * A language being learned. Independent of the interface language (`Lang`):
 * e.g. a Vietnamese interface studying Korean.
 */
export type CourseId = 'zh' | 'en' | 'ko';

// ---------- Curriculum content ----------

export type StageId = 1 | 2 | 3 | 4;

export type Skill = 'vocabulary' | 'pronunciation' | 'grammar' | 'reading' | 'listening' | 'writing';

export type WordType =
  | 'noun'
  | 'pronoun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'number'
  | 'particle'
  | 'phrase'
  | 'proper-noun'
  | 'determiner'
  | 'preposition'
  | 'conjunction'
  | 'interjection';

export type TopicId =
  | 'basics'
  | 'family'
  | 'people'
  | 'greetings'
  | 'numbers'
  | 'food'
  | 'countries'
  | 'nature'
  | 'questions'
  | 'school'
  | 'time'
  | 'places'
  | 'daily'
  | 'feelings';

/**
 * Sentence in the target language with its meaning (Gloss fields `vi` / `en`).
 * `pron`: pinyin for Chinese; optional IPA for English; optional romanization for Korean.
 */
export interface Example extends Gloss {
  text: string;
  pron?: string;
}

/** Vocabulary entry of one course. `vi` / `en` hold the meaning (for English words, `en` is a simple English definition). */
export interface Word extends Gloss {
  /** stable id, unique within the course */
  id: string;
  /** written form: simplified characters (zh), the English word (en), Hangul (ko) */
  text: string;
  /** pronunciation aid: Hanyu Pinyin (zh), IPA – American by default (en), Revised Romanization (ko) */
  pron?: string;
  /** English: British IPA when it differs from `pron` */
  pronUK?: string;
  /** Korean: actual pronunciation in Hangul when it differs from the spelling, e.g. "[한구거]" */
  spoken?: string;
  type: WordType;
  topic: TopicId;
  stage: StageId;
  /** level in the course framework, e.g. "HSK 1", "Pre-A1", "TOPIK I · 1" */
  level: string;
  lessonId: string;
  example: Example;
  notes?: LText;
  /** text sent to speech synthesis when it differs from `text` */
  audio?: string;
}

/** A sound item that can be played (syllable, character, letter, phoneme). */
export interface SoundItem {
  label: string | LText; // e.g. "Thanh 1" (LText), "b", "ㄱ", "/iː/" (string)
  /** text sent to speech synthesis (and shown) */
  text: string;
  pron?: string;
  /** meaning of `text`, when shown */
  vi?: string;
  en?: string;
  note?: LText;
}

/** Text to say aloud in a speaking-practice block. */
export interface SpeakItem {
  text: string;
  pron?: string;
  vi?: string;
  en?: string;
}

export type LessonSection =
  | { kind: 'text'; title: LText; body: LText[] }
  | { kind: 'sounds'; title: LText; intro?: LText; items: SoundItem[] }
  | { kind: 'words'; title: LText; wordIds: string[] }
  | { kind: 'examples'; title: LText; examples: Example[] }
  | { kind: 'grammar'; grammarId: string }
  | { kind: 'tip'; title: LText; body: LText }
  /** say each item aloud: speech recognition when available, otherwise self-check */
  | { kind: 'speak'; title: LText; intro?: LText; items: SpeakItem[] }
  /** Chinese: stroke-order animation and writing practice for these characters */
  | { kind: 'strokes'; title: LText; intro?: LText; chars: string[] };

export interface Lesson {
  /** stable id, unique within the course */
  id: string;
  day: number;
  stage: StageId;
  title: LText;
  subtitle: LText;
  minutes: number;
  objectives: LText[];
  intro: LText[];
  sections: LessonSection[];
  wordIds: string[];
  grammarIds: string[];
  practice: Exercise[];
  quiz: Exercise[];
  summary: LText[];
  prerequisites: string[];
}

export interface GrammarPoint {
  id: string;
  lessonId: string;
  title: LText;
  pattern: LText;
  meaning: LText[];
  breakdown: { text: string; role: LText }[][];
  examples: Example[];
  mistakes: { wrong: string; right: string; why: LText }[];
  exercises: Exercise[];
}

export interface Stage {
  id: StageId;
  /** e.g. "Giai đoạn 1 · Nền tảng" */
  title: LText;
  /** short name without the "Stage n ·" prefix */
  name: LText;
  /** framework level covered, e.g. "HSK 1", "Pre-A1", "TOPIK I · 1" */
  level: string;
  description: LText;
}

/** Planned lesson that is not implemented yet (shown as "Coming soon"). */
export interface RoadmapItem {
  day: number;
  stage: StageId;
  title: LText;
  topics: LText;
}

/** Minimal pair / sound contrast for listening discrimination. */
export interface Contrast {
  title: LText;
  note: LText;
  items: ({ text: string; pron: string } & Gloss)[];
}

/** Chinese: one syllable in four tones. */
export interface ToneSet {
  base: string;
  items: ({ tone: 1 | 2 | 3 | 4; text: string; pron: string } & Gloss)[];
}

export interface SoundGroup {
  title: LText;
  intro?: LText;
  items: SoundItem[];
}

/** Pronunciation rule where writing and speech differ (tone sandhi, batchim linking, connected speech). */
export interface SoundRule {
  title: LText;
  body: LText;
  /** written: spelling / citation form; spoken: how it is actually said */
  examples: ({ text: string; written: string; spoken: string } & Gloss)[];
}

export type PronBlock =
  | { kind: 'sounds'; group: SoundGroup }
  | { kind: 'contrasts'; title: LText; intro?: LText; contrasts: Contrast[] }
  | { kind: 'rules'; title: LText; rules: SoundRule[] }
  /** Chinese: the course's tone sets, one row per syllable */
  | { kind: 'toneSets'; title: LText }
  | { kind: 'text'; title: LText; body: LText[] }
  | { kind: 'speak'; title: LText; intro?: LText; items: SpeakItem[] };

/** One tab of the Pronunciation page. */
export interface PronTab {
  id: string;
  title: LText;
  intro?: LText;
  blocks: PronBlock[];
}

/** Typing modes: pinyin / characters (zh), spelling (en), Hangul (ko). */
export type TypeMode = 'pinyin' | 'hanzi' | 'spelling' | 'hangul';

/** Everything that differs between target languages. Content lives in src/courses/<id>/. */
export interface Course {
  id: CourseId;
  /** the language's own name: 中文, English, 한국어 */
  endonym: string;
  /** e.g. { vi: 'Tiếng Trung', en: 'Chinese', zh: '中文' } */
  name: LText;
  tagline: LText;
  /** BCP 47 tag for speech synthesis / recognition and lang attributes */
  speechLang: string;
  /** CSS class for text in the target script */
  fontClass: string;
  /** name of the pronunciation aid: Pinyin, IPA, Romanization */
  pronName: LText;
  /** learning framework the roadmap follows, e.g. "HSK", "CEFR", "TOPIK" */
  framework: string;
  /** joins arrange tokens: '' for Chinese, ' ' otherwise */
  tokenJoiner: string;
  /** typing mode for "write the word" exercises */
  writeMode: Exclude<TypeMode, 'pinyin'>;
  /** Chinese only: typing the pinyin is also practised */
  typePron: boolean;
  lessons: Lesson[];
  words: Word[];
  grammar: GrammarPoint[];
  stages: Stage[];
  roadmap: RoadmapItem[];
  /** listening discrimination drills */
  contrasts: Contrast[];
  /** Chinese only */
  toneSets: ToneSet[];
  pronunciation: { intro: LText; tabs: PronTab[] };
}

// ---------- Exercises (authoring format, includes answer key) ----------

interface ExerciseBase {
  /** Stable id, unique within the course. Generated exercises encode how to rebuild them (see exerciseById). */
  id: string;
  skill: Skill;
  prompt: Txt;
  explanation: Txt;
  wordIds?: string[];
  grammarId?: string;
  lessonId?: string;
  /** target-language text shown with the prompt (optional) */
  text?: string;
  /** its pronunciation aid (pinyin, IPA, romanization) */
  pron?: string;
  /** Text spoken by the audio button */
  audio?: string;
}

export interface ChoiceExercise extends ExerciseBase {
  kind: 'choice';
  /** Plain strings for target-language text, LText for prose, Gloss for meanings. */
  options: Txt[];
  /** index of the correct option */
  answer: number;
  /** render options in the large target-language font */
  targetOptions?: boolean;
}

export interface MatchPair extends Gloss {
  text: string;
  pron?: string;
}

export interface MatchExercise extends ExerciseBase {
  kind: 'match';
  pairs: MatchPair[];
}

export interface ArrangeExercise extends ExerciseBase {
  kind: 'arrange';
  tokens: string[];
  /** accepted orders, written as the joined string (spaces, punctuation and case are ignored when grading) */
  answers: string[];
}

export interface TypeExercise extends ExerciseBase {
  kind: 'type';
  mode: TypeMode;
  accepted: string[];
}

export type Exercise = ChoiceExercise | MatchExercise | ArrangeExercise | TypeExercise;

// ---------- Presentation views (no answer keys) ----------

interface ViewBase {
  id: string;
  skill: Skill;
  prompt: Txt;
  text?: string;
  pron?: string;
  audio?: string;
}

export type ExerciseView =
  | (ViewBase & { kind: 'choice'; options: { key: string; text: Txt }[]; targetOptions?: boolean })
  | (ViewBase & { kind: 'match'; left: { text: string; pron?: string }[]; right: { key: string; text: Gloss }[] })
  | (ViewBase & { kind: 'arrange'; tokens: string[] })
  | (ViewBase & { kind: 'type'; mode: TypeMode; palette?: string[] });

export type ExerciseResponse =
  | { kind: 'choice'; value: string } // option key
  | { kind: 'match'; value: Record<string, string> } // left text -> chosen right key
  | { kind: 'arrange'; value: string[] }
  | { kind: 'type'; value: string };

export interface GradeResult {
  correct: boolean;
  /** displayable correct answer */
  correctAnswer: Txt;
  /** displayable submitted answer ('' when none) */
  given: Txt;
  /** for choice: key of the correct option */
  correctKey?: string;
  /** extra hint, e.g. right letters but wrong tone, or a spelling slip */
  hint?: Msg;
  /** for match: text of wrongly matched items */
  wrongKeys?: string[];
}

// ---------- Persisted learner data ----------

export type MasteryStatus = 'new' | 'learning' | 'familiar' | 'mastered';

export interface WordProgress {
  status: MasteryStatus;
  interval: number; // days
  ease: number;
  due: string | null; // ISO timestamp
  reps: number;
  lapses: number;
  correct: number;
  incorrect: number;
  lastReviewed: string | null;
  lastAdvanceDay: string | null; // YYYY-MM-DD
  favorite: boolean;
  difficult: boolean;
}

export interface LessonProgress {
  status: 'in_progress' | 'completed';
  step: number;
  startedAt: string;
  completedAt?: string;
  bestScore?: number; // percentage
  attempts: number;
}

export interface DayActivity {
  seconds: number;
  answers: number;
  correct: number;
  lessonsCompleted: number;
}

export type TestSkill = 'mixed' | 'vocabulary' | 'pronunciation' | 'grammar' | 'reading' | 'listening';

export interface QuizAttempt {
  id: string;
  at: string;
  kind: 'lesson' | 'test';
  /** kind 'lesson' */
  lessonId?: string;
  /** kind 'test' */
  testSkill?: TestSkill;
  correct: number;
  total: number;
  bySkill: Partial<Record<Skill, { correct: number; total: number }>>;
}

/** A wrongly answered exercise. The exercise itself is rebuilt from its id (exerciseById). */
export interface Mistake {
  id: string; // exercise id
  at: string;
  given: Txt;
  count: number;
  resolved: boolean;
}

/** All progress of one course. Courses never share progress records. */
export interface CourseProgress {
  lessons: Record<string, LessonProgress>;
  words: Record<string, WordProgress>;
  /** per calendar day; the streak and daily goal add up all courses */
  activity: Record<string, DayActivity>;
  skillStats: Partial<Record<Skill, { correct: number; total: number }>>;
  quizzes: QuizAttempt[];
  mistakes: Mistake[];
}

export interface Settings {
  sessionMinutes: 10 | 20 | 30;
  speechRate: number; // normal rate
  /** chosen speech voice per course (null = automatic) */
  voices: Partial<Record<CourseId, string | null>>;
  /** show pinyin / IPA / romanization */
  showPron: boolean;
  /** English course: accent for audio and IPA shown first */
  englishAccent: 'en-US' | 'en-GB';
}

export interface AppData {
  schemaVersion: number;
  createdAt: string;
  updatedAt: string;
  settings: Settings;
  /** course being studied now; null until the learner picks one */
  currentCourse: CourseId | null;
  courses: Record<CourseId, CourseProgress>;
}
