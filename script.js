document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       1. PAGE LOADER
    ====================================================== */
    const pageLoader = document.querySelector('.page-loader');
    
    window.addEventListener('load', () => {
        if (pageLoader) {
            pageLoader.classList.add('loaded');
        }
    });

    /* Fallback timeout in case window load event fires slowly */
    setTimeout(() => {
        if (pageLoader && !pageLoader.classList.contains('loaded')) {
            pageLoader.classList.add('loaded');
        }
    }, 3000);

    /* =====================================================
       2. SCROLL PROGRESS BAR & ACTIVE NAV HIGHLIGHT
    ====================================================== */
    const progressBar = document.querySelector('.scroll-progress');
    const sections = document.querySelectorAll('.section-anchor');
    const navLinks = document.querySelectorAll('.nav-link');

    const handleScroll = () => {
        // Update Scroll Progress Bar
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolledPercentage = (window.scrollY / windowHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = `${Math.min(scrolledPercentage, 100)}%`;
        }

        // Highlight Active Nav Link
        let currentSectionId = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    /* =====================================================
       3. MOBILE NAVIGATION TOGGLE
    ====================================================== */
    const menuButton = document.querySelector('.menu-button');
    const navLinksContainer = document.querySelector('.nav-links');

    if (menuButton && navLinksContainer) {
        menuButton.addEventListener('click', () => {
            const isOpened = navLinksContainer.classList.toggle('open');
            menuButton.setAttribute('aria-expanded', isOpened ? 'true' : 'false');
        });

        // Close mobile nav menu when clicking a link
        navLinksContainer.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('open');
                menuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* =====================================================
       4. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
    ====================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        // Unobserve element after animation triggers
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach((element) => {
            element.classList.add('active');
        });
    }

    /* =====================================================
       5. 3D CARD INTERACTIVE TILT EFFECT
    ====================================================== */
    const tiltElements = document.querySelectorAll('.project-card, .photo-frame');

    tiltElements.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse X position inside element
            const y = e.clientY - rect.top;  // Mouse Y position inside element

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation angles (max tilt deg: 12deg)
            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            // Smoothly reset 3D transform on mouse exit
            card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    });

});
