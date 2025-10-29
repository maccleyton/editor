/* ====== Utilidades / Estado ====== */
function $(s){ return document.querySelector(s); }
var editor = $('#editor'), pages = $('#pages'), autoRender = $('#autoRender'), themeBtn = $('#themeBtn');
var STORAGE_KEY = 'cosmos-md-doc-v2'; var THEME_KEY = 'cosmos-md-theme-v2';
function debounce(fn, w){ var t; w=w||300; return function(){ var a=arguments; clearTimeout(t); t=setTimeout(function(){ fn.apply(null,a); }, w); }; }
function setCaretInfo(){ var val=editor.value, pos=editor.selectionStart||0, before=val.slice(0,pos), lines=before.split('\n'); $('#cursorInfo').textContent='Lin '+lines.length+', Col '+(lines[lines.length-1].length+1); }
function setCountInfo(){ $('#countInfo').textContent = editor.value.length + ' caracteres'; }
function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function escapeHtmlAttr(s){ return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }
function safeUrl(u, allowData){ try{ var s=String(u).trim(); if(allowData && s.indexOf('data:')===0) return s; if(/^https?:\/\//i.test(s) || /^mailto:/i.test(s)) return s; }catch(e){} return '#'; }

/* ====== Parser Markdown (com melhorias) ====== */
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

  // Tabelas com alinhamento
  md = md.replace(/(^\|.+\|\s*\n(?:^\|[-:| ]+\|\s*\n)(?:^\|.*\|\s*\n?)+)/gmi, function(block){
    var rows = block.trim().split('\n').map(function(r){ return r.trim(); });
    var header=rows[0], alignRow=rows[1], body=rows.slice(2);
    var aligns = splitRow(alignRow).map(function(a){
      a=a.trim(); if(/^:-+:$/.test(a)) return 'center'; if(/^:-+$/.test(a)) return 'left'; if(/^-+:$/.test(a)) return 'right'; return '';
    });
    var html = '<table><thead><tr>';
    splitRow(header).forEach(function(c,i){ html += '<th style="text-align:'+(aligns[i]||'left')+'">'+inline(c)+'</th>'; });
    html += '</tr></thead><tbody>';
    body.forEach(function(r){ if(!r) return; var cells=splitRow(r); html+='<tr>'; cells.forEach(function(c,i){ html+='<td style="text-align:'+(aligns[i]||'left')+'">'+inline(c)+'</td>'; }); html+='</tr>'; });
    html += '</tbody></table>\n';
    return html;
    function splitRow(r){ return r.replace(/^\|/,'').replace(/\|$/,'').split('|').map(function(c){ return c.trim(); }); }
  });

  // Blocos por linha
  var lines = md.split('\n'); var out=[], i=0;

  function flushPara(buf){ if(!buf.length) return; var text=buf.join(' ').trim(); if(text) out.push('<p>'+inline(text)+'</p>'); buf.length=0; }
  function parseList(start){
    var isOL=/^\d+\.\s/.test(lines[start]); var html=isOL?'<ol>':'<ul>'; var j=start;
    while(j<lines.length){
      var l=lines[j];
      if(isOL ? /^\d+\.\s+/.test(l) : /^[-+*]\s+/.test(l)){
        var item = l.replace(isOL?/^\d+\.\s+/:/^[-+*]\s+/, '');
        var m=item.match(/^\[([ xX])\]\s+(.*)$/);
        if(m){ var checked=(m[1].toLowerCase()==='x'), label=m[2]; html+='<li class="task"><input type="checkbox" '+(checked?'checked':'')+' disabled/>'+inline(label)+'</li>'; }
        else{ html+='<li>'+inline(item)+'</li>'; }
        j++;
      }else break;
    }
    html+=isOL?'</ol>':'</ul>'; return { html:html, next:j };
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

  html = html.replace(/\u0000FENCE_(\d+)\u0000/g, function(m,idx){
    var f=fences[Number(idx)]; var codeEsc=escapeHtml(f.code); var cls=f.lang ? 'language-'+escapeHtmlAttr(f.lang) : ''; 
    var extra=attrStr(f.attrs); return '<pre'+extra+'><code class="'+cls+'">'+codeEsc+'</code></pre>';
  });

  html = sanitizeAllowed(html); 
  html = html.replace(/<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g, function(match, lang, code) {
  const highlighted = Prism.highlight(code, Prism.languages[lang] || Prism.languages.javascript, lang);
  return `<pre><code class="language-${lang}">${highlighted}</code></pre>`;
});

  
  return html;

  function parseAttrs(raw){
    var a={'class':''}; if(!raw) return a;
    raw.trim().split(/\s+/).forEach(function(p){ if(p.indexOf('#')===0) a.id=p.slice(1); else if(p.indexOf('.')===0) a['class']=(a['class']?a['class']+' ':'')+p.slice(1); });
    return a;
  }
  function attrStr(attrs){
    var s=''; if(attrs && attrs.id) s+=' id="'+escapeHtmlAttr(attrs.id)+'"';
    if(attrs && attrs['class']) s+=' class="'+escapeHtmlAttr(attrs['class'])+'"'; return s;
  }
  function inline(t){
    t = String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, function(m,alt,src){ var s=safeUrl(src,true); return '<img alt="'+escapeHtmlAttr(alt)+'" src="'+escapeHtmlAttr(s)+'" />'; });
    t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(m,txt,href){ var h=safeUrl(href,false); return '<a href="'+escapeHtmlAttr(h)+'" target="_blank" rel="noopener noreferrer">'+escapeHtml(txt)+'</a>'; });
    t = t.replace(/\*\*\*([^\*]+)\*\*\*/g, '<strong><em>$1</em></strong>').replace(/___([^_]+)___/g, '<strong><em>$1</em></strong>');
    t = t.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>').replace(/__([^_]+)__/g, '<strong>$1</strong>');
    t = t.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1<em>$2</em>').replace(/(^|[^_])_([^_]+)_(?!_)/g, '$1<em>$2</em>');
    t = t.replace(/~~([^~]+)~~/g, '<s>$1</s>');
    t = t.replace(/`([^`]+)`/g, function(m,code){ return '<code>'+escapeHtml(code)+'</code>'; });
    t = t.replace(/ {2,}\n/g, '<br/>\n'); return t;
  }
  function inlineBlocks(s){ return s.split(/\n{2,}/).map(function(p){ return '<p>'+inline(p)+'</p>'; }).join('\n'); }
  function sanitizeAllowed(html){
    var allowed=/^(p|h[1-6]|em|strong|s|blockquote|ul|ol|li|pre|code|a|img|hr|br|span|table|thead|tbody|tr|th|td|div)$/i;
    return html.replace(/<\s*\/?\s*([a-z0-9\-]+)(?=\s|>|\/)/gi, function(m,tag){ return allowed.test(tag)? m : m.replace('<','&lt;'); });
  }
}

/* ====== Render + Paginação A4 (sem template strings) ====== */
var render = debounce(function(){
  try{
    localStorage.setItem(STORAGE_KEY, editor.value);
    var html = mdToHtml(editor.value||''); paginateToA4(html);
    if (autoRender.checked && window.katex) {
	  renderMathInElement(pages);
	}
    setCountInfo();
  }catch(e){ console.error('Erro no render:', e); }
}, 300);

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
function createPage(){ var wrap=document.createElement('div'); wrap.className='page';
  var inner=document.createElement('article'); inner.className='page-inner content'; wrap.appendChild(inner); return {wrap:wrap, inner:inner}; }

/* ====== Inserções / Atalhos ====== */
function wrapSelection(prefix, suffix, placeholder){
  suffix = (typeof suffix==='string')? suffix : prefix; placeholder = placeholder||'';
  var el=editor, start=el.selectionStart, end=el.selectionEnd;
  var sel=el.value.slice(start,end), content=sel||placeholder;
  var before=el.value.slice(0,start), after=el.value.slice(end);
  var pre=(typeof prefix==='string')? prefix : '', suf=(typeof suffix==='string')? suffix : '';
  el.value = before + pre + content + suf + after;
  var head=(before+pre+content).length; el.focus(); el.setSelectionRange(head, head); render();
}
//  ``` bloco seguro (sem template string)
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
function insertLine(prefix, placeholder){
  placeholder=placeholder||''; var el=editor, start=el.selectionStart;
  var lineStart=el.value.lastIndexOf('\n', start-1)+1;
  var before=el.value.slice(0,lineStart), after=el.value.slice(lineStart);
  el.value = before + prefix + placeholder + after;
  el.focus(); el.setSelectionRange(lineStart + prefix.length, lineStart + prefix.length); render();
}

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
      case 'table': wrapSelection('\n| Coluna A | Coluna B | Coluna C |\n|:---|:---:|---:|\n| A | B | C |\n| A2 | B2 | C2 |\n','\n'); break;
    }
  });
});

editor.addEventListener('keydown', function(e){
  if(e.ctrlKey && e.key.toLowerCase()==='b'){ e.preventDefault(); wrapSelection('**','**','texto'); }
  else if(e.ctrlKey && e.key.toLowerCase()==='i'){ e.preventDefault(); wrapSelection('*','*','texto'); }
  else if(e.ctrlKey && (e.key==='`')){ e.preventDefault(); wrapSelection('`','`','codigo'); }
});

/* Arrastar imagem -> data:URL */
editor.addEventListener('dragover', function(e){ e.preventDefault(); });
editor.addEventListener('drop', function(e){
  e.preventDefault(); var files=Array.prototype.slice.call(e.dataTransfer.files||[]); var img=files.find(function(f){ return /^image\//.test(f.type); });
  if(!img) return;
  var fr=new FileReader();
  fr.onload=function(){
    var dataUrl=fr.result; var name=(img.name||'imagem').replace(/\.[^.]+$/,'');
    var start=editor.selectionStart, end=editor.selectionEnd, before=editor.value.slice(0,start), after=editor.value.slice(end);
    editor.value = before + '!'+name+'' + after;
    var caret=(before + '! '+name+'').length; editor.setSelectionRange(caret, caret); editor.focus(); render();
  };
  fr.readAsDataURL(img);
});

/* ====== Exportações (sem crases) ====== */
function escapeForHtmlInsideScript(s){
  // evita fechar <script> no exportado
  return String(s).replace(/<\/script>/gi,'<\\/script>');
}
$('#exportPDF').addEventListener('click', function(){ window.print(); });

$('#exportHTML').addEventListener('click', function(){
  var css = document.querySelector('style') ? document.querySelector('style').textContent : '';
  var theme = document.body.className || '';
  var mjCfg = JSON.stringify(window.MathJax || {});
  var pagesHtml = pages.innerHTML || '';

  // Monta via concatenação (sem template strings)
  var parts = [];
  parts.push('<!doctype html>\n');
  parts.push('<html lang="pt-br">\n<head>\n<meta charset="utf-8"/>\n<meta name="viewport" content="width=device-width, initial-scale=1"/>\n');
  parts.push('<title>Export - Cosmos MD</title>\n');
  parts.push('<style>'+ css +'</style>\n');
  parts.push('<script>\n');
  parts.push('window.MathJax = ' + escapeForHtmlInsideScript(mjCfg) + ';\n');
  parts.push('</'+'script>\n'); /* fecha com split para não confundir parsers */
  parts.push('https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js</'+'script>\n');
  parts.push('</head>\n<body class="' + theme + '">\n');
  parts.push('<div class="a4-surface"><div class="pages">\n');
  parts.push(escapeForHtmlInsideScript(pagesHtml) + '\n');
  parts.push('</div></div>\n');
  parts.push('<script>\n');
  parts.push('document.addEventListener("DOMContentLoaded", function(){ if(window.MathJax && MathJax.typesetPromise){ MathJax.typesetPromise(); } });\n');
  parts.push('</'+'script>\n');
  parts.push('</body>\n</html>');

  var html = parts.join('');
  var blob = new Blob([html], {type:'text/html;charset=utf-8'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'cosmos-export.html';
  a.click();
  URL.revokeObjectURL(a.href);
});

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
  render(); setCaretInfo(); setCountInfo();
})();
themeBtn.addEventListener('click', function(){
  var isLight=document.body.classList.contains('light'); document.body.classList.toggle('light', !isLight);
  localStorage.setItem(THEME_KEY, isLight ? 'dark':'light'); themeBtn.textContent = isLight ? '☀️' : '🌑'; render();
});

/* Eventos editor */
editor.addEventListener('input', function(){ render(); setCaretInfo(); });
editor.addEventListener('click', setCaretInfo);
editor.addEventListener('keyup', setCaretInfo);

/* ====== Modal LaTeX ====== */
var latexModal=$('#latexModal'), latexBtn=$('#latexBtn'), latexInput=$('#latexInput'), latexInsert=$('#latexInsert'), latexCancel=$('#latexCancel'), latexPreview=$('#latexPreview'), latexPreviewToggle=$('#latexPreviewToggle');
latexBtn.addEventListener('click', function(){
  var sel=editor.value.slice(editor.selectionStart, editor.selectionEnd);
  var ex=extractLatex(sel);
  latexInput.value=ex.tex||'';
  Array.prototype.forEach.call(document.querySelectorAll('input[name="latexKind"]'), function(r){ r.checked=(r.value===ex.kind); });
  latexModal.classList.add('open'); updateLatexPreview();
});
latexInsert.addEventListener('click', function(){
  var kind=document.querySelector('input[name="latexKind"]:checked').value;
  var tex=(latexInput.value||'x^2').trim();
  var wrapped = (kind==='inline') ? ('$'+tex+'$') : ('$$\n'+tex+'\n$$');
  var start=editor.selectionStart, end=editor.selectionEnd, before=editor.value.slice(0,start), after=editor.value.slice(end);
  editor.value=before+wrapped+after; var caret=(before+wrapped).length; editor.setSelectionRange(caret, caret); editor.focus();
  latexModal.classList.remove('open'); render();
});
latexCancel.addEventListener('click', function(){ latexModal.classList.remove('open'); });
latexPreviewToggle.addEventListener('change', updateLatexPreview);
latexInput.addEventListener('input', debounce(updateLatexPreview, 200));
function updateLatexPreview(){
  latexPreview.innerHTML=''; if(!latexPreviewToggle.checked) return;
  var kind=document.querySelector('input[name="latexKind"]:checked').value; var tex=(latexInput.value||'').trim();
  if(!tex){ latexPreview.textContent='—'; return; }
  var container=document.createElement(kind==='inline'?'span':'div');
  container.textContent = (kind==='inline') ? '\\('+tex+'\\)' : '\\['+tex+'\\]';
  latexPreview.appendChild(container);
  if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([latexPreview]);
}
function extractLatex(sel){
  var block=sel.match(/^\s*\${2}([\s\S]*)\${2}\s*$/); if(block) return {tex:block[1].trim(), kind:'block'};
  var inline=sel.match(/^\s*\$([^$]+)\$\s*$/); if(inline) return {tex:inline[1].trim(), kind:'inline'};
  return {tex:'', kind:'inline'};
}

// Renderizar fórmulas KaTeX na visualização
renderMathInElement(document.getElementById('preview'), {
	delimiters: [
		{left: "$$", right: "$$", display: true},
		{left: "$", right: "$", display: false}
	],
	throwOnError: false
});
