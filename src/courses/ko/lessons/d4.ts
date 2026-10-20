import type { Gloss, GrammarPoint, LText } from '../../../types';
import { MATCH_PROMPT, arrangeWith, choice, listen, typeIt, wordsOf, type DayContent } from '../../helpers';

const L = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });
const G = (vi: string, en: string): Gloss => ({ vi, en });
const arrange = arrangeWith(' ');
const LV = 'TOPIK I · 1';

const GREET_IDS = ['annyeonghaseyo', 'annyeonghi-gaseyo', 'annyeonghi-gyeseyo', 'cheoeum-boepgetseumnida', 'mannaseo-bangapseumnida'];
const PEOPLE_IDS = ['jeo', 'ireum', 'haksaeng', 'seonsaengnim', 'saram', 'hanguk', 'beteunam'];

const NOUN = L('Danh từ', 'Noun', '名词');
const TOPIC = L('Chủ đề (은/는)', 'Topic (은/는)', '话题（은/는）');
const IEYO = L('"là" (sau patchim)', '"is/am" (after a consonant)', '“是”（有收音）');
const YEYO = L('"là" (sau nguyên âm)', '"is/am" (after a vowel)', '“是”（无收音）');
const PRED = L('Vị ngữ (N + 이에요/예요)', 'Predicate (N + 이에요/예요)', '谓语（N + 이에요/예요）');
const WHICH_CORRECT = L('Câu nào đúng?', 'Which sentence is correct?', '哪个句子是正确的？');

const words = wordsOf('ko-d4', 1, [
  {
    id: 'annyeonghaseyo', text: '안녕하세요', pron: 'annyeonghaseyo', vi: 'xin chào', en: 'hello', type: 'phrase', topic: 'greetings', level: LV,
    notes: L(
      'Nghĩa đen: "Bạn có bình an không?" (안녕 = an ninh). Dùng mọi lúc trong ngày, với mọi người. Bạn thân nói gọn: 안녕.',
      'Literally "Are you at peace?" (안녕 = 安寧). Used at any time of day, with anyone. Close friends just say 안녕.',
      '字面意思是“您安宁吗？”（안녕 = 安宁）。一天中任何时候、对任何人都可以用。好朋友之间说“안녕”。',
    ),
    ex: ['안녕하세요, 선생님!', 'Em chào thầy/cô ạ!', 'Hello, teacher!', 'Annyeonghaseyo, seonsaengnim!'],
  },
  {
    id: 'annyeonghi-gaseyo', text: '안녕히 가세요', pron: 'annyeonghi gaseyo', vi: 'tạm biệt (nói với người ra về)', en: 'goodbye (to someone leaving)',
    type: 'phrase', topic: 'greetings', level: LV,
    notes: L('Nghĩa đen: "Đi bình an nhé". Người Ở LẠI nói với người ĐI.', 'Literally "Go in peace". Said BY the one staying TO the one leaving.', '字面意思是“请慢走”。留下的人对离开的人说。'),
    ex: ['민수 씨, 안녕히 가세요.', 'Tạm biệt anh Minsu, anh về cẩn thận nhé.', 'Goodbye, Minsu — take care on your way.', 'Minsu ssi, annyeonghi gaseyo.'],
  },
  {
    id: 'annyeonghi-gyeseyo', text: '안녕히 계세요', pron: 'annyeonghi gyeseyo', vi: 'tạm biệt (nói với người ở lại)', en: 'goodbye (to someone staying)',
    type: 'phrase', topic: 'greetings', level: LV,
    notes: L(
      'Nghĩa đen: "Ở lại bình an nhé". Người ĐI nói với người Ở LẠI. 계 thường đọc gần [게].',
      'Literally "Stay in peace". Said BY the one leaving TO the one staying. 계 is often pronounced close to [게].',
      '字面意思是“请留步、您保重”。离开的人对留下的人说。계 常读得接近 [게]。',
    ),
    ex: ['선생님, 안녕히 계세요.', 'Em chào thầy/cô, em về ạ.', "Goodbye, teacher — I'm off now.", 'Seonsaengnim, annyeonghi gyeseyo.'],
  },
  {
    id: 'cheoeum-boepgetseumnida', text: '처음 뵙겠습니다', pron: 'cheoeum boepgetseumnida', spoken: '[처음 뵙껟씀니다]',
    vi: 'rất hân hạnh (lần đầu gặp)', en: 'how do you do', type: 'phrase', topic: 'greetings', level: LV,
    notes: L(
      'Nghĩa đen: "Lần đầu tiên tôi được gặp (ngài)". Rất lịch sự, chỉ nói ở lần gặp đầu tiên. 뵙다 là động từ khiêm nhường của "gặp".',
      'Literally "I am seeing you for the first time". Very polite, only at a first meeting. 뵙다 is the humble verb for "to meet".',
      '字面意思是“初次拜见”。非常礼貌，只在第一次见面时说。뵙다 是“见”的谦语。',
    ),
    ex: ['처음 뵙겠습니다. 저는 란이에요.', 'Rất hân hạnh được gặp. Tôi là Lan.', "How do you do? I'm Lan.", 'Cheoeum boepgetseumnida. Jeoneun Ranieyo.'],
  },
  {
    id: 'mannaseo-bangapseumnida', text: '만나서 반갑습니다', pron: 'mannaseo bangapseumnida', spoken: '[만나서 반갑씀니다]',
    vi: 'rất vui được gặp bạn', en: 'nice to meet you', type: 'phrase', topic: 'greetings', level: LV,
    notes: L(
      '만나서 = "vì được gặp", 반갑습니다 = "vui mừng". Dạng 해요체: 만나서 반가워요.',
      '만나서 = "because (I) met (you)", 반갑습니다 = "(I am) glad". Polite everyday form: 만나서 반가워요.',
      '만나서 =“见到（你）”，반갑습니다 =“很高兴”。해요体：만나서 반가워요。',
    ),
    ex: ['만나서 반갑습니다. 저는 마이예요.', 'Rất vui được gặp bạn. Tôi là Mai.', "Nice to meet you. I'm Mai.", 'Mannaseo bangapseumnida. Jeoneun Maiyeyo.'],
  },
  {
    id: 'jeo', text: '저', pron: 'jeo', vi: 'tôi (khiêm tốn)', en: 'I (humble, polite)', type: 'pronoun', topic: 'people', level: LV,
    notes: L(
      'Cách xưng "tôi" khiêm tốn, lịch sự. Với bạn thân dùng 나. 저 + 는 = 저는 "tôi thì…"; 저 + 의 = 제 "của tôi".',
      'The humble, polite word for "I". With close friends use 나. 저 + 는 = 저는 "as for me"; 저 + 의 = 제 "my".',
      '谦虚、礼貌的“我”。跟好朋友用 나。저 + 는 = 저는“我（呢）”；저 + 의 = 제“我的”。',
    ),
    ex: ['저는 학생이에요.', 'Tôi là học sinh.', 'I am a student.', 'Jeoneun haksaengieyo.'],
  },
  {
    id: 'ireum', text: '이름', pron: 'ireum', vi: 'tên', en: 'name', type: 'noun', topic: 'people', level: LV,
    ex: ['이름이 뭐예요?', 'Bạn tên là gì?', "What's your name?", 'Ireumi mwoyeyo?'],
  },
  {
    id: 'haksaeng', text: '학생', pron: 'haksaeng', spoken: '[학쌩]', vi: 'học sinh, sinh viên', en: 'student', type: 'noun', topic: 'school', level: LV,
    notes: L('Hán Việt: học sinh (學生). Sau patchim ㄱ, ㅅ đọc căng: [학쌩].', 'Sino-Vietnamese: học sinh (學生). After batchim ㄱ, ㅅ becomes tense: [학쌩].', '汉字：学生。收音 ㄱ 后的 ㅅ 读成紧音：[학쌩]。'),
    ex: ['민수 씨는 학생이에요.', 'Minsu là sinh viên.', 'Minsu is a student.', 'Minsu ssineun haksaengieyo.'],
  },
  {
    id: 'seonsaengnim', text: '선생님', pron: 'seonsaengnim', vi: 'thầy giáo, cô giáo', en: 'teacher', type: 'noun', topic: 'school', level: LV,
    notes: L(
      '선생 (tiên sinh) + 님 (hậu tố kính trọng). Cũng dùng để gọi bác sĩ hay người lớn tuổi một cách lịch sự.',
      '선생 (Sino-Vietnamese "tiên sinh") + 님 (honorific suffix). Also used to address doctors or respected adults.',
      '선생（先生）+ 님（尊称后缀）。也用来礼貌地称呼医生或年长的人。',
    ),
    ex: ['김 선생님은 한국 사람이에요.', 'Thầy Kim là người Hàn Quốc.', 'Mr. Kim, the teacher, is Korean.', 'Gim seonsaengnimeun hanguk saramieyo.'],
  },
  {
    id: 'saram', text: '사람', pron: 'saram', vi: 'người', en: 'person', type: 'noun', topic: 'people', level: LV,
    notes: L('Tên nước + 사람 = người nước đó: 한국 사람 (người Hàn), 베트남 사람 (người Việt).', 'Country + 사람 = a person from that country: 한국 사람 (a Korean), 베트남 사람 (a Vietnamese).', '国名 + 사람 = 某国人：한국 사람（韩国人）、베트남 사람（越南人）。'),
    ex: ['저는 베트남 사람이에요.', 'Tôi là người Việt Nam.', "I'm Vietnamese.", 'Jeoneun beteunam saramieyo.'],
  },
  {
    id: 'hanguk', text: '한국', pron: 'hanguk', vi: 'Hàn Quốc', en: 'Korea', type: 'proper-noun', topic: 'countries', level: LV,
    notes: L('Hán Việt: Hàn Quốc (韓國). 한국어 = tiếng Hàn [한구거].', 'Sino-Vietnamese: Hàn Quốc (韓國). 한국어 = the Korean language [한구거].', '汉字：韩国。한국어 = 韩语 [한구거]。'),
    ex: ['여기는 한국이에요.', 'Đây là Hàn Quốc.', 'This is Korea.', 'Yeogineun hangugieyo.'],
  },
  {
    id: 'beteunam', text: '베트남', pron: 'beteunam', vi: 'Việt Nam', en: 'Vietnam', type: 'proper-noun', topic: 'countries', level: LV,
    notes: L('Phiên âm từ "Vietnam" trong tiếng Anh. 베트남어 = tiếng Việt [베트나머].', 'Borrowed from English "Vietnam". 베트남어 = Vietnamese (language) [베트나머].', '来自英语 Vietnam。베트남어 = 越南语 [베트나머]。'),
    ex: ['베트남 커피예요.', 'Đây là cà phê Việt Nam.', 'This is Vietnamese coffee.', 'Beteunam keopiyeyo.'],
  },
]);

const GRAMMAR: GrammarPoint[] = [
  {
    id: 'ko-g-ieyo',
    lessonId: 'ko-d4',
    title: L('N + 이에요 / 예요 ("là N")', 'N + 이에요 / 예요 ("to be N")', 'N + 이에요 / 예요（“是 N”）'),
    pattern: L(
      'Danh từ có patchim + 이에요 · Danh từ không patchim + 예요',
      'Noun ending in a consonant + 이에요 · Noun ending in a vowel + 예요',
      '有收音的名词 + 이에요 · 无收音的名词 + 예요',
    ),
    meaning: [
      L(
        'Tương đương "là" trong tiếng Việt, nhưng đứng CUỐI câu và dính liền vào danh từ: 학생이에요 = "là học sinh".',
        'Like "to be" (am/is/are), but it comes at the END of the sentence and attaches to the noun: 학생이에요 = "(I) am a student".',
        '相当于“是”，但放在句子末尾，直接接在名词后面：학생이에요 =“是学生”。',
      ),
      L(
        'Chọn theo âm cuối của danh từ: có patchim → 이에요 (학생이에요, 란이에요); không patchim → 예요 (마이예요, 커피예요).',
        'Choose by the last sound of the noun: consonant (batchim) → 이에요 (학생이에요, 란이에요); vowel → 예요 (마이예요, 커피예요).',
        '根据名词最后一个音选择：有收音 → 이에요（학생이에요、란이에요）；无收音 → 예요（마이예요、커피예요）。',
      ),
      L(
        'Đây là văn phong lịch sự hằng ngày (해요체). Muốn hỏi chỉ cần lên giọng: 학생이에요? Dạng trang trọng (합니다체) là 입니다 [임니다] / 입니까?',
        'This is the polite everyday style (해요체). To ask, just raise your pitch: 학생이에요? The formal style (합니다체) is 입니다 [임니다] / 입니까?',
        '这是日常礼貌语体（해요체）。疑问句只要用升调：학생이에요? 正式语体（합니다체）是 입니다 [임니다] / 입니까?',
      ),
      L(
        'Nhớ nối âm: 학생이에요 [학쌩이에요], 선생님이에요 [선생니미에요], 한국이에요 [한구기에요].',
        'Remember linking: 학생이에요 [학쌩이에요], 선생님이에요 [선생니미에요], 한국이에요 [한구기에요].',
        '注意连音：학생이에요 [학쌩이에요]，선생님이에요 [선생니미에요]，한국이에요 [한구기에요]。',
      ),
    ],
    breakdown: [
      [{ text: '저는', role: TOPIC }, { text: '학생', role: NOUN }, { text: '이에요', role: IEYO }],
      [{ text: '저는', role: TOPIC }, { text: '마이', role: NOUN }, { text: '예요', role: YEYO }],
    ],
    examples: [
      { text: '저는 선생님이에요.', pron: 'Jeoneun seonsaengnimieyo.', vi: 'Tôi là giáo viên.', en: 'I am a teacher.' },
      { text: '이름이 마이예요.', pron: 'Ireumi Maiyeyo.', vi: 'Tên tôi là Mai.', en: 'My name is Mai.' },
      { text: '한국 사람이에요?', pron: 'Hanguk saramieyo?', vi: 'Bạn là người Hàn Quốc à?', en: 'Are you Korean?' },
      { text: '우유예요.', pron: 'Uyuyeyo.', vi: 'Đây là sữa.', en: "It's milk." },
      { text: '저는 학생입니다.', pron: 'Jeoneun haksaengimnida.', vi: 'Tôi là học sinh. (trang trọng)', en: 'I am a student. (formal)' },
    ],
    mistakes: [
      { wrong: '학생예요.', right: '학생이에요.', why: L('학생 có patchim ㅇ → dùng 이에요.', '학생 ends in a consonant (ㅇ) → use 이에요.', '학생 有收音 ㅇ → 用 이에요。') },
      { wrong: '마이이에요.', right: '마이예요.', why: L('마이 kết thúc bằng nguyên âm → dùng 예요.', '마이 ends in a vowel → use 예요.', '마이 以元音结尾 → 用 예요。') },
      { wrong: '저는 이에요 학생.', right: '저는 학생이에요.', why: L('이에요/예요 luôn đứng cuối câu, dính sau danh từ.', '이에요/예요 always comes last, attached to the noun.', '이에요/예요 总是在句末，紧接在名词后面。') },
    ],
    exercises: [
      choice('ko-g-ieyo-1', 'grammar', L('Điền vào chỗ trống: 저는 학생 ____.', 'Fill in the blank: 저는 학생 ____.', '填空：저는 학생 ____。'), ['이에요', '예요'], 0,
        L('학생 có patchim → 이에요: 저는 학생이에요.', '학생 ends in a consonant → 이에요: 저는 학생이에요.', '학생 有收音 → 이에요：저는 학생이에요。'),
        { grammarId: 'ko-g-ieyo', targetOptions: true, wordIds: ['haksaeng'] }),
      choice('ko-g-ieyo-2', 'grammar', L('Điền vào chỗ trống: 커피 ____.', 'Fill in the blank: 커피 ____.', '填空：커피 ____。'), ['이에요', '예요'], 1,
        L('커피 kết thúc bằng nguyên âm ㅣ → 예요: 커피예요.', '커피 ends in the vowel ㅣ → 예요: 커피예요.', '커피 以元音 ㅣ 结尾 → 예요：커피예요。'),
        { grammarId: 'ko-g-ieyo', targetOptions: true }),
      arrange('ko-g-ieyo-3', G('Tôi là người Việt Nam.', 'I am Vietnamese.'), ['저는', '베트남', '사람이에요'],
        L('저는 (tôi) + 베트남 사람 (người Việt Nam) + 이에요 (là). Động từ "là" đứng cuối.', '저는 (I) + 베트남 사람 (Vietnamese person) + 이에요 (am). "To be" comes last.', '저는（我）+ 베트남 사람（越南人）+ 이에요（是）。“是”放在句末。'),
        ['jeo', 'beteunam', 'saram']),
    ].map((e) => ({ ...e, grammarId: 'ko-g-ieyo' })),
  },
  {
    id: 'ko-g-topic',
    lessonId: 'ko-d4',
    title: L('Trợ từ chủ đề 은 / 는', 'Topic particle 은 / 는', '话题助词 은 / 는'),
    pattern: L(
      'Danh từ có patchim + 은 · Danh từ không patchim + 는',
      'Noun ending in a consonant + 은 · Noun ending in a vowel + 는',
      '有收音的名词 + 은 · 无收音的名词 + 는',
    ),
    meaning: [
      L(
        'Đánh dấu chủ đề của câu — điều mình đang nói đến, giống "… thì" hoặc "còn …" trong tiếng Việt: 저는 학생이에요 = "Tôi (thì) là học sinh".',
        'Marks the topic of the sentence — what you are talking about, like "as for…": 저는 학생이에요 = "As for me, I am a student".',
        '标记句子的话题，即要谈论的对象，类似“……呢 / 至于……”：저는 학생이에요 =“我（呢）是学生”。',
      ),
      L(
        'Có patchim → 은 (선생님은, 한국은); không patchim → 는 (저는, 마이는).',
        'After a consonant → 은 (선생님은, 한국은); after a vowel → 는 (저는, 마이는).',
        '有收音 → 은（선생님은、한국은）；无收音 → 는（저는、마이는）。',
      ),
      L(
        '은/는 còn dùng để so sánh, đối chiếu: 저는 베트남 사람이에요. 민수 씨는 한국 사람이에요. Hỏi lại ngắn gọn: … 씨는요? ("Còn bạn thì sao?").',
        '은/는 also shows contrast: 저는 베트남 사람이에요. 민수 씨는 한국 사람이에요. Short follow-up question: … 씨는요? ("And you?").',
        '은/는 还表示对比：저는 베트남 사람이에요. 민수 씨는 한국 사람이에요。简短反问：…… 씨는요?（“你呢？”）。',
      ),
      L(
        '은 sau patchim được nối âm: 선생님은 [선생니믄], 이름은 [이르믄], 한국은 [한구근].',
        '은 after a batchim is linked: 선생님은 [선생니믄], 이름은 [이르믄], 한국은 [한구근].',
        '은 接在收音后要连读：선생님은 [선생니믄]，이름은 [이르믄]，한국은 [한구근]。',
      ),
    ],
    breakdown: [
      [{ text: '저는', role: TOPIC }, { text: '베트남 사람이에요', role: PRED }],
      [{ text: '제 이름은', role: TOPIC }, { text: '란이에요', role: PRED }],
    ],
    examples: [
      { text: '저는 마이예요.', pron: 'Jeoneun Maiyeyo.', vi: 'Tôi là Mai.', en: "I'm Mai." },
      { text: '선생님은 한국 사람이에요.', pron: 'Seonsaengnimeun hanguk saramieyo.', vi: 'Thầy/cô giáo là người Hàn Quốc.', en: 'The teacher is Korean.' },
      { text: '제 이름은 란이에요.', pron: 'Je ireumeun Ranieyo.', vi: 'Tên tôi là Lan.', en: 'My name is Lan.' },
      { text: '저는 학생이에요. 민수 씨는요?', pron: 'Jeoneun haksaengieyo. Minsu ssineunyo?', vi: 'Tôi là sinh viên. Còn anh Minsu?', en: "I'm a student. And you, Minsu?" },
    ],
    mistakes: [
      { wrong: '저은 마이예요.', right: '저는 마이예요.', why: L('저 kết thúc bằng nguyên âm → 는.', '저 ends in a vowel → 는.', '저 以元音结尾 → 는。') },
      { wrong: '선생님는 한국 사람이에요.', right: '선생님은 한국 사람이에요.', why: L('선생님 có patchim ㅁ → 은.', '선생님 ends in the consonant ㅁ → 은.', '선생님 有收音 ㅁ → 은。') },
      { wrong: '저는 마이 씨예요.', right: '저는 마이예요.', why: L('씨 là kính ngữ, không dùng sau tên của chính mình.', '씨 is a term of respect — never use it after your own name.', '씨 是敬称，不能用在自己的名字后面。') },
    ],
    exercises: [
      choice('ko-g-topic-1', 'grammar', L('Điền vào chỗ trống: 선생님 ____ 한국 사람이에요.', 'Fill in the blank: 선생님 ____ 한국 사람이에요.', '填空：선생님 ____ 한국 사람이에요。'), ['은', '는'], 0,
        L('선생님 có patchim ㅁ → 은.', '선생님 ends in ㅁ → 은.', '선생님 有收音 ㅁ → 은。'), { targetOptions: true, wordIds: ['seonsaengnim'] }),
      choice('ko-g-topic-2', 'grammar', L('Điền vào chỗ trống: 저 ____ 학생이에요.', 'Fill in the blank: 저 ____ 학생이에요.', '填空：저 ____ 학생이에요。'), ['은', '는'], 1,
        L('저 không có patchim → 는: 저는.', '저 ends in a vowel → 는: 저는.', '저 无收音 → 는：저는。'), { targetOptions: true, wordIds: ['jeo'] }),
      arrange('ko-g-topic-3', G('Tên tôi là Lan.', 'My name is Lan.'), ['제', '이름은', '란이에요'],
        L('제 (của tôi) + 이름은 (tên — chủ đề) + 란이에요 (là Lan).', '제 (my) + 이름은 (name — topic) + 란이에요 (is Lan).', '제（我的）+ 이름은（名字——话题）+ 란이에요（是兰）。'), ['ireum']),
    ].map((e) => ({ ...e, grammarId: 'ko-g-topic' })),
  },
];

export const D4: DayContent = {
  lesson: {
    id: 'ko-d4', day: 4, stage: 1, minutes: 25, prerequisites: ['ko-d3'],
    title: L('Chào hỏi & giới thiệu bản thân', 'Greetings & introductions', '问候与自我介绍'),
    subtitle: L(
      '안녕하세요 · 안녕히 가세요/계세요 · 저는 …이에요/예요 · 은/는',
      '안녕하세요 · 안녕히 가세요/계세요 · 저는 …이에요/예요 · 은/는',
      '안녕하세요 · 안녕히 가세요/계세요 · 저는 …이에요/예요 · 은/는',
    ),
    objectives: [
      L('Chào hỏi và chào tạm biệt đúng: ai đi, ai ở lại.', 'Say hello and goodbye correctly — depending on who leaves and who stays.', '正确地打招呼和告别：分清谁走谁留。'),
      L('Giới thiệu tên, quốc tịch, nghề nghiệp: 저는 … 이에요/예요.', 'Introduce your name, nationality and job: 저는 … 이에요/예요.', '介绍姓名、国籍和身份：저는 …… 이에요/예요。'),
      L('Dùng đúng 이에요/예요 và 은/는 theo patchim.', 'Choose 이에요/예요 and 은/는 correctly according to the batchim.', '根据收音正确选择 이에요/예요 和 은/는。'),
      L('Phân biệt văn phong lịch sự 해요체 và trang trọng 합니다체; biết kính ngữ cơ bản (님, 씨, 저).', 'Tell the polite 해요체 from the formal 합니다체, and know basic honorifics (님, 씨, 저).', '区分礼貌语体 해요체 和正式语体 합니다체，了解基本敬语（님、씨、저）。'),
    ],
    intro: [
      L(
        'Người Hàn rất coi trọng lễ phép khi gặp mặt: cúi chào nhẹ, dùng câu chào lịch sự và xưng hô khiêm tốn. Điều này khá giống tiếng Việt, nơi ta chọn "em/anh/chị" và thêm "ạ" để tỏ ra lễ phép.',
        'Koreans care a lot about politeness when meeting: a light bow, a polite greeting and humble self-reference. Vietnamese speakers will find this familiar — like choosing "em/anh/chị" and adding "ạ" in Vietnamese.',
        '韩国人见面时很重视礼貌：轻轻鞠躬，用礼貌的问候语，自称要谦虚。这和越南语选择“em/anh/chị”、句末加“ạ”很相似。',
      ),
      L(
        'Hôm nay bạn sẽ học cách chào, chào tạm biệt, và giới thiệu bản thân bằng hai mẫu ngữ pháp đầu tiên: 은/는 (chủ đề) và 이에요/예요 (là).',
        'Today you will learn to greet, say goodbye and introduce yourself with your first two grammar patterns: 은/는 (topic) and 이에요/예요 (to be).',
        '今天学习打招呼、告别，并用前两个语法点做自我介绍：은/는（话题）和 이에요/예요（是）。',
      ),
    ],
    sections: [
      {
        kind: 'text',
        title: L('Chào hỏi', 'Saying hello', '打招呼'),
        body: [
          L(
            '안녕하세요 (annyeonghaseyo) là câu chào dùng mọi lúc: sáng, trưa, tối, khi gặp và cả khi nghe điện thoại (여보세요 cũng dùng khi nghe máy). Không cần "chào buổi sáng" riêng.',
            '안녕하세요 (annyeonghaseyo) works at any time: morning, afternoon, evening. Korean has no separate everyday "good morning". (On the phone people say 여보세요 "hello?".)',
            '안녕하세요 任何时候都可以用：早上、中午、晚上都行，不需要单独说“早上好”。（接电话时说 여보세요。）',
          ),
          L(
            'Lần đầu gặp ai, nói thêm 처음 뵙겠습니다 (rất hân hạnh) và 만나서 반갑습니다 (rất vui được gặp bạn), kèm một cái cúi chào nhẹ.',
            'When meeting someone for the first time, add 처음 뵙겠습니다 (how do you do) and 만나서 반갑습니다 (nice to meet you), with a light bow.',
            '初次见面时，再加上“처음 뵙겠습니다”（初次见面）和“만나서 반갑습니다”（很高兴见到你），并轻轻鞠躬。',
          ),
          L(
            'Nhớ quy tắc biến âm mũi của Ngày 3: 반갑습니다 → [반갑씀니다], 뵙겠습니다 → [뵙껟씀니다].',
            'Remember Day 3 nasalization: 반갑습니다 → [반갑씀니다], 뵙겠습니다 → [뵙껟씀니다].',
            '别忘了第 3 天的鼻音化：반갑습니다 → [반갑씀니다]，뵙겠습니다 → [뵙껟씀니다]。',
          ),
        ],
      },
      {
        kind: 'text',
        title: L('Tạm biệt: ai đi, ai ở lại?', 'Goodbye: who leaves, who stays?', '告别：谁走，谁留？'),
        body: [
          L(
            '안녕히 가세요 = "Đi bình an nhé" → nói với người ĐANG ĐI. Ví dụ: khách ra về, bạn (chủ nhà) nói 안녕히 가세요.',
            '안녕히 가세요 = "Go in peace" → said to the person who is LEAVING. E.g. a guest leaves your home; you (the host) say 안녕히 가세요.',
            '안녕히 가세요 =“请慢走”→ 对离开的人说。例如客人要走，主人说 안녕히 가세요。',
          ),
          L(
            '안녕히 계세요 = "Ở lại bình an nhé" → nói với người Ở LẠI. Ví dụ: bạn rời lớp học, nói với thầy cô: 안녕히 계세요.',
            '안녕히 계세요 = "Stay in peace" → said to the person who is STAYING. E.g. you leave the classroom and say to your teacher: 안녕히 계세요.',
            '안녕히 계세요 =“请留步、您保重”→ 对留下的人说。例如你离开教室时对老师说 안녕히 계세요。',
          ),
          L(
            'Nếu cả hai cùng đi (chia tay ngoài đường), cả hai đều nói 안녕히 가세요. Bạn bè thân: 안녕! hoặc 잘 가!',
            'If both people are leaving (parting on the street), both say 안녕히 가세요. Close friends just say 안녕! or 잘 가!',
            '如果两个人都要走（在路上分别），双方都说 안녕히 가세요。好朋友之间说 안녕! 或 잘 가!',
          ),
        ],
      },
      { kind: 'words', title: L('Câu chào', 'Greetings', '问候语'), wordIds: GREET_IDS },
      {
        kind: 'text',
        title: L('Lịch sự (해요체) và trang trọng (합니다체) · Kính ngữ', 'Polite (해요체) vs formal (합니다체) · Honorifics', '礼貌语体（해요체）与正式语体（합니다체）· 敬语'),
        body: [
          L(
            'Đuôi câu tiếng Hàn thay đổi theo mức độ lịch sự. Người mới học nên dùng 해요체 (kết thúc bằng -요): lịch sự, thân thiện, dùng hằng ngày với người lạ, đồng nghiệp, người lớn hơn.',
            'Korean sentence endings change with the level of politeness. Beginners should use 해요체 (ending in -요): polite and friendly, used every day with strangers, colleagues and older people.',
            '韩语的句尾随礼貌程度而变化。初学者应该用 해요체（以 -요 结尾）：礼貌又亲切，日常对陌生人、同事、长辈都可以用。',
          ),
          L(
            '합니다체 (kết thúc bằng -ㅂ니다/-습니다) trang trọng hơn: dùng khi phát biểu, phỏng vấn, tin tức, trong quân đội, khi phục vụ khách, và trong vài câu cố định như 감사합니다, 처음 뵙겠습니다.',
            '합니다체 (ending in -ㅂ니다/-습니다) is more formal: speeches, interviews, the news, the army, customer service, and set phrases like 감사합니다 and 처음 뵙겠습니다.',
            '합니다체（以 -ㅂ니다/-습니다 结尾）更正式：用于演讲、面试、新闻、军队、服务行业，以及“감사합니다”“처음 뵙겠습니다”等固定说法。',
          ),
          L(
            'So sánh: 저는 학생이에요 (lịch sự) = 저는 학생입니다 [학쌩임니다] (trang trọng). 반가워요 = 반갑습니다.',
            'Compare: 저는 학생이에요 (polite) = 저는 학생입니다 [학쌩임니다] (formal). 반가워요 = 반갑습니다.',
            '比较：저는 학생이에요（礼貌）= 저는 학생입니다 [학쌩임니다]（正式）。반가워요 = 반갑습니다。',
          ),
          L(
            'Kính ngữ: 님 nâng người khác lên (선생님 "thầy/cô"); 씨 đặt sau tên người khác (민수 씨) nhưng không bao giờ sau tên mình; -세요 trong 안녕하세요, 가세요 là đuôi kính trọng; 저 là "tôi" khiêm tốn (bạn thân dùng 나).',
            'Honorifics: 님 raises the other person (선생님 "teacher"); 씨 goes after someone else\'s name (민수 씨) but never after your own; -세요 in 안녕하세요, 가세요 is an honorific ending; 저 is the humble "I" (friends use 나).',
            '敬语：님 表示尊敬（선생님“老师”）；씨 放在别人名字后面（민수 씨），绝不能用在自己名字后；안녕하세요、가세요 中的 -세요 是尊敬语尾；저 是谦虚的“我”（朋友之间用 나）。',
          ),
        ],
      },
      { kind: 'grammar', grammarId: 'ko-g-topic' },
      { kind: 'grammar', grammarId: 'ko-g-ieyo' },
      { kind: 'words', title: L('Người và đất nước', 'People and countries', '人和国家'), wordIds: PEOPLE_IDS },
      {
        kind: 'examples',
        title: L('Hội thoại: lần đầu gặp mặt', 'Dialogue: meeting for the first time', '对话：初次见面'),
        examples: [
          { text: '안녕하세요? 처음 뵙겠습니다.', pron: 'Annyeonghaseyo? Cheoeum boepgetseumnida.', vi: 'Xin chào. Rất hân hạnh được gặp.', en: 'Hello. How do you do?' },
          { text: '안녕하세요. 저는 김민수예요. 이름이 뭐예요?', pron: 'Annyeonghaseyo. Jeoneun Gim Minsuyeyo. Ireumi mwoyeyo?', vi: 'Xin chào. Tôi là Kim Minsu. Bạn tên là gì?', en: "Hello. I'm Kim Minsu. What's your name?" },
          { text: '제 이름은 응우옌 란이에요. 베트남 사람이에요.', pron: 'Je ireumeun Eunguyen Ranieyo. Beteunam saramieyo.', vi: 'Tên tôi là Nguyễn Lan. Tôi là người Việt Nam.', en: "My name is Nguyen Lan. I'm from Vietnam." },
          { text: '아, 학생이에요?', pron: 'A, haksaengieyo?', vi: 'À, bạn là sinh viên à?', en: 'Oh, are you a student?' },
          { text: '네, 학생이에요. 민수 씨는요?', pron: 'Ne, haksaengieyo. Minsu ssineunyo?', vi: 'Vâng, tôi là sinh viên. Còn anh Minsu?', en: 'Yes, I am. And you, Minsu?' },
          { text: '저는 선생님이에요. 만나서 반갑습니다.', pron: 'Jeoneun seonsaengnimieyo. Mannaseo bangapseumnida.', vi: 'Tôi là giáo viên. Rất vui được gặp bạn.', en: "I'm a teacher. Nice to meet you." },
        ],
      },
      {
        kind: 'speak',
        title: L('Luyện nói: giới thiệu bản thân', 'Speaking: introduce yourself', '口语：自我介绍'),
        intro: L('Đọc to từng câu, rồi thay bằng tên của bạn.', 'Read each line aloud, then try it with your own name.', '大声读每一句，然后换成你自己的名字。'),
        items: [
          { text: '안녕하세요', pron: 'annyeonghaseyo', vi: 'Xin chào', en: 'Hello' },
          { text: '처음 뵙겠습니다', pron: 'cheoeum boepgetseumnida', vi: 'Rất hân hạnh', en: 'How do you do?' },
          { text: '저는 마이예요', pron: 'jeoneun Maiyeyo', vi: 'Tôi là Mai', en: "I'm Mai" },
          { text: '저는 베트남 사람이에요', pron: 'jeoneun beteunam saramieyo', vi: 'Tôi là người Việt Nam', en: "I'm Vietnamese" },
          { text: '만나서 반갑습니다', pron: 'mannaseo bangapseumnida', vi: 'Rất vui được gặp bạn', en: 'Nice to meet you' },
          { text: '안녕히 계세요', pron: 'annyeonghi gyeseyo', vi: 'Tạm biệt (tôi đi đây)', en: "Goodbye (I'm leaving)" },
        ],
      },
      {
        kind: 'tip',
        title: L('Mẹo: tên tiếng Việt bằng Hangul', 'Tip: Vietnamese names in Hangul', '小贴士：用韩文写越南名字'),
        body: L(
          'Tên Việt được phiên âm theo cách đọc: Lan → 란, Mai → 마이, Hà → 하, Linh → 린, Nguyễn → 응우옌. Tên kết thúc bằng patchim dùng 이에요 (란이에요), tên kết thúc bằng nguyên âm dùng 예요 (마이예요). Khi hỏi tên người lớn, người Hàn lịch sự hơn bằng câu 성함이 어떻게 되세요?',
          'Vietnamese names are written by sound: Lan → 란, Mai → 마이, Hà → 하, Linh → 린, Nguyễn → 응우옌. A name ending in a consonant takes 이에요 (란이에요), one ending in a vowel takes 예요 (마이예요). With older people, Koreans ask more politely: 성함이 어떻게 되세요?',
          '越南名字按读音转写：Lan → 란，Mai → 마이，Hà → 하，Linh → 린，Nguyễn → 응우옌。以收音结尾的名字用 이에요（란이에요），以元音结尾的用 예요（마이예요）。问长辈的名字时，更礼貌的说法是“성함이 어떻게 되세요?”。',
        ),
      },
    ],
    wordIds: [...GREET_IDS, ...PEOPLE_IDS],
    grammarIds: ['ko-g-ieyo', 'ko-g-topic'],
    practice: [
      listen('ko-d4-p1', '안녕하세요', [G('Tạm biệt', 'Goodbye'), G('Xin chào', 'Hello'), G('Cảm ơn', 'Thank you'), G('Xin lỗi', 'Sorry')], 1,
        { seq: ['안녕하세요 = ', G('xin chào', 'hello'), '.'] }, { wordIds: ['annyeonghaseyo'] }),
      choice('ko-d4-p2', 'vocabulary', L('Bạn rời lớp học, thầy giáo vẫn ở lại. Bạn nói gì?', 'You leave the classroom; your teacher stays. What do you say?', '你离开教室，老师留在教室里。你说什么？'),
        ['안녕히 계세요', '안녕히 가세요', '안녕하세요', '처음 뵙겠습니다'], 0,
        L('Bạn là người đi → nói với người ở lại: 안녕히 계세요 ("ở lại bình an").', 'You are the one leaving → say to the one staying: 안녕히 계세요 ("stay in peace").', '你是离开的人 → 对留下的人说：안녕히 계세요。'),
        { targetOptions: true, wordIds: ['annyeonghi-gyeseyo'] }),
      choice('ko-d4-p3', 'grammar', L('Điền vào chỗ trống: 저는 학생 ____.', 'Fill in the blank: 저는 학생 ____.', '填空：저는 학생 ____。'), ['예요', '이에요'], 1,
        L('학생 có patchim ㅇ → 이에요.', '학생 ends in a consonant (ㅇ) → 이에요.', '학생 有收音 ㅇ → 이에요。'),
        { grammarId: 'ko-g-ieyo', targetOptions: true, wordIds: ['haksaeng'] }),
      choice('ko-d4-p4', 'grammar', L('Điền vào chỗ trống: 저 ____ 마이예요.', 'Fill in the blank: 저 ____ 마이예요.', '填空：저 ____ 마이예요。'), ['은', '는'], 1,
        L('저 không có patchim → 는: 저는 마이예요.', '저 ends in a vowel → 는: 저는 마이예요.', '저 无收音 → 는：저는 마이예요。'),
        { grammarId: 'ko-g-topic', targetOptions: true, wordIds: ['jeo'] }),
      { id: 'ko-d4-p5', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: '학생', pron: 'haksaeng', vi: 'học sinh, sinh viên', en: 'student' },
        { text: '선생님', pron: 'seonsaengnim', vi: 'thầy giáo, cô giáo', en: 'teacher' },
        { text: '사람', pron: 'saram', vi: 'người', en: 'person' },
        { text: '이름', pron: 'ireum', vi: 'tên', en: 'name' },
      ], explanation: { seq: [
        '학생 = ', G('học sinh', 'student'), ' · 선생님 = ', G('giáo viên', 'teacher'),
        ' · 사람 = ', G('người', 'person'), ' · 이름 = ', G('tên', 'name'), '.',
      ] }, wordIds: ['haksaeng', 'seonsaengnim', 'saram', 'ireum'] },
      arrange('ko-d4-p6', G('Tôi là người Việt Nam.', "I'm Vietnamese."), ['저는', '베트남', '사람이에요'],
        L('Chủ đề 저는 đứng đầu, 이에요 ("là") đứng cuối: 저는 베트남 사람이에요.', 'Topic 저는 first, 이에요 ("am") last: 저는 베트남 사람이에요.', '话题 저는 在前，이에요（是）在最后：저는 베트남 사람이에요。'),
        ['jeo', 'beteunam', 'saram']),
      typeIt('ko-d4-p7', 'hangul', { k: 'ex.write.hangul', p: { meaning: G('Hàn Quốc', 'Korea') } }, ['한국'],
        L('Hàn Quốc = 한국 (ㅎ+ㅏ+ㄴ, ㄱ+ㅜ+ㄱ).', 'Korea = 한국 (ㅎ+ㅏ+ㄴ, ㄱ+ㅜ+ㄱ).', '韩国 = 한국（ㅎ+ㅏ+ㄴ，ㄱ+ㅜ+ㄱ）。'),
        { audio: '한국', wordIds: ['hanguk'] }),
    ],
    quiz: [
      listen('ko-d4-q1', '만나서 반갑습니다', [G('Rất vui được gặp bạn', 'Nice to meet you'), G('Xin lỗi', 'Sorry'), G('Tạm biệt', 'Goodbye'), G('Bạn tên là gì?', "What's your name?")], 0,
        { seq: ['만나서 반갑습니다 [반갑씀니다] = ', G('rất vui được gặp bạn', 'nice to meet you'), '.'] }, { wordIds: ['mannaseo-bangapseumnida'] }),
      choice('ko-d4-q2', 'vocabulary', L('Khách ra về, bạn (chủ nhà) ở lại. Bạn nói gì với khách?', 'A guest is leaving your home; you stay. What do you say to the guest?', '客人要离开，你（主人）留在家里。你对客人说什么？'),
        ['안녕히 계세요', '안녕히 가세요', '만나서 반갑습니다', '감사합니다'], 1,
        L('Khách là người đi → 안녕히 가세요 ("đi bình an").', 'The guest is the one leaving → 안녕히 가세요 ("go in peace").', '客人是离开的人 → 안녕히 가세요。'),
        { targetOptions: true, wordIds: ['annyeonghi-gaseyo'] }),
      choice('ko-d4-q3', 'grammar', L('Điền vào chỗ trống: 이름이 마이 ____.', 'Fill in the blank: 이름이 마이 ____.', '填空：이름이 마이 ____。'), ['이에요', '예요'], 1,
        L('마이 kết thúc bằng nguyên âm → 예요: 마이예요.', '마이 ends in a vowel → 예요: 마이예요.', '마이 以元音结尾 → 예요：마이예요。'),
        { grammarId: 'ko-g-ieyo', targetOptions: true }),
      choice('ko-d4-q4', 'grammar', L('Điền vào chỗ trống: 선생님 ____ 한국 사람이에요.', 'Fill in the blank: 선생님 ____ 한국 사람이에요.', '填空：선생님 ____ 한국 사람이에요。'), ['은', '는'], 0,
        L('선생님 có patchim ㅁ → 은 (đọc [선생니믄]).', '선생님 ends in ㅁ → 은 (said [선생니믄]).', '선생님 有收音 ㅁ → 은（读作 [선생니믄]）。'),
        { grammarId: 'ko-g-topic', targetOptions: true, wordIds: ['seonsaengnim'] }),
      choice('ko-d4-q5', 'grammar', L('Cách nói trang trọng (합니다체) của 저는 학생이에요 là gì?', 'What is the formal (합니다체) version of 저는 학생이에요?', '저는 학생이에요 的正式语体（합니다체）是什么？'),
        ['저는 학생입니다.', '저는 학생이요.', '저는 학생예요.', '저는 학생이세요.'], 0,
        L('합니다체: N + 입니다 [임니다]. 학생예요 sai vì 학생 có patchim; 이세요 là kính ngữ cho người khác.', '합니다체: N + 입니다 [임니다]. 학생예요 is wrong (학생 ends in a consonant); 이세요 is an honorific for other people.', '합니다체：N + 입니다 [임니다]。학생예요 错（학생 有收音）；이세요 是对别人的尊敬说法。'),
        { targetOptions: true, wordIds: ['haksaeng'] }),
      arrange('ko-d4-q6', G('Tên tôi là Lan.', 'My name is Lan.'), ['제', '이름은', '란이에요'],
        L('제 (của tôi) + 이름은 (tên) + 란이에요 (là Lan — 란 có patchim → 이에요).', '제 (my) + 이름은 (name) + 란이에요 (is Lan — 란 ends in a consonant → 이에요).', '제（我的）+ 이름은（名字）+ 란이에요（是兰——란 有收音 → 이에요）。'),
        ['ireum']),
      typeIt('ko-d4-q7', 'hangul', { k: 'ex.write.hangul', p: { meaning: G('người', 'person') } }, ['사람'],
        L('Người = 사람 (saram). 한국 사람 = người Hàn.', 'Person = 사람 (saram). 한국 사람 = a Korean.', '人 = 사람（saram）。한국 사람 = 韩国人。'),
        { audio: '사람', wordIds: ['saram'] }),
      choice('ko-d4-q8', 'grammar', WHICH_CORRECT, ['저는 마이 씨예요.', '저은 마이예요.', '저는 마이예요.', '저는 마이이에요.'], 2,
        L('저 + 는; 마이 (nguyên âm) + 예요; không dùng 씨 sau tên mình.', '저 + 는; 마이 (vowel) + 예요; never 씨 after your own name.', '저 + 는；마이（元音）+ 예요；自己名字后不加 씨。'),
        { targetOptions: true, wordIds: ['jeo'] }),
      choice('ko-d4-q9', 'pronunciation', L('반갑습니다 thực tế được đọc thế nào?', 'How is 반갑습니다 really pronounced?', '반갑습니다 实际怎么读？'),
        ['[반갑습니다]', '[반갑씀니다]', '[반가씀니다]', '[반감습니다]'], 1,
        L('ㅅ sau patchim ㅂ đọc căng [ㅆ]; ㅂ của 습 trước ㄴ → ㅁ: [반갑씀니다].', 'ㅅ after batchim ㅂ becomes tense [ㅆ]; the ㅂ of 습 before ㄴ → ㅁ: [반갑씀니다].', '收音 ㅂ 后的 ㅅ 读紧音 [ㅆ]；습 的 ㅂ 在 ㄴ 前 → ㅁ：[반갑씀니다]。'),
        { text: '반갑습니다', audio: '반갑습니다', targetOptions: true, wordIds: ['mannaseo-bangapseumnida'] }),
    ],
    summary: [
      L('안녕하세요 = xin chào (mọi lúc). Lần đầu gặp: 처음 뵙겠습니다, 만나서 반갑습니다.', '안녕하세요 = hello (any time). First meeting: 처음 뵙겠습니다, 만나서 반갑습니다.', '안녕하세요 = 你好（任何时候）。初次见面：처음 뵙겠습니다、만나서 반갑습니다。'),
      L('Nói với người đi: 안녕히 가세요. Nói với người ở lại: 안녕히 계세요.', 'To the one leaving: 안녕히 가세요. To the one staying: 안녕히 계세요.', '对离开的人：안녕히 가세요。对留下的人：안녕히 계세요。'),
      L('Có patchim: 은 / 이에요. Không patchim: 는 / 예요. 저는 학생이에요 · 저는 마이예요.', 'After a consonant: 은 / 이에요. After a vowel: 는 / 예요. 저는 학생이에요 · 저는 마이예요.', '有收音：은 / 이에요。无收音：는 / 예요。저는 학생이에요 · 저는 마이예요。'),
      L('해요체 (-요) lịch sự hằng ngày; 합니다체 (-ㅂ니다) trang trọng. Kính ngữ: 님, 씨 (không dùng cho mình), 저.', '해요체 (-요) is everyday polite; 합니다체 (-ㅂ니다) is formal. Honorifics: 님, 씨 (never for yourself), 저.', '해요체（-요）是日常礼貌语体；합니다체（-ㅂ니다）是正式语体。敬语：님、씨（不用于自己）、저。'),
    ],
  },
  words,
  grammar: GRAMMAR,
};
