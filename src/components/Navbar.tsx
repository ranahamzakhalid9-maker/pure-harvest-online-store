import { useState } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, X, Home, Store, Layers, BookOpen, Phone, MessageCircle } from 'lucide-react';
import { ActivePage } from '../types';
import type { User as FirebaseUser } from 'firebase/auth';
import { BrandLogo } from './BrandLogo';
import { WHATSAPP_DISPLAY_NUMBER, openWhatsAppChat } from '../utils/whatsapp';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage, extraParam?: string) => void;
  cartCount: number;
  wishlistCount: number;
  currentUser?: FirebaseUser | null;
  onOpenAuth: () => void;
  onOpenSearch: () => void;
  onOpenCrmSync?: () => void;
}

export default function Navbar({
  activePage,
  onNavigate,
  cartCount,
  wishlistCount,
  currentUser,
  onOpenAuth,
  onOpenSearch,
  onOpenCrmSync
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: ActivePage; icon: any }[] = [
    { label: 'Home', page: 'home', icon: Home },
    { label: 'Shop', page: 'shop', icon: Store },
    { label: 'Categories', page: 'categories', icon: Layers },
    { label: 'About Us', page: 'about', icon: BookOpen },
    { label: 'Contact', page: 'contact', icon: Phone }
  ];

  const handleMobileNav = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-2 sm:top-4 z-50 w-full px-3 sm:px-6 lg:px-8 mb-3 sm:mb-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/95 backdrop-blur-md border border-[#e8e2d4] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-3.5 sm:px-7 py-2.5 sm:py-3.5 flex items-center justify-between transition-all duration-300">
          
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center text-left group focus:outline-none cursor-pointer shrink-0"
            aria-label="Pure Harvest Organic Home"
          >
            <BrandLogo size="md" textColor="dark" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-9">
            {navItems.map((item) => {
              const isActive =
                activePage === item.page ||
                (item.page === 'shop' && (activePage === 'product-detail' || activePage === 'cart' || activePage === 'checkout'));

              return (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className="relative py-1 text-[14px] lg:text-[15px] font-medium transition-colors duration-200 focus:outline-none cursor-pointer"
                >
                  <span className={isActive ? 'text-[#386b29] font-bold' : 'text-[#445343] hover:text-[#182a17]'}>
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-6 h-[2.5px] bg-[#386b29] rounded-full transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Action Icons & Cart */}
          <div className="hidden md:flex items-center gap-2 sm:gap-2.5">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#445343] hover:text-[#182a17] hover:bg-[#f1ebe0] transition-colors focus:outline-none cursor-pointer"
              title="Search products"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px] sm:w-5 sm:h-5 stroke-[1.9]" />
            </button>

            {/* Account Icon / Logged in Avatar */}
            <button
              onClick={onOpenAuth}
              className={`h-9 sm:h-10 rounded-full flex items-center justify-center transition-all focus:outline-none cursor-pointer ${
                currentUser
                  ? 'pl-1 pr-2.5 sm:pr-3 bg-[#eaf4e7] hover:bg-[#dcedd8] border border-[#c2e2bd] text-[#2c5b20] gap-1.5'
                  : 'w-9 sm:w-10 text-[#445343] hover:text-[#182a17] hover:bg-[#f1ebe0]'
              }`}
              title={currentUser ? `Logged in as ${currentUser.displayName || currentUser.email}` : "Sign In"}
              aria-label="Account"
            >
              {currentUser ? (
                <>
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'User'}
                      className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full object-cover border border-[#386b29]"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#386b29] text-white flex items-center justify-center text-xs font-bold">
                      {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <span className="hidden sm:inline text-xs font-bold max-w-[80px] truncate">
                    {currentUser.displayName?.split(' ')[0] || 'Account'}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                </>
              ) : (
                <User className="w-[18px] h-[18px] sm:w-5 sm:h-5 stroke-[1.9]" />
              )}
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => onNavigate('shop')}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#445343] hover:text-[#182a17] hover:bg-[#f1ebe0] transition-colors focus:outline-none cursor-pointer"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-[18px] h-[18px] sm:w-5 sm:h-5 stroke-[1.9]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#386b29] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Desktop Green Cart Pill Button */}
            <button
              onClick={() => onNavigate('cart')}
              className="flex items-center gap-2 bg-[#386b29] hover:bg-[#2d5621] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium text-[13px] sm:text-[14px] shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none active:scale-98 ml-1 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
              <span className="font-semibold tracking-tight">Cart ({cartCount})</span>
            </button>
          </div>

          {/* Mobile Right Controls: Search, Cart, and 3-Line Hamburger Menu */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
            {/* Mobile Search Button */}
            <button
              onClick={onOpenSearch}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#334232] hover:bg-[#f1ebe0] active:scale-95 transition-all"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Mobile Cart Button */}
            <button
              onClick={() => onNavigate('cart')}
              className="relative flex items-center justify-center gap-1 bg-[#386b29] hover:bg-[#2c5620] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-xs active:scale-95 transition-all"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
              <span className="ml-0.5 bg-white text-[#254d19] px-1.5 py-0.2 rounded-full text-[11px] font-black leading-tight min-w-[18px] text-center">
                {cartCount}
              </span>
            </button>

            {/* 3-Line Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full bg-[#f4efe4] hover:bg-[#eae3d5] text-[#162915] flex items-center justify-center active:scale-95 transition-all focus:outline-none cursor-pointer"
              aria-label="Open navigation menu"
              title="Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#162915] stroke-[2.5]" />
              ) : (
                <Menu className="w-5 h-5 text-[#162915] stroke-[2.5]" />
              )}
            </button>
          </div>

        </div>

        {/* Mobile Slide-Down Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-[#ffffff]/98 backdrop-blur-xl border border-[#e5decb] rounded-3xl p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.12)] flex flex-col gap-2 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
            
            {/* Mobile Navigation Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#f1ebe0] px-2 text-xs font-bold text-[#627760] uppercase tracking-wider">
              <span>Main Menu</span>
              <span className="text-[11px] text-[#386b29] font-normal normal-case">Islamabad & Rawalpindi</span>
            </div>

            {/* Main Links */}
            <div className="flex flex-col gap-1 py-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  activePage === item.page ||
                  (item.page === 'shop' && (activePage === 'product-detail' || activePage === 'cart' || activePage === 'checkout'));

                return (
                  <button
                    key={item.page}
                    onClick={() => handleMobileNav(item.page)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[15px] font-semibold text-left transition-all ${
                      isActive
                        ? 'bg-[#eef7ec] text-[#2c5820] border border-[#cbe7c4] shadow-xs'
                        : 'text-[#2b3a2a] hover:bg-[#f6f2e8] active:bg-[#ede7d8]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? 'bg-[#386b29] text-white' : 'bg-[#f3ede0] text-[#516450]'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="text-[11px] font-bold bg-[#386b29] text-white px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Actions in Mobile Menu */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#f1ebe0]">
              <button
                onClick={() => handleMobileNav('cart')}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#faf7f0] border border-[#e8e0cf] text-xs font-bold text-[#1f331e] hover:bg-[#f1ebd9]"
              >
                <ShoppingCart className="w-4 h-4 text-[#386b29]" />
                <span>My Cart ({cartCount})</span>
              </button>

              <button
                onClick={() => handleMobileNav('shop')}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#faf7f0] border border-[#e8e0cf] text-xs font-bold text-[#1f331e] hover:bg-[#f1ebd9]"
              >
                <Heart className="w-4 h-4 text-[#e04848]" />
                <span>Wishlist ({wishlistCount})</span>
              </button>

              <button
                onClick={() => {
                  onOpenSearch();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#faf7f0] border border-[#e8e0cf] text-xs font-bold text-[#1f331e] hover:bg-[#f1ebd9]"
              >
                <Search className="w-4 h-4 text-[#386b29]" />
                <span>Search</span>
              </button>

              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#faf7f0] border border-[#e8e0cf] text-xs font-bold text-[#1f331e] hover:bg-[#f1ebd9]"
              >
                <User className="w-4 h-4 text-[#386b29]" />
                <span>{currentUser ? currentUser.displayName?.split(' ')[0] || 'Account' : 'Sign In'}</span>
              </button>
            </div>

            {/* WhatsApp Contact in Mobile Menu */}
            <div className="pt-2">
              <button
                onClick={() => {
                  openWhatsAppChat('Assalam-o-Alaikum, I want to inquire about Pure Harvest Organic products.');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current stroke-none" />
                <span>Contact via WhatsApp ({WHATSAPP_DISPLAY_NUMBER})</span>
              </button>
            </div>

          </div>
        )}
      </div>
    </header>
  );
}
