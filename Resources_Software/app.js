// ============================================
// FONDEINO - JavaScript Principal
// ============================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmoothScroll();
  initButtonInteractions();
  initScrollAnimations();
});

// ============================================
// MENÚ MÓVIL
// ============================================
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (!menuBtn || !mobileMenu) return;

  let isOpen = false;

  menuBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    
    if (isOpen) {
      // Abrir menú
      mobileMenu.classList.remove('max-h-0', 'opacity-0');
      mobileMenu.classList.add('max-h-96', 'opacity-100');
      menuBtn.setAttribute('aria-expanded', 'true');
    } else {
      // Cerrar menú
      mobileMenu.classList.remove('max-h-96', 'opacity-100');
      mobileMenu.classList.add('max-h-0', 'opacity-0');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Cerrar menú al hacer click en un enlace
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isOpen) {
        mobileMenu.classList.remove('max-h-96', 'opacity-100');
        mobileMenu.classList.add('max-h-0', 'opacity-0');
        menuBtn.setAttribute('aria-expanded', 'false');
        isOpen = false;
      }
    });
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', (e) => {
    if (isOpen && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      mobileMenu.classList.remove('max-h-96', 'opacity-100');
      mobileMenu.classList.add('max-h-0', 'opacity-0');
      menuBtn.setAttribute('aria-expanded', 'false');
      isOpen = false;
    }
  });
}

// ============================================
// SCROLL SUAVE
// ============================================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Ignorar enlaces vacíos o solo con #
      if (!href || href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const headerHeight = window.innerWidth >= 1024 ? 80 : 64;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// INTERACCIONES DE BOTONES
// ============================================
function initButtonInteractions() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const buttonText = this.textContent.trim();
      
      // Efecto de ripple
      createRipple(this, event);
      
      // Acción según el tipo de botón
      if (buttonText.includes('información')) {
        handleInfoRequest();
      } else if (buttonText.includes('beneficios')) {
        handleBenefitsRequest();
      }
    });
  });
}

// Crear efecto ripple en botones
function createRipple(button, event) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    left: ${x}px;
    top: ${y}px;
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  `;
  
  // Asegurar que el botón tenga position relative
  button.style.position = 'relative';
  button.style.overflow = 'hidden';
  
  button.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 600);
}

// Manejadores de acciones de botones
function handleInfoRequest() {
  // Aquí puedes agregar la lógica para mostrar un modal, 
  // redirigir a una página, o abrir un formulario
  console.log('Solicitud de información');
  
  // Ejemplo: mostrar alerta temporal
  showNotification('¡Gracias por tu interés! Pronto te contactaremos.', 'success');
}

function handleBenefitsRequest() {
  // Aquí puedes mostrar una sección de beneficios o redirigir
  console.log('Solicitud de beneficios');
  
  // Ejemplo: scroll a sección de servicios
  const servicesSection = document.getElementById('servicios');
  if (servicesSection) {
    const headerHeight = window.innerWidth >= 1024 ? 80 : 64;
    window.scrollTo({
      top: servicesSection.offsetTop - headerHeight,
      behavior: 'smooth'
    });
  }
}

// Mostrar notificación temporal
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-lg text-white font-medium z-50 transform transition-all duration-300 ${
    type === 'success' ? 'bg-accent-500' : 'bg-primary-500'
  }`;
  notification.textContent = message;
  notification.style.opacity = '0';
  notification.style.transform = 'translateY(20px)';
  
  document.body.appendChild(notification);
  
  // Animar entrada
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
  }, 10);
  
  // Remover después de 3 segundos
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ============================================
// ANIMACIONES AL SCROLL
// ============================================
function initScrollAnimations() {
  // Observador de intersección para animaciones
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observar secciones
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    if (index > 0) { // Omitir la primera sección (hero)
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    }
  });
  
  // Actualizar navegación activa al hacer scroll
  updateActiveNavOnScroll();
}

// Actualizar enlace de navegación activo según la sección visible
function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('nav-link-active', 'mobile-nav-link-active');
      
      const href = link.getAttribute('href');
      if (href === `#${currentSection}`) {
        if (link.classList.contains('nav-link')) {
          link.classList.add('nav-link-active');
        } else {
          link.classList.add('mobile-nav-link-active');
        }
      }
    });
  });
}

// ============================================
// AGREGAR ESTILOS PARA ANIMACIÓN RIPPLE
// ============================================
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ============================================
// UTILIDADES
// ============================================

// Debounce para optimizar eventos de scroll/resize
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Log de inicialización
console.log('✅ FondeINO - JavaScript cargado correctamente');