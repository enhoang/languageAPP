import type { LText, SoundItem } from '../../../types';
import { MATCH_PROMPT, arrangeWith, choice, listen, typeIt, wordsOf, type DayContent } from '../../helpers';

const L = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });
const arrange = arrangeWith(' ');

/** Letter names in IPA (American; British differences in the note). */
const LETTERS: [string, string, LText?][] = [
  ['A', '/eɪ/', L('Đọc "ây", không phải "a".', 'Said "ay", not "ah".', '读 "ei"，不读 "a"。')],
  ['B', '/biː/'],
  ['C', '/siː/', L('Đọc "xi".', 'Said "see".', '读 "si"。')],
  ['D', '/diː/'],
  ['E', '/iː/', L('Đọc "i" — dễ nhầm với I!', 'Said "ee" — easy to confuse with I!', '读 "i"——容易和 I 混淆！')],
  ['F', '/ef/'],
  ['G', '/dʒiː/', L('Đọc "gi" — dễ nhầm với J.', 'Said "jee" — easy to confuse with J.', '读 "ji"——容易和 J 混淆。')],
  ['H', '/eɪtʃ/', L('Đọc "ây-ch".', 'Said "aych".', '读 "eich"。')],
  ['I', '/aɪ/', L('Đọc "ai" — dễ nhầm với E!', 'Said "eye" — easy to confuse with E!', '读 "ai"——容易和 E 混淆！')],
  ['J', '/dʒeɪ/', L('Đọc "giây".', 'Said "jay".', '读 "jei"。')],
  ['K', '/keɪ/'],
  ['L', '/el/'],
  ['M', '/em/'],
  ['N', '/en/'],
  ['O', '/oʊ/', L('Anh–Anh: /əʊ/.', 'British: /əʊ/.', '英式：/əʊ/。')],
  ['P', '/piː/'],
  ['Q', '/kjuː/', L('Đọc "kiu".', 'Said "kyoo".', '读 "kiu"。')],
  ['R', '/ɑːr/', L('Anh–Anh: /ɑː/ (không cong lưỡi).', 'British: /ɑː/ (no "r" sound).', '英式：/ɑː/（不卷舌）。')],
  ['S', '/es/'],
  ['T', '/tiː/'],
  ['U', '/juː/', L('Đọc "diu" — giống từ "you".', 'Said like the word "you".', '读起来像单词 "you"。')],
  ['V', '/viː/'],
  ['W', '/ˈdʌbəljuː/', L('"double U" — chữ duy nhất có 3 âm tiết.', '"double U" — the only letter name with three syllables.', '"double U"——唯一有三个音节的字母名。')],
  ['X', '/eks/'],
  ['Y', '/waɪ/', L('Đọc "goai" — giống từ "why".', 'Said like the word "why".', '读起来像单词 "why"。')],
  ['Z', '/ziː/', L('Anh–Anh: /zed/.', 'British: /zed/.', '英式：/zed/。')],
];

const ALPHABET: SoundItem[] = LETTERS.map(([letter, pron, note]) => ({ label: `${letter} ${letter.toLowerCase()}`, text: letter, pron, ...(note ? { note } : {}) }));

const WORDS = wordsOf('en-d1', 1, [
  { id: 'yes', text: 'yes', pron: '/jes/', vi: 'vâng, có, đúng', en: 'a word to agree or say that something is true', type: 'interjection', topic: 'basics', level: 'Pre-A1',
    ex: ['Yes, that is my name.', 'Vâng, đó là tên tôi.', 'Right, I am called that.'] },
  { id: 'no', text: 'no', pron: '/noʊ/', pronUK: '/nəʊ/', vi: 'không (lời đáp)', en: 'a word to disagree or say that something is not true', type: 'interjection', topic: 'basics', level: 'Pre-A1',
    ex: ['No, it is not a letter.', 'Không, đó không phải là chữ cái.', 'That is not a sign like A or B.'],
    notes: L('Phát âm như chữ O /oʊ/ với "n" ở đầu.', 'Sounds like the letter O /oʊ/ with "n" in front.', '读音像字母 O /oʊ/ 前面加 "n"。') },
  { id: 'name', text: 'name', pron: '/neɪm/', vi: 'tên', en: 'what people call you', type: 'noun', topic: 'basics', level: 'Pre-A1',
    ex: ['What is your name?', 'Bạn tên là gì?', 'What do people call you?'],
    notes: L('Chữ "e" cuối câm: name = /neɪm/, không đọc "na-me".', 'The final "e" is silent: name = /neɪm/, not "na-me".', '结尾的 "e" 不发音：name = /neɪm/，不读 "na-me"。') },
  { id: 'letter', text: 'letter', pron: '/ˈletər/', pronUK: '/ˈletə/', vi: 'chữ cái', en: 'a sign like A, B or C', type: 'noun', topic: 'basics', level: 'Pre-A1',
    ex: ['A is the first letter.', 'A là chữ cái đầu tiên.', 'A comes at the start of the alphabet.'],
    notes: L('"letter" cũng có nghĩa là "lá thư".', '"letter" also means a written message you send.', '"letter" 也有 "信件" 的意思。') },
  { id: 'word', text: 'word', pron: '/wɜːrd/', pronUK: '/wɜːd/', vi: 'từ', en: 'a group of letters with a meaning', type: 'noun', topic: 'basics', level: 'Pre-A1',
    ex: ['Say the word again, please.', 'Làm ơn nói lại từ đó.', 'Please repeat that group of letters.'] },
  { id: 'spell', text: 'spell', pron: '/spel/', vi: 'đánh vần', en: 'to say or write the letters of a word in order', type: 'verb', topic: 'basics', level: 'Pre-A1',
    ex: ['How do you spell it?', 'Từ đó đánh vần thế nào?', 'What are its letters?'] },
  { id: 'alphabet', text: 'alphabet', pron: '/ˈælfəbet/', vi: 'bảng chữ cái', en: 'all the letters of a language in order', type: 'noun', topic: 'basics', level: 'Pre-A1',
    ex: ['The English alphabet has 26 letters.', 'Bảng chữ cái tiếng Anh có 26 chữ cái.', 'There are 26 letters in English.'] },
]);

export const D1: DayContent = {
  lesson: {
    id: 'en-d1', day: 1, stage: 1, minutes: 20, prerequisites: [],
    title: L('Làm quen tiếng Anh', 'Meet English', '初识英语'),
    subtitle: L(
      'Bảng chữ cái · tên chữ cái · nguyên âm và phụ âm · đánh vần · phiên âm IPA',
      'The alphabet · letter names · vowels and consonants · spelling · IPA',
      '字母表 · 字母名称 · 元音和辅音 · 拼写 · 国际音标',
    ),
    objectives: [
      L('Đọc đúng tên 26 chữ cái tiếng Anh.', 'Say the names of the 26 English letters correctly.', '正确读出 26 个英文字母的名称。'),
      L('Phân biệt nguyên âm (a, e, i, o, u) và phụ âm; chữ hoa và chữ thường.', 'Tell vowels (a, e, i, o, u) from consonants, and capital letters from small letters.', '分清元音字母（a, e, i, o, u）和辅音字母，以及大写和小写字母。'),
      L('Đánh vần tên mình và hỏi "How do you spell it?".', 'Spell your name and ask "How do you spell it?".', '拼出自己的名字，并会问 "How do you spell it?"。'),
      L('Hiểu vì sao chữ viết khác cách đọc và cách đọc phiên âm IPA.', 'Understand why spelling differs from sound, and how to read IPA.', '理解为什么拼写和读音不同，并学会看国际音标。'),
      L('Học 7 từ: yes, no, name, letter, word, spell, alphabet.', 'Learn 7 words: yes, no, name, letter, word, spell, alphabet.', '学习 7 个单词：yes、no、name、letter、word、spell、alphabet。'),
    ],
    intro: [
      L(
        'Tin vui: tiếng Anh dùng chữ Latinh giống tiếng Việt, nên bạn đã biết mặt chữ! Tiếng Anh có 26 chữ cái, không có dấu thanh, và có bốn chữ tiếng Việt không dùng: F, J, W, Z.',
        'Good news: English uses the Latin alphabet, like Vietnamese, so you already know the letters! English has 26 letters, no tone marks, and four letters Vietnamese does not use: F, J, W, Z.',
        '好消息：英语和越南语一样使用拉丁字母，所以你已经认识这些字母了！英语有 26 个字母，没有声调符号，还有四个越南语不用的字母：F、J、W、Z。',
      ),
      L(
        'Nhưng tên chữ cái và cách đọc khác hẳn tiếng Việt: chữ A đọc là "ây", chữ E đọc là "i", chữ I đọc là "ai". Hôm nay ta học tên chữ cái và cách dùng phiên âm IPA để đọc đúng mọi từ.',
        'But the letter names and sounds are very different from Vietnamese: A is "ay", E is "ee", I is "eye". Today you learn the letter names and how IPA helps you pronounce any word.',
        '但字母名称和读音和越南语很不一样：A 读 "ei"，E 读 "i"，I 读 "ai"。今天我们学习字母名称，以及如何用国际音标读准每个单词。',
      ),
    ],
    sections: [
      {
        kind: 'sounds',
        title: L('Bảng chữ cái tiếng Anh (26 chữ)', 'The English alphabet (26 letters)', '英语字母表（26 个字母）'),
        intro: L(
          'Bấm từng chữ để nghe tên của nó. Tên chữ cái dùng khi đánh vần — không phải âm của chữ trong từ.',
          'Tap each letter to hear its name. Letter names are used for spelling — they are not the sound the letter makes inside a word.',
          '点击每个字母听它的名称。字母名称用于拼读单词，并不是字母在单词里的发音。',
        ),
        items: ALPHABET,
      },
      {
        kind: 'text',
        title: L('Nguyên âm và phụ âm', 'Vowels and consonants', '元音字母和辅音字母'),
        body: [
          L(
            'Có 5 nguyên âm: A, E, I, O, U (đôi khi cả Y, như trong "my"). 21 chữ còn lại là phụ âm: B, C, D, F, G…',
            'There are 5 vowel letters: A, E, I, O, U (sometimes Y too, as in "my"). The other 21 letters are consonants: B, C, D, F, G…',
            '有 5 个元音字母：A、E、I、O、U（有时 Y 也算，比如 "my"）。其余 21 个是辅音字母：B、C、D、F、G……',
          ),
          L(
            'Vì sao quan trọng? Nguyên âm quyết định cách dùng "a" hay "an": a book, nhưng an apple (sẽ học ở ngày 3).',
            'Why does it matter? Vowels decide whether you say "a" or "an": a book, but an apple (Day 3).',
            '为什么重要？元音决定用 "a" 还是 "an"：a book，但 an apple（第 3 天学习）。',
          ),
          L(
            'Cặp tên chữ dễ nhầm với người Việt: E /iː/ – I /aɪ/, G /dʒiː/ – J /dʒeɪ/, A /eɪ/ – H /eɪtʃ/, Y /waɪ/ – W /ˈdʌbəljuː/.',
            'Letter names Vietnamese speakers often mix up: E /iː/ – I /aɪ/, G /dʒiː/ – J /dʒeɪ/, A /eɪ/ – H /eɪtʃ/, Y /waɪ/ – W /ˈdʌbəljuː/.',
            '越南人容易混淆的字母名称：E /iː/ – I /aɪ/、G /dʒiː/ – J /dʒeɪ/、A /eɪ/ – H /eɪtʃ/、Y /waɪ/ – W /ˈdʌbəljuː/。',
          ),
        ],
      },
      {
        kind: 'text',
        title: L('Chữ hoa và chữ thường', 'Capital and small letters', '大写字母和小写字母'),
        body: [
          L(
            'Mỗi chữ có hai dạng: chữ hoa (A B C) và chữ thường (a b c).',
            'Every letter has two forms: capital (A B C) and small (a b c).',
            '每个字母都有两种写法：大写（A B C）和小写（a b c）。',
          ),
          L(
            'Viết hoa chữ đầu câu, tên người, tên nước, tên ngôn ngữ và đại từ "I" (tôi): My name is Lan. I am from Vietnam. I speak English.',
            'Use a capital for the first word of a sentence, names of people, countries and languages, and the pronoun "I": My name is Lan. I am from Vietnam. I speak English.',
            '句首单词、人名、国名、语言名称和代词 "I"（我）要大写：My name is Lan. I am from Vietnam. I speak English.',
          ),
        ],
      },
      {
        kind: 'examples',
        title: L('Đánh vần tên của bạn', 'Spelling your name', '拼出你的名字'),
        examples: [
          { text: "What's your name?", vi: 'Bạn tên gì?', en: 'Tell me what you are called.' },
          { text: 'My name is Lan.', vi: 'Tên tôi là Lan.', en: 'I am called Lan.' },
          { text: 'How do you spell your name?', vi: 'Tên bạn đánh vần thế nào?', en: 'What are the letters of your name?' },
          { text: 'L - A - N.', pron: '/el eɪ en/', vi: 'L - A - N (đọc "eo – ây – en").', en: 'The letters L, A and N.' },
          { text: 'Thank you. Is that right? — Yes!', vi: 'Cảm ơn. Đúng không? — Đúng rồi!', en: 'Thanks. Is it correct? — It is!' },
        ],
      },
      {
        kind: 'tip',
        title: L('Đánh vần chữ đôi', 'Spelling double letters', '双写字母的拼读'),
        body: L(
          'Khi có hai chữ giống nhau liền nhau, người ta hay nói "double": Anna = A - double N - A; Hoang = H - O - A - N - G.',
          'When the same letter appears twice in a row, people often say "double": Anna = A - double N - A; Hoang = H - O - A - N - G.',
          '同一个字母连续出现两次时，常说 "double"：Anna = A - double N - A；Hoang = H - O - A - N - G。',
        ),
      },
      {
        kind: 'text',
        title: L('Vì sao viết một đằng, đọc một nẻo?', 'Why spelling is not sound', '为什么拼写和读音不一致？'),
        body: [
          L(
            'Tiếng Việt gần như đọc sao viết vậy. Tiếng Anh thì không: chỉ 26 chữ cái nhưng có khoảng 44 âm.',
            'Vietnamese is mostly read the way it is written. English is not: it has only 26 letters but about 44 sounds.',
            '越南语基本上怎么写就怎么读。英语不是：只有 26 个字母，却有大约 44 个音。',
          ),
          L(
            'Một chữ, nhiều âm: chữ "a" trong cat /æ/, name /eɪ/, father /ɑː/. Một âm, nhiều cách viết: /iː/ trong see, sea, me, key.',
            'One letter, many sounds: "a" in cat /æ/, name /eɪ/, father /ɑː/. One sound, many spellings: /iː/ in see, sea, me, key.',
            '一个字母，多种读音："a" 在 cat /æ/、name /eɪ/、father /ɑː/ 中读音不同。一个音，多种拼写：see、sea、me、key 中都是 /iː/。',
          ),
          L(
            'Chữ câm: k trong knife /naɪf/, w trong write /raɪt/, e cuối trong name /neɪm/.',
            'Silent letters: the k in knife /naɪf/, the w in write /raɪt/, the final e in name /neɪm/.',
            '不发音的字母：knife /naɪf/ 中的 k，write /raɪt/ 中的 w，name /neɪm/ 结尾的 e。',
          ),
        ],
      },
      {
        kind: 'sounds',
        title: L('Phiên âm IPA giúp bạn đọc đúng', 'IPA shows the real sounds', '国际音标告诉你真正的读音'),
        intro: L(
          'IPA viết trong dấu / /: mỗi ký hiệu là đúng một âm. ˈ đặt trước âm tiết được nhấn; ː nghĩa là âm dài. Ví dụ apple = /ˈæpəl/: nhấn "AP", âm cuối nhẹ /əl/.',
          'IPA is written between / /: each symbol is exactly one sound. ˈ comes before the stressed syllable; ː means a long sound. Example: apple = /ˈæpəl/ — stress on "AP", a light /əl/ at the end.',
          '国际音标写在 / / 之间：每个符号只代表一个音。ˈ 放在重读音节前；ː 表示长音。例如 apple = /ˈæpəl/：重音在 "AP"，结尾轻读 /əl/。',
        ),
        items: [
          { label: '/ˈæpəl/', text: 'apple', pron: '/ˈæpəl/', vi: 'quả táo', en: 'a round red or green fruit', note: L('Anh–Anh: /ˈæpl/.', 'British: /ˈæpl/.', '英式：/ˈæpl/。') },
          { label: '/neɪm/', text: 'name', pron: '/neɪm/', vi: 'tên', en: 'what people call you', note: L('e cuối không đọc.', 'The final e is silent.', '结尾的 e 不发音。') },
          { label: '/siː/', text: 'see', pron: '/siː/', vi: 'nhìn thấy', en: 'to notice with your eyes' },
          { label: '/siː/', text: 'sea', pron: '/siː/', vi: 'biển', en: 'a big area of salt water', note: L('Viết khác see nhưng đọc giống hệt.', 'Spelled differently from see but sounds the same.', '拼写和 see 不同，但读音完全一样。') },
          { label: '/naɪf/', text: 'knife', pron: '/naɪf/', vi: 'con dao', en: 'a tool for cutting', note: L('k câm.', 'Silent k.', 'k 不发音。') },
          { label: '/ˈfɑːðər/', text: 'father', pron: '/ˈfɑːðər/', vi: 'bố', en: 'a male parent', note: L('Anh–Anh: /ˈfɑːðə/.', 'British: /ˈfɑːðə/.', '英式：/ˈfɑːðə/。') },
        ],
      },
      { kind: 'words', title: L('Từ mới', 'New words', '生词'), wordIds: WORDS.map((w) => w.id) },
      {
        kind: 'speak',
        title: L('Đọc to', 'Say it aloud', '大声读'),
        intro: L('Đọc tên các chữ cái dễ nhầm, rồi đánh vần tên của bạn.', 'Say the easily confused letter names, then spell your own name.', '读出容易混淆的字母名称，然后拼出你自己的名字。'),
        items: [
          { text: 'A, E, I, O, U', pron: '/eɪ iː aɪ oʊ juː/', vi: 'năm nguyên âm', en: 'the five vowel letters' },
          { text: 'G, J', pron: '/dʒiː dʒeɪ/' },
          { text: 'H, W, Y', pron: '/eɪtʃ ˈdʌbəljuː waɪ/' },
          { text: 'How do you spell it?', vi: 'Từ đó đánh vần thế nào?', en: 'What are its letters?' },
          { text: 'My name is Lan. L - A - N.', vi: 'Tên tôi là Lan. L - A - N.', en: 'I am called Lan, spelled L, A, N.' },
          { text: 'apple', pron: '/ˈæpəl/', vi: 'quả táo', en: 'a round red or green fruit' },
        ],
      },
    ],
    wordIds: WORDS.map((w) => w.id),
    grammarIds: [],
    practice: [
      listen('en-d1-p1', 'E', ['E', 'I', 'A'], 0, L(
        'Chữ E đọc là /iː/ ("i"); chữ I đọc là /aɪ/ ("ai"); chữ A đọc là /eɪ/ ("ây").',
        'E is /iː/ ("ee"); I is /aɪ/ ("eye"); A is /eɪ/ ("ay").',
        'E 读 /iː/；I 读 /aɪ/；A 读 /eɪ/。',
      ), { skill: 'pronunciation', targetOptions: true }),
      listen('en-d1-p2', 'G', ['G', 'J', 'Z'], 0, L(
        'G = /dʒiː/ ("gi"), J = /dʒeɪ/ ("giây"), Z = /ziː/.',
        'G = /dʒiː/ ("jee"), J = /dʒeɪ/ ("jay"), Z = /ziː/.',
        'G = /dʒiː/，J = /dʒeɪ/，Z = /ziː/。',
      ), { skill: 'pronunciation', targetOptions: true }),
      choice('en-d1-p3', 'reading', L('Chữ nào là nguyên âm?', 'Which letter is a vowel?', '哪个是元音字母？'), ['O', 'B', 'K', 'S'], 0, L(
        'Năm nguyên âm là A, E, I, O, U.',
        'The five vowels are A, E, I, O, U.',
        '五个元音字母是 A、E、I、O、U。',
      ), { targetOptions: true }),
      { id: 'en-d1-p4', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: 'yes', pron: '/jes/', vi: 'vâng, có, đúng', en: 'a word to agree or say that something is true' },
        { text: 'name', pron: '/neɪm/', vi: 'tên', en: 'what people call you' },
        { text: 'letter', pron: '/ˈletər/', vi: 'chữ cái', en: 'a sign like A, B or C' },
        { text: 'spell', pron: '/spel/', vi: 'đánh vần', en: 'to say or write the letters of a word in order' },
      ], explanation: L(
        'yes = vâng/có, name = tên, letter = chữ cái, spell = đánh vần.',
        'yes = agree, name = what you are called, letter = A, B, C…, spell = say the letters.',
        'yes = 是，name = 名字，letter = 字母，spell = 拼写。',
      ), wordIds: ['yes', 'name', 'letter', 'spell'] },
      typeIt('en-d1-p5', 'spelling', { k: 'ex.write.spelling', p: { meaning: { vi: 'tên', en: 'what people call you' } } }, ['name'], L(
        'name = N - A - M - E /neɪm/. Chữ e cuối không đọc nhưng vẫn phải viết.',
        'name = N - A - M - E /neɪm/. The final e is silent but you still write it.',
        'name = N - A - M - E /neɪm/。结尾的 e 不发音，但要写出来。',
      ), { audio: 'name', wordIds: ['name'] }),
      arrange('en-d1-p6', { vi: 'Từ đó đánh vần thế nào?', en: 'What are its letters?' }, ['How', 'do', 'you', 'spell', 'it?'], L(
        'Câu hỏi bắt đầu bằng How (thế nào), rồi do you spell it.',
        'The question starts with How, then do you spell it.',
        '问句以 How 开头，接着是 do you spell it。',
      ), ['spell']),
      choice('en-d1-p7', 'pronunciation', L('Trong /ˈæpəl/, dấu ˈ cho biết điều gì?', 'In /ˈæpəl/, what does the mark ˈ tell you?', '在 /ˈæpəl/ 中，符号 ˈ 表示什么？'), [
        L('Âm tiết sau nó được nhấn mạnh', 'The syllable after it is stressed', '它后面的音节要重读'),
        L('Âm đó đọc dài', 'The sound is long', '这个音要读长'),
        L('Chữ đó không đọc', 'That letter is silent', '这个字母不发音'),
      ], 0, L(
        'ˈ đánh dấu trọng âm: apple đọc AP-ple. Dấu ː mới là âm dài.',
        'ˈ marks stress: apple is AP-ple. The mark ː is the one for long sounds.',
        'ˈ 表示重音：apple 读 AP-ple。表示长音的是 ː。',
      )),
    ],
    quiz: [
      listen('en-d1-q1', 'I', ['I', 'E', 'Y'], 0, L(
        'I = /aɪ/ ("ai"), E = /iː/ ("i"), Y = /waɪ/ ("goai").',
        'I = /aɪ/ ("eye"), E = /iː/ ("ee"), Y = /waɪ/ ("why").',
        'I = /aɪ/，E = /iː/，Y = /waɪ/。',
      ), { skill: 'pronunciation', targetOptions: true }),
      listen('en-d1-q2', 'H', ['H', 'A', 'K'], 0, L(
        'H = /eɪtʃ/: có âm "ch" ở cuối. A = /eɪ/, K = /keɪ/.',
        'H = /eɪtʃ/: it ends with a "ch" sound. A = /eɪ/, K = /keɪ/.',
        'H = /eɪtʃ/：结尾有 "ch" 音。A = /eɪ/，K = /keɪ/。',
      ), { skill: 'pronunciation', targetOptions: true }),
      choice('en-d1-q3', 'reading', L('Chữ nào KHÔNG có trong bảng chữ cái tiếng Việt?', 'Which letter is NOT in the Vietnamese alphabet?', '哪个字母越南语字母表里没有？'), ['W', 'B', 'N', 'T'], 0, L(
        'Tiếng Việt không dùng F, J, W, Z.',
        'Vietnamese does not use F, J, W, Z.',
        '越南语不使用 F、J、W、Z。',
      ), { targetOptions: true }),
      choice('en-d1-q4', 'writing', L('Câu nào viết hoa đúng?', 'Which sentence uses capital letters correctly?', '哪个句子的大写是正确的？'), [
        'My name is Mai. I am from Vietnam.',
        'my name is mai. i am from vietnam.',
        'My Name Is Mai. I Am From Vietnam.',
        'my name is Mai. i am from Vietnam.',
      ], 0, L(
        'Viết hoa chữ đầu câu, tên người (Mai), tên nước (Vietnam) và "I".',
        'Capitalize the first word, names (Mai), countries (Vietnam) and "I".',
        '句首、人名（Mai）、国名（Vietnam）和 "I" 要大写。',
      ), { targetOptions: true }),
      choice('en-d1-q5', 'vocabulary', L('Chọn nghĩa đúng', 'Choose the right meaning', '选择正确的意思'), [
        { vi: 'bảng chữ cái', en: 'all the letters of a language in order' },
        { vi: 'chữ cái', en: 'a sign like A, B or C' },
        { vi: 'từ', en: 'a group of letters with a meaning' },
        { vi: 'đánh vần', en: 'to say or write the letters of a word in order' },
      ], 0, L(
        'alphabet /ˈælfəbet/ = bảng chữ cái (26 chữ cái).',
        'alphabet /ˈælfəbet/ = all 26 letters in order.',
        'alphabet /ˈælfəbet/ = 字母表（26 个字母）。',
      ), { text: 'alphabet', pron: '/ˈælfəbet/', audio: 'alphabet', wordIds: ['alphabet'] }),
      typeIt('en-d1-q6', 'spelling', { k: 'ex.write.spelling', p: { meaning: { vi: 'từ', en: 'a group of letters with a meaning' } } }, ['word'], L(
        'word = W - O - R - D /wɜːrd/. Chữ "or" ở đây đọc /ɜː/, gần "ơ" dài.',
        'word = W - O - R - D /wɜːrd/. Here "or" sounds /ɜː/, like a long Vietnamese "ơ".',
        'word = W - O - R - D /wɜːrd/。这里的 "or" 读 /ɜː/，像拉长的越南语 "ơ"。',
      ), { audio: 'word', wordIds: ['word'] }),
      choice('en-d1-q7', 'pronunciation', L('"see" và "sea" khác nhau thế nào khi đọc?', 'How do "see" and "sea" differ when spoken?', '"see" 和 "sea" 读起来有什么不同？'), [
        L('Đọc giống hệt nhau: /siː/', 'They sound exactly the same: /siː/', '读音完全一样：/siː/'),
        L('"sea" có âm /a/ ở cuối', '"sea" ends with an /a/ sound', '"sea" 结尾有 /a/ 音'),
        L('"see" đọc dài hơn', '"see" is longer', '"see" 读得更长'),
      ], 0, L(
        'Hai cách viết khác nhau, cùng một âm /siː/ — vì thế IPA rất hữu ích.',
        'Two spellings, one sound /siː/ — this is why IPA is so useful.',
        '拼写不同，读音都是 /siː/——这就是国际音标有用的原因。',
      )),
      arrange('en-d1-q8', { vi: 'Bảng chữ cái tiếng Anh có 26 chữ cái.', en: 'There are 26 letters in English.' }, ['The', 'English', 'alphabet', 'has', '26', 'letters.'], L(
        'Chủ ngữ "The English alphabet" + động từ "has" + "26 letters".',
        'Subject "The English alphabet" + verb "has" + "26 letters".',
        '主语 "The English alphabet" + 动词 "has" + "26 letters"。',
      ), ['alphabet', 'letter']),
    ],
    summary: [
      L('26 chữ cái: 5 nguyên âm A E I O U, 21 phụ âm. Tiếng Việt không dùng F, J, W, Z.', '26 letters: 5 vowels A E I O U and 21 consonants. Vietnamese does not use F, J, W, Z.', '26 个字母：5 个元音字母 A E I O U，21 个辅音字母。越南语不使用 F、J、W、Z。'),
      L('Tên chữ dễ nhầm: E /iː/ – I /aɪ/, G /dʒiː/ – J /dʒeɪ/, A /eɪ/ – H /eɪtʃ/.', 'Easily confused names: E /iː/ – I /aɪ/, G /dʒiː/ – J /dʒeɪ/, A /eɪ/ – H /eɪtʃ/.', '容易混淆的字母名称：E /iː/ – I /aɪ/、G /dʒiː/ – J /dʒeɪ/、A /eɪ/ – H /eɪtʃ/。'),
      L('Viết hoa đầu câu, tên riêng và "I". Hỏi đánh vần: "How do you spell it?"', 'Capitalize the start of a sentence, names and "I". To ask for spelling: "How do you spell it?"', '句首、专有名词和 "I" 要大写。问拼写："How do you spell it?"'),
      L('Chữ viết ≠ âm đọc; IPA trong / / cho biết âm thật. ˈ = trọng âm, ː = âm dài.', 'Spelling ≠ sound; IPA between / / shows the real sounds. ˈ = stress, ː = long sound.', '拼写 ≠ 读音；/ / 中的国际音标表示真正的读音。ˈ = 重音，ː = 长音。'),
      L('Từ mới: yes, no, name, letter, word, spell, alphabet.', 'New words: yes, no, name, letter, word, spell, alphabet.', '生词：yes、no、name、letter、word、spell、alphabet。'),
    ],
  },
  words: WORDS,
  grammar: [],
};
