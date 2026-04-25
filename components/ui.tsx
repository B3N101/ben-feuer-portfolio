import type { ReactNode } from "react";

export function Label({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: 10,
        letterSpacing: "0.3em",
        color: "rgba(255,250,236,0.5)",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

export function Btn({
  children,
  primary,
  accent = "#4FC3FF",
  href,
}: {
  children: ReactNode;
  primary?: boolean;
  accent?: string;
  href?: string;
}) {
  const style: React.CSSProperties = {
    background: primary ? accent : "transparent",
    color: primary ? "#07090d" : "#FFFAEC",
    border: primary ? "none" : "1px solid rgba(255,250,236,0.25)",
    padding: "12px 22px",
    fontFamily: "var(--font-mono), monospace",
    fontSize: 11,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    cursor: "pointer",
    borderRadius: 2,
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-block",
  };
  if (href) {
    return (
      <a href={href} style={style}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" style={style}>
      {children}
    </button>
  );
}

export function TickRow() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 6,
        display: "flex",
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            borderLeft: i === 0 ? "none" : "1px solid rgba(79,195,255,0.15)",
            height: i % 5 === 0 ? 6 : 3,
          }}
        />
      ))}
    </div>
  );
}
