# Pending aedis-ui items

The site uses only aedis-ui components. Items listed here are used from a local build of the registry until
aedis-ui merges and publishes them; each row leaves this file when its PR is merged and the registry is released.

| Item | aedis-ui issue / PR | Status |
|---|---|---|
| `site-header`, `site-footer` | aedis-ui#74 / aedis-ui#75 | open; copies in `components/ui` come from the PR branch |
| `utils` (`cn()` knows the theme's type and elevation scales; without it `Button size="lg"` loses its text color) | aedis-ui#77 / aedis-ui#76 | open; `lib/utils.ts` comes from the PR branch |
| `security-headers` with build-time `hashes` (static sites cannot mint a nonce) | aedis-ui#79 / aedis-ui#80 | open; `lib/security-headers.ts` comes from the PR branch |
| Registry release (`v0.1.0`) and `@aedis/cli` on npm | aedis-ui#39 | `components.json` points at a local build of aedis-ui `main` (`http://127.0.0.1:8090/r`); switch to `@aedis/cli` once the first signed release exists |

Not aedis-ui, also pending: the beaver in `components/site/beaver.tsx` is the sketch from the design canvas until the
illustrator's final art arrives.
