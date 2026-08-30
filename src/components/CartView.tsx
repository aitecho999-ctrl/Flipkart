import React, { useState, useMemo, useCallback } from 'react';
import { useStore } from '../context/StoreContext';
import { CheckoutModal } from './CheckoutModal';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Tag, 
  CheckCircle2, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles,
  MapPin,
  X
} from 'lucide-react';

export const CartView: React.FC = React.memo(() => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    toggleWishlist,
    setActiveTab,
    setSelectedProduct,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    availableCoupons,
    shippingAddress,
    setShippingAddress,
    showToast,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showAddressEdit, setShowAddressEdit] = useState(false);
  const [addressForm, setAddressForm] = useState(shippingAddress);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  const originalSubtotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + (item.product.originalPrice || item.product.price) * item.quantity,
      0
    );
  }, [cart]);

  const productDiscount = Math.max(0, originalSubtotal - subtotal);
  const couponDiscount = appliedCoupon
    ? Math.min((subtotal * appliedCoupon.discountPercent) / 100, appliedCoupon.maxDiscount)
    : 0;

  const totalSavings = productDiscount + couponDiscount;
  const finalPayable = Math.max(0, subtotal - couponDiscount);

  const handleApplyCoupon = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCoupon(couponInput.trim());
  }, [couponInput, applyCoupon]);

  const handleSaveAddress = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setShippingAddress(addressForm);
    setShowAddressEdit(false);
    showToast('Delivery address updated!');
  }, [addressForm, setShippingAddress, showToast]);

  const handleProductClick = useCallback((product: any) => {
    setSelectedProduct(product);
    setActiveTab('product_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setSelectedProduct, setActiveTab]);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div 
          id="empty-cart-state"
          className="bg-white rounded-lg border border-gray-200 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs space-y-4"
        >
          <div className="w-20 h-20 bg-blue-50 text-[#2874f0] rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Your Flipkart Cart is Empty!</h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Explore our vast catalog of smartphones, electronics, fashion, and home appliances with exclusive discounts.
          </p>
          <button
            type="button"
            id="empty-cart-shop-btn"
            onClick={() => {
              setActiveTab('store');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#2874f0] hover:bg-blue-700 text-white font-extrabold px-8 py-3 rounded-sm uppercase tracking-wider text-xs shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Delivery Address & Cart Items */}
        <div className="lg:col-span-8 space-y-4">
          {/* Deliver To Address Box */}
          <div className="bg-white rounded border border-gray-200 p-4 shadow-xs flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#2874f0] mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Deliver to:</span>
                  <span className="text-xs font-bold text-gray-900">{shippingAddress.name}, {shippingAddress.pincode}</span>
                  <span className="text-[10px] bg-gray-100 text-gray-700 font-bold px-1.5 py-0.2 rounded">
                    {shippingAddress.type}
                  </span>
                </div>
                <p className="text-xs text-gray-600 truncate max-w-md mt-0.5">
                  {shippingAddress.addressLine}, {shippingAddress.locality}, {shippingAddress.city}
                </p>
              </div>
            </div>

            <button
              type="button"
              id="change-address-btn"
              onClick={() => setShowAddressEdit(!showAddressEdit)}
              className="text-xs font-bold text-[#2874f0] border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded transition-all cursor-pointer"
            >
              {showAddressEdit ? 'Close' : 'Change Address'}
            </button>
          </div>

          {/* Edit Address Form */}
          {showAddressEdit && (
            <form onSubmit={handleSaveAddress} className="bg-blue-50/40 border border-blue-200 rounded p-4 text-xs space-y-3">
              <h4 className="font-bold text-gray-900">Update Delivery Address</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={addressForm.name}
                  onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                  className="bg-white border rounded p-2 text-xs"
                />
                <input
                  type="text"
                  required
                  placeholder="10-digit Phone Number"
                  value={addressForm.phone}
                  onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                  className="bg-white border rounded p-2 text-xs"
                />
                <input
                  type="text"
                  required
                  placeholder="Pincode"
                  value={addressForm.pincode}
                  onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                  className="bg-white border rounded p-2 text-xs"
                />
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                  className="bg-white border rounded p-2 text-xs"
                />
              </div>
              <input
                type="text"
                required
                placeholder="House No., Building Name, Street"
                value={addressForm.addressLine}
                onChange={(e) => setAddressForm({ ...addressForm, addressLine: e.target.value })}
                className="w-full bg-white border rounded p-2 text-xs"
              />
              <button
                type="submit"
                className="bg-[#2874f0] text-white font-bold px-4 py-1.5 rounded text-xs cursor-pointer"
              >
                Save &amp; Deliver Here
              </button>
            </form>
          )}

          {/* Cart Items List */}
          <div className="bg-white rounded border border-gray-200 shadow-xs divide-y divide-gray-200">
            <div className="p-4 bg-slate-50/70 flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Flipkart Shopping Cart ({cart.length})
              </h2>
              <span className="text-xs text-green-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Free Express Delivery Included
              </span>
            </div>

            {cart.map((item) => (
              <div key={item.id} id={`cart-item-${item.id}`} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4">
                {/* Item Image */}
                <div 
                  onClick={() => handleProductClick(item.product)}
                  className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-gray-50 border rounded p-1 flex items-center justify-center cursor-pointer group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80';
                    }}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 
                        onClick={() => handleProductClick(item.product)}
                        className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-[#2874f0] cursor-pointer"
                      >
                        {item.product.title}
                      </h3>
                      {item.product.isAssured && (
                        <span className="text-[10px] font-black italic bg-blue-50 text-[#2874f0] border border-blue-200 px-1 py-0.2 rounded shrink-0 flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3 text-[#2874f0]" /> Assured
                        </span>
                      )}
                    </div>

                    {/* Variant tags */}
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500 font-medium">
                      {item.selectedColor && (
                        <span className="bg-gray-100 px-1.5 py-0.5 rounded">Color: {item.selectedColor}</span>
                      )}
                      {item.selectedSize && (
                        <span className="bg-gray-100 px-1.5 py-0.5 rounded">Size: {item.selectedSize}</span>
                      )}
                      <span>Seller: {item.product.seller.name}</span>
                    </div>

                    {/* Price in Cart */}
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-base font-extrabold text-gray-900">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      {item.product.originalPrice > item.product.price && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      )}
                      <span className="text-xs font-bold text-green-700">
                        {item.product.discountPercentage}% Off
                      </span>
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center justify-between flex-wrap gap-3 mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        id={`qty-minus-${item.id}`}
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-gray-900 border rounded py-1 bg-gray-50">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        id={`qty-plus-${item.id}`}
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-bold">
                      <button
                        type="button"
                        id={`save-for-later-${item.id}`}
                        onClick={() => {
                          toggleWishlist(item.product);
                          removeFromCart(item.id);
                        }}
                        className="text-gray-700 hover:text-[#2874f0] uppercase tracking-wider cursor-pointer"
                      >
                        Save for later
                      </button>
                      <button
                        type="button"
                        id={`remove-cart-item-${item.id}`}
                        onClick={() => removeFromCart(item.id)}
                        className="text-rose-600 hover:text-rose-800 uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Place Order CTA Bottom Bar */}
            <div className="p-4 bg-white flex items-center justify-end">
              <button
                type="button"
                id="cart-place-order-btn"
                onClick={() => setIsCheckoutOpen(true)}
                className="bg-[#fb641b] hover:bg-orange-600 text-white font-extrabold px-8 py-3 rounded-sm uppercase tracking-wider text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Place Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Coupons & Price Details Summary */}
        <div className="lg:col-span-4 space-y-4">
          {/* Apply Coupon Box */}
          <div className="bg-white rounded border border-gray-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#2874f0]" /> Coupons &amp; Offers
              </span>
              {appliedCoupon && (
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <X className="w-3 h-3" /> Remove
                </button>
              )}
            </div>

            {appliedCoupon ? (
              <div className="bg-green-50 border border-green-200 rounded p-2.5 text-xs text-green-900 flex items-center justify-between">
                <div>
                  <span className="font-bold">{appliedCoupon.code}</span> Applied!
                  <p className="text-[11px] text-green-700">You saved ₹{couponDiscount.toLocaleString('en-IN')}</p>
                </div>
                <Sparkles className="w-4 h-4 text-green-600" />
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Promo Code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  className="flex-1 bg-white border border-gray-300 rounded p-2 text-xs uppercase font-medium focus:border-[#2874f0] focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#2874f0] hover:bg-blue-700 text-white font-bold px-3 py-2 rounded text-xs uppercase cursor-pointer"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Quick Coupons list */}
            {!appliedCoupon && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-semibold text-gray-500">Available promo codes:</span>
                {availableCoupons.map((c) => (
                  <div
                    key={c.code}
                    onClick={() => applyCoupon(c.code)}
                    className="p-2 rounded border border-dashed border-blue-300 bg-blue-50/40 hover:bg-blue-50 cursor-pointer text-xs flex items-center justify-between transition-colors"
                  >
                    <div>
                      <span className="font-bold text-[#2874f0]">{c.code}</span>
                      <p className="text-[10px] text-gray-600">{c.description}</p>
                    </div>
                    <span className="text-[11px] font-bold text-[#2874f0]">APPLY</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price Details Summary Card */}
          <div className="bg-white rounded border border-gray-200 shadow-xs p-4 space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide border-b pb-2">
              Price Details
            </h3>

            <div className="space-y-2.5 text-xs text-gray-800">
              <div className="flex justify-between">
                <span>Price ({cart.length} items)</span>
                <span>₹{originalSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {productDiscount > 0 && (
                <div className="flex justify-between text-green-700 font-medium">
                  <span>Product Discount</span>
                  <span>-₹{productDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-700 font-medium">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-700 font-bold uppercase">FREE</span>
              </div>

              <div className="border-t border-dashed pt-3 flex justify-between font-extrabold text-sm sm:text-base text-gray-900">
                <span>Total Amount</span>
                <span>₹{finalPayable.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {totalSavings > 0 && (
              <div className="bg-green-50 border border-green-200 rounded p-2.5 text-center text-xs font-bold text-green-800">
                🎉 You will save ₹{totalSavings.toLocaleString('en-IN')} on this order!
              </div>
            )}
          </div>

          {/* Safe & Secure Guarantee */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-200 text-xs text-gray-600">
            <ShieldCheck className="w-8 h-8 text-[#2874f0] shrink-0" />
            <p className="text-[11px] leading-tight">
              Safe and Secure Payments. Easy returns. 100% Authentic products guaranteed by Flipkart.
            </p>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
});
CartView.displayName = 'CartView';

