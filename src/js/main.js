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

// Animasi Ornamen Pojok (Parallax Effect)
gsap.to(".absolute img", {
    scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        scrub: 1 // Mengikuti scroll
    },
    y: -50,
    rotation: 10,
    ease: "none"
});

// Animasi Text Reveal
gsap.from("#about h4, #about p, #about .flex", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
    },
    opacity: 0,
    x: 50,
    duration: 1,
    stagger: 0.2, // Muncul satu-satu
    ease: "power2.out"
});

const competitionData = {
    it: {
        category: "SMP / MTS",
        title: "IT (WEP)",
        desc: "Uji kemahiranmu dalam mengelola data dan presentasi menggunakan ekosistem Microsoft Office. Kecepatan dan ketepatan adalah kuncinya.",
        price: "IDR 75K",
        icon: "💻",
        color: "#17468B",
        link: "/src/pages/lomba-it.html" // Mengarah ke halaman detail
    },
    robot: {
        category: "UMUM",
        title: "ROBOTIK",
        desc: "Bangun robot sumomu, atur strategi terbaik, dan dorong lawan keluar arena. Pertarungan fisik dan otak dimulai di sini.",
        price: "IDR 150K",
        icon: "🤖",
        color: "#D12E17",
        link: "/src/pages/lomba-robotik.html"
    },
    art: {
        category: "SD - SMP",
        title: "KESENIAN",
        desc: "Lestarikan budaya Bali melalui Tari Tradisional, Sketsa Ogoh-ogoh, atau tunjukkan bakat desainmu di Poster Digital.",
        price: "IDR 50K+",
        icon: "🎨",
        color: "#D17417",
        link: "/src/pages/lomba-kesenian.html"
    },
    rohis: {
        category: "SMP / MTS",
        title: "ROHIS",
        desc: "Syiar kreatif melalui Kaligrafi, Tartil Quran, dan Pidato Islami. Gabungkan iman dengan seni digital.",
        price: "IDR 25K",
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
