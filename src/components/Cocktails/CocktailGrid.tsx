import React, { useState, useEffect } from 'react';
import { Cocktail, CocktailFilter } from '../../types/cocktails.types';
import { CocktailCard } from './CocktailCard';

interface CocktailGridProps {
  cocktails: Cocktail[];
  filter: CocktailFilter;
}

export const CocktailGrid: React.FC<CocktailGridProps> = ({ cocktails, filter }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredCocktails, setFilteredCocktails] = useState<Cocktail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    const filterCocktails = () => {
      let filtered: Cocktail[] = [];
      
      switch(filter) {
        case 'nossos_cocktails':
          filtered = cocktails.filter(c => c.category === 'signature' || c.category === 'classic');
          break;
        case 'descobrimentos_mensais':
          filtered = cocktails.filter(c => c.category === 'discovery' || c.isNew);
          break;
        case 'happy_cocktails':
          filtered = cocktails.filter(c => c.category === 'happy_hour' || c.recommendedTime === 'sunset');
          break;
        default:
          filtered = cocktails;
      }
      
      setFilteredCocktails(filtered);
      setCurrentIndex(0);
      setIsLoading(false);
    };

    const timer = setTimeout(filterCocktails, 300);
    return () => clearTimeout(timer);
  }, [cocktails, filter]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, filteredCocktails.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, filteredCocktails.length - 2)) % Math.max(1, filteredCocktails.length - 2));
  };

  const getFilterTitle = (filter: CocktailFilter) => {
    switch(filter) {
      case 'nossos_cocktails': return 'Nossos Cocktails';
      case 'descobrimentos_mensais': return 'Descobrimentos Mensais';
      case 'happy_cocktails': return 'Happy Cocktails';
      default: return 'Todos os Cocktails';
    }
  };

  const getFilterSubtitle = (filter: CocktailFilter) => {
    switch(filter) {
      case 'nossos_cocktails': return 'Criações exclusivas dos nossos mixologistas';
      case 'descobrimentos_mensais': return 'Novas rotas de sabor para explorar';
      case 'happy_cocktails': return 'Perfeitos para acompanhar o pôr do sol';
      default: return 'Explore toda nossa carta de cocktails';
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Preparando cocktails...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 p-6 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{getFilterTitle(filter)}</h1>
            <p className="text-gray-600">{getFilterSubtitle(filter)}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {filteredCocktails.length} cocktails
            </span>
            <div className="flex gap-2 ml-4">
              <button 
                onClick={prevSlide}
                disabled={filteredCocktails.length <= 3}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                ←
              </button>
              <button 
                onClick={nextSlide}
                disabled={filteredCocktails.length <= 3}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cocktail Grid */}
      <div className="flex-1 p-6 overflow-hidden">
        <div className="h-full">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full gap-6"
            style={{ 
              transform: `translateX(-${currentIndex * 33.333}%)`,
              width: `${Math.max(100, (filteredCocktails.length / 3) * 100)}%`
            }}
          >
            {filteredCocktails.map((cocktail, index) => (
              <div 
                key={cocktail.id}
                className="w-1/3 flex-shrink-0"
              >
                <CocktailCard 
                  cocktail={cocktail} 
                  index={index}
                  isVisible={index >= currentIndex && index < currentIndex + 3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex-shrink-0 p-6 bg-white border-t">
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: Math.max(1, Math.ceil((filteredCocktails.length - 2) / 1)) }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === i 
                  ? 'bg-orange-500 w-6' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
