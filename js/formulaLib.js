
export function renderFormulaLibrary(container){
  const formulas = [
    "E = mc^2",
    "\frac{a}{b} = c",
    "\int_a^b f(x)\,dx",
    "x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}",
    "\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}",
    "\lim_{x \to 0} \frac{\sin x}{x} = 1",
    "f(x) = \begin{cases} x^2 & x \geq 0 \\ -x & x < 0 \end{cases}",
  ];

  formulas.forEach(tex => {
    const div = document.createElement('div');
    div.style.marginBottom = '12px';
    div.innerHTML = `\[${tex}\]`;
    container.appendChild(div);
  });

  if(window.MathJax){
    MathJax.typesetPromise([container]);
  }
}
