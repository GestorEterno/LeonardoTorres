// FONDO DE CUADRÍCULA CON AURORAS TECNOLÓGICAS VORALES
class TechBackground {
    constructor() {
        this.canvas = document.getElementById('techBackground');
        this.ctx = this.canvas.getContext('2d');
        this.time = 0;
        this.gridSize = 50;
        this.auroras = [];
        this.dataStreams = [];
        
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    init() {
        this.resize();
        this.createAuroras();
        this.createDataStreams();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createAuroras();
        this.createDataStreams();
    }
    
    createAuroras() {
        this.auroras = [];
        const auroraCount = Math.floor(this.canvas.width / 300);
        
        for (let i = 0; i < auroraCount; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height * 0.7;
            const width = 100 + Math.random() * 200;
            const height = 30 + Math.random() * 70;
            
            this.auroras.push({
                x: x,
                y: y,
                width: width,
                height: height,
                speed: 0.2 + Math.random() * 0.3,
                phase: Math.random() * Math.PI * 2,
                color1: Math.random() > 0.5 ? '#00d4ff' : '#0066ff',
                color2: Math.random() > 0.5 ? '#0066ff' : '#00d4ff',
                opacity: 0.05 + Math.random() * 0.1
            });
        }
    }
    
    createDataStreams() {
        this.dataStreams = [];
        const streamCount = Math.floor(this.canvas.width / 150);
        
        for (let i = 0; i < streamCount; i++) {
            const startX = Math.random() * this.canvas.width;
            const endX = startX + (Math.random() - 0.5) * 200;
            
            this.dataStreams.push({
                startX: startX,
                startY: 0,
                endX: endX,
                endY: this.canvas.height,
                speed: 0.5 + Math.random() * 1,
                phase: Math.random() * Math.PI * 2,
                particles: [],
                lastParticleTime: 0
            });
            
            // Crear partículas iniciales para este stream
            const particleCount = 5 + Math.floor(Math.random() * 10);
            for (let j = 0; j < particleCount; j++) {
                this.dataStreams[i].particles.push({
                    progress: Math.random(),
                    speed: 0.002 + Math.random() * 0.003,
                    size: 1 + Math.random() * 2
                });
            }
        }
    }
    
    drawGrid() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Fondo sólido oscuro
        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(0, 0, width, height);
        
        // Cuadrícula de fondo (MANTENIENDO EXACTAMENTE EL ORIGINAL)
        const gridSize = this.gridSize;
        const lineColor = 'rgba(0, 150, 255, 0.1)';
        
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        
        // Líneas horizontales
        for (let y = 0; y <= height; y += gridSize) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }
        
        // Líneas verticales
        for (let x = 0; x <= width; x += gridSize) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        
        ctx.stroke();
    }
    
    drawAuroras() {
        this.time += 0.005;
        
        for (let aurora of this.auroras) {
            // Movimiento ondulante
            const waveX = Math.sin(this.time * aurora.speed + aurora.phase) * 50;
            const waveY = Math.cos(this.time * aurora.speed * 0.7 + aurora.phase) * 20;
            
            // Crear gradiente para el efecto vorale
            const gradient = this.ctx.createLinearGradient(
                aurora.x + waveX - aurora.width/2, aurora.y + waveY,
                aurora.x + waveX + aurora.width/2, aurora.y + waveY
            );
            
            gradient.addColorStop(0, 'transparent');
            gradient.addColorStop(0.3, `${aurora.color1}${Math.floor(aurora.opacity * 255).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(0.7, `${aurora.color2}${Math.floor(aurora.opacity * 255).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(1, 'transparent');
            
            // Dibujar la aurora
            this.ctx.beginPath();
            this.ctx.fillStyle = gradient;
            
            // Forma ondulada tipo aurora boreal
            const segments = 20;
            const segmentWidth = aurora.width / segments;
            
            for (let i = 0; i <= segments; i++) {
                const x = aurora.x + waveX - aurora.width/2 + i * segmentWidth;
                const segmentPhase = aurora.phase + (i / segments) * Math.PI * 2;
                const yOffset = Math.sin(this.time * aurora.speed * 1.5 + segmentPhase) * aurora.height/2;
                const y = aurora.y + waveY + yOffset;
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            // Completar la forma
            for (let i = segments; i >= 0; i--) {
                const x = aurora.x + waveX - aurora.width/2 + i * segmentWidth;
                const segmentPhase = aurora.phase + (i / segments) * Math.PI * 2;
                const yOffset = Math.sin(this.time * aurora.speed * 1.5 + segmentPhase) * aurora.height/2;
                const y = aurora.y + waveY + yOffset - aurora.height/4;
                
                this.ctx.lineTo(x, y);
            }
            
            this.ctx.closePath();
            this.ctx.fill();
            
            // Brillo adicional
            const glowGradient = this.ctx.createRadialGradient(
                aurora.x + waveX, aurora.y + waveY, 0,
                aurora.x + waveX, aurora.y + waveY, aurora.width/2
            );
            glowGradient.addColorStop(0, `${aurora.color1}30`);
            glowGradient.addColorStop(1, 'transparent');
            
            this.ctx.beginPath();
            this.ctx.fillStyle = glowGradient;
            this.ctx.arc(aurora.x + waveX, aurora.y + waveY, aurora.width/2, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    drawDataStreams() {
        for (let stream of this.dataStreams) {
            // Actualizar partículas
            const currentTime = Date.now();
            if (currentTime - stream.lastParticleTime > 500) {
                stream.particles.push({
                    progress: 0,
                    speed: 0.002 + Math.random() * 0.003,
                    size: 1 + Math.random() * 2
                });
                stream.lastParticleTime = currentTime;
            }
            
            // Dibujar línea de conexión tenue
            this.ctx.beginPath();
            this.ctx.moveTo(stream.startX, stream.startY);
            this.ctx.lineTo(stream.endX, stream.endY);
            this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.05)';
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            
            // Dibujar partículas
            for (let i = 0; i < stream.particles.length; i++) {
                const particle = stream.particles[i];
                
                // Calcular posición
                const x = stream.startX + (stream.endX - stream.startX) * particle.progress;
                const y = stream.startY + (stream.endY - stream.startY) * particle.progress;
                
                // Actualizar progreso
                particle.progress += particle.speed;
                
                // Dibujar partícula
                const gradient = this.ctx.createRadialGradient(
                    x, y, 0,
                    x, y, particle.size * 2
                );
                gradient.addColorStop(0, 'rgba(0, 212, 255, 0.8)');
                gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
                
                this.ctx.beginPath();
                this.ctx.fillStyle = gradient;
                this.ctx.arc(x, y, particle.size * 2, 0, Math.PI * 2);
                this.ctx.fill();
                
                // Eliminar partículas que han terminado
                if (particle.progress > 1) {
                    stream.particles.splice(i, 1);
                    i--;
                }
            }
            
            // Limitar número de partículas
            if (stream.particles.length > 20) {
                stream.particles = stream.particles.slice(-20);
            }
        }
    }
    
    drawTechNodes() {
        // Nodos tecnológicos en intersecciones de la cuadrícula
        const cols = Math.floor(this.canvas.width / this.gridSize);
        const rows = Math.floor(this.canvas.height / this.gridSize);
        
        for (let x = 0; x <= cols; x++) {
            for (let y = 0; y <= rows; y++) {
                // Solo algunos nodos (aleatorio)
                if (Math.random() > 0.7) {
                    const nodeX = x * this.gridSize;
                    const nodeY = y * this.gridSize;
                    
                    // Pequeño pulso
                    const pulse = Math.sin(this.time * 2 + x + y) * 0.5 + 0.5;
                    
                    // Brillo suave
                    const gradient = this.ctx.createRadialGradient(
                        nodeX, nodeY, 0,
                        nodeX, nodeY, 3
                    );
                    gradient.addColorStop(0, `rgba(0, 212, 255, ${0.3 * pulse})`);
                    gradient.addColorStop(1, 'transparent');
                    
                    this.ctx.beginPath();
                    this.ctx.fillStyle = gradient;
                    this.ctx.arc(nodeX, nodeY, 3, 0, Math.PI * 2);
                    this.ctx.fill();
                    
                    // Punto central
                    this.ctx.beginPath();
                    this.ctx.fillStyle = `rgba(0, 212, 255, ${0.6 * pulse})`;
                    this.ctx.arc(nodeX, nodeY, 1, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            }
        }
    }
    
    animate() {
        // Limpiar canvas con fondo
        this.drawGrid();
        
        // Dibujar elementos tecnológicos
        this.drawAuroras();
        this.drawDataStreams();
        this.drawTechNodes();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Menú hamburguesa
class Navigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        
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

// Efectos de scroll suave
class ScrollEffects {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScrollTop = 0;
        
        window.addEventListener('scroll', () => this.handleScroll());
        this.initSmoothScroll();
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
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
                        top: targetElement.offsetTop - 60,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Carrusel de reseñas - COMPACTADO
class ReviewsCarousel {
    constructor() {
        this.cards = document.querySelectorAll('.review-card');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.carousel-btn.prev');
        this.nextBtn = document.querySelector('.carousel-btn.next');
        this.currentIndex = 0;
        this.totalCards = this.cards.length;
        this.autoPlayInterval = null;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        this.dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                if (index !== this.currentIndex && !this.isTransitioning) {
                    this.goToSlide(index);
                }
            });
        });
        
        this.startAutoPlay();
        
        const carouselTrack = document.querySelector('.reviews-carousel-track');
        carouselTrack.addEventListener('mouseenter', () => this.stopAutoPlay());
        carouselTrack.addEventListener('mouseleave', () => this.startAutoPlay());
        
        this.updateControls();
    }
    
    updateControls() {
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.totalCards - 1;
        
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        this.cards.forEach((card, index) => {
            const isActive = index === this.currentIndex;
            card.classList.toggle('active', isActive);
            
            if (isActive) {
                card.style.zIndex = '2';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0) scale(1)';
                card.style.visibility = 'visible';
            } else {
                card.style.zIndex = '1';
                card.style.opacity = '0';
                card.style.transform = 'translateX(50px) scale(0.95)';
                card.style.visibility = 'hidden';
            }
        });
    }
    
    prev() {
        if (this.currentIndex > 0 && !this.isTransitioning) {
            this.isTransitioning = true;
            this.currentIndex--;
            this.updateControls();
            
            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        }
    }
    
    next() {
        if (this.currentIndex < this.totalCards - 1 && !this.isTransitioning) {
            this.isTransitioning = true;
            this.currentIndex++;
            this.updateControls();
            
            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        }
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.totalCards && !this.isTransitioning) {
            this.isTransitioning = true;
            this.currentIndex = index;
            this.updateControls();
            
            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        }
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            if (this.currentIndex === this.totalCards - 1) {
                this.goToSlide(0);
            } else {
                this.next();
            }
        }, 5000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Efectos de hover
class HoverEffects {
    constructor() {
        this.initCardHovers();
        this.initVideoHovers();
    }
    
    initCardHovers() {
        const cards = document.querySelectorAll('.feature-card, .portfolio-item, .short-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const glow = document.createElement('div');
                glow.classList.add('card-glow');
                glow.style.position = 'absolute';
                glow.style.top = '0';
                glow.style.left = '0';
                glow.style.width = '100%';
                glow.style.height = '100%';
                glow.style.borderRadius = 'inherit';
                glow.style.background = 'radial-gradient(circle at center, rgba(0,212,255,0.15) 0%, transparent 70%)';
                glow.style.pointerEvents = 'none';
                glow.style.zIndex = '1';
                card.style.position = 'relative';
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
                video.style.filter = 'brightness(1.1) contrast(1.05)';
            });
            
            video.addEventListener('mouseleave', () => {
                video.style.filter = 'brightness(1) contrast(1)';
            });
        });
    }
}

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const techBackground = new TechBackground();
    const navigation = new Navigation();
    const scrollEffects = new ScrollEffects();
    const reviewsCarousel = new ReviewsCarousel();
    const hoverEffects = new HoverEffects();
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.classList.add('animate-title');
        
        const gradientSpans = heroTitle.querySelectorAll('.gradient-text');
        gradientSpans.forEach((span, index) => {
            span.style.animationDelay = `${0.3 + (index * 0.2)}s`;
        });
    }
    
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        const currentYear = new Date().getFullYear();
        copyright.textContent = copyright.textContent.replace('2023', currentYear);
    }
    
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.setAttribute('loading', 'lazy');
        
        if (iframe.src.includes('drive.google.com')) {
            if (!iframe.src.includes('?')) {
                iframe.src += '?autoplay=0&mute=1';
            }
        }
    });
    
    const tiktokPlaceholders = document.querySelectorAll('.tiktok-embed-placeholder');
    tiktokPlaceholders.forEach(placeholder => {
        const videoId = placeholder.getAttribute('data-video-id');
        placeholder.addEventListener('click', function() {
            console.log(`Cargando video de TikTok con ID: ${videoId}`);
            alert(`En producción, este short cargaría el video de TikTok con ID: ${videoId}\n\nActualmente usando placeholders por restricciones de embed.`);
        });
    });
    
    // Añadir efecto de carga para iframes
    const allVideos = document.querySelectorAll('.video-wrapper');
    allVideos.forEach(video => {
        video.style.position = 'relative';
        const loading = document.createElement('div');
        loading.className = 'video-loading';
        loading.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        loading.style.position = 'absolute';
        loading.style.top = '50%';
        loading.style.left = '50%';
        loading.style.transform = 'translate(-50%, -50%)';
        loading.style.color = 'var(--accent-color)';
        loading.style.fontSize = '1.5rem';
        loading.style.zIndex = '5';
        video.appendChild(loading);
        
        const iframe = video.querySelector('iframe');
        if (iframe) {
            iframe.addEventListener('load', () => {
                loading.style.display = 'none';
            });
        }
    });
    
    // Efecto de scroll para secciones
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
});
