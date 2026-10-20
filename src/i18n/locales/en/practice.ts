import type vi from '../vi/practice';
import type { Messages } from '../../messages';

const practice: Messages<typeof vi> = {
  title: 'Practice',
  subtitle_one: '{{count}} question per round (based on the session length in Settings). Results update each word’s review schedule.',
  subtitle_other: '{{count}} questions per round (based on the session length in Settings). Results update each word’s review schedule.',
  modes: {
    review: { title: 'Due reviews', detail: 'Spaced repetition: forgotten words come first' },
    mistakes: { title: 'Review mistakes', detail: 'Retry questions you got wrong' },
    mixed: { title: 'Mixed', detail: 'A mix of exercise types' },
    meaning: {
      zh: { title: 'Chinese → English', detail: 'See the characters, pick the meaning' },
      en: { title: 'Word → meaning', detail: 'See the English word, pick its meaning' },
      ko: { title: 'Korean → English', detail: 'See the word in Hangul, pick the meaning' },
    },
    reverse: {
      zh: { title: 'English → Chinese', detail: 'See the meaning, pick the characters' },
      en: { title: 'Meaning → word', detail: 'See the meaning, pick the English word' },
      ko: { title: 'English → Korean', detail: 'See the meaning, pick the Korean word' },
    },
    listen: { title: 'Listen and choose', detail: 'Hear a word, pick the word or its meaning' },
    fill: { title: 'Fill in the blank', detail: 'Pick the missing word in a sentence' },
    pron: { title: 'Type pinyin', detail: 'See the characters, type pinyin with tones' },
    write: {
      zh: { title: 'Write characters', detail: 'Use a Chinese keyboard or the character palette' },
      en: { title: 'Spelling', detail: 'Hear a word and spell it correctly' },
      ko: { title: 'Type Hangul', detail: 'Hear a word and type it in Hangul (keyboard or palette)' },
    },
  },
  due_one: '{{count}} due',
  due_other: '{{count}} due',
  backToModes: 'Practice modes',
  newRound: 'New round',
  changeMode: 'Change mode',
  wordSource: 'Word source',
  source: {
    all: 'Unlocked words ({{n}})',
    favorite: '★ Favorites',
    difficult: '⚑ Difficult words',
  },
  availableDue_one: '{{count}} word is due for review.',
  availableDue_other: '{{count}} words are due for review.',
  availableMistakes_one: '{{count}} mistake to fix.',
  availableMistakes_other: '{{count}} mistakes to fix.',
  availableSource_one: '{{count}} word in the selected source.',
  availableSource_other: '{{count}} words in the selected source.',
  roundSize_one: 'This round has {{count}} question.',
  roundSize_other: 'This round has {{count}} questions.',
  noneDue: 'Great — no words are due for review today.',
  learnFirst: 'Study your first lesson to unlock vocabulary.',
  reviewExtra: 'Review learned words anyway',
  goToPath: 'Go to the learning path',
  noMistakes: 'No mistakes to fix. 👏',
  emptySource: 'There are no words in this source yet.',
  markWordsHint: 'Mark words on the Vocabulary page.',
};

export default practice;
