import { cacheLife } from "next/cache";

/**
 * Live content for the "Find Me Online" section.
 * Each fetcher is cached for ~1 hour, so the page stays static and fast
 * while new videos / articles / repos show up on their own.
 * Any failure returns [] and the UI falls back to a profile link.
 */

const YOUTUBE_CHANNEL_ID = "UCVZDWkqhwH3CdKjbsG9PYVg"; // @scriptrok
const MEDIUM_USER = "aditya-halder";
const GITHUB_USER = "Fenirok";

export type FeedItem = {
  title: string;
  url: string;
  date?: string; // pre-formatted, e.g. "Apr 4, 2026"
  image?: string;
  excerpt?: string;
  meta?: string[]; // small chips: tags, language, views…
};

export type Feeds = {
  youtube: FeedItem[];
  medium: FeedItem[];
  github: FeedItem[];
};

// ---------- helpers ----------

const fmtDate = (d: string | undefined) => {
  if (!d) return undefined;
  const t = new Date(d);
  return isNaN(+t)
    ? undefined
    : t.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
};

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&")
    .trim();

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : undefined;
};

const stripHtml = (html: string) =>
  html
    .replace(/<figure[\s\S]*?<\/figure>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n).replace(/\s+\S*$/, "") + "…" : s);

async function get(url: string, init?: RequestInit) {
  const res = await fetch(url, {
    ...init,
    headers: { "User-Agent": "Mozilla/5.0 (portfolio feed reader)", ...(init?.headers ?? {}) },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res;
}

// ---------- fetchers ----------

export async function getYouTube(): Promise<FeedItem[]> {
  "use cache";
  cacheLife("hours");
  try {
    const xml = await (await get(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`)).text();
    return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
      .map(([, e]) => ({ e, url: e.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? "" }))
      // long-form videos only – Shorts have /shorts/ links
      .filter(({ url }) => url.includes("/watch"))
      .slice(0, 3)
      .map(({ e, url }) => {
      const views = e.match(/views="(\d+)"/)?.[1];
      return {
        title: tag(e, "title") ?? "Untitled video",
        url,
        date: fmtDate(tag(e, "published")),
        image: e.match(/<media:thumbnail url="([^"]+)"/)?.[1],
        meta: views ? [`${Number(views).toLocaleString("en-US")} views`] : [],
      };
    });
  } catch (err) {
    console.warn("[feeds] YouTube:", (err as Error).message);
    return [];
  }
}

export async function getMedium(): Promise<FeedItem[]> {
  "use cache";
  cacheLife("hours");
  try {
    const xml = await (await get(`https://medium.com/feed/@${MEDIUM_USER}`)).text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 3).map(([, it]) => {
      const body = tag(it, "content:encoded") ?? tag(it, "description") ?? "";
      const link = tag(it, "link") ?? `https://medium.com/@${MEDIUM_USER}`;
      return {
        title: tag(it, "title") ?? "Untitled",
        url: link.split("?")[0],
        date: fmtDate(tag(it, "pubDate")),
        // first real image – skip Medium's "_/stat" tracking pixel
        image: [...body.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]).find((src) => !src.includes("/_/stat")),
        excerpt: clip(stripHtml(body), 170),
        meta: [...it.matchAll(/<category>([\s\S]*?)<\/category>/g)].slice(0, 3).map(([, c]) => decode(c)),
      };
    });
  } catch (err) {
    console.warn("[feeds] Medium:", (err as Error).message);
    return [];
  }
}

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  pushed_at: string;
};

export async function getGitHub(): Promise<FeedItem[]> {
  "use cache";
  cacheLife("hours");
  try {
    const repos: Repo[] = await (
      await get(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=30`, {
        headers: { Accept: "application/vnd.github+json" },
      })
    ).json();
    return repos
      .filter((r) => !r.fork)
      .slice(0, 3)
      .map((r) => ({
        title: r.name,
        url: r.html_url,
        date: fmtDate(r.pushed_at),
        excerpt: r.description ?? undefined,
        meta: [r.language, r.stargazers_count ? `★ ${r.stargazers_count}` : null].filter(Boolean) as string[],
      }));
  } catch (err) {
    console.warn("[feeds] GitHub:", (err as Error).message);
    return [];
  }
}

export async function getFeeds(): Promise<Feeds> {
  const [youtube, medium, github] = await Promise.all([getYouTube(), getMedium(), getGitHub()]);
  return { youtube, medium, github };
}
