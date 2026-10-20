import type vi from '../vi/pronunciation';
import type { Messages } from '../../messages';

const pronunciation: Messages<typeof vi> = {
  title: 'Pronunciation & listening',
  subtitle: 'Tap a card to hear it. Use the “{{slow}}” button to hear it more slowly.',
  tabsLabel: 'Pronunciation topics',
  tones: {
    playAll: 'Play all 4 tones',
  },
  rules: {
    written: 'Written:',
    spoken: 'Spoken:',
  },
  drill: {
    title_one: 'Listening drill ({{count}} question)',
    title_other: 'Listening drill ({{count}} questions)',
    intro: 'Listen to a syllable or word and pick the right answer. Results count towards your Pronunciation skill.',
    kind: {
      both: 'Tones + sound pairs',
      tones: 'Tones only',
      contrasts: 'Confusable pairs only',
    },
    start: 'Start drill',
    newRound: 'New round',
    changeKind: 'Change drill type',
  },
  disclaimer: 'Note: the app uses your browser’s voice for audio and doesn’t score your pronunciation automatically. In speaking practice, speech recognition (where your browser offers it) is only an approximate hint. Listen, repeat and compare yourself — you can record yourself with your phone’s voice recorder and play it back.',
};

export default pronunciation;
