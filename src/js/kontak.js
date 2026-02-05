/* src/js/kontak.js */
// Register GSAP & ScrollTrigger safely
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Initial Header Animation
    gsap.from('h1', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.5
    });

    gsap.from('p.reveal-up', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.8
    });

    // Staggered Cards Animation (Robust)
    // Target both legacy and premium classes to be safe
    const cards = document.querySelectorAll('.contact-card, .contact-card-premium');
    if (cards.length > 0) {
        gsap.from(cards, {
            y: 30, // Reduced movement
            opacity: 0,
            duration: 0.6, // Faster
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#contact-grid',
                start: "top 120%", // Trigger WAY before it enters viewport (effectively immediately)
                toggleActions: "play none none none", // Never hide again
                markers: false
            },
            onComplete: () => {
                 // CRITICAL: Remove all GSAP styles so CSS takes over completely
                 gsap.set(cards, { clearProps: "all" });
            }
        });
    }

    // Footer Reveal - MOVED INSIDE SAFETY CHECK
    gsap.from('footer .reveal-up', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: 'footer',
            start: 'top 95%'
        }
    });

} else {
    console.warn("GSAP/ScrollTrigger not loaded in kontak.js");
}

// Mobile Menu (GSAP Smooth) - WITH INNER SAFETY CHECK
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = document.getElementById('close-menu-btn');

if (mobileMenuBtn && mobileMenu) {
    const menuLinks = mobileMenu.querySelectorAll('a');

    const openMenu = () => {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('active');

        if (typeof gsap !== 'undefined') {
            gsap.to(mobileMenu, { opacity: 1, duration: 0.5, ease: "power2.out" });
            gsap.to(menuLinks, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, delay: 0.2, ease: "back.out(1.7)" });
        } else {
            // Fallback
            mobileMenu.style.opacity = 1;
            menuLinks.forEach(l => { l.style.transform = 'translateY(0)'; l.style.opacity = 1; });
        }
    };

    const closeMenu = () => {
        if (typeof gsap !== 'undefined') {
            gsap.to(menuLinks, { y: 20, opacity: 0, stagger: 0.05, duration: 0.3, ease: "power2.in" });
            gsap.to(mobileMenu, {
                opacity: 0, duration: 0.4, delay: 0.2, ease: "power2.in",
                onComplete: () => {
                    mobileMenu.classList.remove('active');
                    mobileMenu.classList.add('hidden');
                }
            });
        } else {
            // Fallback
            mobileMenu.classList.remove('active');
            mobileMenu.classList.add('hidden');
            mobileMenu.style.opacity = 0;
        }
    };

    mobileMenuBtn.onclick = openMenu;
    if (closeMenuBtn) closeMenuBtn.onclick = closeMenu;

    // Close on link click
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.nav-sticky');
if (navbar) {
    function handleScroll() {
        if (window.scrollY > 20) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
}
