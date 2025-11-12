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
  return <div className="relative min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        

        {/* Grid de Cocktails */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cocktailsData.map(cocktail => <Cocktail3D key={cocktail.id} cocktail={cocktail} onOrderClick={handleOrderClick} />)}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="inline-block glass-effect rounded-full px-6 py-3">
            <span className="text-foreground font-medium">
              🍸 {cocktailsData.length} Cocktails Disponíveis
            </span>
          </div>
        </div>
      </div>
    </div>;
};