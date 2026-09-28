import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { CurrencyCode } from '../types';

interface FooterProps {
  onSelectCategory: (categoryId: string) => void;
  onScrollToStory: () => void;
  onSelectCurrency: (code: CurrencyCode) => void;
  activeCurrencyCode: CurrencyCode;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onScrollToStory,
  onSelectCurrency,
  activeCurrencyCode
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#FAF9F5] border-t border-[#EAE5D9] text-[#191817]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              className="text-2xl font-serif tracking-[0.2em] uppercase text-[#191817] font-semibold"
            >
              memosi
            </a>
            <p className="text-sm text-[#5A554D] max-w-sm leading-relaxed font-light">
              Contemporary luxury wardrobe essentials cut from natural fibers, shaped with architectural restraint, and tailored for lifelong permanence.
            </p>
            <div className="pt-2 text-xs text-[#8A8175] space-y-1">
              <p>Atelier & Design Studio: Via Manzoni 14, Milan</p>
              <p>Logistics & Dispatch: Biella, Italy & Tokyo</p>
            </div>
          </div>

          {/* Collections Column */}
          <div className="space-y-3 text-xs">
            <p className="font-semibold uppercase tracking-widest text-[#191817]">Wardrobe</p>
            <ul className="space-y-2 text-[#5A554D]">
              <li>
                <button
                  onClick={() => onSelectCategory('outerwear')}
                  className="hover:text-[#191817] transition-colors"
                >
                  Coats & Outerwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('knitwear')}
                  className="hover:text-[#191817] transition-colors"
                >
                  Mongolian Cashmere
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('tailoring')}
                  className="hover:text-[#191817] transition-colors"
                >
                  Architectural Tailoring
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('dresses')}
                  className="hover:text-[#191817] transition-colors"
                >
                  Pure Silk Charmeuse
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('trousers')}
                  className="hover:text-[#191817] transition-colors"
                >
                  Belgian Linen Trousers
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier Services */}
          <div className="space-y-3 text-xs">
            <p className="font-semibold uppercase tracking-widest text-[#191817]">Client Concierge</p>
            <ul className="space-y-2 text-[#5A554D]">
              <li>
                <button onClick={onScrollToStory} className="hover:text-[#191817] transition-colors">
                  The Atelier Manifesto
                </button>
              </li>
              <li>
                <span className="hover:text-[#191817] cursor-pointer transition-colors">
                  Lifetime Repair Program
                </span>
              </li>
              <li>
                <span className="hover:text-[#191817] cursor-pointer transition-colors">
                  Complimentary Carbon-Neutral Shipping
                </span>
              </li>
              <li>
                <span className="hover:text-[#191817] cursor-pointer transition-colors">
                  International Duties Paid
                </span>
              </li>
              <li>
                <span className="hover:text-[#191817] cursor-pointer transition-colors">
                  Private Styling Consultation
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Private Dispatch */}
          <div className="space-y-3 text-xs">
            <p className="font-semibold uppercase tracking-widest text-[#191817]">Private Gazette</p>
            <p className="text-[#5A554D] leading-relaxed font-light">
              Receive private previews of limited edition releases and textile research notes.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="flex border-b border-[#191817] pb-1">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#191817] placeholder-[#8A8175] focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-1 hover:translate-x-1 transition-transform text-[#191817]"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight size={14} />
                </button>
              </div>

              {subscribed && (
                <p className="text-emerald-800 text-[11px] font-medium flex items-center gap-1 pt-1 animate-in fade-in">
                  <Check size={12} />
                  <span>Welcome to the memosi private client register.</span>
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar: Clean copyright, currency, and legal */}
        <div className="mt-14 pt-8 border-t border-[#EAE5D9] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A8175] gap-4">
          <div className="flex items-center gap-4">
            <span className="font-serif">memosi © 2026</span>
            <span aria-hidden="true">·</span>
            <span>All Rights Reserved</span>
            <span aria-hidden="true">·</span>
            <span className="hover:underline cursor-pointer">Terms of Trade</span>
            <span aria-hidden="true">·</span>
            <span className="hover:underline cursor-pointer">Privacy & Traceability</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-wider">Currency:</span>
            {(['USD', 'EUR', 'GBP'] as CurrencyCode[]).map((c) => (
              <button
                key={c}
                onClick={() => onSelectCurrency(c)}
                className={`text-[11px] font-medium tracking-wider px-1.5 py-0.5 rounded-xs transition-colors ${
                  activeCurrencyCode === c
                    ? 'bg-[#191817] text-[#FAF9F5]'
                    : 'text-[#5A554D] hover:text-[#191817]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};
