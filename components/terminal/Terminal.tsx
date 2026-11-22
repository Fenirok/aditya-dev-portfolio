"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  about,
  certifications,
  featuredProjects,
  jobs,
  otherProjects,
  recognition,
  site,
  socials,
  type Project,
} from "@/lib/data";
import type { FeedItem, Feeds } from "@/lib/feeds";
import { banners } from "@/lib/terminal-banners";

/* ---------------- look ---------------- */
// dark walnut terminal in the site's palette
const C = {
  dim: "text-[#a8957d]",
  text: "text-[#efe6d8]",
  amber: "text-[#e09a3c]",
  sage: "text-[#a9c48e]",
  box: "rounded-md border border-[#3b2b20] bg-[#1d1611] p-[16px] sm:p-[20px]",
};
const HOST = "aditya@scriptrok";
const SECTIONS = ["about", "experience", "work", "beyond", "socials"] as const;
type Section = (typeof SECTIONS)[number];
const COMMANDS = [...SECTIONS, "help", "ls", "whoami", "pwd", "clear", "exit"];

type Entry = { id: number; node: ReactNode };

/* ---------------- small building blocks ---------------- */

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${C.amber} underline decoration-[#e09a3c]/40 underline-offset-[3px] hover:decoration-[#e09a3c]`}>
      {children}
    </a>
  );
}

function Banner({ name }: { name: string }) {
  return <pre className={`${C.sage} mb-[18px] overflow-x-auto text-[11px] leading-[1.15] sm:text-[13px]`}>{banners[name]}</pre>;
}

function Prompt({ cmd, path }: { cmd: string; path: string }) {
  return (
    <div className="mt-[18px] break-all">
      <span className={C.amber}>{HOST}</span>
      <span className={C.dim}> {path} </span>
      <span className={C.sage}>$</span> <span className={C.text}>{cmd}</span>
    </div>
  );
}

const Line = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`whitespace-pre-wrap ${className}`}>{children}</div>
);

/* ---------------- section outputs ---------------- */

function About() {
  const current = jobs[0];
  return (
    <div>
      <Banner name="about" />
      <div className="max-w-[900px]">
        <div className="space-y-[14px]">
          <p className={C.text}>{about.lead}</p>
          {about.paragraphs.map((p, i) => (
            <p key={i} className={C.text}>
              {p}
            </p>
          ))}
          <div className={C.box}>
            <p className={`${C.text} mb-[10px] font-bold`}>Quick Facts:</p>
            <ul className="space-y-[4px]">
              <li><span className={C.dim}>Role: </span><span className={C.text}>{site.role}</span></li>
              <li><span className={C.dim}>Currently: </span><span className={C.text}>{current.title} @ {current.company}</span></li>
              <li><span className={C.dim}>Location: </span><span className={C.text}>{site.location}</span></li>
              <li><span className={C.dim}>Education: </span><span className={C.text}>B.Tech CSE (Cyber Security), Techno Main Salt Lake · 2022–2026</span></li>
              <li><span className={C.dim}>Stack: </span><span className={C.text}>{about.skills.join(", ")}</span></li>
              <li><span className={C.dim}>Email: </span><A href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`}>{site.email}</A></li>
              <li><span className={C.dim}>Freelance: </span><A href={site.upwork}>Hire me on Upwork</A></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <div>
      <Banner name="experience" />
      <div className="space-y-[16px]">
        {jobs.map((j) => (
          <div key={j.company} className={C.box}>
            <p className={`${C.text} font-bold`}>
              {j.title} <span className={C.amber}>@ {j.company}</span>
            </p>
            <p className={`${C.dim} mb-[10px] text-[12px]`}>{j.range} · {j.location}</p>
            <ul className="space-y-[6px]">
              {j.points.map((p) => (
                <li key={p} className={`${C.text} flex gap-[10px]`}>
                  <span className={C.sage}>▹</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectLinks({ p }: { p: Project }) {
  const links = [
    p.github && <A key="gh" href={p.github}>[source]</A>,
    p.external && <A key="ext" href={p.external}>[live]</A>,
    p.playStore && <A key="ps" href={p.playStore}>[google play]</A>,
  ].filter(Boolean);
  return links.length ? <p className="mt-[8px] flex flex-wrap gap-[14px]">{links}</p> : null;
}

function Work() {
  return (
    <div>
      <Banner name="work" />
      <div className="space-y-[16px]">
        {featuredProjects.map((p) => (
          <div key={p.title} className={C.box}>
            <pre className={`${C.sage} mb-[10px] text-[12px] leading-[1.2]`}>
              {`+${"-".repeat(p.title.length + 2)}+\n| ${p.title} |  ${p.year}\n+${"-".repeat(p.title.length + 2)}+`}
            </pre>
            <p className={C.text}>{p.description}</p>
            <p className={`${C.dim} mt-[8px] text-[12px]`}>Technologies: {p.tech.join(", ")}</p>
            <ProjectLinks p={p} />
          </div>
        ))}
      </div>
      <p className={`${C.text} mb-[8px] mt-[22px] font-bold`}>Other projects:</p>
      <ul className="space-y-[10px]">
        {otherProjects.map((p) => (
          <li key={p.title}>
            <span className={C.amber}>{p.title}</span> <span className={C.dim}>({p.year})</span>
            <span className={C.text}> — {p.description}</span>
            <ProjectLinks p={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Beyond() {
  return (
    <div>
      <Banner name="beyond" />
      <div className="grid gap-[16px] lg:grid-cols-2">
        <div className={C.box}>
          <p className={`${C.text} mb-[10px] font-bold`}>Recognition:</p>
          <ul className="space-y-[10px]">
            {recognition.map((r) => (
              <li key={r.title}>
                <span className={C.amber}>{r.title}</span> <span className={C.dim}>· {r.date}</span>
                <p className={C.text}>{r.subtitle}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={C.box}>
          <p className={`${C.text} mb-[10px] font-bold`}>Certifications:</p>
          <ul className="space-y-[6px]">
            {certifications.map((c) => (
              <li key={c.title} className="flex gap-[10px]">
                <span className={C.sage}>✓</span>
                <span>
                  <span className={C.text}>{c.title}</span> <span className={C.dim}>· {c.date} · {c.subtitle}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FeedList({ title, items }: { title: string; items: FeedItem[] }) {
  if (!items.length) return null;
  return (
    <div className={C.box}>
      <p className={`${C.text} mb-[8px] font-bold`}>{title}</p>
      <ul className="space-y-[6px]">
        {items.map((it) => (
          <li key={it.url} className="flex gap-[10px]">
            <span className={C.sage}>→</span>
            <span>
              <A href={it.url}>{it.title}</A> {it.date && <span className={C.dim}>· {it.date}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Socials({ feeds }: { feeds: Feeds }) {
  const width = Math.max(...socials.map((s) => s.name.length)) + 2;
  return (
    <div>
      <Banner name="socials" />
      <div className={`${C.box} mb-[16px] overflow-x-auto`}>
        {socials.map((s) => (
          <div key={s.name} className="whitespace-pre">
            <span className={C.amber}>{s.name.padEnd(width)}</span>
            <A href={s.url}>{s.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</A>
          </div>
        ))}
        <div className="whitespace-pre">
          <span className={C.amber}>{"Upwork".padEnd(width)}</span>
          <A href={site.upwork}>hire me on Upwork</A>
        </div>
      </div>
      <div className="grid gap-[16px] lg:grid-cols-3">
        <FeedList title="Latest videos:" items={feeds.youtube} />
        <FeedList title="Latest blogs:" items={feeds.medium} />
        <FeedList title="Latest repos:" items={feeds.github} />
      </div>
    </div>
  );
}

function Help() {
  const rows: [string, string][] = [
    ["about", "who I am"],
    ["experience", "where I've worked"],
    ["work", "things I've built"],
    ["beyond", "talks, mentoring & certifications"],
    ["socials", "find me online + latest posts"],
    ["ls", "list sections"],
    ["whoami / pwd", "the usual"],
    ["clear", "clear the screen (Ctrl+L)"],
    ["exit", "back to the regular site"],
  ];
  return (
    <div>
      <Banner name="help" />
      {rows.map(([c, d]) => (
        <div key={c} className="whitespace-pre">
          <span className={C.amber}>{c.padEnd(16)}</span>
          <span className={C.text}>{d}</span>
        </div>
      ))}
      <p className={`${C.dim} mt-[10px]`}>Tip: ↑/↓ for history, Tab to autocomplete.</p>
    </div>
  );
}

/* ---------------- the terminal ---------------- */

export default function Terminal({ feeds }: { feeds: Feeds }) {
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [path, setPath] = useState("~");
  const [booted, setBooted] = useState(false);
  const [crt, setCrt] = useState(true);
  const history = useRef<string[]>([]);
  const histIdx = useRef(-1);
  const nextId = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = useCallback((node: ReactNode) => setEntries((e) => [...e, { id: nextId.current++, node }]), []);

  const toggleCrt = () => setCrt((v) => !v);

  /* ---- boot sequence ---- */
  useEffect(() => {
    const boot: ReactNode[] = [
      <Prompt key="p0" cmd="welcome" path="~" />,
      <div key="b" className="ml-[16px] mt-[14px] space-y-[14px]">
        <div>
          <Line className={C.text}>$ echo &quot;{site.name.toUpperCase()}&quot;</Line>
          <Line className={`${C.amber} font-bold`}>{site.name.toUpperCase()}</Line>
        </div>
      </div>,
      <div key="w" className="ml-[16px] mt-[14px]">
        <Line className={C.text}>$ whoami</Line>
        <Line className={C.sage}>{HOST}</Line>
      </div>,
      <div key="d" className="ml-[16px] mt-[14px]">
        <Line className={C.text}>$ pwd</Line>
        <Line className={C.sage}>/home/aditya/portfolio</Line>
      </div>,
      <div key="l" className="ml-[16px] mt-[14px]">
        <Line className={C.text}>$ ls</Line>
        <Line className={C.sage}>{SECTIONS.join("   ")}</Line>
      </div>,
      <p key="m" className={`${C.text} mt-[18px]`}>
        Welcome to {site.name}&apos;s terminal portfolio! Type <span className={C.amber}>help</span> to see available
        commands, or use the buttons below.
      </p>,
    ];
    // print the boot lines one by one (instantly if the visitor prefers reduced motion)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const at = (i: number) => (reduce ? 0 : 180 + i * 260);
    const timers = boot.map((n, i) => setTimeout(() => push(n), at(i)));
    timers.push(setTimeout(() => setBooted(true), at(boot.length)));
    return () => timers.forEach(clearTimeout);
  }, [push]);

  /* ---- keep the latest output in view & focus the prompt ---- */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // a section render scrolls to its own start; small outputs stick to the bottom
    const last = el.querySelector<HTMLElement>("[data-entry]:last-of-type");
    if (last && last.offsetHeight > el.clientHeight * 0.6) el.scrollTop = last.offsetTop - 12;
    else el.scrollTop = el.scrollHeight;
  }, [entries]);
  useEffect(() => {
    if (booted) inputRef.current?.focus();
  }, [booted]);

  /* ---- run a command ---- */
  const run = useCallback(
    (raw: string) => {
      const cmdLine = raw.trim();
      const [cmd0, ...args] = cmdLine.split(/\s+/);
      let cmd = (cmd0 || "").toLowerCase();
      if (cmdLine) history.current = [cmdLine, ...history.current].slice(0, 50);
      histIdx.current = -1;

      if (cmd === "clear") {
        setEntries([]);
        return;
      }
      if (cmd === "cd") {
        const target = (args[0] || "~").replace(/^\.?\/?/, "").replace(/\/$/, "");
        if (!target || target === "~" || target === "..") {
          setPath("~");
          push(<Prompt cmd={cmdLine} path={path} />);
          return;
        }
        cmd = target;
      }

      const shownPath = (SECTIONS as readonly string[]).includes(cmd) ? `~/${cmd}` : path;
      push(<Prompt cmd={cmdLine} path={path} />);
      if (!cmd) return;

      let out: ReactNode;
      switch (cmd) {
        case "help":
          out = <Help />;
          break;
        case "ls":
          out = <Line className={C.sage}>{SECTIONS.join("   ")}</Line>;
          break;
        case "whoami":
          out = <Line className={C.sage}>{HOST}</Line>;
          break;
        case "pwd":
          out = <Line className={C.sage}>/home/aditya/portfolio{path === "~" ? "" : path.slice(1)}</Line>;
          break;
        case "echo":
          out = <Line className={C.text}>{args.join(" ")}</Line>;
          break;
        case "about":
          out = <About />;
          break;
        case "experience":
          out = <Experience />;
          break;
        case "work":
          out = <Work />;
          break;
        case "beyond":
          out = <Beyond />;
          break;
        case "socials":
          out = <Socials feeds={feeds} />;
          break;
        case "sudo":
          out = <Line className={C.amber}>nice try. permission denied.</Line>;
          break;
        case "exit":
        case "gui":
        case "home":
          out = <Line className={C.dim}>logging out…</Line>;
          setTimeout(() => router.push("/"), 350);
          break;
        default:
          out = (
            <Line className={C.text}>
              command not found: <span className={C.amber}>{cmd}</span>. Type <span className={C.amber}>help</span> for a list of commands.
            </Line>
          );
      }
      setPath(shownPath);
      push(<div className="mt-[10px]">{out}</div>);
    },
    [feeds, path, push, router],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(history.current.length - 1, histIdx.current + 1);
      if (i >= 0) {
        histIdx.current = i;
        setInput(history.current[i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = histIdx.current - 1;
      histIdx.current = Math.max(-1, i);
      setInput(i >= 0 ? history.current[i] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const word = input.trim().toLowerCase();
      const hit = COMMANDS.filter((c) => c.startsWith(word));
      if (word && hit.length === 1) setInput(hit[0]);
      else if (word && hit.length > 1) push(<Line className={C.dim}>{hit.join("   ")}</Line>);
    } else if (e.key.toLowerCase() === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  };

  const quick = (s: Section) => {
    run(s);
    inputRef.current?.focus();
  };

  return (
    <div className="term-root flex h-[100dvh] flex-col bg-[#0e0a07] px-[12px] py-[14px] font-mono text-[13px] leading-[1.6] sm:px-[24px] sm:py-[22px] sm:text-[14px]">
      <div className="relative mx-auto flex min-h-0 w-full max-w-[1280px] flex-1 flex-col overflow-hidden rounded-lg border border-[#3b2b20] bg-[#15100c] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
        {/* title bar */}
        <div className="flex items-center justify-between gap-[12px] border-b border-[#3b2b20] px-[14px] py-[10px]">
          <div className="flex min-w-0 items-center gap-[10px]">
            <span className="hidden gap-[6px] sm:flex" aria-hidden>
              <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f56]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#ffbd2e]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#27c93f]" />
            </span>
            <span className="truncate">
              <span className={C.sage}>&gt;_</span> <span className={C.amber}>{HOST}</span> <span className={C.dim}>{path}</span>
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-[8px]">
            <button
              type="button"
              onClick={toggleCrt}
              aria-pressed={crt}
              className={`rounded border px-[10px] py-[4px] text-[12px] transition-colors ${crt ? "border-[#e09a3c]/60 text-[#e09a3c]" : "border-[#3b2b20] text-[#a8957d] hover:text-[#efe6d8]"}`}
            >
              CRT {crt ? "on" : "off"}
            </button>
            <Link href="/" className="rounded border border-[#3b2b20] px-[10px] py-[4px] text-[12px] text-[#a8957d] transition-colors hover:border-[#e09a3c]/60 hover:text-[#e09a3c]">
              exit ✕
            </Link>
          </div>
        </div>

        {/* output */}
        <div
          ref={scrollRef}
          onMouseUp={() => {
            if (!window.getSelection()?.toString()) inputRef.current?.focus();
          }}
          className={`term-scroll relative min-h-0 flex-1 overflow-y-auto px-[16px] pb-[24px] pt-[6px] sm:px-[22px] ${crt ? "crt-glow" : ""}`}
          aria-live="polite"
        >
          {entries.map((e) => (
            <div key={e.id} data-entry className="term-in">
              {e.node}
            </div>
          ))}
        </div>

        {/* input */}
        <div className="flex items-center gap-[10px] border-t border-[#3b2b20] px-[16px] py-[12px] sm:px-[22px]">
          <span className={C.sage}>$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={!booted}
            aria-label="Terminal command"
            placeholder={booted ? "type a command… (try 'help')" : ""}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-[#efe6d8] caret-[#e09a3c] outline-none placeholder:text-[#a8957d]/50 focus-visible:outline-none"
          />
        </div>

        {/* CRT scanlines */}
        {crt && <div aria-hidden className="crt-overlay pointer-events-none absolute inset-0" />}
      </div>

      {/* quick commands */}
      <nav aria-label="Quick commands" className="mx-auto mt-[14px] flex max-w-[1280px] flex-wrap justify-center gap-[8px]">
        {SECTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => quick(s)}
            className="rounded border border-[#3b2b20] bg-[#15100c] px-[14px] py-[7px] text-[12px] capitalize text-[#efe6d8] transition-colors hover:border-[#e09a3c]/70 hover:text-[#e09a3c]"
          >
            {s}
          </button>
        ))}
      </nav>
    </div>
  );
}
