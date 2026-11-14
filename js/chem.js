/* «23 пари» · схеми з молекулами: обертові моделі, структурні формули, ланцюжки амінокислот і рівняння реакцій.
   Структури беруться з js/mol.js (PubChem). Формулу малюємо за правилами скелетного запису: атоми карбону не підписано,
   гідроген показано лише біля гетероатомів, клин і штрихи позначають зв’язки, спрямовані до глядача й від нього. */
(function () {
  "use strict";
  const MOL = window.ADVENT_MOL || {};
  const reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const f1 = (n) => Math.round(n * 10) / 10;
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const plain = (s) => String(s).replace(/<[^>]*>/g, "");
  const nf = (n, lang) => Number(n).toLocaleString(lang === "en" ? "en-GB" : "uk-UA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/ /g, " ");

  const UI = {
    uk: { f2: "Формула", f3: "Модель",
      hint3: "Кульки — це атоми, палички — зв’язки між ними. Модель можна покрутити, а помаранчевим обведено місце, про яке йдеться.",
      hint2: "Так молекулу записують хіміки: кожен злам лінії — атом вуглецю. Помаранчевим підсвічено місце, про яке йдеться.",
      hintP: "Кожна «намистина» — одна амінокислота. Натисніть на картку, щоб прочитати пояснення.",
      hintS: "Кожна літера — один нуклеотид ДНК. Натисніть на картку, щоб прочитати пояснення.",
      no3: "лише формула", eq: "Рівняння реакції", more: "Для допитливих: формули й рівняння", gmol: "г/моль", aa: (n) => `${n} амінокислот`,
      el: { C: "вуглець", H: "водень", O: "кисень", N: "азот", S: "сірка", P: "фосфор", I: "йод" }, atoms: "Кольори атомів" },
    en: { f2: "Formula", f3: "Model",
      hint3: "The balls are atoms and the sticks are the bonds between them. You can rotate the model; the spot in question is ringed in orange.",
      hint2: "This is how chemists write a molecule: every corner of a line is a carbon atom. The spot in question is highlighted in orange.",
      hintP: "Each “bead” is one amino acid. Tap a card to read the explanation.",
      hintS: "Each letter is one DNA nucleotide. Tap a card to read the explanation.",
      no3: "formula only", eq: "Reaction equation", more: "For the curious: formulas and equations", gmol: "g/mol", aa: (n) => `${n} amino acids`,
      el: { C: "carbon", H: "hydrogen", O: "oxygen", N: "nitrogen", S: "sulfur", P: "phosphorus", I: "iodine" }, atoms: "Atom colours" }
  };
  const AA = { A: "Ala", R: "Arg", N: "Asn", D: "Asp", C: "Cys", Q: "Gln", E: "Glu", G: "Gly", H: "His", I: "Ile", L: "Leu", K: "Lys", M: "Met", F: "Phe", P: "Pro", S: "Ser", T: "Thr", W: "Trp", Y: "Tyr", V: "Val" };
  const AAN = {
    uk: { A: "аланін", R: "аргінін", N: "аспарагін", D: "аспарагінова кислота", C: "цистеїн", Q: "глутамін", E: "глутамінова кислота", G: "гліцин", H: "гістидин", I: "ізолейцин", L: "лейцин", K: "лізин", M: "метіонін", F: "фенілаланін", P: "пролін", S: "серин", T: "треонін", W: "триптофан", Y: "тирозин", V: "валін" },
    en: { A: "alanine", R: "arginine", N: "asparagine", D: "aspartic acid", C: "cysteine", Q: "glutamine", E: "glutamic acid", G: "glycine", H: "histidine", I: "isoleucine", L: "leucine", K: "lysine", M: "methionine", F: "phenylalanine", P: "proline", S: "serine", T: "threonine", W: "tryptophan", Y: "tyrosine", V: "valine" }
  };
  const BALL = { C: ["#93A6B1", "#3F525D", "#15262F"], H: ["#FFFFFF", "#E6EFF4", "#A9BFCB"], O: ["#FFD9CF", "#E8614A", "#8E2415"], N: ["#D6ECFA", "#3C8DB6", "#134866"],
    S: ["#FFF3C2", "#E5B93B", "#8F6A0A"], P: ["#FFE6CC", "#F08A43", "#9A4A12"], I: ["#EBDDFB", "#9462D6", "#4B2385"] };
  const R3 = { C: 0.4, N: 0.38, O: 0.36, S: 0.5, P: 0.5, I: 0.62, H: 0.24 };

  function defs() {
    if (document.getElementById("ch-defs")) return;
    const box = document.createElement("div");
    box.innerHTML = `<svg id="ch-defs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${Object.keys(BALL).map((e) =>
      `<radialGradient id="c3-${e}" cx=".34" cy=".28" r=".85"><stop offset="0" stop-color="${BALL[e][0]}"/><stop offset=".42" stop-color="${BALL[e][1]}"/><stop offset="1" stop-color="${BALL[e][2]}"/></radialGradient>`).join("")}</defs></svg>`;
    document.body.appendChild(box.firstChild);
  }

  /* Брутто-формула з індексами: C2H3O2- → C₂H₃O₂⁻ */
  function formula(f) {
    const m = /^([A-Za-z0-9]+?)([+-]\d*)?$/.exec(f) || [0, f, ""];
    const q = m[2] ? `<sup>${m[2].length > 1 ? m[2].slice(1) : ""}${m[2][0] === "-" ? "−" : "+"}</sup>` : "";
    return m[1].replace(/(\d+)/g, "<sub>$1</sub>") + q;
  }

  function prep(m) {
    if (m._) return m._;
    const el = typeof m.e === "string" ? m.e.split("") : m.e, n = el.length;
    const nb = Array.from({ length: n }, () => []);
    for (let k = 0; k < m.b.length; k += 3) { nb[m.b[k]].push({ j: m.b[k + 1], o: m.b[k + 2] }); nb[m.b[k + 1]].push({ j: m.b[k], o: m.b[k + 2] }); }
    const st = {}, q = {};
    for (let k = 0; k < m.s.length; k += 3) st[m.s[k] + "_" + m.s[k + 1]] = m.s[k + 2];
    for (let k = 0; k < m.q.length; k += 2) q[m.q[k]] = m.q[k + 1];
    return (m._ = { el, n, nb, st, q });
  }

  /* ---------- Структурна (скелетна) формула ---------- */
  function svg2d(m, hl, label, fx) {
    const { el, n, nb, st, q } = prep(m), FS = 13;
    const heavy = (i) => el[i] !== "H";
    const stereoH = (i) => !heavy(i) && nb[i].some((x) => st[x.j + "_" + i] || st[i + "_" + x.j]);
    const drawn = (i) => heavy(i) || stereoH(i);
    const hv = (i) => nb[i].filter((x) => drawn(x.j));
    // масштаб: середня довжина зв’язку між важкими атомами = 28 px
    const lens = [];
    for (let k = 0; k < m.b.length; k += 3) if (heavy(m.b[k]) && heavy(m.b[k + 1])) lens.push(Math.hypot(m.p2[2 * m.b[k]] - m.p2[2 * m.b[k + 1]], m.p2[2 * m.b[k] + 1] - m.p2[2 * m.b[k + 1] + 1]));
    lens.sort((a, b) => a - b);
    const S = 28 / (lens[lens.length >> 1] || 1);
    const X = (i) => (fx ? -1 : 1) * m.p2[2 * i] * S, Y = (i) => -m.p2[2 * i + 1] * S;
    const showC = el.filter((e) => e !== "H").length <= 4;

    const L = new Array(n).fill(null);
    for (let i = 0; i < n; i++) {
      if (!drawn(i)) continue;
      if (el[i] === "H") { L[i] = { el: "H", h: 0, q: 0, side: "R" }; continue; }
      if (el[i] === "C" && !showC && !q[i]) continue;
      const h = nb[i].filter((x) => !heavy(x.j) && !stereoH(x.j)).length;
      let vx = 0, vy = 0;
      hv(i).forEach((x) => { const dx = X(x.j) - X(i), dy = Y(x.j) - Y(i), d = Math.hypot(dx, dy) || 1; vx -= dx / d; vy -= dy / d; });
      const side = !h ? "R" : hv(i).length <= 1 ? (vx >= -0.3 ? "R" : "L") : Math.abs(vx) >= Math.abs(vy) * 0.8 ? (vx >= -0.05 ? "R" : "L") : (vy < 0 ? "U" : "D");
      const wE = (el[i] === "I" ? 0.36 : 0.72) * FS, wH = h ? 0.72 * FS + (h > 1 ? 0.44 * FS : 0) : 0, wQ = q[i] ? 0.6 * FS : 0;
      const b = { xl: wE / 2 + 1.5, xr: wE / 2 + 1.5, yt: FS * 0.52, yb: FS * 0.52 };
      if (side === "R") b.xr += wH + wQ; else b.xr += wQ;
      if (side === "L") b.xl += wH;
      if (side === "U") b.yt += FS * 0.95;
      if (side === "D") b.yb += FS * 0.95;
      L[i] = { el: el[i], h, q: q[i] || 0, side, wE, wH, b };
    }
    L.forEach((l) => { if (l && !l.b) { l.wE = 0.72 * FS; l.wH = 0; l.b = { xl: l.wE / 2 + 1, xr: l.wE / 2 + 1, yt: FS * 0.5, yb: FS * 0.5 }; } });
    const trim = (i, ux, uy) => {
      const l = L[i];
      if (!l) return 0;
      const tx = ux > 1e-6 ? l.b.xr / ux : ux < -1e-6 ? l.b.xl / -ux : Infinity, ty = uy > 1e-6 ? l.b.yb / uy : uy < -1e-6 ? l.b.yt / -uy : Infinity;
      return Math.min(tx, ty) + 1.2;
    };
    // найменше кільце, що містить зв’язок i–j: подвійний зв’язок малюємо всередину кільця
    const ringC = (i, j) => {
      const prev = { [i]: -1 }, qu = [i];
      while (qu.length) {
        const u = qu.shift();
        for (const x of nb[u]) {
          if (!heavy(x.j) || (u === i && x.j === j) || prev[x.j] !== undefined) continue;
          prev[x.j] = u;
          if (x.j === j) { let c = j, k = 0, sx = 0, sy = 0; while (c !== -1 && k < 9) { sx += X(c); sy += Y(c); k++; c = prev[c]; } return c === -1 ? [sx / k, sy / k] : null; }
          qu.push(x.j);
        }
      }
      return null;
    };

    let glow = "", lines = "", labels = "";
    const ln = (a, b, c) => `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}"${c ? ` class="${c}"` : ""}/>`;
    for (let k = 0; k < m.b.length; k += 3) {
      const i = m.b[k], j = m.b[k + 1], o = m.b[k + 2];
      if (!drawn(i) || !drawn(j)) continue;
      const ax = X(i), ay = Y(i), bx = X(j), by = Y(j), len = Math.hypot(bx - ax, by - ay) || 1, ux = (bx - ax) / len, uy = (by - ay) / len, px = -uy, py = ux;
      const ti = trim(i, ux, uy), tj = trim(j, -ux, -uy);
      const a = [ax + ux * ti, ay + uy * ti], b = [bx - ux * tj, by - uy * tj];
      if (hl.has(i) && hl.has(j)) glow += `<line x1="${f1(ax)}" y1="${f1(ay)}" x2="${f1(bx)}" y2="${f1(by)}"/>`;
      const sc = st[i + "_" + j] ? [st[i + "_" + j], a, b] : st[j + "_" + i] ? [st[j + "_" + i], b, a] : null;
      if (o === 1 && sc) {
        const s0 = sc[1], e0 = sc[2];
        if ((sc[0] === 5) !== !!fx) lines += `<polygon class="wd" points="${f1(s0[0])},${f1(s0[1])} ${f1(e0[0] + px * 3.1)},${f1(e0[1] + py * 3.1)} ${f1(e0[0] - px * 3.1)},${f1(e0[1] - py * 3.1)}"/>`;
        else {
          const cnt = Math.max(4, Math.round(len / 3.6));
          for (let t = 1; t <= cnt; t++) { const f = t / cnt, cx = s0[0] + (e0[0] - s0[0]) * f, cy = s0[1] + (e0[1] - s0[1]) * f, w = 0.5 + 2.8 * f; lines += ln([cx + px * w, cy + py * w], [cx - px * w, cy - py * w], "hs"); }
        }
      } else if (o === 2) {
        const di = hv(i).length, dj = hv(j).length;
        let side = 0;
        if (di > 1 && dj > 1) {
          const c = ringC(i, j);
          if (c) side = Math.sign((c[0] - ax) * px + (c[1] - ay) * py);
          else { let s = 0; hv(i).concat(hv(j)).forEach((x) => { if (x.j !== i && x.j !== j) s += Math.sign((X(x.j) - ax) * px + (Y(x.j) - ay) * py); }); side = Math.sign(s) || 1; }
        }
        if (!side) lines += ln([a[0] + px * 2.1, a[1] + py * 2.1], [b[0] + px * 2.1, b[1] + py * 2.1]) + ln([a[0] - px * 2.1, a[1] - py * 2.1], [b[0] - px * 2.1, b[1] - py * 2.1]);
        else {
          const ca = L[i] ? 0 : 3.6, cb = L[j] ? 0 : 3.6, d = side * 4.3;
          lines += ln(a, b) + ln([a[0] + px * d + ux * ca, a[1] + py * d + uy * ca], [b[0] + px * d - ux * cb, b[1] + py * d - uy * cb]);
        }
      } else if (o === 3) lines += ln(a, b) + ln([a[0] + px * 3.4, a[1] + py * 3.4], [b[0] + px * 3.4, b[1] + py * 3.4]) + ln([a[0] - px * 3.4, a[1] - py * 3.4], [b[0] - px * 3.4, b[1] - py * 3.4]);
      else lines += ln(a, b);
    }
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (let i = 0; i < n; i++) {
      if (!drawn(i)) continue;
      const x = X(i), y = Y(i), l = L[i], b = l ? l.b : { xl: 2, xr: 2, yt: 2, yb: 2 };
      x0 = Math.min(x0, x - b.xl); x1 = Math.max(x1, x + b.xr); y0 = Math.min(y0, y - b.yt); y1 = Math.max(y1, y + b.yb);
      if (hl.has(i)) glow += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${l ? 11 : 7.5}"/>`;
      if (!l) continue;
      const by = y + FS * 0.36, t = (tx, ty, s, c) => `<text x="${f1(tx)}" y="${f1(ty)}" class="${c}">${s}</text>`;
      let g = t(x, by, l.el, "a");
      if (l.h) {
        const sub = l.h > 1 ? l.h : "";
        if (l.side === "R") g += t(x + l.wE / 2 + 0.36 * FS, by, "H", "a") + (sub ? t(x + l.wE / 2 + 0.93 * FS, by + 3.6, sub, "s") : "");
        else if (l.side === "L") g += t(x - l.wE / 2 - (sub ? 0.44 * FS : 0) - 0.36 * FS, by, "H", "a") + (sub ? t(x - l.wE / 2 - 0.2 * FS, by + 3.6, sub, "s") : "");
        else { const yy = by + (l.side === "U" ? -1 : 1) * FS * 0.98; g += t(x - (sub ? 0.2 * FS : 0), yy, "H", "a") + (sub ? t(x + 0.4 * FS, yy + 3.6, sub, "s") : ""); }
      }
      if (l.q) g += t(x + l.wE / 2 + (l.side === "R" ? l.wH : 0) + 0.3 * FS, by - 5.5, (Math.abs(l.q) > 1 ? Math.abs(l.q) : "") + (l.q < 0 ? "−" : "+"), "s");
      labels += `<g class="ce ce-${l.el}">${g}</g>`;
    }
    const P = 13, w = x1 - x0 + 2 * P, h = y1 - y0 + 2 * P;
    return { w, h, svg: `<svg class="ch-2d" viewBox="${f1(x0 - P)} ${f1(y0 - P)} ${f1(w)} ${f1(h)}" width="${f1(w * 1.12)}" height="${f1(h * 1.12)}" role="img" aria-label="${esc(label)}"><g class="ch-glow">${glow}</g><g class="ch-bonds">${lines}</g>${labels}</svg>` };
  }

  /* ---------- 3D-модель: кульки й стрижні, обертається перетягуванням ---------- */
  function view3d(box, m, hl, label) {
    const { el, n } = prep(m), W = Math.max(120, box.clientWidth), H = Math.max(120, box.clientHeight), NS = "http://www.w3.org/2000/svg";
    let cx = 0, cy = 0, cz = 0;
    for (let i = 0; i < n; i++) { cx += m.p3[3 * i]; cy += m.p3[3 * i + 1]; cz += m.p3[3 * i + 2]; }
    cx /= n; cy /= n; cz /= n;
    const P = [];
    let rxz = 0, ry0 = 0;
    for (let i = 0; i < n; i++) { const p = [m.p3[3 * i] - cx, m.p3[3 * i + 1] - cy, m.p3[3 * i + 2] - cz]; P.push(p); rxz = Math.max(rxz, Math.hypot(p[0], p[2]) + 0.6); ry0 = Math.max(ry0, Math.abs(p[1]) + 0.6); }
    const sc = Math.min((W / 2 - 6) / rxz, (H / 2 - 8) / (ry0 * 1.18), 25);
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("class", "ch-3d"); svg.setAttribute("viewBox", `0 0 ${W} ${H}`); svg.setAttribute("width", W); svg.setAttribute("height", H);
    svg.setAttribute("role", "img"); svg.setAttribute("aria-label", label);
    const mk = (tag, cls) => { const e = document.createElementNS(NS, tag); if (cls) e.setAttribute("class", cls); return e; };
    const items = [];
    const B = m.b3 || m.b;      // у 3D-записі нумерація атомів може відрізнятися
    for (let k = 0; k < B.length; k += 3) {
      const o = B[k + 2], parts = o > 1 ? [mk("line", "bd"), mk("line", "bd")] : [mk("line", "bd")];
      items.push({ t: 1, i: B[k], j: B[k + 1], parts, z: 0 });
    }
    for (let i = 0; i < n; i++) { const c = mk("circle", "at" + (hl.has(i) ? " on" : "")); c.setAttribute("fill", `url(#c3-${el[i]})`); items.push({ t: 0, i, parts: [c], z: 0 }); }
    box.textContent = "";
    box.appendChild(svg);
    let ry = -0.5, rx = 0.22, drag = null, auto = !reduce, seen = true, raf = 0, order = "";
    const Sx = new Float32Array(n), Sy = new Float32Array(n), Sz = new Float32Array(n), Sr = new Float32Array(n);
    function draw() {
      const c1 = Math.cos(ry), s1 = Math.sin(ry), c2 = Math.cos(rx), s2 = Math.sin(rx);
      for (let i = 0; i < n; i++) {
        const p = P[i], x = p[0] * c1 + p[2] * s1, z = -p[0] * s1 + p[2] * c1, y = p[1] * c2 - z * s2, z2 = p[1] * s2 + z * c2, f = 820 / (820 - z2 * sc);
        Sx[i] = W / 2 + x * sc * f; Sy[i] = H / 2 - y * sc * f; Sz[i] = z2; Sr[i] = R3[el[i]] * sc * f;
      }
      for (const it of items) {
        if (!it.t) { const c = it.parts[0]; it.z = Sz[it.i]; c.setAttribute("cx", f1(Sx[it.i])); c.setAttribute("cy", f1(Sy[it.i])); c.setAttribute("r", f1(Sr[it.i])); continue; }
        const i = it.i, j = it.j, dx = Sx[j] - Sx[i], dy = Sy[j] - Sy[i], d = Math.hypot(dx, dy);
        it.z = (Sz[i] + Sz[j]) / 2;
        const hide = d < (Sr[i] + Sr[j]) * 0.8, ux = dx / (d || 1), uy = dy / (d || 1), w = Math.max(1.6, 0.13 * sc), off = it.parts.length > 1 ? w * 0.75 : 0;
        it.parts.forEach((l, k) => {
          if (hide) { l.setAttribute("visibility", "hidden"); return; }
          const s = (k ? -1 : 1) * off;
          l.removeAttribute("visibility");
          l.setAttribute("x1", f1(Sx[i] + ux * Sr[i] * 0.8 - uy * s)); l.setAttribute("y1", f1(Sy[i] + uy * Sr[i] * 0.8 + ux * s));
          l.setAttribute("x2", f1(Sx[j] - ux * Sr[j] * 0.8 - uy * s)); l.setAttribute("y2", f1(Sy[j] - uy * Sr[j] * 0.8 + ux * s));
          l.setAttribute("stroke-width", f1(it.parts.length > 1 ? w * 0.72 : w));
        });
      }
      const sorted = items.slice().sort((a, b) => a.z - b.z), key = sorted.map((x) => x.t + ":" + x.i + ":" + (x.j || 0)).join(",");
      if (key !== order) { order = key; sorted.forEach((it) => it.parts.forEach((p) => svg.appendChild(p))); }
    }
    draw();
    const down = (e) => { drag = { x: e.clientX, y: e.clientY, moved: 0, touch: e.pointerType === "touch" }; auto = false; try { svg.setPointerCapture(e.pointerId); } catch (err) { /* без захоплення теж працює */ } };
    const move = (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      drag.x = e.clientX; drag.y = e.clientY; drag.moved += Math.abs(dx) + Math.abs(dy);
      ry += dx * 0.012;
      if (!drag.touch) rx = Math.max(-0.9, Math.min(0.9, rx + dy * 0.012));
      draw();
    };
    const up = () => { if (drag && drag.moved > 6) box.dataset.dragged = Date.now(); drag = null; };
    svg.addEventListener("pointerdown", down); svg.addEventListener("pointermove", move); svg.addEventListener("pointerup", up); svg.addEventListener("pointercancel", up);
    let io = null;
    if ("IntersectionObserver" in window) { io = new IntersectionObserver((en) => { seen = en[0].isIntersecting; }); io.observe(box); }
    const tick = () => {
      if (!box.isConnected || !svg.isConnected) return;
      if (auto && seen) { ry += 0.007; draw(); }
      if (auto) raf = requestAnimationFrame(tick);
    };
    if (auto) raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); auto = false; if (io) io.disconnect(); };
  }

  /* ---------- Невеликі об’ємні значки для підписів без молекули ---------- */
  const ICO = {
    dna: `<path d="M8,10 C8,22 40,22 40,34 M40,10 C40,22 8,22 8,34" fill="none" stroke="url(#fx-tube)" stroke-width="5" stroke-linecap="round"/><path d="M14,13 H34 M14,31 H34 M20,22 H28" stroke="#9DBBCB" stroke-width="2.4" stroke-linecap="round"/>`,
    rec: `<rect x="2" y="24" width="44" height="9" rx="4.5" fill="#C9DFEA"/><path d="M18,10 V40 a6,3 0 0 0 12,0 V10 Z" fill="url(#fx-cyl)"/><ellipse cx="24" cy="10" rx="9" ry="3.6" fill="#BFEAF5" stroke="#2A77A0"/>`,
    cell: `<circle cx="24" cy="24" r="19" fill="url(#fx-ball-ice)"/><circle cx="27" cy="26" r="7.5" fill="url(#fx-ball)"/>`,
    rbc: `<ellipse cx="24" cy="25" rx="20" ry="13" fill="url(#fx-ball-red)"/><ellipse cx="24" cy="24" rx="8.5" ry="4.4" fill="#8E2415" opacity=".45"/>`,
    drop: `<path d="M24,5 C32,17 38,24 38,31 a14,14 0 0 1 -28,0 C10,24 16,17 24,5 Z" fill="url(#fx-ball)"/>`,
    prot: `<circle cx="19" cy="26" r="15" fill="url(#fx-ball)"/><circle cx="33" cy="17" r="10" fill="url(#fx-ball-peach)"/>`,
    pig: `<circle cx="24" cy="24" r="18" fill="#2B1B12"/><circle cx="18" cy="17" r="7" fill="#fff" opacity=".16"/>`,
    sig: `<circle cx="14" cy="24" r="9" fill="url(#fx-ball)"/><path d="M26,14 q8,10 0,20 M33,9 q12,15 0,30" fill="none" stroke="#FF9D45" stroke-width="3.6" stroke-linecap="round"/>`
  };

  /* ---------- Схема: молекули, стрілки з ферментом, ланцюжки амінокислот ----------
     Основний вигляд розрахований на читача без хімічної освіти: модель молекули, проста назва й підпис.
     Формули, молярні маси та рівняння реакцій сховано в розділ «Для допитливих». */
  function render(stage, t, lang, W, v) {
    defs();
    const ui = UI[lang] || UI.uk, flow = v.flow || [], T = t.items || [];
    const mols = flow.map((f) => (f.m ? MOL[f.m] : null));
    const any3 = mols.some((m) => m && m.p3);
    const elems = [];
    mols.forEach((m) => { if (m) prep(m).el.forEach((e) => { if (!elems.includes(e)) elems.push(e); }); });
    elems.sort((a, b) => "CHONSPI".indexOf(a) - "CHONSPI".indexOf(b));
    const hlOf = (k, d3) => { const f = flow[k], m = mols[k], g = m && ((d3 && m.g3) || m.g); return new Set((g && f.g && g[f.g]) || []); };
    const sciOf = (k) => mols[k].n[lang] || mols[k].n.uk;
    const nameOf = (k) => (T[k] && T[k].n) || (mols[k] ? sciOf(k) : "");
    const draws = flow.map((f, k) => (mols[k] ? svg2d(mols[k], hlOf(k), plain(nameOf(k)), f.fx) : null));
    // сусідні картки (між стрілками) тримаються разом
    const sets = [];
    let cur = [];
    flow.forEach((f, k) => { if (f.a) { if (cur.length) sets.push({ set: cur }); sets.push({ arr: k }); cur = []; } else cur.push(k); });
    if (cur.length) sets.push({ set: cur });
    // розкладка залежить від вигляду: моделі компактні, формулам великих молекул потрібно більше місця
    const lay = (mode) => {
      const basis = (k) => (!draws[k] ? (flow[k].p ? 186 : flow[k].s ? 176 : 112)
        : mode === "3d" && mols[k].p3 ? Math.round(Math.max(104, Math.min(60 + prep(mols[k]).n * 2.2, 170)))
          : Math.round(Math.max(88, Math.min(draws[k].w * 0.92, 250))));
      let need = (flow.length - 1) * 10;
      flow.forEach((f, k) => { need += f.a ? 84 : f.plus ? 14 : basis(k) + 18; });
      const row = need <= W + 2, hOf = {};
      const tall = (ks) => (mode === "3d" ? (row ? 150 : 172) : Math.round(Math.max(96, Math.min(row ? 156 : 178, Math.max.apply(null, ks.map((k) => draws[k].h * 1.12 + 12))))));
      if (row) { const ks = flow.map((f, k) => k).filter((k) => draws[k]); if (ks.length) { const h = tall(ks); ks.forEach((k) => { hOf[k] = h; }); } }
      else sets.forEach((p) => { if (!p.set) return; const ks = p.set.filter((k) => draws[k]); if (ks.length) { const h = tall(ks); ks.forEach((k) => { hOf[k] = h; }); } });
      return { row, basis, hOf };
    };
    const tile = (f, k) => {
      const x = T[k] || {};
      if (f.a) return `<div class="ch-arr"><em>${x.by || ""}</em><i></i><small>${x.co || ""}</small></div>`;
      if (f.plus) return `<div class="ch-plus" aria-hidden="true">+</div>`;
      let body;
      if (mols[k]) body = `<div class="ch-stage"></div>`;
      else if (f.p) body = `<div class="ch-stage ch-pep">${f.p.split("").map((c, i) => `${f.cut === i ? `<i class="cut" aria-hidden="true"></i>` : ""}<b class="aa${(f.hl || []).includes(i) ? " on" : ""}" title="${(AAN[lang] || AAN.uk)[c] || ""}">${AA[c] || c}</b>`).join("")}</div>`;
      else if (f.s) body = `<div class="ch-stage ch-seq"><u>5′</u>${f.s.split("").map((c) => (c === " " ? `<i></i>` : `<b class="nt nt-${c}">${c}</b>`)).join("")}<u>3′</u></div>`;
      else body = `<div class="ch-stage ch-ico"><svg viewBox="0 0 48 48" width="58" height="58" aria-hidden="true">${ICO[f.ico] || ICO.cell}</svg></div>`;
      const cap = x.c ? `<small class="ch-meta">${x.c}</small>` : f.p ? `<small class="ch-meta">${ui.aa(f.p.length)}</small>` : "";
      return `<div class="ch-mol${x.t ? " can" : ""}" data-k="${k}"${x.t ? ` role="button" tabindex="0"` : ""}>${body}<b class="ch-name">${nameOf(k)}</b>${cap}</div>`;
    };
    const sci = mols.map((m, k) => (m ? `<li><b>${sciOf(k)}</b> <span class="ch-f">${formula(m.f)} · ${nf(m.w, lang)} ${ui.gmol}</span> <a class="ch-src" href="https://pubchem.ncbi.nlm.nih.gov/compound/${m.cid}" target="_blank" rel="noopener">PubChem</a></li>` : "")).join("");
    const eq = t.eq && t.eq.length ? `<div class="ch-eq"><span>${ui.eq}</span>${t.eq.map((e) => `<p>${e}</p>`).join("")}</div>` : "";
    stage.innerHTML = `<div class="ch" data-mode="">
      ${any3 ? `<div class="ch-bar"><div class="seg3 two ch-mode" role="group"><button type="button" data-mode="3d"><b>${ui.f3}</b></button><button type="button" data-mode="2d"><b>${ui.f2}</b></button></div></div>` : ""}
      <div class="ch-flow">${sets.map((p) => (p.set ? `<div class="ch-set">${p.set.map((k) => tile(flow[k], k)).join("")}</div>` : tile(flow[p.arr], p.arr))).join("")}</div>
      <p class="ch-hint"></p>
      <div class="ch-note" aria-live="polite"></div>
      ${elems.length ? `<div class="ch-el"><span>${ui.atoms}:</span>${elems.map((e) => `<i><svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="6.4" fill="url(#c3-${e})"/></svg>${ui.el[e]}</i>`).join("")}</div>` : ""}
      ${sci || eq ? `<details class="ch-more"><summary>${ui.more}</summary>${sci ? `<ul>${sci}</ul>` : ""}${eq}</details>` : ""}
    </div>`;
    const root = stage.querySelector(".ch"), note = root.querySelector(".ch-note"), hint = root.querySelector(".ch-hint");
    let stops = [];
    const setMode = (mode) => {
      stops.forEach((s) => s()); stops = [];
      const L = lay(mode);
      root.dataset.mode = mode;
      root.classList.toggle("row", L.row); root.classList.toggle("col", !L.row);
      root.querySelectorAll(".ch-mode button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.mode === mode));
      hint.textContent = !draws.some(Boolean) ? (flow.some((f) => f.p) ? ui.hintP : ui.hintS) : mode === "3d" ? ui.hint3 : ui.hint2;
      root.querySelectorAll(".ch-mol").forEach((el) => {
        const k = +el.dataset.k, m = mols[k], box = el.querySelector(".ch-stage");
        el.style.setProperty("--fb", L.basis(k) + "px");
        if (!m) return;
        box.style.height = L.hOf[k] + "px";
        box.classList.toggle("is3", mode === "3d" && !!m.p3);
        if (mode === "3d" && m.p3) stops.push(view3d(box, m, hlOf(k, true), plain(nameOf(k))));
        else box.innerHTML = draws[k].svg + (mode === "3d" ? `<span class="ch-no3">${ui.no3}</span>` : "");
      });
    };
    const pick = (k) => {
      const x = T[k] || {};
      if (!x.t) return;
      root.querySelectorAll(".ch-mol").forEach((el) => el.classList.toggle("on", +el.dataset.k === k));
      note.innerHTML = `<b>${nameOf(k)}</b><p>${x.t}</p>`;
    };
    root.querySelectorAll(".ch-mode button").forEach((b) => b.addEventListener("click", () => setMode(b.dataset.mode)));
    root.querySelectorAll(".ch-mol.can").forEach((el) => {
      const go = (e) => { const st = el.querySelector(".ch-stage"); if (st && st.dataset.dragged && Date.now() - st.dataset.dragged < 350) return; if (e.target.closest("a")) return; pick(+el.dataset.k); };
      el.addEventListener("click", go);
      el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(+el.dataset.k); } });
    });
    setMode(any3 ? "3d" : "2d");
    const first = v.pick !== undefined ? v.pick : flow.findIndex((f, k) => (T[k] || {}).t);
    if (first >= 0) pick(first);
    return () => { stops.forEach((s) => s()); };
  }

  window.Chem = { render, has: (key) => !!MOL[key], plain };
})();
