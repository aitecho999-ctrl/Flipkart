import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Package, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  Download, 
  X, 
  AlertCircle, 
  ArrowRight, 
} from 'lucide-react';
import { Order } from '../types';

export const OrdersView: React.FC = React.memo(() => {
  const { orders, updateOrderStatus, setActiveTab, selectedOrderId, showToast } = useStore();
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(() => {
    if (selectedOrderId) {
      return orders.find((o) => o.id === selectedOrderId) || null;
    }
    return null;
  });

  const handleDownloadInvoice = (orderId: string) => {
    showToast(`Invoice for Order #${orderId} generated and downloaded!`);
  };

  const handleCancelOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'CANCELLED');
    showToast(`Order #${orderId} has been cancelled`, 'info');
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div 
          id="empty-orders-state"
          className="bg-white rounded-lg border border-gray-200 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs space-y-4"
        >
          <div className="w-20 h-20 bg-blue-50 text-[#2874f0] rounded-full flex items-center justify-center mx-auto">
            <Package className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">No Orders Placed Yet</h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Looks like you haven't placed an order yet. Discover top deals and shop your favorite products today.
          </p>
          <button
            type="button"
            id="empty-orders-shop-btn"
            onClick={() => {
              setActiveTab('store');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#2874f0] hover:bg-blue-700 text-white font-extrabold px-8 py-3 rounded-sm uppercase tracking-wider text-xs shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 space-y-6">
      <div className="bg-white rounded border border-gray-200 shadow-xs p-4 flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-[#2874f0]" />
            <span>My Orders ({orders.length})</span>
          </h2>
          <p className="text-xs text-gray-500">Track current shipments and view previous order invoices</p>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const isDelivered = order.status === 'DELIVERED';
          const isCancelled = order.status === 'CANCELLED';

          return (
            <div
              key={order.id}
              id={`order-card-${order.id}`}
              className="bg-white rounded border border-gray-200 shadow-xs p-4 sm:p-5 space-y-4"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between flex-wrap gap-2 border-b pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500">ORDER</span>
                    <span className="text-xs font-extrabold text-[#2874f0]">#{order.id}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">Placed on {order.date} • Paid via {order.paymentMethod}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">Total Amount</span>
                    <span className="text-sm font-extrabold text-gray-900">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded flex items-center gap-1 ${
                      isDelivered
                        ? 'bg-green-100 text-green-800'
                        : isCancelled
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-blue-100 text-[#2874f0]'
                    }`}
                  >
                    {isDelivered && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {isCancelled && <AlertCircle className="w-3.5 h-3.5" />}
                    {!isDelivered && !isCancelled && <Truck className="w-3.5 h-3.5" />}
                    <span>{order.status.replace(/_/g, ' ')}</span>
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y divide-gray-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 first:pt-0 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.productImage}
                        alt=""
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=80';
                        }}
                        className="w-14 h-14 object-contain bg-gray-50 border rounded p-1"
                      />
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-1">
                          {item.productTitle}
                        </h4>
                        <p className="text-[11px] text-gray-500">
                          Qty: {item.quantity} {item.selectedColor ? `• Color: ${item.selectedColor}` : ''}
                        </p>
                        <p className="text-xs font-bold text-gray-900 mt-0.5">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <div className="text-right text-xs">
                      <p className="text-gray-500">Expected Delivery:</p>
                      <p className="font-bold text-gray-900">{order.estimatedDelivery}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Actions */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t text-xs">
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span className="truncate max-w-xs">
                    Shipping to: {order.shippingAddress.name}, {order.shippingAddress.city}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    id={`track-order-btn-${order.id}`}
                    onClick={() => setActiveTrackingOrder(order)}
                    className="bg-blue-50 text-[#2874f0] font-bold px-3 py-1.5 rounded hover:bg-blue-100 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Track Order</span>
                  </button>

                  <button
                    type="button"
                    id={`download-invoice-btn-${order.id}`}
                    onClick={() => handleDownloadInvoice(order.id)}
                    className="border border-gray-300 text-gray-700 font-semibold px-3 py-1.5 rounded hover:bg-gray-50 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Invoice</span>
                  </button>

                  {!isDelivered && !isCancelled && (
                    <button
                      type="button"
                      id={`cancel-order-btn-${order.id}`}
                      onClick={() => handleCancelOrder(order.id)}
                      className="text-rose-600 hover:text-rose-800 font-semibold px-2 py-1.5 cursor-pointer"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tracking Modal */}
      {activeTrackingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-lg max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95">
            <div className="bg-[#2874f0] text-white px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <h3 className="font-bold text-sm">Ekart Logistics Delivery Tracker</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveTrackingOrder(null)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="bg-blue-50/60 border border-blue-200 rounded p-3 text-xs space-y-1">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>Order #{activeTrackingOrder.id}</span>
                  <span className="text-[#2874f0]">{activeTrackingOrder.status}</span>
                </div>
                <p className="text-gray-600">
                  Estimated Delivery by <strong className="text-gray-900">{activeTrackingOrder.estimatedDelivery}</strong>
                </p>
              </div>

              {/* Delivery Timeline Stages */}
              <div className="space-y-4 pl-2">
                {activeTrackingOrder.timeline.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-3">
                    {/* Circle Indicator */}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold z-10 shrink-0 ${
                        step.completed
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-500 border border-gray-300'
                      }`}
                    >
                      {step.completed ? '✓' : idx + 1}
                    </div>

                    {/* Vertical Connector Line */}
                    {idx < activeTrackingOrder.timeline.length - 1 && (
                      <div
                        className={`absolute left-2.5 top-5 w-0.5 h-10 -ml-[1px] ${
                          step.completed ? 'bg-green-600' : 'bg-gray-200'
                        }`}
                      />
                    )}

                    <div className="text-xs flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                          {step.status.replace(/_/g, ' ')}
                        </span>
                        <span className="text-[10px] text-gray-400">{step.date}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 px-5 py-3 border-t text-right">
              <button
                type="button"
                onClick={() => setActiveTrackingOrder(null)}
                className="bg-[#2874f0] text-white text-xs font-bold px-4 py-2 rounded cursor-pointer"
              >
                Close Tracking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
OrdersView.displayName = 'OrdersView';

