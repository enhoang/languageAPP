import type vi from '../vi/grammar';
import type { Messages } from '../../messages';

const grammar: Messages<typeof vi> = {
  title: 'Grammar',
  empty: 'This course has no grammar points yet.',
  subtitle: 'Each grammar point unlocks when you reach the lesson that teaches it, so you already know the words you need.',
  unlocksAt: 'Unlocks on {{lesson}}',
  mistakesToFix_one: '{{count}} mistake to fix',
  mistakesToFix_other: '{{count}} mistakes to fix',
  notFound: 'Grammar point not found.',
  lockedBody: 'This grammar point unlocks on Day {{day}}.',
  backToPath: 'Back to learning path',
  learnedIn: 'Taught in {{lesson}}',
  exercises_one: 'Exercises ({{count}} question)',
  exercises_other: 'Exercises ({{count}} questions)',
  block: {
    pattern: 'Pattern',
    breakdown: 'Sentence breakdown',
    examples: 'Examples',
    mistakes: 'Common mistakes',
    wrong: 'Wrong:',
    right: 'Right:',
  },
};

export default grammar;
