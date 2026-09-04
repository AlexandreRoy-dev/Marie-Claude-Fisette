export function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const overlay = document.querySelector(".overlay");
  if (!toggle || !overlay) return;

  const setOpen = (open) => {
    toggle.classList.toggle("is-open", open);
    overlay.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    overlay.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  };

  toggle.addEventListener("click", () => {
    setOpen(!toggle.classList.contains("is-open"));
  });

  overlay.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}
