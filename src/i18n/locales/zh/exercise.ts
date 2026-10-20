import type vi from '../vi/exercise';
import type { Messages } from '../../messages';

const exercise: Messages<typeof vi> = {
  progress: '第 {{current}} / {{total}} 题',
  empty: '暂无题目。',
  correct: '回答正确！',
  incorrect: '回答错误',
  correctAnswer: '正确答案：',
  yourAnswer: '你的回答：',
  matchHelp: '先选左边的词，再选右边对应的词义。再次点击已配对的词可取消配对。',
  arrangePlaceholder: '按正确顺序点击下面的词语……',
  placeholder: {
    pinyin: '例如：nǐ hǎo 或 ni3 hao3',
    hanzi: '输入汉字……',
    spelling: '输入你听到的单词……',
    hangul: '用韩文输入……',
  },
  help: {
    pinyin: '输入声调符号（ā á ǎ à），或在每个音节后输入数字（1–4）。轻声不用加数字。ü 可以输入 v。',
    hanzi: '使用中文输入法（输入拼音后选字），或使用备选汉字。',
    spelling: '点击喇叭按钮可以再听一遍（也可以慢速播放）。不区分大小写。',
    hangul: '使用韩文输入法（两套式键盘），或使用备选韩文字。',
  },
  showPalette: {
    hanzi: '没有中文输入法？显示备选汉字',
    hangul: '没有韩文输入法？显示备选韩文字',
  },
  hidePalette: '隐藏备选字',
  deleteLast: '删除最后一个字',
  showPron: '显示{{name}}',
};

export default exercise;
