"use client";

type Props = {
  onWork?: () => void;
  onContact?: () => void;
};

export function TopNav({ onWork, onContact }: Props) {
  const linkStyle: React.CSSProperties = {
    position: "relative",
    cursor: "pointer",
    color: "rgba(255,250,236,0.7)",
    textDecoration: "none",
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: "var(--font-mono), monospace",
    fontSize: 11,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 56,
        zIndex: 25,
        display: "flex",
        alignItems: "center",
        padding: "0 28px",
        borderBottom: "1px solid rgba(255,250,236,0.06)",
        background: "rgba(7,9,13,0.7)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display), sans-serif",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "#FFFAEC",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            backgroundImage:
              "linear-gradient(180deg, #FFFAEC 0%, #FF7A1A 60%, #FF3D2E 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          BF
        </span>
        Feuer<span style={{ color: "#FF7A1A" }}>.</span>
      </div>

      <div
        style={{
          marginLeft: 40,
          display: "flex",
          gap: 26,
          alignItems: "center",
        }}
      >
        <button
          type="button"
          onClick={onWork}
          style={{ ...linkStyle, color: "#FFFAEC" }}
        >
          Work
          <span
            style={{
              position: "absolute",
              bottom: -8,
              left: 0,
              right: 0,
              height: 1,
              background: "#4FC3FF",
            }}
          />
        </button>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...linkStyle,
            color: "#FF7A1A",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          Résumé <span style={{ fontSize: 9 }}>↗</span>
        </a>
        <button type="button" onClick={onContact} style={linkStyle}>
          Contact
        </button>
      </div>

      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: 18,
          alignItems: "center",
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.2em",
          color: "rgba(255,250,236,0.45)",
        }}
      >
        <span>◉ WEST LAFAYETTE · IN</span>
        <span>—</span>
        <span style={{ color: "#4FC3FF" }}>AVAILABLE · SUMMER &apos;26</span>
      </div>
    </div>
  );
}
