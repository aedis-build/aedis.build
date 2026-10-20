# Pending aedis-ui items

The site uses only aedis-ui components. Items listed here are used from a local build of the registry until
aedis-ui merges and publishes them; each row leaves this file when its PR is merged and the registry is released.

| Item | aedis-ui issue / PR | Status |
|---|---|---|
| `security-headers` with build-time `hashes` (static sites cannot mint a nonce) | aedis-ui#79 / aedis-ui#80 | open; `lib/security-headers.ts` comes from the PR branch |
| Registry release (`v0.1.0`) and `@aedis/cli` on npm | aedis-ui#39 | `components.json` points at a local build of aedis-ui `main` (`http://127.0.0.1:8090/r`); switch to `@aedis/cli` once the first signed release exists |
