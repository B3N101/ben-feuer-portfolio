"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  onDone?: () => void;
  accent?: string;
};

export function Intro({ onDone, accent = "#4FC3FF" }: Props) {
  const [phase, setPhase] = useState(0); // 0 ribbons, 1 gather, 2 text, 3 done
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const startRef = useRef(
    typeof performance !== "undefined" ? performance.now() : 0,
  );

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 780);
    const t3 = setTimeout(() => setPhase(3), 1500);
    const t4 = setTimeout(() => onDone?.(), 1850);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onDone]);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);
    const ctx = c.getContext("2d")!;

    const ribbons = Array.from({ length: 7 }, (_, i) => ({
      hue: i % 3 === 0 ? 200 : i % 3 === 1 ? 25 : 50,
      phase: Math.random() * Math.PI * 2,
      amp: 60 + Math.random() * 120,
      speed: 0.4 + Math.random() * 0.6,
      y: 0.2 + Math.random() * 0.6,
      thick: 2 + Math.random() * 3,
    }));
    const embers = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vy: -0.0008 - Math.random() * 0.002,
      vx: (Math.random() - 0.5) * 0.0008,
      r: 0.5 + Math.random() * 1.8,
      life: Math.random(),
      hot: Math.random() > 0.6,
    }));

    const draw = () => {
      const t = (performance.now() - startRef.current) / 1000;
      const W = c.width,
        H = c.height;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(8,10,14,0.28)";
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "lighter";

      ribbons.forEach((r) => {
        const steps = 120;
        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const u = s / steps;
          const x = u * W;
          const wave =
            Math.sin(u * 6 + t * r.speed + r.phase) * r.amp +
            Math.sin(u * 13 - t * r.speed * 1.3 + r.phase) * r.amp * 0.4;
          const y = r.y * H + wave * dpr;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(0, 0, W, 0);
        if (r.hue === 200) {
          grad.addColorStop(0, "rgba(79,195,255,0)");
          grad.addColorStop(0.5, "rgba(79,195,255,0.9)");
          grad.addColorStop(1, "rgba(255,250,236,0)");
        } else if (r.hue === 25) {
          grad.addColorStop(0, "rgba(255,122,26,0)");
          grad.addColorStop(0.5, "rgba(255,122,26,0.85)");
          grad.addColorStop(1, "rgba(255,61,46,0)");
        } else {
          grad.addColorStop(0, "rgba(255,200,120,0)");
          grad.addColorStop(0.5, "rgba(255,250,236,0.8)");
          grad.addColorStop(1, "rgba(79,195,255,0)");
        }
        ctx.strokeStyle = grad;
        ctx.lineWidth = r.thick * dpr;
        ctx.shadowBlur = 18 * dpr;
        ctx.shadowColor =
          r.hue === 200 ? "#4FC3FF" : r.hue === 25 ? "#FF7A1A" : "#FFFAEC";
        ctx.stroke();
      });
      ctx.shadowBlur = 0;

      const gather = phase >= 1 ? Math.min(1, (t - 0.5) / 0.3) : 0;
      embers.forEach((e) => {
        e.x += e.vx;
        e.y += e.vy;
        e.life += 0.003;
        if (e.y < 0 || e.life > 1) {
          e.x = Math.random();
          e.y = 0.7 + Math.random() * 0.3;
          e.life = 0;
        }
        const targetY = 0.5;
        const targetX = 0.5;
        const px = (e.x * (1 - gather) + targetX * gather) * W;
        const py = (e.y * (1 - gather) + targetY * gather) * H;
        ctx.beginPath();
        ctx.arc(px, py, e.r * dpr, 0, Math.PI * 2);
        ctx.fillStyle = e.hot
          ? "rgba(255,250,236,0.95)"
          : "rgba(255,140,40,0.85)";
        ctx.shadowBlur = 8 * dpr;
        ctx.shadowColor = e.hot ? "#FFFAEC" : "#FF7A1A";
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [phase]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#07090d",
        zIndex: 9999,
        overflow: "hidden",
        opacity: phase >= 3 ? 0 : 1,
        transition: "opacity 400ms ease",
        pointerEvents: phase >= 3 ? "none" : "auto",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 3px)",
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 11,
          color: "rgba(255,250,236,0.5)",
          letterSpacing: "0.12em",
        }}
      >
        <div>◐ LOADING · CAD ASSETS</div>
        <div style={{ marginTop: 4, color: accent }}>
          {phase === 0 && "IGNITION ▚▚▚▚▚░░░░░"}
          {phase === 1 && "COALESCING ▚▚▚▚▚▚▚░░░"}
          {phase === 2 && "READY ▚▚▚▚▚▚▚▚▚▚"}
          {phase === 3 && "LAUNCH"}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 11,
          color: "rgba(255,250,236,0.5)",
          letterSpacing: "0.12em",
          textAlign: "right",
        }}
      >
        <div>BF · PORTFOLIO · 2026</div>
        <div style={{ marginTop: 4 }}>PURDUE ME</div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 24,
          right: 24,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10,
          color: "rgba(255,250,236,0.35)",
          letterSpacing: "0.15em",
        }}
      >
        <span>◉ ARC-WELD SEQUENCE</span>
        <span>REV.03 / BF-2026</span>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(56px, 10vw, 140px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            color: "#FFFAEC",
            textShadow:
              phase >= 2
                ? "0 0 40px rgba(255,122,26,0.6), 0 0 80px rgba(79,195,255,0.4)"
                : "none",
            opacity: phase >= 2 ? 1 : 0,
            transform:
              phase >= 2 ? "translateY(0) scale(1)" : "translateY(20px) scale(0.96)",
            transition:
              "opacity 500ms ease, transform 500ms cubic-bezier(.2,.8,.2,1), text-shadow 500ms",
            backgroundImage:
              "linear-gradient(180deg, #FFFAEC 0%, #FFFAEC 55%, #FF7A1A 78%, #FF3D2E 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Ben Feuer
        </div>
        <div
          style={{
            marginTop: 18,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 13,
            letterSpacing: "0.4em",
            color: accent,
            textTransform: "uppercase",
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(10px)",
            transition:
              "opacity 500ms ease 100ms, transform 500ms ease 100ms",
          }}
        >
          Mechanical Engineering Student
        </div>
        <div
          style={{
            marginTop: 28,
            width: 160,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #FF7A1A, #FFFAEC, #4FC3FF, transparent)",
            opacity: phase >= 2 ? 1 : 0,
            transition: "opacity 400ms ease 200ms",
          }}
        />
      </div>

      <button
        onClick={() => setPhase(3)}
        style={{
          position: "absolute",
          bottom: 52,
          right: 24,
          background: "transparent",
          border: "1px solid rgba(255,250,236,0.2)",
          color: "rgba(255,250,236,0.6)",
          padding: "8px 14px",
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.2em",
          cursor: "pointer",
          borderRadius: 2,
          textTransform: "uppercase",
        }}
      >
        Skip →
      </button>
    </div>
  );
}
