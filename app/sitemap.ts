import type { MetadataRoute } from "next";
import { getAllEssays } from "@/lib/essays";
import { SITE_URL } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const essayEntries: MetadataRoute.Sitemap = getAllEssays().map((essay) => ({
    url: `${SITE_URL}/essays/${essay.slug}`,
    lastModified: essay.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...essayEntries,
  ];
}
