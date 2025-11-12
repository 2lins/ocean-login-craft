import { useState } from 'react';
import { Cocktail } from '../../types/cocktails.types';

interface Cocktail3DProps {
  cocktail: Cocktail;
  onOrderClick: (cocktail: Cocktail) => void;
}

export const Cocktail3D = ({ cocktail, onOrderClick }: Cocktail3DProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="perspective-1000 w-80 h-96 mx-auto">
      <div 
        className={`relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* ===== FRENTE DO CARD ===== */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className={`
            relative w-full h-full rounded-2xl overflow-hidden shadow-2xl
            bg-gradient-to-br from-gray-900 via-gray-800 to-black
            cocktail-card-3d animate-glow
            ${isHovered ? 'scale-105' : ''}
          `}>
            
            {/* Imagem do Cocktail */}
            <div className="relative h-64 overflow-hidden shimmer">
              <img 
                src={cocktail.image} 
                alt={cocktail.name}
                className="w-full h-full object-contain transition-transform duration-500 bg-gradient-to-b from-transparent to-black/20"
                style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
              />
              
              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/10"></div>
              
              {/* Partículas flutuantes */}
              <div className="absolute inset-0">
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={i}
                    className="particle animate-float"
                    style={{
                      left: `${20 + i * 12}%`,
                      top: `${30 + (i % 3) * 15}%`,
                      animationDelay: `${i * 0.8}s`,
                      animationDuration: `${3 + (i % 2)}s`
                    }}
                  ></div>
                ))}
              </div>

              {/* Badge de álcool */}
              <div className="absolute top-4 right-4 glass-effect rounded-full px-3 py-1">
                <span className="text-white text-sm font-bold">
                  {cocktail.alcoholPercentage}% vol
                </span>
              </div>
            </div>
            
            {/* Conteúdo da frente */}
            <div className="p-6 text-white relative">
              <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
                {cocktail.name}
              </h3>
              
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {cocktail.description}
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-orange-400">
                  €{cocktail.price}
                </span>
                
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-1">Clique para detalhes</p>
                  <div className="w-8 h-8 glass-effect rounded-full flex items-center justify-center">
                    <span className="text-orange-400">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== VERSO DO CARD ===== */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-orange-600 via-pink-600 to-purple-700 p-6 text-white">
            
            {/* Header do verso */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">{cocktail.name}</h3>
              <div className="w-16 h-1 bg-white/50 mx-auto rounded-full"></div>
            </div>
            
            {/* História do cocktail */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2 flex items-center">
                <span className="mr-2">📜</span> História
              </h4>
              <p className="text-sm text-white/90 leading-relaxed">
                {cocktail.story}
              </p>
            </div>
            
            {/* Ingredientes */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 flex items-center">
                <span className="mr-2">🍸</span> Ingredientes
              </h4>
              <div className="space-y-2">
                {cocktail.ingredients.slice(0, 4).map((ingredient, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></div>
                    <span>{ingredient.name}</span>
                  </div>
                ))}
                {cocktail.ingredients.length > 4 && (
                  <div className="text-xs text-white/70 ml-5">
                    +{cocktail.ingredients.length - 4} mais ingredientes...
                  </div>
                )}
              </div>
            </div>
            
            {/* Botão de pedido */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onOrderClick(cocktail);
              }}
              className="w-full glass-effect rounded-xl py-3 font-bold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              🚢 Pedir Agora - €{cocktail.price}
            </button>
            
            {/* Botão para voltar */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              className="w-full mt-3 text-white/70 text-sm hover:text-white transition-colors"
            >
              ← Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
