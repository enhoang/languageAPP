import type vi from '../vi/exercise';
import type { Messages } from '../../messages';

const exercise: Messages<typeof vi> = {
  progress: 'Question {{current}} / {{total}}',
  empty: 'No questions here.',
  correct: 'Correct!',
  incorrect: 'Not quite',
  correctAnswer: 'Correct answer: ',
  yourAnswer: 'Your answer: ',
  matchHelp: 'Pick a word on the left, then its meaning on the right. Tap a matched word again to unmatch it.',
  arrangePlaceholder: 'Tap the words below in the right order…',
  placeholder: {
    pinyin: 'E.g. nǐ hǎo or ni3 hao3',
    hanzi: 'Type the characters…',
    spelling: 'Type the word you hear…',
    hangul: 'Type in Hangul…',
  },
  help: {
    pinyin: 'Type tone marks (ā á ǎ à) or a number after each syllable (1–4). The neutral tone needs no number. Type ü as v.',
    hanzi: 'Use a Chinese keyboard (type pinyin, then pick the characters) or the character palette.',
    spelling: 'Tap the speaker to hear it again (there is a slow option). Capital letters don’t matter.',
    hangul: 'Use a Korean keyboard (2-Set Korean) or the Hangul palette.',
  },
  showPalette: {
    hanzi: 'No Chinese keyboard? Show a character palette',
    hangul: 'No Korean keyboard? Show a Hangul palette',
  },
  hidePalette: 'Hide palette',
  deleteLast: 'Delete last character',
  showPron: 'Show {{name}}',
};

export default exercise;
