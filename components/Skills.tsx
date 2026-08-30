import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="py-14 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#111111] mb-8">
          Skills
        </h2>

        <div className="divide-y divide-[#d9d4cc]">
          {skills.map((group) => (
            <div
              key={group.category}
              className="flex flex-col sm:flex-row sm:items-start gap-4 py-5"
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest text-[#4a4542] sm:w-44 shrink-0 pt-1"
              >
                {group.category}
              </p>
              <p className="text-sm leading-7 text-[#333333]">
                {group.items.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
