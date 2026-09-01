import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllEssays, formatEssayDate } from "@/lib/essays";

export default function RecentEssays() {
  const essays = getAllEssays().slice(0, 5);

  return (
    <section id="essays" className="py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight text-[#111111] mb-8">
          Recent Essays
        </h2>

        <div>
          {essays.map((essay) => (
            <Link
              key={essay.slug}
              href={`/essays/${essay.slug}`}
              className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6 py-4 border-b border-[#e4ded6] first:border-t hover:border-[#cfc8be] transition-colors"
            >
              <p className="text-base font-medium text-[#111111] leading-snug min-w-0">
                {essay.title}
                {essay.draft && (
                  <span className="ml-2 align-middle inline-block rounded-full border border-[#c2a24a] bg-[#f3e7c9] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#7d641f]">
                    Draft
                  </span>
                )}
              </p>
              <p className="shrink-0 text-sm font-medium text-[#4a4542]">
                {formatEssayDate(essay.date)}
              </p>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-[#111111] hover:text-[#333333] transition-colors"
        >
          All essays
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
