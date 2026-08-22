import { useState } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, X, Database } from 'lucide-react';
import { ActivePage } from '../types';
import type { User as FirebaseUser } from 'firebase/auth';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage, extraParam?: string) => void;
  cartCount: number;
  wishlistCount: number;
  currentUser?: FirebaseUser | null;
  onOpenAuth: () => void;
  onOpenSearch: () => void;
  onOpenCrmSync: () => void;
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

  const navItems: { label: string; page: ActivePage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'Categories', page: 'categories' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' }
  ];

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8 mb-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/95 backdrop-blur-md border border-[#e8e2d4] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-5 sm:px-7 py-3 sm:py-3.5 flex items-center justify-between transition-all duration-300">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
            aria-label="Pure Harvest Organic Home"
          >
            {/* User provided logo image */}
            <img
              src="/logo.png"
              alt="Pure Harvest Organic"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-contain bg-white shadow-sm border border-[#e8e2d4] p-0.5 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-[15px] sm:text-[17px] tracking-tight text-[#162915] leading-none">
                PURE HARVEST
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.22em] text-[#4d7f3c] font-bold uppercase mt-0.5">
                ORGANIC
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navItems.map((item) => {
              const isActive =
                activePage === item.page ||
                (item.page === 'shop' && activePage === 'product-detail') ||
                (item.page === 'shop' && activePage === 'cart') ||
                (item.page === 'shop' && activePage === 'checkout');

              return (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className="relative py-1 text-[14px] lg:text-[15px] font-medium transition-colors duration-200 focus:outline-none"
                >
                  <span className={isActive ? 'text-[#386b29] font-semibold' : 'text-[#445343] hover:text-[#182a17]'}>
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-6 h-[2.5px] bg-[#386b29] rounded-full transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Cart */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* CRM & Database Sync Hub Button */}
            <button
              onClick={onOpenCrmSync}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f2f8ef] hover:bg-[#e4f2de] border border-[#cce5c6] text-[#2c5820] text-xs font-semibold transition-all shadow-2xs group"
              title="Firestore Database & CRM Sync Hub"
            >
              <Database className="w-3.5 h-3.5 text-[#386b29] group-hover:rotate-12 transition-transform" />
              <span>CRM & DB Sync</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
            </button>

            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#445343] hover:text-[#182a17] hover:bg-[#f1ebe0] transition-colors focus:outline-none"
              title="Search products"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px] sm:w-5 sm:h-5 stroke-[1.9]" />
            </button>

            {/* Account Icon / Logged in Avatar */}
            <button
              onClick={onOpenAuth}
              className={`h-9 sm:h-10 rounded-full flex items-center justify-center transition-all focus:outline-none ${
                currentUser
                  ? 'pl-1 pr-2.5 sm:pr-3 bg-[#eaf4e7] hover:bg-[#dcedd8] border border-[#c2e2bd] text-[#2c5b20] gap-1.5'
                  : 'w-9 sm:w-10 text-[#445343] hover:text-[#182a17] hover:bg-[#f1ebe0]'
              }`}
              title={currentUser ? `Logged in as ${currentUser.displayName || currentUser.email}` : "Sign In with Google"}
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
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#445343] hover:text-[#182a17] hover:bg-[#f1ebe0] transition-colors focus:outline-none"
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

            {/* Green Cart Pill Button */}
            <button
              onClick={() => onNavigate('cart')}
              className="flex items-center gap-2 bg-[#386b29] hover:bg-[#2d5621] text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium text-[13px] sm:text-[14px] shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none active:scale-98 ml-1"
            >
              <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
              <span className="font-semibold tracking-tight">Cart ({cartCount})</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-[#445343] hover:bg-[#f1ebe0] ml-1"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-white/98 backdrop-blur-lg border border-[#e8e2d4] rounded-2xl p-4 shadow-xl flex flex-col gap-1 transition-all duration-200">
            {navItems.map((item) => {
              const isActive = activePage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-[15px] font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-[#f0f7ee] text-[#386b29] font-semibold'
                      : 'text-[#334232] hover:bg-[#f8f5ee]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#386b29]" />}
                </button>
              );
            })}
            <div className="pt-2 border-t border-[#f0ebd9] mt-1 flex flex-wrap items-center justify-around gap-1">
              <button
                onClick={() => {
                  onOpenCrmSync();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs text-[#2e5820] font-bold py-2 px-3 bg-[#eef7ec] rounded-lg border border-[#c5e4bf]"
              >
                <Database className="w-3.5 h-3.5 text-[#386b29]" /> CRM Sync
              </button>
              <button
                onClick={() => {
                  onOpenSearch();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs text-[#556754] font-medium py-2 px-3 hover:bg-[#f4efe4] rounded-lg"
              >
                <Search className="w-4 h-4" /> Search
              </button>
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg ${
                  currentUser ? 'bg-[#eaf4e7] text-[#2e5820] border border-[#c5e4bf]' : 'text-[#556754] hover:bg-[#f4efe4]'
                }`}
              >
                {currentUser?.photoURL ? (
                  <img src={currentUser.photoURL} alt="User" className="w-4 h-4 rounded-full" />
                ) : (
                  <User className="w-4 h-4" />
                )}
                <span>{currentUser ? currentUser.displayName?.split(' ')[0] || 'Account' : 'Sign In'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
