# Contributing to aedis.build

The organization-wide guide is in [aedis-build/aedis-dotnet](https://github.com/aedis-build/aedis-dotnet/blob/main/CONTRIBUTING.md). This file covers what is specific to the site.

## Setup

Requirements: Node.js 22+ and pnpm 10.

```bash
pnpm install
pnpm dev                  # development server, without the security headers
pnpm test                 # unit, property-based and accessibility tests
pnpm test:coverage        # the same with the coverage gate (95 % lines, 85 % branches)
pnpm build && pnpm start  # the exported site with its _headers, served by the Cloudflare runtime
```

## Rules

- **Components come from aedis-ui only.** `components/ui`, `lib` and `styles` are copies of aedis-ui registry items: change them by re-adding the item, never by hand. A missing component is proposed to aedis-ui (issue and PR) and listed in [`PENDING.md`](PENDING.md) until it is published.
- **Content is checked against its source.** The control matrix is copied from aedis-dotnet `docs/SECURITY-COMPLIANCE.md`; change the source first, then the copy, keeping the pinned commit up to date.
- **No inline script.** The CSP allows only this origin's files and the hashes `scripts/headers.ts` computes at build time.
- **External links** go through the aedis-ui `Link` (or `NavigationMenuLink`), which adds `rel="noopener noreferrer"` and a visible marker.

## Commits and pull requests

[Conventional Commits](https://www.conventionalcommits.org/), signed off (`git commit -s`), one purpose per PR. Changes to `.github/`, the registry copies, `scripts/headers.ts` and `wrangler.jsonc` always need a human review (see `.github/aedis-merge-policy.yaml`). The gates (coverage, SAST, DAST, merge gate) are the shared ones of [aedis-platform](https://github.com/aedis-build/aedis-platform).
