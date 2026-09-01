"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";

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
          ? "bg-paper/95 backdrop-blur-sm border-b border-line"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/about"
          className="text-sm font-bold text-ink-soft hover:text-ink transition-colors"
        >
          Aditya Mishra
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/about"
            className="text-sm font-bold text-ink-soft hover:text-ink transition-colors"
          >
            About
          </Link>
          <Link
            href="/"
            className="text-sm font-bold text-ink-soft hover:text-ink transition-colors"
          >
            Essays
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
