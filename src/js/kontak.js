/* src/js/kontak.js */
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

// Staggered Cards Animation
gsap.from('.contact-card', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'back.out(1.2)',
    delay: 0.5, // Reduced delay from 1.2 to 0.5 for snappier feel
    scrollTrigger: {
        trigger: '#contact-grid',
        start: 'top 95%', // Trigger earlier to avoid "empty" look
        onEnter: () => gsap.to('.contact-card', { opacity: 1, y: 0 }) // Force visibility on enter
    }
});

// Footer Reveal
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

// Mobile Menu (GSAP Smooth)
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = mobileMenu ? mobileMenu.querySelector('button') : null;

if (mobileMenuBtn && mobileMenu) {
    const menuLinks = mobileMenu.querySelectorAll('a');

    const openMenu = () => {
        mobileMenu.classList.add('active');
        gsap.to(mobileMenu, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        });
        gsap.to(menuLinks, {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            delay: 0.2,
            ease: "back.out(1.7)"
        });
    };

    const closeMenu = () => {
        gsap.to(menuLinks, {
            y: 20,
            opacity: 0,
            stagger: 0.05,
            duration: 0.3,
            ease: "power2.in"
        });
        gsap.to(mobileMenu, {
            opacity: 0,
            duration: 0.4,
            delay: 0.2,
            ease: "power2.in",
            onComplete: () => {
                mobileMenu.classList.remove('active');
            }
        });
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
