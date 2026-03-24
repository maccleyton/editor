/* ═══════════════════════════════════════════════════
   NEXUS EDITOR v3 — FULL ENGINE
   ═══════════════════════════════════════════════════ */

// import app from './firebase.js'; // Ajuste o caminho conforme sua estrutura de pastas

// console.log("Firebase inicializado no Nexus Editor!", app.name);

// ══ FIREBASE CONFIG ══
const FIREBASE_CONFIG = {
  apiKey:            "SUA_API_KEY",
  authDomain:        "SEU_PROJECT.firebaseapp.com",
  projectId:         "SEU_PROJECT_ID",
  storageBucket:     "SEU_PROJECT.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId:             "SEU_APP_ID"
};

let db = null;
function initFirebase(){
  try{
    if(!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    db=firebase.firestore();
    setFbStatus('connected','Firebase: conectado');
  }catch(e){ setFbStatus('error','Firebase: sem config'); }
}
function setFbStatus(s,t){
  document.getElementById('fb-dot').className='fb-dot '+(s==='connected'?'connected':s==='error'?'error':'');
  document.getElementById('fb-status-text').textContent=t;
}

// ══ MARKED CONFIG ══
marked.setOptions({
  breaks:true, gfm:true,
  highlight:(code,lang)=>{
    if(lang&&hljs.getLanguage(lang)){try{return hljs.highlight(code,{language:lang}).value;}catch{}}
    return hljs.highlightAuto(code).value;
  }
});

// ══ ELEMENTS ══
const mdEditor = document.getElementById('md-editor');
const preview  = document.getElementById('preview-content');
const tocEl    = document.getElementById('toc-content');

// ══ TAB SYSTEM ══
let tabs = [{id:0,name:'Documento 1',content:''}];
let currentTabId = 0, nextTabId = 1;

function addNewTab(){
  const t={id:nextTabId,name:`Documento ${nextTabId+1}`,content:''};
  tabs.push(t);
  renderTabs();
  switchTab(nextTabId);
  nextTabId++;
}
function closeTab(tabId,e){
  e.stopPropagation();
  if(tabs.length===1){showToast('error','⚠','Mínimo de uma aba.');return;}
  const idx=tabs.findIndex(t=>t.id===tabId);
  if(idx!==-1){
    tabs.splice(idx,1);
    if(currentTabId===tabId) switchTab(tabs[0].id);
    else renderTabs();
  }
}
function switchTab(tabId){
  const cur=tabs.find(t=>t.id===currentTabId);
  if(cur) cur.content=mdEditor.value;
  currentTabId=tabId;
  const nxt=tabs.find(t=>t.id===tabId);
  if(nxt){
    mdEditor.value=nxt.content;
    document.getElementById('editor-fname').textContent=nxt.name+'.md';
    document.getElementById('sb-tab').textContent=nxt.name;
    scheduleRender(); updateStats(); updateTOC();
  }
  renderTabs();
}
function saveMarkdown(){
  openSaveFileModal();
}

function openSaveFileModal(){
  const cur=tabs.find(t=>t.id===currentTabId);
  const defaultName=cur?cur.name:'documento';
  // inject modal if not exists
  if(!document.getElementById('save-file-overlay')){
    const el=document.createElement('div');
    el.id='save-file-overlay';
    el.innerHTML=`
      <div id="save-file-box">
        <div class="modal-hdr">
          <div><div class="modal-eyebrow">Sistema de Arquivos · Módulo Forge</div><div class="modal-title">SALVAR DOCUMENTO</div></div>
          <button class="modal-close" onclick="closeSaveFileModal()">✕</button>
        </div>
        <div class="modal-body">
          <div class="field-group">
            <label class="field-label" for="sf-name">Nome do Arquivo <span class="req">*</span></label>
            <input type="text" id="sf-name" class="field-input" placeholder="Ex: axioma-relatividade" maxlength="120">
          </div>
          <div class="field-group">
            <label class="field-label" for="sf-format">Formato</label>
            <div class="select-wrap">
              <select id="sf-format" class="field-select">
                <option value="md">.md — Markdown</option>
                <option value="txt">.txt — Texto puro</option>
                <option value="html">.html — HTML (preview renderizado)</option>
              </select>
              <span class="select-arrow">▾</span>
            </div>
          </div>
          <div id="sf-location-info" class="sf-info">
            <span class="sf-info-icon">📁</span>
            <span id="sf-info-text">Clique em "Escolher Local" para selecionar onde salvar, ou salve diretamente na pasta de Downloads padrão.</span>
          </div>
        </div>
        <div class="modal-ftr">
          <button class="btn-cancel" onclick="closeSaveFileModal()">CANCELAR</button>
          <button class="hdr-btn" onclick="doSaveFileDownloads()" style="margin-right:4px" title="Salva direto em Downloads">⬇ DOWNLOADS</button>
          <button class="btn-confirm" onclick="doSaveFilePicker()"><span>💾</span><span>ESCOLHER LOCAL</span></button>
        </div>
      </div>`;
    // inject styles
    const st=document.createElement('style');
    st.textContent=`
      #save-file-overlay{position:fixed;inset:0;background:rgba(4,6,8,.88);z-index:5100;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);opacity:0;pointer-events:none;transition:opacity .2s;}
      #save-file-overlay.visible{opacity:1;pointer-events:all;}
      #save-file-box{width:480px;background:var(--bg-panel);border:1px solid var(--border-bright);box-shadow:0 0 40px rgba(0,212,255,.1);position:relative;transform:translateY(14px) scale(.98);transition:transform .22s cubic-bezier(.34,1.56,.64,1);}
      #save-file-overlay.visible #save-file-box{transform:translateY(0) scale(1);}
      #save-file-box::before{content:'';position:absolute;top:-1px;left:-1px;width:12px;height:12px;border-top:2px solid var(--cyan-base);border-left:2px solid var(--cyan-base);}
      #save-file-box::after{content:'';position:absolute;bottom:-1px;right:-1px;width:12px;height:12px;border-bottom:2px solid var(--cyan-base);border-right:2px solid var(--cyan-base);}
      .sf-info{display:flex;align-items:flex-start;gap:8px;background:var(--bg-elevated);border:1px solid var(--border-dim);border-radius:3px;padding:9px 12px;margin-top:2px;}
      .sf-info-icon{font-size:14px;flex-shrink:0;margin-top:1px;}
      #sf-info-text{font-family:var(--font-mono);font-size:10px;color:var(--text-secondary);line-height:1.5;letter-spacing:.3px;}
    `;
    document.head.appendChild(st);
    document.body.appendChild(el);
    el.addEventListener('click',e=>{ if(e.target===el) closeSaveFileModal(); });
  }
  document.getElementById('sf-name').value=defaultName;
  document.getElementById('sf-format').value='md';
  document.getElementById('sf-info-text').textContent='Clique em "Escolher Local" para selecionar onde salvar, ou salve direto em Downloads.';
  document.getElementById('save-file-overlay').classList.add('visible');
  setTimeout(()=>document.getElementById('sf-name').focus(),200);
}

function closeSaveFileModal(){
  const el=document.getElementById('save-file-overlay');
  if(el) el.classList.remove('visible');
}

function getSaveContent(format){
  if(format==='html'){
    return `<!DOCTYPE html>\n<html lang="pt-BR">\n<head><meta charset="UTF-8"><title>${document.getElementById('sf-name').value}</title>\n<style>body{font-family:Georgia,serif;max-width:800px;margin:40px auto;padding:0 20px;line-height:1.7;color:#1a1a1a;}</style>\n</head>\n<body>\n${document.getElementById('preview-content').innerHTML}\n</body>\n</html>`;
  }
  return document.getElementById('md-editor').value;
}

function getMime(format){
  if(format==='html') return 'text/html';
  if(format==='txt')  return 'text/plain';
  return 'text/markdown';
}

async function doSaveFilePicker(){
  const name=document.getElementById('sf-name').value.trim()||'documento';
  const fmt=document.getElementById('sf-format').value;
  const content=getSaveContent(fmt);
  // Update tab name
  const cur=tabs.find(t=>t.id===currentTabId);
  if(cur){ cur.name=name; renderTabs(); document.getElementById('editor-fname').textContent=name+'.'+fmt; document.getElementById('sb-tab').textContent=name; }

  if(window.showSaveFilePicker){
    const mimeMap={md:'text/markdown',txt:'text/plain',html:'text/html'};
    const extMap ={md:'.md',txt:'.txt',html:'.html'};
    try{
      const fh=await window.showSaveFilePicker({
        suggestedName:name+extMap[fmt],
        types:[{description:'Documento',accept:{[mimeMap[fmt]]:[extMap[fmt]]}}]
      });
      const ws=await fh.createWritable();
      await ws.write(content);
      await ws.close();
      closeSaveFileModal();
      showToast('success','💾',`Salvo: ${name}.${fmt}`);
    }catch(e){
      if(e.name!=='AbortError') showToast('error','✕','Erro ao salvar: '+e.message);
    }
  } else {
    // fallback — browser doesn't support File System Access API
    document.getElementById('sf-info-text').textContent='⚠ Este navegador não suporta seleção de pasta. Usando Downloads...';
    setTimeout(()=>doSaveFileDownloads(),800);
  }
}

function doSaveFileDownloads(){
  const name=document.getElementById('sf-name').value.trim()||'documento';
  const fmt=document.getElementById('sf-format').value;
  const content=getSaveContent(fmt);
  const cur=tabs.find(t=>t.id===currentTabId);
  if(cur){ cur.name=name; renderTabs(); document.getElementById('editor-fname').textContent=name+'.'+fmt; document.getElementById('sb-tab').textContent=name; }
  const blob=new Blob([content],{type:getMime(fmt)});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url; a.download=name+'.'+fmt;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
  closeSaveFileModal();
  showToast('success','⬇',`Downloads: ${name}.${fmt}`);
}
function loadMarkdownFile(){
  const inp=document.createElement('input');
  inp.type='file'; inp.accept='.md,.markdown,.txt';
  inp.onchange=e=>{
    const file=e.target.files[0]; if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{
      addNewTab();
      const cur=tabs.find(t=>t.id===currentTabId);
      if(cur){cur.name=file.name.replace(/\.(md|markdown|txt)$/,''); renderTabs();}
      mdEditor.value=ev.target.result;
      renderMarkdown();
      updateStats(); updateTOC();
      // render math and highlight after markdown is in DOM
      setTimeout(()=>{
        preview.querySelectorAll('pre code:not(.hljs)').forEach(b=>hljs.highlightElement(b));
        if(window.MathJax&&window.MathJax.typesetPromise){
          MathJax.typesetClear([preview]);
          MathJax.typesetPromise([preview]).then(()=>{ wrapLatexBlocks(); setMathDirty(false); }).catch(()=>{});
        }
      }, 150);
    };
    reader.readAsText(file);
  };
  inp.click();
}

// ══ RENDER ══
let renderTimer=null, mathDirty=false;

function scheduleRender(){
  clearTimeout(renderTimer);
  renderTimer=setTimeout(renderMarkdown,80);
  updateStats();
  setMathDirty(true);
}

function renderMarkdown(){
  const scrollPct=preview.scrollHeight>0?preview.scrollTop/preview.scrollHeight:0;
  let raw=mdEditor.value;
  // protect table pipes inside code spans
  const lines=raw.split('\n').map(line=>{
    let pipes=0, inCode=false;
    for(const ch of line){ if(ch==='`') inCode=!inCode; else if(ch==='|'&&!inCode) pipes++; }
    if(pipes>0){
      let res='', inBt=false;
      for(const ch of line){ if(ch==='`'){inBt=!inBt;res+=ch;} else if(ch==='|'&&inBt){res+='\\|';} else res+=ch; }
      return res;
    }
    return line;
  });
  let html=marked.parse(lines.join('\n'));
  preview.innerHTML=html;
  preview.querySelectorAll('pre code:not(.hljs)').forEach(b=>hljs.highlightElement(b));
  setTimeout(()=>{ preview.scrollTop=preview.scrollHeight*scrollPct; },50);
  // TOC after DOM update — reads rendered headings (clean text)
  requestAnimationFrame(updateTOC);
}

function wrapLatexBlocks(){
  preview.querySelectorAll('mjx-container[display="true"]').forEach(block=>{
    if(block.parentElement.classList.contains('latex-block-wrapper')) return;
    const wrap=document.createElement('div');
    wrap.className='latex-block-wrapper';
    const lbl=document.createElement('div');
    lbl.className='latex-block-label'; lbl.textContent='LATEX';
    block.parentNode.insertBefore(wrap,block);
    wrap.appendChild(block); wrap.appendChild(lbl);
  });
}

// ══ MATH — ON-DEMAND ══
function setMathDirty(dirty){
  mathDirty=dirty;
  const ind=document.getElementById('math-indicator');
  const txt=document.getElementById('math-ind-text');
  if(dirty){ ind.className='dirty'; txt.textContent='LaTeX: pendente — ∑ RENDER ou saia do editor'; }
  else      { ind.className='rendered'; txt.textContent='LaTeX: renderizado ✓'; }
}
function forceRenderMath(){
  if(!window.MathJax||!window.MathJax.typesetPromise){
    showToast('error','⚠','MathJax não carregado.'); return;
  }
  document.getElementById('math-ind-text').textContent='LaTeX: renderizando...';
  MathJax.typesetClear([preview]);
  MathJax.typesetPromise([preview])
    .then(()=>{
      wrapLatexBlocks();
      setMathDirty(false);
      // Atualiza TOC depois do MathJax — captura LaTeX renderizado nos headings
      requestAnimationFrame(updateTOC);
    })
    .catch(e=>console.warn(e));
}
// Renderiza sempre ao sair do editor
mdEditor.addEventListener('blur',()=>{ forceRenderMath(); });

// ══ TOC ══
function updateTOC(){
  // Lê os headings já renderizados do preview — texto limpo, sem #, **, etc.
  const headings=preview.querySelectorAll('h1,h2,h3,h4,h5,h6');
  if(!headings.length){
    tocEl.innerHTML='<div class="toc-empty">// Nenhum cabeçalho<br>// detectado.</div>';
    return;
  }
  const sym=['','◆','◇','·','–','–'];
  tocEl.innerHTML=Array.from(headings).map(h=>{
    const lvl=parseInt(h.tagName[1]);
    // Pega o texto limpo já renderizado (inclui math se MathJax já rodou)
    const rawText=h.textContent.trim();
    // Clona o heading para capturar HTML renderizado (inclui mjx-container)
    const clone=h.cloneNode(true);
    // Remove elementos não-visuais do clone
    clone.querySelectorAll('.anchor,.header-anchor').forEach(e=>e.remove());
    const displayHtml=clone.innerHTML.trim();
    return `<div class="toc-item" data-level="${lvl}" data-text="${escH(rawText)}"
              onclick="jumpToHeadingByIndex(${Array.from(headings).indexOf(h)})"
              style="padding-left:${(lvl-1)*10+12}px">
      <span class="toc-bullet">${sym[lvl]||'·'}</span>
      <span class="toc-text" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${displayHtml}</span>
      <span class="toc-lvl">H${lvl}</span>
    </div>`;
  }).join('');
}

function jumpToHeadingByIndex(i){
  const h=preview.querySelectorAll('h1,h2,h3,h4,h5,h6')[i];
  if(h) h.scrollIntoView({behavior:'smooth',block:'start'});
}
function jumpToHeading(txt){
  for(const h of preview.querySelectorAll('h1,h2,h3,h4,h5,h6')){
    if(h.textContent.trim()===txt){ h.scrollIntoView({behavior:'smooth',block:'start'}); return; }
  }
}
function escH(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// ══ TOOLBAR INJECTION ══
const MD_TPL = {
  h1:{b:'\n# ',a:'',p:'Título'},h2:{b:'\n## ',a:'',p:'Subtítulo'},
  h3:{b:'\n### ',a:'',p:'Seção'},h4:{b:'\n#### ',a:'',p:'Seção 4'},
  h5:{b:'\n##### ',a:'',p:'Seção 5'},h6:{b:'\n###### ',a:'',p:'Seção 6'},
  bold:     {b:'**',  a:'**',  p:'negrito'},
  italic:   {b:'_',   a:'_',   p:'itálico'},
  underline:{b:'<u>', a:'</u>',p:'sublinhado'},
  strike:   {b:'~~',  a:'~~',  p:'texto'},
  highlight:{b:'==',  a:'==',  p:'realce'},       // requer marked-highlight ou plugin
  sup:      {b:'<sup>',a:'</sup>',p:'sobrescrito'},
  sub:      {b:'<sub>',a:'</sub>',p:'subscrito'},
  br:       {b:'  \n',a:'',    p:''},              // dois espaços + newline = <br>
  'code-inline':{b:'`',  a:'`',   p:'código'},
  'code-block': {b:'\n```\n',a:'\n```',p:'código aqui'},
  'latex-inline':{b:'$',a:'$',p:'expressão'},
  'latex-block': {b:'\n$$\n',a:'\n$$',p:'equação'},
  link:      {b:'[',  a:'](url)',p:'texto'},
  image:     {b:'![', a:'](url)',p:'alt'},
  blockquote:{b:'\n> ',a:'',  p:'citação'},
  hr:        {b:'\n---\n',a:'',p:''},
  'list-ul': {b:'\n- ',a:'',  p:'item'},
  'list-ol': {b:'\n1. ',a:'', p:'item'},
  checkbox:  {b:'\n- [ ] ',a:'',p:'tarefa'},
  deflist:   {b:'\nTermo\n: ',a:'',p:'Definição'},
  table:{b:'\n| Coluna 1 | Coluna 2 | Coluna 3 |\n|----------|----------|----------|\n| ',a:' | Célula 2 | Célula 3 |\n',p:'Célula 1'},
};
function ins(type){
  const tpl=MD_TPL[type]; if(!tpl) return;
  const s=mdEditor.selectionStart,e=mdEditor.selectionEnd;
  const sel=mdEditor.value.substring(s,e);
  mdEditor.focus();
  document.execCommand('insertText',false,tpl.b+(sel||tpl.p)+tpl.a);
  mdEditor.setSelectionRange(s+tpl.b.length,s+tpl.b.length+(sel||tpl.p).length);
  scheduleRender();
}
mdEditor.addEventListener('input',scheduleRender);
mdEditor.addEventListener('keydown',e=>{
  if(e.key==='Tab'){
    e.preventDefault();
    const s=mdEditor.selectionStart,en=mdEditor.selectionEnd;
    const txt=mdEditor.value;
    if(s!==en){
      const bef=txt.substring(0,s),sel=txt.substring(s,en),aft=txt.substring(en);
      if(e.shiftKey){ const d=sel.replace(/^( {2}|\t)/gm,''); mdEditor.value=bef+d+aft; mdEditor.setSelectionRange(s,s+d.length); }
      else           { const i=sel.replace(/^/gm,'  ');        mdEditor.value=bef+i+aft; mdEditor.setSelectionRange(s,s+i.length); }
    } else { document.execCommand('insertText',false,'  '); }
    scheduleRender();
  }
});

// ══ ZOOM CONTROL ══
let currentZoom=0.9;
function changeZoom(delta){
  currentZoom=Math.min(2,Math.max(0.3,currentZoom+delta));
  applyZoom();
}
function resetZoom(){
  // auto-fit: calculate zoom so A4 (210mm ≈ 794px) fits preview panel width
  const panel=document.getElementById('preview-scroll');
  const a4px=794; // ~210mm at 96dpi
  const available=panel.clientWidth-40;
  currentZoom=Math.min(1.5,Math.max(0.3,available/a4px));
  applyZoom();
}
function applyZoom(){
  document.documentElement.style.setProperty('--a4-zoom',currentZoom);
  // fix margin-bottom so scroll area is correct
  const a4=document.getElementById('a4-sheet');
  const a4mmPx=297*3.7795275591; // 297mm in px
  a4.style.marginBottom=((currentZoom-1)*a4mmPx)+'px';
  document.getElementById('zoom-val').textContent=Math.round(currentZoom*100)+'%';
}

// ══ PREVIEW MODE TOGGLE ══
let previewMode = 'html'; // 'html' | 'a4'
function setPreviewMode(mode){
  previewMode = mode;
  document.body.classList.toggle('a4-mode', mode === 'a4');
  document.getElementById('pmode-html').classList.toggle('active', mode === 'html');
  document.getElementById('pmode-a4').classList.toggle('active',   mode === 'a4');
  document.getElementById('zoom-controls-wrap').style.display = mode === 'a4' ? 'flex' : 'none';
  document.querySelector('.preview-module-tag').textContent = mode === 'a4' ? '◈ SIMULAÇÃO A4' : '◈ PREVIEW HTML';
  // Re-render math if switching to a4 (MathJax needs retypeset after layout change)
  if(mode === 'a4' && window.MathJax && window.MathJax.typesetPromise){
    MathJax.typesetClear([document.getElementById('preview-content')]);
    MathJax.typesetPromise([document.getElementById('preview-content')]).then(wrapLatexBlocks).catch(()=>{});
  }
}


const panelState={toc:true,editor:true,preview:true};
const panelMap={toc:'toc-panel',editor:'editor-panel',preview:'preview-panel'};
const togMap  ={toc:'tog-toc',  editor:'tog-editor',  preview:'tog-preview'};
function togglePanel(name){
  panelState[name]=!panelState[name];
  document.getElementById(panelMap[name]).classList.toggle('collapsed',!panelState[name]);
  document.getElementById(togMap[name]).classList.toggle('active',panelState[name]);
}

// ══ RESIZE HANDLES ══
(()=>{
  let drag=null,startX=0,startL=0,startR=0;
  document.querySelectorAll('.resize-handle').forEach(h=>{
    h.addEventListener('mousedown',e=>{
      e.preventDefault(); drag=h; startX=e.clientX;
      const lp=document.getElementById(h.dataset.left);
      const rp=document.getElementById(h.dataset.right);
      startL=lp.getBoundingClientRect().width;
      startR=rp.getBoundingClientRect().width;
      h.classList.add('dragging'); document.body.style.cursor='col-resize'; document.body.style.userSelect='none';
    });
  });
  document.addEventListener('mousemove',e=>{
    if(!drag) return;
    const dx=e.clientX-startX;
    document.getElementById(drag.dataset.left).style.flex=`0 0 ${Math.max(80,startL+dx)}px`;
    document.getElementById(drag.dataset.right).style.flex=`0 0 ${Math.max(80,startR-dx)}px`;
  });
  document.addEventListener('mouseup',()=>{
    if(drag){drag.classList.remove('dragging');drag=null;document.body.style.cursor='';document.body.style.userSelect='';}
  });
})();

// ══ SETTINGS ══
function buildSettingsUI(){
  // headings H1-H6
  const hc=document.getElementById('heading-settings');
  const hColors=['#00ff0f','#ffffff','#004bff','#00e60f','#ffeb00','#ff8700'];
  hc.innerHTML=Array.from({length:6},(_,i)=>{
    const n=i+1;
    return `
    <div class="setting-row">
      <div class="setting-label">H${n} — Cor do Texto</div>
      <div class="s-row-flex">
        <input type="color" class="color-input" id="h${n}Color" value="${hColors[i]}">
        <span class="s-chk-label">Fundo:</span>
        <input type="color" class="color-input" id="h${n}Bg" value="#000000">
        <input type="checkbox" id="h${n}BgTransparent" checked>
        <span class="s-chk-label">Transp.</span>
      </div>
    </div>`;
  }).join('');
  // font sizes
  const fc=document.getElementById('font-size-settings');
  const fsizes=[['H1','1.9em'],['H2','1.55em'],['H3','1.25em'],['H4','1.08em'],['H5','1em'],['H6','0.9em'],['Parágrafo','15px'],['Citação','14px']];
  const ids   =['h1','h2','h3','h4','h5','h6','p','quote'];
  fc.innerHTML=fsizes.map((s,i)=>`
    <div class="setting-row">
      <div class="setting-label">Tamanho ${s[0]}</div>
      <input type="text" class="setting-input" id="${ids[i]}Size" value="${s[1]}">
    </div>`).join('');
}

function openSettings(){ document.getElementById('settings-overlay').classList.add('active'); }
function closeSettings(){ document.getElementById('settings-overlay').classList.remove('active'); }
document.getElementById('settings-overlay').addEventListener('click',e=>{ if(e.target===document.getElementById('settings-overlay')) closeSettings(); });

function setTheme(theme,e){
  document.querySelectorAll('.theme-btn').forEach(b=>b.classList.remove('active'));
  if(e) e.target.classList.add('active');
  document.body.classList.toggle('light-theme',theme==='light');
  saveSettings();
}

function applySettings(){
  const root=document.documentElement;
  for(let i=1;i<=6;i++){
    root.style.setProperty(`--h${i}-color`,document.getElementById(`h${i}Color`).value);
    const transp=document.getElementById(`h${i}BgTransparent`).checked;
    root.style.setProperty(`--h${i}-bg`,transp?'transparent':document.getElementById(`h${i}Bg`).value);
    root.style.setProperty(`--h${i}-size`,document.getElementById(['h1','h2','h3','h4','h5','h6'][i-1]+'Size').value);
  }
  root.style.setProperty('--code-inline-color',document.getElementById('codeInlineColor').value);
  root.style.setProperty('--code-inline-bg',document.getElementById('codeInlineBg').value);
  root.style.setProperty('--latex-inline-color',document.getElementById('latexInlineColor').value);
  root.style.setProperty('--latex-inline-bg',document.getElementById('latexInlineBgTransparent').checked?'transparent':document.getElementById('latexInlineBg').value);
  root.style.setProperty('--quote-color',document.getElementById('quoteColor').value);
  root.style.setProperty('--quote-bg',document.getElementById('quoteBg').value);
  root.style.setProperty('--quote-border',document.getElementById('quoteBorder').value);
  root.style.setProperty('--latex-block-color',document.getElementById('latexBlockColor').value);
  root.style.setProperty('--latex-block-bg',document.getElementById('latexBlockBg').value);
  root.style.setProperty('--latex-block-border',document.getElementById('latexBlockBorder').value);
  root.style.setProperty('--code-block-bg',document.getElementById('codeBlockBg').value);
  root.style.setProperty('--code-block-border',document.getElementById('codeBlockBorder').value);
  root.style.setProperty('--table-header-bg',document.getElementById('tableHeaderBg').value);
  root.style.setProperty('--hr-color',document.getElementById('hrColor').value);
  root.style.setProperty('--hr-thickness',document.getElementById('hrThickness').value+'px');
  root.style.setProperty('--hr-style',document.getElementById('hrStyle').value);
  root.style.setProperty('--spacing-horizontal',document.getElementById('spacingHorizontal').value);
  root.style.setProperty('--spacing-vertical',document.getElementById('spacingVertical').value);
  root.style.setProperty('--word-spacing',document.getElementById('wordSpacing').value);
  root.style.setProperty('--margins',document.getElementById('margins').value+'px');
  root.style.setProperty('--text-align',document.getElementById('textAlign').value);
  root.style.setProperty('--preview-font',document.getElementById('fontFamily').value);
  root.style.setProperty('--p-size',document.getElementById('pSize').value);
  root.style.setProperty('--quote-size',document.getElementById('quoteSize').value);
  root.style.setProperty('--p-color',document.getElementById('pColor').value);
  root.style.setProperty('--link-color',document.getElementById('linkColor').value);
  saveSettings();
  closeSettings();
  renderMarkdown();
}

function saveSettings(){
  const ids=['h1Color','h1Bg','h1BgTransparent','h2Color','h2Bg','h2BgTransparent',
    'h3Color','h3Bg','h3BgTransparent','h4Color','h4Bg','h4BgTransparent',
    'h5Color','h5Bg','h5BgTransparent','h6Color','h6Bg','h6BgTransparent',
    'h1Size','h2Size','h3Size','h4Size','h5Size','h6Size','pSize','quoteSize',
    'codeInlineColor','codeInlineBg','latexInlineColor','latexInlineBg','latexInlineBgTransparent',
    'quoteColor','quoteBg','quoteBorder','latexBlockColor','latexBlockBg','latexBlockBorder',
    'codeBlockBg','codeBlockBorder','tableHeaderBg','hrColor','hrThickness','hrStyle',
    'spacingHorizontal','spacingVertical','wordSpacing','margins','textAlign','fontFamily',
    'pColor','linkColor'];
  const s={
    _v:'4',  // ← versão do schema — incrementar sempre que mudar defaults
    theme:document.body.classList.contains('light-theme')?'light':'dark'
  };
  ids.forEach(id=>{
    const el=document.getElementById(id);
    if(el) s[id]=el.type==='checkbox'?el.checked:el.value;
  });
  localStorage.setItem('nexusEditorSettings',JSON.stringify(s));
}

function loadSettings(){
  const raw=localStorage.getItem('nexusEditorSettings');
  if(!raw) return; // sem cache — usa defaults do CSS
  let s;
  try{ s=JSON.parse(raw); }catch(e){ return; }

  // Se versão diferente da atual, descarta — defaults do CSS valem
  if(s._v !== '4'){
    localStorage.removeItem('nexusEditorSettings');
    console.info('[Nexus] Settings antigas descartadas (versão diferente). Usando defaults.');
    return;
  }

  if(s.theme==='light') document.body.classList.add('light-theme');
  Object.keys(s).forEach(k=>{
    if(k==='_v'||k==='theme') return;
    const el=document.getElementById(k);
    if(el){ if(el.type==='checkbox') el.checked=s[k]; else el.value=s[k]; }
  });
  applySettings();
}

function resetSettings(){
  if(!confirm('Restaurar configurações padrão?')) return;
  localStorage.removeItem('nexusEditorSettings');
  location.reload();
}

// ══ SYMBOL BANK ══
const SYMBOL_DB={
  "Matemática Geral":[
    {s:'∑',n:'Somatório'},{s:'∏',n:'Produtório'},{s:'∫',n:'Integral'},{s:'∬',n:'Integral Dupla'},
    {s:'∭',n:'Integral Tripla'},{s:'∮',n:'Integral de Linha'},{s:'∂',n:'Derivada Parcial'},
    {s:'∇',n:'Nabla'},{s:'Δ',n:'Delta'},{s:'δ',n:'delta min'},{s:'ε',n:'Epsilon'},
    {s:'∞',n:'Infinito'},{s:'≈',n:'Aprox'},{s:'≠',n:'Diferente'},{s:'≡',n:'Identicamente igual'},
    {s:'≤',n:'Menor/igual'},{s:'≥',n:'Maior/igual'},{s:'≪',n:'Muito menor'},{s:'≫',n:'Muito maior'},
    {s:'√',n:'Raiz 2'},{s:'∛',n:'Raiz 3'},{s:'±',n:'±'},{s:'∓',n:'∓'},{s:'×',n:'Mult'},
    {s:'÷',n:'Div'},{s:'∝',n:'Proporcional'},{s:'⌊',n:'Floor'},{s:'⌈',n:'Ceil'},
    {s:'∘',n:'Composição'},{s:'⊕',n:'XOR/Soma direta'},{s:'⊗',n:'Produto tensorial'},
    {s:'ℕ',n:'Naturais'},{s:'ℤ',n:'Inteiros'},{s:'ℚ',n:'Racionais'},{s:'ℝ',n:'Reais'},{s:'ℂ',n:'Complexos'},
    {s:'∀',n:'Para todo'},{s:'∃',n:'Existe'},{s:'∄',n:'Não existe'},{s:'∈',n:'Pertence'},{s:'∉',n:'Não pertence'},
    {s:'⊂',n:'Subconjunto'},{s:'∪',n:'União'},{s:'∩',n:'Interseção'},{s:'∅',n:'Vazio'},
  ],
  "Letras Gregas":[
    {s:'α',n:'alpha'},{s:'β',n:'beta'},{s:'γ',n:'gamma'},{s:'Γ',n:'Gamma'},
    {s:'δ',n:'delta'},{s:'Δ',n:'Delta'},{s:'ε',n:'epsilon'},{s:'ζ',n:'zeta'},
    {s:'η',n:'eta'},{s:'θ',n:'theta'},{s:'Θ',n:'Theta'},{s:'ι',n:'iota'},
    {s:'κ',n:'kappa'},{s:'λ',n:'lambda'},{s:'Λ',n:'Lambda'},{s:'μ',n:'mu'},
    {s:'ν',n:'nu'},{s:'ξ',n:'xi'},{s:'Ξ',n:'Xi'},{s:'π',n:'pi'},{s:'Π',n:'Pi'},
    {s:'ρ',n:'rho'},{s:'σ',n:'sigma'},{s:'Σ',n:'Sigma'},{s:'τ',n:'tau'},
    {s:'φ',n:'phi'},{s:'Φ',n:'Phi'},{s:'χ',n:'chi'},{s:'ψ',n:'psi'},{s:'Ψ',n:'Psi'},
    {s:'ω',n:'omega'},{s:'Ω',n:'Omega'},{s:'ℏ',n:'h-barra'},{s:'ℓ',n:'l cursivo'},
    {s:'ℑ',n:'Im'},{s:'ℜ',n:'Re'},{s:'ℵ',n:'Aleph'},{s:'ℶ',n:'Beth'},
  ],
  "Física":[
    {s:'ℏ',n:'h-barra'},{s:'⟨',n:'bra'},{s:'⟩',n:'ket'},{s:'†',n:'dagger'},
    {s:'⋆',n:'conjugado'},{s:'∝',n:'proporcional'},{s:'⊥',n:'perpendicular'},{s:'∥',n:'paralelo'},
    {s:'⇌',n:'equilíbrio'},{s:'↑',n:'spin up'},{s:'↓',n:'spin down'},{s:'Å',n:'Ångström'},
    {s:'℃',n:'Celsius'},{s:'K',n:'Kelvin'},{s:'Ω',n:'Ohm'},{s:'μ',n:'micro'},{s:'η',n:'eficiência'},
    {s:'⇒',n:'implica'},{s:'⇔',n:'equivale'},{s:'∇²',n:'Laplaciano'},
  ],
  "Química":[
    {s:'⇌',n:'Equilíbrio'},{s:'→',n:'Reação direta'},{s:'←',n:'Reversa'},{s:'↔',n:'Ressonância'},
    {s:'Δ',n:'Aquecimento'},{s:'°',n:'Grau'},{s:'α',n:'decaimento α'},{s:'β',n:'decaimento β'},
    {s:'γ',n:'raio γ'},{s:'⁰',n:'sup 0'},{s:'¹',n:'sup 1'},{s:'²',n:'sup 2'},{s:'³',n:'sup 3'},
    {s:'⁺',n:'sup +'},{s:'⁻',n:'sup -'},{s:'ₙ',n:'sub n'},{s:'ₓ',n:'sub x'},
  ],
  "Lógica / Computação":[
    {s:'∧',n:'AND'},{s:'∨',n:'OR'},{s:'¬',n:'NOT'},{s:'⊕',n:'XOR'},{s:'⊤',n:'True'},{s:'⊥',n:'False'},
    {s:'∀',n:'Para todo'},{s:'∃',n:'Existe'},{s:'⊢',n:'Provado'},{s:'⊨',n:'Satisfaz'},
    {s:'→',n:'Implica'},{s:'↔',n:'Bicondicional'},{s:'⇒',n:'Implica forte'},{s:'⇔',n:'Equiv forte'},
    {s:'λ',n:'Lambda'},{s:'𝒪',n:'Big O'},{s:'Θ',n:'Big Theta'},{s:'↦',n:'Mapeia'},
    {s:'⌘',n:'Command'},{s:'⌃',n:'Ctrl'},{s:'⇧',n:'Shift'},{s:'⌫',n:'Backspace'},{s:'⇥',n:'Tab'},
  ],
  "Setas e Relações":[
    {s:'→',n:'→'},{s:'←',n:'←'},{s:'↑',n:'↑'},{s:'↓',n:'↓'},{s:'↔',n:'↔'},{s:'↕',n:'↕'},
    {s:'⇒',n:'⇒'},{s:'⇐',n:'⇐'},{s:'⇑',n:'⇑'},{s:'⇓',n:'⇓'},{s:'⇔',n:'⇔'},
    {s:'⟹',n:'Implica longa'},{s:'⟺',n:'Equiv longa'},{s:'↪',n:'↪'},{s:'↩',n:'↩'},
    {s:'↻',n:'Horário'},{s:'↺',n:'Anti-horário'},{s:'↣',n:'Injeção'},{s:'↠',n:'Sobrejeção'},
  ],
  "Geometria":[
    {s:'∠',n:'Ângulo'},{s:'⊥',n:'Perp.'},{s:'∥',n:'Paralelo'},{s:'≅',n:'Congruente'},{s:'∼',n:'Similar'},
    {s:'△',n:'Triângulo'},{s:'□',n:'Quadrado'},{s:'○',n:'Círculo'},{s:'π',n:'Pi'},{s:'τ',n:'2π'},
    {s:'∮',n:'Contorno'},{s:'∇',n:'Gradiente'},{s:'∂',n:'Parcial'},
  ],
  "Sub/Superscripts":[
    {s:'₀',n:'₀'},{s:'₁',n:'₁'},{s:'₂',n:'₂'},{s:'₃',n:'₃'},{s:'₄',n:'₄'},{s:'₅',n:'₅'},
    {s:'ₐ',n:'ₐ'},{s:'ₑ',n:'ₑ'},{s:'ₒ',n:'ₒ'},{s:'ₓ',n:'ₓ'},{s:'ₙ',n:'ₙ'},{s:'ᵢ',n:'ᵢ'},
    {s:'⁰',n:'⁰'},{s:'¹',n:'¹'},{s:'²',n:'²'},{s:'³',n:'³'},{s:'⁴',n:'⁴'},{s:'⁵',n:'⁵'},
    {s:'ⁿ',n:'ⁿ'},{s:'ᵀ',n:'ᵀ'},{s:'⁺',n:'⁺'},{s:'⁻',n:'⁻'},
  ],
  "Alquimia / Especiais":[
    {s:'🜂',n:'Fogo (Nexus)'},{s:'🜁',n:'Ar'},{s:'🜄',n:'Água'},{s:'🜃',n:'Terra'},
    {s:'☿',n:'Mercúrio'},{s:'♀',n:'Vênus'},{s:'♂',n:'Marte'},{s:'♃',n:'Júpiter'},
    {s:'☀',n:'Sol'},{s:'☽',n:'Lua'},{s:'⬡',n:'Hexágono'},{s:'◈',n:'Diamante p'},
    {s:'◆',n:'Diamante'},{s:'∞',n:'Infinito'},{s:'⚛',n:'Átomo'},{s:'⚗',n:'Alambique'},
    {s:'⚙',n:'Engrenagem'},{s:'✦',n:'Estrela 4'},{s:'⌖',n:'Alvo'},{s:'⊿',n:'Triângulo'},
  ],
};

let currentCat=null, searchQuery='', currentColorTab='font', selectedColor='#00d4ff';
const SWATCHES=['#ffffff','#d0e8f0','#7aabb8','#3a6070','#00d4ff','#4de8ff','#007a99','#0a4a5a',
  '#ffaa00','#ff7a00','#ff3a3a','#ff5555','#00ff88','#00cc66','#a0ff40','#40ffcc',
  '#cc88ff','#8855ff','#ff44cc','#ff88aa','#1e3a48','#0e1822','#070c10','#000000'];

function buildSymbolPanel(){
  // cats
  const cats=document.getElementById('sym-cats');
  cats.innerHTML=`<button class="sym-cat-btn active" onclick="setCat(null,this)">Todas</button>`
    +Object.keys(SYMBOL_DB).map(c=>`<button class="sym-cat-btn" onclick="setCat('${escH(c)}',this)">${c.split(' ')[0]}</button>`).join('');
  // swatches
  document.getElementById('ct-swatches').innerHTML=SWATCHES.map(c=>
    `<div class="swatch${c===selectedColor?' active':''}" style="background:${c}" onclick="selectSwatch('${c}',this)" title="${c}"></div>`).join('');
  renderSymGrid(); updateColorPreview();
}
function setCat(cat,btn){
  currentCat=cat;
  document.querySelectorAll('.sym-cat-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderSymGrid();
}
function filterSymbols(q){ searchQuery=q.toLowerCase(); renderSymGrid(); }
function renderSymGrid(){
  const wrap=document.getElementById('sym-grid-wrap');
  let html='';
  Object.entries(SYMBOL_DB).forEach(([cat,syms])=>{
    if(currentCat&&cat!==currentCat) return;
    const f=searchQuery?syms.filter(s=>s.s.includes(searchQuery)||s.n.toLowerCase().includes(searchQuery)):syms;
    if(!f.length) return;
    html+=`<div class="sym-category-title">${cat}</div><div class="sym-grid">`;
    f.forEach(({s,n})=>{ html+=`<button class="sym-btn" title="${escH(n)}" onclick="insertSymbol('${escH(s)}')">${s}</button>`; });
    html+='</div>';
  });
  wrap.innerHTML=html||'<div class="toc-empty">// Nenhum símbolo encontrado.</div>';
}
function insertSymbol(sym){
  const tmp=document.createElement('textarea'); tmp.innerHTML=sym; const d=tmp.value;
  mdEditor.focus(); document.execCommand('insertText',false,d); scheduleRender();
}
let symOpen=false;
function toggleSymbolPanel(){ symOpen=!symOpen; document.getElementById('symbol-panel').classList.toggle('open',symOpen); }

// color tools
function selectColorTab(tab){
  currentColorTab=tab;
  document.querySelectorAll('.ct-tab').forEach(b=>b.classList.toggle('active',b.dataset.ct===tab));
  updateColorPreview();
}
function selectSwatch(color,el){ selectedColor=color; document.querySelectorAll('.swatch').forEach(s=>s.classList.remove('active')); el.classList.add('active'); document.getElementById('ct-custom-color').value=color; updateColorPreview(); }
function onCustomColor(v){ selectedColor=v; document.querySelectorAll('.swatch').forEach(s=>s.classList.remove('active')); updateColorPreview(); }
function updateColorPreview(){
  const box=document.getElementById('ct-preview-box');
  box.style.color=''; box.style.background=''; box.style.border=''; box.style.textShadow='';
  const c=selectedColor;
  if(currentColorTab==='font')   { box.style.color=c; box.style.background='rgba(0,0,0,.3)'; }
  if(currentColorTab==='bg')     { box.style.background=c; box.style.color=isLight(c)?'#111':'#eee'; }
  if(currentColorTab==='border') { box.style.border=`2px solid ${c}`; }
  if(currentColorTab==='fill')   { box.style.textShadow=`0 0 8px ${c},0 0 16px ${c}`; box.style.color=c; }
}
function isLight(h){ const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16); return (r*299+g*587+b*114)/1000>128; }
function applyColorToSelection(){
  const c=selectedColor,s=mdEditor.selectionStart,e=mdEditor.selectionEnd,sel=mdEditor.value.substring(s,e);
  if(!sel){ showToast('error','⚠','Selecione texto no editor.'); return; }
  let w='';
  if(currentColorTab==='font')   w=`<span style="color:${c}">${sel}</span>`;
  if(currentColorTab==='bg')     w=`<span style="background:${c}">${sel}</span>`;
  if(currentColorTab==='border') w=`<span style="border:1px solid ${c};padding:1px 3px">${sel}</span>`;
  if(currentColorTab==='fill')   w=`<span style="text-shadow:0 0 6px ${c};color:${c}">${sel}</span>`;
  mdEditor.focus(); document.execCommand('insertText',false,w); scheduleRender();
  showToast('success','◆','Cor aplicada.');
}
function clearColorFromSelection(){
  const s=mdEditor.selectionStart,e=mdEditor.selectionEnd,sel=mdEditor.value.substring(s,e);
  if(!sel){ showToast('error','⚠','Selecione texto no editor.'); return; }
  mdEditor.focus(); document.execCommand('insertText',false,sel.replace(/<span[^>]*>([\s\S]*?)<\/span>/gi,'$1')); scheduleRender();
}

// ══ MODAL SAVE ══
function openSaveModal(){
  document.getElementById('input-title').value='';
  document.getElementById('input-status').value='';
  document.getElementById('status-badge-prev').className='status-badge-prev';
  document.getElementById('modal-overlay').classList.add('visible');
  setTimeout(()=>document.getElementById('input-title').focus(),200);
}
function closeModal(){ document.getElementById('modal-overlay').classList.remove('visible'); }
document.getElementById('modal-overlay').addEventListener('click',e=>{ if(e.target===document.getElementById('modal-overlay')) closeModal(); });
function updateStatusBadge(){
  const v=document.getElementById('input-status').value;
  const b=document.getElementById('status-badge-prev');
  const m={'Em construção':'construcao','Conjectura':'conjectura','Erro':'erro'};
  if(v&&m[v]){ b.className='status-badge-prev visible '+m[v]; document.getElementById('badge-text').textContent=v.toUpperCase(); }
  else b.className='status-badge-prev';
}
async function commitToFirestore(){
  const title=document.getElementById('input-title').value.trim();
  const status=document.getElementById('input-status').value;
  const content=mdEditor.value;
  if(!title){ showToast('error','⚠','Título obrigatório.'); return; }
  if(!status){ showToast('error','⚠','Selecione um status.'); return; }
  if(!content.trim()){ showToast('error','⚠','Corpus vazio.'); return; }
  const btn=document.getElementById('btn-confirm-save');
  btn.disabled=true; btn.innerHTML='<span>↻</span><span>GRAVANDO...</span>';
  if(!db){ showToast('error','✕','Firebase não configurado.'); btn.disabled=false; btn.innerHTML='<span>⬡</span><span>GRAVAR NO FIRESTORE</span>'; return; }
  try{
    const ref=await db.collection('dataCore').add({title,content,status,createdAt:firebase.firestore.FieldValue.serverTimestamp()});
    closeModal(); showToast('success','◆',`"${title}" gravado.`);
    console.log('[Nexus Editor] Commit → dataCore/'+ref.id);
  }catch(err){ showToast('error','✕','Erro: '+err.message); }
  finally{ btn.disabled=false; btn.innerHTML='<span>⬡</span><span>GRAVAR NO FIRESTORE</span>'; }
}

// ══ CURSOR POSITION ══
function updateCursor(){
  const s=mdEditor.selectionStart;
  const lines=mdEditor.value.substring(0,s).split('\n');
  document.getElementById('cur-ln').textContent=lines.length;
  document.getElementById('cur-col').textContent=lines[lines.length-1].length+1;
}
mdEditor.addEventListener('click',updateCursor);
mdEditor.addEventListener('keyup',updateCursor);
mdEditor.addEventListener('selectionchange',updateCursor);

// ══ READ TIME ══
function updateReadTime(words){
  const mins=Math.max(1,Math.round(words/200));
  document.getElementById('read-time').textContent=`~${mins} min`;
}

// ══ ACTIVE LINE HIGHLIGHT ══
let activeLineEl=null;
function updateActiveLine(){
  const ed=mdEditor;
  const lineH=parseFloat(getComputedStyle(ed).lineHeight)||22;
  const padT=parseFloat(getComputedStyle(ed).paddingTop)||16;
  const s=ed.selectionStart;
  const lineNum=ed.value.substring(0,s).split('\n').length-1;
  const top=padT+lineNum*lineH;
  if(!activeLineEl){
    activeLineEl=document.createElement('div');
    activeLineEl.className='editor-activeline';
    ed.parentElement.style.position='relative';
    ed.parentElement.insertBefore(activeLineEl,ed);
  }
  activeLineEl.style.top=top+'px';
  activeLineEl.style.height=lineH+'px';
}
mdEditor.addEventListener('click',updateActiveLine);
mdEditor.addEventListener('keyup',updateActiveLine);

// ══ AUTO-SAVE (localStorage, 30s) ══
const AS_KEY='nexus_autosave';
let asTimer=null, asLastSaved='';
function autoSave(){
  const cur=tabs.find(t=>t.id===currentTabId);
  if(cur) cur.content=mdEditor.value;
  const data=JSON.stringify({tabs,currentTabId,nextTabId,ts:Date.now()});
  if(data===asLastSaved) return;
  asLastSaved=data;
  try{
    localStorage.setItem(AS_KEY,data);
    setAsStatus('saved');
    setTimeout(()=>setAsStatus('idle'),2000);
  }catch(e){ setAsStatus('idle'); }
}
function setAsStatus(s){
  const dot=document.getElementById('autosave-dot');
  const txt=document.getElementById('as-text');
  dot.className='autosave-dot '+(s==='saving'?'saving':s==='saved'?'saved':'');
  if(s==='saved')  txt.textContent='salvo localmente';
  else if(s==='saving') txt.textContent='salvando...';
  else txt.textContent='auto-save ativo';
}
function scheduleAutoSave(){
  clearTimeout(asTimer);
  setAsStatus('saving');
  asTimer=setTimeout(autoSave,2000);
}
function restoreAutoSave(){
  try{
    const raw=localStorage.getItem(AS_KEY);
    if(!raw) return false;
    const data=JSON.parse(raw);
    const age=Date.now()-data.ts;
    if(age>7*24*60*60*1000) return false; // ignora se > 7 dias
    if(data.tabs&&data.tabs.length){
      const confirmed=confirm(`📄 Auto-save encontrado (${new Date(data.ts).toLocaleString('pt-BR')}).\nDeseja restaurar o trabalho anterior?`);
      if(!confirmed) return false;
      tabs=[...data.tabs];
      currentTabId=data.currentTabId;
      nextTabId=data.nextTabId;
      const cur=tabs.find(t=>t.id===currentTabId);
      if(cur) mdEditor.value=cur.content;
      renderTabs();
      scheduleRender(); updateStats(); updateTOC();
      showToast('success','🔄','Sessão anterior restaurada.');
      return true;
    }
  }catch(e){}
  return false;
}
// hook auto-save into input
const _origScheduleRender=scheduleRender;
mdEditor.addEventListener('input',scheduleAutoSave);

// ══ UNDO/REDO STACK ══
const UNDO_LIMIT=100;
let undoStack=[], redoStack=[], undoPaused=false;
function pushUndo(){
  if(undoPaused) return;
  const v=mdEditor.value;
  if(undoStack.length&&undoStack[undoStack.length-1]===v) return;
  undoStack.push(v);
  if(undoStack.length>UNDO_LIMIT) undoStack.shift();
  redoStack=[];
}
function doUndo(){
  if(!undoStack.length) return;
  redoStack.push(mdEditor.value);
  undoPaused=true;
  mdEditor.value=undoStack.pop();
  undoPaused=false;
  mdEditor.dispatchEvent(new Event('input'));
  showToast('','↩','Desfeito');
}
function doRedo(){
  if(!redoStack.length) return;
  undoStack.push(mdEditor.value);
  undoPaused=true;
  mdEditor.value=redoStack.pop();
  undoPaused=false;
  mdEditor.dispatchEvent(new Event('input'));
  showToast('','↪','Refeito');
}
// push undo every 1s of inactivity
let undoTimer=null;
mdEditor.addEventListener('input',()=>{
  clearTimeout(undoTimer);
  undoTimer=setTimeout(pushUndo,1000);
});

// ══ KEYBOARD SHORTCUTS ══
document.addEventListener('keydown',e=>{
  const ctrl=e.ctrlKey||e.metaKey;
  if(e.key==='Escape'){ closeModal(); closeSettings(); closeSaveFileModal(); closeSearch(); closeFsLoad(); closeDiff(); return; }
  if(ctrl&&e.key==='s'){ e.preventDefault(); openSaveFileModal(); return; }
  if(ctrl&&e.key==='f'){ e.preventDefault(); toggleSearch(); return; }
  if(ctrl&&e.key==='h'){ e.preventDefault(); toggleSearch(true); return; }
  if(ctrl&&e.key==='z'){ if(document.activeElement===mdEditor){ e.preventDefault(); doUndo(); } return; }
  if(ctrl&&(e.key==='y'||(e.shiftKey&&e.key==='Z'))){ if(document.activeElement===mdEditor){ e.preventDefault(); doRedo(); } return; }
  if(ctrl&&e.key==='p'){ e.preventDefault(); window.print(); return; }
  // inline formatting shortcuts (when editor focused)
  if(document.activeElement===mdEditor){
    if(ctrl&&e.key==='b'){ e.preventDefault(); ins('bold'); return; }
    if(ctrl&&e.key==='i'){ e.preventDefault(); ins('italic'); return; }
    if(ctrl&&e.key==='k'){ e.preventDefault(); ins('link'); return; }
    if(ctrl&&e.shiftKey&&e.key==='X'){ e.preventDefault(); ins('strike'); return; }
    if(ctrl&&e.shiftKey&&e.key==='C'){ e.preventDefault(); ins('code-inline'); return; }
  }
});

// ══ SEARCH / REPLACE ══
let sbMatches=[], sbIdx=0;
function toggleSearch(showReplace=false){
  const bar=document.getElementById('search-bar');
  const isOpen=bar.classList.contains('open');
  if(isOpen&&!showReplace){ closeSearch(); return; }
  bar.classList.add('open');
  const sel=mdEditor.value.substring(mdEditor.selectionStart,mdEditor.selectionEnd);
  if(sel) document.getElementById('sb-find').value=sel;
  setTimeout(()=>document.getElementById('sb-find').focus(),50);
  sbSearch();
}
function closeSearch(){
  document.getElementById('search-bar').classList.remove('open');
  sbMatches=[];
  document.getElementById('sb-count').textContent='';
}
function sbSearch(){
  const q=document.getElementById('sb-find').value;
  const caseSens=document.getElementById('sb-case').checked;
  const useRegex=document.getElementById('sb-regex').checked;
  const wholeWord=document.getElementById('sb-whole').checked;
  const text=mdEditor.value;
  sbMatches=[];
  if(!q){ document.getElementById('sb-count').textContent=''; return; }
  try{
    let pattern=useRegex?q:q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    if(wholeWord) pattern=`\\b${pattern}\\b`;
    const flags=caseSens?'g':'gi';
    const rx=new RegExp(pattern,flags);
    let m;
    while((m=rx.exec(text))!==null) sbMatches.push({start:m.index,end:m.index+m[0].length});
    document.getElementById('sb-count').textContent=sbMatches.length?`${Math.min(sbIdx+1,sbMatches.length)}/${sbMatches.length}`:'Nenhum';
    if(sbIdx>=sbMatches.length) sbIdx=0;
    if(sbMatches.length) sbJumpTo(sbIdx);
  }catch(e){ document.getElementById('sb-count').textContent='Erro regex'; }
}
function sbJumpTo(i){
  if(!sbMatches.length) return;
  sbIdx=((i%sbMatches.length)+sbMatches.length)%sbMatches.length;
  const m=sbMatches[sbIdx];
  mdEditor.focus();
  mdEditor.setSelectionRange(m.start,m.end);
  // scroll into view
  const lineH=parseFloat(getComputedStyle(mdEditor).lineHeight)||22;
  const line=mdEditor.value.substring(0,m.start).split('\n').length;
  mdEditor.scrollTop=(line-3)*lineH;
  document.getElementById('sb-count').textContent=`${sbIdx+1}/${sbMatches.length}`;
}
function sbNext(){ sbJumpTo(sbIdx+1); }
function sbPrev(){ sbJumpTo(sbIdx-1); }
function sbKeyNav(e){ if(e.key==='Enter'){ e.shiftKey?sbPrev():sbNext(); } if(e.key==='Escape') closeSearch(); }
function sbReplaceOne(){
  if(!sbMatches.length) return;
  const m=sbMatches[sbIdx];
  const rep=document.getElementById('sb-replace').value;
  const txt=mdEditor.value;
  mdEditor.value=txt.substring(0,m.start)+rep+txt.substring(m.end);
  mdEditor.dispatchEvent(new Event('input'));
  sbSearch();
}
function sbReplaceAll(){
  if(!sbMatches.length) return;
  const rep=document.getElementById('sb-replace').value;
  const q=document.getElementById('sb-find').value;
  const caseSens=document.getElementById('sb-case').checked;
  const useRegex=document.getElementById('sb-regex').checked;
  const wholeWord=document.getElementById('sb-whole').checked;
  try{
    let pattern=useRegex?q:q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    if(wholeWord) pattern=`\\b${pattern}\\b`;
    const rx=new RegExp(pattern,caseSens?'g':'gi');
    const count=(mdEditor.value.match(rx)||[]).length;
    mdEditor.value=mdEditor.value.replace(rx,rep);
    mdEditor.dispatchEvent(new Event('input'));
    sbSearch();
    showToast('success','🔍',`${count} substituição(ões) feita(s).`);
  }catch(e){ showToast('error','✕','Erro no padrão.'); }
}
document.getElementById('sb-find').addEventListener('input',sbSearch);
document.getElementById('sb-case').addEventListener('change',sbSearch);
document.getElementById('sb-regex').addEventListener('change',sbSearch);
document.getElementById('sb-whole').addEventListener('change',sbSearch);

// ══ RENAME TAB (double-click) ══
function renderTabs(){
  const c=document.getElementById('tabs-row');
  c.innerHTML='';
  tabs.forEach(t=>{
    const btn=document.createElement('button');
    btn.className='tab-btn'+(t.id===currentTabId?' active':'');
    btn.dataset.tabId=t.id;
    const nameSpan=document.createElement('span');
    nameSpan.textContent=t.name;
    nameSpan.title='Duplo clique para renomear';
    nameSpan.addEventListener('dblclick',(e)=>{ e.stopPropagation(); startRenameTab(t.id,nameSpan); });
    const icon=document.createElement('span');
    icon.className='tab-icon'; icon.textContent='◈';
    const closeX=document.createElement('span');
    closeX.className='tab-close-x'; closeX.textContent='✕';
    closeX.addEventListener('click',(e)=>closeTab(t.id,e));
    btn.appendChild(icon); btn.appendChild(nameSpan); btn.appendChild(closeX);
    btn.onclick=()=>switchTab(t.id);
    c.appendChild(btn);
  });
  const add=document.createElement('button');
  add.className='add-tab-btn'; add.innerHTML='+'; add.onclick=addNewTab;
  c.appendChild(add);
}
function startRenameTab(tabId,span){
  const t=tabs.find(x=>x.id===tabId); if(!t) return;
  const inp=document.createElement('input');
  inp.value=t.name;
  inp.style.cssText='background:var(--bg-card);border:1px solid var(--cyan-base);color:var(--text-primary);font-family:var(--font-mono);font-size:10px;padding:1px 5px;outline:none;width:100px;border-radius:2px;';
  span.replaceWith(inp);
  inp.focus(); inp.select();
  const commit=()=>{
    const v=inp.value.trim()||t.name;
    t.name=v;
    if(currentTabId===tabId){ document.getElementById('editor-fname').textContent=v+'.md'; document.getElementById('sb-tab').textContent=v; }
    renderTabs();
  };
  inp.addEventListener('blur',commit);
  inp.addEventListener('keydown',e=>{ if(e.key==='Enter') inp.blur(); if(e.key==='Escape'){ inp.value=t.name; inp.blur(); } });
}

// ══ SCROLL SYNC ══
let syncScrollActive=true;
mdEditor.addEventListener('scroll',()=>{
  if(!syncScrollActive) return;
  const pct=mdEditor.scrollTop/(mdEditor.scrollHeight-mdEditor.clientHeight||1);
  const ps=document.getElementById('preview-scroll');
  ps.scrollTop=pct*(ps.scrollHeight-ps.clientHeight);
});

// ══ EXPORT PDF ══
function exportPDF(){
  // Switch to A4 mode, print, switch back
  const wasA4=document.body.classList.contains('a4-mode');
  if(!wasA4) setPreviewMode('a4');
  setTimeout(()=>{
    window.print();
    if(!wasA4) setTimeout(()=>setPreviewMode('html'),500);
  },300);
}

// ══ FIRESTORE LOAD ══
let fsAllDocs=[], fsSelectedId=null;
async function openFsLoad(){
  if(!db){ showToast('error','✕','Firebase não configurado.'); return; }
  document.getElementById('fs-doc-list').innerHTML='<div class="fs-empty">// Carregando documentos...</div>';
  document.getElementById('fs-search-input').value='';
  document.getElementById('btn-load-confirm').disabled=true;
  fsSelectedId=null;
  document.getElementById('fs-load-overlay').classList.add('visible');
  try{
    const snap=await db.collection('dataCore').orderBy('createdAt','desc').limit(100).get();
    fsAllDocs=snap.docs.map(d=>({id:d.id,...d.data(), ts:d.data().createdAt?.toDate?.()??null}));
    renderFsDocs(fsAllDocs);
  }catch(e){
    document.getElementById('fs-doc-list').innerHTML=`<div class="fs-empty">// Erro: ${escH(e.message)}</div>`;
  }
}
function renderFsDocs(docs){
  const list=document.getElementById('fs-doc-list');
  if(!docs.length){ list.innerHTML='<div class="fs-empty">// Nenhum documento encontrado.</div>'; return; }
  const statusMap={'Em construção':'construcao','Conjectura':'conjectura','Erro':'erro'};
  list.innerHTML=docs.map(d=>{
    const cls=statusMap[d.status]||'';
    const dateStr=d.ts?d.ts.toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit',year:'2-digit'}):'—';
    return `<div class="fs-doc-item" data-id="${escH(d.id)}" onclick="selectFsDoc('${escH(d.id)}',this)">
      <span class="fs-doc-title">${escH(d.title||'Sem título')}</span>
      <span class="fs-doc-status ${cls}">${escH(d.status||'')}</span>
      <span class="fs-doc-date">${dateStr}</span>
    </div>`;
  }).join('');
}
function filterFsDocs(q){
  const lq=q.toLowerCase();
  renderFsDocs(fsAllDocs.filter(d=>(d.title||'').toLowerCase().includes(lq)||(d.status||'').toLowerCase().includes(lq)));
  fsSelectedId=null;
  document.getElementById('btn-load-confirm').disabled=true;
}
function selectFsDoc(id,el){
  document.querySelectorAll('.fs-doc-item').forEach(i=>i.classList.remove('selected'));
  el.classList.add('selected');
  fsSelectedId=id;
  document.getElementById('btn-load-confirm').disabled=false;
}
function closeFsLoad(){
  document.getElementById('fs-load-overlay').classList.remove('visible');
}
document.getElementById('fs-load-overlay').addEventListener('click',e=>{ if(e.target===document.getElementById('fs-load-overlay')) closeFsLoad(); });
async function confirmFsLoad(){
  if(!fsSelectedId) return;
  const doc=fsAllDocs.find(d=>d.id===fsSelectedId);
  if(!doc) return;
  // Open in new tab
  addNewTab();
  const cur=tabs.find(t=>t.id===currentTabId);
  if(cur){ cur.name=doc.title||'Documento'; cur.firestoreId=doc.id; renderTabs(); }
  mdEditor.value=doc.content||'';
  document.getElementById('editor-fname').textContent=(doc.title||'Documento')+'.md';
  document.getElementById('sb-tab').textContent=doc.title||'Documento';
  renderMarkdown();
  updateStats(); updateTOC();
  setTimeout(()=>{
    preview.querySelectorAll('pre code:not(.hljs)').forEach(b=>hljs.highlightElement(b));
    if(window.MathJax&&window.MathJax.typesetPromise){
      MathJax.typesetClear([preview]);
      MathJax.typesetPromise([preview]).then(()=>{ wrapLatexBlocks(); setMathDirty(false); }).catch(()=>{});
    }
  }, 150);
  closeFsLoad();
  showToast('success','☁',`"${doc.title}" carregado do Firestore.`);
}

// ══ DIFF ══
let diffFirestoreContent=null;
async function openDiff(){
  const cur=tabs.find(t=>t.id===currentTabId);
  if(!cur?.firestoreId){ showToast('error','⚠','Este documento não foi carregado do Firestore.'); return; }
  if(!db){ showToast('error','✕','Firebase não configurado.'); return; }
  try{
    const snap=await db.collection('dataCore').doc(cur.firestoreId).get();
    if(!snap.exists){ showToast('error','✕','Documento não encontrado.'); return; }
    diffFirestoreContent=snap.data().content||'';
    renderDiff(mdEditor.value, diffFirestoreContent);
    document.getElementById('diff-overlay').style.display='flex';
  }catch(e){ showToast('error','✕','Erro: '+e.message); }
}
function renderDiff(local, remote){
  const lLines=local.split('\n');
  const rLines=remote.split('\n');
  const max=Math.max(lLines.length,rLines.length);
  let html='';
  for(let i=0;i<max;i++){
    const l=lLines[i], r=rLines[i];
    const ln=String(i+1).padStart(4,' ');
    if(l===r){
      html+=`<div style="padding:1px 6px;color:var(--text-muted);"><span style="opacity:.4;user-select:none">${ln} </span>${escH(l??'')}</div>`;
    }else if(l===undefined){
      html+=`<div class="diff-add" style="padding:1px 6px;"><span style="opacity:.4;user-select:none">${ln} + </span>${escH(r)}</div>`;
    }else if(r===undefined){
      html+=`<div class="diff-del" style="padding:1px 6px;"><span style="opacity:.4;user-select:none">${ln} - </span>${escH(l)}</div>`;
    }else{
      html+=`<div class="diff-del" style="padding:1px 6px;"><span style="opacity:.4;user-select:none">${ln} - </span>${escH(l)}</div>`;
      html+=`<div class="diff-add" style="padding:1px 6px;"><span style="opacity:.4;user-select:none">${ln} + </span>${escH(r)}</div>`;
    }
  }
  document.getElementById('diff-content').innerHTML=html||'<div style="color:var(--green-ok);padding:16px">// Documentos idênticos ✓</div>';
}
function closeDiff(){ document.getElementById('diff-overlay').style.display='none'; }
function applyFirestoreVersion(){
  if(!diffFirestoreContent) return;
  if(!confirm('Substituir conteúdo local pela versão do Firestore?')) return;
  mdEditor.value=diffFirestoreContent;
  mdEditor.dispatchEvent(new Event('input'));
  closeDiff();
  showToast('success','☁','Versão do Firestore aplicada.');
}

// Add diff button to commit modal footer area
// (injected after boot to keep HTML clean)
function injectDiffBtn(){
  const cur=tabs.find(t=>t.id===currentTabId);
  const btn=document.getElementById('diff-hdr-btn');
  if(btn) btn.style.display=cur?.firestoreId?'flex':'none';
}

// ══ STATS update with read time ══
function updateStats(){
  const raw=mdEditor.value;
  const w=raw.trim()?raw.trim().split(/\s+/).length:0;
  document.getElementById('stat-words').textContent=w.toLocaleString('pt-BR');
  document.getElementById('stat-chars').textContent=raw.length.toLocaleString('pt-BR');
  document.getElementById('stat-lines').textContent=raw.split('\n').length.toLocaleString('pt-BR');
  document.getElementById('sb-words').textContent=w.toLocaleString('pt-BR');
  document.getElementById('sb-chars').textContent=raw.length.toLocaleString('pt-BR');
  document.getElementById('sb-lines').textContent=raw.split('\n').length.toLocaleString('pt-BR');
  updateReadTime(w);
}

// ══ TOAST ══
let toastT=null;
function showToast(type,icon,msg){
  const el=document.getElementById('toast');
  el.className='show '+(type||'');
  document.getElementById('toast-icon').textContent=icon;
  document.getElementById('toast-msg').textContent=msg;
  clearTimeout(toastT);
  toastT=setTimeout(()=>el.classList.remove('show'),4000);
}

// ══ BOOT ══
function boot(){
  initFirebase();
  buildSettingsUI();
  loadSettings();
  renderTabs();
  const restored=restoreAutoSave();
  if(!restored){ renderMarkdown(); updateStats(); updateTOC(); }
  buildSymbolPanel();
  applyZoom();
  setMathDirty(false);
  pushUndo(); // initial state
  // Inject diff button into header area
  const diffBtnHTML=`<button class="hdr-btn" id="diff-hdr-btn" onclick="openDiff()" title="Comparar com versão salva no Firestore" style="display:none">⇄ DIFF</button>`;
  document.getElementById('btn-confirm-save').parentElement.insertAdjacentHTML('beforebegin',diffBtnHTML);
  // Export PDF button
  const pdfBtnHTML=`<button class="hdr-btn" onclick="exportPDF()" title="Exportar como PDF">⎙ PDF</button>`;
  document.querySelector('.btn-save-main').insertAdjacentHTML('beforebegin',pdfBtnHTML+' ');
  setTimeout(()=>document.getElementById('loading-overlay').classList.add('hidden'),900);
}
window.addEventListener('load',()=>setTimeout(boot,250));
