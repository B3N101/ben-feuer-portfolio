"use client";

import { PROJECTS } from "@/lib/projects";

export function SideRail({
  activeProject,
  onSelect,
  showContact,
}: {
  activeProject: number;
  onSelect: (i: number) => void;
  showContact?: boolean;
}) {
  return (
    <div
      style={{
        position: "fixed",
        right: 24,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "flex-end",
      }}
    >
      {PROJECTS.map((p, i) => (
        <div
          key={p.id}
          onClick={() => onSelect(i)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
            color:
              !showContact && activeProject === i ? "#FFFAEC" : "rgba(255,250,236,0.4)",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              opacity: !showContact && activeProject === i ? 1 : 0,
              transition: "opacity 200ms",
            }}
          >
            {p.name}
          </span>
          <span
            style={{
              width: !showContact && activeProject === i ? 26 : 10,
              height: 2,
              background:
                !showContact && activeProject === i ? "#4FC3FF" : "rgba(255,250,236,0.3)",
              transition: "all 250ms",
            }}
          />
        </div>
      ))}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          color: showContact ? "#FFFAEC" : "rgba(255,250,236,0.4)",
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            opacity: showContact ? 1 : 0,
            transition: "opacity 200ms",
          }}
        >
          Contact
        </span>
        <span
          style={{
            width: showContact ? 26 : 10,
            height: 2,
            background: showContact ? "#4FC3FF" : "rgba(255,250,236,0.3)",
            transition: "all 250ms",
          }}
        />
      </div>
    </div>
  );
}
