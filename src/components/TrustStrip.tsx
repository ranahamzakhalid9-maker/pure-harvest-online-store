import { ShieldCheck, Truck, Lock, Leaf } from 'lucide-react';

export default function TrustStrip() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8">
      <div className="bg-white/80 backdrop-blur-sm border border-[#ece6d8] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-[#ebe5d7]">
          {/* Item 1 */}
          <div className="flex items-center gap-4 lg:px-6 first:pl-2">
            <div className="w-12 h-12 rounded-xl bg-[#f0f7ee] border border-[#d6ebd1] flex items-center justify-center text-[#386b29] shrink-0 shadow-sm">
              <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#182a17] text-[15px] leading-tight">100% Organic</h4>
              <p className="text-xs text-[#6e7d6c] mt-0.5">Naturally sourced products</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-4 lg:px-6">
            <div className="w-12 h-12 rounded-xl bg-[#f0f7ee] border border-[#d6ebd1] flex items-center justify-center text-[#386b29] shrink-0 shadow-sm">
              <Truck className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#182a17] text-[15px] leading-tight">Fast Delivery</h4>
              <p className="text-xs text-[#6e7d6c] mt-0.5">Quick delivery to your door</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-4 lg:px-6">
            <div className="w-12 h-12 rounded-xl bg-[#f0f7ee] border border-[#d6ebd1] flex items-center justify-center text-[#386b29] shrink-0 shadow-sm">
              <Lock className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#182a17] text-[15px] leading-tight">Secure Payment</h4>
              <p className="text-xs text-[#6e7d6c] mt-0.5">100% secure payment</p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-center gap-4 lg:px-6">
            <div className="w-12 h-12 rounded-xl bg-[#f0f7ee] border border-[#d6ebd1] flex items-center justify-center text-[#386b29] shrink-0 shadow-sm">
              <Leaf className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#182a17] text-[15px] leading-tight">Eco Friendly</h4>
              <p className="text-xs text-[#6e7d6c] mt-0.5">Sustainable & eco packaging</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
