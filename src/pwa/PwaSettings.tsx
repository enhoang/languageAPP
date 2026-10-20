import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/LocaleContext';
import { Button, Card, SectionTitle } from '../components/ui';
import { InstallPanel, checkForUpdate } from './PwaUI';
import { requestPersistentStorage, resetInstallReminder, storageInfo, useInstall, useOnline, type StorageInfo } from './pwaState';

const fmtBytes = (n: number | undefined, locale: string) => {
  if (n === undefined) return '?';
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i += 1;
  }
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: v < 10 ? 1 : 0 }).format(v)} ${units[i]}`;
};

/** Settings → App & offline: installation, offline scope, updates and storage reliability. */
export function PwaSettings() {
  const { t, locale } = useI18n();
  const { standalone } = useInstall();
  const online = useOnline();
  const [sw, setSw] = useState(false);
  const [store, setStore] = useState<StorageInfo | null>(null);
  const [persistMsg, setPersistMsg] = useState<string | null>(null);
  const [update, setUpdate] = useState<'idle' | 'checking' | 'checked' | 'unavailable'>('idle');
  const [reminderReset, setReminderReset] = useState(false);

  useEffect(() => {
    void storageInfo().then(setStore);
    if ('serviceWorker' in navigator) void navigator.serviceWorker.getRegistration().then((r) => setSw(Boolean(r?.active)));
  }, []);

  return (
    <Card>
      <SectionTitle>{t('pwa.settings.title')}</SectionTitle>
      <div className="mb-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-stone-100 px-2.5 py-1">{standalone ? t('pwa.settings.statusInstalled') : t('pwa.settings.statusBrowser')}</span>
        <span className={online ? 'rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700' : 'rounded-full bg-amber-50 px-2.5 py-1 text-amber-800'}>
          {online ? t('pwa.settings.statusOnline') : t('pwa.settings.statusOffline')}
        </span>
        <span className={sw ? 'rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700' : 'rounded-full bg-stone-100 px-2.5 py-1 text-stone-600'}>
          {sw ? t('pwa.settings.swActive') : t('pwa.settings.swNone')}
        </span>
      </div>

      <InstallPanel />
      {!standalone && (
        <button type="button" className="mt-2 text-xs text-sky-700 underline" onClick={() => { resetInstallReminder(); setReminderReset(true); }} disabled={reminderReset}>
          {t('pwa.settings.showReminder')}{reminderReset ? ' ✓' : ''}
        </button>
      )}

      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-xl bg-emerald-50 px-3 py-2 text-emerald-900">
          <div className="font-medium">{t('pwa.settings.offlineTitle')}</div>
          <p className="mt-1">{t('pwa.settings.offlineWorks')}</p>
        </div>
        <div className="rounded-xl bg-amber-50 px-3 py-2 text-amber-900">
          <p>{t('pwa.settings.offlineNeedsNet')}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <Button variant="secondary" disabled={update === 'checking'} onClick={async () => {
          setUpdate('checking');
          setUpdate(await checkForUpdate());
        }}>{update === 'checking' ? t('pwa.update.checking') : t('pwa.update.check')}</Button>
        {update === 'checked' && <span className="text-muted">{t('pwa.update.upToDate')}</span>}
        {update === 'unavailable' && <span className="text-muted">{t('pwa.update.unavailable')}</span>}
      </div>

      <div className="mt-5 text-sm">
        <div className="font-medium">{t('pwa.settings.storageTitle')}</div>
        <p className="mt-1 text-muted">{t('pwa.settings.storageText')}</p>
        {store && !store.supported && <p className="mt-2 text-muted">{t('pwa.settings.storageUnsupported')}</p>}
        {store?.supported && (
          <div className="mt-2 space-y-2">
            {store.usage !== undefined && store.quota !== undefined && (
              <p>{t('pwa.settings.storageUsage', { used: fmtBytes(store.usage, locale), quota: fmtBytes(store.quota, locale) })}</p>
            )}
            <p className={store.persisted ? 'text-emerald-700' : 'text-amber-800'}>{store.persisted ? t('pwa.settings.persisted') : t('pwa.settings.notPersisted')}</p>
            {!store.persisted && (
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="secondary" onClick={async () => {
                  const ok = await requestPersistentStorage();
                  setStore(await storageInfo());
                  setPersistMsg(ok ? null : t('pwa.settings.persistDenied'));
                }}>{t('pwa.settings.persist')}</Button>
                {persistMsg && <span className="text-muted">{persistMsg}</span>}
              </div>
            )}
          </div>
        )}
        <a href="#settings-backup" onClick={(e) => { e.preventDefault(); document.getElementById('settings-backup')?.scrollIntoView({ behavior: 'smooth' }); }} className="mt-2 inline-block text-sky-700 underline">
          {t('pwa.settings.backupLink')}
        </a>
      </div>
    </Card>
  );
}
