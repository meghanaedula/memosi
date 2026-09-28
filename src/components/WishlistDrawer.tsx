import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product, Currency } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: Currency;
  onRemoveWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onRemoveWishlist,
  onSelectProduct,
  onAddToCart
}) => {
  if (!isOpen) return null;

  const format = (usd: number) => `${currency.symbol}${Math.round(usd * currency.rate)}`;

  const handleMoveAllToBag = () => {
    products.forEach((p) => {
      onAddToCart(p, p.sizes[0] || 'M', p.colors[0]?.name || 'Natural', 1);
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#191817]/60 backdrop-blur-xs flex justify-end animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-[#FAF9F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#EAE5D9] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EAE5D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-serif font-medium text-[#191817]">Saved Pieces</h3>
            <span className="text-xs text-[#8A8175] font-sans tabular-nums">
              ({products.length} {products.length === 1 ? 'item' : 'items'})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#706B62] hover:text-[#191817] hover:bg-[#EAE5D9] transition-colors"
            aria-label="Close wishlist drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {products.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <p className="text-lg font-serif text-[#191817]">Your wishlist is empty</p>
              <p className="text-xs text-[#706B62] max-w-xs mx-auto">
                Save pieces as you browse to compare materials, silhouettes, and wardrobe pairings.
              </p>
            </div>
          ) : (
            products.map((product) => (
              <div 
                key={product.id}
                className="flex gap-4 pb-6 border-b border-[#EAE5D9]/80 items-start group"
              >
                {/* Thumbnail */}
                <div 
                  onClick={() => {
                    onClose();
                    onSelectProduct(product);
                  }}
                  className="w-20 aspect-[3/4] bg-[#F4F1EA] rounded-xs overflow-hidden border border-[#EAE5D9] flex-shrink-0 cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 
                        onClick={() => {
                          onClose();
                          onSelectProduct(product);
                        }}
                        className="text-sm font-serif font-medium text-[#191817] truncate hover:underline cursor-pointer"
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveWishlist(product.id)}
                        className="text-[#8A8175] hover:text-red-700 transition-colors p-1"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="text-xs text-[#706B62] mt-0.5 line-clamp-1">
                      {product.composition.split(';')[0]}
                    </p>

                    <div className="mt-2 text-sm font-semibold font-sans tabular-nums text-[#191817]">
                      {format(product.price)}
                    </div>
                  </div>

                  {/* Add to Bag CTA */}
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        onAddToCart(product, product.sizes[0] || 'M', product.colors[0]?.name || 'Natural', 1);
                      }}
                      className="w-full py-2 px-3 text-xs uppercase tracking-wider font-semibold bg-[#FAF9F5] border border-[#C4B89F] hover:bg-[#191817] hover:text-[#FAF9F5] text-[#191817] rounded-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag size={13} />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {products.length > 0 && (
          <div className="p-6 bg-[#F4F1EA] border-t border-[#EAE5D9] space-y-3">
            <button
              onClick={handleMoveAllToBag}
              className="w-full bg-[#191817] text-[#FAF9F5] hover:bg-[#322E2B] py-3.5 px-6 text-xs uppercase tracking-widest font-semibold rounded-xs shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <span>Move All Pieces to Bag</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
