import type vi from '../vi/progress';
import type { Messages } from '../../messages';

const progress: Messages<typeof vi> = {
  /** Page title. {{name}} = course name */
  title: '{{name}} progress',
  subtitle: 'All figures are calculated from your real study data saved in this browser.',
  recommended: 'Recommended next',
  stat: {
    lessonsCompleted: 'Lessons completed',
    totalTime: 'Total time',
    accuracy: 'Accuracy',
    answered_one: '{{count}} question answered',
    answered_other: '{{count}} questions answered',
    streak: 'Day streak',
    allLanguages: 'All languages',
  },
  activity: 'Last 7 days of activity',
  activityNote: 'Time spent on {{name}} over the last 7 days. The daily goal counts all languages together.',
  mastery: 'Vocabulary mastery',
  masteryAria: 'Distribution of mastery levels',
  skills: 'Skills',
  skillsEmpty: 'No data yet. Do some exercises to see results by skill.',
  weak: 'Areas to work on',
  weakEmpty: 'No weak areas found yet (more answers are needed — or you’re doing great!).',
  reviewQueue_one: 'Review queue ({{count}})',
  reviewQueue_other: 'Review queue ({{count}})',
  reviewNow: 'Review now',
  noDue: 'No words are due.',
  lapses_one: 'Forgotten {{count}} time',
  lapses_other: 'Forgotten {{count}} times',
  lapsedLegend: 'Pink: recently forgotten words (reviewed first).',
  allCourses: 'All your languages',
  table: {
    course: 'Language',
    lessons: 'Lessons',
    words: 'Words',
    accuracy: 'Accuracy',
    quizzes: 'Quizzes',
  },
  lessons: 'Lessons',
  inProgress: 'In progress',
  inProgressBest: 'In progress · best {{pct}}%',
  notStarted: 'Not started',
  quizHistory: 'Quiz history',
  noQuizzes: 'No quizzes yet.',
};

export default progress;
