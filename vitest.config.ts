import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    include: ["test/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      // The site's own code. components/ui, lib and styles are aedis-ui registry copies, tested in aedis-ui.
      include: ["app/**/*.tsx", "content/**", "scripts/**"],
      // Cobertura XML is what the Aedis Platform coverage gate reads.
      reporter: ["text-summary", "cobertura"],
      thresholds: { lines: 95, branches: 85 },
    },
  },
});
