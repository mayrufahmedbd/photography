document.addEventListener('DOMContentLoaded', function () {
    // ============================
    // Mobile Navigation
    // ============================
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
        navItems.forEach((link, index) => {
            link.style.animation = link.style.animation ? '' : `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        });
    });

    // ============================
    // Portfolio Gallery
    // ============================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gallery = document.querySelector('.gallery');

    async function fetchGalleryData() {
        const res = await fetch('gallery.json');
        return await res.json();
    }

    function renderGallery(items) {
        gallery.innerHTML = '';
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = `gallery-item`;
            div.setAttribute('data-category', item.category);
            div.innerHTML = `
                <a href="${item.imgUrl}" data-title="${item.title}">
                    <img src="${item.thumbnail}" loading="lazy" alt="${item.title}">
                </a>
                <p>${item.title}</p>
            `;
            gallery.appendChild(div);
        });
    }

    fetchGalleryData().then(data => {
        renderGallery(data);

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filtered =
                    btn.dataset.filter === 'all'
                        ? data
                        : data.filter(d => d.category === btn.dataset.filter);

                renderGallery(filtered);
                updateGalleryLinks(); // refresh links after filter
            });
        });
    });

    // ============================
    // Achievement Stats Animation
    // ============================
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let current = 0;
            const step = target / (2000 / 16);

            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }

    const achievementsSection = document.querySelector('.achievements');
    const achievementsSectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                achievementsSectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    achievementsSectionObserver.observe(achievementsSection);

    // ============================
    // Footer Animation
    // ============================
    const footer = document.querySelector('.footer');
    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.classList.add('animate');
            }
        });
    }, { threshold: 0.1 }).observe(footer);

    // ============================
    // Set Current Year
    // ============================
    document.getElementById('year').textContent = new Date().getFullYear();
});

// ============================
// Full Page Loader
// ============================
window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');

    loader.style.display = 'none';
    content.style.display = 'block';
});

// =============================================================
// ⭐ FULLSCREEN CUSTOM LIGHTBOX + COLORFUL LOADER
// =============================================================
let lightbox = document.querySelector('.lightbox');
if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-loader"></div>
        <span class="lightbox-close">&times;</span>
        <img src="" alt="">
    `;
    document.body.appendChild(lightbox);
}

const lightboxImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.lightbox-close');
const loaderSpinner = lightbox.querySelector('.lightbox-loader');

let scrollY = 0;

// ============================
// OPEN LIGHTBOX
// ============================
document.body.addEventListener('click', e => {
    const link = e.target.closest('.gallery-item a');
    if (link) {
        e.preventDefault();

        updateGalleryLinks(); // update index list

        scrollY = window.scrollY;
        currentIndex = galleryLinks.indexOf(link);

        loaderSpinner.style.display = 'block';
        lightboxImg.style.opacity = '0';

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        showImageByIndex(currentIndex);
    }
});

// ============================
// CLOSE LIGHTBOX
// ============================
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    window.scrollTo(0, scrollY);
}

closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
});

window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});

// =============================================================
// ⭐ IMAGE SLIDING WITH ARROWS + KEYBOARD + SWIPE
// =============================================================
let galleryLinks = [];
let currentIndex = 0;

function updateGalleryLinks() {
    galleryLinks = Array.from(document.querySelectorAll('.gallery-item a'));
}

// Add arrows
const prevBtn = document.createElement('div');
prevBtn.className = 'lightbox-prev';
prevBtn.innerHTML = '&#10094;';

const nextBtn = document.createElement('div');
nextBtn.className = 'lightbox-next';
nextBtn.innerHTML = '&#10095;';

lightbox.appendChild(prevBtn);
lightbox.appendChild(nextBtn);

// Load image
function showImageByIndex(index) {
    if (index < 0) index = galleryLinks.length - 1;
    if (index >= galleryLinks.length) index = 0;

    currentIndex = index;

    const imgUrl = galleryLinks[index].href;

    loaderSpinner.style.display = 'block';
    lightboxImg.style.opacity = '0';

    const temp = new Image();
    temp.src = imgUrl;

    temp.onload = () => {
        lightboxImg.src = imgUrl;
        loaderSpinner.style.display = 'none';
        lightboxImg.style.opacity = '1';
    };
}

// Arrow click
nextBtn.addEventListener('click', () => showImageByIndex(currentIndex + 1));
prevBtn.addEventListener('click', () => showImageByIndex(currentIndex - 1));

// Keyboard arrows
window.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'ArrowRight') showImageByIndex(currentIndex + 1);
    if (e.key === 'ArrowLeft') showImageByIndex(currentIndex - 1);
});

// Mobile swipe
let startX = 0;

lightbox.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

lightbox.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
        showImageByIndex(currentIndex + 1); // swipe left
    } else if (endX - startX > 50) {
        showImageByIndex(currentIndex - 1); // swipe right
    }
});
