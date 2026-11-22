/* «23 пари» · об’ємна (3D) графіка: мініатюри й портрет хромосоми, інтерактивні графіки днів 1–5
   та шаблонні інтерактивні елементи для днів 6–24 (стовпчики, частка зі 100, вибір алелів, картки-перевертні).
   Об’єм дають спільні градієнти (#fx-…), тіні та нахил сцени за курсором. Числа звірено за джерелами в підписах. */
(function () {
  "use strict";
  const reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const f1 = (n) => Math.round(n * 10) / 10;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const plain = (s) => String(s).replace(/<[^>]*>/g, "").replace(/\{\d+\}/g, "");
  const nf = (n, d, lang) => Number(n).toLocaleString(lang === "en" ? "en-GB" : "uk-UA", { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }).replace(/ /g, " ");
  const PEACH = "#FF9D45", NAVY = "#0B2532", LINK = "#1E658C";

  /* ---------- Спільні градієнти й тіні ---------- */
  function defs() {
    if (document.getElementById("fx-defs")) return;
    const lin = (id, x2, y2, stops) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map((s) => `<stop offset="${s[0]}" stop-color="${s[1]}"${s[2] !== undefined ? ` stop-opacity="${s[2]}"` : ""}/>`).join("")}</linearGradient>`;
    const rad = (id, stops) => `<radialGradient id="${id}" cx=".35" cy=".3" r=".8">${stops.map((s) => `<stop offset="${s[0]}" stop-color="${s[1]}"/>`).join("")}</radialGradient>`;
    const box = document.createElement("div");
    box.innerHTML = `<svg id="fx-defs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
      ${lin("fx-tube", 0, 1, [[0, "#CDEFF8"], [.26, "#7CC8DE"], [.64, "#2A77A0"], [1, "#134866"]])}
      ${lin("fx-tube-peach", 0, 1, [[0, "#FFE6CC"], [.3, "#FFB575"], [.7, "#F08A43"], [1, "#C2621F"]])}
      ${lin("fx-tube-grey", 0, 1, [[0, "#E6EEF2"], [.3, "#BACBD4"], [.7, "#8AA1AD"], [1, "#5F7786"]])}
      ${lin("fx-tube-ice", 0, 1, [[0, "#FAFDFE"], [.4, "#D9E8EF"], [1, "#A9C6D4"]])}
      ${lin("fx-cyl", 1, 0, [[0, "#1B5F86"], [.3, "#7CC8DE"], [.56, "#3C8DB6"], [1, "#114463"]])}
      ${lin("fx-cyl-peach", 1, 0, [[0, "#D9772F"], [.3, "#FFD0A3"], [.56, "#FF9D45"], [1, "#B4541A"]])}
      ${lin("fx-cyl-glass", 1, 0, [[0, "#fff", .6], [.22, "#fff", .14], [.8, "#fff", .06], [1, "#fff", .4]])}
      ${lin("fx-milk", 1, 0, [[0, "#DCE9F0"], [.3, "#FFFFFF"], [.7, "#F1F7FA"], [1, "#C3D7E1"]])}
      ${rad("fx-ball", [[0, "#DDF5FB"], [.38, "#5FB4CC"], [1, "#154B6B"]])}
      ${rad("fx-ball-peach", [[0, "#FFF2E3"], [.38, "#FFB575"], [1, "#C2621F"]])}
      ${rad("fx-ball-green", [[0, "#ECF9EC"], [.42, "#7CC68F"], [1, "#2F7D48"]])}
      ${rad("fx-ball-ice", [[0, "#FFFFFF"], [.5, "#CFE3EC"], [1, "#97B6C6"]])}
      ${rad("fx-ball-white", [[0, "#FFFFFF"], [.6, "#EAF4F9"], [1, "#B4CBD7"]])}
      ${rad("fx-ball-red", [[0, "#FFDCD2"], [.36, "#E8614A"], [1, "#8E2415"]])}
      <radialGradient id="fx-dome" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#D9E9F1"/></radialGradient>
      <filter id="fx-soft" x="-40%" y="-80%" width="180%" height="260%"><feGaussianBlur stdDeviation="4"/></filter>
    </defs></svg>`;
    document.body.appendChild(box.firstChild);
  }
  const sh = (cx, cy, rx, ry, o) => `<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="${NAVY}" opacity="${o || 0.2}" filter="url(#fx-soft)"/>`;
  const ball = (cx, cy, r, g, cls) => `<circle${cls ? ` class="${cls}"` : ""} cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="url(#${g || "fx-ball"})"/>`;
  const tube = (x, y, w, h, g) => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h / 2)}" fill="url(#${g || "fx-tube"})" stroke="rgba(11,37,50,.18)"/><rect x="${f1(x + h * 0.5)}" y="${f1(y + h * 0.16)}" width="${f1(Math.max(0, w - h))}" height="${f1(h * 0.14)}" rx="${f1(h * 0.07)}" fill="#fff" opacity=".5"/>`;

  /* Сцена ледь нахиляється за курсором миші */
  function tilt(stage) {
    const sc = stage.querySelector(".fx-scene");
    if (!sc || reduce) return () => {};
    const mv = (e) => {
      if (e.pointerType !== "mouse") return;
      const r = stage.getBoundingClientRect();
      sc.style.setProperty("--tx", f1(((e.clientX - r.left) / r.width - 0.5) * 12));
      sc.style.setProperty("--ty", f1(-((e.clientY - r.top) / r.height - 0.5) * 9));
    };
    const out = () => { sc.style.setProperty("--tx", 0); sc.style.setProperty("--ty", 0); };
    stage.addEventListener("pointermove", mv); stage.addEventListener("pointerleave", out);
    return () => { stage.removeEventListener("pointermove", mv); stage.removeEventListener("pointerleave", out); };
  }
  function tween(from, to, ms, step) {
    if (reduce || from === to) { step(to); return () => {}; }
    let raf, t0 = null;
    const tick = (t) => {
      if (t0 === null) t0 = t;
      const k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3);
      step(from + (to - from) * e);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }
  function seg(root, sel, onPick) {
    const btns = Array.from(root.querySelectorAll(sel));
    const pick = (i) => { btns.forEach((b, k) => b.setAttribute("aria-pressed", String(k === i))); onPick(i); };
    btns.forEach((b, i) => b.addEventListener("click", () => pick(i)));
    return pick;
  }

  /* ---------- Хромосоми ---------- */
  function chromPath(x, yTop, w, len, cenFrac) {
    const r = w / 2, yc = yTop + len * cenFrac, yb = yTop + len, pinch = w * 0.24;
    const c1 = Math.max(yTop + r, yc - 5), c2 = Math.max(c1, Math.min(yb - r, yc + 5));
    return `M${f1(x)},${f1(yTop + r)} a${r},${r} 0 0 1 ${w},0 L${f1(x + w)},${f1(c1)} Q${f1(x + w - pinch)},${f1((c1 + c2) / 2)} ${f1(x + w)},${f1(c2)} L${f1(x + w)},${f1(yb - r)} a${r},${r} 0 0 1 ${-w},0 L${f1(x)},${f1(c2)} Q${f1(x + pinch)},${f1((c1 + c2) / 2)} ${f1(x)},${f1(c1)} Z`;
  }
  function miniChrom(d, o) {
    const H = 100, w = 13, gap = 7, scale = 96 / 249;
    if (d.chr === "MT") {
      let g = `<circle cx="20" cy="50" r="15" fill="none" stroke="${o.fill}" stroke-width="6" opacity="${o.op}"/>`;
      if (o.hero) g += `<circle cx="20" cy="35" r="4" fill="${PEACH}"/>`;
      return `<svg viewBox="0 0 40 ${H}" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">${g}</svg>`;
    }
    const pair = d.chr2 ? [[d.len, d.cen], [d.len2, d.cen2]] : [[d.len, d.cen], [d.len, d.cen]];
    let g = "";
    pair.forEach(([len, cen], k) => {
      const h = Math.max(14, len * scale), x = 6 + k * (w + gap), y = H - 2 - h;
      g += `<path d="${chromPath(x, y, w, h, cen / len)}" fill="${o.fill}" opacity="${o.op}"/>`;
      if (o.hero) g += `<rect x="${x + 2.4}" y="${f1(y + 5)}" width="2.4" height="${f1(Math.max(2, h - 10))}" rx="1.2" fill="#fff" opacity=".4"/>`;
      if (o.hero && k === 0 && d.pos) g += `<circle cx="${x - 1}" cy="${f1(y + (d.pos / len) * h)}" r="4" fill="${PEACH}" stroke="#fff" stroke-width="1.2"/>`;
    });
    return `<svg viewBox="0 0 ${6 + 2 * w + gap + 4} ${H}" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">${g}</svg>`;
  }
  /* Портрет хромосоми в картці дня */
  function ideogram(d, map, W, t, topicIdx, gene, band) {
    defs();
    let g = "";
    if (d.chr === "MT") {
      const cx = W / 2, R = Math.min(84, W * 0.22), cy = R + 22;
      g += `${sh(cx, cy + R + 16, R * 0.9, 7, 0.4)}<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="url(#fx-tube)" stroke-width="22"/><circle cx="${cx}" cy="${cy}" r="${R + 6}" fill="none" stroke="#fff" stroke-width="2" opacity=".35"/>`;
      for (let k = 0; k < 37; k++) { const a = (k / 37) * Math.PI * 2 - Math.PI / 2; g += `<line x1="${f1(cx + Math.cos(a) * (R - 11))}" y1="${f1(cy + Math.sin(a) * (R - 11))}" x2="${f1(cx + Math.cos(a) * (R + 11))}" y2="${f1(cy + Math.sin(a) * (R + 11))}" stroke="${NAVY}" stroke-width="1.8" opacity=".5"/>`; }
      g += `<text x="${cx}" y="${cy + 2}" text-anchor="middle" style="font-family:var(--font-head);font-size:26px;font-weight:300" fill="#fff">${t.mtBp}</text><text x="${cx}" y="${cy + 22}" text-anchor="middle" style="font-family:var(--font-body);font-size:12px" fill="rgba(255,255,255,.8)">${t.bp}</text>`;
      return `<svg class="anim" width="${W}" height="${f1(cy + R + 26)}" viewBox="0 0 ${W} ${f1(cy + R + 26)}" role="img" aria-label="${esc(t.mt)}">${g}</svg>`;
    }
    const tracks = d.chr2 ? [[d.chr, d.len, d.cen, true], [d.chr2, d.len2, d.cen2, false]] : [[d.chr, d.len, d.cen, true]];
    const full = tracks[0][1], h = 30, x0 = 4, usable = W - 8;
    let y = 30;
    tracks.forEach(([name, len, cen, hasHero]) => {
      const w = (len / full) * usable, xc = x0 + (cen / len) * w, r = h / 2, pinch = 7;
      const a = Math.max(x0 + r, xc - 10), b = Math.min(x0 + w - r, xc + 10);
      g += `<text x="${x0}" y="${y - 10}" style="font-family:var(--font-body);font-size:12px" fill="rgba(255,255,255,.8)">${d.chr2 ? name + " · " : ""}${t.pArm}</text>`;
      if (w > 260) g += `<text x="${f1(x0 + w)}" y="${y - 10}" text-anchor="end" style="font-family:var(--font-body);font-size:12px" fill="rgba(255,255,255,.8)">${t.qArm}</text>`;
      g += sh(x0 + w / 2, y + h + 7, w * 0.46, 5, 0.45);
      g += `<path d="M${x0 + r},${y} L${f1(a)},${y} Q${f1(xc)},${y + pinch} ${f1(b)},${y} L${f1(x0 + w - r)},${y} a${r},${r} 0 0 1 0,${h} L${f1(b)},${y + h} Q${f1(xc)},${y + h - pinch} ${f1(a)},${y + h} L${x0 + r},${y + h} a${r},${r} 0 0 1 0,${-h} Z" fill="url(#fx-tube)" stroke="rgba(255,255,255,.35)"/>`;
      g += `<rect x="${f1(x0 + r)}" y="${y + 4.5}" width="${f1(Math.max(0, a - x0 - r - 4))}" height="3.4" rx="1.7" fill="#fff" opacity=".55"/><rect x="${f1(b + 4)}" y="${y + 4.5}" width="${f1(Math.max(0, x0 + w - r - b - 4))}" height="3.4" rx="1.7" fill="#fff" opacity=".55"/>`;
      (map[name] || []).forEach((v, i) => {
        const x = f1(x0 + (v[0] / len) * w);
        g += `<line class="fadein" style="--i:${i * 3}" x1="${x}" x2="${x}" y1="${y + 3}" y2="${y + h - 3}" stroke="${NAVY}" stroke-width="2" opacity=".62"><title>${esc(v[1])}: ${esc(v[topicIdx])}</title></line>`;
      });
      if (hasHero && d.pos) {
        const x = f1(x0 + (d.pos / len) * w), right = x < W / 2;
        g += `<line x1="${x}" x2="${x}" y1="${y - 5}" y2="${y + h + 20}" stroke="${PEACH}" stroke-width="1.8"/>`;
        g += `<circle class="pulse" cx="${x}" cy="${y + h / 2}" r="6" fill="${PEACH}"/>${ball(x, y + h / 2, 7, "fx-ball-peach")}`;
        g += `<text x="${x + (right ? 10 : -10)}" y="${y + h + 26}" text-anchor="${right ? "start" : "end"}" style="font-family:var(--font-body);font-style:italic;font-weight:600;font-size:19px" fill="#FFB575">${esc(gene)}</text>`;
        g += `<text x="${x + (right ? 10 : -10)}" y="${y + h + 43}" text-anchor="${right ? "start" : "end"}" style="font-family:var(--font-body);font-size:12px" fill="rgba(255,255,255,.8)">${esc(band)}</text>`;
      }
      y += h + (hasHero ? 84 : 26);
    });
    return `<svg class="anim" width="${W}" height="${f1(y - 26)}" viewBox="0 0 ${W} ${f1(y - 26)}" role="img" aria-label="${esc(t.chromosome + " " + d.chr)}">${g}</svg>`;
  }

  /* ---------- Тексти графіків днів 1–5 ---------- */
  const TXT = {
    folate: {
      uk: { title: "Той самий раціон, три генотипи", sub: "Оберіть генотип за варіантом C677T і подивіться, як змінюється рівень фолату в еритроцитах за однакового споживання.",
        g: [["CC", "без варіанта"], ["CT", "одна копія"], ["TT", "дві копії"]], group: "Генотип",
        food: "Фолат із їжі", enzyme: "фермент MTHFR", active: "активна форма", tank: "Фолат в еритроцитах", ref: "рівень без варіанта",
        read: ["Точка відліку: середній рівень фолату в людей без варіанта.", "Одна копія: у середньому на 8% менше фолату в еритроцитах.", "Дві копії: у середньому на 16% менше. Фермент працює повільніше, але фолат усе одно переробляє."],
        dist: "Генотипи в європейській вибірці",
        src: "Потік на схемі умовний. Числа: середня різниця рівня фолату в еритроцитах у здорових жінок 12–49 років (метааналіз, мікробіологічний метод). Джерела: Tsang et al., 2015{3}; 1000 Genomes Project, фаза 3 (503 людини){4}." },
      en: { title: "Same diet, three genotypes", sub: "Pick a genotype for the C677T variant and see how red-cell folate changes at the same intake.",
        g: [["CC", "no variant"], ["CT", "one copy"], ["TT", "two copies"]], group: "Genotype",
        food: "Folate from food", enzyme: "MTHFR enzyme", active: "active form", tank: "Red-cell folate", ref: "level without the variant",
        read: ["The reference point: average folate in people without the variant.", "One copy: on average 8% less folate in red blood cells.", "Two copies: on average 16% less. The enzyme works more slowly but still processes folate."],
        dist: "Genotypes in a European sample",
        src: "The flow in the diagram is schematic. Numbers: mean difference in red-cell folate among healthy women aged 12–49 (meta-analysis, microbiological assay). Sources: Tsang et al., 2015{3}; 1000 Genomes Project, phase 3 (503 people){4}." }
    },
    fusion: {
      uk: { title: "Як із двох хромосом вийшла одна", sub: "У шимпанзе, горили й орангутана 24 пари хромосом. У предків людини дві хромосоми з’єдналися кінцями.",
        apes: ["24 пари", "людиноподібні мавпи"], human: ["23 пари", "людина"], group: "Вид",
        tel: "теломери: кінці хромосом", cen: "центромера", scar: "місце злиття: теломерні повтори посеред хромосоми, 2q13", old: "колишня центромера, тепер неактивна", hum2: "хромосома 2 людини",
        src: "Схема; довжини частин відповідають ділянкам хромосоми 2 людини. Джерела: IJdo et al., PNAS, 1991{2}; Hillier et al., Nature, 2005{3}." },
      en: { title: "How two chromosomes became one", sub: "Chimpanzees, gorillas and orangutans have 24 pairs of chromosomes. In human ancestors two chromosomes joined end to end.",
        apes: ["24 pairs", "great apes"], human: ["23 pairs", "humans"], group: "Species",
        tel: "telomeres: chromosome ends", cen: "centromere", scar: "fusion site: telomere repeats mid-chromosome, 2q13", old: "former centromere, now inactive", hum2: "human chromosome 2",
        src: "Schematic; segment lengths match the regions of human chromosome 2. Sources: IJdo et al., PNAS, 1991{2}; Hillier et al., Nature, 2005{3}." }
    },
    lactase: {
      uk: { title: "Де поширений варіант C/T−13910", sub: "Частка людей у вибірці, які мають хоча б одну копію варіанта. Торкніться склянки, щоб побачити деталі.",
        tabs: ["Європа", "Світ"], group: "Регіон",
        eu: ["Північно-західна Європа", "Британія", "Фінляндія", "Іспанія", "Тоскана, Італія"], world: ["Європа", "Америка", "Південна Азія", "Африка", "Східна Азія"],
        detail: (n, c, a) => `${n}: ${c} людей у вибірці, варіант на ${a}% хромосом.`,
        note: "У Східній Африці ту саму здатність дають інші варіанти цієї ділянки, тому низький рівень на графіку не означає, що молоко там не перетравлюють.",
        src: "Північно-західна Європа: нащадки вихідців із цього регіону, штат Юта. Джерела: 1000 Genomes Project, фаза 3 (через Ensembl){5}; Enattah et al., 2002{4}; Tishkoff et al., 2007{6}." },
      en: { title: "Where the C/T−13910 variant is common", sub: "Share of people in each sample who carry at least one copy of the variant. Tap a glass for details.",
        tabs: ["Europe", "World"], group: "Region",
        eu: ["North-west Europe", "Britain", "Finland", "Spain", "Tuscany, Italy"], world: ["Europe", "Americas", "South Asia", "Africa", "East Asia"],
        detail: (n, c, a) => `${n}: ${c} people sampled, variant on ${a}% of chromosomes.`,
        note: "In East Africa other variants in the same region give the same ability, so a low level here does not mean milk is not digested there.",
        src: "North-west Europe: Utah residents with ancestry from that region. Sources: 1000 Genomes Project, phase 3 (via Ensembl){5}; Enattah et al., 2002{4}; Tishkoff et al., 2007{6}." }
    },
    dpp: {
      uk: { title: "Ген і спосіб життя: масштаб ефекту", sub: "Програма профілактики діабету: 3 234 людини з високим ризиком, три групи. Оберіть групу.",
        arms: ["Плацебо", "Метформін", "Спосіб життя"], group: "Група дослідження",
        unit: "нових випадків діабету на 100 людей за рік", vs: "порівняно з плацебо",
        notes: ["Група порівняння.", "Ліки призначали в межах дослідження.", "Цілі групи: мінус 7% маси тіла і щонайменше 150 хвилин руху на тиждень."],
        scale: "Масштаб ефекту", gene: "Варіант Pro12Ala", geneV: "+25%", life: "Зміна способу життя", lifeV: "−58%", zero: "без змін",
        cap: "Варіант гена: різниця між носіями в дослідженнях асоціацій. Спосіб життя: рандомізоване дослідження серед людей із високим ризиком. Групи різні, тож порівнюємо лише масштаб.",
        src: "Джерела: Knowler et al., New England Journal of Medicine, 2002{4}; Altshuler et al., Nature Genetics, 2000{3}." },
      en: { title: "Gene and lifestyle: the scale of effect", sub: "The Diabetes Prevention Program: 3,234 people at high risk, three groups. Pick a group.",
        arms: ["Placebo", "Metformin", "Lifestyle"], group: "Study group",
        unit: "new cases of diabetes per 100 people per year", vs: "versus placebo",
        notes: ["The comparison group.", "The drug was given as part of the trial.", "Group goals: 7% weight loss and at least 150 minutes of activity a week."],
        scale: "Scale of effect", gene: "Pro12Ala variant", geneV: "+25%", life: "Lifestyle change", lifeV: "−58%", zero: "no change",
        cap: "Gene variant: the difference between carriers in association studies. Lifestyle: a randomised trial in people at high risk. The groups differ, so only the scale is compared.",
        src: "Sources: Knowler et al., New England Journal of Medicine, 2002{4}; Altshuler et al., Nature Genetics, 2000{3}." }
    },
    clock: {
      uk: { title: "Доба всередині клітини", sub: "Перетягніть стрілку по колу або натисніть «Пуск», щоб пройти один оберт молекулярного годинника.",
        play: "Пуск", pause: "Пауза", a: "CLOCK–BMAL1: зчитування генів PER і CRY", p: "Білки PER і CRY", hand: "Час доби",
        ph: [["ранок", "CLOCK і BMAL1 запускають зчитування генів PER і CRY."], ["день", "Зчитування на піку, білки PER і CRY накопичуються."], ["вечір", "Білків PER і CRY найбільше: вони гальмують CLOCK–BMAL1."], ["ніч", "PER і CRY руйнуються, гальмо слабшає. Цикл починається знову."]],
        tiles: [["24 год 11 хв", "середній власний період годинника людини; світло щодня підводить його до 24 годин{7}{10}"], ["43%", "генів, що кодують білки, мають добовий ритм хоча б в одному з 12 органів миші{8}"]],
        src: "Схема для однієї клітини; години орієнтовні й відрізняються між тканинами. Джерела: Takahashi, Nature Reviews Genetics, 2017{2}; Czeisler et al., Science, 1999{7}; Zhang et al., PNAS, 2014{8}." },
      en: { title: "A day inside the cell", sub: "Drag the hand around the dial or press Play to go once round the molecular clock.",
        play: "Play", pause: "Pause", a: "CLOCK–BMAL1: reading of the PER and CRY genes", p: "PER and CRY proteins", hand: "Time of day",
        ph: [["morning", "CLOCK and BMAL1 start the reading of the PER and CRY genes."], ["day", "Reading peaks; PER and CRY proteins build up."], ["evening", "PER and CRY proteins are at their highest: they hold CLOCK–BMAL1 back."], ["night", "PER and CRY break down, the brake eases. The cycle starts again."]],
        tiles: [["24 h 11 min", "the average intrinsic period of the human clock; daylight resets it to 24 hours each day{7}{10}"], ["43%", "of protein-coding genes follow a daily rhythm in at least one of 12 mouse organs{8}"]],
        src: "A schematic for a single cell; the hours are approximate and differ between tissues. Sources: Takahashi, Nature Reviews Genetics, 2017{2}; Czeisler et al., Science, 1999{7}; Zhang et al., PNAS, 2014{8}." }
    },
    telomere: {
      uk: { title: "Лічильник поділів", sub: "Пересувайте повзунок: із кожним поділом кінці хромосоми коротшають. Увімкніть теломеразу й порівняйте.",
        div: "Поділи клітини", play: "Пуск", pause: "Пауза", again: "Спочатку", tel: "Теломераза",
        lost: (kb) => `теломери коротші приблизно на ${kb} тис. пар нуклеотидів`, full: "теломери повної довжини", kept: "теломераза добудовує повтори: довжина тримається",
        end: "У цій схемі запас повторів вичерпано: клітина з критично короткими теломерами припиняє ділитися.",
        on: "У сперматозоїдах теломери з віком донора не коротшали, що вказує на роботу теломерази в статевих клітинах.",
        tiles: [["TTAGGG", "шість літер, що повторюються на кінцях кожної хромосоми{9}"], ["≈ 10 поділів", "додавала кожна тисяча пар нуклеотидів початкової довжини теломер (клітини 31 донора){8}"]],
        src: "Схема: один сегмент відповідає п’яти поділам. Джерело розрахунку: Allsopp et al., PNAS, 1992{8} (фібробласти в культурі)." },
      en: { title: "The division counter", sub: "Move the slider: with every division the chromosome ends get shorter. Switch telomerase on and compare.",
        div: "Cell divisions", play: "Play", pause: "Pause", again: "Restart", tel: "Telomerase",
        lost: (kb) => `telomeres shorter by about ${kb} thousand base pairs`, full: "telomeres at full length", kept: "telomerase adds repeats back: length holds",
        end: "In this schematic the repeats have run out: a cell with critically short telomeres stops dividing.",
        on: "In sperm, telomeres did not shorten with the donor’s age, which points to telomerase at work in germ cells.",
        tiles: [["TTAGGG", "six letters repeated at the ends of every chromosome{9}"], ["≈ 10 divisions", "gained for every thousand base pairs of starting telomere length (cells from 31 donors){8}"]],
        src: "Schematic: one segment stands for five divisions. Basis for the estimate: Allsopp et al., PNAS, 1992{8} (fibroblasts in culture)." }
    }
  };
  const UI = {
    uk: { flip: "Натисніть на картку, щоб перевернути її." },
    en: { flip: "Click a card to turn it over." }
  };
  const tiles = (arr) => `<div class="viz-tiles">${arr.map((x) => `<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join("")}</div>`;
  const playIcon = `<svg viewBox="0 0 16 16" aria-hidden="true"><path class="i-play" d="M5 3.2v9.6L12.6 8z" fill="currentColor"/><path class="i-pause" d="M4.5 3h2.6v10H4.5zM8.9 3h2.6v10H8.9z" fill="currentColor"/></svg>`;

  /* ---------- 1. MTHFR: той самий раціон, три генотипи ---------- */
  function folate(stage, t, lang, W) {
    const H = 214, LEVEL = [100, 92, 84], SPEED = [1, 0.8, 0.62], SHARE = [40.6, 45.9, 13.5], N = 16;
    const sx = 36, ex = Math.round(W * 0.43), cy = 104, er = 27, rx = er + 13, ryR = rx * 0.34;
    const tw = 58, tx = W - tw - 14, ry = 9, yT = 42, yB = 178, hh = yB - yT, cxT = tx + tw / 2;
    let dots = "";
    for (let i = 0; i < N; i++) dots += `<circle class="fl-dot" r="4.2"/>`;
    stage.innerHTML = `
      <div class="seg3" role="group" aria-label="${t.group}">${t.g.map((g, i) => `<button type="button" aria-pressed="${i === 0}"><b>${g[0]}</b><small>${g[1]}</small></button>`).join("")}</div>
      <svg class="fl fx-scene" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(t.title)}">
        ${sh(sx, cy + 32, 22, 5)}${sh(ex, cy + er + 12, er, 6)}${sh(cxT, yB + ry + 8, tw * 0.55, 6, 0.26)}
        ${tube(sx, cy - 7, tx - sx + 8, 14, "fx-tube-ice")}
        <path class="fl-ring" d="M${ex - rx},${cy} A${rx},${f1(ryR)} 0 0 1 ${ex + rx},${cy}"/>
        <g class="fl-dots">${dots}</g>
        ${ball(sx, cy, 24, "fx-ball-green")}
        <path d="M${sx - 9},${cy + 7} C${sx - 10},${cy - 7} ${sx + 2},${cy - 12} ${sx + 10},${cy - 10} C${sx + 11},${cy + 2} ${sx + 3},${cy + 10} ${sx - 9},${cy + 7} Z M${sx - 9},${cy + 8} L${sx + 5},${cy - 5}" fill="#fff" fill-opacity=".85" stroke="#2F7D48" stroke-width="1.2" stroke-linejoin="round"/>
        <text class="vz-lab" x="${sx - 24}" y="${cy + 52}">${t.food}</text>
        ${ball(ex, cy, er, "fx-ball")}
        <text x="${ex}" y="${cy + 5}" text-anchor="middle" style="font-family:var(--font-body);font-style:italic;font-weight:700;font-size:13.5px" fill="#fff">MTHFR</text>
        <path class="fl-ring" d="M${ex - rx},${cy} A${rx},${f1(ryR)} 0 0 0 ${ex + rx},${cy}"/>
        <text class="vz-lab" x="${ex}" y="${cy + er + 36}" text-anchor="middle">${t.enzyme}</text>
        <text class="vz-lab vz-peach" x="${f1((ex + rx + tx) / 2)}" y="${cy - 18}" text-anchor="middle">${t.active}</text>
        <path d="M${tx},${yT} V${yB} A${tw / 2},${ry} 0 0 0 ${tx + tw},${yB} V${yT}" fill="url(#fx-cyl-glass)" stroke="#9DBBCB" stroke-width="1.4"/>
        <path class="fl-liq" fill="url(#fx-cyl-peach)"/>
        <ellipse class="fl-top" cx="${cxT}" rx="${tw / 2 - 2.5}" ry="${ry - 1.5}" fill="#FFD9B3"/>
        <ellipse cx="${cxT}" cy="${yT}" rx="${tw / 2}" ry="${ry}" fill="rgba(255,255,255,.35)" stroke="#9DBBCB" stroke-width="1.4"/>
        <rect x="${tx + 6}" y="${yT + 12}" width="4" height="${hh - 26}" rx="2" fill="#fff" opacity=".55"/>
        <line x1="${tx - 8}" x2="${tx + tw + 6}" y1="${f1(yB - hh * 0.86)}" y2="${f1(yB - hh * 0.86)}" stroke="${NAVY}" stroke-width="1.2" stroke-dasharray="3 3"/>
        <text class="vz-lab" x="${tx - 12}" y="${f1(yB - hh * 0.86 + 4)}" text-anchor="end">${t.ref}</text>
        <text class="fl-val" x="${cxT}" y="${yT - 16}" text-anchor="middle">100%</text>
        <text class="vz-lab" x="${tx + tw + 6}" y="${yB + ry + 24}" text-anchor="end">${t.tank}</text>
      </svg>
      <p class="viz-read" aria-live="polite"></p>
      <div class="fl-dist"><span>${t.dist}</span><div class="fl-bar">${SHARE.map((s, i) => `<i style="flex:${s}" data-i="${i}"></i>`).join("")}</div><div class="fl-keys">${SHARE.map((s, i) => `<button type="button" data-i="${i}"><b>${t.g[i][0]}</b> ${nf(s, 1, lang)}%</button>`).join("")}</div></div>`;
    const liq = stage.querySelector(".fl-liq"), top = stage.querySelector(".fl-top"), val = stage.querySelector(".fl-val"), read = stage.querySelector(".viz-read");
    const rings = Array.from(stage.querySelectorAll(".fl-ring")), circles = Array.from(stage.querySelectorAll(".fl-dot"));
    const bars = Array.from(stage.querySelectorAll(".fl-bar i")), keys = Array.from(stage.querySelectorAll(".fl-keys button"));
    let g = 0, cur = 100, stopNum = () => {}, raf = 0, last = 0, ph = circles.map((_, i) => i / N), off = 0;
    const level = (v) => {
      const yL = yB - hh * 0.86 * v / 100;
      liq.setAttribute("d", `M${tx + 2.5},${f1(yL)} V${yB} A${tw / 2 - 2.5},${ry - 1.5} 0 0 0 ${tx + tw - 2.5},${yB} V${f1(yL)} Z`);
      top.setAttribute("cy", f1(yL)); val.textContent = Math.round(v) + "%";
    };
    const place = () => {
      circles.forEach((c, i) => {
        const p = ph[i], x = sx + 26 + p * (tx - sx - 26), after = x > ex;
        const hide = (x > ex - er - 2 && x < ex + er + 2) || (after && g === 2 && i % 4 === 0) || (after && g === 1 && i % 8 === 0);
        c.setAttribute("cx", f1(x)); c.setAttribute("cy", f1(cy + Math.sin(p * 18 + i) * 2.5));
        c.setAttribute("fill", after ? "url(#fx-ball-peach)" : "url(#fx-ball-green)"); c.setAttribute("opacity", hide ? 0 : 1);
      });
      rings.forEach((r) => r.setAttribute("stroke-dashoffset", f1(off)));
    };
    const frame = (ts) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(60, ts - (last || ts)); last = ts;
      ph = ph.map((p) => (p + dt * 0.00011 * SPEED[g]) % 1); off = (off - dt * 0.03 * SPEED[g]) % 17;
      place();
    };
    const set = (i) => {
      g = i;
      stopNum(); stopNum = tween(cur, LEVEL[i], 700, (v) => { cur = v; level(v); });
      read.textContent = t.read[i];
      bars.forEach((b, k) => b.classList.toggle("on", k === i));
      keys.forEach((b, k) => b.classList.toggle("on", k === i));
    };
    const pick = seg(stage, ".seg3 button", set);
    keys.forEach((b, k) => b.addEventListener("click", () => pick(k)));
    level(100); set(0); place();
    if (!reduce) raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); stopNum(); };
  }

  /* ---------- 2а. Хромосома 2: злиття ---------- */
  function fusion(stage, t, lang, W) {
    const H = 134, gap = 30, x0 = 16, L = W - 2 * x0 - gap, la = L * 113.6 / 242.19, lb = L - la, y = 46, h = 26, r = h / 2, cap = 10;
    const rod = (x, len, cf, cls) => {
      const xc = x + len * cf, a = Math.max(x + r, xc - 8), b = Math.min(x + len - r, xc + 8);
      return `<path class="${cls}" d="M${f1(x + r)},${y} L${f1(a)},${y} Q${f1(xc)},${y + 6} ${f1(b)},${y} L${f1(x + len - r)},${y} a${r},${r} 0 0 1 0,${h} L${f1(b)},${y + h} Q${f1(xc)},${y + h - 6} ${f1(a)},${y + h} L${f1(x + r)},${y + h} a${r},${r} 0 0 1 0,${-h} Z"/>`
        + `<rect x="${f1(x + r)}" y="${y + 4}" width="${f1(Math.max(0, a - x - r - 4))}" height="3.2" rx="1.6" fill="#fff" opacity=".5"/><rect x="${f1(b + 4)}" y="${y + 4}" width="${f1(Math.max(0, x + len - r - b - 4))}" height="3.2" rx="1.6" fill="#fff" opacity=".5"/>`;
    };
    const capL = (x) => `<path d="M${f1(x + cap)},${y} L${f1(x + r)},${y} a${r},${r} 0 0 0 0,${h} L${f1(x + cap)},${y + h} Z"/>`;
    const capR = (x) => `<path d="M${f1(x - cap)},${y} L${f1(x - r)},${y} a${r},${r} 0 0 1 0,${h} L${f1(x - cap)},${y + h} Z"/>`;
    const bx = x0 + la + gap, oldCen = 0.15, lct = (135.85 - 113.6) / 128.59;
    stage.innerHTML = `
      <div class="seg3 two" role="group" aria-label="${t.group}"><button type="button" aria-pressed="true"><b>${t.apes[0]}</b><small>${t.apes[1]}</small></button><button type="button" aria-pressed="false"><b>${t.human[0]}</b><small>${t.human[1]}</small></button></div>
      <svg class="fu fx-scene" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(t.title)}">
        ${sh(W / 2, y + h + 9, W * 0.44, 6, 0.2)}
        <g class="fu-a">
          ${rod(x0, la, 93.9 / 113.6, "fu-rod")}
          <g class="fu-tel">${capL(x0)}</g><g class="fu-tel fu-in">${capR(x0 + la)}</g>
          <text class="fu-name" x="${f1(x0 + la / 2)}" y="${y - 12}" text-anchor="middle">2A</text>
          <text class="vz-lab" x="${f1(x0 + la * 93.9 / 113.6)}" y="${y + h + 22}" text-anchor="middle">${t.cen}</text>
        </g>
        <g class="fu-b">
          ${rod(bx, lb, oldCen, "fu-rod")}
          <rect class="fu-smooth" x="${f1(bx + lb * oldCen - 10)}" y="${y}" width="20" height="${h}" fill="url(#fx-tube)"/>
          <g class="fu-tel fu-in">${capL(bx)}</g><g class="fu-tel">${capR(bx + lb)}</g>
          <text class="fu-name" x="${f1(bx + lb / 2)}" y="${y - 12}" text-anchor="middle">2B</text>
          <g class="fu-lct"><line x1="${f1(bx + lb * lct)}" x2="${f1(bx + lb * lct)}" y1="${y - 6}" y2="${y + h + 4}" stroke="${PEACH}" stroke-width="2"/>${ball(bx + lb * lct, y + h / 2, 6, "fx-ball-peach")}<text x="${f1(bx + lb * lct + 9)}" y="${y - 10}" style="font-family:var(--font-body);font-style:italic;font-weight:700;font-size:13px" fill="#B4541A">LCT</text></g>
        </g>
        <g class="fu-join"><rect x="${f1(W / 2 - r - 2)}" y="${y}" width="${f1(2 * r + 4)}" height="${h}" fill="url(#fx-tube)"/><path d="M${f1(W / 2 - r - 2)},${y} h${f1(2 * r + 4)} M${f1(W / 2 - r - 2)},${y + h} h${f1(2 * r + 4)}" stroke="rgba(11,37,50,.28)" stroke-width="1" fill="none"/><rect x="${f1(W / 2 - r - 2)}" y="${y + 4}" width="${f1(2 * r + 4)}" height="3.2" fill="#fff" opacity=".5"/><rect x="${f1(W / 2 - 3)}" y="${y}" width="6" height="${h}" fill="url(#fx-tube-peach)" stroke="#B95A1B" stroke-width="1"/></g>
        <text class="fu-h2" x="${W / 2}" y="${y - 28}" text-anchor="middle">${t.hum2}</text>
      </svg>
      <ul class="fu-leg"><li><i class="k-tel"></i>${t.tel}</li><li class="fu-only-h"><i class="k-scar"></i>${t.scar}</li><li class="fu-only-h"><i class="k-old"></i>${t.old}</li></ul>`;
    stage.querySelector(".fu").style.setProperty("--shift", f1(gap / 2) + "px");
    const set = (i) => stage.classList.toggle("is-human", i === 1);
    const pick = seg(stage, ".seg3 button", set);
    set(0);
    const timer = setTimeout(() => pick(1), reduce ? 0 : 1100);
    return () => clearTimeout(timer);
  }

  /* ---------- 2б. Лактаза: скляні склянки ---------- */
  function lactase(stage, t, lang) {
    const DATA = [
      [[92.9, 99, 73.7], [90.1, 91, 72.0], [85.9, 99, 59.1], [68.2, 107, 45.8], [15.9, 107, 8.9]],
      [[69.4, 503, 50.8], [36.9, 347, 21.6], [20.9, 489, 11.3], [4.8, 661, 2.7], [0, 504, 0]]
    ];
    const xl = (y) => 5 + (y - 10) / 86 * 7;
    const glass = `<svg viewBox="0 0 60 104" aria-hidden="true">
        <ellipse cx="30" cy="100" rx="20" ry="3.4" fill="#04121A" opacity=".5"/>
        <path d="M5,10 L12,96 A18,4 0 0 0 48,96 L55,10 Z" fill="rgba(255,255,255,.1)"/>
        <path class="lc-m" fill="url(#fx-milk)"/><ellipse class="lc-s" cx="30" ry="4" fill="#FFFFFF"/>
        <path class="lc-rim" d="M5,10 L12,96 A18,4 0 0 0 48,96 L55,10"/><ellipse class="lc-rim" cx="30" cy="10" rx="25" ry="5"/>
        <path d="M11,20 L16,86" stroke="#fff" stroke-width="2.6" opacity=".4" stroke-linecap="round"/>
      </svg>`;
    stage.innerHTML = `
      <div class="seg3 two" role="group" aria-label="${t.group}">${t.tabs.map((x, i) => `<button type="button" aria-pressed="${i === 0}"><b>${x}</b></button>`).join("")}</div>
      <div class="lc-panel"><div class="lc-row">${[0, 1, 2, 3, 4].map((i) => `<button type="button" class="lc-item" data-i="${i}"><b class="lc-val">0%</b>${glass}<span class="lc-name"></span></button>`).join("")}</div></div>
      <p class="viz-read" aria-live="polite"></p>
      <p class="viz-note lc-note" hidden>${t.note}</p>`;
    const items = Array.from(stage.querySelectorAll(".lc-item")), read = stage.querySelector(".viz-read"), note = stage.querySelector(".lc-note");
    const curP = [0, 0, 0, 0, 0];
    let tab = 0, stops = [];
    const names = () => (tab === 0 ? t.eu : t.world);
    const pour = (el, p) => {
      const yL = 96 - (p / 100) * 80, l = xl(yL), r = 60 - l, s = el.querySelector(".lc-s");
      el.querySelector(".lc-m").setAttribute("d", `M${f1(l)},${f1(yL)} L12,96 A18,4 0 0 0 48,96 L${f1(r)},${f1(yL)} Z`);
      s.setAttribute("cy", f1(yL)); s.setAttribute("rx", f1((r - l) / 2)); s.setAttribute("opacity", p < 0.5 ? 0 : 1);
      el.querySelector(".lc-val").textContent = Math.round(p) + "%";
    };
    const show = (i) => { items.forEach((el, k) => el.classList.toggle("on", k === i)); const d = DATA[tab][i]; read.textContent = t.detail(names()[i], nf(d[1], 0, lang), nf(d[2], 0, lang)); };
    const set = (k) => {
      tab = k; stops.forEach((s) => s()); stops = [];
      items.forEach((el, i) => {
        el.querySelector(".lc-name").textContent = names()[i];
        stops.push(tween(curP[i], DATA[k][i][0], 900 + i * 80, (v) => { curP[i] = v; pour(el, v); }));
      });
      note.hidden = k !== 1;
      show(0);
    };
    seg(stage, ".seg3 button", set);
    items.forEach((el, i) => { pour(el, 0); el.addEventListener("click", () => show(i)); });
    const timer = setTimeout(() => set(0), 60);
    return () => { clearTimeout(timer); stops.forEach((s) => s()); };
  }

  /* ---------- 3. PPARG: програма профілактики діабету ---------- */
  function dpp(stage, t, lang, W) {
    const RATE = [11.0, 7.8, 4.8], CASES = [11, 8, 5], CUT = ["", "−31%", "−58%"];
    const cols = W >= 480 ? 25 : 20, rows = 100 / cols, cw = W / cols, ch = Math.min(28, cw * 1.3), sc = Math.min(1.05, cw / 19);
    let people = "";
    for (let i = 0; i < 100; i++) {
      const cx = (i % cols) * cw + cw / 2, cy = Math.floor(i / cols) * ch + ch / 2;
      people += `<g class="dp-p" style="--i:${i}" transform="translate(${f1(cx)} ${f1(cy)}) scale(${Math.round(sc * 100) / 100})"><ellipse cx="0" cy="9.4" rx="6" ry="1.6" fill="${NAVY}" opacity=".14"/><path d="M-5.6,8.6 v-3.4 a5.6,5.6 0 0 1 11.2,0 V8.6 Z"/><circle cy="-6" r="4"/></g>`;
    }
    stage.innerHTML = `
      <div class="seg3" role="group" aria-label="${t.group}">${t.arms.map((a, i) => `<button type="button" aria-pressed="${i === 0}"><b>${a}</b></button>`).join("")}</div>
      <div class="dp-read"><b class="dp-num">11,0</b><span>${t.unit}</span><em class="dp-cut" hidden></em></div>
      <svg class="dp fx-scene" width="${W}" height="${f1(rows * ch)}" viewBox="0 0 ${W} ${f1(rows * ch)}" role="img" aria-label="${esc(t.unit)}">${people}</svg>
      <p class="viz-read" aria-live="polite"></p>
      <div class="dp-scale"><h4>${t.scale}</h4>
        <div class="dp-row"><span class="dp-lab">${t.gene}<b>${t.geneV}</b></span><div class="dp-track"><i class="dp-pos" style="--w:25"></i></div></div>
        <div class="dp-row"><span class="dp-lab">${t.life}<b>${t.lifeV}</b></span><div class="dp-track"><i class="dp-neg" style="--w:58"></i></div></div>
        <div class="dp-axis"><span>${t.zero}</span></div>
        <p class="viz-note">${t.cap}</p></div>`;
    const ppl = Array.from(stage.querySelectorAll(".dp-p")), num = stage.querySelector(".dp-num"), cut = stage.querySelector(".dp-cut"), read = stage.querySelector(".viz-read");
    let cur = 11, stop = () => {};
    const set = (i) => {
      ppl.forEach((p, k) => p.classList.toggle("on", k < CASES[i]));
      stop(); stop = tween(cur, RATE[i], 600, (v) => { cur = v; num.textContent = nf(v, 1, lang); });
      cut.hidden = !CUT[i]; cut.textContent = CUT[i] ? CUT[i] + " " + t.vs : "";
      read.textContent = t.notes[i];
    };
    seg(stage, ".seg3 button", set);
    set(0);
    const grow = setTimeout(() => stage.classList.add("is-in"), 80);
    return () => { stop(); clearTimeout(grow); };
  }

  /* ---------- 4. CLOCK: доба всередині клітини ---------- */
  function clock(stage, t, lang, W) {
    const wide = W >= 520, D = wide ? 270 : Math.min(W, 300), c = D / 2, R = c - 24, TAU = Math.PI * 2;
    const act = (h) => 0.5 + 0.5 * Math.cos(TAU * (h - 12) / 24), prot = (h) => 0.5 + 0.5 * Math.cos(TAU * (h - 19) / 24);
    const ang = (h) => TAU * (h - 12) / 24 - Math.PI / 2;          // 12:00 угорі, 00:00 унизу
    const pt = (h, r) => [c + Math.cos(ang(h)) * r, c + Math.sin(ang(h)) * r];
    const polar = (fn, r0, amp) => { let d = ""; for (let i = 0; i <= 96; i++) { const h = i / 4, p = pt(h, r0 + amp * fn(h)); d += (i ? "L" : "M") + f1(p[0]) + "," + f1(p[1]); } return d + "Z"; };
    const rA = R * 0.52, aA = R * 0.3, rP = R * 0.18, aP = R * 0.3;
    let ring = "";
    for (let i = 0; i < 48; i++) {
      const h0 = i / 2, k = 0.5 + 0.5 * Math.cos(TAU * (h0 + 0.25 - 12) / 24);
      const mix = (a, b) => Math.round(a + (b - a) * k), col = `rgb(${mix(13, 255)},${mix(45, 206)},${mix(64, 140)})`;
      const p0 = pt(h0, R), p1 = pt(h0 + 0.52, R);
      ring += `<path d="M${f1(p0[0])},${f1(p0[1])} A${R},${R} 0 0 1 ${f1(p1[0])},${f1(p1[1])}" stroke="${col}" stroke-width="15" fill="none"/>`;
    }
    let marks = "";
    [0, 6, 12, 18].forEach((h) => { const p = pt(h, R + 18); marks += `<text class="ck-h" x="${f1(p[0])}" y="${f1(p[1] + 4)}" text-anchor="middle">${String(h).padStart(2, "0")}</text>`; });
    for (let h = 0; h < 24; h++) { const a = pt(h, R - 11), b = pt(h, R - (h % 6 === 0 ? 18 : 14)); marks += `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="rgba(11,37,50,.3)" stroke-width="${h % 6 === 0 ? 1.6 : 1}"/>`; }
    stage.innerHTML = `
      <div class="ck-wrap${wide ? " wide" : ""}">
        <svg class="ck" width="${D}" height="${D}" viewBox="0 0 ${D} ${D}" role="slider" tabindex="0" aria-label="${t.hand}" aria-valuemin="0" aria-valuemax="24" aria-valuenow="8">
          ${sh(c, D - 2, R * 0.82, 9, 0.28)}
          <circle cx="${c}" cy="${c + 3}" r="${R + 9}" fill="#9DBBCB"/>
          <circle cx="${c}" cy="${c}" r="${R + 9}" fill="url(#fx-dome)" stroke="rgba(11,37,50,.16)"/>
          ${ring}
          <circle cx="${c}" cy="${c}" r="${R - 8}" fill="url(#fx-dome)"/><circle cx="${c}" cy="${c}" r="${R - 8}" fill="none" stroke="rgba(11,37,50,.14)" stroke-width="3"/>
          ${marks}
          <path d="${polar(act, rA, aA)}" fill="rgba(30,101,140,.18)" stroke="${LINK}" stroke-width="2.2"/>
          <path d="${polar(prot, rP, aP)}" fill="rgba(255,157,69,.34)" stroke="#E07B2A" stroke-width="2.2"/>
          <line class="ck-hs" x1="${c + 2}" y1="${c + 3}" x2="${c}" y2="${c}" stroke="${NAVY}" stroke-width="3" stroke-linecap="round" opacity=".18"/>
          <line class="ck-hand" x1="${c}" y1="${c}" x2="${c}" y2="${c}" stroke="${NAVY}" stroke-width="2.6" stroke-linecap="round"/>
          ${ball(0, 0, 6.5, "fx-ball", "ck-da")}${ball(0, 0, 6.5, "fx-ball-peach", "ck-dp")}
          <circle class="ck-ks" r="12" fill="${NAVY}" opacity=".2"/><circle class="ck-knob" r="12" fill="url(#fx-ball-white)" stroke="${NAVY}" stroke-width="2.2"/>
          ${ball(c, c, 6, "fx-ball")}
        </svg>
        <div class="ck-side">
          <div class="ck-time"><b>08:00</b><span></span></div>
          <p class="viz-read" aria-live="polite"></p>
          <div class="ck-bars">
            <div><span><i style="background:${LINK}"></i>${t.a}</span><div class="ck-track"><i class="ck-ba"></i></div></div>
            <div><span><i style="background:#E07B2A"></i>${t.p}</span><div class="ck-track"><i class="ck-bp"></i></div></div>
          </div>
          <button type="button" class="viz-btn ck-play"><span class="ic">${playIcon}</span><span class="tx">${t.play}</span></button>
        </div>
      </div>
      ${tiles(t.tiles)}`;
    const svg = stage.querySelector(".ck"), hand = stage.querySelector(".ck-hand"), hs = stage.querySelector(".ck-hs"), knob = stage.querySelector(".ck-knob"), ks = stage.querySelector(".ck-ks"), da = stage.querySelector(".ck-da"), dp = stage.querySelector(".ck-dp");
    const time = stage.querySelector(".ck-time b"), phName = stage.querySelector(".ck-time span"), read = stage.querySelector(".viz-read"), ba = stage.querySelector(".ck-ba"), bp = stage.querySelector(".ck-bp"), btn = stage.querySelector(".ck-play");
    let h = 8, playing = false, raf = 0, last = 0, lastPh = -1;
    const draw = () => {
      const k = pt(h, R), a = pt(h, rA + aA * act(h)), p = pt(h, rP + aP * prot(h));
      hand.setAttribute("x2", f1(k[0])); hand.setAttribute("y2", f1(k[1])); hs.setAttribute("x2", f1(k[0] + 2)); hs.setAttribute("y2", f1(k[1] + 3));
      knob.setAttribute("cx", f1(k[0])); knob.setAttribute("cy", f1(k[1])); ks.setAttribute("cx", f1(k[0] + 1.5)); ks.setAttribute("cy", f1(k[1] + 3));
      da.setAttribute("cx", f1(a[0])); da.setAttribute("cy", f1(a[1])); dp.setAttribute("cx", f1(p[0])); dp.setAttribute("cy", f1(p[1]));
      const mins = Math.round(h * 60) % 1440;
      time.textContent = String(Math.floor(mins / 60)).padStart(2, "0") + ":" + String(mins % 60).padStart(2, "0");
      ba.style.width = Math.round(act(h) * 100) + "%"; bp.style.width = Math.round(prot(h) * 100) + "%";
      const ph = h >= 5 && h < 11 ? 0 : h >= 11 && h < 17 ? 1 : h >= 17 && h < 23 ? 2 : 3;
      if (ph !== lastPh) { lastPh = ph; phName.textContent = t.ph[ph][0]; read.textContent = t.ph[ph][1]; svg.setAttribute("aria-valuetext", time.textContent + ", " + t.ph[ph][0]); }
      svg.setAttribute("aria-valuenow", f1(h));
    };
    const frame = (ts) => { raf = requestAnimationFrame(frame); const dt = Math.min(60, ts - (last || ts)); last = ts; h = (h + dt * 24 / 14000) % 24; draw(); };
    const setPlay = (on) => { playing = on; btn.classList.toggle("is-on", on); btn.querySelector(".tx").textContent = on ? t.pause : t.play; last = 0; cancelAnimationFrame(raf); if (on) raf = requestAnimationFrame(frame); };
    const fromEvent = (e) => { const r = svg.getBoundingClientRect(), x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2; h = ((Math.atan2(y, x) + Math.PI / 2) / TAU * 24 + 12 + 48) % 24; draw(); };
    let drag = false;
    svg.addEventListener("pointerdown", (e) => { drag = true; setPlay(false); try { svg.setPointerCapture(e.pointerId); } catch (x) { /* старі браузери */ } fromEvent(e); e.preventDefault(); });
    svg.addEventListener("pointermove", (e) => { if (drag) fromEvent(e); });
    const end = () => { drag = false; };
    svg.addEventListener("pointerup", end); svg.addEventListener("pointercancel", end);
    svg.addEventListener("keydown", (e) => { const s = e.key === "ArrowRight" || e.key === "ArrowUp" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowDown" ? -1 : 0; if (s) { e.preventDefault(); e.stopPropagation(); setPlay(false); h = (h + s + 24) % 24; draw(); } });
    btn.addEventListener("click", () => setPlay(!playing));
    draw();
    if (!reduce) setPlay(true);
    return () => cancelAnimationFrame(raf);
  }

  /* ---------- 5. TERT: лічильник поділів ---------- */
  function telomere(stage, t, lang, W) {
    const big = W >= 480, NB = 10, MAX = 50, bw = clamp((W - 150) / (2 * NB) - 2, 5, 15), step = bw + 2, capW = NB * step, y = 36, h = big ? 42 : 30, r = h / 2, H = y + h + 44;
    const bodyX = 6 + capW + 4, bodyW = W - 2 * bodyX, xc = bodyX + bodyW * 0.27, LET = "TTAGGG";
    let beads = "";
    for (let side = 0; side < 2; side++) for (let i = 0; i < NB; i++) {
      const x = side === 0 ? bodyX - 4 - (i + 1) * step + 2 : bodyX + bodyW + 4 + i * step;
      beads += `<g class="tl-bead" data-k="${i}"><rect x="${f1(x)}" y="${y + 2}" width="${f1(bw)}" height="${h - 4}" rx="${f1(Math.min(3, bw / 2))}"/><rect x="${f1(x + 1)}" y="${y + 5}" width="${f1(bw - 2)}" height="2.6" rx="1.3" fill="#fff" opacity=".55"/>${bw >= 8.5 ? `<text x="${f1(x + bw / 2)}" y="${f1(y + h / 2 + (big ? 5 : 4))}" text-anchor="middle" font-size="${big ? 11 : 8.5}">${LET[(side === 0 ? NB - 1 - i : i) % 6]}</text>` : ""}</g>`;
    }
    const a = Math.max(bodyX + r, xc - 9), b = Math.min(bodyX + bodyW - r, xc + 9);
    stage.innerHTML = `
      <svg class="tl fx-scene" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(t.title)}">
        ${sh(W / 2, y + h + 9, W * 0.42, 6, 0.22)}
        <path class="tl-body" d="M${f1(bodyX + r)},${y} L${f1(a)},${y} Q${f1(xc)},${y + 7} ${f1(b)},${y} L${f1(bodyX + bodyW - r)},${y} a${r},${r} 0 0 1 0,${h} L${f1(b)},${y + h} Q${f1(xc)},${y + h - 7} ${f1(a)},${y + h} L${f1(bodyX + r)},${y + h} a${r},${r} 0 0 1 0,${-h} Z"/>
        <rect x="${f1(b + 6)}" y="${y + 5}" width="${f1(Math.max(0, bodyX + bodyW - r - b - 6))}" height="4" rx="2" fill="#fff" opacity=".5"/>
        ${beads}
        <g class="tl-enz"><circle cx="${f1(bodyX - 4 - capW / 2)}" cy="${y - 16}" r="9"/><circle cx="${f1(bodyX + bodyW + 4 + capW / 2)}" cy="${y - 16}" r="9"/><path d="M${f1(bodyX - 4 - capW / 2)},${y - 7} v7 M${f1(bodyX + bodyW + 4 + capW / 2)},${y - 7} v7"/></g>
        <text class="vz-lab tl-state" x="${W / 2}" y="${y + h + 32}" text-anchor="middle"></text>
      </svg>
      <div class="tl-ctl">
        <label class="tl-range"><span>${t.div}: <b class="tl-n">0</b></span><input type="range" min="0" max="${MAX}" step="1" value="0" aria-label="${t.div}"></label>
        <button type="button" class="viz-btn tl-play"><span class="ic">${playIcon}</span><span class="tx">${t.play}</span></button>
        <button type="button" class="tl-switch" role="switch" aria-checked="false"><i></i><span>${t.tel}</span></button>
      </div>
      <p class="viz-read" aria-live="polite"></p>
      ${tiles(t.tiles)}`;
    const range = stage.querySelector("input"), nEl = stage.querySelector(".tl-n"), state = stage.querySelector(".tl-state"), read = stage.querySelector(".viz-read");
    const all = Array.from(stage.querySelectorAll(".tl-bead")), sw = stage.querySelector(".tl-switch"), btn = stage.querySelector(".tl-play");
    let on = false, timer = 0, playing = false;
    const draw = () => {
      const d = +range.value, left = on ? NB : Math.max(0, NB - Math.floor(d / 5)), dead = !on && left === 0;
      all.forEach((el) => el.classList.toggle("gone", +el.dataset.k >= left));
      nEl.textContent = d;
      stage.classList.toggle("is-on", on); stage.classList.toggle("is-dead", dead);
      state.textContent = on ? t.kept : d === 0 ? t.full : t.lost(nf(d / 10, 1, lang));
      read.textContent = on ? t.on : dead ? t.end : "";
    };
    const setPlay = (p) => {
      playing = p; clearInterval(timer); btn.classList.toggle("is-on", p);
      btn.querySelector(".tx").textContent = p ? t.pause : (+range.value >= MAX ? t.again : t.play);
      if (p) { if (+range.value >= MAX) range.value = 0; timer = setInterval(() => { range.value = +range.value + 1; draw(); if (+range.value >= MAX) setPlay(false); }, 150); }
    };
    range.addEventListener("input", () => { setPlay(false); draw(); });
    btn.addEventListener("click", () => setPlay(!playing));
    sw.addEventListener("click", () => { on = !on; sw.setAttribute("aria-checked", String(on)); draw(); });
    draw();
    const auto = setTimeout(() => { if (!reduce) setPlay(true); }, 700);
    return () => { clearTimeout(auto); clearInterval(timer); };
  }

  /* ---------- Шаблон: об’ємні стовпчики (items: [{k, v, t, n}]) ---------- */
  function bars3d(stage, t, lang, W) {
    const n = t.items.length, H = 226, base = 166, maxH = 108, slot = W / n, bw = Math.min(76, slot * 0.46), ry = bw * 0.17, vmax = Math.max.apply(null, t.items.map((x) => x.v));
    let g = sh(W / 2, base + 14, W * 0.44, 9, 0.1);
    t.items.forEach((it, i) => {
      const cx = slot * i + slot / 2, h = Math.max(7, it.v / vmax * maxH), x = cx - bw / 2, y = base - h, ks = String(it.k).split("|");
      g += `<g class="b3" data-i="${i}" style="--i:${i}" tabindex="0" role="button" aria-label="${esc(plain(ks.join(" ") + ": " + it.t))}">
        ${sh(cx, base + 5, bw * 0.62, 6, 0.24)}
        <g class="b3-g"><path class="b3-side" d="M${f1(x)},${f1(y)} V${base} A${f1(bw / 2)},${f1(ry)} 0 0 0 ${f1(x + bw)},${base} V${f1(y)} Z"/><ellipse class="b3-top" cx="${f1(cx)}" cy="${f1(y)}" rx="${f1(bw / 2)}" ry="${f1(ry)}"/><rect x="${f1(x + bw * 0.16)}" y="${f1(y + ry)}" width="${f1(bw * 0.09)}" height="${f1(Math.max(0, h - ry * 1.4))}" rx="2" fill="#fff" opacity=".35"/></g>
        <text class="b3-v" x="${f1(cx)}" y="${f1(y - ry - 8)}">${it.t}</text>
        ${ks.map((s, j) => `<text class="b3-k" x="${f1(cx)}" y="${f1(base + ry + 22 + j * 14)}">${s}</text>`).join("")}
        <rect x="${f1(cx - slot / 2)}" y="0" width="${f1(slot)}" height="${H}" fill="transparent"/></g>`;
    });
    stage.innerHTML = `<svg class="fx-scene" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="group" aria-label="${esc(plain(t.title))}">${g}</svg><p class="viz-read" aria-live="polite"></p>`;
    const bars = Array.from(stage.querySelectorAll(".b3")), read = stage.querySelector(".viz-read");
    const pick = (i) => { bars.forEach((b, k) => b.classList.toggle("on", k === i)); read.innerHTML = t.items[i].n; };
    bars.forEach((b, i) => {
      b.addEventListener("click", () => pick(i));
      b.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(i); } });
    });
    pick(t.pick === undefined ? n - 1 : t.pick);
    const grow = setTimeout(() => stage.classList.add("is-in"), 80);
    return () => clearTimeout(grow);
  }

  /* ---------- Шаблон: частка зі 100 (groups: [{k, s, p, t, l, n}]) ---------- */
  function share(stage, t, lang, W) {
    const cols = W >= 480 ? 25 : 20, rows = 100 / cols, cw = W / cols, r = Math.min(9, cw * 0.4), ch = cw * 1.04;
    let balls = "";
    for (let i = 0; i < 100; i++) balls += `<circle class="sh-b" style="--i:${i}" cx="${f1((i % cols) * cw + cw / 2)}" cy="${f1(Math.floor(i / cols) * ch + ch / 2)}" r="${f1(r)}"/>`;
    const ng = t.groups.length;
    stage.innerHTML = `
      <div class="seg3${ng === 1 ? " one" : ng === 2 ? " two" : ""}" role="group">${t.groups.map((x, i) => `<button type="button" aria-pressed="${i === 0}"><b>${x.k}</b>${x.s ? `<small>${x.s}</small>` : ""}</button>`).join("")}</div>
      <div class="sh-read"><b></b><span></span></div>
      <svg class="fx-scene" width="${W}" height="${f1(rows * ch)}" viewBox="0 0 ${W} ${f1(rows * ch)}" role="img" aria-label="${esc(plain(t.title))}">${balls}</svg>
      <p class="viz-read" aria-live="polite"></p>`;
    const all = Array.from(stage.querySelectorAll(".sh-b")), big = stage.querySelector(".sh-read b"), lab = stage.querySelector(".sh-read span"), read = stage.querySelector(".viz-read");
    const set = (i) => {
      const x = t.groups[i];
      all.forEach((b, k) => b.classList.toggle("on", k < Math.round(x.p)));
      big.textContent = x.t; lab.textContent = x.l; read.innerHTML = x.n;
    };
    seg(stage, ".seg3 button", set);
    set(0);
    return () => {};
  }

  /* ---------- Шаблон: два алелі → група крові ---------- */
  function picker(stage, t) {
    const AL = ["A", "B", "O"], sel = [0, 2];
    const row = (i) => `<div class="pk-row"><span>${t.rows[i]}</span><div class="seg3" data-r="${i}" role="group" aria-label="${esc(t.rows[i])}">${AL.map((x, k) => `<button type="button" aria-pressed="${k === sel[i]}"><b>${x}</b></button>`).join("")}</div></div>`;
    stage.innerHTML = `
      <div class="pk"><div class="pk-rows">${row(0)}${row(1)}</div>
        <div class="pk-out"><svg class="fx-scene" width="120" height="136" viewBox="0 0 120 136" role="img">
          ${sh(60, 126, 34, 7, 0.26)}
          <path d="M60,6 C60,6 22,54 22,84 a38,38 0 0 0 76,0 C98,54 60,6 60,6 Z" fill="url(#fx-ball-red)"/>
          <path d="M44,58 C38,70 36,80 38,90" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".45"/>
          <text class="pk-letter" x="60" y="100"></text></svg><small>${t.out}</small></div></div>
      <p class="viz-read" aria-live="polite"></p>`;
    const letter = stage.querySelector(".pk-letter"), read = stage.querySelector(".viz-read"), svg = stage.querySelector("svg");
    const draw = () => {
      const s = [AL[sel[0]], AL[sel[1]]], g = s.includes("A") && s.includes("B") ? "AB" : s.includes("A") ? "A" : s.includes("B") ? "B" : "O";
      letter.textContent = g; svg.setAttribute("aria-label", t.out + ": " + g); read.innerHTML = t.n[g];
    };
    [0, 1].forEach((i) => seg(stage, `[data-r="${i}"] button`, (k) => { sel[i] = k; draw(); }));
    draw();
    return () => {};
  }

  /* ---------- Шаблон: картки-перевертні (cards: [{q, a}]) ---------- */
  function flip(stage, t, lang, W, ui) {
    stage.innerHTML = `<p class="fc-hint">${ui.flip}</p><div class="fc-row">${t.cards.map((c, i) => `<div class="fc" role="button" tabindex="0" aria-pressed="false"><span class="fc-in"><span class="fc-f"><i>${i + 1}</i><b>${c.q}</b></span><span class="fc-b"><span>${c.a}</span></span></span></div>`).join("")}</div>`;
    Array.from(stage.querySelectorAll(".fc")).forEach((el) => {
      const turn = () => el.setAttribute("aria-pressed", String(el.getAttribute("aria-pressed") !== "true"));
      el.addEventListener("click", (e) => { if (!e.target.closest("a")) turn(); });
      el.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && !e.target.closest("a")) { e.preventDefault(); turn(); } });
    });
    return () => {};
  }

  /* ---------- Шаблон: наочна схема роботи білка (kind + три підписи) ----------
     kind: enzyme (фермент), receptor (рецептор на мембрані), tf (білок на ДНК), present (HLA показує пептид),
     structure (білок у м’язовому волокні), hormone (орган → кров → мішень), organelle (мітохондрія з кільцевою ДНК) */
  function mech(stage, t, lang, W, ui, v) {
    const H = 178, cx = W / 2, cy = 88;
    const num = (x, y, n) => `<g class="mh-n"><circle cx="${f1(x)}" cy="${f1(y)}" r="10.5" fill="${NAVY}" stroke="#fff" stroke-width="2"/><text x="${f1(x)}" y="${f1(y + 4)}" text-anchor="middle">${n}</text></g>`;
    let g = "";
    const kind = v.kind;
    if (kind === "enzyme") {
      const dx = cx - 108, dx2 = W - cx - 104;
      g = `${sh(cx, cy + 46, 46, 7, 0.24)}${tube(26, cy - 6, W - 52, 12, "fx-tube-ice")}
        <g class="mh-sub" style="--dx:${f1(dx)}px">${ball(46, cy, 12, "fx-ball-green")}${ball(64, cy - 2, 9.5, "fx-ball-green")}</g>
        <g class="mh-prod" style="--dx:${f1(dx2)}px">${ball(cx + 52, cy - 9, 10, "fx-ball-peach")}${ball(cx + 58, cy + 12, 8.5, "fx-ball-peach")}</g>
        <g class="mh-enz">${ball(cx - 10, cy + 2, 34, "fx-ball")}${ball(cx + 22, cy - 12, 23, "fx-ball")}<path d="M${cx - 30},${cy - 4} q10,-10 22,-4" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none" opacity=".45"/></g>
        ${num(50, cy - 30, 1)}${num(cx + 4, cy - 52, 2)}${num(W - 52, cy - 30, 3)}`;
    } else if (kind === "receptor") {
      let lip = "";
      for (let x = 10; x < W; x += 13) lip += ball(x, 102, 5.4, "fx-ball-ice") + ball(x, 122, 5.4, "fx-ball-ice");
      g = `<rect x="0" y="126" width="${W}" height="${H - 126}" fill="rgba(30,101,140,.07)"/><rect x="0" y="104" width="${W}" height="16" fill="#C9DFEA"/>${lip}
        <path d="M${cx - 15},70 V146 A15,6 0 0 0 ${cx + 15},146 V70 Z" fill="url(#fx-cyl)"/><ellipse cx="${cx}" cy="70" rx="24" ry="8" fill="#BFEAF5" stroke="#2A77A0"/><ellipse cx="${cx}" cy="70" rx="13" ry="4" fill="#1E658C" opacity=".55"/>
        <g class="mh-lig">${ball(cx, 22, 11, "fx-ball-peach")}</g>
        <g class="mh-sig">${ball(cx - 18, 156, 4.5, "fx-ball-peach")}${ball(cx, 166, 4.5, "fx-ball-peach")}${ball(cx + 18, 156, 4.5, "fx-ball-peach")}</g>
        ${num(cx + 34, 26, 1)}${num(cx + 44, 88, 2)}${num(cx + 48, 158, 3)}`;
    } else if (kind === "tf") {
      const y0 = 118, x1 = 16, x2 = W - 16, px = W * 0.36;
      let a = "", b = "", rungs = "";
      for (let x = x1; x <= x2; x += 3) { const k = (x - x1) / 26; a += (x === x1 ? "M" : "L") + f1(x) + "," + f1(y0 + Math.sin(k) * 13); b += (x === x1 ? "M" : "L") + f1(x) + "," + f1(y0 - Math.sin(k) * 13); }
      for (let x = x1 + 6; x < x2; x += 10) { const k = (x - x1) / 26, d = Math.sin(k) * 13; if (Math.abs(d) > 4) rungs += `<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(y0 - d)}" y2="${f1(y0 + d)}" stroke="#9DBBCB" stroke-width="2"/>`; }
      g = `${sh(cx, y0 + 28, W * 0.42, 6, 0.16)}${rungs}<path d="${a}" fill="none" stroke="#2A77A0" stroke-width="5" stroke-linecap="round"/><path d="${b}" fill="none" stroke="#7CC8DE" stroke-width="5" stroke-linecap="round"/>
        <g class="mh-enz">${ball(px, y0 - 24, 27, "fx-ball")}${ball(px + 32, y0 - 20, 19, "fx-ball-peach")}</g>
        <path class="mh-rna" pathLength="100" d="M${f1(px + 56)},${y0 - 22} q14,-26 30,-12 t30,-14 t30,-12 t${f1(Math.max(10, W - px - 190))},-10" fill="none" stroke="${PEACH}" stroke-width="4.5" stroke-linecap="round"/>
        ${num(px - 8, y0 - 64, 1)}${num(W * 0.14, y0 + 34, 2)}${num(W - 40, y0 - 82, 3)}`;
    } else if (kind === "present") {
      g = `<ellipse cx="${cx}" cy="-34" rx="${f1(W * 0.42)}" ry="74" fill="#E3EFF5" stroke="#B9CFDA"/><ellipse cx="${cx}" cy="218" rx="${f1(W * 0.46)}" ry="84" fill="#CFE3EC" stroke="#9DBBCB"/>
        <path d="M${cx - 20},104 V140 h12 V112 q8,8 16,0 V140 h12 V104 q-20,18 -40,0 Z" fill="url(#fx-cyl)"/>
        ${ball(cx, 98, 8.5, "fx-ball-peach")}
        <g class="mh-tcr"><path d="M${cx},40 V62 M${cx},62 l-11,13 M${cx},62 l11,13" stroke="#1E658C" stroke-width="6" stroke-linecap="round" fill="none"/></g>
        ${num(cx + 28, 98, 1)}${num(cx + 40, 128, 2)}${num(cx + 30, 50, 3)}`;
    } else if (kind === "structure") {
      const zl = W * 0.2, zr = W * 0.8, rows = [48, 68, 88, 108, 128];
      let thin = "", act = "", thick = "";
      rows.forEach((y) => {
        thin += `<line x1="${f1(zl)}" x2="${f1(zl + W * 0.22)}" y1="${y}" y2="${y}" stroke="#5FB4CC" stroke-width="3.5" stroke-linecap="round"/><line x1="${f1(zr)}" x2="${f1(zr - W * 0.22)}" y1="${y}" y2="${y}" stroke="#5FB4CC" stroke-width="3.5" stroke-linecap="round"/>`;
        act += ball(zl + 9, y, 5.5, "fx-ball-peach") + ball(zr - 9, y, 5.5, "fx-ball-peach");
      });
      [58, 78, 98, 118].forEach((y) => { thick += `<rect x="${f1(cx - W * 0.17)}" y="${y - 3.5}" width="${f1(W * 0.34)}" height="7" rx="3.5" fill="url(#fx-tube-grey)"/>`; });
      g = `${sh(cx, 150, W * 0.4, 6, 0.16)}${thick}<g class="mh-zl">${thin}</g>
        <rect x="${f1(zl - 5)}" y="36" width="10" height="104" rx="4" fill="url(#fx-cyl)"/><rect x="${f1(zr - 5)}" y="36" width="10" height="104" rx="4" fill="url(#fx-cyl)"/>${act}
        ${num(zl, 22, 1)}${num(zl + 30, 156, 2)}${num(W * 0.36, 30, 3)}`;
    } else if (kind === "hormone") {
      let drops = "";
      for (let i = 0; i < 5; i++) drops += `<circle class="mh-drop" style="--i:${i};--dx:${f1(W - 190)}px" cx="96" cy="${cy + (i % 2 ? 4 : -4)}" r="5.5" fill="url(#fx-ball)"/>`;
      g = `${sh(52, cy + 46, 30, 6, 0.22)}${sh(W - 54, cy + 46, 30, 6, 0.22)}${tube(84, cy - 12, W - 168, 24, "fx-tube-ice")}${drops}
        <path d="M52,${cy - 44} c26,0 38,22 38,44 s-12,44 -38,44 c-12,0 -20,-8 -20,-18 c0,-10 10,-12 10,-26 s-10,-16 -10,-26 c0,-10 8,-18 20,-18 Z" fill="url(#fx-ball-red)"/>
        ${ball(W - 54, cy, 34, "fx-ball-ice")}${ball(W - 50, cy + 2, 12, "fx-ball")}
        ${num(52, cy - 60, 1)}${num(cx, cy - 34, 2)}${num(W - 54, cy - 50, 3)}`;
    } else {                                                        // organelle
      const x0 = 28, w = W - 56, rx = W * 0.36;
      let fold = `M${x0 + 30},${cy + 30}`;
      for (let x = x0 + 30, i = 0; x < x0 + w - 34; x += 22, i++) fold += ` Q${x + 11},${cy + (i % 2 ? 34 : -34)} ${x + 22},${cy + (i % 2 ? -26 : 30)}`;
      g = `${sh(cx, cy + 54, w * 0.44, 7, 0.24)}<rect x="${x0}" y="${cy - 44}" width="${w}" height="88" rx="44" fill="url(#fx-tube-peach)" stroke="#B95A1B"/>
        <rect x="${x0 + 8}" y="${cy - 36}" width="${w - 16}" height="72" rx="36" fill="#FFE9D3" opacity=".55"/>
        <path d="${fold}" fill="none" stroke="#D9772F" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/>
        <circle class="mh-ring" cx="${f1(rx)}" cy="${cy}" r="16" fill="#FFF6EC" stroke="${LINK}" stroke-width="5" stroke-dasharray="6 4"/>
        <g class="mh-atp">${ball(W - 30, cy - 18, 5, "fx-ball-peach")}${ball(W - 22, cy + 2, 6, "fx-ball-peach")}${ball(W - 32, cy + 22, 4.5, "fx-ball-peach")}</g>
        ${num(x0 + 20, cy - 56, 1)}${num(rx, cy - 30, 2)}${num(W - 26, cy - 44, 3)}`;
    }
    stage.innerHTML = `<svg class="fx-scene mh mh-${kind}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(plain(t.title))}">${g}</svg><ol class="mh-leg">${t.items.map((x) => `<li><span>${x}</span></li>`).join("")}</ol>`;
    return () => {};
  }

  /* Хімічна схема (структурні формули, 3D-моделі, рівняння) живе в js/chem.js */
  const chem = (stage, t, lang, W, ui, v) => window.Chem.render(stage, t, lang, W, v);
  /* Практичні 3D-лічильники (келих, чашки) живуть у js/practice.js */
  const drink = (stage, t, lang, W, ui, v) => window.Practice.drink(stage, t, lang, W, v);
  const caffeine = (stage, t, lang, W, ui, v) => window.Practice.caffeine(stage, t, lang, W, v);
  /* 3D-фігура людини «Де це в тілі» живе в js/body.js */
  const where = (stage, t, lang, W, ui, v) => window.Body.where(stage, t, lang, W, v);
  const RENDER = { folate, fusion, lactase, dpp, clock, telomere, bars3d, share, picker, flip, mech, chem, drink, caffeine, where };
  /* Позначки {n} у текстах графіка замінюються посиланнями на джерела дня; без обробника вони просто зникають */
  const strip = (s) => s.replace(/\{\d+\}/g, "");
  const deep = (v, f) => typeof v === "string" ? f(v) : typeof v === "function" ? (...a) => deep(v(...a), f) : Array.isArray(v) ? v.map((x) => deep(x, f)) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x, f)])) : v;
  const texts = (v, lang, mark) => deep(v[lang] || v.uk || (TXT[v.id] && (TXT[v.id][lang] || TXT[v.id].uk)), mark || strip);

  window.Viz = {
    nf, miniChrom, ideogram,
    has: (id) => !!RENDER[id],
    /* v: опис графіка з дня ({id, after, uk?, en?}); k: його номер у списку дня */
    html(v, lang, mark, k) {
      const t = texts(v, lang, mark);
      return `<figure class="viz viz-${v.id}" data-viz="${v.id}" data-k="${k || 0}"><h3>${t.title}</h3>${t.sub ? `<p class="sub">${t.sub}</p>` : ""}<div class="viz-stage"></div>${t.src ? `<figcaption>${t.src}</figcaption>` : ""}</figure>`;
    },
    mount(fig, lang, mark, v) {
      defs();
      const stage = fig.querySelector(".viz-stage"), W = Math.max(260, Math.floor(stage.clientWidth));
      stage.dataset.w = W;
      stage.className = "viz-stage";
      const stop = RENDER[v.id](stage, texts(v, lang, mark), lang, W, UI[lang] || UI.uk, v) || (() => {});
      const untilt = v.id === "clock" ? () => {} : tilt(stage);
      return () => { stop(); untilt(); };
    }
  };
})();
