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
import { PRODUCTS } from './data/products';
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
  
  // Cart state initialized from localStorage (empty for new visitors)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pure_harvest_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  // Wishlist state initialized from localStorage (empty for new visitors)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pure_harvest_wishlist_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Auth & User State
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [crmSyncModalOpen, setCrmSyncModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pure_harvest_cart_items', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pure_harvest_wishlist_ids', JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  // Dynamic document title & SEO
  useEffect(() => {
    if (activePage === 'home') {
      document.title = 'Pure Harvest Organic — 100% Pure Stone-Ground Atta & Organic Food in Pakistan';
    } else if (activePage === 'shop') {
      document.title = 'Shop Organic Harvest — Stone Chakki Atta, Pulses & Desi Ghee | Pure Harvest';
    } else if (activePage === 'product-detail' && selectedProduct) {
      document.title = `${selectedProduct.name} (${selectedProduct.netWeight}) — Pure Harvest Organic`;
    } else if (activePage === 'categories') {
      document.title = 'Organic Categories — Pure Harvest Organic Pakistan';
    } else if (activePage === 'cart') {
      document.title = 'Shopping Cart — Pure Harvest Organic';
    } else if (activePage === 'checkout') {
      document.title = 'Checkout & COD Order — Pure Harvest Organic';
    } else if (activePage === 'wishlist') {
      document.title = 'Saved Favorites — Pure Harvest Organic';
    } else if (activePage === 'about') {
      document.title = 'About Us & Sourcing Promise — Pure Harvest Organic';
    } else if (activePage === 'contact') {
      document.title = 'Contact & WhatsApp Support (03065568146) — Pure Harvest Organic';
    }
  }, [activePage, selectedProduct]);

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
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const wishlistCount = wishlistIds.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-[#1c2e1f] selection:bg-[#386b29]/20 selection:text-[#386b29]">
      
      {/* Top Announcement Bar */}
      <div className="bg-[#24421d] text-[#d6eed0] text-[11px] sm:text-xs py-2 px-4 text-center font-medium border-b border-[#2d5025]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="hidden md:flex items-center gap-2 text-[#9dd492]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#52b13c] animate-pulse" />
            <span>100% Pure & Freshly Milled Chakki Atta</span>
          </div>
          <div className="mx-auto md:mx-0 flex items-center gap-2">
            <span>🌾 <strong>We only deliver in Islamabad and Rawalpindi</strong></span>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[#9dd492]">Contact via WhatsApp:</span>
            <button
              onClick={() => openWhatsAppChat('Assalam-o-Alaikum, I have an inquiry about Pure Harvest Organics.')}
              className="text-white font-bold underline hover:text-[#72d45b] transition-colors cursor-pointer"
            >
              03065568146
            </button>
          </div>
        </div>
      </div>

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
      <div className="flex-1 pb-16 sm:pb-0">
        {activePage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
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

      {/* Sticky Mobile Cart Bar for high conversion when cart is not empty */}
      {cartCount > 0 && activePage !== 'cart' && activePage !== 'checkout' && (
        <div className="fixed bottom-3 left-3 right-3 sm:hidden z-40 bg-[#182a17]/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-2xl border border-[#2e472c] flex items-center justify-between gap-3 animate-slide-up">
          <div>
            <div className="text-[11px] text-[#97e082] font-semibold">
              {cartCount} {cartCount === 1 ? 'item' : 'items'} in Cart
            </div>
            <div className="text-sm font-bold text-white">
              Rs. {cartSubtotal.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavigate('cart')}
              className="px-4 py-2 rounded-xl bg-[#386b29] hover:bg-[#2e5921] text-white font-bold text-xs shadow-sm transition-all"
            >
              View Cart →
            </button>
          </div>
        </div>
      )}

      {/* 3. Global Footer with Brand Identity & Newsletter */}
      <footer className="w-full bg-[#182a17] text-white pt-14 pb-8 border-t border-[#263e25] mt-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#2a4429]">
            
            {/* Brand Column (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <BrandLogo size="md" textColor="light" />

              <p className="text-xs sm:text-sm text-[#b2cab0] leading-relaxed max-w-sm">
                Pure Harvest Organics delivers 100% pure stone-ground chakki flour, multigrain blends, and authentic bilona Desi Ghee exclusively to households in Islamabad and Rawalpindi.
              </p>

              <div className="space-y-1.5 text-xs text-[#a6d598]">
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span>WhatsApp Order:</span>
                  <button
                    onClick={() => openWhatsAppChat('Assalam-o-Alaikum, I want to order from Pure Harvest.')}
                    className="text-white hover:text-[#52b13c] font-bold underline transition-colors cursor-pointer"
                  >
                    03065568146
                  </button>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#86bf76]" />
                  <span>Address:</span>
                  <span className="text-[#b2cab0]">Paris Tower Road, Umer Block H13, Islamabad</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-[#86bf76]">
                  <span>Delivery Scope:</span>
                  <span className="text-[#b2cab0]">Islamabad & Rawalpindi Only (Cash on Delivery)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => openWhatsAppChat('Assalam-o-Alaikum Pure Harvest')}
                  className="w-8 h-8 rounded-full bg-[#243d23] hover:bg-[#386b29] text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="WhatsApp"
                >
                  <Instagram className="w-4 h-4" />
                </button>
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
                  <button onClick={() => handleNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                    Shop Products
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('categories')} className="hover:text-white transition-colors cursor-pointer">
                    Browse Categories
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                    Our Story & Sourcing
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                    Contact Us (03065568146)
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
                  <button onClick={() => handleSelectCategory('flour')} className="hover:text-white transition-colors cursor-pointer">
                    Flour & Atta (Chakki Fresh)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectCategory('pulses')} className="hover:text-white transition-colors cursor-pointer">
                    Grains & Washed Pulses
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectCategory('ghee')} className="hover:text-white transition-colors cursor-pointer">
                    Organic Desi Ghee & Dairy
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectCategory('all')} className="hover:text-white transition-colors cursor-pointer">
                    All Available Harvest
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
                  className="w-full py-2 rounded-xl bg-[#386b29] hover:bg-[#4ea339] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#869f84]">
            <div>
              © 2026 Pure Harvest Organic. All rights reserved. Sourced with care across Pakistan.
            </div>
            <div className="flex items-center gap-4">
              <span>Cash on Delivery</span>
              <span>•</span>
              <span>100% Stone-Ground</span>
              <span>•</span>
              <span>7-Day Return Guarantee</span>
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
