// Animaciones avanzadas para imágenes de proyectos
class ProjectImageAnimations {
  constructor() {
    this.projectItems = document.querySelectorAll('.project-item');
    this.projectImages = document.querySelectorAll('.project-image');
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupMouseEffects();
    this.setupClickEffects();
    this.addDynamicStyles();
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Animación de entrada escalonada
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, index * 200);
        }
      });
    }, options);

    this.projectItems.forEach(item => {
      observer.observe(item);
    });
  }

  setupMouseEffects() {
    this.projectItems.forEach((item, index) => {
      const image = item.querySelector('.project-image');
      
      item.addEventListener('mouseenter', () => {
        this.triggerHoverEffect(image, index);
      });

      item.addEventListener('mouseleave', () => {
        this.resetImageState(image);
      });

      item.addEventListener('mousemove', (e) => {
        this.updateMousePosition(e, item, image);
      });
    });
  }

  setupClickEffects() {
    this.projectImages.forEach((image, index) => {
      image.addEventListener('click', (e) => {
        e.preventDefault();
        this.triggerClickAnimation(image, index);
      });
    });
  }

  triggerHoverEffect(image, index) {
    image.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    image.style.transform = 'scale(1.05) rotateZ(1deg)';
    
    // Crear efecto de ripple
    this.createRippleEffect(image);
  }

  updateMousePosition(e, item, image) {
    const rect = item.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateY = (mouseX / rect.width) * 5;
    const rotateX = -(mouseY / rect.height) * 5;
    
    image.style.transform = `
      scale(1.05) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateZ(10px)
    `;
  }

  resetImageState(image) {
    image.style.transform = '';
    image.style.transition = 'all 0.3s ease';
  }

  triggerClickAnimation(image, index) {
    // Efecto de "flash" al hacer click
    image.style.transition = 'all 0.1s ease';
    image.style.filter = 'brightness(1.5) saturate(1.5) hue-rotate(20deg)';
    image.style.transform = 'scale(1.1) rotateZ(2deg)';
    
    // Crear partículas en el click
    this.createClickParticles(image);
    
    setTimeout(() => {
      image.style.transition = 'all 0.4s ease';
      image.style.filter = '';
      image.style.transform = '';
    }, 150);
  }

  createRippleEffect(image) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    
    const rect = image.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
      transform: translate(-50%, -50%) scale(0);
      animation: rippleAnimation 0.6s ease-out;
      pointer-events: none;
      z-index: 1;
    `;
    
    if (image.style.position !== 'relative') {
      image.style.position = 'relative';
    }
    
    image.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.remove();
      }
    }, 600);
  }

  createClickParticles(image) {
    const rect = image.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'click-particle';
      
      const angle = (i / 8) * Math.PI * 2;
      const distance = 50 + Math.random() * 30;
      const endX = centerX + Math.cos(angle) * distance;
      const endY = centerY + Math.sin(angle) * distance;
      
      particle.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 4px;
        height: 4px;
        background: #00d4ff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        box-shadow: 0 0 6px #00d4ff;
        animation: particleAnimation 0.8s ease-out forwards;
        --end-x: ${endX}px;
        --end-y: ${endY}px;
      `;
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.remove();
        }
      }, 800);
    }
  }

  addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rippleAnimation {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0;
        }
      }
      
      @keyframes particleAnimation {
        0% {
          transform: translate(0, 0) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(calc(var(--end-x) - 50vw), calc(var(--end-y) - 50vh)) scale(0);
          opacity: 0;
        }
      }
      
      .project-item.animate-in {
        animation: projectSlideIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }
      
      @keyframes projectSlideIn {
        0% {
          opacity: 0;
          transform: translateY(30px) scale(0.9);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      
      .project-image {
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      }
      
      /* Mejorar el efecto de brillo existente */
      .project-image::after {
        transition: all 0.3s ease;
      }
      
      .project-item:hover .project-image::after {
        background-size: 15px 15px, 20px 20px, 12px 12px;
        animation-duration: 2s;
      }
      
      /* Efecto de loading shimmer */
      .project-image::before {
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(0, 212, 255, 0.1) 20%,
          rgba(0, 212, 255, 0.3) 40%,
          rgba(0, 212, 255, 0.1) 60%,
          transparent 100%
        );
        background-size: 200% 100%;
        animation: shimmer 3s ease-in-out infinite;
      }
      
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
      
      .project-item:hover .project-image::before {
        animation: shimmer 1s ease-in-out infinite;
      }
    `;
    
    document.head.appendChild(style);
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new ProjectImageAnimations();
});

// También inicializar si el DOM ya está listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ProjectImageAnimations();
  });
} else {
  new ProjectImageAnimations();
}
