import type vi from '../vi/path';
import type { Messages } from '../../messages';

const path: Messages<typeof vi> = {
  subtitle: '按顺序学习——完成上一课（课末测验达到 {{pct}}% 以上）后，下一课才会解锁。',
  lessonsCount_one: '{{done}}/{{count}} 课',
  lessonsCount_other: '{{done}}/{{count}} 课',
  dayShort: '{{day}}',
  inProgress: '学习中',
  next: '下一课',
  best: '最高 {{pct}}%',
  unlockHint: '完成第{{day}}天后解锁',
  comingSoon: '即将推出',
  planned: '计划中的课程（MVP 版本暂未开放）',
  plannedDay: '第{{day}}天：',
  title: '{{name}}学习路线',
  frameworkNote: '学习路线按难度由浅入深编排，适合零基础学习者，参照 {{framework}} 体系。各阶段标注的等级仅供参考：内容尚未与 {{framework}} 大纲或考试正式对照。',
};

export default path;
