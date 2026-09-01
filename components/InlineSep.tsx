import { cn } from "@/lib/utils";

export default function InlineSep({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block h-[0.55em] w-[1.5px] shrink-0 align-middle bg-[#a89f96]",
        className,
      )}
    />
  );
}
