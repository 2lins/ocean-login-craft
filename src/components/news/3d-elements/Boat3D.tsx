import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface Boat3DProps {
  position: [number, number, number];
}

export const Boat3D = ({ position }: Boat3DProps) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Movimento suave do barco
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.3) * 2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={meshRef} position={position} scale={0.3}>
        {/* Casco do barco */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4, 0.8, 1.5]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        
        {/* Mastro */}
        <mesh position={[0, 2, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 4]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        
        {/* Vela */}
        <mesh position={[0.8, 1.5, 0]} rotation={[0, 0, 0.1]}>
          <planeGeometry args={[1.5, 2]} />
          <meshStandardMaterial color="#F5F5DC" side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Float>
  );
};
