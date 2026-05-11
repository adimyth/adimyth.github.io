import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { getAllEssays, getEssay, formatEssayDate } from "@/lib/essays";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllEssays().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const { meta } = getEssay(slug);
    return { title: meta.title, description: meta.description };
  } catch {
    return {};
  }
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params;

  let essay: ReturnType<typeof getEssay>;
  try {
    essay = getEssay(slug);
  } catch {
    notFound();
  }

  const { meta, content } = essay!;

  return (
    <main className="min-h-screen bg-[#f4f1ea] px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/essays"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4f4945] hover:text-[#111111] transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          All essays
        </Link>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#4a4542] mb-5">
          <span>{formatEssayDate(meta.date)}</span>
          <span>·</span>
          <span>{meta.readTime}</span>
          {meta.publication && (
            <>
              <span>·</span>
              <span>{meta.publication}</span>
            </>
          )}
        </div>

        <h1
          style={{ fontFamily: "var(--font-lora)" }}
          className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight mb-10"
        >
          {meta.title}
        </h1>

        {meta.originalUrl && (
          <a
            href={meta.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4f4945] hover:text-[#111111] border border-[#d9d4cc] hover:border-[#a39b90] rounded-full px-4 py-2 transition-colors mb-10"
          >
            Originally published on {meta.publication ?? "Medium"}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}

        <hr className="border-[#d9d4cc] mb-10" />

        <div className="prose-essay">
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight],
              },
            }}
          />
        </div>

        {meta.originalUrl && (
          <div className="mt-16 pt-8 border-t border-[#d9d4cc]">
            <p className="text-sm text-[#4f4945] mb-3">
              This article was originally published on {meta.publication ?? "Medium"}.
            </p>
            <a
              href={meta.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#111111] hover:text-[#2f2b29] transition-colors"
            >
              Read on {meta.publication ?? "Medium"}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
