import type vi from '../vi/path';
import type { Messages } from '../../messages';

const path: Messages<typeof vi> = {
  subtitle: 'Study in order — each lesson unlocks once you complete the previous one (score ≥ {{pct}}% on its final quiz).',
  lessonsCount_one: '{{done}}/{{count}} lesson',
  lessonsCount_other: '{{done}}/{{count}} lessons',
  dayShort: 'D{{day}}',
  inProgress: 'In progress',
  next: 'Up next',
  best: 'Best {{pct}}%',
  unlockHint: 'Complete Day {{day}} to unlock',
  comingSoon: 'Coming soon',
  planned: 'Planned lessons (not yet available in this MVP)',
  plannedDay: 'Day {{day}}:',
  title: '{{name}} learning path',
  frameworkNote: 'The path is ordered by increasing difficulty for beginners and follows the {{framework}} framework. The level shown for each stage is a guide only: the content has not been officially aligned with the {{framework}} syllabus or exam.',
};

export default path;
