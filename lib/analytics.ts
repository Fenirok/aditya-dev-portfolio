// Thin wrapper around GA4's gtag. Safe to call anywhere: it's a no-op on the
// server, in dev without a GA ID, or when an ad blocker stops gtag loading.
type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: Params) => void;
  }
}

export function track(event: string, params?: Params) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
}
