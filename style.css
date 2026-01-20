/* Reset y estilos base */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: #0a0a1a;
    --secondary-color: #1a0a1f;
    --accent-color: #ff00ff;
    --accent-secondary: #e91e63;
    --accent-tertiary: #9c27b0;
    --accent-blue: #00a2ff;
    --accent-twitter: #1DA1F2;
    --accent-gradient: linear-gradient(90deg, var(--accent-color) 0%, var(--accent-secondary) 100%);
    --accent-gradient-full: linear-gradient(90deg, var(--accent-color) 0%, var(--accent-secondary) 50%, var(--accent-tertiary) 100%);
    --gradient-blue: linear-gradient(90deg, var(--accent-blue) 0%, #00d4ff 100%);
    --gradient-twitter: linear-gradient(90deg, var(--accent-twitter) 0%, #00aced 100%);
    --text-color: #f0f0f0;
    --text-muted: #a0a0b0;
    --card-bg: rgba(42, 14, 53, 0.7);
    --card-border: rgba(255, 0, 255, 0.2);
    --glow-color: rgba(255, 0, 255, 0.6);
    --font-main: 'Poppins', sans-serif;
    --font-tech: 'Nunito', sans-serif;
    --ease-smooth: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    --ease-bounce: cubic-bezier(0.175, 0.885, 0.320, 1.275);
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-main);
    background-color: var(--primary-color);
    color: var(--text-color);
    overflow-x: hidden;
    position: relative;
    line-height: 1.6;
}

#techBackground {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: 
        radial-gradient(
            circle at 20% 50%,
            rgba(156, 39, 176, 0.1) 0%,
            transparent 50%
        ),
        radial-gradient(
            circle at 80% 20%,
            rgba(255, 0, 255, 0.08) 0%,
            transparent 50%
        ),
        linear-gradient(
            135deg,
            var(--primary-color) 0%,
            var(--secondary-color) 100%
        );
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    z-index: 1;
}

/* NAVBAR CON LOGO 20% MÁS PEQUEÑO Y FUNCIONALIDAD DE OCULTAR */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(10, 10, 26, 0.98);
    backdrop-filter: blur(15px);
    padding: 2px 0;
    z-index: 1000;
    border-bottom: 1px solid rgba(255, 0, 255, 0.15);
    transition: transform 0.4s var(--ease-smooth), opacity 0.3s var(--ease-smooth);
    transform: translateY(0);
    opacity: 1;
}

.navbar.hidden {
    transform: translateY(-100%);
    opacity: 0;
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* LOGO REDUCIDO 20% */
.logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0;
    line-height: 1;
    gap: 12px;
    position: relative;
    transition: transform 0.4s var(--ease-smooth);
}

.logo-image {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: all 0.4s var(--ease-smooth);
    flex-shrink: 0;
    border: 2px solid rgba(255, 0, 255, 0.15);
}

.logo-placeholder {
    display: none;
    width: 48px;
    height: 48px;
    background: var(--accent-gradient);
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.28rem;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    border: 2px solid rgba(255, 0, 255, 0.15);
}

.logo-text-container {
    display: flex;
    flex-direction: column;
    line-height: 1;
    padding: 0;
    margin: 0;
}

.logo-text {
    font-family: var(--font-tech);
    font-size: 1.12rem;
    font-weight: 700;
    color: var(--text-color);
    letter-spacing: 0.8px;
    line-height: 0.9;
    transition: all 0.4s var(--ease-smooth);
    display: block;
    padding: 0;
    margin: 0;
}

.logo-subtitle {
    font-size: 0.65rem;
    color: var(--accent-color);
    letter-spacing: 1.2px;
    line-height: 1;
    margin-top: 1px;
    transition: all 0.4s var(--ease-smooth);
    display: block;
    padding: 0;
}

.logo:hover {
    transform: translateY(-3px);
}

.logo:hover .logo-image {
    transform: scale(1.05) rotate(3deg);
    box-shadow: 0 8px 20px rgba(255, 0, 255, 0.4);
    border-color: rgba(255, 0, 255, 0.4);
}

.logo:hover .logo-placeholder {
    transform: scale(1.05) rotate(3deg);
    box-shadow: 0 8px 20px rgba(255, 0, 255, 0.4);
    border-color: rgba(255, 0, 255, 0.4);
}

.logo:hover .logo-text {
    color: var(--accent-color);
    text-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
}

.logo:hover .logo-subtitle {
    color: white;
    text-shadow: 0 0 8px rgba(255, 0, 255, 0.6);
}

.nav-menu {
    display: flex;
    list-style: none;
    align-items: center;
}

.nav-link {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    margin-left: 20px;
    position: relative;
    transition: color 0.3s ease;
    font-size: 0.9rem;
    padding: 4px 0;
    display: block;
}

.nav-link:hover {
    color: var(--accent-color);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent-gradient);
    transition: width 0.3s ease;
}

.nav-link:hover::after {
    width: 100%;
}

.hamburger {
    display: none;
    cursor: pointer;
    padding: 4px 0;
}

.bar {
    display: block;
    width: 22px;
    height: 2.5px;
    margin: 3px auto;
    background-color: var(--text-color);
    transition: all 0.3s ease;
}

/* HERO SECTION */
.hero {
    padding: 100px 0 70px;
    position: relative;
}

.hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    align-items: center;
}

.hero-title {
    font-family: var(--font-tech);
    font-size: 2.5rem;
    line-height: 1.1;
    margin-bottom: 15px;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 1s ease 0.5s forwards;
    letter-spacing: 0.5px;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes gradientPulse {
    0%, 100% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
}

.gradient-text {
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
}

.hero-description {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--text-muted);
    margin-bottom: 30px;
    max-width: 90%;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 1s ease 0.8s forwards;
    font-weight: 400;
}

.hero-buttons {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 30px;
}

.cta-button {
    display: inline-flex;
    align-items: center;
    background: var(--accent-gradient);
    color: white;
    text-decoration: none;
    font-weight: 600;
    padding: 14px 32px;
    border-radius: 50px;
    transition: all 0.4s var(--ease-smooth);
    box-shadow: 0 5px 15px rgba(255, 0, 255, 0.3);
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 1s ease 1.1s forwards;
    border: none;
    cursor: pointer;
    font-family: var(--font-main);
    letter-spacing: 0.3px;
}

.cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 0, 255, 0.5);
}

.cta-button i {
    margin-left: 10px;
    transition: transform 0.4s var(--ease-smooth);
}

.cta-button:hover i {
    transform: translateX(5px);
}

.cta-button.large {
    padding: 16px 40px;
    font-size: 1.1rem;
}

.portfolio-btn {
    background: var(--gradient-blue);
    box-shadow: 0 5px 15px rgba(0, 162, 255, 0.3);
}

.portfolio-btn:hover {
    background: var(--gradient-blue);
    box-shadow: 0 8px 25px rgba(0, 162, 255, 0.5);
}

.twitter-btn {
    background: var(--gradient-twitter);
    box-shadow: 0 5px 15px rgba(29, 161, 242, 0.3);
}

.twitter-btn:hover {
    background: var(--gradient-twitter);
    box-shadow: 0 8px 25px rgba(29, 161, 242, 0.5);
}

.hero-video {
    position: relative;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 1s ease 0.7s forwards;
}

/* VIDEO DEL HERO - ANIMACIÓN OPTIMIZADA (SIN LAG) */
.video-container {
    background: var(--card-bg);
    border-radius: 15px;
    overflow: hidden;
    border: 1px solid var(--card-border);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    transition: transform 0.4s var(--ease-smooth), box-shadow 0.4s var(--ease-smooth);
}

.video-container:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(255, 0, 255, 0.25);
}

.video-label {
    padding: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
}

.video-badge {
    background: var(--accent-gradient);
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

.video-title {
    font-size: 1.1rem;
    font-weight: 600;
    font-family: var(--font-tech);
}

.video-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
}

.video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}

/* FEATURE CARDS - ANIMACIÓN BASE OPTIMIZADA */
.features {
    padding: 70px 0;
}

.section-title {
    font-family: var(--font-tech);
    font-size: 2.3rem;
    text-align: center;
    margin-bottom: 15px;
    letter-spacing: 0.5px;
}

.section-subtitle {
    text-align: center;
    color: var(--text-muted);
    font-size: 1rem;
    margin-bottom: 40px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.7;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
}

.feature-card {
    background: var(--card-bg);
    border-radius: 15px;
    padding: 25px;
    text-align: center;
    border: 1px solid var(--card-border);
    transition: transform 0.4s var(--ease-smooth), box-shadow 0.4s var(--ease-smooth);
    position: relative;
    overflow: hidden;
}

/* ANIMACIÓN BASE SIN LAG */
.feature-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(255, 0, 255, 0.25);
}

.feature-icon {
    width: 65px;
    height: 65px;
    background: var(--accent-gradient);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 15px;
    font-size: 1.6rem;
}

.feature-card h3 {
    font-size: 1.2rem;
    margin-bottom: 12px;
    font-family: var(--font-tech);
}

.feature-card p {
    color: var(--text-muted);
    line-height: 1.7;
    font-size: 0.9rem;
    font-weight: 400;
}

/* PORTAFOLIO - ANIMACIÓN OPTIMIZADA */
.portfolio {
    padding: 70px 0;
}

.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
}

.portfolio-item {
    background: var(--card-bg);
    border-radius: 15px;
    overflow: hidden;
    border: 1px solid var(--card-border);
    transition: transform 0.4s var(--ease-smooth), box-shadow 0.4s var(--ease-smooth);
    position: relative;
}

/* ANIMACIÓN EXACTA Y OPTIMIZADA */
.portfolio-item:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(255, 0, 255, 0.25);
}

/* SHORTS - ANIMACIÓN OPTIMIZADA (SIN LAG) */
.shorts {
    padding: 70px 0 50px;
    position: relative;
}

.shorts::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 70% 30%, rgba(255, 0, 255, 0.05) 0%, transparent 50%);
    z-index: -1;
}

.shorts-carousel-container {
    position: relative;
    max-width: 1200px;
    margin: 30px auto 15px;
    padding: 0 60px;
    overflow: hidden;
}

.shorts-carousel-track {
    display: flex;
    gap: 20px;
    transition: transform 0.6s var(--ease-smooth);
    padding: 15px 0;
}

.short-item {
    background: transparent;
    border-radius: 12px;
    overflow: visible;
    position: relative;
    aspect-ratio: 9/16;
    flex: 0 0 calc(25% - 15px);
    max-width: calc(25% - 15px);
    height: auto;
    max-height: 600px;
    display: flex;
    flex-direction: column;
}

.short-item-content {
    width: 100%;
    height: 100%;
    background: var(--card-bg);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--card-border);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transition: transform 0.4s var(--ease-smooth), box-shadow 0.4s var(--ease-smooth);
    position: relative;
}

/* ANIMACIÓN EXACTA Y OPTIMIZADA - SIN LAG */
.short-item:hover .short-item-content {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(255, 0, 255, 0.25);
    border-color: rgba(255, 0, 255, 0.4);
}

.short-item .short-video {
    flex: 1;
    position: relative;
    width: 100%;
    height: 100%;
    background: #000;
    overflow: hidden;
}

.short-item iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}

.short-item .placeholder {
    background: linear-gradient(135deg, rgba(42, 14, 53, 0.8), rgba(26, 10, 31, 0.9));
    display: flex;
    align-items: center;
    justify-content: center;
}

.short-placeholder {
    text-align: center;
    color: var(--text-muted);
    padding: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.short-placeholder i {
    font-size: 2.5rem;
    color: var(--accent-color);
    margin-bottom: 12px;
    opacity: 0.7;
}

.short-placeholder span {
    display: block;
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 5px;
    color: var(--text-color);
}

.short-placeholder p {
    font-size: 0.85rem;
    opacity: 0.8;
}

/* CANALES */
.channels {
    padding: 70px 0;
    background: rgba(26, 10, 31, 0.7);
    position: relative;
    overflow: hidden;
}

.channels::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 30%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(156, 39, 176, 0.08) 0%, transparent 50%);
    z-index: -1;
}

.channels-carousel-container {
    position: relative;
    max-width: 1200px;
    margin: 30px auto;
    padding: 0 60px;
    overflow: hidden;
}

.channels-carousel-track {
    display: flex;
    gap: 20px;
    transition: transform 0.6s var(--ease-smooth);
    padding: 15px 0;
}

.channel-item {
    background: var(--card-bg);
    border-radius: 15px;
    padding: 25px 20px;
    border: 1px solid var(--card-border);
    text-decoration: none;
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.4s var(--ease-smooth), box-shadow 0.4s var(--ease-smooth);
    position: relative;
    overflow: hidden;
    flex: 0 0 calc(20% - 16px);
    max-width: calc(20% - 16px);
}

.channel-item:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(255, 0, 255, 0.25);
    border-color: rgba(255, 0, 255, 0.4);
}

.channel-avatar {
    position: relative;
    margin-bottom: 18px;
}

.channel-item:hover .avatar-circle {
    transform: scale(1.08);
}

.avatar-circle {
    position: relative;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    transition: transform 0.4s var(--ease-smooth);
    background: var(--accent-gradient);
}

.channel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
}

.channel-fallback {
    display: none;
    font-family: var(--font-tech);
    font-weight: bold;
    color: white;
    font-size: 1.5rem;
    z-index: 1;
}

.online-dot {
    position: absolute;
    bottom: 8px;
    right: 8px;
    width: 14px;
    height: 14px;
    background: #666;
    border-radius: 50%;
    border: 3px solid var(--card-bg);
    transition: all 0.5s var(--ease-smooth);
    z-index: 4;
}

.online-dot.active {
    background: #ff00ff;
    box-shadow: 0 0 10px rgba(255, 0, 255, 0.7);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% {
        box-shadow: 0 0 10px rgba(255, 0, 255, 0.7);
    }
    50% {
        box-shadow: 0 0 20px rgba(255, 0, 255, 0.9);
    }
}

.channel-info {
    text-align: center;
    width: 100%;
}

.channel-name {
    font-family: var(--font-tech);
    font-size: 1.1rem;
    color: var(--text-color);
    margin-bottom: 10px;
    letter-spacing: 0.5px;
    font-weight: 600;
    transition: color 0.5s var(--ease-smooth);
}

.channel-item:hover .channel-name {
    color: var(--accent-color);
}

.channel-subs {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: var(--text-muted);
    font-size: 0.8rem;
    font-weight: 500;
}

.channel-hover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 0, 255, 0.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.5s var(--ease-smooth);
    border-radius: 15px;
    text-align: center;
    padding: 20px;
    z-index: 5;
}

.channel-item:hover .channel-hover {
    opacity: 1;
    transform: translateY(0);
}

.channel-hover i {
    font-size: 1.8rem;
    margin-bottom: 8px;
}

.channel-hover span {
    font-weight: 600;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
}

.channel-item.placeholder {
    cursor: default;
}

.channel-item.placeholder:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(255, 0, 255, 0.2);
    border-color: rgba(255, 0, 255, 0.4);
}

.channel-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 0, 255, 0.1);
}

.channel-placeholder i {
    font-size: 1.8rem;
    color: var(--accent-color);
    opacity: 0.7;
}

/* BOTONES DE CARRUSEL - FUNCIONALES */
.shorts-carousel-container .carousel-btn,
.channels-carousel-container .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 45px;
    height: 45px;
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 50%;
    color: var(--text-color);
    font-size: 1.1rem;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s var(--ease-smooth);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.shorts-carousel-container .carousel-btn:hover:not(:disabled),
.channels-carousel-container .carousel-btn:hover:not(:disabled) {
    background: var(--accent-gradient);
    transform: translateY(-50%) scale(1.1);
    border-color: var(--accent-color);
    box-shadow: 0 8px 25px rgba(255, 0, 255, 0.4);
}

.shorts-carousel-container .carousel-btn:disabled,
.channels-carousel-container .carousel-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
}

.shorts-carousel-container .carousel-btn.prev,
.channels-carousel-container .carousel-btn.prev {
    left: 0;
}

.shorts-carousel-container .carousel-btn.next,
.channels-carousel-container .carousel-btn.next {
    right: 0;
}

.carousel-indicators {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 10px;
    position: relative;
    z-index: 5;
}

.shorts-indicators {
    margin-top: 5px;
    padding-top: 15px;
    position: relative;
}

.shorts-indicators::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
}

.indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--text-muted);
    cursor: pointer;
    transition: all 0.5s var(--ease-smooth);
    position: relative;
}

.indicator.active {
    background: var(--accent-color);
    transform: scale(1.3);
    box-shadow: 0 0 10px rgba(255, 0, 255, 0.7);
}

.indicator:hover:not(.active) {
    background: rgba(255, 0, 255, 0.5);
    transform: scale(1.1);
}

/* RESEÑAS */
.reviews {
    padding: 70px 0;
    background: rgba(26, 10, 31, 0.6);
    position: relative;
    overflow: hidden;
}

.reviews::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 30% 50%, rgba(255, 0, 255, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(156, 39, 176, 0.05) 0%, transparent 50%);
    z-index: -1;
}

.reviews-carousel-container {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    padding: 0 40px;
}

.reviews-carousel-track {
    position: relative;
    height: 220px;
    margin-bottom: 25px;
}

.review-card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: var(--card-bg);
    border-radius: 15px;
    padding: 18px;
    border: 1px solid var(--card-border);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transform: translateX(50px) scale(0.95);
    transition: all 0.6s var(--ease-smooth);
    visibility: hidden;
    z-index: 1;
    height: 200px;
    display: flex;
    flex-direction: column;
}

.review-card.active {
    opacity: 1;
    transform: translateX(0) scale(1);
    visibility: visible;
    z-index: 2;
    box-shadow: 0 15px 40px rgba(255, 0, 255, 0.25);
}

.review-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 0, 255, 0.2);
}

.review-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 15px;
    flex-shrink: 0;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    position: relative;
    background: var(--accent-gradient);
}

.review-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
}

.review-fallback {
    display: none;
    font-family: var(--font-tech);
    font-weight: bold;
    color: white;
    font-size: 1rem;
    z-index: 1;
}

.review-channel-info {
    flex: 1;
}

.review-channel-name {
    font-family: var(--font-tech);
    font-size: 1rem;
    color: var(--accent-color);
    margin-bottom: 3px;
    letter-spacing: 0.5px;
}

.review-channel-link {
    display: inline-flex;
    align-items: center;
    color: var(--text-muted);
    font-size: 0.75rem;
    text-decoration: none;
    transition: color 0.5s var(--ease-smooth);
}

.review-channel-link:hover {
    color: var(--accent-color);
}

.review-text {
    flex: 1;
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--text-color);
    font-style: italic;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    padding: 5px 0;
    font-weight: 400;
}

.carousel-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
}

.carousel-btn {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    color: var(--text-color);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.5s var(--ease-smooth);
    font-size: 1rem;
    position: relative;
    z-index: 10;
    flex-shrink: 0;
}

.carousel-btn:hover:not(:disabled) {
    background: var(--accent-gradient);
    transform: scale(1.1);
    border-color: var(--accent-color);
    box-shadow: 0 5px 15px rgba(255, 0, 255, 0.4);
}

.carousel-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.carousel-dots {
    display: flex;
    gap: 10px;
    margin: 0 10px;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--text-muted);
    cursor: pointer;
    transition: all 0.5s var(--ease-smooth);
    position: relative;
}

.dot.active {
    background: var(--accent-color);
    transform: scale(1.3);
    box-shadow: 0 0 8px rgba(255, 0, 255, 0.5);
}

.dot:hover:not(.active) {
    background: rgba(255, 0, 255, 0.5);
    transform: scale(1.1);
}

/* CONTACTO */
.contact {
    padding: 70px 0;
    text-align: center;
    background: linear-gradient(135deg, rgba(10, 10, 26, 0.9), rgba(26, 10, 31, 0.9));
    position: relative;
    overflow: hidden;
}

.contact::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 80%, rgba(255, 0, 255, 0.08) 0%, transparent 50%);
    z-index: -1;
}

.contact-description {
    font-size: 1.1rem;
    color: var(--text-muted);
    max-width: 700px;
    margin: 0 auto 40px;
    line-height: 1.7;
    font-weight: 400;
}

/* FOOTER */
.footer {
    padding: 20px 0 15px;
    background: rgba(10, 10, 26, 0.95);
    border-top: 1px solid rgba(255, 0, 255, 0.1);
    position: relative;
}

.footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(255, 0, 255, 0.02));
    z-index: -1;
}

.footer-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.footer-name h3 {
    font-family: var(--font-tech);
    font-size: 1.1rem;
    margin-bottom: 2px;
    letter-spacing: 0.5px;
}

.footer-name p {
    color: var(--text-muted);
    font-size: 0.65rem;
    letter-spacing: 1px;
}

.social-links {
    display: flex;
    gap: 12px;
}

.social-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-color);
    font-size: 0.85rem;
    text-decoration: none;
    transition: all 0.5s var(--ease-smooth);
}

.social-circle:hover {
    background: var(--accent-gradient);
    transform: translateY(-5px) rotate(5deg);
    color: white;
    box-shadow: 0 5px 15px rgba(255, 0, 255, 0.3);
}

.footer-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
    margin-bottom: 15px;
}

.footer-bottom {
    text-align: center;
}

.copyright {
    color: var(--text-muted);
    font-size: 0.65rem;
    letter-spacing: 0.5px;
}

/* ===== RESPONSIVE ===== */

/* Tablet (1024px - 768px) */
@media (max-width: 1024px) {
    .navbar {
        padding: 2px 0;
    }
    
    .logo {
        padding: 0;
        gap: 10px;
    }
    
    .logo-text {
        font-size: 1rem;
        line-height: 0.9;
    }
    
    .logo-subtitle {
        font-size: 0.55rem;
        margin-top: 1px;
        line-height: 1;
    }
    
    .hero-content {
        grid-template-columns: 1fr;
        gap: 40px;
    }
    
    .hero-title {
        font-size: 2.1rem;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .portfolio-grid {
        grid-template-columns: 1fr;
        max-width: 600px;
        margin: 0 auto;
        gap: 25px;
    }
    
    .features-grid {
        grid-template-columns: repeat(2, 1fr);
        max-width: 700px;
        margin: 0 auto;
        gap: 20px;
    }
    
    .reviews-carousel-container {
        max-width: 650px;
        padding: 0 30px;
    }
    
    /* SHORTS - Tablet: 2 elementos visibles */
    .shorts-carousel-container,
    .channels-carousel-container {
        padding: 0 50px;
    }
    
    .short-item {
        flex: 0 0 calc(50% - 10px);
        max-width: calc(50% - 10px);
    }
    
    /* CANALES - Tablet: 2 elementos visibles */
    .channel-item {
        flex: 0 0 calc(50% - 10px);
        max-width: calc(50% - 10px);
    }
}

/* Tablet pequeña / Móvil grande (768px o menos) */
@media (max-width: 768px) {
    .navbar {
        padding: 1px 0;
    }
    
    .logo {
        padding: 0;
        gap: 8px;
    }
    
    .logo-text {
        font-size: 0.9rem;
        line-height: 0.9;
    }
    
    .logo-subtitle {
        font-size: 0.5rem;
        margin-top: 0.5px;
        line-height: 1;
    }
    
    .hamburger {
        display: block;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(6px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg);
    }
    
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 48px;
        flex-direction: column;
        background-color: rgba(10, 10, 26, 0.98);
        width: 100%;
        text-align: center;
        transition: 0.3s;
        padding: 10px 0;
        border-top: 1px solid rgba(255, 0, 255, 0.1);
        backdrop-filter: blur(10px);
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    .nav-link {
        margin: 8px 0;
        font-size: 1rem;
        padding: 6px 0;
    }
    
    .hero {
        padding: 90px 0 50px;
    }
    
    .hero-title {
        font-size: 1.7rem;
    }
    
    .hero-buttons {
        flex-direction: column;
        gap: 12px;
    }
    
    .hero-buttons .cta-button {
        width: 100%;
        justify-content: center;
        text-align: center;
    }
    
    .section-title {
        font-size: 1.8rem;
    }
    
    .features-grid {
        grid-template-columns: 1fr;
        max-width: 350px;
        margin: 0 auto;
        gap: 15px;
    }
    
    .review-card {
        padding: 15px 12px;
        height: 210px;
    }
    
    .review-text {
        font-size: 0.8rem;
        -webkit-line-clamp: 5;
    }
    
    .review-avatar {
        width: 40px;
        height: 40px;
    }
    
    .review-channel-name {
        font-size: 0.9rem;
    }
    
    .carousel-btn {
        width: 35px;
        height: 35px;
        font-size: 0.9rem;
    }
    
    .carousel-controls {
        margin-top: 20px;
    }
    
    .reviews-carousel-track {
        height: 220px;
    }
    
    /* SHORTS - Móvil: 1 elemento visible */
    .shorts-carousel-container,
    .channels-carousel-container {
        padding: 0 40px;
    }
    
    .shorts-carousel-container .carousel-btn,
    .channels-carousel-container .carousel-btn {
        width: 35px;
        height: 35px;
        font-size: 0.9rem;
    }
    
    .short-item {
        flex: 0 0 100%;
        max-width: 100%;
    }
    
    /* CANALES - Móvil: 1 elemento visible */
    .channel-item {
        flex: 0 0 100%;
        max-width: 100%;
        padding: 20px 15px;
    }
    
    .avatar-circle {
        width: 70px;
        height: 70px;
    }
    
    /* Ajustar indicadores para móvil */
    .carousel-indicators {
        margin-top: 8px;
    }
    
    .indicator {
        width: 7px;
        height: 7px;
    }
    
    /* CORRECIÓN CRÍTICA: CARRUSEL DE RESEÑAS EN MÓVIL */
    .reviews .carousel-controls {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 15px;
        margin-top: 25px;
    }
    
    .reviews .carousel-dots {
        order: 0;
        margin: 0 10px;
    }
    
    .reviews .carousel-btn {
        position: relative;
        top: auto;
        left: auto;
        right: auto;
        transform: none;
        margin: 0;
    }
}

/* Móvil pequeño (480px o menos) */
@media (max-width: 480px) {
    .navbar {
        padding: 1px 0;
    }
    
    .logo-text {
        font-size: 0.85rem;
        line-height: 0.85;
    }
    
    .logo-subtitle {
        font-size: 0.46rem;
        margin-top: 0.5px;
        line-height: 1;
        letter-spacing: 1px;
    }
    
    .nav-menu {
        top: 46px;
    }
    
    .hero-title {
        font-size: 1.5rem;
    }
    
    .hero-description {
        font-size: 0.95rem;
    }
    
    .section-title {
        font-size: 1.6rem;
    }
    
    .review-card {
        padding: 12px 10px;
        height: 220px;
    }
    
    .review-text {
        font-size: 0.75rem;
        -webkit-line-clamp: 6;
    }
    
    .review-header {
        flex-direction: column;
        text-align: center;
        gap: 8px;
    }
    
    .review-avatar {
        margin-right: 0;
        margin-bottom: 5px;
    }
    
    .reviews-carousel-container {
        padding: 0 20px;
    }
    
    /* CORRECIÓN PERFECTA PARA BOTONES EN MÓVIL */
    .reviews .carousel-controls {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 15px;
        margin-top: 25px;
    }
    
    .reviews .carousel-dots {
        order: 0;
        margin: 0 10px;
    }
    
    .reviews .carousel-btn {
        position: relative;
        width: 38px;
        height: 38px;
        flex-shrink: 0;
        transform: none;
        margin: 0;
    }
    
    .shorts-carousel-container,
    .channels-carousel-container {
        padding: 0 30px;
    }
    
    .shorts-carousel-container .carousel-btn,
    .channels-carousel-container .carousel-btn {
        width: 30px;
        height: 30px;
        font-size: 0.8rem;
    }
    
    .channel-item {
        min-width: 160px;
        padding: 18px 12px;
    }
    
    .avatar-circle {
        width: 60px;
        height: 60px;
    }
    
    .footer-top {
        flex-direction: column;
        gap: 12px;
        text-align: center;
    }
}

/* CORRECCIÓN ADICIONAL PARA ASEGURAR ALINEACIÓN PERFECTA EN TODOS LOS DISPOSITIVOS */
@media (max-width: 768px) {
    .reviews .carousel-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row !important;
    }
    
    .reviews .carousel-btn.prev,
    .reviews .carousel-btn.next {
        position: relative;
        top: auto;
        left: auto;
        right: auto;
        transform: none;
        margin: 0;
    }
}
