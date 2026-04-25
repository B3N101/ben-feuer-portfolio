"use client";

import { CADViewer } from "./CADViewer";
import { Label, TickRow } from "./ui";
import type { Project } from "@/lib/projects";

export function ProjectSection({
  project,
  explode,
}: {
  project: Project;
  explode: number;
}) {
  return (
    <section
      style={{
        height: "100vh",
        minHeight: "100vh",
        scrollSnapAlign: "start",
        position: "relative",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.6fr) minmax(360px, 1fr)",
        gap: 0,
        padding: "72px 64px 72px 120px",
        background:
          "radial-gradient(ellipse at 30% 40%, rgba(79,195,255,0.06), transparent 60%), #07090d",
      }}
    >
      <div
        style={{
          position: "relative",
          border: "1px solid rgba(79,195,255,0.18)",
          borderRadius: 2,
          background: "#0a0d12",
          marginRight: 40,
          overflow: "hidden",
        }}
      >
        <CADViewer
          url={project.modelUrl}
          explode={explode}
          accent={project.accent}
          idTag={project.num}
          badge={project.name.toUpperCase()}
        />
        <TickRow />
      </div>

      <Infographic project={project} />
    </section>
  );
}

function Infographic({ project }: { project: Project }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 20px",
        fontFamily: "var(--font-display), sans-serif",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 11,
          letterSpacing: "0.3em",
          color: "#4FC3FF",
          marginBottom: 14,
        }}
      >
        PROJECT · {project.num}
      </div>
      <h2
        style={{
          fontSize: 56,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 0.95,
          margin: 0,
          color: "#FFFAEC",
        }}
      >
        {project.name}
      </h2>
      <div
        style={{
          marginTop: 10,
          fontSize: 16,
          color: project.accent,
          fontFamily: "var(--font-mono), monospace",
          letterSpacing: "0.1em",
        }}
      >
        {project.subtitle}
      </div>

      <div
        style={{
          marginTop: 18,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "5px 10px",
          border: `1px solid ${project.accent}55`,
          color: project.accent,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          borderRadius: 2,
          alignSelf: "flex-start",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: project.accent,
            boxShadow: `0 0 10px ${project.accent}`,
          }}
        />
        {project.status}
      </div>

      <div
        style={{
          marginTop: 30,
          paddingTop: 22,
          borderTop: "1px solid rgba(255,250,236,0.1)",
          fontSize: 15,
          lineHeight: 1.6,
          color: "rgba(255,250,236,0.75)",
          fontWeight: 400,
        }}
      >
        {project.blurb}
      </div>

      <div style={{ marginTop: 26 }}>
        <Label>◇ Problem</Label>
        <div
          style={{
            marginTop: 8,
            fontSize: 14,
            lineHeight: 1.5,
            color: "rgba(255,250,236,0.65)",
          }}
        >
          {project.problem}
        </div>
      </div>

      <div style={{ marginTop: 26, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {project.software.map((s) => (
          <span
            key={s}
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              padding: "5px 10px",
              background: "rgba(79,195,255,0.08)",
              border: "1px solid rgba(79,195,255,0.25)",
              color: "#4FC3FF",
              letterSpacing: "0.1em",
              borderRadius: 2,
            }}
          >
            ▸ {s}
          </span>
        ))}
      </div>

      <div
        style={{
          marginTop: 30,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
          background: "rgba(255,250,236,0.08)",
          border: "1px solid rgba(255,250,236,0.08)",
        }}
      >
        {project.specs.map((s) => (
          <div
            key={s.k}
            style={{ background: "#0a0d12", padding: "14px 16px" }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 9,
                letterSpacing: "0.25em",
                color: "rgba(255,250,236,0.5)",
              }}
            >
              {s.k}
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 22,
                fontWeight: 600,
                color: "#FFFAEC",
                letterSpacing: "-0.02em",
              }}
            >
              {s.v}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        <Label>◇ Materials &amp; Process</Label>
        <div style={{ marginTop: 10 }}>
          {project.materials.map((m, i) => (
            <div
              key={m.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom:
                  i === project.materials.length - 1
                    ? "none"
                    : "1px dashed rgba(255,250,236,0.08)",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
              }}
            >
              <span
                style={{
                  color: "rgba(255,250,236,0.5)",
                  letterSpacing: "0.15em",
                }}
              >
                {m.label.toUpperCase()}
              </span>
              <span style={{ color: "#FFFAEC" }}>{m.value}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
