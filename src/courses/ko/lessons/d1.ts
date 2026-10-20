import type { DayContent } from '../../helpers';
import { MATCH_PROMPT, choice, listen, typeIt, wordsOf } from '../../helpers';

const WORDS = ['ai', 'oi', 'au', 'ua', 'a-ah', 'eo-huh'];

export const D1: DayContent = {
  lesson: {
    id: 'ko-d1', day: 1, stage: 1, minutes: 20, prerequisites: [],
    title: {
      vi: 'Làm quen tiếng Hàn & chữ Hangul',
      en: 'Meet Korean & Hangul',
      zh: '认识韩语和韩文字母',
    },
    subtitle: {
      vi: 'Khối âm tiết · ㅇ câm · 6 nguyên âm cơ bản ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ',
      en: 'Syllable blocks · silent ㅇ · the 6 basic vowels ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ',
      zh: '音节块 · 不发音的 ㅇ · 6 个基本元音 ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ',
    },
    objectives: [
      {
        vi: 'Biết Hangul (한글) là gì, do ai tạo ra và vì sao dễ học.',
        en: 'Know what Hangul (한글) is, who created it and why it is easy to learn.',
        zh: '了解韩文（한글）是什么、由谁创造，以及为什么容易学。',
      },
      {
        vi: 'Hiểu cách chữ cái (jamo) ghép thành khối âm tiết: phụ âm đầu + nguyên âm (+ phụ âm cuối).',
        en: 'Understand how letters (jamo) combine into syllable blocks: initial consonant + vowel (+ final consonant).',
        zh: '理解字母（字母 jamo）如何组成音节块：初声 + 中声（元音）（+ 终声）。',
      },
      {
        vi: 'Biết ㅇ đứng đầu âm tiết là âm câm, chỉ để "giữ chỗ".',
        en: 'Know that ㅇ at the start of a syllable is silent and only "holds the place".',
        zh: '知道音节开头的 ㅇ 不发音，只起“占位”作用。',
      },
      {
        vi: 'Đọc, nghe và viết 6 nguyên âm cơ bản: ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ.',
        en: 'Read, hear and write the 6 basic vowels: ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ.',
        zh: '会读、会听、会写 6 个基本元音：ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ。',
      },
      {
        vi: 'Học 6 từ chỉ dùng các chữ đã học: 아이, 오이, 아우, 우아, 아, 어.',
        en: 'Learn 6 words that use only the letters taught: 아이, 오이, 아우, 우아, 아, 어.',
        zh: '学习 6 个只用已学字母的词：아이、오이、아우、우아、아、어。',
      },
    ],
    intro: [
      {
        vi: 'Tiếng Hàn (한국어 hangugeo) được viết bằng bảng chữ Hangul (한글). Hangul do vua Sejong (세종대왕) cùng các học giả tạo ra và công bố năm 1446, để người dân bình thường cũng có thể đọc và viết.',
        en: 'Korean (한국어 hangugeo) is written with the Hangul alphabet (한글). Hangul was created by King Sejong (세종대왕) and his scholars and published in 1446, so that ordinary people could read and write too.',
        zh: '韩语（한국어 hangugeo）用韩文字母（한글）书写。韩文由世宗大王（세종대왕）和学者们创制，于 1446 年颁布，让普通百姓也能读书写字。',
      },
      {
        vi: 'Hangul là bảng chữ ghi âm giống chữ Quốc ngữ: mỗi chữ cái ghi một âm. Điểm khác là các chữ cái không viết thành hàng ngang dài mà được xếp vào từng "khối" vuông, mỗi khối là một âm tiết — giống như mỗi tiếng trong tiếng Việt.',
        en: 'Hangul is a phonetic alphabet, like Vietnamese Quốc ngữ: each letter stands for a sound. The difference is that letters are not written in a long line but packed into square "blocks", one block per syllable — just like each syllable (tiếng) in Vietnamese.',
        zh: '韩文和越南国语字一样是表音文字：每个字母代表一个音。不同的是，字母不是排成一长行，而是组合成一个个方块，每个方块就是一个音节——就像越南语的每个音节（tiếng）。',
      },
      {
        vi: 'Tin vui: tiếng Hàn không có thanh điệu, và có rất nhiều từ gốc Hán nghe gần giống tiếng Việt (ví dụ 학생 haksaeng ≈ "học sinh"). Chỉ vài giờ là bạn đã đọc được Hangul!',
        en: 'Good news: Korean has no tones, and many Sino-Korean words sound close to Vietnamese (e.g. 학생 haksaeng ≈ "học sinh", student). In just a few hours you can read Hangul!',
        zh: '好消息：韩语没有声调，而且很多汉字词的发音和越南语很接近（例如 학생 haksaeng ≈ 越南语“học sinh”，学生）。只要几个小时你就能读韩文了！',
      },
    ],
    sections: [
      {
        kind: 'text',
        title: { vi: 'Khối âm tiết: cách Hangul ghép chữ', en: 'Syllable blocks: how Hangul builds syllables', zh: '音节块：韩文如何拼字' },
        body: [
          {
            vi: 'Mỗi khối âm tiết luôn có ít nhất một phụ âm đầu (초성) và một nguyên âm (중성). Có thể có thêm phụ âm cuối (받침 batchim) ở dưới đáy — bạn sẽ học ở Ngày 3.',
            en: 'Every syllable block has at least an initial consonant (초성) and a vowel (중성). It may also have a final consonant (받침 batchim) at the bottom — you will learn it on Day 3.',
            zh: '每个音节块至少有一个初声（초성）和一个中声，也就是元音（중성）。下面还可以有终声（받침 收音）——第 3 天再学。',
          },
          {
            vi: 'Nguyên âm "đứng" (có nét dọc dài: ㅏ ㅓ ㅣ) đặt BÊN PHẢI phụ âm: ㅇ + ㅏ = 아, ㅇ + ㅣ = 이.',
            en: '"Vertical" vowels (with a long vertical stroke: ㅏ ㅓ ㅣ) go to the RIGHT of the consonant: ㅇ + ㅏ = 아, ㅇ + ㅣ = 이.',
            zh: '“竖”元音（有一条长竖：ㅏ ㅓ ㅣ）写在辅音的右边：ㅇ + ㅏ = 아，ㅇ + ㅣ = 이。',
          },
          {
            vi: 'Nguyên âm "nằm" (có nét ngang dài: ㅗ ㅜ ㅡ) đặt BÊN DƯỚI phụ âm: ㅇ + ㅗ = 오, ㅇ + ㅜ = 우, ㅇ + ㅡ = 으.',
            en: '"Horizontal" vowels (with a long horizontal stroke: ㅗ ㅜ ㅡ) go BELOW the consonant: ㅇ + ㅗ = 오, ㅇ + ㅜ = 우, ㅇ + ㅡ = 으.',
            zh: '“横”元音（有一条长横：ㅗ ㅜ ㅡ）写在辅音的下面：ㅇ + ㅗ = 오，ㅇ + ㅜ = 우，ㅇ + ㅡ = 으。',
          },
          {
            vi: 'Các khối viết từ trái sang phải, như tiếng Việt. Trong mỗi khối, viết từ trái sang phải, từ trên xuống dưới. Ví dụ: 오이 = [ㅇ+ㅗ] [ㅇ+ㅣ] = o + i.',
            en: 'Blocks are written left to right, like Vietnamese. Inside a block, write left to right and top to bottom. For example: 오이 = [ㅇ+ㅗ] [ㅇ+ㅣ] = o + i.',
            zh: '音节块从左往右写，和越南语一样。每个块内部从左到右、从上到下书写。例如：오이 = [ㅇ+ㅗ] [ㅇ+ㅣ] = o + i。',
          },
        ],
      },
      {
        kind: 'tip',
        title: { vi: 'ㅇ câm ở đầu âm tiết', en: 'The silent ㅇ at the start', zh: '音节开头不发音的 ㅇ' },
        body: {
          vi: 'Một khối không thể bắt đầu bằng nguyên âm, nên khi âm tiết chỉ có nguyên âm, ta viết ㅇ (이응) phía trước để giữ chỗ. ㅇ đầu âm tiết KHÔNG đọc: 아 đọc là "a", 이 đọc là "i". (Ở cuối âm tiết, ㅇ lại đọc là "ng" — học ở Ngày 3.)',
          en: 'A block cannot start with a vowel, so when a syllable is only a vowel, ㅇ (이응) is written in front as a placeholder. ㅇ at the start of a syllable is NOT pronounced: 아 is read "a", 이 is read "i". (At the end of a syllable ㅇ is read "ng" — Day 3.)',
          zh: '音节块不能以元音开头，所以只有元音的音节要在前面写一个 ㅇ（이응）占位。音节开头的 ㅇ 不发音：아 读“a”，이 读“i”。（在音节末尾 ㅇ 读“ng”——第 3 天学。）',
        },
      },
      {
        kind: 'sounds',
        title: { vi: '6 nguyên âm cơ bản', en: 'The 6 basic vowels', zh: '6 个基本元音' },
        intro: {
          vi: 'Bấm từng thẻ để nghe. Mỗi nguyên âm được viết cùng ㅇ câm để giọng đọc phát âm được.',
          en: 'Tap each card to listen. Each vowel is written with a silent ㅇ so it can be read aloud.',
          zh: '点击每张卡片收听。每个元音都和不发音的 ㅇ 写在一起，这样才能读出来。',
        },
        items: [
          { label: 'ㅏ', text: '아', pron: 'a', note: { vi: 'Như "a" tiếng Việt, mở miệng rộng.', en: 'Like Vietnamese "a" (as in "father"), mouth wide open.', zh: '像越南语的 "a"，嘴张大。' } },
          { label: 'ㅓ', text: '어', pron: 'eo', note: { vi: 'Gần "ơ" nhưng mở miệng rộng hơn, môi không tròn (gần "o" mở trong "to").', en: 'Close to Vietnamese "ơ" but with the mouth more open and lips unrounded (like the "u" in English "but").', zh: '接近越南语的 "ơ"，但嘴张得更大，不圆唇。' } },
          { label: 'ㅗ', text: '오', pron: 'o', note: { vi: 'Như "ô" tiếng Việt, môi tròn và chu ra.', en: 'Like Vietnamese "ô", lips rounded and pushed forward.', zh: '像越南语的 "ô"，圆唇向前。' } },
          { label: 'ㅜ', text: '우', pron: 'u', note: { vi: 'Như "u" tiếng Việt, môi tròn.', en: 'Like Vietnamese "u" (as in "food"), lips rounded.', zh: '像越南语的 "u"，圆唇。' } },
          { label: 'ㅡ', text: '으', pron: 'eu', note: { vi: 'Như "ư" tiếng Việt, môi dẹt sang hai bên.', en: 'Like Vietnamese "ư": lips spread flat, tongue high at the back.', zh: '像越南语的 "ư"，嘴唇向两边展平。' } },
          { label: 'ㅣ', text: '이', pron: 'i', note: { vi: 'Như "i" tiếng Việt.', en: 'Like Vietnamese "i" (as in "see").', zh: '像越南语的 "i"。' } },
        ],
      },
      {
        kind: 'sounds',
        title: { vi: 'Ghép khối: ㅇ + nguyên âm', en: 'Building blocks: ㅇ + vowel', zh: '拼音节块：ㅇ + 元音' },
        intro: {
          vi: 'Quan sát vị trí của nguyên âm: bên phải (ㅏ ㅓ ㅣ) hay bên dưới (ㅗ ㅜ ㅡ). Hai khối ghép lại thành một từ.',
          en: 'Look at where the vowel sits: to the right (ㅏ ㅓ ㅣ) or below (ㅗ ㅜ ㅡ). Two blocks together make a word.',
          zh: '注意元音的位置：在右边（ㅏ ㅓ ㅣ）还是在下面（ㅗ ㅜ ㅡ）。两个音节块合在一起就是一个词。',
        },
        items: [
          { label: 'ㅇ+ㅏ', text: '아', pron: 'a', note: { vi: 'Nguyên âm bên phải.', en: 'Vowel on the right.', zh: '元音在右边。' } },
          { label: 'ㅇ+ㅗ', text: '오', pron: 'o', note: { vi: 'Nguyên âm bên dưới.', en: 'Vowel below.', zh: '元音在下面。' } },
          { label: '아+이', text: '아이', pron: 'ai', vi: 'đứa trẻ', en: 'child' },
          { label: '오+이', text: '오이', pron: 'oi', vi: 'dưa chuột', en: 'cucumber' },
          { label: '아+우', text: '아우', pron: 'au', vi: 'em trai (văn viết)', en: 'younger brother (literary)' },
          { label: '우+아', text: '우아', pron: 'ua', vi: 'thanh lịch', en: 'elegant' },
        ],
      },
      {
        kind: 'tip',
        title: { vi: 'Dễ nhầm: ㅓ và ㅗ, ㅡ và ㅜ', en: 'Easy to confuse: ㅓ vs ㅗ, ㅡ vs ㅜ', zh: '容易混淆：ㅓ 和 ㅗ，ㅡ 和 ㅜ' },
        body: {
          vi: 'ㅓ (eo) môi KHÔNG tròn, miệng mở; ㅗ (o) môi tròn như "ô". ㅡ (eu) môi dẹt như "ư"; ㅜ (u) môi tròn như "u". Mẹo nhìn chữ: nét ngắn chỉ hướng — ㅏ nét sang phải, ㅓ sang trái, ㅗ lên trên, ㅜ xuống dưới.',
          en: 'ㅓ (eo): lips NOT rounded, mouth open; ㅗ (o): lips rounded like Vietnamese "ô". ㅡ (eu): lips flat like Vietnamese "ư"; ㅜ (u): lips rounded like "u". Visual trick: the short stroke points a direction — ㅏ right, ㅓ left, ㅗ up, ㅜ down.',
          zh: 'ㅓ（eo）不圆唇、嘴张开；ㅗ（o）圆唇，像 "ô"。ㅡ（eu）嘴唇展平，像 "ư"；ㅜ（u）圆唇，像 "u"。看字形的小窍门：短笔画指方向——ㅏ 向右，ㅓ 向左，ㅗ 向上，ㅜ 向下。',
        },
      },
      { kind: 'words', title: { vi: 'Từ mới', en: 'New words', zh: '生词' }, wordIds: WORDS },
      {
        kind: 'speak',
        title: { vi: 'Luyện nói', en: 'Speaking practice', zh: '口语练习' },
        intro: {
          vi: 'Đọc to từng nguyên âm, rồi đọc các từ. Chú ý tròn môi với ㅗ ㅜ và dẹt môi với ㅡ ㅓ.',
          en: 'Read each vowel aloud, then the words. Round your lips for ㅗ ㅜ and keep them flat for ㅡ ㅓ.',
          zh: '大声读每个元音，再读单词。读 ㅗ ㅜ 时圆唇，读 ㅡ ㅓ 时不圆唇。',
        },
        items: [
          { text: '아', pron: 'a' },
          { text: '어', pron: 'eo' },
          { text: '오', pron: 'o' },
          { text: '우', pron: 'u' },
          { text: '으', pron: 'eu' },
          { text: '이', pron: 'i' },
          { text: '아이', pron: 'ai', vi: 'đứa trẻ', en: 'child' },
          { text: '오이', pron: 'oi', vi: 'dưa chuột', en: 'cucumber' },
        ],
      },
    ],
    wordIds: WORDS,
    grammarIds: [],
    practice: [
      listen('ko-d1-p1', '오', ['아', '어', '오', '우'], 2, {
        vi: '오 (o) — môi tròn như "ô". Nét ngắn của ㅗ chỉ lên trên.',
        en: '오 (o) — lips rounded like Vietnamese "ô". The short stroke of ㅗ points up.',
        zh: '오（o）——圆唇，像越南语的 "ô"。ㅗ 的短笔画朝上。',
      }, { skill: 'pronunciation', targetOptions: true }),
      choice('ko-d1-p2', 'reading', { vi: 'Khối này đọc là gì?', en: 'How is this block read?', zh: '这个音节块怎么读？' },
        ['a', 'eo', 'o', 'eu'], 1, {
          vi: '어 = ㅇ (câm) + ㅓ (eo). Đọc gần "ơ", miệng mở, môi không tròn.',
          en: '어 = ㅇ (silent) + ㅓ (eo). Close to Vietnamese "ơ", mouth open, lips unrounded.',
          zh: '어 = ㅇ（不发音）+ ㅓ（eo）。接近越南语的 "ơ"，嘴张开，不圆唇。',
        }, { text: '어' }),
      choice('ko-d1-p3', 'reading', {
        vi: 'Chữ ㅇ ở đầu khối 아 đọc như thế nào?',
        en: 'How is the ㅇ at the start of the block 아 pronounced?',
        zh: '音节块 아 开头的 ㅇ 怎么读？',
      }, [
        { vi: 'Không đọc (câm)', en: 'It is silent', zh: '不发音' },
        { vi: 'Đọc là "ng"', en: 'It is read "ng"', zh: '读 "ng"' },
        { vi: 'Đọc là "o"', en: 'It is read "o"', zh: '读 "o"' },
        { vi: 'Đọc là "h"', en: 'It is read "h"', zh: '读 "h"' },
      ], 0, {
        vi: 'ㅇ đầu âm tiết chỉ giữ chỗ, không phát âm: 아 = "a". Chỉ ở cuối âm tiết ㅇ mới đọc "ng".',
        en: 'ㅇ at the start of a syllable just holds the place and is not pronounced: 아 = "a". Only at the end of a syllable is ㅇ read "ng".',
        zh: '音节开头的 ㅇ 只是占位，不发音：아 = "a"。只有在音节末尾 ㅇ 才读 "ng"。',
      }),
      choice('ko-d1-p4', 'reading', { vi: 'Ghép ㅇ + ㅜ được khối nào?', en: 'Which block is ㅇ + ㅜ?', zh: 'ㅇ + ㅜ 组成哪个音节块？' },
        ['우', '오', '으', '어'], 0, {
          vi: 'ㅜ là nguyên âm "nằm" nên đặt dưới ㅇ: 우 (u). Nét ngắn chỉ xuống dưới.',
          en: 'ㅜ is a "horizontal" vowel, so it goes under ㅇ: 우 (u). Its short stroke points down.',
          zh: 'ㅜ 是“横”元音，所以写在 ㅇ 下面：우（u）。短笔画朝下。',
        }, { targetOptions: true }),
      { id: 'ko-d1-p5', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: '아이', pron: 'ai', vi: 'đứa trẻ', en: 'child' },
        { text: '오이', pron: 'oi', vi: 'dưa chuột', en: 'cucumber' },
        { text: '우아', pron: 'ua', vi: 'thanh lịch', en: 'elegant' },
      ], explanation: { seq: [
        '아이 ai = ', { vi: 'đứa trẻ', en: 'child' },
        ' · 오이 oi = ', { vi: 'dưa chuột', en: 'cucumber' },
        ' · 우아 ua = ', { vi: 'thanh lịch', en: 'elegant' }, '.',
      ] }, wordIds: ['ai', 'oi', 'ua'] },
      listen('ko-d1-p6', '으', ['으', '우', '이', '어'], 0, {
        vi: '으 (eu) — như "ư" tiếng Việt, môi dẹt. Khác 우 (u) môi tròn.',
        en: '으 (eu) — like Vietnamese "ư", lips flat. Different from 우 (u), lips rounded.',
        zh: '으（eu）——像越南语的 "ư"，嘴唇展平。和圆唇的 우（u）不同。',
      }, { skill: 'pronunciation', targetOptions: true }),
      typeIt('ko-d1-p7', 'hangul', { k: 'ex.write.hangul', p: { meaning: { vi: 'đứa trẻ', en: 'child' } } }, ['아이'], {
        vi: '아이 (ai) = [ㅇ+ㅏ] + [ㅇ+ㅣ].',
        en: '아이 (ai) = [ㅇ+ㅏ] + [ㅇ+ㅣ].',
        zh: '아이（ai）= [ㅇ+ㅏ] + [ㅇ+ㅣ]。',
      }, { audio: '아이', wordIds: ['ai'] }),
    ],
    quiz: [
      listen('ko-d1-q1', '어', ['어', '오', '아', '으'], 0, {
        vi: '어 (eo) — miệng mở, môi không tròn. 오 (o) thì môi tròn.',
        en: '어 (eo) — mouth open, lips unrounded. 오 (o) has rounded lips.',
        zh: '어（eo）——嘴张开，不圆唇。오（o）要圆唇。',
      }, { skill: 'pronunciation', targetOptions: true }),
      listen('ko-d1-q2', '오이', ['오이', '아이', '우아', '아우'], 0, {
        vi: '오이 (oi) — dưa chuột.',
        en: '오이 (oi) — cucumber.',
        zh: '오이（oi）——黄瓜。',
      }, { skill: 'listening', targetOptions: true, wordIds: ['oi'] }),
      choice('ko-d1-q3', 'reading', { vi: 'Từ này đọc là gì?', en: 'How is this word read?', zh: '这个词怎么读？' },
        ['au', 'ua', 'ao', 'eou'], 0, {
          vi: '아우 = 아 (a) + 우 (u) → au.',
          en: '아우 = 아 (a) + 우 (u) → au.',
          zh: '아우 = 아（a）+ 우（u）→ au。',
        }, { text: '아우', wordIds: ['au'] }),
      choice('ko-d1-q4', 'reading', {
        vi: 'Nguyên âm nào được viết BÊN DƯỚI phụ âm?',
        en: 'Which vowel is written BELOW the consonant?',
        zh: '哪个元音写在辅音的下面？',
      }, ['ㅗ', 'ㅏ', 'ㅓ', 'ㅣ'], 0, {
        vi: 'ㅗ ㅜ ㅡ có nét ngang dài nên đặt bên dưới (오). ㅏ ㅓ ㅣ có nét dọc dài nên đặt bên phải (아, 어, 이).',
        en: 'ㅗ ㅜ ㅡ have a long horizontal stroke, so they go below (오). ㅏ ㅓ ㅣ have a long vertical stroke, so they go to the right (아, 어, 이).',
        zh: 'ㅗ ㅜ ㅡ 有长横，写在下面（오）。ㅏ ㅓ ㅣ 有长竖，写在右边（아、어、이）。',
      }, { targetOptions: true }),
      choice('ko-d1-q5', 'pronunciation', {
        vi: 'Nguyên âm nào gần với "ư" tiếng Việt nhất?',
        en: 'Which vowel is closest to Vietnamese "ư"?',
        zh: '哪个元音最接近越南语的 "ư"？',
      }, ['ㅡ', 'ㅜ', 'ㅓ', 'ㅗ'], 0, {
        vi: 'ㅡ (eu) ≈ "ư": môi dẹt. ㅜ ≈ "u", ㅗ ≈ "ô", ㅓ gần "ơ".',
        en: 'Compared with Vietnamese: ㅡ (eu) ≈ "ư" (lips flat), ㅜ ≈ "u", ㅗ ≈ "ô", ㅓ is close to "ơ".',
        zh: 'ㅡ（eu）≈ "ư"：嘴唇展平。ㅜ ≈ "u"，ㅗ ≈ "ô"，ㅓ 接近 "ơ"。',
      }, { targetOptions: true }),
      { id: 'ko-d1-q6', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: '아우', pron: 'au', vi: 'em trai (văn viết)', en: 'younger brother (literary)' },
        { text: '아이', pron: 'ai', vi: 'đứa trẻ', en: 'child' },
        { text: '오이', pron: 'oi', vi: 'dưa chuột', en: 'cucumber' },
      ], explanation: { seq: [
        '아우 au = ', { vi: 'em trai (văn viết)', en: 'younger brother (literary)' },
        ' · 아이 ai = ', { vi: 'đứa trẻ', en: 'child' },
        ' · 오이 oi = ', { vi: 'dưa chuột', en: 'cucumber' }, '.',
      ] }, wordIds: ['au', 'ai', 'oi'] },
      typeIt('ko-d1-q7', 'hangul', { k: 'ex.write.hangul', p: { meaning: { vi: 'dưa chuột', en: 'cucumber' } } }, ['오이'], {
        vi: '오이 (oi) = [ㅇ+ㅗ] + [ㅇ+ㅣ]. ㅗ nằm dưới ㅇ, ㅣ nằm bên phải ㅇ.',
        en: '오이 (oi) = [ㅇ+ㅗ] + [ㅇ+ㅣ]. ㅗ sits under ㅇ, ㅣ sits to the right of ㅇ.',
        zh: '오이（oi）= [ㅇ+ㅗ] + [ㅇ+ㅣ]。ㅗ 在 ㅇ 下面，ㅣ 在 ㅇ 右边。',
      }, { audio: '오이', wordIds: ['oi'] }),
      choice('ko-d1-q8', 'reading', { vi: 'Ai đã tạo ra chữ Hangul?', en: 'Who created Hangul?', zh: '韩文是谁创制的？' }, [
        { vi: 'Vua Sejong', en: 'King Sejong', zh: '世宗大王' },
        { vi: 'Các nhà sư Ấn Độ', en: 'Indian monks', zh: '印度僧人' },
        { vi: 'Người Nhật', en: 'The Japanese', zh: '日本人' },
        { vi: 'Không ai, tự hình thành', en: 'No one — it evolved by itself', zh: '没有人，自然形成的' },
      ], 0, {
        vi: 'Vua Sejong (세종대왕) và các học giả tạo ra Hangul, công bố năm 1446.',
        en: 'King Sejong (세종대왕) and his scholars created Hangul, published in 1446.',
        zh: '世宗大王（세종대왕）和学者们创制了韩文，于 1446 年颁布。',
      }),
    ],
    summary: [
      {
        vi: 'Hangul do vua Sejong tạo ra (1446); mỗi chữ cái ghi một âm, các chữ ghép thành khối âm tiết.',
        en: 'Hangul was created by King Sejong (1446); each letter is one sound, and letters combine into syllable blocks.',
        zh: '韩文由世宗大王创制（1446 年）；每个字母代表一个音，字母组合成音节块。',
      },
      {
        vi: 'Khối = phụ âm đầu + nguyên âm (+ phụ âm cuối). ㅏ ㅓ ㅣ đặt bên phải, ㅗ ㅜ ㅡ đặt bên dưới.',
        en: 'Block = initial consonant + vowel (+ final consonant). ㅏ ㅓ ㅣ go on the right, ㅗ ㅜ ㅡ go below.',
        zh: '音节块 = 初声 + 元音（+ 终声）。ㅏ ㅓ ㅣ 写在右边，ㅗ ㅜ ㅡ 写在下面。',
      },
      {
        vi: 'ㅇ đầu âm tiết là âm câm: 아 = a, 이 = i.',
        en: 'ㅇ at the start of a syllable is silent: 아 = a, 이 = i.',
        zh: '音节开头的 ㅇ 不发音：아 = a，이 = i。',
      },
      {
        vi: '6 nguyên âm: ㅏ a · ㅓ eo (≈ ơ) · ㅗ o (≈ ô) · ㅜ u · ㅡ eu (≈ ư) · ㅣ i.',
        en: '6 vowels: ㅏ a · ㅓ eo (≈ Vietnamese ơ) · ㅗ o (≈ ô) · ㅜ u · ㅡ eu (≈ ư) · ㅣ i.',
        zh: '6 个元音：ㅏ a · ㅓ eo（≈ ơ）· ㅗ o（≈ ô）· ㅜ u · ㅡ eu（≈ ư）· ㅣ i。',
      },
      {
        vi: 'Từ mới: 아이, 오이, 아우, 우아, 아, 어.',
        en: 'New words: 아이, 오이, 아우, 우아, 아, 어.',
        zh: '生词：아이、오이、아우、우아、아、어。',
      },
    ],
  },
  words: wordsOf('ko-d1', 1, [
    { id: 'ai', text: '아이', pron: 'ai', vi: 'đứa trẻ', en: 'child', type: 'noun', topic: 'people', level: 'TOPIK I · 1',
      ex: ['아이가 웃어요.', 'Đứa trẻ đang cười.', 'The child is smiling.', 'aiga useoyo.'] },
    { id: 'oi', text: '오이', pron: 'oi', vi: 'dưa chuột', en: 'cucumber', type: 'noun', topic: 'food', level: 'TOPIK I · 1',
      ex: ['오이가 시원해요.', 'Dưa chuột mát lắm.', 'The cucumber is refreshing.', 'oiga siwonhaeyo.'] },
    { id: 'au', text: '아우', pron: 'au', vi: 'em trai (văn viết)', en: 'younger brother (literary)', type: 'noun', topic: 'family', level: 'TOPIK I · 1',
      notes: {
        vi: 'Từ cũ, hay gặp trong văn viết và thành ngữ (형과 아우 "anh và em"). Trong giao tiếp hằng ngày người Hàn dùng 동생.',
        en: 'An old-fashioned word, found in writing and set phrases (형과 아우 "older and younger brother"). In everyday speech Koreans say 동생.',
        zh: '旧式说法，多见于书面语和固定说法（형과 아우“兄与弟”）。日常口语里用 동생。',
      },
      ex: ['형과 아우가 같이 놀아요.', 'Anh và em trai chơi cùng nhau.', 'The older and younger brothers play together.', 'hyeonggwa auga gachi norayo.'] },
    { id: 'ua', text: '우아', pron: 'ua', vi: 'thanh lịch', en: 'elegant', type: 'adjective', topic: 'feelings', level: 'TOPIK I · 1',
      notes: {
        vi: 'Thường dùng dạng 우아하다 / 우아해요 "thanh lịch, duyên dáng".',
        en: 'Usually used as 우아하다 / 우아해요 "to be elegant, graceful".',
        zh: '常用形式为 우아하다 / 우아해요“优雅”。',
      },
      ex: ['춤이 정말 우아해요.', 'Điệu múa thật thanh lịch.', 'The dance is really elegant.', 'chumi jeongmal uahaeyo.'] },
    { id: 'a-ah', text: '아', pron: 'a', vi: 'a! (thán từ)', en: 'ah! (exclamation)', type: 'interjection', topic: 'basics', level: 'TOPIK I · 1',
      ex: ['아, 맛있어요!', 'A, ngon quá!', 'Ah, it is delicious!', 'a, masisseoyo!'] },
    { id: 'eo-huh', text: '어', pron: 'eo', vi: 'ơ, hả? (thán từ)', en: 'huh?; oh (exclamation)', type: 'interjection', topic: 'basics', level: 'TOPIK I · 1',
      ex: ['어? 비가 와요.', 'Ơ? Trời mưa rồi.', 'Huh? It is raining.', 'eo? biga wayo.'] },
  ]),
  grammar: [],
};
