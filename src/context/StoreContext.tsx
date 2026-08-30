import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, WishlistItem, Order, Coupon, Address, FilterState, ActiveTab } from '../types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS, INITIAL_ADDRESS } from '../data/mockData';
import confetti from 'canvas-confetti';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface StoreContextType {
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  orders: Order[];
  createOrder: (paymentMethod: string) => Order | null;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  availableCoupons: Coupon[];
  addNewCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  shippingAddress: Address;
  setShippingAddress: (addr: Address) => void;
  // Product management for Admin
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  // Toast notifications
  toasts: Toast[];
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  // Visual search modal
  isImageSearchOpen: boolean;
  setIsImageSearchOpen: (open: boolean) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
}

const defaultFilters: FilterState = {
  category: 'all',
  minPrice: 0,
  maxPrice: 200000,
  rating: 0,
  brands: [],
  isAssuredOnly: false,
  inStockOnly: false,
  searchQuery: '',
  sortBy: 'relevance',
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('flipkart_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('flipkart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('flipkart_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('flipkart_orders');
      if (saved) return JSON.parse(saved);
      // Sample initial order
      return [
        {
          id: 'OD129481940124',
          date: '28 Aug 2026',
          items: [
            {
              productId: 'prod-1',
              productTitle: 'Apple iPhone 15 (128 GB) - Blue',
              productImage: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
              price: 65999,
              quantity: 1,
              selectedColor: 'Blue'
            }
          ],
          totalAmount: 65999,
          discountAmount: 13901,
          deliveryFee: 0,
          status: 'SHIPPED',
          shippingAddress: INITIAL_ADDRESS,
          paymentMethod: 'UPI (Google Pay)',
          paymentStatus: 'PAID',
          estimatedDelivery: '31 Aug 2026',
          timeline: [
            { status: 'ORDERED', date: '28 Aug, 10:30 AM', description: 'Order Placed & Confirmed', completed: true },
            { status: 'PACKED', date: '28 Aug, 04:15 PM', description: 'Seller packed your item', completed: true },
            { status: 'SHIPPED', date: '29 Aug, 08:45 AM', description: 'Shipped via Ekart Logistics (AWB #EK894129)', completed: true },
            { status: 'OUT_FOR_DELIVERY', date: '31 Aug, 09:00 AM', description: 'Courier out for delivery to address', completed: false },
            { status: 'DELIVERED', date: '31 Aug, 06:00 PM', description: 'Item handed over to customer', completed: false }
          ]
        }
      ];
    } catch {
      return [];
    }
  });

  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [shippingAddress, setShippingAddress] = useState<Address>(INITIAL_ADDRESS);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('store');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('flipkart_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('flipkart_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('flipkart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('flipkart_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          product,
          quantity,
          selectedColor: color || product.colorVariants?.[0],
          selectedSize: size || product.sizeVariants?.[0],
        },
      ];
    });
    showToast(`Added "${product.title.slice(0, 28)}..." to cart!`);
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((w) => w.product.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((w) => w.product.id !== product.id));
      showToast('Removed from Wishlist', 'info');
    } else {
      setWishlist((prev) => [
        ...prev,
        {
          id: `wish-${Date.now()}`,
          product,
          addedAt: new Date().toISOString(),
        },
      ]);
      showToast('Added to Wishlist!');
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((w) => w.product.id === productId);
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = availableCoupons.find((c) => c.code.toUpperCase() === trimmed);
    if (!found) {
      showToast('Invalid Coupon Code', 'error');
      return { success: false, message: 'Invalid Coupon Code' };
    }
    const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    if (cartSubtotal < found.minOrderValue) {
      const msg = `Minimum order value for ${found.code} is ₹${found.minOrderValue.toLocaleString('en-IN')}`;
      showToast(msg, 'error');
      return { success: false, message: msg };
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied! Saved ₹${Math.min((cartSubtotal * found.discountPercent) / 100, found.maxDiscount).toLocaleString('en-IN')}`);
    return { success: true, message: 'Coupon applied successfully' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const addNewCoupon = (coupon: Coupon) => {
    setAvailableCoupons((prev) => [coupon, ...prev]);
    showToast(`Coupon ${coupon.code} created!`);
  };

  const deleteCoupon = (code: string) => {
    setAvailableCoupons((prev) => prev.filter((c) => c.code !== code));
    if (appliedCoupon?.code === code) {
      setAppliedCoupon(null);
    }
    showToast('Coupon deleted', 'info');
  };

  const createOrder = (paymentMethod: string): Order | null => {
    if (cart.length === 0) return null;

    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    let discount = 0;
    if (appliedCoupon) {
      discount = Math.min((subtotal * appliedCoupon.discountPercent) / 100, appliedCoupon.maxDiscount);
    }

    const total = Math.max(0, subtotal - discount);
    const orderId = 'OD' + Date.now().toString().slice(-9) + Math.floor(100 + Math.random() * 900);

    const now = new Date();
    const estDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    const dateFormatted = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const estFormatted = estDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    const newOrder: Order = {
      id: orderId,
      date: dateFormatted,
      items: cart.map((c) => ({
        productId: c.product.id,
        productTitle: c.product.title,
        productImage: c.product.image,
        price: c.product.price,
        quantity: c.quantity,
        selectedColor: c.selectedColor,
        selectedSize: c.selectedSize,
      })),
      totalAmount: total,
      discountAmount: discount,
      deliveryFee: 0,
      status: 'ORDERED',
      shippingAddress: { ...shippingAddress },
      paymentMethod,
      paymentStatus: 'PAID',
      estimatedDelivery: estFormatted,
      timeline: [
        {
          status: 'ORDERED',
          date: `${dateFormatted}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          description: 'Order Placed & Confirmed by Flipkart Hub',
          completed: true,
        },
        {
          status: 'PACKED',
          date: 'Expected in 12 hours',
          description: 'Seller will pack and hand over to Ekart',
          completed: false,
        },
        {
          status: 'SHIPPED',
          date: 'Expected in 24 hours',
          description: 'Dispatched from nearest fulfillment center',
          completed: false,
        },
        {
          status: 'OUT_FOR_DELIVERY',
          date: estFormatted,
          description: 'Courier agent will arrive at your address',
          completed: false,
        },
        {
          status: 'DELIVERED',
          date: estFormatted,
          description: 'Delivery with OTP verification',
          completed: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);

    // Trigger celebration confetti!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    showToast('🎉 Order Placed Successfully!');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const statusOrder: Order['status'][] = ['ORDERED', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'];
          const currentIndex = statusOrder.indexOf(status);
          const updatedTimeline = ord.timeline.map((item) => {
            const stepIndex = statusOrder.indexOf(item.status);
            return {
              ...item,
              completed: stepIndex <= currentIndex,
            };
          });
          return {
            ...ord,
            status,
            timeline: updatedTimeline,
          };
        }
        return ord;
      })
    );
    showToast(`Order #${orderId} status updated to ${status}`);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${newProduct.title}" added to catalog!`);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Product "${updated.title}" updated successfully!`);
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        selectedProduct,
        setSelectedProduct,
        activeTab,
        setActiveTab,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        createOrder,
        updateOrderStatus,
        filters,
        setFilters,
        resetFilters,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        availableCoupons,
        addNewCoupon,
        deleteCoupon,
        shippingAddress,
        setShippingAddress,
        addProduct,
        updateProduct,
        deleteProduct,
        toasts,
        showToast,
        isImageSearchOpen,
        setIsImageSearchOpen,
        selectedOrderId,
        setSelectedOrderId,
      }}
    >
      {children}
      {/* Global Toast Render */}
      <div id="toast-container" className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`pointer-events-auto px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 ${
              toast.type === 'error'
                ? 'bg-rose-600 text-white'
                : toast.type === 'info'
                ? 'bg-slate-800 text-white'
                : 'bg-[#2874f0] text-white border border-blue-400'
            }`}
          >
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
