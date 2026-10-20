import type vi from '../vi/grammar';
import type { Messages } from '../../messages';

const grammar: Messages<typeof vi> = {
  title: '语法',
  empty: '本课程暂时没有语法点。',
  subtitle: '每个语法点在学到相应课程时解锁，这样你已经掌握了所需的词汇。',
  unlocksAt: '在{{lesson}}解锁',
  mistakesToFix_one: '{{count}} 个错题待订正',
  mistakesToFix_other: '{{count}} 个错题待订正',
  notFound: '找不到该语法点。',
  lockedBody: '该语法点在第{{day}}天解锁。',
  backToPath: '返回学习路线',
  learnedIn: '学习于{{lesson}}',
  exercises_one: '练习（共 {{count}} 题）',
  exercises_other: '练习（共 {{count}} 题）',
  block: {
    pattern: '句型结构',
    breakdown: '句子分析',
    examples: '例句',
    mistakes: '常见错误',
    wrong: '错误：',
    right: '正确：',
  },
};

export default grammar;
