// Portfolio Gallery
const paginationNav = document.getElementById('paginationNav');
const portfolioGrid = document.getElementById('portfolio-grid');
const projectData = [
    { cat: "mobile", img: "img/app-1.png", title: "My Reminder App (Ui Flutter)", desc: "Development of a modern and responsive Reminder application interface (UI) using Flutter, with GetX implementation as State Management for efficient data flow.", label: "UI Design" },
    { cat: "web", img: "img/web-1.png", title: "OfficeLink Website", desc: "Development of a professional Landing Page for the 'OfficeLink' employee attendance platform, focusing on user experience (UX) to facilitate company employee attendance management.", label: "User Experience" },
    { cat: "iot", img: "img/image-1.jpg", title: "LED IOT Arduino", desc: "Experimentation with a remote-controlled light system based on IoT using an Arduino microcontroller, including electrical circuit design and LED programming logic.", label: "Mikrocontroller Arduino" },
    { cat: "uiux", img: "img/web-3.png", title: "Portfolio design", desc: "Visual design process and structuring of a UI/UX portfolio that reflects a professional identity, utilizing modern design principles for a digital portfolio.", label: "Portfolio Digital" },
    { cat: "iot", img: "img/image-2.jpg", title: "Arduino Auto Trash", desc: "Innovation of a Smart Trash Bin based on Arduino Uno equipped with ultrasonic sensors to detect objects, enabling an automatic open-close mechanism for hygienic waste disposal.", label: "Sensor Ultrasonik" },
    { cat: "mobile", img: "img/app-3.png", title: "HafalanQ App", desc: "HafalanQ App: A Quran memorization management platform that integrates Flutter on the mobile side and Laravel as backend API for real-time data synchronization.", label: "Integrasi" },
    { cat: "web", img: "img/features-1.png", title: "AI-Powered Tahfidz Monitoring", desc: "Sistem pemantau hafalan santri yang dikembangkan dengan bantuan AI Tools. Proyek ini adalah bentuk problem solving untuk efisiensi tracking hafalan sekaligus eksplorasi workflow AI.", label: "AI Implementation" },
];

let currentPage = 1;
const projectPerPage = 3;
let currentFilter = "all";

function applyRevealEffect() {
    try {
        if (typeof observer !== 'undefined') {
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        }
    } catch (e) {
        document.querySelectorAll('.reveal').forEach(el => {
            el.style.opacity = "1";
            el.style.transform = "none";
        });
    }
}

function renderProjects() {
    if (typeof projectData === 'undefined' || !Array.isArray(projectData)) {
        console.error("Variabel 'projectData' belum ada atau bukan Array!");
        portfolioGrid.innerHTML = `<p class="text-slate-400 text-center col-span-full py-8">Data projek tidak ditemukan.</p>`;
        return;
    }
    const filtered = currentFilter === "all"
        ? projectData
        : projectData.filter(p => p.cat === currentFilter);

    if (filtered.length === 0) {
        portfolioGrid.innerHTML = `<p class="text-slate-400 text-center col-span-full py-8">Tidak ada projek di kategori ini.</p>`;
        if (paginationNav) paginationNav.innerHTML = '';
        return;
    }
    const startIndex = (currentPage - 1) * projectPerPage;
    const endIndex = startIndex + projectPerPage;
    const paginatedProjects = filtered.slice(startIndex, endIndex);

    let html = '';
    paginatedProjects.forEach(p => {
        html += `
        <div class="snap-start shrink-0 w-[80vw] sm:w-[75vw] md:w-auto reveal group relative overflow-hidden rounded-xl bg-slate-900 border border-white/5 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 shadow-lg">
            <div class="aspect-video bg-slate-800">
                <img src="${p.img}" alt="Project" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" loading="lazy">
            </div>
            <div class="p-4 md:p-5">
                <h4 class="font-bold text-base md:text-lg mb-1">${p.title}</h4>
                <p class="text-slate-400 text-xs md:text-sm">${p.desc}</p>
                <div class="mt-3 md:mt-4 flex gap-2">
                    <span class="text-[10px] uppercase tracking-wider text-purple-400 border border-purple-400/30 px-2 py-0.5 rounded">${p.label}</span>
                </div>
            </div>
        </div>
        `;
    });
    portfolioGrid.innerHTML = html;
    applyRevealEffect();
    renderPagination(filtered.length);
}

function renderPagination(totalItems) {
    if (!paginationNav) return;
    const totalPages = Math.ceil(totalItems / projectPerPage);
    paginationNav.innerHTML = '';

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;

        const baseStyle = "px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 border cursor-pointer";
        const activeStyle = "bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/30 font-bold";
        const inactiveStyle = "bg-slate-900 text-slate-400 border-white/10 hover:border-purple-500/50 hover:text-white";

        btn.className = `${baseStyle} ${i === currentPage ? activeStyle : inactiveStyle}`;

        btn.addEventListener('click', () => {
            currentPage = i;
            renderProjects();

            portfolioGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
        paginationNav.appendChild(btn);
    }
}
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        currentPage = 1; // Reset to first page on filter change
        renderProjects();
    });
});

renderProjects();

// CV Modal
const cvBtn = document.getElementById('cv-btn');
const cvModal = document.getElementById('cv-modal');
const cvModalOverlay = document.getElementById('cv-modal-overlay');
const cvModalClose = document.getElementById('cv-modal-close');

if (cvBtn) {
    cvBtn.addEventListener('click', () => {
        cvModal.classList.remove('hidden');
        cvModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    });
    function closeCvModal() {
        cvModal.classList.add('hidden');
        cvModal.classList.remove('flex');
        document.body.style.overflow = '';
    }
    cvModalOverlay.addEventListener('click', closeCvModal);
    cvModalClose.addEventListener('click', closeCvModal);
    cvModal.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeCvModal);
    });
}

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    menuOpen = false;
    menuBtn.innerHTML = '<i data-lucide="menu"></i>';
    lucide.createIcons();
}

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        menuOpen = !menuOpen;
        if (menuOpen) {
            mobileMenu.classList.remove('hidden');
            menuBtn.innerHTML = '<i data-lucide="x"></i>';
        } else {
            mobileMenu.classList.add('hidden');
            menuBtn.innerHTML = '<i data-lucide="menu"></i>';
        }
        lucide.createIcons();
    });
}

// Initialize Lucide Icons
lucide.createIcons();

// Sticky Navbar Glassmorphism Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('py-2');
        nav.querySelector('div').classList.add('shadow-xl');
    } else {
        nav.classList.remove('py-2');
        nav.querySelector('div').classList.remove('shadow-xl');
    }
});

// Typing Effect
const words = ["IoT Enthusiast", "Web Developer", "Problem Solver", "AI Explorer"];
let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIdx];
    if (isDeleting) {
        document.getElementById("typing").textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx == 0) {
            isDeleting = false;
            wordIdx++;
            if (wordIdx == words.length) wordIdx = 0;
        }
    } else {
        document.getElementById("typing").textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx == currentWord.length) {
            isDeleting = true;
            setTimeout(type, 2000);
            return;
        }
    }
    setTimeout(type, isDeleting ? 100 : 150);
}
type();

// Reveal Animation on Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

renderProjects();

// Active Navbar Link update
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});


// Floating WhatsApp Button Visibility
window.addEventListener('scroll', () => {
    const waBtn = document.getElementById('waButton');
    const aboutSection = document.getElementById('about');

    if (aboutSection && waBtn) {
        const aboutPosition = aboutSection.getBoundingClientRect().top;

        if (aboutPosition <= window.innerHeight / 2) {
            // Tampil tombol WA
            waBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-10');
            waBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
        } else {
            // Sembunyikan tombol WA jika kembali ke Hero Section
            waBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-10');
            waBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
        }
    }
});

// Real-time Clock
function updateClock() {
    const now = new Date();

    const optionsDate = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    const dateString = now.toLocaleDateString('en-EN', optionsDate);

    // Format Jam:Menit:Detik (contoh: 14.10.04)
    const timeString = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const clockEl = document.getElementById('realtimeClock');
    const dateEl = document.getElementById('realtimeDate');
    if (clockEl) clockEl.textContent = `${dateString}`;
    if (dateEl) dateEl.textContent = `${timeString}`;

}

updateClock();

setInterval(updateClock, 1000);