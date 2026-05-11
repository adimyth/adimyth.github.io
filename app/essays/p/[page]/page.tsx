import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getEssayPage, getAllEssays, formatEssayDate, ESSAYS_PER_PAGE } from "@/lib/essays";
import { profile } from "@/lib/data";
import EssayPagination from "@/components/EssayPagination";

export const dynamicParams = false;

type Props = { params: Promise<{ page: string }> };

export function generateStaticParams() {
  const total = getAllEssays().length;
  const totalPages = Math.max(1, Math.ceil(total / ESSAYS_PER_PAGE));
  // Always generate at least page 2; the page component calls notFound() when
  // the page number exceeds totalPages (e.g. only 1 page of essays exists).
  const lastPage = Math.max(2, totalPages);
  return Array.from({ length: lastPage - 1 }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: Props) {
  const { page } = await params;
  return {
    title: `Essays · Page ${page} — ${profile.name}`,
  };
}

export default async function EssaysPage({ params }: Props) {
  const { page: pageStr } = await params;
  const page = Number(pageStr);
  const { essays, totalPages } = getEssayPage(page);

  if (!page || page < 2 || page > totalPages || !Number.isInteger(page)) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea] px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/essays"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4f4945] hover:text-[#111111] transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <p className="text-xs font-bold uppercase tracking-widest text-[#4f4945] mb-3">
          Writing
        </p>
        <h1
          style={{ fontFamily: "var(--font-lora)" }}
          className="text-5xl font-bold text-[#111111] mb-14 leading-tight"
        >
          Essays
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

        <EssayPagination currentPage={page} totalPages={totalPages} />
      </div>
    </main>
  );
}
