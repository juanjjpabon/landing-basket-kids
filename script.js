// ==================== MENÚ MÓVIL ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== CONTADOR DE ESTADÍSTICAS ====================
function initializeCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasBeenTriggered = false;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasBeenTriggered) {
                hasBeenTriggered = true;
                statNumbers.forEach(element => {
                    const target = parseInt(element.getAttribute('data-target'));
                    animateCounter(element, target);
                });
            }
        });
    }, observerOptions);

    observer.observe(document.querySelector('.estadisticas'));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// ==================== SCROLL SUAVE ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== ANIMACIÓN AL SCROLL ====================
const observerForElements = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.servicio-card, .galeria-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
    observerForElements.observe(element);
});

// ==================== VALIDACIÓN DE FORMULARIO ====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs = contactForm.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            isValid = false;
            input.style.borderColor = '#e74c3c';
        } else {
            input.style.borderColor = '#ddd';
        }
    });

    if (isValid) {
        // Simular envío
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '✓ Mensaje Enviado';
        submitBtn.style.background = '#27ae60';

        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'var(--primary-color)';
            inputs.forEach(input => {
                input.style.borderColor = '#ddd';
            });
        }, 2000);
    }
});

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeCounters();
});

// ==================== EFECTO PARALLAX ====================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    let scrollPosition = window.pageYOffset;
    
    if (scrollPosition < window.innerHeight) {
        hero.style.backgroundPosition = `0px ${scrollPosition * 0.5}px`;
    }
});

// ==================== CAMBIAR TAMAÑO DINÁMICAMENTE ====================
window.addEventListener('resize', () => {
    console.log('Ventana redimensionada');
});