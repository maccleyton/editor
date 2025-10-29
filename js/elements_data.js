// elements_data.js
// Gera window.ELEMENT_DATA com os 118 elementos no formato pedido.
// - Busca dataset público (Bowserinator/Periodic-Table-JSON)
// - Converte unidades (K -> °C), cria campos faltantes, estima nêutrons
// - Marca estabilidade (regras simples + exceções Tc/Pm/Bi)
// - Cacheia em localStorage pra não depender sempre da rede

(function () {
  const LS_KEY = "ELEMENT_DATA_v1";
  const SRC =
    "https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json";

  // Fallback mínimo se offline: (pode complementar depois se quiser)
  const FALLBACK = {
    1: {symbol:"H",name:"Hidrogênio",group:"nonmetal",atomicMass:1.008,atomicNumber:1,electronConfiguration:"1s¹",electronegativity:2.20,meltingPoint:-259,boilingPoint:-253,electrons:1,protons:1,neutrons:0,electronShells:[1],energyLevels:[13.6],radioactivity:0,stability:"Estável",halfLife:"Estável",ph:7,charge:0},
    2: {symbol:"He",name:"Hélio",group:"noble-gas",atomicMass:4.0026,atomicNumber:2,electronConfiguration:"1s²",electronegativity:null,meltingPoint:-272,boilingPoint:-269,electrons:2,protons:2,neutrons:2,electronShells:[2],energyLevels:[24.6,54.4],radioactivity:0,stability:"Estável",halfLife:"Estável",ph:7,charge:0},
    3: {symbol:"Li",name:"Lítio",group:"alkali-metal",atomicMass:6.94,atomicNumber:3,electronConfiguration:"[He] 2s¹",electronegativity:0.98,meltingPoint:180.5,boilingPoint:1342,electrons:3,protons:3,neutrons:4,electronShells:[2,1],energyLevels:[5.39],radioactivity:0,stability:"Estável",halfLife:"Estável",ph:7,charge:0},
    6: {symbol:"C",name:"Carbono",group:"nonmetal",atomicMass:12.011,atomicNumber:6,electronConfiguration:"[He] 2s² 2p²",electronegativity:2.55,meltingPoint:3550,boilingPoint:4027,electrons:6,protons:6,neutrons:6,electronShells:[2,4],energyLevels:[11.26],radioactivity:0,stability:"Estável",halfLife:"Estável",ph:7,charge:0},
    7: {symbol:"N",name:"Nitrogênio",group:"nonmetal",atomicMass:14.007,atomicNumber:7,electronConfiguration:"[He] 2s² 2p³",electronegativity:3.04,meltingPoint:-210,boilingPoint:-196,electrons:7,protons:7,neutrons:7,electronShells:[2,5],energyLevels:[14.53],radioactivity:0,stability:"Estável",halfLife:"Estável",ph:7,charge:0},
    8: {symbol:"O",name:"Oxigênio",group:"nonmetal",atomicMass:15.999,atomicNumber:8,electronConfiguration:"[He] 2s² 2p⁴",electronegativity:3.44,meltingPoint:-219,boilingPoint:-183,electrons:8,protons:8,neutrons:8,electronShells:[2,6],energyLevels:[13.62],radioactivity:0,stability:"Estável",halfLife:"Estável",ph:7,charge:0},
    17:{symbol:"Cl",name:"Cloro",group:"halogen",atomicMass:35.45,atomicNumber:17,electronConfiguration:"[Ne] 3s² 3p⁵",electronegativity:3.16,meltingPoint:-101,boilingPoint:-34,electrons:17,protons:17,neutrons:18,electronShells:[2,8,7],energyLevels:[12.97],radioactivity:0,stability:"Estável",halfLife:"Estável",ph:7,charge:0},
    26:{symbol:"Fe",name:"Ferro",group:"transition-metal",atomicMass:55.845,atomicNumber:26,electronConfiguration:"[Ar] 3d⁶ 4s²",electronegativity:1.83,meltingPoint:1538,boilingPoint:2862,electrons:26,protons:26,neutrons:30,electronShells:[2,8,14,2],energyLevels:[7.90],radioactivity:0,stability:"Estável",halfLife:"Estável",ph:7,charge:0},
    79:{symbol:"Au",name:"Ouro",group:"transition-metal",atomicMass:196.967,atomicNumber:79,electronConfiguration:"[Xe] 4f¹⁴ 5d¹⁰ 6s¹",electronegativity:2.54,meltingPoint:1064,boilingPoint:2970,electrons:79,protons:79,neutrons:118,electronShells:[2,8,18,32,18,1],energyLevels:[9.23],radioactivity:0,stability:"Estável",halfLife:"Estável",ph:7,charge:0},
    82:{symbol:"Pb",name:"Chumbo",group:"post-transition-metal",atomicMass:207.2,atomicNumber:82,electronConfiguration:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²",electronegativity:2.33,meltingPoint:327.5,boilingPoint:1749,electrons:82,protons:82,neutrons:125,electronShells:[2,8,18,32,18,4],energyLevels:[7.42],radioactivity:0,stability:"Estável",halfLife:"Estável",ph:7,charge:0},
    92:{symbol:"U",name:"Urânio",group:"actinide",atomicMass:238.0289,atomicNumber:92,electronConfiguration:"[Rn] 5f³ 6d¹ 7s²",electronegativity:1.38,meltingPoint:1132,boilingPoint:4131,electrons:92,protons:92,neutrons:146,electronShells:[2,8,18,32,21,9,2],energyLevels:[6.19],radioactivity:90,stability:"Radioativo",halfLife:"variável",ph:7,charge:0}
  };

  function kToC(k) {
    if (k == null) return null;
    return +(k - 273.15).toFixed(0);
  }

  // map categoria -> grupo (chaves que tu pediu)
  function mapGroup(category) {
    if (!category) return "unknown";
    category = category.toLowerCase();
    if (category.includes("noble")) return "noble-gas";
    if (category.includes("alkali")) return "alkali-metal";
    if (category.includes("alkaline")) return "alkaline-earth-metal";
    if (category.includes("metalloid")) return "metalloid";
    if (category.includes("halogen")) return "halogen";
    if (category.includes("lanthanide")) return "lanthanide";
    if (category.includes("actinide")) return "actinide";
    if (category.includes("post-transition")) return "post-transition-metal";
    if (category.includes("transition")) return "transition-metal";
    if (category.includes("nonmetal")) return "nonmetal";
    return "other";
  }

  // regra simples de estabilidade (boa o bastante p/ UI):
  // - Tc (43) e Pm (61) = radioativos
  // - Z > 82 = radioativo, exceto Bi-209 (83) é "quase estável", mas tratamos como instável leve
  function inferStability(Z) {
    if (Z === 43 || Z === 61) return { stability: "Instável", radioactivity: 60, halfLife: "Radioativo" };
    if (Z <= 82) return { stability: "Estável", radioactivity: 0, halfLife: "Estável" };
    if (Z === 83) return { stability: "Instável", radioactivity: 30, halfLife: "Muito longa" };
    // superpesados
    return { stability: "Radioativo", radioactivity: 90, halfLife: "Curta" };
  }

  function toSuperscripts(cfg) {
    if (!cfg) return null;
    // transforma numeros depois das letras em sobrescrito simples, e adiciona pequenos toques (opcional)
    return cfg
      .replace(/(\d+)\s*([spdfg])/g, "$2$1")
      .replace(/(\d+)/g, (m) => m.split("").map(d=> "⁰¹²³⁴⁵⁶⁷⁸⁹"[+d]).join(""));
  }

  function buildElement(e) {
    const Z = e.number;
    const mass = e.atomic_mass;
    const shells = e.shells || [];
    const neutrons = Math.max(0, Math.round(mass) - Z);

    const stab = inferStability(Z);

    return {
      symbol: e.symbol,
      name: e.name_pt || e.name, // se quiser traduzir depois
      group: mapGroup(e.category),
      atomicMass: +(+mass).toFixed(4),
      atomicNumber: Z,
      electronConfiguration: e.electron_configuration_semantic || e.electron_configuration || null,
      electronegativity: e.electronegativity_pauling ?? null,
      meltingPoint: kToC(e.melt),
      boilingPoint: kToC(e.boil),
      electrons: Z,
      protons: Z,
      neutrons,
      electronShells: shells,
      energyLevels: Array.isArray(e.ionization_energies) ? e.ionization_energies.map(v=>+v.toFixed(2)) : [],
      radioactivity: stab.radioactivity,
      stability: stab.stability,
      halfLife: stab.halfLife,
      ph: 7.0,
      charge: 0
    };
  }

  function normalizePortuguese(data) {
    // opcional: renomear alguns conhecidos para PT-BR
    const PT = {
      Hydrogen: "Hidrogênio", Helium: "Hélio", Lithium: "Lítio", Beryllium: "Berílio", Boron: "Boro",
      Carbon: "Carbono", Nitrogen: "Nitrogênio", Oxygen: "Oxigênio", Fluorine: "Flúor", Neon: "Neônio",
      Sodium: "Sódio", Magnesium: "Magnésio", Aluminium: "Alumínio", Silicon: "Silício", Phosphorus: "Fósforo",
      Sulfur: "Enxofre", Chlorine: "Cloro", Argon: "Argônio", Potassium: "Potássio", Calcium: "Cálcio",
      Iron: "Ferro", Copper: "Cobre", Silver: "Prata", Tin: "Estanho", Gold: "Ouro", Lead: "Chumbo",
      Uranium: "Urânio", Mercury: "Mercúrio", Bromine: "Bromo", Iodine: "Iodo"
    };
    data.elements.forEach(e => { if (PT[e.name]) e.name_pt = PT[e.name]; });
    return data;
  }

  async function loadAll() {
    // cache
    try {
      const cached = localStorage.getItem(LS_KEY);
      if (cached) {
        window.ELEMENT_DATA = JSON.parse(cached);
        return;
      }
    } catch (_) {}

    // fetch
    try {
      const res = await fetch(SRC, { cache: "force-cache" });
      const json = await res.json();
      normalizePortuguese(json);

      const out = {};
      json.elements.forEach(e => {
        out[e.number] = buildElement(e);
      });

      // ajuste visual da configuração eletrônica (sobrescrito bonitinho)
      Object.values(out).forEach(el => {
        if (el.electronConfiguration) el.electronConfiguration = toSuperscripts(el.electronConfiguration);
      });

      window.ELEMENT_DATA = out;
      try { localStorage.setItem(LS_KEY, JSON.stringify(out)); } catch (_) {}
    } catch (err) {
      console.warn("Falha ao carregar dataset online. Usando fallback mínimo.", err);
      window.ELEMENT_DATA = FALLBACK;
    }
  }

  // Exponibiliza uma Promise pra quem quiser aguardar carregamento
  window.ELEMENTS_READY = loadAll();
})();
