import type { ExamSpec, QaQuestion, QaTerm, SourceRef } from './types';
import { CTFL_DOC, QUESTIONS, TERMS, TERM_BY_ID, TOPICS, sectionText } from './content';
import { shuffle } from '../lib/text';

type Rng = () => number;

/**
 * One quiz item. Terminology items are generated from the glossary definitions and syllabus sentences
 * (source material); `question` items are practice questions written for this app.
 * Item ids: "q:<questionId>" or "t:<termId>:<kind>" — misses are recorded per id.
 */
export type QaItem =
  | { kind: 'question'; id: string; question: QaQuestion }
  /** show the glossary definition, choose the term */
  | { kind: 'defToTerm'; id: string; termId: string; options: string[] }
  /** show the term, choose its glossary definition */
  | { kind: 'termToDef'; id: string; termId: string; options: string[] }
  /** show the term, choose its Vietnamese / Chinese name (interface-language assisted) */
  | { kind: 'termToName'; id: string; termId: string; options: string[] }
  /** match terms with definitions */
  | { kind: 'match'; id: string; termIds: string[] }
  /** a syllabus sentence with the term blanked out */
  | { kind: 'fill'; id: string; termId: string; sentence: string; ref: SourceRef; options: string[] }
  /** two commonly confused terms: which one does the definition describe? */
  | { kind: 'confused'; id: string; termId: string; otherId: string };

export type TermMode = 'defToTerm' | 'termToDef' | 'termToName' | 'match' | 'fill' | 'confused';

/** Term ids of the item (for spaced repetition). */
export function itemTermIds(item: QaItem): string[] {
  switch (item.kind) {
    case 'question': return item.question.termIds ?? [];
    case 'match': return item.termIds;
    default: return [item.termId];
  }
}

/** Distractor terms, preferring terms of the same chapter, never synonyms of each other. */
function distractors(t: QaTerm, n: number, rng: Rng, pool: QaTerm[] = TERMS): string[] {
  const near = pool.filter((x) => x.id !== t.id && x.topicIds.some((c) => t.topicIds.includes(c)));
  const far = pool.filter((x) => x.id !== t.id);
  const out: string[] = [];
  const bad = new Set([t.id, ...t.synonyms.map((s) => s.toLowerCase()), ...t.seeAlso.map((s) => s.toLowerCase())]);
  for (const x of [...shuffle(near, rng), ...shuffle(far, rng)]) {
    if (out.length >= n) break;
    if (bad.has(x.id) || bad.has(x.term.toLowerCase()) || out.includes(x.id) || x.definition.text === t.definition.text) continue;
    out.push(x.id);
  }
  return out;
}

const withAnswer = (answer: string, wrong: string[], rng: Rng) => shuffle([answer, ...wrong], rng);

/** Sentences of the syllabus that contain the term (whole words), with their page. */
export function syllabusSentences(t: QaTerm): { sentence: string; ref: SourceRef }[] {
  const out: { sentence: string; ref: SourceRef }[] = [];
  const escaped = t.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`\\b${escaped}\\b`, 'i');
  const all = new RegExp(`\\b${escaped}\\b`, 'gi');
  for (const topic of TOPICS) {
    for (const s of topic.sections) {
      const text = sectionText(s.number)?.text ?? '';
      for (const raw of text.replace(/\n/g, ' ').split(/(?<=[.!?])\s+(?=[A-Z])/)) {
        const sentence = raw.replace(/^•\s*/, '').trim();
        if (sentence.length < 40 || sentence.length > 260 || !re.test(sentence)) continue;
        // Avoid sentences that define several keywords at once (ambiguous blanks).
        if ((sentence.match(all) ?? []).length > 1) continue;
        out.push({ sentence: sentence.replace(re, '_____'), ref: { doc: CTFL_DOC, page: s.page, section: s.number } });
      }
    }
  }
  return out;
}

export function termItem(t: QaTerm, mode: TermMode, rng: Rng = Math.random): QaItem | null {
  switch (mode) {
    case 'defToTerm': return { kind: 'defToTerm', id: `t:${t.id}:def`, termId: t.id, options: withAnswer(t.id, distractors(t, 3, rng), rng) };
    case 'termToDef': return { kind: 'termToDef', id: `t:${t.id}:term`, termId: t.id, options: withAnswer(t.id, distractors(t, 3, rng), rng) };
    case 'termToName': {
      if (!t.name) return null;
      const named = TERMS.filter((x) => x.name);
      return { kind: 'termToName', id: `t:${t.id}:name`, termId: t.id, options: withAnswer(t.id, distractors(t, 3, rng, named), rng) };
    }
    case 'match': {
      const others = distractors(t, 3, rng).filter((id) => TERM_BY_ID[id].definition.text.length < 220);
      return others.length >= 2 ? { kind: 'match', id: `t:${t.id}:match`, termIds: shuffle([t.id, ...others], rng) } : null;
    }
    case 'fill': {
      const s = syllabusSentences(t);
      if (!s.length) return null;
      const pick = s[Math.floor(rng() * s.length)];
      return { kind: 'fill', id: `t:${t.id}:fill`, termId: t.id, sentence: pick.sentence, ref: pick.ref, options: withAnswer(t.id, distractors(t, 3, rng), rng) };
    }
    case 'confused': {
      const c = t.notes?.confusedWith?.find((x) => TERM_BY_ID[x.id]);
      return c ? { kind: 'confused', id: `t:${t.id}:confused`, termId: t.id, otherId: c.id } : null;
    }
  }
}

/** A terminology quiz over the given terms, cycling through the requested modes. */
export function termQuiz(termIds: string[], modes: TermMode[], count: number, rng: Rng = Math.random): QaItem[] {
  const out: QaItem[] = [];
  const ids = shuffle(termIds, rng);
  for (let i = 0; out.length < count && i < ids.length * modes.length; i++) {
    const t = TERM_BY_ID[ids[i % ids.length]];
    const mode = modes[Math.floor(i / ids.length + i) % modes.length];
    const item = t ? termItem(t, mode, rng) : null;
    if (item && !out.some((x) => x.id === item.id)) out.push(item);
  }
  return out;
}

export const questionItem = (q: QaQuestion): QaItem => ({ kind: 'question', id: `q:${q.id}`, question: q });

/** Topic quiz: the chapter's practice questions first, topped up with terminology items on its keywords. */
export function topicQuiz(topicId: string, count: number, rng: Rng = Math.random): QaItem[] {
  const topic = TOPICS.find((t) => t.id === topicId);
  if (!topic) return [];
  const qs = shuffle(QUESTIONS.filter((q) => q.topicId === topicId), rng).slice(0, count).map(questionItem);
  const rest = count - qs.length;
  // keywords first, then every glossary term the chapter discusses
  const termIds = [...new Set([...topic.keywordIds, ...TERMS.filter((t) => t.topicIds.includes(topicId)).map((t) => t.id)])];
  return shuffle([...qs, ...(rest > 0 ? termQuiz(termIds, ['defToTerm', 'fill', 'termToDef'], rest, rng) : [])], rng);
}

/** Whether an exam format can be built from the available practice questions, and what is missing. */
export function examAvailability(spec: ExamSpec): { ok: boolean; missing: Record<string, number> } {
  const missing: Record<string, number> = {};
  for (const [topicId, n] of Object.entries(spec.perTopic)) {
    const have = QUESTIONS.filter((q) => q.topicId === topicId).length;
    if (have < n) missing[topicId] = n - have;
  }
  return { ok: Object.keys(missing).length === 0, missing };
}

/** Practice exam: only practice questions (no generated terminology items), per-chapter counts from the spec. */
export function buildExam(spec: ExamSpec, rng: Rng = Math.random): QaItem[] | null {
  if (!examAvailability(spec).ok) return null;
  const items = Object.entries(spec.perTopic).flatMap(([topicId, n]) => shuffle(QUESTIONS.filter((q) => q.topicId === topicId), rng).slice(0, n).map(questionItem));
  return shuffle(items, rng);
}

/** Review session: due terms and unresolved misses. */
export function reviewQuiz(dueTermIds: string[], missIds: string[], count: number, rng: Rng = Math.random): QaItem[] {
  const fromMisses = missIds.flatMap((id): QaItem[] => {
    if (id.startsWith('q:')) {
      const q = QUESTIONS.find((x) => `q:${x.id}` === id);
      return q ? [questionItem(q)] : [];
    }
    const [, termId, kind] = id.split(':');
    const t = TERM_BY_ID[termId];
    const mode = ({ def: 'defToTerm', term: 'termToDef', name: 'termToName', match: 'match', fill: 'fill', confused: 'confused' } as const)[kind as 'def'] ?? 'defToTerm';
    // Keep the miss id (e.g. flashcard misses "t:<id>:card"), so a correct answer resolves that miss.
    const item = t ? termItem(t, mode, rng) ?? termItem(t, 'defToTerm', rng) : null;
    return item ? [{ ...item, id }] : [];
  });
  const fromDue = termQuiz(dueTermIds.filter((id) => !missIds.some((m) => m.startsWith(`t:${id}:`))), ['defToTerm', 'termToDef', 'fill'], count, rng);
  const seen = new Set<string>();
  return [...fromMisses, ...fromDue].filter((x) => (seen.has(x.id) ? false : (seen.add(x.id), true))).slice(0, count);
}

/** Correct option for single-answer items (the term id, or the question's option index as string). */
export function correctKey(item: QaItem): string | null {
  switch (item.kind) {
    case 'question': return String(item.question.answer);
    case 'defToTerm': case 'termToDef': case 'termToName': case 'fill': case 'confused': return item.termId;
    case 'match': return null;
  }
}

/** Grade a response: an option key, or for match a map termId → chosen definition's termId. */
export function gradeItem(item: QaItem, response: string | Record<string, string>): boolean {
  if (item.kind === 'match') {
    const r = response as Record<string, string>;
    return item.termIds.every((id) => r[id] === id);
  }
  return response === correctKey(item);
}
