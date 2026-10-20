import type vi from '../vi/chart';
import type { Messages } from '../../messages';

const chart: Messages<typeof vi> = {
  goal_one: 'Goal: {{count}} min',
  goal_other: 'Goal: {{count}} min',
  barLabel: '{{day}}: {{minutes}}, {{answers}}',
  answers_one: '{{count}} answer',
  answers_other: '{{count}} answers',
  caption: 'Minutes studied over the last 7 days',
  colDay: 'Day',
  colMinutes: 'Minutes',
  colAnswers: 'Answers',
};

export default chart;
