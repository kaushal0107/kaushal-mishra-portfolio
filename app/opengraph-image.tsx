import { ImageResponse } from "next/og";
import { site, YOE } from "@/lib/data";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#2DD4BF";

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
          background: "#090A0D",
          padding: "72px 80px",
          color: "#EDF0F5",
          fontFamily: "sans-serif",
        }}
      >
        {/* accent bloom */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -140,
            width: 620,
            height: 620,
            borderRadius: 999,
            background: "rgba(45,212,191,0.20)",
            filter: "blur(90px)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 46,
              height: 46,
              borderRadius: 12,
              border: "1px solid #262A33",
              background: "#12141A",
              alignItems: "center",
              justifyContent: "center",
              color: ACCENT,
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            KM
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#99A1B0" }}>
            {site.url.replace(/^https?:\/\//, "")}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 36,
              color: ACCENT,
              letterSpacing: "-0.02em",
            }}
          >
            {site.role}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 26,
              color: "#99A1B0",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Real-time streaming interfaces, server-rendered platforms, and applied AI — React,
            Next.js, TypeScript.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {[`${YOE}+ years experience`, "6 products shipped", "10,000+ users served"].map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                padding: "12px 20px",
                borderRadius: 999,
                border: "1px solid #262A33",
                background: "#12141A",
                fontSize: 22,
                color: "#99A1B0",
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
