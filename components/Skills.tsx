import { skills } from "@/lib/data";
import InlineSep from "@/components/InlineSep";

export default function Skills() {
  return (
    <section id="skills" className="py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight text-[#111111] mb-8">
          Skills
        </h2>

        <div className="divide-y divide-[#e4ded6]">
          {skills.map((group) => (
            <div
              key={group.category}
              className="flex flex-col sm:flex-row sm:items-start gap-4 py-5"
            >
              <p
                className="text-sm font-semibold uppercase tracking-widest text-[#4a4542] sm:w-44 shrink-0 pt-1"
              >
                {group.category}
              </p>
              <p className="text-base leading-7 text-[#333333]">
                {group.items.map((item, i) => (
                  <span key={item}>
                    {i > 0 && <InlineSep className="mx-2" />}
                    {item}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
