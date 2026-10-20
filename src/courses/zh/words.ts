import type { Word } from '../../types';

/** `ex`: [Chinese, pinyin, Vietnamese translation, English translation]. `level`: HSK 2.0 level ('HSK 1' | 'HSK 2' | 'HSK 3'), '—' when the word is in no HSK 1–3 list. */
type W = Omit<Word, 'example' | 'level'> & { level?: string; ex: [string, string, string, string] };

const RAW: W[] = [
  // ---- Day 1: tones ----
  { id: 'mama', text: '妈妈', pron: 'māma', vi: 'mẹ', en: 'mom', type: 'noun', topic: 'family', stage: 1, lessonId: 'd1', level: 'HSK 1', ex: ['妈妈好！', 'Māma hǎo!', 'Con chào mẹ!', 'Hi, Mom!'], notes: { vi: 'Âm tiết thứ hai đọc thanh nhẹ.', en: 'The second syllable is read in the neutral tone.', zh: '第二个音节读轻声。' } },
  { id: 'baba', text: '爸爸', pron: 'bàba', vi: 'bố', en: 'dad', type: 'noun', topic: 'family', stage: 1, lessonId: 'd1', level: 'HSK 1', ex: ['爸爸好！', 'Bàba hǎo!', 'Con chào bố!', 'Hi, Dad!'] },
  { id: 'ma3', text: '马', pron: 'mǎ', vi: 'con ngựa', en: 'horse', type: 'noun', topic: 'nature', stage: 1, lessonId: 'd1', level: 'HSK 3', ex: ['这是马。', 'Zhè shì mǎ.', 'Đây là con ngựa.', 'This is a horse.'], notes: { vi: 'Phồn thể: 馬.', en: 'Traditional form: 馬.', zh: '繁体字：馬。' } },

  // ---- Day 2: initials ----
  { id: 'ta-m', text: '他', pron: 'tā', vi: 'anh ấy, ông ấy', en: 'he; him', type: 'pronoun', topic: 'people', stage: 1, lessonId: 'd2', level: 'HSK 1', ex: ['他是爸爸。', 'Tā shì bàba.', 'Ông ấy là bố.', 'He is the dad.'], notes: { vi: '他 (nam) và 她 (nữ) đọc giống nhau: tā.', en: '他 (male) and 她 (female) are pronounced the same: tā.', zh: '他（男性）和她（女性）读音相同：tā。' } },
  { id: 'ta-f', text: '她', pron: 'tā', vi: 'cô ấy, bà ấy', en: 'she; her', type: 'pronoun', topic: 'people', stage: 1, lessonId: 'd2', level: 'HSK 1', ex: ['她是妈妈。', 'Tā shì māma.', 'Bà ấy là mẹ.', 'She is the mom.'], notes: { vi: 'Bộ 女 (nữ) bên trái cho biết đây là ngôi thứ ba giống cái.', en: 'The 女 (woman) radical on the left marks the feminine third person.', zh: '左边的“女”字旁表示女性第三人称。' } },
  { id: 'gege', text: '哥哥', pron: 'gēge', vi: 'anh trai', en: 'older brother', type: 'noun', topic: 'family', stage: 1, lessonId: 'd2', level: 'HSK 2', ex: ['他是我哥哥。', 'Tā shì wǒ gēge.', 'Anh ấy là anh trai tôi.', 'He is my older brother.'] },
  { id: 'jiejie', text: '姐姐', pron: 'jiějie', vi: 'chị gái', en: 'older sister', type: 'noun', topic: 'family', stage: 1, lessonId: 'd2', level: 'HSK 2', ex: ['她是我姐姐。', 'Tā shì wǒ jiějie.', 'Cô ấy là chị gái tôi.', 'She is my older sister.'] },
  { id: 'chi', text: '吃', pron: 'chī', vi: 'ăn', en: 'to eat', type: 'verb', topic: 'food', stage: 1, lessonId: 'd2', level: 'HSK 1', ex: ['我吃饭。', 'Wǒ chī fàn.', 'Tôi ăn cơm.', 'I eat (a meal).'] },
  { id: 'he', text: '喝', pron: 'hē', vi: 'uống', en: 'to drink', type: 'verb', topic: 'food', stage: 1, lessonId: 'd2', level: 'HSK 1', ex: ['我喝茶。', 'Wǒ hē chá.', 'Tôi uống trà.', 'I drink tea.'] },
  { id: 'cha', text: '茶', pron: 'chá', vi: 'trà', en: 'tea', type: 'noun', topic: 'food', stage: 1, lessonId: 'd2', level: 'HSK 1', ex: ['妈妈喝茶。', 'Māma hē chá.', 'Mẹ uống trà.', 'Mom drinks tea.'] },

  // ---- Day 3: finals & tone sandhi ----
  { id: 'hao', text: '好', pron: 'hǎo', vi: 'tốt, khỏe, hay', en: 'good; well', type: 'adjective', topic: 'basics', stage: 1, lessonId: 'd3', level: 'HSK 1', ex: ['很好！', 'Hěn hǎo!', 'Rất tốt!', 'Very good!'] },
  { id: 'nihao', text: '你好', pron: 'nǐ hǎo', vi: 'xin chào', en: 'hello', type: 'phrase', topic: 'greetings', stage: 1, lessonId: 'd3', level: 'HSK 1', ex: ['姐姐，你好！', 'Jiějie, nǐ hǎo!', 'Chào chị!', 'Hello, sis!'], notes: { vi: 'Khi nói, 你 đổi thành thanh 2: ní hǎo (quy tắc 3 + 3).', en: 'In speech, 你 changes to tone 2: ní hǎo (the 3 + 3 rule).', zh: '说话时，“你”变成第二声：ní hǎo（三声 + 三声变调规则）。' } },
  { id: 'hen', text: '很', pron: 'hěn', vi: 'rất', en: 'very', type: 'adverb', topic: 'basics', stage: 1, lessonId: 'd3', level: 'HSK 1', ex: ['爸爸很好。', 'Bàba hěn hǎo.', 'Bố rất khỏe.', 'Dad is very well.'] },
  { id: 'shui', text: '水', pron: 'shuǐ', vi: 'nước', en: 'water', type: 'noun', topic: 'food', stage: 1, lessonId: 'd3', level: 'HSK 1', ex: ['我喝水。', 'Wǒ hē shuǐ.', 'Tôi uống nước.', 'I drink water.'] },
  { id: 'yu', text: '鱼', pron: 'yú', vi: 'cá', en: 'fish', type: 'noun', topic: 'food', stage: 1, lessonId: 'd3', level: 'HSK 2', ex: ['我吃鱼。', 'Wǒ chī yú.', 'Tôi ăn cá.', 'I eat fish.'] },
  { id: 'xiexie', text: '谢谢', pron: 'xièxie', vi: 'cảm ơn', en: 'thank you', type: 'verb', topic: 'greetings', stage: 1, lessonId: 'd3', level: 'HSK 1', ex: ['谢谢妈妈！', 'Xièxie māma!', 'Con cảm ơn mẹ!', 'Thanks, Mom!'] },

  // ---- Day 4: characters & numbers ----
  { id: 'ling', text: '零', pron: 'líng', vi: 'số 0, linh', en: 'zero (0)', type: 'number', topic: 'numbers', stage: 1, lessonId: 'd4', level: 'HSK 2', ex: ['二零二六年', 'èr líng èr liù nián', 'năm 2026', 'the year 2026'] },
  { id: 'yi', text: '一', pron: 'yī', vi: 'một (1)', en: 'one (1)', type: 'number', topic: 'numbers', stage: 1, lessonId: 'd4', level: 'HSK 1', ex: ['一、二、三！', 'Yī, èr, sān!', 'Một, hai, ba!', 'One, two, three!'], notes: { vi: 'Khi đếm đọc yī; trong cụm từ có thể đổi thanh (sẽ học sau).', en: 'Read yī when counting; in phrases its tone can change (covered later).', zh: '数数时读 yī；在词语中可能变调（以后会学）。' } },
  { id: 'er', text: '二', pron: 'èr', vi: 'hai (2)', en: 'two (2)', type: 'number', topic: 'numbers', stage: 1, lessonId: 'd4', level: 'HSK 1', ex: ['二月', 'èryuè', 'tháng Hai', 'February'], notes: { vi: 'Trước lượng từ dùng 两 liǎng (sẽ học sau).', en: 'Before a measure word, use 两 liǎng instead (covered later).', zh: '量词前用“两 liǎng”（以后会学）。' } },
  { id: 'san', text: '三', pron: 'sān', vi: 'ba (3)', en: 'three (3)', type: 'number', topic: 'numbers', stage: 1, lessonId: 'd4', level: 'HSK 1', ex: ['三月', 'sānyuè', 'tháng Ba', 'March'] },
  { id: 'si', text: '四', pron: 'sì', vi: 'bốn (4)', en: 'four (4)', type: 'number', topic: 'numbers', stage: 1, lessonId: 'd4', level: 'HSK 1', ex: ['四月', 'sìyuè', 'tháng Tư', 'April'] },
  { id: 'wu', text: '五', pron: 'wǔ', vi: 'năm (5)', en: 'five (5)', type: 'number', topic: 'numbers', stage: 1, lessonId: 'd4', level: 'HSK 1', ex: ['五月', 'wǔyuè', 'tháng Năm', 'May'] },
  { id: 'liu', text: '六', pron: 'liù', vi: 'sáu (6)', en: 'six (6)', type: 'number', topic: 'numbers', stage: 1, lessonId: 'd4', level: 'HSK 1', ex: ['六月', 'liùyuè', 'tháng Sáu', 'June'] },
  { id: 'qi', text: '七', pron: 'qī', vi: 'bảy (7)', en: 'seven (7)', type: 'number', topic: 'numbers', stage: 1, lessonId: 'd4', level: 'HSK 1', ex: ['七月', 'qīyuè', 'tháng Bảy', 'July'] },
  { id: 'ba', text: '八', pron: 'bā', vi: 'tám (8)', en: 'eight (8)', type: 'number', topic: 'numbers', stage: 1, lessonId: 'd4', level: 'HSK 1', ex: ['八月', 'bāyuè', 'tháng Tám', 'August'] },
  { id: 'jiu', text: '九', pron: 'jiǔ', vi: 'chín (9)', en: 'nine (9)', type: 'number', topic: 'numbers', stage: 1, lessonId: 'd4', level: 'HSK 1', ex: ['九月', 'jiǔyuè', 'tháng Chín', 'September'] },
  { id: 'shi2', text: '十', pron: 'shí', vi: 'mười (10)', en: 'ten (10)', type: 'number', topic: 'numbers', stage: 1, lessonId: 'd4', level: 'HSK 1', ex: ['十八', 'shíbā', 'mười tám (18)', 'eighteen (18)'] },
  { id: 'ren', text: '人', pron: 'rén', vi: 'người', en: 'person; people', type: 'noun', topic: 'people', stage: 1, lessonId: 'd4', level: 'HSK 1', ex: ['中国人', 'Zhōngguó rén', 'người Trung Quốc', 'Chinese people'] },
  { id: 'da', text: '大', pron: 'dà', vi: 'to, lớn', en: 'big', type: 'adjective', topic: 'basics', stage: 1, lessonId: 'd4', level: 'HSK 1', ex: ['很大', 'hěn dà', 'rất to', 'very big'] },
  { id: 'xiao', text: '小', pron: 'xiǎo', vi: 'nhỏ, bé', en: 'small', type: 'adjective', topic: 'basics', stage: 1, lessonId: 'd4', level: 'HSK 1', ex: ['很小', 'hěn xiǎo', 'rất nhỏ', 'very small'] },

  // ---- Day 5: greetings & pronouns ----
  { id: 'wo', text: '我', pron: 'wǒ', vi: 'tôi, mình', en: 'I; me', type: 'pronoun', topic: 'people', stage: 2, lessonId: 'd5', level: 'HSK 1', ex: ['我很好。', 'Wǒ hěn hǎo.', 'Tôi khỏe.', "I'm fine."] },
  { id: 'ni', text: '你', pron: 'nǐ', vi: 'bạn, anh, chị (ngôi thứ hai)', en: 'you', type: 'pronoun', topic: 'people', stage: 2, lessonId: 'd5', level: 'HSK 1', ex: ['谢谢你！', 'Xièxie nǐ!', 'Cảm ơn bạn!', 'Thank you!'] },
  { id: 'nin', text: '您', pron: 'nín', vi: 'ông, bà, ngài (kính trọng)', en: 'you (polite)', type: 'pronoun', topic: 'people', stage: 2, lessonId: 'd5', level: 'HSK 2', ex: ['您好！', 'Nín hǎo!', 'Cháu chào ông/bà! (lịch sự)', 'Hello! (polite)'], notes: { vi: 'Dạng lịch sự của 你, dùng với người lớn tuổi, khách hàng, cấp trên.', en: 'The polite form of 你, used with older people, customers and superiors.', zh: '“你”的敬称，用于长辈、顾客、上级。' } },
  { id: 'women', text: '我们', pron: 'wǒmen', vi: 'chúng tôi, chúng ta', en: 'we; us', type: 'pronoun', topic: 'people', stage: 2, lessonId: 'd5', level: 'HSK 1', ex: ['我们很好。', 'Wǒmen hěn hǎo.', 'Chúng tôi khỏe.', "We're fine."] },
  { id: 'nimen', text: '你们', pron: 'nǐmen', vi: 'các bạn', en: 'you (plural)', type: 'pronoun', topic: 'people', stage: 2, lessonId: 'd5', level: 'HSK 1', ex: ['你们好！', 'Nǐmen hǎo!', 'Chào các bạn!', 'Hello, everyone!'] },
  { id: 'tamen', text: '他们', pron: 'tāmen', vi: 'họ, bọn họ', en: 'they; them', type: 'pronoun', topic: 'people', stage: 2, lessonId: 'd5', level: 'HSK 1', ex: ['他们很好。', 'Tāmen hěn hǎo.', 'Họ khỏe.', "They're fine."], notes: { vi: 'Nếu cả nhóm đều là nữ có thể viết 她们 (cùng cách đọc).', en: 'If the whole group is female, you can write 她们 (same pronunciation).', zh: '如果全是女性，可以写作“她们”（读音相同）。' } },
  { id: 'bukeqi', text: '不客气', pron: 'bú kèqi', vi: 'không có gì, đừng khách sáo', en: "you're welcome", type: 'phrase', topic: 'greetings', stage: 2, lessonId: 'd5', level: 'HSK 1', ex: ['谢谢！——不客气！', 'Xièxie! — Bú kèqi!', 'Cảm ơn! — Không có gì!', "Thanks! — You're welcome!"], notes: { vi: '不 đứng trước thanh 4 (客 kè) nên đọc thành bú.', en: '不 comes before a tone-4 syllable (客 kè), so it is read bú.', zh: '“不”在第四声（客 kè）前，所以读作 bú。' } },
  { id: 'duibuqi', text: '对不起', pron: 'duìbuqǐ', vi: 'xin lỗi', en: 'sorry', type: 'phrase', topic: 'greetings', stage: 2, lessonId: 'd5', level: 'HSK 1', ex: ['对不起！——没关系！', 'Duìbuqǐ! — Méi guānxi!', 'Xin lỗi! — Không sao!', "Sorry! — That's OK!"] },
  { id: 'meiguanxi', text: '没关系', pron: 'méi guānxi', vi: 'không sao, không có gì', en: "it doesn't matter; that's OK", type: 'phrase', topic: 'greetings', stage: 2, lessonId: 'd5', level: 'HSK 1', ex: ['没关系，我很好。', 'Méi guānxi, wǒ hěn hǎo.', 'Không sao, tôi ổn.', "It's OK, I'm fine."] },
  { id: 'zaijian', text: '再见', pron: 'zàijiàn', vi: 'tạm biệt', en: 'goodbye', type: 'phrase', topic: 'greetings', stage: 2, lessonId: 'd5', level: 'HSK 1', ex: ['妈妈，再见！', 'Māma, zàijiàn!', 'Con chào mẹ (tạm biệt mẹ)!', 'Bye, Mom!'] },
  { id: 'zaoshanghao', text: '早上好', pron: 'zǎoshang hǎo', vi: 'chào buổi sáng', en: 'good morning', type: 'phrase', topic: 'greetings', stage: 2, lessonId: 'd5', level: 'HSK 2', ex: ['爸爸，早上好！', 'Bàba, zǎoshang hǎo!', 'Con chào bố buổi sáng!', 'Good morning, Dad!'] },

  // ---- Day 6: 是 / 不是, names, nationality ----
  { id: 'shi', text: '是', pron: 'shì', vi: 'là', en: 'to be (am, is, are)', type: 'verb', topic: 'basics', stage: 2, lessonId: 'd6', level: 'HSK 1', ex: ['我是学生。', 'Wǒ shì xuésheng.', 'Tôi là học sinh.', "I'm a student."] },
  { id: 'bu', text: '不', pron: 'bù', vi: 'không (phủ định)', en: 'not; no', type: 'adverb', topic: 'basics', stage: 2, lessonId: 'd6', level: 'HSK 1', ex: ['我不是老师。', 'Wǒ bú shì lǎoshī.', 'Tôi không phải là giáo viên.', "I'm not a teacher."], notes: { vi: 'Trước âm tiết thanh 4 đọc thành bú: 不是 bú shì.', en: 'Before a tone-4 syllable it is read bú: 不是 bú shì.', zh: '在第四声音节前读作 bú：不是 bú shì。' } },
  { id: 'laoshi', text: '老师', pron: 'lǎoshī', vi: 'giáo viên, thầy/cô giáo', en: 'teacher', type: 'noun', topic: 'people', stage: 2, lessonId: 'd6', level: 'HSK 1', ex: ['她是老师。', 'Tā shì lǎoshī.', 'Cô ấy là giáo viên.', 'She is a teacher.'] },
  { id: 'xuesheng', text: '学生', pron: 'xuésheng', vi: 'học sinh, sinh viên', en: 'student', type: 'noun', topic: 'people', stage: 2, lessonId: 'd6', level: 'HSK 1', ex: ['他们是学生。', 'Tāmen shì xuésheng.', 'Họ là học sinh.', 'They are students.'] },
  { id: 'jiao', text: '叫', pron: 'jiào', vi: 'gọi, tên là', en: 'to call; to be called', type: 'verb', topic: 'greetings', stage: 2, lessonId: 'd6', level: 'HSK 1', ex: ['我叫阮安。', 'Wǒ jiào Ruǎn Ān.', 'Tôi tên là Nguyễn An.', 'My name is Nguyen An.'] },
  { id: 'shenme', text: '什么', pron: 'shénme', vi: 'cái gì, gì', en: 'what', type: 'pronoun', topic: 'questions', stage: 2, lessonId: 'd6', level: 'HSK 1', ex: ['这是什么？', 'Zhè shì shénme?', 'Đây là cái gì?', 'What is this?'] },
  { id: 'mingzi', text: '名字', pron: 'míngzi', vi: 'tên', en: 'name', type: 'noun', topic: 'greetings', stage: 2, lessonId: 'd6', level: 'HSK 1', ex: ['你叫什么名字？', 'Nǐ jiào shénme míngzi?', 'Bạn tên là gì?', "What's your name?"] },
  { id: 'zhe', text: '这', pron: 'zhè', vi: 'đây, này', en: 'this', type: 'pronoun', topic: 'basics', stage: 2, lessonId: 'd6', level: 'HSK 1', ex: ['这是我妈妈。', 'Zhè shì wǒ māma.', 'Đây là mẹ tôi.', 'This is my mom.'] },
  { id: 'zhongguo', text: '中国', pron: 'Zhōngguó', vi: 'Trung Quốc', en: 'China', type: 'proper-noun', topic: 'countries', stage: 2, lessonId: 'd6', level: 'HSK 1', ex: ['中国很大。', 'Zhōngguó hěn dà.', 'Trung Quốc rất rộng lớn.', 'China is very big.'] },
  { id: 'yuenan', text: '越南', pron: 'Yuènán', vi: 'Việt Nam', en: 'Vietnam', type: 'proper-noun', topic: 'countries', stage: 2, lessonId: 'd6', level: '—', ex: ['我们是越南人。', 'Wǒmen shì Yuènán rén.', 'Chúng tôi là người Việt Nam.', 'We are Vietnamese.'] },
  { id: 'zhongguoren', text: '中国人', pron: 'Zhōngguó rén', vi: 'người Trung Quốc', en: 'Chinese person', type: 'noun', topic: 'countries', stage: 2, lessonId: 'd6', level: 'HSK 1', ex: ['他是中国人。', 'Tā shì Zhōngguó rén.', 'Anh ấy là người Trung Quốc.', 'He is Chinese.'] },
  { id: 'yuenanren', text: '越南人', pron: 'Yuènán rén', vi: 'người Việt Nam', en: 'Vietnamese person', type: 'noun', topic: 'countries', stage: 2, lessonId: 'd6', level: '—', ex: ['我是越南人。', 'Wǒ shì Yuènán rén.', 'Tôi là người Việt Nam.', "I'm Vietnamese."] },

  // ---- Day 7: 吗 / 呢 / 也 ----
  { id: 'ma-q', text: '吗', pron: 'ma', vi: '(trợ từ để hỏi: … không? / … phải không?)', en: '(question particle for yes/no questions)', type: 'particle', topic: 'questions', stage: 2, lessonId: 'd7', level: 'HSK 1', ex: ['你是老师吗？', 'Nǐ shì lǎoshī ma?', 'Bạn là giáo viên phải không?', 'Are you a teacher?'] },
  { id: 'ne', text: '呢', pron: 'ne', vi: '(trợ từ hỏi lại: còn … thì sao?)', en: '(particle: "and …?", "what about …?")', type: 'particle', topic: 'questions', stage: 2, lessonId: 'd7', level: 'HSK 1', ex: ['我是越南人，你呢？', 'Wǒ shì Yuènán rén, nǐ ne?', 'Tôi là người Việt Nam, còn bạn?', "I'm Vietnamese. And you?"] },
  { id: 'ye', text: '也', pron: 'yě', vi: 'cũng', en: 'also; too', type: 'adverb', topic: 'basics', stage: 2, lessonId: 'd7', level: 'HSK 2', ex: ['我也是学生。', 'Wǒ yě shì xuésheng.', 'Tôi cũng là học sinh.', "I'm a student too."] },
  { id: 'dui', text: '对', pron: 'duì', vi: 'đúng', en: 'right; correct', type: 'adjective', topic: 'basics', stage: 2, lessonId: 'd7', level: 'HSK 2', ex: ['对，我是学生。', 'Duì, wǒ shì xuésheng.', 'Đúng, tôi là học sinh.', "Right, I'm a student."] },
  { id: 'shuo', text: '说', pron: 'shuō', vi: 'nói', en: 'to speak; to say', type: 'verb', topic: 'countries', stage: 2, lessonId: 'd7', level: 'HSK 1', ex: ['我说越南语。', 'Wǒ shuō Yuènányǔ.', 'Tôi nói tiếng Việt.', 'I speak Vietnamese.'] },
  { id: 'xue', text: '学', pron: 'xué', vi: 'học', en: 'to study; to learn', type: 'verb', topic: 'basics', stage: 2, lessonId: 'd7', level: 'HSK 1', ex: ['我学汉语。', 'Wǒ xué Hànyǔ.', 'Tôi học tiếng Trung.', "I'm learning Chinese."] },
  { id: 'hanyu', text: '汉语', pron: 'Hànyǔ', vi: 'tiếng Hán, tiếng Trung', en: 'Chinese (language)', type: 'noun', topic: 'countries', stage: 2, lessonId: 'd7', level: 'HSK 1', ex: ['你说汉语吗？', 'Nǐ shuō Hànyǔ ma?', 'Bạn có nói tiếng Trung không?', 'Do you speak Chinese?'] },
  { id: 'yuenanyu', text: '越南语', pron: 'Yuènányǔ', vi: 'tiếng Việt', en: 'Vietnamese (language)', type: 'noun', topic: 'countries', stage: 2, lessonId: 'd7', level: '—', ex: ['她也说越南语。', 'Tā yě shuō Yuènányǔ.', 'Cô ấy cũng nói tiếng Việt.', 'She speaks Vietnamese too.'] },
];

export const WORDS: Word[] = RAW.map(({ ex, level, ...w }) => ({ ...w, level: level ?? 'HSK 1', example: { text: ex[0], pron: ex[1], vi: ex[2], en: ex[3] } }));

export const WORD_BY_ID: Record<string, Word> = Object.fromEntries(WORDS.map((w) => [w.id, w]));
