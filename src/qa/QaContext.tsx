import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Assist, QaAttempt, QaProgress } from './types';
import * as S from './store';

interface Ctx {
  progress: QaProgress;
  saveError: boolean;
  markSectionRead: (topicId: string, section: string) => void;
  setTopicCompleted: (topicId: string, completed: boolean) => void;
  markTerm: (termId: string, mark: 'understood' | 'review' | undefined) => void;
  /** record an answer: item id ("q:…" / "t:…"), result, and the glossary terms it exercises */
  record: (itemId: string, correct: boolean, termIds?: string[]) => void;
  addAttempt: (a: QaAttempt) => void;
  setAssist: (a: Assist) => void;
  replace: (p: QaProgress) => void;
  reset: () => void;
}

const QaCtx = createContext<Ctx | null>(null);

/** ISTQB & QA progress (localStorage `clc:qa`), independent of the language courses. */
export function QaProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<QaProgress>(() => S.loadQa());
  const [saveError, setSaveError] = useState(false);
  useEffect(() => setSaveError(!S.saveQa(progress)), [progress]);
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === S.QA_KEY && e.newValue) setProgress(S.loadQa());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  const value = useMemo<Ctx>(() => ({
    progress,
    saveError,
    markSectionRead: (t, s) => setProgress((p) => S.markSectionRead(p, t, s)),
    setTopicCompleted: (t, c) => setProgress((p) => S.setTopicCompleted(p, t, c)),
    markTerm: (id, m) => setProgress((p) => S.markTerm(p, id, m)),
    record: (id, c, terms) => setProgress((p) => S.recordQa(p, id, c, terms)),
    addAttempt: (a) => setProgress((p) => S.addQaAttempt(p, a)),
    setAssist: (a) => setProgress((p) => S.setAssist(p, a)),
    replace: (p) => setProgress(p),
    reset: () => setProgress(S.emptyQa()),
  }), [progress, saveError]);
  return <QaCtx.Provider value={value}>{children}</QaCtx.Provider>;
}

export function useQa(): Ctx {
  const ctx = useContext(QaCtx);
  if (!ctx) throw new Error('useQa must be used inside QaProvider');
  return ctx;
}
