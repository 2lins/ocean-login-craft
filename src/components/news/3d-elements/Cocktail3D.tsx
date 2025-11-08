import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface Cocktail3DProps {
  position: [number, number, number];
  color?: string;
}

export const Cocktail3D = ({ position, color = "#FF6B6B" }: Cocktail3DProps) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={meshRef} position={position} scale={0.4}>
        {/* Copo */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.6, 2, 8]} />
          <meshStandardMaterial color="#E8E8E8" transparent opacity={0.7} />
        </mesh>
        
        {/* Líquido */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.75, 0.55, 1.4, 8]} />
          <meshStandardMaterial color={color} transparent opacity={0.8} />
        </mesh>
        
        {/* Canudo */}
        <mesh position={[0.5, 0.5, 0]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.05, 0.05, 2]} />
          <meshStandardMaterial color="#FF0000" />
        </mesh>
        
        {/* Guarda-chuva */}
        <group position={[0, 1.2, 0]} scale={0.3}>
          <mesh>
            <cylinderGeometry args={[0.02, 0.02, 1]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <coneGeometry args={[0.8, 0.3, 8]} />
            <meshStandardMaterial color="#FFD700" />
          </mesh>
        </group>
      </group>
    </Float>
  );
};
