document.addEventListener("DOMContentLoaded", () => {
  // Alternância de modo claro/escuro
  const modeToggle = document.querySelector('[data-cmd="modeBtn"]');
  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
    });
  }

  // Alternância entre modo livro e modo web
  const bookBtn = document.querySelector('[data-cmd="bookMode"]');
  const webBtn = document.querySelector('[data-cmd="webMode"]');
  const pages = document.querySelectorAll(".page, .sheet");

  function setBookMode() {
    pages.forEach(page => {
      page.style.width = "794px";
      page.style.height = "1123px";
    });
    document.body.classList.add("book-mode");
    document.body.classList.remove("web-mode");
  }

  function setWebMode() {
    pages.forEach(page => {
      page.style.width = "1123px";
      page.style.height = "794px";
    });
    document.body.classList.add("web-mode");
    document.body.classList.remove("book-mode");
  }

  if (bookBtn) bookBtn.addEventListener("click", setBookMode);
  if (webBtn) webBtn.addEventListener("click", setWebMode);

  // Listener geral para todos os botões com data-cmd
  document.querySelectorAll('[data-cmd]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const cmd = btn.getAttribute('data-cmd');
      const editable = document.querySelector('.page-wrap:focus') || document.querySelector('.page-wrap');
      if (!editable) return;

      switch (cmd) {
        case 'printBtn':
          window.print();
          break;
        case 'newBtn':
          editable.innerHTML = '';
          break;
        case 'openBtn':
          openMd(); // função já existente
          break;
        case 'saveBtn':
          saveMd(); // função já existente
          break;
        case 'saveAsBtn':
          saveMd({ saveAs: true }); // função já existente
          break;
        case 'insertQuote':
          document.execCommand('formatBlock', false, 'blockquote');
          break;
        case 'insertHorizontalRule':
          document.execCommand('insertHorizontalRule');
          break;
        case 'insertPageBreak':
          editable.innerHTML += '<div class="page-break"></div>';
          break;
        case 'clearFormat':
          document.execCommand('removeFormat');
          break;
        case 'indentIncrease':
          document.execCommand('indent');
          break;
        case 'indentDecrease':
          document.execCommand('outdent');
          break;
        case 'insertLatexBtn':
          editable.innerHTML += '<div class="latex">\\[ x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a} \\]</div>';
          break;
        case 'insertCodeBtn':
          editable.innerHTML += '<pre><code>// código aqui</code></pre>';
          break;
        case 'insertTable':
          editable.innerHTML += '<table><tr><th>Coluna 1</th><th>Coluna 2</th></tr><tr><td>Valor 1</td><td>Valor 2</td></tr></table>';
          break;
        case 'localImageBtn':
          insertLocalImage(); // função já existente
          break;
        case 'contentCopy':
          await navigator.clipboard.writeText(window.getSelection().toString());
          break;
        case 'contentCut':
          await navigator.clipboard.writeText(window.getSelection().toString());
          document.execCommand('delete');
          break;
        case 'contentPaste':
          try {
            const text = await navigator.clipboard.readText();
            document.execCommand('insertText', false, text);
          } catch (err) {
            alert('Permissão de colar negada pelo navegador.');
          }
          break;
        case 'selectAll':
          document.execCommand('selectAll');
          break;
        default:
          try {
            document.execCommand(cmd, false, null);
          } catch (e) {
            console.warn('Comando não suportado:', cmd);
          }
      }

      editable.focus();
    });
  });
});