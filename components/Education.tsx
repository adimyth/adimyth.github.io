import { education } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="py-14 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#111111] mb-8">
          Education
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
          <div className="min-w-0">
            <p className="text-lg font-bold text-[#111111]">
              {education.institution}
            </p>
            <p className="text-sm font-semibold text-[#333333] mt-0.5">
              {education.degree}
            </p>
          </div>

          <p className="shrink-0 text-sm font-medium text-[#333333] sm:text-right">
            {education.period}
            <span aria-hidden="true" className="text-[#8a8178]"> · </span>
            {education.cgpa}
          </p>
        </div>
      </div>
    </section>
  );
}
