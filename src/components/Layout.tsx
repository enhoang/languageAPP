import { useEffect, useState, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { InstallBanner, OfflineBanner, UpdateBanner } from '../pwa/PwaUI';
import { useAppData } from '../state/AppDataContext';
import { computeStreak, totalActivity } from '../lib/stats';
import { useI18n } from '../i18n/LocaleContext';
import { Icon, type IconName } from './Icon';
import { LanguageSelect } from './LanguageSwitcher';
import { CourseSwitcher } from './CourseSwitcher';
import { cx } from './ui';

type NavKey = 'home' | 'path' | 'vocabulary' | 'pronunciation' | 'grammar' | 'practice' | 'tests' | 'progress' | 'settings';

/** Main sections. Labels: dictionary keys `common.nav.<nav>`. */
export const NAV: { to: string; nav: NavKey; icon: IconName }[] = [
  { to: '/', nav: 'home', icon: 'home' },
  { to: '/path', nav: 'path', icon: 'path' },
  { to: '/vocabulary', nav: 'vocabulary', icon: 'book' },
  { to: '/pronunciation', nav: 'pronunciation', icon: 'wave' },
  { to: '/grammar', nav: 'grammar', icon: 'grammar' },
  { to: '/practice', nav: 'practice', icon: 'pencil' },
  { to: '/tests', nav: 'tests', icon: 'test' },
  { to: '/progress', nav: 'progress', icon: 'chart' },
  { to: '/settings', nav: 'settings', icon: 'settings' },
];

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useI18n();
  return (
    <nav className="space-y-1" aria-label={t('common.nav.mainNav')}>
      {NAV.map((n) => (
        <NavLink key={n.to} to={n.to} end={n.to === '/'} onClick={onNavigate}
          className={({ isActive }) => cx('flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
            isActive ? 'bg-sky-100 text-sky-700' : 'text-stone-600 hover:bg-white hover:text-ink')}>
          <Icon name={n.icon} />
          {t(`common.nav.${n.nav}`)}
        </NavLink>
      ))}
      {/* Conversation practice: Chinese, English or Korean, independent of the daily lessons */}
      <NavLink to="/conversation" onClick={onNavigate}
        className={({ isActive }) => cx('mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
          isActive ? 'bg-violet-100 text-violet-800' : 'text-stone-600 hover:bg-white hover:text-ink')}>
        <Icon name="chat" />
        {t('common.nav.conversation')}
      </NavLink>
      {/* Professional knowledge: independent of the language courses */}
      <div className="px-3 pb-1 pt-4 text-[11px] font-medium uppercase tracking-wide text-muted">{t('common.nav.professional')}</div>
      <NavLink to="/qa" onClick={onNavigate}
        className={({ isActive }) => cx('flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
          isActive ? 'bg-emerald-100 text-emerald-800' : 'text-stone-600 hover:bg-white hover:text-ink')}>
        <Icon name="shield" />
        {t('common.nav.qa')}
      </NavLink>
      <NavLink to="/guide" onClick={onNavigate}
        className={({ isActive }) => cx('mt-3 flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition', isActive ? 'bg-sky-100 text-sky-700' : 'text-muted hover:bg-white')}>
        <Icon name="help" /> {t('common.nav.guide')}
      </NavLink>
    </nav>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <img src={`${import.meta.env.BASE_URL}app-icon.png`} alt="" aria-hidden="true" className="h-9 w-9 shrink-0 rounded-xl object-cover" />
      <div className={cx('min-w-0 leading-tight', compact && 'hidden sm:block')}>
        <div className="truncate text-sm font-semibold">{t('layout.appName')}</div>
        <div className="truncate text-xs text-muted">{t('layout.appTagline')}</div>
      </div>
    </div>
  );
}

/** Small caption above a switcher, so "Studying" and "Interface language" are never confused. */
function SwitchLabel({ children }: { children: ReactNode }) {
  return <div className="mb-1 px-0.5 text-[11px] font-medium uppercase tracking-wide text-muted">{children}</div>;
}

export function Layout({ children }: { children: ReactNode }) {
  const { data, saveError } = useAppData();
  const { t } = useI18n();
  const streak = computeStreak(totalActivity(data));
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loc.pathname]);

  return (
    <div className="min-h-screen lg:flex">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-line bg-cream px-4 py-5 lg:flex">
        <Brand />
        <div className="mt-5">
          <SwitchLabel>{t('layout.studying')}</SwitchLabel>
          <CourseSwitcher className="w-full" />
        </div>
        <div className="mt-4 flex-1 overflow-y-auto"><NavItems /></div>
        <SwitchLabel>{t('layout.interfaceLanguage')}</SwitchLabel>
        <LanguageSelect className="mb-2 w-full" />
        <div className="rounded-xl bg-peach-50 px-3 py-2 text-sm text-peach-600">
          <span className="inline-flex items-center gap-1.5"><Icon name="flame" className="h-4 w-4" /> {t('common.nav.streak', { count: streak })}</span>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-line bg-cream/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex min-w-0 items-center gap-2">
          <Brand compact />
          <CourseSwitcher compact className="sm:hidden" />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {/* From 640px both switchers fit in the bar; on phones the interface language sits in the menu drawer. */}
          <div className="hidden sm:block"><CourseSwitcher className="w-44" /></div>
          <LanguageSelect className="hidden sm:inline-flex" />
          <span className="inline-flex items-center gap-1 rounded-full bg-peach-50 px-2.5 py-1 text-xs text-peach-600" title={t('common.nav.streak', { count: streak })}>
            <Icon name="flame" className="h-3.5 w-3.5" />{streak}
            <span className="sr-only">{t('common.nav.streak', { count: streak })}</span>
          </span>
          <button type="button" onClick={() => setOpen(true)} className="rounded-lg p-2 hover:bg-black/5" aria-label={t('common.nav.openMenu')}><Icon name="menu" /></button>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/20" onClick={() => setOpen(false)} />
          <div className="fade-in absolute right-0 top-0 h-full w-72 max-w-[85vw] overflow-y-auto bg-cream p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <Brand />
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-black/5" aria-label={t('common.nav.closeMenu')}><Icon name="x" /></button>
            </div>
            <SwitchLabel>{t('layout.studying')}</SwitchLabel>
            <CourseSwitcher className="mb-3 w-full" onNavigate={() => setOpen(false)} />
            <SwitchLabel>{t('layout.interfaceLanguage')}</SwitchLabel>
            <LanguageSelect className="mb-4 w-full" />
            <NavItems onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 pb-24 sm:px-6 lg:px-10 lg:py-8">
        {saveError && (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {t('common.saveError')}
          </div>
        )}
        <UpdateBanner />
        <OfflineBanner />
        <InstallBanner />
        {children}
      </main>

      {/* Mobile bottom navigation: 5 main sections */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-white/95 backdrop-blur lg:hidden" aria-label={t('common.nav.quickNav')}>
        {NAV.filter((n) => ['/', '/path', '/vocabulary', '/practice', '/progress'].includes(n.to)).map((n) => (
          <NavLink key={n.to} to={n.to} end={n.to === '/'}
            className={({ isActive }) => cx('flex flex-col items-center gap-0.5 py-2 text-[11px]', isActive ? 'text-sky-600' : 'text-stone-500')}>
            <Icon name={n.icon} className="h-5 w-5" />
            <span className="max-w-full truncate px-0.5">{t(`common.nav.${n.nav}`)}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
