import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useCarouselSound } from "@/hooks/useCarouselSound";

interface CarouselCard {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  isLegendary?: boolean;
}

interface Card3DProps {
  position: [number, number, number];
  rotation: number;
  card: CarouselCard;
  isActive: boolean;
  onClick: () => void;
  isMoving: boolean;
  rotationProgress: number;
}

const Card3D = ({ position, rotation, card, isActive, onClick, isMoving, rotationProgress }: Card3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Responsive sizing based on window width
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const baseScale = card.isLegendary ? (isMobile ? 1.1 : 1.2) : 1;

  useFrame(() => {
    if (meshRef.current) {
      // Smooth scale animation
      const targetScale = isActive ? baseScale * 1.15 : hovered ? baseScale * 1.05 : baseScale;
      const currentScale = meshRef.current.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.15;
      meshRef.current.scale.set(newScale, newScale, newScale);
      
      if (isMoving) {
        // During movement: one complete rotation (0 to 2π)
        const cardRotation = rotationProgress * Math.PI * 2;
        meshRef.current.rotation.y = rotation + cardRotation;
        
        // Add subtle X-axis rotation for depth during transition
        meshRef.current.rotation.x = Math.sin(cardRotation) * 0.15;
      } else {
        // When stopped: lock to rest position (no movement)
        meshRef.current.rotation.y = rotation;
        meshRef.current.rotation.x = 0;
      }
    }
    
    if (groupRef.current) {
      // Keep position fixed
      groupRef.current.position.set(position[0], position[1], position[2]);
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <RoundedBox 
          args={card.isLegendary 
            ? (isMobile ? [2.2, 2.8, 0.15] : [2.8, 3.5, 0.15]) 
            : [2.5, 3, 0.1]
          } 
          radius={card.isLegendary ? 0.15 : 0.1} 
          smoothness={4}
        >
          <meshStandardMaterial
            color={card.isLegendary ? "#FFD700" : isActive ? "#EFA94A" : "#D4A574"}
            metalness={card.isLegendary ? 0.9 : 0.6}
            roughness={card.isLegendary ? 0.1 : 0.2}
            emissive={card.isLegendary ? "#FFD700" : isActive ? "#EFA94A" : "#8B6F47"}
            emissiveIntensity={card.isLegendary ? 0.5 : isActive ? 0.3 : 0.1}
          />
        </RoundedBox>

        {/* Card content overlay */}
        <Html
          center
          distanceFactor={isMobile ? 7 : 6}
          style={{
            width: card.isLegendary ? (isMobile ? "260px" : "320px") : (isMobile ? "240px" : "280px"),
            pointerEvents: "none",
            userSelect: "none",
            opacity: isMoving && rotationProgress < 0.9 ? 0 : 1,
            transition: "opacity 0.3s ease-out",
          }}
        >
          <div className={`flex flex-col items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 transition-all duration-300 ${card.isLegendary ? 'relative' : ''}`}>
            {card.isLegendary && (
              <div className="absolute -top-2 -left-2 -right-2 -bottom-2 sm:-top-3 sm:-left-3 sm:-right-3 sm:-bottom-3 bg-gradient-to-br from-yellow-500/20 via-amber-500/20 to-orange-500/20 rounded-xl blur-xl" />
            )}
            
            {/* Image/Video placeholder */}
            {card.videoUrl ? (
              <div className="relative">
                <video 
                  key={card.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onError={(e) => {
                    console.error('Video failed to load:', card.videoUrl);
                    setVideoError(true);
                  }}
                  onLoadedData={() => {
                    console.log('Video loaded successfully:', card.videoUrl);
                    setVideoLoaded(true);
                  }}
                  className={`rounded-lg bg-background/80 backdrop-blur-sm border overflow-hidden ${
                    card.isLegendary 
                      ? 'w-32 h-20 sm:w-48 sm:h-32 md:w-56 md:h-36 border-primary' 
                      : 'w-28 h-16 sm:w-40 sm:h-24 md:w-48 md:h-32 border-primary/30'
                  }`}
                  style={{
                    objectFit: "cover",
                  }}
                >
                  <source src={card.videoUrl} type="video/mp4" />
                </video>
                {!videoLoaded && !videoError && (
                  <div className={`absolute inset-0 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm border ${
                    card.isLegendary ? 'border-primary' : 'border-primary/30'
                  }`}>
                    <span className="text-[8px] sm:text-xs text-muted-foreground">Carregando...</span>
                  </div>
                )}
                {videoError && (
                  <div className={`absolute inset-0 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm border ${
                    card.isLegendary ? 'border-primary' : 'border-primary/30'
                  }`}>
                    <span className="text-[8px] sm:text-xs text-destructive">Erro ao carregar</span>
                  </div>
                )}
              </div>
            ) : (
              <div 
                className={`rounded-lg bg-background/80 backdrop-blur-sm border overflow-hidden ${
                  card.isLegendary 
                    ? 'w-32 h-20 sm:w-48 sm:h-32 md:w-56 md:h-36 border-primary' 
                    : 'w-28 h-16 sm:w-40 sm:h-24 md:w-48 md:h-32 border-primary/30'
                }`}
                style={{
                  backgroundImage: card.imageUrl ? `url(${card.imageUrl})` : 'none',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            )}
            
            {/* Text content */}
            <div className="text-center relative z-10">
              {card.isLegendary && (
                <div className="mb-0.5 sm:mb-1 font-cinzel text-[8px] sm:text-[10px] text-primary/80 tracking-widest uppercase">
                  ⭐ Lendária ⭐
                </div>
              )}
              <h3 
                className={`font-cinzel font-bold mb-0.5 transition-all duration-300 ${
                  card.isLegendary 
                    ? "text-sm sm:text-base md:text-lg text-primary"
                    : isActive ? "text-xs sm:text-sm md:text-base text-primary" : "text-[10px] sm:text-xs md:text-sm text-muted-foreground"
                }`}
                style={{
                  textShadow: isActive || card.isLegendary ? "0 0 10px rgba(239, 169, 74, 0.5)" : "none",
                }}
              >
                {card.title}
              </h3>
              <p 
                className={`font-cormorant italic transition-all duration-300 ${
                  card.isLegendary
                    ? "text-[10px] sm:text-xs md:text-sm text-foreground"
                    : isActive ? "text-[9px] sm:text-[11px] md:text-xs text-foreground" : "text-[8px] sm:text-[9px] md:text-[10px] text-muted-foreground/70"
                }`}
              >
                {card.description}
              </p>
            </div>
          </div>
        </Html>
      </mesh>

      {/* Glow effect when active or legendary */}
      {(isActive || card.isLegendary) && (
        <RoundedBox 
          args={card.isLegendary 
            ? (isMobile ? [2.3, 2.9, 0.17] : [2.9, 3.6, 0.17]) 
            : [2.6, 3.1, 0.12]
          } 
          radius={card.isLegendary ? 0.15 : 0.1} 
          smoothness={4}
        >
          <meshBasicMaterial
            color={card.isLegendary ? "#FFD700" : "#EFA94A"}
            transparent
            opacity={card.isLegendary ? 0.3 : 0.2}
            wireframe
          />
        </RoundedBox>
      )}
    </group>
  );
};

interface Carousel3DProps {
  cards: CarouselCard[];
  activeIndex: number;
  onCardClick: (index: number) => void;
  onStopMoving?: () => void;
}

export const Carousel3D = ({ cards, activeIndex, onCardClick, onStopMoving }: Carousel3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isMoving, setIsMoving] = useState(false);
  const previousActiveIndex = useRef(activeIndex);
  const [rotationProgress, setRotationProgress] = useState(1);
  const startRotation = useRef(0);
  const endRotation = useRef(0);
  const transitionStartTime = useRef(0);
  const transitionDuration = 800; // milliseconds
  const { playWhooshSound, playStopSound } = useCarouselSound();
  const hasPlayedSound = useRef(false);
  const hasPlayedStopSound = useRef(false);

  // Play sound when movement starts
  useEffect(() => {
    if (isMoving && !hasPlayedSound.current) {
      playWhooshSound();
      hasPlayedSound.current = true;
      hasPlayedStopSound.current = false;
    } else if (!isMoving) {
      hasPlayedSound.current = false;
      if (!hasPlayedStopSound.current && rotationProgress === 1) {
        playStopSound();
        hasPlayedStopSound.current = true;
        onStopMoving?.();
      }
    }
  }, [isMoving, playWhooshSound, playStopSound, rotationProgress, onStopMoving]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Detect index change and start transition
    if (activeIndex !== previousActiveIndex.current) {
      const anglePerCard = (Math.PI * 2) / cards.length;
      const currentRotation = groupRef.current.rotation.y;
      const targetRotation = -(activeIndex * anglePerCard);
      
      // Calculate shortest path
      let diff = targetRotation - currentRotation;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      
      startRotation.current = currentRotation;
      endRotation.current = currentRotation + diff;
      transitionStartTime.current = state.clock.getElapsedTime() * 1000;
      previousActiveIndex.current = activeIndex;
      setRotationProgress(0);
      setIsMoving(true);
    }

    // Animate transition
    if (isMoving) {
      const currentTime = state.clock.getElapsedTime() * 1000;
      const elapsed = currentTime - transitionStartTime.current;
      const progress = Math.min(elapsed / transitionDuration, 1);
      
      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      setRotationProgress(easedProgress);
      
      // Interpolate rotation
      groupRef.current.rotation.y = startRotation.current + (endRotation.current - startRotation.current) * easedProgress;
      
      // Stop when complete
      if (progress >= 1) {
        setIsMoving(false);
        setRotationProgress(1);
        groupRef.current.rotation.y = endRotation.current;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {cards.map((card, index) => {
        const angle = (index * Math.PI * 2) / cards.length;
        const radius = 4;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <Card3D
            key={card.id}
            position={[x, 0, z]}
            rotation={-angle}
            card={card}
            isActive={index === activeIndex}
            onClick={() => onCardClick(index)}
            isMoving={isMoving}
            rotationProgress={rotationProgress}
          />
        );
      })}
    </group>
  );
};
