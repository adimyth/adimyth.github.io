type Props = {
  src: string;
  poster?: string;
  caption?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
};

export default function EssayVideo({ src, poster, caption, autoPlay = false, loop = false, muted = false }: Props) {
  return (
    <figure>
      {/* preload="metadata" so the page does not pull the whole file on load. */}
      <video src={src} poster={poster} controls autoPlay={autoPlay} loop={loop} muted={muted} preload="metadata" playsInline />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
