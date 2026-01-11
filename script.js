// FONDO DE RED NEURONAL TECNOLÓGICA
class TechBackground {
    constructor() {
        this.canvas = document.getElementById('techBackground');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.layers = 5; // Número de capas neuronales
        this.nodesPerLayer = 8; // Nodos por capa
        this.animationPhase = 0;
        
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    init() {
        this.resize();
        this.createNeuralNetwork();
        this.drawGrid();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createNeuralNetwork();
        this.drawGrid();
    }
    
    drawGrid() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        const gridSize = 50;
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
    
    createNeuralNetwork() {
        this.nodes = [];
        this.connections = [];
        
        const width = this.canvas.width;
        const height = this.canvas.height;
        const marginX = width * 0.1;
        const marginY = height * 0.15;
        const usableWidth = width - 2 * marginX;
        const usableHeight = height - 2 * marginY;
        const layerSpacing = usableWidth / (this.layers - 1);
        
        // Crear nodos organizados en capas
        for (let layer = 0; layer < this.layers; layer++) {
            const x = marginX + layer * layerSpacing;
            
            // Ajustar número de nodos por capa (más en capas intermedias)
            let nodesInLayer = this.nodesPerLayer;
            if (layer === 0 || layer === this.layers - 1) {
                nodesInLayer = Math.floor(this.nodesPerLayer * 0.7); // Menos nodos en capas de entrada/salida
            }
            
            const verticalSpacing = usableHeight / (nodesInLayer + 1);
            
            for (let i = 0; i < nodesInLayer; i++) {
                const y = marginY + (i + 1) * verticalSpacing;
                const jitter = 5; // Pequeña variación aleatoria
                const jitterX = (Math.random() - 0.5) * jitter;
                const jitterY = (Math.random() - 0.5) * jitter;
                
                this.nodes.push({
                    x: x + jitterX,
                    y: y + jitterY,
                    layer: layer,
                    size: Math.random() * 2 + 1.5,
                    pulsePhase: Math.random() * Math.PI * 2,
                    pulseSpeed: 0.01 + Math.random() * 0.02,
                    isActive: Math.random() > 0.7,
                    activation: 0
                });
            }
        }
        
        // Crear conexiones entre capas adyacentes
        for (let i = 0; i < this.nodes.length; i++) {
            const nodeA = this.nodes[i];
            
            for (let j = i + 1; j < this.nodes.length; j++) {
                const nodeB = this.nodes[j];
                const layerDiff = Math.abs(nodeA.layer - nodeB.layer);
                
                // Conectar solo nodos de capas adyacentes
                if (layerDiff === 1) {
                    const verticalDistance = Math.abs(nodeA.y - nodeB.y);
                    const maxDistance = height / (this.nodesPerLayer * 2);
                    
                    if (verticalDistance < maxDistance && Math.random() > 0.4) {
                        this.connections.push({
                            from: i,
                            to: j,
                            strength: Math.random() * 0.5 + 0.3,
                            pulsePhase: Math.random() * Math.PI * 2
                        });
                    }
                }
            }
        }
    }
    
    drawNeuralNetwork() {
        this.animationPhase += 0.005;
        
        // Dibujar conexiones primero
        for (const connection of this.connections) {
            const nodeA = this.nodes[connection.from];
            const nodeB = this.nodes[connection.to];
            
            const pulse = Math.sin(this.animationPhase * 2 + connection.pulsePhase) * 0.5 + 0.5;
            const distance = Math.sqrt(
                Math.pow(nodeB.x - nodeA.x, 2) + 
                Math.pow(nodeB.y - nodeA.y, 2)
            );
            
            const distanceFactor = Math.max(0, 1 - distance / 300);
            const opacity = 0.08 * connection.strength * pulse * distanceFactor;
            
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            this.ctx.lineWidth = 0.8;
            this.ctx.moveTo(nodeA.x, nodeA.y);
            this.ctx.lineTo(nodeB.x, nodeB.y);
            this.ctx.stroke();
            
            // Efecto de "pulso" de datos en algunas conexiones
            if (connection.strength > 0.6 && Math.random() > 0.95) {
                const progress = (Math.sin(this.animationPhase * 3 + connection.pulsePhase) * 0.5 + 0.5);
                
                const dataX = nodeA.x + (nodeB.x - nodeA.x) * progress;
                const dataY = nodeA.y + (nodeB.y - nodeA.y) * progress;
                
                // Punto de datos en movimiento
                this.ctx.beginPath();
                this.ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
                this.ctx.arc(dataX, dataY, 2, 0, Math.PI * 2);
                this.ctx.fill();
                
                // Glow alrededor del punto de datos
                const gradient = this.ctx.createRadialGradient(
                    dataX, dataY, 0,
                    dataX, dataY, 6
                );
                gradient.addColorStop(0, 'rgba(0, 212, 255, 0.6)');
                gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
                
                this.ctx.beginPath();
                this.ctx.fillStyle = gradient;
                this.ctx.arc(dataX, dataY, 6, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        
        // Dibujar nodos
        for (const node of this.nodes) {
            node.pulsePhase += node.pulseSpeed;
            const pulse = Math.sin(this.animationPhase * 1.5 + node.pulsePhase) * 0.3 + 0.7;
            
            // Gradiente para nodo
            const gradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, node.size * 3
            );
            gradient.addColorStop(0, `rgba(0, 212, 255, ${0.4 * pulse})`);
            gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
            
            this.ctx.beginPath();
            this.ctx.fillStyle = gradient;
            this.ctx.arc(node.x, node.y, node.size * 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Nodo central
            this.ctx.beginPath();
            this.ctx.fillStyle = node.isActive 
                ? `rgba(0, 212, 255, ${0.9 * pulse})` 
                : `rgba(100, 150, 255, ${0.6 * pulse})`;
            this.ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Borde del nodo
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.8 * pulse})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            this.ctx.stroke();
        }
    }
    
    animate() {
        // Fondo sólido
        this.ctx.fillStyle = '#0a0a1a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Cuadrícula
        this.drawGrid();
        
        // Red neuronal
        this.drawNeuralNetwork();
        
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
