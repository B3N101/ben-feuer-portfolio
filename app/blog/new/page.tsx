import { auth, signIn } from "@/auth";
import { createPost } from "@/app/blog/actions";

export default async function NewPostPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div style={{ textAlign: "center", paddingTop: 80 }}>
        <div
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "rgba(255,250,236,0.4)",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          ◆ Admin Area
        </div>
        <p
          style={{
            fontSize: 15,
            color: "rgba(255,250,236,0.6)",
            marginBottom: 32,
          }}
        >
          Sign in with your Google account to publish a post.
        </p>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/blog/new" });
          }}
        >
          <button
            type="submit"
            style={{
              background: "#FF7A1A",
              color: "#07090d",
              border: "none",
              padding: "12px 24px",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            Sign in with Google
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
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
        ◆ New Post
      </div>
      <h1
        style={{
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          margin: "0 0 40px",
          color: "#FFFAEC",
        }}
      >
        Write something
      </h1>

      <form action={createPost} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <label
            htmlFor="title"
            style={{
              display: "block",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 10,
              letterSpacing: "0.25em",
              color: "#4FC3FF",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            autoFocus
            placeholder="Post title"
            style={{
              width: "100%",
              background: "rgba(255,250,236,0.04)",
              border: "1px solid rgba(255,250,236,0.12)",
              borderRadius: 2,
              padding: "12px 16px",
              fontSize: 22,
              fontWeight: 600,
              color: "#FFFAEC",
              fontFamily: "var(--font-display), sans-serif",
              letterSpacing: "-0.02em",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div>
          <label
            htmlFor="content"
            style={{
              display: "block",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 10,
              letterSpacing: "0.25em",
              color: "#4FC3FF",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Content (Markdown)
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={20}
            placeholder="Write your post in Markdown..."
            style={{
              width: "100%",
              background: "rgba(255,250,236,0.04)",
              border: "1px solid rgba(255,250,236,0.12)",
              borderRadius: 2,
              padding: "16px",
              fontSize: 15,
              lineHeight: 1.7,
              color: "rgba(255,250,236,0.85)",
              fontFamily: "var(--font-mono), monospace",
              outline: "none",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            type="submit"
            style={{
              background: "#FF7A1A",
              color: "#07090d",
              border: "none",
              padding: "12px 24px",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            Publish →
          </button>
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 10,
              color: "rgba(255,250,236,0.3)",
              letterSpacing: "0.15em",
            }}
          >
            Signed in as {session.user.email}
          </span>
        </div>
      </form>
    </div>
  );
}
