import type vi from '../vi/results';
import type { Messages } from '../../messages';

const results: Messages<typeof vi> = {
  score_one: '{{correct}} of {{count}} question correct',
  score_other: '{{correct}} of {{count}} questions correct',
  passed: 'You passed!',
  failed: 'You need at least {{mark}}% to complete this. Review the explanations and try again.',
  bySkill: 'Results by skill',
  wrongTitle: 'Wrong answers ({{n}})',
  yourAnswer: 'Your answer: ',
  correctAnswer: 'Correct answer: ',
  suggestions: 'Review suggestions',
  queued: 'Words you got wrong have been moved to the front of your review queue.',
};

export default results;
