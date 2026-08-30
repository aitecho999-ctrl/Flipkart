import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { useStore } from '../context/StoreContext';

export const CategoryBar: React.FC = React.memo(() => {
  const { filters, setFilters, setActiveTab } = useStore();

  const handleSelectCategory = (catId: string) => {
    setFilters((prev) => ({
      ...prev,
      category: catId,
      searchQuery: '', // clear search to focus on selected category
    }));
    setActiveTab('store');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white shadow-xs border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between sm:justify-center gap-4 sm:gap-10 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                id={`category-item-${cat.id}`}
                onClick={() => handleSelectCategory(cat.id)}
                className={`flex flex-col items-center gap-1 min-w-[65px] group cursor-pointer transition-all ${
                  isSelected ? 'scale-105' : 'opacity-85 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full overflow-hidden p-0.5 border-2 transition-all shadow-xs ${
                    isSelected ? 'border-[#2874f0] bg-blue-50' : 'border-gray-200 group-hover:border-[#2874f0]'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span
                  className={`text-[12px] font-semibold tracking-tight whitespace-nowrap ${
                    isSelected ? 'text-[#2874f0]' : 'text-gray-700 group-hover:text-[#2874f0]'
                  }`}
                >
                  {cat.name}
                </span>
                {isSelected && (
                  <div className="w-6 h-0.5 bg-[#2874f0] rounded-full mt-0.5 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});
CategoryBar.displayName = 'CategoryBar';

