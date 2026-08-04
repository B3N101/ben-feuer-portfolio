"use client";

import { useRef } from "react";
import { addComment } from "@/app/blog/actions";

type Props = {
  postSlug: string;
  userName: string | null;
};

export function CommentForm({ postSlug, userName }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await addComment(formData);
    formRef.current?.reset();
  }

  if (!userName) {
    return (
      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 12,
          color: "rgba(255,250,236,0.35)",
          letterSpacing: "0.1em",
          margin: 0,
        }}
      >
        Sign in to leave a comment.
      </p>
    );
  }

  return (
    <form ref={formRef} action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <input type="hidden" name="postSlug" value={postSlug} />
      <textarea
        name="content"
        required
        rows={4}
        placeholder="Write a comment…"
        style={{
          width: "100%",
          background: "rgba(255,250,236,0.04)",
          border: "1px solid rgba(255,250,236,0.1)",
          borderRadius: 2,
          padding: "12px 14px",
          fontSize: 14,
          lineHeight: 1.6,
          color: "rgba(255,250,236,0.85)",
          fontFamily: "var(--font-display), sans-serif",
          outline: "none",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          type="submit"
          style={{
            background: "transparent",
            border: "1px solid rgba(79,195,255,0.35)",
            color: "#4FC3FF",
            padding: "8px 18px",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            cursor: "pointer",
            borderRadius: 2,
          }}
        >
          Post comment
        </button>
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
            color: "rgba(255,250,236,0.3)",
            letterSpacing: "0.1em",
          }}
        >
          as {userName}
        </span>
      </div>
    </form>
  );
}
