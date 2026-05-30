import type {Route} from './+types/contact-us.returns';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Returns | Animo Run Club'}];
};

export default function ReturnsPage() {
  return (
    <div className="px-8 sm:px-12 lg:px-16 py-12 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-2">Returns</h1>
      <p className="text-gray-500 text-sm mb-10">
        We want you to love every piece. If something isn&apos;t right, here&apos;s
        how to return it.
      </p>

      <section className="mb-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide mb-4 pb-2 border-b border-gray-200">
          Return Policy
        </h2>
        <ul className="flex flex-col gap-3 text-sm text-gray-700">
          <li className="flex gap-3">
            <span className="text-black font-semibold shrink-0">30 days</span>
            <span>
              You have 30 days from the delivery date to initiate a return.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-black font-semibold shrink-0">Condition</span>
            <span>
              Items must be unworn, unwashed, and in original packaging with all
              tags attached.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-black font-semibold shrink-0">Exceptions</span>
            <span>
              Final sale items, gift cards, and personalized products are not
              eligible for return.
            </span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide mb-4 pb-2 border-b border-gray-200">
          How to Return
        </h2>
        <ol className="flex flex-col gap-5">
          {[
            {
              step: '01',
              title: 'Start your return',
              desc: 'Email us at returns@animorunclub.com with your order number and the item(s) you wish to return.',
            },
            {
              step: '02',
              title: 'Receive your label',
              desc: "We'll send you a prepaid return shipping label within 1–2 business days.",
            },
            {
              step: '03',
              title: 'Ship it back',
              desc: 'Pack your item securely and drop it off at any authorized carrier location.',
            },
            {
              step: '04',
              title: 'Refund processed',
              desc: 'Once we receive and inspect your return, your refund will be issued within 5–7 business days to your original payment method.',
            },
          ].map(({step, title, desc}) => (
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
          Exchanges
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          We don&apos;t offer direct exchanges. To get a different size or color,
          return your original item and place a new order. This ensures you get
          your new item as quickly as possible.
        </p>
      </section>
    </div>
  );
}
