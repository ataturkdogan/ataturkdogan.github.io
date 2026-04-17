'use strict';

/* ─────────────────────────────────────────────────────────
   1. NAVBAR — scroll state + active link tracking
   ───────────────────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const sections  = Array.from(document.querySelectorAll('section[id]'));
const navLinks  = Array.from(document.querySelectorAll('.nav-links a'));

function updateNavbar() {
  // Opaque background once the user scrolls past hero tag area
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Highlight the nav link whose section is currently in view
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar(); // run once on load


/* ─────────────────────────────────────────────────────────
   2. SCROLL REVEALS — IntersectionObserver on .reveal
   ───────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -56px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ─────────────────────────────────────────────────────────
   3. HERO PARALLAX — mouse-move depth on 3D card + orbs
   ───────────────────────────────────────────────────────── */
const hero      = document.getElementById('hero');
const heroCard  = document.getElementById('heroCard3d');
const orbs      = Array.from(document.querySelectorAll('.orb'));

let rafPending = false;
let mouseX = 0, mouseY = 0;

function applyParallax() {
  rafPending = false;
  if (!heroCard) return;

  const rotX =  mouseY * -8;
  const rotY =  mouseX *  12;

  heroCard.style.transform =
    `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-18px)`;

  orbs.forEach((orb, i) => {
    const f = (i + 1) * 0.009;
    orb.style.transform = `translate(${-mouseX * 28 * f}px, ${-mouseY * 18 * f}px)`;
  });
}

if (hero) {
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    mouseX = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2);
    mouseY = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2);

    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(applyParallax);
    }
  }, { passive: true });

  hero.addEventListener('mouseleave', () => {
    mouseX = 0; mouseY = 0;
    requestAnimationFrame(() => {
      if (heroCard) heroCard.style.transform = '';
      orbs.forEach(orb => { orb.style.transform = ''; });
    });
  });
}


/* ─────────────────────────────────────────────────────────
   4. SMOOTH SCROLL — anchor clicks with navbar offset
   ───────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id     = anchor.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = target.offsetTop - 80;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});


/* ─────────────────────────────────────────────────────────
   5. MOBILE NAV — hamburger toggle
   ───────────────────────────────────────────────────────── */
const navToggle  = document.getElementById('navToggle');
const navLinksList = document.getElementById('navLinks');

if (navToggle && navLinksList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinksList.classList.toggle('nav-open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on link click
  navLinksList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksList.classList.remove('nav-open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      navLinksList.classList.remove('nav-open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}
