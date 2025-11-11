import React, { useState } from 'react';
import { VideoHero } from '../components/HappyHours/VideoHero';
import { Carousel3D } from '../components/HappyHours/Carousel3D';
import { IntelligentReservation } from '../components/HappyHours/IntelligentReservation';
import { HappyHourEvent } from '../types/sunset.types';
const HappyHours: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<HappyHourEvent | null>(null);

  const heroEvents = [
    {
      title: 'Sunset Session Premium',
      date: '15 Nov 2025',
      highlight: 'Especial Vinhos do Porto'
    },
    {
      title: 'DJ Night Sessions',
      date: '20 Nov 2025',
      highlight: 'Com DJ Marcus Silva'
    },
    {
      title: 'Mixology Experience',
      date: '22 Nov 2025',
      highlight: 'Aprenda com o Mestre'
    }
  ];

  const events: HappyHourEvent[] = [{
    id: '1',
    title: 'Sunset Session Premium',
    subtitle: 'Especial Vinhos do Porto',
    date: new Date(2025, 10, 15),
    startTime: '18:00',
    endTime: '21:00',
    type: 'sunset_session',
    capacity: 50,
    currentBookings: 35,
    price: 25,
    discountPercentage: 20,
    description: 'Uma experiência única de degustação de vinhos do Porto ao pôr do sol, com vista privilegiada para o Douro. Inclui seleção de 5 vinhos premium e acompanhamentos gourmet.',
    videoUrl: '/videos/sunset-2024.mp4',
    thumbnail: '/api/placeholder/400/300',
    specialOffer: 'Reserva antecipada: -20% + cocktail de boas-vindas grátis',
    cocktailPairing: ['Porto Tónico', 'Douro Spritz', 'Vintage Old Fashioned'],
    weatherDependent: true
  }, {
    id: '2',
    title: 'DJ Night Sessions',
    subtitle: 'Com DJ Marcus Silva',
    date: new Date(2025, 10, 20),
    startTime: '22:00',
    endTime: '02:00',
    type: 'dj_night',
    capacity: 100,
    currentBookings: 75,
    price: 15,
    description: 'Noite especial com DJ Marcus Silva trazendo os melhores beats de deep house e nu disco. Ambiente sofisticado com cocktails autorais.',
    videoUrl: '/videos/hero-background.mp4',
    thumbnail: '/api/placeholder/400/300',
    specialOffer: 'Lista VIP: entrada grátis + 2 cocktails',
    cocktailPairing: ['Espresso Martini', 'Negroni', 'Mojito Premium'],
    djName: 'DJ Marcus Silva',
    weatherDependent: false
  }, {
    id: '3',
    title: 'Mixology Experience',
    subtitle: 'Aprenda com o Mestre',
    date: new Date(2025, 10, 22),
    startTime: '19:00',
    endTime: '22:00',
    type: 'mixology_experience',
    capacity: 20,
    currentBookings: 12,
    price: 45,
    description: 'Workshop exclusivo de mixologia com nosso head bartender. Aprenda a criar 5 cocktails clássicos e desenvolva suas próprias criações.',
    videoUrl: '/videos/sunset-2024.mp4',
    thumbnail: '/api/placeholder/400/300',
    specialOffer: 'Inclui kit de ferramentas básicas de mixologia',
    cocktailPairing: ['Old Fashioned', 'Daiquiri', 'Aviation', 'Last Word', 'Penicillin'],
    weatherDependent: false
  }, {
    id: '4',
    title: 'Live Jazz Sessions',
    subtitle: 'Porto Jazz Trio',
    date: new Date(2025, 10, 25),
    startTime: '20:00',
    endTime: '23:00',
    type: 'live_music',
    capacity: 60,
    currentBookings: 40,
    price: 20,
    discountPercentage: 15,
    description: 'Noite intimista com o Porto Jazz Trio interpretando clássicos do jazz e bossa nova. Perfeito para apreciadores de boa música e cocktails refinados.',
    videoUrl: '/videos/hero-background.mp4',
    thumbnail: '/api/placeholder/400/300',
    specialOffer: 'Jantar + concerto: menu degustação especial disponível',
    cocktailPairing: ['Manhattan', 'Whiskey Sour', 'Sazerac'],
    weatherDependent: false
  }];

  const handleReservationComplete = (data: any) => {
    console.log('Reserva completa:', data);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Video Hero Section */}
      <VideoHero 
        videoSrc="/videos/hero-background.mp4"
        events={heroEvents}
      />

      {/* 3D Carousel Section */}
      <Carousel3D 
        events={events}
        onEventSelect={setSelectedEvent}
      />

      {/* Intelligent Reservation Section */}
      <IntelligentReservation 
        onReservationComplete={handleReservationComplete}
      />

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-br from-gray-900 to-black py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Não Perca Nenhuma Experiência
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Subscreva à nossa newsletter e receba alertas sobre novos eventos, 
            promoções exclusivas e experiências premium
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-orange-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
            📧 Subscrever Newsletter
          </button>
        </div>
      </div>
    </div>
  );
};

export default HappyHours;