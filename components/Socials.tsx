import { getFeeds } from "@/lib/feeds";
import { socials } from "@/lib/data";
import Reveal from "./Reveal";
import SocialsPanel from "./SocialsPanel";

/** Server component: pulls live YouTube / Medium / GitHub content (cached hourly). */
export default async function Socials() {
  const feeds = await getFeeds();

  return (
    <Reveal as="section" id="socials" className="deck-bleed py-[100px]">
      <SocialsPanel socials={socials} feeds={feeds} />
    </Reveal>
  );
}
