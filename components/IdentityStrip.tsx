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
    </div>
  );
}
