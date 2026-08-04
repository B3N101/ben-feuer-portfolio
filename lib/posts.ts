import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const POSTS_FILE = join(process.cwd(), "data", "posts.json");

export type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
};

export function readPosts(): Post[] {
  try {
    return JSON.parse(readFileSync(POSTS_FILE, "utf-8")) as Post[];
  } catch {
    return [];
  }
}

export function writePosts(posts: Post[]): void {
  writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getPost(slug: string): Post | undefined {
  return readPosts().find((p) => p.slug === slug);
}
