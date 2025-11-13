import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { LazyCanvas } from '@/components/LazyCanvas';
import { CAROUSEL_CARDS } from '@/constants/menuData';
const HappyHours: React.FC = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const handleNextCard = useCallback(() => {
    setCarouselIndex(prev => (prev + 1) % CAROUSEL_CARDS.length);
  }, []);
  const handlePrevCard = useCallback(() => {
    setCarouselIndex(prev => (prev - 1 + CAROUSEL_CARDS.length) % CAROUSEL_CARDS.length);
  }, []);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);
  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNextCard();
    }
    if (isRightSwipe) {
      handlePrevCard();
    }
  }, [touchStart, touchEnd, handleNextCard, handlePrevCard]);

  return <div className="min-h-screen bg-background">

      <section className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background to-background/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">Eventos Mensais</h2>
            <p className="font-cormorant text-xl md:text-2xl text-muted-foreground italic">Momentos únicos que definem nossa essência</p>
          </div>
          <div className="relative" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <LazyCanvas
              cards={CAROUSEL_CARDS}
              activeIndex={carouselIndex}
              onCardClick={setCarouselIndex}
              className="relative h-[500px] sm:h-[550px] md:h-[600px] rounded-xl overflow-hidden border-2 border-primary/30 bg-gradient-to-b from-black/80 to-black/60 backdrop-blur-sm shadow-2xl shadow-yellow-900/20"
            />
            <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center gap-4 sm:gap-6 z-20 px-2">
              <Button onClick={handlePrevCard} variant="outline" size="icon" className="rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 border-none hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 h-10 w-10 sm:h-12 sm:w-12">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
              </Button>
              <div className="flex gap-2 sm:gap-3 items-center">
                {CAROUSEL_CARDS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCarouselIndex(index)}
                    className={`w-3 h-3 rotate-45 transition-all duration-300 ${index === carouselIndex ? 'bg-yellow-500 shadow-lg shadow-yellow-500/50' : 'bg-gray-600 hover:bg-gray-500'}`}
                  />
                ))}
              </div>
              <Button onClick={handleNextCard} variant="outline" size="icon" className="rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 border-none hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 h-10 w-10 sm:h-12 sm:w-12">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>;
};
export default HappyHours;
