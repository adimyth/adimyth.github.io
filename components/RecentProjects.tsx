import { ArrowUpRight } from "lucide-react";
import { recentProjects } from "@/lib/data";

export default function RecentProjects() {
  return (
    <section id="projects" className="py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight text-[#111111] mb-8">
          Recent Projects
        </h2>

        <div>
          {recentProjects.map((project) => (
            <a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-6 py-4 border-b border-[#e4ded6] first:border-t hover:border-[#cfc8be] transition-colors"
            >
              <div className="min-w-0">
                <p className="text-base font-medium text-[#111111] leading-snug">
                  {project.name}
                </p>
                <p className="text-sm text-[#4a4542] leading-7 mt-1">
                  {project.description}
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#4a4542] group-hover:text-[#111111] transition-colors shrink-0 mt-1" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
