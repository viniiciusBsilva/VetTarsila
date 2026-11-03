/*
 * Fotos com reserva: cada <img> aponta para img/fotos/<nome>.jpg e tem data-fallback
 * com a ilustração. Enquanto a foto real não existir, mostra a ilustração.
 * Para trocar, basta salvar a foto com o mesmo nome em img/fotos/.
 * (Este arquivo é carregado no <head>, antes das imagens.)
 */
document.addEventListener(
  "error",
  function (e) {
    var img = e.target;
    if (!img || img.tagName !== "IMG") return;
    var reserva = img.getAttribute("data-fallback");
    if (reserva && img.getAttribute("src") !== reserva) {
      img.setAttribute("src", reserva);
      img.classList.add("ilustracao");
    }
  },
  true
);
