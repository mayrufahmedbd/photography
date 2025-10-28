document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation
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

    // Portfolio
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
                <a href="${item.imgUrl}" data-lightbox="gallery" data-title="${item.title}">
                    <img src="${item.imgUrl}"loading="lazy" alt="${item.title}">
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
                const filtered = btn.dataset.filter === 'all' ? data : data.filter(d => d.category === btn.dataset.filter);
                renderGallery(filtered);
            });
        });
    });

    // Achievements stats
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let current = 0;
            const step = target / (2000 / 16);
            const counter = setInterval(() => {
                current += step;
                if (current >= target) { current = target; clearInterval(counter); }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }

    const achievementsSection = document.querySelector('.achievements');
    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                achievementsSectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }).observe(achievementsSection);

    // Footer animation
    const footer = document.querySelector('.footer');
    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.classList.add('animate');
            }
        });
    }, { threshold: 0.1 }).observe(footer);

    // Current year
    document.getElementById('year').textContent = new Date().getFullYear();
});



// Loader functionality
// Wait for the page to fully load
window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');

    // Hide the loader
    loader.style.display = 'none';

    // Show the content
    content.style.display = 'block';
});



















// --- Fullscreen Custom Lightbox with Scroll Lock Fix (Final Stable Version) ---

// Create lightbox once
let lightbox = document.querySelector('.lightbox');
if (!lightbox) {
  lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `<span class="lightbox-close">&times;</span><img src="" alt="">`;
  document.body.appendChild(lightbox);
}

const lightboxImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.lightbox-close');

let scrollY = 0; // store scroll position

// --- Open Lightbox ---
document.body.addEventListener('click', e => {
  const link = e.target.closest('.gallery-item a');
  if (link) {
    e.preventDefault();

    const imgUrl = link.href;
    lightboxImg.src = imgUrl;
    lightbox.classList.add('active');

    // Save current scroll position
    scrollY = window.scrollY;

    // Freeze scroll (without reposition issues)
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'relative';
  }
});

// --- Close Lightbox ---
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  document.body.style.position = '';
  window.scrollTo(0, scrollY);
}

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});
