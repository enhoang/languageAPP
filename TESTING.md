# Manual testing checklist

Run `npm test` and `npm run build` first. Then use `npm run preview` in Chrome or Edge (desktop) and in a mobile browser or devtools at a 390 px width.

| # | Check | Expected |
|---|---|---|
| 1 | Open the app in a fresh browser profile | Interface is Vietnamese and the course picker ("Bạn muốn học ngôn ngữ nào?") lists 中文, English, 한국어; choosing 中文 opens the Dashboard with "Bắt đầu bài học" for Day 1 |
| 2 | Open `#/lesson/d2` directly | "Bài học chưa mở khóa" with a link to Day 1 |
| 3 | Day 1: go through Mục tiêu → Bài học | Chinese, pinyin with tone marks and Vietnamese are shown; sound cards play audio |
| 4 | Click 🔊 and "Chậm" | Mandarin voice plays; "Chậm" is slower. Without a voice, buttons are disabled with an explanation |
| 5 | Practice: answer some right and some wrong | Each answer shows Chính xác / Chưa đúng, the correct answer and an explanation |
| 6 | Pinyin item: type `ba4ba`, `bàba`, then `baba` | First two are correct; `baba` is wrong with a "sai hoặc thiếu thanh điệu" hint |
| 7 | Matching and sentence ordering | Pairs can be made and undone; tokens can be added and removed; grading is correct |
| 8 | Quiz: score below 60% | Lesson not completed; "Làm lại kiểm tra" offered; Day 2 stays locked |
| 9 | Quiz: score ≥ 60% | Results page shows score, per-skill breakdown and wrong answers; Day 2 unlocks |
| 10 | Reload the browser / reopen the tab | Lesson stays completed; dashboard numbers unchanged |
| 11 | Vocabulary: search `ni hao`, `xin chao`, `你好`; use each filter; ★ and ⚑ buttons | Results update; flags persist after reload and filter correctly |
| 12 | Practice → Ôn tập đến hạn after a wrong answer | Wrongly answered word appears first; answering correctly moves it out of the queue |
| 13 | Practice → Ôn lỗi sai | Previously wrong items appear; answering correctly removes them |
| 14 | Tests: 5 / 10 / 20 questions for each skill | Count matches (or a notice when content is limited); score equals the number of "Chính xác" answers; only completed lessons are tested |
| 15 | Progress page | Weekly chart, mastery, skills, weak topics and review queue reflect your actions |
| 16 | Settings: change speech rate/voice, toggle pinyin | Audio changes; with pinyin off, "hiện pinyin" reveals it on demand |
| 17 | Export, then Restore the file; try restoring a non-JSON file | Valid file shows a summary and asks to confirm; invalid file shows an error |
| 18 | Reset: button disabled until `XOA` is typed | After reset, the dashboard returns to the new-learner state |
| 19 | Mobile width | No horizontal scrolling; bottom navigation and the ☰ drawer reach every page |
| 20 | Leave for 3+ days (or edit dates in an exported file) | Dashboard shows "Chào mừng trở lại" and resumes at the actual next lesson |
| 21 | Fresh browser profile (or delete `clc:lang` in devtools) | Interface is Vietnamese |
| 22 | 🌐 selector in the sidebar / mobile top bar: switch to English, then 简体中文, then Tiếng Việt | Every label updates immediately, no reload; nothing mixed-language; current page and exercise state are kept |
| 23 | Switch language in the middle of a lesson quiz | Prompt, options, feedback and explanation switch language; the current answer and score are kept |
| 24 | Reload / reopen the browser after choosing English | Interface is still English |
| 25 | Compare Dashboard, Progress and Vocabulary numbers before and after switching language | Completed lessons, quiz history, mastery and due words are identical |
| 26 | Vocabulary in each language | Characters and tone-marked pinyin unchanged; meanings in Vietnamese (vi), English (en) or the chosen translation language (zh) |
| 27 | Chinese interface: open a lesson; click "显示译文" under an explanation; Settings → 翻译语言 → English | Explanations in Chinese; the button reveals the translation; meanings switch to English |
| 28 | Search vocabulary for `mom`, `me`, `mẹ` in any interface language | Finds 妈妈 |
| 29 | Courses picker → English; open Day 1, then Day 2 practice | English lessons with IPA (US/UK), spelling dictation, minimal-pair listening; no pinyin anywhere |
| 30 | Courses picker → Korean; open Day 1–3 | Hangul with romanization and real pronunciation `[…]`; syllable palette in Hangul typing; plain/aspirated/tense drill on the Pronunciation page |
| 31 | Complete Day 1 in Chinese, switch to Korean via the "Studying" switcher, complete Korean Day 1, switch back | Each course shows its own completed lessons, due words, mistakes and quiz history; nothing overwritten; the streak counts both |
| 32 | Import a backup made before the multi-course upgrade (or keep old `clc:data`) | Chinese progress appears under Chinese unchanged; English/Korean start empty |
| 33 | Lesson "speak" block in Chrome, then in Firefox | Chrome: "Say it" shows what was heard and a rough match hint; Firefox: only the self-check buttons, with an explanation |
| 34 | Chinese Day 4 → stroke order: Animate, Practice (trace), Reset | Strokes animate; tracing gives hints after mistakes; works offline after the first load |
| 35 | Settings → voices per course, English accent UK | Each course plays in its own language; English audio and the IPA shown first switch to British |
| 36 | All three courses at 390 px width | No horizontal scrolling; the course switcher and the interface-language selector are reachable |

## ISTQB & QA Knowledge

| # | Check | Expected |
|---|---|---|
| 37 | Fresh profile: open "Kiến thức ISTQB & QA" from the sidebar before choosing a language course | Module opens without the course picker; 6 chapters with study times 180/130/80/390/335/20 min |
| 38 | Chapter 4: open section 4.2.2 | Verbatim syllabus text with "Source · CTFL v4.0.1 · §4.2.2 · p. N"; the explanation below is tagged "Supplementary"; section counts as read |
| 39 | Glossary: search `oracle`, `kiểm thử hồi quy`, `回归测试`; open "test oracle" | Found; detail shows English term, vi/zh names, glossary definition with page, syllabus pages, related and confusable terms |
| 40 | Learn mode: mark one term "understood", another "review"; reload | Marks persist; the "review" term is due in Flashcards |
| 41 | Flashcards: answer wrong, then right | Wrong card comes back; review schedule updates (Progress → terms) |
| 42 | Chapter quiz (`#/qa/quiz?topic=ch4`): answer some wrong | Each answer shows correct option, explanation, why the others are wrong and the syllabus ref; questions tagged "Practice" |
| 43 | Review quiz (`#/qa/quiz?mode=review`) | Missed items come first; answering correctly removes them from the misses list |
| 44 | Practice exam 40 | Note that it is not the official format; timer; results per chapter; attempt appears on Progress |
| 45 | Assist level: full → tap → none | Translations shown / revealed on tap / hidden (English-only) — independently of the interface language |
| 46 | Switch interface vi → en → zh on a chapter page | Labels and explanations switch; English terms and verbatim syllabus text stay in English |
| 47 | Do QA activities, then check the language courses (and vice versa) | Language progress unchanged; QA progress unchanged (`clc:qa` vs `clc:data`) |
| 48 | QA Progress: export, reset, import | Backup restores QA progress only; a language backup file is rejected |
| 49 | Sources page | Both documents with version, date, pages, license; "no unreadable pages"; practice/supplementary disclaimers |
| 50 | All QA pages at 390 px | No horizontal scrolling; QA section tabs scroll/wrap |
