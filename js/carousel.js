/* =========================================================================
   CCSS — carousel.js
   Vanilla testimonial carousel: auto-rotates every 6s, prev/next arrows,
   dot indicators, pauses on hover, supports keyboard navigation.
   ========================================================================= */

(function () {
  "use strict";

  const ROTATE_INTERVAL_MS = 6000;

  /* Initialise a single carousel root element */
  function initCarousel(root) {
    const track = root.querySelector(".carousel__track");
    const slides = Array.from(root.querySelectorAll(".carousel__slide"));
    const prevBtn = root.querySelector(".carousel__btn--prev");
    const nextBtn = root.querySelector(".carousel__btn--next");
    const dotsWrap = root.querySelector(".carousel__dots");

    if (!track || slides.length === 0) return;

    let index = 0;
    let timer = null;

    /* Build dot indicators (one per slide) */
    const dots = slides.map((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel__dot";
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      if (dotsWrap) dotsWrap.appendChild(dot);
      return dot;
    });

    /* Apply the current index to track + dots */
    function render() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
      slides.forEach((slide, i) => {
        slide.setAttribute("aria-hidden", String(i !== index));
      });
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      render();
      restartTimer();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function startTimer() {
      stopTimer();
      timer = window.setInterval(next, ROTATE_INTERVAL_MS);
    }

    function stopTimer() {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function restartTimer() {
      stopTimer();
      startTimer();
    }

    if (nextBtn) nextBtn.addEventListener("click", next);
    if (prevBtn) prevBtn.addEventListener("click", prev);

    /* Pause auto-rotation while a user is interacting */
    root.addEventListener("mouseenter", stopTimer);
    root.addEventListener("mouseleave", startTimer);
    root.addEventListener("focusin", stopTimer);
    root.addEventListener("focusout", startTimer);

    /* Keyboard arrows when carousel area is focused */
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    });

    render();
    startTimer();
  }

  function init() {
    document.querySelectorAll("[data-carousel]").forEach(initCarousel);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
