import { resumes } from "@/lib/data";
import { Download } from "lucide-react";

export default function Resume() {
  const visibleResumes = resumes.filter((resume) => !resume.hidden);

  return (
    <section id="resume" className="py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight text-ink mb-8">
          Resume
        </h2>

        {visibleResumes.map((resume) => (
          <div key={resume.role}>
            <p className="text-base text-ink-soft leading-7 mb-6 max-w-2xl">
              {resume.description}
            </p>
            <a
              href={resume.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-inverse text-inverse-fg text-sm font-semibold hover:bg-inverse-hover transition-colors w-fit"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
