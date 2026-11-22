import { site, socials } from "@/lib/data";
import { ArrowUpRight, SocialIcon } from "./Icons";
import Reveal from "./Reveal";

export function Contact() {
  return (
    <Reveal as="section" id="contact" className="mx-auto mb-[100px] max-w-[640px] py-[100px] text-center">
      <h2 className="mb-[20px] font-mono text-[16px] font-normal text-green">What’s Next?</h2>
      <h3 className="mb-[20px] font-serif text-[clamp(48px,7vw,80px)] font-medium leading-[1.05] text-lightest-slate">
        Get In <em className="text-glow pr-[0.1em] italic">Touch</em>
      </h3>
      <p className="text-[17px] leading-[1.6] md:text-[20px]">
        I’m currently looking for new opportunities in mobile app and software development, and my inbox is always
        open. Whether you have a project idea, want to hire me, want to collab or sponsor a video, or just want to say
        hi — I’ll give it my best for you!
      </p>

      <div className="mt-[50px] flex flex-wrap items-center justify-center gap-[18px]">
        {/* Gmail web compose: opens in the visitor's current browser (a mailto: link
            would hand off to whatever desktop mail app the OS has, or stall if none) */}
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline btn-surge px-[28px] py-[20px] text-[14px]"
        >
          Say Hello
        </a>
        {/* the standout button: filled, so it's the first thing the eye lands on */}
        <a
          href={site.upwork}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-[10px] rounded border border-amethyst bg-amethyst px-[28px] py-[20px] font-mono text-[14px] leading-none text-white shadow-[0_14px_30px_-14px_rgba(90,62,43,0.8)] transition-all duration-300 ease-portfolio hover:-translate-x-[5px] hover:-translate-y-[5px] hover:shadow-[5px_5px_0_0_var(--color-amethyst-light)] focus-visible:-translate-x-[5px] focus-visible:-translate-y-[5px]"
        >
          <span className="relative flex h-[8px] w-[8px]">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amethyst-light opacity-75" />
            <span className="relative inline-flex h-[8px] w-[8px] rounded-full bg-amethyst-light" />
          </span>
          Hire me on Upwork
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </Reveal>
  );
}

export function Footer() {
  return (
    <footer className="site-footer flex flex-col items-center gap-[10px] p-[15px] text-center font-mono text-[12px] leading-[1.6] text-light-slate lg:flex-row lg:justify-between lg:p-0">
      <ul className="mx-auto flex w-full max-w-[270px] justify-center gap-[10px] md:hidden">
        {socials.map((s) => (
          <li key={s.name}>
            <a href={s.url} aria-label={s.name} target="_blank" rel="noopener noreferrer" className="block p-[10px] text-light-slate hover:text-green">
              <SocialIcon name={s.name} className="h-5 w-5" />
            </a>
          </li>
        ))}
      </ul>
      <p>© 2026 {site.name}. All rights reserved.</p>
      <p>Built by {site.name} with Next.js &amp; Tailwind CSS</p>
    </footer>
  );
}
