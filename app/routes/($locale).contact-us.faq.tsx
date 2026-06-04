import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import type {Route} from './+types/contact-us.faq';

export const meta: Route.MetaFunction = () => {
  return [{title: 'FAQ | Ánimo Run Club'}];
};

export default function FaqPage() {
  const {t} = useTranslation();

  const FAQ_ITEMS = [
    {
      category: t('faq.cat_orders'),
      questions: [
        {q: t('faq.orders_q1'), a: t('faq.orders_a1')},
        {q: t('faq.orders_q2'), a: t('faq.orders_a2')},
      ],
    },
    {
      category: t('faq.cat_shipping'),
      questions: [
        {q: t('faq.shipping_q1'), a: t('faq.shipping_a1')},
        {q: t('faq.shipping_q2'), a: t('faq.shipping_a2')},
        {q: t('faq.shipping_q3'), a: t('faq.shipping_a3')},
      ],
    },
    {
      category: t('faq.cat_products'),
      questions: [
        {q: t('faq.products_q1'), a: t('faq.products_a1')},
        {q: t('faq.products_q2'), a: t('faq.products_a2')},
      ],
    },
    {
      category: t('faq.cat_returns'),
      questions: [
        {q: t('faq.returns_q1'), a: t('faq.returns_a1')},
        {q: t('faq.returns_q2'), a: t('faq.returns_a2')},
      ],
    },
  ];

  return (
    <div className="px-8 sm:px-12 lg:px-16 py-12 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-2">{t('faq.title')}</h1>
      <p className="text-gray-500 text-sm mb-10">
        {t('faq.subtitle')}
      </p>

      <div className="flex flex-col gap-10">
        {FAQ_ITEMS.map((section) => (
          <div key={section.category}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              {section.category}
            </h2>
            <div className="flex flex-col divide-y divide-gray-200 border-t border-gray-200">
              {section.questions.map((item) => (
                <AccordionItem key={item.q} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AccordionItem({question, answer}: {question: string; answer: string}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-center py-4 text-left text-sm font-medium hover:text-gray-600 transition-colors"
        aria-expanded={open}
      >
        {question}
        <span
          className={`ml-4 shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 1v12M1 7h12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      {open && (
        <p className="pb-4 text-sm text-gray-600 leading-relaxed">{answer}</p>
      )}
    </div>
  );
}
