/* «23 пари» · скляна 3D-фігура людини: де в тілі працює ген дня або де видно його дію.
   Модель: BodyParts3D, © The Database Center for Life Science, CC BY-SA 2.1 Japan (assets/3d/parts, див. tools/split3d.py).
   У картку вантажаться лише шкіра й потрібні органи, а камера одразу стоїть біля них (усе тіло не показуємо).
   Органи світяться власним кольором; місця, яких немає серед органів моделі (шия, рот, щока, маківка, коліно),
   позначено пронумерованими точками на шкірі. М’язи й жирову тканину показано на схематичному зрізі стегна чи талії.
   WebGL без сторонніх бібліотек; якщо він недоступний, лишається текстовий перелік. */
(function () {
  "use strict";
  const reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const COLOR = { heart: "#D9463B", arteries: "#DC5A4E", veins: "#4E79B8", lungs: "#EC93A6", liver: "#A6382E", kidney: "#B9443B", colon: "#E39A86", smallint: "#F0A892", pancreas: "#E8B45C",
    stomach: "#E98C7B", brain: "#E9A3B1", eye: "#2A77A0", bone: "#F1ECE6", fat: "#F4CF78", skin: "#FFB575" };
  const BASE = "assets/3d/parts/", FOV = 24 * Math.PI / 180, YAW0 = -0.28;
  const rgb = (h) => [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255];

  const VS = `attribute vec3 aPos; attribute vec3 aNor; uniform mat4 uMVP; uniform mat4 uMV; uniform float uInset; varying vec3 vN; varying vec3 vV; varying float vH;
    void main(){ vec3 p = aPos + aNor * uInset; vec4 mv = uMV * vec4(p, 1.0); vN = mat3(uMV) * aNor; vV = -mv.xyz; vH = p.y; gl_Position = uMVP * vec4(p, 1.0); }`;
  const FS = `precision mediump float; varying vec3 vN; varying vec3 vV; varying float vH; uniform vec3 uColor; uniform float uSkin; uniform float uGlow; uniform float uSoft; uniform float uClip; uniform float uFlat;
    void main(){
      if (vH > uClip) discard;                 // усе, що вище площини зрізу, не малюємо
      if (uFlat > 0.5) { gl_FragColor = vec4(uColor, 1.0); return; }     // поверхня зрізу: рівний колір шару
      vec3 N = normalize(vN); vec3 V = normalize(vV);
      if (dot(N, V) < 0.0) N = -N;
      float f = 1.0 - dot(N, V); vec3 c; float a;
      if (uSkin > 0.5) {                       // шкіра: скло, що світлішає до країв; uGlow підсвічує все тіло
        a = pow(f, 2.1) * 0.72 + 0.04;
        c = mix(vec3(0.78, 0.90, 0.95), vec3(0.10, 0.38, 0.55), pow(f, 2.2));
        a += uGlow * (0.06 + pow(f, 1.3) * 0.4);
        c = mix(c, uColor, uGlow * 0.62 * pow(f, 0.9));
      } else {                                 // орган: непрозорий, з м’яким світлом
        vec3 L1 = normalize(vec3(0.35, 0.62, 0.70)); vec3 L2 = normalize(vec3(-0.65, 0.25, -0.35));
        float d = 0.44 + 0.62 * max(dot(N, L1), 0.0) + 0.2 * max(dot(N, L2), 0.0);
        float s = pow(max(dot(reflect(-L1, N), V), 0.0), 42.0) * 0.5;
        c = uColor * d + vec3(s) + vec3(pow(f, 3.0) * 0.22); a = mix(0.97, 0.3 + pow(f, 1.5) * 0.45, uSoft);
      }
      gl_FragColor = vec4(c * a, a);
    }`;
  const m4 = {
    persp(fovy, asp, n, f) { const t = 1 / Math.tan(fovy / 2), o = new Float32Array(16); o[0] = t / asp; o[5] = t; o[10] = (f + n) / (n - f); o[11] = -1; o[14] = 2 * f * n / (n - f); return o; },
    view(yaw, pitch, dist) { const cy = Math.cos(yaw), sy = Math.sin(yaw), cx = Math.cos(pitch), sx = Math.sin(pitch), o = new Float32Array(16); o[0] = cy; o[1] = sx * sy; o[2] = -cx * sy; o[5] = cx; o[6] = sx; o[8] = sy; o[9] = -sx * cy; o[10] = cx * cy; o[14] = -dist; o[15] = 1; return o; },
    mul(a, b) { const o = new Float32Array(16); for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3]; return o; },
    shift(m, x, y, z) { const o = new Float32Array(m); o[12] = m[0] * x + m[4] * y + m[8] * z + m[12]; o[13] = m[1] * x + m[5] * y + m[9] * z + m[13]; o[14] = m[2] * x + m[6] * y + m[10] * z + m[14]; o[15] = m[3] * x + m[7] * y + m[11] * z + m[15]; return o; },
    xf(m, p) { return [m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12], m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13], m[2] * p[0] + m[6] * p[1] + m[10] * p[2] + m[14], m[3] * p[0] + m[7] * p[1] + m[11] * p[2] + m[15]]; }
  };

  /* Завантаження: опис моделі й файли органів беремо один раз на сторінку */
  let manP = null;
  const built = {};
  const manifest = () => manP || (manP = fetch(BASE + "parts.json").then((r) => { if (!r.ok) throw new Error("parts.json " + r.status); return r.json(); }).catch((e) => { manP = null; throw e; }));
  function mesh(id, man) {
    if (built[id]) return built[id];
    return (built[id] = fetch(BASE + id + ".bin").then((r) => { if (!r.ok) throw new Error(id + " " + r.status); return r.arrayBuffer(); }).then((buf) => {
      const info = man.meshes[id], mn = man.bbox[0], mx = man.bbox[1], q = new Uint16Array(buf, 0, info.v * 3), I = new Uint16Array(buf, info.v * 6, info.i);
      const C = [(mn[0] + mx[0]) / 2, (mn[2] + mx[2]) / 2, -(mn[1] + mx[1]) / 2], sx = (mx[0] - mn[0]) / 65535, sy = (mx[1] - mn[1]) / 65535, sz = (mx[2] - mn[2]) / 65535;
      const P = new Float32Array(info.v * 3), N = new Float32Array(info.v * 3);
      for (let i = 0; i < info.v; i++) { P[i * 3] = mn[0] + q[i * 3] * sx - C[0]; P[i * 3 + 1] = mn[2] + q[i * 3 + 2] * sz - C[1]; P[i * 3 + 2] = -(mn[1] + q[i * 3 + 1] * sy) - C[2]; }   // Y вгору, обличчя до глядача
      for (let t = 0; t < I.length; t += 3) {
        const a = I[t] * 3, b = I[t + 1] * 3, c = I[t + 2] * 3, ux = P[b] - P[a], uy = P[b + 1] - P[a + 1], uz = P[b + 2] - P[a + 2], vx = P[c] - P[a], vy = P[c + 1] - P[a + 1], vz = P[c + 2] - P[a + 2];
        const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        N[a] += nx; N[a + 1] += ny; N[a + 2] += nz; N[b] += nx; N[b + 1] += ny; N[b + 2] += nz; N[c] += nx; N[c + 1] += ny; N[c + 2] += nz;
      }
      for (let i = 0; i < N.length; i += 3) { const l = Math.hypot(N[i], N[i + 1], N[i + 2]) || 1; N[i] /= l; N[i + 1] /= l; N[i + 2] /= l; }
      const lo = [1e9, 1e9, 1e9], hi = [-1e9, -1e9, -1e9];
      for (let i = 0; i < P.length; i += 3) for (let k = 0; k < 3; k++) { if (P[i + k] < lo[k]) lo[k] = P[i + k]; if (P[i + k] > hi[k]) hi[k] = P[i + k]; }
      let vol = 0;                                 // знак об’єму показує, куди дивляться нормалі: назовні (+1) чи всередину (−1)
      for (let t = 0; t < I.length; t += 3) { const a = I[t] * 3, b = I[t + 1] * 3, c = I[t + 2] * 3; vol += P[a] * (P[b + 1] * P[c + 2] - P[b + 2] * P[c + 1]) - P[a + 1] * (P[b] * P[c + 2] - P[b + 2] * P[c]) + P[a + 2] * (P[b] * P[c + 1] - P[b + 1] * P[c]); }
      return { P, N, I, lo, hi, out: vol >= 0 ? 1 : -1 };
    }).catch((e) => { delete built[id]; throw e; }));
  }

  /* opt: glow (підсвітити все тіло), onFrame, view { c: центр погляду, size: скільки міліметрів має вміститися по висоті, pitch },
     cut { y: висота площини зрізу, layers: [[сітка, зсув усередину в мм, колір]] } — зріз із суцільною заливкою шарів */
  function viewer(canvas, man, parts, opt) {
    const cut = opt.cut || null;
    let gl = null;
    try { gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true, stencil: !!cut }); } catch (e) { gl = null; }
    if (!gl) return null;
    const mk = (t, s) => { const sh = gl.createShader(t); gl.shaderSource(sh, s); gl.compileShader(sh); return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null; };
    const vs = mk(gl.VERTEX_SHADER, VS), fs = mk(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return null;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.bindAttribLocation(prog, 0, "aPos"); gl.bindAttribLocation(prog, 1, "aNor"); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
    const U = {};
    ["uMVP", "uMV", "uColor", "uSkin", "uGlow", "uSoft", "uInset", "uClip", "uFlat"].forEach((n) => { U[n] = gl.getUniformLocation(prog, n); });
    const buf = (target, data) => { const b = gl.createBuffer(); gl.bindBuffer(target, b); gl.bufferData(target, data, gl.STATIC_DRAW); return b; };
    const objs = Object.keys(parts).map((id) => ({ id, vbo: buf(gl.ARRAY_BUFFER, parts[id].P), nbo: buf(gl.ARRAY_BUFFER, parts[id].N), ibo: buf(gl.ELEMENT_ARRAY_BUFFER, parts[id].I), count: parts[id].I.length, out: parts[id].out, color: rgb(COLOR[id] || "#9BAEB7") }));
    const byId = {}; objs.forEach((o) => { byId[o.id] = o; });
    const mn = man.bbox[0], mx = man.bbox[1], HEIGHT = mx[2] - mn[2], C = [(mn[0] + mx[0]) / 2, (mn[2] + mx[2]) / 2, -(mn[1] + mx[1]) / 2];
    const view = opt.view || null, NOCLIP = 1e6, clipY = cut ? cut.y : NOCLIP;
    const hasStencil = !!(cut && gl.getContextAttributes() && gl.getContextAttributes().stencil);
    // площина зрізу: великий прямокутник на висоті clipY
    const plane = cut ? { vbo: buf(gl.ARRAY_BUFFER, new Float32Array([-900, clipY, -900, 900, clipY, -900, 900, clipY, 900, -900, clipY, 900])), nbo: buf(gl.ARRAY_BUFFER, new Float32Array([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0])), ibo: buf(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3])), count: 6 } : null;
    const st = { yaw: YAW0, W: 1, H: 1, dpr: 1, raf: 0, dead: false, seen: true, t0: 0, sway: !reduce, drag: null, mvp: null, mv: null, dist: 1 };
    function resize() {
      const r = canvas.getBoundingClientRect();
      st.W = Math.max(1, r.width); st.H = Math.max(1, r.height); st.dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.round(st.W * st.dpr), h = Math.round(st.H * st.dpr);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      request();
    }
    const bind = (o) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, o.vbo); gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, o.nbo); gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.ibo);
    };
    function draw(now) {
      const asp = st.W / st.H, half = Math.tan(FOV / 2);
      st.dist = view ? Math.max(view.size / 2 / half, (view.w || 0) / 2 / half / asp) / 0.94 : Math.max(HEIGHT / 0.92 / 2 / half, 760 / 2 / half / asp);
      const yaw = st.yaw + (st.sway && !st.drag ? Math.sin((now - st.t0) / 3200) * (view ? 0.34 : 0.5) : 0);
      st.mv = m4.view(yaw, view && view.pitch != null ? view.pitch : 0.03, st.dist);
      if (view) st.mv = m4.shift(st.mv, -view.c[0], -view.c[1], -view.c[2]);
      st.mvp = m4.mul(m4.persp(FOV, asp, st.dist * 0.2, st.dist * 3 + 1500), st.mv);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
      gl.useProgram(prog); gl.uniformMatrix4fv(U.uMVP, false, st.mvp); gl.uniformMatrix4fv(U.uMV, false, st.mv);
      gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL); gl.disable(gl.CULL_FACE); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.uniform1f(U.uClip, clipY); gl.uniform1f(U.uInset, 0); gl.uniform1f(U.uFlat, 0);
      const one = (o) => {
        bind(o);
        gl.uniform3fv(U.uColor, o.color); gl.uniform1f(U.uSkin, o.id === "skin" ? 1 : 0); gl.uniform1f(U.uGlow, o.id === "skin" && opt.glow ? 1 : 0); gl.uniform1f(U.uSoft, 0);
        gl.drawElements(gl.TRIANGLES, o.count, gl.UNSIGNED_SHORT, 0);
      };
      gl.depthMask(true);
      if (!cut) objs.filter((o) => o.id !== "skin").forEach(one);                                 // спершу органи
      if (cut && hasStencil) {
        // Зріз: для кожного шару рахуємо в трафареті, де промінь погляду потрапляє всередину замкненої сітки, і зафарбовуємо там площину
        gl.enable(gl.STENCIL_TEST);
        cut.layers.forEach(([id, inset, color]) => {
          const o = byId[id];
          if (!o) return;
          gl.clear(gl.STENCIL_BUFFER_BIT);
          gl.colorMask(false, false, false, false); gl.depthMask(false); gl.disable(gl.DEPTH_TEST);
          gl.stencilFunc(gl.ALWAYS, 0, 0xff); gl.stencilOp(gl.KEEP, gl.KEEP, gl.INVERT);
          bind(o); gl.uniform1f(U.uInset, -inset * o.out); gl.uniform1f(U.uClip, clipY); gl.uniform1f(U.uFlat, 0); gl.uniform1f(U.uSkin, 0);
          gl.drawElements(gl.TRIANGLES, o.count, gl.UNSIGNED_SHORT, 0);
          gl.colorMask(true, true, true, true); gl.depthMask(true); gl.enable(gl.DEPTH_TEST);
          gl.stencilFunc(gl.NOTEQUAL, 0, 0xff); gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
          bind(plane); gl.uniform1f(U.uInset, 0); gl.uniform1f(U.uClip, NOCLIP); gl.uniform1f(U.uFlat, 1); gl.uniform3fv(U.uColor, color);
          gl.drawElements(gl.TRIANGLES, plane.count, gl.UNSIGNED_SHORT, 0);
        });
        gl.disable(gl.STENCIL_TEST);
        gl.uniform1f(U.uClip, clipY); gl.uniform1f(U.uInset, 0); gl.uniform1f(U.uFlat, 0);
      }
      gl.depthMask(false);
      objs.filter((o) => o.id === "skin").forEach(one);                                           // наостанок скляна шкіра
      gl.depthMask(true);
      if (opt.onFrame) opt.onFrame();
    }
    function tick(now) {
      st.raf = 0;
      if (st.dead || !canvas.isConnected) return;
      if (!st.t0) st.t0 = now;
      draw(now);
      if (st.seen && st.sway && !st.drag) request();
    }
    function request() { if (!st.raf && !st.dead) st.raf = requestAnimationFrame(tick); }
    canvas.addEventListener("pointerdown", (e) => { st.drag = { x: e.clientX, yaw: st.yaw + (st.sway ? Math.sin((performance.now() - st.t0) / 3200) * (view ? 0.34 : 0.5) : 0) }; st.sway = false; st.yaw = st.drag.yaw; try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* без захоплення теж працює */ } });
    canvas.addEventListener("pointermove", (e) => { if (st.drag) { st.yaw = st.drag.yaw + (e.clientX - st.drag.x) * 0.01; request(); } });
    const up = () => { st.drag = null; };
    canvas.addEventListener("pointerup", up); canvas.addEventListener("pointercancel", up);
    let io = null, ro = null;
    if ("IntersectionObserver" in window) { io = new IntersectionObserver((en) => { st.seen = en[0].isIntersecting; if (st.seen) request(); }); io.observe(canvas); }
    if ("ResizeObserver" in window) { ro = new ResizeObserver(resize); ro.observe(canvas); }
    resize();
    return {
      // точка моделі (у її власних координатах) → місце на екрані; front: чи вона з боку глядача
      project(raw) {
        if (!st.mvp) return null;
        const p = [raw[0] - C[0], raw[2] - C[1], -raw[1] - C[2]], c = m4.xf(st.mvp, p), v = m4.xf(st.mv, p), q = view ? m4.xf(st.mv, view.c) : [0, 0, -st.dist];
        return { x: (c[0] / c[3] * 0.5 + 0.5) * st.W, y: (1 - (c[1] / c[3] * 0.5 + 0.5)) * st.H, front: v[2] > q[2] - 20 };
      },
      destroy() { st.dead = true; cancelAnimationFrame(st.raf); if (io) io.disconnect(); if (ro) ro.disconnect(); const x = gl.getExtension("WEBGL_lose_context"); if (x) x.loseContext(); }
    };
  }

  const UI = {
    uk: { load: "Завантажуємо модель…", drag: "можна покрутити", alt: "Об’ємна фігура людини з позначеними органами", credit: "3D-модель: BodyParts3D, © The Database Center for Life Science, CC BY-SA 2.1 Japan",
      cut: { thigh: "схема: зріз стегна", waist: "схема: зріз на рівні талії" } },
    en: { load: "Loading the model…", drag: "drag to rotate", alt: "A 3D human figure with organs marked", credit: "3D model: BodyParts3D, © The Database Center for Life Science, CC BY-SA 2.1 Japan",
      cut: { thigh: "diagram: thigh cross-section", waist: "diagram: cross-section at the waist" } }
  };
  /* Зрізи для тканин, яких немає серед органів моделі: м’язи й жирова тканина.
     Шари схематичні: шар під шкірою (жирова тканина) має сталу товщину, решта всередині — м’язи або внутрішні органи. */
  const LAYER = { muscle: "#C9483C", fat: "#F0B429", fatDim: "#F3E2B0", inner: "#E9D3CC", bone: "#F6F1E8" };
  const CUTS = {
    thigh: { need: ["bone"], z: 570, at: [98, -95, 512], size: 280, pitch: 0.66, layers: (hi) => [["skin", 0, hi === "fat" ? LAYER.fat : LAYER.fatDim], ["skin", 11, hi === "fat" ? LAYER.inner : LAYER.muscle], ["bone", 0, LAYER.bone]] },
    waist: { need: [], z: 1010, at: [0, -95, 962], size: 430, pitch: 0.66, layers: (hi) => [["skin", 0, hi === "fat" ? LAYER.fat : LAYER.fatDim], ["skin", 24, hi === "fat" ? LAYER.inner : LAYER.muscle]] }
  };
  const WIDE = { skin: 1, arteries: 1, veins: 1, bone: 1 };          // сітки на все тіло: до них камера не наближається
  const PINBOX = { scalp: [-95, 95, 1385, 1650], face: [-95, 95, 1385, 1650], mouth: [-95, 95, 1385, 1650], neck: [-150, 150, 1270, 1520] };   // точка на голові чи шиї: у кадрі вся голова або шия з плечима (x від–до, z від–до, мм)
  const TORSO = { at: [0, -95, 1190], size: 560 };                    // якщо показуємо лише судини: грудна клітка й живіт
  function where(stage, t, lang, W, v) {
    const ui = UI[lang] || UI.uk, items = v.items || [], cutSpec = v.cut ? CUTS[v.cut] : null;
    let pinN = 0;
    const marks = items.map((it) => (it.p ? { pin: it.p, n: ++pinN } : it.k ? { color: LAYER[it.k] } : { color: COLOR[it.o[0]] }));
    stage.innerHTML = `<div class="bd">
        <div class="bd-stage"><canvas role="img" aria-label="${ui.alt}" title="${ui.drag}"></canvas><div class="bd-pins">${marks.map((m) => (m.pin ? `<i class="bd-pin" data-pin="${m.pin}">${m.n}</i>` : "")).join("")}</div>${cutSpec ? `<span class="bd-cut">${ui.cut[v.cut]}</span>` : ""}<span class="bd-load">${ui.load}</span><span class="bd-drag" title="${ui.drag}" aria-hidden="true"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 21v-5h5"/></svg></span></div>
        <ol class="bd-list">${items.map((it, i) => `<li><i class="bd-dot${marks[i].pin ? " pin" : ""}" style="--c:${marks[i].color || "#FF9D45"}">${marks[i].pin ? marks[i].n : ""}</i><div><b>${t.items[i].k}</b><p>${t.items[i].t}</p></div></li>`).join("")}</ol>
      </div><p class="bd-credit">${ui.credit}</p>`;
    const box = stage.querySelector(".bd"), stg = stage.querySelector(".bd-stage"), canvas = stage.querySelector("canvas"), pins = [...stage.querySelectorAll(".bd-pin")];
    let vw = null, dead = false;
    const ids = ["skin"].concat(items.flatMap((it) => it.o || []).filter((id) => id !== "skin"), cutSpec ? cutSpec.need : []).filter((id, i, a) => a.indexOf(id) === i);
    const glow = items.some((it) => (it.o || []).includes("skin"));
    manifest().then((man) => Promise.all(ids.map((id) => mesh(id, man))).then((list) => {
      if (dead || !canvas.isConnected) return;
      const parts = {};
      ids.forEach((id, i) => { parts[id] = list[i]; });
      const mn = man.bbox[0], mx = man.bbox[1], C = [(mn[0] + mx[0]) / 2, (mn[2] + mx[2]) / 2, -(mn[1] + mx[1]) / 2];
      const local = (raw) => [raw[0] - C[0], raw[2] - C[1], -raw[1] - C[2]];           // координати моделі → координати сцени (Y вгору)
      let view = null, cut = null;
      if (cutSpec) {
        const hi = (items.find((it) => it.k) || {}).k;
        view = { c: local(cutSpec.at), size: cutSpec.size, pitch: cutSpec.pitch };
        cut = { y: cutSpec.z - C[1], layers: cutSpec.layers(hi).map(([id, inset, color]) => [id, inset, rgb(color)]) };
      } else if (v.frame) {
        view = { c: local(v.frame.at), size: v.frame.size };
      } else {
        // Камера наближається до позначених органів і точок; сітки на все тіло не враховуємо
        const lo = [1e9, 1e9, 1e9], hi = [-1e9, -1e9, -1e9];
        const add = (a, b) => { for (let k = 0; k < 3; k++) { if (a[k] < lo[k]) lo[k] = a[k]; if (b[k] > hi[k]) hi[k] = b[k]; } };
        items.forEach((it) => {
          if (it.p) { const b = PINBOX[it.p], q = local(man.pins[it.p]); if (b) add(local([b[0], -40, b[2]]), local([b[1], -190, b[3]])); else add([q[0] - 110, q[1] - 110, q[2] - 60], [q[0] + 110, q[1] + 110, q[2] + 60]); }
          (it.o || []).forEach((id) => { if (!WIDE[id]) add(parts[id].lo, parts[id].hi); });
        });
        if (lo[0] < 1e8) {
          const h = hi[1] - lo[1], w = hi[0] - lo[0];
          view = { c: [(lo[0] + hi[0]) / 2, (lo[1] + hi[1]) / 2, (lo[2] + hi[2]) / 2], size: Math.max(300, h * 1.5), w: Math.max(300, w * 1.5) };
        } else if (items.some((it) => (it.o || []).some((id) => id === "arteries" || id === "veins"))) {
          view = { c: local(TORSO.at), size: TORSO.size };
        }
      }
      vw = viewer(canvas, man, parts, { glow, view, cut, onFrame: () => {
        pins.forEach((el) => { const p = vw && vw.project(man.pins[el.dataset.pin]); if (!p) return; el.style.left = p.x.toFixed(1) + "px"; el.style.top = p.y.toFixed(1) + "px"; el.classList.toggle("back", !p.front); });
      } });
      if (!vw) { box.classList.add("no3"); return; }
      stg.classList.add("ready");
    })).catch(() => { box.classList.add("no3"); });
    return () => { dead = true; if (vw) vw.destroy(); };
  }
  window.Body = { where, COLOR };

  /* ---------- Що показати в кожному дні: органи (o) або позначки (p) і підписи з джерелами ---------- */
  const DAYS = window.ADVENT_DAYS;
  if (!DAYS) return;
  const blood = ["arteries", "veins"];
  const W = {
    1: { hide: true, items: [{ o: blood }],
      uk: [["Кров", "Саме тут видно, як працює фермент: рівень фолату вимірюють у крові.{3}{5}"]],
      en: [["Blood", "This is where the enzyme’s work shows: folate levels are measured in the blood.{3}{5}"]] },
    2: { items: [{ o: ["smallint"] }],
      uk: [["Тонка кишка", "Тут працює лактаза: вона розщеплює молочний цукор на поверхні клітин кишки.{4}{9}"]],
      en: [["Small intestine", "This is where lactase works: it breaks down milk sugar on the surface of the cells lining the gut.{4}{9}"]] },
    3: { hide: true, items: [{ k: "fat" }],
      uk: [["Жирова тканина", "PPARγ керує дозріванням жирових клітин.{2}"]],
      en: [["Fat tissue", "PPARγ controls how fat cells mature.{2}"]] },
    4: { hide: true, items: [{ o: ["skin"] }, { o: ["eye"] }],
      uk: [["Усе тіло", "Добовий цикл активності генів іде майже в кожній клітині.{2}"], ["Очі", "Світло, яке вони сприймають, зсуває внутрішній годинник: за природного освітлення він синхронізується із сонцем.{10}"]],
      en: [["The whole body", "The daily cycle of gene activity runs in almost every cell.{2}"], ["Eyes", "The light they take in shifts the inner clock: under natural light it syncs with the sun.{10}"]] },
    5: { hide: true, items: [{ o: blood }],
      uk: [["Кров", "У великих дослідженнях довжину теломер вимірюють у лейкоцитах, клітинах крові.{4}"]],
      en: [["Blood", "Large studies measure telomere length in leukocytes, the white cells of the blood.{4}"]] },
    6: { items: [{ o: ["smallint"] }],
      uk: [["Тонка кишка", "Целіакію, одну з найкраще вивчених хвороб, пов’язаних з HLA, підтверджують біопсією слизової оболонки кишки.{4}{8}"]],
      en: [["Small intestine", "Coeliac disease, one of the best-studied HLA-linked conditions, is confirmed by a biopsy of the gut lining.{4}{8}"]] },
    7: { items: [{ p: "mouth" }],
      uk: [["Язик", "Рецептор гіркого смаку працює на смакових клітинах.{2}"]],
      en: [["Tongue", "The bitter taste receptor works on taste cells.{2}"]] },
    8: { items: [{ o: ["arteries"] }, { o: ["heart"] }],
      uk: [["Судини", "Тут фермент розщеплює тригліцериди, які переносить кров.{1}"], ["Серце й жирова тканина", "Сюди, а також у скелетні м’язи, йдуть вивільнені жирні кислоти.{2}"]],
      en: [["Blood vessels", "Here the enzyme breaks down the triglycerides carried by the blood.{1}"], ["The heart and fat tissue", "The released fatty acids go here, and to skeletal muscle as well.{2}"]] },
    9: { hide: true, items: [{ o: blood }],
      uk: [["Кров", "Антигени A і B розташовані на поверхні еритроцитів.{1}"]],
      en: [["Blood", "The A and B antigens sit on the surface of red blood cells.{1}"]] },
    10: { items: [{ o: ["pancreas"] }],
      uk: [["Підшлункова залоза", "В її острівцях від TCF7L2 залежать вироблення, дозрівання та секреція інсуліну.{2}"]],
      en: [["Pancreas", "In its islets, TCF7L2 governs the production, maturation and secretion of insulin.{2}"]] },
    11: { hide: true, items: [{ k: "muscle" }],
      uk: [["Скелетні м’язи", "α-Актинін-3 працює лише у швидких волокнах, які розвивають силу на великій швидкості.{1}"]],
      en: [["Skeletal muscle", "α-Actinin-3 works only in fast fibres, which generate force at high speed.{1}"]] },
    12: { items: [{ o: ["liver"] }, { p: "face" }],
      uk: [["Печінка", "Тут фермент знешкоджує ацетальдегід, проміжний продукт розпаду алкоголю.{2}"], ["Обличчя", "Коли ацетальдегід накопичується, воно червоніє.{2}"]],
      en: [["Liver", "Here the enzyme clears acetaldehyde, an intermediate product of alcohol breakdown.{2}"], ["Face", "When acetaldehyde builds up, it flushes.{2}"]] },
    13: { items: [{ o: ["kidney"] }, { o: blood }],
      uk: [["Нирки", "Головне джерело Klotho в крові.{1}"], ["Кров", "Розчинна форма Klotho циркулює в крові й діє як гормон.{1}{4}"]],
      en: [["Kidneys", "The main source of Klotho in the blood.{1}"], ["Blood", "The soluble form of Klotho circulates in the blood and acts as a hormone.{1}{4}"]] },
    14: { items: [{ p: "neck" }, { o: ["skin"] }],
      uk: [["Щитоподібна залоза", "Для синтезу її гормонів потрібен йод.{7}"], ["Тканини тіла", "Тут дейодиназа перетворює тироксин (Т4) на активний трийодтиронін (Т3).{1}"]],
      en: [["Thyroid gland", "Its hormones cannot be made without iodine.{7}"], ["Tissues of the body", "Here the deiodinase turns thyroxine (T4) into active triiodothyronine (T3).{1}"]] },
    15: { items: [{ o: ["liver"] }],
      uk: [["Печінка", "Тут CYP1A2 переробляє кофеїн.{1}"]],
      en: [["Liver", "This is where CYP1A2 processes caffeine.{1}"]] },
    16: { items: [{ o: ["skin"] }, { p: "scalp" }],
      uk: [["Шкіра", "Рецептор працює на меланоцитах, клітинах, що виробляють пігмент.{1}"], ["Волосся", "У першому дослідженні варіанти MC1R знайшли в понад 80% людей із рудим волоссям або світлою шкірою, яка погано засмагає.{1}"]],
      en: [["Skin", "The receptor works on melanocytes, the cells that make pigment.{1}"], ["Hair", "In the first study, MC1R variants were found in over 80% of people with red hair or fair skin that tans poorly.{1}"]] },
    17: { items: [{ o: ["arteries"] }],
      uk: [["Судини", "Ангіотензин II звужує їх, тому ACE відіграє ключову роль у регуляції тонусу судин.{3}"]],
      en: [["Blood vessels", "Angiotensin II narrows them, so ACE plays a key role in regulating vascular tone.{3}"]] },
    18: { items: [{ o: ["brain"] }],
      uk: [["Мозок", "Рецептор працює в гіпоталамусі: його активація зменшує споживання їжі.{1}"]],
      en: [["Brain", "The receptor works in the hypothalamus: activating it reduces food intake.{1}"]] },
    19: { items: [{ p: "mouth" }, { o: ["stomach", "smallint", "colon"] }],
      uk: [["Слина", "У секреторів у ній є розчинні антигени груп крові.{5}"], ["Слизові оболонки", "FUT2 створює на них антиген H.{2}"]],
      en: [["Saliva", "In secretors it contains soluble blood-group antigens.{5}"], ["Mucous membranes", "FUT2 makes the H antigen on them.{2}"]] },
    20: { frame: { at: [85, -90, 440], size: 470 }, items: [{ o: ["bone"] }, { p: "knee" }],
      uk: [["Кістки й суглоби", "GDF5 потрібний для розвитку хряща й для того, щоб суглоб утворився в належному місці.{1}"], ["Коліно", "Саме для колінного суглоба зв’язок варіанта з остеоартритом відтворюється найстабільніше.{5}"]],
      en: [["Bones and joints", "GDF5 is needed for cartilage to develop and for a joint to form in the right place.{1}"], ["Knee", "It is for the knee joint that the variant’s link with osteoarthritis replicates most consistently.{5}"]] },
    21: { hide: true, items: [{ o: blood }],
      uk: [["Кров", "Тут вимірюють гомоцистеїн: речовину, яку CBS перетворює на цистатіонін.{3}"]],
      en: [["Blood", "Homocysteine, the substance CBS turns into cystathionine, is measured here.{3}"]] },
    22: { items: [{ o: ["brain"] }],
      uk: [["Мозок", "У префронтальній корі це один із ключових ферментів виведення дофаміну.{1}"]],
      en: [["Brain", "In the prefrontal cortex it is a key enzyme for clearing dopamine.{1}"]] },
    23: { items: [{ p: "scalp" }, { o: ["skin"] }],
      uk: [["Волосся на голові", "Мінливість гена AR є головною передумовою раннього облисіння за чоловічим типом.{1}"], ["Багато тканин тіла", "Зв’язавши гормон, рецептор регулює зчитування генів-мішеней.{10}"]],
      en: [["Scalp hair", "Variation in the AR gene is the main prerequisite for early male-pattern hair loss.{1}"], ["Many tissues of the body", "Once it binds a hormone, the receptor regulates the reading of target genes.{10}"]] },
    24: { hide: true, items: [{ o: ["skin"] }, { k: "muscle" }],
      uk: [["Майже кожна клітина", "мтДНК присутня в клітині в сотнях і тисячах копій.{4}"], ["М’язи", "Після тренувань на витривалість у них стає більше мітохондрій.{6}"]],
      en: [["Almost every cell", "A cell holds hundreds to thousands of copies of mtDNA.{4}"], ["Muscles", "After endurance training they contain more mitochondria.{6}"]] }
  };
  const TITLE = { uk: { title: "Де це в тілі", sub: "" }, en: { title: "Where it is in the body", sub: "" } };
  DAYS.forEach((d) => {
    const w = W[d.d];
    if (!w || w.hide) return;      // hide: фігури в цей день немає (лише аналіз крові; тканини чи органу немає в моделі; зображення виглядало моторошно)
    const pack = (lang) => ({ title: TITLE[lang].title, sub: TITLE[lang].sub, items: w[lang].map(([k, t]) => ({ k, t })) });
    d.viz = [{ id: "where", after: "role", items: w.items, cut: w.cut, frame: w.frame, uk: pack("uk"), en: pack("en") }].concat(d.viz || []);     // перед схемою з молекулами
  });
})();
