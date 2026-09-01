import Nav from "@/components/Nav";
import IdentityStrip from "@/components/IdentityStrip";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllEssays, formatEssayDate } from "@/lib/essays";
import { profile } from "@/lib/data";
import InlineSep from "@/components/InlineSep";

export const metadata = {
  title: `${profile.name}`,
  description:
    "Long-form writing on AI engineering, systems thinking, and building at scale.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const essays = getAllEssays();

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-paper px-6 pt-28 pb-16">
        <div className="max-w-3xl mx-auto">
          <IdentityStrip />
          <div>
            {essays.map((essay) => (
              <Link
                key={essay.slug}
                href={`/essays/${essay.slug}`}
                className="group flex items-start justify-between gap-6 py-6 border-b border-line first:border-t hover:border-line-hover transition-colors"
              >
                <div className="min-w-0">
                  <h2
                    style={{ fontFamily: "var(--font-lora)" }}
                    className="text-base font-medium text-ink group-hover:text-ink-soft transition-colors leading-snug mb-2"
                  >
                    {essay.title}
                    {essay.draft && (
                      <span
                        style={{ fontFamily: "var(--font-inter)" }}
                        className="ml-2 align-middle inline-block rounded-full border border-[#c2a24a] bg-[#f3e7c9] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#7d641f]"
                      >
                        Draft
                      </span>
                    )}
                  </h2>
                  <p className="text-sm text-quiet leading-relaxed mb-3">
                    {essay.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-quiet">
                    <span>{formatEssayDate(essay.date)}</span>
                    <InlineSep />
                    <span>{essay.readTime}</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-quiet group-hover:text-ink transition-colors shrink-0 mt-1" />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
