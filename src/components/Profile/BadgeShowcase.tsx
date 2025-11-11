import React, { useState } from 'react';
import { Badge } from '../../types/profile.types';

interface BadgeShowcaseProps {
  badges: Badge[];
}

export const BadgeShowcase: React.FC<BadgeShowcaseProps> = ({ badges }) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch(rarity) {
      case 'legendary': return 'Lendário';
      case 'epic': return 'Épico';
      case 'rare': return 'Raro';
      default: return 'Comum';
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Insígnias Conquistadas</h3>
            <p className="text-gray-600">{badges.length} conquistas desbloqueadas</p>
          </div>
          <div className="text-2xl">🏆</div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <button
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className="group relative"
            >
              <div 
                className={`aspect-square rounded-2xl bg-gradient-to-br ${getRarityColor(badge.rarity)} p-1 transform transition-all duration-300 hover:scale-110 hover:rotate-6`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeIn 0.5s ease-out forwards'
                }}
              >
                <div className="w-full h-full bg-white rounded-xl flex items-center justify-center text-4xl">
                  {badge.icon}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                <p className="text-white text-xs font-semibold">{badge.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedBadge(null)}
        >
          <div 
            className="bg-white rounded-3xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className={`w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${getRarityColor(selectedBadge.rarity)} p-1`}>
                <div className="w-full h-full bg-white rounded-xl flex items-center justify-center text-5xl">
                  {selectedBadge.icon}
                </div>
              </div>
              
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getRarityColor(selectedBadge.rarity)} mb-3`}>
                {getRarityLabel(selectedBadge.rarity)}
              </span>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedBadge.name}</h3>
              <p className="text-gray-600 mb-4">{selectedBadge.description}</p>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-600">Conquistada em</p>
                <p className="font-semibold text-gray-900">
                  {selectedBadge.earnedAt.toLocaleDateString('pt-PT', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>

              <button 
                onClick={() => setSelectedBadge(null)}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-700 transition-all"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
