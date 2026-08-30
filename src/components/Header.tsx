import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Package, 
  Camera, 
  ShieldCheck, 
  User, 
  ChevronDown, 
  Store, 
  Plus, 
  X,
  Sparkles,
  Zap
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    cart,
    wishlist,
    activeTab,
    setActiveTab,
    filters,
    setFilters,
    setIsImageSearchOpen,
    products,
    setSelectedProduct,
  } = useStore();

  const [searchInput, setSearchInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Suggestions based on search
  const suggestions = searchInput.trim()
    ? products
        .filter(
          (p) =>
            p.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchInput.toLowerCase()) ||
            p.category.toLowerCase().includes(searchInput.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, searchQuery: searchInput }));
    setActiveTab('store');
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setActiveTab('product_detail');
    setShowSuggestions(false);
    setSearchInput('');
  };

  return (
    <header className="bg-[#2874f0] text-white sticky top-0 z-40 shadow-md">
      {/* Top Banner Accent */}
      <div className="bg-[#1c54b2] text-[11px] text-blue-100 py-1 px-4 text-center font-medium hidden md:block">
        ⚡ Super Saver Days: Extra 10% Instant Discount on HDFC & SBI Bank Cards | Free Express Delivery across India
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo */}
        <div 
          id="flipkart-logo-button"
          onClick={() => {
            setFilters((prev) => ({ ...prev, searchQuery: '', category: 'all' }));
            setActiveTab('store');
          }}
          className="flex flex-col cursor-pointer shrink-0 select-none group"
        >
          <div className="flex items-center gap-1">
            <span className="text-xl sm:text-2xl font-black italic tracking-wide text-white group-hover:text-amber-300 transition-colors">
              Flipkart
            </span>
            <span className="text-xs bg-amber-400 text-blue-950 font-black px-1 rounded italic text-[10px]">
              PLUS
            </span>
          </div>
          <div className="flex items-center gap-0.5 text-[11px] font-semibold italic text-slate-200">
            <span>Explore</span>
            <span className="text-[#ffe500] font-bold flex items-center">
              Plus
              <Plus className="w-2.5 h-2.5 stroke-[3]" />
            </span>
          </div>
        </div>

        {/* Global Search Bar with Live Suggestions & Visual Search */}
        <div className="relative flex-1 max-w-2xl">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              id="global-search-input"
              type="text"
              placeholder="Search for Products, Brands and More"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full bg-white text-gray-900 placeholder:text-gray-500 pl-4 pr-20 py-2 sm:py-2.5 rounded-sm text-sm focus:outline-none shadow-inner"
            />
            {searchInput && (
              <button
                type="button"
                id="clear-search-btn"
                onClick={() => {
                  setSearchInput('');
                  setFilters((prev) => ({ ...prev, searchQuery: '' }));
                }}
                className="absolute right-14 text-gray-400 hover:text-gray-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Visual Image Search Button */}
            <button
              type="button"
              id="image-search-trigger-btn"
              title="Search by Product Image"
              onClick={() => setIsImageSearchOpen(true)}
              className="absolute right-8 text-gray-500 hover:text-[#2874f0] p-1.5 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Submit search button */}
            <button
              type="submit"
              id="search-submit-btn"
              className="absolute right-2 text-[#2874f0] hover:text-blue-700 p-1"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Live Search Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div 
              id="search-suggestions-dropdown"
              className="absolute top-full left-0 right-0 mt-1 bg-white text-gray-800 rounded shadow-2xl border border-gray-100 z-50 overflow-hidden"
            >
              <div className="p-2 bg-gray-50 text-xs font-semibold text-gray-500 border-b flex items-center justify-between">
                <span>Matching Products</span>
                <span className="text-[11px] text-[#2874f0]">Press Enter to see all</span>
              </div>
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  id={`suggestion-${item.id}`}
                  onClick={() => handleSelectSuggestion(item)}
                  className="px-3 py-2.5 hover:bg-blue-50 cursor-pointer flex items-center gap-3 border-b last:border-b-0 transition-colors"
                >
                  <img src={item.image} alt={item.title} className="w-9 h-9 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">{item.title}</p>
                    <p className="text-[11px] text-gray-500 flex items-center gap-2">
                      <span className="font-semibold text-gray-800">₹{item.price.toLocaleString('en-IN')}</span>
                      <span>in {item.category}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Account Dropdown */}
          <div className="relative">
            <button
              id="account-menu-button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="bg-white text-[#2874f0] hover:bg-slate-50 font-semibold px-4 py-1.5 rounded-sm text-sm flex items-center gap-1.5 transition-all shadow-sm"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">My Account</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showUserMenu && (
              <div 
                id="user-menu-dropdown"
                onMouseLeave={() => setShowUserMenu(false)}
                className="absolute right-0 top-full mt-2 w-56 bg-white text-gray-800 rounded shadow-xl border border-gray-200 z-50 py-1"
              >
                <div className="px-4 py-2.5 border-b bg-blue-50/60">
                  <p className="text-xs text-gray-500 font-medium">Welcome to Flipkart</p>
                  <p className="text-sm font-bold text-gray-900">Rahul Sharma</p>
                  <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 font-semibold mt-0.5">
                    <Zap className="w-3 h-3 fill-amber-500" /> 180 SuperCoins Active
                  </span>
                </div>

                <button
                  id="nav-orders-btn"
                  onClick={() => {
                    setActiveTab('orders');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-100 flex items-center gap-2.5"
                >
                  <Package className="w-4 h-4 text-[#2874f0]" />
                  <span>My Orders</span>
                </button>

                <button
                  id="nav-wishlist-btn"
                  onClick={() => {
                    setActiveTab('wishlist');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-100 flex items-center gap-2.5"
                >
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>Wishlist ({wishlist.length})</span>
                </button>

                <div className="border-t my-1"></div>

                <button
                  id="nav-admin-btn"
                  onClick={() => {
                    setActiveTab('admin');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-blue-700 hover:bg-blue-50 flex items-center gap-2.5"
                >
                  <Store className="w-4 h-4 text-[#2874f0]" />
                  <span>Seller & Admin Hub</span>
                </button>
              </div>
            )}
          </div>

          {/* Become a Seller / Admin Portal Quick Switch */}
          <button
            id="seller-hub-quick-btn"
            onClick={() => setActiveTab(activeTab === 'admin' ? 'store' : 'admin')}
            className="hidden lg:flex items-center gap-1.5 text-xs font-bold hover:text-amber-300 transition-colors"
          >
            <Store className="w-4 h-4" />
            <span>{activeTab === 'admin' ? 'Customer View' : 'Seller Hub'}</span>
          </button>

          {/* Wishlist Quick Icon */}
          <button
            id="header-wishlist-icon-btn"
            onClick={() => setActiveTab('wishlist')}
            className="relative hidden sm:flex items-center gap-1 hover:text-amber-300 transition-colors font-medium text-xs"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full absolute -top-2 -right-2">
                {wishlist.length}
              </span>
            )}
            <span className="hidden xl:inline">Wishlist</span>
          </button>

          {/* Cart Icon & Button */}
          <button
            id="header-cart-button"
            onClick={() => setActiveTab('cart')}
            className="flex items-center gap-1.5 font-bold text-sm hover:text-amber-300 transition-colors relative"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span 
                  id="cart-badge-count"
                  className="absolute -top-2.5 -right-2.5 bg-[#ffe500] text-blue-900 font-extrabold text-[11px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow"
                >
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Cart</span>
          </button>
        </div>
      </div>
    </header>
  );
};
