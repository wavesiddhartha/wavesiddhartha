// Notebook Portfolio Interactive Elements

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== PREMIUM ANIMATED CURSOR ===== 
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    
    cursor.className = 'premium-cursor';
    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';
    
    cursor.appendChild(cursorDot);
    cursor.appendChild(cursorOutline);
    document.body.appendChild(cursor);
    
    // Add premium cursor styles
    const cursorStyles = document.createElement('style');
    cursorStyles.textContent = `
        .premium-cursor {
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            z-index: 9999;
            pointer-events: none;
        }
        
        .cursor-dot {
            position: absolute;
            width: 8px;
            height: 8px;
            background: linear-gradient(135deg, #1a4b73, #2c5aa0);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(1);
            transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
            box-shadow: 0 0 20px rgba(26, 75, 115, 0.3);
        }
        
        .cursor-outline {
            position: absolute;
            width: 32px;
            height: 32px;
            border: 2px solid rgba(26, 75, 115, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(1);
            transition: all 0.15s cubic-bezier(0.23, 1, 0.32, 1);
            animation: cursorPulse 2s ease-in-out infinite;
        }
        
        @keyframes cursorPulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.7; }
        }
        
        .cursor-hover .cursor-dot {
            transform: translate(-50%, -50%) scale(1.5);
            background: linear-gradient(135deg, #d4af37, #b8860b);
            box-shadow: 0 0 30px rgba(212, 175, 55, 0.5);
        }
        
        .cursor-hover .cursor-outline {
            transform: translate(-50%, -50%) scale(2);
            border-color: rgba(212, 175, 55, 0.5);
        }
        
        .cursor-click .cursor-dot {
            transform: translate(-50%, -50%) scale(0.8);
        }
        
        .cursor-click .cursor-outline {
            transform: translate(-50%, -50%) scale(0.5);
        }
    `;
    document.head.appendChild(cursorStyles);

    // Smooth cursor movement with advanced easing
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let isHovering = false;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const ease = 0.15;
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    // Start animation only on non-touch devices
    if (!('ontouchstart' in window)) {
        animateCursor();
        
        // Cursor interactions
        const interactiveElements = 'a, button, .doodle-button, .sketch-box, .sticky-note, [role="button"]';
        
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches(interactiveElements)) {
                cursor.classList.add('cursor-hover');
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.matches(interactiveElements)) {
                cursor.classList.remove('cursor-hover');
            }
        });
        
        document.addEventListener('mousedown', () => {
            cursor.classList.add('cursor-click');
        });
        
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('cursor-click');
        });
    } else {
        cursor.style.display = 'none';
    }

    // ===== SKETCH BOX HOVER EFFECTS =====
    const sketchBoxes = document.querySelectorAll('.sketch-box');
    
    sketchBoxes.forEach((box, index) => {
        // Add slight rotation variety
        const baseRotation = (index % 2 === 0) ? 0.5 : -0.5;
        box.style.transform = `rotate(${baseRotation}deg)`;
        
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(0deg) scale(1.02)';
            this.style.zIndex = '10';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = `rotate(${baseRotation}deg) scale(1)`;
            this.style.zIndex = '1';
        });
    });

    // ===== STICKY NOTES WOBBLE EFFECT =====
    const stickyNotes = document.querySelectorAll('.sticky-note');
    
    stickyNotes.forEach((note, index) => {
        const baseRotation = [-1, 1, -0.8, 0.8, -1.2][index % 5];
        note.style.transform = `rotate(${baseRotation}deg)`;
        
        note.addEventListener('mouseenter', function() {
            this.style.transform = `rotate(${baseRotation * 0.5}deg) scale(1.05)`;
            this.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
        
        note.addEventListener('mouseleave', function() {
            this.style.transform = `rotate(${baseRotation}deg) scale(1)`;
        });
    });

    // ===== DOODLE BUTTON INTERACTIONS =====
    const doodleButtons = document.querySelectorAll('.doodle-button');
    
    doodleButtons.forEach((button, index) => {
        const baseRotation = [-0.5, 0.5, -0.3, 0.7, -0.8][index % 5];
        button.style.transform = `rotate(${baseRotation}deg)`;
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(0deg) scale(1.1)';
            this.style.background = 'var(--highlight-blue)';
            this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = `rotate(${baseRotation}deg) scale(1)`;
            this.style.background = 'var(--highlight-yellow)';
        });
        
        // Add click effect
        button.addEventListener('click', function() {
            this.style.transform = `rotate(${baseRotation}deg) scale(0.95)`;
            setTimeout(() => {
                this.style.transform = `rotate(${baseRotation}deg) scale(1)`;
            }, 150);
        });
    });

    // ===== PREMIUM SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const premiumObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('section-visible');
                
                // Add sophisticated staggered animations
                const animatedItems = entry.target.querySelectorAll('.sketch-box, .doodle-button, .sticky-note, .margin-note');
                animatedItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = item.style.transform.replace('translateY(20px)', 'translateY(0)').replace('translateY(15px)', 'translateY(0)');
                        item.classList.add('item-visible');
                    }, index * 120);
                });
                
                // Add section title animation
                const sectionTitle = entry.target.querySelector('.section-title');
                if (sectionTitle) {
                    setTimeout(() => {
                        sectionTitle.style.transform = sectionTitle.style.transform + ' scale(1)';
                        sectionTitle.classList.add('title-visible');
                    }, 200);
                }
            }
        });
    }, observerOptions);

    // Observe all notebook steps with premium animations
    const notebookSteps = document.querySelectorAll('.notebook-step');
    notebookSteps.forEach((step, index) => {
        // Initial state for premium animation
        step.style.opacity = '0';
        step.style.transform = 'translateY(40px)';
        step.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        
        // Add sophisticated delay based on index and viewport position
        setTimeout(() => {
            premiumObserver.observe(step);
        }, index * 150);
    });

    // ===== HIGHLIGHT ANIMATIONS =====
    const highlights = document.querySelectorAll('.highlight-yellow, .highlight-pink, .highlight-blue');
    
    const highlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.5 });

    highlights.forEach(highlight => {
        highlight.style.animationPlayState = 'paused';
        highlightObserver.observe(highlight);
    });

    // ===== PAPER TEXTURE ANIMATION =====
    function addPaperNoise() {
        const noise = document.createElement('div');
        noise.style.cssText = `
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="20" cy="20" r="1" fill="%23f0f0f0" opacity="0.3"/><circle cx="80" cy="40" r="0.5" fill="%23e0e0e0" opacity="0.4"/><circle cx="60" cy="80" r="1" fill="%23f0f0f0" opacity="0.2"/></svg>') repeat;
            pointer-events: none;
            z-index: -1;
            animation: paperNoise 20s linear infinite;
        `;
        document.body.appendChild(noise);
    }

    // Add premium animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes paperNoise {
            0% { transform: translate(0, 0); }
            25% { transform: translate(-1px, -0.5px); }
            50% { transform: translate(0.5px, -1px); }
            75% { transform: translate(-0.5px, 0.5px); }
            100% { transform: translate(0, 0); }
        }
        
        @keyframes premiumFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-3px) rotate(1deg); }
        }
        
        @keyframes premiumGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(26, 75, 115, 0.1); }
            50% { box-shadow: 0 0 30px rgba(26, 75, 115, 0.2); }
        }
        
        .premium-element {
            animation: premiumFloat 6s ease-in-out infinite;
        }
        
        .premium-glow {
            animation: premiumGlow 4s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);

    // Add paper noise effect
    addPaperNoise();

    // ===== TYPING ANIMATION FOR QUOTES =====
    const quotes = document.querySelectorAll('.closing-quote');
    
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    const quoteObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const originalText = entry.target.textContent;
                typeWriter(entry.target, originalText, 30);
                quoteObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    quotes.forEach(quote => {
        quoteObserver.observe(quote);
    });

    // ===== HANDWRITTEN TITLE DRAW EFFECT =====
    const titles = document.querySelectorAll('.handwritten-title, .section-title');
    
    titles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform + ' scale(1.02)';
            this.style.textShadow = '2px 2px 4px rgba(0,0,0,0.1)';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.02)', '');
            this.style.textShadow = 'none';
        });
    });

    // ===== EASTER EGG: KONAMI CODE =====
    let konamiCode = [];
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konami.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konami.join(',')) {
            // Easter egg: Make cursor dance with premium effects
            cursorDot.style.background = 'linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)';
            cursorDot.style.backgroundSize = '400% 400%';
            cursorDot.style.animation = 'cursorDance 2s ease-in-out infinite, gradientShift 3s ease-in-out infinite';
            cursorOutline.style.borderColor = '#ff6b6b';
            cursorOutline.style.animation = 'cursorDanceOutline 2s ease-in-out infinite';
            
            // Add dance animation
            const danceStyle = document.createElement('style');
            danceStyle.textContent = `
                @keyframes cursorDance {
                    0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
                    25% { transform: translate(-50%, -50%) scale(1.5) rotate(90deg); }
                    50% { transform: translate(-50%, -50%) scale(0.8) rotate(180deg); }
                    75% { transform: translate(-50%, -50%) scale(1.2) rotate(270deg); }
                }
                
                @keyframes cursorDanceOutline {
                    0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); border-color: #ff6b6b; }
                    25% { transform: translate(-50%, -50%) scale(2) rotate(-90deg); border-color: #feca57; }
                    50% { transform: translate(-50%, -50%) scale(1.5) rotate(-180deg); border-color: #48dbfb; }
                    75% { transform: translate(-50%, -50%) scale(2.5) rotate(-270deg); border-color: #ff9ff3; }
                }
                
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `;
            document.head.appendChild(danceStyle);
            
            // Reset after 5 seconds
            setTimeout(() => {
                cursorDot.style.background = 'linear-gradient(135deg, #1a4b73, #2c5aa0)';
                cursorDot.style.backgroundSize = '100% 100%';
                cursorDot.style.animation = '';
                cursorOutline.style.borderColor = 'rgba(26, 75, 115, 0.3)';
                cursorOutline.style.animation = 'cursorPulse 2s ease-in-out infinite';
            }, 5000);
            
            konamiCode = [];
        }
    });

    // ===== PERFORMANCE OPTIMIZATION =====
    // Throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Add subtle parallax effect to margin notes
                const marginNotes = document.querySelectorAll('.margin-note');
                const scrollY = window.pageYOffset;
                
                marginNotes.forEach((note, index) => {
                    const speed = 0.02 * (index + 1);
                    note.style.transform = `translateY(${scrollY * speed}px) rotate(-0.3deg)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', updateOnScroll);

    console.log('✨ Premium Notebook Portfolio loaded successfully!');
    console.log('🎯 Enhanced cursor and interactions ready!');
    console.log('🎉 Try the Konami Code for a surprise: ↑↑↓↓←→←→BA');
});