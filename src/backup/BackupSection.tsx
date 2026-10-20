import { useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../i18n/LocaleContext';
import { Button, Card, SectionTitle, cx } from '../components/ui';
import { Icon } from '../components/Icon';
import { COURSES } from '../courses';
import { LANG_NAME } from '../i18n/langs';
import * as B from './backup';

const LAST_BACKUP_KEY = 'clc:last-backup';
/** set just before the reload that follows a restore, so the page can confirm it afterwards */
const RESTORED_FLAG = 'clc:restored';

const safeGet = (k: string, s: Storage | undefined = globalThis.localStorage) => {
  try {
    return s?.getItem(k) ?? null;
  } catch {
    return null;
  }
};
const safeSet = (k: string, v: string, s: Storage | undefined = globalThis.localStorage) => {
  try {
    s?.setItem(k, v);
  } catch {
    /* not critical */
  }
};

function download(name: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const fmtBytes = (n: number, locale: string) =>
  n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(n / 1024)} KB` : `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(n / 1024 / 1024)} MB`;

type Tab = 'create' | 'restore' | 'info';

/** Settings → Backup & Restore: one backup of everything (courses, ISTQB, conversations, preferences). */
export function BackupSection() {
  const { t } = useI18n();
  const [tab, setTab] = useState<Tab>('create');
  const [restored, setRestored] = useState(() => safeGet(RESTORED_FLAG, globalThis.sessionStorage) !== null);
  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.removeItem(RESTORED_FLAG);
    } catch {
      /* ignore */
    }
    document.getElementById('settings-backup')?.scrollIntoView();
  }, [restored]);
  return (
    <div id="settings-backup" className="scroll-mt-6">
      <Card>
        <SectionTitle>{t('backup.title')}</SectionTitle>
        <p className="text-sm text-muted">{t('backup.intro')}</p>
        {restored && (
          <p role="status" className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            <Icon name="check" className="h-4 w-4" /> {t('backup.restore.done')}
            <button type="button" className="ml-auto text-xs underline" onClick={() => setRestored(false)}>×</button>
          </p>
        )}
        <div role="tablist" className="mt-4 flex gap-1 rounded-xl bg-stone-100 p-1 text-sm">
          {(['create', 'restore', 'info'] as Tab[]).map((id) => (
            <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
              className={cx('flex-1 rounded-lg px-2 py-2 font-medium transition', tab === id ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink')}>
              {t(`backup.tabs.${id}`)}
            </button>
          ))}
        </div>
        <div className="mt-4">
          {tab === 'create' && <CreatePanel />}
          {tab === 'restore' && <RestorePanel />}
          {tab === 'info' && <InfoPanel />}
        </div>
      </Card>
    </div>
  );
}

// ---------- shared ----------

function SummaryList({ summary }: { summary: B.Summary }) {
  const { t, tr } = useI18n();
  return (
    <ul className="space-y-1 text-sm">
      {summary.courses?.map((c) => (
        <li key={c.course}>
          {t('backup.summary.course', {
            name: tr(COURSES[c.course].name),
            lessons: t('backup.summary.lessons', { count: c.lessonsCompleted }),
            words: t('backup.summary.words', { count: c.words }),
            quizzes: t('backup.summary.quizzes', { count: c.quizzes }),
          })}
        </li>
      ))}
      {summary.qa && <li>ISTQB: {t('backup.summary.qa', { topics: summary.qa.topicsCompleted, terms: summary.qa.terms, attempts: summary.qa.attempts })}</li>}
      {summary.conversation && <li>{t('backup.sections.conversation')}: {t('backup.summary.conversation', summary.conversation)}</li>}
      {summary.preferences && <li>{t('backup.summary.preferences', { lang: LANG_NAME[summary.preferences.lang], support: LANG_NAME[summary.preferences.supportLang] })}</li>}
    </ul>
  );
}

function SectionChoices({ available, chosen, setChosen }: { available: B.SectionId[]; chosen: B.SectionId[]; setChosen: (s: B.SectionId[]) => void }) {
  const { t } = useI18n();
  return (
    <div className="space-y-2">
      {B.SECTION_IDS.map((id) => {
        const has = available.includes(id);
        return (
          <label key={id} className={cx('flex gap-3 rounded-xl border px-3 py-2', has ? 'border-line' : 'border-dashed border-line opacity-60')}>
            <input type="checkbox" className="mt-1 h-4 w-4 shrink-0" disabled={!has} checked={has && chosen.includes(id)}
              onChange={(e) => setChosen(e.target.checked ? [...chosen, id] : chosen.filter((x) => x !== id))} />
            <span className="text-sm">
              <span className="font-medium">{t(`backup.sections.${id}`)}</span>
              {!has && <span className="text-muted"> — {t('backup.sections.empty')}</span>}
              <span className="block text-muted">{t(`backup.sections.${id}Hint`)}</span>
            </span>
          </label>
        );
      })}
    </div>
  );
}

const errorText = (t: ReturnType<typeof useI18n>['t'], e: unknown) => {
  if (e instanceof B.BackupFailure) return t(`backup.errors.${e.code}`, { detail: e.detail ?? '' });
  if (e instanceof DOMException && (e.name === 'QuotaExceededError' || e.code === 22)) return t('backup.errors.quota');
  return t('backup.errors.notBackup');
};

// ---------- create ----------

interface Created {
  at: string;
  fileText: string;
  code: string;
  encrypted: boolean;
  checksum: string;
}

function CreatePanel() {
  const { t, locale } = useI18n();
  const current = useMemo(() => B.readSections(), []);
  const available = B.SECTION_IDS.filter((id) => current[id] !== undefined);
  const [chosen, setChosen] = useState<B.SectionId[]>(available);
  const [encrypt, setEncrypt] = useState(false);
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [made, setMade] = useState<Created | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [showCode, setShowCode] = useState(false);
  const codeRef = useRef<HTMLTextAreaElement>(null);

  const pwError = encrypt ? (pw.length < 8 ? t('backup.create.passwordShort') : pw !== pw2 ? t('backup.create.passwordMismatch') : null) : null;

  const create = async () => {
    setError(null);
    setMsg(null);
    setMade(null);
    setBusy(true);
    try {
      const sections = Object.fromEntries(chosen.map((id) => [id, current[id]])) as B.BackupSections;
      const doc = await B.createBackup(sections);
      const out = encrypt ? await B.encryptBackup(doc, pw) : doc;
      const created = { at: doc.createdAt, fileText: B.toFileText(out), code: await B.toCode(out), encrypted: encrypt, checksum: doc.checksum.value };
      setMade(created);
      setShowCode(created.code.length <= B.CODE_COPY_LIMIT);
      safeSet(LAST_BACKUP_KEY, doc.createdAt);
    } catch (e) {
      setError(errorText(t, e));
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    if (!made) return;
    try {
      await navigator.clipboard.writeText(made.code);
      setMsg({ ok: true, text: t('backup.create.copied') });
    } catch {
      setShowCode(true);
      window.setTimeout(() => codeRef.current?.select(), 0);
      setMsg({ ok: false, text: t('backup.create.copyFailed') });
    }
  };

  if (!available.length) return <p className="text-sm text-muted">{t('backup.create.nothing')}</p>;

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 text-sm font-medium">{t('backup.create.choose')}</div>
        <SectionChoices available={available} chosen={chosen} setChosen={setChosen} />
        <p className="mt-2 text-xs text-muted">{t('backup.excluded')}</p>
      </div>

      <div className="rounded-xl border border-line p-3">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" className="h-4 w-4" checked={encrypt} onChange={(e) => setEncrypt(e.target.checked)} /> {t('backup.create.encrypt')}
        </label>
        <p className="mt-1 text-xs text-muted">{t('backup.create.encryptHint')}</p>
        {encrypt && (
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <input type="password" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder={t('backup.create.password')} aria-label={t('backup.create.password')}
              className="min-w-0 rounded-xl border border-line px-3 py-2 text-sm outline-none focus:border-sky-300" />
            <input type="password" autoComplete="new-password" value={pw2} onChange={(e) => setPw2(e.target.value)} placeholder={t('backup.create.password2')} aria-label={t('backup.create.password2')}
              className="min-w-0 rounded-xl border border-line px-3 py-2 text-sm outline-none focus:border-sky-300" />
            {pwError && (pw || pw2) && <p className="text-xs text-rose-700 sm:col-span-2">{pwError}</p>}
          </div>
        )}
      </div>

      <Button onClick={() => void create()} disabled={busy || !chosen.length || Boolean(pwError)}>
        {busy ? t('backup.create.working') : t('backup.create.button')}
      </Button>
      {error && <p role="alert" className="text-sm text-rose-700">{error}</p>}

      {made && (
        <div className="space-y-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 text-sm">
          <div className="font-medium text-emerald-800">{t('backup.create.done', { date: new Date(made.at).toLocaleString(locale) })}</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-muted">
            <span>{t('backup.create.sizeFile', { size: fmtBytes(B.byteSize(made.fileText), locale) })}</span>
            <span>{t('backup.create.sizeCode', { count: made.code.length })}</span>
            <span>{t('backup.create.checksum', { value: made.checksum.slice(0, 12) })}</span>
            {made.encrypted && <span className="font-medium text-emerald-700">🔒 {t('backup.create.encrypted')}</span>}
          </div>
          {!made.encrypted && <p className="rounded-lg bg-amber-50 px-3 py-2 text-amber-900">{t('backup.create.notEncrypted')}</p>}
          {made.code.length > B.CODE_COPY_LIMIT && <p className="rounded-lg bg-amber-50 px-3 py-2 text-amber-900">{t('backup.create.tooLarge', { count: made.code.length })}</p>}
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => {
              const name = B.backupFileName(new Date(made.at));
              download(name, made.fileText);
              setMsg({ ok: true, text: t('backup.create.downloaded', { name }) });
            }}><Icon name="download" className="h-4 w-4" /> {t('backup.create.download')}</Button>
            <Button variant="secondary" onClick={() => void copy()}>{t('backup.create.copy')}</Button>
            <Button variant="ghost" onClick={() => setShowCode((v) => !v)}>{showCode ? t('backup.create.hideCode') : t('backup.create.showCode')}</Button>
          </div>
          {msg && <p role="status" className={msg.ok ? 'text-emerald-700' : 'text-amber-800'}>{msg.text}</p>}
          {showCode && (
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted">{t('backup.create.codeLabel')}</span>
              <textarea ref={codeRef} readOnly value={made.code} rows={4} onFocus={(e) => e.currentTarget.select()}
                className="w-full break-all rounded-xl border border-line bg-white px-3 py-2 font-mono text-xs" />
            </label>
          )}
          <p className="text-xs text-muted">{t('backup.create.codeNote')}</p>
        </div>
      )}
    </div>
  );
}

// ---------- restore ----------

type Checked = { doc: B.BackupDoc; legacy: boolean };

function RestorePanel() {
  const { t, locale } = useI18n();
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locked, setLocked] = useState<B.EncryptedDoc | null>(null);
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState<Checked | null>(null);
  const [chosen, setChosen] = useState<B.SectionId[]>([]);
  const [mode, setMode] = useState<B.RestoreMode>('merge');
  const fileRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setError(null);
    setLocked(null);
    setChecked(null);
    setPassword('');
  };
  const accept = (doc: B.BackupDoc, legacy: boolean) => {
    setChecked({ doc, legacy });
    setChosen(B.summarize(doc).sections);
  };
  const check = async (input: string) => {
    resetState();
    setBusy(true);
    try {
      const p = await B.parseBackupInput(input);
      if (p.kind === 'encrypted') setLocked(p.enc);
      else accept(p.doc, p.legacy);
    } catch (e) {
      setError(errorText(t, e));
    } finally {
      setBusy(false);
    }
  };
  const unlock = async () => {
    if (!locked) return;
    setError(null);
    setBusy(true);
    try {
      accept(await B.decryptBackup(locked, password), false);
      setLocked(null);
    } catch (e) {
      setError(errorText(t, e));
    } finally {
      setBusy(false);
    }
  };
  const onFile = async (f: File | undefined) => {
    if (!f) return;
    try {
      const content = await f.text();
      setText('');
      await check(content);
    } catch {
      setError(t('backup.errors.readFile'));
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  };
  const backupCurrentFirst = async () => {
    const doc = await B.createBackup(B.readSections());
    download(B.backupFileName(), B.toFileText(doc));
    safeSet(LAST_BACKUP_KEY, doc.createdAt);
  };
  const restore = () => {
    if (!checked) return;
    if (!chosen.length) {
      setError(t('backup.restore.noSection'));
      return;
    }
    if (!window.confirm(mode === 'replace' ? t('backup.restore.confirmReplace') : t('backup.restore.confirmMerge'))) return;
    try {
      B.restoreBackup(localStorage, checked.doc, mode, chosen);
    } catch (e) {
      setError(t('backup.restore.failed', { reason: errorText(t, e) }));
      return;
    }
    safeSet(RESTORED_FLAG, '1', globalThis.sessionStorage);
    // every part of the app reads its data on start: reload so all of them see the restored data
    window.location.reload();
  };

  const summary = checked ? B.summarize(checked.doc) : null;
  return (
    <div className="space-y-4">
      {!checked && (
        <>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">{t('backup.restore.pasteLabel')}</span>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder={t('backup.restore.pastePlaceholder')} spellCheck={false}
              className="w-full break-all rounded-xl border border-line px-3 py-2 font-mono text-xs outline-none focus:border-sky-300" />
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={() => void check(text)} disabled={busy || !text.trim()}>{busy ? t('backup.restore.checking') : t('backup.restore.check')}</Button>
            <span className="text-sm text-muted">{t('backup.restore.orFile')}</span>
            <Button variant="secondary" onClick={() => fileRef.current?.click()} disabled={busy}>{t('backup.restore.chooseFile')}</Button>
            <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={(e) => void onFile(e.target.files?.[0])} />
          </div>
          <p className="text-xs text-muted">{t('backup.restore.nothingChanged')}</p>
        </>
      )}

      {locked && (
        <div className="space-y-2 rounded-xl border border-sky-200 bg-sky-50 p-3 text-sm">
          <p>🔒 {t('backup.restore.passwordNeeded')}</p>
          <div className="flex flex-wrap gap-2">
            <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} aria-label={t('backup.create.password')}
              onKeyDown={(e) => { if (e.key === 'Enter') void unlock(); }}
              className="min-w-0 flex-1 rounded-xl border border-line px-3 py-2 outline-none focus:border-sky-300" />
            <Button onClick={() => void unlock()} disabled={busy || !password}>{busy ? t('backup.restore.checking') : t('backup.restore.unlock')}</Button>
          </div>
        </div>
      )}

      {error && <p role="alert" className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-800">{error}</p>}

      {checked && summary && (
        <div className="space-y-4">
          <div className="rounded-xl border border-line p-3 text-sm">
            <div className="font-medium">{t('backup.restore.preview')}</div>
            <div className="mt-1 text-muted">
              {t('backup.restore.created', { date: new Date(summary.createdAt).toLocaleString(locale) })}
              {!checked.legacy && <> · {t('backup.restore.format', { version: summary.formatVersion })}</>}
            </div>
            <p className={cx('mt-2 rounded-lg px-3 py-2', checked.legacy ? 'bg-amber-50 text-amber-900' : 'bg-emerald-50 text-emerald-800')}>
              {checked.legacy ? t('backup.restore.legacy') : t('backup.restore.verified')}
            </p>
            <div className="mt-2"><SummaryList summary={summary} /></div>
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">{t('backup.restore.chooseSections')}</div>
            <SectionChoices available={summary.sections} chosen={chosen} setChosen={setChosen} />
          </div>

          <fieldset className="space-y-2">
            <legend className="mb-2 text-sm font-medium">{t('backup.restore.mode')}</legend>
            {(['merge', 'replace'] as B.RestoreMode[]).map((m) => (
              <label key={m} className={cx('flex gap-3 rounded-xl border px-3 py-2', mode === m ? (m === 'replace' ? 'border-rose-300 bg-rose-50/50' : 'border-sky-300 bg-sky-50/50') : 'border-line')}>
                <input type="radio" name="restore-mode" className="mt-1 h-4 w-4 shrink-0" checked={mode === m} onChange={() => setMode(m)} />
                <span className="text-sm">
                  <span className="font-medium">{t(`backup.restore.${m}`)}</span>
                  <span className="block text-muted">{t(`backup.restore.${m}Hint`)}</span>
                </span>
              </label>
            ))}
          </fieldset>

          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => void backupCurrentFirst()}><Icon name="download" className="h-4 w-4" /> {t('backup.restore.backupFirst')}</Button>
            <Button variant={mode === 'replace' ? 'danger' : 'primary'} onClick={restore} disabled={!chosen.length}>{t('backup.restore.button')}</Button>
            <Button variant="ghost" onClick={() => { resetState(); setText(''); }}>{t('backup.restore.cancel')}</Button>
          </div>
          <p className="text-xs text-muted">{t('backup.restore.nothingChanged')}</p>
        </div>
      )}
    </div>
  );
}

// ---------- information ----------

function InfoPanel() {
  const { t, locale } = useI18n();
  const [summary, setSummary] = useState<B.Summary | null>(null);
  useEffect(() => {
    void B.createBackup(B.readSections()).then((d) => setSummary(B.summarize(d))).catch(() => setSummary(null));
  }, []);
  const last = safeGet(LAST_BACKUP_KEY);
  return (
    <div className="space-y-4 text-sm">
      <div>
        <div className="font-medium">{t('backup.info.current')}</div>
        <div className="mt-1">{summary ? <SummaryList summary={summary} /> : '…'}</div>
        <p className="mt-2 text-muted">{last ? t('backup.info.lastBackup', { date: new Date(last).toLocaleString(locale) }) : t('backup.info.neverBackedUp')}</p>
      </div>
      <div className="rounded-xl bg-amber-50 px-3 py-2 text-amber-900">
        <div className="font-medium">{t('backup.info.whenTitle')}</div>
        <p className="mt-1">{t('backup.info.when')}</p>
      </div>
      <div>
        <div className="font-medium">{t('backup.info.riskTitle')}</div>
        <p className="mt-1 text-muted">{t('backup.info.risk')}</p>
      </div>
      <div>
        <div className="font-medium">{t('backup.info.formatTitle')}</div>
        <p className="mt-1 text-muted">{t('backup.info.format', { version: B.BACKUP_FORMAT, iterations: new Intl.NumberFormat(locale).format(B.PBKDF2_ITERATIONS) })}</p>
      </div>
      <p className="text-muted">{t('backup.info.offline')}</p>
      <p className="text-xs text-muted">{t('backup.excluded')}</p>
    </div>
  );
}
