import { profile } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-16 px-6 border-t border-[#d9d4cc]">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-[#111111]">
              Systems thinker.
              <br />
              AI builder.
            </h2>
          </div>

          <div>
            <div className="space-y-4 mb-8">
              {profile.about.map((para, i) => (
                <p key={i} className="text-lg text-[#444444] leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p
                  style={{ fontFamily: "var(--font-lora)" }}
                  className="text-5xl font-bold text-[#111111]"
                >
                  8+
                </p>
                <p className="text-sm text-[#6b6460] mt-1">
                  Years of experience
                </p>
              </div>
              <div>
                <p
                  style={{ fontFamily: "var(--font-lora)" }}
                  className="text-5xl font-bold text-[#111111]"
                >
                  3
                </p>
                <p className="text-sm text-[#6b6460] mt-1">
                  Companies shipped at
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
