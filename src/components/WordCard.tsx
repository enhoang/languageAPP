import { useState } from 'react';
import type { Word } from '../types';
import { useAppData, useCourse } from '../state/AppDataContext';
import { useI18n } from '../i18n/LocaleContext';
import { wordStatus } from '../lib/srs';
import { AudioButton } from './Audio';
import { Prose } from './Prose';
import { Icon } from './Icon';
import { StrokeOrder } from './StrokeOrder';
import { Badge, cx } from './ui';

const STATUS_TONE = { new: 'gray', learning: 'amber', familiar: 'sky', mastered: 'green' } as const;
const HAN = /\p{Script=Han}/u;

/** Pronunciation aid of a word: pinyin / romanization, or US + UK IPA for English (chosen accent first). */
function WordPron({ word }: { word: Word }) {
  const { course } = useCourse();
  const { data } = useAppData();
  const { t, tr } = useI18n();
  const label = <span className="mr-1 text-[10px] font-semibold uppercase tracking-wide text-stone-400">{tr(course.pronName)}</span>;
  if (course.id === 'en' && word.pron && word.pronUK && word.pronUK !== word.pron) {
    const both = [{ accent: 'en-US' as const, ipa: word.pron }, { accent: 'en-GB' as const, ipa: word.pronUK }];
    if (data.settings.englishAccent === 'en-GB') both.reverse();
    return (
      <div className="flex flex-wrap items-baseline gap-x-3 font-medium text-sky-600">
        {label}
        {both.map((b, i) => (
          <span key={b.accent} className={cx(i > 0 && 'text-sm text-sky-500')}>
            <span className="mr-1 text-[10px] font-semibold text-stone-400">{t(`word.accent.${b.accent}`)}</span>{b.ipa}
          </span>
        ))}
      </div>
    );
  }
  if (!word.pron) return null;
  return <div className="font-medium text-sky-600">{label}{word.pron}</div>;
}

export function WordCard({ word, compact = false }: { word: Word; compact?: boolean }) {
  const { course, cp, toggleWordFlag } = useCourse();
  const { t, gl, glossLang, locale } = useI18n();
  const [strokes, setStrokes] = useState(false);
  const wp = cp.words[word.id];
  const status = wordStatus(wp);
  const hanChars = course.id === 'zh' ? [...new Set([...word.text].filter((c) => HAN.test(c)))] : [];
  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <WordPron word={word} />
          <div className={cx(course.fontClass, 'text-3xl leading-tight')} lang={course.speechLang}>{word.text}</div>
          {word.spoken && (
            <div className="text-sm text-peach-600">
              {t('word.spoken')} <span className={course.fontClass} lang={course.speechLang}>{word.spoken}</span>
            </div>
          )}
          <div className="mt-1 text-ink" lang={glossLang}>{gl(word)}</div>
        </div>
        <AudioButton text={word.audio ?? word.text} />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <Badge tone="gray">{t(`common.wordType.${word.type}`)}</Badge>
        <span title={t('word.level', { level: word.level })}><Badge tone="peach">{word.level}</Badge></span>
        <Badge tone={STATUS_TONE[status]}>{t(`common.status.${status}`)}</Badge>
        {wp?.due && status !== 'new' && <span className="text-xs text-muted">{t('word.due', { date: new Date(wp.due).toLocaleDateString(locale) })}</span>}
      </div>
      {!compact && (
        <div className="mt-3 rounded-xl bg-cream p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className={cx(course.fontClass, 'text-lg')} lang={course.speechLang}>{word.example.text}</div>
              {word.example.pron && <div className="text-sm text-sky-600">{word.example.pron}</div>}
              <div className="text-sm text-muted" lang={glossLang}>{gl(word.example)}</div>
            </div>
            <AudioButton text={word.example.text} size="sm" showSlow={false} />
          </div>
          {word.notes && <div className="mt-2 text-xs text-muted">💡 <Prose text={word.notes} /></div>}
        </div>
      )}
      {!compact && hanChars.length > 0 && strokes && <div className="mt-3"><StrokeOrder chars={hanChars} /></div>}
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => toggleWordFlag(word.id, 'favorite')} aria-pressed={!!wp?.favorite}
          className={cx('inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition', wp?.favorite ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-600 hover:bg-stone-200')}>
          <Icon name="star" className="h-3.5 w-3.5" fill={!!wp?.favorite} /> {wp?.favorite ? t('word.favorited') : t('word.favorite')}
        </button>
        <button type="button" onClick={() => toggleWordFlag(word.id, 'difficult')} aria-pressed={!!wp?.difficult}
          className={cx('inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition', wp?.difficult ? 'bg-peach-100 text-peach-600' : 'bg-stone-100 text-stone-600 hover:bg-stone-200')}>
          <Icon name="flag" className="h-3.5 w-3.5" /> {wp?.difficult ? t('word.difficult') : t('word.markDifficult')}
        </button>
        {!compact && hanChars.length > 0 && (
          <button type="button" onClick={() => setStrokes((s) => !s)} aria-expanded={strokes}
            className="inline-flex items-center gap-1 rounded-lg bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 transition hover:bg-sky-100">
            <Icon name="pencil" className="h-3.5 w-3.5" /> {strokes ? t('word.strokes.hide') : t('word.strokes.show')}
          </button>
        )}
      </div>
    </div>
  );
}
