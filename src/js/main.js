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

const competitionData = {
    it: {
        category: "SMP / MTS",
        title: "IT (WEP)",
        desc: "Uji kemahiranmu dalam mengelola data dan presentasi menggunakan ekosistem Microsoft Office. Kecepatan dan ketepatan adalah kuncinya.",
        price: "Rp 75.000",
        divisi: "SE-BALI",
        icon: "💻",
        color: "#17468B",
        link: "/src/pages/lomba-it.html" // Mengarah ke halaman detail
    },
    robot: {
        category: "UMUM",
        title: "ROBOTIK",
        desc: "Bangun robot sumomu, atur strategi terbaik, dan dorong lawan keluar arena. Pertarungan fisik dan otak dimulai di sini.",
        price: "Rp 150.000",
        divisi: "UMUM",
        color: "#D12E17",
        link: "/src/pages/lomba-robotik.html"
    },
    art: {
        category: "SD - SMP",
        title: "KESENIAN",
        desc: "Lestarikan budaya Bali melalui Tari Tradisional, Sketsa Ogoh-ogoh, atau tunjukkan bakat desainmu di Poster Digital.",
        price: "Mulai Rp 50.000",
        divisi: "SE-BALI",
        icon: "🎨",
        color: "#D17417",
        link: "/src/pages/lomba-kesenian.html"
    },
    rohis: {
        category: "SMP / MTS",
        title: "ROHIS",
        desc: "Syiar kreatif melalui Kaligrafi, Tartil Quran, dan Pidato Islami. Gabungkan iman dengan seni digital.",
        price: "Rp 25.000",
        divisi: "SE-BALI",
        icon: "🕌",
        color: "#467474",
        link: "/src/pages/lomba-rohis.html"
    }
};

// Fungsi untuk menampilkan detail lomba berdasarkan kunci (it, robot, dll)
function showComp(key) {
    // 1. Ambil data dari objek competitionData
    const data = competitionData[key];

    // 2. Navigasi Tombol: Matikan semua, nyalakan yang dipilih
    const allButtons = document.querySelectorAll('.comp-nav-btn');
    allButtons.forEach(function(btn) {
        btn.classList.remove('active');
    });

    const activeBtn = document.getElementById('btn-' + key);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // 3. Target elemen yang akan dianimasikan
    const contentArea = document.getElementById('comp-content');
    const actionButtons = document.getElementById('comp-buttons');
    const displayFrame = document.getElementById('comp-display');

    // 4. Buat Timeline GSAP
    // overwrite: true berfungsi membatalkan animasi sebelumnya jika user klik tombol lain dengan cepat
    const tl = gsap.timeline({ overwrite: true });

    // TAHAP A: Sembunyikan konten lama
    tl.to([contentArea, actionButtons], {
        opacity: 0,           // Menghilang
        y: 10,                // Turun sedikit ke bawah
        duration: 0.2,        // Cepat saja (0.2 detik)
        ease: "power2.in",    // Gerakan melambat di akhir
        onComplete: function() {
            // TAHAP B: Ganti semua isi teks & link saat konten tidak terlihat
            document.getElementById('comp-category').innerText = data.category;
            document.getElementById('comp-category').style.color = data.color;
            document.getElementById('comp-category').style.borderColor = data.color + "55";

            document.getElementById('comp-title').innerText = data.title;
            document.getElementById('comp-desc').innerText = data.desc;
            document.getElementById('comp-price').innerText = data.price;
            document.getElementById('comp-divisi').innerText = data.divisi;
            // document.getElementById('comp-icon').innerText = data.icon;
            document.getElementById('comp-link').href = data.link;

            // TAHAP C: Ubah warna cahaya (glow) bingkai luar secara halus
            gsap.to(displayFrame, {
                boxShadow: "inset 0 0 100px " + data.color + "11",
                borderColor: data.color + "33",
                duration: 0.5
            });
        }
    });

    // TAHAP D: Munculkan kembali konten yang sudah diganti
    tl.to([contentArea, actionButtons], {
        opacity: 1,           // Muncul kembali
        y: 0,                 // Kembali ke posisi asli
        duration: 0.5,        // Sedikit lebih lambat agar elegan
        stagger: 0.1,         // Judul muncul duluan, baru tombol (efek mengalir)
        ease: "power3.out"    // Gerakan halus di awal
    });
}

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
