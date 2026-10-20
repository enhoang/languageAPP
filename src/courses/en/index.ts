import type { Course } from '../../types';
import { CONTENT } from './lessons';
import { CONTRASTS, PRONUNCIATION } from './pronunciation';
import { ROADMAP, STAGES } from './roadmap';

/** English: see src/courses/en/ (lessons/dN.ts hold each day's lesson, words and grammar). */
export const EN: Course = {
  id: 'en',
  endonym: 'English',
  name: { vi: 'Tiếng Anh', en: 'English', zh: '英语' },
  tagline: { vi: 'Tiếng Anh theo khung CEFR.', en: 'English along the CEFR levels.', zh: '参照 CEFR 等级学英语。' },
  speechLang: 'en-US',
  fontClass: '',
  pronName: { vi: 'Phiên âm IPA', en: 'IPA', zh: '国际音标' },
  framework: 'CEFR',
  tokenJoiner: ' ',
  writeMode: 'spelling',
  typePron: false,
  ...CONTENT,
  stages: STAGES,
  roadmap: ROADMAP,
  contrasts: CONTRASTS,
  toneSets: [],
  pronunciation: PRONUNCIATION,
};
