import type { DemoScript, Pron } from '../types';

/**
 * English demo scripts (prewritten scenario practice, used when no AI backend is configured).
 * IPA: General American in `ipaUS`, British (RP) in `ipaUK` only when it differs.
 * Sentence transcriptions use common weak forms (tə, ə, də, kən, fər) where a native speaker would.
 */
const ipa = (ipaUS: string, ipaUK?: string, respelling?: string, note?: Pron['note']): Pron => ({
  ipaUS,
  ...(ipaUK ? { ipaUK } : {}),
  ...(respelling ? { respelling } : {}),
  ...(note ? { note } : {}),
  source: 'script',
});

export const DEMO_EN: DemoScript[] = [
  // ---------------------------------------------------------------- greetings
  {
    id: 'en-greetings',
    lang: 'en',
    scenario: 'greetings',
    level: 'beginner',
    intro: {
      scenario: {
        vi: 'Bạn đến một câu lạc bộ tiếng Anh lần đầu tiên. Một người bạn mới tên Emma đến bắt chuyện với bạn.',
        en: 'You go to an English club for the first time. A new person named Emma comes over to talk to you.',
        zh: '你第一次参加英语俱乐部。一位名叫 Emma 的新朋友过来和你聊天。',
      },
      role: {
        vi: 'Bạn là thành viên mới. Hãy chào hỏi, giới thiệu tên, quê quán, công việc và lý do bạn học tiếng Anh.',
        en: 'You are a new member. Greet Emma and introduce yourself: your name, where you are from, what you do and why you are learning English.',
        zh: '你是新成员。请和 Emma 打招呼，并介绍自己：名字、来自哪里、做什么工作，以及为什么学英语。',
      },
    },
    turns: [
      {
        partner: {
          text: "Hi! I'm Emma. What's your name?",
          translation: { vi: 'Chào bạn! Mình là Emma. Bạn tên là gì?', en: "Hi! I'm Emma. What's your name?" },
          pron: ipa('/haɪ aɪm ˈemə wʌts jʊr neɪm/', '/haɪ aɪm ˈemə wɒts jɔː neɪm/'),
        },
        replies: [
          { text: "Hi, Emma. I'm Lan.", translation: { vi: 'Chào Emma. Mình là Lan.', en: "Hi, Emma. I'm Lan." } },
          { text: 'Hello! My name is Minh. Nice to meet you.', translation: { vi: 'Xin chào! Mình tên là Minh. Rất vui được gặp bạn.', en: 'Hello! My name is Minh. Nice to meet you.' } },
        ],
      },
      {
        partner: {
          text: 'Nice to meet you. Where are you from?',
          translation: { vi: 'Rất vui được gặp bạn. Bạn đến từ đâu?', en: 'Nice to meet you. Where are you from?' },
          pron: ipa('/naɪs tə miːt juː wer ɑːr juː frʌm/', '/naɪs tə miːt juː weər ɑː juː frɒm/'),
        },
        replies: [
          { text: "I'm from Vietnam.", translation: { vi: 'Mình đến từ Việt Nam.', en: "I'm from Vietnam." } },
          { text: "I'm from Hanoi, in Vietnam. And you?", translation: { vi: 'Mình đến từ Hà Nội, Việt Nam. Còn bạn?', en: "I'm from Hanoi, in Vietnam. And you?" } },
        ],
      },
      {
        partner: {
          text: "Oh, nice! I'm from Canada. What do you do?",
          translation: { vi: 'Ồ, hay quá! Mình đến từ Canada. Bạn làm nghề gì?', en: "Oh, nice! I'm from Canada. What's your job?" },
          pron: ipa('/oʊ naɪs aɪm frʌm ˈkænədə wʌt də juː duː/', '/əʊ naɪs aɪm frɒm ˈkænədə wɒt də juː duː/'),
        },
        replies: [
          { text: "I'm a student.", translation: { vi: 'Mình là sinh viên.', en: "I'm a student." } },
          { text: "I'm an office worker. I work for a bank.", translation: { vi: 'Mình là nhân viên văn phòng. Mình làm việc cho một ngân hàng.', en: "I'm an office worker. I work for a bank." } },
          { text: "I'm a nurse. I work at a hospital in Hanoi.", translation: { vi: 'Mình là y tá. Mình làm ở một bệnh viện ở Hà Nội.', en: "I'm a nurse. I work at a hospital in Hanoi." } },
        ],
      },
      {
        partner: {
          text: 'Cool! Why are you learning English?',
          translation: { vi: 'Hay đấy! Tại sao bạn học tiếng Anh?', en: 'Cool! Why are you learning English?' },
          pron: ipa('/kuːl waɪ ɑːr juː ˈlɜːrnɪŋ ˈɪŋɡlɪʃ/', '/kuːl waɪ ɑː juː ˈlɜːnɪŋ ˈɪŋɡlɪʃ/'),
        },
        replies: [
          { text: 'For my job.', translation: { vi: 'Vì công việc của mình.', en: 'For my job.' } },
          { text: 'Because I want to travel.', translation: { vi: 'Vì mình muốn đi du lịch.', en: 'Because I want to travel.' } },
          { text: 'I want to talk with people from other countries.', translation: { vi: 'Mình muốn nói chuyện với người từ các nước khác.', en: 'I want to talk with people from other countries.' } },
        ],
      },
      {
        partner: {
          text: "That's great! Your English is really good.",
          translation: { vi: 'Tuyệt quá! Tiếng Anh của bạn giỏi thật đấy.', en: "That's great! Your English is really good." },
          pron: ipa('/ðæts ɡreɪt jʊr ˈɪŋɡlɪʃ ɪz ˈriːəli ɡʊd/', '/ðæts ɡreɪt jɔːr ˈɪŋɡlɪʃ ɪz ˈrɪəli ɡʊd/'),
        },
        replies: [
          { text: 'Thank you!', translation: { vi: 'Cảm ơn bạn!', en: 'Thank you!' } },
          { text: "Thanks, but I'm still learning.", translation: { vi: 'Cảm ơn, nhưng mình vẫn đang học.', en: "Thanks, but I'm still learning." } },
          { text: "Thank you! That's very kind of you.", translation: { vi: 'Cảm ơn bạn! Bạn tốt bụng quá.', en: "Thank you! That's very kind of you." } },
        ],
      },
      {
        partner: {
          text: 'Do you study English every day?',
          translation: { vi: 'Bạn có học tiếng Anh mỗi ngày không?', en: 'Do you study English every day?' },
          pron: ipa('/duː juː ˈstʌdi ˈɪŋɡlɪʃ ˈevri deɪ/'),
        },
        replies: [
          { text: 'Yes, every day.', translation: { vi: 'Có, mỗi ngày.', en: 'Yes, every day.' } },
          { text: 'Not every day. About three times a week.', translation: { vi: 'Không phải mỗi ngày. Khoảng ba lần một tuần.', en: 'Not every day. About three times a week.' } },
          { text: 'Yes, I study for thirty minutes every evening.', translation: { vi: 'Có, mình học ba mươi phút mỗi tối.', en: 'Yes, I study for thirty minutes every evening.' } },
        ],
      },
      {
        partner: {
          text: 'Well, I have to go now. It was nice talking to you!',
          translation: { vi: 'Thôi, mình phải đi rồi. Nói chuyện với bạn vui lắm!', en: 'Well, I have to go now. It was nice talking to you!' },
          pron: ipa('/wel aɪ hæf tə ɡoʊ naʊ ɪt wəz naɪs ˈtɔːkɪŋ tə juː/', '/wel aɪ hæf tə ɡəʊ naʊ ɪt wəz naɪs ˈtɔːkɪŋ tə juː/'),
        },
        replies: [
          { text: 'You too! Bye!', translation: { vi: 'Mình cũng vậy! Tạm biệt!', en: 'You too! Bye!' } },
          { text: 'Nice talking to you too. See you next time!', translation: { vi: 'Mình cũng rất vui được nói chuyện với bạn. Hẹn gặp lại lần sau!', en: 'Nice talking to you too. See you next time!' } },
        ],
      },
    ],
    suggestions: [
      {
        level: 'word', text: 'hello', pron: ipa('/həˈloʊ/', '/həˈləʊ/', 'huh-LOH'),
        meaning: { vi: 'xin chào', en: 'a word you say when you meet someone' },
        example: "Hello! I'm Lan.", exampleTranslation: { vi: 'Xin chào! Mình là Lan.', en: "Hello! I'm Lan." },
      },
      {
        level: 'word', text: 'name', pron: ipa('/neɪm/', undefined, 'NAYM'),
        meaning: { vi: 'tên', en: 'the word that people call you' },
        example: 'My name is Minh.', exampleTranslation: { vi: 'Tên mình là Minh.', en: 'My name is Minh.' },
      },
      {
        level: 'word', text: 'from', pron: ipa('/frʌm/', '/frɒm/', 'FRUM'),
        meaning: { vi: 'từ (đến từ)', en: 'shows the place where someone or something starts' },
        example: "I'm from Vietnam.", exampleTranslation: { vi: 'Mình đến từ Việt Nam.', en: "I'm from Vietnam." },
      },
      {
        level: 'word', text: 'student', pron: ipa('/ˈstuːdənt/', '/ˈstjuːdənt/', 'STOO-dunt'),
        meaning: { vi: 'học sinh, sinh viên', en: 'a person who studies at a school or university' },
        example: "I'm a student at a university in Hanoi.", exampleTranslation: { vi: 'Mình là sinh viên một trường đại học ở Hà Nội.', en: "I'm a student at a university in Hanoi." },
      },
      {
        level: 'word', text: 'country', pron: ipa('/ˈkʌntri/', undefined, 'KUN-tree'),
        meaning: { vi: 'đất nước, quốc gia', en: 'a nation with its own land and government' },
        example: 'Which country are you from?', exampleTranslation: { vi: 'Bạn đến từ nước nào?', en: 'Which country are you from?' },
      },
      {
        level: 'word', text: 'job', pron: ipa('/dʒɑːb/', '/dʒɒb/', 'JAHB'),
        meaning: { vi: 'công việc, nghề nghiệp', en: 'the work you do to earn money' },
        example: 'I need English for my job.', exampleTranslation: { vi: 'Mình cần tiếng Anh cho công việc.', en: 'I need English for my job.' },
      },
      {
        level: 'phrase', text: 'Nice to meet you.', pron: ipa('/naɪs tə ˈmiːt juː/', undefined, 'NYSE tuh MEET yoo'),
        meaning: { vi: 'Rất vui được gặp bạn.', en: 'said when you meet someone for the first time' },
        example: "Hi, I'm Lan. Nice to meet you.", exampleTranslation: { vi: 'Chào bạn, mình là Lan. Rất vui được gặp bạn.', en: "Hi, I'm Lan. Nice to meet you." },
      },
      {
        level: 'phrase', text: "What's your name?", pron: ipa('/wʌts jʊr ˈneɪm/', '/wɒts jɔː ˈneɪm/', 'wuts yer NAYM'),
        meaning: { vi: 'Bạn tên là gì?', en: 'a question to ask someone their name' },
        example: "Hi! I'm Emma. What's your name?", exampleTranslation: { vi: 'Chào bạn! Mình là Emma. Bạn tên là gì?', en: "Hi! I'm Emma. What's your name?" },
      },
      {
        level: 'phrase', text: 'And you?', pron: ipa('/ənd ˈjuː/', undefined, 'und YOO'),
        meaning: { vi: 'Còn bạn thì sao?', en: 'used to ask the other person the same question' },
        example: "I'm from Vietnam. And you?", exampleTranslation: { vi: 'Mình đến từ Việt Nam. Còn bạn?', en: "I'm from Vietnam. And you?" },
      },
      {
        level: 'phrase', text: 'What do you do?', pron: ipa('/wʌt də juː ˈduː/', '/wɒt də juː ˈduː/', 'wut duh yoo DOO'),
        meaning: { vi: 'Bạn làm nghề gì?', en: 'a question about someone\'s job' },
        example: "I'm a teacher. What do you do?", exampleTranslation: { vi: 'Mình là giáo viên. Bạn làm nghề gì?', en: "I'm a teacher. What do you do?" },
      },
      {
        level: 'phrase', text: 'See you next time!', pron: ipa('/ˈsiː juː ˌnekst ˈtaɪm/', undefined, 'SEE yoo nekst TIME'),
        meaning: { vi: 'Hẹn gặp lại lần sau!', en: 'a friendly way to say goodbye' },
        example: 'Bye, Emma! See you next time!', exampleTranslation: { vi: 'Tạm biệt Emma! Hẹn gặp lại lần sau!', en: 'Bye, Emma! See you next time!' },
      },
      {
        level: 'sentence', text: 'Nice to meet you too.', pron: ipa('/naɪs tə miːt juː tuː/', undefined, 'NYSE tuh MEET yoo TOO'),
        meaning: { vi: 'Mình cũng rất vui được gặp bạn.', en: 'a reply when someone says "Nice to meet you"' },
        example: "— Nice to meet you, Lan. — Nice to meet you too.", exampleTranslation: { vi: '— Rất vui được gặp bạn, Lan. — Mình cũng rất vui được gặp bạn.', en: "— Nice to meet you, Lan. — Nice to meet you too." },
      },
      {
        level: 'sentence', text: "I'm learning English for my job.", pron: ipa('/aɪm ˈlɜːrnɪŋ ˈɪŋɡlɪʃ fər maɪ dʒɑːb/', '/aɪm ˈlɜːnɪŋ ˈɪŋɡlɪʃ fə maɪ dʒɒb/'),
        meaning: { vi: 'Mình học tiếng Anh vì công việc.', en: 'giving a reason for learning English' },
        example: "I'm learning English for my job. I often write emails in English.", exampleTranslation: { vi: 'Mình học tiếng Anh vì công việc. Mình thường viết email bằng tiếng Anh.', en: "I'm learning English for my job. I often write emails in English." },
      },
      {
        level: 'sentence', text: "Thanks, but I'm still learning.", pron: ipa('/θæŋks bət aɪm stɪl ˈlɜːrnɪŋ/', '/θæŋks bət aɪm stɪl ˈlɜːnɪŋ/'),
        meaning: { vi: 'Cảm ơn, nhưng mình vẫn đang học.', en: 'a modest reply to a compliment' },
        example: "— Your English is very good! — Thanks, but I'm still learning.", exampleTranslation: { vi: '— Tiếng Anh của bạn giỏi quá! — Cảm ơn, nhưng mình vẫn đang học.', en: "— Your English is very good! — Thanks, but I'm still learning." },
      },
      {
        level: 'sentence', text: 'It was nice talking to you.', pron: ipa('/ɪt wəz naɪs ˈtɔːkɪŋ tə juː/'),
        meaning: { vi: 'Nói chuyện với bạn rất vui.', en: 'a polite way to end a conversation' },
        example: 'I have to go now. It was nice talking to you.', exampleTranslation: { vi: 'Mình phải đi bây giờ. Nói chuyện với bạn rất vui.', en: 'I have to go now. It was nice talking to you.' },
      },
    ],
  },

  // ---------------------------------------------------------------- daily
  {
    id: 'en-daily',
    lang: 'en',
    scenario: 'daily',
    level: 'beginner',
    intro: {
      scenario: {
        vi: 'Buổi sáng, bạn gặp người hàng xóm ở thang máy. Hai người trò chuyện về sinh hoạt hằng ngày.',
        en: 'In the morning you meet your neighbor in the elevator. You chat about your daily routines.',
        zh: '早上你在电梯里遇到邻居，你们聊起各自的日常生活。',
      },
      role: {
        vi: 'Bạn là người hàng xóm. Hãy kể về một ngày của bạn: giờ thức dậy, cách đi làm/đi học, buổi tối và cuối tuần.',
        en: 'You are the neighbor. Talk about your day: when you get up, how you get to work or school, your evenings and weekends.',
        zh: '你是这位邻居。请谈谈你的一天：几点起床、怎么去上班或上学、晚上和周末做什么。',
      },
    },
    turns: [
      {
        partner: {
          text: 'Good morning! How are you today?',
          translation: { vi: 'Chào buổi sáng! Hôm nay bạn thế nào?', en: 'Good morning! How are you today?' },
          pron: ipa('/ɡʊd ˈmɔːrnɪŋ haʊ ɑːr juː təˈdeɪ/', '/ɡʊd ˈmɔːnɪŋ haʊ ɑː juː təˈdeɪ/'),
        },
        replies: [
          { text: "Good morning! I'm fine, thanks.", translation: { vi: 'Chào buổi sáng! Mình khỏe, cảm ơn.', en: "Good morning! I'm fine, thanks." } },
          { text: "Morning! I'm a bit tired, but OK. And you?", translation: { vi: 'Chào buổi sáng! Mình hơi mệt, nhưng ổn. Còn bạn?', en: "Morning! I'm a bit tired, but OK. And you?" } },
        ],
      },
      {
        partner: {
          text: "I'm good, thanks. What time do you usually get up?",
          translation: { vi: 'Mình khỏe, cảm ơn. Bạn thường dậy lúc mấy giờ?', en: "I'm good, thanks. What time do you usually get up?" },
          pron: ipa('/aɪm ɡʊd θæŋks wʌt taɪm də juː ˈjuːʒuəli ɡet ʌp/', '/aɪm ɡʊd θæŋks wɒt taɪm də juː ˈjuːʒuəli ɡet ʌp/'),
        },
        replies: [
          { text: "At six o'clock.", translation: { vi: 'Lúc sáu giờ.', en: "At six o'clock." } },
          { text: 'I usually get up at six thirty.', translation: { vi: 'Mình thường dậy lúc sáu giờ rưỡi.', en: 'I usually get up at six thirty.' } },
        ],
      },
      {
        partner: {
          text: "Wow, that's early! What do you do in the morning?",
          translation: { vi: 'Ồ, sớm thế! Buổi sáng bạn làm gì?', en: "Wow, that's early! What do you do in the morning?" },
          pron: ipa('/waʊ ðæts ˈɜːrli wʌt də juː duː ɪn ðə ˈmɔːrnɪŋ/', '/waʊ ðæts ˈɜːli wɒt də juː duː ɪn ðə ˈmɔːnɪŋ/'),
        },
        replies: [
          { text: 'I have breakfast and go to work.', translation: { vi: 'Mình ăn sáng rồi đi làm.', en: 'I have breakfast and go to work.' } },
          { text: 'I take a shower, eat breakfast, and then go to school.', translation: { vi: 'Mình tắm, ăn sáng, rồi đi học.', en: 'I take a shower, eat breakfast, and then go to school.' } },
        ],
      },
      {
        partner: {
          text: 'How do you get there?',
          translation: { vi: 'Bạn đến đó bằng cách nào?', en: 'How do you get there?' },
          pron: ipa('/haʊ də juː ɡet ðer/', '/haʊ də juː ɡet ðeə/'),
        },
        replies: [
          { text: 'By motorbike.', translation: { vi: 'Bằng xe máy.', en: 'By motorbike.' } },
          { text: 'I usually take the bus. It takes about twenty minutes.', translation: { vi: 'Mình thường đi xe buýt. Mất khoảng hai mươi phút.', en: 'I usually take the bus. It takes about twenty minutes.' } },
        ],
      },
      {
        partner: {
          text: 'And what do you do in the evening?',
          translation: { vi: 'Còn buổi tối bạn làm gì?', en: 'And what do you do in the evening?' },
          pron: ipa('/ənd wʌt də juː duː ɪn ði ˈiːvnɪŋ/', '/ənd wɒt də juː duː ɪn ði ˈiːvnɪŋ/'),
        },
        replies: [
          { text: 'I cook dinner and watch TV.', translation: { vi: 'Mình nấu bữa tối và xem tivi.', en: 'I cook dinner and watch TV.' } },
          { text: 'I usually study English for an hour, and I go to bed at eleven.', translation: { vi: 'Mình thường học tiếng Anh một tiếng, và đi ngủ lúc mười một giờ.', en: 'I usually study English for an hour, and I go to bed at eleven.' } },
        ],
      },
      {
        partner: {
          text: 'Sounds like a busy day! What about weekends?',
          translation: { vi: 'Nghe có vẻ là một ngày bận rộn! Thế còn cuối tuần?', en: 'Sounds like a busy day! What about weekends?' },
          pron: ipa('/saʊndz laɪk ə ˈbɪzi deɪ wʌt əˈbaʊt ˈwiːkendz/', '/saʊndz laɪk ə ˈbɪzi deɪ wɒt əˈbaʊt ˌwiːkˈendz/'),
        },
        replies: [
          { text: 'I relax at home.', translation: { vi: 'Mình nghỉ ngơi ở nhà.', en: 'I relax at home.' } },
          { text: 'I visit my family and go shopping.', translation: { vi: 'Mình về thăm gia đình và đi mua sắm.', en: 'I visit my family and go shopping.' } },
          { text: 'I sleep late, and then I meet my friends for coffee.', translation: { vi: 'Mình ngủ nướng, rồi đi cà phê với bạn bè.', en: 'I sleep late, and then I meet my friends for coffee.' } },
        ],
      },
      {
        partner: {
          text: "Nice! Well, I'd better go. Have a good day!",
          translation: { vi: 'Hay đấy! Thôi, mình phải đi đây. Chúc bạn một ngày tốt lành!', en: "Nice! Well, I'd better go. Have a good day!" },
          pron: ipa('/naɪs wel aɪd ˈbetər ɡoʊ hæv ə ɡʊd deɪ/', '/naɪs wel aɪd ˈbetə ɡəʊ hæv ə ɡʊd deɪ/'),
        },
        replies: [
          { text: 'You too!', translation: { vi: 'Bạn cũng vậy nhé!', en: 'You too!' } },
          { text: 'Thanks, you too. See you later!', translation: { vi: 'Cảm ơn, bạn cũng vậy. Gặp lại sau nhé!', en: 'Thanks, you too. See you later!' } },
        ],
      },
    ],
    suggestions: [
      {
        level: 'word', text: 'usually', pron: ipa('/ˈjuːʒuəli/', undefined, 'YOO-zhoo-uh-lee'),
        meaning: { vi: 'thường, thường thường', en: 'in most cases; most of the time' },
        example: 'I usually get up at six.', exampleTranslation: { vi: 'Mình thường dậy lúc sáu giờ.', en: 'I usually get up at six.' },
      },
      {
        level: 'word', text: 'breakfast', pron: ipa('/ˈbrekfəst/', undefined, 'BREK-fust'),
        meaning: { vi: 'bữa sáng', en: 'the first meal of the day' },
        example: 'I have breakfast at seven.', exampleTranslation: { vi: 'Mình ăn sáng lúc bảy giờ.', en: 'I have breakfast at seven.' },
      },
      {
        level: 'word', text: 'early', pron: ipa('/ˈɜːrli/', '/ˈɜːli/', 'UR-lee'),
        meaning: { vi: 'sớm', en: 'near the beginning of the day; before the usual time' },
        example: 'I get up early on weekdays.', exampleTranslation: { vi: 'Ngày thường mình dậy sớm.', en: 'I get up early on weekdays.' },
      },
      {
        level: 'word', text: 'tired', pron: ipa('/ˈtaɪərd/', '/ˈtaɪəd/', 'TY-urd'),
        meaning: { vi: 'mệt', en: 'needing rest or sleep' },
        example: "I'm a bit tired today.", exampleTranslation: { vi: 'Hôm nay mình hơi mệt.', en: "I'm a bit tired today." },
      },
      {
        level: 'word', text: 'weekend', pron: ipa('/ˈwiːkend/', '/ˌwiːkˈend/', 'WEEK-end'),
        meaning: { vi: 'cuối tuần', en: 'Saturday and Sunday' },
        example: 'What do you do on the weekend?', exampleTranslation: { vi: 'Cuối tuần bạn làm gì?', en: 'What do you do on the weekend?' },
      },
      {
        level: 'word', text: 'dinner', pron: ipa('/ˈdɪnər/', '/ˈdɪnə/', 'DIN-er'),
        meaning: { vi: 'bữa tối', en: 'the main meal of the evening' },
        example: 'I cook dinner at seven.', exampleTranslation: { vi: 'Mình nấu bữa tối lúc bảy giờ.', en: 'I cook dinner at seven.' },
      },
      {
        level: 'phrase', text: 'get up', pron: ipa('/ɡet ˈʌp/', undefined, 'get UP'),
        meaning: { vi: 'thức dậy, ra khỏi giường', en: 'to get out of bed' },
        example: 'What time do you get up?', exampleTranslation: { vi: 'Bạn dậy lúc mấy giờ?', en: 'What time do you get up?' },
      },
      {
        level: 'phrase', text: 'go to bed', pron: ipa('/ɡoʊ tə ˈbed/', '/ɡəʊ tə ˈbed/', 'goh tuh BED'),
        meaning: { vi: 'đi ngủ', en: 'to lie down to sleep for the night' },
        example: 'I go to bed at eleven.', exampleTranslation: { vi: 'Mình đi ngủ lúc mười một giờ.', en: 'I go to bed at eleven.' },
      },
      {
        level: 'phrase', text: 'take the bus', pron: ipa('/teɪk ðə ˈbʌs/', undefined, 'tayk thuh BUS'),
        meaning: { vi: 'đi xe buýt', en: 'to travel by bus' },
        example: 'I take the bus to work.', exampleTranslation: { vi: 'Mình đi xe buýt đi làm.', en: 'I take the bus to work.' },
      },
      {
        level: 'phrase', text: 'have breakfast', pron: ipa('/hæv ˈbrekfəst/', undefined, 'hav BREK-fust'),
        meaning: { vi: 'ăn sáng', en: 'to eat the morning meal' },
        example: 'I have breakfast with my family.', exampleTranslation: { vi: 'Mình ăn sáng cùng gia đình.', en: 'I have breakfast with my family.' },
      },
      {
        level: 'phrase', text: 'a bit', pron: ipa('/ə ˈbɪt/', undefined, 'uh BIT'),
        meaning: { vi: 'hơi, một chút', en: 'a little; slightly' },
        example: "I'm a bit busy this morning.", exampleTranslation: { vi: 'Sáng nay mình hơi bận.', en: "I'm a bit busy this morning." },
      },
      {
        level: 'sentence', text: 'I usually get up at six.', pron: ipa('/aɪ ˈjuːʒuəli ɡet ʌp ət sɪks/'),
        meaning: { vi: 'Mình thường dậy lúc sáu giờ.', en: 'saying when you get up' },
        example: 'I usually get up at six, but on Sundays I sleep late.', exampleTranslation: { vi: 'Mình thường dậy lúc sáu giờ, nhưng Chủ nhật thì ngủ nướng.', en: 'I usually get up at six, but on Sundays I sleep late.' },
      },
      {
        level: 'sentence', text: 'It takes about twenty minutes.', pron: ipa('/ɪt teɪks əˈbaʊt ˈtwenti ˈmɪnɪts/'),
        meaning: { vi: 'Mất khoảng hai mươi phút.', en: 'saying how long a trip takes' },
        example: 'I walk to school. It takes about twenty minutes.', exampleTranslation: { vi: 'Mình đi bộ đến trường. Mất khoảng hai mươi phút.', en: 'I walk to school. It takes about twenty minutes.' },
      },
      {
        level: 'sentence', text: 'What do you do on weekends?', pron: ipa('/wʌt də juː duː ɑːn ˈwiːkendz/', '/wɒt də juː duː ɒn ˌwiːkˈendz/'),
        meaning: { vi: 'Cuối tuần bạn làm gì?', en: 'asking about someone\'s weekend activities' },
        example: 'I go swimming on Saturdays. What do you do on weekends?', exampleTranslation: { vi: 'Thứ Bảy mình đi bơi. Cuối tuần bạn làm gì?', en: 'I go swimming on Saturdays. What do you do on weekends?' },
      },
      {
        level: 'sentence', text: 'Have a good day!', pron: ipa('/hæv ə ɡʊd ˈdeɪ/'),
        meaning: { vi: 'Chúc một ngày tốt lành!', en: 'a friendly goodbye during the day' },
        example: 'See you later. Have a good day!', exampleTranslation: { vi: 'Gặp lại sau nhé. Chúc một ngày tốt lành!', en: 'See you later. Have a good day!' },
      },
    ],
  },

  // ---------------------------------------------------------------- shopping
  {
    id: 'en-shopping',
    lang: 'en',
    scenario: 'shopping',
    level: 'beginner',
    intro: {
      scenario: {
        vi: 'Bạn vào một cửa hàng quần áo để mua một chiếc áo phông. Nhân viên bán hàng đến hỏi bạn.',
        en: 'You go into a clothing store to buy a T-shirt. A sales assistant comes over to help you.',
        zh: '你走进一家服装店想买一件 T 恤。店员过来招呼你。',
      },
      role: {
        vi: 'Bạn là khách hàng. Hãy nói bạn cần gì, chọn cỡ và màu, hỏi giá, rồi thanh toán.',
        en: 'You are the customer. Say what you need, choose a size and color, ask the price and pay.',
        zh: '你是顾客。请说出你想买什么，选择尺码和颜色，问价格，然后付款。',
      },
    },
    turns: [
      {
        partner: {
          text: 'Hi there! Can I help you?',
          translation: { vi: 'Chào bạn! Tôi có thể giúp gì cho bạn?', en: 'Hi there! Can I help you?' },
          pron: ipa('/haɪ ðer kən aɪ help juː/', '/haɪ ðeə kən aɪ help juː/'),
        },
        replies: [
          { text: "Yes, please. I'm looking for a T-shirt.", translation: { vi: 'Vâng. Tôi đang tìm một chiếc áo phông.', en: "Yes, please. I'm looking for a T-shirt." } },
          { text: "Hi! I'd like a T-shirt for my brother.", translation: { vi: 'Chào bạn! Tôi muốn mua một chiếc áo phông cho em trai.', en: "Hi! I'd like a T-shirt for my brother." } },
        ],
      },
      {
        partner: {
          text: 'Sure. What size do you need?',
          translation: { vi: 'Vâng. Bạn cần cỡ nào?', en: 'Sure. What size do you need?' },
          pron: ipa('/ʃʊr wʌt saɪz də juː niːd/', '/ʃɔː wɒt saɪz də juː niːd/'),
        },
        replies: [
          { text: 'Medium, please.', translation: { vi: 'Cỡ M ạ.', en: 'Medium, please.' } },
          { text: 'Large, I think.', translation: { vi: 'Cỡ L, tôi nghĩ vậy.', en: 'Large, I think.' } },
        ],
      },
      {
        partner: {
          text: 'Here you are. We have it in white, black, and blue.',
          translation: { vi: 'Của bạn đây. Chúng tôi có màu trắng, đen và xanh dương.', en: 'Here you are. We have it in white, black, and blue.' },
          pron: ipa('/hɪr juː ɑːr wiː hæv ɪt ɪn waɪt blæk ənd bluː/', '/hɪə juː ɑː wiː hæv ɪt ɪn waɪt blæk ənd bluː/'),
        },
        replies: [
          { text: 'Blue, please.', translation: { vi: 'Màu xanh dương ạ.', en: 'Blue, please.' } },
          { text: 'I like the black one.', translation: { vi: 'Tôi thích chiếc màu đen.', en: 'I like the black one.' } },
        ],
      },
      {
        partner: {
          text: 'Good choice! Anything else?',
          translation: { vi: 'Lựa chọn hay đấy! Bạn cần gì nữa không?', en: 'Good choice! Anything else?' },
          pron: ipa('/ɡʊd tʃɔɪs ˈeniθɪŋ els/'),
        },
        replies: [
          { text: 'No, thanks. How much is it?', translation: { vi: 'Không, cảm ơn. Cái này bao nhiêu tiền?', en: 'No, thanks. How much is it?' } },
          { text: "No, that's all. How much is this T-shirt?", translation: { vi: 'Không, vậy thôi. Chiếc áo phông này bao nhiêu tiền?', en: "No, that's all. How much is this T-shirt?" } },
        ],
      },
      {
        partner: {
          text: "It's fifteen dollars. It's on sale today.",
          translation: { vi: 'Mười lăm đô-la. Hôm nay đang giảm giá.', en: "It's fifteen dollars. It's on sale today." },
          pron: ipa('/ɪts ˌfɪfˈtiːn ˈdɑːlərz ɪts ɑːn seɪl təˈdeɪ/', '/ɪts ˌfɪfˈtiːn ˈdɒləz ɪts ɒn seɪl təˈdeɪ/'),
        },
        replies: [
          { text: "OK, I'll take it.", translation: { vi: 'Được, tôi lấy cái này.', en: "OK, I'll take it." } },
          { text: "That's a good price. I'll take it.", translation: { vi: 'Giá tốt đấy. Tôi lấy nhé.', en: "That's a good price. I'll take it." } },
          { text: "Great! Then I'll take two.", translation: { vi: 'Tuyệt! Vậy tôi lấy hai chiếc.', en: "Great! Then I'll take two." } },
        ],
      },
      {
        partner: {
          text: 'Great. Will that be cash or card?',
          translation: { vi: 'Vâng. Bạn trả tiền mặt hay thẻ?', en: 'Great. Will you pay in cash or by card?' },
          pron: ipa('/ɡreɪt wɪl ðæt bi kæʃ ɔːr kɑːrd/', '/ɡreɪt wɪl ðæt bi kæʃ ɔː kɑːd/'),
        },
        replies: [
          { text: 'Card, please.', translation: { vi: 'Thẻ ạ.', en: 'Card, please.' } },
          { text: 'Cash. Here you are.', translation: { vi: 'Tiền mặt. Gửi bạn.', en: 'Cash. Here you are.' } },
        ],
      },
      {
        partner: {
          text: 'Thank you. Do you need a bag?',
          translation: { vi: 'Cảm ơn bạn. Bạn có cần túi không?', en: 'Thank you. Do you need a bag?' },
          pron: ipa('/θæŋk juː duː juː niːd ə bæɡ/'),
        },
        replies: [
          { text: 'Yes, please.', translation: { vi: 'Có, cảm ơn.', en: 'Yes, please.' } },
          { text: "No, thanks. I have one.", translation: { vi: 'Không, cảm ơn. Tôi có túi rồi.', en: "No, thanks. I have one." } },
        ],
      },
      {
        partner: {
          text: "Here's your receipt. Have a nice day!",
          translation: { vi: 'Hóa đơn của bạn đây. Chúc bạn một ngày vui vẻ!', en: "Here's your receipt. Have a nice day!" },
          pron: ipa('/hɪrz jʊr rɪˈsiːt hæv ə naɪs deɪ/', '/hɪəz jɔː rɪˈsiːt hæv ə naɪs deɪ/'),
        },
        replies: [
          { text: 'Thank you. Bye!', translation: { vi: 'Cảm ơn. Tạm biệt!', en: 'Thank you. Bye!' } },
          { text: 'Thanks, you too!', translation: { vi: 'Cảm ơn, bạn cũng vậy nhé!', en: 'Thanks, you too!' } },
        ],
      },
    ],
    suggestions: [
      {
        level: 'word', text: 'size', pron: ipa('/saɪz/', undefined, 'SIZE'),
        meaning: { vi: 'cỡ, kích cỡ', en: 'how big something is, e.g. small, medium, large' },
        example: 'Do you have this in a smaller size?', exampleTranslation: { vi: 'Cái này có cỡ nhỏ hơn không?', en: 'Do you have this in a smaller size?' },
      },
      {
        level: 'word', text: 'price', pron: ipa('/praɪs/', undefined, 'PRYSE'),
        meaning: { vi: 'giá', en: 'the money you pay for something' },
        example: "What's the price of this jacket?", exampleTranslation: { vi: 'Chiếc áo khoác này giá bao nhiêu?', en: "What's the price of this jacket?" },
      },
      {
        level: 'word', text: 'cheap', pron: ipa('/tʃiːp/', undefined, 'CHEEP'),
        meaning: { vi: 'rẻ', en: 'not costing much money' },
        example: 'This T-shirt is really cheap.', exampleTranslation: { vi: 'Chiếc áo phông này rẻ thật.', en: 'This T-shirt is really cheap.' },
      },
      {
        level: 'word', text: 'expensive', pron: ipa('/ɪkˈspensɪv/', undefined, 'ik-SPEN-siv'),
        meaning: { vi: 'đắt', en: 'costing a lot of money' },
        example: "That's a bit expensive for me.", exampleTranslation: { vi: 'Cái đó hơi đắt với tôi.', en: "That's a bit expensive for me." },
      },
      {
        level: 'word', text: 'receipt', pron: ipa('/rɪˈsiːt/', undefined, 'rih-SEET', {
          vi: 'Chữ p trong "receipt" không đọc.',
          en: 'The "p" in "receipt" is silent.',
        }),
        meaning: { vi: 'hóa đơn, biên lai', en: 'a piece of paper that shows you paid' },
        example: 'Can I have a receipt, please?', exampleTranslation: { vi: 'Cho tôi xin hóa đơn được không?', en: 'Can I have a receipt, please?' },
      },
      {
        level: 'word', text: 'cash', pron: ipa('/kæʃ/', undefined, 'KASH'),
        meaning: { vi: 'tiền mặt', en: 'money in coins and paper notes' },
        example: "I'll pay in cash.", exampleTranslation: { vi: 'Tôi sẽ trả bằng tiền mặt.', en: "I'll pay in cash." },
      },
      {
        level: 'phrase', text: 'How much is it?', pron: ipa('/haʊ ˈmʌtʃ ɪz ɪt/', undefined, 'how MUCH iz it'),
        meaning: { vi: 'Cái này bao nhiêu tiền?', en: 'a question about the price' },
        example: 'I like this bag. How much is it?', exampleTranslation: { vi: 'Tôi thích cái túi này. Nó bao nhiêu tiền?', en: 'I like this bag. How much is it?' },
      },
      {
        level: 'phrase', text: "I'm looking for…", pron: ipa('/aɪm ˈlʊkɪŋ fɔːr/', '/aɪm ˈlʊkɪŋ fɔː/', 'ime LUK-ing for'),
        meaning: { vi: 'Tôi đang tìm…', en: 'used to say what you want to find or buy' },
        example: "I'm looking for a white shirt.", exampleTranslation: { vi: 'Tôi đang tìm một chiếc áo sơ mi trắng.', en: "I'm looking for a white shirt." },
      },
      {
        level: 'phrase', text: 'try it on', pron: ipa('/ˌtraɪ ɪt ˈɑːn/', '/ˌtraɪ ɪt ˈɒn/', 'try it ON'),
        meaning: { vi: 'mặc thử', en: 'to put on clothes to see if they fit' },
        example: 'Can I try it on?', exampleTranslation: { vi: 'Tôi mặc thử được không?', en: 'Can I try it on?' },
      },
      {
        level: 'phrase', text: 'on sale', pron: ipa('/ɑːn ˈseɪl/', '/ɒn ˈseɪl/', 'on SAYL'),
        meaning: { vi: 'đang giảm giá', en: 'sold at a lower price than usual' },
        example: 'These shoes are on sale this week.', exampleTranslation: { vi: 'Tuần này đôi giày này đang giảm giá.', en: 'These shoes are on sale this week.' },
      },
      {
        level: 'phrase', text: "I'll take it.", pron: ipa('/aɪl ˈteɪk ɪt/', undefined, 'ile TAYK it'),
        meaning: { vi: 'Tôi lấy cái này. (Tôi mua.)', en: 'used to say you decide to buy something' },
        example: "It's perfect. I'll take it.", exampleTranslation: { vi: 'Hoàn hảo. Tôi lấy cái này.', en: "It's perfect. I'll take it." },
      },
      {
        level: 'sentence', text: 'Can I try it on?', pron: ipa('/kən aɪ ˌtraɪ ɪt ˈɑːn/', '/kən aɪ ˌtraɪ ɪt ˈɒn/'),
        meaning: { vi: 'Tôi mặc thử được không?', en: 'asking to try clothes before buying' },
        example: 'This jacket looks nice. Can I try it on?', exampleTranslation: { vi: 'Chiếc áo khoác này đẹp quá. Tôi mặc thử được không?', en: 'This jacket looks nice. Can I try it on?' },
      },
      {
        level: 'sentence', text: 'Do you have it in a smaller size?', pron: ipa('/də juː hæv ɪt ɪn ə ˈsmɔːlər saɪz/', '/də juː hæv ɪt ɪn ə ˈsmɔːlə saɪz/'),
        meaning: { vi: 'Cái này có cỡ nhỏ hơn không?', en: 'asking for another size' },
        example: "It's too big. Do you have it in a smaller size?", exampleTranslation: { vi: 'Nó rộng quá. Có cỡ nhỏ hơn không?', en: "It's too big. Do you have it in a smaller size?" },
      },
      {
        level: 'sentence', text: 'Can I pay by card?', pron: ipa('/kən aɪ peɪ baɪ kɑːrd/', '/kən aɪ peɪ baɪ kɑːd/'),
        meaning: { vi: 'Tôi trả bằng thẻ được không?', en: 'asking if you can pay with a bank card' },
        example: "I don't have any cash. Can I pay by card?", exampleTranslation: { vi: 'Tôi không có tiền mặt. Tôi trả bằng thẻ được không?', en: "I don't have any cash. Can I pay by card?" },
      },
      {
        level: 'sentence', text: "That's a bit expensive.", pron: ipa('/ðæts ə bɪt ɪkˈspensɪv/'),
        meaning: { vi: 'Hơi đắt một chút.', en: 'a polite way to say the price is high' },
        example: "Hmm, that's a bit expensive. Do you have a cheaper one?", exampleTranslation: { vi: 'Hmm, hơi đắt một chút. Có cái nào rẻ hơn không?', en: "Hmm, that's a bit expensive. Do you have a cheaper one?" },
      },
    ],
  },

  // ---------------------------------------------------------------- food
  {
    id: 'en-food',
    lang: 'en',
    scenario: 'food',
    level: 'beginner',
    intro: {
      scenario: {
        vi: 'Bạn đang ở một nhà hàng nhỏ. Người phục vụ đến bàn để nhận gọi món.',
        en: 'You are at a small restaurant. The server comes to your table to take your order.',
        zh: '你在一家小餐馆里。服务员来到你的桌前点餐。',
      },
      role: {
        vi: 'Bạn là thực khách. Hãy gọi món ăn và đồ uống, nhận xét món ăn và xin hóa đơn.',
        en: 'You are the customer. Order food and a drink, say how the food is and ask for the check.',
        zh: '你是顾客。请点菜和饮料，评价一下菜品，然后要求结账。',
      },
    },
    turns: [
      {
        partner: {
          text: 'Hi, welcome! Are you ready to order?',
          translation: { vi: 'Xin chào, mời vào! Bạn gọi món chưa ạ?', en: 'Hi, welcome! Are you ready to order?' },
          pron: ipa('/haɪ ˈwelkəm ɑːr juː ˈredi tu ˈɔːrdər/', '/haɪ ˈwelkəm ɑː juː ˈredi tu ˈɔːdə/'),
        },
        replies: [
          { text: "Yes, I'm ready.", translation: { vi: 'Vâng, tôi sẵn sàng rồi.', en: "Yes, I'm ready." } },
          { text: 'Almost. What do you recommend?', translation: { vi: 'Sắp rồi. Bạn gợi ý món gì?', en: 'Almost. What do you recommend?' } },
        ],
      },
      {
        partner: {
          text: 'Our chicken salad is very popular. What would you like?',
          translation: { vi: 'Món salad gà của chúng tôi rất được ưa chuộng. Bạn muốn dùng gì?', en: 'Our chicken salad is very popular. What would you like?' },
          pron: ipa('/ˈaʊər ˈtʃɪkɪn ˈsæləd ɪz ˈveri ˈpɑːpjələr wʌt wʊd juː laɪk/', '/ˈaʊə ˈtʃɪkɪn ˈsæləd ɪz ˈveri ˈpɒpjələ wɒt wʊd juː laɪk/'),
        },
        replies: [
          { text: "I'll have the chicken salad, please.", translation: { vi: 'Cho tôi món salad gà.', en: "I'll have the chicken salad, please." } },
          { text: 'Can I have a beef burger, please? Not too spicy.', translation: { vi: 'Cho tôi một bánh burger bò nhé? Đừng cay quá.', en: 'Can I have a beef burger, please? Not too spicy.' } },
        ],
      },
      {
        partner: {
          text: 'Sure. Anything to drink?',
          translation: { vi: 'Vâng. Bạn uống gì không?', en: 'Sure. Anything to drink?' },
          pron: ipa('/ʃʊr ˈeniθɪŋ tə drɪŋk/', '/ʃɔːr ˈeniθɪŋ tə drɪŋk/'),
        },
        replies: [
          { text: 'Water, please.', translation: { vi: 'Cho tôi nước lọc.', en: 'Water, please.' } },
          { text: "I'd like an iced coffee, please.", translation: { vi: 'Tôi muốn một ly cà phê đá.', en: "I'd like an iced coffee, please." } },
          { text: 'Can I have an orange juice with no ice?', translation: { vi: 'Cho tôi một ly nước cam không đá được không?', en: 'Can I have an orange juice with no ice?' } },
        ],
      },
      {
        partner: {
          text: 'No problem. Anything else?',
          translation: { vi: 'Không vấn đề gì. Bạn cần gì nữa không?', en: 'No problem. Anything else?' },
          pron: ipa('/noʊ ˈprɑːbləm ˈeniθɪŋ els/', '/nəʊ ˈprɒbləm ˈeniθɪŋ els/'),
        },
        replies: [
          { text: "No, that's all. Thanks.", translation: { vi: 'Không, vậy thôi. Cảm ơn.', en: "No, that's all. Thanks." } },
          { text: 'Yes, can I also have some bread, please?', translation: { vi: 'Có, cho tôi thêm ít bánh mì nhé?', en: 'Yes, can I also have some bread, please?' } },
        ],
      },
      {
        partner: {
          text: "Here's your order. Enjoy your meal!",
          translation: { vi: 'Món của bạn đây. Chúc bạn ngon miệng!', en: "Here's your order. Enjoy your meal!" },
          pron: ipa('/hɪrz jʊr ˈɔːrdər ɪnˈdʒɔɪ jʊr miːl/', '/hɪəz jɔːr ˈɔːdər ɪnˈdʒɔɪ jɔː miːl/'),
        },
        replies: [
          { text: 'Thank you!', translation: { vi: 'Cảm ơn bạn!', en: 'Thank you!' } },
          { text: 'Thanks! It looks delicious.', translation: { vi: 'Cảm ơn! Trông ngon quá.', en: 'Thanks! It looks delicious.' } },
        ],
      },
      {
        partner: {
          text: "How's everything?",
          translation: { vi: 'Mọi thứ thế nào ạ? (Món ăn có ngon không?)', en: "How's everything?" },
          pron: ipa('/haʊz ˈevriθɪŋ/'),
        },
        replies: [
          { text: "It's delicious!", translation: { vi: 'Ngon lắm!', en: "It's delicious!" } },
          { text: 'Everything is great, thanks. Could I have the check, please?', translation: { vi: 'Mọi thứ rất tuyệt, cảm ơn. Cho tôi xin hóa đơn nhé?', en: 'Everything is great, thanks. Could I have the check, please?' } },
        ],
      },
      {
        partner: {
          text: "Glad you like it! Here's your check. Thanks for coming!",
          translation: { vi: 'Rất vui vì bạn thích! Hóa đơn của bạn đây. Cảm ơn bạn đã đến!', en: "Glad you like it! Here's your check. Thanks for coming!" },
          pron: ipa('/ɡlæd juː laɪk ɪt hɪrz jʊr tʃek θæŋks fər ˈkʌmɪŋ/', '/ɡlæd juː laɪk ɪt hɪəz jɔː tʃek θæŋks fə ˈkʌmɪŋ/'),
        },
        replies: [
          { text: 'Thank you. Bye!', translation: { vi: 'Cảm ơn. Tạm biệt!', en: 'Thank you. Bye!' } },
          { text: 'Here you go. Thanks, and goodbye!', translation: { vi: 'Gửi bạn. Cảm ơn và tạm biệt!', en: 'Here you go. Thanks, and goodbye!' } },
        ],
      },
    ],
    suggestions: [
      {
        level: 'word', text: 'menu', pron: ipa('/ˈmenjuː/', undefined, 'MEN-yoo'),
        meaning: { vi: 'thực đơn', en: 'a list of the food and drinks in a restaurant' },
        example: 'Can I see the menu, please?', exampleTranslation: { vi: 'Cho tôi xem thực đơn được không?', en: 'Can I see the menu, please?' },
      },
      {
        level: 'word', text: 'order', pron: ipa('/ˈɔːrdər/', '/ˈɔːdə/', 'OR-der'),
        meaning: { vi: 'gọi món; món đã gọi', en: 'to ask for food or drinks; the food you asked for' },
        example: "I'd like to order now.", exampleTranslation: { vi: 'Tôi muốn gọi món bây giờ.', en: "I'd like to order now." },
      },
      {
        level: 'word', text: 'delicious', pron: ipa('/dɪˈlɪʃəs/', undefined, 'dih-LISH-us'),
        meaning: { vi: 'ngon', en: 'tasting very good' },
        example: 'This soup is delicious!', exampleTranslation: { vi: 'Món súp này ngon quá!', en: 'This soup is delicious!' },
      },
      {
        level: 'word', text: 'spicy', pron: ipa('/ˈspaɪsi/', undefined, 'SPY-see'),
        meaning: { vi: 'cay', en: 'with a hot taste, like chili' },
        example: 'Is this dish spicy?', exampleTranslation: { vi: 'Món này có cay không?', en: 'Is this dish spicy?' },
      },
      {
        level: 'word', text: 'water', pron: ipa('/ˈwɔːtər/', '/ˈwɔːtə/', 'WAW-ter'),
        meaning: { vi: 'nước, nước lọc', en: 'the clear drink that falls as rain' },
        example: 'A glass of water, please.', exampleTranslation: { vi: 'Cho tôi một cốc nước lọc.', en: 'A glass of water, please.' },
      },
      {
        level: 'word', text: 'check', pron: ipa('/tʃek/', undefined, 'CHEK', {
          vi: 'Tiếng Anh Mỹ nói "check"; tiếng Anh Anh thường nói "bill" /bɪl/.',
          en: 'American English says "check"; British English usually says "bill" /bɪl/.',
        }),
        meaning: { vi: 'hóa đơn (ở nhà hàng)', en: 'the paper that shows how much you must pay in a restaurant' },
        example: 'Could we have the check, please?', exampleTranslation: { vi: 'Cho chúng tôi xin hóa đơn nhé?', en: 'Could we have the check, please?' },
      },
      {
        level: 'phrase', text: "I'll have…", pron: ipa('/aɪl ˈhæv/', undefined, 'ile HAV'),
        meaning: { vi: 'Cho tôi… (khi gọi món)', en: 'used to order food or drinks' },
        example: "I'll have the fish, please.", exampleTranslation: { vi: 'Cho tôi món cá.', en: "I'll have the fish, please." },
      },
      {
        level: 'phrase', text: 'Can I have…?', pron: ipa('/kən aɪ ˈhæv/', undefined, 'kun eye HAV'),
        meaning: { vi: 'Cho tôi… được không?', en: 'a polite way to ask for something' },
        example: 'Can I have some more water?', exampleTranslation: { vi: 'Cho tôi thêm ít nước được không?', en: 'Can I have some more water?' },
      },
      {
        level: 'phrase', text: 'Anything else?', pron: ipa('/ˈeniθɪŋ ˈels/', undefined, 'EN-ee-thing ELS'),
        meaning: { vi: 'Còn gì nữa không?', en: 'asking if someone wants more' },
        example: 'One coffee. Anything else?', exampleTranslation: { vi: 'Một cà phê. Còn gì nữa không?', en: 'One coffee. Anything else?' },
      },
      {
        level: 'phrase', text: 'not too spicy', pron: ipa('/ˌnɑːt tuː ˈspaɪsi/', '/ˌnɒt tuː ˈspaɪsi/', 'not too SPY-see'),
        meaning: { vi: 'đừng cay quá', en: 'only a little hot' },
        example: 'Beef noodles, please, not too spicy.', exampleTranslation: { vi: 'Cho tôi phở bò, đừng cay quá nhé.', en: 'Beef noodles, please, not too spicy.' },
      },
      {
        level: 'phrase', text: 'for here or to go', pron: ipa('/fər ˈhɪr ɔːr tə ˈɡoʊ/', '/fə ˈhɪər ɔː tə ˈɡəʊ/', 'fer HEER or tuh GOH', {
          vi: 'Câu hỏi kiểu Mỹ: ăn tại chỗ hay mang đi. Ở Anh hay nói "eat in or take away".',
          en: 'American question: eat here or take the food away. In the UK people say "eat in or take away".',
        }),
        meaning: { vi: 'ăn tại chỗ hay mang đi', en: 'eating in the restaurant or taking the food with you' },
        example: 'Is that for here or to go?', exampleTranslation: { vi: 'Bạn ăn tại chỗ hay mang đi?', en: 'Is that for here or to go?' },
      },
      {
        level: 'sentence', text: 'What do you recommend?', pron: ipa('/wʌt də juː ˌrekəˈmend/', '/wɒt də juː ˌrekəˈmend/'),
        meaning: { vi: 'Bạn gợi ý món gì?', en: 'asking the server for a good choice' },
        example: "It's my first time here. What do you recommend?", exampleTranslation: { vi: 'Lần đầu tôi đến đây. Bạn gợi ý món gì?', en: "It's my first time here. What do you recommend?" },
      },
      {
        level: 'sentence', text: "I'll have the chicken salad, please.", pron: ipa('/aɪl hæv ðə ˈtʃɪkɪn ˈsæləd pliːz/'),
        meaning: { vi: 'Cho tôi món salad gà.', en: 'ordering a dish' },
        example: "I'll have the chicken salad, please, and a lemon tea.", exampleTranslation: { vi: 'Cho tôi món salad gà và một trà chanh.', en: "I'll have the chicken salad, please, and a lemon tea." },
      },
      {
        level: 'sentence', text: 'Could I have the check, please?', pron: ipa('/kʊd aɪ hæv ðə tʃek pliːz/'),
        meaning: { vi: 'Cho tôi xin hóa đơn nhé?', en: 'asking to pay at the end of a meal' },
        example: 'Everything was great. Could I have the check, please?', exampleTranslation: { vi: 'Mọi thứ rất tuyệt. Cho tôi xin hóa đơn nhé?', en: 'Everything was great. Could I have the check, please?' },
      },
      {
        level: 'sentence', text: "I'm allergic to peanuts.", pron: ipa('/aɪm əˈlɜːrdʒɪk tə ˈpiːnʌts/', '/aɪm əˈlɜːdʒɪk tə ˈpiːnʌts/'),
        meaning: { vi: 'Tôi bị dị ứng đậu phộng.', en: 'telling the server about a food allergy' },
        example: "I'm allergic to peanuts. Is there any in this dish?", exampleTranslation: { vi: 'Tôi bị dị ứng đậu phộng. Món này có đậu phộng không?', en: "I'm allergic to peanuts. Is there any in this dish?" },
      },
    ],
  },

  // ---------------------------------------------------------------- travel
  {
    id: 'en-travel',
    lang: 'en',
    scenario: 'travel',
    level: 'elementary',
    intro: {
      scenario: {
        vi: 'Bạn vừa đến khách sạn sau một chuyến bay dài. Nhân viên lễ tân chào bạn ở quầy.',
        en: 'You have just arrived at your hotel after a long flight. The receptionist greets you at the front desk.',
        zh: '你坐了很久的飞机，刚到酒店。前台接待员在柜台向你问好。',
      },
      role: {
        vi: 'Bạn là khách. Hãy làm thủ tục nhận phòng, xác nhận đặt phòng và hỏi về bữa sáng, giờ trả phòng, thang máy hoặc Wi-Fi.',
        en: 'You are the guest. Check in, confirm your booking and ask about breakfast, check-out time, the elevator or the Wi-Fi.',
        zh: '你是客人。请办理入住，确认预订，并询问早餐、退房时间、电梯或 Wi-Fi。',
      },
    },
    turns: [
      {
        partner: {
          text: 'Good evening, welcome to the Riverside Hotel. How can I help you?',
          translation: { vi: 'Chào buổi tối, chào mừng quý khách đến khách sạn Riverside. Tôi có thể giúp gì ạ?', en: 'Good evening, welcome to the Riverside Hotel. How can I help you?' },
          pron: ipa('/ɡʊd ˈiːvnɪŋ ˈwelkəm tə ðə ˈrɪvərsaɪd hoʊˈtel haʊ kən aɪ help juː/', '/ɡʊd ˈiːvnɪŋ ˈwelkəm tə ðə ˈrɪvəsaɪd həʊˈtel haʊ kən aɪ help juː/'),
        },
        replies: [
          { text: 'Hi. I have a reservation.', translation: { vi: 'Chào bạn. Tôi đã đặt phòng.', en: 'Hi. I have a reservation.' } },
          { text: "Good evening. I'd like to check in, please. I booked a room online.", translation: { vi: 'Chào buổi tối. Tôi muốn nhận phòng. Tôi đã đặt phòng qua mạng.', en: "Good evening. I'd like to check in, please. I booked a room online." } },
        ],
      },
      {
        partner: {
          text: 'Of course. Can I have your name, please?',
          translation: { vi: 'Vâng. Cho tôi xin tên của quý khách?', en: 'Of course. Can I have your name, please?' },
          pron: ipa('/əv kɔːrs kən aɪ hæv jʊr neɪm pliːz/', '/əv kɔːs kən aɪ hæv jɔː neɪm pliːz/'),
        },
        replies: [
          { text: "Sure. It's Lan Nguyen.", translation: { vi: 'Vâng. Tên tôi là Nguyễn Lan.', en: "Sure. It's Lan Nguyen." } },
          { text: 'Yes, my name is Minh Tran. T-R-A-N.', translation: { vi: 'Vâng, tên tôi là Trần Minh. T-R-A-N.', en: 'Yes, my name is Minh Tran. T-R-A-N.' } },
        ],
      },
      {
        partner: {
          text: 'Thank you. A double room for three nights, is that right?',
          translation: { vi: 'Cảm ơn quý khách. Một phòng đôi trong ba đêm, đúng không ạ?', en: 'Thank you. A double room for three nights, is that right?' },
          pron: ipa('/θæŋk juː ə ˈdʌbəl ruːm fər θriː naɪts ɪz ðæt raɪt/', '/θæŋk juː ə ˈdʌbəl ruːm fə θriː naɪts ɪz ðæt raɪt/'),
        },
        replies: [
          { text: "Yes, that's right.", translation: { vi: 'Vâng, đúng rồi.', en: "Yes, that's right." } },
          { text: "Yes, that's correct. Is breakfast included?", translation: { vi: 'Vâng, chính xác. Có bao gồm bữa sáng không?', en: "Yes, that's correct. Is breakfast included?" } },
        ],
      },
      {
        partner: {
          text: "Great. Breakfast is included. It's from six thirty to ten, in the restaurant downstairs.",
          translation: { vi: 'Vâng. Giá phòng đã bao gồm bữa sáng, phục vụ từ sáu giờ rưỡi đến mười giờ ở nhà hàng tầng dưới.', en: "Great. Breakfast is included. It's from six thirty to ten, in the restaurant downstairs." },
          pron: ipa('/ɡreɪt ˈbrekfəst ɪz ɪnˈkluːdɪd ɪts frəm sɪks ˈθɜːrti tə ten ɪn ðə ˈrestərɑːnt ˌdaʊnˈsterz/', '/ɡreɪt ˈbrekfəst ɪz ɪnˈkluːdɪd ɪts frəm sɪks ˈθɜːti tə ten ɪn ðə ˈrestrɒnt ˌdaʊnˈsteəz/'),
        },
        replies: [
          { text: 'Great, thank you.', translation: { vi: 'Tuyệt, cảm ơn bạn.', en: 'Great, thank you.' } },
          { text: 'Perfect. And what time is check-out?', translation: { vi: 'Tuyệt quá. Còn mấy giờ phải trả phòng?', en: 'Perfect. And what time is check-out?' } },
        ],
      },
      {
        partner: {
          text: "Here's your key card. Your room is 512, and check-out is at noon.",
          translation: { vi: 'Thẻ phòng của quý khách đây. Phòng số 512, và giờ trả phòng là mười hai giờ trưa.', en: "Here's your key card. Your room is 512, and check-out is at noon." },
          pron: ipa('/hɪrz jʊr ˈkiː kɑːrd jʊr ruːm ɪz faɪv ˈtwelv ənd ˈtʃekaʊt ɪz ət nuːn/', '/hɪəz jɔː ˈkiː kɑːd jɔː ruːm ɪz faɪv ˈtwelv ənd ˈtʃekaʊt ɪz ət nuːn/'),
        },
        replies: [
          { text: "Thank you. Where's the elevator?", translation: { vi: 'Cảm ơn bạn. Thang máy ở đâu ạ?', en: "Thank you. Where's the elevator?" } },
          { text: 'Thanks. Is there Wi-Fi in the room?', translation: { vi: 'Cảm ơn. Trong phòng có Wi-Fi không?', en: 'Thanks. Is there Wi-Fi in the room?' } },
        ],
      },
      {
        partner: {
          text: 'The elevator is just over there, and the Wi-Fi password is on this card.',
          translation: { vi: 'Thang máy ở ngay đằng kia, còn mật khẩu Wi-Fi ghi trên tấm thẻ này.', en: 'The elevator is just over there, and the Wi-Fi password is on this card.' },
          pron: ipa('/ði ˈelɪveɪtər ɪz dʒʌst ˈoʊvər ðer ənd ðə ˈwaɪfaɪ ˈpæswɜːrd ɪz ɑːn ðɪs kɑːrd/', '/ði ˈelɪveɪtər ɪz dʒʌst ˈəʊvə ðeər ənd ðə ˈwaɪfaɪ ˈpɑːswɜːd ɪz ɒn ðɪs kɑːd/'),
        },
        replies: [
          { text: 'Great, thanks for your help.', translation: { vi: 'Tuyệt, cảm ơn bạn đã giúp.', en: 'Great, thanks for your help.' } },
          { text: 'Perfect. Thank you very much.', translation: { vi: 'Tuyệt quá. Cảm ơn bạn rất nhiều.', en: 'Perfect. Thank you very much.' } },
        ],
      },
      {
        partner: {
          text: 'Is there anything else I can help you with?',
          translation: { vi: 'Quý khách còn cần tôi giúp gì nữa không ạ?', en: 'Is there anything else I can help you with?' },
          pron: ipa('/ɪz ðer ˈeniθɪŋ els aɪ kən help juː wɪð/', '/ɪz ðeər ˈeniθɪŋ els aɪ kən help juː wɪð/'),
        },
        replies: [
          { text: "No, that's all. Thank you.", translation: { vi: 'Không, vậy là đủ rồi. Cảm ơn bạn.', en: "No, that's all. Thank you." } },
          { text: "No, I think that's everything. Thanks a lot!", translation: { vi: 'Không, tôi nghĩ vậy là đủ rồi. Cảm ơn nhiều!', en: "No, I think that's everything. Thanks a lot!" } },
        ],
      },
      {
        partner: {
          text: "You're welcome. If you need anything, just call the front desk. Enjoy your stay!",
          translation: { vi: 'Không có gì ạ. Nếu cần gì, quý khách cứ gọi xuống lễ tân. Chúc quý khách có kỳ nghỉ vui vẻ!', en: "You're welcome. If you need anything, just call the front desk. Enjoy your stay!" },
          pron: ipa('/jʊr ˈwelkəm ɪf juː niːd ˈeniθɪŋ dʒʌst kɔːl ðə frʌnt desk ɪnˈdʒɔɪ jʊr steɪ/', '/jɔː ˈwelkəm ɪf juː niːd ˈeniθɪŋ dʒʌst kɔːl ðə frʌnt desk ɪnˈdʒɔɪ jɔː steɪ/'),
        },
        replies: [
          { text: 'Thank you. Good night!', translation: { vi: 'Cảm ơn bạn. Chúc ngủ ngon!', en: 'Thank you. Good night!' } },
          { text: 'Thanks so much. Have a good evening!', translation: { vi: 'Cảm ơn bạn nhiều. Chúc buổi tối vui vẻ!', en: 'Thanks so much. Have a good evening!' } },
        ],
      },
    ],
    suggestions: [
      {
        level: 'word', text: 'reservation', pron: ipa('/ˌrezərˈveɪʃən/', '/ˌrezəˈveɪʃən/', 'rez-er-VAY-shun'),
        meaning: { vi: 'sự đặt chỗ, đặt phòng', en: 'an arrangement to keep a room or table for you' },
        example: 'I have a reservation for two nights.', exampleTranslation: { vi: 'Tôi đã đặt phòng hai đêm.', en: 'I have a reservation for two nights.' },
      },
      {
        level: 'word', text: 'passport', pron: ipa('/ˈpæspɔːrt/', '/ˈpɑːspɔːt/', 'PASS-port'),
        meaning: { vi: 'hộ chiếu', en: 'an official document you need to travel to other countries' },
        example: 'Can I see your passport, please?', exampleTranslation: { vi: 'Cho tôi xem hộ chiếu của bạn được không?', en: 'Can I see your passport, please?' },
      },
      {
        level: 'word', text: 'luggage', pron: ipa('/ˈlʌɡɪdʒ/', undefined, 'LUG-ij'),
        meaning: { vi: 'hành lý', en: 'the bags and suitcases you take on a trip' },
        example: 'Can I leave my luggage here?', exampleTranslation: { vi: 'Tôi để hành lý ở đây được không?', en: 'Can I leave my luggage here?' },
      },
      {
        level: 'word', text: 'elevator', pron: ipa('/ˈelɪveɪtər/', '/ˈelɪveɪtə/', 'EL-ih-vay-ter', {
          vi: 'Tiếng Anh Mỹ nói "elevator"; tiếng Anh Anh thường nói "lift" /lɪft/.',
          en: 'American English says "elevator"; British English usually says "lift" /lɪft/.',
        }),
        meaning: { vi: 'thang máy', en: 'a machine that carries people up and down in a building' },
        example: 'The elevator is next to the front desk.', exampleTranslation: { vi: 'Thang máy ở cạnh quầy lễ tân.', en: 'The elevator is next to the front desk.' },
      },
      {
        level: 'word', text: 'floor', pron: ipa('/flɔːr/', '/flɔː/', 'FLOR'),
        meaning: { vi: 'tầng (của tòa nhà)', en: 'one level of a building' },
        example: 'My room is on the fifth floor.', exampleTranslation: { vi: 'Phòng tôi ở tầng năm.', en: 'My room is on the fifth floor.' },
      },
      {
        level: 'word', text: 'nearby', pron: ipa('/ˌnɪrˈbaɪ/', '/ˌnɪəˈbaɪ/', 'neer-BY'),
        meaning: { vi: 'gần đây, ở gần', en: 'not far away' },
        example: 'Is there a pharmacy nearby?', exampleTranslation: { vi: 'Gần đây có hiệu thuốc nào không?', en: 'Is there a pharmacy nearby?' },
      },
      {
        level: 'phrase', text: 'check in', pron: ipa('/ˌtʃek ˈɪn/', undefined, 'chek IN'),
        meaning: { vi: 'làm thủ tục nhận phòng / lên máy bay', en: 'to arrive and register at a hotel or airport' },
        example: "I'd like to check in, please.", exampleTranslation: { vi: 'Tôi muốn làm thủ tục nhận phòng.', en: "I'd like to check in, please." },
      },
      {
        level: 'phrase', text: 'a double room', pron: ipa('/ə ˌdʌbəl ˈruːm/', undefined, 'uh DUB-ul ROOM'),
        meaning: { vi: 'phòng đôi (một giường lớn cho hai người)', en: 'a room with one big bed for two people' },
        example: "I'd like a double room for two nights.", exampleTranslation: { vi: 'Tôi muốn một phòng đôi trong hai đêm.', en: "I'd like a double room for two nights." },
      },
      {
        level: 'phrase', text: 'the front desk', pron: ipa('/ðə ˌfrʌnt ˈdesk/', undefined, 'thuh frunt DESK'),
        meaning: { vi: 'quầy lễ tân', en: 'the place in a hotel where guests check in and ask for help' },
        example: 'Please call the front desk if you need anything.', exampleTranslation: { vi: 'Nếu cần gì, xin hãy gọi quầy lễ tân.', en: 'Please call the front desk if you need anything.' },
      },
      {
        level: 'phrase', text: 'check-out time', pron: ipa('/ˈtʃekaʊt ˌtaɪm/', undefined, 'CHEK-owt tyme'),
        meaning: { vi: 'giờ trả phòng', en: 'the time you must leave your hotel room' },
        example: 'Check-out time is twelve noon.', exampleTranslation: { vi: 'Giờ trả phòng là mười hai giờ trưa.', en: 'Check-out time is twelve noon.' },
      },
      {
        level: 'phrase', text: 'the Wi-Fi password', pron: ipa('/ðə ˈwaɪfaɪ ˌpæswɜːrd/', '/ðə ˈwaɪfaɪ ˌpɑːswɜːd/', 'thuh WY-fy PASS-wurd'),
        meaning: { vi: 'mật khẩu Wi-Fi', en: 'the secret word you need to use the Wi-Fi' },
        example: "What's the Wi-Fi password?", exampleTranslation: { vi: 'Mật khẩu Wi-Fi là gì?', en: "What's the Wi-Fi password?" },
      },
      {
        level: 'sentence', text: 'I have a reservation for tonight.', pron: ipa('/aɪ hæv ə ˌrezərˈveɪʃən fər təˈnaɪt/', '/aɪ hæv ə ˌrezəˈveɪʃən fə təˈnaɪt/'),
        meaning: { vi: 'Tôi đã đặt phòng cho tối nay.', en: 'telling the hotel you booked a room' },
        example: 'Good evening. I have a reservation for tonight.', exampleTranslation: { vi: 'Chào buổi tối. Tôi đã đặt phòng cho tối nay.', en: 'Good evening. I have a reservation for tonight.' },
      },
      {
        level: 'sentence', text: 'Is breakfast included?', pron: ipa('/ɪz ˈbrekfəst ɪnˈkluːdɪd/'),
        meaning: { vi: 'Có bao gồm bữa sáng không?', en: 'asking if breakfast is part of the price' },
        example: 'How much is the room? Is breakfast included?', exampleTranslation: { vi: 'Phòng giá bao nhiêu? Có bao gồm bữa sáng không?', en: 'How much is the room? Is breakfast included?' },
      },
      {
        level: 'sentence', text: 'What time is check-out?', pron: ipa('/wʌt taɪm ɪz ˈtʃekaʊt/', '/wɒt taɪm ɪz ˈtʃekaʊt/'),
        meaning: { vi: 'Mấy giờ phải trả phòng?', en: 'asking when you must leave the room' },
        example: 'My flight is in the afternoon. What time is check-out?', exampleTranslation: { vi: 'Chuyến bay của tôi vào buổi chiều. Mấy giờ phải trả phòng?', en: 'My flight is in the afternoon. What time is check-out?' },
      },
      {
        level: 'sentence', text: 'Could I leave my luggage here?', pron: ipa('/kʊd aɪ liːv maɪ ˈlʌɡɪdʒ hɪr/', '/kʊd aɪ liːv maɪ ˈlʌɡɪdʒ hɪə/'),
        meaning: { vi: 'Tôi gửi hành lý ở đây được không?', en: 'asking the hotel to keep your bags for a while' },
        example: "I've checked out, but my flight is at six. Could I leave my luggage here?", exampleTranslation: { vi: 'Tôi đã trả phòng, nhưng sáu giờ mới bay. Tôi gửi hành lý ở đây được không?', en: "I've checked out, but my flight is at six. Could I leave my luggage here?" },
      },
    ],
  },

  // ---------------------------------------------------------------- hobbies
  {
    id: 'en-hobbies',
    lang: 'en',
    scenario: 'hobbies',
    level: 'elementary',
    intro: {
      scenario: {
        vi: 'Bạn đang uống cà phê với Jake, một người bạn mới quen. Hai người nói chuyện về sở thích.',
        en: 'You are having coffee with Jake, a new friend. You talk about your hobbies.',
        zh: '你和新认识的朋友 Jake 一起喝咖啡，聊起各自的爱好。',
      },
      role: {
        vi: 'Hãy kể về sở thích của bạn: bạn thích làm gì, bao lâu làm một lần, bắt đầu từ khi nào, và đáp lại lời rủ đi chơi của Jake.',
        en: 'Talk about your hobbies: what you like doing, how often, when you started, and respond to Jake\'s invitation.',
        zh: '谈谈你的爱好：喜欢做什么、多久做一次、什么时候开始的，并回应 Jake 的邀请。',
      },
    },
    turns: [
      {
        partner: {
          text: 'So, what do you like to do in your free time?',
          translation: { vi: 'Vậy lúc rảnh bạn thích làm gì?', en: 'So, what do you like to do in your free time?' },
          pron: ipa('/soʊ wʌt də juː laɪk tə duː ɪn jʊr friː taɪm/', '/səʊ wɒt də juː laɪk tə duː ɪn jɔː friː taɪm/'),
        },
        replies: [
          { text: 'I like reading.', translation: { vi: 'Mình thích đọc sách.', en: 'I like reading.' } },
          { text: 'I love listening to music and playing badminton.', translation: { vi: 'Mình rất thích nghe nhạc và chơi cầu lông.', en: 'I love listening to music and playing badminton.' } },
          { text: "I'm really into cooking. I try a new recipe every week.", translation: { vi: 'Mình rất mê nấu ăn. Tuần nào mình cũng thử một công thức mới.', en: "I'm really into cooking. I try a new recipe every week." } },
        ],
      },
      {
        partner: {
          text: 'Oh, really? How often do you do that?',
          translation: { vi: 'Ồ, thật à? Bạn làm việc đó thường xuyên không?', en: 'Oh, really? How often do you do that?' },
          pron: ipa('/oʊ ˈriːəli haʊ ˈɔːfən də juː duː ðæt/', '/əʊ ˈrɪəli haʊ ˈɒfən də juː duː ðæt/'),
        },
        replies: [
          { text: 'Almost every day.', translation: { vi: 'Gần như ngày nào cũng làm.', en: 'Almost every day.' } },
          { text: 'About twice a week, usually in the evening.', translation: { vi: 'Khoảng hai lần một tuần, thường vào buổi tối.', en: 'About twice a week, usually in the evening.' } },
        ],
      },
      {
        partner: {
          text: "That's cool. When did you start?",
          translation: { vi: 'Hay đấy. Bạn bắt đầu từ khi nào?', en: "That's cool. When did you start?" },
          pron: ipa('/ðæts kuːl wen dɪd juː stɑːrt/', '/ðæts kuːl wen dɪd juː stɑːt/'),
        },
        replies: [
          { text: 'When I was a child.', translation: { vi: 'Từ hồi còn nhỏ.', en: 'When I was a child.' } },
          { text: 'About three years ago. A friend got me into it.', translation: { vi: 'Khoảng ba năm trước. Một người bạn đã khiến mình mê nó.', en: 'About three years ago. A friend got me into it.' } },
        ],
      },
      {
        partner: {
          text: "Nice! I'm really into photography these days.",
          translation: { vi: 'Hay quá! Dạo này mình rất mê chụp ảnh.', en: "Nice! I'm really into photography these days." },
          pron: ipa('/naɪs aɪm ˈriːəli ˈɪntuː fəˈtɑːɡrəfi ðiːz deɪz/', '/naɪs aɪm ˈrɪəli ˈɪntuː fəˈtɒɡrəfi ðiːz deɪz/'),
        },
        replies: [
          { text: 'Really? That sounds interesting.', translation: { vi: 'Thật à? Nghe thú vị đấy.', en: 'Really? That sounds interesting.' } },
          { text: 'Wow! What do you like to take photos of?', translation: { vi: 'Ồ! Bạn thích chụp gì?', en: 'Wow! What do you like to take photos of?' } },
        ],
      },
      {
        partner: {
          text: 'I mostly take photos of nature and street life. Have you ever tried it?',
          translation: { vi: 'Mình chủ yếu chụp thiên nhiên và cuộc sống đường phố. Bạn đã bao giờ thử chưa?', en: 'I mostly take photos of nature and street life. Have you ever tried it?' },
          pron: ipa('/aɪ ˈmoʊstli teɪk ˈfoʊtoʊz əv ˈneɪtʃər ənd striːt laɪf həv juː ˈevər traɪd ɪt/', '/aɪ ˈməʊstli teɪk ˈfəʊtəʊz əv ˈneɪtʃər ənd striːt laɪf həv juː ˈevə traɪd ɪt/'),
        },
        replies: [
          { text: "No, never. But I'd like to try.", translation: { vi: 'Chưa, chưa bao giờ. Nhưng mình muốn thử.', en: "No, never. But I'd like to try." } },
          { text: 'Yes, a little. I sometimes take photos with my phone.', translation: { vi: 'Có, một chút. Thỉnh thoảng mình chụp ảnh bằng điện thoại.', en: 'Yes, a little. I sometimes take photos with my phone.' } },
        ],
      },
      {
        partner: {
          text: "You should come with me sometime! I'm going to the park this Saturday.",
          translation: { vi: 'Lúc nào bạn đi cùng mình nhé! Thứ Bảy này mình sẽ ra công viên.', en: "You should come with me sometime! I'm going to the park this Saturday." },
          pron: ipa('/juː ʃʊd kʌm wɪð mi ˈsʌmtaɪm aɪm ˈɡoʊɪŋ tə ðə pɑːrk ðɪs ˈsætərdeɪ/', '/juː ʃʊd kʌm wɪð mi ˈsʌmtaɪm aɪm ˈɡəʊɪŋ tə ðə pɑːk ðɪs ˈsætədeɪ/'),
        },
        replies: [
          { text: "Sure, I'd love to!", translation: { vi: 'Được chứ, mình rất muốn đi!', en: "Sure, I'd love to!" } },
          { text: 'Sounds fun! What time?', translation: { vi: 'Nghe vui đấy! Mấy giờ?', en: 'Sounds fun! What time?' } },
        ],
      },
      {
        partner: {
          text: "Great! Let's meet at the park gate at eight. See you then!",
          translation: { vi: 'Tuyệt! Mình gặp nhau ở cổng công viên lúc tám giờ nhé. Hẹn gặp lúc đó!', en: "Great! Let's meet at the park gate at eight. See you then!" },
          pron: ipa('/ɡreɪt lets miːt ət ðə pɑːrk ɡeɪt ət eɪt siː juː ðen/', '/ɡreɪt lets miːt ət ðə pɑːk ɡeɪt ət eɪt siː juː ðen/'),
        },
        replies: [
          { text: 'OK, see you then!', translation: { vi: 'OK, hẹn gặp lúc đó!', en: 'OK, see you then!' } },
          { text: "Perfect. I'm looking forward to it. See you on Saturday!", translation: { vi: 'Tuyệt. Mình rất mong đến hôm đó. Hẹn gặp thứ Bảy nhé!', en: "Perfect. I'm looking forward to it. See you on Saturday!" } },
        ],
      },
    ],
    suggestions: [
      {
        level: 'word', text: 'hobby', pron: ipa('/ˈhɑːbi/', '/ˈhɒbi/', 'HAH-bee'),
        meaning: { vi: 'sở thích', en: 'an activity you enjoy doing in your free time' },
        example: 'My hobby is playing the guitar.', exampleTranslation: { vi: 'Sở thích của mình là chơi đàn ghi-ta.', en: 'My hobby is playing the guitar.' },
      },
      {
        level: 'word', text: 'often', pron: ipa('/ˈɔːfən/', '/ˈɒfən/', 'AW-fun', {
          vi: 'Chữ t thường không đọc (nhiều người vẫn đọc /ˈɔːftən/).',
          en: 'The "t" is usually silent (some speakers say /ˈɔːftən/).',
        }),
        meaning: { vi: 'thường, hay', en: 'many times' },
        example: 'I often go swimming on Sundays.', exampleTranslation: { vi: 'Mình hay đi bơi vào Chủ nhật.', en: 'I often go swimming on Sundays.' },
      },
      {
        level: 'word', text: 'photography', pron: ipa('/fəˈtɑːɡrəfi/', '/fəˈtɒɡrəfi/', 'fuh-TAH-gruh-fee', {
          vi: 'Trọng âm ở âm tiết thứ hai: pho-TOG-ra-phy (khác với PHO-to-graph).',
          en: 'Stress on the second syllable: pho-TOG-raphy (unlike PHO-to-graph).',
        }),
        meaning: { vi: 'nhiếp ảnh, chụp ảnh', en: 'the activity of taking photos' },
        example: "I'm interested in photography.", exampleTranslation: { vi: 'Mình quan tâm đến nhiếp ảnh.', en: "I'm interested in photography." },
      },
      {
        level: 'word', text: 'badminton', pron: ipa('/ˈbædmɪntən/', undefined, 'BAD-min-tun'),
        meaning: { vi: 'cầu lông', en: 'a sport where you hit a shuttlecock over a high net' },
        example: 'I play badminton with my friends.', exampleTranslation: { vi: 'Mình chơi cầu lông với bạn bè.', en: 'I play badminton with my friends.' },
      },
      {
        level: 'word', text: 'hiking', pron: ipa('/ˈhaɪkɪŋ/', undefined, 'HY-king'),
        meaning: { vi: 'đi bộ đường dài, leo núi', en: 'walking a long way in the countryside or mountains' },
        example: 'We go hiking once a month.', exampleTranslation: { vi: 'Bọn mình đi bộ đường dài mỗi tháng một lần.', en: 'We go hiking once a month.' },
      },
      {
        level: 'word', text: 'interesting', pron: ipa('/ˈɪntrəstɪŋ/', undefined, 'IN-truh-sting'),
        meaning: { vi: 'thú vị', en: 'making you want to know more' },
        example: 'That sounds really interesting!', exampleTranslation: { vi: 'Nghe thú vị thật đấy!', en: 'That sounds really interesting!' },
      },
      {
        level: 'phrase', text: 'in my free time', pron: ipa('/ɪn maɪ ˌfriː ˈtaɪm/', undefined, 'in my free TIME'),
        meaning: { vi: 'lúc rảnh rỗi', en: 'when I am not working or studying' },
        example: 'In my free time, I watch movies.', exampleTranslation: { vi: 'Lúc rảnh, mình xem phim.', en: 'In my free time, I watch movies.' },
      },
      {
        level: 'phrase', text: "I'm into…", pron: ipa('/aɪm ˈɪntuː/', undefined, 'ime IN-too'),
        meaning: { vi: 'Mình mê…, mình thích…', en: 'an informal way to say you like something a lot' },
        example: "I'm into K-pop and dancing.", exampleTranslation: { vi: 'Mình mê K-pop và nhảy.', en: "I'm into K-pop and dancing." },
      },
      {
        level: 'phrase', text: 'twice a week', pron: ipa('/ˈtwaɪs ə ˈwiːk/', undefined, 'TWYSE uh WEEK'),
        meaning: { vi: 'hai lần một tuần', en: 'two times every week' },
        example: 'I go to the gym twice a week.', exampleTranslation: { vi: 'Mình đến phòng gym hai lần một tuần.', en: 'I go to the gym twice a week.' },
      },
      {
        level: 'phrase', text: 'Sounds fun!', pron: ipa('/ˌsaʊndz ˈfʌn/', undefined, 'sowndz FUN'),
        meaning: { vi: 'Nghe vui đấy!', en: 'a friendly reaction to an idea or plan' },
        example: "— Let's go hiking on Sunday. — Sounds fun!", exampleTranslation: { vi: '— Chủ nhật đi leo núi nhé. — Nghe vui đấy!', en: "— Let's go hiking on Sunday. — Sounds fun!" },
      },
      {
        level: 'phrase', text: 'once in a while', pron: ipa('/ˈwʌns ɪn ə ˈwaɪl/', undefined, 'WUNSS in uh WYLE'),
        meaning: { vi: 'thỉnh thoảng', en: 'sometimes, but not often' },
        example: 'I play chess once in a while.', exampleTranslation: { vi: 'Thỉnh thoảng mình chơi cờ vua.', en: 'I play chess once in a while.' },
      },
      {
        level: 'sentence', text: 'I like listening to music.', pron: ipa('/aɪ laɪk ˈlɪsənɪŋ tə ˈmjuːzɪk/'),
        meaning: { vi: 'Mình thích nghe nhạc.', en: 'talking about a hobby' },
        example: 'I like listening to music, especially jazz.', exampleTranslation: { vi: 'Mình thích nghe nhạc, nhất là nhạc jazz.', en: 'I like listening to music, especially jazz.' },
      },
      {
        level: 'sentence', text: 'How often do you play?', pron: ipa('/haʊ ˈɔːfən də juː pleɪ/', '/haʊ ˈɒfən də juː pleɪ/'),
        meaning: { vi: 'Bạn chơi thường xuyên không?', en: 'asking how many times someone does a sport or game' },
        example: 'You play tennis? How often do you play?', exampleTranslation: { vi: 'Bạn chơi quần vợt à? Bạn chơi thường xuyên không?', en: 'You play tennis? How often do you play?' },
      },
      {
        level: 'sentence', text: 'I started about three years ago.', pron: ipa('/aɪ ˈstɑːrtɪd əˈbaʊt θriː jɪrz əˈɡoʊ/', '/aɪ ˈstɑːtɪd əˈbaʊt θriː jɪəz əˈɡəʊ/'),
        meaning: { vi: 'Mình bắt đầu khoảng ba năm trước.', en: 'saying when you began a hobby' },
        example: 'I started about three years ago, at university.', exampleTranslation: { vi: 'Mình bắt đầu khoảng ba năm trước, hồi học đại học.', en: 'I started about three years ago, at university.' },
      },
      {
        level: 'sentence', text: 'Have you ever tried it?', pron: ipa('/həv juː ˈevər traɪd ɪt/', '/həv juː ˈevə traɪd ɪt/'),
        meaning: { vi: 'Bạn đã bao giờ thử chưa?', en: 'asking about someone\'s experience' },
        example: 'Rock climbing is so much fun. Have you ever tried it?', exampleTranslation: { vi: 'Leo núi trong nhà vui lắm. Bạn đã bao giờ thử chưa?', en: 'Rock climbing is so much fun. Have you ever tried it?' },
      },
    ],
  },

  // ---------------------------------------------------------------- work
  {
    id: 'en-work',
    lang: 'en',
    scenario: 'work',
    level: 'elementary',
    intro: {
      scenario: {
        vi: 'Hôm nay là ngày đầu tiên bạn đi làm ở một công ty mới. Một đồng nghiệp tên David đến làm quen.',
        en: "It's your first day at a new company. A coworker named David comes over to say hello.",
        zh: '今天是你在新公司上班的第一天。一位名叫 David 的同事过来和你打招呼。',
      },
      role: {
        vi: 'Bạn là nhân viên mới. Hãy giới thiệu bản thân và nhóm của bạn, kể về ngày đầu tiên, hỏi một câu về nơi làm việc và nhận lời mời ăn trưa.',
        en: 'You are the new employee. Introduce yourself and your team, talk about your first day, ask a question about the workplace and accept a lunch invitation.',
        zh: '你是新员工。请介绍自己和你所在的团队，聊聊第一天的感受，问一个关于公司的问题，并接受午餐邀请。',
      },
    },
    turns: [
      {
        partner: {
          text: "Hi! You must be the new team member. I'm David, from marketing.",
          translation: { vi: 'Chào bạn! Chắc bạn là thành viên mới. Mình là David, ở phòng marketing.', en: "Hi! You must be the new team member. I'm David, from marketing." },
          pron: ipa('/haɪ juː mʌst bi ðə nuː tiːm ˈmembər aɪm ˈdeɪvɪd frəm ˈmɑːrkɪtɪŋ/', '/haɪ juː mʌst bi ðə njuː tiːm ˈmembər aɪm ˈdeɪvɪd frəm ˈmɑːkɪtɪŋ/'),
        },
        replies: [
          { text: "Yes, hi David. I'm Lan. Nice to meet you.", translation: { vi: 'Vâng, chào David. Mình là Lan. Rất vui được gặp bạn.', en: "Yes, hi David. I'm Lan. Nice to meet you." } },
          { text: "That's right. I'm Minh. I started today. Nice to meet you.", translation: { vi: 'Đúng vậy. Mình là Minh. Hôm nay mình bắt đầu đi làm. Rất vui được gặp bạn.', en: "That's right. I'm Minh. I started today. Nice to meet you." } },
        ],
      },
      {
        partner: {
          text: 'Welcome aboard! Which team are you on?',
          translation: { vi: 'Chào mừng bạn gia nhập! Bạn ở nhóm nào?', en: 'Welcome to the company! Which team are you on?' },
          pron: ipa('/ˈwelkəm əˈbɔːrd wɪtʃ tiːm ɑːr juː ɑːn/', '/ˈwelkəm əˈbɔːd wɪtʃ tiːm ɑː juː ɒn/'),
        },
        replies: [
          { text: "I'm on the sales team.", translation: { vi: 'Mình ở nhóm kinh doanh.', en: "I'm on the sales team." } },
          { text: "I'm joining the IT team as a software tester.", translation: { vi: 'Mình vào nhóm IT, làm kiểm thử phần mềm.', en: "I'm joining the IT team as a software tester." } },
        ],
      },
      {
        partner: {
          text: "Great. So how's your first day going?",
          translation: { vi: 'Hay quá. Thế ngày đầu tiên của bạn thế nào?', en: "Great. So how's your first day going?" },
          pron: ipa('/ɡreɪt soʊ haʊz jʊr fɜːrst deɪ ˈɡoʊɪŋ/', '/ɡreɪt səʊ haʊz jɔː fɜːst deɪ ˈɡəʊɪŋ/'),
        },
        replies: [
          { text: "It's going well, thanks.", translation: { vi: 'Mọi thứ ổn, cảm ơn bạn.', en: "It's going well, thanks." } },
          { text: "Pretty good! Everyone is friendly, but there's a lot to learn.", translation: { vi: 'Khá tốt! Mọi người đều thân thiện, nhưng có nhiều thứ phải học.', en: "Pretty good! Everyone is friendly, but there's a lot to learn." } },
        ],
      },
      {
        partner: {
          text: 'It takes time to get used to everything. Any questions so far?',
          translation: { vi: 'Phải mất một thời gian mới quen với mọi thứ. Đến giờ bạn có câu hỏi gì không?', en: 'It takes time to get used to everything. Any questions so far?' },
          pron: ipa('/ɪt teɪks taɪm tə ɡet juːst tu ˈevriθɪŋ ˈeni ˈkwestʃənz soʊ fɑːr/', '/ɪt teɪks taɪm tə ɡet juːst tu ˈevriθɪŋ ˈeni ˈkwestʃənz səʊ fɑː/'),
        },
        replies: [
          { text: 'Yes. Where do people usually have lunch?', translation: { vi: 'Có. Mọi người thường ăn trưa ở đâu?', en: 'Yes. Where do people usually have lunch?' } },
          { text: 'Just one. What time does everyone have lunch here?', translation: { vi: 'Chỉ một câu thôi. Ở đây mọi người ăn trưa lúc mấy giờ?', en: 'Just one. What time does everyone have lunch here?' } },
        ],
      },
      {
        partner: {
          text: 'Most of us eat at twelve, in the cafeteria downstairs. Would you like to join us today?',
          translation: { vi: 'Phần lớn bọn mình ăn lúc mười hai giờ, ở căng-tin tầng dưới. Hôm nay bạn ăn cùng bọn mình nhé?', en: 'Most of us eat at twelve, in the cafeteria downstairs. Would you like to join us today?' },
          pron: ipa('/moʊst əv ʌs iːt ət twelv ɪn ðə ˌkæfəˈtɪriə ˌdaʊnˈsterz wʊd juː laɪk tə dʒɔɪn ʌs təˈdeɪ/', '/məʊst əv ʌs iːt ət twelv ɪn ðə ˌkæfəˈtɪəriə ˌdaʊnˈsteəz wʊd juː laɪk tə dʒɔɪn ʌs təˈdeɪ/'),
        },
        replies: [
          { text: "Yes, I'd love to. Thanks!", translation: { vi: 'Có chứ, mình rất muốn. Cảm ơn bạn!', en: "Yes, I'd love to. Thanks!" } },
          { text: 'That would be great. Thank you for asking.', translation: { vi: 'Vậy thì tuyệt quá. Cảm ơn bạn đã rủ.', en: 'That would be great. Thank you for asking.' } },
        ],
      },
      {
        partner: {
          text: "Great. Oh, and there's a team meeting at three this afternoon. Did anyone tell you?",
          translation: { vi: 'Tốt quá. À, chiều nay có cuộc họp nhóm lúc ba giờ. Đã có ai báo bạn chưa?', en: "Great. Oh, and there's a team meeting at three this afternoon. Did anyone tell you?" },
          pron: ipa('/ɡreɪt oʊ ənd ðerz ə tiːm ˈmiːtɪŋ ət θriː ðɪs ˌæftərˈnuːn dɪd ˈeniwʌn tel juː/', '/ɡreɪt əʊ ənd ðeəz ə tiːm ˈmiːtɪŋ ət θriː ðɪs ˌɑːftəˈnuːn dɪd ˈeniwʌn tel juː/'),
        },
        replies: [
          { text: 'No, not yet. Thanks for letting me know.', translation: { vi: 'Chưa, chưa ai báo. Cảm ơn bạn đã cho mình biết.', en: 'No, not yet. Thanks for letting me know.' } },
          { text: 'Yes, my manager told me this morning. Thanks anyway.', translation: { vi: 'Rồi, sáng nay quản lý đã báo mình. Dù sao cũng cảm ơn bạn.', en: 'Yes, my manager told me this morning. Thanks anyway.' } },
        ],
      },
      {
        partner: {
          text: "OK, good. I'll come and get you at twelve. See you later!",
          translation: { vi: 'Ừ, tốt. Mười hai giờ mình sẽ qua gọi bạn. Gặp lại sau nhé!', en: "OK, good. I'll come and get you at twelve. See you later!" },
          pron: ipa('/oʊˈkeɪ ɡʊd aɪl kʌm ən ɡet juː ət twelv siː juː ˈleɪtər/', '/əʊˈkeɪ ɡʊd aɪl kʌm ən ɡet juː ət twelv siː juː ˈleɪtə/'),
        },
        replies: [
          { text: 'See you later!', translation: { vi: 'Gặp lại sau nhé!', en: 'See you later!' } },
          { text: 'Thanks, David. See you at lunch!', translation: { vi: 'Cảm ơn David. Gặp bạn lúc ăn trưa nhé!', en: 'Thanks, David. See you at lunch!' } },
        ],
      },
    ],
    suggestions: [
      {
        level: 'word', text: 'colleague', pron: ipa('/ˈkɑːliːɡ/', '/ˈkɒliːɡ/', 'KAH-leeg'),
        meaning: { vi: 'đồng nghiệp', en: 'a person you work with' },
        example: 'My colleagues are very helpful.', exampleTranslation: { vi: 'Các đồng nghiệp của mình rất nhiệt tình.', en: 'My colleagues are very helpful.' },
      },
      {
        level: 'word', text: 'meeting', pron: ipa('/ˈmiːtɪŋ/', undefined, 'MEE-ting'),
        meaning: { vi: 'cuộc họp', en: 'a time when people come together to talk about work' },
        example: 'We have a meeting at nine.', exampleTranslation: { vi: 'Chúng ta có cuộc họp lúc chín giờ.', en: 'We have a meeting at nine.' },
      },
      {
        level: 'word', text: 'department', pron: ipa('/dɪˈpɑːrtmənt/', '/dɪˈpɑːtmənt/', 'dih-PART-ment'),
        meaning: { vi: 'phòng, ban (trong công ty)', en: 'one part of a company, e.g. sales or marketing' },
        example: 'I work in the finance department.', exampleTranslation: { vi: 'Mình làm ở phòng tài chính.', en: 'I work in the finance department.' },
      },
      {
        level: 'word', text: 'manager', pron: ipa('/ˈmænɪdʒər/', '/ˈmænɪdʒə/', 'MAN-ih-jer'),
        meaning: { vi: 'quản lý, trưởng phòng', en: 'the person in charge of a team' },
        example: 'My manager is very kind.', exampleTranslation: { vi: 'Quản lý của mình rất tốt bụng.', en: 'My manager is very kind.' },
      },
      {
        level: 'word', text: 'deadline', pron: ipa('/ˈdedlaɪn/', undefined, 'DED-line'),
        meaning: { vi: 'hạn chót', en: 'the time when a piece of work must be finished' },
        example: 'The deadline is Friday.', exampleTranslation: { vi: 'Hạn chót là thứ Sáu.', en: 'The deadline is Friday.' },
      },
      {
        level: 'word', text: 'schedule', pron: ipa('/ˈskedʒuːl/', '/ˈʃedjuːl/', 'SKEJ-ool', {
          vi: 'Giọng Mỹ: /ˈskedʒuːl/ ("SKEJ-ool"); giọng Anh thường đọc /ˈʃedjuːl/ ("SHED-yool").',
          en: 'US: /ˈskedʒuːl/ ("SKEJ-ool"); UK usually /ˈʃedjuːl/ ("SHED-yool").',
        }),
        meaning: { vi: 'lịch làm việc, thời gian biểu', en: 'a plan of when things will happen' },
        example: "What's your schedule this week?", exampleTranslation: { vi: 'Lịch làm việc tuần này của bạn thế nào?', en: "What's your schedule this week?" },
      },
      {
        level: 'phrase', text: 'get used to', pron: ipa('/ɡet ˈjuːst tə/', undefined, 'get YOOST tuh', {
          vi: '"used" ở đây đọc /juːst/ (âm s), không phải /juːzd/.',
          en: '"used" here is pronounced /juːst/ with an "s" sound, not /juːzd/.',
        }),
        meaning: { vi: 'quen với', en: 'to become familiar with something new' },
        example: "I'm getting used to my new job.", exampleTranslation: { vi: 'Mình đang dần quen với công việc mới.', en: "I'm getting used to my new job." },
      },
      {
        level: 'phrase', text: 'Welcome aboard!', pron: ipa('/ˈwelkəm əˈbɔːrd/', '/ˈwelkəm əˈbɔːd/', 'WEL-kum uh-BORD'),
        meaning: { vi: 'Chào mừng gia nhập!', en: 'a friendly welcome to a new team member' },
        example: "You're the new designer? Welcome aboard!", exampleTranslation: { vi: 'Bạn là nhà thiết kế mới à? Chào mừng bạn gia nhập!', en: "You're the new designer? Welcome aboard!" },
      },
      {
        level: 'phrase', text: 'so far', pron: ipa('/soʊ ˈfɑːr/', '/səʊ ˈfɑː/', 'soh FAR'),
        meaning: { vi: 'cho đến giờ', en: 'until now' },
        example: 'So far, everything is going well.', exampleTranslation: { vi: 'Cho đến giờ, mọi thứ đều ổn.', en: 'So far, everything is going well.' },
      },
      {
        level: 'phrase', text: 'lunch break', pron: ipa('/ˈlʌntʃ breɪk/', undefined, 'LUNCH brayk'),
        meaning: { vi: 'giờ nghỉ trưa', en: 'the time in the middle of the day when you stop work to eat' },
        example: 'Our lunch break is one hour.', exampleTranslation: { vi: 'Giờ nghỉ trưa của chúng mình là một tiếng.', en: 'Our lunch break is one hour.' },
      },
      {
        level: 'phrase', text: 'work on a project', pron: ipa('/ˈwɜːrk ɑːn ə ˈprɑːdʒekt/', '/ˈwɜːk ɒn ə ˈprɒdʒekt/', 'WURK on uh PRAH-jekt'),
        meaning: { vi: 'làm một dự án', en: 'to do the tasks of a planned piece of work' },
        example: "I'm working on a new project this month.", exampleTranslation: { vi: 'Tháng này mình đang làm một dự án mới.', en: "I'm working on a new project this month." },
      },
      {
        level: 'sentence', text: 'Thanks for letting me know.', pron: ipa('/θæŋks fər ˈletɪŋ mi noʊ/', '/θæŋks fə ˈletɪŋ mi nəʊ/'),
        meaning: { vi: 'Cảm ơn bạn đã cho mình biết.', en: 'thanking someone for information' },
        example: 'The meeting is at three? Thanks for letting me know.', exampleTranslation: { vi: 'Cuộc họp lúc ba giờ à? Cảm ơn bạn đã cho mình biết.', en: 'The meeting is at three? Thanks for letting me know.' },
      },
      {
        level: 'sentence', text: 'Could you help me with this?', pron: ipa('/kʊd juː ˈhelp mi wɪð ðɪs/'),
        meaning: { vi: 'Bạn giúp mình việc này được không?', en: 'politely asking a coworker for help' },
        example: "Sorry, I don't understand this report. Could you help me with this?", exampleTranslation: { vi: 'Xin lỗi, mình không hiểu báo cáo này. Bạn giúp mình được không?', en: "Sorry, I don't understand this report. Could you help me with this?" },
      },
      {
        level: 'sentence', text: 'When is the deadline?', pron: ipa('/wen ɪz ðə ˈdedlaɪn/'),
        meaning: { vi: 'Hạn chót là khi nào?', en: 'asking when work must be finished' },
        example: 'OK, I can do it. When is the deadline?', exampleTranslation: { vi: 'Được, mình làm được. Hạn chót là khi nào?', en: 'OK, I can do it. When is the deadline?' },
      },
      {
        level: 'sentence', text: "I'll send you an email.", pron: ipa('/aɪl ˈsend juː ən ˈiːmeɪl/'),
        meaning: { vi: 'Mình sẽ gửi email cho bạn.', en: 'promising to send information by email' },
        example: "I'll send you an email with the details.", exampleTranslation: { vi: 'Mình sẽ gửi email cho bạn kèm thông tin chi tiết.', en: "I'll send you an email with the details." },
      },
    ],
  },

  // ---------------------------------------------------------------- interview
  {
    id: 'en-interview',
    lang: 'en',
    scenario: 'interview',
    level: 'elementary',
    intro: {
      scenario: {
        vi: 'Bạn đi phỏng vấn cho vị trí trợ lý văn phòng ở một công ty quốc tế. Người phỏng vấn mời bạn vào phòng.',
        en: 'You have a job interview for an office assistant position at an international company. The interviewer invites you into the room.',
        zh: '你去一家国际公司面试办公室助理职位。面试官请你进入房间。',
      },
      role: {
        vi: 'Bạn là ứng viên. Hãy giới thiệu bản thân, nói lý do bạn muốn làm ở công ty, điểm mạnh, điểm yếu và kết thúc buổi phỏng vấn một cách lịch sự.',
        en: 'You are the candidate. Introduce yourself, explain why you want to work there, talk about your strengths and a weakness, and end the interview politely.',
        zh: '你是应聘者。请介绍自己，说明为什么想在这家公司工作，谈谈你的优点和一个缺点，并礼貌地结束面试。',
      },
    },
    turns: [
      {
        partner: {
          text: 'Good morning. Please, have a seat.',
          translation: { vi: 'Chào buổi sáng. Mời bạn ngồi.', en: 'Good morning. Please, have a seat.' },
          pron: ipa('/ɡʊd ˈmɔːrnɪŋ pliːz hæv ə siːt/', '/ɡʊd ˈmɔːnɪŋ pliːz hæv ə siːt/'),
        },
        replies: [
          { text: 'Good morning. Thank you.', translation: { vi: 'Chào buổi sáng. Cảm ơn ông/bà.', en: 'Good morning. Thank you.' } },
          { text: 'Good morning. Thank you for having me.', translation: { vi: 'Chào buổi sáng. Cảm ơn ông/bà đã mời tôi đến phỏng vấn.', en: 'Good morning. Thank you for having me.' } },
        ],
      },
      {
        partner: {
          text: 'So, could you tell me a little about yourself?',
          translation: { vi: 'Vậy bạn có thể giới thiệu một chút về bản thân không?', en: 'So, could you tell me a little about yourself?' },
          pron: ipa('/soʊ kʊd juː tel mi ə ˈlɪtəl əˈbaʊt jʊrˈself/', '/səʊ kʊd juː tel mi ə ˈlɪtəl əˈbaʊt jɔːˈself/'),
        },
        replies: [
          { text: 'Sure. My name is Lan. I graduated from university last year. I studied business.', translation: { vi: 'Vâng. Tôi tên là Lan. Tôi tốt nghiệp đại học năm ngoái, chuyên ngành kinh doanh.', en: 'Sure. My name is Lan. I graduated from university last year. I studied business.' } },
          { text: "Of course. I'm Minh. I have two years of experience in customer service.", translation: { vi: 'Vâng ạ. Tôi là Minh. Tôi có hai năm kinh nghiệm làm chăm sóc khách hàng.', en: "Of course. I'm Minh. I have two years of experience in customer service." } },
        ],
      },
      {
        partner: {
          text: 'Why do you want to work for our company?',
          translation: { vi: 'Tại sao bạn muốn làm việc cho công ty chúng tôi?', en: 'Why do you want to work for our company?' },
          pron: ipa('/waɪ də juː wɑːnt tə wɜːrk fər ˈaʊər ˈkʌmpəni/', '/waɪ də juː wɒnt tə wɜːk fər ˈaʊə ˈkʌmpəni/'),
        },
        replies: [
          { text: 'I like your products, and I want to learn and grow here.', translation: { vi: 'Tôi thích sản phẩm của công ty, và tôi muốn học hỏi, phát triển ở đây.', en: 'I like your products, and I want to learn and grow here.' } },
          { text: 'Your company has a great reputation, and this job matches my skills.', translation: { vi: 'Công ty có danh tiếng rất tốt, và công việc này phù hợp với kỹ năng của tôi.', en: 'Your company has a great reputation, and this job matches my skills.' } },
        ],
      },
      {
        partner: {
          text: 'What are your strengths?',
          translation: { vi: 'Điểm mạnh của bạn là gì?', en: 'What are your strengths?' },
          pron: ipa('/wʌt ɑːr jʊr streŋθs/', '/wɒt ɑː jɔː streŋθs/'),
        },
        replies: [
          { text: "I'm hard-working and friendly.", translation: { vi: 'Tôi chăm chỉ và thân thiện.', en: "I'm hard-working and friendly." } },
          { text: "I'm a good team player, and I learn new things quickly.", translation: { vi: 'Tôi làm việc nhóm tốt và học điều mới rất nhanh.', en: "I'm a good team player, and I learn new things quickly." } },
        ],
      },
      {
        partner: {
          text: 'And what is one of your weaknesses?',
          translation: { vi: 'Còn một điểm yếu của bạn là gì?', en: 'And what is one of your weaknesses?' },
          pron: ipa('/ənd wʌt ɪz wʌn əv jʊr ˈwiːknəsɪz/', '/ənd wɒt ɪz wʌn əv jɔː ˈwiːknəsɪz/'),
        },
        replies: [
          { text: "My English isn't perfect yet, so I take classes every week.", translation: { vi: 'Tiếng Anh của tôi chưa hoàn hảo, nên tuần nào tôi cũng đi học thêm.', en: "My English isn't perfect yet, so I take classes every week." } },
          { text: "Sometimes I get nervous when I speak in front of a group, but I'm working on it.", translation: { vi: 'Đôi khi tôi bị căng thẳng khi nói trước đám đông, nhưng tôi đang cố gắng cải thiện.', en: "Sometimes I get nervous when I speak in front of a group, but I'm working on it." } },
        ],
      },
      {
        partner: {
          text: "That's good to hear. Do you have any questions for us?",
          translation: { vi: 'Nghe vậy tốt quá. Bạn có câu hỏi nào cho chúng tôi không?', en: "That's good to hear. Do you have any questions for us?" },
          pron: ipa('/ðæts ɡʊd tə hɪr duː juː hæv ˈeni ˈkwestʃənz fər ʌs/', '/ðæts ɡʊd tə hɪə duː juː hæv ˈeni ˈkwestʃənz fər ʌs/'),
        },
        replies: [
          { text: "No, I think you've answered everything. Thank you.", translation: { vi: 'Không ạ, tôi nghĩ ông/bà đã giải đáp hết rồi. Cảm ơn ông/bà.', en: "No, I think you've answered everything. Thank you." } },
          { text: 'Yes. When can I expect to hear from you?', translation: { vi: 'Có ạ. Khi nào tôi có thể nhận được phản hồi từ công ty?', en: 'Yes. When can I expect to hear from you?' } },
        ],
      },
      {
        partner: {
          text: "We'll contact everyone by email within a week. Thank you for your time today.",
          translation: { vi: 'Chúng tôi sẽ liên hệ với tất cả ứng viên qua email trong vòng một tuần. Cảm ơn bạn hôm nay đã dành thời gian.', en: "We'll contact everyone by email within a week. Thank you for your time today." },
          pron: ipa('/wiːl ˈkɑːntækt ˈevriwʌn baɪ ˈiːmeɪl wɪˈðɪn ə wiːk θæŋk juː fər jʊr taɪm təˈdeɪ/', '/wiːl ˈkɒntækt ˈevriwʌn baɪ ˈiːmeɪl wɪˈðɪn ə wiːk θæŋk juː fə jɔː taɪm təˈdeɪ/'),
        },
        replies: [
          { text: 'Thank you very much. Have a nice day.', translation: { vi: 'Cảm ơn ông/bà rất nhiều. Chúc ông/bà một ngày tốt lành.', en: 'Thank you very much. Have a nice day.' } },
          { text: 'Thank you for your time. I look forward to hearing from you.', translation: { vi: 'Cảm ơn ông/bà đã dành thời gian. Tôi rất mong nhận được phản hồi.', en: 'Thank you for your time. I look forward to hearing from you.' } },
        ],
      },
    ],
    suggestions: [
      {
        level: 'word', text: 'experience', pron: ipa('/ɪkˈspɪriəns/', '/ɪkˈspɪəriəns/', 'ik-SPEER-ee-unss'),
        meaning: { vi: 'kinh nghiệm', en: 'knowledge and skill you get from doing a job' },
        example: 'I have three years of experience in sales.', exampleTranslation: { vi: 'Tôi có ba năm kinh nghiệm bán hàng.', en: 'I have three years of experience in sales.' },
      },
      {
        level: 'word', text: 'strength', pron: ipa('/streŋθ/', undefined, 'STRENGTH'),
        meaning: { vi: 'điểm mạnh', en: 'something you are good at' },
        example: 'My biggest strength is good communication.', exampleTranslation: { vi: 'Điểm mạnh lớn nhất của tôi là giao tiếp tốt.', en: 'My biggest strength is good communication.' },
      },
      {
        level: 'word', text: 'weakness', pron: ipa('/ˈwiːknəs/', undefined, 'WEEK-ness'),
        meaning: { vi: 'điểm yếu', en: 'something you are not good at' },
        example: 'One weakness is that I talk too fast.', exampleTranslation: { vi: 'Một điểm yếu là tôi nói quá nhanh.', en: 'One weakness is that I talk too fast.' },
      },
      {
        level: 'word', text: 'skill', pron: ipa('/skɪl/', undefined, 'SKILL'),
        meaning: { vi: 'kỹ năng', en: 'an ability to do something well' },
        example: 'I have good computer skills.', exampleTranslation: { vi: 'Tôi có kỹ năng máy tính tốt.', en: 'I have good computer skills.' },
      },
      {
        level: 'word', text: 'position', pron: ipa('/pəˈzɪʃən/', undefined, 'puh-ZISH-un'),
        meaning: { vi: 'vị trí (công việc)', en: 'a job in a company' },
        example: "I'm applying for the assistant position.", exampleTranslation: { vi: 'Tôi ứng tuyển vị trí trợ lý.', en: "I'm applying for the assistant position." },
      },
      {
        level: 'word', text: 'responsible', pron: ipa('/rɪˈspɑːnsəbəl/', '/rɪˈspɒnsəbəl/', 'rih-SPAHN-suh-bul'),
        meaning: { vi: 'có trách nhiệm', en: 'doing your work carefully so people can trust you' },
        example: "I'm responsible and always on time.", exampleTranslation: { vi: 'Tôi có trách nhiệm và luôn đúng giờ.', en: "I'm responsible and always on time." },
      },
      {
        level: 'phrase', text: 'a team player', pron: ipa('/ə ˈtiːm ˌpleɪər/', '/ə ˈtiːm ˌpleɪə/', 'uh TEEM play-er'),
        meaning: { vi: 'người làm việc nhóm tốt', en: 'a person who works well with others' },
        example: "I'm a team player. I like helping my colleagues.", exampleTranslation: { vi: 'Tôi là người làm việc nhóm tốt. Tôi thích giúp đỡ đồng nghiệp.', en: "I'm a team player. I like helping my colleagues." },
      },
      {
        level: 'phrase', text: 'hard-working', pron: ipa('/ˌhɑːrdˈwɜːrkɪŋ/', '/ˌhɑːdˈwɜːkɪŋ/', 'hard-WUR-king'),
        meaning: { vi: 'chăm chỉ', en: 'putting a lot of effort into your work' },
        example: "I'm hard-working and I learn quickly.", exampleTranslation: { vi: 'Tôi chăm chỉ và học nhanh.', en: "I'm hard-working and I learn quickly." },
      },
      {
        level: 'phrase', text: 'customer service', pron: ipa('/ˌkʌstəmər ˈsɜːrvɪs/', '/ˌkʌstəmə ˈsɜːvɪs/', 'KUS-tuh-mer SUR-vis'),
        meaning: { vi: 'dịch vụ / chăm sóc khách hàng', en: 'helping customers with questions and problems' },
        example: 'I worked in customer service for two years.', exampleTranslation: { vi: 'Tôi đã làm chăm sóc khách hàng hai năm.', en: 'I worked in customer service for two years.' },
      },
      {
        level: 'phrase', text: 'work under pressure', pron: ipa('/ˈwɜːrk ˌʌndər ˈpreʃər/', '/ˈwɜːk ˌʌndə ˈpreʃə/', 'WURK un-der PRESH-er'),
        meaning: { vi: 'làm việc dưới áp lực', en: 'to work well when there is a lot to do or little time' },
        example: 'I can work under pressure and meet deadlines.', exampleTranslation: { vi: 'Tôi có thể làm việc dưới áp lực và hoàn thành đúng hạn.', en: 'I can work under pressure and meet deadlines.' },
      },
      {
        level: 'phrase', text: 'look forward to', pron: ipa('/lʊk ˈfɔːrwərd tə/', '/lʊk ˈfɔːwəd tə/', 'look FOR-werd tuh', {
          vi: 'Sau "look forward to" dùng danh từ hoặc V-ing: look forward to hearing.',
          en: 'After "look forward to" use a noun or -ing form: look forward to hearing.',
        }),
        meaning: { vi: 'mong chờ, mong đợi', en: 'to feel happy about something that will happen' },
        example: 'I look forward to working with you.', exampleTranslation: { vi: 'Tôi rất mong được làm việc cùng ông/bà.', en: 'I look forward to working with you.' },
      },
      {
        level: 'sentence', text: 'Thank you for having me.', pron: ipa('/ˈθæŋk juː fər ˈhævɪŋ mi/', '/ˈθæŋk juː fə ˈhævɪŋ mi/'),
        meaning: { vi: 'Cảm ơn đã mời tôi đến.', en: 'thanking someone for inviting you' },
        example: 'Good morning, and thank you for having me.', exampleTranslation: { vi: 'Chào buổi sáng, và cảm ơn ông/bà đã mời tôi đến.', en: 'Good morning, and thank you for having me.' },
      },
      {
        level: 'sentence', text: 'I have two years of experience in sales.', pron: ipa('/aɪ hæv tuː jɪrz əv ɪkˈspɪriəns ɪn seɪlz/', '/aɪ hæv tuː jɪəz əv ɪkˈspɪəriəns ɪn seɪlz/'),
        meaning: { vi: 'Tôi có hai năm kinh nghiệm bán hàng.', en: 'describing your work experience' },
        example: 'I have two years of experience in sales, mostly with foreign customers.', exampleTranslation: { vi: 'Tôi có hai năm kinh nghiệm bán hàng, chủ yếu với khách nước ngoài.', en: 'I have two years of experience in sales, mostly with foreign customers.' },
      },
      {
        level: 'sentence', text: 'I graduated from university last year.', pron: ipa('/aɪ ˈɡrædʒueɪtɪd frəm ˌjuːnɪˈvɜːrsəti læst jɪr/', '/aɪ ˈɡrædʒueɪtɪd frəm ˌjuːnɪˈvɜːsəti lɑːst jɪə/'),
        meaning: { vi: 'Tôi tốt nghiệp đại học năm ngoái.', en: 'talking about your education' },
        example: 'I graduated from university last year with a degree in economics.', exampleTranslation: { vi: 'Tôi tốt nghiệp đại học năm ngoái, ngành kinh tế.', en: 'I graduated from university last year with a degree in economics.' },
      },
      {
        level: 'sentence', text: 'I look forward to hearing from you.', pron: ipa('/aɪ lʊk ˈfɔːrwərd tə ˈhɪrɪŋ frəm juː/', '/aɪ lʊk ˈfɔːwəd tə ˈhɪərɪŋ frəm juː/'),
        meaning: { vi: 'Tôi rất mong nhận được phản hồi từ ông/bà.', en: 'a polite way to end an interview or email' },
        example: 'Thank you for your time. I look forward to hearing from you.', exampleTranslation: { vi: 'Cảm ơn ông/bà đã dành thời gian. Tôi rất mong nhận được phản hồi.', en: 'Thank you for your time. I look forward to hearing from you.' },
      },
    ],
  },
];
