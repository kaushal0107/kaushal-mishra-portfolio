"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Off the home page the section anchors have to route back to it first.
  const to = (hash: string) => (isHome ? hash : `/${hash}`);

  // Highlight whichever section currently owns the upper half of the viewport.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-88px 0px -55% 0px", threshold: [0.05, 0.25, 0.5] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <div className="shell">
        <div
          className={`flex items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 transition-all duration-300 sm:px-4 ${
            scrolled
              ? "border-line bg-bg/75 shadow-lift backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <a
            href={to("#top")}
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={`${site.name} — back to top`}
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface font-display text-[13px] font-bold text-accent transition-colors group-hover:border-accent">
              KM
            </span>
            <span className="hidden font-display text-[15px] font-semibold tracking-tight sm:block">
              Kaushal Mishra
            </span>
          </a>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Section navigation"
          >
            {navLinks.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={to(l.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs tracking-tight transition-colors ${
                    isActive
                      ? "bg-surface-2 text-fg"
                      : "text-fg-muted hover:bg-surface-2/60 hover:text-fg"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <a
              href="/resume"
              className="hidden rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-xs text-fg-muted transition-colors hover:border-accent hover:text-fg sm:inline-block"
            >
              Résumé
            </a>
            <a
              href={`mailto:${site.email}`}
              className="rounded-lg bg-accent px-3 py-1.5 font-mono text-xs font-medium text-accent-ink transition-opacity hover:opacity-85"
            >
              Contact
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle section navigation"
              className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface text-fg-muted lg:hidden"
            >
              <span className="text-sm leading-none">{open ? "×" : "≡"}</span>
            </button>
          </div>
        </div>

        {open && (
          <nav
            className="mt-2 grid grid-cols-2 gap-1 rounded-2xl border border-line bg-bg/90 p-2 backdrop-blur-xl lg:hidden"
            aria-label="Section navigation"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={to(l.href)}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 font-mono text-xs text-fg-muted hover:bg-surface-2 hover:text-fg"
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
