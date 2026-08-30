import React, { useState, useEffect, useCallback } from 'react';
import { PROMO_BANNERS } from '../data/mockData';
import { useStore } from '../context/StoreContext';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const BannerCarousel: React.FC = React.memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { setFilters, setActiveTab } = useStore();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % PROMO_BANNERS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + PROMO_BANNERS.length) % PROMO_BANNERS.length);
  }, []);

  // Auto-advance banner unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 4500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const banner = PROMO_BANNERS[currentSlide];

  const handleBannerClick = (cat: string) => {
    setFilters((prev) => ({ ...prev, category: cat, searchQuery: '' }));
    setActiveTab('store');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative max-w-7xl mx-auto px-2 sm:px-4 py-3">
      <div 
        id="hero-banner-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative overflow-hidden rounded-md shadow-md min-h-[160px] sm:min-h-[240px] md:min-h-[280px]"
      >
        <div className={`w-full h-full bg-gradient-to-r ${banner.bgColor} text-white flex flex-col md:flex-row items-center justify-between p-6 sm:p-10 transition-all duration-700`}>
          <div className="max-w-xl z-10 space-y-2 sm:space-y-3 text-center md:text-left">
            <span className="inline-flex items-center gap-1 bg-amber-400 text-blue-950 font-black text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded shadow-sm">
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
                type="button"
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
              loading="lazy"
              className="w-full h-32 sm:h-44 md:h-52 object-cover"
            />
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        <button
          type="button"
          id="banner-prev-btn"
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-r shadow-md backdrop-blur-xs transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          id="banner-next-btn"
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-l shadow-md backdrop-blur-xs transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {PROMO_BANNERS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                idx === currentSlide ? 'bg-amber-300 w-6' : 'bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
BannerCarousel.displayName = 'BannerCarousel';

