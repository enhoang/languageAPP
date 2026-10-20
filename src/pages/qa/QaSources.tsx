import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { EXAMS, GLOSSARY_DOC, CTFL_DOC, KEYWORDS_NOT_IN_GLOSSARY, QUESTIONS, SOURCES, TERMS, TOPICS, TOPIC_BY_ID } from '../../qa/content';
import { examAvailability } from '../../qa/quiz';
import type { SourceDoc } from '../../qa/types';
import { useI18n } from '../../i18n/LocaleContext';
import { Card, PageHeader, SectionTitle, Stat } from '../../components/ui';
import { ProvenanceTag } from '../../components/qa/Provenance';
import { TopicProse, hasText } from '../../components/qa/TopicHelpers';

/** /qa/sources — imported documents, extraction details, licensing, statistics and provenance legend. */
export default function QaSources() {
  const { t } = useI18n();
  const sections = TOPICS.reduce((a, x) => a + x.sections.length, 0);
  const objectives = TOPICS.reduce((a, x) => a + x.objectives.length, 0);
  const keywords = TOPICS.reduce((a, x) => a + x.keywordIds.length, 0) + KEYWORDS_NOT_IN_GLOSSARY.length;
  const inSyllabus = TERMS.filter((x) => x.topicIds.length > 0 || x.syllabusPages.length > 0).length;
  const exams = EXAMS.filter((e) => examAvailability(e).ok).length;

  return (
    <div className="space-y-6">
      <PageHeader title={t('qa.sources.title')} subtitle={t('qa.sources.subtitle')} />

      {SOURCES.length === 0 ? <Card><p className="text-sm text-muted">{t('qa.sources.noSources')}</p></Card> : (
        <div className="grid gap-4 lg:grid-cols-2">
          {SOURCES.map((doc) => <SourceCard key={doc.id} doc={doc} />)}
        </div>
      )}

      <section>
        <SectionTitle>{t('qa.sources.statsTitle')}</SectionTitle>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label={t('qa.sources.stat.sections')} value={sections} />
          <Stat label={t('qa.sources.stat.objectives')} value={objectives} />
          <Stat label={t('qa.sources.stat.keywords')} value={keywords} />
          <Stat label={t('qa.sources.stat.terms')} value={TERMS.length} />
          <Stat label={t('qa.sources.stat.termsInSyllabus')} value={inSyllabus} />
          <Stat label={t('qa.sources.stat.questions')} value={QUESTIONS.length} />
          <Stat label={t('qa.sources.stat.exams')} value={`${exams}/${EXAMS.length}`} />
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <SectionTitle>{t('qa.sources.legendTitle')}</SectionTitle>
          <p className="mb-3 text-sm text-muted">{t('qa.sources.legendIntro')}</p>
          <ul className="space-y-3 text-sm">
            {(['source', 'supplementary', 'practice'] as const).map((k) => (
              <li key={k} className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3">
                <ProvenanceTag kind={k} className="shrink-0 self-start" />
                <span>{t(`qa.provenance.${k}Hint`)}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <SectionTitle>{t('qa.sources.officialTitle')}</SectionTitle>
          <p className="text-sm leading-relaxed">{t('qa.sources.practiceNote')}</p>
          <p className="mt-2 text-sm leading-relaxed">{t('qa.sources.examDocsNote')}</p>
        </Card>
      </div>

      <Card>
        <SectionTitle>{t('qa.sources.howToTitle')}</SectionTitle>
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          <li>{t('qa.sources.howTo1')}</li>
          <li>
            {t('qa.sources.howTo2')}
            <pre className="mt-1 overflow-x-auto rounded-lg bg-stone-900 px-3 py-2 text-xs text-stone-100"><code>node scripts/qa/extract-pdf.mjs</code></pre>
          </li>
          <li>{t('qa.sources.howTo3')}</li>
        </ol>
        <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900">{t('qa.sources.howToOcr')}</p>
      </Card>

      {KEYWORDS_NOT_IN_GLOSSARY.length > 0 && (
        <Card>
          <SectionTitle>{t('qa.sources.missingTitle')}</SectionTitle>
          <p className="mb-3 text-sm text-muted">{t('qa.sources.missingIntro')}</p>
          <ul className="flex flex-wrap gap-2">
            {KEYWORDS_NOT_IN_GLOSSARY.map((k) => (
              <li key={`${k.chapter}-${k.keyword}`} className="rounded-lg bg-stone-100 px-2.5 py-1 text-sm">
                <span lang="en">{k.keyword}</span>{' '}
                <Link to={`/qa/topic/${k.chapter}`} className="text-xs text-emerald-700 underline">{t('qa.common.chapter', { n: TOPIC_BY_ID[k.chapter]?.number ?? k.chapter })}</Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}

function SourceCard({ doc }: { doc: SourceDoc }) {
  const { t } = useI18n();
  const license = doc.id === CTFL_DOC ? t('qa.sources.licenseCtfl') : doc.id === GLOSSARY_DOC ? t('qa.sources.licenseGlossary') : doc.license;
  const rows: [string, ReactNode][] = [
    [t('qa.sources.issuer'), doc.issuer],
    [t('qa.sources.version'), doc.version],
    [t('qa.sources.date'), doc.date],
    [t('qa.sources.file'), <code key="f" className="break-all text-xs">{doc.fileName}</code>],
    [t('qa.sources.pageCount'), t('qa.common.pages', { count: doc.pageCount })],
    [t('qa.sources.extraction'), t(`qa.sources.extractionMethod.${doc.extraction}`)],
    [t('qa.sources.unreadable'), doc.unreadablePages.length === 0 ? t('qa.sources.allRead') : doc.unreadablePages.join(', ')],
    [t('qa.sources.license'), license],
  ];
  return (
    <Card>
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <h2 className="min-w-0 text-base font-semibold leading-snug" lang="en">{doc.title}</h2>
        <ProvenanceTag kind="source" />
      </div>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">
        {rows.filter(([, v]) => v !== undefined && v !== '').map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted sm:pt-0.5">{k}</dt>
            <dd className="min-w-0 break-words">{v}</dd>
          </div>
        ))}
      </dl>
      {hasText(doc.notes) && (
        <div className="mt-4 border-l-2 border-violet-200 pl-3 text-sm">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">{t('qa.sources.notes')}</span>
            <ProvenanceTag kind="supplementary" />
          </div>
          <p className="leading-relaxed"><TopicProse text={doc.notes} /></p>
        </div>
      )}
    </Card>
  );
}
