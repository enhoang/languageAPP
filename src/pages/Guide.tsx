import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, PageHeader, SectionTitle } from '../components/ui';
import { useI18n } from '../i18n/LocaleContext';
import { COURSE_IDS, COURSES, PASS_PERCENT } from '../courses';

export default function Guide() {
  const { t, tr } = useI18n();
  const names = COURSE_IDS.map((id) => tr(COURSES[id].name)).join(', ');
  const lessons = Math.max(...COURSE_IDS.map((id) => COURSES[id].lessons.length));
  return (
    <div className="space-y-5">
      <PageHeader title={t('guide.title')} />
      <Card>
        <SectionTitle>{t('guide.courses.title')}</SectionTitle>
        <ul className="list-disc space-y-1 pl-5">
          <li>{t('guide.courses.choose', { names })}</li>
          <li>{t('guide.courses.switch')}</li>
          <li>{t('guide.courses.separate')}</li>
        </ul>
        <Link to="/courses" className="mt-2 inline-block text-sm text-sky-600 hover:underline">{t('layout.allCourses')}</Link>
      </Card>
      <Card>
        <SectionTitle>{t('guide.language.title')}</SectionTitle>
        <ul className="list-disc space-y-1 pl-5">
          <li>{t('guide.language.interface')}</li>
          <li>{t('guide.language.studied')}</li>
          <li>{t('guide.language.support')}</li>
        </ul>
      </Card>
      <Card>
        <SectionTitle>{t('guide.daily.title')}</SectionTitle>
        <ol className="list-decimal space-y-1 pl-5">
          <li><Trans i18nKey="guide.daily.step1" values={{ home: t('common.nav.home') }} components={{ b: <b /> }} /></li>
          <li>{t('guide.daily.step2')}</li>
          <li>{t('guide.daily.step3', { pct: PASS_PERCENT })}</li>
          <li>{t('guide.daily.step4')}</li>
        </ol>
        <p className="mt-2 text-sm text-muted">{t('guide.daily.breaks')}</p>
      </Card>
      <Card>
        <SectionTitle>{t('guide.pron.title')}</SectionTitle>
        <ul className="list-disc space-y-1 pl-5">
          <li>{t('guide.pron.zh')}</li>
          <li>{t('guide.pron.en')}</li>
          <li>{t('guide.pron.ko')}</li>
          <li>{t('guide.pron.toggle')}</li>
        </ul>
      </Card>
      <Card>
        <SectionTitle>{t('guide.speaking.title')}</SectionTitle>
        <ul className="list-disc space-y-1 pl-5">
          <li>{t('guide.speaking.with')}</li>
          <li>{t('guide.speaking.without')}</li>
          <li>{t('guide.speaking.hint')}</li>
        </ul>
      </Card>
      <Card>
        <SectionTitle>{t('guide.typing.title')}</SectionTitle>
        <ul className="list-disc space-y-1 pl-5">
          <li>{t('guide.typing.pinyin')}</li>
          <li>{t('guide.typing.hanzi')}</li>
          <li>{t('guide.typing.spelling')}</li>
          <li>{t('guide.typing.hangul')}</li>
        </ul>
      </Card>
      <Card>
        <SectionTitle>{t('guide.data.title')}</SectionTitle>
        <p>{t('guide.data.body')}</p>
      </Card>
      <Card>
        <SectionTitle>{t('guide.limits.title')}</SectionTitle>
        <ul className="list-disc space-y-1 pl-5">
          <li>{t('guide.limits.audio')}</li>
          <li>{t('guide.limits.noScoring')}</li>
          <li>{t('guide.limits.lessons', { count: lessons })}</li>
          <li>{t('guide.limits.framework')}</li>
        </ul>
      </Card>
    </div>
  );
}
