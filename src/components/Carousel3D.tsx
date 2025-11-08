import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

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
  const [htmlOpacity, setHtmlOpacity] = useState(1);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5 + rotation) * 0.1;
    }
    
    if (meshRef.current) {
      // Smooth scale animation with easing
      const targetScale = isActive ? 1.15 : hovered ? 1.05 : 1;
      const currentScale = meshRef.current.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.15;
      meshRef.current.scale.set(newScale, newScale, newScale);
      
      // Calculate rotation based on progress (0 to 2π = 1 full rotation)
      if (isMoving) {
        // One complete rotation during transition
        const cardRotation = rotationProgress * Math.PI * 2;
        meshRef.current.rotation.y = rotation + cardRotation;
        
        // Add subtle X-axis rotation for depth
        meshRef.current.rotation.x = Math.sin(cardRotation) * 0.15;
        
        // Hide content during rotation, reveal at the end
        const targetOpacity = rotationProgress >= 0.9 ? 1 : 0;
        setHtmlOpacity(current => current + (targetOpacity - current) * 0.2);
      } else {
        // When stopped: smooth return to rest position with subtle oscillation
        const restRotation = isActive ? Math.sin(time * 0.3) * 0.05 : 0;
        meshRef.current.rotation.y += (rotation + restRotation - meshRef.current.rotation.y) * 0.1;
        meshRef.current.rotation.x += (0 - meshRef.current.rotation.x) * 0.1;
        
        // Ensure content is fully visible when stopped
        setHtmlOpacity(current => current + (1 - current) * 0.2);
      }
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
  const initialDiff = useRef(0);
  const [rotationProgress, setRotationProgress] = useState(0);
  const targetRotationRef = useRef(0);

  useFrame(() => {
    if (groupRef.current) {
      // Detect when activeIndex changes
      if (activeIndex !== previousActiveIndex.current) {
        const currentRotation = groupRef.current.rotation.y;
        const anglePerCard = (Math.PI * 2) / cards.length;
        const targetRotation = -(activeIndex * anglePerCard);
        
        // Calculate shortest path
        let diff = targetRotation - currentRotation;
        
        // Normalize to [-π, π] range for shortest rotation
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        
        // Set new target (always go forward in the shortest direction)
        targetRotationRef.current = currentRotation + diff;
        initialDiff.current = Math.abs(diff);
        previousActiveIndex.current = activeIndex;
        setRotationProgress(0);
      }
      
      const diff = targetRotationRef.current - groupRef.current.rotation.y;
      
      // Calculate normalized progress (0 to 1)
      const progress = initialDiff.current > 0 
        ? Math.max(0, Math.min(1, 1 - (Math.abs(diff) / initialDiff.current)))
        : 1;
      
      setRotationProgress(progress);
      setIsMoving(Math.abs(diff) > 0.01);
      
      // Smooth carousel rotation
      groupRef.current.rotation.y += diff * 0.08;
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
