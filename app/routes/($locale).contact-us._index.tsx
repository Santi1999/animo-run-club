import {useCallback, useEffect, useRef, useState} from 'react';
import {Resend} from 'resend';
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router';
import type {Route} from './+types/contact-us._index';
import whatsappIcon from '~/assets/whatsapp.svg';

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          size: string;
          execution: string;
          callback: (token: string) => void;
          'error-callback': () => void;
        },
      ) => string;
      execute: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

export const meta: Route.MetaFunction = () => {
  return [{title: 'Contact Us | Animo Run Club'}];
};

export function loader({context}: Route.LoaderArgs) {
  return {turnstileSiteKey: context.env.TURNSTILE_SITE_KEY};
}

const VALID_SUBJECTS = [
  'Order Inquiry',
  'Shipping & Delivery',
  'Returns & Exchanges',
  'Product Question',
  'Other',
];

const MAX_LENGTHS = {name: 100, email: 254, subject: 100, body: 5000};

function sanitize(value: string, maxLength: number): string {
  // eslint-disable-next-line no-control-regex
  return value
    .trim()
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    .slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  return (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    email.length <= MAX_LENGTHS.email
  );
}

export async function action({request, context}: Route.ActionArgs) {
  const formData = await request.formData();

  // Honeypot — bots fill this hidden field, real users leave it empty
  if (formData.get('website')) {
    // Silently succeed so bots don't know they were caught
    return {success: true};
  }

  // Verify Turnstile token
  const turnstileToken = formData.get('cf-turnstile-response');
  if (!turnstileToken) {
    return {success: false, error: 'Please complete the verification.'};
  }

  const turnstileRes = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        secret: context.env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
      }),
    },
  );
  const turnstileData = await turnstileRes.json<{success: boolean}>();
  if (!turnstileData.success) {
    return {success: false, error: 'Verification failed. Please try again.'};
  }

  const firstName = sanitize(
    String(formData.get('contact[first_name]') ?? ''),
    MAX_LENGTHS.name,
  );
  const lastName = sanitize(
    String(formData.get('contact[last_name]') ?? ''),
    MAX_LENGTHS.name,
  );
  const email = sanitize(
    String(formData.get('contact[email]') ?? ''),
    MAX_LENGTHS.email,
  );
  const subject = sanitize(
    String(formData.get('contact[subject]') ?? ''),
    MAX_LENGTHS.subject,
  );
  const body = sanitize(
    String(formData.get('contact[body]') ?? ''),
    MAX_LENGTHS.body,
  );

  // Validate required fields
  if (!firstName || !lastName || !email || !subject || !body) {
    return {success: false, error: 'All fields are required.'};
  }

  if (!isValidEmail(email)) {
    return {success: false, error: 'Please enter a valid email address.'};
  }

  if (!VALID_SUBJECTS.includes(subject)) {
    return {success: false, error: 'Please select a valid subject.'};
  }

  try {
    const resend = new Resend(context.env.RESEND_API_KEY);

    const {error} = await resend.emails.send({
      from: `Contact Form <${context.env.RESEND_FROM_EMAIL}>`,
      to: [context.env.RESEND_TO_EMAIL],
      replyTo: email,
      subject: `[Contact] ${subject}`,
      html: `<p><strong>From:</strong> ${firstName} ${lastName} &lt;${email}&gt;</p><p>${body.replace(/\n/g, '<br>')}</p>`,
    });

    if (error) {
      return {
        success: false,
        error: 'Failed to send your message. Please try again.',
      };
    }
    return {success: true};
  } catch (err) {
    console.error('Contact form submission failed:', err);
    return {
      success: false,
      error: 'Failed to send your message. Please try again.',
    };
  }
}

export default function ContactUsPage() {
  const {turnstileSiteKey} = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === 'submitting';
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [verifyError, setVerifyError] = useState('');

  const handleTurnstileSuccess = useCallback(
    (token: string) => {
      if (!formRef.current) return;
      const formData = new FormData(formRef.current);
      formData.set('cf-turnstile-response', token);
      submit(formData, {method: 'post'});
    },
    [submit],
  );

  useEffect(() => {
    function renderWidget() {
      if (
        !turnstileRef.current ||
        widgetIdRef.current !== null ||
        !window.turnstile
      )
        return;
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        size: 'invisible',
        execution: 'execute',
        callback: handleTurnstileSuccess,
        'error-callback': () => {
          setVerifyError('Verification failed. Please try again.');
        },
      });
    }

    if (
      !document.querySelector(
        'script[src*="challenges.cloudflare.com/turnstile"]',
      )
    ) {
      const script = document.createElement('script');
      script.src =
        'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = () => renderWidget();
      document.head.appendChild(script);
    } else if (window.turnstile) {
      renderWidget();
    }

    return () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [turnstileSiteKey, handleTurnstileSuccess]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setVerifyError('');
    if (widgetIdRef.current !== null && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      window.turnstile.execute(widgetIdRef.current);
    }
  }

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

      {actionData?.success && (
        <div className="bg-green-50 border border-green-200 text-green-800 text-sm px-6 py-4 mb-6">
          Thank you for your message. We&apos;ll get back to you shortly.
        </div>
      )}

      {(actionData?.error || verifyError) && (
        <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-6 py-4 mb-6">
          {actionData?.error || verifyError}
        </div>
      )}

      <Form
        ref={formRef}
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        {/* Honeypot — hidden from real users, bots auto-fill it */}
        <input
          type="text"
          name="website"
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
        />

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
              name="contact[first_name]"
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
              name="contact[last_name]"
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
            name="contact[email]"
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
          {/* Shopify doesn't have a dedicated subject field — this value
              gets included as contact[subject] in the email body */}
          <select
            id="subject"
            name="contact[subject]"
            required
            className="border-b border-gray-300 focus:border-black outline-none py-2 text-sm bg-transparent transition-colors appearance-none"
          >
            <option value="">Select a topic</option>
            <option value="Order Inquiry">Order Inquiry</option>
            <option value="Shipping &amp; Delivery">
              Shipping &amp; Delivery
            </option>
            <option value="Returns &amp; Exchanges">
              Returns &amp; Exchanges
            </option>
            <option value="Product Question">Product Question</option>
            <option value="Other">Other</option>
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
            name="contact[body]"
            rows={5}
            required
            className="border-b border-gray-300 focus:border-black outline-none py-2 text-sm bg-transparent transition-colors resize-none"
          />
        </div>

        <div ref={turnstileRef} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="self-start bg-black text-white text-xs font-semibold tracking-widest uppercase px-8 py-3 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </Form>
    </div>
  );
}
