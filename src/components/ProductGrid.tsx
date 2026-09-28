import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { Product, Currency } from '../types';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  currency: Currency;
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: string, color: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  currency,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (activeCategory !== 'all' && p.category !== activeCategory) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.categoryLabel.toLowerCase().includes(q);
          const matchComp = p.composition.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat && !matchComp) {
            return false;
          }
        }
        // In-stock toggle
        if (inStockOnly && !p.inStock) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // featured maintains editorial order
      });
  }, [products, activeCategory, searchQuery, inStockOnly, sortBy]);

  return (
    <section id="collection-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      
      {/* Section Header & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12 border-b border-[#EAE5D9] pb-6">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-[#8A8175] font-medium mb-1.5">
            The Permanent Wardrobe
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#191817]">
            Curated Autumn Editions
          </h2>
        </div>

        {/* Sort & Quick Filter Controls */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-medium">
          <label className="flex items-center gap-2 cursor-pointer text-[#5A554D] hover:text-[#191817] select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="accent-[#191817] rounded-xs cursor-pointer"
            />
            <span className="whitespace-nowrap">In Stock Only</span>
          </label>

          <div className="h-4 w-[1px] bg-[#EAE5D9]" />

          <div className="flex items-center gap-1.5">
            <span className="text-[#8A8175] hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-[#191817] font-medium py-1.5 px-2.5 border border-[#EAE5D9] rounded-xs focus:outline-none focus:border-[#191817] cursor-pointer text-xs"
            >
              <option value="featured">Editorial Curation</option>
              <option value="newest">New Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Bar (Refined buttons, adhering to Zero-Pill rule: clean segmented/underline buttons, no candy chips) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-[#EAE5D9]/50">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all rounded-xs ${
                isActive
                  ? 'bg-[#191817] text-[#FAF9F5] shadow-xs'
                  : 'bg-[#F4F1EA] text-[#5A554D] hover:text-[#191817] hover:bg-[#EAE5D9]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Active Search Notification */}
      {searchQuery.trim() && (
        <div className="mb-6 p-3 bg-[#F4F1EA] border border-[#EAE5D9] flex items-center justify-between text-xs text-[#5A554D]">
          <span>
            Filtering by query: <strong className="text-[#191817]">"{searchQuery}"</strong> ({filteredProducts.length} results)
          </span>
          <button
            onClick={onClearSearch}
            className="flex items-center gap-1 text-[#191817] hover:underline font-medium"
          >
            <X size={14} />
            <span>Clear Filter</span>
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onSelectProduct={onSelectProduct}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#F4F1EA]/50 border border-dashed border-[#DCD4C3] rounded-xs p-8 max-w-lg mx-auto">
          <p className="text-lg font-serif text-[#191817]">No pieces found matching criteria</p>
          <p className="text-xs text-[#8A8175] mt-1.5">Try selecting another collection or clearing search terms.</p>
          <button
            onClick={() => {
              onSelectCategory('all');
              onClearSearch();
            }}
            className="mt-5 inline-flex items-center px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#191817] bg-[#FAF9F5] border border-[#C4B89F] hover:bg-[#191817] hover:text-[#FAF9F5] transition-all rounded-xs"
          >
            View All Pieces
          </button>
        </div>
      )}

      {/* Catalog Metric Adjacency */}
      <div className="mt-14 pt-8 border-t border-[#EAE5D9] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A8175] gap-3">
        <span className="tabular-nums">Displaying {filteredProducts.length} of {products.length} archival pieces</span>
        <div className="flex items-center gap-4">
          <span>Carbon-neutral logistics</span>
          <span aria-hidden="true">·</span>
          <span>Complimentary tailored garment bag</span>
          <span aria-hidden="true">·</span>
          <span>14-day international returns</span>
        </div>
      </div>

    </section>
  );
};
