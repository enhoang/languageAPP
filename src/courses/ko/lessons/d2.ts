import type { DayContent } from '../../helpers';
import { MATCH_PROMPT, choice, listen, typeIt, wordsOf } from '../../helpers';
import type { SoundItem } from '../../../types';

const WORDS = ['nara', 'bada', 'namu', 'gogi', 'keopi', 'appa', 'eomeoni', 'uyu', 'uija', 'norae', 'tokki'];

const L = (vi: string, en: string, zh: string) => ({ vi, en, zh });

export const BASIC_CONSONANTS: SoundItem[] = [
  { label: 'ㄱ', text: '가', pron: 'ga', note: L('기역. Giữa "c" và "g" tiếng Việt, không bật hơi. Cuối âm tiết đọc [k].', '기역. Between Vietnamese "c" and "g", no puff of air. At the end of a syllable: [k].', '기역。介于越南语 "c" 和 "g" 之间，不送气。在音节末尾读 [k]。') },
  { label: 'ㄴ', text: '나', pron: 'na', note: L('니은. Như "n".', '니은. Like "n".', '니은。像 "n"。') },
  { label: 'ㄷ', text: '다', pron: 'da', note: L('디귿. Giữa "t" và "đ", không bật hơi.', '디귿. Between Vietnamese "t" and "đ", no puff of air.', '디귿。介于越南语 "t" 和 "đ" 之间，不送气。') },
  { label: 'ㄹ', text: '라', pron: 'ra', note: L('리을. Đầu âm tiết: "r" lướt nhẹ (gần "l" chạm nhanh); cuối âm tiết: "l".', '리을. At the start: a light flap, between "r" and "l"; at the end: "l".', '리을。在音节开头是轻弹音，介于 "r" 和 "l" 之间；在末尾读 "l"。') },
  { label: 'ㅁ', text: '마', pron: 'ma', note: L('미음. Như "m".', '미음. Like "m".', '미음。像 "m"。') },
  { label: 'ㅂ', text: '바', pron: 'ba', note: L('비읍. Giữa "p" và "b", không bật hơi.', '비읍. Between "p" and "b", no puff of air.', '비읍。介于 "p" 和 "b" 之间，不送气。') },
  { label: 'ㅅ', text: '사', pron: 'sa', note: L('시옷. Như "x" tiếng Việt; trước ㅣ đọc gần "s" uốn nhẹ (시 = shi).', '시옷. Like Vietnamese "x" (English "s"); before ㅣ it sounds like "sh" (시 = shi).', '시옷。像越南语的 "x"；在 ㅣ 前接近 "sh"（시 = shi）。') },
  { label: 'ㅇ', text: '아', pron: 'a', note: L('이응. Đầu âm tiết: câm; cuối âm tiết: "ng".', '이응. At the start: silent; at the end: "ng".', '이응。在开头不发音；在末尾读 "ng"。') },
  { label: 'ㅈ', text: '자', pron: 'ja', note: L('지읒. Giữa "ch" và "gi", không bật hơi.', '지읒. Between Vietnamese "ch" and "gi" (like a soft English "j"), no puff of air.', '지읒。介于越南语 "ch" 和 "gi" 之间，不送气。') },
  { label: 'ㅎ', text: '하', pron: 'ha', note: L('히읗. Như "h".', '히읗. Like "h".', '히읗。像 "h"。') },
];

export const ASPIRATED_CONSONANTS: SoundItem[] = [
  { label: 'ㅋ', text: '카', pron: 'ka', note: L('키읔. "c/k" + luồng hơi mạnh. KHÔNG phải "kh" tiếng Việt.', '키읔. "k" with a strong puff of air (like English "k" in "kite"). Not Vietnamese "kh".', '키읔。"k" 加强气流。不是越南语的 "kh"。') },
  { label: 'ㅌ', text: '타', pron: 'ta', note: L('티읕. Rất giống "th" tiếng Việt (tha).', '티읕. Very close to Vietnamese "th" (as in "tha"), like English "t" in "top".', '티읕。和越南语的 "th"（tha）很像。') },
  { label: 'ㅍ', text: '파', pron: 'pa', note: L('피읖. "p" + luồng hơi mạnh. KHÔNG đọc như "ph" (= f) tiếng Việt.', '피읖. "p" with a strong puff of air (English "p" in "pie"). Not like Vietnamese "ph" (= f).', '피읖。"p" 加强气流。不能读成越南语的 "ph"（= f）。') },
  { label: 'ㅊ', text: '차', pron: 'cha', note: L('치읓. "ch" + luồng hơi mạnh.', '치읓. "ch" with a strong puff of air.', '치읓。"ch" 加强气流。') },
];

export const TENSE_CONSONANTS: SoundItem[] = [
  { label: 'ㄲ', text: '까', pron: 'kka', note: L('쌍기역. "c" căng, gọn, không có hơi — gần "c" trong "ca" tiếng Việt.', '쌍기역. A tight "k" with no air — close to the "c" in Vietnamese "ca" (English "sk" in "sky").', '쌍기역。紧而短的 "k"，不带气流——接近越南语 "ca" 的 "c"。') },
  { label: 'ㄸ', text: '따', pron: 'tta', note: L('쌍디귿. Gần "t" tiếng Việt (ta): căng, không hơi.', '쌍디귿. Close to Vietnamese "t" (as in "ta"): tight, no air (English "st" in "stop").', '쌍디귿。接近越南语 "ta" 的 "t"：紧，不带气流。') },
  { label: 'ㅃ', text: '빠', pron: 'ppa', note: L('쌍비읍. "p" căng, không hơi (như "p" trong "pin").', '쌍비읍. A tight "p" with no air (English "sp" in "spa").', '쌍비읍。紧的 "p"，不带气流。') },
  { label: 'ㅆ', text: '싸', pron: 'ssa', note: L('쌍시옷. "s" mạnh, căng hơn ㅅ.', '쌍시옷. A strong, tense "s".', '쌍시옷。比 ㅅ 更紧、更强的 "s"。') },
  { label: 'ㅉ', text: '짜', pron: 'jja', note: L('쌍지읒. Gần "ch" tiếng Việt (cha): căng, không hơi.', '쌍지읒. Close to Vietnamese "ch" (as in "cha"): tight, no air.', '쌍지읒。接近越南语 "cha" 的 "ch"：紧，不带气流。') },
];

export const TRIPLETS: SoundItem[] = [
  { label: 'ㄱ', text: '가', pron: 'ga', note: L('Thường: nhẹ, hơi ít.', 'Plain: soft, a little air.', '平音：轻，稍带气。') },
  { label: 'ㅋ', text: '카', pron: 'ka', note: L('Bật hơi: hơi mạnh.', 'Aspirated: strong air.', '激音：强气流。') },
  { label: 'ㄲ', text: '까', pron: 'kka', note: L('Căng: không hơi, giọng cao hơn.', 'Tense: no air, a slightly higher pitch.', '紧音：不带气，音调略高。') },
  { label: 'ㄷ', text: '다', pron: 'da' },
  { label: 'ㅌ', text: '타', pron: 'ta' },
  { label: 'ㄸ', text: '따', pron: 'tta' },
  { label: 'ㅂ', text: '바', pron: 'ba' },
  { label: 'ㅍ', text: '파', pron: 'pa' },
  { label: 'ㅃ', text: '빠', pron: 'ppa' },
  { label: 'ㅈ', text: '자', pron: 'ja' },
  { label: 'ㅊ', text: '차', pron: 'cha' },
  { label: 'ㅉ', text: '짜', pron: 'jja' },
];

export const Y_VOWELS: SoundItem[] = [
  { label: 'ㅑ', text: '야', pron: 'ya', note: L('ㅏ thêm một nét = "y" + a → "ia".', 'ㅏ plus one stroke = "y" + a.', 'ㅏ 加一笔 = "y" + a。') },
  { label: 'ㅕ', text: '여', pron: 'yeo', note: L('"y" + ㅓ, gần "iơ".', '"y" + ㅓ (yuh).', '"y" + ㅓ。') },
  { label: 'ㅛ', text: '요', pron: 'yo', note: L('"y" + ㅗ, gần "iô".', '"y" + ㅗ.', '"y" + ㅗ。') },
  { label: 'ㅠ', text: '유', pron: 'yu', note: L('"y" + ㅜ, gần "iu".', '"y" + ㅜ (like "you").', '"y" + ㅜ。') },
];

export const MORE_VOWELS: SoundItem[] = [
  { label: 'ㅐ', text: '애', pron: 'ae', note: L('Gần "e" tiếng Việt, miệng mở hơn ㅔ.', 'Close to Vietnamese "e" (as in "bed"), a bit more open than ㅔ.', '接近越南语的 "e"，比 ㅔ 嘴张得大一点。') },
  { label: 'ㅔ', text: '에', pron: 'e', note: L('Gần "ê". Người Seoul ngày nay đọc ㅐ và ㅔ gần như giống nhau.', 'Close to Vietnamese "ê". In Seoul today ㅐ and ㅔ sound almost the same.', '接近越南语的 "ê"。现在首尔人读 ㅐ 和 ㅔ 几乎一样。') },
  { label: 'ㅒ', text: '얘', pron: 'yae', note: L('"y" + ㅐ.', '"y" + ㅐ.', '"y" + ㅐ。') },
  { label: 'ㅖ', text: '예', pron: 'ye', note: L('"y" + ㅔ, gần "iê".', '"y" + ㅔ (like "ye" in "yes").', '"y" + ㅔ。') },
  { label: 'ㅘ', text: '와', pron: 'wa', note: L('ㅗ + ㅏ, gần "oa".', 'ㅗ + ㅏ, like "wa".', 'ㅗ + ㅏ，像 "wa"。') },
  { label: 'ㅙ', text: '왜', pron: 'wae', note: L('ㅗ + ㅐ, gần "oe".', 'ㅗ + ㅐ, like "we" in "wet".', 'ㅗ + ㅐ。') },
  { label: 'ㅚ', text: '외', pron: 'oe', note: L('Thường đọc gần giống ㅙ / ㅞ ("uê").', 'Usually pronounced almost like ㅙ / ㅞ ("we").', '通常读得和 ㅙ / ㅞ 差不多（"we"）。') },
  { label: 'ㅝ', text: '워', pron: 'wo', note: L('ㅜ + ㅓ, gần "uơ".', 'ㅜ + ㅓ, like "wo" in "won".', 'ㅜ + ㅓ。') },
  { label: 'ㅞ', text: '웨', pron: 'we', note: L('ㅜ + ㅔ, gần "uê".', 'ㅜ + ㅔ, like "we" in "wet".', 'ㅜ + ㅔ。') },
  { label: 'ㅟ', text: '위', pron: 'wi', note: L('ㅜ + ㅣ, gần "uy".', 'ㅜ + ㅣ, like "wee".', 'ㅜ + ㅣ，接近越南语的 "uy"。') },
  { label: 'ㅢ', text: '의', pron: 'ui', note: L('ㅡ + ㅣ, gần "ưi". Sau phụ âm đọc [ㅣ] (희 → [히]).', 'ㅡ + ㅣ, like Vietnamese "ưi". After a consonant it is read [ㅣ] (희 → [히]).', 'ㅡ + ㅣ，接近越南语的 "ưi"。在辅音后读 [ㅣ]（희 → [히]）。') },
];

export const D2: DayContent = {
  lesson: {
    id: 'ko-d2', day: 2, stage: 1, minutes: 25, prerequisites: ['ko-d1'],
    title: {
      vi: 'Phụ âm & thêm nguyên âm',
      en: 'Consonants & more vowels',
      zh: '辅音和更多元音',
    },
    subtitle: {
      vi: 'Phụ âm thường · bật hơi · căng · nguyên âm "y" · ㅐ ㅔ · nguyên âm ghép',
      en: 'Plain · aspirated · tense consonants · "y" vowels · ㅐ ㅔ · compound vowels',
      zh: '平音 · 激音 · 紧音 · y 类元音 · ㅐ ㅔ · 复合元音',
    },
    objectives: [
      {
        vi: 'Đọc 10 phụ âm cơ bản ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅎ.',
        en: 'Read the 10 basic consonants ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅎ.',
        zh: '会读 10 个基本辅音 ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅎ。',
      },
      {
        vi: 'Phân biệt bộ ba thường – bật hơi – căng: 가/카/까, 다/타/따, 바/파/빠, 자/차/짜, và 사/싸.',
        en: 'Tell apart plain – aspirated – tense triplets: 가/카/까, 다/타/따, 바/파/빠, 자/차/짜, and 사/싸.',
        zh: '分清平音、激音、紧音三组：가/카/까、다/타/따、바/파/빠、자/차/짜，以及 사/싸。',
      },
      {
        vi: 'Đọc nguyên âm "y" ㅑ ㅕ ㅛ ㅠ, ㅐ ㅔ và nguyên âm ghép ㅘ ㅝ ㅢ…',
        en: 'Read the "y" vowels ㅑ ㅕ ㅛ ㅠ, ㅐ ㅔ and compound vowels ㅘ ㅝ ㅢ…',
        zh: '会读 y 类元音 ㅑ ㅕ ㅛ ㅠ、ㅐ ㅔ 和复合元音 ㅘ ㅝ ㅢ 等。',
      },
      {
        vi: 'Học 11 từ mới: 나라, 바다, 나무, 고기, 커피, 아빠, 어머니, 우유, 의자, 노래, 토끼.',
        en: 'Learn 11 new words: 나라, 바다, 나무, 고기, 커피, 아빠, 어머니, 우유, 의자, 노래, 토끼.',
        zh: '学习 11 个生词：나라、바다、나무、고기、커피、아빠、어머니、우유、의자、노래、토끼。',
      },
    ],
    intro: [
      {
        vi: 'Hangul có 19 phụ âm: 14 phụ âm đơn và 5 phụ âm đôi (căng). Hình dạng phụ âm cơ bản mô phỏng vị trí của lưỡi, môi, họng khi phát âm — ví dụ ㄱ là cuống lưỡi chạm vòm họng, ㅁ là hình đôi môi khép lại.',
        en: 'Hangul has 19 consonants: 14 single ones and 5 doubled (tense) ones. The basic shapes picture the tongue, lips and throat when making the sound — e.g. ㄱ shows the back of the tongue touching the roof of the mouth, ㅁ shows closed lips.',
        zh: '韩文有 19 个辅音：14 个单辅音和 5 个双辅音（紧音）。基本辅音的形状模仿发音时舌、唇、喉的样子——例如 ㄱ 是舌根抵住上腭，ㅁ 是双唇闭合的样子。',
      },
      {
        vi: 'Điểm khó nhất với người Việt: tiếng Hàn không phân biệt "b/p" hay "đ/t" bằng độ rung dây thanh như tiếng Việt, mà bằng LUỒNG HƠI và ĐỘ CĂNG. Mỗi nhóm có ba âm: thường (ㄱ, nhẹ), bật hơi (ㅋ, nhiều hơi), căng (ㄲ, không hơi, cổ họng căng).',
        en: 'The hardest point for Vietnamese speakers: Korean does not separate "b/p" or "đ/t" by voicing as Vietnamese does, but by AIR and TENSION. Each group has three sounds: plain (ㄱ, soft), aspirated (ㅋ, lots of air), tense (ㄲ, no air, tight throat).',
        zh: '对越南人来说最难的一点：韩语不像越南语那样用清浊区分 "b/p"、"đ/t"，而是靠气流和紧张度。每组有三个音：平音（ㄱ，轻）、激音（ㅋ，气流强）、紧音（ㄲ，不带气，喉部紧张）。',
      },
      {
        vi: 'Thử đặt tờ giấy trước miệng: đọc 카 giấy rung mạnh, 가 rung nhẹ, 까 gần như không rung.',
        en: 'Hold a sheet of paper in front of your mouth: say 카 and it moves a lot, 가 a little, 까 almost not at all.',
        zh: '在嘴前放一张纸：读 카 纸动得很厉害，读 가 动一点，读 까 几乎不动。',
      },
    ],
    sections: [
      {
        kind: 'sounds',
        title: { vi: '10 phụ âm cơ bản', en: 'The 10 basic consonants', zh: '10 个基本辅音' },
        intro: {
          vi: 'Mỗi thẻ ghi phụ âm + ㅏ để nghe được. Ghi chú có tên chữ cái (기역, 니은…).',
          en: 'Each card shows the consonant + ㅏ so it can be heard. The note gives the letter name (기역, 니은…).',
          zh: '每张卡片是辅音 + ㅏ，方便收听。注释里有字母名称（기역、니은……）。',
        },
        items: BASIC_CONSONANTS,
      },
      {
        kind: 'sounds',
        title: { vi: 'Phụ âm bật hơi', en: 'Aspirated consonants', zh: '激音（送气音）' },
        intro: {
          vi: 'Thêm một nét vào phụ âm thường = thêm hơi: ㄱ → ㅋ, ㄷ → ㅌ, ㅂ → ㅍ, ㅈ → ㅊ.',
          en: 'One extra stroke on the plain consonant = extra air: ㄱ → ㅋ, ㄷ → ㅌ, ㅂ → ㅍ, ㅈ → ㅊ.',
          zh: '平音加一笔 = 加气流：ㄱ → ㅋ，ㄷ → ㅌ，ㅂ → ㅍ，ㅈ → ㅊ。',
        },
        items: ASPIRATED_CONSONANTS,
      },
      {
        kind: 'sounds',
        title: { vi: 'Phụ âm căng (đôi)', en: 'Tense (double) consonants', zh: '紧音（双辅音）' },
        intro: {
          vi: 'Viết đôi phụ âm thường = âm căng: ㄲ ㄸ ㅃ ㅆ ㅉ. Cổ họng siết lại, không có hơi, giọng hơi cao.',
          en: 'Doubling a plain consonant = tense sound: ㄲ ㄸ ㅃ ㅆ ㅉ. Tighten your throat, release no air, pitch slightly higher.',
          zh: '平音写两次 = 紧音：ㄲ ㄸ ㅃ ㅆ ㅉ。喉部收紧，不送气，音调略高。',
        },
        items: TENSE_CONSONANTS,
      },
      {
        kind: 'sounds',
        title: { vi: 'Bộ ba: thường – bật hơi – căng', en: 'Triplets: plain – aspirated – tense', zh: '三组对比：平音 – 激音 – 紧音' },
        intro: {
          vi: 'Nghe liên tiếp ba âm trong mỗi hàng. Xem thêm từ thật trong mục Phát âm → Bộ ba.',
          en: 'Listen to the three sounds of each row back to back. See real words in Pronunciation → Triplets.',
          zh: '连着听每一行的三个音。在“发音 → 三组对比”里还有真实的词。',
        },
        items: TRIPLETS,
      },
      {
        kind: 'sounds',
        title: { vi: 'Nguyên âm "y"', en: '"Y" vowels', zh: 'y 类元音' },
        intro: {
          vi: 'Thêm một nét ngắn vào ㅏ ㅓ ㅗ ㅜ là thêm âm "y" phía trước.',
          en: 'Adding a second short stroke to ㅏ ㅓ ㅗ ㅜ adds a "y" sound in front.',
          zh: '在 ㅏ ㅓ ㅗ ㅜ 上再加一短笔，就在前面加了 "y" 音。',
        },
        items: Y_VOWELS,
      },
      {
        kind: 'sounds',
        title: { vi: 'ㅐ ㅔ và nguyên âm ghép', en: 'ㅐ ㅔ and compound vowels', zh: 'ㅐ ㅔ 和复合元音' },
        intro: {
          vi: 'Nguyên âm ghép = hai nguyên âm viết chung một khối, đọc lướt nhanh: ㅗ + ㅏ = ㅘ (wa).',
          en: 'A compound vowel = two vowels in one block, glided together quickly: ㅗ + ㅏ = ㅘ (wa).',
          zh: '复合元音 = 两个元音写在同一个块里，快速滑读：ㅗ + ㅏ = ㅘ（wa）。',
        },
        items: MORE_VOWELS,
      },
      {
        kind: 'text',
        title: { vi: 'Ghép phụ âm với nguyên âm', en: 'Putting consonants and vowels together', zh: '辅音和元音拼在一起' },
        body: [
          {
            vi: 'Bây giờ thay ㅇ câm bằng phụ âm thật: ㄴ + ㅏ = 나 (na), ㄹ + ㅏ = 라 (ra) → 나라 (nara, đất nước). ㅂ + ㅏ = 바, ㄷ + ㅏ = 다 → 바다 (bada, biển).',
            en: 'Now replace the silent ㅇ with a real consonant: ㄴ + ㅏ = 나 (na), ㄹ + ㅏ = 라 (ra) → 나라 (nara, country). ㅂ + ㅏ = 바, ㄷ + ㅏ = 다 → 바다 (bada, sea).',
            zh: '现在把不发音的 ㅇ 换成真正的辅音：ㄴ + ㅏ = 나（na），ㄹ + ㅏ = 라（ra）→ 나라（nara，国家）。ㅂ + ㅏ = 바，ㄷ + ㅏ = 다 → 바다（bada，大海）。',
          },
          {
            vi: 'Nguyên âm nằm vẫn đặt dưới phụ âm: ㄱ + ㅗ = 고, ㄱ + ㅣ = 기 → 고기 (gogi, thịt). Nguyên âm ghép bao quanh phụ âm: ㄱ + ㅘ = 과, ㅇ + ㅢ = 의.',
            en: 'Horizontal vowels still go under the consonant: ㄱ + ㅗ = 고, ㄱ + ㅣ = 기 → 고기 (gogi, meat). Compound vowels wrap around the consonant: ㄱ + ㅘ = 과, ㅇ + ㅢ = 의.',
            zh: '横元音仍然写在辅音下面：ㄱ + ㅗ = 고，ㄱ + ㅣ = 기 → 고기（gogi，肉）。复合元音包住辅音：ㄱ + ㅘ = 과，ㅇ + ㅢ = 의。',
          },
          {
            vi: 'Phiên âm La-tinh (Revised Romanization) chỉ là công cụ hỗ trợ: ㄱ ghi "g", ㅓ ghi "eo", ㅡ ghi "eu". Hãy cố đọc thẳng từ Hangul càng sớm càng tốt.',
            en: 'Romanization (Revised Romanization) is only an aid: ㄱ is written "g", ㅓ "eo", ㅡ "eu". Try to read straight from Hangul as soon as you can.',
            zh: '罗马字（韩国语罗马字标记法）只是辅助：ㄱ 写作 "g"，ㅓ 写作 "eo"，ㅡ 写作 "eu"。尽早直接读韩文。',
          },
        ],
      },
      {
        kind: 'tip',
        title: { vi: 'Bẫy cho người Việt', en: 'Traps for Vietnamese speakers', zh: '越南人容易犯的错' },
        body: {
          vi: 'ㅍ không phải "ph": 파 là "pa" có hơi, không phải "pha" (fa). ㅋ không phải "kh": 커피 là "khơ-pi" có hơi mạnh ở k chứ không phải tiếng xát. Ngược lại ㄸ ≈ "t" tiếng Việt và ㅌ ≈ "th" tiếng Việt — bạn đã có sẵn hai âm này!',
          en: 'ㅍ is not Vietnamese "ph": 파 is "pa" with air, not "fa". ㅋ is not "kh": 커피 has a k with a strong puff, not a friction sound. On the other hand ㄸ ≈ Vietnamese "t" and ㅌ ≈ Vietnamese "th" — you already have these two sounds!',
          zh: 'ㅍ 不是越南语的 "ph"：파 是带气的 "pa"，不是 "fa"。ㅋ 不是 "kh"：커피 的 k 是强送气，不是擦音。另一方面，ㄸ ≈ 越南语的 "t"，ㅌ ≈ 越南语的 "th"——这两个音你本来就会！',
        },
      },
      { kind: 'words', title: { vi: 'Từ mới', en: 'New words', zh: '生词' }, wordIds: WORDS },
      {
        kind: 'speak',
        title: { vi: 'Luyện nói', en: 'Speaking practice', zh: '口语练习' },
        intro: {
          vi: 'Đọc to từng bộ ba, rồi đọc các từ. Chú ý luồng hơi.',
          en: 'Read each triplet aloud, then the words. Pay attention to the air.',
          zh: '大声读每组三个音，再读单词。注意气流。',
        },
        items: [
          { text: '가 카 까', pron: 'ga ka kka' },
          { text: '다 타 따', pron: 'da ta tta' },
          { text: '바 파 빠', pron: 'ba pa ppa' },
          { text: '자 차 짜', pron: 'ja cha jja' },
          { text: '나라', pron: 'nara', vi: 'đất nước', en: 'country' },
          { text: '커피', pron: 'keopi', vi: 'cà phê', en: 'coffee' },
          { text: '아빠', pron: 'appa', vi: 'bố', en: 'dad' },
          { text: '의자', pron: 'uija', vi: 'cái ghế', en: 'chair' },
        ],
      },
    ],
    wordIds: WORDS,
    grammarIds: [],
    practice: [
      listen('ko-d2-p1', '카', ['가', '카', '까'], 1, {
        vi: '카 (ka) — bật hơi, luồng hơi mạnh. 가 nhẹ, 까 căng không hơi.',
        en: '카 (ka) — aspirated, a strong puff of air. 가 is soft, 까 is tense with no air.',
        zh: '카（ka）——激音，气流强。가 轻，까 紧而不送气。',
      }, { skill: 'pronunciation', targetOptions: true }),
      listen('ko-d2-p2', '따', ['다', '타', '따'], 2, {
        vi: '따 (tta) — căng, gần "t" tiếng Việt. 타 giống "th".',
        en: '따 (tta) — tense, close to Vietnamese "t". 타 is like Vietnamese "th".',
        zh: '따（tta）——紧音，接近越南语的 "t"。타 像越南语的 "th"。',
      }, { skill: 'pronunciation', targetOptions: true }),
      choice('ko-d2-p3', 'reading', { vi: 'Từ này đọc là gì?', en: 'How is this word read?', zh: '这个词怎么读？' },
        ['namu', 'nara', 'mana', 'nomu'], 0, {
          vi: '나무 = 나 (na) + 무 (mu) → namu, "cái cây".',
          en: '나무 = 나 (na) + 무 (mu) → namu, "tree".',
          zh: '나무 = 나（na）+ 무（mu）→ namu，“树”。',
        }, { text: '나무', wordIds: ['namu'] }),
      choice('ko-d2-p4', 'pronunciation', {
        vi: 'Phụ âm nào là âm BẬT HƠI?',
        en: 'Which consonant is ASPIRATED?',
        zh: '哪个辅音是激音（送气音）？',
      }, ['ㅍ', 'ㅂ', 'ㅃ', 'ㅁ'], 0, {
        vi: 'ㅍ (p + hơi) là bật hơi. ㅂ là âm thường, ㅃ là âm căng, ㅁ là âm mũi.',
        en: 'ㅍ (p + air) is aspirated. ㅂ is plain, ㅃ is tense, ㅁ is a nasal.',
        zh: 'ㅍ（p + 气流）是激音。ㅂ 是平音，ㅃ 是紧音，ㅁ 是鼻音。',
      }, { targetOptions: true }),
      { id: 'ko-d2-p5', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: '바다', pron: 'bada', vi: 'biển', en: 'sea' },
        { text: '고기', pron: 'gogi', vi: 'thịt', en: 'meat' },
        { text: '커피', pron: 'keopi', vi: 'cà phê', en: 'coffee' },
        { text: '아빠', pron: 'appa', vi: 'bố', en: 'dad' },
      ], explanation: { seq: [
        '바다 bada = ', { vi: 'biển', en: 'sea' },
        ' · 고기 gogi = ', { vi: 'thịt', en: 'meat' },
        ' · 커피 keopi = ', { vi: 'cà phê', en: 'coffee' },
        ' · 아빠 appa = ', { vi: 'bố', en: 'dad' }, '.',
      ] }, wordIds: ['bada', 'gogi', 'keopi', 'appa'] },
      choice('ko-d2-p6', 'reading', { vi: 'Khối này đọc là gì?', en: 'How is this block read?', zh: '这个音节块怎么读？' },
        ['yu', 'u', 'yo', 'yeo'], 0, {
          vi: '유 = ㅇ (câm) + ㅠ (yu). ㅜ có thêm một nét = thêm "y".',
          en: '유 = ㅇ (silent) + ㅠ (yu). ㅜ with an extra stroke = an added "y".',
          zh: '유 = ㅇ（不发音）+ ㅠ（yu）。ㅜ 多加一笔 = 加上 "y"。',
        }, { text: '유' }),
      typeIt('ko-d2-p7', 'hangul', { k: 'ex.write.hangul', p: { meaning: { vi: 'đất nước', en: 'country' } } }, ['나라'], {
        vi: '나라 (nara) = [ㄴ+ㅏ] + [ㄹ+ㅏ].',
        en: '나라 (nara) = [ㄴ+ㅏ] + [ㄹ+ㅏ].',
        zh: '나라（nara）= [ㄴ+ㅏ] + [ㄹ+ㅏ]。',
      }, { audio: '나라', wordIds: ['nara'] }),
    ],
    quiz: [
      listen('ko-d2-q1', '빠', ['바', '파', '빠'], 2, {
        vi: '빠 (ppa) — căng, không hơi, như trong 아빠 (bố).',
        en: '빠 (ppa) — tense, no air, as in 아빠 (dad).',
        zh: '빠（ppa）——紧音，不送气，和 아빠（爸爸）里的一样。',
      }, { skill: 'pronunciation', targetOptions: true }),
      listen('ko-d2-q2', '차', ['자', '차', '짜'], 1, {
        vi: '차 (cha) — bật hơi. 자 nhẹ, 짜 căng.',
        en: '차 (cha) — aspirated. 자 is soft, 짜 is tense.',
        zh: '차（cha）——激音。자 轻，짜 紧。',
      }, { skill: 'pronunciation', targetOptions: true }),
      listen('ko-d2-q3', '토끼', ['토끼', '도기', '토기', '도끼'], 0, {
        vi: '토끼 (tokki) — con thỏ: ㅌ bật hơi + ㄲ căng.',
        en: '토끼 (tokki) — rabbit: aspirated ㅌ + tense ㄲ.',
        zh: '토끼（tokki）——兔子：激音 ㅌ + 紧音 ㄲ。',
      }, { skill: 'listening', targetOptions: true, wordIds: ['tokki'] }),
      choice('ko-d2-q4', 'reading', { vi: 'Từ này đọc là gì?', en: 'How is this word read?', zh: '这个词怎么读？' },
        ['eomeoni', 'omoni', 'eomoni', 'umeoni'], 0, {
          vi: '어머니 = 어 (eo) + 머 (meo) + 니 (ni) → eomeoni, "mẹ". ㅓ luôn ghi "eo".',
          en: '어머니 = 어 (eo) + 머 (meo) + 니 (ni) → eomeoni, "mother". ㅓ is always written "eo".',
          zh: '어머니 = 어（eo）+ 머（meo）+ 니（ni）→ eomeoni，“母亲”。ㅓ 总是写作 "eo"。',
        }, { text: '어머니', wordIds: ['eomeoni'] }),
      choice('ko-d2-q5', 'vocabulary', { vi: 'Từ nào nghĩa là "cái ghế"?', en: 'Which word means "chair"?', zh: '哪个词的意思是“椅子”？' },
        ['의자', '우유', '노래', '나무'], 0, {
          vi: '의자 (uija) = cái ghế. 의 dùng nguyên âm ghép ㅢ (ㅡ + ㅣ).',
          en: '의자 (uija) = chair. 의 uses the compound vowel ㅢ (ㅡ + ㅣ).',
          zh: '의자（uija）= 椅子。의 用的是复合元音 ㅢ（ㅡ + ㅣ）。',
        }, { targetOptions: true, wordIds: ['uija'] }),
      choice('ko-d2-q6', 'pronunciation', {
        vi: 'ㅍ trong 파 đọc thế nào?',
        en: 'How is ㅍ in 파 pronounced?',
        zh: '파 里的 ㅍ 怎么读？',
      }, [
        { vi: '"p" có luồng hơi mạnh', en: '"p" with a strong puff of air', zh: '带强气流的 "p"' },
        { vi: '"ph" như tiếng Việt (f)', en: 'Like Vietnamese "ph" (f)', zh: '像越南语的 "ph"（f）' },
        { vi: '"b" như tiếng Việt', en: 'Like Vietnamese "b"', zh: '像越南语的 "b"' },
        { vi: '"m"', en: '"m"', zh: '"m"' },
      ], 0, {
        vi: 'ㅍ là âm bật hơi: "p" + hơi. Không đọc thành "f".',
        en: 'ㅍ is aspirated: "p" + air. It is never "f".',
        zh: 'ㅍ 是激音："p" + 气流。不能读成 "f"。',
      }),
      { id: 'ko-d2-q7', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: '나라', pron: 'nara', vi: 'đất nước', en: 'country' },
        { text: '우유', pron: 'uyu', vi: 'sữa', en: 'milk' },
        { text: '노래', pron: 'norae', vi: 'bài hát', en: 'song' },
        { text: '나무', pron: 'namu', vi: 'cái cây', en: 'tree' },
      ], explanation: { seq: [
        '나라 nara = ', { vi: 'đất nước', en: 'country' },
        ' · 우유 uyu = ', { vi: 'sữa', en: 'milk' },
        ' · 노래 norae = ', { vi: 'bài hát', en: 'song' },
        ' · 나무 namu = ', { vi: 'cái cây', en: 'tree' }, '.',
      ] }, wordIds: ['nara', 'uyu', 'norae', 'namu'] },
      typeIt('ko-d2-q8', 'hangul', { k: 'ex.write.hangul', p: { meaning: { vi: 'cà phê', en: 'coffee' } } }, ['커피'], {
        vi: '커피 (keopi) = [ㅋ+ㅓ] + [ㅍ+ㅣ]: hai phụ âm bật hơi.',
        en: '커피 (keopi) = [ㅋ+ㅓ] + [ㅍ+ㅣ]: two aspirated consonants.',
        zh: '커피（keopi）= [ㅋ+ㅓ] + [ㅍ+ㅣ]：两个激音。',
      }, { audio: '커피', wordIds: ['keopi'] }),
    ],
    summary: [
      {
        vi: 'Phụ âm cơ bản: ㄱ g · ㄴ n · ㄷ d · ㄹ r/l · ㅁ m · ㅂ b · ㅅ s · ㅇ (câm / ng) · ㅈ j · ㅎ h.',
        en: 'Basic consonants: ㄱ g · ㄴ n · ㄷ d · ㄹ r/l · ㅁ m · ㅂ b · ㅅ s · ㅇ (silent / ng) · ㅈ j · ㅎ h.',
        zh: '基本辅音：ㄱ g · ㄴ n · ㄷ d · ㄹ r/l · ㅁ m · ㅂ b · ㅅ s · ㅇ（不发音 / ng）· ㅈ j · ㅎ h。',
      },
      {
        vi: 'Bật hơi ㅋ ㅌ ㅍ ㅊ (nhiều hơi); căng ㄲ ㄸ ㅃ ㅆ ㅉ (không hơi, căng). Bộ ba: 가/카/까, 다/타/따, 바/파/빠, 자/차/짜.',
        en: 'Aspirated ㅋ ㅌ ㅍ ㅊ (lots of air); tense ㄲ ㄸ ㅃ ㅆ ㅉ (no air, tight). Triplets: 가/카/까, 다/타/따, 바/파/빠, 자/차/짜.',
        zh: '激音 ㅋ ㅌ ㅍ ㅊ（气流强）；紧音 ㄲ ㄸ ㅃ ㅆ ㅉ（不送气，紧）。三组：가/카/까、다/타/따、바/파/빠、자/차/짜。',
      },
      {
        vi: 'Nguyên âm "y": ㅑ ㅕ ㅛ ㅠ. ㅐ ≈ ㅔ ≈ "e/ê". Nguyên âm ghép: ㅘ wa, ㅝ wo, ㅢ ui…',
        en: '"Y" vowels: ㅑ ㅕ ㅛ ㅠ. ㅐ ≈ ㅔ ≈ "e". Compound vowels: ㅘ wa, ㅝ wo, ㅢ ui…',
        zh: 'y 类元音：ㅑ ㅕ ㅛ ㅠ。ㅐ ≈ ㅔ ≈ "e"。复合元音：ㅘ wa、ㅝ wo、ㅢ ui 等。',
      },
      {
        vi: 'Từ mới: 나라, 바다, 나무, 고기, 커피, 아빠, 어머니, 우유, 의자, 노래, 토끼.',
        en: 'New words: 나라, 바다, 나무, 고기, 커피, 아빠, 어머니, 우유, 의자, 노래, 토끼.',
        zh: '生词：나라、바다、나무、고기、커피、아빠、어머니、우유、의자、노래、토끼。',
      },
    ],
  },
  words: wordsOf('ko-d2', 1, [
    { id: 'nara', text: '나라', pron: 'nara', vi: 'đất nước', en: 'country', type: 'noun', topic: 'countries', level: 'TOPIK I · 1',
      ex: ['베트남은 아름다운 나라예요.', 'Việt Nam là một đất nước xinh đẹp.', 'Vietnam is a beautiful country.', 'beteunameun areumdaun naraeyo.'] },
    { id: 'bada', text: '바다', pron: 'bada', vi: 'biển', en: 'sea', type: 'noun', topic: 'nature', level: 'TOPIK I · 1',
      ex: ['바다가 아주 넓어요.', 'Biển rất rộng.', 'The sea is very wide.', 'badaga aju neolbeoyo.'] },
    { id: 'namu', text: '나무', pron: 'namu', vi: 'cái cây', en: 'tree', type: 'noun', topic: 'nature', level: 'TOPIK I · 1',
      ex: ['나무가 정말 커요.', 'Cái cây thật to.', 'The tree is really big.', 'namuga jeongmal keoyo.'] },
    { id: 'gogi', text: '고기', pron: 'gogi', vi: 'thịt', en: 'meat', type: 'noun', topic: 'food', level: 'TOPIK I · 1',
      ex: ['저는 고기를 좋아해요.', 'Tôi thích thịt.', 'I like meat.', 'jeoneun gogireul joahaeyo.'] },
    { id: 'keopi', text: '커피', pron: 'keopi', vi: 'cà phê', en: 'coffee', type: 'noun', topic: 'food', level: 'TOPIK I · 1',
      ex: ['아침에 커피를 마셔요.', 'Buổi sáng tôi uống cà phê.', 'I drink coffee in the morning.', 'achime keopireul masyeoyo.'] },
    { id: 'appa', text: '아빠', pron: 'appa', vi: 'bố', en: 'dad', type: 'noun', topic: 'family', level: 'TOPIK I · 1',
      notes: {
        vi: '아빠 thân mật như "bố/ba". Trang trọng hơn: 아버지 (cha).',
        en: '아빠 is informal, like "dad". More formal: 아버지 (father).',
        zh: '아빠 是亲昵的说法，像“爸爸”。更正式：아버지（父亲）。',
      },
      ex: ['아빠는 회사원이에요.', 'Bố tôi là nhân viên văn phòng.', 'My dad is an office worker.', 'appaneun hoesawonieyo.'] },
    { id: 'eomeoni', text: '어머니', pron: 'eomeoni', vi: 'mẹ', en: 'mother', type: 'noun', topic: 'family', level: 'TOPIK I · 1',
      notes: {
        vi: '어머니 lịch sự hơn 엄마 (mẹ, thân mật).',
        en: '어머니 is more polite than 엄마 (mom, informal).',
        zh: '어머니 比 엄마（妈妈，亲昵）更礼貌。',
      },
      ex: ['어머니가 요리를 하세요.', 'Mẹ đang nấu ăn.', 'Mother is cooking.', 'eomeoniga yorireul haseyo.'] },
    { id: 'uyu', text: '우유', pron: 'uyu', vi: 'sữa', en: 'milk', type: 'noun', topic: 'food', level: 'TOPIK I · 1',
      ex: ['아이가 우유를 마셔요.', 'Đứa trẻ uống sữa.', 'The child drinks milk.', 'aiga uyureul masyeoyo.'] },
    { id: 'uija', text: '의자', pron: 'uija', vi: 'cái ghế', en: 'chair', type: 'noun', topic: 'school', level: 'TOPIK I · 1',
      ex: ['의자에 앉으세요.', 'Mời bạn ngồi xuống ghế.', 'Please sit on the chair.', 'uijae anjeuseyo.'] },
    { id: 'norae', text: '노래', pron: 'norae', vi: 'bài hát', en: 'song', type: 'noun', topic: 'daily', level: 'TOPIK I · 1',
      ex: ['이 노래를 좋아해요.', 'Tôi thích bài hát này.', 'I like this song.', 'i noraereul joahaeyo.'] },
    { id: 'tokki', text: '토끼', pron: 'tokki', vi: 'con thỏ', en: 'rabbit', type: 'noun', topic: 'nature', level: 'TOPIK I · 1',
      ex: ['토끼가 귀여워요.', 'Con thỏ dễ thương quá.', 'The rabbit is cute.', 'tokkiga gwiyeowoyo.'] },
  ]),
  grammar: [],
};
