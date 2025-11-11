import React, { useState, useEffect } from 'react';
import { CocktailFilter } from '../../types/cocktails.types';

interface CocktailFilterModalProps {
  isOpen: boolean;
  onFilterSelect: (filter: CocktailFilter) => void;
  onClose: () => void;
}

export const CocktailFilterModal: React.FC<CocktailFilterModalProps> = ({
  isOpen,
  onFilterSelect,
  onClose
}) => {
  const [selectedFilter, setSelectedFilter] = useState<CocktailFilter>('all');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const filterOptions = [
    {
      id: 'nossos_cocktails' as CocktailFilter,
      title: 'Nossos Cocktails',
      subtitle: 'Criações exclusivas Cais Nobre',
      icon: '🍸',
      gradient: 'from-blue-500 to-purple-600',
      description: 'Navegue pela nossa coleção assinada de cocktails únicos, inspirados nas rotas dos grandes descobridores portugueses.'
    },
    {
      id: 'descobrimentos_mensais' as CocktailFilter,
      title: 'Descobrimentos Mensais',
      subtitle: 'Novidades para explorar',
      icon: '🗺️',
      gradient: 'from-orange-500 to-red-600',
      description: 'Novas terras de sabor descobertas mensalmente. Cocktails sazonais e criações limitadas.'
    },
    {
      id: 'happy_cocktails' as CocktailFilter,
      title: 'Happy Cocktails',
      subtitle: 'Perfeitos para o pôr do sol',
      icon: '🌅',
      gradient: 'from-yellow-500 to-orange-600',
      description: 'Cocktails especialmente criados para acompanhar os nossos famosos sunsets no Douro.'
    }
  ];

  const handleFilterSelect = (filter: CocktailFilter) => {
    setSelectedFilter(filter);
    setTimeout(() => {
      onFilterSelect(filter);
      setIsAnimating(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className={`relative bg-white rounded-3xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-500 ${
        isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        {/* Header */}
        <div className="text-center mb-8">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all"
          >
            ×
          </button>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            🧭 Escolha Sua Jornada
          </h2>
          <p className="text-gray-600">
            Que tipo de experiência de cocktails você deseja explorar hoje?
          </p>
        </div>

        {/* Filter Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filterOptions.map((option, index) => (
            <div
              key={option.id}
              className={`relative cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => handleFilterSelect(option.id)}
            >
              <div className={`h-80 rounded-2xl bg-gradient-to-br ${option.gradient} p-6 text-white relative overflow-hidden group`}>
                {/* 3D Background Elements */}
                <div className="absolute top-4 right-4 text-6xl opacity-20 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  {option.icon}
                </div>
                <div className="absolute bottom-4 left-4 w-20 h-20 bg-white/10 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {option.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                    <p className="text-sm opacity-90 mb-4">{option.subtitle}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm opacity-80 mb-4 leading-relaxed">
                      {option.description}
                    </p>
                    <div className="bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm inline-block">
                      <span className="text-sm font-semibold">Explorar →</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => handleFilterSelect('all')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold transition-all duration-300"
          >
            Ver Todos os Cocktails
          </button>
        </div>
      </div>
    </div>
  );
};
