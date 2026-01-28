// ============================================
// MOUNT VERIDIA - ULTIMATE JS (500 JUTA QUALITY)
// ANIMASI GACOR TOTAL - LEVEL DEWA!
// FIX MOUSE CURSOR & BANNER BUG
// PERBAIKAN: NO AUTO-ANIMATIONS IN HERO SECTION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🔥 MOUNT VERIDIA - ULTIMATE EDITION 🔥', 'font-size: 24px; color: #7C5CFF; font-weight: bold;');
    console.log('%c🎮 ANIMASI LEVEL DEWA AKTIF! 🎮', 'font-size: 18px; color: #22D3EE; font-weight: bold;');
    
    // ===== GSAP INITIALIZATION =====
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // ===== CUSTOM CURSOR (FIXED MOUSE BUG) =====
    function initCustomCursor() {
        if (window.innerWidth < 1024) {
            document.body.style.cursor = 'auto';
            return;
        }
        
        const cursor = document.createElement('div');
        const cursorInner = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursorInner.className = 'custom-cursor-inner';
        cursor.appendChild(cursorInner);
        document.body.appendChild(cursor);
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let speed = 0.1;
        
        // Mouse move listener
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Animation loop
        function animateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * speed;
            cursorY += dy * speed;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .feature-card, .team-card, .update-card, .nav__link, input, textarea');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
        
        // Click effect
        document.addEventListener('mousedown', () => {
            cursor.classList.add('click');
        });
        
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
        });
        
        // Touch devices - hide cursor
        document.addEventListener('touchstart', () => {
            cursor.style.display = 'none';
        });
        
        document.addEventListener('touchend', () => {
            cursor.style.display = 'block';
        });
        
        animateCursor();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth < 1024) {
                cursor.style.display = 'none';
                document.body.style.cursor = 'auto';
            } else {
                cursor.style.display = 'block';
                document.body.style.cursor = 'none';
            }
        });
    }
    
    // ===== GATE SCREEN ANIMATIONS =====
    function initGateAnimations() {
        const gate = document.getElementById('gate');
        const gateBtn = document.getElementById('gateBtn');
        const particlesContainer = document.getElementById('gateParticles');
        
        if (!gate || !gateBtn) return;
        
        // Create particles
        function createParticles() {
            if (!particlesContainer) return;
            
            const particleCount = 50;
            const colors = [
                'rgba(124, 92, 255, 0.6)',
                'rgba(34, 211, 238, 0.6)',
                'rgba(255, 77, 141, 0.6)',
                'rgba(255, 255, 255, 0.4)'
            ];
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'gate__particle';
                
                const size = Math.random() * 6 + 2;
                const color = colors[Math.floor(Math.random() * colors.length)];
                const duration = Math.random() * 20 + 10;
                const delay = Math.random() * 5;
                
                particle.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    opacity: 0;
                    filter: blur(${size / 2}px);
                    animation: particleFloat ${duration}s linear infinite ${delay}s;
                `;
                
                particlesContainer.appendChild(particle);
            }
        }
        
        // Animate gate elements with GSAP
        function animateGateElements() {
            // Logo animation
            gsap.from('.gate__logo', {
                duration: 2,
                scale: 0,
                rotation: 360,
                ease: 'back.out(1.7)',
                delay: 0.5
            });
            
            // Title animation
            gsap.from('.gate__title-line--1', {
                duration: 1.5,
                y: 50,
                opacity: 0,
                ease: 'power3.out',
                delay: 1
            });
            
            gsap.from('.gate__title-line--2', {
                duration: 1.5,
                y: 50,
                opacity: 0,
                ease: 'power3.out',
                delay: 1.3
            });
            
            // Description animation
            gsap.from('.gate__desc', {
                duration: 1.5,
                y: 30,
                opacity: 0,
                ease: 'power3.out',
                delay: 1.8
            });
            
            // Button animation
            gsap.from('.gate__btn-container', {
                duration: 1.5,
                y: 40,
                opacity: 0,
                ease: 'power3.out',
                delay: 2.3
            });
            
            // Progress bar animation
            gsap.to('.gate__progress-bar::after', {
                duration: 3,
                x: '100%',
                ease: 'none',
                repeat: -1
            });
        }
        
        // Handle gate exit
        function exitGate() {
            // Animate exit
            gsap.to(gate, {
                duration: 1,
                opacity: 0,
                scale: 1.1,
                ease: 'power3.in',
                onComplete: () => {
                    gate.style.display = 'none';
                    document.body.classList.remove('no-scroll');
                    initAllAnimations();
                }
            });
            
            // Animate elements out
            gsap.to('.gate__content > *', {
                duration: 0.8,
                y: -50,
                opacity: 0,
                stagger: 0.1,
                ease: 'power3.in'
            });
        }
        
        // Create particles
        createParticles();
        
        // Animate elements
        animateGateElements();
        
        // Button click event
        gateBtn.addEventListener('click', exitGate);
        gateBtn.addEventListener('touchstart', exitGate);
        
        // Auto exit after 10 seconds
        setTimeout(() => {
            if (gate.style.display !== 'none') {
                exitGate();
            }
        }, 10000);
        
        // Allow ESC key to exit
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && gate.style.display !== 'none') {
                exitGate();
            }
        });
        
        // Allow click anywhere to exit
        gate.addEventListener('click', (e) => {
            if (e.target === gate) {
                exitGate();
            }
        });
    }
    
    // ===== HEADER ANIMATIONS =====
    function initHeaderAnimations() {
        const header = document.getElementById('header');
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const navLinks = document.querySelectorAll('.nav__link');
        
        if (!header) return;
        
        // Header scroll effect
        let lastScroll = 0;
        let ticking = false;
        
        function updateHeader() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            
            lastScroll = currentScroll;
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
        
        // Animate header on load
        gsap.from(header, {
            duration: 1,
            y: -100,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.5
        });
        
        // Animate nav links
        navLinks.forEach((link, index) => {
            gsap.from(link, {
                duration: 0.8,
                y: -20,
                opacity: 0,
                ease: 'power3.out',
                delay: 1 + (index * 0.1)
            });
        });
        
        // Animate buttons
        gsap.from('.header__actions .btn', {
            duration: 0.8,
            x: 20,
            opacity: 0,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 1.3
        });
        
        // Mobile menu
        if (menuToggle && mobileMenu) {
            let menuOpen = false;
            
            function toggleMenu() {
                menuOpen = !menuOpen;
                menuToggle.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                
                if (menuOpen) {
                    gsap.to(mobileMenu, {
                        duration: 0.5,
                        right: 0,
                        ease: 'power3.out'
                    });
                    
                    // Animate menu items
                    gsap.from('.mobile-menu__link', {
                        duration: 0.6,
                        x: 50,
                        opacity: 0,
                        stagger: 0.1,
                        ease: 'power3.out'
                    });
                    
                    // Animate buttons
                    gsap.from('.mobile-menu__action', {
                        duration: 0.6,
                        y: 30,
                        opacity: 0,
                        stagger: 0.1,
                        ease: 'power3.out',
                        delay: 0.3
                    });
                } else {
                    gsap.to(mobileMenu, {
                        duration: 0.5,
                        right: '-100%',
                        ease: 'power3.in'
                    });
                }
            }
            
            menuToggle.addEventListener('click', toggleMenu);
            
            // Close menu when clicking links
            const menuLinks = mobileMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (menuOpen) toggleMenu();
                });
            });
            
            // Close on escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && menuOpen) {
                    toggleMenu();
                }
            });
            
            // Close on outside click
            document.addEventListener('click', (e) => {
                if (menuOpen && 
                    !mobileMenu.contains(e.target) && 
                    !menuToggle.contains(e.target)) {
                    toggleMenu();
                }
            });
        }
    }
    
    // ===== HERO SECTION - NO AUTO ANIMATIONS (FIXED) =====
    function initHeroAnimations() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        // NO AUTO ANIMATIONS FOR HERO ELEMENTS
        // All elements are static and immediately visible
        
        // Only animate banner lights (background only)
        const lights = document.querySelectorAll('.hero__banner-light');
        lights.forEach(light => {
            gsap.to(light, {
                duration: 2,
                scale: 1.2,
                opacity: 0.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        });
    }
    
    // ===== FEATURES SLIDER ANIMATIONS =====
    function initFeaturesSlider() {
        const track = document.getElementById('featuresTrack');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const dots = document.querySelectorAll('.slider__dot');
        const cards = document.querySelectorAll('.feature-card');
        
        if (!track || !prevBtn || !nextBtn) return;
        
        let currentIndex = 0;
        let isAnimating = false;
        let autoSlideInterval;
        const cardWidth = 320 + 30; // width + gap
        const maxIndex = cards.length - 1;
        
        // Initialize slider
        function initSlider() {
            // Clone first few cards for infinite loop
            const firstCards = Array.from(cards).slice(0, 3);
            firstCards.forEach(card => {
                const clone = card.cloneNode(true);
                track.appendChild(clone);
            });
            
            // Update dots
            updateDots();
            
            // Start auto slide
            startAutoSlide();
            
            // Add hover effects to cards
            initCardHoverEffects();
            
            // Add scroll animation
            initCardScrollAnimations();
        }
        
        // Update slider position
        function updateSlider() {
            if (isAnimating) return;
            
            isAnimating = true;
            const position = -currentIndex * cardWidth;
            
            gsap.to(track, {
                duration: 0.6,
                x: position,
                ease: 'power3.out',
                onComplete: () => {
                    isAnimating = false;
                    
                    // Infinite loop logic
                    if (currentIndex > maxIndex) {
                        currentIndex = 0;
                        gsap.set(track, { x: 0 });
                    }
                }
            });
            
            updateDots();
        }
        
        // Update dots
        function updateDots() {
            dots.forEach((dot, index) => {
                if (index === currentIndex % 4) {
                    dot.classList.add('slider__dot--active');
                } else {
                    dot.classList.remove('slider__dot--active');
                }
            });
        }
        
        // Next slide
        function nextSlide() {
            if (isAnimating) return;
            currentIndex++;
            updateSlider();
            resetAutoSlide();
        }
        
        // Previous slide
        function prevSlide() {
            if (isAnimating) return;
            currentIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
            updateSlider();
            resetAutoSlide();
        }
        
        // Auto slide
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
        
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }
        
        // Initialize card hover effects
        function initCardHoverEffects() {
            const allCards = document.querySelectorAll('.feature-card');
            
            allCards.forEach(card => {
                card.addEventListener('mouseenter', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateY = ((x - centerX) / centerX) * 8;
                    const rotateX = ((centerY - y) / centerY) * 8;
                    
                    gsap.to(card, {
                        duration: 0.3,
                        rotateX: rotateX,
                        rotateY: rotateY,
                        scale: 1.05,
                        ease: 'power2.out'
                    });
                    
                    // Animate icon
                    const icon = card.querySelector('.feature-card__icon');
                    if (icon) {
                        gsap.to(icon, {
                            duration: 0.3,
                            y: -10,
                            ease: 'power2.out'
                        });
                    }
                    
                    // Animate line
                    const line = card.querySelector('.feature-card__line');
                    if (line) {
                        gsap.to(line, {
                            duration: 0.3,
                            scaleX: 1,
                            ease: 'power2.out'
                        });
                    }
                });
                
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        duration: 0.5,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        ease: 'elastic.out(1, 0.5)'
                    });
                    
                    // Reset icon
                    const icon = card.querySelector('.feature-card__icon');
                    if (icon) {
                        gsap.to(icon, {
                            duration: 0.5,
                            y: 0,
                            ease: 'elastic.out(1, 0.5)'
                        });
                    }
                    
                    // Reset line
                    const line = card.querySelector('.feature-card__line');
                    if (line) {
                        gsap.to(line, {
                            duration: 0.5,
                            scaleX: 0,
                            ease: 'power2.out'
                        });
                    }
                });
            });
        }
        
        // Initialize card scroll animations
        function initCardScrollAnimations() {
            cards.forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    duration: 1,
                    y: 50,
                    opacity: 0,
                    ease: 'power3.out',
                    delay: index * 0.1
                });
            });
        }
        
        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Dot click events
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
                resetAutoSlide();
            });
        });
        
        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(autoSlideInterval);
        });
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            resetAutoSlide();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
        
        // Pause auto slide on hover
        track.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        track.addEventListener('mouseleave', () => {
            resetAutoSlide();
        });
        
        // Initialize
        initSlider();
        
        // Animate slider controls
        gsap.from('.slider__controls', {
            scrollTrigger: {
                trigger: '.features',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.5
        });
    }
    
    // ===== UPDATES ANIMATIONS =====
    function initUpdatesAnimations() {
        const updateCards = document.querySelectorAll('.update-card');
        
        // Animate cards on scroll
        updateCards.forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                duration: 1,
                y: 50,
                opacity: 0,
                scale: 0.9,
                ease: 'power3.out',
                delay: index * 0.2
            });
            
            // Hover effect
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = ((x - centerX) / centerX) * 5;
                const rotateX = ((centerY - y) / centerY) * 5;
                
                gsap.to(card, {
                    duration: 0.3,
                    rotateX: rotateX,
                    rotateY: rotateY,
                    scale: 1.02,
                    ease: 'power2.out'
                });
                
                // Animate shine
                const shine = card.querySelector('.update-card__hover-shine');
                if (shine) {
                    gsap.to(shine, {
                        duration: 0.6,
                        x: '100%',
                        ease: 'power2.out'
                    });
                }
                
                // Animate line
                const line = card.querySelector('.update-card__line');
                if (line) {
                    gsap.to(line, {
                        duration: 0.3,
                        scaleX: 1,
                        ease: 'power2.out'
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.5,
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    ease: 'elastic.out(1, 0.5)'
                });
                
                // Reset shine
                const shine = card.querySelector('.update-card__hover-shine');
                if (shine) {
                    gsap.set(shine, { x: '-100%' });
                }
                
                // Reset line
                const line = card.querySelector('.update-card__line');
                if (line) {
                    gsap.to(line, {
                        duration: 0.5,
                        scaleX: 0,
                        ease: 'power2.out'
                    });
                }
            });
        });
        
        // Animate particles
        const particles = document.querySelectorAll('.updates__particle');
        particles.forEach(particle => {
            gsap.to(particle, {
                duration: 20,
                y: -100,
                rotation: 360,
                repeat: -1,
                ease: 'none'
            });
        });
    }
    
    // ===== TEAM ANIMATIONS =====
    function initTeamAnimations() {
        const teamCards = document.querySelectorAll('.team-card');
        
        // Animate cards on scroll
        teamCards.forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                duration: 1,
                y: 50,
                opacity: 0,
                rotationY: 20,
                ease: 'power3.out',
                delay: index * 0.2
            });
            
            // Hover effect with 3D rotation
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = ((x - centerX) / centerX) * 10;
                const rotateX = ((centerY - y) / centerY) * 10;
                
                gsap.to(card, {
                    duration: 0.4,
                    rotateX: rotateX,
                    rotateY: rotateY,
                    scale: 1.05,
                    ease: 'power2.out'
                });
                
                // Animate avatar
                const avatar = card.querySelector('.team-card__avatar');
                if (avatar) {
                    gsap.to(avatar, {
                        duration: 0.4,
                        scale: 1.1,
                        ease: 'power2.out'
                    });
                }
                
                // Animate status ring
                const statusRing = card.querySelector('.team-card__status-ring');
                if (statusRing) {
                    gsap.to(statusRing, {
                        duration: 0.4,
                        scale: 1.2,
                        opacity: 0.5,
                        ease: 'power2.out'
                    });
                }
                
                // Animate line
                const line = card.querySelector('.team-card__line');
                if (line) {
                    gsap.to(line, {
                        duration: 0.4,
                        scaleX: 1,
                        ease: 'power2.out'
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.6,
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    ease: 'elastic.out(1, 0.5)'
                });
                
                // Reset avatar
                const avatar = card.querySelector('.team-card__avatar');
                if (avatar) {
                    gsap.to(avatar, {
                        duration: 0.6,
                        scale: 1,
                        ease: 'elastic.out(1, 0.5)'
                    });
                }
                
                // Reset status ring
                const statusRing = card.querySelector('.team-card__status-ring');
                if (statusRing) {
                    gsap.to(statusRing, {
                        duration: 0.6,
                        scale: 1,
                        opacity: 0.3,
                        ease: 'elastic.out(1, 0.5)'
                    });
                }
                
                // Reset line
                const line = card.querySelector('.team-card__line');
                if (line) {
                    gsap.to(line, {
                        duration: 0.6,
                        scaleX: 0,
                        ease: 'power2.out'
                    });
                }
            });
        });
        
        // Animate background circles
        const circles = document.querySelectorAll('.team-section__bg-circle');
        circles.forEach((circle, index) => {
            gsap.to(circle, {
                duration: 30 + (index * 5),
                x: index % 2 === 0 ? 100 : -100,
                y: index === 0 ? 50 : index === 1 ? -50 : 100,
                rotation: 360,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        });
    }
    
    // ===== COMMUNITY ANIMATIONS =====
    function initCommunityAnimations() {
        const communityCard = document.querySelector('.community-card');
        
        if (!communityCard) return;
        
        // Animate card on scroll
        gsap.from(communityCard, {
            scrollTrigger: {
                trigger: communityCard,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            scale: 0.95,
            ease: 'power3.out'
        });
        
        // Animate effects
        const effects = document.querySelectorAll('.community-card__effect');
        effects.forEach((effect, index) => {
            gsap.to(effect, {
                duration: 20 + (index * 5),
                x: index % 2 === 0 ? 100 : -100,
                y: index === 0 ? 50 : index === 1 ? -50 : 100,
                rotation: 360,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        });
        
        // Button animations
        const buttons = document.querySelectorAll('.community-card__buttons .btn');
        buttons.forEach((button, index) => {
            gsap.from(button, {
                scrollTrigger: {
                    trigger: communityCard,
                    start: 'top 60%',
                    toggleActions: 'play none none none'
                },
                duration: 1,
                y: 30,
                opacity: 0,
                ease: 'power3.out',
                delay: 0.5 + (index * 0.2)
            });
            
            // Hover effect
            button.addEventListener('mouseenter', () => {
                const pulse = button.querySelector('.btn__pulse');
                if (pulse) {
                    gsap.to(pulse, {
                        duration: 0.3,
                        scale: 1.2,
                        opacity: 0.5,
                        ease: 'power2.out'
                    });
                }
                
                const rings = button.querySelectorAll('.btn__icon-ring');
                rings.forEach(ring => {
                    gsap.to(ring, {
                        duration: 0.3,
                        scale: 1.2,
                        opacity: 0.5,
                        ease: 'power2.out'
                    });
                });
            });
            
            button.addEventListener('mouseleave', () => {
                const pulse = button.querySelector('.btn__pulse');
                if (pulse) {
                    gsap.to(pulse, {
                        duration: 0.5,
                        scale: 1,
                        opacity: 0.3,
                        ease: 'elastic.out(1, 0.5)'
                    });
                }
                
                const rings = button.querySelectorAll('.btn__icon-ring');
                rings.forEach(ring => {
                    gsap.to(ring, {
                        duration: 0.5,
                        scale: 1,
                        opacity: 0.3,
                        ease: 'elastic.out(1, 0.5)'
                    });
                });
            });
        });
    }
    
    // ===== SUPPORT ANIMATIONS =====
    function initSupportAnimations() {
        const supportCard = document.querySelector('.support-card');
        
        if (!supportCard) return;
        
        // Animate card on scroll
        gsap.from(supportCard, {
            scrollTrigger: {
                trigger: supportCard,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            scale: 0.95,
            ease: 'power3.out'
        });
        
        // Animate floating elements
        const floats = document.querySelectorAll('.support-card__float');
        floats.forEach((float, index) => {
            gsap.to(float, {
                duration: 15 + (index * 5),
                x: index % 2 === 0 ? 50 : -50,
                y: index === 0 ? 30 : index === 1 ? -30 : 60,
                rotation: 360,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        });
        
        // Button animations
        const buttons = document.querySelectorAll('.support-card__buttons .btn');
        buttons.forEach((button, index) => {
            gsap.from(button, {
                scrollTrigger: {
                    trigger: supportCard,
                    start: 'top 60%',
                    toggleActions: 'play none none none'
                },
                duration: 1,
                y: 30,
                opacity: 0,
                ease: 'power3.out',
                delay: 0.5 + (index * 0.2)
            });
            
            // Hover effect with sparks
            button.addEventListener('mouseenter', () => {
                const sparks = button.querySelectorAll('.btn__spark');
                sparks.forEach((spark, sparkIndex) => {
                    gsap.to(spark, {
                        duration: 0.5,
                        x: Math.random() * 40 - 20,
                        y: Math.random() * 40 - 20,
                        opacity: 1,
                        scale: 1,
                        ease: 'power2.out',
                        delay: sparkIndex * 0.1
                    });
                });
                
                const shine = button.querySelector('.btn__shine');
                if (shine) {
                    gsap.to(shine, {
                        duration: 0.6,
                        x: '100%',
                        ease: 'power2.out'
                    });
                }
            });
            
            button.addEventListener('mouseleave', () => {
                const sparks = button.querySelectorAll('.btn__spark');
                sparks.forEach(spark => {
                    gsap.to(spark, {
                        duration: 0.3,
                        opacity: 0,
                        scale: 0,
                        ease: 'power2.in'
                    });
                });
                
                const shine = button.querySelector('.btn__shine');
                if (shine) {
                    gsap.set(shine, { x: '-100%' });
                }
            });
        });
    }
    
    // ===== FOOTER ANIMATIONS (GACOR PARAH) =====
    function initFooterAnimations() {
        const footer = document.querySelector('.footer');
        const backToTop = document.getElementById('backToTop');
        
        if (!footer) return;
        
        // Animate footer on scroll
        gsap.from(footer, {
            scrollTrigger: {
                trigger: footer,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            duration: 1.5,
            y: 100,
            opacity: 0,
            ease: 'power3.out'
        });
        
        // Animate footer sections with stagger
        gsap.from('.footer__top > *', {
            scrollTrigger: {
                trigger: footer,
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.3,
            ease: 'power3.out',
            delay: 0.3
        });
        
        gsap.from('.footer__middle > *', {
            scrollTrigger: {
                trigger: footer,
                start: 'top 60%',
                toggleActions: 'play none none none'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.3,
            ease: 'power3.out',
            delay: 0.6
        });
        
        gsap.from('.footer__bottom > *', {
            scrollTrigger: {
                trigger: footer,
                start: 'top 50%',
                toggleActions: 'play none none none'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.3,
            ease: 'power3.out',
            delay: 0.9
        });
        
        // Animate logo glow
        const logoGlow = document.querySelector('.footer__logo-glow');
        if (logoGlow) {
            gsap.to(logoGlow, {
                duration: 2,
                scale: 1.2,
                opacity: 0.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
        
        // Animate logo pulse
        const logoPulse = document.querySelector('.footer__logo-pulse');
        if (logoPulse) {
            gsap.to(logoPulse, {
                duration: 3,
                scale: 1.2,
                opacity: 0.3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
        
        // Animate social icons
        const socialIcons = document.querySelectorAll('.footer__social-icon');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                const glow = icon.querySelector('.footer__social-glow');
                const ring = icon.querySelector('.footer__social-ring');
                
                if (glow) {
                    gsap.to(glow, {
                        duration: 0.3,
                        scale: 1.5,
                        opacity: 0.3,
                        ease: 'power2.out'
                    });
                }
                
                if (ring) {
                    gsap.to(ring, {
                        duration: 0.3,
                        scale: 1.2,
                        opacity: 0.5,
                        ease: 'power2.out'
                    });
                }
            });
            
            icon.addEventListener('mouseleave', () => {
                const glow = icon.querySelector('.footer__social-glow');
                const ring = icon.querySelector('.footer__social-ring');
                
                if (glow) {
                    gsap.to(glow, {
                        duration: 0.5,
                        scale: 1,
                        opacity: 0,
                        ease: 'elastic.out(1, 0.5)'
                    });
                }
                
                if (ring) {
                    gsap.to(ring, {
                        duration: 0.5,
                        scale: 1,
                        opacity: 0,
                        ease: 'elastic.out(1, 0.5)'
                    });
                }
            });
        });
        
        // Animate badge glow
        const badgeGlow = document.querySelector('.footer__badge-glow');
        if (badgeGlow) {
            gsap.to(badgeGlow, {
                duration: 3,
                x: '100%',
                repeat: -1,
                ease: 'none'
            });
        }
        
        // Animate footer effects
        const effects = document.querySelectorAll('.footer__effect');
        effects.forEach((effect, index) => {
            gsap.to(effect, {
                duration: 20 + (index * 10),
                x: index % 2 === 0 ? 50 : -50,
                y: index === 0 ? 30 : index === 1 ? -30 : 60,
                rotation: 360,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        });
        
        // Back to top button
        if (backToTop) {
            // Show/hide based on scroll
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });
            
            // Click event
            backToTop.addEventListener('click', () => {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: 0,
                        autoKill: true
                    },
                    ease: 'power3.inOut'
                });
            });
            
            // Hover effect
            backToTop.addEventListener('mouseenter', () => {
                gsap.to(backToTop, {
                    duration: 0.3,
                    scale: 1.1,
                    ease: 'power2.out'
                });
                
                const glow = backToTop.querySelector('.footer__back-to-top-glow');
                if (glow) {
                    gsap.to(glow, {
                        duration: 0.3,
                        opacity: 0.2,
                        ease: 'power2.out'
                    });
                }
            });
            
            backToTop.addEventListener('mouseleave', () => {
                gsap.to(backToTop, {
                    duration: 0.5,
                    scale: 1,
                    ease: 'elastic.out(1, 0.5)'
                });
                
                const glow = backToTop.querySelector('.footer__back-to-top-glow');
                if (glow) {
                    gsap.to(glow, {
                        duration: 0.5,
                        opacity: 0,
                        ease: 'elastic.out(1, 0.5)'
                    });
                }
            });
        }
    }
    
    // ===== BUTTON ANIMATIONS =====
    function initButtonAnimations() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Click animation
            button.addEventListener('mousedown', () => {
                gsap.to(button, {
                    duration: 0.1,
                    scale: 0.95,
                    ease: 'power2.in'
                });
            });
            
            button.addEventListener('mouseup', () => {
                gsap.to(button, {
                    duration: 0.3,
                    scale: 1,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    duration: 0.3,
                    scale: 1,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
            
            // Touch devices support
            button.addEventListener('touchstart', () => {
                gsap.to(button, {
                    duration: 0.1,
                    scale: 0.95,
                    ease: 'power2.in'
                });
            });
            
            button.addEventListener('touchend', () => {
                gsap.to(button, {
                    duration: 0.3,
                    scale: 1,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
    }
    
    // ===== SCROLL TRIGGER ANIMATIONS =====
    function initScrollAnimations() {
        // Animate all sections EXCEPT hero
        const sections = document.querySelectorAll('section:not(.hero)');
        
        sections.forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out'
            });
        });
        
        // Animate section headers
        const sectionHeaders = document.querySelectorAll('.section-header');
        
        sectionHeaders.forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                duration: 1,
                y: 30,
                opacity: 0,
                ease: 'power3.out'
            });
        });
        
        // Parallax effects for background elements
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            
            gsap.to(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: (i, target) => -ScrollTrigger.maxScroll(window) * speed,
                ease: 'none'
            });
        });
    }
    
    // ===== PAGE LOAD ANIMATIONS =====
    function initPageLoadAnimations() {
        // Create loading screen
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading';
        loadingScreen.innerHTML = `
            <div class="loading__content">
                <div class="loading__logo">
                    <img src="https://img.icons8.com/color/96/000000/roblox.png" alt="Mount Veridia">
                </div>
                <div class="loading__text">GUNUNG ROBLOX</div>
            </div>
        `;
        
        document.body.appendChild(loadingScreen);
        
        // Animate loading screen
        gsap.from('.loading__logo', {
            duration: 1,
            scale: 0,
            rotation: 360,
            ease: 'back.out(1.7)'
        });
        
        gsap.from('.loading__text', {
            duration: 1.5,
            y: 20,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.5
        });
        
        // Hide loading screen after content loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                gsap.to(loadingScreen, {
                    duration: 0.8,
                    opacity: 0,
                    onComplete: () => {
                        loadingScreen.remove();
                    }
                });
            }, 1000);
        });
        
        // Fallback in case load event doesn't fire
        setTimeout(() => {
            if (document.readyState === 'complete' && loadingScreen.parentNode) {
                gsap.to(loadingScreen, {
                    duration: 0.8,
                    opacity: 0,
                    onComplete: () => {
                        loadingScreen.remove();
                    }
                });
            }
        }, 3000);
    }
    
    // ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
    function initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Stagger animation for child elements
                    const children = entry.target.querySelectorAll('[data-scroll-delay]');
                    children.forEach((child, index) => {
                        const delay = child.dataset.scrollDelay || index * 0.1;
                        
                        gsap.from(child, {
                            duration: 0.8,
                            y: 30,
                            opacity: 0,
                            delay: parseFloat(delay),
                            ease: 'power3.out'
                        });
                    });
                }
            });
        }, observerOptions);
        
        // Observe all elements with data-scroll attribute
        document.querySelectorAll('[data-scroll]').forEach(el => {
            observer.observe(el);
        });
    }
    
    // ===== INITIALIZE ALL ANIMATIONS =====
    function initAllAnimations() {
        console.log('%c🚀 MEMULAI SEMUA ANIMASI...', 'color: #22D3EE; font-weight: bold;');
        
        // Initialize in sequence for smooth performance
        setTimeout(() => {
            initCustomCursor();
            initHeaderAnimations();
            initHeroAnimations(); // Hanya animasi background lights
            initFeaturesSlider();
            initUpdatesAnimations();
            initTeamAnimations();
            initCommunityAnimations();
            initSupportAnimations();
            initFooterAnimations();
            initButtonAnimations();
            initScrollAnimations();
            initIntersectionObserver();
            
            console.log('%c✅ SEMUA ANIMASI AKTIF!', 'color: #2CE59B; font-weight: bold;');
            console.log('%c🎮 WEBSITE 500 JUTA SIAP! 🎮', 'font-size: 20px; color: #FF4D8D; font-weight: bold;');
            
        }, 500);
    }
    
    // ===== INITIALIZE EVERYTHING =====
    function init() {
        console.log('%c========================================', 'color: #7C5CFF');
        console.log('%cMOUNT VERIDIA - ULTIMATE EDITION', 'font-size: 20px; color: #7C5CFF; font-weight: bold;');
        console.log('%cAnimasi Level Dewa - Website 500 Juta', 'color: #22D3EE; font-weight: bold;');
        console.log('%cFIX BANNER BUG & MOUSE CURSOR', 'color: #2CE59B; font-weight: bold;');
        console.log('%cFIX HERO SECTION NO AUTO-ANIMATIONS', 'color: #FFB74D; font-weight: bold;');
        console.log('%c========================================', 'color: #7C5CFF');
        
        // Start with gate animations
        initGateAnimations();
        
        // Initialize page load animations
        initPageLoadAnimations();
        
        // Initialize smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href.startsWith('#!')) return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    gsap.to(window, {
                        duration: 1.2,
                        scrollTo: {
                            y: target,
                            offsetY: 80,
                            autoKill: true
                        },
                        ease: 'power3.inOut'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobileMenu');
                    const menuToggle = document.getElementById('menuToggle');
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                }
            });
        });
        
        // Add loaded class to body when everything is ready
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.add('loaded');
            }, 1000);
        });
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 250);
        });
        
        // Performance optimization
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                // Lazy load images
                const images = document.querySelectorAll('img[data-src]');
                images.forEach(img => {
                    img.src = img.dataset.src;
                    img.onload = () => img.classList.add('loaded');
                });
            });
        }
    }
    
    // ===== START EVERYTHING =====
    init();
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== POLYFILLS FOR OLDER BROWSERS =====
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Error:', e.error);
    console.log('Continuing with animations...');
});

// ===== PAGE VISIBILITY API =====
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is not visible
        gsap.globalTimeline.pause();
    } else {
        // Resume animations when page is visible
        gsap.globalTimeline.resume();
    }
});

console.log('%c✨ MOUNT VERIDIA JS LOADED! ✨', 'font-size: 18px; color: #7C5CFF; font-weight: bold;');