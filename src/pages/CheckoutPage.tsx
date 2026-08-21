import { useState, useEffect, type FormEvent } from 'react';
import { ChevronRight, Lock, ArrowRight, ArrowLeft, Check, ShieldCheck, CreditCard, Banknote, Smartphone, CheckCircle2, MessageCircle, Copy, ExternalLink, Database, Sparkles, UserCheck } from 'lucide-react';
import { CartItem, ActivePage, ShippingInfo, DeliveryOption } from '../types';
import HeroBasketScene from '../components/HeroBasketScene';
import TrustStrip from '../components/TrustStrip';
import {
  generateOrderWhatsAppMessage,
  openWhatsAppChat,
  WHATSAPP_DISPLAY_NUMBER,
  WHATSAPP_INTL_NUMBER,
  OrderDetailsForWhatsApp
} from '../utils/whatsapp';
import { createOrderInFirestore } from '../lib/firebase';
import type { User as FirebaseUser } from 'firebase/auth';

interface CheckoutPageProps {
  cartItems: CartItem[];
  currentUser?: FirebaseUser | null;
  onNavigate: (page: ActivePage) => void;
  onClearCart: () => void;
}

export default function CheckoutPage({ cartItems, currentUser, onNavigate, onClearCart }: CheckoutPageProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [orderId] = useState<string>(() => `#PHO-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [placedOrderDetails, setPlacedOrderDetails] = useState<OrderDetailsForWhatsApp | null>(null);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Form State
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: currentUser?.displayName || 'Hamza Khalid',
    phone: '03094083549',
    email: currentUser?.email || 'ranahamzakhalid9@gmail.com',
    address: 'House 42, Street 7, Block B, DHA Phase 5',
    city: 'Lahore',
    state: 'Punjab',
    postalCode: '54000',
    saveAddress: true
  });

  useEffect(() => {
    if (currentUser) {
      setShippingInfo((prev) => ({
        ...prev,
        fullName: currentUser.displayName || prev.fullName,
        email: currentUser.email || prev.email
      }));
    }
  }, [currentUser]);

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'wallet'>('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const activeCart = placedOrderDetails ? placedOrderDetails.cartItems : cartItems;
  const deliveryPrice = deliveryMethod === 'standard' ? 150 : 250;
  const subtotal = activeCart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * 0.1); // WELCOME10 coupon
  const total = Math.max(0, subtotal + deliveryPrice - discountAmount);

  const handleContinueToPayment = (e: FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const [firestoreSynced, setFirestoreSynced] = useState<boolean | null>(null);

  const handlePlaceOrder = async () => {
    const orderData: OrderDetailsForWhatsApp = {
      orderId,
      shippingInfo,
      cartItems: [...cartItems],
      subtotal,
      deliveryMethod,
      deliveryPrice,
      discountAmount,
      total,
      paymentMethod
    };

    setPlacedOrderDetails(orderData);
    setCurrentStep(3);
    setOrderPlaced(true);

    // 1. Save directly to Central Cloud Firestore Database (/orders) for Order Receiving Web App & CRM
    try {
      const res = await createOrderInFirestore(
        orderId,
        shippingInfo,
        cartItems,
        subtotal,
        deliveryMethod,
        deliveryPrice,
        discountAmount,
        total,
        paymentMethod
      );
      setFirestoreSynced(res.success);
    } catch (e) {
      console.error('Firestore save failed:', e);
      setFirestoreSynced(false);
    }

    // Clear cart and scroll up smoothly to show success screen
    onClearCart();
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleManualSendWhatsApp = () => {
    if (placedOrderDetails) {
      const waMessage = generateOrderWhatsAppMessage(placedOrderDetails);
      openWhatsAppChat(waMessage);
    }
  };

  const handleCopyOrderSummary = () => {
    if (placedOrderDetails) {
      const waMessage = generateOrderWhatsAppMessage(placedOrderDetails);
      navigator.clipboard.writeText(waMessage);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    }
  };

  return (
    <div className="w-full min-h-screen">
      {/* 1. Header & Hero matching reference 6 */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6">
        <div className="bg-[#f7f4eb]/80 border border-[#eee7d8] rounded-3xl sm:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left z-10">
            <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-semibold text-[#687a66] mb-3">
              <button onClick={() => onNavigate('home')} className="hover:text-[#386b29]">Home</button>
              <ChevronRight className="w-3.5 h-3.5" />
              <button onClick={() => onNavigate('cart')} className="hover:text-[#386b29]">Cart</button>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#386b29]">Checkout</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#162915] leading-tight mb-3">
              Checkout
            </h1>

            <p className="text-sm sm:text-base text-[#596d58] leading-relaxed">
              Complete your order by providing your details.
            </p>
          </div>

          <div className="w-full lg:w-auto flex justify-center">
            <HeroBasketScene />
          </div>
        </div>
      </section>

      {/* 2. Checkout Progress Indicator matching reference 6 */}
      <div className="w-full max-w-2xl mx-auto px-4 my-6">
        <div className="flex items-center justify-between relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[2px] bg-[#e6dfd1] -z-0" />
          <div
            className="absolute top-1/2 left-8 -translate-y-1/2 h-[2px] bg-[#386b29] -z-0 transition-all duration-500"
            style={{
              width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%'
            }}
          />

          {/* Step 1: Shipping */}
          <div className="flex items-center gap-2 bg-[#fbf9f4] px-3 z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              currentStep >= 1 ? 'bg-[#386b29] text-white shadow-xs' : 'bg-[#e7e1d3] text-[#6d7d6b]'
            }`}>
              {currentStep > 1 ? <Check className="w-4 h-4 stroke-[3]" /> : '1'}
            </div>
            <span className={`text-xs font-bold ${currentStep >= 1 ? 'text-[#182a17]' : 'text-[#879885]'}`}>
              Shipping
            </span>
          </div>

          {/* Step 2: Payment */}
          <div className="flex items-center gap-2 bg-[#fbf9f4] px-3 z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              currentStep >= 2 ? 'bg-[#386b29] text-white shadow-xs' : 'bg-[#e7e1d3] text-[#6d7d6b]'
            }`}>
              {currentStep > 2 ? <Check className="w-4 h-4 stroke-[3]" /> : '2'}
            </div>
            <span className={`text-xs font-bold ${currentStep >= 2 ? 'text-[#182a17]' : 'text-[#879885]'}`}>
              Payment
            </span>
          </div>

          {/* Step 3: Confirm */}
          <div className="flex items-center gap-2 bg-[#fbf9f4] px-3 z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              currentStep === 3 ? 'bg-[#386b29] text-white shadow-xs' : 'bg-[#e7e1d3] text-[#6d7d6b]'
            }`}>
              3
            </div>
            <span className={`text-xs font-bold ${currentStep === 3 ? 'text-[#182a17]' : 'text-[#879885]'}`}>
              Confirm
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Form & Order Summary */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentStep === 3 ? (
          /* Order Confirmation Screen */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#ede7d8] shadow-md max-w-2xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#f0f7ee] border-2 border-[#cce5c6] text-[#386b29] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eaf7e8] border border-[#bee2b8] text-[#386b29] text-xs font-bold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-[#386b29] animate-pulse" />
                Live Synced to Order Receiving Portal
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#182a17]">
                Order Placed Successfully!
              </h2>
            </div>

            <p className="text-sm text-[#556753] max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-[#182a17]">{shippingInfo.fullName}</span>! Your order has been submitted and received directly on our <strong className="text-[#182a17]">Order Receiving & Dispatch Dashboard</strong> for immediate packing.
            </p>

            {/* Cloud Database & Dispatch System Status Box */}
            <div className="bg-[#f2f8ee] border-2 border-[#cbe4c5] rounded-2xl p-5 text-left space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#386b29] text-white flex items-center justify-center shadow-xs">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#182a17]">Order Receiving Web App Sync</h4>
                    <p className="text-[11px] text-[#4e644c]">
                      Order status: <span className="font-bold text-[#2d681f]">Sent to /orders (Live Pending Queue)</span>
                    </p>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-[#386b29] text-white text-[11px] font-bold flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Received</span>
                </div>
              </div>
            </div>

            {/* Order Summary details */}
            <div className="p-5 bg-[#fbf9f4] rounded-2xl border border-[#ede7d8] text-xs text-left space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-[#728370]">Order ID:</span>
                <span className="font-bold text-[#182a17]">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#728370]">Customer Name:</span>
                <span className="font-bold text-[#182a17]">{shippingInfo.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#728370]">Customer Phone:</span>
                <span className="font-bold text-[#182a17]">{shippingInfo.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#728370]">Delivery Address:</span>
                <span className="font-medium text-[#182a17] text-right max-w-[220px] truncate">{shippingInfo.address}, {shippingInfo.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#728370]">Estimated Delivery:</span>
                <span className="font-bold text-[#386b29]">
                  {deliveryMethod === 'express' ? '1–2 Business Days' : '3–5 Business Days'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#728370]">Payment Method:</span>
                <span className="font-bold text-[#182a17]">
                  {paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : paymentMethod === 'card' ? 'Credit / Debit Card' : 'Mobile Wallet'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#ede7d8]">
                <span className="font-bold text-sm text-[#182a17]">Total Amount:</span>
                <span className="font-bold text-[#386b29] text-base">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Optional WhatsApp Support */}
            <div className="pt-2">
              <button
                onClick={handleManualSendWhatsApp}
                className="w-full max-w-md mx-auto py-2.5 px-4 rounded-xl bg-white border border-[#cbe4c5] hover:bg-[#f3f9f1] text-[#2b5921] font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-2xs"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Optional: Contact Support on WhatsApp ({WHATSAPP_DISPLAY_NUMBER})</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('home')}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#386b29] hover:bg-[#2c5520] text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                Back to Home
              </button>
              <button
                onClick={() => onNavigate('shop')}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#f4efe4] hover:bg-[#ebe2d2] text-[#182a17] font-semibold text-xs sm:text-sm transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (7 cols): Shipping or Payment */}
            <div className="lg:col-span-7 space-y-6">
              
              {currentStep === 1 ? (
                /* Step 1: Shipping Details Form matching reference 6 */
                <form onSubmit={handleContinueToPayment} className="space-y-6">
                  
                  {/* Shipping Details Card */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ede7d8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                    <h3 className="font-bold text-[#182a17] text-lg pb-2 border-b border-[#f2ede0]">
                      Shipping Details
                    </h3>

                    {/* Full Name & Phone Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#445542] mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter your full name"
                          value={shippingInfo.fullName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#e2d9cd] bg-[#fbf9f4] text-xs sm:text-sm text-[#182a17] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#386b29]/20 focus:border-[#386b29]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#445542] mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="03xxxxxxxxx"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#e2d9cd] bg-[#fbf9f4] text-xs sm:text-sm text-[#182a17] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#386b29]/20 focus:border-[#386b29]"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-semibold text-[#445542] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="youremail@gmail.com"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e2d9cd] bg-[#fbf9f4] text-xs sm:text-sm text-[#182a17] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#386b29]/20 focus:border-[#386b29]"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-xs font-semibold text-[#445542] mb-1.5">
                        Address *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="House no., Street, Area"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e2d9cd] bg-[#fbf9f4] text-xs sm:text-sm text-[#182a17] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#386b29]/20 focus:border-[#386b29]"
                      />
                    </div>

                    {/* City, State, Postal Code */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#445542] mb-1.5">
                          City *
                        </label>
                        <select
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-[#e2d9cd] bg-[#fbf9f4] text-xs sm:text-sm text-[#182a17] focus:bg-white focus:outline-none focus:border-[#386b29]"
                        >
                          <option value="Lahore">Lahore</option>
                          <option value="Karachi">Karachi</option>
                          <option value="Islamabad">Islamabad</option>
                          <option value="Rawalpindi">Rawalpindi</option>
                          <option value="Faisalabad">Faisalabad</option>
                          <option value="Multan">Multan</option>
                          <option value="Peshawar">Peshawar</option>
                          <option value="Quetta">Quetta</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#445542] mb-1.5">
                          State / Province *
                        </label>
                        <select
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-[#e2d9cd] bg-[#fbf9f4] text-xs sm:text-sm text-[#182a17] focus:bg-white focus:outline-none focus:border-[#386b29]"
                        >
                          <option value="Punjab">Punjab</option>
                          <option value="Sindh">Sindh</option>
                          <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                          <option value="Balochistan">Balochistan</option>
                          <option value="Islamabad Capital">Islamabad Capital</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#445542] mb-1.5">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          placeholder="Enter postal code"
                          value={shippingInfo.postalCode}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-[#e2d9cd] bg-[#fbf9f4] text-xs sm:text-sm text-[#182a17] focus:bg-white focus:outline-none focus:border-[#386b29]"
                        />
                      </div>
                    </div>

                    {/* Save address checkbox */}
                    <div className="pt-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#465744]">
                        <input
                          type="checkbox"
                          checked={shippingInfo.saveAddress}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, saveAddress: e.target.checked })}
                          className="w-4 h-4 rounded border-[#ccd8ca] text-[#386b29] focus:ring-[#386b29]"
                        />
                        <span>Save this address for next time</span>
                      </label>
                    </div>
                  </div>

                  {/* Delivery Options Card matching reference 6 */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ede7d8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                    <h3 className="font-bold text-[#182a17] text-lg pb-2 border-b border-[#f2ede0]">
                      Delivery Options
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Standard Delivery */}
                      <label
                        onClick={() => setDeliveryMethod('standard')}
                        className={`p-4 rounded-2xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                          deliveryMethod === 'standard'
                            ? 'border-[#386b29] bg-[#f2f8ee]'
                            : 'border-[#ede7d8] bg-white hover:border-[#ccd8ca]'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              deliveryMethod === 'standard' ? 'border-[#386b29]' : 'border-[#b5c5b3]'
                            }`}>
                              {deliveryMethod === 'standard' && <div className="w-2 h-2 rounded-full bg-[#386b29]" />}
                            </div>
                            <span className="font-bold text-xs sm:text-sm text-[#182a17]">
                              Standard Delivery
                            </span>
                          </div>
                          <span className="font-bold text-xs sm:text-sm text-[#386b29]">Rs. 150</span>
                        </div>
                        <div className="mt-2 text-[11px] text-[#6d7e6b] pl-6.5">
                          <p className="font-medium text-[#293c27]">3–5 Business Days</p>
                          <p>Delivered to your doorstep</p>
                        </div>
                      </label>

                      {/* Express Delivery */}
                      <label
                        onClick={() => setDeliveryMethod('express')}
                        className={`p-4 rounded-2xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                          deliveryMethod === 'express'
                            ? 'border-[#386b29] bg-[#f2f8ee]'
                            : 'border-[#ede7d8] bg-white hover:border-[#ccd8ca]'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              deliveryMethod === 'express' ? 'border-[#386b29]' : 'border-[#b5c5b3]'
                            }`}>
                              {deliveryMethod === 'express' && <div className="w-2 h-2 rounded-full bg-[#386b29]" />}
                            </div>
                            <span className="font-bold text-xs sm:text-sm text-[#182a17]">
                              Express Delivery
                            </span>
                          </div>
                          <span className="font-bold text-xs sm:text-sm text-[#386b29]">Rs. 250</span>
                        </div>
                        <div className="mt-2 text-[11px] text-[#6d7e6b] pl-6.5">
                          <p className="font-medium text-[#293c27]">1–2 Business Days</p>
                          <p>Faster delivery to your doorstep</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </form>
              ) : (
                /* Step 2: Payment Details Selection */
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ede7d8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#f2ede0]">
                    <h3 className="font-bold text-[#182a17] text-lg">Select Payment Method</h3>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-xs font-semibold text-[#386b29] hover:underline"
                    >
                      Edit Shipping Details
                    </button>
                  </div>

                  <div className="space-y-3">
                    {/* Cash on delivery */}
                    <label
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === 'cod' ? 'border-[#386b29] bg-[#f2f8ee]' : 'border-[#ede7d8] hover:border-[#ccd8ca]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Banknote className="w-5 h-5 text-[#386b29]" />
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-[#182a17]">Cash on Delivery (COD)</div>
                          <div className="text-[11px] text-[#6c7d6a]">Pay in cash upon parcel delivery</div>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'cod' ? 'border-[#386b29]' : 'border-[#b5c5b3]'
                      }`}>
                        {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-[#386b29]" />}
                      </div>
                    </label>

                    {/* Credit/Debit Card */}
                    <label
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === 'card' ? 'border-[#386b29] bg-[#f2f8ee]' : 'border-[#ede7d8] hover:border-[#ccd8ca]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-[#386b29]" />
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-[#182a17]">Credit / Debit Card</div>
                          <div className="text-[11px] text-[#6c7d6a]">Visa, Mastercard, PayPak</div>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'card' ? 'border-[#386b29]' : 'border-[#b5c5b3]'
                      }`}>
                        {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-[#386b29]" />}
                      </div>
                    </label>

                    {/* Mobile Wallet */}
                    <label
                      onClick={() => setPaymentMethod('wallet')}
                      className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === 'wallet' ? 'border-[#386b29] bg-[#f2f8ee]' : 'border-[#ede7d8] hover:border-[#ccd8ca]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-[#386b29]" />
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-[#182a17]">Easypaisa / JazzCash</div>
                          <div className="text-[11px] text-[#6c7d6a]">Instant mobile account payment</div>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'wallet' ? 'border-[#386b29]' : 'border-[#b5c5b3]'
                      }`}>
                        {paymentMethod === 'wallet' && <div className="w-2 h-2 rounded-full bg-[#386b29]" />}
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (5 cols): Your Order Summary matching reference 6 */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#ece6d7] shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-5 sticky top-24">
                <h3 className="font-bold text-[#182a17] text-base pb-3 border-b border-[#f2ede0]">
                  Your Order ({cartItems.length} Items)
                </h3>

                {/* Item list */}
                <div className="divide-y divide-[#f5f1e8] max-h-60 overflow-y-auto pr-1 space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="pt-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-xl bg-[#fbf9f4] border border-[#ede7d8] p-1 object-contain"
                        />
                        <div>
                          <h5 className="font-semibold text-xs text-[#182a17] line-clamp-1">{item.product.name}</h5>
                          <p className="text-[11px] text-[#788a76]">{item.product.netWeight} × {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-xs text-[#182a17]">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotals */}
                <div className="pt-3 border-t border-[#f2ede0] space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between text-[#576955]">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#182a17]">Rs. {subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-[#576955]">
                    <span>Delivery Charges</span>
                    <span className="font-bold text-[#182a17]">Rs. {deliveryPrice.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-[#386b29] font-semibold">
                    <span>Discount (WELCOME10)</span>
                    <span>− Rs. {discountAmount.toLocaleString()}</span>
                  </div>

                  <div className="pt-3 border-t border-[#f2ede0] flex justify-between items-baseline">
                    <span className="font-bold text-sm text-[#182a17]">Total</span>
                    <span className="font-serif text-2xl font-extrabold text-[#386b29]">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action button */}
                {currentStep === 1 ? (
                  <button
                    onClick={handleContinueToPayment}
                    className="w-full py-3.5 rounded-2xl bg-[#386b29] hover:bg-[#2c5520] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(56,107,41,0.22)] hover:shadow-lg transition-all active:scale-98"
                  >
                    <Lock className="w-4 h-4 stroke-[2.2]" />
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={handlePlaceOrder}
                      className="w-full py-3.5 rounded-2xl bg-[#386b29] hover:bg-[#2c5520] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(56,107,41,0.25)] hover:shadow-lg transition-all active:scale-98"
                    >
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                      <span>PLACE ORDER (Rs. {total.toLocaleString()})</span>
                    </button>
                    <p className="text-[11px] text-center text-[#556953] flex items-center justify-center gap-1.5 font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#386b29] animate-pulse" />
                      Instant live order sync to Order Receiving Web App
                    </p>
                  </div>
                )}

                <button
                  onClick={() => onNavigate('cart')}
                  className="w-full py-1 text-center text-xs font-semibold text-[#5a6c58] hover:text-[#386b29] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Cart</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 4. Benefits Strip */}
      <TrustStrip />
    </div>
  );
}
