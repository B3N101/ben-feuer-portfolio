import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Michigan Blue tile with Maize initials and underline, matching the site.
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#00274c",
        width: "100%",
        height: "100%",
        borderRadius: 7,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontSize: 17,
          fontWeight: 800,
          letterSpacing: "-1px",
          fontFamily: "sans-serif",
          color: "#ffcb05",
          lineHeight: 1,
        }}
      >
        BF
      </span>
      <div style={{ width: 16, height: 2, marginTop: 3, background: "#ffcb05" }} />
    </div>,
    { ...size },
  );
}
