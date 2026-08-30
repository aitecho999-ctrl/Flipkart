export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  title: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  subCategory?: string;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  ratingCount: number;
  reviewCount: number;
  image: string;
  additionalImages?: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  isAssured: boolean;
  inStock: boolean;
  stockCount: number;
  seller: {
    name: string;
    rating: number;
    responseTime: string;
  };
  tags?: string[];
  colorVariants?: string[];
  sizeVariants?: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  locality: string;
  addressLine: string;
  city: string;
  state: string;
  type: 'HOME' | 'WORK';
  isDefault: boolean;
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  productImage: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export type OrderStatus = 'ORDERED' | 'PACKED' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  deliveryFee: number;
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  estimatedDelivery: string;
  timeline: {
    status: OrderStatus;
    date: string;
    description: string;
    completed: boolean;
  }[];
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minOrderValue: number;
  maxDiscount: number;
  description: string;
  expiresAt: string;
}

export interface FilterState {
  category: string;
  subCategory?: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
  brands: string[];
  isAssuredOnly: boolean;
  inStockOnly: boolean;
  searchQuery: string;
  sortBy: 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'newest';
}

export type ActiveTab = 'store' | 'product_detail' | 'cart' | 'wishlist' | 'orders' | 'admin';
