import type vi from '../vi/results';
import type { Messages } from '../../messages';

const results: Messages<typeof vi> = {
  score_one: '答对 {{correct}} / {{count}} 题',
  score_other: '答对 {{correct}} / {{count}} 题',
  passed: '已达标！',
  failed: '至少需要达到 {{mark}}% 才能完成。请看看解析，再试一次吧。',
  bySkill: '各项技能成绩',
  wrongTitle: '答错的题目（{{n}}）',
  yourAnswer: '你的回答：',
  correctAnswer: '正确答案：',
  suggestions: '复习建议',
  queued: '答错的词语已移到复习队列的最前面。',
};

export default results;
