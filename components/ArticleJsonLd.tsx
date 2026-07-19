import { profile, SITE_URL } from "@/lib/data";

type ArticleJsonLdProps = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export default function ArticleJsonLd({ slug, title, description, date }: ArticleJsonLdProps) {
  const url = `${SITE_URL}/essays/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    url,
    mainEntityOfPage: url,
    author: {
      "@type": "Person",
      name: profile.name,
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
