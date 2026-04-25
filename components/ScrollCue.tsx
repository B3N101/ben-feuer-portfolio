export function ScrollCue({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 52,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20,
        opacity: visible ? 1 : 0,
        transition: "opacity 400ms",
        fontFamily: "var(--font-mono), monospace",
        fontSize: 10,
        letterSpacing: "0.3em",
        color: "rgba(255,250,236,0.5)",
        textTransform: "uppercase",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        pointerEvents: "none",
      }}
    >
      <span>Scroll to explore</span>
      <span
        style={{
          display: "inline-block",
          width: 1,
          height: 40,
          background: "linear-gradient(180deg, #4FC3FF, transparent)",
          animation: "cue-pulse 1.6s ease-in-out infinite",
        }}
      />
    </div>
  );
}
