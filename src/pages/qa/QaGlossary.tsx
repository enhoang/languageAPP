import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import type { QaTerm } from '../../qa/types';
import { TERMS, TERM_BY_ID, TOPICS, findTerm } from '../../qa/content';
import { useQa } from '../../qa/QaContext';
import { MASTERY_STATUSES, wordStatus } from '../../lib/srs';
import { foldVietnamese } from '../../lib/text';
import { useI18n } from '../../i18n/LocaleContext';
import { Prose } from '../../components/Prose';
import { Badge, Button, ButtonLink, Card, PageHeader, cx } from '../../components/ui';
import { Icon } from '../../components/Icon';
import { ProvenanceTag, SourceRefLabel } from '../../components/qa/Provenance';
import { AssistHelpButton, AssistToggle, useAssist } from '../../components/qa/AssistToggle';
import { TermDefinition, TermHeading, localName, termNeedsReview, useChapterLabel } from '../../components/qa/TermCard';

const SELECT = 'min-w-0 max-w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-emerald-300';
const PAGE = 60;
const letterOf = (term: string) => {
  const c = term[0]?.toUpperCase() ?? '#';
  return c >= 'A' && c <= 'Z' ? c : '#';
};

const SEARCH_INDEX = new Map<string, string>(
  TERMS.map((x) => [x.id, foldVietnamese([x.term, x.abbreviation, ...x.synonyms, x.name?.vi, x.name?.zh, x.definition.text].filter(Boolean).join(' \u0001 '))]),
);
const LETTERS = [...new Set(TERMS.map((x) => letterOf(x.term)))].sort();

/** /qa/glossary — searchable ISTQB glossary with filters. */
export function QaGlossary() {
  const { t, lang } = useI18n();
  const { progress } = useQa();
  const assist = useAssist();
  const chapter = useChapterLabel();
  const [params, setParams] = useSearchParams();
  const [limit, setLimit] = useState(PAGE);
  const [help, setHelp] = useState(false);
  const q = params.get('q') ?? '';
  const scope = params.get('scope') ?? 'keywords';
  const topic = params.get('topic') ?? '';
  const status = params.get('status') ?? '';
  const letter = params.get('letter') ?? '';

  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v);
    else next.delete(k);
    setParams(next, { replace: true });
    setLimit(PAGE);
  };

  const results = useMemo(() => {
    const needle = foldVietnamese(q.trim());
    const now = new Date();
    return TERMS.filter((x) => {
      if (scope === 'keywords' && !x.keyword) return false;
      if (scope === 'syllabus' && !x.topicIds.length && !x.syllabusPages.length) return false;
      if (topic && !x.topicIds.includes(topic)) return false;
      if (letter && letterOf(x.term) !== letter) return false;
      const p = progress.terms[x.id];
      if (status === 'review' && !termNeedsReview(p, now)) return false;
      if (status && status !== 'review' && wordStatus(p) !== status) return false;
      return !needle || (SEARCH_INDEX.get(x.id) ?? '').includes(needle);
    }).sort((a, b) => a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }));
  }, [q, scope, topic, status, letter, progress.terms]);

  const anyFilter = q || scope !== 'keywords' || topic || status || letter;
  const showNames = assist === 'full' || (assist === 'tap' && help);

  return (
    <div>
      <PageHeader title={t('qaStudy.glossary.title')} subtitle={t('qaStudy.glossary.subtitle', { count: TERMS.length })}>
        <ButtonLink to="/qa/learn" variant="secondary"><Icon name="book" className="h-4 w-4" /> {t('qaStudy.glossary.learn')}</ButtonLink>
      </PageHeader>

      <div className="mb-5 space-y-3">
        <label className="relative block">
          <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
          <input value={q} onChange={(e) => set('q', e.target.value)} placeholder={t('qaStudy.glossary.searchPlaceholder')} aria-label={t('qaStudy.glossary.searchLabel')}
            className="w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-3 outline-none focus:border-emerald-300" />
        </label>
        <div className="flex flex-wrap gap-2">
          <select className={SELECT} value={scope} onChange={(e) => set('scope', e.target.value === 'keywords' ? '' : e.target.value)} aria-label={t('qaStudy.glossary.scope')}>
            <option value="keywords">{t('qaStudy.glossary.scopeKeywords')}</option>
            <option value="syllabus">{t('qaStudy.glossary.scopeSyllabus')}</option>
            <option value="all">{t('qaStudy.glossary.scopeAll')}</option>
          </select>
          <select className={SELECT} value={topic} onChange={(e) => set('topic', e.target.value)} aria-label={t('qaStudy.glossary.chapter')}>
            <option value="">{t('qaStudy.glossary.allChapters')}</option>
            {TOPICS.map((x) => <option key={x.id} value={x.id}>{chapter(x.id)}</option>)}
          </select>
          <select className={SELECT} value={status} onChange={(e) => set('status', e.target.value)} aria-label={t('qaStudy.glossary.status')}>
            <option value="">{t('qaStudy.glossary.allStatuses')}</option>
            {MASTERY_STATUSES.map((s) => <option key={s} value={s}>{t(`common.status.${s}`)}</option>)}
            <option value="review">{t('qaStudy.status.review')}</option>
          </select>
          {anyFilter && <button type="button" onClick={() => { setParams({}, { replace: true }); setLimit(PAGE); }} className="rounded-xl px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50">{t('qaStudy.glossary.clear')}</button>}
        </div>
        <div className="flex flex-wrap gap-1" role="group" aria-label={t('qaStudy.glossary.letter')}>
          <button type="button" onClick={() => set('letter', '')} aria-pressed={!letter}
            className={cx('h-8 min-w-8 rounded-lg px-2 text-xs font-medium ring-1', !letter ? 'bg-emerald-600 text-white ring-emerald-600' : 'bg-white text-stone-600 ring-line hover:bg-emerald-50')}>
            {t('qaStudy.glossary.allLetters')}
          </button>
          {LETTERS.map((l) => (
            <button key={l} type="button" onClick={() => set('letter', letter === l ? '' : l)} aria-pressed={letter === l}
              className={cx('h-8 w-8 rounded-lg text-xs font-medium ring-1', letter === l ? 'bg-emerald-600 text-white ring-emerald-600' : 'bg-white text-stone-600 ring-line hover:bg-emerald-50')}>
              {l}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <AssistToggle />
          <AssistHelpButton assist={assist} help={help} onToggle={() => setHelp((h) => !h)} />
        </div>
      </div>

      <p className="mb-3 text-sm text-muted">{t('qaStudy.glossary.results', { count: results.length })}</p>
      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line py-16 text-center text-muted">{t('qaStudy.glossary.empty')}</div>
      ) : (
        <>
          <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
            {results.slice(0, limit).map((x) => <GlossaryRow key={x.id} term={x} showName={showNames} lang={lang} />)}
          </ul>
          {results.length > limit && (
            <div className="mt-4 text-center">
              <Button variant="secondary" onClick={() => setLimit((n) => n + PAGE)}>{t('qaStudy.glossary.more', { count: results.length - limit })}</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function GlossaryRow({ term, showName, lang }: { term: QaTerm; showName: boolean; lang: 'vi' | 'en' | 'zh' }) {
  const { t } = useI18n();
  const { progress } = useQa();
  const p = progress.terms[term.id];
  const st = wordStatus(p);
  const name = localName(term, lang);
  const firstLine = term.definition.text.split(/(?<=[.;])\s/)[0];
  return (
    <li>
      <Link to={`/qa/glossary/${term.id}`} className="block px-4 py-3 hover:bg-emerald-50/50">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span lang="en" className="font-semibold">{term.term}</span>
          {term.abbreviation && <span lang="en" className="text-sm text-muted">({term.abbreviation})</span>}
          {showName && name && <span lang={lang === 'zh' ? 'zh-CN' : 'vi'} className="text-sm text-stone-600">· {name}</span>}
          <span className="ml-auto flex flex-wrap gap-1">
            {term.keyword && <Badge tone="green">{t('qaStudy.term.keyword')}</Badge>}
            {termNeedsReview(p) ? <Badge tone="amber">{t('qaStudy.status.review')}</Badge> : st !== 'new' && <Badge tone="sky">{t(`common.status.${st}`)}</Badge>}
          </span>
        </div>
        <p lang="en" className="mt-0.5 line-clamp-2 text-sm text-muted">{firstLine}</p>
      </Link>
    </li>
  );
}

/** /qa/glossary/:id — one glossary term. */
export function QaTermDetail() {
  const { id = '' } = useParams();
  const { t } = useI18n();
  const { progress, markTerm } = useQa();
  const chapter = useChapterLabel();
  const term = TERM_BY_ID[id];

  if (!term) {
    return (
      <Card className="text-center">
        <p className="mb-4 text-muted">{t('qaStudy.detail.notFound')}</p>
        <ButtonLink to="/qa/glossary" variant="secondary">{t('qaStudy.detail.backToGlossary')}</ButtonLink>
      </Card>
    );
  }

  const p = progress.terms[term.id];
  const mark = p?.mark;
  const st = wordStatus(p);
  const notes = term.notes;
  const keywordOf = TOPICS.filter((x) => x.keywordIds.includes(term.id));
  const pageChapters = term.syllabusPages.map((page) => ({ page, topic: TOPICS.find((x) => page >= x.page && page <= x.endPage) }));
  const related = (list: string[]) => list.map((s) => ({ label: s, term: findTerm(s) }));
  const synonyms = related(term.synonyms);
  const seeAlso = related(term.seeAlso);

  return (
    <div className="space-y-5">
      <Link to="/qa/glossary" className="inline-flex items-center gap-1 text-sm text-emerald-700 hover:underline"><Icon name="left" className="h-4 w-4" /> {t('qaStudy.detail.backToGlossary')}</Link>

      <Card>
        <TermHeading term={term} size="xl" />
        {synonyms.length > 0 && (
          <p className="mt-1 text-sm text-muted">
            {t('qaStudy.detail.synonyms')}{' '}
            {synonyms.map((s, i) => <span key={s.label}>{i > 0 && ', '}{s.term && s.term.id !== term.id ? <Link to={`/qa/glossary/${s.term.id}`} lang="en" className="text-emerald-700 hover:underline">{s.label}</Link> : <span lang="en">{s.label}</span>}</span>)}
          </p>
        )}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-stone-50 p-3">
            <div className="text-xs font-medium uppercase tracking-wide text-muted">{t('qaStudy.detail.nameVi')}</div>
            {term.name ? <div lang="vi" className="mt-0.5 font-medium">{term.name.vi}</div> : <div className="mt-0.5 text-sm italic text-muted">{t('qaStudy.term.noName')}</div>}
          </div>
          <div className="rounded-xl bg-stone-50 p-3">
            <div className="text-xs font-medium uppercase tracking-wide text-muted">{t('qaStudy.detail.nameZh')}</div>
            {term.name ? <div lang="zh-CN" className="font-zh mt-0.5 font-medium">{term.name.zh}</div> : <div className="mt-0.5 text-sm italic text-muted">{t('qaStudy.term.noName')}</div>}
          </div>
        </div>
        {term.name && <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted"><ProvenanceTag kind="supplementary" /> {t('qaStudy.detail.namesNote')}</div>}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge tone={st === 'new' ? 'gray' : 'sky'}>{t(`common.status.${st}`)}</Badge>
          {termNeedsReview(p) && <Badge tone="amber">{t('qaStudy.status.review')}</Badge>}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant={mark === 'understood' ? 'primary' : 'secondary'} aria-pressed={mark === 'understood'}
            className={mark === 'understood' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
            onClick={() => markTerm(term.id, mark === 'understood' ? undefined : 'understood')}>
            <Icon name="check" className="h-4 w-4" /> {t('qaStudy.mark.understood')}
          </Button>
          <Button variant={mark === 'review' ? 'coral' : 'secondary'} aria-pressed={mark === 'review'}
            onClick={() => markTerm(term.id, mark === 'review' ? undefined : 'review')}>
            <Icon name="flag" className="h-4 w-4" /> {t('qaStudy.mark.review')}
          </Button>
        </div>
      </Card>

      <Card className="space-y-3">
        <h2 className="text-lg font-semibold">{t('qaStudy.detail.sourceDefinition')}</h2>
        <TermDefinition term={term} />
        <p className="text-xs text-muted">{t('qaStudy.detail.definitionNote')}</p>
      </Card>

      {notes?.versionNote && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900" role="note">
          <div className="mb-1 flex flex-wrap items-center gap-2 font-medium">{t('qaStudy.detail.versionNote')} <ProvenanceTag kind="supplementary" /></div>
          <Prose text={notes.versionNote} />
        </div>
      )}

      <Card className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold">{t('qaStudy.detail.explanation')}</h2>
          <ProvenanceTag kind="supplementary" />
        </div>
        {notes ? (
          <>
            <p className="leading-relaxed"><Prose text={notes.explanation} /></p>
            {notes.example && (
              <div className="rounded-xl bg-stone-50 p-3">
                <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted">{t('qaStudy.term.example')}</div>
                <p className="text-sm leading-relaxed"><Prose text={notes.example} /></p>
              </div>
            )}
          </>
        ) : <p className="text-sm italic text-muted">{t('qaStudy.term.noNotes')}</p>}

        {notes?.confusedWith && notes.confusedWith.length > 0 && (
          <div>
            <h3 className="mb-2 font-medium">{t('qaStudy.detail.confusedWith')}</h3>
            <ul className="space-y-2">
              {notes.confusedWith.map((c) => {
                const other = TERM_BY_ID[c.id];
                return (
                  <li key={c.id} className="rounded-xl border border-line p-3 text-sm">
                    {other ? <Link to={`/qa/glossary/${other.id}`} lang="en" className="font-medium text-emerald-700 hover:underline">{other.term}</Link> : <span lang="en" className="font-medium">{c.id}</span>}
                    <p className="mt-1 leading-relaxed text-stone-700"><Prose text={c.note} /></p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </Card>

      <Card className="space-y-4">
        <h2 className="text-lg font-semibold">{t('qaStudy.detail.inSyllabus')}</h2>
        {keywordOf.length > 0 ? (
          <p className="text-sm">
            <Badge tone="green">{t('qaStudy.term.keyword')}</Badge>{' '}
            {t('qaStudy.detail.keywordOf')}{' '}
            {keywordOf.map((x, i) => <span key={x.id}>{i > 0 && ', '}<Link to={`/qa/topic/${x.id}`} className="text-emerald-700 hover:underline">{chapter(x.id, false)}</Link></span>)}
          </p>
        ) : <p className="text-sm text-muted">{t('qaStudy.detail.notKeyword')}</p>}
        {pageChapters.length > 0 ? (
          <div className="text-sm">
            <p>{t('qaStudy.detail.discussedOn', { count: pageChapters.length })}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {pageChapters.map(({ page, topic }) => (
                <li key={page}>
                  {topic ? (
                    <Link to={`/qa/topic/${topic.id}`} className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-emerald-800 ring-1 ring-emerald-200 hover:bg-emerald-100">
                      {t('qaStudy.detail.pageInChapter', { page, chapter: chapter(topic.id, false) })}
                    </Link>
                  ) : (
                    <span className="inline-flex rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-700">{t('qaStudy.detail.page', { page })}</span>
                  )}
                </li>
              ))}
            </ul>
            <SourceRefLabel className="mt-2 block" refs={{ doc: 'ctfl401' }} />
          </div>
        ) : <p className="text-sm text-muted">{t('qaStudy.detail.notInIndex')}</p>}

        {seeAlso.length > 0 && (
          <div className="text-sm">
            <h3 className="mb-1 font-medium">{t('qaStudy.detail.seeAlso')}</h3>
            <ul className="flex flex-wrap gap-2">
              {seeAlso.map((s) => (
                <li key={s.label}>
                  {s.term ? <Link to={`/qa/glossary/${s.term.id}`} lang="en" className="rounded-full bg-white px-2.5 py-1 text-xs ring-1 ring-line hover:bg-emerald-50">{s.label}</Link>
                    : <span lang="en" className="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-500" title={t('qaStudy.detail.notInExport')}>{s.label}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
  );
}
