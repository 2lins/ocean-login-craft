import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface CarouselCard {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  isLegendary?: boolean;
}

interface Card3DProps {
  card: CarouselCard;
  isVisible: boolean;
}

const Card3D = ({ card, isVisible }: Card3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  // Responsive sizing - Larger for mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const cardWidth = isMobile ? 3.2 : 2.8;
  const cardHeight = isMobile ? 4.8 : 4.2;

  useFrame(() => {
    if (meshRef.current && meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      // Smooth fade in/out
      const targetOpacity = isVisible ? 1 : 0;
      meshRef.current.material.opacity = THREE.MathUtils.lerp(
        meshRef.current.material.opacity,
        targetOpacity,
        0.1
      );
      
      // Slight scale animation when visible
      if (groupRef.current) {
        const targetScale = isVisible ? 1 : 0.9;
        const currentScale = groupRef.current.scale.x;
        const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
        groupRef.current.scale.set(newScale, newScale, newScale);
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh ref={meshRef}>
        <RoundedBox 
          args={[cardWidth, cardHeight, 0.12]} 
          radius={0.12} 
          smoothness={4}
        >
          <meshStandardMaterial
            color={card.isLegendary ? "#FFD700" : "#F2E4C8"}
            metalness={card.isLegendary ? 0.9 : 0.6}
            roughness={card.isLegendary ? 0.1 : 0.2}
            emissive={card.isLegendary ? "#FFD700" : "#F2E4C8"}
            emissiveIntensity={card.isLegendary ? 0.5 : 0.3}
            transparent
            opacity={1}
          />
        </RoundedBox>

        {/* Card content overlay */}
        <Html
          center
          distanceFactor={isMobile ? 6.5 : 5.5}
          position={[0, 0, 0.061]}
          style={{
            width: isMobile ? "180px" : "200px",
            pointerEvents: "none",
            userSelect: "none",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.3s ease-out",
          }}
        >
          <div className={`flex flex-col items-center gap-2 sm:gap-3 p-2 sm:p-3 ${card.isLegendary ? 'relative' : ''}`}>
            {card.isLegendary && (
              <div className="absolute -inset-4 bg-gradient-to-br from-yellow-500/20 via-amber-500/20 to-orange-500/20 rounded-xl blur-xl" />
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
                className={`rounded-lg bg-background/80 backdrop-blur-sm border overflow-hidden w-32 h-48 sm:w-36 sm:h-56 md:w-40 md:h-64 ${
                  card.isLegendary ? 'border-primary border-2' : 'border-primary/30'
                }`}
                style={{ objectFit: "cover" }}
              >
                <source src={card.videoUrl} type="video/mp4" />
              </video>
            ) : (
              <div 
                className={`rounded-lg bg-background/80 backdrop-blur-sm border overflow-hidden w-32 h-48 sm:w-36 sm:h-56 md:w-40 md:h-64 ${
                  card.isLegendary ? 'border-primary border-2' : 'border-primary/30'
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
                <div className="mb-1 sm:mb-2 font-cinzel text-xs sm:text-sm text-primary/80 tracking-widest uppercase">
                  ⭐ Lendária ⭐
                </div>
              )}
              <h3 
                className={`font-cinzel font-bold mb-1 transition-all duration-300 ${
                  card.isLegendary 
                    ? "text-sm sm:text-base md:text-lg text-primary font-extrabold"
                    : "text-sm sm:text-base md:text-lg text-primary"
                }`}
                style={{
                  textShadow: "0 0 10px rgba(242, 228, 200, 0.5)",
                }}
              >
                {card.title}
              </h3>
              <p 
                className={`font-cormorant italic transition-all duration-300 ${
                  card.isLegendary
                    ? "text-xs sm:text-sm md:text-base text-foreground"
                    : "text-xs sm:text-sm md:text-base text-foreground"
                }`}
              >
                {card.description}
              </p>
            </div>
          </div>
        </Html>
      </mesh>

      {/* Glow effect when legendary */}
      {card.isLegendary && (
        <RoundedBox 
          args={[cardWidth + 0.1, cardHeight + 0.1, 0.13]}
          radius={0.12} 
          smoothness={4}
        >
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={isVisible ? 0.3 : 0}
            wireframe
          />
        </RoundedBox>
      )}

      {/* Golden particles for legendary cards */}
      {card.isLegendary && isVisible && <GoldenParticles />}
    </group>
  );
};

// Golden Particles Component for Legendary Cards
const GoldenParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const particleCount = isMobile ? 25 : 35;
  
  const particles = useRef(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random position around the card
      const radius = 2.5 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Golden color variations
      colors[i3] = 1.0;
      colors[i3 + 1] = 0.843 + Math.random() * 0.1;
      colors[i3 + 2] = 0.0 + Math.random() * 0.2;
      
      sizes[i] = Math.random() * 0.04 + 0.02;
    }
    
    return { positions, colors, sizes };
  }).current();
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.08;
      pointsRef.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <points ref={pointsRef} position={[0, 0, 0]}>
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

interface Carousel3DProps {
  cards: CarouselCard[];
  activeIndex: number;
  onCardClick: (index: number) => void;
}

export const Carousel3D = ({ cards, activeIndex }: Carousel3DProps) => {
  const [displayIndex, setDisplayIndex] = useState(activeIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (activeIndex !== displayIndex) {
      setIsTransitioning(true);
      
      // Wait for fade out, then change card
      const timer = setTimeout(() => {
        setDisplayIndex(activeIndex);
        setIsTransitioning(false);
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [activeIndex, displayIndex]);

  return (
    <group>
      {/* Display only the active card */}
      <Card3D
        card={cards[displayIndex]}
        isVisible={!isTransitioning}
      />
    </group>
  );
};
