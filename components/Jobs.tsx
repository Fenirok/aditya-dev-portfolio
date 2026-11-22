"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { jobs } from "@/lib/data";
import Reveal from "./Reveal";

const TAB_H = 72; // desktop: tall tabs for the big company names
const TAB_W = 150; // phones/tablets: width of each tab in the sideways row

export default function Jobs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + jobs.length) % jobs.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <Reveal as="section" id="jobs" className="mx-auto max-w-[1200px] py-[100px]">
      {/* left: heading + companies · right (far side): role details */}
      <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-[minmax(0,420px)_minmax(0,640px)] lg:items-center lg:justify-between lg:gap-[100px]">
        <div className="min-w-0">
          <h2 className="numbered-heading">Where I’ve Worked</h2>

          <div
            role="tablist"
            aria-label="Companies"
            aria-orientation="vertical"
            onKeyDown={onKey}
            className="relative z-[3] -mx-[25px] flex w-[calc(100%+50px)] overflow-x-auto px-[25px] [scrollbar-width:none] lg:mx-0 lg:mt-[10px] lg:w-full lg:flex-col lg:overflow-visible lg:px-0"
          >
            {jobs.map((job, i) => {
              const on = active === i;
              return (
                <button
                  key={job.company}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${i}`}
                  aria-selected={on}
                  aria-controls={`panel-${i}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={[
                    // phones/tablets: compact sideways tabs
                    "flex h-[44px] w-[150px] shrink-0 items-center justify-center whitespace-nowrap border-b-2 px-[12px] font-mono text-[13px]",
                    // desktop: tall stacked tabs with large serif names
                    "lg:h-[72px] lg:w-full lg:justify-start lg:border-b-0 lg:border-l-2 lg:px-[28px] lg:font-serif lg:text-[clamp(28px,2.6vw,36px)] lg:font-medium",
                    "border-lightest-navy transition-all duration-300 ease-portfolio hover:bg-light-navy hover:text-green focus-visible:bg-light-navy",
                    on ? "text-green lg:pl-[36px]" : "text-slate lg:text-light-slate/70",
                  ].join(" ")}
                >
                  {job.company}
                </button>
              );
            })}

            {/* sliding highlight – vertical on desktop, horizontal below */}
            <span
              aria-hidden
              className="absolute left-0 top-0 z-10 hidden w-[3px] rounded bg-green transition-transform delay-100 duration-300 ease-portfolio lg:block"
              style={{ height: TAB_H, transform: `translateY(${active * TAB_H}px)` }}
            />
            <span
              aria-hidden
              className="absolute bottom-0 left-[25px] z-10 h-[2px] rounded bg-green transition-transform delay-100 duration-300 ease-portfolio lg:hidden"
              style={{ width: TAB_W, transform: `translateX(${active * TAB_W}px)` }}
            />
          </div>
        </div>

        <div className="relative w-full min-w-0">
          {jobs.map((job, i) => (
            <div
              key={job.company}
              id={`panel-${i}`}
              role="tabpanel"
              aria-labelledby={`tab-${i}`}
              hidden={active !== i}
              className="fade-up w-full py-[10px] [animation-duration:0.45s]"
            >
              <h3 className="mb-[6px] font-serif text-[clamp(28px,2.6vw,34px)] font-medium leading-[1.2] text-lightest-slate">
                <span>{job.title}</span>
                <span className="text-green">
                  &nbsp;@&nbsp;
                  {job.url ? (
                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="inline-link">
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                </span>
              </h3>
              <p className="mb-[26px] font-mono text-[13px] text-light-slate">
                {job.range} · {job.location}
              </p>
              <ul className="fancy-list text-[17px] leading-[1.55] md:text-[18px]">
                {job.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
