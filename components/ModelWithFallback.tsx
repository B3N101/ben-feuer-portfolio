"use client";

import { Component, Suspense, type ReactNode } from "react";
import { Bounds, Center } from "@react-three/drei";
import { Model } from "./Model";

// Loads the GLB and frames the camera on it once it arrives. Renders nothing
// while loading or if the file fails; ModelViewer shows the loading state.
export function ModelWithFallback({ url, explode }: { url: string; explode: number }) {
  return (
    <LoadErrorBoundary>
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.5}>
          <Center bottom>
            <Model url={url} explode={explode} />
          </Center>
        </Bounds>
      </Suspense>
    </LoadErrorBoundary>
  );
}

class LoadErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
