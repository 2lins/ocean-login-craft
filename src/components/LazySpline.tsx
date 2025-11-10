import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useState, useEffect } from "react";

interface LazySplineProps {
  src: string;
  className?: string;
}

export const LazySpline = ({ src, className }: LazySplineProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Adiciona parâmetros de otimização à URL do Spline
  const optimizedSrc = `${src}${src.includes('?') ? '&' : '?'}quality=medium&fps=30`;

  return (
    <div ref={elementRef} className={className}>
      {isVisible && !isMobile ? (
        <iframe 
          src={optimizedSrc} 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="pointer-events-none"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-b from-background to-card/50" />
      )}
    </div>
  );
};
