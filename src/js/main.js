// Register GSAP & ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. HERO ANIMATION (Parallax Mouse)
const heroSection = document.getElementById('hero');
const mascotMain = document.getElementById('mascot-main');

if(heroSection && mascotMain) {
    // Entrance
    gsap.from(mascotMain, { y: 100, opacity: 0, duration: 1.5, ease: "power4.out" });

    // Floating
    gsap.to(mascotMain, {
        y: -30, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut"
    });

    // Mouse Move Parallax
    heroSection.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        gsap.to(mascotMain, { x: x, y: y, duration: 1, ease: "power2.out" });
    });
}

// 2. CARD ANIMATION (Staggered Reveal)
gsap.utils.toArray('.glass-panel').forEach((card, i) => {
    gsap.from(card, {
        y: 100, opacity: 0, duration: 0.8,
        scrollTrigger: {
            trigger: card, start: "top 95%", toggleActions: "play none none reverse"
        },
        delay: i * 0.1
    });
});

// 3. MASKOT TERBANG (Follow Scroll)
gsap.to("#mascot-fly", {
    y: 100, x: -50, rotation: 10,
    scrollTrigger: {
        trigger: "#memories",
        start: "top bottom",
        end: "bottom top",
        scrub: 2
    }
});

// 4. MASKOT NUNJUK (Entrance)
gsap.from("#mascot-point", {
    x: 100, opacity: 0, rotation: 45, duration: 1,
    scrollTrigger: { trigger: "#registration", start: "top 60%" }
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav-island');
    if (window.scrollY > 50) {
        nav.style.padding = "10px 30px";
        nav.style.background = "rgba(10,10,10,0.8)";
    } else {
        nav.style.padding = "15px 30px";
        nav.style.background = "rgba(10,10,10,0.5)";
    }
});

// Mobile Menu
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    gsap.from("#mobile-menu a", {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.1
    });
});
