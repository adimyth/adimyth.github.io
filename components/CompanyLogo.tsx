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
      <div className="w-12 h-12 rounded-xl bg-inverse flex items-center justify-center">
        <span className="text-inverse-fg text-lg font-bold">
          {company.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className="w-12 h-12 rounded-xl border border-line-strong bg-white flex items-center justify-center overflow-hidden p-1.5">
      <img
        src={logo}
        alt={`${company} logo`}
        className="w-full h-full object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
