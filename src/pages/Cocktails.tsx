import React, { useState } from 'react';
import { CocktailFilterModal } from '../components/Cocktails/CocktailFilterModal';
import { CocktailGrid } from '../components/Cocktails/CocktailGrid';
import { Cocktail, CocktailFilter } from '../types/cocktails.types';

const Cocktails = () => {
  const [showFilterModal, setShowFilterModal] = useState(true);
  const [currentFilter, setCurrentFilter] = useState<CocktailFilter>('all');

  // Mock data - replace with actual data from API/database
  const mockCocktails: Cocktail[] = [
    {
      id: '1',
      name: 'Rota das Índias',
      description: 'Um cocktail exótico com especiarias do Oriente',
      story: 'Inspirado nas grandes navegações portuguesas às Índias, este cocktail combina rum envelhecido com especiarias exóticas trazidas das rotas comerciais.',
      historicalContext: 'As rotas marítimas para as Índias foram estabelecidas por Vasco da Gama em 1498, abrindo caminho para o comércio de especiarias.',
      ingredients: [
        { name: 'Rum Envelhecido', quantity: '60ml', origin: 'Madeira, Portugal' },
        { name: 'Xarope de Canela', quantity: '20ml', origin: 'Ceilão' },
        { name: 'Sumo de Limão', quantity: '15ml', origin: 'Douro' },
        { name: 'Cardamomo', quantity: '2 pods', origin: 'Índia' }
      ],
      price: 12.50,
      alcoholPercentage: 18,
      category: 'signature',
      difficulty: 'medium',
      image: '/api/placeholder/400/600',
      mixologistNotes: 'Misture delicadamente para preservar os aromas das especiarias. Sirva com gelo grande para diluição controlada.',
      garnish: 'Pau de canela e estrela de anis',
      glassType: 'Old Fashioned',
      preparationTime: 5,
      isAvailable: true,
      isNew: true,
      isPopular: true,
      flavorProfile: {
        sweetness: 3,
        sourness: 2,
        bitterness: 1,
        strength: 4,
        complexity: 5
      },
      recommendedTime: 'night',
      pairedEvents: ['Sunset Session', 'DJ Night']
    },
    {
      id: '2',
      name: 'Sunset no Douro',
      description: 'Perfeito para acompanhar o pôr do sol',
      story: 'Criado especialmente para as nossas sessões de sunset, este cocktail captura as cores e sabores do Douro ao entardecer.',
      historicalContext: 'O vale do Douro é Património Mundial da UNESCO desde 2001, famoso pelos seus vinhos e paisagens deslumbrantes.',
      ingredients: [
        { name: 'Vinho do Porto Branco', quantity: '50ml', origin: 'Douro' },
        { name: 'Gin', quantity: '30ml', origin: 'Porto' },
        { name: 'Água Tónica', quantity: '100ml', origin: 'Portugal' },
        { name: 'Laranja', quantity: '1 fatia', origin: 'Algarve' }
      ],
      price: 10.00,
      alcoholPercentage: 12,
      category: 'happy_hour',
      difficulty: 'easy',
      image: '/api/placeholder/400/600',
      mixologistNotes: 'A combinação do Porto Branco com gin cria um equilíbrio perfeito entre doçura e frescura.',
      garnish: 'Fatia de laranja e alecrim',
      glassType: 'Highball',
      preparationTime: 3,
      isAvailable: true,
      isNew: false,
      isPopular: true,
      flavorProfile: {
        sweetness: 4,
        sourness: 2,
        bitterness: 2,
        strength: 3,
        complexity: 3
      },
      recommendedTime: 'sunset',
      pairedEvents: ['Sunset Session', 'Happy Hours']
    },
    {
      id: '3',
      name: 'Descobrimento de Abril',
      description: 'Cocktail sazonal de primavera',
      story: 'Cada mês trazemos um novo descobrimento. Abril celebra a chegada da primavera com ingredientes frescos e florais.',
      historicalContext: 'O mês de abril marca o início da época das navegações na Era dos Descobrimentos.',
      ingredients: [
        { name: 'Vodka', quantity: '45ml', origin: 'Rússia' },
        { name: 'Licor de Flor de Sabugueiro', quantity: '20ml', origin: 'Portugal' },
        { name: 'Prosecco', quantity: '60ml', origin: 'Itália' },
        { name: 'Pétalas de Rosa', quantity: '3 unidades', origin: 'Douro' }
      ],
      price: 11.50,
      alcoholPercentage: 15,
      category: 'discovery',
      difficulty: 'easy',
      image: '/api/placeholder/400/600',
      videoDemo: '/videos/cocktail-demo.mp4',
      mixologistNotes: 'Use prosecco bem gelado e adicione as pétalas no último momento para manter sua frescura.',
      garnish: 'Pétalas de rosa comestíveis',
      glassType: 'Taça Champagne',
      preparationTime: 4,
      isAvailable: true,
      isNew: true,
      isPopular: false,
      flavorProfile: {
        sweetness: 4,
        sourness: 1,
        bitterness: 0,
        strength: 3,
        complexity: 4
      },
      recommendedTime: 'afternoon',
      pairedEvents: ['Mixology Experience']
    }
  ];

  const handleFilterSelect = (filter: CocktailFilter) => {
    setCurrentFilter(filter);
    setShowFilterModal(false);
  };

  return (
    <div className="min-h-screen">
      {/* Filter Button - Fixed position */}
      {!showFilterModal && (
        <button
          onClick={() => setShowFilterModal(true)}
          className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-orange-500 to-pink-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-300"
        >
          🧭
        </button>
      )}

      {/* Filter Modal */}
      <CocktailFilterModal
        isOpen={showFilterModal}
        onFilterSelect={handleFilterSelect}
        onClose={() => setShowFilterModal(false)}
      />

      {/* Cocktail Grid */}
      {!showFilterModal && (
        <CocktailGrid 
          cocktails={mockCocktails} 
          filter={currentFilter}
        />
      )}
    </div>
  );
};

export default Cocktails;
