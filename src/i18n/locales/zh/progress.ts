import type vi from '../vi/progress';
import type { Messages } from '../../messages';

const progress: Messages<typeof vi> = {
  /** Page title. {{name}} = course name */
  title: '{{name}}学习进度',
  subtitle: '所有数据都根据保存在此浏览器中的真实学习记录计算。',
  recommended: '下一步建议',
  stat: {
    lessonsCompleted: '已完成课程',
    totalTime: '总学习时长',
    accuracy: '正确率',
    answered_one: '已答 {{count}} 题',
    answered_other: '已答 {{count}} 题',
    streak: '连续天数',
    allLanguages: '所有语言',
  },
  activity: '最近 7 天的学习',
  activityNote: '最近 7 天学习{{name}}的时间。每日目标按所有语言合计。',
  mastery: '词汇掌握程度',
  masteryAria: '掌握程度分布',
  skills: '技能',
  skillsEmpty: '暂无数据。做些练习就能看到各项技能的成绩。',
  weak: '需要加强的地方',
  weakEmpty: '暂未发现薄弱环节（需要更多答题数据，或者你做得很好！）。',
  reviewQueue_one: '复习队列（{{count}}）',
  reviewQueue_other: '复习队列（{{count}}）',
  reviewNow: '立即复习',
  noDue: '没有到期的词。',
  lapses_one: '答错 {{count}} 次',
  lapses_other: '答错 {{count}} 次',
  lapsedLegend: '粉色：刚刚遗忘的词（优先复习）。',
  allCourses: '各语言概况',
  table: {
    course: '语言',
    lessons: '已学完',
    words: '已学的词',
    accuracy: '正确率',
    quizzes: '测验次数',
  },
  lessons: '课程',
  inProgress: '学习中',
  inProgressBest: '学习中 · 最高 {{pct}}%',
  notStarted: '未开始',
  quizHistory: '测验记录',
  noQuizzes: '还没有测验记录。',
};

export default progress;
