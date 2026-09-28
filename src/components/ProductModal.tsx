import React, { useState, useEffect } from 'react';
import { X, Heart, Check, Ruler, Truck, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { Product, Currency } from '../types';

interface ProductModalProps {
  product: Product | null;
  currency: Currency;
  isWishlisted: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  currency,
  isWishlisted,
  onClose,
  onAddToCart,
  onToggleWishlist,
  onOpenSizeGuide
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');

  // Sync state if product changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedSize(product.sizes[0] || '');
      setQuantity(1);
      setAddedToast(false);
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const formattedPrice = `${currency.symbol}${Math.round(product.price * currency.rate)}`;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2200);
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#191817]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-[#FAF9F5] border border-[#EAE5D9] max-w-5xl w-full my-auto rounded-xs shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#FAF9F5]/90 text-[#191817] hover:bg-[#EAE5D9] transition-colors border border-[#EAE5D9]"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Left Side: Product Gallery */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-[#F4F1EA] flex flex-col justify-between overflow-y-auto">
          {/* Main Hero Shot */}
          <div className="aspect-[3/4] w-full rounded-xs overflow-hidden bg-[#FAF9F5] border border-[#EAE5D9] shadow-xs relative">
            <img
              src={selectedImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Gallery Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-20 rounded-xs overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === img ? 'border-[#191817] opacity-100' : 'border-transparent opacity-60 hover:opacity-90'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Contiguous Purchase Module */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          
          <div className="space-y-5">
            {/* Category & Collection */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8A8175] font-medium">
              <span>{product.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>Autumn 2026 Archive</span>
            </div>

            {/* Product Title & Subtitle */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#191817]">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#706B62] mt-1 font-light">
                {product.subtitle}
              </p>
            </div>

            {/* Price Row */}
            <div className="text-xl font-sans font-semibold text-[#191817] tabular-nums">
              {formattedPrice}
            </div>

            {/* Description Paragraph */}
            <p className="text-sm text-[#5A554D] leading-relaxed font-light border-y border-[#EAE5D9] py-4">
              {product.description}
            </p>

            {/* Color Swatch Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#191817]">Color:</span>
                <span className="text-[#706B62] font-light">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs border text-xs transition-all ${
                      selectedColor === color.name 
                        ? 'border-[#191817] bg-[#FAF9F5] shadow-xs font-semibold' 
                        : 'border-[#EAE5D9] hover:border-[#C4B89F] text-[#5A554D]'
                    }`}
                  >
                    <span 
                      className="w-3 h-3 rounded-full border border-black/15 inline-block"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector + Size Guide */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#191817]">Size:</span>
                <button
                  onClick={onOpenSizeGuide}
                  className="flex items-center gap-1 text-[#8A8175] hover:text-[#191817] transition-colors underline"
                >
                  <Ruler size={13} />
                  <span>Size & Fit Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-xs font-medium uppercase tracking-wider rounded-xs border transition-all ${
                      selectedSize === size
                        ? 'border-[#191817] bg-[#191817] text-[#FAF9F5] shadow-xs'
                        : 'border-[#EAE5D9] text-[#191817] hover:border-[#191817] bg-[#FAF9F5]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock status indicator */}
            {product.stockCount && product.stockCount <= 4 && (
              <p className="text-xs text-[#8E5E3A] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8E5E3A] inline-block animate-pulse" />
                <span>Only {product.stockCount} archival units remaining in this cut</span>
              </p>
            )}

            {/* Quantity Stepper & Add to Bag CTA */}
            <div className="pt-2 flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-[#EAE5D9] rounded-xs bg-[#FAF9F5]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-3 text-xs text-[#191817] hover:bg-[#EAE5D9] transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 text-xs font-semibold tabular-nums text-[#191817]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-3 text-xs text-[#191817] hover:bg-[#EAE5D9] transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Primary Buy CTA */}
              <button
                onClick={handleAdd}
                className="flex-1 bg-[#191817] text-[#FAF9F5] hover:bg-[#322E2B] py-3.5 px-6 text-xs uppercase tracking-widest font-semibold rounded-xs shadow-xs transition-all flex items-center justify-center gap-2"
              >
                {addedToast ? (
                  <>
                    <Check size={16} className="text-emerald-400" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Shopping Bag · {currency.symbol}{Math.round(product.price * quantity * currency.rate)}</span>
                )}
              </button>

              {/* Wishlist button */}
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3.5 border rounded-xs transition-colors ${
                  isWishlisted
                    ? 'border-[#191817] bg-[#191817] text-[#FAF9F5]'
                    : 'border-[#EAE5D9] text-[#191817] hover:border-[#191817]'
                }`}
                aria-label="Save piece"
              >
                <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Value Guarantees */}
            <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-[#706B62]">
              <div className="flex items-center gap-1.5">
                <Truck size={13} className="text-[#191817]" />
                <span>Complimentary Shipping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-[#191817]" />
                <span>Lifetime Atelier Repairs</span>
              </div>
            </div>

            {/* Accordion Sections: Details, Composition, Care */}
            <div className="pt-4 border-t border-[#EAE5D9] space-y-2 text-xs">
              
              {/* Accordion: Craft Details */}
              <div className="border border-[#EAE5D9] rounded-xs overflow-hidden">
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full px-4 py-3 bg-[#FAF9F5] flex items-center justify-between font-medium text-[#191817] text-left"
                >
                  <span>Atelier Tailoring Details</span>
                  {openAccordion === 'details' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {openAccordion === 'details' && (
                  <ul className="px-4 pb-3 space-y-1.5 text-[#5A554D] bg-[#FAF9F5] border-t border-[#EAE5D9]/60 pt-2 list-disc list-inside">
                    {product.details.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Accordion: Composition & Fit */}
              <div className="border border-[#EAE5D9] rounded-xs overflow-hidden">
                <button
                  onClick={() => toggleAccordion('composition')}
                  className="w-full px-4 py-3 bg-[#FAF9F5] flex items-center justify-between font-medium text-[#191817] text-left"
                >
                  <span>Composition & Fit Note</span>
                  {openAccordion === 'composition' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {openAccordion === 'composition' && (
                  <div className="px-4 pb-3 space-y-2 text-[#5A554D] bg-[#FAF9F5] border-t border-[#EAE5D9]/60 pt-2">
                    <p><strong>Fabric:</strong> {product.composition}</p>
                    <p><strong>Fit:</strong> {product.fit}</p>
                  </div>
                )}
              </div>

              {/* Accordion: Care Instructions */}
              <div className="border border-[#EAE5D9] rounded-xs overflow-hidden">
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full px-4 py-3 bg-[#FAF9F5] flex items-center justify-between font-medium text-[#191817] text-left"
                >
                  <span>Garment Care & Longevity</span>
                  {openAccordion === 'care' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {openAccordion === 'care' && (
                  <div className="px-4 pb-3 text-[#5A554D] bg-[#FAF9F5] border-t border-[#EAE5D9]/60 pt-2 leading-relaxed">
                    {product.care}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
