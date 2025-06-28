// Animación 3D interactiva para la foto de perfil
class ProfilePhoto3D {
  constructor() {
    this.photo = document.querySelector('.foto-perfil');
    this.container = document.getElementById('home');
    this.isActive = false;
    
    if (this.photo && this.container) {
      this.init();
    }
  }

  init() {
    this.bindEvents();
    this.createParallaxEffect();
  }

  bindEvents() {
    // Evento de mouse move para efecto parallax
    this.container.addEventListener('mousemove', (e) => {
      if (!this.isActive) {
        this.handleMouseMove(e);
      }
    });

    // Eventos de click desactivados para evitar animación no deseada
    // this.photo.addEventListener('click', () => {
    //   this.activateSpecialRotation();
    // });

    // Reset al salir del contenedor
    this.container.addEventListener('mouseleave', () => {
      this.resetTransform();
    });

    // Efecto de tilt en móviles usando deviceorientation
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        this.handleDeviceOrientation(e);
      });
    }
  }

  handleMouseMove(e) {
    const rect = this.container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / rect.height) * -20;
    const rotateY = (mouseX / rect.width) * 20;
    
    this.photo.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateZ(20px)
    `;
  }

  handleDeviceOrientation(e) {
    if (window.innerWidth <= 768) {
      const rotateX = (e.beta - 45) * 0.3; // beta: front-to-back tilt
      const rotateY = e.gamma * 0.3;       // gamma: left-to-right tilt
      
      this.photo.style.transform = `
        perspective(1000px) 
        rotateX(${Math.max(-15, Math.min(15, rotateX))}deg) 
        rotateY(${Math.max(-15, Math.min(15, rotateY))}deg)
      `;
    }
  }

  // Función desactivada para prevenir animación de click
  /*
  activateSpecialRotation() {
    this.isActive = true;
    this.photo.style.animation = 'none';
    
    // Rotación completa en Y con efecto de glow intenso
    this.photo.style.transform = `
      perspective(1000px) 
      rotateY(360deg) 
      scale(1.2)
    `;
    
    this.photo.style.boxShadow = `
      0 0 50px #00d4ff, 
      0 0 100px rgba(0, 212, 255, 0.8),
      0 30px 60px rgba(0, 212, 255, 0.4)
    `;
    
    // Crear partículas especiales alrededor de la foto
    this.createClickParticles();
    
    // Volver al estado normal después de 2 segundos
    setTimeout(() => {
      this.resetToFloat();
      this.isActive = false;
    }, 2000);
  }

  createClickParticles() {
    const rect = this.photo.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'click-particle';
      
      const angle = (i / 12) * Math.PI * 2;
      const distance = 100;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      particle.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 4px;
        height: 4px;
        background: #00d4ff;
        border-radius: 50%;
        box-shadow: 0 0 10px #00d4ff;
        pointer-events: none;
        z-index: 1000;
        animation: particleExplosion 1.5s ease-out forwards;
        --end-x: ${x}px;
        --end-y: ${y}px;
      `;
      
      document.body.appendChild(particle);
      
      // Remover partícula después de la animación
      setTimeout(() => {
        particle.remove();
      }, 1500);
    }
  }
  */

  resetTransform() {
    if (!this.isActive) {
      this.photo.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  }

  resetToFloat() {
    this.photo.style.animation = 'float 6s ease-in-out infinite';
    this.photo.style.transform = '';
    this.photo.style.boxShadow = '';
  }

  createParallaxEffect() {
    // Efecto parallax sutil en scroll
    window.addEventListener('scroll', () => {
      if (!this.isActive) {
        const scrollY = window.scrollY;
        const rate = scrollY * -0.02;
        
        this.photo.style.transform = `
          perspective(1000px) 
          translateZ(${rate}px)
        `;
      }
    });
  }
}

// CSS para las partículas de click
const particleStyles = document.createElement('style');
particleStyles.textContent = `
  @keyframes particleExplosion {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(var(--end-x), var(--end-y)) scale(0);
      opacity: 0;
    }
  }
`;
document.head.appendChild(particleStyles);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new ProfilePhoto3D();
});
