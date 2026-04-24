import { blogs } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function Blogs() {
  return (
    <section id="blogs" className="py-16 px-6 border-t border-[#d9d4cc]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black tracking-tight text-[#111111] mb-12">
          Writing
        </h2>

        <div className="space-y-4">
          {blogs.map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-6 p-6 rounded-2xl border border-[#d9d4cc] bg-white hover:border-[#b8b0a2] transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#6b6460] uppercase tracking-widest">
                    {post.publication}
                  </span>
                  <span className="text-[#d9d4cc]">·</span>
                  <span className="text-xs font-semibold text-[#6b6460]">
                    {post.date}
                  </span>
                </div>
                <h3
                  style={{ fontFamily: "var(--font-lora)" }}
                  className="text-lg font-semibold text-[#111111] group-hover:text-[#555555] transition-colors leading-snug mb-2"
                >
                  {post.title}
                </h3>
                <p className="text-sm text-[#6b6460] leading-relaxed">
                  {post.description}
                </p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#b8b0a2] group-hover:text-[#111111] transition-colors shrink-0 mt-1" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
