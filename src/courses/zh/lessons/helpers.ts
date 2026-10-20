import type { Exercise, Gloss, Txt } from '../../../types';
import { arrangeWith, typeIt } from '../../helpers';

export { choice, listen, MATCH_PROMPT } from '../../helpers';

/** Chinese tokens are written together. */
export const arrange = arrangeWith('');

/** Type the pinyin of `text`, whose meaning is shown in the prompt. */
export function pinyin(id: string, text: string, meaning: Gloss, accepted: string[], explanation: Txt, wordIds?: string[]): Exercise {
  return typeIt(id, 'pinyin', { k: 'ex.typePinyinOf', p: { meaning } }, accepted, explanation, { text, audio: text, wordIds });
}

export function hanzi(id: string, prompt: Txt, accepted: string[], explanation: Txt, wordIds?: string[]): Exercise {
  return typeIt(id, 'hanzi', prompt, accepted, explanation, { wordIds });
}
