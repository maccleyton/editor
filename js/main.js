/* =========================================================
   QuantumLab Editor — Integração Markdown + assets no #page
   - Abre .md diretamente no elemento editável existente (#page)
   - Salva .md com front matter
   - Copia imagens para assets/ quando pasta do projeto for escolhida
   - Fallback de abrir/salvar sem FS API
   ========================================================= */

/* Estado do projeto (File System Access) */
let projectDirHandle = null;      // pasta do projeto (opcional)
let assetsDirHandle = null;       // subpasta assets/ (quando houver)
let currentFileHandle = null;     // arquivo .md atual (quando aberto via FS)
let currentFileName = "documento.md"; // nome padrão
const previewMap = new Map();     // blobURL -> "assets/nome.ext"
const pathToBlobURL = new Map();  // "assets/nome.ext" -> blobURL

/* Utilidades DOM */
const pageEl = document.getElementById('page');

/* Garante inputs ocultos sem mudar seu HTML */
function ensureHiddenInputs() {
  if (!document.getElementById('mdOpenInput')) {
    const md = document.createElement('input');
    md.type = 'file';
    md.accept = '.md,text/markdown,text/plain';
    md.id = 'mdOpenInput';
    md.style.display = 'none';
    document.body.appendChild(md);
  }
  if (!document.getElementById('imagePicker')) {
    const im = document.createElement('input');
    im.type = 'file';
    im.accept = 'image/*';
    im.id = 'imagePicker';
    im.style.display = 'none';
    document.body.appendChild(im);
  }
}
ensureHiddenInputs(); /* cria se faltar, sem tocar no HTML original */ [attached_file:2]

/* File System Access helpers */
async function canUseFS() { return !!(window.showOpenFilePicker || window.showDirectoryPicker || window.showSaveFilePicker); } /* ver API geral */ [web:50]
async function pickProjectFolder() {
  if (!window.showDirectoryPicker) return false; /* navegador sem picker de diretório */ [web:44]
  projectDirHandle = await window.showDirectoryPicker({ mode: 'readwrite' }); /* escolhe raiz do projeto */ [web:44]
  assetsDirHandle = await projectDirHandle.getDirectoryHandle('assets', { create: true }); /* garante assets/ */ [web:44]
  return true; /* ok */
}
async function ensureAssets() {
  if (projectDirHandle && !assetsDirHandle) {
    assetsDirHandle = await projectDirHandle.getDirectoryHandle('assets', { create: true }); /* garante assets/ */ [web:44]
  }
}
async function writeTextFile(dirHandle, name, contents) {
  const fh = await dirHandle.getFileHandle(name, { create: true }); /* handle do arquivo */ [web:50]
  const w = await fh.createWritable(); /* stream de escrita */ [web:50]
  await w.write(contents); /* escreve conteúdo */ [web:50]
  await w.close(); /* fecha */ [web:50]
}
async function writeBinaryFile(dirHandle, name, blob) {
  const fh = await dirHandle.getFileHandle(name, { create: true }); /* handle do binário */ [web:50]
  const w = await fh.createWritable(); /* writer */ [web:50]
  await w.write(blob); /* grava blob */ [web:50]
  await w.close(); /* fecha */ [web:50]
}
function uniqueAssetName(name) {
  const safe = name.replace(/[^\w.\-]+/g, '_'); /* nome seguro */ [attached_file:2]
  const ts = Date.now().toString(36); /* sufixo */ [attached_file:2]
  const i = safe.lastIndexOf('.');
  return i > 0 ? safe.slice(0, i) + '_' + ts + safe.slice(i) : safe + '_' + ts; /* uniq */ [attached_file:2]
}

/* Front matter YAML mínimo */
function buildFrontMatter(meta = {}) {
  const q = v => (typeof v === 'string' ? `"${v.replace(/"/g, '\\"')}"` : v); /* escapa aspas */ [attached_file:2]
  return [
    '---',
    `title: ${q(meta.title || document.title || 'Documento')}`,
    `author: ${q(meta.author || '')}`,
    `created: ${q(new Date().toISOString().slice(0,10))}`,
    `pageSize: ${q('A4')}`,
    `margins: { top: 20, right: 20, bottom: 25, left: 25 }`,
    `theme: ${q('cosmos-dark')}`,
    '---',
    ''
  ].join('\n'); /* bloco YAML padrão de facto */ [web:63]
}
function stripFrontMatter(text) {
  if (text.startsWith('---')) {
    const end = text.indexOf('\n---', 3); /* procura final do bloco YAML */ [web:63]
    if (end !== -1) return { meta: text.slice(3, end).trim(), body: text.slice(end + 4).replace(/^\s+/, '') }; /* separa corpo */ [web:63]
  }
  return { meta: '', body: text }; /* sem front matter */ [web:63]
}

/* Abrir .md → renderizar no #page com marked */
async function openMd() {
  // Preferir FS API quando disponível
  if (window.showOpenFilePicker) {
    try {
      const [fh] = await window.showOpenFilePicker({
        types: [{ description: 'Markdown', accept: { 'text/markdown': ['.md'], 'text/plain': ['.md', '.txt'] } }]
      }); /* escolha do .md */ [web:50]
      currentFileHandle = fh; /* guarda handle para salvar depois */ [web:50]
      const file = await fh.getFile(); /* lê arquivo */ [web:50]
      currentFileName = file.name || 'documento.md'; /* atualiza nome */ [web:50]
      const text = await file.text(); /* texto bruto */ [web:50]
      const { body } = stripFrontMatter(text); /* remove YAML inicial, se houver */ [web:63]
      // Tenta resolver assets se usuário escolher a pasta do projeto
      if (!projectDirHandle && window.showDirectoryPicker) {
        // Opcional: perguntar uma vez
        const usarProjeto = confirm('Deseja selecionar a pasta do projeto para resolver assets/?'); /* UX simples */ [web:50]
        if (usarProjeto) await pickProjectFolder(); /* escolhe pasta */ [web:44]
      }
      const mdForPreview = await resolveAssetsForPreview(body); /* troca assets/ → blob: para prévia */ [web:50]
      pageEl.innerHTML = marked.parse(mdForPreview); /* renderiza dentro do #page existente */ [web:90]
      pageEl.focus(); /* foco no editável */ [attached_file:2]
      updateWordCountSafe(); /* atualiza contagem se sua função existir */ [attached_file:1]
      return;
    } catch (e) {
      // usuário cancelou → fallback abaixo
    }
  }
  // Fallback: <input type="file">
  const input = document.getElementById('mdOpenInput'); /* input oculto */ [attached_file:2]
  input.onchange = async () => {
    const f = input.files[0]; /* arquivo escolhido */ [attached_file:2]
    if (!f) return; /* sem arquivo */ [attached_file:2]
    currentFileHandle = null; /* sem handle FS nesse fluxo */ [web:50]
    currentFileName = f.name || 'documento.md'; /* nome base */ [attached_file:2]
    const text = await f.text(); /* conteúdo */ [attached_file:2]
    const { body } = stripFrontMatter(text); /* limpa front matter */ [web:63]
    pageEl.innerHTML = marked.parse(body); /* renderiza no #page */ [web:90]
    pageEl.focus(); /* foco */ [attached_file:2]
    updateWordCountSafe(); /* contagem */ [attached_file:1]
    input.value = ''; /* reseta input */ [attached_file:2]
  };
  input.click(); /* abre seletor */ [attached_file:2]
}

/* Resolve assets/ → blob: para pré-visualização (se houver pasta do projeto) */
async function resolveAssetsForPreview(md) {
  if (!projectDirHandle || !assetsDirHandle) return md; /* sem projeto, mantém paths relativos */ [web:50]
  const re = /!\[([^\]]*)\]\((assets\/[^)]+)\)/g; /* imagens Markdown padrão */ [web:90]
  let m, out = md;
  while ((m = re.exec(md))) {
    const rel = m[2]; /* caminho relativo */ [web:90]
    try {
      const name = rel.replace(/^assets\//, ''); /* nome do arquivo */ [web:90]
      const fh = await assetsDirHandle.getFileHandle(name); /* busca no assets/ */ [web:44]
      const file = await fh.getFile(); /* blob local */ [web:44]
      const blobURL = URL.createObjectURL(file); /* URL para prévia */ [attached_file:2]
      previewMap.set(blobURL, rel); /* mapeia blob → assets/ */ [attached_file:2]
      pathToBlobURL.set(rel, blobURL); /* mapeia assets/ → blob */ [attached_file:2]
      out = out.split(rel).join(blobURL); /* substitui no markdown */ [attached_file:2]
    } catch {
      // se não achar o arquivo, ignora e mantém caminho relativo
    }
  }
  return out; /* markdown com URLs de prévia para o #page */ [attached_file:2]
}

/* Salvar .md — usa Turndown para HTML → Markdown */
async function saveMd({ saveAs = false } = {}) {
  // Garante Turndown (deve estar incluído via <script>)
  if (!window.TurndownService) {
    alert('Turndown não encontrado. Inclua <script src="https://unpkg.com/turndown/dist/turndown.js"></script>.'); /* instrução */ [web:81]
    return;
  }

  const td = new window.TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' }); /* config padrão */ [web:81]
  let md = td.turndown(pageEl); /* converte DOM editado (#page) para Markdown */ [web:81]
  md = fromPreviewToPersistent(md); /* blob: → assets/ quando possível */ [attached_file:2]
  const full = buildFrontMatter({ title: document.title || 'Documento' }) + md; /* front matter + corpo */ [web:63]

  // Se o arquivo foi aberto via FS e não for "Salvar Como", regrava nele
  if (!saveAs && currentFileHandle?.createWritable) {
    const w = await currentFileHandle.createWritable(); /* abre escrita no mesmo arquivo */ [web:50]
    await w.write(full); /* escreve conteúdo */ [web:50]
    await w.close(); /* fecha */ [web:50]
    alert('Arquivo salvo: ' + (currentFileHandle.name || currentFileName)); /* feedback */ [web:50]
    return;
  }

  // Se houver showSaveFilePicker (FS API), permite escolher destino
  if (window.showSaveFilePicker && saveAs) {
    const fh = await window.showSaveFilePicker({
      suggestedName: currentFileName.endsWith('.md') ? currentFileName : (currentFileName.replace(/\.[^\.]+$/, '') + '.md'),
      types: [{ description: 'Markdown', accept: { 'text/markdown': ['.md'] } }]
    }); /* escolha do destino .md */ [web:50]
    currentFileHandle = fh; /* guarda handle */ [web:50]
    currentFileName = fh.name || currentFileName; /* nome atualizado */ [web:50]
    const w = await fh.createWritable(); /* writer */ [web:50]
    await w.write(full); /* grava */ [web:50]
    await w.close(); /* fecha */ [web:50]
    alert('Arquivo salvo: ' + (fh.name || currentFileName)); /* feedback */ [web:50]
    return;
  }

  // Fallback universal: download .md
  const blob = new Blob([full], { type: 'text/markdown;charset=utf-8' }); /* prepara blob */ [web:90]
  const a = document.createElement('a'); /* link temporário */ [attached_file:2]
  a.href = URL.createObjectURL(blob); /* URL blob */ [attached_file:2]
  a.download = currentFileName.endsWith('.md') ? currentFileName : (currentFileName.replace(/\.[^\.]+$/, '') + '.md'); /* nome */ [attached_file:2]
  a.click(); /* dispara download */ [attached_file:2]
  URL.revokeObjectURL(a.href); /* limpa */ [attached_file:2]
}

/* Converte blob: (prévia) para assets/ (persistência) no Markdown */
function fromPreviewToPersistent(md) {
  let out = md; /* base */ [attached_file:2]
  for (const [blobURL, relPath] of previewMap.entries()) {
    out = out.split(blobURL).join(relPath); /* troca URLs de prévia por caminhos relativos */ [attached_file:2]
  }
  return out; /* markdown pronto para salvar */ [attached_file:2]
}

/* Inserir imagem → assets/ (se possível) ou blob: (prévia) */
async function insertLocalImage() {
  const input = document.getElementById('imagePicker'); /* input oculto */ [attached_file:2]
  input.onchange = async () => {
    const file = input.files[0]; /* escolhido */ [attached_file:2]
    if (!file) return; /* sem arquivo */ [attached_file:2]

    let blobURL, relPath;
    // Se já houver pasta do projeto, gravar em assets/
    if (projectDirHandle) {
      await ensureAssets(); /* garante assets/ */ [web:44]
      const clean = uniqueAssetName(file.name); /* nome único */ [attached_file:2]
      await writeBinaryFile(assetsDirHandle, clean, file); /* grava imagem */ [web:44]
      relPath = `assets/${clean}`; /* caminho persistente */ [attached_file:2]
      const fh = await assetsDirHandle.getFileHandle(clean); /* reabre para criar blob URL */ [web:44]
      const saved = await fh.getFile(); /* blob salvo */ [web:44]
      blobURL = URL.createObjectURL(saved); /* URL para prévia */ [attached_file:2]
    } else {
      // Sem pasta do projeto: pergunta se deseja selecionar agora
      if (window.showDirectoryPicker) {
        const usarProjeto = confirm('Selecionar pasta do projeto para salvar imagens em assets/?'); /* UX */ [web:44]
        if (usarProjeto) {
          const ok = await pickProjectFolder(); /* escolhe pasta */ [web:44]
          if (ok) return insertLocalImage(); /* reinicia fluxo já com pasta */ [web:44]
        }
      }
      // Sem projeto: usa apenas prévia blob: e mantém relPath para futura persistência
      relPath = `assets/${file.name}`; /* rascunho de caminho */ [attached_file:2]
      blobURL = URL.createObjectURL(file); /* prévia */ [attached_file:2]
    }

    // Mapeia preview ↔ persistente
    previewMap.set(blobURL, relPath); /* blob → assets */ [attached_file:2]
    pathToBlobURL.set(relPath, blobURL); /* assets → blob */ [attached_file:2]

    // Insere no #page com <img>
    const img = document.createElement('img'); /* cria img */ [attached_file:2]
    img.src = blobURL; /* prévia */ [attached_file:2]
    img.style.maxWidth = '100%'; /* layout */ [attached_file:2]
    pageEl.appendChild(img); /* insere na área editável existente */ [attached_file:2]
    pageEl.focus(); /* foco */ [attached_file:2]
    updateWordCountSafe(); /* contagem atualizada */ [attached_file:1]

    input.value = ''; /* limpa */ [attached_file:2]
  };
  input.click(); /* abre seletor */ [attached_file:2]
}

/* Nova página (limpa o #page sem alterar containers) */
function newDocument() {
  pageEl.innerHTML = '<h2



function monitorPages() {
  const MAX_HEIGHT = 1123;
  const viewport = document.getElementById('viewport');

  function observePage(pageWrap) {
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        if (entry.contentRect.height > MAX_HEIGHT - 100) {
          const newPage = document.createElement('div');
          newPage.classList.add('page');
          newPage.innerHTML = '<div class="page-wrap" contenteditable="true"></div>';
          viewport.appendChild(newPage);
          observer.disconnect();
          monitorPages();
        }
      });
    });
    observer.observe(pageWrap);
  }

  document.querySelectorAll('.page-wrap').forEach(observePage);
}

monitorPages();


document.querySelectorAll('[data-action]').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.getAttribute('data-action');
    document.execCommand(action, false, null);
  });
});
