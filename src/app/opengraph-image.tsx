import { ImageResponse } from "next/og";

export const alt = "Sharafat Ali — Full-Stack Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0a0c10",
          backgroundImage:
            "radial-gradient(circle at 78% 18%, rgba(21,201,163,0.30), transparent 46%)",
          color: "#e8ebef",
          fontFamily: "sans-serif",
        }}
      >
        {/* top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #15c9a3, #0c9e82)",
              borderRadius: 18,
              color: "#03120d",
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            SA
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#8b929e",
              fontFamily: "monospace",
              letterSpacing: 2,
            }}
          >
            sharafatali.dev
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              fontSize: 30,
              color: "#15c9a3",
              fontFamily: "monospace",
              letterSpacing: 4,
            }}
          >
            FULL-STACK SOFTWARE ENGINEER
          </div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            I build the software
          </div>
          <div
            style={{
              display: "flex",
              gap: 18,
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            <span>your business</span>
            <span style={{ color: "#15c9a3" }}>runs on.</span>
          </div>
        </div>

        {/* bottom row */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {["Laravel", "Vue", "Next.js", "NestJS", "React Native", "Stripe"].map((t) => (
            <div
              key={t}
              style={{
                fontSize: 22,
                color: "#c6cad2",
                border: "1px solid #1d242c",
                background: "rgba(255,255,255,0.03)",
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
