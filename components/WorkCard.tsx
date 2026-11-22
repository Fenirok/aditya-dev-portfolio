"use client";

import { useState } from "react";
import { layers } from "@/lib/data";
import { ArrowUpRight } from "./Icons";

/** Hero side card: pick a layer of the stack to explore. */
export default function WorkCard() {
  const [active, setActive] = useState(0);
  const layer = layers[active];

  return (
    <div className="relative rounded-xl border border-lightest-navy bg-light-navy p-[22px] shadow-[10px_10px_0_0_rgba(135,169,107,0.35),0_30px_60px_-30px_rgba(90,62,43,0.45)] transition-transform duration-500 ease-portfolio lg:-rotate-1 lg:hover:rotate-0">

      <div className="mb-[16px] flex items-center gap-[10px] font-mono text-[12px] text-light-slate">
        <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-green shadow-[0_0_10px_var(--color-green)]" />
        What I work on
      </div>

      <div role="tablist" aria-label="What I work on" className="grid grid-cols-3 gap-[8px]">
        {layers.map((l, i) => (
          <button
            key={l.key}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`rounded-md border px-[10px] py-[9px] text-left transition-all duration-300 ${
              active === i
                ? "border-amethyst-light/70 bg-amethyst text-white shadow-[0_0_20px_-6px_var(--color-amethyst-light)]"
                : "border-lightest-navy text-slate hover:border-amethyst-light/40 hover:text-lightest-slate"
            }`}
          >
            <span className={`block font-mono text-[11px] ${active === i ? "text-green" : "text-dark-slate"}`}>0{i + 1}</span>
            <span className="mt-[2px] block text-[13px] leading-tight">{l.key}</span>
          </button>
        ))}
      </div>

      <Stack active={active} onPick={setActive} />

      <div key={active} className="fade-up [animation-duration:0.4s]" role="tabpanel">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-green">
          0{active + 1} / {layer.key}
        </p>
        <h3 className="mt-[6px] font-serif text-[28px] font-medium leading-[1.1] text-lightest-slate">{layer.title}</h3>
        <p className="mt-[10px] text-[15px] leading-[1.55] text-light-slate">{layer.body}</p>
        <ul className="mt-[14px] flex flex-wrap gap-[6px]">
          {layer.tags.map((t) => (
            <li key={t} className="rounded border border-lightest-navy px-[8px] py-[3px] font-mono text-[11px] text-light-slate">
              {t}
            </li>
          ))}
        </ul>
        <a
          href={layer.link.url}
          className="group mt-[18px] flex items-center justify-between border-b border-lightest-navy pb-[12px] text-[14px] text-lightest-slate transition-colors hover:text-green"
        >
          {layer.link.label}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
        </a>
      </div>
      <p className="mt-[12px] font-mono text-[11px] text-slate">Pick a layer to explore my work</p>
    </div>
  );
}

/**
 * Three tilted "layer" cards stacked in 3D. The active layer lifts up and
 * turns sage; click any plate to select it.
 */
function Stack({ active, onPick }: { active: number; onPick: (i: number) => void }) {
  const GAP = 60; // vertical spacing between plates (px, in 3D depth)

  return (
    <div className="relative mx-auto my-[4px] h-[250px] w-full max-w-[380px] [perspective:1000px]" aria-hidden>
      <div className="absolute left-1/2 top-[50%] h-0 w-0 [transform-style:preserve-3d] [transform:rotateX(58deg)_rotateZ(-34deg)]">
        {layers.map((l, i) => {
          const on = i === active;
          const z = (1 - i) * GAP + (on ? 16 : 0); // top plate highest
          return (
            <div
              key={l.key}
              onClick={() => onPick(i)}
              style={{ transform: `translate(-50%, -50%) translateZ(${z}px)` }}
              className={[
                "absolute left-0 top-0 h-[118px] w-[190px] cursor-pointer rounded-[14px] border p-[12px]",
                "transition-[transform,background-color,border-color,box-shadow] duration-500 ease-portfolio",
                on
                  ? "border-amethyst/70 bg-[#dfe7c8] shadow-[0_18px_30px_-8px_rgba(90,62,43,0.45)]"
                  : "border-[#d4c6b0] bg-light-navy shadow-[0_12px_20px_-10px_rgba(90,62,43,0.35)] hover:border-amethyst-light",
              ].join(" ")}
            >
              <span className={`block font-mono text-[10px] tracking-[0.04em] ${on ? "text-amethyst" : "text-dark-slate"}`}>
                {l.label}
              </span>
              <Wireframe kind={i} on={on} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Little UI sketches drawn on each plate. */
function Wireframe({ kind, on }: { kind: number; on: boolean }) {
  const line = on ? "border-amethyst/70" : "border-[#cdbfa8]";
  if (kind === 0)
    // Application: a screen with a square + two fields
    return (
      <div className="mt-[10px] flex items-start gap-[10px]">
        <span className={`block h-[38px] w-[38px] rounded-[4px] border ${line}`} />
        <span className={`mt-[8px] block h-[14px] w-[46px] rounded-[3px] border ${line}`} />
        <span className={`block h-[14px] w-[46px] rounded-[3px] border ${line}`} />
      </div>
    );
  if (kind === 1)
    // Platform: two chips bridged by an arrow (native ⇄ Flutter)
    return (
      <div className="mt-[14px] flex items-center gap-[8px]">
        <span className={`block h-[22px] w-[44px] rounded-full border ${line}`} />
        <span className={`font-mono text-[14px] leading-none ${on ? "text-amethyst" : "text-[#cdbfa8]"}`}>⇄</span>
        <span className={`block h-[22px] w-[44px] rounded-full border ${line}`} />
      </div>
    );
  // Services: rows of data
  return (
    <div className="mt-[14px] flex flex-col gap-[7px]">
      <span className={`block h-[8px] w-[150px] rounded-full border ${line}`} />
      <span className={`block h-[8px] w-[150px] rounded-full border ${line}`} />
      <span className={`block h-[8px] w-[96px] rounded-full border ${line}`} />
    </div>
  );
}
