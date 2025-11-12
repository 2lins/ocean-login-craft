import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Carousel3D = lazy(() => import('@/components/Carousel3D').then(m => ({ default: m.Carousel3D })));
const BarLighting = lazy(() => import('@/components/Carousel3D').then(m => ({ default: m.BarLighting })));

interface LazyCanvasProps {
  cards: any[];
  activeIndex: number;
  onCardClick: (index: number) => void;
  className?: string;
}

export const LazyCanvas = ({ cards, activeIndex, onCardClick, className }: LazyCanvasProps) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.05,
    rootMargin: '200px',
    triggerOnce: true
  });

  // Force load immediately for debugging
  const shouldLoad = true;

  return (
    <div ref={elementRef} className={className}>
      {shouldLoad ? (
        <Canvas
          frameloop="never"
          camera={{
            position: [0, typeof window !== 'undefined' && window.innerWidth < 640 ? 0.5 : 1, typeof window !== 'undefined' && window.innerWidth < 640 ? 6 : 8],
            fov: typeof window !== 'undefined' && window.innerWidth < 640 ? 50 : 45
          }}
          performance={{ min: 0.5 }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <BarLighting />
            <Carousel3D 
              cards={cards} 
              activeIndex={activeIndex} 
              onCardClick={onCardClick}
            />
          </Suspense>
        </Canvas>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-black/80 to-black/60 animate-pulse flex items-center justify-center">
          <div className="text-primary/30 font-cinzel text-2xl">Preparando experiência...</div>
        </div>
      )}
    </div>
  );
};
