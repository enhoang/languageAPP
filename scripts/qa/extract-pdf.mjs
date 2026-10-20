#!/usr/bin/env node
/**
 * Extracts text from the ISTQB source PDFs (sources/qa/*.pdf) into JSON used by the ISTQB & QA module.
 *
 *   node scripts/qa/extract-pdf.mjs
 *
 * Output (committed): src/qa/content/extracted/
 *   ctfl-v4.0.1.json   – pages, sections (from the table of contents), chapter keywords, learning objectives
 *   glossary-4.8.1.json – glossary entries with page numbers
 *
 * Pages with no extractable text (scanned images, empty pages) are listed in `unreadablePages`. For such pages
 * run OCR first (e.g. `ocrmypdf in.pdf out.pdf`, or tesseract.js) and extract again; nothing is guessed.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'src/qa/content/extracted');
mkdirSync(OUT, { recursive: true });

/** Text of each page as lines (items grouped by their y position, ordered left to right). */
async function readPages(file) {
  const pdf = await getDocument({ data: new Uint8Array(readFileSync(file)), useSystemFonts: true, verbosity: 0 }).promise;
  const pages = [];
  for (let n = 1; n <= pdf.numPages; n++) {
    const page = await pdf.getPage(n);
    const content = await page.getTextContent();
    const rows = new Map();
    for (const it of content.items) {
      if (!('str' in it) || !it.str.trim()) continue;
      const y = Math.round(it.transform[5] / 2) * 2;
      const row = rows.get(y) ?? [];
      row.push({ x: it.transform[4], s: it.str });
      rows.set(y, row);
    }
    const lines = [...rows.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([, row]) => row.sort((a, b) => a.x - b.x).map((r) => r.s).join(' ').replace(/\s+/g, ' ').trim())
      .filter(Boolean);
    pages.push({ page: n, lines, chars: lines.join('').length });
  }
  return pages;
}

const isFurniture = (l) =>
  /^Certified Tester$|^Foundation Level$|^v4\.0\.1 Page \d+ of 78 2024-09-15$|^© International Software Testing Qualifications Board$|^Search results Page: \d+ of 58$/.test(l)
  || /^v4\.0\.1$|^Page \d+ of \d+$|^2024-09-15$/.test(l);

// ---------- CTFL syllabus ----------
async function syllabus() {
  const file = join(ROOT, 'sources/qa/ISTQB_CTFL_Syllabus_v4.0.1.pdf');
  const pages = await readPages(file);
  const body = pages.map((p) => ({ page: p.page, lines: p.lines.filter((l) => !isFurniture(l)) }));
  const unreadablePages = pages.filter((p) => p.chars < 40).map((p) => p.page);

  // Table of contents (pages 4–7): "1.4.1. Test Activities and Tasks ....... 18"
  const toc = [];
  for (const p of body.filter((b) => b.page >= 4 && b.page <= 7)) {
    for (const l of p.lines) {
      const m = l.match(/^(\d+(?:\.\d+){0,2})\.\s+(.+?)\s*\.{3,}\s*(\d+)$/);
      if (m) toc.push({ number: m[1], title: m[2].replace(/\s+–\s+\d+ minutes$/, '').trim(), page: Number(m[3]), minutes: Number((m[2].match(/(\d+) minutes$/) ?? [])[1]) || undefined });
    }
  }

  // Locate each heading in the body text and cut the text between consecutive headings.
  const flat = [];
  for (const p of body) for (const l of p.lines) flat.push({ page: p.page, l });
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const heads = [];
  let from = flat.findIndex((x) => x.page >= 10);
  for (const t of toc.filter((x) => x.page >= 10)) {
    const want = norm(`${t.number}${t.title}`);
    const idx = flat.findIndex((x, i) => i >= from && x.page >= t.page && norm(x.l).startsWith(want.slice(0, Math.min(want.length, 40))));
    if (idx < 0) { heads.push({ ...t, idx: -1 }); continue; }
    heads.push({ ...t, idx });
    from = idx + 1;
  }
  const located = heads.filter((h) => h.idx >= 0);
  const sections = located.map((h, i) => {
    const end = i + 1 < located.length ? located[i + 1].idx : flat.length;
    const lines = flat.slice(h.idx + 1, end);
    return { number: h.number, title: h.title, page: h.page, minutes: h.minutes, endPage: lines.length ? lines[lines.length - 1].page : h.page, text: lines.map((x) => x.l).join('\n') };
  });
  const missingHeadings = heads.filter((h) => h.idx < 0).map((h) => `${h.number} ${h.title}`);

  // Chapter keywords and learning objectives (chapter title pages).
  const keywords = {};
  const objectives = [];
  for (const ch of ['1', '2', '3', '4', '5', '6']) {
    const s = sections.find((x) => x.number === ch);
    if (!s) continue;
    const text = s.text.replace(/\n/g, ' ');
    const kw = text.match(/Keywords (.+?) Learning Objectives/);
    if (kw) keywords[ch] = kw[1].split(',').map((k) => k.trim()).filter(Boolean);
    for (const m of text.matchAll(/(FL-\d\.\d\.\d)\s+\((K\d)\)\s+(.+?)(?=\s+FL-\d\.\d\.\d|\s+\d\.\d\.?\s+[A-Z]|$)/g)) {
      objectives.push({ code: m[1], level: m[2], text: m[3].trim(), page: s.page });
    }
  }

  // Index (chapter 11): "boundary value analysis, 40" / "acceptance test-driven development, 25, 26, 46" / "mistake, See error"
  const index = [];
  const idx = sections.find((x) => x.number === '11');
  if (idx) {
    let pending = '';
    for (const raw of idx.text.split('\n')) {
      // two-column layout: a line may hold two entries
      for (const part of (pending + raw).split(/(?<=\d)\s+(?=[A-Za-z0-9])/)) {
        const m = part.match(/^(.+?),\s*((?:\d+,?\s*)+)$/);
        const see = part.match(/^(.+?),\s*See (.+)$/);
        if (m) index.push({ term: m[1].trim(), pages: m[2].split(',').map((x) => Number(x.trim())).filter(Boolean) });
        else if (see) index.push({ term: see[1].trim(), see: see[2].trim() });
      }
      pending = /,\s*$/.test(raw) ? raw : '';
    }
  }

  const out = {
    doc: {
      id: 'ctfl401',
      title: 'Certified Tester Foundation Level Syllabus',
      issuer: 'International Software Testing Qualifications Board (ISTQB®)',
      version: 'CTFL v4.0.1',
      date: '2024-09-15',
      fileName: 'ISTQB_CTFL_Syllabus_v4.0.1.pdf',
      pageCount: pages.length,
      extraction: 'text',
    },
    unreadablePages,
    missingHeadings,
    toc,
    keywords,
    objectives,
    index,
    sections,
  };
  writeFileSync(join(OUT, 'ctfl-v4.0.1.json'), JSON.stringify(out, null, 1));
  return out;
}

// ---------- Glossary search export ----------
async function glossary() {
  const file = join(ROOT, 'sources/qa/istqb-glossary-4.8.1-search-2026-10-19.pdf');
  const pages = await readPages(file);
  const unreadablePages = pages.filter((p) => p.chars < 40).map((p) => p.page);
  const terms = [];
  let cur = null;
  let field = 'definition';
  for (const p of pages) {
    for (const l of p.lines.filter((x) => !isFurniture(x) && x !== 'ISTQB' && x !== 'All terms')) {
      const head = l.match(/^(.+?)\s+Version (\d+)$/);
      if (head && p.page >= 2) {
        if (cur) terms.push(cur);
        cur = { term: head[1].trim(), version: Number(head[2]), definition: '', page: p.page };
        field = 'definition';
        continue;
      }
      if (!cur) continue;
      const kv = l.match(/^(Abbreviation|Term type|Reference|Synonyms|See also):\s*(.*)$/);
      if (kv) {
        field = { Abbreviation: 'abbreviation', 'Term type': 'termType', Reference: 'reference', Synonyms: 'synonyms', 'See also': 'seeAlso' }[kv[1]];
        cur[field] = kv[2].trim();
        continue;
      }
      cur[field] = `${cur[field] ? `${cur[field]} ` : ''}${l}`.trim();
    }
  }
  if (cur) terms.push(cur);
  for (const t of terms) {
    for (const k of ['synonyms', 'seeAlso']) if (t[k]) t[k] = t[k].split(',').map((s) => s.trim()).filter(Boolean);
    t.definition = t.definition.replace(/\s+/g, ' ').replace(/- /g, (m, i, s) => (/[a-z]- [a-z]/.test(s.slice(i - 1, i + 3)) ? '-' : m)).trim();
  }
  const out = {
    doc: {
      id: 'glossary481',
      title: 'Standard Glossary of Terms used in Software Testing — search results (term type: Quality and testing)',
      issuer: 'International Software Testing Qualifications Board (ISTQB®)',
      version: 'Glossary v4.8.1',
      date: '2026-10-19 (date of the search export)',
      license: 'CC BY 4.0 (as stated in the document)',
      fileName: 'search_result_10_19_2026.pdf',
      pageCount: pages.length,
      extraction: 'text',
    },
    unreadablePages,
    terms,
  };
  writeFileSync(join(OUT, 'glossary-4.8.1.json'), JSON.stringify(out, null, 1));
  return out;
}

const s = await syllabus();
const g = await glossary();
console.log(`CTFL: ${s.doc.pageCount} pages, ${s.sections.length} sections, ${s.objectives.length} learning objectives, ${s.index.length} index entries, unreadable pages: ${s.unreadablePages.join(',') || 'none'}, missing headings: ${s.missingHeadings.join(' | ') || 'none'}`);
console.log(`Glossary: ${g.doc.pageCount} pages, ${g.terms.length} terms, unreadable pages: ${g.unreadablePages.join(',') || 'none'}`);
