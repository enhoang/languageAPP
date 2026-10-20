import type vi from '../vi/speak';
import type { Messages } from '../../messages';

const speak: Messages<typeof vi> = {
  listen: '听示范',
  sayIt: '说一说',
  listening: '正在听……请开口说',
  stop: '停止',
  heard: '识别结果：',
  error: {
    'no-speech': '没有听到声音。请大声、清楚一点再试一次。',
    'not-allowed': '没有麦克风权限。请在浏览器中允许使用麦克风，或使用下面的自我检查。',
    network: '语音识别需要联网。请检查网络，或使用下面的自我检查。',
    unsupported: '此浏览器不支持语音识别。',
    other: '语音识别失败。请再试一次，或使用自我检查。',
  },
  note: '浏览器的语音识别只是大致参考（把识别出的文字与示范句比较），不是发音评分，也不会记录到学习成绩中。你可以自己修改评价。',
  unsupported: '此浏览器没有语音识别功能。请听示范、大声跟读，然后自己判断。',
  manual: '自我检查：听示范 → 大声跟读 → 用耳朵对比，然后选择等级。',
  level: {
    none: '不像',
    retry: '再读一遍',
    improve: '需要改进',
    good: '很好',
  },
  levelHint: {
    none: '识别出的内容差别很大。请再听示范，慢一点、清楚地说。',
    retry: '只有部分相似。请再听一遍示范，然后重读。',
    improve: '很接近了，个别音不够清楚。注意和示范不同的地方。',
    good: '识别结果和示范几乎一样。',
  },
  rate: '评价：',
  progress: '说得好：{{done}}/{{total}}',
};

export default speak;
