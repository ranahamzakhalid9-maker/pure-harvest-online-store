import { useState, type FormEvent } from 'react';
import { Leaf, ShieldCheck, Heart, MapPin, Phone, Mail, Clock, Send, Check, MessageCircle } from 'lucide-react';
import TrustStrip from '../components/TrustStrip';
import { openWhatsAppChat, WHATSAPP_DISPLAY_NUMBER, WHATSAPP_INTL_NUMBER } from '../utils/whatsapp';

export function AboutPage() {
  return (
    <div className="w-full min-h-screen">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        {/* Banner */}
        <div className="bg-[#f7f4eb]/80 border border-[#eee7d8] rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto mb-10">
          <span className="text-[12px] font-extrabold tracking-[0.2em] text-[#386b29] uppercase">
            OUR HERITAGE & MISSION
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#162915] mt-2 mb-4">
            Pure Food. Pure Life.
          </h1>
          <p className="text-sm sm:text-base text-[#566754] max-w-2xl mx-auto leading-relaxed">
            Pure Harvest Organic was founded with a singular conviction: real wellness begins with pure, untampered soil and wholesome nutrition grown in harmony with nature.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto mb-12">
          <div className="rounded-3xl overflow-hidden shadow-md border border-[#ede7d8]">
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
              alt="Organic Farm Harvest"
              className="w-full h-80 object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#162915]">
              Direct from Ethical Organic Growers
            </h2>
            <p className="text-sm text-[#4f604d] leading-relaxed">
              We partner directly with certified organic family farms across Pakistan and select global regions, bringing you raw wildflower honey, cold-pressed olive oils, sun-ripened dates, and premium whole dry fruits.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-white rounded-2xl border border-[#eee7d8]">
                <Leaf className="w-5 h-5 text-[#386b29] mb-1" />
                <h4 className="font-bold text-xs text-[#182a17]">100% Certified</h4>
                <p className="text-[11px] text-[#71826f]">Strict non-GMO standards</p>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-[#eee7d8]">
                <ShieldCheck className="w-5 h-5 text-[#386b29] mb-1" />
                <h4 className="font-bold text-xs text-[#182a17]">Zero Chemicals</h4>
                <p className="text-[11px] text-[#71826f]">No synthetic additives</p>
              </div>
            </div>
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
        <div className="bg-[#f7f4eb]/80 border border-[#eee7d8] rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto mb-8">
          <span className="text-[12px] font-extrabold tracking-[0.2em] text-[#386b29] uppercase">
            WE ARE HERE TO HELP
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#162915] mt-2 mb-3">
            Contact Pure Harvest
          </h1>
          <p className="text-xs sm:text-sm text-[#566754] leading-relaxed">
            Have questions about our harvest, delivery, or custom gift orders? Reach out anytime.
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
                  <h5 className="font-bold text-[#182a17]">Location</h5>
                  <p>DHA Phase 5, Lahore, Pakistan</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#386b29] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-[#182a17]">Official WhatsApp / Phone</h5>
                  <p className="font-semibold text-[#182a17]">{WHATSAPP_INTL_NUMBER} ({WHATSAPP_DISPLAY_NUMBER})</p>
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
                </div>
              </div>

              {/* Direct WhatsApp button in contact card */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openWhatsAppChat('Assalam-o-Alaikum Pure Harvest Organic, I want to inquire about your organic products.')}
                  className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(37,211,102,0.3)] hover:shadow-lg transition-all active:scale-98"
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
                <p className="text-xs text-[#526550]">Thank you. Our organic care team will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#445542] mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2d9cd] bg-[#fbf9f4] text-xs sm:text-sm text-[#182a17] focus:bg-white focus:outline-none focus:border-[#386b29]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#445542] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
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
                    placeholder="e.g. Bulk order inquiry"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2d9cd] bg-[#fbf9f4] text-xs sm:text-sm text-[#182a17] focus:bg-white focus:outline-none focus:border-[#386b29]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#445542] mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we help you today?"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2d9cd] bg-[#fbf9f4] text-xs sm:text-sm text-[#182a17] focus:bg-white focus:outline-none focus:border-[#386b29]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#386b29] hover:bg-[#2c5520] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all"
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
