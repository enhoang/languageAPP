import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppData, useCourse, useStudyTimer } from '../state/AppDataContext';
import { wordOf } from '../courses';
import { availableWords, buildWordPractice, exerciseById, practiceModes, type PracticeMode } from '../lib/generate';
import { dueWordIds } from '../lib/stats';
import { shuffle } from '../lib/text';
import type { CourseId, Exercise } from '../types';
import { ExerciseRunner, type RunResult } from '../components/exercises/ExerciseRunner';
import { ResultsView } from '../components/ResultsView';
import { NoVoiceNotice } from '../components/Audio';
import { useI18n } from '../i18n/LocaleContext';
import { Icon } from '../components/Icon';
import { Badge, Button, ButtonLink, Card, PageHeader, cx } from '../components/ui';

type Mode = 'review' | 'mistakes' | PracticeMode;

/** Mode ids used in links before the multi-course upgrade (Chinese only). */
const LEGACY_MODES: Record<string, Mode> = { zh2vi: 'meaning', vi2zh: 'reverse', pinyin: 'pron', hanzi: 'write' };

/** Modes whose label depends on the course: practice.modes.<mode>.<courseId>.title / .detail */
type CourseMode = 'meaning' | 'reverse' | 'write';
const isCourseMode = (m: Mode): m is CourseMode => m === 'meaning' || m === 'reverse' || m === 'write';

type Source = 'all' | 'favorite' | 'difficult';

export default function Practice() {
  const { data } = useAppData();
  const { course, cp } = useCourse();
  const { t } = useI18n();
  useStudyTimer();
  const [params, setParams] = useSearchParams();
  // Labels: practice.modes.<id>.title / .detail
  const modes = useMemo<Mode[]>(() => {
    const word = practiceModes(course);
    return ['review', 'mistakes', ...word.filter((m) => m === 'mixed'), ...word.filter((m) => m !== 'mixed')];
  }, [course]);
  const rawMode = params.get('mode');
  const mode = rawMode ? ((LEGACY_MODES[rawMode] ?? rawMode) as Mode) : null;
  const [source, setSource] = useState<Source>('all');
  const [session, setSession] = useState<{ items: Exercise[]; key: number } | null>(null);
  const [results, setResults] = useState<RunResult[] | null>(null);
  const count = { 10: 5, 20: 10, 30: 20 }[data.settings.sessionMinutes];

  const pool = useMemo(() => availableWords(course, cp), [course, cp]);
  const due = dueWordIds(cp).filter((id) => wordOf(course, id));
  const openMistakes = cp.mistakes.filter((m) => !m.resolved);

  const sourceIds = useMemo(() => {
    if (source === 'favorite') return Object.keys(cp.words).filter((id) => cp.words[id].favorite && wordOf(course, id));
    if (source === 'difficult') return Object.keys(cp.words).filter((id) => cp.words[id].difficult && wordOf(course, id));
    return pool.map((w) => w.id);
  }, [source, cp.words, pool, course]);

  // Switching course ends the current round (its exercises belong to the other course).
  useEffect(() => {
    setSession(null);
    setResults(null);
  }, [course.id]);

  // Old links (?mode=zh2vi …) are rewritten to the new ids.
  useEffect(() => {
    if (rawMode && mode && rawMode !== mode) setParams({ mode }, { replace: true });
  }, [rawMode, mode, setParams]);

  const label = (m: Mode, part: 'title' | 'detail', id: CourseId = course.id) =>
    isCourseMode(m) ? t(`practice.modes.${m}.${id}.${part}`) : t(`practice.modes.${m}.${part}`);

  const build = (m: Mode, extra = false): Exercise[] => {
    if (m === 'mistakes') return openMistakes.map((x) => exerciseById(course, x.id)).filter((x): x is Exercise => x !== null).slice(0, count);
    if (m === 'review') {
      // Due words first; "extra" practice picks the least recently reviewed learned words.
      const ids = extra
        ? [...pool.map((w) => w.id)].sort((a, b) => (cp.words[a]?.lastReviewed ?? '').localeCompare(cp.words[b]?.lastReviewed ?? ''))
        : due;
      return buildWordPractice(course, ids, 'mixed', pool, count);
    }
    return buildWordPractice(course, shuffle(sourceIds), m, pool, count);
  };

  const start = (m: Mode, extra = false) => {
    setResults(null);
    setSession({ items: build(m, extra), key: Date.now() });
  };
  const choose = (m: Mode | null) => {
    setSession(null);
    setResults(null);
    setParams(m ? { mode: m } : {}, { replace: true });
  };

  const current = modes.find((m) => m === mode);

  if (!current) {
    return (
      <div>
        <PageHeader title={t('practice.title')} subtitle={t('practice.subtitle', { count })} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {modes.map((m) => (
            <button key={m} type="button" onClick={() => choose(m)} className="rounded-2xl border border-line bg-white p-4 text-left transition hover:border-sky-300 hover:bg-sky-50/40">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold">{label(m, 'title')}</span>
                {m === 'review' && due.length > 0 && <Badge tone="peach">{t('practice.due', { count: due.length })}</Badge>}
                {m === 'mistakes' && openMistakes.length > 0 && <Badge tone="rose">{openMistakes.length}</Badge>}
              </div>
              <div className="mt-1 text-sm text-muted">{label(m, 'detail')}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const wordMode = mode !== 'review' && mode !== 'mistakes';
  const availableCount = mode === 'review' ? due.length : mode === 'mistakes' ? openMistakes.length : sourceIds.length;

  return (
    <div>
      <button type="button" onClick={() => choose(null)} className="mb-3 inline-flex items-center gap-1 text-sm text-muted hover:text-ink"><Icon name="left" className="h-4 w-4" /> {t('practice.backToModes')}</button>
      <PageHeader title={label(current, 'title')} subtitle={label(current, 'detail')} />
      <NoVoiceNotice />
      <Card>
        {session && !results ? (
          session.items.length > 0
            ? <ExerciseRunner key={session.key} exercises={session.items} onComplete={setResults} />
            : <p className="text-muted">{t('exercise.empty')}</p>
        ) : results ? (
          <ResultsView results={results} actions={<>
            <Button onClick={() => start(mode!, mode === 'review' && due.length === 0)}>{t('practice.newRound')}</Button>
            <Button variant="secondary" onClick={() => choose(null)}>{t('practice.changeMode')}</Button>
          </>} />
        ) : (
          <div>
            {wordMode && (
              <div className="mb-4">
                <div className="mb-2 text-sm font-medium">{t('practice.wordSource')}</div>
                <div className="flex flex-wrap gap-2">
                  {([['all', t('practice.source.all', { n: pool.length })], ['favorite', t('practice.source.favorite')], ['difficult', t('practice.source.difficult')]] as const).map(([k, label]) => (
                    <button key={k} type="button" onClick={() => setSource(k)} aria-pressed={source === k}
                      className={cx('rounded-xl border px-3 py-1.5 text-sm', source === k ? 'border-sky-300 bg-sky-50 text-sky-700' : 'border-line bg-white')}>{label}</button>
                  ))}
                </div>
              </div>
            )}
            {availableCount > 0 ? (
              <>
                <p className="mb-4 text-muted">
                  {mode === 'review'
                    ? t('practice.availableDue', { count: due.length })
                    : mode === 'mistakes'
                      ? t('practice.availableMistakes', { count: openMistakes.length })
                      : t('practice.availableSource', { count: sourceIds.length })}{' '}
                  {t('practice.roundSize', { count: Math.min(count, availableCount) })}
                </p>
                <Button onClick={() => start(mode!)}>{t('common.actions.start')}</Button>
              </>
            ) : mode === 'review' ? (
              <div>
                <p className="mb-4 text-muted">{t('practice.noneDue')}{pool.length === 0 && <> {t('practice.learnFirst')}</>}</p>
                {pool.length > 0 ? <Button variant="secondary" onClick={() => start('review', true)}>{t('practice.reviewExtra')}</Button> : <ButtonLink to="/path">{t('practice.goToPath')}</ButtonLink>}
              </div>
            ) : mode === 'mistakes' ? (
              <p className="text-muted">{t('practice.noMistakes')}</p>
            ) : (
              <p className="text-muted">{t('practice.emptySource')}{source !== 'all' && <> {t('practice.markWordsHint')}</>}</p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
