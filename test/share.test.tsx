// @vitest-environment node
import { ImageResponse } from "next/og";

import { GET, generateStaticParams } from "@/app/og/[file]/route";
import { SHARE_CARD_SIZE, shareCardFonts } from "@/components/ui/share-card";
import { pageMetadata, shareCard, shareImageFile, sharePages } from "@/content/share";
import { headersFile, shareProblems, urlPath } from "@/scripts/headers";

const fetches: string[] = [];
beforeAll(() => {
  const real = globalThis.fetch;
  vi.stubGlobal("fetch", (url: string | URL, init?: RequestInit) => {
    if (String(url).startsWith("data:")) return real(url, init);
    fetches.push(String(url));
    return Promise.reject(new Error("a share card fetched a URL"));
  });
});
afterAll(() => vi.unstubAllGlobals());

const page = `<link rel="canonical" href="https://aedis.build/"/>${["og:title", "og:description", "og:url", "og:site_name", "og:type", "og:image:width", "og:image:height", "og:image:alt", "twitter:card", "twitter:title", "twitter:description", "twitter:image"]
  .map((k) => `<meta property="${k}" content="x"/>`)
  .join("")}<meta property="og:image" content="https://aedis.build/og/home-0123456789ab.png"/>`;

describe("share cards", () => {
  it("draw the aedis-ui card in the brand theme, 1200x630, without reaching any host", async () => {
    const fonts = await shareCardFonts();
    for (const p of sharePages) {
      const png = Buffer.from(await new ImageResponse(shareCard(p), { ...SHARE_CARD_SIZE, fonts }).arrayBuffer());
      expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
      expect(png.length).toBeLessThan(300 * 1024);
    }
    expect(fetches).toEqual([]);
  }, 60_000);

  it("are built by the og route, one file per page, and nothing else", async () => {
    expect(generateStaticParams()).toEqual(sharePages.map((p) => ({ file: shareImageFile(p) })));
    const [{ file }] = generateStaticParams();
    const response = await GET(new Request("https://aedis.build/og/x"), { params: Promise.resolve({ file }) });
    expect(response.headers.get("content-type")).toBe("image/png");
    expect((await GET(new Request("https://aedis.build/og/x"), { params: Promise.resolve({ file: "nope.png" }) })).status).toBe(404);
    expect(fetches).toEqual([]);
  }, 60_000);

  it("give each page its card as og:image, named by what it shows", () => {
    const home = sharePages.find((p) => p.path === "/")!;
    expect(pageMetadata("/").openGraph).toMatchObject({ url: "https://aedis.build/", siteName: "Aedis", images: [{ url: `https://aedis.build/og/${shareImageFile(home)}`, width: 1200, height: 630 }] });
    expect(pageMetadata("/").twitter).toMatchObject({ card: "summary_large_image" });
    expect(shareImageFile(home)).toMatch(/^home-[0-9a-f]{12}\.png$/);
    expect(shareImageFile({ ...home, title: "Other" })).not.toBe(shareImageFile(home));
    expect(() => pageMetadata("/nope")).toThrow("no share card for /nope");
  });

  it("fail the build for a page without a tag, a canonical link or its image in the export", () => {
    expect(shareProblems("/", page, () => true)).toEqual([]);
    expect(shareProblems("/", page, () => false)).toEqual(["/: og:image https://aedis.build/og/home-0123456789ab.png is not in the export"]);
    expect(shareProblems("/", page.replace('<meta property="twitter:card" content="x"/>', ""), () => true)).toEqual(["/: no twitter:card"]);
    expect(shareProblems("/docs", page, () => true)).toEqual(["/docs: no canonical link"]);
    expect(shareProblems("/", page.replace("https://aedis.build/og/", "https://evil.example/og/"), () => true)).toHaveLength(1);
    expect(urlPath("out", "out/index.html")).toBe("/");
    expect(urlPath("out", "out/docs/a.html")).toBe("/docs/a");
  });

  it("serve the cards cached for good and loadable by other sites", () => {
    const og = headersFile([]).split("/og/*\n")[1];
    expect(og).toBe("  ! Cache-Control\n  Cache-Control: public, max-age=31536000, immutable\n  ! Cross-Origin-Resource-Policy\n  Cross-Origin-Resource-Policy: cross-origin\n");
  });
});
