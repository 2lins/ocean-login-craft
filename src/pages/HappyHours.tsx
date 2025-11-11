import React from 'react';
import { SunsetHero } from '../components/HappyHours/SunsetHero';
import { EventCarousel } from '../components/HappyHours/EventCarousel';
import { SunsetData, HappyHourEvent } from '../types/sunset.types';
const HappyHours: React.FC = () => {
  // Mock data - substituir por dados reais da API
  const sunsetData: SunsetData = {
    id: '1',
    date: new Date(),
    sunsetTime: '19:30',
    sunriseTime: '07:15',
    quality: 'spectacular',
    weatherCondition: 'Céu limpo',
    temperature: 24,
    visibility: 10,
    cloudCover: 5,
    recommendation: 'Condições perfeitas para sunset'
  };
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
  return <div className="min-h-screen bg-background">
      {/* Header */}
      

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Sunset Intelligence */}
        <SunsetHero sunsetData={sunsetData} />

        {/* Events Carousel */}
        <EventCarousel events={events} />

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4 font-cinzel">
            Não Perca Nenhuma Experiência
          </h2>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Subscreva à nossa newsletter e receba alertas sobre novos eventos, 
            promoções exclusivas e previsões de sunset premium
          </p>
          <button className="bg-background text-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-background/90 transition-all duration-300 transform hover:scale-105">
            📧 Subscrever Newsletter
          </button>
        </div>
      </div>
    </div>;
};
export default HappyHours;