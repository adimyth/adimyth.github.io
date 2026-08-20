import { education } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="py-16 px-6 border-t border-[#d9d4cc]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black tracking-tight text-[#111111] mb-12">
          Education
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 py-7 border-y border-[#d9d4cc]">
          <div className="min-w-0">
            <p className="text-lg font-bold text-[#111111]">
              {education.institution}
            </p>
            <p className="text-sm font-semibold text-[#333333] mt-0.5">
              {education.degree}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-[#333333] bg-[#e8e3d9] border border-[#d9d4cc] px-3 py-1.5 rounded-full">
              {education.period}
            </span>
            <span className="text-xs font-semibold text-[#333333] bg-[#e8e3d9] border border-[#d9d4cc] px-3 py-1.5 rounded-full">
              {education.cgpa}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
