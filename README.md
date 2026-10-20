# Language Companion · Học ngoại ngữ (Chinese · English · Korean)

A personal language-learning web app for Vietnamese-speaking beginners. It teaches three **target languages** — Chinese (Simplified), English and Korean — through one shared learning interface. The **interface** itself is available in Vietnamese (default), English and Simplified Chinese, independently of the language being studied.

No backend, no account, no paid APIs: progress is stored in the browser; audio uses the browser's built-in speech synthesis, and speaking practice uses the browser's speech recognition when available.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit + content-integrity tests (Vitest)
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ at http://localhost:4173
npm run strokes    # rebuild the Chinese stroke-order data (after adding characters)
```

## Deploy (free static hosting)

`npm run build` produces a static site in `dist/`. The app uses hash routing (`#/lesson/d1`) and relative asset paths, so it needs no server rewrites and works from any sub-path.

- **Netlify:** drag and drop `dist/` at app.netlify.com/drop, or connect the repo with build command `npm run build` and publish directory `dist`. The free tier has monthly bandwidth and build-minute limits; a personal app stays far below them.
- **Vercel:** import the repo with framework "Vite", build `npm run build`, output `dist`. The Hobby plan is for non-commercial use only.
- **GitHub Pages:** push `dist/` to a `gh-pages` branch (or use the official Pages Action) and enable Pages. The site is public, the repo must be public on free accounts, and there is a soft limit of 100 GB bandwidth per month.
- **Cloudflare Pages:** build `npm run build`, output `dist`. The free plan limits builds per month.

> **Data is per browser.** Progress lives in that browser's `localStorage` on that device. It does not sync across devices or browsers, and it disappears if site data is cleared. Each hosting URL is also a separate origin: progress on `localhost` is not visible on your deployed site. Use **Settings → Export** to back up and **Restore** to move progress.

## Courses (target languages)

First-time learners pick a language on the **Courses** screen (`#/courses`); afterwards the **Studying** switcher in the sidebar / mobile top bar changes course at any time. Several languages can be studied in parallel; each keeps its own lessons, vocabulary reviews, mistakes, quizzes and scores. The streak and the daily time goal add up all languages.

| | Chinese 中文 | English | Korean 한국어 |
|---|---|---|---|
| Written form | Simplified characters | words, spelling | Hangul |
| Pronunciation aid | Hanyu Pinyin with tone marks | IPA (US, plus UK where different; accent setting) | Revised Romanization (optional aid) + actual pronunciation `[한구거]` |
| Roadmap | HSK-aligned (HSK 1 → HSK 2) | CEFR (Pre-A1 → A2) | TOPIK I (level 1 → 2) |
| Days 1–7 | tones, initials, finals & sandhi, characters & numbers, greetings, 是 / 不 / 吗, self-introduction | alphabet & IPA, key sounds & minimal pairs, everyday words + a/an, greetings & introductions, pronouns + to be, questions, review test | Hangul vowels, consonants (plain/aspirated/tense), batchim & linking + numbers, greetings + 이에요/예요 + 은/는, particles + -아요/어요, questions + 있어요, review test |
| Content | 61 words, 8 grammar points, 115 exercises | 59 words, 6 grammar points, 132 exercises | 65 words, 6 grammar points, 136 exercises |
| Typing exercises | pinyin (marks or numbers, tone hint), characters (IME or palette) | spelling dictation (slip hint) | Hangul (IME or syllable palette) |
| Pronunciation page | tones, initials, finals, confusable pairs, tone sandhi | vowels, consonants, minimal pairs, stress, connected speech | vowels, consonants, plain/aspirated/tense, batchim, sound rules |
| Extra | stroke-order animation + tracing practice (Hanzi Writer) | British/American voice | honorific and polite/formal speech |

Every lesson has objectives, explanations with examples and audio, word lists, speaking practice, guided practice, a scored quiz (≥ 60 % unlocks the next day) and a summary. Days 8–28 are shown as a planned roadmap.

**Shared learning interface:** daily plan, vocabulary cards with spaced repetition, listening exercises, speaking practice, grammar lessons, practice modes (due review, mistakes, meaning ↔ word, listening, writing, fill-in, mixed; pinyin typing for Chinese), mini tests (5/10/20 questions by skill), mistakes review, streaks, daily goals and progress dashboards (per course, plus an all-languages summary).

**Speaking practice:** listen → say it → the browser's speech recognition (Chrome, Edge, Safari; not Firefox) shows what it heard and whether it roughly matches. This is an approximate hint, never a pronunciation score, and nothing is recorded into scores. A self-check alternative (listen, repeat, rate yourself) always works without recognition.

## Interface languages

- First visit: Vietnamese. Switch any time with the 🌐 selector in the navigation or in **Settings → Language**; the interface updates immediately, without a reload.
- Saved in `localStorage` key `clc:lang` (`vi` | `en` | `zh`), apart from learner data, so switching never changes progress.
- Meanings and translations of the studied language are shown in the interface language (Vietnamese or English). When the interface is Chinese — or the same as the studied language (English interface, English course) — they use the **translation language** from Settings (`clc:support-lang`, Vietnamese by default). In the Chinese interface every explanation has a "显示译文" button revealing the Vietnamese or English version.
- Implementation: i18next + react-i18next (`src/i18n`). Interface text lives in typed dictionaries `src/i18n/locales/{vi,en,zh}/<namespace>.ts`; English and Chinese are type-checked against the Vietnamese shape, so a missing key fails the build, and a missing string falls back to Vietnamese, never a raw key. Course content stays in `src/courses`: prose is `{ vi, en, zh }` (`LText`), meanings are `{ vi, en }` (`Gloss`). Components use `useI18n()` (`t`, `tr`, `gl`, `<Prose>`) and `useCourse()`.

## Data storage and backup

Key `clc:data` in `localStorage` holds one JSON document (`schemaVersion` 3):

```
settings        session length, speech rate, voice per course, show pinyin/IPA/romanization, English accent
currentCourse   'zh' | 'en' | 'ko' | null (not chosen yet)
courses.<id>    per-course progress: lessons, words (review schedule), activity, skillStats, quizzes, mistakes
```

Interface preferences (`clc:lang`, `clc:support-lang`) are separate keys. Course content (`src/courses/<id>`) is code, not data; it is referenced by stable ids (Chinese keeps `d1`…`d7`, others use `en-d1`, `ko-d1`, `en-g-be`…). Mistakes store only the exercise id; quiz attempts store lesson ids / test skills, so history shows in any language.

- `src/lib/storage.ts → migrate()` upgrades step by step: v1 → v2 → v3. **Existing Chinese progress is kept**: it becomes `courses.zh` unchanged (generated-exercise ids get their new names; the voice and pinyin settings carry over), and the learner continues with Chinese. Unreadable data is kept under `clc:data:corrupt:<timestamp>`.
- Export downloads `hoc-tieng-trung-backup-YYYY-MM-DD.json` (all courses). Restore validates the file (old backups are migrated too), shows a summary and asks for confirmation. Reset clears all courses and requires typing `XOA`, `DELETE` or `删除`.

## Spaced repetition rules

- Finishing a lesson schedules its new words for a first review tomorrow.
- **Correct answer:** the interval goes 1 → 3 → interval × ease (ease starts at 2.3, +0.05 per correct answer, max 2.8; interval max 180 days). Only the first correct answer of a day lengthens the interval.
- **Wrong answer:** the interval resets to 0, the word is due immediately, ease −0.2 (min 1.3) and lapses +1. Recently forgotten and "difficult" words go to the front of the queue.
- **Status:** New (never reviewed) · Learning (< 3 days) · Familiar (3–20 days) · Mastered (≥ 21 days).

## ISTQB & QA Knowledge module

A separate module (navigation: **Kiến thức ISTQB & QA**, route `#/qa`) for software testers preparing for the ISTQB® Certified Tester Foundation Level. It does not require choosing a language course and never touches language-course progress.

**Sections:** learning path (6 chapters) · chapter lessons (learning objectives, verbatim syllabus sections, explanations) · glossary · Learn mode · flashcards with spaced repetition · practice quizzes (per chapter, terminology, review of misses) · practice exams · progress & review · sources.

**Sources** (the user's own PDFs, kept in `sources/qa/`, which is git-ignored):

| Document | Used for |
|---|---|
| ISTQB® CTFL Syllabus v4.0.1 (2024-09-15, 78 pages) | chapters, sections (verbatim text), 64 learning objectives with K-levels, keywords, index pages, chapter study times |
| ISTQB® Standard Glossary v4.8.1 — search export, 2026-10-19 (58 pages, 640 terms, CC BY 4.0) | term definitions, abbreviations, synonyms, "see also", references |

**Provenance — what is source and what is not.** Every piece of content carries a tag:
- **Source** — text read from the PDFs and shown verbatim with "CTFL v4.0.1 · §x · p. N" or the glossary page. It is never retyped or paraphrased in code.
- **Supplementary** — written for this app: Vietnamese/Chinese term names, explanations, examples, key points, "commonly confused" notes, chapter summaries. Faithful to the syllabus but **not reviewed by ISTQB or a certified trainer**. Where the glossary (2026) differs from the syllabus (2024), a version note says so; the syllabus takes precedence for the exam.
- **Practice** — questions written for this app, mapped to a learning objective, K-level and syllabus page. They are **not official ISTQB questions**. The practice exam formats (20 / 40 questions, chapters weighted by the syllabus study times, 65 % pass mark) are this app's own; the official "Exam Structures and Rules" documents were not imported.

**Re-extracting the PDFs:** put the PDFs in `sources/qa/` and run `npm run qa:extract` (pdfjs-dist). It writes `src/qa/content/extracted/ctfl-v4.0.1.json` and `glossary-4.8.1.json`, reporting unreadable pages and headings it could not find. Both current PDFs have a text layer (no unreadable pages). For a scanned PDF, run OCR first (e.g. `ocrmypdf in.pdf out.pdf`) and extract the OCR'd copy; pages still without text are listed in `unreadablePages` and on the Sources page. If the syllabus version changes, the tests (`src/tests/qa.test.ts`) fail on changed section numbers or pages, showing what needs updating.

**Progress:** `localStorage` key `clc:qa` (own schema version), separate from `clc:data` and the interface language: chapters read/completed, term review schedule (same spaced-repetition rules as above), learner marks (understood / review), answer history, misses, quiz and exam attempts, assist level. Export / import / reset live on the module's Progress page.

**Assist level** (independent of the interface language): *full* shows Vietnamese/Chinese help; *tap* shows English first and reveals help on tap; *none* is English-only practice. English technical terms are always shown.

## Project structure

```
src/
  courses/     index.ts (registry), helpers.ts (authoring helpers), meta.ts (topics, word types)
    zh/        lessons/d1–d7, words, grammar, sounds, roadmap, strokes/data.json (stroke data subset)
    en/ ko/    lessons/d1–d7 (each day: lesson + its words + grammar), pronunciation.ts, roadmap.ts
  i18n/        i18next setup, language preference, locales/{vi,en,zh}/*.ts dictionaries, text resolver
  lib/         pure logic: grading.ts (per-language answer checking; answer keys never reach the UI),
               generate.ts (exercise generators, exerciseById), srs.ts, stats.ts, appData.ts, storage.ts,
               pinyin.ts, text.ts, audio.ts (voices per language), recognition.ts (speech recognition)
  state/       React context: useAppData, useCourse, useSpeech, study timer
  components/  UI, exercise runner + inputs, results, TargetText, SpeakPractice, StrokeOrder, switchers
  pages/       Courses, Dashboard, Learning Path, Lesson, Vocabulary, Pronunciation, Grammar,
               Practice, Tests, Progress, Settings, Guide
  qa/          ISTQB & QA module: types, content/ (extracted JSON, chapter notes + practice questions,
               glossary names/notes, merged model), quiz.ts (item generation + grading), store.ts (clc:qa),
               QaContext.tsx
  pages/qa/    module pages (lazy-loaded chunk); components/qa/ (navigation, provenance tags, helpers)
  tests/       Vitest suites: per-course content integrity (every answer key grades as correct, ids,
               scripts, IPA/romanization, uniqueness), grading, progress & migration, i18n,
               qa (sources, provenance, question refs, quizzes/exams, separate progress)
scripts/       build-strokes.mjs, qa/extract-pdf.mjs
sources/qa/    source PDFs (git-ignored, copyrighted)
```

Adding a course means adding `src/courses/<id>/` (a `Course` object) and registering it in `src/courses/index.ts`; the content tests then check it like the others.

## Known limitations

- Audio quality depends on the voices installed on the device (Chinese, English US/UK, Korean). Without a voice, audio buttons are disabled and Settings explains how to install one. Single letters/characters may sound unnatural; polyphonic Chinese characters can be read with the wrong tone.
- Speech recognition availability and accuracy vary by browser, device and accent (Chrome sends audio to its online service). It is a rough hint only; there is no pronunciation scoring.
- Stroke-order practice covers the 71 characters used in the Chinese course (data: Make Me a Hanzi, Arphic Public License). There is no handwriting practice for Hangul or English.
- **Level alignment** (HSK 2.0 levels per word, CEFR Pre-A1/A1, TOPIK I · 1) was assigned from the published frameworks' general scope and word lists from memory; it has **not** been checked against official syllabi. All English/Korean content and all English/Chinese translations were written for this app and have not yet been reviewed by native-speaker teachers.
- Study time is counted in 15-second ticks while the page is visible and the learner interacted within the last 90 seconds.
- Distractors in generated questions are chosen automatically; occasional ambiguity is possible.
- The main bundle (~1.2 MB, ~360 KB gzipped) contains all three courses.
- No cross-device sync; single-user only.
- **ISTQB & QA:** explanations, translations (Vietnamese/Chinese term names — some have no established translation) and practice questions were written for this app and have not been reviewed by a certified trainer. Practice questions and exam formats are not official. The glossary export (v4.8.1) is newer than the syllabus (v4.0.1); only the 640 terms of the "Quality and testing" export are included. Syllabus text is © ISTQB® and is shown as extracts with acknowledgement for personal, non-commercial study; do not publish the deployed app with this content without checking the ISTQB copyright terms (syllabus p. 2).

## Recommended next improvements (priority order)

1. **Review:** native-speaker review of the English and Korean courses and of all translations; verify HSK / CEFR / TOPIK alignment against the official lists.
2. **Content:** days 8–14 for each course.
3. **Audio:** optional pre-recorded native audio, so playback no longer depends on device voices.
4. **Performance:** load each course's content on demand (code-splitting per course).
5. **Writing:** Hangul syllable-building exercises; English sentence-writing with model answers.
6. **Offline/PWA:** service worker + manifest for installable offline use.
