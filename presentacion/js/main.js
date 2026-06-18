/* =============================================
   MAIN.JS — Navegación y comportamiento general
   Proyecto BCRP · COBIT 2019
   ============================================= */

'use strict';

const App = (() => {

  /* ---- Menú móvil ---- */
  function initMobileMenu() {
    const btn     = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (!btn || !sidebar) return;

    function open() {
      sidebar.classList.add('open');
      btn.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      sidebar.classList.remove('open');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', () => {
      sidebar.classList.contains('open') ? close() : open();
    });

    if (overlay) overlay.addEventListener('click', close);

    // Cerrar al hacer clic en un enlace del sidebar
    sidebar.querySelectorAll('a, .sidebar-nav-item').forEach(item => {
      item.addEventListener('click', close);
    });

    // Cerrar con Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) close();
    });
  }

  /* ---- Smooth scroll para anchors ---- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = window.innerWidth < 768 ? 68 : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ---- Active section en sidebar via scroll ---- */
  function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.sidebar-nav-item[data-section]');
    if (!sections.length || !navItems.length) return;

    const setActive = (id) => {
      navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.section === id);
      });
    };

    // Usamos IntersectionObserver (más eficiente que scroll listener)
    let currentId = '';
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            if (currentId !== entry.target.id) {
              currentId = entry.target.id;
              setActive(currentId);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(s => observer.observe(s));

    // Set first as default
    if (sections.length) setActive(sections[0].id);
  }

  /* ---- Accordion (factores de diseño) ---- */
  function initAccordion() {
    const triggers = document.querySelectorAll('[data-accordion-trigger]');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const target = document.getElementById(trigger.dataset.accordionTrigger);
        if (!target) return;

        const isOpen = target.style.maxHeight && target.style.maxHeight !== '0px';

        // Cerrar todos primero si es exclusivo
        const group = trigger.dataset.accordionGroup;
        if (group) {
          document.querySelectorAll(`[data-accordion-trigger][data-accordion-group="${group}"]`).forEach(t => {
            const pane = document.getElementById(t.dataset.accordionTrigger);
            if (pane) {
              pane.style.maxHeight = '0';
              pane.style.opacity = '0';
            }
            t.classList.remove('open');
          });
        }

        if (!isOpen) {
          target.style.maxHeight = target.scrollHeight + 'px';
          target.style.opacity = '1';
          trigger.classList.add('open');
        } else {
          target.style.maxHeight = '0';
          target.style.opacity = '0';
          trigger.classList.remove('open');
        }
      });
    });
  }

  /* ---- Tabs ---- */
  function initTabs() {
    const tabGroups = document.querySelectorAll('[data-tab-group]');
    tabGroups.forEach(group => {
      const name = group.dataset.tabGroup;
      const tabs = group.querySelectorAll('[data-tab]');
      const panels = document.querySelectorAll(`[data-tab-panel="${name}"]`);

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const target = tab.dataset.tab;
          tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === target));
          panels.forEach(p => {
            const isActive = p.dataset.tabId === target;
            p.hidden = !isActive;
            p.style.display = isActive ? '' : 'none';
          });
        });
      });

      // Init: show first
      if (tabs.length) tabs[0].click();
    });
  }

  /* ---- Tooltips simples ---- */
  function initTooltips() {
    const els = document.querySelectorAll('[data-tooltip]');
    els.forEach(el => {
      let tip;
      el.addEventListener('mouseenter', () => {
        tip = document.createElement('div');
        tip.className = 'tooltip';
        tip.textContent = el.dataset.tooltip;
        Object.assign(tip.style, {
          position: 'fixed',
          background: '#0a1628',
          color: '#fff',
          padding: '4px 10px',
          borderRadius: '4px',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          zIndex: '9999',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,.2)',
        });
        document.body.appendChild(tip);

        const rect = el.getBoundingClientRect();
        tip.style.top  = (rect.bottom + 6) + 'px';
        tip.style.left = (rect.left + rect.width / 2 - tip.offsetWidth / 2) + 'px';
      });

      el.addEventListener('mouseleave', () => {
        if (tip) { tip.remove(); tip = null; }
      });
    });
  }

  /* ---- "Back to top" suave ---- */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.style.opacity = window.scrollY > 400 ? '1' : '0';
      btn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
    }, { passive: true });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- Highlight de celdas en tabla ---- */
  function initTableInteractivity() {
    document.querySelectorAll('.data-table tbody tr').forEach(row => {
      row.addEventListener('mouseenter', () => row.style.backgroundColor = 'var(--gray-50)');
      row.addEventListener('mouseleave', () => row.style.backgroundColor = '');
    });
  }

  /* ---- Marcar link activo en página ---- */
  function initPageNavHighlight() {
    const current = window.location.pathname.split('/').pop();
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
      const href = item.getAttribute('href') || '';
      if (href && href.includes(current) && current !== 'index.html' && current !== '') {
        item.classList.add('active');
      }
    });
  }

  /* ---- PUBLIC INIT ---- */
  function init() {
    initMobileMenu();
    initSmoothScroll();
    initActiveSection();
    initAccordion();
    initTabs();
    initTooltips();
    initBackToTop();
    initTableInteractivity();
    initPageNavHighlight();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
