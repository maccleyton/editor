
// articleLib.js

// Lista de artigos de exemplo em Markdown
const articles = [
  {
    title: "Guia de Estudo — Álgebra",
    content: `# Álgebra Básica

A álgebra é um ramo da matemática que lida com símbolos e regras para manipular esses símbolos.

## Tópicos
- Expressões
- Equações
- Inequações

**Exemplo:**

Seja a equação: `x + 2 = 5`

A solução é `x = 3``,
    date: "2025-10-21"
  },
  {
    title: "Plano de Estudos — Física",
    content: `# Física Clássica

A física clássica descreve os fenômenos naturais em escalas macroscópicas.

## Conteúdo
- Cinemática
- Dinâmica
- Termodinâmica

**Importante:**

A segunda lei de Newton: `F = ma``,
    date: "2025-10-21"
  }
];

// Função para renderizar os artigos em um container HTML
export function renderArticleLibrary(container){
  container.innerHTML = '';
  articles.forEach(article => {
    const block = document.createElement('div');
    block.style.padding = '12px';
    block.style.marginBottom = '16px';
    block.style.background = '#fff';
    block.style.color = '#000';
    block.style.borderRadius = '6px';
    block.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';

    const title = document.createElement('h2');
    title.textContent = article.title;
    block.appendChild(title);

    const date = document.createElement('small');
    date.textContent = `Publicado em ${article.date}`;
    block.appendChild(date);

    const content = document.createElement('div');
    content.innerHTML = marked.parse(article.content);
    block.appendChild(content);

    container.appendChild(block);
  });
}
