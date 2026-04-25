"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import { ModelWithFallback } from "./ModelWithFallback";

type Props = {
  url?: string;
  explode: number;
  accent?: string;
  interactive?: boolean;
  idTag?: string;
  badge?: string;
};

export function CADViewer({
  url,
  explode,
  accent = "#4FC3FF",
  interactive = true,
  idTag,
  badge,
}: Props) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Canvas
        camera={{ position: [2.0, 1.3, 2.0], fov: 30 }}
        dpr={[1, 2]}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <color attach="background" args={["#0a0d12"]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <ModelWithFallback url={url} explode={explode} color={accent} />
          <Environment preset="warehouse" />
          <ContactShadows
            position={[0, -0.5, 0]}
            opacity={0.6}
            scale={6}
            blur={2}
            far={2}
          />
        </Suspense>
        {interactive && (
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            autoRotate={false}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            panSpeed={1.5}
          />
        )}
      </Canvas>

      {(idTag || badge) && (
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            right: 16,
            display: "flex",
            justifyContent: "space-between",
            pointerEvents: "none",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.25em",
            color: "rgba(255,250,236,0.55)",
          }}
        >
          {idTag && (
            <span>
              <span style={{ color: accent }}>◆</span> {idTag}
            </span>
          )}
          {badge && <span>{badge}</span>}
        </div>
      )}
    </div>
  );
}
