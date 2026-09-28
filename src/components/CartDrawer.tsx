import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, Check } from 'lucide-react';
import { CartItem, Currency } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  if (!isOpen) return null;

  // Subtotal in base USD
  const subtotalUsd = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Free shipping threshold: $250
  const freeShippingThresholdUsd = 250;
  const progressToFreeShipping = Math.min(100, (subtotalUsd / freeShippingThresholdUsd) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThresholdUsd - subtotalUsd);

  // Discount calculation
  const discountUsd = (subtotalUsd * discountPercent) / 100;
  const shippingUsd = subtotalUsd >= freeShippingThresholdUsd || items.length === 0 ? 0 : 25;
  const estimatedTaxUsd = (subtotalUsd - discountUsd) * 0.08;
  const totalUsd = Math.max(0, subtotalUsd - discountUsd + shippingUsd + estimatedTaxUsd);

  // Formatted in currency
  const format = (usd: number) => `${currency.symbol}${Math.round(usd * currency.rate)}`;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'MEMOSI10') {
      setDiscountPercent(10);
      setAppliedPromo('MEMOSI10 (10% Privileged Atelier Discount)');
      setPromoCode('');
    } else if (code === 'VIP15') {
      setDiscountPercent(15);
      setAppliedPromo('VIP15 (15% Private Client Discount)');
      setPromoCode('');
    } else {
      setPromoError('Invalid privilege code. Try MEMOSI10');
    }
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
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#EAE5D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-serif font-medium text-[#191817]">Shopping Bag</h3>
            <span className="text-xs text-[#8A8175] font-sans tabular-nums">
              ({items.reduce((acc, it) => acc + it.quantity, 0)} {items.length === 1 ? 'piece' : 'pieces'})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#706B62] hover:text-[#191817] hover:bg-[#EAE5D9] transition-colors"
            aria-label="Close cart drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F4F1EA] px-6 py-3 border-b border-[#EAE5D9] text-xs">
          {remainingForFreeShipping > 0 ? (
            <p className="text-[#5A554D]">
              Add <span className="font-semibold text-[#191817] tabular-nums">{format(remainingForFreeShipping)}</span> more for complimentary worldwide shipping.
            </p>
          ) : (
            <p className="text-emerald-800 font-medium flex items-center gap-1.5">
              <Check size={14} className="text-emerald-700" />
              <span>You have unlocked complimentary carbon-neutral shipping!</span>
            </p>
          )}
          <div className="w-full bg-[#EAE5D9] h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-[#191817] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Itemized List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <p className="text-lg font-serif text-[#191817]">Your bag is currently empty</p>
              <p className="text-xs text-[#706B62] max-w-xs mx-auto">
                Explore our curated tailoring and cashmere collections to curate your essential wardrobe.
              </p>
              <button
                onClick={onClose}
                className="mt-4 inline-flex items-center px-6 py-2.5 bg-[#191817] text-[#FAF9F5] text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-[#322E2B] transition-colors"
              >
                Discover Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div 
                key={item.id}
                className="flex gap-4 pb-6 border-b border-[#EAE5D9]/80 items-start"
              >
                {/* Thumbnail */}
                <div className="w-20 aspect-[3/4] bg-[#F4F1EA] rounded-xs overflow-hidden border border-[#EAE5D9] flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-serif font-medium text-[#191817] truncate pr-2">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#8A8175] hover:text-red-700 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <p className="text-xs text-[#706B62] mt-0.5">
                    {item.selectedColor} · Size {item.selectedSize}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#EAE5D9] rounded-xs bg-[#FAF9F5]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-1 text-xs text-[#5A554D] hover:bg-[#EAE5D9] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-semibold tabular-nums text-[#191817]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-1 text-xs text-[#5A554D] hover:bg-[#EAE5D9] transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Line total */}
                    <span className="text-sm font-semibold font-sans tabular-nums text-[#191817]">
                      {format(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Order Summary */}
        {items.length > 0 && (
          <div className="p-6 bg-[#F4F1EA] border-t border-[#EAE5D9] space-y-4">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Privilege code (e.g. MEMOSI10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-[#FAF9F5] border border-[#EAE5D9] focus:outline-none focus:border-[#191817] uppercase tracking-wider rounded-xs text-[#191817]"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#FAF9F5] hover:bg-[#191817] hover:text-[#FAF9F5] border border-[#C4B89F] text-xs font-medium uppercase tracking-wider transition-colors rounded-xs"
                >
                  Apply
                </button>
              </div>

              {promoError && (
                <p className="text-[11px] text-red-700">{promoError}</p>
              )}
              {appliedPromo && (
                <p className="text-[11px] text-emerald-800 font-medium flex items-center gap-1">
                  <Tag size={12} />
                  <span>{appliedPromo}</span>
                </p>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs border-t border-[#EAE5D9] pt-3 text-[#5A554D]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#191817] tabular-nums">{format(subtotalUsd)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Privilege Savings ({discountPercent}%)</span>
                  <span className="tabular-nums">-{format(discountUsd)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Carbon-Neutral Shipping</span>
                <span className="font-medium text-[#191817] tabular-nums">
                  {shippingUsd === 0 ? 'Complimentary' : format(shippingUsd)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax</span>
                <span className="font-medium text-[#191817] tabular-nums">{format(estimatedTaxUsd)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#191817] border-t border-[#EAE5D9] pt-2">
                <span>Estimated Total</span>
                <span className="tabular-nums font-bold">{format(totalUsd)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full bg-[#191817] text-[#FAF9F5] hover:bg-[#322E2B] py-3.5 px-6 text-xs uppercase tracking-widest font-semibold rounded-xs shadow-xs transition-all flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#8A8175] uppercase tracking-wider">
              <ShieldCheck size={12} />
              <span>Encrypted Checkout · 14-Day Atelier Returns</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
