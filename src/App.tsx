import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { CategoryBar } from './components/CategoryBar';
import { BannerCarousel } from './components/BannerCarousel';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';
import { CartView } from './components/CartView';
import { WishlistView } from './components/WishlistView';
import { OrdersView } from './components/OrdersView';
import { AdminDashboard } from './components/AdminDashboard';
import { ImageSearchModal } from './components/ImageSearchModal';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeTab } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f3f6] text-gray-900 selection:bg-blue-100 selection:text-[#2874f0]">
      {/* Header Navigation */}
      <Header />

      {/* Main Category Bar (Shown on storefront and product detail) */}
      {(activeTab === 'store' || activeTab === 'product_detail') && <CategoryBar />}

      {/* Dynamic Content View */}
      <main className="flex-1">
        {activeTab === 'store' && (
          <>
            <BannerCarousel />
            <ProductList />
          </>
        )}

        {activeTab === 'product_detail' && <ProductDetail />}
        {activeTab === 'cart' && <CartView />}
        {activeTab === 'wishlist' && <WishlistView />}
        {activeTab === 'orders' && <OrdersView />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Visual Image Search Modal */}
      <ImageSearchModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

export default App;
