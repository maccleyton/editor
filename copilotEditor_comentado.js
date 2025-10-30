/* ====== Utilidades / Estado ====== */
// Função utilitária para selecionar elementos do DOM
function $(s){ return document.querySelector(s); }
var editor = $('#editor'), pages = $('#pages'), autoRender = $('#autoRender'), themeBtn = $('#themeBtn');
var STORAGE_KEY = 'cosmos-md-doc-v2'; var THEME_KEY = 'cosmos-md-theme-v2';
// Função debounce para limitar a frequência de execução
function debounce(fn, w){ var t; w=w||300; return function(){ var a=arguments; clearTimeout(t); t=setTimeout(function(){ fn.apply(null,a); }, w); }; }
// Atualiza a posição do cursor (linha e coluna)
function setCaretInfo(){ var val=editor.value, pos=editor.selectionStart||0, before=val.slice(0,pos), lines=before.split('\n'); $('#cursorInfo').textContent='Lin '+lines.length+', Col '+(lines[lines.length-1].length+1); }
// Atualiza o contador de caracteres
function setCountInfo(){ $('#countInfo').textContent = editor.value.length + ' caracteres'; }
// Escapa caracteres HTML especiais
function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
// Escapa atributos HTML
function escapeHtmlAttr(s){ return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }
// Valida URLs seguras para links e imagens
function safeUrl(u, allowData){ try{ var s=String(u).trim(); if(allowData && s.indexOf('data:')===0) return s; if(/^https?:\/\//i.test(s) || /^mailto:/i.test(s)) return s; }catch(e){} return '#'; }

/* ====== Parser Markdown (com melhorias) ====== */
// Converte Markdown para HTML com suporte a LaTeX, tabelas e blocos
function mdToHtml(md){
  md = String(md).replace(/\r\n?/g,'\n');

  // Fences ```lang {#id .cls}
  var fences=[]; 
  md = md.replace(/```([a-z0-9_-]+)?(?:\s+\{([^}]+)\})?\n([\s\S]*?)```/gi, function(m,lang,attrs,code){
    var idx=fences.length; fences.push({ lang:(lang||'').trim(), attrs:parseAttrs(attrs||''), code:code }); 
    return '\u0000FENCE_'+idx+'\u0000';
  });

  // Admonitions ::: type {#id .class}
  md = md.replace(/^\s*:::\s*([a-z]+)(?:\s+\{([^}]+)\})?\s*\n([\s\S]*?)^\s*:::\s*$/gmi, function(m,type,attrs,inner){
    var a=parseAttrs(attrs||'');
    return '<div'+attrStr({ 'class':'admonition '+type+' '+(a['class']||''), id:a.id||'' })+'><div class="ad-title">'+type.toUpperCase()+'</div>\n'+inlineBlocks(inner.trim())+'\n</div>';
  });

  // Tabelas com alinhamento - MELHORADA
  md = md.replace(/(^\|.+\|\s*\n(?:^\|[-:| ]+\|\s*\n)(?:^\|.*\|\s*\n?)+)/gmi, function(block){
    var rows = block.trim().split('\n').map(function(r){ return r.trim(); });
    var header=rows[0], alignRow=rows[1], body=rows.slice(2);
    var aligns = splitRow(alignRow).map(function(a){
      a=a.trim(); if(/^:-+:$/.test(a)) return 'center'; if(/^:-+$/.test(a)) return 'left'; if(/^-+:$/.test(a)) return 'right'; return '';
    });
    var html = '<table class="markdown-table"><thead><tr>';
    splitRow(header).forEach(function(c,i){ html += '<th style="text-align:'+(aligns[i]||'left')+'">'+inline(c)+'</th>'; });
    html += '</tr></thead><tbody>';
    body.forEach(function(r){ if(!r) return; var cells=splitRow(r); html+='<tr>'; cells.forEach(function(c,i){ html+='<td style="text-align:'+(aligns[i]||'left')+'">'+inline(c)+'</td>'; }); html+='</tr>'; });
    html += '</tbody></table>\n';
    return html;
    function splitRow(r){ return r.replace(/^\|/,'').replace(/\|$/,'').split('|').map(function(c){ return c.trim(); }); }
  });

  // Processar LaTeX inline e em bloco ANTES de outros processamentos
  var latexBlocks = [];
  md = md.replace(/\$\$(.*?)\$\$/g, function(match, formula) {
    var id = 'latex-block-' + latexBlocks.length;
    latexBlocks.push({ id: id, formula: formula, display: true });
    return '@@' + id + '@@';
  });
  
  md = md.replace(/\$(.*?)\$/g, function(match, formula) {
    var id = 'latex-inline-' + latexBlocks.length;
    latexBlocks.push({ id: id, formula: formula, display: false });
    return '@@' + id + '@@';
  });

  // Blocos por linha
  var lines = md.split('\n'); var out=[], i=0;

  function flushPara(buf){ if(!buf.length) return; var text=buf.join(' ').trim(); if(text) out.push('<p>'+inline(text)+'</p>'); buf.length=0; }
  function parseList(start) {
    let html = '';
    let stack = []; // para controlar níveis de indentação
    let j = start;
  
    while (j < lines.length) {
      let line = lines[j];
      let match = line.match(/^(\s*)([-+*]|\d+\.)\s+(.*)/);
      if (!match) break;
  
      let indent = match[1].length;
      let type = /^\d+\./.test(match[2]) ? 'ol' : 'ul';
      let content = inline(match[3]);
  
      // Verifica se precisa abrir novo nível
      while (stack.length && stack[stack.length - 1].indent > indent) {
        html += `</li></${stack.pop().type}>`;
      }
  
      if (!stack.length || stack[stack.length - 1].indent < indent) {
        html += `<${type}><li>`;
        stack.push({ indent, type });
      } else {
        html += `</li><li>`;
      }
  
      html += content;
      j++;
    }
  
    // Fecha todos os níveis abertos
    while (stack.length) {
      html += `</li></${stack.pop().type}>`;
    }
  
    return { html, next: j };
  }
  
  while(i<lines.length){
    var l = lines[i];
    if(/^\s*$/.test(l)){ out.push(''); i++; continue; }

    if(/^#{1,6}\s+/.test(l)){
      var level=(l.match(/^#{1,6}/)[0]||'#').length;
      var text=l.replace(/^#{1,6}\s+/, '');
      var attrs={}; var mm=text.match(/\s+\{([^}]+)\}\s*$/);
      if(mm){ attrs=parseAttrs(mm[1]); text=text.replace(/\s+\{([^}]+)\}\s*$/, ''); }
      out.push('<h'+level+attrStr(attrs)+'>'+inline(text)+'</h'+level+'>'); i++; continue;
    }

    if(/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(l)){ out.push('<hr />'); i++; continue; }

    if(/^>\s?/.test(l)){
      var q=[]; while(i<lines.length && /^>\s?/.test(lines[i])){ q.push(lines[i].replace(/^>\s?/, '')); i++; }
      out.push('<blockquote>'+ q.map(function(s){ return inline(s); }).join('<br/>') +'</blockquote>'); continue;
    }

    if(/^(-|\+|\*)\s+/.test(l) || /^\d+\.\s+/.test(l)){ var lst=parseList(i); out.push(lst.html); i=lst.next; continue; }

    var buf=[l]; i++;
    while(i<lines.length && !/^\s*$/.test(lines[i]) &&
      !/^#{1,6}\s+/.test(lines[i]) && !/^>\s?/.test(lines[i]) &&
      !/^(-|\+|\*)\s+/.test(lines[i]) && !/^\d+\.\s+/.test(lines[i]) &&
      !/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(lines[i])){ buf.push(lines[i]); i++; }
    flushPara(buf);
  }

  var html = out.join('\n');

  // Restaurar e processar blocos de código
  html = html.replace(/\u0000FENCE_(\d+)\u0000/g, function(m,idx){
// Escapa caracteres HTML especiais
    var f=fences[Number(idx)]; var codeEsc=escapeHtml(f.code); var cls=f.lang ? 'language-'+escapeHtmlAttr(f.lang) : ''; 
    var extra=attrStr(f.attrs); 
    
    // Usar Prism para highlight se disponível
    if (window.Prism && f.lang && Prism.languages[f.lang]) {
      try {
        codeEsc = Prism.highlight(f.code, Prism.languages[f.lang], f.lang);
      } catch(e) {
        console.warn('Erro no highlight Prism:', e);
      }
    }
    
    return '<pre'+extra+'><code class="'+cls+'">'+codeEsc+'</code></pre>';
  });

  // Restaurar e processar LaTeX
  latexBlocks.forEach(function(item){
    var latexHtml;
    try {
      if (window.katex) {
        latexHtml = katex.renderToString(item.formula, { 
          displayMode: item.display, 
          throwOnError: false 
        });
      } else {
        latexHtml = item.display ? '$$' + item.formula + '$$' : '$' + item.formula + '$';
      }
    } catch(e) {
      latexHtml = item.display ? '$$' + item.formula + '$$' : '$' + item.formula + '$';
    }
    html = html.replace('@@' + item.id + '@@', latexHtml);
  });

  html = sanitizeAllowed(html); 
  
  return html;

  function parseAttrs(raw){
    var a={'class':''}; if(!raw) return a;
    raw.trim().split(/\s+/).forEach(function(p){ if(p.indexOf('#')===0) a.id=p.slice(1); else if(p.indexOf('.')===0) a['class']=(a['class']?a['class']+' ':'')+p.slice(1); });
    return a;
  }
  function attrStr(attrs){
// Escapa atributos HTML
    var s=''; if(attrs && attrs.id) s+=' id="'+escapeHtmlAttr(attrs.id)+'"';
// Escapa atributos HTML
    if(attrs && attrs['class']) s+=' class="'+escapeHtmlAttr(attrs['class'])+'"'; return s;
  }
  function inline(t){
    t = String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
// Escapa atributos HTML
    t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, function(m,alt,src){ var s=safeUrl(src,true); return '<img alt="'+escapeHtmlAttr(alt)+'" src="'+escapeHtmlAttr(s)+'" />'; });
// Escapa caracteres HTML especiais
    t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(m,txt,href){ var h=safeUrl(href,false); return '<a href="'+escapeHtmlAttr(h)+'" target="_blank" rel="noopener noreferrer">'+escapeHtml(txt)+'</a>'; });
    t = t.replace(/\*\*\*([^\*]+)\*\*\*/g, '<strong><em>$1</em></strong>').replace(/___([^_]+)___/g, '<strong><em>$1</em></strong>');
    t = t.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>').replace(/__([^_]+)__/g, '<strong>$1</strong>');
    t = t.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1<em>$2</em>').replace(/(^|[^_])_([^_]+)_(?!_)/g, '$1<em>$2</em>');
    t = t.replace(/~~([^~]+)~~/g, '<s>$1</s>');
// Escapa caracteres HTML especiais
    t = t.replace(/`([^`]+)`/g, function(m,code){ return '<code class="inline-code">'+escapeHtml(code)+'</code>'; });
    t = t.replace(/ {2,}\n/g, '<br/>\n'); return t;
  }
  function inlineBlocks(s){ return s.split(/\n{2,}/).map(function(p){ return '<p>'+inline(p)+'</p>'; }).join('\n'); }
  function sanitizeAllowed(html){
    var allowed=/^(p|h[1-6]|em|strong|s|blockquote|ul|ol|li|pre|code|a|img|hr|br|span|table|thead|tbody|tr|th|td|div)$/i;
    return html.replace(/<\s*\/?\s*([a-z0-9\-]+)(?=\s|>|\/)/gi, function(m,tag){ return allowed.test(tag)? m : m.replace('<','&lt;'); });
  }
}

/* ====== Render + Paginação A4 (sem template strings) ====== */
// Função debounce para limitar a frequência de execução
var render = debounce(function(){
  try{
    localStorage.setItem(STORAGE_KEY, editor.value);
    var html = mdToHtml(editor.value||''); paginateToA4(html);
    if (autoRender.checked && window.katex) {
      renderMathInElement(pages);
    }
// Atualiza o contador de caracteres
    setCountInfo();
  }catch(e){ console.error('Erro no render:', e); }
}, 300);

// Pagina o conteúdo HTML em blocos simulando folhas A4
function paginateToA4(html){
  pages.innerHTML='';
  var flow=document.createElement('div'); flow.className='content';
  flow.style.visibility='hidden'; flow.style.position='absolute'; flow.style.pointerEvents='none';
  flow.innerHTML=html; document.body.appendChild(flow);

  var current=createPage(); pages.appendChild(current.wrap);
  var LIMIT=function(){ return current.inner.clientHeight; };
  var willBreakBefore=function(node){ return /^(H1|H2)$/.test(node.nodeName); };

  while(flow.firstChild){
    var node=flow.firstChild;
    if(willBreakBefore(node) && current.inner.childNodes.length){ current=createPage(); pages.appendChild(current.wrap); }
    current.inner.appendChild(node);
    if(current.inner.scrollHeight>LIMIT()){
      current.inner.removeChild(node);
      current=createPage(); pages.appendChild(current.wrap);
      current.inner.appendChild(node);
    }
  }
  flow.remove();
}
// Cria uma nova página A4
function createPage(){ var wrap=document.createElement('div'); wrap.className='page';
  var inner=document.createElement('article'); inner.className='page-inner content'; wrap.appendChild(inner); return {wrap:wrap, inner:inner}; }

/* ====== Funções de Renderização Matemática (do segundo script) ====== */
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
  
  // Ordenar do final para o início para evitar problemas de índice
  found.sort((a, b) => b.start - a.start);
  
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
    
    // Encontrar o nó de texto correto e substituir
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let currentNode;
    while (currentNode = walker.nextNode()) {
      if (currentNode.textContent.includes(delimiters[0].left + math.math + delimiters[0].right) ||
          currentNode.textContent.includes(delimiters[1].left + math.math + delimiters[1].right)) {
        
        const fullText = currentNode.textContent;
        const before = fullText.substring(0, math.start);
        const after = fullText.substring(math.end);
        
        const parent = currentNode.parentNode;
        parent.insertBefore(document.createTextNode(before), currentNode);
        parent.insertBefore(span, currentNode);
        parent.insertBefore(document.createTextNode(after), currentNode);
        parent.removeChild(currentNode);
        break;
      }
    }
  }
}

/* ====== Inserções / Atalhos ====== */
// Envolve a seleção com prefixo e sufixo (ex: negrito, itálico)
function wrapSelection(prefix, suffix, placeholder){
  suffix = (typeof suffix==='string')? suffix : prefix; placeholder = placeholder||'';
  var el=editor, start=el.selectionStart, end=el.selectionEnd;
  var sel=el.value.slice(start,end), content=sel||placeholder;
  var before=el.value.slice(0,start), after=el.value.slice(end);
  var pre=(typeof prefix==='string')? prefix : '', suf=(typeof suffix==='string')? suffix : '';
  el.value = before + pre + content + suf + after;
  var head=(before+pre+content).length; el.focus(); el.setSelectionRange(head, head); render();
}

// Insere bloco de código com três crases
function insertFenceBlock(){
  var BT = '\x60\x60\x60'; // três crases sem usar crases no código
  var el=editor, start=el.selectionStart, end=el.selectionEnd, sel=el.value.slice(start,end);
  var body = sel ? sel.replace(/\n?$/, '\n') : '// código aqui\n';
  var block = BT + '\n' + body + BT + '\n';
  var before=el.value.slice(0,start), after=el.value.slice(end);
  el.value = before + block + after;
  var caretStart = before.length + BT.length + 1; var caretEnd = caretStart + body.length;
  el.focus(); el.setSelectionRange(caretStart, caretEnd); render();
}

// Insere prefixo no início da linha (ex: título, lista)
function insertLine(prefix, placeholder){
  placeholder=placeholder||''; var el=editor, start=el.selectionStart;
  var lineStart=el.value.lastIndexOf('\n', start-1)+1;
  var before=el.value.slice(0,lineStart), after=el.value.slice(lineStart);
  el.value = before + prefix + placeholder + after;
  el.focus(); el.setSelectionRange(lineStart + prefix.length, lineStart + prefix.length); render();
}

// Inserir bloco LaTeX
// Insere bloco LaTeX padrão
function insertLatexBlock() {
  var latexBlock = '$$\n\\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\cdots = 1\n$$';
  var start=editor.selectionStart, end=editor.selectionEnd, before=editor.value.slice(0,start), after=editor.value.slice(end);
  editor.value = before + latexBlock + after;
  var caret = before.length + latexBlock.length;
  editor.setSelectionRange(caret, caret);
  editor.focus();
  render();
}

// Inserir tabela
// Insere tabela Markdown com alinhamento
function insertTable() {
  var table = '\n| Coluna A | Coluna B | Coluna C |\n|:---|:---:|---:|\n| A | B | C |\n| A2 | B2 | C2 |\n';
  var start=editor.selectionStart, end=editor.selectionEnd, before=editor.value.slice(0,start), after=editor.value.slice(end);
  editor.value = before + table + after;
  var caret = before.length + table.length;
  editor.setSelectionRange(caret, caret);
  editor.focus();
  render();
}

// Referência aos elementos principais da interface
Array.prototype.forEach.call(document.querySelectorAll('button[data-action]'), function(btn){
  btn.addEventListener('click', function(){
    var a=btn.dataset.action;
    switch(a){
      case 'bold': wrapSelection('**','**','texto'); break;
      case 'italic': wrapSelection('*','*','texto'); break;
      case 'code': wrapSelection('`','`','codigo'); break;
      case 'h1': insertLine('# '); break;
      case 'h2': insertLine('## '); break;
      case 'h3': insertLine('### '); break;
      case 'ul': insertLine('- '); break;
      case 'ol': insertLine('1. '); break;
      case 'task': insertLine('- [ ] '); break;
      case 'quote': insertLine('> '); break;
      case 'hr': insertLine('\n---\n'); break;
      case 'link': wrapSelection('','','texto'); break;
      case 'image': wrapSelection('!','','alt)'); break;
      case 'fence': insertFenceBlock(); break;
      case 'table': insertTable(); break;
      case 'latex': insertLatexBlock(); break;
    }
  });
});

// Atalhos de teclado para negrito, itálico e código
editor.addEventListener('keydown', function(e){
  if(e.ctrlKey && e.key.toLowerCase()==='b'){ e.preventDefault(); wrapSelection('**','**','texto'); }
  else if(e.ctrlKey && e.key.toLowerCase()==='i'){ e.preventDefault(); wrapSelection('*','*','texto'); }
  else if(e.ctrlKey && (e.key==='`')){ e.preventDefault(); wrapSelection('`','`','codigo'); }
});

/* Arrastar imagem -> data:URL */
editor.addEventListener('dragover', function(e){ e.preventDefault(); });
// Permite arrastar imagem para o editor e insere como data:URL
editor.addEventListener('drop', function(e){
  e.preventDefault(); var files=Array.prototype.slice.call(e.dataTransfer.files||[]); var img=files.find(function(f){ return /^image\//.test(f.type); });
  if(!img) return;
  var fr=new FileReader();
  fr.onload=function(){
    var dataUrl=fr.result; var name=(img.name||'imagem').replace(/\.[^.]+$/,'');
    var start=editor.selectionStart, end=editor.selectionEnd, before=editor.value.slice(0,start), after=editor.value.slice(end);
    editor.value = before + '!['+name+'](' + dataUrl + ')';
    var caret=(before + '!['+name+'](').length; editor.setSelectionRange(caret, caret); editor.focus(); render();
  };
  fr.readAsDataURL(img);
});

/* ====== Exportações ====== */
function escapeForHtmlInsideScript(s){
  return String(s).replace(/<\/script>/gi,'<\\/script>');
}

// Exporta o conteúdo como PDF usando a impressão do navegador
$('#exportPDF').addEventListener('click', function(){ window.print(); });

// Exporta o conteúdo como HTML completo
$('#exportHTML').addEventListener('click', function(){
// Referência aos elementos principais da interface
  var css = document.querySelector('style') ? document.querySelector('style').textContent : '';
  var theme = document.body.className || '';
  var mjCfg = JSON.stringify(window.MathJax || {});
  var pagesHtml = pages.innerHTML || '';

  var parts = [];
  parts.push('<!doctype html>\n');
  parts.push('<html lang="pt-br">\n<head>\n<meta charset="utf-8"/>\n<meta name="viewport" content="width=device-width, initial-scale=1"/>\n');
  parts.push('<title>Export - Cosmos MD</title>\n');
  parts.push('<style>'+ css +'</style>\n');
  
  // Incluir KaTeX CSS se disponível
  if (window.katex) {
    parts.push('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">\n');
  }
  
  // Incluir Prism CSS se disponível
  parts.push('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css">\n');
  
  parts.push('</head>\n<body class="' + theme + '">\n');
  parts.push('<div class="a4-surface"><div class="pages">\n');
  parts.push(escapeForHtmlInsideScript(pagesHtml) + '\n');
  parts.push('</div></div>\n');
  
  // Incluir scripts necessários
  if (window.katex) {
    parts.push('<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>\n');
  }
  
  parts.push('<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>\n');
  parts.push('<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>\n');
  
  parts.push('<script>\n');
  parts.push('document.addEventListener("DOMContentLoaded", function(){ \n');
  parts.push('  if(window.katex) { \n');
// Referência aos elementos principais da interface
  parts.push('    var elements = document.querySelectorAll(".katex, .latex-block, .latex-inline"); \n');
  parts.push('    elements.forEach(function(el) { \n');
  parts.push('      try { katex.render(el.textContent, el, { displayMode: el.classList.contains("latex-block") }); } catch(e) {} \n');
  parts.push('    }); \n');
  parts.push('  } \n');
  parts.push('});\n');
  parts.push('</script>\n');
  parts.push('</body>\n</html>');

  var html = parts.join('');
  var blob = new Blob([html], {type:'text/html;charset=utf-8'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'cosmos-export.html';
  a.click();
  URL.revokeObjectURL(a.href);
});

// Exporta o conteúdo como arquivo Markdown (.md)
$('#downloadMD').addEventListener('click', function(){
  var md = editor.value; if(!/\n$/.test(md)) md+='\n';
  var blob = new Blob([md], {type:'text/markdown;charset=utf-8'});
  var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='documento.md'; a.click(); URL.revokeObjectURL(a.href);
});

/* Preferências / Tema */
(function(){
  var saved=localStorage.getItem(STORAGE_KEY); if(saved!=null) editor.value=saved;
  var theme=localStorage.getItem(THEME_KEY)||'light';
  document.body.className=theme; themeBtn.textContent = theme==='light' ? '🌑' : '☀️';
// Atualiza a posição do cursor (linha e coluna)
  render(); setCaretInfo(); setCountInfo();
})();

// Alterna entre tema claro e escuro
themeBtn.addEventListener('click', function(){
  var isLight=document.body.classList.contains('light'); document.body.classList.toggle('light', !isLight);
  localStorage.setItem(THEME_KEY, isLight ? 'dark':'light'); themeBtn.textContent = isLight ? '☀️' : '🌑'; render();
});

/* Eventos editor */
// Atualiza a posição do cursor (linha e coluna)
editor.addEventListener('input', function(){ render(); setCaretInfo(); });
// Atualiza a posição do cursor (linha e coluna)
editor.addEventListener('click', setCaretInfo);
// Atualiza a posição do cursor (linha e coluna)
editor.addEventListener('keyup', setCaretInfo);

/* ====== Modal LaTeX ====== */
var latexModal=$('#latexModal'), latexBtn=$('#latexBtn'), latexInput=$('#latexInput'), latexInsert=$('#latexInsert'), latexCancel=$('#latexCancel'), latexPreview=$('#latexPreview'), latexPreviewToggle=$('#latexPreviewToggle');
// Abre modal para edição de fórmulas LaTeX
latexBtn.addEventListener('click', function(){
  var sel=editor.value.slice(editor.selectionStart, editor.selectionEnd);
// Extrai fórmula LaTeX da seleção atual
  var ex=extractLatex(sel);
  latexInput.value=ex.tex||'';
// Referência aos elementos principais da interface
  Array.prototype.forEach.call(document.querySelectorAll('input[name="latexKind"]'), function(r){ r.checked=(r.value===ex.kind); });
// Atualiza a pré-visualização da fórmula LaTeX
  latexModal.classList.add('open'); updateLatexPreview();
});

// Insere fórmula LaTeX no editor
latexInsert.addEventListener('click', function(){
// Referência aos elementos principais da interface
  var kind=document.querySelector('input[name="latexKind"]:checked').value;
  var tex=(latexInput.value||'x^2').trim();
  var wrapped = (kind==='inline') ? ('$'+tex+'$') : ('$$\n'+tex+'\n$$');
  var start=editor.selectionStart, end=editor.selectionEnd, before=editor.value.slice(0,start), after=editor.value.slice(end);
  editor.value=before+wrapped+after; var caret=(before+wrapped).length; editor.setSelectionRange(caret, caret); editor.focus();
  latexModal.classList.remove('open'); render();
});

// Fecha o modal de LaTeX sem inserir
latexCancel.addEventListener('click', function(){ latexModal.classList.remove('open'); });
// Atualiza a pré-visualização da fórmula LaTeX
latexPreviewToggle.addEventListener('change', updateLatexPreview);
// Atualiza a pré-visualização da fórmula LaTeX
latexInput.addEventListener('input', debounce(updateLatexPreview, 200));

// Atualiza a pré-visualização da fórmula LaTeX
function updateLatexPreview(){
  latexPreview.innerHTML=''; if(!latexPreviewToggle.checked) return;
// Referência aos elementos principais da interface
  var kind=document.querySelector('input[name="latexKind"]:checked').value; var tex=(latexInput.value||'').trim();
  if(!tex){ latexPreview.textContent='—'; return; }
  var container=document.createElement(kind==='inline'?'span':'div');
  container.textContent = (kind==='inline') ? '\\('+tex+'\\)' : '\\['+tex+'\\]';
  latexPreview.appendChild(container);
  if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([latexPreview]);
}

// Extrai fórmula LaTeX da seleção atual
function extractLatex(sel){
  var block=sel.match(/^\s*\${2}([\s\S]*)\${2}\s*$/); if(block) return {tex:block[1].trim(), kind:'block'};
  var inline=sel.match(/^\s*\$([^$]+)\$\s*$/); if(inline) return {tex:inline[1].trim(), kind:'inline'};
  return {tex:'', kind:'inline'};
}

// Inicialização para garantir que LaTeX e código sejam renderizados
document.addEventListener('DOMContentLoaded', function() {
  // Garantir que a renderização inicial processe LaTeX e código
  if (window.katex || window.Prism) {
    render();
  }
});