import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // hide the "N" dev-tools badge during `npm run dev` (errors still show)
  devIndicators: false,
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
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
