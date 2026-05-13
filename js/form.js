/* =========================================================================
   CCSS — form.js
   Contact form: client-side validation, fetch() submission to Web3Forms,
   inline success/error messages, double-submit prevention.
   ========================================================================= */

(function () {
  "use strict";

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_RE = /^[+\d][\d\s\-().]{6,}$/;

  /* Validate one form field; returns true if valid */
  function validateField(field) {
    const input = field.querySelector("input, textarea");
    if (!input) return true;

    const value = input.value.trim();
    let valid = true;

    if (input.required && value === "") {
      valid = false;
    } else if (input.type === "email" && value !== "" && !EMAIL_RE.test(value)) {
      valid = false;
    } else if (input.type === "tel" && value !== "" && !PHONE_RE.test(value)) {
      valid = false;
    }

    field.classList.toggle("is-invalid", !valid);
    return valid;
  }

  /* Validate the whole form; returns true if every field is valid */
  function validateForm(form) {
    const fields = form.querySelectorAll(".form__field");
    let allValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) allValid = false;
    });
    return allValid;
  }

  /* Show a success or error status message under the form */
  function setStatus(statusEl, message, kind) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.remove("is-success", "is-error");
    if (kind) statusEl.classList.add(kind);
  }

  function init() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const statusEl = form.querySelector(".form__status");

    /* Re-validate a field as the user fixes it */
    form.querySelectorAll(".form__field input, .form__field textarea").forEach((input) => {
      input.addEventListener("input", () => {
        const field = input.closest(".form__field");
        if (field && field.classList.contains("is-invalid")) {
          validateField(field);
        }
      });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      setStatus(statusEl, "", null);

      if (!validateForm(form)) {
        setStatus(statusEl, "Please fix the highlighted fields and try again.", "is-error");
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalLabel = submitBtn.textContent;
        submitBtn.textContent = "Sending…";
      }

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });
        const data = await response.json().catch(() => ({}));

        if (response.ok && data.success !== false) {
          setStatus(
            statusEl,
            "Thanks — your message has been sent. We'll be in touch shortly.",
            "is-success"
          );
          form.reset();
        } else {
          const msg = data.message || "Something went wrong. Please try again, or email us directly.";
          setStatus(statusEl, msg, "is-error");
        }
      } catch (err) {
        setStatus(
          statusEl,
          "Network error. Please check your connection and try again.",
          "is-error"
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.originalLabel || "Send message";
        }
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
