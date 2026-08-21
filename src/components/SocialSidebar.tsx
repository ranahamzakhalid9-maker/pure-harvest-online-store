import { Leaf, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
import { WHATSAPP_DISPLAY_NUMBER, openWhatsAppChat } from '../utils/whatsapp';

export default function SocialSidebar() {
  return (
    <div className="hidden lg:flex flex-col items-center gap-3 absolute left-6 sm:left-8 top-1/2 -translate-y-1/2 z-20">
      {/* Leaf icon container */}
      <div className="w-10 h-10 rounded-full bg-white border border-[#e5dfd0] shadow-sm flex items-center justify-center text-[#386b29] hover:bg-[#f2f8ee] transition-colors cursor-pointer" title="Pure Organic Certified">
        <Leaf className="w-4 h-4 fill-[#386b29]/20" />
      </div>

      {/* WhatsApp Quick Link */}
      <button
        onClick={() => openWhatsAppChat('Assalam-o-Alaikum, I want to inquire about Pure Harvest Organic products.')}
        aria-label={`WhatsApp ${WHATSAPP_DISPLAY_NUMBER}`}
        title={`WhatsApp Support (${WHATSAPP_DISPLAY_NUMBER})`}
        className="w-10 h-10 rounded-full bg-[#25D366] text-white shadow-sm flex items-center justify-center hover:bg-[#1fad52] transition-all duration-200 hover:scale-105"
      >
        <MessageCircle className="w-4 h-4 fill-current stroke-none" />
      </button>

      {/* Facebook */}
      <a
        href="#facebook"
        aria-label="Facebook"
        className="w-10 h-10 rounded-full bg-white border border-[#e5dfd0] shadow-sm flex items-center justify-center text-[#445343] hover:text-[#386b29] hover:bg-[#f2f8ee] hover:border-[#c5e4bc] transition-all duration-200"
      >
        <Facebook className="w-4 h-4 fill-current" />
      </a>

      {/* Instagram */}
      <a
        href="#instagram"
        aria-label="Instagram"
        className="w-10 h-10 rounded-full bg-white border border-[#e5dfd0] shadow-sm flex items-center justify-center text-[#445343] hover:text-[#386b29] hover:bg-[#f2f8ee] hover:border-[#c5e4bc] transition-all duration-200"
      >
        <Instagram className="w-4 h-4" />
      </a>

      {/* Twitter / X */}
      <a
        href="#twitter"
        aria-label="Twitter"
        className="w-10 h-10 rounded-full bg-white border border-[#e5dfd0] shadow-sm flex items-center justify-center text-[#445343] hover:text-[#386b29] hover:bg-[#f2f8ee] hover:border-[#c5e4bc] transition-all duration-200"
      >
        <Twitter className="w-4 h-4 fill-current" />
      </a>
    </div>
  );
}
