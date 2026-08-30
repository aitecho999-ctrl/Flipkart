import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, Trash2, ShoppingCart, ArrowRight, ShieldCheck, Star } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, setSelectedProduct, setActiveTab } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div 
          id="empty-wishlist-state"
          className="bg-white rounded-lg border border-gray-200 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm space-y-4"
        >
          <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Empty Wishlist</h2>
          <p className="text-xs sm:text-sm text-gray-500">
            You have no items in your wishlist. Start adding items you love to keep track of prices and offers!
          </p>
          <button
            id="empty-wishlist-shop-btn"
            onClick={() => setActiveTab('store')}
            className="bg-[#2874f0] hover:bg-blue-700 text-white font-extrabold px-8 py-3 rounded-sm uppercase tracking-wider text-xs shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
      <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span>My Wishlist ({wishlist.length})</span>
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {wishlist.map((item) => (
            <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div 
                onClick={() => {
                  setSelectedProduct(item.product);
                  setActiveTab('product_detail');
                }}
                className="flex items-center gap-4 cursor-pointer group flex-1"
              >
                <div className="w-20 h-20 bg-gray-50 border rounded p-1 flex items-center justify-center shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#2874f0] line-clamp-2">
                    {item.product.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="bg-green-700 text-white text-[10px] font-bold px-1.5 py-0.2 rounded inline-flex items-center gap-0.5">
                      {item.product.rating} <Star className="w-2.5 h-2.5 fill-white" />
                    </span>
                    {item.product.isAssured && (
                      <span className="text-[10px] text-[#2874f0] font-black italic flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3" /> Assured
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-base font-extrabold text-gray-900">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </span>
                    {item.product.originalPrice > item.product.price && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{item.product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span className="text-xs font-bold text-green-700">
                      {item.product.discountPercentage}% Off
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end pt-2 sm:pt-0">
                <button
                  id={`wishlist-move-cart-${item.product.id}`}
                  onClick={() => {
                    addToCart(item.product);
                    toggleWishlist(item.product);
                  }}
                  className="bg-[#ff9f00] hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-sm text-xs uppercase flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <ShoppingCart className="w-4 h-4" /> Move to Cart
                </button>
                <button
                  id={`wishlist-remove-${item.product.id}`}
                  onClick={() => toggleWishlist(item.product)}
                  className="p-2 text-gray-400 hover:text-rose-600 rounded hover:bg-gray-100 transition-colors"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
