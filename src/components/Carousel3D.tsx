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
  rotation: number;
  card: CarouselCard;
  isActive: boolean;
  onClick: () => void;
  isMoving: boolean;
}

const Card3D = ({ position, rotation, card, isActive, onClick, isMoving }: Card3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Responsive sizing - Story format dimensions
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const baseScale = 0.85; // Smaller base scale for better fit

  useFrame(() => {
    if (meshRef.current) {
      // Smooth scale animation - more emphasis on active card
      const targetScale = isActive ? baseScale * 1.2 : hovered ? baseScale * 1.05 : baseScale;
      const currentScale = meshRef.current.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.15;
      meshRef.current.scale.set(newScale, newScale, newScale);
    }
  });

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <RoundedBox 
          args={[1.4, 2.6, 0.08]} 
          radius={0.1} 
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
          distanceFactor={isMobile ? 5.8 : 4.8}
          style={{
            width: isMobile ? "140px" : "160px",
            pointerEvents: "none",
            userSelect: "none",
            opacity: isMoving ? 0 : 1,
            transition: "opacity 0.2s ease-out",
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
                  className={`rounded-lg bg-background/80 backdrop-blur-sm border overflow-hidden ${
                    card.isLegendary 
                      ? 'w-24 h-40 sm:w-28 sm:h-48 md:w-32 md:h-56 border-primary border-2' 
                      : 'w-24 h-40 sm:w-28 sm:h-48 md:w-32 md:h-56 border-primary/30'
                  }`}
                  style={{
                    objectFit: "cover",
                  }}
                >
                  <source src={card.videoUrl} type="video/mp4" />
                </video>
              </div>
            ) : (
              <div 
                className={`rounded-lg bg-background/80 backdrop-blur-sm border overflow-hidden ${
                  card.isLegendary 
                    ? 'w-24 h-40 sm:w-28 sm:h-48 md:w-32 md:h-56 border-primary border-2' 
                    : 'w-24 h-40 sm:w-28 sm:h-48 md:w-32 md:h-56 border-primary/30'
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
                    ? "text-xs sm:text-sm md:text-base text-primary font-extrabold"
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
            ? [1.45, 2.65, 0.09] 
            : [1.5, 2.7, 0.1]
          }
          radius={0.1} 
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

// Golden Particles Component for Legendary Cards
const GoldenParticles = ({ position }: { position: [number, number, number] }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const particleCount = isMobile ? 20 : 30;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random position around the card (sphere distribution)
      const radius = 1.8 + Math.random() * 0.4; // Max 2.2
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Golden color variations
      colors[i3] = 1.0; // R
      colors[i3 + 1] = 0.843 + Math.random() * 0.1; // G
      colors[i3 + 2] = 0.0 + Math.random() * 0.2; // B
      
      // Random sizes
      sizes[i] = Math.random() * 0.03 + 0.01;
    }
    
    return { positions, colors, sizes };
  }, []);
  
  useFrame((state) => {
    if (pointsRef.current) {
      // Slow rotation around Y axis only
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      
      // Gentle pulsating effect
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.08;
      pointsRef.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <points ref={pointsRef} position={position}>
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
        size={0.05}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
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
        const radius = 4.5; // Increased for better spacing
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <group key={card.id}>
            <Card3D
              position={[x, 0, z]}
              rotation={-angle}
              card={card}
              isActive={index === activeIndex}
              onClick={() => onCardClick(index)}
              isMoving={isMoving}
            />
            
            {/* Add golden particles for legendary cards */}
            {card.isLegendary && <GoldenParticles position={[x, 0, z]} />}
          </group>
        );
      })}
    </group>
  );
};
