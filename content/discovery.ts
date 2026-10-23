import { products } from "@/content/products";
import { SITE, sharePages } from "@/content/share";

const repo = (name: string) => `https://github.com/aedis-build/${name}`;
const WHAT = "An open-source .NET + React framework whose security you can prove: secure-by-construction building blocks, shipped with the evidence an auditor asks for.";

/**
 * Our own robots.txt: every crawler, AI crawlers included, may read the whole site, and the content signals say
 * what the content may be used for (contentsignals.org; the maintainer's decision of 2026-10-23: search, AI input
 * and AI training all yes, since the project is open source and wants to be known).
 */
export function robotsTxt() {
  return [
    `# ${SITE.name}. For coding agents and assistants: ${SITE.origin}/llms.txt`,
    "User-agent: *",
    "Content-Signal: search=yes, ai-input=yes, ai-train=yes",
    "Allow: /",
    "",
    `Sitemap: ${SITE.origin}/sitemap.xml`,
    "",
  ].join("\n");
}

/**
 * The umbrella llms.txt (llmstxt.org): what Aedis is in a few lines, then each product with its own machine-readable
 * docs where it publishes them, its repository otherwise.
 */
export function llmsTxt() {
  return [
    `# ${SITE.name}`,
    "",
    `> ${WHAT}`,
    "",
    "Three products, used together or alone. Everything is Apache-2.0, signed with Sigstore and built with SLSA provenance.",
    "",
    "## Products",
    "",
    ...products.map((p) =>
      p.llms
        ? `- [${p.tag}](${p.llms}): ${p.description} Docs for agents, every component with its API and security rules.`
        : `- [${p.tag}](${repo(p.repo)}): ${p.description} No llms.txt yet; the repository's README and docs/ are the reference.`,
    ),
    "",
    "## Optional",
    "",
    `- [Security policy](${repo("aedis.build")}/security/policy): how to report a vulnerability.`,
    `- [All repositories](https://github.com/aedis-build): source, releases and their attestations.`,
    "",
  ].join("\n");
}

/**
 * The page's structured data (schema.org JSON-LD): the WebSite and Aedis as its publisher, each product as
 * SoftwareSourceCode, and the page itself. A docs page will add a TechArticle here when the site has one.
 */
export function jsonLd(path: string) {
  const page = sharePages.find((p) => p.path === path);
  if (!page) throw new Error(`no page ${path}`);
  const publisher = { "@type": "Organization", "@id": `${SITE.origin}/#org`, name: SITE.name, url: `${SITE.origin}/`, sameAs: ["https://github.com/aedis-build"] };
  const website = { "@type": "WebSite", "@id": `${SITE.origin}/#website`, url: `${SITE.origin}/`, name: SITE.name, description: WHAT, inLanguage: "en", publisher: { "@id": publisher["@id"] } };
  const code = products.map((p) => ({
    "@type": "SoftwareSourceCode",
    "@id": `${SITE.origin}/#${p.repo}`,
    name: p.tag,
    description: p.description,
    codeRepository: repo(p.repo),
    license: "https://www.apache.org/licenses/LICENSE-2.0",
    programmingLanguage: p.language,
    author: { "@id": publisher["@id"] },
  }));
  const url = `${SITE.origin}${path}`;
  const webpage = { "@type": "WebPage", "@id": `${url}#webpage`, url, name: page.title, description: page.description, isPartOf: { "@id": website["@id"] }, about: code.map((c) => ({ "@id": c["@id"] })) };
  return { "@context": "https://schema.org", "@graph": [website, publisher, ...code, webpage] };
}
