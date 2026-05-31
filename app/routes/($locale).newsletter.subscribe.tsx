import {data, Form, useActionData, useNavigation} from 'react-router';
import type {Route} from './+types/newsletter.subscribe';

/**
 * Storefront API mutation to create a customer record with email marketing consent.
 * Password is generated server-side — this flow is strictly for newsletter signup,
 * not account creation. Customer accounts / logins are handled in separate routes.
 */
const CUSTOMER_CREATE_MUTATION = `#graphql
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
` as const;

type ActionResponse =
  | {success: true; error?: never}
  | {success?: never; error: string};

export async function action({request, context}: Route.ActionArgs) {
  const formData = await request.formData();
  const email = String(formData.get('email') || '').trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return data<ActionResponse>(
      {error: 'Please enter a valid email address.'},
      {status: 400},
    );
  }

  // Generate a random password since Storefront API requires one for customerCreate.
  // The user will never see or use this — newsletter signup is passwordless.
  const password = crypto.randomUUID();

  try {
    const {customerCreate} = await context.storefront.mutate(
      CUSTOMER_CREATE_MUTATION,
      {
        variables: {
          input: {
            email,
            password,
            acceptsMarketing: true,
          },
        },
      },
    );

    const userErrors = customerCreate?.customerUserErrors ?? [];

    if (userErrors.length === 0) {
      return data<ActionResponse>({success: true});
    }

    // If the email is already taken, treat it as a soft success.
    const isAlreadyTaken = userErrors.some(
      (e: {code?: string}) => e.code === 'TAKEN',
    );

    if (isAlreadyTaken) {
      return data<ActionResponse>({success: true});
    }

    // Any other validation error — surface a friendly message.
    return data<ActionResponse>(
      {error: userErrors[0]?.message || 'Something went wrong. Please try again.'},
      {status: 400},
    );
  } catch {
    return data<ActionResponse>(
      {error: 'Something went wrong. Please try again.'},
      {status: 500},
    );
  }
}

export default function NewsletterSubscribePage() {
  const actionData = useActionData<ActionResponse>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="px-8 sm:px-12 lg:px-16 py-12 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Sign up for our newsletter</h1>
      <p className="text-sm text-gray-600 mb-8">
        Stay up to date with the latest drops, events, and stories from Ánimo
        Run Club.
      </p>

      {actionData?.success ? (
        <p className="text-sm font-medium">
          Thanks for subscribing! We&apos;ll be in touch.
        </p>
      ) : (
        <Form method="post">
          <div className="flex items-center border-b border-black pb-1">
            <input
              type="email"
              name="email"
              required
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
              title="Please enter a valid email address"
              placeholder="Insert your e-mail address *"
              className="flex-1 bg-transparent text-sm outline-none focus:outline-none focus:ring-0 placeholder:text-gray-500"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              aria-label="Subscribe"
              className="ml-2 disabled:opacity-50"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="text-black"
              >
                <path
                  d="M4 10h12M12 6l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>

          {actionData?.error && (
            <p className="text-sm text-red-600 mt-3">{actionData.error}</p>
          )}
        </Form>
      )}
    </div>
  );
}
