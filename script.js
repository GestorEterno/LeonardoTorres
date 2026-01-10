// Animación del fondo tecnológico - Red Neuronal Azul
class TechBackground {
    constructor() {
        this.canvas = document.getElementById('techBackground');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = {
            x: null,
            y: null,
            radius: 120
        };
        
        this.init();
        this.animate();
        
        // Eventos
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
    
    init() {
        this.resize();
        this.createParticles();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createParticles(); // Recrear partículas al redimensionar
    }
    
    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 7000);
        this.particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5 + 0.3,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                color: `rgba(0, 212, 255, ${Math.random() * 0.4 + 0.1})`,
                originalX: null,
                originalY: null,
                oscillation: Math.random() * Math.PI * 2
            });
        }
    }
    
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }
    
    drawParticles() {
        // Primero dibujar todas las conexiones
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Conectar solo partículas cercanas (efecto red neuronal)
                if (distance < 150) {
                    // Mayor opacidad cuando están más cerca
                    const opacity = 0.15 * (1 - distance/150);
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    this.ctx.lineWidth = 0.3;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        // Luego dibujar las partículas
        for (let particle of this.particles) {
            // Oscilación natural para movimiento orgánico
            particle.oscillation += 0.02;
            const oscillationX = Math.sin(particle.oscillation) * 0.3;
            const oscillationY = Math.cos(particle.oscillation * 0.7) * 0.3;
            
            // Actualizar posición
            particle.x += particle.speedX + oscillationX;
            particle.y += particle.speedY + oscillationY;
            
            // Rebote suave en bordes
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX *= -0.98;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY *= -0.98;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }
            
            // Interacción con el ratón
            if (this.mouse.x && this.mouse.y) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    
                    particle.x += Math.cos(angle) * force * 3;
                    particle.y += Math.sin(angle) * force * 3;
                }
            }
            
            // Dibujar partícula con efecto de brillo
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 2
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
            
            this.ctx.beginPath();
            this.ctx.fillStyle = gradient;
            this.ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Núcleo de la partícula
            this.ctx.beginPath();
            this.ctx.fillStyle = particle.color;
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Punto brillante
            this.ctx.beginPath();
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            this.ctx.arc(
                particle.x - particle.size * 0.3, 
                particle.y - particle.size * 0.3, 
                particle.size * 0.5, 
                0, 
                Math.PI * 2
            );
            this.ctx.fill();
        }
    }
    
    animate() {
        // Fondo con gradiente sutil
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, 'rgba(10, 10, 26, 0.1)');
        gradient.addColorStop(1, 'rgba(5, 5, 15, 0.2)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dibujar partículas y conexiones
        this.drawParticles();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Menú hamburguesa - AJUSTADO PARA NAVBAR COMPACTO
class Navigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }
    
    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }
    
    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
}

// Efectos de scroll suave - AJUSTADO PARA NAVBAR COMPACTO
class ScrollEffects {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScrollTop = 0;
        
        window.addEventListener('scroll', () => this.handleScroll());
        this.initSmoothScroll();
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Ocultar/mostrar navbar al hacer scroll
        if (scrollTop > this.lastScrollTop && scrollTop > 80) {
            this.navbar.style.transform = 'translateY(-100%)';
        } else {
            this.navbar.style.transform = 'translateY(0)';
        }
        
        this.lastScrollTop = scrollTop;
    }
    
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 60, // Ajustado para navbar compacto
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Efectos de hover en tarjetas y shorts
class HoverEffects {
    constructor() {
        this.initCardHovers();
        this.initVideoHovers();
        this.initShortsHover();
    }
    
    initCardHovers() {
        const cards = document.querySelectorAll('.feature-card, .portfolio-item, .short-item, .review-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const glow = document.createElement('div');
                glow.classList.add('card-glow');
                glow.style.position = 'absolute';
                glow.style.top = '0';
                glow.style.left = '0';
                glow.style.width = '100%';
                glow.style.height = '100%';
                glow.style.borderRadius = '15px';
                glow.style.background = 'radial-gradient(circle at center, rgba(0,212,255,0.1) 0%, transparent 70%)';
                glow.style.pointerEvents = 'none';
                glow.style.zIndex = '-1';
                card.appendChild(glow);
            });
            
            card.addEventListener('mouseleave', () => {
                const glow = card.querySelector('.card-glow');
                if (glow) glow.remove();
            });
        });
    }
    
    initVideoHovers() {
        const videos = document.querySelectorAll('.video-wrapper');
        
        videos.forEach(video => {
            video.addEventListener('mouseenter', () => {
                const playButton = video.querySelector('.play-button');
                if (playButton) {
                    playButton.style.transform = 'scale(1.1)';
                }
            });
            
            video.addEventListener('mouseleave', () => {
                const playButton = video.querySelector('.play-button');
                if (playButton) {
                    playButton.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    initShortsHover() {
        const shortItems = document.querySelectorAll('.short-item');
        
        shortItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                // Añadir efecto de brillo al pasar el mouse
                const glow = document.createElement('div');
                glow.classList.add('short-glow');
                glow.style.position = 'absolute';
                glow.style.top = '0';
                glow.style.left = '0';
                glow.style.width = '100%';
                glow.style.height = '100%';
                glow.style.borderRadius = '15px';
                glow.style.background = 'radial-gradient(circle at center, rgba(0,212,255,0.1) 0%, transparent 70%)';
                glow.style.pointerEvents = 'none';
                glow.style.zIndex = '1';
                item.appendChild(glow);
            });
            
            item.addEventListener('mouseleave', () => {
                const glow = item.querySelector('.short-glow');
                if (glow) glow.remove();
            });
        });
    }
}

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar todas las funcionalidades
    const techBackground = new TechBackground();
    const navigation = new Navigation();
    const scrollEffects = new ScrollEffects();
    const hoverEffects = new HoverEffects();
    
    // Efecto de animación para el título del hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.classList.add('animate-title');
        
        // Añadir efecto de pulso al gradiente
        const gradientSpans = heroTitle.querySelectorAll('.gradient-text');
        gradientSpans.forEach((span, index) => {
            span.style.animationDelay = `${0.3 + (index * 0.2)}s`;
        });
    }
    
    // Añadir efecto de carga inicial
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Actualizar año en el copyright
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        const currentYear = new Date().getFullYear();
        copyright.textContent = copyright.textContent.replace('2023', currentYear);
    }
    
    // Optimizar iframes para mejor rendimiento
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        // Añadir atributos para mejor rendimiento
        iframe.setAttribute('loading', 'lazy');
        
        // Asegurar que los iframes de Google Drive tengan los parámetros correctos
        if (iframe.src.includes('drive.google.com')) {
            // Mantener la URL original, solo añadir parámetros si no existen
            if (!iframe.src.includes('?')) {
                iframe.src += '?autoplay=0&mute=1';
            }
        }
    });
});
