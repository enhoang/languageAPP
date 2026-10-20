import { useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { LText } from '../../types';
import type { QaProgress, QaTopic } from '../../qa/types';
import { QUESTION_BY_ID, TERM_BY_ID, TOPICS } from '../../qa/content';
import { useQa } from '../../qa/QaContext';
import { useI18n } from '../../i18n/LocaleContext';
import { Prose } from '../Prose';
import { cx } from '../ui';

/** Authored LText that is actually filled in (placeholders have empty strings). */
export function hasText(l: LText | undefined | null): l is LText {
  return !!l && typeof l.en === 'string' && l.en.trim() !== '';
}

/**
 * Translation of an English heading (e.g. a chapter title) following the assist level:
 * 'full' shows it, 'tap' shows a reveal button, 'none' hides it. Hidden in the English interface.
 */
export function TopicTr({ text, className }: { text: LText | undefined; className?: string }) {
  const { t, lang } = useI18n();
  const { progress } = useQa();
  const [show, setShow] = useState(false);
  const assist = progress.settings.assist;
  if (!hasText(text) || assist === 'none' || lang === 'en') return null;
  const value = text[lang];
  if (!value.trim() || value.trim() === text.en.trim()) return null;
  if (assist === 'tap' && !show) {
    return (
      <button type="button" onClick={() => setShow(true)} className={cx('text-xs font-medium text-emerald-700 underline decoration-dotted', className)}>
        {t('qa.topic.showTranslation')}
      </button>
    );
  }
  return <span className={cx('text-sm text-muted', className)} lang={lang === 'zh' ? 'zh-CN' : 'vi'}>{value}</span>;
}

/** Supplementary prose: English only when assist is 'none', otherwise the interface language. */
export function TopicProse({ text }: { text: LText }) {
  const { progress } = useQa();
  if (progress.settings.assist === 'none') return <span lang="en">{text.en}</span>;
  return <Prose text={text} />;
}

/** Chip linking to a glossary term: English term first, translated name per assist level. */
export function TopicTermChip({ id }: { id: string }) {
  const { lang } = useI18n();
  const { progress } = useQa();
  const term = TERM_BY_ID[id];
  if (!term) return null;
  const name = lang !== 'en' && progress.settings.assist === 'full' ? term.name?.[lang] : undefined;
  return (
    <Link to={`/qa/glossary/${id}`} className="inline-flex flex-wrap items-baseline gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-sm text-emerald-800 ring-1 ring-emerald-100 hover:bg-emerald-100">
      <span lang="en" className="font-medium">{term.term}</span>
      {name && <span className="text-xs text-emerald-700/80" lang={lang === 'zh' ? 'zh-CN' : 'vi'}>{name}</span>}
    </Link>
  );
}

// ---------- statistics ----------

export interface TopicStat {
  read: number;
  total: number;
  completed: boolean;
  started: boolean;
  /** best score (percent) of a quiz on this chapter, null when none */
  best: number | null;
  /** answers on this chapter's questions across all attempts */
  answered: number;
  correct: number;
  /** unresolved missed items belonging to this chapter */
  misses: number;
}

/** Topic of a missed item: practice question → its chapter, terminology item → the term's chapters. */
export function missTopics(itemId: string): string[] {
  if (itemId.startsWith('q:')) {
    const q = QUESTION_BY_ID[itemId.slice(2)];
    return q ? [q.topicId] : [];
  }
  if (itemId.startsWith('t:')) return TERM_BY_ID[itemId.split(':')[1]]?.topicIds ?? [];
  return [];
}

/** Glossary terms involved in a missed item. */
export function missTerms(itemId: string): string[] {
  if (itemId.startsWith('q:')) return QUESTION_BY_ID[itemId.slice(2)]?.termIds?.filter((id) => TERM_BY_ID[id]) ?? [];
  if (itemId.startsWith('t:')) {
    const id = itemId.split(':')[1];
    return TERM_BY_ID[id] ? [id] : [];
  }
  return [];
}

export function topicStat(topic: QaTopic, p: QaProgress): TopicStat {
  const tp = p.topics[topic.id];
  const valid = new Set(topic.sections.map((s) => s.number));
  const read = (tp?.readSections ?? []).filter((s) => valid.has(s)).length;
  let best: number | null = null;
  let answered = 0;
  let correct = 0;
  for (const a of p.attempts) {
    if (a.topicId === topic.id && a.total > 0) best = Math.max(best ?? 0, Math.round((a.correct / a.total) * 100));
    const b = a.byTopic?.[topic.id];
    if (b) {
      answered += b.total;
      correct += b.correct;
    }
  }
  const misses = Object.entries(p.misses).filter(([id, m]) => !m.resolved && missTopics(id).includes(topic.id)).length;
  return { read, total: topic.sections.length, completed: tp?.status === 'completed', started: !!tp, best, answered, correct, misses };
}

/** Chapters that need work: low accuracy in attempts or several unresolved misses, weakest first. */
export function weakTopicList(p: QaProgress): { topic: QaTopic; stat: TopicStat; accuracy: number | null }[] {
  return TOPICS.map((topic) => {
    const stat = topicStat(topic, p);
    const accuracy = stat.answered ? Math.round((stat.correct / stat.answered) * 100) : null;
    return { topic, stat, accuracy };
  })
    .filter((x) => (x.accuracy !== null && x.stat.answered >= 3 && x.accuracy < 70) || x.stat.misses >= 2)
    .sort((a, b) => (a.accuracy ?? 100) - (b.accuracy ?? 100) || b.stat.misses - a.stat.misses);
}

/** First chapter in syllabus order that is not completed. */
export function nextTopic(p: QaProgress): QaTopic | undefined {
  return TOPICS.find((t) => p.topics[t.id]?.status !== 'completed');
}

/** Learning-objective counts by K-level, e.g. { K1: 3, K2: 8 }. */
export function kLevelCounts(topic: QaTopic): [string, number][] {
  const m = new Map<string, number>();
  for (const o of topic.objectives) m.set(o.level, (m.get(o.level) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

const BTN = 'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed';
const BTN_TONE = {
  primary: 'bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-emerald-200',
  secondary: 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 disabled:opacity-50',
};

/** Emerald (module accent) link button. */
export function TopicButtonLink({ to, tone = 'primary', className, children }: { to: string; tone?: keyof typeof BTN_TONE; className?: string; children: ReactNode }) {
  return <Link to={to} className={cx(BTN, BTN_TONE[tone], className)}>{children}</Link>;
}

/** Emerald (module accent) button. */
export function TopicButton({ tone = 'primary', className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: keyof typeof BTN_TONE }) {
  return <button type="button" {...props} className={cx(BTN, BTN_TONE[tone], className)} />;
}
