// Dados dos elementos com configurações eletrônicas detalhadas
const ELEMENT_DATA = {
    // ELEMENTOS MAIS CONHECIDOS E IMPORTANTES
    1: {
        symbol: "H",
        name: "Hidrogênio",
        group: "nonmetal",
        atomicMass: 1.008,
        atomicNumber: 1,
        electronConfiguration: "1s¹",
        electronegativity: 2.20,
        meltingPoint: -259,
        boilingPoint: -253,
        electrons: 1,
        protons: 1,
        neutrons: 0,
        electronShells: [1],
        energyLevels: [13.6],
        radioactivity: 0.0,
        stability: "Estável",
        halfLife: "Estável",
        ph: 7.0,
        charge: 0
    },
    2: {
        symbol: "He",
        name: "Hélio",
        group: "noble-gas",
        atomicMass: 4.0026,
        atomicNumber: 2,
        electronConfiguration: "1s²",
        electronegativity: null,
        meltingPoint: -272,
        boilingPoint: -269,
        electrons: 2,
        protons: 2,
        neutrons: 2,
        electronShells: [2],
        energyLevels: [24.6, 54.4],
        radioactivity: 0.0,
        stability: "Estável",
        halfLife: "Estável",
        ph: 7.0,
        charge: 0
    },
    6: {
        symbol: "C",
        name: "Carbono",
        group: "nonmetal",
        atomicMass: 12.011,
        atomicNumber: 6,
        electronConfiguration: "[He] 2s² 2p²",
        electronegativity: 2.55,
        meltingPoint: 3550,
        boilingPoint: 4027,
        electrons: 6,
        protons: 6,
        neutrons: 6,
        electronShells: [2, 4],
        energyLevels: [11.3, 24.4, 47.9, 64.5, 392.1, 490.0],
        radioactivity: 0.0,
        stability: "Estável",
        halfLife: "Estável",
        ph: 7.0,
        charge: 0
    },
    7: {
        symbol: "N",
        name: "Nitrogênio",
        group: "nonmetal",
        atomicMass: 14.007,
        atomicNumber: 7,
        electronConfiguration: "[He] 2s² 2p³",
        electronegativity: 3.04,
        meltingPoint: -210,
        boilingPoint: -196,
        electrons: 7,
        protons: 7,
        neutrons: 7,
        electronShells: [2, 5],
        energyLevels: [14.5, 29.6, 47.4, 77.5, 97.9, 552.1],
        radioactivity: 0.0,
        stability: "Estável",
        halfLife: "Estável",
        ph: 7.0,
        charge: 0
    },
    8: {
        symbol: "O",
        name: "Oxigênio",
        group: "nonmetal",
        atomicMass: 15.999,
        atomicNumber: 8,
        electronConfiguration: "[He] 2s² 2p⁴",
        electronegativity: 3.44,
        meltingPoint: -219,
        boilingPoint: -183,
        electrons: 8,
        protons: 8,
        neutrons: 8,
        electronShells: [2, 6],
        energyLevels: [13.6, 35.1, 54.9, 77.4, 113.9, 138.1],
        radioactivity: 0.0,
        stability: "Estável",
        halfLife: "Estável",
        ph: 7.0,
        charge: 0
    },
    11: {
        symbol: "Na",
        name: "Sódio",
        group: "alkali-metal",
        atomicMass: 22.990,
        atomicNumber: 11,
        electronConfiguration: "[Ne] 3s¹",
        electronegativity: 0.93,
        meltingPoint: 98,
        boilingPoint: 883,
        electrons: 11,
        protons: 11,
        neutrons: 12,
        electronShells: [2, 8, 1],
        energyLevels: [5.14, 47.3, 71.6, 98.9, 138.0, 172.0],
        radioactivity: 0.0,
        stability: "Estável",
        halfLife: "Estável",
        ph: 12.0,
        charge: 0
    },
    12: {
        symbol: "Mg",
        name: "Magnésio",
        group: "alkaline-earth-metal",
        atomicMass: 24.305,
        atomicNumber: 12,
        electronConfiguration: "[Ne] 3s²",
        electronegativity: 1.31,
        meltingPoint: 650,
        boilingPoint: 1090,
        electrons: 12,
        protons: 12,
        neutrons: 12,
        electronShells: [2, 8, 2],
        energyLevels: [7.65, 15.0, 80.1, 109.3, 141.3, 186.5],
        radioactivity: 0.0,
        stability: "Estável",
        halfLife: "Estável",
        ph: 9.5,
        charge: 0
    },
    13: {
        symbol: "Al",
        name: "Alumínio",
        group: "post-transition-metal",
        atomicMass: 26.982,
        atomicNumber: 13,
        electronConfiguration: "[Ne] 3s² 3p¹",
        electronegativity: 1.61,
        meltingPoint: 660,
        boilingPoint: 2519,
        electrons: 13,
        protons: 13,
        neutrons: 14,
        electronShells: [2, 8, 3],
        energyLevels: [5.99, 18.8, 28.4, 120.0, 153.8, 190.5],
        radioactivity: 0.0,
        stability: "Estável",
        halfLife: "Estável",
        ph: 6.5,
        charge: 0
    },
    14: {
        symbol: "Si",
        name: "Silício",
        group: "metalloid",
        atomicMass: 28.085,
        atomicNumber: 14,
        electronConfiguration: "[Ne] 3s² 3p²",
        electronegativity: 1.90,
        meltingPoint: 1414,
        boilingPoint: 3265,
        electrons: 14,
        protons: 14,
        neutrons: 14,
        electronShells: [2, 8, 4],
        energyLevels: [8.15, 16.3, 33.5, 45.1, 166.8, 205.1],
        radioactivity: 0.0,
        stability: "Estável",
        halfLife: "Estável",
        ph: 7.0,
        charge: 0
    },
    16: {
        symbol: "S",
        name: "Enxofre",
        group: "nonmetal",
        atomicMass: 32.06,
        atomicNumber: 16,
        electronConfiguration: "[Ne] 3s² 3p⁴",
        electronegativity: 2.58,
        meltingPoint: 115,
        boilingPoint: 445,
        electrons: 16,
        protons: 16,
        neutrons: 16,
        electronShells: [2, 8, 6],
        energyLevels: [10.4, 23.3, 34.8, 47.3, 72.5, 88.0],
        radioactivity: 0.0,
        stability: "Estável",
        halfLife: "Estável",
        ph: 2.5,
        charge: 0
    },
    17: {
        symbol: "Cl",
        name: "Cloro",
        group: "halogen",
        atomicMass: 35.45,
        atomicNumber: 17,
        electronConfiguration: "[Ne] 3s² 3p⁵",
        electronegativity: 3.16,
        meltingPoint: -101,
        boilingPoint: -35,
        electrons: 17,
        protons: 17,
        neutrons: 18,
        electronShells: [2, 8, 7],
        energyLevels: [13.0, 23.8, 39.9, 53.5, 67.8, 96.6],
        radioactivity: 0.0,
        stability: "Estável",
        halfLife: "Estável",
        ph: 2.0,
        charge: 0
    },
    19: {
        symbol: "K",
        name: "Potássio",
        group: "alkali-metal",
        atomicMass: 39.098,
        atomicNumber: 19,
        electronConfiguration: "[Ar] 4s¹",
        electronegativity: 0.82,
        meltingPoint: 63,
        boilingPoint: 759,
        electrons: 19,
        protons: 19,
        neutrons: 20,
        electronShells: [2, 8, 8, 1],
        energyLevels: [4.34, 31.6, 45.7, 60.9, 82.7, 100.0],
        radioactivity: 0.0,
        stability: "Estável",
        halfLife: "Estável",
        ph: 11.5,
        charge: 0
    },
    20: {
        symbol: "Ca",
        name: "Cálcio",
        group: "alkaline-earth-metal",
        atomicMass: 40.078,
        atomicNumber: 20,
        electronConfiguration: "[Ar] 4s²",
        electronegativity: 1.00,
        meltingPoint: 842,
        boilingPoint: 1484,
        electrons: 20,
        protons: 20,
        neutrons: 20,
        electronShells: [2, 8, 8, 2],
        energyLevels: [6.11, 11.9, 50.9, 67.3, 84.5, 108.8],
        radioactivity: 0.0,
        stability: "Estável",
        halfLife: "Estável",
        ph: 9.0,
        charge: 0
    },
    26: {
        symbol: "Fe",
        name: "Ferro",
        group: "transition-metal",
        atomicMass: 55.845,
        atomicNumber: 26,
        electronConfiguration: "[Ar] 3d⁶ 4s²",
        electronegativity: 1.83,
        meltingPoint: 1538,
        boilingPoint: 2862,
        electrons: 26,
        protons: 26,
        neutrons: 30,
        electronShells: [2, 8, 14, 2],
        energyLevels: [7.9, 16.2, 30.7, 54.9, 75.0, 99.0],
        radioactivity: 0.0,
        stability: "Estável",
        halfLife: "Estável",
        ph: 7.0,
        charge: 0
    },
    29: {
        symbol: "Cu",
        name: "Cobre",
        group: "transition-metal",
        atomicMass: 63.546,
        atomicNumber: 29,
        electronConfiguration: "[Ar] 3d¹⁰ 4s¹",
        electronegativity: 1.90,
        meltingPoint: 1085,
        boilingPoint: 2562,
        electrons: 29,
        protons: 29,
        neutrons: 35,
        electronShells: [2, 8, 18, 1],
        energyLevels: [7.73, 20.3, 36.8, 57.4, 79.9, 103.0],
        radioactivity: 0.0,
        stability: "Estável",
        halfLife: "Estável",
        ph: 7.0,
        charge: 0
    },
    47: {
        symbol: "Ag",
        name: "Prata",
        group: "transition-metal",
        atomicMass: 107.87,
        atomicNumber: 47,
        electronConfiguration: "[Kr] 4d¹⁰ 5s¹",
        electronegativity: 1.93,
        meltingPoint: 962,
        boilingPoint: 2162,
        electrons: 47,
        protons: 47,
        neutrons: 61,
        electronShells: [2, 8, 18, 18, 1],
        energyLevels: [7.58, 21.5, 34.8, 51.4, 67.5, 83.0],
        radioactivity: 0.0,
        stability: "Estável",
        halfLife: "Estável",
        ph: 7.0,
        charge: 0
    },
    79: {
        symbol: "Au",
        name: "Ouro",
        group: "transition-metal",
        atomicMass: 196.97,
        atomicNumber: 79,
        electronConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹",
        electronegativity: 2.54,
        meltingPoint: 1064,
        boilingPoint: 2856,
        electrons: 79,
        protons: 79,
        neutrons: 118,
        electronShells: [2, 8, 18, 32, 18, 1],
        energyLevels: [9.2, 20.5, 30.0, 99.0, 120.0, 150.0],
        radioactivity: 0.0,
        stability: "Estável",
        halfLife: "Estável",
        ph: 7.0,
        charge: 0
    },
    82: {
        symbol: "Pb",
        name: "Chumbo",
        group: "post-transition-metal",
        atomicMass: 207.2,
        atomicNumber: 82,
        electronConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²",
        electronegativity: 2.33,
        meltingPoint: 327,
        boilingPoint: 1749,
        electrons: 82,
        protons: 82,
        neutrons: 125,
        electronShells: [2, 8, 18, 32, 18, 4],
        energyLevels: [7.42, 15.0, 31.9, 42.3, 68.8, 88.0],
        radioactivity: 0.0,
        stability: "Estável",
        halfLife: "Estável",
        ph: 6.0,
        charge: 0
    },
    92: {
        symbol: "U",
        name: "Urânio",
        group: "actinide",
        atomicMass: 238.03,
        atomicNumber: 92,
        electronConfiguration: "[Rn] 5f³ 6d¹ 7s²",
        electronegativity: 1.38,
        meltingPoint: 1135,
        boilingPoint: 4131,
        electrons: 92,
        protons: 92,
        neutrons: 146,
        electronShells: [2, 8, 18, 32, 21, 9, 2],
        energyLevels: [6.2, 11.9, 50.7, 99.0, 150.0],
        radioactivity: 0.8,
        stability: "Radioativo",
        halfLife: "4.5 bilhões de anos",
        ph: 4.0,
        charge: 0
    },
    94: {
        symbol: "Pu",
        name: "Plutônio",
        group: "actinide",
        atomicMass: 244,
        atomicNumber: 94,
        electronConfiguration: "[Rn] 5f⁶ 7s²",
        electronegativity: 1.28,
        meltingPoint: 640,
        boilingPoint: 3228,
        electrons: 94,
        protons: 94,
        neutrons: 150,
        electronShells: [2, 8, 18, 32, 24, 8, 2],
        energyLevels: [6.1, 12.3, 22.5, 34.8, 56.0, 70.0],
        radioactivity: 0.9,
        stability: "Radioativo",
        halfLife: "24.100 anos",
        ph: 3.5,
        charge: 0
    }
};
const GROUP_NAMES = {
    'alkali-metal': 'Metal Alcalino',
    'alkaline-earth-metal': 'Metal Alcalino-Terroso',
    'transition-metal': 'Metal de Transição',
    'post-transition-metal': 'Metal Pós-Transição', // Ou "Outros Metais"
    'metalloid': 'Semimetal',
    'nonmetal': 'Não Metal',
    'halogen': 'Halogênio',
    'noble-gas': 'Gás Nobre',
    'lanthanide': 'Lantanídeo',
    'actinide': 'Actinídeo'
};

let currentElement = ELEMENT_DATA[1];
let currentTool = 'select-atom';
let animationId = null;
let isAnimating = true;
let excitedElectrons = new Set();
let photonCount = 0;
let currentEnergyLevel = 0;

// Variáveis do campo magnético
let magneticFieldStrength = 0;
let magneticFieldDirection = 'up';
let isMagneticFieldActive = false;
let zeemanSplitActive = false;

// Variáveis de temperatura
let currentTemperature = 25;
let isTemperatureApplied = false;
let thermalParticles = [];
let thermalAnimationId = null;

document.addEventListener('DOMContentLoaded', function() {
	// Configurar event listeners
	setupEventListeners();
	
	// Selecionar hidrogênio por padrão
	selectElement(1);
	
	// Iniciar animação
	startAnimation();
});

// Variável para controlar qual instrumento está ativo
let currentInstrument = null;

function setupEventListeners() {
	// Ferramentas da sidebar
	const toolItems = document.querySelectorAll('.tool-item');
	toolItems.forEach(item => {
		item.addEventListener('click', function() {
			const tool = this.getAttribute('data-tool');
			
			// Atualizar ferramentas ativas
			toolItems.forEach(i => i.classList.remove('active'));
			document.querySelectorAll('.instrument-item').forEach(i => i.classList.remove('active'));
			this.classList.add('active');
			
			// Executar ação da ferramenta
			handleToolSelection(tool);
		});
	});

	// NOVO: Instrumentos da sidebar
	const instrumentItems = document.querySelectorAll('.instrument-item');
	instrumentItems.forEach(item => {
		item.addEventListener('click', function() {
			const instrumentText = this.textContent.trim();
			
			// Atualizar instrumentos ativos
			instrumentItems.forEach(i => i.classList.remove('active'));
			toolItems.forEach(i => i.classList.remove('active'));
			this.classList.add('active');
			
			// Executar ação do instrumento
			handleInstrumentSelection(instrumentText);
		});
	});

	// Botão play/pause
	document.getElementById('play-pause-btn').addEventListener('click', function() {
		if (isAnimating) {
			stopAnimation();
			this.innerHTML = '▶️ Executar';
		} else {
			startAnimation();
			this.innerHTML = '⏸️ Pausar';
		}
		isAnimating = !isAnimating;
	});

	// Controles de energia
	document.getElementById('energy-slider').addEventListener('input', function() {
		const energy = parseFloat(this.value);
		document.getElementById('energy-value').textContent = energy.toFixed(1) + ' eV';
		currentEnergyLevel = energy;
	});

	document.getElementById('excite-btn').addEventListener('click', exciteElectrons);
	document.getElementById('reset-energy-btn').addEventListener('click', resetEnergy);

	// Controles magnéticos
	document.getElementById('magnetic-slider').addEventListener('input', function() {
		const strength = parseFloat(this.value);
		document.getElementById('magnetic-value').textContent = strength.toFixed(1) + ' T';
		magneticFieldStrength = strength;
	});

	document.getElementById('apply-magnetic-btn').addEventListener('click', applyMagneticField);
	document.getElementById('reset-magnetic-btn').addEventListener('click', resetMagneticField);

	// Direção do campo magnético
	document.querySelectorAll('.direction-btn').forEach(btn => {
		btn.addEventListener('click', function() {
			document.querySelectorAll('.direction-btn').forEach(b => b.classList.remove('active'));
			this.classList.add('active');
			magneticFieldDirection = this.getAttribute('data-direction');
		});
	});

	// Controles de temperatura - Range
	document.getElementById('temperature-slider')?.addEventListener('input', e => {
		setTemperature(parseFloat(e.target.value), false);
	});

	// Temperaturas predefinidas - Presets
	// Temperaturas predefinidas - Presets
	document.querySelectorAll('.preset-btn').forEach(btn => {
	  btn.addEventListener('click', () => {
		const temp = parseFloat(btn.dataset.temp);
		setTemperature(temp, true); // Atualiza display e variável
		isTemperatureApplied = true;
	
		// 🔥 Garante que os efeitos térmicos sejam aplicados
		applyThermalParams();
		updateElectronSpeeds();
		applyTemperature();
	  });
	});



	document.getElementById('apply-temperature-btn').addEventListener('click', applyTemperature);
	document.getElementById('reset-temperature-btn').addEventListener('click', resetTemperature);
}

function updateTemperatureDisplay(temperature) {
	const display = document.getElementById('temperature-value');
	display.textContent = temperature + '°C';
	
	// Atualizar classe baseada na temperatura
	display.className = 'temperature-value';
	if (temperature < 0) {
		display.classList.add('cold');
	} else if (temperature < 100) {
		display.classList.add('normal');
	} else if (temperature < 1000) {
		display.classList.add('hot');
	} else {
		display.classList.add('plasma');
	}
	
	document.getElementById('current-temperature').textContent = temperature + '°C';
}

function applyTemperature() {
	isTemperatureApplied = true;
	const element = currentElement;
	
	// Determinar estado físico baseado na temperatura
	let physicalState = '';
	let stateColor = '';
	
	if (currentTemperature < element.meltingPoint) {
		physicalState = 'Sólido';
		stateColor = 'var(--cold-blue)';
	} else if (currentTemperature < element.boilingPoint) {
		physicalState = 'Líquido';
		stateColor = 'var(--quantum-blue)';
	} else if (currentTemperature < 5000) {
		physicalState = 'Gasoso';
		stateColor = 'var(--hot-red)';
	} else {
		physicalState = 'Plasma';
		stateColor = 'var(--plasma-pink)';
	}
	
	// Atualizar displays
	document.getElementById('physical-state').textContent = physicalState;
	document.getElementById('element-state').textContent = physicalState;
	document.getElementById('thermal-energy').textContent = (currentTemperature * 0.0000862).toFixed(3) + ' eV';
	
	// Aplicar efeitos visuais
	const canvas = document.getElementById('atom-canvas');
	const nucleus = document.querySelector('.nucleus');
	const electrons = document.querySelectorAll('.electron');
	const orbits = document.querySelectorAll('.orbit');
	
	// Resetar classes
	canvas.className = 'atom-canvas';
	if (nucleus) nucleus.className = 'nucleus';
	
	// Aplicar classes baseadas na temperatura
	if (currentTemperature < 0) {
		canvas.classList.add('cold');
		if (nucleus) nucleus.classList.add('cold');
	} else if (currentTemperature > 1000) {
		canvas.classList.add('hot');
		if (nucleus) nucleus.classList.add('hot');
		electrons.forEach(e => e.classList.add('hot'));
		orbits.forEach(o => o.classList.add('hot'));
	}
	
	if (currentTemperature > 5000) {
		canvas.classList.add('plasma');
		if (nucleus) nucleus.classList.add('plasma');
		electrons.forEach(e => e.classList.add('plasma'));
	}
	
	// Iniciar partículas térmicas
	startThermalParticles();
	
	// Atualizar status
	document.getElementById('reaction-status').textContent = `🌡️ ${physicalState} - ${currentTemperature}°C`;
	document.getElementById('reaction-status').style.color = stateColor;
	
	// Atualize fatores do loop para refletir a nova temperatura
	applyThermalParams();                // <<< GARANTE CONSISTÊNCIA
	updateElectronSpeeds();
}

function updateElectronSpeeds() {
  const electrons = document.querySelectorAll('.electron');
  const factor = thermoParams.omega / thermoParams.omegaBase;

  electrons.forEach(e => {
    const baseSpeed = parseFloat(e.dataset.baseSpeed || 1);
    e.dataset.speed = baseSpeed * factor;
  });
}

function resetTemperature() {
	isTemperatureApplied = false;
	currentTemperature = 25;
	
	// Resetar controles
	document.getElementById('temperature-slider').value = 25;
	updateTemperatureDisplay(25);
	
	// Resetar efeitos visuais
	const canvas = document.getElementById('atom-canvas');
	const nucleus = document.querySelector('.nucleus');
	const electrons = document.querySelectorAll('.electron');
	const orbits = document.querySelectorAll('.orbit');
	
	canvas.className = 'atom-canvas';
	if (nucleus) nucleus.className = 'nucleus';
	electrons.forEach(e => {
		e.classList.remove('hot', 'plasma');
	});
	orbits.forEach(o => {
		o.classList.remove('hot');
	});
	
	// Parar partículas térmicas
	stopThermalParticles();
	
	// Resetar displays
	const state = currentElement.meltingPoint > 25 ? 'Sólido' : 
				 currentElement.boilingPoint < 25 ? 'Gasoso' : 'Líquido';
	document.getElementById('physical-state').textContent = state;
	document.getElementById('element-state').textContent = state;
	document.getElementById('thermal-energy').textContent = '0 eV';
	document.getElementById('reaction-status').textContent = '✅ Sistema estável';
	document.getElementById('reaction-status').style.color = 'var(--lab-white)';
}

// Nova estratégia: gerar poucas partículas por tick e deixar o CSS animar.
// Nada de limpar e recriar tudo a cada frame.

let thermalTimerId = null; // <-- novo timer (usamos setTimeout)

function startThermalParticles() {
  stopThermalParticles(); // garante limpeza

  const container = document.getElementById('thermal-particles');
  if (!container || !isTemperatureApplied) return;

  // cria (ou reaproveita) o <style> apenas uma vez
  if (!document.getElementById('thermal-style')) {
    const style = document.createElement('style');
    style.id = 'thermal-style';
    style.textContent = `
      @keyframes thermal-float {
        0%   { transform: translate(0,0) scale(1);   opacity: 0; }
        50%  { transform: translate(var(--dx),var(--dy)) scale(1.2); opacity: 0.6; }
        100% { transform: translate(var(--dx),var(--dy)) scale(1);   opacity: 0; }
      }
      .thermal-particle {
        position: absolute;
        border-radius: 50%;
        will-change: transform, opacity;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
  }

  // definimos um limite de nós no DOM para não explodir
  const MAX_NODES = 40;

  function tick() {
    if (!isTemperatureApplied) return; // para automaticamente se resetar temp

    // taxa de geração baseada na temperatura (poucas por tick)
    const perTick = Math.max(1, Math.min(3, Math.floor(currentTemperature / 2000) || 1));

    for (let i = 0; i < perTick; i++) {
      // mantém o DOM sob controle
      if (container.children.length >= MAX_NODES) {
        // remove o mais antigo
        container.removeChild(container.firstChild);
      }

      const p = document.createElement('div');
      p.className = 'thermal-particle';

      // tamanho e cor
      const size = 2 + Math.random() * 4;
      p.style.width = size + 'px';
      p.style.height = size + 'px';

      if (currentTemperature < 0) {
        p.style.background = 'var(--cold-blue)';
        p.style.boxShadow = '0 0 8px var(--cold-blue)';
      } else if (currentTemperature < 1000) {
        p.style.background = 'var(--hot-red)';
        p.style.boxShadow = '0 0 10px var(--hot-red)';
      } else {
        p.style.background = 'var(--plasma-pink)';
        p.style.boxShadow = '0 0 12px var(--plasma-pink)';
      }

      // posição inicial random dentro do canvas
      const area = document.getElementById('atom-canvas');
      const w = area?.clientWidth || 500;
      const h = area?.clientHeight || 500;
      p.style.left = (Math.random() * w) + 'px';
      p.style.top  = (Math.random() * h) + 'px';

      // deslocamentos aleatórios para os keyframes (CSS vars)
      const dx = (Math.random() * 100 - 50) + 'px';
      const dy = (Math.random() * 100 - 50) + 'px';
      p.style.setProperty('--dx', dx);
      p.style.setProperty('--dy', dy);

      // duração e atraso leves (não enormes)
      const duration = 1 + Math.random() * 1.5; // 1.0–2.5s
      const delay = Math.random() * 0.5;        // 0–0.5s
      p.style.animation = `thermal-float ${duration}s ease-in-out ${delay}s 1`;

      // remove sozinho ao terminar (sem setTimeout)
      p.addEventListener('animationend', () => {
        p.remove();
      });

      container.appendChild(p);
    }

    // agenda próximo tick (200–300ms é suave e barato)
    thermalTimerId = setTimeout(tick, 250);
  }

  tick();
}

function stopThermalParticles() {
  // limpa o timer (não usamos mais rAF aqui)
  if (thermalTimerId) {
    clearTimeout(thermalTimerId);
    thermalTimerId = null;
  }
  const cont = document.getElementById('thermal-particles');
  if (cont) cont.innerHTML = '';
}

function handleToolSelection(tool) {
	currentTool = tool;
	
	// 1. Ocultar TODOS os painéis
	document.getElementById('energy-panel').style.display = 'none';
	document.getElementById('magnetic-panel').style.display = 'none';
	document.getElementById('temperature-panel').style.display = 'none';
	
	const spectrometer = document.getElementById('spectrometer-panel');
	const radiation = document.getElementById('radiation-detector-panel');
	const ph = document.getElementById('ph-meter-panel');
	const thermometer = document.getElementById('thermometer-panel');
	
	if (spectrometer) spectrometer.style.display = 'none';
	if (radiation) radiation.style.display = 'none';
	if (ph) ph.style.display = 'none';
	if (thermometer) thermometer.style.display = 'none';
	
	// 2. SEMPRE manter visíveis os cards da direita
	document.getElementById('element-info').style.display = 'block';
	const reactionPanel = document.querySelector('.reaction-panel');
	if (reactionPanel) reactionPanel.style.display = 'block';
	
	// 3. Mostrar apenas o painel selecionado
	switch(tool) {
		case 'select-atom':
			openPeriodicTable();
			break;
		case 'add-energy':
			document.getElementById('energy-panel').style.display = 'block';
			break;
		case 'magnetic-field':
			document.getElementById('magnetic-panel').style.display = 'block';
			break;
		case 'control-temperature':
			document.getElementById('temperature-panel').style.display = 'block';
			break;
		// INSTRUMENTOS
		case 'spectrometer':
			if (spectrometer) {
				spectrometer.style.display = 'block';
				updateSpectrometer();
			}
			break;
		case 'radiation-detector':
			if (radiation) {
				radiation.style.display = 'block';
				updateRadiationDetector();
			}
			break;
		case 'ph-meter':
			if (ph) {
				ph.style.display = 'block';
				updatePHMeter();
			}
			break;
		case 'thermometer':
			if (thermometer) {
				thermometer.style.display = 'block';
				updateThermometer();
			}
			break;
	}
}

// ========== NOVA FUNÇÃO: handleInstrumentSelection() ==========

function handleInstrumentSelection(instrument) {
	currentInstrument = instrument;
	
	// Ocultar TODOS os painéis (ferramentas + instrumentos)
	document.getElementById('energy-panel').style.display = 'none';
	document.getElementById('magnetic-panel').style.display = 'none';
	document.getElementById('temperature-panel').style.display = 'none';
	const spectrometer = document.getElementById('spectrometer-panel');
	const radiation = document.getElementById('radiation-detector-panel');
	const ph = document.getElementById('ph-meter-panel');
	const thermometer = document.getElementById('thermometer-panel');
	if (spectrometer) spectrometer.style.display = 'none';
	if (radiation) radiation.style.display = 'none';
	if (ph) ph.style.display = 'none';
	if (thermometer) thermometer.style.display = 'none';
	
	// Manter os cards da direita sempre visíveis
	document.getElementById('element-info').style.display = 'block';
	document.querySelector('.reaction-panel').style.display = 'block';
	
	// Mostrar o painel do instrumento selecionado
	if (instrument.includes('Espectrômetro')) {
		if (spectrometer) {
			spectrometer.style.display = 'block';
			updateSpectrometer();
		}
	} else if (instrument.includes('Detector de Radiação') || instrument.includes('Radiação')) {
		if (radiation) {
			radiation.style.display = 'block';
			updateRadiationDetector();
		}
	} else if (instrument.includes('Medidor de pH') || instrument.includes('pH')) {
		if (ph) {
			ph.style.display = 'block';
			updatePHMeter();
		}
	} else if (instrument.includes('Termômetro')) {
		if (thermometer) {
			thermometer.style.display = 'block';
			updateThermometer();
		}
	}
}

// ========== FUNÇÕES DOS NOVOS INSTRUMENTOS ==========

// ========== FUNÇÕES DOS INSTRUMENTOS (COM FALLBACK) ==========

// Espectrômetro - funciona com ou sem dados de spectrum
function updateSpectrometer() {
	const element = currentElement;
	const mainLine = document.getElementById('main-line');
	const intensity = document.getElementById('intensity');
	const series = document.getElementById('series');
	const transition = document.getElementById('transition');
	
	if (!mainLine) return;
	
	// Se o elemento já tem dados de spectrum, usa eles
	if (element.spectrum) {
		mainLine.textContent = element.spectrum.mainLine;
		intensity.textContent = element.spectrum.intensity;
		series.textContent = element.spectrum.series;
		transition.textContent = element.spectrum.transition;
		return;
	}
	
	// Fallback: dados genéricos baseados no grupo
	const spectrumFallback = {
		'nonmetal': { mainLine: '400-500 nm', intensity: '60-80%', series: 'Visível', transition: 'p→p' },
		'noble-gas': { mainLine: '500-600 nm', intensity: '80-95%', series: 'Visível', transition: 's→s' },
		'alkali-metal': { mainLine: '580-600 nm', intensity: '90-95%', series: 'D-line', transition: 's→s' },
		'alkaline-earth': { mainLine: '550-570 nm', intensity: '85-90%', series: 'Principal', transition: 's→p' },
		'transition-metal': { mainLine: '300-400 nm', intensity: '60-75%', series: 'UV', transition: 'd→d' },
		'basic-metal': { mainLine: '400-450 nm', intensity: '70-80%', series: 'Visível', transition: 'p→p' },
		'halogen': { mainLine: '450-480 nm', intensity: '70-80%', series: 'Balmer', transition: 'p→p' },
		'metalloid': { mainLine: '380-420 nm', intensity: '65-75%', series: 'UV-Vis', transition: 'p→p' },
		'lanthanide': { mainLine: '550-650 nm', intensity: '60-70%', series: 'f-f', transition: 'f→f' },
		'actinide': { mainLine: '580-620 nm', intensity: '40-55%', series: 'f-f', transition: 'f→f' }
	};
	
	const data = spectrumFallback[element.group] || spectrumFallback['nonmetal'];
	
	mainLine.textContent = data.mainLine;
	intensity.textContent = data.intensity;
	series.textContent = data.series;
	transition.textContent = data.transition;
}

// Detector de Radiação - funciona com ou sem dados de radioactivity
function updateRadiationDetector() {
	const element = currentElement;
	const radiationLevel = document.getElementById('radiation-level');
	const radiationValue = document.getElementById('radiation-value');
	const radiationAlert = document.getElementById('radiation-alert');
	const stabilityStatus = document.getElementById('stability-status');
	const halfLife = document.getElementById('half-life');
	
	if (!radiationLevel || !element) return;
	
	let radioData;
	
	// Se o elemento já tem dados de radioactivity, usa eles
	if (element.radioactivity && typeof element.radioactivity === 'object') {
		radioData = element.radioactivity;
	} else {
		// Fallback: estima radioatividade baseado no número atômico
		const atomicNumber = element.atomicNumber || 1;
		
		if (atomicNumber >= 84) {
			// Polônio em diante: todos radioativos
			const level = Math.min(100, 70 + (atomicNumber - 84) * 2);
			radioData = {
				level: level,
				stable: false,
				halfLife: atomicNumber === 92 ? '4.468 bilhões de anos' : 
				          atomicNumber >= 100 ? 'Minutos' : 'Anos'
			};
		} else if (atomicNumber === 43 || atomicNumber === 61) {
			// Tecnécio e Promécio: radioativos
			radioData = { level: 50, stable: false, halfLife: 'Anos' };
		} else if (atomicNumber > 50) {
			// Elementos pesados: baixa radioatividade
			radioData = { 
				level: Math.min(30, 10 + (atomicNumber - 50) * 0.5), 
				stable: true, 
				halfLife: 'Estável' 
			};
		} else {
			// Elementos leves: estáveis
			radioData = { 
				level: Math.min(10, atomicNumber * 0.2), 
				stable: true, 
				halfLife: 'Estável' 
			};
		}
	}
	
	// Garante que level é um número válido
	const level = typeof radioData.level === 'number' ? Math.min(100, Math.max(0, radioData.level)) : 0;
	
	radiationLevel.style.width = level + '%';
	radiationValue.textContent = level.toFixed(0) + '%';
	stabilityStatus.textContent = radioData.stable ? 'Estável' : 'Instável';
	halfLife.textContent = radioData.halfLife || 'Desconhecido';
	
	// Cores dinâmicas baseadas no nível
	if (level > 70) {
		radiationLevel.style.background = 'linear-gradient(to right, #f59e0b, #ef4444)';
	} else if (level > 30) {
		radiationLevel.style.background = 'linear-gradient(to right, #10b981, #f59e0b)';
	} else {
		radiationLevel.style.background = 'linear-gradient(to right, #10b981, #10b981)';
	}
	
	if (level > 50) {
		radiationAlert.style.display = 'block';
	} else {
		radiationAlert.style.display = 'none';
	}
}

// Medidor de pH - funciona com ou sem dados de ph
function updatePHMeter() {
	const element = currentElement;
	const phIndicator = document.getElementById('ph-indicator');
	const phValue = document.getElementById('ph-value');
	const phCharacter = document.getElementById('ph-character');
	const elementCharge = document.getElementById('element-charge');
	
	if (!phIndicator) return;
	
	let phData;
	
	// Se o elemento já tem dados de ph, usa eles
	if (element.ph) {
		phData = element.ph;
	} else {
		// Fallback: estima pH baseado no grupo
		const phMap = {
			'alkali-metal': { value: 13, character: 'Muito Básico', charge: +1 },
			'alkaline-earth': { value: 11, character: 'Básico', charge: +2 },
			'transition-metal': { value: 7, character: 'Neutro', charge: 0 },
			'basic-metal': { value: 6.5, character: 'Levemente Ácido', charge: +2 },
			'nonmetal': { value: 4, character: 'Ácido', charge: -2 },
			'halogen': { value: 2, character: 'Muito Ácido', charge: -1 },
			'noble-gas': { value: 7, character: 'Neutro', charge: 0 },
			'metalloid': { value: 6, character: 'Levemente Ácido', charge: 0 },
			'lanthanide': { value: 8, character: 'Levemente Básico', charge: +3 },
			'actinide': { value: 5.5, character: 'Levemente Ácido', charge: +4 }
		};
		
		phData = phMap[element.group] || { value: 7, character: 'Neutro', charge: 0 };
	}
	
	phValue.textContent = phData.value.toFixed(1);
	phCharacter.textContent = phData.character;
	elementCharge.textContent = phData.charge > 0 ? '+' + phData.charge : phData.charge;
	
	const position = (phData.value / 14) * 100;
	phIndicator.style.left = position + '%';
}


// Termômetro
function updateThermometer() {
	const temp = currentTemperature;
	const mercury = document.getElementById('thermometer-mercury');
	const tempValue = document.getElementById('temp-value');
	
	if (!mercury) return;
	
	tempValue.textContent = temp + '°C';
	
	// Altura baseada na temperatura (-273 a 10000)
	const minTemp = -273;
	const maxTemp = 10000;
	const percentage = ((temp - minTemp) / (maxTemp - minTemp)) * 100;
	mercury.style.height = Math.max(0, Math.min(100, percentage)) + '%';
}

// Funções para os botões do termômetro
function increaseTemperature() {
	setTemperature(Math.min(10000, currentTemperature + 10), false);
	updateThermometer();
}

function decreaseTemperature() {
	setTemperature(Math.max(-273, currentTemperature - 10), false);
	updateThermometer();
}

function resetTemperatureThermometer() {
	setTemperature(25, false);
	updateThermometer();
}


// Substituir applyMagneticField() existente
function applyMagneticField() {
	if (magneticFieldStrength > 0) {
		isMagneticFieldActive = true;
		zeemanSplitActive = true;
		
		if (is3DMode) {
			// Modo 3D: Linhas de campo magnético
			createMagneticFieldLines3D();
			
			// Afetar elétrons: movimento em espiral
			electrons3D.forEach(electron => {
				electron.userData.magneticField = magneticFieldStrength;
			});
		} else {
			// Modo 2D: Código existente
			document.getElementById('magnetic-field-lines').style.opacity = Math.min(0.6, magneticFieldStrength / 5);
			
			const orbits = document.querySelectorAll('.orbit');
			orbits.forEach(orbit => {
				orbit.classList.add('zeeman-split');
			});
		}
		
		document.getElementById('zeeman-effect').textContent = 'Ativo';
		document.getElementById('reaction-status').textContent = '🧲 Efeito Zeeman Ativo';
		document.getElementById('reaction-status').style.color = 'var(--magnetic-blue)';
		
		updateSpinAlignment();
	}
}

// Criar linhas de campo magnético 3D
function createMagneticFieldLines3D() {
	if (!scene3D) return;
	
	// Remover linhas anteriores
	scene3D.children.filter(obj => obj.userData.isMagneticLine).forEach(obj => {
		scene3D.remove(obj);
		obj.geometry.dispose();
		obj.material.dispose();
	});
	
	// Criar novas linhas
	for (let i = 0; i < 8; i++) {
		const angle = (i / 8) * Math.PI * 2;
		const radius = 8;
		
		const curve = new THREE.QuadraticBezierCurve3(
			new THREE.Vector3(Math.cos(angle) * radius, -5, Math.sin(angle) * radius),
			new THREE.Vector3(Math.cos(angle) * radius * 0.5, 0, Math.sin(angle) * radius * 0.5),
			new THREE.Vector3(Math.cos(angle) * radius, 5, Math.sin(angle) * radius)
		);
		
		const points = curve.getPoints(50);
		const geometry = new THREE.BufferGeometry().setFromPoints(points);
		const material = new THREE.LineBasicMaterial({ 
			color: 0x3b82f6, 
			opacity: Math.min(0.6, magneticFieldStrength / 5), 
			transparent: true 
		});
		const line = new THREE.Line(geometry, material);
		line.userData.isMagneticLine = true;
		scene3D.add(line);
	}
}

// Resetar campo magnético - Versão integrada
function resetMagneticField() {
	isMagneticFieldActive = false;
	zeemanSplitActive = false;
	magneticFieldStrength = 0;
	
	if (is3DMode) {
		// Remover linhas 3D
		scene3D.children.filter(obj => obj.userData.isMagneticLine).forEach(obj => {
			scene3D.remove(obj);
			obj.geometry.dispose();
			obj.material.dispose();
		});
		
		// Resetar efeito nos elétrons
		electrons3D.forEach(electron => {
			electron.userData.magneticField = 0;
		});
	} else {
		// Modo 2D: código existente
		document.getElementById('magnetic-field-lines').style.opacity = '0';
		
		const orbits = document.querySelectorAll('.orbit');
		orbits.forEach(orbit => {
			orbit.classList.remove('zeeman-split');
		});
		
		const electrons = document.querySelectorAll('.electron');
		electrons.forEach(electron => {
			electron.classList.remove('spin-up', 'spin-down');
		});
	}
	
	document.getElementById('magnetic-slider').value = 0;
	document.getElementById('magnetic-value').textContent = '0.0 T';
	document.getElementById('zeeman-effect').textContent = 'Inativo';
	document.getElementById('spin-aligned').textContent = '0';
	document.getElementById('reaction-status').textContent = '✅ Sistema estável';
	document.getElementById('reaction-status').style.color = 'var(--lab-white)';
}

function updateSpinAlignment() {
	if (!isMagneticFieldActive) return;
	
	const electrons = document.querySelectorAll('.electron');
	let alignedCount = 0;
	
	electrons.forEach((electron, index) => {
		// Probabilidade de alinhamento baseada na força do campo
		const alignmentProbability = Math.min(0.8, magneticFieldStrength / 8);
		
		if (Math.random() < alignmentProbability) {
			// Determinar spin baseado na direção do campo
			if (magneticFieldDirection === 'up') {
				electron.classList.add('spin-up');
				electron.classList.remove('spin-down');
			} else {
				electron.classList.add('spin-down');
				electron.classList.remove('spin-up');
			}
			alignedCount++;
		}
	});
	
	document.getElementById('spin-aligned').textContent = alignedCount;
}

// Substituir a função exciteElectrons() existente
function exciteElectrons() {
	const energy = currentEnergyLevel;
	
	if (is3DMode) {
		// Modo 3D: Fazer elétrons pulsarem e aumentar velocidade
		electrons3D.forEach((electron, index) => {
			const excitationChance = Math.min(0.8, energy / 20);
			
			if (Math.random() < excitationChance) {
				// Aumentar tamanho (pulsação)
				electron.scale.set(2, 2, 2);
				
				// Intensificar brilho
				electron.material.emissiveIntensity = 1;
				
				// Aumentar velocidade orbital
				electron.userData.speed *= 2;
				
				excitedElectrons.add(electron);
				
				// Voltar ao normal após 3 segundos
				setTimeout(() => {
					electron.scale.set(1, 1, 1);
					electron.material.emissiveIntensity = 0.5;
					electron.userData.speed /= 2;
					excitedElectrons.delete(electron);
					
					// Emitir fóton visual
					emitPhoton3D(electron.position.x, electron.position.y, electron.position.z);
				}, 3000);
			}
		});
	} else {
		// Modo 2D: Código existente
		const electrons = document.querySelectorAll('.electron');
		excitedElectrons.clear();
		
		electrons.forEach((electron, index) => {
			const excitationChance = Math.min(0.8, energy / 20);
			
			if (Math.random() < excitationChance) {
				excitedElectrons.add(electron);
				electron.classList.add('excited');
				
				const currentRadius = parseFloat(electron.dataset.orbitRadius);
				electron.dataset.excitedRadius = currentRadius * 1.5;
				electron.dataset.originalRadius = currentRadius;
				electron.dataset.excitationTime = Date.now();
			}
		});
	}
	
	document.getElementById('excited-count').textContent = excitedElectrons.size;
	document.getElementById('reaction-status').textContent = excitedElectrons.size > 0 ? '⚡ Elétrons excitados!' : '❌ Energia insuficiente';
	document.getElementById('reaction-status').style.color = excitedElectrons.size > 0 ? 'var(--radioactive-green)' : 'var(--danger-red)';
}

// Emitir fóton visual 3D
function emitPhoton3D(x, y, z) {
	if (!scene3D) return;
	
	const geometry = new THREE.SphereGeometry(0.3, 16, 16);
	const material = new THREE.MeshBasicMaterial({ 
		color: 0x10b981, 
		transparent: true, 
		opacity: 1 
	});
	const photon = new THREE.Mesh(geometry, material);
	photon.position.set(x, y, z);
	scene3D.add(photon);
	
	// Animar para fora
	const speed = 0.2;
	const direction = new THREE.Vector3(x, y, z).normalize();
	
	const animatePhoton = () => {
		photon.position.x += direction.x * speed;
		photon.position.y += direction.y * speed;
		photon.position.z += direction.z * speed;
		material.opacity -= 0.02;
		
		if (material.opacity > 0) {
			requestAnimationFrame(animatePhoton);
		} else {
			scene3D.remove(photon);
			geometry.dispose();
			material.dispose();
		}
	};
	
	animatePhoton();
	photonCount++;
	document.getElementById('photon-count').textContent = photonCount;
}

function resetEnergy() {
	// Resetar todos os elétrons
	const electrons = document.querySelectorAll('.electron');
	electrons.forEach(electron => {
		electron.classList.remove('excited');
		if (electron.dataset.originalRadius) {
			electron.dataset.orbitRadius = electron.dataset.originalRadius;
		}
	});
	
	excitedElectrons.clear();
	document.getElementById('excited-count').textContent = '0';
	document.getElementById('reaction-status').textContent = '✅ Sistema estável';
	document.getElementById('reaction-status').style.color = 'var(--lab-white)';
}

function emitPhoton(x, y) {
	const photon = document.createElement('div');
	photon.className = 'photon';
	photon.style.left = x + 'px';
	photon.style.top = y + 'px';
	photon.style.animation = 'photon-emission 1s ease-out forwards';
	
	document.getElementById('atom-display').appendChild(photon);
	
	// Atualizar contador
	photonCount++;
	document.getElementById('photon-count').textContent = photonCount;
	
	// Remover após animação
	setTimeout(() => {
		photon.remove();
	}, 1000);
}

function openPeriodicTable() {
	const modal = document.getElementById('periodic-table-modal');
	const table = document.getElementById('periodic-table');
	
	// Limpar tabela existente
	table.innerHTML = '';
	
	// Criar elementos da tabela periódica
	for (let i = 0; i < 118; i++) {
		const elementData = ELEMENT_DATA[i + 1];
		const elementDiv = document.createElement('div');
		elementDiv.className = `element ${elementData ? elementData.group : 'empty'}`;
		
		if (elementData) {
			elementDiv.innerHTML = `
				<div class="atomic-number">${elementData.atomicNumber}</div>
				<div class="symbol">${elementData.symbol}</div>
				<div class="name">${elementData.name}</div>
			`;
			elementDiv.addEventListener('click', () => {
				selectElement(elementData.atomicNumber);
				closePeriodicTable();
			});
		} else {
			elementDiv.style.visibility = 'hidden';
		}
		
		table.appendChild(elementDiv);
	}
	
	modal.style.display = 'flex';
}

function closePeriodicTable() {
	document.getElementById('periodic-table-modal').style.display = 'none';
}

function selectElement(atomicNumber) {
	const element = ELEMENT_DATA[atomicNumber];
	if (!element) return;

	currentElement = element;
	resetEnergy(); // Resetar energia ao mudar de elemento
	resetMagneticField(); // Resetar campo magnético
	resetTemperature(); // Resetar temperatura

	// Atualizar informações do elemento
	updateElementInfo(element);
	
	// Atualizar visualização do átomo
	updateAtomVisualization(element);
	
	// Atualizar status bar
	updateStatusBar(element);
}

function updateElementInfo(element) {
	document.getElementById('info-symbol').textContent = element.symbol;
	document.getElementById('info-symbol').className = `element-symbol ${element.group}`;
	document.getElementById('info-name').textContent = element.name;
	document.getElementById('info-group').textContent = GROUP_NAMES[element.group] || element.group;
	document.getElementById('info-atomic-number').textContent = element.atomicNumber;
	document.getElementById('info-atomic-mass').textContent = `${element.atomicMass} u`;
	document.getElementById('info-electron-config').textContent = element.electronConfiguration;
	document.getElementById('info-electronegativity').textContent = element.electronegativity || 'N/A';
	document.getElementById('info-melting-point').textContent = `${element.meltingPoint}°C`;
	document.getElementById('info-boiling-point').textContent = `${element.boilingPoint}°C`;
}

function updateAtomVisualization(element) {
	const atomDisplay = document.getElementById('atom-display');
	
	// Limpar átomo anterior (mantém as linhas de campo e partículas térmicas)
	const magneticLines = document.getElementById('magnetic-field-lines');
	const thermalParticles = document.getElementById('thermal-particles');
	atomDisplay.innerHTML = '';
	atomDisplay.appendChild(magneticLines);
	atomDisplay.appendChild(thermalParticles);
	
	// Tamanho base do núcleo (proporcional ao número atômico)
	const nucleusSize = Math.max(40, Math.min(120, element.atomicNumber * 3));
	
	// Criar núcleo
	const nucleus = document.createElement('div');
	nucleus.className = 'nucleus';
	nucleus.style.width = `${nucleusSize}px`;
	nucleus.style.height = `${nucleusSize}px`;
	nucleus.style.boxShadow = `0 0 ${nucleusSize/2}px var(--fusion-orange)`;
	
	// Criar partículas do núcleo (prótons e nêutrons)
	const nucleusInner = document.createElement('div');
	nucleusInner.className = 'nucleus-inner';
	
	const totalParticles = element.protons + element.neutrons;
	const particleSize = Math.max(3, Math.min(8, nucleusSize / 15));
	
	for (let i = 0; i < totalParticles; i++) {
		const particle = document.createElement('div');
		particle.className = 'nucleus-particle';
		
		// Alternar entre prótons e nêutrons
		if (i < element.protons) {
			particle.style.background = 'var(--proton-color)';
		} else {
			particle.className += ' neutron';
			particle.style.background = 'var(--neutron-color)';
		}
		
		particle.style.width = `${particleSize}px`;
		particle.style.height = `${particleSize}px`;
		
		// Posicionar partículas em padrão circular
		const angle = (i / totalParticles) * Math.PI * 2;
		const distance = (nucleusSize / 2) - (particleSize * 1.5);
		const x = Math.cos(angle) * distance;
		const y = Math.sin(angle) * distance;
		
		particle.style.left = `calc(50% + ${x}px)`;
		particle.style.top = `calc(50% + ${y}px)`;
		
		nucleusInner.appendChild(particle);
	}
	
	nucleus.appendChild(nucleusInner);
	atomDisplay.appendChild(nucleus);
	
	// Criar órbitas e elétrons baseados nas camadas eletrônicas
	const shellCount = element.electronShells.length;
	
	for (let shell = 0; shell < shellCount; shell++) {
		const electronsInShell = element.electronShells[shell];
		const orbitRadius = 100 + (shell * 80); // Raio aumenta para cada camada
		
		// Criar órbita
		const orbit = document.createElement('div');
		orbit.className = 'orbit';
		orbit.style.width = `${orbitRadius * 2}px`;
		orbit.style.height = `${orbitRadius * 2}px`;
		atomDisplay.appendChild(orbit);
		
		// Criar elétrons para esta camada
		for (let i = 0; i < electronsInShell; i++) {
			const electron = document.createElement('div');
			electron.className = 'electron';
			
			// Tamanho do elétron (um pouco menor para átomos maiores)
			const electronSize = Math.max(6, 10 - (element.atomicNumber / 60));
			electron.style.width = `${electronSize}px`;
			electron.style.height = `${electronSize}px`;
			
			// Posição inicial do elétron
			const angle = (i / electronsInShell) * Math.PI * 2;
			electron.dataset.orbitRadius = orbitRadius;
			electron.dataset.angle = angle;
			electron.dataset.speed = 0.02 + (shell * 0.005); // Camadas externas são mais rápidas
			electron.dataset.baseSpeed = electron.dataset.speed;
			electron.dataset.originalRadius = orbitRadius;
			
			atomDisplay.appendChild(electron);
		}
	}
	
	// Ajustar escala baseada no tamanho do átomo
	const scale = Math.max(0.7, 1.3 - (element.atomicNumber / 150));
	document.getElementById('scale-value').textContent = `${scale.toFixed(1)}nm`;
}

function updateStatusBar(element) {
	document.getElementById('current-element').textContent = element.name;
	document.getElementById('electron-count').textContent = element.electrons;
	
	// Determinar estado físico baseado na temperatura ambiente (25°C)
	const state = element.meltingPoint > 25 ? 'Sólido' : 
				 element.boilingPoint < 25 ? 'Gasoso' : 'Líquido';
	document.getElementById('element-state').textContent = state;
}

// Fechar modal ao clicar fora
document.getElementById('periodic-table-modal').addEventListener('click', function(e) {
	if (e.target === this) {
		closePeriodicTable();
	}
});

(function () {
	const path = location.pathname.split('/').pop().toLowerCase() || 'index.html';
	document.querySelectorAll('.nav-tabs .nav-tab').forEach(a => {
		const href = a.getAttribute('href')?.toLowerCase();
		if (href && path.endsWith(href)) a.classList.add('active');
	});
  })();
  
document.addEventListener('DOMContentLoaded', () => {
  const viz = document.querySelector('.visualization-area');
  if (!viz) return;

  // cria a coluna direita e injeta no grid (3ª coluna, todas as linhas)
  const right = document.createElement('div');
  right.className = 'right-col';
  viz.appendChild(right);

  // move os cards para dentro da coluna direita
  const info = document.getElementById('element-info');
  const reaction = document.querySelector('.reaction-panel');
  if (info) right.appendChild(info);
  if (reaction) right.appendChild(reaction);
});

function updateInfoHeight() {
  const info = document.getElementById('element-info');
  if (!info) return;
  const h = info.getBoundingClientRect().height;
  document.documentElement.style.setProperty('--info-h', `${Math.round(h)}px`);
}
addEventListener('load', updateInfoHeight);
addEventListener('resize', updateInfoHeight);
// atualiza quando mudar o conteúdo do info (ex: outro elemento selecionado)
const obs = new MutationObserver(updateInfoHeight);
obs.observe(document.documentElement, { subtree: true, childList: true, characterData: true });

//---------------------------------------------------------------------------------------------

// === Layout guard: cards SEMPRE fora do canvas (colar após setupEventListeners) ===
function ensureCardsOutsideCanvas() {
  const viz = document.querySelector('.visualization-area'); // contêiner do grid
  const info = document.getElementById('element-info');
  const reaction = document.querySelector('.reaction-panel');
  if (viz) {
    if (info && info.parentElement !== viz) viz.appendChild(info);
    if (reaction && reaction.parentElement !== viz) viz.appendChild(reaction);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  ensureCardsOutsideCanvas();
  // se algum código mover de novo, checamos periodicamente por alguns segundos
  setTimeout(ensureCardsOutsideCanvas, 0);
  setTimeout(ensureCardsOutsideCanvas, 500);
  setTimeout(ensureCardsOutsideCanvas, 1500);
});


// === Parâmetros térmicos (colocar próximo às variáveis globais de temperatura) ===
// Parâmetros térmicos (colocar próximo às variáveis globais de temperatura)
const TEMP_K_REF = 300; // 300 K ≈ ambiente (~27°C)
const EPSK = 0.1;       // evita zero absoluto visual

function toKelvin(celsius) { 
  return celsius + 273.15; 
}

function thermalScale(celsius) {
  const Tk = Math.max(1, celsius + 273.15);
  const Tref = 298; // 25°C como referência (~300 K)
  const f = Math.sqrt(Tk / Tref);

  // Ajuste visual — realismo moderado, resposta visual forte
  return Math.pow(f, 1.5);
}


// Guarda os parâmetros usados no loop da animação
const thermoParams = {
  omegaBase: 0.02,       // rad/frame base (~300K)
  jitterBase: 0.8,       // px de jitter
  freeBase: 80,          // px/s elétrons livres
  omega: 0.02,           // valor atual
  jitter: 0.8,
  freeSpeed: 80,
  plasma: false
};

// Atualizar parâmetros térmicos baseado na temperatura
function applyThermalParams() {
  const tempC = currentTemperature;
  const Tk = Math.max(1, tempC + 273.15);
  const Tref = 298; // 25°C como referência (~300 K)
  
  // Fator de escala: √(T/Tref), mas amplificado visualmente
  let f = Math.sqrt(Tk / Tref);
  f = Math.pow(f, 1.3); // dá mais variação perceptível

  console.log(`Temperatura: ${tempC}°C → Fator visual: ${f.toFixed(3)}`);
  if (is3DMode) {
	  thermoParams.plasma = tempC >= 5000;
	  return;
} // evita aplicar parâmetros 2D no modo 3D

  if (tempC <= -250) {
    // Criogênico extremo — quase parado
    thermoParams.omega = thermoParams.omegaBase * 0.05;
    thermoParams.jitter = thermoParams.jitterBase * 0.1;
    thermoParams.freeSpeed = thermoParams.freeBase * 0.05;
  } else if (tempC < 0) {
    // Frio, movimento lento
    const coldFactor = Math.max(0.2, f * 0.3);
    thermoParams.omega = thermoParams.omegaBase * coldFactor;
    thermoParams.jitter = thermoParams.jitterBase * coldFactor;
    thermoParams.freeSpeed = thermoParams.freeBase * coldFactor;
  } else if (tempC < 1000) {
    // Normal a quente — agora cresce mais rápido
    thermoParams.omega = thermoParams.omegaBase * (f * 2);
    thermoParams.jitter = thermoParams.jitterBase * (f * 1.5);
    thermoParams.freeSpeed = thermoParams.freeBase * (f * 2);
  } else if (tempC < 5000) {
    // Muito quente — aceleração forte
    thermoParams.omega = thermoParams.omegaBase * (f * 3);
    thermoParams.jitter = thermoParams.jitterBase * (f * 2);
    thermoParams.freeSpeed = thermoParams.freeBase * (f * 3);
  } else {
    // Plasma — movimento caótico
    thermoParams.omega = thermoParams.omegaBase * (f * 4);
    thermoParams.jitter = thermoParams.jitterBase * (f * 3);
    thermoParams.freeSpeed = thermoParams.freeBase * (f * 4);
  }

  thermoParams.plasma = tempC >= 5000;
}

// Integre na UI existente
document.addEventListener('DOMContentLoaded', () => {
  applyThermalParams();
  const slider = document.getElementById('temperature-slider');
  if (slider) slider.addEventListener('input', () => applyThermalParams());
});

// Ajuste sua função applyTemperature já existente chamando applyThermalParams no final
// (adicione no final de applyTemperature):
// applyThermalParams();

// === Consumo dos fatores térmicos (exemplo de uso no loop) ===
let lastThermalFactor2D = 1;

function updateElectrons(dt) {
  if (is3DMode || !document.getElementById('atom-display').offsetParent) return; // 🔥 trava o update 2D se o 3D estiver ativo

  const electrons = document.querySelectorAll('.electron');
  const electronCount = electrons.length;
  const updateFraction = electronCount > 50 ? 3 : 1;
  const frameOffset = Math.floor(Math.random() * electronCount);


  // Calcula suavização do fator térmico
  const targetFactor = isTemperatureApplied ? (thermoParams.omega / thermoParams.omegaBase) : 1;
  lastThermalFactor2D += (targetFactor - lastThermalFactor2D) * 0.1;

  electrons.forEach((el, index) => {
    if (electronCount > 50 && index % updateFraction !== (frameOffset % updateFraction)) return;

    let angle = parseFloat(el.dataset.angle || (Math.random() * Math.PI * 2));
    const r0 = parseFloat(el.dataset.orbitRadius || 120);

    // Movimento térmico: quanto mais quente, mais rápido o giro
    const baseSpeed = parseFloat(el.dataset.baseSpeed || 0.02);
    const angularSpeed = baseSpeed * lastThermalFactor2D;
    angle += angularSpeed;

    // Jitter térmico proporcional
    const jitter = (Math.random() - 0.5) * (isTemperatureApplied ? thermoParams.jitter : 0.5);
    const r = r0 + jitter;

    const cx = 250, cy = 250;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);

    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.dataset.angle = angle;
  });

  // Elétrons livres no plasma
  if (thermoParams.plasma) {
    const free = document.querySelectorAll('.electron.free');
    free.forEach(e => {
      const dx = parseFloat(e.dataset.dx) || (Math.random() * 2 - 1);
      const dy = parseFloat(e.dataset.dy) || (Math.random() * 2 - 1);
      const len = Math.hypot(dx, dy) || 1;
      const vx = (dx / len) * thermoParams.freeSpeed * dt;
      const vy = (dy / len) * thermoParams.freeSpeed * dt;
      const x = (parseFloat(e.style.left) || 250) + vx;
      const y = (parseFloat(e.style.top) || 250) + vy;
      e.style.left = x + 'px';
      e.style.top = y + 'px';
      e.dataset.dx = dx;
      e.dataset.dy = dy;
    });
  }
}

// Loop único e definitivo
let last = performance.now();
function loop(t) {
  const dt = Math.min(0.05, (t - last) / 1000);
  last = t;
  updateElectrons(dt);
  animationId = requestAnimationFrame(loop);
}
function startAnimation() {
  if (!animationId) { last = performance.now(); animationId = requestAnimationFrame(loop); }
}
function stopAnimation() {
  if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
}

function ensureOverlaysOnCanvas() {
  const canvas = document.getElementById('atom-canvas');
  if (!canvas) return;
  ['.thermal-particles', '.magnetic-field-lines', '.reaction-area'].forEach(sel => {
    const el = document.querySelector(sel);
    if (el && el.parentElement !== canvas) canvas.appendChild(el);
  });
}
document.addEventListener('DOMContentLoaded', ensureOverlaysOnCanvas);

function spawnThermalParticle(p) {
  const area = document.getElementById('atom-canvas');
  const w = area.clientWidth, h = area.clientHeight;
  p.style.left = Math.random() * w + 'px';
  p.style.top  = Math.random() * h + 'px';
}

//---------------------------------------------------------------------------------------------------
function setTemperature(tempC, applyVisual = true) {
  const slider = document.getElementById('temperature-slider');
  if (slider) slider.value = tempC;
  
  updateTemperatureDisplay(tempC);
  currentTemperature = tempC;
  
  // CRÍTICO: Atualizar parâmetros térmicos SEMPRE
  applyThermalParams();
  
  if (applyVisual) { 
    isTemperatureApplied = true; 
    applyTemperature(); 
  }
}


// Controles Canvas 3D
// ========== SISTEMA 3D (ADICIONAR NO FINAL) ==========

// Variáveis globais do Three.js
let scene3D, camera3D, renderer3D, controls3D;
let nucleus3D, electrons3D = [];
let orbits3D = [];
let isAutoRotating = true;
let is3DMode = false;
let animation3DId = null;

// Inicializar Three.js (chama quando mudar para 3D)
function init3D() {
	const container = document.getElementById('atom3d');
	if (!container) return;
	
	const width = container.clientWidth || 800;
	const height = container.clientHeight || 600;
	
	// Cena
	scene3D = new THREE.Scene();
	scene3D.background = null; // transparente
	
	// Câmera
	camera3D = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
	camera3D.position.z = 15;
	
	// Renderer
	renderer3D = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer3D.setSize(width, height);
	renderer3D.setPixelRatio(window.devicePixelRatio);
	container.innerHTML = '';
	container.appendChild(renderer3D.domElement);
	
	// Controles de órbita (mouse)
	if (typeof THREE.OrbitControls !== 'undefined') {
		controls3D = new THREE.OrbitControls(camera3D, renderer3D.domElement);
		controls3D.enableDamping = true;
		controls3D.dampingFactor = 0.05;
		controls3D.enableZoom = true;
	}
	
	// Luzes
	const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
	scene3D.add(ambientLight);
	
	const pointLight1 = new THREE.PointLight(0xffffff, 0.8);
	pointLight1.position.set(10, 10, 10);
	scene3D.add(pointLight1);
	
	const pointLight2 = new THREE.PointLight(0x2563eb, 0.3);
	pointLight2.position.set(-10, -10, 5);
	scene3D.add(pointLight2);
	
	// Adicionar controles 3D
	addControls3D();
	
	// Criar átomo 3D inicial
	create3DAtom(currentElement);
	
	// Iniciar loop de animação
	animate3D();
}

// Adicionar botões de controle 3D
function addControls3D() {
	const container = document.getElementById('atom3d');
	if (!container || container.querySelector('.controls-3d')) return;
	
	const controlsDiv = document.createElement('div');
	controlsDiv.className = 'controls-3d';
	controlsDiv.innerHTML = `
		<button class="control-3d-btn" id="toggle-rotation">⏸ Pausar Rotação</button>
		<button class="control-3d-btn" id="toggle-orbits">👁️ Órbitas</button>
		<button class="control-3d-btn" id="reset-camera">🔄 Resetar</button>
	`;
	container.appendChild(controlsDiv);
	
	// Event listeners
	document.getElementById('toggle-rotation').addEventListener('click', () => {
		isAutoRotating = !isAutoRotating;
		document.getElementById('toggle-rotation').textContent = 
			isAutoRotating ? '⏸ Pausar Rotação' : '▶️ Iniciar Rotação';
	});
	
	document.getElementById('toggle-orbits').addEventListener('click', () => {
		orbits3D.forEach(orbit => orbit.visible = !orbit.visible);
	});
	
	document.getElementById('reset-camera').addEventListener('click', () => {
		camera3D.position.set(0, 0, 15);
		if (controls3D) controls3D.reset();
	});
}

// Criar átomo 3D
function create3DAtom(element) {
	if (!scene3D) return;
	
	// Limpar átomo anterior
	if (nucleus3D) scene3D.remove(nucleus3D);
	electrons3D.forEach(e => scene3D.remove(e));
	orbits3D.forEach(o => scene3D.remove(o));
	electrons3D = [];
	orbits3D = [];
	
	// Criar núcleo
	nucleus3D = new THREE.Group();
	
	// Tamanho do núcleo baseado no número atômico
	const nucleusRadius = Math.max(0.5, Math.min(2, element.atomicNumber * 0.02));
	const particleSize = nucleusRadius * 0.15;
	
	// Prótons (vermelhos)
	for (let i = 0; i < element.protons; i++) {
		const geometry = new THREE.SphereGeometry(particleSize, 16, 16);
		const material = new THREE.MeshPhongMaterial({ 
			color: 0xef4444, 
			emissive: 0xef4444, 
			emissiveIntensity: 0.3 
		});
		const proton = new THREE.Mesh(geometry, material);
		
		// Posicionar em esfera
		const phi = Math.acos(-1 + (2 * i) / element.protons);
		const theta = Math.sqrt(element.protons * Math.PI) * phi;
		proton.position.set(
			nucleusRadius * Math.cos(theta) * Math.sin(phi),
			nucleusRadius * Math.sin(theta) * Math.sin(phi),
			nucleusRadius * Math.cos(phi)
		);
		
		nucleus3D.add(proton);
	}
	
	// Nêutrons (azuis)
	for (let i = 0; i < element.neutrons; i++) {
		const geometry = new THREE.SphereGeometry(particleSize, 16, 16);
		const material = new THREE.MeshPhongMaterial({ 
			color: 0x3b82f6, 
			emissive: 0x3b82f6, 
			emissiveIntensity: 0.3 
		});
		const neutron = new THREE.Mesh(geometry, material);
		
		const phi = Math.acos(-1 + (2 * i) / element.neutrons);
		const theta = Math.sqrt(element.neutrons * Math.PI) * phi;
		neutron.position.set(
			nucleusRadius * Math.cos(theta) * Math.sin(phi) * 0.8,
			nucleusRadius * Math.sin(theta) * Math.sin(phi) * 0.8,
			nucleusRadius * Math.cos(phi) * 0.8
		);
		
		nucleus3D.add(neutron);
	}
	
	scene3D.add(nucleus3D);
	
	// Criar órbitas e elétrons
	const shellCount = element.electronShells.length;
	
	for (let shell = 0; shell < shellCount; shell++) {
		const electronsInShell = element.electronShells[shell];
		const orbitRadius = 3 + (shell * 2);
		
		// Criar órbita visual
		const orbitGeometry = new THREE.TorusGeometry(orbitRadius, 0.02, 16, 100);
		const orbitMaterial = new THREE.MeshBasicMaterial({ 
			color: 0x2563eb, 
			opacity: 0.3, 
			transparent: true 
		});
		const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
		orbit.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
		orbit.rotation.y = (Math.random() - 0.5) * 0.3;
		scene3D.add(orbit);
		orbits3D.push(orbit);
		
		// Criar elétrons
		for (let i = 0; i < electronsInShell; i++) {
			const electronGeometry = new THREE.SphereGeometry(0.15, 16, 16);
			const electronMaterial = new THREE.MeshPhongMaterial({ 
				color: 0x2563eb, 
				emissive: 0x2563eb, 
				emissiveIntensity: 0.5 
			});
			const electron = new THREE.Mesh(electronGeometry, electronMaterial);
			
			// Posição inicial
			const angle = (i / electronsInShell) * Math.PI * 2;
			electron.userData = {
				orbitRadius: orbitRadius,
				angle: angle,
				speed: 0.01 + (shell * 0.005),
				orbitRotation: orbit.rotation.clone()
			};
			
			scene3D.add(electron);
			electrons3D.push(electron);
		}
	}
}

// Loop de animação 3D
function animate3D() {
	animation3DId = requestAnimationFrame(animate3D);
	if (!scene3D || !camera3D || !renderer3D) return;

	// Rotação automática do núcleo
	if (isAutoRotating && nucleus3D) {
		nucleus3D.rotation.x += 0.005;
		nucleus3D.rotation.y += 0.01;
	}

	// 🔥 Fator térmico dinâmico (acelera e desacelera suavemente)
	const base = thermoParams.omegaBase || 0.02;
	let current = thermoParams.omega;

	// Evita valores absurdos no início (antes do applyThermalParams)
	if (isNaN(current) || current <= 0) current = base;

	// Calcula fator alvo
	const targetFactor = isTemperatureApplied ? Math.max(0.05, Math.min(5, current / base)) : 1;

	// Suaviza a transição entre estados térmicos
	if (typeof window.lastThermalFactor !== "number") window.lastThermalFactor = 1;
	window.lastThermalFactor += (targetFactor - window.lastThermalFactor) * 0.1;


	// Animar elétrons com controle de temperatura e magnetismo
	electrons3D.forEach(electron => {
		const userData = electron.userData;

		// 🔥 Controle térmico correto: acelera com a temperatura
		const thermalFactor = window.lastThermalFactor || 1;
		userData.angle += userData.speed * window.lastThermalFactor * 2;
	
		/*
		// Ajuste dinâmico de velocidade: quanto maior a temperatura, mais rápido
		const dynamicSpeed = userData.baseSpeed ? userData.baseSpeed * window.lastThermalFactor : userData.speed * window.lastThermalFactor;
		userData.angle += dynamicSpeed * 2;*/

		// Aplicar efeito magnético (movimento em espiral)
		const magneticFactor = userData.magneticField || 0;
		const zOffset = Math.sin(userData.angle * 5) * magneticFactor * 0.5;

		const angle = userData.angle || 0;
		const r = userData.orbitRadius || 5;

		// base no plano XZ (segue os anéis)
		const x0 = Math.cos(angle) * r;
		const z0 = Math.sin(angle) * r;

		// rotação da órbita (fallback = 0)
		const rotY = (userData.orbitRotation && userData.orbitRotation.y) || 0;
		const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
		const x = x0 * cosY - z0 * sinY;
		const z = x0 * sinY + z0 * cosY;

		// efeito magnético em Y
		const magnetic = userData.magneticField || 0;
		const y = Math.sin(angle * 5) * magnetic * 0.5;

		electron.position.set(x, y, z);

		
		/*const x = Math.cos(userData.angle) * userData.orbitRadius;
		const y = Math.sin(userData.angle) * userData.orbitRadius;

		electron.position.x = x * Math.cos(userData.orbitRotation.y);
		electron.position.y = y + zOffset;
		electron.position.z = x * Math.sin(userData.orbitRotation.y);*/

		// Efeito de temperatura nas cores (plasma = rosa, frio = azul)
		if (isTemperatureApplied) {
			if (currentTemperature > 5000) {
				// Plasma: rosa brilhante
				electron.material.color.setHex(0xec4899);
				electron.material.emissive.setHex(0xec4899);
				electron.material.emissiveIntensity = 0.8;
			} else if (currentTemperature < 0) {
				// Criogênico: azul escuro
				electron.material.color.setHex(0x1e40af);
				electron.material.emissive.setHex(0x1e40af);
				electron.material.emissiveIntensity = 0.2;
			} else {
				// Normal: azul
				electron.material.color.setHex(0x2563eb);
				electron.material.emissive.setHex(0x2563eb);
				electron.material.emissiveIntensity = 0.5;
			}
		}
	});

	// Atualizar controles e renderizar
	if (controls3D) controls3D.update();
	renderer3D.render(scene3D, camera3D);
}

// Parar animação 3D
function stop3D() {
	if (animation3DId) {
		cancelAnimationFrame(animation3DId);
		animation3DId = null;
	}
}

// Limpar recursos 3D
function dispose3D() {
	stop3D();
	
	if (renderer3D) {
		renderer3D.dispose();
		const container = document.getElementById('atom3d');
		if (container) container.innerHTML = '';
	}
	
	scene3D = null;
	camera3D = null;
	renderer3D = null;
	controls3D = null;
	nucleus3D = null;
	electrons3D = [];
	orbits3D = [];
}

// Alternar entre 2D e 3D
function toggleView(view) {
  const atom2d = document.getElementById('atom-display');
  const atom3d = document.getElementById('atom3d');

  if (view === '3d') {
    is3DMode = true;
    atom2d.style.display = 'none';
    atom3d.style.display = 'block';

    // 🔥 PARA TUDO NO 2D antes de iniciar o 3D
    stopAnimation();
    cancelAnimationFrame(animationId);
    animationId = null;

    // 🔥 Garante que partículas térmicas parem também
    stopThermalParticles();

    init3D();
  } else {
    is3DMode = false;
    atom3d.style.display = 'none';
    atom2d.style.display = 'block';

    dispose3D();
    startAnimation();

    // 🔥 Reinicia partículas térmicas se estiver com temperatura aplicada
    if (isTemperatureApplied) startThermalParticles();
  }
}

// Event listeners para os botões de toggle
document.addEventListener('DOMContentLoaded', () => {
	const toggleButtons = document.querySelectorAll('.toggle-btn');
	
	toggleButtons.forEach(btn => {
		btn.addEventListener('click', function() {
			const view = this.getAttribute('data-view');
			
			// Atualizar classe active
			toggleButtons.forEach(b => b.classList.remove('active'));
			this.classList.add('active');
			
			// Alternar visualização
			toggleView(view);
		});
	});
	
	// Responsive: redimensionar 3D quando a janela mudar
	window.addEventListener('resize', () => {
		if (is3DMode && renderer3D && camera3D) {
			const container = document.getElementById('atom3d');
			if (!container) return;
			
			const width = container.clientWidth;
			const height = container.clientHeight;
			
			camera3D.aspect = width / height;
			camera3D.updateProjectionMatrix();
			renderer3D.setSize(width, height);
		}
	});
});

// Atualizar visualização 3D quando trocar de elemento
const originalSelectElement = selectElement;
selectElement = function(atomicNumber) {
	originalSelectElement(atomicNumber);
	
	// Se estiver em modo 3D, recriar átomo 3D
	if (is3DMode && scene3D) {
		create3DAtom(currentElement);
	}
};
