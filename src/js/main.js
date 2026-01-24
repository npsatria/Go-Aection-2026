// 1. Navbar Effect (Transparan ke Solid saat scroll)
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('py-4');
        navbar.classList.remove('py-6');
    } else {
        navbar.classList.add('py-6');
        navbar.classList.remove('py-4');
    }
});

// 2. Scroll Animation (Simple Fade Up using Intersection Observer)
// Tidak perlu library berat, pakai bawaan browser saja biar ringan
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out');
    observer.observe(el);
});

// 3. Mobile Menu Toggle
const btnMenu = document.getElementById('btn-menu');
const mobileMenu = document.getElementById('mobile-menu');

if(btnMenu){
    btnMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}
