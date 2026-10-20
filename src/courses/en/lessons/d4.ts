import type { Gloss, LText } from '../../../types';
import { MATCH_PROMPT, arrangeWith, choice, listen, typeIt, wordsOf, type DayContent } from '../../helpers';

const L = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });
const G = (vi: string, en: string): Gloss => ({ vi, en });
const arrange = arrangeWith(' ');

const WHICH_CORRECT = L('Câu nào đúng?', 'Which sentence is correct?', '哪个句子是正确的？');

const WORD_IDS = ['hello', 'goodbye', 'morning', 'afternoon', 'evening', 'nice', 'friend', 'teacher', 'student', 'from', 'vietnam'];

const words = wordsOf('en-d4', 1, [
  { id: 'hello', text: 'hello', pron: '/həˈloʊ/', pronUK: '/həˈləʊ/', vi: 'xin chào', en: 'a word you say when you meet someone', type: 'interjection', topic: 'greetings', level: 'Pre-A1',
    ex: ["Hello, I'm Lan.", 'Xin chào, mình là Lan.', 'Hi, my name is Lan.'],
    notes: L('Thân mật hơn: "Hi!" /haɪ/. "Hello" dùng được với mọi người.', 'More casual: "Hi!" /haɪ/. "Hello" works with everyone.', '更随意：Hi! /haɪ/。Hello 对谁都可以用。') },
  { id: 'goodbye', text: 'goodbye', pron: '/ɡʊdˈbaɪ/', vi: 'tạm biệt', en: 'a word you say when you leave', type: 'interjection', topic: 'greetings', level: 'Pre-A1',
    ex: ['Goodbye, see you tomorrow!', 'Tạm biệt, hẹn gặp lại ngày mai!', 'Bye, I will see you the next day!'],
    notes: L('Thân mật: "Bye!" hoặc "See you!".', 'Casual: "Bye!" or "See you!".', '随意的说法：Bye! 或 See you!。') },
  { id: 'morning', text: 'morning', pron: '/ˈmɔːrnɪŋ/', pronUK: '/ˈmɔːnɪŋ/', vi: 'buổi sáng', en: 'the early part of the day, before 12 o\'clock', type: 'noun', topic: 'time', level: 'Pre-A1',
    ex: ['Good morning, Mr. Brown.', 'Chào buổi sáng, thầy Brown.', 'Hello, Mr. Brown (said early in the day).'] },
  { id: 'afternoon', text: 'afternoon', pron: '/ˌæftərˈnuːn/', pronUK: '/ˌɑːftəˈnuːn/', vi: 'buổi chiều', en: 'the part of the day from 12 o\'clock to about 6 p.m.', type: 'noun', topic: 'time', level: 'Pre-A1',
    ex: ['Good afternoon, everyone.', 'Chào buổi chiều mọi người.', 'Hello, all of you (said after 12 o\'clock).'] },
  { id: 'evening', text: 'evening', pron: '/ˈiːvnɪŋ/', vi: 'buổi tối', en: 'the end of the day, before you go to bed', type: 'noun', topic: 'time', level: 'Pre-A1',
    ex: ['Good evening, Ms. Hoa.', 'Chào buổi tối, cô Hoa.', 'Hello, Ms. Hoa (said after about 6 p.m.).'],
    notes: L('"Good evening" là lời CHÀO khi gặp; "Good night" là lời chúc khi CHIA TAY buổi tối hoặc đi ngủ.', '"Good evening" is a greeting when you meet; "Good night" is said when you leave at night or go to bed.', 'Good evening 是晚上见面时的问候；Good night 是晚上道别或睡前说的。') },
  { id: 'nice', text: 'nice', pron: '/naɪs/', vi: 'tốt, dễ chịu, vui', en: 'pleasant; good', type: 'adjective', topic: 'feelings', level: 'Pre-A1',
    ex: ['Nice to meet you.', 'Rất vui được gặp bạn.', 'I am happy to meet you for the first time.'],
    notes: L('Đáp lại: "Nice to meet you, too." (Mình cũng rất vui được gặp bạn.)', 'Reply: "Nice to meet you, too."', '回答：Nice to meet you, too.（我也很高兴认识你。）') },
  { id: 'friend', text: 'friend', pron: '/frend/', vi: 'bạn, bạn bè', en: 'a person you know well and like', type: 'noun', topic: 'people', level: 'Pre-A1',
    ex: ['This is my friend Nam.', 'Đây là bạn tôi, Nam.', 'Nam is someone I know well and like.'],
    notes: L('Chính tả: f-r-i-e-n-d (có chữ "i" dù không đọc). Đọc rõ âm cuối /nd/.', 'Spelling: f-r-i-e-n-d (the "i" is not said). Say the final /nd/ clearly.', '拼写：f-r-i-e-n-d（i 不发音）。词尾 /nd/ 要读清楚。') },
  { id: 'teacher', text: 'teacher', pron: '/ˈtiːtʃər/', pronUK: '/ˈtiːtʃə/', vi: 'giáo viên, thầy/cô giáo', en: 'a person who teaches', type: 'noun', topic: 'school', level: 'Pre-A1',
    ex: ['My teacher is from London.', 'Giáo viên của tôi đến từ London.', 'The person who teaches me comes from London.'],
    notes: L('Học sinh thường gọi giáo viên là "Mr./Ms. + họ" (Mr. Brown), không gọi "Teacher" như tiếng Việt "thầy ơi".', 'Students usually call a teacher "Mr./Ms. + family name" (Mr. Brown), not "Teacher".', '学生一般称老师为 “Mr./Ms. + 姓”（Mr. Brown），而不是直接叫 Teacher。') },
  { id: 'student', text: 'student', pron: '/ˈstuːdənt/', pronUK: '/ˈstjuːdənt/', vi: 'học sinh, sinh viên', en: 'a person who studies at a school', type: 'noun', topic: 'school', level: 'Pre-A1',
    ex: ["I'm a student.", 'Tôi là sinh viên.', 'I study at a school.'] },
  { id: 'from', text: 'from', pron: '/frʌm/', pronUK: '/frɒm/', vi: 'từ (đến từ)', en: 'shows the place where someone or something starts', type: 'preposition', topic: 'countries', level: 'Pre-A1',
    ex: ['She is from Hanoi.', 'Cô ấy đến từ Hà Nội.', 'Her home city is Hanoi.'],
    notes: L('Trong câu nói nhanh thường đọc nhẹ /frəm/.', 'In fast speech it is usually weak: /frəm/.', '快速说话时常弱读为 /frəm/。') },
  { id: 'vietnam', text: 'Vietnam', pron: '/ˌviːetˈnɑːm/', pronUK: '/ˌvjetˈnæm/', vi: 'Việt Nam', en: 'a country in Southeast Asia', type: 'proper-noun', topic: 'countries', level: 'Pre-A1',
    ex: ["I'm from Vietnam.", 'Tôi đến từ Việt Nam.', 'My home country is Vietnam.'],
    notes: L('Viết hoa chữ V. Trọng âm rơi vào âm tiết cuối: viet-NAM. Người Việt Nam = Vietnamese.', 'Write it with a capital V. Stress the last syllable: viet-NAM. A person from Vietnam is Vietnamese.', '首字母 V 大写。重音在最后一个音节：viet-NAM。越南人 = Vietnamese。') },
]);

export const D4: DayContent = {
  lesson: {
    id: 'en-d4', day: 4, stage: 1, minutes: 22, prerequisites: ['en-d3'],
    title: L('Chào hỏi & giới thiệu', 'Greetings & introductions', '问候和自我介绍'),
    subtitle: L(
      'hello · good morning · goodbye · nice to meet you · My name is… · I\'m from Vietnam.',
      'hello · good morning · goodbye · nice to meet you · My name is… · I\'m from Vietnam.',
      'hello · good morning · goodbye · nice to meet you · My name is… · I\'m from Vietnam.',
    ),
    objectives: [
      L('Chào hỏi theo thời điểm trong ngày: good morning / afternoon / evening.', 'Greet people by time of day: good morning / afternoon / evening.', '按一天中的时间问候：good morning / afternoon / evening。'),
      L('Phân biệt cách chào trang trọng và thân mật (Hello / Hi, Goodbye / Bye).', 'Tell formal and informal greetings apart (Hello / Hi, Goodbye / Bye).', '区分正式和非正式的问候（Hello / Hi，Goodbye / Bye）。'),
      L('Giới thiệu bản thân: My name is… / I\'m… / I\'m from…', 'Introduce yourself: My name is… / I\'m… / I\'m from…', '自我介绍：My name is… / I\'m… / I\'m from…'),
      L('Đáp lại "Nice to meet you."', 'Reply to "Nice to meet you."', '回应 “Nice to meet you.”'),
    ],
    intro: [
      L(
        'Lời chào là câu tiếng Anh đầu tiên bạn nói với ai đó. Hôm nay bạn học cách chào, tạm biệt và giới thiệu tên, quê quán của mình.',
        'A greeting is the first English you say to someone. Today you learn to say hello, goodbye, and tell people your name and where you are from.',
        '问候是你对别人说的第一句英语。今天学习打招呼、道别，以及介绍自己的名字和来自哪里。',
      ),
      L(
        'Tiếng Việt thể hiện lịch sự bằng cách xưng hô (anh, chị, em, ạ). Tiếng Anh chỉ có "I" và "you" — lịch sự nằm ở chỗ chọn lời chào (Good morning thay vì Hey), danh xưng (Mr., Ms.) và giọng nói.',
        'Vietnamese shows politeness with forms of address (anh, chị, em, ạ). English only has "I" and "you" — politeness comes from the greeting you choose (Good morning rather than Hey), titles (Mr., Ms.) and your tone of voice.',
        '越南语通过称呼（anh, chị, em, ạ）表示礼貌。英语只有 I 和 you——礼貌体现在问候语的选择（用 Good morning 而不是 Hey）、称谓（Mr., Ms.）和语气上。',
      ),
    ],
    sections: [
      { kind: 'text', title: L('Chào theo thời điểm trong ngày', 'Greetings by time of day', '按时间问候'),
        body: [
          L('Good morning — từ sáng đến 12 giờ trưa.', 'Good morning — from early in the day until 12 o\'clock.', 'Good morning——早上到中午 12 点。'),
          L('Good afternoon — từ 12 giờ trưa đến khoảng 6 giờ chiều.', 'Good afternoon — from 12 o\'clock until about 6 p.m.', 'Good afternoon——中午 12 点到傍晚 6 点左右。'),
          L('Good evening — sau khoảng 6 giờ tối, khi GẶP ai đó.', 'Good evening — after about 6 p.m., when you MEET someone.', 'Good evening——晚上 6 点左右以后，见面时说。'),
          L('Good night — chỉ dùng khi CHIA TAY buổi tối hoặc trước khi đi ngủ, không dùng để chào khi gặp.', 'Good night — only when you LEAVE at night or go to bed, never as a hello.', 'Good night——只在晚上道别或睡前说，不能用来打招呼。'),
        ] },
      { kind: 'text', title: L('Trang trọng và thân mật', 'Formal and informal', '正式与非正式'),
        body: [
          L('Trang trọng (với giáo viên, sếp, người lớn tuổi, người lạ): "Hello." · "Good morning, Mr. Brown." · "Nice to meet you." · "Goodbye."', 'Formal (teachers, bosses, older people, strangers): "Hello." · "Good morning, Mr. Brown." · "Nice to meet you." · "Goodbye."', '正式（对老师、上司、长辈、陌生人）："Hello." · "Good morning, Mr. Brown." · "Nice to meet you." · "Goodbye."'),
          L('Thân mật (với bạn bè, người cùng tuổi): "Hi!" · "Hey!" · "Morning!" · "Bye!" · "See you!"', 'Informal (friends, people your age): "Hi!" · "Hey!" · "Morning!" · "Bye!" · "See you!"', '非正式（对朋友、同龄人）："Hi!" · "Hey!" · "Morning!" · "Bye!" · "See you!"'),
          L('Danh xưng: Mr. (ông/thầy) và Ms. (bà/cô) + HỌ (Mr. Smith), không + tên riêng như tiếng Việt "thầy Nam".', 'Titles: Mr. and Ms. + FAMILY name (Mr. Smith) — not + first name as in Vietnamese "thầy Nam".', '称谓：Mr.（先生）和 Ms.（女士）+ 姓（Mr. Smith），不像越南语那样加名字（“thầy Nam”）。'),
        ] },
      { kind: 'grammar', grammarId: 'en-g-intro' },
      { kind: 'examples', title: L('Hội thoại 1: trang trọng', 'Dialogue 1: formal', '对话一：正式'),
        examples: [
          { text: 'A: Good morning. My name is David Brown.', vi: 'A: Chào buổi sáng. Tôi tên là David Brown.', en: 'A: Hello (early in the day). I am called David Brown.' },
          { text: "B: Good morning, Mr. Brown. I'm Mai. I'm from Vietnam.", vi: 'B: Chào buổi sáng, ông Brown. Tôi là Mai. Tôi đến từ Việt Nam.', en: 'B: Hello, Mr. Brown. My name is Mai, and my country is Vietnam.' },
          { text: 'A: Nice to meet you, Mai.', vi: 'A: Rất vui được gặp cô, Mai.', en: 'A: I am glad to meet you, Mai.' },
          { text: 'B: Nice to meet you, too.', vi: 'B: Tôi cũng rất vui được gặp ông.', en: 'B: I am glad to meet you as well.' },
        ] },
      { kind: 'examples', title: L('Hội thoại 2: thân mật', 'Dialogue 2: informal', '对话二：非正式'),
        examples: [
          { text: "A: Hi! I'm Tom.", vi: 'A: Chào! Mình là Tom.', en: 'A: Hey! My name is Tom.' },
          { text: "B: Hi, Tom. I'm Linh. This is my friend Huy.", vi: 'B: Chào Tom. Mình là Linh. Đây là bạn mình, Huy.', en: 'B: Hey, Tom. My name is Linh, and Huy is my friend.' },
          { text: 'C: Hey, Tom!', vi: 'C: Chào Tom!', en: 'C: Hi there, Tom!' },
          { text: 'A: Bye! See you!', vi: 'A: Tạm biệt! Gặp lại sau nhé!', en: 'A: Goodbye! See you later!' },
        ] },
      { kind: 'speak', title: L('Luyện nói: giới thiệu bản thân', 'Speaking: introduce yourself', '口语：自我介绍'),
        intro: L('Đọc to từng câu. Sau đó thay tên và nơi bạn ở bằng thông tin của bạn.', 'Read each line aloud. Then say it again with your own name and hometown.', '大声朗读每一句，然后换成你自己的名字和家乡再说一遍。'),
        items: [
          { text: 'Hello!', vi: 'Xin chào!', en: 'Hi!' },
          { text: 'Good morning.', vi: 'Chào buổi sáng.', en: 'Hello (early in the day).' },
          { text: 'My name is Lan.', vi: 'Tôi tên là Lan.', en: 'I am called Lan.' },
          { text: "I'm from Vietnam.", vi: 'Tôi đến từ Việt Nam.', en: 'My home country is Vietnam.' },
          { text: 'Nice to meet you.', vi: 'Rất vui được gặp bạn.', en: 'I am happy to meet you for the first time.' },
          { text: 'Goodbye!', vi: 'Tạm biệt!', en: 'Bye!' },
        ] },
      { kind: 'tip', title: L('Mẹo: tên người Việt trong tiếng Anh', 'Tip: Vietnamese names in English', '小贴士：越南人名在英语里'),
        body: L(
          'Người nói tiếng Anh thường gọi nhau bằng TÊN RIÊNG (first name). Nếu bạn là Nguyễn Thị Lan, hãy nói "I\'m Lan." hoặc "My name is Lan Nguyen." (tên trước, họ sau). Gặp lần đầu luôn đáp "Nice to meet you, too." — đừng quên "too"!',
          'English speakers usually call each other by FIRST name. If you are Nguyễn Thị Lan, say "I\'m Lan." or "My name is Lan Nguyen." (first name, then family name). When you meet someone, always reply "Nice to meet you, too." — don\'t forget "too"!',
          '英语母语者通常用名字（first name）互相称呼。如果你叫 Nguyễn Thị Lan，可以说 “I\'m Lan.” 或 “My name is Lan Nguyen.”（名在前，姓在后）。初次见面要回答 “Nice to meet you, too.”——别忘了 too！',
        ) },
      { kind: 'words', title: L('Từ mới', 'New words', '生词'), wordIds: WORD_IDS },
    ],
    wordIds: WORD_IDS,
    grammarIds: ['en-g-intro'],
    practice: [
      listen('en-d4-p1', 'Good morning.', ['Good morning.', 'Good evening.', 'Good night.', 'Goodbye.'], 0, { seq: [
        'Good morning. = ', G('Chào buổi sáng.', 'Hello (early in the day).'),
      ] }, { targetOptions: true, wordIds: ['morning'] }),
      choice('en-d4-p2', 'vocabulary', L(
        'Bây giờ là 3 giờ chiều. Bạn gặp giáo viên. Bạn nói:',
        'It is 3 p.m. You meet your teacher. You say:',
        '现在是下午三点，你遇到老师。你说：',
      ), ['Good afternoon.', 'Good morning.', 'Good night.', 'Hey!'], 0, L(
        '12 giờ trưa – 6 giờ chiều: Good afternoon. Với giáo viên nên chào trang trọng, không dùng "Hey!".',
        '12 o\'clock – 6 p.m.: Good afternoon. With a teacher, be formal — not "Hey!".',
        '中午 12 点到傍晚 6 点：Good afternoon。对老师要正式，不说 Hey!。',
      ), { targetOptions: true, wordIds: ['afternoon', 'teacher'] }),
      { id: 'en-d4-p3', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: 'friend', pron: '/frend/', vi: 'bạn, bạn bè', en: 'a person you know well and like' },
        { text: 'teacher', pron: '/ˈtiːtʃər/', vi: 'giáo viên, thầy/cô giáo', en: 'a person who teaches' },
        { text: 'student', pron: '/ˈstuːdənt/', vi: 'học sinh, sinh viên', en: 'a person who studies at a school' },
        { text: 'goodbye', pron: '/ɡʊdˈbaɪ/', vi: 'tạm biệt', en: 'a word you say when you leave' },
      ], explanation: { seq: [
        'friend = ', G('bạn', 'a person you like'), ' · teacher = ', G('giáo viên', 'a person who teaches'),
        ' · student = ', G('học sinh', 'a person who studies'), ' · goodbye = ', G('tạm biệt', 'said when you leave'), '.',
      ] }, wordIds: ['friend', 'teacher', 'student', 'goodbye'] },
      { ...arrange('en-d4-p4', G('Tôi đến từ Việt Nam.', 'My home country is Vietnam.'), ["I'm", 'from', 'Vietnam'], L(
        "I'm (= I am) + from + nơi chốn.",
        "I'm (= I am) + from + place.",
        "I'm（= I am）+ from + 地点。",
      ), ['from', 'vietnam']), grammarId: 'en-g-intro' },
      typeIt('en-d4-p5', 'spelling', { k: 'ex.write.spelling', p: { meaning: G('bạn, bạn bè', 'a person you know well and like') } }, ['friend'], L(
        'friend: f-r-i-e-n-d — nhớ chữ "i" trước "e" dù không đọc.',
        'friend: f-r-i-e-n-d — remember the "i" before the "e", even though you don\'t hear it.',
        'friend：f-r-i-e-n-d——记住 e 前面有个不发音的 i。',
      ), { audio: 'friend', wordIds: ['friend'] }),
      choice('en-d4-p6', 'vocabulary', L('Ai đó nói "Nice to meet you." Bạn đáp:', 'Someone says "Nice to meet you." You reply:', '有人说 “Nice to meet you.”，你回答：'), ['Nice to meet you, too.', 'Good night.', "You're welcome.", 'Sorry.'], 0, L(
        'Đáp lại: "Nice to meet you, too." (Mình cũng rất vui được gặp bạn.)',
        'The reply is "Nice to meet you, too."',
        '回答：Nice to meet you, too.（我也很高兴认识你。）',
      ), { targetOptions: true, wordIds: ['nice'] }),
      choice('en-d4-p7', 'vocabulary', L('Lời chào nào là THÂN MẬT (dùng với bạn bè)?', 'Which greeting is INFORMAL (for friends)?', '哪个问候是非正式的（对朋友用）？'), ['Hi!', 'Good morning.', 'Good evening.', 'Hello, Mr. Brown.'], 0, L(
        '"Hi!" là lời chào thân mật. Các câu còn lại lịch sự, trang trọng hơn.',
        '"Hi!" is informal. The others are more polite and formal.',
        'Hi! 是非正式问候，其他几个更礼貌、正式。',
      ), { targetOptions: true }),
    ],
    quiz: [
      listen('en-d4-q1', 'teacher', ['teacher', 'student', 'friend', 'evening'], 0, { seq: [
        'teacher /ˈtiːtʃər/ = ', G('giáo viên', 'a person who teaches'), '.',
      ] }, { targetOptions: true, wordIds: ['teacher'] }),
      { ...arrange('en-d4-q2', G('Tôi tên là Lan.', 'I am called Lan.'), ['My', 'name', 'is', 'Lan'], L(
        'My name + is + tên. Đừng quên "is".',
        'My name + is + name. Don\'t forget "is".',
        'My name + is + 名字。别忘了 is。',
      )), grammarId: 'en-g-intro' },
      typeIt('en-d4-q3', 'spelling', { k: 'ex.write.spelling', p: { meaning: G('xin chào', 'a word you say when you meet someone') } }, ['hello'], L(
        'hello: h-e-l-l-o (hai chữ l).',
        'hello: h-e-l-l-o (double l).',
        'hello：h-e-l-l-o（两个 l）。',
      ), { audio: 'hello', wordIds: ['hello'] }),
      choice('en-d4-q4', 'grammar', WHICH_CORRECT, ["I'm from Vietnam.", 'I from Vietnam.', 'I am Vietnam.', 'My from Vietnam.'], 0, L(
        'Cần "am": I\'m (= I am) from + nơi chốn. "I am Vietnam" nghĩa là "Tôi là nước Việt Nam"!',
        'You need "am": I\'m (= I am) from + place. "I am Vietnam" would mean you ARE the country!',
        '需要 am：I\'m（= I am）from + 地点。“I am Vietnam” 意思是“我是越南这个国家”！',
      ), { targetOptions: true, grammarId: 'en-g-intro', wordIds: ['from', 'vietnam'] }),
      choice('en-d4-q5', 'vocabulary', L('10 giờ tối, bạn rời bữa tiệc. Bạn nói:', 'It is 10 p.m. and you are leaving a party. You say:', '晚上十点，你要离开聚会。你说：'), ['Good night.', 'Good evening.', 'Good morning.', 'Hello.'], 0, L(
        'Chia tay buổi tối → "Good night." "Good evening" chỉ dùng khi gặp.',
        'Leaving at night → "Good night." "Good evening" is only for meeting.',
        '晚上道别 → Good night。Good evening 只在见面时说。',
      ), { targetOptions: true, wordIds: ['evening'] }),
      typeIt('en-d4-q6', 'spelling', { k: 'ex.write.spelling', p: { meaning: G('học sinh, sinh viên', 'a person who studies at a school') } }, ['student'], L(
        'student: s-t-u-d-e-n-t.',
        'student: s-t-u-d-e-n-t.',
        'student：s-t-u-d-e-n-t。',
      ), { audio: 'student', wordIds: ['student'] }),
      choice('en-d4-q7', 'vocabulary', L(
        'Bạn gặp giám đốc mới lần đầu. Câu nào phù hợp nhất?',
        'You meet your new boss for the first time. Which is best?',
        '你第一次见新上司。哪句最合适？',
      ), ['Hello. Nice to meet you.', 'Hey! See you!', 'Bye!', 'Good night.'], 0, L(
        'Gặp lần đầu, trang trọng: "Hello. Nice to meet you."',
        'A first, formal meeting: "Hello. Nice to meet you."',
        '初次正式见面："Hello. Nice to meet you."',
      ), { targetOptions: true, wordIds: ['hello', 'nice'] }),
      { id: 'en-d4-q8', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: 'morning', pron: '/ˈmɔːrnɪŋ/', vi: 'buổi sáng', en: "the early part of the day, before 12 o'clock" },
        { text: 'afternoon', pron: '/ˌæftərˈnuːn/', vi: 'buổi chiều', en: "the part of the day from 12 o'clock to about 6 p.m." },
        { text: 'evening', pron: '/ˈiːvnɪŋ/', vi: 'buổi tối', en: 'the end of the day, before you go to bed' },
        { text: 'Vietnam', pron: '/ˌviːetˈnɑːm/', vi: 'Việt Nam', en: 'a country in Southeast Asia' },
      ], explanation: { seq: [
        'morning = ', G('buổi sáng', 'early in the day'), ' · afternoon = ', G('buổi chiều', 'after 12 o\'clock'),
        ' · evening = ', G('buổi tối', 'late in the day'), ' · Vietnam = ', G('Việt Nam', 'a country'), '.',
      ] }, wordIds: ['morning', 'afternoon', 'evening', 'vietnam'] },
    ],
    summary: [
      L('Chào: Hello (mọi lúc) · Hi (thân mật) · Good morning / afternoon / evening (theo giờ).', 'Hello (any time) · Hi (informal) · Good morning / afternoon / evening (by time of day).', 'Hello（任何时候）· Hi（非正式）· Good morning / afternoon / evening（按时间）。'),
      L('Tạm biệt: Goodbye (trang trọng) · Bye / See you (thân mật) · Good night (chia tay buổi tối).', 'Goodbye (formal) · Bye / See you (informal) · Good night (leaving at night).', 'Goodbye（正式）· Bye / See you（非正式）· Good night（晚上道别）。'),
      L('Giới thiệu: My name is Lan. / I\'m Lan. / I\'m from Vietnam.', 'Introductions: My name is Lan. / I\'m Lan. / I\'m from Vietnam.', '自我介绍：My name is Lan. / I\'m Lan. / I\'m from Vietnam.'),
      L('Nice to meet you. → Nice to meet you, too.', 'Nice to meet you. → Nice to meet you, too.', 'Nice to meet you. → Nice to meet you, too.'),
    ],
  },
  words,
  grammar: [
    {
      id: 'en-g-intro',
      lessonId: 'en-d4',
      title: L('Giới thiệu bản thân: My name is… / I\'m… / I\'m from…', 'Introducing yourself: My name is… / I\'m… / I\'m from…', '自我介绍：My name is… / I\'m… / I\'m from…'),
      pattern: L(
        'My name is + tên · I\'m + tên · I\'m from + nơi chốn',
        'My name is + name · I\'m + name · I\'m from + place',
        'My name is + 名字 · I\'m + 名字 · I\'m from + 地点',
      ),
      meaning: [
        L(
          '"My name is Lan." = "Tên tôi là Lan." — hơi trang trọng. "I\'m Lan." = "Tôi là Lan." — tự nhiên, dùng hằng ngày.',
          '"My name is Lan." is a little formal. "I\'m Lan." is natural and used every day.',
          '“My name is Lan.”（我的名字是 Lan。）稍正式；“I\'m Lan.”（我是 Lan。）自然，日常常用。',
        ),
        L(
          'I\'m là dạng rút gọn của I am. Trong tiếng Anh câu luôn cần động từ: tiếng Việt nói "Tôi từ Việt Nam" được, nhưng tiếng Anh phải có "am": I\'m from Vietnam.',
          'I\'m is short for I am. An English sentence always needs a verb: Vietnamese can say "Tôi từ Việt Nam", but English needs "am": I\'m from Vietnam.',
          'I\'m 是 I am 的缩写。英语句子必须有动词：越南语可以说 “Tôi từ Việt Nam”，英语一定要有 am：I\'m from Vietnam。',
        ),
        L(
          'from + thành phố / nước: I\'m from Hanoi. / I\'m from Vietnam. Tên riêng, thành phố, nước luôn viết hoa.',
          'from + city / country: I\'m from Hanoi. / I\'m from Vietnam. Names, cities and countries always start with a capital letter.',
          'from + 城市 / 国家：I\'m from Hanoi. / I\'m from Vietnam。人名、城市名、国名首字母总是大写。',
        ),
      ],
      breakdown: [
        [{ text: 'My', role: L('Của tôi', 'My (belongs to me)', '我的') }, { text: 'name', role: L('Danh từ "tên"', 'Noun "name"', '名词“名字”') }, { text: 'is', role: L('Động từ "là"', 'Verb "to be"', '动词 be（是）') }, { text: 'Lan', role: L('Tên', 'Name', '名字') }],
        [{ text: "I'm", role: L('Tôi là (= I am)', 'I am (short form)', '我是（= I am）') }, { text: 'Lan', role: L('Tên', 'Name', '名字') }],
        [{ text: "I'm", role: L('Tôi là (= I am)', 'I am (short form)', '我是（= I am）') }, { text: 'from', role: L('Giới từ "từ"', 'Preposition "from"', '介词“来自”') }, { text: 'Vietnam', role: L('Nơi chốn', 'Place', '地点') }],
      ],
      examples: [
        { text: 'My name is Minh.', vi: 'Tên tôi là Minh.', en: 'I am called Minh.' },
        { text: "I'm Linh.", vi: 'Mình là Linh.', en: 'Linh is my name.' },
        { text: "I'm from Da Nang.", vi: 'Tôi đến từ Đà Nẵng.', en: 'My home city is Da Nang.' },
        { text: "Hi, I'm Tuan. I'm from Ho Chi Minh City.", vi: 'Chào, mình là Tuấn. Mình đến từ Thành phố Hồ Chí Minh.', en: 'Hello, my name is Tuan and my home city is Ho Chi Minh City.' },
      ],
      mistakes: [
        { wrong: 'My name Lan.', right: 'My name is Lan.', why: L('Thiếu động từ "is". Câu tiếng Anh luôn cần động từ.', 'The verb "is" is missing. An English sentence always needs a verb.', '缺少动词 is。英语句子一定要有动词。') },
        { wrong: 'I from Vietnam.', right: "I'm from Vietnam.", why: L('Thiếu "am": I am from → I\'m from.', '"am" is missing: I am from → I\'m from.', '缺少 am：I am from → I\'m from。') },
        { wrong: 'I am Vietnam.', right: "I'm from Vietnam.", why: L('"I am Vietnam" nghĩa là "Tôi là nước Việt Nam". Nói nơi đến cần "from".', '"I am Vietnam" means you ARE the country. To say where you come from, use "from".', '“I am Vietnam” 的意思是“我是越南”。说来自哪里要用 from。') },
        { wrong: "i'm from vietnam.", right: "I'm from Vietnam.", why: L('"I" và tên nước luôn viết hoa.', '"I" and country names always take a capital letter.', 'I 和国名首字母总是大写。') },
      ],
      exercises: [
        { ...arrange('en-g-intro-1', G('Tên tôi là Minh.', 'I am called Minh.'), ['My', 'name', 'is', 'Minh'], L(
          'My name + is + tên.',
          'My name + is + name.',
          'My name + is + 名字。',
        )), grammarId: 'en-g-intro' },
        choice('en-g-intro-2', 'grammar', WHICH_CORRECT, ['My name is Hoa.', 'My name Hoa.', 'I name is Hoa.', 'Me name is Hoa.'], 0, L(
          'My (của tôi) + name + is + tên.',
          'My + name + is + name.',
          'My（我的）+ name + is + 名字。',
        ), { targetOptions: true, grammarId: 'en-g-intro' }),
        choice('en-g-intro-3', 'grammar', L('Điền vào chỗ trống: "I\'m ___ Hanoi."', 'Fill in the blank: "I\'m ___ Hanoi."', '填空：“I\'m ___ Hanoi.”'), ['from', 'is', 'name', 'am'], 0, L(
          'I\'m from + nơi chốn: I\'m from Hanoi.',
          'I\'m from + place: I\'m from Hanoi.',
          'I\'m from + 地点：I\'m from Hanoi。',
        ), { targetOptions: true, grammarId: 'en-g-intro', wordIds: ['from'] }),
      ],
    },
  ],
};
