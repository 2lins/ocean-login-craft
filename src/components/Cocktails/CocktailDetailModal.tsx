import React, { useState } from 'react';
import { Cocktail } from '../../types/cocktails.types';

interface CocktailDetailModalProps {
  cocktail: Cocktail;
  onClose: () => void;
}

export const CocktailDetailModal: React.FC<CocktailDetailModalProps> = ({ cocktail, onClose }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    console.log('Adding to cart:', cocktail.id, 'quantity:', quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header with Image/Video */}
        <div className="relative h-96">
          {!isVideoPlaying || !cocktail.videoDemo ? (
            <div 
              className="h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${cocktail.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              {cocktail.videoDemo && (
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all">
                    <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                  </div>
                </button>
              )}
            </div>
          ) : (
            <video 
              src={cocktail.videoDemo}
              className="w-full h-full object-cover"
              controls
              autoPlay
            />
          )}
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm text-white hover:bg-white/30 transition-all text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Title and Price */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{cocktail.name}</h1>
              <p className="text-lg text-gray-600">{cocktail.description}</p>
            </div>
            <div className="text-right ml-6">
              <p className="text-sm text-gray-500">Preço</p>
              <p className="text-4xl font-bold text-orange-600">€{cocktail.price}</p>
            </div>
          </div>

          {/* Story */}
          <div className="mb-6 p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📖 História do Cocktail</h3>
            <p className="text-gray-700 leading-relaxed mb-4">{cocktail.story}</p>
            <p className="text-sm text-gray-600 italic">{cocktail.historicalContext}</p>
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">🍹 Ingredientes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cocktail.ingredients.map((ingredient, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{ingredient.name}</p>
                    <p className="text-sm text-gray-600">{ingredient.quantity}</p>
                    <p className="text-xs text-gray-500 mt-1">Origem: {ingredient.origin}</p>
                    {ingredient.description && (
                      <p className="text-xs text-gray-600 mt-1">{ingredient.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flavor Profile */}
          <div className="mb-6 p-6 bg-gray-50 rounded-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4">🎨 Perfil de Sabor</h3>
            <div className="space-y-3">
              {Object.entries(cocktail.flavorProfile).map(([key, value]) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
                    <span className="text-sm text-gray-600">{value}/5</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-pink-600 transition-all duration-500"
                      style={{ width: `${value * 20}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mixologist Notes */}
          <div className="mb-6 p-6 bg-purple-50 rounded-2xl border-2 border-purple-200">
            <h3 className="text-lg font-bold text-purple-900 mb-3">👨‍🍳 Notas do Mixologista</h3>
            <p className="text-purple-800 leading-relaxed">{cocktail.mixologistNotes}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl mb-1">🥃</p>
              <p className="text-xs text-gray-500 mb-1">COPO</p>
              <p className="font-semibold text-gray-900 text-sm">{cocktail.glassType}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl mb-1">⏱️</p>
              <p className="text-xs text-gray-500 mb-1">PREPARO</p>
              <p className="font-semibold text-gray-900 text-sm">{cocktail.preparationTime} min</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl mb-1">💪</p>
              <p className="text-xs text-gray-500 mb-1">ÁLCOOL</p>
              <p className="font-semibold text-gray-900 text-sm">{cocktail.alcoholPercentage}%</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl mb-1">🌿</p>
              <p className="text-xs text-gray-500 mb-1">DECORAÇÃO</p>
              <p className="font-semibold text-gray-900 text-sm">{cocktail.garnish}</p>
            </div>
          </div>

          {/* Paired Events */}
          {cocktail.pairedEvents.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🎉 Perfeito Para</h3>
              <div className="flex flex-wrap gap-2">
                {cocktail.pairedEvents.map((event, index) => (
                  <span 
                    key={index}
                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {event}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <div className="flex gap-4">
            <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-white rounded-lg font-bold text-gray-700 hover:bg-gray-200 transition-colors"
              >
                −
              </button>
              <span className="text-xl font-bold text-gray-900 w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-white rounded-lg font-bold text-gray-700 hover:bg-gray-200 transition-colors"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!cocktail.isAvailable}
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cocktail.isAvailable ? `Adicionar ao Pedido • €${(cocktail.price * quantity).toFixed(2)}` : 'Indisponível'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
