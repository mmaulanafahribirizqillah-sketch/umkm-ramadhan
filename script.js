// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: false,
    mirror: true
});

// Remove Loading Screen
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loading');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 500); // Reduced delay
    }
});

// Star Generation for Hero Section
function createStars() {
    const container = document.getElementById('stars-container');
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
    const now = new Date();
    const maghrib = new Date();

    // Set target to today at 17:45
    maghrib.setHours(17, 45, 0, 0);

    // If it's already past maghrib, set to tomorrow
    if (now > maghrib) {
        maghrib.setDate(maghrib.getDate() + 1);
    }

    const diff = maghrib - now;

    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('hours').innerText = h.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
}

// Menu Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('#menu-grid > div');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(b => {
            b.classList.remove('bg-gold', 'text-navy_deep');
            b.classList.add('border', 'border-gold', 'text-gold');
        });

        // Add active class to clicked button
        btn.classList.add('bg-gold', 'text-navy_deep');
        btn.classList.remove('border', 'border-gold', 'text-gold');

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

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return; // Ignore empty anchors

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

// Sticky Nav Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('py-2', 'bg-navy_deep/95');
        nav.classList.remove('py-4', 'bg-navy_deep/80');
    } else {
        nav.classList.add('py-4', 'bg-navy_deep/80');
        nav.classList.remove('py-2', 'bg-navy_deep/95');
    }
});

// Initialize Functions
createStars();
setInterval(updateCountdown, 1000);
updateCountdown();

// WhatsApp Order Logic
function orderProduct(name, price) {
    const phoneNumber = "6282139042221"; // Ganti dengan nomor Buk Ayu yang sebenarnya
    const message = `Halo Buk Ayu, saya ingin memesan:\n\n*Produk:* ${name}\n*Harga:* ${price}\n\nMohon informasi selanjutnya. Terima kasih!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

// General WhatsApp Order (Non-specific product)
function generalOrder() {
    const phoneNumber = "6282139042221";
    const message = `Halo Buk Ayu, saya ingin tanya-tanya tentang menu takjil hari ini.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

// Add listeners to general CTA buttons
document.querySelectorAll('.btn-wa').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        generalOrder();
    });
});

// Add event listeners to all menu cards and package cards
document.querySelectorAll('.glass-card').forEach(card => {
    // Check if it's a menu/promo card by looking for a heading
    const heading = card.querySelector('h3, h4');
    if (!heading) return;

    // Skip cards that are not products (like filter buttons if they used the class, but they don't)
    // Actually, only cards in #menu and #promo should be clickable
    if (!card.closest('#menu') && !card.closest('#promo') && !card.closest('#testimoni')) return;

    // We don't want testimonial cards to be clickable for ordering
    if (card.closest('#testimoni')) return;

    card.classList.add('cursor-pointer');
    card.addEventListener('click', function (e) {
        const name = heading.innerText;
        // Search for price in specific classes used in the project
        const priceElement = card.querySelector('.text-gold.font-bold, .text-xl.font-bold, span.text-gold');
        const price = priceElement ? priceElement.innerText : "Harga via Chat";

        orderProduct(name, price);
    });
});
// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });

    const closeMenu = () => {
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = ''; // Restore scrolling
    };

    closeMenuBtn.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}
