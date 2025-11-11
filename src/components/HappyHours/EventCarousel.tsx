import React, { useState } from 'react';
import { HappyHourEvent } from '../../types/sunset.types';
import { EventModal } from './EventModal';

interface EventCarouselProps {
  events: HappyHourEvent[];
}

export const EventCarousel: React.FC<EventCarouselProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<HappyHourEvent | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const getEventIcon = (type: string) => {
    switch(type) {
      case 'sunset_session': return '🌅';
      case 'dj_night': return '🎧';
      case 'mixology_experience': return '🍸';
      case 'live_music': return '🎵';
      default: return '🎉';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch(type) {
      case 'sunset_session': return 'Sunset Session';
      case 'dj_night': return 'DJ Night';
      case 'mixology_experience': return 'Mixology Experience';
      case 'live_music': return 'Live Music';
      default: return 'Evento Especial';
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground font-cinzel">Próximos Eventos</h2>
        <div className="flex gap-2">
          <button 
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          >
            ←
          </button>
          <button 
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out gap-4"
          style={{ transform: `translateX(-${currentIndex * 320}px)` }}
        >
          {events.map((event) => (
            <div 
              key={event.id}
              className="min-w-[300px] bg-card rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="relative h-48">
                <img 
                  src={event.thumbnail} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-background/90 rounded-full px-3 py-1 backdrop-blur-sm">
                  <span className="text-sm font-medium flex items-center gap-1">
                    {getEventIcon(event.type)} {getEventTypeLabel(event.type)}
                  </span>
                </div>
                {event.discountPercentage && (
                  <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground rounded-full px-3 py-1">
                    <span className="text-sm font-bold">-{event.discountPercentage}%</span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 font-cinzel">{event.title}</h3>
                <p className="text-muted-foreground mb-4">{event.subtitle}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('pt-PT', { 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {event.startTime} - {event.endTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">A partir de</p>
                    <p className="text-xl font-bold text-primary">
                      €{event.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-muted-foreground">
                      {event.capacity - event.currentBookings} lugares disponíveis
                    </span>
                  </div>
                  <span className="text-primary font-semibold text-sm">
                    Ver mais →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </div>
  );
};
