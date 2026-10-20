import type vi from '../vi/layout';
import type { Messages } from '../../messages';

const layout: Messages<typeof vi> = {
  appName: 'Language Companion',
  appTagline: 'Chinese · English · Korean',
  studying: 'Studying',
  interfaceLanguage: 'Interface language',
  chooseCourse: 'Choose a language to study',
  studyingAria: 'Studying: {{name}} — change language',
  switchTo: 'Switch to',
  allCourses: 'All languages →',
  supportHintZh: 'With the Chinese interface, word meanings and sentence translations are shown in this language.',
  supportHintSame: 'You are studying {{name}} with an interface in the same language, so word meanings and sentence translations are shown in this language.',
};

export default layout;
