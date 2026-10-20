import type vi from '../vi/vocabulary';
import type { Messages } from '../../messages';

const vocabulary: Messages<typeof vi> = {
  title: '词汇',
  subtitle_one: '前 {{lessons}} 课共 {{count}} 个词。',
  subtitle_other: '前 {{lessons}} 课共 {{count}} 个词。',
  searchHelp: '可按写法、{{pron}}、越南语（带不带声调符号均可）或英语搜索。',
  searchHelpZh: '拼音带不带声调均可。',
  practice: '练习词汇',
  searchPlaceholder: {
    zh: '搜索：你好、ni hao、hello、xin chào…',
    en: '搜索：teacher、hello、xin chào…',
    ko: '搜索：안녕하세요、annyeong、xin chào…',
  },
  searchLabel: '搜索词语',
  filter: {
    topic: '主题',
    allTopics: '全部主题',
    type: '词性',
    allTypes: '全部词性',
    stage: '阶段',
    allStages: '全部阶段',
    level: '等级',
    allLevels: '全部等级',
    status: '掌握程度',
    allStatuses: '全部掌握程度',
    flag: '标记',
    allWords: '全部词语',
    favorite: '收藏',
    difficult: '难词',
    clear: '清除筛选',
  },
  results_one: '{{count}} 个结果',
  results_other: '{{count}} 个结果',
  empty: '没有符合条件的词语。',
  emptyCourse: '本课程暂时没有词汇。',
};

export default vocabulary;
