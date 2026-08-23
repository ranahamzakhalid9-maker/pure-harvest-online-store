import { useState, useMemo } from 'react';
import { Star, Heart, ShoppingCart, LayoutGrid, List, SlidersHorizontal, ChevronRight, Wheat, Sprout, Droplets, RotateCcw, MessageCircle } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import HeroBasketScene from '../components/HeroBasketScene';
import TrustStrip from '../components/TrustStrip';
import { openWhatsAppChat, generateProductWhatsAppMessage } from '../utils/whatsapp';

interface ShopPageProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  initialCategory?: string;
}

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
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Dynamic Category definitions based on real PRODUCTS data
  const categoryItems = useMemo(() => {
    const counts = {
      all: PRODUCTS.length,
      flour: PRODUCTS.filter((p) => p.categorySlug === 'flour').length,
      ghee: PRODUCTS.filter((p) => p.categorySlug === 'ghee').length
    };

    return [
      { name: 'All Products', count: counts.all, slug: 'all', icon: LayoutGrid },
      { name: 'Flour & Atta', count: counts.flour, slug: 'flour', icon: Wheat },
      { name: 'Organic Desi Ghee', count: counts.ghee, slug: 'ghee', icon: Droplets }
    ];
  }, []);

  // Dynamic Ratings counts from real PRODUCTS data
  const ratingCounts = useMemo(() => {
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    PRODUCTS.forEach((p) => {
      const star = Math.floor(p.rating);
      if (counts[star] !== undefined) {
        counts[star]++;
      }
    });
    return counts;
  }, []);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
        return false;
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
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // featured default
    });
  }, [selectedCategory, priceRange, selectedRating, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setPriceRange(5000);
    setSelectedRating(null);
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'all' || priceRange < 5000 || selectedRating !== null;

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
              Our Harvest
            </h1>

            <p className="text-sm sm:text-base text-[#596d58] leading-relaxed">
              Explore our freshly milled chakki flours, washed lentils, and pure bilona desi ghee — 100% natural and unadulterated.
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
          <div className="lg:hidden col-span-1 flex justify-between items-center bg-white p-4 rounded-2xl border border-[#ede7d8] shadow-xs">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="flex items-center gap-2 text-sm font-bold text-[#1c2e1f]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#386b29]" />
              {mobileFilterOpen ? 'Hide Filters' : 'Filter Products'}
            </button>
            <span className="text-xs font-semibold text-[#386b29] bg-[#eef6ec] px-2.5 py-1 rounded-full">
              {filteredProducts.length} available
            </span>
          </div>

          {/* Left Filter & Category Sidebar (3 cols) */}
          <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            
            {/* Category Panel */}
            <div className="bg-white rounded-3xl p-6 border border-[#ece6d7] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f3efe4]">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-[#386b29] rounded-full" />
                  <h3 className="font-bold text-[#162915] text-[16px]">Categories</h3>
                </div>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-xs text-[#386b29] hover:underline font-semibold"
                  >
                    View All
                  </button>
                )}
              </div>

              <div className="space-y-1">
                {categoryItems.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                        isSelected
                          ? 'bg-[#eef6ec] text-[#386b29] font-bold shadow-2xs'
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
            <div className="bg-white rounded-3xl p-6 border border-[#ece6d7] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#f3efe4]">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-[#386b29] rounded-full" />
                  <h3 className="font-bold text-[#162915] text-[16px]">Filter By</h3>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-[#c0392b] hover:underline flex items-center gap-1 font-semibold"
                    title="Reset all filters"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>

              {/* Price Range Slider */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#637761] mb-2">
                  Max Price
                </label>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#386b29] cursor-pointer"
                />
                <div className="flex items-center justify-between text-xs font-semibold text-[#182a17] mt-2">
                  <span>Rs. 500</span>
                  <span className="text-[#386b29] bg-[#eef6ec] px-2.5 py-1 rounded-md font-bold">
                    Up to Rs. {priceRange.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Ratings Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#637761] mb-2.5">
                  Ratings
                </label>
                <div className="space-y-1.5">
                  {[5, 4].map((stars) => {
                    const count = ratingCounts[stars] || 0;
                    const isSelected = selectedRating === stars;
                    return (
                      <button
                        key={stars}
                        onClick={() => setSelectedRating(isSelected ? null : stars)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                          isSelected ? 'bg-[#eef6ec] text-[#386b29] font-bold' : 'hover:bg-[#faf7f0]'
                        }`}
                      >
                        <div className="flex items-center gap-1 text-[#f5a623]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < stars ? 'fill-current' : 'text-[#ded7c8]'}`}
                            />
                          ))}
                          <span className="text-[11px] text-[#556754] ml-1 font-medium">& Up</span>
                        </div>
                        <span className="text-[11px] text-[#909f8f]">
                          ({count < 10 ? `0${count}` : count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* WhatsApp Quick Assistance Card */}
              <div className="p-4 bg-[#f0f7ee] border border-[#d6ecd2] rounded-2xl text-center space-y-2">
                <p className="text-xs font-semibold text-[#2c5820]">
                  Need help choosing the right flour or desi ghee?
                </p>
                <button
                  onClick={() => openWhatsAppChat('Assalam-o-Alaikum, I need help selecting products from Pure Harvest Organic.')}
                  className="w-full py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current stroke-none" />
                  <span>WhatsApp Farm Help</span>
                </button>
              </div>

              {/* Close Mobile Filter */}
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="lg:hidden w-full py-3 rounded-xl bg-[#386b29] hover:bg-[#2d5621] text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <span>SHOW {filteredProducts.length} PRODUCTS</span>
              </button>
            </div>
          </aside>

          {/* Right Product Grid Area (9 cols) */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Header bar: Count, Sort Dropdown & View Mode */}
            <div className="bg-white rounded-2xl p-4 sm:px-6 sm:py-3.5 border border-[#ece6d7] flex flex-wrap items-center justify-between gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              {/* Product Count matching reality */}
              <div className="text-xs sm:text-sm font-medium text-[#5c6e5a]">
                Showing <span className="font-bold text-[#162915]">1–{filteredProducts.length}</span> of{' '}
                <span className="font-bold text-[#162915]">{filteredProducts.length}</span> results
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
                    <option value="name">Name (A-Z)</option>
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
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#ede7d8] space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#f0f7ee] text-[#386b29] flex items-center justify-center mx-auto">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#182a17]">No Products Match Your Filters</h3>
                <p className="text-xs sm:text-sm text-[#677965] max-w-md mx-auto">
                  Try adjusting the price range or clearing category filters to view our full organic harvest.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-full bg-[#386b29] text-white text-xs font-bold hover:bg-[#2c5520] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlistIds.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      onClick={() => onSelectProduct(product)}
                      className="bg-white rounded-3xl p-5 border border-[#ede7d8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_36px_rgba(56,107,41,0.1)] transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1 cursor-pointer"
                    >
                      {/* Top: Wishlist button & Image container */}
                      <div className="relative aspect-square w-full rounded-2xl bg-[#fbf9f4] border border-[#f3efe5] p-4 flex items-center justify-center overflow-hidden mb-3.5">
                        <button
                          type="button"
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
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-108"
                        />
                      </div>

                      {/* Middle: Category, Name, Rating & Prices */}
                      <div className="mb-4">
                        <span className="text-[11px] font-bold text-[#386b29] uppercase tracking-wider">
                          {product.category}
                        </span>
                        <h4 className="font-bold text-[#162915] text-[16px] group-hover:text-[#386b29] transition-colors leading-snug line-clamp-1 mt-0.5">
                          {product.name}
                        </h4>
                        <p className="text-xs text-[#71836f] mt-0.5">{product.netWeight}</p>

                        {/* Rating stars & review count */}
                        <div className="flex items-center gap-1.5 mt-2">
                          <div className="flex text-[#f5a623]">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-[#e2dbce]'}`}
                              />
                            ))}
                          </div>
                          <span className="text-[11px] font-semibold text-[#869784]">
                            ({product.reviewsCount})
                          </span>
                        </div>

                        {/* Pricing */}
                        <div className="flex items-baseline gap-2 mt-2.5">
                          {product.originalPrice && (
                            <span className="text-xs text-[#9aa798] line-through font-normal">
                              Rs. {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                          <span className="text-base font-extrabold text-[#386b29]">
                            Rs. {product.price.toLocaleString()}
                          </span>
                          {product.discountPercent && (
                            <span className="text-[10px] font-bold bg-[#eef6ec] text-[#386b29] px-2 py-0.5 rounded-md border border-[#cfe6cb]">
                              {product.discountPercent}% OFF
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom Action Buttons: Add to Cart & WhatsApp */}
                      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#f4efe4]">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product, 1);
                          }}
                          className="py-2.5 px-3 rounded-xl bg-[#386b29] hover:bg-[#2c5520] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-98"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const msg = generateProductWhatsAppMessage(product, 1);
                            openWhatsAppChat(msg);
                          }}
                          className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-98"
                          title="Order on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current stroke-none" />
                          <span>WhatsApp</span>
                        </button>
                      </div>
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
                    onClick={() => onSelectProduct(product)}
                    className="bg-white rounded-3xl p-5 border border-[#ede7d8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center gap-6 group hover:border-[#c9e4c3] transition-all cursor-pointer"
                  >
                    <div className="w-32 h-32 rounded-2xl bg-[#fbf9f4] border border-[#f3efe5] p-2 flex items-center justify-center shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain transition-transform group-hover:scale-105"
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <span className="text-[11px] font-bold text-[#386b29] uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h4 className="font-bold text-[#162915] text-lg group-hover:text-[#386b29] transition-colors">
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
                        <span className="text-xs text-[#556754] font-semibold ml-2">Weight: {product.netWeight}</span>
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
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product, 1);
                          }}
                          className="py-2 px-4 rounded-xl bg-[#386b29] hover:bg-[#2c5520] text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const msg = generateProductWhatsAppMessage(product, 1);
                            openWhatsAppChat(msg);
                          }}
                          className="py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current stroke-none" />
                          <span>WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </section>

      {/* 3. Trust Strip */}
      <TrustStrip />
    </div>
  );
}

