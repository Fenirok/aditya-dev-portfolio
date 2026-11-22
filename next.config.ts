import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // hide the "N" dev-tools badge during `npm run dev` (errors still show)
  devIndicators: false,
  // Cloudflare Workers: serve images as-is (no Next.js image optimizer needed)
  images: { unoptimized: true },
  experimental: {
    agentFeedback: true,
  },
  // Cache Components are not supported by the Cloudflare adapter (OpenNext) yet,
  // so the site uses Next.js's standard caching instead.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;