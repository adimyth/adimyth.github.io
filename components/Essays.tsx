import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedEssays, formatEssayDate } from "@/lib/essays";

export default function Essays() {
  const essays = getFeaturedEssays();

  if (essays.length === 0) return null;

  return (
    <section id="writing" className="py-24 px-6 border-t border-[#d9d4cc]">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#4a4542] mb-3">
          Writing
        </p>
        <div className="flex items-end justify-between mb-12">
          <h2
            style={{ fontFamily: "var(--font-lora)" }}
            className="text-5xl md:text-6xl font-bold text-[#111111] leading-tight"
          >
            Essays
          </h2>
          <Link
            href="/essays"
            className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-[#4a4542] hover:text-[#111111] transition-colors pb-2"
          >
            View all
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-px">
          {essays.map((essay) => (
            <Link
              key={essay.slug}
              href={`/essays/${essay.slug}`}
              className="group flex items-start justify-between gap-6 py-7 border-b border-[#d9d4cc] first:border-t hover:border-[#6b6460] transition-colors"
            >
              <div className="min-w-0">
                <h3
                  style={{ fontFamily: "var(--font-lora)" }}
                  className="text-xl font-semibold text-[#111111] group-hover:text-[#333333] transition-colors leading-snug mb-2"
                >
                  {essay.title}
                </h3>
                <p className="text-sm text-[#4a4542] leading-relaxed mb-3">
                  {essay.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#6b6460]">
                  <span>{formatEssayDate(essay.date)}</span>
                  <span>·</span>
                  <span>{essay.readTime}</span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#6b6460] group-hover:text-[#111111] transition-colors shrink-0 mt-1" />
            </Link>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/essays"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#4a4542] hover:text-[#111111] transition-colors"
          >
            View all essays
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
