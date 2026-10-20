import { useEffect, useRef, useState } from 'react';
import { backendUrl, HttpProvider } from '../../conversation/provider';
import { exportConv, parseConvBackup } from '../../conversation/store';
import type { ConvData } from '../../conversation/types';
import { useConv } from '../../conversation/ConvContext';
import { useI18n } from '../../i18n/LocaleContext';
import { Button, Card, PageHeader, SectionTitle, cx } from '../../components/ui';
import { Icon } from '../../components/Icon';
import { ConvNav } from '../../components/conversation/shared';

type Test = { s: 'idle' } | { s: 'testing' } | { s: 'ok'; model?: string } | { s: 'needsCode' } | { s: 'unreachable' };
type Msg = { ok: boolean; text: string } | null;

const validUrl = (u: string) => /^https:\/\/[^\s/]+/i.test(u) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(u);
const INPUT = 'w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-sky-300';

/** /conversation/settings — AI backend connection (no API key in the browser) and conversation data backup. */
export default function ConvSettingsPage() {
  const { t } = useI18n();
  const { data, saveError, updateSettings } = useConv();
  const preset = (import.meta.env.VITE_CONVERSATION_API_URL as string | undefined) || '';
  const active = backendUrl(data.settings);
  const [url, setUrl] = useState(data.settings.apiUrl ?? '');
  const [code, setCode] = useState(data.settings.accessCode ?? '');
  // follow outside changes (reset, restore from backup, another tab)
  useEffect(() => setUrl(data.settings.apiUrl ?? ''), [data.settings.apiUrl]);
  useEffect(() => setCode(data.settings.accessCode ?? ''), [data.settings.accessCode]);
  const [test, setTest] = useState<Test>({ s: 'idle' });
  const [msg, setMsg] = useState<Msg>(null);
  const trimmed = url.trim().replace(/\/+$/, '');
  const urlBad = trimmed !== '' && !validUrl(trimmed);

  const runTest = async () => {
    const target = trimmed || preset;
    if (!target || (trimmed && urlBad)) return;
    setTest({ s: 'testing' });
    const r = await HttpProvider.health(target);
    setTest(!r.ok ? { s: 'unreachable' } : r.accessCodeRequired && !code.trim() ? { s: 'needsCode' } : { s: 'ok', model: r.model });
  };
  const save = () => {
    if (urlBad) return;
    updateSettings({ apiUrl: trimmed || undefined, accessCode: code.trim() || undefined });
    setMsg({ ok: true, text: trimmed || preset ? t('conv.settings.savedMsg') : t('conv.settings.demoMsg') });
  };
  const useDemo = () => {
    setUrl('');
    setCode('');
    setTest({ s: 'idle' });
    updateSettings({ apiUrl: undefined, accessCode: undefined });
    setMsg({ ok: true, text: t('conv.settings.demoMsg') });
  };

  return (
    <div className="space-y-6">
      <ConvNav />
      <PageHeader title={t('conv.settings.title')} subtitle={t('conv.settings.subtitle')} />
      {saveError && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{t('conv.settings.saveError')}</p>}

      <Card className="bg-gradient-to-br from-sky-50 to-white">
        <SectionTitle>{t('conv.settings.explainTitle')}</SectionTitle>
        <ul className="space-y-2 text-sm leading-relaxed">
          <li className="flex gap-2"><Icon name="chat" className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />{t('conv.settings.explainServer')}</li>
          <li className="flex gap-2 font-medium"><Icon name="lock" className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />{t('conv.settings.explainKey')}</li>
          <li className="flex gap-2"><Icon name="flag" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />{t('conv.settings.explainCost')}</li>
          <li className="flex gap-2"><Icon name="help" className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />{t('conv.settings.explainDemo')}</li>
        </ul>
      </Card>

      <Card>
        <p className="mb-4 break-words text-sm">
          <span className="font-medium">{t('conv.settings.current')}: </span>
          {active ? t('conv.settings.currentAi', { url: active }) : t('conv.settings.currentDemo')}
        </p>
        {preset && <p className="mb-4 break-words rounded-lg bg-sky-50 px-3 py-2 text-sm text-sky-800">{t('conv.settings.preconfigured', { url: preset })}</p>}
        <div className="space-y-4">
          <div>
            <label htmlFor="conv-url" className="mb-1 block text-sm font-medium">{t('conv.settings.url')}</label>
            <input id="conv-url" type="url" inputMode="url" autoComplete="off" spellCheck={false} value={url} placeholder={t('conv.settings.urlPlaceholder')}
              onChange={(e) => { setUrl(e.target.value); setTest({ s: 'idle' }); setMsg(null); }} className={INPUT} aria-invalid={urlBad} aria-describedby={urlBad ? 'conv-url-err' : undefined} />
            {urlBad && <p id="conv-url-err" className="mt-1 text-xs text-rose-700">{t('conv.settings.urlInvalid')}</p>}
          </div>
          <div>
            <label htmlFor="conv-code" className="mb-1 block text-sm font-medium">{t('conv.settings.code')}</label>
            <input id="conv-code" type="password" autoComplete="off" value={code} onChange={(e) => { setCode(e.target.value); setTest({ s: 'idle' }); setMsg(null); }} className={INPUT} aria-describedby="conv-code-hint" />
            <p id="conv-code-hint" className="mt-1 text-xs text-muted">{t('conv.settings.codeHint')}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => void runTest()} disabled={test.s === 'testing' || urlBad || !(trimmed || preset)}>{test.s === 'testing' ? t('conv.settings.testing') : t('conv.settings.test')}</Button>
            <Button onClick={save} disabled={urlBad}>{t('conv.settings.save')}</Button>
            <Button variant="ghost" onClick={useDemo}>{t('conv.settings.useDemo')}</Button>
          </div>
          <div aria-live="polite" className="text-sm">
            {test.s === 'ok' && <p className="text-emerald-700">{test.model ? t('conv.settings.testOk', { model: test.model }) : t('conv.settings.testOkNoModel')}</p>}
            {test.s === 'needsCode' && <p className="text-amber-700">{t('conv.settings.testNeedsCode')}</p>}
            {test.s === 'unreachable' && <p className="text-rose-700">{t('conv.settings.testUnreachable')}</p>}
            {msg && <p className={cx('mt-1', msg.ok ? 'text-emerald-700' : 'text-rose-700')}>{msg.text}</p>}
          </div>
        </div>
      </Card>

      <BackupCard />
    </div>
  );
}

function BackupCard() {
  const { t } = useI18n();
  const { data, replace, reset } = useConv();
  const fileRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<ConvData | null>(null);
  const [msg, setMsg] = useState<Msg>(null);

  const doExport = () => {
    const blob = new Blob([exportConv(data)], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = `conversation-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(href), 1000);
  };
  const onFile = async (f: File | undefined) => {
    if (!f) return;
    const r = parseConvBackup(await f.text());
    if (fileRef.current) fileRef.current.value = '';
    if (r.ok) {
      setPending(r.data);
      setMsg(null);
    } else setMsg({ ok: false, text: t(`conv.backup.error.${r.error}`) });
  };

  return (
    <Card>
      <SectionTitle>{t('conv.backup.title')}</SectionTitle>
      <p className="text-sm text-muted">{t('conv.backup.note')}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button onClick={doExport}>{t('conv.backup.export')}</Button>
        <Button variant="secondary" onClick={() => fileRef.current?.click()}>{t('conv.backup.import')}</Button>
        <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={(e) => void onFile(e.target.files?.[0])} />
      </div>
      {pending && (
        <div className="mt-3 rounded-xl bg-amber-50 p-3 text-sm">
          <p className="font-medium text-amber-800">{t('conv.backup.confirmReplace')}</p>
          <div className="mt-2 flex gap-2">
            <Button variant="danger" onClick={() => {
              // keep this browser's access code: backups never contain it
              replace({ ...pending, settings: { ...pending.settings, accessCode: pending.settings.accessCode ?? data.settings.accessCode } });
              setPending(null);
              setMsg({ ok: true, text: t('conv.backup.restored') });
            }}>{t('conv.backup.confirm')}</Button>
            <Button variant="ghost" onClick={() => setPending(null)}>{t('conv.backup.cancel')}</Button>
          </div>
        </div>
      )}

      <div className="mt-6 border-t border-line pt-4">
        <h3 className="font-semibold">{t('conv.backup.resetTitle')}</h3>
        <p className="mt-1 text-sm text-muted">{t('conv.backup.resetHint')}</p>
        <Button variant="danger" className="mt-3" onClick={() => {
          if (window.confirm(t('conv.backup.resetConfirm'))) {
            reset();
            setMsg({ ok: true, text: t('conv.backup.resetDone') });
          }
        }}>{t('conv.backup.reset')}</Button>
      </div>
      <div aria-live="polite">{msg && <p className={cx('mt-3 text-sm', msg.ok ? 'text-emerald-700' : 'text-rose-700')}>{msg.text}</p>}</div>
    </Card>
  );
}
