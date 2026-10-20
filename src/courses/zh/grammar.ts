import type { Gloss, GrammarPoint, LText } from '../../types';

const L = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });
const G = (vi: string, en: string): Gloss => ({ vi, en });

// Common breakdown roles
const SUBJ = L('Chủ ngữ', 'Subject', '主语');
const ADV = L('Phó từ', 'Adverb', '副词');
const ADJ = L('Tính từ', 'Adjective', '形容词');
const PRON = L('Đại từ', 'Pronoun', '代词');
const NOUN = L('Danh từ', 'Noun', '名词');
const VERB = L('Động từ', 'Verb', '动词');
const VERB_SHI = L('Động từ "là"', 'Verb "to be"', '动词“是”');
const NEG = L('Phủ định', 'Negation', '否定');

const WHICH_CORRECT = L('Câu nào đúng?', 'Which sentence is correct?', '哪个句子是正确的？');

export const GRAMMAR: GrammarPoint[] = [
  {
    id: 'g-hen',
    lessonId: 'd5',
    title: L('Chủ ngữ + 很 + Tính từ', 'Subject + 很 + Adjective', '主语 + 很 + 形容词'),
    pattern: L('Chủ ngữ + 很 + Tính từ', 'Subject + 很 + Adjective', '主语 + 很 + 形容词'),
    meaning: [
      L(
        'Dùng để miêu tả tính chất, trạng thái của người hoặc vật: "Ai/cái gì (rất) …".',
        'Used to describe a quality or state of a person or thing: "Someone/something is (very) …".',
        '用来描述人或事物的性质、状态：“某人/某物（很）……”。',
      ),
      L(
        '很 nghĩa gốc là "rất", nhưng trong câu khẳng định đơn giản nó gần như bắt buộc và nghĩa "rất" bị nhẹ đi. 我很好 thường chỉ có nghĩa "Tôi khỏe".',
        '很 literally means "very", but in a simple affirmative sentence it is almost required and the "very" meaning fades. 我很好 usually just means "I\'m fine".',
        '很的本义是“非常”，但在简单的肯定句中几乎是必需的，“非常”的意思会减弱。我很好通常只是“我挺好的”的意思。',
      ),
      L(
        'KHÔNG dùng 是 để nối chủ ngữ với tính từ.',
        'Do NOT use 是 to link the subject to an adjective.',
        '不要用“是”连接主语和形容词。',
      ),
    ],
    breakdown: [
      [ { text: '我', role: SUBJ }, { text: '很', role: ADV }, { text: '好', role: ADJ } ],
      [ { text: '中国', role: SUBJ }, { text: '很', role: ADV }, { text: '大', role: ADJ } ],
    ],
    examples: [
      { text: '我很好。', pron: 'Wǒ hěn hǎo.', vi: 'Tôi khỏe.', en: "I'm fine." },
      { text: '爸爸很好。', pron: 'Bàba hěn hǎo.', vi: 'Bố khỏe.', en: 'Dad is fine.' },
      { text: '中国很大。', pron: 'Zhōngguó hěn dà.', vi: 'Trung Quốc rất rộng lớn.', en: 'China is very big.' },
      { text: '我们很好。', pron: 'Wǒmen hěn hǎo.', vi: 'Chúng tôi khỏe.', en: "We're fine." },
    ],
    mistakes: [
      {
        wrong: '我是好。',
        right: '我很好。',
        why: L('Không dùng 是 trước tính từ. Dùng 很 + tính từ.', "Don't use 是 before an adjective. Use 很 + adjective.", '形容词前不用“是”，要用“很 + 形容词”。'),
      },
      {
        wrong: '我好很。',
        right: '我很好。',
        why: L('很 phải đứng TRƯỚC tính từ.', '很 must come BEFORE the adjective.', '“很”必须放在形容词前面。'),
      },
    ],
    exercises: [
      {
        id: 'g-hen-1', kind: 'arrange', skill: 'grammar', grammarId: 'g-hen',
        prompt: { k: 'ex.arrange', p: { meaning: G('Bố rất khỏe.', 'Dad is very well.') } },
        tokens: ['爸爸', '很', '好'], answers: ['爸爸很好'],
        explanation: L('Chủ ngữ (爸爸) + 很 + tính từ (好).', 'Subject (爸爸) + 很 + adjective (好).', '主语（爸爸）+ 很 + 形容词（好）。'),
        wordIds: ['baba', 'hen', 'hao'],
      },
      {
        id: 'g-hen-2', kind: 'choice', skill: 'grammar', grammarId: 'g-hen',
        prompt: WHICH_CORRECT,
        options: ['我很好。', '我是好。', '我好很。', '很我好。'], answer: 0, targetOptions: true,
        explanation: L(
          'Mẫu câu: Chủ ngữ + 很 + Tính từ. Không dùng 是 trước tính từ.',
          'Pattern: Subject + 很 + Adjective. Don\'t use 是 before an adjective.',
          '句型：主语 + 很 + 形容词。形容词前不用“是”。',
        ),
      },
      {
        id: 'g-hen-3', kind: 'arrange', skill: 'grammar', grammarId: 'g-hen',
        prompt: { k: 'ex.arrange', p: { meaning: G('Họ khỏe.', 'They are fine.') } },
        tokens: ['他们', '很', '好'], answers: ['他们很好'],
        explanation: { seq: ['他们 (', G('họ', 'they'), ') + 很 + 好.'] },
        wordIds: ['tamen'],
      },
    ],
  },
  {
    id: 'g-men',
    lessonId: 'd5',
    title: L('Đại từ + 们 (số nhiều)', 'Pronoun + 们 (plural)', '代词 + 们（复数）'),
    pattern: L('我 / 你 / 他 / 她 + 们', '我 / 你 / 他 / 她 + 们', '我 / 你 / 他 / 她 + 们'),
    meaning: [
      L(
        'Thêm 们 men (thanh nhẹ) sau đại từ nhân xưng để chỉ số nhiều.',
        'Add 们 men (neutral tone) after a personal pronoun to make it plural.',
        '在人称代词后加“们”（men，轻声）表示复数。',
      ),
      L(
        '我们: chúng tôi / chúng ta · 你们: các bạn · 他们: họ (nam hoặc nhóm có cả nam và nữ) · 她们: họ (toàn nữ).',
        '我们: we · 你们: you (plural) · 他们: they (men, or a mixed group) · 她们: they (all women).',
        '我们：第一人称复数 · 你们：第二人称复数 · 他们：第三人称复数（男性或男女混合）· 她们：第三人称复数（全是女性）。',
      ),
      L(
        'Động từ và tính từ không thay đổi theo số ít/số nhiều.',
        'Verbs and adjectives do not change for singular or plural.',
        '动词和形容词不随单复数变化。',
      ),
    ],
    breakdown: [
      [ { text: '我', role: PRON }, { text: '们', role: L('Số nhiều', 'Plural', '表示复数') } ],
      [ { text: '你们', role: SUBJ }, { text: '好', role: ADJ } ],
    ],
    examples: [
      { text: '我们很好。', pron: 'Wǒmen hěn hǎo.', vi: 'Chúng tôi khỏe.', en: "We're fine." },
      { text: '你们好！', pron: 'Nǐmen hǎo!', vi: 'Chào các bạn!', en: 'Hello, everyone!' },
      { text: '他们是学生。', pron: 'Tāmen shì xuésheng.', vi: 'Họ là học sinh.', en: 'They are students.' },
    ],
    mistakes: [
      {
        wrong: '我们是学生们。',
        right: '我们是学生。',
        why: L(
          'Chủ ngữ đã là số nhiều; danh từ phía sau thường không cần thêm 们.',
          'The subject is already plural; the noun after it usually doesn\'t need 们.',
          '主语已经是复数，后面的名词一般不需要再加“们”。',
        ),
      },
      {
        wrong: '您们好！',
        right: '你们好！',
        why: L(
          '您们 hầu như không dùng trong khẩu ngữ. Chào nhiều người dùng 你们好.',
          '您们 is hardly ever used in speech. To greet several people, say 你们好.',
          '口语中几乎不说“您们”。向多人问好用“你们好”。',
        ),
      },
    ],
    exercises: [
      {
        id: 'g-men-1', kind: 'choice', skill: 'grammar', grammarId: 'g-men',
        prompt: { seq: ['"', G('Chúng tôi', 'We'), '" ', L('trong tiếng Trung là:', 'in Chinese is:', '用汉语怎么说？')] },
        options: ['我们', '你们', '他们', '我'], answer: 0, targetOptions: true,
        explanation: L(
          '我 (tôi) + 们 (số nhiều) = 我们 (chúng tôi).',
          '我 (I) + 们 (plural) = 我们 (we).',
          '我 + 们（表示复数）= 我们。',
        ),
        wordIds: ['women'],
      },
      {
        id: 'g-men-2', kind: 'choice', skill: 'grammar', grammarId: 'g-men',
        prompt: L(
          'Bạn bước vào lớp và chào cả lớp. Bạn nói:',
          'You walk into class and greet everyone. You say:',
          '你走进教室，向全班同学问好。你说：',
        ),
        options: ['你们好！', '您好！', '我们好！', '他好！'], answer: 0, targetOptions: true,
        explanation: { seq: [L('Chào nhiều người:', 'Greeting several people:', '向多人问好：'), ' 你们好！ (', G('Chào các bạn!', 'Hello, everyone!'), ')'] },
        wordIds: ['nimen'],
      },
    ],
  },
  {
    id: 'g-shi',
    lessonId: 'd6',
    title: L('A 是 B (A là B)', 'A 是 B (A is B)', 'A 是 B'),
    pattern: L('Chủ ngữ + 是 + Danh từ', 'Subject + 是 + Noun', '主语 + 是 + 名词'),
    meaning: [
      L(
        '是 shì nghĩa là "là", dùng để nối hai danh từ / đại từ: giới thiệu danh tính, nghề nghiệp, quốc tịch.',
        '是 shì means "to be". It links two nouns / pronouns: to state identity, occupation or nationality.',
        '“是”（shì）用来连接两个名词或代词，说明身份、职业、国籍。',
      ),
      L(
        'Trật tự giống tiếng Việt: 我是学生 = Tôi là học sinh.',
        'Same word order as English: 我是学生 = I am a student.',
        '语序和越南语一样：我是学生 = Tôi là học sinh。',
      ),
      L(
        '是 không dùng trước tính từ (không nói 我是好).',
        '是 is not used before adjectives (don\'t say 我是好).',
        '形容词前不用“是”（不说“我是好”）。',
      ),
    ],
    breakdown: [
      [ { text: '我', role: SUBJ }, { text: '是', role: VERB_SHI }, { text: '学生', role: NOUN } ],
      [ { text: '这', role: SUBJ }, { text: '是', role: VERB_SHI }, { text: '我妈妈', role: NOUN } ],
    ],
    examples: [
      { text: '我是学生。', pron: 'Wǒ shì xuésheng.', vi: 'Tôi là học sinh.', en: 'I am a student.' },
      { text: '她是老师。', pron: 'Tā shì lǎoshī.', vi: 'Cô ấy là giáo viên.', en: 'She is a teacher.' },
      { text: '他是中国人。', pron: 'Tā shì Zhōngguó rén.', vi: 'Anh ấy là người Trung Quốc.', en: 'He is Chinese.' },
      { text: '这是我妈妈。', pron: 'Zhè shì wǒ māma.', vi: 'Đây là mẹ tôi.', en: 'This is my mom.' },
    ],
    mistakes: [
      {
        wrong: '我学生。',
        right: '我是学生。',
        why: L(
          'Khi nói ai là gì (nghề nghiệp, danh tính), cần 是 để nối hai danh từ.',
          'To say who or what someone is (occupation, identity), you need 是 to link the two nouns.',
          '说明某人是什么（职业、身份）时，需要用“是”连接两个名词。',
        ),
      },
      {
        wrong: '我是很好。',
        right: '我很好。',
        why: L('Với tính từ thì dùng 很, không dùng 是.', 'With adjectives use 很, not 是.', '形容词前用“很”，不用“是”。'),
      },
    ],
    exercises: [
      {
        id: 'g-shi-1', kind: 'arrange', skill: 'grammar', grammarId: 'g-shi',
        prompt: { k: 'ex.arrange', p: { meaning: G('Anh ấy là người Trung Quốc.', 'He is Chinese.') } },
        tokens: ['他', '是', '中国人'], answers: ['他是中国人'],
        explanation: L('Chủ ngữ (他) + 是 + danh từ (中国人).', 'Subject (他) + 是 + noun (中国人).', '主语（他）+ 是 + 名词（中国人）。'),
        wordIds: ['shi', 'zhongguoren'],
      },
      {
        id: 'g-shi-2', kind: 'choice', skill: 'grammar', grammarId: 'g-shi',
        prompt: WHICH_CORRECT,
        options: ['我是老师。', '我老师是。', '是我老师。', '我是很老师。'], answer: 0, targetOptions: true,
        explanation: L('Mẫu câu: Chủ ngữ + 是 + Danh từ.', 'Pattern: Subject + 是 + Noun.', '句型：主语 + 是 + 名词。'),
        wordIds: ['laoshi'],
      },
      {
        id: 'g-shi-3', kind: 'type', mode: 'hanzi', skill: 'writing', grammarId: 'g-shi',
        prompt: { seq: [L('Gõ bằng chữ Hán:', 'Type in Chinese characters:', '用汉字输入：'), ' "', G('Tôi là học sinh.', 'I am a student.'), '"'] },
        accepted: ['我是学生'],
        explanation: { seq: ['我 (', G('tôi', 'I'), ') + 是 (', G('là', 'am'), ') + 学生 (', G('học sinh', 'student'), ').'] },
        wordIds: ['wo', 'shi', 'xuesheng'],
      },
    ],
  },
  {
    id: 'g-bu',
    lessonId: 'd6',
    title: L('Phủ định với 不', 'Negation with 不', '用“不”表示否定'),
    pattern: L('Chủ ngữ + 不 + Động từ / Tính từ', 'Subject + 不 + Verb / Adjective', '主语 + 不 + 动词 / 形容词'),
    meaning: [
      L(
        '不 bù đặt TRƯỚC động từ hoặc tính từ để phủ định: 不是 (không phải là), 不喝 (không uống).',
        '不 bù goes BEFORE a verb or adjective to negate it: 不是 (is not), 不喝 (don\'t drink).',
        '“不”（bù）放在动词或形容词前面表示否定：不是、不喝。',
      ),
      L(
        'Biến điệu: trước âm tiết thanh 4, 不 đọc thành thanh 2: 不是 bú shì, 不对 bú duì.',
        'Tone change: before a 4th-tone syllable, 不 is read with the 2nd tone: 不是 bú shì, 不对 bú duì.',
        '变调：在第四声音节前，“不”读第二声：不是 bú shì，不对 bú duì。',
      ),
      L(
        'Trước thanh 1, 2, 3, 不 vẫn đọc bù: 不喝 bù hē, 不好 bù hǎo.',
        'Before tones 1, 2 and 3, 不 stays bù: 不喝 bù hē, 不好 bù hǎo.',
        '在第一、二、三声前，“不”仍读 bù：不喝 bù hē，不好 bù hǎo。',
      ),
    ],
    breakdown: [
      [ { text: '我', role: SUBJ }, { text: '不', role: NEG }, { text: '是', role: VERB }, { text: '老师', role: NOUN } ],
      [ { text: '我', role: SUBJ }, { text: '不', role: NEG }, { text: '喝', role: VERB }, { text: '茶', role: L('Tân ngữ', 'Object', '宾语') } ],
    ],
    examples: [
      { text: '我不是老师。', pron: 'Wǒ bú shì lǎoshī.', vi: 'Tôi không phải là giáo viên.', en: "I'm not a teacher." },
      { text: '她不是中国人。', pron: 'Tā bú shì Zhōngguó rén.', vi: 'Cô ấy không phải là người Trung Quốc.', en: "She isn't Chinese." },
      { text: '我不喝茶。', pron: 'Wǒ bù hē chá.', vi: 'Tôi không uống trà.', en: "I don't drink tea." },
      { text: '不对。', pron: 'Bú duì.', vi: 'Không đúng.', en: "That's not right." },
    ],
    mistakes: [
      {
        wrong: '我是不老师。',
        right: '我不是老师。',
        why: L('不 đứng TRƯỚC động từ 是.', '不 comes BEFORE the verb 是.', '“不”要放在动词“是”前面。'),
      },
      {
        wrong: '不是 → bù shì',
        right: '不是 → bú shì',
        why: L('是 là thanh 4, nên 不 đổi thành thanh 2.', '是 is 4th tone, so 不 changes to the 2nd tone.', '“是”是第四声，所以“不”变读第二声。'),
      },
    ],
    exercises: [
      {
        id: 'g-bu-1', kind: 'arrange', skill: 'grammar', grammarId: 'g-bu',
        prompt: { k: 'ex.arrange', p: { meaning: G('Tôi không uống trà.', "I don't drink tea.") } },
        tokens: ['我', '不', '喝', '茶'], answers: ['我不喝茶'],
        explanation: L('不 đứng trước động từ 喝.', '不 comes before the verb 喝.', '“不”放在动词“喝”前面。'),
        wordIds: ['bu', 'he', 'cha'],
      },
      {
        id: 'g-bu-2', kind: 'choice', skill: 'pronunciation', grammarId: 'g-bu',
        prompt: { seq: ['不对 (', G('không đúng', 'not right'), ') ', L('đọc là:', 'is pronounced:', '读作：')] },
        options: ['bú duì', 'bù duì', 'bū duì', 'bǔ duì'], answer: 0,
        explanation: L(
          '对 duì là thanh 4, nên 不 đổi thành thanh 2: bú duì.',
          '对 duì is 4th tone, so 不 changes to the 2nd tone: bú duì.',
          '“对”duì 是第四声，所以“不”变读第二声：bú duì。',
        ),
        wordIds: ['bu', 'dui'],
      },
      {
        id: 'g-bu-3', kind: 'choice', skill: 'grammar', grammarId: 'g-bu',
        prompt: WHICH_CORRECT,
        options: ['她不是老师。', '她是不老师。', '她不老师是。', '不她是老师。'], answer: 0, targetOptions: true,
        explanation: L('Chủ ngữ + 不 + 是 + danh từ.', 'Subject + 不 + 是 + noun.', '主语 + 不 + 是 + 名词。'),
        wordIds: ['bu'],
      },
    ],
  },
  {
    id: 'g-jiao',
    lessonId: 'd6',
    title: L('Hỏi và nói tên với 叫', 'Asking and giving names with 叫', '用“叫”问名字和说名字'),
    pattern: L(
      'Chủ ngữ + 叫 + Tên  ·  你叫什么名字？',
      'Subject + 叫 + Name  ·  你叫什么名字？',
      '主语 + 叫 + 名字  ·  你叫什么名字？',
    ),
    meaning: [
      L(
        '叫 jiào nghĩa là "gọi là, tên là". 我叫阮安 = Tôi tên là Nguyễn An.',
        '叫 jiào means "to be called". 我叫阮安 = My name is Nguyen An.',
        '“叫”（jiào）用来说名字。我叫阮安 = 我的名字是阮安。',
      ),
      L(
        'Câu hỏi tên: 你叫什么名字？ (Bạn tên là gì?). Từ để hỏi 什么 đứng ngay ở vị trí của câu trả lời — không đưa lên đầu câu.',
        'Asking a name: 你叫什么名字？ (What\'s your name?). The question word 什么 stays where the answer would go — it does not move to the start of the sentence.',
        '问名字：你叫什么名字？疑问词“什么”放在答案所在的位置，不移到句首。',
      ),
      L(
        'Câu đã có từ để hỏi (什么) thì KHÔNG thêm 吗.',
        'If the sentence already has a question word (什么), do NOT add 吗.',
        '句子里已经有疑问词（什么）时，不再加“吗”。',
      ),
    ],
    breakdown: [
      [ { text: '你', role: SUBJ }, { text: '叫', role: VERB }, { text: '什么', role: L('Từ để hỏi', 'Question word', '疑问词') }, { text: '名字', role: NOUN } ],
      [ { text: '我', role: SUBJ }, { text: '叫', role: VERB }, { text: '阮安', role: L('Tên', 'Name', '名字') } ],
    ],
    examples: [
      { text: '你叫什么名字？', pron: 'Nǐ jiào shénme míngzi?', vi: 'Bạn tên là gì?', en: "What's your name?" },
      { text: '我叫阮安。', pron: 'Wǒ jiào Ruǎn Ān.', vi: 'Tôi tên là Nguyễn An.', en: 'My name is Nguyen An.' },
      { text: '她叫王丽。', pron: 'Tā jiào Wáng Lì.', vi: 'Cô ấy tên là Vương Lệ.', en: 'Her name is Wang Li.' },
      { text: '他叫什么名字？', pron: 'Tā jiào shénme míngzi?', vi: 'Anh ấy tên là gì?', en: "What's his name?" },
    ],
    mistakes: [
      {
        wrong: '什么你叫名字？',
        right: '你叫什么名字？',
        why: L(
          '什么 đứng ở vị trí của thông tin cần hỏi, không đưa lên đầu câu.',
          '什么 stays in the position of the information being asked about; it doesn\'t move to the front.',
          '“什么”放在所问信息的位置，不放到句首。',
        ),
      },
      {
        wrong: '你叫什么名字吗？',
        right: '你叫什么名字？',
        why: L('Câu đã có 什么 thì không thêm 吗.', 'The sentence already has 什么, so don\'t add 吗.', '句子里已经有“什么”，不再加“吗”。'),
      },
    ],
    exercises: [
      {
        id: 'g-jiao-1', kind: 'arrange', skill: 'grammar', grammarId: 'g-jiao',
        prompt: { k: 'ex.arrange', p: { meaning: G('Anh ấy tên là gì?', "What's his name?") } },
        tokens: ['他', '叫', '什么', '名字'], answers: ['他叫什么名字'],
        explanation: '他 + 叫 + 什么 + 名字？',
        wordIds: ['jiao', 'shenme', 'mingzi'],
      },
      {
        id: 'g-jiao-2', kind: 'choice', skill: 'grammar', grammarId: 'g-jiao',
        prompt: WHICH_CORRECT,
        options: ['你叫什么名字？', '你叫什么名字吗？', '什么你叫名字？', '你什么叫名字？'], answer: 0, targetOptions: true,
        explanation: L(
          'Đã có từ để hỏi 什么 thì không dùng 吗; 什么 đứng sau 叫.',
          'With the question word 什么, don\'t use 吗; 什么 comes after 叫.',
          '已经有疑问词“什么”，就不用“吗”；“什么”放在“叫”后面。',
        ),
        wordIds: ['shenme'],
      },
    ],
  },
  {
    id: 'g-ma',
    lessonId: 'd7',
    title: L('Câu hỏi có/không với 吗', 'Yes/no questions with 吗', '用“吗”的是非疑问句'),
    pattern: L('Câu trần thuật + 吗？', 'Statement + 吗?', '陈述句 + 吗？'),
    meaning: [
      L(
        'Thêm 吗 ma vào CUỐI câu trần thuật để tạo câu hỏi có/không. Không đổi trật tự từ.',
        'Add 吗 ma to the END of a statement to make a yes/no question. The word order does not change.',
        '在陈述句末尾加“吗”（ma）就构成是非疑问句，语序不变。',
      ),
      L(
        'Trả lời khẳng định: 是 / 对 + câu đầy đủ. Phủ định: 不是 / 不 + câu đầy đủ.',
        'Answering yes: 是 / 对 + the full sentence. Answering no: 不是 / 不 + the full sentence.',
        '肯定回答：是 / 对 + 完整的句子；否定回答：不是 / 不 + 完整的句子。',
      ),
      L(
        '你好吗？ nghĩa là "Bạn khỏe không?" (hỏi thăm sức khỏe), khác với lời chào 你好.',
        '你好吗？ means "How are you?" (asking about someone\'s well-being), which is different from the greeting 你好.',
        '“你好吗？”是问候对方的身体状况，和打招呼的“你好”不同。',
      ),
    ],
    breakdown: [
      [ { text: '你', role: SUBJ }, { text: '是', role: VERB }, { text: '老师', role: NOUN }, { text: '吗', role: L('Trợ từ hỏi', 'Question particle', '疑问语气助词') } ],
    ],
    examples: [
      { text: '你是老师吗？', pron: 'Nǐ shì lǎoshī ma?', vi: 'Bạn là giáo viên phải không?', en: 'Are you a teacher?' },
      { text: '你好吗？', pron: 'Nǐ hǎo ma?', vi: 'Bạn khỏe không?', en: 'How are you?' },
      { text: '她是越南人吗？', pron: 'Tā shì Yuènán rén ma?', vi: 'Cô ấy là người Việt Nam phải không?', en: 'Is she Vietnamese?' },
      { text: '你喝茶吗？', pron: 'Nǐ hē chá ma?', vi: 'Bạn uống trà không?', en: 'Do you drink tea?' },
    ],
    mistakes: [
      {
        wrong: '吗你是老师？',
        right: '你是老师吗？',
        why: L('吗 luôn đứng ở cuối câu.', '吗 always goes at the end of the sentence.', '“吗”总是放在句末。'),
      },
      {
        wrong: '你是吗老师？',
        right: '你是老师吗？',
        why: L(
          'Giữ nguyên câu trần thuật rồi thêm 吗 ở cuối.',
          'Keep the statement as it is, then add 吗 at the end.',
          '保持陈述句不变，在句末加“吗”。',
        ),
      },
    ],
    exercises: [
      {
        id: 'g-ma-1', kind: 'choice', skill: 'grammar', grammarId: 'g-ma',
        prompt: L(
          'Biến câu 他是老师。thành câu hỏi có/không:',
          'Turn 他是老师。 into a yes/no question:',
          '把“他是老师。”变成是非疑问句：',
        ),
        options: ['他是老师吗？', '吗他是老师？', '他是吗老师？', '他吗是老师？'], answer: 0, targetOptions: true,
        explanation: L('Giữ nguyên câu, thêm 吗 vào cuối.', 'Keep the sentence as it is and add 吗 at the end.', '句子不变，在句末加“吗”。'),
        wordIds: ['ma-q'],
      },
      {
        id: 'g-ma-2', kind: 'arrange', skill: 'grammar', grammarId: 'g-ma',
        prompt: { k: 'ex.arrange', p: { meaning: G('Bạn uống trà không?', 'Do you drink tea?') } },
        tokens: ['你', '喝', '茶', '吗'], answers: ['你喝茶吗'],
        explanation: '你喝茶 + 吗？',
        wordIds: ['ma-q', 'he', 'cha'],
      },
    ],
  },
  {
    id: 'g-ye',
    lessonId: 'd7',
    title: L('也 (cũng)', '也 (also)', '副词“也”'),
    pattern: L(
      'Chủ ngữ + 也 + (不) + Động từ / Tính từ',
      'Subject + 也 + (不) + Verb / Adjective',
      '主语 + 也 + （不）+ 动词 / 形容词',
    ),
    meaning: [
      L(
        '也 yě nghĩa là "cũng". Luôn đứng SAU chủ ngữ và TRƯỚC động từ/tính từ.',
        '也 yě means "also / too". It always comes AFTER the subject and BEFORE the verb/adjective.',
        '“也”（yě）总是放在主语后面、动词或形容词前面。',
      ),
      L(
        'Không đặt 也 ở đầu câu hoặc cuối câu như tiếng Việt có thể làm.',
        'Don\'t put 也 at the start or end of the sentence, as Vietnamese (or English "too") might.',
        '不要像越南语那样把“也”放在句首或句末。',
      ),
      L(
        'Khi có 不: 也 đứng trước 不 → 也不是 (cũng không phải).',
        'With 不: 也 comes before 不 → 也不是 (also is not).',
        '有“不”时，“也”放在“不”前面 → 也不是。',
      ),
    ],
    breakdown: [
      [ { text: '我', role: SUBJ }, { text: '也', role: L('Phó từ "cũng"', 'Adverb "also"', '副词“也”') }, { text: '是', role: VERB }, { text: '学生', role: NOUN } ],
    ],
    examples: [
      { text: '我也是学生。', pron: 'Wǒ yě shì xuésheng.', vi: 'Tôi cũng là học sinh.', en: "I'm a student too." },
      { text: '她也说汉语。', pron: 'Tā yě shuō Hànyǔ.', vi: 'Cô ấy cũng nói tiếng Trung.', en: 'She speaks Chinese too.' },
      { text: '我们也很好。', pron: 'Wǒmen yě hěn hǎo.', vi: 'Chúng tôi cũng khỏe.', en: "We're fine too." },
      { text: '他也不是老师。', pron: 'Tā yě bú shì lǎoshī.', vi: 'Anh ấy cũng không phải là giáo viên.', en: "He isn't a teacher either." },
    ],
    mistakes: [
      {
        wrong: '也我是学生。',
        right: '我也是学生。',
        why: L('也 đứng sau chủ ngữ.', '也 comes after the subject.', '“也”放在主语后面。'),
      },
      {
        wrong: '我是也学生。',
        right: '我也是学生。',
        why: L('也 đứng trước động từ 是.', '也 comes before the verb 是.', '“也”放在动词“是”前面。'),
      },
      {
        wrong: '我不也是老师。',
        right: '我也不是老师。',
        why: L('也 đứng trước 不.', '也 comes before 不.', '“也”放在“不”前面。'),
      },
    ],
    exercises: [
      {
        id: 'g-ye-1', kind: 'arrange', skill: 'grammar', grammarId: 'g-ye',
        prompt: { k: 'ex.arrange', p: { meaning: G('Chúng tôi cũng khỏe.', "We're fine too.") } },
        tokens: ['我们', '也', '很', '好'], answers: ['我们也很好'],
        explanation: L('Chủ ngữ + 也 + 很 + tính từ.', 'Subject + 也 + 很 + adjective.', '主语 + 也 + 很 + 形容词。'),
        wordIds: ['ye', 'women'],
      },
      {
        id: 'g-ye-2', kind: 'choice', skill: 'grammar', grammarId: 'g-ye',
        prompt: WHICH_CORRECT,
        options: ['他也不是老师。', '他不也是老师。', '也他不是老师。', '他不是也老师。'], answer: 0, targetOptions: true,
        explanation: L('也 đứng sau chủ ngữ và trước 不.', '也 comes after the subject and before 不.', '“也”放在主语后面、“不”前面。'),
        wordIds: ['ye', 'bu'],
      },
    ],
  },
  {
    id: 'g-ne',
    lessonId: 'd7',
    title: L('Hỏi lại với 呢 (còn … thì sao?)', 'Asking back with 呢 (and you? / what about …?)', '用“呢”反问对方'),
    pattern: L(
      'Câu nói về mình，+ Danh từ / Đại từ + 呢？',
      'Statement about yourself, + Noun / Pronoun + 呢?',
      '关于自己的陈述，+ 名词 / 代词 + 呢？',
    ),
    meaning: [
      L(
        '呢 ne dùng sau danh từ/đại từ để hỏi lại cùng một nội dung: "còn … thì sao?".',
        '呢 ne goes after a noun/pronoun to ask the same question back: "what about …?".',
        '“呢”（ne）用在名词或代词后面，就同一内容反问：“……怎么样？”。',
      ),
      L(
        'Thường dùng sau khi đã nói về bản thân: 我很好，你呢？ (Tôi khỏe, còn bạn?)',
        'Often used after talking about yourself: 我很好，你呢？ (I\'m fine, and you?)',
        '常在先说完自己的情况之后使用：我很好，你呢？',
      ),
      L(
        'Không dùng 吗 cho kiểu hỏi lại này.',
        'Don\'t use 吗 for this kind of follow-up question.',
        '这种反问不用“吗”。',
      ),
    ],
    breakdown: [
      [
        { text: '我很好', role: L('Câu nói về mình', 'Statement about yourself', '陈述自己的情况') },
        { text: '你', role: PRON },
        { text: '呢', role: L('Trợ từ hỏi lại', 'Follow-up question particle', '追问语气助词') },
      ],
    ],
    examples: [
      { text: '我很好，你呢？', pron: 'Wǒ hěn hǎo, nǐ ne?', vi: 'Tôi khỏe, còn bạn?', en: "I'm fine, and you?" },
      { text: '我是越南人，你呢？', pron: 'Wǒ shì Yuènán rén, nǐ ne?', vi: 'Tôi là người Việt Nam, còn bạn?', en: "I'm Vietnamese, and you?" },
      { text: '我叫阮安，你呢？', pron: 'Wǒ jiào Ruǎn Ān, nǐ ne?', vi: 'Tôi tên là Nguyễn An, còn bạn?', en: 'My name is Nguyen An, and yours?' },
    ],
    mistakes: [
      {
        wrong: '我是学生，你吗？',
        right: '我是学生，你呢？',
        why: L(
          'Hỏi lại "còn bạn?" dùng 呢, không dùng 吗.',
          'To ask back "and you?", use 呢, not 吗.',
          '反问“你呢？”要用“呢”，不用“吗”。',
        ),
      },
    ],
    exercises: [
      {
        id: 'g-ne-1', kind: 'choice', skill: 'grammar', grammarId: 'g-ne',
        prompt: { seq: ['我是学生，你＿＿？(', G('Tôi là học sinh, còn bạn?', "I'm a student, and you?"), ')'] },
        options: ['呢', '吗', '也', '不'], answer: 0, targetOptions: true,
        explanation: { seq: [L('Hỏi lại "còn bạn?"', 'Asking back "and you?"', '反问对方'), ' → 你呢？'] },
        wordIds: ['ne'],
      },
      {
        id: 'g-ne-2', kind: 'choice', skill: 'reading', grammarId: 'g-ne',
        prompt: L('Câu này nghĩa là gì?', 'What does this sentence mean?', '这句话是什么意思？'),
        text: '我很好，你呢？', pron: 'Wǒ hěn hǎo, nǐ ne?',
        options: [
          G('Tôi khỏe, còn bạn?', "I'm fine, and you?"),
          G('Tôi khỏe, bạn có khỏe không?', "I'm fine, are you fine?"),
          G('Bạn khỏe không?', 'How are you?'),
          G('Tôi cũng khỏe.', "I'm fine too."),
        ],
        answer: 0,
        explanation: { seq: ['呢 = "', L('còn … thì sao?', 'what about …?', '……怎么样？'), '"'] },
        wordIds: ['ne'],
      },
    ],
  },
];

export const GRAMMAR_BY_ID: Record<string, GrammarPoint> = Object.fromEntries(GRAMMAR.map((g) => [g.id, g]));
