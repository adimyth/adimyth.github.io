import { profile } from "@/lib/data";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export default function CTA() {
  return (
    <section className="py-16 px-6 border-t border-[#d9d4cc]">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-bold text-[#6b6460] uppercase tracking-widest mb-5">
          Get in touch
        </p>
        <h2 className="text-5xl md:text-6xl font-black tracking-tight text-[#111111] leading-tight mb-5">
          Have something
          <br />
          to build?
        </h2>
        <p className="text-lg text-[#555555] mb-8 max-w-lg leading-relaxed">
          I am open to full-time roles, contracts, and interesting
          conversations. The best way to reach me is by email.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-3 text-xl font-semibold text-[#111111] hover:text-[#555555] transition-colors"
        >
          <Mail className="w-5 h-5" />
          {profile.email}
        </a>

        <div className="flex items-center gap-5 mt-8 pt-8 border-t border-[#d9d4cc]">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b6460] hover:text-[#111111] transition-colors"
            aria-label="GitHub"
          >
            <GitHubIcon className="w-5 h-5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b6460] hover:text-[#111111] transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>
          <a
            href={profile.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b6460] hover:text-[#111111] transition-colors"
            aria-label="X"
          >
            <XIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
