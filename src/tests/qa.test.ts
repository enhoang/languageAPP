import { describe, expect, it } from 'vitest';
import { CTFL_DOC, EXAMS, GLOSSARY_DOC, QUESTIONS, SOURCES, TERMS, TERM_BY_ID, TOPICS, sectionText } from '../qa/content';
import { buildExam, correctKey, examAvailability, gradeItem, reviewQuiz, syllabusSentences, termItem, termQuiz, topicQuiz } from '../qa/quiz';
import { emptyQa, exportQa, loadQa, markTerm, migrateQa, parseQaBackup, recordQa, saveQa, QA_KEY } from '../qa/store';
import { createEmptyData, finishLessonQuiz } from '../lib/appData';
import { saveData, STORAGE_KEY } from '../lib/storage';
import { COURSES } from '../courses';
import { LANG_KEY, writePref } from '../i18n/langs';
import type { SourceRef } from '../qa/types';
import type { LText } from '../types';

class MemStorage {
  m = new Map<string, string>();
  getItem(k: string) { return this.m.get(k) ?? null; }
  setItem(k: string, v: string) { this.m.set(k, v); }
}

const CJK = /\p{Script=Han}/u;
const VI = /[àáãèéìíòóõùúýăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i;
function expectLText(t: LText | undefined, where: string) {
  expect(t, where).toBeDefined();
  expect(t!.vi.trim() && t!.en.trim() && t!.zh.trim(), `${where}: empty translation`).toBeTruthy();
  expect(VI.test(t!.vi), `${where}: Vietnamese has no Vietnamese letters: ${t!.vi}`).toBe(true);
  expect(CJK.test(t!.zh), `${where}: Chinese has no Chinese characters: ${t!.zh}`).toBe(true);
  expect(t!.en, `${where}: English copies Vietnamese`).not.toBe(t!.vi);
}
const ctflPages = SOURCES.find((s) => s.id === CTFL_DOC)!.pageCount;
function expectRef(r: SourceRef, where: string) {
  const doc = SOURCES.find((s) => s.id === r.doc);
  expect(doc, `${where}: unknown doc ${r.doc}`).toBeDefined();
  if (r.page !== undefined) expect(r.page >= 1 && r.page <= doc!.pageCount, `${where}: page ${r.page} out of range`).toBe(true);
  if (r.section) {
    expect(r.doc, where).toBe(CTFL_DOC);
    const s = sectionText(r.section);
    expect(s, `${where}: unknown section ${r.section}`).toBeDefined();
    if (r.page !== undefined) expect(r.page >= s!.page && r.page <= s!.endPage, `${where}: page ${r.page} not in §${r.section} (pp. ${s!.page}–${s!.endPage})`).toBe(true);
  }
}

describe('ISTQB sources (extracted from the PDFs)', () => {
  it('both documents were fully readable', () => {
    expect(SOURCES.map((s) => s.id)).toEqual([CTFL_DOC, GLOSSARY_DOC]);
    for (const s of SOURCES) {
      expect(s.unreadablePages, s.id).toEqual([]);
      expect(s.pageCount, s.id).toBeGreaterThan(50);
    }
    expect(ctflPages).toBe(78);
  });

  it('follows the CTFL v4.0.1 structure: 6 chapters, 64 learning objectives', () => {
    expect(TOPICS.map((t) => t.title)).toEqual([
      'Fundamentals of Testing',
      'Testing Throughout the Software Development Lifecycle',
      'Static Testing',
      'Test Analysis and Design',
      'Managing the Test Activities',
      'Test Tools',
    ]);
    expect(TOPICS.flatMap((t) => t.objectives)).toHaveLength(64);
    expect(TOPICS.map((t) => t.minutes)).toEqual([180, 130, 80, 390, 335, 20]);
    // every section has text, except headings directly followed by their first subsection (e.g. 3.2)
    for (const t of TOPICS) for (const s of t.sections) {
      const hasSub = t.sections.some((x) => x.number.startsWith(`${s.number}.`));
      if (!hasSub) expect(sectionText(s.number)?.text.length, s.number).toBeGreaterThan(20);
    }
  });

  it('glossary entries keep their source definition and page', () => {
    expect(TERMS.length).toBe(640);
    expect(new Set(TERMS.map((t) => t.id)).size).toBe(TERMS.length);
    for (const t of TERMS) {
      expect(t.definition.text.length, t.id).toBeGreaterThan(10);
      expectRef(t.definition.ref, t.id);
    }
    // spot checks against the PDF text
    expect(TERM_BY_ID['boundary-value-analysis'].definition.text).toBe('A black-box test technique in which the test conditions are boundary values.');
    expect(TERM_BY_ID['test-oracle'].definition).toMatchObject({ text: 'A source to determine an expected result.', ref: { page: 50 } });
    expect(TERM_BY_ID['confirmation-testing'].synonyms).toEqual(['retesting']);
  });
});

describe('ISTQB supplementary content', () => {
  const topicsWithContent = TOPICS.filter((t) => t.content && t.content.summary.vi);

  it('every chapter has its teaching content', () => {
    expect(topicsWithContent.map((t) => t.id)).toEqual(TOPICS.map((t) => t.id));
  });

  it.each(TOPICS.map((t) => [t.id, t] as const))('%s: objectives, sections and key points are explained in all languages', (id, t) => {
    const c = t.content!;
    expect(c.id, id).toBe(id);
    expectLText(c.titleTr, `${id} title`);
    expectLText(c.summary, `${id} summary`);
    expect(c.keyPoints.length, id).toBeGreaterThanOrEqual(3);
    c.keyPoints.forEach((k, i) => expectLText(k, `${id} keyPoint ${i}`));
    for (const o of t.objectives) expectLText(c.objectives[o.code], `${id} ${o.code}`);
    for (const code of Object.keys(c.objectives)) expect(t.objectives.some((o) => o.code === code), `${id} unknown LO ${code}`).toBe(true);
    for (const s of t.sections) {
      const n = c.sections.find((x) => x.number === s.number);
      expect(n, `${id} section ${s.number} has no notes`).toBeDefined();
      expectLText(n!.explain, `${id} §${s.number} explain`);
      if (n!.example) expectLText(n!.example, `${id} §${s.number} example`);
      n!.keyPoints?.forEach((k, i) => expectLText(k, `${id} §${s.number} keyPoint ${i}`));
      if (n!.uncertain) expectLText(n!.uncertain, `${id} §${s.number} uncertain`);
      for (const tid of n!.termIds ?? []) expect(TERM_BY_ID[tid], `${id} §${s.number} term ${tid}`).toBeDefined();
    }
    for (const n of c.sections) expect(sectionText(n.number), `${id} notes for unknown section ${n.number}`).toBeDefined();
  });

  it('every glossary term has Vietnamese and Chinese names', () => {
    for (const t of TERMS) {
      expect(t.name, `${t.id} has no name`).toBeDefined();
      expect(t.name!.vi.trim() && t.name!.zh.trim(), t.id).toBeTruthy();
      expect(CJK.test(t.name!.zh), `${t.id} zh: ${t.name!.zh}`).toBe(true);
    }
  });

  it('every syllabus term (keyword or indexed) has an explanation; links point to existing terms', () => {
    const syllabusTerms = TERMS.filter((t) => t.keyword || t.syllabusPages.length);
    expect(syllabusTerms.length).toBe(158);
    for (const t of syllabusTerms) expect(t.notes, `${t.id} has no notes`).toBeDefined();
    for (const t of TERMS.filter((x) => x.notes)) {
      expectLText(t.notes!.explanation, `${t.id} explanation`);
      if (t.notes!.example) expectLText(t.notes!.example, `${t.id} example`);
      if (t.notes!.versionNote) expectLText(t.notes!.versionNote, `${t.id} versionNote`);
      for (const c of t.notes!.confusedWith ?? []) {
        expect(TERM_BY_ID[c.id], `${t.id} confusedWith ${c.id}`).toBeDefined();
        expect(c.id, t.id).not.toBe(t.id);
        expectLText(c.note, `${t.id} confused note`);
      }
    }
    // terms named in the module requirements
    for (const id of ['test-case', 'test-condition', 'test-basis', 'test-oracle', 'coverage', 'equivalence-partitioning', 'boundary-value-analysis', 'decision-table-testing', 'state-transition-testing', 'regression-testing', 'confirmation-testing', 'defect', 'failure', 'risk-based-testing', 'test-automation']) {
      expect(TERM_BY_ID[id]?.notes, id).toBeDefined();
    }
  });
});

describe('ISTQB practice questions', () => {
  const minimum: Record<string, number> = { ch1: 20, ch2: 15, ch3: 12, ch4: 30, ch5: 26, ch6: 6 };

  it('each chapter has enough practice questions', () => {
    for (const t of TOPICS) expect(QUESTIONS.filter((q) => q.topicId === t.id).length, t.id).toBeGreaterThanOrEqual(minimum[t.id]);
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length);
  });

  it('every question has a valid answer key, explanation and source reference', () => {
    for (const q of QUESTIONS) {
      const topic = TOPICS.find((t) => t.id === q.topicId);
      expect(topic, q.id).toBeDefined();
      expectLText(q.stem, `${q.id} stem`);
      if (q.scenario) expectLText(q.scenario, `${q.id} scenario`);
      expect(q.options.length, q.id).toBeGreaterThanOrEqual(3);
      q.options.forEach((o, i) => expectLText(o, `${q.id} option ${i}`));
      expect(new Set(q.options.map((o) => o.en)).size, `${q.id} duplicate options`).toBe(q.options.length);
      expect(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length, `${q.id} answer`).toBe(true);
      expectLText(q.explanation, `${q.id} explanation`);
      if (q.optionNotes) {
        expect(q.optionNotes.length, `${q.id} optionNotes length`).toBe(q.options.length);
        q.optionNotes.forEach((n, i) => n && expectLText(n, `${q.id} optionNote ${i}`));
      }
      expect(q.ref.doc, q.id).toBe(CTFL_DOC);
      expect(q.ref.section, `${q.id} needs a section`).toBeTruthy();
      expectRef(q.ref, q.id);
      expect(q.ref.section!.split('.')[0], `${q.id} section of another chapter`).toBe(topic!.number);
      if (q.objective) expect(topic!.objectives.some((o) => o.code === q.objective), `${q.id} objective ${q.objective}`).toBe(true);
      for (const tid of q.termIds ?? []) expect(TERM_BY_ID[tid], `${q.id} term ${tid}`).toBeDefined();
      expect(/official|chính thức|官方/i.test(q.stem.en + q.stem.vi + q.stem.zh), `${q.id} must not claim to be official`).toBe(false);
    }
  });

  it('mock exams can be built and contain only practice questions', () => {
    for (const e of EXAMS) {
      expect(Object.values(e.perTopic).reduce((a, b) => a + b, 0), e.id).toBe(e.questionCount);
      expect(examAvailability(e).ok, `${e.id} missing ${JSON.stringify(examAvailability(e).missing)}`).toBe(true);
      const items = buildExam(e)!;
      expect(items).toHaveLength(e.questionCount);
      expect(new Set(items.map((i) => i.id)).size).toBe(items.length);
      expect(items.every((i) => i.kind === 'question')).toBe(true);
    }
  });
});

describe('ISTQB terminology quizzes', () => {
  it('generated items are gradable', () => {
    const keywordIds = TERMS.filter((t) => t.keyword).map((t) => t.id);
    const items = termQuiz(keywordIds, ['defToTerm', 'termToDef', 'termToName', 'match', 'fill', 'confused'], 60);
    expect(items.length).toBeGreaterThan(30);
    for (const it of items) {
      if (it.kind === 'match') {
        expect(gradeItem(it, Object.fromEntries(it.termIds.map((id) => [id, id])))).toBe(true);
        continue;
      }
      if (it.kind === 'question') continue;
      if (it.kind !== 'confused') expect(new Set(it.options).size, it.id).toBe(it.options.length);
      expect(gradeItem(it, correctKey(it)!), it.id).toBe(true);
      expect(gradeItem(it, '__wrong__'), it.id).toBe(false);
    }
  });

  it('fill-in items blank the term in a real syllabus sentence with its page', () => {
    const t = TERM_BY_ID['regression-testing'];
    const s = syllabusSentences(t);
    expect(s.length).toBeGreaterThan(0);
    for (const x of s) {
      expect(x.sentence).toContain('_____');
      expect(x.sentence.toLowerCase()).not.toContain('regression testing');
      const src = sectionText(x.ref.section!)!.text.replace(/\n/g, ' ');
      expect(src.toLowerCase()).toContain(x.sentence.split('_____')[0].trim().toLowerCase().slice(-30));
    }
    expect(termItem(t, 'fill')?.kind).toBe('fill');
  });

  it('topic quizzes and review sessions mix questions and terms', () => {
    for (const t of TOPICS) {
      const n = topicQuiz(t.id, 10).length;
      expect(n >= 5 && n <= 10, `${t.id}: ${n} items`).toBe(true);
    }
    const review = reviewQuiz(['defect', 'failure'], ['t:error:def', `q:${QUESTIONS[0].id}`], 10);
    expect(review.map((i) => i.id)).toEqual(expect.arrayContaining(['t:error:def', `q:${QUESTIONS[0].id}`]));
  });
});

describe('ISTQB progress', () => {
  it('is stored separately; language learning and interface language never touch it', () => {
    const s = new MemStorage() as unknown as Storage;
    let p = recordQa(emptyQa(), 't:defect:def', false, ['defect']);
    p = markTerm(p, 'failure', 'review');
    saveQa(p, s);
    const before = s.getItem(QA_KEY);
    // language-learning activity and switching the interface language
    saveData(finishLessonQuiz(createEmptyData(), COURSES.zh, 'd1', [{ skill: 'vocabulary', correct: true }]).data, s);
    writePref(LANG_KEY, 'en', s);
    expect(s.getItem(QA_KEY)).toBe(before);
    expect(s.getItem(STORAGE_KEY)).not.toBeNull();
    const back = loadQa(s);
    expect(back.misses['t:defect:def']).toMatchObject({ count: 1, resolved: false });
    expect(back.terms.failure.mark).toBe('review');
  });

  it('resolves misses and schedules term reviews', () => {
    let p = recordQa(emptyQa(), 'q:x', false);
    p = recordQa(p, 'q:x', true);
    expect(p.misses['q:x'].resolved).toBe(true);
    p = recordQa(p, 't:defect:def', true, ['defect']);
    expect(p.terms.defect.reps).toBe(1);
    expect(p.reviews[0]).toMatchObject({ id: 'defect', correct: true });
  });

  it('backs up and restores, rejecting other files', () => {
    const p = markTerm(emptyQa(), 'defect', 'understood');
    const r = parseQaBackup(exportQa(p));
    expect(r.ok && r.data.terms.defect.mark).toBe('understood');
    expect(parseQaBackup('nope').ok).toBe(false);
    expect(parseQaBackup('{"app":"x"}').ok).toBe(false);
    expect(migrateQa({ schemaVersion: 99 })).toBeNull();
  });
});
