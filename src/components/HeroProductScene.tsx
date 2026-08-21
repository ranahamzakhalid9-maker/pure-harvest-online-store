import { useState, type MouseEvent } from 'react';

export default function HeroProductScene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] sm:aspect-square max-w-[560px] lg:max-w-[620px] mx-auto flex items-center justify-center select-none perspective-[1000px]"
    >
      {/* Background Soft Glow & Halo Rings */}
      <div 
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#84bd74]/15 via-[#f0f7ee]/60 to-transparent blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`
        }}
      />

      {/* Large Architectural 3D Arches behind platform */}
      <div 
        className="absolute w-[82%] h-[82%] rounded-full border-[18px] sm:border-[24px] border-white shadow-[inset_0_4px_16px_rgba(0,0,0,0.03),0_12px_32px_rgba(0,0,0,0.04)] pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px) scale(0.96)`
        }}
      >
        <div className="w-full h-full rounded-full border-[10px] sm:border-[14px] border-[#eaf4e7]" />
      </div>

      {/* Floating Organic Leaves (Back layer) */}
      <div
        className="absolute top-8 right-6 w-12 h-12 pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px) rotate(18deg)`
        }}
      >
        <svg viewBox="0 0 24 24" className="w-full h-full fill-[#4d863e]/80 drop-shadow-md">
          <path d="M17 8C8 8 4 14 4 20c6 0 12-4 13-12z" />
        </svg>
      </div>

      <div
        className="absolute top-16 left-4 w-10 h-10 pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px) rotate(-28deg)`
        }}
      >
        <svg viewBox="0 0 24 24" className="w-full h-full fill-[#659f55]/70 drop-shadow-sm blur-[0.5px]">
          <path d="M17 8C8 8 4 14 4 20c6 0 12-4 13-12z" />
        </svg>
      </div>

      {/* Main Multi-Tier 3D Platform */}
      <div 
        className="relative w-[92%] h-[92%] flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${mousePos.y * -6}deg) rotateY(${mousePos.x * 8}deg)`
        }}
      >
        {/* Tier 1 (Base Green Platform Ring) */}
        <div className="absolute bottom-[4%] w-[88%] h-[38%] rounded-[100%] bg-[#e3eedf] border-b-8 border-[#c5ddbf] shadow-[0_30px_50px_rgba(40,65,30,0.12)] transform" />

        {/* Tier 2 (Middle Forest Green Rim) */}
        <div className="absolute bottom-[9%] w-[80%] h-[34%] rounded-[100%] bg-[#2e5922] border-b-6 border-[#204217] shadow-inner" />

        {/* Tier 3 (Top Natural Wood Platter) */}
        <div className="absolute bottom-[13%] w-[76%] h-[32%] rounded-[100%] bg-gradient-to-b from-[#dfcaaa] to-[#cca779] border-b-6 border-[#b08b5e] shadow-[0_8px_20px_rgba(0,0,0,0.12)] flex items-center justify-center">
          <div className="w-[96%] h-[94%] rounded-[100%] border border-[#ecc99c]/50 bg-gradient-to-t from-transparent via-[#f3dfc4]/20 to-[#fdf3e5]/40" />
        </div>

        {/* 4 Pagination Dots on Platform Edge */}
        <div className="absolute bottom-[6%] flex items-center gap-2 z-30">
          <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
          <span className="w-2 h-2 rounded-full bg-[#528d40]" />
          <span className="w-2 h-2 rounded-full bg-[#3c6b2c]" />
          <span className="w-2 h-2 rounded-full bg-white/90 shadow-xs" />
        </div>

        {/* Product Group Composition with Realistic Positioning & Lighting */}
        <div className="relative w-full h-full z-10 flex items-center justify-center pointer-events-none">
          
          {/* 1. Whole Grain Wheat Bag / Sack (Center-Left Back) */}
          <div
            className="absolute bottom-[22%] left-[16%] w-[38%] aspect-square z-12 transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)`
            }}
          >
            <div className="relative w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=85"
                alt="Stone Ground Whole Wheat Grain"
                className="w-full h-full object-cover rounded-3xl filter drop-shadow-[0_14px_18px_rgba(0,0,0,0.18)] border-2 border-white/60"
              />
              <span className="absolute bottom-2 left-2 bg-[#182a17]/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                Chakki Atta
              </span>
            </div>
          </div>

          {/* 2. Pure Dessi Ghee Jar (Center-Right Back) */}
          <div
            className="absolute bottom-[24%] right-[18%] w-[32%] aspect-square z-14 transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`
            }}
          >
            <div className="relative w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=600&q=85"
                alt="Pure Danedar Dessi Ghee"
                className="w-full h-full object-cover rounded-3xl filter drop-shadow-[0_20px_24px_rgba(0,0,0,0.22)] border-2 border-white/60"
              />
              <span className="absolute bottom-2 right-2 bg-[#386b29] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                100% Dessi Ghee
              </span>
            </div>
          </div>

          {/* 3. Organic Washed Daal / Pulses (Center Foreground) */}
          <div
            className="absolute bottom-[14%] left-[32%] w-[36%] aspect-square z-20 transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${mousePos.x * 16}px, ${mousePos.y * 16}px)`
            }}
          >
            <div className="relative w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=85"
                alt="Premium Organic Washed Daal"
                className="w-full h-full object-cover rounded-3xl filter drop-shadow-[0_14px_18px_rgba(0,0,0,0.28)] border-2 border-white"
              />
              <span className="absolute bottom-2 left-2 bg-[#dfa52b] text-[#182a17] text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                Organic Daal
              </span>
            </div>
          </div>
        </div>

        {/* Foreground Floating Leaves */}
        <div
          className="absolute bottom-12 right-2 w-14 h-14 z-30 pointer-events-none transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px) rotate(42deg)`
          }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-[#386b29] drop-shadow-lg">
            <path d="M17 8C8 8 4 14 4 20c6 0 12-4 13-12z" />
          </svg>
        </div>

        <div
          className="absolute bottom-20 left-6 w-9 h-9 z-30 pointer-events-none transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${mousePos.x * -24}px, ${mousePos.y * -24}px) rotate(-15deg)`
          }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-[#528d40] drop-shadow-md">
            <path d="M17 8C8 8 4 14 4 20c6 0 12-4 13-12z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
