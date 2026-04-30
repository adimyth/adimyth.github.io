import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const dynamic = "force-static";
export const alt = "Aditya Mishra - Sr. Technical Architect & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photoData = readFileSync(join(process.cwd(), "public", "aditya.png"));
  const photoSrc = `data:image/png;base64,${photoData.toString("base64")}`;

  const [interRegular, interBold] = await Promise.all([
    fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.8/files/inter-latin-400-normal.woff"
    ).then((r) => r.arrayBuffer()),
    fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.8/files/inter-latin-700-normal.woff"
    ).then((r) => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#f4f1ea",
          width: "100%",
          height: "100%",
          display: "flex",
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        {/* Subtle top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "#111111",
          }}
        />

        {/* Left: text content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 60px 80px 80px",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#6b6460",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            Portfolio
          </div>

          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#111111",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Aditya Mishra
          </div>

          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#444444",
              marginBottom: 24,
            }}
          >
            Sr. Technical Architect &amp; AI Engineer
          </div>

          <div
            style={{
              fontSize: 18,
              fontWeight: 400,
              color: "#555555",
              lineHeight: 1.6,
              maxWidth: 480,
            }}
          >
            8+ years building AI systems that are scalable, reliable, and
            extensible — from classical ML to Generative AI and Agentic AI.
          </div>

          <div
            style={{
              marginTop: "auto",
              fontSize: 15,
              fontWeight: 700,
              color: "#6b6460",
              letterSpacing: "0.05em",
            }}
          >
            adimyth.github.io
          </div>
        </div>

        {/* Right: profile photo */}
        <div
          style={{
            width: 340,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 80px 60px 20px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt="Aditya Mishra"
            width={260}
            height={320}
            style={{
              objectFit: "cover",
              objectPosition: "top",
              borderRadius: 20,
              border: "2px solid #d9d4cc",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interRegular, style: "normal", weight: 400 },
        { name: "Inter", data: interBold, style: "normal", weight: 700 },
      ],
    }
  );
}
