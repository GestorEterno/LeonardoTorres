// FONDO DE HOJA DE MATEMÁTICAS - SIMPLE Y LIMPIO
class TechBackground {
    constructor() {
        this.canvas = document.getElementById('techBackground');
        this.ctx = this.canvas.getContext('2d');
        
        this.init();
    }
    
    init() {
        this.resize();
        this.drawGrid();
        
        window.addEventListener('resize', () => {
            this.resize();
            this.drawGrid();
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    drawGrid() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Limpiar canvas con fondo oscuro
        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(0, 0, width, height);
        
        // Dibujar cuadrícula
        const gridSize = 50; // Tamaño de cuadrícula
        const lineColor = 'rgba(0, 150, 255, 0.1)';
        const subLineColor = 'rgba(0, 150, 255, 0.05)';
        
        // Líneas horizontales principales
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        
        for (let y = 0; y <= height; y += gridSize) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }
        
        // Líneas verticales principales
        for (let x = 0; x <= width; x += gridSize) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        
        ctx.stroke();
        
        // Líneas secundarias más tenues (cada 25px)
        ctx.beginPath();
        ctx.strokeStyle = subLineColor;
        ctx.lineWidth = 0.5;
        
        for (let y = 0; y <= height; y += gridSize/2) {
            if (y % gridSize !== 0) { // No dibujar donde ya hay línea principal
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
            }
        }
        
        for (let x = 0; x <= width; x += gridSize/2) {
            if (x % gridSize !== 0) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
            }
        }
        
        ctx.stroke();
        
        // Ejes coordenados en el centro (opcional)
        const centerX = width / 2;
        const centerY = height / 2;
        
        // Eje X
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();
        
        // Eje Y
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        ctx.stroke();
        
        // Marcas en los ejes
        ctx.fillStyle = 'rgba(0, 212, 255, 0.3)';
        ctx.font = '10px Arial';
        
        // Marcas en eje X
        for (let x = centerX; x < width; x += gridSize) {
            if (x !== centerX) {
                ctx.fillText((x - centerX)/gridSize, x - 5, centerY + 15);
                // Marcas izquierda
                const leftX = centerX - (x - centerX);
                ctx.fillText(-(x - centerX)/gridSize, leftX - 5, centerY + 15);
            }
        }
        
        // Marcas en eje Y
        for (let y = centerY; y < height; y += gridSize) {
            if (y !== centerY) {
                ctx.fillText(-(y - centerY)/gridSize, centerX + 8, y + 3);
                // Marcas arriba
                const upY = centerY - (y - centerY);
                ctx.fillText((y - centerY)/gridSize, centerX + 8, upY + 3);
            }
        }
        
        // Origen (0,0)
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
        ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText('O', centerX + 5, centerY - 5);
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
