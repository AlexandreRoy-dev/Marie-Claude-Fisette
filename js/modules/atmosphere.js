export function initAtmosphere() {
  const field = document.querySelector("[data-atmosphere-field]");
  if (!field) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (!finePointer) return;

  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;
  let frame = 0;

  const onMove = (event) => {
    const nx = event.clientX / window.innerWidth - 0.5;
    const ny = event.clientY / window.innerHeight - 0.5;
    targetX = nx * 28;
    targetY = ny * 18;
  };

  const tick = () => {
    x += (targetX - x) * 0.035;
    y += (targetY - y) * 0.035;
    field.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    frame = requestAnimationFrame(tick);
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  frame = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("pointermove", onMove);
  };
}
