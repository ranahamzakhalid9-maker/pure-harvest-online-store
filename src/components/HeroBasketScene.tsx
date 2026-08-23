export default function HeroBasketScene() {
  return (
    <div className="relative w-full max-w-[420px] lg:max-w-[480px] aspect-[4/3] flex items-center justify-center select-none pointer-events-none">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#97cf87]/20 via-[#edf6ea]/60 to-transparent blur-2xl" />

      {/* Floating Leaves */}
      <div className="absolute top-2 right-4 w-9 h-9 text-[#4d863e]/80 animate-float">
        <svg viewBox="0 0 24 24" className="w-full h-full fill-current drop-shadow-sm">
          <path d="M17 8C8 8 4 14 4 20c6 0 12-4 13-12z" />
        </svg>
      </div>
      <div className="absolute bottom-4 left-2 w-7 h-7 text-[#659f55]/70 animate-float-reverse">
        <svg viewBox="0 0 24 24" className="w-full h-full fill-current drop-shadow-xs">
          <path d="M17 8C8 8 4 14 4 20c6 0 12-4 13-12z" />
        </svg>
      </div>

      {/* Main Composition */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Real Product Showcase */}
        <div className="relative w-[90%] h-[90%] flex items-center justify-center">
          <div className="grid grid-cols-2 gap-3 w-full h-full p-2 bg-white/70 backdrop-blur-xs rounded-3xl border-2 border-white/80 shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
            <div className="relative h-full overflow-hidden rounded-2xl bg-white border border-[#eee8dc]">
              <img
                src="https://i.postimg.cc/RF6QRwZh/1bdf141f-fb57-4248-a592-a1910a5c7b4a.png"
                alt="Stone Ground Flour"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-[#182a17]/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                Chakki Atta
              </span>
            </div>
            <div className="relative h-full overflow-hidden rounded-2xl bg-white border border-[#eee8dc]">
              <img
                src="https://i.postimg.cc/02xX8HNh/33a473c0-69f6-4a1e-9754-60208cded94a.png"
                alt="Pure Desi Ghee"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 right-2 bg-[#386b29] text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                Pure Desi Ghee
              </span>
            </div>
          </div>
          {/* Subtle Organic Badge Overlay */}
          <div className="absolute -top-2 right-2 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#386b29] border border-[#d6ebd1] shadow-xs flex items-center gap-1.5 z-10">
            <span className="w-2 h-2 rounded-full bg-[#386b29]" />
            100% PURE & FRESH
          </div>
        </div>
      </div>
    </div>
  );
}
