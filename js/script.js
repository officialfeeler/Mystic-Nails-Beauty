/* =============================================================
   MYSTIC NAILS & BEAUTY — Script
============================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader && preloader.classList.add('hidden'), 300);
  });
  // fallback in case 'load' already fired
  if (document.readyState === 'complete') {
    setTimeout(() => preloader && preloader.classList.add('hidden'), 300);
  }

  /* ---------- Sticky header ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  const closeNav = () => {
    navToggle.classList.remove('open');
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  sections.forEach(section => spyObserver.observe(section));

  /* ---------- Reveal on scroll ---------- */
  const revealItems = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item, i) => {
    item.style.transitionDelay = `${(i % 3) * 0.12}s`;
    revealObserver.observe(item);
  });

  /* ---------- Testimonials slider ---------- */
  const testiTrack = document.getElementById('testiTrack');
  const testiDotsWrap = document.getElementById('testiDots');
  const testiCards = testiTrack ? Array.from(testiTrack.querySelectorAll('.testi-card')) : [];
  let testiIndex = 0;
  let testiTimer;

  if (testiCards.length) {
    testiCards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Ver testimonio ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => showTesti(i));
      testiDotsWrap.appendChild(dot);
    });

    function showTesti(index) {
      testiCards[testiIndex].classList.remove('active');
      testiDotsWrap.children[testiIndex].classList.remove('active');
      testiIndex = (index + testiCards.length) % testiCards.length;
      testiCards[testiIndex].classList.add('active');
      testiDotsWrap.children[testiIndex].classList.add('active');
    }

    function startAutoplay() {
      clearInterval(testiTimer);
      testiTimer = setInterval(() => showTesti(testiIndex + 1), 5000);
    }

    testiDotsWrap.addEventListener('click', startAutoplay);
    startAutoplay();
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
