"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { readPosts, writePosts, slugify, type Post } from "@/lib/posts";
import { readComments, writeComments, type Comment } from "@/lib/comments";

function isAdmin(email: string | null | undefined) {
  return email === process.env.ADMIN_EMAIL;
}

// ── Posts ─────────────────────────────────────────────────────────────────────

export async function createPost(formData: FormData) {
  const session = await auth();
  if (!isAdmin(session?.user?.email)) throw new Error("Unauthorized");

  const title = (formData.get("title") as string).trim();
  const content = (formData.get("content") as string).trim();
  if (!title || !content) throw new Error("Title and content are required");

  const baseSlug = slugify(title);
  const posts = readPosts();

  let slug = baseSlug;
  let i = 2;
  while (posts.some((p) => p.slug === slug)) slug = `${baseSlug}-${i++}`;

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

export async function updatePost(id: string, formData: FormData) {
  const session = await auth();
  if (!isAdmin(session?.user?.email)) throw new Error("Unauthorized");

  const title = (formData.get("title") as string).trim();
  const content = (formData.get("content") as string).trim();
  if (!title || !content) throw new Error("Title and content are required");

  const posts = readPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Post not found");

  posts[idx] = { ...posts[idx], title, content, updatedAt: new Date().toISOString() };
  writePosts(posts);

  revalidatePath(`/blog/${posts[idx].slug}`);
  revalidatePath("/blog");
  redirect(`/blog/${posts[idx].slug}`);
}

export async function deletePost(id: string) {
  const session = await auth();
  if (!isAdmin(session?.user?.email)) throw new Error("Unauthorized");

  const posts = readPosts();
  const post = posts.find((p) => p.id === id);
  writePosts(posts.filter((p) => p.id !== id));

  // Delete associated comments too
  if (post) {
    writeComments(readComments().filter((c) => c.postSlug !== post.slug));
  }

  redirect("/blog");
}

// ── Comments ──────────────────────────────────────────────────────────────────

export async function addComment(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Sign in to comment");

  const postSlug = (formData.get("postSlug") as string).trim();
  const content = (formData.get("content") as string).trim();
  if (!postSlug || !content) return;

  const comment: Comment = {
    id: crypto.randomUUID(),
    postSlug,
    authorEmail: session.user.email,
    authorName: session.user.name ?? session.user.email,
    content,
    createdAt: new Date().toISOString(),
  };

  writeComments([...readComments(), comment]);
  revalidatePath(`/blog/${postSlug}`);
}

export async function deleteComment(id: string) {
  const session = await auth();
  if (!isAdmin(session?.user?.email)) throw new Error("Unauthorized");

  const comments = readComments();
  const comment = comments.find((c) => c.id === id);
  writeComments(comments.filter((c) => c.id !== id));

  if (comment) revalidatePath(`/blog/${comment.postSlug}`);
}
