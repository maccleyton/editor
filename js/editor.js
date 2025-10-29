// ==============================
// EDITOR DE TEXTO PROFISSIONAL
// ==============================

// Elementos principais
const page = document.getElementById('page');
const sheet = document.getElementById('sheet');
const sidebar = document.getElementById('sidebar');
const toggleSidebar = document.getElementById('toggleSidebar');
const zoomRange = document.getElementById('zoomRange');
const zoomLabel = document.getElementById('zoomLabel');
const wordCount = document.getElementById('wordCount');
const pageInfo = document.getElementById('pageInfo');

// Estado do editor
let currentFile = null;
let isDarkMode = false;
let isBookMode = false;

// ==============================
// UTILITÁRIOS
// ==============================

function execCmd(command, value = null) {
	document.execCommand(command, false, value);
	page.focus();
}

function getSelection() {
	return window.getSelection();
}

function getSelectedElement() {
	const sel = getSelection();
	if (sel.rangeCount > 0) {
		return sel.getRangeAt(0).commonAncestorContainer.parentElement;
	}
	return null;
}

function updateWordCount() {
	const text = page.innerText.trim();
	const words = text ? text.split(/\s+/).length : 0;
	wordCount.textContent = `${words} palavras`;
}

function updatePageInfo() {
	const pages = Math.ceil(page.scrollHeight / 1122); // altura A4
	pageInfo.textContent = `Página ${pages}`;
}

// ==============================
// TOOLBAR SUPERIOR
// ==============================

// Configurações
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

// Margens e Orientação
function marginBtn() {
	const margin = prompt('Definir margens (formato: top right bottom left em cm):', '2.5 2 2.5 2');
	if (margin) {
		const values = margin.split(' ').map(v => v + 'cm').join(' ');
		sheet.style.padding = values;
	}
}

// Imprimir
function printBtn() {
	const printWindow = window.open('', '_blank');
	const content = page.innerHTML;
	printWindow.document.write(`
		<!DOCTYPE html>
		<html>
		<head>
			<title>Imprimir</title>
			<style>
				@page { size: A4; margin: 0; }
				body { font-family: ${page.style.fontFamily || 'Arial'}; font-size: ${page.style.fontSize || '16px'}; padding: 2.5cm 2cm; }
			</style>
		</head>
		<body>${content}</body>
		</html>
	`);
	printWindow.document.close();
	setTimeout(() => {
		printWindow.print();
		printWindow.close();
	}, 250);
}

// Publicar como HTML
function publishBtn() {
	const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Documento Publicado</title>
	<style>
		body { font-family: ${page.style.fontFamily || 'Arial'}; font-size: ${page.style.fontSize || '16px'}; max-width: 21cm; margin: 0 auto; padding: 20px; }
	</style>
</head>
<body>
${page.innerHTML}
</body>
</html>`;
	
	const blob = new Blob([html], { type: 'text/html' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'documento.html';
	a.click();
	URL.revokeObjectURL(url);
}

// Alternar modo escuro/claro
function modeBtn() {
	isDarkMode = !isDarkMode;
	document.body.classList.toggle('dark-mode', isDarkMode);
	
	if (isDarkMode) {
		document.documentElement.style.setProperty('--bg', '#1a1a1a');
		document.documentElement.style.setProperty('--text', '#e0e0e0');
		document.documentElement.style.setProperty('--sheet-bg', '#242424');
	} else {
		document.documentElement.style.setProperty('--bg', '#e8e9ed');
		document.documentElement.style.setProperty('--text', '#1a1a1a');
		document.documentElement.style.setProperty('--sheet-bg', '#ffffff');
	}
}

// Ajuda
function helpBtn() {
	alert(`EDITOR DE TEXTO PROFISSIONAL

ATALHOS:
Ctrl+B = Negrito
Ctrl+I = Itálico
Ctrl+U = Sublinhado
Ctrl+S = Salvar

FUNCIONALIDADES:
- Formatação completa de texto
- Inserção de tabelas, imagens, fórmulas
- Suporte a LaTeX e código
- Exportação para PDF, HTML, TXT, MD
- Modo livro e modo web
- Zoom ajustável`);
}

// Título
function selectTitle() {
	const level = prompt('Nível do título (1-6):', '1');
	if (level >= 1 && level <= 6) {
		execCmd('formatBlock', `<h${level}>`);
	}
}

// Selecionar fonte
function selectFont() {
	const font = prompt('Digite o nome da fonte:', 'Arial');
	if (font) execCmd('fontName', font);
}

// Tamanho da fonte
function selectSize() {
	const size = prompt('Tamanho da fonte (1-7, ou px):', '3');
	if (size) {
		if (size.includes('px')) {
			const sel = getSelection();
			if (sel.rangeCount > 0) {
				const span = document.createElement('span');
				span.style.fontSize = size;
				const range = sel.getRangeAt(0);
				range.surroundContents(span);
			}
		} else {
			execCmd('fontSize', size);
		}
	}
}

// Letra capitular
function capitulateLetter() {
	const sel = getSelection();
	if (sel.rangeCount > 0) {
		const range = sel.getRangeAt(0);
		const span = document.createElement('span');
		span.style.fontSize = '3em';
		span.style.float = 'left';
		span.style.lineHeight = '0.8';
		span.style.margin = '0.1em 0.1em 0 0';
		span.style.fontWeight = 'bold';
		range.surroundContents(span);
	}
}

// Inserir citação
function insertQuote() {
	execCmd('formatBlock', '<blockquote>');
}

// Inserir link
function linkBtn() {
	const url = prompt('Digite a URL:', 'https://');
	if (url) execCmd('createLink', url);
}

// Inserir linha horizontal
function insertHorizontalRule() {
	execCmd('insertHorizontalRule');
}

// Inserir quebra de página
function insertPageBreak() {
	const hr = document.createElement('hr');
	hr.style.pageBreakAfter = 'always';
	hr.style.border = 'none';
	hr.style.margin = '20px 0';
	hr.style.borderTop = '2px dashed #ccc';
	const sel = getSelection();
	if (sel.rangeCount > 0) {
		sel.getRangeAt(0).insertNode(hr);
	}
}

// Cor da fonte
function selectColor() {
	const color = prompt('Digite a cor (hex, rgb ou nome):', '#000000');
	if (color) execCmd('foreColor', color);
}

// Cor do fundo
function formatPaint() {
	const color = prompt('Digite a cor de fundo:', '#ffff00');
	if (color) execCmd('backColor', color);
}

// Maiúscula/Minúscula
function selectCase() {
	const sel = getSelection();
	if (sel.toString()) {
		const text = sel.toString();
		const option = prompt('1=MAIÚSCULA, 2=minúscula, 3=Primeira Maiúscula', '1');
		let newText = text;
		
		if (option === '1') newText = text.toUpperCase();
		else if (option === '2') newText = text.toLowerCase();
		else if (option === '3') newText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
		
		execCmd('insertText', newText);
	}
}

// Rotacionar texto
function rotateText() {
	const sel = getSelection();
	if (sel.rangeCount > 0) {
		const span = document.createElement('span');
		const angle = prompt('Ângulo de rotação (graus):', '90');
		span.style.display = 'inline-block';
		span.style.transform = `rotate(${angle}deg)`;
		sel.getRangeAt(0).surroundContents(span);
	}
}

// Classificar texto
function sortText() {
	const text = page.innerText.split('\n').filter(l => l.trim());
	const sorted = text.sort();
	page.innerHTML = sorted.map(l => `<p>${l}</p>`).join('');
}

// Limpar formatação
function clearFormat() {
	execCmd('removeFormat');
	execCmd('unlink');
}

// Espaçamento vertical
function formatLineSpacing() {
	const spacing = prompt('Espaçamento de linha (ex: 1.5):', '1.5');
	if (spacing) page.style.lineHeight = spacing;
}

// Espaçamento horizontal
function formatLetterSpacing() {
	const spacing = prompt('Espaçamento de letras (px):', '1');
	if (spacing) {
		const sel = getSelection();
		if (sel.rangeCount > 0) {
			const span = document.createElement('span');
			span.style.letterSpacing = spacing + 'px';
			sel.getRangeAt(0).surroundContents(span);
		}
	}
}

// Aumentar/diminuir recuo
function indentIncrease() { execCmd('indent'); }
function indentDecrease() { execCmd('outdent'); }

// Inserir LaTeX
function insertLatexBtn() {
	const latex = prompt('Digite a fórmula LaTeX:', 'E = mc^2');
	if (latex) {
		const span = document.createElement('span');
		span.className = 'latex-formula';
		span.setAttribute('data-latex', latex);
		span.textContent = `$$${latex}$$`;
		span.style.color = '#0066cc';
		span.style.fontFamily = 'monospace';
		span.style.background = '#f0f0f0';
		span.style.padding = '2px 6px';
		span.style.borderRadius = '3px';
		
		const sel = getSelection();
		if (sel.rangeCount > 0) {
			sel.getRangeAt(0).insertNode(span);
		}
	}
}

// Inserir bloco de código
function insertCodeBtn() {
	const code = prompt('Digite o código:', '');
	if (code) {
		const pre = document.createElement('pre');
		const codeEl = document.createElement('code');
		codeEl.textContent = code;
		codeEl.style.background = '#2d2d2d';
		codeEl.style.color = '#f8f8f2';
		codeEl.style.padding = '15px';
		codeEl.style.borderRadius = '5px';
		codeEl.style.display = 'block';
		codeEl.style.overflow = 'auto';
		pre.appendChild(codeEl);
		
		const sel = getSelection();
		if (sel.rangeCount > 0) {
			sel.getRangeAt(0).insertNode(pre);
		}
	}
}

// Formatar LaTeX selecionado
function formatLatexBtn() {
	const formulas = page.querySelectorAll('.latex-formula');
	formulas.forEach(f => {
		const latex = f.getAttribute('data-latex');
		// Aqui você pode integrar com KaTeX para renderização real
		f.style.background = '#e3f2fd';
		f.style.borderLeft = '3px solid #2196f3';
	});
}

// Formatar código selecionado
function formatCodeBtn() {
	const codes = page.querySelectorAll('code');
	codes.forEach(c => {
		c.style.background = '#2d2d2d';
		c.style.color = '#f8f8f2';
		c.style.padding = '2px 6px';
		c.style.borderRadius = '3px';
	});
}

// Inserir tabela
function insertTable() {
	const rows = prompt('Número de linhas:', '3');
	const cols = prompt('Número de colunas:', '3');
	
	if (rows && cols) {
		let table = '<table border="1" style="border-collapse:collapse;width:100%;margin:10px 0">';
		for (let i = 0; i < rows; i++) {
			table += '<tr>';
			for (let j = 0; j < cols; j++) {
				table += '<td style="padding:8px;border:1px solid #ddd">&nbsp;</td>';
			}
			table += '</tr>';
		}
		table += '</table>';
		execCmd('insertHTML', table);
	}
}

// Funções de tabela
function addColumnLeft() {
	const cell = getSelectedElement().closest('td, th');
	if (cell) {
		const row = cell.parentElement;
		const index = Array.from(row.children).indexOf(cell);
		const table = row.closest('table');
		Array.from(table.rows).forEach(r => {
			const newCell = r.insertCell(index);
			newCell.style.padding = '8px';
			newCell.style.border = '1px solid #ddd';
			newCell.innerHTML = '&nbsp;';
		});
	}
}

function addColumnRight() {
	const cell = getSelectedElement().closest('td, th');
	if (cell) {
		const row = cell.parentElement;
		const index = Array.from(row.children).indexOf(cell);
		const table = row.closest('table');
		Array.from(table.rows).forEach(r => {
			const newCell = r.insertCell(index + 1);
			newCell.style.padding = '8px';
			newCell.style.border = '1px solid #ddd';
			newCell.innerHTML = '&nbsp;';
		});
	}
}

function addRowAbove() {
	const cell = getSelectedElement().closest('td, th');
	if (cell) {
		const row = cell.parentElement;
		const newRow = row.parentElement.insertBefore(document.createElement('tr'), row);
		const colCount = row.cells.length;
		for (let i = 0; i < colCount; i++) {
			const newCell = newRow.insertCell();
			newCell.style.padding = '8px';
			newCell.style.border = '1px solid #ddd';
			newCell.innerHTML = '&nbsp;';
		}
	}
}

function addRowBelow() {
	const cell = getSelectedElement().closest('td, th');
	if (cell) {
		const row = cell.parentElement;
		const newRow = row.parentElement.insertBefore(document.createElement('tr'), row.nextSibling);
		const colCount = row.cells.length;
		for (let i = 0; i < colCount; i++) {
			const newCell = newRow.insertCell();
			newCell.style.padding = '8px';
			newCell.style.border = '1px solid #ddd';
			newCell.innerHTML = '&nbsp;';
		}
	}
}

function mergerCell() {
	alert('Selecione duas células e use esta função para mesclá-las.');
}

function combineColumns() {
	alert('Função de combinar colunas - em desenvolvimento');
}

function borderColor() {
	const color = prompt('Cor da borda:', '#000000');
	const table = getSelectedElement().closest('table');
	if (table && color) {
		table.querySelectorAll('td, th').forEach(cell => {
			cell.style.borderColor = color;
		});
	}
}

function formatColor() {
	const color = prompt('Cor de fundo das células:', '#ffffff');
	const cell = getSelectedElement().closest('td, th');
	if (cell && color) {
		cell.style.backgroundColor = color;
	}
}

function deleteTable() {
	const table = getSelectedElement().closest('table');
	if (table && confirm('Deletar esta tabela?')) {
		table.remove();
	}
}

// ==============================
// TOOLBAR INFERIOR
// ==============================

// Arquivo
function newBtn() {
	if (confirm('Criar novo documento? Alterações não salvas serão perdidas.')) {
		page.innerHTML = '<h2>Digite aqui seu conteúdo...</h2><p>Novo documento criado.</p>';
		currentFile = null;
		updateWordCount();
	}
}

function openBtn() {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.txt,.html,.md';
	input.onchange = e => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = event => {
			if (file.name.endsWith('.md')) {
				// Conversão básica de Markdown
				let content = event.target.result;
				content = content.replace(/^# (.+)$/gm, '<h1>$1</h1>');
				content = content.replace(/^## (.+)$/gm, '<h2>$1</h2>');
				content = content.replace(/^### (.+)$/gm, '<h3>$1</h3>');
				content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
				content = content.replace(/\*(.+?)\*/g, '<em>$1</em>');
				page.innerHTML = content;
			} else {
				page.innerHTML = event.target.result;
			}
			currentFile = file.name;
			updateWordCount();
		};
		reader.readAsText(file);
	};
	input.click();
}

function saveBtn() {
	const content = page.innerHTML;
	const blob = new Blob([content], { type: 'text/html' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = currentFile || 'documento.html';
	a.click();
	URL.revokeObjectURL(url);
}

function saveAsBtn() {
	const format = prompt('Formato:\n1. TXT\n2. MD (Markdown)\n3. PDF\n4. HTML\n\nEscolha:', '1');
	const filename = prompt('Nome do arquivo:', 'documento');
	
	if (!filename) return;
	
	let content, mimeType, extension;
	
	if (format === '1') {
		content = page.innerText;
		mimeType = 'text/plain';
		extension = 'txt';
	} else if (format === '2') {
		// Conversão para Markdown
		content = page.innerText;
		content = content.replace(/<h1>(.+?)<\/h1>/g, '# $1\n');
		content = content.replace(/<h2>(.+?)<\/h2>/g, '## $1\n');
		content = content.replace(/<h3>(.+?)<\/h3>/g, '### $1\n');
		content = content.replace(/<strong>(.+?)<\/strong>/g, '**$1**');
		content = content.replace(/<em>(.+?)<\/em>/g, '*$1*');
		mimeType = 'text/markdown';
		extension = 'md';
	} else if (format === '3') {
		alert('Para PDF, use a função Imprimir e escolha "Salvar como PDF" no navegador.');
		return;
	} else {
		content = page.innerHTML;
		mimeType = 'text/html';
		extension = 'html';
	}
	
	const blob = new Blob([content], { type: mimeType });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = `${filename}.${extension}`;
	a.click();
	URL.revokeObjectURL(url);
}

function webMode() {
	isBookMode = false;
	sheet.style.maxWidth = '100%';
	sheet.style.boxShadow = 'none';
	sheet.style.margin = '0';
}

function bookMode() {
	isBookMode = true;
	sheet.style.maxWidth = '21cm';
	sheet.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
	sheet.style.margin = '20px auto';
}

// Clipboard
function contentCopy() { execCmd('copy'); }
function contentCut() { execCmd('cut'); }
function contentPaste() { execCmd('paste'); }
function selectAll() { execCmd('selectAll'); }

// Alinhamento
function justifyLeft() { execCmd('justifyLeft'); }
function justifyCenter() { execCmd('justifyCenter'); }
function justifyRight() { execCmd('justifyRight'); }
function justifyFull() { execCmd('justifyFull'); }

// Formatação de texto
function bold() { execCmd('bold'); }
function italic() { execCmd('italic'); }
function underline() { execCmd('underline'); }
function strikeThrough() { execCmd('strikeThrough'); }
function subscriptText() { execCmd('subscript'); }
function superscriptText() { execCmd('superscript'); }

// Listas
function insertUnorderedList() { execCmd('insertUnorderedList'); }
function insertOrderedList() { execCmd('insertOrderedList'); }

function insertDefinitionList() {
	const html = '<dl><dt>Termo</dt><dd>Definição</dd></dl>';
	execCmd('insertHTML', html);
}

function insertCheckList() {
	const html = '<ul style="list-style:none"><li><input type="checkbox"> Item 1</li><li><input type="checkbox"> Item 2</li></ul>';
	execCmd('insertHTML', html);
}

// Imagens
function localImageBtn() {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = 'image/*';
	input.onchange = e => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = event => {
			const img = `<img src="${event.target.result}" style="max-width:100%;height:auto" />`;
			execCmd('insertHTML', img);
		};
		reader.readAsDataURL(file);
	};
	input.click();
}

function imageLeft() {
	const img = getSelectedElement().closest('img');
	if (img) {
		img.style.float = 'left';
		img.style.margin = '0 15px 10px 0';
	}
}

function imageRight() {
	const img = getSelectedElement().closest('img');
	if (img) {
		img.style.float = 'right';
		img.style.margin = '0 0 10px 15px';
	}
}

function imagePosition() {
	const img = getSelectedElement().closest('img');
	if (img) {
		const pos = prompt('Posição: 1=Normal, 2=Esquerda, 3=Direita, 4=Centro', '1');
		img.style.float = 'none';
		img.style.margin = '0';
		if (pos === '2') {
			img.style.float = 'left';
			img.style.margin = '0 15px 10px 0';
		} else if (pos === '3') {
			img.style.float = 'right';
			img.style.margin = '0 0 10px 15px';
		} else if (pos === '4') {
			img.style.display = 'block';
			img.style.margin = '10px auto';
		}
	}
}

// Bordas
function insertBorderAll() { applyCellBorder('1px solid #000'); }
function insertBorderOutr() { applyCellBorder('', '1px solid #000'); }
function insertBorderInner() { applyCellBorder('1px solid #000', ''); }
function insertBorderVertical() { applyCellBorderSides('left right'); }
function insertBorderHorizontal() { applyCellBorderSides('top bottom'); }
function insertBorderTop() { applyCellBorderSides('top'); }
function insertBorderBottom() { applyCellBorderSides('bottom'); }
function insertBorderLeft() { applyCellBorderSides('left'); }
function insertBorderRight() { applyCellBorderSides('right'); }
function cleartBorder() { applyCellBorder('none'); }

function applyCellBorder(inner, outer) {
	const cell = getSelectedElement().closest('td, th, p, div');
	if (cell) {
		if (inner) cell.style.border = inner;
		if (outer) cell.style.outline = outer;
	}
}

function applyCellBorderSides(sides) {
	const cell = getSelectedElement().closest('td, th, p, div');
	if (cell) {
		sides.split(' ').forEach(side => {
			cell.style[`border${side.charAt(0).toUpperCase() + side.slice(1)}`] = '1px solid #000';
		});
	}
}

// ==============================
// EVENT LISTENERS
// ==============================

// Atribuir funções aos botões
document.querySelectorAll('.icon-btn').forEach(btn => {
	const cmd = btn.getAttribute('data-cmd');
	if (cmd && window[cmd]) {
		btn.addEventListener('click', () => window[cmd]());
	}
});

// Sidebar toggle
toggleSidebar.addEventListener('click', () => {
	sidebar.classList.toggle('collapsed');
	toggleSidebar.innerHTML = sidebar.classList.contains('collapsed') 
		? '<span class="material-icon">chevron_right</span> <span class="text">Expandir</span>'
		: '<span class="material-icon">chevron_left</span> <span class="text">Recolher</span>';
});

// Zoom
zoomRange.addEventListener('input', () => {
	const zoom = zoomRange.value / 100;
	sheet.style.transform = `scale(${zoom})`;
	sheet.style.transformOrigin = 'top center';
	zoomLabel.textContent = `${zoomRange.value}%`;
});

// Atualizar contadores
page.addEventListener('input', () => {
	updateWordCount();
	updatePageInfo();
});

// Atalhos de teclado
document.addEventListener('keydown', e => {
	if (e.ctrlKey || e.metaKey) {
		switch(e.key.toLowerCase()) {
			case 'b':
				e.preventDefault();
				bold();
				break;
			case 'i':
				e.preventDefault();
				italic();
				break;
			case 'u':
				e.preventDefault();
				underline();
				break;
			case 's':
				e.preventDefault();
				saveBtn();
				break;
		}
	}
});

// Prevenir perda de dados
window.addEventListener('beforeunload', e => {
	if (page.innerText.trim().length > 0) {
		e.preventDefault();
		e.returnValue = '';
	}
});

// Inicialização
updateWordCount();
updatePageInfo();

console.log('✅ Editor de texto carregado com sucesso!');
