import {useId} from 'react';
import {useLoaderData, Link} from 'react-router';
import type {Route} from './+types/collections._index';
import {getPaginationVariables, Image} from '@shopify/hydrogen';
import type {CollectionFragment} from 'storefrontapi.generated';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {PhotoCarousel} from '~/components/PhotoCarousel';
import {useLocalePrefix} from '~/lib/i18n';

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
async function loadCriticalData({context, request}: Route.LoaderArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  const [{collections}] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {
      variables: paginationVariables,
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {collections};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <div className="collections">
      <h1>Collections</h1>
      <PaginatedResourceSection<CollectionFragment>
        connection={collections}
        resourcesClassName="collections-grid"
      >
        {({node: collection, index}) => (
          <CollectionItem
            key={collection.id}
            collection={collection}
            index={index}
          />
        )}
      </PaginatedResourceSection>
    </div>
  );
}

/**
 * Collection title + link, followed by a horizontal strip of preview photos
 * from the collection's `custom.preview_images` metafield (if any).
 */
function CollectionItem({
  collection,
  index,
}: {
  collection: CollectionFragment;
  index: number;
}) {
  const localePrefix = useLocalePrefix();
  const headingId = useId();
  const to = `${localePrefix}/collections/${collection.handle}`;
  const images = (collection.previewImages?.references?.nodes ?? []).flatMap(
    (node) => ('image' in node && node.image ? [node.image] : []),
  );

  return (
    <div className="collection-preview">
      <span className="collection-preview-badge">New Collection</span>
      <div className="collection-preview-header">
        <div className="collection-preview-heading">
          <h2 id={headingId}>{collection.title}</h2>
          {collection.description && (
            <p className="collection-preview-subtitle">
              {collection.description}
            </p>
          )}
        </div>
        <Link
          to={to}
          prefetch="intent"
          className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-black/50 hover:text-black transition-colors group"
        >
          <span>View Collection</span>
          <span
            aria-hidden="true"
            className="group-hover:translate-x-0.5 transition-transform"
          >
            →
          </span>
        </Link>
      </div>
      {images.length > 0 && (
        <PhotoCarousel labelledBy={headingId}>
          {/* Mouse shortcut to the collection; the text link above is the accessible one */}
          {images.map((image, i) => (
            <Link
              key={image.id ?? image.url}
              to={to}
              className="collection-preview-photo"
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                alt=""
                data={image}
                loading={index === 0 && i < 3 ? 'eager' : 'lazy'}
                sizes="(min-width: 45em) 26vw, 100vw"
              />
            </Link>
          ))}
        </PhotoCarousel>
      )}
      {images.length > 1 && (
        <p className="collection-preview-caption">
          Swipe to explore • {collection.title}
        </p>
      )}
    </div>
  );
}

const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    description
    previewImages: metafield(namespace: "custom", key: "preview_images") {
      references(first: 20) {
        nodes {
          ... on MediaImage {
            image {
              id
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const;
