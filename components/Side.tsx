import { socials } from "@/lib/data";
import { SocialIcon } from "./Icons";

const sideBase =
  "fade-in fixed bottom-0 z-10 hidden w-[40px] md:block [animation-delay:1s]";

export function SocialSide() {
  return (
    <div className={`${sideBase} left-[20px] lg:left-[40px]`}>
      <ul className="flex flex-col items-center after:mx-auto after:block after:h-[90px] after:w-px after:bg-light-slate after:content-['']">
        {socials.map((s) => (
          <li key={s.name} className="last:mb-[20px]">
            <a
              href={s.url}
              aria-label={s.name}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-[10px] text-light-slate transition-all duration-300 hover:-translate-y-[3px] hover:text-green"
            >
              <SocialIcon name={s.name} className="h-5 w-5" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
