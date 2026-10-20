import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCourse } from '../state/AppDataContext';
import { TOPICS, WORD_TYPES } from '../courses/meta';
import { lessonOf } from '../courses';
import type { Course } from '../types';
import { MASTERY_STATUSES, wordStatus } from '../lib/srs';
import { useI18n } from '../i18n/LocaleContext';
import { stripTones } from '../lib/pinyin';
import { foldVietnamese } from '../lib/text';
import { WordCard } from '../components/WordCard';
import { Icon } from '../components/Icon';
import { ButtonLink, PageHeader } from '../components/ui';

/** Loose form of a pronunciation aid for search: case, spaces, IPA slashes/stress marks and (pinyin) tones ignored. */
function loosePron(s: string, course: Course): string {
  const base = course.id === 'zh' ? stripTones(s).replace(/\d/g, '') : s.toLowerCase();
  return base.replace(/[\s/[\]ˈˌ.'’-]/g, '');
}

const SELECT = 'rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-sky-300';

export default function Vocabulary() {
  const { course, cp } = useCourse();
  const { t, tr } = useI18n();
  const words = course.words;
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const topic = params.get('topic') ?? '';
  const type = params.get('type') ?? '';
  const stage = params.get('stage') ?? '';
  const level = params.get('level') ?? '';
  const status = params.get('status') ?? '';
  const flag = params.get('flag') ?? '';

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const options = useMemo(() => ({
    lessons: new Set(words.map((w) => w.lessonId)).size,
    topics: TOPICS.filter((id) => words.some((w) => w.topic === id)),
    types: WORD_TYPES.filter((id) => words.some((w) => w.type === id)),
    stages: course.stages.filter((s) => words.some((w) => w.stage === s.id)),
    levels: [...new Set(words.map((w) => w.level))],
  }), [words, course.stages]);

  const results = useMemo(() => {
    const raw = q.trim();
    const needle = foldVietnamese(raw);
    const textNeedle = raw.toLowerCase().replace(/\s+/g, ' ');
    const pronNeedle = loosePron(raw, course);
    return words.filter((w) => {
      const wp = cp.words[w.id];
      if (topic && w.topic !== topic) return false;
      if (type && w.type !== type) return false;
      if (stage && String(w.stage) !== stage) return false;
      if (level && w.level !== level) return false;
      if (status && wordStatus(wp) !== status) return false;
      if (flag === 'favorite' && !wp?.favorite) return false;
      if (flag === 'difficult' && !wp?.difficult) return false;
      if (!needle) return true;
      return (
        w.text.toLowerCase().includes(textNeedle) ||
        foldVietnamese(w.vi).includes(needle) ||
        foldVietnamese(w.en).includes(needle) ||
        (pronNeedle.length > 0 && [w.pron, w.pronUK].some((p) => p && loosePron(p, course).includes(pronNeedle)))
      );
    });
  }, [q, topic, type, stage, level, status, flag, words, cp.words, course]);

  const anyFilter = q || topic || type || stage || level || status || flag;
  const searchHelp = `${t('vocabulary.searchHelp', { pron: tr(course.pronName) })}${course.id === 'zh' ? ` ${t('vocabulary.searchHelpZh')}` : ''}`;

  return (
    <div>
      <PageHeader title={t('vocabulary.title')} subtitle={`${t('vocabulary.subtitle', { count: words.length, lessons: options.lessons })} ${searchHelp}`}>
        <ButtonLink to="/practice?mode=mixed" variant="secondary"><Icon name="pencil" className="h-4 w-4" /> {t('vocabulary.practice')}</ButtonLink>
      </PageHeader>

      <div className="mb-5 space-y-3">
        <label className="relative block">
          <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
          <input value={q} onChange={(e) => set('q', e.target.value)} placeholder={t(`vocabulary.searchPlaceholder.${course.id}`)} aria-label={t('vocabulary.searchLabel')}
            className="w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-3 outline-none focus:border-sky-300" />
        </label>
        <div className="flex flex-wrap gap-2">
          <select className={SELECT} value={topic} onChange={(e) => set('topic', e.target.value)} aria-label={t('vocabulary.filter.topic')}>
            <option value="">{t('vocabulary.filter.allTopics')}</option>
            {options.topics.map((id) => <option key={id} value={id}>{t(`common.topic.${id}`)}</option>)}
          </select>
          <select className={SELECT} value={type} onChange={(e) => set('type', e.target.value)} aria-label={t('vocabulary.filter.type')}>
            <option value="">{t('vocabulary.filter.allTypes')}</option>
            {options.types.map((id) => <option key={id} value={id}>{t(`common.wordType.${id}`)}</option>)}
          </select>
          <select className={SELECT} value={stage} onChange={(e) => set('stage', e.target.value)} aria-label={t('vocabulary.filter.stage')}>
            <option value="">{t('vocabulary.filter.allStages')}</option>
            {options.stages.map((s) => <option key={s.id} value={s.id}>{tr(s.title)}</option>)}
          </select>
          {options.levels.length > 1 && (
            <select className={SELECT} value={level} onChange={(e) => set('level', e.target.value)} aria-label={t('vocabulary.filter.level')}>
              <option value="">{t('vocabulary.filter.allLevels')}</option>
              {options.levels.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          )}
          <select className={SELECT} value={status} onChange={(e) => set('status', e.target.value)} aria-label={t('vocabulary.filter.status')}>
            <option value="">{t('vocabulary.filter.allStatuses')}</option>
            {MASTERY_STATUSES.map((s) => <option key={s} value={s}>{t(`common.status.${s}`)}</option>)}
          </select>
          <select className={SELECT} value={flag} onChange={(e) => set('flag', e.target.value)} aria-label={t('vocabulary.filter.flag')}>
            <option value="">{t('vocabulary.filter.allWords')}</option>
            <option value="favorite">★ {t('vocabulary.filter.favorite')}</option>
            <option value="difficult">⚑ {t('vocabulary.filter.difficult')}</option>
          </select>
          {anyFilter && <button type="button" onClick={() => setParams({}, { replace: true })} className="rounded-xl px-3 py-2 text-sm text-sky-600 hover:bg-sky-50">{t('vocabulary.filter.clear')}</button>}
        </div>
      </div>

      <p className="mb-3 text-sm text-muted">{t('vocabulary.results', { count: results.length })}</p>
      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line py-16 text-center text-muted">{words.length === 0 ? t('vocabulary.emptyCourse') : t('vocabulary.empty')}</div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {results.map((w) => (
            <div key={w.id}>
              <div className="mb-1 text-xs text-muted">{t('common.day', { day: lessonOf(course, w.lessonId)?.day ?? '?' })} · {t(`common.topic.${w.topic}`)}</div>
              <WordCard word={w} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
