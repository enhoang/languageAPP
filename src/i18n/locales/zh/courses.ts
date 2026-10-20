import type vi from '../vi/courses';
import type { Messages } from '../../messages';

const courses: Messages<typeof vi> = {
  title: '我的学习语言',
  subtitle: '每种语言都有自己的学习路线和进度。选择一种语言继续学习。',
  firstTitle: '你想学习哪种语言？',
  firstSubtitle: '选择一种语言开始学习。你可以随时切换或增加其他语言。',
  interfaceNote: '界面语言（按钮、讲解文字）与所学语言相互独立——例如用越南语界面学习韩语。',
  current: '正在学习',
  lessons: '已学完的课',
  wordsLearned: '已学的词',
  due: '待复习的词',
  lastActive: '上次学习',
  never: '尚未开始',
  study: '学习这门语言',
  continue: '继续学习',
  separateNote: '每种语言的进度、复习计划和错题分别保存，切换语言不会丢失进度。连续学习天数和每日目标按所有语言合计。',
};

export default courses;
