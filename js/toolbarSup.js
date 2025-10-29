/* === Toolbar Commands === */
document.addEventListener("DOMContentLoaded", () => {
  // Alternância de modo claro/escuro
  const modeToggle = document.querySelector('[data-cmd="modeBtn"]');
  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
    });
  }

  // Listener geral para botões com data-cmd
  document.querySelectorAll('[data-cmd]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const cmd = btn.getAttribute('data-cmd');
      const editable = document.querySelector('.page-wrap:focus') || document.querySelector('.page-wrap');
      if (!editable) return;

      switch (cmd) {
        case 'printBtn':
          window.print();
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