import type { Metadata } from "next";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { Beaver, type BeaverVariant } from "@/components/site/beaver";
import { ShareCard } from "@/components/ui/share-card";
import { shareMetadata } from "@/lib/share-metadata";

export const SITE = { origin: "https://aedis.build", name: "Aedis" };

/** What a page's share card and link preview say. The art is the beaver of the page's product. */
export type SharePage = { path: string; title: string; description: string; eyebrow: string; beaver: BeaverVariant; chips?: string[] };

/**
 * Every page with a share card. Product pages join with their own beaver (ui, dotnet, platform) when they exist;
 * today the site is its home page.
 */
export const sharePages: SharePage[] = [
  {
    path: "/",
    title: "Security you can prove.",
    description: "Secure-by-construction .NET building blocks, with the evidence your auditor asks for.",
    eyebrow: ".NET framework · Open source",
    beaver: "keystone",
    chips: ["SLSA Build L3", "Signed releases"],
  },
];

/** The aedis-ui share card in the brand theme, with the keystone and the page's beaver. */
export function shareCard(page: SharePage) {
  return (
    <ShareCard
      theme="brand"
      brand={{
        name: SITE.name,
        logo: (
          <svg width="44" height="44" viewBox="0 0 64 64">
            <polygon points="8,8 56,8 47,58 17,58" fill="#C8A24C" stroke="#0E1626" strokeWidth="3" strokeLinejoin="round" />
            <polygon points="56,8 47,58 40,8" fill="#9C7C2C" />
            <circle cx="32" cy="27" r="6.5" fill="#0E1626" />
            <rect x="29.5" y="29" width="5" height="15" rx="1.5" fill="#0E1626" />
          </svg>
        ),
      }}
      eyebrow={page.eyebrow}
      title={page.title}
      description={page.description}
      chips={page.chips}
      domain="aedis.build"
      // 240×280 art scaled to the card's 300 px column height.
      art={<Beaver variant={page.beaver} size={257} />}
    />
  );
}

// The card's look changes with these files: they are part of every image's name, so a new look gets new URLs.
let look: string | undefined;
const lookHash = () => (look ??= ["components/ui/share-card.tsx", "components/site/beaver.tsx", "content/share.tsx"].map((f) => readFileSync(join(process.cwd(), f), "utf8")).join("\n"));

/** The image under /og/: the page's path and a hash of what the card shows, so it can be cached for good. */
export function shareImageFile(page: SharePage): string {
  const slug = page.path === "/" ? "home" : page.path.slice(1).replaceAll("/", "-");
  return `${slug}-${createHash("sha256").update(JSON.stringify(page)).update(lookHash()).digest("hex").slice(0, 12)}.png`;
}

/** The page's metadata: title, description, canonical link and every share tag, with its card as the image. */
export function pageMetadata(path: string): Metadata {
  const page = sharePages.find((p) => p.path === path);
  if (!page) throw new Error(`no share card for ${path}`);
  return shareMetadata({
    site: SITE,
    url: `${SITE.origin}${path}`,
    title: page.title,
    description: page.description,
    image: { url: `${SITE.origin}/og/${shareImageFile(page)}`, alt: `${page.title} · ${SITE.name}` },
  });
}
