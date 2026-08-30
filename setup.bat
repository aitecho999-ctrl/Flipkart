@echo off
echo Flipkart Clone - Setup Script

echo.
echo Checking Node.js installation...
node -v

echo.
echo Installing dependencies...
call npm install

echo.
echo Setting up environment variables...

if not exist "apps\api\.env.local" (
  echo Creating apps\api\.env.local...
  copy apps\api\.env.example apps\api\.env.local
)

if not exist "apps\web\.env.local" (
  echo Creating apps\web\.env.local...
  copy apps\web\.env.example apps\web\.env.local
)

if not exist "apps\admin\.env.local" (
  echo Creating apps\admin\.env.local...
  copy apps\admin\.env.example apps\admin\.env.local
)

echo.
echo Setup complete!
echo.
echo Next steps:
echo 1. Update .env.local files with your configuration
echo 2. Setup your database (PostgreSQL or Supabase)
echo 3. Run: npm run db:migrate
echo 4. Run: npm run dev
echo.
echo Then visit:
echo - Storefront: http://localhost:3000
echo - Admin: http://localhost:3001
echo - API: http://localhost:3002
echo - API Docs: http://localhost:3002/api/docs
