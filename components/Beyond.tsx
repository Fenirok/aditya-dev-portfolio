import { certifications, recognition, type Row } from "@/lib/data";
import { ArrowUpRight } from "./Icons";
import Reveal from "./Reveal";

function Rows({ label, rows }: { label: string; rows: Row[] }) {
  return (
    <div>
      <p className="mb-[6px] font-mono text-[12px] uppercase tracking-[0.15em] text-green">{label}</p>
      <ul className="border-t border-lightest-navy">
        {rows.map((r) => {
          const inner = (
            <>
              <span className="w-[90px] shrink-0 pt-[4px] font-mono text-[12px] text-slate">{r.date}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-[22px] font-medium leading-[1.2] text-lightest-slate transition-colors group-hover:text-green">
                  {r.title}
                </span>
                <span className="mt-[4px] block text-[15px] leading-[1.5] text-slate">{r.subtitle}</span>
              </span>
              {r.url && (
                <ArrowUpRight className="mt-[6px] h-4 w-4 shrink-0 text-light-slate transition-transform group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:text-green" />
              )}
            </>
          );
          return (
            <li key={r.title} className="border-b border-lightest-navy">
              {r.url ? (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-[16px] px-[6px] py-[20px] transition-colors hover:bg-light-navy/60"
                >
                  {inner}
                </a>
              ) : (
                <div className="group flex gap-[16px] px-[6px] py-[20px]">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Beyond() {
  return (
    <Reveal as="section" id="beyond" className="mx-auto max-w-[1240px] py-[100px]">
      <div className="grid grid-cols-1 gap-[40px] lg:grid-cols-[minmax(0,380px)_minmax(0,620px)] lg:items-start lg:justify-between lg:gap-[140px]">
        {/* left: heading – stays put */}
        <div className="lg:pt-[24px]">
          <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-slate">Beyond the code</p>
          <h2 className="mt-[12px] font-serif text-[clamp(34px,5vw,48px)] font-medium leading-[1.1] text-lightest-slate">
            Talks, mentoring <em className="text-glow pr-[0.1em] italic">&amp; learning.</em>
          </h2>
          <p className="mt-[18px] max-w-[340px] text-[17px] leading-[1.5]">
            Research I’ve presented, communities I’ve helped run, and the courses that shaped how I build.
          </p>
        </div>

        {/* right: recognition, then certifications – scrolls on its own on desktop */}
        <div data-deck-scroll className="beyond-list flex flex-col gap-[44px]">
          <Rows label="Recognition" rows={recognition} />
          <Rows label="Certifications" rows={certifications} />
        </div>
      </div>
    </Reveal>
  );
}
