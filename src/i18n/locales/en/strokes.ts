import type vi from '../vi/strokes';
import type { Messages } from '../../messages';

const strokes: Messages<typeof vi> = {
  animate: 'Animate',
  practice: 'Practice',
  reset: 'Reset',
  loading: 'Loading stroke data…',
  loadError: 'Could not load the stroke data. Please reload the page.',
  missing: 'No stroke-order data for {{char}} yet.',
  charLabel: 'Character {{char}}',
  canvasLabel: 'Writing area for {{char}}: trace each stroke with the mouse or your finger',
  strokeCount_one: '{{count}} stroke',
  strokeCount_other: '{{count}} strokes',
  practiceHint: 'Trace each stroke in the right order. After 3 misses you get a hint.',
  progress: 'Stroke {{done}}/{{total}}',
  perfect: 'Excellent! No mistakes.',
  done_one: 'Done! {{count}} mistake.',
  done_other: 'Done! {{count}} mistakes.',
  credit: 'Stroke data: Make Me a Hanzi (Arphic Public License).',
};

export default strokes;
