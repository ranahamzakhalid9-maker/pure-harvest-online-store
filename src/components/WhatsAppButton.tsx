import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_DISPLAY_NUMBER, openWhatsAppChat } from '../utils/whatsapp';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = () => {
    const message = `Assalam-o-Alaikum Pure Harvest Organic! I have a question about your organic products and delivery.`;
    openWhatsAppChat(message);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto max-w-[calc(100vw-24px)]">
      {showTooltip && (
        <div className="bg-white/95 backdrop-blur-sm border border-[#d2edd0] shadow-xl text-[#182a17] p-2.5 sm:p-3 rounded-2xl text-xs max-w-[200px] sm:max-w-[220px] relative animate-fade-in">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute top-1.5 right-1.5 text-[#8ca08a] hover:text-[#182a17]"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-1.5 text-[#386b29] font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span className="text-[11px] sm:text-xs">Contact via WhatsApp</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-[#4d5f4c] leading-tight">
            Chat with us directly on <span className="font-semibold text-[#182a17]">{WHATSAPP_DISPLAY_NUMBER}</span>.
          </p>
        </div>
      )}

      <button
        onClick={handleClick}
        className="group flex items-center gap-2 sm:gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full shadow-[0_6px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
        aria-label={`Contact via WhatsApp ${WHATSAPP_DISPLAY_NUMBER}`}
        title={`Chat on WhatsApp (${WHATSAPP_DISPLAY_NUMBER})`}
      >
        {/* WhatsApp Icon */}
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-current stroke-none shrink-0" />
        <span className="hidden sm:inline font-bold text-xs sm:text-sm tracking-wide pr-1">
          Contact via WhatsApp ({WHATSAPP_DISPLAY_NUMBER})
        </span>
        <span className="inline sm:hidden font-bold text-xs tracking-wide">
          WhatsApp
        </span>
      </button>
    </div>
  );
}
