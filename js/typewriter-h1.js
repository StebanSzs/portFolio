// Efecto de máquina de escribir para el h1
document.addEventListener('DOMContentLoaded', function() {
    const h1Element = document.querySelector('#home h1');
    
    if (!h1Element) return;
    
    // Configuración del efecto
    const originalText = h1Element.textContent;
    const typeSpeed = 100; // ms por carácter
    const pauseBeforeStart = 500; // pausa antes de empezar
    const pauseAfterComplete = 1000; // pausa después de completar
    
    // Función para el efecto typewriter
    function typewriterEffect() {
        // Estado inicial
        h1Element.classList.add('typewriter-init');
        h1Element.textContent = '';
        
        setTimeout(() => {
            // Remover estado inicial y agregar efecto
            h1Element.classList.remove('typewriter-init');
            h1Element.classList.add('typewriter-effect');
            
            let currentIndex = 0;
            
            function typeCharacter() {
                if (currentIndex < originalText.length) {
                    h1Element.textContent = originalText.slice(0, currentIndex + 1);
                    currentIndex++;
                    setTimeout(typeCharacter, typeSpeed);
                } else {
                    // Completar efecto
                    setTimeout(() => {
                        h1Element.classList.remove('typewriter-effect');
                        h1Element.classList.add('typing-complete');
                        
                        // Activar efectos adicionales después del typewriter
                        activateAdvancedEffects();
                    }, pauseAfterComplete);
                }
            }
            
            typeCharacter();
        }, pauseBeforeStart);
    }
    
    // Efectos adicionales después del typewriter
    function activateAdvancedEffects() {
        // Agregar clase para efectos avanzados
        h1Element.classList.add('enhanced-effects');
        
        // Efecto de partículas alrededor del texto
        createTextParticles();
        
        // Efecto de hover mejorado
        addHoverEffects();
    }
    
    // Crear partículas alrededor del h1
    function createTextParticles() {
        const rect = h1Element.getBoundingClientRect();
        const particleContainer = document.createElement('div');
        particleContainer.className = 'h1-particles';
        particleContainer.style.cssText = `
            position: absolute;
            top: ${rect.top + window.scrollY}px;
            left: ${rect.left}px;
            width: ${rect.width}px;
            height: ${rect.height}px;
            pointer-events: none;
            z-index: -1;
        `;
        
        document.body.appendChild(particleContainer);
        
        // Crear partículas individuales
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createParticle(particleContainer);
            }, i * 200);
        }
        
        // Actualizar posición en resize
        window.addEventListener('resize', () => {
            const newRect = h1Element.getBoundingClientRect();
            particleContainer.style.top = `${newRect.top + window.scrollY}px`;
            particleContainer.style.left = `${newRect.left}px`;
            particleContainer.style.width = `${newRect.width}px`;
            particleContainer.style.height = `${newRect.height}px`;
        });
    }
    
    // Crear una partícula individual
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'h1-particle';
        
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * container.offsetWidth;
        const startY = Math.random() * container.offsetHeight;
        const duration = Math.random() * 3000 + 2000;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: #00d4ff;
            border-radius: 50%;
            left: ${startX}px;
            top: ${startY}px;
            opacity: 0;
            box-shadow: 0 0 10px #00d4ff;
            animation: particleFloat ${duration}ms ease-in-out infinite;
        `;
        
        container.appendChild(particle);
        
        // Remover partícula después de un tiempo
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 3);
    }
    
    // Efectos de hover mejorados
    function addHoverEffects() {
        let hoverTimeout;
        
        h1Element.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            h1Element.classList.add('hover-glow');
            
            // Crear burst de partículas en hover
            createHoverBurst();
        });
        
        h1Element.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                h1Element.classList.remove('hover-glow');
            }, 300);
        });
        
        // Efecto de click
        h1Element.addEventListener('click', (e) => {
            createClickWave(e);
        });
    }
    
    // Crear efecto de onda en click
    function createClickWave(event) {
        const rect = h1Element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const wave = document.createElement('div');
        wave.className = 'click-wave';
        wave.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border: 2px solid #00d4ff;
            border-radius: 50%;
            pointer-events: none;
            animation: waveExpand 0.6s ease-out forwards;
        `;
        
        h1Element.style.position = 'relative';
        h1Element.appendChild(wave);
        
        setTimeout(() => {
            if (wave.parentNode) {
                wave.parentNode.removeChild(wave);
            }
        }, 600);
    }
    
    // Crear burst de partículas en hover
    function createHoverBurst() {
        const rect = h1Element.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'hover-particle';
            
            const angle = (360 / 8) * i;
            const distance = 50 + Math.random() * 30;
            const endX = centerX + Math.cos(angle * Math.PI / 180) * distance;
            const endY = centerY + Math.sin(angle * Math.PI / 180) * distance;
            
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #00d4ff;
                border-radius: 50%;
                left: ${centerX}px;
                top: ${centerY}px;
                pointer-events: none;
                box-shadow: 0 0 8px #00d4ff;
                animation: burstOut 0.8s ease-out forwards;
                --end-x: ${endX}px;
                --end-y: ${endY}px;
            `;
            
            h1Element.style.position = 'relative';
            h1Element.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 800);
        }
    }
    
    // Iniciar el efecto typewriter
    typewriterEffect();
    
    // Reiniciar efecto cuando el elemento entra en viewport (opcional)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !h1Element.classList.contains('typing-complete')) {
                typewriterEffect();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(h1Element);
});
