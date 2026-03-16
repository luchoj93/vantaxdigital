'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // 0. Update dynamic copyright year
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // 1. Acordeón de FAQ (Preguntas Frecuentes)
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const currentItem = question.closest('.faq-item');

            // Cerrar todas las demás respuestas si se desea (opcional)
            const allItems = document.querySelectorAll('.faq-item');
            allItems.forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('active');
                }
            });

            // Intercambiar estado activo en el elemento clicado
            currentItem.classList.toggle('active');
        });
    });

    // 2. Control del Formulario de Contacto
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Previene la recarga automática de la página

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            // Estado de carga
            btn.textContent = 'Enviando...';
            btn.disabled = true;
            btn.style.cursor = 'wait';

            // Envío real a formsubmit usando AJAX
            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    btn.textContent = '¡Mensaje Enviado!';
                    btn.style.backgroundColor = 'var(--accent-secondary)'; // Mint dark
                    btn.style.color = '#fff';
                    btn.style.cursor = 'pointer';

                    contactForm.reset(); // Limpia los campos

                    // Restaurar botón después de 3 segundos
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.backgroundColor = '';
                        btn.style.color = '';
                        btn.disabled = false;
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    btn.textContent = 'Error al enviar';
                    btn.style.backgroundColor = 'red';
                    btn.style.color = '#fff';

                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.backgroundColor = '';
                        btn.style.color = '';
                        btn.disabled = false;
                    }, 3000);
                });
        });
    }

    // 3. Efecto visual suave de la barra de navegación al hacer scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(11, 11, 14, 0.98)';
            navbar.style.borderBottomColor = 'rgba(45, 212, 191, 0.2)'; // Borde de acento
        } else {
            navbar.style.backgroundColor = 'rgba(11, 11, 14, 0.9)';
            navbar.style.borderBottomColor = 'var(--border-color)';
        }
    });

    // 4. Funcionalidad de Compartir
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
                // Intentar usar la API nativa de compartir (Mobile/Soportado)
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    // Fallback para web/desktop: Copiar al portapapeles
                    await navigator.clipboard.writeText(shareData.url);

                    // Pequeña notificación visual usando el enlace
                    const originalHTML = shareBtn.innerHTML;
                    shareBtn.innerHTML = '<span style="font-size: 12px; color: var(--accent-primary);">¡Copiado!</span>';
                    setTimeout(() => {
                        shareBtn.innerHTML = originalHTML;
                    }, 2000);
                }
            } catch (err) {
                console.error('Error al compartir:', err);
            }
        });
    }

    // 5. Menú Hamburguesa para Móviles
    const mobileToggle = document.getElementById('mobileToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    if (mobileToggle && navbarMenu) {
        // Abrir/cerrar menú al hacer click en la hamburguesa
        mobileToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            // Cerrar cualquier dropdown abierto al cerrar el menú
            if (!navbarMenu.classList.contains('active')) {
                navbarMenu.querySelectorAll('.has-dropdown').forEach(d => d.classList.remove('open'));
            }
        });

        // Cerrar el menú al hacer click en enlaces normales o items del dropdown
        navbarMenu.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
            link.addEventListener('click', () => {
                navbarMenu.classList.remove('active');
                navbarMenu.querySelectorAll('.has-dropdown').forEach(d => d.classList.remove('open'));
            });
        });
    }

    // 5.1 Dropdown toggle para móvil
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

    // 6. Botón de Volver Arriba
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        // Mostrar u ocultar el botón basado en el scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        // Volver arriba al hacer click suavemente
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
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
