"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";
import Image from "next/image";

export default function Nav() {
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [current, setCurrent] = useState("");

  // highlight the nav link for the section currently in view
  useEffect(() => {
    const ids = navLinks.map((l) => l.url.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const deckOn = () => document.body.classList.contains("deck-on");
    const io = new IntersectionObserver(
      (entries) => {
        if (deckOn()) return; // the horizontal deck reports its own position
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => !deckOn() && window.scrollY < 200 && setCurrent("");
    // desktop horizontal deck: follow the active slide
    const onDeck = (e: Event) => {
      const { index, navId } = (e as CustomEvent<{ index: number; navId: string }>).detail;
      setCurrent(navId);
      setScrolledToTop(index === 0);
    };
    window.addEventListener("scroll", onTop, { passive: true });
    window.addEventListener("deck:change", onDeck);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
      window.removeEventListener("deck:change", onDeck);
    };
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolledToTop(y < 50);
      if (Math.abs(y - last) > 5) {
        setHidden(y > last && y > 100);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("blur-content", menuOpen);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => window.innerWidth > 768 && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const compact = !scrolledToTop;

  return (
    <header
      className={[
        "fixed top-0 z-[11] flex w-full items-center justify-between px-[25px] md:px-[40px] lg:px-[50px]",
        "bg-navy/85 backdrop-blur-md transition-all duration-300 ease-portfolio",
        compact ? "h-[70px] shadow-[0_10px_30px_-10px_var(--color-navy-shadow)]" : "h-[100px]",
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <nav className="relative flex w-full items-center justify-between font-mono text-lightest-slate">
        <a href="#" aria-label="Aditya Halder – home" className="fade-in flex items-center gap-[14px]">
          <span className="block rounded-full ring-2 ring-green/70 ring-offset-2 ring-offset-navy">
            <Image src="/avatar.png" alt="" width={48} height={48} priority className="h-[48px] w-[48px] rounded-full" />
          </span>

          {/* "Aditya." flips to "ScriptRok." when the name itself is hovered */}
          <span aria-hidden className="group grid font-serif text-[28px] font-medium leading-none [perspective:400px]">
            <span className="col-start-1 row-start-1 origin-[50%_50%_-12px] text-amethyst [backface-visibility:hidden] transition-[transform,opacity] duration-500 ease-portfolio group-hover:opacity-0 group-hover:[transform:rotateX(90deg)]">
              Aditya<span className="text-amber">.</span>
            </span>
            <span className="col-start-1 row-start-1 origin-[50%_50%_-12px] text-amethyst opacity-0 [backface-visibility:hidden] [transform:rotateX(-90deg)] transition-[transform,opacity] duration-500 ease-portfolio group-hover:opacity-100 group-hover:[transform:rotateX(0deg)]">
              ScriptRok<span className="text-amber">.</span>
            </span>
          </span>
        </a>

        {/* desktop */}
        <div className="hidden items-center md:flex">
          <ol className="flex items-center">
            {navLinks.map((l, i) => (
              <li
                key={l.name}
                className="fade-down mx-[5px] text-[13px]"
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <a
                  href={l.url}
                  aria-current={current === l.url.slice(1) ? "location" : undefined}
                  className={`block rounded-md border px-[12px] py-[8px] transition-all duration-300 hover:text-green ${
                    current === l.url.slice(1)
                      ? "border-lightest-navy bg-light-navy text-green shadow-[inset_0_-2px_0_var(--color-green)]"
                      : "border-transparent"
                  }`}
                >
                  {l.name}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="relative z-[12] -mr-[15px] flex items-center justify-center p-[15px]"
          >
            <span className="relative block h-[24px] w-[30px]">
              <span
                className={`absolute right-0 h-[2px] rounded bg-green transition-all duration-300 ${
                  menuOpen ? "top-[11px] w-full rotate-45" : "top-[3px] w-[120%]"
                }`}
              />
              <span
                className={`absolute right-0 top-[11px] h-[2px] rounded bg-green transition-all duration-300 ${
                  menuOpen ? "w-0 opacity-0" : "w-full"
                }`}
              />
              <span
                className={`absolute right-0 h-[2px] rounded bg-green transition-all duration-300 ${
                  menuOpen ? "top-[11px] w-full -rotate-45" : "top-[19px] w-[80%]"
                }`}
              />
            </span>
          </button>

          <aside
            aria-hidden={!menuOpen}
            tabIndex={menuOpen ? 1 : -1}
            className={`fixed bottom-0 right-0 top-0 z-[9] flex h-screen w-[min(75vw,400px)] items-center justify-center bg-light-navy px-[10px] py-[50px] shadow-[-10px_0px_30px_-15px_var(--color-navy-shadow)] transition-all duration-300 ease-portfolio ${
              menuOpen ? "visible translate-x-0" : "invisible translate-x-full"
            }`}
          >
            <nav className="flex w-full flex-col items-center justify-between text-center font-mono text-lightest-slate">
              <ol className="w-full">
                {navLinks.map((l) => (
                  <li key={l.name} className="relative mx-auto mb-[10px] text-[clamp(14px,4vw,18px)]">
                    <a
                      href={l.url}
                      onClick={() => setMenuOpen(false)}
                      className="block w-full px-[20px] pb-[20px] pt-[3px] hover:text-green"
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        </div>
      </nav>
    </header>
  );
}
