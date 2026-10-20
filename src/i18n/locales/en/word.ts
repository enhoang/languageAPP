import type vi from '../vi/word';
import type { Messages } from '../../messages';

const word: Messages<typeof vi> = {
  due: 'Review: {{date}}',
  favorite: 'Favorite',
  favorited: 'Favorited',
  markDifficult: 'Mark as difficult',
  difficult: 'Difficult',
  accent: {
    'en-US': 'US',
    'en-GB': 'UK',
  },
  spoken: 'Said as',
  level: 'Level: {{level}}',
  strokes: {
    show: 'Show stroke order',
    hide: 'Hide stroke order',
  },
};

export default word;
