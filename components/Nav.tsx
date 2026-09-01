"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

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
          ? "bg-[#f4f1ea]/95 backdrop-blur-sm border-b border-[#e4ded6]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/about"
          className="text-sm font-bold text-[#333333] hover:text-[#111111] transition-colors"
        >
          Aditya Mishra
        </Link>
        <ul className="flex items-center gap-8">
          <li>
            <Link
              href="/"
              className="text-sm font-bold text-[#333333] hover:text-[#111111] transition-colors"
            >
              Essays
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
