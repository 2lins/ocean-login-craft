import React from 'react';
import { Achievement } from '../../types/profile.types';

interface AchievementGridProps {
  achievements: Achievement[];
}

export const AchievementGrid: React.FC<AchievementGridProps> = ({ achievements }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Missões & Conquistas</h3>
          <p className="text-gray-600">
            {achievements.filter(a => a.isCompleted).length} de {achievements.length} concluídas
          </p>
        </div>
        <div className="text-2xl">🎯</div>
      </div>

      <div className="space-y-4">
        {achievements.map((achievement, index) => {
          const progressPercentage = (achievement.progress / achievement.target) * 100;

          return (
            <div 
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all duration-500 ${
                achievement.isCompleted 
                  ? 'bg-green-50 border-green-500' 
                  : 'bg-gray-50 border-gray-200'
              }`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                animation: 'fadeIn 0.5s ease-out forwards'
              }}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                  achievement.isCompleted 
                    ? 'bg-green-500 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {achievement.isCompleted ? '✓' : achievement.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    {achievement.isCompleted && (
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-semibold">
                        Completa
                      </span>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {!achievement.isCompleted && (
                    <>
                      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                        <div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-pink-600 rounded-full transition-all duration-1000"
                          style={{ width: `${progressPercentage}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{achievement.progress} / {achievement.target}</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                    </>
                  )}

                  {/* Reward */}
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <span className="text-yellow-600">🎁</span>
                    <span className="text-gray-700 font-medium">{achievement.reward}</span>
                  </div>

                  {achievement.unlockedAt && (
                    <p className="text-xs text-gray-500 mt-2">
                      Desbloqueada em {achievement.unlockedAt.toLocaleDateString('pt-PT')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
