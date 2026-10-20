import type vi from '../vi/chart';
import type { Messages } from '../../messages';

const chart: Messages<typeof vi> = {
  goal_one: '目标 {{count}} 分钟',
  goal_other: '目标 {{count}} 分钟',
  barLabel: '{{day}}：{{minutes}}，{{answers}}',
  answers_one: '答题 {{count}} 次',
  answers_other: '答题 {{count}} 次',
  caption: '最近 7 天的学习时长（分钟）',
  colDay: '日期',
  colMinutes: '分钟',
  colAnswers: '答题数',
};

export default chart;
