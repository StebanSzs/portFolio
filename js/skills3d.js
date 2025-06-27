// Efectos 3D para la sección de habilidades
class Skills3D {
  constructor() {
    this.skillsContainer = document.querySelector('.skills-container');
    this.skillItems = document.querySelectorAll('.skill-item');
    this.isInView = false;
    
    if (this.skillsContainer && this.skillItems.length > 0) {
      this.init();
    }
  }

  init() {
    this.setupMouseTracking();
    this.setupScrollEffects();
    this.setupClickEffects();
    this.setupIntersectionObserver();
  }

  setupMouseTracking() {
    this.skillsContainer.addEventListener('mousemove', (e) => {
      if (!this.isInView) return;
      
      const rect = this.skillsContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      // Efecto parallax en el contenedor
      const rotateY = (mouseX / rect.width) * 3;
      const rotateX = -(mouseY / rect.height) * 3;
      
      this.skillsContainer.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
      `;
      
      // Efecto individual en cada skill item
      this.skillItems.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterX = itemRect.left + itemRect.width / 2;
        const itemCenterY = itemRect.top + itemRect.height / 2;
        
        const distanceX = (e.clientX - itemCenterX) / itemRect.width;
        const distanceY = (e.clientY - itemCenterY) / itemRect.height;
        
        if (Math.abs(distanceX) < 2 && Math.abs(distanceY) < 2) {
          const intensity = 1 - Math.min(Math.sqrt(distanceX * distanceX + distanceY * distanceY), 1);
          const rotateItemY = distanceX * 8 * intensity;
          const rotateItemX = -distanceY * 8 * intensity;
          const translateZ = intensity * 10;
          
          item.style.transform = `
            translateZ(${translateZ}px) 
            rotateX(${rotateItemX}deg) 
            rotateY(${rotateItemY}deg)
          `;
        }
      });
    });

    this.skillsContainer.addEventListener('mouseleave', () => {
      this.resetTransforms();
    });
  }

  setupScrollEffects() {
    window.addEventListener('scroll', () => {
      if (!this.isInView) return;
      
      const scrollY = window.scrollY;
      const containerTop = this.skillsContainer.offsetTop;
      const windowHeight = window.innerHeight;
      
      this.skillItems.forEach((item, index) => {
        const delay = index * 0.1;
        const parallaxSpeed = 0.01 + (index * 0.002);
        const yOffset = (scrollY - containerTop + windowHeight) * parallaxSpeed;
        const rotateY = (scrollY * parallaxSpeed * 0.5) % 360;
        
        item.style.transform = `
          translateY(${yOffset}px) 
          rotateY(${rotateY}deg)
        `;
      });
    });
  }

  setupClickEffects() {
    this.skillItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.triggerClickAnimation(item, index);
      });
    });
  }

  triggerClickAnimation(item, index) {
    // Desactivar la animación float temporalmente
    item.style.animation = 'none';
    
    // Aplicar rotación más sutil con efectos especiales
    item.style.transform = `
      translateZ(25px) 
      rotateX(180deg) 
      rotateY(180deg) 
      scale(1.15)
    `;
    
    item.style.boxShadow = `
      0 10px 25px rgba(0, 212, 255, 0.4),
      0 0 15px rgba(0, 212, 255, 0.6)
    `;
    
    // Crear menos partículas
    this.createSkillParticles(item);
    
    // Efecto más sutil en el icono
    const icon = item.querySelector('.skill-icon');
    const name = item.querySelector('.skill-name');
    
    if (icon) {
      icon.style.filter = `
        drop-shadow(0 0 10px rgba(0, 212, 255, 0.8)) 
        brightness(1.3) 
        saturate(1.3)
      `;
    }
    
    if (name) {
      name.style.textShadow = `
        0 0 10px rgba(0, 212, 255, 0.8),
        0 0 20px rgba(0, 212, 255, 0.5)
      `;
    }
    
    // Volver al estado normal después de 1.5 segundos
    setTimeout(() => {
      this.resetItemState(item);
    }, 1500);
  }

  createSkillParticles(item) {
    const rect = item.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Crear solo 5 partículas más pequeñas
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.className = 'skill-particle';
      
      const angle = (i / 5) * Math.PI * 2;
      const distance = 40;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      particle.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 2px;
        height: 2px;
        background: rgba(0, 212, 255, 0.8);
        border-radius: 50%;
        box-shadow: 0 0 5px rgba(0, 212, 255, 0.6);
        pointer-events: none;
        z-index: 1000;
        animation: skillParticleExplosion 1.2s ease-out forwards;
        --end-x: ${x}px;
        --end-y: ${y}px;
      `;
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 1200);
    }
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isInView = true;
          this.animateSkillsEntrance();
        } else {
          this.isInView = false;
          this.resetTransforms();
        }
      });
    }, {
      threshold: 0.3
    });
    
    observer.observe(this.skillsContainer);
  }

  animateSkillsEntrance() {
    this.skillItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateZ(0) rotateX(0deg) rotateY(0deg)';
      }, index * 100);
    });
  }

  resetTransforms() {
    this.skillsContainer.style.transform = 'perspective(1000px)';
    
    this.skillItems.forEach(item => {
      item.style.transform = '';
    });
  }

  resetItemState(item) {
    item.style.animation = 'float3D 8s ease-in-out infinite';
    item.style.transform = '';
    item.style.boxShadow = '';
    
    const icon = item.querySelector('.skill-icon');
    const name = item.querySelector('.skill-name');
    
    if (icon) {
      icon.style.filter = '';
    }
    
    if (name) {
      name.style.textShadow = '';
    }
  }
}

// CSS para las partículas de skills
const skillParticleStyles = document.createElement('style');
skillParticleStyles.textContent = `
  @keyframes skillParticleExplosion {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(var(--end-x), var(--end-y)) scale(0);
      opacity: 0;
    }
  }
  
  .skill-item {
    opacity: 0.7;
    transform: translateZ(-30px) rotateX(20deg);
  }
`;
document.head.appendChild(skillParticleStyles);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new Skills3D();
});
