import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Star, Heart, ShoppingCart, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  const { setSelectedProduct, setActiveTab, addToCart, toggleWishlist, isInWishlist } = useStore();
  const wishlisted = isInWishlist(product.id);
  const [imgError, setImgError] = useState(false);

  const handleCardClick = () => {
    setSelectedProduct(product);
    setActiveTab('product_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      className="bg-white rounded border border-gray-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer relative p-3 sm:p-4 overflow-hidden"
    >
      {/* Wishlist Button */}
      <button
        type="button"
        id={`wishlist-btn-${product.id}`}
        onClick={handleToggleWishlist}
        title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-white/90 shadow hover:bg-gray-100 transition-all text-gray-400 hover:text-rose-500"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            wishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-400'
          }`}
        />
      </button>

      {/* Product Image & Badges */}
      <div className="relative w-full pt-[90%] mb-3 overflow-hidden rounded bg-gray-50 flex items-center justify-center">
        <img
          src={imgError ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80' : product.image}
          alt={product.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
        />

        {product.discountPercentage > 0 && (
          <span className="absolute bottom-2 left-2 bg-green-600 text-white font-black text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded shadow">
            {product.discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* Details Container */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Brand */}
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            {product.brand}
          </span>

          {/* Title */}
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 mt-0.5 group-hover:text-[#2874f0] transition-colors leading-snug">
            {product.title}
          </h3>

          {/* Ratings & Flipkart Assured Pill */}
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <div className="inline-flex items-center gap-1 bg-green-700 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
              <span>{product.rating}</span>
              <Star className="w-2.5 h-2.5 fill-white text-white" />
            </div>
            <span className="text-[11px] text-gray-500 font-medium">
              ({product.ratingCount.toLocaleString('en-IN')})
            </span>

            {product.isAssured && (
              <span className="text-[10px] font-black italic bg-blue-50 text-[#2874f0] border border-blue-200 px-1 py-0.2 rounded inline-flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3 text-[#2874f0]" /> Assured
              </span>
            )}
          </div>
        </div>

        {/* Pricing Block */}
        <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-extrabold text-gray-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-[11px] text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <p className="text-[10px] text-green-700 font-semibold mt-0.5">
              Free Delivery & Daily Deals
            </p>
          </div>

          {/* Quick Add to Cart Button */}
          <button
            type="button"
            id={`quick-add-cart-${product.id}`}
            onClick={handleAddToCart}
            title="Add to Cart"
            className="bg-amber-400 hover:bg-amber-500 text-blue-950 font-bold p-2 rounded-sm shadow hover:shadow-md transition-all shrink-0 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});
ProductCard.displayName = 'ProductCard';

