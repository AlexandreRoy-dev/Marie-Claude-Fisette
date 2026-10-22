/* Apparitions douces au défilement. Le contenu reste visible si ce script ne se charge pas. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  var sel = [
    '.section .head', '.section h2', '.section .eyebrow', '.split__side', '.card', '.band__img', '.band__caption',
    '.side-photo', '.about__photo', '.contact__photo', '#questions details', '#a-propos .btn', '.steps li'
  ].join(',');
  var els = Array.prototype.slice.call(document.querySelectorAll(sel)).filter(function (el) {
    return !el.closest('.hero') && !el.parentElement.closest('[data-reveal]');
  });
  els.forEach(function (el) {
    el.setAttribute('data-reveal', el.matches('figure, picture') ? 'fade' : 'up');
    var sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
    if (el.matches('.card, details, .steps li')) el.style.transitionDelay = Math.min(sib, 4) * 80 + 'ms';
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  document.documentElement.classList.add('reveal-ready');
  els.forEach(function (el) { io.observe(el); });
})();
