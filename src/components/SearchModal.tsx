import { useState } from 'react';
import { Search, X, Star, ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function SearchModal({ isOpen, onClose, onSelectProduct, onAddToCart }: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#ede7d8] overflow-hidden">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#eee8da] gap-3">
          <Search className="w-5 h-5 text-[#386b29]" />
          <input
            type="text"
            autoFocus
            placeholder="Search organic honey, olive oil, dates, tea, nuts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-[#182a17] focus:outline-none placeholder-[#8b9b8a]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#718270] hover:text-[#2a3c29] px-2 py-1 bg-[#f4efe4] rounded-md"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#556754] hover:bg-[#f1ece1]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2.5">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-[#718270] text-sm">
              No organic products found matching "{query}".
            </div>
          ) : (
            filtered.map(product => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 rounded-xl border border-[#f0ebd9] hover:border-[#c5e0be] hover:bg-[#f9fcf8] transition-all group"
              >
                <div
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-3.5 flex-1 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-[#fbf9f4] border border-[#ede7d8]"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-[#182a17] group-hover:text-[#386b29] transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-[#718270]">{product.category}</span>
                      <span className="text-[11px] text-[#cca133] flex items-center gap-0.5 font-medium">
                        <Star className="w-3 h-3 fill-current" /> {product.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[#386b29]">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-8 h-8 rounded-full bg-[#386b29] hover:bg-[#2c5520] text-white flex items-center justify-center shadow-xs transition-colors"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
