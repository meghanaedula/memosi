/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, CurrencyCode, Currency } from './types';
import { PRODUCTS, CURRENCIES } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { AtelierStory } from './components/AtelierStory';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';

export default function App() {
  // Products catalog
  const products = PRODUCTS;

  // Currency State
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('USD');
  const currentCurrency = CURRENCIES[currencyCode];

  // Category & Search State
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart State with LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('memosi_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Initial sample piece so new visitors see instant shopping bag functionality
    return [
      {
        id: `${products[1].id}-M-${products[1].colors[0].name}`,
        product: products[1],
        selectedColor: products[1].colors[0].name,
        selectedSize: 'M',
        quantity: 1
      }
    ];
  });

  // Wishlist State with LocalStorage
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('memosi_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [products[0].id, products[3].id];
  });

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('memosi_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('memosi_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  // Cart operations
  const handleAddToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCart((prev) => {
      const itemId = `${product.id}-${size}-${color}`;
      const existingIdx = prev.findIndex((item) => item.id === itemId);

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity
        };
        return next;
      }

      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity
        }
      ];
    });

    // Auto open cart drawer for immediate visual feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleRemoveWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  // Navigations & scroll helpers
  const handleScrollToGrid = () => {
    const el = document.getElementById('collection-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToStory = () => {
    const el = document.getElementById('atelier-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSearchQuery('');
    handleScrollToGrid();
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#191817] selection:bg-[#EAE5D9]">
      {/* Strict 3-zone Top Bar Contract */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        currentCurrency={currentCurrency}
        onSelectCurrency={setCurrencyCode}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={handleSelectCategory}
        activeCategory={activeCategory}
        onScrollToStory={handleScrollToStory}
      />

      <main className="flex-1">
        {/* Campaign Hero Section */}
        <Hero
          onExploreClick={handleScrollToGrid}
          onStoryClick={handleScrollToStory}
        />

        {/* Curated Product Grid */}
        <ProductGrid
          products={products}
          currency={currentCurrency}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickAdd={(p, size, color) => handleAddToCart(p, size, color, 1)}
        />

        {/* Atelier Craftsmanship & Philosophy */}
        <AtelierStory />
      </main>

      {/* Luxury Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onScrollToStory={handleScrollToStory}
        onSelectCurrency={setCurrencyCode}
        activeCurrencyCode={currencyCode}
      />

      {/* Modals and Drawers */}
      <ProductModal
        product={selectedProduct}
        currency={currentCurrency}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        currency={currentCurrency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={wishlistedProducts}
        currency={currentCurrency}
        onRemoveWishlist={handleRemoveWishlist}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={handleAddToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        currency={currentCurrency}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        currency={currentCurrency}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
