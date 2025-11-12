import { useRef, useState, useEffect, useMemo } from "react";
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
  rotation: [number, number, number];
  scale: number;
  card: CarouselCard;
  isActive: boolean;
  onClick: () => void;
  isMoving: boolean;
  isSide: boolean;
}

const Card3D = ({ position, rotation, scale, card, isActive, onClick, isMoving, isSide }: Card3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  useFrame((state) => {
    if (groupRef.current) {
      const targetScale = scale;
      const currentScale = groupRef.current.scale.x;
      groupRef.current.scale.setScalar(currentScale + (targetScale - currentScale) * 0.1);
      
      if (isActive && !isMoving) {
        const breathe = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
        groupRef.current.scale.setScalar(targetScale * breathe);
      }
      
      const targetY = hovered && !isSide ? position[1] + 0.2 : position[1];
      const currentY = groupRef.current.position.y;
      groupRef.current.position.y = currentY + (targetY - currentY) * 0.1;
    }
  });

  return (
    <group 
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => !isSide && setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Main card with luxury material */}
      <RoundedBox args={[2.5, 3.5, 0.15]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color={card.isLegendary ? "#B8860B" : isActive ? "#B8860B" : "#2a2a2a"}
          metalness={0.6}
          roughness={0.2}
          transparent
          opacity={isSide ? 0.7 : 0.9}
          envMapIntensity={1.2}
        />
      </RoundedBox>

      {/* Golden border */}
      <RoundedBox args={[2.52, 3.52, 0.02]} radius={0.1} smoothness={4} position={[0, 0, 0.08]}>
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={card.isLegendary ? 0.9 : isActive ? 0.8 : 0.3}
        />
      </RoundedBox>

      {/* Glow effect on active or legendary */}
      {(isActive || card.isLegendary) && (
        <RoundedBox args={[2.7, 3.7, 0.2]} radius={0.12} smoothness={4}>
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        </RoundedBox>
      )}

      {/* Golden Particles for Legendary Cards */}
      {card.isLegendary && <GoldenParticles />}

      {/* Ground reflection */}
      <RoundedBox args={[2.5, 3.5, 0.15]} radius={0.1} smoothness={4} position={[0, -3.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color={card.isLegendary ? "#B8860B" : isActive ? "#B8860B" : "#2a2a2a"}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.3}
        />
      </RoundedBox>

      {/* Card content */}
      <Html
        center
        distanceFactor={isMobile ? 6 : 5}
        position={[0, 0, 0.16]}
        style={{
          width: isMobile ? "180px" : "220px",
          pointerEvents: "none",
          userSelect: "none",
          opacity: isSide ? 0.7 : 1,
          transition: "opacity 0.3s ease-out",
        }}
      >
        <div className={`flex flex-col items-center gap-2 p-3 transition-all duration-300 ${card.isLegendary ? 'relative' : ''}`}>
          {card.isLegendary && (
            <div className="absolute -inset-4 bg-gradient-to-br from-yellow-600/20 via-amber-500/20 to-yellow-700/20 rounded-2xl blur-2xl" />
          )}
          
          {/* Image/Video */}
          {card.videoUrl ? (
            <video 
              key={card.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className={`rounded-lg bg-black/60 backdrop-blur-sm border overflow-hidden w-32 h-48 md:w-40 md:h-56 ${
                card.isLegendary ? 'border-yellow-500 border-2 shadow-lg shadow-yellow-500/50' : 'border-yellow-700/40'
              }`}
              style={{ objectFit: "cover" }}
            >
              <source src={card.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <div 
              className={`rounded-lg bg-black/60 backdrop-blur-sm border overflow-hidden w-32 h-48 md:w-40 md:h-56 ${
                card.isLegendary ? 'border-yellow-500 border-2 shadow-lg shadow-yellow-500/50' : 'border-yellow-700/40'
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
              <div className="mb-1 font-serif text-xs text-yellow-400 tracking-widest uppercase">
                ⭐ Lendária ⭐
              </div>
            )}
            <h3 
              className={`font-serif font-bold mb-1 transition-all duration-300 ${
                card.isLegendary 
                  ? "text-base md:text-lg text-yellow-400 font-extrabold"
                  : isActive ? "text-sm md:text-base text-yellow-500" : "text-xs md:text-sm text-gray-400"
              }`}
              style={{
                textShadow: isActive || card.isLegendary ? "0 0 15px rgba(184, 134, 11, 0.6)" : "none",
              }}
            >
              {card.title}
            </h3>
            <p 
              className={`font-serif italic transition-all duration-300 ${
                card.isLegendary
                  ? "text-xs md:text-sm text-gray-200"
                  : isActive ? "text-xs text-gray-300" : "text-[10px] text-gray-500"
              }`}
            >
              {card.description}
            </p>
          </div>
        </div>
      </Html>

    </group>
  );
};

// Golden Particles for Legendary Cards
const GoldenParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const particleCount = isMobile ? 25 : 40;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      const radius = 1.5 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      colors[i3] = 1.0;
      colors[i3 + 1] = 0.843 + Math.random() * 0.1;
      colors[i3 + 2] = 0.0 + Math.random() * 0.2;
      
      sizes[i] = Math.random() * 0.04 + 0.02;
    }
    
    return { positions, colors, sizes };
  }, [particleCount]);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 0.8) * 0.1;
      pointsRef.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Luxury Bar Lighting
export const BarLighting = () => (
  <>
    <ambientLight intensity={0.4} />
    <spotLight
      position={[0, 8, 4]}
      angle={0.3}
      penumbra={0.5}
      intensity={1.2}
      color="#FFD700"
      castShadow
    />
    <pointLight position={[-5, 2, 2]} intensity={0.5} color="#B8860B" />
    <pointLight position={[5, 2, 2]} intensity={0.5} color="#B8860B" />
    <pointLight position={[0, -2, 2]} intensity={0.3} color="#FFD700" />
  </>
);

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
  const startPositions = useRef<{ [key: number]: number }>({});
  const endPositions = useRef<{ [key: number]: number }>({});
  const transitionStartTime = useRef(0);
  const transitionDuration = 800;
  const { playWhooshSound, playStopSound } = useCarouselSound();
  const hasPlayedSound = useRef(false);
  const hasPlayedStopSound = useRef(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  // Responsive spacing
  const spacing = isMobile ? 3.5 : 4.5;

  useEffect(() => {
    if (isMoving && !hasPlayedSound.current) {
      playWhooshSound();
      hasPlayedSound.current = true;
      hasPlayedStopSound.current = false;
    } else if (!isMoving) {
      hasPlayedSound.current = false;
      if (!hasPlayedStopSound.current) {
        playStopSound();
        hasPlayedStopSound.current = true;
        onStopMoving?.();
      }
    }
  }, [isMoving, playWhooshSound, playStopSound, onStopMoving]);

  useEffect(() => {
    if (activeIndex !== previousActiveIndex.current) {
      // Calculate start and end positions for each visible card
      const prevLeft = (previousActiveIndex.current - 1 + cards.length) % cards.length;
      const prevRight = (previousActiveIndex.current + 1) % cards.length;
      const newLeft = (activeIndex - 1 + cards.length) % cards.length;
      const newRight = (activeIndex + 1) % cards.length;

      startPositions.current = {
        [prevLeft]: -spacing,
        [previousActiveIndex.current]: 0,
        [prevRight]: spacing,
      };

      endPositions.current = {
        [newLeft]: -spacing,
        [activeIndex]: 0,
        [newRight]: spacing,
      };

      transitionStartTime.current = Date.now();
      setIsMoving(true);
      previousActiveIndex.current = activeIndex;
    }
  }, [activeIndex, cards.length, spacing]);

  useFrame(() => {
    if (isMoving) {
      const elapsed = Date.now() - transitionStartTime.current;
      const progress = Math.min(elapsed / transitionDuration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      if (progress >= 1) {
        setIsMoving(false);
      }

      return easedProgress;
    }
    return 1;
  });

  // Calculate which 3 cards to show
  const leftIndex = (activeIndex - 1 + cards.length) % cards.length;
  const rightIndex = (activeIndex + 1) % cards.length;
  const visibleCards = [
    { card: cards[leftIndex], index: leftIndex, position: 'left' as const },
    { card: cards[activeIndex], index: activeIndex, position: 'center' as const },
    { card: cards[rightIndex], index: rightIndex, position: 'right' as const },
  ];

  return (
    <group ref={groupRef}>
      {visibleCards.map(({ card, index, position }) => {
        const isSide = position !== 'center';
        const isActive = index === activeIndex;
        
        // Position
        const xPos = position === 'left' ? -spacing : position === 'right' ? spacing : 0;
        const zPos = isSide ? -1 : 0;
        
        // Scale
        const scale = isMobile 
          ? (isActive ? 1.0 : 0.75) 
          : (isActive ? 1.2 : 0.8);
        
        // Rotation
        const yRotation = position === 'left' ? 0.15 : position === 'right' ? -0.15 : 0;

        return (
          <Card3D
            key={card.id}
            position={[xPos, 0, zPos]}
            rotation={[0, yRotation, 0]}
            scale={scale}
            card={card}
            isActive={isActive}
            onClick={() => onCardClick(index)}
            isMoving={isMoving}
            isSide={isSide}
          />
        );
      })}
    </group>
  );
};
