import { ArrowRight, Leaf, Sprout, FlaskConical, Recycle } from 'lucide-react';
import HeroProductScene from '../components/HeroProductScene';
import SocialSidebar from '../components/SocialSidebar';
import { ActivePage } from '../types';

interface HomePageProps {
  onNavigate: (page: ActivePage) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="relative w-full min-h-[calc(100vh-100px)] flex flex-col justify-between overflow-hidden">
      {/* Background Soft Organic Glows & Leaves */}
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-[#97cf87]/12 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-[#dfeddc]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Floating subtle organic background leaves */}
      <div className="absolute top-28 left-[12%] w-10 h-10 text-[#4c843d]/30 pointer-events-none -z-10 animate-float">
        <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
          <path d="M17 8C8 8 4 14 4 20c6 0 12-4 13-12z" />
        </svg>
      </div>

      <div className="absolute bottom-40 right-[15%] w-12 h-12 text-[#649e54]/25 pointer-events-none -z-10 animate-float-reverse">
        <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
          <path d="M17 8C8 8 4 14 4 20c6 0 12-4 13-12z" />
        </svg>
      </div>

      {/* Left Social Sidebar */}
      <SocialSidebar />

      {/* Main Hero Container */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Hero Content (5 cols) */}
          <div className="lg:col-span-5 lg:pl-10 xl:pl-14 text-center lg:text-left z-10">
            {/* Small uppercase tag */}
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-[12px] sm:text-[13px] font-extrabold tracking-[0.22em] text-[#386b29] uppercase">
                100% ORGANIC & NATURAL
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#162915] leading-[1.08] mb-4 sm:mb-5">
              Pure Food.<br />
              <span className="text-[#386b29] italic font-normal">Pure Life.</span>
            </h1>

            {/* Subtext description */}
            <p className="text-base sm:text-lg text-[#556754] max-w-md mx-auto lg:mx-0 leading-relaxed mb-6 sm:mb-8 font-normal">
              Discover naturally grown, carefully selected organic products delivered fresh to your doorstep.
            </p>

            {/* Two Hero Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4">
              {/* Solid Green Shop Now Button */}
              <button
                onClick={() => onNavigate('shop')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#386b29] hover:bg-[#2c5620] text-white font-semibold text-[14px] sm:text-[15px] flex items-center justify-center gap-2.5 shadow-[0_6px_20px_rgba(56,107,41,0.25)] hover:shadow-[0_8px_25px_rgba(56,107,41,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* White/Cream Explore Products Button */}
              <button
                onClick={() => onNavigate('categories')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-[#faf7f0] text-[#162915] font-semibold text-[14px] sm:text-[15px] border border-[#e3dccf] flex items-center justify-center gap-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>EXPLORE PRODUCTS</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] text-[#386b29]" />
              </button>
            </div>
          </div>

          {/* Right 3D Product Scene (7 cols) */}
          <div className="lg:col-span-7 flex items-center justify-center relative">
            <HeroProductScene />
          </div>
        </div>

        {/* Bottom 4 Feature Cards matching reference */}
        <div className="mt-8 lg:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          {/* Card 1: 100% Organic */}
          <div className="bg-white/90 backdrop-blur-md rounded-[22px] sm:rounded-[26px] p-5 sm:p-6 border border-[#eee7d8] shadow-[0_6px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(56,107,41,0.08)] transition-all duration-300 flex items-center gap-4 group cursor-default hover:-translate-y-1">
            <div className="w-13 h-13 rounded-full bg-[#386b29] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h3 className="font-bold text-[#162915] text-[16px] leading-tight">100% Organic</h3>
              <p className="text-xs text-[#6e7f6d] mt-1 leading-snug">Naturally sourced products</p>
            </div>
          </div>

          {/* Card 2: Farm Fresh */}
          <div className="bg-white/90 backdrop-blur-md rounded-[22px] sm:rounded-[26px] p-5 sm:p-6 border border-[#eee7d8] shadow-[0_6px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(56,107,41,0.08)] transition-all duration-300 flex items-center gap-4 group cursor-default hover:-translate-y-1">
            <div className="w-13 h-13 rounded-full bg-[#4e843c] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h3 className="font-bold text-[#162915] text-[16px] leading-tight">Farm Fresh</h3>
              <p className="text-xs text-[#6e7f6d] mt-1 leading-snug">Direct from trusted farms</p>
            </div>
          </div>

          {/* Card 3: No Chemicals */}
          <div className="bg-white/90 backdrop-blur-md rounded-[22px] sm:rounded-[26px] p-5 sm:p-6 border border-[#eee7d8] shadow-[0_6px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(56,107,41,0.08)] transition-all duration-300 flex items-center gap-4 group cursor-default hover:-translate-y-1">
            <div className="w-13 h-13 rounded-full bg-[#386b29] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <FlaskConical className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h3 className="font-bold text-[#162915] text-[16px] leading-tight">No Chemicals</h3>
              <p className="text-xs text-[#6e7f6d] mt-1 leading-snug">No harmful chemicals or pesticides</p>
            </div>
          </div>

          {/* Card 4: Eco Friendly */}
          <div className="bg-white/90 backdrop-blur-md rounded-[22px] sm:rounded-[26px] p-5 sm:p-6 border border-[#eee7d8] shadow-[0_6px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(56,107,41,0.08)] transition-all duration-300 flex items-center gap-4 group cursor-default hover:-translate-y-1">
            <div className="w-13 h-13 rounded-full bg-[#4e843c] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <Recycle className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h3 className="font-bold text-[#162915] text-[16px] leading-tight">Eco Friendly</h3>
              <p className="text-xs text-[#6e7f6d] mt-1 leading-snug">Sustainable & eco friendly packaging</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
