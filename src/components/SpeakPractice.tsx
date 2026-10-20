import { useEffect, useRef, useState } from 'react';
import type { SpeakItem } from '../types';
import { useCourse, useSpeech } from '../state/AppDataContext';
import { useI18n } from '../i18n/LocaleContext';
import { listenOnce, recognitionSupported, speakLevel, SPEAK_LEVELS, type ListenError, type SpeakLevel } from '../lib/recognition';
import { AudioButton } from './Audio';
import { Icon } from './Icon';
import { cx } from './ui';

type RecState =
  | { s: 'idle' }
  | { s: 'listening' }
  | { s: 'heard'; transcript: string; level: SpeakLevel }
  | { s: 'error'; error: ListenError };

const LEVEL_STYLE: Record<SpeakLevel, { box: string; on: string }> = {
  none: { box: 'bg-rose-50 text-rose-800', on: 'bg-rose-100 text-rose-700 ring-1 ring-rose-200' },
  retry: { box: 'bg-orange-50 text-orange-800', on: 'bg-orange-100 text-orange-700 ring-1 ring-orange-200' },
  improve: { box: 'bg-amber-50 text-amber-800', on: 'bg-amber-100 text-amber-800 ring-1 ring-amber-200' },
  good: { box: 'bg-emerald-50 text-emerald-800', on: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200' },
};

function SpeakRow({ item, canRecognize, level, onLevel }: {
  item: SpeakItem; canRecognize: boolean; level: SpeakLevel | null; onLevel: (v: SpeakLevel) => void;
}) {
  const { course } = useCourse();
  const { lang } = useSpeech();
  const { t, gl, glossLang } = useI18n();
  const [rec, setRec] = useState<RecState>({ s: 'idle' });
  const cancelRef = useRef<(() => void) | null>(null);
  useEffect(() => () => cancelRef.current?.(), []);

  const sayIt = async () => {
    cancelRef.current?.();
    setRec({ s: 'listening' });
    const { result, cancel } = listenOnce(lang);
    cancelRef.current = cancel;
    const r = await result;
    cancelRef.current = null;
    if (r.ok) {
      const l = speakLevel(item.text, r.transcripts);
      setRec({ s: 'heard', transcript: r.transcripts[0], level: l });
      onLevel(l);
    } else setRec({ s: 'error', error: r.error });
  };
  const stop = () => {
    cancelRef.current?.();
    cancelRef.current = null;
    setRec({ s: 'idle' });
  };

  const meaning = item.vi || item.en ? gl({ vi: item.vi ?? '', en: item.en ?? '' }) : '';
  return (
    <div className="rounded-xl border border-line bg-white p-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          {item.pron && <div className="text-sm font-medium text-sky-600">{item.pron}</div>}
          <div className={cx(course.fontClass, 'text-2xl leading-tight text-ink')} lang={course.speechLang}>{item.text}</div>
          {meaning && <div className="text-sm text-muted" lang={glossLang}>{meaning}</div>}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <AudioButton text={item.text} />
          {canRecognize && (rec.s === 'listening' ? (
            <button type="button" onClick={stop} className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-600 ring-2 ring-rose-200">
              <span className="h-2 w-2 animate-pulse rounded-full bg-rose-500" aria-hidden="true" /> {t('speak.stop')}
            </button>
          ) : (
            <button type="button" onClick={sayIt} className="inline-flex items-center gap-1 rounded-full bg-sky-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-600">
              🎤 {t('speak.sayIt')}
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite">
        {rec.s === 'listening' && <p className="mt-2 text-sm text-sky-700">{t('speak.listening')}</p>}
        {rec.s === 'heard' && (
          <div className={cx('mt-2 rounded-lg px-3 py-2 text-sm', LEVEL_STYLE[rec.level].box)}>
            <span>{t('speak.heard')} </span>
            <span className={cx(course.fontClass, 'font-medium')} lang={course.speechLang}>“{rec.transcript}”</span>
            <span className="ml-2 font-semibold">{t(`speak.level.${rec.level}`)}</span>
            <span className="ml-1">— {t(`speak.levelHint.${rec.level}`)}</span>
          </div>
        )}
        {rec.s === 'error' && <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">{t(`speak.error.${rec.error}`)}</p>}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-1.5" role="group" aria-label={t('speak.rate')}>
        <span className="mr-1 text-xs text-muted">{t('speak.rate')}</span>
        {SPEAK_LEVELS.map((l) => (
          <button key={l} type="button" onClick={() => onLevel(l)} aria-pressed={level === l}
            className={cx('rounded-lg px-2.5 py-1 text-xs font-medium transition', level === l ? LEVEL_STYLE[l].on : 'bg-stone-100 text-stone-600 hover:bg-stone-200')}>
            {l === 'good' && <Icon name="check" className="mr-1 inline h-3.5 w-3.5 align-[-2px]" />}{t(`speak.level.${l}`)}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Say each item aloud. Listen to the model, then either use the browser's speech recognition (an approximate
 * hint, where available, which picks a level) or rate themselves on the same four levels. Nothing is recorded into scores.
 */
export function SpeakPractice({ items }: { items: SpeakItem[] }) {
  const { t } = useI18n();
  const [canRecognize] = useState(recognitionSupported);
  // Latest rating per item: set automatically by speech recognition, or chosen by the learner.
  const [levels, setLevels] = useState<Record<number, SpeakLevel>>({});
  const done = Object.values(levels).filter((v) => v === 'good').length;
  return (
    <div className="space-y-2">
      <p className="rounded-xl bg-sky-50 px-3 py-2 text-xs text-sky-800">
        {canRecognize ? t('speak.note') : t('speak.unsupported')} {t('speak.manual')}
      </p>
      {items.map((it, i) => (
        <SpeakRow key={`${it.text}-${i}`} item={it} canRecognize={canRecognize} level={levels[i] ?? null}
          onLevel={(v) => setLevels((c) => ({ ...c, [i]: v }))} />
      ))}
      {items.length > 1 && <p className="text-xs text-muted">{t('speak.progress', { done, total: items.length })}</p>}
    </div>
  );
}
