import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const photoData = readFileSync(join(process.cwd(), "public", "aditya.png"));
  const photoSrc = `data:image/png;base64,${photoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#111111",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt="Aditya Mishra"
          width={180}
          height={180}
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </div>
    ),
    { ...size }
  );
}
