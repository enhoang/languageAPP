import { useState } from 'react';
import type { Txt } from '../types';
import { useI18n } from '../i18n/LocaleContext';
import { isLText } from '../i18n/resolve';

/**
 * Lesson prose (explanations, tips, objectives…). Renders inline, so wrap it in <p>, <li>, etc.
 * In the Chinese interface an LText shows the Chinese text plus a button that reveals the
 * translation in the learner's support language (Vietnamese or English).
 */
export function Prose({ text }: { text: Txt }) {
  const { lang, glossLang, tr, t } = useI18n();
  const [show, setShow] = useState(false);
  if (lang !== 'zh' || !isLText(text)) return <>{tr(text)}</>;
  return (
    <>
      <span lang="zh-CN">{text.zh}</span>{' '}
      <button type="button" onClick={() => setShow((s) => !s)} aria-expanded={show}
        className="whitespace-nowrap align-baseline text-xs font-medium text-sky-600 underline decoration-dotted">
        {show ? t('common.prose.hide') : t('common.prose.show')}
      </button>
      {show && <span className="mt-0.5 block text-sm text-muted" lang={glossLang}>{text[glossLang]}</span>}
    </>
  );
}
