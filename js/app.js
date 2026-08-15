
(() => {
  "use strict";

  const EVENT_DATE = new Date("2026-11-21T14:00:00-06:00").getTime();

  function updateCountdown() {
    const diff = EVENT_DATE - Date.now();

    const elements = {
      days: document.querySelector("[data-days]"),
      hours: document.querySelector("[data-hours]"),
      minutes: document.querySelector("[data-minutes]"),
      seconds: document.querySelector("[data-seconds]")
    };

    if (diff <= 0) {
      Object.values(elements).forEach((element) => {
        if (element) {
          element.textContent = "00";
        }
      });

      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    if (elements.days) {
      elements.days.textContent = String(days).padStart(2, "0");
    }

    if (elements.hours) {
      elements.hours.textContent = String(hours).padStart(2, "0");
    }

    if (elements.minutes) {
      elements.minutes.textContent = String(minutes).padStart(2, "0");
    }

    if (elements.seconds) {
      elements.seconds.textContent = String(seconds).padStart(2, "0");
    }
  }

  function initReveal() {
    const elements = document.querySelectorAll(
      ".reveal, .stagger"
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.14
    });

    elements.forEach((element) => {
      observer.observe(element);
    });
  }

  function initScrollProgress() {
    const bar = document.querySelector(".scroll-progress");

    if (!bar) {
      return;
    }

    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        max > 0 ? window.scrollY / max : 0;

      bar.style.width =
        `${Math.min(progress * 100, 100)}%`;
    };

    update();

    window.addEventListener("scroll", update, {
      passive: true
    });

    window.addEventListener("resize", update);
  }

  function initSmoothScroll() {
    document.querySelectorAll("[data-scroll]").forEach((link) => {
      link.addEventListener("click", (event) => {
        const selector = link.getAttribute("data-scroll");
        const target = document.querySelector(selector);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initReveal();
    initScrollProgress();
    initSmoothScroll();

    updateCountdown();

    window.setInterval(updateCountdown, 1000);
  });
})();
