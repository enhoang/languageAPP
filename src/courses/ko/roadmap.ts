import type { LText, RoadmapItem, Stage } from '../../types';

const L = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });

export const STAGES: Stage[] = [
  {
    id: 1,
    level: 'TOPIK I · 1',
    title: L('Giai đoạn 1 · Hangul & câu đầu tiên (TOPIK I · 1)', 'Stage 1 · Hangul & first sentences (TOPIK I · 1)', '第一阶段 · 韩文字母与最初的句子（TOPIK I · 1级）'),
    name: L('Hangul & câu đầu tiên', 'Hangul & first sentences', '韩文字母与最初的句子'),
    description: L(
      'Đọc và viết Hangul, phụ âm cuối và quy tắc biến âm, chào hỏi, tự giới thiệu, trợ từ cơ bản, câu hỏi đơn giản.',
      'Reading and writing Hangul, final consonants and sound changes, greetings, introductions, basic particles, simple questions.',
      '读写韩文、收音和音变规则、问候、自我介绍、基本助词、简单的疑问句。',
    ),
  },
  {
    id: 2,
    level: 'TOPIK I · 1',
    title: L('Giai đoạn 2 · Cuộc sống quanh ta (TOPIK I · 1)', 'Stage 2 · The world around you (TOPIK I · 1)', '第二阶段 · 身边的生活（TOPIK I · 1级）'),
    name: L('Cuộc sống quanh ta', 'The world around you', '身边的生活'),
    description: L(
      'Số Hán – Hàn và số thuần Hàn, giờ giấc, ngày tháng, lượng từ, gia đình, đồ vật, phủ định 안 / 못.',
      'Sino-Korean and native numbers, time, dates, counters, family, things around you, negation with 안 / 못.',
      '汉字词数字和固有词数字、时间、日期、量词、家庭、身边的东西、안 / 못 否定。',
    ),
  },
  {
    id: 3,
    level: 'TOPIK I · 1–2',
    title: L('Giai đoạn 3 · Giao tiếp hằng ngày (TOPIK I · 1–2)', 'Stage 3 · Everyday conversation (TOPIK I · 1–2)', '第三阶段 · 日常交际（TOPIK I · 1–2级）'),
    name: L('Giao tiếp hằng ngày', 'Everyday conversation', '日常交际'),
    description: L(
      'Mua sắm và giá cả, ăn uống và gọi món, địa điểm và chỉ đường, sinh hoạt hằng ngày, thì quá khứ -았/었어요.',
      'Shopping and prices, food and ordering, places and directions, daily routine, the past tense -았/었어요.',
      '购物和价格、饮食和点菜、地点和问路、日常生活、过去时 -았/었어요。',
    ),
  },
  {
    id: 4,
    level: 'TOPIK I · 2',
    title: L('Giai đoạn 4 · Tự tin hơn (TOPIK I · 2)', 'Stage 4 · Growing confidence (TOPIK I · 2)', '第四阶段 · 更加自信（TOPIK I · 2级）'),
    name: L('Tự tin hơn', 'Growing confidence', '更加自信'),
    description: L(
      'Mong muốn -고 싶어요, tương lai -(으)ㄹ 거예요, kính ngữ -(으)시-, nối câu -고 / -아서, luyện đề TOPIK I.',
      'Wishes with -고 싶어요, the future -(으)ㄹ 거예요, honorific -(으)시-, linking clauses with -고 / -아서, TOPIK I practice.',
      '愿望 -고 싶어요、将来时 -(으)ㄹ 거예요、敬语 -(으)시-、连接语尾 -고 / -아서、TOPIK I 练习。',
    ),
  },
];

/** Planned lessons that are not yet implemented (shown as "Sắp có" / "Coming soon"). */
export const ROADMAP: RoadmapItem[] = [
  { day: 8, stage: 2, title: L('Số Hán – Hàn & tiền', 'Sino-Korean numbers & money', '汉字词数字和钱'), topics: L('일, 이, 삼… đến 10.000 · 원 · 얼마예요?', '일, 이, 삼… up to 10,000 · 원 · 얼마예요?', '일、이、삼……到一万 · 원 · 얼마예요?') },
  { day: 9, stage: 2, title: L('Số thuần Hàn & lượng từ', 'Native numbers & counters', '固有词数字和量词'), topics: L('하나, 둘, 셋… · 개, 명, 살, 잔 · 몇', '하나, 둘, 셋… · 개, 명, 살, 잔 · 몇', '하나、둘、셋…… · 개、명、살、잔 · 몇') },
  { day: 10, stage: 2, title: L('Giờ giấc', 'Telling the time', '时间表达'), topics: L('시 (số thuần Hàn) + 분 (số Hán – Hàn) · 몇 시예요? · 반', '시 (native) + 분 (Sino-Korean) · 몇 시예요? · 반', '시（固有词）+ 분（汉字词）· 몇 시예요? · 반') },
  { day: 11, stage: 2, title: L('Ngày, tháng, thứ', 'Dates and days of the week', '日期和星期'), topics: L('월, 일, 요일 · 오늘, 내일, 어제 · trợ từ 에 (thời gian)', '월, 일, 요일 · 오늘, 내일, 어제 · particle 에 (time)', '월、일、요일 · 오늘、내일、어제 · 助词 에（时间）') },
  { day: 12, stage: 2, title: L('Gia đình', 'Family', '家庭'), topics: L('가족, 아버지, 형/오빠, 누나/언니, 동생 · 있어요 / 없어요 · 의 (của)', '가족, 아버지, 형/오빠, 누나/언니, 동생 · 있어요 / 없어요 · 의 (possessive)', '가족、아버지、형/오빠、누나/언니、동생 · 있어요 / 없어요 · 의（所属）') },
  { day: 13, stage: 2, title: L('Phủ định 안 / 못 và -지 않아요', 'Negation: 안 / 못 and -지 않아요', '否定：안 / 못 和 -지 않아요'), topics: L('안 가요, 못 해요 · 아니에요', '안 가요, 못 해요 · 아니에요', '안 가요、못 해요 · 아니에요') },
  { day: 14, stage: 2, title: L('Ôn tập giai đoạn 2', 'Stage 2 review', '第二阶段复习'), topics: L('Số, giờ, ngày tháng, gia đình · bài kiểm tra tổng hợp', 'Numbers, time, dates, family · comprehensive test', '数字、时间、日期、家庭 · 综合测试') },
  { day: 15, stage: 3, title: L('Mua sắm & giá cả', 'Shopping & prices', '购物和价格'), topics: L('주세요 · 얼마예요? · 비싸요 / 싸요 · 하고 (và)', '주세요 · 얼마예요? · 비싸요 / 싸요 · 하고 (and)', '주세요 · 얼마예요? · 비싸요 / 싸요 · 하고（和）') },
  { day: 16, stage: 3, title: L('Đồ ăn & gọi món', 'Food & ordering', '饮食和点菜'), topics: L('메뉴, 김치찌개, 비빔밥 · 맛있어요 / 맛없어요 · -(으)세요 khi gọi món', '메뉴, 김치찌개, 비빔밥 · 맛있어요 / 맛없어요 · -(으)세요 when ordering', '메뉴、김치찌개、비빔밥 · 맛있어요 / 맛없어요 · 点菜时用 -(으)세요') },
  { day: 17, stage: 3, title: L('Địa điểm', 'Places', '地点'), topics: L('학교, 병원, 식당, 은행 · 에 가요 · 에서 (tại)', '학교, 병원, 식당, 은행 · 에 가요 · 에서 (at)', '학교、병원、식당、은행 · 에 가요 · 에서（在）') },
  { day: 18, stage: 3, title: L('Vị trí & chỉ đường', 'Location & directions', '位置和问路'), topics: L('위, 아래, 앞, 뒤, 옆 · 왼쪽 / 오른쪽 · 어떻게 가요?', '위, 아래, 앞, 뒤, 옆 · 왼쪽 / 오른쪽 · 어떻게 가요?', '위、아래、앞、뒤、옆 · 왼쪽 / 오른쪽 · 어떻게 가요?') },
  { day: 19, stage: 3, title: L('Sinh hoạt hằng ngày', 'Daily routine', '日常生活'), topics: L('일어나요, 공부해요, 일해요, 자요 · trạng từ tần suất', '일어나요, 공부해요, 일해요, 자요 · frequency adverbs', '일어나요、공부해요、일해요、자요 · 频率副词') },
  { day: 20, stage: 3, title: L('Thì quá khứ -았/었어요', 'Past tense -았/었어요', '过去时 -았/었어요'), topics: L('갔어요, 먹었어요, 했어요 · 어제, 지난주', '갔어요, 먹었어요, 했어요 · 어제, 지난주', '갔어요、먹었어요、했어요 · 어제、지난주') },
  { day: 21, stage: 3, title: L('Ôn tập giai đoạn 3', 'Stage 3 review', '第三阶段复习'), topics: L('Hội thoại mua sắm, gọi món, hỏi đường · bài kiểm tra', 'Shopping, ordering and directions dialogues · test', '购物、点菜、问路对话 · 测试') },
  { day: 22, stage: 4, title: L('Mong muốn -고 싶어요', 'Wishes: -고 싶어요', '愿望：-고 싶어요'), topics: L('가고 싶어요, 먹고 싶어요 · 뭐 하고 싶어요?', '가고 싶어요, 먹고 싶어요 · 뭐 하고 싶어요?', '가고 싶어요、먹고 싶어요 · 뭐 하고 싶어요?') },
  { day: 23, stage: 4, title: L('Kế hoạch & tương lai', 'Plans & the future', '计划和将来'), topics: L('-(으)ㄹ 거예요 · 주말, 다음 주 · -(으)ㄹ까요? (rủ rê)', '-(으)ㄹ 거예요 · 주말, 다음 주 · -(으)ㄹ까요? (suggestions)', '-(으)ㄹ 거예요 · 주말、다음 주 · -(으)ㄹ까요?（提议）') },
  { day: 24, stage: 4, title: L('Kính ngữ -(으)시-', 'Honorifics -(으)시-', '敬语 -(으)시-'), topics: L('가세요, 하셨어요 · 드세요, 계세요, 주무세요 · 께서', '가세요, 하셨어요 · 드세요, 계세요, 주무세요 · 께서', '가세요、하셨어요 · 드세요、계세요、주무세요 · 께서') },
  { day: 25, stage: 4, title: L('Sở thích & thời tiết', 'Hobbies & weather', '爱好和天气'), topics: L('취미, 좋아해요 · 날씨, 더워요, 추워요 · bất quy tắc ㅂ', '취미, 좋아해요 · 날씨, 더워요, 추워요 · ㅂ-irregular', '취미、좋아해요 · 날씨、더워요、추워요 · ㅂ 不规则') },
  { day: 26, stage: 4, title: L('Nối câu -고 / -아서 / -지만', 'Linking clauses: -고 / -아서 / -지만', '连接句子：-고 / -아서 / -지만'), topics: L('và, vì… nên, nhưng · câu dài hơn', 'and, because, but · longer sentences', '和、因为……所以、但是 · 更长的句子') },
  { day: 27, stage: 4, title: L('Luyện đề TOPIK I: nghe', 'TOPIK I practice: listening', 'TOPIK I 练习：听力'), topics: L('Dạng câu hỏi nghe TOPIK I · chọn tranh, chọn câu trả lời', 'TOPIK I listening question types · choose the picture, choose the reply', 'TOPIK I 听力题型 · 选图、选回答') },
  { day: 28, stage: 4, title: L('Luyện đề TOPIK I: đọc', 'TOPIK I practice: reading', 'TOPIK I 练习：阅读'), topics: L('Dạng câu hỏi đọc TOPIK I · điền chỗ trống, đọc thông báo ngắn', 'TOPIK I reading question types · fill the gap, read short notices', 'TOPIK I 阅读题型 · 填空、阅读短通知') },
];
