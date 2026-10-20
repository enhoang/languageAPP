import type { Course } from '../../types';
import { CONTENT } from './lessons';
import { CONTRASTS, PRONUNCIATION } from './pronunciation';
import { ROADMAP, STAGES } from './roadmap';

/** Korean: see src/courses/ko/ (lessons/dN.ts hold each day's lesson, words and grammar). */
export const KO: Course = {
  id: 'ko',
  endonym: '한국어',
  name: { vi: 'Tiếng Hàn', en: 'Korean', zh: '韩语' },
  tagline: { vi: 'Bảng chữ Hangul và tiếng Hàn theo TOPIK.', en: 'Hangul and Korean along the TOPIK levels.', zh: '韩文字母与参照 TOPIK 的韩语。' },
  speechLang: 'ko-KR',
  fontClass: 'font-ko',
  pronName: { vi: 'Phiên âm La-tinh', en: 'Romanization', zh: '罗马字' },
  framework: 'TOPIK',
  tokenJoiner: ' ',
  writeMode: 'hangul',
  typePron: false,
  ...CONTENT,
  stages: STAGES,
  roadmap: ROADMAP,
  contrasts: CONTRASTS,
  toneSets: [],
  pronunciation: PRONUNCIATION,
};
