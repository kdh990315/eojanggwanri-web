"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/#record", label: "조과 기록" },
  { href: "/#ai-species", label: "AI 어종 판별" },
  { href: "/#features", label: "앱 기능" },
];

export const SiteHeader = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => {
      setHasScrolled(window.scrollY >= 100);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        hasScrolled
          ? "border-b border-slate-200 bg-white/95 backdrop-blur"
          : "border-b-0 bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 md:h-20">
        <Link
          href="/"
          className="relative block h-8 w-[100px] shrink-0 md:h-10 md:w-[124px]"
          aria-label="어장관리 홈"
        >
          <Image
            src="/brand/brand-logo.png"
            alt=""
            fill
            sizes="(min-width: 768px) 124px, 100px"
            className="object-contain object-left"
          />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm font-bold text-slate-600 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
