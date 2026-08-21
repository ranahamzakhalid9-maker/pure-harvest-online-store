import { Heart, ShoppingCart, Trash2, ArrowRight, Star } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, ActivePage } from '../types';
import TrustStrip from '../components/TrustStrip';

interface WishlistPageProps {
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: ActivePage) => void;
}

export default function WishlistPage({
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onNavigate
}: WishlistPageProps) {
  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="w-full min-h-screen">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
        <div className="bg-[#f7f4eb]/80 border border-[#eee7d8] rounded-3xl p-6 sm:p-10 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#687a66] mb-2">
              <button onClick={() => onNavigate('home')} className="hover:text-[#386b29]">Home</button>
              <span>/</span>
              <span className="text-[#386b29]">Wishlist</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#162915]">
              My Wishlist ({wishlistedProducts.length})
            </h1>
            <p className="text-xs sm:text-sm text-[#596d58] mt-1">
              Keep track of your favorite organic products and order whenever ready.
            </p>
          </div>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#ede7d8] shadow-sm max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#182a17] mb-2">Your Wishlist is Empty</h3>
            <p className="text-xs text-[#6c7d6b] mb-6">Explore our organic products and click the heart icon on any product.</p>
            <button
              onClick={() => onNavigate('shop')}
              className="px-6 py-3 rounded-full bg-[#386b29] text-white font-semibold text-xs hover:bg-[#2c5520] transition-colors"
            >
              Browse Shop
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-4 sm:p-5 border border-[#ede7d8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="relative aspect-square w-full rounded-2xl bg-[#fbf9f4] p-3 flex items-center justify-center mb-3 overflow-hidden">
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition-all shadow-xs"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => onSelectProduct(product)}
                    className="w-full h-full object-contain cursor-pointer transition-transform group-hover:scale-105"
                  />
                </div>

                <div>
                  <h4
                    onClick={() => onSelectProduct(product)}
                    className="font-bold text-[#162915] text-sm hover:text-[#386b29] transition-colors cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-1 text-[#f5a623]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                    <span className="text-[11px] text-[#869784] ml-1">({product.reviewsCount})</span>
                  </div>
                  <div className="font-bold text-sm text-[#386b29] mt-2">
                    Rs. {product.price.toLocaleString()}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#f4f0e5] flex gap-2">
                  <button
                    onClick={() => onAddToCart(product, 1)}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#386b29] hover:bg-[#2c5520] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <TrustStrip />
    </div>
  );
}
