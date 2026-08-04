"use client";

import { useRef, useState } from "react";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,250,236,0.04)",
  border: "1px solid rgba(255,250,236,0.12)",
  borderRadius: 2,
  padding: "12px 16px",
  color: "#FFFAEC",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono), monospace",
  fontSize: 10,
  letterSpacing: "0.25em",
  color: "#4FC3FF",
  textTransform: "uppercase",
  marginBottom: 8,
};

type Props = {
  action: (formData: FormData) => Promise<void>;
  defaultTitle?: string;
  defaultContent?: string;
  submitLabel?: string;
};

export function PostEditor({
  action,
  defaultTitle = "",
  defaultContent = "",
  submitLabel = "Publish →",
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");

    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();

      const ta = textareaRef.current;
      if (ta) {
        const start = ta.selectionStart ?? ta.value.length;
        const end = ta.selectionEnd ?? start;
        const before = ta.value.slice(0, start);
        const after = ta.value.slice(end);
        ta.value = `${before}\n![image](${url})\n${after}`;
        ta.selectionStart = ta.selectionEnd = start + url.length + 14;
        ta.focus();
      }
    } catch {
      setUploadError("Upload failed — try again");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <label style={labelStyle}>Title</label>
        <input
          name="title"
          required
          autoFocus
          defaultValue={defaultTitle}
          placeholder="Post title"
          style={{
            ...inputStyle,
            fontSize: 22,
            fontWeight: 600,
            fontFamily: "var(--font-display), sans-serif",
            letterSpacing: "-0.02em",
          }}
        />
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={labelStyle}>Content (Markdown)</span>
          <label
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: uploading ? "rgba(255,250,236,0.3)" : "#FF7A1A",
              cursor: uploading ? "default" : "pointer",
            }}
          >
            {uploading ? "Uploading…" : "+ Add photo"}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              style={{ display: "none" }}
            />
          </label>
        </div>
        {uploadError && (
          <div style={{ fontSize: 11, color: "#FF3D2E", marginBottom: 6, fontFamily: "var(--font-mono), monospace" }}>
            {uploadError}
          </div>
        )}
        <textarea
          ref={textareaRef}
          name="content"
          required
          rows={22}
          defaultValue={defaultContent}
          placeholder="Write your post in Markdown…"
          style={{
            ...inputStyle,
            fontSize: 14,
            lineHeight: 1.75,
            fontFamily: "var(--font-mono), monospace",
            resize: "vertical",
            padding: "16px",
          }}
        />
      </div>

      <div>
        <button
          type="submit"
          style={{
            background: "#FF7A1A",
            color: "#07090d",
            border: "none",
            padding: "12px 24px",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            cursor: "pointer",
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
