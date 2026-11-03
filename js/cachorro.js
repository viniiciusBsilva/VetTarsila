/*
 * Cachorrinho interativo do banner.
 * Parado: respira, pisca e abana o rabo devagar (CSS).
 * Com carinho (mouse ou dedo passando por ele): fica feliz, fecha os olhos, abana o rabo
 * rápido, mostra a língua e solta corações e patinhas. Um contador soma os carinhos.
 */
(function () {
  "use strict";
  var dog = document.getElementById("dog");
  var wrap = document.getElementById("dogWrap");
  var fx = document.getElementById("fxLayer");
  var bubble = document.getElementById("dogBubble");
  var counter = document.getElementById("dogCounter");
  if (!dog || !wrap) return;

  // No celular, a dica fala em tocar (não existe mouse)
  var hint = document.querySelector(".dog-hint");
  if (hint && window.matchMedia("(pointer: coarse)").matches) {
    hint.textContent = "Toque ou deslize o dedo no cachorrinho";
  }

  var FRASE_INICIAL = "Faz carinho em mim! 🐾";
  var FRASES_FELIZ = ["Obaaa! 💕", "Que carinho bom! 🥰", "Mais, mais! 🐾", "Você é demais! 💖", "Hmm, que delícia! 😍"];
  var FRASES_PARADO = ["Me dá carinho? 🥺", "Faz carinho em mim! 🐾", "Tô aqui, ó! 🐶"];

  var happyTimer = null;
  var petting = false;
  var lastFx = 0;
  var lastPt = null;
  var dist = 0;
  var count = 0;
  var lastInteraction = Date.now();

  function rand(a, b) {
    return a + Math.random() * (b - a);
  }

  function setBubble(text) {
    if (bubble.textContent === text) return;
    bubble.textContent = text;
    bubble.classList.remove("troca");
    void bubble.offsetWidth; // reinicia a animação
    bubble.classList.add("troca");
  }

  function point(e) {
    var r = wrap.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  // Corações e patinhas saindo do ponto do carinho
  function spawn(x, y, n) {
    for (var i = 0; i < n; i++) {
      var el = document.createElement("i");
      var tipo = Math.random();
      if (tipo < 0.6) el.className = "fas fa-heart fx";
      else if (tipo < 0.8) el.className = "fas fa-heart fx lilas";
      else el.className = "fas fa-paw fx paw";
      el.style.left = x + rand(-10, 10) + "px";
      el.style.top = y + rand(-10, 10) + "px";
      el.style.fontSize = rand(16, 30) + "px";
      el.style.setProperty("--dx", rand(-70, 70).toFixed(0) + "px");
      el.style.setProperty("--rot", rand(-40, 40).toFixed(0) + "deg");
      el.style.animationDelay = i * 0.06 + "s";
      fx.appendChild(el);
      setTimeout(function (node) {
        return function () {
          node.remove();
        };
      }(el), 1600 + i * 60);
    }
  }

  function hop() {
    wrap.classList.remove("hop");
    void wrap.offsetWidth;
    wrap.classList.add("hop");
  }

  function latir() {
    var b = document.createElement("div");
    b.className = "latido";
    b.textContent = "Au au! 🐶";
    wrap.appendChild(b);
    setTimeout(function () {
      b.remove();
    }, 1350);
  }

  function addCarinho() {
    count++;
    counter.textContent = "❤ " + count + (count === 1 ? " carinho" : " carinhos");
    counter.classList.remove("bump");
    void counter.offsetWidth;
    counter.classList.add("bump");
    if (count % 5 === 0) {
      latir();
      hop();
    }
    if (count % 3 === 0) setBubble(FRASES_FELIZ[Math.floor(Math.random() * FRASES_FELIZ.length)]);
  }

  function startHappy() {
    lastInteraction = Date.now();
    clearTimeout(happyTimer);
    dog.classList.add("happy");
    if (!petting) {
      petting = true;
      setBubble(FRASES_FELIZ[Math.floor(Math.random() * FRASES_FELIZ.length)]);
    }
  }

  function stopHappySoon() {
    clearTimeout(happyTimer);
    happyTimer = setTimeout(function () {
      dog.classList.remove("happy");
      petting = false;
      lastPt = null;
      setBubble(FRASE_INICIAL);
    }, 900);
  }

  dog.addEventListener("pointerenter", function () {
    startHappy();
    stopHappySoon();
  });

  dog.addEventListener("pointermove", function (e) {
    startHappy();
    var p = point(e);
    var now = Date.now();
    if (now - lastFx > 110) {
      spawn(p.x, p.y, 1);
      lastFx = now;
    }
    if (lastPt) dist += Math.hypot(p.x - lastPt.x, p.y - lastPt.y);
    lastPt = p;
    if (dist > 140) {
      dist = 0;
      addCarinho();
    }
    stopHappySoon();
  });

  dog.addEventListener("pointerdown", function (e) {
    startHappy();
    var p = point(e);
    spawn(p.x, p.y, 6);
    addCarinho();
    hop();
    stopHappySoon();
  });

  dog.addEventListener("pointerleave", function () {
    lastPt = null;
    stopHappySoon();
  });

  /* ---------- Olhar seguindo o mouse (ou o dedo) ---------- */
  var look = dog.querySelector(".dog-look");
  var pupils = dog.querySelector(".pupils");
  var HEAD_X = 200; // centro da cabeça no desenho (coordenadas do SVG)
  var HEAD_Y = 185;
  var alvo = { x: 0, y: 0 }; // direção desejada (-1 a 1)
  var atual = { x: 0, y: 0 }; // direção atual (suavizada)
  var olhando = false;

  function mirar(clientX, clientY) {
    var r = dog.getBoundingClientRect();
    var escala = r.width / 400;
    var cx = r.left + HEAD_X * escala;
    var cy = r.top + HEAD_Y * escala;
    var dx = clientX - cx;
    var dy = clientY - cy;
    var dist = Math.hypot(dx, dy) || 1;
    var forca = Math.min(1, dist / (220 * escala + 120)); // perto do rosto, olha menos
    alvo.x = (dx / dist) * forca;
    alvo.y = (dy / dist) * forca;
    olhando = true;
  }

  function centralizar() {
    alvo.x = 0;
    alvo.y = 0;
  }

  document.addEventListener("pointermove", function (e) {
    mirar(e.clientX, e.clientY);
  }, { passive: true });
  document.addEventListener("pointerdown", function (e) {
    mirar(e.clientX, e.clientY);
  }, { passive: true });
  document.addEventListener("mouseleave", centralizar);
  window.addEventListener("blur", centralizar);

  function animarOlhar() {
    // aproxima suavemente da direção desejada
    atual.x += (alvo.x - atual.x) * 0.12;
    atual.y += (alvo.y - atual.y) * 0.12;
    if (look && pupils) {
      var hx = atual.x * 9, hy = atual.y * 6; // cabeça desloca até 9px / 6px
      var rot = atual.x * 7; // e inclina até 7 graus
      look.setAttribute("transform", "translate(" + hx.toFixed(2) + " " + hy.toFixed(2) + ") rotate(" + rot.toFixed(2) + " " + HEAD_X + " " + HEAD_Y + ")");
      var px = atual.x * 8, py = atual.y * 7; // olhos andam até 8px dentro do rosto
      pupils.setAttribute("transform", "translate(" + px.toFixed(2) + " " + py.toFixed(2) + ")");
    }
    requestAnimationFrame(animarOlhar);
  }
  requestAnimationFrame(animarOlhar);

  // No celular (sem mouse), depois de um tempo sem toque ele volta a olhar para a frente
  var ultimoToque = 0;
  document.addEventListener("pointerdown", function () {
    ultimoToque = Date.now();
  }, { passive: true });
  if (window.matchMedia("(pointer: coarse)").matches) {
    setInterval(function () {
      if (olhando && !petting && Date.now() - ultimoToque > 4000) {
        olhando = false;
        centralizar();
      }
    }, 1000);
  }

  // Quando ninguém interage, ele chama a atenção de vez em quando
  setInterval(function () {
    if (petting || Date.now() - lastInteraction < 8000) return;
    if (Math.random() < 0.5) {
      latir();
    } else {
      setBubble(FRASES_PARADO[Math.floor(Math.random() * FRASES_PARADO.length)]);
    }
    hop();
  }, 9000);
})();
