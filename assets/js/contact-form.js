(function () {
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  var success = document.getElementById("contact-success");
  if (!form || !status || !success) return;

  if (window.jQuery && jQuery.fn.niceSelect) {
    jQuery("#contact-form select.js-native-select").niceSelect("destroy");
  }

  var labels = {
    achat: "Achat d’une propriété",
    renouvellement: "Renouvellement",
    refinancement: "Refinancement",
    capacite: "Capacité d’emprunt",
    autre: "Autre / je ne sais pas encore",
    maintenant: "Le plus tôt possible",
    "3mois": "Dans les 3 prochains mois",
    "6mois": "Dans 3 à 6 mois",
    explore: "J’explore, sans échéance",
    telephone: "Téléphone",
    courriel: "Courriel",
    texte: "Message texte"
  };

  function showStatus(message, ok) {
    status.hidden = false;
    status.textContent = message;
    status.classList.toggle("is-error", !ok);
    status.classList.toggle("is-ok", ok);
    status.focus();
  }

  function markInvalid(name, invalid) {
    var field = form.querySelector('[name="' + name + '"]');
    var wrap = field && field.closest(".contact-field, .contact-consent");
    if (wrap) wrap.classList.toggle("is-invalid", invalid);
  }

  function digits(value) {
    return (String(value).match(/\d/g) || []).length;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    ["firstName", "lastName", "email", "phone", "projectType", "timeline", "consent"].forEach(function (name) {
      markInvalid(name, false);
    });

    var data = new FormData(form);
    if (String(data.get("website") || "").trim()) {
      form.hidden = true;
      success.hidden = false;
      return;
    }

    var firstName = String(data.get("firstName") || "").trim();
    var lastName = String(data.get("lastName") || "").trim();
    var email = String(data.get("email") || "").trim();
    var phone = String(data.get("phone") || "").trim();
    var projectType = String(data.get("projectType") || "");
    var timeline = String(data.get("timeline") || "");
    var contactMethod = String(data.get("contactMethod") || "");
    var message = String(data.get("message") || "").trim();
    var consent = data.get("consent") === "oui";

    var missing = [];
    if (!firstName) missing.push("firstName");
    if (!lastName) missing.push("lastName");
    if (!email || email.indexOf("@") < 1) missing.push("email");
    if (digits(phone) < 10) missing.push("phone");
    if (!projectType) missing.push("projectType");
    if (!timeline) missing.push("timeline");
    if (!consent) missing.push("consent");

    if (missing.length) {
      missing.forEach(function (name) { markInvalid(name, true); });
      showStatus("Certains champs sont à corriger.", false);
      return;
    }

    var button = form.querySelector(".contact-submit");
    button.disabled = true;
    button.textContent = "Envoi en cours…";

    var payload = {
      Prénom: firstName,
      Nom: lastName,
      Courriel: email,
      Téléphone: phone,
      Projet: labels[projectType] || projectType,
      Échéance: labels[timeline] || timeline,
      "Moyen de contact": labels[contactMethod] || contactMethod,
      Message: message,
      _subject: "Demande d’appel · Marie-Claude Fisette",
      _template: "table",
      _captcha: "false"
    };

    fetch("https://formsubmit.co/ajax/mc.fisette@groupeih.ca", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        if (!response.ok) throw new Error("send-failed");
        return response.json();
      })
      .then(function () {
        form.hidden = true;
        success.hidden = false;
      })
      .catch(function () {
        var subject = encodeURIComponent("Demande d’appel · Marie-Claude Fisette");
        var body = encodeURIComponent(
          [
            "Prénom: " + firstName,
            "Nom: " + lastName,
            "Courriel: " + email,
            "Téléphone: " + phone,
            "Projet: " + (labels[projectType] || projectType),
            "Échéance: " + (labels[timeline] || timeline),
            "Moyen de contact: " + (labels[contactMethod] || contactMethod),
            "",
            message
          ].join("\n")
        );
        showStatus("L’envoi automatique n’a pas fonctionné. Votre logiciel de courriel va s’ouvrir pour transmettre la demande, ou téléphonez au 819 272-8422.", false);
        window.location.href = "mailto:mc.fisette@groupeih.ca?subject=" + subject + "&body=" + body;
      })
      .finally(function () {
        button.disabled = false;
        button.textContent = "Envoyer ma demande";
      });
  });
})();
