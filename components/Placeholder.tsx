"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function Placeholder({
  color = "#4FC3FF",
  explode = 0,
}: {
  color?: string;
  explode?: number;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.25;
  });

  const e = explode;

  return (
    <group ref={group}>
      <mesh position={[0, 0 + e * 0.05, 0]} castShadow>
        <boxGeometry args={[1.4, 0.35, 0.9]} />
        <meshStandardMaterial
          color="#1a1f26"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 0.3 + e * 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 1.2, 24]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[-0.6, -0.2 - e * 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.12, 24]} />
        <meshStandardMaterial
          color="#2b2f36"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
      <mesh position={[0.6, -0.2 - e * 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.12, 24]} />
        <meshStandardMaterial
          color="#2b2f36"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
    </group>
  );
}
