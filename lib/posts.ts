import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const KEY = "blog:posts";

export type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
};

export async function readPosts(): Promise<Post[]> {
  const posts = await redis.get<Post[]>(KEY);
  return posts ?? [];
}

export async function writePosts(posts: Post[]): Promise<void> {
  await redis.set(KEY, posts);
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await readPosts();
  return posts.find((p) => p.slug === slug);
}
