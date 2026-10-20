import { useEffect, useState, useSyncExternalStore } from 'react';

/**
 * Install and connectivity state for the PWA, based on feature detection:
 * - `beforeinstallprompt` (Chrome, Edge, Samsung Internet, Opera…): a real install button is possible.
 * - `navigator.standalone` exists only in Safari on iPhone/iPad: installing goes through Share → Add to Home Screen.
 * - otherwise no programmatic install: show per-browser instructions, never a button that cannot work.
 */

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let deferred: BeforeInstallPromptEvent | null = null;
let installedNow = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

// Registered at import time (main.tsx imports this module), because the event can fire before React mounts.
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // keep it for our own button; the prompt only opens after the learner clicks
    deferred = e as BeforeInstallPromptEvent;
    emit();
  });
  window.addEventListener('appinstalled', () => {
    deferred = null;
    installedNow = true;
    emit();
  });
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** Running as an installed app (standalone window), not in a browser tab. */
export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  const mm = (q: string) => typeof window.matchMedia === 'function' && window.matchMedia(q).matches;
  return mm('(display-mode: standalone)') || mm('(display-mode: fullscreen)') || mm('(display-mode: minimal-ui)') || mm('(display-mode: window-controls-overlay)')
    || (navigator as Navigator & { standalone?: boolean }).standalone === true;
}

export type InstallPlatform = 'prompt' | 'ios' | 'other';

export interface InstallState {
  standalone: boolean;
  /** installed during this visit (appinstalled event) */
  installedNow: boolean;
  /** how installation works here */
  platform: InstallPlatform;
  /** opens the browser's install dialog (only when platform === 'prompt') */
  install: () => Promise<'accepted' | 'dismissed' | 'unavailable'>;
}

/** Safari on iPhone/iPad: the only browsers exposing navigator.standalone (feature detection, not the user-agent string). */
const hasIosStandaloneFlag = () => typeof navigator !== 'undefined' && 'standalone' in navigator;

export function useInstall(): InstallState {
  const snapshot = useSyncExternalStore(subscribe, () => `${deferred ? 1 : 0}${installedNow ? 1 : 0}`, () => '00');
  const [standalone, setStandalone] = useState(isStandalone);
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(display-mode: standalone)');
    const on = () => setStandalone(isStandalone());
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  const hasPrompt = snapshot[0] === '1';
  return {
    standalone,
    installedNow: snapshot[1] === '1',
    platform: hasPrompt ? 'prompt' : hasIosStandaloneFlag() ? 'ios' : 'other',
    install: async () => {
      const e = deferred;
      if (!e) return 'unavailable';
      await e.prompt();
      const { outcome } = await e.userChoice;
      deferred = null; // a prompt event can be used only once
      emit();
      return outcome;
    },
  };
}

/** navigator.onLine with live updates. "Online" only means a network is connected, not that every server is reachable. */
export function useOnline(): boolean {
  return useSyncExternalStore(
    (l) => {
      window.addEventListener('online', l);
      window.addEventListener('offline', l);
      return () => {
        window.removeEventListener('online', l);
        window.removeEventListener('offline', l);
      };
    },
    () => navigator.onLine,
    () => true,
  );
}

// ---------- install reminder ----------

const DISMISS_KEY = 'clc:pwa-install-dismissed';

export function installReminderDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISS_KEY) !== null;
  } catch {
    return false;
  }
}

export function dismissInstallReminder(): void {
  try {
    localStorage.setItem(DISMISS_KEY, new Date().toISOString());
  } catch {
    /* storage unavailable: the reminder just shows again next time */
  }
}

export function resetInstallReminder(): void {
  try {
    localStorage.removeItem(DISMISS_KEY);
  } catch {
    /* ignore */
  }
}

// ---------- storage ----------

export interface StorageInfo {
  supported: boolean;
  persisted: boolean | null;
  usage?: number;
  quota?: number;
}

export async function storageInfo(): Promise<StorageInfo> {
  const s = typeof navigator !== 'undefined' ? navigator.storage : undefined;
  if (!s) return { supported: false, persisted: null };
  const [persisted, est] = await Promise.all([s.persisted?.().catch(() => null) ?? null, s.estimate?.().catch(() => undefined)]);
  return { supported: true, persisted, usage: est?.usage, quota: est?.quota };
}

/** Ask the browser not to evict this site's data under storage pressure. The browser may refuse. */
export async function requestPersistentStorage(): Promise<boolean> {
  try {
    return (await navigator.storage?.persist?.()) ?? false;
  } catch {
    return false;
  }
}
