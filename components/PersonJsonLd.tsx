import { profile, SITE_URL } from "@/lib/data";

export default function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    url: SITE_URL,
    email: profile.email,
    sameAs: [profile.github, profile.linkedin, profile.twitter],
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
