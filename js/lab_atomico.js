/* lab_atomico.js — módulos: Criação | Fusão | Colisor
   Requer: elements_data.js (define window.ELEMENT_DATA e window.ELEMENTS_READY)
*/
const $ = sel => document.querySelector(sel);
const now = () => new Date().toLocaleTimeString();
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const fmtTime = s =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

// ---------------- Estado global ----------------
let currentAtom = null;
let timers = { criacao: 0, fusao: 0, colisor: 0 };
let tHandles = { criacao: null, fusao: null, colisor: null };

// criação (Z/N/E e ambiente)
let Z = 1, N = 0, E = 1;
let envCriacao = { temp: 25, pressure: 1, magnetic: 50 };

// fusão
let envFusao = { temp: 5000, pressure: 5, magnetic: 70 };
let fuseA = null, fuseB = null;

// colisor
let colliderRunning = false;
let envColisor = { energia: 10, intensidade: 50 };
const PARTICLE_SET = {
  proton: { label: "Próton (p⁺)", color: "#4fc3f7", charge: +1, mass: 1 },
  electron: { label: "Elétron (e⁻)", color: "#ff5252", charge: -1, mass: 0.0005 },
  neutron: { label: "Nêutron (n⁰)", color: "#aaaaaa", charge: 0, mass: 1 },
  alpha: { label: "Alfa (⁴He²⁺)", color: "#66bb6a", charge: +2, mass: 4 },
  photon: { label: "Fóton (γ)", color: "#ffeb3b", charge: 0, mass: 0 },
  antiproton: { label: "Antipróton (p̄)", color: "#9c27b0", charge: -1, mass: 1 },
  positron: { label: "Pósitron (e⁺)", color: "#ff80ab", charge: +1, mass: 0.0005 },
};
let beamA = "proton";
let beamB = "proton";

// ---------------- Cronômetros ----------------
function setChrono(module, seconds) {
  const map = {
    criacao: "#chronoCriacao",
    fusao: "#chronoFusao",
    colisor: "#chronoColisor",
  };
  const el = $(map[module]);
  if (el) el.textContent = "⏱️ " + fmtTime(seconds);
}
function startChrono(module) {
  stopChrono(module);
  tHandles[module] = setInterval(() => {
    timers[module]++;
    setChrono(module, timers[module]);
  }, 1000);
}
function stopChrono(module) {
  if (tHandles[module]) {
    clearInterval(tHandles[module]);
    tHandles[module] = null;
  }
  timers[module] = 0;
  setChrono(module, 0);
}

// ---------------- Detector de radiação ----------------
function setDetector(kind, pct) {
  const ids = {
    criacao: ["#radBar", "#radLabel"],
    fusao: ["#radBarFusao", "#radLabelFusao"],
    colisor: ["#radBarColisor", "#radLabelColisor"],
  };
  const [barSel, labSel] = ids[kind];
  const bar = $(barSel),
    lab = $(labSel);
  if (!bar || !lab) return;
  const p = clamp(Math.round(pct), 0, 100);
  bar.style.width = p + "%";
  if (p < 30) {
    bar.style.background = "var(--radioactive-green)";
    lab.textContent = "Seguro";
  } else if (p < 60) {
    bar.style.background = "var(--warning-yellow)";
    lab.textContent = "Instável";
  } else {
    bar.style.background = "var(--danger-red)";
    lab.textContent = "Radioativo";
  }
}

// ---------------- Log helper ----------------
function addLog(sel, msg) {
  const box = $(sel);
  if (!box) return;
  const d = document.createElement("div");
  d.className = "log-entry";
  d.textContent = `[${now()}] ${msg}`;
  box.appendChild(d);
  box.scrollTop = box.scrollHeight;
}

// ---------------- Heurística de estabilidade ----------------
function stabilityFromZN(Z, N, env) {
  if (!Z) return { stability: 0, radiation: 100 };
  const ratio = N / Z;
  // “vale” centrado em ~1.2 com penalidades simples
  let base = 100 - Math.abs(ratio - 1.2) * 80;
  if (Z > 82) base -= (Z - 82) * 0.8;
  if (Z === 43 || Z === 61) base -= 25; // Tc e Pm
  base -= env.temp / 5;
  base -= env.pressure * 0.5;
  base += env.magnetic / 10;
  const stability = clamp(base, 0, 100);
  return { stability, radiation: 100 - stability };
}

// ---------------- Canvas utils ----------------
const ctxs = {
  criacao: $("#canvasCriacao")?.getContext("2d"),
  fusao: $("#canvasFusao")?.getContext("2d"),
  colisor: $("#canvasColisor")?.getContext("2d"),
};
function clearCtx(ctx) {
  if (!ctx) return;
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#0d0e20";
  ctx.fillRect(0, 0, width, height);
}

// =====================================================
//                MODO CRIAÇÃO — ANIMADO
// =====================================================
let atomParticles = { protons: [], neutrons: [], electrons: [] };
let creationAnimStarted = false;

function setupAtomAnimation() {
  const ctx = ctxs.criacao;
  if (!ctx) return;
  const { width: w, height: h } = ctx.canvas;
  const cx = w / 2,
    cy = h / 2;
  const Rn = Math.max(25, Math.sqrt(Z + N) * 3.5);

  // prótons
  atomParticles.protons = Array.from({ length: Z }, () => ({
    x: cx + (Math.random() - 0.5) * Rn * 0.9,
    y: cy + (Math.random() - 0.5) * Rn * 0.9,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
  }));
  // nêutrons
  atomParticles.neutrons = Array.from({ length: N }, () => ({
    x: cx + (Math.random() - 0.5) * Rn * 0.9,
    y: cy + (Math.random() - 0.5) * Rn * 0.9,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
  }));
  // elétrons em conchas
  atomParticles.electrons = [];
  let eLeft = E;
  const shells = [2, 8, 18, 32, 32, 18];
  const radii = [Rn + 28, Rn + 52, Rn + 78, Rn + 108, Rn + 140, Rn + 175];
  shells.forEach((cap, i) => {
    if (eLeft <= 0) return;
    const put = Math.min(eLeft, cap);
    for (let k = 0; k < put; k++) {
      const a = (k / put) * Math.PI * 2;
      atomParticles.electrons.push({
        orbit: radii[i],
        angle: a,
        speed: 0.007 + Math.random() * 0.015,
      });
    }
    eLeft -= put;
  });
}

function animateCreation() {
  const ctx = ctxs.criacao;
  if (!ctx) return;
  clearCtx(ctx);
  const { width: w, height: h } = ctx.canvas;
  const cx = w / 2,
    cy = h / 2;
  const Rn = Math.max(25, Math.sqrt(Z + N) * 3.5);

  // núcleo “bolha”
  ctx.beginPath();
  ctx.arc(cx, cy, Rn, 0, Math.PI * 2);
  ctx.fillStyle = "#16203a";
  ctx.fill();

  // prótons vibrando
  ctx.fillStyle = "#FFD54F";
  atomParticles.protons.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    // “rebate” nas bordas do núcleo
    if (Math.hypot(p.x - cx, p.y - cy) > Rn - 5) {
      p.vx *= -1;
      p.vy *= -1;
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3.6, 0, Math.PI * 2);
    ctx.fill();
  });

  // nêutrons vibrando
  ctx.fillStyle = "#B0BEC5";
  atomParticles.neutrons.forEach(n => {
    n.x += n.vx;
    n.y += n.vy;
    if (Math.hypot(n.x - cx, n.y - cy) > Rn - 5) {
      n.vx *= -1;
      n.vy *= -1;
    }
    ctx.beginPath();
    ctx.arc(n.x, n.y, 3.3, 0, Math.PI * 2);
    ctx.fill();
  });

  // desenha órbitas (uma por raio distinto)
  ctx.strokeStyle = "rgba(120,155,255,0.22)";
  ctx.lineWidth = 1;
  const orbits = [...new Set(atomParticles.electrons.map(e => e.orbit))];
  orbits.forEach(r => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  });

  // elétrons orbitando
  ctx.fillStyle = "#90CAF9";
  atomParticles.electrons.forEach(e => {
    e.angle += e.speed;
    const x = cx + Math.cos(e.angle) * e.orbit;
    const y = cy + Math.sin(e.angle) * e.orbit;
    ctx.beginPath();
    ctx.arc(x, y, 2.6, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateCreation);
}

// chamado sempre que Z/N/E ou ambiente mudarem
function drawCreation() {
  setupAtomAnimation();
  if (!creationAnimStarted) {
    creationAnimStarted = true;
    requestAnimationFrame(animateCreation);
  }
}

// bind dos sliders de criação
function bindCreationSliders() {
  const pr = $("#protonRange"),
    nr = $("#neutronRange"),
    er = $("#electronRange");
  const pv = $("#protonVal"),
    nv = $("#neutronVal"),
    ev = $("#electronVal");

  const update = () => {
    Z = +pr.value;
    N = +nr.value;
    E = +er.value;
    if (pv) pv.textContent = Z;
    if (nv) nv.textContent = N;
    if (ev) ev.textContent = E;
    drawCreation();
    const { radiation } = stabilityFromZN(Z, N, envCriacao);
    setDetector("criacao", radiation);
  };

  if (pr) pr.addEventListener("input", update);
  if (nr) nr.addEventListener("input", update);
  if (er) er.addEventListener("input", update);
  update();

  // ambiente
  $("#tempSlider")?.addEventListener("input", e => {
    envCriacao.temp = +e.target.value;
    $("#tempValue").textContent = `${envCriacao.temp}°C`;
    const { radiation } = stabilityFromZN(Z, N, envCriacao);
    setDetector("criacao", radiation);
    drawCreation();
  });
  $("#pressSlider")?.addEventListener("input", e => {
    envCriacao.pressure = +e.target.value;
    $("#pressValue").textContent = `${envCriacao.pressure} atm`;
    const { radiation } = stabilityFromZN(Z, N, envCriacao);
    setDetector("criacao", radiation);
    drawCreation();
  });
  $("#magSlider")?.addEventListener("input", e => {
    envCriacao.magnetic = +e.target.value;
    $("#magValue").textContent = `${envCriacao.magnetic}%`;
    const { radiation } = stabilityFromZN(Z, N, envCriacao);
    setDetector("criacao", radiation);
    drawCreation();
  });
}

window.resetCriacao = function () {
  if ($("#protonRange")) $("#protonRange").value = 1;
  if ($("#neutronRange")) $("#neutronRange").value = 0;
  if ($("#electronRange")) $("#electronRange").value = 1;
  if ($("#tempSlider")) $("#tempSlider").value = 25;
  if ($("#pressSlider")) $("#pressSlider").value = 1;
  if ($("#magSlider")) $("#magSlider").value = 50;
  $("#tempValue").textContent = "25°C";
  $("#pressValue").textContent = "1 atm";
  $("#magValue").textContent = "50%";
  bindCreationSliders();
  stopChrono("criacao");
  addLog("#log", "🔄 Resetado.");
  setDetector("criacao", 0);
};

// analisar criação
window.analyzeCriacao = async function () {
  await window.ELEMENTS_READY;
  const { stability, radiation } = stabilityFromZN(Z, N, envCriacao);
  setDetector("criacao", radiation);

  const el =
    ELEMENT_DATA[Z] || {
      symbol: `Z${Z}`,
      name: "Núcleo sintético",
      atomicNumber: Z,
      atomicMass: Z + N,
      electronConfiguration: "—",
      stability: stability > 50 ? "Quase estável" : "Instável",
      halfLife: "Curta",
      meltingPoint: null,
      boilingPoint: null,
    };

  currentAtom = { Z, N, E, el, stability, radiation };
  addLog(
    "#log",
    `✅ Elemento: ${el.name} (${el.symbol}) — Z=${Z}, N=${N}`
  );
  addLog(
    "#log",
    `Estabilidade: ${stability.toFixed(1)}% • Radiação: ${Math.round(
      radiation
    )}%`
  );
  if (stability < 40) {
    addLog("#log", "⚠️ Muito instável — iniciando cronômetro.");
    startChrono("criacao");
  } else {
    stopChrono("criacao");
  }
};

// =====================================================
//                     MODO FUSÃO
// =====================================================
function fillFusionSelects() {
  const s1 = $("#el1Select"),
    s2 = $("#el2Select");
  if (!s1 || !s2) return;
  const makeOpts = () => {
    const frag = document.createDocumentFragment();
    Object.keys(ELEMENT_DATA)
      .sort((a, b) => +a - +b)
      .forEach(k => {
        const e = ELEMENT_DATA[k];
        const opt = document.createElement("option");
        opt.value = k;
        opt.textContent = `${k} — ${e.name} (${e.symbol})`;
        frag.appendChild(opt);
      });
    return frag;
  };
  s1.innerHTML = "";
  s2.innerHTML = "";
  s1.appendChild(makeOpts());
  s2.appendChild(makeOpts());
}

window.useCurrentAs = function (which) {
  if (!currentAtom) {
    addLog(
      "#logFusao",
      "⚠️ Crie/analise um átomo no modo Criação primeiro."
    );
    return;
  }
  if (which === 1) {
    fuseA = { Z: currentAtom.Z, N: currentAtom.N };
    if ($("#el1Select")) $("#el1Select").value = String(currentAtom.Z);
  } else {
    fuseB = { Z: currentAtom.Z, N: currentAtom.N };
    if ($("#el2Select")) $("#el2Select").value = String(currentAtom.Z);
  }
  addLog("#logFusao", `Átomo ${which} definido: Z=${currentAtom.Z}, N=${currentAtom.N}`);
  drawFusionPreview();
};

window.fuseElements = async function () {
  await window.ELEMENTS_READY;
  // se não veio pelos botões, lê dos selects e assume N ~ 1.2Z
  if (!fuseA && $("#el1Select")) {
    const Z1 = +$("#el1Select").value;
    fuseA = { Z: Z1, N: Math.round(Z1 * 1.2) };
  }
  if (!fuseB && $("#el2Select")) {
    const Z2 = +$("#el2Select").value;
    fuseB = { Z: Z2, N: Math.round(Z2 * 1.2) };
  }
  if (!fuseA || !fuseB) {
    addLog("#logFusao", "Selecione os dois elementos.");
    return;
  }

  startChrono("fusao");
  const Zf = fuseA.Z + fuseB.Z;
  const Nf = fuseA.N + fuseB.N;

  const elF =
    ELEMENT_DATA[Zf] || {
      symbol: `Z${Zf}`,
      name: "Núcleo superpesado",
      atomicNumber: Zf,
      atomicMass: Zf + Nf,
      stability: "Instável",
      halfLife: "—",
    };
  const { stability, radiation } = stabilityFromZN(Zf, Nf, envFusao);
  setDetector("fusao", radiation);

  addLog("#logFusao", `🌟 Fusão: (Z${fuseA.Z}+Z${fuseB.Z}) → Z${Zf}, N=${Nf}`);
  addLog(
    "#logFusao",
    `Produto: ${elF.name} (${elF.symbol}) • Estab. ${stability.toFixed(
      1
    )}% • Rad. ${Math.round(radiation)}%`
  );

  currentAtom = { Z: Zf, N: Nf, E: Zf, el: elF, stability, radiation };
  animateFusion(Zf, Nf);
};

window.resetFusao = function () {
  fuseA = fuseB = null;
  stopChrono("fusao");
  setDetector("fusao", 0);
  addLog("#logFusao", "🔄 Reset.");
  drawFusionPreview(true);
};

// sliders fusão
$("#tempFusao")?.addEventListener("input", e => {
  envFusao.temp = +e.target.value;
  $("#tempFusaoValue").textContent = `${envFusao.temp}K`;
});
$("#pressFusao")?.addEventListener("input", e => {
  envFusao.pressure = +e.target.value;
  $("#pressFusaoValue").textContent = `${envFusao.pressure} atm`;
});
$("#magFusao")?.addEventListener("input", e => {
  envFusao.magnetic = +e.target.value;
  $("#magFusaoValue").textContent = `${envFusao.magnetic}%`;
});

// preview/anim
function drawFusionPreview(clearOnly = false) {
  const ctx = ctxs.fusao;
  if (!ctx) return;
  clearCtx(ctx);
  if (clearOnly) return;
  const { width: w, height: h } = ctx.canvas;
  const cx = w / 2,
    cy = h / 2;

  ctx.globalAlpha = 0.5;
  ctx.fillStyle = "#374785";
  ctx.beginPath();
  ctx.arc(cx - 90, cy, 42, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx + 90, cy, 42, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.fillStyle = "#9aa7ff";
  ctx.font = "12px Segoe UI";
  ctx.fillText("Elemento 1", cx - 130, cy + 64);
  ctx.fillText("Elemento 2", cx + 60, cy + 64);
}

function animateFusion(Zf, Nf) {
  const ctx = ctxs.fusao;
  if (!ctx) return;
  let t = 0;
  (function step() {
    clearCtx(ctx);
    const { width: w, height: h } = ctx.canvas;
    const cx = w / 2,
      cy = h / 2;
    const off = Math.max(10, 90 - t * 4);

    ctx.fillStyle = "#3f51b5";
    ctx.beginPath();
    ctx.arc(cx - off, cy, 42, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#009688";
    ctx.beginPath();
    ctx.arc(cx + off, cy, 42, 0, Math.PI * 2);
    ctx.fill();

    if (off <= 12) {
      const R = Math.max(24, Math.sqrt(Zf + Nf) * 3);
      ctx.fillStyle = "#1e88e5";
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    t++;
    requestAnimationFrame(step);
  })();
}

// =====================================================
//                    MODO COLISOR
// =====================================================
function fillColliderSelects() {
  const a = $("#beamA"),
    b = $("#beamB");
  if (!a || !b) return;
  const keys = Object.keys(PARTICLE_SET);
  keys.forEach(k => {
    const o1 = document.createElement("option");
    o1.value = k;
    o1.textContent = PARTICLE_SET[k].label;
    a.appendChild(o1);
    const o2 = document.createElement("option");
    o2.value = k;
    o2.textContent = PARTICLE_SET[k].label;
    b.appendChild(o2);
  });
  a.value = beamA;
  b.value = beamB;
  a.addEventListener("change", e => (beamA = e.target.value));
  b.addEventListener("change", e => (beamB = e.target.value));
}

$("#energiaSlider")?.addEventListener("input", e => {
  envColisor.energia = +e.target.value;
  $("#energiaValue").textContent = `${envColisor.energia} GeV`;
});
$("#intSlider")?.addEventListener("input", e => {
  envColisor.intensidade = +e.target.value;
  $("#intValue").textContent = `${envColisor.intensidade}%`;
});

let colParticles = [];
function makeBeamParticle(side) {
  const kind = side === "A" ? beamA : beamB;
  const def = PARTICLE_SET[kind];
  const ctx = ctxs.colisor;
  const { height: h, width: w } = ctx.canvas;
  return {
    kind,
    x: side === "A" ? 12 : w - 12,
    y: h / 2 + (Math.random() * 60 - 30),
    vx: (side === "A" ? 1 : -1) * (2 + envColisor.energia / 15),
    color: def.color,
    r: 5,
  };
}

window.startCollider = function () {
  if (colliderRunning) return;
  colliderRunning = true;
  startChrono("colisor");
  addLog(
    "#logColisor",
    `🚀 Colisor ON — ${envColisor.energia} GeV, ${envColisor.intensidade}%`
  );
  loopCollider();
};
window.stopCollider = function () {
  colliderRunning = false;
  stopChrono("colisor");
  setDetector("colisor", 0);
  addLog("#logColisor", "🧊 Colisor OFF.");
};
window.analyzeCollision = function () {
  const msgs = [
    "📊 Jatos hadrônicos",
    "📊 Fóton de alta energia",
    "📊 Par múon/antimúon",
    "📊 Ressonância curta",
  ];
  addLog("#logColisor", msgs[Math.floor(Math.random() * msgs.length)]);
};

function loopCollider() {
  if (!colliderRunning) return;
  const ctx = ctxs.colisor;
  clearCtx(ctx);
  const { width: w, height: h } = ctx.canvas;

  // linhas do “campo”
  ctx.strokeStyle = "rgba(79,195,247,.22)";
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(0, h / 3);
  ctx.lineTo(w, h / 3);
  ctx.moveTo(0, (2 * h) / 3);
  ctx.lineTo(w, (2 * h) / 3);
  ctx.stroke();
  ctx.setLineDash([]);

  // gerar feixes conforme intensidade
  if (Math.random() < envColisor.intensidade / 100) colParticles.push(makeBeamParticle("A"));
  if (Math.random() < envColisor.intensidade / 100) colParticles.push(makeBeamParticle("B"));

  // atualizar/desenhar
  colParticles = colParticles.filter(p => {
    p.x += p.vx;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    return p.x > -20 && p.x < w + 20;
  });

  // “área” de colisão no centro
  const centerX = w / 2;
  const left = colParticles.filter(p => p.vx > 0 && Math.abs(p.x - centerX) < 6);
  const right = colParticles.filter(p => p.vx < 0 && Math.abs(p.x - centerX) < 6);

  if (left.length && right.length) {
    addLog("#logColisor", "💥 Colisão no detector.");
    const baseRad = envColisor.energia * 0.8 + envColisor.intensidade * 0.3;

    if (Math.random() < 0.25) {
      addLog("#logColisor", "⚡ Par matéria–antimatéria (e⁻/e⁺) produzido.");
    }
    if (Math.random() < 0.18) {
      const heavy = envColisor.energia > 40 && Math.random() < 0.5;
      const Znew = heavy
        ? 90 + Math.floor(Math.random() * 28)
        : [1, 2, 3, 6, 7, 8][Math.floor(Math.random() * 6)];
      const Nnew = heavy
        ? Math.round(Znew * 1.5) + Math.floor(Math.random() * 8 - 4)
        : Math.round(Znew * 1.1);
      const { radiation } = stabilityFromZN(Znew, Nnew, {
        temp: 300 + envColisor.energia * 50,
        pressure: 1,
        magnetic: 30,
      });
      addLog("#logColisor", `🧪 Núcleo Z=${Znew}, N=${Nnew} produzido.`);
      setDetector("colisor", clamp(baseRad + radiation, 0, 100));
    } else {
      setDetector("colisor", clamp(baseRad, 0, 100));
    }
    // remove partículas próximas ao centro
    colParticles = colParticles.filter(p => Math.abs(p.x - centerX) > 10);
  }

  requestAnimationFrame(loopCollider);
}

// =====================================================
//                       INIT
// =====================================================
(async function init() {
  await window.ELEMENTS_READY;

  // criação
  bindCreationSliders();
  drawCreation();
  setDetector("criacao", 0);

  // fusão
  fillFusionSelects();
  drawFusionPreview();

  // colisor
  fillColliderSelects();
  setDetector("colisor", 0);

  // canvases base
  clearCtx(ctxs.criacao);
  clearCtx(ctxs.fusao);
  clearCtx(ctxs.colisor);
})();
