import { PwaSettings } from '../pwa/PwaSettings';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { speechLangOf, useAppData, useSpeech } from '../state/AppDataContext';
import { COURSE_IDS, COURSES } from '../courses';
import { exportBackup, parseBackup, type BackupError } from '../lib/storage';
import { recognitionSupported } from '../lib/recognition';
import { dayKey } from '../lib/dates';
import { MASTERY_STATUSES } from '../lib/srs';
import type { AppData, Course, CourseId } from '../types';
import { Button, Card, PageHeader, SectionTitle, cx } from '../components/ui';
import { LanguageSettings } from '../components/LanguageSwitcher';
import { useI18n } from '../i18n/LocaleContext';
import { useInlineCourseName } from '../components/CourseSwitcher';

type ImportMsg = { ok: true } | { ok: false; error: BackupError; version?: number };

/** Test sentence spoken in each course language. */
const SAMPLE: Record<CourseId, string> = {
  zh: '你好！我是你的汉语老师。',
  en: 'Hello! I am your English teacher.',
  ko: '안녕하세요! 저는 한국어 선생님이에요.',
};

/** Names of the voices / language packs as the operating systems show them (not translated). */
const INSTALL: Record<CourseId, { windows: string; macos: string; chrome: string }> = {
  zh: { windows: '中文(简体)', macos: 'Chinese (China mainland)', chrome: 'Google 普通话（中国大陆）' },
  en: { windows: 'English (United States) / English (United Kingdom)', macos: 'English (US) / English (UK)', chrome: 'Google US English / Google UK English' },
  ko: { windows: '한국어', macos: 'Korean', chrome: 'Google 한국의' },
};

/** Voice choice and install help for one course. */
function CourseVoice({ course }: { course: Course }) {
  const { data, updateSettings } = useAppData();
  const { voices, speak, lang } = useSpeech(course);
  const { t, tr } = useI18n();
  const name = useInlineCourseName()(course);
  const chosen = data.settings.voices[course.id] ?? '';
  const ins = INSTALL[course.id];
  return (
    <div className="rounded-xl border border-line p-4">
      <div className="mb-2 flex flex-wrap items-baseline gap-2">
        <span lang={course.speechLang} className={cx('text-lg font-semibold text-sky-700', course.fontClass)}>{course.endonym}</span>
        <span className="font-medium">{tr(course.name)}</span>
        <span className="text-xs text-muted">{lang}</span>
      </div>
      {voices.length === 0 ? (
        <p className="text-sm text-amber-800">{t('settings.audio.noVoice', { name, tag: lang })}</p>
      ) : (
        <div className="flex flex-wrap items-end gap-2">
          <label className="block min-w-0 flex-1 text-sm">
            <span className="mb-1 block font-medium">{t('settings.audio.voice', { count: voices.length, name })}</span>
            <select value={chosen} onChange={(e) => updateSettings({ voices: { ...data.settings.voices, [course.id]: e.target.value || null } })}
              className="w-full max-w-md rounded-xl border border-line bg-white px-3 py-2">
              <option value="">{t('settings.audio.auto', { name: voices[0].name })}</option>
              {voices.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{v.name} · {v.lang}</option>)}
            </select>
          </label>
          <Button variant="secondary" onClick={() => speak(SAMPLE[course.id])} aria-label={t('settings.audio.testAria', { name })}>
            {t('settings.audio.test')} <span lang={course.speechLang} className={cx('hidden sm:inline', course.fontClass)}>{SAMPLE[course.id]}</span>
          </Button>
        </div>
      )}
      <details className="mt-3 text-sm" open={voices.length === 0}>
        <summary className="cursor-pointer text-sky-700">{t('settings.audio.installTitle', { name })}</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
          <li>{t('settings.audio.install.windows', { pack: ins.windows })}</li>
          <li>{t('settings.audio.install.macos', { pack: ins.macos })}</li>
          <li>{t('settings.audio.install.android', { name })}</li>
          <li>{t('settings.audio.install.ios', { name })}</li>
          <li>{t('settings.audio.install.chrome', { voice: ins.chrome })}</li>
        </ul>
        <p className="mt-1 text-muted">{t('settings.audio.reload')}</p>
      </details>
    </div>
  );
}

export default function Settings() {
  const { data, updateSettings, replaceData, resetAll } = useAppData();
  const { supported } = useSpeech();
  const { t, tr, locale } = useI18n();
  const fileRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<AppData | null>(null);
  const [importMsg, setImportMsg] = useState<ImportMsg | null>(null);
  const [resetOpen, setResetOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const s = data.settings;
  const current = data.currentCourse ? COURSES[data.currentCourse] : null;
  const recognition = recognitionSupported();
  /** Word typed to confirm a reset, in the current interface language (XOA / DELETE / 删除). */
  const confirmWord = t('settings.reset.confirmWord');
  const confirmOk = confirmText.trim().normalize('NFC').toUpperCase() === confirmWord.normalize('NFC').toUpperCase();
  const pronNames = COURSE_IDS.map((id) => tr(COURSES[id].pronName)).join(' / ');

  const doExport = () => {
    const blob = new Blob([exportBackup(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `language-companion-backup-${dayKey()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    const r = parseBackup(await f.text());
    if (r.ok) {
      setPending(r.data);
      setImportMsg(null);
    } else {
      setPending(null);
      setImportMsg({ ok: false, error: r.error, version: r.version });
    }
    if (fileRef.current) fileRef.current.value = '';
  };

  const pendingCourses = pending ? COURSE_IDS.map((id) => pending.courses[id]) : [];

  return (
    <div className="space-y-6">
      <PageHeader title={t('common.nav.settings')} />

      <Card>
        <SectionTitle>{t('settings.language.title')}</SectionTitle>
        <LanguageSettings />
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl bg-sky-50/60 px-3 py-2 text-sm">
          <span className="font-medium">{t('layout.studying')}:</span>
          {current
            ? <span><span lang={current.speechLang} className={cx('font-semibold', current.fontClass)}>{current.endonym}</span> · {tr(current.name)}</span>
            : <span className="text-muted">{t('settings.language.noCourse')}</span>}
          <Link to="/courses" className="text-sky-600 hover:underline">{t('settings.language.changeCourse')}</Link>
        </div>
        <p className="mt-3 text-sm text-muted">{t('settings.language.note')}</p>
      </Card>

      <PwaSettings />

      <Card>
        <SectionTitle>{t('settings.session.title')}</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {([10, 20, 30] as const).map((m) => (
            <button key={m} type="button" onClick={() => updateSettings({ sessionMinutes: m })} aria-pressed={s.sessionMinutes === m}
              className={cx('rounded-xl border px-4 py-2 text-sm', s.sessionMinutes === m ? 'border-sky-300 bg-sky-50 font-medium text-sky-700' : 'border-line bg-white')}>
              {t('common.minutes', { count: m })}{m === 20 && ` ${t('settings.session.recommended')}`}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-muted">{t('settings.session.hint')}</p>
        <label className="mt-4 flex items-start gap-3">
          <input type="checkbox" checked={s.showPron} onChange={(e) => updateSettings({ showPron: e.target.checked })} className="mt-0.5 h-5 w-5 shrink-0 accent-sky-500" />
          <span>
            {t('settings.session.showPron', { names: current ? tr(current.pronName) : pronNames })}{' '}
            <span className="text-sm text-muted">{t('settings.session.showPronHint', { names: pronNames })}</span>
          </span>
        </label>
      </Card>

      <Card>
        <SectionTitle>{t('settings.accent.title')}</SectionTitle>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={t('settings.accent.title')}>
          {(['en-US', 'en-GB'] as const).map((a) => (
            <button key={a} type="button" role="radio" aria-checked={s.englishAccent === a} onClick={() => updateSettings({ englishAccent: a })}
              className={cx('rounded-xl border-2 px-4 py-2 text-sm font-medium transition', s.englishAccent === a ? 'border-sky-400 bg-sky-50 text-sky-700' : 'border-line bg-white hover:border-sky-200')}>
              {t(a === 'en-US' ? 'settings.accent.us' : 'settings.accent.uk')}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-muted">{t('settings.accent.hint')}</p>
      </Card>

      <Card>
        <SectionTitle>{t('settings.audio.title')}</SectionTitle>
        {!supported ? (
          <p className="text-sm text-rose-700">{t('settings.audio.unsupported')}</p>
        ) : (
          <div className="space-y-4">
            <label className="block text-sm">
              <span className="mb-1 block font-medium">{t('settings.audio.rate', { rate: s.speechRate.toFixed(2) })} <span className="font-normal text-muted">{t('settings.audio.rateHint', { slow: t('common.audio.slow'), pct: 60 })}</span></span>
              <input type="range" min={0.5} max={1.2} step={0.05} value={s.speechRate} onChange={(e) => updateSettings({ speechRate: Number(e.target.value) })} className="w-full max-w-md accent-sky-500" />
            </label>
            <p className="text-sm text-muted">{t('settings.audio.perCourse')}</p>
            {/* The active course first. */}
            {[...COURSE_IDS].sort((a, b) => Number(b === data.currentCourse) - Number(a === data.currentCourse)).map((id) => (
              <CourseVoice key={`${id}-${speechLangOf(COURSES[id], s)}`} course={COURSES[id]} />
            ))}
          </div>
        )}
      </Card>

      <Card>
        <SectionTitle>{t('settings.recognition.title')}</SectionTitle>
        <p className={cx('text-sm font-medium', recognition ? 'text-emerald-700' : 'text-amber-800')}>
          {recognition ? t('settings.recognition.available') : t('settings.recognition.unavailable')}
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
          <li>{t('settings.recognition.optional')}</li>
          <li>{t('settings.recognition.approximate')}</li>
          <li>{t('settings.recognition.selfCheck')}</li>
          <li>{t('settings.recognition.privacy')}</li>
        </ul>
      </Card>

      <div id="settings-backup" className="scroll-mt-6">
      <Card>
        <SectionTitle>{t('settings.backup.title')}</SectionTitle>
        <p className="mb-3 text-sm text-muted">{t('settings.backup.description')}</p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={doExport}>{t('settings.backup.export')}</Button>
          <Button variant="secondary" onClick={() => fileRef.current?.click()}>{t('settings.backup.importFile')}</Button>
          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
        </div>
        {pending && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
            <p className="font-medium text-amber-800">{t('settings.backup.confirmReplace')}</p>
            <p className="mt-1 text-muted">
              {t('settings.backup.summary', {
                lessons: t('settings.backup.lessons', { count: pendingCourses.reduce((n, cp) => n + Object.values(cp.lessons).filter((l) => l.status === 'completed').length, 0) }),
                words: t('settings.backup.words', { count: pendingCourses.reduce((n, cp) => n + Object.keys(cp.words).length, 0) }),
                quizzes: t('settings.backup.quizzes', { count: pendingCourses.reduce((n, cp) => n + cp.quizzes.length, 0) }),
                date: new Date(pending.updatedAt).toLocaleString(locale),
              })}
            </p>
            <div className="mt-3 flex gap-2">
              <Button onClick={() => { replaceData(pending); setPending(null); setImportMsg({ ok: true }); }}>{t('settings.backup.restore')}</Button>
              <Button variant="ghost" onClick={() => setPending(null)}>{t('common.actions.cancel')}</Button>
            </div>
          </div>
        )}
        {importMsg && <p className={cx('mt-3 text-sm', importMsg.ok ? 'text-emerald-700' : 'text-rose-700')}>{importMsg.ok ? t('settings.backup.restored') : t(`common.backup.${importMsg.error}`, { version: importMsg.version })}</p>}
      </Card>
      </div>

      <Card>
        <SectionTitle>{t('settings.srs.title')}</SectionTitle>
        <ul className="list-disc space-y-1 pl-5 text-sm text-ink">
          <li>{t('settings.srs.newWords')}</li>
          <li>{t('settings.srs.correct')}</li>
          <li>{t('settings.srs.wrong')}</li>
          <li>{t('settings.srs.perCourse')}</li>
          <li>
            {t('settings.srs.levels')}{' '}
            {MASTERY_STATUSES.map((st, i) => (
              <span key={st}>{i > 0 && ' · '}<b>{t(`common.status.${st}`)}</b> {t(`settings.srs.level.${st}`)}</span>
            ))}
          </li>
        </ul>
      </Card>

      <Card className="border-rose-200">
        <SectionTitle>{t('settings.reset.title')}</SectionTitle>
        {!resetOpen ? (
          <Button variant="danger" onClick={() => setResetOpen(true)}>{t('settings.reset.open')}</Button>
        ) : (
          <div className="space-y-3 text-sm">
            <p><Trans i18nKey="settings.reset.warning" values={{ word: confirmWord }} components={{ b: <b /> }} /></p>
            <input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} className="max-w-full rounded-xl border border-line px-3 py-2" aria-label={t('settings.reset.confirmAria', { word: confirmWord })} />
            <div className="flex gap-2">
              <Button variant="danger" disabled={!confirmOk} onClick={() => { resetAll(); setResetOpen(false); setConfirmText(''); }}>{t('settings.reset.confirm')}</Button>
              <Button variant="ghost" onClick={() => { setResetOpen(false); setConfirmText(''); }}>{t('common.actions.cancel')}</Button>
            </div>
          </div>
        )}
      </Card>
      <p className="text-xs text-muted">{t('settings.footer', { version: data.schemaVersion, date: new Date(data.createdAt).toLocaleString(locale) })}</p>
    </div>
  );
}
