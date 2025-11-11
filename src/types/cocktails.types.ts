export interface Cocktail {
  id: string;
  name: string;
  description: string;
  story: string;
  historicalContext: string;
  ingredients: Ingredient[];
  price: number;
  alcoholPercentage: number;
  category: 'signature' | 'classic' | 'discovery' | 'happy_hour';
  difficulty: 'easy' | 'medium' | 'master';
  image: string;
  videoDemo?: string;
  mixologistNotes: string;
  garnish: string;
  glassType: string;
  preparationTime: number;
  isAvailable: boolean;
  isNew: boolean;
  isPopular: boolean;
  flavorProfile: FlavorProfile;
  recommendedTime: 'afternoon' | 'sunset' | 'night' | 'anytime';
  pairedEvents: string[];
}

export interface Ingredient {
  name: string;
  quantity: string;
  origin: string;
  description?: string;
}

export interface FlavorProfile {
  sweetness: number;
  sourness: number;
  bitterness: number;
  strength: number;
  complexity: number;
}

export type CocktailFilter = 'all' | 'nossos_cocktails' | 'descobrimentos_mensais' | 'happy_cocktails';
