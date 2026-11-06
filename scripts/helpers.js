/* Variabel & fungsi bantu (format tanggal, escape HTML, builder section/profil). */
const B = C.bride,
  G = C.groom,
  d0 = new Date(C.date),
  $ = (s) => document.querySelector(s);
const fmt = d0.toLocaleDateString("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const esc = (s) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c],
  );
const ov = () =>
  `background-image:linear-gradient(180deg,rgba(251,246,244,0) 60%,rgba(251,246,244,.96) 100%),url(${C.bg.cover})`;
// Slider foto hero: urutan [A,C,B,A] dan jalur bergeser ke kanan, jadi putaran A→B→C→A mulus tanpa lompatan.
const heroSlider = () => {
  const ph = (C.hero && C.hero.length ? C.hero : [C.bg.cover]).filter(Boolean);
  const seq = ph.length > 1 ? [ph[0], ...ph.slice(1).reverse(), ph[0]] : ph;
  return `<div class="absolute inset-0 z-0 overflow-hidden bg-ac-dark"><div id="heroTrack" class="flex h-full" style="width:${seq.length * 100}%">${seq.map((s) => `<img src="${s}" alt="" draggable="false" onerror="this.remove()" class="h-full flex-none object-cover" style="width:${100 / seq.length}%">`).join("")}</div></div><div class="absolute inset-0 z-[1] pointer-events-none" style="background-image:linear-gradient(0deg,rgba(122,31,43,.95) 0%,rgba(122,31,43,.6) 35%,rgba(122,31,43,0) 72%)"></div>`;
};
// Kartu Live Streaming: 2 foto slide ke kanan otomatis di atas, teks + tombol di kiri, strip vertikal "Live Streaming" di kanan.
// C.live boleh berupa link (string) atau objek { platform, url, photos }.
const liveCard = () => {
  const L = typeof C.live === "string" ? { url: C.live } : C.live || {};
  if (!L.url) return "";
  const photos = L.photos && L.photos.length ? L.photos : C.gallery.slice(0, 2);
  const platform = (L.platform || "").trim();
  return `<div class="rv mt-8 text-left rounded-tl-[2.5rem] rounded-tr-[2.5rem] rounded-br-[2.5rem] overflow-hidden shadow-[0_18px_40px_rgba(42,18,21,0.15)] bg-cream-100"><div ${aosAttr()} class="pc ph relative aspect-[16/10] w-full overflow-hidden">${carousel(photos, "Live Streaming", "r")}</div><div class="flex"><div class="flex-1 min-w-0 p-6 sm:p-8"><h3 class="font-sans font-extrabold uppercase tracking-wide text-ink-900 text-base sm:text-lg">${platform ? platform + " " : ""}Streaming</h3><p class="text-sm sm:text-base text-ink-900 leading-snug my-3">Bagi tamu undangan yang berhalangan hadir tetapi ingin menyaksikan acara pernikahan kami silakan akses live streaming melalui link di bawah :</p><a href="${L.url}" target="_blank" rel="noopener" class="inline-block mt-1 px-5 py-2.5 rounded-md bg-ac text-white text-sm font-medium hover:bg-ac-dark transition">Live Streaming</a></div><div class="w-14 sm:w-20 flex-none bg-ac flex items-center justify-center" aria-hidden="true"><span class="font-head italic text-white text-2xl sm:text-3xl whitespace-nowrap" style="writing-mode:vertical-rl">Live Streaming</span></div></div></div>`;
};
const bgs = (url, o = "rgba(251,246,244,.86)") =>
  `background-image:linear-gradient(${o},${o}),url(${url})`;
const sec = (id, h, sub, body, st = "", cls = "") =>
  `<section id="${id}" class="relative py-20 sm:py-28 px-5 sm:px-6 bg ${st ? "fx" : ""} ${cls}" style="${st}"><div class="max-w-5xl mx-auto text-center"><h2 class="rv font-head italic font-semibold text-5xl sm:text-6xl text-ink-900">${h}</h2>${sub ? `<p class="rv mt-4 text-sm sm:text-base text-ink-500/90 max-w-2xl mx-auto leading-relaxed" style="--d:.1s">${sub}</p>` : ""}<div class="mt-12">${body}</div></div></section>`;
const btn = (h, t) =>
  `<a href="${h}" target="_blank" rel="noopener" class="inline-block px-5 py-2 rounded-full border border-ac/60 text-ink-700 text-sm hover:bg-ac hover:text-white transition">${t}</a>`;
// Kartu mempelai (selebar layar, tanpa sudut membulat): foto penuh sebagai latar + kartu kaca berisi nama, orang tua, dan Instagram.
// 2 foto (photos) = carousel otomatis; side "l" = foto bergeser ke kanan & teks rata kiri, side "r" = bergeser ke kiri & teks rata kanan.
const igIcon =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
// Carousel otomatis 2 foto. dir: "r" = bergeser ke kanan, "l" = ke kiri, "d" = ke bawah, "u" = ke atas. 1 foto = diam.
// Efek AOS (animate on scroll) untuk foto: dipakai bergantian fade-up, fade-down, zoom-in, zoom-out sesuai urutan foto di halaman.
// Video prewedding YouTube di atas foto galeri. C.video boleh berupa link/ID YouTube (string) atau objek { url | id, title }.
const videoEmbed = () => {
  const V = typeof C.video === "string" ? { url: C.video } : C.video || {};
  const raw = String(V.id || V.url || "").trim();
  const m = raw.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|shorts\/|live\/|watch\?(?:.*&)?v=))([\w-]{11})/) || raw.match(/^([\w-]{11})$/);
  if (!m) return "";
  return `<div class="rv -mx-5 sm:-mx-6 mb-2 aspect-video bg-black overflow-hidden"><iframe class="w-full h-full" src="https://www.youtube.com/embed/${m[1]}?rel=0" title="${V.title || "Video Prewedding"}" loading="lazy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
};
const AOS_FX = ["fade-up", "fade-down", "zoom-in", "zoom-out"];
let aosN = 0;
const aosAttr = () => `data-aos="${AOS_FX[aosN++ % AOS_FX.length]}" data-aos-duration="1000"`;
const carousel = (photos, alt, dir = "r") => {
  const ph = (Array.isArray(photos) ? photos : [photos]).filter(Boolean);
  const im = (src, cls = "") =>
    `<img src="${src}" alt="${alt}" loading="lazy" onerror="this.remove()" class="${cls}">`;
  const cls = { r: "pc-r", l: "pc-l", d: "pc-v pc-d", u: "pc-v pc-u" }[dir] || "pc-r";
  return ph.length > 1
    ? `<div class="pc-track ${cls}">${im(ph[0])}${im(ph[1])}${im(ph[0])}</div>`
    : ph.length
      ? im(ph[0], "w-full h-full object-cover")
      : "";
};
// Kartu mempelai: foto berbentuk lengkung (arch) dengan bayangan menyamping, lalu nama miring, orang tua, dan tombol Instagram (rata tengah).
// Foto 2 = carousel otomatis (wanita bergeser ke kanan, pria ke kiri).
const prof = (p, a, side = "l") => {
  const media = carousel(p.photos && p.photos.length ? p.photos : [p.photo], p.nick, side === "l" ? "r" : "l");
  return `<div class="${a} flex flex-col items-center text-center"><div ${aosAttr()} class="pc ph relative w-[82%] max-w-[330px] aspect-[4/5] overflow-hidden rounded-t-[999px] shadow-[10px_10px_20px_rgba(42,18,21,0.35)]">${media}</div><h3 class="mt-8 font-head italic font-semibold text-2xl sm:text-3xl tracking-wide text-ink-900">${p.full}</h3><p class="mt-4 text-sm sm:text-base leading-relaxed text-ink-900">${p.role} Bapak ${p.father}<br>&amp; Ibu ${p.mother}</p><a href="https://instagram.com/${p.ig}" target="_blank" rel="noopener" class="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ac text-white text-sm font-semibold hover:bg-ac-dark transition">${igIcon}@${p.ig}</a></div>`;
};
// Kartu acara (Akad/Resepsi): foto carousel di atas, lalu info + judul vertikal. Acara ganjil (akad) judul di kanan, acara genap (resepsi) judul di kiri.
const evCard = (e, i) => {
  const day = new Date(e.date || C.date)
    .toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    .toUpperCase();
  const media = carousel(e.photos || (e.photo ? [e.photo] : []), e.t, i % 2 ? "l" : "r");
  return `<div class="${i % 2 ? "rr" : "rl"} text-left bg-cream-50 text-ink-900 ${i % 2 ? "rounded-bl-[2rem]" : "rounded-br-[2rem]"} rounded-t-[2rem] overflow-hidden shadow-xl">${media ? `<div ${aosAttr()} class="pc ph relative aspect-[3/2] w-full overflow-hidden">${media}</div>` : ""}<div class="flex ${i % 2 ? "flex-row-reverse" : ""}"><div class="flex-1 min-w-0 p-5 sm:p-7"><p class="font-bold tracking-wide text-base sm:text-lg leading-snug">${day}${e.time ? `<br>${e.time}` : ""}</p><p class="mt-4 text-sm sm:text-base font-medium">${e.place}</p><p class="text-sm mt-1 leading-relaxed">${e.addr}</p><a href="${e.map}" target="_blank" rel="noopener" class="mt-5 inline-block px-5 py-2.5 rounded-md bg-ac text-white text-sm font-medium hover:bg-ac-dark transition">Buka Maps</a></div><div class="w-16 sm:w-20 flex-none flex items-center justify-center bg-ac ${i % 2 ? "rounded-bl-[2rem]" : "rounded-br-[2rem]"}"><span class="font-head italic font-semibold text-3xl sm:text-4xl text-white whitespace-nowrap" style="writing-mode:vertical-rl;${i % 2 ? "transform:rotate(180deg)" : ""}">${e.t}</span></div></div></div>`;
};
// Kartu cerita (Our Story): foto carousel bergeser ke bawah di atas, daftar momen di kiri, judul "Love Story" vertikal di kanan.
const storyCard = () => {
  const sp = (C.storyPhotos && C.storyPhotos.length ? C.storyPhotos : C.story.map((s) => s.i))
    .filter(Boolean)
    .slice(0, 2);
  const media = carousel(sp, "Love Story", "d");
  return `<div class="rv text-left bg-cream-50 text-ink-900 rounded-t-[2rem] rounded-br-[2rem] overflow-hidden shadow-xl max-w-3xl mx-auto">${media ? `<div ${aosAttr()} class="pc ph relative aspect-[3/2] w-full overflow-hidden">${media}</div>` : ""}<div class="flex"><div class="flex-1 min-w-0 p-5 sm:p-7 space-y-6">${C.story.map((s) => `<div><h3 class="font-serif italic text-xl sm:text-2xl">${s.t}</h3><p class="mt-2 text-sm font-medium">${s.d}</p><p class="mt-1 text-sm leading-relaxed">${s.p}</p></div>`).join("")}</div><div class="w-16 sm:w-20 flex-none flex items-center justify-center bg-ac rounded-br-[2rem]"><span class="font-head italic font-semibold text-3xl sm:text-4xl text-white whitespace-nowrap" style="writing-mode:vertical-rl">Love Story</span></div></div></div>`;
};
