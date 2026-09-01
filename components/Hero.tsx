import Image from "next/image";
import { profile } from "@/lib/data";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

function SummaryParagraph({ text }: { text: string }) {
  const { label, href } = profile.summaryLink;
  const index = text.indexOf(label);
  if (index === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-[#111111] underline underline-offset-4 decoration-[#c4bbb2] hover:decoration-[#111111] transition-colors"
      >
        {label}
      </a>
      {text.slice(index + label.length)}
    </>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="pt-20 md:pt-24 pb-8 px-6 max-w-4xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        {/* Text content */}
        <div className="flex-1 order-2 md:order-1">
          <h1
            style={{ fontFamily: "var(--font-lora)" }}
            className="text-6xl font-bold tracking-tight mb-5 text-[#111111] leading-tight"
          >
            {profile.name}
          </h1>

          <p className="text-base font-semibold text-[#333333] mb-6">
            {profile.title}
          </p>

          <div className="space-y-4 text-base font-medium leading-7 text-[#333333] mb-8">
            {profile.summary.map((paragraph) => (
              <p key={paragraph}>
                <SummaryParagraph text={paragraph} />
              </p>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4a4542] hover:text-[#111111] transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon className="w-6 h-6" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4a4542] hover:text-[#111111] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-6 h-6" />
            </a>
            <a
              href={profile.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4a4542] hover:text-[#111111] transition-colors"
              aria-label="X"
            >
              <XIcon className="w-6 h-6" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-[#4a4542] hover:text-[#111111] transition-colors"
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
