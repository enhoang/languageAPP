import type { Dictionary } from '../vi';
import type { Messages } from '../../messages';
import common from './common';
import ex from './ex';
import layout from './layout';
import dashboard from './dashboard';
import path from './path';
import progress from './progress';
import settings from './settings';
import guide from './guide';
import chart from './chart';
import exercise from './exercise';
import results from './results';
import practice from './practice';
import tests from './tests';
import lesson from './lesson';
import vocabulary from './vocabulary';
import word from './word';
import pronunciation from './pronunciation';
import grammar from './grammar';
import courses from './courses';
import speak from './speak';
import strokes from './strokes';
import qa from './qa';
import qaStudy from './qaStudy';

const en: Messages<Dictionary> = { common, ex, layout, dashboard, path, progress, settings, guide, chart, exercise, results, practice, tests, lesson, vocabulary, word, pronunciation, grammar, courses, speak, strokes, qa, qaStudy };

export default en;
