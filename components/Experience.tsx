import { experience } from "@/lib/data";
import CompanyLogo from "@/components/CompanyLogo";
import { ArrowUpRight } from "lucide-react";

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
                {job.url ? (
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg font-bold text-[#111111] hover:text-[#333333] transition-colors mt-3"
                  >
                    {job.company}
                  </a>
                ) : (
                  <p className="text-lg font-bold text-[#111111] mt-3">{job.company}</p>
                )}
                <p className="text-sm font-bold text-[#111111] mt-1">
                  {job.role}
                </p>
                <span className="inline-block mt-2 text-xs font-semibold text-[#333333] bg-[#e8e3d9] border border-[#d9d4cc] px-3 py-1.5 rounded-full">
                  {job.period}
                </span>
                <p className="text-sm text-[#4a4542] mt-2">{job.location}</p>
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
                    <p className="text-sm text-[#333333] leading-relaxed mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#f4f1ea] border border-[#d9d4cc] text-[#333333]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#4a4542] hover:text-[#111111] transition-colors ml-1"
                        >
                          View
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
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
