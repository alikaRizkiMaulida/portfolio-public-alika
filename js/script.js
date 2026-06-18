// Portfolio Gallery
const portfolioGrid = document.getElementById('portfolio-grid');
const projectData = [
    { cat: "mobile", img: "img/app-1.png", title: "My Reminder App (Ui Flutter)", desc: "Pengembangan antarmuka (UI) aplikasi Reminder yang modern dan responsif menggunakan Flutter, dengan implementasi GetX sebagai State Management untuk alur data yang efisien.", label: "UI Design" },
    { cat: "web", img: "img/web-1.png", title: "OfficeLink Website", desc: "Perancangan Landing Page profesional untuk platform presensi karyawan 'OfficeLink', fokus pada user experience (UX) untuk memudahkan manajemen kehadiran karyawan perusahaan.", label: "User Experience" },
    { cat: "iot", img: "img/image-1.jpg", title: "LED IOT Arduino", desc: "Eksperimen sistem kendali lampu jarak jauh berbasis IoT menggunakan mikrokontroler Arduino, mencakup perancangan rangkaian listrik dan logika pemrograman LED.", label: "Mikrocontroller Arduino" },
    { cat: "uiux", img: "img/web-3.png", title: "Portfolio design", desc: "Proses desain visual dan penyusunan struktur portofolio UI/UX yang mencerminkan identitas profesional, menggunakan prinsip desain modern untuk portofolio digital.", label: "Portfolio Digital" },
    { cat: "iot", img: "img/image-2.jpg", title: "Tempat Sampah Otomatis Arduino", desc: "Inovasi Smart Trash Bin berbasis Arduino Uno yang dilengkapi sensor ultrasonik untuk mendeteksi objek, memungkinkan sistem buka-tutup tutup sampah secara otomatis dan higienis.", label: "Sensor Ultrasonik" },
    { cat: "mobile", img: "img/app-3.png", title: "HafalanQ App", desc: "Aplikasi HafalanQ: Platform manajemen setoran hafalan Quran yang mengintegrasikan Flutter di sisi mobile dan Laravel sebagai backend API untuk sinkronisasi data secara real-time.", label: "Integrasi" },
    { cat: "web", img: "img/features-1.png", title: "AI-Powered Tahfidz Monitoring", desc: "Sistem pemantau hafalan santri yang dikembangkan dengan bantuan AI Tools. Proyek ini adalah bentuk problem solving untuk efisiensi tracking hafalan sekaligus eksplorasi workflow AI.", label: "AI Implementation" },
];

function renderProjects(filter = "all") {
    const filtered = filter === "all" ? projectData : projectData.filter(p => p.cat === filter);
    let html = '';
    filtered.forEach(p => {
        html += `
        <div class="reveal group relative overflow-hidden rounded-xl bg-slate-900 border border-white/5 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 shadow-lg">
            <div class="aspect-video bg-slate-800">
                <img src="${p.img}" alt="Project" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition">
            </div>
            <div class="p-5">
                <h4 class="font-bold text-lg mb-1">${p.title}</h4>
                <p class="text-slate-400 text-sm">${p.desc}</p>
                <div class="mt-4 flex gap-2">
                    <span class="text-[10px] uppercase tracking-wider text-purple-400 border border-purple-400/30 px-2 py-0.5 rounded">${p.label}</span>
                </div>
            </div>
        </div>
        `;
    });
    portfolioGrid.innerHTML = html;
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
    });
});

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
