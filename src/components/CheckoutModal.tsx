import React, { useState } from 'react';
import { X, Check, ShieldCheck, CreditCard, Lock, ArrowRight, Printer } from 'lucide-react';
import { CartItem, Currency } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');
  const [formData, setFormData] = useState({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@atelier-archive.com',
    address: '742 Evergreen Promenade, Suite 4B',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94107',
    country: 'United States',
    paymentMethod: 'card' as 'card' | 'apple' | 'installments',
    cardNumber: '•••• •••• •••• 4289',
    cardExp: '08/29',
    cardCvc: '•••',
  });

  const [orderNumber, setOrderNumber] = useState('');

  // Calculations
  const subtotalUsd = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingUsd = subtotalUsd >= 250 ? 0 : 25;
  const estimatedTaxUsd = subtotalUsd * 0.08;
  const totalUsd = subtotalUsd + shippingUsd + estimatedTaxUsd;

  const format = (usd: number) => `${currency.symbol}${Math.round(usd * currency.rate)}`;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const randomOrder = `MEM-AW26-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(randomOrder);
    setStep('confirmed');
    onClearCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#191817]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF9F5] border border-[#EAE5D9] max-w-3xl w-full my-auto rounded-xs shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EAE5D9] flex items-center justify-between bg-[#F4F1EA]">
          <div className="flex items-center gap-3">
            <span className="text-xl font-serif font-medium tracking-widest uppercase text-[#191817]">
              memosi
            </span>
            <span className="text-[#8A8175] text-xs">/</span>
            <span className="text-xs uppercase tracking-wider text-[#5A554D] font-medium">
              Private Checkout
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#706B62] hover:text-[#191817] hover:bg-[#EAE5D9] rounded-full transition-colors"
            aria-label="Close checkout"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step Indicator */}
        {step !== 'confirmed' && (
          <div className="px-6 py-3 bg-[#FAF9F5] border-b border-[#EAE5D9] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                step === 'shipping' ? 'bg-[#191817] text-[#FAF9F5]' : 'bg-emerald-800 text-white'
              }`}>
                {step === 'payment' ? '✓' : '1'}
              </span>
              <span className={step === 'shipping' ? 'font-semibold text-[#191817]' : 'text-[#706B62]'}>
                Shipping Address
              </span>
            </div>
            <div className="h-[1px] w-12 bg-[#EAE5D9]" />
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                step === 'payment' ? 'bg-[#191817] text-[#FAF9F5]' : 'bg-[#EAE5D9] text-[#706B62]'
              }`}>
                2
              </span>
              <span className={step === 'payment' ? 'font-semibold text-[#191817]' : 'text-[#706B62]'}>
                Payment & Review
              </span>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {/* Step 1: Shipping Address Form */}
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="space-y-5">
              <div>
                <h3 className="text-xl font-serif text-[#191817]">Delivery Information</h3>
                <p className="text-xs text-[#706B62] mt-0.5">
                  Shipments include insured delivery and handcrafted garment bags.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#5A554D] font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#EAE5D9] focus:outline-none focus:border-[#191817] rounded-xs text-[#191817]"
                  />
                </div>
                <div>
                  <label className="block text-[#5A554D] font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#EAE5D9] focus:outline-none focus:border-[#191817] rounded-xs text-[#191817]"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-[#5A554D] font-medium mb-1">Email for Atelier Dispatch Tracking</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#EAE5D9] focus:outline-none focus:border-[#191817] rounded-xs text-[#191817]"
                />
              </div>

              <div className="text-xs">
                <label className="block text-[#5A554D] font-medium mb-1">Street Address & Suite / Apt</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#EAE5D9] focus:outline-none focus:border-[#191817] rounded-xs text-[#191817]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-[#5A554D] font-medium mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#EAE5D9] focus:outline-none focus:border-[#191817] rounded-xs text-[#191817]"
                  />
                </div>
                <div>
                  <label className="block text-[#5A554D] font-medium mb-1">State / Region</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#EAE5D9] focus:outline-none focus:border-[#191817] rounded-xs text-[#191817]"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[#5A554D] font-medium mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#EAE5D9] focus:outline-none focus:border-[#191817] rounded-xs text-[#191817]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#EAE5D9]">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs uppercase tracking-wider text-[#706B62] hover:text-[#191817]"
                >
                  Return to Bag
                </button>
                <button
                  type="submit"
                  className="bg-[#191817] text-[#FAF9F5] hover:bg-[#322E2B] px-7 py-3 text-xs uppercase tracking-widest font-semibold rounded-xs shadow-xs transition-colors flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Payment Method */}
          {step === 'payment' && (
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div>
                <h3 className="text-xl font-serif text-[#191817]">Payment & Atelier Confirmation</h3>
                <p className="text-xs text-[#706B62] mt-0.5">
                  Transactions are 256-bit encrypted with instantaneous order routing.
                </p>
              </div>

              {/* Express Payment Button */}
              <div className="p-3 bg-[#F4F1EA] border border-[#EAE5D9] rounded-xs flex items-center justify-between">
                <div className="text-xs">
                  <p className="font-semibold text-[#191817]">Apple Pay / Google Pay Express</p>
                  <p className="text-[#706B62]">One-touch biometric verification</p>
                </div>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="px-4 py-2 bg-[#191817] text-[#FAF9F5] text-xs font-semibold rounded-xs hover:bg-[#322E2B] transition-colors"
                >
                  Express Buy
                </button>
              </div>

              {/* Payment Methods Tabs */}
              <div className="space-y-3">
                <label className="text-xs font-medium text-[#191817]">Select Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`p-3 text-left border rounded-xs transition-colors text-xs ${
                      formData.paymentMethod === 'card'
                        ? 'border-[#191817] bg-[#FAF9F5] font-semibold'
                        : 'border-[#EAE5D9] bg-[#F4F1EA] text-[#5A554D]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard size={15} />
                      <span>Credit Card</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'installments' })}
                    className={`p-3 text-left border rounded-xs transition-colors text-xs ${
                      formData.paymentMethod === 'installments'
                        ? 'border-[#191817] bg-[#FAF9F5] font-semibold'
                        : 'border-[#EAE5D9] bg-[#F4F1EA] text-[#5A554D]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Lock size={15} />
                      <span>4-Pay ({format(totalUsd / 4)}/mo)</span>
                    </div>
                  </button>
                </div>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="space-y-3 text-xs bg-[#F4F1EA] p-4 rounded-xs border border-[#EAE5D9]">
                  <div>
                    <label className="block text-[#5A554D] font-medium mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#EAE5D9] rounded-xs font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#5A554D] font-medium mb-1">Expiration (MM/YY)</label>
                      <input
                        type="text"
                        required
                        value={formData.cardExp}
                        onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#EAE5D9] rounded-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5A554D] font-medium mb-1">CVC Code</label>
                      <input
                        type="text"
                        required
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#EAE5D9] rounded-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary Line */}
              <div className="border-t border-[#EAE5D9] pt-4 space-y-1.5 text-xs text-[#5A554D]">
                <div className="flex justify-between">
                  <span>Shipping Destination:</span>
                  <span className="text-[#191817] font-medium">{formData.city}, {formData.country}</span>
                </div>
                <div className="flex justify-between font-semibold text-sm text-[#191817] pt-2">
                  <span>Total Amount Authorized:</span>
                  <span className="tabular-nums font-bold">{format(totalUsd)}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs uppercase tracking-wider text-[#706B62] hover:text-[#191817]"
                >
                  Back to Shipping
                </button>
                <button
                  type="submit"
                  className="bg-[#191817] text-[#FAF9F5] hover:bg-[#322E2B] px-8 py-3.5 text-xs uppercase tracking-widest font-semibold rounded-xs shadow-xs transition-colors flex items-center gap-2"
                >
                  <Lock size={13} />
                  <span>Authorize & Place Order ({format(totalUsd)})</span>
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Order Confirmed Screen */}
          {step === 'confirmed' && (
            <div className="text-center py-6 sm:py-10 space-y-6">
              <div className="w-14 h-14 bg-emerald-900 text-[#FAF9F5] rounded-full mx-auto flex items-center justify-center shadow-sm">
                <Check size={28} />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#8A8175] font-semibold">
                  Order Successfully Authenticated
                </span>
                <h3 className="text-3xl font-serif text-[#191817] mt-1">
                  Thank you, {formData.firstName}.
                </h3>
                <p className="text-sm text-[#5A554D] mt-2 max-w-md mx-auto leading-relaxed">
                  Your archival garments are being prepared at our master atelier. 
                  A detailed confirmation and tracking dispatch link have been sent to <strong>{formData.email}</strong>.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-[#F4F1EA] p-6 rounded-xs border border-[#EAE5D9] max-w-md mx-auto text-left text-xs space-y-3">
                <div className="flex justify-between border-b border-[#EAE5D9] pb-2">
                  <span className="text-[#8A8175]">Reference Number:</span>
                  <span className="font-mono font-bold text-[#191817]">{orderNumber}</span>
                </div>
                <div className="flex justify-between border-b border-[#EAE5D9] pb-2">
                  <span className="text-[#8A8175]">Estimated Atelier Delivery:</span>
                  <span className="font-medium text-[#191817]">3 - 5 Business Days</span>
                </div>
                <div className="flex justify-between border-b border-[#EAE5D9] pb-2">
                  <span className="text-[#8A8175]">Shipping Address:</span>
                  <span className="font-medium text-[#191817] text-right">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between pt-1 font-semibold text-sm text-[#191817]">
                  <span>Total Paid:</span>
                  <span className="tabular-nums font-bold">{format(totalUsd)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 border border-[#C4B89F] hover:bg-[#EAE5D9] text-xs uppercase tracking-wider font-medium text-[#191817] rounded-xs transition-colors flex items-center gap-2"
                >
                  <Printer size={14} />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-7 py-2.5 bg-[#191817] text-[#FAF9F5] hover:bg-[#322E2B] text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors"
                >
                  Return to memosi
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
