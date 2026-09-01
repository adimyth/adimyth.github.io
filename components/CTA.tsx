import { profile } from "@/lib/data";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export default function CTA() {
  return (
    <section className="pt-8 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight text-ink leading-tight mb-4">
          Let&apos;s work together.
        </h2>
        <p className="text-base text-ink-soft mb-7 max-w-lg leading-7">
          I&apos;m open to full-time roles, contracts, and thoughtful conversations.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-3 text-base font-semibold text-ink hover:text-ink-soft transition-colors"
        >
          <Mail className="w-5 h-5" />
          {profile.email}
        </a>

        <div className="flex items-center gap-5 mt-7">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-quiet hover:text-ink transition-colors"
            aria-label="GitHub"
          >
            <GitHubIcon className="w-5 h-5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-quiet hover:text-ink transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>
          <a
            href={profile.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-quiet hover:text-ink transition-colors"
            aria-label="X"
          >
            <XIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
