import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  Lock, 
  ArrowRight, 
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = React.memo(({ isOpen, onClose }) => {
  const { cart, appliedCoupon, shippingAddress, createOrder, setActiveTab, setSelectedOrderId } = useStore();
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NET_BANKING' | 'COD' | 'PAY_LATER'>('UPI');
  const [upiId, setUpiId] = useState('user@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = appliedCoupon
    ? Math.min((subtotal * appliedCoupon.discountPercent) / 100, appliedCoupon.maxDiscount)
    : 0;
  const finalTotal = Math.max(0, subtotal - discount);

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      let methodLabel = 'UPI (Google Pay / PhonePe)';
      if (paymentMethod === 'CARD') methodLabel = 'Credit/Debit Card';
      if (paymentMethod === 'NET_BANKING') methodLabel = 'Net Banking (HDFC/SBI)';
      if (paymentMethod === 'COD') methodLabel = 'Cash on Delivery';
      if (paymentMethod === 'PAY_LATER') methodLabel = 'Flipkart Pay Later';

      const order = createOrder(methodLabel);
      setIsProcessing(false);
      onClose();
      if (order) {
        setSelectedOrderId(order.id);
        setActiveTab('orders');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
      <div 
        id="checkout-modal-container"
        className="bg-white rounded-lg max-w-xl w-full overflow-hidden shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="bg-[#2874f0] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <h3 className="text-base font-bold">Safe &amp; Secure Checkout</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Step 1: Delivery Address Summary */}
          <div className="border rounded p-3 bg-gray-50/70 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-800 uppercase tracking-wider text-[11px]">
                1. Delivery Address
              </span>
              <span className="bg-blue-100 text-[#2874f0] font-bold px-1.5 py-0.2 rounded text-[10px]">
                {shippingAddress.type}
              </span>
            </div>
            <p className="font-bold text-gray-900 text-sm">{shippingAddress.name} — {shippingAddress.phone}</p>
            <p className="text-gray-600">
              {shippingAddress.addressLine}, {shippingAddress.locality}, {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}
            </p>
          </div>

          {/* Step 2: Order Items Summary */}
          <div className="border rounded p-3 text-xs space-y-2">
            <span className="font-bold text-gray-800 uppercase tracking-wider text-[11px]">
              2. Order Items ({cart.length} Products)
            </span>
            <div className="max-h-28 overflow-y-auto space-y-2 pr-1 divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between pt-1.5 first:pt-0">
                  <div className="flex items-center gap-2 truncate">
                    <img
                      src={item.product.image}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&auto=format&fit=crop&q=80';
                      }}
                      className="w-7 h-7 object-contain rounded"
                    />
                    <span className="truncate max-w-[240px] text-gray-800 font-medium">
                      {item.product.title} (x{item.quantity})
                    </span>
                  </div>
                  <span className="font-bold text-gray-900 shrink-0">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Payment Options */}
          <div className="space-y-3">
            <span className="font-bold text-gray-800 uppercase tracking-wider text-[11px] block">
              3. Select Payment Mode
            </span>

            <div className="space-y-2">
              {/* UPI */}
              <label 
                className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-all ${
                  paymentMethod === 'UPI' ? 'border-[#2874f0] bg-blue-50/50 shadow-xs' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="checkout-payment-method"
                  checked={paymentMethod === 'UPI'}
                  onChange={() => setPaymentMethod('UPI')}
                  className="mt-0.5 text-[#2874f0] focus:ring-blue-400"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-green-600" /> UPI (Google Pay, PhonePe, Paytm)
                    </span>
                    <span className="text-[10px] bg-green-100 text-green-800 font-bold px-1.5 rounded">FASTEST</span>
                  </div>
                  <p className="text-gray-500 mt-0.5">Pay seamlessly with zero transaction fees</p>
                  {paymentMethod === 'UPI' && (
                    <div className="mt-2">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="Enter UPI ID (e.g. yourname@oksbi)"
                        className="w-full bg-white border border-gray-300 rounded p-1.5 text-xs text-gray-800"
                      />
                    </div>
                  )}
                </div>
              </label>

              {/* Credit / Debit Card */}
              <label 
                className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-all ${
                  paymentMethod === 'CARD' ? 'border-[#2874f0] bg-blue-50/50 shadow-xs' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="checkout-payment-method"
                  checked={paymentMethod === 'CARD'}
                  onChange={() => setPaymentMethod('CARD')}
                  className="mt-0.5 text-[#2874f0] focus:ring-blue-400"
                />
                <div className="flex-1 text-xs">
                  <span className="font-bold text-gray-900 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-[#2874f0]" /> Credit / Debit / ATM Card
                  </span>
                  <p className="text-gray-500 mt-0.5">Visa, MasterCard, RuPay &amp; American Express</p>
                  {paymentMethod === 'CARD' && (
                    <div className="mt-2 space-y-2">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded p-1.5 text-xs text-gray-800"
                      />
                    </div>
                  )}
                </div>
              </label>

              {/* Cash On Delivery */}
              <label 
                className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-all ${
                  paymentMethod === 'COD' ? 'border-[#2874f0] bg-blue-50/50 shadow-xs' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="checkout-payment-method"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="mt-0.5 text-[#2874f0] focus:ring-blue-400"
                />
                <div className="flex-1 text-xs">
                  <span className="font-bold text-gray-900 flex items-center gap-1.5">
                    <Banknote className="w-4 h-4 text-amber-600" /> Cash on Delivery
                  </span>
                  <p className="text-gray-500 mt-0.5">Pay via Cash / QR code upon delivery at your doorstep</p>
                </div>
              </label>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="bg-slate-50 border rounded p-3 text-xs space-y-1.5">
            <div className="flex justify-between text-gray-600">
              <span>Price ({cart.length} items)</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-700 font-medium">
                <span>Coupon Discount ({appliedCoupon?.code})</span>
                <span>-₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span className="text-green-700 font-semibold uppercase">FREE</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-sm text-gray-900">
              <span>Total Payable Amount</span>
              <span className="text-[#2874f0]">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-5 py-3 border-t flex items-center justify-between">
          <div>
            <span className="text-[11px] text-gray-500 uppercase block font-semibold">Payable</span>
            <span className="text-base font-extrabold text-gray-900">₹{finalTotal.toLocaleString('en-IN')}</span>
          </div>

          <button
            type="button"
            id="confirm-place-order-btn"
            onClick={handleConfirmOrder}
            disabled={isProcessing}
            className="bg-[#fb641b] hover:bg-orange-600 text-white font-extrabold px-6 py-2.5 rounded-sm uppercase tracking-wider text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Processing Payment...</span>
            ) : (
              <>
                <span>Confirm &amp; Pay</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});
CheckoutModal.displayName = 'CheckoutModal';

