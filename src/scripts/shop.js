// Products listing enhancements (progressive — the category filter itself is
// pure CSS via radios). JS only: honour ?cat= deep-links, keep the count/title
// in sync, mirror the choice into the URL, and reorder for the sort dropdown.
function init() {
  const root = document.querySelector("[data-shop]");
  if (!root) return;
  const radios = Array.from(root.querySelectorAll("[data-cat-radio]"));
  const grid = root.querySelector("[data-grid]");
  const countEl = root.querySelector("[data-shop-count]");
  const titleEl = root.querySelector("[data-shop-title]");
  const sortSel = root.querySelector("[data-sort]");
  if (!grid) return;
  const cards = Array.from(grid.children);
  const origOrder = cards.slice();

  const activeCat = () => (radios.find((r) => r.checked) || {}).value || "all";
  const labelOf = (cat) => (radios.find((r) => r.value === cat) || {}).dataset?.label || "All Products";
  const visible = (cat) => (cat === "all" ? cards.length : cards.filter((c) => c.dataset.cat === cat).length);

  function sync() {
    const cat = activeCat();
    if (countEl) { const n = visible(cat); countEl.textContent = n + (n === 1 ? " product" : " products"); }
    if (titleEl) titleEl.textContent = labelOf(cat);
    history.replaceState(null, "", cat === "all" ? "/products.html" : "/products.html?cat=" + cat);
  }

  // deep-link: ?cat=food → pre-check that radio (CSS handles the filtering)
  const initCat = new URLSearchParams(location.search).get("cat");
  if (initCat) { const r = radios.find((x) => x.value === initCat); if (r) r.checked = true; }
  radios.forEach((r) => r.addEventListener("change", sync));
  sync();

  if (sortSel) {
    const priceVal = (c) => { const n = parseInt((c.dataset.price || "").replace(/[^\d]/g, ""), 10); return isNaN(n) ? 1e9 : n; };
    sortSel.addEventListener("change", () => {
      const v = sortSel.value;
      const arr = origOrder.slice();
      if (v === "name") arr.sort((a, b) => (a.dataset.name || "").localeCompare(b.dataset.name || ""));
      else if (v === "price-asc") arr.sort((a, b) => priceVal(a) - priceVal(b));
      else if (v === "price-desc") arr.sort((a, b) => priceVal(b) - priceVal(a));
      arr.forEach((c) => grid.appendChild(c));
    });
  }
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
