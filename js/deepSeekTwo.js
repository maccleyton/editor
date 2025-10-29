// Configuração do Marked
marked.setOptions({
	breaks: true,
	gfm: true,
	highlight: function(code, lang) {
		if (Prism.languages[lang]) {
			return Prism.highlight(code, Prism.languages[lang], lang);
		}
		return code;
	}
});

// Elementos DOM
const markdownInput = document.getElementById('markdown-input');
const preview = document.getElementById('preview');

// Função para atualizar o preview
function updatePreview() {
	const markdownText = markdownInput.value;
	
	let processedText = markdownText;
	const latexBlocks = [];
	
	// Processar fórmulas LaTeX
	processedText = processedText.replace(/\$\$(.*?)\$\$/g, (match, formula) => {
		const id = `latex-block-${latexBlocks.length}`;
		latexBlocks.push({ id, formula, display: true });
		return `@@${id}@@`;
	});
	
	processedText = processedText.replace(/\$(.*?)\$/g, (match, formula) => {
		const id = `latex-inline-${latexBlocks.length}`;
		latexBlocks.push({ id, formula, display: false });
		return `@@${id}@@`;
	});
	
	// Converter Markdown para HTML
	let html = marked.parse(processedText);
	
	// Substituir placeholders pelas fórmulas LaTeX
	latexBlocks.forEach(({ id, formula, display }) => {
		try {
			const latexHtml = katex.renderToString(formula, { 
				displayMode: display,
				throwOnError: false 
			});
			html = html.replace(`@@${id}@@`, latexHtml);
		} catch (e) {
			html = html.replace(`@@${id}@@`, display ? `$$${formula}$$` : `$${formula}$`);
		}
	});
	
	preview.innerHTML = html;
	
	// Renderizar fórmulas KaTeX adicionais
	renderMathInElement(preview);
}

// Função para inserir texto no cursor
function insertText(before, after) {
	const start = markdownInput.selectionStart;
	const end = markdownInput.selectionEnd;
	const text = markdownInput.value;
	const selectedText = text.substring(start, end);
	
	markdownInput.value = text.substring(0, start) + before + selectedText + after + text.substring(end);
	
	const newCursorPos = start + before.length + selectedText.length + after.length;
	markdownInput.setSelectionRange(newCursorPos, newCursorPos);
	markdownInput.focus();
	
	updatePreview();
}

// Event listeners
markdownInput.addEventListener('input', updatePreview);

markdownInput.addEventListener('keydown', function(e) {
	if (e.key === 'Tab') {
		e.preventDefault();
		const start = this.selectionStart;
		const end = this.selectionEnd;
		
		this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
		this.selectionStart = this.selectionEnd = start + 4;
		updatePreview();
	}
});

// Inicializar
updatePreview();

// Função para renderizar fórmulas matemáticas
function renderMathInElement(element) {
	if (!element || !katex) return;
	
	const mathElements = element.querySelectorAll('.katex, .math, .latex');
	
	// Tentar renderizar qualquer elemento que pareça conter LaTeX
	const textNodes = [];
	
	function findTextNodes(node) {
		if (node.nodeType === 3 && node.textContent.match(/[$\\(\\[]/)) {
			textNodes.push(node);
		} else if (node.nodeType === 1) {
			if (!['SCRIPT', 'STYLE', 'CODE', 'PRE'].includes(node.tagName)) {
				node.childNodes.forEach(findTextNodes);
			}
		}
	}
	
	findTextNodes(element);
}
