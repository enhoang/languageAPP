import { useState } from 'react';
import { weekdayLabel } from '../lib/dates';
import { useI18n } from '../i18n/LocaleContext';
import { cx } from './ui';

/** Single-series bar chart of study minutes for the last 7 days, with a goal line and hover tooltip. */
export function WeeklyChart({ days, goalMinutes }: { days: { day: string; seconds: number; answers: number }[]; goalMinutes: number }) {
  const { t, locale } = useI18n();
  const [hover, setHover] = useState<number | null>(null);
  const minutes = days.map((d) => Math.round(d.seconds / 60));
  const max = Math.max(goalMinutes, ...minutes, 1);
  const H = 120;
  const goalY = H - (goalMinutes / max) * H;
  return (
    <div>
      <div className="relative" style={{ height: H + 24 }}>
        <div className="absolute inset-x-0 border-t border-dashed border-peach-400/70" style={{ top: goalY }} aria-hidden="true">
          <span className="absolute -top-4 right-0 bg-white px-1 text-[10px] text-muted">{t('chart.goal', { count: goalMinutes })}</span>
        </div>
        <div className="absolute inset-x-0 top-0 flex items-end gap-2" style={{ height: H }}>
          {days.map((d, i) => {
            const h = (minutes[i] / max) * H;
            return (
              <div key={d.day} className="relative flex h-full flex-1 items-end justify-center" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)} onBlur={() => setHover(null)} tabIndex={0} aria-label={t('chart.barLabel', { day: d.day, minutes: t('common.minutes', { count: minutes[i] }), answers: t('chart.answers', { count: d.answers }) })}>
                <div className={cx('w-full max-w-7 rounded-t-[4px] transition-colors', hover === i ? 'bg-sky-500' : 'bg-sky-300')} style={{ height: Math.max(h, minutes[i] > 0 ? 3 : 0) }} />
                {minutes[i] === 0 && <div className="absolute bottom-0 h-px w-full max-w-7 bg-stone-200" />}
                {hover === i && (
                  <div className="pointer-events-none absolute bottom-full z-10 mb-1 whitespace-nowrap rounded-lg bg-ink px-2 py-1 text-xs text-white shadow">
                    {t('common.minutes', { count: minutes[i] })} · {t('common.questions', { count: d.answers })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="absolute inset-x-0 bottom-0 flex gap-2 border-t border-stone-200 pt-1">
          {days.map((d, i) => (
            <div key={d.day} className={cx('flex-1 text-center text-xs', i === days.length - 1 ? 'font-semibold text-ink' : 'text-muted')}>{weekdayLabel(d.day, locale)}</div>
          ))}
        </div>
      </div>
      <table className="sr-only">
        <caption>{t('chart.caption')}</caption>
        <thead><tr><th>{t('chart.colDay')}</th><th>{t('chart.colMinutes')}</th><th>{t('chart.colAnswers')}</th></tr></thead>
        <tbody>{days.map((d, i) => <tr key={d.day}><td>{d.day}</td><td>{minutes[i]}</td><td>{d.answers}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
