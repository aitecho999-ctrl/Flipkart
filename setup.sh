#!/bin/bash

echo "🚀 Setting up Flipkart Clone..."

# Check Node.js version
NODE_VERSION=$(node -v)
echo "✓ Node.js $NODE_VERSION installed"

# Install dependencies
echo "\n📦 Installing dependencies..."
npm install

# Setup environment files
echo "\n🔐 Setting up environment variables..."

if [ ! -f "apps/api/.env.local" ]; then
  echo "Creating apps/api/.env.local..."
  cp apps/api/.env.example apps/api/.env.local
fi

if [ ! -f "apps/web/.env.local" ]; then
  echo "Creating apps/web/.env.local..."
  cp apps/web/.env.example apps/web/.env.local
fi

if [ ! -f "apps/admin/.env.local" ]; then
  echo "Creating apps/admin/.env.local..."
  cp apps/admin/.env.example apps/admin/.env.local
fi

echo "\n✅ Setup complete!"
echo "\n📝 Next steps:"
echo "1. Update .env.local files with your configuration"
echo "2. Setup your database (PostgreSQL or Supabase)"
echo "3. Run: npm run db:migrate"
echo "4. Run: npm run dev"
echo "\nThen visit:"
echo "- Storefront: http://localhost:3000"
echo "- Admin: http://localhost:3001"
echo "- API: http://localhost:3002"
echo "- API Docs: http://localhost:3002/api/docs"
