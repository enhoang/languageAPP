import { useEffect, useRef, useState } from 'react';
import type { ExerciseResponse, ExerciseView, GradeResult, TypeMode } from '../../types';
import { useI18n } from '../../i18n/LocaleContext';
import { PALETTE_MODES } from '../../lib/grading';
import { useAppData, useCourse } from '../../state/AppDataContext';
import { AudioButton } from '../Audio';
import { Icon } from '../Icon';
import { cx } from '../ui';

type Props<K extends ExerciseView['kind']> = {
  view: Extract<ExerciseView, { kind: K }>;
  onChange: (r: ExerciseResponse | null) => void;
  graded: GradeResult | null;
};

export function ChoiceInput({ view, onChange, graded }: Props<'choice'>) {
  const { tr } = useI18n();
  const { course } = useCourse();
  const [value, setValue] = useState<string | null>(null);
  const pick = (o: string) => {
    if (graded) return;
    setValue(o);
    onChange({ kind: 'choice', value: o });
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (graded || (e.target as HTMLElement)?.tagName === 'INPUT') return;
      const n = Number(e.key);
      if (n >= 1 && n <= view.options.length) pick(view.options[n - 1].key);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
  return (
    <div className={cx('grid gap-2', view.options.length > 2 && 'sm:grid-cols-2')} role="radiogroup">
      {view.options.map((o, i) => {
        const isRight = graded && o.key === graded.correctKey;
        const isWrongPick = graded && !graded.correct && o.key === value;
        return (
          <button key={o.key} type="button" role="radio" aria-checked={value === o.key} onClick={() => pick(o.key)} disabled={!!graded}
            className={cx(
              'flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition',
              !graded && value === o.key && 'border-sky-400 bg-sky-50',
              !graded && value !== o.key && 'border-line bg-white hover:border-sky-200',
              isRight && 'border-emerald-400 bg-emerald-50',
              isWrongPick && 'border-rose-400 bg-rose-50',
              graded && !isRight && !isWrongPick && 'border-line bg-white opacity-60',
            )}>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-100 text-xs text-muted">{i + 1}</span>
            <span className={cx(view.targetOptions ? cx(course.fontClass, 'text-2xl') : 'text-base')} lang={view.targetOptions ? course.speechLang : undefined}>{tr(o.text)}</span>
          </button>
        );
      })}
    </div>
  );
}

export function MatchInput({ view, onChange, graded }: Props<'match'>) {
  const { t, gl } = useI18n();
  const { course } = useCourse();
  const { data } = useAppData();
  const [pairs, setPairs] = useState<Record<string, string>>({});
  const [left, setLeft] = useState<string | null>(null);
  const usedRight = new Set(Object.values(pairs));
  const update = (next: Record<string, string>) => {
    setPairs(next);
    onChange(Object.keys(next).length === view.left.length ? { kind: 'match', value: next } : null);
  };
  const clickLeft = (text: string) => {
    if (graded) return;
    if (pairs[text]) {
      const { [text]: _removed, ...rest } = pairs;
      void _removed;
      update(rest);
      setLeft(text);
      return;
    }
    setLeft(text === left ? null : text);
  };
  const clickRight = (key: string) => {
    if (graded || !left) return;
    const next = Object.fromEntries(Object.entries(pairs).filter(([, v]) => v !== key));
    next[left] = key;
    update(next);
    setLeft(null);
  };
  const pairIndex = (text: string) => Object.keys(pairs).indexOf(text);
  const COLORS = ['bg-sky-100 border-sky-300', 'bg-peach-100 border-peach-200', 'bg-violet-100 border-violet-200', 'bg-amber-100 border-amber-200', 'bg-teal-100 border-teal-200', 'bg-pink-100 border-pink-200'];
  return (
    <div>
      <p className="mb-3 text-sm text-muted">{t('exercise.matchHelp')}</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {view.left.map((l) => {
            const pi = pairIndex(l.text);
            const wrong = graded?.wrongKeys?.includes(l.text);
            return (
              <button key={l.text} type="button" onClick={() => clickLeft(l.text)} disabled={!!graded}
                className={cx('w-full rounded-xl border-2 px-3 py-2 text-left transition',
                  graded ? (wrong ? 'border-rose-400 bg-rose-50' : 'border-emerald-400 bg-emerald-50') : pi >= 0 ? COLORS[pi % COLORS.length] : left === l.text ? 'border-sky-400 bg-sky-50' : 'border-line bg-white hover:border-sky-200')}>
                <div className={cx('text-2xl', course.fontClass)} lang={course.speechLang}>{l.text}</div>
                {l.pron && data.settings.showPron && <div className="text-xs text-sky-600">{l.pron}</div>}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {view.right.map((r) => {
            const owner = Object.entries(pairs).find(([, v]) => v === r.key)?.[0];
            const pi = owner ? pairIndex(owner) : -1;
            return (
              <button key={r.key} type="button" onClick={() => clickRight(r.key)} disabled={!!graded || (!left && !usedRight.has(r.key))}
                className={cx('flex min-h-[3.75rem] w-full items-center rounded-xl border-2 px-3 py-2 text-left transition disabled:cursor-default',
                  pi >= 0 ? COLORS[pi % COLORS.length] : 'border-line bg-white', left && !graded && 'hover:border-sky-300')}>
                {gl(r.text)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ArrangeInput({ view, onChange, graded }: Props<'arrange'>) {
  const { t } = useI18n();
  const { course } = useCourse();
  const [picked, setPicked] = useState<number[]>([]);
  const update = (next: number[]) => {
    setPicked(next);
    onChange(next.length === view.tokens.length ? { kind: 'arrange', value: next.map((i) => view.tokens[i]) } : null);
  };
  return (
    <div>
      <div className={cx('flex min-h-16 flex-wrap items-center gap-2 rounded-xl border-2 border-dashed p-3',
        graded ? (graded.correct ? 'border-emerald-300 bg-emerald-50' : 'border-rose-300 bg-rose-50') : 'border-sky-200 bg-sky-50/50')}>
        {picked.length === 0 && <span className="text-sm text-muted">{t('exercise.arrangePlaceholder')}</span>}
        {picked.map((i, k) => (
          <button key={`${i}-${k}`} type="button" disabled={!!graded} onClick={() => update(picked.filter((_, j) => j !== k))}
            className={cx('rounded-lg border border-sky-200 bg-white px-3 py-1.5 text-xl shadow-sm transition hover:bg-rose-50', course.fontClass)} lang={course.speechLang}>
            {view.tokens[i]}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {view.tokens.map((token, i) => (
          <button key={i} type="button" disabled={!!graded || picked.includes(i)} onClick={() => update([...picked, i])}
            className={cx('rounded-lg border border-line bg-white px-3 py-1.5 text-xl transition hover:border-sky-300 disabled:opacity-25', course.fontClass)} lang={course.speechLang}>
            {token}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Input language of each typing mode (pinyin is Latin-script Chinese). */
const INPUT_LANG: Record<TypeMode, (speechLang: string) => string> = {
  pinyin: () => 'zh-Latn',
  hanzi: (l) => l,
  spelling: (l) => l,
  hangul: (l) => l,
};

export function TypeInput({ view, onChange, graded, onSubmit }: Props<'type'> & { onSubmit: () => void }) {
  const { t } = useI18n();
  const { course } = useCourse();
  const [value, setValue] = useState('');
  const [palette, setPalette] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  const update = (v: string) => {
    setValue(v);
    onChange(v.trim() ? { kind: 'type', value: v } : null);
  };
  const mode = view.mode;
  const script = mode === 'hanzi' || mode === 'hangul';
  const paletteMode = mode === 'hanzi' || mode === 'hangul' ? mode : null;
  const listenNext = (mode === 'spelling' || mode === 'hangul') && view.audio;
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <div className="flex items-center gap-2">
        <input ref={ref} value={value} onChange={(e) => update(e.target.value)} disabled={!!graded}
          lang={INPUT_LANG[mode](course.speechLang)} autoCapitalize="off" autoCorrect="off" autoComplete="off" spellCheck={false}
          placeholder={t(`exercise.placeholder.${mode}`)} aria-label={t(`exercise.placeholder.${mode}`)}
          className={cx('min-w-0 flex-1 rounded-xl border-2 bg-white px-4 py-3 text-xl outline-none transition focus:border-sky-400',
            script && cx(course.fontClass, 'text-2xl'),
            graded ? (graded.correct ? 'border-emerald-400 bg-emerald-50' : 'border-rose-400 bg-rose-50') : 'border-line')} />
        {listenNext && <AudioButton text={view.audio!} size="md" showSlow />}
      </div>
      {!graded && <p className="mt-2 text-xs text-muted">{t(`exercise.help.${mode}`)}</p>}
      {paletteMode && PALETTE_MODES.includes(paletteMode) && view.palette && !graded && (
        <div className="mt-2">
          <button type="button" onClick={() => setPalette((p) => !p)} className="text-xs font-medium text-sky-600 underline decoration-dotted">
            {palette ? t('exercise.hidePalette') : t(`exercise.showPalette.${paletteMode}`)}
          </button>
          {palette && (
            <div className="mt-2 flex flex-wrap gap-2">
              {view.palette.map((c) => (
                <button key={c} type="button" onClick={() => update(value + c)} className={cx('h-11 min-w-11 rounded-lg border border-line bg-white px-1 text-xl hover:border-sky-300', course.fontClass)} lang={course.speechLang}>{c}</button>
              ))}
              <button type="button" onClick={() => update([...value].slice(0, -1).join(''))} aria-label={t('exercise.deleteLast')} className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-white text-muted hover:border-rose-300">
                <Icon name="backspace" />
              </button>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
