import { Component, useEffect, useState, type ReactNode } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useI18n } from '../i18n/LocaleContext';
import { Button, Card, cx } from '../components/ui';
import { Icon } from '../components/Icon';
import { dismissInstallReminder, installReminderDismissed, useInstall, useOnline, type InstallPlatform } from './pwaState';

const HOUR = 60 * 60 * 1000;

// ---------- service worker: updates ----------

let swRegistration: ServiceWorkerRegistration | undefined;

/** Ask the server for a newer service worker now. */
export async function checkForUpdate(): Promise<'checked' | 'unavailable'> {
  if (!swRegistration || !navigator.onLine) return 'unavailable';
  try {
    await swRegistration.update();
    return 'checked';
  } catch {
    return 'unavailable';
  }
}

/**
 * Registers the service worker (production builds only) and shows a banner when a new version is waiting.
 * The new version is activated only when the learner chooses "Update now": progress is already in localStorage,
 * but an unfinished quiz or conversation in memory would be lost by a silent reload. Updates are checked hourly
 * and when the app becomes visible again, so the app never stays on an old version indefinitely.
 */
export function UpdateBanner() {
  const { t } = useI18n();
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, reg) {
      swRegistration = reg;
      if (!reg) return;
      window.setInterval(() => void checkForUpdate(), HOUR);
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') void checkForUpdate();
      });
    },
  });
  useEffect(() => {
    if (!offlineReady) return;
    const id = window.setTimeout(() => setOfflineReady(false), 6000);
    return () => window.clearTimeout(id);
  }, [offlineReady, setOfflineReady]);

  if (needRefresh) {
    return (
      <div role="status" className="mb-4 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
        <div className="font-semibold">{t('pwa.update.title')}</div>
        <p className="mt-1">{t('pwa.update.text')}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button onClick={() => void updateServiceWorker(true)}>{t('pwa.update.now')}</Button>
          <Button variant="ghost" onClick={() => setNeedRefresh(false)}>{t('pwa.update.later')}</Button>
        </div>
      </div>
    );
  }
  if (offlineReady) {
    return (
      <div role="status" className="mb-4 flex items-start gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
        <span><span className="font-medium">{t('pwa.offline.readyTitle')}.</span> {t('pwa.offline.ready')}</span>
      </div>
    );
  }
  return null;
}

// ---------- offline indicator ----------

export function OfflineBanner() {
  const { t } = useI18n();
  const online = useOnline();
  const [wasOffline, setWasOffline] = useState(false);
  const [showBack, setShowBack] = useState(false);
  useEffect(() => {
    if (!online) setWasOffline(true);
    else if (wasOffline) {
      setShowBack(true);
      setWasOffline(false);
      const id = window.setTimeout(() => setShowBack(false), 4000);
      return () => window.clearTimeout(id);
    }
  }, [online, wasOffline]);
  if (!online) {
    return (
      <div role="status" className="mb-4 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
        <span>{t('pwa.offline.banner')}</span>
      </div>
    );
  }
  if (showBack) return <div role="status" className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">{t('pwa.offline.backOnline')}</div>;
  return null;
}

// ---------- installation ----------

/** Install button that only exists when the browser offers a real install prompt. */
export function InstallButton({ className, compact = false, onResult }: { className?: string; compact?: boolean; onResult?: (r: string) => void }) {
  const { t } = useI18n();
  const { platform, standalone, install } = useInstall();
  if (standalone || platform !== 'prompt') return null;
  return (
    <Button className={className} onClick={async () => onResult?.(await install())}>
      <Icon name="download" className="h-4 w-4" /> {compact ? t('pwa.install.short') : t('pwa.install.button')}
    </Button>
  );
}

/** Dismissible reminder in the main layout: a real install button where possible, Share-menu hint on iPhone/iPad. */
export function InstallBanner() {
  const { t } = useI18n();
  const { platform, standalone, installedNow } = useInstall();
  const [hidden, setHidden] = useState(installReminderDismissed);
  if (hidden || standalone || installedNow || platform === 'other') return null;
  const hide = () => {
    dismissInstallReminder();
    setHidden(true);
  };
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-white p-3 text-sm shadow-sm">
      <img src={`${import.meta.env.BASE_URL}icons/icon-192.png`} alt="" className="h-10 w-10 shrink-0 rounded-xl object-cover" />
      <div className="min-w-0 flex-1">
        <div className="font-semibold">{t('pwa.install.bannerTitle')}</div>
        <div className="text-muted">{platform === 'ios' ? t('pwa.install.bannerIosText') : t('pwa.install.bannerText')}</div>
      </div>
      <div className="flex items-center gap-2">
        <InstallButton compact />
        <button type="button" onClick={hide} className="rounded-lg px-2 py-1 text-xs text-muted hover:bg-black/5">{t('pwa.install.dismiss')}</button>
      </div>
    </div>
  );
}

const PLATFORMS = ['ios', 'android', 'desktop', 'safariMac', 'firefox'] as const;

/** Install status, the install button when available, and instructions for each platform. */
export function InstallPanel() {
  const { t } = useI18n();
  const { platform, standalone, installedNow } = useInstall();
  const [result, setResult] = useState<string | null>(null);
  const highlight = (p: (typeof PLATFORMS)[number], current: InstallPlatform) =>
    (current === 'ios' && p === 'ios') || (current === 'prompt' && (p === 'android' || p === 'desktop'));
  if (standalone || installedNow) {
    return <p className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800"><Icon name="check" className="h-4 w-4" />{installedNow ? t('pwa.install.installedNow') : t('pwa.install.installed')}</p>;
  }
  return (
    <div className="space-y-3 text-sm">
      <p className="text-muted">{t('pwa.install.note')}</p>
      {platform === 'prompt' ? (
        <div className="flex flex-wrap items-center gap-3">
          <InstallButton onResult={setResult} />
          {result === 'accepted' && <span className="text-emerald-700">{t('pwa.install.accepted')}</span>}
          {result === 'dismissed' && <span className="text-muted">{t('pwa.install.dismissed')}</span>}
        </div>
      ) : platform === 'other' ? (
        <p className="rounded-xl bg-stone-50 px-3 py-2 text-stone-700">{t('pwa.install.noPrompt')}</p>
      ) : null}
      <div>
        <div className="mb-1 font-medium">{t('pwa.platforms.title')}</div>
        <ul className="space-y-2">
          {PLATFORMS.map((p) => (
            <li key={p} className={cx('rounded-xl border px-3 py-2', highlight(p, platform) ? 'border-sky-300 bg-sky-50' : 'border-line')}>
              <div className="flex flex-wrap items-center gap-2 font-medium">
                {t(`pwa.platforms.${p}.name`)}
                {highlight(p, platform) && <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-medium text-sky-700">{t('pwa.platforms.detected')}</span>}
              </div>
              <div className="text-muted">{t(`pwa.platforms.${p}.steps`)}</div>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-muted">{t('pwa.install.sameData')}</p>
    </div>
  );
}

// ---------- lazily loaded parts ----------

/**
 * Error boundary for lazily loaded sections (ISTQB, conversation practice). If a chunk cannot be fetched
 * (offline before it was cached, or an old version after an update), show a useful message instead of a blank page.
 */
export class ChunkErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function ChunkError() {
  const { t } = useI18n();
  return (
    <Card className="mx-auto mt-10 max-w-lg text-center">
      <h2 className="text-lg font-semibold">{t('pwa.chunk.title')}</h2>
      <p className="mt-2 text-sm text-muted">{t('pwa.chunk.text')}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {/* React.lazy remembers a failed import, so trying again means reloading the page */}
        <Button onClick={() => window.location.reload()}>{t('pwa.chunk.reload')}</Button>
      </div>
    </Card>
  );
}
