import { useCallback, useEffect, useRef, useState } from 'react';
import { HINT_LEVELS, type ConvSession, type HintLevel, type Suggestion } from '../../conversation/types';
import { phraseId } from '../../conversation/store';
import { useConv } from '../../conversation/ConvContext';
import { useI18n } from '../../i18n/LocaleContext';
import { AudioButton } from '../Audio';
import { Icon } from '../Icon';
import { Button, cx } from '../ui';
import { PronLine, errorKindOf, targetProps, useGloss, type ErrorKind } from './shared';

type Entry = { s: 'loading' } | { s: 'ok'; items: Suggestion[] } | { s: 'error'; kind: ErrorKind };

/**
 * "Suggest words": words, phrases or whole sentences for the current turn. Items can be inserted into the draft
 * (never sent) or saved for review. A bottom sheet on phones, a side drawer on larger screens.
 */
export function SuggestPanel({ session, onInsert, onClose }: { session: ConvSession; onInsert: (text: string) => void; onClose: () => void }) {
  const { t } = useI18n();
  const { provider } = useConv();
  const [level, setLevel] = useState<HintLevel>('word');
  const [cache, setCache] = useState<Partial<Record<HintLevel, Entry>>>({});
  const closeRef = useRef<HTMLButtonElement>(null);

  const load = useCallback(async (l: HintLevel) => {
    setCache((c) => ({ ...c, [l]: { s: 'loading' } }));
    try {
      const items = await provider.suggest(session.setup, session.messages, l, { demoScriptId: session.demo?.scriptId });
      setCache((c) => ({ ...c, [l]: { s: 'ok', items } }));
    } catch (e) {
      setCache((c) => ({ ...c, [l]: { s: 'error', kind: errorKindOf(e) } }));
    }
    // the panel is opened for one moment of the conversation; results are cached per level while it stays open
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  useEffect(() => {
    if (!cache[level]) void load(level);
  }, [level, cache, load]);

  const closeFn = useRef(onClose);
  closeFn.current = onClose;
  useEffect(() => {
    const before = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeFn.current(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      before?.focus?.();
    };
  }, []);

  const entry = cache[level];
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-stretch md:justify-end" role="dialog" aria-modal="true" aria-labelledby="conv-suggest-title">
      <button type="button" className="absolute inset-0 bg-black/30" onClick={onClose} aria-label={t('conv.suggest.close')} tabIndex={-1} />
      <div className="relative flex max-h-[85vh] w-full flex-col rounded-t-2xl bg-cream shadow-xl md:max-h-none md:w-[26rem] md:rounded-none md:rounded-l-2xl">
        <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-3">
          <h2 id="conv-suggest-title" className="flex items-center gap-2 font-semibold"><Icon name="bulb" className="h-5 w-5 text-amber-500" />{t('conv.suggest.title')}</h2>
          <button ref={closeRef} type="button" onClick={onClose} className="rounded-full p-2 hover:bg-black/5" aria-label={t('conv.suggest.close')}><Icon name="x" /></button>
        </div>
        <div role="tablist" aria-label={t('conv.suggest.title')} className="flex gap-1 px-4 pt-3">
          {HINT_LEVELS.map((l) => (
            <button key={l} role="tab" type="button" aria-selected={level === l} onClick={() => setLevel(l)}
              className={cx('flex-1 rounded-full px-3 py-1.5 text-sm transition', level === l ? 'bg-sky-500 font-medium text-white' : 'bg-white text-stone-600 ring-1 ring-line hover:bg-sky-50')}>
              {t(`conv.suggest.tabs.${l}`)}
            </button>
          ))}
        </div>
        <p className="px-4 pt-2 text-xs text-muted">{t('conv.suggest.note')}</p>
        <div role="tabpanel" className="flex-1 space-y-2 overflow-y-auto px-4 py-3" aria-live="polite" aria-busy={entry?.s === 'loading'}>
          {(!entry || entry.s === 'loading') && <p className="py-6 text-center text-sm text-muted">{t('conv.suggest.loading')}</p>}
          {entry?.s === 'error' && (
            <div className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {t(`conv.errors.${entry.kind}`)}
              <Button variant="secondary" className="mt-2 px-3 py-1.5" onClick={() => void load(level)}><Icon name="refresh" className="h-4 w-4" />{t('conv.chat.retry')}</Button>
            </div>
          )}
          {entry?.s === 'ok' && entry.items.length === 0 && <p className="py-6 text-center text-sm text-muted">{t('conv.suggest.empty')}</p>}
          {entry?.s === 'ok' && entry.items.map((it, i) => <SuggestionItem key={`${it.text}-${i}`} it={it} session={session} onInsert={onInsert} />)}
        </div>
      </div>
    </div>
  );
}

function SuggestionItem({ it, session, onInsert }: { it: Suggestion; session: ConvSession; onInsert: (text: string) => void }) {
  const { t } = useI18n();
  const { data, savePhrase, setDifficult } = useConv();
  const { setup } = session;
  const { g, gLang } = useGloss(setup.lang);
  const tp = targetProps(setup.lang);
  const id = phraseId(setup.lang, it.text);
  const saved = data.saved[id];
  const save = (difficult?: boolean) => {
    if (saved && difficult) setDifficult(id, true);
    else savePhrase({ lang: setup.lang, text: it.text, pron: it.pron, meaning: it.meaning, example: it.example || undefined, exampleTranslation: it.example ? it.exampleTranslation : undefined, scenario: setup.scenario, sessionId: session.id, ...(difficult ? { difficult: true } : {}) });
  };
  return (
    <div className="rounded-xl border border-line bg-white p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div lang={tp.lang} className={cx(tp.className, 'break-words text-lg leading-snug')}>{it.text}</div>
          <PronLine lang={setup.lang} pron={it.pron} level={setup.level} />
          <div className="text-sm text-stone-700" lang={gLang}>{g(it.meaning)}</div>
        </div>
        <AudioButton text={it.text} size="sm" courseId={setup.lang} className="shrink-0" />
      </div>
      {it.example && (
        <div className="mt-2 rounded-lg bg-stone-50 px-2.5 py-1.5 text-sm">
          <div className="text-[11px] font-medium uppercase tracking-wide text-muted">{t('conv.suggest.example')}</div>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div lang={tp.lang} className={cx(tp.className, 'break-words')}>{it.example}</div>
              <div className="text-xs text-stone-600" lang={gLang}>{g(it.exampleTranslation)}</div>
            </div>
            <AudioButton text={it.example} size="sm" showSlow={false} courseId={setup.lang} className="shrink-0" />
          </div>
        </div>
      )}
      <div className="mt-2 flex flex-wrap gap-1.5">
        <Button className="px-3 py-1.5" onClick={() => onInsert(it.text)}>{t('conv.suggest.insert')}</Button>
        <Button variant="secondary" className="px-3 py-1.5" disabled={!!saved} onClick={() => save()}>
          {saved ? <><Icon name="check" className="h-4 w-4" />{t('conv.suggest.saved')}</> : t('conv.suggest.save')}
        </Button>
        <Button variant="ghost" className="px-3 py-1.5" disabled={!!saved?.difficult} onClick={() => save(true)}>
          <Icon name="flag" className="h-4 w-4" />{saved?.difficult ? t('conv.suggest.markedDifficult') : t('conv.suggest.difficult')}
        </Button>
      </div>
    </div>
  );
}
