"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import { Rotate3d } from "lucide-react";

// three.js only runs in the browser; load it after the page is interactive.
const CADViewer = dynamic(
  () => import("@/components/CADViewer").then((m) => m.CADViewer),
  { ssr: false },
);

export function ModelViewer({
  url,
  label,
  zoom = true,
  interactive = true,
  caption = true,
}: {
  url: string;
  label?: string;
  zoom?: boolean;
  interactive?: boolean;
  caption?: boolean;
}) {
  // Mount the WebGL canvas only once it scrolls near the viewport.
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { active, progress } = useProgress();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ position: "absolute", inset: 0 }}>
      {visible && (
        <CADViewer
          url={url}
          explode={0}
          background="#f3f5f8"
          zoom={zoom}
          interactive={interactive}
        />
      )}
      {(!visible || active) && (
        <div className="viewer-loading">
          <Rotate3d size={18} aria-hidden="true" />
          Loading CAD model{active ? ` · ${Math.round(progress)}%` : ""}
        </div>
      )}
      {caption && (
        <div className="viewer-caption">
          {label ? <strong>{label}</strong> : <span />}
          <span className="viewer-hint">
            <Rotate3d size={13} aria-hidden="true" />
            {zoom ? "Drag to rotate · Scroll to zoom" : "Drag to rotate"}
          </span>
        </div>
      )}
    </div>
  );
}
