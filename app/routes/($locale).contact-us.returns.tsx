import {useTranslation} from 'react-i18next';
import type {Route} from './+types/contact-us.returns';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Returns | Ánimo Run Club'}];
};

export default function ReturnsPage() {
  const {t} = useTranslation();

  return (
    <div className="px-8 sm:px-12 lg:px-16 py-12 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-2">{t('returns.title')}</h1>
      <p className="text-gray-500 text-sm mb-10">
        {t('returns.subtitle')}
      </p>

      <section className="mb-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide mb-4 pb-2 border-b border-gray-200">
          {t('returns.policy_heading')}
        </h2>
        <ul className="flex flex-col gap-3 text-sm text-gray-700">
          <li className="flex gap-3">
            <span className="text-black font-semibold shrink-0">
              {t('returns.policy_days_label')}
            </span>
            <span>{t('returns.policy_days_text')}</span>
          </li>
          <li className="flex gap-3">
            <span className="text-black font-semibold shrink-0">
              {t('returns.policy_condition_label')}
            </span>
            <span>{t('returns.policy_condition_text')}</span>
          </li>
          <li className="flex gap-3">
            <span className="text-black font-semibold shrink-0">
              {t('returns.policy_exceptions_label')}
            </span>
            <span>{t('returns.policy_exceptions_text')}</span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide mb-4 pb-2 border-b border-gray-200">
          {t('returns.how_heading')}
        </h2>
        <ol className="flex flex-col gap-5">
          {([
            {step: '01', title: t('returns.step1_title'), desc: t('returns.step1_desc')},
            {step: '02', title: t('returns.step2_title'), desc: t('returns.step2_desc')},
            {step: '03', title: t('returns.step3_title'), desc: t('returns.step3_desc')},
            {step: '04', title: t('returns.step4_title'), desc: t('returns.step4_desc')},
          ]).map(({step, title, desc}) => (
            <li key={step} className="flex gap-5">
              <span className="text-2xl font-light text-gray-300 shrink-0 w-8 leading-none">
                {step}
              </span>
              <div>
                <p className="text-sm font-semibold mb-1">{title}</p>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide mb-4 pb-2 border-b border-gray-200">
          {t('returns.exchanges_heading')}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {t('returns.exchanges_text')}
        </p>
      </section>
    </div>
  );
}
