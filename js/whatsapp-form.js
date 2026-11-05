/*
 * Formulário de agendamento: monta a mensagem e abre o WhatsApp da Tarsila.
 */
(function () {
  "use strict";
  var WHATSAPP = "5598986083965";
  var form = document.getElementById("agendaForm");
  if (!form) return;
  var feedback = document.getElementById("formFeedback");

  function v(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var tutor = v("tutor");
    var pet = v("pet");
    if (!tutor || !pet) {
      feedback.className = "form-feedback erro";
      feedback.textContent = "Preencha o seu nome e o nome do pet 🐾";
      return;
    }
    var linhas = ["Olá, Tarsila! Tenho interesse no seu serviço médico veterinário.", "", "*Tutor(a):* " + tutor, "*Pet:* " + pet];
    if (v("especie")) linhas.push("*Espécie:* " + v("especie"));
    if (v("servico")) linhas.push("*Atendimento:* " + v("servico"));
    if (v("bairro")) linhas.push("*Bairro/cidade:* " + v("bairro"));
    if (v("mensagem")) linhas.push("*Mensagem:* " + v("mensagem"));

    feedback.className = "form-feedback ok";
    feedback.textContent = "Abrindo o WhatsApp... 💕";
    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(linhas.join("\n")), "_blank", "noopener");
    form.reset();
  });
})();
