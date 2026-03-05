// Star Generation for Hero Section
function createStars() {
    const container = document.getElementById('stars-container');
    if (!container) return;
    const starCount = 100;

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
}

// Menu Filtering
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('#menu-grid > div');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('bg-sage_primary', 'text-white');
                b.classList.add('border-sage_primary', 'text-sage_primary');
            });

            btn.classList.add('bg-sage_primary', 'text-white');
            btn.classList.remove('border-sage_primary', 'text-sage_primary');

            const filter = btn.getAttribute('data-filter');
            menuItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
}

// WhatsApp Order Logic
function orderProduct(name, price) {
    const phoneNumber = "6282139042221";
    const message = `Halo Buk Ayu, saya ingin memesan:\n\n*Produk:* ${name}\n*Harga:* ${price}\n\nMohon informasi selanjutnya. Terima kasih!`;
    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

function generalOrder() {
    const phoneNumber = "6282139042221";
    const message = `Halo Buk Ayu, saya ingin tanya-tanya tentang menu takjil hari ini.`;
    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

// Navigation & Smooth Scroll
function initNav() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.style.pointerEvents = 'auto';
            mobileMenu.style.visibility = 'visible';
            document.body.style.overflow = 'hidden';
        });

        const closeMenu = () => {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.style.pointerEvents = 'none';
            mobileMenu.style.visibility = 'hidden';
            document.body.style.overflow = '';
        };

        closeMenuBtn.addEventListener('click', closeMenu);
        mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMenu();
            }
        });
    }
}

// Initialize Cards
function initCards() {
    document.querySelectorAll('.glass-card').forEach(card => {
        const heading = card.querySelector('h3, h4');
        if (!heading) return;
        if (card.closest('#testimoni')) return;

        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            const name = heading.innerText;
            const priceElement = card.querySelector('.text-sage_primary.font-bold, .text-xl.font-bold');
            const price = priceElement ? priceElement.innerText : "Harga via Chat";
            orderProduct(name, price);
        });
    });

    document.querySelectorAll('.btn-wa').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            generalOrder();
        });
    });
}

// Initial Run
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    initFilters();
    initNav();
    initCards();
    updateCountdown();
    setInterval(updateCountdown, 1000);
});
