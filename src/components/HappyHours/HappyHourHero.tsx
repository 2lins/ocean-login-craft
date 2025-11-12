import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HappyHourHeroProps, HappyHourSlide } from '@/types/happyhour.types';

const HappyHourHero: React.FC<HappyHourHeroProps> = ({ 
  slides, 
  autoPlay = true, 
  autoPlayInterval = 6000,
  onSaibaMais 
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const currentSlide: HappyHourSlide = slides[currentIndex];

  const nextSlide = useCallback((): void => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [slides.length, isTransitioning]);

  const prevSlide = useCallback((): void => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [slides.length, isTransitioning]);

  const goToSlide = (index: number): void => {
    if (index !== currentIndex && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const handleSaibaMais = (): void => {
    if (onSaibaMais) {
      onSaibaMais(currentSlide);
    } else {
      window.location.href = currentSlide.detailsUrl;
    }
  };

  // Auto-play effect
  useEffect(() => {
    if (!autoPlay || isHovered) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isHovered, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide]);

  return (
    <div 
      className="relative w-full h-[60vh] overflow-hidden rounded-2xl shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Slide */}
      <div className="relative w-full h-full">
        
        {/* Media Background */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}>
          {currentSlide.type === 'video' ? (
            <video 
              key={currentSlide.media}
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover"
              src={currentSlide.media}
            />
          ) : (
            <img 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              src={currentSlide.media}
              alt={currentSlide.title}
              loading="lazy"
            />
          )}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          
          {/* Title (optional, small) */}
          <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 opacity-90">
            {currentSlide.title}
          </h3>
          
          {/* Description */}
          <p className="text-white/90 text-sm md:text-base mb-6 max-w-2xl">
            {currentSlide.description}
          </p>
          
          {/* Saiba Mais Button */}
          <button 
            onClick={handleSaibaMais}
            className="group bg-white/90 backdrop-blur-sm text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-2xl border-2 border-white/20"
          >
            <span className="flex items-center space-x-2">
              <span>Saiba Mais</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </button>
          
          {/* Price (if available) */}
          {currentSlide.price && (
            <p className="text-white/80 text-sm mt-3 font-medium">
              {currentSlide.price}
            </p>
          )}
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all duration-200 disabled:opacity-50 z-10"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all duration-200 disabled:opacity-50 z-10"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      {/* Dots Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index: number) => (
          <button 
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/75 hover:scale-110'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default HappyHourHero;
