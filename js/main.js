// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out',
        delay: 0
    });
    
    // Apply secondary navbar on all pages except index.html
    const currentPage = window.location.pathname;
    const navbar = document.querySelector('.navbar');
    
    // Check if we're not on index.html or / (root)
    if (!(currentPage.endsWith('index.html') || currentPage === '/' || currentPage.endsWith('/'))) {
        navbar.classList.add('secondary-navbar');
    }
    
    // Initialize all features
    initScrollEvents();
    initCounterAnimation();
    initAboutPageAnimations();
    initParticles();
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize contact form
    initContactForm();
    
    // Initialize products functions
    if (document.querySelector('.products-filter')) {
        initProductsFilter();
        initProductModal();
        initLoadMore();
    }
    
    // Initialize enhanced product modal functionality
    enhanceProductModals();
    
    // Create space environment
    initSpaceEnvironment();
    
    initEnhancedAnimations();
    initEnhancedHoverEffects();
    initEnhancedButtonEffects();
    
    // Enhanced scroll behavior
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallaxElements = document.querySelectorAll('.hero-particles');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});

// Scroll Events
function initScrollEvents() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active nav item on scroll
        let current = '';
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            }
        });
    });
    
    // Back to top button click event
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.innerText);
                let count = 0;
                
                const updateCount = () => {
                    const increment = target / speed;
                    
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCount();
                observer.unobserve(counter);
            }
        });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject')?.value.trim() || '';
            const message = document.getElementById('message').value.trim();
            const phone = document.getElementById('phone')?.value.trim() || '';
            const service = document.getElementById('service')?.value || '';
            
            // Basic validation
            if (name === '' || email === '' || message === '') {
                showFormAlert('Please fill in all required fields', 'danger');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormAlert('Please enter a valid email address', 'danger');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...`;
            
            // Here you would typically make an AJAX call to send the form data to your server
            // For this demo, we'll simulate a successful submission after a short delay
            setTimeout(function() {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                showFormAlert('Your message has been sent successfully! We will get back to you soon.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
}

// Particle animation for hero section
function initParticles() {
    const heroSection = document.querySelector('.hero-section');
    const particlesContainer = document.querySelector('.hero-particles');
    
    if (!particlesContainer) return;
    
    // Clear any existing particles first
    particlesContainer.innerHTML = '';
    
    // Create static particles
    const staticParticleCount = window.innerWidth < 768 ? 15 : 30;
    for (let i = 0; i < staticParticleCount; i++) {
        createStaticParticle(particlesContainer);
    }
    
    // Add larger moving dots
    const largeMovingDotsCount = window.innerWidth < 768 ? 8 : 15;
    for (let i = 0; i < largeMovingDotsCount; i++) {
        createMovingDot(particlesContainer);
    }
    
    // Add medium-sized moving dots
    const mediumMovingDotsCount = window.innerWidth < 768 ? 6 : 10;
    for (let i = 0; i < mediumMovingDotsCount; i++) {
        createMediumMovingDot(particlesContainer);
    }
    
    // Rerun on window resize with debounce
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            initParticles();
        }, 250);
    });
}

function createStaticParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 80; // Keep particles in the top 80% to avoid wave overlap
    
    // Random size but generally smaller
    const size = Math.random() * 4 + 1; // 1-5px
    
    // Random opacity - reduced overall
    const opacity = Math.random() * 0.3 + 0.1; // 0.1-0.4
    
    // Apply styles
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = opacity;
    
    container.appendChild(particle);
}

function createMovingDot(container) {
    const dot = document.createElement('div');
    dot.classList.add('particle', 'moving-dot');
    
    // Random position - concentrated more in the upper area
    const posX = Math.random() * 100;
    const posY = Math.random() * 60; // Keep larger dots in the top 60% for better visibility
    
    // Larger size
    const size = Math.random() * 6 + 6; // 6-12px
    
    // Higher opacity for visibility
    const opacity = Math.random() * 0.3 + 0.3; // 0.3-0.6
    
    // Animation duration and delay
    const duration = Math.random() * 20 + 25; // 25-45s - very slow
    const delay = Math.random() * 10;
    
    // Apply styles
    dot.style.left = `${posX}%`;
    dot.style.top = `${posY}%`;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.opacity = opacity;
    dot.style.animationDuration = `${duration}s`;
    dot.style.animationDelay = `${delay}s`;
    
    container.appendChild(dot);
}

function createMediumMovingDot(container) {
    const dot = document.createElement('div');
    dot.classList.add('particle', 'medium-dot');
    
    // Random position - spread throughout the hero section
    const posX = Math.random() * 100;
    const posY = Math.random() * 70; // Keep in top 70%
    
    // Medium size
    const size = Math.random() * 3 + 3.5; // 3.5-6.5px
    
    // Medium opacity
    const opacity = Math.random() * 0.2 + 0.2; // 0.2-0.4
    
    // Animation duration and delay - medium speed
    const duration = Math.random() * 15 + 20; // 20-35s
    const delay = Math.random() * 8;
    
    // Apply styles
    dot.style.left = `${posX}%`;
    dot.style.top = `${posY}%`;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.opacity = opacity;
    dot.style.animationDuration = `${duration}s`;
    dot.style.animationDelay = `${delay}s`;
    
    container.appendChild(dot);
}

// Show alert for form
function showFormAlert(message, type) {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    // Remove any existing alerts
    const existingAlert = form.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alert.role = 'alert';
    
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Insert alert before the first form element
    form.insertBefore(alert, form.firstChild);
    
    // Auto dismiss after 5 seconds
    setTimeout(function() {
        if (typeof bootstrap !== 'undefined') {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        } else {
            alert.remove();
        }
    }, 5000);
}

// Products Filter Logic
function initProductsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productsItems = document.querySelectorAll('.products-item-wrapper');
    const productsGrid = document.querySelector('.products-grid');
    
    // Initialize Isotope if available (you may need to add the Isotope library)
    let iso;
    if (typeof Isotope !== 'undefined') {
        iso = new Isotope(productsGrid, {
            itemSelector: '.products-item-wrapper',
            layoutMode: 'fitRows'
        });
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // If using Isotope
            if (iso) {
                if (filterValue === 'all') {
                    iso.arrange({ filter: '*' });
                } else {
                    iso.arrange({ filter: `[data-category*="${filterValue}"]` });
                }
                return;
            }
            
            // Fallback filtering without Isotope
            productsItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(',');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                    // Add animation
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Product Details Modal
function initProductModal() {
    const productsLinks = document.querySelectorAll('.products-details-link');
    const modal = document.getElementById('productsModal');
    
    if (!modal) return;
    
    const modalTitle = modal.querySelector('.project-title');
    const modalCategory = modal.querySelector('.project-category .badge');
    const modalDescription = modal.querySelector('.project-overview p');
    const modalFeatures = modal.querySelector('.feature-list');
    const modalImage = modal.querySelector('.main-image img');
    const thumbnails = modal.querySelectorAll('.thumbnail img');
    const techStack = modal.querySelector('.tech-stack');
    const projectLink = modal.querySelector('.project-cta a');
    
    productsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product item information
            const productsCard = this.closest('.products-card');
            const title = productsCard.querySelector('h3').textContent;
            const image = productsCard.querySelector('.products-img img').getAttribute('src');
            const description = productsCard.querySelector('p').textContent;
            const category = productsCard.closest('.products-item-wrapper').getAttribute('data-category').split(',')[0];
            
            // Set modal content
            modalTitle.textContent = title;
            modalCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            modalDescription.textContent = description;
            modalImage.setAttribute('src', image);
            
            // Set thumbnails (for demo, using same image)
            thumbnails.forEach(thumb => {
                thumb.setAttribute('src', image);
            });
            
            // Example features based on project type
            let featuresHTML = '';
            if (category.includes('pos')) {
                featuresHTML = `
                    <li><i class="bi bi-check-circle-fill"></i> Inventory Management</li>
                    <li><i class="bi bi-check-circle-fill"></i> Sales Analytics</li>
                    <li><i class="bi bi-check-circle-fill"></i> Customer Loyalty Program</li>
                `;
            } else if (category.includes('e-commerce')) {
                featuresHTML = `
                    <li><i class="bi bi-check-circle-fill"></i> Product Catalog</li>
                    <li><i class="bi bi-check-circle-fill"></i> Secure Checkout</li>
                    <li><i class="bi bi-check-circle-fill"></i> Order Tracking</li>
                `;
            } else if (category.includes('enterprise')) {
                featuresHTML = `
                    <li><i class="bi bi-check-circle-fill"></i> Attendance Tracking</li>
                    <li><i class="bi bi-check-circle-fill"></i> Task Management</li>
                    <li><i class="bi bi-check-circle-fill"></i> Payroll Processing</li>
                `;
            } else {
                featuresHTML = `
                    <li><i class="bi bi-check-circle-fill"></i> User-friendly Interface</li>
                    <li><i class="bi bi-check-circle-fill"></i> Responsive Design</li>
                    <li><i class="bi bi-check-circle-fill"></i> Real-time Updates</li>
                `;
            }
            modalFeatures.innerHTML = featuresHTML;
            
            // Example tech stack based on project type
            let techHTML = '';
            if (category.includes('web')) {
                techHTML = `
                    <span class="badge bg-light text-dark">React</span>
                    <span class="badge bg-light text-dark">Node.js</span>
                    <span class="badge bg-light text-dark">MongoDB</span>
                `;
            } else if (category.includes('mobile')) {
                techHTML = `
                    <span class="badge bg-light text-dark">React Native</span>
                    <span class="badge bg-light text-dark">Firebase</span>
                    <span class="badge bg-light text-dark">Redux</span>
                `;
            } else {
                techHTML = `
                    <span class="badge bg-light text-dark">JavaScript</span>
                    <span class="badge bg-light text-dark">PHP</span>
                    <span class="badge bg-light text-dark">MySQL</span>
                `;
            }
            techStack.innerHTML = techHTML;
            
            // Open the modal
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
        });
    });
    
    // Thumbnail click handler
    const thumbnailsElement = modal.querySelectorAll('.thumbnail');
    thumbnailsElement.forEach(thumb => {
        thumb.addEventListener('click', function() {
            thumbnailsElement.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const src = this.querySelector('img').getAttribute('src');
            modalImage.setAttribute('src', src);
        });
    });
}

// Load More Button
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.btn-load-more');
    if (!loadMoreBtn) return;
    
    const productsItems = document.querySelectorAll('.products-item-wrapper');
    const itemsToShow = 6; // Initial number of items to show
    let currentItems = itemsToShow;
    
    // Hide items beyond initial count
    productsItems.forEach((item, index) => {
        if (index >= itemsToShow) {
            item.style.display = 'none';
        }
    });
    
    loadMoreBtn.addEventListener('click', function() {
        // Show next batch of items
        for (let i = currentItems; i < currentItems + itemsToShow; i++) {
            if (productsItems[i]) {
                productsItems[i].style.display = 'block';
                productsItems[i].style.opacity = '0';
                productsItems[i].style.transform = 'translateY(20px)';
                setTimeout(() => {
                    productsItems[i].style.opacity = '1';
                    productsItems[i].style.transform = 'translateY(0)';
                }, 50 * (i - currentItems + 1));
            }
        }
        
        currentItems += itemsToShow;
        
        // Hide button if all items are shown
        if (currentItems >= productsItems.length) {
            this.style.display = 'none';
        }
    });
}

// Back to Top Button
$(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
        $('.back-to-top').addClass('visible');
    } else {
        $('.back-to-top').removeClass('visible');
    }
});

$('.back-to-top').click(function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, 800);
});

// Enhanced Product Modal functionality
function enhanceProductModals() {
    const productsModal = document.getElementById('productsModal');
    if (!productsModal) return;
    
    // Handle the modal close button click
    const closeButton = document.getElementById('modalCloseBtn');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            // Create a loading indicator
            const loadingOverlay = document.createElement('div');
            loadingOverlay.style.position = 'fixed';
            loadingOverlay.style.top = '0';
            loadingOverlay.style.left = '0';
            loadingOverlay.style.width = '100%';
            loadingOverlay.style.height = '100%';
            loadingOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            loadingOverlay.style.display = 'flex';
            loadingOverlay.style.justifyContent = 'center';
            loadingOverlay.style.alignItems = 'center';
            loadingOverlay.style.zIndex = '9999';
            
            const spinner = document.createElement('div');
            spinner.className = 'spinner-border text-primary';
            spinner.setAttribute('role', 'status');
            
            const spinnerText = document.createElement('span');
            spinnerText.className = 'visually-hidden';
            spinnerText.textContent = 'Loading...';
            
            spinner.appendChild(spinnerText);
            loadingOverlay.appendChild(spinner);
            
            // Add the loading overlay to the body after modal closes
            setTimeout(function() {
                document.body.appendChild(loadingOverlay);
                // Refresh the page
                window.location.reload();
            }, 300);
        });
    }
    
    // Handle the modal hidden event
    productsModal.addEventListener('hidden.bs.modal', function(event) {
        // Only refresh if it wasn't already triggered by the close button
        if (!event.clickEvent) {
            window.location.reload();
        }
    });
    
    // Prevent the modal from closing when pressing escape key
    productsModal.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            
            // Manually trigger the close button click
            if (closeButton) {
                closeButton.click();
            }
        }
    });
}

// Initialize animations on about page
function initAboutPageAnimations() {
    // Stagger animations for timeline years
    const timelineYears = document.querySelectorAll('.timeline-year');
    timelineYears.forEach((year, index) => {
        year.setAttribute('data-aos-delay', (index * 100).toString());
    });
    
    // Stagger animations for value cards
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card, index) => {
        card.setAttribute('data-aos-delay', (index * 100).toString());
    });
    
    // Animation for team culture section
    const teamCulture = document.querySelector('.team-culture');
    if (teamCulture) {
        teamCulture.setAttribute('data-aos', 'fade-up');
        teamCulture.setAttribute('data-aos-delay', '300');
    }
}

// Create space elements
function createSpaceElements() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    // Create stars with twinkling effect
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(star);
    }

    // Create asteroids
    for (let i = 0; i < 8; i++) {
        const asteroid = document.createElement('div');
        asteroid.className = 'asteroid';
        const size = Math.random() * 30 + 20;
        asteroid.style.width = size + 'px';
        asteroid.style.height = size + 'px';
        asteroid.style.left = Math.random() * 100 + '%';
        asteroid.style.animationDuration = (Math.random() * 4 + 3) + 's';
        container.appendChild(asteroid);
    }

    // Create meteors
    for (let i = 0; i < 5; i++) {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        meteor.style.top = Math.random() * 100 + '%';
        meteor.style.left = Math.random() * 100 + '%';
        meteor.style.animationDuration = (Math.random() * 2 + 1) + 's';
        meteor.style.animationDelay = (Math.random() * 3) + 's';
        container.appendChild(meteor);
    }
}

// Create footer animations
function createFooterAnimations() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    // Create footer particles container if it doesn't exist
    let footerParticles = footer.querySelector('.footer-particles');
    if (!footerParticles) {
        footerParticles = document.createElement('div');
        footerParticles.className = 'footer-particles';
        footer.insertBefore(footerParticles, footer.firstChild);
    }

    // Create stars
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'footer-star';
        star.style.width = Math.random() * 2 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        footerParticles.appendChild(star);
    }

    // Create meteors
    for (let i = 0; i < 3; i++) {
        const meteor = document.createElement('div');
        meteor.className = 'footer-meteor';
        meteor.style.top = Math.random() * 100 + '%';
        meteor.style.animationDuration = (Math.random() * 2 + 1) + 's';
        meteor.style.animationDelay = (Math.random() * 3) + 's';
        footerParticles.appendChild(meteor);
    }
}

// Initialize space environment
function initSpaceEnvironment() {
    createSpaceElements();
    createFooterAnimations();
    
    // Recreate elements every 15 seconds
    setInterval(() => {
        const container = document.getElementById('hero-particles');
        const footerParticles = document.querySelector('.footer-particles');
        
        if (container) {
            container.innerHTML = '';
            createSpaceElements();
        }
        
        if (footerParticles) {
            footerParticles.innerHTML = '';
            createFooterAnimations();
        }
    }, 15000);
}

// Enhanced scroll reveal animations
function initEnhancedAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .products-card, .testimonial-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.transform = 'translateY(30px)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

// Enhanced hover effects
function initEnhancedHoverEffects() {
    const cards = document.querySelectorAll('.service-card, .products-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.transform = `perspective(1000px) rotateX(${(y - rect.height/2)/20}deg) rotateY(${-(x - rect.width/2)/20}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// Enhanced button hover effects
function initEnhancedButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });
} 