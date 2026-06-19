// Solidify the sticky header once the page is scrolled.
function init() {
  const header = document.querySelector("[data-header]");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-solid", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
