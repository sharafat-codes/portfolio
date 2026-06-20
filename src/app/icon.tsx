import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
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
          background: "linear-gradient(135deg, #15c9a3, #0c9e82)",
          color: "#03120d",
          fontSize: 280,
          fontWeight: 800,
          letterSpacing: -8,
          borderRadius: 110,
        }}
      >
        SA
      </div>
    ),
    { ...size },
  );
}
