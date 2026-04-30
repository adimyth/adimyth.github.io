"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Writing", href: "#blogs" },
  { label: "Resume", href: "#resume" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f4f1ea]/95 backdrop-blur-sm border-b border-[#d9d4cc]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Nav links - hidden on mobile to prevent overlap with Hire Me */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-bold text-[#555555] hover:text-[#111111] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="mailto:mishraaditya6991@gmail.com"
          className="ml-auto inline-flex items-center text-sm font-bold px-5 py-2 rounded-full bg-[#111111] text-[#f4f1ea] hover:bg-[#333333] transition-colors"
        >
          Hire me
        </a>
      </nav>
    </header>
  );
}
