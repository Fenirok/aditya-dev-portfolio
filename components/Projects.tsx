"use client";

import { useState } from "react";
import { otherProjects, socials } from "@/lib/data";
import { ExternalIcon, FolderIcon, GitHubIcon, PlayStoreIcon } from "./Icons";
import Reveal from "./Reveal";

const GRID_LIMIT = 6;

export default function Projects() {
  const [showMore, setShowMore] = useState(false);
  const shown = showMore ? otherProjects : otherProjects.slice(0, GRID_LIMIT);
  const github = socials.find((s) => s.name === "GitHub")?.url;

  return (
    <section className="mt-[90px] flex flex-col items-center py-[100px]">
      <Reveal className="text-center">
        <h2 className="font-serif text-[clamp(32px,5vw,44px)] font-medium text-lightest-slate">Other Noteworthy Projects</h2>
        <a href={github} target="_blank" rel="noopener noreferrer" className="inline-link mx-auto mt-[10px] inline-block font-mono text-[14px]">
          view the archive
        </a>
      </Reveal>

      <ul className="relative mt-[50px] grid w-full grid-cols-1 gap-[15px] sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => {
          const link = p.external || p.playStore || p.github;
          return (
            <Reveal as="li" key={p.title} delay={(i % 3) * 100} className="group relative cursor-default">
              <div className="flex h-full flex-col items-start justify-between overflow-auto rounded border border-lightest-navy bg-light-navy px-[1.75rem] group-hover:border-amethyst-light/60 group-hover:shadow-[0_20px_40px_-20px_rgba(135,169,107,0.45)] py-[2rem] shadow-[0_10px_30px_-15px_var(--color-navy-shadow)] transition-all duration-300 ease-portfolio group-hover:-translate-y-[7px] group-focus-within:-translate-y-[7px]">
                <header className="w-full">
                  <div className="mb-[35px] flex items-center justify-between">
                    <FolderIcon className="h-10 w-10 text-green" />
                    <div className="-mr-[10px] flex items-center text-light-slate">
                      {p.github && (
                        <a href={p.github} aria-label="GitHub Link" target="_blank" rel="noopener noreferrer" className="relative z-[2] px-[7px] py-[5px] hover:text-green">
                          <GitHubIcon className="h-5 w-5" />
                        </a>
                      )}
                      {p.external && (
                        <a href={p.external} aria-label="External Link" target="_blank" rel="noopener noreferrer" className="relative z-[2] px-[7px] py-[5px] hover:text-green">
                          <ExternalIcon className="h-[22px] w-[22px]" />
                        </a>
                      )}
                      {p.playStore && (
                        <a
                          href={p.playStore}
                          aria-label="Get it on Google Play"
                          title="Google Play"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-[2] px-[7px] py-[5px] hover:text-green"
                        >
                          <PlayStoreIcon className="h-[21px] w-[21px]" />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="mb-[10px] font-serif text-[28px] font-medium text-lightest-slate transition-colors group-hover:text-green">
                    {link ? (
                      <a href={link} target="_blank" rel="noopener noreferrer" className="static before:absolute before:inset-0 before:z-0 before:block before:content-['']">
                        {p.title}
                      </a>
                    ) : (
                      p.title
                    )}
                  </h3>
                  <p className="text-[17px] leading-[1.5] text-light-slate">{p.description}</p>
                </header>
                <footer>
                  <ul className="mt-[20px] flex flex-wrap gap-x-[15px] font-mono text-[12px] leading-[1.75]">
                    {p.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </footer>
              </div>
            </Reveal>
          );
        })}
      </ul>

      {otherProjects.length > GRID_LIMIT && (
        <button onClick={() => setShowMore((s) => !s)} className="btn-outline mx-auto mt-[80px] px-[28px] py-[20px] text-[14px]">
          Show {showMore ? "Less" : "More"}
        </button>
      )}
    </section>
  );
}
