import { createHash } from "node:crypto";
import fc from "fast-check";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { headersFile, htmlFiles, inlineScriptHashes } from "@/scripts/headers";

const sha = (s: string) => `sha256-${createHash("sha256").update(s, "utf8").digest("base64")}`;

describe("_headers", () => {
  it("hashes inline scripts only, over their exact text", () => {
    const html = `<script src="/a.js" async=""></script><script>self.__next_f.push([1,"x"])</script><script nonce="n">\n a()\n</script>`;
    expect(inlineScriptHashes(html)).toEqual([sha('self.__next_f.push([1,"x"])'), sha("\n a()\n")]);
  });

  it("puts every page's hashes once into the aedis-ui policy for every path", () => {
    const file = headersFile(["<script>a()</script>", "<script>a()</script><script>b()</script>"]);
    const [path, ...rest] = file.trim().split("\n");
    expect(path).toBe("/*");
    const lines = rest.slice(0, rest.indexOf("/_next/static/*"));
    const csp = lines.find((l) => l.startsWith("  Content-Security-Policy: "))!;
    expect(csp).toContain(`script-src 'self' '${[sha("a()"), sha("b()")].sort().join("' '")}';`);
    expect(csp).not.toMatch(/script-src[^;]*unsafe-inline/);
    expect(lines).toContain("  X-Frame-Options: DENY");
    expect(lines.some((l) => l.startsWith("  Strict-Transport-Security: "))).toBe(true);
    expect(lines).toContain("  Cache-Control: no-store");
  });

  it("lets hashed build assets be cached for good", () => {
    const assets = headersFile([]).split("/_next/static/*\n")[1];
    expect(assets).toBe("  ! Cache-Control\n  Cache-Control: public, max-age=31536000, immutable\n");
  });

  it("finds every exported page, nested ones included", () => {
    const out = mkdtempSync(join(tmpdir(), "out-"));
    mkdirSync(join(out, "docs"));
    for (const f of ["index.html", "docs/a.html", "index.txt"]) writeFileSync(join(out, f), "");
    expect(htmlFiles(out).map((f) => f.slice(out.length + 1).replaceAll("\\", "/")).sort()).toEqual(["docs/a.html", "index.html"]);
  });

  it("hashes exactly the inline scripts of any page, whatever surrounds them", () => {
    const text = fc.string().filter((s) => !s.toLowerCase().includes("</script"));
    fc.assert(
      fc.property(fc.array(fc.tuple(text, fc.boolean())), text, (scripts, filler) => {
        const html = scripts.map(([body, external]) => (external ? `<script src="/x.js">${body}</script>` : `<script>${body}</script>`)).join(filler.replaceAll("<", ""));
        expect(inlineScriptHashes(html)).toEqual(scripts.filter(([, external]) => !external).map(([body]) => sha(body)));
      }),
    );
  });
});
