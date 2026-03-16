'use strict';

/**
 * NavbarFooter.js
 * Renders shared Navbar and Footer into every page.
 * Usage: include this script + call initSharedComponents('index.html', { isRoot: true })
 */

function getNavLinks(isRoot) {
  const rootPath = isRoot ? '' : '../../';
  const pagesPath = isRoot ? 'src/pages/' : '';

  const links = [];

  // Home specific links vs Inner pages links
  if (isRoot) {
    links.push({ label: 'Esencia', href: '#esencia' });
  } else {
    links.push({ label: 'Inicio', href: `${rootPath}index.html` });
  }

  links.push({
    label: 'Servicios', href: isRoot ? '#servicios' : '#', dropdown: [
      { label: 'Desarrollo Web', href: `${pagesPath}desarrollo-web.html` },
      { label: 'Apps & Software', href: `${pagesPath}apps-software.html` },
      { label: 'SEO', href: `${pagesPath}seo.html` },
      { label: 'Social Media', href: `${pagesPath}social-media.html` },
      { label: 'Partner Agencias', href: `${pagesPath}partner-agencias.html` },
    ]
  });

  if (isRoot) {
    links.push({ label: 'Metodología', href: '#metodologia' });
  }

  links.push({ label: 'Nosotros', href: `${pagesPath}nosotros.html` });
  links.push({ label: 'Contacto', href: `${pagesPath}contacto.html` });

  return links;
}

function buildNavHTML(activePage, isRoot) {
  const assetsPath = isRoot ? 'src/assets/' : '../assets/';
  const pagesPath = isRoot ? 'src/pages/' : '';
  const rootPath = isRoot ? '' : '../../';
  
  const logoSrc = `${assetsPath}images/logo.png`;
  const navLinks = getNavLinks(isRoot);

  const linksHTML = navLinks.map(link => {
    if (link.dropdown) {
      const dropItems = link.dropdown.map(d =>
        `<li><a href="${d.href}" class="dropdown-item ${activePage === d.href.split('/').pop() ? 'active' : ''}">${d.label}</a></li>`
      ).join('');
      return `<li class="has-dropdown">
        <a href="${link.href}" class="nav-link">${link.label}
          <svg class="chevron-down" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </a>
        <ul class="dropdown-menu">${dropItems}</ul>
      </li>`;
    }
    return `<li><a href="${link.href}" class="nav-link ${activePage === link.href.split('/').pop() ? 'active' : ''}">${link.label}</a></li>`;
  }).join('');

  return `
  <nav class="navbar" id="mainNavbar">
    <div class="container navbar-container">
      <a href="${rootPath}index.html" class="navbar-brand">
        <img src="${logoSrc}" alt="VantaxDigital Logo" class="navbar-logo">
      </a>
      <ul class="navbar-menu" id="navbarMenu">
        ${linksHTML}
      </ul>
      <a href="${pagesPath}contacto.html" class="btn btn-primary nav-btn">Solicitar Presupuesto</a>
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

function buildFooterHTML(isRoot) {
  const assetsPath = isRoot ? 'src/assets/' : '../assets/';
  const pagesPath = isRoot ? 'src/pages/' : '';
  
  return `
  <footer class="footer">
    <div class="container footer-container">
      <div class="copyright">
        <img class="logo" src="${assetsPath}images/icon.png" alt="Logo" width="35">
        <p class="card-text">© <span id="currentYear"></span> VantaxDigital. Todos los derechos reservados.</p>
      </div>
      <nav class="footer-nav" aria-label="Páginas de servicio">
        <a href="${pagesPath}desarrollo-web.html">Desarrollo Web</a>
        <a href="${pagesPath}apps-software.html">Apps & Software</a>
        <a href="${pagesPath}seo.html">SEO</a>
        <a href="${pagesPath}social-media.html">Social Media</a>
        <a href="${pagesPath}partner-agencias.html">Partner Agencias</a>
        <a href="${pagesPath}nosotros.html">Nosotros</a>
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

function initSharedComponents(activePage, options = {}) {
  const isRoot = options.isRoot || false;

  // Inject Navbar
  const navTarget = document.getElementById('navbar-placeholder');
  if (navTarget) navTarget.innerHTML = buildNavHTML(activePage, isRoot);

  // Inject Footer
  const footTarget = document.getElementById('footer-placeholder');
  if (footTarget) footTarget.innerHTML = buildFooterHTML(isRoot);

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
      if (window.innerWidth <= 900) {
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
