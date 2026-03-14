'use strict';

/**
 * components.js
 * Renders shared Navbar and Footer into every page.
 * Usage: include this script + call renderNav() and renderFooter()
 * from the page's own script, OR simply include the script and both
 * components auto-inject on DOMContentLoaded.
 */

const NAV_LINKS = [
  { label: 'Inicio',      href: '../../index.html' },
  { label: 'Servicios',   href: '#', dropdown: [
      { label: 'Desarrollo Web',   href: 'desarrollo-web.html' },
      { label: 'Apps & Software',  href: 'apps-software.html' },
      { label: 'SEO',              href: 'seo.html' },
      { label: 'Social Media',     href: 'social-media.html' },
      { label: 'Partner Agencias', href: 'partner-agencias.html' },
  ]},
  { label: 'Nosotros',    href: 'nosotros.html' },
  { label: 'Contacto',    href: 'contacto.html' },
];

function buildNavHTML(activePage = '') {
  const logoSrc = '../assets/images/logo.png';
  const iconSrc = '../assets/icons/favicon.svg';

  const linksHTML = NAV_LINKS.map(link => {
    if (link.dropdown) {
      const dropItems = link.dropdown.map(d =>
        `<li><a href="${d.href}" class="dropdown-item ${activePage === d.href ? 'active' : ''}">${d.label}</a></li>`
      ).join('');
      return `<li class="has-dropdown">
        <a href="${link.href}" class="nav-link">${link.label}
          <svg class="chevron-down" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </a>
        <ul class="dropdown-menu">${dropItems}</ul>
      </li>`;
    }
    return `<li><a href="${link.href}" class="nav-link ${activePage === link.href ? 'active' : ''}">${link.label}</a></li>`;
  }).join('');

  return `
  <nav class="navbar" id="mainNavbar">
    <div class="container navbar-container">
      <a href="../../public/index.html" class="navbar-brand">
        <img src="${logoSrc}" alt="VantaxDigital Logo" class="navbar-logo">
      </a>
      <ul class="navbar-menu" id="navbarMenu">
        ${linksHTML}
      </ul>
      <a href="contacto.html" class="btn btn-primary nav-btn">Solicitar Presupuesto</a>
      <button class="mobile-toggle" id="mobileToggle" aria-label="Abrir menú">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </div>
  </nav>`;
}

function buildFooterHTML() {
  return `
  <footer class="footer">
    <div class="container footer-container">
      <div class="copyright">
        <img class="logo" src="../assets/images/icon.png" alt="Logo" width="35">
        <p class="card-text">© <span id="currentYear"></span> VantaxDigital. Todos los derechos reservados.</p>
      </div>
      <nav class="footer-nav" aria-label="Páginas de servicio">
        <a href="desarrollo-web.html">Desarrollo Web</a>
        <a href="apps-software.html">Apps & Software</a>
        <a href="seo.html">SEO</a>
        <a href="social-media.html">Social Media</a>
        <a href="partner-agencias.html">Partner Agencias</a>
        <a href="nosotros.html">Nosotros</a>
      </nav>
      <div class="avisos">
        <a href="#">Privacidad</a>
        <a href="#">Aviso Legal</a>
        <a href="#">Cookies</a>
      </div>
    </div>
  </footer>
  <button id="backToTop" class="back-to-top" aria-label="Volver arriba">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  </button>`;
}

function initSharedComponents(activePage) {
  // Inject Navbar
  const navTarget = document.getElementById('navbar-placeholder');
  if (navTarget) navTarget.innerHTML = buildNavHTML(activePage);

  // Inject Footer
  const footTarget = document.getElementById('footer-placeholder');
  if (footTarget) footTarget.innerHTML = buildFooterHTML();

  // Dynamic year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navbar scroll effect
  const navbar = document.getElementById('mainNavbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(11, 11, 14, 0.98)';
      navbar.style.borderBottomColor = 'rgba(45, 212, 191, 0.2)';
    } else {
      navbar.style.backgroundColor = 'rgba(11, 11, 14, 0.9)';
      navbar.style.borderBottomColor = 'var(--border-color)';
    }
  });

  // Mobile hamburger
  const mobileToggle = document.getElementById('mobileToggle');
  const navbarMenu = document.getElementById('navbarMenu');
  if (mobileToggle && navbarMenu) {
    mobileToggle.addEventListener('click', () => navbarMenu.classList.toggle('active'));
    navbarMenu.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
      link.addEventListener('click', () => navbarMenu.classList.remove('active'));
    });
  }

  // Dropdown hover / click
  document.querySelectorAll('.has-dropdown').forEach(item => {
    item.addEventListener('mouseenter', () => item.classList.add('open'));
    item.addEventListener('mouseleave', () => item.classList.remove('open'));
    const toggle = item.querySelector('.nav-link');
    toggle && toggle.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        item.classList.toggle('open');
      }
    });
  });

  // Back to top
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 300);
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}
