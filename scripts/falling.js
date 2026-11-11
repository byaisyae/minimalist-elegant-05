/* Efek daun/kelopak maroon berjatuhan (canvas) di area undangan. Matikan lewat config.js: falling: false */
(() => {
  if (typeof C !== "undefined" && C.falling === false) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cv = document.createElement("canvas");
  cv.id = "fall";
  cv.setAttribute("aria-hidden", "true");
  document.body.appendChild(cv);
  const g = cv.getContext("2d");
  // beberapa tingkat maroon agar tetap terlihat di bagian terang maupun gelap
  const COLORS = ["#7a1f2b", "#8f2433", "#a3303f", "#5a141f", "#b8404f"];
  let W = 0,
    H = 0,
    dpr = 1,
    P = [],
    last = 0,
    raf = 0;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const make = (initial) => ({
    x: rnd(0, W),
    y: initial ? rnd(-H, H) : rnd(-60, -10),
    s: rnd(7, 15), // ukuran daun
    vy: rnd(28, 60), // kecepatan jatuh (px/detik)
    sw: rnd(14, 38), // lebar ayunan
    sp: rnd(0.5, 1.3), // kecepatan ayunan
    ph: rnd(0, 6.28),
    rot: rnd(0, 6.28),
    vr: rnd(-1.2, 1.2), // putaran
    fl: rnd(0.8, 2), // kecepatan "membalik"
    c: COLORS[(Math.random() * COLORS.length) | 0],
    a: rnd(0.65, 0.95),
  });
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.clientWidth;
    H = cv.clientHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(34, Math.max(14, W / 16)));
    while (P.length < n) P.push(make(true));
    P.length = n;
  };
  const leaf = (p) => {
    const s = p.s;
    g.save();
    g.translate(p.x + Math.sin(p.ph) * p.sw, p.y);
    g.rotate(p.rot);
    g.scale(Math.max(0.25, Math.abs(Math.cos(p.ph * p.fl))), 1); // efek berputar 3D
    g.globalAlpha = p.a;
    g.fillStyle = p.c;
    g.shadowColor = "rgba(255,235,235,.55)"; // tepi terang tipis agar terlihat di latar maroon
    g.shadowBlur = 3;
    g.beginPath();
    g.moveTo(0, -s);
    g.bezierCurveTo(s * 0.9, -s * 0.5, s * 0.8, s * 0.55, 0, s);
    g.bezierCurveTo(-s * 0.8, s * 0.55, -s * 0.9, -s * 0.5, 0, -s);
    g.fill();
    g.shadowBlur = 0;
    g.strokeStyle = "rgba(255,255,255,.28)"; // tulang daun
    g.lineWidth = 0.8;
    g.beginPath();
    g.moveTo(0, -s * 0.85);
    g.lineTo(0, s * 0.85);
    g.stroke();
    g.restore();
  };
  const tick = (t) => {
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    g.clearRect(0, 0, W, H);
    for (let i = 0; i < P.length; i++) {
      const p = P[i];
      p.y += p.vy * dt;
      p.ph += p.sp * dt;
      p.rot += p.vr * dt;
      if (p.y - p.s > H) P[i] = make(false);
      else leaf(p);
    }
    raf = requestAnimationFrame(tick);
  };
  const start = () => {
    if (!raf) {
      last = 0;
      raf = requestAnimationFrame(tick);
    }
  };
  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };
  document.addEventListener("visibilitychange", () =>
    document.hidden ? stop() : start(),
  );
  addEventListener("resize", resize);
  resize();
  start();
})();
