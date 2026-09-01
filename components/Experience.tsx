import { experience } from "@/lib/data";
import CompanyLogo from "@/components/CompanyLogo";

export default function Experience() {
  return (
    <section id="experience" className="py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight text-ink mb-8">
          Experience
        </h2>

        <div>
          {experience.map((job, jobIdx) => (
            <div
              key={jobIdx}
              className="flex items-start gap-5 py-7 border-b border-line first:border-t"
            >
              <div className="shrink-0">
                <CompanyLogo logo={job.logo} company={job.company} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                  <div className="min-w-0">
                    {job.url ? (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-bold text-ink hover:text-ink-soft transition-colors"
                      >
                        {job.company}
                      </a>
                    ) : (
                      <p className="text-base font-bold text-ink">{job.company}</p>
                    )}
                    <p className="text-sm text-quiet mt-0.5">{job.location}</p>
                  </div>
                  <p className="shrink-0 self-start text-sm font-medium text-ink-soft">
                    {job.period}
                  </p>
                </div>

                {job.roles && job.roles.length > 1 ? (
                  <ol className="relative mt-4 pl-6 space-y-3">
                    <span
                      aria-hidden
                      className="absolute left-[3px] top-[10px] bottom-[10px] w-px bg-line"
                    />
                    {job.roles.map((r, i) => (
                      <li key={i} className="relative">
                        <span
                          aria-hidden
                          className={`absolute -left-6 top-[7px] w-[7px] h-[7px] rounded-full border ${
                            i === 0
                              ? "bg-ink-soft border-ink-soft"
                              : "bg-paper border-line-hover"
                          }`}
                        />
                        <p className="text-base font-semibold text-ink leading-snug">
                          {r.title}
                        </p>
                        <p className="text-sm font-medium text-quiet mt-0.5">
                          {r.period}
                        </p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-base font-semibold text-ink-soft mt-2">{job.role}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
