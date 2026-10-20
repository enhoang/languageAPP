import type vi from '../vi/vocabulary';
import type { Messages } from '../../messages';

const vocabulary: Messages<typeof vi> = {
  title: 'Vocabulary',
  subtitle_one: '{{count}} word from the first {{lessons}} lessons.',
  subtitle_other: '{{count}} words from the first {{lessons}} lessons.',
  searchHelp: 'Search by spelling, {{pron}}, Vietnamese (with or without accents) or English.',
  searchHelpZh: 'Pinyin works with or without tone marks.',
  practice: 'Practice vocabulary',
  searchPlaceholder: {
    zh: 'Search: 你好, ni hao, hello…',
    en: 'Search: teacher, hello…',
    ko: 'Search: 안녕하세요, annyeong, hello…',
  },
  searchLabel: 'Search words',
  filter: {
    topic: 'Topic',
    allTopics: 'All topics',
    type: 'Word type',
    allTypes: 'All word types',
    stage: 'Stage',
    allStages: 'All stages',
    level: 'Level',
    allLevels: 'All levels',
    status: 'Mastery level',
    allStatuses: 'All mastery levels',
    flag: 'Marked',
    allWords: 'All words',
    favorite: 'Favorites',
    difficult: 'Difficult words',
    clear: 'Clear filters',
  },
  results_one: '{{count}} result',
  results_other: '{{count}} results',
  empty: 'No matching words.',
  emptyCourse: 'This course has no vocabulary yet.',
};

export default vocabulary;
