import type { Assist } from '../../qa/types';
import type { LText } from '../../types';
import { useQa } from '../../qa/QaContext';
import { useI18n } from '../../i18n/LocaleContext';
import { Prose } from '../Prose';
import { cx } from '../ui';

export const ASSIST_LEVELS: Assist[] = ['full', 'tap', 'none'];

/** Current assist level (progress.settings.assist). */
export function useAssist(): Assist {
  return useQa().progress.settings.assist;
}

/** Three-way switch: interface-language help always / on tap / English only. Stored in QA progress. */
export function AssistToggle({ className }: { className?: string }) {
  const { t } = useI18n();
  const { progress, setAssist } = useQa();
  const cur = progress.settings.assist;
  return (
    <div className={cx('flex flex-wrap items-center gap-2', className)}>
      <span className="text-sm text-muted">{t('qaStudy.assist.label')}</span>
      <div role="radiogroup" aria-label={t('qaStudy.assist.label')} className="inline-flex flex-wrap gap-1 rounded-xl bg-stone-100 p-1">
        {ASSIST_LEVELS.map((a) => (
          <button key={a} type="button" role="radio" aria-checked={cur === a} title={t(`qaStudy.assist.${a}Hint`)} onClick={() => setAssist(a)}
            className={cx('rounded-lg px-3 py-1.5 text-xs font-medium transition', cur === a ? 'bg-white text-emerald-700 shadow-sm' : 'text-stone-600 hover:text-ink')}>
            {t(`qaStudy.assist.${a}`)}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Supplementary text (LText) at an assist level: 'full' → interface language (Prose), 'tap' → English, with the
 * interface-language version below once `help` is on, 'none' → English only.
 */
export function AssistText({ text, assist, help = false, className }: { text: LText; assist: Assist; help?: boolean; className?: string }) {
  const { lang, tr } = useI18n();
  if (assist === 'full') return <span className={className}><Prose text={text} /></span>;
  return (
    <span className={className}>
      <span lang="en">{text.en}</span>
      {assist === 'tap' && help && lang !== 'en' && <span className="mt-0.5 block text-sm text-muted" lang={lang === 'zh' ? 'zh-CN' : 'vi'}>{tr(text)}</span>}
    </span>
  );
}

/** "Show translation" switch for the 'tap' assist level (renders nothing at other levels). */
export function AssistHelpButton({ assist, help, onToggle, className }: { assist: Assist; help: boolean; onToggle: () => void; className?: string }) {
  const { t } = useI18n();
  if (assist !== 'tap') return null;
  return (
    <button type="button" onClick={onToggle} aria-pressed={help}
      className={cx('rounded-lg px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-50', className)}>
      {help ? t('qaStudy.assist.hideHelp') : t('qaStudy.assist.showHelp')}
    </button>
  );
}

/** Whether interface-language help is visible at this level. */
export const helpVisible = (assist: Assist, help: boolean) => assist === 'full' || (assist === 'tap' && help);
