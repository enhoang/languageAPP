import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { ConvData, ConvSession, ConvSettings, SavedPhrase } from './types';
import * as S from './store';
import { providerFor, type ConversationProvider } from './provider';

interface Ctx {
  data: ConvData;
  saveError: boolean;
  /** AI backend when configured, otherwise the demo */
  provider: ConversationProvider;
  session: (id: string | undefined) => ConvSession | undefined;
  putSession: (s: ConvSession) => void;
  deleteSession: (id: string) => void;
  updateSettings: (patch: Partial<ConvSettings>) => void;
  savePhrase: (p: Omit<SavedPhrase, 'id' | 'savedAt' | 'progress' | 'difficult'> & { difficult?: boolean }) => void;
  removePhrase: (id: string) => void;
  setDifficult: (id: string, difficult: boolean) => void;
  reviewPhrase: (id: string, correct: boolean) => void;
  replace: (d: ConvData) => void;
  reset: () => void;
}

const ConvCtx = createContext<Ctx | null>(null);

/** Conversation-practice state (localStorage `clc:conv`), independent of language courses and the ISTQB module. */
export function ConvProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ConvData>(() => S.loadConv());
  const [saveError, setSaveError] = useState(false);
  useEffect(() => setSaveError(!S.saveConv(data)), [data]);
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === S.CONV_KEY && e.newValue) setData(S.loadConv());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  const { apiUrl, accessCode } = data.settings;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const provider = useMemo(() => providerFor(data.settings), [apiUrl, accessCode]);
  const value = useMemo<Ctx>(() => ({
    data,
    saveError,
    provider,
    session: (id) => data.sessions.find((s) => s.id === id),
    putSession: (s) => setData((d) => S.upsertSession(d, s)),
    deleteSession: (id) => setData((d) => ({ ...d, sessions: d.sessions.filter((s) => s.id !== id) })),
    updateSettings: (patch) => setData((d) => ({ ...d, settings: { ...d.settings, ...patch } })),
    savePhrase: (p) => setData((d) => S.savePhrase(d, p)),
    removePhrase: (id) => setData((d) => S.removePhrase(d, id)),
    setDifficult: (id, v) => setData((d) => S.setDifficult(d, id, v)),
    reviewPhrase: (id, c) => setData((d) => S.reviewPhrase(d, id, c)),
    replace: (d) => setData(d),
    reset: () => setData(S.emptyConv()),
  }), [data, saveError, provider]);
  return <ConvCtx.Provider value={value}>{children}</ConvCtx.Provider>;
}

export function useConv(): Ctx {
  const ctx = useContext(ConvCtx);
  if (!ctx) throw new Error('useConv must be used inside ConvProvider');
  return ctx;
}
