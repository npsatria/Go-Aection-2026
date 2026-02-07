document.addEventListener("DOMContentLoaded", () => {

    /* --- 1. LOGIC ACCORDION --- */
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            const content = item.querySelector(".accordion-content");

            // Toggle class active
            item.classList.toggle("active");

            // Logic buka tutup smooth
            if (item.classList.contains("active")) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    /* --- 2. LOGIC COUNTDOWN --- */
    /* --- 2. LOGIC COUNTDOWN --- */
    const targetDate = new Date("Feb 12, 2026 23:59:59").getTime();

    function updateCountdown() {
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

        if (distance < 0) {
            // clearInterval(timer); // Timer defined locally below if we kept it, but easier to just check
            const box = document.querySelector(".countdown-container");
            if(box) box.innerHTML = "<span class='text-red-500 font-bold'>PENDAFTARAN DITUTUP</span>";
        }
    }

    // Run immediately
    updateCountdown();

    // Check interval
    const timer = setInterval(function() {
        updateCountdown();
        // Clear interval logic logic is inside updateCountdown equivalent check or simply let it run (minimal cost)
        // But to be precise:
        const now = new Date().getTime();
        if (targetDate - now < 0) clearInterval(timer);
    }, 1000);

    /* --- 4. MOBILE MENU (GSAP Smooth) --- */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    if (mobileMenuBtn && mobileMenu) {
        const menuLinks = mobileMenu.querySelectorAll('a');

        const openMenu = () => {
            mobileMenu.classList.remove('hidden');
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
                    mobileMenu.classList.add('hidden');
                }
            });
        };

        mobileMenuBtn.onclick = openMenu;
        if (closeMenuBtn) closeMenuBtn.onclick = closeMenu;

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

    // 7. THEME TOGGLE SYSTEM
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        // Check saved preference or system preference (default to dark as per premium design)
        const savedTheme = localStorage.getItem('theme');

        // Explicitly set dark by default if no save, or follow save
        if (savedTheme === 'dark' || (!savedTheme && true)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');

            // Optional: Animate icon rotation
            const icons = themeToggleBtn.querySelectorAll('iconify-icon');
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(icons,
                    { rotation: -90, scale: 0.5 },
                    { rotation: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
                );
            }
        });
    }
});
