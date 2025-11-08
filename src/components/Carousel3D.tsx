import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useCarouselSound } from "@/hooks/useCarouselSound";

interface CarouselCard {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
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

  useFrame(() => {
    if (meshRef.current) {
      // Smooth scale animation
      const targetScale = isActive ? 1.15 : hovered ? 1.05 : 1;
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
        <RoundedBox args={[2.5, 3, 0.1]} radius={0.1} smoothness={4}>
          <meshStandardMaterial
            color={isActive ? "#EFA94A" : "#D4A574"}
            metalness={0.6}
            roughness={0.2}
            emissive={isActive ? "#EFA94A" : "#8B6F47"}
            emissiveIntensity={isActive ? 0.3 : 0.1}
          />
        </RoundedBox>

        {/* Card content overlay */}
        <Html
          center
          distanceFactor={6}
          style={{
            width: "280px",
            pointerEvents: "none",
            userSelect: "none",
            opacity: isMoving && rotationProgress < 0.9 ? 0 : 1,
            transition: "opacity 0.3s ease-out",
          }}
        >
          <div className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-4 transition-all duration-300">
            {/* Image placeholder */}
            <div 
              className="w-40 h-24 sm:w-48 sm:h-32 rounded-lg bg-background/80 backdrop-blur-sm border border-primary/30 overflow-hidden"
              style={{
                backgroundImage: `url(${card.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            
            {/* Text content */}
            <div className="text-center">
              <h3 
                className={`font-cinzel font-bold mb-0.5 sm:mb-1 transition-all duration-300 ${
                  isActive ? "text-sm sm:text-base text-primary" : "text-xs sm:text-sm text-muted-foreground"
                }`}
                style={{
                  textShadow: isActive ? "0 0 10px rgba(239, 169, 74, 0.5)" : "none",
                }}
              >
                {card.title}
              </h3>
              <p 
                className={`font-cormorant italic transition-all duration-300 ${
                  isActive ? "text-[11px] sm:text-xs text-foreground" : "text-[9px] sm:text-[10px] text-muted-foreground/70"
                }`}
              >
                {card.description}
              </p>
            </div>
          </div>
        </Html>
      </mesh>

      {/* Glow effect when active */}
      {isActive && (
        <RoundedBox args={[2.6, 3.1, 0.12]} radius={0.1} smoothness={4}>
          <meshBasicMaterial
            color="#EFA94A"
            transparent
            opacity={0.2}
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
}

export const Carousel3D = ({ cards, activeIndex, onCardClick }: Carousel3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isMoving, setIsMoving] = useState(false);
  const previousActiveIndex = useRef(activeIndex);
  const [rotationProgress, setRotationProgress] = useState(1);
  const startRotation = useRef(0);
  const endRotation = useRef(0);
  const transitionStartTime = useRef(0);
  const transitionDuration = 800; // milliseconds
  const { playWhooshSound } = useCarouselSound();
  const hasPlayedSound = useRef(false);

  // Play sound when movement starts
  useEffect(() => {
    if (isMoving && !hasPlayedSound.current) {
      playWhooshSound();
      hasPlayedSound.current = true;
    } else if (!isMoving) {
      hasPlayedSound.current = false;
    }
  }, [isMoving, playWhooshSound]);

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
