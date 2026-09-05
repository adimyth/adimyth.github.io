import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
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
              className="group flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-6 py-4 border-b border-line first:border-t hover:border-line-hover transition-colors"
            >
              <div className="min-w-0">
                <p className="text-base font-medium text-ink leading-snug">
                  {project.name}
                </p>
                <p className="text-sm text-quiet leading-7 mt-1">
                  {project.description}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 shrink-0 sm:mt-1 text-sm font-semibold text-quiet group-hover:text-ink transition-colors">
                <GitHubIcon className="w-4 h-4" />
                View on GitHub
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
