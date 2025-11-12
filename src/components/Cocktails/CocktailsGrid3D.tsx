import { useState } from 'react';
import { Cocktail3D } from './Cocktail3D';
import { cocktailsData } from '../../data/cocktails';
import { Cocktail } from '../../types/cocktails.types';
import '../../styles/cocktails.css';

export const CocktailsGrid3D = () => {
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);

  const handleOrderClick = (cocktail: Cocktail) => {
    setSelectedCocktail(cocktail);
    alert(`Pedido: ${cocktail.name} - €${cocktail.price}`);
    // Aqui você pode integrar com seu sistema de pedidos
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 font-cinzel">
            Cocktails <span className="bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">3D</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-cormorant">
            Explore nossa carta de cocktails em uma experiência tridimensional única
          </p>
          <div className="mt-8 text-gray-400 text-sm">
            💡 Clique nos cards para ver detalhes e história de cada cocktail
          </div>
        </div>

        {/* Grid de Cocktails */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cocktailsData.map((cocktail) => (
            <Cocktail3D 
              key={cocktail.id}
              cocktail={cocktail}
              onOrderClick={handleOrderClick}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="inline-block glass-effect rounded-full px-6 py-3">
            <span className="text-white font-medium">
              🍸 {cocktailsData.length} Cocktails Disponíveis
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
