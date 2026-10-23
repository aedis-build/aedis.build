import { GET as llmsRoute } from "@/app/llms.txt/route";
import { GET as robotsRoute } from "@/app/robots.txt/route";
import sitemap from "@/app/sitemap";
import { jsonLd, llmsTxt, robotsTxt } from "@/content/discovery";
import { products } from "@/content/products";
import { llmsAlternate, pageMetadata, sharePages } from "@/content/share";
import { discoveryProblems } from "@/scripts/headers";

const ldBlock = (path: string) => `<script type="application/ld+json">${JSON.stringify(jsonLd(path))}</script>`;
const head = '<head><link rel="alternate" type="text/plain" href="https://aedis.build/llms.txt" title="llms.txt"/></head>';

describe("discoverability", () => {
  it("robots.txt lets every crawler in, with the content signals and the sitemap", async () => {
    const lines = robotsTxt().split("\n");
    expect(lines).toEqual(expect.arrayContaining(["User-agent: *", "Allow: /", "Content-Signal: search=yes, ai-input=yes, ai-train=yes", "Sitemap: https://aedis.build/sitemap.xml"]));
    expect(lines.filter((l) => /^Disallow:/i.test(l))).toEqual([]);
    expect(lines[0]).toContain("https://aedis.build/llms.txt");
    expect(await robotsRoute().text()).toBe(robotsTxt());
  });

  it("the umbrella llms.txt says what Aedis is and links each product's own docs, or its repository", async () => {
    const text = llmsTxt();
    expect(text.split("\n").slice(0, 3)).toEqual(["# Aedis", "", "> An open-source .NET + React framework whose security you can prove: secure-by-construction building blocks, shipped with the evidence an auditor asks for."]);
    expect(text).toContain("- [Aedis UI](https://ui.aedis.build/llms.txt): ");
    for (const p of products.filter((x) => !x.llms)) expect(text).toContain(`- [${p.tag}](https://github.com/aedis-build/${p.repo}): `);
    expect(await llmsRoute().text()).toBe(text);
  });

  it("the sitemap lists every page once, and every head links llms.txt", () => {
    expect(sitemap().map((e) => e.url)).toEqual(sharePages.map((p) => `https://aedis.build${p.path}`));
    expect(pageMetadata("/").alternates).toMatchObject({ canonical: "https://aedis.build/", types: llmsAlternate });
  });

  it("describes the site, Aedis and each product as JSON-LD", () => {
    const data = JSON.parse(JSON.stringify(jsonLd("/"))) as { "@graph": { "@type": string; codeRepository?: string }[] };
    expect(data["@graph"].map((n) => n["@type"])).toEqual(["WebSite", "Organization", ...products.map(() => "SoftwareSourceCode"), "WebPage"]);
    expect(data["@graph"].filter((n) => n.codeRepository).map((n) => n.codeRepository)).toEqual(products.map((p) => `https://github.com/aedis-build/${p.repo}`));
    expect(() => jsonLd("/nope")).toThrow("no page /nope");
  });

  it("fails the build for a page missing from the sitemap, without the llms.txt link, or with bad JSON-LD", () => {
    const xml = "<urlset><url><loc>https://aedis.build/</loc></url></urlset>";
    expect(discoveryProblems("/", `${head}${ldBlock("/")}`, xml)).toEqual([]);
    expect(discoveryProblems("/", `${head}${ldBlock("/")}`, "<urlset/>")).toEqual(["/: not in sitemap.xml"]);
    expect(discoveryProblems("/", `<head></head>${ldBlock("/")}`, xml)).toEqual(["/: no llms.txt link in the head"]);
    expect(discoveryProblems("/", `${head}<script type="application/ld+json">{oops</script>`, xml)).toEqual(["/: JSON-LD does not parse"]);
    expect(discoveryProblems("/", head, xml)).toEqual(["/: no JSON-LD WebSite"]);
  });
});
