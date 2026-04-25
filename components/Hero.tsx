"use client";

export function Hero({ onViewWork }: { onViewWork?: () => void }) {
  return (
    <section
      style={{
        height: "100vh",
        minHeight: "100vh",
        scrollSnapAlign: "start",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 120px",
        background:
          "radial-gradient(ellipse at 20% 40%, rgba(79,195,255,0.10), transparent 60%), radial-gradient(ellipse at 80% 60%, rgba(255,122,26,0.08), transparent 60%), #07090d",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(79,195,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(79,195,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200 }}>
        <div
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.4em",
            color: "#4FC3FF",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          ◆ Portfolio · 2026
        </div>
        <h1
          style={{
            fontSize: "clamp(64px, 9vw, 140px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            margin: 0,
            backgroundImage:
              "linear-gradient(180deg, #FFFAEC 0%, #FFFAEC 55%, #FF7A1A 82%, #FF3D2E 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Ben Feuer
        </h1>
        <div
          style={{
            marginTop: 20,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 14,
            letterSpacing: "0.2em",
            color: "rgba(255,250,236,0.7)",
            textTransform: "uppercase",
          }}
        >
          Mechanical Engineering Student · Purdue University
        </div>
        <p
          style={{
            marginTop: 36,
            maxWidth: 560,
            fontSize: 17,
            lineHeight: 1.55,
            color: "rgba(255,250,236,0.75)",
            fontWeight: 400,
          }}
        >
          Combat robots, competition platforms, and the mechanisms in between.
          Every project below is CAD-modeled from scratch — drag to orbit, scroll
          to watch it come apart.
        </p>
        <div style={{ marginTop: 48, display: "flex", gap: 14 }}>
          <button
            type="button"
            onClick={onViewWork}
            style={{
              background: "#FF7A1A",
              color: "#07090d",
              border: "none",
              padding: "12px 22px",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            View work ↓
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "transparent",
              color: "#FFFAEC",
              border: "1px solid rgba(255,250,236,0.25)",
              padding: "12px 22px",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: 2,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Résumé ↗
          </a>
        </div>
      </div>
    </section>
  );
}
