import { about, site } from "@/lib/data";
import Image from "next/image";
import Reveal from "./Reveal";

export default function About() {
  return (
    <Reveal
      as="section"
      id="about"
      className="mx-auto max-w-[1200px] py-[100px]"
    >
      {/* left: heading + story · right (far side): photo + tech */}
      <div className="grid grid-cols-1 gap-[50px] lg:grid-cols-[minmax(0,600px)_minmax(0,340px)] lg:items-center lg:justify-between lg:gap-[120px]">
        <div className="text-[17px] leading-[1.6] md:text-[18px]">
          <h2 className="numbered-heading">About Me</h2>
          <p className="mb-[22px] font-serif text-[clamp(24px,3vw,30px)] font-medium leading-[1.25] text-lightest-slate">
            {about.lead}
          </p>
          {about.paragraphs.map((p, i) => (
            <p key={i} className="mb-[16px]">
              {p}
            </p>
          ))}
        </div>

        <div>
          <div className="relative mx-auto w-[70%] max-w-[300px] lg:m-0 lg:w-[88%]">
            <div className="group relative block w-full rounded">
              <div className="relative z-[2] aspect-square overflow-hidden rounded bg-[radial-gradient(ellipse_at_25%_15%,#c3d2b1,#87a96b_45%,#6b5236)]">
                {site.photo ? (
                  <Image
                    src={site.photo}
                    alt="Aditya Halder"
                    fill
                    sizes="(min-width: 1024px) 300px, 70vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-serif text-[96px] font-medium italic text-white">
                    AH
                  </div>
                )}
              </div>
              <div className="absolute left-[20px] top-[20px] z-[1] h-full w-full rounded border-2 border-green transition-all duration-300 group-hover:left-[15px] group-hover:top-[15px]" />
            </div>
          </div>

          {/* skills sit under the photo */}
          <p className="mb-[12px] mt-[44px] text-[16px] leading-[1.5]">
            Technologies I’ve been working with recently:
          </p>
          <ul className="fancy-list grid grid-cols-[repeat(2,minmax(140px,1fr))] gap-x-[10px] p-0 font-mono text-[13px]">
            {about.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
