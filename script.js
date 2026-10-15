/* ============================================================
   Yogue-se · A Professora — interações (leve, mobile-first)
   ============================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1 · revelar ao entrar na tela ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- 2 · o pato que reage ao rolar ---------- */
  var duckHolder = document.querySelector("[data-scroll-duck]");
  var companion = document.querySelector("[data-companion]");
  var hero = document.querySelector(".hero");
  var ticking = false;

  function clamp(n, min, max) { return n < min ? min : n > max ? max : n; }

  function onScroll() {
    var vh = window.innerHeight;

    if (duckHolder && !reduce) {
      var r = duckHolder.getBoundingClientRect();
      // 0 quando entra por baixo, 1 quando sai por cima
      var p = clamp((vh - r.top) / (vh + r.height), 0, 1);
      var tilt = (p - 0.5) * 2; // -1 .. 1
      duckHolder.style.transform =
        "translateY(" + tilt * 16 + "px) rotate(" + tilt * 4 + "deg)";
    }

    if (companion) {
      var heroH = hero ? hero.offsetHeight : vh;
      var nearBottom = window.scrollY + vh > document.body.scrollHeight - 260;
      var show = window.scrollY > heroH * 0.72 && !nearBottom;
      companion.classList.toggle("is-shown", show);
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick, { passive: true });
  onScroll();
})();
