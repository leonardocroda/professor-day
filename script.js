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
  var ticking = false;

  function clamp(n, min, max) { return n < min ? min : n > max ? max : n; }

  function onScroll() {
    var vh = window.innerHeight;

    // o pato sobe/desce suavemente conforme a seção atravessa a tela.
    // só translação — a imagem nunca é distorcida nem girada.
    if (duckHolder && !reduce) {
      var r = duckHolder.getBoundingClientRect();
      var p = clamp((vh - r.top) / (vh + r.height), 0, 1); // 0 entra por baixo · 1 sai por cima
      duckHolder.style.transform = "translateY(" + (p - 0.5) * 26 + "px)";
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
