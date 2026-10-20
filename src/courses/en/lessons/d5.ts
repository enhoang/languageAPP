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
const VERB = L('Động từ', 'Verb', '动词');
const VERB_S = L('Động từ + -s', 'Verb + -s', '动词 + -s');
const OBJ = L('Tân ngữ', 'Object', '宾语');
const WHICH_CORRECT = L('Câu nào đúng?', 'Which sentence is correct?', '哪个句子是正确的？');
const CHOOSE_BLANK = L('Chọn từ đúng điền vào chỗ trống:', 'Choose the word that fills the blank:', '选择填入空格的正确词语：');

const WORD_IDS = ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'like', 'speak', 'english', 'happy'];

const words = wordsOf('en-d5', 1, [
  { id: 'i', text: 'I', pron: '/aɪ/', vi: 'tôi', en: 'the person who is speaking', type: 'pronoun', topic: 'people', level: 'Pre-A1',
    ex: ['I am Lan.', 'Tôi là Lan.', 'My name is Lan.'],
    notes: L('"I" luôn viết hoa, kể cả ở giữa câu.', '"I" is always a capital letter, even in the middle of a sentence.', '“I”永远大写，即使在句子中间也一样。') },
  { id: 'you', text: 'you', pron: '/juː/', vi: 'bạn, các bạn (ngôi thứ hai)', en: 'the person or people you are talking to', type: 'pronoun', topic: 'people', level: 'Pre-A1',
    ex: ['Are you a student, Minh?', 'Minh, bạn là sinh viên à?', 'Minh, do you study at a school?'],
    notes: L('"You" dùng cho cả số ít và số nhiều, cho mọi lứa tuổi — không phân biệt anh/chị/em/ông/bà như tiếng Việt.', '"You" is both singular and plural and works for everyone, whatever their age.', '“you”既可以是单数也可以是复数，对任何年龄的人都适用。') },
  { id: 'he', text: 'he', pron: '/hiː/', vi: 'anh ấy, ông ấy, cậu ấy (nam)', en: 'a man or boy already talked about', type: 'pronoun', topic: 'people', level: 'Pre-A1',
    ex: ['He is my teacher.', 'Thầy ấy là giáo viên của tôi.', 'That man teaches me.'] },
  { id: 'she', text: 'she', pron: '/ʃiː/', vi: 'cô ấy, chị ấy, bà ấy (nữ)', en: 'a woman or girl already talked about', type: 'pronoun', topic: 'people', level: 'Pre-A1',
    ex: ['She is from Hue.', 'Cô ấy đến từ Huế.', 'Her home town is Hue.'],
    notes: L('Đọc /ʃiː/ với âm "sh" (môi tròn, như "s" nặng), đừng đọc thành "si".', 'Say /ʃiː/ with a "sh" sound, not "see".', '读 /ʃiː/，用“sh”音，不要读成“see”。') },
  { id: 'it', text: 'it', pron: '/ɪt/', vi: 'nó (đồ vật, con vật)', en: 'a thing or animal already talked about', type: 'pronoun', topic: 'people', level: 'Pre-A1',
    ex: ['It is a small cat.', 'Nó là một con mèo nhỏ.', 'That animal is a little cat.'],
    notes: L('Nhớ bật âm /t/ cuối: /ɪt/, không phải "i".', 'Remember the final /t/: /ɪt/, not just "i".', '记得发出词尾的 /t/：/ɪt/，不要只读“i”。') },
  { id: 'we', text: 'we', pron: '/wiː/', vi: 'chúng tôi, chúng ta', en: 'I and one or more other people', type: 'pronoun', topic: 'people', level: 'Pre-A1',
    ex: ['We are friends.', 'Chúng tôi là bạn bè.', 'The two of us know and like each other.'] },
  { id: 'they', text: 'they', pron: '/ðeɪ/', vi: 'họ, chúng nó', en: 'other people or things, more than one', type: 'pronoun', topic: 'people', level: 'Pre-A1',
    ex: ['They are in the classroom.', 'Họ đang ở trong lớp học.', 'Those people are inside the room for lessons.'],
    notes: L('"th" trong "they" là /ð/: đặt đầu lưỡi giữa hai hàm răng và rung cổ họng.', 'The "th" in "they" is /ð/: tongue between the teeth, with voice.', '“they”中的“th”读 /ð/：舌尖放在上下齿之间，声带振动。') },
  { id: 'like', text: 'like', pron: '/laɪk/', vi: 'thích', en: 'to enjoy something', type: 'verb', topic: 'daily', level: 'Pre-A1',
    ex: ['My brother likes football.', 'Em trai tôi thích bóng đá.', 'My brother enjoys football.'] },
  { id: 'speak', text: 'speak', pron: '/spiːk/', vi: 'nói (một ngôn ngữ)', en: 'to use a language with your voice', type: 'verb', topic: 'daily', level: 'A1',
    ex: ['Nam speaks Vietnamese and English.', 'Nam nói tiếng Việt và tiếng Anh.', 'Nam can talk in two languages: Vietnamese and English.'] },
  { id: 'english', text: 'English', pron: '/ˈɪŋɡlɪʃ/', vi: 'tiếng Anh', en: 'the language of the UK, the USA and many other countries', type: 'proper-noun', topic: 'countries', level: 'Pre-A1',
    ex: ['I like English.', 'Tôi thích tiếng Anh.', 'I enjoy the English language.'],
    notes: L('Tên ngôn ngữ luôn viết hoa: English, Vietnamese.', 'Language names always start with a capital letter: English, Vietnamese.', '语言名称首字母总是大写：English、Vietnamese。') },
  { id: 'happy', text: 'happy', pron: '/ˈhæpi/', vi: 'vui, vui vẻ', en: 'feeling good', type: 'adjective', topic: 'feelings', level: 'Pre-A1',
    ex: ['The children are happy today.', 'Hôm nay bọn trẻ rất vui.', 'The kids feel good today.'] },
]);

const grammar: GrammarPoint[] = [
  {
    id: 'en-g-be',
    lessonId: 'en-d5',
    title: L('Động từ to be: am / is / are', 'The verb "to be": am / is / are', 'be 动词：am / is / are'),
    pattern: L(
      'I am · he / she / it is · you / we / they are (+ not)',
      'I am · he / she / it is · you / we / they are (+ not)',
      'I am · he / she / it is · you / we / they are（+ not）',
    ),
    meaning: [
      L(
        '"To be" nghĩa là "là / thì / ở". Nó nối chủ ngữ với danh từ (I am a student), tính từ (She is happy) hoặc nơi chốn (We are in Hanoi).',
        '"To be" links the subject to a noun (I am a student), an adjective (She is happy) or a place (We are in Hanoi).',
        'be 动词把主语和名词（I am a student）、形容词（She is happy）或地点（We are in Hanoi）连接起来，相当于“是 / 在”，形容词前也要用。',
      ),
      L(
        'Dạng của "to be" đổi theo chủ ngữ: I → am; he / she / it (và một người, một vật) → is; you / we / they (và nhiều người, nhiều vật) → are.',
        'The form changes with the subject: I → am; he / she / it (one person or thing) → is; you / we / they (more than one, and "you") → are.',
        'be 动词的形式随主语变化：I → am；he / she / it（单个人或物）→ is；you / we / they（复数以及 you）→ are。',
      ),
      L(
        'Khác tiếng Việt: trước tính từ vẫn PHẢI có "to be". "Tôi vui" = I am happy (không nói "I happy").',
        'Unlike Vietnamese, English needs "to be" before an adjective too: "Tôi vui" = I am happy (not "I happy").',
        '和越南语（以及汉语）不同：形容词前也必须有 be 动词。“我很开心”= I am happy（不能说“I happy”）。',
      ),
      L(
        'Phủ định: thêm "not" sau am / is / are. Dạng rút gọn khi nói: I\'m not, he isn\'t / she isn\'t, you aren\'t / they aren\'t. Không có "amn\'t".',
        'Negative: put "not" after am / is / are. Short forms in speech: I\'m not, he isn\'t, they aren\'t. There is no "amn\'t".',
        '否定：在 am / is / are 后面加 not。口语缩写：I\'m not、he isn\'t、they aren\'t。没有“amn\'t”这种形式。',
      ),
    ],
    breakdown: [
      [{ text: 'I', role: SUBJ }, { text: 'am', role: BE }, { text: 'a', role: ART }, { text: 'student', role: NOUN }],
      [{ text: 'She', role: SUBJ }, { text: 'is', role: BE }, { text: 'happy', role: ADJ }],
      [{ text: 'They', role: SUBJ }, { text: 'are', role: BE }, { text: 'not', role: NEG }, { text: 'teachers', role: NOUN }],
    ],
    examples: [
      { text: 'I am a student.', vi: 'Tôi là học sinh.', en: 'I study at a school or university.' },
      { text: 'He is a doctor.', vi: 'Anh ấy là bác sĩ.', en: 'His job is helping sick people.' },
      { text: 'It is cold today.', vi: 'Hôm nay trời lạnh.', en: 'The weather is not warm today.' },
      { text: 'We are from Vietnam.', vi: 'Chúng tôi đến từ Việt Nam.', en: 'Our home country is Vietnam.' },
      { text: "She isn't a teacher.", vi: 'Cô ấy không phải là giáo viên.', en: 'Teaching is not her job.' },
      { text: "I'm not tired.", vi: 'Tôi không mệt.', en: 'I still have lots of energy.' },
    ],
    mistakes: [
      { wrong: 'I happy.', right: 'I am happy.', why: L('Trước tính từ vẫn cần "to be".', 'You need "to be" before an adjective.', '形容词前面也要有 be 动词。') },
      { wrong: 'She are a student.', right: 'She is a student.', why: L('She / he / it đi với "is".', 'She / he / it take "is".', 'she / he / it 后面用 is。') },
      { wrong: "I amn't tired.", right: "I'm not tired.", why: L('Không có dạng "amn\'t"; dùng "I\'m not" hoặc "I am not".', 'There is no "amn\'t"; say "I\'m not" or "I am not".', '没有“amn\'t”，要说“I\'m not”或“I am not”。') },
      { wrong: 'They not are teachers.', right: 'They are not teachers.', why: L('"Not" đứng SAU am / is / are.', '"Not" comes AFTER am / is / are.', 'not 放在 am / is / are 的后面。') },
    ],
    exercises: [
      choice('en-g-be-1', 'grammar', { seq: [CHOOSE_BLANK, ' "We ___ friends."'] }, ['are', 'is', 'am'], 0,
        L('We đi với "are".', '"We" takes "are".', 'we 后面用 are。'), { grammarId: 'en-g-be', targetOptions: true, wordIds: ['we'] }),
      choice('en-g-be-2', 'grammar', WHICH_CORRECT, ['He is happy.', 'He happy.', 'He are happy.', 'He am happy.'], 0,
        L('He + is + tính từ.', 'He + is + adjective.', 'He + is + 形容词。'), { grammarId: 'en-g-be', targetOptions: true, wordIds: ['he', 'happy'] }),
      { ...arrange('en-g-be-3', G('Họ không phải là giáo viên.', 'Teaching is not their job.'), ['They', 'are', 'not', 'teachers'],
        L('Chủ ngữ + are + not + danh từ.', 'Subject + are + not + noun.', '主语 + are + not + 名词。'), ['they'],
        ['They are not teachers', "They aren't teachers"]), grammarId: 'en-g-be' },
    ],
  },
  {
    id: 'en-g-svo',
    lessonId: 'en-d5',
    title: L('Chủ ngữ + Động từ + Tân ngữ (thì hiện tại đơn)', 'Subject + Verb + Object (present simple)', '主语 + 动词 + 宾语（一般现在时）'),
    pattern: L(
      'I / you / we / they + động từ · he / she / it + động từ-s',
      'I / you / we / they + verb · he / she / it + verb-s',
      'I / you / we / they + 动词 · he / she / it + 动词-s',
    ),
    meaning: [
      L(
        'Trật tự câu cơ bản giống tiếng Việt: Ai + làm gì + cái gì. "Tôi thích tiếng Anh" = I like English.',
        'The basic word order is the same as in Vietnamese: who + does + what. "Tôi thích tiếng Anh" = I like English.',
        '基本语序和越南语、汉语一样：谁 + 做 + 什么。“我喜欢英语”= I like English。',
      ),
      L(
        'Thì hiện tại đơn dùng cho thói quen, sở thích, sự thật: I speak Vietnamese. We like music.',
        'The present simple is for habits, likes and facts: I speak Vietnamese. We like music.',
        '一般现在时用来表达习惯、喜好和事实：I speak Vietnamese. We like music.',
      ),
      L(
        'Điểm khác biệt quan trọng: khi chủ ngữ là he / she / it (hoặc một người, một vật), động từ thêm -s: I like → she likes, I speak → he speaks. Động từ tiếng Việt không bao giờ đổi, nên rất dễ quên!',
        'The key difference: when the subject is he / she / it (one person or thing), the verb adds -s: I like → she likes, I speak → he speaks. Vietnamese verbs never change, so this is easy to forget!',
        '关键区别：主语是 he / she / it（单个人或物）时，动词要加 -s：I like → she likes，I speak → he speaks。越南语和汉语的动词从不变化，所以很容易忘记！',
      ),
      L(
        'Đọc rõ âm -s cuối: likes /laɪks/, speaks /spiːks/. Người Việt hay nuốt mất âm cuối này.',
        'Pronounce the final -s clearly: likes /laɪks/, speaks /spiːks/. Vietnamese speakers often drop it.',
        '要清楚地读出词尾的 -s：likes /laɪks/、speaks /spiːks/。越南学习者常常把它吞掉。',
      ),
    ],
    breakdown: [
      [{ text: 'I', role: SUBJ }, { text: 'like', role: VERB }, { text: 'English', role: OBJ }],
      [{ text: 'She', role: SUBJ }, { text: 'speaks', role: VERB_S }, { text: 'Vietnamese', role: OBJ }],
    ],
    examples: [
      { text: 'I like music.', vi: 'Tôi thích âm nhạc.', en: 'Music is something I enjoy.' },
      { text: 'She likes cats.', vi: 'Cô ấy thích mèo.', en: 'Cats are animals she enjoys.' },
      { text: 'We speak Vietnamese at home.', vi: 'Ở nhà chúng tôi nói tiếng Việt.', en: 'In our house we talk in Vietnamese.' },
      { text: 'He speaks English very well.', vi: 'Anh ấy nói tiếng Anh rất giỏi.', en: 'His English is very good.' },
      { text: 'They like coffee.', vi: 'Họ thích cà phê.', en: 'Coffee is a drink they enjoy.' },
    ],
    mistakes: [
      { wrong: 'She like English.', right: 'She likes English.', why: L('Chủ ngữ she / he / it → động từ thêm -s.', 'After she / he / it the verb takes -s.', 'she / he / it 后面的动词要加 -s。') },
      { wrong: 'I likes English.', right: 'I like English.', why: L('Với I / you / we / they động từ giữ nguyên.', 'With I / you / we / they the verb has no -s.', 'I / you / we / they 后面的动词不加 -s。') },
      { wrong: 'I am like English.', right: 'I like English.', why: L('Không dùng "am / is / are" cùng một động từ thường ở thì hiện tại đơn.', 'Don\'t put am / is / are before an ordinary verb in the present simple.', '一般现在时中，普通动词前面不加 am / is / are。') },
    ],
    exercises: [
      choice('en-g-svo-1', 'grammar', { seq: [CHOOSE_BLANK, ' "He ___ English."'] }, ['speaks', 'speak', 'is speak'], 0,
        L('He → động từ thêm -s: speaks.', 'He → verb + -s: speaks.', 'He → 动词加 -s：speaks。'), { grammarId: 'en-g-svo', targetOptions: true, wordIds: ['he', 'speak'] }),
      { ...arrange('en-g-svo-2', G('Chúng tôi thích tiếng Anh.', 'English is a language we enjoy.'), ['We', 'like', 'English'],
        L('Chủ ngữ + động từ + tân ngữ. We → like (không có -s).', 'Subject + verb + object. We → like (no -s).', '主语 + 动词 + 宾语。We → like（不加 -s）。'), ['we', 'like', 'english']), grammarId: 'en-g-svo' },
      choice('en-g-svo-3', 'grammar', WHICH_CORRECT, ['She likes cats.', 'She like cats.', 'She is like cats.', 'She cats likes.'], 0,
        L('She + likes + tân ngữ.', 'She + likes + object.', 'She + likes + 宾语。'), { grammarId: 'en-g-svo', targetOptions: true, wordIds: ['she', 'like'] }),
    ],
  },
];

export const D5: DayContent = {
  lesson: {
    id: 'en-d5', day: 5, stage: 1, minutes: 25, prerequisites: ['en-d4'],
    title: L('Đại từ & câu đơn giản', 'Pronouns & simple sentences', '人称代词和简单句'),
    subtitle: L(
      'I · you · he · she · it · we · they · am / is / are · I like / she likes',
      'I · you · he · she · it · we · they · am / is / are · I like / she likes',
      'I · you · he · she · it · we · they · am / is / are · I like / she likes',
    ),
    objectives: [
      L('Dùng đúng 7 đại từ nhân xưng: I, you, he, she, it, we, they.', 'Use the seven subject pronouns: I, you, he, she, it, we, they.', '正确使用七个主格人称代词：I、you、he、she、it、we、they。'),
      L('Chọn đúng am / is / are và nói câu phủ định (isn\'t, aren\'t, I\'m not).', 'Choose am / is / are correctly and make negatives (isn\'t, aren\'t, I\'m not).', '正确选择 am / is / are，并会说否定句（isn\'t、aren\'t、I\'m not）。'),
      L('Đặt câu Chủ ngữ + Động từ + Tân ngữ: I like English.', 'Build Subject + Verb + Object sentences: I like English.', '造“主语 + 动词 + 宾语”的句子：I like English.'),
      L('Nhớ thêm -s cho động từ sau he / she / it: she likes, he speaks.', 'Remember the -s after he / she / it: she likes, he speaks.', '记住 he / she / it 后面的动词加 -s：she likes、he speaks。'),
    ],
    intro: [
      L(
        'Tiếng Việt có rất nhiều cách xưng hô (anh, chị, em, cô, chú, ông, bà…). Tiếng Anh đơn giản hơn nhiều: chỉ có 7 đại từ làm chủ ngữ, và "you" dùng cho mọi người.',
        'Vietnamese has many ways to address people (anh, chị, em, cô, chú, ông, bà…). English is much simpler: only seven subject pronouns, and "you" works for everyone.',
        '越南语的称呼方式很多（anh、chị、em、cô、chú、ông、bà……）。英语简单得多：只有七个主格代词，而且“you”可以用来称呼任何人。',
      ),
      L(
        'Nhưng tiếng Anh có một điều tiếng Việt không có: động từ thay đổi theo chủ ngữ. "Là" có ba dạng am / is / are, và động từ thường thêm -s sau he / she / it.',
        'But English has something Vietnamese doesn\'t: verbs change with the subject. "To be" has three forms, am / is / are, and ordinary verbs add -s after he / she / it.',
        '但英语有越南语没有的特点：动词随主语变化。be 动词有 am / is / are 三种形式，普通动词在 he / she / it 后面要加 -s。',
      ),
      L(
        'Hôm nay bạn sẽ học cách nói những câu đầu tiên về bản thân và người khác: I am happy. She is a teacher. He likes English.',
        'Today you will make your first sentences about yourself and others: I am happy. She is a teacher. He likes English.',
        '今天你将学会说关于自己和别人的第一批句子：I am happy. She is a teacher. He likes English.',
      ),
    ],
    sections: [
      { kind: 'words', title: L('Từ mới', 'New words', '生词'), wordIds: WORD_IDS },
      {
        kind: 'text',
        title: L('Bảy đại từ nhân xưng', 'The seven subject pronouns', '七个主格人称代词'),
        body: [
          L(
            'Số ít: I (tôi) · you (bạn) · he (anh ấy – nam) · she (cô ấy – nữ) · it (nó – đồ vật, con vật). Số nhiều: we (chúng tôi / chúng ta) · you (các bạn) · they (họ – người hoặc vật).',
            'Singular: I · you · he (a man or boy) · she (a woman or girl) · it (a thing or animal). Plural: we · you · they (people or things).',
            '单数：I（我）· you（你）· he（他，男性）· she（她，女性）· it（它，物或动物）。复数：we（我们）· you（你们）· they（他们 / 她们 / 它们）。',
          ),
          L(
            'He hay she chỉ phụ thuộc vào giới tính, không phụ thuộc tuổi hay vai vế: ông nội, anh trai, em bé trai đều là "he".',
            'He or she depends only on gender, not on age or status: a grandfather, a brother and a baby boy are all "he".',
            '用 he 还是 she 只看性别，不看年龄或辈分：爷爷、哥哥、小男孩都是“he”。',
          ),
          L(
            '"I" luôn viết hoa. "They" dùng cho cả người và vật: Lan and Minh → they; the books → they.',
            '"I" is always written as a capital. "They" is for people and things: Lan and Minh → they; the books → they.',
            '“I”永远大写。“they”既指人也指物：Lan and Minh → they；the books → they。',
          ),
        ],
      },
      { kind: 'grammar', grammarId: 'en-g-be' },
      {
        kind: 'examples',
        title: L('Câu với am / is / are', 'Sentences with am / is / are', '含 am / is / are 的句子'),
        examples: [
          { text: "I'm Hoa. I'm a student.", vi: 'Mình là Hoa. Mình là sinh viên.', en: 'My name is Hoa and I study at a school.' },
          { text: 'You are very kind.', vi: 'Bạn thật tốt bụng.', en: 'You are a very nice, helpful person.' },
          { text: "He's from Da Nang.", vi: 'Anh ấy đến từ Đà Nẵng.', en: 'His home town is Da Nang.' },
          { text: "It isn't a dog. It's a cat.", vi: 'Nó không phải con chó. Nó là con mèo.', en: 'That animal is a cat, not a dog.' },
          { text: "We aren't tired. We're happy.", vi: 'Chúng tôi không mệt. Chúng tôi đang vui.', en: 'We have energy and we feel good.' },
        ],
      },
      { kind: 'grammar', grammarId: 'en-g-svo' },
      {
        kind: 'examples',
        title: L('I like… / She likes…', 'I like… / She likes…', 'I like… / She likes…'),
        examples: [
          { text: 'I like tea. My sister likes milk.', vi: 'Tôi thích trà. Chị tôi thích sữa.', en: 'Tea is the drink I enjoy; my sister prefers milk.' },
          { text: 'You speak English well.', vi: 'Bạn nói tiếng Anh giỏi.', en: 'Your English is good.' },
          { text: 'My dad speaks French.', vi: 'Bố tôi nói tiếng Pháp.', en: 'My father can talk in French.' },
          { text: 'The cat likes fish.', vi: 'Con mèo thích cá.', en: "Fish is the cat's favourite food." },
        ],
      },
      {
        kind: 'speak',
        title: L('Luyện nói', 'Speaking practice', '口语练习'),
        intro: L(
          'Đọc to từng câu. Chú ý âm cuối: /s/ trong likes, speaks; /t/ trong it, isn\'t.',
          'Read each sentence aloud. Watch the final sounds: /s/ in likes, speaks; /t/ in it, isn\'t.',
          '大声读每个句子。注意词尾的音：likes、speaks 中的 /s/，it、isn\'t 中的 /t/。',
        ),
        items: [
          { text: 'I am happy.', pron: '/aɪ æm ˈhæpi/', vi: 'Tôi vui.', en: 'I feel good.' },
          { text: 'She is a teacher.', pron: '/ʃiː ɪz ə ˈtiːtʃər/', vi: 'Cô ấy là giáo viên.', en: 'Her job is teaching.' },
          { text: "They aren't students.", pron: '/ðeɪ ɑːrnt ˈstuːdənts/', vi: 'Họ không phải là sinh viên.', en: 'Those people do not study at a school.' },
          { text: 'He likes English.', pron: '/hiː laɪks ˈɪŋɡlɪʃ/', vi: 'Anh ấy thích tiếng Anh.', en: 'English is a language he enjoys.' },
          { text: 'We speak Vietnamese.', pron: '/wiː spiːk ˌviːetnəˈmiːz/', vi: 'Chúng tôi nói tiếng Việt.', en: 'Our language is Vietnamese.' },
        ],
      },
      {
        kind: 'tip',
        title: L('Hai lỗi người Việt hay mắc', 'Two mistakes Vietnamese speakers often make', '越南学习者的两个常见错误'),
        body: L(
          '1) Quên "to be" trước tính từ: nói "I happy" thay vì "I am happy" (vì tiếng Việt nói "Tôi vui"). 2) Quên -s: "She like" thay vì "She likes". Mẹo: mỗi khi nói he / she / it, hãy tự hỏi "-s đâu rồi?".',
          '1) Leaving out "to be" before an adjective: "I happy" instead of "I am happy" (because Vietnamese says "Tôi vui"). 2) Forgetting the -s: "She like" instead of "She likes". Trick: every time you say he / she / it, ask yourself "where is my -s?".',
          '1）形容词前漏掉 be 动词：说成“I happy”而不是“I am happy”（因为越南语说“Tôi vui”）。2）忘记 -s：说成“She like”而不是“She likes”。小窍门：每次说 he / she / it 时，问问自己“-s 在哪儿？”。',
        ),
      },
    ],
    wordIds: WORD_IDS,
    grammarIds: ['en-g-be', 'en-g-svo'],
    practice: [
      { id: 'en-d5-p1', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: 'I', pron: '/aɪ/', vi: 'tôi', en: 'the person who is speaking' },
        { text: 'she', pron: '/ʃiː/', vi: 'cô ấy, chị ấy, bà ấy (nữ)', en: 'a woman or girl already talked about' },
        { text: 'we', pron: '/wiː/', vi: 'chúng tôi, chúng ta', en: 'I and one or more other people' },
        { text: 'they', pron: '/ðeɪ/', vi: 'họ, chúng nó', en: 'other people or things, more than one' },
        { text: 'it', pron: '/ɪt/', vi: 'nó (đồ vật, con vật)', en: 'a thing or animal already talked about' },
      ], explanation: 'I = tôi · she = cô ấy · we = chúng tôi · they = họ · it = nó', wordIds: ['i', 'she', 'we', 'they', 'it'] },
      choice('en-d5-p2', 'grammar', { seq: [CHOOSE_BLANK, ' "She ___ a teacher."'] }, ['is', 'am', 'are'], 0,
        L('She / he / it → is.', 'She / he / it → is.', 'she / he / it → is。'), { targetOptions: true, grammarId: 'en-g-be', wordIds: ['she'] }),
      choice('en-d5-p3', 'grammar', { seq: [CHOOSE_BLANK, ' "I ___ from Vietnam."'] }, ['am', 'is', 'are'], 0,
        L('I luôn đi với "am".', '"I" always takes "am".', 'I 后面总是用 am。'), { targetOptions: true, grammarId: 'en-g-be', wordIds: ['i'] }),
      arrange('en-d5-p4', G('Anh ấy không phải là giáo viên.', 'Teaching is not his job.'), ['He', 'is', 'not', 'a', 'teacher'],
        L('Chủ ngữ + is + not + a + danh từ. Có thể nói gọn: He isn\'t a teacher.', 'Subject + is + not + a + noun. Short form: He isn\'t a teacher.', '主语 + is + not + a + 名词。缩写：He isn\'t a teacher.'), ['he']),
      listen('en-d5-p5', 'she', ['she', 'he', 'see', 'we'], 0,
        L('/ʃiː/ — âm "sh" ở đầu. "He" là /hiː/, "see" là /siː/.', '/ʃiː/ starts with "sh". "He" is /hiː/, "see" is /siː/.', '/ʃiː/ 以“sh”音开头。“he”读 /hiː/，“see”读 /siː/。'),
        { targetOptions: true, wordIds: ['she'] }),
      choice('en-d5-p6', 'grammar', { seq: [CHOOSE_BLANK, ' "My mother ___ coffee."'] }, ['likes', 'like', 'are like'], 0,
        L('My mother = she → động từ thêm -s: likes.', 'My mother = she → verb + -s: likes.', 'My mother = she → 动词加 -s：likes。'), { targetOptions: true, grammarId: 'en-g-svo', wordIds: ['like'] }),
      typeIt('en-d5-p7', 'spelling', { k: 'ex.write.spelling', p: { meaning: G('họ, chúng nó', 'other people or things, more than one') } }, ['they'],
        L('they /ðeɪ/ — t-h-e-y.', 'they /ðeɪ/ — t-h-e-y.', 'they /ðeɪ/ —— t-h-e-y。'), { audio: 'they', wordIds: ['they'] }),
      choice('en-d5-p8', 'grammar', WHICH_CORRECT, ['I am happy.', 'I happy.', 'I is happy.', 'I are happy.'], 0,
        L('Trước tính từ cần "to be": I am happy.', 'You need "to be" before an adjective: I am happy.', '形容词前需要 be 动词：I am happy。'), { targetOptions: true, grammarId: 'en-g-be', wordIds: ['i', 'happy'] }),
    ],
    quiz: [
      choice('en-d5-q1', 'vocabulary', { k: 'ex.chooseWord', p: { meaning: G('chúng tôi, chúng ta', 'I and one or more other people') } }, ['we', 'they', 'you', 'he'], 0,
        L('we /wiː/ = chúng tôi, chúng ta.', 'we /wiː/ = I and other people.', 'we /wiː/ = 我们。'), { targetOptions: true, wordIds: ['we'] }),
      choice('en-d5-q2', 'grammar', { seq: [CHOOSE_BLANK, ' "Lan and Minh ___ students."'] }, ['are', 'is', 'am'], 0,
        L('Lan and Minh = they → are.', 'Lan and Minh = they → are.', 'Lan and Minh = they → are。'), { targetOptions: true, grammarId: 'en-g-be' }),
      arrange('en-d5-q3', G('Cô ấy thích tiếng Anh.', 'She enjoys the English language.'), ['She', 'likes', 'English'],
        L('She + likes (có -s) + English.', 'She + likes (with -s) + English.', 'She + likes（加 -s）+ English。'), ['she', 'like', 'english']),
      choice('en-d5-q4', 'grammar', L('Câu phủ định của "He is a student." là:', 'The negative of "He is a student." is:', '“He is a student.”的否定句是：'),
        ["He isn't a student.", "He aren't a student.", 'He not is a student.', "He doesn't a student."], 0,
        L('Thêm "not" sau "is": He is not / He isn\'t a student.', 'Add "not" after "is": He is not / He isn\'t a student.', '在 is 后面加 not：He is not / He isn\'t a student。'), { targetOptions: true, grammarId: 'en-g-be', wordIds: ['he'] }),
      listen('en-d5-q5', 'They speak English.', [G('Họ nói tiếng Anh.', 'Those people talk in English.'), G('Anh ấy nói tiếng Anh.', 'That man talks in English.'), G('Chúng tôi thích tiếng Anh.', 'English is a language we enjoy.'), G('Họ thích tiếng Anh.', 'Those people enjoy English.')], 0,
        L('They (họ) + speak (nói) + English (tiếng Anh).', 'They + speak + English.', 'They（他们）+ speak（说）+ English（英语）。'), { wordIds: ['they', 'speak', 'english'] }),
      typeIt('en-d5-q6', 'spelling', { k: 'ex.write.spelling', p: { meaning: G('nói (một ngôn ngữ)', 'to use a language with your voice') } }, ['speak'],
        L('speak /spiːk/ — "ee" dài được viết là "ea".', 'speak /spiːk/ — the long "ee" sound is spelled "ea".', 'speak /spiːk/ —— 长音 /iː/ 写作“ea”。'), { audio: 'speak', wordIds: ['speak'] }),
      choice('en-d5-q7', 'pronunciation', L('"likes" đọc là:', 'How is "likes" pronounced?', '“likes”怎么读？'), ['/laɪks/', '/laɪk/', '/lɪks/', '/laɪkɪz/'], 0,
        L('likes /laɪks/ — nhớ âm /s/ ở cuối.', 'likes /laɪks/ — keep the final /s/.', 'likes /laɪks/ —— 记得读出词尾的 /s/。'), { text: 'likes', audio: 'likes', wordIds: ['like'] }),
      choice('en-d5-q8', 'grammar', L('Thay "my brother" bằng đại từ đúng: "My brother is happy."', 'Replace "my brother" with the right pronoun: "My brother is happy."', '用正确的代词替换“my brother”：“My brother is happy.”'), ['He', 'She', 'It', 'They'], 0,
        L('Brother là nam, một người → he.', 'A brother is one male person → he.', 'brother 是一个男性 → he。'), { targetOptions: true, wordIds: ['he', 'happy'] }),
    ],
    summary: [
      L('Đại từ: I, you, he, she, it, we, they. "I" luôn viết hoa; "you" dùng cho mọi người.', 'Pronouns: I, you, he, she, it, we, they. "I" is always a capital; "you" is for everyone.', '代词：I、you、he、she、it、we、they。“I”永远大写；“you”可以称呼任何人。'),
      L('I am · he / she / it is · you / we / they are. Phủ định: I\'m not, isn\'t, aren\'t.', 'I am · he / she / it is · you / we / they are. Negatives: I\'m not, isn\'t, aren\'t.', 'I am · he / she / it is · you / we / they are。否定：I\'m not、isn\'t、aren\'t。'),
      L('Trước tính từ vẫn cần "to be": I am happy.', 'Use "to be" before adjectives too: I am happy.', '形容词前也要用 be 动词：I am happy。'),
      L('Chủ ngữ + Động từ + Tân ngữ: I like English. Sau he / she / it động từ thêm -s: She likes English.', 'Subject + Verb + Object: I like English. After he / she / it the verb adds -s: She likes English.', '主语 + 动词 + 宾语：I like English。he / she / it 后面的动词加 -s：She likes English。'),
    ],
  },
  words,
  grammar,
};
