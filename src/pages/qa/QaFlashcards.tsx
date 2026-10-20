import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { TERMS, TERM_BY_ID, TOPICS } from '../../qa/content';
import { dueTerms } from '../../qa/store';
import { useQa } from '../../qa/QaContext';
import { shuffle } from '../../lib/text';
import { useI18n } from '../../i18n/LocaleContext';
import { Badge, Button, Card, PageHeader, ProgressBar, Stat } from '../../components/ui';
import { Icon } from '../../components/Icon';
import { ProvenanceTag } from '../../components/qa/Provenance';
import { AssistHelpButton, AssistText, AssistToggle, helpVisible, useAssist } from '../../components/qa/AssistToggle';
import { TermDefinition, TermHeading, TermNameLine, useChapterLabel } from '../../components/qa/TermCard';

const SESSION = 20;
const SELECT = 'min-w-0 max-w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-emerald-300';

type Mode = 'srs' | 'random';

/** /qa/flashcards — English term on the front; name, definition and example on the back. */
export default function QaFlashcards() {
  const { t } = useI18n();
  const { progress } = useQa();
  const chapter = useChapterLabel();
  const [mode, setMode] = useState<Mode>('srs');
  const [topic, setTopic] = useState('');
  const [deck, setDeckState] = useState<string[] | null>(null);
  const [run, setRun] = useState(0);
  const setDeck = (d: string[] | null) => { setDeckState(d); setRun((n) => n + 1); };

  const srsDeck = useMemo(() => {
    const due = dueTerms(progress).filter((id) => TERM_BY_ID[id]);
    const fresh = TERMS.filter((x) => x.keyword && !progress.terms[x.id]).map((x) => x.id);
    return { due, fresh, deck: [...due, ...fresh.filter((id) => !due.includes(id))].slice(0, SESSION) };
  }, [progress]);

  const randomPool = useMemo(() => TERMS.filter((x) => (topic ? x.topicIds.includes(topic) : x.keyword)).map((x) => x.id), [topic]);

  if (deck) return <CardSession key={run} deck={deck} onExit={() => setDeck(null)} onAgain={(ids) => setDeck(shuffle(ids))} />;

  return (
    <div>
      <PageHeader title={t('qaStudy.cards.title')} subtitle={t('qaStudy.cards.subtitle')} />
      <AssistToggle className="mb-6" />
      <div className="grid gap-3 md:grid-cols-2">
        <Card className={mode === 'srs' ? 'ring-2 ring-emerald-300' : ''}>
          <label className="flex cursor-pointer items-start gap-3">
            <input type="radio" name="mode" checked={mode === 'srs'} onChange={() => setMode('srs')} className="mt-1 accent-emerald-600" />
            <span>
              <span className="font-medium">{t('qaStudy.cards.srs')}</span>
              <span className="mt-1 block text-sm text-muted">{t('qaStudy.cards.srsHint', { due: srsDeck.due.length, fresh: srsDeck.fresh.length })}</span>
            </span>
          </label>
        </Card>
        <Card className={mode === 'random' ? 'ring-2 ring-emerald-300' : ''}>
          <label className="flex cursor-pointer items-start gap-3">
            <input type="radio" name="mode" checked={mode === 'random'} onChange={() => setMode('random')} className="mt-1 accent-emerald-600" />
            <span>
              <span className="font-medium">{t('qaStudy.cards.random')}</span>
              <span className="mt-1 block text-sm text-muted">{t('qaStudy.cards.randomHint')}</span>
            </span>
          </label>
          {mode === 'random' && (
            <select className={`${SELECT} mt-3 w-full`} value={topic} onChange={(e) => setTopic(e.target.value)} aria-label={t('qaStudy.glossary.chapter')}>
              <option value="">{t('qaStudy.cards.allKeywords')}</option>
              {TOPICS.map((x) => <option key={x.id} value={x.id}>{chapter(x.id)}</option>)}
            </select>
          )}
        </Card>
      </div>
      <div className="mt-5">
        {mode === 'srs' ? (
          <Button className="bg-emerald-600 hover:bg-emerald-700" disabled={!srsDeck.deck.length} onClick={() => setDeck(srsDeck.deck)}>
            {t('qaStudy.cards.start', { count: srsDeck.deck.length })}
          </Button>
        ) : (
          <Button className="bg-emerald-600 hover:bg-emerald-700" disabled={!randomPool.length} onClick={() => setDeck(shuffle(randomPool).slice(0, SESSION))}>
            {t('qaStudy.cards.start', { count: Math.min(SESSION, randomPool.length) })}
          </Button>
        )}
        {mode === 'srs' && !srsDeck.deck.length && <p className="mt-2 text-sm text-muted">{t('qaStudy.cards.nothingDue')}</p>}
      </div>
    </div>
  );
}

function CardSession({ deck, onExit, onAgain }: { deck: string[]; onExit: () => void; onAgain: (ids: string[]) => void }) {
  const { t } = useI18n();
  const { record } = useQa();
  const assist = useAssist();
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [help, setHelp] = useState(false);
  const [known, setKnown] = useState<Record<string, boolean>>({});

  if (i >= deck.length) {
    const missed = deck.filter((id) => !known[id]);
    return (
      <Card>
        <h2 className="text-lg font-semibold">{t('qaStudy.cards.summary')}</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Stat label={t('qaStudy.cards.knew')} value={deck.length - missed.length} />
          <Stat label={t('qaStudy.cards.didnt')} value={missed.length} />
        </div>
        {missed.length > 0 && (
          <>
            <h3 className="mt-5 mb-2 font-medium">{t('qaStudy.cards.toReview')}</h3>
            <ul className="flex flex-wrap gap-2">
              {missed.map((id) => <li key={id}><Link to={`/qa/glossary/${id}`} lang="en" className="rounded-full bg-rose-50 px-2.5 py-1 text-sm text-rose-800 ring-1 ring-rose-200 hover:bg-rose-100">{TERM_BY_ID[id]?.term}</Link></li>)}
            </ul>
          </>
        )}
        <div className="mt-5 flex flex-wrap gap-2">
          {missed.length > 0 && <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => onAgain(missed)}>{t('qaStudy.cards.againMissed')}</Button>}
          <Button variant="secondary" onClick={onExit}>{t('qaStudy.results.back')}</Button>
        </div>
      </Card>
    );
  }

  const term = TERM_BY_ID[deck[i]];
  const grade = (ok: boolean) => {
    record(`t:${term.id}:card`, ok, [term.id]);
    setKnown((k) => ({ ...k, [term.id]: ok }));
    setI(i + 1);
    setFlipped(false);
    setHelp(false);
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm text-muted">{t('qaStudy.cards.cardOf', { n: i + 1, total: deck.length })}</span>
        <div className="flex flex-wrap items-center gap-2">
          {flipped && <AssistHelpButton assist={assist} help={help} onToggle={() => setHelp((h) => !h)} />}
          <Button variant="ghost" className="px-2.5 py-1.5 text-xs" onClick={onExit}>{t('qaStudy.run.quit')}</Button>
        </div>
      </div>
      <ProgressBar value={(i / deck.length) * 100} className="mb-4" color="bg-emerald-500" />
      <Card className="min-h-64">
        <div className="flex flex-col items-center py-4 text-center">
          <TermHeading term={term} size="xl" showKeyword={false} />
          {term.keyword && <div className="mt-2"><Badge tone="green">{t('qaStudy.term.keyword')}</Badge></div>}
          {!flipped && <Button className="mt-8 bg-emerald-600 hover:bg-emerald-700" onClick={() => setFlipped(true)}><Icon name="refresh" className="h-4 w-4" /> {t('qaStudy.cards.flip')}</Button>}
        </div>
        {flipped && (
          <div className="space-y-3 border-t border-line pt-4">
            {helpVisible(assist, help) && <div className="text-center text-lg font-medium"><TermNameLine term={term} /></div>}
            <TermDefinition term={term} showReference={false} />
            {term.notes?.example && (
              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2"><span className="text-xs font-medium uppercase tracking-wide text-muted">{t('qaStudy.term.example')}</span><ProvenanceTag kind="supplementary" /></div>
                <p className="text-sm leading-relaxed text-stone-700"><AssistText text={term.notes.example} assist={assist} help={help} /></p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button variant="coral" onClick={() => grade(false)}><Icon name="x" className="h-4 w-4" /> {t('qaStudy.cards.didnt')}</Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => grade(true)}><Icon name="check" className="h-4 w-4" /> {t('qaStudy.cards.knew')}</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
