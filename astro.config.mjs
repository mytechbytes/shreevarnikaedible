// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { createLogger } from "vite";

import cloudflare from "@astrojs/cloudflare";

/**
 * We pin Vite to v8 (latest) via package.json "overrides", which is newer than
 * the ^7 range Astro 6 declares. That combo emits a couple of known deprecation
 * warnings that are pure noise here. Filter ONLY those exact strings — anything
 * else (real warnings/errors) passes through untouched.
 */
const SILENCED = [
  "optimizeDeps.esbuildOptions",
  "optimizeDeps.rolldownOptions",
  "Vite now uses Rolldown",
  "transformWithEsbuild",
  "transformWithOxc",
  "The CJS build of Vite's Node API is deprecated",
];

const matchesSilenced = (msg) =>
  typeof msg === "string" && SILENCED.some((s) => msg.includes(s));

// 1) Vite's own logger channel
const base = createLogger();
const customLogger = {
  ...base,
  warn(msg, options) {
    if (matchesSilenced(msg)) return;
    base.warn(msg, options);
  },
  warnOnce(msg, options) {
    if (matchesSilenced(msg)) return;
    base.warnOnce(msg, options);
  },
};

// 2) Anything routed straight to console.warn (Node/Vite deprecations)
const nativeWarn = console.warn.bind(console);
console.warn = (...args) => {
  if (args.some((a) => matchesSilenced(a))) return;
  nativeWarn(...args);
};

// https://astro.build/config
export default defineConfig({
  output: "static",
  build: { format: "file" },
  server: { port: 5173 },

  // Dev toolbar is the source of the optimizeDeps.esbuildOptions deprecation
  // warning under Vite 8; not needed for a static marketing site.
  devToolbar: { enabled: false },

  vite: {
    plugins: [tailwindcss()],
    customLogger,
  },

  adapter: cloudflare(),
});