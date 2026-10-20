import type { DemoScript } from '../types';
import { DEMO_ZH } from './zh';
import { DEMO_EN } from './en';
import { DEMO_KO } from './ko';

/** Prewritten scenario practice used when no AI backend is configured (demo mode). */
export const DEMO_SCRIPTS: DemoScript[] = [...DEMO_ZH, ...DEMO_EN, ...DEMO_KO];
