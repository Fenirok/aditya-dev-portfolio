import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  // serve the pages Next.js pre-built at deploy time (read-only)
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
