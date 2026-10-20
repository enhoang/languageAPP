import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { AppData, Course, CourseId, CourseProgress, QuizAttempt, Settings, Skill } from '../types';
import * as A from '../lib/appData';
import { loadData, saveData, STORAGE_KEY } from '../lib/storage';
import { createEmptyData } from '../lib/appData';
import { COURSES, PASS_PERCENT } from '../courses';
import { onVoicesChanged, speak as speakRaw, speechSupported, voicesFor } from '../lib/audio';

interface Ctx {
  data: AppData;
  saveError: boolean;
  setCurrentCourse: (id: CourseId) => void;
  recordAnswer: (course: CourseId, rec: A.AnswerRecord) => void;
  startLesson: (course: CourseId, id: string) => void;
  setLessonStep: (course: CourseId, id: string, step: number) => void;
  finishLessonQuiz: (course: CourseId, id: string, results: { skill: Skill; correct: boolean }[]) => { passed: boolean; score: number };
  addTestAttempt: (course: CourseId, attempt: QuizAttempt) => void;
  addStudySeconds: (course: CourseId, s: number) => void;
  toggleWordFlag: (course: CourseId, id: string, flag: 'favorite' | 'difficult') => void;
  updateSettings: (patch: Partial<Settings>) => void;
  replaceData: (d: AppData) => void;
  resetAll: () => void;
}

export const AppDataContext = createContext<Ctx | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => loadData());
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    setSaveError(!saveData(data));
  }, [data]);

  // Keep several open tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) setData(loadData());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const finishLessonQuiz = useCallback<Ctx['finishLessonQuiz']>((course, id, results) => {
    setData((d) => A.finishLessonQuiz(d, COURSES[course], id, results).data);
    const score = A.percent(results.filter((r) => r.correct).length, results.length);
    return { passed: score >= PASS_PERCENT, score };
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      data,
      saveError,
      setCurrentCourse: (id) => setData((d) => A.setCurrentCourse(d, id)),
      recordAnswer: (c, rec) => setData((d) => A.recordAnswer(d, c, rec)),
      startLesson: (c, id) => setData((d) => A.startLesson(d, c, id)),
      setLessonStep: (c, id, step) => setData((d) => A.setLessonStep(d, c, id, step)),
      finishLessonQuiz,
      addTestAttempt: (c, attempt) => setData((d) => A.addQuizAttempt(d, c, attempt)),
      addStudySeconds: (c, s) => setData((d) => A.addStudySeconds(d, c, s)),
      toggleWordFlag: (c, id, flag) => setData((d) => A.toggleWordFlag(d, c, id, flag)),
      updateSettings: (patch) => setData((d) => A.updateSettings(d, patch)),
      replaceData: (d) => setData(d),
      resetAll: () => setData(createEmptyData()),
    }),
    [data, saveError, finishLessonQuiz],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData(): Ctx {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used inside AppDataProvider');
  return ctx;
}

/**
 * The course being studied, its progress, and actions bound to it.
 * `chosen` is false before the learner picks a course (Chinese is used as a fallback).
 */
export function useCourse() {
  const ctx = useAppData();
  const id: CourseId = ctx.data.currentCourse ?? 'zh';
  const course: Course = COURSES[id];
  const cp: CourseProgress = ctx.data.courses[id];
  return useMemo(() => ({
    course,
    cp,
    chosen: ctx.data.currentCourse !== null,
    recordAnswer: (rec: A.AnswerRecord) => ctx.recordAnswer(id, rec),
    startLesson: (lessonId: string) => ctx.startLesson(id, lessonId),
    setLessonStep: (lessonId: string, step: number) => ctx.setLessonStep(id, lessonId, step),
    finishLessonQuiz: (lessonId: string, results: { skill: Skill; correct: boolean }[]) => ctx.finishLessonQuiz(id, lessonId, results),
    addTestAttempt: (attempt: QuizAttempt) => ctx.addTestAttempt(id, attempt),
    toggleWordFlag: (wordId: string, flag: 'favorite' | 'difficult') => ctx.toggleWordFlag(id, wordId, flag),
  }), [course, cp, id, ctx]);
}

/** Speech language of a course; English follows the chosen accent. */
export function speechLangOf(course: Course, settings: Settings): string {
  return course.id === 'en' ? settings.englishAccent : course.speechLang;
}

/** Speech helpers for the active course, bound to the learner's settings. */
export function useSpeech(courseOverride?: Course) {
  const { data } = useAppData();
  const course = courseOverride ?? COURSES[data.currentCourse ?? 'zh'];
  const lang = speechLangOf(course, data.settings);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(() => voicesFor(lang));
  useEffect(() => {
    setVoices(voicesFor(lang));
    return onVoicesChanged(() => setVoices(voicesFor(lang)));
  }, [lang]);
  const { speechRate } = data.settings;
  const voiceURI = data.settings.voices[course.id] ?? null;
  const speak = useCallback(
    (text: string, slow = false) => speakRaw(text, { lang, rate: slow ? Math.max(0.4, speechRate * 0.6) : speechRate, voiceURI }),
    [lang, speechRate, voiceURI],
  );
  return { supported: speechSupported(), voices, hasVoice: voices.length > 0, speak, lang, course };
}

/**
 * Counts study time for the active course while the page is visible and the learner interacted
 * in the last 90 seconds. Adds time in 15-second ticks.
 */
export function useStudyTimer(active = true) {
  const { addStudySeconds, data } = useAppData();
  const courseRef = useRef<CourseId>(data.currentCourse ?? 'zh');
  courseRef.current = data.currentCourse ?? 'zh';
  const lastInteraction = useRef(Date.now());
  useEffect(() => {
    if (!active) return;
    const mark = () => (lastInteraction.current = Date.now());
    const events = ['pointerdown', 'keydown', 'scroll'];
    events.forEach((e) => window.addEventListener(e, mark, { passive: true }));
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible' && Date.now() - lastInteraction.current < 90_000) addStudySeconds(courseRef.current, 15);
    }, 15_000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, mark));
      window.clearInterval(id);
    };
    // addStudySeconds only performs a functional state update, so the first instance stays valid.
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps
}
