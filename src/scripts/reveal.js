// Scroll-reveal + count-up. Both are pure animation; content is always present
// (reveal CSS is gated behind html.js so no-JS visitors see everything at once).
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  if (reduce || !("IntersectionObserver" in window)) {
    els.forEach((e) => e.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (ents) => ents.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }),
    { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
  );
  els.forEach((e) => io.observe(e));
  // Safety net for viewports that never fire the observer.
  setTimeout(() => els.forEach((e) => e.classList.add("in")), 1400);
}

function initCountUp() {
  const els = document.querySelectorAll("[data-count]");
  if (!els.length) return;
  const run = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (isNaN(target)) return;
    if (reduce || !("IntersectionObserver" in window)) { el.textContent = target + suffix; return; }
    const dur = 1100, start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
  const io = new IntersectionObserver((ents) => ents.forEach((en) => {
    if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
  }), { threshold: 0.4 });
  els.forEach((e) => io.observe(e));
}

function init() { initReveal(); initCountUp(); }
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
