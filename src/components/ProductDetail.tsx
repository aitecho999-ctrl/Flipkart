import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { INITIAL_REVIEWS } from '../data/mockData';
import { Review } from '../types';
import { 
  Star, 
  ShieldCheck, 
  Heart, 
  ShoppingCart, 
  Zap, 
  MapPin, 
  CheckCircle2, 
  Tag, 
  ArrowLeft, 
  ThumbsUp, 
} from 'lucide-react';

export const ProductDetail: React.FC = React.memo(() => {
  const { 
    selectedProduct, 
    setActiveTab, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    showToast 
  } = useStore();

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">No product selected.</p>
        <button
          type="button"
          onClick={() => {
            setActiveTab('store');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="mt-4 bg-[#2874f0] text-white px-4 py-2 rounded text-sm font-semibold cursor-pointer"
        >
          Back to Store
        </button>
      </div>
    );
  }

  const [activeImage, setActiveImage] = useState(selectedProduct.image);
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colorVariants?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(selectedProduct.sizeVariants?.[0] || '');
  const [pincode, setPincode] = useState('560034');
  const [pincodeVerified, setPincodeVerified] = useState(true);
  const [imgError, setImgError] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, title: '', comment: '', userName: '' });

  const wishlisted = isInWishlist(selectedProduct.id);
  const allImages = [selectedProduct.image, ...(selectedProduct.additionalImages || [])];

  const handleAddToCart = () => {
    addToCart(selectedProduct, 1, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, 1, selectedColor, selectedSize);
    setActiveTab('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeVerified(true);
      showToast(`Delivery available for pincode ${pincode} by tomorrow 5 PM!`);
    } else {
      showToast('Please enter a valid 6-digit Pincode', 'error');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.title || !newReview.comment) {
      showToast('Please fill all review fields', 'error');
      return;
    }
    const created: Review = {
      id: `rev-${Date.now()}`,
      userId: 'u-current',
      userName: newReview.userName || 'Verified Shopper',
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      date: 'Just now',
      verifiedPurchase: true,
      helpfulCount: 0,
    };
    setReviews([created, ...reviews]);
    setShowReviewForm(false);
    setNewReview({ rating: 5, title: '', comment: '', userName: '' });
    showToast('Thank you! Your review has been published.');
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4">
      {/* Back to Products Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          id="back-to-store-btn"
          onClick={() => {
            setActiveTab('store');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 text-xs font-bold text-[#2874f0] hover:text-blue-800 cursor-pointer bg-white px-3 py-1.5 rounded shadow-xs border border-gray-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <div className="text-xs text-gray-500 font-medium">
          Home &gt; {selectedProduct.category.toUpperCase()} &gt; {selectedProduct.brand} &gt;{' '}
          <span className="text-gray-800 font-semibold">{selectedProduct.title.slice(0, 30)}...</span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-xs p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Gallery & Buy Actions */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex gap-3">
            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex flex-col gap-2 shrink-0">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    id={`thumb-img-${idx}`}
                    onClick={() => setActiveImage(img)}
                    className={`w-14 h-14 rounded border-2 overflow-hidden p-1 bg-gray-50 transition-all cursor-pointer ${
                      activeImage === img ? 'border-[#2874f0]' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" loading="lazy" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="relative flex-1 min-h-[320px] sm:min-h-[420px] rounded border border-gray-200 bg-white p-4 flex items-center justify-center">
              <img
                id="main-product-image"
                src={imgError ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80' : activeImage}
                alt={selectedProduct.title}
                onError={() => setImgError(true)}
                className="max-h-[380px] w-auto object-contain transition-transform duration-300 hover:scale-105"
              />

              {/* Wishlist Button */}
              <button
                type="button"
                id="pdp-wishlist-toggle"
                onClick={() => toggleWishlist(selectedProduct)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50 text-gray-400 cursor-pointer"
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-400'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Action Buttons: ADD TO CART & BUY NOW */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              id="pdp-add-to-cart-btn"
              onClick={handleAddToCart}
              className="bg-[#ff9f00] hover:bg-amber-600 text-white font-extrabold py-3 px-4 rounded-sm uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              id="pdp-buy-now-btn"
              onClick={handleBuyNow}
              className="bg-[#fb641b] hover:bg-orange-700 text-white font-extrabold py-3 px-4 rounded-sm uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Zap className="w-5 h-5 fill-white" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Assured Guarantee Info */}
          <div className="bg-blue-50/70 border border-blue-200/80 rounded p-3 text-xs text-blue-900 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-sm text-[#2874f0]">
              <ShieldCheck className="w-5 h-5" />
              <span>Flipkart Plus Assured Purchase</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              ✓ 100% Genuine Guaranteed | 7-Day Replacement Policy | Free Express Delivery
            </p>
          </div>
        </div>

        {/* Right Column: Product Info, Offers, Specs, Reviews */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {selectedProduct.brand}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 leading-snug">
              {selectedProduct.title}
            </h1>

            {/* Ratings & Reviews summary */}
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <div className="inline-flex items-center gap-1 bg-green-700 text-white text-xs font-bold px-2 py-0.5 rounded">
                <span>{selectedProduct.rating}</span>
                <Star className="w-3 h-3 fill-white text-white" />
              </div>
              <span className="text-xs font-semibold text-gray-500">
                {selectedProduct.ratingCount.toLocaleString('en-IN')} Ratings &amp; {selectedProduct.reviewCount.toLocaleString('en-IN')} Reviews
              </span>
              {selectedProduct.isAssured && (
                <span className="text-xs font-black italic text-[#2874f0] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Assured
                </span>
              )}
            </div>
          </div>

          {/* Pricing Highlight */}
          <div className="border-t border-b py-3.5 bg-slate-50/70 px-4 rounded space-y-1">
            <div className="text-xs font-semibold text-green-700">Special Price</div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                ₹{selectedProduct.price.toLocaleString('en-IN')}
              </span>
              {selectedProduct.originalPrice > selectedProduct.price && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-bold text-green-700">
                    {selectedProduct.discountPercentage}% off
                  </span>
                </>
              )}
            </div>
            <p className="text-[11px] text-gray-500 font-medium">
              Inclusive of all taxes. EMI starts at ₹{Math.round(selectedProduct.price / 12).toLocaleString('en-IN')}/month.
            </p>
          </div>

          {/* Available Offers */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-green-600" />
              <span>Available Offers</span>
            </h3>
            <div className="space-y-1.5 text-xs text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">Bank Offer:</span>
                <span>10% Instant Discount on HDFC &amp; SBI Credit Cards, up to ₹1,500 on orders of ₹5,000+</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">Partner Offer:</span>
                <span>Get flat ₹500 Flipkart Gift Card on buying with Flipkart Pay Later</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">Special Offer:</span>
                <span>Extra 5% off with SuperCoins bonus coupon</span>
              </div>
            </div>
          </div>

          {/* Variants Selection (Colors & Sizes) */}
          {selectedProduct.colorVariants && selectedProduct.colorVariants.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-800 uppercase block">Color: {selectedColor}</span>
              <div className="flex items-center gap-2 flex-wrap">
                {selectedProduct.colorVariants.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`text-xs px-3 py-1.5 rounded border font-medium transition-all cursor-pointer ${
                      selectedColor === c
                        ? 'border-[#2874f0] bg-blue-50 text-[#2874f0] font-bold shadow-xs'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedProduct.sizeVariants && selectedProduct.sizeVariants.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-800 uppercase block">Size: {selectedSize}</span>
              <div className="flex items-center gap-2 flex-wrap">
                {selectedProduct.sizeVariants.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`text-xs px-3 py-1.5 rounded border font-medium transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'border-[#2874f0] bg-blue-50 text-[#2874f0] font-bold shadow-xs'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Delivery & Pincode Checker */}
          <div className="border rounded p-3.5 space-y-2.5 bg-gray-50/50">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                <MapPin className="w-4 h-4 text-[#2874f0]" />
                <span>Delivery to Pincode</span>
              </div>
              <form onSubmit={handlePincodeCheck} className="flex items-center gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="bg-white border border-gray-300 rounded px-2.5 py-1 text-xs text-gray-900 w-28 focus:outline-none focus:border-[#2874f0]"
                />
                <button
                  type="submit"
                  className="text-xs font-bold text-[#2874f0] hover:text-blue-800 px-2 py-1 cursor-pointer"
                >
                  Check
                </button>
              </form>
            </div>

            {pincodeVerified && (
              <div className="text-xs text-gray-700 space-y-1">
                <p className="font-semibold text-green-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Free Delivery Available by Tomorrow, 5:00 PM
                </p>
                <p className="text-[11px] text-gray-500">
                  Cash on delivery available | 7 Days Replacement Policy
                </p>
              </div>
            )}
          </div>

          {/* Product Highlights */}
          {selectedProduct.features && selectedProduct.features.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Highlights</h3>
              <ul className="list-disc list-inside space-y-1 text-xs text-gray-700">
                {selectedProduct.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications Table */}
          {selectedProduct.specifications && Object.keys(selectedProduct.specifications).length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide border-b pb-2">
                Specifications
              </h3>
              <div className="border rounded overflow-hidden divide-y text-xs">
                {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                  <div key={key} className="grid grid-cols-3 p-2.5 hover:bg-gray-50">
                    <span className="text-gray-500 font-medium">{key}</span>
                    <span className="col-span-2 text-gray-900 font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ratings & Customer Reviews Section */}
          <div className="pt-4 border-t space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">Ratings &amp; Reviews</h3>
              <button
                type="button"
                id="write-review-toggle-btn"
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="text-xs font-bold text-[#2874f0] border border-[#2874f0] px-3 py-1.5 rounded hover:bg-blue-50 transition-colors cursor-pointer"
              >
                {showReviewForm ? 'Cancel Review' : 'Rate Product'}
              </button>
            </div>

            {/* Write Review Form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="bg-blue-50/50 border border-blue-200 rounded p-4 space-y-3 text-xs">
                <h4 className="font-bold text-gray-900">Share your experience</h4>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Your Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1 text-amber-500 cursor-pointer"
                      >
                        <Star className={`w-5 h-5 ${star <= newReview.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={newReview.userName}
                    onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded p-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Review Headline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fantastic quality and super fast delivery!"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded p-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Detailed Review</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell other shoppers what you like or dislike about this product..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded p-2 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#2874f0] hover:bg-blue-700 text-white font-bold px-4 py-2 rounded text-xs uppercase tracking-wider cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="border-b pb-3 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-0.5 bg-green-700 text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                      {rev.rating} <Star className="w-2.5 h-2.5 fill-white" />
                    </span>
                    <span className="font-bold text-xs text-gray-900">{rev.title}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">{rev.comment}</p>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-600">{rev.userName}</span>
                      {rev.verifiedPurchase && (
                        <span className="text-green-700 font-bold flex items-center gap-0.5 text-[10px]">
                          <CheckCircle2 className="w-3 h-3" /> Certified Buyer
                        </span>
                      )}
                      <span>• {rev.date}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast('Marked review as helpful')}
                      className="flex items-center gap-1 hover:text-gray-700 text-gray-400 cursor-pointer"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{rev.helpfulCount > 0 ? rev.helpfulCount : ''} Helpful</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
ProductDetail.displayName = 'ProductDetail';

