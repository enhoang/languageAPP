import type { Lesson } from '../../../types';
import { MATCH_PROMPT, choice, listen, pinyin } from './helpers';
import { TONES } from '../sounds';

export const D1: Lesson = {
  id: 'd1', day: 1, stage: 1, minutes: 15, prerequisites: [],
  title: {
    vi: 'Làm quen tiếng Phổ thông & bốn thanh điệu',
    en: 'Meet Mandarin & the four tones',
    zh: '认识普通话和四个声调',
  },
  subtitle: {
    vi: 'Pinyin là gì · 4 thanh + thanh nhẹ · nghe mā má mǎ mà',
    en: 'What pinyin is · 4 tones + neutral tone · hear mā má mǎ mà',
    zh: '什么是拼音 · 四个声调和轻声 · 听 mā má mǎ mà',
  },
  objectives: [
    {
      vi: 'Hiểu tiếng Phổ thông (普通话) và Pinyin là gì.',
      en: 'Understand what Mandarin (普通话) and pinyin are.',
      zh: '了解什么是普通话和拼音。',
    },
    {
      vi: 'Nhận biết 4 thanh điệu và thanh nhẹ, cách viết dấu thanh.',
      en: 'Recognize the 4 tones and the neutral tone, and how tone marks are written.',
      zh: '认识四个声调和轻声，学会标声调符号。',
    },
    {
      vi: 'Nghe và phân biệt mā – má – mǎ – mà – ma.',
      en: 'Hear and tell apart mā – má – mǎ – mà – ma.',
      zh: '听辨 mā – má – mǎ – mà – ma。',
    },
    {
      vi: 'Biết dùng nút nghe 🔊 và nghe chậm 🐢.',
      en: 'Use the listen 🔊 and slow listen 🐢 buttons.',
      zh: '会使用播放 🔊 和慢速播放 🐢 按钮。',
    },
  ],
  intro: [
    {
      vi: 'Tiếng Trung phổ thông (普通话 pǔtōnghuà) là ngôn ngữ chuẩn của Trung Quốc, dựa trên cách phát âm của Bắc Kinh. Ứng dụng này dùng chữ Hán giản thể (简体字) — loại chữ dùng ở Trung Quốc đại lục.',
      en: 'Mandarin (普通话 pǔtōnghuà) is the standard language of China, based on Beijing pronunciation. This app uses simplified Chinese characters (简体字), the script used in mainland China.',
      zh: '普通话（pǔtōnghuà）是中国的标准语言，以北京语音为标准音。本应用使用简体字，也就是中国大陆使用的汉字。',
    },
    {
      vi: 'Pinyin (拼音 pīnyīn) là hệ thống ghi âm tiếng Trung bằng chữ cái Latin. Mỗi âm tiết gồm: thanh mẫu (phụ âm đầu) + vận mẫu (phần vần) + thanh điệu. Ví dụ: m + a + thanh 1 = mā.',
      en: 'Pinyin (拼音 pīnyīn) is the system for writing Chinese sounds with Latin letters. Each syllable has an initial (first consonant) + a final (the rhyme) + a tone. For example: m + a + tone 1 = mā.',
      zh: '拼音（pīnyīn）是用拉丁字母给汉语注音的系统。每个音节由声母（开头的辅音）+ 韵母 + 声调组成。例如：m + a + 第一声 = mā。',
    },
    {
      vi: 'Giống tiếng Việt, tiếng Trung có thanh điệu: đổi thanh là đổi nghĩa. mā (妈) là "mẹ", còn mǎ (马) là "con ngựa".',
      en: 'Like Vietnamese, Chinese has tones: change the tone and you change the meaning. mā (妈) means "mother", while mǎ (马) means "horse".',
      zh: '和越南语一样，汉语有声调：声调不同，意思就不同。mā（妈）是“妈妈”，mǎ（马）是“马”。',
    },
    {
      vi: 'Tin vui cho người Việt: tiếng Việt đã có 6 thanh, nên bạn quen với việc nghe thanh điệu hơn nhiều người học khác.',
      en: 'Good news for Vietnamese speakers: Vietnamese already has 6 tones, so you are more used to hearing tones than many other learners.',
      zh: '对越南人来说是个好消息：越南语本来就有六个声调，所以你比很多其他学习者更习惯听声调。',
    },
  ],
  sections: [
    {
      kind: 'sounds',
      title: { vi: 'Bốn thanh điệu và thanh nhẹ', en: 'The four tones and the neutral tone', zh: '四个声调和轻声' },
      intro: {
        vi: 'Bấm vào từng thẻ để nghe. Nghe nhiều lần, rồi đọc theo.',
        en: 'Tap each card to listen. Listen several times, then repeat aloud.',
        zh: '点击每张卡片收听。多听几遍，然后跟着读。',
      },
      items: TONES,
    },
    {
      kind: 'text',
      title: { vi: 'Cách viết dấu thanh', en: 'Writing tone marks', zh: '怎样标声调' },
      body: [
        {
          vi: 'Dấu thanh đặt trên nguyên âm chính: nếu có a hoặc e thì đặt trên a/e (hǎo, xiè); với ou đặt trên o (kǒu); các trường hợp còn lại đặt trên nguyên âm đứng sau (duì, liù).',
          en: 'The tone mark goes on the main vowel: if there is an a or e, put it on the a/e (hǎo, xiè); in ou it goes on the o (kǒu); otherwise it goes on the second vowel (duì, liù).',
          zh: '声调符号标在主要元音上：有 a 或 e 时标在 a/e 上（hǎo, xiè）；ou 标在 o 上（kǒu）；其他情况标在后面的元音上（duì, liù）。',
        },
        {
          vi: 'Thanh nhẹ không có dấu: māma, bàba.',
          en: 'The neutral tone has no mark: māma, bàba.',
          zh: '轻声不标调：māma, bàba。',
        },
        {
          vi: 'Trong ứng dụng, bạn có thể gõ pinyin bằng dấu (mǎ) hoặc bằng số (ma3). Thanh nhẹ không cần số (hoặc dùng số 5).',
          en: 'In this app you can type pinyin with tone marks (mǎ) or with numbers (ma3). The neutral tone needs no number (or use 5).',
          zh: '在本应用中，拼音可以带声调符号输入（mǎ），也可以用数字输入（ma3）。轻声不用加数字（也可以用 5）。',
        },
      ],
    },
    {
      kind: 'sounds',
      title: { vi: 'Luyện thêm: một âm tiết, bốn thanh', en: 'More practice: one syllable, four tones', zh: '再练一练：一个音节，四个声调' },
      items: [
        { label: 'bā', text: '八', pron: 'bā', vi: 'tám', en: 'eight' },
        { label: 'bá', text: '拔', pron: 'bá', vi: 'nhổ', en: 'to pull out' },
        { label: 'bǎ', text: '把', pron: 'bǎ', vi: 'cầm, nắm', en: 'to hold, to grasp' },
        { label: 'bà', text: '爸', pron: 'bà', vi: 'bố', en: 'dad' },
      ],
    },
    {
      kind: 'tip',
      title: { vi: 'Cách dùng âm thanh', en: 'Using audio', zh: '如何使用语音' },
      body: {
        vi: 'Bấm 🔊 để nghe tốc độ thường, 🐢 để nghe chậm. Giọng đọc do trình duyệt cung cấp (Web Speech API). Nếu không nghe thấy gì, vào Cài đặt → Âm thanh để kiểm tra giọng tiếng Trung.',
        en: 'Tap 🔊 to listen at normal speed, 🐢 to listen slowly. The voice is provided by your browser (Web Speech API). If you hear nothing, go to Settings → Audio to check the Chinese voice.',
        zh: '点 🔊 正常速度播放，点 🐢 慢速播放。语音由浏览器提供（Web Speech API）。如果听不到声音，请到“设置 → 语音”检查中文语音。',
      },
    },
    { kind: 'words', title: { vi: 'Từ mới', en: 'New words', zh: '生词' }, wordIds: ['mama', 'baba', 'ma3'] },
    {
      kind: 'speak',
      title: { vi: 'Luyện nói: bốn thanh điệu', en: 'Speaking practice: the four tones', zh: '口语练习：四个声调' },
      intro: {
        vi: 'Đọc to từng âm tiết, chú ý cao độ của thanh. Nghe mẫu trước, rồi nói theo.',
        en: 'Say each syllable aloud, paying attention to the pitch of the tone. Listen to the model first, then repeat.',
        zh: '大声读出每个音节，注意声调的高低。先听示范，再跟着说。',
      },
      items: [
        { text: '妈', pron: 'mā', vi: 'mẹ (thanh 1: cao, bằng)', en: 'mother (tone 1: high and level)' },
        { text: '麻', pron: 'má', vi: 'cây gai; tê (thanh 2: đi lên)', en: 'hemp; numb (tone 2: rising)' },
        { text: '马', pron: 'mǎ', vi: 'con ngựa (thanh 3: xuống rồi lên)', en: 'horse (tone 3: dipping)' },
        { text: '骂', pron: 'mà', vi: 'mắng (thanh 4: đi xuống mạnh)', en: 'to scold (tone 4: falling)' },
        { text: '妈妈', pron: 'māma', vi: 'mẹ (âm tiết sau thanh nhẹ)', en: 'mom (second syllable in the neutral tone)' },
        { text: '爸爸', pron: 'bàba', vi: 'bố', en: 'dad' },
      ],
    },
  ],
  wordIds: ['mama', 'baba', 'ma3'],
  grammarIds: [],
  practice: [
    listen('d1-p1', '妈', ['mā', 'má', 'mǎ', 'mà'], 0, {
      vi: '妈 đọc là mā — thanh 1, cao và đều.',
      en: '妈 is read mā — tone 1, high and level.',
      zh: '妈读 mā，第一声，又高又平。',
    }, { skill: 'pronunciation' }),
    listen('d1-p2', '马', ['mā', 'má', 'mǎ', 'mà'], 2, {
      vi: '马 đọc là mǎ — thanh 3, xuống thấp rồi lên.',
      en: '马 is read mǎ — tone 3, dips low then rises.',
      zh: '马读 mǎ，第三声，先降后升。',
    }, { skill: 'pronunciation', wordIds: ['ma3'] }),
    choice('d1-p3', 'pronunciation', {
      vi: 'Âm tiết "mà" mang thanh mấy?',
      en: 'What tone does the syllable "mà" have?',
      zh: '音节“mà”是第几声？',
    }, [
      { vi: 'Thanh 1', en: 'Tone 1', zh: '第一声' },
      { vi: 'Thanh 2', en: 'Tone 2', zh: '第二声' },
      { vi: 'Thanh 3', en: 'Tone 3', zh: '第三声' },
      { vi: 'Thanh 4', en: 'Tone 4', zh: '第四声' },
    ], 3, {
      vi: 'Dấu ˋ là thanh 4 — rơi mạnh từ cao xuống thấp.',
      en: 'The mark ˋ is tone 4 — it falls sharply from high to low.',
      zh: '符号 ˋ 是第四声，从高处快速降到低处。',
    }),
    listen('d1-p4', '爸', ['bā', 'bá', 'bǎ', 'bà'], 3, {
      vi: '爸 đọc là bà — thanh 4.',
      en: '爸 is read bà — tone 4.',
      zh: '爸读 bà，第四声。',
    }, { skill: 'pronunciation' }),
    { id: 'd1-p5', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
      { text: '妈妈', pron: 'māma', vi: 'mẹ', en: 'mom' },
      { text: '爸爸', pron: 'bàba', vi: 'bố', en: 'dad' },
      { text: '马', pron: 'mǎ', vi: 'con ngựa', en: 'horse' },
    ], explanation: { seq: [
      '妈妈 māma = ', { vi: 'mẹ', en: 'mom' },
      ' · 爸爸 bàba = ', { vi: 'bố', en: 'dad' },
      ' · 马 mǎ = ', { vi: 'con ngựa', en: 'horse' }, '.',
    ] }, wordIds: ['mama', 'baba', 'ma3'] },
    pinyin('d1-p6', '妈妈', { vi: 'mẹ', en: 'mom' }, ['māma'], {
      vi: '妈妈 = mā + ma (thanh nhẹ). Gõ số: ma1ma.',
      en: '妈妈 = mā + ma (neutral tone). With numbers: ma1ma.',
      zh: '妈妈 = mā + ma（轻声）。用数字输入：ma1ma。',
    }, ['mama']),
  ],
  quiz: [
    listen('d1-q1', '麻', ['mā', 'má', 'mǎ', 'mà'], 1, {
      vi: '麻 đọc là má — thanh 2, đi lên.',
      en: '麻 is read má — tone 2, rising.',
      zh: '麻读 má，第二声，往上升。',
    }, { skill: 'pronunciation' }),
    listen('d1-q2', '骂', ['mā', 'má', 'mǎ', 'mà'], 3, {
      vi: '骂 đọc là mà — thanh 4, rơi xuống.',
      en: '骂 is read mà — tone 4, falling.',
      zh: '骂读 mà，第四声，往下降。',
    }, { skill: 'pronunciation' }),
    choice('d1-q3', 'vocabulary', { seq: [
      { vi: 'Từ nào nghĩa là "', en: 'Which word means "', zh: '哪个词的意思是“' },
      { vi: 'con ngựa', en: 'horse' },
      { vi: '"?', en: '"?', zh: '”？' },
    ] },
      ['马 mǎ', '妈 mā', '骂 mà', '麻 má'], 0, { seq: [
        '马 mǎ = ', { vi: 'con ngựa', en: 'horse' }, ' (', { vi: 'thanh 3', en: 'tone 3', zh: '第三声' }, ').',
      ] }, { wordIds: ['ma3'] }),
    choice('d1-q4', 'pronunciation', {
      vi: 'Thanh 3 có đường nét như thế nào?',
      en: 'What is the shape of tone 3?',
      zh: '第三声的调型是怎样的？',
    }, [
      { vi: 'Cao và đều', en: 'High and level', zh: '又高又平' },
      { vi: 'Đi lên', en: 'Rising', zh: '往上升' },
      { vi: 'Xuống thấp rồi lên', en: 'Dips low, then rises', zh: '先降后升' },
      { vi: 'Rơi mạnh xuống', en: 'Falls sharply', zh: '快速下降' },
    ], 2, {
      vi: 'Thanh 3 (ˇ) xuống thấp rồi lên (214).',
      en: 'Tone 3 (ˇ) dips low, then rises (214).',
      zh: '第三声（ˇ）先降后升（214）。',
    }),
    pinyin('d1-q5', '爸爸', { vi: 'bố', en: 'dad' }, ['bàba'], {
      vi: '爸爸 = bà + ba (thanh nhẹ). Gõ số: ba4ba.',
      en: '爸爸 = bà + ba (neutral tone). With numbers: ba4ba.',
      zh: '爸爸 = bà + ba（轻声）。用数字输入：ba4ba。',
    }, ['baba']),
    choice('d1-q6', 'vocabulary', { vi: 'Pinyin là gì?', en: 'What is pinyin?', zh: '拼音是什么？' }, [
      { vi: 'Hệ thống ghi âm tiếng Trung bằng chữ Latin', en: 'A system for writing Chinese sounds in Latin letters', zh: '用拉丁字母给汉语注音的系统' },
      { vi: 'Một kiểu chữ Hán giản thể', en: 'A style of simplified Chinese characters', zh: '一种简体汉字字体' },
      { vi: 'Tên một thành phố', en: 'The name of a city', zh: '一个城市的名字' },
      { vi: 'Một loại thanh điệu', en: 'A kind of tone', zh: '一种声调' },
    ], 0, {
      vi: 'Pinyin (拼音) dùng chữ cái Latin để ghi cách đọc chữ Hán.',
      en: 'Pinyin (拼音) uses Latin letters to write how Chinese characters are pronounced.',
      zh: '拼音用拉丁字母标注汉字的读音。',
    }),
  ],
  summary: [
    {
      vi: 'Tiếng Phổ thông có 4 thanh + thanh nhẹ: mā (cao đều), má (đi lên), mǎ (xuống rồi lên), mà (rơi xuống), ma (nhẹ).',
      en: 'Mandarin has 4 tones + the neutral tone: mā (high, level), má (rising), mǎ (dips then rises), mà (falling), ma (light).',
      zh: '普通话有四个声调和轻声：mā（高平）、má（上升）、mǎ（先降后升）、mà（下降）、ma（轻声）。',
    },
    {
      vi: 'Pinyin = thanh mẫu + vận mẫu + thanh điệu.',
      en: 'Pinyin = initial + final + tone.',
      zh: '拼音 = 声母 + 韵母 + 声调。',
    },
    {
      vi: 'Đổi thanh là đổi nghĩa: 妈 mā (mẹ) ≠ 马 mǎ (ngựa).',
      en: 'A different tone means a different word: 妈 mā (mother) ≠ 马 mǎ (horse).',
      zh: '声调不同，意思不同：妈 mā（妈妈）≠ 马 mǎ（马）。',
    },
    {
      vi: 'Từ mới: 妈妈 māma, 爸爸 bàba, 马 mǎ.',
      en: 'New words: 妈妈 māma, 爸爸 bàba, 马 mǎ.',
      zh: '生词：妈妈 māma、爸爸 bàba、马 mǎ。',
    },
  ],
};
