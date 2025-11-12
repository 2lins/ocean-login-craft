import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Cocktail } from '@/types/cocktails.types';
import { cocktailsData } from '@/data/cocktails';

export const CocktailHeroSession = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const currentCocktail = cocktailsData[currentIndex];

  const nextCocktail = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('right');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cocktailsData.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevCocktail = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('left');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cocktailsData.length) % cocktailsData.length);
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevCocktail();
      if (e.key === 'ArrowRight') nextCocktail();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTransitioning]);

  const firstWord = currentCocktail.name.split(' ')[0];
  const restOfName = currentCocktail.name.split(' ').slice(1).join(' ');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 animate-float"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevCocktail}
        disabled={isTransitioning}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:scale-110 hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <button
        onClick={nextCocktail}
        disabled={isTransitioning}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:scale-110 hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-16 min-h-screen flex items-center">
        <div
          className={cn(
            "w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center transition-all duration-300",
            isTransitioning && (direction === 'right' ? 'opacity-0 translate-x-8' : 'opacity-0 -translate-x-8')
          )}
        >
          {/* Left Side - Cocktail Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Animated Rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 animate-ping opacity-20" style={{ width: '400px', height: '400px' }} />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 animate-pulse opacity-30" style={{ width: '400px', height: '400px' }} />
              
              {/* Main Image Container */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-pink-500/30 to-purple-500/30 animate-pulse" />
                <img
                  src={currentCocktail.image}
                  alt={currentCocktail.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Bubbles */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white/30 backdrop-blur-sm animate-bounce"
                    style={{
                      width: `${Math.random() * 30 + 10}px`,
                      height: `${Math.random() * 30 + 10}px`,
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 80 + 10}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${Math.random() * 2 + 1}s`
                    }}
                  />
                ))}
              </div>

              {/* Alcohol Badge */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full px-4 py-2 font-bold text-sm md:text-base shadow-lg">
                {currentCocktail.alcoholPercentage}% vol
              </div>
            </div>
          </div>

          {/* Right Side - Information */}
          <div className="space-y-4 md:space-y-6">
            {/* Badge */}
            <div className="inline-block">
              <span className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-xs md:text-sm font-bold tracking-wider">
                COCKTAIL ARTESANAL
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                {firstWord}
              </span>
              {restOfName && <span className="text-white"> {restOfName}</span>}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-300">
              {currentCocktail.description}
            </p>

            {/* Story Card */}
            <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3 text-orange-400">A História por Trás</h3>
              <p className="text-gray-300 leading-relaxed">{currentCocktail.story}</p>
            </div>

            {/* Ingredients Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {currentCocktail.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-center text-sm hover:bg-white/20 transition-all hover:scale-105"
                >
                  {ingredient.name}
                </div>
              ))}
            </div>

            {/* Price and CTA */}
            <div className="flex items-center gap-6 pt-4">
              <div className="text-5xl md:text-6xl font-bold text-orange-500">
                €{currentCocktail.price}
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Pedir Agora
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Indicators */}
      <div className="absolute bottom-8 right-8 flex flex-col items-end gap-4">
        {/* Dots */}
        <div className="flex gap-2">
          {cocktailsData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (index !== currentIndex && !isTransitioning) {
                  setIsTransitioning(true);
                  setDirection(index > currentIndex ? 'right' : 'left');
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsTransitioning(false);
                  }, 300);
                }
              }}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                index === currentIndex
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 w-8"
                  : "bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="text-sm text-gray-400 font-medium">
          {currentIndex + 1} de {cocktailsData.length}
        </div>
      </div>
    </div>
  );
};
