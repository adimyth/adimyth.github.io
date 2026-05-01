import Image from "next/image";
import { profile, upcomingEvent } from "@/lib/data";
import { Mail, Download } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 max-w-4xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
        {/* Text content */}
        <div className="flex-1 order-2 md:order-1">
          <div className="mb-3 inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full border-2 border-[#b8b0a2] text-sm text-[#6b6460]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Open to new opportunities
          </div>

          <div className="mb-6">
            <a
              href={upcomingEvent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full border-2 border-[#b8b0a2] text-xs md:text-sm text-[#6b6460] hover:border-[#111111] hover:text-[#111111] transition-colors whitespace-nowrap"
            >
              <span className="relative flex-shrink-0 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              Catch me at {upcomingEvent.name} · {upcomingEvent.dates}
            </a>
          </div>

          <h1
            style={{ fontFamily: "var(--font-lora)" }}
            className="text-6xl md:text-7xl font-bold tracking-tight mb-5 text-[#111111] leading-tight"
          >
            {profile.name}
          </h1>

          <p className="text-xl md:text-2xl font-semibold text-[#444444] mb-6">
            {profile.title}
          </p>

          <p className="max-w-xl text-lg text-[#555555] leading-relaxed mb-10">
            {profile.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] text-[#f4f1ea] font-semibold hover:bg-[#333333] transition-colors"
            >
              <Mail className="w-4 h-4" />
              Get in touch
            </a>
            <a
              href="#resume"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#111111] text-[#111111] font-semibold hover:bg-[#ede9e0] transition-colors"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </div>

          <div className="flex items-center gap-5 pb-10 md:pb-0">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b6460] hover:text-[#111111] transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon className="w-6 h-6" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b6460] hover:text-[#111111] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-6 h-6" />
            </a>
            <a
              href={profile.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b6460] hover:text-[#111111] transition-colors"
              aria-label="X"
            >
              <XIcon className="w-6 h-6" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-[#6b6460] hover:text-[#111111] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Profile photo */}
        <div className="flex-shrink-0 order-1 md:order-2 flex justify-start md:justify-end">
          <div className="relative w-28 h-28 md:w-72 md:h-72 rounded-2xl overflow-hidden border-2 border-[#d9d4cc]">
            <Image
              src="/aditya.png"
              alt={profile.name}
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
