// Theme + background persistence. The pre-paint inline script in Base.astro
// already applied the stored values; this wires the footer controls and keeps
// every control in sync. CSS does the actual recolouring via html[data-theme].
import themes from "../data/themes.json";

const THEME_KEY = themes.storageKeys.theme;
const BG_KEY = themes.storageKeys.bg;
const DEFAULT_THEME = themes.default;
const DEFAULT_BG = themes.defaultBg;
const labelFor = (v) => (themes.options.find((o) => o.value === v) || {}).label || "Theme";

function getTheme() {
  try { return localStorage.getItem(THEME_KEY) || DEFAULT_THEME; } catch { return DEFAULT_THEME; }
}
function applyTheme(v) {
  document.documentElement.dataset.theme = v;
  try { localStorage.setItem(THEME_KEY, v); } catch {}
  document.querySelectorAll("[data-theme-select]").forEach((s) => { s.value = v; });
  document.querySelectorAll("[data-theme-swatch]").forEach((b) =>
    b.setAttribute("aria-pressed", String(b.dataset.themeSwatch === v)));
  document.querySelectorAll("[data-bg-theme-name]").forEach((s) => { s.textContent = labelFor(v); });
}
function getBg() {
  try { const b = localStorage.getItem(BG_KEY); return b === "white" || b === "tint" ? b : DEFAULT_BG; }
  catch { return DEFAULT_BG; }
}
function applyBg(v) {
  if (v !== "white" && v !== "tint") v = DEFAULT_BG;
  document.documentElement.dataset.bg = v;
  try { localStorage.setItem(BG_KEY, v); } catch {}
  document.querySelectorAll("[data-bg-opt]").forEach((b) =>
    b.setAttribute("aria-pressed", String(b.dataset.bgOpt === v)));
}

function init() {
  applyTheme(getTheme());
  applyBg(getBg());
  document.querySelectorAll("[data-theme-select]").forEach((s) =>
    s.addEventListener("change", (e) => applyTheme(e.target.value)));
  document.querySelectorAll("[data-theme-swatch]").forEach((b) =>
    b.addEventListener("click", () => applyTheme(b.dataset.themeSwatch)));
  document.querySelectorAll("[data-bg-opt]").forEach((b) =>
    b.addEventListener("click", () => applyBg(b.dataset.bgOpt)));
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
