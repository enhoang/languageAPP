# Language Companion · Học ngoại ngữ (Chinese · English · Korean)

A personal language-learning web app for Vietnamese-speaking beginners. It teaches three **target languages** — Chinese (Simplified), English and Korean — through one shared learning interface. The **interface** itself is available in Vietnamese (default), English and Simplified Chinese, independently of the language being studied.

No account and no required backend: progress is stored in the browser; audio uses the browser's built-in speech synthesis, and speaking practice uses the browser's speech recognition when available. The app is an installable **PWA** that works offline. The one optional backend is the small server in `server/` that enables **AI conversation practice** (paid Anthropic API, see below); without it, conversation practice runs as clearly labelled prewritten scenarios.

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
- **Render (Static Site):** build `npm install && npm run build`, publish directory `dist`. Render serves it over HTTPS (required for the service worker and installation). No rewrite rules are needed (hash routing). Recommended response headers (Settings → Headers): `/sw.js` and `/index.html` → `Cache-Control: no-cache`, so new versions are found promptly; `/assets/*` → `Cache-Control: public, max-age=31536000, immutable` (file names contain a content hash).

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
- Reset clears all courses and requires typing `XOA`, `DELETE` or `删除`.

### Backup & Restore (Settings)

One backup covers **all** learner data: language courses and learning settings (`clc:data`), ISTQB progress (`clc:qa`), conversation sessions, summaries and saved phrases (`clc:conv`), and interface preferences (`clc:lang`, `clc:support-lang`). Lesson, ISTQB and demo content is not included (it ships with the app), nor the offline cache, the install-reminder flag, or the AI server's access code. Everything runs in the browser, works offline, and nothing is sent anywhere. (No PDF-derived personal data exists to back up: the ISTQB texts are bundled with the app.)

- **Format** (`src/backup/backup.ts`): JSON `{ app: "language-companion", kind: "backup", formatVersion: 1, createdAt, schemas: { courses, qa, conversation }, sections, meta, checksum: { algorithm: "SHA-256", value } }`. The checksum covers the canonical JSON (sorted keys) of everything but itself.
- **File and code:** a `.json` file, and a copyable code `LCB1.g.<base64url(gzip(json))>` (`.j.` without compression where `CompressionStream` is missing). The code *is* the data — there is no server copy; codes over 150,000 characters show a warning to use the file instead.
- **Optional encryption:** password → PBKDF2-SHA-256 (600,000 iterations, random salt) → AES-256-GCM (random IV), all through the browser's Web Crypto API; no custom cryptography. A lost password cannot be recovered. Unencrypted backups are readable by anyone who has them; the UI says so.
- **Restore:** paste a code or choose a file → decode, check format version, verify the checksum (and decrypt), validate every section with the same migration code the app uses at start-up → preview (date, counts per section) → choose sections and mode → confirm. Nothing is written before that. **Replace** overwrites the chosen sections; **Merge** combines records by stable id: lessons (completed wins, best score, max attempts), words/terms/phrases (the most recently reviewed record wins), quiz/exam attempts and sessions (union by id), review history (deduplicated), activity days (larger values), ISTQB read sections (union); local settings and preferences are kept. Merging the same backup twice changes nothing. All writes are applied together; if one fails (e.g. storage full) the earlier ones are rolled back. The app then reloads so every section reads the restored data.
- **Compatibility:** future versions keep reading format 1 (`SUPPORTED_FORMATS`); a backup from a newer app or with a newer data schema is refused with a clear "update the app" message instead of being restored unsafely. The older single-part exports (courses, ISTQB, conversation) are still accepted.

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

## Conversation practice

A separate section (navigation: **Luyện hội thoại**, `#/conversation`) for practising dialogue in Chinese, English or Korean, independent of the daily lessons. Setup: target language, level (beginner / elementary / intermediate / advanced ≈ HSK 1–6, CEFR A1–C1, TOPIK I–II), scenario (greetings, daily life, shopping, ordering food, travel, hobbies, workplace, job interview, or a custom topic), guided or free mode. Explanations follow the interface language.

**Two providers behind one interface** (`src/conversation/provider.ts`):

| | AI mode | Demo mode (default) |
|---|---|---|
| Needs | the server in `server/` with an Anthropic API key (paid per use) | nothing |
| Replies | generated by Claude from the whole conversation so far | prewritten scenario script (8 scenarios × 3 languages) |
| Feedback on your message | grammar mistakes vs optional style improvements, corrected sentence, short explanation, encouragement — and "correct" with no invented errors when the sentence is fine | none — sample answers to compare with; the UI says the demo does not understand or check your sentence |
| Suggest words / phrases / sentences | generated for the current context | prewritten per scenario |
| End-of-session summary | overall comment, useful vocabulary, corrections, what to review | key vocabulary and the sentences you said |

The browser never holds an API key: it calls the backend URL (set in **Conversation practice → AI connection**, or at build time with `VITE_CONVERSATION_API_URL`, a public URL). The backend owner can require an access code. Deployment, costs and security: see [server/README.md](server/README.md) — the frontend can stay a Render Static Site; the server is a separate Render Web Service.

**Pronunciation** always uses the target language's own system: Hanyu Pinyin with tone marks (Chinese), IPA US/UK plus a simple respelling for beginners (English), Hangul with the actual pronunciation `[…]`, sound-change notes and optional Revised Romanization (Korean). Words that exist in the course data use the course's checked pronunciation; AI-generated pronunciation is labelled "may contain mistakes"; fields of another language's system are dropped (server and client).

**Speech:** every partner line, suggestion and example can be played (speech synthesis in the conversation's language); the mic button transcribes speech into the draft (never sends it). Recognition only transcribes — it does not score pronunciation; typing always works.

**Saved phrases:** any suggestion, partner line or summary item can be saved, marked difficult and reviewed as flashcards with the same spaced-repetition rules as the courses. Sessions (transcripts, summaries), saved phrases and settings are stored in `localStorage` key `clc:conv` with their own backup/restore; language-course and ISTQB progress are never touched.

## Install as an app (PWA) and offline use

The site is a Progressive Web App (vite-plugin-pwa + Workbox): it has a web app manifest (name, icons 192/512 px and a maskable icon, `display: standalone`, `start_url`/`scope` `./`) and a service worker that precaches the app shell and **every bundled chunk** — all three language courses, the ISTQB module, conversation practice and its demo scripts (~4 MB).

- **Installing:** where the browser fires `beforeinstallprompt` (Chrome, Edge, Samsung Internet on Android and desktop) the app shows an **Install app** button — in a dismissible reminder above the page and in **Settings → App & offline** — and the browser's dialog opens only after the click. On iPhone/iPad (detected by the presence of `navigator.standalone`, not by the user-agent string) it explains Share → Add to Home Screen; elsewhere it shows per-browser instructions instead of a button that cannot work. Once running installed (standalone), the button is hidden. Installation support differs between browsers and systems; Firefox on desktop, for example, does not install web apps.
- **Data:** the installed app uses the same `localStorage` as the website in that browser — except on iPhone/iPad, where a Home Screen app has its own storage (use Backup/Restore to move progress). Settings → App & offline shows storage usage, can ask the browser for persistent storage, and explains when data can be lost (clearing site data, uninstalling, eviction under storage pressure).
- **Offline:** lessons, vocabulary, grammar, practice, tests, ISTQB, demo conversations and all progress work without a connection; an offline banner appears when the network is lost. AI conversations, speech recognition in Chrome/Edge (online service) and some online voices need a connection. API requests are never cached by the service worker. If a section cannot be loaded (offline before it was ever cached, or after an update), a message explains it instead of a blank page.
- **Updates:** a new version is downloaded in the background (checked on start, hourly and when the app becomes visible) and activated only when the learner taps **Update now** in the banner, so an unfinished quiz or conversation is not discarded by a silent reload. Progress itself is saved continuously and survives updates.

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
  conversation/ conversation practice: types, store.ts (clc:conv), provider.ts (AI backend / demo), pron.ts,
               demo/ (prewritten scripts zh/en/ko); pages/conversation/, components/conversation/ (lazy chunk)
  pwa/         install prompt, online state, update banner, offline/install UI, Settings card
  tests/       Vitest suites: per-course content integrity (every answer key grades as correct, ids,
               scripts, IPA/romanization, uniqueness), grading, progress & migration, i18n,
               qa (sources, provenance, question refs, quizzes/exams, separate progress)
scripts/       build-strokes.mjs, qa/extract-pdf.mjs
sources/qa/    source PDFs (git-ignored, copyrighted)
server/        optional Node backend for AI conversation practice (holds the Anthropic API key) — see server/README.md
public/icons/  PWA icons (192, 512, maskable 512)
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
- **Conversation practice:** without the backend it is prewritten demo practice only. With the backend, replies, feedback and AI-generated pronunciations can contain mistakes; the backend has not been tested here against the live API (no key on this machine — it is tested with a stand-in client), and every turn costs money on the backend owner's Anthropic account.
- **PWA:** installation and offline behaviour depend on the browser and OS (e.g. no install on desktop Firefox; separate storage for Home Screen apps on iOS). The service worker only works over HTTPS (or localhost).
- **ISTQB & QA:** explanations, translations (Vietnamese/Chinese term names — some have no established translation) and practice questions were written for this app and have not been reviewed by a certified trainer. Practice questions and exam formats are not official. The glossary export (v4.8.1) is newer than the syllabus (v4.0.1); only the 640 terms of the "Quality and testing" export are included. Syllabus text is © ISTQB® and is shown as extracts with acknowledgement for personal, non-commercial study; do not publish the deployed app with this content without checking the ISTQB copyright terms (syllabus p. 2).

## Recommended next improvements (priority order)

1. **Review:** native-speaker review of the English and Korean courses and of all translations; verify HSK / CEFR / TOPIK alignment against the official lists.
2. **Content:** days 8–14 for each course.
3. **Audio:** optional pre-recorded native audio, so playback no longer depends on device voices.
4. **Performance:** load each course's content on demand (code-splitting per course).
5. **Writing:** Hangul syllable-building exercises; English sentence-writing with model answers.
6. **Offline/PWA:** service worker + manifest for installable offline use.
