import type { Lesson } from '../../../types';
import { MATCH_PROMPT, choice, listen, pinyin } from './helpers';
import { CONTRASTS, INITIAL_GROUPS } from '../sounds';

export const D2: Lesson = {
  id: 'd2', day: 2, stage: 1, minutes: 18, prerequisites: ['d1'],
  title: {
    vi: 'Thanh mẫu — phụ âm đầu',
    en: 'Initials — the first consonants',
    zh: '声母——音节开头的辅音',
  },
  subtitle: {
    vi: '21 thanh mẫu · bật hơi và không bật hơi · zh ch sh / z c s / j q x',
    en: '21 initials · aspirated and unaspirated · zh ch sh / z c s / j q x',
    zh: '21 个声母 · 送气音和不送气音 · zh ch sh / z c s / j q x',
  },
  objectives: [
    {
      vi: 'Biết 21 thanh mẫu của tiếng Trung, chia theo 6 nhóm.',
      en: 'Know the 21 Chinese initials, divided into 6 groups.',
      zh: '认识汉语的 21 个声母，分为六组。',
    },
    {
      vi: 'Phân biệt âm bật hơi (p, t, k, q, ch, c) và không bật hơi (b, d, g, j, zh, z).',
      en: 'Tell aspirated sounds (p, t, k, q, ch, c) from unaspirated ones (b, d, g, j, zh, z).',
      zh: '分清送气音（p, t, k, q, ch, c）和不送气音（b, d, g, j, zh, z）。',
    },
    {
      vi: 'Nhận biết ba nhóm dễ nhầm: j q x — zh ch sh r — z c s.',
      en: 'Recognize three easily confused groups: j q x — zh ch sh r — z c s.',
      zh: '认清三组容易混淆的声母：j q x — zh ch sh r — z c s。',
    },
    {
      vi: 'Học 7 từ mới: 他, 她, 哥哥, 姐姐, 吃, 喝, 茶.',
      en: 'Learn 7 new words: 他, 她, 哥哥, 姐姐, 吃, 喝, 茶.',
      zh: '学习 7 个生词：他、她、哥哥、姐姐、吃、喝、茶。',
    },
  ],
  intro: [
    {
      vi: 'Thanh mẫu là phụ âm đứng đầu âm tiết. Tiếng Trung có 21 thanh mẫu. Nhiều âm giống tiếng Việt (m, f, n, l), nhưng có vài điểm cần chú ý.',
      en: 'An initial is the consonant at the start of a syllable. Chinese has 21 initials. Many sound like Vietnamese (m, f, n, l), but a few need extra attention.',
      zh: '声母是音节开头的辅音。汉语有 21 个声母。很多和越南语的音相近（m, f, n, l），但也有几点需要注意。',
    },
    {
      vi: 'Bật hơi: p, t, k, q, ch, c phát âm kèm một luồng hơi mạnh. Thử đặt tờ giấy trước miệng: đọc "pā" giấy rung, đọc "bā" giấy gần như không rung.',
      en: 'Aspiration: p, t, k, q, ch, c are said with a strong puff of air. Try holding a sheet of paper in front of your mouth: say "pā" and the paper moves, say "bā" and it barely moves.',
      zh: '送气：p, t, k, q, ch, c 发音时会带出一股很强的气流。试着在嘴前放一张纸：读“pā”时纸会动，读“bā”时纸几乎不动。',
    },
    {
      vi: 'b, d, g trong tiếng Trung KHÔNG giống "b, đ, g" tiếng Việt. Chúng là âm không bật hơi, nghe gần giống "p, t, c" nhẹ của tiếng Việt.',
      en: 'Chinese b, d, g are NOT like Vietnamese "b, đ, g". They are unaspirated sounds, close to a soft Vietnamese "p, t, c" (similar to the p in English "spy").',
      zh: '汉语的 b, d, g 和越南语的“b, đ, g”不一样。它们是不送气音，听起来接近越南语里轻轻发的“p, t, c”。',
    },
  ],
  sections: [
    ...INITIAL_GROUPS.map((g) => ({ kind: 'sounds' as const, title: g.title, items: g.items })),
    {
      kind: 'tip',
      title: { vi: 'Chữ "i" đặc biệt', en: 'The special "i"', zh: '特殊的“i”' },
      body: {
        vi: 'Sau z, c, s, zh, ch, sh, r, chữ "i" KHÔNG đọc là "i" mà gần giống "ư": 四 sì, 吃 chī, 是 shì, 日 rì.',
        en: 'After z, c, s, zh, ch, sh, r, the letter "i" is NOT read as "i" but close to Vietnamese "ư": 四 sì, 吃 chī, 是 shì, 日 rì.',
        zh: '在 z, c, s, zh, ch, sh, r 后面，“i”不读“i”，而是接近越南语的“ư”：四 sì、吃 chī、是 shì、日 rì。',
      },
    },
    {
      kind: 'sounds',
      title: { vi: 'Cặp âm dễ nhầm', en: 'Easily confused pairs', zh: '容易混淆的音' },
      intro: {
        vi: 'Nghe liên tiếp từng cặp để cảm nhận sự khác biệt.',
        en: 'Listen to each pair back to back to feel the difference.',
        zh: '连着听每一组，感受它们的区别。',
      },
      items: CONTRASTS.slice(0, 5).flatMap((c) => c.items.map((i) => ({ label: i.pron, text: i.text, pron: i.pron, vi: i.vi, en: i.en, note: c.title }))),
    },
    { kind: 'words', title: { vi: 'Từ mới', en: 'New words', zh: '生词' }, wordIds: ['ta-m', 'ta-f', 'gege', 'jiejie', 'chi', 'he', 'cha'] },
  ],
  wordIds: ['ta-m', 'ta-f', 'gege', 'jiejie', 'chi', 'he', 'cha'],
  grammarIds: [],
  practice: [
    listen('d2-p1', '趴', ['bā', 'pā'], 1, {
      vi: 'pā có luồng hơi mạnh (bật hơi); bā thì không.',
      en: 'pā has a strong puff of air (aspirated); bā does not.',
      zh: 'pā 有很强的气流（送气），bā 没有。',
    }, { skill: 'pronunciation' }),
    listen('d2-p2', '哥', ['gē', 'kē'], 0, { seq: [
      { vi: 'g không bật hơi: ', en: 'g is unaspirated: ', zh: 'g 是不送气音：' }, '哥 gē (', { vi: 'anh trai', en: 'older brother' }, ').',
    ] }, { skill: 'pronunciation', wordIds: ['gege'] }),
    choice('d2-p3', 'pronunciation', {
      vi: 'Âm nào là âm bật hơi?',
      en: 'Which sound is aspirated?',
      zh: '哪个是送气音？',
    }, ['t', 'd', 'b', 'g'], 0, {
      vi: 't là âm bật hơi; d, b, g không bật hơi.',
      en: 't is aspirated; d, b, g are unaspirated.',
      zh: 't 是送气音；d, b, g 是不送气音。',
    }),
    listen('d2-p4', '吃', ['chī', 'qī', 'cī', 'shī'], 0, { seq: [
      '吃 chī (', { vi: 'ăn', en: 'to eat' }, '): ', { vi: 'uốn lưỡi + bật hơi.', en: 'retroflex + aspirated.', zh: '翘舌音 + 送气。' },
    ] }, { skill: 'pronunciation', wordIds: ['chi'] }),
    { id: 'd2-p5', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
      { text: '他', pron: 'tā', vi: 'anh ấy', en: 'he' },
      { text: '她', pron: 'tā', vi: 'cô ấy', en: 'she' },
      { text: '哥哥', pron: 'gēge', vi: 'anh trai', en: 'older brother' },
      { text: '姐姐', pron: 'jiějie', vi: 'chị gái', en: 'older sister' },
    ], explanation: {
      vi: '他 và 她 đọc giống nhau (tā); chữ 她 có bộ 女 (nữ).',
      en: '他 and 她 are pronounced the same (tā); 她 has the radical 女 (woman).',
      zh: '他和她读音一样（tā）；“她”有女字旁。',
    }, wordIds: ['ta-m', 'ta-f', 'gege', 'jiejie'] },
    pinyin('d2-p6', '喝', { vi: 'uống', en: 'to drink' }, ['hē'], { seq: [
      '喝 hē = ', { vi: 'uống', en: 'to drink' }, ' (', { vi: 'thanh 1', en: 'tone 1', zh: '第一声' }, ').',
    ] }, ['he']),
    choice('d2-p7', 'reading', { seq: ['我＿＿茶。(', { vi: 'Tôi uống trà.', en: 'I drink tea.' }, ')'] },
      ['喝', '吃', '他', '姐姐'], 0, { seq: [
        '喝 hē = ', { vi: 'uống', en: 'to drink' }, '; 我喝茶 = ', { vi: 'Tôi uống trà.', en: 'I drink tea.' },
      ] }, { targetOptions: true, wordIds: ['he', 'cha'] }),
  ],
  quiz: [
    listen('d2-q1', '西', ['xī', 'shī', 'sī'], 0, {
      vi: '西 xī: âm mặt lưỡi x.',
      en: '西 xī: x is a tongue-surface (palatal) sound.',
      zh: '西 xī：x 是舌面音。',
    }, { skill: 'pronunciation' }),
    listen('d2-q2', '四', ['sì', 'shì', 'xì'], 0, {
      vi: '四 sì: đầu lưỡi thẳng, "i" đọc như "ư".',
      en: '四 sì: flat tongue tip, and "i" sounds like Vietnamese "ư".',
      zh: '四 sì：平舌音，“i”读得像越南语的“ư”。',
    }, { skill: 'pronunciation' }),
    choice('d2-q3', 'vocabulary', {
      vi: '她 nghĩa là gì?',
      en: 'What does 她 mean?',
      zh: '“她”是什么意思？',
    }, [
      { vi: 'cô ấy', en: 'she' },
      { vi: 'anh ấy', en: 'he' },
      { vi: 'chị gái', en: 'older sister' },
      { vi: 'trà', en: 'tea' },
    ], 0, { seq: [
      '她 tā = ', { vi: 'cô ấy', en: 'she' }, ' (', { vi: 'có bộ 女', en: 'has the radical 女', zh: '有女字旁' }, ').',
    ] }, { text: '她', pron: 'tā', wordIds: ['ta-f'] }),
    choice('d2-q4', 'pronunciation', {
      vi: 'Trong "zhī, chī, shī", chữ "i" đọc gần giống âm nào của tiếng Việt?',
      en: 'In "zhī, chī, shī", the "i" sounds closest to which Vietnamese sound?',
      zh: '在“zhī, chī, shī”中，“i”的读音最接近越南语的哪个音？',
    }, ['ư', 'i', 'u', 'ê'], 0, {
      vi: 'Sau zh, ch, sh, r, z, c, s thì "i" đọc gần như "ư".',
      en: 'After zh, ch, sh, r, z, c, s, "i" sounds almost like Vietnamese "ư".',
      zh: '在 zh, ch, sh, r, z, c, s 后面，“i”读得接近越南语的“ư”。',
    }),
    pinyin('d2-q5', '哥哥', { vi: 'anh trai', en: 'older brother' }, ['gēge'], {
      vi: '哥哥 = gē + ge (thanh nhẹ).',
      en: '哥哥 = gē + ge (neutral tone).',
      zh: '哥哥 = gē + ge（轻声）。',
    }, ['gege']),
    listen('d2-q6', '茶', ['茶 chá', '吃 chī', '喝 hē', '他 tā'], 0, { seq: [
      '茶 chá = ', { vi: 'trà', en: 'tea' }, ' (', { vi: 'thanh 2', en: 'tone 2', zh: '第二声' }, ').',
    ] }, { wordIds: ['cha'] }),
  ],
  summary: [
    {
      vi: '21 thanh mẫu chia 6 nhóm: b p m f · d t n l · g k h · j q x · zh ch sh r · z c s.',
      en: 'The 21 initials form 6 groups: b p m f · d t n l · g k h · j q x · zh ch sh r · z c s.',
      zh: '21 个声母分为六组：b p m f · d t n l · g k h · j q x · zh ch sh r · z c s。',
    },
    {
      vi: 'p, t, k, q, ch, c là âm bật hơi; b, d, g, j, zh, z không bật hơi.',
      en: 'p, t, k, q, ch, c are aspirated; b, d, g, j, zh, z are unaspirated.',
      zh: 'p, t, k, q, ch, c 是送气音；b, d, g, j, zh, z 是不送气音。',
    },
    {
      vi: 'Sau z c s zh ch sh r, "i" đọc gần như "ư".',
      en: 'After z c s zh ch sh r, "i" sounds almost like Vietnamese "ư".',
      zh: '在 z c s zh ch sh r 后面，“i”读得接近越南语的“ư”。',
    },
    {
      vi: 'Từ mới: 他/她 tā, 哥哥 gēge, 姐姐 jiějie, 吃 chī, 喝 hē, 茶 chá.',
      en: 'New words: 他/她 tā, 哥哥 gēge, 姐姐 jiějie, 吃 chī, 喝 hē, 茶 chá.',
      zh: '生词：他/她 tā、哥哥 gēge、姐姐 jiějie、吃 chī、喝 hē、茶 chá。',
    },
  ],
};
