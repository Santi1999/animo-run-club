import {useLoaderData} from 'react-router';
import {useTranslation} from 'react-i18next';
import type {Route} from './+types/products.$handle';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import type {ProductAccordionItem} from '~/components/ProductAccordion';
import {ProductDesktopLayout} from '~/components/ProductDesktopLayout';
import {ProductMobileLayout} from '~/components/ProductMobileLayout';
import {
  CATEGORY_METAFIELD_IDENTIFIERS,
  getCategorySpecs,
  getGalleryImages,
} from '~/lib/product';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import type {LayoutRouteHandle} from '~/components/PageLayout';

// The mobile layout fills the screen and shows the footer inside its sheet
export const handle: LayoutRouteHandle = {ownsMobileFooter: true};

export const meta: Route.MetaFunction = ({data}) => {
  const product = data?.product;
  const title = `Ánimo | ${product?.title ?? ''}`;
  const description = product?.description ?? 'Shop Ánimo Run Club';
  const image = product?.selectedOrFirstAvailableVariant?.image?.url ?? 'https://cdn.shopify.com/s/files/1/0670/7930/7470/files/2.png?v=1780311878';
  return [
    {title},
    {
      rel: 'canonical',
      href: `/products/${product?.handle}`,
    },
    {name: 'description', content: description},
    {property: 'og:title', content: title},
    {property: 'og:description', content: description},
    {property: 'og:image', content: image},
    {property: 'og:type', content: 'product'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: title},
    {name: 'twitter:description', content: description},
    {name: 'twitter:image', content: image},
  ];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {
        handle,
        selectedOptions: getSelectedProductOptions(request),
        categoryMetafields: CATEGORY_METAFIELD_IDENTIFIERS,
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context, params}: Route.LoaderArgs) {
  const recommendations = context.storefront
    .query(PRODUCT_RECOMMENDATIONS_QUERY, {
      variables: {handle: params.handle!},
    })
    .catch((error: Error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {recommendations};
}

export default function Product() {
  const {product, recommendations} = useLoaderData<typeof loader>();
  const {t} = useTranslation();

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const accordionItems: ProductAccordionItem[] = [];
  if (product.materialsCare?.value) {
    accordionItems.push({
      id: 'materials',
      label: t('product.materials_care'),
      content: <p className="whitespace-pre-line">{product.materialsCare.value}</p>,
    });
  }
  if (product.productCare?.value) {
    accordionItems.push({
      id: 'care',
      label: t('product.product_care'),
      content: <p className="whitespace-pre-line">{product.productCare.value}</p>,
    });
  }

  const specs = [
    ...(['capacity', 'dimensions'] as const).flatMap((key) => {
      const value = product[key]?.value;
      return value ? [{key, label: t(`product.spec.${key}`), value}] : [];
    }),
    ...getCategorySpecs(
      product.categoryMetafields,
      product.options.map((option) => option.name),
    ).map(({key, name, value}) => ({
      key,
      label: t(`product.spec.${key}`, {defaultValue: name}),
      value,
    })),
  ];
  if (specs.length) {
    accordionItems.push({
      id: 'specifications',
      label: t('product.specifications'),
      content: (
        <dl className="space-y-2">
          {specs.map(({key, label, value}) => (
            <div key={key} className="flex justify-between gap-4">
              <dt>{label}</dt>
              <dd className="text-right text-black">{value}</dd>
            </div>
          ))}
        </dl>
      ),
    });
  }

  accordionItems.push({
    id: 'commitment',
    label: t('product.our_commitment'),
    content: <p>{t('product.our_commitment_text')}</p>,
  });

  const layoutProps = {
    product,
    selectedVariant,
    productOptions,
    images: getGalleryImages(product, selectedVariant.image),
    accordionItems,
    recommendations,
  };

  return (
    // Negative margins cancel the `body > main` gutter so the page runs edge to edge
    <div className="bg-white -mx-4 -mb-4">
      <ProductMobileLayout {...layoutProps} />
      <ProductDesktopLayout {...layoutProps} />
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    images(first: 20) {
      nodes {
        __typename
        id
        url
        altText
        width
        height
      }
    }
    collections(first: 1) {
      nodes {
        title
        handle
      }
    }
    materialsCare: metafield(namespace: "custom", key: "materials_care") {
      value
    }
    productCare: metafield(namespace: "custom", key: "product_care") {
      value
    }
    capacity: metafield(namespace: "custom", key: "capacity") {
      value
    }
    dimensions: metafield(namespace: "custom", key: "dimensions") {
      value
    }
    categoryMetafields: metafields(identifiers: $categoryMetafields) {
      key
      references(first: 10) {
        nodes {
          ... on Metaobject {
            label: field(key: "label") {
              value
            }
          }
        }
      }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
    $categoryMetafields: [HasMetafieldsIdentifier!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;

const RELATED_PRODUCT_FRAGMENT = `#graphql
  fragment RelatedProduct on Product {
    id
    handle
    title
    productType
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
  }
` as const;

const PRODUCT_RECOMMENDATIONS_QUERY = `#graphql
  query ProductRecommendations(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    productRecommendations(productHandle: $handle) {
      ...RelatedProduct
    }
  }
  ${RELATED_PRODUCT_FRAGMENT}
` as const;
