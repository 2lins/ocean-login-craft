import React, { useState, useEffect, useRef } from 'react';
import { HappyHourEvent } from '../../types/sunset.types';

interface Carousel3DProps {
  events: HappyHourEvent[];
  onEventSelect: (event: HappyHourEvent) => void;
}

export const Carousel3D: React.FC<Carousel3DProps> = ({ events, onEventSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [dragStart, setDragStart] = useState({ x: 0, isDragging: false });
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, events.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart({ x: e.clientX, isDragging: true });
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStart.isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
      } else {
        setCurrentIndex((prev) => (prev + 1) % events.length);
      }
      setDragStart({ x: 0, isDragging: false });
    }
  };

  const handleMouseUp = () => {
    setDragStart({ x: 0, isDragging: false });
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const absDistance = Math.abs(diff);
    
    if (absDistance === 0) {
      return {
        transform: 'translateX(0) translateZ(0) rotateY(0deg) scale(1)',
        opacity: 1,
        zIndex: 10,
      };
    } else if (absDistance === 1) {
      const direction = diff > 0 ? 1 : -1;
      return {
        transform: `translateX(${direction * 280}px) translateZ(-200px) rotateY(${-direction * 25}deg) scale(0.85)`,
        opacity: 0.7,
        zIndex: 5,
      };
    } else if (absDistance === 2) {
      const direction = diff > 0 ? 1 : -1;
      return {
        transform: `translateX(${direction * 400}px) translateZ(-400px) rotateY(${-direction * 45}deg) scale(0.7)`,
        opacity: 0.4,
        zIndex: 1,
      };
    } else {
      return {
        transform: 'translateX(600px) translateZ(-600px) rotateY(-60deg) scale(0.5)',
        opacity: 0,
        zIndex: 0,
      };
    }
  };

  const getEventTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      sunset_session: '🌅',
      dj_night: '🎧',
      mixology_experience: '🍸',
      live_music: '🎵'
    };
    return icons[type] || '🎉';
  };

  const getEventTypeGradient = (type: string) => {
    const gradients: Record<string, string> = {
      sunset_session: 'from-orange-500 to-pink-600',
      dj_night: 'from-purple-500 to-indigo-600',
      mixology_experience: 'from-green-500 to-teal-600',
      live_music: 'from-red-500 to-pink-600'
    };
    return gradients[type] || 'from-blue-500 to-purple-600';
  };

  return (
    <div className="py-8 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center -mb-8">
          <div className="inline-block bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent text-lg font-semibold mb-4">
            PRÓXIMOS EVENTOS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Experiências Únicas
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Navegue pelos nossos eventos exclusivos e reserve sua mesa para uma jornada inesquecível
          </p>
        </div>

        {/* 3D Carousel */}
        <div className="relative h-[420px] flex items-center justify-center" style={{ perspective: '1000px' }}>
          <div
            ref={carouselRef}
            className="relative w-full h-full cursor-grab active:cursor-grabbing"
            style={{ transformStyle: 'preserve-3d' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {events.map((event, index) => {
              const style = getCardStyle(index);
              const isActive = index === currentIndex;
              
              return (
                <div
                  key={event.id}
                  className="absolute left-1/2 top-1/2 w-80 h-96 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
                  style={{ ...style, transformStyle: 'preserve-3d' }}
                  onClick={() => isActive && onEventSelect(event)}
                >
                  {/* Card Container */}
                  <div className={`w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-white transform transition-all duration-500 ${
                    isActive ? 'hover:scale-105' : ''
                  }`}>
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={event.thumbnail} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Type Badge */}
                      <div className={`absolute top-4 left-4 bg-gradient-to-r ${getEventTypeGradient(event.type)} rounded-full px-4 py-2 backdrop-blur-sm`}>
                        <span className="text-white text-sm font-bold flex items-center gap-2">
                          {getEventTypeIcon(event.type)}
                          {event.type.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>

                      {/* Discount Badge */}
                      {event.discountPercentage && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white rounded-full px-3 py-2 font-bold text-sm">
                          -{event.discountPercentage}%
                        </div>
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 bg-white">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {event.subtitle}
                      </p>

                      {/* Event Details */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {new Date(event.date).toLocaleDateString('pt-PT', {
                              day: 'numeric',
                              month: 'short'
                            })}
                          </p>
                          <p className="font-semibold text-gray-900">
                            {event.startTime}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">A partir de</p>
                          <p className="text-xl font-bold text-orange-600">
                            €{event.price}
                          </p>
                        </div>
                      </div>

                      {/* Action Button */}
                      {isActive && (
                        <button className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-3 rounded-xl font-bold hover:from-orange-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                          Ver Detalhes
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center space-x-6 mt-12">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)}
            className="w-12 h-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          >
            ←
          </button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-orange-400 scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              ></button>
            ))}
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % events.length)}
            className="w-12 h-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          >
            →
          </button>
        </div>

        {/* Auto-play Toggle */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-6 py-2 rounded-full border-2 font-medium transition-all duration-300 ${
              isAutoPlaying
                ? 'bg-orange-500 border-orange-500 text-white'
                : 'bg-transparent border-white/30 text-white hover:border-white/50'
            }`}
          >
            {isAutoPlaying ? 'Pausar Rotação' : 'Iniciar Rotação'}
          </button>
        </div>
      </div>
    </div>
  );
};
