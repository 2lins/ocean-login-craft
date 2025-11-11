import React from 'react';
import { Visit } from '../../types/profile.types';

interface VisitHistoryProps {
  visits: Visit[];
}

export const VisitHistory: React.FC<VisitHistoryProps> = ({ visits }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Histórico de Visitas</h3>
          <p className="text-gray-600">Suas últimas navegações pelo Cais Nobre</p>
        </div>
        <div className="text-2xl">📖</div>
      </div>

      <div className="space-y-4">
        {visits.map((visit, index) => (
          <div 
            key={visit.id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            style={{ 
              animationDelay: `${index * 50}ms`,
              animation: 'slideIn 0.5s ease-out forwards'
            }}
          >
            {/* Date Circle */}
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex flex-col items-center justify-center text-white shadow-lg">
              <span className="text-xs font-semibold">
                {visit.date.toLocaleDateString('pt-PT', { month: 'short' }).toUpperCase()}
              </span>
              <span className="text-xl font-bold">
                {visit.date.getDate()}
              </span>
            </div>

            {/* Visit Details */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-gray-900">
                  {visit.eventAttended || 'Visita Regular'}
                </h4>
                <span className="text-orange-600 font-bold">+{visit.pointsEarned} pts</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>🍸 {visit.cocktailsOrdered.length} cocktails</span>
                <span>•</span>
                <span>⏱️ {Math.floor(visit.duration / 60)}h{visit.duration % 60}m</span>
                {visit.rating && (
                  <>
                    <span>•</span>
                    <span>⭐ {visit.rating}/5</span>
                  </>
                )}
              </div>

              {visit.cocktailsOrdered.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {visit.cocktailsOrdered.slice(0, 3).map((cocktail, i) => (
                    <span 
                      key={i}
                      className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full"
                    >
                      {cocktail}
                    </span>
                  ))}
                  {visit.cocktailsOrdered.length > 3 && (
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                      +{visit.cocktailsOrdered.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors">
        Ver Histórico Completo
      </button>
    </div>
  );
};
