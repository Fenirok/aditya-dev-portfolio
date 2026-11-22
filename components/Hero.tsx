import Link from "next/link";
import { site } from "@/lib/data";
import WorkCard from "./WorkCard";

export default function Hero() {
  const items = [
    <h1 key="a" className="mb-[20px] ml-[2px] font-mono text-[clamp(14px,5vw,16px)] font-normal text-green">
      Hi, I am
    </h1>,
    <h2 key="b" className="m-0 font-serif text-[clamp(48px,8vw,92px)] font-medium leading-[1] text-lightest-slate">
      {site.name}
      <span className="text-green">.</span>
    </h2>,
    <h3 key="c" className="mt-[10px] font-serif text-[clamp(36px,6vw,64px)] font-normal leading-[1.05] text-slate">
      I can build for{" "}
      {/* slot-machine roll: you → me → everyone → (loop) */}
      <span className="roll-words" aria-label="you, me, everyone">
        <span className="roll-track" aria-hidden>
          {["you", "me", "everyone", "you"].map((w, i) => (
            <em key={i} className="text-glow pr-[0.1em] font-medium italic">
              {w}
              <span className="text-slate not-italic">.</span>
            </em>
          ))}
        </span>
      </span>
    </h3>,
    <p key="d" className="mt-[20px] max-w-[540px] text-[clamp(16px,2.2vw,19px)] leading-[1.5]">
      {site.intro}
    </p>,
    <div key="e" className="mt-[44px] flex flex-wrap items-center gap-[28px]">
      <a href="#about" className="btn-outline btn-surge px-[28px] py-[20px] text-[14px]">
        Explore
      </a>
      <Link href="/terminal" className="group font-mono text-[14px] text-lightest-slate transition-colors hover:text-green">
        <span className="text-green">&gt;_</span> Access terminal
      </Link>
    </div>,
  ];

  return (
    <section className="grid min-h-screen items-center gap-[60px] py-[150px] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:py-[110px]">
      <div className="flex flex-col items-start">
        {items.map((item, i) => (
          <div key={i} className="fade-up" style={{ animationDelay: `${(i + 1) * 100 + 200}ms` }}>
            {item}
          </div>
        ))}
      </div>
      <div className="fade-up mx-auto w-full max-w-[460px]" style={{ animationDelay: "900ms" }}>
        <WorkCard />
      </div>
    </section>
  );
}
