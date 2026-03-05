// Star Generation for Hero Section
function createStars() {
    const container = document.getElementById('stars-container');
    if (!container) return;
    const starCount = 50; // Optimized for performance

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const size = Math.random() * 3;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 5;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.animationDelay = `${delay}s`;

        container.appendChild(star);
    }
}

// Countdown Timer (Toward Maghrib - Approx 17:45)
function updateCountdown() {
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!hoursEl || !minutesEl || !secondsEl) return;

    try {
        const now = new Date();
        const maghrib = new Date();
        maghrib.setHours(17, 45, 0, 0);

        if (now > maghrib) {
            maghrib.setDate(maghrib.getDate() + 1);
        }

        const diff = maghrib - now;
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        hoursEl.innerText = h.toString().padStart(2, '0');
        minutesEl.innerText = m.toString().padStart(2, '0');
        secondsEl.innerText = s.toString().padStart(2, '0');
    } catch (err) {
        console.error("Timer error:", err);
    }
}

// Menu Filtering
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('#menu-grid > .glass-card'); // Fixed Selector

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // UI Toggle for Buttons
            filterButtons.forEach(b => {
                b.classList.remove('bg-sage_primary', 'text-white');
                b.classList.add('border-sage_primary', 'text-sage_primary');
            });

            btn.classList.add('bg-sage_primary', 'text-white');
            btn.classList.remove('border-sage_primary', 'text-sage_primary');

            const filter = btn.getAttribute('data-filter');

            menuItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    // Trigger reflow for fade in
                    void item.offsetWidth;
                    item.style.opacity = '1';
                } else {
                    item.style.opacity = '0';
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Navigation & Mobile Menu
function initNav() {
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;

            // Only prevent default if it's an internal link (not WA)
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
        const openFunc = (e) => {
            e.stopPropagation();
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.style.pointerEvents = 'auto';
            mobileMenu.style.visibility = 'visible';
            document.body.style.overflow = 'hidden';
        };

        const closeFunc = () => {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.style.pointerEvents = 'none';
            mobileMenu.style.visibility = 'hidden';
            document.body.style.overflow = '';
        };

        mobileMenuBtn.addEventListener('click', openFunc);
        closeMenuBtn.addEventListener('click', closeFunc);
        mobileLinks.forEach(link => link.addEventListener('click', closeFunc));

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeFunc();
            }
        });
    }

    // Sticky Header Effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (nav) {
            if (window.scrollY > 20) {
                nav.classList.add('shadow-md', 'backdrop-blur-lg');
            } else {
                nav.classList.remove('shadow-md', 'backdrop-blur-lg');
            }
        }
    });
}

// Run All
document.addEventListener('DOMContentLoaded', () => {
    // 1. Timer needs to start FIRST and immediately
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 2. Initialize other UI
    try {
        createStars();
        initFilters();
        initNav();
    } catch (err) {
        console.error("UI Init Error:", err);
    }
});
