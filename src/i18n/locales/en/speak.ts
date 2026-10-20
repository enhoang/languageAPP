import type vi from '../vi/speak';
import type { Messages } from '../../messages';

const speak: Messages<typeof vi> = {
  listen: 'Listen',
  sayIt: 'Say it',
  listening: 'Listening… speak now',
  stop: 'Stop',
  heard: 'Heard:',
  close: 'Sounds close',
  noMatch: 'Didn’t match — try again or compare by ear',
  error: {
    'no-speech': 'Nothing was heard. Speak a little louder and more clearly, then try again.',
    'not-allowed': 'Microphone access isn’t allowed. Allow the microphone in your browser, or use the self-check below.',
    network: 'Speech recognition needs an internet connection. Check your connection, or use the self-check below.',
    unsupported: 'This browser doesn’t support speech recognition.',
    other: 'Speech recognition didn’t work. Try again or use the self-check.',
  },
  note: 'Browser speech recognition is only an approximate hint, not a pronunciation score, and nothing is saved to your results.',
  unsupported: 'This browser has no speech recognition. Listen to the model, repeat it aloud and judge for yourself.',
  manual: 'Self-check: listen → repeat aloud → compare by ear.',
  good: 'I said it well',
  again: 'Practise again',
  goodDone: 'Well done!',
  againDone: 'Listen to the model again and try a few more times.',
  progress: 'Said well: {{done}}/{{total}}',
};

export default speak;
