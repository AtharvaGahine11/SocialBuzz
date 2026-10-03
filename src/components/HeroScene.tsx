import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const HeroScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#547BFF" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#9471FF" />
      <pointLight position={[0, 0, 0]} intensity={0.8} color="#60DDF4" />

      {/* Central Abstract Object */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#111A2E"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.8}
            roughness={0.2}
            distort={0.3}
            speed={2}
          />
        </Sphere>
      </Float>

      {/* Orbiting Elements */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Box args={[0.5, 0.5, 0.5]} position={[2.5, 1, -1]} rotation={[0.5, 0.5, 0]}>
          <meshPhysicalMaterial
            color="#547BFF"
            transmission={0.9}
            opacity={1}
            metalness={0.1}
            roughness={0.1}
            ior={1.5}
            thickness={0.5}
          />
        </Box>
      </Float>

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <Box args={[0.4, 0.4, 0.4]} position={[-2, -1.5, 1]} rotation={[0.2, 0.8, 0]}>
          <meshPhysicalMaterial
            color="#9471FF"
            transmission={0.9}
            opacity={1}
            metalness={0.1}
            roughness={0.1}
            ior={1.5}
            thickness={0.5}
          />
        </Box>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={2}>
        <Sphere args={[0.3, 32, 32]} position={[1.5, -2, 0.5]}>
          <meshPhysicalMaterial
            color="#60DDF4"
            transmission={0.8}
            opacity={1}
            metalness={0.2}
            roughness={0.1}
            ior={1.5}
            thickness={0.5}
          />
        </Sphere>
      </Float>
    </group>
  );
};

export default HeroScene;
