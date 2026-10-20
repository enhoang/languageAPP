import type { Contrast, LText, SoundGroup, SoundItem, SoundRule, ToneSet } from '../../types';

/** Tone sets: same syllable, four tones. Used for listening drills. */
export const TONE_SETS: ToneSet[] = [
  { base: 'ma', items: [
    { tone: 1, text: '妈', pron: 'mā', vi: 'mẹ', en: 'mother' },
    { tone: 2, text: '麻', pron: 'má', vi: 'tê; cây gai', en: 'numb; hemp' },
    { tone: 3, text: '马', pron: 'mǎ', vi: 'ngựa', en: 'horse' },
    { tone: 4, text: '骂', pron: 'mà', vi: 'mắng', en: 'to scold' },
  ] },
  { base: 'ba', items: [
    { tone: 1, text: '八', pron: 'bā', vi: 'tám', en: 'eight' },
    { tone: 2, text: '拔', pron: 'bá', vi: 'nhổ', en: 'to pull out' },
    { tone: 3, text: '把', pron: 'bǎ', vi: 'cầm, nắm', en: 'to hold; to grasp' },
    { tone: 4, text: '爸', pron: 'bà', vi: 'bố', en: 'dad' },
  ] },
  { base: 'yi', items: [
    { tone: 1, text: '衣', pron: 'yī', vi: 'áo', en: 'clothes' },
    { tone: 2, text: '姨', pron: 'yí', vi: 'dì', en: "aunt (mother's sister)" },
    { tone: 3, text: '椅', pron: 'yǐ', vi: 'ghế', en: 'chair' },
    { tone: 4, text: '意', pron: 'yì', vi: 'ý', en: 'meaning; idea' },
  ] },
  { base: 'wu', items: [
    { tone: 1, text: '屋', pron: 'wū', vi: 'nhà, phòng', en: 'house; room' },
    { tone: 2, text: '无', pron: 'wú', vi: 'không có', en: 'without; none' },
    { tone: 3, text: '五', pron: 'wǔ', vi: 'năm (5)', en: 'five (5)' },
    { tone: 4, text: '雾', pron: 'wù', vi: 'sương mù', en: 'fog' },
  ] },
  { base: 'tang', items: [
    { tone: 1, text: '汤', pron: 'tāng', vi: 'canh', en: 'soup' },
    { tone: 2, text: '糖', pron: 'táng', vi: 'đường, kẹo', en: 'sugar; candy' },
    { tone: 3, text: '躺', pron: 'tǎng', vi: 'nằm', en: 'to lie down' },
    { tone: 4, text: '烫', pron: 'tàng', vi: 'bỏng, nóng', en: 'scalding hot' },
  ] },
  { base: 'shu', items: [
    { tone: 1, text: '书', pron: 'shū', vi: 'sách', en: 'book' },
    { tone: 2, text: '熟', pron: 'shú', vi: 'chín, quen', en: 'ripe; familiar' },
    { tone: 3, text: '鼠', pron: 'shǔ', vi: 'chuột', en: 'mouse; rat' },
    { tone: 4, text: '树', pron: 'shù', vi: 'cây', en: 'tree' },
  ] },
  { base: 'fei', items: [
    { tone: 1, text: '飞', pron: 'fēi', vi: 'bay', en: 'to fly' },
    { tone: 2, text: '肥', pron: 'féi', vi: 'béo', en: 'fat' },
    { tone: 3, text: '匪', pron: 'fěi', vi: 'phỉ, cướp', en: 'bandit' },
    { tone: 4, text: '费', pron: 'fèi', vi: 'phí', en: 'fee; to spend' },
  ] },
  { base: 'ti', items: [
    { tone: 1, text: '踢', pron: 'tī', vi: 'đá', en: 'to kick' },
    { tone: 2, text: '题', pron: 'tí', vi: 'đề, câu hỏi', en: 'topic; question' },
    { tone: 3, text: '体', pron: 'tǐ', vi: 'thân thể', en: 'body' },
    { tone: 4, text: '替', pron: 'tì', vi: 'thay', en: 'to replace' },
  ] },
];

export const TONES: SoundItem[] = [
  { label: { vi: 'Thanh 1 ( ˉ )', en: 'Tone 1 ( ˉ )', zh: '第一声 ( ˉ )' }, text: '妈', pron: 'mā', vi: 'mẹ', en: 'mother', note: {
    vi: 'Cao và đều (55). Giống thanh ngang nhưng giữ giọng cao.',
    en: 'High and level (55). Like the Vietnamese level tone (thanh ngang), but held high.',
    zh: '高而平（55）。像越南语的平声（thanh ngang），但要保持高音。' } },
  { label: { vi: 'Thanh 2 ( ˊ )', en: 'Tone 2 ( ˊ )', zh: '第二声 ( ˊ )' }, text: '麻', pron: 'má', vi: 'tê; cây gai', en: 'numb; hemp', note: {
    vi: 'Đi lên từ giữa lên cao (35), gần giống thanh sắc.',
    en: 'Rises from mid to high (35), close to the Vietnamese sắc tone.',
    zh: '从中音升到高音（35），接近越南语的锐声（thanh sắc）。' } },
  { label: { vi: 'Thanh 3 ( ˇ )', en: 'Tone 3 ( ˇ )', zh: '第三声 ( ˇ )' }, text: '马', pron: 'mǎ', vi: 'con ngựa', en: 'horse', note: {
    vi: 'Xuống thấp rồi lên (214). Trong câu thường chỉ đọc phần thấp, gần thanh hỏi nhưng trầm hơn.',
    en: 'Dips low, then rises (214). In sentences usually only the low part is said — close to the Vietnamese hỏi tone, but deeper.',
    zh: '先降后升（214）。在句子中通常只读低的部分，接近越南语的问声（thanh hỏi），但更低沉。' } },
  { label: { vi: 'Thanh 4 ( ˋ )', en: 'Tone 4 ( ˋ )', zh: '第四声 ( ˋ )' }, text: '骂', pron: 'mà', vi: 'mắng', en: 'to scold', note: {
    vi: 'Rơi mạnh từ cao xuống thấp (51), dứt khoát — nằm giữa thanh huyền và thanh nặng.',
    en: 'Falls sharply from high to low (51), short and firm — somewhere between the Vietnamese huyền and nặng tones.',
    zh: '从高音迅速降到低音（51），干脆有力，介于越南语的玄声（thanh huyền）和重声（thanh nặng）之间。' } },
  { label: { vi: 'Thanh nhẹ', en: 'Neutral tone', zh: '轻声' }, text: '吗', pron: 'ma', vi: '(trợ từ hỏi)', en: '(question particle)', note: {
    vi: 'Ngắn, nhẹ, không có dấu. Thường ở âm tiết cuối: 妈妈 māma.',
    en: 'Short and light, with no tone mark. Usually on the last syllable: 妈妈 māma.',
    zh: '短而轻，不标调号。常出现在最后一个音节：妈妈 māma。' } },
];

export const INITIAL_GROUPS: SoundGroup[] = [
  { title: { vi: 'Âm môi: b p m f', en: 'Labials: b p m f', zh: '唇音：b p m f' }, items: [
    { label: 'b', text: '爸', pron: 'bà', vi: 'bố', en: 'dad', note: { vi: 'Gần "p" tiếng Việt, KHÔNG bật hơi.', en: 'Close to Vietnamese "p", NOT aspirated.', zh: '接近越南语的 "p"，不送气。' } },
    { label: 'p', text: '爬', pron: 'pá', vi: 'bò, leo', en: 'to crawl; to climb', note: { vi: 'Bật hơi mạnh.', en: 'Strongly aspirated.', zh: '强送气。' } },
    { label: 'm', text: '妈', pron: 'mā', vi: 'mẹ', en: 'mother', note: { vi: 'Như "m".', en: 'Like "m".', zh: '同 "m"。' } },
    { label: 'f', text: '飞', pron: 'fēi', vi: 'bay', en: 'to fly', note: { vi: 'Như "ph".', en: 'Like Vietnamese "ph" (English "f").', zh: '像越南语的 "ph"。' } },
  ] },
  { title: { vi: 'Âm đầu lưỡi: d t n l', en: 'Alveolars: d t n l', zh: '舌尖中音：d t n l' }, items: [
    { label: 'd', text: '大', pron: 'dà', vi: 'to', en: 'big', note: { vi: 'Gần "t" tiếng Việt, không bật hơi (không phải "đ").', en: 'Close to Vietnamese "t", unaspirated (not "đ").', zh: '接近越南语的 "t"，不送气（不是 "đ"）。' } },
    { label: 't', text: '他', pron: 'tā', vi: 'anh ấy', en: 'he', note: { vi: 'Như "th" tiếng Việt, bật hơi.', en: 'Like Vietnamese "th", aspirated.', zh: '像越南语的 "th"，送气。' } },
    { label: 'n', text: '你', pron: 'nǐ', vi: 'bạn', en: 'you', note: { vi: 'Như "n".', en: 'Like "n".', zh: '同 "n"。' } },
    { label: 'l', text: '来', pron: 'lái', vi: 'đến', en: 'to come', note: { vi: 'Như "l".', en: 'Like "l".', zh: '同 "l"。' } },
  ] },
  { title: { vi: 'Âm cuống lưỡi: g k h', en: 'Velars: g k h', zh: '舌根音：g k h' }, items: [
    { label: 'g', text: '哥', pron: 'gē', vi: 'anh trai', en: 'older brother', note: { vi: 'Gần "c/k" tiếng Việt, không bật hơi.', en: 'Close to Vietnamese "c/k", unaspirated.', zh: '接近越南语的 "c/k"，不送气。' } },
    { label: 'k', text: '可', pron: 'kě', vi: 'có thể', en: 'can; may', note: { vi: 'Như g nhưng bật hơi mạnh ("kh" nhẹ).', en: 'Like g but strongly aspirated (a light Vietnamese "kh").', zh: '像 g，但强送气（像轻的越南语 "kh"）。' } },
    { label: 'h', text: '喝', pron: 'hē', vi: 'uống', en: 'to drink', note: { vi: 'Xát ở cuống lưỡi, gần "h" và "kh".', en: 'Friction at the back of the tongue, between Vietnamese "h" and "kh".', zh: '在舌根摩擦，介于越南语的 "h" 和 "kh" 之间。' } },
  ] },
  { title: { vi: 'Âm mặt lưỡi: j q x', en: 'Palatals: j q x', zh: '舌面音：j q x' }, items: [
    { label: 'j', text: '鸡', pron: 'jī', vi: 'gà', en: 'chicken', note: { vi: 'Gần "ch" tiếng Việt, không bật hơi.', en: 'Close to Vietnamese "ch", unaspirated.', zh: '接近越南语的 "ch"，不送气。' } },
    { label: 'q', text: '七', pron: 'qī', vi: 'bảy', en: 'seven', note: { vi: 'Như j nhưng bật hơi.', en: 'Like j but aspirated.', zh: '像 j，但送气。' } },
    { label: 'x', text: '西', pron: 'xī', vi: 'tây', en: 'west', note: { vi: 'Gần "x" tiếng Việt, mặt lưỡi áp gần vòm miệng.', en: 'Close to Vietnamese "x", with the front of the tongue near the hard palate.', zh: '接近越南语的 "x"，舌面贴近硬腭。' } },
  ] },
  { title: { vi: 'Âm uốn lưỡi: zh ch sh r', en: 'Retroflexes: zh ch sh r', zh: '翘舌音：zh ch sh r' }, items: [
    { label: 'zh', text: '知', pron: 'zhī', vi: 'biết', en: 'to know', note: { vi: 'Uốn lưỡi, không bật hơi, gần "tr".', en: 'Tongue curled back, unaspirated, close to Vietnamese "tr".', zh: '翘舌，不送气，接近越南语的 "tr"。' } },
    { label: 'ch', text: '吃', pron: 'chī', vi: 'ăn', en: 'to eat', note: { vi: 'Uốn lưỡi, bật hơi.', en: 'Tongue curled back, aspirated.', zh: '翘舌，送气。' } },
    { label: 'sh', text: '是', pron: 'shì', vi: 'là', en: 'to be', note: { vi: 'Gần "s" uốn lưỡi.', en: 'Close to a retroflex Vietnamese "s".', zh: '接近卷舌的越南语 "s"。' } },
    { label: 'r', text: '日', pron: 'rì', vi: 'mặt trời, ngày', en: 'sun; day', note: { vi: 'Uốn lưỡi, gần "r" nhẹ.', en: 'Tongue curled back, close to a soft "r".', zh: '翘舌，接近轻的 "r"。' } },
  ] },
  { title: { vi: 'Âm đầu lưỡi trước: z c s', en: 'Dental sibilants: z c s', zh: '舌尖前音：z c s' }, items: [
    { label: 'z', text: '字', pron: 'zì', vi: 'chữ', en: 'character', note: { vi: 'Đầu lưỡi thẳng, không bật hơi, gần "ch" thẳng lưỡi.', en: 'Flat tongue tip, unaspirated, close to a flat-tongued Vietnamese "ch" (like "ds" in "kids").', zh: '舌尖平伸，不送气，接近平舌的越南语 "ch"。' } },
    { label: 'c', text: '次', pron: 'cì', vi: 'lần', en: 'time (occurrence)', note: { vi: 'Như z nhưng bật hơi ("ts" + hơi).', en: 'Like z but aspirated ("ts" + a puff of air).', zh: '像 z，但送气（"ts" 加气流）。' } },
    { label: 's', text: '四', pron: 'sì', vi: 'bốn', en: 'four', note: { vi: 'Như "x" tiếng Việt.', en: 'Like Vietnamese "x" (English "s").', zh: '像越南语的 "x"。' } },
  ] },
];

export const FINAL_GROUPS: SoundGroup[] = [
  { title: { vi: 'Vận mẫu đơn', en: 'Simple finals', zh: '单韵母' }, items: [
    { label: 'a', text: '啊', pron: 'ā', note: { vi: 'Như "a".', en: 'Like "a".', zh: '同 "a"。' } },
    { label: 'o', text: '喔', pron: 'ō', note: { vi: 'Như "ô" hơi tròn môi.', en: 'Like Vietnamese "ô" with slightly rounded lips.', zh: '像越南语的 "ô"，嘴唇略圆。' } },
    { label: 'e', text: '鹅', pron: 'é', vi: 'ngỗng', en: 'goose', note: { vi: 'Giữa "ơ" và "ưa".', en: 'Between Vietnamese "ơ" and "ưa".', zh: '介于越南语的 "ơ" 和 "ưa" 之间。' } },
    { label: 'i', text: '衣', pron: 'yī', vi: 'áo', en: 'clothes', note: { vi: 'Như "i". Đứng một mình viết yi.', en: 'Like "i". Written yi when it stands alone.', zh: '同 "i"。单独成音节时写作 yi。' } },
    { label: 'u', text: '乌', pron: 'wū', vi: 'đen', en: 'black; crow', note: { vi: 'Như "u". Đứng một mình viết wu.', en: 'Like "u". Written wu when it stands alone.', zh: '同 "u"。单独成音节时写作 wu。' } },
    { label: 'ü', text: '鱼', pron: 'yú', vi: 'cá', en: 'fish', note: { vi: 'Như "uy" chu tròn môi. Đứng một mình viết yu.', en: 'Like Vietnamese "uy" with rounded lips. Written yu when it stands alone.', zh: '像越南语的 "uy"，嘴唇撮圆。单独成音节时写作 yu。' } },
  ] },
  { title: { vi: 'Vận mẫu kép', en: 'Compound finals', zh: '复韵母' }, items: [
    { label: 'ai', text: '爱', pron: 'ài', vi: 'yêu', en: 'to love', note: { vi: 'Như "ai".', en: 'Like "ai".', zh: '同 "ai"。' } },
    { label: 'ei', text: '飞', pron: 'fēi', vi: 'bay', en: 'to fly', note: { vi: 'Như "ây".', en: 'Like Vietnamese "ây".', zh: '像越南语的 "ây"。' } },
    { label: 'ao', text: '好', pron: 'hǎo', vi: 'tốt', en: 'good', note: { vi: 'Như "ao".', en: 'Like "ao".', zh: '同 "ao"。' } },
    { label: 'ou', text: '口', pron: 'kǒu', vi: 'miệng', en: 'mouth', note: { vi: 'Như "âu".', en: 'Like Vietnamese "âu".', zh: '像越南语的 "âu"。' } },
    { label: 'ia', text: '家', pron: 'jiā', vi: 'nhà', en: 'home', note: { vi: 'Như "i-a" đọc liền.', en: 'Like "i-a" said together.', zh: '像 "i-a" 连读。' } },
    { label: 'ie', text: '谢', pron: 'xiè', vi: 'cảm ơn', en: 'to thank', note: { vi: 'Như "iê".', en: 'Like Vietnamese "iê".', zh: '像越南语的 "iê"。' } },
    { label: 'uo', text: '我', pron: 'wǒ', vi: 'tôi', en: 'I', note: { vi: 'Như "ua" (u-ô).', en: 'Like Vietnamese "ua" (u-ô).', zh: '像越南语的 "ua"（u-ô）。' } },
    { label: 'ui (uei)', text: '对', pron: 'duì', vi: 'đúng', en: 'correct', note: { vi: 'Như "uây".', en: 'Like Vietnamese "uây".', zh: '像越南语的 "uây"。' } },
    { label: 'iu (iou)', text: '六', pron: 'liù', vi: 'sáu', en: 'six', note: { vi: 'Như "iêu".', en: 'Like Vietnamese "iêu".', zh: '像越南语的 "iêu"。' } },
  ] },
  { title: { vi: 'Vận mẫu mũi', en: 'Nasal finals', zh: '鼻韵母' }, items: [
    { label: 'an', text: '山', pron: 'shān', vi: 'núi', en: 'mountain', note: { vi: 'Như "an".', en: 'Like "an".', zh: '同 "an"。' } },
    { label: 'ang', text: '上', pron: 'shàng', vi: 'trên', en: 'up; above', note: { vi: 'Như "ang".', en: 'Like "ang".', zh: '同 "ang"。' } },
    { label: 'en', text: '门', pron: 'mén', vi: 'cửa', en: 'door', note: { vi: 'Như "ân".', en: 'Like Vietnamese "ân".', zh: '像越南语的 "ân"。' } },
    { label: 'eng', text: '冷', pron: 'lěng', vi: 'lạnh', en: 'cold', note: { vi: 'Như "âng".', en: 'Like Vietnamese "âng".', zh: '像越南语的 "âng"。' } },
    { label: 'in', text: '心', pron: 'xīn', vi: 'tim', en: 'heart', note: { vi: 'Như "in".', en: 'Like "in".', zh: '同 "in"。' } },
    { label: 'ing', text: '星', pron: 'xīng', vi: 'sao', en: 'star', note: { vi: 'Như "inh".', en: 'Like Vietnamese "inh".', zh: '像越南语的 "inh"。' } },
    { label: 'ong', text: '中', pron: 'zhōng', vi: 'giữa', en: 'middle', note: { vi: 'Như "ung".', en: 'Like Vietnamese "ung".', zh: '像越南语的 "ung"。' } },
  ] },
];

/** Minimal pairs / contrasts for listening discrimination. */
const same = (s: string): LText => ({ vi: s, en: s, zh: s });

export const CONTRASTS: Contrast[] = [
  { title: { vi: 'b – p (bật hơi)', en: 'b – p (aspiration)', zh: 'b – p（送气）' },
    note: { vi: 'p có luồng hơi mạnh, b thì không.', en: 'p has a strong puff of air; b does not.', zh: 'p 有强气流，b 没有。' }, items: [
    { text: '八', pron: 'bā', vi: 'tám', en: 'eight' }, { text: '趴', pron: 'pā', vi: 'nằm sấp', en: 'to lie on one\'s stomach' } ] },
  { title: { vi: 'd – t (bật hơi)', en: 'd – t (aspiration)', zh: 'd – t（送气）' },
    note: { vi: 't bật hơi, d không bật hơi.', en: 't is aspirated; d is not.', zh: 't 送气，d 不送气。' }, items: [
    { text: '都', pron: 'dōu', vi: 'đều', en: 'all; both' }, { text: '偷', pron: 'tōu', vi: 'trộm', en: 'to steal' } ] },
  { title: { vi: 'g – k (bật hơi)', en: 'g – k (aspiration)', zh: 'g – k（送气）' },
    note: { vi: 'k bật hơi, g không bật hơi.', en: 'k is aspirated; g is not.', zh: 'k 送气，g 不送气。' }, items: [
    { text: '哥', pron: 'gē', vi: 'anh trai', en: 'older brother' }, { text: '科', pron: 'kē', vi: 'khoa', en: 'department; branch of study' } ] },
  { title: same('j – zh – z'),
    note: { vi: 'j: mặt lưỡi; zh: uốn lưỡi; z: đầu lưỡi thẳng.', en: 'j: front of the tongue; zh: tongue curled back; z: flat tongue tip.', zh: 'j：舌面音；zh：翘舌音；z：平舌音。' }, items: [
    { text: '鸡', pron: 'jī', vi: 'gà', en: 'chicken' }, { text: '知', pron: 'zhī', vi: 'biết', en: 'to know' }, { text: '资', pron: 'zī', vi: 'vốn', en: 'capital; funds' } ] },
  { title: same('x – sh – s'),
    note: { vi: 'x: mặt lưỡi; sh: uốn lưỡi; s: đầu lưỡi thẳng.', en: 'x: front of the tongue; sh: tongue curled back; s: flat tongue tip.', zh: 'x：舌面音；sh：翘舌音；s：平舌音。' }, items: [
    { text: '西', pron: 'xī', vi: 'tây', en: 'west' }, { text: '诗', pron: 'shī', vi: 'thơ', en: 'poem' }, { text: '思', pron: 'sī', vi: 'nghĩ', en: 'to think' } ] },
  { title: same('c – ch'),
    note: { vi: 'c: đầu lưỡi thẳng; ch: uốn lưỡi. Cả hai đều bật hơi.', en: 'c: flat tongue tip; ch: tongue curled back. Both are aspirated.', zh: 'c：平舌；ch：翘舌。两者都送气。' }, items: [
    { text: '擦', pron: 'cā', vi: 'lau', en: 'to wipe' }, { text: '插', pron: 'chā', vi: 'cắm', en: 'to insert' } ] },
  { title: same('n – l'),
    note: { vi: 'n là âm mũi, l là âm cạnh lưỡi.', en: 'n is a nasal; l is a lateral (air flows along the sides of the tongue).', zh: 'n 是鼻音，l 是边音。' }, items: [
    { text: '南', pron: 'nán', vi: 'nam', en: 'south' }, { text: '蓝', pron: 'lán', vi: 'xanh lam', en: 'blue' } ] },
  { title: same('an – ang'),
    note: { vi: 'an kết thúc ở đầu lưỡi, ang ở cuống lưỡi.', en: 'an ends at the tip of the tongue; ang at the back of the tongue.', zh: 'an 收音在舌尖，ang 收音在舌根。' }, items: [
    { text: '山', pron: 'shān', vi: 'núi', en: 'mountain' }, { text: '商', pron: 'shāng', vi: 'buôn bán', en: 'trade; business' } ] },
  { title: same('en – eng'),
    note: { vi: 'en ≈ "ân", eng ≈ "âng".', en: 'en ≈ Vietnamese "ân", eng ≈ Vietnamese "âng".', zh: 'en ≈ 越南语的 "ân"，eng ≈ 越南语的 "âng"。' }, items: [
    { text: '真', pron: 'zhēn', vi: 'thật', en: 'real; true' }, { text: '争', pron: 'zhēng', vi: 'tranh', en: 'to compete; to argue' } ] },
  { title: same('in – ing'),
    note: { vi: 'in ≈ "in", ing ≈ "inh".', en: 'in ≈ Vietnamese "in", ing ≈ Vietnamese "inh".', zh: 'in ≈ 越南语的 "in"，ing ≈ 越南语的 "inh"。' }, items: [
    { text: '心', pron: 'xīn', vi: 'tim', en: 'heart' }, { text: '星', pron: 'xīng', vi: 'sao', en: 'star' } ] },
  { title: same('u – ü'),
    note: { vi: 'ü chu tròn môi như "uy".', en: 'For ü, round your lips as in Vietnamese "uy".', zh: 'ü 要撮圆嘴唇，像越南语的 "uy"。' }, items: [
    { text: '路', pron: 'lù', vi: 'đường', en: 'road' }, { text: '绿', pron: 'lǜ', vi: 'xanh lá', en: 'green' } ] },
];

export const SANDHI_RULES: SoundRule[] = [
  {
    title: { vi: 'Thanh 3 + thanh 3 → thanh 2 + thanh 3', en: 'Tone 3 + tone 3 → tone 2 + tone 3', zh: '第三声 + 第三声 → 第二声 + 第三声' },
    body: {
      vi: 'Khi hai âm tiết thanh 3 đứng liền nhau, âm tiết đầu đọc thành thanh 2. Pinyin vẫn viết dấu gốc.',
      en: 'When two tone-3 syllables come together, the first one is read as tone 2. Pinyin still shows the original tone mark.',
      zh: '两个第三声音节相连时，前一个音节读成第二声。拼音仍标原调。',
    },
    examples: [
      { text: '你好', written: 'nǐ hǎo', spoken: 'ní hǎo', vi: 'xin chào', en: 'hello' },
      { text: '很好', written: 'hěn hǎo', spoken: 'hén hǎo', vi: 'rất tốt', en: 'very good' },
      { text: '水果', written: 'shuǐguǒ', spoken: 'shuíguǒ', vi: 'hoa quả', en: 'fruit' },
    ],
  },
  {
    title: { vi: '不 bù + thanh 4 → bú', en: '不 bù + tone 4 → bú', zh: '不 bù + 第四声 → bú' },
    body: {
      vi: '不 bình thường đọc thanh 4. Khi đứng trước một âm tiết thanh 4, 不 đổi thành thanh 2. Sách giáo khoa thường viết luôn dấu đã đổi.',
      en: '不 is normally read in tone 4. Before a tone-4 syllable, 不 changes to tone 2. Textbooks usually write the changed tone mark.',
      zh: '“不”本调是第四声。在第四声音节前，“不”变成第二声。课本通常直接标变调后的声调。',
    },
    examples: [
      { text: '不是', written: 'bú shì', spoken: 'bú shì', vi: 'không phải', en: 'is not' },
      { text: '不对', written: 'bú duì', spoken: 'bú duì', vi: 'không đúng', en: 'not right' },
      { text: '不客气', written: 'bú kèqi', spoken: 'bú kèqi', vi: 'đừng khách sáo', en: "you're welcome" },
    ],
  },
];
