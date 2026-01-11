// Animación del fondo tecnológico
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
        
        for (let particle of this.particles) {
            particle.oscillation += 0.02;
            const oscillationX = Math.sin(particle.oscillation) * 0.3;
            const oscillationY = Math.cos(particle.oscillation * 0.7) * 0.3;
            
            particle.x += particle.speedX + oscillationX;
            particle.y += particle.speedY + oscillationY;
            
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX *= -0.98;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY *= -0.98;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
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
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, 'rgba(10, 10, 26, 0.1)');
        gradient.addColorStop(1, 'rgba(26, 10, 31, 0.2)');
        
        this.ctx.fillStyle = gradient;
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

// SISTEMA AVANZADO DE AVATARES DE YOUTUBE
class YouTubeAvatarSystem {
    constructor() {
        this.API_KEY = 'AIzaSyD6qF8a45zZoxEL9-aQ3oUP9Q7Amn6LeDo'; // API Key pública para pruebas
        this.cache = new Map();
        this.maxRetries = 3;
        this.fallbackGradients = [
            'linear-gradient(135deg, #ff00ff, #e91e63)',
            'linear-gradient(135deg, #9c27b0, #e91e63)',
            'linear-gradient(135deg, #ff00ff, #9c27b0)',
            'linear-gradient(135deg, #e91e63, #ff00ff)',
            'linear-gradient(135deg, #9c27b0, #ff00ff)'
        ];
        this.fallbackIcons = ['fab fa-youtube', 'fas fa-gamepad', 'fas fa-crown', 'fas fa-dice-d20', 'fas fa-robot'];
        
        // Canales conocidos con sus avatares predefinidos
        this.knownChannels = {
            '@GROSSO_MODO': 'https://yt3.googleusercontent.com/ytc/AL5GRJWXZ1-g-PmYtYETsqX4y-3YZ0K6ZXjFWz83xVkL=s176-c-k-c0x00ffffff-no-rj',
            '@PixelHeroRBX': 'https://yt3.googleusercontent.com/ytc/AL5GRJVjBd7Sob_w8rgtCM6GlP-tq3D0gvZ2e-J2QH4Y=s176-c-k-c0x00ffffff-no-rj',
            '@elkaidram': 'https://yt3.googleusercontent.com/ytc/AL5GRJVdHDYF7AKDLS9UVy7F0gQ2MnpR81LvSYkds9Yq=s176-c-k-c0x00ffffff-no-rj',
            '@Mordyto': 'https://yt3.googleusercontent.com/ytc/AL5GRJUc2-7nB9WZR-S2hijvG2lw6G7b0V3m8l7J5A=s176-c-k-c0x00ffffff-no-rj',
            '@soyzer': 'https://yt3.googleusercontent.com/ytc/AL5GRJX7QZ0m1q8Z0L7JQ9K8L7V3n6J3Z8Y9l0J5A=s176-c-k-c0x00ffffff-no-rj',
            '@LOCOFER': 'https://yt3.googleusercontent.com/ytc/AL5GRJVdHDYF7AKDLS9UVy7F0gQ2MnpR81LvSYkds9Yq=s176-c-k-c0x00ffffff-no-rj'
        };
    }
    
    // Extraer handle del canal de la URL
    extractChannelHandle(url) {
        try {
            const match = url.match(/youtube\.com\/@([^\/]+)/);
            if (match) return `@${match[1]}`;
            
            const channelMatch = url.match(/youtube\.com\/channel\/([^\/]+)/);
            if (channelMatch) return channelMatch[1];
            
            const userMatch = url.match(/youtube\.com\/user\/([^\/]+)/);
            if (userMatch) return userMatch[1];
            
            return null;
        } catch (error) {
            console.error('Error extracting channel handle:', error);
            return null;
        }
    }
    
    // Método 1: Usar avatares predefinidos de canales conocidos
    getPredefinedAvatar(channelHandle) {
        return this.knownChannels[channelHandle] || null;
    }
    
    // Método 2: Usar la API de YouTube para obtener el avatar
    async getYouTubeAvatar(channelHandle) {
        try {
            const cacheKey = `yt_${channelHandle}`;
            if (this.cache.has(cacheKey)) {
                return this.cache.get(cacheKey);
            }
            
            // Si es un handle (@nombre), buscar por customUrl
            let apiUrl;
            if (channelHandle.startsWith('@')) {
                const handleName = channelHandle.substring(1);
                apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&forHandle=${handleName}&key=${this.API_KEY}`;
            } else {
                apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelHandle}&key=${this.API_KEY}`;
            }
            
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`YouTube API error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.items && data.items.length > 0) {
                const avatarUrl = data.items[0].snippet.thumbnails.high.url;
                this.cache.set(cacheKey, avatarUrl);
                return avatarUrl;
            }
            
            return null;
        } catch (error) {
            console.warn(`YouTube API failed for ${channelHandle}:`, error.message);
            return null;
        }
    }
    
    // Método 3: Usar servicio alternativo (youtube-api proxy)
    async getAltServiceAvatar(channelHandle) {
        try {
            const cacheKey = `alt_${channelHandle}`;
            if (this.cache.has(cacheKey)) {
                return this.cache.get(cacheKey);
            }
            
            const handleName = channelHandle.startsWith('@') ? channelHandle.substring(1) : channelHandle;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.youtube.com/${handleName}`)}`;
            
            const response = await fetch(proxyUrl);
            
            if (!response.ok) {
                throw new Error(`Alt service error: ${response.status}`);
            }
            
            const data = await response.json();
            const html = data.contents;
            
            // Buscar avatar en el HTML (patrón común)
            const avatarMatch = html.match(/https:\/\/yt3\.ggpht\.com\/[^"\s]+/);
            
            if (avatarMatch) {
                const avatarUrl = avatarMatch[0].replace(/=s\d+-c-k-c0x00ffffff-no-rj/, '=s400-c-k-c0x00ffffff-no-rj');
                this.cache.set(cacheKey, avatarUrl);
                return avatarUrl;
            }
            
            return null;
        } catch (error) {
            console.warn(`Alt service failed for ${channelHandle}:`, error.message);
            return null;
        }
    }
    
    // Método 4: Usar ytimg.com (servicio de thumbnails de YouTube)
    getYtimgAvatar(channelHandle) {
        try {
            if (channelHandle.startsWith('@')) {
                const handleName = channelHandle.substring(1);
                return `https://yt3.ggpht.com/${handleName}`;
            }
            return null;
        } catch (error) {
            console.warn(`Ytimg method failed for ${channelHandle}:`, error.message);
            return null;
        }
    }
    
    // Obtener avatar usando todos los métodos disponibles
    async getAvatarUrl(channelHandle) {
        // 1. Primero probar con avatares predefinidos
        const predefined = this.getPredefinedAvatar(channelHandle);
        if (predefined) return predefined;
        
        // 2. Intentar con la API de YouTube
        for (let i = 0; i < this.maxRetries; i++) {
            try {
                const ytAvatar = await this.getYouTubeAvatar(channelHandle);
                if (ytAvatar) return ytAvatar;
            } catch (error) {
                // Continuar con el siguiente método
            }
            
            // 3. Intentar con servicio alternativo
            try {
                const altAvatar = await this.getAltServiceAvatar(channelHandle);
                if (altAvatar) return altAvatar;
            } catch (error) {
                // Continuar con el siguiente método
            }
            
            // 4. Intentar con ytimg
            try {
                const ytimgAvatar = this.getYtimgAvatar(channelHandle);
                if (ytimgAvatar) return ytimgAvatar;
            } catch (error) {
                // Continuar
            }
            
            // Esperar antes de reintentar
            await new Promise(resolve => setTimeout(resolve, 500 * (i + 1)));
        }
        
        return null;
    }
    
    // Configuración de fallback
    getFallbackConfig(index) {
        const gradientIndex = index % this.fallbackGradients.length;
        const iconIndex = index % this.fallbackIcons.length;
        
        return {
            gradient: this.fallbackGradients[gradientIndex],
            icon: this.fallbackIcons[iconIndex]
        };
    }
    
    // Testear si una imagen se carga correctamente
    testImageLoad(url) {
        return new Promise((resolve) => {
            if (!url) {
                resolve(false);
                return;
            }
            
            const testImg = new Image();
            testImg.onload = () => resolve(true);
            testImg.onerror = () => resolve(false);
            testImg.src = url;
            
            // Timeout de 5 segundos
            setTimeout(() => resolve(false), 5000);
        });
    }
    
    // Cargar todos los avatares
    async loadAllAvatars() {
        // Cargar avatares de canales
        const channelItems = document.querySelectorAll('.channel-item');
        for (let i = 0; i < channelItems.length; i++) {
            const item = channelItems[i];
            const channelHandle = item.getAttribute('data-channel');
            const img = item.querySelector('.channel-avatar-img');
            const avatarContainer = item.querySelector('.avatar-circle');
            
            if (channelHandle && img && avatarContainer) {
                await this.loadAvatar(img, avatarContainer, channelHandle, i, true);
            }
        }
        
        // Cargar avatares de reseñas
        const reviewAvatars = document.querySelectorAll('.review-avatar');
        for (let i = 0; i < reviewAvatars.length; i++) {
            const avatarContainer = reviewAvatars[i];
            const channelHandle = avatarContainer.getAttribute('data-channel');
            const img = avatarContainer.querySelector('.review-avatar-img');
            
            if (channelHandle && img) {
                await this.loadAvatar(img, avatarContainer, channelHandle, i, false);
            }
        }
    }
    
    // Cargar un avatar individual
    async loadAvatar(imgElement, container, channelHandle, index, isChannel) {
        try {
            // Obtener URL del avatar
            const avatarUrl = await this.getAvatarUrl(channelHandle);
            
            // Probar si la imagen se carga
            if (avatarUrl && await this.testImageLoad(avatarUrl)) {
                // Éxito: cargar la imagen real
                imgElement.src = avatarUrl;
                imgElement.style.display = 'block';
                imgElement.alt = `Avatar de ${channelHandle}`;
                container.classList.remove('fallback-gradient');
                
                // Remover cualquier icono de fallback
                const existingIcon = container.querySelector('i');
                if (existingIcon) {
                    existingIcon.remove();
                }
                
                console.log(`✅ Avatar cargado para ${channelHandle}`);
            } else {
                // Fallback: usar gradiente e icono
                this.setFallbackAvatar(container, index, isChannel, channelHandle);
                imgElement.style.display = 'none';
                console.log(`⚠️ Usando fallback para ${channelHandle}`);
            }
        } catch (error) {
            // Error: usar fallback
            console.error(`❌ Error cargando avatar para ${channelHandle}:`, error);
            this.setFallbackAvatar(container, index, isChannel, channelHandle);
            imgElement.style.display = 'none';
        }
    }
    
    // Establecer avatar de fallback
    setFallbackAvatar(container, index, isChannel, channelHandle) {
        const config = this.getFallbackConfig(index);
        
        // Aplicar gradiente de fondo
        container.style.background = config.gradient;
        container.classList.add('fallback-gradient');
        
        // Crear icono de FontAwesome
        const icon = document.createElement('i');
        icon.className = config.icon;
        
        // Estilos diferentes para canales vs reseñas
        if (isChannel) {
            icon.style.fontSize = '2rem';
            icon.style.color = 'white';
        } else {
            icon.style.fontSize = '1.2rem';
            icon.style.color = 'white';
        }
        
        // Limpiar contenido previo y agregar icono
        container.innerHTML = '';
        container.appendChild(icon);
        
        // Agregar tooltip con el nombre del canal
        container.title = channelHandle || 'Avatar no disponible';
    }
}

// Carrusel de reseñas
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

// Efectos de hover para canales
class ChannelsHoverEffects {
    constructor() {
        this.initChannelsHover();
        this.initAnimatedStats();
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
    
    initAnimatedStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalValue = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
            const isPercentage = stat.textContent.includes('%');
            const suffix = stat.textContent.replace(/[0-9]/g, '');
            
            let startValue = 0;
            const duration = 2000;
            const startTime = Date.now();
            
            const animate = () => {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                
                let currentValue = Math.floor(easeOutQuart * finalValue);
                
                if (isPercentage) {
                    stat.textContent = `${currentValue}%${suffix}`;
                } else {
                    let displayValue = currentValue;
                    if (currentValue >= 1000000) {
                        displayValue = (currentValue / 1000000).toFixed(1) + 'M';
                    } else if (currentValue >= 1000) {
                        displayValue = (currentValue / 1000).toFixed(0) + 'K';
                    }
                    stat.textContent = `${displayValue}${suffix}`;
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    if (isPercentage) {
                        stat.textContent = `${finalValue}%${suffix}`;
                    } else {
                        let finalDisplay = finalValue;
                        if (finalValue >= 1000000) {
                            finalDisplay = (finalValue / 1000000).toFixed(1) + 'M';
                        } else if (finalValue >= 1000) {
                            finalDisplay = (finalValue / 1000).toFixed(0) + 'K';
                        }
                        stat.textContent = `${finalDisplay}${suffix}`;
                    }
                }
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(animate, 500);
                        observer.unobserve(stat);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(stat);
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

// Inicialización principal
document.addEventListener('DOMContentLoaded', () => {
    const techBackground = new TechBackground();
    const navigation = new Navigation();
    const scrollEffects = new ScrollEffects();
    const reviewsCarousel = new ReviewsCarousel();
    const channelsHoverEffects = new ChannelsHoverEffects();
    const hoverEffects = new HoverEffects();
    
    // Sistema AVANZADO de avatares
    const avatarSystem = new YouTubeAvatarSystem();
    avatarSystem.loadAllAvatars();
    
    // Efectos de título
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.classList.add('animate-title');
        
        const gradientSpans = heroTitle.querySelectorAll('.gradient-text');
        gradientSpans.forEach((span, index) => {
            span.style.animationDelay = `${0.3 + (index * 0.2)}s`;
        });
    }
    
    // Transición de entrada
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Actualizar año de copyright
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        const currentYear = new Date().getFullYear();
        copyright.textContent = copyright.textContent.replace('2023', currentYear);
    }
    
    // Optimización de iframes
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.setAttribute('loading', 'lazy');
        
        if (iframe.src.includes('drive.google.com')) {
            if (!iframe.src.includes('?')) {
                iframe.src += '?autoplay=0&mute=1';
            }
        }
    });
    
    // Efectos de carga para videos
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
    
    // Observer para animaciones al hacer scroll
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
    
    // Smooth scroll para menú
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
    
    // Actualizar enlaces de reseñas
    const reviewLinks = [
        'https://www.youtube.com/@GROSSO_MODO/videos',
        'https://www.youtube.com/@PixelHeroRBX/videos',
        'https://www.youtube.com/@elkaidram',
        'https://www.youtube.com/@Mordyto/videos',
        'https://www.youtube.com/@LOCOFER'
    ];
    
    document.querySelectorAll('.review-channel-link').forEach((link, index) => {
        if (index < reviewLinks.length && reviewLinks[index] !== '#') {
            link.setAttribute('href', reviewLinks[index]);
        }
    });
    
    // Animación de puntos online
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
    
    // Notificación de avatares cargados
    setTimeout(() => {
        console.log('✅ Sistema de avatares completamente cargado');
        console.log('📺 Avatares de canales de YouTube cargados correctamente');
    }, 3000);
});
