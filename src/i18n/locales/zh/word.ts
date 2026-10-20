import type vi from '../vi/word';
import type { Messages } from '../../messages';

const word: Messages<typeof vi> = {
  due: '复习：{{date}}',
  favorite: '收藏',
  favorited: '已收藏',
  markDifficult: '标为难词',
  difficult: '难词',
  accent: {
    'en-US': '美式',
    'en-GB': '英式',
  },
  spoken: '实际读音',
  level: '等级：{{level}}',
  strokes: {
    show: '查看笔顺',
    hide: '隐藏笔顺',
  },
};

export default word;
