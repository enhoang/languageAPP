import { Link } from 'react-router-dom';
import type { Assist, QaTerm, QaTermProgress } from '../../qa/types';
import type { Lang } from '../../types';
import { TOPIC_BY_ID } from '../../qa/content';
import { isDue } from '../../lib/srs';
import { useI18n } from '../../i18n/LocaleContext';
import { ProvenanceTag, SourceRefLabel } from './Provenance';
import { AssistText, helpVisible } from './AssistToggle';
import { Badge, cx } from '../ui';

/** Name of the term in the interface language (Chinese interface → Chinese, otherwise Vietnamese). */
export function localName(term: QaTerm | undefined, lang: Lang): string | undefined {
  if (!term?.name) return undefined;
  return lang === 'zh' ? term.name.zh : term.name.vi;
}

/** Marked "needs review" in Learn mode, or due in the review schedule. */
export function termNeedsReview(p: QaTermProgress | undefined, now: Date = new Date()): boolean {
  return p?.mark === 'review' || isDue(p, now);
}

/** "Chapter 4 · Test Analysis and Design" */
export function useChapterLabel() {
  const { t } = useI18n();
  return (topicId: string, withTitle = true) => {
    const topic = TOPIC_BY_ID[topicId];
    if (!topic) return t('qaStudy.otherTopic');
    const n = t('qaStudy.chapterN', { n: topic.number });
    return withTitle ? `${n} · ${topic.title}` : n;
  };
}

/** English term (prominent) with abbreviation and keyword badge. */
export function TermHeading({ term, size = 'lg', link = false, showKeyword = true }: { term: QaTerm; size?: 'md' | 'lg' | 'xl'; link?: boolean; showKeyword?: boolean }) {
  const { t } = useI18n();
  const cls = size === 'xl' ? 'text-2xl sm:text-3xl' : size === 'lg' ? 'text-xl' : 'text-base';
  const name = <span lang="en" className={cx('font-semibold tracking-tight break-words', cls)}>{term.term}</span>;
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      {link ? <Link to={`/qa/glossary/${term.id}`} className="hover:text-emerald-700 hover:underline">{name}</Link> : name}
      {term.abbreviation && <span lang="en" className="text-sm font-medium text-muted">({term.abbreviation})</span>}
      {showKeyword && term.keyword && <Badge tone="green">{t('qaStudy.term.keyword')}</Badge>}
    </div>
  );
}

/** Vietnamese / Chinese name in the interface language, or a placeholder when not written yet. */
export function TermNameLine({ term, className }: { term: QaTerm; className?: string }) {
  const { t, lang } = useI18n();
  const name = localName(term, lang);
  if (!name) return <span className={cx('text-sm italic text-muted', className)}>{t('qaStudy.term.noName')}</span>;
  return <span lang={lang === 'zh' ? 'zh-CN' : 'vi'} className={cx(lang === 'zh' && 'font-zh', className)}>{name}</span>;
}

/** The glossary definition, verbatim, with its source reference. */
export function TermDefinition({ term, showReference = true, className }: { term: QaTerm; showReference?: boolean; className?: string }) {
  const { t } = useI18n();
  return (
    <div className={cx('rounded-xl border border-emerald-100 bg-emerald-50/40 p-3', className)}>
      <div className="mb-1.5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">{t('qaStudy.term.definition')}</span>
        <ProvenanceTag kind="source" />
        <SourceRefLabel refs={term.definition.ref} />
      </div>
      <p lang="en" className="text-sm leading-relaxed">{term.definition.text}</p>
      {showReference && term.definition.reference && (
        <p className="mt-1.5 text-xs text-muted">{t('qaStudy.term.glossaryReference', { ref: term.definition.reference })}</p>
      )}
    </div>
  );
}

/** Name, explanation, definition and example of a term at the given assist level. */
export function TermStudyDetails({ term, assist, help }: { term: QaTerm; assist: Assist; help: boolean }) {
  const { t } = useI18n();
  const notes = term.notes;
  return (
    <div className="space-y-3">
      {helpVisible(assist, help) && (
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-muted">{t('qaStudy.term.name')}</div>
          <TermNameLine term={term} className="text-lg font-medium" />
        </div>
      )}
      {notes?.explanation && (
        <div>
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted">{t('qaStudy.term.explanation')}</span>
            <ProvenanceTag kind="supplementary" />
          </div>
          <p className="text-sm leading-relaxed"><AssistText text={notes.explanation} assist={assist} help={help} /></p>
        </div>
      )}
      <TermDefinition term={term} showReference={false} />
      {notes?.example && (
        <div>
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted">{t('qaStudy.term.example')}</span>
            <ProvenanceTag kind="supplementary" />
          </div>
          <p className="text-sm leading-relaxed text-stone-700"><AssistText text={notes.example} assist={assist} help={help} /></p>
        </div>
      )}
      {!notes && <p className="text-sm italic text-muted">{t('qaStudy.term.noNotes')}</p>}
    </div>
  );
}
