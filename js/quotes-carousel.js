// Quotes Carousel Functionality
let currentSlide = 1; // Start on Design Philosophy (slide 1)
const totalSlides = 3;
let touchStartX = 0;
let touchEndX = 0;

function updateCarousel() {
    const slides = document.getElementById('quote-slides');
    const dots = document.querySelectorAll('.quote-dot');
    
    if (slides) {
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Update dots
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.remove('bg-slate-200');
            dot.classList.add('bg-purple-accent');
            dot.style.transform = 'scale(1.2)';
        } else {
            dot.classList.remove('bg-purple-accent');
            dot.classList.add('bg-slate-200');
            dot.style.transform = 'scale(1)';
        }
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Touch/Swipe functionality
function initSwipe() {
    const carousel = document.getElementById('quote-carousel');
    if (!carousel) return;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });
    
    // Mouse drag support
    let isDragging = false;
    let startX = 0;
    
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        carousel.style.cursor = 'grabbing';
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    carousel.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        carousel.style.cursor = 'grab';
        const endX = e.clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
    
    carousel.addEventListener('mouseleave', () => {
        isDragging = false;
        carousel.style.cursor = 'grab';
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// Auto-play (optional - can be removed if not needed)
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('quote-carousel');
    if (carousel) {
        // Ensure slides are properly set up
        const slides = document.getElementById('quote-slides');
        if (slides) {
            // Set initial position to show Design Philosophy (slide 1)
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        initSwipe();
        updateCarousel();
        
        // Pause auto-play on hover (if auto-play is enabled)
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', () => {
            // Only start if auto-play was enabled
            // startAutoPlay();
        });
    }
});

