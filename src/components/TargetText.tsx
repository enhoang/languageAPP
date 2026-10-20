import { useState } from 'react';
import type { Gloss } from '../types';
import { useAppData, useCourse } from '../state/AppDataContext';
import { useI18n } from '../i18n/LocaleContext';
import { AudioButton } from './Audio';
import { cx } from './ui';

const SIZES = {
  sm: { text: 'text-xl', pron: 'text-sm' },
  md: { text: 'text-3xl', pron: 'text-base' },
  lg: { text: 'text-5xl', pron: 'text-lg' },
  xl: { text: 'text-7xl', pron: 'text-xl' },
};

/**
 * Target-language text + its pronunciation aid (pinyin / IPA / romanization) + meaning, with optional audio.
 * The pronunciation aid respects the "show pronunciation" setting (a button reveals it when hidden).
 * `meaning` is a Gloss (e.g. an Example) shown in the gloss language.
 */
export function TargetText({ text, pron, meaning, size = 'md', audio = true, audioText, center = false, forcePron = false }: {
  text: string; pron?: string; meaning?: Gloss; size?: keyof typeof SIZES; audio?: boolean; audioText?: string; center?: boolean; forcePron?: boolean;
}) {
  const { data } = useAppData();
  const { course } = useCourse();
  const { t, tr, gl, glossLang } = useI18n();
  const [reveal, setReveal] = useState(false);
  const showPron = forcePron || data.settings.showPron || reveal;
  const s = SIZES[size];
  return (
    <div className={cx('flex items-center gap-3', center && 'justify-center text-center')}>
      <div className={cx(center && 'flex flex-col items-center')}>
        {pron && (showPron ? (
          <div className={cx(s.pron, 'font-medium text-sky-600')}>{pron}</div>
        ) : (
          <button type="button" onClick={() => setReveal(true)} className="text-xs text-sky-500 underline decoration-dotted">{t('common.pinyin.revealName', { name: tr(course.pronName) })}</button>
        ))}
        <div className={cx(s.text, course.fontClass, 'leading-tight text-ink')} lang={course.speechLang}>{text}</div>
        {meaning && <div className="mt-0.5 text-sm text-muted" lang={glossLang}>{gl(meaning)}</div>}
      </div>
      {audio && <AudioButton text={audioText ?? text} size={size === 'sm' ? 'sm' : 'md'} showSlow={size !== 'sm'} />}
    </div>
  );
}
