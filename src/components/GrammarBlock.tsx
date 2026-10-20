import type { GrammarPoint } from '../types';
import { useI18n } from '../i18n/LocaleContext';
import { useCourse } from '../state/AppDataContext';
import { TargetText } from './TargetText';
import { Prose } from './Prose';
import { Icon } from './Icon';
import { cx } from './ui';

const ROLE_COLORS = ['bg-sky-100 text-sky-800', 'bg-peach-100 text-peach-600', 'bg-violet-100 text-violet-800', 'bg-amber-100 text-amber-800', 'bg-teal-100 text-teal-800'];

/** Pattern, meaning, visual sentence breakdown, examples and common mistakes. */
export function GrammarBlock({ g }: { g: GrammarPoint }) {
  const { t, tr } = useI18n();
  const { course } = useCourse();
  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-sky-50 px-4 py-3">
        <div className="text-xs font-medium uppercase tracking-wide text-sky-600">{t('grammar.block.pattern')}</div>
        <div className={cx('mt-1 text-lg font-medium text-ink', course.fontClass)}>{tr(g.pattern)}</div>
      </div>
      <ul className="list-disc space-y-1 pl-5 text-ink">
        {g.meaning.map((m) => <li key={m.vi}><Prose text={m} /></li>)}
      </ul>
      <div>
        <div className="mb-2 text-sm font-medium text-muted">{t('grammar.block.breakdown')}</div>
        <div className="space-y-2">
          {g.breakdown.map((row, i) => (
            <div key={i} className="flex flex-wrap gap-1.5">
              {row.map((p, j) => (
                <div key={j} className={`rounded-lg px-3 py-1.5 text-center ${ROLE_COLORS[j % ROLE_COLORS.length]}`}>
                  <div className={cx(course.fontClass, 'text-xl')} lang={course.speechLang}>{p.text}</div>
                  <div className="text-[11px]">{tr(p.role)}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-2 text-sm font-medium text-muted">{t('grammar.block.examples')}</div>
        <div className="space-y-2">
          {g.examples.map((e) => (
            <div key={e.text} className="rounded-xl border border-line bg-white px-4 py-2"><TargetText text={e.text} pron={e.pron} meaning={e} size="sm" /></div>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-2 text-sm font-medium text-muted">{t('grammar.block.mistakes')}</div>
        <div className="space-y-2">
          {g.mistakes.map((m) => (
            <div key={m.wrong} className="rounded-xl border border-line bg-white px-4 py-3 text-sm">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="inline-flex items-center gap-1 text-rose-600">
                  <Icon name="x" className="h-4 w-4" />
                  <span className="sr-only">{t('grammar.block.wrong')}</span>
                  <span className={cx(course.fontClass, 'text-base line-through')} lang={course.speechLang}>{m.wrong}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-700">
                  <Icon name="check" className="h-4 w-4" />
                  <span className="sr-only">{t('grammar.block.right')}</span>
                  <span className={cx(course.fontClass, 'text-base')} lang={course.speechLang}>{m.right}</span>
                </span>
              </div>
              <div className="mt-1 text-muted"><Prose text={m.why} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
