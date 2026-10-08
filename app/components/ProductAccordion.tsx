import {useState} from 'react';
import {ChevronDown, ChevronUp} from 'lucide-react';

export interface ProductAccordionItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

function AccordionRow({label, content}: Omit<ProductAccordionItem, 'id'>) {
  const [open, setOpen] = useState(false);
  const Chevron = open ? ChevronUp : ChevronDown;

  return (
    <div className="border-t border-black/10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left hover:opacity-70 transition-opacity"
        aria-expanded={open}
      >
        <span className="text-xs tracking-widest uppercase font-medium">
          {label}
        </span>
        <Chevron className="w-3.5 h-3.5 flex-shrink-0" />
      </button>
      {open && (
        <div className="pb-5 text-sm text-black/60 leading-relaxed">
          {content}
        </div>
      )}
    </div>
  );
}

/** Collapsible sections (materials, commitment, …) shown on the product page. */
export function ProductAccordion({items}: {items: ProductAccordionItem[]}) {
  if (!items.length) return null;

  return (
    <div>
      {items.map(({id, ...item}) => (
        <AccordionRow key={id} {...item} />
      ))}
      <div className="border-t border-black/10" />
    </div>
  );
}
