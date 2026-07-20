import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getAllEssays, formatEssayDate } from "@/lib/essays";
import { profile } from "@/lib/data";

export const metadata = {
  title: `All Essays · ${profile.name}`,
  description:
    "Long-form writing on AI engineering, systems thinking, and building at scale.",
  alternates: { canonical: "/essays" },
};

export default function AllEssaysPage() {
  const essays = getAllEssays();

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#f4f1ea] px-6 pt-28 pb-16">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4f4945] hover:text-[#111111] transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <h1
            style={{ fontFamily: "var(--font-lora)" }}
            className="text-3xl font-bold text-[#111111] mb-10"
          >
            All Essays
          </h1>

          <div>
            {essays.map((essay) => (
              <Link
                key={essay.slug}
                href={`/essays/${essay.slug}`}
                className="group flex items-start justify-between gap-6 py-6 border-b border-[#d9d4cc] first:border-t hover:border-[#6b6460] transition-colors"
              >
                <div className="min-w-0">
                  <h2
                    style={{ fontFamily: "var(--font-lora)" }}
                    className="text-xl font-semibold text-[#111111] group-hover:text-[#2f2b29] transition-colors leading-snug mb-2"
                  >
                    {essay.title}
                  </h2>
                  <p className="text-sm text-[#4f4945] leading-relaxed mb-3">
                    {essay.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#4a4542]">
                    <span>{formatEssayDate(essay.date)}</span>
                    <span>·</span>
                    <span>{essay.readTime}</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#4a4542] group-hover:text-[#111111] transition-colors shrink-0 mt-1" />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
