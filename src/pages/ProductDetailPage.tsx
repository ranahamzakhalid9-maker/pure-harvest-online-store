import { useState } from 'react';
import {
  ChevronRight,
  Star,
  Check,
  Heart,
  ShoppingCart,
  Maximize2,
  ChevronLeft,
  Share2,
  Facebook,
  Twitter,
  MessageCircle,
  Copy,
  Leaf,
  ShieldCheck,
  Flame,
  Clock,
  ArrowRight,
  Zap
} from 'lucide-react';
import { Product, ActivePage } from '../types';
import { PRODUCTS } from '../data/products';
import TrustStrip from '../components/TrustStrip';
import {
  generateProductWhatsAppMessage,
  openWhatsAppChat,
  WHATSAPP_DISPLAY_NUMBER
} from '../utils/whatsapp';

interface ProductDetailPageProps {
  product: Product;
  onNavigate: (page: ActivePage) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export default function ProductDetailPage({
  product,
  onNavigate,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted
}: ProductDetailPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'benefits' | 'ingredients' | 'how-to-use' | 'reviews'>('description');
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const currentVariant = product.variants && product.variants.length > 0
    ? product.variants[selectedVariantIndex] || product.variants[0]
    : null;

  const currentPrice = currentVariant ? currentVariant.price : product.price;
  const currentOriginalPrice = currentVariant ? currentVariant.originalPrice : product.originalPrice;
  const currentNetWeight = currentVariant ? currentVariant.size : product.netWeight;

  const effectiveProduct: Product = {
    ...product,
    price: currentPrice,
    originalPrice: currentOriginalPrice,
    netWeight: currentNetWeight,
    name: currentVariant ? `${product.name} (${currentVariant.size})` : product.name
  };

  const images = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image, product.image, product.image, product.image, product.image];

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleAdd = () => {
    onAddToCart(effectiveProduct, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleOrderOnWhatsApp = () => {
    const message = generateProductWhatsAppMessage(effectiveProduct, quantity);
    openWhatsAppChat(message);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Related products (exclude current)
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="w-full min-h-screen">
      {/* 1. Breadcrumbs matching reference */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4">
        <nav className="flex items-center gap-1.5 text-xs font-semibold text-[#667764] flex-wrap">
          <button onClick={() => onNavigate('home')} className="hover:text-[#386b29]">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-[#a2b2a0]" />
          <button onClick={() => onNavigate('shop')} className="hover:text-[#386b29]">Shop</button>
          <ChevronRight className="w-3.5 h-3.5 text-[#a2b2a0]" />
          <button onClick={() => onNavigate('categories')} className="hover:text-[#386b29]">{product.category}</button>
          <ChevronRight className="w-3.5 h-3.5 text-[#a2b2a0]" />
          <span className="text-[#386b29] font-bold">{product.name}</span>
        </nav>
      </div>

      {/* 2. Main Product Section (3-part layout) */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Part 1: Product Image Gallery (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Image Container */}
            <div className="relative aspect-square w-full rounded-3xl bg-white border border-[#eee7d8] shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-6 flex items-center justify-center overflow-hidden group">
              {/* Badges on top left */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <span className="bg-[#f0f7ee] text-[#386b29] border border-[#d2ecd0] text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                  <Leaf className="w-3.5 h-3.5 fill-current" />
                  100% Organic
                </span>
                {product.bestseller && (
                  <span className="bg-[#fef9ec] text-[#b8860b] border border-[#fae8b4] text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Bestseller
                  </span>
                )}
              </div>

              {/* Fullscreen icon top right */}
              <button
                onClick={() => window.open(images[selectedImageIndex], '_blank')}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 border border-[#e8e2d4] text-[#556754] hover:text-[#182a17] flex items-center justify-center hover:bg-white transition-all shadow-2xs"
                title="View Full Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Prev / Next Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 border border-[#e8e2d4] text-[#556754] hover:text-[#182a17] flex items-center justify-center hover:bg-white transition-all shadow-xs"
                aria-label="Previous view"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 border border-[#e8e2d4] text-[#556754] hover:text-[#182a17] flex items-center justify-center hover:bg-white transition-all shadow-xs"
                aria-label="Next view"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Main Photo with smooth animation */}
              <img
                src={images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* 5 Thumbnails */}
            <div className="grid grid-cols-5 gap-3">
              {images.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`aspect-square rounded-2xl bg-white border-2 p-1.5 overflow-hidden transition-all duration-200 ${
                    selectedImageIndex === idx
                      ? 'border-[#386b29] shadow-sm scale-102 bg-[#f4f9f2]'
                      : 'border-[#eee7d8] hover:border-[#ccd8ca]'
                  }`}
                >
                  <img src={thumb} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Part 2: Product Information (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#386b29] uppercase">
                PURE & NATURAL
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#152714] mt-1.5 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-[#f5a623]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#667764]">
                  ({product.reviewsCount} Reviews)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 pt-1 flex-wrap">
              <span className="font-serif text-3xl font-extrabold text-[#386b29]">
                Rs. {currentPrice.toLocaleString()}
              </span>
              {currentOriginalPrice && (
                <span className="text-base text-[#92a290] line-through">
                  Rs. {currentOriginalPrice.toLocaleString()}
                </span>
              )}
              {product.unitRate && (
                <span className="bg-[#eef6ec] text-[#2e5d20] text-xs font-bold px-3 py-1 rounded-full border border-[#cbe4c6]">
                  {product.unitRate}
                </span>
              )}
              {product.discountPercent && (
                <span className="bg-[#fff4e5] text-[#b36b00] text-xs font-bold px-2.5 py-1 rounded-md border border-[#fed7aa]">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Size / Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#495b47] uppercase tracking-wider">
                    Select Pack Size / Weight:
                  </span>
                  <span className="text-xs font-semibold text-[#386b29]">
                    {currentNetWeight}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {product.variants.map((variant, idx) => {
                    const isSelected = selectedVariantIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedVariantIndex(idx)}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                          isSelected
                            ? 'bg-[#386b29] text-white border-[#386b29] shadow-sm scale-102'
                            : 'bg-[#fbf9f4] text-[#2f422e] border-[#e2d9cd] hover:border-[#386b29]'
                        }`}
                      >
                        <span>{variant.size}</span>
                        <span className={`text-[11px] font-semibold ${isSelected ? 'text-[#cbe8c4]' : 'text-[#6f826d]'}`}>
                          • Rs. {variant.price.toLocaleString()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Short Description */}
            <p className="text-sm text-[#4d5e4b] leading-relaxed">
              {product.description}
            </p>

            {/* Benefits List (2-column layout matching reference 3) */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {(product.benefits || [
                '100% Pure & Raw',
                'Rich in Antioxidants',
                'No Added Sugar',
                'Boosts Immunity',
                'Unfiltered Goodness',
                'Natural Energy'
              ]).map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-medium text-[#2d402b]">
                  <div className="w-4 h-4 rounded-full bg-[#eef6ec] text-[#386b29] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Product Information Card: Net Weight, Origin, Shelf Life, Delivery */}
            <div className="bg-white rounded-2xl p-4 border border-[#eee7d8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] grid grid-cols-2 sm:grid-cols-4 gap-3 divide-y sm:divide-y-0 sm:divide-x divide-[#f0ece1]">
              <div className="pt-2 sm:pt-0">
                <span className="block text-[10px] font-semibold text-[#839381] uppercase tracking-wider">
                  Net Weight
                </span>
                <span className="font-bold text-xs sm:text-sm text-[#182a17] mt-0.5 block">
                  {currentNetWeight}
                </span>
              </div>
              <div className="pt-2 sm:pt-0 sm:pl-3">
                <span className="block text-[10px] font-semibold text-[#839381] uppercase tracking-wider">
                  Origin
                </span>
                <span className="font-bold text-xs sm:text-sm text-[#182a17] mt-0.5 block">
                  {product.origin || 'Punjab, Pakistan'}
                </span>
              </div>
              <div className="pt-2 sm:pt-0 sm:pl-3">
                <span className="block text-[10px] font-semibold text-[#839381] uppercase tracking-wider">
                  Shelf Life
                </span>
                <span className="font-bold text-xs sm:text-sm text-[#182a17] mt-0.5 block">
                  {product.shelfLife || '3 Months'}
                </span>
              </div>
              <div className="pt-2 sm:pt-0 sm:pl-3">
                <span className="block text-[10px] font-semibold text-[#839381] uppercase tracking-wider">
                  Delivery
                </span>
                <span className="font-bold text-xs sm:text-sm text-[#386b29] mt-0.5 block">
                  Islamabad & Pindi
                </span>
              </div>
            </div>

            {/* Storage Advice */}
            {product.storageInstructions && (
              <div className="p-3 rounded-xl bg-[#f7f5ee] border border-[#e8e2d4] text-xs text-[#526550] flex items-center gap-2">
                <span className="font-bold text-[#182a17]">Storage Tip:</span>
                <span>{product.storageInstructions}</span>
              </div>
            )}
          </div>

          {/* Part 3: Purchase Panel (3 cols) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-6 border border-[#ece6d7] shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-5 sticky top-24">
              
              {/* In Stock status */}
              <div className="flex items-center gap-2 text-[#386b29] font-bold text-xs bg-[#f0f7ee] p-2.5 rounded-xl border border-[#d7ecce]">
                <div className="w-2 h-2 rounded-full bg-[#386b29] animate-pulse" />
                <span>In Stock</span>
                <span className="text-[#6d826a] font-normal ml-auto">Ready to ship</span>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-xs font-bold text-[#627560] uppercase tracking-wider mb-2">
                  Quantity
                </label>
                <div className="flex items-center justify-between border border-[#e2dacf] rounded-2xl p-1 bg-[#fbf9f4]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-xl bg-white border border-[#e2dacf] text-base font-bold text-[#354733] hover:bg-[#f4efe4] flex items-center justify-center transition-colors"
                  >
                    −
                  </button>
                  <span className="font-bold text-base text-[#182a17]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-xl bg-white border border-[#e2dacf] text-base font-bold text-[#354733] hover:bg-[#f4efe4] flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart, Buy Now & WhatsApp Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={handleAdd}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#386b29] hover:bg-[#2c5520] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(56,107,41,0.2)] hover:shadow-lg transition-all active:scale-98"
                >
                  <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
                  <span>ADD TO CART</span>
                </button>

                <button
                  onClick={() => onBuyNow(effectiveProduct, quantity)}
                  className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-[#fbf9f4] text-[#386b29] font-bold text-sm border-2 border-[#386b29] flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <span>BUY NOW</span>
                </button>

                <button
                  onClick={handleOrderOnWhatsApp}
                  className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(37,211,102,0.3)] hover:shadow-lg transition-all active:scale-98"
                  title={`Contact via WhatsApp ${WHATSAPP_DISPLAY_NUMBER}`}
                >
                  <MessageCircle className="w-4 h-4 fill-current stroke-none" />
                  <span>CONTACT VIA WHATSAPP ({WHATSAPP_DISPLAY_NUMBER})</span>
                </button>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`w-full py-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                  isWishlisted
                    ? 'border-red-200 bg-red-50 text-red-600'
                    : 'border-[#e4ded2] text-[#4f614d] hover:bg-[#fbf9f4]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>

              {/* Share section */}
              <div className="pt-3 border-t border-[#f1ebd9]">
                <span className="block text-[11px] font-semibold text-[#819280] mb-2.5">
                  Share this product
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="w-8 h-8 rounded-full bg-[#fbf9f4] border border-[#e6dfd1] text-[#475945] hover:text-[#386b29] hover:bg-white flex items-center justify-center transition-colors"
                    title="Share on Facebook"
                  >
                    <Facebook className="w-3.5 h-3.5 fill-current" />
                  </button>
                  <button
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="w-8 h-8 rounded-full bg-[#fbf9f4] border border-[#e6dfd1] text-[#475945] hover:text-[#386b29] hover:bg-white flex items-center justify-center transition-colors"
                    title="Share on X / Twitter"
                  >
                    <Twitter className="w-3.5 h-3.5 fill-current" />
                  </button>
                  <button
                    onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(product.name + ' - ' + window.location.href)}`, '_blank')}
                    className="w-8 h-8 rounded-full bg-[#fbf9f4] border border-[#e6dfd1] text-[#475945] hover:text-[#386b29] hover:bg-white flex items-center justify-center transition-colors"
                    title="Share on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="w-8 h-8 rounded-full bg-[#fbf9f4] border border-[#e6dfd1] text-[#475945] hover:text-[#386b29] hover:bg-white flex items-center justify-center transition-colors relative"
                    title="Copy Link"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedLink && (
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] bg-[#182a17] text-white px-2 py-0.5 rounded-md shadow-xs">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {addedToast && (
                <div className="p-2.5 bg-[#eef6ec] border border-[#cbe5c4] rounded-xl text-center text-xs font-bold text-[#386b29] animate-fade-in">
                  ✓ Added {quantity} item(s) to Cart
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 3. Product Information Tabs matching reference 3 */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#ede7d8] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 sm:gap-6 border-b border-[#f1ebd9] pb-3 overflow-x-auto">
            {[
              { id: 'description', label: 'Description' },
              { id: 'benefits', label: 'Benefits' },
              { id: 'ingredients', label: 'Ingredients' },
              { id: 'how-to-use', label: 'How to Use' },
              { id: 'reviews', label: `Reviews (${product.reviewsCount})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-xs sm:text-sm font-bold pb-2 border-b-2 transition-all shrink-0 ${
                  activeTab === tab.id
                    ? 'border-[#386b29] text-[#386b29]'
                    : 'border-transparent text-[#6e806c] hover:text-[#182a17]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 text-sm text-[#475a45] leading-relaxed space-y-3">
              {activeTab === 'description' && (
                <>
                  <p>{product.detailedDescription || product.description}</p>
                  <p>
                    Every batch undergoes stringent quality testing to verify absence of synthetic fertilizers, heavy metals, or added high-fructose corn syrups. Guaranteed 100% farm traceable.
                  </p>
                </>
              )}
              {activeTab === 'benefits' && (
                <div className="space-y-2">
                  <h4 className="font-bold text-[#182a17]">Key Health Benefits:</h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Provides slow-release, sustained clean cellular vitality without sugar spikes.</li>
                    <li>Packed with organic bioactive polyphenols, live enzymes, and protective nutrients.</li>
                    <li>Soothes sore throats, aids gastrointestinal harmony, and boosts immune defense.</li>
                    <li>Zero artificial preservatives, colorants, or chemical stabilizers.</li>
                  </ul>
                </div>
              )}
              {activeTab === 'ingredients' && (
                <div>
                  <h4 className="font-bold text-[#182a17] mb-2">Ingredients List:</h4>
                  <p className="bg-[#fbf9f4] p-4 rounded-xl border border-[#eee7d8] font-mono text-xs text-[#2c3f2a]">
                    {product.ingredients || '100% Certified Organic Natural Harvest. No preservatives.'}
                  </p>
                </div>
              )}
              {activeTab === 'how-to-use' && (
                <div>
                  <h4 className="font-bold text-[#182a17] mb-2">Usage Recommendations:</h4>
                  <p>{product.howToUse || 'Take 1 serving daily as part of your organic nutrition regimen.'}</p>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="font-serif text-4xl font-bold text-[#182a17]">{product.rating}</div>
                    <div>
                      <div className="flex text-[#f5a623]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-[#718270]">Based on {product.reviewsCount} certified customer reviews</span>
                    </div>
                  </div>
                  <div className="p-4 bg-[#fbf9f4] rounded-2xl border border-[#ede7d8] space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#182a17]">Tariq M. — Verified Buyer</span>
                      <span className="text-[#849582]">2 days ago</span>
                    </div>
                    <p className="text-xs text-[#475945]">
                      "Hands down the highest quality organic honey I have ever purchased. Fragrant wildflower aroma and thick consistency. Will order again!"
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Highlights Panel */}
            <div className="lg:col-span-4 bg-[#fbf9f4] rounded-2xl p-5 border border-[#eee7d8] space-y-3">
              <div className="flex items-center gap-3 text-xs font-semibold text-[#182a17]">
                <div className="w-8 h-8 rounded-lg bg-[#eef6ec] text-[#386b29] flex items-center justify-center shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <span>Raw & Unfiltered</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-[#182a17]">
                <div className="w-8 h-8 rounded-lg bg-[#eef6ec] text-[#386b29] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>No Artificial Flavors</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-[#182a17]">
                <div className="w-8 h-8 rounded-lg bg-[#eef6ec] text-[#386b29] flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <span>No Preservatives</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-[#182a17]">
                <div className="w-8 h-8 rounded-lg bg-[#eef6ec] text-[#386b29] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <span>100% Natural Fresh</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Related Products Section: "You May Also Like" */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-serif text-2xl font-bold text-[#162915]">
            You May Also Like
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs font-bold text-[#386b29] hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              onClick={() => onSelectProduct(rel)}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-[#ede7d8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="aspect-square w-full rounded-2xl bg-[#fbf9f4] p-3 flex items-center justify-center mb-3 overflow-hidden">
                <img
                  src={rel.image}
                  alt={rel.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div>
                <h4 className="font-bold text-[#182a17] text-sm group-hover:text-[#386b29] transition-colors line-clamp-1">
                  {rel.name}
                </h4>
                <div className="flex items-center gap-1 mt-1 text-[#f5a623]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                  <span className="text-[11px] text-[#869784] ml-1">({rel.reviewsCount})</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#f4f0e5]">
                <span className="font-bold text-[#386b29] text-sm">
                  Rs. {rel.price.toLocaleString()}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(rel, 1);
                  }}
                  className="w-7 h-7 rounded-full bg-[#386b29] text-white flex items-center justify-center hover:bg-[#2c5620] transition-colors shadow-2xs"
                  title="Quick Add"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Trust Strip */}
      <TrustStrip />
    </div>
  );
}
