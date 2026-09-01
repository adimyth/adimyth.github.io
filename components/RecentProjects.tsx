import { ArrowUpRight } from "lucide-react";
import { recentProjects } from "@/lib/data";

export default function RecentProjects() {
  return (
    <section id="projects" className="py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight text-ink mb-8">
          Recent Projects
        </h2>

        <div>
          {recentProjects.map((project) => (
            <a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-6 py-4 border-b border-line first:border-t hover:border-line-hover transition-colors"
            >
              <div className="min-w-0">
                <p className="text-base font-medium text-ink leading-snug">
                  {project.name}
                </p>
                <p className="text-sm text-quiet leading-7 mt-1">
                  {project.description}
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-quiet group-hover:text-ink transition-colors shrink-0 mt-1" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
