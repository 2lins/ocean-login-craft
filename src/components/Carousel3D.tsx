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
  carouselVelocity: number;
}

const Card3D = ({ position, rotation, card, isActive, onClick, isMoving, carouselVelocity }: Card3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const targetRotationY = useRef(0);

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
      
      // Dynamic rotation based on carousel movement
      if (isMoving) {
        // During movement: rotate cards dynamically
        const rotationSpeed = isActive ? carouselVelocity * 2 : carouselVelocity * 4;
        targetRotationY.current += rotationSpeed;
        meshRef.current.rotation.y = targetRotationY.current;
        
        // Add subtle X-axis rotation for depth during movement
        meshRef.current.rotation.x = Math.sin(targetRotationY.current) * 0.1;
      } else {
        // When stopped: smoothly return to rest position
        if (isActive) {
          // Active card: smooth to zero rotation with subtle oscillation
          const restRotation = Math.sin(time * 0.3) * 0.05;
          targetRotationY.current += (restRotation - targetRotationY.current) * 0.1;
          meshRef.current.rotation.y = targetRotationY.current;
          meshRef.current.rotation.x += (0 - meshRef.current.rotation.x) * 0.1;
        } else {
          // Inactive cards: maintain slight rotation based on position
          const baseRotation = rotation;
          targetRotationY.current += (baseRotation - targetRotationY.current) * 0.08;
          meshRef.current.rotation.y = targetRotationY.current;
          meshRef.current.rotation.x += (0 - meshRef.current.rotation.x) * 0.08;
        }
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
            width: "250px",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <div className="flex flex-col items-center gap-2 p-4 transition-all duration-300">
            {/* Image placeholder */}
            <div 
              className="w-48 h-32 rounded-lg bg-background/80 backdrop-blur-sm border border-primary/30 overflow-hidden"
              style={{
                backgroundImage: `url(${card.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            
            {/* Text content */}
            <div className="text-center">
              <h3 
                className={`font-cinzel font-bold mb-1 transition-all duration-300 ${
                  isActive ? "text-base text-primary" : "text-sm text-muted-foreground"
                }`}
                style={{
                  textShadow: isActive ? "0 0 10px rgba(239, 169, 74, 0.5)" : "none",
                }}
              >
                {card.title}
              </h3>
              <p 
                className={`font-cormorant italic transition-all duration-300 ${
                  isActive ? "text-xs text-foreground" : "text-[10px] text-muted-foreground/70"
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
  const [carouselVelocity, setCarouselVelocity] = useState(0);

  useFrame(() => {
    if (groupRef.current) {
      // Smooth rotation to center the active card with easing
      const targetRotation = -(activeIndex * (Math.PI * 2)) / cards.length;
      const diff = targetRotation - groupRef.current.rotation.y;
      groupRef.current.rotation.y += diff * 0.08;
      
      // Detect movement and calculate velocity
      const velocity = Math.abs(diff);
      setCarouselVelocity(velocity);
      setIsMoving(velocity > 0.01);
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
            carouselVelocity={carouselVelocity}
          />
        );
      })}
    </group>
  );
};
