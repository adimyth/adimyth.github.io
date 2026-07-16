import type { ImgHTMLAttributes } from "react";

export default function EssayImage({
  src,
  alt = "",
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  // Wide sequence diagrams need horizontal scroll; column-fit diagrams do not.
  const isWideDiagram =
    typeof src === "string" && src.includes("/diagrams/complete-flow");

  if (isWideDiagram) {
    return (
      <div className="diagram-scroll" role="region" aria-label={alt || "Diagram"}>
        {/* SVGs from /public; next/image adds little for static export diagrams. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} {...props} />
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element -- static public assets in MDX
  return <img src={src} alt={alt} {...props} />;
}
