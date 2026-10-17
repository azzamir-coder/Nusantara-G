(function () {
  "use strict";
  // Anti-clickjacking: halaman tidak boleh dimuat di dalam iframe situs lain
  if (window.top !== window.self) {
    try { window.top.location.href = window.self.location.href; }
    catch (e) { document.documentElement.style.display = "none"; }
  }
  const CATEGORIES = [
    { id: "batik", name: "Batik & Tenun", icon: "🧵", desc: "Kain tulis, cap, dan tenun ikat daerah", bg: "#1F2C7A", fg: "#B7C1FF" },
    { id: "kopi", name: "Kopi Nusantara", icon: "☕", desc: "Biji dan bubuk kopi dari dataran tinggi", bg: "#4B3126", fg: "#E2BE9B" },
    { id: "kerajinan", name: "Kerajinan Tangan", icon: "🪵", desc: "Ukiran, anyaman, dan logam khas daerah", bg: "#C99A45", fg: "#FFF3D6" },
    { id: "kuliner", name: "Kuliner Khas", icon: "🍱", desc: "Camilan dan makanan olahan kampung halaman", bg: "#D8492B", fg: "#FFE0D3" },
    { id: "rempah", name: "Rempah & Herbal", icon: "🌿", desc: "Bumbu dapur dan jamu tradisional", bg: "#2E6A4C", fg: "#C4EBD3" },
    { id: "fashion", name: "Fashion Tradisional", icon: "👘", desc: "Busana adat bergaya modern sehari-hari", bg: "#8B2C5E", fg: "#F6CBE0" }
  ];
  const PRODUCTS = [
    { id: 1, name: "Batik Tulis Mega Mendung", category: "batik", region: "Cirebon, Jawa Barat", price: 850000, rating: 4.8, reviews: 124, sold: 310, badge: "Terlaris", icon: "🧵", desc: "Batik tulis motif Mega Mendung khas Cirebon, dikerjakan tangan di atas kain katun primisima dengan pewarna alami." },
    { id: 2, name: "Kain Tenun Ikat Sumba", category: "batik", region: "Sumba, NTT", price: 1250000, rating: 4.9, reviews: 86, sold: 140, badge: null, icon: "🧶", desc: "Tenun ikat khas Sumba dengan motif kuda dan simbol leluhur, ditenun manual selama berminggu-minggu oleh perajin lokal." },
    { id: 3, name: "Songket Silungkang", category: "batik", region: "Sumatra Barat", price: 1450000, rating: 4.7, reviews: 52, sold: 68, badge: null, icon: "🧵", desc: "Songket benang emas Silungkang, cocok untuk acara adat maupun resepsi pernikahan." },
    { id: 4, name: "Batik Cap Parang Solo", category: "batik", region: "Solo, Jawa Tengah", price: 320000, rating: 4.6, reviews: 210, sold: 480, badge: "Terlaris", icon: "🧵", desc: "Batik cap motif Parang klasik, nyaman dipakai harian dengan bahan katun adem." },
    { id: 5, name: "Kopi Gayo Arabika 250g", category: "kopi", region: "Aceh", price: 95000, rating: 4.9, reviews: 340, sold: 920, badge: "Terlaris", icon: "☕", desc: "Kopi arabika Gayo dari dataran tinggi Aceh, sangrai medium dengan aroma floral dan rasa cokelat lembut." },
    { id: 6, name: "Kopi Toraja Kalosi 200g", category: "kopi", region: "Toraja, Sulawesi Selatan", price: 110000, rating: 4.8, reviews: 198, sold: 560, badge: null, icon: "☕", desc: "Kopi Toraja Kalosi dengan body tebal dan after-taste rempah, favorit pecinta kopi tubruk." },
    { id: 7, name: "Kopi Luwak Bali Premium", category: "kopi", region: "Bali", price: 275000, rating: 4.7, reviews: 76, sold: 95, badge: null, icon: "☕", desc: "Kopi luwak asli Bali, diproses higienis dari perkebunan mitra petani lokal." },
    { id: 8, name: "Kopi Flores Bajawa", category: "kopi", region: "Flores, NTT", price: 88000, rating: 4.6, reviews: 54, sold: 130, badge: "Baru", icon: "☕", desc: "Kopi Bajawa dari lereng Gunung Inerie, karakter asam segar dengan sedikit rasa buah." },
    { id: 9, name: "Ukiran Kayu Jepara Motif Bunga", category: "kerajinan", region: "Jepara, Jawa Tengah", price: 420000, rating: 4.8, reviews: 61, sold: 74, badge: null, icon: "🪵", desc: "Panel ukiran kayu jati motif bunga, dikerjakan pengrajin Jepara turun-temurun." },
    { id: 10, name: "Anyaman Rotan Kalimantan", category: "kerajinan", region: "Kalimantan Barat", price: 175000, rating: 4.7, reviews: 44, sold: 88, badge: null, icon: "🧺", desc: "Tas anyaman rotan alami, ringan dan kuat, cocok untuk kebutuhan harian maupun oleh-oleh." },
    { id: 11, name: "Perak Ukir Kotagede", category: "kerajinan", region: "Yogyakarta", price: 690000, rating: 4.9, reviews: 39, sold: 46, badge: "Baru", icon: "💍", desc: "Perhiasan perak ukir khas Kotagede, dibuat dengan teknik filigree oleh perajin generasi ketiga." },
    { id: 12, name: "Gerabah Kasongan", category: "kerajinan", region: "Bantul, Yogyakarta", price: 65000, rating: 4.5, reviews: 28, sold: 120, badge: null, icon: "🏺", desc: "Vas gerabah Kasongan finishing halus, cocok sebagai dekorasi rumah bergaya etnik." },
    { id: 13, name: "Rendang Daging Kemasan", category: "kuliner", region: "Padang, Sumatra Barat", price: 85000, rating: 4.8, reviews: 156, sold: 640, badge: null, icon: "🍛", desc: "Rendang daging sapi khas Padang, dimasak berjam-jam dengan santan dan rempah pilihan, tahan hingga 6 bulan." },
    { id: 14, name: "Keripik Tempe Malang", category: "kuliner", region: "Malang, Jawa Timur", price: 25000, rating: 4.6, reviews: 203, sold: 810, badge: null, icon: "🍘", desc: "Keripik tempe renyah khas Malang, digoreng dengan bumbu tradisional tanpa pengawet." },
    { id: 15, name: "Dodol Garut Original", category: "kuliner", region: "Garut, Jawa Barat", price: 30000, rating: 4.5, reviews: 98, sold: 300, badge: null, icon: "🍬", desc: "Dodol Garut legit dengan resep asli, dibungkus kertas minyak tradisional." },
    { id: 16, name: "Bakpia Pathok Yogyakarta", category: "kuliner", region: "Yogyakarta", price: 45000, rating: 4.7, reviews: 172, sold: 700, badge: "Terlaris", icon: "🥮", desc: "Bakpia Pathok isi kacang hijau, dipanggang fresh setiap hari oleh mitra UMKM Jogja." },
    { id: 17, name: "Jamu Instan Kunyit Asam", category: "rempah", region: "Yogyakarta", price: 40000, rating: 4.6, reviews: 87, sold: 260, badge: null, icon: "🌿", desc: "Jamu instan kunyit asam tanpa pemanis buatan, praktis diseduh kapan saja." },
    { id: 18, name: "Rempah Bumbu Rendang Asli", category: "rempah", region: "Sumatra Barat", price: 35000, rating: 4.7, reviews: 112, sold: 340, badge: null, icon: "🌶️", desc: "Racikan bumbu rendang siap pakai sesuai resep asli Minang, tinggal tumis dan masak." },
    { id: 19, name: "Minyak Kayu Putih Buru", category: "rempah", region: "Pulau Buru, Maluku", price: 28000, rating: 4.5, reviews: 65, sold: 410, badge: null, icon: "🧴", desc: "Minyak kayu putih asli hasil sulingan tradisional dari Pulau Buru, Maluku." },
    { id: 20, name: "Kebaya Encim Modern", category: "fashion", region: "Jakarta", price: 550000, rating: 4.8, reviews: 48, sold: 52, badge: "Baru", icon: "👘", desc: "Kebaya encim dengan bordir tangan, dipotong mengikuti ukuran modern agar lebih nyaman dipakai." },
    { id: 21, name: "Blangkon Jogja Klasik", category: "fashion", region: "Yogyakarta", price: 120000, rating: 4.6, reviews: 33, sold: 77, badge: null, icon: "🎩", desc: "Blangkon motif batik klasik Yogyakarta, siap pakai untuk acara adat maupun formal." },
    { id: 22, name: "Sarung Tenun Bugis", category: "fashion", region: "Sulawesi Selatan", price: 265000, rating: 4.7, reviews: 58, sold: 96, badge: null, icon: "👘", desc: "Sarung tenun sutra Bugis dengan corak kotak warna cerah khas Sulawesi Selatan." }
  ];
  const FLASH_IDS = [5, 4, 14, 16, 12, 18];
  PRODUCTS.forEach((p) => {
    if (FLASH_IDS.includes(p.id)) { p.oldPrice = p.price; p.price = Math.round((p.price * 0.8) / 500) * 500; }
  });
  const REVIEW_NAMES = ["Dian S.", "Budi P.", "Sri Wahyuni", "Andi R.", "Made A.", "Fitri N.", "Hendra K.", "Lestari"];
  const REVIEW_TEXTS = [
    "Kualitas sesuai deskripsi, pengiriman rapi dan cepat.",
    "Suka sekali, motifnya autentik dan bahannya nyaman.",
    "Pesan kedua kalinya, konsisten bagus.",
    "Packing aman, produk sampai dalam kondisi baik.",
    "Sesuai ekspektasi, akan beli lagi untuk oleh-oleh."
  ];
  const SHIPPING_FEE = 20000;
  const FREE_SHIP_MIN = 300000;
  const COUPONS = {
    NUSANTARA10: { type: "pct", v: 10, label: "Diskon 10%" },
    HEMAT25: { type: "flat", v: 25000, label: "Potongan Rp25.000" },
    GRATISONGKIR: { type: "ship", label: "Gratis ongkir" }
  };
  let coupon = null;
  function calcTotals() {
    const subtotal = cartSubtotal();
    let discount = 0;
    let shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIP_MIN ? 0 : SHIPPING_FEE;
    let c = coupon ? COUPONS[coupon] : null;
    if (c && ((c.min && subtotal < c.min) || (c.pts && getPts().bal < c.pts))) { coupon = null; c = null; }
    if (c && subtotal > 0 && !(c.min && subtotal < c.min)) {
      if (c.type === "pct") discount = Math.round((subtotal * c.v) / 100);
      if (c.type === "flat") discount = Math.min(c.v, subtotal);
      if (c.type === "ship") shipping = 0;
    }
    return { subtotal, shipping, discount, total: subtotal - discount + shipping };
  }
  function generateReviews(product) {
    const count = Math.min(3, Math.max(1, Math.floor(product.reviews / 40)));
    const out = [];
    for (let i = 0; i < count; i++) {
      out.push({
        name: REVIEW_NAMES[(product.id + i) % REVIEW_NAMES.length],
        rating: Math.max(4, Math.round(product.rating - (i === 2 ? 1 : 0))),
        text: REVIEW_TEXTS[(product.id + i * 2) % REVIEW_TEXTS.length]
      });
    }
    return out;
  }
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  function formatRupiah(n) {
    return "Rp" + n.toLocaleString("id-ID");
  }
  function starString(rating) {
    const full = Math.round(rating);
    return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
  }
  function escapeHtml(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function isValidEmail(value) {
    return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
  function showToast(message, action) {
    const container = $("#toastContainer");
    if (!container) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    if (action) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = action.label;
      btn.addEventListener("click", () => { action.fn(); el.remove(); });
      el.appendChild(btn);
      el.style.animation = "toastIn 0.25s ease, toastOut 0.25s ease 5.95s forwards";
    }
    container.appendChild(el);
    setTimeout(() => el.remove(), action ? 6200 : 3200);
  }
  function showFormError(el, message) {
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
  }
  function hideFormError(el) {
    if (el) el.hidden = true;
  }
  function categoryById(id) {
    return CATEGORIES.find((c) => c.id === id);
  }
  function motifSvg(id, fg) {
    const stroke = `stroke="${fg}" stroke-opacity=".55" stroke-width="1.5"`;
    const fill = `fill="${fg}" fill-opacity=".3"`;
    const motifs = {
      batik: `<g fill="none" ${stroke}><ellipse cx="20" cy="10" rx="6" ry="10"/><ellipse cx="20" cy="30" rx="6" ry="10"/><ellipse cx="10" cy="20" rx="10" ry="6"/><ellipse cx="30" cy="20" rx="10" ry="6"/></g>`,
      kopi: `<g fill="none" ${stroke} transform="rotate(-30 20 20)"><ellipse cx="20" cy="20" rx="7" ry="11"/><path d="M20 9C14 16 26 24 20 31"/></g>`,
      kerajinan: `<rect width="20" height="20" ${fill}/><rect x="20" y="20" width="20" height="20" ${fill}/><path d="M0 20H40M20 0V40" fill="none" ${stroke}/>`,
      kuliner: `<path d="M0 40L10 22L20 40Z M20 40L30 22L40 40Z" ${fill}/><circle cx="10" cy="9" r="2" fill="${fg}" fill-opacity=".5"/><circle cx="30" cy="9" r="2" fill="${fg}" fill-opacity=".5"/>`,
      rempah: `<path d="M20 35C9 29 9 13 20 6C31 13 31 29 20 35ZM20 35V14" fill="none" ${stroke}/>`,
      fashion: `<g fill="none" ${stroke}><path d="M0 12Q10 0 20 12T40 12"/><path d="M0 32Q10 20 20 32T40 32"/></g>`
    };
    return `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">${motifs[id] || ""}</svg>`;
  }

  function injectTileStyles() {
    const css = CATEGORIES.map(
      (c) =>
        `.tile-${c.id}{background-color:${c.bg};background-image:url("data:image/svg+xml,${encodeURIComponent(motifSvg(c.id, c.fg))}");}`
    ).join("\n");
    const style = document.createElement("style");
    style.id = "tileStyles";
    style.textContent = css;
    document.head.appendChild(style);
  }
  const STORE_KEYS = {
    users: "nm_users",
    currentUser: "nm_current_user",
    cart: "nm_cart",
    wishlist: "nm_wishlist",
    ordersPrefix: "nm_orders_"
  };

  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function saveJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
    }
  }
  function simpleHash(value) {
    const binary = encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, (m, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
    return btoa(binary).split("").reverse().join("");
  }
  const toHex = (bytes) => Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  // Format terbaru "s3$": PBKDF2-SHA256 150.000 iterasi + salt acak per akun
  async function hashPw(pw, salt) {
    if (!(window.crypto && crypto.subtle)) return simpleHash(pw);
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", enc.encode(pw), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: enc.encode(salt), iterations: 150000 }, key, 256);
    return "s3$" + salt + "$" + toHex(new Uint8Array(bits));
  }
  // Format lama "s2$" (SHA-256 satu putaran) hanya dipakai untuk memverifikasi lalu dimigrasi ke "s3$"
  async function legacySha(pw, salt) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(salt + ":" + pw));
    return "s2$" + salt + "$" + toHex(new Uint8Array(buf));
  }
  function safeEqual(a, b) {
    a = String(a); b = String(b);
    let diff = a.length ^ b.length;
    for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
    return diff === 0;
  }
  function newSalt() {
    const a = new Uint8Array(16);
    if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(a);
    else a.forEach((_, i) => (a[i] = Math.random() * 256));
    return Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
  }
  async function checkPw(user, pw) {
    const h = String(user.passwordHash || "");
    const hasSubtle = !!(window.crypto && crypto.subtle);
    if (h.startsWith("s3$")) return hasSubtle && safeEqual(await hashPw(pw, h.split("$")[1]), h);
    if (h.startsWith("s2$")) return hasSubtle && safeEqual(await legacySha(pw, h.split("$")[1]), h);
    return safeEqual(h, simpleHash(pw));
  }

  /* ===== Keamanan: konstanta & helper ===== */
  const SEC = {
    maxAttempts: 5,                 // salah sandi sebelum akun dikunci
    lockMs: 5 * 60 * 1000,          // lama penguncian
    attemptWindowMs: 15 * 60 * 1000,// percobaan gagal dilupakan setelah jeda ini
    idleMs: 15 * 60 * 1000,         // keluar otomatis bila tidak aktif
    warnMs: 60 * 1000,              // peringatan sebelum keluar otomatis
    maxSessionMs: 8 * 60 * 60 * 1000,
    maxQty: 20,                     // maksimal per produk di keranjang
    codMax: 1000000,                // batas nilai pesanan COD (anti pesanan palsu)
    orderGapMs: 5000                // jeda minimal antar pesanan
  };
  const PAYMENT_METHODS = ["Transfer Bank", "E-Wallet", "COD"];
  const COMMON_PW = ["password", "password1", "password123", "12345678", "123456789", "1234567890", "qwerty123", "qwertyuiop", "admin123", "iloveyou", "katasandi", "katasandi1", "indonesia123", "grizlie123", "nusantara123"];
  const SUSPECT_SHOP = /(https?:|www\.|\.com\b|\.co\.id|\.id\b|wa\.me|t\.me|bit\.ly|@|\b(judi|slot|togel|casino|pinjol)\b)/i;
  let lastOrderAt = 0;
  let pendingSellerAfterLogin = 0;

  // Bersihkan teks dari karakter kontrol dan tanda < > lalu batasi panjangnya
  function cleanText(value, max) {
    return String(value == null ? "" : value).replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
  }
  function secureToken(len) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const a = new Uint8Array(len);
    if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(a);
    else a.forEach((_, i) => (a[i] = Math.random() * 256));
    return Array.from(a, (b) => chars[b % chars.length]).join("");
  }
  function fmtWait(ms) {
    const sec = Math.ceil(ms / 1000);
    return sec >= 60 ? Math.ceil(sec / 60) + " menit" : sec + " detik";
  }
  // Kebijakan kata sandi: 8+ karakter, huruf besar, huruf kecil, angka, bukan sandi umum
  function pwIssue(pw, email) {
    const miss = [];
    if (pw.length < 8) miss.push("minimal 8 karakter");
    if (!/[a-z]/.test(pw)) miss.push("huruf kecil");
    if (!/[A-Z]/.test(pw)) miss.push("huruf besar");
    if (!/\d/.test(pw)) miss.push("angka");
    if (miss.length) return "Kata sandi harus memuat: " + miss.join(", ") + ".";
    if (pw.length > 128) return "Kata sandi maksimal 128 karakter.";
    if (COMMON_PW.includes(pw.toLowerCase())) return "Kata sandi terlalu umum. Pilih yang lebih unik.";
    const local = String(email || "").split("@")[0].toLowerCase();
    if (local.length >= 4 && pw.toLowerCase().includes(local)) return "Jangan memakai nama email Anda di dalam kata sandi.";
    return "";
  }
  function pwScore(pw, email) {
    if (!pw) return 0;
    if (pwIssue(pw, email)) return 1;
    let s = 2;
    if (pw.length >= 12) s++;
    if (pw.length >= 10 && /[^A-Za-z0-9]/.test(pw)) s++;
    return Math.min(4, s);
  }
  // Penguncian login setelah terlalu banyak percobaan gagal (per email)
  const LOCK_KEY = "nm_lock";
  function lockRemaining(email) {
    const d = loadJSON(LOCK_KEY, {})[String(email).toLowerCase()];
    return d && d.until > Date.now() ? d.until - Date.now() : 0;
  }
  function recordFail(email) {
    const all = loadJSON(LOCK_KEY, {}), key = String(email).toLowerCase(), now = Date.now();
    Object.keys(all).forEach((k) => { if ((all[k].until || 0) < now && now - (all[k].t || 0) > SEC.attemptWindowMs) delete all[k]; });
    let d = all[key] || { n: 0, until: 0, t: now };
    if (now - d.t > SEC.attemptWindowMs || (d.until && d.until <= now)) d = { n: 0, until: 0, t: now };
    d.n += 1; d.t = now;
    let left = SEC.maxAttempts - d.n;
    if (left <= 0) { d.until = now + SEC.lockMs; d.n = 0; left = 0; }
    all[key] = d;
    saveJSON(LOCK_KEY, all);
    return left;
  }
  function clearFails(email) {
    const all = loadJSON(LOCK_KEY, {});
    delete all[String(email).toLowerCase()];
    saveJSON(LOCK_KEY, all);
  }
  // Pembatas laju sederhana (mis. pendaftaran akun)
  function throttleLeft(key, max, windowMs) {
    const now = Date.now(), list = loadJSON(key, []).filter((t) => now - t < windowMs);
    return list.length >= max ? windowMs - (now - list[0]) : 0;
  }
  function throttleHit(key, windowMs) {
    const now = Date.now(), list = loadJSON(key, []).filter((t) => now - t < windowMs);
    list.push(now);
    saveJSON(key, list);
  }
  // Muat data dari localStorage dengan validasi (cegah data rusak/dimanipulasi)
  function loadCart() {
    const raw = loadJSON(STORE_KEYS.cart, []), seen = new Set(), out = [];
    (Array.isArray(raw) ? raw : []).forEach((i) => {
      if (!i || !Number.isInteger(i.id) || seen.has(i.id) || !PRODUCTS.some((p) => p.id === i.id)) return;
      seen.add(i.id);
      out.push({ id: i.id, qty: Math.min(SEC.maxQty, Math.max(1, Math.floor(Number(i.qty)) || 1)) });
    });
    return out;
  }
  function loadWishlist() {
    const raw = loadJSON(STORE_KEYS.wishlist, []);
    return Array.from(new Set((Array.isArray(raw) ? raw : []).filter((id) => Number.isInteger(id) && PRODUCTS.some((p) => p.id === id))));
  }
  function loadUsers() {
    const raw = loadJSON(STORE_KEYS.users, []);
    return (Array.isArray(raw) ? raw : []).filter((u) => u && typeof u.email === "string" && typeof u.name === "string");
  }
  function loadSession(users) {
    const u = loadJSON(STORE_KEYS.currentUser, null);
    if (!u || typeof u.email !== "string") return null;
    const rec = users.find((x) => x.email.toLowerCase() === u.email.toLowerCase());
    if (!rec) return null;
    const now = Date.now();
    const s = { name: rec.name, email: rec.email, at: Number(u.at) || now, last: Number(u.last) || now };
    return now - s.last > SEC.idleMs || now - s.at > SEC.maxSessionMs ? null : s;
  }
  const _users = loadUsers();
  const state = {
    users: _users,
    currentUser: loadSession(_users),
    cart: loadCart(),
    wishlist: loadWishlist(),
    activeCategory: "all",
    searchQuery: ""
  };
  saveJSON(STORE_KEYS.currentUser, state.currentUser);
  function persistUsers() { saveJSON(STORE_KEYS.users, state.users); }
  function persistCurrentUser() { saveJSON(STORE_KEYS.currentUser, state.currentUser); }
  function persistCart() { saveJSON(STORE_KEYS.cart, state.cart); }
  function persistWishlist() { saveJSON(STORE_KEYS.wishlist, state.wishlist); }
  function ordersKey(email) { return STORE_KEYS.ordersPrefix + email; }
  function getOrders(email) { return loadJSON(ordersKey(email), []); }
  function saveOrders(email, orders) { saveJSON(ordersKey(email), orders); }
  const openLayers = [];
  let lastFocused = null;
  function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (openLayers.length === 0) lastFocused = document.activeElement;
    if (!openLayers.includes(id)) openLayers.push(id);
    el.classList.add("active");
    el.setAttribute("aria-hidden", "false");
    $("#overlay")?.classList.add("active");
    document.body.classList.add("no-scroll");
    const focusTarget =
      el.querySelector("form:not([hidden]) input, form:not([hidden]) textarea") ||
      el.querySelector(".modal-close");
    setTimeout(() => focusTarget?.focus({ preventScroll: true }), 60);
  }
  function closeModal(id) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove("active");
      el.setAttribute("aria-hidden", "true");
    }
    const idx = openLayers.indexOf(id);
    if (idx >= 0) openLayers.splice(idx, 1);
    if (id === "productModal" && /^#produk-\d+$/.test(location.hash)) history.replaceState(null, "", location.pathname + location.search);

    if (openLayers.length === 0) {
      $("#overlay")?.classList.remove("active");
      document.body.classList.remove("no-scroll");
      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus({ preventScroll: true });
      }
      lastFocused = null;
    }
  }
  function closeAllModalsAndDrawers() {
    openLayers.slice().forEach(closeModal);
  }
  function trapFocus(event) {
    if (event.key !== "Tab" || openLayers.length === 0) return;
    const layer = document.getElementById(openLayers[openLayers.length - 1]);
    if (!layer) return;
    const focusables = $$(
      'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
      layer
    ).filter((node) => node.offsetParent !== null);
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  function renderCategories() {
    const grid = $("#categoryGrid");
    if (grid) {
      grid.innerHTML = CATEGORIES.map((category, i) => {
        const count = PRODUCTS.filter((p) => p.category === category.id).length;
        return `
        <button class="category-card tile tile-${category.id}" data-category="${category.id}" style="--i:${i}" aria-label="${escapeHtml(category.name)}, ${count} produk">
          <span class="cat-icon" aria-hidden="true">${category.icon}</span>
          <span class="cat-label"><strong>${escapeHtml(category.name)}</strong><small>${count} produk</small></span>
        </button>`;
      }).join("");
    }
    const pillsWrap = $("#categoryPills");
    if (pillsWrap) {
      pillsWrap.innerHTML =
        `<button class="pill active" data-category="all">Semua</button>` +
        CATEGORIES.map(
          (category) => `<button class="pill" data-category="${category.id}">${escapeHtml(category.name)}</button>`
        ).join("");
    }
  }
  function scrollToProducts() {
    document.getElementById("produk")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function setActiveCategory(categoryId) {
    state.activeCategory = categoryId;
    $$("#categoryPills .pill").forEach((pill) =>
      pill.classList.toggle("active", pill.getAttribute("data-category") === categoryId)
    );
    renderProducts();
  }
  function resetFilters() {
    state.searchQuery = "";
    const searchInput = $("#globalSearchInput");
    if (searchInput) searchInput.value = "";
    const priceSelect = $("#priceSelect");
    if (priceSelect) priceSelect.value = "all";
    const sortSelect = $("#sortSelect");
    if (sortSelect) sortSelect.value = "rekomendasi";
    setActiveCategory("all");
  }
  function getFilteredSortedProducts() {
    let list = PRODUCTS.slice();

    if (state.activeCategory !== "all") {
      list = list.filter((p) => p.category === state.activeCategory);
    }
    if (state.collection) list = list.filter(state.collection.fn);
    if (state.searchQuery) {
      const q = state.searchQuery;
      list = list.filter((p) => {
        const cat = categoryById(p.category);
        return (
          p.name.toLowerCase().includes(q) ||
          p.region.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (cat && cat.name.toLowerCase().includes(q))
        );
      });
    }
    const priceSelect = $("#priceSelect");
    if (priceSelect && priceSelect.value !== "all") {
      const [min, max] = priceSelect.value.split("-").map(Number);
      list = list.filter((p) => p.price >= min && p.price <= max);
    }
    const sortSelect = $("#sortSelect");
    if (sortSelect) {
      const sortVal = sortSelect.value;
      if (sortVal === "harga-asc") list.sort((a, b) => a.price - b.price);
      else if (sortVal === "harga-desc") list.sort((a, b) => b.price - a.price);
      else if (sortVal === "rating") list.sort((a, b) => b.rating - a.rating);
      else if (sortVal === "terlaris") list.sort((a, b) => b.sold - a.sold);
    }

    const isl = $("#islandSelect")?.value;
    if (isl && isl !== "all") list = list.filter((p) => p.island === isl);
    if ($("#ratingOnly")?.checked) list = list.filter((p) => p.rating >= 4.7);
    if ($("#saleOnly")?.checked) list = list.filter((p) => p.oldPrice);
    if ($("#sortSelect")?.value === "terbaru") list.sort((a, b) => (b.badge === "Baru") - (a.badge === "Baru") || b.id - a.id);
    return list;
  }
  function renderProducts() {
    const list = getFilteredSortedProducts();
    const grid = $("#productGrid");
    const empty = $("#emptyState");
    if (!grid) return;
    if (list.length === 0) {
      grid.innerHTML = "";
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    grid.innerHTML = list.map(cardHTML).join("");
  }
  function cardHTML(p) {
        const isWished = state.wishlist.includes(p.id);
        return `
        <article class="product-card" data-id="${p.id}">
          <div class="product-media tile tile-${p.category}">
            ${p.oldPrice ? `<span class="product-badge sale">Diskon 20%</span>` : p.badge ? `<span class="product-badge">${escapeHtml(p.badge)}</span>` : ""}
            <button class="cmp-btn ${cmp.includes(p.id) ? "active" : ""}" data-cmp="${p.id}" aria-pressed="${cmp.includes(p.id)}">${cmp.includes(p.id) ? "✓ Dipilih" : "⇄ Bandingkan"}</button>
            <button class="wish-btn ${isWished ? "active" : ""}" data-wish="${p.id}" aria-pressed="${isWished}" aria-label="${isWished ? "Hapus dari wishlist" : "Simpan ke wishlist"}">${isWished ? "♥" : "♡"}</button>
            <span class="tile-icon" aria-hidden="true">${p.icon}</span>
          </div>
          <div class="product-info">
            <button class="product-name" data-open="${p.id}">${escapeHtml(p.name)}</button>
            <span class="product-region">${escapeHtml(p.region)}${stockTag(p)}</span>
            <span class="product-rating"><span class="stars" aria-hidden="true">${starString(p.rating)}</span> ${p.rating.toFixed(1)} (${p.reviews})</span>
            <div class="product-bottom">
              <span class="product-price">${p.oldPrice ? `<s>${formatRupiah(p.oldPrice)}</s>` : ""}${formatRupiah(p.price)}</span>
              <button class="add-cart-btn" data-add="${p.id}" ${p.stock === 0 ? "disabled" : ""} aria-label="Tambah ${escapeHtml(p.name)} ke keranjang">+</button>
            </div>
          </div>
        </article>`;
  }
  function onProductGridClick(event) {
    const cmpBtn = event.target.closest("[data-cmp]");
    if (cmpBtn) { event.stopPropagation(); toggleCompare(Number(cmpBtn.getAttribute("data-cmp"))); return; }
    const wishBtn = event.target.closest("[data-wish]");
    if (wishBtn) {
      event.stopPropagation();
      toggleWishlist(Number(wishBtn.getAttribute("data-wish")));
      return;
    }
    const addBtn = event.target.closest("[data-add]");
    if (addBtn) {
      event.stopPropagation();
      addToCart(Number(addBtn.getAttribute("data-add")), 1);
      return;
    }
    const card = event.target.closest(".product-card");
    if (card) openProductDetail(Number(card.getAttribute("data-id")));
  }
  function openProductDetail(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    let qty = 1;
    const isWished = state.wishlist.includes(p.id);
    const reviews = generateReviews(p);
    const category = categoryById(p.category);
    const body = $("#productModalBody");
    if (!body) return;
    body.innerHTML = `
      <div class="product-detail">
        <div class="product-detail-media tile tile-${p.category}"><span class="tile-icon" aria-hidden="true">${p.icon}</span></div>
        <div class="product-detail-info">
          <span class="product-region">${escapeHtml(p.region)}${category ? ` — ${escapeHtml(category.name)}` : ""}</span>
          <h2 id="productModalTitle">${escapeHtml(p.name)}</h2>
          <span class="product-rating"><span class="stars" aria-hidden="true">${starString(p.rating)}</span> ${p.rating.toFixed(1)} dari ${p.reviews} ulasan, ${p.sold} terjual</span>
          <p class="product-detail-desc">${escapeHtml(p.desc)}</p>
          <span class="product-price product-price-lg">${p.oldPrice ? `<s>${formatRupiah(p.oldPrice)}</s>` : ""}${formatRupiah(p.price)}</span>
          <div class="qty-stepper">
            <button type="button" id="qtyMinus" aria-label="Kurangi jumlah">−</button>
            <span id="qtyValue">1</span>
            <button type="button" id="qtyPlus" aria-label="Tambah jumlah">+</button>
          </div>
          <div class="product-detail-actions">
            <button class="btn btn-primary" id="detailAddCart">Tambah ke keranjang</button>
            <button class="btn btn-outline" id="detailWish">${isWished ? "♥ Tersimpan" : "♡ Simpan"}</button>
            <a class="btn btn-ghost" target="_blank" rel="noopener noreferrer" href="https://wa.me/?text=${encodeURIComponent("Lihat " + p.name + " di Grizlie Nusantara")}">Bagikan</a>
          </div>
        </div>
      </div>
      <div class="reviews">
        <h3>Ulasan pembeli</h3>
        ${reviews
          .map(
            (r) => `
          <div class="review-item">
            <div class="review-head"><span>${escapeHtml(r.name)}</span><span class="stars" aria-label="${r.rating} dari 5 bintang">${starString(r.rating)}</span></div>
            <p>${escapeHtml(r.text)}</p>
          </div>`
          )
          .join("")}
      </div>
      <div class="related"><h3>Produk serupa</h3><div class="related-row">${PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3).map((r) => `<button class="related-item" data-rel="${r.id}"><span class="tile tile-${r.category}"><span class="tile-icon">${r.icon}</span></span><b>${escapeHtml(r.name)}</b><small>${formatRupiah(r.price)}</small></button>`).join("")}</div></div>
    `;
    $$("[data-rel]", body).forEach((b) => b.addEventListener("click", () => openProductDetail(Number(b.dataset.rel))));
    $("#qtyMinus")?.addEventListener("click", () => {
      qty = Math.max(1, qty - 1);
      $("#qtyValue").textContent = qty;
    });
    $("#qtyPlus")?.addEventListener("click", () => {
      qty = Math.min(20, qty + 1);
      $("#qtyValue").textContent = qty;
    });
    $("#detailAddCart")?.addEventListener("click", () => addToCart(p.id, qty));
    $("#detailWish")?.addEventListener("click", (e) => {
      toggleWishlist(p.id);
      e.currentTarget.textContent = state.wishlist.includes(p.id) ? "♥ Tersimpan" : "♡ Simpan";
    });
    trackViewed(p.id);
    openModal("productModal");
  }
  function toggleWishlist(id) {
    const idx = state.wishlist.indexOf(id);
    if (idx >= 0) {
      state.wishlist.splice(idx, 1);
      showToast("Dihapus dari wishlist.");
    } else {
      state.wishlist.push(id);
      showToast("Ditambahkan ke wishlist.");
    }
    persistWishlist();
    updateWishlistBadge();
    renderProducts();
    renderFlash();
    renderViewed();
    renderWishlistDrawer();
  }
  function updateWishlistBadge() {
    const badge = $("#wishlistBadge");
    if (!badge) return;
    if (state.wishlist.length > 0) {
      badge.textContent = state.wishlist.length;
      badge.hidden = false;
    } else {
      badge.hidden = true;
    }
  }
  function renderWishlistDrawer() {
    const body = $("#wishlistBody");
    if (!body) return;
    const items = state.wishlist.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
    if (items.length === 0) {
      body.innerHTML = `<p class="empty-state">Wishlist masih kosong. Ketuk ikon hati pada produk untuk menyimpannya.</p>`;
      return;
    }
    body.innerHTML = items
      .map(
        (p) => `
        <div class="wishlist-item">
          <div class="wishlist-item-media tile tile-${p.category}"><span class="tile-icon" aria-hidden="true">${p.icon}</span></div>
          <div class="wishlist-item-info">
            <h4>${escapeHtml(p.name)}</h4>
            <span class="product-price">${formatRupiah(p.price)}</span>
            <div class="wishlist-actions">
              <button class="btn btn-primary btn-sm" data-wish-add="${p.id}">+ Keranjang</button>
              <button class="btn btn-outline btn-sm" data-wish-remove="${p.id}">Hapus</button>
            </div>
          </div>
        </div>`
      )
      .join("");
  }
  function onWishlistBodyClick(event) {
    const addBtn = event.target.closest("[data-wish-add]");
    if (addBtn) {
      addToCart(Number(addBtn.getAttribute("data-wish-add")), 1);
      return;
    }
    const removeBtn = event.target.closest("[data-wish-remove]");
    if (removeBtn) toggleWishlist(Number(removeBtn.getAttribute("data-wish-remove")));
  }
  function openWishlist() {
    renderWishlistDrawer();
    openModal("wishlistDrawer");
  }
  function addToCart(id, qty) {
    qty = Math.floor(Number(qty));
    const sp = PRODUCTS.find((x) => x.id === id);
    if (!sp || !(qty >= 1 && qty <= SEC.maxQty)) return;
    const have = (state.cart.find((i) => i.id === id) || { qty: 0 }).qty;
    if (have + qty > SEC.maxQty) { showToast("Maksimal " + SEC.maxQty + " buah per produk."); return; }
    if (sp && have + qty > sp.stock) { showToast(sp.stock ? "Stok hanya tersisa " + sp.stock + "." : "Stok habis."); return; }
    const existing = state.cart.find((item) => item.id === id);
    if (existing) existing.qty += qty;
    else state.cart.push({ id, qty });
    persistCart();
    updateCartBadge();
    renderCartDrawer();
    showToast("Produk ditambahkan ke keranjang.");
  }
  function updateCartQty(id, qty) {
    const item = state.cart.find((i) => i.id === id);
    if (!item) return;
    const sp = PRODUCTS.find((x) => x.id === id);
    qty = Math.min(SEC.maxQty, Math.floor(Number(qty)) || 0);
    if (sp && qty > sp.stock) { showToast("Stok hanya tersisa " + sp.stock + "."); qty = sp.stock; }
    item.qty = qty;
    if (item.qty <= 0) state.cart = state.cart.filter((i) => i.id !== id);
    persistCart();
    updateCartBadge();
    renderCartDrawer();
  }
  function removeFromCart(id) {
    const at = state.cart.findIndex((i) => i.id === id);
    const gone = state.cart[at];
    if (gone) showToast("Produk dihapus dari keranjang.", { label: "Urungkan", fn: () => {
      if (state.cart.some((i) => i.id === id)) return;
      state.cart.splice(Math.min(at, state.cart.length), 0, gone);
      persistCart(); updateCartBadge(); renderCartDrawer();
    } });
    state.cart = state.cart.filter((i) => i.id !== id);
    persistCart();
    updateCartBadge();
    renderCartDrawer();
  }
  function cartTotalQty() {
    return state.cart.reduce((sum, i) => sum + i.qty, 0);
  }
  function cartSubtotal() {
    return state.cart.reduce((sum, i) => {
      const p = PRODUCTS.find((x) => x.id === i.id);
      return sum + (p ? p.price * i.qty : 0);
    }, 0);
  }
  function updateCartBadge() {
    const badge = $("#cartBadge");
    if (!badge) return;
    const total = cartTotalQty();
    if (total > 0) {
      badge.textContent = total;
      badge.hidden = false;
    } else {
      badge.hidden = true;
    }
  }
  function renderCartDrawer() {
    const body = $("#cartBody");
    const foot = $("#cartFoot");
    if (!body || !foot) return;

    if (state.cart.length === 0) {
      body.innerHTML = `<p class="empty-state">Keranjang masih kosong. Pilih produk favorit Anda dulu.</p>`;
      foot.innerHTML = "";
      return;
    }
    body.innerHTML = state.cart
      .map((item) => {
        const p = PRODUCTS.find((x) => x.id === item.id);
        if (!p) return "";
        return `
          <div class="cart-item">
            <div class="cart-item-media tile tile-${p.category}"><span class="tile-icon" aria-hidden="true">${p.icon}</span></div>
            <div class="cart-item-info">
              <h4>${escapeHtml(p.name)}</h4>
              <span class="cart-item-price">${formatRupiah(p.price)}</span>
              <div class="cart-item-row">
                <div class="qty-stepper">
                  <button type="button" data-dec="${p.id}" aria-label="Kurangi jumlah">−</button>
                  <span>${item.qty}</span>
                  <button type="button" data-inc="${p.id}" aria-label="Tambah jumlah">+</button>
                </div>
                <button class="cart-item-remove" data-remove="${p.id}">Hapus</button>
              </div>
            </div>
          </div>`;
      })
      .join("");
    const t = calcTotals();
    const left = Math.max(0, FREE_SHIP_MIN - t.subtotal);
    const pct = Math.min(100, Math.round((t.subtotal / FREE_SHIP_MIN) * 100));
    body.insertAdjacentHTML("afterbegin", `<div class="ship-bar"><p>${left ? `Belanja ${formatRupiah(left)} lagi untuk gratis ongkir` : "Selamat, ongkir Anda gratis!"}</p><div class="ship-track"><span style="width:${pct}%"></span></div></div>`);
    foot.innerHTML = `
      <form class="coupon" id="couponForm"><input id="couponInput" placeholder="Kode kupon" aria-label="Kode kupon" value="${coupon || ""}"><button class="btn btn-outline btn-sm" type="submit">Pakai</button></form>
      <p class="coupon-hint">Coba: NUSANTARA10, HEMAT25, GRATISONGKIR</p>
      <div class="cart-summary-row"><span>Subtotal</span><span>${formatRupiah(t.subtotal)}</span></div>
      ${t.discount ? `<div class="cart-summary-row disc"><span>Diskon kupon</span><span>−${formatRupiah(t.discount)}</span></div>` : ""}
      <div class="cart-summary-row"><span>Ongkos kirim</span><span>${t.shipping ? formatRupiah(t.shipping) : "Gratis"}</span></div>
      <div class="cart-summary-row total"><span>Total</span><span>${formatRupiah(t.total)}</span></div>
      <button class="btn btn-primary btn-block" id="checkoutBtn">Lanjut ke pembayaran</button>
    `;
  }
  function onCartBodyClick(event) {
    const inc = event.target.closest("[data-inc]");
    const dec = event.target.closest("[data-dec]");
    const remove = event.target.closest("[data-remove]");

    if (inc) {
      const id = Number(inc.getAttribute("data-inc"));
      const item = state.cart.find((i) => i.id === id);
      if (item) updateCartQty(id, item.qty + 1);
    } else if (dec) {
      const id = Number(dec.getAttribute("data-dec"));
      const item = state.cart.find((i) => i.id === id);
      if (item) updateCartQty(id, item.qty - 1);
    } else if (remove) {
      removeFromCart(Number(remove.getAttribute("data-remove")));
    }
  }
  function openCart() {
    renderCartDrawer();
    openModal("cartDrawer");
  }
  function findUser(email) {
    return state.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }
  function renderAuthArea() {
    const area = $("#authArea");
    if (!area) return;
    if (!state.currentUser) {
      area.innerHTML = `<button class="btn btn-outline btn-sm" id="loginOpenBtn">Masuk</button>`;
      $("#loginOpenBtn")?.addEventListener("click", () => {
        switchAuthTab("login");
        openModal("authModal");
      });
      return;
    }
    const initial = state.currentUser.name.trim().charAt(0).toUpperCase() || "?";
    area.innerHTML = `
      <div class="user-area">
        <button class="user-chip" id="userChip" aria-haspopup="true" aria-expanded="false">
          <span class="user-avatar" aria-hidden="true">${escapeHtml(initial)}</span>
          <span>${escapeHtml(state.currentUser.name.split(" ")[0])}</span>
        </button>
        <div class="user-menu" id="userMenu">
          <button id="menuOrders">Pesanan saya</button>
          <button id="menuWishlist">Wishlist</button>
          <button id="menuLogout">Keluar</button>
        </div>
      </div>`;

    const chip = $("#userChip");
    const menu = $("#userMenu");
    chip?.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = menu?.classList.toggle("open");
      chip.setAttribute("aria-expanded", String(Boolean(open)));
    });
    $("#menuOrders")?.addEventListener("click", () => {
      renderOrdersModal();
      openModal("ordersModal");
    });
    $("#menuWishlist")?.addEventListener("click", openWishlist);
    $("#menuLogout")?.addEventListener("click", logout);
  }
  async function login(email, password) {
    const wait = lockRemaining(email);
    if (wait > 0) return { ok: false, message: "Terlalu banyak percobaan gagal. Coba lagi dalam " + fmtWait(wait) + "." };
    const user = findUser(email);
    // Tetap hitung hash walau akun tidak ada, supaya waktu respons tidak membocorkan keberadaan email
    const valid = user ? await checkPw(user, password) : (await hashPw(password, "0000000000000000"), false);
    if (!valid) {
      const left = recordFail(email);
      if (left <= 0) return { ok: false, message: "Terlalu banyak percobaan gagal. Akun dikunci selama " + fmtWait(SEC.lockMs) + "." };
      return { ok: false, message: "Email atau kata sandi salah." + (left <= 2 ? " Sisa percobaan: " + left + "." : "") };
    }
    clearFails(email);
    if (!String(user.passwordHash).startsWith("s3$") && window.crypto && crypto.subtle) {
      user.passwordHash = await hashPw(password, newSalt());
      persistUsers();
    }
    const now = Date.now();
    state.currentUser = { name: user.name, email: user.email, at: now, last: now };
    persistCurrentUser();
    return { ok: true };
  }
  async function register(name, email, password) {
    if (findUser(email)) {
      return { ok: false, message: "Email ini sudah terdaftar. Silakan masuk." };
    }
    const user = { name, email, passwordHash: await hashPw(password, newSalt()), joined: new Date().toISOString() };
    state.users.push(user);
    persistUsers();
    const now = Date.now();
    state.currentUser = { name: user.name, email: user.email, at: now, last: now };
    persistCurrentUser();
    return { ok: true };
  }
  function logout(reason) {
    state.currentUser = null;
    if (coupon === "POIN100") coupon = null;
    persistCurrentUser();
    ["ordersModal", "checkoutModal", "accountSecModal"].forEach((id) => { if (openLayers.includes(id)) closeModal(id); });
    renderAuthArea();
    renderCartDrawer();
    showToast(typeof reason === "string" ? reason : "Anda telah keluar.");
  }
  function switchAuthTab(tab) {
    $$(".auth-tab").forEach((t) => t.classList.toggle("active", t.getAttribute("data-tab") === tab));
    const loginForm = $("#loginForm");
    const regForm = $("#registerForm");
    if (loginForm) loginForm.hidden = tab !== "login";
    if (regForm) regForm.hidden = tab !== "register";
    hideFormError($("#loginError"));
    hideFormError($("#registerError"));
  }
  let pendingCheckoutAfterLogin = false;
  function afterAuthSuccess() {
    closeModal("authModal");
    renderAuthArea();
    if (pendingSellerAfterLogin && Date.now() - pendingSellerAfterLogin < 120000) openModal("sellerModal");
    pendingSellerAfterLogin = 0;
    if (pendingCheckoutAfterLogin) {
      pendingCheckoutAfterLogin = false;
      handleCheckoutStart();
    }
  }
  async function onLoginSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");
    const errorEl = $("#loginError");

    if (!isValidEmail(email)) {
      showFormError(errorEl, "Masukkan alamat email yang valid.");
      return;
    }
    if (!password) {
      showFormError(errorEl, "Kata sandi wajib diisi.");
      return;
    }
    const result = await login(email, password);
    if (!result.ok) {
      showFormError(errorEl, result.message);
      return;
    }
    hideFormError(errorEl);
    form.reset();
    showToast("Berhasil masuk. Selamat berbelanja!");
    afterAuthSuccess();
  }
  async function onRegisterSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const name = cleanText(data.get("name"), 60);
    const email = String(data.get("email") || "").trim().toLowerCase();
    const password = String(data.get("password") || "");
    const confirm = String(data.get("confirm") || "");
    const errorEl = $("#registerError");
    if (data.get("website")) return; // kolom jebakan terisi: kemungkinan bot
    const wait = throttleLeft("nm_reg_log", 3, 10 * 60 * 1000);
    if (wait > 0) {
      showFormError(errorEl, "Terlalu banyak pendaftaran dari perangkat ini. Coba lagi dalam " + fmtWait(wait) + ".");
      return;
    }
    if (name.length < 2) {
      showFormError(errorEl, "Nama lengkap wajib diisi (minimal 2 huruf).");
      return;
    }
    if (!isValidEmail(email)) {
      showFormError(errorEl, "Masukkan alamat email yang valid.");
      return;
    }
    const pwProblem = pwIssue(password, email);
    if (pwProblem) {
      showFormError(errorEl, pwProblem);
      return;
    }
    if (password !== confirm) {
      showFormError(errorEl, "Konfirmasi kata sandi tidak cocok.");
      return;
    }
    throttleHit("nm_reg_log", 10 * 60 * 1000);
    const result = await register(name, email, password);
    if (!result.ok) {
      showFormError(errorEl, result.message);
      return;
    }
    hideFormError(errorEl);
    form.reset();
    renderPwMeter($("#regPwMeter"), $("#regPwHint"), "");
    showToast(`Selamat datang, ${name.split(" ")[0]}!`);
    afterAuthSuccess();
  }
  function handleCheckoutStart() {
    if (state.cart.length === 0) {
      showToast("Keranjang masih kosong.");
      return;
    }
    if (!state.currentUser) {
      pendingCheckoutAfterLogin = true;
      switchAuthTab("login");
      openModal("authModal");
      closeModal("cartDrawer");
      showToast("Masuk dulu untuk melanjutkan checkout.");
      return;
    }
    renderCheckoutForm();
    openModal("checkoutModal");
    closeModal("cartDrawer");
  }

  function renderCheckoutForm() {
    const { subtotal, shipping, discount, total } = calcTotals();
    const body = $("#checkoutModalBody");
    if (!body) return;

    body.innerHTML = `
      <h2 id="checkoutModalTitle">Selesaikan pesanan</h2>
      <form id="checkoutForm" novalidate>
        <div class="checkout-grid">
          <label>Nama penerima
            <input type="text" name="recipient" required autocomplete="name" value="${escapeHtml(state.currentUser.name)}">
          </label>
          <label>No. telepon
            <input type="tel" name="phone" required autocomplete="tel" placeholder="08xxxxxxxxxx">
          </label>
        </div>
        <label>Alamat lengkap
          <textarea name="address" rows="2" required autocomplete="street-address" placeholder="Jalan, nomor rumah, RT/RW"></textarea>
        </label>
        <div class="checkout-grid">
          <label>Kota / Kabupaten
            <input type="text" name="city" required placeholder="Contoh: Surabaya">
          </label>
          <label>Kode pos
            <input type="text" name="postal" required inputmode="numeric" placeholder="Contoh: 60123">
          </label>
        </div>

        <fieldset class="payment-fieldset">
          <legend>Metode pembayaran</legend>
          <div class="payment-options">
            <label class="payment-option"><input type="radio" name="payment" value="Transfer Bank" checked> Transfer Bank</label>
            <label class="payment-option"><input type="radio" name="payment" value="E-Wallet"> E-Wallet (OVO/DANA/GoPay)</label>
            <label class="payment-option"><input type="radio" name="payment" value="COD"> Bayar di Tempat (COD)</label>
          </div>
        </fieldset>

        <div class="cart-summary-row"><span>Subtotal</span><span>${formatRupiah(subtotal)}</span></div>
        <div class="cart-summary-row"><span>Ongkos kirim</span><span>${shipping ? formatRupiah(shipping) : "Gratis"}</span></div>
        ${discount ? `<div class="cart-summary-row disc"><span>Diskon kupon</span><span>−${formatRupiah(discount)}</span></div>` : ""}
        <div class="cart-summary-row total"><span>Total bayar</span><span>${formatRupiah(total)}</span></div>

        <p class="form-error" id="checkoutError" hidden></p>
        <button type="submit" class="btn btn-primary btn-block">Buat pesanan</button>
      </form>
    `;
    $("#checkoutForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const recipient = cleanText(data.get("recipient"), 60);
      const phone = String(data.get("phone") || "").trim().slice(0, 20);
      const address = cleanText(data.get("address"), 200);
      const city = cleanText(data.get("city"), 50);
      const postal = String(data.get("postal") || "").trim().slice(0, 5);
      const errorEl = $("#checkoutError");
      if (!state.currentUser) {
        closeModal("checkoutModal");
        showToast("Sesi Anda berakhir. Silakan masuk lagi.");
        return;
      }

      if (!recipient || !phone || !address || !city || !postal) {
        showFormError(errorEl, "Lengkapi semua data pengiriman terlebih dahulu.");
        return;
      }
      if (!/^(\+62|62|0)8[0-9]{7,12}$/.test(phone.replace(/[\s-]/g, ""))) {
        showFormError(errorEl, "Nomor telepon tidak valid. Contoh: 081234567890.");
        return;
      }
      if (!/^[0-9]{5}$/.test(postal)) {
        showFormError(errorEl, "Kode pos harus 5 digit angka.");
        return;
      }

      const habis = state.cart.map((i) => ({ i, p: PRODUCTS.find((x) => x.id === i.id) })).find(({ i, p }) => p && i.qty > p.stock);
      if (habis) {
        showFormError(errorEl, habis.p.stock ? `Stok ${habis.p.name} tinggal ${habis.p.stock}. Kurangi jumlahnya di keranjang.` : `${habis.p.name} sudah habis. Hapus dari keranjang.`);
        return;
      }
      // Hitung ulang total di sini, jangan percaya angka dari tampilan form
      const T = calcTotals();
      const method = String(data.get("payment"));
      if (T.subtotal <= 0) { showFormError(errorEl, "Keranjang kosong."); return; }
      if (!PAYMENT_METHODS.includes(method)) { showFormError(errorEl, "Pilih metode pembayaran yang tersedia."); return; }
      if (method === "COD" && T.total > SEC.codMax) {
        showFormError(errorEl, "COD hanya untuk pesanan sampai " + formatRupiah(SEC.codMax) + ". Pilih Transfer Bank atau E-Wallet.");
        return;
      }
      if (Date.now() - lastOrderAt < SEC.orderGapMs) { showFormError(errorEl, "Mohon tunggu beberapa detik sebelum membuat pesanan lagi."); return; }
      const order = {
        id: "NM" + Date.now().toString().slice(-6) + secureToken(3),
        date: new Date().toISOString(),
        items: state.cart
          .map((i) => {
            const p = PRODUCTS.find((x) => x.id === i.id);
            return p ? { name: p.name, qty: i.qty, price: p.price } : null;
          })
          .filter(Boolean),
        recipient,
        phone,
        address,
        city,
        postal,
        payment: method,
        subtotal: T.subtotal,
        shipping: T.shipping,
        discount: T.discount,
        coupon,
        total: T.total
      };
      lastOrderAt = Date.now();
      const orders = getOrders(state.currentUser.email);
      orders.unshift(order);
      saveOrders(state.currentUser.email, orders);

      const used = loadJSON("nm_stock_used", {});
      state.cart.forEach((i) => {
        const pr = PRODUCTS.find((x) => x.id === i.id);
        if (pr) { pr.stock = Math.max(0, pr.stock - i.qty); used[pr.id] = (used[pr.id] || 0) + i.qty; }
      });
      saveJSON("nm_stock_used", used);
      renderProducts(); renderFlash(); renderViewed();

      state.cart = [];
      coupon = null;
      persistCart();
      updateCartBadge();
      renderCartDrawer();

      renderOrderSuccess(order);
    });
  }
  function renderOrderSuccess(order) {
    const body = $("#checkoutModalBody");
    if (!body) return;

    body.innerHTML = `
      <div class="order-success">
        <div class="check-circle" aria-hidden="true">✓</div>
        <h2 id="checkoutModalTitle">Pesanan berhasil dibuat</h2>
        <p>Nomor pesanan <strong>${escapeHtml(order.id)}</strong>. Total ${formatRupiah(order.total)} via ${escapeHtml(order.payment)}.</p>
        <button class="btn btn-primary" id="viewOrdersBtn">Lihat pesanan saya</button>
      </div>
    `;
    $("#viewOrdersBtn")?.addEventListener("click", () => {
      renderOrdersModal();
      openModal("ordersModal");
      closeModal("checkoutModal");
    });
  }
  function orderStatus(o) {
    const steps = ["Diproses", "Dikemas", "Dikirim", "Selesai"];
    const min = (Date.now() - new Date(o.date).getTime()) / 60000;
    const idx = min < 1 ? 0 : min < 3 ? 1 : min < 6 ? 2 : 3;
    return { steps, idx, label: steps[idx] };
  }
  function renderOrdersModal() {
    const body = $("#ordersModalBody");
    if (!body) return;

    if (!state.currentUser) {
      body.innerHTML = `<p class="empty-state">Masuk untuk melihat riwayat pesanan Anda.</p>`;
      return;
    }
    const orders = getOrders(state.currentUser.email);
    if (orders.length === 0) {
      body.innerHTML = `<p class="empty-state">Anda belum memiliki pesanan.</p>`;
      return;
    }
    body.innerHTML = orders
      .map((o) => {
        const date = new Date(o.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
        return `
        <div class="order-card">
          <div class="order-card-head">
            <strong>${escapeHtml(o.id)}</strong>
            <span class="order-status">${orderStatus(o).label}</span>
          </div>
          <div class="order-items-line">${escapeHtml(date)}</div>
          ${o.items.map((it) => `<div class="order-items-line">${it.qty}× ${escapeHtml(it.name)}</div>`).join("")}
          <div class="order-items-line">Dikirim ke ${escapeHtml(o.city)}, bayar via ${escapeHtml(o.payment)}</div>
          <ol class="track">${orderStatus(o).steps.map((s, i) => `<li class="${i <= orderStatus(o).idx ? "on" : ""}">${s}</li>`).join("")}</ol>
          ${o.discount ? `<div class="order-items-line">Kupon ${escapeHtml(o.coupon || "")}: −${formatRupiah(o.discount)}</div>` : ""}
          <div class="order-total">${formatRupiah(o.total)}</div>
        </div>`;
      })
      .join("");
  }
  function setSearchOpen(open) {
    const panel = $("#searchPanel");
    const toggle = $("#searchToggle");
    if (!panel) return;
    panel.classList.toggle("open", open);
    toggle?.setAttribute("aria-expanded", String(open));
    if (open) {
      setTimeout(() => $("#globalSearchInput")?.focus(), 120);
    } else if (state.searchQuery) {
      state.searchQuery = "";
      const input = $("#globalSearchInput");
      if (input) input.value = "";
      renderProducts();
    }
  }
  function setNavOpen(open) {
    $("#mainNav")?.classList.toggle("open", open);
    $("#navBurger")?.setAttribute("aria-expanded", String(open));
  }
  function bindEvents() {
    const header = $("#siteHeader");
    const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    $("#navBurger")?.addEventListener("click", () => setNavOpen(!$("#mainNav")?.classList.contains("open")));
    $$("#mainNav a").forEach((a) => a.addEventListener("click", () => setNavOpen(false)));
    $("#searchToggle")?.addEventListener("click", () => setSearchOpen(!$("#searchPanel")?.classList.contains("open")));
    $("#searchClose")?.addEventListener("click", () => setSearchOpen(false));
    const searchInput = $("#globalSearchInput");
    searchInput?.addEventListener("input", () => {
      state.searchQuery = searchInput.value.trim().toLowerCase();
      renderProducts();
    });
    searchInput?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        scrollToProducts();
      }
    });
    $("#categoryGrid")?.addEventListener("click", (e) => {
      const card = e.target.closest("[data-category]");
      if (!card) return;
      setActiveCategory(card.getAttribute("data-category"));
      scrollToProducts();
    });
    $("#categoryPills")?.addEventListener("click", (e) => {
      const pill = e.target.closest("[data-category]");
      if (pill) setActiveCategory(pill.getAttribute("data-category"));
    });
    $("#sortSelect")?.addEventListener("change", renderProducts);
    $("#priceSelect")?.addEventListener("change", renderProducts);
    $("#resetFilters")?.addEventListener("click", resetFilters);
    $("#productGrid")?.addEventListener("click", onProductGridClick);
    $("#cartBody")?.addEventListener("click", onCartBodyClick);
    $("#cartFoot")?.addEventListener("click", (e) => {
      if (e.target.closest("#checkoutBtn")) handleCheckoutStart();
    });
    $("#wishlistBody")?.addEventListener("click", onWishlistBodyClick);
    $("#cartToggle")?.addEventListener("click", openCart);
    $("#cartFoot")?.addEventListener("submit", (e) => {
      if (e.target.id !== "couponForm") return;
      e.preventDefault();
      const code = $("#couponInput").value.trim().toUpperCase();
      if (!code) { coupon = null; renderCartDrawer(); return; }
      if (!COUPONS[code] || COUPONS[code].pts) { showToast("Kode kupon tidak ditemukan."); return; }
      if (COUPONS[code].min && cartSubtotal() < COUPONS[code].min) { showToast("Belanja minimal " + formatRupiah(COUPONS[code].min) + " untuk kupon ini."); return; }
      coupon = code;
      renderCartDrawer();
      showToast(COUPONS[code].label + " diterapkan.");
    });
    $("#flashGrid")?.addEventListener("click", onProductGridClick);
    $("#viewedGrid")?.addEventListener("click", onProductGridClick);
    $("#wishlistToggle")?.addEventListener("click", openWishlist);
    $("#footerWishlistLink")?.addEventListener("click", (e) => {
      e.preventDefault();
      openWishlist();
    });
    $("#overlay")?.addEventListener("click", closeAllModalsAndDrawers);
    $$("[data-close]").forEach((btn) =>
      btn.addEventListener("click", () => closeModal(btn.getAttribute("data-close")))
    );
    $$(".modal").forEach((modal) =>
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal(modal.id);
      })
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (openLayers.length > 0) closeModal(openLayers[openLayers.length - 1]);
        else if ($("#searchPanel")?.classList.contains("open")) setSearchOpen(false);
        else setNavOpen(false);
      }
      trapFocus(e);
    });
    document.addEventListener("click", () => {
      $("#userMenu")?.classList.remove("open");
      $("#userChip")?.setAttribute("aria-expanded", "false");
    });
    $$(".auth-tab").forEach((tab) =>
      tab.addEventListener("click", () => switchAuthTab(tab.getAttribute("data-tab")))
    );
    $$("[data-tab-switch]").forEach((btn) =>
      btn.addEventListener("click", () => switchAuthTab(btn.getAttribute("data-tab-switch")))
    );
    $("#loginForm")?.addEventListener("submit", onLoginSubmit);
    $("#registerForm")?.addEventListener("submit", onRegisterSubmit);

    ["#heroSellBtn", "#ctaSellBtn"].forEach((s) => $(s)?.addEventListener("click", () => openModal("sellerModal")));
    $$("[data-help]").forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        openModal("helpModal");
      })
    );
  }
  function trackViewed(id) {
    const list = loadJSON("nm_viewed", []).filter((x) => x !== id);
    list.unshift(id);
    saveJSON("nm_viewed", list.slice(0, 4));
    renderViewed();
  }
  function renderViewed() {
    const sec = $("#viewedSection"), grid = $("#viewedGrid");
    if (!sec || !grid) return;
    const items = loadJSON("nm_viewed", []).map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
    sec.hidden = items.length === 0;
    grid.innerHTML = items.map(cardHTML).join("");
  }
  function renderFlash() {
    const grid = $("#flashGrid");
    if (grid) grid.innerHTML = PRODUCTS.filter((p) => p.oldPrice).slice(0, 4).map(cardHTML).join("");
    renderBest();
  }
  function tickFlash() {
    const el = $("#flashTimer");
    if (!el) return;
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const s = Math.max(0, Math.floor((end - new Date()) / 1000));
    const pad = (n) => String(n).padStart(2, "0");
    el.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
  }
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    $("meta[name=theme-color]")?.setAttribute("content", t === "dark" ? "#0e1020" : "#FFFFFF");
    try { localStorage.setItem("nm_theme", t); } catch (e) {}
  }
  function initExtras() {
    let saved = null;
    try { saved = localStorage.getItem("nm_theme"); } catch (e) {}
    applyTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
    $("#themeToggle")?.addEventListener("click", () => applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
    renderFlash();
    renderViewed();
    tickFlash();
    setInterval(tickFlash, 1000);
    const top = $("#toTop");
    window.addEventListener("scroll", () => top?.classList.toggle("show", window.scrollY > 600), { passive: true });
    top?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    $("#newsletterForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = String(new FormData(e.target).get("email") || "").trim();
      if (!isValidEmail(v)) { showToast("Masukkan email yang valid."); return; }
      e.target.reset();
      showToast("Terima kasih, Anda sudah berlangganan.");
    });
    $("#sellerForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const err = $("#sellerError");
      const d = Object.fromEntries(new FormData(e.target));
      if (d.website) return; // kolom jebakan terisi: kemungkinan bot
      if (!state.currentUser) {
        pendingSellerAfterLogin = Date.now();
        closeModal("sellerModal");
        switchAuthTab("login");
        openModal("authModal");
        showToast("Masuk atau daftar akun dulu untuk mendaftar sebagai penjual.");
        return;
      }
      const shop = cleanText(d.shop, 60), city = cleanText(d.city, 40);
      const cats = Array.from(e.target.elements.cat.options, (o) => o.value);
      const wa = String(d.wa || "").replace(/[\s-]/g, "");
      if (shop.length < 3) return showFormError(err, "Nama usaha minimal 3 karakter.");
      if (SUSPECT_SHOP.test(shop) || shop.replace(/\D/g, "").length >= 8) return showFormError(err, "Nama usaha tidak boleh memuat tautan, email, nomor telepon, atau kata terlarang.");
      if (!cats.includes(d.cat)) return showFormError(err, "Pilih kategori yang tersedia.");
      if (!/^[A-Za-z][A-Za-z .'-]{1,39}$/.test(city)) return showFormError(err, "Nama kota hanya boleh berisi huruf.");
      if (!/^(\+62|62|0)8[0-9]{7,12}$/.test(wa)) return showFormError(err, "Nomor WhatsApp tidak valid. Contoh: 081234567890.");
      if (!d.agree) return showFormError(err, "Setujui kebijakan keamanan penjual untuk melanjutkan.");
      const norm = "62" + wa.replace(/^(\+62|62|0)/, "");
      const owner = state.currentUser.email;
      const sellers = loadJSON("nm_sellers", []);
      if (sellers.some((x) => x.owner === owner && x.status === "pending")) return showFormError(err, "Anda sudah punya pendaftaran yang menunggu verifikasi.");
      if (sellers.some((x) => x.wa === norm || String(x.shop).toLowerCase() === shop.toLowerCase())) return showFormError(err, "Nama usaha atau nomor WhatsApp ini sudah terdaftar.");
      hideFormError(err);
      sellers.push({ shop, cat: d.cat, city, wa: norm, owner, status: "pending", date: new Date().toISOString() });
      saveJSON("nm_sellers", sellers);
      e.target.reset();
      closeModal("sellerModal");
      showToast("Pendaftaran terkirim dan menunggu verifikasi. Kami hanya menghubungi lewat WhatsApp yang Anda daftarkan.");
    });
  }
  let cmp = [];
  function toggleCompare(id) {
    const i = cmp.indexOf(id);
    if (i >= 0) cmp.splice(i, 1);
    else if (cmp.length >= 3) { showToast("Maksimal 3 produk untuk dibandingkan."); return; }
    else cmp.push(id);
    renderProducts(); renderFlash(); renderViewed(); renderCompareBar();
  }
  function renderCompareBar() {
    const bar = $("#cmpBar");
    if (!bar) return;
    bar.hidden = cmp.length === 0;
    document.body.classList.toggle("has-cmp", cmp.length > 0);
    $("#cmpCount").textContent = cmp.length + " dari 3 produk dipilih";
    $("#cmpGo").disabled = cmp.length < 2;
  }
  function openCompare() {
    const items = cmp.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
    const minP = Math.min(...items.map((p) => p.price));
    const maxR = Math.max(...items.map((p) => p.rating));
    const maxS = Math.max(...items.map((p) => p.sold));
    const row = (label, fn, best) => `<tr><th scope="row">${label}</th>${items.map((p) => `<td class="${best && best(p) ? "best" : ""}">${fn(p)}</td>`).join("")}</tr>`;
    $("#compareBody").innerHTML = `<div class="cmp-scroll"><table class="cmp-table"><thead><tr><td></td>${items.map((p) => `<th scope="col"><span class="cmp-icon">${p.icon}</span>${escapeHtml(p.name)}</th>`).join("")}</tr></thead><tbody>
      ${row("Harga", (p) => formatRupiah(p.price), (p) => p.price === minP)}
      ${row("Rating", (p) => `${p.rating.toFixed(1)} ★ (${p.reviews})`, (p) => p.rating === maxR)}
      ${row("Terjual", (p) => p.sold, (p) => p.sold === maxS)}
      ${row("Asal", (p) => escapeHtml(p.region))}
      ${row("Kategori", (p) => escapeHtml(categoryById(p.category)?.name || ""))}
      ${row("", (p) => `<button class="btn btn-primary btn-sm" data-cmp-add="${p.id}">+ Keranjang</button>`)}
    </tbody></table></div><p class="cmp-note">Sorotan hijau menandai nilai terbaik di tiap baris.</p>`;
    openModal("compareModal");
  }
  function initMore() {
    document.body.insertAdjacentHTML("beforeend", `<div class="cmp-bar" id="cmpBar" hidden><span id="cmpCount"></span><button class="btn btn-primary btn-sm" id="cmpGo">Bandingkan</button><button class="btn btn-outline btn-sm" id="cmpClear">Kosongkan</button></div>
      <div class="modal" id="compareModal" role="dialog" aria-modal="true" aria-labelledby="cmpTitle" aria-hidden="true"><div class="modal-panel product-panel"><button class="modal-close" data-close="compareModal" aria-label="Tutup">✕</button><h2 id="cmpTitle">Bandingkan produk</h2><div id="compareBody"></div></div></div>`);
    $("#cmpGo")?.addEventListener("click", openCompare);
    $("#cmpClear")?.addEventListener("click", () => { cmp = []; renderProducts(); renderFlash(); renderViewed(); renderCompareBar(); });
    $("[data-close=compareModal]")?.addEventListener("click", () => closeModal("compareModal"));
    $("#compareModal")?.addEventListener("click", (e) => { if (e.target.id === "compareModal") closeModal("compareModal"); });
    $("#compareBody")?.addEventListener("click", (e) => {
      const b = e.target.closest("[data-cmp-add]");
      if (b) addToCart(Number(b.dataset.cmpAdd), 1);
    });

    const inner = $(".search-panel-inner"), input = $("#globalSearchInput");
    const box = document.createElement("div");
    box.className = "suggest"; box.hidden = true; inner?.appendChild(box);
    input?.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      const hits = q ? PRODUCTS.filter((p) => (p.name + " " + p.region).toLowerCase().includes(q)).slice(0, 5) : [];
      box.hidden = hits.length === 0;
      box.innerHTML = hits.map((p) => `<button type="button" data-sg="${p.id}"><span aria-hidden="true">${p.icon}</span><b>${escapeHtml(p.name)}</b><small>${formatRupiah(p.price)}</small></button>`).join("");
    });
    box.addEventListener("click", (e) => {
      const b = e.target.closest("[data-sg]");
      if (b) { box.hidden = true; openProductDetail(Number(b.dataset.sg)); }
    });
    document.addEventListener("click", (e) => { if (!e.target.closest(".search-panel")) box.hidden = true; });
    ["#searchToggle", "#searchClose"].forEach((s) => $(s)?.addEventListener("click", () => (box.hidden = true)));

    const BUYERS = [["Dian S.", "Surabaya"], ["Budi P.", "Bandung"], ["Rina A.", "Medan"], ["Made W.", "Denpasar"], ["Fitri N.", "Makassar"], ["Andi R.", "Malang"], ["Lestari", "Semarang"]];
    const live = document.createElement("div");
    live.className = "live-toast"; live.hidden = true; document.body.appendChild(live);
    let liveId = 0, liveTimer;
    live.addEventListener("click", (e) => {
      if (e.target.closest(".live-x")) live.hidden = true;
      else if (liveId) openProductDetail(liveId);
    });
    const showLive = () => {
      if (!document.hidden && openLayers.length === 0) {
        const p = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
        const b = BUYERS[Math.floor(Math.random() * BUYERS.length)];
        liveId = p.id;
        live.innerHTML = `<span class="live-ic" aria-hidden="true">${p.icon}</span><span><b>${b[0]}</b> dari ${b[1]} baru saja membeli<br><strong>${escapeHtml(p.name)}</strong></span><button class="live-x" aria-label="Tutup notifikasi">✕</button>`;
        live.hidden = false;
        clearTimeout(liveTimer);
        liveTimer = setTimeout(() => (live.hidden = true), 5500);
      }
      setTimeout(showLive, 14000 + Math.random() * 8000);
    };
    setTimeout(showLive, 9000);

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => es.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      }), { threshold: 0.12 });
      $$(".section-head, .flash-head, .trust-item, .testi, .seller-cta").forEach((el) => { el.classList.add("reveal"); io.observe(el); });
    }
  }
  /* ===== Fitur tambahan: pulau, stok, voucher, rewards, ulasan, asisten, dll ===== */
  const ISLANDS = ["Sumatra", "Jawa", "Kalimantan", "Sulawesi", "Bali & Nusa Tenggara", "Maluku & Papua"];
  function islandOf(region) {
    const r = region.toLowerCase();
    if (/aceh|sumatra|padang/.test(r)) return ISLANDS[0];
    if (/kalimantan/.test(r)) return ISLANDS[2];
    if (/sulawesi|toraja/.test(r)) return ISLANDS[3];
    if (/bali|ntt|sumba|flores/.test(r)) return ISLANDS[4];
    if (/maluku|papua|buru/.test(r)) return ISLANDS[5];
    return ISLANDS[1];
  }
  PRODUCTS.forEach((p) => { p.island = islandOf(p.region); p.stock = Math.max(0, 2 + ((p.id * 37) % 29) - (loadJSON("nm_stock_used", {})[p.id] || 0)); });
  Object.assign(COUPONS, {
    KOPI20K: { type: "flat", v: 20000, min: 150000, label: "Potongan Rp20.000" },
    BATIK15: { type: "pct", v: 15, min: 500000, label: "Diskon 15%" },
    POIN100: { type: "flat", v: 10000, pts: 100, label: "Tukar 100 poin" }
  });
  const VOUCHERS = [["NUSANTARA10", "Diskon 10%", "Tanpa minimum"], ["HEMAT25", "Rp25rb", "Tanpa minimum"], ["GRATISONGKIR", "Gratis ongkir", "Tanpa minimum"], ["KOPI20K", "Rp20rb", "Min. Rp150rb"], ["BATIK15", "Diskon 15%", "Min. Rp500rb"]];
  const TIERS = [["Perintis", 0], ["Perak", 300], ["Emas", 1000]];
  const ptsKey = (e) => "nm_points_" + e;
  const getPts = () => (state.currentUser ? loadJSON(ptsKey(state.currentUser.email), { bal: 0, life: 0 }) : { bal: 0, life: 0 });
  const tierOf = (life) => TIERS.filter((t) => life >= t[1]).pop();
  const stockTag = (p) => (p.stock === 0 ? `<span class="stock-low">Habis</span>` : p.stock <= 5 ? `<span class="stock-low">Sisa ${p.stock}</span>` : "");

  // Poin Nusantara Rewards: 1 poin tiap Rp10.000, 100 poin = potongan Rp10.000
  function confetti() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cols = ["#1F2C7A", "#C99A45", "#D8492B", "#2E6A4C", "#8B2C5E"];
    const box = document.createElement("div");
    box.className = "confetti";
    box.setAttribute("aria-hidden", "true");
    for (let i = 0; i < 48; i++) {
      const c = document.createElement("i");
      c.style.cssText = `left:${Math.random() * 100}%;background:${cols[i % cols.length]};animation-delay:${Math.random() * 0.4}s;--dx:${Math.round(Math.random() * 160 - 80)}px;--r:${Math.round(Math.random() * 720)}deg`;
      box.appendChild(c);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 2600);
  }
  const _success = renderOrderSuccess;
  renderOrderSuccess = function (order) {
    _success(order);
    confetti();
    if (!state.currentUser) return;
    const pts = getPts();
    if (order.coupon === "POIN100") pts.bal = Math.max(0, pts.bal - 100);
    const earn = Math.floor(order.total / 10000);
    pts.bal += earn; pts.life += earn;
    saveJSON(ptsKey(state.currentUser.email), pts);
    $(".order-success p")?.insertAdjacentHTML("afterend", `<p class="reward-note">+${earn} poin Nusantara Rewards. Level Anda: ${tierOf(pts.life)[0]}.</p>`);
    renderAuthArea();
  };
  const _auth = renderAuthArea;
  renderAuthArea = function () {
    _auth();
    const menu = $("#userMenu");
    if (!menu || !state.currentUser) return;
    const p = getPts();
    menu.insertAdjacentHTML("afterbegin", `<div class="reward-chip"><b>${p.bal} poin</b><span>Level ${tierOf(p.life)[0]}</span></div>`);
  };

  // Voucher satu ketuk di keranjang
  const _cart = renderCartDrawer;
  renderCartDrawer = function () {
    _cart();
    const hint = $(".coupon-hint");
    if (!hint) return;
    const chip = (c, a, m) => `<button type="button" class="vchip ${coupon === c ? "on" : ""}" data-vc="${c}"><b>${a}</b><small>${m}</small></button>`;
    hint.outerHTML = `<div class="vchips">${VOUCHERS.map((v) => chip(...v)).join("")}${getPts().bal >= 100 ? chip("POIN100", "Tukar 100 poin", "Potongan Rp10rb") : ""}</div>`;
  };
  const _badge = updateCartBadge;
  updateCartBadge = function () {
    _badge();
    const b = $("#bnBadge");
    if (b) { const n = cartTotalQty(); b.textContent = n; b.hidden = !n; }
  };
  const _reset = resetFilters;
  resetFilters = function () {
    const i = $("#islandSelect"); if (i) i.value = "all";
    ["#ratingOnly", "#saleOnly"].forEach((s) => { const c = $(s); if (c) c.checked = false; });
    state.collection = null;
    const ct = $("#collTag"); if (ct) ct.hidden = true;
    _reset();
  };

  // Detail produk: stok, salin tautan, ulasan pembeli
  function renderUgc(p, body) {
    const box = $(".reviews", body);
    if (!box) return;
    const mine = loadJSON("nm_reviews", {})[p.id] || [];
    box.querySelector("#ugc")?.remove();
    box.insertAdjacentHTML("beforeend", `<div id="ugc">
      ${mine.map((r) => `<div class="review-item"><div class="review-head"><span>${escapeHtml(r.name)}${r.verified ? '<em class="vbadge">Pembeli terverifikasi</em>' : ""}</span><span class="stars">${starString(r.rating)}</span></div><p>${escapeHtml(r.text)}</p></div>`).join("")}
      <form class="rev-form" id="revForm"><h4>Tulis ulasan Anda</h4>
        <div class="rev-stars" id="revStars">${[1, 2, 3, 4, 5].map((n) => `<button type="button" data-s="${n}" aria-label="${n} bintang">★</button>`).join("")}</div>
        <textarea name="text" rows="2" maxlength="300" placeholder="Ceritakan pengalaman Anda dengan produk ini" aria-label="Isi ulasan"></textarea>
        <button class="btn btn-primary btn-sm" type="submit">Kirim ulasan</button></form></div>`);
    let rating = 0;
    $("#revStars", box).addEventListener("click", (e) => {
      const b = e.target.closest("[data-s]");
      if (!b) return;
      rating = Number(b.dataset.s);
      $$("#revStars button", box).forEach((x) => x.classList.toggle("on", Number(x.dataset.s) <= rating));
    });
    $("#revForm", box).addEventListener("submit", (e) => {
      e.preventDefault();
      if (!state.currentUser) { showToast("Masuk dulu untuk menulis ulasan."); switchAuthTab("login"); openModal("authModal"); return; }
      const text = cleanText(new FormData(e.target).get("text"), 300);
      if (!rating || text.length < 5) { showToast("Pilih bintang dan tulis minimal 5 karakter."); return; }
      const all = loadJSON("nm_reviews", {});
      if ((all[p.id] || []).some((r) => r.by === state.currentUser.email)) { showToast("Anda sudah menulis ulasan untuk produk ini."); return; }
      const verified = getOrders(state.currentUser.email).some((o) => o.items.some((i) => i.name === p.name));
      all[p.id] = [{ name: state.currentUser.name, by: state.currentUser.email, rating, text, verified }, ...(all[p.id] || [])];
      saveJSON("nm_reviews", all);
      showToast("Terima kasih atas ulasan Anda!");
      renderUgc(p, body);
    });
  }
  const _open = openProductDetail;
  openProductDetail = function (id) {
    _open(id);
    const p = PRODUCTS.find((x) => x.id === id), body = $("#productModalBody");
    if (!p || !body) return;
    history.replaceState(null, "", "#produk-" + id);
    $(".qty-stepper", body)?.insertAdjacentHTML("afterend", `<small class="stock-line ${p.stock <= 5 ? "low" : ""}">${p.stock === 0 ? "Stok habis" : p.stock <= 5 ? "Stok tinggal " + p.stock : "Stok tersedia " + p.stock}</small>`);
    if (!p.stock) $("#detailAddCart", body)?.setAttribute("disabled", "");
    $(".product-detail-actions", body)?.insertAdjacentHTML("beforeend", `<button class="btn btn-ghost" id="copyLink" type="button">Salin tautan</button>`);
    $("#copyLink", body)?.addEventListener("click", async () => {
      const url = location.href.split("#")[0] + "#produk-" + id;
      try {
        if (navigator.share) await navigator.share({ title: p.name, url });
        else { await navigator.clipboard.writeText(url); showToast("Tautan produk disalin."); }
      } catch (e) {}
    });
    renderUgc(p, body);
  };

  // Pesanan: beli lagi + invoice
  const _orders = renderOrdersModal;
  renderOrdersModal = function () {
    _orders();
    if (!state.currentUser) return;
    const os = getOrders(state.currentUser.email);
    $$("#ordersModalBody .order-card").forEach((c, i) => {
      const o = os[i];
      const canCancel = o && !o.canceled && orderStatus(o).idx < 2;
      if (o && o.canceled) {
        $(".order-status", c).textContent = "Dibatalkan";
        $(".track", c)?.remove();
      }
      c.insertAdjacentHTML("beforeend", `<div class="order-actions"><button class="btn btn-outline btn-sm" data-act="reorder" data-oi="${i}">Beli lagi</button><button class="btn btn-ghost btn-sm" data-act="invoice" data-oi="${i}">Invoice</button>${canCancel ? `<button class="btn btn-ghost btn-sm" data-act="cancel" data-oi="${i}">Batalkan</button>` : ""}</div>`);
    });
  };
  function invoiceHTML(o) {
    const rows = o.items.map((i) => `<tr><td>${escapeHtml(i.name)}</td><td>${i.qty}</td><td>${formatRupiah(i.price)}</td><td>${formatRupiah(i.price * i.qty)}</td></tr>`).join("");
    const d = new Date(o.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `<!doctype html><meta charset="utf-8"><title>Invoice ${o.id}</title><style>body{font:14px system-ui,sans-serif;max-width:640px;margin:32px auto;padding:0 16px;color:#12141c}h1{color:#1f2c7a;margin:0}table{width:100%;border-collapse:collapse;margin:16px 0}td,th{padding:8px;border-bottom:1px solid #e5e7ee;text-align:left}.r{text-align:right}</style><h1>Grizlie Nusantara</h1><p>Invoice <b>${o.id}</b> · ${d}<br>Kepada: ${escapeHtml(o.recipient)}, ${escapeHtml(o.address)}, ${escapeHtml(o.city)} ${escapeHtml(o.postal)}<br>Pembayaran: ${escapeHtml(o.payment)}</p><table><tr><th>Produk</th><th>Qty</th><th>Harga</th><th>Total</th></tr>${rows}</table><p class="r">Subtotal ${formatRupiah(o.subtotal)}<br>Ongkos kirim ${formatRupiah(o.shipping)}<br>${o.discount ? "Diskon −" + formatRupiah(o.discount) + "<br>" : ""}<b>Total ${formatRupiah(o.total)}</b></p>`;
  }

  // Asisten belanja (berbasis aturan, tanpa server)
  function initAssistant() {
    document.body.insertAdjacentHTML("beforeend", `<button class="ai-fab" id="aiFab" aria-label="Buka asisten belanja" aria-expanded="false">✦<span>Tanya Asisten</span></button>
    <section class="ai-panel" id="aiPanel" aria-label="Asisten belanja" hidden>
      <header><div><b>Asisten Grizlie</b><small>Rekomendasi dan bantuan belanja</small></div><button type="button" id="aiClose" aria-label="Tutup asisten">✕</button></header>
      <div class="ai-log" id="aiLog" aria-live="polite"></div>
      <div class="ai-quick" id="aiQuick"></div>
      <form class="ai-form" id="aiForm"><input id="aiInput" placeholder="Tanya produk, kupon, ongkir..." autocomplete="off" aria-label="Pesan Anda"><button class="btn btn-primary btn-sm">Kirim</button></form>
    </section>`);
    const log = $("#aiLog"), panel = $("#aiPanel"), fab = $("#aiFab");
    const say = (html, who) => { log.insertAdjacentHTML("beforeend", `<div class="ai-msg ${who}">${html}</div>`); log.scrollTop = log.scrollHeight; };
    const cards = (list) => `<div class="ai-cards">${list.map((p) => `<button type="button" data-ai-open="${p.id}"><span>${p.icon}</span><b>${escapeHtml(p.name)}</b><small>${formatRupiah(p.price)}</small></button>`).join("")}</div>`;
    const budget = (t) => {
      const m = t.match(/(\d+(?:,\d+)?)\s*(rb|ribu|k|jt|juta)?/);
      if (!m) return 0;
      let n = parseFloat(m[1].replace(",", "."));
      if (/rb|ribu|k/.test(m[2] || "")) n *= 1000; else if (/jt|juta/.test(m[2] || "")) n *= 1e6; else if (n < 1000) n *= 1000;
      return n;
    };
    const QUICK = ["Produk terlaris", "Oleh-oleh di bawah 100 ribu", "Kupon aktif", "Info ongkir", "Cara retur", "Poin rewards"];
    $("#aiQuick").innerHTML = QUICK.map((q) => `<button type="button">${q}</button>`).join("");
    const reply = (raw) => {
      const t = raw.toLowerCase().replace(/(\d)\.(\d{3})/g, "$1$2");
      if (/kupon|voucher|promo|diskon/.test(t)) return say("Kupon di keranjang: <b>NUSANTARA10</b> (10%), <b>HEMAT25</b> (Rp25.000), <b>GRATISONGKIR</b>, <b>KOPI20K</b> (Rp20.000, min. Rp150.000) dan <b>BATIK15</b> (15%, min. Rp500.000). Satu pesanan satu kupon.", "bot");
      if (/ongkir|kirim|ongkos/.test(t)) return say("Ongkos kirim Rp20.000 per pesanan, gratis untuk belanja di atas Rp300.000 ke seluruh 34 provinsi.", "bot");
      if (/retur|garansi/.test(t)) return say("Barang tidak sesuai deskripsi bisa diajukan pengembalian dalam 7 hari setelah diterima.", "bot");
      if (/poin|reward|level/.test(t)) return say("Setiap Rp10.000 belanja memberi 1 poin. Tiap 100 poin bisa ditukar potongan Rp10.000 di keranjang. Level: Perintis, Perak (300 poin), Emas (1.000 poin).", "bot");
      if (/pesanan|lacak|resi/.test(t)) {
        if (!state.currentUser) return say("Silakan masuk dulu untuk melihat pesanan Anda.", "bot");
        say("Saya buka riwayat pesanan Anda.", "bot"); panel.hidden = true; renderOrdersModal(); openModal("ordersModal"); return;
      }
      if (/terlaris|populer/.test(t)) return say("Paling banyak dibeli:" + cards(PRODUCTS.slice().sort((a, b) => b.sold - a.sold).slice(0, 3)), "bot");
      const max = /\d/.test(t) ? budget(t) : 0;
      const words = t.split(/[^a-z]+/).filter((w) => w.length > 3 && !/bawah|ribu|juta|oleh|produk|cari|ingin|mau|rekomendasi|tolong|yang/.test(w));
      let list = PRODUCTS.filter((p) => !words.length || words.some((w) => (p.name + " " + p.region + " " + (categoryById(p.category)?.name || "")).toLowerCase().includes(w)));
      if (/oleh/.test(t)) list = PRODUCTS.filter((p) => ["kuliner", "kerajinan", "rempah"].includes(p.category));
      if (max) list = list.filter((p) => p.price <= max);
      list = list.sort((a, b) => b.rating - a.rating).slice(0, 3);
      if (!list.length) return say("Belum ketemu yang cocok. Coba sebut jenis produk atau anggaran, misalnya <b>kopi di bawah 100 ribu</b>.", "bot");
      say("Ini pilihan yang cocok" + (max ? ` dengan anggaran ${formatRupiah(max)}` : "") + ":" + cards(list), "bot");
    };
    const send = (txt) => { if (!txt.trim()) return; say(escapeHtml(txt), "me"); reply(txt); };
    say("Halo! Saya bisa bantu cari produk sesuai selera dan anggaran, serta jelaskan kupon, ongkir, retur, dan poin.", "bot");
    const toggle = (open) => { panel.hidden = !open; fab.setAttribute("aria-expanded", String(open)); if (open) setTimeout(() => $("#aiInput")?.focus(), 50); };
    fab.addEventListener("click", () => toggle(panel.hidden));
    $("#aiClose").addEventListener("click", () => toggle(false));
    $("#aiQuick").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) send(b.textContent); });
    $("#aiForm").addEventListener("submit", (e) => { e.preventDefault(); const i = $("#aiInput"); send(i.value); i.value = ""; });
    log.addEventListener("click", (e) => { const b = e.target.closest("[data-ai-open]"); if (b) { toggle(false); openProductDetail(Number(b.dataset.aiOpen)); } });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden && openLayers.length === 0) toggle(false); });
  }

  function initFeatures() {
    ["#islandSelect", "#ratingOnly", "#saleOnly"].forEach((s) => $(s)?.addEventListener("change", renderProducts));
    $("#cartFoot")?.addEventListener("click", (e) => {
      const b = e.target.closest("[data-vc]");
      if (!b) return;
      const c = b.dataset.vc, v = COUPONS[c];
      if (coupon === c) coupon = null;
      else if (v.min && cartSubtotal() < v.min) { showToast("Belanja minimal " + formatRupiah(v.min) + " untuk kupon ini."); return; }
      else { coupon = c; showToast(v.label + " diterapkan."); }
      renderCartDrawer();
    });
    $("#ordersModalBody")?.addEventListener("click", (e) => {
      const b = e.target.closest("[data-act]");
      if (!b || !state.currentUser) return;
      const o = getOrders(state.currentUser.email)[Number(b.dataset.oi)];
      if (!o) return;
      if (b.dataset.act === "cancel") { cancelOrder(Number(b.dataset.oi)); return; }
      if (b.dataset.act === "invoice") {
        const url = URL.createObjectURL(new Blob([invoiceHTML(o)], { type: "text/html" }));
        const w = window.open(url, "_blank");
        if (w) w.addEventListener("load", () => { try { w.print(); } catch (err) {} });
        setTimeout(() => URL.revokeObjectURL(url), 60000);
      } else {
        o.items.forEach((it) => { const p = PRODUCTS.find((x) => x.name === it.name); if (p) addToCart(p.id, it.qty); });
        closeModal("ordersModal");
        openCart();
      }
    });
    initAssistant();

    // Polesan: progress bar, hitung naik, pintasan keyboard, navigasi bawah (mobile)
    document.body.insertAdjacentHTML("afterbegin", `<div class="progress" id="scrollProgress" aria-hidden="true"></div>`);
    const bar = $("#scrollProgress");
    window.addEventListener("scroll", () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
    }, { passive: true });
    document.addEventListener("keydown", (e) => {
      const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || "");
      if ((e.key === "/" && !typing) || (String(e.key || "").toLowerCase() === "k" && (e.ctrlKey || e.metaKey))) { e.preventDefault(); setSearchOpen(true); }
    });
    $$(".hero-stats dt").forEach((el) => {
      const raw = el.textContent, n = parseInt(raw.replace(/\D/g, ""), 10), suf = raw.replace(/[\d.]/g, "");
      if (!n || !("IntersectionObserver" in window)) return;
      const run = () => {
        const t0 = performance.now();
        const step = (t) => {
          const k = Math.min(1, (t - t0) / 1100);
          el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))).toLocaleString("id-ID") + suf;
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      new IntersectionObserver((es, io) => { if (es[0].isIntersecting) { run(); io.disconnect(); } }).observe(el);
    });
    document.body.insertAdjacentHTML("beforeend", `<nav class="bottom-nav" aria-label="Navigasi cepat">
      <a href="#beranda"><i aria-hidden="true">⌂</i>Beranda</a>
      <a href="#produk"><i aria-hidden="true">▦</i>Produk</a>
      <button type="button" id="bnSearch"><i aria-hidden="true">⌕</i>Cari</button>
      <button type="button" id="bnCart"><i aria-hidden="true">🛒</i>Keranjang<span class="bn-badge" id="bnBadge" hidden>0</span></button>
      <button type="button" id="bnAccount"><i aria-hidden="true">☺</i>Akun</button></nav>`);
    $("#bnSearch").addEventListener("click", () => setSearchOpen(true));
    $("#bnCart").addEventListener("click", openCart);
    $("#bnAccount").addEventListener("click", () => {
      if (state.currentUser) { renderOrdersModal(); openModal("ordersModal"); }
      else { switchAuthTab("login"); openModal("authModal"); }
    });
    updateCartBadge();

    // Tautan langsung ke produk (#produk-5)
    const openFromHash = () => { const m = location.hash.match(/^#produk-(\d+)$/); if (m) openProductDetail(Number(m[1])); };
    window.addEventListener("hashchange", openFromHash);
    openFromHash();
  }
  /* ===== Fitur wow: hero hidup, peta Nusantara interaktif, sorot kursor ===== */
  function initWow() {
    const hero = $("#beranda");
    if (hero) {
      const ic = CATEGORIES.map((c, i) => `<span class="fl fl${i}">${c.icon}</span>`).join("");
      hero.insertAdjacentHTML("afterbegin", `<div class="hero-fx" aria-hidden="true"><i class="blob b1"></i><i class="blob b2"></i><i class="blob b3"></i>${ic}</div>`);
      hero.addEventListener("mousemove", (e) => {
        const r = hero.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        $$(".fl", hero).forEach((el, i) => { const d = (i % 3 + 1) * 16; el.style.translate = `${x * d}px ${y * d}px`; });
      });
      $("h1", hero)?.insertAdjacentHTML("beforebegin", `<p class="hero-rot">Temukan <b id="rotWord">batik tulis</b></p>`);
      const W = ["batik tulis", "kopi Gayo", "tenun ikat", "rendang Padang", "perak Kotagede", "jamu tradisional"], rw = $("#rotWord");
      let k = 0;
      setInterval(() => { rw.classList.add("out"); setTimeout(() => { k = (k + 1) % W.length; rw.textContent = W[k]; rw.classList.remove("out"); }, 300); }, 2400);
    }

    const SH = {
      "Sumatra": [[120, 235], '<ellipse cx="150" cy="165" rx="112" ry="27" transform="rotate(38 150 165)"/>'],
      "Jawa": [[335, 330], '<ellipse cx="335" cy="282" rx="108" ry="16"/>'],
      "Kalimantan": [[400, 150], '<ellipse cx="400" cy="150" rx="80" ry="68"/>'],
      "Sulawesi": [[565, 245], '<ellipse cx="548" cy="140" rx="20" ry="66" transform="rotate(-18 548 140)"/><ellipse cx="590" cy="190" rx="38" ry="12"/>'],
      "Bali & Nusa Tenggara": [[540, 340], '<ellipse cx="462" cy="296" rx="22" ry="11"/><ellipse cx="520" cy="300" rx="26" ry="11"/><ellipse cx="580" cy="306" rx="26" ry="11"/>'],
      "Maluku & Papua": [[715, 265], '<ellipse cx="715" cy="195" rx="82" ry="44"/><circle cx="640" cy="150" r="14"/><circle cx="650" cy="215" r="12"/>']
    };
    const byIsl = (n) => PRODUCTS.filter((p) => islandOf(p.region) === n).sort((a, b) => b.sold - a.sold);
    const svg = Object.keys(SH).map((n) => `<g class="isl" data-isl="${n}" tabindex="0" role="button" aria-label="${n}, ${byIsl(n).length} produk">${SH[n][1]}<text x="${SH[n][0][0]}" y="${SH[n][0][1]}" text-anchor="middle">${n}<tspan x="${SH[n][0][0]}" dy="16">${byIsl(n).length} produk</tspan></text></g>`).join("");
    $("#produk")?.insertAdjacentHTML("beforebegin", `<section class="section nmap-sec" id="peta"><div class="wrap">
      <div class="section-head"><h2>Jelajahi lewat peta</h2><p>Pilih pulau, lihat karya yang lahir dari sana.</p></div>
      <div class="nmap"><svg class="nmap-svg" viewBox="0 0 800 370" role="group" aria-label="Peta Nusantara">${svg}</svg><div class="nmap-panel" id="nmapPanel"></div></div></div></section>`);
    const map = $(".nmap-svg"), panel = $("#nmapPanel");
    let cur = "Jawa";
    const show = (n) => {
      cur = n;
      $$(".isl", map).forEach((g) => g.classList.toggle("on", g.dataset.isl === n));
      const l = byIsl(n);
      panel.innerHTML = `<h3>${n}</h3><p>${l.length} produk dari pulau ini</p>` + l.slice(0, 3).map((p) => `<button type="button" class="mp-item" data-id="${p.id}"><span>${p.icon}</span><b>${escapeHtml(p.name)}</b><small>${formatRupiah(p.price)}</small></button>`).join("") + `<button type="button" class="btn btn-primary btn-sm mp-go">Lihat semua dari ${n}</button>`;
    };
    map.addEventListener("click", (e) => { const g = e.target.closest(".isl"); if (g) show(g.dataset.isl); });
    map.addEventListener("keydown", (e) => { const g = e.target.closest(".isl"); if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); show(g.dataset.isl); } });
    panel.addEventListener("click", (e) => {
      const it = e.target.closest(".mp-item");
      if (it) return openProductDetail(Number(it.dataset.id));
      if (e.target.closest(".mp-go")) {
        const s = $("#islandSelect");
        if (s) { s.value = cur; s.dispatchEvent(new Event("change")); }
        $("#produk")?.scrollIntoView({ behavior: "smooth" });
      }
    });
    show(cur);

    document.addEventListener("mousemove", (e) => {
      const c = e.target.closest?.(".product-card");
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", e.clientX - r.left + "px");
      c.style.setProperty("--my", e.clientY - r.top + "px");
    });
  }
  /* ===== Beranda: pencarian hero, koleksi, terlaris, batalkan pesanan ===== */
  const COLLECTIONS = [
    { name: "Oleh-oleh di bawah Rp50rb", icon: "🎁", cls: "kuliner", fn: (p) => p.price <= 50000 },
    { name: "Teman ngopi", icon: "☕", cls: "kopi", fn: (p) => p.category === "kopi" },
    { name: "Hadiah istimewa", icon: "💎", cls: "batik", fn: (p) => p.price >= 500000 },
    { name: "Baru datang", icon: "✨", cls: "rempah", fn: (p) => p.badge === "Baru" },
    { name: "Favorit pembeli", icon: "⭐", cls: "kerajinan", fn: (p) => p.rating >= 4.8 },
    { name: "Hemat hari ini", icon: "🏷️", cls: "fashion", fn: (p) => !!p.oldPrice }
  ];
  function setCollection(c) {
    state.collection = c;
    const tag = $("#collTag");
    if (tag) { tag.hidden = !c; $("span", tag).textContent = c ? "Koleksi: " + c.name : ""; }
    renderProducts();
  }
  function renderBest() {
    const row = $("#bestRow");
    if (row) row.innerHTML = PRODUCTS.slice().sort((a, b) => b.sold - a.sold).slice(0, 8).map(cardHTML).join("");
  }
  function applyQuery(raw) {
    const q = String(raw || "").trim();
    setCollection(null);
    state.searchQuery = q.toLowerCase();
    const gi = $("#globalSearchInput"); if (gi) gi.value = q;
    setActiveCategory("all");
    scrollToProducts();
    if (q && !getFilteredSortedProducts().length) showToast("Belum ada hasil untuk \"" + q + "\".");
  }
  function cancelOrder(i) {
    const email = state.currentUser?.email;
    if (!email) return;
    const orders = getOrders(email), o = orders[i];
    if (!o || o.canceled || orderStatus(o).idx >= 2) { showToast("Pesanan ini sudah tidak bisa dibatalkan."); return; }
    o.canceled = true;
    saveOrders(email, orders);
    const used = loadJSON("nm_stock_used", {});
    o.items.forEach((it) => {
      const p = PRODUCTS.find((x) => x.name === it.name);
      if (p) { p.stock += it.qty; used[p.id] = Math.max(0, (used[p.id] || 0) - it.qty); }
    });
    saveJSON("nm_stock_used", used);
    const pts = getPts(), earn = Math.floor(o.total / 10000);
    pts.bal = Math.max(0, pts.bal - earn) + (o.coupon === "POIN100" ? 100 : 0);
    pts.life = Math.max(0, pts.life - earn);
    saveJSON(ptsKey(email), pts);
    renderProducts(); renderFlash(); renderViewed(); renderAuthArea(); renderOrdersModal();
    showToast("Pesanan " + o.id + " dibatalkan. Stok dan poin dikembalikan.");
  }
  function initHome() {
    const cg = $("#collGrid");
    if (cg) {
      cg.innerHTML = COLLECTIONS.map((c, i) => `<button type="button" class="category-card tile tile-${c.cls}" data-coll="${i}"><span class="cat-icon" aria-hidden="true">${c.icon}</span><span class="cat-label"><strong>${c.name}</strong><small>${PRODUCTS.filter(c.fn).length} produk</small></span></button>`).join("");
      cg.addEventListener("click", (e) => {
        const b = e.target.closest("[data-coll]");
        if (!b) return;
        state.searchQuery = "";
        const gi = $("#globalSearchInput"); if (gi) gi.value = "";
        setActiveCategory("all");
        setCollection(COLLECTIONS[Number(b.dataset.coll)]);
        scrollToProducts();
      });
    }
    $("#productGrid")?.insertAdjacentHTML("beforebegin", `<div class="coll-tag" id="collTag" hidden><span></span><button type="button" aria-label="Hapus koleksi">✕</button></div>`);
    $("#collTag button")?.addEventListener("click", () => setCollection(null));
    renderBest();
    $("#bestRow")?.addEventListener("click", onProductGridClick);
    $$("[data-best]").forEach((b) => b.addEventListener("click", () => $("#bestRow")?.scrollBy({ left: Number(b.dataset.best) * 260, behavior: "smooth" })));
    $("#heroSearch")?.addEventListener("submit", (e) => { e.preventDefault(); applyQuery($("#heroQ").value); });
    $("#heroChips")?.addEventListener("click", (e) => { const b = e.target.closest("[data-q]"); if (b) applyQuery(b.dataset.q); });
  }
  /* ===== Keamanan: meter sandi, pusat keamanan, ganti sandi, sesi otomatis ===== */
  const PW_HINT = "Gunakan 8+ karakter dengan huruf besar, huruf kecil, dan angka.";
  function renderPwMeter(meter, hint, pw, email) {
    if (!meter) return;
    const sc = pwScore(pw, email);
    meter.dataset.s = String(sc);
    if (hint) hint.textContent = !pw ? PW_HINT : pwIssue(pw, email) || ["", "", "Kekuatan: cukup.", "Kekuatan: kuat.", "Kekuatan: sangat kuat."][sc];
  }
  function openAccountSecurity() {
    if (!state.currentUser) return;
    const rec = findUser(state.currentUser.email);
    const changed = rec && rec.pwChanged ? "Terakhir ganti kata sandi: " + new Date(rec.pwChanged).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) + "." : "Kata sandi belum pernah diganti.";
    $("#accountSecInfo").textContent = "Masuk sebagai " + state.currentUser.email + ". Sesi berakhir otomatis setelah " + SEC.idleMs / 60000 + " menit tanpa aktivitas. " + changed;
    $("#changePwForm")?.reset();
    hideFormError($("#changePwError"));
    renderPwMeter($("#newPwMeter"), $("#newPwHint"), "");
    openModal("accountSecModal");
  }
  const _authSec = renderAuthArea;
  renderAuthArea = function () {
    _authSec();
    const out = $("#menuLogout");
    if (!out) return;
    out.insertAdjacentHTML("beforebegin", `<button id="menuSecurity">Keamanan akun</button>`);
    $("#menuSecurity")?.addEventListener("click", openAccountSecurity);
  };

  let lastPersist = 0, warned = false;
  function sessionExpired(u) {
    const now = Date.now();
    return now - u.last > SEC.idleMs || now - u.at > SEC.maxSessionMs;
  }
  function expireSession() { logout("Sesi berakhir karena tidak ada aktivitas. Silakan masuk lagi."); }
  function touchSession() {
    const u = state.currentUser;
    if (!u) return;
    if (sessionExpired(u)) return expireSession();
    const now = Date.now();
    u.last = now; warned = false;
    if (now - lastPersist > 15000) { lastPersist = now; persistCurrentUser(); }
  }
  function checkSession() {
    const u = state.currentUser;
    if (!u) return;
    const stored = loadJSON(STORE_KEYS.currentUser, null);
    if (stored && stored.email === u.email && stored.last > u.last) u.last = stored.last; // aktivitas di tab lain
    if (sessionExpired(u)) return expireSession();
    if (SEC.idleMs - (Date.now() - u.last) <= SEC.warnMs && !warned) {
      warned = true;
      showToast("Anda akan keluar otomatis dalam 1 menit.", { label: "Tetap masuk", fn: touchSession });
    }
  }
  function initSecurity() {
    const regPw = $("#regPassword"), newPw = $("#newPassword");
    regPw?.addEventListener("input", () => renderPwMeter($("#regPwMeter"), $("#regPwHint"), regPw.value, $("#registerForm [name=email]")?.value));
    newPw?.addEventListener("input", () => renderPwMeter($("#newPwMeter"), $("#newPwHint"), newPw.value, state.currentUser?.email));

    const setSecTab = (t) => {
      $$(".sec-tab").forEach((b) => { const on = b.dataset.secTab === t; b.classList.toggle("active", on); b.setAttribute("aria-selected", String(on)); });
      $$("[data-sec-panel]").forEach((pn) => (pn.hidden = pn.dataset.secPanel !== t));
    };
    $$(".sec-tab").forEach((b) => b.addEventListener("click", () => setSecTab(b.dataset.secTab)));
    document.addEventListener("click", (e) => {
      const a = e.target.closest("[data-security]");
      if (!a) return;
      e.preventDefault();
      setSecTab(a.dataset.security === "penjual" ? "penjual" : "pembeli");
      openModal("securityModal");
    });

    $("#changePwForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const err = $("#changePwError"), form = e.target;
      const rec = state.currentUser && findUser(state.currentUser.email);
      if (!rec) return showFormError(err, "Sesi berakhir. Silakan masuk lagi.");
      const d = new FormData(form);
      const oldPw = String(d.get("old") || ""), next = String(d.get("next") || ""), conf = String(d.get("confirm") || "");
      const wait = lockRemaining(rec.email);
      if (wait > 0) return showFormError(err, "Terlalu banyak percobaan. Coba lagi dalam " + fmtWait(wait) + ".");
      if (!(await checkPw(rec, oldPw))) {
        const left = recordFail(rec.email);
        return showFormError(err, left > 0 ? "Kata sandi saat ini salah." : "Terlalu banyak percobaan gagal. Dikunci selama " + fmtWait(SEC.lockMs) + ".");
      }
      clearFails(rec.email);
      const issue = pwIssue(next, rec.email);
      if (issue) return showFormError(err, issue);
      if (next === oldPw) return showFormError(err, "Kata sandi baru harus berbeda dari yang lama.");
      if (next !== conf) return showFormError(err, "Konfirmasi kata sandi tidak cocok.");
      rec.passwordHash = await hashPw(next, newSalt());
      rec.pwChanged = new Date().toISOString();
      persistUsers();
      hideFormError(err);
      form.reset();
      closeModal("accountSecModal");
      showToast("Kata sandi berhasil diganti.");
    });

    // Sesi: perpanjang saat ada aktivitas, keluar otomatis bila diam terlalu lama
    ["click", "keydown", "touchstart", "scroll"].forEach((ev) => window.addEventListener(ev, touchSession, { passive: true }));
    setInterval(checkSession, 10000);
    document.addEventListener("visibilitychange", () => { if (!document.hidden) checkSession(); });
    window.addEventListener("storage", (e) => {
      if (e.key !== STORE_KEYS.currentUser) return;
      let next = null;
      try { next = e.newValue ? JSON.parse(e.newValue) : null; } catch (x) {}
      if (state.currentUser && !next) logout("Anda keluar dari tab lain.");
      else if (next && (!state.currentUser || next.email !== state.currentUser.email)) location.reload();
    });
    checkSession();
  }
  function init() {
    injectTileStyles();
    renderCategories();
    renderProducts();
    renderAuthArea();
    renderCartDrawer();
    renderWishlistDrawer();
    updateCartBadge();
    updateWishlistBadge();
    bindEvents();
    initExtras();
    initMore();
    initFeatures();
    initWow();
    initHome();
    initSecurity();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();