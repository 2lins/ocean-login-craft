import React from 'react';
import { VideoHero } from '../components/HappyHours/VideoHero';
import HappyHourHero from '../components/HappyHours/HappyHourHero';
import { IntelligentReservation } from '../components/HappyHours/IntelligentReservation';
import { HappyHourSlide } from '../types/happyhour.types';
const HappyHours: React.FC = () => {
  const heroEvents = [{
    title: 'Sunset Session Premium',
    date: '15 Nov 2025',
    highlight: 'Especial Vinhos do Porto'
  }, {
    title: 'DJ Night Sessions',
    date: '20 Nov 2025',
    highlight: 'Com DJ Marcus Silva'
  }, {
    title: 'Mixology Experience',
    date: '22 Nov 2025',
    highlight: 'Aprenda com o Mestre'
  }];

  const happyHourSlides: HappyHourSlide[] = [
    {
      id: 'sunset-session',
      type: 'video',
      media: '/videos/sunset-2024.mp4',
      title: 'Sunset Session Premium',
      description: 'Uma experiência única de degustação de vinhos do Porto ao pôr do sol, com vista privilegiada para o Douro',
      price: 'A partir de €25',
      detailsUrl: '/events/sunset-session'
    },
    {
      id: 'dj-night',
      type: 'video',
      media: '/videos/hero-background.mp4',
      title: 'DJ Night Sessions',
      description: 'Noite especial com DJ Marcus Silva trazendo os melhores beats de deep house e nu disco',
      price: 'A partir de €15',
      detailsUrl: '/events/dj-night'
    },
    {
      id: 'mixology',
      type: 'video',
      media: '/videos/sunset-2024.mp4',
      title: 'Mixology Experience',
      description: 'Workshop exclusivo de mixologia com nosso head bartender. Aprenda a criar cocktails clássicos',
      price: 'A partir de €45',
      detailsUrl: '/events/mixology'
    },
    {
      id: 'live-jazz',
      type: 'video',
      media: '/videos/hero-background.mp4',
      title: 'Live Jazz Sessions',
      description: 'Noite intimista com o Porto Jazz Trio interpretando clássicos do jazz e bossa nova',
      price: 'A partir de €20',
      detailsUrl: '/events/live-jazz'
    }
  ];

  const handleSaibaMais = (slide: HappyHourSlide): void => {
    console.log('Saiba mais sobre:', slide.title);
    // Aqui você pode adicionar navegação ou abrir um modal com mais detalhes
  };

  const handleReservationComplete = (data: any) => {
    console.log('Reserva completa:', data);
  };
  return <div className="min-h-screen bg-background">
      {/* Video Hero Section */}
      <VideoHero videoSrc="/videos/hero-background.mp4" events={heroEvents} />

      {/* Happy Hour Hero Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Happy Hour Events
          </h2>
          
          <HappyHourHero 
            slides={happyHourSlides}
            autoPlay={true}
            autoPlayInterval={7000}
            onSaibaMais={handleSaibaMais}
          />
        </div>
      </section>

      {/* Intelligent Reservation Section */}
      <IntelligentReservation onReservationComplete={handleReservationComplete} />
    </div>;
};
export default HappyHours;