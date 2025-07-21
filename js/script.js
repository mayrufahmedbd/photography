document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
        
        // Animate links
        navItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Sample gallery data (in a real app, this might come from an API)
    const galleryData = [
        { id: 1, category: 'wedding', imgUrl: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80' },
        { id: 2, category: 'portrait', imgUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80' },
        { id: 3, category: 'event', imgUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { id: 4, category: 'nature', imgUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1556&q=80' },
        { id: 5, category: 'wedding', imgUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { id: 6, category: 'portrait', imgUrl: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80' },
        { id: 7, category: 'event', imgUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { id: 8, category: 'nature', imgUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80' },
        { id: 9, category: 'wedding', imgUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80' }
    ];

    // Function to render gallery items
    function renderGallery(items) {
        const gallery = document.querySelector('.gallery');
        gallery.innerHTML = '';
        
        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${item.category}`;
            galleryItem.innerHTML = `
                <img src="${item.imgUrl}" alt="${item.category} photo">
                <div class="overlay">
                    <i class="fas fa-search"></i>
                </div>
            `;
            gallery.appendChild(galleryItem);
        });
    }

    // Initial render
    renderGallery(galleryData);

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            if (filter === 'all') {
                renderGallery(galleryData);
            } else {
                const filteredItems = galleryData.filter(item => item.category === filter);
                renderGallery(filteredItems);
            }
        });
    });

    // Form submission
    // const contactForm = document.querySelector('.contact-form');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
    //         alert('Thank you for your message! We will get back to you soon.');
    //         this.reset();
    //     });
    // }

    // Sticky header on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });
});



// achivment section

// Animate achievement statistics counting
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // Animation duration in ms
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                clearInterval(counter);
                current = target;
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Initialize when achievements section is in view
const achievementsSection = document.querySelector('.achievements');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (achievementsSection) {
    observer.observe(achievementsSection);
}

// footer


// Footer Animation
const footer = document.querySelector('.footer');
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            footer.classList.add('animate');
            footerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

if (footer) {
    footerObserver.observe(footer);
}

// Set current year in copyright
document.getElementById('year').textContent = new Date().getFullYear();

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitButton = this.querySelector('button');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            this.reset();
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
            }, 2000);
        }, 1500);
    });
}