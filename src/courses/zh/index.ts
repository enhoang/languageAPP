import type { Course } from '../../types';
import { LESSONS } from './lessons';
import { WORDS } from './words';
import { GRAMMAR } from './grammar';
import { ROADMAP, STAGES } from './roadmap';
import { CONTRASTS, FINAL_GROUPS, INITIAL_GROUPS, SANDHI_RULES, TONE_SETS, TONES } from './sounds';

/** Mandarin Chinese: simplified characters + Hanyu Pinyin, HSK-aligned roadmap. */
export const ZH: Course = {
  id: 'zh',
  endonym: '中文',
  name: { vi: 'Tiếng Trung', en: 'Chinese', zh: '中文' },
  tagline: {
    vi: 'Chữ Hán giản thể, pinyin và thanh điệu — lộ trình theo HSK.',
    en: 'Simplified characters, pinyin and tones — an HSK-aligned path.',
    zh: '简体字、拼音和声调——参照 HSK 的学习路线。',
  },
  speechLang: 'zh-CN',
  fontClass: 'font-zh',
  pronName: { vi: 'Pinyin', en: 'Pinyin', zh: '拼音' },
  framework: 'HSK',
  tokenJoiner: '',
  writeMode: 'hanzi',
  typePron: true,
  lessons: LESSONS,
  words: WORDS,
  grammar: GRAMMAR,
  stages: STAGES,
  roadmap: ROADMAP,
  contrasts: CONTRASTS,
  toneSets: TONE_SETS,
  pronunciation: {
    intro: {
      vi: 'Tiếng Phổ thông có 4 thanh điệu và thanh nhẹ. Mỗi âm tiết gồm thanh mẫu + vận mẫu + thanh điệu.',
      en: 'Mandarin has four tones plus the neutral tone. Every syllable is an initial + a final + a tone.',
      zh: '普通话有四个声调和轻声。每个音节由声母、韵母和声调组成。',
    },
    tabs: [
      {
        id: 'tones',
        title: { vi: 'Thanh điệu', en: 'Tones', zh: '声调' },
        blocks: [
          { kind: 'sounds', group: { title: { vi: 'Bốn thanh và thanh nhẹ', en: 'The four tones and the neutral tone', zh: '四个声调和轻声' }, items: TONES } },
          { kind: 'toneSets', title: { vi: 'Một âm tiết — bốn thanh', en: 'One syllable, four tones', zh: '同一音节，四个声调' } },
        ],
      },
      { id: 'initials', title: { vi: 'Thanh mẫu', en: 'Initials', zh: '声母' }, blocks: INITIAL_GROUPS.map((group) => ({ kind: 'sounds' as const, group })) },
      { id: 'finals', title: { vi: 'Vận mẫu', en: 'Finals', zh: '韵母' }, blocks: FINAL_GROUPS.map((group) => ({ kind: 'sounds' as const, group })) },
      {
        id: 'contrasts',
        title: { vi: 'Cặp dễ nhầm', en: 'Confusable pairs', zh: '易混音' },
        blocks: [{ kind: 'contrasts', title: { vi: 'Cặp âm dễ nhầm', en: 'Confusable sounds', zh: '容易混淆的音' }, contrasts: CONTRASTS }],
      },
      {
        id: 'sandhi',
        title: { vi: 'Biến điệu', en: 'Tone sandhi', zh: '变调' },
        blocks: [{ kind: 'rules', title: { vi: 'Quy tắc biến điệu', en: 'Tone sandhi rules', zh: '变调规则' }, rules: SANDHI_RULES }],
      },
    ],
  },
};
