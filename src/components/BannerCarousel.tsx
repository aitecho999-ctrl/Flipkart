import React, { useState, useEffect } from 'react';
import { PROMO_BANNERS } from '../data/mockData';
import { useStore } from '../context/StoreContext';
import { ChevronLeft, ChevronRight, Sparkles, Timer } from 'lucide-react';

export const BannerCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setFilters, setActiveTab } = useStore();

  // Auto-advance banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PROMO_BANNERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % PROMO_BANNERS.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + PROMO_BANNERS.length) % PROMO_BANNERS.length);

  const banner = PROMO_BANNERS[currentSlide];

  const handleBannerClick = (cat: string) => {
    setFilters((prev) => ({ ...prev, category: cat }));
    setActiveTab('store');
  };

  return (
    <div className="relative max-w-7xl mx-auto px-2 sm:px-4 py-3">
      <div 
        id="hero-banner-carousel"
        className="relative overflow-hidden rounded-md shadow-md min-h-[160px] sm:min-h-[240px] md:min-h-[280px]"
      >
        <div className={`w-full h-full bg-gradient-to-r ${banner.bgColor} text-white flex flex-col md:flex-row items-center justify-between p-6 sm:p-10 transition-all duration-700`}>
          <div className="max-w-xl z-10 space-y-2 sm:space-y-3 text-center md:text-left">
            <span className="inline-flex items-center gap-1 bg-amber-400 text-blue-950 font-black text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded shadow">
              <Sparkles className="w-3 h-3" /> {banner.tag}
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              {banner.title}
            </h2>
            <p className="text-xs sm:text-base text-slate-100 font-medium line-clamp-2">
              {banner.subtitle}
            </p>
            <div className="pt-1">
              <button
                id={`banner-cta-${banner.id}`}
                onClick={() => handleBannerClick(banner.category)}
                className="bg-[#ffe500] hover:bg-yellow-400 text-blue-950 font-extrabold px-5 py-2 rounded text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>{banner.cta}</span>
              </button>
            </div>
          </div>

          <div className="mt-4 md:mt-0 max-w-xs md:max-w-sm rounded-lg overflow-hidden shadow-2xl border-2 border-white/20">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-32 sm:h-44 md:h-52 object-cover"
            />
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        <button
          id="banner-prev-btn"
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-r shadow-md backdrop-blur-sm transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          id="banner-next-btn"
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-l shadow-md backdrop-blur-sm transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {PROMO_BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentSlide ? 'bg-amber-300 w-6' : 'bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
