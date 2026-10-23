import type { Metadata } from "next";

import { JsonLd } from "@/components/site/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { brandMarks as marks, brandSizes as SIZES } from "@/content/brand";
import { pageMetadata } from "@/content/share";

export const metadata: Metadata = { ...pageMetadata("/brand"), title: "Brand kit" };

const SWATCH: Record<string, string> = { navy: "bg-[#1A2740]", cream: "bg-[#F5F1E8]", gold: "bg-[#C8A24C]", transparent: "bg-muted" };

const uses = [
  ["Keystone", "Organization avatars (GitHub, npm, NuGet), favicons, anything 64 px or smaller."],
  ["Beaver keystone", "The project's profile picture and social accounts."],
  ["Beaver per product", "The avatar of each product's repository, package or channel: dotnet, ui, platform, actions."],
  ["Bot", "Automation that acts for Aedis, such as the Aedis Agent Coder app."],
];

export default function Brand() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pt-16 pb-20">
      <JsonLd path="/brand" />
      <section className="flex max-w-[44em] flex-col gap-4">
        <h1 className="text-[clamp(2.2rem,4.6vw,3.4rem)] leading-[1.05] font-bold tracking-[-0.03em]">Brand kit</h1>
        <p className="text-title-3 font-normal text-muted-foreground">
          The keystone and the beaver, ready for avatars. Every file is square with room for a circle crop, as SVG and as PNG from 1024 to 32 px.
        </p>
      </section>

      <section aria-labelledby="use" className="flex flex-col gap-4">
        <h2 id="use" className="text-title-2 font-semibold">Which one to use</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {uses.map(([name, text]) => (
            <li key={name} className="rounded-lg border border-hairline bg-surface px-4 py-3">
              <span className="font-semibold">{name}</span>
              <span className="block text-muted-foreground">{text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="files" className="flex flex-col gap-6">
        <h2 id="files" className="text-title-2 font-semibold">Files</h2>
        {marks.map((mark) => (
          <Card key={mark.name}>
            <CardHeader>
              <CardTitle>{mark.label}</CardTitle>
              <CardDescription>{mark.name}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              {mark.backgrounds.map((bg) => {
                const base = `/brand/${mark.name}-${bg}`;
                return (
                  <figure key={bg} className="flex flex-col gap-3">
                    <div className={`overflow-hidden rounded-lg border border-hairline ${SWATCH[bg]}`}>
                      <img src={`${base}.svg`} alt={`${mark.label} on ${bg}`} width={1024} height={1024} className="aspect-square h-auto w-full" />
                    </div>
                    <figcaption className="flex flex-wrap items-center gap-2 text-footnote">
                      <Badge variant="secondary">{bg}</Badge>
                      <Link href={`${base}.svg`} download>
                        SVG
                      </Link>
                      {SIZES.map((s) => (
                        <Link key={s} href={`${base}-${s}.png`} download>
                          {s}
                        </Link>
                      ))}
                    </figcaption>
                  </figure>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </section>

      <p className="text-footnote text-muted-foreground">
        The beaver is a sketch from the design canvas; the illustrator&apos;s final art replaces it when it arrives, with the same file names. Licensed with the project (Apache-2.0); please do not
        alter the marks or use them to suggest endorsement.
      </p>
    </main>
  );
}
