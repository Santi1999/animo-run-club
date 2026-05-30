import {useState} from 'react';
import type {Route} from './+types/contact-us.faq';

export const meta: Route.MetaFunction = () => {
  return [{title: 'FAQ | Animo Run Club'}];
};

const FAQ_ITEMS = [
  {
    category: 'Orders',
    questions: [
      {
        q: 'How do I track my order?',
        a: 'Once your order ships, you will receive an email with a tracking number. You can use it to track your package on the carrier\'s website.',
      },
      {
        q: 'Can I cancel or modify my order?',
        a: 'Orders can only be cancelled or modified within 1 hour of being placed. Please contact us immediately at orders@animorunclub.com.',
      },
    ],
  },
  {
    category: 'Shipping',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping takes 5–7 business days. Expedited shipping (2–3 business days) and overnight options are available at checkout.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship to most countries worldwide. International orders typically arrive within 7–14 business days depending on the destination.',
      },
      {
        q: 'Is shipping free?',
        a: 'We offer free standard shipping on all orders over $100 within the US. International orders may be subject to customs duties and taxes.',
      },
    ],
  },
  {
    category: 'Products',
    questions: [
      {
        q: 'How do I find my size?',
        a: 'Each product page includes a size guide with detailed measurements. If you\'re between sizes, we recommend sizing up for a more comfortable fit during runs.',
      },
      {
        q: 'How should I care for my gear?',
        a: 'Machine wash cold on a gentle cycle and hang to dry. Avoid fabric softener and bleach to preserve performance fabrics.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your return window?',
        a: 'We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original packaging with tags attached.',
      },
      {
        q: 'How long does a refund take?',
        a: 'Once we receive and inspect your return, refunds are processed within 5–7 business days to your original payment method.',
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="px-8 sm:px-12 lg:px-16 py-12 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-2">FAQ</h1>
      <p className="text-gray-500 text-sm mb-10">
        Find answers to our most frequently asked questions below.
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
