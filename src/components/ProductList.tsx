import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { 
  Filter, 
  RotateCcw, 
  ShieldCheck, 
  SlidersHorizontal, 
  Timer, 
  Sparkles, 
} from 'lucide-react';

export const ProductList: React.FC = React.memo(() => {
  const { products, filters, setFilters, resetFilters } = useStore();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Dynamic countdown timer for "Deals of the Day"
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 24, seconds: 18 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Extract unique brands
  const allBrands = useMemo(() => {
    const brandSet = new Set<string>();
    products.forEach((p) => {
      if (p.brand) brandSet.add(p.brand);
    });
    return Array.from(brandSet).sort();
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (filters.category && filters.category !== 'all' && p.category !== filters.category) {
          return false;
        }
        // Search query
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          if (!matchTitle && !matchBrand && !matchCat && !matchDesc) return false;
        }
        // Price range
        if (p.price < filters.minPrice || p.price > filters.maxPrice) {
          return false;
        }
        // Rating
        if (filters.rating > 0 && p.rating < filters.rating) {
          return false;
        }
        // Assured only
        if (filters.isAssuredOnly && !p.isAssured) {
          return false;
        }
        // In stock only
        if (filters.inStockOnly && !p.inStock) {
          return false;
        }
        // Brand filter
        if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return b.id.localeCompare(a.id);
          case 'relevance':
          default:
            return b.ratingCount - a.ratingCount;
        }
      });
  }, [products, filters]);

  const handleBrandToggle = useCallback((brand: string) => {
    setFilters((prev) => {
      const exists = prev.brands.includes(brand);
      return {
        ...prev,
        brands: exists ? prev.brands.filter((b) => b !== brand) : [...prev.brands, brand],
      };
    });
  }, [setFilters]);

  const activeFilterCount =
    (filters.category !== 'all' ? 1 : 0) +
    (filters.searchQuery ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0) +
    (filters.isAssuredOnly ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.maxPrice < 200000 ? 1 : 0) +
    filters.brands.length;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4">
      {/* Deals of the Day Flash Strip */}
      <div className="bg-white rounded-t border border-b-0 border-gray-200 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-rose-600 font-extrabold text-sm sm:text-base">
            <Sparkles className="w-5 h-5 fill-rose-600" />
            <span>Deals of the Day</span>
          </div>
          <div className="flex items-center gap-1 bg-rose-50 text-rose-700 text-xs font-bold px-2 py-0.5 rounded border border-rose-200">
            <Timer className="w-3.5 h-3.5" />
            <span>
              {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s Left
            </span>
          </div>
        </div>

        <div className="text-xs text-gray-500 font-medium">
          Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> items
          {filters.searchQuery && (
            <span> for "<strong className="text-[#2874f0]">{filters.searchQuery}</strong>"</span>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Mobile Filter Toggle */}
        <div className="w-full lg:hidden flex items-center justify-between bg-white p-3 rounded border border-gray-200">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 text-xs font-bold text-[#2874f0] cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters ({activeFilterCount})</span>
          </button>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-rose-600 font-semibold hover:underline cursor-pointer"
            >
              Reset All
            </button>
          )}
        </div>

        {/* Sidebar Filters */}
        <aside
          id="product-filters-sidebar"
          className={`w-full lg:w-64 bg-white rounded border border-gray-200 p-4 shadow-xs shrink-0 space-y-5 ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-700" />
              <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide">Filters</h3>
            </div>
            {activeFilterCount > 0 && (
              <button
                type="button"
                id="reset-filters-btn"
                onClick={resetFilters}
                className="text-xs text-[#2874f0] hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Clear All
              </button>
            )}
          </div>

          {/* Flipkart Assured Filter */}
          <div className="border-b pb-4">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                id="filter-assured-checkbox"
                checked={filters.isAssuredOnly}
                onChange={(e) => setFilters((prev) => ({ ...prev, isAssuredOnly: e.target.checked }))}
                className="w-4 h-4 text-[#2874f0] rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#2874f0]" /> Flipkart Plus Assured
              </span>
            </label>
          </div>

          {/* Price Range Slider */}
          <div className="border-b pb-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-800 uppercase">Max Price</span>
              <span className="text-xs font-bold text-[#2874f0]">
                ₹{filters.maxPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              id="filter-price-slider"
              min="1000"
              max="200000"
              step="1000"
              value={filters.maxPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2874f0]"
            />
            <div className="flex items-center justify-between text-[10px] text-gray-400 font-semibold">
              <span>₹1,000</span>
              <span>₹2,00,000</span>
            </div>
          </div>

          {/* Customer Rating Filter */}
          <div className="border-b pb-4 space-y-2">
            <span className="text-xs font-bold text-gray-800 uppercase block">Customer Rating</span>
            <div className="space-y-1.5">
              {[4, 3, 2].map((r) => (
                <label
                  key={r}
                  className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-gray-900"
                >
                  <input
                    type="radio"
                    name="rating-filter"
                    id={`filter-rating-${r}`}
                    checked={filters.rating === r}
                    onChange={() => setFilters((prev) => ({ ...prev, rating: prev.rating === r ? 0 : r }))}
                    className="w-3.5 h-3.5 text-[#2874f0] focus:ring-blue-400"
                  />
                  <span className="flex items-center gap-1 font-medium">
                    {r}★ &amp; above
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          {allBrands.length > 0 && (
            <div className="border-b pb-4 space-y-2">
              <span className="text-xs font-bold text-gray-800 uppercase block">Brand</span>
              <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                {allBrands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-gray-900"
                  >
                    <input
                      type="checkbox"
                      id={`filter-brand-${brand.toLowerCase()}`}
                      checked={filters.brands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="w-3.5 h-3.5 text-[#2874f0] rounded border-gray-300 focus:ring-blue-400"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Availability */}
          <div>
            <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                id="filter-instock-checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))}
                className="w-3.5 h-3.5 text-[#2874f0] rounded border-gray-300"
              />
              <span>Exclude Out of Stock</span>
            </label>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 w-full space-y-4">
          {/* Sorting Toolbar */}
          <div className="bg-white rounded border border-gray-200 px-4 py-2.5 flex items-center justify-between flex-wrap gap-2 text-xs shadow-xs">
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
              <span className="font-bold text-gray-800 shrink-0 uppercase tracking-wider text-[11px]">
                Sort By
              </span>
              {[
                { id: 'relevance', label: 'Relevance' },
                { id: 'price_asc', label: 'Price -- Low to High' },
                { id: 'price_desc', label: 'Price -- High to Low' },
                { id: 'rating', label: 'Customer Rating' },
                { id: 'newest', label: 'Newest First' },
              ].map((sortOption) => (
                <button
                  key={sortOption.id}
                  type="button"
                  id={`sort-${sortOption.id}`}
                  onClick={() => setFilters((prev) => ({ ...prev, sortBy: sortOption.id as any }))}
                  className={`font-semibold py-1 px-2.5 rounded transition-all whitespace-nowrap cursor-pointer ${
                    filters.sortBy === sortOption.id
                      ? 'text-[#2874f0] border-b-2 border-[#2874f0] font-bold bg-blue-50/50'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {sortOption.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-gray-500 font-semibold">Active:</span>
              {filters.category !== 'all' && (
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  Category: {filters.category}
                </span>
              )}
              {filters.isAssuredOnly && (
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">
                  Flipkart Assured
                </span>
              )}
              {filters.rating > 0 && (
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                  {filters.rating}★+
                </span>
              )}
              {filters.brands.map((b) => (
                <span key={b} className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full font-medium">
                  Brand: {b}
                </span>
              ))}
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div 
              id="products-grid"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div 
              id="empty-search-state"
              className="bg-white rounded border border-gray-200 p-12 text-center space-y-4 shadow-xs"
            >
              <div className="w-16 h-16 bg-blue-50 text-[#2874f0] rounded-full flex items-center justify-center mx-auto">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No products match your filters</h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                Try adjusting your price range, selecting different categories, or clearing active filters to see all products.
              </p>
              <button
                type="button"
                id="empty-state-reset-btn"
                onClick={resetFilters}
                className="bg-[#2874f0] hover:bg-blue-700 text-white font-bold px-6 py-2 rounded text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
});
ProductList.displayName = 'ProductList';

