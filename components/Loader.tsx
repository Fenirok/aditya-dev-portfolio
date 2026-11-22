"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const DURATION = 2400; // ms – total intro time

// Lives for one page load only: a refresh / new visit resets it (intro plays),
// while client-side navigation (e.g. exiting /terminal) keeps it (intro skipped).
let playedThisPageLoad = false;

/**
 * Full-screen intro: the avatar fades in, a circular progress ring draws
 * around it, then the whole thing shrinks away into the site.
 * When finished it adds `loaded` to <body>, which un-pauses the
 * hero / nav entrance animations (see globals.css).
 */
export default function Loader() {
  const [done, setDone] = useState(() => playedThisPageLoad);

  useEffect(() => {
    if (playedThisPageLoad) return; // already played on this page load
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => {
      playedThisPageLoad = true;
      document.body.classList.add("loaded");
      setDone(true);
    };
    if (reduce) {
      finish();
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      document.body.style.overflow = "";
      finish();
    }, DURATION);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  // ring geometry (viewBox 0 0 200 200)
  const r = 92;
  const c = 2 * Math.PI * r;

  return (
    <div
      className="fixed inset-0 z-[99] flex items-center justify-center bg-dark-navy"
      style={{ animation: `loaderBgOut ${DURATION}ms ease-in-out forwards` }}
      aria-label="Loading"
      role="status"
    >
      <div className="relative h-[min(240px,60vw)] w-[min(240px,60vw)]" style={{ animation: `loaderOut ${DURATION}ms ease-in-out forwards` }}>
        {/* avatar */}
        <div
          className="absolute inset-[7%] overflow-hidden rounded-full"
          style={{ opacity: 0, animation: "avatarIn 0.6s cubic-bezier(0.645,0.045,0.355,1) 0.1s forwards" }}
        >
          <Image src="/avatar.png" alt="" fill sizes="220px" priority className="scale-[1.25] object-cover" />
        </div>

        {/* progress ring */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
          {/* track */}
          <circle cx="100" cy="100" r={r} fill="none" stroke="var(--color-lightest-navy)" strokeWidth="3" />
          {/* progress */}
          <circle
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c}
            style={{ animation: `ringFill 1.5s cubic-bezier(0.645,0.045,0.355,1) 0.3s forwards` }}
          />
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#87a96b" />
              <stop offset="100%" stopColor="#d5851f" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <style>{`
        @keyframes ringFill { to { stroke-dashoffset: 0; } }
        @keyframes avatarIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes loaderBgOut {
          0%, 80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
