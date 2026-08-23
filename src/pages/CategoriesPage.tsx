import { useState } from 'react';
import { ChevronRight, ArrowRight, LayoutGrid, List, Sparkles } from 'lucide-react';
import { CATEGORIES, FULL_SIDEBAR_CATEGORIES } from '../data/categories';
import HeroBasketScene from '../components/HeroBasketScene';
import TrustStrip from '../components/TrustStrip';
import { ActivePage } from '../types';

interface CategoriesPageProps {
  onNavigate: (page: ActivePage) => void;
  onSelectCategory: (categorySlug: string) => void;
}

export default function CategoriesPage({ onNavigate, onSelectCategory }: CategoriesPageProps) {
  const [selectedSidebarCategory, setSelectedSidebarCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="w-full min-h-screen">
      {/* 1. Hero Section matching reference 4 */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6">
        <div className="bg-[#f7f4eb]/80 border border-[#eee7d8] rounded-3xl sm:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Breadcrumbs & Title */}
          <div className="max-w-xl text-center lg:text-left z-10">
            <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-semibold text-[#687a66] mb-3">
              <button onClick={() => onNavigate('home')} className="hover:text-[#386b29]">Home</button>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#386b29]">Categories</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#162915] leading-tight mb-3">
              Our Categories
            </h1>

            <p className="text-sm sm:text-base text-[#596d58] leading-relaxed">
              Explore our wide range of 100% organic products, carefully selected for you.
            </p>
          </div>

          {/* Hero Basket Scene */}
          <div className="w-full lg:w-auto flex justify-center">
            <HeroBasketScene />
          </div>
        </div>
      </section>

      {/* 2. Main Category Area */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar (3 cols) */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* Category list panel */}
            <div className="bg-white rounded-3xl p-6 border border-[#ece6d7] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#f3efe4]">
                <div className="w-1.5 h-4 bg-[#386b29] rounded-full" />
                <h3 className="font-bold text-[#162915] text-[16px]">All Categories</h3>
              </div>

              <div className="space-y-1">
                {FULL_SIDEBAR_CATEGORIES.map((cat) => {
                  const isSelected = selectedSidebarCategory === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        setSelectedSidebarCategory(cat.slug);
                        if (cat.slug !== 'all') {
                          onSelectCategory(cat.slug);
                        }
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-[13px] font-medium transition-all ${
                        isSelected
                          ? 'bg-[#eef6ec] text-[#386b29] font-bold shadow-2xs'
                          : 'text-[#445343] hover:bg-[#faf7f0] hover:text-[#182a17]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Sparkles className={`w-3.5 h-3.5 ${isSelected ? 'text-[#386b29]' : 'text-[#879985]'}`} />
                        <span>{cat.name}</span>
                      </div>
                      <span className={`text-[11px] ${isSelected ? 'text-[#386b29] font-bold' : 'text-[#96a495]'}`}>
                        {cat.count < 10 ? `0${cat.count}` : cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Promotional Sidebar Card: "Eat Healthy, Live Healthy" */}
            <div className="bg-gradient-to-br from-[#f2f8ee] via-[#e5f1df] to-[#d6ebd0] rounded-3xl p-6 border border-[#d6ebd0] shadow-sm relative overflow-hidden">
              <h4 className="font-serif text-lg font-bold text-[#182a17] leading-snug">
                Eat Healthy, Live Healthy
              </h4>
              <p className="text-xs text-[#4e644b] mt-1.5 leading-relaxed">
                Get 100% organic products delivered fresh to your door.
              </p>

              <div className="my-4 relative w-full h-24 rounded-2xl overflow-hidden shadow-xs bg-white border border-[#cbe4c4]">
                <img
                  src="https://i.postimg.cc/02xX8HNh/33a473c0-69f6-4a1e-9754-60208cded94a.png"
                  alt="Pure Desi Ghee & Chakki Flour"
                  className="w-full h-full object-cover"
                />
              </div>

              <button
                onClick={() => onNavigate('shop')}
                className="w-full py-2.5 rounded-xl bg-[#386b29] hover:bg-[#2c5520] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </aside>

          {/* Right Category Grid Area (9 cols) */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Header bar: Count, Sort Dropdown & View Mode */}
            <div className="bg-white rounded-2xl p-4 sm:px-6 sm:py-3.5 border border-[#ece6d7] flex flex-wrap items-center justify-between gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <div className="text-xs sm:text-sm font-medium text-[#5c6e5a]">
                Showing all categories ({CATEGORIES.length})
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#718270] font-medium hidden sm:inline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs sm:text-sm font-semibold text-[#182a17] bg-[#fbf9f4] border border-[#e3dccf] rounded-xl px-3 py-2 focus:outline-none focus:border-[#386b29]"
                  >
                    <option value="featured">Featured</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="items">Most Items</option>
                  </select>
                </div>

                <div className="flex items-center gap-1 bg-[#fbf9f4] p-1 rounded-xl border border-[#e3dccf]">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-[#386b29] text-white shadow-2xs' : 'text-[#6c7d6a] hover:text-[#182a17]'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-[#386b29] text-white shadow-2xs' : 'text-[#6c7d6a] hover:text-[#182a17]'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 12 Category Cards in 4-column Grid matching reference 4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.slug)}
                  className="bg-white rounded-3xl p-4 sm:p-5 border border-[#ede7d8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_36px_rgba(56,107,41,0.12)] transition-all duration-300 flex flex-col justify-between group cursor-pointer transform hover:-translate-y-1.5"
                >
                  {/* Category Image */}
                  <div className="aspect-[4/3] w-full rounded-2xl bg-[#fbf9f4] p-2 flex items-center justify-center overflow-hidden mb-3.5">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-108"
                    />
                  </div>

                  {/* Title and Count */}
                  <div>
                    <h3 className="font-bold text-[#162915] text-[15px] group-hover:text-[#386b29] transition-colors leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#7d8f7b] mt-0.5">
                      ({cat.count} Items)
                    </p>
                  </div>

                  {/* Green Shop Now Arrow */}
                  <div className="mt-3.5 pt-2 border-t border-[#f4efe4] flex items-center gap-1.5 text-xs font-bold text-[#386b29] group-hover:translate-x-1 transition-transform">
                    <span>Shop Now</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </section>

      {/* 3. Benefits Strip */}
      <TrustStrip />
    </div>
  );
}
