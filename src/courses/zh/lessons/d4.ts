import type { Lesson } from '../../../types';
import { MATCH_PROMPT, choice, hanzi, listen, pinyin } from './helpers';

export const D4: Lesson = {
  id: 'd4', day: 4, stage: 1, minutes: 20, prerequisites: ['d3'],
  title: {
    vi: 'Chữ Hán đầu tiên & số đếm 0–10',
    en: 'First Chinese characters & numbers 0–10',
    zh: '第一批汉字和数字0–10',
  },
  subtitle: {
    vi: 'Nét cơ bản · thứ tự nét · chữ tượng hình · số đếm · bộ gõ',
    en: 'Basic strokes · stroke order · pictographs · numbers · input methods',
    zh: '基本笔画 · 笔顺 · 象形字 · 数字 · 输入法',
  },
  objectives: [
    {
      vi: 'Hiểu chữ Hán, chữ giản thể và phồn thể.',
      en: 'Understand Chinese characters, simplified and traditional.',
      zh: '了解汉字、简体字和繁体字。',
    },
    {
      vi: 'Biết các nét cơ bản và 5 quy tắc thứ tự nét.',
      en: 'Know the basic strokes and the 5 stroke-order rules.',
      zh: '认识基本笔画和五条笔顺规则。',
    },
    {
      vi: 'Nhận biết một số chữ tượng hình: 人 口 山 日 月 木.',
      en: 'Recognize some pictographs: 人 口 山 日 月 木.',
      zh: '认识几个象形字：人 口 山 日 月 木。',
    },
    {
      vi: 'Đọc, viết số 0–10 và ghép số đến 99.',
      en: 'Read and write the numbers 0–10 and build numbers up to 99.',
      zh: '会读、会写数字0–10，并能组成99以内的数字。',
    },
    {
      vi: 'Biết cách gõ chữ Hán bằng bộ gõ Pinyin.',
      en: 'Know how to type Chinese characters with a Pinyin input method.',
      zh: '学会用拼音输入法输入汉字。',
    },
  ],
  intro: [
    {
      vi: 'Chữ Hán (汉字 Hànzì) là chữ viết của tiếng Trung. Mỗi chữ thường ứng với một âm tiết và mang nghĩa. Chữ giản thể (简体) được đơn giản hóa từ chữ phồn thể (繁體): 马 ← 馬.',
      en: 'Chinese characters (汉字 Hànzì) are the writing system of Chinese. Each character usually stands for one syllable and carries a meaning. Simplified characters (简体) were simplified from traditional characters (繁體): 马 ← 馬.',
      zh: '汉字（汉字 Hànzì）是中文的文字。一个汉字一般对应一个音节，并且有意义。简体字（简体）是从繁体字（繁體）简化来的：马 ← 馬。',
    },
    {
      vi: 'Nhiều chữ bắt nguồn từ hình vẽ (chữ tượng hình): 人 giống người đang bước, 山 giống ba ngọn núi, 口 giống cái miệng.',
      en: 'Many characters come from pictures (pictographs): 人 looks like a person walking, 山 like three mountain peaks, 口 like a mouth.',
      zh: '很多汉字来自图画（象形字）：人 像一个正在走路的人，山 像三座山峰，口 像一张嘴。',
    },
    {
      vi: 'Chữ Hán được ghép từ các nét cơ bản: ngang 一, sổ 丨, phẩy 丿, mác ㇏, chấm 丶, hất, móc và gập.',
      en: 'Characters are built from basic strokes: horizontal 一, vertical 丨, left-falling 丿, right-falling ㇏, dot 丶, rising, hook and turning strokes.',
      zh: '汉字由基本笔画组成：横 一、竖 丨、撇 丿、捺 ㇏、点 丶，还有提、钩和折。',
    },
    {
      vi: 'Để gõ chữ Hán: thêm bộ gõ "Chinese Simplified — Pinyin" (Windows: Settings → Time & Language → Language; macOS: System Settings → Keyboard → Input Sources; điện thoại: thêm bàn phím Tiếng Trung giản thể). Gõ pinyin không dấu, ví dụ "ni", rồi chọn 你. Chưa có bộ gõ? Ứng dụng có "bảng chữ gợi ý" để bấm chọn.',
      en: 'To type Chinese: add the "Chinese Simplified — Pinyin" input method (Windows: Settings → Time & Language → Language; macOS: System Settings → Keyboard → Input Sources; phone: add a Simplified Chinese keyboard). Type pinyin without tone marks, e.g. "ni", then pick 你. No input method yet? The app has a "character palette" you can tap to choose from.',
      zh: '输入汉字的方法：添加“简体中文—拼音”输入法（Windows：设置 → 时间和语言 → 语言；macOS：系统设置 → 键盘 → 输入法；手机：添加简体中文键盘）。输入不带声调的拼音，比如“ni”，然后选择 你。还没有输入法？应用里有“候选字面板”，点一下就能选择。',
    },
  ],
  sections: [
    { kind: 'text', title: { vi: 'Quy tắc thứ tự nét cơ bản', en: 'Basic stroke-order rules', zh: '基本笔顺规则' }, body: [
      { vi: '1. Ngang trước, sổ sau: 十.', en: '1. Horizontal before vertical: 十.', zh: '1. 先横后竖：十。' },
      { vi: '2. Phẩy trước, mác sau: 人, 八.', en: '2. Left-falling before right-falling: 人, 八.', zh: '2. 先撇后捺：人、八。' },
      { vi: '3. Trên trước, dưới sau: 三.', en: '3. Top before bottom: 三.', zh: '3. 从上到下：三。' },
      { vi: '4. Trái trước, phải sau: 你 (bên trái 亻 viết trước).', en: '4. Left before right: 你 (the left part 亻 is written first).', zh: '4. 从左到右：你（先写左边的 亻）。' },
      { vi: '5. Ngoài trước, trong sau, đóng khung sau cùng: 日, 口.', en: '5. Outside before inside, close the frame last: 日, 口.', zh: '5. 先外后内，最后封口：日、口。' },
      {
        vi: 'Ghi chú: phần "Luyện viết" bên dưới cho bạn xem và tô lại thứ tự nét của từng chữ. Hãy luyện thêm trên giấy.',
        en: 'Note: the "Writing practice" section below lets you watch and trace the stroke order of each character. Practise on paper too.',
        zh: '注意：下面的“书写练习”可以观看并描写每个字的笔顺。也请在纸上多加练习。',
      },
    ] },
    { kind: 'sounds', title: { vi: 'Chữ tượng hình', en: 'Pictographs', zh: '象形字' }, intro: { vi: 'Hình dạng chữ gợi lên sự vật.', en: 'The shape of the character suggests the thing it names.', zh: '字形让人联想到它表示的事物。' }, items: [
      { label: '人', text: '人', pron: 'rén', vi: 'người', en: 'person', note: { vi: 'Hình người đang bước.', en: 'A person walking.', zh: '像一个正在走路的人。' } },
      { label: '口', text: '口', pron: 'kǒu', vi: 'miệng', en: 'mouth', note: { vi: 'Hình cái miệng.', en: 'A mouth.', zh: '像一张嘴。' } },
      { label: '山', text: '山', pron: 'shān', vi: 'núi', en: 'mountain', note: { vi: 'Ba đỉnh núi.', en: 'Three mountain peaks.', zh: '像三座山峰。' } },
      { label: '日', text: '日', pron: 'rì', vi: 'mặt trời, ngày', en: 'sun, day', note: { vi: 'Mặt trời.', en: 'The sun.', zh: '像太阳。' } },
      { label: '月', text: '月', pron: 'yuè', vi: 'mặt trăng, tháng', en: 'moon, month', note: { vi: 'Trăng lưỡi liềm.', en: 'A crescent moon.', zh: '像一弯月牙。' } },
      { label: '木', text: '木', pron: 'mù', vi: 'cây, gỗ', en: 'tree, wood', note: { vi: 'Cái cây có rễ và cành.', en: 'A tree with roots and branches.', zh: '像一棵有根有枝的树。' } },
      { label: '大', text: '大', pron: 'dà', vi: 'to', en: 'big', note: { vi: 'Người dang rộng tay.', en: 'A person with arms spread wide.', zh: '像一个张开双臂的人。' } },
      { label: '小', text: '小', pron: 'xiǎo', vi: 'nhỏ', en: 'small', note: { vi: 'Những hạt nhỏ.', en: 'Little grains.', zh: '像几粒小小的颗粒。' } },
    ] },
    { kind: 'words', title: { vi: 'Số đếm 0–10', en: 'Numbers 0–10', zh: '数字0–10' }, wordIds: ['ling', 'yi', 'er', 'san', 'si', 'wu', 'liu', 'qi', 'ba', 'jiu', 'shi2'] },
    { kind: 'text', title: { vi: 'Ghép số 11–99', en: 'Building numbers 11–99', zh: '组成数字11–99' }, body: [
      { vi: '11–19: 十 + số: 十一 shíyī (11), 十五 shíwǔ (15).', en: '11–19: 十 + digit: 十一 shíyī (11), 十五 shíwǔ (15).', zh: '11–19：十 + 数字：十一 shíyī（11），十五 shíwǔ（15）。' },
      { vi: 'Hàng chục: số + 十: 二十 èrshí (20), 五十 wǔshí (50).', en: 'Tens: digit + 十: 二十 èrshí (20), 五十 wǔshí (50).', zh: '整十：数字 + 十：二十 èrshí（20），五十 wǔshí（50）。' },
      { vi: 'Số bất kỳ: số + 十 + số: 二十五 èrshíwǔ (25), 九十九 jiǔshíjiǔ (99).', en: 'Any number: digit + 十 + digit: 二十五 èrshíwǔ (25), 九十九 jiǔshíjiǔ (99).', zh: '其他数字：数字 + 十 + 数字：二十五 èrshíwǔ（25），九十九 jiǔshíjiǔ（99）。' },
      { vi: 'Cách ghép giống hệt "hai mươi lăm" trong tiếng Việt!', en: 'It works exactly like Vietnamese "hai mươi lăm" (two-ten-five), or English "twenty-five"!', zh: '组成方法和越南语的“hai mươi lăm”（二十五）完全一样！' },
    ] },
    { kind: 'examples', title: { vi: 'Ví dụ', en: 'Examples', zh: '例子' }, examples: [
      { text: '十八', pron: 'shíbā', vi: '18', en: '18' },
      { text: '三十六', pron: 'sānshíliù', vi: '36', en: '36' },
      { text: '二零二六年', pron: 'èr líng èr liù nián', vi: 'năm 2026 (đọc từng chữ số)', en: 'the year 2026 (read digit by digit)' },
    ] },
    { kind: 'words', title: { vi: 'Từ mới khác', en: 'More new words', zh: '其他生词' }, wordIds: ['ren', 'da', 'xiao'] },
    {
      kind: 'strokes',
      title: { vi: 'Luyện viết: thứ tự nét', en: 'Writing practice: stroke order', zh: '书写练习：笔顺' },
      intro: {
        vi: 'Bấm "Xem cách viết" để xem từng nét theo đúng thứ tự, rồi chọn "Luyện viết" và tự tô bằng chuột hoặc ngón tay. Viết sai vài lần, ứng dụng sẽ gợi ý nét tiếp theo.',
        en: 'Press "Animate" to watch each stroke in the right order, then choose "Practice" and trace it yourself with the mouse or your finger. After a few mistakes, the app hints at the next stroke.',
        zh: '点“演示笔顺”按正确顺序观看每一笔，然后选择“练习书写”，用鼠标或手指自己描写。写错几次后，应用会提示下一笔。',
      },
      chars: ['一', '二', '三', '十', '八', '人', '口', '山', '日', '月', '木', '大', '小'],
    },
  ],
  wordIds: ['ling', 'yi', 'er', 'san', 'si', 'wu', 'liu', 'qi', 'ba', 'jiu', 'shi2', 'ren', 'da', 'xiao'],
  grammarIds: [],
  practice: [
    choice('d4-p1', 'reading',
      { seq: [{ vi: 'Chữ nào nghĩa là "', en: 'Which character means "', zh: '哪个字的意思是“' }, { vi: 'núi', en: 'mountain' }, { vi: '"?', en: '"?', zh: '”？' }] },
      ['山', '人', '口', '日'], 0,
      { vi: '山 shān giống ba đỉnh núi.', en: '山 shān looks like three mountain peaks.', zh: '山 shān 像三座山峰。' },
      { targetOptions: true }),
    listen('d4-p2', '七', ['qī', 'jī', 'xī', 'chī'], 0, '七 qī = 7.', { skill: 'pronunciation', wordIds: ['qi'] }),
    choice('d4-p3', 'reading', { vi: 'Số 25 viết thế nào?', en: 'How do you write 25?', zh: '25怎么写？' }, ['二十五', '五十二', '二五', '十二五'], 0, '25 = 二 (2) + 十 (10) + 五 (5).', { targetOptions: true, wordIds: ['er', 'shi2', 'wu'] }),
    hanzi('d4-p4', { vi: 'Viết chữ Hán cho số 8', en: 'Write the character for 8', zh: '写出数字8的汉字' }, ['八'], '8 = 八 bā.', ['ba']),
    { id: 'd4-p5', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
      { text: '三', pron: 'sān', vi: '3', en: '3' }, { text: '六', pron: 'liù', vi: '6', en: '6' }, { text: '九', pron: 'jiǔ', vi: '9', en: '9' }, { text: '十', pron: 'shí', vi: '10', en: '10' },
    ], explanation: '三 sān = 3 · 六 liù = 6 · 九 jiǔ = 9 · 十 shí = 10.', wordIds: ['san', 'liu', 'jiu', 'shi2'] },
    choice('d4-p6', 'writing', { vi: 'Theo quy tắc, chữ 十 viết nét nào trước?', en: 'By the rules, which stroke of 十 comes first?', zh: '按照笔顺规则，十 先写哪一笔？' },
      [{ vi: 'Nét ngang', en: 'Horizontal stroke', zh: '横' }, { vi: 'Nét sổ', en: 'Vertical stroke', zh: '竖' }], 0,
      { vi: 'Quy tắc: ngang trước, sổ sau.', en: 'Rule: horizontal before vertical.', zh: '规则：先横后竖。' }, { text: '十' }),
    pinyin('d4-p7', '四', { vi: 'số 4', en: 'number 4' }, ['sì'], { vi: '四 sì (thanh 4).', en: '四 sì (4th tone).', zh: '四 sì（第四声）。' }, ['si']),
  ],
  quiz: [
    listen('d4-q1', '九', ['jiǔ', 'liù', 'qī', 'shí'], 0, '九 jiǔ = 9.', { wordIds: ['jiu'] }),
    choice('d4-q2', 'reading', { vi: '三十八 là số mấy?', en: 'What number is 三十八?', zh: '三十八是多少？' }, ['38', '83', '308', '11'], 0, '三十八 = 3 × 10 + 8 = 38.', { text: '三十八', pron: 'sānshíbā', wordIds: ['san', 'shi2', 'ba'] }),
    choice('d4-q3', 'vocabulary', { k: 'ex.chooseMeaning' },
      [{ vi: 'người', en: 'person' }, { vi: 'miệng', en: 'mouth' }, { vi: 'to', en: 'big' }, { vi: 'nhỏ', en: 'small' }], 0,
      { seq: ['人 rén = ', { vi: 'người', en: 'person' }, '.'] }, { text: '人', pron: 'rén', wordIds: ['ren'] }),
    hanzi('d4-q4', { vi: 'Viết số 10 bằng chữ Hán', en: 'Write the number 10 in Chinese characters', zh: '用汉字写出数字10' }, ['十'], '10 = 十 shí.', ['shi2']),
    choice('d4-q5', 'reading',
      { seq: [{ vi: 'Chữ giản thể của 馬 (', en: 'What is the simplified form of 馬 (', zh: '馬（' }, { vi: 'ngựa', en: 'horse' }, { vi: ') là chữ nào?', en: ')?', zh: '）的简体字是哪个？' }] },
      ['马', '妈', '骂', '吗'], 0,
      { vi: '馬 (phồn thể) → 马 (giản thể).', en: '馬 (traditional) → 马 (simplified).', zh: '馬（繁体字）→ 马（简体字）。' }, { targetOptions: true, wordIds: ['ma3'] }),
    pinyin('d4-q6', '小', { vi: 'nhỏ', en: 'small' }, ['xiǎo'], { vi: '小 xiǎo (thanh 3).', en: '小 xiǎo (3rd tone).', zh: '小 xiǎo（第三声）。' }, ['xiao']),
    listen('d4-q7', '零', ['0', '1', '6', '10'], 0, '零 líng = 0.', { wordIds: ['ling'] }),
  ],
  summary: [
    { vi: 'Chữ giản thể là chữ đã được đơn giản hóa (马 ← 馬).', en: 'Simplified characters are characters that have been simplified (马 ← 馬).', zh: '简体字是经过简化的汉字（马 ← 馬）。' },
    {
      vi: 'Thứ tự nét: ngang trước sổ sau, phẩy trước mác sau, trên trước dưới sau, trái trước phải sau, ngoài trước trong sau.',
      en: 'Stroke order: horizontal before vertical, left-falling before right-falling, top before bottom, left before right, outside before inside.',
      zh: '笔顺：先横后竖，先撇后捺，从上到下，从左到右，先外后内。',
    },
    { vi: 'Số 0–10: 零 一 二 三 四 五 六 七 八 九 十.', en: 'Numbers 0–10: 零 一 二 三 四 五 六 七 八 九 十.', zh: '数字0–10：零 一 二 三 四 五 六 七 八 九 十。' },
    { vi: 'Ghép số giống tiếng Việt: 二十五 = hai mươi lăm.', en: 'Numbers are built like in Vietnamese: 二十五 = hai mươi lăm (twenty-five).', zh: '数字的组成方法和越南语一样：二十五 = hai mươi lăm。' },
  ],
};
