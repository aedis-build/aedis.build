import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { securityHeaders } from "@/lib/security-headers";

const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;

/** sha256 of each inline script, over the exact text the browser hashes. */
export function inlineScriptHashes(html: string): string[] {
  return [...html.matchAll(INLINE_SCRIPT)].map(([, body]) => `sha256-${createHash("sha256").update(body, "utf8").digest("base64")}`);
}

/**
 * The Cloudflare `_headers` file for the exported site: the aedis-ui security headers on every path, with the
 * hashes of every inline script of every page in one policy.
 */
export function headersFile(pages: string[]): string {
  const hashes = [...new Set(pages.flatMap(inlineScriptHashes))].sort();
  const lines = Object.entries(securityHeaders({ hashes })).map(([name, value]) => `  ${name}: ${value}`);
  // Hashed build assets never change: they keep the headers but swap no-store for immutable caching.
  return ["/*", ...lines, "/_next/static/*", "  ! Cache-Control", "  Cache-Control: public, max-age=31536000, immutable", ""].join("\n");
}

/** Every exported page under `dir`. */
export function htmlFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter((e) => e.isFile() && e.name.endsWith(".html"))
    .map((e) => join(e.parentPath, e.name));
}

// The CLI entry: `tsx scripts/headers.ts out` after `next build`.
/* v8 ignore start */
if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const out = process.argv[2] ?? "out";
  writeFileSync(join(out, "_headers"), headersFile(htmlFiles(out).map((f) => readFileSync(f, "utf8"))));
}
/* v8 ignore stop */
