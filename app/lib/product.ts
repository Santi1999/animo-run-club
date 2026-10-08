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
