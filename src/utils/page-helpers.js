'use strict';

/**
 * pages.js
 * Shared page-level interactions:
 *   - FAQ accordion
 *   - Contact form AJAX submit
 *   - Share button
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const currentItem = question.closest('.faq-item');
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== currentItem) item.classList.remove('active');
      });
      currentItem.classList.toggle('active');
    });
  });

  // --- Contact Form AJAX ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Enviando...';
      btn.disabled = true;
      btn.style.cursor = 'wait';

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        await response.json();
        btn.textContent = '¡Mensaje Enviado!';
        btn.style.backgroundColor = 'var(--accent-secondary)';
        btn.style.color = '#fff';
        btn.style.cursor = 'pointer';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 3000);
      } catch (err) {
        console.error('Error:', err);
        btn.textContent = 'Error al enviar';
        btn.style.backgroundColor = '#c0392b';
        btn.style.color = '#fff';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 3000);
      }
    });
  }

  // --- Share Button ---
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const shareData = {
        title: document.title,
        text: 'Especialistas en transformar ideas en productos digitales de alto impacto.',
        url: window.location.href
      };
      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(shareData.url);
          const orig = shareBtn.innerHTML;
          shareBtn.innerHTML = '<span style="font-size:12px;color:var(--accent-primary)">¡Copiado!</span>';
          setTimeout(() => { shareBtn.innerHTML = orig; }, 2000);
        }
      } catch (err) { console.error('Error al compartir:', err); }
    });
  }

  // --- Animate on scroll (simple IntersectionObserver) ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .process-step, .stat-item, .tech-pill').forEach(el => observer.observe(el));
});

// --- TYPEWRITER NATIVE IMPLEMENTATION ---
function initTypewriter() {
    const typewriters = document.querySelectorAll('.typewriter');
    if (!typewriters.length) return;

    typewriters.forEach(el => {
        const textAttr = el.getAttribute('data-texts');
        if (!textAttr) return;
        
        let texts = [];
        try { texts = JSON.parse(textAttr); } catch(e) { return; }
        if (!texts.length) return;
        
        const speed = parseInt(el.getAttribute('data-speed')) || 100;
        const deleteSpeed = parseInt(el.getAttribute('data-delete-speed')) || 50;
        const delay = parseInt(el.getAttribute('data-delay')) || 1500;
        const loop = el.hasAttribute('data-loop') && el.getAttribute('data-loop') !== 'false';
        const cursorChar = el.getAttribute('data-cursor') || '|';

        el.innerHTML = `<span class="typewriter-text"></span><span class="typewriter-cursor">${cursorChar}</span>`;
        const textSpan = el.querySelector('.typewriter-text');
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[textIndex] || "";
            
            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }
            
            textSpan.textContent = currentText.substring(0, charIndex);
            
            let typeSpeed = isDeleting ? deleteSpeed : speed;
            
            if (!isDeleting && charIndex === currentText.length) {
                if (!loop && textIndex === texts.length - 1) return;
                typeSpeed = delay; // pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // pause before typing next word
            }
            
            setTimeout(type, typeSpeed);
        }
        
        type();
    });
}
document.addEventListener('DOMContentLoaded', initTypewriter);
