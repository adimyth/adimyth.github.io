import { notFound } from "next/navigation";
import Link from "next/link";
import { isValidElement, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, Menu } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { getAllEssays, getEssay, formatEssayDate } from "@/lib/essays";
import remarkUnwrapImages from "@/lib/remark-unwrap-images";
import EssayImage from "@/components/EssayImage";
import EssayVideo from "@/components/EssayVideo";
import LinkPreview from "@/components/LinkPreview";
import { QuantizationGenerationChart, QuantizationGptqAblationChart, QuantizationMmluChart, QuantizationPerplexityChart, QuantizationSizeChart, QuantizationTradeoffChart } from "@/components/QuantizationCharts";
import { SpecKSweepChart, SpecWorkloadChart } from "@/components/SpeculativeDecodingCharts";
import RecommendationList, { RecommendationPath, RecommendationStart } from "@/components/RecommendationList";
import ClaudeHandoff from "@/components/ClaudeHandoff";
import Callout from "@/components/Callout";
import EssayCodeBlock from "@/components/EssayCodeBlock";
import EssayFigure from "@/components/EssayFigure";
import SectionSummary from "@/components/SectionSummary";
import TableNote from "@/components/TableNote";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import { profile } from "@/lib/data";
import InlineSep from "@/components/InlineSep";
import ThemeToggle from "@/components/ThemeToggle";

type Props = { params: Promise<{ slug: string }> };

function headingText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(headingText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return headingText(node.props.children);
  return "";
}

function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getChapters(source: string) {
  return Array.from(source.matchAll(/^## (.+)$/gm), ([, heading]) => {
    const fullTitle = heading.replace(/[`*_]/g, "");
    const title = fullTitle.split(":", 1)[0];
    return { id: headingId(fullTitle), title };
  });
}

function EssayHeading({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"h2">) {
  const text = headingText(children);
  const separator = text.indexOf(":");
  const title = separator === -1 ? null : text.slice(0, separator);
  const subtitle = separator === -1 ? null : text.slice(separator + 1).trim();
  const displaySubtitle = subtitle ? `${subtitle.charAt(0).toUpperCase()}${subtitle.slice(1)}` : null;

  return (
    <h2 id={headingId(text)} className={`scroll-mt-6 ${className ?? ""}`} {...props}>
      {title && displaySubtitle ? (
        <>
          <span className="essay-heading-title" style={{ display: "block" }}>{title}</span>
          <span
            className="essay-heading-subtitle"
            style={{ color: "var(--faint)", display: "block", fontSize: "0.66em", fontWeight: 500, letterSpacing: "-0.01em", marginTop: "0.4rem" }}
          >
            {displaySubtitle}
          </span>
        </>
      ) : children}
    </h2>
  );
}

function EssayTable({ children, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="essay-table-scroll">
      <table {...props}>{children}</table>
    </div>
  );
}

export async function generateStaticParams() {
  return getAllEssays().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const { meta } = getEssay(slug);
    const url = `/essays/${slug}`;
    return {
      title: meta.title,
      description: meta.description,
      alternates: { canonical: url },
      // The root layout defines a full openGraph/twitter object, and Next does not
      // merge title/description into it. Without these the share card falls back
      // to the site-level card instead of the essay.
      openGraph: {
        title: meta.title,
        description: meta.description,
        url,
        siteName: profile.name,
        type: "article",
        publishedTime: meta.date,
        authors: [profile.name],
      },
      twitter: {
        card: "summary_large_image",
        title: meta.title,
        description: meta.description,
        creator: "@adimyth",
        site: "@adimyth",
      },
    };
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
  const chapters = getChapters(content);

  return (
    <main className="min-h-screen bg-paper px-6 py-16">
      <ArticleJsonLd
        slug={meta.slug}
        title={meta.title}
        description={meta.description}
        date={meta.date}
      />
      <div className="relative mx-auto max-w-[42.5rem]">
        <article className="min-w-0">
        <div className="mb-12 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-quiet hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All essays
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-quiet mb-5">
          <span>{formatEssayDate(meta.date)}</span>
          <InlineSep />
          <span>{meta.readTime}</span>
          {meta.publication && (
            <>
              <InlineSep />
              <span>{meta.publication}</span>
            </>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.035em] text-ink leading-[1.08] mb-10">
          {meta.title}
        </h1>

        {chapters.length > 0 && (
          <nav aria-label="Essay chapters" className="mb-10 rounded-xl border border-line-strong bg-surface px-5 py-4 min-[1600px]:hidden">
            <p className="text-xs font-bold tracking-[0.12em] uppercase text-quiet">Chapters</p>
            <ol className="mt-4 grid gap-y-3 text-sm">
              {chapters.map((chapter) => (
                <li key={chapter.id}>
                  <a
                    href={`#${chapter.id}`}
                    className="text-ink-soft underline decoration-line-hover underline-offset-4 transition-colors hover:text-ink"
                  >
                    {chapter.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {meta.originalUrl && (
          <a
            href={meta.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-quiet hover:text-ink border border-line-strong hover:border-line-hover rounded-full px-4 py-2 transition-colors mb-10"
          >
            Originally published on {meta.publication ?? "Medium"}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}

        <hr className="border-line mb-10" />

        <div id="essay-content" className="prose-essay">
          <MDXRemote
            source={content}
            components={{ img: EssayImage, pre: EssayCodeBlock, table: EssayTable, EssayVideo, LinkPreview, QuantizationSizeChart, QuantizationPerplexityChart, QuantizationMmluChart, QuantizationGenerationChart, QuantizationTradeoffChart, QuantizationGptqAblationChart, SpecKSweepChart, SpecWorkloadChart, RecommendationList, RecommendationStart, RecommendationPath, Callout, Figure: EssayFigure, Summary: SectionSummary, TableNote, h2: EssayHeading }}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkUnwrapImages],
                rehypePlugins: [rehypeHighlight],
              },
            }}
          />
        </div>
        {process.env.NODE_ENV !== "production" && <ClaudeHandoff />}

        {meta.originalUrl && (
          <div className="mt-16 pt-8 border-t border-line">
            <p className="text-sm text-quiet mb-3">
              This article was originally published on {meta.publication ?? "Medium"}.
            </p>
            <a
              href={meta.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-ink-soft transition-colors"
            >
              Read on {meta.publication ?? "Medium"}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        )}
        </article>

        {chapters.length > 0 && (
          <aside className="fixed right-8 top-8 z-20 hidden min-[1600px]:block">
            <details open className="w-11 rounded-xl border border-line-strong bg-surface shadow-sm open:w-72">
              <summary className="flex size-11 cursor-pointer list-none items-center justify-center text-quiet [&::-webkit-details-marker]:hidden" aria-label="Show chapters">
                <Menu className="size-5" />
              </summary>
              <nav aria-label="Essay chapters" className="border-t border-line px-4 py-4">
                <p className="text-xs font-bold tracking-[0.12em] uppercase text-quiet">Chapters</p>
                <ol className="mt-4 grid gap-y-2 text-sm leading-6">
                  {chapters.map((chapter) => (
                    <li key={chapter.id}>
                      <a
                        href={`#${chapter.id}`}
                        className="text-quiet transition-colors hover:text-ink"
                      >
                        {chapter.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>
          </aside>
        )}

      </div>
    </main>
  );
}
