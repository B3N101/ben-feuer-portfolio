import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { auth } from "@/auth";
import { getPost } from "@/lib/posts";
import { getCommentsForPost } from "@/lib/comments";
import { deletePost, deleteComment } from "@/app/blog/actions";
import { CommentForm } from "@/components/blog/CommentForm";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const [post, session] = await Promise.all([getPost(slug), auth()]);
  if (!post) notFound();

  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;
  const comments = await getCommentsForPost(slug);
  const html = await marked.parse(post.content);

  return (
    <article>
      {/* Meta */}
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.25em",
          color: "rgba(255,250,236,0.4)",
          textTransform: "uppercase",
          marginBottom: 16,
          display: "flex",
          gap: 16,
          alignItems: "center",
        }}
      >
        <span>
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        {post.updatedAt && (
          <span style={{ color: "rgba(255,250,236,0.25)" }}>
            · edited{" "}
            {new Date(post.updatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        )}
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          margin: "0 0 40px",
          backgroundImage:
            "linear-gradient(180deg, #FFFAEC 0%, #FFFAEC 60%, #FF7A1A 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {post.title}
      </h1>

      {/* Content */}
      <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />

      {/* Admin controls */}
      {isAdmin && (
        <div style={{ display: "flex", gap: 12, marginTop: 56, paddingTop: 24, borderTop: "1px solid rgba(255,250,236,0.08)" }}>
          <Link
            href={`/blog/${slug}/edit`}
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 10,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#4FC3FF",
              textDecoration: "none",
              border: "1px solid rgba(79,195,255,0.35)",
              padding: "8px 16px",
              borderRadius: 2,
            }}
          >
            Edit post
          </Link>
          <form action={deletePost.bind(null, post.id)}>
            <button
              type="submit"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,61,46,0.4)",
                color: "rgba(255,61,46,0.7)",
                padding: "8px 16px",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 10,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                cursor: "pointer",
                borderRadius: 2,
              }}
            >
              Delete post
            </button>
          </form>
        </div>
      )}

      {/* Comments */}
      <section style={{ marginTop: 72 }}>
        <div
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "rgba(255,250,236,0.5)",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          ◇ Comments{comments.length > 0 ? ` · ${comments.length}` : ""}
        </div>

        {comments.length === 0 && (
          <p
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 12,
              color: "rgba(255,250,236,0.25)",
              letterSpacing: "0.1em",
              marginBottom: 32,
            }}
          >
            No comments yet.
          </p>
        )}

        {comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              padding: "20px 0",
              borderBottom: "1px solid rgba(255,250,236,0.07)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#FFFAEC",
                    letterSpacing: "0.05em",
                  }}
                >
                  {comment.authorName}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 10,
                    color: "rgba(255,250,236,0.3)",
                    letterSpacing: "0.15em",
                    marginLeft: 12,
                  }}
                >
                  {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              {isAdmin && (
                <form action={deleteComment.bind(null, comment.id)}>
                  <button
                    type="submit"
                    style={{
                      background: "transparent",
                      border: "none",
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(255,61,46,0.5)",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Delete
                  </button>
                </form>
              )}
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: 1.65,
                color: "rgba(255,250,236,0.75)",
              }}
            >
              {comment.content}
            </p>
          </div>
        ))}

        <div style={{ marginTop: 32 }}>
          <CommentForm
            postSlug={slug}
            userName={session?.user?.name ?? session?.user?.email ?? null}
          />
        </div>
      </section>
    </article>
  );
}
