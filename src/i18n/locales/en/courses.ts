import type vi from '../vi/courses';
import type { Messages } from '../../messages';

const courses: Messages<typeof vi> = {
  title: 'Your languages',
  subtitle: 'Each language has its own path and progress. Pick one to keep studying.',
  firstTitle: 'Which language would you like to learn?',
  firstSubtitle: 'Choose a language to get started. You can switch or add another language at any time.',
  interfaceNote: 'The interface language (buttons, explanations) is separate from the language you study — for example, a Vietnamese interface while learning Korean.',
  current: 'Studying now',
  lessons: 'Lessons done',
  wordsLearned: 'Words learned',
  due: 'Due for review',
  lastActive: 'Last studied',
  never: 'Not yet',
  study: 'Study this',
  continue: 'Continue',
  separateNote: 'Progress, review schedules and mistakes are saved separately for each language; switching never loses progress. Your day streak and daily goal count every language together.',
};

export default courses;
