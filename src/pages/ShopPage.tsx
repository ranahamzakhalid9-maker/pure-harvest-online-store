import { useState, useMemo } from 'react';
import { Star, Heart, ShoppingCart, LayoutGrid, List, SlidersHorizontal, ChevronRight, Wheat, Sprout, Droplets } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import HeroBasketScene from '../components/HeroBasketScene';
import TrustStrip from '../components/TrustStrip';

interface ShopPageProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  initialCategory?: string;
}

const CATEGORY_ITEMS = [
  { name: 'All Products', count: 5, slug: 'all', icon: LayoutGrid },
  { name: 'Flour & Atta', count: 3, slug: 'flour', icon: Wheat },
  { name: 'Grains & Pulses', count: 1, slug: 'pulses', icon: Sprout },
  { name: 'Organic Ghee', count: 1, slug: 'ghee', icon: Droplets }
];

export default function ShopPage({
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  initialCategory = 'all'
}: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'flour' && p.categorySlug !== 'flour') return false;
        if (selectedCategory === 'pulses' && p.categorySlug !== 'pulses') return false;
        if (selectedCategory === 'ghee' && p.categorySlug !== 'ghee') return false;
      }

      // Price filter
      if (p.price > priceRange) return false;

      // Rating filter
      if (selectedRating !== null && Math.floor(p.rating) < selectedRating) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, priceRange, selectedRating, sortBy]);

  return (
    <div className="w-full min-h-screen">
      {/* 1. Shop Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6">
        <div className="bg-[#f7f4eb]/80 border border-[#eee7d8] rounded-3xl sm:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Breadcrumb & Title */}
          <div className="max-w-xl text-center lg:text-left z-10">
            <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-semibold text-[#687a66] mb-3">
              <span className="hover:text-[#386b29] cursor-pointer">Home</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#386b29]">Shop</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#162915] leading-tight mb-3">
              Our Products
            </h1>

            <p className="text-sm sm:text-base text-[#596d58] leading-relaxed">
              Explore our wide range of 100% organic products, grown with care and delivered fresh.
            </p>
          </div>

          {/* Hero Wicker Basket Scene */}
          <div className="w-full lg:w-auto flex justify-center">
            <HeroBasketScene />
          </div>
        </div>
      </section>

      {/* 2. Main Shop Area */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden col-span-1 flex justify-between items-center bg-white p-4 rounded-2xl border border-[#ede7d8]">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="flex items-center gap-2 text-sm font-semibold text-[#1c2e1f]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#386b29]" />
              {mobileFilterOpen ? 'Hide Filters' : 'Show Filter Options'}
            </button>
            <span className="text-xs text-[#718270]">
              {filteredProducts.length} items found
            </span>
          </div>

          {/* Left Filter & Category Sidebar (3 cols) */}
          <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            
            {/* Category Panel */}
            <div className="bg-white rounded-3xl p-6 border border-[#ece6d7] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#f3efe4]">
                <div className="w-1.5 h-4 bg-[#386b29] rounded-full" />
                <h3 className="font-bold text-[#162915] text-[16px]">Categories</h3>
              </div>

              <div className="space-y-1">
                {CATEGORY_ITEMS.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                        isSelected
                          ? 'bg-[#eef6ec] text-[#386b29] font-semibold shadow-2xs'
                          : 'text-[#445343] hover:bg-[#faf7f0] hover:text-[#182a17]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-[#386b29]' : 'text-[#7d8f7b]'}`} />
                        <span>{cat.name}</span>
                      </div>
                      <span className={`text-[12px] ${isSelected ? 'text-[#386b29] font-bold' : 'text-[#96a495]'}`}>
                        {cat.count < 10 ? `0${cat.count}` : cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter By Panel */}
            <div className="bg-white rounded-3xl p-6 border border-[#ece6d7] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#f3efe4]">
                <div className="w-1.5 h-4 bg-[#386b29] rounded-full" />
                <h3 className="font-bold text-[#162915] text-[16px]">Filter By</h3>
              </div>

              {/* Price Range Slider */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#637761] mb-2">
                  Price Range
                </label>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#386b29] cursor-pointer"
                />
                <div className="flex items-center justify-between text-xs font-semibold text-[#182a17] mt-2">
                  <span>Rs. 200</span>
                  <span className="text-[#386b29] bg-[#eef6ec] px-2.5 py-1 rounded-md">
                    Up to Rs. {priceRange.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Ratings Filter */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#637761] mb-2.5">
                  Ratings
                </label>
                <div className="space-y-1.5">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <button
                      key={stars}
                      onClick={() => setSelectedRating(selectedRating === stars ? null : stars)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                        selectedRating === stars ? 'bg-[#eef6ec] text-[#386b29] font-bold' : 'hover:bg-[#faf7f0]'
                      }`}
                    >
                      <div className="flex items-center gap-1 text-[#f5a623]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < stars ? 'fill-current' : 'text-[#ded7c8]'}`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#909f8f]">
                        {stars === 5 ? '(12)' : stars === 4 ? '(08)' : stars === 3 ? '(03)' : '(01)'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Apply Filters Button */}
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-[#386b29] hover:bg-[#2d5621] text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>APPLY FILTERS</span>
              </button>
            </div>
          </aside>

          {/* Right Product Grid Area (9 cols) */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Header bar: Count, Sort Dropdown & View Mode */}
            <div className="bg-white rounded-2xl p-4 sm:px-6 sm:py-3.5 border border-[#ece6d7] flex flex-wrap items-center justify-between gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <div className="text-xs sm:text-sm font-medium text-[#5c6e5a]">
                Showing <span className="font-bold text-[#162915]">1–{filteredProducts.length}</span> of 24 results
              </div>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#718270] font-medium hidden sm:inline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs sm:text-sm font-semibold text-[#182a17] bg-[#fbf9f4] border border-[#e3dccf] rounded-xl px-3 py-2 focus:outline-none focus:border-[#386b29]"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>

                {/* Grid / List View Toggle */}
                <div className="flex items-center gap-1 bg-[#fbf9f4] p-1 rounded-xl border border-[#e3dccf]">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-[#386b29] text-white shadow-2xs' : 'text-[#6c7d6a] hover:text-[#182a17]'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-[#386b29] text-white shadow-2xs' : 'text-[#6c7d6a] hover:text-[#182a17]'
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Cards */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlistIds.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-3xl p-4 sm:p-5 border border-[#ede7d8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_36px_rgba(56,107,41,0.1)] transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1"
                    >
                      {/* Top: Wishlist button & Image container */}
                      <div className="relative aspect-square w-full rounded-2xl bg-[#fbf9f4] border border-[#f3efe5] p-3 flex items-center justify-center overflow-hidden mb-3.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(product.id);
                          }}
                          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs border border-[#e8e2d4] flex items-center justify-center transition-all ${
                            isWishlisted
                              ? 'text-[#d63031] bg-red-50 border-red-200 shadow-xs'
                              : 'text-[#6b7c69] hover:text-[#d63031] hover:bg-white'
                          }`}
                          title="Wishlist"
                        >
                          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-[#d63031]' : ''}`} />
                        </button>

                        <img
                          src={product.image}
                          alt={product.name}
                          onClick={() => onSelectProduct(product)}
                          className="w-full h-full object-contain cursor-pointer transition-transform duration-500 group-hover:scale-108 group-hover:-translate-y-1"
                        />
                      </div>

                      {/* Middle: Name, Rating & Prices */}
                      <div className="mb-4">
                        <h4
                          onClick={() => onSelectProduct(product)}
                          className="font-bold text-[#162915] text-[15px] hover:text-[#386b29] transition-colors cursor-pointer leading-snug line-clamp-1"
                        >
                          {product.name}
                        </h4>

                        {/* Rating stars & review count */}
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <div className="flex text-[#f5a623]">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-[#e2dbce]'}`}
                              />
                            ))}
                          </div>
                          <span className="text-[11px] text-[#869784]">
                            ({product.reviewsCount})
                          </span>
                        </div>

                        {/* Pricing */}
                        <div className="flex items-baseline gap-2 mt-2">
                          {product.originalPrice && (
                            <span className="text-xs text-[#9aa798] line-through font-normal">
                              Rs. {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                          <span className="text-base font-extrabold text-[#386b29]">
                            Rs. {product.price.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Bottom: Add to Cart Button */}
                      <button
                        onClick={() => onAddToCart(product, 1)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#386b29] hover:bg-[#2c5520] text-white font-semibold text-xs sm:text-[13px] flex items-center justify-between shadow-xs hover:shadow-md transition-all active:scale-98"
                      >
                        <span>Add to Cart</span>
                        <ShoppingCart className="w-3.5 h-3.5 stroke-[2.2]" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List View Mode */
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-3xl p-5 border border-[#ede7d8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center gap-6 group hover:border-[#c9e4c3] transition-all"
                  >
                    <div className="w-32 h-32 rounded-2xl bg-[#fbf9f4] border border-[#f3efe5] p-2 flex items-center justify-center shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        onClick={() => onSelectProduct(product)}
                        className="w-full h-full object-contain cursor-pointer transition-transform group-hover:scale-105"
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <h4
                        onClick={() => onSelectProduct(product)}
                        className="font-bold text-[#162915] text-lg hover:text-[#386b29] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#6e806c] line-clamp-2 mt-1">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-2">
                        <div className="flex text-[#f5a623]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs text-[#869784]">({product.reviewsCount} reviews)</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
                      <div className="text-right">
                        {product.originalPrice && (
                          <div className="text-xs text-[#9aa798] line-through">
                            Rs. {product.originalPrice.toLocaleString()}
                          </div>
                        )}
                        <div className="text-xl font-bold text-[#386b29]">
                          Rs. {product.price.toLocaleString()}
                        </div>
                      </div>
                      <button
                        onClick={() => onAddToCart(product, 1)}
                        className="py-2 px-5 rounded-xl bg-[#386b29] hover:bg-[#2c5520] text-white font-semibold text-xs flex items-center gap-2 shadow-xs"
                      >
                        <span>Add to Cart</span>
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 12. Pagination matching reference: ← 1 2 3 → */}
            <div className="flex items-center justify-center gap-2 pt-6 pb-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="w-9 h-9 rounded-full bg-white border border-[#e5ded0] text-[#556753] hover:bg-[#f4efe4] flex items-center justify-center text-sm font-bold transition-colors"
                aria-label="Previous Page"
              >
                ←
              </button>
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-9 h-9 rounded-full text-xs font-bold transition-all ${
                    currentPage === num
                      ? 'bg-[#386b29] text-white shadow-sm scale-105'
                      : 'bg-white border border-[#e5ded0] text-[#445542] hover:bg-[#f4efe4]'
                  }`}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
                className="w-9 h-9 rounded-full bg-white border border-[#e5ded0] text-[#556753] hover:bg-[#f4efe4] flex items-center justify-center text-sm font-bold transition-colors"
                aria-label="Next Page"
              >
                →
              </button>
            </div>
          </main>
        </div>
      </section>

      {/* 13. Trust Strip */}
      <TrustStrip />
    </div>
  );
}
