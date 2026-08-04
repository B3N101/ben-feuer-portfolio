import { notFound } from "next/navigation";
import { marked } from "marked";
import { auth } from "@/auth";
import { getPost } from "@/lib/posts";
import { deletePost } from "@/app/blog/actions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const session = await auth();
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;

  const html = await marked.parse(post.content);

  return (
    <article>
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.25em",
          color: "rgba(255,250,236,0.4)",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>

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

      <div
        className="blog-prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {isAdmin && (
        <form action={deletePost.bind(null, post.id)} style={{ marginTop: 64 }}>
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
      )}
    </article>
  );
}
