import type { LText, WordProgress } from '../types';

/**
 * ISTQB & QA Knowledge module — independent of the language courses.
 *
 * Provenance rules:
 * - Source material (syllabus text, glossary definitions, learning objectives, keywords, page numbers) is
 *   extracted from the imported PDFs by scripts/qa/extract-pdf.mjs into src/qa/content/extracted/*.json and is
 *   shown verbatim with its reference. It is never retyped or paraphrased in code.
 * - Everything written for this app — translations, explanations, examples, key points, practice questions —
 *   is "supplementary" and always labelled as such in the UI. Practice questions are never presented as
 *   official ISTQB exam questions.
 */
export type Provenance = 'source' | 'supplementary';

/** An imported document (PDF). */
export interface SourceDoc {
  id: string;
  title: string;
  issuer?: string;
  version?: string;
  date?: string;
  license?: string;
  fileName: string;
  pageCount: number;
  extraction: 'text' | 'ocr' | 'mixed';
  /** pages whose text could not be read (blank, scanned without usable OCR, images) */
  unreadablePages: number[];
  /** remarks: scope, quality issues, differences from other versions (supplementary) */
  notes?: LText;
}

/** Where something comes from. `page` is the PDF page number (1-based; equal to the printed page in both sources). */
export interface SourceRef {
  doc: string;
  page?: number;
  /** chapter / section number, e.g. "4.2.1" */
  section?: string;
}

// ---------- extracted (source) data, see src/qa/content/extracted ----------

export interface ExtractedTerm {
  term: string;
  version: number;
  definition: string;
  page: number;
  termType?: string;
  abbreviation?: string;
  reference?: string;
  synonyms?: string[];
  seeAlso?: string[];
}

export interface ExtractedSection {
  number: string;
  title: string;
  page: number;
  endPage: number;
  minutes?: number;
  text: string;
}

export interface ExtractedObjective {
  code: string;
  level: string;
  text: string;
  page: number;
}

// ---------- authored (supplementary) content, see src/qa/content/topics and glossary ----------

/** Translations of a glossary term name. Written for this app. */
export interface TermName {
  vi: string;
  zh: string;
}

/** Explanation and learning aids for a glossary term. Written for this app. */
export interface TermNotes {
  explanation: LText;
  /** practical example from a QA project */
  example?: LText;
  /** commonly confused terms (term ids) and what tells them apart */
  confusedWith?: { id: string; note: LText }[];
  /** where the glossary wording differs from how the syllabus uses the term, or another caveat */
  versionNote?: LText;
}

/** Supplementary teaching material for one syllabus section. */
export interface SectionNotes {
  /** section number as in the syllabus, e.g. "4.2.2" */
  number: string;
  explain: LText;
  example?: LText;
  keyPoints?: LText[];
  /** the source is ambiguous or incomplete here */
  uncertain?: LText;
  /** glossary term ids discussed in this section */
  termIds?: string[];
}

/** A practice question written for this app from the source material (never an official exam question). */
export interface QaQuestion {
  id: string;
  /** chapter id, e.g. "ch4" */
  topicId: string;
  difficulty: 1 | 2 | 3;
  /** cognitive level of the related learning objective */
  kLevel?: 'K1' | 'K2' | 'K3';
  /** learning objective code, e.g. "FL-4.2.2" */
  objective?: string;
  tags: string[];
  scenario?: LText;
  stem: LText;
  options: LText[];
  /** index of the correct option */
  answer: number;
  explanation: LText;
  /** why each option is wrong (null for the correct one or when not useful) */
  optionNotes?: (LText | null)[];
  ref: SourceRef;
  termIds?: string[];
}

/** Authored content for one syllabus chapter (src/qa/content/topics/chN.ts). */
export interface ChapterContent {
  id: string;
  /** chapter number in the syllabus */
  number: string;
  titleTr: LText;
  summary: LText;
  keyPoints: LText[];
  /** explanation of each learning objective of the chapter, by code */
  objectives: Record<string, LText>;
  sections: SectionNotes[];
  questions: QaQuestion[];
}

// ---------- runtime model (built in src/qa/content/index.ts) ----------

export interface QaTerm {
  /** stable id (slug of the English term) */
  id: string;
  term: string;
  abbreviation?: string;
  synonyms: string[];
  seeAlso: string[];
  name?: TermName;
  /** definition as given in the glossary */
  definition: { text: string; ref: SourceRef; reference?: string };
  notes?: TermNotes;
  /** chapters (topic ids) where the term is a keyword or indexed */
  topicIds: string[];
  /** syllabus pages that discuss the term (from the syllabus index) */
  syllabusPages: number[];
  /** listed as a keyword of a CTFL chapter (must be remembered, K1) */
  keyword: boolean;
}

export interface LearningObjective extends ExtractedObjective {
  explain?: LText;
}

export interface QaSection {
  number: string;
  title: string;
  page: number;
  endPage: number;
  notes?: SectionNotes;
}

export interface QaTopic {
  id: string;
  number: string;
  /** English title as in the syllabus */
  title: string;
  minutes?: number;
  page: number;
  endPage: number;
  content?: ChapterContent;
  objectives: LearningObjective[];
  sections: QaSection[];
  keywordIds: string[];
  questionIds: string[];
}

/** A practice exam format. The official exam structure documents were not imported, so formats are the app's own. */
export interface ExamSpec {
  id: string;
  title: LText;
  questionCount: number;
  minutes: number;
  /** percentage needed to "pass" this practice set */
  passPercent: number;
  /** questions per topic */
  perTopic: Record<string, number>;
  /** how the format was derived */
  basis: LText;
}

// ---------- progress (localStorage `clc:qa`, separate from language learning) ----------

/** How much interface-language help terminology practice shows: always, on tap, or English only. */
export type Assist = 'full' | 'tap' | 'none';

export interface QaTermProgress extends WordProgress {
  /** learner's own mark in Learn mode */
  mark?: 'understood' | 'review';
}

export interface QaAttempt {
  id: string;
  at: string;
  kind: 'topic' | 'terms' | 'mixed' | 'exam';
  topicId?: string;
  examId?: string;
  correct: number;
  total: number;
  seconds?: number;
  passed?: boolean;
  byTopic: Record<string, { correct: number; total: number }>;
}

export interface QaContent {
  sources: SourceDoc[];
  topics: QaTopic[];
  terms: QaTerm[];
  questions: QaQuestion[];
  exams: ExamSpec[];
}

export interface QaProgress {
  schemaVersion: number;
  createdAt: string;
  updatedAt: string;
  topics: Record<string, { status: 'in_progress' | 'completed'; startedAt: string; completedAt?: string; readSections: string[] }>;
  terms: Record<string, QaTermProgress>;
  /** flashcard / term review history (most recent first, capped) */
  reviews: { id: string; at: string; correct: boolean }[];
  attempts: QaAttempt[];
  /** wrongly answered questions / terms: item id ("q:<id>" or "t:<id>") -> count */
  misses: Record<string, { count: number; lastAt: string; resolved: boolean }>;
  settings: { assist: Assist };
}
