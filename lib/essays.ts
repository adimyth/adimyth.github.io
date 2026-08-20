import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type EssayMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  featured?: boolean;
  originalUrl?: string;
  publication?: string;
  /** Set `draft: true` in frontmatter to keep an essay out of the published site.
   *  Drafts still render locally under `next dev` so they can be worked on. */
  draft?: boolean;
};

const INCLUDE_DRAFTS = process.env.NODE_ENV !== "production";

const ESSAYS_DIR = path.join(process.cwd(), "content/essays");

export function getAllEssays(): EssayMeta[] {
  if (!fs.existsSync(ESSAYS_DIR)) return [];
  return fs
    .readdirSync(ESSAYS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(ESSAYS_DIR, f), "utf8");
      const { data } = matter(raw);
      return { slug, ...data } as EssayMeta;
    })
    .filter((e) => INCLUDE_DRAFTS || !e.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const ESSAYS_PER_PAGE = 5;

export function getEssayPage(page: number): { essays: EssayMeta[]; total: number; totalPages: number } {
  const all = getAllEssays();
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / ESSAYS_PER_PAGE));
  const essays = all.slice((page - 1) * ESSAYS_PER_PAGE, page * ESSAYS_PER_PAGE);
  return { essays, total, totalPages };
}

export function getFeaturedEssays(): EssayMeta[] {
  return getAllEssays().slice(0, 3);
}

export function formatEssayDate(date: string): string {
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getEssay(slug: string): { meta: EssayMeta; content: string } {
  const file = fs.readFileSync(path.join(ESSAYS_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(file);
  return { meta: { slug, ...data } as EssayMeta, content };
}
