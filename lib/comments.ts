import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const KEY = "blog:comments";

export type Comment = {
  id: string;
  postSlug: string;
  authorEmail: string;
  authorName: string;
  content: string;
  createdAt: string;
};

export async function readComments(): Promise<Comment[]> {
  const comments = await redis.get<Comment[]>(KEY);
  return comments ?? [];
}

export async function writeComments(comments: Comment[]): Promise<void> {
  await redis.set(KEY, comments);
}

export async function getCommentsForPost(slug: string): Promise<Comment[]> {
  const all = await readComments();
  return all.filter((c) => c.postSlug === slug);
}
