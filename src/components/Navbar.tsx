import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, Check } from 'lucide-react';
import { CurrencyCode, Currency } from '../types';
import { CURRENCIES } from '../data/products';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  currentCurrency: Currency;
  onSelectCurrency: (code: CurrencyCode) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (categoryId: string) => void;
  activeCategory: string;
  onScrollToStory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  currentCurrency,
  onSelectCurrency,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onSelectCategory,
  activeCategory,
  onScrollToStory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const navLinks = [
    { id: 'all', label: 'New Arrivals' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'knitwear', label: 'Knitwear' },
    { id: 'tailoring', label: 'Tailoring' },
    { id: 'dresses', label: 'Silk & Dresses' },
  ];

  const handleNavClick = (id: string) => {
    onSelectCategory(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#EAE5D9] transition-all">
      {/* Slim Top Announcement Banner */}
      {!bannerDismissed && (
        <div className="bg-[#191817] text-[#FAF9F5] text-[11px] tracking-widest uppercase py-2 px-4 flex items-center justify-between text-center transition-all">
          <div className="w-6 hidden md:block"></div>
          <p className="flex-1 font-medium">
            Complimentary climate-neutral delivery on orders over $250 · Autumn/Winter Edition 03
          </p>
          <button
            onClick={() => setBannerDismissed(true)}
            className="text-[#FAF9F5]/60 hover:text-[#FAF9F5] p-1 transition-colors"
            aria-label="Dismiss banner"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Main Top Bar: Strict 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Zone 1: Single element brand wordmark */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#191817] p-2 hover:bg-[#EAE5D9]/50 transition-colors rounded-sm"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-2xl sm:text-3xl font-serif tracking-[0.2em] font-medium uppercase text-[#191817] hover:opacity-85 transition-opacity"
          >
            memosi
          </a>
        </div>

        {/* Zone 2: 4-6 Clean navigation links (Single line, text only, subtle underline) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-xs uppercase tracking-widest font-medium text-[#4A453E]">
          {navLinks.map((link) => {
            const isActive = activeCategory === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative py-1 whitespace-nowrap transition-colors ${
                  isActive ? 'text-[#191817] font-semibold' : 'hover:text-[#191817]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#191817]" />
                )}
              </button>
            );
          })}
          <button
            onClick={onScrollToStory}
            className="py-1 whitespace-nowrap hover:text-[#191817] transition-colors"
          >
            The Atelier
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary actions & functional controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1 text-xs tracking-wider font-medium text-[#4A453E] hover:text-[#191817] py-1.5 px-2 rounded hover:bg-[#EAE5D9]/50 transition-colors"
              aria-label="Select currency"
            >
              <span>{currentCurrency.code}</span>
              <ChevronDown size={12} className={currencyDropdownOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-[#FAF9F5] border border-[#EAE5D9] shadow-lg rounded-sm py-1 z-50 animate-in fade-in slide-in-from-top-1">
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => {
                      onSelectCurrency(code);
                      setCurrencyDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#EAE5D9]/60 text-[#191817] transition-colors"
                  >
                    <span>{CURRENCIES[code].symbol} {code}</span>
                    {currentCurrency.code === code && <Check size={12} className="text-[#191817]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search affordance */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#191817] hover:text-[#4A453E] hover:bg-[#EAE5D9]/50 rounded-full transition-colors"
            aria-label="Search garments"
          >
            <Search size={18} strokeWidth={1.75} />
          </button>

          {/* Wishlist button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#191817] hover:text-[#4A453E] hover:bg-[#EAE5D9]/50 rounded-full transition-colors"
            aria-label="View saved pieces"
          >
            <Heart size={18} strokeWidth={1.75} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#191817] text-[#FAF9F5] text-[10px] font-medium flex items-center justify-center rounded-full tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#191817] text-[#FAF9F5] hover:bg-[#322E2B] px-3.5 sm:px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all rounded-sm shadow-xs"
            aria-label="Open shopping bag"
          >
            <ShoppingBag size={15} strokeWidth={1.75} />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums font-semibold">({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F5] border-b border-[#EAE5D9] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-[#8A8175] font-semibold">Collections</p>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left text-base font-serif tracking-wide py-1.5 transition-colors ${
                  activeCategory === link.id ? 'text-[#191817] font-semibold pl-2 border-l-2 border-[#191817]' : 'text-[#4A453E]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                onScrollToStory();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-base font-serif tracking-wide py-1.5 text-[#4A453E]"
            >
              The Atelier & Philosophy
            </button>
          </div>

          <div className="pt-4 border-t border-[#EAE5D9] flex items-center justify-between text-xs text-[#8A8175]">
            <span>Currency: {currentCurrency.symbol} {currentCurrency.code}</span>
            <button
              onClick={() => {
                onOpenSearch();
                setMobileMenuOpen(false);
              }}
              className="underline text-[#191817]"
            >
              Search Catalog
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
