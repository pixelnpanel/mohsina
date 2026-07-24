// Mobile nav toggle
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');

navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Header shadow on scroll
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Everything below is progressive enhancement. Without IntersectionObserver the
// .reveal class is never applied, so content stays visible rather than stuck at
// opacity 0.
if ('IntersectionObserver' in window) {

  // Reveal sections as they enter the viewport
  const revealTargets = document.querySelectorAll('.section > .wrap, .hero-inner');
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => revealObserver.observe(el));

  // Highlight the nav link for the section currently in view
  const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(section => spyObserver.observe(section));

  // Staggered fade-up for grid items, timeline entries, publications, contact cards
  const staggerGroups = document.querySelectorAll(
    '.cards, .timeline, .pubs, .contact-grid'
  );
  staggerGroups.forEach(group => {
    const items = [...group.children];
    items.forEach(item => item.classList.add('reveal-item'));

    const groupObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        items.forEach((item, i) => {
          item.style.transitionDelay = (i * 80) + 'ms';
          item.classList.add('visible');
        });
        obs.disconnect();
      });
    }, { threshold: 0.15 });

    groupObserver.observe(group);
  });

  // Count-up for the hero stat numbers
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stats = document.querySelectorAll('.stat-num');

  const runCount = (el) => {
    const raw = el.textContent.trim();
    const match = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return;
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const decimals = (match[1].split('.')[1] || '').length;
    const duration = 1100;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals) + suffix;
    };
    requestAnimationFrame(tick);
  };

  if (reduceMotion) {
    // leave numbers as authored
  } else {
    const statObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        runCount(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    stats.forEach(s => statObserver.observe(s));
  }
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
