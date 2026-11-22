/* Apixmed Prism · «23 пари» · адвент-календар 2026 · прод-сторінка
   Один екран: стрічка з каріограмою + мозаїка з 24 віконець. Віконця відчиняються за реальною датою. */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const DAYS = window.ADVENT_DAYS, MAP = window.ADVENT_MAP || {}, PKG = window.ADVENT_PKG || {}, Viz = window.Viz;
  if (!DAYS || !Viz) return;

  /* ---------- Налаштування ---------- */
  const CFG = {
    year: 2026,
    month: 11,                 // грудень (місяці рахуються з нуля)
    last: 24,
    allowPreview: true,        // ?day=5 або ?date=2026-12-05 показує календар станом на цю дату; для публікації можна вимкнути
    storeKey: "apixmedAdvent2026"
  };
  const wday = (n) => new Date(CFG.year, CFG.month, n).getDay();
  const pluralUk = (n, f) => { const a = n % 10, b = n % 100; return a === 1 && b !== 11 ? f[0] : a >= 2 && a <= 4 && (b < 12 || b > 14) ? f[1] : f[2]; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const f1 = (n) => Math.round(n * 10) / 10;


  /* ---------- Мови: українська основна, англійська друга ---------- */
  const STR = {
    uk: {
      title: "23 пари · адвент-календар Apixmed Prism",
      desc: "Адвент-календар про хромосоми людини: щодня з 1 по 24 грудня одна пара й один відомий ген, пов’язаний зі здоров’ям і самопочуттям.",
      name: "23 пари", sub: "адвент-календар · грудень 2026", month: "грудня", today: "сьогодні",
      wd: ["нд", "пн", "вт", "ср", "чт", "пт", "сб"], wdf: ["неділя", "понеділок", "вівторок", "середа", "четвер", "п’ятниця", "субота"],
      special: { 6: "Миколая", 24: "Святвечір" },
      date: (n) => `${n} грудня`,
      karyoAria: "Каріограма: пари хромосом за днями грудня", karyoSvg: "Каріограма: 23 пари хромосом і мітохондріальна ДНК", boardAria: "Календар: 24 віконця",
      info: "Про календар", langAria: "Мова", noscript: "Щоб відчинити віконця календаря, увімкніть JavaScript у браузері.",
      opened: "Відчинено", openedAria: (c, n) => `Відчинено ${c} з ${n} віконець`,
      start: "Старт 1 грудня", inDays: (n) => `через ${n} ${pluralUk(n, ["день", "дні", "днів"])}`, todayLbl: "Сьогодні", cal: "Календар", allOpen: "відкрито",
      preview: "Перегляд:", exitPreview: "Вийти з перегляду дати",
      chromosome: "Хромосома", pair: "Пара", bonusDay: "Бонусний день", bonus: "Бонус", xy: "X і Y", mt: "мтДНК", mtShort: "мт", mtFull: "Мітохондріальна ДНК", mtLower: "мітохондріальна ДНК", chrLower: "хромосома",
      star: (n) => `Позначити ${n} грудня зірочкою`, unstar: (n) => `Зняти зірочку з ${n} грудня`, starOn: (n) => `${n} грудня позначено зірочкою`, starOff: (n) => `Зірочку з ${n} грудня знято`,
      read: "Читати", shutAria: (n) => `Зачинити віконце ${n} грудня`, insideAria: (n, k, g) => `${n} грудня: ${k}, ${g}. Читати`,
      willOpen: (n) => `Відчиниться ${n} грудня`, closeDoor: "Зачинити віконце", openDoor: "Відчинити віконце",
      kLocked: "Ще зачинено", kOpen: (g) => `Відчинено: ${g}`, kAvail: "Можна відчиняти",
      tipLocked: (n) => `відчиниться ${n} грудня`, tipToday: "віконце дня: можна відчиняти", tipAvail: "ще не відчинено",
      toastPre: (n) => `Календар стартує 1 грудня. Це віконце відчиниться ${n} грудня`, toastLocked: (n) => `Це віконце відчиниться ${n} грудня`, toastReset: "Усі віконця зачинено",
      pairOf: "пара хромосом", sex: "статеві хромосоми", bp: "пар нуклеотидів", mln: "млн", mtBp: "16,6 тис.",
      genes: "генів, що кодують білки", genesMt: "генів у молекулі", regions: "інших відомих ділянок на карті", legGene: "ген дня", legOther: "інші відомі ділянки",
      others: "Інші гени цієї хромосоми та пов’язані з ними ознаки", noMt: "Мітохондріальна ДНК не входить до хромосомної карти.",
      noVars: "На карті немає окремих добре вивчених варіантів цієї хромосоми: її маркери працюють у складі полігенних оцінок.",
      defGene: "ген", defProd: "продукт гена",
      role: "Ген дня", known: "Що відомо", not: "Чого це не означає", tip: "Порада дня", tipPick: "Оберіть, що вас стосується", sources: "Джерела", source: "Джерело",
      pkgNote: "Натисніть на ознаку, щоб відкрити сторінку пакета Apixmed Prism, який її досліджує.", pkgTitle: (n) => `Пакет Apixmed Prism: ${n}`,
      blog: "Читайте також у блозі Apixmed", showAll: (n) => `Показати всі гени: ${n}`, showLess: "Згорнути перелік",
      next: (n) => `Наступне віконце відчиниться завтра, ${n} грудня`, prevBtn: "Попереднє відчинене віконце", nextBtn: "Наступне відчинене віконце", close: "Закрити",
      ideo: { pArm: "коротке плече (p)", qArm: "довге плече (q)", bp: "пар нуклеотидів", mtBp: "16 569", mt: "мітохондріальна ДНК", chromosome: "хромосома" },
      disclaimer: "Матеріал має освітній характер. Генетичні асоціації описують імовірність у групах людей, а не діагноз чи прогноз для окремої людини, і не замінюють консультацію лікаря.",
      about: {
        rubric: "Адвент-календар · грудень 2026", title: "23 пари: подорож каріотипом",
        lede: "Щодня одна пара хромосом і один відомий ген, пов’язаний зі здоров’ям і самопочуттям. Не діагнози й не рідкісні хвороби, а те, що стосується майже кожного.",
        how: "Як це працює",
        steps: ["З 1 по 24 грудня щодня відчиняється одне віконце. Номер дня дорівнює номеру пари хромосом: календар іде від першої, найбільшої, до найменших.", "23 грудня на черзі статеві хромосоми X і Y, а 24 грудня бонус: мітохондріальна ДНК, яка до каріотипу не входить.", "Усередині віконця ген дня: що він робить, що про нього відомо науці та чого це не означає."],
        kTitle: "Каріограма у верхній стрічці", kText: "Пари показано в масштабі їхньої довжини. Натисніть на пару, щоб перейти до її віконця.",
        legend: ["ще зачинено", "можна відчиняти", "сьогодні", "відчинено"], reset: "Зачинити всі віконця", grch: "Довжини хромосом наведено за збіркою геному GRCh38."
      }
    },
    en: {
      title: "23 pairs · the Apixmed Prism advent calendar",
      desc: "An advent calendar about human chromosomes: from 1 to 24 December, one pair and one well-known gene linked to health and wellbeing each day.",
      name: "23 pairs", sub: "advent calendar · December 2026", month: "December", today: "today",
      wd: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], wdf: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      special: { 6: "St Nicholas", 24: "Christmas Eve" },
      date: (n) => `${n} December`,
      karyoAria: "Karyogram: chromosome pairs by day of December", karyoSvg: "Karyogram: 23 chromosome pairs and mitochondrial DNA", boardAria: "Calendar: 24 doors",
      info: "About the calendar", langAria: "Language", noscript: "Turn on JavaScript in your browser to open the calendar doors.",
      opened: "Opened", openedAria: (c, n) => `${c} of ${n} doors opened`,
      start: "Starts 1 December", inDays: (n) => `in ${n} ${n === 1 ? "day" : "days"}`, todayLbl: "Today", cal: "Calendar", allOpen: "all open",
      preview: "Preview:", exitPreview: "Leave date preview",
      chromosome: "Chromosome", pair: "Pair", bonusDay: "Bonus day", bonus: "Bonus", xy: "X and Y", mt: "mtDNA", mtShort: "mt", mtFull: "Mitochondrial DNA", mtLower: "mitochondrial DNA", chrLower: "chromosome",
      star: (n) => `Star ${n} December`, unstar: (n) => `Remove the star from ${n} December`, starOn: (n) => `${n} December starred`, starOff: (n) => `Star removed from ${n} December`,
      read: "Read", shutAria: (n) => `Close the door for ${n} December`, insideAria: (n, k, g) => `${n} December: ${k}, ${g}. Read`,
      willOpen: (n) => `Opens on ${n} December`, closeDoor: "Close the door", openDoor: "Open the door",
      kLocked: "Still closed", kOpen: (g) => `Opened: ${g}`, kAvail: "Ready to open",
      tipLocked: (n) => `opens on ${n} December`, tipToday: "door of the day: ready to open", tipAvail: "not opened yet",
      toastPre: (n) => `The calendar starts on 1 December. This door opens on ${n} December`, toastLocked: (n) => `This door opens on ${n} December`, toastReset: "All doors closed",
      pairOf: "chromosome pair", sex: "sex chromosomes", bp: "base pairs", mln: "M", mtBp: "16.6 k",
      genes: "protein-coding genes", genesMt: "genes in the molecule", regions: "other known regions on the map", legGene: "gene of the day", legOther: "other known regions",
      others: "Other genes on this chromosome and the traits linked to them", noMt: "Mitochondrial DNA is not part of the chromosome map.",
      noVars: "The map has no well-studied individual variants on this chromosome: its markers work as part of polygenic scores.",
      defGene: "gene", defProd: "gene product",
      role: "Gene of the day", known: "What is known", not: "What it does not mean", tip: "Tip of the day", tipPick: "Choose what applies to you", sources: "Sources", source: "Source",
      pkgNote: "Click a trait to open the Apixmed Prism package that covers it.", pkgTitle: (n) => `Apixmed Prism package: ${n}`,
      blog: "Read more on the Apixmed blog", showAll: (n) => `Show all genes: ${n}`, showLess: "Show fewer",
      next: (n) => `The next door opens tomorrow, ${n} December`, prevBtn: "Previous opened door", nextBtn: "Next opened door", close: "Close",
      ideo: { pArm: "short arm (p)", qArm: "long arm (q)", bp: "base pairs", mtBp: "16,569", mt: "mitochondrial DNA", chromosome: "chromosome" },
      disclaimer: "This material is educational. Genetic associations describe probabilities in groups of people, not a diagnosis or a forecast for an individual, and they do not replace a doctor’s advice.",
      about: {
        rubric: "Advent calendar · December 2026", title: "23 pairs: a journey through the karyotype",
        lede: "One chromosome pair and one well-known gene linked to health and wellbeing each day. Not diagnoses and not rare diseases, but things that concern almost everyone.",
        how: "How it works",
        steps: ["From 1 to 24 December one door opens each day. The day number equals the number of the chromosome pair: the calendar runs from the first, the largest, to the smallest.", "23 December brings the sex chromosomes X and Y, and 24 December a bonus: mitochondrial DNA, which is not part of the karyotype.", "Inside each door is the gene of the day: what it does, what science knows about it and what that does not mean."],
        kTitle: "The karyogram in the top strip", kText: "Pairs are drawn to scale by length. Click a pair to go to its door.",
        legend: ["still closed", "ready to open", "today", "opened"], reset: "Close all doors", grch: "Chromosome lengths follow the GRCh38 genome assembly."
      }
    }
  };
  let lang = "uk";
  try {
    const q = new URLSearchParams(location.search).get("lang"), saved = localStorage.getItem(CFG.storeKey + ":lang");
    lang = STR[q] ? q : STR[saved] ? saved : "uk";
  } catch (e) { /* без збереження мова лишається українською */ }
  let T = STR[lang];
  const C = (d) => d[lang] || d.uk;                                   // тексти дня потрібною мовою
  const L = (v) => (v && typeof v === "object" ? v[lang] || v.uk : v);  // рядок, що може мати два варіанти

  /* Мозаїки віконець для різних пропорцій екрана: [стовпець, рядок, ширина, висота].
     Кожна покриває сітку повністю; обирається та, де комірки найближчі до квадрата. */
  const MOSAIC = {
    "10x4": { 1: [1, 1, 2, 2], 2: [3, 1, 1, 1], 3: [4, 1, 1, 2], 4: [5, 1, 2, 1], 5: [7, 1, 1, 1], 6: [8, 1, 1, 2], 7: [9, 1, 2, 1], 8: [3, 2, 1, 2], 9: [5, 2, 2, 2], 10: [7, 2, 1, 1], 11: [9, 2, 1, 1], 12: [10, 2, 1, 1], 13: [1, 3, 1, 1], 14: [2, 3, 1, 1], 15: [4, 3, 1, 2], 16: [7, 3, 1, 1], 17: [8, 3, 1, 1], 18: [1, 4, 1, 1], 19: [2, 4, 2, 1], 20: [5, 4, 1, 1], 21: [6, 4, 1, 1], 22: [7, 4, 1, 1], 23: [8, 4, 1, 1], 24: [9, 3, 2, 2] },
    "8x5": { 1: [1, 1, 2, 2], 2: [3, 1, 1, 1], 3: [4, 1, 2, 1], 4: [6, 1, 1, 2], 5: [7, 1, 1, 1], 6: [8, 1, 1, 2], 7: [3, 2, 1, 2], 8: [4, 2, 1, 1], 9: [5, 2, 1, 1], 10: [7, 2, 1, 1], 11: [1, 3, 1, 1], 12: [2, 3, 1, 2], 13: [4, 3, 2, 2], 14: [6, 3, 1, 1], 15: [7, 3, 2, 1], 16: [1, 4, 1, 1], 17: [3, 4, 1, 1], 18: [6, 4, 1, 1], 19: [1, 5, 2, 1], 20: [3, 5, 1, 1], 21: [4, 5, 1, 1], 22: [5, 5, 1, 1], 23: [6, 5, 1, 1], 24: [7, 4, 2, 2] },
    "7x6": { 1: [1, 1, 2, 2], 2: [3, 1, 1, 1], 3: [4, 1, 2, 1], 4: [6, 1, 1, 2], 5: [7, 1, 1, 1], 6: [3, 2, 2, 2], 7: [5, 2, 1, 1], 8: [7, 2, 1, 1], 9: [1, 3, 1, 2], 10: [2, 3, 1, 1], 11: [5, 3, 1, 1], 12: [6, 3, 2, 1], 13: [2, 4, 1, 1], 14: [3, 4, 1, 1], 15: [4, 4, 2, 1], 16: [6, 4, 1, 1], 17: [7, 4, 1, 1], 18: [1, 5, 2, 1], 19: [3, 5, 1, 2], 20: [4, 5, 2, 1], 21: [1, 6, 1, 1], 22: [2, 6, 1, 1], 23: [4, 6, 2, 1], 24: [6, 5, 2, 2] },
    "6x7": { 1: [1, 1, 2, 2], 2: [3, 1, 1, 1], 3: [4, 1, 2, 1], 4: [6, 1, 1, 2], 5: [3, 2, 1, 1], 6: [4, 2, 2, 2], 7: [1, 3, 1, 1], 8: [2, 3, 2, 1], 9: [6, 3, 1, 2], 10: [1, 4, 1, 2], 11: [2, 4, 1, 1], 12: [3, 4, 1, 1], 13: [4, 4, 2, 1], 14: [2, 5, 2, 1], 15: [4, 5, 1, 1], 16: [5, 5, 1, 1], 17: [6, 5, 1, 1], 18: [1, 6, 1, 1], 19: [2, 6, 1, 2], 20: [3, 6, 2, 1], 21: [1, 7, 1, 1], 22: [3, 7, 1, 1], 23: [4, 7, 1, 1], 24: [5, 6, 2, 2] },
    "4x8": { 1: [1, 1, 2, 2], 2: [3, 1, 1, 1], 3: [4, 1, 1, 1], 4: [3, 2, 1, 1], 5: [4, 2, 1, 1], 6: [1, 3, 2, 1], 7: [3, 3, 1, 1], 8: [4, 3, 1, 1], 9: [1, 4, 1, 1], 10: [2, 4, 1, 1], 11: [3, 4, 1, 1], 12: [4, 4, 1, 1], 13: [1, 5, 1, 1], 14: [2, 5, 1, 1], 15: [3, 5, 1, 1], 16: [4, 5, 1, 1], 17: [1, 6, 1, 2], 18: [2, 6, 1, 1], 19: [3, 6, 1, 1], 20: [4, 6, 1, 1], 21: [2, 7, 1, 1], 22: [1, 8, 1, 1], 23: [2, 8, 1, 1], 24: [3, 7, 2, 2] }
  };
  const LAYOUTS = Object.keys(MOSAIC).map((k) => { const [c, r] = k.split("x").map(Number); return { k, c, r }; });

  /* ---------- Дата ---------- */
  const preview = (function () {
    if (!CFG.allowPreview) return null;
    try {
      const q = new URLSearchParams(location.search);
      if (q.has("day")) { const n = clamp(parseInt(q.get("day"), 10) || 0, 0, 31); return n === 0 ? new Date(CFG.year, CFG.month, 0) : new Date(CFG.year, CFG.month, n); }
      const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(q.get("date") || "");
      if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    } catch (e) { /* без параметрів працює за реальною датою */ }
    return null;
  })();
  function clock() {
    const t = preview || new Date(), today = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    const start = new Date(CFG.year, CFG.month, 1), end = new Date(CFG.year, CFG.month, CFG.last + 1);
    if (today < start) return { phase: "before", day: 0, today: 0, left: Math.round((start - today) / 864e5) };
    if (today >= end) return { phase: "after", day: CFG.last, today: 0, left: 0 };
    return { phase: "live", day: today.getDate(), today: today.getDate(), left: 0 };
  }
  let now = clock();

  /* ---------- Стан ---------- */
  const KEY = CFG.storeKey + (preview ? ":preview" : "");
  let opened = new Set();
  try { opened = new Set((JSON.parse(localStorage.getItem(KEY) || "[]") || []).filter((n) => Number.isInteger(n) && n >= 1 && n <= CFG.last)); } catch (e) { /* приватний режим */ }
  const TG = window.AdventTG || null;                                  // календар усередині Telegram (js/tg.js)
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify([...opened])); } catch (e) { /* приватний режим */ } if (TG && !preview) TG.cloudSave("opened", JSON.stringify([...opened])); };
  /* Зірочки: дні, які читач позначив для себе. Зберігаються окремо від відчинених віконець */
  let stars = new Set();
  try { stars = new Set((JSON.parse(localStorage.getItem(CFG.storeKey + ":stars") || "[]") || []).filter((n) => Number.isInteger(n) && n >= 1 && n <= CFG.last)); } catch (e) { /* приватний режим */ }
  const persistStars = () => { try { localStorage.setItem(CFG.storeKey + ":stars", JSON.stringify([...stars])); } catch (e) { /* приватний режим */ } if (TG) TG.cloudSave("stars", JSON.stringify([...stars])); };
  const starIcon = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5l2 4.1 4.5.6-3.3 3.1.8 4.5L8 11.6l-4 2.2.8-4.5L1.5 6.2 6 5.6z"/></svg>`;
  const state = { open: null, layout: null, kW: 0, kH: 0 };

  const dayOf = (n) => DAYS.find((x) => x.d === n);
  const isLocked = (n) => n > now.day;
  const isOpen = (n) => opened.has(n) && !isLocked(n);
  const winEl = (n) => $(`#wins [data-win="${n}"]`);
  const kEl = (n) => $(`#karyo [data-k="${n}"]`);
  const chrName = (d) => d.chr === "MT" ? T.mt : d.chr2 ? T.xy : d.chr;
  const kick = (d) => d.bonus ? T.bonusDay : T.chromosome + " " + chrName(d);
  const lockIcon = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="2"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"/></svg>`;
  const arrow = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4"/></svg>`;

  /* ---------- Віконця ---------- */
  function insideHTML(d) {
    return `<span class="in-kick"><span class="kf">${kick(d)}</span><span class="ks">${d.bonus ? T.bonus : T.pair + " " + chrName(d)}</span></span>
      <span class="in-gene">${L(d.gene)}</span>
      <span class="in-ttl">${C(d).title}</span>
      <span class="in-chr">${Viz.miniChrom(d, { fill: "#1E658C", op: 1, hero: true })}</span>
      <span class="in-go">${arrow}</span>`;
  }
  function winHTML(d, i) {
    return `<div class="win" style="--i:${i}" data-win="${d.d}">
      <button class="inside" data-read="${d.d}" tabindex="-1"></button>
      <button class="shut" data-shut="${d.d}" tabindex="-1" aria-label="${T.shutAria(d.d)}">×</button>
      <button class="star" data-star="${d.d}" aria-pressed="false">${starIcon}</button>
      <button class="flap" data-flap="${d.d}">
        <span class="f-chr">${Viz.miniChrom(d, { fill: "#fff", op: 0.36, hero: false })}</span>
        <span class="f-num">${d.d}</span>
        <span class="f-date">${T.month}<i>${T.wd[wday(d.d)]}</i></span>
        <span class="f-foot"><span class="f-lock">${lockIcon}</span>${T.special[d.d] ? `<span class="f-note">${T.special[d.d]}</span>` : ""}<span class="f-now">${T.today}</span></span>
      </button>
    </div>`;
  }
  function paintWin(el) {
    const n = +el.dataset.win, d = dayOf(n), locked = isLocked(n), open = isOpen(n);
    el.classList.toggle("locked", locked);
    el.classList.toggle("open", open);
    el.classList.toggle("today", n === now.today);
    el.classList.toggle("starred", stars.has(n));
    const inside = $(".inside", el), shut = $(".shut", el), flap = $(".flap", el), star = $(".star", el);
    star.setAttribute("aria-pressed", String(stars.has(n)));
    star.setAttribute("aria-label", stars.has(n) ? T.unstar(n) : T.star(n));
    if (locked) inside.innerHTML = "";                       // вміст майбутніх днів у сторінку не потрапляє
    else if (!inside.firstChild) inside.innerHTML = insideHTML(d);
    [inside, shut].forEach((b) => { if (open) b.removeAttribute("tabindex"); else b.setAttribute("tabindex", "-1"); });
    inside.setAttribute("aria-hidden", String(!open));
    inside.setAttribute("aria-label", locked ? "" : T.insideAria(n, kick(d), L(d.gene)));
    flap.setAttribute("aria-expanded", String(open));
    flap.setAttribute("aria-label", `${T.date(n)}, ${T.wdf[wday(n)]}. ${locked ? T.willOpen(n) : open ? T.closeDoor : T.openDoor}`);
  }

  /* Розкладка: обираємо мозаїку, у якій комірки найближчі до квадрата, і розтягуємо її на все полотно */
  function layout() {
    const box = $("#wins"), W = box.clientWidth, H = box.clientHeight;
    if (!W || !H) return;
    const gap = parseFloat(getComputedStyle(box).columnGap) || 10;
    let best = null;
    LAYOUTS.forEach((L) => {
      const cw = (W - gap * (L.c - 1)) / L.c, ch = (H - gap * (L.r - 1)) / L.r;
      const score = Math.abs(Math.log(cw / ch / 1.12));
      if (!best || score < best.score) best = { L, score };
    });
    const L = best.L;
    if (L.k === state.layout) return;
    state.layout = L.k;
    box.style.setProperty("--cols", L.c);
    box.style.setProperty("--rows", L.r);
    box.dataset.layout = L.k;
    $$(".win", box).forEach((el) => {
      const [c, r, w, h] = MOSAIC[L.k][+el.dataset.win];
      el.style.gridColumn = `${c} / span ${w}`;
      el.style.gridRow = `${r} / span ${h}`;
      el.classList.remove("s11", "s21", "s12", "s22");
      el.classList.add(`s${w}${h}`);
    });
  }

  function setWin(n, open, focus) {
    if (open) opened.add(n); else opened.delete(n);
    persist();
    if (open && TG) TG.haptic("light");
    const el = winEl(n);
    if (el) paintWin(el);
    paintKaryo(); renderMeta();
    if (open && focus && el) setTimeout(() => { if (el.classList.contains("open")) $(".inside", el).focus({ preventScroll: true }); }, 520);
  }
  function refuse(n) {
    const el = winEl(n);
    if (el) { el.classList.remove("shake"); void el.offsetWidth; el.classList.add("shake"); }
    toast(now.phase === "before" ? T.toastPre(n) : T.toastLocked(n));
  }
  /* Перехід із каріограми: зачинене віконце відчиняємо, відчинене розгортаємо в картку */
  function activate(n) {
    if (isLocked(n)) { refuse(n); return; }
    if (!opened.has(n)) setWin(n, true, false); else openCard(n);
  }

  /* ---------- Каріограма у верхній стрічці ---------- */
  function kPath(x, y, w, h, cf) {
    const r = w / 2, yb = y + h, z = Math.min(3, h * 0.14), p = w * 0.22;
    const c1 = Math.max(y + r, y + h * cf - z), c2 = Math.max(c1, Math.min(yb - r, y + h * cf + z)), yc = (c1 + c2) / 2;
    return `M${f1(x)},${f1(y + r)} a${f1(r)},${f1(r)} 0 0 1 ${f1(w)},0 L${f1(x + w)},${f1(c1)} Q${f1(x + w - p)},${f1(yc)} ${f1(x + w)},${f1(c2)} L${f1(x + w)},${f1(yb - r)} a${f1(r)},${f1(r)} 0 0 1 ${f1(-w)},0 L${f1(x)},${f1(c2)} Q${f1(x + p)},${f1(yc)} ${f1(x)},${f1(c1)} Z`;
  }
  const kState = (n) => (isLocked(n) ? "locked" : isOpen(n) ? "open" : "avail") + (n === now.today ? " today" : "") + (stars.has(n) ? " starred" : "");
  const kAria = (d) => `${T.date(d.d)}: ${d.bonus ? T.mtLower : T.chrLower + " " + chrName(d)}. ${isLocked(d.d) ? T.kLocked : isOpen(d.d) ? T.kOpen(L(d.gene)) : T.kAvail}`;
  function renderKaryo() {
    const el = $("#karyo"), W = Math.floor(el.clientWidth), H = Math.floor(el.clientHeight);
    if (!W || !H) return;
    state.kW = W; state.kH = H;
    const n = DAYS.length, slot = W / n, fs = slot >= 24 ? 10.5 : slot >= 17 ? 9.5 : 8.5;
    const top = 3, maxH = H - (fs + 6) - top, base = top + maxH, scale = maxH / 249;
    const bw = clamp(slot * 0.27, 3, 9), gap = clamp(slot * 0.09, 1.2, 4);
    const focusDay = now.today || Math.max(1, Math.min(now.day, CFG.last)) || 1;
    let g = `<defs><linearGradient id="kGrad" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#1E658C"/><stop offset=".36" stop-color="#7CC8DE"/><stop offset="1" stop-color="#134866"/></linearGradient><linearGradient id="kGradT" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#E07B2A"/><stop offset=".36" stop-color="#FFD0A3"/><stop offset="1" stop-color="#C2621F"/></linearGradient></defs>`;
    DAYS.forEach((d, i) => {
      const cx = i * slot + slot / 2;
      let inner = `<rect class="k-bg" x="${f1(i * slot + 1)}" y="0" width="${f1(slot - 2)}" height="${H}" rx="${f1(Math.min(4, slot / 4))}"/>`;
      if (d.chr === "MT") {
        const R = Math.min(bw + gap / 2 + 1, maxH / 4), sw = Math.max(2.2, bw * 0.48);
        inner += `<circle class="ring" cx="${f1(cx)}" cy="${f1(base - R - sw / 2)}" r="${f1(R)}" stroke-width="${f1(sw)}"/>`;
      } else {
        const pair = d.chr2 ? [[d.len, d.cen], [d.len2, d.cen2]] : [[d.len, d.cen], [d.len, d.cen]];
        pair.forEach(([len, cen], k) => {
          const h = Math.max(bw + 2.5, len * scale), x = cx - bw - gap / 2 + k * (bw + gap);
          inner += `<path class="body" d="${kPath(x, base - h, bw, h, cen / len)}"/>`;
        });
      }
      inner += `<path class="k-star" transform="translate(${f1(cx)},${f1(base - 4.5)}) scale(${slot >= 17 ? 0.62 : 0.5})" d="M0-7l2.1 4.3 4.7.7-3.4 3.3.8 4.7L0 3.8-4.2 6l.8-4.7-3.4-3.3 4.7-.7z"/>`;
      inner += `<text class="k-lab" x="${f1(cx)}" y="${H - 4}" font-size="${fs}">${d.chr === "MT" ? T.mtShort : d.chr2 ? "XY" : d.chr}</text>`;
      g += `<g class="k ${kState(d.d)}" data-k="${d.d}" role="button" tabindex="${d.d === focusDay ? 0 : -1}" aria-label="${kAria(d)}">${inner}</g>`;
    });
    el.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="group" aria-label="${T.karyoSvg}">${g}</svg>`;
  }
  function paintKaryo() {
    const gs = $$("#karyo [data-k]");
    if (!gs.length) { renderKaryo(); return; }
    gs.forEach((g) => {
      const n = +g.dataset.k, hot = g.classList.contains("hot");
      g.setAttribute("class", "k " + kState(n) + (hot ? " hot" : ""));
      g.setAttribute("aria-label", kAria(dayOf(n)));
    });
  }
  function tipHTML(n) {
    const d = dayOf(n), name = d.bonus ? T.mtFull : T.chromosome + " " + chrName(d);
    const line = isLocked(n) ? `<span>${T.tipLocked(n)}</span>`
      : isOpen(n) ? `<em>${L(d.gene)}</em> <span>· ${C(d).title}</span>`
      : `<span>${n === now.today ? T.tipToday : T.tipAvail}</span>`;
    return `<b>${name} · ${T.date(n)}</b>${line}`;
  }
  function showTip(g) {
    const tip = $("#ktip"), r = g.getBoundingClientRect(), s = $(".strip").getBoundingClientRect();
    tip.innerHTML = tipHTML(+g.dataset.k);
    const half = tip.offsetWidth / 2;
    tip.style.left = clamp(r.left + r.width / 2 - s.left, half + 8, s.width - half - 8) + "px";
    tip.classList.add("show");
  }
  const hideTip = () => $("#ktip").classList.remove("show");
  function link(n, on) {
    const w = winEl(n), k = kEl(n);
    if (w) w.classList.toggle("hot", on);
    if (k) k.classList.toggle("hot", on);
  }

  /* ---------- Стрічка: лічильник і дата ---------- */
  function renderMeta() {
    const cnt = DAYS.filter((d) => isOpen(d.d)).length, C = 2 * Math.PI * 7;
    const prog = $("#prog");
    prog.innerHTML = `<svg viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="7" fill="none" stroke="rgba(19,53,71,.18)" stroke-width="2.6"/><circle cx="9" cy="9" r="7" fill="none" stroke="#1E658C" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="${f1(cnt / CFG.last * C)} ${f1(C)}" transform="rotate(-90 9 9)"/></svg><span class="lbl">${T.opened}</span><b>${cnt} / ${CFG.last}</b>`;
    prog.setAttribute("aria-label", T.openedAria(cnt, CFG.last));
    const date = $("#date");
    let html = now.phase === "before" ? `<b>${T.start}</b><span class="lbl">${T.inDays(now.left)}</span>`
      : now.phase === "live" ? `<span class="lbl">${preview ? "" : T.todayLbl}</span><b>${T.date(now.day)}</b>`
      : `<span class="lbl">${T.cal}</span><b>${T.allOpen}</b>`;
    if (preview) html = `<span class="lbl">${T.preview}</span>${html}<a href="${location.pathname}" aria-label="${T.exitPreview}" title="${T.exitPreview}">×</a>`;
    date.innerHTML = html;
    date.classList.toggle("is-preview", !!preview);
    fitStrip();
  }
  /* Якщо перший рядок стрічки не вміщається, по черзі ховаємо підзаголовок, підписи та лічильник */
  function fitStrip() {
    const strip = $(".strip"), brand = $(".brand");
    strip.classList.remove("t1", "t2", "t3", "t4", "t5");
    for (const c of ["t1", "t2", "t3", "t4", "t5"]) {
      if (brand.scrollWidth <= brand.clientWidth + 1) break;
      strip.classList.add(c);
    }
  }
  function paint() {
    $("#wins").classList.toggle("pre", now.phase === "before");
    $$("#wins .win").forEach(paintWin);
    paintKaryo(); renderMeta();
  }

  /* ---------- Картка дня ---------- */
  const esc = (x) => String(x).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const extIcon = `<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4.5 2.5h5v5M9.5 2.5L3 9"/></svg>`;
  /* Позначка {n} у тексті стає посиланням на n-те джерело дня */
  function marker(d) {
    const refs = d.refs || [];
    return (x) => String(x).replace(/\{(\d+)\}/g, (m, n) => {
      const r = refs[n - 1];
      return r ? `<sup class="ref"><a href="${r[1]}" target="_blank" rel="noopener" title="${esc(L(r[0]))}" aria-label="${T.source} ${n}: ${esc(L(r[0]))}">${n}</a></sup>` : "";
    });
  }
  /* Абзац із кількох речень показуємо окремими фактами: так його легше охопити оком. Ділимо лише після джерела наприкінці речення */
  const facts = (txt, m) => {
    const parts = String(txt).replace(/(\.(?:\{\d+\})+)\s+/g, "$1\u0001").split("\u0001");
    return parts.length > 1 ? `<ul class="facts">${parts.map((p) => `<li>${m(p)}</li>`).join("")}</ul>` : `<div class="prose"><p>${m(txt)}</p></div>`;
  };
  /* Визначення: ген, що він кодує, і до якого типу належить цей продукт */
  const defHTML = (d) => (d.def ? `<div class="def"><span class="def-g"><small>${T.defGene}</small><em>${L(d.gene)}</em></span><i class="def-ar" aria-hidden="true">${arrow}</i><span class="def-p"><small>${T.defProd} · ${L(d.def.k)}</small><b>${L(d.def.p)}</b></span></div>` : "");
  const refsHTML = (d) => (d.refs && d.refs.length)
    ? `<details class="sect c-refs"><summary>${T.sources} · ${d.refs.length}</summary><ol class="refs">${d.refs.map((r) => `<li><a href="${r[1]}" target="_blank" rel="noopener">${L(r[0])}</a></li>`).join("")}</ol></details>` : "";
  /* Порада дня: текст залежить від обраного генотипу або групи */
  function tipHTML(d, c, m) {
    if (!c.tip || !c.tip.length) return "";
    return `<div class="sect tip" data-tip>
        <h4>${T.tip}</h4>
        <p class="tip-pick">${T.tipPick}</p>
        <div class="seg3${c.tip.length === 2 ? " two" : ""}" role="group" aria-label="${T.tipPick}">${c.tip.map((o, i) => `<button type="button" aria-pressed="${i === 0}"><b>${o.k}</b><small>${o.s}</small></button>`).join("")}</div>
        <p class="tip-t" aria-live="polite">${c.tip[0].t}</p>
        <p class="hf tip-f">${m(c.tip[0].f)}</p>
        ${c.tipNote ? `<p class="tip-n">${c.tipNote}</p>` : ""}
      </div>`;
  }
  function mountTip() {
    const box = $("#sheet [data-tip]");
    if (!box || typeof state.open !== "number") return;
    const d = dayOf(state.open), c = C(d), m = marker(d), btns = $$(".seg3 button", box);
    btns.forEach((b, i) => b.addEventListener("click", () => {
      btns.forEach((x, k) => x.setAttribute("aria-pressed", String(k === i)));
      $(".tip-t", box).textContent = c.tip[i].t;
      $(".tip-f", box).innerHTML = m(c.tip[i].f);
    }));
  }
  const pkgUrl = (p) => "https://apixmed.com.ua/" + (lang === "en" ? "en/" : "") + "product/" + p[0];
  const blogHTML = (d) => (d.blog && d.blog.length)
    ? `<div class="sect c-blog"><h4>${T.blog}</h4><div class="blog">${d.blog.map((b) => `<a class="blog-a" href="https://apixmed.com.ua/${lang === "en" ? "en/" : ""}blog/${b.slug}" target="_blank" rel="noopener"><span>${b[lang] || b.uk}</span>${extIcon}</a>`).join("")}</div></div>` : "";
  function mountMore() {
    const btn = $("#sheet .genes-more"), box = $("#sheet .genes");
    if (!btn || !box) return;
    btn.addEventListener("click", () => { const cut = box.classList.toggle("cut"); btn.textContent = cut ? T.showAll(+btn.dataset.n) : T.showLess; });
  }
  const topicIdx = () => (lang === "en" ? 3 : 2);
  function mapGenes(d) {
    const seen = new Set(), items = [];
    (d.chr2 ? [d.chr, d.chr2] : [d.chr]).flatMap((n) => MAP[n] || []).forEach((v) => { const k = v[1] + v[2]; if (!seen.has(k)) { seen.add(k); items.push(v); } });
    return items;
  }
  function cardHTML(d) {
    const c = C(d), gene = L(d.gene), items = mapGenes(d), label = d.chr === "MT" ? T.mtShort : (d.chr2 ? "X·Y" : d.chr), ti = topicIdx(), m = marker(d);
    /* Гени згруповано: назва, коротке пояснення і пов’язані ознаки з посиланнями на пакети */
    const GEN = window.ADVENT_GENES || {}, groups = [];
    items.forEach((v) => { let gr = groups.find((x) => x.g === v[1]); if (!gr) groups.push(gr = { g: v[1], t: [] }); gr.t.push(v); });
    const tchip = (v) => {
      const p = PKG[v[4]];
      return p ? `<a class="chip" href="${pkgUrl(p)}" target="_blank" rel="noopener" title="${esc(T.pkgTitle(p[lang === "en" ? 2 : 1]))}">${v[ti]}${extIcon}</a>` : `<span class="chip">${v[ti]}</span>`;
    };
    const geneRow = (gr) => {
      const x = GEN[gr.g], hero = gr.g === gene || gr.g.split("/").includes(gene);
      return `<div class="gene${hero ? " hero" : ""}"><div class="gene-h"><em>${gr.g}</em>${x ? `<span>${x[lang] || x.uk}</span>` : ""}</div><div class="chips">${gr.t.map(tchip).join("")}</div></div>`;
    };
    const chips = groups.length
      ? `<p class="chips-note">${T.pkgNote}</p><div class="genes${groups.length > 6 ? " cut" : ""}">${groups.map(geneRow).join("")}</div>${groups.length > 6 ? `<button type="button" class="btn genes-more" data-n="${groups.length}">${T.showAll(groups.length)}</button>` : ""}`
      : `<p class="caveat">${d.chr === "MT" ? T.noMt : T.noVars}</p>`;
    const ideo = `<div class="ideo c-ideo">
          <div class="big">${label}<small>${d.chr === "MT" ? T.mtLower : d.chr2 ? T.sex : T.pairOf}</small></div>
          <div class="chart-slot" data-ideo></div>
          <div class="i-facts">
            <div><b>${d.chr === "MT" ? T.mtBp : Viz.nf(d.len, d.len >= 100 ? 0 : 1, lang) + " " + T.mln}</b><span>${T.bp}</span></div>
            <div><b>≈ ${Viz.nf(d.genes, 0, lang)}</b><span>${d.chr === "MT" ? T.genesMt : T.genes}</span></div>
            <div><b>${items.length}</b><span>${T.regions}</span></div>
          </div>
          <div class="i-leg"><span><i class="dot"></i>${T.legGene}</span><span><i class="bar"></i>${T.legOther}</span></div>
        </div>`;
    const more = `<div class="sect c-more"><h4>${T.others}</h4>${chips}</div>`;
    const head = `<div class="c-head"><div class="rubric"><i></i>${kick(d)}</div>
        <h2 class="m-title">${c.title}</h2>
        <div class="geneline"><em>${gene}</em><span>${L(d.band)}</span></div></div>`;
    const tomorrow = d.d === now.today && d.d < CFG.last ? `<p class="next">${lockIcon}${T.next(d.d + 1)}</p>` : "";
    const vz = (slot) => (d.viz || []).map((v, k) => (v.after === slot && Viz.has(v.id) ? Viz.html(v, lang, m, k) : "")).join("");
    const body = d.ready
      ? `${vz("intro")}
          <div class="sect"><h4>${T.role}</h4>${defHTML(d)}<div class="prose"><p>${m(c.role)}</p></div></div>${vz("role")}
          <div class="sect"><h4>${T.known}</h4>${facts(c.known, m)}</div>${vz("known")}
          <div class="callout"><b>${T.not}</b>${m(c.not)}</div>${vz("not")}
          ${tipHTML(d, c, m)}${vz("hook")}
          ${refsHTML(d)}${blogHTML(d)}`
      : `<p class="standfirst" style="margin-top:14px">${m(c.hook)}</p>${vz("role")}${vz("hook")}${refsHTML(d)}${blogHTML(d)}`;
    /* На широкому екрані портрет хромосоми стоїть ліворуч і лишається на екрані під час читання;
       на вузькому порядок: заголовок, портрет, текст, інші гени */
    return `<div class="m-grid"><div class="col c-side">${ideo}</div><div class="col">${head}<div class="c-body">${body}${tomorrow}</div>${more}</div></div>`;
  }
  const closeBtn = () => `<button class="icon-btn" id="close" aria-label="${T.close}"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9"/></svg></button>`;
  /* Портрет хромосоми та інтерактивні графіки монтуються після вставлення картки в сторінку */
  let vizStops = [];
  function stopViz() { vizStops.forEach((f) => { try { f(); } catch (e) { /* графік уже знято */ } }); vizStops = []; }
  function mountIdeo() {
    const slot = $("#sheet [data-ideo]");
    if (!slot || typeof state.open !== "number") return;
    const d = dayOf(state.open);
    slot.innerHTML = Viz.ideogram(d, MAP, Math.floor(slot.clientWidth), T.ideo, topicIdx(), L(d.gene), L(d.band));
  }
  function mountViz(force) {
    const figs = $$("#sheet .viz");
    if (!figs.length || typeof state.open !== "number") return;
    if (!force && figs.every((f) => +f.querySelector(".viz-stage").dataset.w === Math.max(260, Math.floor(f.querySelector(".viz-stage").clientWidth)))) return;
    stopViz();
    const d = dayOf(state.open), m = marker(d);
    figs.forEach((f) => { const v = (d.viz || [])[+f.dataset.k]; if (v) vizStops.push(Viz.mount(f, lang, m, v)); });
  }
  function showSheet(html, narrow) {
    stopViz();
    const sheet = $("#sheet");
    sheet.className = "sheet" + (narrow ? " narrow" : "");
    sheet.innerHTML = html;
    $("#overlay").classList.add("open");
    if (TG) TG.back(true);
    $("#close").addEventListener("click", closeModal);
    $(".m-body", sheet).scrollTop = 0;
    $("#close").focus({ preventScroll: true });
  }
  function openCard(n) {
    const d = dayOf(n);
    if (!d || isLocked(n)) return;
    state.open = n;
    const avail = DAYS.map((x) => x.d).filter(isOpen), idx = avail.indexOf(n);
    showSheet(`
      <div class="m-head">
        <span class="m-day">${T.date(n)}</span>
        <span class="m-sub">${T.wdf[wday(n)]}${T.special[n] ? " · " + T.special[n] : ""}</span>
        <span class="sp"></span>
        <button class="icon-btn star-btn" id="star" aria-pressed="${stars.has(n)}" aria-label="${stars.has(n) ? T.unstar(n) : T.star(n)}">${starIcon}</button>
        <button class="icon-btn" id="prev" aria-label="${T.prevBtn}" ${idx <= 0 ? "disabled" : ""}><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg></button>
        <button class="icon-btn" id="next" aria-label="${T.nextBtn}" ${idx < 0 || idx >= avail.length - 1 ? "disabled" : ""}><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg></button>
        ${closeBtn()}
      </div>
      <div class="m-body">${cardHTML(d)}<p class="disc">${T.disclaimer}</p></div>`);
    $("#overlay").setAttribute("aria-label", `${T.date(n)}: ${kick(d)}`);
    $("#star").addEventListener("click", () => toggleStar(n));
    $("#prev").addEventListener("click", () => { if (idx > 0) openCard(avail[idx - 1]); });
    $("#next").addEventListener("click", () => { if (idx >= 0 && idx < avail.length - 1) openCard(avail[idx + 1]); });
    mountIdeo(); mountViz(true); mountTip(); mountMore();
  }
  function openInfo() {
    state.open = "info";
    const a = T.about;
    showSheet(`
      <div class="m-head"><span class="m-day">${T.info}</span><span class="sp"></span>${closeBtn()}</div>
      <div class="m-body about">
        <div class="rubric"><i></i>${a.rubric}</div>
        <h2>${a.title}</h2>
        <p class="lede">${a.lede}</p>
        <div class="sect"><h4>${a.how}</h4><ol>${a.steps.map((x) => `<li>${x}</li>`).join("")}</ol></div>
        <div class="sect"><h4>${a.kTitle}</h4>
          <p class="lede" style="font-size:14px;margin-bottom:12px">${a.kText}</p>
          <div class="legend"><span><i></i>${a.legend[0]}</span><span><i class="a"></i>${a.legend[1]}</span><span><i class="t"></i>${a.legend[2]}</span><span><i class="o"></i>${a.legend[3]}</span></div>
        </div>
        <div class="sect"><button class="btn" id="resetAll">${a.reset}</button></div>
        <p class="disc">${T.disclaimer} ${a.grch}</p>
      </div>`, true);
    $("#overlay").setAttribute("aria-label", T.info);
    $("#resetAll").addEventListener("click", () => { opened.clear(); persist(); paint(); closeModal(); toast(T.toastReset); });
  }
  function closeModal() {
    if (state.open === null) return;
    stopViz();
    $("#overlay").classList.remove("open");
    if (TG) TG.back(false);
    const back = state.open === "info" ? $("#info") : $(`#wins [data-win="${state.open}"] .inside`);
    state.open = null;
    if (back) back.focus({ preventScroll: true });
  }

  let toastT;
  function toggleStar(n) {
    if (stars.has(n)) stars.delete(n); else stars.add(n);
    persistStars();
    if (TG) TG.haptic("light");
    const w = winEl(n);
    if (w) paintWin(w);
    paintKaryo();
    const b = $("#star");
    if (b && state.open === n) { b.setAttribute("aria-pressed", String(stars.has(n))); b.setAttribute("aria-label", stars.has(n) ? T.unstar(n) : T.star(n)); }
    toast(stars.has(n) ? T.starOn(n) : T.starOff(n));
  }
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2600);
  }

  /* ---------- Події ---------- */
  $("#wins").addEventListener("click", (e) => {
    const q = (s) => e.target.closest(s);
    let el;
    if ((el = q("[data-star]"))) toggleStar(+el.dataset.star);
    else if ((el = q("[data-flap]"))) { const n = +el.dataset.flap; if (isLocked(n)) refuse(n); else setWin(n, !opened.has(n), true); }
    else if ((el = q("[data-shut]"))) { setWin(+el.dataset.shut, false); const f = $(`#wins [data-flap="${el.dataset.shut}"]`); if (f) f.focus({ preventScroll: true }); }
    else if ((el = q("[data-read]"))) openCard(+el.dataset.read);
  });
  const karyo = $("#karyo");
  karyo.addEventListener("click", (e) => { const g = e.target.closest("[data-k]"); if (g) { hideTip(); activate(+g.dataset.k); } });
  karyo.addEventListener("keydown", (e) => {
    const g = e.target.closest("[data-k]");
    if (!g) return;
    const n = +g.dataset.k;
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(n); return; }
    const to = e.key === "ArrowRight" ? n + 1 : e.key === "ArrowLeft" ? n - 1 : e.key === "Home" ? 1 : e.key === "End" ? CFG.last : 0;
    const next = to && kEl(clamp(to, 1, CFG.last));
    if (next) { e.preventDefault(); g.setAttribute("tabindex", "-1"); next.setAttribute("tabindex", "0"); next.focus(); }
  });
  karyo.addEventListener("focusin", (e) => { const g = e.target.closest("[data-k]"); if (g && g.matches(":focus-visible")) { showTip(g); link(+g.dataset.k, true); } });
  karyo.addEventListener("focusout", (e) => { const g = e.target.closest("[data-k]"); if (g) { hideTip(); link(+g.dataset.k, false); } });
  karyo.addEventListener("pointerover", (e) => { const g = e.target.closest("[data-k]"); if (g && e.pointerType === "mouse") { showTip(g); link(+g.dataset.k, true); } });
  karyo.addEventListener("pointerout", (e) => { const g = e.target.closest("[data-k]"); if (g && !g.contains(e.relatedTarget)) { hideTip(); link(+g.dataset.k, false); } });
  $("#wins").addEventListener("pointerover", (e) => { const w = e.target.closest(".win"); if (w && e.pointerType === "mouse") { const k = kEl(+w.dataset.win); if (k) k.classList.add("hot"); } });
  $("#wins").addEventListener("pointerout", (e) => { const w = e.target.closest(".win"); if (w && !w.contains(e.relatedTarget)) { const k = kEl(+w.dataset.win); if (k) k.classList.remove("hot"); } });
  $("#info").addEventListener("click", openInfo);
  $("#overlay").addEventListener("click", (e) => { if (e.target.id === "overlay") closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (state.open === null) return;
    if (e.key === "Escape") { closeModal(); return; }
    if (typeof state.open === "number" && !(e.target.closest && e.target.closest(".viz"))) {
      if (e.key === "ArrowLeft") $("#prev").click();
      if (e.key === "ArrowRight") $("#next").click();
    }
    if (e.key === "Tab") {                                  // фокус лишається в межах картки
      const f = $$("#sheet button:not([disabled]), #sheet a[href], #sheet input, #sheet [tabindex='0']");
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!$("#sheet").contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    }
  });

  /* Розмір вікна: інша мозаїка, перемальована каріограма */
  let raf = 0;
  function onResize() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      fitStrip();
      layout();
      const k = $("#karyo");
      if (Math.floor(k.clientWidth) !== state.kW || Math.floor(k.clientHeight) !== state.kH) renderKaryo();
      mountIdeo(); mountViz(false);
    });
  }
  if (window.ResizeObserver) { const ro = new ResizeObserver(onResize); ro.observe($("#wins")); ro.observe($("#karyo")); }
  window.addEventListener("resize", onResize);

  /* Опівночі відчиняється наступне віконце без перезавантаження сторінки */
  function tick() {
    const c = clock();
    if (c.day !== now.day || c.phase !== now.phase || c.left !== now.left) { now = c; paint(); }
  }
  setInterval(tick, 30000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) tick(); });

  /* Легкий сніг */
  (function snow() {
    const cv = $("#snow");
    if (!cv || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d");
    let W, H, flakes;
    const init = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
      flakes = Array.from({ length: 26 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: (Math.random() * 1.3 + .6) * dpr, v: (Math.random() * .3 + .12) * dpr, p: Math.random() * 6.28, a: Math.random() * .45 + .2 }));
    };
    init(); window.addEventListener("resize", init);
    let odd = false;
    (function frame(t) {
      requestAnimationFrame(frame);
      odd = !odd;
      if (odd || document.hidden || state.open !== null) return;
      ctx.clearRect(0, 0, W, H);
      flakes.forEach((f) => {
        f.y += f.v * 2; f.x += Math.sin(t / 1600 + f.p) * .5;
        if (f.y > H + 10) { f.y = -10; f.x = Math.random() * W; }
        ctx.beginPath(); ctx.fillStyle = `rgba(255,255,255,${f.a})`; ctx.arc(f.x, f.y, f.r, 0, 6.28); ctx.fill();
      });
    })(0);
  })();

  /* ---------- Мова ---------- */
  function applyStatic() {
    document.documentElement.lang = lang;
    document.title = T.title;
    const md = $('meta[name="description"]'); if (md) md.setAttribute("content", T.desc);
    $(".brand .ttl b").textContent = T.name;
    $(".brand .ttl small").textContent = T.sub;
    $("#karyo").setAttribute("aria-label", T.karyoAria);
    $(".board").setAttribute("aria-label", T.boardAria);
    $("#info").setAttribute("aria-label", T.info); $("#info").setAttribute("title", T.info);
    $("#lang").setAttribute("aria-label", T.langAria);
    $$("#lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  }
  function renderBoard() {
    $("#wins").innerHTML = DAYS.map(winHTML).join("");
    state.layout = null;
    layout();
  }
  function setLang(l) {
    if (!STR[l] || l === lang) return;
    lang = l; T = STR[l];
    try { localStorage.setItem(CFG.storeKey + ":lang", l); } catch (e) { /* приватний режим */ }
    applyStatic(); renderBoard(); renderKaryo(); paint();
    $$("#wins .win").forEach((el) => { el.style.animation = "none"; });      // без повторної появи віконець
    if (typeof state.open === "number") openCard(state.open); else if (state.open === "info") openInfo();
  }
  $("#lang").addEventListener("click", (e) => { const b = e.target.closest("[data-lang]"); if (b) setLang(b.dataset.lang); });

  /* ---------- Старт ---------- */
  applyStatic();
  renderBoard();
  renderKaryo();
  paint();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { state.kW = 0; onResize(); });

  /* ---------- Усередині Telegram ---------- */
  if (TG && TG.inside) {
    TG.init({ closeCard: closeModal });
    // відчинені віконця й зірочки зберігаються в хмарі Telegram, тож вони однакові на всіх пристроях людини
    if (!preview) TG.cloudLoad(["opened", "stars"], (v) => {
      const merge = (set, raw) => { let ch = false; try { (JSON.parse(raw || "[]") || []).forEach((n) => { if (Number.isInteger(n) && n >= 1 && n <= CFG.last && !set.has(n)) { set.add(n); ch = true; } }); } catch (e) { /* зіпсований запис ігноруємо */ } return ch; };
      const a = merge(opened, v.opened), b = merge(stars, v.stars);
      if (a) persist();
      if (b) persistStars();
      if (a || b) paint();
    });
    // перехід із нагадування бота: одразу відчиняємо потрібний день
    const sd = TG.startDay;
    if (sd && dayOf(sd) && !isLocked(sd)) { setWin(sd, true); setTimeout(() => openCard(sd), 400); }
  }
})();
