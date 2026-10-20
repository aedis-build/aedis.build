// The control matrix of aedis-dotnet, translated from docs/SECURITY-COMPLIANCE.md at the commit below. Rows are
// never written here first: change the source document, then update this copy.
export const controlsSource = {
  commit: "751bc80",
  url: "https://github.com/aedis-build/aedis-dotnet/blob/751bc80/docs/SECURITY-COMPLIANCE.md",
};

export type Control = { id: number; control: string; where: string; owasp: string; nist: string; iso: string; mitre: string };

export const controls: Control[] = [
  { id: 1, control: "Security headers (CSP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, COOP/CORP)", where: "SecurityHeadersMiddleware", owasp: "A05", nist: "PR.PS", iso: "A.8.9, A.8.23", mitre: "M1050 · T1185, T1059.007" },
  { id: 2, control: "HSTS and HTTPS redirection", where: "HttpsOptions", owasp: "A02", nist: "PR.DS-02", iso: "A.8.24", mitre: "M1041 · T1557, T1040" },
  { id: 3, control: "Rate limiting per client (user or IP)", where: "RateLimitingOptions", owasp: "A04, A07", nist: "PR.PS, DE.CM", iso: "A.8.6, A.8.20", mitre: "M1036 · T1110, T1499" },
  { id: 4, control: "Host header protection", where: "HostHeaderProtectionMiddleware", owasp: "A05", nist: "PR.PS", iso: "A.8.20, A.8.23", mitre: "T1190" },
  { id: 5, control: "Trusted forwarded headers (real client IP and scheme)", where: "ForwardedHeadersHardeningOptions", owasp: "A05", nist: "PR.PS", iso: "A.8.20", mitre: "T1090" },
  { id: 6, control: "Kestrel hardening (body and header limits, timeouts, no Server header)", where: "KestrelHardeningOptions", owasp: "A05", nist: "PR.PS", iso: "A.8.9", mitre: "M1037 · T1499, T1592" },
  { id: 7, control: "Safe errors as ProblemDetails (no stack trace or internal message)", where: "GlobalExceptionHandlingMiddleware", owasp: "A05, A09", nist: "PR.PS, DE.CM", iso: "A.8.8", mitre: "T1592, T1210" },
  { id: 8, control: "Input validation answered with 422", where: "AddAedisApiValidation", owasp: "A03", nist: "PR.PS", iso: "A.8.26, A.8.28", mitre: "T1190, T1059" },
  { id: 9, control: "Fail-closed authentication gate: refuses to start insecure outside Development", where: "AedisApiHost", owasp: "A01, A07", nist: "PR.AA", iso: "A.8.5, A.8.26", mitre: "M1035 · T1078" },
  { id: 10, control: "Deny-by-default authorization (the fallback policy requires an authenticated user)", where: "AedisApiHost", owasp: "A01", nist: "PR.AA-05", iso: "A.8.3, A.8.5", mitre: "M1018, M1026 · T1078" },
  { id: 11, control: "JWT validation (issuer, audience, lifetime; claims preserved)", where: "Aedis.Security.Keycloak", owasp: "A07", nist: "PR.AA-03", iso: "A.8.5", mitre: "T1550.001" },
  { id: 12, control: "Structured logging, OTLP telemetry and audit context", where: "Aedis.Observability.*, IAuditContext", owasp: "A09", nist: "DE.CM, DE.AE", iso: "A.8.15, A.8.16", mitre: "M1047 · detects T1110, T1078" },
  { id: 13, control: "Graceful shutdown (drains requests, releases resources)", where: "Aedis.Diagnostics", owasp: "A04", nist: "PR.PS, RC.RP", iso: "A.8.14", mitre: "—" },
  { id: 14, control: "No OpenAPI documentation by default: opt-in package, mapped only in Development by the template", where: "MapAedisOpenApi, MapAedisScalar", owasp: "A05", nist: "PR.PS", iso: "A.8.9", mitre: "T1592" },
  { id: 15, control: "Deterministic build, central package management with fixed versions, vulnerable transitive overrides", where: "Directory.*.props", owasp: "A06, A08", nist: "ID.RA, PR.PS", iso: "A.8.8, A.8.29, A.8.30", mitre: "T1195" },
  { id: 16, control: "HTTPS-aware response compression (BREACH trade-off documented)", where: "AedisApiHost", owasp: "—", nist: "—", iso: "—", mitre: "—" },
  { id: 17, control: "Brute-force guard per credential with three configurable lockout tiers, keyed by target rather than IP", where: "IBruteForceGuard", owasp: "A07", nist: "PR.AA, DE.CM", iso: "A.8.5", mitre: "M1036 · T1110, T1110.003" },
  { id: 18, control: "Token revocation: distributed denylist by jti or by user, abuse guard and admin endpoint", where: "ITokenDenylist, ITokenRevocation", owasp: "A07, A01", nist: "PR.AA-01, RS.MI", iso: "A.8.5", mitre: "M1018 · T1528, T1550.001" },
  { id: 19, control: "Memory-safe managed code (no unsafe, no stackalloc); runtime ASLR, DEP, CFG and CET; opt-in AOT hardening", where: "Aedis.Build", owasp: "A06", nist: "PR.PS", iso: "A.8.28", mitre: "M1050 · T1203" },
  { id: 20, control: "SSRF protection on outbound HTTP: internal and metadata addresses refused at connect time, immune to DNS rebinding", where: "SsrfPolicy (Aedis.Http)", owasp: "A10", nist: "PR.PS, PR.AC", iso: "A.8.20, A.8.23", mitre: "T1552.005, T1090, T1046" },
];
