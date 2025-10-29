document.addEventListener("DOMContentLoaded", () => {
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
});


document.addEventListener("DOMContentLoaded", () => {
  const modeToggle = document.querySelector('[data-cmd="modeBtn"]');

  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
    });
  }
});

