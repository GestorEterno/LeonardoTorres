// Animación del fondo tecnológico - VERSIÓN PERFECTA
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
        this.createParticles();
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
                color: `rgba(255, 0, 255, ${Math.random() * 0.4 + 0.1})`,
                originalX: null,
                originalY: null,
                oscillation: Math.random() * Math.PI * 2,
                trailPositions: []
            });
        }
    }
    
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }
    
    clearCanvas() {
        // Limpieza mejorada
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, 
            this.canvas.height / 2, 
            0,
            this.canvas.width / 2, 
            this.canvas.height / 2, 
            Math.max(this.canvas.width, this.canvas.height) / 1.5
        );
        
        gradient.addColorStop(0, 'rgba(10, 10, 26, 0.15)');
        gradient.addColorStop(0.5, 'rgba(10, 10, 26, 0.25)');
        gradient.addColorStop(1, 'rgba(10, 10, 26, 0.4)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = 'rgba(10, 10, 26, 0.02)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawParticles() {
        const currentTime = Date.now();
        
        // Dibujar conexiones primero
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = 0.15 * (1 - distance/150);
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 0, 255, ${opacity})`;
                    this.ctx.lineWidth = 0.3;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        // Dibujar partículas
        for (let particle of this.particles) {
            particle.oscillation += 0.02;
            const oscillationX = Math.sin(particle.oscillation) * 0.3;
            const oscillationY = Math.cos(particle.oscillation * 0.7) * 0.3;
            
            particle.trailPositions.unshift({x: particle.x, y: particle.y, time: currentTime});
            
            if (particle.trailPositions.length > 3) {
                particle.trailPositions.pop();
            }
            
            particle.x += particle.speedX + oscillationX;
            particle.y += particle.speedY + oscillationY;
            
            // Rebote
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX *= -0.95;
                particle.x = Math.max(1, Math.min(this.canvas.width - 1, particle.x));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY *= -0.95;
                particle.y = Math.max(1, Math.min(this.canvas.height - 1, particle.y));
            }
            
            // Interacción con el mouse
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
            
            // DIBUJAR RASTRO
            for (let i = 0; i < particle.trailPositions.length; i++) {
                const trail = particle.trailPositions[i];
                const age = currentTime - trail.time;
                const fade = Math.max(0, 1 - (age / 200));
                
                if (fade > 0) {
                    const trailSize = particle.size * (0.5 - i * 0.15);
                    const trailOpacity = 0.1 * fade;
                    
                    this.ctx.beginPath();
                    this.ctx.fillStyle = `rgba(255, 0, 255, ${trailOpacity})`;
                    this.ctx.arc(trail.x, trail.y, trailSize, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            }
            
            // DIBUJAR PARTÍCULA PRINCIPAL
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 2
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, 'rgba(255, 0, 255, 0)');
            
            this.ctx.beginPath();
            this.ctx.fillStyle = gradient;
            this.ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.beginPath();
            this.ctx.fillStyle = particle.color;
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Punto de luz
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
        this.clearCanvas();
        
        // Efectos de luz de fondo
        const light1 = this.ctx.createRadialGradient(
            this.canvas.width * 0.2, 
            this.canvas.height * 0.5, 
            0,
            this.canvas.width * 0.2, 
            this.canvas.height * 0.5, 
            this.canvas.width * 0.4
        );
        light1.addColorStop(0, 'rgba(156, 39, 176, 0.05)');
        light1.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = light1;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        const light2 = this.ctx.createRadialGradient(
            this.canvas.width * 0.8, 
            this.canvas.height * 0.2, 
            0,
            this.canvas.width * 0.8, 
            this.canvas.height * 0.2, 
            this.canvas.width * 0.3
        );
        light2.addColorStop(0, 'rgba(255, 0, 255, 0.03)');
        light2.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = light2;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawParticles();
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===== MENÚ MÓVIL MEJORADO =====
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger.right-align');
        this.closeBtn = document.querySelector('.close-menu');
        this.navOverlay = document.querySelector('.nav-overlay');
        this.navMenu = document.querySelector('.nav-menu-mobile');
        
        if (!this.hamburger) return;
        
        this.init();
    }
    
    init() {
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        this.closeBtn?.addEventListener('click', () => this.closeMenu());
        this.navOverlay?.addEventListener('click', () => this.closeMenu());
        
        // Cerrar menú al hacer clic en enlaces
        document.querySelectorAll('.mobile-nav-list .nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }
    
    toggleMenu() {
        const isActive = this.navMenu.classList.contains('active');
        
        if (isActive) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        document.body.style.overflow = 'hidden';
        this.navMenu.classList.add('active');
        this.navOverlay.classList.add('active');
        this.hamburger.classList.add('active');
    }
    
    closeMenu() {
        document.body.style.overflow = '';
        this.navMenu.classList.remove('active');
        this.navOverlay.classList.remove('active');
        this.hamburger.classList.remove('active');
    }
}

// ===== CARRUSEL GENÉRICO PARA MÓVIL =====
class MobileCarousel {
    constructor(containerSelector, options = {}) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        
        this.track = this.container.querySelector('.carousel-track');
        this.slides = Array.from(this.track.children);
        this.prevBtn = this.container.querySelector('.carousel-btn.prev');
        this.nextBtn = this.container.querySelector('.carousel-btn.next');
        this.dotsContainer = this.container.querySelector('.carousel-dots');
        
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.isTransitioning = false;
        this.autoPlayInterval = null;
        
        // Opciones
        this.autoPlay = options.autoPlay || false;
        this.autoPlayDelay = options.autoPlayDelay || 5000;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        this.createDots();
        this.addEventListeners();
        this.updateCarousel();
        
        if (this.autoPlay) {
            this.startAutoPlay();
        }
        
        // Solo para móvil
        if (window.innerWidth <= 768) {
            this.addTouchEvents();
        }
    }
    
    createDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-index', i);
            if (i === 0) dot.classList.add('active');
            this.dotsContainer.appendChild(dot);
        }
        
        this.dots = Array.from(this.dotsContainer.children);
    }
    
    addEventListeners() {
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
        
        this.dots?.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                if (index !== this.currentIndex && !this.isTransitioning) {
                    this.goToSlide(index);
                }
            });
        });
        
        // Pausar autoplay al interactuar
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => {
            if (this.autoPlay) this.startAutoPlay();
        });
    }
    
    addTouchEvents() {
        this.track.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.stopAutoPlay();
        });
        
        this.track.addEventListener('touchmove', (e) => {
            this.touchEndX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', () => {
            this.handleSwipe();
            if (this.autoPlay) this.startAutoPlay();
        });
    }
    
    handleSwipe() {
        const threshold = 50;
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }
    
    updateCarousel() {
        const translateX = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        this.updateDots();
        this.updateButtons();
    }
    
    updateDots() {
        if (!this.dots) return;
        
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    updateButtons() {
        // Siempre activos
        this.prevBtn.style.opacity = '1';
        this.prevBtn.style.cursor = 'pointer';
        this.nextBtn.style.opacity = '1';
        this.nextBtn.style.cursor = 'pointer';
    }
    
    prev() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        if (this.currentIndex === 0) {
            this.currentIndex = this.totalSlides - 1;
        } else {
            this.currentIndex--;
        }
        
        this.updateCarousel();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }
    
    next() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        if (this.currentIndex === this.totalSlides - 1) {
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }
        
        this.updateCarousel();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides && !this.isTransitioning) {
            this.isTransitioning = true;
            this.currentIndex = index;
            this.updateCarousel();
            
            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        }
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        if (this.autoPlay) {
            this.autoPlayInterval = setInterval(() => {
                this.next();
            }, this.autoPlayDelay);
        }
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// ===== CARRUSEL DE RESEÑAS =====
class ReviewsCarousel {
    constructor() {
        this.cards = document.querySelectorAll('.review-card');
        this.dots = document.querySelectorAll('.reviews .dot');
        this.prevBtn = document.querySelector('.reviews .carousel-btn.prev');
        this.nextBtn = document.querySelector('.reviews .carousel-btn.next');
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
        this.prevBtn.style.opacity = '1';
        this.prevBtn.style.cursor = 'pointer';
        this.nextBtn.style.opacity = '1';
        this.nextBtn.style.cursor = 'pointer';
        
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
        if (!this.isTransitioning) {
            this.isTransitioning = true;
            
            if (this.currentIndex === 0) {
                this.currentIndex = this.totalCards - 1;
            } else {
                this.currentIndex--;
            }
            
            this.updateControls();
            
            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        }
    }
    
    next() {
        if (!this.isTransitioning) {
            this.isTransitioning = true;
            
            if (this.currentIndex === this.totalCards - 1) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
            
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
            this.next();
        }, 10000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// ===== EFECTOS DE SCROLL =====
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

// ===== EFECTOS DE HOVER =====
class HoverEffects {
    constructor() {
        this.initCardHovers();
        this.initVideoHovers();
        this.initChannelsHover();
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
                glow.style.background = 'radial-gradient(circle at center, rgba(255,0,255,0.15) 0%, transparent 70%)';
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
    
    initChannelsHover() {
        const channelItems = document.querySelectorAll('.channel-item');
        
        channelItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const avatar = item.querySelector('.avatar-circle');
                if (avatar) {
                    avatar.style.boxShadow = '0 15px 35px rgba(255, 0, 255, 0.4)';
                }
                
                const onlineDot = item.querySelector('.online-dot.active');
                if (onlineDot) {
                    onlineDot.style.transform = 'scale(1.3)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const avatar = item.querySelector('.avatar-circle');
                if (avatar) {
                    avatar.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
                }
                
                const onlineDot = item.querySelector('.online-dot.active');
                if (onlineDot) {
                    onlineDot.style.transform = 'scale(1)';
                }
            });
        });
    }
}

// ===== INICIALIZACIÓN COMPLETA =====
document.addEventListener('DOMContentLoaded', () => {
    // 1. Fondo animado
    const techBackground = new TechBackground();
    
    // 2. Menú móvil
    const mobileMenu = new MobileMenu();
    
    // 3. Efectos de scroll
    const scrollEffects = new ScrollEffects();
    
    // 4. Efectos de hover
    const hoverEffects = new HoverEffects();
    
    // 5. Carrusel de reseñas
    const reviewsCarousel = new ReviewsCarousel();
    
    // 6. Inicializar carruseles móviles
    let mobileCarousels = [];
    
    if (window.innerWidth <= 768) {
        // Carrusel de características
        const featuresCarousel = new MobileCarousel('.features-carousel-container', {
            autoPlay: true,
            autoPlayDelay: 6000
        });
        if (featuresCarousel.container) mobileCarousels.push(featuresCarousel);
        
        // Carrusel de portafolio
        const portfolioCarousel = new MobileCarousel('.portfolio-carousel-container', {
            autoPlay: false
        });
        if (portfolioCarousel.container) mobileCarousels.push(portfolioCarousel);
        
        // Carrusel de shorts
        const shortsCarousel = new MobileCarousel('.shorts-carousel-container', {
            autoPlay: true,
            autoPlayDelay: 7000
        });
        if (shortsCarousel.container) mobileCarousels.push(shortsCarousel);
        
        // Carrusel de canales
        const channelsCarousel = new MobileCarousel('.channels-carousel-container', {
            autoPlay: false
        });
        if (channelsCarousel.container) mobileCarousels.push(channelsCarousel);
    }
    
    // 7. Efectos de animación del hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.classList.add('animate-title');
        
        const gradientSpans = heroTitle.querySelectorAll('.gradient-text');
        gradientSpans.forEach((span, index) => {
            span.style.animationDelay = `${0.3 + (index * 0.2)}s`;
        });
        
        // Animación para los botones del hero
        const heroButtons = document.querySelectorAll('.hero-buttons .cta-button');
        heroButtons.forEach((button, index) => {
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px)';
            button.style.animation = 'fadeInUp 1s ease forwards';
            button.style.animationDelay = `${1.1 + (index * 0.2)}s`;
        });
    }
    
    // 8. Fade in inicial
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 9. Actualizar copyright
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        const currentYear = new Date().getFullYear();
        copyright.textContent = copyright.textContent.replace('2023', currentYear);
    }
    
    // 10. Lazy loading para iframes
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.setAttribute('loading', 'lazy');
        
        if (iframe.src.includes('drive.google.com')) {
            if (!iframe.src.includes('?')) {
                iframe.src += '?autoplay=0&mute=1';
            }
        }
    });
    
    // 11. Indicadores de carga para videos
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
    
    // 12. Observer para animaciones al hacer scroll
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.id === 'canales') {
                    const channelItems = entry.target.querySelectorAll('.channel-item');
                    channelItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(30px)';
                            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                            
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 100);
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // 13. Enlaces de canales en reseñas
    const reviewLinks = [
        'https://www.youtube.com/@GROSSO_MODO/videos',
        'https://www.youtube.com/@PixelHeroRBX/videos',
        'https://www.youtube.com/@elkaidram',
        'https://www.youtube.com/@Mordyto/videos',
        'https://www.youtube.com/@soyzer'
    ];
    
    document.querySelectorAll('.review-channel-link').forEach((link, index) => {
        if (index < reviewLinks.length && reviewLinks[index] !== '#') {
            link.setAttribute('href', reviewLinks[index]);
        }
    });
    
    // 14. Rotación de estado online en canales
    const onlineDots = document.querySelectorAll('.online-dot');
    if (onlineDots.length > 0) {
        setInterval(() => {
            onlineDots.forEach(dot => {
                dot.classList.remove('active');
                dot.style.background = '#666';
            });
            
            const randomIndex = Math.floor(Math.random() * onlineDots.length);
            onlineDots[randomIndex].classList.add('active');
            onlineDots[randomIndex].style.background = '#ff00ff';
        }, 5000);
    }
    
    // 15. Fallback para imágenes
    const channelImages = document.querySelectorAll('.channel-image, .review-image');
    channelImages.forEach(img => {
        img.onerror = function() {
            const parent = this.parentElement;
            const fallback = parent.querySelector('.channel-fallback, .review-fallback');
            if (fallback) {
                fallback.style.display = 'flex';
                fallback.style.alignItems = 'center';
                fallback.style.justifyContent = 'center';
                fallback.style.width = '100%';
                fallback.style.height = '100%';
            }
        };
    });
    
    // 16. Manejo de redimensionamiento
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth <= 768 && mobileCarousels.length === 0) {
                // Recargar si cambia a móvil y no hay carruseles
                location.reload();
            }
        }, 250);
    });
    
    // 17. Smooth scroll mejorado
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // Cerrar menú móvil si está abierto
                if (window.innerWidth <= 768 && mobileMenu.navMenu.classList.contains('active')) {
                    mobileMenu.closeMenu();
                }
                
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log('✅ Portfolio de Leonardo Torres cargado exitosamente');
    console.log(`📱 Modo: ${window.innerWidth <= 768 ? 'Móvil' : 'Escritorio'}`);
    console.log(`🎬 Carruseles móviles inicializados: ${mobileCarousels.length}`);
});
