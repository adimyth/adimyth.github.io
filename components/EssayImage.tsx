"use client";

import { useEffect, useState, type ImgHTMLAttributes } from "react";
import { X } from "lucide-react";

export default function EssayImage({
  src,
  alt = "",
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [open, setOpen] = useState(false);
  const isSequenceDiagram = typeof src === "string" && src.includes("/diagrams/complete-flow");
  const isWideGraphic = typeof src === "string" && src.includes("manager-chain");

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const image = (
    // Static public assets in MDX do not benefit from next/image.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  );

  const trigger = (
    <button
      type="button"
      className={`essay-image-trigger${isWideGraphic ? " essay-image-trigger-wide" : ""}`}
      onClick={() => setOpen(true)}
      aria-label={`Open image: ${alt || "essay graphic"}`}
    >
      {image}
    </button>
  );

  return (
    <>
      {isSequenceDiagram ? (
        <div className="diagram-fit" role="region" aria-label={alt || "Diagram"}>
          {trigger}
        </div>
      ) : trigger}
      {open && (
        <div className="essay-image-lightbox" role="presentation" onClick={() => setOpen(false)}>
          <div className={`essay-image-lightbox-content${isWideGraphic ? " essay-image-lightbox-content-wide" : ""}`} role="dialog" aria-modal="true" aria-label={alt || "Essay graphic"} onClick={(event) => event.stopPropagation()}>
            <button type="button" className="essay-image-lightbox-close" onClick={() => setOpen(false)} aria-label="Close image">
              <X aria-hidden="true" size={22} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element -- static public assets in MDX */}
            <img src={src} alt={alt} {...props} />
          </div>
        </div>
      )}
    </>
  );
}
