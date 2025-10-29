// Inicialização do editor
document.addEventListener('DOMContentLoaded', function() {
	// Configuração inicial do conteúdo do editor
	document.getElementById('editor').innerHTML = `
		<h2>Bem-vindo ao Editor Avançado</h2>
		<p>Este editor permite criar documentos ricos com fórmulas matemáticas LaTeX e trechos de código.</p>
		
		<div class="floating-block">
			<h3>Bloco Flutuante</h3>
			<p>Este é um exemplo de bloco flutuante que você pode usar para destacar conteúdo importante.</p>
		</div>
		
		<h3>Exemplo de Fórmula LaTeX</h3>
		<p>A famosa equação de Einstein: <span class="inline-latex">$E = mc^2$</span></p>
		
		<div class="latex-block">
			<p>Teorema de Pitágoras:</p>
			<p>$$a^2 + b^2 = c^2$$</p>
		</div>
		
		<h3>Exemplo de Código</h3>
		<p>Em JavaScript, usamos <span class="inline-code">console.log()</span> para imprimir no console.</p>
		
		<div class="code-block">
			<pre><code class="language-javascript">// Função para calcular o fatorial
function factorial(n) {
if (n <= 1) return 1;
return n * factorial(n - 1);
}</code></pre>
		</div>
	`;
	
	// Atualiza a visualização inicial
	updatePreview();
	
	// Adiciona evento para atualizar a visualização conforme o usuário digita
	document.getElementById('editor').addEventListener('input', updatePreview);
});

// Função para atualizar a visualização
function updatePreview() {
	const editorContent = document.getElementById('editor').innerHTML;
	let previewContent = editorContent;
	
	// Processar fórmulas LaTeX inline
	previewContent = previewContent.replace(/\$(.*?)\$/g, function(match, formula) {
		try {
			return katex.renderToString(formula, { throwOnError: false });
		} catch (e) {
			return match;
		}
	});
	
	// Processar fórmulas LaTeX em bloco
	previewContent = previewContent.replace(/\$\$(.*?)\$\$/g, function(match, formula) {
		try {
			return katex.renderToString(formula, { displayMode: true, throwOnError: false });
		} catch (e) {
			return match;
		}
	});
	
	// Processar código inline
	previewContent = previewContent.replace(/`(.*?)`/g, '<code class="inline-code">$1</code>');
	
	// Processar blocos de código
	previewContent = previewContent.replace(/<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g, function(match, lang, code) {
		// Usar Prism para destacar a sintaxe
		const highlighted = Prism.highlight(code, Prism.languages[lang], lang);
		return `<pre><code class="language-${lang}">${highlighted}</code></pre>`;
	});
	
	document.getElementById('preview').innerHTML = previewContent;
	
	// Renderizar fórmulas KaTeX na visualização
	renderMathInElement(document.getElementById('preview'), {
		delimiters: [
			{left: "$$", right: "$$", display: true},
			{left: "$", right: "$", display: false}
		],
		throwOnError: false
	});
}

// Função para inserir um bloco LaTeX
function insertLatexBlock() {
	const latexBlock = `
		<div class="latex-block">
			<p>Insira sua fórmula LaTeX aqui:</p>
			<p>$$\\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\cdots = 1$$</p>
		</div>
	`;
	insertAtCursor(latexBlock);
	updatePreview();
}

// Função para inserir um bloco de código
function insertCodeBlock() {
	const codeBlock = `
		<div class="code-block">
			<pre><code class="language-javascript">// Insira seu código aqui
function exemplo() {
console.log("Olá, mundo!");
}</code></pre>
		</div>
	`;
	insertAtCursor(codeBlock);
	updatePreview();
}

// Função para inserir um bloco flutuante
function insertFloatingBlock() {
	const floatingBlock = `
		<div class="floating-block">
			<h3>Título do Bloco</h3>
			<p>Insira seu conteúdo importante aqui. Este bloco será destacado visualmente.</p>
		</div>
	`;
	insertAtCursor(floatingBlock);
	updatePreview();
}

// Função auxiliar para inserir conteúdo na posição do cursor
function insertAtCursor(html) {
	const editor = document.getElementById('editor');
	const selection = window.getSelection();
	
	if (selection.rangeCount > 0) {
		const range = selection.getRangeAt(0);
		range.deleteContents();
		
		const div = document.createElement('div');
		div.innerHTML = html;
		const fragment = document.createDocumentFragment();
		let node;
		while ((node = div.firstChild)) {
			fragment.appendChild(node);
		}
		
		range.insertNode(fragment);
		
		// Mover o cursor para depois do conteúdo inserido
		range.setStartAfter(fragment.lastChild);
		range.setEndAfter(fragment.lastChild);
		selection.removeAllRanges();
		selection.addRange(range);
	} else {
		// Se não há seleção, apenas adiciona ao final
		editor.innerHTML += html;
	}
	
	// Foca no editor novamente
	editor.focus();
}

// Função para alternar entre editor e visualização
function togglePreview() {
	const editorPanel = document.querySelector('.editor-panel:first-child');
	const previewPanel = document.querySelector('.editor-panel:last-child');
	
	if (editorPanel.style.display === 'none') {
		editorPanel.style.display = 'flex';
		previewPanel.style.gridColumn = '2';
	} else {
		editorPanel.style.display = 'none';
		previewPanel.style.gridColumn = '1 / span 2';
	}
}

// Função para renderizar fórmulas matemáticas em um elemento
function renderMathInElement(element, options) {
	if (!element || !katex) {
		return;
	}
	
	const delimiters = options && options.delimiters || [
		{left: "$$", right: "$$", display: true},
		{left: "$", right: "$", display: false}
	];
	
	const found = [];
	
	function searchForMath(node) {
		if (node.nodeType === 3) { // Text node
			const text = node.textContent;
			let lastIndex = 0;
			
			for (const delimiter of delimiters) {
				const leftLength = delimiter.left.length;
				const rightLength = delimiter.right.length;
				let index = 0;
				
				while (index < text.length) {
					const leftIndex = text.indexOf(delimiter.left, index);
					if (leftIndex === -1) break;
					
					index = leftIndex + leftLength;
					const rightIndex = text.indexOf(delimiter.right, index);
					if (rightIndex === -1) break;
					
					const math = text.substring(leftIndex + leftLength, rightIndex);
					found.push({
						start: leftIndex,
						end: rightIndex + rightLength,
						math: math,
						display: delimiter.display
					});
					
					index = rightIndex + rightLength;
				}
			}
		} else if (node.nodeType === 1) { // Element node
			if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE' || node.tagName === 'CODE') {
				return;
			}
			
			for (let i = 0; i < node.childNodes.length; i++) {
				searchForMath(node.childNodes[i]);
			}
		}
	}
	
	searchForMath(element);
	
	for (const math of found) {
		const span = document.createElement('span');
		
		try {
			katex.render(math.math, span, {
				displayMode: math.display,
				throwOnError: false
			});
		} catch (e) {
			console.error(e);
			continue;
		}
		
		// Substituir o texto pela fórmula renderizada
		const textNode = element.childNodes[0]; // Simplificação
		if (textNode && textNode.nodeType === 3) {
			const before = textNode.textContent.substring(0, math.start);
			const after = textNode.textContent.substring(math.end);
			
			const parent = textNode.parentNode;
			parent.insertBefore(document.createTextNode(before), textNode);
			parent.insertBefore(span, textNode);
			parent.insertBefore(document.createTextNode(after), textNode);
			parent.removeChild(textNode);
		}
	}
}
