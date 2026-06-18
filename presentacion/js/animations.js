/* =============================================
   ANIMATIONS.JS — Scroll-triggered animations
   Proyecto BCRP · COBIT 2019
   ============================================= */

'use strict';

const Animations = (() => {

  /* ---- Intersection Observer principal ---- */
  let revealObserver;
  let barObserver;
  let counterObserver;

  function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => revealObserver.observe(el));
  }

  /* ---- Progress bars (data-width attribute) ---- */
  function initBars() {
    const bars = document.querySelectorAll('[data-width]');
    if (!bars.length) return;

    barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const targetWidth = el.getAttribute('data-width');
            el.style.setProperty('--target-width', targetWidth);
            // Force reflow then animate
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                el.style.width = targetWidth;
                el.classList.add('animated');
              });
            });
            barObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    bars.forEach(bar => barObserver.observe(bar));
  }

  /* ---- Canvas process bars (separate class) ---- */
  function initProcessBars() {
    const fills = document.querySelectorAll('.canvas-process-fill, .maturity-bar-fill');
    if (!fills.length) return;

    const processBarObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = el.getAttribute('data-fill') || '0%';
            setTimeout(() => { el.style.width = target; }, 200);
            processBarObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    fills.forEach(fill => processBarObserver.observe(fill));
  }

  /* ---- Numeric counters ---- */
  function animateCounter(el, target, duration = 1400) {
    const start = performance.now();
    const isFloat = target % 1 !== 0;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      el.textContent = isFloat
        ? current.toFixed(1)
        : Math.round(current).toLocaleString('es-PE');
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.getAttribute('data-count'));
            animateCounter(el, target);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach(c => counterObserver.observe(c));
  }

  /* ---- Phase items staggered reveal ---- */
  function initPhaseTimeline() {
    const phaseItems = document.querySelectorAll('.phase-item');
    phaseItems.forEach((item, i) => {
      item.style.transitionDelay = `${i * 120}ms`;
    });
  }

  /* ---- Cascade flow animation ---- */
  function initCascadeFlow() {
    const columns = document.querySelectorAll('.cascade-column');
    const arrows  = document.querySelectorAll('.cascade-arrow');

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          columns.forEach((col, i) => {
            setTimeout(() => col.classList.add('is-visible'), i * 180);
          });
          arrows.forEach((arr, i) => {
            setTimeout(() => arr.classList.add('is-visible'), i * 180 + 100);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const wrapper = document.querySelector('.cascade-flow');
    if (wrapper) observer.observe(wrapper);
  }

  /* ---- Factor cards stagger ---- */
  function initFactorCards() {
    const grid = document.querySelector('.factors-grid');
    if (!grid) return;

    const cards = grid.querySelectorAll('.factor-card');
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Array.from(cards).indexOf(entry.target);
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'none';
            }, idx * 60);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      card.style.transition = 'opacity .5s ease, transform .5s ease';
      observer.observe(card);
    });
  }

  /* ---- Sidebar active section tracking ---- */
  function initSectionTracking() {
    const sections = document.querySelectorAll('section[id]');
    const navItems  = document.querySelectorAll('.sidebar-nav-item[data-section]');
    if (!sections.length || !navItems.length) return;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navItems.forEach(item => item.classList.remove('active'));
            const activeItem = document.querySelector(
              `.sidebar-nav-item[data-section="${entry.target.id}"]`
            );
            if (activeItem) activeItem.classList.add('active');
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach(s => sectionObserver.observe(s));
  }

  /* ---- Scroll progress bar ---- */
  function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress-bar');
    if (!bar) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const winH   = document.documentElement.scrollHeight - window.innerHeight;
          const pct    = winH > 0 ? (window.scrollY / winH) * 100 : 0;
          bar.style.width = `${Math.min(pct, 100)}%`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---- Public init ---- */
  function init() {
    initReveal();
    initBars();
    initProcessBars();
    initCounters();
    initPhaseTimeline();
    initCascadeFlow();
    initFactorCards();
    initSectionTracking();
    initScrollProgress();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', Animations.init);
