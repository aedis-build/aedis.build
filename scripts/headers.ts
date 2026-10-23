import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";

import { securityHeaders } from "@/lib/security-headers";

const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;

/** sha256 of each inline script, over the exact text the browser hashes. */
export function inlineScriptHashes(html: string): string[] {
  return [...html.matchAll(INLINE_SCRIPT)].map(([, body]) => `sha256-${createHash("sha256").update(body, "utf8").digest("base64")}`);
}

const IMMUTABLE = ["  ! Cache-Control", "  Cache-Control: public, max-age=31536000, immutable"];

/**
 * The Cloudflare `_headers` file for the exported site: the aedis-ui security headers on every path, with the
 * hashes of every inline script of every page in one policy.
 */
export function headersFile(pages: string[]): string {
  const hashes = [...new Set(pages.flatMap(inlineScriptHashes))].sort();
  const lines = Object.entries(securityHeaders({ hashes })).map(([name, value]) => `  ${name}: ${value}`);
  return [
    "/*",
    ...lines,
    // Hashed build assets never change: they keep the headers but swap no-store for immutable caching.
    "/_next/static/*",
    ...IMMUTABLE,
    // The share cards (app/og): named by a hash of what they show, and fetched by chat apps and networks from anywhere.
    "/og/*",
    ...IMMUTABLE,
    "  ! Cross-Origin-Resource-Policy",
    "  Cross-Origin-Resource-Policy: cross-origin",
    "",
  ].join("\n");
}

/** Every exported page under `dir`. */
export function htmlFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter((e) => e.isFile() && e.name.endsWith(".html"))
    .map((e) => join(e.parentPath, e.name));
}

/** The URL path Cloudflare serves an exported page at: docs/a.html is /docs/a, index.html is /. */
export function urlPath(dir: string, file: string): string {
  return `/${relative(dir, file).replaceAll("\\", "/")}`.replace(/\.html$/, "").replace(/(^|\/)index$/, "$1");
}

const TAGS = ["og:title", "og:description", "og:url", "og:site_name", "og:type", "og:image", "og:image:width", "og:image:height", "og:image:alt", "twitter:card", "twitter:title", "twitter:description", "twitter:image"];
const ORIGIN = "https://aedis.build";

/**
 * What a page lacks to unfurl with its card in a chat app: a share tag, its canonical link, or an og:image that is a
 * file of this export. Empty when nothing is missing.
 */
export function shareProblems(path: string, html: string, exists: (file: string) => boolean): string[] {
  const meta = (key: string) => new RegExp(`<meta (?:property|name)="${key}" content="([^"]+)"`).exec(html)?.[1];
  const problems = TAGS.filter((tag) => !meta(tag)).map((tag) => `${path}: no ${tag}`);
  if (!html.includes(`<link rel="canonical" href="${ORIGIN}${path}"/>`)) problems.push(`${path}: no canonical link`);
  const image = meta("og:image");
  if (image && !(image.startsWith(`${ORIGIN}/og/`) && exists(image.slice(ORIGIN.length)))) problems.push(`${path}: og:image ${image} is not in the export`);
  return problems;
}

// The CLI entry: `tsx scripts/headers.ts out` after `next build`.
/* v8 ignore start */
if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const out = process.argv[2] ?? "out";
  const pages = htmlFiles(out);
  // Every page but the error pages must unfurl with its card (aedis.build#12): the build fails otherwise.
  const problems = pages
    .filter((f) => !/^\/(?:404|_not-found)$/.test(urlPath(out, f)))
    .flatMap((f) => shareProblems(urlPath(out, f), readFileSync(f, "utf8"), (file) => existsSync(join(out, file))));
  if (problems.length) throw new Error(`share tags:\n${problems.join("\n")}`);
  writeFileSync(join(out, "_headers"), headersFile(pages.map((f) => readFileSync(f, "utf8"))));
}
/* v8 ignore stop */
