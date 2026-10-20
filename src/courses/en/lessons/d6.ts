import type { Gloss, GrammarPoint, LText } from '../../../types';
import { arrangeWith, choice, listen, MATCH_PROMPT, typeIt, wordsOf, type DayContent } from '../../helpers';

const L = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });
const G = (vi: string, en: string): Gloss => ({ vi, en });
const arrange = arrangeWith(' ');

const SUBJ = L('Chủ ngữ', 'Subject', '主语');
const BE = L('Động từ to be', 'Verb "to be"', 'be 动词');
const NEG = L('Phủ định', 'Negation', '否定');
const NOUN = L('Danh từ', 'Noun', '名词');
const ADJ = L('Tính từ', 'Adjective', '形容词');
const ART = L('Mạo từ', 'Article', '冠词');
const WH = L('Từ để hỏi', 'Question word', '疑问词');
const YESNO = L('Yes / No', 'Yes / No', 'Yes / No');
const POSS = L('Tính từ sở hữu', 'Possessive', '物主代词');
const PREP = L('Giới từ', 'Preposition', '介词');
const WHICH_CORRECT = L('Câu nào đúng?', 'Which sentence is correct?', '哪个句子是正确的？');
const BEST_REPLY = L('Chọn câu trả lời phù hợp nhất:', 'Choose the best reply:', '选择最合适的回答：');
const CHOOSE_BLANK = L('Chọn từ đúng điền vào chỗ trống:', 'Choose the word that fills the blank:', '选择填入空格的正确词语：');

const WORD_IDS = ['what', 'where', 'who', 'how', 'fine', 'and', 'live', 'city'];

const words = wordsOf('en-d6', 1, [
  { id: 'what', text: 'what', pron: '/wʌt/', pronUK: '/wɒt/', vi: 'cái gì, gì', en: 'a word to ask about a thing or information', type: 'pronoun', topic: 'questions', level: 'Pre-A1',
    ex: ['What is your phone number?', 'Số điện thoại của bạn là gì?', 'Please tell me your phone number.'],
    notes: L('Chữ "h" trong "wh" không đọc: what = /wʌt/.', 'The "h" in "wh" is silent: what = /wʌt/.', '“wh”中的“h”不发音：what = /wʌt/。') },
  { id: 'where', text: 'where', pron: '/wer/', pronUK: '/weə/', vi: 'ở đâu, đâu', en: 'a word to ask about a place', type: 'adverb', topic: 'questions', level: 'Pre-A1',
    ex: ['Where is the bathroom?', 'Nhà vệ sinh ở đâu?', 'I am looking for the toilet. Which way is it?'] },
  { id: 'who', text: 'who', pron: '/huː/', vi: 'ai', en: 'a word to ask about a person', type: 'pronoun', topic: 'questions', level: 'Pre-A1',
    ex: ['Who is that man?', 'Người đàn ông kia là ai?', "I don't know that man. Tell me about him."],
    notes: L('"Who" đọc là /huː/ — "w" không đọc, khác với what, where.', '"Who" is /huː/ — here the "w" is silent, unlike what and where.', '“who”读 /huː/——这里的“w”不发音，和 what、where 不同。') },
  { id: 'how', text: 'how', pron: '/haʊ/', vi: 'thế nào, như thế nào', en: 'a word to ask in what way or in what state', type: 'adverb', topic: 'questions', level: 'Pre-A1',
    ex: ['How is your mother?', 'Mẹ bạn có khỏe không?', 'Is your mother well?'] },
  { id: 'fine', text: 'fine', pron: '/faɪn/', vi: 'khỏe, ổn', en: 'well; OK', type: 'adjective', topic: 'feelings', level: 'Pre-A1',
    ex: ["I'm fine, thanks.", 'Mình khỏe, cảm ơn.', 'I am well, thank you.'] },
  { id: 'and', text: 'and', pron: '/ænd/', vi: 'và', en: 'a word that joins two words or ideas', type: 'conjunction', topic: 'basics', level: 'Pre-A1',
    ex: ['Lan and Mai are sisters.', 'Lan và Mai là chị em.', 'Lan and Mai have the same parents.'],
    notes: L('"And you?" = "Còn bạn thì sao?" — dùng để hỏi lại.', '"And you?" asks the same question back.', '“And you?”= “你呢？”，用来反问对方同样的问题。') },
  { id: 'live', text: 'live', pron: '/lɪv/', vi: 'sống, ở', en: 'to have your home somewhere', type: 'verb', topic: 'places', level: 'Pre-A1',
    ex: ['My grandparents live in Can Tho.', 'Ông bà tôi sống ở Cần Thơ.', "My grandparents' home is in Can Tho."] },
  { id: 'city', text: 'city', pron: '/ˈsɪti/', vi: 'thành phố', en: 'a big town', type: 'noun', topic: 'places', level: 'Pre-A1',
    ex: ['Hanoi is a big city.', 'Hà Nội là một thành phố lớn.', 'Hanoi is a large town with many people.'] },
]);

const grammar: GrammarPoint[] = [
  {
    id: 'en-g-yesno',
    lessonId: 'en-d6',
    title: L('Câu hỏi Yes / No với to be', 'Yes / no questions with "to be"', '用 be 动词构成的一般疑问句'),
    pattern: L(
      'Am / Is / Are + chủ ngữ + …? → Yes, chủ ngữ + am / is / are. / No, chủ ngữ + \'m not / isn\'t / aren\'t.',
      'Am / Is / Are + subject + …? → Yes, subject + am / is / are. / No, subject + \'m not / isn\'t / aren\'t.',
      'Am / Is / Are + 主语 + ……？→ Yes, 主语 + am / is / are. / No, 主语 + \'m not / isn\'t / aren\'t.',
    ),
    meaning: [
      L(
        'Để hỏi "có phải… không?", chỉ cần đưa am / is / are lên ĐẦU câu: She is a teacher. → Is she a teacher? Tiếng Việt thêm "có… không / phải không" ở cuối, tiếng Anh thì đảo động từ.',
        'To ask a yes / no question, move am / is / are to the FRONT: She is a teacher. → Is she a teacher? Vietnamese adds "có… không" at the end; English swaps the verb and subject instead.',
        '构成一般疑问句时，把 am / is / are 移到句首：She is a teacher. → Is she a teacher? 越南语在句末加“có… không”，汉语加“吗”，英语则是把动词提前。',
      ),
      L(
        'Trả lời ngắn: Yes, I am. / No, I\'m not. — Yes, she is. / No, she isn\'t. — Yes, they are. / No, they aren\'t.',
        'Short answers: Yes, I am. / No, I\'m not. — Yes, she is. / No, she isn\'t. — Yes, they are. / No, they aren\'t.',
        '简略回答：Yes, I am. / No, I\'m not. —— Yes, she is. / No, she isn\'t. —— Yes, they are. / No, they aren\'t.',
      ),
      L(
        'Câu trả lời "Yes" KHÔNG dùng dạng rút gọn: nói "Yes, I am." chứ không nói "Yes, I\'m."',
        'Don\'t use a short form in a "yes" answer: say "Yes, I am.", not "Yes, I\'m."',
        '肯定的简略回答不能用缩写：要说“Yes, I am.”，不能说“Yes, I\'m.”。',
      ),
      L(
        'Ngữ điệu: câu hỏi Yes / No thường lên giọng ở cuối ↗.',
        'Intonation: yes / no questions usually rise at the end ↗.',
        '语调：一般疑问句通常用升调结尾 ↗。',
      ),
    ],
    breakdown: [
      [{ text: 'Is', role: BE }, { text: 'she', role: SUBJ }, { text: 'a', role: ART }, { text: 'teacher', role: NOUN }],
      [{ text: 'Yes', role: YESNO }, { text: 'she', role: SUBJ }, { text: 'is', role: BE }],
      [{ text: 'No', role: YESNO }, { text: 'I', role: SUBJ }, { text: "'m not", role: NEG }],
      [{ text: 'Are', role: BE }, { text: 'you', role: SUBJ }, { text: 'tired', role: ADJ }],
    ],
    examples: [
      { text: 'Are you a student? — Yes, I am.', vi: 'Bạn là sinh viên à? — Vâng, đúng vậy.', en: 'Do you study at a school? — Yes.' },
      { text: "Is he from Japan? — No, he isn't.", vi: 'Anh ấy đến từ Nhật Bản à? — Không, không phải.', en: 'Is Japan his country? — No.' },
      { text: 'Is it your bag? — Yes, it is.', vi: 'Đó có phải túi của bạn không? — Vâng, đúng rồi.', en: 'Does this bag belong to you? — Yes.' },
      { text: "Are they at home? — No, they aren't.", vi: 'Họ có ở nhà không? — Không, họ không ở nhà.', en: 'Are those people in their house? — No.' },
      { text: "Am I late? — No, you aren't.", vi: 'Tôi có muộn không? — Không, bạn không muộn.', en: 'Did I come too late? — No, you are on time.' },
    ],
    mistakes: [
      { wrong: 'You are a student?', right: 'Are you a student?', why: L('Đưa "are" lên đầu câu để hỏi.', 'Put "are" first to make the question.', '把 are 放到句首来提问。') },
      { wrong: "Yes, I'm.", right: 'Yes, I am.', why: L('Câu trả lời ngắn "Yes" không rút gọn.', 'A short "yes" answer is never contracted.', '肯定的简略回答不能缩写。') },
      { wrong: 'Is she a teacher? — Yes, she does.', right: 'Is she a teacher? — Yes, she is.', why: L('Hỏi bằng "is" thì trả lời bằng "is".', 'A question with "is" is answered with "is".', '用 is 提问就用 is 回答。') },
    ],
    exercises: [
      { ...arrange('en-g-yesno-1', G('Cô ấy là giáo viên phải không?', 'Is teaching her job?'), ['Is', 'she', 'a', 'teacher'],
        L('Is + she + a teacher? — động từ to be đứng đầu.', 'Is + she + a teacher? — "to be" comes first.', 'Is + she + a teacher? —— be 动词放在句首。')), grammarId: 'en-g-yesno' },
      choice('en-g-yesno-2', 'grammar', { seq: [BEST_REPLY, ' "Are you tired?"'] }, ["No, I'm not.", "No, I amn't.", "Yes, I'm.", 'Yes, I are.'], 0,
        L('Are you…? → Yes, I am. / No, I\'m not.', 'Are you…? → Yes, I am. / No, I\'m not.', 'Are you……？→ Yes, I am. / No, I\'m not.'), { grammarId: 'en-g-yesno', targetOptions: true }),
      choice('en-g-yesno-3', 'grammar', WHICH_CORRECT, ['Are they friends?', 'They are friends?', 'Is they friends?', 'Are friends they?'], 0,
        L('Are + they + …?', 'Are + they + …?', 'Are + they + ……？'), { grammarId: 'en-g-yesno', targetOptions: true }),
    ],
  },
  {
    id: 'en-g-wh',
    lessonId: 'en-d6',
    title: L('Câu hỏi với What / Where / Who / How', 'Questions with what / where / who / how', '用 what / where / who / how 提问'),
    pattern: L(
      'Từ để hỏi + am / is / are + chủ ngữ? — What is your name? Where are you from?',
      'Question word + am / is / are + subject? — What is your name? Where are you from?',
      '疑问词 + am / is / are + 主语？—— What is your name? Where are you from?',
    ),
    meaning: [
      L(
        'what = gì (vật, thông tin) · where = ở đâu (nơi chốn) · who = ai (người) · how = thế nào (cách thức, tình trạng).',
        'what = things and information · where = places · who = people · how = manner or condition.',
        'what = 什么（事物、信息）· where = 哪里（地点）· who = 谁（人）· how = 怎么样（方式、状态）。',
      ),
      L(
        'Khác tiếng Việt: từ để hỏi luôn đứng ĐẦU câu. "Bạn đến từ đâu?" → Where are you from? (không nói "You are from where?").',
        'Unlike Vietnamese, the question word always comes FIRST. "Bạn đến từ đâu?" → Where are you from? (not "You are from where?").',
        '和越南语、汉语不同：英语的疑问词总是放在句首。“你从哪里来？”→ Where are you from?（不说“You are from where?”）。',
      ),
      L(
        'Sau từ để hỏi là am / is / are rồi mới đến chủ ngữ. Khi nói thường rút gọn: What\'s = What is, Where\'s = Where is, Who\'s = Who is.',
        'After the question word comes am / is / are, then the subject. In speech: What\'s = What is, Where\'s = Where is, Who\'s = Who is.',
        '疑问词后面先接 am / is / are，再接主语。口语中常缩写：What\'s = What is，Where\'s = Where is，Who\'s = Who is。',
      ),
      L(
        'Câu hỏi có từ để hỏi thường xuống giọng ở cuối ↘. Đừng trả lời bằng Yes / No!',
        'Wh- questions usually fall at the end ↘. Don\'t answer them with yes or no!',
        '特殊疑问句通常用降调结尾 ↘。不要用 Yes / No 回答！',
      ),
    ],
    breakdown: [
      [{ text: 'What', role: WH }, { text: 'is', role: BE }, { text: 'your', role: POSS }, { text: 'name', role: NOUN }],
      [{ text: 'Where', role: WH }, { text: 'are', role: BE }, { text: 'you', role: SUBJ }, { text: 'from', role: PREP }],
      [{ text: 'How', role: WH }, { text: 'are', role: BE }, { text: 'you', role: SUBJ }],
    ],
    examples: [
      { text: "What's your name? — My name is Lan.", vi: 'Bạn tên là gì? — Mình tên là Lan.', en: 'Tell me your name. — I am called Lan.' },
      { text: "Where are you from? — I'm from Vietnam.", vi: 'Bạn đến từ đâu? — Mình đến từ Việt Nam.', en: 'Which country is your home? — Vietnam.' },
      { text: "Who is she? — She's my teacher.", vi: 'Cô ấy là ai? — Cô ấy là giáo viên của mình.', en: 'Tell me about that woman. — She teaches me.' },
      { text: "How are you? — I'm fine, thank you.", vi: 'Bạn khỏe không? — Mình khỏe, cảm ơn bạn.', en: 'Are you well? — Yes, I am well, thanks.' },
      { text: 'Where do you live? — I live in Hanoi.', vi: 'Bạn sống ở đâu? — Mình sống ở Hà Nội.', en: 'Where is your home? — It is in Hanoi.' },
    ],
    mistakes: [
      { wrong: 'You are from where?', right: 'Where are you from?', why: L('Từ để hỏi đứng đầu câu.', 'The question word goes first.', '疑问词放在句首。') },
      { wrong: 'What your name is?', right: 'What is your name?', why: L('Sau từ để hỏi là "is", rồi mới đến "your name".', 'After the question word comes "is", then "your name".', '疑问词后面先接 is，再接 your name。') },
      { wrong: 'How are you? — Yes, I am.', right: "How are you? — I'm fine, thanks.", why: L('Câu hỏi có từ để hỏi không trả lời bằng Yes / No.', 'Wh- questions are not answered with yes / no.', '特殊疑问句不用 Yes / No 回答。') },
    ],
    exercises: [
      { ...arrange('en-g-wh-1', G('Bạn đến từ đâu?', 'Which country do you come from?'), ['Where', 'are', 'you', 'from'],
        L('Where + are + you + from?', 'Where + are + you + from?', 'Where + are + you + from?'), ['where']), grammarId: 'en-g-wh' },
      choice('en-g-wh-2', 'grammar', { seq: [CHOOSE_BLANK, ' "___ is that girl? — She\'s my sister."'] }, ['Who', 'What', 'Where', 'How'], 0,
        L('Hỏi về người → who.', 'Asking about a person → who.', '问人 → who。'), { grammarId: 'en-g-wh', targetOptions: true, wordIds: ['who'] }),
      choice('en-g-wh-3', 'grammar', WHICH_CORRECT, ['What is your name?', 'What your name is?', 'Your name is what?', 'Is what your name?'], 0,
        L('Từ để hỏi + is + chủ ngữ.', 'Question word + is + subject.', '疑问词 + is + 主语。'), { grammarId: 'en-g-wh', targetOptions: true, wordIds: ['what'] }),
    ],
  },
];

export const D6: DayContent = {
  lesson: {
    id: 'en-d6', day: 6, stage: 1, minutes: 25, prerequisites: ['en-d5'],
    title: L('Câu hỏi & hội thoại ngắn', 'Questions & short conversations', '疑问句和简短对话'),
    subtitle: L(
      'Are you…? · Is she…? · what · where · who · how · How are you? · Where are you from?',
      'Are you…? · Is she…? · what · where · who · how · How are you? · Where are you from?',
      'Are you…? · Is she…? · what · where · who · how · How are you? · Where are you from?',
    ),
    objectives: [
      L('Đặt câu hỏi Yes / No với am / is / are và trả lời ngắn: Yes, I am. / No, she isn\'t.', 'Ask yes / no questions with am / is / are and give short answers: Yes, I am. / No, she isn\'t.', '用 am / is / are 提一般疑问句，并作简略回答：Yes, I am. / No, she isn\'t.'),
      L('Dùng các từ để hỏi what, where, who, how.', 'Use the question words what, where, who and how.', '使用疑问词 what、where、who、how。'),
      L('Hỏi thăm sức khỏe và quê quán: How are you? Where are you from?', 'Ask how someone is and where they are from: How are you? Where are you from?', '问候对方并询问来自哪里：How are you? Where are you from?'),
      L('Thực hiện một đoạn hội thoại làm quen ngắn.', 'Hold a short getting-to-know-you conversation.', '进行一段简短的相识对话。'),
    ],
    intro: [
      L(
        'Trong tiếng Việt, ta biến câu kể thành câu hỏi bằng cách thêm từ ở cuối: "Bạn là sinh viên" → "Bạn là sinh viên à / phải không?". Tiếng Anh làm khác: thay đổi TRẬT TỰ từ.',
        'In Vietnamese you turn a statement into a question by adding words at the end: "Bạn là sinh viên" → "Bạn là sinh viên à / phải không?". English does it differently: it changes the WORD ORDER.',
        '越南语（和汉语一样）在句末加词把陈述句变成疑问句：“Bạn là sinh viên”→“Bạn là sinh viên à / phải không?”。英语的做法不同：改变语序。',
      ),
      L(
        'Câu hỏi Yes / No: đưa am / is / are lên đầu. Câu hỏi có từ để hỏi: what / where / who / how đứng đầu, sau đó là am / is / are.',
        'Yes / no questions: move am / is / are to the front. Wh- questions: what / where / who / how first, then am / is / are.',
        '一般疑问句：把 am / is / are 移到句首。特殊疑问句：先说 what / where / who / how，再接 am / is / are。',
      ),
      L(
        'Cuối bài, bạn sẽ có thể nói chuyện làm quen: chào hỏi, hỏi tên, hỏi quê quán và hỏi thăm sức khỏe.',
        'By the end, you can have a short first conversation: greet someone, ask their name, where they are from and how they are.',
        '学完本课，你就能进行简短的初次交谈：打招呼、问名字、问来自哪里、问候近况。',
      ),
    ],
    sections: [
      { kind: 'words', title: L('Từ mới', 'New words', '生词'), wordIds: WORD_IDS },
      { kind: 'grammar', grammarId: 'en-g-yesno' },
      {
        kind: 'examples',
        title: L('Hỏi và trả lời ngắn', 'Questions and short answers', '提问和简略回答'),
        examples: [
          { text: 'Are you Vietnamese? — Yes, I am.', vi: 'Bạn là người Việt à? — Vâng, đúng vậy.', en: 'Is Vietnam your country? — Yes.' },
          { text: "Is your teacher English? — No, she isn't. She's Australian.", vi: 'Cô giáo bạn là người Anh à? — Không. Cô ấy là người Úc.', en: 'Is your teacher from England? — No, she comes from Australia.' },
          { text: 'Is Hanoi a big city? — Yes, it is.', vi: 'Hà Nội có phải thành phố lớn không? — Có, đúng vậy.', en: 'Is Hanoi large? — Yes.' },
          { text: "Are you and Minh brothers? — No, we aren't. We're friends.", vi: 'Bạn và Minh là anh em à? — Không. Bọn mình là bạn.', en: 'Do you and Minh have the same parents? — No, we are just friends.' },
        ],
      },
      { kind: 'grammar', grammarId: 'en-g-wh' },
      {
        kind: 'text',
        title: L('Bốn từ để hỏi', 'Four question words', '四个疑问词'),
        body: [
          L('What? → hỏi vật hoặc thông tin: What is this? — It\'s a pen.', 'What? → things or information: What is this? — It\'s a pen.', 'What? → 问事物或信息：What is this? —— It\'s a pen.'),
          L('Where? → hỏi nơi chốn: Where is Lan? — She\'s at school.', 'Where? → places: Where is Lan? — She\'s at school.', 'Where? → 问地点：Where is Lan? —— She\'s at school.'),
          L('Who? → hỏi người: Who is he? — He\'s my dad.', 'Who? → people: Who is he? — He\'s my dad.', 'Who? → 问人：Who is he? —— He\'s my dad.'),
          L('How? → hỏi tình trạng, cách thức: How are you? — I\'m fine.', 'How? → condition or manner: How are you? — I\'m fine.', 'How? → 问状态或方式：How are you? —— I\'m fine.'),
        ],
      },
      {
        kind: 'examples',
        title: L('Hội thoại 1: Hỏi thăm', 'Dialogue 1: How are you?', '对话一：问候'),
        examples: [
          { text: 'Tom: Hi, Mai! How are you?', vi: 'Tom: Chào Mai! Bạn khỏe không?', en: 'Tom says hello to Mai and asks if she is well.' },
          { text: "Mai: I'm fine, thanks. And you?", vi: 'Mai: Mình khỏe, cảm ơn. Còn bạn?', en: 'Mai says she is well and asks Tom the same question.' },
          { text: "Tom: I'm very well. Who is your friend?", vi: 'Tom: Mình rất khỏe. Bạn của bạn là ai thế?', en: 'Tom is very well and asks about the person with Mai.' },
          { text: 'Mai: This is Hung. He is my classmate.', vi: 'Mai: Đây là Hùng. Bạn ấy là bạn cùng lớp của mình.', en: 'Mai says the boy is Hung, a student in her class.' },
        ],
      },
      {
        kind: 'examples',
        title: L('Hội thoại 2: Bạn từ đâu đến?', 'Dialogue 2: Where are you from?', '对话二：你来自哪里？'),
        examples: [
          { text: "Anna: Hello! I'm Anna. What's your name?", vi: 'Anna: Xin chào! Mình là Anna. Bạn tên gì?', en: 'Anna says hello, gives her name and asks for his.' },
          { text: "Long: My name's Long. Nice to meet you.", vi: 'Long: Mình tên là Long. Rất vui được gặp bạn.', en: 'He says his name is Long and he is happy to meet her.' },
          { text: 'Anna: Nice to meet you too. Where are you from, Long?', vi: 'Anna: Mình cũng rất vui được gặp bạn. Long đến từ đâu?', en: 'Anna is happy to meet him too and asks about his country.' },
          { text: "Long: I'm from Vietnam. I live in Da Lat. And you?", vi: 'Long: Mình đến từ Việt Nam. Mình sống ở Đà Lạt. Còn bạn?', en: 'Long comes from Vietnam, his home is in Da Lat, and he asks about Anna.' },
          { text: "Anna: I'm from Canada. I live in Toronto.", vi: 'Anna: Mình đến từ Canada. Mình sống ở Toronto.', en: 'Anna comes from Canada and her home is in Toronto.' },
        ],
      },
      {
        kind: 'speak',
        title: L('Luyện nói: hỏi và đáp', 'Speaking practice: ask and answer', '口语练习：问与答'),
        intro: L(
          'Đọc to. Câu hỏi Yes / No lên giọng ↗ ở cuối; câu hỏi what / where / who / how xuống giọng ↘.',
          'Read aloud. Yes / no questions rise ↗ at the end; what / where / who / how questions fall ↘.',
          '大声朗读。一般疑问句句末用升调 ↗；what / where / who / how 疑问句用降调 ↘。',
        ),
        items: [
          { text: 'How are you?', pron: '/haʊ ɑːr juː/', vi: 'Bạn khỏe không?', en: 'Are you well?' },
          { text: "I'm fine, thanks. And you?", pron: '/aɪm faɪn θæŋks ænd juː/', vi: 'Mình khỏe, cảm ơn. Còn bạn?', en: 'I am well, thank you. What about you?' },
          { text: 'Where are you from?', pron: '/wer ɑːr juː frʌm/', vi: 'Bạn đến từ đâu?', en: 'Which country do you come from?' },
          { text: 'Are you a teacher?', pron: '/ɑːr juː ə ˈtiːtʃər/', vi: 'Bạn là giáo viên à?', en: 'Is teaching your job?' },
          { text: "No, I'm not. I'm a student.", pron: '/noʊ aɪm nɑːt aɪm ə ˈstuːdənt/', vi: 'Không, mình không phải. Mình là sinh viên.', en: 'No, I study at a school.' },
        ],
      },
      {
        kind: 'tip',
        title: L('Hỏi lại cho lịch sự: "And you?"', 'Be polite: ask back with "And you?"', '礼貌地反问：“And you?”'),
        body: L(
          'Người nói tiếng Anh thường hỏi lại sau khi trả lời: "I\'m fine, thanks. And you?" hoặc "How about you?". Câu "How are you?" thường chỉ là lời chào — trả lời ngắn và vui vẻ là đủ, không cần kể chi tiết.',
          'English speakers usually ask back after answering: "I\'m fine, thanks. And you?" or "How about you?". "How are you?" is often just a greeting — a short, friendly answer is enough.',
          '说英语的人回答后通常会反问：“I\'m fine, thanks. And you?”或“How about you?”。“How are you?”常常只是一句问候语——简短友好地回答就够了，不需要细说。',
        ),
      },
    ],
    wordIds: WORD_IDS,
    grammarIds: ['en-g-yesno', 'en-g-wh'],
    practice: [
      { id: 'en-d6-p1', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: 'what', pron: '/wʌt/', vi: 'cái gì, gì', en: 'a word to ask about a thing or information' },
        { text: 'where', pron: '/wer/', vi: 'ở đâu, đâu', en: 'a word to ask about a place' },
        { text: 'who', pron: '/huː/', vi: 'ai', en: 'a word to ask about a person' },
        { text: 'how', pron: '/haʊ/', vi: 'thế nào, như thế nào', en: 'a word to ask in what way or in what state' },
      ], explanation: 'what = gì · where = ở đâu · who = ai · how = thế nào', wordIds: ['what', 'where', 'who', 'how'] },
      choice('en-d6-p2', 'grammar', { seq: [CHOOSE_BLANK, ' "___ she your sister?"'] }, ['Is', 'Are', 'Am', 'Does'], 0,
        L('She → is. Câu hỏi: Is she…?', 'She → is. Question: Is she…?', 'She → is。疑问句：Is she……？'), { targetOptions: true, grammarId: 'en-g-yesno' }),
      choice('en-d6-p3', 'grammar', { seq: [BEST_REPLY, ' "Is he a doctor?"'] }, ['Yes, he is.', 'Yes, he does.', 'Yes, he am.', "Yes, he's."], 0,
        L('Is he…? → Yes, he is. / No, he isn\'t.', 'Is he…? → Yes, he is. / No, he isn\'t.', 'Is he……？→ Yes, he is. / No, he isn\'t.'), { targetOptions: true, grammarId: 'en-g-yesno' }),
      arrange('en-d6-p4', G('Bạn khỏe không?', 'Are you well?'), ['How', 'are', 'you'],
        L('How + are + you? — câu chào hỏi thông dụng nhất.', 'How + are + you? — the most common greeting question.', 'How + are + you? —— 最常用的问候语。'), ['how']),
      listen('en-d6-p5', 'Where are you from?', [G('Bạn đến từ đâu?', 'Which country do you come from?'), G('Bạn sống ở đâu?', 'Where is your home?'), G('Bạn tên là gì?', 'Tell me your name.'), G('Bạn khỏe không?', 'Are you well?')], 0,
        L('Where … from? = đến từ đâu.', 'Where … from? asks about someone\'s home country or town.', 'Where … from? = 来自哪里。'), { wordIds: ['where'] }),
      choice('en-d6-p6', 'grammar', { seq: [CHOOSE_BLANK, ' "___ do you live? — In Hue."'] }, ['Where', 'Who', 'What', 'How'], 0,
        L('Câu trả lời là nơi chốn (In Hue) → where.', 'The answer is a place (In Hue) → where.', '回答是地点（In Hue）→ where。'), { targetOptions: true, grammarId: 'en-g-wh', wordIds: ['where', 'live'] }),
      typeIt('en-d6-p7', 'spelling', { k: 'ex.write.spelling', p: { meaning: G('ai', 'a word to ask about a person') } }, ['who'],
        L('who /huː/ — viết w-h-o nhưng đọc như "hu".', 'who /huː/ — spelled w-h-o, said like "hoo".', 'who /huː/ —— 拼写 w-h-o，读音像“hu”。'), { audio: 'who', wordIds: ['who'] }),
    ],
    quiz: [
      choice('en-d6-q1', 'grammar', { seq: [BEST_REPLY, ' "How are you?"'] }, ["I'm fine, thanks.", "I'm from Vietnam.", 'Yes, I am.', "I'm Lan."], 0,
        L('How are you? hỏi về sức khỏe → I\'m fine, thanks.', 'How are you? asks how you feel → I\'m fine, thanks.', 'How are you? 问的是近况 → I\'m fine, thanks.'), { targetOptions: true, grammarId: 'en-g-wh', wordIds: ['how', 'fine'] }),
      arrange('en-d6-q2', G('Họ là sinh viên phải không?', 'Do those people study at a school?'), ['Are', 'they', 'students'],
        L('Are + they + students? — đưa "are" lên đầu.', 'Are + they + students? — "are" comes first.', 'Are + they + students? —— are 放在句首。')),
      choice('en-d6-q3', 'grammar', WHICH_CORRECT, ['Where are you from?', 'You are from where?', 'Where you are from?', 'From where you are?'], 0,
        L('Từ để hỏi + are + you + from?', 'Question word + are + you + from?', '疑问词 + are + you + from?'), { targetOptions: true, grammarId: 'en-g-wh', wordIds: ['where'] }),
      choice('en-d6-q4', 'grammar', { seq: [BEST_REPLY, ' "Are you a teacher?"'] }, ["No, I'm not. I'm a student.", 'No, I am a teacher.', "Yes, I'm.", 'No, you are.'], 0,
        L('Are you…? → No, I\'m not. Câu "Yes" phải là "Yes, I am" (không rút gọn).', 'Are you…? → No, I\'m not. A "yes" answer would be "Yes, I am" (never "Yes, I\'m").', 'Are you……？→ No, I\'m not。肯定回答是“Yes, I am”（不能说“Yes, I\'m”）。'), { targetOptions: true, grammarId: 'en-g-yesno' }),
      listen('en-d6-q5', 'what', ['what', 'where', 'who', 'how'], 0,
        L('what /wʌt/ — kết thúc bằng âm /t/.', 'what /wʌt/ — it ends with /t/.', 'what /wʌt/ —— 以 /t/ 结尾。'), { targetOptions: true, wordIds: ['what'] }),
      typeIt('en-d6-q6', 'spelling', { k: 'ex.write.spelling', p: { meaning: G('thành phố', 'a big town') } }, ['city'],
        L('city /ˈsɪti/ — chữ "c" trước "i" đọc là /s/.', 'city /ˈsɪti/ — "c" before "i" sounds like /s/.', 'city /ˈsɪti/ —— c 在 i 前面读 /s/。'), { audio: 'city', wordIds: ['city'] }),
      choice('en-d6-q7', 'reading', L('Đọc và chọn câu đúng.', 'Read and choose the true sentence.', '阅读并选择正确的句子。'),
        [G('Long sống ở Đà Lạt.', 'Long lives in Da Lat.'), G('Long đến từ Canada.', 'Long is from Canada.'), G('Anna sống ở Đà Lạt.', 'Anna lives in Da Lat.'), G('Anna là người Việt Nam.', 'Anna is Vietnamese.')], 0,
        L('"I\'m from Vietnam. I live in Da Lat." — đó là Long. Anna đến từ Canada.', '"I\'m from Vietnam. I live in Da Lat." — that is Long. Anna is from Canada.', '“I\'m from Vietnam. I live in Da Lat.”——这是 Long 说的。Anna 来自加拿大。'),
        { text: "Long: I'm from Vietnam. I live in Da Lat. Anna: I'm from Canada. I live in Toronto.", wordIds: ['live'] }),
      choice('en-d6-q8', 'pronunciation', L('Câu hỏi nào thường LÊN giọng ở cuối ↗?', 'Which question usually RISES at the end ↗?', '哪个问句通常在句末用升调 ↗？'), ['Are you tired?', 'Where are you from?', 'What is your name?', 'How are you?'], 0,
        L('Câu hỏi Yes / No (Are you…?) lên giọng; câu hỏi what / where / how xuống giọng.', 'Yes / no questions (Are you…?) rise; what / where / how questions fall.', '一般疑问句（Are you……？）用升调；what / where / how 疑问句用降调。'), { targetOptions: true }),
    ],
    summary: [
      L('Câu hỏi Yes / No: Am / Is / Are + chủ ngữ…? → Yes, I am. / No, she isn\'t.', 'Yes / no questions: Am / Is / Are + subject…? → Yes, I am. / No, she isn\'t.', '一般疑问句：Am / Is / Are + 主语……？→ Yes, I am. / No, she isn\'t.'),
      L('Không rút gọn trong câu "Yes": Yes, I am (không phải Yes, I\'m).', 'No short forms in "yes" answers: Yes, I am (not Yes, I\'m).', '肯定简略回答不缩写：Yes, I am（不是 Yes, I\'m）。'),
      L('what = gì · where = ở đâu · who = ai · how = thế nào. Từ để hỏi đứng đầu câu.', 'what · where · who · how always come first in the question.', 'what = 什么 · where = 哪里 · who = 谁 · how = 怎么样。疑问词放在句首。'),
      L('How are you? — I\'m fine, thanks. And you? · Where are you from? — I\'m from Vietnam.', 'How are you? — I\'m fine, thanks. And you? · Where are you from? — I\'m from Vietnam.', 'How are you? —— I\'m fine, thanks. And you? · Where are you from? —— I\'m from Vietnam.'),
    ],
  },
  words,
  grammar,
};
