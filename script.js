// Fondo tecnológico animado (adaptado)
class TechBackground {
    constructor() {
        this.canvas = document.getElementById('techBackground');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 120 };
        this.animationId = null;
        this.init();
        this.animate();
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseleave', () => { this.mouse.x = null; this.mouse.y = null; });
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
        const count = Math.min(100, Math.floor((this.canvas.width * this.canvas.height) / 10000));
        this.particles = [];
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5 + 0.3,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                color: `rgba(155, 77, 255, ${Math.random() * 0.4 + 0.1})`,
                oscillation: Math.random() * Math.PI * 2
            });
        }
    }
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }
    draw() {
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (let p of this.particles) {
            p.oscillation += 0.02;
            p.x += p.speedX + Math.sin(p.oscillation) * 0.3;
            p.y += p.speedY + Math.cos(p.oscillation * 0.7) * 0.3;
            if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -0.95;
            if (p.y < 0 || p.y > this.canvas.height) p.speedY *= -0.95;
            if (this.mouse.x && this.mouse.y) {
                const dx = p.x - this.mouse.x, dy = p.y - this.mouse.y;
                const dist = Math.hypot(dx, dy);
                if (dist < this.mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (this.mouse.radius - dist) / this.mouse.radius;
                    p.x += Math.cos(angle) * force * 3;
                    p.y += Math.sin(angle) * force * 3;
                }
            }
            this.ctx.beginPath();
            this.ctx.fillStyle = p.color;
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i+1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const dist = Math.hypot(dx, dy);
                if (dist < 150) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(155, 77, 255, ${0.15 * (1 - dist/150)})`;
                    this.ctx.lineWidth = 0.3;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    animate() {
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    destroy() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
    }
}

// Navegación y menú hamburguesa
class Navigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
        }
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }
    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }
    closeMenu() {
        if (this.hamburger) this.hamburger.classList.remove('active');
        if (this.navMenu) this.navMenu.classList.remove('active');
    }
}

// Scroll effects: navbar oculta al bajar
class ScrollEffects {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScrollTop = 0;
        this.threshold = 50;
        this.isHidden = false;
        window.addEventListener('scroll', () => this.handleScroll());
        this.initSmoothScroll();
    }
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const direction = scrollTop > this.lastScrollTop;
        if (scrollTop > this.threshold) {
            if (direction && !this.isHidden) {
                this.navbar.classList.add('hidden');
                this.isHidden = true;
            } else if (!direction && this.isHidden) {
                this.navbar.classList.remove('hidden');
                this.isHidden = false;
            }
        } else if (this.isHidden) {
            this.navbar.classList.remove('hidden');
            this.isHidden = false;
        }
        this.lastScrollTop = scrollTop;
    }
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
                }
            });
        });
    }
}

// BOTÓN TROLL: abre Rickroll en nueva pestaña
function initTrollButton() {
    const trollBtn = document.getElementById('trollButton');
    if (trollBtn) {
        trollBtn.addEventListener('click', () => {
            window.open('https://www.youtube.com/watch?v=PyoRdu-i0AQ', '_blank');
        });
    }
}

// Intersection Observer para animaciones al hacer scroll
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));
}

// Fallback de imágenes (no crítico)
function initImageFallbacks() {
    const channelImages = document.querySelectorAll('.channel-image');
    channelImages.forEach(img => {
        img.onerror = function() {
            const fallback = this.parentElement?.querySelector('.channel-fallback');
            if (fallback) fallback.style.display = 'flex';
        };
    });
}

// Inicialización principal
document.addEventListener('DOMContentLoaded', () => {
    const bg = new TechBackground();
    const nav = new Navigation();
    const scroll = new ScrollEffects();
    initTrollButton();
    initScrollAnimations();
    initImageFallbacks();

    // Mostrar cuerpo con fade
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    setTimeout(() => { document.body.style.opacity = '1'; }, 100);

    // Actualizar año en copyright
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        const year = new Date().getFullYear();
        copyright.textContent = copyright.textContent.replace('2025', year);
    }

    // Cargar iframes con lazy
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => iframe.setAttribute('loading', 'lazy'));
});

window.addEventListener('beforeunload', () => {
    if (window.techBackground) window.techBackground.destroy();
});
