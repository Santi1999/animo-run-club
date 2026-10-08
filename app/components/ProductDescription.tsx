/** Renders the Shopify product description (HTML) in the page's body style. */
export function ProductDescription({
  html,
  className = '',
}: {
  html: string;
  className?: string;
}) {
  if (!html) return null;

  return (
    <div
      className={`text-sm text-black/70 leading-relaxed [&_p]:text-sm! [&_p]:leading-relaxed! [&_p+p]:mt-3 ${className}`}
      dangerouslySetInnerHTML={{__html: html}}
    />
  );
}
