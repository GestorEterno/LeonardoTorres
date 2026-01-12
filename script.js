// Animación del fondo tecnológico - VERSIÓN CORREGIDA PERFECTA
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
                trailPositions: [] // Para rastros controlados
            });
        }
    }
    
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }
    
    clearCanvas() {
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
        
        // Dibujar partículas con un sistema de rastro controlado
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
            
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX *= -0.95;
                particle.x = Math.max(1, Math.min(this.canvas.width - 1, particle.x));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY *= -0.95;
                particle.y = Math.max(1, Math.min(this.canvas.height - 1, particle.y));
            }
            
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

// ===== CARRUSEL DE SHORTS - 4 VISIBLES, DESPLAZAMIENTO DE 1 =====
class ShortsCarousel {
    constructor() {
        this.track = document.querySelector('.shorts-carousel-track');
        this.items = document.querySelectorAll('.short-item');
        this.prevBtn = document.querySelector('.shorts .carousel-btn.prev');
        this.nextBtn = document.querySelector('.shorts .carousel-btn.next');
        this.indicators = document.querySelectorAll('.shorts .indicator');
        
        this.currentPosition = 0;
        this.itemsPerView = 4; // Desktop: 4 elementos visibles
        this.totalItems = this.items.length;
        this.maxPosition = this.totalItems - this.itemsPerView; // Máxima posición (0 a 2)
        this.gap = 25; // Gap entre elementos en px
        
        this.init();
    }
    
    init() {
        // Calcular elementos por vista basado en el ancho de la pantalla
        this.updateItemsPerView();
        
        // Configurar eventos
        this.prevBtn.addEventListener('click', () => this.move(-1));
        this.nextBtn.addEventListener('click', () => this.move(1));
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToPosition(index));
        });
        
        // Evento de resize
        window.addEventListener('resize', () => {
            this.updateItemsPerView();
            this.updateCarousel();
        });
        
        // Inicializar
        this.updateCarousel();
        
        // Agregar soporte táctil
        this.addTouchSupport();
    }
    
    updateItemsPerView() {
        const width = window.innerWidth;
        if (width >= 1024) {
            this.itemsPerView = 4; // Desktop
        } else if (width >= 768) {
            this.itemsPerView = 2; // Tablet
        } else {
            this.itemsPerView = 1; // Móvil
        }
        
        this.maxPosition = Math.max(0, this.totalItems - this.itemsPerView);
        
        // Ajustar posición actual si es necesario
        if (this.currentPosition > this.maxPosition) {
            this.currentPosition = this.maxPosition;
        }
    }
    
    updateCarousel() {
        // Calcular desplazamiento basado en un solo elemento
        const itemWidth = this.items[0].offsetWidth;
        const translateX = -(this.currentPosition * (itemWidth + this.gap));
        
        // Aplicar transformación
        this.track.style.transform = `translateX(${translateX}px)`;
        
        // Actualizar indicadores
        this.updateIndicators();
        
        // Actualizar estado de botones
        this.updateButtons();
    }
    
    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            // Mapear posición a indicador (0, 1, 2 posiciones -> 0, 1, 2 indicadores)
            indicator.classList.toggle('active', index === this.currentPosition);
        });
    }
    
    updateButtons() {
        this.prevBtn.disabled = this.currentPosition === 0;
        this.nextBtn.disabled = this.currentPosition >= this.maxPosition;
    }
    
    move(direction) {
        const newPosition = this.currentPosition + direction;
        
        if (newPosition >= 0 && newPosition <= this.maxPosition) {
            this.currentPosition = newPosition;
            this.updateCarousel();
        }
    }
    
    goToPosition(position) {
        if (position >= 0 && position <= this.maxPosition) {
            this.currentPosition = position;
            this.updateCarousel();
        }
    }
    
    addTouchSupport() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            currentX = startX;
            isDragging = true;
        });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Deslizamiento hacia la izquierda = siguiente
                    this.move(1);
                } else {
                    // Deslizamiento hacia la derecha = anterior
                    this.move(-1);
                }
            }
        });
    }
}

// ===== CARRUSEL DE CANALES - 5 VISIBLES, DESPLAZAMIENTO DE 1 =====
class ChannelsCarousel {
    constructor() {
        this.track = document.querySelector('.channels-carousel-track');
        this.items = document.querySelectorAll('.channel-item');
        this.prevBtn = document.querySelector('.channels .carousel-btn.prev');
        this.nextBtn = document.querySelector('.channels .carousel-btn.next');
        this.indicators = document.querySelectorAll('.channels .indicator');
        
        this.currentPosition = 0;
        this.itemsPerView = 5; // Desktop: 5 elementos visibles
        this.totalItems = this.items.length;
        this.maxPosition = this.totalItems - this.itemsPerView; // Máxima posición (0 a 2)
        this.gap = 25; // Gap entre elementos en px
        
        this.init();
    }
    
    init() {
        // Calcular elementos por vista basado en el ancho de la pantalla
        this.updateItemsPerView();
        
        // Configurar eventos
        this.prevBtn.addEventListener('click', () => this.move(-1));
        this.nextBtn.addEventListener('click', () => this.move(1));
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToPosition(index));
        });
        
        // Evento de resize
        window.addEventListener('resize', () => {
            this.updateItemsPerView();
            this.updateCarousel();
        });
        
        // Inicializar
        this.updateCarousel();
        
        // Agregar soporte táctil
        this.addTouchSupport();
    }
    
    updateItemsPerView() {
        const width = window.innerWidth;
        if (width >= 1024) {
            this.itemsPerView = 5; // Desktop
        } else if (width >= 768) {
            this.itemsPerView = 2; // Tablet
        } else {
            this.itemsPerView = 1; // Móvil
        }
        
        this.maxPosition = Math.max(0, this.totalItems - this.itemsPerView);
        
        // Ajustar posición actual si es necesario
        if (this.currentPosition > this.maxPosition) {
            this.currentPosition = this.maxPosition;
        }
    }
    
    updateCarousel() {
        // Calcular desplazamiento basado en un solo elemento
        const itemWidth = this.items[0].offsetWidth;
        const translateX = -(this.currentPosition * (itemWidth + this.gap));
        
        // Aplicar transformación
        this.track.style.transform = `translateX(${translateX}px)`;
        
        // Actualizar indicadores
        this.updateIndicators();
        
        // Actualizar estado de botones
        this.updateButtons();
    }
    
    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            // Mapear posición a indicador (0, 1, 2 posiciones -> 0, 1, 2 indicadores)
            indicator.classList.toggle('active', index === this.currentPosition);
        });
    }
    
    updateButtons() {
        this.prevBtn.disabled = this.currentPosition === 0;
        this.nextBtn.disabled = this.currentPosition >= this.maxPosition;
    }
    
    move(direction) {
        const newPosition = this.currentPosition + direction;
        
        if (newPosition >= 0 && newPosition <= this.maxPosition) {
            this.currentPosition = newPosition;
            this.updateCarousel();
        }
    }
    
    goToPosition(position) {
        if (position >= 0 && position <= this.maxPosition) {
            this.currentPosition = position;
            this.updateCarousel();
        }
    }
    
    addTouchSupport() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            currentX = startX;
            isDragging = true;
        });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Deslizamiento hacia la izquierda = siguiente
                    this.move(1);
                } else {
                    // Deslizamiento hacia la derecha = anterior
                    this.move(-1);
                }
            }
        });
    }
}

// Carrusel de reseñas - INFINITO CON TIEMPO DOBLE
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

// Efectos de hover para canales
class ChannelsHoverEffects {
    constructor() {
        this.initChannelsHover();
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

// Efectos de hover generales
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
}

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const techBackground = new TechBackground();
    const navigation = new Navigation();
    const scrollEffects = new ScrollEffects();
    
    // Inicializar carruseles
    const shortsCarousel = new ShortsCarousel();
    const channelsCarousel = new ChannelsCarousel();
    const reviewsCarousel = new ReviewsCarousel();
    
    const channelsHoverEffects = new ChannelsHoverEffects();
    const hoverEffects = new HoverEffects();
    
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
    
    // Smooth scroll para enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Actualizar enlaces de canales en reseñas para que coincidan con los canales
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
    
    // Rotación automática de canales online
    const onlineDots = document.querySelectorAll('.online-dot');
    
    setInterval(() => {
        onlineDots.forEach(dot => {
            dot.classList.remove('active');
            dot.style.background = '#666';
        });
        
        const randomIndex = Math.floor(Math.random() * onlineDots.length);
        onlineDots[randomIndex].classList.add('active');
        onlineDots[randomIndex].style.background = '#ff00ff';
    }, 5000);
    
    // Manejar carga de imágenes de canales
    const channelImages = document.querySelectorAll('.channel-image');
    channelImages.forEach(img => {
        img.onerror = function() {
            const fallback = this.parentElement.querySelector('.channel-fallback');
            if (fallback) {
                fallback.style.display = 'flex';
                fallback.style.alignItems = 'center';
                fallback.style.justifyContent = 'center';
                fallback.style.width = '100%';
                fallback.style.height = '100%';
            }
        };
    });
    
    // Manejar carga de imágenes de reseñas
    const reviewImages = document.querySelectorAll('.review-image');
    reviewImages.forEach(img => {
        img.onerror = function() {
            const fallback = this.parentElement.querySelector('.review-fallback');
            if (fallback) {
                fallback.style.display = 'flex';
                fallback.style.alignItems = 'center';
                fallback.style.justifyContent = 'center';
                fallback.style.width = '100%';
                fallback.style.height = '100%';
            }
        };
    });
    
    // Forzar recálculo después de que todo cargue
    setTimeout(() => {
        if (shortsCarousel.updateCarousel) shortsCarousel.updateCarousel();
        if (channelsCarousel.updateCarousel) channelsCarousel.updateCarousel();
    }, 500);
});
