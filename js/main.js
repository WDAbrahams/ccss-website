/* =========================================================================
   CCSS — main.js
   Site-wide behaviour: navbar scroll state, mobile menu toggle,
   scroll-triggered fade-ins, current year in footer.
   ========================================================================= */

(function () {
  "use strict";

  /* -------------------------------------------------------------------------
     Highlight the active navbar link based on current page filename
     ------------------------------------------------------------------------- */
  function setActiveNavLink() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll("[data-nav-link]");
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === path) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* -------------------------------------------------------------------------
     Toggle the mobile hamburger menu (panel slides down)
     ------------------------------------------------------------------------- */
  function setupMobileMenu() {
    const toggle = document.querySelector(".navbar__toggle");
    const panel = document.querySelector(".navbar__panel");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", () => {
      const isOpen = toggle.classList.toggle("is-open");
      panel.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the panel after tapping a link
    panel.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        toggle.classList.remove("is-open");
        panel.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -------------------------------------------------------------------------
     Add a translucent/blurred background to the navbar when the page is scrolled
     ------------------------------------------------------------------------- */
  function setupNavbarScroll() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    const update = () => {
      navbar.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* -------------------------------------------------------------------------
     IntersectionObserver: fade in elements as they enter the viewport
     ------------------------------------------------------------------------- */
  function setupFadeIns() {
    const targets = document.querySelectorAll(".fade-in");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /* -------------------------------------------------------------------------
     Insert the current year into any [data-current-year] elements in the footer
     ------------------------------------------------------------------------- */
  function setCurrentYear() {
    const year = new Date().getFullYear();
    document
      .querySelectorAll("[data-current-year]")
      .forEach((el) => (el.textContent = String(year)));
  }

  /* -------------------------------------------------------------------------
     Smooth-scroll same-page anchor links (e.g. on the home page)
     ------------------------------------------------------------------------- */
  function setupAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  /* -------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------- */
  function init() {
    setActiveNavLink();
    setupMobileMenu();
    setupNavbarScroll();
    setupFadeIns();
    setCurrentYear();
    setupAnchorScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /* === Future integrations (newsletter, chatbot, booking widget) ===
     Add new integrations here. Keep each one in its own function. */
})();
