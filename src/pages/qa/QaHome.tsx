import { Link } from 'react-router-dom';
import { KEYWORDS_NOT_IN_GLOSSARY, SOURCES, SYLLABUS, TOPICS } from '../../qa/content';
import { dueTerms } from '../../qa/store';
import { useQa } from '../../qa/QaContext';
import { useI18n } from '../../i18n/LocaleContext';
import { Badge, Card, PageHeader, ProgressBar, SectionTitle, cx } from '../../components/ui';
import { Icon, type IconName } from '../../components/Icon';
import { ProvenanceTag, SourceRefLabel } from '../../components/qa/Provenance';
import { TopicButtonLink, TopicTr, hasText, kLevelCounts, nextTopic, topicStat, weakTopicList } from '../../components/qa/TopicHelpers';

const LINKS: { to: string; key: 'glossary' | 'learn' | 'flashcards' | 'quiz' | 'exam' | 'progress' | 'sources'; icon: IconName }[] = [
  { to: '/qa/glossary', key: 'glossary', icon: 'search' },
  { to: '/qa/learn', key: 'learn', icon: 'book' },
  { to: '/qa/flashcards', key: 'flashcards', icon: 'refresh' },
  { to: '/qa/quiz', key: 'quiz', icon: 'pencil' },
  { to: '/qa/exam', key: 'exam', icon: 'test' },
  { to: '/qa/progress', key: 'progress', icon: 'chart' },
  { to: '/qa/sources', key: 'sources', icon: 'shield' },
];

/** /qa — the ISTQB learning path: chapters of the CTFL syllabus with progress and recommendations. */
export default function QaHome() {
  const { t } = useI18n();
  const { progress } = useQa();
  const syllabusDoc = SOURCES.find((d) => d.id === SYLLABUS.ref.doc);
  const due = dueTerms(progress);
  const next = nextTopic(progress);
  const weak = weakTopicList(progress).slice(0, 3);
  const anyContent = TOPICS.some((tp) => hasText(tp.content?.summary) || (tp.content?.sections.length ?? 0) > 0);

  return (
    <div className="space-y-6">
      <PageHeader title={t('qa.home.title')} subtitle={t('qa.home.subtitle')} />

      <Card className="bg-gradient-to-br from-emerald-50 to-white">
        <SectionTitle>{t('qa.home.aboutTitle')}</SectionTitle>
        <p className="text-sm leading-relaxed">{t('qa.home.about')}</p>
        <p className="mt-2 text-sm leading-relaxed text-emerald-800">{t('qa.home.independent')}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-emerald-100 pt-3 text-sm">
          <Icon name="book" className="h-4 w-4 text-emerald-700" />
          <span className="font-medium">{t('qa.home.syllabus', { name: SYLLABUS.name, version: SYLLABUS.version })}</span>
          <ProvenanceTag kind="source" />
        </div>
        {syllabusDoc && (
          <p className="mt-1 break-words text-xs text-muted">
            {t('qa.home.syllabusFrom', { file: syllabusDoc.fileName, date: syllabusDoc.date ?? '—' })}{' '}
            <Link to="/qa/sources" className="text-emerald-700 underline">{t('qa.nav.sources')}</Link>
          </p>
        )}
      </Card>

      <section>
        <SectionTitle>{t('qa.home.recommendations')}</SectionTitle>
        <div className="grid gap-3 md:grid-cols-3">
          <Card className="flex flex-col">
            <div className="text-xs font-medium uppercase tracking-wide text-emerald-700">{t('qa.home.nextChapter')}</div>
            {next ? (
              <>
                <div className="mt-1 font-semibold" lang="en">{t('qa.home.nextChapterDetail', { n: next.number, title: next.title })}</div>
                <TopicTr text={next.content?.titleTr} className="mt-0.5 block" />
                <div className="mt-auto pt-3"><TopicButtonLink to={`/qa/topic/${next.id}`}>{t('qa.home.continueChapter')}</TopicButtonLink></div>
              </>
            ) : <p className="mt-1 text-sm text-muted">{t('qa.home.allDone')}</p>}
          </Card>
          <Card className="flex flex-col">
            <div className="text-xs font-medium uppercase tracking-wide text-emerald-700">{t('qa.home.dueTitle')}</div>
            <p className="mt-1 text-sm">{due.length ? t('qa.home.due', { count: due.length }) : t('qa.home.noDue')}</p>
            {due.length > 0 && <div className="mt-auto pt-3"><TopicButtonLink to="/qa/flashcards" tone="secondary">{t('qa.home.reviewNow')}</TopicButtonLink></div>}
          </Card>
          <Card>
            <div className="text-xs font-medium uppercase tracking-wide text-emerald-700">{t('qa.home.weakTitle')}</div>
            {weak.length === 0 ? <p className="mt-1 text-sm text-muted">{t('qa.home.noWeak')}</p> : (
              <ul className="mt-2 space-y-2">
                {weak.map(({ topic, stat, accuracy }) => (
                  <li key={topic.id}>
                    <Link to={`/qa/quiz?topic=${topic.id}`} className="block rounded-xl bg-amber-50 px-3 py-2 text-sm hover:bg-amber-100">
                      <span className="font-medium">{t('qa.common.chapter', { n: topic.number })}</span>{' '}
                      <span lang="en">{topic.title}</span>
                      <span className="block text-xs text-muted">
                        {accuracy === null ? t('qa.home.weakDetailNoAccuracy', { misses: stat.misses }) : t('qa.home.weakDetail', { accuracy, misses: stat.misses })}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </section>

      <section>
        <SectionTitle>{t('qa.home.chapters')}</SectionTitle>
        {TOPICS.length === 0 ? <Card><p className="text-sm text-muted">{t('qa.home.emptySyllabus')}</p></Card> : (
          <>
            {!anyContent && <p className="mb-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">{t('qa.home.emptyContent')}</p>}
            <div className="grid gap-3 md:grid-cols-2">
              {TOPICS.map((topic) => {
                const stat = topicStat(topic, progress);
                const kwCount = topic.keywordIds.length + KEYWORDS_NOT_IN_GLOSSARY.filter((k) => k.chapter === topic.id).length;
                const pct = stat.total ? (stat.read / stat.total) * 100 : 0;
                return (
                  <Link key={topic.id} to={`/qa/topic/${topic.id}`}
                    className={cx('block rounded-2xl border bg-white p-5 transition hover:border-emerald-300 hover:shadow-sm', stat.completed ? 'border-emerald-200' : 'border-line')}>
                    <div className="flex items-start gap-3">
                      <span className={cx('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-semibold', stat.completed ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700')}>
                        {stat.completed ? <Icon name="check" /> : topic.number}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-muted">{t('qa.common.chapter', { n: topic.number })}</div>
                        <div className="font-semibold leading-snug" lang="en">{topic.title}</div>
                        <TopicTr text={topic.content?.titleTr} className="block" />
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {topic.minutes !== undefined && <Badge tone="gray"><Icon name="clock" className="mr-1 h-3.5 w-3.5" />{t('common.minutes', { count: topic.minutes })}</Badge>}
                      {kLevelCounts(topic).map(([level, n]) => <Badge key={level} tone="sky">{level} · {n}</Badge>)}
                      <Badge tone="gray">{t('qa.common.keywords', { count: kwCount })}</Badge>
                      <Badge tone={stat.completed ? 'green' : stat.started ? 'amber' : 'gray'}>
                        {stat.completed ? t('qa.common.completed') : stat.started ? t('qa.common.inProgress') : t('qa.common.notStarted')}
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <div className="mb-1 flex flex-wrap justify-between gap-x-3 text-xs text-muted">
                        <span>{t('qa.home.readProgress', { read: stat.read, total: stat.total })}</span>
                        <span>{stat.best === null ? t('qa.home.noScore') : t('qa.home.bestScore', { score: stat.best })}</span>
                      </div>
                      <ProgressBar value={pct} color="bg-emerald-500" className="bg-emerald-100" />
                    </div>
                    <div className="mt-2"><SourceRefLabel refs={{ doc: SYLLABUS.ref.doc, section: topic.number, page: topic.page }} /></div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </section>

      <section>
        <SectionTitle>{t('qa.home.quickLinks')}</SectionTitle>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 hover:border-emerald-300 hover:bg-emerald-50/50">
              <Icon name={l.icon} className="h-5 w-5 shrink-0 text-emerald-700" />
              <span className="min-w-0">
                <span className="block text-sm font-medium">{t(`qa.nav.${l.key}`)}</span>
                <span className="block text-xs text-muted">{t(`qa.home.links.${l.key}`)}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
