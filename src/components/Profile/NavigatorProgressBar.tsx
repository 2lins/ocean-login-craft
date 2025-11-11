import React, { useState, useEffect } from 'react';
import { UserProfile } from '../../types/profile.types';

interface NavigatorProgressBarProps {
  profile: UserProfile;
  isFixed?: boolean;
}

export const NavigatorProgressBar: React.FC<NavigatorProgressBarProps> = ({ 
  profile, 
  isFixed = false 
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const calculateProgress = () => {
    const currentLevelPoints = profile.totalPoints - profile.currentLevel.minPoints;
    const levelRange = profile.nextLevel.maxPoints - profile.currentLevel.minPoints;
    return Math.min((currentLevelPoints / levelRange) * 100, 100);
  };

  const progress = calculateProgress();

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 500);
    return () => clearTimeout(timer);
  }, [progress]);

  const getLevelGradient = (level: string) => {
    switch(level) {
      case 'Marinheiro': return 'from-blue-400 to-blue-600';
      case 'Capitão': return 'from-green-400 to-green-600';
      case 'Almirante': return 'from-purple-400 to-purple-600';
      case 'Grande Navegador': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getLevelIcon = (level: string) => {
    switch(level) {
      case 'Marinheiro': return '⚓';
      case 'Capitão': return '🚢';
      case 'Almirante': return '👑';
      case 'Grande Navegador': return '🌟';
      default: return '⭐';
    }
  };

  return (
    <div className={`${isFixed ? 'fixed top-4 left-4 right-4 z-40' : 'relative'} transition-all duration-500 ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
    }`}>
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/20">
        {/* Level Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getLevelGradient(profile.currentLevel.name)} flex items-center justify-center text-white text-xl shadow-lg`}>
              {getLevelIcon(profile.currentLevel.name)}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{profile.currentLevel.name}</h3>
              <p className="text-sm text-gray-600">
                {profile.totalPoints} / {profile.nextLevel.maxPoints} pontos
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Próximo nível</p>
            <p className="font-semibold text-gray-900 flex items-center gap-1">
              {getLevelIcon(profile.nextLevel.name)} {profile.nextLevel.name}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          {/* Background Track */}
          <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
          
          {/* Progress Fill */}
          <div 
            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getLevelGradient(profile.currentLevel.name)} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${animatedProgress}%` }}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>

          {/* Progress Glow */}
          <div 
            className="absolute top-0 right-0 w-2 h-full bg-white/50 rounded-full transform transition-all duration-1000"
            style={{ transform: `translateX(-${100 - animatedProgress}%)` }}
          ></div>
        </div>

        {/* Progress Details */}
        <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
          <span>{Math.round(progress)}% para o próximo nível</span>
          <span>{profile.nextLevel.maxPoints - profile.totalPoints} pontos restantes</span>
        </div>
      </div>
    </div>
  );
};
