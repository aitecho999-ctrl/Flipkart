import { Product, Coupon, Address } from '../types';

export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'Sparkles', image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&auto=format&fit=crop&q=80' },
  { id: 'mobiles', name: 'Mobiles', icon: 'Smartphone', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&auto=format&fit=crop&q=80' },
  { id: 'electronics', name: 'Electronics', icon: 'Laptop', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&auto=format&fit=crop&q=80' },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&auto=format&fit=crop&q=80' },
  { id: 'appliances', name: 'Appliances', icon: 'Tv', image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=100&auto=format&fit=crop&q=80' },
  { id: 'home', name: 'Home & Kitchen', icon: 'Armchair', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=100&auto=format&fit=crop&q=80' },
  { id: 'beauty', name: 'Beauty & Care', icon: 'Smile', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100&auto=format&fit=crop&q=80' },
  { id: 'sports', name: 'Sports & Fitness', icon: 'Dumbbell', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=100&auto=format&fit=crop&q=80' },
];

export const PROMO_BANNERS = [
  {
    id: 1,
    title: 'Big Billion Days Celebration',
    subtitle: 'Up to 80% OFF on Top Electronics & Smartphones',
    cta: 'Shop Now',
    bgColor: 'from-blue-700 via-indigo-800 to-blue-900',
    tag: 'MEGA DEAL',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80',
    category: 'electronics',
  },
  {
    id: 2,
    title: 'Apple iPhone 16 Pro Fest',
    subtitle: 'From ₹1,19,900 | ₹6,000 Instant Bank Discount + Exchange Bonus',
    cta: 'Explore Devices',
    bgColor: 'from-slate-900 via-zinc-900 to-black',
    tag: 'FLAGSHIP LAUNCH',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=1200&auto=format&fit=crop&q=80',
    category: 'mobiles',
  },
  {
    id: 3,
    title: 'Fashion Grand Wardrobe Sale',
    subtitle: 'Min 60% Off on Nike, Puma, Levi\'s & Zara',
    cta: 'Grab Offers',
    bgColor: 'from-rose-600 via-purple-700 to-indigo-800',
    tag: 'TRENDING STYLES',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    category: 'fashion',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Apple iPhone 15 (128 GB) - Blue',
    category: 'mobiles',
    subCategory: 'Smartphones',
    brand: 'Apple',
    price: 65999,
    originalPrice: 79900,
    discountPercentage: 17,
    rating: 4.6,
    ratingCount: 14280,
    reviewCount: 1240,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'iPhone 15 brings you Dynamic Island, a 48MP Main camera, and USB-C—all in a durable color-infused glass and aluminum design.',
    features: [
      'Dynamic Island bubbles up alerts and Live Activities',
      'Innovative 48MP Main camera for super-high-resolution photos',
      'A16 Bionic chip powers all kinds of advanced features',
      'USB-C connector allows you to charge your Mac or iPad with the same cable'
    ],
    specifications: {
      'In The Box': 'Handset, USB-C Charge Cable, Documentation',
      'Model Number': 'MTP43HN/A',
      'Display Size': '15.49 cm (6.1 inch) Super Retina XDR Display',
      'Processor': 'A16 Bionic Chip, 6 Core Processor',
      'Internal Storage': '128 GB',
      'Primary Camera': '48MP + 12MP',
      'Secondary Camera': '12MP Front Camera',
      'Battery Type': 'Lithium-Ion with Fast Charging'
    },
    isAssured: true,
    inStock: true,
    stockCount: 42,
    seller: {
      name: 'SuperComNet Retail',
      rating: 4.8,
      responseTime: '2 hours'
    },
    tags: ['bestseller', 'flagship', 'trending'],
    colorVariants: ['Blue', 'Black', 'Green', 'Pink', 'Yellow']
  },
  {
    id: 'prod-2',
    title: 'Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)',
    category: 'mobiles',
    subCategory: 'Smartphones',
    brand: 'Samsung',
    price: 119999,
    originalPrice: 134999,
    discountPercentage: 11,
    rating: 4.7,
    ratingCount: 8930,
    reviewCount: 840,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility.',
    features: [
      'Galaxy AI: Circle to Search with Google, Live Translate & Note Assist',
      'Armor Aluminum Frame & Corning Gorilla Armor Glass',
      '200MP Main Camera with ProVisual Engine for Nightography',
      'Snapdragon 8 Gen 3 for Galaxy with Ray Tracing'
    ],
    specifications: {
      'In The Box': 'Handset, S Pen, Data Cable (Type-C), Ejection Pin',
      'Display Size': '17.27 cm (6.8 inch) Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 3 Mobile Platform',
      'Internal Storage': '256 GB',
      'RAM': '12 GB',
      'Primary Camera': '200MP + 50MP + 12MP + 10MP',
      'Battery Capacity': '5000 mAh'
    },
    isAssured: true,
    inStock: true,
    stockCount: 18,
    seller: {
      name: 'RetailNet Tech Solutions',
      rating: 4.9,
      responseTime: '1 hour'
    },
    tags: ['ai-phone', 'flagship', 'stylus'],
    colorVariants: ['Titanium Gray', 'Titanium Black', 'Titanium Violet']
  },
  {
    id: 'prod-3',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    category: 'electronics',
    subCategory: 'Audio',
    brand: 'Sony',
    price: 26990,
    originalPrice: 34990,
    discountPercentage: 22,
    rating: 4.8,
    ratingCount: 18450,
    reviewCount: 2310,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Industry-leading noise cancellation optimized to you. Magnificent sound engineered to perfection with 30-hour battery life and ultra-comfortable lightweight design.',
    features: [
      'Two processors and 8 microphones for unprecedented noise cancellation',
      'Crystal clear hands-free calling with 4 beamforming microphones',
      'Up to 30-hour battery life with quick charging (3 min for 3 hours of playback)',
      'Multipoint connection allows switching quickly between two devices'
    ],
    specifications: {
      'Connectivity': 'Bluetooth 5.2 & 3.5mm Jack',
      'Battery Life': 'Up to 30 Hours (NC ON)',
      'Noise Cancellation': 'Active Dual Processor Noise Cancelling',
      'Weight': '250 g',
      'Warranty': '1 Year Brand Domestic Warranty'
    },
    isAssured: true,
    inStock: true,
    stockCount: 25,
    seller: {
      name: 'OmniTech Audio Store',
      rating: 4.7,
      responseTime: '3 hours'
    },
    tags: ['anc', 'premium-audio', 'deal-of-the-day'],
    colorVariants: ['Silver White', 'Midnight Black', 'Navy Blue']
  },
  {
    id: 'prod-4',
    title: 'Apple MacBook Air M2 (8GB RAM, 256GB SSD, 13.6-inch Liquid Retina)',
    category: 'electronics',
    subCategory: 'Laptops',
    brand: 'Apple',
    price: 89990,
    originalPrice: 114900,
    discountPercentage: 21,
    rating: 4.8,
    ratingCount: 9420,
    reviewCount: 880,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Strikingly thin design with the lightning-fast Apple M2 chip. Up to 18 hours of battery life and a stunning Liquid Retina display with 500 nits of brightness.',
    features: [
      'Apple M2 chip with 8-core CPU and up to 10-core GPU',
      '13.6-inch Liquid Retina display with True Tone',
      '1080p FaceTime HD camera with three-mic array',
      'MagSafe 3 charging port, two Thunderbolt ports and headphone jack'
    ],
    specifications: {
      'Processor': 'Apple M2 Octa Core',
      'RAM': '8 GB Unified Memory',
      'Storage': '256 GB NVMe SSD',
      'Display': '13.6-inch Liquid Retina LED-backlit Display',
      'Operating System': 'macOS Sequoia',
      'Weight': '1.24 kg'
    },
    isAssured: true,
    inStock: true,
    stockCount: 14,
    seller: {
      name: 'IndiFlash Electronics',
      rating: 4.9,
      responseTime: '1 hour'
    },
    tags: ['macbook', 'lightweight', 'top-rated'],
    colorVariants: ['Space Grey', 'Midnight', 'Starlight', 'Silver']
  },
  {
    id: 'prod-5',
    title: 'Nike Air Max 270 Men Running Shoes',
    category: 'fashion',
    subCategory: 'Footwear',
    brand: 'Nike',
    price: 9995,
    originalPrice: 14995,
    discountPercentage: 33,
    rating: 4.4,
    ratingCount: 3410,
    reviewCount: 420,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Nike\'s first lifestyle Air unit brings you style, comfort and big attitude in the Nike Air Max 270. The design draws inspiration from Air Max icons.',
    features: [
      'Large Max Air unit in heel delivers responsive cushioning',
      'Stretchy inner sleeve creates a snug, comfortable fit',
      'Mesh upper provides lightweight breathability',
      'Solid rubber outsole for durable traction'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Sports / Casual',
      'Outer Material': 'Breathable Knit Mesh',
      'Closure': 'Lace-Up',
      'Color': 'Red / Black'
    },
    isAssured: true,
    inStock: true,
    stockCount: 30,
    seller: {
      name: 'Athletic World Sports',
      rating: 4.6,
      responseTime: '4 hours'
    },
    tags: ['sneakers', 'nike', 'fashion-deal'],
    colorVariants: ['University Red', 'Triple Black', 'White / Laser Blue'],
    sizeVariants: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
  },
  {
    id: 'prod-6',
    title: 'Levi\'s Men Slim Fit Washed Denim Casual Shirt',
    category: 'fashion',
    subCategory: 'Topwear',
    brand: 'Levi\'s',
    price: 1799,
    originalPrice: 3299,
    discountPercentage: 45,
    rating: 4.3,
    ratingCount: 5200,
    reviewCount: 610,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Crafted from premium 100% breathable cotton, this classic Western style denim shirt features double flap pockets and pearl snap buttons.',
    features: [
      'Pure Cotton breathable denim weave',
      'Classic spread collar with snap button placket',
      'Dual chest patch flap pockets',
      'Pre-washed for super soft finish'
    ],
    specifications: {
      'Fit': 'Slim Fit',
      'Fabric': '100% Cotton Denim',
      'Sleeve': 'Full Sleeve',
      'Pattern': 'Solid Indigo Wash',
      'Care': 'Machine Wash Warm'
    },
    isAssured: true,
    inStock: true,
    stockCount: 65,
    seller: {
      name: 'Apparel Junction India',
      rating: 4.5,
      responseTime: '2 hours'
    },
    tags: ['trending-fashion', 'denim'],
    colorVariants: ['Indigo Blue', 'Washed Light Blue', 'Charcoal Black'],
    sizeVariants: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'prod-7',
    title: 'LG 55 inch 4K Ultra HD Smart OLED TV (OLED55C3PSA)',
    category: 'appliances',
    subCategory: 'Televisions',
    brand: 'LG',
    price: 94990,
    originalPrice: 169990,
    discountPercentage: 44,
    rating: 4.8,
    ratingCount: 4120,
    reviewCount: 590,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Experience infinite contrast with LG Self-Lighting OLED pixels. Powered by α9 AI Processor Gen6 for ultra-realistic picture and sound.',
    features: [
      'Self-Lit OLED Pixels with Perfect Black & 100% Color Fidelity',
      'α9 Gen6 AI Processor 4K for maximum clarity and HDR depth',
      'Dolby Vision IQ + Dolby Atmos immersive audio',
      '0.1ms response time with 120Hz refresh rate and NVIDIA G-Sync support'
    ],
    specifications: {
      'Screen Size': '139 cm (55 inch)',
      'Resolution': 'Ultra HD (4K) 3840 x 2160 Pixels',
      'Refresh Rate': '120 Hz',
      'Audio Output': '40W with Subwoofer',
      'Smart TV OS': 'webOS 23 with ThinQ AI'
    },
    isAssured: true,
    inStock: true,
    stockCount: 9,
    seller: {
      name: 'Vision World Electronics',
      rating: 4.8,
      responseTime: '1 hour'
    },
    tags: ['oled', 'smart-tv', 'home-theater'],
    colorVariants: ['Titan Gray']
  },
  {
    id: 'prod-8',
    title: 'Philips Digital Air Fryer with Rapid Air Technology (4.1 Litre)',
    category: 'appliances',
    subCategory: 'Kitchen',
    brand: 'Philips',
    price: 6499,
    originalPrice: 10999,
    discountPercentage: 40,
    rating: 4.5,
    ratingCount: 16200,
    reviewCount: 1840,
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
    additionalImages: [],
    description: 'Fry with up to 90% less fat. Rapid Air Technology with its unique starfish design swirls hot air to create delicious foods that are crispy on the outside and tender inside.',
    features: [
      'Rapid Air Technology for 90% less oil cooking',
      'Touch screen with 7 presets for easy cooking',
      'Keep warm function for up to 30 minutes',
      'NutriU app with over 500+ healthy recipes'
    ],
    specifications: {
      'Capacity': '4.1 Litres (0.8 kg)',
      'Power Consumption': '1400 W',
      'Temperature Control': '80°C - 200°C',
      'Timer': 'Up to 60 Minutes',
      'Warranty': '2 Years Global Warranty'
    },
    isAssured: true,
    inStock: true,
    stockCount: 50,
    seller: {
      name: 'Kitchen Star Appliances',
      rating: 4.7,
      responseTime: '2 hours'
    },
    tags: ['bestseller', 'healthy-living'],
    colorVariants: ['Black & Silver']
  },
  {
    id: 'prod-9',
    title: 'Wakefit Orthopedic Memory Foam 6-inch Mattress (King Size)',
    category: 'home',
    subCategory: 'Furniture',
    brand: 'Wakefit',
    price: 12499,
    originalPrice: 21999,
    discountPercentage: 43,
    rating: 4.6,
    ratingCount: 28900,
    reviewCount: 3100,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=80',
    additionalImages: [],
    description: 'Designed to adapt to your body shape and provide ergonomic spine alignment for deep, uninterrupted sleep with breathable GSM fabric.',
    features: [
      'Next-Gen Memory Foam adapts to sleeper contour',
      'High Resilience foam base provides robust spinal support',
      'Removable, breathable zipper cover for hygienic cleaning',
      '10-Year manufacturer warranty with 100-night trial'
    ],
    specifications: {
      'Dimensions': '78 x 72 x 6 inches (King Size)',
      'Primary Material': 'Memory Foam + High Density Support Foam',
      'Firmness': 'Medium Firm',
      'Warranty': '10 Years Manufacturer Warranty'
    },
    isAssured: true,
    inStock: true,
    stockCount: 22,
    seller: {
      name: 'Wakefit Direct Official',
      rating: 4.9,
      responseTime: '1 hour'
    },
    tags: ['sleep', 'orthopedic'],
    colorVariants: ['White & Grey']
  },
  {
    id: 'prod-10',
    title: 'Maybelline New York Super Stay Matte Ink Liquid Lipstick',
    category: 'beauty',
    subCategory: 'Makeup',
    brand: 'Maybelline',
    price: 499,
    originalPrice: 699,
    discountPercentage: 28,
    rating: 4.4,
    ratingCount: 38400,
    reviewCount: 4900,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80',
    additionalImages: [],
    description: 'Ink your lips in up to 16 HR saturated liquid matte color. SuperStay Matte Ink features a unique arrow applicator for precise application.',
    features: [
      'Up to 16 hours of transfer-proof matte wear',
      'Highly pigmented formula glides smoothly',
      'Arrow applicator for precise edge lining',
      'Non-drying long-lasting finish'
    ],
    specifications: {
      'Finish': 'Velvet Matte',
      'Duration': '16 Hours Long Lasting',
      'Volume': '5 ml',
      'Skin Type': 'All Skin Types'
    },
    isAssured: true,
    inStock: true,
    stockCount: 120,
    seller: {
      name: 'Cosmetics Hub India',
      rating: 4.6,
      responseTime: '2 hours'
    },
    tags: ['beauty', 'top-rated'],
    colorVariants: ['Pioneer Red', 'Seductress Nude', 'Ruler Plum', 'Heroine Coral']
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'FLIPKART10',
    discountPercent: 10,
    minOrderValue: 999,
    maxDiscount: 1500,
    description: '10% Instant Discount on orders above ₹999',
    expiresAt: '2026-12-31'
  },
  {
    code: 'BIGBILLION',
    discountPercent: 15,
    minOrderValue: 4999,
    maxDiscount: 3000,
    description: '15% Mega Discount during Big Billion Days',
    expiresAt: '2026-12-31'
  },
  {
    code: 'SUPERCOIN500',
    discountPercent: 20,
    minOrderValue: 1999,
    maxDiscount: 500,
    description: 'Flat ₹500 discount with SuperCoins membership',
    expiresAt: '2026-12-31'
  }
];

export const INITIAL_ADDRESS: Address = {
  id: 'addr-default',
  name: 'Rahul Sharma',
  phone: '9876543210',
  pincode: '560034',
  locality: 'Koramangala 4th Block',
  addressLine: '#402, Sunshine Residency, 8th Main Road',
  city: 'Bengaluru',
  state: 'Karnataka',
  type: 'HOME',
  isDefault: true
};

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    userId: 'u101',
    userName: 'Aarav Patel',
    rating: 5,
    title: 'Outstanding performance and battery backup!',
    comment: 'The product arrived safely within 24 hours thanks to Flipkart Assured. Camera quality and build are top notch.',
    date: '24 Aug 2026',
    verifiedPurchase: true,
    helpfulCount: 84
  },
  {
    id: 'rev-2',
    userId: 'u102',
    userName: 'Pooja Nair',
    rating: 5,
    title: 'Absolute value for money',
    comment: 'Got it during the Big Billion Days sale with SBI card discount. Works like a charm!',
    date: '18 Aug 2026',
    verifiedPurchase: true,
    helpfulCount: 37
  },
  {
    id: 'rev-3',
    userId: 'u103',
    userName: 'Vikram Sethi',
    rating: 4,
    title: 'Great product, delivery was quick',
    comment: 'Packing was solid and original seal was intact. Very happy with the purchase.',
    date: '10 Aug 2026',
    verifiedPurchase: true,
    helpfulCount: 19
  }
];
