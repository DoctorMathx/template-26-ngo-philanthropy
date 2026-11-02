import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B1F3A",
          color: "#FFFFFF",
          fontSize: 120,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          borderRadius: 0,
        }}
      >
        M
      </div>
    ),
    { ...size },
  );
}
