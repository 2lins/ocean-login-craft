import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CarouselCard {
  id: number;
  title: string;
  description: string;
  image?: string;
  category: 'promo' | 'event' | 'menu' | 'music';
}

interface Carousel3DProps {
  cards: CarouselCard[];
  activeIndex: number;
  onCardClick: (index: number) => void;
}

const Card3D = ({ 
  position, 
  rotation, 
  card, 
  isActive, 
  onClick 
}: { 
  position: [number, number, number]; 
  rotation: number; 
  card: CarouselCard; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      const targetScale = isActive ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const categoryColors: Record<string, string> = {
    promo: '#EFA94A',
    event: '#FF6B6B',
    menu: '#4ECDC4',
    music: '#A569BD'
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={[0, rotation, 0]}
      onClick={onClick}
    >
      <boxGeometry args={[2, 3, 0.1]} />
      <meshStandardMaterial 
        color={categoryColors[card.category] || '#EFA94A'} 
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
};

export const Carousel3D = ({ cards, activeIndex, onCardClick }: Carousel3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isMoving, setIsMoving] = useState(false);
  const previousActiveIndex = useRef(activeIndex);
  const startRotation = useRef(0);
  const endRotation = useRef(0);
  const transitionStartTime = useRef(0);
  const transitionDuration = 800;

  useEffect(() => {
    if (activeIndex !== previousActiveIndex.current) {
      setIsMoving(true);
    }
  }, [activeIndex]);

  useFrame((state) => {
    if (!groupRef.current) return;

    if (activeIndex !== previousActiveIndex.current) {
      const anglePerCard = (Math.PI * 2) / cards.length;
      const currentRotation = groupRef.current.rotation.y;
      const targetRotation = -(activeIndex * anglePerCard);
      
      const normalizeAngle = (angle: number) => {
        while (angle > Math.PI) angle -= Math.PI * 2;
        while (angle < -Math.PI) angle += Math.PI * 2;
        return angle;
      };
      
      const normalizedCurrent = normalizeAngle(currentRotation);
      const normalizedTarget = normalizeAngle(targetRotation);
      
      let diff = normalizedTarget - normalizedCurrent;
      if (diff > Math.PI) diff -= Math.PI * 2;
      if (diff < -Math.PI) diff += Math.PI * 2;
      
      startRotation.current = normalizedCurrent;
      endRotation.current = normalizedCurrent + diff;
      transitionStartTime.current = state.clock.getElapsedTime() * 1000;
      previousActiveIndex.current = activeIndex;
    }

    if (isMoving) {
      const currentTime = state.clock.getElapsedTime() * 1000;
      const elapsed = currentTime - transitionStartTime.current;
      const progress = Math.min(elapsed / transitionDuration, 1);
      
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      const newRotation = startRotation.current + (endRotation.current - startRotation.current) * easedProgress;
      groupRef.current.rotation.y = newRotation;
      
      if (progress >= 1) {
        setIsMoving(false);
        const anglePerCard = (Math.PI * 2) / cards.length;
        groupRef.current.rotation.y = -(activeIndex * anglePerCard);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {cards.map((card, index) => {
        const angle = (index * Math.PI * 2) / cards.length;
        const radius = 4.5;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const cardRotation = Math.atan2(-x, -z);

        return (
          <Card3D
            key={card.id}
            position={[x, 0, z]}
            rotation={cardRotation}
            card={card}
            isActive={index === activeIndex}
            onClick={() => onCardClick(index)}
          />
        );
      })}
    </group>
  );
};
