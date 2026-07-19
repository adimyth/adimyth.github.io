import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";

export default function IdentityStrip() {
  return (
    <div className="pb-6 mb-6 border-b border-[#d9d4cc]">
      <h1
        style={{ fontFamily: "var(--font-lora)" }}
        className="text-xl font-semibold text-[#111111]"
      >
        {profile.name}
      </h1>
      <p className="text-sm text-[#4a4542] mt-1">{profile.title}</p>
      <Link
        href="/about"
        className="inline-flex items-center gap-1 text-sm font-semibold text-[#4a4542] hover:text-[#111111] transition-colors mt-3"
      >
        About
        <ArrowUpRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
