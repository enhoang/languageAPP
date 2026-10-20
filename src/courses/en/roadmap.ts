import type { LText, RoadmapItem, Stage } from '../../types';

const L = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });

/** English course stages, following the CEFR levels. */
export const STAGES: Stage[] = [
  {
    id: 1,
    level: 'Pre-A1',
    title: L('Giai đoạn 1 · Làm quen (Pre-A1)', 'Stage 1 · Getting started (Pre-A1)', '第一阶段 · 入门（Pre-A1）'),
    name: L('Làm quen', 'Getting started', '入门'),
    description: L(
      'Bảng chữ cái, phiên âm IPA, những âm quan trọng, chào hỏi, đại từ, động từ to be và câu hỏi đơn giản.',
      'The alphabet, IPA, the essential sounds, greetings, pronouns, the verb to be and simple questions.',
      '字母表、国际音标、关键发音、问候、代词、be 动词和简单问句。',
    ),
  },
  {
    id: 2,
    level: 'A1',
    title: L('Giai đoạn 2 · Giao tiếp cơ bản (A1)', 'Stage 2 · Basic communication (A1)', '第二阶段 · 基础交际（A1）'),
    name: L('Giao tiếp cơ bản', 'Basic communication', '基础交际'),
    description: L(
      'Số đếm và tuổi, gia đình, quốc tịch, đồ vật quanh ta, have/has, giờ giấc và các ngày trong tuần.',
      'Numbers and age, family, nationalities, things around you, have/has, telling the time and days of the week.',
      '数字和年龄、家庭、国籍、身边的物品、have/has、时间和星期。',
    ),
  },
  {
    id: 3,
    level: 'A1+',
    title: L('Giai đoạn 3 · Cuộc sống hằng ngày (A1+)', 'Stage 3 · Everyday life (A1+)', '第三阶段 · 日常生活（A1+）'),
    name: L('Cuộc sống hằng ngày', 'Everyday life', '日常生活'),
    description: L(
      'Thói quen hằng ngày, ăn uống, nơi chốn trong thành phố, sở thích, mua sắm, thời tiết và thì hiện tại tiếp diễn.',
      'Daily routines, food and drink, places in town, hobbies, shopping, the weather and the present continuous.',
      '日常作息、饮食、城市里的地点、爱好、购物、天气和现在进行时。',
    ),
  },
  {
    id: 4,
    level: 'A2',
    title: L('Giai đoạn 4 · Tự tin hơn (A2)', 'Stage 4 · Growing confidence (A2)', '第四阶段 · 更加自信（A2）'),
    name: L('Tự tin hơn', 'Growing confidence', '更加自信'),
    description: L(
      'Kể chuyện quá khứ, nói về kế hoạch, so sánh, hỏi đường và đi du lịch.',
      'Talking about the past, making plans, comparing things, asking for directions and travelling.',
      '讲述过去的事、谈论计划、比较、问路和旅行。',
    ),
  },
];

/** Planned lessons that are not yet implemented (shown as "Sắp có" / "Coming soon"). */
export const ROADMAP: RoadmapItem[] = [
  { day: 8, stage: 2, title: L('Số đếm và tuổi', 'Numbers and age', '数字和年龄'), topics: L('Số 11–100 · How old are you? · I\'m … years old', 'Numbers 11–100 · How old are you? · I\'m … years old', '11–100 的数字 · How old are you? · I\'m … years old') },
  { day: 9, stage: 2, title: L('Gia đình', 'Family', '家庭'), topics: L('mother, father, brother, sister · tính từ sở hữu my/your/his/her', 'mother, father, brother, sister · possessives my/your/his/her', 'mother、father、brother、sister · 物主代词 my/your/his/her') },
  { day: 10, stage: 2, title: L('Quốc gia và quốc tịch', 'Countries and nationalities', '国家和国籍'), topics: L('Vietnam → Vietnamese · ngôn ngữ · I speak …', 'Vietnam → Vietnamese · languages · I speak …', 'Vietnam → Vietnamese · 语言 · I speak …') },
  { day: 11, stage: 2, title: L('Đồ vật quanh ta', 'Things around you', '身边的物品'), topics: L('this/that/these/those · màu sắc · What is this?', 'this/that/these/those · colours · What is this?', 'this/that/these/those · 颜色 · What is this?') },
  { day: 12, stage: 2, title: L('Have và has', 'Have and has', 'have 和 has'), topics: L('I have / she has · Do you have …? · đồ dùng học tập', 'I have / she has · Do you have …? · school things', 'I have / she has · Do you have …? · 学习用品') },
  { day: 13, stage: 2, title: L('Giờ giấc và các ngày trong tuần', 'Time and days of the week', '时间和星期'), topics: L('What time is it? · Monday–Sunday · at/on', 'What time is it? · Monday–Sunday · at/on', 'What time is it? · 星期一到星期日 · at/on') },
  { day: 14, stage: 2, title: L('Ôn tập giai đoạn 2', 'Stage 2 review', '第二阶段复习'), topics: L('Ôn tập và bài kiểm tra A1', 'Review and an A1 test', '复习和 A1 测试') },
  { day: 15, stage: 3, title: L('Thói quen hằng ngày', 'Daily routines', '日常作息'), topics: L('Thì hiện tại đơn · get up, go to school · always/usually/never', 'Present simple · get up, go to school · always/usually/never', '一般现在时 · get up、go to school · always/usually/never') },
  { day: 16, stage: 3, title: L('Ăn uống', 'Food and drink', '饮食'), topics: L('some/any · I\'d like … · gọi món', 'some/any · I\'d like … · ordering food', 'some/any · I\'d like … · 点餐') },
  { day: 17, stage: 3, title: L('Nơi chốn trong thành phố', 'Places in town', '城市里的地点'), topics: L('There is / there are · giới từ in/on/under/next to', 'There is / there are · prepositions in/on/under/next to', 'There is / there are · 介词 in/on/under/next to') },
  { day: 18, stage: 3, title: L('Sở thích', 'Likes and hobbies', '爱好'), topics: L('like + -ing · can/can\'t · thể thao và âm nhạc', 'like + -ing · can/can\'t · sports and music', 'like + -ing · can/can\'t · 运动和音乐') },
  { day: 19, stage: 3, title: L('Mua sắm', 'Shopping', '购物'), topics: L('How much is it? · giá tiền · quần áo, kích cỡ', 'How much is it? · prices · clothes and sizes', 'How much is it? · 价格 · 衣服和尺码') },
  { day: 20, stage: 3, title: L('Thời tiết và hiện tại tiếp diễn', 'Weather and the present continuous', '天气和现在进行时'), topics: L('It\'s sunny/raining · I am …-ing · bốn mùa', 'It\'s sunny/raining · I am …-ing · the four seasons', 'It\'s sunny/raining · I am …-ing · 四季') },
  { day: 21, stage: 3, title: L('Ôn tập giai đoạn 3', 'Stage 3 review', '第三阶段复习'), topics: L('Ôn tập và bài kiểm tra A1+', 'Review and an A1+ test', '复习和 A1+ 测试') },
  { day: 22, stage: 4, title: L('Was và were', 'Was and were', 'was 和 were'), topics: L('Quá khứ của to be · yesterday, last week · Where were you?', 'The past of to be · yesterday, last week · Where were you?', 'be 动词的过去式 · yesterday、last week · Where were you?') },
  { day: 23, stage: 4, title: L('Quá khứ đơn — động từ có quy tắc', 'Past simple — regular verbs', '一般过去时——规则动词'), topics: L('-ed và ba cách đọc /t/ /d/ /ɪd/ · did/didn\'t', '-ed and its three sounds /t/ /d/ /ɪd/ · did/didn\'t', '-ed 及其三种读音 /t/ /d/ /ɪd/ · did/didn\'t') },
  { day: 24, stage: 4, title: L('Quá khứ đơn — động từ bất quy tắc', 'Past simple — irregular verbs', '一般过去时——不规则动词'), topics: L('went, saw, ate, had · kể về cuối tuần', 'went, saw, ate, had · talking about your weekend', 'went、saw、ate、had · 谈谈你的周末') },
  { day: 25, stage: 4, title: L('Kế hoạch tương lai', 'Future plans', '未来计划'), topics: L('be going to · tomorrow, next week · lời mời', 'be going to · tomorrow, next week · invitations', 'be going to · tomorrow、next week · 邀请') },
  { day: 26, stage: 4, title: L('So sánh', 'Comparing things', '比较'), topics: L('So sánh hơn -er / more · so sánh nhất -est / most', 'Comparatives -er / more · superlatives -est / most', '比较级 -er / more · 最高级 -est / most') },
  { day: 27, stage: 4, title: L('Hỏi đường và du lịch', 'Directions and travel', '问路和旅行'), topics: L('Where is …? · turn left/right · go straight · phương tiện', 'Where is …? · turn left/right · go straight · transport', 'Where is …? · turn left/right · go straight · 交通工具') },
  { day: 28, stage: 4, title: L('Ôn tập tổng hợp', 'Final review', '总复习'), topics: L('Ôn tập và bài kiểm tra A2', 'Review and an A2 test', '复习和 A2 测试') },
];
