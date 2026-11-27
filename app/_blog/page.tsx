import Link from "next/link";
import { readPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await readPosts();

  return (
    <div>
      <div style={{ marginBottom: 56 }}>
        <div
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.4em",
            color: "#4FC3FF",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          ◆ Writing
        </div>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            margin: 0,
            backgroundImage:
              "linear-gradient(180deg, #FFFAEC 0%, #FFFAEC 55%, #FF7A1A 82%, #FF3D2E 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Blog
        </h1>
      </div>

      {posts.length === 0 ? (
        <div
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 13,
            color: "rgba(255,250,236,0.35)",
            letterSpacing: "0.1em",
            paddingTop: 40,
            borderTop: "1px solid rgba(255,250,236,0.08)",
          }}
        >
          No posts yet.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {posts.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              style={{
                textDecoration: "none",
                display: "block",
                padding: "28px 0",
                borderTop: "1px solid rgba(255,250,236,0.08)",
                borderBottom:
                  i === posts.length - 1
                    ? "1px solid rgba(255,250,236,0.08)"
                    : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 10,
                  letterSpacing: "0.25em",
                  color: "rgba(255,250,236,0.4)",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "#FFFAEC",
                  margin: "0 0 12px",
                  lineHeight: 1.2,
                }}
              >
                {post.title}
              </h2>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "rgba(255,250,236,0.55)",
                  margin: 0,
                }}
              >
                {post.content.slice(0, 160).replace(/[#*`]/g, "")}
                {post.content.length > 160 ? "…" : ""}
              </p>
              <div
                style={{
                  marginTop: 16,
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  color: "#FF7A1A",
                  letterSpacing: "0.15em",
                }}
              >
                Read →
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
