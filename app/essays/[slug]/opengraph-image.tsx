import { ImageResponse } from "next/og";
import { getAllEssays, getEssay, formatEssayDate } from "@/lib/essays";
import { loadInterFonts } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Essay by Aditya Mishra";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllEssays().map((essay) => ({ slug: essay.slug }));
}

function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { meta } = getEssay(slug);
  const { regular: interRegular, bold: interBold } = await loadInterFonts();

  return new ImageResponse(
    (
      <div
        style={{
          background: "#f4f1ea",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Inter",
          position: "relative",
          padding: "80px",
        }}
      >
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

        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#4a4542",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          Essay
        </div>

        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#111111",
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          {meta.title}
        </div>

        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: "#333333",
            lineHeight: 1.5,
            maxWidth: 900,
            marginTop: 24,
          }}
        >
          {truncate(meta.description, 140)}
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 16,
            fontWeight: 700,
            color: "#4a4542",
            letterSpacing: "0.03em",
          }}
        >
          <div>{`${formatEssayDate(meta.date)} · ${meta.readTime}`}</div>
          <div>Aditya Mishra · adimyth.in</div>
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
