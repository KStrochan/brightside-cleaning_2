import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "transparent" }}>
        <div style={{ position: "absolute", left: 1, top: 7, width: 24, height: 24, borderRadius: 12, background: "#2F4BFF" }} />
        <div style={{ position: "absolute", left: 17, top: 2, width: 14, height: 14, borderRadius: 7, background: "#BFE8FF", border: "2px solid #2F4BFF" }} />
        <div style={{ position: "absolute", left: 6, top: 12, width: 6, height: 6, borderRadius: 3, background: "#FFFFFF" }} />
      </div>
    ),
    size,
  );
}
