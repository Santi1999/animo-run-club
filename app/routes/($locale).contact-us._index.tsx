import type {Route} from './+types/contact-us._index';
import whatsappIcon from '~/assets/whatsapp.svg';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Contact Us | Animo Run Club'}];
};

export default function ContactUsPage() {
  return (
    <div className="px-8 sm:px-12 lg:px-16 py-12 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Contact us</h1>
      <p className="text-gray-500 text-sm leading-relaxed mb-8">
        Please contact our Client Service: (from Monday to Saturday from 9 am to
        10 pm and on Sunday from 9 am to 8 pm, Eastern Standard Time); By e-mail
        at{' '}
        <a href="mailto:contact@animorunclub.com" className="underline">
          contact@animorunclub.com
        </a>
        {'. '}
      </p>

      {/* Contact channel boxes */}
      <div className="flex flex-col gap-3 mb-12 pt-5">
        <a
          href="https://chat.whatsapp.com/GHU7Zm7FVSpEcKoc3UPtOS?s=sh&p=i&ilr=2"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full border border-gray-200 px-6 py-5 hover:bg-gray-50 transition-colors text-left"
        >
          <span className="text-sm font-medium">
            Join Our Run Club - WhatsApp
          </span>
          <img
            src={whatsappIcon}
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
          />
        </a>

        {/* <button
          type="button"
          className="flex items-center justify-between w-full border border-gray-200 px-6 py-5 hover:bg-gray-50 transition-colors text-left"
        >
          <span className="text-sm font-medium">Send us an e-mail</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="2"
              y="5"
              width="20"
              height="14"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M2 7l10 7 10-7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </button> */}
      </div>

      <form className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="firstName"
              className="text-xs font-semibold tracking-wide uppercase"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="border-b border-gray-300 focus:border-black outline-none py-2 text-sm bg-transparent transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="lastName"
              className="text-xs font-semibold tracking-wide uppercase"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="border-b border-gray-300 focus:border-black outline-none py-2 text-sm bg-transparent transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-xs font-semibold tracking-wide uppercase"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="border-b border-gray-300 focus:border-black outline-none py-2 text-sm bg-transparent transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="subject"
            className="text-xs font-semibold tracking-wide uppercase"
          >
            Subject <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            className="border-b border-gray-300 focus:border-black outline-none py-2 text-sm bg-transparent transition-colors appearance-none"
          >
            <option value="">Select a topic</option>
            <option value="order">Order Inquiry</option>
            <option value="shipping">Shipping &amp; Delivery</option>
            <option value="returns">Returns &amp; Exchanges</option>
            <option value="product">Product Question</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="message"
            className="text-xs font-semibold tracking-wide uppercase"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="border-b border-gray-300 focus:border-black outline-none py-2 text-sm bg-transparent transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          className="self-start bg-black text-white text-xs font-semibold tracking-widest uppercase px-8 py-3 hover:bg-gray-800 transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
