import type { Lesson } from '../../../types';
import { MATCH_PROMPT, arrange, choice, hanzi, listen, pinyin } from './helpers';

export const D5: Lesson = {
  id: 'd5', day: 5, stage: 2, minutes: 18, prerequisites: ['d4'],
  title: {
    vi: 'Chào hỏi & đại từ nhân xưng',
    en: 'Greetings & personal pronouns',
    zh: '问候与人称代词',
  },
  subtitle: {
    vi: '我 你 您 他 她 · 们 · 很 + tính từ · cảm ơn, xin lỗi, tạm biệt',
    en: '我 你 您 他 她 · 们 · 很 + adjective · thank you, sorry, goodbye',
    zh: '我 你 您 他 她 · 们 · 很 + 形容词 · 感谢、道歉、告别',
  },
  objectives: [
    {
      vi: 'Chào hỏi lịch sự: 你好, 您好, 早上好, 再见.',
      en: 'Greet people politely: 你好, 您好, 早上好, 再见.',
      zh: '礼貌地打招呼：你好、您好、早上好、再见。',
    },
    {
      vi: 'Cảm ơn, xin lỗi và đáp lại: 谢谢 / 不客气, 对不起 / 没关系.',
      en: 'Say thank you and sorry, and reply: 谢谢 / 不客气, 对不起 / 没关系.',
      zh: '会感谢、道歉，并会回应：谢谢 / 不客气，对不起 / 没关系。',
    },
    {
      vi: 'Dùng đại từ 我 你 您 他 她 và số nhiều với 们.',
      en: 'Use the pronouns 我 你 您 他 她 and make plurals with 们.',
      zh: '会用代词 我 你 您 他 她，并会用 们 表示复数。',
    },
    {
      vi: 'Nói câu đơn giản: Chủ ngữ + 很 + tính từ.',
      en: 'Say simple sentences: Subject + 很 + adjective.',
      zh: '会说简单的句子：主语 + 很 + 形容词。',
    },
  ],
  intro: [
    {
      vi: 'Hôm nay bạn bắt đầu nói những câu đầu tiên! Cách chào đơn giản nhất là: Đại từ/Danh xưng + 好. Ví dụ 你好 (chào bạn), 您好 (chào ông/bà – lịch sự), 你们好 (chào các bạn).',
      en: 'Today you start saying your first sentences! The simplest greeting is: pronoun/form of address + 好. For example 你好 (hello), 您好 (hello – polite, to an older person), 你们好 (hello, everyone).',
      zh: '今天你开始说第一批句子了！最简单的问候方式是：代词/称呼 + 好。例如 你好（向一个人问好）、您好（礼貌的说法，对长辈等）、你们好（向几个人问好）。',
    },
    {
      vi: '您 nín là dạng kính trọng của 你. Dùng với người lớn tuổi, khách hàng, cấp trên, thầy cô.',
      en: '您 nín is the respectful form of 你. Use it with older people, customers, superiors and teachers.',
      zh: '您 nín 是 你 的尊敬说法。用于长辈、顾客、上级和老师。',
    },
    {
      vi: 'Thêm 们 men sau đại từ để chỉ số nhiều: 我们 (chúng tôi), 你们 (các bạn), 他们 (họ).',
      en: 'Add 们 men after a pronoun to make it plural: 我们 (we), 你们 (you, plural), 他们 (they).',
      zh: '在代词后面加 们 men 表示复数：我们、你们、他们。',
    },
    {
      vi: 'Tiếng Trung không chia động từ theo ngôi: 我很好, 他很好, 我们很好 — từ giữ nguyên.',
      en: 'Chinese verbs do not change with the person: 我很好, 他很好, 我们很好 — the words stay the same.',
      zh: '中文的动词不随人称变化：我很好、他很好、我们很好——词的形式不变。',
    },
  ],
  sections: [
    { kind: 'words', title: { vi: 'Đại từ nhân xưng', en: 'Personal pronouns', zh: '人称代词' }, wordIds: ['wo', 'ni', 'nin', 'women', 'nimen', 'tamen'] },
    { kind: 'grammar', grammarId: 'g-men' },
    { kind: 'grammar', grammarId: 'g-hen' },
    { kind: 'words', title: { vi: 'Câu giao tiếp', en: 'Everyday expressions', zh: '常用交际用语' }, wordIds: ['bukeqi', 'duibuqi', 'meiguanxi', 'zaijian', 'zaoshanghao'] },
    { kind: 'examples', title: { vi: 'Hội thoại ngắn', en: 'Short dialogues', zh: '简短对话' }, examples: [
      { text: '你好！——你好！', pron: 'Nǐ hǎo! — Nǐ hǎo!', vi: 'Xin chào! — Xin chào!', en: 'Hello! — Hello!' },
      { text: '谢谢！——不客气！', pron: 'Xièxie! — Bú kèqi!', vi: 'Cảm ơn! — Không có gì!', en: 'Thank you! — You\'re welcome!' },
      { text: '对不起！——没关系！', pron: 'Duìbuqǐ! — Méi guānxi!', vi: 'Xin lỗi! — Không sao!', en: 'Sorry! — That\'s OK!' },
      { text: '再见！——再见！', pron: 'Zàijiàn! — Zàijiàn!', vi: 'Tạm biệt! — Tạm biệt!', en: 'Goodbye! — Goodbye!' },
    ] },
  ],
  wordIds: ['wo', 'ni', 'nin', 'women', 'nimen', 'tamen', 'bukeqi', 'duibuqi', 'meiguanxi', 'zaijian', 'zaoshanghao'],
  grammarIds: ['g-men', 'g-hen'],
  practice: [
    choice('d5-p1', 'vocabulary', { vi: 'Chào một người lớn tuổi một cách lịch sự:', en: 'Greet an older person politely:', zh: '礼貌地向一位长辈问好：' }, ['您好！', '你们好！', '再见！', '对不起！'], 0,
      { vi: '您 là dạng kính trọng của 你.', en: '您 is the respectful form of 你.', zh: '您 是 你 的尊敬说法。' }, { targetOptions: true, wordIds: ['nin'] }),
    choice('d5-p2', 'vocabulary', { vi: 'Ai đó nói 谢谢！Bạn đáp lại:', en: 'Someone says 谢谢! You reply:', zh: '别人说“谢谢！”，你回答：' }, ['不客气！', '没关系！', '对不起！', '早上好！'], 0,
      { seq: ['谢谢 → 不客气 (', { vi: 'Không có gì', en: 'You\'re welcome' }, ').'] }, { targetOptions: true, wordIds: ['bukeqi', 'xiexie'] }),
    choice('d5-p3', 'vocabulary', { vi: 'Ai đó nói 对不起！Bạn đáp lại:', en: 'Someone says 对不起! You reply:', zh: '别人说“对不起！”，你回答：' }, ['没关系！', '不客气！', '谢谢！', '再见！'], 0,
      { seq: ['对不起 → 没关系 (', { vi: 'Không sao', en: 'That\'s OK' }, ').'] }, { targetOptions: true, wordIds: ['meiguanxi', 'duibuqi'] }),
    { id: 'd5-p4', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
      { text: '我们', pron: 'wǒmen', vi: 'chúng tôi', en: 'we' }, { text: '你们', pron: 'nǐmen', vi: 'các bạn', en: 'you (plural)' }, { text: '他们', pron: 'tāmen', vi: 'họ', en: 'they' }, { text: '再见', pron: 'zàijiàn', vi: 'tạm biệt', en: 'goodbye' },
    ], explanation: { vi: '们 biến đại từ thành số nhiều.', en: '们 makes a pronoun plural.', zh: '们 让代词变成复数。' }, wordIds: ['women', 'nimen', 'tamen', 'zaijian'] },
    arrange('d5-p5', { vi: 'Chúng tôi khỏe.', en: 'We are well.' }, ['我们', '很', '好'], { vi: 'Chủ ngữ + 很 + tính từ.', en: 'Subject + 很 + adjective.', zh: '主语 + 很 + 形容词。' }, ['women', 'hen', 'hao']),
    pinyin('d5-p6', '再见', { vi: 'tạm biệt', en: 'goodbye' }, ['zàijiàn'], { vi: '再见 zàijiàn — hai thanh 4.', en: '再见 zàijiàn — two 4th tones.', zh: '再见 zàijiàn——两个第四声。' }, ['zaijian']),
    listen('d5-p7', '对不起', [{ vi: 'Xin lỗi', en: 'Sorry' }, { vi: 'Cảm ơn', en: 'Thank you' }, { vi: 'Không sao', en: 'That\'s OK' }, { vi: 'Tạm biệt', en: 'Goodbye' }], 0,
      { seq: ['对不起 duìbuqǐ = ', { vi: 'xin lỗi', en: 'sorry' }, '.'] }, { wordIds: ['duibuqi'] }),
  ],
  quiz: [
    choice('d5-q1', 'vocabulary', { vi: '您 khác 你 thế nào?', en: 'How is 您 different from 你?', zh: '您 和 你 有什么不同？' },
      [
        { vi: '您 lịch sự, kính trọng hơn', en: '您 is more polite and respectful', zh: '您 更礼貌、更尊敬' },
        { vi: '您 là số nhiều', en: '您 is plural', zh: '您 是复数' },
        { vi: '您 chỉ dùng cho nữ', en: '您 is only used for women', zh: '您 只用于女性' },
        { vi: 'Không khác gì', en: 'No difference', zh: '没有区别' },
      ], 0,
      { vi: '您 nín là dạng kính trọng của 你 nǐ.', en: '您 nín is the respectful form of 你 nǐ.', zh: '您 nín 是 你 nǐ 的尊敬说法。' }, { wordIds: ['nin', 'ni'] }),
    choice('d5-q2', 'vocabulary',
      { seq: ['"', { vi: 'Họ', en: 'They' }, '" ', { vi: '(nhiều người) là:', en: '(several people) is:', zh: '（多个人）用中文是：' }] },
      ['他们', '我们', '你们', '他'], 0,
      { seq: ['他 + 们 = 他们 (', { vi: 'họ', en: 'they' }, ').'] }, { targetOptions: true, wordIds: ['tamen'] }),
    arrange('d5-q3', { vi: 'Họ khỏe.', en: 'They are well.' }, ['他们', '很', '好'], '他们 + 很 + 好.', ['tamen', 'hen']),
    choice('d5-q4', 'grammar', { vi: 'Câu nào đúng?', en: 'Which sentence is correct?', zh: '哪个句子是对的？' }, ['我很好。', '我好很。', '很我好。', '我是很好。'], 0,
      {
        vi: '很 đứng trước tính từ; không dùng 是 trước tính từ.',
        en: '很 goes before the adjective; don\'t use 是 before an adjective.',
        zh: '很 放在形容词前面；形容词前面不用 是。',
      }, { targetOptions: true, grammarId: 'g-hen', wordIds: ['wo', 'hen'] }),
    hanzi('d5-q5',
      { seq: [{ vi: 'Gõ chữ Hán: "', en: 'Type the characters: "', zh: '输入汉字：“' }, { vi: 'tôi', en: 'I, me' }, { vi: '"', en: '"', zh: '”' }] },
      ['我'], { seq: ['我 wǒ = ', { vi: 'tôi', en: 'I, me' }, '.'] }, ['wo']),
    listen('d5-q6', '早上好', [{ vi: 'Chào buổi sáng', en: 'Good morning' }, { vi: 'Tạm biệt', en: 'Goodbye' }, { vi: 'Không sao', en: 'That\'s OK' }, { vi: 'Không có gì', en: 'You\'re welcome' }], 0,
      { seq: ['早上好 zǎoshang hǎo = ', { vi: 'chào buổi sáng', en: 'good morning' }, '.'] }, { wordIds: ['zaoshanghao'] }),
    pinyin('d5-q7', '您好', { vi: 'chào ông/bà (lịch sự)', en: 'hello (polite)' }, ['nín hǎo'], '您好 nín hǎo.', ['nin']),
  ],
  summary: [
    {
      vi: 'Chào: 你好 / 您好 (lịch sự) / 你们好 / 早上好. Tạm biệt: 再见.',
      en: 'Hello: 你好 / 您好 (polite) / 你们好 / 早上好. Goodbye: 再见.',
      zh: '问候：你好 / 您好（礼貌）/ 你们好 / 早上好。告别：再见。',
    },
    { vi: '谢谢 → 不客气 · 对不起 → 没关系.', en: '谢谢 → 不客气 · 对不起 → 没关系.', zh: '谢谢 → 不客气 · 对不起 → 没关系。' },
    { vi: '们 tạo số nhiều: 我们, 你们, 他们.', en: '们 makes plurals: 我们, 你们, 他们.', zh: '们 表示复数：我们、你们、他们。' },
    {
      vi: 'Chủ ngữ + 很 + tính từ: 我很好. Không nói 我是好.',
      en: 'Subject + 很 + adjective: 我很好. Don\'t say 我是好.',
      zh: '主语 + 很 + 形容词：我很好。不说“我是好”。',
    },
  ],
};
