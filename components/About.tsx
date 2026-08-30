import { profile } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="pt-8 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-[#111111]">
              <span className="block">Systems thinker.</span>
              <span className="block">AI builder.</span>
            </h2>
          </div>

          <div>
            <p className="text-lg text-[#333333] leading-relaxed mb-8">
              {profile.about}
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p
                  style={{ fontFamily: "var(--font-lora)" }}
                  className="text-4xl font-semibold text-[#111111]"
                >
                  9+
                </p>
                <p className="text-sm text-[#4a4542] mt-1">
                  Years of experience
                </p>
              </div>
              <div>
                <p
                  style={{ fontFamily: "var(--font-lora)" }}
                  className="text-4xl font-semibold text-[#111111]"
                >
                  3
                </p>
                <p className="text-sm text-[#4a4542] mt-1">
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
