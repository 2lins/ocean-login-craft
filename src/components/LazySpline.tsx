import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface LazySplineProps {
  src: string;
  className?: string;
}

export const LazySpline = ({ src, className }: LazySplineProps) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  });

  return (
    <div ref={elementRef} className={className}>
      {isVisible ? (
        <iframe 
          src={src} 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="pointer-events-none"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-background/50 to-card/30 animate-pulse flex items-center justify-center">
          <div className="text-primary/30 font-cinzel text-xl">Carregando experiência 3D...</div>
        </div>
      )}
    </div>
  );
};
