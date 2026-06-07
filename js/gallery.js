/* =========================================================================
   CCSS — gallery.js
   Lightbox overlay: opens fullscreen image when a gallery item is clicked,
   supports prev/next, ESC to close, click-outside-to-close.
   The masonry layout itself is handled by CSS columns in styles.css.
   ========================================================================= */

(function () {
  "use strict";

  /* Read the list of gallery items and wire up the lightbox controls */
  function init() {
    const items = Array.from(document.querySelectorAll(".gallery__item"));
    const lightbox = document.querySelector("[data-lightbox]");
    if (items.length === 0 || !lightbox) return;

    const lightboxImg = lightbox.querySelector(".lightbox__img");
    const closeBtn = lightbox.querySelector(".lightbox__close");
    const prevBtn = lightbox.querySelector(".lightbox__prev");
    const nextBtn = lightbox.querySelector(".lightbox__next");

    let currentIndex = 0;

    /* Pull the full-size source from the clicked item */
    function showAt(index) {
      currentIndex = (index + items.length) % items.length;
      const item = items[currentIndex];
      const img = item.querySelector("img");
      const fullSrc =
        item.getAttribute("data-full") ||
        img?.getAttribute("data-full") ||
        img?.getAttribute("src") ||
        "";
      const alt = img?.getAttribute("alt") || "";
      lightboxImg.setAttribute("src", fullSrc);
      lightboxImg.setAttribute("alt", alt);
    }

    function open(index) {
      showAt(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function close() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    function next() { showAt(currentIndex + 1); }
    function prev() { showAt(currentIndex - 1); }

    items.forEach((item, i) => {
      item.addEventListener("click", () => open(i));
    });

    if (closeBtn) closeBtn.addEventListener("click", close);
    if (nextBtn) nextBtn.addEventListener("click", next);
    if (prevBtn) prevBtn.addEventListener("click", prev);

    /* Click on the dark backdrop (but not the image or buttons) closes */
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });

    /* Keyboard: Esc to close, arrow keys to navigate */
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
