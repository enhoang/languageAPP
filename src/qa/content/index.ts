import type { ChapterContent, ExamSpec, ExtractedObjective, ExtractedSection, ExtractedTerm, QaContent, QaQuestion, QaTerm, QaTopic, SourceDoc } from '../types';
import ctfl from './extracted/ctfl-v4.0.1.json';
import glossary from './extracted/glossary-4.8.1.json';
import { TERM_NAMES } from './glossary/names';
import { NOTES_A } from './glossary/notes-a';
import { NOTES_B } from './glossary/notes-b';
import { NOTES_C } from './glossary/notes-c';
import { CH1 } from './topics/ch1';
import { CH2 } from './topics/ch2';
import { CH3 } from './topics/ch3';
import { CH4 } from './topics/ch4';
import { CH5 } from './topics/ch5';
import { CH6 } from './topics/ch6';

/**
 * The ISTQB & QA module content: extracted source data (verbatim, with page numbers) merged with
 * supplementary material written for this app. See src/qa/types.ts for the provenance rules.
 */

export const CTFL_DOC = 'ctfl401';
export const GLOSSARY_DOC = 'glossary481';

/** Stable id of a glossary term: slug of the English term. */
export function termId(term: string): string {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const SECTIONS = ctfl.sections as ExtractedSection[];
const OBJECTIVES = ctfl.objectives as ExtractedObjective[];
const KEYWORDS = ctfl.keywords as Record<string, string[]>;
const INDEX = ctfl.index as { term: string; pages?: number[]; see?: string }[];
const TERMS_RAW = glossary.terms as ExtractedTerm[];

export const SOURCES: SourceDoc[] = [
  {
    ...ctfl.doc,
    extraction: 'text',
    unreadablePages: ctfl.unreadablePages,
    notes: {
      vi: 'Nguồn chính của lộ trình học: 6 chương có nội dung thi (chương 1–6), mục tiêu học tập, từ khóa và chỉ mục. Phần Giới thiệu và Phụ lục không thuộc phạm vi thi (trang 12). Cấu trúc đề thi chính thức nằm trong tài liệu “Exam Structures and Rules” và “Exam Structure Tables” — chưa được nhập vào ứng dụng.',
      en: 'Main source of the learning path: the six examinable chapters (1–6), learning objectives, keywords and index. The Introduction and Appendices are not examinable (page 12). The official exam structure is in the documents “Exam Structures and Rules” and “Exam Structure Tables”, which have not been imported.',
      zh: '学习路线的主要来源：六个可考章节（第1–6章）、学习目标、关键词和索引。引言和附录不在考试范围内（第12页）。官方考试结构见《Exam Structures and Rules》和《Exam Structure Tables》，这两份文件尚未导入。',
    },
  },
  {
    ...glossary.doc,
    extraction: 'text',
    unreadablePages: glossary.unreadablePages,
    notes: {
      vi: 'Bản xuất kết quả tìm kiếm của Thuật ngữ ISTQB phiên bản 4.8.1 (lọc theo loại “Quality and testing”), mới hơn giáo trình CTFL v4.0.1 (2024). Một vài định nghĩa có thể khác cách diễn đạt trong giáo trình; khi học cho kỳ thi CTFL, hãy ưu tiên nội dung giáo trình. Bản xuất không chứa mọi thuật ngữ của bộ thuật ngữ đầy đủ.',
      en: 'A search export of the ISTQB Glossary v4.8.1 (filtered to term type “Quality and testing”), newer than the CTFL v4.0.1 syllabus (2024). Some definitions may be worded differently from the syllabus; when studying for the CTFL exam, the syllabus takes precedence. The export does not contain every term of the full glossary.',
      zh: 'ISTQB 术语表 v4.8.1 的检索结果导出（按“Quality and testing”类型筛选），比 CTFL v4.0.1 大纲（2024）更新。部分定义的措辞可能与大纲不同；备考 CTFL 时以大纲为准。该导出并不包含完整术语表中的所有术语。',
    },
  },
];

export const SYLLABUS = { name: 'ISTQB® Certified Tester Foundation Level', version: 'v4.0.1', ref: { doc: CTFL_DOC, page: 1 } };

const CHAPTERS: ChapterContent[] = [CH1, CH2, CH3, CH4, CH5, CH6];

// ---------- glossary ----------

const chapterOfPage = (page: number): string | undefined => {
  for (const ch of ['1', '2', '3', '4', '5', '6']) {
    const s = SECTIONS.find((x) => x.number === ch);
    const next = SECTIONS.find((x) => x.number === String(Number(ch) + 1));
    if (s && page >= s.page && page < (next?.page ?? 61)) return `ch${ch}`;
  }
  return undefined;
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const keywordChapters = new Map<string, string[]>();
for (const [ch, list] of Object.entries(KEYWORDS)) {
  for (const k of list) keywordChapters.set(norm(k), [...(keywordChapters.get(norm(k)) ?? []), `ch${ch}`]);
}
const indexPages = new Map<string, number[]>();
for (const e of INDEX) if (e.pages) indexPages.set(norm(e.term), e.pages);

const NOTES = { ...NOTES_A, ...NOTES_B, ...NOTES_C };

export const TERMS: QaTerm[] = TERMS_RAW.map((t) => {
  const id = termId(t.term);
  const k = norm(t.term);
  const pages = indexPages.get(k) ?? [];
  const kwCh = keywordChapters.get(k) ?? [];
  const topicIds = [...new Set([...kwCh, ...pages.map(chapterOfPage).filter((x): x is string => !!x)])].sort();
  return {
    id,
    term: t.term,
    abbreviation: t.abbreviation,
    synonyms: t.synonyms ?? [],
    seeAlso: t.seeAlso ?? [],
    name: TERM_NAMES[id],
    definition: { text: t.definition, ref: { doc: GLOSSARY_DOC, page: t.page }, reference: t.reference },
    notes: NOTES[id],
    topicIds,
    syllabusPages: pages,
    keyword: kwCh.length > 0,
  };
});

export const TERM_BY_ID: Record<string, QaTerm> = Object.fromEntries(TERMS.map((t) => [t.id, t]));

/** Glossary term for a phrase used in the syllabus ("defects" → defect), if any. */
export function findTerm(phrase: string): QaTerm | undefined {
  const k = norm(phrase);
  return TERMS.find((t) => norm(t.term) === k) ?? TERMS.find((t) => norm(t.term) === k.replace(/s$/, ''));
}

/** Chapter keywords that do not appear in the imported glossary export (shown as such, never invented). */
export const KEYWORDS_NOT_IN_GLOSSARY: { chapter: string; keyword: string }[] = Object.entries(KEYWORDS)
  .flatMap(([ch, list]) => list.map((keyword) => ({ chapter: `ch${ch}`, keyword })))
  .filter((x) => !findTerm(x.keyword));

// ---------- topics ----------

export const QUESTIONS: QaQuestion[] = CHAPTERS.flatMap((c) => c.questions);
export const QUESTION_BY_ID: Record<string, QaQuestion> = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]));

export const TOPICS: QaTopic[] = ['1', '2', '3', '4', '5', '6'].map((n) => {
  const head = SECTIONS.find((s) => s.number === n)!;
  const content = CHAPTERS.find((c) => c.number === n);
  const notes = new Map((content?.sections ?? []).map((s) => [s.number, s]));
  const sections = SECTIONS.filter((s) => s.number.startsWith(`${n}.`)).map((s) => ({ number: s.number, title: s.title, page: s.page, endPage: s.endPage, notes: notes.get(s.number) }));
  return {
    id: `ch${n}`,
    number: n,
    title: head.title,
    minutes: head.minutes,
    page: head.page,
    endPage: sections.length ? sections[sections.length - 1].endPage : head.endPage,
    content,
    objectives: OBJECTIVES.filter((o) => o.code.startsWith(`FL-${n}.`)).map((o) => ({ ...o, explain: content?.objectives[o.code] })),
    sections,
    keywordIds: (KEYWORDS[n] ?? []).map((k) => findTerm(k)?.id).filter((x): x is string => !!x),
    questionIds: (content?.questions ?? []).map((q) => q.id),
  };
});

export const TOPIC_BY_ID: Record<string, QaTopic> = Object.fromEntries(TOPICS.map((t) => [t.id, t]));

/** Original syllabus text of a section (verbatim extraction). */
export function sectionText(number: string): ExtractedSection | undefined {
  return SECTIONS.find((s) => s.number === number);
}

// ---------- practice exam formats ----------

/**
 * Practice exam: question counts per chapter are proportional to the syllabus training times
 * (page 13: 180 / 130 / 80 / 390 / 335 / 20 minutes). The length, time and pass mark are this app's own
 * choices: the official exam structure documents were not imported.
 */
function proportional(total: number): Record<string, number> {
  const mins = TOPICS.map((t) => t.minutes ?? 0);
  const sum = mins.reduce((a, b) => a + b, 0);
  const raw = mins.map((m) => (m / sum) * total);
  const out = raw.map(Math.floor);
  const order = raw.map((r, i) => [r - Math.floor(r), i] as const).sort((a, b) => b[0] - a[0]);
  for (let k = 0; out.reduce((a, b) => a + b, 0) < total; k++) out[order[k % order.length][1]] += 1;
  for (let i = 0; i < out.length; i++) if (out[i] === 0 && total >= TOPICS.length) { out[i] = 1; out[out.indexOf(Math.max(...out))] -= 1; }
  return Object.fromEntries(TOPICS.map((t, i) => [t.id, out[i]]));
}

export const EXAMS: ExamSpec[] = [20, 40].map((n) => ({
  id: `mock-${n}`,
  title: { vi: `Đề luyện tập ${n} câu`, en: `${n}-question practice exam`, zh: `${n}题模拟练习` },
  questionCount: n,
  minutes: Math.round(n * 1.5),
  passPercent: 65,
  perTopic: proportional(n),
  basis: {
    vi: 'Số câu mỗi chương tỷ lệ với thời lượng đào tạo của chương trong giáo trình (trang 13). Số câu, thời gian và điểm đạt là lựa chọn của ứng dụng, không phải cấu trúc đề thi chính thức (tài liệu cấu trúc đề thi chưa được nhập). Câu hỏi là câu luyện tập do ứng dụng soạn, không phải câu hỏi thi chính thức của ISTQB.',
    en: 'Questions per chapter are proportional to each chapter’s training time in the syllabus (page 13). Length, time and pass mark are this app’s own choices, not the official exam structure (the exam structure documents were not imported). Questions are practice questions written for this app, not official ISTQB exam questions.',
    zh: '各章题量按大纲中各章培训时长的比例分配（第13页）。题量、时间和及格线是本应用自行设定的，并非官方考试结构（考试结构文件尚未导入）。题目为本应用编写的练习题，不是 ISTQB 官方考题。',
  },
}));

export const QA_CONTENT: QaContent = { sources: SOURCES, topics: TOPICS, terms: TERMS, questions: QUESTIONS, exams: EXAMS };
