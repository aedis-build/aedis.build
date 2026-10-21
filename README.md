# aedis.build

The site of [Aedis](https://aedis.build), built with [aedis-ui](https://github.com/aedis-build/aedis-ui) and held to
the same bar as the framework it presents. This repository is public so you can check that claim.

## What you can verify here

| Claim | Where |
|---|---|
| Every page sends the aedis-ui security headers: CSP whose scripts are only this origin's files plus build-time hashes of each inline script (no `'unsafe-inline'`), HSTS preload, `frame-ancestors 'none'`, COOP/CORP, no referrer leak | [`scripts/headers.ts`](scripts/headers.ts) writes `out/_headers` from [`lib/security-headers.ts`](lib/security-headers.ts); [`test/headers.test.ts`](test/headers.test.ts) |
| Static site on Cloudflare static assets: no server code runs | [`wrangler.jsonc`](wrangler.jsonc) |
| What is live was built here from `main`, has an SBOM and SLSA Build L3 provenance from the isolated slsa-github-generator, and the deploy job verifies the attestation before uploading those exact bytes. Check it with `gh attestation verify aedis.build-site.tgz -R aedis-build/aedis.build` on the `aedis.build-site` artifact of a deploy run | [`deploy.yml`](.github/workflows/deploy.yml) |
| The deploy token is reachable only by the `prd` environment (main only, required reviewer), scoped to Workers Editor and the aedis.build Workers routes, and expires every 90 days | [`deploy.yml`](.github/workflows/deploy.yml) |
| A DAST scan (OWASP ZAP) runs on every PR against the site served by the Cloudflare runtime (`wrangler dev`) and fails on Medium | [`.github/workflows/ci.yml`](.github/workflows/ci.yml), [`dast-accept.yaml`](dast-accept.yaml) |
| SAST (Semgrep with the shared Aedis rules) and CodeQL `security-extended` on every PR | [`sast.yml`](.github/workflows/sast.yml), [`codeql.yml`](.github/workflows/codeql.yml) |
| Coverage gate at 95 % lines and 85 % branches, no regression | [`ci.yml`](.github/workflows/ci.yml), the `coverage-summary` artifact |
| `main` changes only by reviewed PR with all checks green | [`.github/rulesets/main.json`](.github/rulesets/main.json), [`CODEOWNERS`](CODEOWNERS), [`aedis-merge-policy.yaml`](.github/aedis-merge-policy.yaml) |
| Actions pinned by SHA, `permissions: {}` on every workflow, Dependabot with cooldown, npm installs that refuse week-old-or-newer and downgraded-trust packages | [`.github/`](.github), [`pnpm-workspace.yaml`](pnpm-workspace.yaml) |
| OpenSSF Scorecard published weekly | [`scorecard.yml`](.github/workflows/scorecard.yml) |
| License and copyright on every file (REUSE) | [`REUSE.toml`](REUSE.toml) |

## Components

`components/ui`, `lib` and `styles` are copies of aedis-ui registry items. They change only by re-adding the item
from the registry, never by hand. [`PENDING.md`](PENDING.md) lists items still waiting to be published.

## Development

```bash
pnpm install --frozen-lockfile
pnpm dev            # development server, without the security headers
pnpm build && pnpm start   # the exported site with its _headers, as Cloudflare serves it
pnpm test:coverage
```

Report vulnerabilities as described in [SECURITY.md](SECURITY.md).
