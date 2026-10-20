import type { LText } from '../../../types';
import { MATCH_PROMPT, arrangeWith, choice, listen, typeIt, wordsOf, type DayContent } from '../../helpers';
import { STRESS_GROUP } from '../pronunciation';

const L = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });
const arrange = arrangeWith(' ');

const WORDS = wordsOf('en-d2', 1, [
  { id: 'ship', text: 'ship', pron: '/ʃɪp/', vi: 'tàu thủy', en: 'a big boat', type: 'noun', topic: 'places', level: 'Pre-A1',
    ex: ['The ship is very big.', 'Con tàu rất to.', 'The boat is huge.'],
    notes: L('/ɪ/ ngắn — đừng kéo dài thành "sheep".', 'A short /ɪ/ — do not stretch it into "sheep".', '短音 /ɪ/——不要拉长成 "sheep"。') },
  { id: 'sheep', text: 'sheep', pron: '/ʃiːp/', vi: 'con cừu', en: 'a farm animal with wool', type: 'noun', topic: 'nature', level: 'Pre-A1',
    ex: ['I can see a sheep.', 'Tôi nhìn thấy một con cừu.', 'There is a woolly animal in front of me.'],
    notes: L('Số nhiều vẫn là "sheep": one sheep, two sheep.', 'The plural is also "sheep": one sheep, two sheep.', '复数形式还是 "sheep"：one sheep, two sheep。') },
  { id: 'bed', text: 'bed', pron: '/bed/', vi: 'cái giường', en: 'a thing you sleep on', type: 'noun', topic: 'daily', level: 'Pre-A1',
    ex: ['My bed is small.', 'Giường của tôi nhỏ.', 'I sleep on a little bed.'],
    notes: L('Nhớ đọc rõ /d/ ở cuối.', 'Remember to say the final /d/ clearly.', '记得把结尾的 /d/ 读清楚。') },
  { id: 'bad', text: 'bad', pron: '/bæd/', vi: 'xấu, tệ', en: 'not good', type: 'adjective', topic: 'feelings', level: 'Pre-A1',
    ex: ['It is not bad.', 'Không tệ đâu.', 'It is quite good.'] },
  { id: 'think', text: 'think', pron: '/θɪŋk/', vi: 'nghĩ', en: 'to use your mind', type: 'verb', topic: 'daily', level: 'Pre-A1',
    ex: ['I think so.', 'Tôi nghĩ vậy.', 'I believe that is true.'] },
  { id: 'this', text: 'this', pron: '/ðɪs/', vi: 'đây, cái này', en: 'the thing here, near me', type: 'pronoun', topic: 'basics', level: 'Pre-A1',
    ex: ['This is my cat.', 'Đây là con mèo của tôi.', 'Here is my pet.'],
    notes: L('"th" trong this là /ð/ (có rung), khác /θ/ trong think.', 'The "th" in this is /ð/ (voiced), unlike /θ/ in think.', 'this 中的 "th" 是浊音 /ð/，和 think 中的 /θ/ 不同。') },
  { id: 'cat', text: 'cat', pron: '/kæt/', vi: 'con mèo', en: 'a small pet animal', type: 'noun', topic: 'nature', level: 'Pre-A1',
    ex: ['The cat is black.', 'Con mèo màu đen.', 'The small pet is dark.'] },
  { id: 'fish', text: 'fish', pron: '/fɪʃ/', vi: 'con cá', en: 'an animal that lives and swims in water', type: 'noun', topic: 'nature', level: 'Pre-A1',
    ex: ['I like fish.', 'Tôi thích cá.', 'Fish is a food I enjoy.'] },
]);

export const D2: DayContent = {
  lesson: {
    id: 'en-d2', day: 2, stage: 1, minutes: 22, prerequisites: ['en-d1'],
    title: L('Những âm quan trọng', 'Essential sounds', '关键发音'),
    subtitle: L(
      'Nguyên âm dài – ngắn · /æ/ và /e/ · th · sh · âm cuối · trọng âm',
      'Long and short vowels · /æ/ and /e/ · th · sh · final sounds · word stress',
      '长短元音 · /æ/ 和 /e/ · th · sh · 词尾辅音 · 单词重音',
    ),
    objectives: [
      L('Phân biệt nguyên âm ngắn và dài: ship/sheep, full/fool.', 'Tell short and long vowels apart: ship/sheep, full/fool.', '分清短元音和长元音：ship/sheep、full/fool。'),
      L('Phân biệt /e/ – /æ/ – /ʌ/: bed, bad, cut.', 'Tell /e/ – /æ/ – /ʌ/ apart: bed, bad, cut.', '分清 /e/ – /æ/ – /ʌ/：bed、bad、cut。'),
      L('Phát âm /θ/ (think), /ð/ (this) và /ʃ/ (fish) khác với /s/.', 'Say /θ/ (think), /ð/ (this) and /ʃ/ (fish), different from /s/.', '发准 /θ/（think）、/ð/（this）和 /ʃ/（fish），并和 /s/ 区分开。'),
      L('Không bỏ âm cuối -t, -d, -s, -ks; nhấn đúng trọng âm.', 'Keep final -t, -d, -s, -ks, and put the stress in the right place.', '不丢词尾 -t、-d、-s、-ks，重音放对位置。'),
      L('Học 8 từ: ship, sheep, bed, bad, think, this, cat, fish.', 'Learn 8 words: ship, sheep, bed, bad, think, this, cat, fish.', '学习 8 个单词：ship、sheep、bed、bad、think、this、cat、fish。'),
    ],
    intro: [
      L(
        'Người Việt học tiếng Anh thường gặp bốn khó khăn: không phân biệt nguyên âm dài – ngắn, đọc "th" thành "t" hoặc "d", bỏ âm cuối, và đọc đều mọi âm tiết như có thanh điệu.',
        'Vietnamese learners of English usually meet four problems: not separating long and short vowels, saying "th" as "t" or "d", dropping final sounds, and giving every syllable equal weight as if it had a tone.',
        '越南人学英语通常会遇到四个难点：不分长短元音、把 "th" 读成 "t" 或 "d"、丢掉词尾辅音，以及像有声调一样把每个音节读得一样重。',
      ),
      L(
        'Hôm nay ta luyện từng điểm bằng các cặp tối thiểu (minimal pairs) — hai từ chỉ khác nhau một âm, như ship /ʃɪp/ (tàu) và sheep /ʃiːp/ (cừu). Đọc sai một âm là đổi nghĩa!',
        'Today you practise each point with minimal pairs — two words that differ in just one sound, like ship /ʃɪp/ and sheep /ʃiːp/. Get one sound wrong and the meaning changes!',
        '今天我们用最小对立词逐一练习——两个词只差一个音，比如 ship /ʃɪp/（船）和 sheep /ʃiːp/（羊）。读错一个音，意思就变了！',
      ),
    ],
    sections: [
      {
        kind: 'sounds',
        title: L('Nguyên âm ngắn và dài', 'Short and long vowels', '短元音和长元音'),
        intro: L(
          'Âm dài (có ː) không chỉ dài hơn mà còn căng hơn: /iː/ miệng cười, /uː/ môi chu ra. Âm ngắn thì thả lỏng.',
          'Long vowels (with ː) are not just longer but also tenser: /iː/ with a smile, /uː/ with pushed-out lips. Short vowels are relaxed.',
          '长元音（带 ː）不只是更长，而且更紧：/iː/ 嘴角拉开像微笑，/uː/ 嘴唇向前突出。短元音则放松。',
        ),
        items: [
          { label: '/ɪ/', text: 'ship', pron: '/ʃɪp/', vi: 'tàu thủy', en: 'a big boat', note: L('Ngắn, giữa "i" và "ê".', 'Short, between Vietnamese "i" and "ê".', '短，介于越南语 "i" 和 "ê" 之间。') },
          { label: '/iː/', text: 'sheep', pron: '/ʃiːp/', vi: 'con cừu', en: 'a farm animal with wool', note: L('"i" dài, miệng cười.', 'A long "ee", lips spread.', '长 "i"，嘴角拉开。') },
          { label: '/ʊ/', text: 'full', pron: '/fʊl/', vi: 'đầy, no', en: 'with no more space inside', note: L('"u" ngắn, môi hơi tròn.', 'A short "u", lips lightly rounded.', '短 "u"，嘴唇稍圆。') },
          { label: '/uː/', text: 'fool', pron: '/fuːl/', vi: 'kẻ ngốc', en: 'a silly person', note: L('"u" dài, môi chu ra.', 'A long "oo", lips pushed forward.', '长 "u"，嘴唇向前突出。') },
          { label: '/ɪ/', text: 'sit', pron: '/sɪt/', vi: 'ngồi', en: 'to rest on a chair' },
          { label: '/iː/', text: 'seat', pron: '/siːt/', vi: 'chỗ ngồi', en: 'a place to sit' },
        ],
      },
      {
        kind: 'sounds',
        title: L('/e/ – /æ/ – /ʌ/', '/e/ – /æ/ – /ʌ/', '/e/ – /æ/ – /ʌ/'),
        intro: L(
          'Ba âm này đều ngắn. Mở miệng dần: /e/ (bed) → /æ/ (bad, rộng nhất). /ʌ/ (cut) giống "â/ă" tiếng Việt.',
          'All three are short. Open your mouth step by step: /e/ (bed) → /æ/ (bad, widest). /ʌ/ (cut) is like Vietnamese "â/ă".',
          '这三个都是短元音。嘴逐渐张大：/e/（bed）→ /æ/（bad，张得最大）。/ʌ/（cut）像越南语的 "â/ă"。',
        ),
        items: [
          { label: '/e/', text: 'bed', pron: '/bed/', vi: 'cái giường', en: 'a thing you sleep on', note: L('Như "e" tiếng Việt.', 'Like Vietnamese "e".', '像越南语的 "e"。') },
          { label: '/æ/', text: 'bad', pron: '/bæd/', vi: 'xấu, tệ', en: 'not good', note: L('Miệng mở rộng, hàm hạ thấp.', 'Mouth wide open, jaw down.', '嘴张大，下巴往下。') },
          { label: '/æ/', text: 'cat', pron: '/kæt/', vi: 'con mèo', en: 'a small pet animal' },
          { label: '/ʌ/', text: 'cut', pron: '/kʌt/', vi: 'cắt', en: 'to divide with a knife', note: L('Ngắn, gần "â".', 'Short, close to Vietnamese "â".', '短，接近越南语的 "â"。') },
        ],
      },
      {
        kind: 'sounds',
        title: L('Âm "th" và "sh"', 'The "th" and "sh" sounds', '"th" 和 "sh" 的发音'),
        intro: L(
          'Tiếng Việt không có /θ/ và /ð/. "th" tiếng Anh KHÔNG đọc như "th" tiếng Việt: lưỡi phải đặt giữa hai hàm răng.',
          'Vietnamese has no /θ/ or /ð/. English "th" is NOT Vietnamese "th": your tongue goes between your teeth.',
          '越南语没有 /θ/ 和 /ð/。英语的 "th" 和越南语的 "th" 不同：舌尖要放在上下齿之间。',
        ),
        items: [
          { label: '/θ/', text: 'think', pron: '/θɪŋk/', vi: 'nghĩ', en: 'to use your mind', note: L('Lưỡi giữa răng, chỉ có hơi.', 'Tongue between the teeth, air only.', '舌尖放在齿间，只出气。') },
          { label: '/θ/', text: 'three', pron: '/θriː/', vi: 'số ba', en: 'the number 3' },
          { label: '/ð/', text: 'this', pron: '/ðɪs/', vi: 'đây, cái này', en: 'the thing here, near me', note: L('Như /θ/ nhưng có rung.', 'Like /θ/ but voiced.', '和 /θ/ 一样但声带振动。') },
          { label: '/ð/', text: 'mother', pron: '/ˈmʌðər/', vi: 'mẹ', en: 'a female parent' },
          { label: '/ʃ/', text: 'fish', pron: '/fɪʃ/', vi: 'con cá', en: 'an animal that lives and swims in water', note: L('Môi tròn, như "suỵt".', 'Rounded lips, like "shh".', '嘴唇圆，像 "嘘"。') },
          { label: '/ʃ/', text: 'she', pron: '/ʃiː/', vi: 'cô ấy', en: 'that woman or girl' },
          { label: '/s/', text: 'sea', pron: '/siː/', vi: 'biển', en: 'a big area of salt water', note: L('Như "x" tiếng Việt.', 'Like Vietnamese "x".', '像越南语的 "x"。') },
        ],
      },
      {
        kind: 'tip',
        title: L('Mẹo luyện "th"', 'A trick for "th"', '练习 "th" 的小窍门'),
        body: L(
          'Đặt ngón tay trước môi rồi đọc "think": đầu lưỡi phải chạm vào ngón tay. Đặt tay lên cổ: /ð/ (this) cổ rung, /θ/ (think) không rung.',
          'Hold a finger in front of your lips and say "think": your tongue tip should touch the finger. Put a hand on your throat: /ð/ (this) buzzes, /θ/ (think) does not.',
          '把一根手指放在嘴唇前读 "think"：舌尖应该碰到手指。把手放在喉咙上：发 /ð/（this）时会振动，发 /θ/（think）时不振动。',
        ),
      },
      {
        kind: 'sounds',
        title: L('Âm cuối: đừng "nuốt"!', 'Final sounds: do not swallow them!', '词尾辅音：不要 "吞掉"！'),
        intro: L(
          'Trong tiếng Việt, "t" cuối (như "mát") bị chặn lại, gần như không nghe thấy. Trong tiếng Anh, âm cuối phải nghe được — cat /kæt/ khác cap /kæp/, six /sɪks/ có cả /k/ và /s/.',
          'In Vietnamese, a final "t" (as in "mát") is cut off and barely heard. In English, final sounds must be audible — cat /kæt/ is not cap /kæp/, and six /sɪks/ has both /k/ and /s/.',
          '越南语的词尾 "t"（如 "mát"）只是闭塞，几乎听不见。英语的词尾辅音必须听得见——cat /kæt/ 不同于 cap /kæp/，six /sɪks/ 要发出 /k/ 和 /s/ 两个音。',
        ),
        items: [
          { label: '-t', text: 'cat', pron: '/kæt/', note: L('Bật nhẹ /t/.', 'Release a light /t/.', '轻轻发出 /t/。') },
          { label: '-d', text: 'bed', pron: '/bed/', note: L('/d/ có rung, nguyên âm trước nó hơi dài hơn.', 'A voiced /d/; the vowel before it is a bit longer.', '浊音 /d/，前面的元音稍长一点。') },
          { label: '-ts', text: 'cats', pron: '/kæts/', vi: 'những con mèo', en: 'more than one cat', note: L('Số nhiều: thêm /s/ sau /t/.', 'Plural: add /s/ after /t/.', '复数：在 /t/ 后加 /s/。') },
          { label: '-ks', text: 'six', pron: '/sɪks/', vi: 'số sáu', en: 'the number 6', note: L('x = /ks/.', 'x = /ks/.', 'x = /ks/。') },
          { label: '-ʃ', text: 'fish', pron: '/fɪʃ/', note: L('Giữ /ʃ/ đến hết.', 'Hold the /ʃ/ to the end.', '把 /ʃ/ 保持到最后。') },
          { label: '-z', text: 'bags', pron: '/bæɡz/', vi: 'những cái túi', en: 'more than one bag', note: L('-s sau âm rung đọc /z/.', '-s after a voiced sound is /z/.', '在浊音后，-s 读 /z/。') },
        ],
      },
      {
        kind: 'text',
        title: L('Trọng âm trong từ', 'Word stress', '单词重音'),
        body: [
          L(
            'Tiếng Việt mỗi tiếng có thanh riêng và đọc rõ như nhau. Tiếng Anh thì trong từ nhiều âm tiết có MỘT âm tiết nhấn: to hơn, dài hơn, cao hơn. Các âm tiết khác đọc nhẹ, thường thành /ə/.',
            'In Vietnamese every syllable has its own tone and is equally clear. In English, a word with several syllables has ONE stressed syllable: louder, longer, higher. The others are light, often reduced to /ə/.',
            '越南语每个音节都有自己的声调，读得同样清楚。英语的多音节词只有一个重读音节：更响、更长、更高。其他音节读得轻，常弱化成 /ə/。',
          ),
          L(
            'Trong IPA, dấu ˈ đứng trước âm tiết nhấn: banana /bəˈnænə/ = ba-NA-na.',
            'In IPA the mark ˈ comes before the stressed syllable: banana /bəˈnænə/ = ba-NA-na.',
            '在国际音标中，ˈ 放在重读音节前：banana /bəˈnænə/ = ba-NA-na。',
          ),
        ],
      },
      { kind: 'sounds', title: STRESS_GROUP.title, intro: STRESS_GROUP.intro, items: STRESS_GROUP.items },
      { kind: 'words', title: L('Từ mới', 'New words', '生词'), wordIds: WORDS.map((w) => w.id) },
      {
        kind: 'speak',
        title: L('Đọc to', 'Say it aloud', '大声读'),
        intro: L(
          'Đọc từng cặp thật rõ sự khác biệt, rồi đọc cả câu và giữ âm cuối.',
          'Say each pair, making the difference clear, then say the sentences and keep the final sounds.',
          '把每组词的区别读清楚，然后读句子，注意保留词尾辅音。',
        ),
        items: [
          { text: 'ship, sheep', pron: '/ʃɪp ʃiːp/' },
          { text: 'bed, bad', pron: '/bed bæd/' },
          { text: 'think, sink', pron: '/θɪŋk sɪŋk/' },
          { text: 'This is my cat.', pron: '/ðɪs ɪz maɪ kæt/', vi: 'Đây là con mèo của tôi.', en: 'Here is my pet.' },
          { text: 'I think so.', pron: '/aɪ ˈθɪŋk soʊ/', vi: 'Tôi nghĩ vậy.', en: 'I believe that is true.' },
          { text: 'Six fish and three sheep.', pron: '/sɪks fɪʃ ən θriː ʃiːp/', vi: 'Sáu con cá và ba con cừu.', en: '6 fish plus 3 sheep.' },
        ],
      },
    ],
    wordIds: WORDS.map((w) => w.id),
    grammarIds: [],
    practice: [
      listen('en-d2-p1', 'sheep', ['ship', 'sheep'], 1, L(
        'sheep /ʃiːp/ (con cừu) có /iː/ dài; ship /ʃɪp/ (tàu) có /ɪ/ ngắn.',
        'sheep /ʃiːp/ has a long /iː/; ship /ʃɪp/ (a big boat) has a short /ɪ/.',
        'sheep /ʃiːp/（羊）是长音 /iː/；ship /ʃɪp/（船）是短音 /ɪ/。',
      ), { skill: 'pronunciation', targetOptions: true, wordIds: ['sheep'] }),
      listen('en-d2-p2', 'bad', ['bed', 'bad'], 1, L(
        'bad /bæd/ (tệ) mở miệng rộng hơn bed /bed/ (giường).',
        'bad /bæd/ (not good) has a wider mouth than bed /bed/.',
        'bad /bæd/（坏）比 bed /bed/（床）嘴张得更大。',
      ), { skill: 'pronunciation', targetOptions: true, wordIds: ['bad'] }),
      choice('en-d2-p3', 'pronunciation', L('Từ nào bắt đầu bằng âm /θ/?', 'Which word starts with the sound /θ/?', '哪个单词以 /θ/ 开头？'), ['think', 'this', 'sink', 'fish'], 0, L(
        'think /θɪŋk/ bắt đầu bằng /θ/ (không rung). this bắt đầu bằng /ð/ (có rung), sink bằng /s/.',
        'think /θɪŋk/ starts with /θ/ (voiceless). this starts with /ð/ (voiced), sink with /s/.',
        'think /θɪŋk/ 以清音 /θ/ 开头。this 以浊音 /ð/ 开头，sink 以 /s/ 开头。',
      ), { targetOptions: true }),
      { id: 'en-d2-p4', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: 'ship', pron: '/ʃɪp/', vi: 'tàu thủy', en: 'a big boat' },
        { text: 'sheep', pron: '/ʃiːp/', vi: 'con cừu', en: 'a farm animal with wool' },
        { text: 'bed', pron: '/bed/', vi: 'cái giường', en: 'a thing you sleep on' },
        { text: 'cat', pron: '/kæt/', vi: 'con mèo', en: 'a small pet animal' },
      ], explanation: L(
        'ship = tàu thủy, sheep = con cừu, bed = cái giường, cat = con mèo.',
        'ship = a big boat, sheep = a woolly farm animal, bed = where you sleep, cat = a small pet.',
        'ship = 船，sheep = 羊，bed = 床，cat = 猫。',
      ), wordIds: ['ship', 'sheep', 'bed', 'cat'] },
      typeIt('en-d2-p5', 'spelling', { k: 'ex.write.spelling', p: { meaning: { vi: 'con cá', en: 'an animal that lives and swims in water' } } }, ['fish'], L(
        'fish = F - I - S - H /fɪʃ/. Hai chữ "sh" ghi một âm /ʃ/.',
        'fish = F - I - S - H /fɪʃ/. The two letters "sh" make one sound /ʃ/.',
        'fish = F - I - S - H /fɪʃ/。"sh" 两个字母表示一个音 /ʃ/。',
      ), { audio: 'fish', wordIds: ['fish'] }),
      choice('en-d2-p6', 'pronunciation', L('Từ "banana" nhấn trọng âm ở đâu?', 'Where is the stress in "banana"?', '"banana" 的重音在哪里？'), ['BA-na-na', 'ba-NA-na', 'ba-na-NA'], 1, L(
        'banana /bəˈnænə/: dấu ˈ đứng trước âm tiết thứ hai. Hai âm tiết còn lại đọc nhẹ /ə/.',
        'banana /bəˈnænə/: the mark ˈ is before the second syllable. The other two are a light /ə/.',
        'banana /bəˈnænə/：ˈ 在第二个音节前。另外两个音节轻读成 /ə/。',
      ), { text: 'banana', pron: '/bəˈnænə/', audio: 'banana' }),
      arrange('en-d2-p7', { vi: 'Đây là con mèo của tôi.', en: 'Here is my pet.' }, ['This', 'is', 'my', 'cat.'], L(
        'This is my cat. — chú ý /ð/ trong "This" và /t/ cuối trong "cat".',
        'This is my cat. — watch the /ð/ in "This" and the final /t/ in "cat".',
        'This is my cat.——注意 "This" 中的 /ð/ 和 "cat" 结尾的 /t/。',
      ), ['this', 'cat']),
    ],
    quiz: [
      listen('en-d2-q1', 'ship', ['ship', 'sheep'], 0, L(
        'ship /ʃɪp/ (tàu thủy): /ɪ/ ngắn, thả lỏng.',
        'ship /ʃɪp/ (a big boat): a short, relaxed /ɪ/.',
        'ship /ʃɪp/（船）：短而放松的 /ɪ/。',
      ), { skill: 'pronunciation', targetOptions: true, wordIds: ['ship'] }),
      listen('en-d2-q2', 'think', ['think', 'sink'], 0, L(
        'think /θɪŋk/ (nghĩ): lưỡi giữa răng. sink /sɪŋk/ (bồn rửa) là /s/.',
        'think /θɪŋk/ (to use your mind): tongue between the teeth. sink /sɪŋk/ (a bowl for washing) has /s/.',
        'think /θɪŋk/（想）：舌尖在齿间。sink /sɪŋk/（水槽）是 /s/。',
      ), { skill: 'pronunciation', targetOptions: true, wordIds: ['think'] }),
      listen('en-d2-q3', 'cut', ['cat', 'cut'], 1, L(
        'cut /kʌt/ (cắt) có /ʌ/ gần "â"; cat /kæt/ (con mèo) có /æ/ mở rộng.',
        'cut /kʌt/ (to divide with a knife) has /ʌ/, like Vietnamese "â"; cat /kæt/ has a wide /æ/.',
        'cut /kʌt/（切）是接近越南语 "â" 的 /ʌ/；cat /kæt/（猫）是张大嘴的 /æ/。',
      ), { skill: 'pronunciation', targetOptions: true }),
      choice('en-d2-q4', 'pronunciation', L('"cats" kết thúc bằng những âm nào?', 'Which sounds does "cats" end with?', '"cats" 以哪些音结尾？'), ['/ts/', '/t/', '/s/', '/k/'], 0, L(
        'cats /kæts/: phải đọc cả /t/ và /s/. Bỏ âm cuối thì người nghe sẽ không hiểu là số nhiều.',
        'cats /kæts/: say both /t/ and /s/. If you drop them, the listener will not hear that it is plural.',
        'cats /kæts/：/t/ 和 /s/ 都要读出来。丢掉的话，别人听不出是复数。',
      ), { text: 'cats', audio: 'cats' }),
      choice('en-d2-q5', 'vocabulary', { k: 'ex.chooseMeaning' }, [
        { vi: 'con cừu', en: 'a farm animal with wool' },
        { vi: 'tàu thủy', en: 'a big boat' },
        { vi: 'con cá', en: 'an animal that lives and swims in water' },
        { vi: 'con mèo', en: 'a small pet animal' },
      ], 0, L(
        'sheep /ʃiːp/ = con cừu (nguyên âm dài).',
        'sheep /ʃiːp/ = a woolly farm animal (long vowel).',
        'sheep /ʃiːp/ = 羊（长元音）。',
      ), { text: 'sheep', pron: '/ʃiːp/', audio: 'sheep', wordIds: ['sheep'] }),
      typeIt('en-d2-q6', 'spelling', { k: 'ex.write.spelling', p: { meaning: { vi: 'tàu thủy', en: 'a big boat' } } }, ['ship'], L(
        'ship = S - H - I - P /ʃɪp/: một chữ "i" cho âm ngắn; sheep có "ee" cho âm dài.',
        'ship = S - H - I - P /ʃɪp/: one "i" for the short sound; sheep has "ee" for the long one.',
        'ship = S - H - I - P /ʃɪp/：一个 "i" 表示短音；sheep 用 "ee" 表示长音。',
      ), { audio: 'ship', wordIds: ['ship'] }),
      choice('en-d2-q7', 'pronunciation', L('Từ "computer" nhấn trọng âm ở đâu?', 'Where is the stress in "computer"?', '"computer" 的重音在哪里？'), ['COM-pu-ter', 'com-PU-ter', 'com-pu-TER'], 1, L(
        'computer /kəmˈpjuːtər/ = com-PU-ter.',
        'computer /kəmˈpjuːtər/ = com-PU-ter.',
        'computer /kəmˈpjuːtər/ = com-PU-ter。',
      ), { text: 'computer', pron: '/kəmˈpjuːtər/', audio: 'computer' }),
      choice('en-d2-q8', 'pronunciation', L('Âm đầu của "this" là âm nào?', 'What is the first sound of "this"?', '"this" 的第一个音是什么？'), ['/ð/', '/θ/', '/d/', '/z/'], 0, L(
        'this /ðɪs/: /ð/ có rung dây thanh. Đừng đọc thành "đít" hay "dis".',
        'this /ðɪs/: /ð/ is voiced. Do not say it like Vietnamese "đ" or like "dis".',
        'this /ðɪs/：/ð/ 是浊音。不要读成越南语的 "đ" 或 "dis"。',
      ), { text: 'this', audio: 'this', wordIds: ['this'] }),
      arrange('en-d2-q9', { vi: 'Tôi nghĩ đây là một con cá.', en: 'In my opinion, it is a fish.' }, ['I', 'think', 'this', 'is', 'a', 'fish.'], L(
        'I think + this is a fish. — I think (tôi nghĩ) đứng đầu câu.',
        'I think + this is a fish. — "I think" goes at the start.',
        'I think + this is a fish.——"I think"（我认为）放在句首。',
      ), ['think', 'this', 'fish']),
    ],
    summary: [
      L('Nguyên âm dài (ː) căng và dài: sheep /iː/, fool /uː/; nguyên âm ngắn thả lỏng: ship /ɪ/, full /ʊ/.', 'Long vowels (ː) are tense and long: sheep /iː/, fool /uː/; short ones are relaxed: ship /ɪ/, full /ʊ/.', '长元音（ː）紧而长：sheep /iː/、fool /uː/；短元音放松：ship /ɪ/、full /ʊ/。'),
      L('/e/ bed – /æ/ bad (mở rộng hơn) – /ʌ/ cut (gần "â").', '/e/ bed – /æ/ bad (wider) – /ʌ/ cut (like Vietnamese "â").', '/e/ bed – /æ/ bad（嘴更大）– /ʌ/ cut（像越南语 "â"）。'),
      L('/θ/ think và /ð/ this: lưỡi giữa răng. /ʃ/ fish môi tròn, khác /s/.', '/θ/ think and /ð/ this: tongue between the teeth. /ʃ/ fish has rounded lips, unlike /s/.', '/θ/ think 和 /ð/ this：舌尖在齿间。/ʃ/ fish 嘴唇圆，和 /s/ 不同。'),
      L('Giữ âm cuối: cat /t/, bed /d/, cats /ts/, six /ks/. Nhấn đúng trọng âm: ba-NA-na, com-PU-ter.', 'Keep final sounds: cat /t/, bed /d/, cats /ts/, six /ks/. Stress the right syllable: ba-NA-na, com-PU-ter.', '保留词尾辅音：cat /t/、bed /d/、cats /ts/、six /ks/。重音放对：ba-NA-na、com-PU-ter。'),
      L('Từ mới: ship, sheep, bed, bad, think, this, cat, fish.', 'New words: ship, sheep, bed, bad, think, this, cat, fish.', '生词：ship、sheep、bed、bad、think、this、cat、fish。'),
    ],
  },
  words: WORDS,
  grammar: [],
};
