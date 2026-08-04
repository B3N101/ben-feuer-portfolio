import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const COMMENTS_FILE = join(process.cwd(), "data", "comments.json");

export type Comment = {
  id: string;
  postSlug: string;
  authorEmail: string;
  authorName: string;
  content: string;
  createdAt: string;
};

export function readComments(): Comment[] {
  try {
    return JSON.parse(readFileSync(COMMENTS_FILE, "utf-8")) as Comment[];
  } catch {
    return [];
  }
}

export function writeComments(comments: Comment[]): void {
  writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
}

export function getCommentsForPost(slug: string): Comment[] {
  return readComments().filter((c) => c.postSlug === slug);
}
