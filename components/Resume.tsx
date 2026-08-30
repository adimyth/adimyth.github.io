import { resumes } from "@/lib/data";
import { Download } from "lucide-react";

export default function Resume() {
  return (
    <section id="resume" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#111111] mb-2">
          Resume
        </h2>
        <p className="text-base text-[#4a4542] mb-8 leading-relaxed">
          Pick the version that best fits the role.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume.role}
              className="flex flex-col gap-5 rounded-2xl border border-[#d9d4cc] hover:border-[#6b6460] bg-[#faf8f4] p-8 transition-colors"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#111111] mb-3">
                  {resume.role}
                </h3>
                <p className="text-sm text-[#333333] leading-relaxed">
                  {resume.description}
                </p>
              </div>
              <a
                href={resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] text-[#f4f1ea] text-sm font-semibold hover:bg-[#333333] transition-colors w-fit"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
