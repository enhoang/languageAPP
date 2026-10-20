import { Link, useParams } from 'react-router-dom';
import type { QaSection, QaTopic as Topic } from '../../qa/types';
import { CTFL_DOC, KEYWORDS_NOT_IN_GLOSSARY, SOURCES, TOPIC_BY_ID, sectionText } from '../../qa/content';
import { useQa } from '../../qa/QaContext';
import { useI18n } from '../../i18n/LocaleContext';
import { formatDate } from '../../lib/dates';
import { Badge, Card, PageHeader, SectionTitle, cx } from '../../components/ui';
import { Icon } from '../../components/Icon';
import { ProvenanceTag, SourceRefLabel } from '../../components/qa/Provenance';
import { TopicButton, TopicButtonLink, TopicProse, TopicTermChip, TopicTr, hasText, kLevelCounts, topicStat } from '../../components/qa/TopicHelpers';

/** /qa/topic/:id — one CTFL chapter: objectives, verbatim section text and supplementary notes. */
export default function QaTopic() {
  const { id = '' } = useParams();
  const { t, locale } = useI18n();
  const { progress, setTopicCompleted } = useQa();
  const topic = TOPIC_BY_ID[id];

  if (!topic) {
    return (
      <Card>
        <p className="text-sm text-muted">{t('qa.topic.notFound')}</p>
        <Link to="/qa" className="mt-3 inline-block text-sm text-emerald-700 underline">{t('qa.topic.backToPath')}</Link>
      </Card>
    );
  }

  const content = topic.content;
  const stat = topicStat(topic, progress);
  const tp = progress.topics[topic.id];
  const missingKw = KEYWORDS_NOT_IN_GLOSSARY.filter((k) => k.chapter === topic.id);
  const keyPoints = (content?.keyPoints ?? []).filter(hasText);

  return (
    <div className="space-y-6">
      <div>
        <Link to="/qa" className="inline-flex items-center gap-1 text-sm text-emerald-700 hover:underline"><Icon name="left" className="h-4 w-4" />{t('qa.topic.backToPath')}</Link>
      </div>
      <PageHeader title={`${topic.number}. ${topic.title}`}>
        <Badge tone={stat.completed ? 'green' : stat.started ? 'amber' : 'gray'}>
          {stat.completed ? t('qa.common.completed') : stat.started ? t('qa.common.inProgress') : t('qa.common.notStarted')}
        </Badge>
      </PageHeader>
      <div className="-mt-4 space-y-2">
        <TopicTr text={content?.titleTr} className="block text-base" />
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <span>{t('qa.common.chapter', { n: topic.number })}</span>
          {topic.minutes !== undefined && <Badge tone="gray"><Icon name="clock" className="mr-1 h-3.5 w-3.5" />{t('common.minutes', { count: topic.minutes })}</Badge>}
          {kLevelCounts(topic).map(([level, n]) => <Badge key={level} tone="sky">{level} · {n}</Badge>)}
          <span>{t('qa.home.readProgress', { read: stat.read, total: stat.total })}</span>
          <span className="text-xs">{SourceLabelRange(topic.number, topic.page, topic.endPage, t)}</span>
        </div>
      </div>

      {(hasText(content?.summary) || keyPoints.length > 0) && (
        <Card>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <SectionTitle>{t('qa.topic.summary')}</SectionTitle>
            <ProvenanceTag kind="supplementary" className="mb-3" />
          </div>
          {hasText(content?.summary) && <p className="text-sm leading-relaxed"><TopicProse text={content.summary} /></p>}
          {keyPoints.length > 0 && (
            <>
              <h3 className="mt-4 mb-2 text-sm font-semibold">{t('qa.topic.keyPoints')}</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                {keyPoints.map((k, i) => <li key={i}><TopicProse text={k} /></li>)}
              </ul>
            </>
          )}
        </Card>
      )}

      <Card>
        <SectionTitle>{t('qa.common.objectives')}</SectionTitle>
        {topic.objectives.length === 0 ? <p className="text-sm text-muted">{t('qa.topic.objectivesEmpty')}</p> : (
          <ul className="space-y-3">
            {topic.objectives.map((o) => (
              <li key={o.code} className="rounded-xl border border-line p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-emerald-800">{o.code}</span>
                  <Badge tone="sky">{o.level}</Badge>
                  <ProvenanceTag kind="source" />
                  <SourceRefLabel refs={{ doc: CTFL_DOC, page: o.page }} />
                </div>
                <p className="mt-1.5 text-sm font-medium" lang="en">{o.text}</p>
                {hasText(o.explain) && (
                  <div className="mt-2 border-l-2 border-violet-200 pl-3 text-sm">
                    <ProvenanceTag kind="supplementary" className="mb-1" />
                    <p className="mt-1 leading-relaxed"><TopicProse text={o.explain} /></p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>

      <section>
        <SectionTitle>{t('qa.topic.sections')}</SectionTitle>
        {topic.sections.length === 0 ? <Card><p className="text-sm text-muted">{t('qa.topic.sectionsEmpty')}</p></Card> : (
          <div className="space-y-4">
            {topic.sections.map((s) => <SectionBlock key={s.number} topic={topic} section={s} />)}
          </div>
        )}
      </section>

      <Card>
        <SectionTitle>{t('qa.topic.keywords')}</SectionTitle>
        <p className="mb-3 text-xs text-muted">{t('qa.topic.keywordsHint')}</p>
        {topic.keywordIds.length === 0 && missingKw.length === 0 ? <p className="text-sm text-muted">{t('qa.topic.keywordsEmpty')}</p> : (
          <div className="flex flex-wrap gap-2">
            {topic.keywordIds.map((kid) => <TopicTermChip key={kid} id={kid} />)}
            {missingKw.map((k) => (
              <span key={k.keyword} className="inline-flex flex-wrap items-baseline gap-1 rounded-lg bg-stone-100 px-2.5 py-1 text-sm text-stone-600" title={t('qa.topic.notInGlossary')}>
                <span lang="en">{k.keyword}</span>
                <span className="text-xs">({t('qa.topic.notInGlossary')})</span>
              </span>
            ))}
          </div>
        )}
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <TopicButtonLink to={`/qa/quiz?topic=${topic.id}`}><Icon name="pencil" className="h-4 w-4" />{t('qa.topic.practice')}</TopicButtonLink>
        <TopicButton tone="secondary" onClick={() => setTopicCompleted(topic.id, !stat.completed)}>
          <Icon name="check" className="h-4 w-4" />{stat.completed ? t('qa.topic.markInProgress') : t('qa.topic.markCompleted')}
        </TopicButton>
        {stat.completed && tp?.completedAt && <span className="text-xs text-muted">{t('qa.topic.completedOn', { date: formatDate(tp.completedAt, locale) })}</span>}
      </div>
    </div>
  );
}

function SourceLabelRange(section: string, from: number, to: number, t: ReturnType<typeof useI18n>['t']) {
  return <>{SOURCES.find((d) => d.id === CTFL_DOC)?.version ?? CTFL_DOC} · §{section} · {from === to ? t('qa.ref.page', { page: from }) : t('qa.common.pageRange', { from, to })}</>;
}

function SectionBlock({ topic, section }: { topic: Topic; section: QaSection }) {
  const { t } = useI18n();
  const { progress, markSectionRead } = useQa();
  const src = sectionText(section.number);
  const notes = section.notes;
  const read = progress.topics[topic.id]?.readSections.includes(section.number) ?? false;
  const keyPoints = (notes?.keyPoints ?? []).filter(hasText);
  const termIds = notes?.termIds ?? [];
  const hasNotes = hasText(notes?.explain) || hasText(notes?.example) || keyPoints.length > 0 || hasText(notes?.uncertain);
  const depth = section.number.split('.').length;

  return (
    <Card className={cx(depth > 2 && 'sm:ml-6', read && 'border-emerald-200')}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className={cx('font-semibold', depth > 2 ? 'text-base' : 'text-lg')} lang="en">
          <span className="mr-1.5 text-emerald-700">{section.number}</span>{section.title}
        </h3>
        {read ? <Badge tone="green"><Icon name="check" className="mr-1 h-3.5 w-3.5" />{t('qa.topic.read')}</Badge> : (
          <button type="button" onClick={() => markSectionRead(topic.id, section.number)}
            className="rounded-lg px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-50">
            {t('qa.topic.markRead')}
          </button>
        )}
      </div>

      <details className="group mt-3 rounded-xl bg-stone-50 ring-1 ring-line"
        onToggle={(e) => { if (e.currentTarget.open) markSectionRead(topic.id, section.number); }}>
        <summary className="flex cursor-pointer list-none flex-wrap items-center gap-2 px-3 py-2 text-sm">
          <Icon name="right" className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-90" />
          <span className="font-medium">{t('qa.topic.sourceText')}</span>
          <ProvenanceTag kind="source" />
          <span className="text-xs text-muted">{SourceLabelRange(section.number, section.page, section.endPage, t)}</span>
          <span className="w-full pl-6 text-xs text-muted group-open:hidden">{t('qa.topic.sourceTextHint')}</span>
        </summary>
        <div className="border-t border-line px-3 py-3">
          {src?.text.trim()
            ? <div lang="en" className="whitespace-pre-wrap break-words text-sm leading-relaxed text-ink">{src.text}</div>
            : <p className="text-sm text-muted">{t('qa.topic.sourceEmpty')}</p>}
          <div className="mt-2"><SourceRefLabel refs={[{ doc: CTFL_DOC, section: section.number, page: section.page }]} />
            {section.endPage !== section.page && <span className="text-xs text-muted">–{section.endPage}</span>}
          </div>
        </div>
      </details>

      {hasNotes ? (
        <div className="mt-3 space-y-3 border-l-2 border-violet-200 pl-3 text-sm">
          <ProvenanceTag kind="supplementary" />
          {hasText(notes?.explain) && <p className="leading-relaxed"><TopicProse text={notes.explain} /></p>}
          {hasText(notes?.example) && (
            <div className="rounded-xl bg-violet-50/60 px-3 py-2">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-violet-800">{t('qa.topic.example')}</div>
              <p className="leading-relaxed"><TopicProse text={notes.example} /></p>
            </div>
          )}
          {keyPoints.length > 0 && (
            <div>
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">{t('qa.topic.keyPoints')}</div>
              <ul className="list-disc space-y-1 pl-5">{keyPoints.map((k, i) => <li key={i}><TopicProse text={k} /></li>)}</ul>
            </div>
          )}
          {hasText(notes?.uncertain) && (
            <div className="rounded-xl bg-amber-50 px-3 py-2 text-amber-900" role="note">
              <div className="mb-1 flex items-center gap-1 text-xs font-semibold"><Icon name="flag" className="h-3.5 w-3.5" />{t('qa.topic.uncertain')}</div>
              <p className="leading-relaxed"><TopicProse text={notes.uncertain} /></p>
            </div>
          )}
        </div>
      ) : <p className="mt-3 text-xs text-muted">{t('qa.topic.noNotes')}</p>}

      {termIds.length > 0 && (
        <div className="mt-3">
          <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">{t('qa.topic.terms')}</div>
          <div className="flex flex-wrap gap-2">{termIds.map((id) => <TopicTermChip key={id} id={id} />)}</div>
        </div>
      )}
    </Card>
  );
}
