import { resumes } from "@/lib/data";
import { Download } from "lucide-react";

export default function Resume() {
  return (
    <section id="resume" className="py-24 px-6 border-t border-[#d9d4cc]">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-bold text-[#6b6460] uppercase tracking-widest mb-4">
          Resume
        </p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#111111] leading-tight mb-4">
          Pick your version.
        </h2>
        <p className="text-lg text-[#555555] mb-12 max-w-xl leading-relaxed">
          Same person, two lenses. Choose the resume that matches the role you
          are hiring for.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume.role}
              className="flex flex-col gap-5 rounded-2xl border border-[#d9d4cc] hover:border-[#b8b0a2] bg-[#faf8f4] p-8 transition-colors"
            >
              <div className="flex-1">
                <p className="text-xs font-bold text-[#6b6460] uppercase tracking-widest mb-2">
                  For
                </p>
                <h3 className="text-2xl font-black text-[#111111] mb-3">
                  {resume.role}
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed">
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
