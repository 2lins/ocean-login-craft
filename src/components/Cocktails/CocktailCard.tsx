import React, { useState } from 'react';
import { Cocktail } from '../../types/cocktails.types';
import { CocktailDetailModal } from './CocktailDetailModal';

interface CocktailCardProps {
  cocktail: Cocktail;
  index: number;
  isVisible: boolean;
}

export const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail, index, isVisible }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'master': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'master': return 'Mestre';
      default: return difficulty;
    }
  };

  return (
    <>
      <div
        className={`h-full bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } ${isHovered ? 'scale-105' : 'scale-100'}`}
        style={{ transitionDelay: `${index * 100}ms` }}
        onClick={() => setShowDetail(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={cocktail.image} 
            alt={cocktail.name}
            className="w-full h-full object-cover transform transition-transform duration-500"
            style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {cocktail.isNew && (
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                NOVO
              </span>
            )}
            {cocktail.isPopular && (
              <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                🔥 POPULAR
              </span>
            )}
          </div>

          {/* Difficulty */}
          <div className="absolute top-4 right-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getDifficultyColor(cocktail.difficulty)}`}>
              {getDifficultyLabel(cocktail.difficulty)}
            </span>
          </div>

          {/* Availability */}
          {!cocktail.isAvailable && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Indisponível</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{cocktail.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{cocktail.description}</p>
            </div>
            <div className="ml-4 text-right">
              <p className="text-2xl font-bold text-orange-600">€{cocktail.price}</p>
            </div>
          </div>

          {/* Flavor Profile */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">PERFIL DE SABOR</p>
            <div className="grid grid-cols-5 gap-1">
              {Object.entries(cocktail.flavorProfile).map(([key, value]) => (
                <div key={key} className="flex flex-col items-center">
                  <div className="w-full h-12 bg-gray-100 rounded-sm overflow-hidden flex flex-col-reverse">
                    <div 
                      className="bg-gradient-to-t from-orange-500 to-orange-400 transition-all duration-500"
                      style={{ height: `${value * 20}%` }}
                    ></div>
                  </div>
                  <span className="text-[8px] text-gray-500 mt-1 uppercase">
                    {key.slice(0, 4)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              🥃 {cocktail.glassType}
            </span>
            <span className="flex items-center gap-1">
              ⏱️ {cocktail.preparationTime}min
            </span>
            <span className="flex items-center gap-1">
              💪 {cocktail.alcoholPercentage}%
            </span>
          </div>

          {/* Action Button */}
          <button className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-700 transition-all duration-300">
            Ver Detalhes 🍸
          </button>
        </div>
      </div>

      {showDetail && (
        <CocktailDetailModal 
          cocktail={cocktail} 
          onClose={() => setShowDetail(false)} 
        />
      )}
    </>
  );
};
