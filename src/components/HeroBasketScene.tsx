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
        {/* Wicker Harvest Basket Image */}
        <div className="relative w-[85%] h-[85%] flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=85"
            alt="Pure Organic Harvest Basket"
            className="w-full h-full object-cover rounded-3xl shadow-[0_12px_28px_rgba(0,0,0,0.08)] border-2 border-white/80"
          />
          {/* Subtle Organic Badge Overlay */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#386b29] border border-[#d6ebd1] shadow-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#386b29]" />
            100% FRESH
          </div>
        </div>
      </div>
    </div>
  );
}
