/* ENF — main.js v3 */
'use strict';

/* ── Loader ─────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 2000);
});

/* ── Scroll Progress ────────────────────────── */
const progressBar = document.getElementById('progress-bar');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;
    if (total > 0) progressBar.style.width = (scrolled / total * 100) + '%';
  }, { passive: true });
}

/* ── Navbar scroll state ────────────────────── */
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ── Mobile Drawer ──────────────────────────── */
const hamburger = document.querySelector('.hamburger');
const drawer    = document.querySelector('.mobile-drawer');
const overlay   = document.querySelector('.mobile-overlay');

function openDrawer() {
  if (!drawer || !overlay) return;
  hamburger.classList.add('open');
  drawer.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  if (!drawer || !overlay) return;
  hamburger.classList.remove('open');
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });
}
if (overlay) overlay.addEventListener('click', closeDrawer);
if (drawer) {
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
}

/* ── Scroll Reveal ──────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Animated Counters ──────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  if (isNaN(target)) return;
  const duration = 1800;
  const start = performance.now();
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const current = Math.round(easeOut(progress) * target);
    el.textContent = current.toLocaleString('fr-FR') + suffix;
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const numEl = entry.target.querySelector('.stat-number');
      if (numEl) animateCounter(numEl);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.stat-item').forEach(el => statObserver.observe(el));

/* ── Testimonial Slider ─────────────────────── */
(function () {
  const wrap = document.getElementById('testiWrap');
  const slides = document.getElementById('testiSlides');
  const bars = document.querySelectorAll('.testi-bar');
  if (!wrap || !slides || !bars.length) return;
  let current = 0;
  const total = bars.length;

  function goTo(i) {
    current = i;
    slides.style.transform = `translateX(-${i * 100}%)`;
    bars.forEach((b, j) => b.classList.toggle('active', j === i));
  }

  bars.forEach((b, i) => b.addEventListener('click', () => goTo(i)));

  let auto = setInterval(() => goTo((current + 1) % total), 5000);
  wrap.addEventListener('mouseenter', () => clearInterval(auto));
  wrap.addEventListener('mouseleave', () => {
    auto = setInterval(() => goTo((current + 1) % total), 5000);
  });

  // Touch swipe
  let startX = 0;
  wrap.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  wrap.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && current < total - 1) goTo(current + 1);
      if (diff < 0 && current > 0) goTo(current - 1);
    }
  }, { passive: true });
})();

/* ── FAQ Accordion ──────────────────────────── */
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  if (!q) return;
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(other => other.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── Actualités Filter ──────────────────────── */
document.querySelectorAll('.actu-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.actu-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.getAttribute('data-cat');
    document.querySelectorAll('.actu-card').forEach(card => {
      if (cat === 'all' || card.getAttribute('data-cat') === cat) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ── Concours Form Multi-Step ───────────────── */
(function() {
  const tabs = document.querySelectorAll('.concours-step-tab');
  const panels = document.querySelectorAll('.concours-panel');
  if (!tabs.length || !panels.length) return;

  function goToStep(idx) {
    tabs.forEach((t, i) => {
      t.classList.toggle('active', i === idx);
      if (i < idx) t.classList.add('completed');
      else t.classList.remove('completed');
    });
    panels.forEach((p, i) => {
      p.style.display = i === idx ? '' : 'none';
    });
    window.scrollTo({ top: document.querySelector('.concours-steps-nav').offsetTop - 80, behavior: 'smooth' });
  }

  tabs.forEach((t, i) => t.addEventListener('click', () => goToStep(i)));

  // Next/Prev buttons
  document.querySelectorAll('[data-step-next]').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-step-next'), 10);
      goToStep(next);
    });
  });
  document.querySelectorAll('[data-step-prev]').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-step-prev'), 10);
      goToStep(prev);
    });
  });

  // Diploma selection
  document.querySelectorAll('.diploma-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.diploma-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  // Photo upload preview
  const photoInput = document.getElementById('photoInput');
  const photoUpload = document.querySelector('.photo-upload');
  if (photoInput && photoUpload) {
    photoUpload.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', () => {
      const file = photoInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          photoUpload.innerHTML = `<img src="${e.target.result}" alt="Photo" />`;
          photoUpload.classList.add('has-photo');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // File upload cards
  document.querySelectorAll('.upload-card').forEach(card => {
    const input = card.querySelector('input[type="file"]');
    if (!input) return;
    card.addEventListener('click', () => input.click());
    input.addEventListener('change', () => {
      if (input.files.length > 0) {
        card.classList.add('uploaded');
        const label = card.querySelector('.upload-card-label');
        if (label) label.textContent = input.files[0].name;
      }
    });
  });
})();

/* ── Contact Form ───────────────────────────── */
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    btn.textContent = 'Message envoyé ✓';
    btn.style.background = '#2D7A50';
    setTimeout(() => {
      btn.textContent = 'Envoyer le message';
      btn.style.background = '';
      this.reset();
    }, 3500);
  });
}

/* ── Feedback Forms Logic ───────────────────── */
function initFeedbackForms() {
  // Anonymity Toggle
  const anonToggle = document.getElementById('anonymity-toggle');
  const anonInput = document.getElementById('is-anonymous');
  const identityFields = document.getElementById('identity-fields');
  
  if (anonToggle && anonInput && identityFields) {
    anonToggle.addEventListener('click', () => {
      anonInput.checked = !anonInput.checked;
      identityFields.classList.toggle('visible', !anonInput.checked);
      // Requirement fields update
      const nameInput = document.getElementById('full-name');
      const emailInput = document.getElementById('email');
      if (anonInput.checked) {
        if (nameInput) nameInput.removeAttribute('required');
        if (emailInput) emailInput.removeAttribute('required');
      } else {
        if (nameInput) nameInput.setAttribute('required', '');
        if (emailInput) emailInput.setAttribute('required', '');
      }
    });
  }

  // Contact Toggle (Suggestions)
  const contactToggle = document.getElementById('contact-toggle');
  const contactInput = document.getElementById('want-contact');
  const contactFields = document.getElementById('contact-fields');

  if (contactToggle && contactInput && contactFields) {
    contactToggle.addEventListener('click', () => {
      contactInput.checked = !contactInput.checked;
      contactFields.classList.toggle('visible', contactInput.checked);
    });
  }

  // File Upload Preview
  const uploadZone = document.getElementById('upload-zone');
  const fileInput = document.getElementById('file-input');
  const fileName = document.getElementById('file-name');

  if (uploadZone && fileInput) {
    uploadZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        fileName.textContent = 'Fichier : ' + fileInput.files[0].name;
      }
    });
  }

  // Form Submissions
  document.querySelectorAll('.feedback-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Collect Data (JSON structure ready)
      const data = {
        type: form.querySelector('select:first-of-type')?.value,
        category: form.querySelector('select:nth-of-type(2)')?.value || 'N/A',
        message: form.querySelector('textarea')?.value,
        anonymous: document.getElementById('is-anonymous')?.checked || false,
        recontact: document.getElementById('want-contact')?.checked || false,
        contact: {
          name: form.querySelector('[id*="name"]')?.value || '',
          email: form.querySelector('[id*="email"]')?.value || '',
          phone: form.querySelector('[id*="phone"]')?.value || ''
        },
        attachment: document.getElementById('file-input')?.files[0]?.name || null,
        timestamp: new Date().toISOString()
      };

      console.log('Submission JSON:', JSON.stringify(data, null, 2));

      // UI Switch
      form.style.display = 'none';
      const successMsg = form.parentElement.querySelector('#success-msg');
      if (successMsg) successMsg.style.display = 'block';
    });
  });
}

document.addEventListener('DOMContentLoaded', initFeedbackForms);


/* ── Ripple on buttons ──────────────────────── */
document.querySelectorAll('.btn-primary, .btn-navy, .btn-submit').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      background:rgba(255,255,255,0.25);
      transform:scale(0); animation:rippleAnim 0.6s ease-out;
    `;
    if (!this.style.position || this.style.position === 'static') this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = '@keyframes rippleAnim { to { transform: scale(2.5); opacity: 0; } }';
document.head.appendChild(rippleStyle);
