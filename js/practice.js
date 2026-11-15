/* «23 пари» · практичні 3D-лічильники: келих (скільки чистого спирту в порції) і чашки (скільки кофеїну за день).
   Предмети об’ємні й справжні за пропорціями, але без сторонніх бібліотек і завантажених моделей: келих, склянка,
   чарка, чашка й блюдце — тіла обертання, які будуємо тут із профілю (у сантиметрах), тож їх можна наповнювати
   до потрібного рівня. Малює WebGL; якщо він недоступний, лічильник працює без 3D-сцени. */
(function () {
  "use strict";
  const reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rgb = (h) => [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255];
  const nf = (n, d, lang) => Number(n).toLocaleString(lang === "en" ? "en-GB" : "uk-UA", { minimumFractionDigits: d, maximumFractionDigits: d }).replace(/ /g, " ");
  const SEG = 56;

  /* ---------- Геометрія ---------- */
  // Тіло обертання з профілю [[радіус, висота], …]; подвоєна точка профілю дає чітке ребро
  function lathe(profile) {
    const n = profile.length, P = new Float32Array(n * (SEG + 1) * 3), N = new Float32Array(n * (SEG + 1) * 3), I = [];
    for (let i = 0; i < n; i++) {
      let a = profile[Math.max(0, i - 1)], b = profile[Math.min(n - 1, i + 1)];
      if (i > 0 && profile[i - 1][0] === profile[i][0] && profile[i - 1][1] === profile[i][1]) a = profile[i];
      else if (i < n - 1 && profile[i + 1][0] === profile[i][0] && profile[i + 1][1] === profile[i][1]) b = profile[i];
      let tr = b[0] - a[0], ty = b[1] - a[1];
      const tl = Math.hypot(tr, ty) || 1;
      tr /= tl; ty /= tl;
      for (let s = 0; s <= SEG; s++) {
        const ang = s / SEG * Math.PI * 2, c = Math.cos(ang), sn = Math.sin(ang), k = (i * (SEG + 1) + s) * 3;
        P[k] = profile[i][0] * c; P[k + 1] = profile[i][1]; P[k + 2] = profile[i][0] * sn;
        N[k] = ty * c; N[k + 1] = -tr; N[k + 2] = ty * sn;
      }
    }
    for (let i = 0; i < n - 1; i++) for (let s = 0; s < SEG; s++) { const a = i * (SEG + 1) + s, b = a + SEG + 1; I.push(a, b, a + 1, a + 1, b, b + 1); }
    return { P, N, I: new Uint16Array(I) };
  }
  // Трубка вздовж кривої в площині XY (ручка чашки)
  function tube(path, rad) {
    const n = path.length, R = 14, P = new Float32Array(n * (R + 1) * 3), N = new Float32Array(n * (R + 1) * 3), I = [];
    for (let i = 0; i < n; i++) {
      const a = path[Math.max(0, i - 1)], b = path[Math.min(n - 1, i + 1)];
      let tx = b[0] - a[0], ty = b[1] - a[1];
      const tl = Math.hypot(tx, ty) || 1;
      tx /= tl; ty /= tl;
      for (let s = 0; s <= R; s++) {
        const ang = s / R * Math.PI * 2, c = Math.cos(ang), sn = Math.sin(ang), k = (i * (R + 1) + s) * 3;
        const nx = -ty * c, ny = tx * c, nz = sn;
        P[k] = path[i][0] + nx * rad; P[k + 1] = path[i][1] + ny * rad; P[k + 2] = nz * rad;
        N[k] = nx; N[k + 1] = ny; N[k + 2] = nz;
      }
    }
    for (let i = 0; i < n - 1; i++) for (let s = 0; s < R; s++) { const a = i * (R + 1) + s, b = a + R + 1; I.push(a, b, a + 1, a + 1, b, b + 1); }
    return { P, N, I: new Uint16Array(I) };
  }
  const bezier = (p0, p1, p2, p3, steps) => Array.from({ length: steps + 1 }, (_, i) => { const t = i / steps, u = 1 - t; return [u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]]; });

  /* Посудина: wall — зовнішній профіль від центра дна до вінця, rim — вінце, cav — порожнина від дна до вінця */
  const VESSEL = {
    wine: { wall: [[0, 0], [3.3, 0], [3.45, 0.08], [3.45, 0.16], [2.6, 0.32], [1.4, 0.5], [0.7, 0.75], [0.45, 1.2], [0.38, 2.2], [0.36, 4], [0.38, 5.8], [0.48, 6.6], [0.75, 7.2], [1.4, 7.75], [2.3, 8.5], [3.1, 9.6], [3.65, 11], [3.9, 12.6], [3.9, 14], [3.7, 15.6], [3.4, 17], [3.25, 17.8]],
      rim: [[3.2, 17.86]], cav: [[0, 7.75], [0.7, 7.85], [1.35, 8.15], [2.2, 8.75], [2.98, 9.75], [3.52, 11.05], [3.78, 12.6], [3.78, 14], [3.58, 15.6], [3.29, 17], [3.15, 17.8]] },
    beer: { wall: [[0, 0], [2.9, 0], [3.05, 0.12], [3.1, 0.3], [3.35, 5], [3.75, 11], [4, 15.2], [4, 15.6]],
      rim: [[3.93, 15.66]], cav: [[0, 0.9], [2.75, 0.9], [2.95, 1.1], [3.22, 5], [3.62, 11], [3.86, 15.6]] },
    shot: { wall: [[0, 0], [1.75, 0], [1.9, 0.1], [1.95, 0.3], [2.45, 6], [2.45, 6.2]],
      rim: [[2.4, 6.25]], cav: [[0, 1.3], [1.6, 1.3], [1.78, 1.5], [2.33, 6.2]] },
    cup: { wall: [[0, 0], [2.1, 0], [2.3, 0.1], [2.35, 0.35], [2.9, 1], [3.55, 2.6], [3.95, 4.6], [4.1, 6.3], [4.12, 6.9]],
      rim: [[4.05, 6.97]], cav: [[0, 0.6], [2, 0.62], [2.7, 1.1], [3.35, 2.65], [3.76, 4.6], [3.92, 6.3], [3.95, 6.9]] }
  };
  const SAUCER = [[0, -0.2], [2.6, -0.2], [2.8, -0.12], [5.2, 0.35], [5.45, 0.52], [5.4, 0.6], [5.4, 0.6], [5.2, 0.5], [2.9, 0.08], [2.4, 0], [0, 0]];
  const shell = (v) => lathe(v.wall.concat(v.rim, v.cav.slice().reverse()));
  // об’єм порожнини (мл = см³) до висоти y: сума зрізаних конусів
  function volume(cav, y) {
    let v = 0;
    for (let i = 1; i < cav.length; i++) {
      const a = cav[i - 1], b = cav[i];
      if (y <= a[1]) break;
      const top = Math.min(y, b[1]), h = top - a[1], r2 = b[1] === a[1] ? b[0] : a[0] + (b[0] - a[0]) * (top - a[1]) / (b[1] - a[1]);
      v += Math.PI * h * (a[0] * a[0] + a[0] * r2 + r2 * r2) / 3;
    }
    return v;
  }
  function levelFor(cav, ml) {
    let lo = cav[0][1], hi = cav[cav.length - 1][1];
    for (let i = 0; i < 26; i++) { const mid = (lo + hi) / 2; if (volume(cav, mid) < ml) lo = mid; else hi = mid; }
    return (lo + hi) / 2;
  }
  // рідина: порожнина до рівня y, зверху пласка поверхня
  function liquid(cav, y) {
    const pts = [[0, cav[0][1] + 0.03]];
    let r = 0;
    for (let i = 1; i < cav.length; i++) {
      const a = cav[i - 1], b = cav[i];
      if (b[1] <= y) { pts.push([b[0] * 0.985, Math.max(b[1], cav[0][1] + 0.03)]); r = b[0]; continue; }
      r = b[1] === a[1] ? b[0] : a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]);
      break;
    }
    pts.push([r * 0.985, y], [r * 0.985, y], [0, y]);
    return lathe(pts);
  }

  /* ---------- Сцена WebGL ---------- */
  const VS = `attribute vec3 aPos; attribute vec3 aNor; uniform mat4 uMVP; uniform mat4 uMV; uniform vec4 uInst; varying vec3 vN; varying vec3 vV;
    void main(){ vec3 p = aPos * uInst.w + uInst.xyz; vec4 mv = uMV * vec4(p, 1.0); vN = mat3(uMV) * aNor; vV = -mv.xyz; gl_Position = uMVP * vec4(p, 1.0); }`;
  const FS = `precision mediump float; varying vec3 vN; varying vec3 vV; uniform vec3 uColor; uniform float uGlass; uniform float uAlpha; uniform float uShine;
    void main(){
      vec3 N = normalize(vN); vec3 V = normalize(vV);
      if (dot(N, V) < 0.0) N = -N;
      float f = 1.0 - max(dot(N, V), 0.0);
      vec3 L1 = normalize(vec3(0.45, 0.75, 0.55)); vec3 L2 = normalize(vec3(-0.62, 0.3, 0.4));
      float s1 = pow(max(dot(reflect(-L1, N), V), 0.0), uShine);
      float s2 = pow(max(dot(reflect(-L2, N), V), 0.0), uShine * 0.6) * 0.45;
      vec3 c; float a;
      if (uGlass > 0.5) {
        a = 0.05 + pow(f, 2.3) * 0.6 + (s1 + s2) * 0.9;
        c = mix(vec3(0.88, 0.95, 0.99), vec3(0.22, 0.48, 0.64), pow(f, 1.7)) + vec3(s1 + s2);
      } else {
        float d = 0.5 + 0.56 * max(dot(N, L1), 0.0) + 0.2 * max(dot(N, L2), 0.0);
        c = uColor * d + vec3(s1 * 0.5 + s2 * 0.28) + uColor * pow(f, 3.0) * 0.3;
        a = uAlpha;
      }
      a = clamp(a, 0.0, 1.0);
      gl_FragColor = vec4(min(c, vec3(1.0)) * a, a);
    }`;
  const m4 = {
    persp(fovy, asp, n, f) { const t = 1 / Math.tan(fovy / 2), o = new Float32Array(16); o[0] = t / asp; o[5] = t; o[10] = (f + n) / (n - f); o[11] = -1; o[14] = 2 * f * n / (n - f); return o; },
    view(yaw, pitch, dist) { const cy = Math.cos(yaw), sy = Math.sin(yaw), cx = Math.cos(pitch), sx = Math.sin(pitch), o = new Float32Array(16); o[0] = cy; o[1] = sx * sy; o[2] = -cx * sy; o[5] = cx; o[6] = sx; o[8] = sy; o[9] = -sx * cy; o[10] = cx * cy; o[14] = -dist; o[15] = 1; return o; },
    mul(a, b) { const o = new Float32Array(16); for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3]; return o; }
  };
  const FOV = 26 * Math.PI / 180;

  function scene(canvas) {
    let gl = null;
    try { gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true }); } catch (e) { gl = null; }
    if (!gl) return null;
    const mk = (t, s) => { const sh = gl.createShader(t); gl.shaderSource(sh, s); gl.compileShader(sh); return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null; };
    const vs = mk(gl.VERTEX_SHADER, VS), fs = mk(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return null;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.bindAttribLocation(prog, 0, "aPos"); gl.bindAttribLocation(prog, 1, "aNor"); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
    const U = {};
    ["uMVP", "uMV", "uInst", "uColor", "uGlass", "uAlpha", "uShine"].forEach((n) => { U[n] = gl.getUniformLocation(prog, n); });
    const objs = {};
    const st = { yaw: -0.5, pitch: 0.24, center: [0, 0, 0], rx: 10, ry: 10, W: 1, H: 1, raf: 0, dead: false, seen: true, t0: 0, sway: !reduce, drag: null };
    const buf = (target, data) => { const b = gl.createBuffer(); gl.bindBuffer(target, b); gl.bufferData(target, data, gl.DYNAMIC_DRAW); return b; };
    function set(name, mesh, mat, inst) {
      const old = objs[name];
      if (old) { gl.deleteBuffer(old.vbo); gl.deleteBuffer(old.nbo); gl.deleteBuffer(old.ibo); delete objs[name]; }
      if (mesh) objs[name] = { vbo: buf(gl.ARRAY_BUFFER, mesh.P), nbo: buf(gl.ARRAY_BUFFER, mesh.N), ibo: buf(gl.ELEMENT_ARRAY_BUFFER, mesh.I), count: mesh.I.length,
        glass: !!mat.glass, color: rgb(mat.color || "#ffffff"), alpha: mat.alpha === undefined ? 1 : mat.alpha, shine: mat.shine || 40, inst: inst || [[0, 0, 0, 1]] };
      request();
    }
    const place = (name, inst) => { if (objs[name]) { objs[name].inst = inst; request(); } };
    const frame = (center, rx, ry) => { st.center = center; st.rx = rx; st.ry = ry; request(); };   // rx, ry — пів-ширина й пів-висота того, що має вміститися
    function resize() {
      const r = canvas.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      st.W = Math.max(1, r.width); st.H = Math.max(1, r.height);
      const w = Math.round(st.W * dpr), h = Math.round(st.H * dpr);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      request();
    }
    function draw(now) {
      const asp = st.W / st.H, half = Math.tan(FOV / 2), dist = Math.max(st.ry / half, st.rx / half / asp) * 1.12;
      const yaw = st.yaw + (st.sway && !st.drag ? Math.sin((now - st.t0) / 2600) * 0.32 : 0);
      const mv = m4.view(yaw, st.pitch, dist), mvp = m4.mul(m4.persp(FOV, asp, dist * 0.2, dist * 3), mv);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.useProgram(prog); gl.uniformMatrix4fv(U.uMVP, false, mvp); gl.uniformMatrix4fv(U.uMV, false, mv);
      gl.enable(gl.DEPTH_TEST); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      const one = (o) => {
        gl.bindBuffer(gl.ARRAY_BUFFER, o.vbo); gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, o.nbo); gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.ibo);
        gl.uniform3fv(U.uColor, o.color); gl.uniform1f(U.uGlass, o.glass ? 1 : 0); gl.uniform1f(U.uAlpha, o.alpha); gl.uniform1f(U.uShine, o.shine);
        o.inst.forEach((p) => { gl.uniform4f(U.uInst, p[0] - st.center[0], p[1] - st.center[1], p[2] - st.center[2], p[3]); gl.drawElements(gl.TRIANGLES, o.count, gl.UNSIGNED_SHORT, 0); });
      };
      const all = Object.values(objs);
      gl.disable(gl.CULL_FACE); gl.depthMask(true);
      all.filter((o) => !o.glass).forEach(one);                    // спершу непрозоре й рідини
      gl.depthMask(false); gl.enable(gl.CULL_FACE);
      gl.cullFace(gl.FRONT); all.filter((o) => o.glass).forEach(one);  // скло: спершу дальні стінки, потім ближні
      gl.cullFace(gl.BACK); all.filter((o) => o.glass).forEach(one);
      gl.depthMask(true); gl.disable(gl.CULL_FACE);
    }
    function tick(now) {
      st.raf = 0;
      if (st.dead || !canvas.isConnected) return;
      if (!st.t0) st.t0 = now;
      draw(now);
      if (st.seen && (st.sway || st.anim) && !st.drag) request();
    }
    function request() { if (!st.raf && !st.dead) st.raf = requestAnimationFrame(tick); }
    const down = (e) => { st.drag = { x: e.clientX, y: e.clientY, touch: e.pointerType === "touch" }; st.sway = false; try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* без захоплення теж працює */ } };
    const move = (e) => {
      if (!st.drag) return;
      st.yaw += (e.clientX - st.drag.x) * 0.012;
      if (!st.drag.touch) st.pitch = clamp(st.pitch + (e.clientY - st.drag.y) * 0.008, 0.04, 0.85);
      st.drag.x = e.clientX; st.drag.y = e.clientY;
      request();
    };
    const up = () => { st.drag = null; };
    canvas.addEventListener("pointerdown", down); canvas.addEventListener("pointermove", move); canvas.addEventListener("pointerup", up); canvas.addEventListener("pointercancel", up);
    let io = null, ro = null;
    if ("IntersectionObserver" in window) { io = new IntersectionObserver((en) => { st.seen = en[0].isIntersecting; if (st.seen) request(); }); io.observe(canvas); }
    if ("ResizeObserver" in window) { ro = new ResizeObserver(resize); ro.observe(canvas); }
    resize();
    return { set, place, frame, anim(on) { st.anim = on; if (on) request(); }, request,
      destroy() { st.dead = true; cancelAnimationFrame(st.raf); if (io) io.disconnect(); if (ro) ro.disconnect(); const x = gl.getExtension("WEBGL_lose_context"); if (x) x.loseContext(); } };
  }
  // плавна зміна числа (рівень рідини)
  function glide(get, set, to, done) {
    if (reduce) { set(to); if (done) done(); return () => {}; }
    let raf = 0;
    const step = () => { const v = get(), d = to - v; if (Math.abs(d) < 0.4) { set(to); if (done) done(); return; } set(v + d * 0.2); raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }

  /* ---------- День 12: келих ---------- */
  const DRINKS = [
    { id: "wine", vessel: "wine", ml: 150, min: 50, max: 300, step: 10, abv: 12, a0: 8, a1: 16, color: "#6E1029", alpha: 0.97 },
    { id: "beer", vessel: "beer", ml: 500, min: 100, max: 500, step: 10, abv: 5, a0: 3, a1: 9, color: "#D9981F", alpha: 1, foam: true },
    { id: "spirit", vessel: "shot", ml: 50, min: 20, max: 60, step: 5, abv: 40, a0: 30, a1: 50, color: "#C98A2B", alpha: 0.93 }
  ];
  function drink(stage, t, lang, W, v) {
    const st = { i: 0, ml: DRINKS[0].ml, abv: DRINKS[0].abv, shown: 0 };
    stage.innerHTML = `<div class="pr">
      <div class="seg3 pr-kind" role="group" aria-label="${t.pick}">${DRINKS.map((d, i) => `<button type="button" aria-pressed="${i === 0}"><b>${t.kinds[i][0]}</b><small>${t.kinds[i][1]}</small></button>`).join("")}</div>
      <div class="pr-main">
        <div class="pr-stage"><canvas aria-label="${t.alt}" role="img"></canvas><i class="pr-floor"></i><span class="pr-drag">${t.drag}</span></div>
        <div class="pr-side">
          <label class="pr-range"><span>${t.vol}: <b class="pr-ml"></b></span><input type="range" class="pr-vol" aria-label="${t.vol}"></label>
          <div class="pr-step"><span>${t.abv}</span><button type="button" class="pr-minus" aria-label="${t.less}">−</button><b class="pr-abv"></b><button type="button" class="pr-plus" aria-label="${t.more}">+</button></div>
          <div class="pr-out" aria-live="polite"><b class="pr-g"></b><span class="pr-gl">${t.grams}</span><div class="pr-units"></div><p class="pr-n"></p></div>
        </div>
      </div>
      <p class="pr-well">${t.well}</p>
      <p class="pr-how">${t.how}</p>
    </div>`;
    const $ = (s) => stage.querySelector(s), canvas = $("canvas"), sc = scene(canvas);
    if (!sc) $(".pr-stage").classList.add("no3");
    let stopGlide = () => {};
    const fill = (ml) => {
      st.shown = ml;
      if (!sc) return;
      const d = DRINKS[st.i], V = VESSEL[d.vessel], y = levelFor(V.cav, ml);
      sc.set("liquid", liquid(V.cav, y), { color: d.color, alpha: d.alpha, shine: 70 });
      if (d.foam) sc.set("foam", lathe([[0, y], [0, y], [liquidR(V.cav, y) * 0.985, y], [liquidR(V.cav, y + 0.9) * 0.985, y + 0.9], [liquidR(V.cav, y + 0.9) * 0.985, y + 0.9], [0, y + 0.95]]), { color: "#FFF6DF", alpha: 1, shine: 8 });
      else sc.set("foam", null);
    };
    const liquidR = (cav, y) => { for (let i = 1; i < cav.length; i++) { const a = cav[i - 1], b = cav[i]; if (y <= b[1]) return b[1] === a[1] ? b[0] : a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]); } return cav[cav.length - 1][0]; };
    const vessel = () => {
      const d = DRINKS[st.i], V = VESSEL[d.vessel], top = V.wall[V.wall.length - 1][1], wide = Math.max.apply(null, V.wall.map((p) => p[0]));
      if (sc) { sc.set("glass", shell(V), { glass: true, shine: 90 }); sc.frame([0, top / 2, 0], wide + 1, top / 2 + 1); }
    };
    const paint = () => {
      const d = DRINKS[st.i], g = st.ml * st.abv / 100 * 0.789, units = g / 10;
      $(".pr-ml").textContent = `${st.ml} ${t.mlU}`;
      $(".pr-abv").textContent = `${nf(st.abv, st.abv % 1 ? 1 : 0, lang)}%`;
      $(".pr-g").textContent = nf(g, g < 10 ? 1 : 0, lang) + " " + t.gU;
      const full = Math.floor(units + 1e-6), part = units - full, cells = Math.max(1, Math.ceil(units - 1e-6));
      $(".pr-units").innerHTML = Array.from({ length: Math.min(cells, 8) }, (_, k) => `<i style="--f:${k < full ? 1 : part.toFixed(2)}"></i>`).join("");
      $(".pr-n").innerHTML = t.units(nf(units, 1, lang));
      const r = $(".pr-vol");
      r.min = d.min; r.max = d.max; r.step = d.step; r.value = st.ml;
      stopGlide(); if (sc) sc.anim(true);
      stopGlide = glide(() => st.shown, fill, st.ml, () => { if (sc) sc.anim(false); });
    };
    stage.querySelectorAll(".pr-kind button").forEach((b, i) => b.addEventListener("click", () => {
      st.i = i; st.ml = DRINKS[i].ml; st.abv = DRINKS[i].abv; st.shown = 0;
      stage.querySelectorAll(".pr-kind button").forEach((x, k) => x.setAttribute("aria-pressed", k === i));
      vessel(); paint();
    }));
    $(".pr-vol").addEventListener("input", (e) => { st.ml = +e.target.value; paint(); });
    const bump = (s) => { const d = DRINKS[st.i]; st.abv = clamp(st.abv + s * (d.id === "beer" ? 0.5 : 1), d.a0, d.a1); paint(); };
    $(".pr-minus").addEventListener("click", () => bump(-1));
    $(".pr-plus").addEventListener("click", () => bump(1));
    vessel(); paint();
    return () => { stopGlide(); if (sc) sc.destroy(); };
  }

  /* ---------- День 15: чашки ---------- */
  const CUPS = [
    { id: "coffee", mg: 90, scale: 1, color: "#3A2315", n: 2 },
    { id: "espresso", mg: 80, scale: 0.62, color: "#2A180D", n: 0 },
    { id: "tea", mg: 50, scale: 1, color: "#A8571A", n: 1 }
  ];
  function caffeine(stage, t, lang, W, v) {
    const st = { n: CUPS.map((c) => c.n), bed: 23 };
    const LIMIT = 400, MAX = 600;
    stage.innerHTML = `<div class="pr">
      <div class="pr-stage pr-wide"><canvas aria-label="${t.alt}" role="img"></canvas><i class="pr-floor"></i><span class="pr-drag">${t.drag}</span></div>
      <div class="pr-count">${CUPS.map((c, i) => `<div class="pr-c"><b>${t.kinds[i][0]}</b><small>${t.kinds[i][1]}</small><span><button type="button" data-d="-1" data-i="${i}" aria-label="${t.less}: ${t.kinds[i][0]}">−</button><em data-n="${i}"></em><button type="button" data-d="1" data-i="${i}" aria-label="${t.more}: ${t.kinds[i][0]}">+</button></span></div>`).join("")}</div>
      <div class="pr-out pr-caf" aria-live="polite"><b class="pr-g"></b><span class="pr-gl">${t.perDay}</span>
        <div class="pr-bar"><i class="pr-fill"></i><u style="left:${LIMIT / MAX * 100}%"><em>${LIMIT} ${t.mgU}</em></u></div>
        <p class="pr-n"></p></div>
      <label class="pr-range pr-bed"><span>${t.bed}: <b class="pr-bt"></b></span><input type="range" min="20" max="26" step="0.5" value="23" aria-label="${t.bed}"></label>
      <p class="pr-well pr-last"></p>
      <p class="pr-how">${t.how}</p>
    </div>`;
    const $ = (s) => stage.querySelector(s), canvas = $("canvas"), sc = scene(canvas);
    if (!sc) $(".pr-stage").classList.add("no3");
    if (sc) {
      const V = VESSEL.cup, white = { color: "#FFFFFF", shine: 55 };
      sc.set("cup", shell(V), white);
      sc.set("saucer", lathe(SAUCER), white);
      sc.set("handle", tube(bezier([3.8, 5.75], [6.9, 6.5], [6.9, 1.9], [3.4, 2.3], 22).map((p) => [p[0], p[1], 0]), 0.42), white);
      const liq = liquid(V.cav, 6.05);
      CUPS.forEach((c) => sc.set("l-" + c.id, liq, { color: c.color, alpha: 1, shine: 80 }));
    }
    const hhmm = (h) => { const x = ((h % 24) + 24) % 24, m = Math.round((x % 1) * 60); return `${String(Math.floor(x)).padStart(2, "0")}:${String(m).padStart(2, "0")}`; };
    const paint = () => {
      const mg = CUPS.reduce((s, c, i) => s + c.mg * st.n[i], 0), over = mg > LIMIT;
      stage.querySelectorAll("[data-n]").forEach((e) => { e.textContent = st.n[+e.dataset.n]; });
      $(".pr-g").textContent = `${mg} ${t.mgU}`;
      $(".pr-fill").style.width = Math.min(100, mg / MAX * 100) + "%";
      $(".pr-caf").classList.toggle("over", over);
      $(".pr-n").innerHTML = mg === 0 ? t.none : over ? t.over : t.ok;
      $(".pr-bt").textContent = hhmm(st.bed);
      $(".pr-last").innerHTML = t.last(hhmm(st.bed - 6));
      if (!sc) return;
      // розставляємо чашки: до чотирьох у ряд, решта в другому ряду
      const list = [];
      CUPS.forEach((c, i) => { for (let k = 0; k < st.n[i]; k++) list.push(c); });
      const shown = list.slice(0, 8), rows = shown.length > 4 ? [shown.slice(0, Math.ceil(shown.length / 2)), shown.slice(Math.ceil(shown.length / 2))] : [shown];
      const inst = { coffee: [], espresso: [], tea: [], all: [] };
      let half = 6;
      rows.forEach((row, r) => {
        const w = row.reduce((s, c) => s + 11.6 * c.scale, 0);
        let x = -w / 2;
        row.forEach((c) => { const cx = x + 5.8 * c.scale, p = [cx, 0, rows.length > 1 ? (r ? 6.4 : -6.4) : 0, c.scale]; inst[c.id].push(p); inst.all.push(p); x += 11.6 * c.scale; });
        half = Math.max(half, w / 2);
      });
      const none = [[0, -999, 0, 0.001]];
      ["cup", "saucer", "handle"].forEach((k) => sc.place(k, inst.all.length ? inst.all : none));
      CUPS.forEach((c) => sc.place("l-" + c.id, inst[c.id].length ? inst[c.id] : none));
      sc.frame([0, 3, 0], half + 1 + (rows.length > 1 ? 2 : 0), rows.length > 1 ? 7.5 : 5.2);
    };
    stage.querySelectorAll(".pr-count button").forEach((b) => b.addEventListener("click", () => { const i = +b.dataset.i; st.n[i] = clamp(st.n[i] + +b.dataset.d, 0, 8); paint(); }));
    $(".pr-bed input").addEventListener("input", (e) => { st.bed = +e.target.value; paint(); });
    paint();
    return () => { if (sc) sc.destroy(); };
  }

  window.Practice = { drink, caffeine };

  /* ---------- Тексти й місце в картці: одразу перед «Порадою дня» ---------- */
  const DAYS = window.ADVENT_DAYS;
  if (!DAYS) return;
  const SPEC = {
    12: { id: "drink", refs: [["PubChem: Ethanol, CID 702", "https://pubchem.ncbi.nlm.nih.gov/compound/702#section=Density"]],
      uk: { title: "Скільки алкоголю у вашому келиху", sub: "Оберіть напій, об’єм і міцність. Лічильник покаже, скільки в порції чистого спирту.",
        pick: "Напій", kinds: [["Вино", "келих"], ["Пиво", "склянка"], ["Міцний напій", "чарка"]], alt: "Об’ємна модель посудини з напоєм", drag: "можна покрутити",
        vol: "Налито", mlU: "мл", abv: "Міцність", less: "Менше", more: "Більше", grams: "чистого спирту", gU: "г",
        units: (n) => `Це <b>${n}</b> стандартної порції: одна порція — 10 г чистого спирту.{4}`,
        well: "Рівень споживання з найменшою шкодою для здоров’я — нуль порцій на тиждень.{4} Тож орієнтир простий: що менше, то краще.",
        how: "Як рахуємо: об’єм × міцність × 0,789 (густина спирту, г/мл).{r1} Міцність на етикетці вашого напою може бути іншою." },
      en: { title: "How much alcohol is in your glass", sub: "Pick a drink, a volume and a strength. The counter shows how much pure alcohol the serving holds.",
        pick: "Drink", kinds: [["Wine", "glass"], ["Beer", "tumbler"], ["Spirits", "shot"]], alt: "A 3D model of the vessel with the drink", drag: "drag to rotate",
        vol: "Poured", mlU: "ml", abv: "Strength", less: "Less", more: "More", grams: "of pure alcohol", gU: "g",
        units: (n) => `That is <b>${n}</b> standard drinks: one standard drink is 10 g of pure alcohol.{4}`,
        well: "The level of drinking that minimises harm to health is zero drinks a week.{4} So the guide is simple: the less, the better.",
        how: "How it is counted: volume × strength × 0.789 (the density of alcohol, g/ml).{r1} The strength on your drink’s label may differ." } },
    15: { id: "caffeine", refs: [["EFSA: Caffeine", "https://www.efsa.europa.eu/en/topics/topic/caffeine"]],
      uk: { title: "Ваш кофеїн за день", sub: "Додайте напої, які п’єте за день, і порівняйте суму з орієнтиром для здорових дорослих.",
        kinds: [["Фільтр-кава", "чашка 200 мл · 90 мг"], ["Еспресо", "60 мл · 80 мг"], ["Чорний чай", "чашка 220 мл · 50 мг"]], alt: "Об’ємні чашки з напоями", drag: "можна покрутити",
        less: "Менше", more: "Більше", perDay: "кофеїну за день", mgU: "мг", bed: "Лягаю спати о",
        none: "Жодного напою з кофеїном.",
        ok: "У межах орієнтира: до 400 мг на день не пов’язують із небажаними ефектами у здорових дорослих.{6}{r1}",
        over: "Понад орієнтир 400 мг на день для здорових дорослих.{6}{r1} Варто прибрати одну-дві порції.",
        last: (h) => `Остання кава — не пізніше <b>${h}</b>: навіть за 6 годин до сну кофеїн помітно порушував сон.{7}`,
        how: "Вміст кофеїну в порції — орієнтовні значення EFSA; у вашій чашці він залежить від сорту й способу приготування.{r1} Під час вагітності орієнтир нижчий: 200 мг за оцінкою EFSA{r1} і 300 мг за оглядом досліджень.{6} Межу варто обговорити з лікарем." },
      en: { title: "Your caffeine for the day", sub: "Add the drinks you have in a day and compare the total with the guide for healthy adults.",
        kinds: [["Filter coffee", "200 ml cup · 90 mg"], ["Espresso", "60 ml · 80 mg"], ["Black tea", "220 ml cup · 50 mg"]], alt: "3D cups with drinks", drag: "drag to rotate",
        less: "Fewer", more: "More", perDay: "of caffeine a day", mgU: "mg", bed: "I go to bed at",
        none: "No drinks with caffeine.",
        ok: "Within the guide: up to 400 mg a day is not linked to adverse effects in healthy adults.{6}{r1}",
        over: "Above the 400 mg a day guide for healthy adults.{6}{r1} It is worth dropping a serving or two.",
        last: (h) => `Last coffee no later than <b>${h}</b>: even 6 hours before bed, caffeine noticeably disrupted sleep.{7}`,
        how: "Caffeine per serving uses EFSA’s guide values; in your cup it depends on the beans and the brewing method.{r1} In pregnancy the guide is lower: 200 mg in EFSA’s assessment{r1} and 300 mg in a review of studies.{6} It is worth discussing the limit with a doctor." } }
  };
  const deep = (v, f) => typeof v === "string" ? f(v) : typeof v === "function" ? (...a) => f(v(...a)) : Array.isArray(v) ? v.map((x) => deep(x, f)) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x, f)])) : v;
  DAYS.forEach((d) => {
    const c = SPEC[d.d];
    if (!c) return;
    const base = (d.refs = d.refs || []).length;
    (c.refs || []).forEach((r) => d.refs.push(r));
    const fix = (s) => s.replace(/\{r(\d)\}/g, (_, k) => "{" + (base + +k) + "}");
    (d.viz = d.viz || []).push({ id: c.id, after: "not", uk: deep(c.uk, fix), en: deep(c.en, fix) });
  });
})();
