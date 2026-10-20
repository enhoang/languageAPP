import type { Gloss, LText } from '../../../types';
import { MATCH_PROMPT, arrangeWith, choice, listen, typeIt, wordsOf, type DayContent } from '../../helpers';

const L = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });
const G = (vi: string, en: string): Gloss => ({ vi, en });
const arrange = arrangeWith(' ');

const ART = L('Mạo từ', 'Article', '冠词');
const NOUN = L('Danh từ', 'Noun', '名词');
const NUM = L('Số đếm', 'Number', '数词');
const PLURAL = L('Danh từ số nhiều (+ -s)', 'Plural noun (+ -s)', '复数名词（+ -s）');

const NUMBER_IDS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const POLITE_IDS = ['please', 'thank-you', 'sorry', 'excuse-me'];
const WORD_IDS = [...NUMBER_IDS, ...POLITE_IDS];

const words = wordsOf('en-d3', 1, [
  { id: 'one', text: 'one', pron: '/wʌn/', vi: 'một', en: 'the number 1', type: 'number', topic: 'numbers', level: 'Pre-A1',
    ex: ['I have one cat.', 'Tôi có một con mèo.', 'There is just 1 cat in my home.'],
    notes: L('Viết "one" nhưng đọc /wʌn/, giống "won" — chính tả và âm khác nhau.', 'Written "one" but said /wʌn/, like "won" — spelling and sound differ.', '写作 one，却读 /wʌn/，和 won 同音——拼写和读音不一致。') },
  { id: 'two', text: 'two', pron: '/tuː/', vi: 'hai', en: 'the number 2', type: 'number', topic: 'numbers', level: 'Pre-A1',
    ex: ['I see two birds.', 'Tôi thấy hai con chim.', 'There are 2 birds that I can see.'],
    notes: L('Chữ "w" trong "two" câm: đọc /tuː/.', 'The "w" in "two" is silent: say /tuː/.', 'two 中的 w 不发音，读 /tuː/。') },
  { id: 'three', text: 'three', pron: '/θriː/', vi: 'ba', en: 'the number 3', type: 'number', topic: 'numbers', level: 'Pre-A1',
    ex: ['I have three books.', 'Tôi có ba quyển sách.', 'There are 3 books that belong to me.'],
    notes: L('"th" /θ/: đặt đầu lưỡi giữa hai răng rồi thổi hơi — không đọc thành "tri" hay "fri".', '"th" /θ/: put your tongue tip between your teeth and blow — don\'t say "tree" or "free".', 'th /θ/：舌尖放在上下齿之间送气——不要读成 tree 或 free。') },
  { id: 'four', text: 'four', pron: '/fɔːr/', pronUK: '/fɔː/', vi: 'bốn', en: 'the number 4', type: 'number', topic: 'numbers', level: 'Pre-A1',
    ex: ['A cat has four legs.', 'Con mèo có bốn chân.', 'Cats walk on 4 legs.'] },
  { id: 'five', text: 'five', pron: '/faɪv/', vi: 'năm', en: 'the number 5', type: 'number', topic: 'numbers', level: 'Pre-A1',
    ex: ['My son is five years old.', 'Con trai tôi năm tuổi.', "My son's age is 5."],
    notes: L('Đừng bỏ âm cuối /v/: "fai-v", môi dưới chạm răng trên.', 'Don\'t drop the final /v/: "fai-v", lower lip touching the upper teeth.', '不要丢掉词尾 /v/：下唇轻触上齿。') },
  { id: 'six', text: 'six', pron: '/sɪks/', vi: 'sáu', en: 'the number 6', type: 'number', topic: 'numbers', level: 'Pre-A1',
    ex: ['Six eggs, please.', 'Cho tôi sáu quả trứng.', 'I would like 6 eggs.'],
    notes: L('Âm cuối /ks/ phải nghe rõ — "sik" là sai (nghe như "sick" = ốm).', 'The final /ks/ must be heard — "sik" sounds like "sick".', '词尾 /ks/ 要读清楚——读成 sik 会听成 sick（生病）。') },
  { id: 'seven', text: 'seven', pron: '/ˈsevən/', vi: 'bảy', en: 'the number 7', type: 'number', topic: 'numbers', level: 'Pre-A1',
    ex: ['A week has seven days.', 'Một tuần có bảy ngày.', 'There are 7 days in a week.'] },
  { id: 'eight', text: 'eight', pron: '/eɪt/', vi: 'tám', en: 'the number 8', type: 'number', topic: 'numbers', level: 'Pre-A1',
    ex: ["It's eight o'clock.", 'Bây giờ là tám giờ.', 'The time is 8:00.'],
    notes: L('"gh" câm; đọc /eɪt/ và giữ âm cuối /t/.', 'The "gh" is silent; say /eɪt/ and keep the final /t/.', 'gh 不发音，读 /eɪt/，词尾 /t/ 要保留。') },
  { id: 'nine', text: 'nine', pron: '/naɪn/', vi: 'chín', en: 'the number 9', type: 'number', topic: 'numbers', level: 'Pre-A1',
    ex: ['I have nine pens.', 'Tôi có chín cây bút.', 'There are 9 pens that are mine.'] },
  { id: 'ten', text: 'ten', pron: '/ten/', vi: 'mười', en: 'the number 10', type: 'number', topic: 'numbers', level: 'Pre-A1',
    ex: ['I have ten fingers.', 'Tôi có mười ngón tay.', 'My hands have 10 fingers.'] },
  { id: 'please', text: 'please', pron: '/pliːz/', vi: 'làm ơn, vui lòng', en: 'a polite word you add when you ask for something', type: 'adverb', topic: 'basics', level: 'Pre-A1',
    ex: ['Water, please.', 'Làm ơn cho tôi nước.', 'I would like some water.'],
    notes: L('Thêm "please" vào đầu hoặc cuối câu nhờ vả. Người Anh nói "please" rất thường xuyên — giống "ạ" về độ lịch sự.', 'Add "please" at the start or end of a request. English speakers say it very often.', '在请求的开头或结尾加 please。英语母语者常说 please，相当于礼貌的“请”。') },
  { id: 'thank-you', text: 'thank you', pron: '/ˈθæŋk juː/', vi: 'cảm ơn', en: 'words that show you are happy someone helped you', type: 'phrase', topic: 'basics', level: 'Pre-A1',
    ex: ['Thank you very much!', 'Cảm ơn bạn rất nhiều!', 'I am very grateful to you!'],
    notes: L('Thân mật hơn: "Thanks!". Đáp lại: "You\'re welcome." (Không có gì.)', 'More casual: "Thanks!". Reply: "You\'re welcome."', '更随意的说法：Thanks!。回答：You\'re welcome.（不客气。）') },
  { id: 'sorry', text: 'sorry', pron: '/ˈsɑːri/', pronUK: '/ˈsɒri/', vi: 'xin lỗi', en: 'a word you say when you feel bad about a mistake', type: 'adjective', topic: 'basics', level: 'Pre-A1',
    ex: ["I'm sorry, I'm late.", 'Xin lỗi, tôi đến muộn.', 'I feel bad that I did not come on time.'],
    notes: L('Dùng khi bạn đã làm sai. Đáp lại: "That\'s OK." / "No problem."', 'Use it after you make a mistake. Reply: "That\'s OK." / "No problem."', '做错事后用。回答：That\'s OK. / No problem.') },
  { id: 'excuse-me', text: 'excuse me', pron: '/ɪkˈskjuːz miː/', vi: 'xin lỗi (cho tôi hỏi / cho tôi đi qua)', en: 'polite words to get attention or to pass someone', type: 'phrase', topic: 'basics', level: 'Pre-A1',
    ex: ['Excuse me, where is the bus stop?', 'Xin lỗi, trạm xe buýt ở đâu ạ?', 'Pardon me, can you tell me where the bus stop is?'],
    notes: L('Dùng TRƯỚC khi làm phiền ai (hỏi đường, đi qua). "Sorry" dùng SAU khi đã làm sai.', 'Use it BEFORE you bother someone (to ask, to pass). "Sorry" comes AFTER a mistake.', '打扰别人之前（问路、借过）用 excuse me；做错事之后用 sorry。') },
]);

const numberSounds = words.filter((w) => NUMBER_IDS.includes(w.id)).map((w, i) => ({ label: String(i + 1), text: w.text, pron: w.pron, vi: w.vi, en: w.en }));

export const D3: DayContent = {
  lesson: {
    id: 'en-d3', day: 3, stage: 1, minutes: 22, prerequisites: ['en-d2'],
    title: L('Từ và câu thông dụng hằng ngày', 'Everyday words & expressions', '日常词语和表达'),
    subtitle: L(
      'one–ten · please · thank you · sorry · excuse me · a / an · số nhiều -s',
      'one–ten · please · thank you · sorry · excuse me · a / an · plural -s',
      'one–ten · please · thank you · sorry · excuse me · a / an · 复数 -s',
    ),
    objectives: [
      L('Đếm và đọc đúng các số từ 1 đến 10 (one–ten).', 'Count and say the numbers 1 to 10 (one–ten) correctly.', '会数并正确读出 1 到 10（one–ten）。'),
      L('Dùng đúng please, thank you, sorry và excuse me.', 'Use please, thank you, sorry and excuse me correctly.', '正确使用 please、thank you、sorry 和 excuse me。'),
      L('Chọn đúng a hoặc an trước danh từ.', 'Choose a or an correctly before a noun.', '在名词前正确选用 a 或 an。'),
      L('Thêm -s để tạo số nhiều và đọc rõ âm cuối.', 'Add -s to make plurals and say the ending clearly.', '加 -s 构成复数，并把词尾读清楚。'),
    ],
    intro: [
      L(
        'Hôm nay bạn học những từ dùng mỗi ngày: các số đếm và bốn cách nói lịch sự quan trọng nhất trong tiếng Anh.',
        'Today you learn words used every day: the numbers and the four most important polite expressions in English.',
        '今天学习每天都会用到的词：数字，以及英语中最重要的四个礼貌用语。',
      ),
      L(
        'Tiếng Việt nói "một con mèo, hai con mèo" — danh từ không đổi. Tiếng Anh thì khác: "a cat" (một con mèo) nhưng "two cats" (hai con mèo) — thêm -s khi có từ hai trở lên.',
        'Vietnamese says "một con mèo, hai con mèo" — the noun never changes. English is different: "a cat" but "two cats" — add -s for two or more.',
        '越南语说“một con mèo, hai con mèo”，名词不变。英语不同：a cat，但 two cats——两个及以上要加 -s。',
      ),
    ],
    sections: [
      { kind: 'sounds', title: L('Số đếm 1–10', 'Numbers 1–10', '数字 1–10'),
        intro: L('Bấm để nghe từng số. Chú ý các âm cuối: five /v/, six /ks/, eight /t/.', 'Tap to hear each number. Watch the endings: five /v/, six /ks/, eight /t/.', '点击收听每个数字。注意词尾：five /v/、six /ks/、eight /t/。'),
        items: numberSounds },
      { kind: 'text', title: L('Bốn câu lịch sự', 'Four polite expressions', '四个礼貌用语'),
        body: [
          L('please /pliːz/ — "làm ơn, vui lòng": dùng khi nhờ hoặc xin cái gì. "Water, please." (Cho tôi nước.) "Please sit down." (Mời ngồi.)', 'please /pliːz/ — use it when you ask for something. "Water, please." "Please sit down."', 'please /pliːz/——请求别人时用。"Water, please."（请给我水。）"Please sit down."（请坐。）'),
          L('thank you /ˈθæŋk juː/ — "cảm ơn". Thân mật hơn: "Thanks!". Đáp lại: "You\'re welcome." (Không có gì.)', 'thank you /ˈθæŋk juː/ — more casual: "Thanks!". The reply: "You\'re welcome."', 'thank you /ˈθæŋk juː/——“谢谢”。更随意：Thanks!。回答：You\'re welcome.（不客气。）'),
          L('sorry /ˈsɑːri/ — "xin lỗi" SAU khi bạn làm sai: "Sorry, I\'m late." Đáp lại: "That\'s OK."', 'sorry /ˈsɑːri/ — say it AFTER you make a mistake: "Sorry, I\'m late." The reply: "That\'s OK."', 'sorry /ˈsɑːri/——做错事之后说：“Sorry, I\'m late.” 回答：That\'s OK.'),
          L('excuse me /ɪkˈskjuːz miː/ — "xin lỗi" TRƯỚC khi làm phiền ai: gọi người lạ, hỏi đường, xin đi qua. Tiếng Việt dùng chung một từ "xin lỗi", tiếng Anh tách thành hai.', 'excuse me /ɪkˈskjuːz miː/ — say it BEFORE you bother someone: to call a stranger, ask the way, or get past. Vietnamese uses one word, "xin lỗi", for both; English has two.', 'excuse me /ɪkˈskjuːz miː/——打扰别人之前说：叫住陌生人、问路、借过。越南语都说“xin lỗi”，英语分成两个。'),
        ] },
      { kind: 'examples', title: L('Hội thoại mẫu', 'Example dialogues', '对话示例'),
        examples: [
          { text: 'A: Excuse me. Two coffees, please.', vi: 'A: Anh ơi. Cho tôi hai cốc cà phê.', en: 'A: Hello there. I would like 2 cups of coffee.' },
          { text: 'B: Here you are.', vi: 'B: Của chị đây.', en: 'B: Take these, they are for you.' },
          { text: 'A: Thank you!', vi: 'A: Cảm ơn anh!', en: 'A: Thanks a lot!' },
          { text: "B: You're welcome.", vi: 'B: Không có gì.', en: 'B: It was no problem to help.' },
          { text: "A: Oh, sorry!", vi: 'A: Ôi, xin lỗi!', en: 'A: Oh, my mistake!' },
          { text: "B: That's OK.", vi: 'B: Không sao đâu.', en: 'B: It is not a problem.' },
        ] },
      { kind: 'grammar', grammarId: 'en-g-article' },
      { kind: 'text', title: L('Đọc đuôi -s số nhiều', 'Saying the plural -s', '复数 -s 的读法'),
        body: [
          L('/s/ sau âm vô thanh p, t, k, f: cats /kæts/, books /bʊks/.', '/s/ after voiceless sounds p, t, k, f: cats /kæts/, books /bʊks/.', '在清辅音 p, t, k, f 后读 /s/：cats /kæts/、books /bʊks/。'),
          L('/z/ sau nguyên âm và âm hữu thanh: pens /penz/, dogs /dɔːɡz/, eggs /eɡz/.', '/z/ after vowels and voiced sounds: pens /penz/, dogs /dɔːɡz/, eggs /eɡz/.', '在元音和浊辅音后读 /z/：pens /penz/、dogs /dɔːɡz/、eggs /eɡz/。'),
          L('/ɪz/ sau s, x, sh, ch (viết thêm -es): buses /ˈbʌsɪz/, boxes /ˈbɑːksɪz/.', '/ɪz/ after s, x, sh, ch (spelled -es): buses /ˈbʌsɪz/, boxes /ˈbɑːksɪz/.', '在 s, x, sh, ch 后读 /ɪz/（拼写加 -es）：buses /ˈbʌsɪz/、boxes /ˈbɑːksɪz/。'),
        ] },
      { kind: 'speak', title: L('Luyện nói', 'Speaking practice', '口语练习'),
        intro: L('Đọc to từng câu. Nhớ phát âm rõ âm cuối.', 'Read each line aloud. Remember to say the final sounds clearly.', '大声朗读每一句，注意把词尾读清楚。'),
        items: [
          { text: 'one, two, three, four, five', vi: 'một, hai, ba, bốn, năm', en: '1, 2, 3, 4, 5' },
          { text: 'six, seven, eight, nine, ten', vi: 'sáu, bảy, tám, chín, mười', en: '6, 7, 8, 9, 10' },
          { text: 'Thank you very much!', vi: 'Cảm ơn bạn rất nhiều!', en: 'I am very grateful to you!' },
          { text: 'Excuse me.', vi: 'Xin lỗi (cho tôi hỏi).', en: 'Pardon me.' },
          { text: 'Three cats and an egg, please.', vi: 'Cho tôi ba con mèo và một quả trứng.', en: 'I would like 3 cats and 1 egg.' },
        ] },
      { kind: 'tip', title: L('Mẹo: đừng nuốt âm cuối', "Tip: don't swallow the endings", '小贴士：别吞掉词尾'),
        body: L(
          'Tiếng Việt kết thúc âm tiết rất gọn nên người Việt hay bỏ âm cuối tiếng Anh: "six" thành "sit", "five" thành "fai", "cats" thành "cat". Người nghe sẽ hiểu sai số hoặc số lượng! Hãy kéo dài và bật rõ âm cuối: six-s, five-v, cat-s.',
          'Vietnamese syllables end very briefly, so Vietnamese speakers often drop English endings: "six" becomes "sit", "five" becomes "fai", "cats" becomes "cat". Listeners then hear the wrong number or amount! Make the endings clear: six-s, five-v, cat-s.',
          '越南语音节收尾很短，越南人常常丢掉英语词尾：six 读成 sit，five 读成 fai，cats 读成 cat。听的人就会误解数字或数量！要把词尾清楚地读出来：six-s、five-v、cat-s。',
        ) },
      { kind: 'words', title: L('Từ mới: số đếm', 'New words: numbers', '生词：数字'), wordIds: NUMBER_IDS },
      { kind: 'words', title: L('Từ mới: câu lịch sự', 'New words: polite expressions', '生词：礼貌用语'), wordIds: POLITE_IDS },
    ],
    wordIds: WORD_IDS,
    grammarIds: ['en-g-article'],
    practice: [
      listen('en-d3-p1', 'three', ['three', 'tree', 'free', 'see'], 0, { seq: [
        'three /θriː/ = ', G('ba', 'the number 3'), '. ',
        L('Âm /θ/: đầu lưỡi giữa hai răng.', 'The /θ/ sound: tongue tip between the teeth.', '/θ/：舌尖放在上下齿之间。'),
      ] }, { skill: 'pronunciation', targetOptions: true, wordIds: ['three'] }),
      { id: 'en-d3-p2', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: 'two', pron: '/tuː/', vi: 'hai', en: 'the number 2' },
        { text: 'four', pron: '/fɔːr/', vi: 'bốn', en: 'the number 4' },
        { text: 'seven', pron: '/ˈsevən/', vi: 'bảy', en: 'the number 7' },
        { text: 'nine', pron: '/naɪn/', vi: 'chín', en: 'the number 9' },
      ], explanation: L('two = 2 · four = 4 · seven = 7 · nine = 9.', 'two = 2 · four = 4 · seven = 7 · nine = 9.', 'two = 2 · four = 4 · seven = 7 · nine = 9。'), wordIds: ['two', 'four', 'seven', 'nine'] },
      choice('en-d3-p3', 'vocabulary', L(
        'Bạn cần đi qua một người đang đứng chắn đường. Bạn nói:',
        'Someone is standing in your way and you need to get past. You say:',
        '有人挡住了你的路，你需要过去。你说：',
      ), ['Excuse me.', 'Thank you.', 'Please.', "You're welcome."], 0, L(
        '"Excuse me" dùng TRƯỚC khi làm phiền ai, ví dụ xin đi qua.',
        '"Excuse me" is said BEFORE you bother someone, e.g. to get past.',
        '打扰别人之前（比如借过）说 Excuse me。',
      ), { targetOptions: true, wordIds: ['excuse-me'] }),
      choice('en-d3-p4', 'grammar', L('Chọn a hoặc an: ___ egg', 'Choose a or an: ___ egg', '选择 a 或 an：___ egg'), ['a', 'an'], 1, L(
        '"egg" bắt đầu bằng nguyên âm /e/ → an egg.',
        '"egg" starts with a vowel sound /e/ → an egg.',
        'egg 以元音 /e/ 开头 → an egg。',
      ), { targetOptions: true, grammarId: 'en-g-article' }),
      typeIt('en-d3-p5', 'spelling', { k: 'ex.write.spelling', p: { meaning: G('bảy', 'the number 7') } }, ['seven'], L(
        'seven /ˈsevən/: s-e-v-e-n.',
        'seven /ˈsevən/: s-e-v-e-n.',
        'seven /ˈsevən/：s-e-v-e-n。',
      ), { audio: 'seven', wordIds: ['seven'] }),
      arrange('en-d3-p6', G('Cảm ơn bạn rất nhiều.', 'I am very grateful to you.'), ['Thank', 'you', 'very', 'much'], L(
        'Thank you + very much (rất nhiều).',
        'Thank you + very much.',
        'Thank you + very much（非常）。',
      ), ['thank-you']),
      listen('en-d3-p7', 'eight', ['eight', 'nine', 'five', 'four'], 0, { seq: [
        'eight /eɪt/ = ', G('tám', 'the number 8'), '. ',
        L('"gh" câm.', 'The "gh" is silent.', 'gh 不发音。'),
      ] }, { targetOptions: true, wordIds: ['eight'] }),
    ],
    quiz: [
      listen('en-d3-q1', 'six', ['six', 'sit', 'fix', 'seven'], 0, { seq: [
        'six /sɪks/ = ', G('sáu', 'the number 6'), '. ',
        L('Âm cuối /ks/ phải rõ.', 'The final /ks/ must be clear.', '词尾 /ks/ 要清楚。'),
      ] }, { skill: 'pronunciation', targetOptions: true, wordIds: ['six'] }),
      choice('en-d3-q2', 'grammar', L('Chọn a hoặc an: ___ apple', 'Choose a or an: ___ apple', '选择 a 或 an：___ apple'), ['an', 'a'], 0, L(
        '"apple" bắt đầu bằng nguyên âm /æ/ → an apple.',
        '"apple" starts with the vowel sound /æ/ → an apple.',
        'apple 以元音 /æ/ 开头 → an apple。',
      ), { targetOptions: true, grammarId: 'en-g-article' }),
      choice('en-d3-q3', 'grammar', L('Điền vào chỗ trống: "one book, three ___"', 'Fill in the blank: "one book, three ___"', '填空：“one book, three ___”'), ['books', 'book', 'a books', 'bookes'], 0, L(
        'Từ hai trở lên → thêm -s: three books (đọc /bʊks/).',
        'Two or more → add -s: three books (said /bʊks/).',
        '两个及以上 → 加 -s：three books（读 /bʊks/）。',
      ), { targetOptions: true, grammarId: 'en-g-article', wordIds: ['three'] }),
      typeIt('en-d3-q4', 'spelling', { k: 'ex.write.spelling', p: { meaning: G('làm ơn, vui lòng', 'a polite word you add when you ask for something') } }, ['please'], L(
        'please /pliːz/: p-l-e-a-s-e (chữ e cuối câm, "s" đọc /z/).',
        'please /pliːz/: p-l-e-a-s-e (the final e is silent, the "s" sounds /z/).',
        'please /pliːz/：p-l-e-a-s-e（末尾 e 不发音，s 读 /z/）。',
      ), { audio: 'please', wordIds: ['please'] }),
      choice('en-d3-q5', 'vocabulary', L('Bạn của bạn nói "Thank you!". Bạn đáp:', 'Your friend says "Thank you!". You reply:', '朋友对你说 “Thank you!”，你回答：'), ["You're welcome.", 'Excuse me.', 'Please.', 'Sorry.'], 0, L(
        'Đáp lại lời cảm ơn: "You\'re welcome." (Không có gì.)',
        'The reply to thanks is "You\'re welcome."',
        '回应感谢：You\'re welcome.（不客气。）',
      ), { targetOptions: true, wordIds: ['thank-you'] }),
      { id: 'en-d3-q6', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: 'please', pron: '/pliːz/', vi: 'làm ơn, vui lòng', en: 'a polite word you add when you ask for something' },
        { text: 'thank you', pron: '/ˈθæŋk juː/', vi: 'cảm ơn', en: 'words that show you are happy someone helped you' },
        { text: 'sorry', pron: '/ˈsɑːri/', vi: 'xin lỗi', en: 'a word you say when you feel bad about a mistake' },
        { text: 'ten', pron: '/ten/', vi: 'mười', en: 'the number 10' },
      ], explanation: { seq: [
        'please = ', G('làm ơn', 'used to ask politely'), ' · thank you = ', G('cảm ơn', 'used to thank'), ' · sorry = ', G('xin lỗi', 'used after a mistake'), ' · ten = 10.',
      ] }, wordIds: ['please', 'thank-you', 'sorry', 'ten'] },
      arrange('en-d3-q7', G('Tôi có ba con mèo.', 'There are 3 cats that belong to me.'), ['I', 'have', 'three', 'cats'], L(
        'I + have + three + cats. Có "three" nên "cat" thêm -s.',
        'I + have + three + cats. With "three", "cat" takes -s.',
        'I + have + three + cats。有 three，所以 cat 要加 -s。',
      ), ['three']),
      choice('en-d3-q8', 'reading', L('Hai cộng ba bằng mấy? two + three = ?', 'What is two plus three? two + three = ?', '二加三等于几？two + three = ?'), ['five', 'four', 'six', 'nine'], 0, L(
        '2 + 3 = 5 → five /faɪv/.',
        '2 + 3 = 5 → five /faɪv/.',
        '2 + 3 = 5 → five /faɪv/。',
      ), { targetOptions: true, wordIds: ['two', 'three', 'five'] }),
      typeIt('en-d3-q9', 'spelling', { k: 'ex.write.spelling', p: { meaning: G('một', 'the number 1') } }, ['one'], L(
        'Đọc /wʌn/ nhưng viết o-n-e.',
        'Said /wʌn/ but spelled o-n-e.',
        '读 /wʌn/，拼写却是 o-n-e。',
      ), { audio: 'one', wordIds: ['one'] }),
    ],
    summary: [
      L('Số 1–10: one, two, three, four, five, six, seven, eight, nine, ten.', 'Numbers 1–10: one, two, three, four, five, six, seven, eight, nine, ten.', '数字 1–10：one, two, three, four, five, six, seven, eight, nine, ten。'),
      L('please = làm ơn · thank you = cảm ơn · sorry = xin lỗi (sau khi làm sai) · excuse me = xin lỗi (trước khi làm phiền).', 'please to ask · thank you to thank · sorry after a mistake · excuse me before you bother someone.', 'please 请求 · thank you 感谢 · sorry 做错事后道歉 · excuse me 打扰别人之前。'),
      L('a + âm phụ âm (a cat), an + âm nguyên âm (an egg).', 'a + consonant sound (a cat), an + vowel sound (an egg).', 'a + 辅音（a cat），an + 元音（an egg）。'),
      L('Từ hai trở lên: thêm -s (two cats) và đọc rõ âm cuối.', 'Two or more: add -s (two cats) and say the ending clearly.', '两个及以上：加 -s（two cats），并把词尾读清楚。'),
    ],
  },
  words,
  grammar: [
    {
      id: 'en-g-article',
      lessonId: 'en-d3',
      title: L('a / an và số nhiều -s', 'a / an and plural -s', 'a / an 和复数 -s'),
      pattern: L(
        'a + âm phụ âm · an + âm nguyên âm · số đếm (≥ 2) + danh từ + -s',
        'a + consonant sound · an + vowel sound · number (≥ 2) + noun + -s',
        'a + 辅音开头 · an + 元音开头 · 数词（≥ 2）+ 名词 + -s',
      ),
      meaning: [
        L(
          '"a" và "an" nghĩa là "một" (một cái/con nào đó), đứng trước danh từ số ít đếm được. Tiếng Việt dùng "một con, một cái"; tiếng Anh dùng a/an.',
          '"a" and "an" mean "one (any one)" and go before a singular countable noun. Vietnamese uses "một con, một cái"; English uses a/an.',
          'a 和 an 表示“一个”，放在可数名词单数前。越南语用“một con, một cái”，英语用 a/an。',
        ),
        L(
          'Chọn theo ÂM đầu, không theo chữ: an + âm nguyên âm (an apple, an egg, an hour — "h" câm); a + âm phụ âm (a cat, a book, a university — "u" đọc /juː/).',
          'Choose by the first SOUND, not the letter: an + vowel sound (an apple, an egg, an hour — silent "h"); a + consonant sound (a cat, a book, a university — "u" sounds /juː/).',
          '看首字母的“读音”而不是字母：元音开头用 an（an apple, an egg, an hour——h 不发音）；辅音开头用 a（a cat, a book, a university——u 读 /juː/）。',
        ),
        L(
          'Từ hai trở lên, danh từ thêm -s: one cat → two cats. Sau s, x, sh, ch thêm -es: a box → two boxes. Không dùng a/an với danh từ số nhiều.',
          'For two or more, the noun takes -s: one cat → two cats. After s, x, sh, ch add -es: a box → two boxes. Never use a/an with a plural noun.',
          '两个及以上，名词加 -s：one cat → two cats。以 s, x, sh, ch 结尾加 -es：a box → two boxes。复数名词前不用 a/an。',
        ),
      ],
      breakdown: [
        [{ text: 'a', role: ART }, { text: 'cat', role: NOUN }],
        [{ text: 'an', role: ART }, { text: 'apple', role: NOUN }],
        [{ text: 'two', role: NUM }, { text: 'cats', role: PLURAL }],
      ],
      examples: [
        { text: 'I have a dog.', vi: 'Tôi có một con chó.', en: 'There is 1 dog that is mine.' },
        { text: 'This is an egg.', vi: 'Đây là một quả trứng.', en: 'The thing here is 1 egg.' },
        { text: 'I want two apples, please.', vi: 'Cho tôi hai quả táo.', en: 'I would like 2 apples.' },
        { text: 'She has four boxes.', vi: 'Cô ấy có bốn cái hộp.', en: 'There are 4 boxes that are hers.' },
      ],
      mistakes: [
        { wrong: 'a apple', right: 'an apple', why: L('"apple" bắt đầu bằng âm nguyên âm → an.', '"apple" starts with a vowel sound → an.', 'apple 以元音开头 → 用 an。') },
        { wrong: 'two cat', right: 'two cats', why: L('Từ hai trở lên phải thêm -s. Tiếng Việt không đổi danh từ, tiếng Anh thì có.', 'Two or more needs -s. Vietnamese nouns don\'t change, English nouns do.', '两个及以上要加 -s。越南语名词不变，英语名词要变。') },
        { wrong: 'a hour', right: 'an hour', why: L('Chữ "h" trong "hour" câm, âm đầu là nguyên âm /aʊ/ → an.', 'The "h" in "hour" is silent; it starts with the vowel sound /aʊ/ → an.', 'hour 中的 h 不发音，以元音 /aʊ/ 开头 → 用 an。') },
        { wrong: 'a books', right: 'books / a book', why: L('Không dùng a/an với danh từ số nhiều.', "Don't use a/an with a plural noun.", '复数名词前不用 a/an。') },
      ],
      exercises: [
        choice('en-g-article-1', 'grammar', L('Chọn a hoặc an: ___ book', 'Choose a or an: ___ book', '选择 a 或 an：___ book'), ['a', 'an'], 0, L(
          '"book" bắt đầu bằng phụ âm /b/ → a book.',
          '"book" starts with the consonant sound /b/ → a book.',
          'book 以辅音 /b/ 开头 → a book。',
        ), { targetOptions: true, grammarId: 'en-g-article' }),
        choice('en-g-article-2', 'grammar', L('Câu nào đúng?', 'Which sentence is correct?', '哪个句子是正确的？'), ['I have two dogs.', 'I have two dog.', 'I have a dogs.', 'I have an dog.'], 0, L(
          'Từ hai trở lên → danh từ thêm -s; không dùng a/an với số nhiều.',
          'Two or more → the noun takes -s; no a/an with plurals.',
          '两个及以上 → 名词加 -s；复数前不用 a/an。',
        ), { targetOptions: true, grammarId: 'en-g-article', wordIds: ['two'] }),
        choice('en-g-article-3', 'grammar', L('Chọn a hoặc an: ___ hour', 'Choose a or an: ___ hour', '选择 a 或 an：___ hour'), ['an', 'a'], 0, L(
          '"h" câm, "hour" đọc /aʊr/ → an hour.',
          'The "h" is silent; "hour" is said /aʊr/ → an hour.',
          'h 不发音，hour 读 /aʊr/ → an hour。',
        ), { targetOptions: true, grammarId: 'en-g-article' }),
        { ...arrange('en-g-article-4', G('Tôi có năm quả trứng.', 'There are 5 eggs that are mine.'), ['I', 'have', 'five', 'eggs'], L(
          'five + eggs (thêm -s vì có năm quả).',
          'five + eggs (add -s for five).',
          'five + eggs（五个，所以加 -s）。',
        ), ['five']), grammarId: 'en-g-article' },
      ],
    },
  ],
};
