import { useMemo, useState } from 'react';
import type { ConvLang, SavedPhrase } from '../../conversation/types';
import { dueSaved } from '../../conversation/store';
import { useConv } from '../../conversation/ConvContext';
import { COURSE_IDS, COURSES } from '../../courses';
import { useI18n } from '../../i18n/LocaleContext';
import { AudioButton } from '../../components/Audio';
import { Badge, Button, Card, PageHeader, ProgressBar, SectionTitle, cx } from '../../components/ui';
import { Icon } from '../../components/Icon';
import { ConvNav, PronLine, targetProps, useGloss } from '../../components/conversation/shared';

/** /conversation/review — saved words, phrases and sentences, with spaced-repetition flashcards. */
export default function ConvReview() {
  const { t, tr } = useI18n();
  const { data } = useConv();
  const [lang, setLang] = useState<ConvLang | ''>('');
  const [difficultOnly, setDifficultOnly] = useState(false);
  const [deck, setDeck] = useState<string[] | null>(null);
  const [run, setRun] = useState(0);
  const start = (ids: string[]) => { setDeck(ids); setRun((n) => n + 1); };

  const list = useMemo(() => Object.values(data.saved)
    .filter((p) => (!lang || p.lang === lang) && (!difficultOnly || p.difficult))
    .sort((a, b) => b.savedAt.localeCompare(a.savedAt)), [data.saved, lang, difficultOnly]);
  const due = useMemo(() => {
    const ids = new Set(list.map((p) => p.id));
    return dueSaved(data, lang || undefined).filter((id) => ids.has(id));
  }, [data, lang, list]);

  if (deck) return <Flashcards key={run} deck={deck} onExit={() => setDeck(null)} onAgain={start} />;

  const total = Object.keys(data.saved).length;
  return (
    <div>
      <ConvNav />
      <PageHeader title={t('conv.review.title')} subtitle={t('conv.review.subtitle')} />
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm">
          {t('conv.review.filterLang')}
          <select value={lang} onChange={(e) => setLang(e.target.value as ConvLang | '')} className="rounded-xl border border-line bg-white px-3 py-2 text-sm">
            <option value="">{t('conv.review.all')}</option>
            {COURSE_IDS.map((id) => <option key={id} value={id}>{tr(COURSES[id].name)}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-sky-500" checked={difficultOnly} onChange={(e) => setDifficultOnly(e.target.checked)} />
          {t('conv.review.difficultOnly')}
        </label>
        <span className="text-sm text-muted">{t('conv.review.count', { count: list.length })}</span>
      </div>

      {list.length > 0 && (
        <Card className="mb-5">
          <SectionTitle>{t('conv.review.flashTitle')}</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {due.length > 0 && <Button onClick={() => start(due)}>{t('conv.review.startDue', { count: due.length })}</Button>}
            <Button variant={due.length ? 'secondary' : 'primary'} onClick={() => start(list.map((p) => p.id))}>{t('conv.review.practiceAll', { count: list.length })}</Button>
          </div>
          {due.length === 0 && <p className="mt-2 text-sm text-muted">{t('conv.review.nothingDue')}</p>}
        </Card>
      )}

      {list.length === 0 ? <p className="text-sm text-muted">{total === 0 ? t('conv.review.empty') : t('conv.review.emptyFilter')}</p> : (
        <ul className="space-y-2">{list.map((p) => <PhraseRow key={p.id} p={p} />)}</ul>
      )}
    </div>
  );
}

function PhraseRow({ p }: { p: SavedPhrase }) {
  const { t } = useI18n();
  const { removePhrase, setDifficult } = useConv();
  const { g, gLang } = useGloss(p.lang);
  const tp = targetProps(p.lang);
  return (
    <li className="rounded-2xl border border-line bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span lang={tp.lang} className={cx(tp.className, 'break-words text-xl')}>{p.text}</span>
            <Badge tone="gray">{COURSES[p.lang].endonym}</Badge>
            {p.difficult && <Badge tone="rose">{t('conv.review.difficult')}</Badge>}
          </div>
          <PronLine lang={p.lang} pron={p.pron} />
          <div className="text-sm text-stone-700" lang={gLang}>{g(p.meaning)}</div>
          {p.example && (
            <div className="mt-1 text-sm">
              <span lang={tp.lang} className={tp.className}>{p.example}</span>
              {p.exampleTranslation && <span className="ml-2 text-xs text-muted" lang={gLang}>{g(p.exampleTranslation)}</span>}
            </div>
          )}
        </div>
        <AudioButton text={p.text} size="sm" courseId={p.lang} />
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <Button variant="ghost" className="px-3 py-1.5" aria-pressed={p.difficult} onClick={() => setDifficult(p.id, !p.difficult)}>
          <Icon name="flag" className="h-4 w-4" />{p.difficult ? t('conv.review.unmarkDifficult') : t('conv.review.markDifficult')}
        </Button>
        <Button variant="ghost" className="px-3 py-1.5 text-rose-700" onClick={() => { if (window.confirm(t('conv.review.deleteConfirm'))) removePhrase(p.id); }}>
          <Icon name="x" className="h-4 w-4" />{t('conv.review.delete')}
        </Button>
      </div>
    </li>
  );
}

function Flashcards({ deck, onExit, onAgain }: { deck: string[]; onExit: () => void; onAgain: (ids: string[]) => void }) {
  const { t } = useI18n();
  const { data, reviewPhrase } = useConv();
  // the deck is fixed when the session starts; phrases deleted meanwhile are skipped
  const cards = useMemo(() => deck.map((id) => data.saved[id]).filter((p): p is SavedPhrase => !!p), [deck]); // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});

  if (i >= cards.length) {
    const correct = Object.values(results).filter(Boolean).length;
    const missed = cards.filter((c) => results[c.id] === false).map((c) => c.id);
    return (
      <div>
        <ConvNav />
        <Card className="text-center">
          <h1 className="text-xl font-semibold">{t('conv.review.doneTitle')}</h1>
          <p className="mt-2 text-sm" aria-live="polite">{t('conv.review.doneDetail', { correct, total: cards.length })}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {missed.length > 0 && <Button onClick={() => onAgain(missed)}>{t('conv.review.again')}</Button>}
            <Button variant="secondary" onClick={onExit}>{t('conv.review.back')}</Button>
          </div>
        </Card>
      </div>
    );
  }

  const c = cards[i];
  const answer = (ok: boolean) => {
    reviewPhrase(c.id, ok);
    setResults((r) => ({ ...r, [c.id]: ok }));
    setShown(false);
    setI((n) => n + 1);
  };
  return (
    <div>
      <ConvNav />
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm text-muted">{t('conv.review.progress', { n: i + 1, total: cards.length })}</span>
        <Button variant="ghost" className="px-3 py-1.5" onClick={onExit}>{t('conv.review.exit')}</Button>
      </div>
      <ProgressBar value={(i / cards.length) * 100} className="mb-4" />
      <FlashCard key={c.id} p={c} shown={shown} onReveal={() => setShown(true)} onAnswer={answer} />
    </div>
  );
}

function FlashCard({ p, shown, onReveal, onAnswer }: { p: SavedPhrase; shown: boolean; onReveal: () => void; onAnswer: (ok: boolean) => void }) {
  const { t } = useI18n();
  const { g, gLang } = useGloss(p.lang);
  const tp = targetProps(p.lang);
  return (
    <Card className="text-center">
      <div lang={tp.lang} className={cx(tp.className, 'break-words text-3xl leading-tight')}>{p.text}</div>
      <div className="mt-3 flex justify-center"><AudioButton text={p.text} courseId={p.lang} /></div>
      <div aria-live="polite">
        {shown && (
          <div className="mt-4 space-y-2 border-t border-line pt-4">
            <PronLine lang={p.lang} pron={p.pron} className="flex flex-col items-center" />
            <div className="text-lg" lang={gLang}>{g(p.meaning)}</div>
            {p.example && (
              <div className="text-sm">
                <div lang={tp.lang} className={tp.className}>{p.example}</div>
                {p.exampleTranslation && <div className="text-xs text-muted" lang={gLang}>{g(p.exampleTranslation)}</div>}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {!shown ? <Button onClick={onReveal}>{t('conv.review.reveal')}</Button> : (
          <>
            <Button variant="secondary" className="bg-rose-50 text-rose-700 hover:bg-rose-100" onClick={() => onAnswer(false)}>{t('conv.review.forgot')}</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => onAnswer(true)}><Icon name="check" className="h-4 w-4" />{t('conv.review.remember')}</Button>
          </>
        )}
      </div>
    </Card>
  );
}
