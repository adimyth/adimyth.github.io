"use client";

import { useState } from "react";

interface Props {
  logo: string;
  company: string;
}

export default function CompanyLogo({ logo, company }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-12 h-12 rounded-xl bg-[#111111] flex items-center justify-center">
        <span className="text-[#f4f1ea] text-lg font-bold">
          {company.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className="w-12 h-12 rounded-xl border border-[#d9d4cc] bg-white flex items-center justify-center overflow-hidden p-1.5">
      <img
        src={logo}
        alt={`${company} logo`}
        className="w-full h-full object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
