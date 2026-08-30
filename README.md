# Flipkart Clone - Full Stack E-Commerce Platform

A comprehensive full-stack e-commerce platform built with modern technologies, featuring a customer-facing storefront, admin dashboard, and robust backend API.

## 🚀 Features

### Customer Storefront (Next.js)
- **Product Catalog**: Browse products with advanced filtering, sorting, and search
- **Image-based Product Search**: Search products by uploading images
- **Shopping Cart**: Add, remove, and manage items in the cart
- **Wishlist**: Save favorite products for later
- **User Authentication**: OAuth2 integration with Google & GitHub
- **Product Reviews & Ratings**: Leave and view product reviews
- **Order Management**: Track order status and history
- **Offers & Coupons**: Apply discount codes at checkout
- **Responsive Design**: Mobile-first design matching Flipkart's UI

### Admin Dashboard (Next.js)
- **Product Management**: Add, edit, delete products with images
- **Inventory Management**: Track stock levels and manage inventory
- **Order Management**: View, process, and manage customer orders
- **Analytics Dashboard**: Sales analytics, revenue charts, and insights
- **User Management**: Manage customers and seller accounts
- **Coupon Management**: Create and manage promotional codes
- **Payment Management**: View transaction history and settlements
- **Reports & Exports**: Generate sales reports and export data

### Backend API (NestJS)
- **RESTful API**: Well-structured API endpoints with proper versioning
- **Authentication & Authorization**: JWT + OAuth2 support
- **Database**: Supabase (PostgreSQL) with Prisma ORM
- **Real-time Features**: WebSocket support for order updates
- **File Upload**: Image upload and management
- **Payment Integration**: Stripe/PayPal payment processing
- **Caching**: Redis caching for performance
- **Logging**: Comprehensive error and request logging

## 📦 Project Structure

```
flipkart-clone/
├── apps/
│   ├── web/              # Customer storefront (Next.js)
│   ├── admin/            # Admin dashboard (Next.js)
│   └── api/              # Backend API (NestJS)
├── packages/
│   ├── shared/           # Shared types and utilities
│   └── db/               # Database migrations and schema
├── config/               # Shared configurations
├── docs/                 # Documentation
└── README.md
```

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand + React Query
- **UI Components**: Shadcn/ui
- **Authentication**: NextAuth.js + OAuth2

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: JWT + OAuth2
- **Payment**: Stripe SDK
- **File Storage**: AWS S3 (or Supabase Storage)
- **Real-time**: Socket.io
- **Testing**: Jest

### DevOps & Tools
- **Package Manager**: npm workspaces
- **Build Tool**: tsup, Next.js build
- **Linting**: ESLint
- **Formatting**: Prettier
- **Database**: Supabase

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Supabase account
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   cd /path/to/website
   npm install
   ```

2. **Setup environment variables**
   - Create `.env.local` files in each app directory
   - Copy from `.env.example` files

3. **Setup Database**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   - Storefront: http://localhost:3000
   - Admin: http://localhost:3001
   - API: http://localhost:3002
   - API Docs: http://localhost:3002/api/docs

## 📚 Documentation

- [Backend API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Authentication Flow](./docs/AUTH.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## 🗄️ Database Schema

Key tables:
- `users` - Customer and seller accounts
- `products` - Product catalog
- `categories` - Product categories
- `cart_items` - Shopping cart items
- `orders` - Customer orders
- `order_items` - Order line items
- `reviews` - Product reviews and ratings
- `wishlist_items` - Saved products
- `coupons` - Promotional codes
- `payments` - Payment transactions

## 🔐 Security Features

- **Authentication**: OAuth2 + JWT
- **Authorization**: Role-based access control (RBAC)
- **Encryption**: Password hashing with bcrypt
- **Validation**: Input validation on backend
- **HTTPS**: Enforced in production
- **CORS**: Configured appropriately
- **Environment Variables**: Secure secret management

## 📊 API Endpoints Overview

### Auth Routes
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/refresh` - Refresh JWT token

### Products Routes
- `GET /api/v1/products` - List all products
- `GET /api/v1/products/:id` - Get product details
- `POST /api/v1/products` - Create product (admin)
- `PUT /api/v1/products/:id` - Update product (admin)
- `DELETE /api/v1/products/:id` - Delete product (admin)
- `POST /api/v1/products/search/image` - Image-based search

### Cart Routes
- `GET /api/v1/cart` - Get user's cart
- `POST /api/v1/cart/items` - Add item to cart
- `PUT /api/v1/cart/items/:id` - Update cart item
- `DELETE /api/v1/cart/items/:id` - Remove cart item

### Order Routes
- `GET /api/v1/orders` - List user's orders
- `POST /api/v1/orders` - Create new order
- `GET /api/v1/orders/:id` - Get order details
- `PUT /api/v1/orders/:id` - Update order status (admin)

### Review Routes
- `GET /api/v1/products/:id/reviews` - Get product reviews
- `POST /api/v1/products/:id/reviews` - Create review
- `PUT /api/v1/reviews/:id` - Update review
- `DELETE /api/v1/reviews/:id` - Delete review

### Wishlist Routes
- `GET /api/v1/wishlist` - Get user's wishlist
- `POST /api/v1/wishlist` - Add to wishlist
- `DELETE /api/v1/wishlist/:id` - Remove from wishlist

### Coupon Routes
- `GET /api/v1/coupons` - List available coupons
- `POST /api/v1/coupons/:code/validate` - Validate coupon code

## 🧪 Testing

Run tests across all workspaces:
```bash
npm run test
```

## 🚢 Deployment

See [Deployment Guide](./docs/DEPLOYMENT.md) for:
- Frontend deployment (Vercel)
- Admin deployment (Vercel)
- Backend deployment (Railway, Render, Heroku, AWS)
- Database setup on Supabase
- Environment configuration

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 💬 Support

For issues and questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Join our Discord community

## 🎯 Roadmap

- [ ] Multi-vendor support
- [ ] Advanced seller analytics
- [ ] AI-powered recommendations
- [ ] Mobile app (React Native)
- [ ] GraphQL API
- [ ] WebSocket real-time notifications
- [ ] Blockchain payments integration
- [ ] Virtual try-on features

---

**Last Updated**: 2024
