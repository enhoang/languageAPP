import type { Gloss, LText } from '../../../types';
import { arrangeWith, choice, listen, MATCH_PROMPT, typeIt, type DayContent } from '../../helpers';

const L = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });
const G = (vi: string, en: string): Gloss => ({ vi, en });
const arrange = arrangeWith(' ');

const WHICH_CORRECT = L('Câu nào đúng?', 'Which sentence is correct?', '哪个句子是正确的？');
const BEST_REPLY = L('Chọn câu trả lời phù hợp nhất:', 'Choose the best reply:', '选择最合适的回答：');
const CHOOSE_BLANK = L('Chọn từ đúng điền vào chỗ trống:', 'Choose the word that fills the blank:', '选择填入空格的正确词语：');
const READ_CHOOSE = L('Đọc đoạn hội thoại và trả lời:', 'Read the dialogue and answer:', '阅读对话并回答：');

/** The reading dialogue, shown with the comprehension questions. */
const DIALOGUE = [
  "Mr. Brown: Good morning! I'm Mr. Brown. I'm your English teacher.",
  "Linh: Good morning, Mr. Brown. My name is Linh. It's L-I-N-H.",
  'Mr. Brown: Nice to meet you, Linh. Where are you from?',
  "Linh: I'm from Vietnam. I live in Hai Phong.",
  'Mr. Brown: Are you a new student?',
  "Linh: Yes, I am. And this is Khoa. He's my friend.",
  "Mr. Brown: Hello, Khoa. Is he from Hai Phong too?",
  "Linh: No, he isn't. He's from Hue. He likes English very much!",
];
const DIALOGUE_TEXT = DIALOGUE.join(' ');
/** Simple English paraphrases of the dialogue lines. */
const DIALOGUE_EN = [
  'Mr. Brown greets the class and says he teaches them English.',
  'Linh greets him, gives her name and spells it.',
  'Mr. Brown is happy to meet Linh and asks about her country.',
  'Linh comes from Vietnam and her home is in Hai Phong.',
  'Mr. Brown asks if Linh has just joined the class.',
  'Linh says yes and introduces her friend Khoa.',
  'Mr. Brown says hello to Khoa and asks if he also comes from Hai Phong.',
  'Linh says no: Khoa comes from Hue, and he really enjoys English.',
];

export const D7: DayContent = {
  lesson: {
    id: 'en-d7', day: 7, stage: 1, minutes: 30, prerequisites: ['en-d6'],
    title: L('Ôn tập & kiểm tra ngày 1–6', 'Review & test: days 1–6', '复习与测试：第 1–6 天'),
    subtitle: L(
      'Bảng chữ cái · âm khó · chào hỏi · am / is / are · câu hỏi · đọc hiểu',
      'Alphabet · key sounds · greetings · am / is / are · questions · reading',
      '字母表 · 重点发音 · 问候 · am / is / are · 疑问句 · 阅读',
    ),
    objectives: [
      L('Ôn lại cách đánh vần, các âm khó và câu chào hỏi.', 'Review spelling, the key sounds and greetings.', '复习拼读、重点发音和问候语。'),
      L('Củng cố am / is / are, câu phủ định và động từ thêm -s.', 'Consolidate am / is / are, negatives and the verb -s.', '巩固 am / is / are、否定句和动词加 -s。'),
      L('Đặt và trả lời câu hỏi Yes / No và câu hỏi what / where / who / how.', 'Ask and answer yes / no and what / where / who / how questions.', '提出并回答一般疑问句和 what / where / who / how 疑问句。'),
      L('Đọc hiểu một đoạn hội thoại ngắn và làm bài kiểm tra tổng hợp.', 'Understand a short dialogue and take a mixed test.', '读懂一段简短对话，并完成综合测试。'),
    ],
    intro: [
      L(
        'Chúc mừng bạn đã hoàn thành tuần đầu tiên! Hôm nay không có từ mới — chúng ta ôn lại mọi thứ từ ngày 1 đến ngày 6.',
        'Congratulations on finishing your first week! There are no new words today — we review everything from days 1 to 6.',
        '恭喜你完成了第一周的学习！今天没有生词——我们复习第 1 天到第 6 天的全部内容。',
      ),
      L(
        'Đọc lại từng phần ôn tập, đọc đoạn hội thoại, luyện nói rồi làm bài kiểm tra. Câu nào sai, hãy quay lại bài tương ứng để ôn thêm.',
        'Go through each review section, read the dialogue, practise speaking, then take the test. If you get something wrong, go back to that day\'s lesson.',
        '依次看复习部分，读对话，练口语，然后做测试。做错的题目，请回到相应的课文再复习一下。',
      ),
    ],
    sections: [
      {
        kind: 'text',
        title: L('Ôn tập 1: Bảng chữ cái & đánh vần', 'Review 1: The alphabet & spelling', '复习一：字母表与拼读'),
        body: [
          L(
            'Tiếng Anh có 26 chữ cái; 5 nguyên âm là A, E, I, O, U. Tên chữ cái khác âm của nó: A đọc /eɪ/, E đọc /iː/, I đọc /aɪ/ — đừng đọc theo kiểu tiếng Việt.',
            'English has 26 letters; the five vowels are A, E, I, O, U. Letter names differ from their sounds: A is /eɪ/, E is /iː/, I is /aɪ/ — don\'t read them the Vietnamese way.',
            '英语有 26 个字母，其中 A、E、I、O、U 是元音字母。字母名称和它的发音不同：A 读 /eɪ/，E 读 /iː/，I 读 /aɪ/——不要按越南语的方式读。',
          ),
          L(
            'Hỏi cách viết: "How do you spell it?" — trả lời bằng tên từng chữ cái: "L-I-N-H". Tên người, tên nước và chữ "I" luôn viết hoa.',
            'To ask for spelling: "How do you spell it?" — answer with letter names: "L-I-N-H". Names, countries and the word "I" always take a capital letter.',
            '询问拼写：“How do you spell it?”——用字母名称回答：“L-I-N-H”。人名、国名和单词“I”总是大写。',
          ),
        ],
      },
      {
        kind: 'sounds',
        title: L('Ôn tập 2: Những âm cần chú ý', 'Review 2: Key sounds', '复习二：重点发音'),
        intro: L(
          'Nghe từng từ và nhắc lại. Chú ý nguyên âm dài / ngắn, /θ/ – /ð/, và đọc rõ âm cuối.',
          'Listen to each word and repeat. Watch long vs short vowels, /θ/ – /ð/, and say the final sounds clearly.',
          '听每个单词并跟读。注意长短元音、/θ/ 和 /ð/，并清楚地读出词尾辅音。',
        ),
        items: [
          { label: '/ɪ/', text: 'ship', pron: '/ʃɪp/', vi: 'con tàu', en: 'a big boat', note: L('Ngắn, miệng thả lỏng.', 'Short and relaxed.', '短音，口型放松。') },
          { label: '/iː/', text: 'sheep', pron: '/ʃiːp/', vi: 'con cừu', en: 'a farm animal with wool', note: L('Dài, miệng cười.', 'Long, with a smile.', '长音，嘴角向两边拉开。') },
          { label: '/e/', text: 'bed', pron: '/bed/', vi: 'cái giường', en: 'a piece of furniture for sleeping', note: L('Miệng mở vừa.', 'Mouth half open.', '嘴巴半张。') },
          { label: '/æ/', text: 'bad', pron: '/bæd/', vi: 'xấu, tệ', en: 'not good', note: L('Miệng mở to, giữa "a" và "e".', 'Mouth wide open, between "a" and "e".', '嘴巴张大，介于“a”和“e”之间。') },
          { label: '/θ/', text: 'think', pron: '/θɪŋk/', vi: 'nghĩ', en: 'to use your mind', note: L('Lưỡi giữa hai răng, thổi hơi, không rung.', 'Tongue between the teeth, blow air, no voice.', '舌尖放在上下齿之间送气，声带不振动。') },
          { label: '/ð/', text: 'this', pron: '/ðɪs/', vi: 'cái này, này', en: 'the thing here', note: L('Như /θ/ nhưng rung cổ họng.', 'Like /θ/ but with voice.', '和 /θ/ 一样，但声带振动。') },
          { label: '-s', text: 'likes', pron: '/laɪks/', vi: 'thích (sau he / she / it)', en: 'enjoys (after he / she / it)', note: L('Đọc rõ /s/ cuối.', 'Say the final /s/ clearly.', '清楚地读出词尾 /s/。') },
        ],
      },
      {
        kind: 'examples',
        title: L('Ôn tập 3: Chào hỏi & giới thiệu', 'Review 3: Greetings & introductions', '复习三：问候与介绍'),
        examples: [
          { text: 'Good morning! / Good afternoon! / Good evening!', vi: 'Chào buổi sáng! / Chào buổi chiều! / Chào buổi tối!', en: "Hello! (early in the day / after 12 o'clock / after about 6 p.m.)" },
          { text: "Hello, I'm Nam. Nice to meet you.", vi: 'Xin chào, mình là Nam. Rất vui được gặp bạn.', en: 'Hi, my name is Nam. I am happy to meet you.' },
          { text: "My name is Thu. I'm from Vietnam.", vi: 'Tên mình là Thu. Mình đến từ Việt Nam.', en: 'I am called Thu and Vietnam is my country.' },
          { text: 'Thank you! — Sorry! — Excuse me!', vi: 'Cảm ơn! — Xin lỗi! — Xin lỗi, cho hỏi!', en: 'Words for thanks, for a mistake, and for getting attention.' },
          { text: 'Goodbye! See you tomorrow.', vi: 'Tạm biệt! Hẹn gặp lại ngày mai.', en: 'Bye! We will meet again the next day.' },
        ],
      },
      {
        kind: 'text',
        title: L('Ôn tập 4: to be & câu đơn', 'Review 4: "To be" & simple sentences', '复习四：be 动词与简单句'),
        body: [
          L('I am · he / she / it is · you / we / they are. Phủ định: I\'m not, he isn\'t, they aren\'t.', 'I am · he / she / it is · you / we / they are. Negatives: I\'m not, he isn\'t, they aren\'t.', 'I am · he / she / it is · you / we / they are。否定：I\'m not、he isn\'t、they aren\'t。'),
          L('Trước tính từ vẫn cần "to be": I am happy (không nói "I happy").', 'Adjectives need "to be" too: I am happy (not "I happy").', '形容词前也要 be 动词：I am happy（不能说“I happy”）。'),
          L('Câu đơn: Chủ ngữ + Động từ + Tân ngữ. Sau he / she / it động từ thêm -s: I like tea → She likes tea.', 'Simple sentences: Subject + Verb + Object. After he / she / it add -s: I like tea → She likes tea.', '简单句：主语 + 动词 + 宾语。he / she / it 后面的动词加 -s：I like tea → She likes tea。'),
        ],
      },
      {
        kind: 'text',
        title: L('Ôn tập 5: Câu hỏi', 'Review 5: Questions', '复习五：疑问句'),
        body: [
          L('Yes / No: Are you a student? — Yes, I am. / No, I\'m not. Is she from Hue? — Yes, she is. / No, she isn\'t.', 'Yes / no: Are you a student? — Yes, I am. / No, I\'m not. Is she from Hue? — Yes, she is. / No, she isn\'t.', '一般疑问句：Are you a student? —— Yes, I am. / No, I\'m not. Is she from Hue? —— Yes, she is. / No, she isn\'t.'),
          L('Từ để hỏi đứng đầu: What\'s your name? · Where are you from? · Who is he? · How are you?', 'The question word comes first: What\'s your name? · Where are you from? · Who is he? · How are you?', '疑问词放在句首：What\'s your name? · Where are you from? · Who is he? · How are you?'),
        ],
      },
      {
        kind: 'examples',
        title: L('Bài đọc: Ngày đầu tiên ở lớp tiếng Anh', 'Reading: The first day in English class', '阅读：英语课的第一天'),
        examples: [
          { text: DIALOGUE[0], vi: 'Thầy Brown: Chào buổi sáng! Thầy là thầy Brown. Thầy là giáo viên tiếng Anh của các em.', en: DIALOGUE_EN[0] },
          { text: DIALOGUE[1], vi: 'Linh: Chào buổi sáng thầy Brown. Em tên là Linh. Viết là L-I-N-H.', en: DIALOGUE_EN[1] },
          { text: DIALOGUE[2], vi: 'Thầy Brown: Rất vui được gặp em, Linh. Em đến từ đâu?', en: DIALOGUE_EN[2] },
          { text: DIALOGUE[3], vi: 'Linh: Em đến từ Việt Nam. Em sống ở Hải Phòng.', en: DIALOGUE_EN[3] },
          { text: DIALOGUE[4], vi: 'Thầy Brown: Em là học sinh mới phải không?', en: DIALOGUE_EN[4] },
          { text: DIALOGUE[5], vi: 'Linh: Vâng ạ. Còn đây là Khoa. Bạn ấy là bạn của em.', en: DIALOGUE_EN[5] },
          { text: DIALOGUE[6], vi: 'Thầy Brown: Chào Khoa. Bạn ấy cũng đến từ Hải Phòng à?', en: DIALOGUE_EN[6] },
          { text: DIALOGUE[7], vi: 'Linh: Không ạ. Bạn ấy đến từ Huế. Bạn ấy rất thích tiếng Anh!', en: DIALOGUE_EN[7] },
        ],
      },
      {
        kind: 'speak',
        title: L('Luyện nói: giới thiệu bản thân', 'Speaking practice: introduce yourself', '口语练习：自我介绍'),
        intro: L(
          'Đọc to đoạn tự giới thiệu, sau đó thay bằng thông tin của chính bạn.',
          'Read the self-introduction aloud, then say it again with your own details.',
          '大声朗读这段自我介绍，然后换成你自己的信息再说一遍。',
        ),
        items: [
          { text: "Hello! My name's Linh.", vi: 'Xin chào! Mình tên là Linh.', en: 'Hi! I am called Linh.' },
          { text: "I'm a student. I'm from Vietnam.", vi: 'Mình là học sinh. Mình đến từ Việt Nam.', en: 'I study at a school and my country is Vietnam.' },
          { text: 'I live in Hai Phong. It is a big city.', vi: 'Mình sống ở Hải Phòng. Đó là một thành phố lớn.', en: 'My home is in Hai Phong, a large town.' },
          { text: 'I like English. My friend Khoa likes English too.', vi: 'Mình thích tiếng Anh. Bạn mình là Khoa cũng thích tiếng Anh.', en: 'My friend Khoa and I both enjoy English.' },
          { text: 'How are you? Where are you from?', vi: 'Bạn khỏe không? Bạn đến từ đâu?', en: 'Are you well? Which country do you come from?' },
        ],
      },
      {
        kind: 'tip',
        title: L('Học tiếp thế nào?', 'How to keep going', '接下来怎么学？'),
        body: L(
          'Mỗi ngày dành 10 phút: ôn từ vựng đến hạn, nghe và nhắc lại 5 câu, tự giới thiệu to một lần. Nói sai cũng không sao — quan trọng là nói to và đọc rõ âm cuối.',
          'Spend 10 minutes a day: review the words that are due, listen to and repeat five sentences, and introduce yourself aloud once. Mistakes are fine — what matters is speaking out loud and saying the final sounds.',
          '每天花 10 分钟：复习到期的单词，听并跟读五个句子，大声做一次自我介绍。说错也没关系——重要的是大声说出来，并读清楚词尾的辅音。',
        ),
      },
    ],
    wordIds: [],
    grammarIds: [],
    practice: [
      choice('en-d7-p1', 'pronunciation', L('Chữ cái "E" đọc là:', 'How do you say the letter "E"?', '字母“E”怎么读？'), ['/iː/', '/e/', '/eɪ/', '/aɪ/'], 0,
        L('Tên chữ E là /iː/ (như "ee"). /eɪ/ là tên chữ A, /aɪ/ là tên chữ I.', 'The letter E is called /iː/. /eɪ/ is A and /aɪ/ is I.', '字母 E 读 /iː/。/eɪ/ 是 A，/aɪ/ 是 I。'), { text: 'E', audio: 'E' }),
      listen('en-d7-p2', 'sheep', ['sheep', 'ship', 'shop', 'cheap'], 0,
        L('sheep /ʃiːp/ có nguyên âm dài /iː/; ship /ʃɪp/ ngắn.', 'sheep /ʃiːp/ has a long /iː/; ship /ʃɪp/ is short.', 'sheep /ʃiːp/ 是长元音 /iː/；ship /ʃɪp/ 是短元音。'), { targetOptions: true }),
      choice('en-d7-p3', 'grammar', { seq: [CHOOSE_BLANK, ' "My friends ___ from Hue."'] }, ['are', 'is', 'am'], 0,
        L('My friends = they → are.', 'My friends = they → are.', 'My friends = they → are。'), { targetOptions: true, grammarId: 'en-g-be' }),
      choice('en-d7-p4', 'grammar', { seq: [BEST_REPLY, ' "Nice to meet you."'] }, ['Nice to meet you too.', 'Yes, I am.', "I'm from Vietnam.", 'Goodbye, too.'], 0,
        L('Đáp lại "Nice to meet you" bằng "Nice to meet you too."', 'Answer "Nice to meet you" with "Nice to meet you too."', '回答“Nice to meet you”要说“Nice to meet you too.”'), { targetOptions: true }),
      arrange('en-d7-p5', G('Anh ấy thích tiếng Anh.', 'He enjoys the English language.'), ['He', 'likes', 'English'],
        L('He + likes (thêm -s) + English.', 'He + likes (with -s) + English.', 'He + likes（加 -s）+ English。'), ['he', 'like', 'english']),
      { id: 'en-d7-p6', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: 'where', pron: '/wer/', vi: 'ở đâu, đâu', en: 'a word to ask about a place' },
        { text: 'she', pron: '/ʃiː/', vi: 'cô ấy, chị ấy, bà ấy (nữ)', en: 'a woman or girl already talked about' },
        { text: 'happy', pron: '/ˈhæpi/', vi: 'vui, vui vẻ', en: 'feeling good' },
        { text: 'speak', pron: '/spiːk/', vi: 'nói (một ngôn ngữ)', en: 'to use a language with your voice' },
      ], explanation: 'where = ở đâu · she = cô ấy · happy = vui · speak = nói', wordIds: ['where', 'she', 'happy', 'speak'] },
      typeIt('en-d7-p7', 'spelling', { k: 'ex.write.spelling', p: { meaning: G('tiếng Anh', 'the language of the UK, the USA and many other countries') } }, ['English'],
        L('English — luôn viết hoa chữ E.', 'English — always with a capital E.', 'English —— 首字母 E 永远大写。'), { audio: 'English', wordIds: ['english'] }),
    ],
    quiz: [
      choice('en-d7-q1', 'vocabulary', { k: 'ex.chooseWord', p: { meaning: G('ai', 'a word to ask about a person') } }, ['who', 'how', 'what', 'where'], 0,
        L('who /huː/ = ai.', 'who /huː/ asks about a person.', 'who /huː/ = 谁。'), { targetOptions: true, wordIds: ['who'] }),
      listen('en-d7-q2', 'think', ['think', 'sink', 'this', 'thing'], 0,
        L('think /θɪŋk/ — lưỡi giữa hai răng, không rung. "sink" là /s/, "this" là /ð/.', 'think /θɪŋk/ — tongue between the teeth, no voice. "sink" has /s/, "this" has /ð/.', 'think /θɪŋk/ —— 舌尖在齿间，声带不振动。“sink”是 /s/，“this”是 /ð/。'), { targetOptions: true }),
      choice('en-d7-q3', 'pronunciation', L('Từ nào có nguyên âm /æ/ (miệng mở to)?', 'Which word has the vowel /æ/ (mouth wide open)?', '哪个单词含有元音 /æ/（嘴巴张大）？'), ['bad', 'bed', 'bid', 'bead'], 0,
        L('bad /bæd/ — /æ/. bed /bed/ là /e/.', 'bad /bæd/ has /æ/. bed /bed/ has /e/.', 'bad /bæd/ 是 /æ/。bed /bed/ 是 /e/。'), { targetOptions: true }),
      choice('en-d7-q4', 'grammar', WHICH_CORRECT, ["She isn't a teacher.", "She aren't a teacher.", 'She not is a teacher.', "She amn't a teacher."], 0,
        L('She + is + not → she isn\'t.', 'She + is + not → she isn\'t.', 'She + is + not → she isn\'t。'), { targetOptions: true, grammarId: 'en-g-be', wordIds: ['she'] }),
      choice('en-d7-q5', 'grammar', { seq: [CHOOSE_BLANK, ' "Minh ___ Vietnamese and English."'] }, ['speaks', 'speak', 'is speak', 'are speak'], 0,
        L('Minh = he → speaks (thêm -s).', 'Minh = he → speaks (with -s).', 'Minh = he → speaks（加 -s）。'), { targetOptions: true, grammarId: 'en-g-svo', wordIds: ['speak'] }),
      arrange('en-d7-q6', G('Bạn tên là gì?', 'Tell me your name.'), ['What', 'is', 'your', 'name'],
        L('What + is + your name? — có thể nói gọn: What\'s your name?', 'What + is + your name? — or: What\'s your name?', 'What + is + your name? —— 也可以说：What\'s your name?'), ['what'],
        ['What is your name', "What's your name"]),
      choice('en-d7-q7', 'grammar', { seq: [BEST_REPLY, ' "Is he your brother?"'] }, ["No, he isn't. He's my friend.", 'No, he not.', "Yes, he's.", 'Yes, I am.'], 0,
        L('Is he…? → Yes, he is. / No, he isn\'t.', 'Is he…? → Yes, he is. / No, he isn\'t.', 'Is he……？→ Yes, he is. / No, he isn\'t.'), { targetOptions: true, grammarId: 'en-g-yesno' }),
      choice('en-d7-q8', 'reading', { seq: [READ_CHOOSE, ' "Where does Linh live?"'] }, ['In Hai Phong.', 'In Hue.', 'In Hanoi.', 'In Da Lat.'], 0,
        L('Linh: "I\'m from Vietnam. I live in Hai Phong."', 'Linh: "I\'m from Vietnam. I live in Hai Phong."', 'Linh：“I\'m from Vietnam. I live in Hai Phong.”'), { text: DIALOGUE_TEXT, targetOptions: true, wordIds: ['live'] }),
      choice('en-d7-q9', 'reading', { seq: [READ_CHOOSE, ' "Who is Mr. Brown?"'] }, [G('Giáo viên tiếng Anh', 'The English teacher'), G('Bạn của Linh', "Linh's friend"), G('Một học sinh mới', 'A new student'), G('Bố của Khoa', "Khoa's father")], 0,
        L('"I\'m your English teacher." — Thầy Brown là giáo viên tiếng Anh.', '"I\'m your English teacher." — Mr. Brown is the English teacher.', '“I\'m your English teacher.”——Brown 先生是英语老师。'), { text: DIALOGUE_TEXT, wordIds: ['who'] }),
      choice('en-d7-q10', 'reading', { seq: [READ_CHOOSE, ' "Is Khoa from Hai Phong?"'] }, ["No, he isn't. He's from Hue.", "Yes, he is.", "No, he isn't. He's from Hanoi.", "Yes, he's from Hai Phong and Hue."], 0,
        L('"No, he isn\'t. He\'s from Hue."', '"No, he isn\'t. He\'s from Hue."', '“No, he isn\'t. He\'s from Hue.”'), { text: DIALOGUE_TEXT, targetOptions: true, grammarId: 'en-g-yesno' }),
      listen('en-d7-q11', "I'm fine, thanks. And you?", [G('Mình khỏe, cảm ơn. Còn bạn?', 'I am well, thank you. What about you?'), G('Mình đến từ Việt Nam. Còn bạn?', 'Vietnam is my country. What about you?'), G('Rất vui được gặp bạn.', 'I am happy to meet you.'), G('Tạm biệt, hẹn gặp lại.', 'Bye, we will meet again.')], 0,
        L('fine = khỏe; And you? = Còn bạn?', 'fine = well; "And you?" asks the question back.', 'fine = 好；And you? = 你呢？'), { wordIds: ['fine', 'and'] }),
      typeIt('en-d7-q12', 'spelling', { k: 'ex.write.spelling', p: { meaning: G('thế nào, như thế nào', 'a word to ask in what way or in what state') } }, ['how'],
        L('how /haʊ/ — h-o-w.', 'how /haʊ/ — h-o-w.', 'how /haʊ/ —— h-o-w。'), { audio: 'how', wordIds: ['how'] }),
      typeIt('en-d7-q13', 'spelling', { k: 'ex.write.spelling', p: { meaning: G('chúng tôi, chúng ta', 'I and one or more other people') } }, ['we'],
        L('we /wiː/ — w-e.', 'we /wiː/ — w-e.', 'we /wiː/ —— w-e。'), { audio: 'we', wordIds: ['we'] }),
    ],
    summary: [
      L('Đánh vần bằng tên chữ cái: "How do you spell it?" — "L-I-N-H".', 'Spell with letter names: "How do you spell it?" — "L-I-N-H".', '用字母名称拼读：“How do you spell it?”——“L-I-N-H”。'),
      L('Phân biệt ship / sheep, bed / bad, think / this; đọc rõ âm cuối.', 'Tell ship / sheep, bed / bad, think / this apart; say final sounds clearly.', '区分 ship / sheep、bed / bad、think / this；读清楚词尾辅音。'),
      L('am / is / are + not; he / she / it + động từ-s.', 'am / is / are + not; he / she / it + verb-s.', 'am / is / are + not；he / she / it + 动词-s。'),
      L('Are you…? — Yes, I am. · What / Where / Who / How + is / are…?', 'Are you…? — Yes, I am. · What / Where / Who / How + is / are…?', 'Are you……？—— Yes, I am. · What / Where / Who / How + is / are……？'),
    ],
  },
  words: [],
  grammar: [],
};
