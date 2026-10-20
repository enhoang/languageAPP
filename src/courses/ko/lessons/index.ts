import { mergeDays } from '../../helpers';
import { D1 } from './d1';
import { D2 } from './d2';
import { D3 } from './d3';
import { D4 } from './d4';
import { D5 } from './d5';
import { D6 } from './d6';
import { D7 } from './d7';

/** Lessons, words and grammar of all days. Lesson ids: 'ko-d1'…'ko-d7'. */
export const CONTENT = mergeDays([D1, D2, D3, D4, D5, D6, D7]);
