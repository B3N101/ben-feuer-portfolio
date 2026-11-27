import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;

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
          gap: 24,
          borderBottom: "1px solid rgba(255,250,236,0.06)",
          background: "rgba(7,9,13,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
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
            flexShrink: 0,
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
            flexShrink: 0,
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

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 20 }}>
          {session?.user ? (
            <>
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  color: "rgba(255,250,236,0.4)",
                  textTransform: "uppercase",
                }}
              >
                {session.user.name ?? session.user.email}
              </span>
              {isAdmin && (
                <Link
                  href="/blog/new"
                  style={{
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
              )}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/blog" });
                }}
              >
                <button
                  type="submit"
                  style={{
                    background: "transparent",
                    border: "none",
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(255,250,236,0.35)",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/blog" });
              }}
            >
              <button
                type="submit"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,250,236,0.15)",
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 10,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(255,250,236,0.55)",
                  cursor: "pointer",
                  padding: "6px 14px",
                  borderRadius: 2,
                }}
              >
                Sign in
              </button>
            </form>
          )}
        </div>
      </nav>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "64px 28px 120px" }}>
        {children}
      </main>
    </div>
  );
}
