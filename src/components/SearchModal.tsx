import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { Product, Currency } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: Currency;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const suggestions = ['Cashmere', 'Trench Coat', 'Virgin Wool', 'Silk Slip', 'Belgian Linen'];

  const results = searchTerm.trim()
    ? products.filter((p) => {
        const q = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.composition.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      })
    : [];

  const format = (usd: number) => `${currency.symbol}${Math.round(usd * currency.rate)}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#191817]/70 backdrop-blur-xs flex items-start justify-center p-4 sm:p-8 pt-16 sm:pt-24 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF9F5] border border-[#EAE5D9] max-w-2xl w-full rounded-xs shadow-2xl p-6 sm:p-8 animate-in slide-in-from-top-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE5D9]">
          <div className="flex items-center gap-3 flex-1 mr-4">
            <Search size={20} className="text-[#8A8175]" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search garments, textures, silhouetes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-base sm:text-lg text-[#191817] placeholder-[#8A8175] focus:outline-none font-serif"
            />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#706B62] hover:text-[#191817] hover:bg-[#EAE5D9] transition-colors"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Suggestion Keywords */}
        {!searchTerm.trim() && (
          <div className="pt-6 space-y-3">
            <p className="text-[11px] uppercase tracking-widest text-[#8A8175] font-semibold">
              Curated Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchTerm(term)}
                  className="px-3 py-1.5 text-xs text-[#5A554D] bg-[#F4F1EA] hover:bg-[#191817] hover:text-[#FAF9F5] rounded-xs border border-[#EAE5D9] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchTerm.trim() && (
          <div className="pt-6 max-h-[60vh] overflow-y-auto space-y-4">
            <p className="text-[11px] uppercase tracking-widest text-[#8A8175]">
              {results.length} {results.length === 1 ? 'Piece' : 'Pieces'} Found
            </p>

            {results.length === 0 ? (
              <div className="py-12 text-center text-[#706B62] text-xs">
                No matching pieces for "{searchTerm}".
              </div>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(product);
                  }}
                  className="flex items-center gap-4 p-2.5 rounded-xs hover:bg-[#F4F1EA] transition-colors cursor-pointer group"
                >
                  <div className="w-14 aspect-[3/4] bg-[#EAE5D9] rounded-xs overflow-hidden flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-[#8A8175]">
                      {product.categoryLabel}
                    </p>
                    <h4 className="text-sm font-serif font-medium text-[#191817] truncate group-hover:underline">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#706B62] truncate">
                      {product.composition.split(';')[0]}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold tabular-nums text-[#191817]">
                      {format(product.price)}
                    </span>
                    <ArrowUpRight size={14} className="text-[#8A8175] ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
