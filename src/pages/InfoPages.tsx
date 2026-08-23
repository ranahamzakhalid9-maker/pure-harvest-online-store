import { useState, type FormEvent } from 'react';
import { Leaf, ShieldCheck, Heart, MapPin, Phone, Mail, Clock, Send, Check, MessageCircle, Wheat, Droplets, Sparkles, CheckCircle2, Play, ExternalLink, Film } from 'lucide-react';
import TrustStrip from '../components/TrustStrip';
import { openWhatsAppChat, WHATSAPP_DISPLAY_NUMBER, WHATSAPP_INTL_NUMBER } from '../utils/whatsapp';

export function AboutPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoDriveId = "1wbiF8a74_OljDlNtaXpOiynKHy-MzkJu";
  const videoPreviewUrl = `https://drive.google.com/file/d/${videoDriveId}/preview`;
  const videoDirectUrl = `https://drive.google.com/file/d/${videoDriveId}/view?usp=drive_link`;

  return (
    <div className="w-full min-h-screen">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        {/* Banner */}
        <div className="bg-[#f7f4eb]/90 border border-[#eee7d8] rounded-3xl sm:rounded-[36px] p-8 sm:p-14 text-center max-w-4xl mx-auto mb-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#eaf5e7] border border-[#c6e5c2] text-[#386b29] text-xs font-bold uppercase tracking-wider mb-3">
            <Wheat className="w-3.5 h-3.5" />
            <span>Pure Harvest Organics</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#162915] leading-tight mb-4">
            About Pure Harvest Organics
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#386b29] mb-4">
            Pure Food. Honest Sourcing. A Better Harvest.
          </p>
          <p className="text-sm sm:text-base text-[#566754] max-w-3xl mx-auto leading-relaxed">
            At Pure Harvest Organics, we believe that good food begins with good ingredients. In a world of heavily processed food and complex supply chains, we are committed to returning to what matters most: purity, freshness, and responsible production.
          </p>
          <p className="text-xs sm:text-sm text-[#667764] max-w-2xl mx-auto mt-2">
            Based in the Islamabad and Rawalpindi region, Pure Harvest Organics was founded with a clear mission — to provide families with food products that are naturally sourced, carefully processed, and delivered with integrity.
          </p>
        </div>

        {/* Video Story Section */}
        <div className="max-w-5xl mx-auto mb-14 bg-[#142614] rounded-3xl sm:rounded-[32px] p-6 sm:p-10 text-white shadow-xl border border-[#2b442a] overflow-hidden relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a4e25] text-[#b4e7ab] text-xs font-bold uppercase tracking-wider mb-2">
                <Film className="w-3.5 h-3.5" />
                <span>Our Story In Action</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Watch Our Sourcing & Milling Process
              </h2>
              <p className="text-xs sm:text-sm text-[#a4c5a0] max-w-xl mt-1">
                Take a behind-the-scenes look at how Pure Harvest Organics selects clean grains, stone-mills flour fresh, and preserves natural purity for your family.
              </p>
            </div>
            <a
              href={videoDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-colors self-start md:self-auto shrink-0"
            >
              <span>Open in Google Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Embedded Video Player Container */}
          <div className="relative w-full aspect-video sm:aspect-16/9 rounded-2xl overflow-hidden bg-black/80 border border-white/10 shadow-2xl">
            <iframe
              src={videoPreviewUrl}
              title="Pure Harvest Organics Video Story"
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-[11px] sm:text-xs text-[#9dbd99]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#52b13c] animate-pulse" />
              <span>Authentic Chakki Milling & Traditional Processing</span>
            </div>
            <span>Serving Islamabad & Rawalpindi with Doorstep Cash on Delivery</span>
          </div>
        </div>

        {/* Section 1: From the Farm to Your Family */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto mb-14">
          <div className="rounded-3xl overflow-hidden shadow-md border border-[#ede7d8] relative group">
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
              alt="Organic Wheat Harvest"
              className="w-full h-88 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-xs text-white p-4 rounded-2xl border border-white/20">
              <p className="text-xs font-semibold">📍 Sourced from select ethical growers in Pakistan</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#386b29] uppercase tracking-wider">
              <Leaf className="w-4 h-4" />
              <span>Our Philosophy</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#162915] leading-snug">
              🌾 From the Farm to Your Family
            </h2>
            <p className="text-sm text-[#4f604d] leading-relaxed">
              We focus on traditional food staples that form the backbone of everyday Pakistani meals. From wholesome wheat flours to pure Desi Ghee, our goal is to preserve the natural qualities of the ingredients we work with.
            </p>
            <p className="text-sm text-[#4f604d] leading-relaxed">
              We prioritize stone milling, careful sourcing, and minimal processing so that what reaches your kitchen retains its natural goodness, aroma, and taste.
            </p>
            <div className="p-4 bg-[#fbf9f4] rounded-2xl border border-[#ede7d8] flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#386b29] shrink-0" />
              <p className="text-xs text-[#2c3d2a] font-medium">
                Direct fresh delivery in Islamabad & Rawalpindi with 100% Cash on Delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Our Products */}
        <div className="max-w-5xl mx-auto mb-14 bg-white rounded-3xl p-8 sm:p-10 border border-[#ede7d8] shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#386b29]">Our Range</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#162915] mt-1 mb-2">
              Our Products
            </h2>
            <p className="text-xs sm:text-sm text-[#5f715d]">
              Our current product range includes carefully selected staples designed for everyday nutrition:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-[#fbf9f4] border border-[#eee8dc] space-y-3">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#eee8dc] shadow-xs bg-white p-1">
                <img
                  src="https://i.postimg.cc/RCYLNsGp/a89316cd-82f0-455e-8f90-4973a1a0a212.png"
                  alt="Premium Desi Wheat Flour"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <h4 className="font-bold text-sm text-[#182a17]">Premium Desi Wheat Flour</h4>
              <p className="text-xs text-[#5f715d] leading-relaxed">
                Wholesome wheat flour processed to maintain quality, aroma, and everyday nutrition. (Rs 200/Kg)
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fbf9f4] border border-[#eee8dc] space-y-3">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#eee8dc] shadow-xs bg-white p-1">
                <img
                  src="https://i.postimg.cc/NM5bzWpX/5d898bb8-3a3b-48e3-b4e1-ea9d498d174b.png"
                  alt="Desi White Wheat Flour"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <h4 className="font-bold text-sm text-[#182a17]">Desi White Wheat Flour</h4>
              <p className="text-xs text-[#5f715d] leading-relaxed">
                A lighter flour option suitable for soft rotis and daily family meals. (Rs 180/Kg)
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fbf9f4] border border-[#eee8dc] space-y-3">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#eee8dc] shadow-xs bg-white p-1">
                <img
                  src="https://i.postimg.cc/RF6QRwZh/1bdf141f-fb57-4248-a592-a1910a5c7b4a.png"
                  alt="Stone Grounded Wheat Flour"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <h4 className="font-bold text-sm text-[#182a17]">Stone Grounded Wheat Flour</h4>
              <p className="text-xs text-[#5f715d] leading-relaxed">
                Milled using traditional stone grinding methods to help preserve the grain's natural characteristics. (Rs 230/Kg)
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fbf9f4] border border-[#eee8dc] space-y-3">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#eee8dc] shadow-xs bg-white p-1">
                <img
                  src="https://i.postimg.cc/Qxb5cfJR/7a0e5c1d-1d96-4c7a-9247-739876624f49.png"
                  alt="Brown & White Mixed Flour"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <h4 className="font-bold text-sm text-[#182a17]">Brown & White Mixed Flour</h4>
              <p className="text-xs text-[#5f715d] leading-relaxed">
                A balanced flour option combining the benefits of different wheat types for everyday cooking. (Rs 190/Kg)
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fbf9f4] border border-[#eee8dc] space-y-3">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#eee8dc] shadow-xs bg-white p-1">
                <img
                  src="https://i.postimg.cc/wMWqjRDQ/5aa349e1-265e-4016-96cc-d57c412bcd98.png"
                  alt="Premium Multigrain Flour"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <h4 className="font-bold text-sm text-[#182a17]">Premium Multigrain Flour</h4>
              <p className="text-xs text-[#5f715d] leading-relaxed">
                A nutrient-rich blend of grains for health-conscious families. (Rs 400/Kg)
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fbf9f4] border border-[#eee8dc] space-y-3">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#eee8dc] shadow-xs bg-white p-1">
                <img
                  src="https://i.postimg.cc/02xX8HNh/33a473c0-69f6-4a1e-9754-60208cded94a.png"
                  alt="Premium Desi Ghee"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <h4 className="font-bold text-sm text-[#182a17]">Premium Desi Ghee</h4>
              <p className="text-xs text-[#5f715d] leading-relaxed">
                Traditional Desi Ghee crafted with a focus on purity, authentic flavor, and culinary versatility. (Rs 4000/Kg)
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Why Choose Pure Harvest & Our Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-14">
          <div className="bg-[#f2f8ee] border border-[#cbe4c5] rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#182a17] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#386b29]" />
              Why Choose Pure Harvest?
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-[#3b5239]">
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-[#386b29]">•</span>
                <span><strong>Quality Over Compromise:</strong> We focus on careful sourcing and premium quality rather than low-grade mass production.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-[#386b29]">•</span>
                <span><strong>Traditional Processing:</strong> We utilize stone grinding methods that respect the natural structure of the grain.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-[#386b29]">•</span>
                <span><strong>Local Focus:</strong> Serving Islamabad and Rawalpindi with reliable delivery and responsive customer support.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-[#386b29]">•</span>
                <span><strong>Honest Approach:</strong> Transparent sourcing, clear product information, and a commitment to long-term trust.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-[#ede7d8] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#182a17] flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#386b29]" />
              Our Vision for the Future
            </h3>
            <p className="text-xs sm:text-sm text-[#4f604d] leading-relaxed">
              Our long-term goal is to build an integrated organic food ecosystem in Pakistan — expanding from responsible sourcing and processing into direct organic farming partnerships and certified organic product lines.
            </p>
            <p className="text-xs sm:text-sm text-[#4f604d] leading-relaxed">
              We want to make wholesome, naturally sourced food more accessible to families who care about what they eat.
            </p>
            <div className="pt-2 border-t border-[#f0ebd9] text-xs text-[#2c402a] font-semibold">
              🌱 From Pakistan's Farms to Pakistani Homes
            </div>
          </div>
        </div>

        {/* Section 4: Our Promise & Footer Callout */}
        <div className="bg-[#182a17] text-white rounded-3xl sm:rounded-[32px] p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#274425] border border-[#3e663a] text-[#86bf76] text-xs font-bold uppercase tracking-wider">
            <span>Our Commitment</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
            Our Promise
          </h2>
          <p className="text-xs sm:text-sm text-[#c8dec6] max-w-2xl mx-auto leading-relaxed">
            Whether you are ordering our stone-ground wheat flour or pure Desi Ghee, our promise is simple: honest food, transparent sourcing, and an unwavering commitment to quality.
          </p>
          <div className="pt-4 border-t border-[#263e25] max-w-xl mx-auto">
            <p className="font-serif italic text-base sm:text-lg text-[#95d683] mb-4">
              🌾 Pure Food. Honest Sourcing. Better Living.
            </p>
            <button
              onClick={() => openWhatsAppChat('Assalam-o-Alaikum, I have an inquiry for Pure Harvest Organics.')}
              className="px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current stroke-none" />
              <span>Contact via WhatsApp ({WHATSAPP_DISPLAY_NUMBER})</span>
            </button>
          </div>
        </div>
      </section>

      <TrustStrip />
    </div>
  );
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="w-full min-h-screen">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <div className="bg-[#f7f4eb]/80 border border-[#eee7d8] rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto mb-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <span className="text-[12px] font-extrabold tracking-[0.2em] text-[#386b29] uppercase">
            WE ARE HERE TO HELP
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#162915] mt-2 mb-3">
            Contact Pure Harvest Organics
          </h1>
          <p className="text-xs sm:text-sm text-[#566754] leading-relaxed max-w-xl mx-auto">
            We deliver exclusively across Islamabad & Rawalpindi. Have questions about our harvest, delivery schedule, or custom orders? Reach out anytime!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Contact Details */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#ede7d8] shadow-sm space-y-6">
            <h3 className="font-bold text-[#182a17] text-base pb-2 border-b border-[#f2ede0]">
              Headquarters & Support
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#465744]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#386b29] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-[#182a17]">Official Address</h5>
                  <p className="font-medium text-[#2d422b]">Paris Tower Road, Umer Block H13 Islamabad</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-[#eef7ec] text-[#386b29] text-[11px] font-bold">
                    Deliveries in Islamabad & Rawalpindi
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#386b29] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-[#182a17]">Official WhatsApp / Phone</h5>
                  <p className="font-bold text-[#182a17]">{WHATSAPP_DISPLAY_NUMBER}</p>
                  <p className="text-[11px] text-[#6d806c]">International: {WHATSAPP_INTL_NUMBER}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#386b29] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-[#182a17]">Official Email</h5>
                  <a href="mailto:pureharvestorganic@gmail.com" className="text-[#386b29] font-medium hover:underline">
                    pureharvestorganic@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#386b29] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-[#182a17]">Working Hours</h5>
                  <p>Monday – Saturday: 9:00 AM – 8:00 PM</p>
                  <p className="text-[11px] text-[#71826f]">Sunday: Delivery dispatch active</p>
                </div>
              </div>

              {/* Direct WhatsApp button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openWhatsAppChat('Assalam-o-Alaikum Pure Harvest Organics, I want to inquire about your wheat flour and desi ghee.')}
                  className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(37,211,102,0.3)] hover:shadow-lg transition-all active:scale-98 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current stroke-none" />
                  <span>Chat on WhatsApp ({WHATSAPP_DISPLAY_NUMBER})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#ede7d8] shadow-sm">
            <h3 className="font-bold text-[#182a17] text-base pb-2 border-b border-[#f2ede0] mb-4">
              Send us a Message
            </h3>

            {submitted ? (
              <div className="p-6 bg-[#f0f7ee] border border-[#cde8c7] rounded-2xl text-center space-y-2">
                <Check className="w-8 h-8 text-[#386b29] mx-auto" />
                <h4 className="font-bold text-[#182a17] text-sm">Message Sent!</h4>
                <p className="text-xs text-[#526550]">Thank you. Our team in Islamabad will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#445542] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ali Ahmed"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2d9cd] bg-[#fbf9f4] text-xs sm:text-sm text-[#182a17] focus:bg-white focus:outline-none focus:border-[#386b29]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#445542] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="03xxxxxxxxx"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2d9cd] bg-[#fbf9f4] text-xs sm:text-sm text-[#182a17] focus:bg-white focus:outline-none focus:border-[#386b29]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#445542] mb-1">City *</label>
                    <select
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2d9cd] bg-[#fbf9f4] text-xs sm:text-sm text-[#182a17] focus:bg-white focus:outline-none focus:border-[#386b29]"
                    >
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#445542] mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="youremail@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2d9cd] bg-[#fbf9f4] text-xs sm:text-sm text-[#182a17] focus:bg-white focus:outline-none focus:border-[#386b29]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#445542] mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stone ground flour order inquiry"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2d9cd] bg-[#fbf9f4] text-xs sm:text-sm text-[#182a17] focus:bg-white focus:outline-none focus:border-[#386b29]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#445542] mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your requirements..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2d9cd] bg-[#fbf9f4] text-xs sm:text-sm text-[#182a17] focus:bg-white focus:outline-none focus:border-[#386b29]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#386b29] hover:bg-[#2c5520] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <TrustStrip />
    </div>
  );
}
