import { useState, useEffect } from 'react';
import { cocktailsData } from '@/data/cocktails';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CocktailHeroSession = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCocktail = () => {
    setCurrentIndex((prev) => (prev + 1) % cocktailsData.length);
  };

  const prevCocktail = () => {
    setCurrentIndex((prev) => (prev - 1 + cocktailsData.length) % cocktailsData.length);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextCocktail();
      if (e.key === 'ArrowLeft') prevCocktail();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-8 py-16">
      <div className="relative w-full max-w-4xl mx-auto">
        
        {/* Container do Cocktail */}
        <div className="relative flex items-center justify-center">
          
          {/* Seta Esquerda - DENTRO da imagem */}
          <button 
            onClick={prevCocktail}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300 shadow-lg hover:scale-110"
            aria-label="Cocktail anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          {/* Imagem do Cocktail - GRANDE E LIMPA */}
          <div className="w-96 h-96 relative rounded-3xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm">
            <img 
              src={cocktailsData[currentIndex].image}
              alt={cocktailsData[currentIndex].name}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
          
          {/* Seta Direita - DENTRO da imagem */}
          <button 
            onClick={nextCocktail}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300 shadow-lg hover:scale-110"
            aria-label="Próximo cocktail"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        {/* Informações MÍNIMAS embaixo */}
        <div className="text-center mt-8 space-y-4">
          <h2 className="text-3xl font-bold text-foreground font-cinzel transition-all duration-300">
            {cocktailsData[currentIndex].name}
          </h2>
          <p className="text-xl text-muted-foreground font-cormorant">
            €{cocktailsData[currentIndex].price}
          </p>
          
          {/* Dots indicators */}
          <div className="flex justify-center gap-2 pt-4">
            {cocktailsData.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex 
                    ? 'bg-foreground w-6 h-2' 
                    : 'bg-muted-foreground/40 w-2 h-2 hover:bg-muted-foreground/60'
                }`}
                aria-label={`Ir para cocktail ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
