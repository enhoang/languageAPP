// Exercise prompts, explanations and hints built from templates (lib/generate.ts, lib/grading.ts, courses/helpers.ts).
// {{meaning}} is a translation in the learner's gloss language; {{word}} = target word with its pronunciation aid,
// e.g. "妈妈 (māma)", "hello (/həˈloʊ/)", "안녕 (annyeong)"; {{text}} / {{pron}} / {{sentence}} are in the target language.
const ex = {
  listenChoose: 'Nghe và chọn đáp án đúng',
  matchMeaning: 'Nối từ với nghĩa',
  typePinyinOf: 'Gõ pinyin của "{{meaning}}" (gõ dấu như mǎ hoặc số như ma3)',
  arrange: 'Sắp xếp thành câu: "{{meaning}}"',
  chooseMeaning: 'Chọn nghĩa đúng',
  meansExplain: '{{word}} nghĩa là "{{meaning}}".',
  chooseWord: 'Chọn từ có nghĩa: "{{meaning}}"',
  isWordExplain: '"{{meaning}}" là {{word}}.',
  listenWord: 'Nghe và chọn từ bạn nghe được',
  heardExplain: 'Bạn nghe: {{word}} — "{{meaning}}".',
  listenMeaning: 'Nghe và chọn nghĩa đúng',
  typePinyinWord: 'Gõ pinyin (có dấu hoặc số) — "{{meaning}}"',
  readsAs: '{{text}} đọc là {{pron}}.',
  write: {
    hanzi: 'Gõ chữ Hán cho "{{meaning}}" ({{pron}})',
    spelling: 'Nghe và viết đúng chính tả từ có nghĩa "{{meaning}}"',
    hangul: 'Nghe và gõ bằng Hangul từ có nghĩa "{{meaning}}"',
  },
  writtenAs: '"{{meaning}}" viết là {{text}}.',
  fillBlank: 'Chọn từ điền vào chỗ trống — "{{meaning}}"',
  sentenceExplain: '{{sentence}} — {{meaning}}',
  readSentence: 'Đọc câu và chọn nghĩa đúng',
  listenSentence: 'Nghe câu và chọn nghĩa đúng',
  listenTone: 'Nghe và chọn thanh điệu đúng',
  toneExplain: '{{text}} đọc là {{pron}} (thanh {{tone}}) — "{{meaning}}".',
  listenContrast: 'Nghe và chọn âm đúng ({{pair}})',
  contrastExplain: '{{word}} — "{{meaning}}". {{note}}',
  toneHint: 'Đúng chữ cái nhưng sai hoặc thiếu thanh điệu.',
  spellingHint: 'Gần đúng rồi — kiểm tra lại chính tả.',
};

export default ex;
