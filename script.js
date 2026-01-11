// FONDO DE RED TECNOLÓGICA DE DATOS
class TechBackground {
    constructor() {
        this.canvas = document.getElementById('techBackground');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = []; // Puntos/nodos fijos
        this.connections = []; // Conexiones entre nodos
        this.dataFlows = []; // Flujos de datos animados
        this.time = 0;
        this.gridSpacing = 60;
        
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    init() {
        this.resize();
        this.createGrid();
        this.createDataFlows();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createGrid();
        this.createDataFlows();
    }
    
    createGrid() {
        this.nodes = [];
        this.connections = [];
        
        const cols = Math.ceil(this.canvas.width / this.gridSpacing);
        const rows = Math.ceil(this.canvas.height / this.gridSpacing);
        
        // Crear nodos en una cuadrícula
        for (let x = 0; x <= cols; x++) {
            for (let y = 0; y <= rows; y++) {
                const nodeX = x * this.gridSpacing + (Math.random() * 10 - 5);
                const nodeY = y * this.gridSpacing + (Math.random() * 10 - 5);
                
                this.nodes.push({
                    x: nodeX,
                    y: nodeY,
                    originalX: nodeX,
                    originalY: nodeY,
                    pulse: Math.random() * Math.PI * 2
                });
            }
        }
        
        // Crear conexiones entre nodos cercanos
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Conectar nodos que estén a una distancia razonable
                if (distance < this.gridSpacing * 1.8) {
                    this.connections.push({
                        node1: i,
                        node2: j,
                        distance: distance,
                        opacity: Math.random() * 0.3 + 0.1,
                        speed: Math.random() * 0.02 + 0.005,
                        phase: Math.random() * Math.PI * 2
                    });
                }
            }
        }
    }
    
    createDataFlows() {
        this.dataFlows = [];
        
        // Crear flujos de datos que viajan por las conexiones
        for (let i = 0; i < this.connections.length / 3; i++) {
            const connIndex = Math.floor(Math.random() * this.connections.length);
            const conn = this.connections[connIndex];
            const node1 = this.nodes[conn.node1];
            const node2 = this.nodes[conn.node2];
            
            this.dataFlows.push({
                connection: connIndex,
                position: Math.random(), // posición en la línea (0 a 1)
                speed: conn.speed * (Math.random() * 0.5 + 0.5),
                size: Math.random() * 3 + 1,
                color: Math.random() > 0.5 ? '#00d4ff' : '#0066ff'
            });
        }
    }
    
    drawGrid() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Fondo sólido oscuro
        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(0, 0, width, height);
        
        // Cuadrícula más sutil
        const gridSize = 60;
        const lineColor = 'rgba(0, 150, 255, 0.08)';
        
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.5;
        
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
    
    drawNetwork() {
        this.time += 0.01;
        
        // Dibujar conexiones primero (líneas)
        for (let conn of this.connections) {
            const node1 = this.nodes[conn.node1];
            const node2 = this.nodes[conn.node2];
            
            // Efecto de pulso en las líneas
            const pulse = Math.sin(this.time * conn.speed + conn.phase) * 0.5 + 0.5;
            const opacity = conn.opacity * (0.7 + 0.3 * pulse);
            
            // Dibujar línea de conexión
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            this.ctx.lineWidth = 0.8;
            this.ctx.moveTo(node1.x, node1.y);
            this.ctx.lineTo(node2.x, node2.y);
            this.ctx.stroke();
            
            // Efecto de brillo en los puntos de conexión
            const gradient = this.ctx.createRadialGradient(
                node1.x, node1.y, 0,
                node1.x, node1.y, 3
            );
            gradient.addColorStop(0, `rgba(0, 212, 255, ${opacity + 0.2})`);
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.beginPath();
            this.ctx.fillStyle = gradient;
            this.ctx.arc(node1.x, node1.y, 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            const gradient2 = this.ctx.createRadialGradient(
                node2.x, node2.y, 0,
                node2.x, node2.y, 3
            );
            gradient2.addColorStop(0, `rgba(0, 212, 255, ${opacity + 0.2})`);
            gradient2.addColorStop(1, 'transparent');
            
            this.ctx.beginPath();
            this.ctx.fillStyle = gradient2;
            this.ctx.arc(node2.x, node2.y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        // Dibujar flujos de datos (puntos que viajan por las líneas)
        for (let flow of this.dataFlows) {
            const conn = this.connections[flow.connection];
            const node1 = this.nodes[conn.node1];
            const node2 = this.nodes[conn.node2];
            
            // Actualizar posición del flujo
            flow.position += flow.speed;
            if (flow.position > 1) flow.position = 0;
            
            // Calcular posición actual en la línea
            const x = node1.x + (node2.x - node1.x) * flow.position;
            const y = node1.y + (node2.y - node1.y) * flow.position;
            
            // Efecto de brillo del punto de datos
            const pulseSize = Math.sin(this.time * 5 + flow.position * Math.PI) * 1 + flow.size;
            
            const gradient = this.ctx.createRadialGradient(
                x, y, 0,
                x, y, pulseSize * 1.5
            );
            gradient.addColorStop(0, flow.color);
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.beginPath();
            this.ctx.fillStyle = gradient;
            this.ctx.arc(x, y, pulseSize * 1.5, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Punto central brillante
            this.ctx.beginPath();
            this.ctx.fillStyle = flow.color;
            this.ctx.arc(x, y, flow.size / 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        // Dibujar nodos principales (más grandes en intersecciones)
        for (let node of this.nodes) {
            // Pequeño movimiento sutil
            node.pulse += 0.01;
            const pulseOffset = Math.sin(node.pulse) * 0.5;
            
            // Dibujar nodo
            this.ctx.beginPath();
            this.ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
            this.ctx.arc(node.x, node.y, 1.2 + pulseOffset, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Brillo alrededor del nodo
            const gradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, 4
            );
            gradient.addColorStop(0, 'rgba(0, 212, 255, 0.3)');
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.beginPath();
            this.ctx.fillStyle = gradient;
            this.ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    animate() {
        // Dibujar cuadrícula de fondo
        this.drawGrid();
        
        // Dibujar red tecnológica
        this.drawNetwork();
        
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
