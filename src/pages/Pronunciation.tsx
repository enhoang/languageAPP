import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCourse, useSpeech, useStudyTimer } from '../state/AppDataContext';
import { allContrastExercises, allToneExercises } from '../lib/generate';
import { shuffle } from '../lib/text';
import type { Contrast, Course, Exercise, PronBlock, SoundRule } from '../types';
import { ExerciseRunner, type RunResult } from '../components/exercises/ExerciseRunner';
import { ResultsView } from '../components/ResultsView';
import { SoundGrid } from '../components/SoundGrid';
import { SpeakPractice } from '../components/SpeakPractice';
import { AudioButton, NoVoiceNotice } from '../components/Audio';
import { Button, Card, PageHeader, SectionTitle, cx } from '../components/ui';
import { Prose } from '../components/Prose';
import { useI18n } from '../i18n/LocaleContext';

type DrillKind = 'both' | 'tones' | 'contrasts';

function Drill({ course }: { course: Course }) {
  const { t } = useI18n();
  const hasTones = course.toneSets.length > 0;
  const hasContrasts = course.contrasts.length > 0;
  const kinds: DrillKind[] = hasTones && hasContrasts ? ['both', 'tones', 'contrasts'] : [];
  const [kind, setKind] = useState<DrillKind>(hasTones && hasContrasts ? 'both' : hasTones ? 'tones' : 'contrasts');
  const [items, setItems] = useState<Exercise[] | null>(null);
  const [results, setResults] = useState<RunResult[] | null>(null);
  if (!hasTones && !hasContrasts) return null;
  const start = () => {
    const tones = hasTones && kind !== 'contrasts' ? allToneExercises(course) : [];
    const contrasts = kind !== 'tones' ? allContrastExercises(course) : [];
    setItems(shuffle([...tones, ...contrasts]).slice(0, 10));
    setResults(null);
  };
  return (
    <Card>
      <div id="drill" className="scroll-mt-20" />
      <SectionTitle>{t('pronunciation.drill.title', { count: 10 })}</SectionTitle>
      {!items ? (
        <div>
          <p className="mb-3 text-sm text-muted">{t('pronunciation.drill.intro')}</p>
          {kinds.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {kinds.map((k) => (
                <button key={k} type="button" onClick={() => setKind(k)} aria-pressed={kind === k}
                  className={cx('rounded-xl border px-3 py-1.5 text-sm', kind === k ? 'border-sky-300 bg-sky-50 text-sky-700' : 'border-line bg-white')}>{t(`pronunciation.drill.kind.${k}`)}</button>
              ))}
            </div>
          )}
          <Button onClick={start}>{t('pronunciation.drill.start')}</Button>
        </div>
      ) : results ? (
        <ResultsView results={results} actions={<><Button onClick={start}>{t('pronunciation.drill.newRound')}</Button>{kinds.length > 0 && <Button variant="secondary" onClick={() => setItems(null)}>{t('pronunciation.drill.changeKind')}</Button>}</>} />
      ) : (
        <ExerciseRunner exercises={items} onComplete={setResults} />
      )}
    </Card>
  );
}

function ToneSets({ course }: { course: Course }) {
  const { speak, hasVoice } = useSpeech();
  const { t, gl, glossLang } = useI18n();
  return (
    <div className="space-y-2">
      {course.toneSets.map((s) => (
        <div key={s.base} className="flex flex-wrap items-center gap-2">
          <button type="button" disabled={!hasVoice} onClick={() => s.items.forEach((it, i) => window.setTimeout(() => speak(it.text), i * 900))}
            className="w-16 rounded-lg bg-peach-50 px-2 py-1 text-sm font-medium text-peach-600 hover:bg-peach-100 disabled:opacity-40" title={t('pronunciation.tones.playAll')} aria-label={`${t('pronunciation.tones.playAll')}: ${s.base}`}>{s.base} ▶</button>
          {s.items.map((it) => (
            <button key={it.text} type="button" disabled={!hasVoice} onClick={() => speak(it.text)} className="rounded-lg border border-line bg-white px-3 py-1 hover:border-sky-300 disabled:opacity-60">
              <span className={course.fontClass} lang={course.speechLang}>{it.text}</span> <span className="text-sky-600">{it.pron}</span> <span className="text-xs text-muted" lang={glossLang}>{gl(it)}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

function Contrasts({ course, contrasts }: { course: Course; contrasts: Contrast[] }) {
  const { tr, gl, glossLang } = useI18n();
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {contrasts.map((c) => (
        <div key={c.title.vi} className="rounded-xl border border-line bg-white p-4">
          <div className="font-semibold">{tr(c.title)}</div>
          <p className="mb-3 text-sm text-muted"><Prose text={c.note} /></p>
          <div className="flex flex-wrap gap-2">
            {c.items.map((it) => (
              <div key={it.text} className="flex items-center gap-2 rounded-xl border border-line px-3 py-2">
                <span className={cx(course.fontClass, 'text-2xl')} lang={course.speechLang}>{it.text}</span>
                <span><span className="block text-sky-600">{it.pron}</span><span className="block text-xs text-muted" lang={glossLang}>{gl(it)}</span></span>
                <AudioButton text={it.text} size="sm" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Rules({ course, rules }: { course: Course; rules: SoundRule[] }) {
  const { t, tr, gl, glossLang } = useI18n();
  return (
    <div className="space-y-5">
      {rules.map((r) => (
        <div key={r.title.vi}>
          <h3 className="mb-1 font-semibold">{tr(r.title)}</h3>
          <p className="mb-3 text-ink"><Prose text={r.body} /></p>
          <div className="space-y-2">
            {r.examples.map((e) => (
              <div key={e.text} className="flex flex-wrap items-center gap-3 rounded-xl bg-cream px-3 py-2">
                <span className={cx(course.fontClass, 'text-2xl')} lang={course.speechLang}>{e.text}</span>
                <span className="text-sm">{t('pronunciation.rules.written')} <b className={cx(course.fontClass, 'text-sky-600')}>{e.written}</b></span>
                <span className="text-sm">{t('pronunciation.rules.spoken')} <b className={cx(course.fontClass, 'text-peach-600')}>{e.spoken}</b></span>
                <span className="text-sm text-muted" lang={glossLang}>{gl(e)}</span>
                <AudioButton text={e.text} size="sm" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Block({ course, b }: { course: Course; b: PronBlock }) {
  const { tr } = useI18n();
  switch (b.kind) {
    case 'sounds':
      return (
        <Card>
          <SectionTitle>{tr(b.group.title)}</SectionTitle>
          {b.group.intro && <p className="mb-3 text-sm text-muted"><Prose text={b.group.intro} /></p>}
          <SoundGrid items={b.group.items} />
        </Card>
      );
    case 'toneSets':
      return course.toneSets.length > 0 ? <Card><SectionTitle>{tr(b.title)}</SectionTitle><ToneSets course={course} /></Card> : null;
    case 'contrasts':
      return (
        <Card>
          <SectionTitle>{tr(b.title)}</SectionTitle>
          {b.intro && <p className="mb-3 text-sm text-muted"><Prose text={b.intro} /></p>}
          <Contrasts course={course} contrasts={b.contrasts} />
        </Card>
      );
    case 'rules':
      return <Card><SectionTitle>{tr(b.title)}</SectionTitle><Rules course={course} rules={b.rules} /></Card>;
    case 'text':
      return (
        <Card>
          <SectionTitle>{tr(b.title)}</SectionTitle>
          <div className="space-y-2 text-ink">{b.body.map((p, i) => <p key={i}><Prose text={p} /></p>)}</div>
        </Card>
      );
    case 'speak':
      return (
        <Card>
          <SectionTitle>{tr(b.title)}</SectionTitle>
          {b.intro && <p className="mb-3 text-sm text-muted"><Prose text={b.intro} /></p>}
          <SpeakPractice items={b.items} />
        </Card>
      );
  }
}

export default function Pronunciation() {
  useStudyTimer();
  const { course } = useCourse();
  const { t, tr } = useI18n();
  const tabs = course.pronunciation.tabs;
  const [tabId, setTabId] = useState<string>(tabs[0]?.id ?? '');
  const tab = useMemo(() => tabs.find((x) => x.id === tabId) ?? tabs[0], [tabs, tabId]);
  const loc = useLocation();
  useEffect(() => {
    if (loc.hash === '#drill') window.setTimeout(() => document.getElementById('drill')?.scrollIntoView({ behavior: 'smooth' }), 50);
  }, [loc.hash]);

  return (
    <div className="space-y-6">
      <PageHeader title={t('pronunciation.title')} subtitle={t('pronunciation.subtitle', { slow: t('common.audio.slow') })} />
      <NoVoiceNotice />
      <p className="text-ink"><Prose text={course.pronunciation.intro} /></p>
      {tabs.length > 1 && (
        <div className="flex gap-1 overflow-x-auto rounded-2xl bg-white p-1.5 ring-1 ring-line" role="tablist" aria-label={t('pronunciation.tabsLabel')}>
          {tabs.map((x) => (
            <button key={x.id} type="button" role="tab" aria-selected={tab?.id === x.id} onClick={() => setTabId(x.id)}
              className={cx('flex-1 whitespace-nowrap rounded-xl px-3 py-2 text-sm transition', tab?.id === x.id ? 'bg-sky-500 font-medium text-white' : 'hover:bg-sky-50')}>{tr(x.title)}</button>
          ))}
        </div>
      )}

      {tab && (
        <div key={`${course.id}-${tab.id}`} className="space-y-4" role="tabpanel">
          {tab.intro && <p className="text-sm text-muted"><Prose text={tab.intro} /></p>}
          {tab.blocks.map((b, i) => <Block key={i} course={course} b={b} />)}
        </div>
      )}

      <Drill key={course.id} course={course} />

      <p className="text-xs text-muted">{t('pronunciation.disclaimer')}</p>
    </div>
  );
}
