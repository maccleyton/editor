
// imageLib.js — Biblioteca de Imagens Internas
const imageGallery = [];

export function addImageToGallery(src) {
  imageGallery.push({ src, date: new Date().toISOString() });
  console.log("Imagem adicionada à galeria:", src);
}

export function getImageGallery() {
  return imageGallery;
}

export function renderImageGallery(container) {
  container.innerHTML = '';
  imageGallery.forEach((img, index) => {
    const el = document.createElement('img');
    el.src = img.src;
    el.alt = `Imagem ${index + 1}`;
    el.style.maxWidth = '100px';
    el.style.margin = '4px';
    el.onclick = () => {
      const page = document.querySelector('.sheet .page:last-child');
      const inserted = document.createElement('img');
      inserted.src = img.src;
      inserted.style.maxWidth = '100%';
      page.appendChild(inserted);
    };
    container.appendChild(el);
  });
}
