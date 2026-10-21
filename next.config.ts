import type { NextConfig } from "next";

// Static export served from Cloudflare static assets. The security headers, with the hashes of every inline
// script, are written to out/_headers after the build (scripts/headers.ts).
const config: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default config;
