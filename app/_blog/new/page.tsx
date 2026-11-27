import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { createPost } from "@/app/_blog/actions";
import { PostEditor } from "@/components/blog/PostEditor";

export default async function NewPostPage() {
  const session = await auth();

  if (session?.user?.email !== process.env.ADMIN_EMAIL) {
    redirect("/blog");
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
      <PostEditor action={createPost} />
    </div>
  );
}
