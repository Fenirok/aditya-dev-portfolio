"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { Social } from "@/lib/data";
import type { FeedItem, Feeds } from "@/lib/feeds";
import { ArrowUpRight, FolderIcon, SocialIcon } from "./Icons";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const TAB_H = 72; // desktop: tall tabs for the big platform names (matches Experience)
const TAB_W = 140; // phones/tablets: width of each tab in the sideways row

export default function SocialsPanel({ socials, feeds }: { socials: Social[]; feeds: Feeds }) {
  // open on YouTube by default – the most visual feed
  const [active, setActive] = useState(() => Math.max(0, socials.findIndex((p) => p.name === "YouTube")));
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = socials[active];

  const onKey = (e: KeyboardEvent) => {
    const dir = ["ArrowDown", "ArrowRight"].includes(e.key) ? 1 : ["ArrowUp", "ArrowLeft"].includes(e.key) ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + socials.length) % socials.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-[minmax(0,360px)_minmax(0,820px)] lg:items-center lg:justify-between lg:gap-[90px]">
      {/* ---------- left: heading + platforms (same style as Experience) ---------- */}
      <div className="min-w-0">
        <h2 className="numbered-heading">Find Me Online</h2>

        <div
          role="tablist"
          aria-label="Social platforms"
          aria-orientation="vertical"
          onKeyDown={onKey}
          className="relative z-[3] -mx-[25px] flex w-[calc(100%+50px)] overflow-x-auto px-[25px] [scrollbar-width:none] lg:mx-0 lg:mt-[10px] lg:w-full lg:flex-col lg:overflow-visible lg:px-0"
        >
          {socials.map((p, i) => {
            const on = i === active;
            return (
              <button
                key={p.name}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`social-tab-${i}`}
                aria-selected={on}
                aria-controls="social-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                className={[
                  // phones/tablets: compact sideways tabs
                  "flex h-[44px] w-[140px] shrink-0 items-center justify-center gap-[8px] whitespace-nowrap border-b-2 px-[12px] font-mono text-[13px]",
                  // desktop: tall stacked tabs with large serif names
                  "lg:h-[72px] lg:w-full lg:justify-start lg:gap-[14px] lg:border-b-0 lg:border-l-2 lg:px-[28px] lg:font-serif lg:text-[clamp(28px,2.6vw,36px)] lg:font-medium",
                  "border-lightest-navy transition-all duration-300 ease-portfolio hover:bg-light-navy hover:text-green focus-visible:bg-light-navy",
                  on ? "text-green lg:pl-[36px]" : "text-slate lg:text-light-slate/70",
                ].join(" ")}
              >
                <SocialIcon name={p.name} className="h-[16px] w-[16px] shrink-0 lg:h-[22px] lg:w-[22px]" />
                {p.name}
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

      {/* ---------- right: content (no box – plain vertical list) ---------- */}
      <div id="social-panel" role="tabpanel" aria-labelledby={`social-tab-${active}`} className="min-w-0">
        <div key={s.name} className="fade-up [animation-duration:0.45s]">
          <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-green">
            {s.name === "YouTube" ? "Latest videos" : s.name === "Medium" ? "Latest blogs" : s.name === "GitHub" ? "Latest repositories" : s.handle}
          </p>
          <p className="mt-[8px] max-w-[560px] text-[16px] leading-[1.5] text-light-slate">{s.blurb}</p>

          <div className="mt-[18px]">
            {s.name === "YouTube" && <Videos items={feeds.youtube} social={s} />}
            {s.name === "Medium" && <Articles items={feeds.medium} social={s} />}
            {s.name === "GitHub" && <Repos items={feeds.github} social={s} />}
            {(s.name === "LinkedIn" || s.name === "X") && <ProfileOnly social={s} />}
          </div>

          <a href={allUrl(s)} {...ext} className="btn-outline btn-surge mt-[28px] inline-flex items-center gap-[8px] px-[24px] py-[16px] text-[13px]">
            {s.name === "LinkedIn" || s.name === "X" ? `View ${s.name} profile` : "View all"}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

/** Where "View all" goes for each platform. */
function allUrl(s: Social) {
  if (s.name === "YouTube") return s.url.replace(/\/$/, "") + "/videos";
  if (s.name === "GitHub") return s.url.replace(/\/$/, "") + "?tab=repositories";
  return s.url;
}

const row = "group border-b border-lightest-navy first:border-t";

/* ---------------- platform views ---------------- */

function Videos({ items, social }: { items: FeedItem[]; social: Social }) {
  if (!items.length) return <Empty social={social} what="videos" />;
  return (
    <ul>
      {items.map((v) => (
        <li key={v.url} className={row}>
          <a href={v.url} {...ext} className="flex items-center gap-[20px] py-[14px]">
            <div className="relative aspect-video w-[150px] shrink-0 overflow-hidden rounded-md bg-lightest-navy sm:w-[190px]">
              {v.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={v.image}
                  alt=""
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 ease-portfolio group-hover:scale-105"
                />
              )}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-amber/95 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="ml-[2px] h-[14px] w-[14px]" fill="currentColor" aria-hidden>
                    <polygon points="6 4 20 12 6 20" />
                  </svg>
                </span>
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 font-serif text-[22px] font-medium leading-[1.2] text-lightest-slate transition-colors group-hover:text-green">
                {v.title}
              </p>
              <p className="mt-[6px] font-mono text-[12px] text-slate">{[v.date, ...(v.meta ?? [])].filter(Boolean).join(" · ")}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-light-slate transition-transform group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:text-green" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function Articles({ items, social }: { items: FeedItem[]; social: Social }) {
  if (!items.length) return <Empty social={social} what="blogs" />;
  return (
    <ul>
      {items.map((a) => (
        <li key={a.url} className={row}>
          <a href={a.url} {...ext} className="flex gap-[20px] py-[18px]">
            <span className="w-[100px] shrink-0 pt-[6px] font-mono text-[12px] text-slate">{a.date}</span>
            <span className="min-w-0 flex-1">
              <span className="block font-serif text-[24px] font-medium leading-[1.2] text-lightest-slate transition-colors group-hover:text-green">
                {a.title}
              </span>
              {a.excerpt && <span className="mt-[6px] line-clamp-2 block text-[15px] leading-[1.5] text-light-slate">{a.excerpt}</span>}
              {!!a.meta?.length && (
                <span className="mt-[8px] block font-mono text-[11px] text-slate">{a.meta.map((t) => `#${t}`).join("  ")}</span>
              )}
            </span>
            <ArrowUpRight className="mt-[8px] h-4 w-4 shrink-0 text-light-slate transition-transform group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:text-green" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function Repos({ items, social }: { items: FeedItem[]; social: Social }) {
  if (!items.length) return <Empty social={social} what="repositories" />;
  return (
    <ul>
      {items.map((r) => (
        <li key={r.url} className={row}>
          <a href={r.url} {...ext} className="flex items-center gap-[20px] py-[18px]">
            <FolderIcon className="h-7 w-7 shrink-0 text-green" />
            <span className="min-w-0 flex-1">
              <span className="block break-words font-mono text-[17px] font-medium text-lightest-slate transition-colors group-hover:text-green">
                {r.title}
              </span>
              {r.excerpt && <span className="mt-[4px] line-clamp-1 block text-[15px] text-light-slate">{r.excerpt}</span>}
              <span className="mt-[6px] block font-mono text-[12px] text-slate">
                {[...(r.meta ?? []), r.date && `updated ${r.date}`].filter(Boolean).join(" · ")}
              </span>
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-light-slate transition-transform group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:text-green" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** LinkedIn and X don't allow reading posts without paid / approved API access. */
function ProfileOnly({ social }: { social: Social }) {
  return (
    <div className="flex items-center gap-[20px] border-y border-lightest-navy py-[24px]">
      <span className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-amethyst text-amber">
        <SocialIcon name={social.name} className="h-[24px] w-[24px]" />
      </span>
      <div>
        <p className="font-serif text-[24px] font-medium leading-[1.2] text-lightest-slate">See my latest posts on {social.name}</p>
        <p className="mt-[4px] text-[15px] leading-[1.5] text-slate">
          {social.name} doesn’t let other sites show posts, so head over to {social.handle} to catch up.
        </p>
      </div>
    </div>
  );
}

function Empty({ social, what }: { social: Social; what: string }) {
  return (
    <p className="border-y border-lightest-navy py-[24px] text-[15px] text-slate">
      Couldn’t load {what} right now — use “View all” to see them on {social.name}.
    </p>
  );
}
