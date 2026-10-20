import type vi from '../vi/ex';
import type { Messages } from '../../messages';

const ex: Messages<typeof vi> = {
  listenChoose: 'Listen and choose the correct answer',
  matchMeaning: 'Match each word with its meaning',
  typePinyinOf: 'Type the pinyin for "{{meaning}}" (tone marks like mǎ or numbers like ma3)',
  arrange: 'Put the words in order: "{{meaning}}"',
  chooseMeaning: 'Choose the correct meaning',
  meansExplain: '{{word}} means "{{meaning}}".',
  chooseWord: 'Choose the word for "{{meaning}}"',
  isWordExplain: '"{{meaning}}" is {{word}}.',
  listenWord: 'Listen and choose the word you hear',
  heardExplain: 'You heard: {{word}} — "{{meaning}}".',
  listenMeaning: 'Listen and choose the correct meaning',
  typePinyinWord: 'Type the pinyin (tone marks or numbers) — "{{meaning}}"',
  readsAs: '{{text}} is pronounced {{pron}}.',
  write: {
    hanzi: 'Type the characters for "{{meaning}}" ({{pron}})',
    spelling: 'Listen and spell the word that means "{{meaning}}"',
    hangul: 'Listen and type in Hangul the word that means "{{meaning}}"',
  },
  writtenAs: '"{{meaning}}" is written {{text}}.',
  fillBlank: 'Choose the word that fills the blank — "{{meaning}}"',
  sentenceExplain: '{{sentence}} — {{meaning}}',
  readSentence: 'Read the sentence and choose the correct meaning',
  listenSentence: 'Listen to the sentence and choose the correct meaning',
  listenTone: 'Listen and choose the correct tone',
  toneExplain: '{{text}} is pronounced {{pron}} (tone {{tone}}) — "{{meaning}}".',
  listenContrast: 'Listen and choose the correct sound ({{pair}})',
  contrastExplain: '{{word}} — "{{meaning}}". {{note}}',
  toneHint: 'The letters are right, but a tone is wrong or missing.',
  spellingHint: 'Almost — check the spelling.',
};

export default ex;
