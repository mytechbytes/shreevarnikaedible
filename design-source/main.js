/* ============================================================
   Shree Varnika Edible — site logic
   Shared chrome (header/footer), product data, theme switcher,
   mobile nav, quick-view modal, enquiry list, filters, reveals.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- IMAGES (Wix CDN, full-res) ---------------- */
  const CDN = "https://static.wixstatic.com/media/";
  const img = (id) => CDN + id; // bare original asset URL (reliably renders in <img>)
  const IMG = {
    hing:      img("31f928_3c0c7da1c0c44acb8d816fb379448785~mv2.jpg"),
    herbs:     img("31f928_4e747229c3694731a756577b46b2ff74~mv2.jpg"),
    pooja:     img("31f928_7d83702a48ee4e1d8edd1db6424e1aa6~mv2.jpg"),
    leaves:    img("31f928_dd8222fd5cb3430f8494908071c795a9~mv2.jpg"),
    silver:    img("31f928_afc2304b74ba45929450461fb69edeac~mv2.jpg"),
    saffron:   img("31f928_aaa5c231d059448f8a5aedf776ef0719~mv2.png"),
    dryfruits: img("31f928_d6cccaa2c7974b40b6077a42df89991d~mv2.png", 1400, 900),
    founder:   img("31f928_ab93bbc5fac546f8b4d42e926230b559~mv2.jpg", 700, 900),
    hero:      img("31f928_83eb4d8e6e3e4af784e39236790dfcb9~mv2.webp", 1600, 1000),
    ig1:       img("31f928_aa3bb1903622400da06dd778620f6a5e~mv2.jpeg", 500, 500),
    ig2:       img("31f928_8145463179ab4c468737d5bfc43ef22d~mv2.jpg", 500, 500),
    ig3:       img("31f928_4c4523f0bd0e49d4b84082707268402b~mv2.jpg", 500, 500),
    ig4:       img("31f928_ac7d1d74610743dbbbbadbde3057b1bc~mv2.png", 500, 500),
    ig5:       img("31f928_babd48e4fd6a468aa9556115c2c6e07a~mv2.jpg", 500, 500)
  };
  window.SV_IMG = IMG;

  /* ---------------- CATEGORIES ---------------- */
  const CATS = [
    { id: "all",    label: "All Products" },
    { id: "food",   label: "Food Products" },
    { id: "herbs",  label: "Herbs & Spices" },
    { id: "pooja",  label: "Pooja Articles" },
    { id: "leaves", label: "Silver & Gold Leaves" }
  ];
  const CAT_LABEL = id => (CATS.find(c => c.id === id) || {}).label || id;

  /* ---------------- PRODUCTS ---------------- */
  const PRODUCTS = [
    {
      id: "saffron", name: "Varnika Premium Saffron", cat: "food",
      collection: "New Additions", img: IMG.saffron, badge: "Bestseller", rating: 5,
      sizes: ["1 GM", "2 GM", "5 GM"], from: "₹ 449",
      short: "Handpicked, deep-crimson saffron prized for its vivid colour, distinct aroma and exquisite flavour.",
      desc: "We take great pride in offering the finest quality saffron. Carefully handpicked, our saffron is known for its vibrant colour, distinct aroma and exquisite flavour. Sourced from reputable farms to ensure authenticity and optimal quality, Varnika saffron adds a touch of luxury to a wide range of culinary creations.",
      notes: ["Hand-picked threads", "Rich aroma & colour", "100% pure, no fillers"]
    },
    {
      id: "hing", name: "Varnika Premium Hing", cat: "food",
      collection: "New Additions", img: IMG.hing, badge: "", rating: 5,
      sizes: ["50 GM", "100 GM", "250 GM"], from: "₹ 199",
      short: "Strong, aromatic asafoetida that lends an unmistakable depth to dals, curries and tempering.",
      desc: "Varnika Premium Hing is milled to a fine, consistent grade with a powerful aroma that blooms in hot oil. A pinch transforms everyday dals, curries and pickles — a kitchen essential crafted to exacting purity standards.",
      notes: ["Bold, lasting aroma", "Vegetarian & pure", "Finely milled grade"]
    },
    {
      id: "silver-cardamom", name: "Varnika Premium Silver-Coated Cardamom (Elaichi)", cat: "herbs",
      collection: "New Additions", img: IMG.herbs, badge: "New", rating: 5,
      sizes: ["100 GM", "250 GM"], from: "₹ 349",
      short: "Fragrant green cardamom delicately wrapped in edible silver — a royal mouth-freshener and garnish.",
      desc: "Whole green cardamom dressed in hygienic, 100% vegetarian edible silver leaf. A regal after-dinner mukhwas and a striking garnish for mithai, paan and festive thaals — where fragrance meets opulence.",
      notes: ["Edible silver coating", "Whole, aromatic pods", "Festive & gifting favourite"]
    },
    {
      id: "pooja", name: "Various Silver & Gold-Coated Pooja Articles", cat: "pooja",
      collection: "Pooja Articles", img: IMG.pooja, badge: "", rating: 5,
      sizes: ["Assorted"], from: "On request",
      short: "Coated supari, elaichi, cloves and ritual items for an elevated, auspicious pooja thali.",
      desc: "A curated range of silver and gold-coated pooja essentials — supari, elaichi, cloves and decorative items — crafted for temples, festivals and ceremonial offerings. Each piece is coated under hygienic, automated conditions for purity you can trust.",
      notes: ["Temple-grade finish", "Auspicious gifting", "Hygienic automated coating"]
    },
    {
      id: "gold-leaves", name: "Gold Leaves & Flakes", cat: "leaves",
      collection: "Silver & Gold Collection", img: IMG.leaves, badge: "Signature", rating: 5,
      sizes: ["10 Leaves", "25 Leaves", "Flakes Jar"], from: "On request",
      short: "Ultra-thin edible gold for sweets, chyawanprash and luxury culinary garnishing.",
      desc: "Perfectly beaten, ultra-thin edible gold leaves and flakes for premium sweets, chyawanprash and fine-dining presentation. Produced with KV Automation technology — eliminating human touch from critical stages — for a certified hygienic, 100% vegetarian finish.",
      notes: ["100% vegetarian", "Automated, touch-free process", "Connoisseur grade"]
    },
    {
      id: "silver-leaves", name: "Silver Leaves & Flakes", cat: "leaves",
      collection: "Silver & Gold Collection", img: IMG.silver, badge: "", rating: 5,
      sizes: ["50 Leaves", "100 Leaves", "Flakes Jar"], from: "On request",
      short: "Meticulously crafted edible silver vark for Indian sweets, paan and confections.",
      desc: "Our silver leaves are meticulously crafted to perfection. These edible metallic sheets are widely used in Indian sweets and confections, imparting elegance and opulence to the dining experience. Strict quality standards ensure they meet the expectations of home cooks and professional chefs alike.",
      notes: ["Edible vark", "Pure & hygienic", "Chef & home favourite"]
    }
  ];
  window.SV_PRODUCTS = PRODUCTS;
  const findProduct = id => PRODUCTS.find(p => p.id === id);

  /* slug = the per-product page filename (one static HTML file each) */
  const SLUGS = {
    "saffron":          "varnika-premium-saffron",
    "hing":             "varnika-premium-hing",
    "silver-cardamom":  "varnika-premium-silver-coated-cardamom-elaichi",
    "pooja":            "various-silver-and-gold-coated-pooja-articles",
    "gold-leaves":      "gold-leaves-and-flakes",
    "silver-leaves":    "silver-leaves-and-flakes"
  };
  PRODUCTS.forEach(p => { p.slug = SLUGS[p.id] || p.id; });
  const findBySlug = s => PRODUCTS.find(p => p.slug === s);
  window.SV_findBySlug = findBySlug;

  /* type-specific extra info shown on each product page */
  const INFO = {
    "saffron": {
      specs: [
        { label: "Product type", value: "Premium Mongra Saffron" },
        { label: "Form", value: "Whole threads (stigma)" },
        { label: "Net weight", value: "1g · 2g · 5g" },
        { label: "Diet", value: "100% Vegetarian" },
        { label: "Shelf life", value: "24 months" },
        { label: "Origin", value: "Select saffron farms" }
      ],
      usage: "Steep 4–5 strands in warm milk or water for ~10 minutes, then add to biryani, kheer, halwa or beverages for colour, aroma and flavour.",
      storage: "Keep in the original airtight pack in a cool, dry place away from direct sunlight. Best used within 24 months.",
      applications: ["Biryani & Pulao", "Kheer & Halwa", "Beverages", "Gifting"]
    },
    "hing": {
      specs: [
        { label: "Product type", value: "Compounded Asafoetida (Hing)" },
        { label: "Form", value: "Fine granules / powder" },
        { label: "Net weight", value: "50g · 100g · 250g" },
        { label: "Aroma", value: "Strong & long-lasting" },
        { label: "Diet", value: "100% Vegetarian" },
        { label: "Shelf life", value: "18 months" }
      ],
      usage: "Add a small pinch to hot oil or ghee while tempering dals, sabzis, kadhi and pickles to release its signature aroma.",
      storage: "Store in a tightly sealed container in a cool, dry place to preserve aroma. Keep away from moisture.",
      applications: ["Dal & Kadhi", "Tempering", "Pickles", "Curries"]
    },
    "silver-cardamom": {
      specs: [
        { label: "Product type", value: "Silver-coated Green Cardamom" },
        { label: "Form", value: "Whole pods with edible silver vark" },
        { label: "Net weight", value: "100g · 250g" },
        { label: "Coating", value: "Edible silver leaf" },
        { label: "Diet", value: "100% Vegetarian" },
        { label: "Shelf life", value: "12 months" }
      ],
      usage: "Serve as a royal after-meal mouth freshener, or use to garnish mithai, paan and festive thaals.",
      storage: "Keep in a cool, dry place in an airtight container. Handle gently to protect the silver coating.",
      applications: ["Mouth freshener", "Mithai garnish", "Paan", "Festive gifting"]
    },
    "pooja": {
      specs: [
        { label: "Product type", value: "Silver & gold-coated pooja items" },
        { label: "Contents", value: "Coated supari, elaichi, cloves & décor" },
        { label: "Coating", value: "Edible silver & gold leaf" },
        { label: "Packaging", value: "Assorted gift packs" },
        { label: "Customisation", value: "Available on request" },
        { label: "Diet", value: "100% Vegetarian" }
      ],
      usage: "Present on the pooja thali, offer as prasad or shagun, or use to adorn festive and ceremonial décor.",
      storage: "Store in a dry place away from humidity. Handle delicately to preserve the metallic finish.",
      applications: ["Festivals", "Weddings", "Temple offerings", "Shagun gifting"]
    },
    "gold-leaves": {
      specs: [
        { label: "Product type", value: "Edible Gold Leaf (Vark)" },
        { label: "Form", value: "Loose leaves & flakes" },
        { label: "Pack options", value: "10 · 25 leaves · flakes jar" },
        { label: "Leaf size", value: "≈ 80 × 80 mm" },
        { label: "Process", value: "KV Automation, touch-free" },
        { label: "Diet", value: "Food-grade · 100% Vegetarian" }
      ],
      usage: "Lift gently with a dry brush or knife and apply to sweets, chyawanprash, chocolates or plated dishes just before serving.",
      storage: "Keep booklets flat and dry at room temperature, away from drafts and moisture.",
      applications: ["Mithai & Sweets", "Chyawanprash", "Chocolates", "Fine-dining décor"]
    },
    "silver-leaves": {
      specs: [
        { label: "Product type", value: "Edible Silver Leaf (Chandi Vark)" },
        { label: "Form", value: "Loose leaves & flakes" },
        { label: "Pack options", value: "50 · 100 leaves · flakes jar" },
        { label: "Leaf size", value: "≈ 80 × 80 mm" },
        { label: "Process", value: "KV Automation, touch-free" },
        { label: "Diet", value: "Food-grade · 100% Vegetarian" }
      ],
      usage: "Apply gently over mithai, paan, dry fruits and confections for an elegant, edible silver finish.",
      storage: "Keep booklets flat and dry at room temperature, away from drafts and moisture.",
      applications: ["Mithai & Barfi", "Paan", "Dry fruits", "Confections"]
    }
  };
  PRODUCTS.forEach(p => { if (INFO[p.id]) Object.assign(p, INFO[p.id]); });

  /* ---------------- THEME ---------------- */
  const THEMES = [
    { id: "tuscan-sun",    label: "Tuscan Sun" },
    { id: "charcoal-blue", label: "Charcoal Blue" },
    { id: "verdigris",     label: "Verdigris" },
    { id: "sandy-brown",   label: "Sandy Brown" },
    { id: "burnt-peach",   label: "Burnt Peach" },
    { id: "peacock",       label: "Peacock" }
  ];
  const THEME_KEY = "sv-theme";
  const DEFAULT_THEME = "tuscan-sun";
  function getTheme() { return localStorage.getItem(THEME_KEY) || DEFAULT_THEME; }
  function applyTheme(id) {
    document.documentElement.setAttribute("data-theme", id);
    localStorage.setItem(THEME_KEY, id);
    document.querySelectorAll("[data-theme-select]").forEach(s => { s.value = id; });
    document.querySelectorAll("[data-theme-swatch]").forEach(b =>
      b.setAttribute("aria-pressed", String(b.dataset.themeSwatch === id)));
    const t = THEMES.find(x => x.id === id);
    document.querySelectorAll("[data-bg-theme-name]").forEach(s => { s.textContent = t ? t.label : "Theme"; });
  }
  // apply ASAP (called again on DOM ready for selects)
  document.documentElement.setAttribute("data-theme", getTheme());
  window.SV_applyTheme = applyTheme;

  /* ---------------- BACKGROUND MODE ---------------- */
  const BG_KEY = "sv-bg";
  const DEFAULT_BG = "white";
  function getBg() { return localStorage.getItem(BG_KEY) || DEFAULT_BG; }
  function applyBg(mode) {
    if (mode !== "white" && mode !== "tint") mode = DEFAULT_BG;
    document.documentElement.setAttribute("data-bg", mode);
    localStorage.setItem(BG_KEY, mode);
    document.querySelectorAll("[data-bg-opt]").forEach(b =>
      b.setAttribute("aria-pressed", String(b.dataset.bgOpt === mode)));
  }
  document.documentElement.setAttribute("data-bg", getBg());
  window.SV_applyBg = applyBg;

  /* ---------------- LAYOUT SWITCHER (A–E) ---------------- */
  const LAYOUTS = [
    { k: "A", file: "index.html" },
    { k: "B", file: "home-2.html" },
    { k: "C", file: "home-4.html" },
    { k: "D", file: "home-5.html" }
  ];
  function renderLayoutSwitch() {
    document.querySelectorAll("[data-layout-switch]").forEach(el => {
      const cur = el.dataset.layoutSwitch;
      el.classList.add("layout-switch");
      el.innerHTML =
        `<span style="padding-left:.6rem;font-size:.7rem;font-weight:700;letter-spacing:.1em;color:var(--ink-soft);text-transform:uppercase">Home</span>` +
        LAYOUTS.map(l => `<a class="${l.k === cur ? "on" : ""}" href="${l.file}">${l.k}</a>`).join("");
    });
  }

  /* ---------------- ENQUIRY LIST (visual cart) ---------------- */
  const CART_KEY = "sv-enquiry";
  function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } }
  function setCart(items) { localStorage.setItem(CART_KEY, JSON.stringify(items)); updateCartCount(); }
  function addToCart(id, size) {
    const items = getCart();
    const ex = items.find(i => i.id === id && i.size === size);
    if (ex) ex.qty += 1; else items.push({ id, size: size || "", qty: 1 });
    setCart(items);
    toast("Added to enquiry list");
  }
  function cartCount() { return getCart().reduce((n, i) => n + i.qty, 0); }
  function updateCartCount() {
    const n = cartCount();
    document.querySelectorAll("[data-cart-count]").forEach(el => {
      el.textContent = n; el.style.display = n ? "grid" : "none";
    });
  }
  window.SV_cart = { get: getCart, set: setCart, add: addToCart, count: cartCount };

  /* ---------------- TOAST ---------------- */
  let toastTimer;
  function toast(msg) {
    let t = document.getElementById("sv-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "sv-toast";
      t.style.cssText = "position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(20px);" +
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

  /* ---------------- ICONS ---------------- */
  const I = {
    menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    bag: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>',
    arrow: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    chev: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
    phone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8.1 9.6a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z"/></svg>',
    mail: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    pin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    leaf: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 8-4 13-9 13Z"/><path d="M4 20c2-4 5-7 9-9"/></svg>'
  };
  window.SV_ICONS = I;
  const stars = n => "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);

  /* ---------------- NAV LINKS ---------------- */
  const NAV = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About Us" },
    { href: "products.html?cat=food", label: "Food Products" },
    { href: "products.html?cat=herbs", label: "Herbs & Spices" },
    { href: "products.html?cat=pooja", label: "Pooja Articles" },
    { href: "products.html?cat=leaves", label: "Silver & Gold" },
    { href: "contact.html", label: "Contact" }
  ];
  function currentPage() { return (location.pathname.split("/").pop() || "index.html"); }

  /* ---------------- HEADER ---------------- */
  function renderHeader() {
    const host = document.querySelector("[data-site-header]");
    if (!host) return;
    const here = currentPage();
    const links = NAV.map(n => {
      const file = n.href.split("?")[0];
      const active = file === here && !(here === "index.html" && file !== "index.html");
      return `<a class="nav-link${active ? " active" : ""}" href="${n.href}">${n.label}</a>`;
    }).join("");
    host.innerHTML = `
      <header class="site-header">
        <div class="wrap hdr-row">
          <a class="brand" href="index.html" aria-label="Shree Varnika Edible home">
            <img class="brand-logo" src="assets/logo.png" alt="Shree Varnika Edible Pvt. Ltd.">
            <span class="leading-none">
              <span class="brand-name">Shree Varnika Edible</span>
              <span class="brand-sub" style="display:block">Pvt. Ltd.</span>
            </span>
          </a>
          <nav class="nav-desk">${links}</nav>
          <div class="hdr-actions">
            <a class="icon-btn" href="cart.html" aria-label="Enquiry list">${I.bag}
              <span class="cart-count" data-cart-count style="display:none">0</span></a>
            <button class="icon-btn burger" data-open-drawer aria-label="Open menu">${I.menu}</button>
          </div>
        </div>
      </header>
      <div class="drawer" data-drawer>
        <div class="drawer-bg" data-close-drawer></div>
        <aside class="drawer-panel">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.6rem">
            <span class="serif" style="font-size:1.2rem">Menu</span>
            <button class="icon-btn" data-close-drawer aria-label="Close menu">${I.close}</button>
          </div>
          ${NAV.map(n => `<a class="drawer-link" href="${n.href}">${n.label} ${I.arrow}</a>`).join("")}
          <a class="btn btn-primary btn-block" href="contact.html" style="margin-top:auto">Request a Quote</a>
        </aside>
      </div>`;

    const drawer = host.querySelector("[data-drawer]");
    host.querySelector("[data-open-drawer]").addEventListener("click", () => drawer.classList.add("open"));
    host.querySelectorAll("[data-close-drawer]").forEach(b => b.addEventListener("click", () => drawer.classList.remove("open")));
  }

  /* ---------------- FOOTER ---------------- */
  function renderFooter() {
    const host = document.querySelector("[data-site-footer]");
    if (!host) return;
    const themeOptions = THEMES.map(t => `<option value="${t.id}">${t.label}</option>`).join("");
    const swatches = THEMES.map(t =>
      `<button data-theme-swatch="${t.id}" title="${t.label}" aria-pressed="false" style="background:${swatchColor(t.id)}"></button>`).join("");
    host.innerHTML = `
      <footer class="site-footer">
        <div class="wrap section" style="padding-block:56px">
          <div class="foot-cols">
            <div>
              <a class="brand" href="index.html" style="margin-bottom:1rem">
                <img class="brand-logo" src="assets/logo.png" alt="Shree Varnika Edible Pvt. Ltd." style="height:54px">
                <span><span class="brand-name" style="color:#fff">Shree Varnika Edible</span>
                <span class="brand-sub" style="display:block;color:var(--brand-300)">Pvt. Ltd.</span></span>
              </a>
              <p style="max-width:34ch;color:#b7afa3;font-size:.92rem">Founded in 2010 by Mr. Tara Shankar Singh — manufacturing hygienic, pure, 100% vegetarian edible silver &amp; gold leaves, premium spices and pooja articles.</p>
              <div style="display:flex;gap:10px;margin-top:1rem">
                <a class="icon-btn" href="#" aria-label="Instagram" style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.15);color:#fff">${igIcon()}</a>
                <a class="icon-btn" href="#" aria-label="Facebook" style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.15);color:#fff">${fbIcon()}</a>
                <a class="icon-btn" href="#" aria-label="YouTube" style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.15);color:#fff">${ytIcon()}</a>
              </div>
            </div>
            <div>
              <div class="foot-label">Shop</div>
              ${CATS.filter(c => c.id !== "all").map(c => `<a class="foot-link" href="products.html?cat=${c.id}">${c.label}</a>`).join("")}
              <a class="foot-link" href="products.html">View All</a>
            </div>
            <div>
              <div class="foot-label">Company</div>
              <a class="foot-link" href="about.html">About Us</a>
              <a class="foot-link" href="contact.html">Contact Us</a>
              <a class="foot-link" href="#">Terms &amp; Conditions</a>
              <a class="foot-link" href="#">Privacy Policy</a>
            </div>
            <div>
              <div class="foot-label">Headquarters</div>
              <p style="display:flex;gap:.5rem;font-size:.9rem;color:#cfc7bb">${I.pin}<span>E-83, UPSIDC, Site-B, Surajpur, Greater Noida, Uttar Pradesh — 201306</span></p>
              <a class="foot-link" href="mailto:sales@shreevarnikaedible.com" style="display:flex;gap:.5rem">${I.mail}sales@shreevarnikaedible.com</a>
              <a class="foot-link" href="tel:+919873477849" style="display:flex;gap:.5rem">${I.phone}+91 987-347-7849</a>

              <div class="foot-label" style="margin-top:1.4rem">Choose a Theme</div>
              <div class="theme-pick">
                <span class="swatch"></span>
                <select class="theme-select" data-theme-select aria-label="Select colour theme">${themeOptions}</select>
                <span class="chev">${I.chev}</span>
              </div>
              <div class="theme-swatches">${swatches}</div>

              <div class="foot-label" style="margin-top:1.2rem">Background</div>
              <div class="bg-seg" role="radiogroup" aria-label="Page background">
                <button data-bg-opt="white" role="radio" aria-pressed="true"><span class="dot white"></span>White</button>
                <button data-bg-opt="tint" role="radio" aria-pressed="false"><span class="dot tint"></span>Light <span data-bg-theme-name>Theme</span></button>
              </div>
            </div>
          </div>
          <div class="divider" style="background:rgba(255,255,255,.1);margin:34px 0 20px"></div>
          <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:space-between;align-items:center;font-size:.82rem;color:#9a9286">
            <span>© 2024 Shree Varnika Edible Pvt. Ltd. — Royal Craftsmanship, Pure Ingredients.</span>
            <span>GST 09AAHCV6293N1Z8 · Manufacturer &amp; Exporter</span>
          </div>
        </div>
      </footer>`;

    const sel = host.querySelector("[data-theme-select]");
    sel.addEventListener("change", e => applyTheme(e.target.value));
    host.querySelectorAll("[data-theme-swatch]").forEach(b =>
      b.addEventListener("click", () => applyTheme(b.dataset.themeSwatch)));
    host.querySelectorAll("[data-bg-opt]").forEach(b =>
      b.addEventListener("click", () => applyBg(b.dataset.bgOpt)));
  }
  function swatchColor(id) {
    const map = { "tuscan-sun": "#dea821", "charcoal-blue": "#40768c", "verdigris": "#2ba193", "sandy-brown": "#ee7411", "burnt-peach": "#e0451f",
      "peacock": "linear-gradient(135deg,#2ba193 0 38%,#dea821 38% 70%,#e0451f 70%)" };
    return map[id];
  }
  function igIcon() { return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>'; }
  function fbIcon() { return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2a1 1 0 0 1 1-1Z"/></svg>'; }
  function ytIcon() { return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12s0-3-.4-4.3a2.7 2.7 0 0 0-1.9-1.9C18.4 5.4 12 5.4 12 5.4s-6.4 0-7.7.4a2.7 2.7 0 0 0-1.9 1.9C2 9 2 12 2 12s0 3 .4 4.3a2.7 2.7 0 0 0 1.9 1.9c1.3.4 7.7.4 7.7.4s6.4 0 7.7-.4a2.7 2.7 0 0 0 1.9-1.9C22 15 22 12 22 12Zm-12 3V9l5 3-5 3Z"/></svg>'; }

  /* ---------------- PRODUCT CARD MARKUP ---------------- */
  function productCard(p) {
    return `<article class="card">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
      <a class="card-media" href="${p.slug}.html" aria-label="${p.name}">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <div class="card-quick">
          <button class="btn btn-dark btn-sm btn-block" data-quick="${p.id}">Quick View</button>
        </div>
      </a>
      <div class="card-body">
        <span class="card-cat">${p.collection}</span>
        <a href="${p.slug}.html"><h3 class="card-title">${p.name}</h3></a>
        <div class="stars" aria-label="${p.rating} out of 5">${stars(p.rating)}</div>
        <div class="card-foot">
          <span class="price">${p.from}${p.from.startsWith("₹") ? " <small>onwards</small>" : ""}</span>
          <a class="btn-ghost" href="${p.slug}.html" style="font-weight:700;font-size:.84rem;display:inline-flex;gap:.3rem;align-items:center">Details ${I.arrow}</a>
        </div>
      </div>
    </article>`;
  }
  window.SV_productCard = productCard;

  /* ---------------- QUICK VIEW MODAL ---------------- */
  function ensureModal() {
    let m = document.getElementById("sv-modal");
    if (m) return m;
    m = document.createElement("div");
    m.id = "sv-modal"; m.className = "modal";
    m.innerHTML = `<div class="modal-bg" data-close-modal></div>
      <div class="modal-card"><button class="modal-close" data-close-modal aria-label="Close">${I.close}</button>
      <div class="modal-grid" data-modal-body></div></div>`;
    document.body.appendChild(m);
    m.querySelectorAll("[data-close-modal]").forEach(b => b.addEventListener("click", () => m.classList.remove("open")));
    return m;
  }
  function openQuick(id) {
    const p = findProduct(id); if (!p) return;
    const m = ensureModal();
    const body = m.querySelector("[data-modal-body]");
    body.innerHTML = `
      <div style="background:var(--brand-50);aspect-ratio:1/1"><img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover"></div>
      <div style="padding:26px">
        <span class="tag">${p.collection}</span>
        <h3 class="serif" style="font-size:1.5rem;margin:.6rem 0 .3rem">${p.name}</h3>
        <div class="stars" style="margin-bottom:.6rem">${stars(p.rating)}</div>
        <p class="muted" style="font-size:.94rem">${p.short}</p>
        <div style="font-family:'Marcellus',serif;font-size:1.3rem;color:var(--brand-700);margin:.8rem 0">${p.from}${p.from.startsWith("₹") ? " <span style='font-size:.8rem;color:var(--ink-soft)'>onwards</span>" : ""}</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:1rem">${p.sizes.map((s, i) => `<button class="chip" data-size aria-pressed="${i === 0}">${s}</button>`).join("")}</div>
        <div style="display:flex;gap:10px">
          <button class="btn btn-primary" style="flex:1" data-add="${p.id}">Add to Enquiry</button>
          <a class="btn btn-outline" href="${p.slug}.html">Full Details</a>
        </div>
      </div>`;
    let size = p.sizes[0];
    body.querySelectorAll("[data-size]").forEach(b => b.addEventListener("click", () => {
      body.querySelectorAll("[data-size]").forEach(x => x.setAttribute("aria-pressed", "false"));
      b.setAttribute("aria-pressed", "true"); size = b.textContent;
    }));
    body.querySelector("[data-add]").addEventListener("click", () => { addToCart(p.id, size); m.classList.remove("open"); });
    m.classList.add("open");
  }
  document.addEventListener("click", e => {
    const q = e.target.closest("[data-quick]");
    if (q) { e.preventDefault(); openQuick(q.dataset.quick); }
  });

  /* ---------------- MOUNT GRIDS (data-products-grid) ---------------- */
  function mountGrids() {
    document.querySelectorAll("[data-products-grid]").forEach(host => {
      const filter = host.dataset.productsGrid; // "all" | cat | comma list of ids
      let list;
      if (filter === "all" || !filter) list = PRODUCTS;
      else if (CATS.some(c => c.id === filter)) list = PRODUCTS.filter(p => p.cat === filter);
      else { const ids = filter.split(","); list = ids.map(findProduct).filter(Boolean); }
      const limit = parseInt(host.dataset.limit || "0", 10);
      if (limit) list = list.slice(0, limit);
      host.innerHTML = list.map(productCard).join("");
    });
  }

  /* ---------------- REVEAL ON SCROLL ---------------- */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver((ents) => {
      ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
    els.forEach(e => io.observe(e));
    // Safety: some embedded/preview viewports never fire IO — guarantee visibility.
    setTimeout(() => els.forEach(e => e.classList.add("in")), 700);
  }

  /* ---------------- SHOP PAGE ---------------- */
  function mountShop() {
    const host = document.querySelector("[data-shop]");
    if (!host) return;
    const params = new URLSearchParams(location.search);
    let active = params.get("cat") || "all";
    if (!CATS.some(c => c.id === active)) active = "all";
    let sort = "featured";

    const chipsEl = host.querySelector("[data-shop-chips]");
    const gridEl = host.querySelector("[data-shop-grid]");
    const countEl = host.querySelector("[data-shop-count]");
    const titleEl = host.querySelector("[data-shop-title]");
    const sortEl = host.querySelector("[data-shop-sort]");

    chipsEl.innerHTML = CATS.map(c =>
      `<button class="chip" data-cat="${c.id}" aria-pressed="${c.id === active}">${c.label}</button>`).join("");

    function priceVal(p) { const n = parseInt(String(p.from).replace(/[^\d]/g, ""), 10); return isNaN(n) ? 1e9 : n; }
    function render() {
      let list = active === "all" ? PRODUCTS.slice() : PRODUCTS.filter(p => p.cat === active);
      if (sort === "price-asc") list.sort((a, b) => priceVal(a) - priceVal(b));
      else if (sort === "price-desc") list.sort((a, b) => priceVal(b) - priceVal(a));
      else if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
      gridEl.innerHTML = list.map(productCard).join("");
      if (countEl) countEl.textContent = list.length + (list.length === 1 ? " product" : " products");
      if (titleEl) titleEl.textContent = active === "all" ? "All Products" : CAT_LABEL(active);
      chipsEl.querySelectorAll("[data-cat]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.cat === active)));
    }
    chipsEl.addEventListener("click", e => {
      const b = e.target.closest("[data-cat]"); if (!b) return;
      active = b.dataset.cat;
      history.replaceState(null, "", active === "all" ? "products.html" : "products.html?cat=" + active);
      render();
    });
    if (sortEl) sortEl.addEventListener("change", e => { sort = e.target.value; render(); });
    render();
  }

  /* ---------------- PRODUCT DETAIL ---------------- */
  function mountProductDetail() {
    const host = document.querySelector("[data-product-detail]");
    if (!host) return;
    const slug = host.dataset.slug;
    const id = new URLSearchParams(location.search).get("id");
    const p = (slug && findBySlug(slug)) || findProduct(id) || PRODUCTS[0];
    document.title = p.name + " — Shree Varnika Edible";
    const related = PRODUCTS.filter(x => x.id !== p.id && x.cat === p.cat).concat(PRODUCTS.filter(x => x.cat !== p.cat)).slice(0, 4);
    const specRows = (p.specs || []).map(s =>
      `<div style="display:flex;justify-content:space-between;gap:18px;padding:.72rem 0;border-bottom:1px solid var(--line)"><span class="muted" style="font-size:.88rem">${s.label}</span><span style="font-weight:600;font-size:.9rem;text-align:right">${s.value}</span></div>`).join("");
    const infoSection = (p.specs || p.usage) ? `
      <section class="section band-brand" style="padding-block:clamp(40px,8vw,80px)">
        <div class="wrap">
          <p class="eyebrow mb-2">Product Information</p>
          <h2 style="font-size:clamp(1.7rem,5vw,2.4rem)">Details &amp; specifications</h2>
          <div class="grid lg:grid-cols-2 gap-8" style="margin-top:26px">
            <div class="card" style="padding:clamp(18px,3vw,28px)">
              <h3 class="serif" style="font-size:1.2rem;margin-bottom:.6rem">Specifications</h3>
              ${specRows || '<p class="muted">Details available on request.</p>'}
            </div>
            <div style="display:grid;gap:16px;align-content:start">
              ${p.usage ? `<div class="card" style="padding:clamp(18px,3vw,26px)"><div style="display:flex;align-items:center;gap:.6rem;margin-bottom:.5rem"><span style="color:var(--brand-600)">${I.leaf}</span><h3 class="serif" style="font-size:1.15rem">How to use</h3></div><p class="muted" style="font-size:.95rem">${p.usage}</p></div>` : ""}
              ${p.storage ? `<div class="card" style="padding:clamp(18px,3vw,26px)"><h3 class="serif" style="font-size:1.15rem;margin-bottom:.4rem">Storage &amp; shelf life</h3><p class="muted" style="font-size:.95rem">${p.storage}</p></div>` : ""}
              ${p.applications ? `<div class="card" style="padding:clamp(18px,3vw,26px)"><h3 class="serif" style="font-size:1.15rem;margin-bottom:.7rem">Ideal for</h3><div style="display:flex;flex-wrap:wrap;gap:8px">${p.applications.map(a => `<span class="tag">${a}</span>`).join("")}</div></div>` : ""}
            </div>
          </div>
        </div>
      </section>` : "";
    host.innerHTML = `
      <div class="wrap" style="padding-top:22px">
        <nav style="font-size:.82rem;color:var(--ink-soft);display:flex;gap:.4rem;flex-wrap:wrap">
          <a href="index.html" style="color:var(--brand-700)">Home</a><span>/</span>
          <a href="products.html?cat=${p.cat}" style="color:var(--brand-700)">${CAT_LABEL(p.cat)}</a><span>/</span>
          <span>${p.name}</span>
        </nav>
      </div>
      <section class="section" style="padding-top:26px">
        <div class="wrap">
          <div class="grid lg:grid-cols-2 gap-10">
            <div>
              <div class="shadow-soft" style="border-radius:22px;overflow:hidden;aspect-ratio:1/1;background:var(--brand-50);position:relative">
                ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
                <img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover">
              </div>
              <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:12px">
                ${[p.img, IMG.dryfruits, IMG.leaves, IMG.silver].map((src, i) =>
                  `<div style="aspect-ratio:1/1;border-radius:12px;overflow:hidden;border:1px solid var(--line);${i === 0 ? "outline:2px solid var(--brand-500);outline-offset:1px" : ""}"><img src="${src}" alt="" style="width:100%;height:100%;object-fit:cover"></div>`).join("")}
              </div>
            </div>
            <div>
              <span class="tag">${p.collection}</span>
              <h1 class="serif" style="font-size:clamp(2rem,6vw,2.8rem);margin:.6rem 0 .4rem">${p.name}</h1>
              <div style="display:flex;align-items:center;gap:.6rem;margin-bottom:1rem">
                <span class="stars">${stars(p.rating)}</span>
                <span class="muted" style="font-size:.85rem">Premium grade · 100% vegetarian</span>
              </div>
              <div style="font-family:'Marcellus',serif;font-size:1.7rem;color:var(--brand-700);margin-bottom:1rem">${p.from}${p.from.startsWith("₹") ? " <span style='font-size:.9rem;color:var(--ink-soft)'>onwards</span>" : ""}</div>
              <p style="color:var(--ink-soft)">${p.desc}</p>
              <div style="margin:1.4rem 0">
                <div class="label">Available sizes</div>
                <div style="display:flex;flex-wrap:wrap;gap:8px" data-sizes>
                  ${p.sizes.map((s, i) => `<button class="chip" data-size aria-pressed="${i === 0}">${s}</button>`).join("")}
                </div>
              </div>
              <div style="display:flex;gap:10px;flex-wrap:wrap">
                <button class="btn btn-primary" style="flex:1;min-width:180px" data-add>Add to Enquiry</button>
                <a class="btn btn-dark" href="contact.html">Request a Quote</a>
              </div>
              <ul style="list-style:none;padding:0;margin:1.6rem 0 0;display:grid;gap:.6rem">
                ${p.notes.map(n => `<li style="display:flex;gap:.6rem;align-items:center;font-size:.92rem"><span style="color:var(--brand-600)">${I.leaf}</span>${n}</li>`).join("")}
              </ul>
              <div style="display:flex;gap:18px;margin-top:1.6rem;padding-top:1.4rem;border-top:1px solid var(--line);font-size:.84rem;color:var(--ink-soft)">
                <span>${I.phone} <a href="tel:+919873477849" style="color:var(--brand-700)">+91 987-347-7849</a></span>
                <span>${I.mail} <a href="mailto:sales@shreevarnikaedible.com" style="color:var(--brand-700)">Email</a></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      ${infoSection}
      <section class="section" style="padding-top:0">
        <div class="wrap">
          <div class="ornament" style="margin-bottom:30px"></div>
          <h2 style="font-size:clamp(1.6rem,5vw,2.2rem);margin-bottom:24px">You may also like</h2>
          <div class="prod-grid cols-4">${related.map(productCard).join("")}</div>
        </div>
      </section>`;
    let size = p.sizes[0];
    host.querySelectorAll("[data-size]").forEach(b => b.addEventListener("click", () => {
      host.querySelectorAll("[data-size]").forEach(x => x.setAttribute("aria-pressed", "false"));
      b.setAttribute("aria-pressed", "true"); size = b.textContent;
    }));
    host.querySelector("[data-add]").addEventListener("click", () => addToCart(p.id, size));
    // thumbnail switch
    const mainImg = host.querySelector(".shadow-soft img");
    host.querySelectorAll("[style*='aspect-ratio:1/1'] img").forEach(() => {});
  }

  /* ---------------- CART / ENQUIRY ---------------- */
  function mountCart() {
    const host = document.querySelector("[data-cart-page]");
    if (!host) return;
    function render() {
      const items = getCart();
      if (!items.length) {
        host.innerHTML = `<div style="text-align:center;padding:60px 0">
          <div style="font-size:2.4rem;color:var(--brand-300)">${I.bag}</div>
          <h2 class="serif" style="font-size:1.8rem;margin:.6rem 0 .4rem">Your enquiry list is empty</h2>
          <p class="muted" style="margin-bottom:1.4rem">Add products you're interested in and send us one enquiry.</p>
          <a class="btn btn-primary" href="products.html">Browse Products</a></div>`;
        return;
      }
      host.innerHTML = `
        <div class="grid lg:grid-cols-3 gap-8">
          <div style="grid-column:span 2" data-lines></div>
          <aside>
            <div class="card" style="padding:22px">
              <h3 class="serif" style="font-size:1.3rem;margin-bottom:.8rem">Enquiry Summary</h3>
              <div style="display:flex;justify-content:space-between;font-size:.92rem;margin-bottom:.4rem"><span class="muted">Items</span><span data-sum-items></span></div>
              <div style="display:flex;justify-content:space-between;font-size:.92rem;margin-bottom:1rem"><span class="muted">Pricing</span><span>On request</span></div>
              <p class="muted" style="font-size:.82rem;margin-bottom:1rem">This is a showcase — no online payment. Send your list and our team will respond with a quote.</p>
              <a class="btn btn-primary btn-block" href="contact.html">Send Enquiry</a>
              <button class="btn btn-ghost btn-block" data-clear style="margin-top:.4rem">Clear list</button>
            </div>
          </aside>
        </div>`;
      const lines = host.querySelector("[data-lines]");
      lines.innerHTML = items.map((it, idx) => {
        const p = findProduct(it.id); if (!p) return "";
        return `<div class="card" style="flex-direction:row;align-items:center;padding:14px;margin-bottom:14px">
          <div style="width:84px;height:84px;flex:none;border-radius:12px;overflow:hidden;background:var(--brand-50)"><img src="${p.img}" alt="" style="width:100%;height:100%;object-fit:cover"></div>
          <div style="flex:1;min-width:0;padding:0 14px">
            <div class="card-cat">${p.collection}</div>
            <a href="${p.slug}.html"><h3 class="card-title" style="font-size:1rem">${p.name}</h3></a>
            ${it.size ? `<div class="muted" style="font-size:.82rem">Size: ${it.size}</div>` : ""}
          </div>
          <div style="display:flex;align-items:center;gap:.4rem">
            <button class="chip" data-dec="${idx}" style="padding:.35rem .6rem">−</button>
            <span style="min-width:22px;text-align:center;font-weight:700">${it.qty}</span>
            <button class="chip" data-inc="${idx}" style="padding:.35rem .6rem">+</button>
            <button class="icon-btn" data-rm="${idx}" aria-label="Remove" style="width:36px;height:36px">${I.close}</button>
          </div>
        </div>`;
      }).join("");
      host.querySelector("[data-sum-items]").textContent = cartCount();
      lines.querySelectorAll("[data-inc]").forEach(b => b.addEventListener("click", () => { const a = getCart(); a[+b.dataset.inc].qty++; setCart(a); render(); }));
      lines.querySelectorAll("[data-dec]").forEach(b => b.addEventListener("click", () => { const a = getCart(); const i = +b.dataset.dec; a[i].qty = Math.max(1, a[i].qty - 1); setCart(a); render(); }));
      lines.querySelectorAll("[data-rm]").forEach(b => b.addEventListener("click", () => { const a = getCart(); a.splice(+b.dataset.rm, 1); setCart(a); render(); }));
      host.querySelector("[data-clear]").addEventListener("click", () => { setCart([]); render(); });
    }
    render();
  }

  /* ---------------- INIT ---------------- */
  function init() {
    renderHeader();
    renderFooter();
    renderLayoutSwitch();
    applyTheme(getTheme());
    applyBg(getBg());
    updateCartCount();
    mountGrids();
    mountShop();
    mountProductDetail();
    mountCart();
    initReveal();
    document.dispatchEvent(new CustomEvent("sv:ready"));
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
