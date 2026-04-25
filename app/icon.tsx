import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#07090d",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: "-1px",
          fontFamily: "sans-serif",
          background: "linear-gradient(180deg, #FF7A1A 0%, #FF3D2E 100%)",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        BF
      </span>
    </div>,
    { ...size },
  );
}
