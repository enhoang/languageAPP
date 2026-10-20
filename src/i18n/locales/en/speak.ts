import type vi from '../vi/speak';
import type { Messages } from '../../messages';

const speak: Messages<typeof vi> = {
  listen: 'Listen',
  sayIt: 'Say it',
  listening: 'Listening… speak now',
  stop: 'Stop',
  heard: 'Heard:',
  error: {
    'no-speech': 'Nothing was heard. Speak a little louder and more clearly, then try again.',
    'not-allowed': 'Microphone access isn’t allowed. Allow the microphone in your browser, or use the self-check below.',
    network: 'Speech recognition needs an internet connection. Check your connection, or use the self-check below.',
    unsupported: 'This browser doesn’t support speech recognition.',
    other: 'Speech recognition didn’t work. Try again or use the self-check.',
  },
  note: 'Browser speech recognition is only an approximate hint (it compares the words it heard with the model sentence), not a pronunciation score, and nothing is saved to your results. You can change the rating yourself.',
  unsupported: 'This browser has no speech recognition. Listen to the model, repeat it aloud and judge for yourself.',
  manual: 'Self-check: listen → repeat aloud → compare by ear and pick a level.',
  level: {
    none: 'Not similar',
    retry: 'Say it again',
    improve: 'Needs improvement',
    good: 'Good',
  },
  levelHint: {
    none: 'the browser heard something quite different. Listen again, then speak slowly and clearly.',
    retry: 'only partly similar. Listen to the model once more and repeat.',
    improve: 'nearly there — a few sounds weren’t clear. Focus on the parts that differ from the model.',
    good: 'the browser heard it almost exactly like the model.',
  },
  rate: 'Rating:',
  progress: 'Said well: {{done}}/{{total}}',
};

export default speak;
