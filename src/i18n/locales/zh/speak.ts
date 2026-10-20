import type vi from '../vi/speak';
import type { Messages } from '../../messages';

const speak: Messages<typeof vi> = {
  listen: '听示范',
  sayIt: '说一说',
  listening: '正在听……请开口说',
  stop: '停止',
  heard: '识别结果：',
  close: '听起来很接近',
  noMatch: '没有匹配——请再试一次，或用耳朵自己对比',
  error: {
    'no-speech': '没有听到声音。请大声、清楚一点再试一次。',
    'not-allowed': '没有麦克风权限。请在浏览器中允许使用麦克风，或使用下面的自我检查。',
    network: '语音识别需要联网。请检查网络，或使用下面的自我检查。',
    unsupported: '此浏览器不支持语音识别。',
    other: '语音识别失败。请再试一次，或使用自我检查。',
  },
  note: '浏览器的语音识别只是大致参考，不是发音评分，也不会记录到学习成绩中。',
  unsupported: '此浏览器没有语音识别功能。请听示范、大声跟读，然后自己判断。',
  manual: '自我检查：听示范 → 大声跟读 → 用耳朵对比。',
  good: '我说得不错',
  again: '再练一次',
  goodDone: '很好！',
  againDone: '再听几遍示范，多试几次吧。',
  progress: '说得好：{{done}}/{{total}}',
};

export default speak;
