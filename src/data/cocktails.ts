import { Cocktail } from '../types/cocktails.types';

// Importe suas imagens
import cocktailRed from '../assets/cocktails/cocktail-red.png';
import cocktailYellow from '../assets/cocktails/cocktail-yellow.png';
import cocktailAmber from '../assets/cocktails/cocktail-amber.png';

export const cocktailsData: Cocktail[] = [
  {
    id: 'berry-sunset',
    name: 'Berry Sunset',
    description: 'Cocktail vibrante com frutas vermelhas frescas e vodka premium',
    story: 'Inspirado nos pores do sol do Douro, este cocktail combina frutas vermelhas locais com vodka premium, criando uma experiência única de sabores.',
    historicalContext: 'Criado especialmente para o Cais Nobre, celebrando as tradições marítimas portuguesas.',
    ingredients: [
      { name: 'Vodka Premium', quantity: '50ml', origin: 'Polônia' },
      { name: 'Sumo de Framboesa', quantity: '30ml', origin: 'Local' },
      { name: 'Sumo de Mirtilo', quantity: '20ml', origin: 'Local' },
      { name: 'Xarope de Açúcar', quantity: '15ml', origin: 'Artesanal' },
      { name: 'Gelo Picado', quantity: 'q.b.', origin: 'Filtrado' }
    ],
    price: 12,
    alcoholPercentage: 18,
    category: 'signature',
    difficulty: 'medium',
    image: cocktailRed,
    mixologistNotes: 'Servir bem gelado em taça cristal. As framboesas frescas devem ser maceradas levemente.',
    garnish: 'Framboesas e mirtilos frescos',
    glassType: 'Taça de cristal',
    preparationTime: 5,
    isAvailable: true,
    isNew: true,
    isPopular: true,
    flavorProfile: {
      sweetness: 7,
      sourness: 4,
      bitterness: 2,
      strength: 6,
      complexity: 7
    },
    recommendedTime: 'sunset',
    pairedEvents: ['Happy Hour', 'Eventos Especiais']
  },
  {
    id: 'golden-tropics',
    name: 'Golden Tropics',
    description: 'Tropical e refrescante com rum dourado e maracujá',
    story: 'Uma viagem aos trópicos portugueses, combinando rum envelhecido com frutas exóticas e toques de coco.',
    historicalContext: 'Homenagem às rotas das especiarias e às conquistas marítimas portuguesas.',
    ingredients: [
      { name: 'Rum Dourado', quantity: '50ml', origin: 'Madeira' },
      { name: 'Sumo de Maracujá', quantity: '40ml', origin: 'Brasil' },
      { name: 'Licor de Coco', quantity: '20ml', origin: 'Caribe' },
      { name: 'Lima Fresca', quantity: '1 unidade', origin: 'Local' },
      { name: 'Gelo em Cubos', quantity: 'q.b.', origin: 'Filtrado' }
    ],
    price: 14,
    alcoholPercentage: 20,
    category: 'signature',
    difficulty: 'easy',
    image: cocktailYellow,
    mixologistNotes: 'A lima deve ser espremida na hora. Agitar vigorosamente com gelo.',
    garnish: 'Meia casca de coco e palito decorativo',
    glassType: 'Copo alto',
    preparationTime: 4,
    isAvailable: true,
    isNew: false,
    isPopular: true,
    flavorProfile: {
      sweetness: 8,
      sourness: 5,
      bitterness: 1,
      strength: 7,
      complexity: 6
    },
    recommendedTime: 'afternoon',
    pairedEvents: ['Happy Hour', 'Brunch']
  },
  {
    id: 'amber-elegance',
    name: 'Amber Elegance',
    description: 'Sofisticado cocktail com champagne e frutas silvestres',
    story: 'Um cocktail nobre que celebra a elegância do champagne português com um toque de frutas silvestres da região.',
    historicalContext: 'Inspirado nos salões da nobreza portuguesa do século XIX.',
    ingredients: [
      { name: 'Champagne Português', quantity: '90ml', origin: 'Bairrada' },
      { name: 'Licor de Amora', quantity: '20ml', origin: 'Artesanal' },
      { name: 'Framboesa Fresca', quantity: '3 unidades', origin: 'Local' },
      { name: 'Amora Fresca', quantity: '2 unidades', origin: 'Local' },
      { name: 'Açúcar Mascavo', quantity: '1 colher', origin: 'Açores' }
    ],
    price: 16,
    alcoholPercentage: 15,
    category: 'signature',
    difficulty: 'master',
    image: cocktailAmber,
    mixologistNotes: 'O champagne deve estar bem gelado. Adicionar as frutas delicadamente para manter as bolhas.',
    garnish: 'Framboesa e amora no palito decorativo',
    glassType: 'Taça champagne elegante',
    preparationTime: 6,
    isAvailable: true,
    isNew: true,
    isPopular: false,
    flavorProfile: {
      sweetness: 6,
      sourness: 3,
      bitterness: 2,
      strength: 5,
      complexity: 8
    },
    recommendedTime: 'night',
    pairedEvents: ['Eventos Especiais', 'Jantares']
  }
];
