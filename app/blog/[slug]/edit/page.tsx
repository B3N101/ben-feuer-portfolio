import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getPost } from "@/lib/posts";
import { updatePost } from "@/app/blog/actions";
import { PostEditor } from "@/components/blog/PostEditor";

type Props = { params: Promise<{ slug: string }> };

export default async function EditPostPage({ params }: Props) {
  const { slug } = await params;
  const session = await auth();

  if (session?.user?.email !== process.env.ADMIN_EMAIL) {
    redirect(`/blog/${slug}`);
  }

  const post = await getPost(slug);
  if (!post) notFound();

  const action = updatePost.bind(null, post.id);

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
        ◆ Edit Post
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
        {post.title}
      </h1>
      <PostEditor
        action={action}
        defaultTitle={post.title}
        defaultContent={post.content}
        submitLabel="Save changes →"
      />
    </div>
  );
}
