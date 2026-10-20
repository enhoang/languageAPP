import type vi from '../vi/layout';
import type { Messages } from '../../messages';

const layout: Messages<typeof vi> = {
  appName: '外语学习伙伴',
  appTagline: '中文 · 英语 · 韩语',
  studying: '正在学习',
  interfaceLanguage: '界面语言',
  chooseCourse: '选择要学习的语言',
  studyingAria: '正在学习：{{name}}——切换学习语言',
  switchTo: '切换到',
  allCourses: '全部语言 →',
  supportHintZh: '界面为中文时，词义和句子翻译会用这种语言显示。',
  supportHintSame: '你正在用同一种语言的界面学习{{name}}，因此词义和句子翻译会用这种语言显示。',
};

export default layout;
