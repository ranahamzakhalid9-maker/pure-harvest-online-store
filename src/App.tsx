import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import SearchModal from './components/SearchModal';
import CrmSyncModal from './components/CrmSyncModal';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import { AboutPage, ContactPage } from './pages/InfoPages';
import { PRODUCTS, INITIAL_CART_ITEMS } from './data/products';
import { Product, CartItem, ActivePage } from './types';
import { Leaf, Instagram, Facebook, Twitter } from 'lucide-react';
import { BrandLogo } from './components/BrandLogo';
import { openWhatsAppChat } from './utils/whatsapp';
import { subscribeToAuth } from './lib/firebase';
import type { User as FirebaseUser } from 'firebase/auth';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]); // Premium Flour (Fine Chakki)
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  
  // Cart state initialized with default products
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  
  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(['1', '4']);

  // Auth & User State
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [crmSyncModalOpen, setCrmSyncModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Scroll to top on navigation change
  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select Product & navigate to Detail
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    handleNavigate('product-detail');
  };

  // Select Category from Categories Page & navigate to Shop
  const handleSelectCategory = (categorySlug: string) => {
    setSelectedCategorySlug(categorySlug);
    handleNavigate('shop');
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`✓ Added ${quantity} × ${product.name} to Cart`);
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    handleAddToCart(product, quantity);
    handleNavigate('checkout');
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to wishlist');
        return [...prev, productId];
      }
    });
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistIds.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-[#1c2e1f] selection:bg-[#386b29]/20 selection:text-[#386b29]">
      
      {/* 1. Global Navigation Header */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenCrmSync={() => setCrmSyncModalOpen(true)}
      />

      {/* 2. Page Router */}
      <div className="flex-1">
        {activePage === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}

        {activePage === 'shop' && (
          <ShopPage
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            initialCategory={selectedCategorySlug}
          />
        )}

        {activePage === 'product-detail' && (
          <ProductDetailPage
            product={selectedProduct}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
          />
        )}

        {activePage === 'categories' && (
          <CategoriesPage
            onNavigate={handleNavigate}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {activePage === 'cart' && (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onNavigate={handleNavigate}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            currentUser={currentUser}
            onNavigate={handleNavigate}
            onClearCart={handleClearCart}
          />
        )}

        {activePage === 'wishlist' && (
          <WishlistPage
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
      </div>

      {/* 3. Global Footer with Brand Identity & Newsletter */}
      <footer className="w-full bg-[#182a17] text-white pt-14 pb-8 border-t border-[#263e25] mt-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#2a4429]">
            
            {/* Brand Column (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <BrandLogo size="md" textColor="light" />

              <p className="text-xs sm:text-sm text-[#b2cab0] leading-relaxed max-w-sm">
                Discover naturally grown, certified organic food products delivered fresh to your doorstep. 100% pesticide-free, chemical-free and sustainable.
              </p>

              <div className="space-y-1.5 text-xs text-[#a6d598]">
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span>WhatsApp Order:</span>
                  <button
                    onClick={() => openWhatsAppChat('Assalam-o-Alaikum, I want to order from Pure Harvest.')}
                    className="text-white hover:text-[#52b13c] font-bold underline transition-colors"
                  >
                    03094083549
                  </button>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#86bf76]" />
                  <span>Email:</span>
                  <a
                    href="mailto:pureharvestorganic@gmail.com"
                    className="text-white hover:text-[#52b13c] font-bold underline transition-colors"
                  >
                    pureharvestorganic@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#243d23] hover:bg-[#386b29] text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#243d23] hover:bg-[#386b29] text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#243d23] hover:bg-[#386b29] text-white flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#86bf76]">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs text-[#b2cab0]">
                <li>
                  <button onClick={() => handleNavigate('home')} className="hover:text-white transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('shop')} className="hover:text-white transition-colors">
                    Shop Products
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('categories')} className="hover:text-white transition-colors">
                    Browse Categories
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('about')} className="hover:text-white transition-colors">
                    Our Story
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('contact')} className="hover:text-white transition-colors">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#86bf76]">
                Categories
              </h4>
              <ul className="space-y-2 text-xs text-[#b2cab0]">
                <li>
                  <button onClick={() => handleSelectCategory('honey')} className="hover:text-white transition-colors">
                    Organic Honey
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectCategory('dry-fruits')} className="hover:text-white transition-colors">
                    Dry Fruits & Nuts
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectCategory('oils')} className="hover:text-white transition-colors">
                    Cold Pressed Oils
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectCategory('fruits')} className="hover:text-white transition-colors">
                    Farm Fresh Fruits
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectCategory('vegetables')} className="hover:text-white transition-colors">
                    Organic Vegetables
                  </button>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#86bf76]">
                Join Our Newsletter
              </h4>
              <p className="text-xs text-[#b2cab0] leading-relaxed">
                Receive weekly seasonal organic harvest updates and special 10% coupon codes.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast('Thank you for subscribing to Pure Harvest!');
                }}
                className="space-y-2"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#233d22] border border-[#30522e] text-xs text-white placeholder-[#87a584] focus:outline-none focus:border-[#4ea339]"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-[#386b29] hover:bg-[#4ea339] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
                >
                  Subscribe
                </button>
              </form>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#869f84]">
            <div>
              © 2026 Pure Harvest Organic. All rights reserved. Sourced with care.
            </div>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Shipping Policy</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 sm:bottom-20 right-6 z-50 bg-[#162915] text-white px-5 py-3 rounded-2xl shadow-xl border border-[#2d472c] text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-bounce-subtle">
          <div className="w-2 h-2 rounded-full bg-[#52b13c]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Auth Modal (Sign In / Sign Up & Google Auth Profile) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser}
        onSuccess={(name) => {
          showToast(`Welcome, ${name}!`);
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={handleSelectProduct}
        onAddToCart={handleAddToCart}
      />

      {/* CRM & Firestore Database Sync Modal */}
      <CrmSyncModal
        isOpen={crmSyncModalOpen}
        onClose={() => setCrmSyncModalOpen(false)}
      />
    </div>
  );
}
