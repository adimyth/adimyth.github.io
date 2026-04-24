import { experience } from "@/lib/data";
import CompanyLogo from "@/components/CompanyLogo";

export default function Experience() {
  return (
    <section id="experience" className="py-16 px-6 border-t border-[#d9d4cc]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black tracking-tight text-[#111111] mb-12">
          Experience
        </h2>

        <div className="space-y-16">
          {experience.map((job, jobIdx) => (
            <div key={jobIdx} className="grid md:grid-cols-[220px_1fr] gap-10">
              {/* Company panel */}
              <div className="md:sticky md:top-24 md:self-start">
                <CompanyLogo logo={job.logo} company={job.company} />
                <a
                  href={job.url !== "#" ? job.url : undefined}
                  target={job.url !== "#" ? "_blank" : undefined}
                  rel={job.url !== "#" ? "noopener noreferrer" : undefined}
                  className="block text-lg font-bold text-[#111111] hover:text-[#555555] transition-colors mt-3"
                >
                  {job.company}
                </a>
                <p className="text-sm font-bold text-[#111111] mt-1">
                  {job.role}
                </p>
                <span className="inline-block mt-2 text-xs font-semibold text-[#444444] bg-[#e8e3d9] border border-[#d9d4cc] px-3 py-1.5 rounded-full">
                  {job.period}
                </span>
                <p className="text-sm text-[#6b6460] mt-2">{job.location}</p>
              </div>

              {/* Projects */}
              <div className="space-y-4">
                {job.projects.map((project, projIdx) => (
                  <div
                    key={projIdx}
                    className="p-6 rounded-2xl border border-[#d9d4cc] bg-white"
                  >
                    <h3
                      style={{ fontFamily: "var(--font-lora)" }}
                      className="text-lg font-semibold text-[#111111] mb-2"
                    >
                      {project.name}
                    </h3>
                    <p className="text-sm text-[#555555] leading-relaxed mb-3">
                      {project.description}
                    </p>
                    <ul className="space-y-1.5 mb-4">
                      {project.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="text-sm text-[#444444] flex gap-2.5 leading-relaxed"
                        >
                          <span className="text-[#999999] mt-1 shrink-0 text-xs">
                            ▸
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#f4f1ea] border border-[#d9d4cc] text-[#555555]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
