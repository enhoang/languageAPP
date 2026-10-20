import type vi from '../vi/practice';
import type { Messages } from '../../messages';

const practice: Messages<typeof vi> = {
  title: '练习',
  subtitle_one: '每轮 {{count}} 题（根据设置中的学习时长）。练习结果会更新每个词的复习计划。',
  subtitle_other: '每轮 {{count}} 题（根据设置中的学习时长）。练习结果会更新每个词的复习计划。',
  modes: {
    review: { title: '到期复习', detail: '间隔重复：优先复习容易忘的词' },
    mistakes: { title: '错题复习', detail: '重做以前答错的题目' },
    mixed: { title: '综合练习', detail: '多种题型混合' },
    meaning: {
      zh: { title: '汉字 → 词义', detail: '看汉字，选出词义' },
      en: { title: '英文 → 词义', detail: '看英文单词，选出词义' },
      ko: { title: '韩文 → 词义', detail: '看韩文词语，选出词义' },
    },
    reverse: {
      zh: { title: '词义 → 汉字', detail: '看词义，选出汉字' },
      en: { title: '词义 → 英文', detail: '看词义，选出英文单词' },
      ko: { title: '词义 → 韩文', detail: '看词义，选出韩文词语' },
    },
    listen: { title: '听音选择', detail: '听词语，选出词语或词义' },
    fill: { title: '选词填空', detail: '选出句子中缺少的词' },
    pron: { title: '输入拼音', detail: '看汉字，输入带声调的拼音' },
    write: {
      zh: { title: '书写汉字', detail: '使用中文输入法或备选汉字' },
      en: { title: '拼写听写', detail: '听单词，写出正确的拼写' },
      ko: { title: '输入韩文', detail: '听词语，用韩文输入（输入法或备选字）' },
    },
  },
  due_one: '{{count}} 个到期',
  due_other: '{{count}} 个到期',
  backToModes: '练习模式',
  newRound: '再练一轮',
  changeMode: '更换模式',
  wordSource: '词语来源',
  source: {
    all: '已解锁的词（{{n}}）',
    favorite: '★ 收藏',
    difficult: '⚑ 难词',
  },
  availableDue_one: '有 {{count}} 个词到期需要复习。',
  availableDue_other: '有 {{count}} 个词到期需要复习。',
  availableMistakes_one: '有 {{count}} 道错题待订正。',
  availableMistakes_other: '有 {{count}} 道错题待订正。',
  availableSource_one: '所选来源中有 {{count}} 个词。',
  availableSource_other: '所选来源中有 {{count}} 个词。',
  roundSize_one: '本轮共 {{count}} 题。',
  roundSize_other: '本轮共 {{count}} 题。',
  noneDue: '太棒了——今天没有需要复习的词。',
  learnFirst: '先学习第一课来积累词汇吧。',
  reviewExtra: '再复习一下已学的词',
  goToPath: '前往学习路线',
  noMistakes: '没有需要订正的错题。👏',
  emptySource: '这个来源中还没有词语。',
  markWordsHint: '可以在“词汇”页面标记词语。',
};

export default practice;
