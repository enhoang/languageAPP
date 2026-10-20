import type { Lesson } from '../../../types';
import { D1 } from './d1';
import { D2 } from './d2';
import { D3 } from './d3';
import { D4 } from './d4';
import { D5 } from './d5';
import { D6 } from './d6';
import { D7 } from './d7';

/** Chinese lesson ids stay 'd1'…'d7' so existing progress keeps working. */
export const LESSONS: Lesson[] = [D1, D2, D3, D4, D5, D6, D7];
