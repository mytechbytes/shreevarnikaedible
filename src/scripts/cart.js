// Enquiry list ("cart"): localStorage state + header count + cart-page render.
// This is genuine interaction. Product CONTENT is baked into HTML; here we only
// read a slim data island (#sv-items) to render the user's chosen lines.
const ITEMS = (() => {
  try { return JSON.parse(document.getElementById("sv-items")?.textContent || "[]"); }
  catch { return []; }
})();
const byId = (id) => ITEMS.find((p) => p.id === id);
const CART_KEY = "sv-enquiry";

const ICON_CLOSE = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
const ICON_BAG = '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>';

function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } }
function setCart(items) { try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch {} updateCount(); }
function count() { return getCart().reduce((n, i) => n + i.qty, 0); }
function addToCart(id, size) {
  const items = getCart();
  const ex = items.find((i) => i.id === id && i.size === size);
  if (ex) ex.qty += 1; else items.push({ id, size: size || "", qty: 1 });
  setCart(items);
  toast("Added to enquiry list");
}
function updateCount() {
  const n = count();
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = n; el.style.display = n ? "grid" : "none";
  });
}
window.SV_cart = { get: getCart, set: setCart, add: addToCart, count };

/* ---- toast ---- */
let toastTimer;
function toast(msg) {
  let t = document.getElementById("sv-toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "sv-toast";
    t.style.cssText =
      "position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(20px);" +
      "background:var(--ink);color:#fff;padding:.8rem 1.3rem;border-radius:999px;font-weight:600;" +
      "font-size:.9rem;z-index:200;opacity:0;transition:.25s;box-shadow:0 14px 40px -16px rgba(0,0,0,.6)";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  requestAnimationFrame(() => { t.style.opacity = "1"; t.style.transform = "translateX(-50%) translateY(0)"; });
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.style.opacity = "0"; t.style.transform = "translateX(-50%) translateY(20px)"; }, 1900);
}
window.SV_toast = toast;

/* ---- add-to-enquiry buttons (product detail page) ---- */
document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  if (!add) return;
  const id = add.dataset.add;
  const sizeEl = document.querySelector("[data-size-input]:checked");
  addToCart(id, sizeEl ? sizeEl.value : "");
});

/* ---- cart / enquiry page ---- */
function mountCart() {
  const host = document.querySelector("[data-cart-page]");
  if (!host) return;
  function render() {
    const items = getCart();
    if (!items.length) {
      host.innerHTML =
        `<div style="text-align:center;padding:60px 0">
          <div style="color:var(--brand-300)">${ICON_BAG}</div>
          <h2 class="serif" style="font-size:1.8rem;margin:.6rem 0 .4rem">Your enquiry list is empty</h2>
          <p class="muted" style="margin-bottom:1.4rem">Add products you're interested in and send us one enquiry.</p>
          <a class="btn btn-primary" href="/products.html">Browse Products</a></div>`;
      return;
    }
    host.innerHTML =
      `<div class="grid lg:grid-cols-3 gap-8">
        <div style="grid-column:span 2" data-lines></div>
        <aside>
          <div class="card" style="padding:22px">
            <h3 class="serif" style="font-size:1.3rem;margin-bottom:.8rem">Enquiry Summary</h3>
            <div style="display:flex;justify-content:space-between;font-size:.92rem;margin-bottom:.4rem"><span class="muted">Items</span><span data-sum-items></span></div>
            <div style="display:flex;justify-content:space-between;font-size:.92rem;margin-bottom:1rem"><span class="muted">Pricing</span><span>On request</span></div>
            <p class="muted" style="font-size:.82rem;margin-bottom:1rem">This is a showcase — no online payment. Send your list and our team will respond with a quote.</p>
            <a class="btn btn-primary btn-block" href="/contact.html?enquiry=1">Send Enquiry</a>
            <button class="btn btn-ghost btn-block" data-clear style="margin-top:.4rem">Clear list</button>
          </div>
        </aside>
      </div>`;
    const lines = host.querySelector("[data-lines]");
    lines.innerHTML = items.map((it, idx) => {
      const p = byId(it.id);
      if (!p) return "";
      return `<div class="card" style="flex-direction:row;align-items:center;padding:14px;margin-bottom:14px">
        <div style="width:84px;height:84px;flex:none;border-radius:12px;overflow:hidden;background:var(--brand-50)"><img src="${p.image}" alt="" style="width:100%;height:100%;object-fit:cover"></div>
        <div style="flex:1;min-width:0;padding:0 14px">
          <div class="card-cat">${p.collection}</div>
          <a href="/products/${p.slug}.html"><h3 class="card-title" style="font-size:1rem">${p.name}</h3></a>
          ${it.size ? `<div class="muted" style="font-size:.82rem">Size: ${it.size}</div>` : ""}
        </div>
        <div style="display:flex;align-items:center;gap:.4rem">
          <button class="chip" data-dec="${idx}" style="padding:.35rem .6rem">−</button>
          <span style="min-width:22px;text-align:center;font-weight:700">${it.qty}</span>
          <button class="chip" data-inc="${idx}" style="padding:.35rem .6rem">+</button>
          <button class="icon-btn" data-rm="${idx}" aria-label="Remove" style="width:36px;height:36px">${ICON_CLOSE}</button>
        </div>
      </div>`;
    }).join("");
    host.querySelector("[data-sum-items]").textContent = count();
    lines.querySelectorAll("[data-inc]").forEach((b) => b.addEventListener("click", () => { const a = getCart(); a[+b.dataset.inc].qty++; setCart(a); render(); }));
    lines.querySelectorAll("[data-dec]").forEach((b) => b.addEventListener("click", () => { const a = getCart(); const i = +b.dataset.dec; a[i].qty = Math.max(1, a[i].qty - 1); setCart(a); render(); }));
    lines.querySelectorAll("[data-rm]").forEach((b) => b.addEventListener("click", () => { const a = getCart(); a.splice(+b.dataset.rm, 1); setCart(a); render(); }));
    host.querySelector("[data-clear]").addEventListener("click", () => { setCart([]); render(); });
  }
  render();
}

function init() { updateCount(); mountCart(); }
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
