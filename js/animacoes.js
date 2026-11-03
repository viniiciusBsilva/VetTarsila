/*
 * Animações gerais: tela de carregamento, menu, patinhas e corações subindo no banner,
 * parallax dos blobs com o mouse e revelação dos blocos ao rolar.
 */
(function () {
  "use strict";

  /* ---------- Tela de carregamento ---------- */
  var preloader = document.getElementById("preloader");
  function hidePreloader() {
    if (preloader) preloader.classList.add("is-hidden");
  }
  window.addEventListener("load", function () {
    setTimeout(hidePreloader, 500);
  });
  setTimeout(hidePreloader, 3500);

  /* ---------- Menu ---------- */
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 30);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toggle.addEventListener("click", function () {
    nav.classList.toggle("open");
  });
  document.querySelectorAll("#navLinks a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
    });
  });

  /* ---------- Patinhas e corações subindo no banner ---------- */
  var floaters = document.getElementById("floaters");
  if (floaters) {
    var icones = ["fa-paw", "fa-heart", "fa-paw", "fa-bone", "fa-heart"];
    for (var i = 0; i < 16; i++) {
      var f = document.createElement("i");
      f.className = "fas " + icones[i % icones.length] + " floater" + (i % 3 === 0 ? " lilas" : "");
      f.style.left = Math.round(Math.random() * 100) + "%";
      f.style.fontSize = 14 + Math.round(Math.random() * 18) + "px";
      f.style.animationDuration = 12 + Math.random() * 12 + "s";
      f.style.animationDelay = -Math.random() * 20 + "s";
      floaters.appendChild(f);
    }
  }

  /* ---------- Parallax dos blobs ---------- */
  var hero = document.getElementById("inicio");
  var blobs = document.querySelectorAll(".blob[data-depth]");
  if (hero && window.matchMedia("(pointer: fine)").matches) {
    hero.addEventListener("mousemove", function (e) {
      var x = e.clientX / window.innerWidth - 0.5;
      var y = e.clientY / window.innerHeight - 0.5;
      blobs.forEach(function (b) {
        var d = parseFloat(b.getAttribute("data-depth")) || 10;
        b.style.translate = (x * d).toFixed(1) + "px " + (y * d).toFixed(1) + "px";
      });
    });
  }

  /* ---------- Revelação ao rolar ---------- */
  var alvos = document.querySelectorAll("[data-anim]");
  if (!("IntersectionObserver" in window)) {
    alvos.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  alvos.forEach(function (el) {
    io.observe(el);
  });
})();
