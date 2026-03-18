/* ENF — components.js — Shared navbar + footer injection */
'use strict';

/* Determine current page for active state */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

function isActive(page) {
  if (page === currentPage) return ' active';
  return '';
}

/* ── NAVBAR ── */
function renderNavbar() {
  return `
<div id="loader"><img src="../img/nouveau-logo-blanc-enf-footer.png" alt="ENF" class="loader-logo-img" /><div class="loader-bar-wrap"><div class="loader-bar"></div></div></div>
<div id="progress-bar"></div>

<nav class="navbar">
  <a href="index.html" class="nav-logo"><img src="../img/nouveau-logo-enf-header.png" alt="ENF — Gouvernement RDC" class="nav-logo-img" style="height:66px;" /></a>
  <ul class="nav-links">
    <li><a href="index.html" class="${isActive('index.html')}">Accueil</a></li>
    <li><a href="about.html" class="${isActive('about.html')}">À propos</a></li>
    <li class="dropdown">
      <a href="formation.html" class="${['formation.html','admission-initiale.html','admission-continue.html','admission-certifiante.html'].includes(currentPage)?'active':''}">Formation <svg class="chevron" viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></a>
      <div class="mega-menu">
        <div>
          <div class="mega-col-title">Programmes</div>
          <a href="formation.html#initiale">
            <span class="mega-icon"><svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></span>
            <span class="mega-label">Formation Initiale<small>Cycle long sur concours national</small></span>
          </a>
          <a href="formation.html#continue">
            <span class="mega-icon"><svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg></span>
            <span class="mega-label">Formation Continue<small>Modules courts agents en poste</small></span>
          </a>
          <a href="formation.html#certifiante">
            <span class="mega-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg></span>
            <span class="mega-label">Formation Certifiante<small>Haute spécialisation</small></span>
          </a>
        </div>
        <div>
          <div class="mega-col-title">Admissions</div>
          <a href="admission-initiale.html">
            <span class="mega-icon"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span>
            <span class="mega-label">Admission — Initiale<small>Critères et dossier</small></span>
          </a>
          <a href="admission-continue.html">
            <span class="mega-icon"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span>
            <span class="mega-label">Admission — Continue<small>Procédure simplifiée</small></span>
          </a>
          <a href="admission-certifiante.html">
            <span class="mega-icon"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span>
            <span class="mega-label">Admission — Certifiante<small>Partenariats</small></span>
          </a>
          <a href="concours.html" style="margin-top:.5rem;background:rgba(200,168,75,.08);border:1px solid rgba(200,168,75,.2);">
            <span class="mega-icon" style="background:var(--gold);"><svg viewBox="0 0 24 24" style="stroke:var(--navy);"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></span>
            <span class="mega-label" style="color:var(--gold-2);font-weight:600;">Inscription Concours 2026<small style="color:rgba(255,255,255,.5);">Nouveau — Formulaire en ligne</small></span>
          </a>
        </div>
      </div>
    </li>
    <li><a href="espace-apprenant.html" class="${isActive('espace-apprenant.html')}">Espace Apprenant</a></li>
    <li><a href="actualites.html" class="${isActive('actualites.html')}">Actualités</a></li>
    <li><a href="contact.html" class="nav-cta${isActive('contact.html')}">Contact</a></li>
  </ul>
  <button class="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
</nav>

<!-- Mobile Drawer -->
<div class="mobile-overlay"></div>
<div class="mobile-drawer">
  <div class="mobile-nav-section">
    <div class="mobile-nav-label">Navigation</div>
    <a href="index.html" class="${isActive('index.html')}">Accueil</a>
    <a href="about.html" class="${isActive('about.html')}">À propos</a>
    <a href="actualites.html" class="${isActive('actualites.html')}">Actualités</a>
    <a href="contact.html" class="${isActive('contact.html')}">Contact</a>
  </div>
  <div class="mobile-nav-section">
    <div class="mobile-nav-label">Formations</div>
    <a href="formation.html#initiale">Formation Initiale</a>
    <a href="formation.html#continue">Formation Continue</a>
    <a href="formation.html#certifiante">Formation Certifiante</a>
  </div>
  <div class="mobile-nav-section">
    <div class="mobile-nav-label">Admissions</div>
    <a href="admission-initiale.html">Admission — Initiale</a>
    <a href="admission-continue.html">Admission — Continue</a>
    <a href="admission-certifiante.html">Admission — Certifiante</a>
  </div>
  <div class="mobile-nav-section">
    <div class="mobile-nav-label">Services</div>
    <a href="espace-apprenant.html">Espace Apprenant</a>
  </div>
  <a href="concours.html" class="mobile-cta">📝 Inscription Concours 2026</a>
</div>`;
}

/* ── FOOTER ── */
function renderFooter() {
  return `
<footer class="footer">
  <div class="footer-main">
    <div>
      <img src="../img/nouveau-logo-blanc-enf-footer.png" alt="ENF — Gouvernement RDC" class="footer-logo-img" style="height:48px;" />
      <p class="brand-desc">Institution publique de formation professionnelle aux métiers des finances publiques, placée sous la haute autorité du Ministre des Finances de la RDC.</p>
      <div class="footer-socials">
        <a href="https://www.facebook.com/profile.php?id=61582518098472" target="_blank" rel="noopener" class="social-btn" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
        <a href="https://x.com/enf_rdc" target="_blank" rel="noopener" class="social-btn" aria-label="X / Twitter"><svg viewBox="0 0 24 24"><path d="M4 4l16 16M4 20L20 4"/></svg></a>
        <a href="https://www.youtube.com/@enf-rdc" target="_blank" rel="noopener" class="social-btn" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="white"/></svg></a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Navigation</h4>
      <ul>
        <li><a href="index.html">Accueil</a></li>
        <li><a href="about.html">À propos</a></li>
        <li><a href="formation.html">Formations</a></li>
        <li><a href="actualites.html">Actualités</a></li>
        <li><a href="espace-apprenant.html">Espace Apprenant</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Formations</h4>
      <ul>
        <li><a href="formation.html#initiale">Formation Initiale</a></li>
        <li><a href="formation.html#continue">Formation Continue</a></li>
        <li><a href="formation.html#certifiante">Formation Certifiante</a></li>
        <li><a href="admission-initiale.html">Admission — Initiale</a></li>
        <li><a href="admission-continue.html">Admission — Continue</a></li>
        <li><a href="admission-certifiante.html">Admission — Certifiante</a></li>
        <li><a href="concours.html" style="color:var(--gold-2);">Concours d'entrée 2026</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contacts</h4>
      <div class="footer-contact-item">
        <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <span>N° 32 bis, Av. des Forces Armées, SOCIMAT, Gombe — Kinshasa</span>
      </div>
      <div class="footer-contact-item">
        <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015.07 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006.99 6.99l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
        <span>+243 82 062 5 809</span>
      </div>
      <div class="footer-contact-item">
        <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <span><a href="mailto:dgenf@adminfinances.cd">dgenf@adminfinances.cd</a></span>
      </div>
      <h4 style="margin-top:1.5rem;">Newsletter</h4>
      <form class="newsletter-form" onsubmit="this.querySelector('button').textContent='✓'; return false;">
        <input type="email" placeholder="Votre e-mail" />
        <button type="submit">→</button>
      </form>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 École Nationale des Finances · Tous droits réservés · RDC</span>
    <img src="../img/nouveau-logo-blanc-enf-footer.png" alt="ENF · Gouvernement RDC" class="footer-bottom-logo" style="height:32px; opacity:.5;" />
  </div>
</footer>`;
}

/* ── Inject ── */
document.addEventListener('DOMContentLoaded', () => {
  const navSlot = document.getElementById('nav-slot');
  const footerSlot = document.getElementById('footer-slot');
  if (navSlot) navSlot.innerHTML = renderNavbar();
  if (footerSlot) footerSlot.innerHTML = renderFooter();

  // Re-init after injection
  setTimeout(() => {
    // Rebind hamburger
    const h = document.querySelector('.hamburger');
    const d = document.querySelector('.mobile-drawer');
    const o = document.querySelector('.mobile-overlay');
    if (h && d && o) {
      h.addEventListener('click', () => {
        const isOpen = d.classList.contains('open');
        h.classList.toggle('open', !isOpen);
        d.classList.toggle('open', !isOpen);
        o.classList.toggle('open', !isOpen);
        document.body.style.overflow = isOpen ? '' : 'hidden';
      });
      o.addEventListener('click', () => {
        h.classList.remove('open');
        d.classList.remove('open');
        o.classList.remove('open');
        document.body.style.overflow = '';
      });
      d.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        h.classList.remove('open'); d.classList.remove('open'); o.classList.remove('open');
        document.body.style.overflow = '';
      }));
    }
    // Rebind navbar scroll
    const nav = document.querySelector('.navbar');
    if (nav) {
      window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
      if (window.scrollY > 40) nav.classList.add('scrolled');
    }
  }, 50);
});
