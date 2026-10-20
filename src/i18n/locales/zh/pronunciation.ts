import type vi from '../vi/pronunciation';
import type { Messages } from '../../messages';

const pronunciation: Messages<typeof vi> = {
  title: '发音与听力',
  subtitle: '点击卡片即可收听。点“{{slow}}”按钮可放慢语速。',
  tabsLabel: '发音内容',
  tones: {
    playAll: '播放全部四个声调',
  },
  rules: {
    written: '写作：',
    spoken: '读作：',
  },
  drill: {
    title_one: '听辨练习（{{count}} 题）',
    title_other: '听辨练习（{{count}} 题）',
    intro: '听一个音节或词语，选出正确答案。成绩计入“发音”技能。',
    kind: {
      both: '声调 + 易混音',
      tones: '只练声调',
      contrasts: '只练易混音',
    },
    start: '开始练习',
    newRound: '再练一轮',
    changeKind: '更换练习类型',
  },
  disclaimer: '注意：本应用使用浏览器的语音朗读，不会自动给你的发音打分。口语练习中的语音识别（浏览器支持时）只是大致参考。请边听边跟读，自己对比——也可以用手机录音应用录下自己的发音回放。',
};

export default pronunciation;
