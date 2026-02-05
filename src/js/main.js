// Register GSAP & ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 0. COUNTDOWN LOGIC
const targetDate = new Date("Feb 7, 2026 23:59:59").getTime();
setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (document.getElementById("d")) {
        document.getElementById("d").innerText = days.toString().padStart(2, '0');
        document.getElementById("h").innerText = hours.toString().padStart(2, '0');
        document.getElementById("m").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("s").innerText = seconds.toString().padStart(2, '0');
    }
}, 1000);

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

// 2. TIMELINE DRAWING EFFECT
const timelineLine = document.querySelector('#timeline .absolute.left-8.md\\:left-1\\/2');
if(timelineLine) {
    gsap.from(timelineLine, {
        scaleY: 0,
        transformOrigin: "top center",
        scrollTrigger: {
            trigger: "#timeline",
            start: "top 20%",
            end: "bottom 80%",
            scrub: 1
        }
    });
}

// 3. STAGGERED REVEALS (Snappy Entrance)
const reveals = [
    { selector: '.reveal-up', vars: { y: 50, opacity: 0 } },
    { selector: '.reveal-left', vars: { x: -80, opacity: 0 } },
    { selector: '.reveal-right', vars: { x: 80, opacity: 0 } },
    { selector: '.glass-panel', vars: { y: 30, opacity: 0, scale: 0.95 } }
];

reveals.forEach(({ selector, vars }) => {
    gsap.utils.toArray(selector).forEach((el) => {
        gsap.from(el, {
            ...vars,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });
});

// 4. MASKOT FIGHT PARALLAX
const mascotFight = document.querySelector('img[src*="mascot-fight.png"]');
if(mascotFight) {
    gsap.to(mascotFight, {
        y: -40,
        x: 20,
        rotation: 5,
        scrollTrigger: {
            trigger: "#registration",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });
}

// 6. PILIH DIVISI INTERACTIVE SIDEBAR LOGIC
function switchDivisi(category) {
    // 1. Update Sidebar Tabs (Active State)
    const allTabs = document.querySelectorAll('.divisi-tab');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
        // Reset indicator animation manually if needed, or let CSS handle it via class removal
        const indicator = tab.querySelector('.active-indicator');
        if(indicator) {
            // GSAP Reset for smoothness if CSS transition isn't enough
            gsap.to(indicator, { scaleY: 0, duration: 0.3 });
        }
    });

    const activeTab = document.getElementById(`tab-${category}`);
    if (activeTab) {
        activeTab.classList.add('active');
        const indicator = activeTab.querySelector('.active-indicator');
        if(indicator) {
             gsap.to(indicator, { scaleY: 1, duration: 0.4, ease: "power2.out" });
        }
    }

    // 2. Switch Content Area with GSAP
    const allContents = document.querySelectorAll('.divisi-content');
    const targetContent = document.getElementById(`content-${category}`);

    // Hide all current visible contents
    allContents.forEach(content => {
        if (content !== targetContent && content.classList.contains('visible')) {
            // Animate out
            gsap.to(content, {
                opacity: 0,
                y: 20, // Move down slightly
                duration: 0.4,
                ease: "power2.in",
                onComplete: () => {
                    content.classList.remove('visible');
                    content.classList.add('invisible');
                }
            });
        }
    });

    // Show target content
    if (targetContent) {
        targetContent.classList.remove('invisible');
        targetContent.classList.add('visible');

        // Reset position for animation
        gsap.fromTo(targetContent,
            { opacity: 0, y: -20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 0.2, // Wait for exit animation
                ease: "power2.out"
            }
        );

        // Animate internal elements for staggered effect
        const internalElements = targetContent.querySelectorAll('h3, p, .grid, a');
        gsap.fromTo(internalElements,
            { opacity: 0, y: 10 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.5,
                delay: 0.3,
                ease: "power2.out"
            }
        );
    }
}

// Initialize first tab (IT) as active on load just in case
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on homepage
    if(document.getElementById('divisi-sidebar')) {
        // switchDivisi('it'); // Uncomment if you want to force re-animating it, otherwise HTML default is fine
    }
});

// 5. MOBILE MENU LOGIC (GSAP SMOOTH)
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

// 6. NAVBAR SCROLL EFFECT (Transparent -> Dark)
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
    handleScroll(); // Init check
}
