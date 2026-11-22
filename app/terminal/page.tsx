import type { Metadata } from "next";
import { getFeeds } from "@/lib/feeds";
import Terminal from "@/components/terminal/Terminal";

export const metadata: Metadata = {
  title: "Terminal · Aditya Halder",
  description: "Explore Aditya Halder's portfolio from a terminal.",
};

export default async function TerminalPage() {
  // same live YouTube / Medium / GitHub data as the main site (cached hourly)
  const feeds = await getFeeds();
  return (
    <>
      {/* The terminal is only reachable from the site's "Access terminal" button.
          This inline script runs only when /terminal itself is loaded or refreshed
          (React never executes it on in-app navigation) and sends the visitor to
          the landing page, where the intro plays as usual. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{var n=performance.getEntriesByType("navigation")[0];if(!n||new URL(n.name).pathname.replace(/\\/$/,"")==="/terminal"){document.documentElement.style.visibility="hidden";location.replace("/")}}catch(e){location.replace("/")}`,
        }}
      />
      <Terminal feeds={feeds} />
    </>
  );
}
