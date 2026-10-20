import type vi from '../vi/lesson';
import type { Messages } from '../../messages';

const lesson: Messages<typeof vi> = {
  notFound: '找不到这节课。',
  backToPath: '返回学习路线',
  locked: {
    title: '本课尚未解锁',
    body: '请先完成{{lesson}}。',
    goTo: '前往第{{day}}天',
  },
  completed: '已完成',
  switching: '正在切换到{{course}}课程……',
  noPrevious: '请先完成上一课。',
  steps: {
    label: '课程步骤',
    goals: '目标',
    lesson: '课文',
    practice: '练习',
    quiz: '测验',
    summary: '总结',
  },
  objectives: '学习目标',
  intro: '导入',
  enterLesson: '开始学习',
  toPractice: '去练习',
  practice: {
    intro: '引导练习：每道题后都会显示讲解。这部分不计入完成本课的成绩。',
    finish: '完成练习',
    done: '练习完成：答对 {{correct}}/{{total}}',
    ready: '准备好做小测验了吗？得分达到 {{pass}}% 及以上即可完成本课。',
    again: '再练一次',
    takeQuiz: '开始测验',
    skip: '跳过，直接测验',
  },
  quiz: {
    intro_one: '知识测验：共 {{count}} 题 · 需达到 {{pass}}% 及以上。',
    intro_other: '知识测验：共 {{count}} 题 · 需达到 {{pass}}% 及以上。',
    retake: '重新测验',
  },
  summary: {
    title: '本课小结',
    bestScore_one: '测验最高分：{{score}}%（共做 {{count}} 次）',
    bestScore_other: '测验最高分：{{score}}%（共做 {{count}} 次）',
    completedTitle: '你已完成第{{day}}天的学习！',
    completedBody: '本课生词已加入复习计划（第一次复习：明天）。',
    nextLesson: '下一课：第{{day}}天',
    viewPath: '查看学习路线',
    morePractice: '继续练习',
    hint: '小建议：每天学一课，学新课前先复习到期的生词，记得更牢。',
    notCompletedTitle: '本课尚未完成',
    notCompletedBody: '请复习课文并重新测验（需达到 {{pass}}% 及以上）。',
    reviewLesson: '复习课文',
    retakeQuiz: '重新测验',
  },
};

export default lesson;
