// ================
// ESTADO GLOBAL
// ================
let cosmicAnimationId = null;
let gptLoopId = null;
let selectedCards = [];
let nucleus = { protons: 0, electrons: 0, neutrons: 0 };
let quizQuestions = [];
let currentQuizIndex = 0;

// ================
// UTILITÁRIOS
// ================

function textToBinary(text) {
  return Array.from(text)
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

function binaryToText(binaryStr) {
  return binaryStr
    .trim()
    .split(/\s+/)
    .map(bin => String.fromCharCode(parseInt(bin, 2)))
    .join('');
}

function getRandomPhrase() {
  const phrases = [
    "O universo é feito de histórias, não de átomos.",
    "Antes do tempo, havia o potencial.",
    "Cada estrela é um laboratório nuclear em fogo.",
    "O vácuo quântico sussurra partículas efêmeras.",
    "Somos poeira de supernova aprendendo a sentir.",
    "A entropia cresce, mas a vida resiste.",
    "No coração do átomo, o caos se organiza.",
    "O cosmos não pergunta — ele experimenta.",
    "A luz viaja bilhões de anos para ser vista por você.",
    "Toda partícula carrega a memória do Big Bang."
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
}

function updateNucleusStats() {
  const p = nucleus.protons;
  const e = nucleus.electrons;
  const n = nucleus.neutrons + Math.min(p, e);
  const realNeutrons = nucleus.neutrons + Math.min(p, e);
  const charge = p - e;
  const idealN = Math.round(p * 1.2);
  const stable = realNeutrons >= idealN - 2 && realNeutrons <= idealN + 2;

  document.getElementById('nucleusStats').innerHTML = `
    <div><strong>Prótons:</strong> ${p}</div>
    <div><strong>Elétrons:</strong> ${e}</div>
    <div><strong>Nêutrons:</strong> ${realNeutrons}</div>
    <div><strong>Carga:</strong> ${charge === 0 ? '0' : (charge > 0 ? `+${charge}` : charge)}</div>
    <div><strong>Estável?</strong> <span style="color:${stable ? '#4caf50' : '#f44336'}">${stable ? 'Sim' : 'Não'}</span></div>
    <div><small>Faixa ideal: ${idealN - 2}–${idealN + 2}</small></div>
  `;
}

// ================
// CONVERSOR TEXTO/BINÁRIO
// ================
document.getElementById('btnToBin').addEventListener('click', () => {
  const input = document.getElementById('txtInput').value;
  if (!input) return;
  document.getElementById('txtOutput').textContent = textToBinary(input);
});

document.getElementById('btnToTxt').addEventListener('click', () => {
  const input = document.getElementById('txtInput').value;
  if (!input.trim()) return;
  try {
    document.getElementById('txtOutput').textContent = binaryToText(input);
  } catch (e) {
    document.getElementById('txtOutput').textContent = '⚠️ Binário inválido. Use 0s e 1s separados por espaços.';
  }
});

document.getElementById('btnClear').addEventListener('click', () => {
  document.getElementById('txtInput').value = '';
  document.getElementById('txtOutput').textContent = '';
});

// ================
// MAPA CÓSMICO (CANVAS) - CORRIGIDO
// ================
const canvas = document.getElementById('cosmicCanvas');
const ctx = canvas.getContext('2d');
let cosmicTime = 0;
let isAnimating = false;

function resizeCanvasToContainer() {
  const container = canvas.parentElement;
  if (!container) return;

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  // Limitar para não ficar muito grande
  const maxWidth = 800;
  const maxHeight = 600;

  const newWidth = Math.min(containerWidth, maxWidth);
  const newHeight = Math.min(containerHeight, maxHeight);

  if (canvas.width !== newWidth || canvas.height !== newHeight) {
    canvas.width = newWidth;
    canvas.height = newHeight;
  }
}

function drawCosmicMap() {
  resizeCanvasToContainer();

  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const centerX = w / 2;
  const centerY = h / 2;

  const maxSize = Math.min(w, h) * 0.45; // Raio máximo adaptável
  const scale = 0.8 + 0.2 * Math.sin(cosmicTime * 0.5);
  const rotation = cosmicTime * 0.01;

  // Galáxia espiral
  const arms = 4;
  const points = 1800;
  for (let i = 0; i < points; i++) {
    const r = (i / points) * maxSize * scale;
    const angle = (i * 0.1) + rotation + (Math.floor(i % arms) * (Math.PI * 2 / arms));
    
    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r;

    const dist = r / (maxSize * scale);
    const alpha = 1 - dist;
    const size = 1 + (1 - dist) * 2;

    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Núcleo central
  const coreRadius = Math.max(8, maxSize * 0.08);
  const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
  coreGradient.addColorStop(0, '#ffeb3b');
  coreGradient.addColorStop(1, 'transparent');
  ctx.fillStyle = coreGradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
  ctx.fill();

  cosmicTime += parseFloat(document.getElementById('speedRange').value);
}

function startCosmicAnimation() {
  if (isAnimating) return;
  isAnimating = true;
  document.getElementById('btnCosmicStart').disabled = true;
  document.getElementById('btnCosmicStop').disabled = false;
  document.getElementById('cosmicStatus').textContent = 'Animando...';

  function animate() {
    drawCosmicMap();
    if (isAnimating) {
      cosmicAnimationId = requestAnimationFrame(animate);
    }
  }
  animate();
}

function stopCosmicAnimation() {
  isAnimating = false;
  if (cosmicAnimationId) {
    cancelAnimationFrame(cosmicAnimationId);
  }
  document.getElementById('btnCosmicStart').disabled = false;
  document.getElementById('btnCosmicStop').disabled = true;
  document.getElementById('cosmicStatus').textContent = 'Parado';
}

document.getElementById('btnCosmicDraw').addEventListener('click', drawCosmicMap);
document.getElementById('btnCosmicStart').addEventListener('click', startCosmicAnimation);
document.getElementById('btnCosmicStop').addEventListener('click', stopCosmicAnimation);

// Ajusta ao redimensionar a janela
window.addEventListener('resize', () => {
  if (!isAnimating) {
    drawCosmicMap();
  }
});

// ================
// UNIVERSE GPT
// ================
function displayGptPhrase() {
  const phrase = getRandomPhrase();
  const binary = textToBinary(phrase);
  document.getElementById('gptPhrase').textContent = phrase;
  document.getElementById('gptBinary').textContent = binary;
}

document.getElementById('btnGptOne').addEventListener('click', displayGptPhrase);

document.getElementById('btnGptLoop').addEventListener('click', () => {
  displayGptPhrase();
  gptLoopId = setInterval(displayGptPhrase, 2000);
  document.getElementById('btnGptLoop').disabled = true;
  document.getElementById('btnGptStop').disabled = false;
});

document.getElementById('btnGptStop').addEventListener('click', () => {
  if (gptLoopId) clearInterval(gptLoopId);
  document.getElementById('btnGptLoop').disabled = false;
  document.getElementById('btnGptStop').disabled = true;
});

// ================
// QUIZ CÓSMICO
// ================
quizQuestions = [
  { q: "O universo está em expansão acelerada.", a: true },
  { q: "Buracos negros emitem radiação de Hawking.", a: true },
  { q: "A matéria escura interage fortemente com a luz.", a: false },
  { q: "O Big Bang foi uma explosão no espaço.", a: false },
  { q: "Elétrons são partículas fundamentais.", a: true },
  { q: "A entropia do universo tende a diminuir.", a: false }
];

function showQuizQuestion() {
  if (currentQuizIndex >= quizQuestions.length) {
    document.getElementById('quizRoot').innerHTML = '<p>_quiz finalizado! 🌌</p>';
    return;
  }

  const q = quizQuestions[currentQuizIndex];
  document.getElementById('quizRoot').innerHTML = `
    <p><strong>Pergunta ${currentQuizIndex + 1}/${quizQuestions.length}:</strong><br>${q.q}</p>
    <div class="row" style="margin:10px 0;">
      <button id="btnTrue">Verdadeiro</button>
      <button id="btnFalse">Falso</button>
    </div>
    <div id="quizFeedback" style="margin-top:10px; min-height:24px;"></div>
    <button id="btnNext" disabled>Próxima pergunta</button>
    <button id="btnQuizRestart">Reiniciar</button>
  `;

  // Remove event listeners antigos para evitar duplicação
  const trueBtn = document.getElementById('btnTrue');
  const falseBtn = document.getElementById('btnFalse');
  const restartBtn = document.getElementById('btnQuizRestart');
  
  trueBtn.onclick = () => checkAnswer(true);
  falseBtn.onclick = () => checkAnswer(false);
  restartBtn.onclick = restartQuiz;
}

function checkAnswer(userAnswer) {
  const correct = quizQuestions[currentQuizIndex].a;
  const feedbackEl = document.getElementById('quizFeedback');
  if (userAnswer === correct) {
    feedbackEl.innerHTML = '<span style="color:#4caf50">✅ Correto!</span>';
  } else {
    feedbackEl.innerHTML = `<span style="color:#f44336">❌ Incorreto. A resposta correta é: ${correct ? 'Verdadeiro' : 'Falso'}.</span>`;
  }
  document.getElementById('btnNext').disabled = false;
}

function nextQuestion() {
  currentQuizIndex++;
  showQuizQuestion();
}

function restartQuiz() {
  currentQuizIndex = 0;
  showQuizQuestion();
}

document.getElementById('btnQuizStart').addEventListener('click', restartQuiz);

// Evento para o botão "Próxima"
document.addEventListener('click', (e) => {
  if (e.target.id === 'btnNext') {
    nextQuestion();
  }
});

// ================
// CARTAS BINÁRIAS
// ================
const CARD_TYPES = [
  { type: 'proton', symbol: '+1', color: '#4fc3f7', name: 'Próton' },
  { type: 'electron', symbol: '-1', color: '#f44336', name: 'Elétron' },
  { type: 'neutron', symbol: '0', color: '#9e9e9e', name: 'Nêutron' }
];

function createCard(type) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.type = type.type;
  card.innerHTML = `
    <div class="card-symbol" style="color:${type.color}">${type.symbol}</div>
    <div class="card-label">${type.name}</div>
  `;
  card.addEventListener('click', () => selectCard(card));
  return card;
}

function selectCard(card) {
  document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  selectedCards = [card];
}

function generateCards() {
  const root = document.getElementById('cardsRoot');
  root.innerHTML = '';
  selectedCards = [];
  nucleus = { protons: 0, electrons: 0, neutrons: 0 };
  updateNucleusStats();

  for (let i = 0; i < 12; i++) {
    const randomType = CARD_TYPES[Math.floor(Math.random() * CARD_TYPES.length)];
    root.appendChild(createCard(randomType));
  }

  document.getElementById('btnCardsReset').disabled = false;
  setupDragAndDrop();
}

function setupDragAndDrop() {
  const nucleusZone = document.getElementById('nucleusZone');
  
  nucleusZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    nucleusZone.style.backgroundColor = 'rgba(79, 195, 247, 0.2)';
  });

  nucleusZone.addEventListener('dragleave', () => {
    nucleusZone.style.backgroundColor = '';
  });

  nucleusZone.addEventListener('drop', (e) => {
    e.preventDefault();
    nucleusZone.style.backgroundColor = '';

    const card = document.querySelector('.card.dragging');
    if (!card) return;

    const type = card.dataset.type;
    if (type === 'proton') nucleus.protons++;
    else if (type === 'electron') nucleus.electrons++;
    else if (type === 'neutron') nucleus.neutrons++;

    card.remove();
    updateNucleusStats();
  });

  document.querySelectorAll('.card').forEach(card => {
    card.draggable = true;
    card.addEventListener('dragstart', () => {
      card.classList.add('dragging');
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
    });
  });
}

document.getElementById('btnCardsGen').addEventListener('click', generateCards);

document.getElementById('btnCardsReset').addEventListener('click', () => {
  document.getElementById('cardsRoot').innerHTML = '';
  document.getElementById('nucleusZone').innerHTML = 'Solte partículas';
  nucleus = { protons: 0, electrons: 0, neutrons: 0 };
  updateNucleusStats();
  document.getElementById('btnCardsReset').disabled = true;
});

// ================
// INICIALIZAÇÃO
// ================
drawCosmicMap();
document.getElementById('cosmicStatus').textContent = 'Pronto';