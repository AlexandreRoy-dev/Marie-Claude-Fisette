export function initForm() {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.classList.remove("is-ok", "is-error");

    const trap = form.querySelector("[name='company_website']");
    if (trap && trap.value.trim()) {
      status.textContent = "Message reçu.";
      status.classList.add("is-ok");
      form.reset();
      return;
    }

    const data = new FormData(form);
    const required = ["name", "email", "project_type"];
    const missing = required.some((key) => !String(data.get(key) || "").trim());
    const email = String(data.get("email") || "");

    if (missing || !email.includes("@")) {
      status.textContent = "Indiquez votre nom, un courriel valide et le type de projet.";
      status.classList.add("is-error");
      return;
    }

    const subject = encodeURIComponent("Appel Cabinet");
    const body = encodeURIComponent(
      [
        `Nom: ${data.get("name")}`,
        `Courriel: ${data.get("email")}`,
        `Téléphone: ${data.get("phone") || "non fourni"}`,
        `Type de projet: ${data.get("project_type")}`,
        "",
        data.get("message") || ""
      ].join("\n")
    );

    status.textContent = "Ouverture de votre courriel. Nous lisons le dossier ensuite.";
    status.classList.add("is-ok");
    window.location.href = `mailto:mc.fisette@groupeih.ca?subject=${subject}&body=${body}`;
  });
}
