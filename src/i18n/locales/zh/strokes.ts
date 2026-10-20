import type vi from '../vi/strokes';
import type { Messages } from '../../messages';

const strokes: Messages<typeof vi> = {
  animate: '演示笔顺',
  practice: '练习书写',
  reset: '重来',
  loading: '正在加载笔画数据……',
  loadError: '笔画数据加载失败，请刷新页面。',
  missing: '暂无“{{char}}”的笔顺数据。',
  charLabel: '汉字 {{char}}',
  canvasLabel: '“{{char}}”的书写区：用鼠标或手指描写每一笔',
  strokeCount_one: '{{count}} 画',
  strokeCount_other: '{{count}} 画',
  practiceHint: '按正确笔顺描写每一笔。写错 3 次会出现提示。',
  progress: '第 {{done}}/{{total}} 笔',
  perfect: '太棒了！一笔都没写错。',
  done_one: '完成！写错 {{count}} 次。',
  done_other: '完成！写错 {{count}} 次。',
  credit: '笔画数据：Make Me a Hanzi（Arphic Public License）。',
};

export default strokes;
