import EssayImage from "@/components/EssayImage";

type Props = {
  alt: string;
  caption: string;
  src: string;
  takeaway?: string;
};

export default function EssayFigure({ alt, caption, src, takeaway }: Props) {
  return (
    <figure className="essay-figure">
      <EssayImage src={src} alt={alt} />
      <figcaption>{caption}</figcaption>
      {takeaway && <p className="essay-figure-takeaway"><strong>What this shows:</strong> {takeaway}</p>}
    </figure>
  );
}
