import type { MetadataRoute } from "next";
import { execFileSync } from "node:child_process";

import { SITE, sharePages } from "@/content/share";

export const dynamic = "force-static";

/** The files a page is made of: its route, and the content it shows. */
const sources = (path: string) => [path === "/" ? "app/page.tsx" : `app${path}/page.tsx`, "content"];

/** When those files last changed, from git; nothing when git has no answer (no git, or a shallow clone without them). */
function lastModified(path: string): Date | undefined {
  try {
    const date = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...sources(path)], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    return date ? new Date(date) : undefined;
  } catch {
    return undefined;
  }
}

/** Every page of the site. Ready for hreflang: add alternates.languages per entry once the site has three languages. */
export default function sitemap(): MetadataRoute.Sitemap {
  return sharePages.map((page) => ({ url: `${SITE.origin}${page.path}`, lastModified: lastModified(page.path) }));
}
