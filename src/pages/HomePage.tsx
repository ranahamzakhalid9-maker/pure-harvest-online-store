import { useState } from 'react';
import {
  ArrowRight,
  Leaf,
  Sprout,
  FlaskConical,
  Recycle,
  Star,
  CheckCircle2,
  Truck,
  ShieldCheck,
  RotateCcw,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  Copy,
  Check,
  ShoppingBag,
  Heart,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import HeroProductScene from '../components/HeroProductScene';
import SocialSidebar from '../components/SocialSidebar';
import { ActivePage, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { openWhatsAppChat, WHATSAPP_DISPLAY_NUMBER } from '../utils/whatsapp';

interface HomePageProps {
  onNavigate: (page: ActivePage) => void;
  onSelectProduct?: (product: Product) => void;
  onAddToCart?: (product: Product, quantity?: number) => void;
  onToggleWishlist?: (productId: string) => void;
  wishlistIds?: string[];
}

export default function HomePage({
  onNavigate,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = []
}: HomePageProps) {
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleCopyCoupon = () => {
    navigator.clipboard?.writeText('WELCOME10');
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: '1. What is Pure Harvest Organics?',
      a: 'Pure Harvest Organics is a premium organic food brand focused on providing high-quality, naturally sourced food products to customers in Islamabad and Rawalpindi. Our range includes premium wheat flour, stone-ground flour, multigrain flour, and pure Desi Ghee, with more organic products being introduced over time.'
    },
    {
      q: '2. What makes Pure Harvest wheat flour different?',
      a: 'Our wheat flour is positioned around quality, freshness, and careful processing. We focus on sourcing quality wheat and processing it to preserve its natural characteristics while providing a premium flour suitable for everyday family use.'
    },
    {
      q: '3. Is Pure Harvest wheat flour organic?',
      a: 'Pure Harvest Organics is committed to providing naturally sourced and responsibly produced food products. Our long-term goal is to develop an increasingly integrated organic supply chain, from farming and sourcing through processing and delivery. Specific organic certification claims should only be made for products that have the relevant certification.'
    },
    {
      q: '4. What types of wheat flour does Pure Harvest offer?',
      a: 'We offer a growing range of premium flour products, including:\n• Premium Desi Wheat Flour\n• Desi White Wheat Flour\n• Stone Grounded Wheat Flour\n• Brown & White Mixed Wheat Flour\n• Multigrain Flour\nOur product range is continuously expanding as we introduce more premium food products.'
    },
    {
      q: '5. What is stone-ground wheat flour?',
      a: 'Stone-ground wheat flour is produced by grinding wheat using stone milling methods rather than conventional high-speed industrial milling. This traditional-style processing can help retain more of the grain\'s natural characteristics and provides a distinctive flour suitable for customers looking for a more traditional wheat experience.'
    },
    {
      q: '6. What is multigrain flour?',
      a: 'Multigrain flour is made using a combination of different grains and ingredients to provide a more varied nutritional profile and flavour compared with conventional wheat flour. Pure Harvest Multigrain Flour is designed for customers looking for a premium alternative for everyday baking and cooking.'
    },
    {
      q: '7. Is Pure Harvest Desi Ghee pure?',
      a: 'Pure Harvest Desi Ghee is positioned as a premium Desi Ghee product, sourced and prepared with a focus on quality and purity. We aim to provide customers with authentic-tasting Desi Ghee suitable for traditional Pakistani cooking, baking and everyday use.'
    },
    {
      q: '8. Where does Pure Harvest Organics deliver?',
      a: 'Pure Harvest currently focuses on Islamabad and Rawalpindi, with delivery options designed to make ordering premium food products convenient for local customers. Delivery charges and available delivery options may vary depending on the location and order.'
    },
    {
      q: '9. How can I order Pure Harvest Organics products?',
      a: 'You can order Pure Harvest products directly through our online store. Simply select your preferred product, choose the required quantity, add it to your cart and complete the checkout process. For selected products or assistance with your order, customers may also contact us through WhatsApp (03065568146).'
    },
    {
      q: '10. Why should I choose Pure Harvest Organics?',
      a: 'Pure Harvest is built for customers who care about quality, authenticity and the food they bring into their homes. We focus on premium products rather than competing solely on the lowest price. Our long-term vision is to build a trusted organic food ecosystem with greater control over sourcing, production, processing and delivery.'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Fatima Zahra',
      city: 'F-8, Islamabad',
      rating: 5,
      comment:
        'The Stone Grounded Wheat Flour makes exceptionally soft, fragrant rotis. You can truly tell the difference from regular store-bought flour—no heaviness and 100% natural.'
    },
    {
      name: 'Kamran Siddiqui',
      city: 'Bahria Town, Rawalpindi',
      rating: 5,
      comment:
        'Ordered the Premium Desi Ghee and Desi Wheat Flour. The aroma of the ghee took me back to village kitchens. Timely delivery in Rawalpindi and great packaging.'
    },
    {
      name: 'Ayesha Tariq',
      city: 'DHA Phase 2, Islamabad',
      rating: 5,
      comment:
        'Ordering on WhatsApp was smooth and fast. The Multigrain Flour is now a staple for our family diet. Reliable, honest organic brand delivering in Islamabad.'
    }
  ];

  return (
    <div className="relative w-full overflow-hidden min-h-screen">
      {/* Custom Full-Page Background Image with High Visibility & Parallax Depth */}
      <div className="fixed inset-0 w-full h-full pointer-events-none -z-30 overflow-hidden">
        <img
          src="https://i.postimg.cc/JhG2xggD/b6cb7d14-7bf8-4a27-b025-a8370508288e.png"
          alt="Pure Harvest Organic Farm Background"
          className="w-full h-full object-cover object-center scale-105 filter saturate-[1.1]"
          referrerPolicy="no-referrer"
        />
        {/* Soft atmospheric overlay for clean contrast without hiding the picture */}
        <div className="absolute inset-0 bg-[#fbf9f4]/45 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fbf9f4]/50 to-[#fbf9f4]/90" />
      </div>

      {/* Left Social Sidebar */}
      <SocialSidebar />

      {/* 1. HERO SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-10">
        <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden p-6 sm:p-8 lg:p-12 border border-[#e4dccb] shadow-[0_12px_40px_rgba(0,0,0,0.06)] bg-[#faf7f0]">
          {/* Direct Background Image inside Hero Container as requested */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <img
              src="https://i.postimg.cc/JhG2xggD/b6cb7d14-7bf8-4a27-b025-a8370508288e.png"
              alt="Pure Harvest Organic Farm Background"
              className="w-full h-full object-cover object-left-center scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Soft gradient to keep typography crisp and readable while showing the background image */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#fbf9f4]/92 via-[#fbf9f4]/80 to-[#fbf9f4]/40 lg:via-[#fbf9f4]/70 lg:to-transparent" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            {/* Left Hero Content (5 cols) */}
            <div className="lg:col-span-5 lg:pl-4 xl:pl-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef7ec]/90 backdrop-blur-xs border border-[#c6e5c0] mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#386b29]" />
                <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#2d5621] uppercase">
                  Islamabad & Rawalpindi Delivery
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#162915] leading-[1.08] mb-4 sm:mb-5 drop-shadow-xs">
                Pure Food.<br />
                <span className="text-[#386b29] italic font-normal">Pure Life.</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-[#445643] max-w-md mx-auto lg:mx-0 leading-relaxed mb-6 sm:mb-8 font-medium">
                Pesticide-free stone-ground chakki wheat flours, multigrain atta, and pure Desi Ghee delivered directly to your doorstep in Islamabad and Rawalpindi.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <button
                  onClick={() => onNavigate('shop')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#386b29] hover:bg-[#2c5620] text-white font-semibold text-[14px] sm:text-[15px] flex items-center justify-center gap-2.5 shadow-[0_6px_20px_rgba(56,107,41,0.25)] hover:shadow-[0_8px_25px_rgba(56,107,41,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <button
                  onClick={() => onNavigate('categories')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/95 hover:bg-white text-[#162915] font-semibold text-[14px] sm:text-[15px] border border-[#e3dccf] flex items-center justify-center gap-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer backdrop-blur-xs"
                >
                  <span>EXPLORE CATEGORIES</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5] text-[#386b29]" />
                </button>
              </div>

              {/* Micro Trust Stats */}
              <div className="mt-7 pt-6 border-t border-[#eee7d8]/80 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#4b5e4a] font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#386b29]" />
                  <span>Cash on Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#386b29]" />
                  <span>Islamabad & Pindi Only</span>
                </div>
              </div>
            </div>

            {/* Right 3D Product Scene (7 cols) */}
            <div className="lg:col-span-7 flex items-center justify-center relative">
              <HeroProductScene />
            </div>
          </div>
        </div>
      </section>

      {/* 2. NON-AUTO-APPLIED FIRST-ORDER PROMO BANNER */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="bg-gradient-to-r from-[#214317] via-[#2f5a22] to-[#1e3b15] rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4 border border-[#3b6d2c]">
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
              <Sparkles className="w-5 h-5 text-[#97e082]" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                New to Pure Harvest Organic? Get 10% OFF Your First Order!
              </h3>
              <p className="text-xs text-[#c5e6bc] mt-0.5">
                Apply coupon code <span className="font-bold text-white tracking-wider">WELCOME10</span> at checkout. Valid on all organic products.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyCoupon}
              className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copiedCoupon ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#85e86e]" />
                  <span>COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY "WELCOME10"</span>
                </>
              )}
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="px-4 py-2 rounded-xl bg-[#61b849] hover:bg-[#52a13c] text-[#142912] font-extrabold text-xs transition-all shadow-sm cursor-pointer"
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* 3. FOUR CORE VALUE PILLARS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-[#eee7d8] shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex items-center gap-4 hover:bg-white transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#386b29] text-white flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#162915] text-sm">100% Stone-Ground</h3>
              <p className="text-xs text-[#6e7f6d] mt-0.5">Slow cold stone milling</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-[#eee7d8] shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex items-center gap-4 hover:bg-white transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#4e843c] text-white flex items-center justify-center shrink-0">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#162915] text-sm">Farm Fresh Quality</h3>
              <p className="text-xs text-[#6e7f6d] mt-0.5">Direct from local growers</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-[#eee7d8] shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex items-center gap-4 hover:bg-white transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#386b29] text-white flex items-center justify-center shrink-0">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#162915] text-sm">Zero Preservatives</h3>
              <p className="text-xs text-[#6e7f6d] mt-0.5">No bleaching or additives</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-[#eee7d8] shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex items-center gap-4 hover:bg-white transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#4e843c] text-white flex items-center justify-center shrink-0">
              <Recycle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#162915] text-sm">Eco Packaging</h3>
              <p className="text-xs text-[#6e7f6d] mt-0.5">Food-safe, sealed fresh</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BROWSE BY CATEGORY */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
          <div>
            <span className="text-xs font-bold tracking-wider text-[#386b29] uppercase">
              Curated Harvest
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#162915] mt-1">
              Browse by Category
            </h2>
          </div>
          <button
            onClick={() => onNavigate('categories')}
            className="text-xs sm:text-sm font-bold text-[#386b29] hover:text-[#264b1b] flex items-center gap-1 cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('shop')}
              className="bg-white rounded-3xl p-5 border border-[#ede7d8] shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#f7f5ee] mb-4">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#162915] text-base group-hover:text-[#386b29] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#f0f6ee] text-[#386b29]">
                    {cat.count} {cat.count === 1 ? 'Product' : 'Products'}
                  </span>
                </div>
                <p className="text-xs text-[#6e7f6d] mt-2 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#f4efe4] flex items-center justify-between text-xs font-bold text-[#386b29]">
                <span>Explore Products</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURED / BEST-SELLING PRODUCTS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
          <div>
            <span className="text-xs font-bold tracking-wider text-[#386b29] uppercase">
              Fresh Batches
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#162915] mt-1">
              Featured Organic Products
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs sm:text-sm font-bold text-[#386b29] hover:text-[#264b1b] flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Shop ({PRODUCTS.length} Products)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((prod) => {
            const isWishlisted = wishlistIds.includes(prod.id);

            return (
              <div
                key={prod.id}
                className="bg-white rounded-3xl p-5 border border-[#ede7d8] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Product Image & Badge */}
                <div
                  onClick={() => onSelectProduct?.(prod)}
                  className="relative aspect-square w-full rounded-2xl bg-[#faf8f2] p-4 flex items-center justify-center overflow-hidden cursor-pointer mb-4"
                >
                  {prod.bestseller ? (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#386b29] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs z-10">
                      Bestseller
                    </span>
                  ) : prod.discountPercent ? (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#eef6ec] text-[#386b29] border border-[#cbe4c6] text-[10px] font-bold uppercase tracking-wider shadow-xs z-10">
                      {prod.discountPercent}% OFF
                    </span>
                  ) : null}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist?.(prod.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-[#e8e2d4] text-[#6d7e6c] hover:text-red-500 flex items-center justify-center transition-colors z-10 cursor-pointer"
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                  </button>

                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product Content */}
                <div>
                  <div className="flex items-center gap-1 text-[#f59e0b] mb-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < Math.floor(prod.rating) ? 'fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-[11px] text-[#718270] font-semibold ml-1">
                      {prod.rating.toFixed(1)} ({prod.reviewsCount})
                    </span>
                  </div>

                  <h3
                    onClick={() => onSelectProduct?.(prod)}
                    className="font-bold text-[#162915] text-[15px] sm:text-base leading-snug cursor-pointer hover:text-[#386b29] transition-colors"
                  >
                    {prod.name}
                  </h3>

                  <p className="text-xs text-[#738572] mt-0.5">{prod.netWeight} • 100% Natural</p>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-serif text-lg sm:text-xl font-bold text-[#386b29]">
                      Rs. {prod.price.toLocaleString()}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-xs text-[#9aa799] line-through">
                        Rs. {prod.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 pt-3 border-t border-[#f4efe4] space-y-2">
                  <button
                    onClick={() => onAddToCart?.(prod, 1)}
                    className="w-full py-2.5 rounded-xl bg-[#386b29] hover:bg-[#2c5620] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => {
                      const msg = `Assalam-o-Alaikum, I want to order *${prod.name}* (${prod.netWeight}) for Rs. ${prod.price.toLocaleString()} from Pure Harvest Organic.`;
                      openWhatsAppChat(msg);
                    }}
                    className="w-full py-2 rounded-xl bg-[#f0f9ed] hover:bg-[#e2f3dd] text-[#245219] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#cbe6c4] transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-current stroke-none" />
                    <span>Order on WhatsApp</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. WHY CHOOSE PURE HARVEST */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-[#f7f5ee] rounded-3xl p-6 sm:p-10 border border-[#e8e2d4]">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs font-bold tracking-wider text-[#386b29] uppercase">
              Our Sourcing Promise
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#162915] mt-1.5">
              Why Families Trust Pure Harvest
            </h2>
            <p className="text-sm text-[#5d6f5b] mt-2 leading-relaxed">
              We started with a simple mission: bringing authentic, unadulterated staple food back to Pakistani dining tables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#ece6d7] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#eef7ec] text-[#386b29] flex items-center justify-center font-bold text-lg">
                01
              </div>
              <h3 className="font-bold text-[#162915] text-base">Traditional Stone Milling</h3>
              <p className="text-xs text-[#5e715d] leading-relaxed">
                Slow cold-ground stone milling retains live nutrients, enzymes, bran, and rich aroma that high-speed commercial steel rollers burn away.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#ece6d7] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#eef7ec] text-[#386b29] flex items-center justify-center font-bold text-lg">
                02
              </div>
              <h3 className="font-bold text-[#162915] text-base">Zero Chemicals or Bleach</h3>
              <p className="text-xs text-[#5e715d] leading-relaxed">
                No potassium bromate, chlorine, artificial whitening agents, or synthetic shelf-life extenders. Just 100% whole grain purity.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#ece6d7] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#eef7ec] text-[#386b29] flex items-center justify-center font-bold text-lg">
                03
              </div>
              <h3 className="font-bold text-[#162915] text-base">Fresh Small Batch Milling</h3>
              <p className="text-xs text-[#5e715d] leading-relaxed">
                Instead of warehouse-aged stock, our flour and grains are freshly milled and packed in hygienic batches upon order fulfillment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS: FROM FARM TO TABLE */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-wider text-[#386b29] uppercase">
            Simple & Transparent
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#162915] mt-1.5">
            How It Works: Farm to Your Kitchen
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative bg-white rounded-2xl p-6 border border-[#ece6d7] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#386b29] text-white font-bold flex items-center justify-center mx-auto text-base shadow-sm">
              1
            </div>
            <h4 className="font-bold text-sm text-[#162915]">Ethical Harvesting</h4>
            <p className="text-xs text-[#6a7c68] leading-relaxed">
              Wheat, grains, and dairy are directly procured from verified pesticide-free farms.
            </p>
          </div>

          <div className="relative bg-white rounded-2xl p-6 border border-[#ece6d7] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#386b29] text-white font-bold flex items-center justify-center mx-auto text-base shadow-sm">
              2
            </div>
            <h4 className="font-bold text-sm text-[#162915]">Hygienic Chakki Milling</h4>
            <p className="text-xs text-[#6a7c68] leading-relaxed">
              Cleaned, washed, and stone-ground at low temperatures to lock in original taste.
            </p>
          </div>

          <div className="relative bg-white rounded-2xl p-6 border border-[#ece6d7] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#386b29] text-white font-bold flex items-center justify-center mx-auto text-base shadow-sm">
              3
            </div>
            <h4 className="font-bold text-sm text-[#162915]">Moisture-Proof Pack</h4>
            <p className="text-xs text-[#6a7c68] leading-relaxed">
              Sealed in food-grade packaging to protect natural freshness and aroma.
            </p>
          </div>

          <div className="relative bg-white rounded-2xl p-6 border border-[#ece6d7] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#386b29] text-white font-bold flex items-center justify-center mx-auto text-base shadow-sm">
              4
            </div>
            <h4 className="font-bold text-sm text-[#162915]">Islamabad & Pindi Delivery</h4>
            <p className="text-xs text-[#6a7c68] leading-relaxed">
              Delivered safely to your doorstep with Cash on Delivery in Islamabad & Rawalpindi.
            </p>
          </div>
        </div>
      </section>

      {/* 8. VERIFIED CUSTOMER REVIEWS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-wider text-[#386b29] uppercase">
            Customer Feedback
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#162915] mt-1.5">
            What Our Customers Say
          </h2>
          <p className="text-xs sm:text-sm text-[#6c7f6a] mt-1">
            Genuine experiences from homes across Islamabad and Rawalpindi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#ece6d7] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#f59e0b] mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#3d503b] leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#f4efe4] flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-[#162915]">{t.name}</h4>
                  <p className="text-[#7d8f7b] text-[11px]">{t.city}</p>
                </div>
                <span className="text-[10px] font-bold text-[#386b29] bg-[#eef7ec] px-2 py-0.5 rounded-md">
                  Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold tracking-wider text-[#386b29] uppercase">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#162915] mt-1.5">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#ede7d8] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#162915] hover:text-[#386b29] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-[#677965] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#386b29]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#556753] leading-relaxed border-t border-[#f4efe4]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. STRONG WHATSAPP DIRECT CALL-TO-ACTION */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-gradient-to-br from-[#1b3417] via-[#264b21] to-[#152a13] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-[#3b6633]">
          <div className="max-w-xl text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#97e082] mb-1">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Instant WhatsApp Customer Support</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              Need Help or Prefer Direct WhatsApp Ordering?
            </h2>
            <p className="text-xs sm:text-sm text-[#c7e4bf] leading-relaxed">
              Have questions regarding chakki wheat varieties, grain nutrition, or delivery times in your city? Our friendly organic specialists are online to assist you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => openWhatsAppChat('Assalam-o-Alaikum Pure Harvest Organic, I need assistance with product selection & ordering.')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-[0_6px_20px_rgba(37,211,102,0.35)] transition-all cursor-pointer active:scale-98"
            >
              <MessageCircle className="w-5 h-5 fill-current stroke-none" />
              <span>Chat on WhatsApp ({WHATSAPP_DISPLAY_NUMBER})</span>
            </button>

            <button
              onClick={() => onNavigate('shop')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-sm transition-all cursor-pointer"
            >
              Browse Shop
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
