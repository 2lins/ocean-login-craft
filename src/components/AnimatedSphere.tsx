import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Html } from "@react-three/drei";
import * as THREE from "three";
import { LucideIcon } from "lucide-react";

interface AnimatedSphereProps {
  isActive: boolean;
  onClick: () => void;
  position: [number, number, number];
  scale: number;
  color: string;
  icon: LucideIcon;
  name: string;
}

export const AnimatedSphere = ({ 
  isActive, 
  onClick, 
  position, 
  scale, 
  color, 
  icon: Icon, 
  name 
}: AnimatedSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.8 + position[0]) * 0.15;
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
      meshRef.current.rotation.z = Math.cos(time * 0.2) * 0.05;
      
      const targetRotationY = isActive ? Math.PI / 6 : 0;
      meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.05;
      
      const targetScale = isActive ? scale * 1.2 : hovered ? scale * 1.1 : scale;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  const amberColor = isActive ? "#D4A574" : "#8B6F47";
  const glowColor = isActive ? "#EFA94A" : "#6B5435";

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color={amberColor}
            attach="material"
            distort={0.15}
            speed={1.5}
            roughness={0.1}
            metalness={0.3}
            emissive={glowColor}
            emissiveIntensity={isActive ? 0.6 : 0.15}
            transparent
            opacity={0.85}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Sphere>

        {isActive && (
          <Sphere args={[1.08, 32, 32]}>
            <meshBasicMaterial
              color="#EFA94A"
              transparent
              opacity={0.25}
              wireframe
            />
          </Sphere>
        )}
      </mesh>
      
      <Html center distanceFactor={6}>
        <div 
          className="flex flex-col items-center gap-1.5 pointer-events-none transition-all duration-500"
          style={{
            filter: `drop-shadow(0 0 ${isActive ? '10px' : '4px'} rgba(212, 165, 116, ${isActive ? '0.9' : '0.5'}))`,
          }}
        >
          <Icon 
            className="w-7 h-7 transition-all duration-500" 
            strokeWidth={isActive ? 2.5 : 2}
            style={{
              color: isActive ? "#D4A574" : "#A07855",
            }}
          />
          <span 
            className={`font-cormorant text-xs tracking-wide whitespace-nowrap transition-all duration-500 ${
              isActive ? "font-bold" : "font-medium"
            }`}
            style={{
              color: isActive ? "#EFA94A" : "#C9A577",
              textShadow: isActive ? "0 0 12px rgba(239, 169, 74, 0.7)" : "0 0 4px rgba(201, 165, 119, 0.3)",
            }}
          >
            {name}
          </span>
        </div>
      </Html>
    </group>
  );
};
