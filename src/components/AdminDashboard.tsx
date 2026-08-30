import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Coupon } from '../types';
import { 
  Store, 
  Package, 
  DollarSign, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  Tag, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  BarChart3, 
  ArrowLeft,
  X
} from 'lucide-react';

export const AdminDashboard: React.FC = React.memo(() => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    orders, 
    updateOrderStatus, 
    availableCoupons, 
    addNewCoupon, 
    deleteCoupon, 
    setActiveTab, 
    showToast 
  } = useStore();

  const [adminSection, setAdminSection] = useState<'products' | 'orders' | 'coupons'>('products');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New product form
  const [productForm, setProductForm] = useState({
    title: '',
    brand: '',
    category: 'electronics',
    price: 9999,
    originalPrice: 14999,
    discountPercentage: 33,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    description: '',
    stockCount: 50,
    isAssured: true,
  });

  // New coupon form
  const [couponForm, setCouponForm] = useState({
    code: '',
    discountPercent: 10,
    minOrderValue: 999,
    maxDiscount: 1000,
    description: '',
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'CANCELLED' ? o.totalAmount : 0), 0);

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title || !productForm.brand) {
      showToast('Please fill all mandatory product fields', 'error');
      return;
    }

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...productForm,
        discountPercentage: Math.round(((productForm.originalPrice - productForm.price) / productForm.originalPrice) * 100) || 0,
      });
      setEditingProduct(null);
    } else {
      addProduct({
        ...productForm,
        rating: 4.5,
        ratingCount: 1,
        reviewCount: 0,
        features: ['Genuine manufacturer warranty', 'Fast dispatch'],
        specifications: { 'Brand': productForm.brand, 'Category': productForm.category },
        inStock: true,
        seller: { name: 'SellerHub Official', rating: 4.8, responseTime: '1 hour' },
        discountPercentage: Math.round(((productForm.originalPrice - productForm.price) / productForm.originalPrice) * 100) || 0,
      });
    }

    setShowAddProductModal(false);
    setProductForm({
      title: '',
      brand: '',
      category: 'electronics',
      price: 9999,
      originalPrice: 14999,
      discountPercentage: 33,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      description: '',
      stockCount: 50,
      isAssured: true,
    });
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponForm.code) return;
    addNewCoupon({
      code: couponForm.code.toUpperCase(),
      discountPercent: couponForm.discountPercent,
      minOrderValue: couponForm.minOrderValue,
      maxDiscount: couponForm.maxDiscount,
      description: couponForm.description || `${couponForm.discountPercent}% Off on order above ₹${couponForm.minOrderValue}`,
      expiresAt: '2026-12-31',
    });
    setCouponForm({ code: '', discountPercent: 10, minOrderValue: 999, maxDiscount: 1000, description: '' });
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      title: p.title,
      brand: p.brand,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice,
      discountPercentage: p.discountPercentage,
      image: p.image,
      description: p.description,
      stockCount: p.stockCount,
      isAssured: p.isAssured,
    });
    setShowAddProductModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 space-y-6">
      {/* Header Bar */}
      <div className="bg-slate-900 text-white rounded-lg p-5 flex items-center justify-between flex-wrap gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <Store className="w-6 h-6 text-amber-400" />
            <h1 className="text-xl sm:text-2xl font-black tracking-wide">Flipkart Seller & Admin Portal</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Real-time catalog inventory, order fulfillment, and promotional coupon engine.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('store')}
          className="bg-[#2874f0] hover:bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded flex items-center gap-1.5 shadow"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Storefront
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded border border-gray-200 p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Gross Revenue</p>
            <h3 className="text-xl font-extrabold text-gray-900 mt-1">₹{totalRevenue.toLocaleString('en-IN')}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded border border-gray-200 p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Total Orders</p>
            <h3 className="text-xl font-extrabold text-gray-900 mt-1">{orders.length}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2874f0] flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded border border-gray-200 p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Catalog Products</p>
            <h3 className="text-xl font-extrabold text-gray-900 mt-1">{products.length}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded border border-gray-200 p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Active Coupons</p>
            <h3 className="text-xl font-extrabold text-gray-900 mt-1">{availableCoupons.length}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
            <Tag className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Section Selector Tabs */}
      <div className="bg-white rounded border border-gray-200 p-2 flex items-center gap-2 shadow-sm">
        <button
          onClick={() => setAdminSection('products')}
          className={`px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
            adminSection === 'products' ? 'bg-[#2874f0] text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Product Management ({products.length})
        </button>
        <button
          onClick={() => setAdminSection('orders')}
          className={`px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
            adminSection === 'orders' ? 'bg-[#2874f0] text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Orders & Fulfillment ({orders.length})
        </button>
        <button
          onClick={() => setAdminSection('coupons')}
          className={`px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
            adminSection === 'coupons' ? 'bg-[#2874f0] text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Promotional Coupons ({availableCoupons.length})
        </button>
      </div>

      {/* Section 1: Products Management */}
      {adminSection === 'products' && (
        <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden space-y-4 p-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-sm font-bold text-gray-900 uppercase">Product Catalog</h3>
            <button
              id="admin-add-product-btn"
              onClick={() => {
                setEditingProduct(null);
                setShowAddProductModal(true);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" /> Add New Product
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-gray-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Brand</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Assured</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="p-3 flex items-center gap-3">
                      <img src={p.image} alt="" className="w-8 h-8 object-contain rounded bg-gray-100 border p-0.5" />
                      <span className="font-semibold text-gray-900 max-w-xs truncate">{p.title}</span>
                    </td>
                    <td className="p-3 text-gray-600 uppercase font-medium">{p.category}</td>
                    <td className="p-3 font-semibold text-gray-800">{p.brand}</td>
                    <td className="p-3 font-bold text-gray-900">₹{p.price.toLocaleString('en-IN')}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold ${p.stockCount > 10 ? 'bg-green-100 text-green-800' : 'bg-rose-100 text-rose-800'}`}>
                        {p.stockCount} in stock
                      </span>
                    </td>
                    <td className="p-3">
                      {p.isAssured ? (
                        <span className="text-[10px] font-black italic text-[#2874f0] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                          Assured
                        </span>
                      ) : (
                        <span className="text-gray-400">Standard</span>
                      )}
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit Product"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Section 2: Orders & Fulfillment */}
      {adminSection === 'orders' && (
        <div className="bg-white rounded border border-gray-200 shadow-sm p-4 space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase">Customer Orders Status Management</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-gray-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Advance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50">
                    <td className="p-3 font-extrabold text-[#2874f0]">#{ord.id}</td>
                    <td className="p-3 text-gray-500">{ord.date}</td>
                    <td className="p-3">
                      <p className="font-bold text-gray-900">{ord.shippingAddress.name}</p>
                      <p className="text-[10px] text-gray-500">{ord.shippingAddress.city}</p>
                    </td>
                    <td className="p-3 font-bold text-gray-900">₹{ord.totalAmount.toLocaleString('en-IN')}</td>
                    <td className="p-3">
                      <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px]">
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                        className="bg-white border rounded p-1 text-xs font-semibold text-gray-800"
                      >
                        <option value="ORDERED">ORDERED</option>
                        <option value="PACKED">PACKED</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Section 3: Promotional Coupons */}
      {adminSection === 'coupons' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 bg-white rounded border border-gray-200 p-4 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-gray-900 uppercase">Create New Promo Code</h3>
            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Coupon Code (Uppercase)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FESTIVE20"
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                  className="w-full bg-white border rounded p-2 text-xs uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Discount %</label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={couponForm.discountPercent}
                    onChange={(e) => setCouponForm({ ...couponForm, discountPercent: Number(e.target.value) })}
                    className="w-full bg-white border rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Max Discount (₹)</label>
                  <input
                    type="number"
                    min="50"
                    value={couponForm.maxDiscount}
                    onChange={(e) => setCouponForm({ ...couponForm, maxDiscount: Number(e.target.value) })}
                    className="w-full bg-white border rounded p-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Min Order Value (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={couponForm.minOrderValue}
                  onChange={(e) => setCouponForm({ ...couponForm, minOrderValue: Number(e.target.value) })}
                  className="w-full bg-white border rounded p-2 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2874f0] text-white font-bold py-2 rounded text-xs uppercase"
              >
                Create Promo Code
              </button>
            </form>
          </div>

          <div className="md:col-span-7 bg-white rounded border border-gray-200 p-4 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-gray-900 uppercase">Active Promo Codes</h3>
            <div className="space-y-2">
              {availableCoupons.map((c) => (
                <div key={c.code} className="p-3 border rounded flex items-center justify-between bg-slate-50 text-xs">
                  <div>
                    <span className="font-extrabold text-[#2874f0] text-sm">{c.code}</span>
                    <p className="text-gray-600">{c.description}</p>
                    <p className="text-[10px] text-gray-400">Min Order: ₹{c.minOrderValue} | Max Cap: ₹{c.maxDiscount}</p>
                  </div>
                  <button
                    onClick={() => deleteCoupon(c.code)}
                    className="text-rose-600 hover:text-rose-800 p-1"
                    title="Delete Coupon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200 p-5 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-gray-900">
                {editingProduct ? 'Edit Catalog Product' : 'Add New Catalog Product'}
              </h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sony Wireless Earbuds"
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  className="w-full bg-white border rounded p-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sony"
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    className="w-full bg-white border rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-white border rounded p-2 text-xs"
                  >
                    <option value="mobiles">Mobiles</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="appliances">Appliances</option>
                    <option value="home">Home & Kitchen</option>
                    <option value="beauty">Beauty & Care</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full bg-white border rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full bg-white border rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Stock Count</label>
                  <input
                    type="number"
                    required
                    value={productForm.stockCount}
                    onChange={(e) => setProductForm({ ...productForm, stockCount: Number(e.target.value) })}
                    className="w-full bg-white border rounded p-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full bg-white border rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Key details..."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-white border rounded p-2 text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="modal-assured-checkbox"
                  checked={productForm.isAssured}
                  onChange={(e) => setProductForm({ ...productForm, isAssured: e.target.checked })}
                  className="w-4 h-4 text-[#2874f0]"
                />
                <label htmlFor="modal-assured-checkbox" className="text-xs font-bold text-gray-800">
                  Flipkart Assured Certification
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 border rounded text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#2874f0] text-white px-5 py-2 rounded text-xs font-bold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});
AdminDashboard.displayName = 'AdminDashboard';
