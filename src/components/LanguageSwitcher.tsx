import type { GlossLang } from '../types';
import { useI18n } from '../i18n/LocaleContext';
import { LANG_NAME, LANG_TAG, LANGS, usesSupportLang } from '../i18n/langs';
import { useAppData } from '../state/AppDataContext';
import { COURSES } from '../courses';
import { cx } from './ui';
import { useInlineCourseName } from './CourseSwitcher';

/** Compact interface-language picker for the navigation (sidebar, mobile top bar and drawer). */
export function LanguageSelect({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <label className={cx('relative inline-flex min-w-0 items-center', className)} title={t('layout.interfaceLanguage')}>
      <span className="sr-only">{t('common.lang.choose')}</span>
      <span aria-hidden="true" className="pointer-events-none absolute left-2.5 text-sm">🌐</span>
      <select value={lang} onChange={(e) => setLang(e.target.value as typeof lang)}
        className="w-full min-w-0 cursor-pointer appearance-none rounded-lg border border-line bg-white py-1.5 pl-8 pr-3 text-sm text-ink hover:border-sky-300 focus-visible:outline-2 focus-visible:outline-sky-400">
        {LANGS.map((l) => <option key={l} value={l} lang={LANG_TAG[l]}>{LANG_NAME[l]}</option>)}
      </select>
    </label>
  );
}

/**
 * Full language settings: interface language and — when the interface is Chinese, or the same as the
 * language being studied — the language used for meanings and translations.
 */
export function LanguageSettings() {
  const { lang, setLang, supportLang, setSupportLang, t } = useI18n();
  const inline = useInlineCourseName();
  const { data } = useAppData();
  const current = data.currentCourse;
  return (
    <div className="space-y-4">
      <fieldset>
        <legend className="mb-2 text-sm font-medium">{t('common.lang.interface')}</legend>
        <div className="flex flex-wrap gap-2" role="radiogroup">
          {LANGS.map((l) => (
            <button key={l} type="button" role="radio" aria-checked={lang === l} onClick={() => setLang(l)} lang={LANG_TAG[l]}
              className={cx('rounded-xl border-2 px-4 py-2 text-sm font-medium transition',
                lang === l ? 'border-sky-400 bg-sky-50 text-sky-700' : 'border-line bg-white hover:border-sky-200')}>
              {LANG_NAME[l]}
              {lang !== l && <span className="ml-1.5 text-xs font-normal text-muted">({t(`common.lang.${l}`)})</span>}
            </button>
          ))}
        </div>
      </fieldset>
      {usesSupportLang(lang, current) && (
        <fieldset>
          <legend className="mb-1 text-sm font-medium">{t('common.lang.support')}</legend>
          <p className="mb-2 text-xs text-muted">
            {lang === 'zh' ? t('layout.supportHintZh') : t('layout.supportHintSame', { name: current ? inline(COURSES[current]) : '' })}
          </p>
          <div className="flex flex-wrap gap-2" role="radiogroup">
            {(['vi', 'en'] as GlossLang[]).map((l) => (
              <button key={l} type="button" role="radio" aria-checked={supportLang === l} onClick={() => setSupportLang(l)}
                className={cx('rounded-xl border-2 px-4 py-2 text-sm font-medium transition',
                  supportLang === l ? 'border-sky-400 bg-sky-50 text-sky-700' : 'border-line bg-white hover:border-sky-200')}>
                {t(`common.lang.${l}`)}
              </button>
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
}
