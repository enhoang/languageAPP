import type vi from '../vi/tests';
import type { Messages } from '../../messages';

const tests: Messages<typeof vi> = {
  title: 'Tests',
  subtitle: '{{course}}: mini tests only ask about lessons you have completed (beginners: Day 1). Scores are based on your actual answers.',
  skill: 'Skill',
  length: 'Questions',
  start: 'Start test',
  newTest: 'New test',
  changeType: 'Change test type',
  notEnough: 'There isn’t enough content for this test type yet. Study more lessons on the learning path.',
  cancelTest: 'Cancel test',
  fewer_one: 'Only {{count}} question matches the content you have unlocked so far.',
  fewer_other: 'Only {{count}} questions match the content you have unlocked so far.',
  history: 'Test history',
  noHistory: 'No tests taken yet.',
};

export default tests;
