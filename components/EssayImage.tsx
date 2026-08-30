import type { ImgHTMLAttributes } from "react";

export default function EssayImage({
  src,
  alt = "",
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const isSequenceDiagram =
    typeof src === "string" && src.includes("/diagrams/complete-flow");

  if (isSequenceDiagram) {
    return (
      <div className="diagram-fit" role="region" aria-label={alt || "Diagram"}>
        {/* SVGs from /public; next/image adds little for static export diagrams. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} {...props} />
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element -- static public assets in MDX
  return <img src={src} alt={alt} {...props} />;
}
