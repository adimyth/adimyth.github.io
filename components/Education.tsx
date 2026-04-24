import { education, certifications } from "@/lib/data";
import { GraduationCap, BadgeCheck } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-16 px-6 border-t border-[#d9d4cc]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black tracking-tight text-[#111111] mb-12">
          Education
        </h2>

        <div className="space-y-4">
          {/* Degree */}
          <div className="flex items-start gap-6 p-6 rounded-2xl border border-[#d9d4cc] bg-white">
            <div className="w-12 h-12 rounded-xl bg-[#111111] flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-[#f4f1ea]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#111111]">
                {education.institution}
              </h3>
              <p className="text-base font-semibold text-[#555555] mt-1">
                {education.degree}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="text-sm font-semibold text-[#444444] bg-[#e8e3d9] border border-[#d9d4cc] px-4 py-1.5 rounded-full">
                  {education.period}
                </span>
                <span className="text-sm font-bold bg-[#111111] text-[#f4f1ea] px-4 py-1.5 rounded-full">
                  {education.cgpa}
                </span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex items-start gap-6 p-6 rounded-2xl border border-[#d9d4cc] bg-white"
            >
              <div className="w-12 h-12 rounded-xl bg-[#111111] flex items-center justify-center shrink-0">
                <BadgeCheck className="w-6 h-6 text-[#f4f1ea]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#111111]">
                  {cert.name}
                </h3>
                <p className="text-base font-semibold text-[#555555] mt-1">
                  {cert.issuer}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <span className="text-sm font-semibold text-[#444444] bg-[#e8e3d9] border border-[#d9d4cc] px-4 py-1.5 rounded-full">
                    {cert.year}
                  </span>
                  <span className="text-sm font-bold bg-[#111111] text-[#f4f1ea] px-4 py-1.5 rounded-full">
                    {cert.score}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
