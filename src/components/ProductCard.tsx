import React, { useState } from 'react';
import { Heart, Eye, Plus } from 'lucide-react';
import { Product, Currency } from '../types';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: string, color: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formattedPrice = `${currency.symbol}${Math.round(product.price * currency.rate)}`;
  const currentColor = product.colors[selectedColorIdx] || product.colors[0];

  return (
    <article
      className="group relative flex flex-col bg-[#FAF9F5] border border-[#EAE5D9]/60 hover:border-[#DCD4C3] transition-all duration-300 rounded-xs overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Stage */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4F1EA] cursor-pointer"
        onClick={() => onSelectProduct(product)}
      >
        {/* Fallback container / placeholder while image renders */}
        <div className={`absolute inset-0 bg-[#EAE5D9] transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100 flex items-center justify-center'}`}>
          <span className="text-xs uppercase tracking-widest text-[#8A8175]">memosi atelier</span>
        </div>

        <img
          src={product.images[0]}
          alt={`${product.name} - ${currentColor.name}`}
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Top Badges / Indicators */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#191817] bg-[#FAF9F5]/90 backdrop-blur-xs px-2 py-0.5 border border-[#EAE5D9]/80 rounded-xs">
              New In
            </span>
          )}
          {product.stockCount && product.stockCount <= 3 && (
            <span className="text-[10px] uppercase tracking-widest font-medium text-[#8E5E3A] bg-[#FAF9F5]/90 backdrop-blur-xs px-2 py-0.5 border border-[#EAE5D9]/80 rounded-xs">
              Low Stock
            </span>
          )}
        </div>

        {/* Top-Right Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 ${
            isWishlisted 
              ? 'bg-[#191817] text-[#FAF9F5] shadow-sm' 
              : 'bg-[#FAF9F5]/85 backdrop-blur-xs text-[#191817] hover:bg-[#FAF9F5] shadow-xs'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} strokeWidth={1.75} />
        </button>

        {/* Hover Quick View / Quick Add bar */}
        <div className={`absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#191817]/60 via-[#191817]/20 to-transparent flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
          <div className="bg-[#FAF9F5]/95 backdrop-blur-sm p-2 rounded-xs border border-[#EAE5D9] flex items-center justify-between gap-1 shadow-sm">
            <span className="text-[10px] uppercase tracking-wider text-[#8A8175] font-medium pl-1">
              Quick Add:
            </span>
            <div className="flex items-center gap-1">
              {product.sizes.slice(0, 4).map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickAdd(product, size, currentColor.name);
                  }}
                  className="px-2 py-1 text-[11px] font-medium text-[#191817] hover:bg-[#191817] hover:text-[#FAF9F5] transition-colors rounded-xs border border-[#EAE5D9]"
                  title={`Add size ${size}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-[#FAF9F5]">
        <div>
          {/* Clean unboxed metadata with subtle dot */}
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#8A8175] mb-1.5 font-medium">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate max-w-[150px]">{product.composition.split(';')[0]}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="text-base sm:text-lg font-serif font-medium text-[#191817] hover:underline underline-offset-4 cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#706B62] line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Color Selection Row */}
        <div className="mt-4 pt-3 border-t border-[#EAE5D9]/70 flex items-center justify-between">
          <div className="font-sans text-sm font-semibold text-[#191817] tabular-nums">
            {formattedPrice}
          </div>

          {/* Available color swatches */}
          <div className="flex items-center gap-1.5" title="Available shades">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIdx(idx);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIdx === idx 
                    ? 'border-[#191817] scale-110 shadow-xs' 
                    : 'border-[#C4B89F] hover:border-[#191817]'
                }`}
                style={{ backgroundColor: color.hex }}
                aria-label={`Select ${color.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
