// ==============================
// ELEMENTOS
// ==============================
const page = document.getElementById('page');
const sheet = document.getElementById('sheet');
const sidebar = document.getElementById('sidebar');
const toggleSidebar = document.getElementById('toggleSidebar');
const zoomRange = document.getElementById('zoomRange');
const zoomLabel = document.getElementById('zoomLabel');
const wordCount = document.getElementById('wordCount');
const pageInfo = document.getElementById('pageInfo');
const viewport = document.getElementById('viewport');

// Estado
let currentFile = null;
let isDarkMode = false;

// ==============================
// UTILITÁRIOS
// ==============================
function execCmd(command, value = null) {
  document.execCommand(command, false, value);
  page.focus();
}
function getSelectionRange() {
  const sel = window.getSelection();
  if (sel && sel.rangeCount > 0) return sel.getRangeAt(0);
  return null;
}
function getSelectedElement() {
  const r = getSelectionRange();
  if (!r) return null;
  const node = r.commonAncestorContainer.nodeType === 1 ? r.commonAncestorContainer : r.commonAncestorContainer.parentNode;
  return node;
}
function updateWordCount() {
  const text = page.innerText.trim();
  const words = text ? text.split(/\s+/).length : 0;
  wordCount.textContent = words + ' palavras';
}
function updatePageInfo() {
  // Aproximação da contagem de páginas A4
  const pxPerPage = 1122; // ~29.7cm a 96dpi
  const pages = Math.max(1, Math.ceil(page.scrollHeight / pxPerPage));
  pageInfo.textContent = 'Página ' + pages;
}

// ==============================
// SUPERIOR
// ==============================
function configBtn() {
  const config = prompt('Configurações:\n1. Fonte padrão\n2. Tamanho padrão\n3. Idioma\n\nDigite o número da opção:');
  if (config === '1') {
	const font = prompt('Digite o nome da fonte:', 'Arial');
	if (font) page.style.fontFamily = font;
  } else if (config === '2') {
	const size = prompt('Digite o tamanho (px):', '16');
	if (size) page.style.fontSize = size + 'px';
  } else if (config === '3') {
	const lang = prompt('Digite o código do idioma:', 'pt-BR');
	if (lang) page.setAttribute('lang', lang);
  }
}
function marginBtn() {
  const margin = prompt('Definir margens (top right bottom left em cm):', '2.5 2 2.5 2');
  if (margin) {
	const values = margin.split(/\s+/).map(v => v + 'cm').join(' ');
	// aplica nas margens internas da página
	page.style.padding = values;
  }
}
function printBtn() {
  // imprime somente a área editável abrindo uma janela com o conteúdo
  const printWindow = window.open('', '_blank');
  const content = page.innerHTML;
  const family = page.style.fontFamily || 'Arial';
  const fsize = page.style.fontSize || '16px';
  printWindow.document.open();
  printWindow.document.write(`
	<!DOCTYPE html>
	<html lang="pt-BR">
	<head>
	  <meta charset="utf-8"/>
	  <title>Imprimir</title>
	  <style>
		@page{size:A4;margin:0}
		body{font-family:${family};font-size:${fsize};padding:2.5cm 2cm}
		table{border-collapse:collapse;width:100%}
		td,th{border:1px solid #ddd;padding:8px}
		blockquote{margin:8px 0;padding:8px 12px;border-left:4px solid #93c5fd;background:#eff6ff}
	  </style>
	</head>
	<body>${content}</body>
	</html>
  `);
  printWindow.document.close();
  setTimeout(()=>{ printWindow.print(); printWindow.close(); }, 250);
}
function publishBtn() {
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Documento Publicado</title>
<style>body{font-family:${page.style.fontFamily || 'Arial'};font-size:${page.style.fontSize || '16px'};max-width:21cm;margin:0 auto;padding:20px}</style>
</head>
<body>
${page.innerHTML}
</body>
</html>`;
  const blob = new Blob([html], { type:'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'documento.html'; a.click();
  URL.revokeObjectURL(url);
}
function modeBtn() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode', isDarkMode);
}
function helpBtn() {
  alert(`ATALHOS:\nCtrl+B Negrito • Ctrl+I Itálico • Ctrl+U Sublinhado • Ctrl+S Salvar\n\nDICAS:\n- "Imprimir" e "Salvar como PDF" usam apenas a área editável.\n- Use "Publicar" para baixar um HTML limpo com seu conteúdo.`);
}

function selectTitle() {
  const level = prompt('Nível do título (1-6):', '1');
  if (!level) return;
  const n = parseInt(level,10);
  if (n>=1 && n<=6) execCmd('formatBlock', '<h'+n+'>');
}
function selectFont() {
  const font = prompt('Digite o nome da fonte:', 'Arial');
  if (font) execCmd('fontName', font);
}
function selectSize() {
  const size = prompt('Tamanho da fonte (1-7, ou px):', '3');
  if (!size) return;
  if (/\d+px/.test(size)) {
	const r = getSelectionRange(); if (!r) return;
	const span = document.createElement('span'); span.style.fontSize = size;
	r.surroundContents(span);
  } else {
	execCmd('fontSize', size);
  }
}
function capitulateLetter() {
  const r = getSelectionRange(); if (!r) return;
  const span = document.createElement('span');
  span.style.fontSize = '3em'; span.style.float = 'left'; span.style.lineHeight = '0.9';
  span.style.margin = '0.06em 0.2em 0 0'; span.style.fontWeight = '700';
  r.surroundContents(span);
}
function insertQuote(){ execCmd('formatBlock','<blockquote>'); }
function linkBtn(){
  const url = prompt('Digite a URL:', 'https://');
  if (url) execCmd('createLink', url);
}
function insertHorizontalRule(){ execCmd('insertHorizontalRule'); }
function insertPageBreak() {
  const r = getSelectionRange(); if (!r) return;
  const hr = document.createElement('hr');
  hr.style.pageBreakAfter='always'; hr.style.border='none'; hr.style.margin='20px 0'; hr.style.borderTop='2px dashed #ccc';
  r.insertNode(hr);
}
function selectColor(){
  const color = prompt('Cor do texto (hex, rgb, nome):', '#000000');
  if (color) execCmd('foreColor', color);
}
function formatPaint(){
  const color = prompt('Cor de fundo:', '#ffff00');
  if (color) execCmd('backColor', color);
}
function selectCase(){
  const sel = window.getSelection();
  const txt = sel ? sel.toString() : '';
  if (!txt) return;
  const opt = prompt('1=MAIÚSCULA • 2=minúscula • 3=Primeira Maiúscula', '1');
  let novo = txt;
  if (opt==='1') novo = txt.toUpperCase();
  else if (opt==='2') novo = txt.toLowerCase();
  else if (opt==='3') novo = txt.charAt(0).toUpperCase()+txt.slice(1).toLowerCase();
  execCmd('insertText', novo);
}
function rotateText(){
  const r = getSelectionRange(); if (!r) return;
  const ang = prompt('Ângulo (graus):','90'); if (!ang) return;
  const span = document.createElement('span');
  span.style.display='inline-block'; span.style.transform='rotate('+ang+'deg)';
  r.surroundContents(span);
}
function sortText(){
  const lines = page.innerText.split('\n').filter(l=>l.trim());
  const sorted = lines.sort((a,b)=>a.localeCompare(b,'pt-BR'));
  page.innerHTML = sorted.map(l=>'<p>'+l.replace(/[&<>]/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[s]))+'</p>').join('');
  updateWordCount(); updatePageInfo();
}
function clearFormat(){
  execCmd('removeFormat'); execCmd('unlink');
}
function formatLineSpacing(){
  const v = prompt('Espaçamento de linha (ex: 1.5):','1.5'); if (v) page.style.lineHeight = v;
}
function formatLetterSpacing(){
  const px = prompt('Espaçamento de letras (px):','1'); if (!px) return;
  const r = getSelectionRange(); if (!r) return;
  const span = document.createElement('span'); span.style.letterSpacing = px+'px'; r.surroundContents(span);
}
function indentIncrease(){ execCmd('indent'); }
function indentDecrease(){ execCmd('outdent'); }

// LaTeX e Código
function insertLatexBtn(){
  const latex = prompt('Digite a fórmula LaTeX:', 'E = mc^2'); if (!latex) return;
  const span = document.createElement('span');
  span.className='latex-formula'; span.dataset.latex = latex; span.textContent = '$$'+latex+'$$';
  const r = getSelectionRange(); if (r) r.insertNode(span);
}
function insertCodeBtn(){
  const code = prompt('Digite o código:',''); if (!code) return;
  const pre = document.createElement('pre'); const codeEl = document.createElement('code');
  codeEl.textContent = code; pre.appendChild(codeEl);
  const r = getSelectionRange(); if (r) r.insertNode(pre);
}
function formatLatexBtn(){
  // Estilização leve; integração real com KaTeX pode ser adicionada
  page.querySelectorAll('.latex-formula').forEach(f=>{
	f.style.background='#e3f2fd'; f.style.borderLeft='3px solid #2196f3';
  });
}
function formatCodeBtn(){
  page.querySelectorAll('code').forEach(c=>{
	c.style.background='#f3f4f6'; c.style.color='#111827'; c.style.padding='2px 6px'; c.style.borderRadius='4px';
  });
}

// Tabelas
function insertTable(){
  const rows = parseInt(prompt('Número de linhas:','3')||'0',10);
  const cols = parseInt(prompt('Número de colunas:','3')||'0',10);
  if (!(rows>0 && cols>0)) return;
  let html = '<table>';
  for (let i=0;i<rows;i++){
	html += '<tr>';
	for (let j=0;j<cols;j++){ html += '<td>&nbsp;</td>'; }
	html += '</tr>';
  }
  html += '</table>';
  execCmd('insertHTML', html);
}
function addColumnLeft(){
  const el = getSelectedElement(); if (!el) return;
  const cell = el.closest('td,th'); if (!cell) return;
  const row = cell.parentElement; const idx = Array.from(row.children).indexOf(cell);
  const table = row.closest('table');
  Array.from(table.rows).forEach(r=>{
	const nc = r.insertCell(idx); nc.innerHTML='&nbsp;';
  });
}
function addColumnRight(){
  const el = getSelectedElement(); if (!el) return;
  const cell = el.closest('td,th'); if (!cell) return;
  const row = cell.parentElement; const idx = Array.from(row.children).indexOf(cell);
  const table = row.closest('table');
  Array.from(table.rows).forEach(r=>{
	const nc = r.insertCell(idx+1); nc.innerHTML='&nbsp;';
  });
}
function addRowAbove(){
  const el = getSelectedElement(); if (!el) return;
  const cell = el.closest('td,th'); if (!cell) return;
  const row = cell.parentElement; const newRow = document.createElement('tr');
  for (let i=0;i<row.cells.length;i++){ const c = document.createElement('td'); c.innerHTML='&nbsp;'; newRow.appendChild(c); }
  row.parentElement.insertBefore(newRow, row);
}
function addRowBelow(){
  const el = getSelectedElement(); if (!el) return;
  const cell = el.closest('td,th'); if (!cell) return;
  const row = cell.parentElement; const newRow = document.createElement('tr');
  for (let i=0;i<row.cells.length;i++){ const c = document.createElement('td'); c.innerHTML='&nbsp;'; newRow.appendChild(c); }
  row.parentElement.insertBefore(newRow, row.nextSibling);
}
function mergerCell(){ alert('Selecione células contíguas e use "Mesclar" (em desenvolvimento).'); }
function combineColumns(){ alert('Combinar colunas (em desenvolvimento).'); }
function borderColor(){
  const color = prompt('Cor da borda:','#000000'); if (!color) return;
  const el = getSelectedElement(); if (!el) return;
  const table = el.closest('table'); if (!table) return;
  table.querySelectorAll('td,th').forEach(c=>c.style.borderColor = color);
}
function formatColor(){
  const color = prompt('Cor de fundo da célula:', '#ffffff'); if (!color) return;
  const el = getSelectedElement(); if (!el) return;
  const cell = el.closest('td,th'); if (cell) cell.style.backgroundColor = color;
}
function deleteTable(){
  const el = getSelectedElement(); if (!el) return;
  const table = el.closest('table'); if (table && confirm('Deletar esta tabela?')) table.remove();
}

// ==============================
// INFERIOR
// ==============================
function newBtn(){
  if (confirm('Criar novo documento? Alterações não salvas serão perdidas.')) {
	page.innerHTML = '<h2>Digite aqui seu conteúdo...</h2><p>Novo documento criado.</p>';
	currentFile = null; updateWordCount(); updatePageInfo();
  }
}
function openBtn(){
  const input = document.createElement('input');
  input.type='file'; input.accept='.txt,.html,.md';
  input.onchange = e=>{
	const file = e.target.files[0]; if (!file) return;
	const reader = new FileReader();
	reader.onload = ev=>{
	  let txt = ev.target.result;
	  if (file.name.endsWith('.md')){
		// Conversão simples de MD -> HTML
		let html = txt;
		html = html.replace(/^###### (.+)$/gm,'<h6>$1</h6>')
				   .replace(/^##### (.+)$/gm,'<h5>$1</h5>')
				   .replace(/^#### (.+)$/gm,'<h4>$1</h4>')
				   .replace(/^### (.+)$/gm,'<h3>$1</h3>')
				   .replace(/^## (.+)$/gm,'<h2>$1</h2>')
				   .replace(/^# (.+)$/gm,'<h1>$1</h1>')
				   .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
				   .replace(/\*(.+?)\*/g,'<em>$1</em>')
				   .replace(/\n{2,}/g,'</p><p>')
				   .replace(/^(?!<h\d|<p|<ul|<ol|<blockquote|<pre|<table)(.+)$/gm,'<p>$1</p>');
		page.innerHTML = '<p>'+html+'</p>';
	  } else if (file.name.endsWith('.txt')){
		// preserva quebras simples em <p>
		const html = txt.split(/\n{2,}/).map(p=>'<p>'+p.replace(/\n/g,'<br>')+'</p>').join('');
		page.innerHTML = html;
	  } else {
		page.innerHTML = txt;
	  }
	  currentFile = file.name; updateWordCount(); updatePageInfo();
	};
	reader.readAsText(file);
  };
  input.click();
}
function saveBtn(){
  const content = page.innerHTML;
  const blob = new Blob([content], { type:'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download = (currentFile && currentFile.endsWith('.html')) ? currentFile : 'documento.html';
  a.click(); URL.revokeObjectURL(url);
}
function saveAsBtn(){
  const format = prompt('Formato:\n1. TXT\n2. MD (Markdown)\n3. PDF\n4. HTML\n\nEscolha:','1');
  const filename = prompt('Nome do arquivo:','documento'); if (!format || !filename) return;

  if (format === '1'){ // TXT
	const blob = new Blob([page.innerText], { type:'text/plain' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a'); a.href=url; a.download = filename+'.txt'; a.click(); URL.revokeObjectURL(url);
  } else if (format === '2'){ // MD
	// Conversão mínima para Markdown (apenas cabeçalhos e ênfases já inseridas)
	let html = page.innerHTML;

	// Remover quebras <hr> de página
	html = html.replace(/<hr[^>]*>/gi, '\n\n---\n\n');

	// Cabeçalhos
	html = html.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
			   .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
			   .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
			   .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
			   .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n')
			   .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n');

	// Ênfases
	html = html.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
			   .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
			   .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
			   .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
			   .replace(/<u[^>]*>(.*?)<\/u>/gi, '$1');

	// Listas
	html = html.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1')
			   .replace(/<\/ul>/gi, '\n')
			   .replace(/<ul[^>]*>/gi, '\n');

	// Parágrafos e quebras
	html = html.replace(/<br\s*\/?>/gi, '  \n')
			   .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');

	// Código
	html = html.replace(/<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi, (m, c)=>'\n``````\n\n')
			   .replace(/<code[^>]*>(.*?)<\/code>/gi, (m,c)=>'`'+c.replace(/`/g,'\\`')+'`');

	// Links
	html = html.replace(/<a[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');

	// Tabelas simples: substitui por texto
	html = html.replace(/<\/tr>\s*<\/thead>/gi, '\n')
			   .replace(/<\/tr>\s*<\/tbody>/gi, '\n')
			   .replace(/<tr[^>]*>/gi, '\n')
			   .replace(/<t[hd][^>]*>(.*?)<\/t[hd]>/gi, ' | $1 ')
			   .replace(/<table[^>]*>|<\/table>/gi, '\n');

	// Remover demais tags
	const md = html.replace(/<\/?[^>]+>/g, '');

	const blob = new Blob([md.trim()], { type:'text/markdown' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a'); a.href=url; a.download = filename+'.md'; a.click(); URL.revokeObjectURL(url);

  } else if (format === '3'){ // PDF: abrir janela de impressão da área
	const printWindow = window.open('', '_blank');
	const content = page.innerHTML;
	const family = page.style.fontFamily || 'Arial';
	const fsize = page.style.fontSize || '16px';
	printWindow.document.open();
	printWindow.document.write(`
	  <!DOCTYPE html>
	  <html lang="pt-BR">
	  <head>
		<meta charset="utf-8"/>
		<title>${filename}.pdf</title>
		<style>
		  @page{size:A4;margin:0}
		  body{font-family:${family};font-size:${fsize};padding:2.5cm 2cm}
		  table{border-collapse:collapse;width:100%}
		  td,th{border:1px solid #ddd;padding:8px}
		</style>
	  </head>
	  <body>${content}</body>
	  </html>
	`);
	printWindow.document.close();
	setTimeout(()=>{ printWindow.print(); printWindow.close(); }, 250);

  } else { // HTML
	const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>${filename}</title></head><body>${page.innerHTML}</body></html>`;
	const blob = new Blob([html], { type:'text/html' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a'); a.href=url; a.download = filename+'.html'; a.click(); URL.revokeObjectURL(url);
  }
}
function webMode(){
  sheet.style.width = '100%';
  sheet.style.boxShadow = 'none';
  sheet.style.borderRadius = '0';
  sheet.style.background = 'transparent';
}
function bookMode(){
  sheet.style.width = '21cm';
  sheet.style.boxShadow = '0 20px 60px rgba(0,0,0,.18)';
  sheet.style.borderRadius = '6px';
  sheet.style.background = getComputedStyle(document.documentElement).getPropertyValue('--sheet-bg');
}

// Clipboard
function contentCopy(){ execCmd('copy'); }
function contentCut(){ execCmd('cut'); }
async function contentPaste(){
  try{
	const text = await navigator.clipboard.readText();
	if (text) execCmd('insertText', text);
  } catch(e){
	alert('Colar direto bloqueado pelo navegador. Use Ctrl+V dentro da área ou conceda permissão ao Clipboard.');
  }
}
function selectAll(){ execCmd('selectAll'); }

// Alinhamento
function justifyLeft(){ execCmd('justifyLeft'); }
function justifyCenter(){ execCmd('justifyCenter'); }
function justifyRight(){ execCmd('justifyRight'); }
function justifyFull(){ execCmd('justifyFull'); }

// Texto
function bold(){ execCmd('bold'); }
function italic(){ execCmd('italic'); }
function underline(){ execCmd('underline'); }
function strikeThrough(){ execCmd('strikeThrough'); }
function subscriptText(){ execCmd('subscript'); }
function superscriptText(){ execCmd('superscript'); }

// Listas
function insertUnorderedList(){ execCmd('insertUnorderedList'); }
function insertOrderedList(){ execCmd('insertOrderedList'); }
function insertDefinitionList(){
  execCmd('insertHTML','<dl><dt>Termo</dt><dd>Definição</dd></dl>');
}
function insertCheckList(){
  execCmd('insertHTML','<ul style="list-style:none;padding-left:0"><li><input type="checkbox"> Item 1</li><li><input type="checkbox"> Item 2</li></ul>');
}

// Imagens
function localImageBtn(){
  const input = document.createElement('input'); input.type='file'; input.accept='image/*';
  input.onchange = e=>{
	const file = e.target.files[0]; if (!file) return;
	const reader = new FileReader();
	reader.onload = ev=>{
	  execCmd('insertHTML', '<img src="'+ev.target.result+'" style="max-width:100%;height:auto"/>');
	};
	reader.readAsDataURL(file);
  };
  input.click();
}
function imageLeft(){
  const el = getSelectedElement(); if (!el) return;
  const img = el.closest('img'); if (!img) return;
  img.style.float='left'; img.style.margin='0 15px 10px 0';
}
function imageRight(){
  const el = getSelectedElement(); if (!el) return;
  const img = el.closest('img'); if (!img) return;
  img.style.float='right'; img.style.margin='0 0 10px 15px';
}
function imagePosition(){
  const el = getSelectedElement(); if (!el) return;
  const img = el.closest('img'); if (!img) return;
  const pos = prompt('Posição: 1=Normal, 2=Esquerda, 3=Direita, 4=Centro','1');
  img.style.float='none'; img.style.margin='0'; img.style.display='inline';
  if (pos==='2'){ img.style.float='left'; img.style.margin='0 15px 10px 0'; }
  else if (pos==='3'){ img.style.float='right'; img.style.margin='0 0 10px 15px'; }
  else if (pos==='4'){ img.style.display='block'; img.style.margin='10px auto'; }
}

// Bordas
function insertBorderAll(){ applyCellBorder('1px solid #000'); }
function insertBorderOutr(){ applyCellBorder('', '1px solid #000'); }
function insertBorderInner(){ applyCellBorder('1px solid #000', ''); }
function insertBorderVertical(){ applyCellBorderSides('left right'); }
function insertBorderHorizontal(){ applyCellBorderSides('top bottom'); }
function insertBorderTop(){ applyCellBorderSides('top'); }
function insertBorderBottom(){ applyCellBorderSides('bottom'); }
function insertBorderLeft(){ applyCellBorderSides('left'); }
function insertBorderRight(){ applyCellBorderSides('right'); }
function cleartBorder(){ applyCellBorder('none'); }

function applyCellBorder(inner, outer){
  const el = getSelectedElement(); if (!el) return;
  const cell = el.closest('td,th,p,div'); if (!cell) return;
  if (inner!==undefined && inner!=='') cell.style.border = inner;
  if (outer!==undefined) cell.style.outline = outer || '';
}
function applyCellBorderSides(sides){
  const el = getSelectedElement(); if (!el) return;
  const cell = el.closest('td,th,p,div'); if (!cell) return;
  sides.split(' ').forEach(side=>{
	const prop = 'border'+side.charAt(0).toUpperCase()+side.slice(1);
	cell.style[prop] = '1px solid #000';
  });
}

// ==============================
// EVENTOS
// ==============================
document.querySelectorAll('.icon-btn').forEach(btn=>{
  const cmd = btn.getAttribute('data-cmd');
  if (cmd && typeof window[cmd] === 'function'){
	btn.addEventListener('click', ()=>window[cmd]());
  }
});

// Sidebar
toggleSidebar.addEventListener('click', ()=>{
  sidebar.classList.toggle('collapsed');
  toggleSidebar.innerHTML = sidebar.classList.contains('collapsed')
	? '<span class="material-icon">chevron_right</span> <span class="text">Expandir</span>'
	: '<span class="material-icon">chevron_left</span> <span class="text">Recolher</span>';
});

// Zoom
function applyZoom(){
  const z = zoomRange.value/100;
  viewport.style.transform = 'scale('+z+')';
  zoomLabel.textContent = zoomRange.value+'%';
}
zoomRange.addEventListener('input', applyZoom);

// Atualizações
page.addEventListener('input', ()=>{ updateWordCount(); updatePageInfo(); });

// Atalhos
document.addEventListener('keydown', e=>{
  if (e.ctrlKey || e.metaKey){
	const k = e.key.toLowerCase();
	if (['b','i','u','s'].includes(k)){ e.preventDefault(); }
	if (k==='b') return bold();
	if (k==='i') return italic();
	if (k==='u') return underline();
	if (k==='s') return saveBtn();
  }
});

// Prevenir perda
window.addEventListener('beforeunload', e=>{
  if (page.innerText.trim().length>0){ e.preventDefault(); e.returnValue=''; }
});

// Inicialização
updateWordCount(); updatePageInfo(); applyZoom();
