/* ============================================================
   MEGHA KUNDU PORTFOLIO — script.js
   GSAP + Locomotive Scroll + Intersection Observer
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. LOCOMOTIVE SCROLL INIT ─────────────────────────────
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector('#smooth-wrapper'),
    smooth: true,
    smoothMobile: false,
    multiplier: 0.9,
    lerp: 0.07,
  });

  // ─── 2. GSAP + SCROLLTRIGGER PROXY ─────────────────────────
  gsap.registerPlugin(ScrollTrigger);

  locoScroll.on('scroll', ScrollTrigger.update);

  ScrollTrigger.scrollerProxy('#smooth-wrapper', {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector('#smooth-wrapper').style.transform ? 'transform' : 'fixed',
  });

  ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

  // ─── 3. CUSTOM CURSOR ──────────────────────────────────────
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)`;
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate3d(calc(${ringX}px - 50%), calc(${ringY}px - 50%), 0)`;
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .pill, .project-card, .contact-card, .glass-card, .nav-link').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hovered'); ring.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hovered'); ring.classList.remove('hovered'); });
  });

  // ─── 4. NAVBAR SCROLL STATE ────────────────────────────────
  const navbar = document.getElementById('navbar');
  locoScroll.on('scroll', ({ scroll }) => {
    navbar.classList.toggle('scrolled', scroll.y > 80);
  });

  // ─── 5. HAMBURGER MENU ─────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

  // ─── 6. SMOOTH NAV SCROLL ──────────────────────────────────
  document.querySelectorAll('[data-scroll-to]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.getAttribute('data-scroll-to');
      locoScroll.scrollTo(target, { offset: -80, duration: 1000, easing: [0.25, 0.0, 0.35, 1.0] });
    });
  });

  // ─── 7. TYPEWRITER EFFECT ──────────────────────────────────
  const typeTarget = document.getElementById('typewriterText');
  const phrases = ['AI/ML Enthusiast', 'Data Science Student', 'NLP Developer', 'Full Stack Developer', 'Problem Solver', 'Research Intern @ NIT'];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const cur = phrases[pi];
    typeTarget.textContent = deleting ? cur.substring(0, ci - 1) : cur.substring(0, ci + 1);
    deleting ? ci-- : ci++;
    let delay = deleting ? 45 : 90;
    if (!deleting && ci === cur.length) { delay = 1800; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 300; }
    setTimeout(type, delay);
  }
  type();

  // ─── BADGE TEXT CYCLING ─────────────────────────────────────
  const badgeEl = document.getElementById('badgeText');
  const badgeTexts = ['Available for Internship', 'Available for Job'];
  let badgeIdx = 0;
  if (badgeEl) {
    setInterval(() => {
      badgeEl.style.opacity = '0';
      badgeEl.style.transform = 'translateY(-8px)';
      setTimeout(() => {
        badgeIdx = (badgeIdx + 1) % badgeTexts.length;
        badgeEl.textContent = badgeTexts[badgeIdx];
        badgeEl.style.opacity = '1';
        badgeEl.style.transform = 'translateY(0)';
      }, 350);
    }, 2800);
    badgeEl.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
  }

  // ─── 8. HERO ENTRANCE ANIMATIONS ───────────────────────────
  gsap.set(['.hero-badge', '.title-line', '.title-name', '.title-role', '.hero-desc', '.hero-actions', '.hero-stats', '.hero-visual', '.scroll-indicator'], { opacity: 0 });

  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .to('.hero-badge',      { y: 0, opacity: 1, duration: 0.7, delay: 0.2 })
    .to('.title-line',      { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
    .to('.title-name',      { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
    .to('.title-role',      { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
    .to('.hero-desc',       { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
    .to('.hero-actions',    { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
    .to('.hero-stats',      { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
    .to('.hero-visual',     { x: 0, opacity: 1, duration: 1.0 }, '-=1.2')
    .to('.scroll-indicator',{ y: 0, opacity: 1, duration: 0.5 }, '-=0.3');

  // Set initial hero states for GSAP from
  gsap.set('.hero-badge',       { y: 30 });
  gsap.set('.title-line',       { y: 40 });
  gsap.set('.title-name',       { y: 40 });
  gsap.set('.title-role',       { y: 20 });
  gsap.set('.hero-desc',        { y: 30 });
  gsap.set('.hero-actions',     { y: 20 });
  gsap.set('.hero-stats',       { y: 20 });
  gsap.set('.hero-visual',      { x: 60 });
  gsap.set('.scroll-indicator', { y: 20 });

  // ─── 9. GSAP SCROLLTRIGGER REVEALS (SYNCED WITH LOCOMOTIVE SCROLLER) ────────
  // All scroll triggers must specify scroller: '#smooth-wrapper' to sync with Locomotive Scroll proxy.

  // Helper function to animate section headers
  document.querySelectorAll('.section-header').forEach((header) => {
    gsap.fromTo(header, 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          scroller: '#smooth-wrapper',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // ABOUT SECTION ANIMATIONS
  if (document.querySelector('#about')) {
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#about .about-grid',
        scroller: '#smooth-wrapper',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
    aboutTl
      .fromTo('.about-text', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' })
      .fromTo('.about-visual', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }, '-=0.6');
  }

  // SKILLS SECTION ANIMATIONS
  if (document.querySelector('#skills')) {
    gsap.fromTo('.skill-category',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#skills .skills-grid',
          scroller: '#smooth-wrapper',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          onComplete: () => {
            // Stagger-fill skill progress bars on scroll-in
            document.querySelectorAll('.skill-fill').forEach((bar, idx) => {
              gsap.to(bar, { 
                width: bar.getAttribute('data-width') + '%', 
                duration: 1.4, 
                ease: 'power2.out',
                delay: idx * 0.1
              });
            });
            // Fill edu cgpa bar
            gsap.to('.edu-bar-fill', { width: '79%', duration: 1.5, ease: 'power2.out' });
          }
        }
      }
    );

    gsap.fromTo('.tech-pills-row',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.tech-pills-row',
          scroller: '#smooth-wrapper',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          onComplete: () => {
            // Animate individual pills beautifully
            gsap.fromTo('.tech-pills .pill',
              { opacity: 0, scale: 0.7 },
              { opacity: 1, scale: 1, duration: 0.5, stagger: 0.04, ease: 'back.out(1.5)' }
            );
          }
        }
      }
    );
  }

  // EXPERIENCE TIMELINE ANIMATIONS
  if (document.querySelector('#experience')) {
    gsap.fromTo('.timeline-item',
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.85,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#experience .timeline',
          scroller: '#smooth-wrapper',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  // PROJECTS SECTION ANIMATIONS — This is where they come in!
  if (document.querySelector('#projects')) {
    gsap.fromTo('.project-card',
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#projects .projects-grid',
          scroller: '#smooth-wrapper',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  // ACHIEVEMENTS & EXTRACURRICULARS ANIMATIONS
  if (document.querySelector('#achievements')) {
    gsap.fromTo('.achievement-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#achievements .achievements-grid',
          scroller: '#smooth-wrapper',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.extra-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#achievements .extras-grid',
          scroller: '#smooth-wrapper',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  // PARTICIPATIONS SECTION ANIMATIONS
  if (document.querySelector('#participations')) {
    gsap.fromTo('.participation-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#participations .participations-grid',
          scroller: '#smooth-wrapper',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  // CONTACT SECTION ANIMATIONS
  if (document.querySelector('#contact')) {
    gsap.fromTo('.contact-content',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#contact .contact-content',
          scroller: '#smooth-wrapper',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  // FOOTER REVEAL
  if (document.querySelector('.footer')) {
    gsap.fromTo('.footer-content',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer',
          scroller: '#smooth-wrapper',
          start: 'top 95%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  // ─── 10. STAT COUNTER ANIMATION ────────────────────────────
  function animateCounter(el, target, suffix = '') {
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Number.isInteger(target) ? Math.floor(current) + suffix : current.toFixed(1) + suffix;
    }, 20);
  }

  if (document.querySelector('.hero-stats')) {
    ScrollTrigger.create({
      trigger: '.hero-stats',
      scroller: '#smooth-wrapper',
      start: 'top 95%',
      onEnter: () => {
        const nums = document.querySelectorAll('.stat-num');
        const vals = [3, 7.9, 1];
        const suf  = ['+', '', ''];
        nums.forEach((el, i) => animateCounter(el, vals[i], suf[i]));
      },
      once: true
    });
  }

  // ─── 13. PARTICLE CANVAS ───────────────────────────────────
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');
  let particles = [], W, H;

  function resizeCanvas() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.8 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.alpha = 0;
      this.maxLife = Math.random() * 0.015 + 0.003;
      this.fade = 'in';
      this.color = Math.random() > 0.5 ? 'rgba(6,182,212,' : 'rgba(14,165,233,';
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.fade === 'in') { this.alpha += this.maxLife; if (this.alpha >= 0.7) this.fade = 'out'; }
      else { this.alpha -= this.maxLife * 0.5; if (this.alpha <= 0) this.reset(); }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  // Reduced particle count from 120 to 50 for massive performance boost
  for (let i = 0; i < 50; i++) particles.push(new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(6,182,212,${0.06 * (1 - d / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ─── 14. COPY TO CLIPBOARD ─────────────────────────────────
  const toast    = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer;

  function showToast(msg) {
    toastMsg.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  }

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text   = btn.getAttribute('data-copy');
      const iconEl = btn.querySelector('i');
      try {
        await navigator.clipboard.writeText(text);
        btn.classList.add('copied');
        iconEl.className = 'fas fa-check';
        showToast('Copied to clipboard!');
        setTimeout(() => { btn.classList.remove('copied'); iconEl.className = 'fas fa-copy'; }, 2000);
      } catch {
        showToast('Please copy manually.');
      }
    });
  });

  // ─── 15. PROJECT CARD 3D TILT ──────────────────────────────
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const dx   = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
      const dy   = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
      gsap.to(card, { rotateX: -dy * 6, rotateY: dx * 6, transformPerspective: 800, duration: 0.4, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power3.out' });
    });
  });

  // ─── 16. ACTIVE NAV LINK ───────────────────────────────────
  const sections   = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  locoScroll.on('scroll', ({ scroll }) => {
    let current = '';
    sections.forEach(sec => { if (scroll.y >= sec.offsetTop - 200) current = sec.id; });
    navLinkEls.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  });

  // ─── 17. PARALLAX HERO ─────────────────────────────────────
  locoScroll.on('scroll', ({ scroll }) => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const heroH = hero.offsetHeight;
    const prog  = Math.min(scroll.y / heroH, 1);
    gsap.set('.hero-content', { y: prog * -50, opacity: 1 - prog * 0.7 });
    gsap.set('.hero-visual',  { y: prog * -80 });
  });

  // ─── 18. LOCOMOTIVE SCROLL REFRESH ─────────────────────────
  // Ensure we refresh after all images and assets load, even if already loaded
  const initScrollRefresh = () => {
    locoScroll.update();
    ScrollTrigger.refresh();
  };

  if (document.readyState === 'complete') {
    initScrollRefresh();
  } else {
    window.addEventListener('load', initScrollRefresh);
  }

  // Watch for dynamic height changes (like image loads or font loads)
  new ResizeObserver(() => {
    initScrollRefresh();
  }).observe(document.querySelector('#smooth-wrapper'));

});
