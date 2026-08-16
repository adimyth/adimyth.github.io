type Props = {
  src: string;
  poster?: string;
  caption?: string;
};

export default function EssayVideo({ src, poster, caption }: Props) {
  return (
    <figure>
      {/* preload="metadata" so the page does not pull the whole file on load. */}
      <video src={src} poster={poster} controls preload="metadata" playsInline />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
