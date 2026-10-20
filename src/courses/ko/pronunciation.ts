import type { Contrast, Course, LText, SoundItem, SoundRule } from '../../types';
import { ASPIRATED_CONSONANTS, BASIC_CONSONANTS, MORE_VOWELS, TENSE_CONSONANTS, Y_VOWELS } from './lessons/d2';

const L = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });

const BASIC_VOWELS: SoundItem[] = [
  { label: 'ㅏ', text: '아', pron: 'a', note: L('Như "a".', 'Like "a" in "father".', '像 "a"。') },
  { label: 'ㅓ', text: '어', pron: 'eo', note: L('Gần "ơ", miệng mở, môi không tròn.', 'Close to Vietnamese "ơ"; like "u" in "but".', '接近越南语 "ơ"，嘴张开，不圆唇。') },
  { label: 'ㅗ', text: '오', pron: 'o', note: L('Như "ô", môi tròn.', 'Like Vietnamese "ô", lips rounded.', '像越南语 "ô"，圆唇。') },
  { label: 'ㅜ', text: '우', pron: 'u', note: L('Như "u".', 'Like "oo" in "food".', '像 "u"。') },
  { label: 'ㅡ', text: '으', pron: 'eu', note: L('Như "ư", môi dẹt.', 'Like Vietnamese "ư", lips spread.', '像越南语 "ư"，展唇。') },
  { label: 'ㅣ', text: '이', pron: 'i', note: L('Như "i".', 'Like "ee" in "see".', '像 "i"。') },
];

/** Listening drills: plain / aspirated / tense consonants and confusable vowels. Item texts are unique. */
export const CONTRASTS: Contrast[] = [
  { title: L('ㄱ – ㅋ – ㄲ', 'ㄱ – ㅋ – ㄲ', 'ㄱ – ㅋ – ㄲ'),
    note: L('ㄱ nhẹ, ㅋ nhiều hơi, ㄲ căng không hơi.', 'ㄱ is soft, ㅋ has a strong puff of air, ㄲ is tense with no air.', 'ㄱ 轻，ㅋ 送气强，ㄲ 紧而不送气。'), items: [
    { text: '기', pron: 'gi', vi: 'khí, sinh lực', en: 'energy (qi)' },
    { text: '키', pron: 'ki', vi: 'chiều cao; chìa khóa', en: 'height; key' },
    { text: '끼', pron: 'kki', vi: 'tài năng bẩm sinh; bữa (ăn)', en: 'flair; a meal (counter)' } ] },
  { title: L('ㄷ – ㅌ – ㄸ', 'ㄷ – ㅌ – ㄸ', 'ㄷ – ㅌ – ㄸ'),
    note: L('ㅌ ≈ "th" tiếng Việt, ㄸ ≈ "t" tiếng Việt, ㄷ nhẹ ở giữa.', 'ㅌ ≈ Vietnamese "th", ㄸ ≈ Vietnamese "t", ㄷ is soft, in between.', 'ㅌ ≈ 越南语 "th"，ㄸ ≈ 越南语 "t"，ㄷ 轻，介于两者之间。'), items: [
    { text: '달', pron: 'dal', vi: 'mặt trăng; tháng', en: 'moon; month' },
    { text: '탈', pron: 'tal', vi: 'mặt nạ', en: 'mask' },
    { text: '딸', pron: 'ttal', vi: 'con gái', en: 'daughter' } ] },
  { title: L('ㅂ – ㅍ – ㅃ', 'ㅂ – ㅍ – ㅃ', 'ㅂ – ㅍ – ㅃ'),
    note: L('ㅍ là "p" có hơi (không phải "ph"), ㅃ căng không hơi.', 'ㅍ is "p" with air (not Vietnamese "ph"), ㅃ is tense with no air.', 'ㅍ 是送气的 "p"（不是越南语 "ph"），ㅃ 紧而不送气。'), items: [
    { text: '불', pron: 'bul', vi: 'lửa; đèn', en: 'fire; light' },
    { text: '풀', pron: 'pul', vi: 'cỏ; hồ dán', en: 'grass; glue' },
    { text: '뿔', pron: 'ppul', vi: 'sừng', en: 'horn' } ] },
  { title: L('ㅈ – ㅊ – ㅉ', 'ㅈ – ㅊ – ㅉ', 'ㅈ – ㅊ – ㅉ'),
    note: L('ㅊ nhiều hơi, ㅉ ≈ "ch" tiếng Việt, căng.', 'ㅊ has a strong puff of air, ㅉ ≈ Vietnamese "ch", tense.', 'ㅊ 送气强，ㅉ ≈ 越南语 "ch"，紧。'), items: [
    { text: '자다', pron: 'jada', vi: 'ngủ', en: 'to sleep' },
    { text: '차다', pron: 'chada', vi: 'đá (bóng); lạnh', en: 'to kick; to be cold' },
    { text: '짜다', pron: 'jjada', vi: 'mặn', en: 'to be salty' } ] },
  { title: L('ㅅ – ㅆ', 'ㅅ – ㅆ', 'ㅅ – ㅆ'),
    note: L('ㅆ căng và mạnh hơn ㅅ.', 'ㅆ is tenser and stronger than ㅅ.', 'ㅆ 比 ㅅ 更紧、更强。'), items: [
    { text: '살', pron: 'sal', vi: 'thịt (trên cơ thể); tuổi', en: 'flesh; years of age' },
    { text: '쌀', pron: 'ssal', vi: 'gạo', en: 'uncooked rice' } ] },
  { title: L('ㅂ – ㅃ', 'ㅂ – ㅃ', 'ㅂ – ㅃ'),
    note: L('방 nhẹ; 빵 căng, giọng cao hơn.', '방 is soft; 빵 is tense, with a higher pitch.', '방 轻；빵 紧，音调更高。'), items: [
    { text: '방', pron: 'bang', vi: 'căn phòng', en: 'room' },
    { text: '빵', pron: 'ppang', vi: 'bánh mì', en: 'bread' } ] },
  { title: L('ㄱ – ㄲ', 'ㄱ – ㄲ', 'ㄱ – ㄲ'),
    note: L('굴 nhẹ; 꿀 căng, không hơi.', '굴 is soft; 꿀 is tense, with no air.', '굴 轻；꿀 紧，不送气。'), items: [
    { text: '굴', pron: 'gul', vi: 'con hàu', en: 'oyster' },
    { text: '꿀', pron: 'kkul', vi: 'mật ong', en: 'honey' } ] },
  { title: L('ㅓ – ㅗ', 'ㅓ – ㅗ', 'ㅓ – ㅗ'),
    note: L('ㅓ môi không tròn (gần "ơ"), ㅗ môi tròn ("ô").', 'ㅓ has unrounded lips (close to Vietnamese "ơ"), ㅗ rounded lips ("ô").', 'ㅓ 不圆唇（接近 "ơ"），ㅗ 圆唇（"ô"）。'), items: [
    { text: '거기', pron: 'geogi', vi: 'chỗ đó', en: 'there' },
    { text: '고기', pron: 'gogi', vi: 'thịt', en: 'meat' } ] },
  { title: L('ㅗ – ㅜ', 'ㅗ – ㅜ', 'ㅗ – ㅜ'),
    note: L('ㅗ ≈ "ô", ㅜ ≈ "u".', 'ㅗ ≈ Vietnamese "ô", ㅜ ≈ "u".', 'ㅗ ≈ 越南语 "ô"，ㅜ ≈ "u"。'), items: [
    { text: '돌', pron: 'dol', vi: 'hòn đá', en: 'stone' },
    { text: '둘', pron: 'dul', vi: 'hai (số thuần Hàn)', en: 'two (native Korean)' } ] },
  { title: L('ㅡ – ㅜ', 'ㅡ – ㅜ', 'ㅡ – ㅜ'),
    note: L('ㅡ môi dẹt ("ư"), ㅜ môi tròn ("u").', 'ㅡ has flat lips (like Vietnamese "ư"), ㅜ rounded lips ("u").', 'ㅡ 展唇（"ư"），ㅜ 圆唇（"u"）。'), items: [
    { text: '그림', pron: 'geurim', vi: 'bức tranh', en: 'picture' },
    { text: '구름', pron: 'gureum', vi: 'đám mây', en: 'cloud' } ] },
  { title: L('ㅐ – ㅔ', 'ㅐ – ㅔ', 'ㅐ – ㅔ'),
    note: L('Ngày nay hai âm gần như giống nhau; phân biệt nhờ chính tả và ngữ cảnh.', 'Today the two sound almost the same; they are told apart by spelling and context.', '如今两个音几乎一样，要靠拼写和语境区分。'), items: [
    { text: '개', pron: 'gae', vi: 'con chó', en: 'dog' },
    { text: '게', pron: 'ge', vi: 'con cua', en: 'crab' } ] },
];

/** The 7 final sounds (batchim). */
const FINALS_OVERVIEW: SoundItem[] = [
  { label: '[k] ㄱ ㅋ ㄲ', text: '국', pron: 'guk', vi: 'canh, súp', en: 'soup', note: L('Ngậm lại ở cuống lưỡi, không bật ra — như "c" cuối trong "các".', 'Stop at the back of the tongue without releasing — like final "c" in Vietnamese "các".', '舌根堵住，不爆破——像越南语 "các" 末尾的 "c"。') },
  { label: '[n] ㄴ', text: '산', pron: 'san', vi: 'núi', en: 'mountain', note: L('Như "n" cuối trong "san".', 'Like final "n" in Vietnamese "san".', '像越南语 "san" 末尾的 "n"。') },
  { label: '[t] ㄷ ㅅ ㅆ ㅈ ㅊ ㅌ ㅎ', text: '옷', pron: 'ot', vi: 'quần áo', en: 'clothes', note: L('Bảy chữ cùng đọc [t], như "t" cuối trong "ốt".', 'Seven letters all read [t], like final "t" in Vietnamese "ốt".', '七个字母都读 [t]，像越南语 "ốt" 末尾的 "t"。') },
  { label: '[l] ㄹ', text: '물', pron: 'mul', vi: 'nước', en: 'water', note: L('Đầu lưỡi chạm lợi và giữ lại: "l".', 'Tongue tip touches the gum ridge and stays: "l".', '舌尖抵住上齿龈不放："l"。') },
  { label: '[m] ㅁ', text: '밤', pron: 'bam', vi: 'ban đêm; hạt dẻ', en: 'night; chestnut', note: L('Khép môi: "m".', 'Close the lips: "m".', '双唇闭合："m"。') },
  { label: '[p] ㅂ ㅍ', text: '밥', pron: 'bap', vi: 'cơm', en: 'cooked rice; a meal', note: L('Khép môi, không bật — như "p" cuối trong "đẹp".', 'Close the lips without releasing — like final "p" in Vietnamese "đẹp".', '双唇闭合不爆破——像越南语 "đẹp" 末尾的 "p"。') },
  { label: '[ng] ㅇ', text: '강', pron: 'gang', vi: 'con sông', en: 'river', note: L('Như "ng" cuối trong "sang".', 'Like final "ng" in Vietnamese "sang".', '像越南语 "sang" 末尾的 "ng"。') },
];

const FINALS_SAME_SOUND: SoundItem[] = [
  { label: 'ㄲ → [k]', text: '밖', pron: 'bak', vi: 'bên ngoài', en: 'outside', note: L('Đọc [박].', 'Read [박].', '读 [박]。') },
  { label: 'ㅋ → [k]', text: '부엌', pron: 'bueok', vi: 'nhà bếp', en: 'kitchen', note: L('Đọc [부억].', 'Read [부억].', '读 [부억]。') },
  { label: 'ㅈ → [t]', text: '낮', pron: 'nat', vi: 'ban ngày', en: 'daytime', note: L('Đọc [낟].', 'Read [낟].', '读 [낟]。') },
  { label: 'ㅊ → [t]', text: '꽃', pron: 'kkot', vi: 'hoa', en: 'flower', note: L('Đọc [꼳].', 'Read [꼳].', '读 [꼳]。') },
  { label: 'ㅌ → [t]', text: '밭', pron: 'bat', vi: 'ruộng, vườn', en: 'field', note: L('Đọc [받].', 'Read [받].', '读 [받]。') },
  { label: 'ㅍ → [p]', text: '앞', pron: 'ap', vi: 'phía trước', en: 'front', note: L('Đọc [압].', 'Read [압].', '读 [압]。') },
];

const RULES: SoundRule[] = [
  {
    title: L('Nối âm (연음)', 'Linking (연음)', '连音（연음）'),
    body: L(
      'Khi âm tiết có phụ âm cuối đứng trước âm tiết bắt đầu bằng ㅇ câm, phụ âm cuối "chuyển sang" đọc cùng nguyên âm sau.',
      'When a syllable with a final consonant is followed by a syllable starting with silent ㅇ, the final consonant moves over and is read with the next vowel.',
      '带收音的音节后面接以不发音的 ㅇ 开头的音节时，收音移到后一个音节，和后面的元音连读。',
    ),
    examples: [
      { text: '한국어', written: '한국어', spoken: '[한구거] hangugeo', vi: 'tiếng Hàn', en: 'the Korean language' },
      { text: '음식이', written: '음식이', spoken: '[음시기] eumsigi', vi: 'món ăn (chủ ngữ)', en: 'food (as subject)' },
      { text: '옷이', written: '옷이', spoken: '[오시] osi', vi: 'quần áo (chủ ngữ)', en: 'clothes (as subject)' },
    ],
  },
  {
    title: L('Mũi hóa (비음화)', 'Nasalization (비음화)', '鼻音化（비음화）'),
    body: L(
      'Phụ âm cuối [p] [t] [k] đứng trước ㄴ hoặc ㅁ sẽ đọc thành âm mũi: [p] → [m], [t] → [n], [k] → [ng].',
      'A final [p] [t] [k] before ㄴ or ㅁ becomes a nasal: [p] → [m], [t] → [n], [k] → [ng].',
      '收音 [p] [t] [k] 在 ㄴ 或 ㅁ 前面变成鼻音：[p] → [m]，[t] → [n]，[k] → [ng]。',
    ),
    examples: [
      { text: '감사합니다', written: '감사합니다', spoken: '[감사함니다] gamsahamnida', vi: 'cảm ơn', en: 'thank you' },
      { text: '합니다', written: '합니다', spoken: '[함니다] hamnida', vi: 'làm (trang trọng)', en: 'does (formal)' },
      { text: '한국말', written: '한국말', spoken: '[한궁말] hangungmal', vi: 'tiếng Hàn (khẩu ngữ)', en: 'Korean speech' },
    ],
  },
  {
    title: L('ㅎ yếu đi / mất đi', 'ㅎ weakening', 'ㅎ 弱化 / 脱落'),
    body: L(
      'ㅎ ở cuối âm tiết đứng trước nguyên âm thì không đọc; ㅎ giữa hai âm hữu thanh cũng thường rất nhẹ.',
      'A final ㅎ before a vowel is silent; ㅎ between voiced sounds is also often very weak.',
      '收音 ㅎ 在元音前不发音；处在浊音之间的 ㅎ 也常常很弱。',
    ),
    examples: [
      { text: '좋아요', written: '좋아요', spoken: '[조아요] joayo', vi: 'tốt, thích', en: 'good; I like it' },
      { text: '많이', written: '많이', spoken: '[마니] mani', vi: 'nhiều', en: 'a lot' },
      { text: '괜찮아요', written: '괜찮아요', spoken: '[괜차나요] gwaenchanayo', vi: 'không sao', en: "it's okay" },
    ],
  },
  {
    title: L('Bật hơi hóa (격음화)', 'Aspiration (격음화)', '激音化（격음화）'),
    body: L(
      'ㄱ ㄷ ㅂ ㅈ gặp ㅎ (trước hoặc sau) sẽ hợp lại thành âm bật hơi ㅋ ㅌ ㅍ ㅊ.',
      'ㄱ ㄷ ㅂ ㅈ meeting ㅎ (before or after) merge into the aspirated ㅋ ㅌ ㅍ ㅊ.',
      'ㄱ ㄷ ㅂ ㅈ 和 ㅎ 相遇（无论前后）合成激音 ㅋ ㅌ ㅍ ㅊ。',
    ),
    examples: [
      { text: '축하해요', written: '축하해요', spoken: '[추카해요] chukahaeyo', vi: 'chúc mừng', en: 'congratulations' },
      { text: '좋다', written: '좋다', spoken: '[조타] jota', vi: 'tốt', en: 'to be good' },
      { text: '많다', written: '많다', spoken: '[만타] manta', vi: 'nhiều (tính từ)', en: 'to be many' },
    ],
  },
];

export const PRONUNCIATION: Course['pronunciation'] = {
  intro: L(
    'Tiếng Hàn không có thanh điệu. Mỗi khối Hangul là một âm tiết: phụ âm đầu + nguyên âm (+ phụ âm cuối). Điều khó nhất là phân biệt phụ âm thường – bật hơi – căng, và các quy tắc biến âm khi ghép từ.',
    'Korean has no tones. Each Hangul block is one syllable: initial consonant + vowel (+ final consonant). The hardest parts are telling plain, aspirated and tense consonants apart, and the sound changes between syllables.',
    '韩语没有声调。每个韩文方块是一个音节：初声 + 元音（+ 收音）。最难的是区分平音、激音、紧音，以及音节之间的音变规则。',
  ),
  tabs: [
    {
      id: 'vowels',
      title: L('Nguyên âm', 'Vowels', '元音'),
      intro: L('21 nguyên âm: 6 cơ bản, 4 nguyên âm "y", ㅐ ㅔ và các nguyên âm ghép.', '21 vowels: 6 basic ones, 4 "y" vowels, ㅐ ㅔ and the compound vowels.', '21 个元音：6 个基本元音、4 个 y 类元音、ㅐ ㅔ 和复合元音。'),
      blocks: [
        { kind: 'sounds', group: { title: L('Nguyên âm cơ bản', 'Basic vowels', '基本元音'), items: BASIC_VOWELS } },
        { kind: 'sounds', group: { title: L('Nguyên âm "y"', '"Y" vowels', 'y 类元音'), items: Y_VOWELS } },
        { kind: 'sounds', group: { title: L('ㅐ ㅔ và nguyên âm ghép', 'ㅐ ㅔ and compound vowels', 'ㅐ ㅔ 和复合元音'), items: MORE_VOWELS } },
      ],
    },
    {
      id: 'consonants',
      title: L('Phụ âm', 'Consonants', '辅音'),
      intro: L('19 phụ âm: 10 cơ bản, 4 bật hơi, 5 căng.', '19 consonants: 10 basic, 4 aspirated, 5 tense.', '19 个辅音：10 个基本辅音、4 个激音、5 个紧音。'),
      blocks: [
        { kind: 'sounds', group: { title: L('Phụ âm cơ bản', 'Basic consonants', '基本辅音'), items: BASIC_CONSONANTS } },
        { kind: 'sounds', group: { title: L('Phụ âm bật hơi', 'Aspirated consonants', '激音'), items: ASPIRATED_CONSONANTS } },
        { kind: 'sounds', group: { title: L('Phụ âm căng', 'Tense consonants', '紧音'), items: TENSE_CONSONANTS } },
      ],
    },
    {
      id: 'triplets',
      title: L('Bộ ba & cặp dễ nhầm', 'Triplets & confusable pairs', '三组对比和易混音'),
      blocks: [
        {
          kind: 'text',
          title: L('Thường – bật hơi – căng', 'Plain – aspirated – tense', '平音 – 激音 – 紧音'),
          body: [
            L('Thường (ㄱ ㄷ ㅂ ㅈ ㅅ): nhẹ, có chút hơi. Bật hơi (ㅋ ㅌ ㅍ ㅊ): luồng hơi mạnh. Căng (ㄲ ㄸ ㅃ ㅉ ㅆ): cổ họng siết, không hơi, giọng hơi cao.',
              'Plain (ㄱ ㄷ ㅂ ㅈ ㅅ): soft, a little air. Aspirated (ㅋ ㅌ ㅍ ㅊ): a strong puff of air. Tense (ㄲ ㄸ ㅃ ㅉ ㅆ): tight throat, no air, slightly higher pitch.',
              '平音（ㄱ ㄷ ㅂ ㅈ ㅅ）：轻，稍带气。激音（ㅋ ㅌ ㅍ ㅊ）：气流强。紧音（ㄲ ㄸ ㅃ ㅉ ㅆ）：喉部紧张，不送气，音调略高。'),
            L('Mẹo cho người Việt: ㅌ ≈ "th", ㄸ ≈ "t", ㅉ ≈ "ch", ㄲ ≈ "c" của tiếng Việt.',
              'Tip for Vietnamese speakers: ㅌ ≈ Vietnamese "th", ㄸ ≈ "t", ㅉ ≈ "ch", ㄲ ≈ "c".',
              '给越南人的窍门：ㅌ ≈ 越南语 "th"，ㄸ ≈ "t"，ㅉ ≈ "ch"，ㄲ ≈ "c"。'),
          ],
        },
        { kind: 'contrasts', title: L('Nghe và phân biệt', 'Listen and tell apart', '听辨'), intro: L('Bấm từng từ để nghe, rồi luyện nghe chọn ở cuối trang.', 'Tap each word to listen, then try the listening drill at the bottom of the page.', '点击每个词收听，然后做页面底部的听辨练习。'), contrasts: CONTRASTS },
      ],
    },
    {
      id: 'batchim',
      title: L('Phụ âm cuối (받침)', 'Final consonants (받침)', '收音（받침）'),
      intro: L(
        'Phụ âm ở đáy khối gọi là 받침 (batchim). Dù có nhiều chữ, chỉ có 7 âm cuối: [k] [n] [t] [l] [m] [p] [ng]. Âm cuối không bật ra, giống phụ âm cuối tiếng Việt.',
        'The consonant at the bottom of a block is called 받침 (batchim). Many letters can appear there, but there are only 7 final sounds: [k] [n] [t] [l] [m] [p] [ng]. Final sounds are not released, like Vietnamese final consonants.',
        '方块底部的辅音叫 받침（收音）。能做收音的字母很多，但只有 7 个收音：[k] [n] [t] [l] [m] [p] [ng]。收音不爆破，和越南语的韵尾一样。',
      ),
      blocks: [
        { kind: 'sounds', group: { title: L('7 âm cuối', 'The 7 final sounds', '7 个收音'), items: FINALS_OVERVIEW } },
        { kind: 'sounds', group: { title: L('Chữ khác — cùng âm', 'Different letters, same sound', '字母不同，发音相同'), intro: L('Nghe: các chữ cuối này được đọc theo một trong 7 âm.', 'Listen: these final letters are read as one of the 7 sounds.', '听：这些收音字母都读成 7 个收音之一。'), items: FINALS_SAME_SOUND } },
      ],
    },
    {
      id: 'rules',
      title: L('Quy tắc biến âm', 'Sound change rules', '音变规则'),
      intro: L('Tiếng Hàn viết một đằng, đọc một nẻo ở chỗ nối các âm tiết. Phiên âm La-tinh ghi theo cách đọc thật.', 'Korean is often not read the way it is spelled where syllables meet. Romanization follows the real pronunciation.', '韩语在音节相接处常常写法和读法不同。罗马字按实际读音标注。'),
      blocks: [{ kind: 'rules', title: L('Viết và đọc', 'Written vs spoken', '写法与读法'), rules: RULES }],
    },
    {
      id: 'speak',
      title: L('Luyện nói', 'Speaking', '口语'),
      blocks: [
        {
          kind: 'speak',
          title: L('Đọc to', 'Read aloud', '大声读'),
          intro: L('Đọc từng dòng, chú ý luồng hơi và các quy tắc biến âm.', 'Read each line, paying attention to air and sound changes.', '逐行朗读，注意气流和音变。'),
          items: [
            { text: '아 어 오 우 으 이', pron: 'a eo o u eu i' },
            { text: '가 카 까', pron: 'ga ka kka' },
            { text: '달 탈 딸', pron: 'dal tal ttal', vi: 'mặt trăng · mặt nạ · con gái', en: 'moon · mask · daughter' },
            { text: '불 풀 뿔', pron: 'bul pul ppul', vi: 'lửa · cỏ · sừng', en: 'fire · grass · horn' },
            { text: '방 빵', pron: 'bang ppang', vi: 'căn phòng · bánh mì', en: 'room · bread' },
            { text: '한국어', pron: 'hangugeo', vi: 'tiếng Hàn', en: 'the Korean language' },
            { text: '감사합니다', pron: 'gamsahamnida', vi: 'cảm ơn', en: 'thank you' },
            { text: '좋아요', pron: 'joayo', vi: 'tốt, thích', en: 'good; I like it' },
          ],
        },
      ],
    },
  ],
};
