import type { SourceRef } from '../../qa/types';
import { SOURCES } from '../../qa/content';
import { useI18n } from '../../i18n/LocaleContext';
import { cx } from '../ui';

/** Badge: "From the source" (syllabus / glossary) or "Supplementary" (written for this app). */
export function ProvenanceTag({ kind, className }: { kind: 'source' | 'supplementary' | 'practice'; className?: string }) {
  const { t } = useI18n();
  const tone = kind === 'source' ? 'bg-emerald-50 text-emerald-800 ring-emerald-200' : kind === 'practice' ? 'bg-amber-50 text-amber-800 ring-amber-200' : 'bg-violet-50 text-violet-800 ring-violet-200';
  return <span className={cx('inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1', tone, className)} title={t(`qa.provenance.${kind}Hint`)}>{t(`qa.provenance.${kind}`)}</span>;
}

/** "CTFL v4.0.1 · §4.2.2 · p. 40" */
export function SourceRefLabel({ refs, className }: { refs: SourceRef | SourceRef[]; className?: string }) {
  const { t } = useI18n();
  const list = Array.isArray(refs) ? refs : [refs];
  return (
    <span className={cx('text-xs text-muted', className)}>
      {list.map((r, i) => {
        const doc = SOURCES.find((d) => d.id === r.doc);
        return (
          <span key={i}>
            {i > 0 && '; '}
            {doc?.version ?? r.doc}
            {r.section && <> · §{r.section}</>}
            {r.page !== undefined && <> · {t('qa.ref.page', { page: r.page })}</>}
          </span>
        );
      })}
    </span>
  );
}
