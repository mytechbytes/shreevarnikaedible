// Quick-view modal. Built on demand from the #sv-items data island; the actual
// product pages are fully static — this is a convenience overlay only.
const ITEMS = (() => {
  try { return JSON.parse(document.getElementById("sv-items")?.textContent || "[]"); }
  catch { return []; }
})();
const byId = (id) => ITEMS.find((p) => p.id === id);
const stars = (n) => "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
const ICON_CLOSE = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';

let modal;
function ensureModal() {
  if (modal) return modal;
  modal = document.createElement("div");
  modal.id = "sv-modal";
  modal.className = "modal";
  modal.innerHTML =
    `<div class="modal-bg" data-close-modal></div>
     <div class="modal-card"><button class="modal-close" data-close-modal aria-label="Close">${ICON_CLOSE}</button>
     <div class="modal-grid" data-modal-body></div></div>`;
  document.body.appendChild(modal);
  modal.querySelectorAll("[data-close-modal]").forEach((b) =>
    b.addEventListener("click", () => modal.classList.remove("open")));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") modal.classList.remove("open"); });
  return modal;
}

function openQuick(id) {
  const p = byId(id);
  if (!p) return;
  const m = ensureModal();
  const body = m.querySelector("[data-modal-body]");
  const onwards = p.from.startsWith("₹") ? " <span style='font-size:.8rem;color:var(--ink-soft)'>onwards</span>" : "";
  body.innerHTML =
    `<div style="background:var(--brand-50);aspect-ratio:1/1"><img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover"></div>
     <div style="padding:26px">
       <span class="tag">${p.collection}</span>
       <h3 class="serif" style="font-size:1.5rem;margin:.6rem 0 .3rem">${p.name}</h3>
       <div class="stars" style="margin-bottom:.6rem">${stars(p.rating)}</div>
       <p class="muted" style="font-size:.94rem">${p.short}</p>
       <div style="font-family:'Marcellus',serif;font-size:1.3rem;color:var(--brand-700);margin:.8rem 0">${p.from}${onwards}</div>
       <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:1rem">${p.sizes.map((s, i) => `<button type="button" class="chip" data-size aria-pressed="${i === 0}">${s}</button>`).join("")}</div>
       <div style="display:flex;gap:10px">
         <button type="button" class="btn btn-primary" style="flex:1" data-modal-add>Add to Enquiry</button>
         <a class="btn btn-outline" href="/products/${p.slug}.html">Full Details</a>
       </div>
     </div>`;
  let size = p.sizes[0];
  body.querySelectorAll("[data-size]").forEach((b) => b.addEventListener("click", () => {
    body.querySelectorAll("[data-size]").forEach((x) => x.setAttribute("aria-pressed", "false"));
    b.setAttribute("aria-pressed", "true");
    size = b.textContent;
  }));
  body.querySelector("[data-modal-add]").addEventListener("click", () => {
    if (window.SV_cart) window.SV_cart.add(p.id, size);
    m.classList.remove("open");
  });
  m.classList.add("open");
}

document.addEventListener("click", (e) => {
  const q = e.target.closest("[data-quick]");
  if (q) { e.preventDefault(); openQuick(q.dataset.quick); }
});
