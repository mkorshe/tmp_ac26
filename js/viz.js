/* «23 пари» · графіка: мініатюри хромосом, портрет хромосоми та інтерактивні графіки днів 1–5.
   Кожен графік: Viz.mount(el, id, lang) повертає функцію, яка зупиняє анімацію. Числа звірено за джерелами, вказаними в підписах. */
(function () {
  "use strict";
  const reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const f1 = (n) => Math.round(n * 10) / 10;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const nf = (n, d, lang) => Number(n).toLocaleString(lang === "en" ? "en-GB" : "uk-UA", { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }).replace(/ /g, " ");
  const PEACH = "#FF9D45", NAVY = "#0B2532", LINK = "#1E658C";

  /* Плавна зміна числа */
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
      if (o.hero && k === 0 && d.pos) g += `<circle cx="${x - 1}" cy="${f1(y + (d.pos / len) * h)}" r="4" fill="${PEACH}" stroke="#fff" stroke-width="1.2"/>`;
    });
    return `<svg viewBox="0 0 ${6 + 2 * w + gap + 4} ${H}" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">${g}</svg>`;
  }
  /* Портрет хромосоми в картці дня. t: підписи потрібною мовою, topicIdx: 2 для української, 3 для англійської */
  function ideogram(d, map, W, t, topicIdx, gene, band) {
    let g = `<defs><linearGradient id="ideoGrad" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#A9E6F3"/><stop offset=".5" stop-color="#5FB4CC"/><stop offset="1" stop-color="#3C8DB6"/></linearGradient></defs>`;
    if (d.chr === "MT") {
      const cx = W / 2, R = Math.min(84, W * 0.22), cy = R + 22;
      g += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="url(#ideoGrad)" stroke-width="22"/>`;
      for (let k = 0; k < 37; k++) { const a = (k / 37) * Math.PI * 2 - Math.PI / 2; g += `<line x1="${f1(cx + Math.cos(a) * (R - 11))}" y1="${f1(cy + Math.sin(a) * (R - 11))}" x2="${f1(cx + Math.cos(a) * (R + 11))}" y2="${f1(cy + Math.sin(a) * (R + 11))}" stroke="${NAVY}" stroke-width="1.8" opacity=".55"/>`; }
      g += `<text x="${cx}" y="${cy + 2}" text-anchor="middle" style="font-family:var(--font-head);font-size:26px;font-weight:300" fill="#fff">${t.mtBp}</text><text x="${cx}" y="${cy + 22}" text-anchor="middle" style="font-family:var(--font-body);font-size:12px" fill="rgba(255,255,255,.8)">${t.bp}</text>`;
      return `<svg class="anim" width="${W}" height="${f1(cy + R + 22)}" viewBox="0 0 ${W} ${f1(cy + R + 22)}" role="img" aria-label="${esc(t.mt)}">${g}</svg>`;
    }
    const tracks = d.chr2 ? [[d.chr, d.len, d.cen, true], [d.chr2, d.len2, d.cen2, false]] : [[d.chr, d.len, d.cen, true]];
    const full = tracks[0][1], h = 30, x0 = 4, usable = W - 8;
    let y = 30;
    tracks.forEach(([name, len, cen, hasHero]) => {
      const w = (len / full) * usable, xc = x0 + (cen / len) * w, r = h / 2, pinch = 7;
      const a = Math.max(x0 + r, xc - 10), b = Math.min(x0 + w - r, xc + 10);
      g += `<text x="${x0}" y="${y - 10}" style="font-family:var(--font-body);font-size:12px" fill="rgba(255,255,255,.8)">${d.chr2 ? name + " · " : ""}${t.pArm}</text>`;
      if (w > 260) g += `<text x="${f1(x0 + w)}" y="${y - 10}" text-anchor="end" style="font-family:var(--font-body);font-size:12px" fill="rgba(255,255,255,.8)">${t.qArm}</text>`;
      g += `<path d="M${x0 + r},${y} L${f1(a)},${y} Q${f1(xc)},${y + pinch} ${f1(b)},${y} L${f1(x0 + w - r)},${y} a${r},${r} 0 0 1 0,${h} L${f1(b)},${y + h} Q${f1(xc)},${y + h - pinch} ${f1(a)},${y + h} L${x0 + r},${y + h} a${r},${r} 0 0 1 0,${-h} Z" fill="url(#ideoGrad)" stroke="rgba(255,255,255,.35)"/>`;
      (map[name] || []).forEach((v, i) => {
        const x = f1(x0 + (v[0] / len) * w);
        g += `<line class="fadein" style="--i:${i * 3}" x1="${x}" x2="${x}" y1="${y + 3}" y2="${y + h - 3}" stroke="${NAVY}" stroke-width="2" opacity=".62"><title>${esc(v[1])}: ${esc(v[topicIdx])}</title></line>`;
      });
      if (hasHero && d.pos) {
        const x = f1(x0 + (d.pos / len) * w), right = x < W / 2;
        g += `<line x1="${x}" x2="${x}" y1="${y - 5}" y2="${y + h + 20}" stroke="${PEACH}" stroke-width="1.8"/>`;
        g += `<circle class="pulse" cx="${x}" cy="${y + h / 2}" r="6" fill="${PEACH}"/><circle cx="${x}" cy="${y + h / 2}" r="6" fill="${PEACH}" stroke="${NAVY}" stroke-width="2.2"/>`;
        g += `<text x="${x + (right ? 9 : -9)}" y="${y + h + 26}" text-anchor="${right ? "start" : "end"}" style="font-family:var(--font-head);font-style:italic;font-weight:600;font-size:19px" fill="#FFB575">${esc(gene)}</text>`;
        g += `<text x="${x + (right ? 9 : -9)}" y="${y + h + 43}" text-anchor="${right ? "start" : "end"}" style="font-family:var(--font-body);font-size:12px" fill="rgba(255,255,255,.8)">${esc(band)}</text>`;
      }
      y += h + (hasHero ? 84 : 26);
    });
    return `<svg class="anim" width="${W}" height="${f1(y - 26)}" viewBox="0 0 ${W} ${f1(y - 26)}" role="img" aria-label="${esc(t.chromosome + " " + d.chr)}">${g}</svg>`;
  }

  /* ---------- Тексти графіків ---------- */
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
      uk: { title: "Де цей варіант поширений", sub: "Частка людей у вибірці, які мають хоча б одну копію варіанта. Торкніться склянки, щоб побачити деталі.",
        tabs: ["Європа", "Світ"], group: "Регіон",
        eu: ["Північно-західна Європа", "Британія", "Фінляндія", "Іспанія", "Тоскана, Італія"], world: ["Європа", "Америка", "Південна Азія", "Африка", "Східна Азія"],
        detail: (n, c, a) => `${n}: ${c} людей у вибірці, варіант на ${a}% хромосом.`,
        note: "У Східній Африці ту саму здатність дають інші варіанти цієї ділянки, тому низький рівень на графіку не означає, що молоко там не перетравлюють.",
        src: "Північно-західна Європа: нащадки вихідців із цього регіону, штат Юта. Джерела: 1000 Genomes Project, фаза 3 (через Ensembl){5}; Enattah et al., 2002{4}; Tishkoff et al., 2007{6}." },
      en: { title: "Where the variant is common", sub: "Share of people in each sample who carry at least one copy of the variant. Tap a glass for details.",
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
        scale: "Масштаб ефекту", gene: "Поширений варіант PPARG", geneV: "+25%", life: "Зміна способу життя", lifeV: "−58%", zero: "без змін",
        cap: "Варіант гена: різниця між носіями в дослідженнях асоціацій. Спосіб життя: рандомізоване дослідження серед людей із високим ризиком. Групи різні, тож порівнюємо лише масштаб.",
        src: "Джерела: Knowler et al., New England Journal of Medicine, 2002{4}; Altshuler et al., Nature Genetics, 2000{3}." },
      en: { title: "Gene and lifestyle: the scale of effect", sub: "The Diabetes Prevention Program: 3,234 people at high risk, three groups. Pick a group.",
        arms: ["Placebo", "Metformin", "Lifestyle"], group: "Study group",
        unit: "new cases of diabetes per 100 people per year", vs: "versus placebo",
        notes: ["The comparison group.", "The drug was given as part of the trial.", "Group goals: 7% weight loss and at least 150 minutes of activity a week."],
        scale: "Scale of effect", gene: "Common PPARG variant", geneV: "+25%", life: "Lifestyle change", lifeV: "−58%", zero: "no change",
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
  const tiles = (arr) => `<div class="viz-tiles">${arr.map((x) => `<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join("")}</div>`;
  const playIcon = `<svg viewBox="0 0 16 16" aria-hidden="true"><path class="i-play" d="M5 3.2v9.6L12.6 8z" fill="currentColor"/><path class="i-pause" d="M4.5 3h2.6v10H4.5zM8.9 3h2.6v10H8.9z" fill="currentColor"/></svg>`;

  /* ---------- 1. MTHFR: той самий раціон, три генотипи ---------- */
  function folate(stage, t, lang, W) {
    const H = 196, LEVEL = [100, 92, 84], SPEED = [1, 0.8, 0.62], SHARE = [40.6, 45.9, 13.5];
    const sx = 34, ex = Math.round(W * 0.43), tw = 54, tx = W - tw - 12, ty = 30, th = 132, cy = 96, er = 30;
    let dots = "";
    const N = 16;
    for (let i = 0; i < N; i++) dots += `<circle class="fl-dot" r="3.4"/>`;
    stage.innerHTML = `
      <div class="seg3" role="group" aria-label="${t.group}">${t.g.map((g, i) => `<button type="button" aria-pressed="${i === 0}"><b>${g[0]}</b><small>${g[1]}</small></button>`).join("")}</div>
      <svg class="fl" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(t.title)}">
        <defs>
          <linearGradient id="flTank" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FFC48C"/><stop offset="1" stop-color="#F08A43"/></linearGradient>
          <clipPath id="flClip"><rect x="${tx}" y="${ty}" width="${tw}" height="${th}" rx="14"/></clipPath>
        </defs>
        <line x1="${sx}" x2="${tx}" y1="${cy}" y2="${cy}" stroke="#D5E6EE" stroke-width="14" stroke-linecap="round"/>
        <g class="fl-dots">${dots}</g>
        <circle cx="${sx}" cy="${cy}" r="24" fill="#E3F3E6" stroke="#5DAE74" stroke-width="2"/>
        <path d="M${sx - 9},${cy + 7} C${sx - 10},${cy - 7} ${sx + 2},${cy - 12} ${sx + 10},${cy - 10} C${sx + 11},${cy + 2} ${sx + 3},${cy + 10} ${sx - 9},${cy + 7} Z M${sx - 9},${cy + 8} L${sx + 5},${cy - 5}" fill="#5DAE74" stroke="#2F7D48" stroke-width="1.3" stroke-linejoin="round"/>
        <text class="vz-lab" x="${sx - 24}" y="${cy + 40}">${t.food}</text>
        <g transform="translate(${ex} ${cy})">
          <circle class="fl-ring" r="${er + 7}" fill="none" stroke="${LINK}" stroke-width="2.4" stroke-dasharray="7 9" stroke-linecap="round"/>
          <circle r="${er}" fill="#fff" stroke="${LINK}" stroke-width="2.2"/>
          <text x="0" y="5" text-anchor="middle" style="font-family:var(--font-head);font-style:italic;font-weight:700;font-size:14px" fill="${NAVY}">MTHFR</text>
        </g>
        <text class="vz-lab" x="${ex}" y="${cy + er + 34}" text-anchor="middle">${t.enzyme}</text>
        <text class="vz-lab vz-peach" x="${f1((ex + er + tx) / 2)}" y="${cy - 16}" text-anchor="middle">${t.active}</text>
        <rect x="${tx}" y="${ty}" width="${tw}" height="${th}" rx="14" fill="#F1F7FA" stroke="#B9CFDA" stroke-width="1.6"/>
        <g clip-path="url(#flClip)"><rect class="fl-fill" x="${tx}" y="${ty}" width="${tw}" height="${th}" fill="url(#flTank)"/></g>
        <line x1="${tx - 8}" x2="${tx + tw + 6}" y1="${f1(ty + th * 0.14)}" y2="${f1(ty + th * 0.14)}" stroke="${NAVY}" stroke-width="1.2" stroke-dasharray="3 3"/>
        <text class="vz-lab" x="${tx - 12}" y="${f1(ty + th * 0.14 + 4)}" text-anchor="end">${t.ref}</text>
        <text class="fl-val" x="${tx + tw / 2}" y="${ty - 8}" text-anchor="middle">100%</text>
        <text class="vz-lab" x="${tx + tw + 6}" y="${ty + th + 18}" text-anchor="end">${t.tank}</text>
      </svg>
      <p class="viz-read" aria-live="polite"></p>
      <div class="fl-dist"><span>${t.dist}</span><div class="fl-bar">${SHARE.map((s, i) => `<i style="flex:${s}" data-i="${i}"></i>`).join("")}</div><div class="fl-keys">${SHARE.map((s, i) => `<button type="button" data-i="${i}"><b>${t.g[i][0]}</b> ${nf(s, 1, lang)}%</button>`).join("")}</div></div>`;
    const fill = stage.querySelector(".fl-fill"), val = stage.querySelector(".fl-val"), read = stage.querySelector(".viz-read"), ring = stage.querySelector(".fl-ring");
    const circles = Array.from(stage.querySelectorAll(".fl-dot")), bars = Array.from(stage.querySelectorAll(".fl-bar i")), keys = Array.from(stage.querySelectorAll(".fl-keys button"));
    let g = 0, cur = 100, stopNum = () => {}, raf = 0, last = 0, ph = circles.map((_, i) => i / N), rot = 0;
    const place = () => {
      circles.forEach((c, i) => {
        const p = ph[i], x = sx + 26 + p * (tx - sx - 26), after = x > ex;
        const hide = (x > ex - er - 4 && x < ex + er + 4) || (after && g === 2 && i % 4 === 0) || (after && g === 1 && i % 8 === 0);
        c.setAttribute("cx", f1(x)); c.setAttribute("cy", f1(cy + Math.sin(p * 18 + i) * 3));
        c.setAttribute("fill", after ? PEACH : "#5DAE74"); c.setAttribute("opacity", hide ? 0 : 1);
      });
      ring.setAttribute("transform", `rotate(${f1(rot)})`);
    };
    const frame = (ts) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(60, ts - (last || ts)); last = ts;
      ph = ph.map((p) => (p + dt * 0.00011 * SPEED[g]) % 1); rot = (rot + dt * 0.05 * SPEED[g]) % 360;
      place();
    };
    const set = (i) => {
      g = i;
      fill.style.transform = `scaleY(${f1(LEVEL[i] * 0.86) / 100})`;
      stopNum(); stopNum = tween(cur, LEVEL[i], 700, (v) => { cur = v; val.textContent = Math.round(v) + "%"; });
      read.textContent = t.read[i];
      bars.forEach((b, k) => b.classList.toggle("on", k === i));
      keys.forEach((b, k) => b.classList.toggle("on", k === i));
    };
    const pick = seg(stage, ".seg3 button", set);
    keys.forEach((b, k) => b.addEventListener("click", () => pick(k)));
    set(0); place();
    if (!reduce) raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); stopNum(); };
  }

  /* ---------- 2а. Хромосома 2: злиття ---------- */
  function fusion(stage, t, lang, W) {
    const H = 128, gap = 30, x0 = 16, L = W - 2 * x0 - gap, la = L * 113.6 / 242.19, lb = L - la, y = 44, h = 24, r = h / 2, cap = 9;
    const rod = (x, len, cf, cls) => {
      const xc = x + len * cf, a = Math.max(x + r, xc - 8), b = Math.min(x + len - r, xc + 8);
      return `<path class="${cls}" d="M${f1(x + r)},${y} L${f1(a)},${y} Q${f1(xc)},${y + 6} ${f1(b)},${y} L${f1(x + len - r)},${y} a${r},${r} 0 0 1 0,${h} L${f1(b)},${y + h} Q${f1(xc)},${y + h - 6} ${f1(a)},${y + h} L${f1(x + r)},${y + h} a${r},${r} 0 0 1 0,${-h} Z"/>`;
    };
    const capL = (x) => `<path d="M${f1(x + cap)},${y} L${f1(x + r)},${y} a${r},${r} 0 0 0 0,${h} L${f1(x + cap)},${y + h} Z"/>`;
    const capR = (x) => `<path d="M${f1(x - cap)},${y} L${f1(x - r)},${y} a${r},${r} 0 0 1 0,${h} L${f1(x - cap)},${y + h} Z"/>`;
    const bx = x0 + la + gap, oldCen = 0.15, lct = (135.85 - 113.6) / 128.59;
    stage.innerHTML = `
      <div class="seg3 two" role="group" aria-label="${t.group}"><button type="button" aria-pressed="true"><b>${t.apes[0]}</b><small>${t.apes[1]}</small></button><button type="button" aria-pressed="false"><b>${t.human[0]}</b><small>${t.human[1]}</small></button></div>
      <svg class="fu" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(t.title)}">
        <defs><linearGradient id="fuGrad" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#8FD6E8"/><stop offset="1" stop-color="#2A77A0"/></linearGradient></defs>
        <g class="fu-a">
          ${rod(x0, la, 93.9 / 113.6, "fu-rod")}
          <g class="fu-tel">${capL(x0)}</g><g class="fu-tel fu-in">${capR(x0 + la)}</g>
          <text class="fu-name" x="${f1(x0 + la / 2)}" y="${y - 12}" text-anchor="middle">2A</text>
          <text class="vz-lab" x="${f1(x0 + la * 93.9 / 113.6)}" y="${y + h + 17}" text-anchor="middle">${t.cen}</text>
        </g>
        <g class="fu-b">
          ${rod(bx, lb, oldCen, "fu-rod fu-rod-b")}
          <rect class="fu-smooth" x="${f1(bx + lb * oldCen - 10)}" y="${y}" width="20" height="${h}" fill="url(#fuGrad)"/>
          <g class="fu-tel fu-in">${capL(bx)}</g><g class="fu-tel">${capR(bx + lb)}</g>
          <text class="fu-name" x="${f1(bx + lb / 2)}" y="${y - 12}" text-anchor="middle">2B</text>
          <g class="fu-lct"><line x1="${f1(bx + lb * lct)}" x2="${f1(bx + lb * lct)}" y1="${y - 6}" y2="${y + h + 4}" stroke="${PEACH}" stroke-width="2"/><circle cx="${f1(bx + lb * lct)}" cy="${y + h / 2}" r="5" fill="${PEACH}" stroke="${NAVY}" stroke-width="1.8"/><text x="${f1(bx + lb * lct + 8)}" y="${y - 10}" style="font-family:var(--font-head);font-style:italic;font-weight:700;font-size:13px" fill="#B4541A">LCT</text></g>
        </g>
        <g class="fu-join"><rect x="${f1(W / 2 - r - 2)}" y="${y}" width="${f1(2 * r + 4)}" height="${h}" fill="url(#fuGrad)"/><path d="M${f1(W / 2 - r - 2)},${y} h${f1(2 * r + 4)} M${f1(W / 2 - r - 2)},${y + h} h${f1(2 * r + 4)}" stroke="rgba(11,37,50,.3)" stroke-width="1" fill="none"/><rect x="${f1(W / 2 - 3)}" y="${y}" width="6" height="${h}" fill="${PEACH}" stroke="#B95A1B" stroke-width="1"/></g>
        <text class="fu-h2" x="${W / 2}" y="${y - 26}" text-anchor="middle">${t.hum2}</text>
      </svg>
      <ul class="fu-leg"><li><i class="k-tel"></i>${t.tel}</li><li class="fu-only-h"><i class="k-scar"></i>${t.scar}</li><li class="fu-only-h"><i class="k-old"></i>${t.old}</li></ul>`;
    const svg = stage.querySelector(".fu");
    svg.style.setProperty("--shift", f1(gap / 2) + "px");
    const set = (i) => stage.classList.toggle("is-human", i === 1);
    const pick = seg(stage, ".seg3 button", set);
    set(0);
    const timer = setTimeout(() => pick(1), reduce ? 0 : 1100);
    return () => clearTimeout(timer);
  }

  /* ---------- 2б. Лактаза: де варіант поширений ---------- */
  function lactase(stage, t, lang) {
    const DATA = [
      [[92.9, 99, 73.7], [90.1, 91, 72.0], [85.9, 99, 59.1], [68.2, 107, 45.8], [15.9, 107, 8.9]],
      [[69.4, 503, 50.8], [36.9, 347, 21.6], [20.9, 489, 11.3], [4.8, 661, 2.7], [0, 504, 0]]
    ];
    stage.innerHTML = `
      <div class="seg3 two" role="group" aria-label="${t.group}">${t.tabs.map((x, i) => `<button type="button" aria-pressed="${i === 0}"><b>${x}</b></button>`).join("")}</div>
      <div class="lc-panel"><div class="lc-row">${[0, 1, 2, 3, 4].map((i) => `<button type="button" class="lc-item" data-i="${i}"><b class="lc-val">0%</b><span class="lc-glass"><span class="lc-in"><span class="lc-milk"></span></span></span><span class="lc-name"></span></button>`).join("")}</div></div>
      <p class="viz-read" aria-live="polite"></p>
      <p class="viz-note lc-note" hidden>${t.note}</p>`;
    const items = Array.from(stage.querySelectorAll(".lc-item")), read = stage.querySelector(".viz-read"), note = stage.querySelector(".lc-note");
    let tab = 0, sel = 0, stops = [];
    const names = () => (tab === 0 ? t.eu : t.world);
    const show = (i) => { sel = i; items.forEach((el, k) => el.classList.toggle("on", k === i)); const d = DATA[tab][i]; read.textContent = t.detail(names()[i], nf(d[1], 0, lang), nf(d[2], 0, lang)); };
    const set = (k) => {
      tab = k; stops.forEach((s) => s()); stops = [];
      items.forEach((el, i) => {
        const d = DATA[k][i], val = el.querySelector(".lc-val");
        el.querySelector(".lc-name").textContent = names()[i];
        el.querySelector(".lc-milk").style.height = d[0] + "%";
        el.style.setProperty("--i", i);
        stops.push(tween(parseFloat(val.textContent) || 0, d[0], 900, (v) => { val.textContent = Math.round(v) + "%"; }));
      });
      note.hidden = k !== 1;
      show(0);
    };
    seg(stage, ".seg3 button", set);
    items.forEach((el, i) => el.addEventListener("click", () => show(i)));
    const timer = setTimeout(() => set(0), 60);
    return () => { clearTimeout(timer); stops.forEach((s) => s()); };
  }

  /* ---------- 3. PPARG: програма профілактики діабету ---------- */
  function dpp(stage, t, lang, W) {
    const RATE = [11.0, 7.8, 4.8], CASES = [11, 8, 5], CUT = ["", "−31%", "−58%"];
    const cols = W >= 480 ? 25 : 20, rows = 100 / cols, cw = W / cols, ch = Math.min(26, cw * 1.25), sc = Math.min(1, cw / 20);
    let people = "";
    for (let i = 0; i < 100; i++) {
      const cx = (i % cols) * cw + cw / 2, cy = Math.floor(i / cols) * ch + ch / 2;
      people += `<g class="dp-p" style="--i:${i}" transform="translate(${f1(cx)} ${f1(cy)}) scale(${f1(sc * 10) / 10})"><circle cy="-6" r="3.6"/><path d="M-5.4,8 v-3.6 a5.4,5.4 0 0 1 10.8,0 V8 Z"/></g>`;
    }
    stage.innerHTML = `
      <div class="seg3" role="group" aria-label="${t.group}">${t.arms.map((a, i) => `<button type="button" aria-pressed="${i === 0}"><b>${a}</b></button>`).join("")}</div>
      <div class="dp-read"><b class="dp-num">11,0</b><span>${t.unit}</span><em class="dp-cut" hidden></em></div>
      <svg class="dp" width="${W}" height="${f1(rows * ch)}" viewBox="0 0 ${W} ${f1(rows * ch)}" role="img" aria-label="${esc(t.unit)}">${people}</svg>
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
    const wide = W >= 520, D = wide ? 270 : Math.min(W, 300), c = D / 2, R = c - 22, TAU = Math.PI * 2;
    const act = (h) => 0.5 + 0.5 * Math.cos(TAU * (h - 12) / 24), prot = (h) => 0.5 + 0.5 * Math.cos(TAU * (h - 19) / 24);
    const ang = (h) => TAU * (h - 12) / 24 - Math.PI / 2;          // 12:00 угорі, 00:00 унизу
    const pt = (h, r) => [c + Math.cos(ang(h)) * r, c + Math.sin(ang(h)) * r];
    const polar = (fn, r0, amp) => { let d = ""; for (let i = 0; i <= 96; i++) { const h = i / 4, p = pt(h, r0 + amp * fn(h)); d += (i ? "L" : "M") + f1(p[0]) + "," + f1(p[1]); } return d + "Z"; };
    const rA = R * 0.56, aA = R * 0.3, rP = R * 0.2, aP = R * 0.3;
    let ring = "";
    for (let i = 0; i < 48; i++) {
      const h0 = i / 2, h1 = h0 + 0.5, k = 0.5 + 0.5 * Math.cos(TAU * (h0 + 0.25 - 12) / 24);
      const mix = (a, b) => Math.round(a + (b - a) * k), col = `rgb(${mix(13, 255)},${mix(45, 214)},${mix(64, 150)})`;
      const p0 = pt(h0, R), p1 = pt(h1 + 0.02, R);
      ring += `<path d="M${f1(p0[0])},${f1(p0[1])} A${R},${R} 0 0 1 ${f1(p1[0])},${f1(p1[1])}" stroke="${col}" stroke-width="14" fill="none"/>`;
    }
    let marks = "";
    [0, 6, 12, 18].forEach((h) => { const p = pt(h, R + 15); marks += `<text class="ck-h" x="${f1(p[0])}" y="${f1(p[1] + 4)}" text-anchor="middle">${String(h).padStart(2, "0")}</text>`; });
    for (let h = 0; h < 24; h++) { const a = pt(h, R - 10), b = pt(h, R - (h % 6 === 0 ? 17 : 13)); marks += `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="rgba(11,37,50,.3)" stroke-width="${h % 6 === 0 ? 1.6 : 1}"/>`; }
    stage.innerHTML = `
      <div class="ck-wrap${wide ? " wide" : ""}">
        <svg class="ck" width="${D}" height="${D}" viewBox="0 0 ${D} ${D}" role="slider" tabindex="0" aria-label="${t.hand}" aria-valuemin="0" aria-valuemax="24" aria-valuenow="8">
          ${ring}${marks}
          <path d="${polar(act, rA, aA)}" fill="rgba(30,101,140,.16)" stroke="${LINK}" stroke-width="2"/>
          <path d="${polar(prot, rP, aP)}" fill="rgba(255,157,69,.3)" stroke="#E07B2A" stroke-width="2"/>
          <line class="ck-hand" x1="${c}" y1="${c}" x2="${c}" y2="${c}" stroke="${NAVY}" stroke-width="2.4" stroke-linecap="round"/>
          <circle class="ck-da" r="5.5" fill="${LINK}" stroke="#fff" stroke-width="2"/>
          <circle class="ck-dp" r="5.5" fill="#E07B2A" stroke="#fff" stroke-width="2"/>
          <circle class="ck-knob" r="11" fill="#fff" stroke="${NAVY}" stroke-width="2.4"/>
          <circle cx="${c}" cy="${c}" r="4" fill="${NAVY}"/>
        </svg>
        <div class="ck-side">
          <div class="ck-time"><b>08:00</b><span></span></div>
          <p class="viz-read" aria-live="polite"></p>
          <div class="ck-bars">
            <div><span><i style="background:${LINK}"></i>${t.a}</span><div class="ck-track"><i class="ck-ba" style="background:${LINK}"></i></div></div>
            <div><span><i style="background:#E07B2A"></i>${t.p}</span><div class="ck-track"><i class="ck-bp" style="background:#E07B2A"></i></div></div>
          </div>
          <button type="button" class="viz-btn ck-play"><span class="ic">${playIcon}</span><span class="tx">${t.play}</span></button>
        </div>
      </div>
      ${tiles(t.tiles)}`;
    const svg = stage.querySelector(".ck"), hand = stage.querySelector(".ck-hand"), knob = stage.querySelector(".ck-knob"), da = stage.querySelector(".ck-da"), dp = stage.querySelector(".ck-dp");
    const time = stage.querySelector(".ck-time b"), phName = stage.querySelector(".ck-time span"), read = stage.querySelector(".viz-read"), ba = stage.querySelector(".ck-ba"), bp = stage.querySelector(".ck-bp"), btn = stage.querySelector(".ck-play");
    let h = 8, playing = false, raf = 0, last = 0, lastPh = -1;
    const draw = () => {
      const k = pt(h, R), a = pt(h, rA + aA * act(h)), p = pt(h, rP + aP * prot(h));
      hand.setAttribute("x2", f1(k[0])); hand.setAttribute("y2", f1(k[1]));
      knob.setAttribute("cx", f1(k[0])); knob.setAttribute("cy", f1(k[1]));
      da.setAttribute("cx", f1(a[0])); da.setAttribute("cy", f1(a[1])); dp.setAttribute("cx", f1(p[0])); dp.setAttribute("cy", f1(p[1]));
      const mins = Math.round(h * 60) % 1440;
      time.textContent = String(Math.floor(mins / 60)).padStart(2, "0") + ":" + String(mins % 60).padStart(2, "0");
      ba.style.width = Math.round(act(h) * 100) + "%"; bp.style.width = Math.round(prot(h) * 100) + "%";
      const ph = h >= 5 && h < 11 ? 0 : h >= 11 && h < 17 ? 1 : h >= 17 && h < 23 ? 2 : 3;
      if (ph !== lastPh) { lastPh = ph; phName.textContent = t.ph[ph][0]; read.textContent = t.ph[ph][1]; svg.setAttribute("aria-valuetext", time.textContent + ", " + t.ph[ph][0]); }
      svg.setAttribute("aria-valuenow", f1(h));
    };
    const setPlay = (on) => { playing = on; btn.classList.toggle("is-on", on); btn.querySelector(".tx").textContent = on ? t.pause : t.play; last = 0; cancelAnimationFrame(raf); if (on) raf = requestAnimationFrame(frame); };
    const frame = (ts) => { raf = requestAnimationFrame(frame); const dt = Math.min(60, ts - (last || ts)); last = ts; h = (h + dt * 24 / 14000) % 24; draw(); };
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
    const big = W >= 480, NB = 10, MAX = 50, bw = clamp((W - 150) / (2 * NB) - 2, 5, 15), step = bw + 2, capW = NB * step, y = 34, h = big ? 42 : 30, r = h / 2, H = y + h + 40;
    const bodyX = 6 + capW + 4, bodyW = W - 2 * bodyX, xc = bodyX + bodyW * 0.27, LET = "TTAGGG";
    let beads = "";
    for (let side = 0; side < 2; side++) for (let i = 0; i < NB; i++) {
      const x = side === 0 ? bodyX - 4 - (i + 1) * step + 2 : bodyX + bodyW + 4 + i * step;
      beads += `<g class="tl-bead" data-k="${i}" style="--i:${i}"><rect x="${f1(x)}" y="${y + 2}" width="${f1(bw)}" height="${h - 4}" rx="${f1(Math.min(4, bw / 2))}"/>${bw >= 8.5 ? `<text x="${f1(x + bw / 2)}" y="${f1(y + h / 2 + (big ? 4.5 : 3.5))}" text-anchor="middle" font-size="${big ? 11 : 8.5}">${LET[(side === 0 ? NB - 1 - i : i) % 6]}</text>` : ""}</g>`;
    }
    const a = Math.max(bodyX + r, xc - 9), b = Math.min(bodyX + bodyW - r, xc + 9);
    stage.innerHTML = `
      <svg class="tl" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(t.title)}">
        <defs><linearGradient id="tlGrad" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#8FD6E8"/><stop offset="1" stop-color="#2A77A0"/></linearGradient></defs>
        <path class="tl-body" d="M${f1(bodyX + r)},${y} L${f1(a)},${y} Q${f1(xc)},${y + 7} ${f1(b)},${y} L${f1(bodyX + bodyW - r)},${y} a${r},${r} 0 0 1 0,${h} L${f1(b)},${y + h} Q${f1(xc)},${y + h - 7} ${f1(a)},${y + h} L${f1(bodyX + r)},${y + h} a${r},${r} 0 0 1 0,${-h} Z"/>
        ${beads}
        <g class="tl-enz"><circle cx="${f1(bodyX - 4 - capW / 2)}" cy="${y - 14}" r="8"/><circle cx="${f1(bodyX + bodyW + 4 + capW / 2)}" cy="${y - 14}" r="8"/><path d="M${f1(bodyX - 4 - capW / 2)},${y - 6} v6 M${f1(bodyX + bodyW + 4 + capW / 2)},${y - 6} v6"/></g>
        <text class="vz-lab tl-state" x="${W / 2}" y="${y + h + 26}" text-anchor="middle"></text>
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
      range.style.setProperty("--p", (d / MAX * 100) + "%");
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

  const RENDER = { folate, fusion, lactase, dpp, clock, telomere };
  /* Позначки {n} у текстах графіка замінюються посиланнями на джерела дня; без обробника вони просто зникають */
  const strip = (s) => s.replace(/\{\d+\}/g, "");
  const deep = (v, f) => typeof v === "string" ? f(v) : Array.isArray(v) ? v.map((x) => deep(x, f)) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x, f)])) : v;
  window.Viz = {
    nf, miniChrom, ideogram,
    has: (id) => !!RENDER[id],
    /* Розмітка картки графіка; сам графік монтується після вставлення в сторінку */
    html(id, lang, mark) {
      const t = deep(TXT[id][lang] || TXT[id].uk, mark || strip);
      return `<figure class="viz viz-${id}" data-viz="${id}"><h3>${t.title}</h3><p class="sub">${t.sub}</p><div class="viz-stage"></div><figcaption>${t.src}</figcaption></figure>`;
    },
    mount(fig, lang, mark) {
      const id = fig.dataset.viz, stage = fig.querySelector(".viz-stage"), t = deep(TXT[id][lang] || TXT[id].uk, mark || strip);
      const W = Math.max(260, Math.floor(stage.clientWidth));
      stage.dataset.w = W;
      return RENDER[id](stage, t, lang, W) || (() => {});
    }
  };
})();
