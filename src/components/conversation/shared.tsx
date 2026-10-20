import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import type { Gloss } from '../../types';
import type { ConvLang, ConvSession, ConvSetup, Pron, ProviderKind } from '../../conversation/types';
import { ConversationError, HttpProvider, backendUrl, demoScriptFor, type ConversationProvider } from '../../conversation/provider';
import { applyTurn, createSession } from '../../conversation/store';
import { useConv } from '../../conversation/ConvContext';
import { useI18n } from '../../i18n/LocaleContext';
import { glossLangFor } from '../../i18n/langs';
import { COURSES } from '../../courses';
import { Badge, cx } from '../ui';

const SECTIONS = [
  { to: '/conversation', key: 'home', end: true },
  { to: '/conversation/review', key: 'review' },
  { to: '/conversation/settings', key: 'settings' },
] as const;

/** Section tabs of conversation practice. */
export function ConvNav() {
  const { t } = useI18n();
  return (
    <nav aria-label={t('conv.nav.label')} className="-mx-1 mb-6 flex gap-1 overflow-x-auto px-1 pb-1">
      {SECTIONS.map((s) => (
        <NavLink key={s.to} to={s.to} end={'end' in s}
          className={({ isActive }) => cx('whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition',
            isActive ? 'bg-sky-500 font-medium text-white' : 'bg-white text-stone-600 ring-1 ring-line hover:bg-sky-50')}>
          {t(`conv.nav.${s.key}`)}
        </NavLink>
      ))}
    </nav>
  );
}

/** Meanings/translations for text in `lang`: interface language, or the support language (zh UI, or UI = target language). */
export function useGloss(lang: ConvLang) {
  const { lang: ui, supportLang } = useI18n();
  const gLang = glossLangFor(ui, supportLang, lang);
  const g = useCallback((x: Gloss | undefined) => (x ? x[gLang] || x.vi || x.en : ''), [gLang]);
  return { g, gLang };
}

/** Props for text written in the target language. */
export function targetProps(lang: ConvLang) {
  return { lang: COURSES[lang].speechLang, className: COURSES[lang].fontClass };
}

export function ProviderBadge({ kind }: { kind: ProviderKind }) {
  const { t } = useI18n();
  return <Badge tone={kind === 'ai' ? 'green' : 'amber'}>{t(`conv.provider.${kind}`)}</Badge>;
}

export function useScenarioLabel() {
  const { t } = useI18n();
  return (setup: ConvSetup) => (setup.scenario === 'custom' && setup.customTopic ? setup.customTopic : t(`conv.scenario.${setup.scenario}`));
}

export type ErrorKind = ConversationError['kind'];
export const errorKindOf = (e: unknown): ErrorKind => (e instanceof ConversationError ? e.kind : 'server');

/** Create a session for the setup and play the provider's first turn. */
export async function startConversation(provider: ConversationProvider, setup: ConvSetup): Promise<ConvSession> {
  const scriptId = provider.kind === 'demo' ? demoScriptFor(setup)?.id : undefined;
  if (provider.kind === 'demo' && !scriptId) throw new ConversationError('no demo script', 'input');
  const first = await provider.start(setup);
  return applyTurn(createSession(setup, provider.kind, new Date(), scriptId), first);
}

/** Append a snippet to a draft: with a space, or without one for Chinese. */
export function appendToDraft(draft: string, text: string, lang: ConvLang): string {
  if (!draft.trim()) return text;
  if (lang === 'zh') return draft.replace(/\s+$/, '') + text;
  return /\s$/.test(draft) ? draft + text : `${draft} ${text}`;
}

export type Health = { s: 'demo' } | { s: 'checking'; url: string } | { s: 'ok'; url: string; model?: string } | { s: 'needsCode'; url: string } | { s: 'unreachable'; url: string };

/** Health of the configured AI backend (demo when none). */
export function useBackendHealth(): Health {
  const { data } = useConv();
  const url = backendUrl(data.settings);
  const [h, setH] = useState<Health>(url ? { s: 'checking', url } : { s: 'demo' });
  useEffect(() => {
    if (!url) {
      setH({ s: 'demo' });
      return;
    }
    let alive = true;
    setH({ s: 'checking', url });
    void HttpProvider.health(url).then((r) => {
      if (!alive) return;
      if (!r.ok) setH({ s: 'unreachable', url });
      else if (r.accessCodeRequired && !data.settings.accessCode) setH({ s: 'needsCode', url });
      else setH({ s: 'ok', url, model: r.model });
    });
    return () => {
      alive = false;
    };
  }, [url, data.settings.accessCode]);
  return h;
}

/**
 * Pronunciation in the target language's own system only: pinyin (zh), IPA US/UK and a beginner respelling (en),
 * romanization as an aid plus the actual pronunciation and sound-change note (ko).
 */
export function PronLine({ lang, pron, level, className }: { lang: ConvLang; pron?: Pron; level?: ConvSetup['level']; className?: string }) {
  const { t } = useI18n();
  const { data } = useConv();
  const { g, gLang } = useGloss(lang);
  if (!pron || !data.settings.showPron) return null;
  const parts: ReactNode[] = [];
  if (lang === 'zh' && pron.pinyin) parts.push(<span key="py" className="font-medium text-sky-700">{pron.pinyin}</span>);
  if (lang === 'en') {
    if (pron.ipaUS) parts.push(<span key="us"><span className="mr-1 text-[10px] font-semibold text-muted">{t('conv.pron.us')}</span><span className="text-sky-700">{pron.ipaUS}</span></span>);
    if (pron.ipaUK && pron.ipaUK !== pron.ipaUS) parts.push(<span key="uk"><span className="mr-1 text-[10px] font-semibold text-muted">{t('conv.pron.uk')}</span><span className="text-sky-700">{pron.ipaUK}</span></span>);
    if (pron.respelling && (level === 'beginner' || level === 'elementary')) parts.push(<span key="rs" className="text-stone-600">{t('conv.pron.respelling', { text: pron.respelling })}</span>);
  }
  if (lang === 'ko') {
    if (pron.spoken) parts.push(<span key="sp" className="text-sky-700" lang="ko-KR">{t('conv.pron.spoken', { text: pron.spoken })}</span>);
    if (pron.romanization) parts.push(<span key="ro" className="text-xs text-muted">{t('conv.pron.romanization')}: {pron.romanization}</span>);
  }
  const note = g(pron.note);
  if (!parts.length && !note) return null;
  return (
    <div className={cx('text-sm', className)}>
      {parts.length > 0 && <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 break-words">{parts}</div>}
      {note && <div className="mt-0.5 text-xs text-stone-600" lang={gLang}>{note}</div>}
      {pron.source === 'ai' && <div className="mt-0.5 text-[11px] italic text-muted">{t('conv.pron.aiWarning')}</div>}
    </div>
  );
}

const DATE_OPTS: Intl.DateTimeFormatOptions = { dateStyle: 'medium', timeStyle: 'short' };
export function useDateFmt() {
  const { locale } = useI18n();
  return (iso: string) => {
    try {
      return new Intl.DateTimeFormat(locale, DATE_OPTS).format(new Date(iso));
    } catch {
      return iso;
    }
  };
}
