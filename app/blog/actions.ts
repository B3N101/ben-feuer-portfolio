"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { readPosts, writePosts, slugify, type Post } from "@/lib/posts";

export async function createPost(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized");
  }

  const title = (formData.get("title") as string).trim();
  const content = (formData.get("content") as string).trim();

  if (!title || !content) throw new Error("Title and content are required");

  const baseSlug = slugify(title);
  const posts = readPosts();

  let slug = baseSlug;
  let i = 2;
  while (posts.some((p) => p.slug === slug)) {
    slug = `${baseSlug}-${i++}`;
  }

  const post: Post = {
    id: crypto.randomUUID(),
    slug,
    title,
    content,
    createdAt: new Date().toISOString(),
  };

  writePosts([post, ...posts]);
  redirect(`/blog/${slug}`);
}

export async function deletePost(id: string) {
  const session = await auth();
  if (!session?.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized");
  }

  const posts = readPosts().filter((p) => p.id !== id);
  writePosts(posts);
  redirect("/blog");
}
