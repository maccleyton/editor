
// exportLib.js — Biblioteca de Exportações Internas
const exportGallery = [];

export function saveExportedFile(name, type, content) {
  exportGallery.push({ name, type, content, date: new Date().toISOString() });
  console.log("Arquivo exportado salvo na galeria:", name);
}

export function getExportGallery() {
  return exportGallery;
}

export function renderExportGallery(container) {
  container.innerHTML = '';
  exportGallery.forEach((file, index) => {
    const el = document.createElement('div');
    el.textContent = `${file.name} (${file.type}) — ${new Date(file.date).toLocaleString()}`;
    el.style.marginBottom = '6px';
    const btn = document.createElement('button');
    btn.textContent = 'Baixar';
    btn.onclick = () => {
      const blob = new Blob([file.content], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = file.name;
      link.click();
    };
    el.appendChild(btn);
    container.appendChild(el);
  });
}
