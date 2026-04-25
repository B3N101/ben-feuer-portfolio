"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { KTX2Loader } from "three-stdlib";
import type { GLTFLoader } from "three-stdlib";

let _ktx2: KTX2Loader | null = null;
function ktx2Loader(renderer: THREE.WebGLRenderer) {
  if (!_ktx2) {
    _ktx2 = new KTX2Loader().setTranscoderPath("/basis/");
  }
  _ktx2.detectSupport(renderer);
  return _ktx2;
}

export function Model({
  url,
  explode = 0,
  autoRotate = true,
}: {
  url: string;
  explode: number;
  autoRotate?: boolean;
}) {
  const { gl } = useThree();
  const extend = (loader: GLTFLoader) => {
    loader.setKTX2Loader(ktx2Loader(gl));
  };
  const { scene } = useGLTF(url, true, true, extend);
  const group = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (!group.current) return;
    if (autoRotate) group.current.rotation.y += dt * 0.2;

    scene.traverse((o) => {
      if (o.userData.restY === undefined) o.userData.restY = o.position.y;
      const rest = o.userData.restY as number;
      if (o.name === "weapon") o.position.y = rest + explode * 0.4;
      else if (o.name === "chassis") o.position.y = rest + explode * 0.05;
      else if (o.name === "wheel_L" || o.name === "wheel_R")
        o.position.y = rest - explode * 0.1;
    });
  });

  return <primitive ref={group} object={scene} dispose={null} />;
}
