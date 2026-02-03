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
    const targetDate = new Date("Feb 7, 2026 23:59:59").getTime();

    const timer = setInterval(function() {
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
            clearInterval(timer);
            const box = document.querySelector(".countdown-container");
            if(box) box.innerHTML = "<span class='text-red-500 font-bold'>PENDAFTARAN DITUTUP</span>";
        }
    }, 1000);

    /* --- 3. ANIMASI GSAP --- */
    if (typeof gsap !== 'undefined') {
        gsap.from(".reveal-left", { x: -30, opacity: 0, duration: 1, ease: "power3.out" });
        gsap.from(".reveal-right", { x: 30, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out" });
    }
});
