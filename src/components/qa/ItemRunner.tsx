import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Assist, QaTerm } from '../../qa/types';
import { TERM_BY_ID, TOPIC_BY_ID } from '../../qa/content';
import { correctKey, gradeItem, itemTermIds, type QaItem } from '../../qa/quiz';
import { useQa } from '../../qa/QaContext';
import { shuffle } from '../../lib/text';
import { useI18n } from '../../i18n/LocaleContext';
import { ProvenanceTag, SourceRefLabel } from './Provenance';
import { AssistHelpButton, AssistText, helpVisible } from './AssistToggle';
import { localName, useChapterLabel } from './TermCard';
import { Badge, Button, Card, ProgressBar, cx } from '../ui';
import { Icon } from '../Icon';

export type ItemResponse = string | Record<string, string>;

export interface ItemResult {
  item: QaItem;
  response: ItemResponse | null;
  correct: boolean;
  /** option display order used during the run */
  order?: string[];
}

/** Chapter of an item: the question's chapter, or the first chapter of its (first) term. */
export function itemTopic(item: QaItem): string {
  if (item.kind === 'question') return item.question.topicId;
  const t = TERM_BY_ID[itemTermIds(item)[0]];
  return t?.topicIds[0] ?? 'other';
}

export function resultsByTopic(results: ItemResult[]): Record<string, { correct: number; total: number }> {
  const out: Record<string, { correct: number; total: number }> = {};
  for (const r of results) {
    const k = itemTopic(r.item);
    const cur = out[k] ?? { correct: 0, total: 0 };
    out[k] = { correct: cur.correct + (r.correct ? 1 : 0), total: cur.total + 1 };
  }
  return out;
}

/** Display order of the options (keys) of an item, fixed for the whole run. */
export function displayOrder(item: QaItem): string[] {
  switch (item.kind) {
    case 'question': return shuffle(item.question.options.map((_, i) => String(i)));
    case 'confused': return shuffle([item.termId, item.otherId]);
    case 'match': return shuffle(item.termIds);
    default: return item.options;
  }
}

const isComplete = (item: QaItem, r: ItemResponse | null | undefined) =>
  r != null && (item.kind !== 'match' || (typeof r === 'object' && item.termIds.every((id) => r[id])));

const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, s % 60)).padStart(2, '0')}`;

interface RunnerProps {
  items: QaItem[];
  assist: Assist;
  /** exam mode: no feedback until submitted; answers are recorded at the end */
  exam?: boolean;
  /** countdown in minutes (exam mode) */
  minutes?: number;
  onFinish: (results: ItemResult[], seconds: number) => void;
  onQuit?: () => void;
}

/** Runs quiz items one by one (practice: feedback after each answer; exam: review only after submitting). */
export function ItemRunner({ items, assist, exam = false, minutes, onFinish, onQuit }: RunnerProps) {
  const { t } = useI18n();
  const { record } = useQa();
  const [orders] = useState(() => items.map(displayOrder));
  const [idx, setIdx] = useState(0);
  const [responses, setResponses] = useState<(ItemResponse | null)[]>(() => items.map(() => null));
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const [help, setHelp] = useState(false);
  const startedAt = useRef(Date.now());
  const done = useRef(false);
  const [now, setNow] = useState(Date.now());

  const elapsed = Math.floor((now - startedAt.current) / 1000);
  const remaining = minutes ? minutes * 60 - elapsed : null;

  const finish = (resp = responses) => {
    if (done.current) return;
    done.current = true;
    const results = items.map((item, i) => {
      const r = resp[i];
      return { item, response: r, correct: r != null && gradeItem(item, r), order: orders[i] };
    });
    if (exam) for (const r of results) record(r.item.id, r.correct, itemTermIds(r.item));
    onFinish(results, Math.floor((Date.now() - startedAt.current) / 1000));
  };

  useEffect(() => {
    if (!minutes) return;
    const h = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(h);
  }, [minutes]);
  const finishRef = useRef(finish);
  finishRef.current = finish;
  useEffect(() => {
    if (remaining !== null && remaining <= 0) finishRef.current();
  }, [remaining]);

  if (!items.length) return <Card className="text-center text-muted">{t('qaStudy.run.empty')}</Card>;

  const item = items[idx];
  const response = responses[idx];
  const revealed = !exam && checked[idx];

  const setResponse = (r: ItemResponse) => setResponses((prev) => prev.map((x, i) => (i === idx ? r : x)));
  const check = (r: ItemResponse) => {
    if (checked[idx]) return;
    const correct = gradeItem(item, r);
    record(item.id, correct, itemTermIds(item));
    setResponses((prev) => prev.map((x, i) => (i === idx ? r : x)));
    setChecked((prev) => prev.map((x, i) => (i === idx ? true : x)));
  };
  const respond = (r: ItemResponse) => {
    if (exam || item.kind === 'match') setResponse(r);
    else check(r);
  };
  const go = (i: number) => { setIdx(i); setHelp(false); };
  const answered = responses.filter((r, i) => isComplete(items[i], r)).length;
  const last = idx === items.length - 1;

  const submit = () => {
    const open = items.length - answered;
    if (open > 0 && !window.confirm(t('qaStudy.run.confirmSubmit', { count: open }))) return;
    finish();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-muted">{t('qaStudy.run.progress', { n: idx + 1, total: items.length })}</div>
        <div className="flex items-center gap-2">
          {remaining !== null && (
            <span className={cx('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-medium tabular-nums', remaining < 60 ? 'bg-rose-50 text-rose-700' : 'bg-stone-100 text-stone-700')}
              aria-label={t('qaStudy.run.timeLeft', { time: fmtTime(Math.max(0, remaining)) })}>
              <Icon name="clock" className="h-4 w-4" /> {fmtTime(Math.max(0, remaining))}
            </span>
          )}
          <AssistHelpButton assist={assist} help={help} onToggle={() => setHelp((h) => !h)} />
          {onQuit && <Button variant="ghost" className="px-2.5 py-1.5 text-xs" onClick={() => { if (window.confirm(t('qaStudy.run.confirmQuit'))) onQuit(); }}>{t('qaStudy.run.quit')}</Button>}
        </div>
      </div>
      <ProgressBar value={((exam ? answered : idx + (revealed ? 1 : 0)) / items.length) * 100} color="bg-emerald-500" />

      <Card>
        <ItemView key={item.id} item={item} order={orders[idx]} response={response} revealed={revealed} assist={assist} help={help} onRespond={revealed ? undefined : respond} />
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-2">
        {exam ? (
          <>
            <Button variant="secondary" disabled={idx === 0} onClick={() => go(idx - 1)}><Icon name="left" className="h-4 w-4" /> {t('common.actions.previous')}</Button>
            <div className="flex gap-2">
              {!last && <Button variant="secondary" onClick={() => go(idx + 1)}>{t('common.actions.next')} <Icon name="right" className="h-4 w-4" /></Button>}
              <Button onClick={submit} className="bg-emerald-600 hover:bg-emerald-700">{t('qaStudy.run.submit')}</Button>
            </div>
          </>
        ) : (
          <>
            <span />
            {item.kind === 'match' && !revealed ? (
              <Button disabled={!isComplete(item, response)} onClick={() => response && check(response)} className="bg-emerald-600 hover:bg-emerald-700">{t('common.actions.check')}</Button>
            ) : revealed ? (
              <Button onClick={() => (last ? finish() : go(idx + 1))} className="bg-emerald-600 hover:bg-emerald-700">
                {last ? t('common.actions.seeResults') : t('common.actions.continue')}
              </Button>
            ) : (
              <span className="text-xs text-muted">{t('qaStudy.run.pickAnswer')}</span>
            )}
          </>
        )}
      </div>

      {exam && (
        <div>
          <div className="mb-2 text-xs text-muted">{t('qaStudy.run.answeredOf', { n: answered, total: items.length })}</div>
          <div className="flex flex-wrap gap-1.5" role="navigation" aria-label={t('qaStudy.run.questionList')}>
            {items.map((it, i) => (
              <button key={it.id} type="button" onClick={() => go(i)} aria-current={i === idx ? 'step' : undefined}
                aria-label={t('qaStudy.run.goTo', { n: i + 1 })}
                className={cx('h-8 w-8 rounded-lg text-xs font-medium tabular-nums ring-1',
                  i === idx ? 'bg-emerald-600 text-white ring-emerald-600' : isComplete(it, responses[i]) ? 'bg-emerald-50 text-emerald-800 ring-emerald-200' : 'bg-white text-stone-600 ring-line')}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- one item ----------

interface ViewProps {
  item: QaItem;
  order: string[];
  response: ItemResponse | null;
  /** show the correct answer and explanations */
  revealed: boolean;
  assist: Assist;
  help: boolean;
  /** undefined: read-only */
  onRespond?: (r: ItemResponse) => void;
}

/** Renders one quiz item of any kind; used by the runner and for the review after a quiz or exam. */
export function ItemView(props: ViewProps) {
  const { item } = props;
  switch (item.kind) {
    case 'question': return <QuestionView {...props} item={item} />;
    case 'match': return <MatchView {...props} item={item} />;
    default: return <TermChoiceView {...props} item={item} />;
  }
}

function Verdict({ correct, answered }: { correct: boolean; answered: boolean }) {
  const { t } = useI18n();
  return (
    <div className={cx('flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium', correct ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800')} role="status">
      <Icon name={correct ? 'check' : 'x'} className="h-4 w-4" />
      {correct ? t('qaStudy.run.correct') : answered ? t('qaStudy.run.incorrect') : t('qaStudy.run.unanswered')}
    </div>
  );
}

function Choice({ k, children, note, correctKey: ck, response, revealed, onPick }: { k: string; children: ReactNode; note?: ReactNode; correctKey: string | null; response: ItemResponse | null; revealed: boolean; onPick?: (k: string) => void }) {
  const chosen = response === k;
  const right = k === ck;
  const tone = revealed
    ? right ? 'border-emerald-500 bg-emerald-50' : chosen ? 'border-rose-400 bg-rose-50' : 'border-line bg-white opacity-80'
    : chosen ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' : 'border-line bg-white hover:border-emerald-300 hover:bg-emerald-50/40';
  return (
    <li>
      <button type="button" disabled={!onPick} onClick={() => onPick?.(k)} aria-pressed={chosen}
        className={cx('flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition disabled:cursor-default', tone)}>
        <span className="min-w-0 flex-1 break-words">{children}</span>
        {revealed && right && <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />}
        {revealed && chosen && !right && <Icon name="x" className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />}
      </button>
      {revealed && note && <div className="mt-1 px-3.5 text-xs leading-relaxed text-stone-600">{note}</div>}
    </li>
  );
}

function QuestionView({ item, order, response, revealed, assist, help, onRespond }: ViewProps & { item: Extract<QaItem, { kind: 'question' }> }) {
  const { t } = useI18n();
  const chapter = useChapterLabel();
  const q = item.question;
  const ck = correctKey(item);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <ProvenanceTag kind="practice" />
        <Badge tone="gray">{chapter(q.topicId, false)}</Badge>
        {q.kLevel && <Badge tone="sky">{q.kLevel}</Badge>}
        {q.scenario && <Badge tone="amber">{t('qaStudy.run.scenario')}</Badge>}
      </div>
      {q.scenario && (
        <div className="rounded-xl bg-stone-50 p-3 text-sm leading-relaxed whitespace-pre-line">
          <AssistText text={q.scenario} assist={assist} help={help} />
        </div>
      )}
      <p className="font-medium leading-relaxed whitespace-pre-line"><AssistText text={q.stem} assist={assist} help={help} /></p>
      <ul className="space-y-2">
        {order.map((k) => {
          const note = q.optionNotes?.[Number(k)];
          return (
            <Choice key={k} k={k} correctKey={ck} response={response} revealed={revealed} onPick={onRespond}
              note={note && k !== ck ? <AssistText text={note} assist={assist} help={help} /> : undefined}>
              <AssistText text={q.options[Number(k)]} assist={assist} help={help} />
            </Choice>
          );
        })}
      </ul>
      {revealed && (
        <div className="space-y-2">
          <Verdict correct={response === ck} answered={response != null} />
          <div className="rounded-xl bg-stone-50 p-3 text-sm leading-relaxed">
            <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted">{t('qaStudy.run.explanation')}</div>
            <AssistText text={q.explanation} assist={assist} help={help} />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <span>{t('qaStudy.run.basedOn')}</span>
            <SourceRefLabel refs={q.ref} />
            {q.objective && <span>· {q.objective}</span>}
            {q.ref.section && TOPIC_BY_ID[q.topicId] && <Link to={`/qa/topic/${q.topicId}`} className="text-emerald-700 hover:underline">{t('qaStudy.run.openChapter')}</Link>}
          </div>
        </div>
      )}
    </div>
  );
}

function TermLabel({ term, assist, help, nameFirst = false }: { term: QaTerm | undefined; assist: Assist; help: boolean; nameFirst?: boolean }) {
  const { lang } = useI18n();
  if (!term) return null;
  const name = localName(term, lang);
  const en = <span lang="en" className="font-medium">{term.term}{term.abbreviation && <span className="font-normal text-muted"> ({term.abbreviation})</span>}</span>;
  if (nameFirst) return <span lang={lang === 'zh' ? 'zh-CN' : 'vi'}>{name ?? term.term}</span>;
  return (
    <span>
      {en}
      {name && helpVisible(assist, help) && <span className="block text-xs text-muted" lang={lang === 'zh' ? 'zh-CN' : 'vi'}>{name}</span>}
    </span>
  );
}

function SourceDefinition({ term }: { term: QaTerm }) {
  return (
    <blockquote className="rounded-xl border-l-4 border-emerald-300 bg-emerald-50/40 p-3">
      <p lang="en" className="text-sm leading-relaxed">{term.definition.text}</p>
      <div className="mt-1.5 flex flex-wrap items-center gap-2"><ProvenanceTag kind="source" /><SourceRefLabel refs={term.definition.ref} /></div>
    </blockquote>
  );
}

function TermChoiceView({ item, order, response, revealed, assist, help, onRespond }: ViewProps & { item: Exclude<QaItem, { kind: 'question' } | { kind: 'match' }> }) {
  const { t, lang } = useI18n();
  const term = TERM_BY_ID[item.termId];
  const ck = correctKey(item);
  if (!term) return <p className="text-sm text-muted">{t('qaStudy.run.missing')}</p>;

  let prompt: ReactNode = null;
  let render: (id: string) => ReactNode = (id) => <TermLabel term={TERM_BY_ID[id]} assist={assist} help={help} />;
  let note: ((id: string) => ReactNode) | undefined;
  let after: ReactNode = null;

  switch (item.kind) {
    case 'defToTerm':
      prompt = <><p className="font-medium">{t('qaStudy.item.defToTerm')}</p><SourceDefinition term={term} /></>;
      break;
    case 'termToDef':
      prompt = <><p className="font-medium">{t('qaStudy.item.termToDef')}</p><p lang="en" className="text-xl font-semibold">{term.term}{term.abbreviation && <span className="text-base font-normal text-muted"> ({term.abbreviation})</span>}</p></>;
      render = (id) => <span lang="en">{TERM_BY_ID[id]?.definition.text}</span>;
      note = (id) => <span lang="en">{TERM_BY_ID[id]?.term}</span>;
      after = <div className="flex flex-wrap items-center gap-2"><ProvenanceTag kind="source" /><SourceRefLabel refs={term.definition.ref} /></div>;
      break;
    case 'termToName':
      prompt = <><p className="font-medium">{t(lang === 'zh' ? 'qaStudy.item.termToNameZh' : 'qaStudy.item.termToName')}</p><p lang="en" className="text-xl font-semibold">{term.term}</p></>;
      render = (id) => <TermLabel term={TERM_BY_ID[id]} assist={assist} help={help} nameFirst />;
      note = (id) => <span lang="en">{TERM_BY_ID[id]?.term}</span>;
      after = <div className="flex flex-wrap items-center gap-2"><ProvenanceTag kind="supplementary" /><span className="text-xs text-muted">{t('qaStudy.item.namesNote')}</span></div>;
      break;
    case 'fill':
      prompt = (
        <>
          <p className="font-medium">{t('qaStudy.item.fill')}</p>
          <blockquote className="rounded-xl border-l-4 border-emerald-300 bg-emerald-50/40 p-3">
            <p lang="en" className="text-sm leading-relaxed">{item.sentence}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2"><ProvenanceTag kind="source" /><SourceRefLabel refs={item.ref} /></div>
          </blockquote>
        </>
      );
      break;
    case 'confused': {
      prompt = <><p className="font-medium">{t('qaStudy.item.confused')}</p><SourceDefinition term={term} /></>;
      const c = term.notes?.confusedWith?.find((x) => x.id === item.otherId);
      if (c) after = (
        <div className="rounded-xl bg-stone-50 p-3 text-sm leading-relaxed">
          <div className="mb-1 flex flex-wrap items-center gap-2"><span className="text-xs font-medium uppercase tracking-wide text-muted">{t('qaStudy.item.difference')}</span><ProvenanceTag kind="supplementary" /></div>
          <AssistText text={c.note} assist={assist} help={help} />
        </div>
      );
      break;
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">{prompt}</div>
      <ul className="space-y-2">
        {order.map((id) => (
          <Choice key={id} k={id} correctKey={ck} response={response} revealed={revealed} onPick={onRespond} note={note && id !== ck ? note(id) : undefined}>
            {render(id)}
          </Choice>
        ))}
      </ul>
      {revealed && (
        <div className="space-y-2">
          <Verdict correct={response === ck} answered={response != null} />
          {after}
          <Link to={`/qa/glossary/${term.id}`} className="inline-block text-sm text-emerald-700 hover:underline">{t('qaStudy.run.openTerm', { term: term.term })}</Link>
        </div>
      )}
    </div>
  );
}

const PAIR_COLORS = ['bg-sky-100 text-sky-800', 'bg-amber-100 text-amber-800', 'bg-violet-100 text-violet-800', 'bg-rose-100 text-rose-800', 'bg-teal-100 text-teal-800', 'bg-lime-100 text-lime-800'];

function MatchView({ item, order, response, revealed, assist, help, onRespond }: ViewProps & { item: Extract<QaItem, { kind: 'match' }> }) {
  const { t } = useI18n();
  const [sel, setSel] = useState<string | null>(() => (onRespond ? item.termIds[0] : null));
  const pairs = useMemo(() => (response && typeof response === 'object' ? response : {}), [response]);
  const num = (termId: string) => item.termIds.indexOf(termId);
  const termForDef = (defId: string) => Object.keys(pairs).find((k) => pairs[k] === defId);

  const pickDef = (defId: string) => {
    if (!onRespond || !sel) return;
    const next: Record<string, string> = {};
    for (const [k, v] of Object.entries(pairs)) if (k !== sel && v !== defId) next[k] = v;
    next[sel] = defId;
    onRespond(next);
    setSel(item.termIds.find((id) => !next[id]) ?? null);
  };

  return (
    <div className="space-y-4">
      <p className="font-medium">{t('qaStudy.item.match')}</p>
      <p className="text-xs text-muted">{t('qaStudy.item.matchHelp')}</p>
      <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <ul className="space-y-2" aria-label={t('qaStudy.item.terms')}>
          {item.termIds.map((id, i) => {
            const ok = revealed && pairs[id] === id;
            return (
              <li key={id}>
                <button type="button" disabled={!onRespond} onClick={() => setSel(sel === id ? null : id)} aria-pressed={sel === id}
                  className={cx('flex w-full items-start gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition disabled:cursor-default',
                    sel === id ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-line', revealed ? (ok ? 'bg-emerald-50' : 'bg-rose-50') : 'bg-white hover:bg-emerald-50/40')}>
                  <span className={cx('inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold', PAIR_COLORS[i % PAIR_COLORS.length])}>{i + 1}</span>
                  <span className="min-w-0 flex-1"><TermLabel term={TERM_BY_ID[id]} assist={assist} help={help} /></span>
                  {revealed && <Icon name={ok ? 'check' : 'x'} className={cx('mt-0.5 h-4 w-4 shrink-0', ok ? 'text-emerald-600' : 'text-rose-600')} />}
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="space-y-2" aria-label={t('qaStudy.item.definitions')}>
          {order.map((defId) => {
            const owner = termForDef(defId);
            const n = owner ? num(owner) : -1;
            return (
              <li key={defId}>
                <button type="button" disabled={!onRespond || !sel} onClick={() => pickDef(defId)}
                  className={cx('flex w-full items-start gap-2 rounded-xl border border-line bg-white px-3 py-2.5 text-left text-sm transition disabled:cursor-default', onRespond && sel && 'hover:border-emerald-300 hover:bg-emerald-50/40')}>
                  <span className={cx('inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold', n >= 0 ? PAIR_COLORS[n % PAIR_COLORS.length] : 'bg-stone-100 text-stone-400')}>{n >= 0 ? n + 1 : '?'}</span>
                  <span lang="en" className="min-w-0 flex-1 leading-relaxed">{TERM_BY_ID[defId]?.definition.text}</span>
                </button>
                {revealed && (
                  <div className="mt-1 px-3 text-xs text-muted">
                    {t('qaStudy.item.matchAnswer', { n: num(defId) + 1, term: TERM_BY_ID[defId]?.term ?? '' })} · <SourceRefLabel refs={TERM_BY_ID[defId]?.definition.ref ?? []} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      {revealed && (
        <div className="space-y-2">
          <Verdict correct={gradeItem(item, pairs)} answered={Object.keys(pairs).length > 0} />
          <div className="flex flex-wrap items-center gap-2"><ProvenanceTag kind="source" /><span className="text-xs text-muted">{t('qaStudy.item.matchSource')}</span></div>
        </div>
      )}
    </div>
  );
}
