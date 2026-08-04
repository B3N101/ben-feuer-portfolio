import { CONTACT } from "@/lib/projects";

export function About() {
  return (
    <section
      style={{
        scrollSnapAlign: "start",
        padding: "72px 120px",
        background:
          "radial-gradient(ellipse at 70% 60%, rgba(255,122,26,0.08), transparent 60%), #07090d",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 16,
          letterSpacing: "0.3em",
          color: "rgba(255,250,236,0.5)",
          textTransform: "uppercase",
        }}
      >
        ◇ Contact
      </div>

      <div className="contact-grid">
        {(
          [
            ["EMAIL", CONTACT.email],
            ["LINKEDIN", CONTACT.linkedin],
            ["GITHUB", CONTACT.github],
            ["SCHOOL", CONTACT.school],
            ["LOCATION", CONTACT.location],
          ] as const
        ).map(([k, v]) => (
          <div
            key={k}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              padding: "16px 0",
              fontFamily: "var(--font-mono), monospace",
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.25em",
                color: "#4FC3FF",
                textTransform: "uppercase",
              }}
            >
              {k}
            </span>
            <span style={{ fontSize: 13, color: "#FFFAEC" }}>{v}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
