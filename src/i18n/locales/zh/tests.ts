import type vi from '../vi/tests';
import type { Messages } from '../../messages';

const tests: Messages<typeof vi> = {
  title: '测试',
  subtitle: '{{course}}：小测试只考你已完成课程的内容（初学者：第1天）。分数根据你的实际作答计算。',
  skill: '技能',
  length: '题目数量',
  start: '开始测试',
  newTest: '再测一次',
  changeType: '更换测试类型',
  notEnough: '这类测试的内容还不够。请在学习路线中继续学习更多课程。',
  cancelTest: '放弃测试',
  fewer_one: '目前只有 {{count}} 道题符合你已解锁的内容。',
  fewer_other: '目前只有 {{count}} 道题符合你已解锁的内容。',
  history: '测试记录',
  noHistory: '还没有做过测试。',
};

export default tests;
