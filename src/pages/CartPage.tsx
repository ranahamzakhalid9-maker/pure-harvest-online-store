import { useState, type FormEvent } from 'react';
import { ChevronRight, Trash2, Heart, ArrowRight, ArrowLeft, Tag, Check, ShoppingBag, MessageCircle } from 'lucide-react';
import { CartItem, ActivePage } from '../types';
import HeroBasketScene from '../components/HeroBasketScene';
import TrustStrip from '../components/TrustStrip';
import { openWhatsAppChat, WHATSAPP_DISPLAY_NUMBER } from '../utils/whatsapp';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onNavigate: (page: ActivePage) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
}

export default function CartPage({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  onToggleWishlist,
  wishlistIds
}: CartPageProps) {
  const [couponCode, setCouponCode] = useState('WELCOME10');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('WELCOME10');
  const [couponError, setCouponError] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 150 : 0;
  const discountAmount = appliedCoupon ? Math.round(subtotal * 0.1) : 0;
  const total = Math.max(0, subtotal + deliveryFee - discountAmount);

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (couponCode.trim().toUpperCase() === 'WELCOME10') {
      setAppliedCoupon('WELCOME10');
    } else if (couponCode.trim().toUpperCase() === 'PUREHARVEST') {
      setAppliedCoupon('PUREHARVEST');
    } else {
      setCouponError('Invalid coupon code. Try "WELCOME10"');
    }
  };

  return (
    <div className="w-full min-h-screen">
      {/* 1. Header & Breadcrumb Hero Section matching reference 5 */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6">
        <div className="bg-[#f7f4eb]/80 border border-[#eee7d8] rounded-3xl sm:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left z-10">
            <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-semibold text-[#687a66] mb-3">
              <button onClick={() => onNavigate('home')} className="hover:text-[#386b29]">Home</button>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#386b29]">Cart</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#162915] leading-tight mb-3">
              Your Cart
            </h1>

            <p className="text-sm sm:text-base text-[#596d58] leading-relaxed">
              Review your items and proceed to checkout.
            </p>
          </div>

          <div className="w-full lg:w-auto flex justify-center">
            <HeroBasketScene />
          </div>
        </div>
      </section>

      {/* 2. Main Cart Table & Summary Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#ede7d8] shadow-sm max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#f0f7ee] text-[#386b29] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#182a17] mb-2">Your Cart is Empty</h3>
            <p className="text-sm text-[#6c7d6b] mb-6">Discover naturally grown fresh organic harvest today.</p>
            <button
              onClick={() => onNavigate('shop')}
              className="px-6 py-3 rounded-full bg-[#386b29] text-white font-semibold text-sm hover:bg-[#2c5520] transition-colors"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Area: Cart Table + Coupon (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Cart Table Container */}
              <div className="bg-white rounded-3xl border border-[#ede7d8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-12 px-6 py-4 bg-[#fcfbfa] border-b border-[#eee7da] text-xs font-bold text-[#718370] uppercase tracking-wider">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-[#f2eee3]">
                  {cartItems.map((item) => {
                    const isWishlisted = wishlistIds.includes(item.product.id);
                    const itemTotal = item.product.price * item.quantity;

                    return (
                      <div key={item.product.id} className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        
                        {/* Product info (6 cols) */}
                        <div className="sm:col-span-6 flex items-center gap-4">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#fbf9f4] border border-[#ede7d8] p-2 flex items-center justify-center shrink-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="flex-1">
                            <h4 className="font-bold text-[#182a17] text-sm sm:text-[15px] leading-snug">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-[#7a8a78] mt-0.5">{item.product.netWeight}</p>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-[11px] font-semibold text-[#c0392b] hover:underline mt-1.5 inline-flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" /> Remove
                            </button>
                          </div>
                        </div>

                        {/* Price (2 cols) */}
                        <div className="sm:col-span-2 flex sm:justify-center items-center justify-between text-xs sm:text-sm font-semibold text-[#182a17]">
                          <span className="sm:hidden text-[#7a8a78]">Unit Price:</span>
                          <span>Rs. {item.product.price.toLocaleString()}</span>
                        </div>

                        {/* Quantity Controls (2 cols) */}
                        <div className="sm:col-span-2 flex sm:justify-center items-center justify-between">
                          <span className="sm:hidden text-xs text-[#7a8a78]">Qty:</span>
                          <div className="flex items-center border border-[#e2d9cd] rounded-xl bg-[#fbf9f4] p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 rounded-lg bg-white text-xs font-bold text-[#445542] hover:bg-[#f4efe4] flex items-center justify-center transition-colors"
                            >
                              −
                            </button>
                            <span className="w-7 text-center font-bold text-xs text-[#182a17]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-lg bg-white text-xs font-bold text-[#445542] hover:bg-[#f4efe4] flex items-center justify-center transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Total & Wishlist (2 cols) */}
                        <div className="sm:col-span-2 flex sm:flex-col items-center sm:items-end justify-between gap-1">
                          <span className="sm:hidden text-xs font-bold text-[#7a8a78]">Row Total:</span>
                          <span className="font-bold text-sm sm:text-[15px] text-[#386b29]">
                            Rs. {itemTotal.toLocaleString()}
                          </span>
                          <button
                            onClick={() => onToggleWishlist(item.product.id)}
                            className="text-[#7d8e7b] hover:text-red-500 transition-colors p-1"
                            title="Save for Later"
                          >
                            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Coupon Box (Bottom Left) */}
              <div className="bg-white rounded-3xl p-6 border border-[#ede7d8] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <label className="block text-xs font-bold text-[#556753] uppercase tracking-wider mb-2">
                  Have a coupon code?
                </label>
                <form onSubmit={handleApplyCoupon} className="flex gap-3">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-[#8a9b88] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. WELCOME10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e2d9cc] bg-[#fbf9f4] text-xs sm:text-sm font-semibold uppercase text-[#182a17] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#386b29]/20 focus:border-[#386b29]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#386b29] hover:bg-[#2c5520] text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-all active:scale-98"
                  >
                    Apply
                  </button>
                </form>
                {appliedCoupon && (
                  <div className="mt-2 text-xs text-[#386b29] font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Coupon "{appliedCoupon}" applied (10% OFF)!
                  </div>
                )}
                {couponError && (
                  <div className="mt-2 text-xs text-red-600 font-medium">
                    {couponError}
                  </div>
                )}
              </div>
            </div>

            {/* Right Area: Cart Summary (4 cols) matching reference 5 */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#ece6d7] shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-5 sticky top-24">
                <h3 className="font-bold text-[#182a17] text-base pb-3 border-b border-[#f2eee3]">
                  Cart Summary
                </h3>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between text-[#576955]">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#182a17]">Rs. {subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-[#576955]">
                    <span>Delivery Charges</span>
                    <span className="font-bold text-[#182a17]">Rs. {deliveryFee.toLocaleString()}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#386b29] font-semibold">
                      <span>Discount ({appliedCoupon})</span>
                      <span>− Rs. {discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#f2eee3] flex justify-between items-baseline">
                    <span className="font-bold text-sm text-[#182a17]">Total</span>
                    <span className="font-serif text-2xl font-extrabold text-[#386b29]">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5">
                  <button
                    onClick={() => onNavigate('checkout')}
                    className="w-full py-3.5 rounded-2xl bg-[#386b29] hover:bg-[#2c5520] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(56,107,41,0.22)] hover:shadow-lg transition-all active:scale-98"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <button
                    onClick={() => {
                      const itemsSummary = cartItems
                        .map((it, idx) => `${idx + 1}. *${it.product.name}* (${it.product.netWeight}) × ${it.quantity} = Rs. ${(it.product.price * it.quantity).toLocaleString()}`)
                        .join('\n');
                      const msg = `🌿 *CART INQUIRY / DIRECT ORDER* 🌿\n━━━━━━━━━━━━━━━━━━━━\nAssalam-o-Alaikum Pure Harvest Organic, I want to order my cart items:\n\n${itemsSummary}\n\n━━━━━━━━━━━━━━━━━━━━\n💰 *Total (Approx):* Rs. ${total.toLocaleString()}\n\nPlease guide me on completing this order. Thank you!`;
                      openWhatsAppChat(msg);
                    }}
                    className="w-full py-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(37,211,102,0.25)] hover:shadow-lg transition-all active:scale-98"
                    title="Directly send cart items to WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-current stroke-none" />
                    <span>Order via WhatsApp ({WHATSAPP_DISPLAY_NUMBER})</span>
                  </button>
                </div>

                {/* Continue Shopping Link */}
                <button
                  onClick={() => onNavigate('shop')}
                  className="w-full py-2.5 text-center text-xs font-semibold text-[#5a6c58] hover:text-[#386b29] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Continue Shopping</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3. Benefits Strip */}
      <TrustStrip />
    </div>
  );
}
