import type { Lesson } from '../../../types';
import { MATCH_PROMPT, arrange, choice, listen, pinyin } from './helpers';
import { FINAL_GROUPS } from '../sounds';

export const D3: Lesson = {
  id: 'd3', day: 3, stage: 1, minutes: 18, prerequisites: ['d2'],
  title: {
    vi: 'Vận mẫu & quy tắc biến điệu',
    en: 'Finals & tone sandhi',
    zh: '韵母和变调规则',
  },
  subtitle: {
    vi: 'a o e i u ü · vần kép, vần mũi · 3+3 → 2+3 · 你好',
    en: 'a o e i u ü · compound and nasal finals · 3+3 → 2+3 · 你好',
    zh: 'a o e i u ü · 复韵母、鼻韵母 · 3+3 → 2+3 · 你好',
  },
  objectives: [
    {
      vi: 'Biết 6 vận mẫu đơn a, o, e, i, u, ü và cách viết y, w, yu.',
      en: 'Know the 6 simple finals a, o, e, i, u, ü and the spellings y, w, yu.',
      zh: '认识六个单韵母 a, o, e, i, u, ü，以及 y, w, yu 的写法。',
    },
    {
      vi: 'Nghe và phân biệt vần mũi -n / -ng.',
      en: 'Hear and tell apart the nasal finals -n / -ng.',
      zh: '听辨鼻韵母 -n 和 -ng。',
    },
    {
      vi: 'Nắm quy tắc biến điệu thanh 3 + thanh 3.',
      en: 'Learn the tone sandhi rule for tone 3 + tone 3.',
      zh: '掌握“第三声 + 第三声”的变调规则。',
    },
    {
      vi: 'Chào hỏi và cảm ơn: 你好, 谢谢.',
      en: 'Say hello and thank you: 你好, 谢谢.',
      zh: '学会打招呼和道谢：你好、谢谢。',
    },
  ],
  intro: [
    {
      vi: 'Vận mẫu là phần vần, đứng sau thanh mẫu. Có 6 vận mẫu đơn: a, o, e, i, u, ü. Từ đó ghép thành vận mẫu kép (ai, ei, ao, ou…) và vận mẫu mũi (an, en, ang, eng, ong…).',
      en: 'A final is the rhyme part that comes after the initial. There are 6 simple finals: a, o, e, i, u, ü. They combine into compound finals (ai, ei, ao, ou…) and nasal finals (an, en, ang, eng, ong…).',
      zh: '韵母是音节中声母后面的部分。单韵母有六个：a, o, e, i, u, ü。它们可以组成复韵母（ai, ei, ao, ou…）和鼻韵母（an, en, ang, eng, ong…）。',
    },
    {
      vi: 'Âm "e" đọc giữa "ơ" và "ưa" (喝 hē). Âm "ü" đọc như "uy" khi chu tròn môi (鱼 yú).',
      en: 'The "e" sounds between Vietnamese "ơ" and "ưa" (喝 hē). The "ü" sounds like Vietnamese "uy" with rounded lips (鱼 yú) — like German ü or French u.',
      zh: '“e”的读音介于越南语的“ơ”和“ưa”之间（喝 hē）。“ü”像越南语的“uy”，发音时嘴唇要撮圆（鱼 yú）。',
    },
    {
      vi: 'Quy tắc viết: khi không có thanh mẫu, i → yi/y, u → wu/w, ü → yu. Sau j, q, x, y thì ü viết thành u nhưng vẫn đọc là ü: ju, qu, xu, yu.',
      en: 'Spelling rules: with no initial, i → yi/y, u → wu/w, ü → yu. After j, q, x, y, ü is written u but still pronounced ü: ju, qu, xu, yu.',
      zh: '拼写规则：没有声母时，i 写成 yi/y，u 写成 wu/w，ü 写成 yu。在 j, q, x, y 后面，ü 写成 u，但仍然读 ü：ju, qu, xu, yu。',
    },
  ],
  sections: [
    ...FINAL_GROUPS.map((g) => ({ kind: 'sounds' as const, title: g.title, items: g.items })),
    {
      kind: 'text',
      title: { vi: 'Biến điệu: thanh 3 + thanh 3', en: 'Tone sandhi: tone 3 + tone 3', zh: '变调：第三声 + 第三声' },
      body: [
        {
          vi: 'Khi hai âm tiết thanh 3 đứng liền nhau, âm tiết đầu đọc thành thanh 2: 你好 nǐ hǎo → đọc ní hǎo; 很好 hěn hǎo → đọc hén hǎo.',
          en: 'When two tone-3 syllables come together, the first one is said as tone 2: 你好 nǐ hǎo → said ní hǎo; 很好 hěn hǎo → said hén hǎo.',
          zh: '两个第三声音节连在一起时，第一个读成第二声：你好 nǐ hǎo 读成 ní hǎo；很好 hěn hǎo 读成 hén hǎo。',
        },
        {
          vi: 'Pinyin vẫn viết dấu gốc (nǐ hǎo) — chỉ khi nói mới đổi.',
          en: 'Pinyin still shows the original tones (nǐ hǎo) — the change only happens in speech.',
          zh: '拼音仍然标原来的声调（nǐ hǎo），只有说话时才变调。',
        },
        {
          vi: 'Thanh 3 đứng trước thanh 1, 2, 4 thường chỉ đọc nửa đầu (xuống thấp, không lên lại).',
          en: 'Before tones 1, 2 and 4, tone 3 is usually only half pronounced (it dips low and does not rise again).',
          zh: '第三声在第一、二、四声前面时，通常只读前半部分（降下去，不再升上来）。',
        },
      ],
    },
    {
      kind: 'examples',
      title: { vi: 'Câu ví dụ', en: 'Example sentences', zh: '例句' },
      examples: [
        { text: '你好！', pron: 'Nǐ hǎo!', vi: 'Xin chào!', en: 'Hello!' },
        { text: '很好！', pron: 'Hěn hǎo!', vi: 'Rất tốt!', en: 'Very good!' },
        { text: '爸爸很好。', pron: 'Bàba hěn hǎo.', vi: 'Bố rất khỏe.', en: 'Dad is very well.' },
        { text: '谢谢妈妈！', pron: 'Xièxie māma!', vi: 'Con cảm ơn mẹ!', en: 'Thank you, Mom!' },
      ],
    },
    { kind: 'words', title: { vi: 'Từ mới', en: 'New words', zh: '生词' }, wordIds: ['hao', 'nihao', 'hen', 'shui', 'yu', 'xiexie'] },
    {
      kind: 'speak',
      title: { vi: 'Luyện nói: chào hỏi và cảm ơn', en: 'Speaking practice: greetings and thanks', zh: '口语练习：问候和感谢' },
      intro: {
        vi: 'Nói to các câu sau. Nhớ biến điệu: 你好 đọc thành ní hǎo, 很好 đọc thành hén hǎo.',
        en: 'Say these phrases aloud. Remember the tone sandhi: 你好 is said ní hǎo, 很好 is said hén hǎo.',
        zh: '大声说出下面的句子。注意变调：你好读作 ní hǎo，很好读作 hén hǎo。',
      },
      items: [
        { text: '你好！', pron: 'Nǐ hǎo!', vi: 'Xin chào!', en: 'Hello!' },
        { text: '谢谢！', pron: 'Xièxie!', vi: 'Cảm ơn!', en: 'Thanks!' },
        { text: '很好！', pron: 'Hěn hǎo!', vi: 'Rất tốt!', en: 'Very good!' },
        { text: '妈妈，你好！', pron: 'Māma, nǐ hǎo!', vi: 'Con chào mẹ!', en: 'Hello, Mom!' },
        { text: '谢谢爸爸！', pron: 'Xièxie bàba!', vi: 'Con cảm ơn bố!', en: 'Thank you, Dad!' },
        { text: '我喝水。', pron: 'Wǒ hē shuǐ.', vi: 'Tôi uống nước.', en: 'I drink water.' },
      ],
    },
  ],
  wordIds: ['hao', 'nihao', 'hen', 'shui', 'yu', 'xiexie'],
  grammarIds: [],
  practice: [
    listen('d3-p1', '鱼', ['yú', 'yí', 'wú', 'yǔ'], 0, { seq: [
      '鱼 yú = ', { vi: 'cá', en: 'fish' }, '. ',
      { vi: 'ü đứng một mình viết là yu.', en: 'On its own, ü is written yu.', zh: 'ü 单独成音节时写成 yu。' },
    ] }, { skill: 'pronunciation', wordIds: ['yu'] }),
    choice('d3-p2', 'pronunciation', {
      vi: 'Trong "ju, qu, xu", chữ u thật ra là âm gì?',
      en: 'In "ju, qu, xu", what sound is the u really?',
      zh: '在“ju, qu, xu”中，u 实际上是什么音？',
    }, ['ü', 'u', 'i', 'o'], 0, {
      vi: 'Sau j, q, x, y, chữ ü được viết thành u (bỏ hai chấm) nhưng vẫn đọc là ü.',
      en: 'After j, q, x, y, ü is written u (the two dots are dropped) but is still pronounced ü.',
      zh: '在 j, q, x, y 后面，ü 写成 u（去掉两点），但仍然读 ü。',
    }),
    choice('d3-p3', 'pronunciation', {
      vi: '你好 khi nói được đọc thế nào?',
      en: 'How is 你好 pronounced in speech?',
      zh: '“你好”说的时候怎么读？',
    }, [
      'ní hǎo',
      { vi: 'nǐ hǎo (đủ hai thanh 3)', en: 'nǐ hǎo (two full tone 3s)', zh: 'nǐ hǎo（两个完整的第三声）' },
      'nì hāo',
      'nǐ hāo',
    ], 0, {
      vi: 'Thanh 3 + thanh 3 → âm đầu đọc thành thanh 2: ní hǎo.',
      en: 'Tone 3 + tone 3 → the first syllable becomes tone 2: ní hǎo.',
      zh: '第三声 + 第三声 → 第一个音节读成第二声：ní hǎo。',
    }, { wordIds: ['nihao'] }),
    listen('d3-p4', '星', ['xīn', 'xīng'], 1, { seq: [
      '星 xīng (', { vi: 'sao', en: 'star' }, ') ', { vi: 'có vần mũi -ng; ', en: 'has the nasal final -ng; ', zh: '是后鼻韵母 -ng；' },
      '心 xīn (', { vi: 'tim', en: 'heart' }, ') ', { vi: 'có -n.', en: 'has -n.', zh: '是前鼻韵母 -n。' },
    ] }, { skill: 'pronunciation' }),
    { id: 'd3-p5', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
      { text: '水', pron: 'shuǐ', vi: 'nước', en: 'water' },
      { text: '鱼', pron: 'yú', vi: 'cá', en: 'fish' },
      { text: '谢谢', pron: 'xièxie', vi: 'cảm ơn', en: 'thank you' },
      { text: '很', pron: 'hěn', vi: 'rất', en: 'very' },
    ], explanation: { seq: [
      '水 shuǐ = ', { vi: 'nước', en: 'water' },
      ' · 鱼 yú = ', { vi: 'cá', en: 'fish' },
      ' · 谢谢 xièxie = ', { vi: 'cảm ơn', en: 'thank you' },
      ' · 很 hěn = ', { vi: 'rất', en: 'very' }, '.',
    ] }, wordIds: ['shui', 'yu', 'xiexie', 'hen'] },
    pinyin('d3-p6', '谢谢', { vi: 'cảm ơn', en: 'thank you' }, ['xièxie'], {
      vi: '谢谢 = xiè + xie (thanh nhẹ).',
      en: '谢谢 = xiè + xie (neutral tone).',
      zh: '谢谢 = xiè + xie（轻声）。',
    }, ['xiexie']),
    arrange('d3-p7', { vi: 'Bố rất khỏe.', en: 'Dad is very well.' }, ['爸爸', '很', '好'], { seq: [
      '爸爸 (', { vi: 'bố', en: 'dad' }, ') + 很 (', { vi: 'rất', en: 'very' }, ') + 好 (', { vi: 'khỏe', en: 'well' }, ').',
    ] }, ['baba', 'hen', 'hao']),
  ],
  quiz: [
    listen('d3-q1', '山', ['shān', 'shāng'], 0, { seq: [
      '山 shān (', { vi: 'núi', en: 'mountain' }, '): ', { vi: 'vần -an.', en: 'final -an.', zh: '韵母 -an。' },
    ] }, { skill: 'pronunciation' }),
    listen('d3-q2', '门', ['mén', 'méng'], 0, { seq: [
      '门 mén (', { vi: 'cửa', en: 'door' }, '): ', { vi: 'vần -en.', en: 'final -en.', zh: '韵母 -en。' },
    ] }, { skill: 'pronunciation' }),
    choice('d3-q3', 'pronunciation', {
      vi: '很好 khi nói đọc thành:',
      en: 'In speech, 很好 is pronounced:',
      zh: '“很好”说的时候读成：',
    }, ['hén hǎo', 'hěn hāo', 'hèn hǎo', 'hēn hǎo'], 0, {
      vi: '3 + 3 → 2 + 3: hén hǎo.',
      en: '3 + 3 → 2 + 3: hén hǎo.',
      zh: '3 + 3 → 2 + 3：hén hǎo。',
    }, { wordIds: ['hen', 'hao'] }),
    pinyin('d3-q4', '你好', { vi: 'xin chào (viết theo dấu gốc)', en: 'hello (write the original tones)' }, ['nǐ hǎo'], {
      vi: 'Pinyin viết theo thanh gốc: nǐ hǎo (khi nói đọc ní hǎo).',
      en: 'Pinyin is written with the original tones: nǐ hǎo (in speech it sounds ní hǎo).',
      zh: '拼音按原来的声调写：nǐ hǎo（说的时候读 ní hǎo）。',
    }, ['nihao']),
    choice('d3-q5', 'vocabulary', {
      vi: '水 nghĩa là gì?',
      en: 'What does 水 mean?',
      zh: '“水”是什么意思？',
    }, [
      { vi: 'nước', en: 'water' },
      { vi: 'cá', en: 'fish' },
      { vi: 'trà', en: 'tea' },
      { vi: 'rất', en: 'very' },
    ], 0, { seq: ['水 shuǐ = ', { vi: 'nước', en: 'water' }, '.'] }, { text: '水', pron: 'shuǐ', wordIds: ['shui'] }),
    arrange('d3-q6', { vi: 'Mẹ uống nước.', en: 'Mom drinks water.' }, ['妈妈', '喝', '水'], { seq: [
      '妈妈 (', { vi: 'mẹ', en: 'mom' }, ') + 喝 (', { vi: 'uống', en: 'drink' }, ') + 水 (', { vi: 'nước', en: 'water' }, '). ',
      { vi: 'Trật tự giống tiếng Việt.', en: 'The word order is the same as in Vietnamese (and English).', zh: '语序和越南语一样。' },
    ] }, ['mama', 'he', 'shui']),
    listen('d3-q7', '谢谢', [
      { vi: 'Cảm ơn', en: 'Thank you' },
      { vi: 'Xin chào', en: 'Hello' },
      { vi: 'Rất tốt', en: 'Very good' },
      { vi: 'Tạm biệt', en: 'Goodbye' },
    ], 0, { seq: ['谢谢 xièxie = ', { vi: 'cảm ơn', en: 'thank you' }, '.'] }, { wordIds: ['xiexie'] }),
  ],
  summary: [
    {
      vi: '6 vận mẫu đơn: a o e i u ü. Đứng một mình: yi, wu, yu.',
      en: '6 simple finals: a o e i u ü. On their own: yi, wu, yu.',
      zh: '六个单韵母：a o e i u ü。单独成音节时写作 yi, wu, yu。',
    },
    {
      vi: 'Sau j q x y, ü viết là u: ju, qu, xu, yu.',
      en: 'After j q x y, ü is written u: ju, qu, xu, yu.',
      zh: '在 j q x y 后面，ü 写成 u：ju, qu, xu, yu。',
    },
    {
      vi: '-n và -ng khác nhau: shān ≠ shāng, xīn ≠ xīng.',
      en: '-n and -ng are different: shān ≠ shāng, xīn ≠ xīng.',
      zh: '-n 和 -ng 不一样：shān ≠ shāng，xīn ≠ xīng。',
    },
    {
      vi: 'Thanh 3 + thanh 3 → thanh 2 + thanh 3: 你好 đọc ní hǎo.',
      en: 'Tone 3 + tone 3 → tone 2 + tone 3: 你好 is said ní hǎo.',
      zh: '第三声 + 第三声 → 第二声 + 第三声：你好读 ní hǎo。',
    },
    {
      vi: 'Từ mới: 好, 你好, 很, 水, 鱼, 谢谢.',
      en: 'New words: 好, 你好, 很, 水, 鱼, 谢谢.',
      zh: '生词：好、你好、很、水、鱼、谢谢。',
    },
  ],
};
