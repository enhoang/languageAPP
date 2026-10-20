import type { Gloss } from '../../types';
import type { DemoScript, Pron } from '../types';

/**
 * Chinese (zh) prewritten scenario dialogues for demo mode.
 * Pinyin is written with underlying tones (no tone-sandhi spelling: 不 = bù, 一 = yī, 你好 = nǐ hǎo);
 * where sandhi matters for a suggestion, `note` explains how it is actually read.
 */

const p = (pinyin: string, note?: Gloss): Pron => (note ? { pinyin, note, source: 'script' } : { pinyin, source: 'script' });

// ---- recurring tone-sandhi notes ----
const YI4: Gloss = {
  vi: '一 viết yī nhưng đọc thành yí trước thanh 4 (hoặc trước thanh nhẹ vốn là thanh 4, như 个).',
  en: '一 is written yī but read yí before a 4th tone (or a neutral syllable that was originally 4th tone, like 个).',
};
const YI_OTHER: Gloss = {
  vi: '一 viết yī nhưng đọc thành yì trước thanh 1, 2, 3.',
  en: '一 is written yī but read yì before a 1st, 2nd or 3rd tone.',
};
const BU4: Gloss = {
  vi: '不 viết bù nhưng đọc thành bú trước thanh 4.',
  en: '不 is written bù but read bú before a 4th tone.',
};
const T3: (vi: string, en: string) => Gloss = (vi, en) => ({
  vi: `Hai thanh 3 liền nhau: âm tiết đầu đọc thành thanh 2 (${vi}).`,
  en: `Two 3rd tones in a row: the first is read as a 2nd tone (${en}).`,
});

export const DEMO_ZH: DemoScript[] = [
  // ======================= greetings =======================
  {
    id: 'zh-greetings',
    lang: 'zh',
    scenario: 'greetings',
    level: 'beginner',
    intro: {
      scenario: {
        vi: 'Bạn đến một buổi giao lưu ngôn ngữ và gặp Lý Minh, một bạn người Trung Quốc lần đầu gặp mặt.',
        en: 'You are at a language exchange meetup and meet Li Ming, a Chinese person you have never met before.',
        zh: '你参加一个语言交流活动，第一次见到中国朋友李明。',
      },
      role: {
        vi: 'Bạn là người mới đến. Hãy chào hỏi, giới thiệu tên, quốc tịch và lý do bạn học tiếng Trung.',
        en: 'You are a newcomer. Greet him, introduce your name and nationality, and say why you learn Chinese.',
        zh: '你是新来的。请打招呼，介绍你的名字、国籍和学汉语的原因。',
      },
    },
    turns: [
      {
        partner: {
          text: '你好！我叫李明。你叫什么名字？',
          translation: { vi: 'Xin chào! Mình tên là Lý Minh. Bạn tên là gì?', en: 'Hi! My name is Li Ming. What is your name?' },
          pron: p('Nǐ hǎo! Wǒ jiào Lǐ Míng. Nǐ jiào shénme míngzi?'),
        },
        replies: [
          { text: '你好！我叫阮安。', translation: { vi: 'Xin chào! Mình tên là An.', en: 'Hi! My name is An.' } },
          { text: '你好，李明！我叫阮安，很高兴认识你。', translation: { vi: 'Chào Lý Minh! Mình tên là An, rất vui được làm quen với bạn.', en: 'Hi, Li Ming! My name is An. Nice to meet you.' } },
        ],
      },
      {
        partner: {
          text: '很高兴认识你！你是哪国人？',
          translation: { vi: 'Rất vui được làm quen với bạn! Bạn là người nước nào?', en: 'Nice to meet you! Where are you from?' },
          pron: p('Hěn gāoxìng rènshi nǐ! Nǐ shì nǎ guó rén?'),
        },
        replies: [
          { text: '我是越南人。', translation: { vi: 'Mình là người Việt Nam.', en: 'I am Vietnamese.' } },
          { text: '我是越南人，我从河内来。', translation: { vi: 'Mình là người Việt Nam, mình đến từ Hà Nội.', en: 'I am Vietnamese. I come from Hanoi.' } },
        ],
      },
      {
        partner: {
          text: '你的汉语很好！你学汉语多长时间了？',
          translation: { vi: 'Tiếng Trung của bạn tốt quá! Bạn học tiếng Trung bao lâu rồi?', en: 'Your Chinese is very good! How long have you been learning Chinese?' },
          pron: p('Nǐ de Hànyǔ hěn hǎo! Nǐ xué Hànyǔ duō cháng shíjiān le?'),
        },
        replies: [
          { text: '谢谢！我学了三个月。', translation: { vi: 'Cảm ơn! Mình học được ba tháng rồi.', en: 'Thanks! I have been learning for three months.' } },
          { text: '哪里哪里，我才学了半年。', translation: { vi: 'Đâu có đâu, mình mới học được nửa năm thôi.', en: 'Oh, not at all. I have only been learning for half a year.' } },
        ],
      },
      {
        partner: {
          text: '你为什么学汉语？',
          translation: { vi: 'Sao bạn lại học tiếng Trung?', en: 'Why are you learning Chinese?' },
          pron: p('Nǐ wèishénme xué Hànyǔ?'),
        },
        replies: [
          { text: '因为我喜欢中国文化。', translation: { vi: 'Vì mình thích văn hóa Trung Quốc.', en: 'Because I like Chinese culture.' } },
          { text: '因为工作需要，以后我想去中国工作。', translation: { vi: 'Vì công việc cần, sau này mình muốn sang Trung Quốc làm việc.', en: 'Because I need it for work. I want to work in China in the future.' } },
        ],
      },
      {
        partner: {
          text: '真不错！你现在是学生吗？',
          translation: { vi: 'Hay quá! Bây giờ bạn là sinh viên à?', en: 'That is great! Are you a student now?' },
          pron: p('Zhēn bùcuò! Nǐ xiànzài shì xuésheng ma?'),
        },
        replies: [
          { text: '是，我是大学生。', translation: { vi: 'Đúng, mình là sinh viên đại học.', en: 'Yes, I am a university student.' } },
          { text: '不是，我在一家公司工作。', translation: { vi: 'Không, mình làm việc ở một công ty.', en: 'No, I work at a company.' } },
        ],
      },
      {
        partner: {
          text: '这是我的微信，我们加个好友吧！',
          translation: { vi: 'Đây là WeChat của mình, mình kết bạn nhé!', en: 'Here is my WeChat. Let us add each other as friends!' },
          pron: p('Zhè shì wǒ de Wēixìn, wǒmen jiā ge hǎoyǒu ba!'),
        },
        replies: [
          { text: '好啊！我扫你吧。', translation: { vi: 'Được thôi! Để mình quét mã của bạn nhé.', en: 'Sure! Let me scan your code.' } },
          { text: '好的，以后我们可以一起练习汉语。', translation: { vi: 'Được, sau này chúng mình có thể cùng luyện tiếng Trung.', en: 'OK, then we can practice Chinese together from now on.' } },
        ],
      },
      {
        partner: {
          text: '我得走了，下次见！',
          translation: { vi: 'Mình phải đi rồi, hẹn gặp lại lần sau nhé!', en: 'I have to go now. See you next time!' },
          pron: p('Wǒ děi zǒu le, xià cì jiàn!'),
        },
        replies: [
          { text: '再见！', translation: { vi: 'Tạm biệt!', en: 'Goodbye!' } },
          { text: '好的，下次见！', translation: { vi: 'Ừ, hẹn gặp lại lần sau!', en: 'OK, see you next time!' } },
          { text: '再见，路上小心！', translation: { vi: 'Tạm biệt, đi đường cẩn thận nhé!', en: 'Bye, take care on the way!' } },
        ],
      },
    ],
    suggestions: [
      { level: 'word', text: '你好', pron: p('nǐ hǎo', T3('ní hǎo', 'ní hǎo')), meaning: { vi: 'xin chào', en: 'hello' }, example: '你好！我叫阮安。', exampleTranslation: { vi: 'Xin chào! Mình tên là An.', en: 'Hello! My name is An.' } },
      { level: 'word', text: '名字', pron: p('míngzi'), meaning: { vi: 'tên', en: 'name' }, example: '你叫什么名字？', exampleTranslation: { vi: 'Bạn tên là gì?', en: 'What is your name?' } },
      { level: 'word', text: '认识', pron: p('rènshi'), meaning: { vi: 'quen biết, làm quen', en: 'to know (someone); to get to know' }, example: '很高兴认识你。', exampleTranslation: { vi: 'Rất vui được làm quen với bạn.', en: 'Nice to meet you.' } },
      { level: 'word', text: '高兴', pron: p('gāoxìng'), meaning: { vi: 'vui', en: 'happy, glad' }, example: '我今天很高兴。', exampleTranslation: { vi: 'Hôm nay mình rất vui.', en: 'I am very happy today.' } },
      { level: 'word', text: '朋友', pron: p('péngyou'), meaning: { vi: 'bạn bè', en: 'friend' }, example: '他是我的中国朋友。', exampleTranslation: { vi: 'Anh ấy là bạn người Trung Quốc của mình.', en: 'He is my Chinese friend.' } },
      { level: 'word', text: '介绍', pron: p('jièshào'), meaning: { vi: 'giới thiệu', en: 'to introduce' }, example: '我来介绍一下，这是我的朋友。', exampleTranslation: { vi: 'Để mình giới thiệu, đây là bạn của mình.', en: 'Let me introduce: this is my friend.' } },
      { level: 'phrase', text: '很高兴认识你', pron: p('hěn gāoxìng rènshi nǐ'), meaning: { vi: 'rất vui được làm quen với bạn', en: 'nice to meet you' }, example: '你好，我叫阮安，很高兴认识你！', exampleTranslation: { vi: 'Chào bạn, mình tên là An, rất vui được làm quen!', en: 'Hi, I am An. Nice to meet you!' } },
      { level: 'phrase', text: '我叫……', pron: p('wǒ jiào …'), meaning: { vi: 'tôi tên là…', en: 'my name is…' }, example: '我叫阮安。', exampleTranslation: { vi: 'Mình tên là An.', en: 'My name is An.' } },
      { level: 'phrase', text: '我是越南人', pron: p('wǒ shì Yuènán rén'), meaning: { vi: 'tôi là người Việt Nam', en: 'I am Vietnamese' }, example: '我是越南人，我从河内来。', exampleTranslation: { vi: 'Mình là người Việt Nam, mình đến từ Hà Nội.', en: 'I am Vietnamese. I come from Hanoi.' } },
      { level: 'phrase', text: '好久不见', pron: p('hǎojiǔ bù jiàn', { vi: '好久 đọc thành háojiǔ (hai thanh 3 liền nhau); 不 đọc bú trước 见 (thanh 4).', en: '好久 is read háojiǔ (two 3rd tones); 不 is read bú before 见 (4th tone).' }), meaning: { vi: 'lâu rồi không gặp', en: 'long time no see' }, example: '李明，好久不见！你好吗？', exampleTranslation: { vi: 'Lý Minh, lâu rồi không gặp! Bạn khỏe không?', en: 'Li Ming, long time no see! How are you?' } },
      { level: 'phrase', text: '下次见', pron: p('xià cì jiàn'), meaning: { vi: 'hẹn gặp lần sau', en: 'see you next time' }, example: '我得走了，下次见！', exampleTranslation: { vi: 'Mình phải đi rồi, hẹn gặp lần sau!', en: 'I have to go, see you next time!' } },
      { level: 'sentence', text: '你叫什么名字？', pron: p('Nǐ jiào shénme míngzi?'), meaning: { vi: 'Bạn tên là gì?', en: 'What is your name?' }, example: '你好！你叫什么名字？', exampleTranslation: { vi: 'Chào bạn! Bạn tên là gì?', en: 'Hi! What is your name?' } },
      { level: 'sentence', text: '你是哪国人？', pron: p('Nǐ shì nǎ guó rén?'), meaning: { vi: 'Bạn là người nước nào?', en: 'Where are you from? (Which country?)' }, example: '我是越南人，你是哪国人？', exampleTranslation: { vi: 'Mình là người Việt Nam, bạn là người nước nào?', en: 'I am Vietnamese. Where are you from?' } },
      { level: 'sentence', text: '请多关照。', pron: p('Qǐng duō guānzhào.'), meaning: { vi: 'Mong được giúp đỡ nhiều.', en: 'I look forward to your guidance. (polite phrase when meeting)' }, example: '我是新来的，请多关照。', exampleTranslation: { vi: 'Mình là người mới, mong được giúp đỡ nhiều.', en: 'I am new here, I look forward to working with you.' } },
      { level: 'sentence', text: '我来介绍一下。', pron: p('Wǒ lái jièshào yīxià.', YI4), meaning: { vi: 'Để tôi giới thiệu một chút.', en: 'Let me introduce (myself / someone).' }, example: '我来介绍一下，这是我的同学。', exampleTranslation: { vi: 'Để mình giới thiệu, đây là bạn cùng lớp của mình.', en: 'Let me introduce: this is my classmate.' } },
    ],
  },

  // ======================= daily =======================
  {
    id: 'zh-daily',
    lang: 'zh',
    scenario: 'daily',
    level: 'beginner',
    intro: {
      scenario: {
        vi: 'Buổi sáng, bạn gặp chị Trương, người hàng xóm người Trung Quốc, ở dưới sân chung cư.',
        en: 'In the morning you run into Ms. Zhang, your Chinese neighbour, downstairs at your apartment building.',
        zh: '早上，你在楼下遇到了中国邻居张姐。',
      },
      role: {
        vi: 'Bạn là hàng xóm. Hãy kể về sinh hoạt hằng ngày của bạn: giờ dậy, cách đi làm/đi học, buổi tối và cuối tuần.',
        en: 'You are the neighbour. Talk about your daily routine: when you get up, how you commute, your evenings and weekends.',
        zh: '你是邻居。请聊聊你的日常生活：几点起床、怎么上班或上学、晚上和周末做什么。',
      },
    },
    turns: [
      {
        partner: {
          text: '早上好！你吃早饭了吗？',
          translation: { vi: 'Chào buổi sáng! Bạn ăn sáng chưa?', en: 'Good morning! Have you had breakfast?' },
          pron: p('Zǎoshang hǎo! Nǐ chī zǎofàn le ma?'),
        },
        replies: [
          { text: '早上好！吃了，谢谢。', translation: { vi: 'Chào buổi sáng! Ăn rồi, cảm ơn chị.', en: 'Good morning! Yes, I have, thanks.' } },
          { text: '还没呢，我一会儿去吃。', translation: { vi: 'Chưa ạ, lát nữa em đi ăn.', en: 'Not yet, I will go and eat in a bit.' } },
        ],
      },
      {
        partner: {
          text: '你今天几点起床的？',
          translation: { vi: 'Hôm nay bạn dậy lúc mấy giờ?', en: 'What time did you get up today?' },
          pron: p('Nǐ jīntiān jǐ diǎn qǐchuáng de?'),
        },
        replies: [
          { text: '我七点起床的。', translation: { vi: 'Em dậy lúc bảy giờ.', en: 'I got up at seven.' } },
          { text: '我六点半就起床了，有点儿累。', translation: { vi: 'Sáu rưỡi em đã dậy rồi, hơi mệt ạ.', en: 'I got up at half past six, so I am a bit tired.' } },
        ],
      },
      {
        partner: {
          text: '你平时怎么去上班或者上学？',
          translation: { vi: 'Bình thường bạn đi làm hay đi học bằng gì?', en: 'How do you usually get to work or school?' },
          pron: p('Nǐ píngshí zěnme qù shàngbān huòzhě shàngxué?'),
        },
        replies: [
          { text: '我骑摩托车去。', translation: { vi: 'Em đi xe máy.', en: 'I go by motorbike.' } },
          { text: '我坐公共汽车去，大概二十分钟。', translation: { vi: 'Em đi xe buýt, mất khoảng hai mươi phút.', en: 'I take the bus. It takes about twenty minutes.' } },
        ],
      },
      {
        partner: {
          text: '你晚上一般做什么？',
          translation: { vi: 'Buổi tối bạn thường làm gì?', en: 'What do you usually do in the evening?' },
          pron: p('Nǐ wǎnshang yībān zuò shénme?'),
        },
        replies: [
          { text: '我一般看电视。', translation: { vi: 'Em thường xem tivi.', en: 'I usually watch TV.' } },
          { text: '我先做饭，然后学习一个小时汉语。', translation: { vi: 'Em nấu cơm trước, sau đó học tiếng Trung một tiếng.', en: 'First I cook, then I study Chinese for an hour.' } },
        ],
      },
      {
        partner: {
          text: '你周末也很忙吗？',
          translation: { vi: 'Cuối tuần bạn cũng bận lắm à?', en: 'Are you busy at the weekend too?' },
          pron: p('Nǐ zhōumò yě hěn máng ma?'),
        },
        replies: [
          { text: '不太忙。', translation: { vi: 'Không bận lắm ạ.', en: 'Not very busy.' } },
          { text: '有点儿忙，周末我常常回家看爸爸妈妈。', translation: { vi: 'Hơi bận ạ, cuối tuần em hay về nhà thăm bố mẹ.', en: 'A bit busy. At weekends I often go home to see my parents.' } },
        ],
      },
      {
        partner: {
          text: '今天天气真好，我们晚上一起去散步吧？',
          translation: { vi: 'Hôm nay trời đẹp quá, tối nay mình cùng đi dạo nhé?', en: 'The weather is lovely today. Shall we go for a walk together this evening?' },
          pron: p('Jīntiān tiānqì zhēn hǎo, wǒmen wǎnshang yīqǐ qù sànbù ba?'),
        },
        replies: [
          { text: '好啊！几点？', translation: { vi: 'Được ạ! Mấy giờ chị?', en: 'Sure! What time?' } },
          { text: '好啊，吃完晚饭以后去吧。', translation: { vi: 'Được ạ, ăn tối xong rồi đi nhé.', en: 'Sure, let us go after dinner.' } },
          { text: '不好意思，今天晚上我有事。', translation: { vi: 'Xin lỗi chị, tối nay em có việc rồi.', en: 'Sorry, I have something on this evening.' } },
        ],
      },
      {
        partner: {
          text: '那我们再联系吧。我先走了，再见！',
          translation: { vi: 'Vậy mình liên lạc sau nhé. Chị đi trước đây, tạm biệt!', en: 'Then let us keep in touch. I will be off now, bye!' },
          pron: p('Nà wǒmen zài liánxì ba. Wǒ xiān zǒu le, zàijiàn!'),
        },
        replies: [
          { text: '好的，再见！', translation: { vi: 'Vâng, tạm biệt chị!', en: 'OK, bye!' } },
          { text: '好，回头见！', translation: { vi: 'Vâng, gặp lại chị sau!', en: 'OK, see you later!' } },
        ],
      },
    ],
    suggestions: [
      { level: 'word', text: '起床', pron: p('qǐchuáng'), meaning: { vi: 'thức dậy', en: 'to get up' }, example: '我每天七点起床。', exampleTranslation: { vi: 'Mỗi ngày tôi dậy lúc bảy giờ.', en: 'I get up at seven every day.' } },
      { level: 'word', text: '早饭', pron: p('zǎofàn'), meaning: { vi: 'bữa sáng', en: 'breakfast' }, example: '我今天没吃早饭。', exampleTranslation: { vi: 'Hôm nay tôi chưa ăn sáng.', en: 'I did not have breakfast today.' } },
      { level: 'word', text: '上班', pron: p('shàngbān'), meaning: { vi: 'đi làm', en: 'to go to work' }, example: '我八点半上班。', exampleTranslation: { vi: 'Tôi vào làm lúc tám rưỡi.', en: 'I start work at half past eight.' } },
      { level: 'word', text: '周末', pron: p('zhōumò'), meaning: { vi: 'cuối tuần', en: 'weekend' }, example: '周末我常常去看电影。', exampleTranslation: { vi: 'Cuối tuần tôi hay đi xem phim.', en: 'I often go to the cinema at weekends.' } },
      { level: 'word', text: '一般', pron: p('yībān', YI_OTHER), meaning: { vi: 'thường, thông thường', en: 'usually; ordinary' }, example: '我晚上一般在家。', exampleTranslation: { vi: 'Buổi tối tôi thường ở nhà.', en: 'I am usually at home in the evening.' } },
      { level: 'word', text: '散步', pron: p('sànbù'), meaning: { vi: 'đi dạo', en: 'to take a walk' }, example: '吃完晚饭我们去散步吧。', exampleTranslation: { vi: 'Ăn tối xong mình đi dạo nhé.', en: 'Let us go for a walk after dinner.' } },
      { level: 'phrase', text: '几点起床', pron: p('jǐ diǎn qǐchuáng', { vi: 'Ba thanh 3 liền nhau: 几点起 thường đọc thành jí dián qǐ.', en: 'Three 3rd tones in a row: 几点起 is usually read jí dián qǐ.' }), meaning: { vi: 'dậy lúc mấy giờ', en: 'what time (you) get up' }, example: '你周末几点起床？', exampleTranslation: { vi: 'Cuối tuần bạn dậy lúc mấy giờ?', en: 'What time do you get up at weekends?' } },
      { level: 'phrase', text: '坐公共汽车', pron: p('zuò gōnggòng qìchē'), meaning: { vi: 'đi xe buýt', en: 'to take the bus' }, example: '我坐公共汽车去公司。', exampleTranslation: { vi: 'Tôi đi xe buýt đến công ty.', en: 'I take the bus to the office.' } },
      { level: 'phrase', text: '有点儿累', pron: p('yǒudiǎnr lèi', T3('yóudiǎnr', 'yóudiǎnr')), meaning: { vi: 'hơi mệt', en: 'a bit tired' }, example: '今天工作很多，我有点儿累。', exampleTranslation: { vi: 'Hôm nay nhiều việc, tôi hơi mệt.', en: 'There was a lot of work today, I am a bit tired.' } },
      { level: 'phrase', text: '一起去', pron: p('yīqǐ qù', YI_OTHER), meaning: { vi: 'cùng đi', en: 'to go together' }, example: '我们一起去超市吧。', exampleTranslation: { vi: 'Mình cùng đi siêu thị nhé.', en: 'Let us go to the supermarket together.' } },
      { level: 'phrase', text: '不太忙', pron: p('bù tài máng', BU4), meaning: { vi: 'không bận lắm', en: 'not very busy' }, example: '这个星期我不太忙。', exampleTranslation: { vi: 'Tuần này tôi không bận lắm.', en: 'I am not very busy this week.' } },
      { level: 'sentence', text: '你吃早饭了吗？', pron: p('Nǐ chī zǎofàn le ma?'), meaning: { vi: 'Bạn ăn sáng chưa?', en: 'Have you had breakfast?' }, example: '早上好！你吃早饭了吗？', exampleTranslation: { vi: 'Chào buổi sáng! Bạn ăn sáng chưa?', en: 'Good morning! Have you had breakfast?' } },
      { level: 'sentence', text: '我每天七点起床。', pron: p('Wǒ měi tiān qī diǎn qǐchuáng.', T3('wó měi', 'wó měi')), meaning: { vi: 'Mỗi ngày tôi dậy lúc bảy giờ.', en: 'I get up at seven every day.' }, example: '我每天七点起床，八点出门。', exampleTranslation: { vi: 'Mỗi ngày tôi dậy lúc bảy giờ, tám giờ ra khỏi nhà.', en: 'I get up at seven every day and leave home at eight.' } },
      { level: 'sentence', text: '我平时坐地铁去上班。', pron: p('Wǒ píngshí zuò dìtiě qù shàngbān.'), meaning: { vi: 'Bình thường tôi đi tàu điện ngầm đi làm.', en: 'I usually take the subway to work.' }, example: '我平时坐地铁去上班，很方便。', exampleTranslation: { vi: 'Bình thường tôi đi tàu điện ngầm đi làm, rất tiện.', en: 'I usually take the subway to work; it is very convenient.' } },
      { level: 'sentence', text: '周末你一般做什么？', pron: p('Zhōumò nǐ yībān zuò shénme?', YI_OTHER), meaning: { vi: 'Cuối tuần bạn thường làm gì?', en: 'What do you usually do at weekends?' }, example: '周末你一般做什么？在家休息吗？', exampleTranslation: { vi: 'Cuối tuần bạn thường làm gì? Ở nhà nghỉ ngơi à?', en: 'What do you usually do at weekends? Rest at home?' } },
    ],
  },

  // ======================= shopping =======================
  {
    id: 'zh-shopping',
    lang: 'zh',
    scenario: 'shopping',
    level: 'beginner',
    intro: {
      scenario: {
        vi: 'Bạn vào một cửa hàng quần áo ở Trung Quốc để mua một chiếc áo phông.',
        en: 'You walk into a clothes shop in China to buy a T-shirt.',
        zh: '你走进中国的一家服装店，想买一件T恤。',
      },
      role: {
        vi: 'Bạn là khách hàng. Hãy nói màu và cỡ bạn muốn, thử áo, hỏi giá, mặc cả một chút rồi thanh toán.',
        en: 'You are the customer. Say which colour and size you want, try it on, ask the price, bargain a little and pay.',
        zh: '你是顾客。请说出想要的颜色和尺码，试穿，问价钱，讲讲价，然后付钱。',
      },
    },
    turns: [
      {
        partner: {
          text: '欢迎光临！您想买什么？',
          translation: { vi: 'Xin chào quý khách! Anh/chị muốn mua gì ạ?', en: 'Welcome! What would you like to buy?' },
          pron: p('Huānyíng guānglín! Nín xiǎng mǎi shénme?'),
        },
        replies: [
          { text: '我想买一件T恤。', translation: { vi: 'Tôi muốn mua một chiếc áo phông.', en: 'I would like to buy a T-shirt.' } },
          { text: '你好，我想看看T恤。', translation: { vi: 'Chào bạn, tôi muốn xem áo phông.', en: 'Hi, I would like to look at T-shirts.' } },
        ],
      },
      {
        partner: {
          text: '这几件都是新款，您喜欢什么颜色？',
          translation: { vi: 'Mấy chiếc này đều là mẫu mới, anh/chị thích màu gì ạ?', en: 'These are all new styles. What colour do you like?' },
          pron: p('Zhè jǐ jiàn dōu shì xīnkuǎn, nín xǐhuan shénme yánsè?'),
        },
        replies: [
          { text: '我喜欢白色。', translation: { vi: 'Tôi thích màu trắng.', en: 'I like white.' } },
          { text: '有没有蓝色的？', translation: { vi: 'Có màu xanh dương không?', en: 'Do you have a blue one?' } },
        ],
      },
      {
        partner: {
          text: '有的。您穿多大号的？',
          translation: { vi: 'Có ạ. Anh/chị mặc cỡ nào?', en: 'Yes, we do. What size do you wear?' },
          pron: p('Yǒu de. Nín chuān duō dà hào de?'),
        },
        replies: [
          { text: '我穿M号。', translation: { vi: 'Tôi mặc cỡ M.', en: 'I wear a medium.' } },
          { text: '我不太清楚，可能是L号。', translation: { vi: 'Tôi không rõ lắm, chắc là cỡ L.', en: 'I am not sure, maybe a large.' } },
        ],
      },
      {
        partner: {
          text: '这件您试试吧，试衣间在那边。',
          translation: { vi: 'Anh/chị mặc thử chiếc này đi ạ, phòng thử đồ ở đằng kia.', en: 'Try this one on. The fitting room is over there.' },
          pron: p('Zhè jiàn nín shìshi ba, shìyījiān zài nàbiān.'),
        },
        replies: [
          { text: '好的，谢谢。', translation: { vi: 'Vâng, cảm ơn.', en: 'OK, thank you.' } },
          { text: '好，我去试一下。', translation: { vi: 'Được, tôi đi thử một chút.', en: 'OK, I will go and try it on.' } },
        ],
      },
      {
        partner: {
          text: '怎么样？合适吗？',
          translation: { vi: 'Thế nào ạ? Có vừa không?', en: 'How is it? Does it fit?' },
          pron: p('Zěnmeyàng? Héshì ma?'),
        },
        replies: [
          { text: '很合适！这件多少钱？', translation: { vi: 'Rất vừa! Chiếc này bao nhiêu tiền?', en: 'It fits well! How much is this one?' } },
          { text: '挺合适的，颜色也很好看。多少钱？', translation: { vi: 'Khá vừa, màu cũng đẹp. Bao nhiêu tiền vậy?', en: 'It fits nicely and the colour looks good too. How much is it?' } },
        ],
      },
      {
        partner: {
          text: '一百二十块，今天打八折，九十六块。',
          translation: { vi: 'Một trăm hai mươi tệ, hôm nay giảm 20%, còn chín mươi sáu tệ.', en: '120 yuan. It is 20% off today, so 96 yuan.' },
          pron: p('Yībǎi èrshí kuài, jīntiān dǎ bā zhé, jiǔshíliù kuài.'),
        },
        replies: [
          { text: '能便宜一点儿吗？', translation: { vi: 'Có thể rẻ hơn một chút không?', en: 'Can you make it a bit cheaper?' } },
          { text: '有点儿贵，九十块可以吗？', translation: { vi: 'Hơi đắt, chín mươi tệ được không?', en: 'It is a bit expensive. Would 90 yuan be OK?' } },
        ],
      },
      {
        partner: {
          text: '好吧，九十块给您。您怎么付？现金还是微信？',
          translation: { vi: 'Thôi được, chín mươi tệ bán cho anh/chị. Anh/chị trả bằng gì ạ? Tiền mặt hay WeChat?', en: 'All right, 90 yuan for you. How would you like to pay? Cash or WeChat?' },
          pron: p('Hǎo ba, jiǔshí kuài gěi nín. Nín zěnme fù? Xiànjīn háishi Wēixìn?'),
        },
        replies: [
          { text: '微信。', translation: { vi: 'WeChat.', en: 'WeChat.' } },
          { text: '我用微信付吧。', translation: { vi: 'Tôi trả bằng WeChat nhé.', en: 'I will pay with WeChat.' } },
          { text: '我付现金。', translation: { vi: 'Tôi trả tiền mặt.', en: 'I will pay cash.' } },
        ],
      },
      {
        partner: {
          text: '好的，谢谢！欢迎下次再来！',
          translation: { vi: 'Vâng, cảm ơn anh/chị! Lần sau lại ghé nhé!', en: 'OK, thank you! Please come again!' },
          pron: p('Hǎo de, xièxie! Huānyíng xià cì zài lái!'),
        },
        replies: [
          { text: '谢谢，再见！', translation: { vi: 'Cảm ơn, tạm biệt!', en: 'Thanks, bye!' } },
          { text: '谢谢你，我很喜欢这件T恤。再见！', translation: { vi: 'Cảm ơn bạn, tôi rất thích chiếc áo này. Tạm biệt!', en: 'Thank you, I really like this T-shirt. Bye!' } },
        ],
      },
    ],
    suggestions: [
      { level: 'word', text: '便宜', pron: p('piányi'), meaning: { vi: 'rẻ', en: 'cheap' }, example: '这件T恤很便宜。', exampleTranslation: { vi: 'Chiếc áo phông này rất rẻ.', en: 'This T-shirt is very cheap.' } },
      { level: 'word', text: '贵', pron: p('guì'), meaning: { vi: 'đắt', en: 'expensive' }, example: '这个太贵了。', exampleTranslation: { vi: 'Cái này đắt quá.', en: 'This is too expensive.' } },
      { level: 'word', text: '颜色', pron: p('yánsè'), meaning: { vi: 'màu sắc', en: 'colour' }, example: '你喜欢什么颜色？', exampleTranslation: { vi: 'Bạn thích màu gì?', en: 'What colour do you like?' } },
      { level: 'word', text: '合适', pron: p('héshì'), meaning: { vi: 'vừa, phù hợp', en: 'fitting, suitable' }, example: '这件衣服很合适。', exampleTranslation: { vi: 'Bộ quần áo này rất vừa.', en: 'These clothes fit well.' } },
      { level: 'word', text: '试', pron: p('shì'), meaning: { vi: 'thử', en: 'to try (on)' }, example: '我可以试试这双鞋吗？', exampleTranslation: { vi: 'Tôi thử đôi giày này được không?', en: 'Can I try on these shoes?' } },
      { level: 'word', text: '现金', pron: p('xiànjīn'), meaning: { vi: 'tiền mặt', en: 'cash' }, example: '我没有现金，可以用微信吗？', exampleTranslation: { vi: 'Tôi không có tiền mặt, dùng WeChat được không?', en: 'I have no cash. Can I use WeChat?' } },
      { level: 'phrase', text: '多少钱', pron: p('duōshao qián'), meaning: { vi: 'bao nhiêu tiền', en: 'how much (money)' }, example: '这个多少钱？', exampleTranslation: { vi: 'Cái này bao nhiêu tiền?', en: 'How much is this?' } },
      { level: 'phrase', text: '便宜一点儿', pron: p('piányi yīdiǎnr', YI_OTHER), meaning: { vi: 'rẻ hơn một chút', en: 'a bit cheaper' }, example: '老板，便宜一点儿吧！', exampleTranslation: { vi: 'Ông chủ ơi, bớt cho một chút đi!', en: 'Boss, make it a bit cheaper!' } },
      { level: 'phrase', text: '试一下', pron: p('shì yīxià', YI4), meaning: { vi: 'thử một chút', en: 'to try (once)' }, example: '这件我想试一下。', exampleTranslation: { vi: 'Chiếc này tôi muốn thử một chút.', en: 'I would like to try this one on.' } },
      { level: 'phrase', text: '有没有', pron: p('yǒu méiyǒu'), meaning: { vi: 'có… không', en: 'is there / do you have…?' }, example: '有没有大一点儿的？', exampleTranslation: { vi: 'Có cái nào to hơn một chút không?', en: 'Do you have a slightly bigger one?' } },
      { level: 'phrase', text: '打八折', pron: p('dǎ bā zhé'), meaning: { vi: 'giảm giá 20% (tính 80% giá)', en: '20% off (pay 80%)' }, example: '今天所有衣服都打八折。', exampleTranslation: { vi: 'Hôm nay tất cả quần áo đều giảm 20%.', en: 'All clothes are 20% off today.' } },
      { level: 'sentence', text: '这件多少钱？', pron: p('Zhè jiàn duōshao qián?'), meaning: { vi: 'Chiếc này bao nhiêu tiền?', en: 'How much is this one?' }, example: '你好，这件多少钱？', exampleTranslation: { vi: 'Chào bạn, chiếc này bao nhiêu tiền?', en: 'Hi, how much is this one?' } },
      { level: 'sentence', text: '能便宜一点儿吗？', pron: p('Néng piányi yīdiǎnr ma?', YI_OTHER), meaning: { vi: 'Có thể rẻ hơn chút không?', en: 'Can you make it a bit cheaper?' }, example: '有点儿贵，能便宜一点儿吗？', exampleTranslation: { vi: 'Hơi đắt, có thể rẻ hơn chút không?', en: 'It is a bit pricey. Can you make it cheaper?' } },
      { level: 'sentence', text: '我可以试一下吗？', pron: p('Wǒ kěyǐ shì yīxià ma?', { vi: '可以 đọc thành kéyǐ (hai thanh 3 liền nhau); 一 đọc yí trước 下 (thanh 4).', en: '可以 is read kéyǐ (two 3rd tones); 一 is read yí before 下 (4th tone).' }), meaning: { vi: 'Tôi thử được không?', en: 'May I try it on?' }, example: '这件很好看，我可以试一下吗？', exampleTranslation: { vi: 'Chiếc này đẹp quá, tôi thử được không?', en: 'This one looks nice. May I try it on?' } },
      { level: 'sentence', text: '我用微信付。', pron: p('Wǒ yòng Wēixìn fù.'), meaning: { vi: 'Tôi trả bằng WeChat.', en: 'I will pay with WeChat.' }, example: '我没有现金，我用微信付。', exampleTranslation: { vi: 'Tôi không có tiền mặt, tôi trả bằng WeChat.', en: 'I have no cash, I will pay with WeChat.' } },
    ],
  },

  // ======================= food =======================
  {
    id: 'zh-food',
    lang: 'zh',
    scenario: 'food',
    level: 'beginner',
    intro: {
      scenario: {
        vi: 'Bạn vào một nhà hàng Trung Quốc để ăn trưa. Nhân viên phục vụ ra đón bạn.',
        en: 'You go into a Chinese restaurant for lunch. A waiter comes to greet you.',
        zh: '你去一家中国餐厅吃午饭，服务员来招呼你。',
      },
      role: {
        vi: 'Bạn là thực khách. Hãy nói số người, hỏi món nên gọi, gọi món và đồ uống, nói món bạn không ăn được, rồi thanh toán.',
        en: 'You are the diner. Say how many people, ask for a recommendation, order food and a drink, mention what you do not eat, then pay.',
        zh: '你是客人。请说几位，问推荐的菜，点菜和饮料，说说你不吃什么，最后买单。',
      },
    },
    turns: [
      {
        partner: {
          text: '您好！几位？',
          translation: { vi: 'Xin chào! Mấy người ạ?', en: 'Hello! How many people?' },
          pron: p('Nín hǎo! Jǐ wèi?'),
        },
        replies: [
          { text: '一位。', translation: { vi: 'Một người.', en: 'Just one.' } },
          { text: '两位，有靠窗的位子吗？', translation: { vi: 'Hai người, có bàn cạnh cửa sổ không?', en: 'Two. Do you have a table by the window?' } },
        ],
      },
      {
        partner: {
          text: '这边请。这是菜单，您想吃点儿什么？',
          translation: { vi: 'Mời đi lối này. Đây là thực đơn, anh/chị muốn ăn gì ạ?', en: 'This way, please. Here is the menu. What would you like to eat?' },
          pron: p('Zhèbiān qǐng. Zhè shì càidān, nín xiǎng chī diǎnr shénme?'),
        },
        replies: [
          { text: '你们有什么好吃的？', translation: { vi: 'Ở đây có món gì ngon?', en: 'What is good here?' } },
          { text: '我第一次来，有什么推荐的吗？', translation: { vi: 'Tôi đến lần đầu, có món gì giới thiệu không?', en: 'It is my first time here. Do you have any recommendations?' } },
        ],
      },
      {
        partner: {
          text: '我们的饺子和宫保鸡丁都很有名。',
          translation: { vi: 'Sủi cảo và gà xào Cung Bảo của quán đều rất nổi tiếng.', en: 'Our dumplings and Kung Pao chicken are both famous.' },
          pron: p('Wǒmen de jiǎozi hé gōngbǎo jīdīng dōu hěn yǒumíng.'),
        },
        replies: [
          { text: '那我要一盘饺子。', translation: { vi: 'Vậy cho tôi một đĩa sủi cảo.', en: 'Then I will have a plate of dumplings.' } },
          { text: '那来一份宫保鸡丁，再来一碗米饭。', translation: { vi: 'Vậy cho một phần gà Cung Bảo, thêm một bát cơm.', en: 'Then one Kung Pao chicken and a bowl of rice, please.' } },
        ],
      },
      {
        partner: {
          text: '好的。您要喝点儿什么？',
          translation: { vi: 'Vâng. Anh/chị muốn uống gì ạ?', en: 'OK. What would you like to drink?' },
          pron: p('Hǎo de. Nín yào hē diǎnr shénme?'),
        },
        replies: [
          { text: '一杯茶，谢谢。', translation: { vi: 'Một cốc trà, cảm ơn.', en: 'A cup of tea, thanks.' } },
          { text: '来一杯冰可乐吧。', translation: { vi: 'Cho tôi một cốc Coca đá nhé.', en: 'I will have an iced Coke.' } },
        ],
      },
      {
        partner: {
          text: '您有什么不吃的吗？比如香菜？',
          translation: { vi: 'Anh/chị có kiêng món gì không? Ví dụ rau mùi?', en: 'Is there anything you do not eat? Coriander, for example?' },
          pron: p('Nín yǒu shénme bù chī de ma? Bǐrú xiāngcài?'),
        },
        replies: [
          { text: '没有，我什么都吃。', translation: { vi: 'Không, tôi ăn được hết.', en: 'No, I eat everything.' } },
          { text: '我不吃香菜，谢谢。', translation: { vi: 'Tôi không ăn rau mùi, cảm ơn.', en: 'I do not eat coriander, thanks.' } },
          { text: '请不要放太辣。', translation: { vi: 'Đừng cho cay quá nhé.', en: 'Please do not make it too spicy.' } },
        ],
      },
      {
        partner: {
          text: '好的，请稍等。……您的菜来了，请慢用！',
          translation: { vi: 'Vâng, xin chờ một lát. … Món của anh/chị đây, chúc ngon miệng!', en: 'OK, one moment please. … Here is your food. Enjoy your meal!' },
          pron: p('Hǎo de, qǐng shāo děng. … Nín de cài lái le, qǐng màn yòng!'),
        },
        replies: [
          { text: '谢谢！', translation: { vi: 'Cảm ơn!', en: 'Thank you!' } },
          { text: '看起来很好吃！谢谢。', translation: { vi: 'Trông ngon quá! Cảm ơn.', en: 'It looks delicious! Thanks.' } },
        ],
      },
      {
        partner: {
          text: '菜怎么样？还需要别的吗？',
          translation: { vi: 'Món ăn thế nào ạ? Anh/chị có cần gọi thêm gì không?', en: 'How is the food? Do you need anything else?' },
          pron: p('Cài zěnmeyàng? Hái xūyào bié de ma?'),
        },
        replies: [
          { text: '很好吃！不用了，买单吧。', translation: { vi: 'Rất ngon! Không cần nữa, tính tiền nhé.', en: 'Delicious! No thanks, the bill please.' } },
          { text: '非常好吃，饺子特别香。不用了，我们买单。', translation: { vi: 'Rất ngon, sủi cảo đặc biệt thơm. Không cần nữa, chúng tôi tính tiền.', en: 'Very tasty, the dumplings are especially good. Nothing else, we would like the bill.' } },
        ],
      },
      {
        partner: {
          text: '好的，一共八十五块。谢谢，欢迎下次光临！',
          translation: { vi: 'Vâng, tổng cộng tám mươi lăm tệ. Cảm ơn, lần sau lại ghé nhé!', en: 'OK, that is 85 yuan in total. Thank you, please come again!' },
          pron: p('Hǎo de, yīgòng bāshíwǔ kuài. Xièxie, huānyíng xià cì guānglín!'),
        },
        replies: [
          { text: '谢谢，再见！', translation: { vi: 'Cảm ơn, tạm biệt!', en: 'Thanks, bye!' } },
          { text: '谢谢，菜很好吃！下次再来。', translation: { vi: 'Cảm ơn, đồ ăn rất ngon! Lần sau tôi lại đến.', en: 'Thanks, the food was great! I will come again.' } },
        ],
      },
    ],
    suggestions: [
      { level: 'word', text: '菜单', pron: p('càidān'), meaning: { vi: 'thực đơn', en: 'menu' }, example: '服务员，请给我菜单。', exampleTranslation: { vi: 'Anh phục vụ ơi, cho tôi xin thực đơn.', en: 'Waiter, the menu please.' } },
      { level: 'word', text: '好吃', pron: p('hǎochī'), meaning: { vi: 'ngon', en: 'tasty, delicious' }, example: '这家的饺子很好吃。', exampleTranslation: { vi: 'Sủi cảo quán này rất ngon.', en: 'The dumplings here are delicious.' } },
      { level: 'word', text: '辣', pron: p('là'), meaning: { vi: 'cay', en: 'spicy' }, example: '这个菜辣不辣？', exampleTranslation: { vi: 'Món này có cay không?', en: 'Is this dish spicy?' } },
      { level: 'word', text: '米饭', pron: p('mǐfàn'), meaning: { vi: 'cơm', en: '(cooked) rice' }, example: '再来一碗米饭。', exampleTranslation: { vi: 'Cho thêm một bát cơm.', en: 'One more bowl of rice, please.' } },
      { level: 'word', text: '饺子', pron: p('jiǎozi'), meaning: { vi: 'sủi cảo', en: 'dumplings' }, example: '我想吃饺子。', exampleTranslation: { vi: 'Tôi muốn ăn sủi cảo.', en: 'I want to eat dumplings.' } },
      { level: 'word', text: '买单', pron: p('mǎidān'), meaning: { vi: 'tính tiền, thanh toán', en: 'to pay the bill' }, example: '服务员，买单！', exampleTranslation: { vi: 'Phục vụ ơi, tính tiền!', en: 'Waiter, the bill!' } },
      { level: 'phrase', text: '来一份', pron: p('lái yī fèn', YI4), meaning: { vi: 'cho một phần (khi gọi món)', en: 'one portion of… (when ordering)' }, example: '来一份宫保鸡丁。', exampleTranslation: { vi: 'Cho một phần gà Cung Bảo.', en: 'One Kung Pao chicken, please.' } },
      { level: 'phrase', text: '不要辣', pron: p('bù yào là', BU4), meaning: { vi: 'không cho cay', en: 'not spicy (no chili)' }, example: '这个菜不要辣，谢谢。', exampleTranslation: { vi: 'Món này đừng cho cay, cảm ơn.', en: 'No chili in this dish, thanks.' } },
      { level: 'phrase', text: '请稍等', pron: p('qǐng shāo děng'), meaning: { vi: 'xin chờ một lát', en: 'one moment, please' }, example: '好的，请稍等。', exampleTranslation: { vi: 'Vâng, xin chờ một lát.', en: 'OK, one moment please.' } },
      { level: 'phrase', text: '一杯茶', pron: p('yī bēi chá', YI_OTHER), meaning: { vi: 'một cốc trà', en: 'a cup of tea' }, example: '我要一杯茶。', exampleTranslation: { vi: 'Tôi muốn một cốc trà.', en: 'I would like a cup of tea.' } },
      { level: 'phrase', text: '再来一碗', pron: p('zài lái yī wǎn', YI_OTHER), meaning: { vi: 'cho thêm một bát', en: 'one more bowl' }, example: '米饭很好吃，再来一碗！', exampleTranslation: { vi: 'Cơm ngon quá, cho thêm một bát!', en: 'The rice is good, one more bowl!' } },
      { level: 'sentence', text: '有什么推荐的吗？', pron: p('Yǒu shénme tuījiàn de ma?'), meaning: { vi: 'Có món gì giới thiệu không?', en: 'Do you have any recommendations?' }, example: '我第一次来，有什么推荐的吗？', exampleTranslation: { vi: 'Tôi đến lần đầu, có món gì giới thiệu không?', en: 'It is my first time here. Any recommendations?' } },
      { level: 'sentence', text: '我不吃香菜。', pron: p('Wǒ bù chī xiāngcài.'), meaning: { vi: 'Tôi không ăn rau mùi.', en: 'I do not eat coriander.' }, example: '不好意思，我不吃香菜。', exampleTranslation: { vi: 'Xin lỗi, tôi không ăn rau mùi.', en: 'Sorry, I do not eat coriander.' } },
      { level: 'sentence', text: '服务员，买单！', pron: p('Fúwùyuán, mǎidān!'), meaning: { vi: 'Phục vụ ơi, tính tiền!', en: 'Waiter, the bill please!' }, example: '吃完了，服务员，买单！', exampleTranslation: { vi: 'Ăn xong rồi, phục vụ ơi, tính tiền!', en: 'We are done. Waiter, the bill please!' } },
      { level: 'sentence', text: '可以打包吗？', pron: p('Kěyǐ dǎbāo ma?', T3('kéyǐ', 'kéyǐ')), meaning: { vi: 'Có thể gói mang về không?', en: 'Can I get this to go?' }, example: '菜太多了，可以打包吗？', exampleTranslation: { vi: 'Nhiều đồ ăn quá, gói mang về được không?', en: 'There is too much food. Can we take it away?' } },
    ],
  },

  // ======================= travel =======================
  {
    id: 'zh-travel',
    lang: 'zh',
    scenario: 'travel',
    level: 'elementary',
    intro: {
      scenario: {
        vi: 'Bạn vừa đến Bắc Kinh du lịch và đang làm thủ tục nhận phòng ở quầy lễ tân khách sạn.',
        en: 'You have just arrived in Beijing on holiday and are checking in at the hotel front desk.',
        zh: '你刚到北京旅游，正在酒店前台办理入住。',
      },
      role: {
        vi: 'Bạn là khách du lịch. Hãy nhận phòng, xác nhận số đêm, rồi hỏi lễ tân cách đi đến Cố Cung.',
        en: 'You are the traveller. Check in, confirm how many nights you are staying, then ask the receptionist how to get to the Forbidden City.',
        zh: '你是游客。请办理入住，确认住几个晚上，然后问前台怎么去故宫。',
      },
    },
    turns: [
      {
        partner: {
          text: '您好，欢迎入住！请问有预订吗？',
          translation: { vi: 'Xin chào, chào mừng quý khách! Xin hỏi anh/chị đã đặt phòng chưa ạ?', en: 'Hello, welcome! Do you have a reservation?' },
          pron: p('Nín hǎo, huānyíng rùzhù! Qǐngwèn yǒu yùdìng ma?'),
        },
        replies: [
          { text: '有，我叫阮安。', translation: { vi: 'Có, tôi tên là Nguyễn An.', en: 'Yes, my name is Nguyen An.' } },
          { text: '有，我在网上订了一个单人间，名字是阮安。', translation: { vi: 'Có, tôi đặt một phòng đơn trên mạng, tên là Nguyễn An.', en: 'Yes, I booked a single room online, under the name Nguyen An.' } },
        ],
      },
      {
        partner: {
          text: '好的，请给我看一下您的护照。',
          translation: { vi: 'Vâng, cho tôi xem hộ chiếu của anh/chị ạ.', en: 'OK, may I see your passport, please?' },
          pron: p('Hǎo de, qǐng gěi wǒ kàn yīxià nín de hùzhào.'),
        },
        replies: [
          { text: '好的，给你。', translation: { vi: 'Vâng, đây ạ.', en: 'Sure, here you are.' } },
          { text: '在这儿，请看。', translation: { vi: 'Đây, mời xem.', en: 'Here it is.' } },
        ],
      },
      {
        partner: {
          text: '您订了三个晚上，对吗？',
          translation: { vi: 'Anh/chị đặt ba đêm, đúng không ạ?', en: 'You booked three nights, is that right?' },
          pron: p('Nín dìng le sān ge wǎnshang, duì ma?'),
        },
        replies: [
          { text: '对，住三个晚上。', translation: { vi: 'Đúng, ở ba đêm.', en: 'Yes, three nights.' } },
          { text: '对，我星期五早上退房。', translation: { vi: 'Đúng, sáng thứ Sáu tôi trả phòng.', en: 'Yes, I will check out on Friday morning.' } },
        ],
      },
      {
        partner: {
          text: '好的，您的房间在八楼，八零六号。早餐是七点到十点。',
          translation: { vi: 'Vâng, phòng của anh/chị ở tầng tám, số 806. Bữa sáng từ bảy giờ đến mười giờ.', en: 'OK, your room is on the eighth floor, number 806. Breakfast is from seven to ten.' },
          pron: p('Hǎo de, nín de fángjiān zài bā lóu, bā líng liù hào. Zǎocān shì qī diǎn dào shí diǎn.'),
        },
        replies: [
          { text: '好的，谢谢！', translation: { vi: 'Vâng, cảm ơn!', en: 'OK, thank you!' } },
          { text: '好的，七点到十点，我记住了。', translation: { vi: 'Vâng, từ bảy đến mười giờ, tôi nhớ rồi.', en: 'OK, seven to ten. Got it.' } },
        ],
      },
      {
        partner: {
          text: '请问您这次来北京是旅游吗？',
          translation: { vi: 'Xin hỏi lần này anh/chị đến Bắc Kinh để du lịch ạ?', en: 'May I ask, are you in Beijing on holiday this time?' },
          pron: p('Qǐngwèn nín zhè cì lái Běijīng shì lǚyóu ma?'),
        },
        replies: [
          { text: '对，我来旅游。', translation: { vi: 'Đúng, tôi đến du lịch.', en: 'Yes, I am here on holiday.' } },
          { text: '是的，我第一次来北京，想去很多地方看看。', translation: { vi: 'Vâng, lần đầu tôi đến Bắc Kinh, muốn đi thăm nhiều nơi.', en: 'Yes, it is my first time in Beijing. I want to see lots of places.' } },
        ],
      },
      {
        partner: {
          text: '太好了！您明天打算去哪儿？',
          translation: { vi: 'Tuyệt quá! Ngày mai anh/chị định đi đâu?', en: 'Great! Where are you planning to go tomorrow?' },
          pron: p('Tài hǎo le! Nín míngtiān dǎsuàn qù nǎr?'),
        },
        replies: [
          { text: '我想去故宫。', translation: { vi: 'Tôi muốn đi Cố Cung.', en: 'I want to go to the Forbidden City.' } },
          { text: '我想去故宫，请问怎么去比较方便？', translation: { vi: 'Tôi muốn đi Cố Cung, xin hỏi đi thế nào thì tiện?', en: 'I want to go to the Forbidden City. What is the easiest way to get there?' } },
        ],
      },
      {
        partner: {
          text: '去故宫可以坐地铁一号线，在天安门东站下车，大概二十分钟。',
          translation: { vi: 'Đi Cố Cung có thể đi tàu điện ngầm tuyến số 1, xuống ở ga Thiên An Môn Đông, mất khoảng hai mươi phút.', en: 'To get to the Forbidden City, take Subway Line 1 and get off at Tian\'anmen East. It takes about twenty minutes.' },
          pron: p('Qù Gùgōng kěyǐ zuò dìtiě yī hào xiàn, zài Tiān\'ānmén Dōng zhàn xià chē, dàgài èrshí fēnzhōng.'),
        },
        replies: [
          { text: '好的，谢谢！', translation: { vi: 'Vâng, cảm ơn!', en: 'OK, thanks!' } },
          { text: '一号线，天安门东站，太好了，谢谢你的帮助。', translation: { vi: 'Tuyến số 1, ga Thiên An Môn Đông, tuyệt quá, cảm ơn bạn đã giúp.', en: 'Line 1, Tian\'anmen East. Great, thanks for your help.' } },
        ],
      },
      {
        partner: {
          text: '不客气！这是您的房卡，祝您旅途愉快！',
          translation: { vi: 'Không có gì ạ! Đây là thẻ phòng của anh/chị, chúc chuyến đi vui vẻ!', en: 'You are welcome! Here is your key card. Have a nice trip!' },
          pron: p('Bù kèqi! Zhè shì nín de fángkǎ, zhù nín lǚtú yúkuài!'),
        },
        replies: [
          { text: '谢谢！', translation: { vi: 'Cảm ơn!', en: 'Thank you!' } },
          { text: '非常感谢，再见！', translation: { vi: 'Cảm ơn rất nhiều, tạm biệt!', en: 'Thank you very much, bye!' } },
        ],
      },
    ],
    suggestions: [
      { level: 'word', text: '护照', pron: p('hùzhào'), meaning: { vi: 'hộ chiếu', en: 'passport' }, example: '这是我的护照。', exampleTranslation: { vi: 'Đây là hộ chiếu của tôi.', en: 'This is my passport.' } },
      { level: 'word', text: '预订', pron: p('yùdìng'), meaning: { vi: 'đặt trước', en: 'to book, reservation' }, example: '我预订了两个晚上。', exampleTranslation: { vi: 'Tôi đã đặt hai đêm.', en: 'I booked two nights.' } },
      { level: 'word', text: '房间', pron: p('fángjiān'), meaning: { vi: 'phòng', en: 'room' }, example: '我的房间在几楼？', exampleTranslation: { vi: 'Phòng của tôi ở tầng mấy?', en: 'Which floor is my room on?' } },
      { level: 'word', text: '地铁', pron: p('dìtiě'), meaning: { vi: 'tàu điện ngầm', en: 'subway, metro' }, example: '坐地铁去很方便。', exampleTranslation: { vi: 'Đi tàu điện ngầm rất tiện.', en: 'Going by subway is very convenient.' } },
      { level: 'word', text: '退房', pron: p('tuìfáng'), meaning: { vi: 'trả phòng', en: 'to check out' }, example: '我明天早上退房。', exampleTranslation: { vi: 'Sáng mai tôi trả phòng.', en: 'I will check out tomorrow morning.' } },
      { level: 'word', text: '旅游', pron: p('lǚyóu'), meaning: { vi: 'du lịch', en: 'to travel; tourism' }, example: '我来北京旅游。', exampleTranslation: { vi: 'Tôi đến Bắc Kinh du lịch.', en: 'I came to Beijing as a tourist.' } },
      { level: 'phrase', text: '单人间', pron: p('dānrénjiān'), meaning: { vi: 'phòng đơn', en: 'single room' }, example: '我想订一个单人间。', exampleTranslation: { vi: 'Tôi muốn đặt một phòng đơn.', en: 'I would like to book a single room.' } },
      { level: 'phrase', text: '怎么走', pron: p('zěnme zǒu'), meaning: { vi: 'đi thế nào', en: 'how to get (there)' }, example: '请问，地铁站怎么走？', exampleTranslation: { vi: 'Xin hỏi, ga tàu điện ngầm đi thế nào?', en: 'Excuse me, how do I get to the subway station?' } },
      { level: 'phrase', text: '离这儿远吗', pron: p('lí zhèr yuǎn ma'), meaning: { vi: 'có xa đây không', en: 'is it far from here' }, example: '故宫离这儿远吗？', exampleTranslation: { vi: 'Cố Cung có xa đây không?', en: 'Is the Forbidden City far from here?' } },
      { level: 'phrase', text: '几点退房', pron: p('jǐ diǎn tuìfáng', T3('jí diǎn', 'jí diǎn')), meaning: { vi: 'mấy giờ trả phòng', en: 'what time to check out' }, example: '请问明天几点退房？', exampleTranslation: { vi: 'Xin hỏi ngày mai mấy giờ phải trả phòng?', en: 'What time is check-out tomorrow?' } },
      { level: 'phrase', text: '旅途愉快', pron: p('lǚtú yúkuài'), meaning: { vi: 'chuyến đi vui vẻ', en: 'have a nice trip' }, example: '祝你旅途愉快！', exampleTranslation: { vi: 'Chúc bạn chuyến đi vui vẻ!', en: 'Have a nice trip!' } },
      { level: 'sentence', text: '我预订了一个房间。', pron: p('Wǒ yùdìng le yī ge fángjiān.', YI4), meaning: { vi: 'Tôi đã đặt một phòng.', en: 'I have booked a room.' }, example: '你好，我预订了一个房间，名字是阮安。', exampleTranslation: { vi: 'Chào bạn, tôi đã đặt một phòng, tên là Nguyễn An.', en: 'Hello, I booked a room under the name Nguyen An.' } },
      { level: 'sentence', text: '请问去故宫怎么走？', pron: p('Qǐngwèn qù Gùgōng zěnme zǒu?'), meaning: { vi: 'Xin hỏi đi Cố Cung thế nào?', en: 'Excuse me, how do I get to the Forbidden City?' }, example: '你好，请问去故宫怎么走？', exampleTranslation: { vi: 'Chào bạn, xin hỏi đi Cố Cung thế nào?', en: 'Hi, how do I get to the Forbidden City?' } },
      { level: 'sentence', text: '早餐几点开始？', pron: p('Zǎocān jǐ diǎn kāishǐ?', T3('jí diǎn', 'jí diǎn')), meaning: { vi: 'Bữa sáng bắt đầu lúc mấy giờ?', en: 'What time does breakfast start?' }, example: '请问早餐几点开始？在几楼？', exampleTranslation: { vi: 'Xin hỏi bữa sáng bắt đầu lúc mấy giờ? Ở tầng mấy?', en: 'What time does breakfast start? Which floor is it on?' } },
      { level: 'sentence', text: '我可以把行李放在这儿吗？', pron: p('Wǒ kěyǐ bǎ xíngli fàng zài zhèr ma?', { vi: '我可以把 có nhiều thanh 3 liền nhau, thường đọc thành wǒ kéyǐ bǎ (可 đọc thanh 2).', en: '我可以把 has several 3rd tones in a row; it is usually read wǒ kéyǐ bǎ (可 becomes 2nd tone).' }), meaning: { vi: 'Tôi để hành lý ở đây được không?', en: 'Can I leave my luggage here?' }, example: '我已经退房了，我可以把行李放在这儿吗？', exampleTranslation: { vi: 'Tôi đã trả phòng rồi, tôi để hành lý ở đây được không?', en: 'I have checked out. Can I leave my luggage here?' } },
    ],
  },

  // ======================= hobbies =======================
  {
    id: 'zh-hobbies',
    lang: 'zh',
    scenario: 'hobbies',
    level: 'elementary',
    intro: {
      scenario: {
        vi: 'Giờ nghỉ trưa, bạn trò chuyện với Tiểu Trần, một người bạn Trung Quốc, về sở thích.',
        en: 'During a lunch break you chat with Xiao Chen, a Chinese friend, about hobbies.',
        zh: '午休的时候，你和中国朋友小陈聊爱好。',
      },
      role: {
        vi: 'Bạn là bạn của Tiểu Trần. Hãy kể sở thích của bạn, bắt đầu từ khi nào, thường làm cùng ai, và trả lời lời mời đi học thư pháp.',
        en: 'You are Xiao Chen\'s friend. Talk about your hobbies, when you started, who you do them with, and respond to an invitation to a calligraphy class.',
        zh: '你是小陈的朋友。请说说你的爱好、什么时候开始的、一般跟谁一起，并回应去上书法课的邀请。',
      },
    },
    turns: [
      {
        partner: {
          text: '你周末一般喜欢做什么？',
          translation: { vi: 'Cuối tuần bạn thường thích làm gì?', en: 'What do you usually like to do at weekends?' },
          pron: p('Nǐ zhōumò yībān xǐhuan zuò shénme?'),
        },
        replies: [
          { text: '我喜欢看电影。', translation: { vi: 'Mình thích xem phim.', en: 'I like watching films.' } },
          { text: '我喜欢运动，特别是游泳和跑步。', translation: { vi: 'Mình thích thể thao, nhất là bơi và chạy bộ.', en: 'I like sports, especially swimming and running.' } },
        ],
      },
      {
        partner: {
          text: '听起来不错！你是什么时候开始喜欢的？',
          translation: { vi: 'Nghe hay đấy! Bạn bắt đầu thích từ khi nào?', en: 'Sounds good! When did you start liking it?' },
          pron: p('Tīng qǐlai bùcuò! Nǐ shì shénme shíhou kāishǐ xǐhuan de?'),
        },
        replies: [
          { text: '上大学的时候开始的。', translation: { vi: 'Từ hồi học đại học.', en: 'When I started university.' } },
          { text: '我小时候就很喜欢了。', translation: { vi: 'Từ nhỏ mình đã rất thích rồi.', en: 'I have loved it since I was a child.' } },
        ],
      },
      {
        partner: {
          text: '你一般跟谁一起？',
          translation: { vi: 'Bạn thường làm cùng ai?', en: 'Who do you usually do it with?' },
          pron: p('Nǐ yībān gēn shéi yīqǐ?'),
        },
        replies: [
          { text: '我一般跟朋友一起。', translation: { vi: 'Mình thường đi cùng bạn bè.', en: 'Usually with friends.' } },
          { text: '一个人，我觉得一个人也挺好的。', translation: { vi: 'Một mình, mình thấy một mình cũng khá thoải mái.', en: 'On my own. I think doing it alone is nice too.' } },
        ],
      },
      {
        partner: {
          text: '我最近对书法很感兴趣，你觉得难吗？',
          translation: { vi: 'Dạo này mình rất hứng thú với thư pháp, bạn thấy có khó không?', en: 'I have got really interested in calligraphy lately. Do you think it is hard?' },
          pron: p('Wǒ zuìjìn duì shūfǎ hěn gǎn xìngqù, nǐ juéde nán ma?'),
        },
        replies: [
          { text: '我觉得有点儿难，但是很有意思。', translation: { vi: 'Mình thấy hơi khó, nhưng rất thú vị.', en: 'I think it is a bit hard, but very interesting.' } },
          { text: '我没试过，不过我很想学。', translation: { vi: 'Mình chưa thử bao giờ, nhưng mình rất muốn học.', en: 'I have never tried it, but I would really like to learn.' } },
        ],
      },
      {
        partner: {
          text: '那下个星期六我们一起去上书法课，怎么样？',
          translation: { vi: 'Vậy thứ Bảy tuần sau mình cùng đi học thư pháp nhé, thế nào?', en: 'Then how about going to a calligraphy class together next Saturday?' },
          pron: p('Nà xià ge xīngqīliù wǒmen yīqǐ qù shàng shūfǎ kè, zěnmeyàng?'),
        },
        replies: [
          { text: '好啊，几点？', translation: { vi: 'Được đấy, mấy giờ?', en: 'Sure, what time?' } },
          { text: '太好了！我早就想试试了。', translation: { vi: 'Tuyệt quá! Mình muốn thử từ lâu rồi.', en: 'Great! I have wanted to try it for ages.' } },
          { text: '不好意思，那天我可能有事。', translation: { vi: 'Xin lỗi, hôm đó có lẽ mình bận.', en: 'Sorry, I might be busy that day.' } },
        ],
      },
      {
        partner: {
          text: '课是上午十点。你要是有时间，就跟我说一声。',
          translation: { vi: 'Lớp học lúc mười giờ sáng. Nếu bạn có thời gian thì nói với mình một tiếng nhé.', en: 'The class is at ten in the morning. If you have time, just let me know.' },
          pron: p('Kè shì shàngwǔ shí diǎn. Nǐ yàoshi yǒu shíjiān, jiù gēn wǒ shuō yī shēng.'),
        },
        replies: [
          { text: '好的，没问题。', translation: { vi: 'Được, không vấn đề gì.', en: 'OK, no problem.' } },
          { text: '好，我星期五告诉你。', translation: { vi: 'Được, thứ Sáu mình báo bạn nhé.', en: 'OK, I will tell you on Friday.' } },
        ],
      },
      {
        partner: {
          text: '我还喜欢爬山，你呢？你喜欢户外活动吗？',
          translation: { vi: 'Mình còn thích leo núi nữa, còn bạn? Bạn có thích hoạt động ngoài trời không?', en: 'I also like hiking. What about you? Do you like outdoor activities?' },
          pron: p('Wǒ hái xǐhuan páshān, nǐ ne? Nǐ xǐhuan hùwài huódòng ma?'),
        },
        replies: [
          { text: '喜欢，我常常去爬山。', translation: { vi: 'Thích chứ, mình hay đi leo núi.', en: 'Yes, I often go hiking.' } },
          { text: '不太喜欢，我更喜欢在家看书。', translation: { vi: 'Không thích lắm, mình thích ở nhà đọc sách hơn.', en: 'Not really. I prefer reading at home.' } },
        ],
      },
      {
        partner: {
          text: '哈哈，每个人都不一样。今天聊得很开心，下次再聊！',
          translation: { vi: 'Haha, mỗi người một khác. Hôm nay nói chuyện vui quá, lần sau nói tiếp nhé!', en: 'Haha, everyone is different. I really enjoyed chatting today. Let us talk again next time!' },
          pron: p('Hāhā, měi ge rén dōu bù yīyàng. Jīntiān liáo de hěn kāixīn, xià cì zài liáo!'),
        },
        replies: [
          { text: '我也很开心，再见！', translation: { vi: 'Mình cũng rất vui, tạm biệt!', en: 'Me too, bye!' } },
          { text: '好的，下次见！', translation: { vi: 'Ừ, hẹn lần sau!', en: 'OK, see you next time!' } },
        ],
      },
    ],
    suggestions: [
      { level: 'word', text: '爱好', pron: p('àihào'), meaning: { vi: 'sở thích', en: 'hobby' }, example: '我的爱好是游泳。', exampleTranslation: { vi: 'Sở thích của tôi là bơi.', en: 'My hobby is swimming.' } },
      { level: 'word', text: '运动', pron: p('yùndòng'), meaning: { vi: 'thể thao, vận động', en: 'sport, exercise' }, example: '我每天都运动半个小时。', exampleTranslation: { vi: 'Mỗi ngày tôi đều vận động nửa tiếng.', en: 'I exercise for half an hour every day.' } },
      { level: 'word', text: '游泳', pron: p('yóuyǒng'), meaning: { vi: 'bơi', en: 'to swim; swimming' }, example: '夏天我常常去游泳。', exampleTranslation: { vi: 'Mùa hè tôi hay đi bơi.', en: 'I often go swimming in summer.' } },
      { level: 'word', text: '跑步', pron: p('pǎobù'), meaning: { vi: 'chạy bộ', en: 'to run; jogging' }, example: '我早上去公园跑步。', exampleTranslation: { vi: 'Buổi sáng tôi ra công viên chạy bộ.', en: 'I go running in the park in the morning.' } },
      { level: 'word', text: '书法', pron: p('shūfǎ'), meaning: { vi: 'thư pháp', en: 'calligraphy' }, example: '中国书法很漂亮。', exampleTranslation: { vi: 'Thư pháp Trung Quốc rất đẹp.', en: 'Chinese calligraphy is beautiful.' } },
      { level: 'word', text: '电影', pron: p('diànyǐng'), meaning: { vi: 'phim', en: 'film, movie' }, example: '周末我们去看电影吧。', exampleTranslation: { vi: 'Cuối tuần mình đi xem phim nhé.', en: 'Let us go to the cinema at the weekend.' } },
      { level: 'phrase', text: '对……感兴趣', pron: p('duì … gǎn xìngqù'), meaning: { vi: 'hứng thú với…', en: 'to be interested in…' }, example: '我对中国音乐很感兴趣。', exampleTranslation: { vi: 'Tôi rất hứng thú với âm nhạc Trung Quốc.', en: 'I am very interested in Chinese music.' } },
      { level: 'phrase', text: '有空的时候', pron: p('yǒu kòng de shíhou'), meaning: { vi: 'lúc rảnh', en: 'when (I) have free time' }, example: '有空的时候我喜欢看书。', exampleTranslation: { vi: 'Lúc rảnh tôi thích đọc sách.', en: 'When I have free time, I like reading.' } },
      { level: 'phrase', text: '一个人', pron: p('yī ge rén', YI4), meaning: { vi: 'một mình; một người', en: 'alone; one person' }, example: '我常常一个人去跑步。', exampleTranslation: { vi: 'Tôi hay chạy bộ một mình.', en: 'I often go running alone.' } },
      { level: 'phrase', text: '很有意思', pron: p('hěn yǒu yìsi', T3('hén yǒu', 'hén yǒu')), meaning: { vi: 'rất thú vị', en: 'very interesting' }, example: '这本书很有意思。', exampleTranslation: { vi: 'Cuốn sách này rất thú vị.', en: 'This book is very interesting.' } },
      { level: 'phrase', text: '听起来不错', pron: p('tīng qǐlai bùcuò', BU4), meaning: { vi: 'nghe hay đấy', en: 'sounds good' }, example: '去爬山？听起来不错！', exampleTranslation: { vi: 'Đi leo núi á? Nghe hay đấy!', en: 'Go hiking? Sounds good!' } },
      { level: 'sentence', text: '你有什么爱好？', pron: p('Nǐ yǒu shénme àihào?', T3('ní yǒu', 'ní yǒu')), meaning: { vi: 'Bạn có sở thích gì?', en: 'What are your hobbies?' }, example: '我喜欢唱歌，你有什么爱好？', exampleTranslation: { vi: 'Mình thích hát, bạn có sở thích gì?', en: 'I like singing. What are your hobbies?' } },
      { level: 'sentence', text: '我的爱好是看书。', pron: p('Wǒ de àihào shì kàn shū.'), meaning: { vi: 'Sở thích của tôi là đọc sách.', en: 'My hobby is reading.' }, example: '我的爱好是看书，特别是小说。', exampleTranslation: { vi: 'Sở thích của tôi là đọc sách, nhất là tiểu thuyết.', en: 'My hobby is reading, especially novels.' } },
      { level: 'sentence', text: '我每个星期游两次泳。', pron: p('Wǒ měi ge xīngqī yóu liǎng cì yǒng.', T3('wó měi', 'wó měi')), meaning: { vi: 'Mỗi tuần tôi bơi hai lần.', en: 'I swim twice a week.' }, example: '为了健康，我每个星期游两次泳。', exampleTranslation: { vi: 'Để khỏe mạnh, mỗi tuần tôi bơi hai lần.', en: 'To stay healthy, I swim twice a week.' } },
      { level: 'sentence', text: '我们一起去吧！', pron: p('Wǒmen yīqǐ qù ba!', YI_OTHER), meaning: { vi: 'Chúng mình cùng đi nhé!', en: 'Let us go together!' }, example: '星期六有书法课，我们一起去吧！', exampleTranslation: { vi: 'Thứ Bảy có lớp thư pháp, chúng mình cùng đi nhé!', en: 'There is a calligraphy class on Saturday. Let us go together!' } },
    ],
  },

  // ======================= work =======================
  {
    id: 'zh-work',
    lang: 'zh',
    scenario: 'work',
    level: 'elementary',
    intro: {
      scenario: {
        vi: 'Hôm nay là ngày đầu tiên bạn đi làm ở một công ty Trung Quốc. Đồng nghiệp Vương Phương đến chào và dẫn bạn đi xem công ty.',
        en: 'It is your first day at a Chinese company. Your colleague Wang Fang comes to greet you and shows you around.',
        zh: '今天是你在一家中国公司上班的第一天。同事王芳来跟你打招呼，带你熟悉公司。',
      },
      role: {
        vi: 'Bạn là nhân viên mới. Hãy giới thiệu bản thân và bộ phận của bạn, lắng nghe hướng dẫn và trả lời lịch sự.',
        en: 'You are the new employee. Introduce yourself and your department, listen to the instructions and reply politely.',
        zh: '你是新员工。请介绍自己和你的部门，听同事的介绍并礼貌地回答。',
      },
    },
    turns: [
      {
        partner: {
          text: '你好！你是新来的同事吧？我是王芳，市场部的。',
          translation: { vi: 'Chào bạn! Bạn là đồng nghiệp mới đúng không? Mình là Vương Phương, ở phòng Marketing.', en: 'Hi! You must be our new colleague. I am Wang Fang from the marketing department.' },
          pron: p('Nǐ hǎo! Nǐ shì xīn lái de tóngshì ba? Wǒ shì Wáng Fāng, shìchǎng bù de.'),
        },
        replies: [
          { text: '是的，我叫阮安，今天第一天上班。', translation: { vi: 'Vâng, mình tên là An, hôm nay là ngày đầu đi làm.', en: 'Yes, my name is An. Today is my first day.' } },
          { text: '你好，王芳！我是新来的阮安，请多关照。', translation: { vi: 'Chào chị Vương Phương! Mình là An, nhân viên mới, mong chị giúp đỡ nhiều.', en: 'Hi, Wang Fang! I am An, the new colleague. I look forward to working with you.' } },
        ],
      },
      {
        partner: {
          text: '欢迎欢迎！你在哪个部门工作？',
          translation: { vi: 'Chào mừng bạn! Bạn làm ở bộ phận nào?', en: 'Welcome! Which department are you in?' },
          pron: p('Huānyíng huānyíng! Nǐ zài nǎge bùmén gōngzuò?'),
        },
        replies: [
          { text: '我在技术部。', translation: { vi: 'Mình ở phòng Kỹ thuật.', en: 'I am in the technical department.' } },
          { text: '我在销售部，负责东南亚市场。', translation: { vi: 'Mình ở phòng Kinh doanh, phụ trách thị trường Đông Nam Á.', en: 'I am in sales, responsible for the Southeast Asian market.' } },
        ],
      },
      {
        partner: {
          text: '我带你熟悉一下公司吧。这是会议室，每周一上午九点开例会。',
          translation: { vi: 'Để mình dẫn bạn đi xem công ty nhé. Đây là phòng họp, chín giờ sáng thứ Hai hằng tuần có họp định kỳ.', en: 'Let me show you around. This is the meeting room. We have a regular meeting every Monday at 9 a.m.' },
          pron: p('Wǒ dài nǐ shúxī yīxià gōngsī ba. Zhè shì huìyìshì, měi zhōuyī shàngwǔ jiǔ diǎn kāi lìhuì.'),
        },
        replies: [
          { text: '好的，我记住了。', translation: { vi: 'Vâng, mình nhớ rồi.', en: 'OK, I will remember that.' } },
          { text: '好的，周一上午九点，谢谢提醒。', translation: { vi: 'Vâng, chín giờ sáng thứ Hai, cảm ơn đã nhắc.', en: 'OK, Monday at 9 a.m. Thanks for letting me know.' } },
        ],
      },
      {
        partner: {
          text: '那边是茶水间，咖啡和茶都是免费的。',
          translation: { vi: 'Đằng kia là phòng pantry, cà phê và trà đều miễn phí.', en: 'Over there is the pantry. Coffee and tea are free.' },
          pron: p('Nàbiān shì cháshuǐjiān, kāfēi hé chá dōu shì miǎnfèi de.'),
        },
        replies: [
          { text: '太好了！', translation: { vi: 'Tuyệt quá!', en: 'Great!' } },
          { text: '太好了，我每天都要喝咖啡。', translation: { vi: 'Tuyệt quá, ngày nào mình cũng phải uống cà phê.', en: 'Great, I need coffee every day.' } },
        ],
      },
      {
        partner: {
          text: '对了，你的电脑和邮箱都准备好了吗？',
          translation: { vi: 'À này, máy tính và email của bạn đã chuẩn bị xong chưa?', en: 'By the way, are your computer and email all set up?' },
          pron: p('Duì le, nǐ de diànnǎo hé yóuxiāng dōu zhǔnbèi hǎo le ma?'),
        },
        replies: [
          { text: '都准备好了，谢谢。', translation: { vi: 'Xong cả rồi, cảm ơn chị.', en: 'Everything is ready, thanks.' } },
          { text: '电脑好了，但是邮箱还不能用。', translation: { vi: 'Máy tính xong rồi, nhưng email vẫn chưa dùng được.', en: 'The computer is ready, but my email does not work yet.' } },
        ],
      },
      {
        partner: {
          text: '有问题可以找IT部的小李，他的分机号是三零八。',
          translation: { vi: 'Có vấn đề gì thì bạn tìm Tiểu Lý ở phòng IT, số máy lẻ của anh ấy là 308.', en: 'If anything goes wrong, ask Xiao Li in IT. His extension is 308.' },
          pron: p('Yǒu wèntí kěyǐ zhǎo IT bù de Xiǎo Lǐ, tā de fēnjī hào shì sān líng bā.'),
        },
        replies: [
          { text: '好的，谢谢你。', translation: { vi: 'Vâng, cảm ơn chị.', en: 'OK, thank you.' } },
          { text: '太感谢了，有问题我就找他。', translation: { vi: 'Cảm ơn chị nhiều, có vấn đề gì mình sẽ tìm anh ấy.', en: 'Thanks so much. If I have a problem I will go to him.' } },
        ],
      },
      {
        partner: {
          text: '中午我们一般一起去食堂吃饭，你也一起来吧！',
          translation: { vi: 'Buổi trưa bọn mình thường cùng xuống căng tin ăn cơm, bạn đi cùng luôn nhé!', en: 'At lunchtime we usually eat together in the canteen. Come and join us!' },
          pron: p('Zhōngwǔ wǒmen yībān yīqǐ qù shítáng chīfàn, nǐ yě yīqǐ lái ba!'),
        },
        replies: [
          { text: '好啊，谢谢！', translation: { vi: 'Được ạ, cảm ơn chị!', en: 'Sure, thanks!' } },
          { text: '好的，我们几点去？', translation: { vi: 'Vâng, mấy giờ mình đi ạ?', en: 'OK, what time do we go?' } },
        ],
      },
      {
        partner: {
          text: '十二点我来叫你。有什么不懂的随时问我，加油！',
          translation: { vi: 'Mười hai giờ mình qua gọi bạn. Có gì không hiểu cứ hỏi mình bất cứ lúc nào nhé, cố lên!', en: 'I will come and get you at twelve. Ask me anytime if there is something you do not understand. Good luck!' },
          pron: p('Shí\'èr diǎn wǒ lái jiào nǐ. Yǒu shénme bù dǒng de suíshí wèn wǒ, jiāyóu!'),
        },
        replies: [
          { text: '好的，谢谢你！', translation: { vi: 'Vâng, cảm ơn chị!', en: 'OK, thank you!' } },
          { text: '谢谢，以后请多指教！', translation: { vi: 'Cảm ơn chị, sau này mong chị chỉ bảo thêm!', en: 'Thanks, I look forward to learning from you!' } },
        ],
      },
    ],
    suggestions: [
      { level: 'word', text: '同事', pron: p('tóngshì'), meaning: { vi: 'đồng nghiệp', en: 'colleague' }, example: '他是我的新同事。', exampleTranslation: { vi: 'Anh ấy là đồng nghiệp mới của tôi.', en: 'He is my new colleague.' } },
      { level: 'word', text: '部门', pron: p('bùmén'), meaning: { vi: 'bộ phận, phòng ban', en: 'department' }, example: '你在哪个部门工作？', exampleTranslation: { vi: 'Bạn làm ở bộ phận nào?', en: 'Which department do you work in?' } },
      { level: 'word', text: '会议', pron: p('huìyì'), meaning: { vi: 'cuộc họp', en: 'meeting' }, example: '下午三点有一个会议。', exampleTranslation: { vi: 'Ba giờ chiều có một cuộc họp.', en: 'There is a meeting at 3 p.m.' } },
      { level: 'word', text: '负责', pron: p('fùzé'), meaning: { vi: 'phụ trách', en: 'to be responsible for' }, example: '我负责越南市场。', exampleTranslation: { vi: 'Tôi phụ trách thị trường Việt Nam.', en: 'I am responsible for the Vietnamese market.' } },
      { level: 'word', text: '邮箱', pron: p('yóuxiāng'), meaning: { vi: 'hộp thư, email', en: 'mailbox, email' }, example: '请把文件发到我的邮箱。', exampleTranslation: { vi: 'Vui lòng gửi tài liệu vào email của tôi.', en: 'Please send the file to my email.' } },
      { level: 'word', text: '加班', pron: p('jiābān'), meaning: { vi: 'làm thêm giờ', en: 'to work overtime' }, example: '今天我要加班。', exampleTranslation: { vi: 'Hôm nay tôi phải làm thêm giờ.', en: 'I have to work overtime today.' } },
      { level: 'phrase', text: '请多关照', pron: p('qǐng duō guānzhào'), meaning: { vi: 'mong được giúp đỡ nhiều', en: 'I look forward to working with you' }, example: '我是新来的，请多关照。', exampleTranslation: { vi: 'Tôi là người mới, mong được giúp đỡ nhiều.', en: 'I am new here. I look forward to working with you.' } },
      { level: 'phrase', text: '开会', pron: p('kāihuì'), meaning: { vi: 'họp', en: 'to have a meeting' }, example: '我们九点开会。', exampleTranslation: { vi: 'Chúng ta họp lúc chín giờ.', en: 'We have a meeting at nine.' } },
      { level: 'phrase', text: '第一天上班', pron: p('dì-yī tiān shàngbān', { vi: '一 trong số thứ tự (第一) luôn đọc yī, không biến điệu.', en: '一 in ordinals (第一) is always read yī, with no tone change.' }), meaning: { vi: 'ngày đầu đi làm', en: 'first day at work' }, example: '今天是我第一天上班，有点儿紧张。', exampleTranslation: { vi: 'Hôm nay là ngày đầu tôi đi làm, hơi hồi hộp.', en: 'Today is my first day at work; I am a bit nervous.' } },
      { level: 'phrase', text: '负责……工作', pron: p('fùzé … gōngzuò'), meaning: { vi: 'phụ trách công việc…', en: 'to be in charge of… work' }, example: '我负责翻译工作。', exampleTranslation: { vi: 'Tôi phụ trách công việc phiên dịch.', en: 'I am in charge of translation.' } },
      { level: 'phrase', text: '随时问我', pron: p('suíshí wèn wǒ'), meaning: { vi: 'cứ hỏi tôi bất cứ lúc nào', en: 'ask me anytime' }, example: '有问题随时问我。', exampleTranslation: { vi: 'Có vấn đề gì cứ hỏi tôi bất cứ lúc nào.', en: 'Ask me anytime if you have questions.' } },
      { level: 'sentence', text: '我是新来的同事。', pron: p('Wǒ shì xīn lái de tóngshì.'), meaning: { vi: 'Tôi là đồng nghiệp mới.', en: 'I am the new colleague.' }, example: '大家好，我是新来的同事阮安。', exampleTranslation: { vi: 'Chào mọi người, tôi là đồng nghiệp mới, tên là An.', en: 'Hello everyone, I am An, the new colleague.' } },
      { level: 'sentence', text: '我负责东南亚市场。', pron: p('Wǒ fùzé Dōngnányà shìchǎng.'), meaning: { vi: 'Tôi phụ trách thị trường Đông Nam Á.', en: 'I am responsible for the Southeast Asian market.' }, example: '我在销售部，负责东南亚市场。', exampleTranslation: { vi: 'Tôi ở phòng Kinh doanh, phụ trách thị trường Đông Nam Á.', en: 'I am in sales, responsible for the Southeast Asian market.' } },
      { level: 'sentence', text: '我有个问题想问一下。', pron: p('Wǒ yǒu ge wèntí xiǎng wèn yīxià.', { vi: '我有 đọc thành wó yǒu (hai thanh 3 liền nhau); 一 đọc yí trước 下 (thanh 4).', en: '我有 is read wó yǒu (two 3rd tones); 一 is read yí before 下 (4th tone).' }), meaning: { vi: 'Tôi có một câu hỏi muốn hỏi.', en: 'I have a question I would like to ask.' }, example: '王芳，我有个问题想问一下，现在方便吗？', exampleTranslation: { vi: 'Chị Vương Phương, em có câu muốn hỏi, giờ chị có tiện không?', en: 'Wang Fang, I have a question. Is now a good time?' } },
      { level: 'sentence', text: '会议几点开始？', pron: p('Huìyì jǐ diǎn kāishǐ?', T3('jí diǎn', 'jí diǎn')), meaning: { vi: 'Cuộc họp bắt đầu lúc mấy giờ?', en: 'What time does the meeting start?' }, example: '明天的会议几点开始？', exampleTranslation: { vi: 'Cuộc họp ngày mai bắt đầu lúc mấy giờ?', en: 'What time does tomorrow\'s meeting start?' } },
    ],
  },

  // ======================= interview =======================
  {
    id: 'zh-interview',
    lang: 'zh',
    scenario: 'interview',
    level: 'elementary',
    intro: {
      scenario: {
        vi: 'Bạn đi phỏng vấn xin việc ở một công ty Trung Quốc có văn phòng tại Việt Nam. Người phỏng vấn là quản lý nhân sự.',
        en: 'You have a job interview at a Chinese company with an office in Vietnam. The interviewer is the HR manager.',
        zh: '你去一家在越南有办事处的中国公司面试，面试官是人事经理。',
      },
      role: {
        vi: 'Bạn là ứng viên. Hãy tự giới thiệu, nói lý do ứng tuyển, kinh nghiệm, ưu nhược điểm, mức lương mong muốn và đặt câu hỏi cuối buổi.',
        en: 'You are the candidate. Introduce yourself, explain why you applied, describe your experience, strengths and weaknesses, expected salary, and ask a question at the end.',
        zh: '你是应聘者。请做自我介绍，说说应聘原因、工作经验、优缺点和期望工资，最后提一个问题。',
      },
    },
    turns: [
      {
        partner: {
          text: '你好，请坐。先简单介绍一下你自己吧。',
          translation: { vi: 'Chào bạn, mời ngồi. Trước tiên bạn hãy giới thiệu ngắn gọn về bản thân nhé.', en: 'Hello, please have a seat. First, please briefly introduce yourself.' },
          pron: p('Nǐ hǎo, qǐng zuò. Xiān jiǎndān jièshào yīxià nǐ zìjǐ ba.'),
        },
        replies: [
          { text: '您好，我叫阮安，是越南人。', translation: { vi: 'Chào anh/chị, tôi tên là Nguyễn An, là người Việt Nam.', en: 'Hello, my name is Nguyen An. I am Vietnamese.' } },
          { text: '您好！我叫阮安，今年二十五岁，大学学的是汉语。', translation: { vi: 'Chào anh/chị! Tôi tên là Nguyễn An, năm nay 25 tuổi, đại học tôi học chuyên ngành tiếng Trung.', en: 'Hello! My name is Nguyen An. I am 25 and I studied Chinese at university.' } },
        ],
      },
      {
        partner: {
          text: '你为什么想来我们公司工作？',
          translation: { vi: 'Tại sao bạn muốn làm việc ở công ty chúng tôi?', en: 'Why do you want to work at our company?' },
          pron: p('Nǐ wèishénme xiǎng lái wǒmen gōngsī gōngzuò?'),
        },
        replies: [
          { text: '因为我对贵公司很感兴趣。', translation: { vi: 'Vì tôi rất quan tâm đến quý công ty.', en: 'Because I am very interested in your company.' } },
          { text: '因为贵公司很有名，我也希望能用汉语工作。', translation: { vi: 'Vì quý công ty rất nổi tiếng, và tôi cũng mong được làm việc bằng tiếng Trung.', en: 'Because your company is well known, and I hope to work in Chinese.' } },
        ],
      },
      {
        partner: {
          text: '你以前做过什么工作？',
          translation: { vi: 'Trước đây bạn đã làm những công việc gì?', en: 'What jobs have you done before?' },
          pron: p('Nǐ yǐqián zuò guo shénme gōngzuò?'),
        },
        replies: [
          { text: '我刚毕业，在一家公司实习过半年。', translation: { vi: 'Tôi vừa tốt nghiệp, đã thực tập nửa năm ở một công ty.', en: 'I have just graduated. I did a six-month internship at a company.' } },
          { text: '我在一家旅行社做过两年导游。', translation: { vi: 'Tôi đã làm hướng dẫn viên hai năm ở một công ty du lịch.', en: 'I worked as a tour guide at a travel agency for two years.' } },
          { text: '我做过一年翻译，主要翻译中文和越南语。', translation: { vi: 'Tôi đã làm phiên dịch một năm, chủ yếu dịch tiếng Trung và tiếng Việt.', en: 'I worked as a translator for a year, mainly between Chinese and Vietnamese.' } },
        ],
      },
      {
        partner: {
          text: '你觉得你有什么优点和缺点？',
          translation: { vi: 'Bạn thấy mình có ưu điểm và nhược điểm gì?', en: 'What do you think your strengths and weaknesses are?' },
          pron: p('Nǐ juéde nǐ yǒu shénme yōudiǎn hé quēdiǎn?'),
        },
        replies: [
          { text: '我的优点是认真，缺点是有时候太紧张。', translation: { vi: 'Ưu điểm của tôi là chăm chỉ, cẩn thận; nhược điểm là đôi khi quá căng thẳng.', en: 'My strength is that I am conscientious; my weakness is that I sometimes get too nervous.' } },
          { text: '我工作很认真，也喜欢跟人沟通。缺点是汉语还不够好，但是我每天都在学习。', translation: { vi: 'Tôi làm việc rất nghiêm túc và thích giao tiếp với mọi người. Nhược điểm là tiếng Trung chưa đủ tốt, nhưng ngày nào tôi cũng đang học.', en: 'I work carefully and enjoy communicating with people. My weakness is that my Chinese is not good enough yet, but I study every day.' } },
        ],
      },
      {
        partner: {
          text: '如果需要经常出差，你可以吗？',
          translation: { vi: 'Nếu phải đi công tác thường xuyên, bạn có đi được không?', en: 'If the job requires frequent business trips, would that be OK for you?' },
          pron: p('Rúguǒ xūyào jīngcháng chūchāi, nǐ kěyǐ ma?'),
        },
        replies: [
          { text: '可以，没问题。', translation: { vi: 'Được, không vấn đề gì.', en: 'Yes, no problem.' } },
          { text: '可以，我很喜欢去不同的地方。', translation: { vi: 'Được ạ, tôi rất thích đi đến những nơi khác nhau.', en: 'Yes, I really like going to different places.' } },
        ],
      },
      {
        partner: {
          text: '你希望工资是多少？',
          translation: { vi: 'Bạn mong muốn mức lương bao nhiêu?', en: 'What salary are you expecting?' },
          pron: p('Nǐ xīwàng gōngzī shì duōshao?'),
        },
        replies: [
          { text: '我希望每个月一千五百万越南盾左右。', translation: { vi: 'Tôi mong khoảng 15 triệu đồng mỗi tháng.', en: 'I am hoping for around 15 million dong a month.' } },
          { text: '我希望按照公司的标准。对我来说，学习的机会更重要。', translation: { vi: 'Tôi mong theo mức chuẩn của công ty. Với tôi, cơ hội học hỏi quan trọng hơn.', en: 'I am happy to follow the company\'s standard. For me, the chance to learn matters more.' } },
        ],
      },
      {
        partner: {
          text: '好的。你有什么问题想问我们吗？',
          translation: { vi: 'Được rồi. Bạn có câu hỏi gì muốn hỏi chúng tôi không?', en: 'All right. Do you have any questions for us?' },
          pron: p('Hǎo de. Nǐ yǒu shénme wèntí xiǎng wèn wǒmen ma?'),
        },
        replies: [
          { text: '没有了，谢谢。', translation: { vi: 'Không có ạ, cảm ơn.', en: 'No, thank you.' } },
          { text: '请问什么时候能知道面试结果？', translation: { vi: 'Xin hỏi khi nào tôi có thể biết kết quả phỏng vấn?', en: 'When can I find out the result of the interview?' } },
        ],
      },
      {
        partner: {
          text: '我们会在一周内通知你。今天就到这儿，谢谢你！',
          translation: { vi: 'Chúng tôi sẽ thông báo cho bạn trong vòng một tuần. Hôm nay đến đây thôi, cảm ơn bạn!', en: 'We will let you know within a week. That is all for today, thank you!' },
          pron: p('Wǒmen huì zài yī zhōu nèi tōngzhī nǐ. Jīntiān jiù dào zhèr, xièxie nǐ!'),
        },
        replies: [
          { text: '谢谢您，再见！', translation: { vi: 'Cảm ơn anh/chị, tạm biệt!', en: 'Thank you, goodbye!' } },
          { text: '好的，谢谢您给我这个机会！', translation: { vi: 'Vâng, cảm ơn anh/chị đã cho tôi cơ hội này!', en: 'OK, thank you for giving me this opportunity!' } },
        ],
      },
    ],
    suggestions: [
      { level: 'word', text: '面试', pron: p('miànshì'), meaning: { vi: 'phỏng vấn', en: 'interview' }, example: '我明天有一个面试。', exampleTranslation: { vi: 'Ngày mai tôi có một buổi phỏng vấn.', en: 'I have an interview tomorrow.' } },
      { level: 'word', text: '经验', pron: p('jīngyàn'), meaning: { vi: 'kinh nghiệm', en: 'experience' }, example: '我没有很多经验，但是我学得很快。', exampleTranslation: { vi: 'Tôi không có nhiều kinh nghiệm, nhưng tôi học rất nhanh.', en: 'I do not have much experience, but I learn fast.' } },
      { level: 'word', text: '优点', pron: p('yōudiǎn'), meaning: { vi: 'ưu điểm', en: 'strength, advantage' }, example: '我的优点是很细心。', exampleTranslation: { vi: 'Ưu điểm của tôi là rất cẩn thận.', en: 'My strength is that I am very careful.' } },
      { level: 'word', text: '缺点', pron: p('quēdiǎn'), meaning: { vi: 'nhược điểm', en: 'weakness, shortcoming' }, example: '我的缺点是有时候太着急。', exampleTranslation: { vi: 'Nhược điểm của tôi là đôi khi quá vội vàng.', en: 'My weakness is that I am sometimes too impatient.' } },
      { level: 'word', text: '工资', pron: p('gōngzī'), meaning: { vi: 'lương', en: 'salary, wages' }, example: '这个工作的工资怎么样？', exampleTranslation: { vi: 'Lương của công việc này thế nào?', en: 'What is the salary like for this job?' } },
      { level: 'word', text: '出差', pron: p('chūchāi'), meaning: { vi: 'đi công tác', en: 'to go on a business trip' }, example: '下个星期我要去上海出差。', exampleTranslation: { vi: 'Tuần sau tôi phải đi công tác Thượng Hải.', en: 'Next week I am going to Shanghai on business.' } },
      { level: 'phrase', text: '自我介绍', pron: p('zìwǒ jièshào'), meaning: { vi: 'tự giới thiệu', en: 'self-introduction' }, example: '请你做一下自我介绍。', exampleTranslation: { vi: 'Mời bạn tự giới thiệu một chút.', en: 'Please introduce yourself.' } },
      { level: 'phrase', text: '贵公司', pron: p('guì gōngsī'), meaning: { vi: 'quý công ty (cách nói lịch sự)', en: 'your (esteemed) company' }, example: '我很想在贵公司工作。', exampleTranslation: { vi: 'Tôi rất muốn được làm việc ở quý công ty.', en: 'I would very much like to work at your company.' } },
      { level: 'phrase', text: '工作经验', pron: p('gōngzuò jīngyàn'), meaning: { vi: 'kinh nghiệm làm việc', en: 'work experience' }, example: '你有工作经验吗？', exampleTranslation: { vi: 'Bạn có kinh nghiệm làm việc không?', en: 'Do you have work experience?' } },
      { level: 'phrase', text: '没问题', pron: p('méi wèntí'), meaning: { vi: 'không vấn đề gì', en: 'no problem' }, example: '加班？没问题。', exampleTranslation: { vi: 'Làm thêm giờ à? Không vấn đề gì.', en: 'Overtime? No problem.' } },
      { level: 'phrase', text: '学习的机会', pron: p('xuéxí de jīhuì'), meaning: { vi: 'cơ hội học hỏi', en: 'a chance to learn' }, example: '这份工作有很多学习的机会。', exampleTranslation: { vi: 'Công việc này có nhiều cơ hội học hỏi.', en: 'This job offers many chances to learn.' } },
      { level: 'sentence', text: '我叫阮安，今年二十五岁。', pron: p('Wǒ jiào Ruǎn Ān, jīnnián èrshíwǔ suì.'), meaning: { vi: 'Tôi tên là Nguyễn An, năm nay 25 tuổi.', en: 'My name is Nguyen An and I am 25 years old.' }, example: '您好，我叫阮安，今年二十五岁，是越南人。', exampleTranslation: { vi: 'Chào anh/chị, tôi tên là Nguyễn An, năm nay 25 tuổi, là người Việt Nam.', en: 'Hello, my name is Nguyen An. I am 25 and I am Vietnamese.' } },
      { level: 'sentence', text: '我有两年的工作经验。', pron: p('Wǒ yǒu liǎng nián de gōngzuò jīngyàn.', { vi: '我有两 là ba thanh 3 liền nhau, thường đọc thành wǒ yóu liǎng hoặc wó yóu liǎng.', en: '我有两 is three 3rd tones in a row; it is usually read wǒ yóu liǎng or wó yóu liǎng.' }), meaning: { vi: 'Tôi có hai năm kinh nghiệm làm việc.', en: 'I have two years of work experience.' }, example: '我有两年的工作经验，做过导游。', exampleTranslation: { vi: 'Tôi có hai năm kinh nghiệm, từng làm hướng dẫn viên du lịch.', en: 'I have two years of work experience as a tour guide.' } },
      { level: 'sentence', text: '我对这个工作很感兴趣。', pron: p('Wǒ duì zhège gōngzuò hěn gǎn xìngqù.', T3('hén gǎn', 'hén gǎn')), meaning: { vi: 'Tôi rất quan tâm đến công việc này.', en: 'I am very interested in this job.' }, example: '我对这个工作很感兴趣，因为我喜欢说汉语。', exampleTranslation: { vi: 'Tôi rất quan tâm đến công việc này vì tôi thích nói tiếng Trung.', en: 'I am very interested in this job because I like speaking Chinese.' } },
      { level: 'sentence', text: '请问什么时候能知道结果？', pron: p('Qǐngwèn shénme shíhou néng zhīdào jiéguǒ?'), meaning: { vi: 'Xin hỏi khi nào có thể biết kết quả?', en: 'May I ask when I can find out the result?' }, example: '谢谢您！请问什么时候能知道结果？', exampleTranslation: { vi: 'Cảm ơn anh/chị! Xin hỏi khi nào có thể biết kết quả?', en: 'Thank you! May I ask when I will know the result?' } },
    ],
  },
];
