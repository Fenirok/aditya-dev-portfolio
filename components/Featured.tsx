import { featuredProjects } from "@/lib/data";
import { ExternalIcon, GitHubIcon, PlayStoreIcon } from "./Icons";
import Reveal from "./Reveal";

export default function Featured() {
  return (
    <section id="projects" className="mx-auto max-w-[1000px] py-[100px]">
      <Reveal>
        <h2 className="numbered-heading">Some Things I’ve Built</h2>
      </Reveal>

      <ul>
        {featuredProjects.map((p, i) => {
          const even = i % 2 === 1; // content on the left, image on the right
          const link = p.external || p.playStore || p.github;
          return (
            <Reveal
              as="li"
              key={p.title}
              className="relative mb-[30px] grid grid-cols-12 items-center gap-[10px] md:mb-[100px] [&:last-child]:mb-0"
            >
              {/* content */}
              <div
                className={[
                  "relative z-[5] col-span-full row-start-1 h-full rounded p-[40px_25px_30px] md:p-0",
                  "bg-light-navy/90 md:bg-transparent",
                  even
                    ? "md:col-start-1 md:col-end-8 md:text-left"
                    : "md:col-start-7 md:col-end-13 md:text-right",
                  "flex flex-col justify-center md:block",
                ].join(" ")}
              >
                <p className="my-[10px] font-mono text-[13px] font-normal text-green">Featured Project</p>
                <h3 className="mb-[20px] font-serif text-[30px] font-medium text-lightest-slate md:text-[clamp(30px,5vw,38px)]">
                  {link ? (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-green">
                      {p.title}
                    </a>
                  ) : (
                    p.title
                  )}
                </h3>
                <div className="relative z-[2] rounded text-[17px] leading-[1.5] text-light-slate md:border md:border-lightest-navy md:bg-light-navy/95 md:p-[25px] md:backdrop-blur-sm md:shadow-[0_10px_30px_-15px_var(--color-navy-shadow)] md:text-[18px]">
                  <p>{p.description}</p>
                </div>
                <ul
                  className={`relative z-[2] mt-[25px] flex flex-wrap gap-x-[20px] gap-y-[5px] font-mono text-[13px] text-light-slate md:mb-0 ${
                    even ? "" : "md:justify-end"
                  }`}
                >
                  {p.tech.map((t) => (
                    <li key={t} className="whitespace-nowrap">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className={`relative mt-[10px] -ml-[10px] flex items-center text-lightest-slate ${even ? "" : "md:justify-end md:-mr-[10px] md:ml-0"}`}>
                  {p.github && (
                    <a href={p.github} aria-label="GitHub Link" target="_blank" rel="noopener noreferrer" className="p-[10px] hover:text-green">
                      <GitHubIcon className="h-5 w-5" />
                    </a>
                  )}
                  {p.external && (
                    <a href={p.external} aria-label="External Link" target="_blank" rel="noopener noreferrer" className="p-[10px] hover:text-green">
                      <ExternalIcon className="h-[22px] w-[22px]" />
                    </a>
                  )}
                  {p.playStore && (
                    <a
                      href={p.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-[10px] inline-flex items-center gap-[8px] rounded-full border border-lightest-navy bg-light-navy px-[14px] py-[7px] font-mono text-[12px] text-lightest-slate transition-colors hover:border-green hover:text-green"
                    >
                      <PlayStoreIcon className="h-[16px] w-[16px]" />
                      Get it on Google Play
                    </a>
                  )}
                </div>
              </div>

              {/* image */}
              <div
                className={[
                  "relative z-[1] col-span-full row-start-1 h-full opacity-25 md:opacity-100",
                  even ? "md:col-start-6 md:col-end-13" : "md:col-start-1 md:col-end-8",
                ].join(" ")}
              >
                <a
                  href={link || "#projects"}
                  target={link ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group relative block h-full w-full rounded bg-amethyst-light"
                  tabIndex={-1}
                  aria-hidden
                >
                  <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded transition-transform duration-500 ease-portfolio group-hover:scale-[1.015] md:min-h-[340px]">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                    ) : (
                      <ProjectArt title={p.title} tech={p.tech} alignRight={even} />
                    )}
                  </div>
                  
                </a>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

/** Placeholder "screenshot" used until a real image is added in lib/data.ts */
function ProjectArt({ title, tech, alignRight }: { title: string; tech: string[]; alignRight: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-[radial-gradient(ellipse_at_25%_15%,#c3d2b1_0%,#87a96b_45%,#6b5236_100%)] shadow-[0_20px_40px_-20px_rgba(90,62,43,0.5)] p-[30px]">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#fffaf2 1px, transparent 1px), linear-gradient(90deg, #fffaf2 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className={`relative flex gap-[6px] ${alignRight ? "md:justify-end" : ""}`}>
        <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f56]" />
        <span className="h-[10px] w-[10px] rounded-full bg-[#ffbd2e]" />
        <span className="h-[10px] w-[10px] rounded-full bg-[#27c93f]" />
      </div>
      <div className={`relative ${alignRight ? "md:text-right" : ""}`}>
        <div className="font-serif text-[clamp(40px,6vw,64px)] font-medium italic leading-none text-white">{title}</div>
        <div className="mt-[12px] font-mono text-[13px] text-white/85">{tech.slice(0, 3).join(" · ")}</div>
      </div>
    </div>
  );
}
