import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Camera, Upload, X, Sparkles, Check, ArrowRight } from 'lucide-react';

const SAMPLE_SEARCH_IMAGES = [
  {
    name: 'Red Running Sneakers',
    category: 'fashion',
    keyword: 'shoe',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80',
  },
  {
    name: 'Smartphone Flagship',
    category: 'mobiles',
    keyword: 'phone',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300&auto=format&fit=crop&q=80',
  },
  {
    name: 'Over-Ear Headphones',
    category: 'electronics',
    keyword: 'headphone',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80',
  },
  {
    name: 'Smart Kitchen Appliance',
    category: 'appliances',
    keyword: 'fryer',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=300&auto=format&fit=crop&q=80',
  },
];

export const ImageSearchModal: React.FC = () => {
  const { isImageSearchOpen, setIsImageSearchOpen, products, setFilters, setActiveTab, setSelectedProduct } = useStore();
  const [selectedSample, setSelectedSample] = useState<typeof SAMPLE_SEARCH_IMAGES[0] | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  if (!isImageSearchOpen) return null;

  const handleSelectSample = (sample: typeof SAMPLE_SEARCH_IMAGES[0]) => {
    setSelectedSample(sample);
    setUploadedImage(sample.image);
    triggerSearchAnalysis(sample.keyword, sample.category);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        setSelectedSample(null);
        triggerSearchAnalysis('phone', 'mobiles');
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerSearchAnalysis = (keyword: string, category: string) => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setFilters((prev) => ({
        ...prev,
        category: category || 'all',
        searchQuery: keyword || '',
      }));
      setIsImageSearchOpen(false);
      setActiveTab('store');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="bg-white rounded-lg max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95">
        <div className="bg-[#2874f0] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-sm sm:text-base">Flipkart Visual Image Search</h3>
          </div>
          <button
            onClick={() => setIsImageSearchOpen(false)}
            className="text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs text-gray-600">
            Upload any product picture or click a sample image below to find visually identical and similar products in our catalog.
          </p>

          {/* Upload Area */}
          <label className="border-2 border-dashed border-blue-300 hover:border-[#2874f0] bg-blue-50/50 hover:bg-blue-50 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all">
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            <Upload className="w-8 h-8 text-[#2874f0] mb-2" />
            <span className="text-xs font-bold text-gray-800">Click or Drag & Drop Product Image</span>
            <span className="text-[10px] text-gray-400 mt-0.5">Supports JPG, PNG, WEBP</span>
          </label>

          {/* Sample Presets */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-700 block">Or try these sample products:</span>
            <div className="grid grid-cols-4 gap-2">
              {SAMPLE_SEARCH_IMAGES.map((sample, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectSample(sample)}
                  className={`border rounded p-1.5 cursor-pointer text-center group transition-all ${
                    selectedSample?.name === sample.name
                      ? 'border-[#2874f0] bg-blue-50 ring-2 ring-blue-300'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={sample.image} alt="" className="w-full h-14 object-cover rounded mb-1" />
                  <p className="text-[10px] font-semibold text-gray-700 truncate">{sample.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis State */}
          {analyzing && (
            <div className="bg-blue-50 border border-blue-200 rounded p-3 text-center space-y-2">
              <Sparkles className="w-6 h-6 text-[#2874f0] animate-spin mx-auto" />
              <p className="text-xs font-bold text-[#2874f0]">
                Scanning visual features and finding matched Flipkart products...
              </p>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-5 py-3 border-t text-right">
          <button
            onClick={() => setIsImageSearchOpen(false)}
            className="text-xs font-semibold text-gray-600 hover:text-gray-900 px-3 py-1.5"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
