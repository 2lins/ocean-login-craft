import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface Bottle3DProps {
  position: [number, number, number];
}

export const Bottle3D = ({ position }: Bottle3DProps) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.2) * 1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={meshRef} position={position} scale={0.5}>
        {/* Corpo da garrafa */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 3, 8]} />
          <meshStandardMaterial color="#2D5016" transparent opacity={0.8} />
        </mesh>
        
        {/* Gargalo */}
        <mesh position={[0, 2, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
          <meshStandardMaterial color="#2D5016" transparent opacity={0.8} />
        </mesh>
        
        {/* Tampa */}
        <mesh position={[0, 2.7, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.4, 8]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
        
        {/* Rótulo */}
        <mesh position={[0, 0, 0.41]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.6, 1.5]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      </group>
    </Float>
  );
};
