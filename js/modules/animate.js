const EASE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

export function initAnimate() {
  const nodes = [...document.querySelectorAll(".anim-in")];
  if (!nodes.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    nodes.forEach((node) => node.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  nodes.forEach((node) => {
    node.style.setProperty("--ease", EASE);
    io.observe(node);
  });
}
