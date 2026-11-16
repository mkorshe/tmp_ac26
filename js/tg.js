/* «23 пари» · календар як мінізастосунок Telegram-бота.
   Якщо в налаштуваннях задано бота (ADVENT_TG_CONF.bot у index.html), у звичайному браузері замість календаря
   показуємо запрошення зареєструватися в боті. Це «м’який замок»: він спрямовує людей у бота, але не захищає вміст,
   бо сторінка та її код публічні. Усередині Telegram додаємо зручності: кнопку «Назад», вібровідгук,
   збереження відчинених віконець і зірочок у хмарі Telegram, відкриття потрібного дня з нагадування. */
(function () {
  "use strict";
  const CONF = window.ADVENT_TG_CONF || {};
  const q = new URLSearchParams(location.search);
  const local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  // Лише на локальному сервері, для перевірки: ?tgfake=1 імітує Telegram, ?gatebot=назва вмикає замок
  if (local && q.get("tgfake")) {
    const store = {};
    window.Telegram = { WebApp: { initData: "fake", initDataUnsafe: { user: { id: 1, first_name: "Test", language_code: "uk" }, start_param: q.get("startapp") || "" },
      ready() {}, expand() {}, isVersionAtLeast: () => true, openLink(u) { window.__tgOpened = u; },
      BackButton: { shown: false, cb: null, show() { this.shown = true; }, hide() { this.shown = false; }, onClick(f) { this.cb = f; } },
      HapticFeedback: { n: 0, impactOccurred() { this.n++; } },
      CloudStorage: { store, getItems(keys, cb) { cb(null, Object.fromEntries(keys.map((k) => [k, store[k] || ""]))); }, setItem(k, v, cb) { store[k] = v; if (cb) cb(null, true); } } } };
  }
  const tg = window.Telegram && window.Telegram.WebApp;
  const inside = !!(tg && tg.initData);
  const bot = String(local ? q.get("gatebot") || "" : CONF.bot || "").replace(/^@/, "");
  const gated = !!bot && !inside;
  const u = (inside && tg.initDataUnsafe) || {};
  const m = /^(?:day)?(\d{1,2})$/.exec(String(u.start_param || q.get("open") || ""));
  const cloud = () => inside && tg.CloudStorage && tg.isVersionAtLeast && tg.isVersionAtLeast("6.9");

  // Екран-запрошення для тих, хто відкрив сторінку не з Telegram
  if (gated) {
    // мова запрошення така сама, як у календарі: українська, якщо людина не обирала англійську
    let en = q.get("lang") === "en";
    try { if (!q.get("lang")) en = localStorage.getItem("apixmedAdvent2026:lang") === "en"; } catch (e) { /* приватний режим */ }
    const t = en
      ? { k: "Apixmed Prism advent calendar", h: "“23 pairs” opens in Telegram", p: "Register with the bot in one tap and the calendar opens right inside Telegram.",
        li: ["A new door every day from 1 to 24 December", "A reminder at the time that suits you", "Genetics in plain words, with links to the research"], b: "Open in Telegram",
        n: "Already registered? Open the bot and tap the “Calendar” button." }
      : { k: "Адвент-календар Apixmed Prism", h: "«23 пари» відкривається в Telegram", p: "Зареєструйтеся в боті одним дотиком, і календар відкриється просто в Telegram.",
        li: ["Нове віконце щодня з 1 по 24 грудня", "Нагадування у зручний для вас час", "Генетика простими словами з посиланнями на дослідження"], b: "Відкрити в Telegram",
        n: "Уже зареєстровані? Відкрийте бота й натисніть кнопку «Календар»." };
    document.documentElement.classList.add("tg-gate");
    const el = document.createElement("div");
    el.className = "gate";
    el.innerHTML = `<div class="gate-card" role="dialog" aria-modal="true" aria-labelledby="gate-h">
        <img src="assets/logo/logo-light.svg" alt="Apixmed Prism" width="190" height="28">
        <p class="gate-k">${t.k}</p>
        <h1 id="gate-h">${t.h}</h1>
        <p class="gate-p">${t.p}</p>
        <ul>${t.li.map((x) => `<li>${x}</li>`).join("")}</ul>
        <a class="gate-btn" href="https://t.me/${encodeURIComponent(bot)}?start=site"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M21 3 2.5 10.6l5.6 2 2 6.2 3-3.3 4.9 3.7L21 3Zm-11.2 9.9 7-5.4-5.6 6.5-.4 2.6-1-3.7Z"/></svg><span>${t.b}</span></a>
        <p class="gate-n">${t.n}</p>
      </div>`;
    document.body.appendChild(el);
  }

  window.AdventTG = {
    inside, gated, bot, startDay: m ? +m[1] : 0, user: u.user || null,
    /* hooks: { closeCard() } — календар передає, як закрити відкриту картку */
    init(hooks) {
      if (!inside) return;
      try {
        tg.ready(); tg.expand();
        if (tg.disableVerticalSwipes) tg.disableVerticalSwipes();      // щоб прокручування картки не згортало застосунок
        if (tg.setHeaderColor) tg.setHeaderColor("#F4FCFF");
        if (tg.setBackgroundColor) tg.setBackgroundColor("#F4FCFF");
        if (tg.BackButton) tg.BackButton.onClick(() => hooks.closeCard());
      } catch (e) { /* старіші версії Telegram частини цих можливостей не мають */ }
      document.documentElement.classList.add("in-tg");
      // зовнішні посилання (джерела, пакети, блог) відкриваємо засобами Telegram, а не всередині календаря
      document.addEventListener("click", (e) => {
        const a = e.target.closest && e.target.closest('a[href^="http"]');
        if (!a || !tg.openLink) return;
        e.preventDefault();
        if (/^https:\/\/t\.me\//.test(a.href) && tg.openTelegramLink) tg.openTelegramLink(a.href); else tg.openLink(a.href);
      }, true);
      // позначка для бота: людина відкрила календар (потрібна для підрахунку воронки)
      if (CONF.api) fetch(String(CONF.api).replace(/\/$/, "") + "/api/open", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ initData: tg.initData }) }).catch(() => {});
    },
    back(on) { try { if (inside && tg.BackButton) { if (on) tg.BackButton.show(); else tg.BackButton.hide(); } } catch (e) { /* без кнопки «Назад» */ } },
    haptic(kind) { try { if (inside && tg.HapticFeedback) tg.HapticFeedback.impactOccurred(kind || "light"); } catch (e) { /* без вібровідгуку */ } },
    cloudLoad(keys, cb) { if (!cloud()) return; try { tg.CloudStorage.getItems(keys, (err, vals) => { if (!err && vals) cb(vals); }); } catch (e) { /* хмара недоступна */ } },
    cloudSave(key, val) { if (!cloud()) return; try { tg.CloudStorage.setItem(key, val, () => {}); } catch (e) { /* хмара недоступна */ } }
  };
})();
