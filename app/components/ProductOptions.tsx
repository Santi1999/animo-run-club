import {Link, useNavigate} from 'react-router';
import {useTranslation} from 'react-i18next';
import {type MappedProductOptions} from '@shopify/hydrogen';
import type {
  Maybe,
  ProductOptionValueSwatch,
} from '@shopify/hydrogen/storefront-api-types';
import {useLocalePrefix} from '~/lib/i18n';

const ITEM_BASE =
  'py-3 text-xs tracking-widest uppercase border transition-all duration-150 flex items-center justify-center';

function itemClassName(selected: boolean, available: boolean) {
  return `${ITEM_BASE} ${
    selected
      ? 'border-black bg-black text-white'
      : 'border-black/20 text-black hover:border-black'
  } ${available ? '' : 'opacity-30'}`;
}

/** Option pickers (size, color, …) for the product's variants. */
export function ProductOptions({
  productOptions,
}: {
  productOptions: MappedProductOptions[];
}) {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const localePrefix = useLocalePrefix();

  return (
    <>
      {productOptions.map((option) => {
        // A single value can't be picked: show it as a fixed, selected label.
        // Shopify's internal "Title / Default Title" option is never shown.
        if (option.optionValues.length === 1) {
          const [{name}] = option.optionValues;
          if (option.name === 'Title' && name === 'Default Title') return null;

          return (
            <div className="mb-6" key={option.name}>
              <div className="text-xs tracking-widest uppercase font-medium mb-3">
                {option.name}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className={itemClassName(true, true)}>{name}</div>
              </div>
            </div>
          );
        }

        return (
          <div className="mb-6" key={option.name}>
            <div className="text-xs tracking-widest uppercase font-medium mb-3">
              {t('product.select_option', {option: option.name})}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {option.optionValues.map((value) => {
                const {
                  name,
                  handle,
                  variantUriQuery,
                  selected,
                  available,
                  exists,
                  isDifferentProduct,
                  swatch,
                } = value;

                if (isDifferentProduct) {
                  // SEO
                  // When the variant is a combined listing child product
                  // that leads to a different url, we need to render it
                  // as an anchor tag
                  return (
                    <Link
                      className={itemClassName(selected, available)}
                      key={option.name + name}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`${localePrefix}/products/${handle}?${variantUriQuery}`}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </Link>
                  );
                }

                // SEO
                // When the variant is an update to the search param,
                // render it as a button with javascript navigating to
                // the variant so that SEO bots do not index these as
                // duplicated links
                return (
                  <button
                    type="button"
                    className={`${itemClassName(selected, available)} disabled:cursor-not-allowed`}
                    key={option.name + name}
                    aria-pressed={selected}
                    disabled={!exists}
                    onClick={() => {
                      if (!selected) {
                        void navigate(`?${variantUriQuery}`, {
                          replace: true,
                          preventScrollReset: true,
                        });
                      }
                    }}
                  >
                    <ProductOptionSwatch swatch={swatch} name={name} />
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

function ProductOptionSwatch({
  swatch,
  name,
}: {
  swatch?: Maybe<ProductOptionValueSwatch> | undefined;
  name: string;
}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (!image && !color) return name;

  return (
    <div
      aria-label={name}
      className="w-5 h-5"
      style={{backgroundColor: color || 'transparent'}}
    >
      {!!image && <img src={image} alt={name} className="w-full rounded-none!" />}
    </div>
  );
}
