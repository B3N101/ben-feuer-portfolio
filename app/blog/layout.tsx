import Link from "next/link";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#07090d", color: "#FFFAEC" }}>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 25,
          height: 56,
          display: "flex",
          alignItems: "center",
          padding: "0 28px",
          borderBottom: "1px solid rgba(255,250,236,0.06)",
          background: "rgba(7,9,13,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          gap: 24,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,250,236,0.55)",
            textDecoration: "none",
          }}
        >
          ← Home
        </Link>

        <Link
          href="/blog"
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#FFFAEC",
            textDecoration: "none",
          }}
        >
          Feuer<span style={{ color: "#FF7A1A" }}>.</span>
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#4FC3FF",
              marginLeft: 10,
            }}
          >
            Blog
          </span>
        </Link>

        <Link
          href="/blog/new"
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#FF7A1A",
            textDecoration: "none",
          }}
        >
          + New Post
        </Link>
      </nav>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "64px 28px 120px" }}>
        {children}
      </main>
    </div>
  );
}
