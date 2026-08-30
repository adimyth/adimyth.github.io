import { profile } from "@/lib/data";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export default function CTA() {
  return (
    <section className="py-14 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-semibold text-[#4a4542] uppercase tracking-widest mb-3">
          Get in touch
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#111111] leading-tight mb-4">
          Let&apos;s work together.
        </h2>
        <p className="text-base text-[#333333] mb-7 max-w-lg leading-relaxed">
          I&apos;m open to full-time roles, contracts, and thoughtful conversations.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-3 text-xl font-semibold text-[#111111] hover:text-[#333333] transition-colors"
        >
          <Mail className="w-5 h-5" />
          {profile.email}
        </a>

        <div className="flex items-center gap-5 mt-7">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4a4542] hover:text-[#111111] transition-colors"
            aria-label="GitHub"
          >
            <GitHubIcon className="w-5 h-5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4a4542] hover:text-[#111111] transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>
          <a
            href={profile.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4a4542] hover:text-[#111111] transition-colors"
            aria-label="X"
          >
            <XIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
