import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="py-16 px-6 border-t border-[#d9d4cc]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black tracking-tight text-[#111111] mb-12">
          Skills
        </h2>

        <div className="divide-y divide-[#d9d4cc]">
          {skills.map((group, idx) => (
            <div
              key={group.category}
              className="flex flex-col sm:flex-row sm:items-start gap-4 py-5"
            >
              <p
                className={`text-xs font-bold uppercase tracking-widest sm:w-44 shrink-0 pt-1 ${
                  idx === 0 ? "text-[#111111]" : "text-[#6b6460]"
                }`}
              >
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className={`text-sm font-medium px-4 py-1.5 rounded-full border ${
                      idx === 0
                        ? "bg-[#111111] text-[#f4f1ea] border-[#111111]"
                        : "bg-white border-[#d9d4cc] text-[#333333]"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
