import { useState } from 'react';
import { useSpeech } from '../state/AppDataContext';
import { COURSES } from '../courses';
import type { CourseId } from '../types';
import { Icon } from './Icon';
import { cx } from './ui';
import { useI18n } from '../i18n/LocaleContext';

/** Play / slow-play buttons for target-language text. Disabled with an explanation when no voice for the course language exists. */
export function AudioButton({ text, size = 'md', showSlow = true, className, courseId }: {
  text: string; size?: 'sm' | 'md' | 'lg'; showSlow?: boolean; className?: string;
  /** language of the text when it is not the active course (e.g. conversation practice) */
  courseId?: CourseId;
}) {
  const { supported, hasVoice, speak, course } = useSpeech(courseId ? COURSES[courseId] : undefined);
  const { t, tr } = useI18n();
  const [playing, setPlaying] = useState(false);
  const disabled = !supported || !hasVoice;
  const title = !supported ? t('common.audio.unsupported') : !hasVoice ? t('common.audio.noVoiceCourse', { name: tr(course.name) }) : undefined;
  const dims = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-14 w-14' }[size];
  const icon = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-7 w-7' }[size];
  const play = (slow: boolean) => {
    if (speak(text, slow)) {
      setPlaying(true);
      window.setTimeout(() => setPlaying(false), 600);
    }
  };
  return (
    <span className={cx('inline-flex items-center gap-1', className)}>
      <button type="button" onClick={(e) => { e.stopPropagation(); play(false); }} disabled={disabled} title={title ?? t('common.audio.play')} aria-label={t('common.audio.playAria', { text })}
        className={cx(dims, 'inline-flex items-center justify-center rounded-full bg-sky-50 text-sky-600 transition hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-40', playing && 'ring-2 ring-sky-300')}>
        <Icon name="speaker" className={icon} />
      </button>
      {showSlow && (
        <button type="button" onClick={(e) => { e.stopPropagation(); play(true); }} disabled={disabled} title={title ?? t('common.audio.playSlow')} aria-label={t('common.audio.playSlowAria', { text })}
          className={cx(size === 'lg' ? 'h-10 px-3 text-sm' : 'h-8 px-2 text-xs', 'inline-flex items-center justify-center rounded-full bg-peach-50 font-medium text-peach-600 transition hover:bg-peach-100 disabled:cursor-not-allowed disabled:opacity-40')}>
          {t('common.audio.slow')}
        </button>
      )}
    </span>
  );
}

export function NoVoiceNotice() {
  const { supported, hasVoice, course } = useSpeech();
  const { t, tr } = useI18n();
  if (supported && hasVoice) return null;
  return (
    <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      {!supported
        ? t('common.audio.noticeUnsupported')
        : t('common.audio.noticeNoVoiceCourse', { name: tr(course.name) })}
    </div>
  );
}
