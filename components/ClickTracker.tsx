"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Sends a GA4 "click" event for every link and button on the site, without
 * having to wire up each one. The label is picked from (in order):
 *   data-track="..."  → set this on an element to give it an explicit name
 *   aria-label        → used by icon-only buttons/links
 *   visible text
 * In GA4: Reports → Engagement → Events → "ui_click", broken down by
 * the "click_label" / "click_section" custom dimensions.
 */
export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("a, button, [data-track]");
      if (!el) return;

      const label = (
        el.dataset.track ||
        el.getAttribute("aria-label") ||
        el.textContent ||
        ""
      )
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 100);

      const href = el instanceof HTMLAnchorElement ? el.href : undefined;
      const section = el.closest("section[id], [id]")?.id;

      track("ui_click", {
        click_label: label || "(no label)",
        click_type: el.tagName.toLowerCase(),
        click_section: section,
        link_url: href,
        page_path: window.location.pathname,
      });
    };

    // capture phase so we still see clicks that navigate away or stopPropagation
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
