import type { Contrast, Course, LText, SoundGroup, SoundRule, SpeakItem } from '../../types';

const L = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });

/**
 * Minimal pairs that Vietnamese speakers often confuse. Used for listening drills (from Day 2 on).
 * Item texts are unique across all contrasts: generated exercise ids are built from them.
 */
export const CONTRASTS: Contrast[] = [
  {
    title: L('/ɪ/ – /iː/ (ship – sheep)', '/ɪ/ – /iː/ (ship – sheep)', '/ɪ/ – /iː/（ship – sheep）'),
    note: L(
      '/ɪ/ ngắn, miệng thả lỏng; /iː/ dài, miệng kéo sang hai bên như cười.',
      '/ɪ/ is short and relaxed; /iː/ is long, with the lips spread as in a smile.',
      '/ɪ/ 短而放松；/iː/ 长，嘴角向两边拉开，像微笑一样。',
    ),
    items: [
      { text: 'ship', pron: '/ʃɪp/', vi: 'tàu thủy', en: 'a big boat' },
      { text: 'sheep', pron: '/ʃiːp/', vi: 'con cừu', en: 'a farm animal with wool' },
    ],
  },
  {
    title: L('/ʊ/ – /uː/ (full – fool)', '/ʊ/ – /uː/ (full – fool)', '/ʊ/ – /uː/（full – fool）'),
    note: L(
      '/ʊ/ ngắn, môi hơi tròn; /uː/ dài, môi tròn và chu ra như "u" tiếng Việt kéo dài.',
      '/ʊ/ is short with slightly rounded lips; /uː/ is long, with lips pushed forward like a long Vietnamese "u".',
      '/ʊ/ 短，嘴唇稍圆；/uː/ 长，嘴唇圆而向前突出，像拉长的越南语 "u"。',
    ),
    items: [
      { text: 'full', pron: '/fʊl/', vi: 'đầy, no', en: 'with no more space inside' },
      { text: 'fool', pron: '/fuːl/', vi: 'kẻ ngốc', en: 'a silly person' },
    ],
  },
  {
    title: L('/e/ – /æ/ (bed – bad)', '/e/ – /æ/ (bed – bad)', '/e/ – /æ/（bed – bad）'),
    note: L(
      '/e/ gần giống "e" tiếng Việt; /æ/ mở miệng rộng hơn, nằm giữa "e" và "a".',
      '/e/ is close to Vietnamese "e"; for /æ/ open your mouth wider — between Vietnamese "e" and "a".',
      '/e/ 接近越南语的 "e"；发 /æ/ 时嘴张得更大，介于越南语 "e" 和 "a" 之间。',
    ),
    items: [
      { text: 'bed', pron: '/bed/', vi: 'cái giường', en: 'a thing you sleep on' },
      { text: 'bad', pron: '/bæd/', vi: 'xấu, tệ', en: 'not good' },
    ],
  },
  {
    title: L('/æ/ – /ʌ/ (cat – cut)', '/æ/ – /ʌ/ (cat – cut)', '/æ/ – /ʌ/（cat – cut）'),
    note: L(
      '/æ/ mở miệng rộng, gần "e–a"; /ʌ/ ngắn, gần giống "â" hoặc "ă" tiếng Việt.',
      '/æ/ has a wide-open mouth, like "e–a"; /ʌ/ is short, close to Vietnamese "â" or "ă".',
      '/æ/ 嘴张得很大，像 "e–a"；/ʌ/ 短，接近越南语的 "â" 或 "ă"。',
    ),
    items: [
      { text: 'cat', pron: '/kæt/', vi: 'con mèo', en: 'a small pet animal' },
      { text: 'cut', pron: '/kʌt/', vi: 'cắt', en: 'to divide with a knife' },
    ],
  },
  {
    title: L('/θ/ – /s/ (think – sink)', '/θ/ – /s/ (think – sink)', '/θ/ – /s/（think – sink）'),
    note: L(
      '/θ/: đặt đầu lưỡi giữa hai hàm răng rồi thổi hơi. /s/: lưỡi ở sau răng, không thò ra.',
      '/θ/: put the tip of your tongue between your teeth and blow. /s/: the tongue stays behind the teeth.',
      '/θ/：舌尖放在上下齿之间吹气。/s/：舌头留在牙齿后面，不伸出来。',
    ),
    items: [
      { text: 'think', pron: '/θɪŋk/', vi: 'nghĩ', en: 'to use your mind' },
      { text: 'sink', pron: '/sɪŋk/', vi: 'bồn rửa; chìm', en: 'a bowl for washing; to go down in water' },
    ],
  },
  {
    title: L('/θ/ – /t/ (three – tree)', '/θ/ – /t/ (three – tree)', '/θ/ – /t/（three – tree）'),
    note: L(
      'Đừng đọc "th" thành "t" hay "th" tiếng Việt: lưỡi phải chạm răng và có luồng hơi đi qua.',
      'Do not turn "th" into "t" or Vietnamese "th": the tongue touches the teeth and air flows past it.',
      '不要把 "th" 读成 "t" 或越南语的 "th"：舌头要碰到牙齿，并让气流通过。',
    ),
    items: [
      { text: 'three', pron: '/θriː/', vi: 'số ba', en: 'the number 3' },
      { text: 'tree', pron: '/triː/', vi: 'cái cây', en: 'a tall plant with a trunk' },
    ],
  },
  {
    title: L('/s/ – /ʃ/ (sea – she)', '/s/ – /ʃ/ (sea – she)', '/s/ – /ʃ/（sea – she）'),
    note: L(
      '/s/ như "x" tiếng Việt; /ʃ/ môi tròn, chu ra, như tiếng "suỵt".',
      '/s/ is like Vietnamese "x"; for /ʃ/ round and push out your lips, like saying "shh".',
      '/s/ 像越南语的 "x"；发 /ʃ/ 时嘴唇圆而突出，像 "嘘" 的声音。',
    ),
    items: [
      { text: 'sea', pron: '/siː/', vi: 'biển', en: 'a big area of salt water' },
      { text: 'she', pron: '/ʃiː/', vi: 'cô ấy', en: 'that woman or girl' },
    ],
  },
  {
    title: L('/l/ – /r/ (light – right)', '/l/ – /r/ (light – right)', '/l/ – /r/（light – right）'),
    note: L(
      '/l/: đầu lưỡi chạm lợi trên. /r/: lưỡi cong lên nhưng KHÔNG chạm vào đâu, không rung như "r" tiếng Việt.',
      '/l/: the tongue tip touches the ridge behind the top teeth. /r/: the tongue curls back but touches nothing, and does not trill like a Vietnamese "r".',
      '/l/：舌尖抵住上齿龈。/r/：舌头向后卷，但不碰任何地方，也不像越南语的 "r" 那样颤动。',
    ),
    items: [
      { text: 'light', pron: '/laɪt/', vi: 'ánh sáng; đèn', en: 'what lets us see; a lamp' },
      { text: 'right', pron: '/raɪt/', vi: 'đúng; bên phải', en: 'correct; the opposite of left' },
    ],
  },
  {
    title: L('/f/ – /v/ (fan – van)', '/f/ – /v/ (fan – van)', '/f/ – /v/（fan – van）'),
    note: L(
      'Cả hai: răng trên chạm môi dưới. /f/ chỉ có hơi; /v/ có rung dây thanh như "v" tiếng Việt.',
      'For both, the top teeth touch the bottom lip. /f/ is only air; /v/ is voiced, like Vietnamese "v".',
      '两个音都是上齿碰下唇。/f/ 只有气流；/v/ 声带振动，像越南语的 "v"。',
    ),
    items: [
      { text: 'fan', pron: '/fæn/', vi: 'cái quạt; người hâm mộ', en: 'a machine that moves air; a big supporter' },
      { text: 'van', pron: '/væn/', vi: 'xe tải nhỏ', en: 'a small truck' },
    ],
  },
  {
    title: L('Âm cuối /t/ (why – white)', 'Final /t/ (why – white)', '词尾 /t/（why – white）'),
    note: L(
      'Người Việt hay bỏ âm cuối. "white" phải kết thúc bằng /t/ nghe rõ, nếu không sẽ thành "why".',
      'Vietnamese speakers often drop final sounds. "white" must end with a clear /t/, or it sounds like "why".',
      '越南人常常丢掉词尾辅音。"white" 结尾的 /t/ 要清楚，否则听起来像 "why"。',
    ),
    items: [
      { text: 'why', pron: '/waɪ/', vi: 'tại sao', en: 'for what reason' },
      { text: 'white', pron: '/waɪt/', vi: 'màu trắng', en: 'the colour of snow' },
    ],
  },
];

export const VOWEL_GROUPS: SoundGroup[] = [
  {
    title: L('Nguyên âm ngắn', 'Short vowels', '短元音'),
    intro: L(
      'Đọc ngắn, gọn, miệng thả lỏng. Tiếng Việt có âm gần giống nhưng tiếng Anh phân biệt dài – ngắn rất rõ.',
      'Say them short and relaxed. Vietnamese has similar sounds, but English keeps short and long vowels clearly apart.',
      '发音短促、放松。越南语有相近的音，但英语严格区分长元音和短元音。',
    ),
    items: [
      { label: '/ɪ/', text: 'sit', pron: '/sɪt/', vi: 'ngồi', en: 'to rest on a chair', note: L('Giữa "i" và "ê", rất ngắn.', 'Between Vietnamese "i" and "ê", very short.', '介于越南语 "i" 和 "ê" 之间，很短。') },
      { label: '/e/', text: 'pen', pron: '/pen/', vi: 'cái bút', en: 'a thing for writing with ink', note: L('Gần "e" tiếng Việt.', 'Close to Vietnamese "e".', '接近越南语的 "e"。') },
      { label: '/æ/', text: 'hat', pron: '/hæt/', vi: 'cái mũ', en: 'a thing you wear on your head', note: L('Mở miệng rộng, giữa "e" và "a".', 'Open wide, between Vietnamese "e" and "a".', '嘴张大，介于越南语 "e" 和 "a" 之间。') },
      { label: '/ʌ/', text: 'cup', pron: '/kʌp/', vi: 'cái cốc', en: 'a small container for drinks', note: L('Gần "â"/"ă" tiếng Việt.', 'Close to Vietnamese "â"/"ă".', '接近越南语的 "â"/"ă"。') },
      { label: '/ɒ/ (UK)', text: 'hot', pron: '/hɑːt/', vi: 'nóng', en: 'very warm', note: L('Anh–Anh /hɒt/ (gần "o" ngắn); Anh–Mỹ /hɑːt/ (gần "a").', 'British /hɒt/ (a short "o"); American /hɑːt/ (closer to "a").', '英式 /hɒt/（短 "o"）；美式 /hɑːt/（更接近 "a"）。') },
      { label: '/ʊ/', text: 'book', pron: '/bʊk/', vi: 'quyển sách', en: 'pages with words that you read', note: L('"u" ngắn, môi hơi tròn.', 'A short "u" with lightly rounded lips.', '短 "u"，嘴唇稍圆。') },
      { label: '/ə/', text: 'about', pron: '/əˈbaʊt/', vi: 'về, khoảng', en: 'on the subject of; around', note: L('Âm "ơ" rất nhẹ — âm phổ biến nhất tiếng Anh, luôn ở âm tiết không nhấn.', 'A very light "uh" (like a weak Vietnamese "ơ") — the most common English sound, always unstressed.', '很轻的 "呃"（像轻读的越南语 "ơ"），英语中最常见的音，总在非重读音节。') },
    ],
  },
  {
    title: L('Nguyên âm dài', 'Long vowels', '长元音'),
    intro: L('Dấu ː nghĩa là kéo dài âm.', 'The mark ː means the sound is long.', '符号 ː 表示长音。'),
    items: [
      { label: '/iː/', text: 'see', pron: '/siː/', vi: 'nhìn thấy', en: 'to notice with your eyes', note: L('"i" dài, miệng cười.', 'A long "ee", lips spread.', '长 "i"，嘴角拉开。') },
      { label: '/ɑː/', text: 'car', pron: '/kɑːr/', vi: 'xe ô tô', en: 'a vehicle with four wheels', note: L('"a" dài, miệng mở rộng. Anh–Anh không đọc "r": /kɑː/.', 'A long "ah". British English drops the "r": /kɑː/.', '长 "a"，嘴张大。英式不发 "r"：/kɑː/。') },
      { label: '/ɔː/', text: 'door', pron: '/dɔːr/', vi: 'cánh cửa', en: 'what you open to go into a room', note: L('"o" dài, môi tròn.', 'A long "aw", rounded lips.', '长 "o"，嘴唇圆。') },
      { label: '/uː/', text: 'blue', pron: '/bluː/', vi: 'màu xanh dương', en: 'the colour of the sky', note: L('"u" dài, môi chu ra.', 'A long "oo", lips pushed forward.', '长 "u"，嘴唇向前突出。') },
      { label: '/ɜː/', text: 'bird', pron: '/bɜːrd/', vi: 'con chim', en: 'an animal with wings and feathers', note: L('Gần "ơ" dài. Anh–Mỹ cong lưỡi (có "r").', 'Like a long Vietnamese "ơ". Americans add an "r" colour.', '像拉长的越南语 "ơ"。美式要卷舌（带 "r"）。') },
    ],
  },
  {
    title: L('Nguyên âm đôi', 'Diphthongs', '双元音'),
    intro: L('Hai âm lướt vào nhau trong một âm tiết.', 'Two sounds that glide together in one syllable.', '在一个音节里由一个音滑向另一个音。'),
    items: [
      { label: '/eɪ/', text: 'day', pron: '/deɪ/', vi: 'ngày', en: 'a 24-hour period', note: L('Giống "ây" tiếng Việt.', 'Like Vietnamese "ây".', '像越南语的 "ây"。') },
      { label: '/aɪ/', text: 'my', pron: '/maɪ/', vi: 'của tôi', en: 'belonging to me', note: L('Giống "ai" tiếng Việt.', 'Like Vietnamese "ai".', '像越南语的 "ai"。') },
      { label: '/ɔɪ/', text: 'boy', pron: '/bɔɪ/', vi: 'cậu bé', en: 'a young male child', note: L('Giống "oi" tiếng Việt.', 'Like Vietnamese "oi".', '像越南语的 "oi"。') },
      { label: '/oʊ/', text: 'go', pron: '/ɡoʊ/', vi: 'đi', en: 'to move to a place', note: L('Anh–Mỹ /oʊ/ gần "âu"; Anh–Anh /əʊ/ gần "âu" nhẹ hơn.', 'American /oʊ/; British /əʊ/ — both close to Vietnamese "âu".', '美式 /oʊ/；英式 /əʊ/——都接近越南语的 "âu"。') },
      { label: '/aʊ/', text: 'now', pron: '/naʊ/', vi: 'bây giờ', en: 'at this moment', note: L('Giống "ao" tiếng Việt.', 'Like Vietnamese "ao".', '像越南语的 "ao"。') },
    ],
  },
];

export const CONSONANT_GROUPS: SoundGroup[] = [
  {
    title: L('Phụ âm khó với người Việt', 'Consonants that are hard for Vietnamese speakers', '越南人较难的辅音'),
    items: [
      { label: '/θ/', text: 'thank', pron: '/θæŋk/', vi: 'cảm ơn', en: 'to say you are grateful', note: L('Lưỡi giữa hai răng, thổi hơi, không rung.', 'Tongue between the teeth, blow air, no voice.', '舌尖放在齿间吹气，声带不振动。') },
      { label: '/ð/', text: 'mother', pron: '/ˈmʌðər/', vi: 'mẹ', en: 'a female parent', note: L('Như /θ/ nhưng có rung (đặt tay lên cổ để cảm nhận).', 'Like /θ/ but voiced (put a hand on your throat to feel it).', '和 /θ/ 一样，但声带振动（手放在喉咙上能感觉到）。') },
      { label: '/ʃ/', text: 'shoe', pron: '/ʃuː/', vi: 'giày', en: 'a thing you wear on your foot', note: L('Môi tròn chu ra, như "suỵt".', 'Round, pushed-out lips, like "shh".', '嘴唇圆而突出，像 "嘘"。') },
      { label: '/ʒ/', text: 'television', pron: '/ˈteləvɪʒən/', vi: 'ti vi', en: 'a screen for watching shows', note: L('Như /ʃ/ nhưng có rung.', 'Like /ʃ/ but voiced.', '和 /ʃ/ 一样，但声带振动。') },
      { label: '/tʃ/', text: 'chair', pron: '/tʃer/', vi: 'cái ghế', en: 'a seat for one person', note: L('"t" + /ʃ/, mạnh hơn "ch" tiếng Việt.', '"t" + /ʃ/, stronger than Vietnamese "ch".', '"t" + /ʃ/，比越南语的 "ch" 更有力。') },
      { label: '/dʒ/', text: 'job', pron: '/dʒɑːb/', vi: 'công việc', en: 'work you are paid for', note: L('"d" + /ʒ/, có rung — không đọc như "gi" tiếng Việt.', '"d" + /ʒ/, voiced — not like Vietnamese "gi".', '"d" + /ʒ/，声带振动——不要读成越南语的 "gi"。') },
      { label: '/v/', text: 'very', pron: '/ˈveri/', vi: 'rất', en: 'to a high degree', note: L('Răng trên chạm môi dưới, có rung.', 'Top teeth on the bottom lip, voiced.', '上齿碰下唇，声带振动。') },
      { label: '/w/', text: 'water', pron: '/ˈwɑːtər/', vi: 'nước', en: 'the clear liquid we drink', note: L('Môi tròn như "u" rồi mở ra nhanh — gần "qu"/"oa" tiếng Việt, không phải /v/.', 'Round the lips as for "oo", then open quickly — close to Vietnamese "oa", never /v/.', '先像发 "u" 一样圆唇再迅速张开——接近越南语的 "oa"，不是 /v/。') },
      { label: '/r/', text: 'red', pron: '/red/', vi: 'màu đỏ', en: 'the colour of blood', note: L('Lưỡi cong, không chạm, không rung.', 'Tongue curled back, touching nothing, no trill.', '舌头后卷，不碰任何地方，不颤动。') },
      { label: '/l/', text: 'leg', pron: '/leɡ/', vi: 'cái chân', en: 'the part of the body you walk on', note: L('Như "l" tiếng Việt. Ở cuối từ (ball) lưỡi vẫn chạm lợi.', 'Like Vietnamese "l". At the end of a word (ball) the tongue still touches the ridge.', '像越南语的 "l"。在词尾（ball）时舌尖也要抵住上齿龈。') },
      { label: '/z/', text: 'zoo', pron: '/zuː/', vi: 'sở thú', en: 'a place where people see wild animals', note: L('Như /s/ nhưng có rung, gần "d" giọng Bắc.', 'Like /s/ but voiced, close to Northern Vietnamese "d".', '和 /s/ 一样但声带振动，接近越南北方口音的 "d"。') },
    ],
  },
  {
    title: L('Âm cuối — đừng bỏ!', 'Final sounds — do not drop them!', '词尾辅音——不要丢掉！'),
    intro: L(
      'Tiếng Việt chỉ có vài âm cuối và thường "nuốt" chúng. Tiếng Anh cần nghe rõ âm cuối, đặc biệt -s, -ks, -d, -z.',
      'Vietnamese has few final consonants and keeps them very short. English final sounds must be heard, especially -s, -ks, -d, -z.',
      '越南语的词尾辅音很少，而且发得很短。英语的词尾辅音必须清楚，尤其是 -s、-ks、-d、-z。',
    ),
    items: [
      { label: '-t', text: 'hot', pron: '/hɑːt/', note: L('Bật nhẹ /t/ ở cuối.', 'Release a light /t/ at the end.', '结尾轻轻发出 /t/。') },
      { label: '-d', text: 'good', pron: '/ɡʊd/', vi: 'tốt', en: 'of high quality', note: L('/d/ có rung, khác "t".', 'A voiced /d/, different from "t".', '浊音 /d/，和 "t" 不同。') },
      { label: '-s', text: 'bus', pron: '/bʌs/', vi: 'xe buýt', en: 'a big vehicle for many people', note: L('Giữ tiếng "xì" ở cuối.', 'Keep the hissing "s" at the end.', '结尾保持 "嘶" 的声音。') },
      { label: '-ks', text: 'six', pron: '/sɪks/', vi: 'số sáu', en: 'the number 6', note: L('Chữ x = /ks/: cả hai âm.', 'The letter x = /ks/: both sounds.', '字母 x = /ks/：两个音都要发。') },
      { label: '-z', text: 'dogs', pron: '/dɔːɡz/', vi: 'những con chó', en: 'more than one dog', note: L('-s sau âm rung đọc là /z/.', '-s after a voiced sound is /z/.', '在浊音后面，-s 读 /z/。') },
      { label: '-ɪz', text: 'buses', pron: '/ˈbʌsɪz/', vi: 'những chiếc xe buýt', en: 'more than one bus', note: L('Sau s, sh, ch, x: thêm một âm tiết /ɪz/.', 'After s, sh, ch, x: an extra syllable /ɪz/.', '在 s、sh、ch、x 后面：多一个音节 /ɪz/。') },
    ],
  },
];

export const STRESS_GROUP: SoundGroup = {
  title: L('Trọng âm trong từ', 'Word stress', '单词重音'),
  intro: L(
    'Âm tiết có dấu ˈ đứng trước được đọc to hơn, dài hơn và cao hơn.',
    'The syllable after the mark ˈ is louder, longer and higher.',
    '符号 ˈ 后面的音节读得更响、更长、更高。',
  ),
  items: [
    { label: 'ˈ●●', text: 'apple', pron: '/ˈæpəl/', vi: 'quả táo', en: 'a round red or green fruit', note: L('AP-ple', 'AP-ple', 'AP-ple') },
    { label: 'ˈ●●', text: 'coffee', pron: '/ˈkɑːfi/', vi: 'cà phê', en: 'a hot brown drink', note: L('COF-fee', 'COF-fee', 'COF-fee') },
    { label: '●ˈ●', text: 'hotel', pron: '/hoʊˈtel/', vi: 'khách sạn', en: 'a place where travellers pay to sleep', note: L('ho-TEL', 'ho-TEL', 'ho-TEL') },
    { label: '●ˈ●●', text: 'banana', pron: '/bəˈnænə/', vi: 'quả chuối', en: 'a long yellow fruit', note: L('ba-NA-na', 'ba-NA-na', 'ba-NA-na') },
    { label: '●ˈ●●', text: 'computer', pron: '/kəmˈpjuːtər/', vi: 'máy tính', en: 'an electronic machine for work and games', note: L('com-PU-ter', 'com-PU-ter', 'com-PU-ter') },
    { label: 'ˈ●●●', text: 'photograph', pron: '/ˈfoʊtəɡræf/', vi: 'bức ảnh', en: 'a picture made with a camera', note: L('PHO-to-graph', 'PHO-to-graph', 'PHO-to-graph') },
    { label: '●ˈ●●●', text: 'photographer', pron: '/fəˈtɑːɡrəfər/', vi: 'thợ chụp ảnh', en: 'a person who takes pictures', note: L('pho-TO-gra-pher — trọng âm đổi chỗ!', 'pho-TO-gra-pher — the stress moves!', 'pho-TO-gra-pher——重音位置变了！') },
  ],
};

export const CONNECTED_RULES: SoundRule[] = [
  {
    title: L('Nối âm: phụ âm + nguyên âm', 'Linking: consonant + vowel', '连读：辅音 + 元音'),
    body: L(
      'Khi một từ kết thúc bằng phụ âm và từ sau bắt đầu bằng nguyên âm, phụ âm cuối "chạy" sang từ sau.',
      'When a word ends in a consonant and the next word starts with a vowel, the consonant moves over to the next word.',
      '前一个词以辅音结尾、后一个词以元音开头时，这个辅音要连到后一个词上。',
    ),
    examples: [
      { text: 'an apple', written: 'an apple', spoken: '/ə ˈnæpəl/', vi: 'một quả táo', en: 'one apple' },
      { text: 'look at it', written: 'look at it', spoken: '/ˈlʊ kə tɪt/', vi: 'nhìn nó đi', en: 'see it with your eyes' },
      { text: 'turn off', written: 'turn off', spoken: '/tɜːr ˈnɔːf/', vi: 'tắt', en: 'to stop a machine or light' },
    ],
  },
  {
    title: L('Dạng yếu', 'Weak forms', '弱读'),
    body: L(
      'Các từ nhỏ như a, to, of, and, for thường không nhấn và đọc nhẹ thành /ə/.',
      'Small words such as a, to, of, and, for are usually unstressed and reduced to /ə/.',
      'a、to、of、and、for 等小词通常不重读，弱化成 /ə/。',
    ),
    examples: [
      { text: 'a cup of tea', written: 'a cup of tea', spoken: '/ə ˈkʌp ə ˈtiː/', vi: 'một tách trà', en: 'one cup filled with tea' },
      { text: 'go to school', written: 'go to school', spoken: '/ˈɡoʊ tə ˈskuːl/', vi: 'đi học', en: 'to travel to school for lessons' },
      { text: 'fish and chips', written: 'fish and chips', spoken: '/ˈfɪʃ ən ˈtʃɪps/', vi: 'cá và khoai tây chiên', en: 'fried fish with fried potatoes' },
    ],
  },
  {
    title: L('Dạng rút gọn', 'Contractions', '缩略形式'),
    body: L(
      'Trong nói chuyện, người bản xứ gộp hai từ thành một và viết bằng dấu nháy (\').',
      'In speech, native speakers join two words into one, written with an apostrophe (\').',
      '口语中，母语者会把两个词合成一个，书写时用撇号（\'）。',
    ),
    examples: [
      { text: "I'm", written: 'I am', spoken: "I'm /aɪm/", vi: 'tôi là', en: 'I am (short form)' },
      { text: "it's", written: 'it is', spoken: "it's /ɪts/", vi: 'nó là', en: 'it is (short form)' },
      { text: "don't", written: 'do not', spoken: "don't /doʊnt/", vi: 'không (làm gì)', en: 'do not (short form)' },
    ],
  },
];

export const SPEAK_ITEMS: SpeakItem[] = [
  { text: 'ship', pron: '/ʃɪp/', vi: 'tàu thủy', en: 'a big boat' },
  { text: 'sheep', pron: '/ʃiːp/', vi: 'con cừu', en: 'a farm animal with wool' },
  { text: 'think', pron: '/θɪŋk/', vi: 'nghĩ', en: 'to use your mind' },
  { text: 'three trees', pron: '/θriː triːz/', vi: 'ba cái cây', en: 'a group of 3 trees' },
  { text: 'She sells fish.', pron: '/ʃiː selz fɪʃ/', vi: 'Cô ấy bán cá.', en: 'She has fish for sale.' },
  { text: 'The light is right.', pron: '/ðə laɪt ɪz raɪt/', vi: 'Đèn đúng chỗ rồi.', en: 'The lamp is correct.' },
  { text: 'an apple', pron: '/ə ˈnæpəl/', vi: 'một quả táo', en: 'one apple' },
  { text: 'banana', pron: '/bəˈnænə/', vi: 'quả chuối', en: 'a long yellow fruit' },
];

export const PRONUNCIATION: Course['pronunciation'] = {
  intro: L(
    'Tiếng Anh có khoảng 44 âm nhưng chỉ 26 chữ cái, nên chữ viết và cách đọc thường khác nhau. Phiên âm IPA (trong dấu / /) cho biết chính xác cách đọc. Mặc định là giọng Mỹ; giọng Anh được ghi khi khác.',
    'English has about 44 sounds but only 26 letters, so spelling and pronunciation often differ. IPA (between / /) shows exactly how a word is said. American English is the default; British English is shown when it differs.',
    '英语大约有 44 个音，却只有 26 个字母，所以拼写和读音常常不一致。国际音标（写在 / / 之间）准确地表示读音。默认为美式发音，英式发音不同时会另外标出。',
  ),
  tabs: [
    {
      id: 'vowels',
      title: L('Nguyên âm', 'Vowels', '元音'),
      intro: L(
        'Phân biệt nguyên âm ngắn và dài là điều quan trọng nhất: ship ≠ sheep.',
        'Telling short and long vowels apart matters most: ship ≠ sheep.',
        '最重要的是分清短元音和长元音：ship ≠ sheep。',
      ),
      blocks: VOWEL_GROUPS.map((group) => ({ kind: 'sounds' as const, group })),
    },
    {
      id: 'consonants',
      title: L('Phụ âm', 'Consonants', '辅音'),
      intro: L(
        'Chú ý các âm không có trong tiếng Việt (θ ð ʃ ʒ dʒ w r) và các âm cuối.',
        'Watch the sounds Vietnamese does not have (θ ð ʃ ʒ dʒ w r) and the final sounds.',
        '注意越南语里没有的音（θ ð ʃ ʒ dʒ w r）和词尾辅音。',
      ),
      blocks: CONSONANT_GROUPS.map((group) => ({ kind: 'sounds' as const, group })),
    },
    {
      id: 'pairs',
      title: L('Cặp dễ nhầm', 'Minimal pairs', '最小对立词'),
      blocks: [{
        kind: 'contrasts',
        title: L('Cặp tối thiểu', 'Minimal pairs', '最小对立词'),
        intro: L(
          'Hai từ chỉ khác nhau một âm. Nghe liên tiếp, rồi tự đọc để thấy sự khác biệt.',
          'Two words that differ in just one sound. Listen to them back to back, then say them yourself.',
          '两个词只差一个音。先连着听，再自己读，感受区别。',
        ),
        contrasts: CONTRASTS,
      }],
    },
    {
      id: 'stress',
      title: L('Trọng âm', 'Stress', '重音'),
      blocks: [
        {
          kind: 'text',
          title: L('Trọng âm là gì?', 'What is stress?', '什么是重音？'),
          body: [
            L(
              'Tiếng Việt có thanh điệu cho từng tiếng; tiếng Anh thì có trọng âm: trong một từ nhiều âm tiết, một âm tiết được nhấn mạnh hơn hẳn.',
              'Vietnamese gives every syllable a tone; English uses stress instead: in a word with several syllables, one syllable is clearly stronger.',
              '越南语每个音节都有声调；英语则用重音：多音节词里有一个音节明显更重。',
            ),
            L(
              'Nhấn sai trọng âm có thể khiến người nghe không hiểu, dù bạn đọc đúng từng âm. Âm tiết không nhấn thường đọc nhẹ thành /ə/.',
              'Wrong stress can make a word hard to understand, even when every sound is right. Unstressed syllables are often reduced to /ə/.',
              '重音读错，即使每个音都对，别人也可能听不懂。非重读音节常常弱化成 /ə/。',
            ),
            L(
              'Quy tắc gợi ý: phần lớn danh từ và tính từ hai âm tiết nhấn âm đầu (TEA-cher, HAP-py); nhiều động từ hai âm tiết nhấn âm sau (be-GIN, re-PEAT).',
              'A useful rule: most two-syllable nouns and adjectives stress the first syllable (TEA-cher, HAP-py); many two-syllable verbs stress the second (be-GIN, re-PEAT).',
              '实用规律：大多数双音节名词和形容词重音在第一个音节（TEA-cher、HAP-py）；很多双音节动词重音在第二个音节（be-GIN、re-PEAT）。',
            ),
          ],
        },
        { kind: 'sounds', group: STRESS_GROUP },
      ],
    },
    {
      id: 'connected',
      title: L('Nói liền mạch', 'Connected speech', '连贯语流'),
      intro: L(
        'Người bản xứ không đọc rời từng từ. Hiểu các quy tắc này giúp bạn nghe tốt hơn.',
        'Native speakers do not say words one by one. Knowing these rules helps your listening.',
        '母语者说话时不会一个词一个词地分开读。了解这些规则能提高听力。',
      ),
      blocks: [{ kind: 'rules', title: L('Quy tắc nói liền', 'Connected speech rules', '连读规则'), rules: CONNECTED_RULES }],
    },
    {
      id: 'speak',
      title: L('Luyện nói', 'Speaking practice', '口语练习'),
      blocks: [{
        kind: 'speak',
        title: L('Đọc to', 'Say it aloud', '大声读'),
        intro: L(
          'Đọc từng mục, chú ý nguyên âm dài – ngắn, âm "th" và âm cuối.',
          'Say each item, paying attention to long and short vowels, "th" and final sounds.',
          '逐条朗读，注意长短元音、"th" 和词尾辅音。',
        ),
        items: SPEAK_ITEMS,
      }],
    },
  ],
};
