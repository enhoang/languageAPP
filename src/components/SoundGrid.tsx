import type { SoundItem } from '../types';
import { useSpeech } from '../state/AppDataContext';
import { useI18n } from '../i18n/LocaleContext';
import { Prose } from './Prose';
import { cx } from './ui';

/**
 * Grid of sound cards. Clicking the top of a card plays its audio. The note sits outside the
 * play button because it may contain its own "show translation" button (Chinese interface).
 */
export function SoundGrid({ items }: { items: SoundItem[] }) {
  const { speak, hasVoice, course } = useSpeech();
  const { t, tr, gl, glossLang } = useI18n();
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((it, i) => {
        const label = tr(it.label);
        const meaning = it.vi || it.en ? gl({ vi: it.vi ?? '', en: it.en ?? '' }) : '';
        return (
          <div key={`${it.text}-${i}`} className="group rounded-xl border border-line bg-white transition hover:border-sky-300 hover:bg-sky-50">
            <button type="button" onClick={() => speak(it.text)} disabled={!hasVoice} aria-label={`${label} · ${t('common.audio.playAria', { text: it.text })}`}
              className="block w-full p-3 pb-0 text-left disabled:cursor-default">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-semibold text-peach-600">{label}</span>
                <span className="text-xs text-sky-400 opacity-0 transition group-hover:opacity-100" aria-hidden="true">🔊</span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className={cx(course.fontClass, 'text-2xl')} lang={course.speechLang}>{it.text}</span>
                {it.pron && <span className="font-medium text-sky-600">{it.pron}</span>}
              </div>
              {meaning && <div className="text-xs text-muted" lang={glossLang}>{meaning}</div>}
            </button>
            <div className="px-3 pb-3">
              {it.note && <div className="mt-1 text-xs leading-snug text-stone-500"><Prose text={it.note} /></div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
