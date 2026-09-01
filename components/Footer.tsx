import { profile } from "@/lib/data";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="px-6 py-8 border-t border-[#e4ded6]">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-6">
        <p className="text-sm text-[#6b6460]">
          &copy; 2026 {profile.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <a
            href={profile.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-[#6b6460] hover:text-[#111111] transition-colors"
          >
            <XIcon className="w-4 h-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#6b6460] hover:text-[#111111] transition-colors"
          >
            <LinkedInIcon className="w-4 h-4" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#6b6460] hover:text-[#111111] transition-colors"
          >
            <GitHubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
