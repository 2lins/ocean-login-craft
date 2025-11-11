import React, { useState } from 'react';
import { HappyHourEvent } from '../../types/sunset.types';

interface EventModalProps {
  event: HappyHourEvent;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const getEventIcon = (type: string) => {
    switch(type) {
      case 'sunset_session': return '🌅';
      case 'dj_night': return '🎧';
      case 'mixology_experience': return '🍸';
      case 'live_music': return '🎵';
      default: return '🎉';
    }
  };

  const handleReservation = () => {
    console.log('Reservando evento:', event.id);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          {!isVideoPlaying ? (
            <div 
              className="h-64 bg-cover bg-center rounded-t-3xl relative cursor-pointer group"
              style={{ backgroundImage: `url(${event.thumbnail})` }}
              onClick={() => setIsVideoPlaying(true)}
            >
              <div className="absolute inset-0 bg-black/30 rounded-t-3xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all">
                  <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 rounded-t-3xl overflow-hidden">
              <video 
                src={event.videoUrl}
                className="w-full h-full object-cover"
                controls
                autoPlay
              />
            </div>
          )}
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm text-white hover:bg-white/30 transition-all text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{getEventIcon(event.type)}</span>
                <span className="text-sm text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">
                  {event.type.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-1 font-cinzel">{event.title}</h2>
              <p className="text-lg text-muted-foreground">{event.subtitle}</p>
            </div>
            {event.discountPercentage && (
              <div className="bg-destructive text-destructive-foreground px-4 py-2 rounded-full">
                <span className="font-bold">-{event.discountPercentage}% OFF</span>
              </div>
            )}
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-secondary rounded-2xl">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Data</p>
              <p className="font-semibold text-foreground">
                {new Date(event.date).toLocaleDateString('pt-PT', { 
                  weekday: 'long',
                  day: 'numeric', 
                  month: 'long'
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Horário</p>
              <p className="font-semibold text-foreground">{event.startTime} - {event.endTime}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Lugares</p>
              <p className="font-semibold text-foreground">
                {event.capacity - event.currentBookings} disponíveis
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Preço</p>
              <p className="text-xl font-bold text-primary">€{event.price}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 font-cinzel">Sobre o Evento</h3>
            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          </div>

          {/* Special Offer */}
          <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl p-4 mb-6 text-white">
            <h3 className="text-lg font-semibold mb-2">🎁 Oferta Especial</h3>
            <p>{event.specialOffer}</p>
          </div>

          {/* Cocktail Pairing */}
          {event.cocktailPairing.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3 font-cinzel">🍸 Cocktails Recomendados</h3>
              <div className="flex flex-wrap gap-2">
                {event.cocktailPairing.map((cocktail, index) => (
                  <span 
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {cocktail}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* DJ Info */}
          {event.djName && (
            <div className="mb-6 p-4 bg-accent rounded-2xl">
              <h3 className="text-lg font-semibold text-foreground mb-2 font-cinzel">🎧 DJ da Noite</h3>
              <p className="text-accent-foreground font-medium">{event.djName}</p>
            </div>
          )}

          {/* Reservation Button */}
          <div className="flex gap-4">
            <button 
              onClick={handleReservation}
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              🚢 Embarcar Nesta Experiência
            </button>
            <button 
              className="px-6 py-4 border-2 border-border rounded-2xl font-semibold text-foreground hover:border-primary hover:text-primary transition-all"
            >
              💫 Favorito
            </button>
          </div>

          {/* Weather Warning */}
          {event.weatherDependent && (
            <p className="text-sm text-muted-foreground text-center mt-4">
              ⛅ Evento sujeito a condições meteorológicas favoráveis
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
