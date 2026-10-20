import type { LText, RoadmapItem, Stage } from '../../types';

export const STAGES: Stage[] = [
  {
    id: 1,
    level: 'HSK 1',
    title: { vi: 'Giai đoạn 1 · Nền tảng', en: 'Stage 1 · Foundations', zh: '第一阶段 · 基础' },
    name: { vi: 'Nền tảng', en: 'Foundations', zh: '基础' },
    description: { vi: 'Pinyin, thanh điệu, phát âm và làm quen chữ Hán.', en: 'Pinyin, tones, pronunciation and a first look at Chinese characters.', zh: '拼音、声调、发音，初识汉字。' },
  },
  {
    id: 2,
    level: 'HSK 1',
    title: { vi: 'Giai đoạn 2 · Từ và câu đầu tiên', en: 'Stage 2 · First words and sentences', zh: '第二阶段 · 最初的词语和句子' },
    name: { vi: 'Từ và câu đầu tiên', en: 'First words and sentences', zh: '最初的词语和句子' },
    description: { vi: 'Chào hỏi, đại từ, 是 / 不是, câu hỏi 吗, tuổi, gia đình, ngày tháng, ăn uống, nơi chốn (HSK 1).', en: 'Greetings, pronouns, 是 / 不是, 吗 questions, age, family, dates, food and places (HSK 1).', zh: '问候、代词、是 / 不是、吗字疑问句、年龄、家庭、日期、饮食、地点（HSK 1）。' },
  },
  {
    id: 3,
    level: 'HSK 1–2',
    title: { vi: 'Giai đoạn 3 · Giao tiếp hằng ngày', en: 'Stage 3 · Everyday conversation', zh: '第三阶段 · 日常交际' },
    name: { vi: 'Giao tiếp hằng ngày', en: 'Everyday conversation', zh: '日常交际' },
    description: { vi: 'Giờ giấc, thời tiết, xin phép, 在…呢, 了, 是…的 — hoàn thành HSK 1.', en: 'Time, weather, asking permission, 在…呢, 了, 是…的 — completing HSK 1.', zh: '时间、天气、请求、在……呢、了、是……的——学完 HSK 1。' },
  },
  {
    id: 4,
    level: 'HSK 2',
    title: { vi: 'Giai đoạn 4 · Tự tin hơn', en: 'Stage 4 · Growing confidence', zh: '第四阶段 · 更加自信' },
    name: { vi: 'Tự tin hơn', en: 'Growing confidence', zh: '更加自信' },
    description: { vi: 'Sinh hoạt, màu sắc, mua bán, đường đi, so sánh 比, 过 / 着 (HSK 2).', en: 'Daily routine, colours, shopping, directions, 比 comparisons, 过 / 着 (HSK 2).', zh: '日常作息、颜色、买东西、问路、比字句、过 / 着（HSK 2）。' },
  },
];

const L = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });

/** Planned lessons that are not yet implemented (shown as "Sắp có" / "Coming soon"). */
export const ROADMAP: RoadmapItem[] = [
  // ---- Stage 2 (cont.): HSK 1 core ----
  { day: 8, stage: 2, title: L('Số đếm, tuổi và 的', 'Numbers, age and 的', '数字、年龄和“的”'), topics: L('几, 多大, 岁, 今年 · số đến 100 · 两 · 我的 (HSK 1)', '几, 多大, 岁, 今年 · numbers up to 100 · 两 · 我的 (HSK 1)', '几、多大、岁、今年 · 100 以内的数字 · 两 · 我的（HSK 1）') },
  { day: 9, stage: 2, title: L('Gia đình: 有 / 没有', 'Family: 有 / 没有', '家庭：有 / 没有'), topics: L('家, 儿子, 女儿 · 有 / 没有 · lượng từ 个, 口 (HSK 1)', '家, 儿子, 女儿 · 有 / 没有 · measure words 个, 口 (HSK 1)', '家、儿子、女儿 · 有 / 没有 · 量词个、口（HSK 1）') },
  { day: 10, stage: 2, title: L('Khả năng: 会', 'Abilities: 会', '能力：会'), topics: L('会 + động từ · 说, 写, 读, 做 · 字 · 怎么 (HSK 1)', '会 + verb · 说, 写, 读, 做 · 字 · 怎么 (HSK 1)', '会 + 动词 · 说、写、读、做 · 字 · 怎么（HSK 1）') },
  { day: 11, stage: 2, title: L('Ngày tháng và thứ', 'Dates and days of the week', '日期和星期'), topics: L('今天, 明天, 昨天 · 年, 月, 号, 星期 · 去 (HSK 1)', '今天, 明天, 昨天 · 年, 月, 号, 星期 · 去 (HSK 1)', '今天、明天、昨天 · 年、月、号、星期 · 去（HSK 1）') },
  { day: 12, stage: 2, title: L('Muốn ăn uống gì: 想', 'What would you like? 想', '想吃什么：想'), topics: L('想 + động từ · 米饭, 菜, 水果, 杯子 · 多少, 钱, 块 (HSK 1)', '想 + verb · 米饭, 菜, 水果, 杯子 · 多少, 钱, 块 (HSK 1)', '想 + 动词 · 米饭、菜、水果、杯子 · 多少、钱、块（HSK 1）') },
  { day: 13, stage: 2, title: L('Ở đâu? 在 và nơi làm việc', 'Where? 在 and workplaces', '在哪儿？“在”和工作地点'), topics: L('在 + nơi chốn · 哪儿, 这儿, 那儿 · 工作, 医院, 医生, 商店, 学校 (HSK 1)', '在 + place · 哪儿, 这儿, 那儿 · 工作, 医院, 医生, 商店, 学校 (HSK 1)', '在 + 处所 · 哪儿、这儿、那儿 · 工作、医院、医生、商店、学校（HSK 1）') },
  { day: 14, stage: 2, title: L('Ôn tập giai đoạn 2', 'Stage 2 review', '第二阶段复习'), topics: L('Bài kiểm tra tổng hợp từ và mẫu câu HSK 1 đã học', 'Comprehensive test of the HSK 1 words and patterns so far', 'HSK 1 已学词语和句型综合测试') },
  // ---- Stage 3: rest of HSK 1, first steps into HSK 2 ----
  { day: 15, stage: 3, title: L('Giờ giấc', 'Telling the time', '时间'), topics: L('现在, 点, 分, 中午, 上午, 下午 · 时候 (HSK 1)', '现在, 点, 分, 中午, 上午, 下午 · 时候 (HSK 1)', '现在、点、分、中午、上午、下午 · 时候（HSK 1）') },
  { day: 16, stage: 3, title: L('Thời tiết: 怎么样, 太…了', 'Weather: 怎么样, 太…了', '天气：怎么样、太……了'), topics: L('天气, 冷, 热, 下雨 · 怎么样 · 太…了 (HSK 1)', '天气, 冷, 热, 下雨 · 怎么样 · 太…了 (HSK 1)', '天气、冷、热、下雨 · 怎么样 · 太……了（HSK 1）') },
  { day: 17, stage: 3, title: L('Xin phép và gọi điện: 能, 请', 'Asking permission and phoning: 能, 请', '请求和打电话：能、请'), topics: L('能, 请, 坐 · 喂, 打电话 · 桌子, 椅子 (HSK 1)', '能, 请, 坐 · 喂, 打电话 · 桌子, 椅子 (HSK 1)', '能、请、坐 · 喂、打电话 · 桌子、椅子（HSK 1）') },
  { day: 18, stage: 3, title: L('Đang làm gì: 在…呢', 'What are you doing? 在…呢', '在做什么：在……呢'), topics: L('在 + động từ + 呢 · 看, 听, 睡觉, 看电视, 做饭 (HSK 1)', '在 + verb + 呢 · 看, 听, 睡觉, 看电视, 做饭 (HSK 1)', '在 + 动词 + 呢 · 看、听、睡觉、看电视、做饭（HSK 1）') },
  { day: 19, stage: 3, title: L('Mua sắm và 了', 'Shopping and 了', '购物和“了”'), topics: L('买, 衣服, 些, 本 · 了 (hoàn thành) · 多少钱 (HSK 1)', '买, 衣服, 些, 本 · 了 (completed action) · 多少钱 (HSK 1)', '买、衣服、些、本 · 了（完成）· 多少钱（HSK 1）') },
  { day: 20, stage: 3, title: L('Đi lại: 是…的', 'Getting around: 是…的', '出行：是……的'), topics: L('是…的 · 坐, 飞机, 出租车, 开, 来, 回 (HSK 1)', '是…的 · 坐, 飞机, 出租车, 开, 来, 回 (HSK 1)', '是……的 · 坐、飞机、出租车、开、来、回（HSK 1）') },
  { day: 21, stage: 3, title: L('Ôn tập & thi thử HSK 1', 'HSK 1 review & mock test', 'HSK 1 复习和模拟测试'), topics: L('150 từ HSK 1 · nghe và đọc theo dạng đề HSK 1', 'The 150 HSK 1 words · listening and reading in the HSK 1 format', 'HSK 1 的 150 个词 · 按 HSK 1 题型练习听力和阅读') },
  // ---- Stage 4: HSK 2 ----
  { day: 22, stage: 4, title: L('Sinh hoạt hằng ngày', 'Daily routine', '日常作息'), topics: L('每天, 起床, 早上, 晚上, 小时, 运动, 身体 (HSK 2)', '每天, 起床, 早上, 晚上, 小时, 运动, 身体 (HSK 2)', '每天、起床、早上、晚上、小时、运动、身体（HSK 2）') },
  { day: 23, stage: 4, title: L('Màu sắc và vị trí', 'Colours and positions', '颜色和方位'), topics: L('红色, 白色, 黑色 · 左边, 右边, 旁边 · cụm 的 (HSK 2)', '红色, 白色, 黑色 · 左边, 右边, 旁边 · 的 phrases (HSK 2)', '红色、白色、黑色 · 左边、右边、旁边 · “的”字短语（HSK 2）') },
  { day: 24, stage: 4, title: L('Mua bán và mặc cả: 吧', 'Buying and bargaining: 吧', '买东西：吧'), topics: L('件, 便宜, 贵, 卖, 一下 · 吧 · 就 (HSK 2)', '件, 便宜, 贵, 卖, 一下 · 吧 · 就 (HSK 2)', '件、便宜、贵、卖、一下 · 吧 · 就（HSK 2）') },
  { day: 25, stage: 4, title: L('Đường đi: 离, 从, 到', 'Distance and directions: 离, 从, 到', '路程和方向：离、从、到'), topics: L('离, 远, 近 · 从…到… · 走, 路, 公共汽车 (HSK 2)', '离, 远, 近 · 从…到… · 走, 路, 公共汽车 (HSK 2)', '离、远、近 · 从……到…… · 走、路、公共汽车（HSK 2）') },
  { day: 26, stage: 4, title: L('So sánh: 比', 'Comparisons: 比', '比较：比'), topics: L('A 比 B + tính từ · 一点儿 · 高, 长, 快, 慢 (HSK 2)', 'A 比 B + adjective · 一点儿 · 高, 长, 快, 慢 (HSK 2)', 'A 比 B + 形容词 · 一点儿 · 高、长、快、慢（HSK 2）') },
  { day: 27, stage: 4, title: L('Trải nghiệm và trạng thái: 过, 着, 正在', 'Experience and states: 过, 着, 正在', '经历和状态：过、着、正在'), topics: L('过 (đã từng) · 着 · 正在 · 就要…了 · bổ ngữ 得 (HSK 2)', '过 (have ever) · 着 · 正在 · 就要…了 · 得 complements (HSK 2)', '过（经历）· 着 · 正在 · 就要……了 · “得”字补语（HSK 2）') },
  { day: 28, stage: 4, title: L('Ôn tập & thi thử HSK 2', 'HSK 2 review & mock test', 'HSK 2 复习和模拟测试'), topics: L('300 từ HSK 2 · nghe và đọc theo dạng đề HSK 2', 'The 300 HSK 2 words · listening and reading in the HSK 2 format', 'HSK 2 的 300 个词 · 按 HSK 2 题型练习听力和阅读') },
];
