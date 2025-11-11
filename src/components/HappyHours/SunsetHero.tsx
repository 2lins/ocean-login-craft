import React, { useState, useEffect } from 'react';
import { SunsetData } from '../../types/sunset.types';

interface SunsetHeroProps {
  sunsetData: SunsetData;
}

export const SunsetHero: React.FC<SunsetHeroProps> = ({ sunsetData }) => {
  const [timeUntilSunset, setTimeUntilSunset] = useState<string>('');

  useEffect(() => {
    const calculateTimeUntilSunset = () => {
      const now = new Date();
      const sunset = new Date(sunsetData.date);
      const [hours, minutes] = sunsetData.sunsetTime.split(':');
      sunset.setHours(parseInt(hours), parseInt(minutes));
      
      const diff = sunset.getTime() - now.getTime();
      const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeUntilSunset(`${hoursLeft}h ${minutesLeft}m`);
    };

    calculateTimeUntilSunset();
    const interval = setInterval(calculateTimeUntilSunset, 60000);
    return () => clearInterval(interval);
  }, [sunsetData]);

  const getQualityColor = (quality: string) => {
    switch(quality) {
      case 'spectacular': return 'from-orange-500 to-pink-600';
      case 'premium': return 'from-orange-400 to-red-500';
      case 'good': return 'from-yellow-400 to-orange-500';
      default: return 'from-muted to-muted-foreground';
    }
  };

  const getQualityEmoji = (quality: string) => {
    switch(quality) {
      case 'spectacular': return '🌅✨';
      case 'premium': return '🌅🔥';
      case 'good': return '🌅☀️';
      default: return '🌅☁️';
    }
  };

  return (
    <div className={`relative h-80 rounded-3xl bg-gradient-to-br ${getQualityColor(sunsetData.quality)} p-6 text-white overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/10"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-white/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
              <span className="text-sm font-medium">SUNSET HOJE</span>
            </div>
            <div className="text-2xl">{getQualityEmoji(sunsetData.quality)}</div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2 font-cinzel">
            Sunset {sunsetData.quality === 'spectacular' ? 'Espetacular' : 'Premium'}
          </h1>
          <p className="text-lg opacity-90">
            {sunsetData.sunsetTime} • {sunsetData.temperature}°C • {sunsetData.recommendation}
          </p>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm opacity-80 mb-1">TEMPO RESTANTE</p>
            <p className="text-2xl font-bold">{timeUntilSunset}</p>
          </div>
          
          <button className="bg-white text-foreground px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
            Reservar Mesa 🍸
          </button>
        </div>
      </div>
    </div>
  );
};
