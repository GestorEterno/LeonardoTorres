// Animación del fondo tecnológico (OPTIMIZADA)
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
        this.animationId = null;
        this.lastTime = 0;
        this.frameInterval = 1000 / 60; // 60 FPS
        
        this.init();
        this.animate(0);
        
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
        const particleCount = Math.min(100, Math.floor((this.canvas.width * this.canvas.height) / 10000));
        this.particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5 + 0.3,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                color: `rgba(255, 0, 255, ${Math.random() * 0.4 + 0.1})`,
                oscillation: Math.random() * Math.PI * 2
            });
        }
    }
    
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }
    
    clearCanvas() {
        this.ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawParticles() {
        for (let particle of this.particles) {
            particle.oscillation += 0.02;
            const oscillationX = Math.sin(particle.oscillation) * 0.3;
            const oscillationY = Math.cos(particle.oscillation * 0.7) * 0.3;
            
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
            
            this.ctx.beginPath();
            this.ctx.fillStyle = particle.color;
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    drawConnections() {
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
    }
    
    animate(timestamp) {
        if (!this.lastTime) this.lastTime = timestamp;
        const deltaTime = timestamp - this.lastTime;
        
        if (deltaTime > this.frameInterval) {
            this.clearCanvas();
            this.drawConnections();
            this.drawParticles();
            this.lastTime = timestamp - (deltaTime % this.frameInterval);
        }
        
        this.animationId = requestAnimationFrame((ts) => this.animate(ts));
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
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

// NAVBAR QUE DESAPARECE AL BAJAR Y APARECE AL SUBIR - CORREGIDO
class ScrollEffects {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScrollTop = 0;
        this.scrollThreshold = 50;
        this.hideThreshold = 5;
        this.isHidden = false;
        this.ticking = false;
        
        window.addEventListener('scroll', () => this.handleScroll());
        this.initSmoothScroll();
    }
    
    handleScroll() {
        if (!this.ticking) {
            this.ticking = true;
            requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollDirection = scrollTop > this.lastScrollTop;
                
                if (scrollTop > this.scrollThreshold) {
                    if (scrollDirection && !this.isHidden) {
                        // Ocultar al bajar
                        this.navbar.classList.add('hidden');
                        this.isHidden = true;
                    } else if (!scrollDirection && this.isHidden) {
                        // Mostrar al subir
                        this.navbar.classList.remove('hidden');
                        this.isHidden = false;
                    }
                } else if (this.isHidden) {
                    // Si estamos en el top, mostrar
                    this.navbar.classList.remove('hidden');
                    this.isHidden = false;
                }
                
                this.lastScrollTop = scrollTop;
                this.ticking = false;
            });
        }
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

// CARRUSEL DE SHORTS - CORREGIDO Y FUNCIONAL
class ShortsCarousel {
    constructor() {
        this.track = document.querySelector('.shorts-carousel-track');
        this.items = document.querySelectorAll('.short-item');
        this.prevBtn = document.querySelector('.shorts .carousel-btn.prev');
        this.nextBtn = document.querySelector('.shorts .carousel-btn.next');
        this.indicators = document.querySelectorAll('.shorts-indicators .indicator');
        
        this.currentPosition = 0;
        this.itemsPerView = this.calculateItemsPerView();
        this.totalItems = this.items.length;
        this.maxPosition = this.totalItems - this.itemsPerView;
        this.gap = 20;
        
        this.init();
    }
    
    calculateItemsPerView() {
        const width = window.innerWidth;
        if (width >= 1024) return 4;
        if (width >= 768) return 2;
        return 1;
    }
    
    init() {
        this.updateItemsPerView();
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.move(-1));
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.move(1));
        }
        
        if (this.indicators) {
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goToPosition(index));
            });
        }
        
        window.addEventListener('resize', () => {
            this.updateItemsPerView();
            this.updateCarousel();
        });
        
        this.updateCarousel();
        this.addTouchSupport();
    }
    
    updateItemsPerView() {
        this.itemsPerView = this.calculateItemsPerView();
        this.maxPosition = Math.max(0, this.totalItems - this.itemsPerView);
        
        if (this.currentPosition > this.maxPosition) {
            this.currentPosition = this.maxPosition;
        }
    }
    
    updateCarousel() {
        if (this.items.length === 0 || !this.track) return;
        
        const itemWidth = this.items[0].offsetWidth;
        const translateX = -(this.currentPosition * (itemWidth + this.gap));
        
        this.track.style.transform = `translateX(${translateX}px)`;
        this.updateIndicators();
        this.updateButtons();
    }
    
    updateIndicators() {
        if (!this.indicators) return;
        
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentPosition);
        });
    }
    
    updateButtons() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentPosition === 0;
            this.prevBtn.style.opacity = this.currentPosition === 0 ? '0.3' : '1';
            this.prevBtn.style.cursor = this.currentPosition === 0 ? 'not-allowed' : 'pointer';
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentPosition >= this.maxPosition;
            this.nextBtn.style.opacity = this.currentPosition >= this.maxPosition ? '0.3' : '1';
            this.nextBtn.style.cursor = this.currentPosition >= this.maxPosition ? 'not-allowed' : 'pointer';
        }
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
        if (!this.track) return;
        
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
                    this.move(1);
                } else {
                    this.move(-1);
                }
            }
        });
    }
}

// CARRUSEL DE CANALES - CORREGIDO Y FUNCIONAL
class ChannelsCarousel {
    constructor() {
        this.track = document.querySelector('.channels-carousel-track');
        this.items = document.querySelectorAll('.channel-item');
        this.prevBtn = document.querySelector('.channels .carousel-btn.prev');
        this.nextBtn = document.querySelector('.channels .carousel-btn.next');
        this.indicators = document.querySelectorAll('.channels .carousel-indicators .indicator');
        
        this.currentPosition = 0;
        this.itemsPerView = this.calculateItemsPerView();
        this.totalItems = this.items.length;
        this.maxPosition = this.totalItems - this.itemsPerView;
        this.gap = 20;
        
        this.init();
    }
    
    calculateItemsPerView() {
        const width = window.innerWidth;
        if (width >= 1024) return 5;
        if (width >= 768) return 2;
        return 1;
    }
    
    init() {
        this.updateItemsPerView();
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.move(-1));
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.move(1));
        }
        
        if (this.indicators) {
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goToPosition(index));
            });
        }
        
        window.addEventListener('resize', () => {
            this.updateItemsPerView();
            this.updateCarousel();
        });
        
        this.updateCarousel();
        this.addTouchSupport();
    }
    
    updateItemsPerView() {
        this.itemsPerView = this.calculateItemsPerView();
        this.maxPosition = Math.max(0, this.totalItems - this.itemsPerView);
        
        if (this.currentPosition > this.maxPosition) {
            this.currentPosition = this.maxPosition;
        }
    }
    
    updateCarousel() {
        if (this.items.length === 0 || !this.track) return;
        
        const itemWidth = this.items[0].offsetWidth;
        const translateX = -(this.currentPosition * (itemWidth + this.gap));
        
        this.track.style.transform = `translateX(${translateX}px)`;
        this.updateIndicators();
        this.updateButtons();
    }
    
    updateIndicators() {
        if (!this.indicators) return;
        
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentPosition);
        });
    }
    
    updateButtons() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentPosition === 0;
            this.prevBtn.style.opacity = this.currentPosition === 0 ? '0.3' : '1';
            this.prevBtn.style.cursor = this.currentPosition === 0 ? 'not-allowed' : 'pointer';
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentPosition >= this.maxPosition;
            this.nextBtn.style.opacity = this.currentPosition >= this.maxPosition ? '0.3' : '1';
            this.nextBtn.style.cursor = this.currentPosition >= this.maxPosition ? 'not-allowed' : 'pointer';
        }
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
        if (!this.track) return;
        
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
                    this.move(1);
                } else {
                    this.move(-1);
                }
            }
        });
    }
}

// Carrusel de Reseñas
class ReviewsCarousel {
    constructor() {
        this.cards = document.querySelectorAll('.review-card');
        this.dots = document.querySelectorAll('.reviews .dot');
        this.prevBtn = document.querySelector('.reviews .carousel-controls .carousel-btn.prev');
        this.nextBtn = document.querySelector('.reviews .carousel-controls .carousel-btn.next');
        this.currentIndex = 0;
        this.totalCards = this.cards.length;
        this.autoPlayInterval = null;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        if (this.dots) {
            this.dots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    const index = parseInt(e.target.getAttribute('data-index'));
                    if (index !== this.currentIndex && !this.isTransitioning) {
                        this.goToSlide(index);
                    }
                });
            });
        }
        
        this.startAutoPlay();
        
        const carouselTrack = document.querySelector('.reviews-carousel-track');
        if (carouselTrack) {
            carouselTrack.addEventListener('mouseenter', () => this.stopAutoPlay());
            carouselTrack.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        this.updateControls();
    }
    
    updateControls() {
        if (this.prevBtn) {
            this.prevBtn.style.opacity = '1';
            this.prevBtn.style.cursor = 'pointer';
        }
        
        if (this.nextBtn) {
            this.nextBtn.style.opacity = '1';
            this.nextBtn.style.cursor = 'pointer';
        }
        
        if (this.dots) {
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        }
        
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

// Efectos de hover optimizados (SIN LAG)
class HoverEffects {
    constructor() {
        this.initVideoHovers();
        this.initCardHovers();
    }
    
    initVideoHovers() {
        // Solo aplicar hover a elementos específicos, no a todos los videos
        const videoContainers = document.querySelectorAll('.video-container, .portfolio-item, .short-item-content, .feature-card, .channel-item');
        
        videoContainers.forEach(container => {
            container.addEventListener('mouseenter', (e) => {
                e.currentTarget.style.transition = 'transform 0.4s var(--ease-smooth), box-shadow 0.4s var(--ease-smooth)';
            });
            
            // Prevenir múltiples eventos
            container.addEventListener('mouseleave', (e) => {
                // Reset rápido sin transición
                setTimeout(() => {
                    e.currentTarget.style.transition = '';
                }, 10);
            });
        });
    }
    
    initCardHovers() {
        // Efecto sutil sin sobrecargar
        const cards = document.querySelectorAll('.feature-card, .portfolio-item, .short-item-content, .channel-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.zIndex = '';
            });
        });
    }
}

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar componentes principales
    const techBackground = new TechBackground();
    const navigation = new Navigation();
    const scrollEffects = new ScrollEffects();
    const hoverEffects = new HoverEffects();
    
    // Inicializar carruseles
    const shortsCarousel = new ShortsCarousel();
    const channelsCarousel = new ChannelsCarousel();
    const reviewsCarousel = new ReviewsCarousel();
    
    // Manejar logo del menú
    const logoImage = document.querySelector('.logo-image');
    const logoPlaceholder = document.querySelector('.logo-placeholder');
    
    if (logoImage) {
        logoImage.onerror = function() {
            this.style.display = 'none';
            if (logoPlaceholder) {
                logoPlaceholder.style.display = 'flex';
            }
        };
        
        logoImage.onload = function() {
            if (logoPlaceholder) {
                logoPlaceholder.style.display = 'none';
            }
        };
        
        if (!logoImage.src || logoImage.src.includes('undefined') || logoImage.src === window.location.href) {
            logoImage.style.display = 'none';
            if (logoPlaceholder) {
                logoPlaceholder.style.display = 'flex';
            }
        }
    }
    
    // Animación de entrada
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Actualizar año del copyright
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        const currentYear = new Date().getFullYear();
        copyright.textContent = copyright.textContent.replace('2023', currentYear);
    }
    
    // Optimizar iframes
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.setAttribute('loading', 'lazy');
        
        if (iframe.src.includes('drive.google.com')) {
            if (!iframe.src.includes('?')) {
                iframe.src += '?autoplay=0&mute=1';
            }
        }
    });
    
    // Indicadores de carga para videos
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
    
    // Observador de intersección para animaciones
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
    
    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Actualizar enlaces de reseñas
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
    
    // Puntos online dinámicos
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
    
    // Fallback para imágenes de canales
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
    
    // Fallback para imágenes de reseñas
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
    
    // Forzar actualización de carruseles después de carga
    setTimeout(() => {
        if (shortsCarousel && shortsCarousel.updateCarousel) {
            shortsCarousel.updateCarousel();
        }
        if (channelsCarousel && channelsCarousel.updateCarousel) {
            channelsCarousel.updateCarousel();
        }
    }, 1000);
    
    // Clase para scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    });
    
    // Prevenir comportamientos por defecto en toques
    document.addEventListener('touchstart', function(e) {
        if (e.target.tagName === 'IFRAME') {
            e.preventDefault();
        }
    }, { passive: false });
});

// Manejar recarga de página
window.addEventListener('beforeunload', () => {
    // Limpiar animaciones
    const techBackground = window.techBackground;
    if (techBackground && techBackground.destroy) {
        techBackground.destroy();
    }
});
