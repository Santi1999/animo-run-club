import type {MappedProductOptions} from '@shopify/hydrogen';
import type {
  ProductFragment,
  ProductVariantFragment,
  RelatedProductFragment,
} from 'storefrontapi.generated';
import type {ProductAccordionItem} from '~/components/ProductAccordion';

export type GalleryImage = NonNullable<ProductVariantFragment['image']>;

/** Props shared by the mobile and desktop product page layouts. */
export interface ProductLayoutProps {
  product: ProductFragment;
  selectedVariant: NonNullable<ProductFragment['selectedOrFirstAvailableVariant']>;
  productOptions: MappedProductOptions[];
  images: GalleryImage[];
  accordionItems: ProductAccordionItem[];
  recommendations: Promise<{
    productRecommendations?: RelatedProductFragment[] | null;
  } | null>;
}

/**
 * Shopify standard category metafields (namespace `shopify`) shown under
 * "Specifications". `name` is the English field name, used as the label
 * fallback and to skip fields that repeat a variant option (e.g. Color).
 */
export const CATEGORY_METAFIELDS = [
  {key: 'color-pattern', name: 'Color'},
  {key: 'fabric', name: 'Fabric'},
  {key: 'headwear-features', name: 'Headwear features'},
  {key: 'target-gender', name: 'Target gender'},
] as const;

/** Identifiers passed to the product query's `metafields(identifiers:)`. */
export const CATEGORY_METAFIELD_IDENTIFIERS = CATEGORY_METAFIELDS.map(
  ({key}) => ({namespace: 'shopify', key}),
);

type CategoryMetafield = {
  key: string;
  references?: {
    nodes: Array<{label?: {value?: string | null} | null}>;
  } | null;
} | null;

export interface CategorySpec {
  key: string;
  name: string;
  value: string;
}

/**
 * Readable category metafields: each metaobject reference becomes its label
 * ("Nylon, Mesh"). Empty fields and fields named like one of the product's
 * variant options are left out.
 */
export function getCategorySpecs(
  metafields: CategoryMetafield[],
  optionNames: string[],
): CategorySpec[] {
  const options = new Set(optionNames.map((name) => name.toLowerCase()));

  return CATEGORY_METAFIELDS.flatMap(({key, name}) => {
    if (options.has(name.toLowerCase())) return [];
    const metafield = metafields.find((field) => field?.key === key);
    const labels = (metafield?.references?.nodes ?? [])
      .map((node) => node.label?.value)
      .filter((label): label is string => Boolean(label));
    return labels.length ? [{key, name, value: labels.join(', ')}] : [];
  });
}

/**
 * Product images for the gallery, with the selected variant's image first
 * (it may not be part of the product's image list).
 */
export function getGalleryImages(
  product: Pick<ProductFragment, 'images'>,
  variantImage?: ProductVariantFragment['image'],
): GalleryImage[] {
  const images = product.images.nodes;
  if (!variantImage) return images;
  return [variantImage, ...images.filter((image) => image.id !== variantImage.id)];
}
