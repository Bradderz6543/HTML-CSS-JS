// Image hover effect code (for index.html)
const mainImage = document.getElementById('mainImage');
if (mainImage) {
    const notDeadImagePath = 'Images/notdead.gif';
    const wheelchairImagePath = 'Images/wheelchair.jpg';

    mainImage.addEventListener('mouseover', () => {
        mainImage.src = wheelchairImagePath;
    });

    mainImage.addEventListener('mouseout', () => {
        mainImage.src = notDeadImagePath;
    });

    // Added touch events as well from original index.html
    mainImage.addEventListener('touchstart', () => {
        mainImage.src = wheelchairImagePath;
    });

    mainImage.addEventListener('touchend', () => {
        mainImage.src = notDeadImagePath;
    });
}

// Modern Slideshow Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicatorsContainer = document.querySelector('.slide-indicators');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds

    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('slide-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.slide-indicator');

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }


    function nextSlide() {
        let newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
    }


    function prevSlide() {
        let newIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(newIndex);
    }


    function goToSlide(index) {
        showSlide(index);
        resetInterval();
    }


    function startInterval() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }


    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });


    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        }
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const slideshow = document.querySelector('.slideshow');

    slideshow.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    slideshow.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance to consider it a swipe
        const swipeDistance = touchStartX - touchEndX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
            resetInterval();
        }
    }


    // Initialize
    showSlide(0);
    startInterval();
});

// Force desktop mode based on cookie (existing code, ensure it doesn't conflict)
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var viewMode = getCookie("view-mode");
var viewport = document.querySelector('meta[name="viewport"]');

if (viewMode && viewport) { // Added checks for existence
    if (viewMode == "desktop") {
        viewport.setAttribute('content', 'width=1024');
    } else if (viewMode == "mobile") {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
}

// Back to Top Button Functionality (Updated)
const backToTopButton = document.querySelector('.back-to-top-button');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) { // Show after 100px scroll
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll
        });
    });
}

// Header behavior - only show when at the very top of the page
const siteHeader = document.querySelector('.site-header');
const smallScreenMaxWidth = 768; // Matches CSS media query
const topThreshold = 50; // Reduced threshold for better UX
let ticking = false;

if (siteHeader) {
    function updateHeaderVisibility() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        if (window.innerWidth <= smallScreenMaxWidth) {
            // Only show header when at the very top of the page
            if (scrollPosition <= 0) {
                siteHeader.classList.remove('header-hidden');
            } else {
                siteHeader.classList.add('header-hidden');
            }
        } else {
            // Always show header on larger screens
            siteHeader.classList.remove('header-hidden');
        }
        
        ticking = false;
    }
    
    // Throttle scroll events for better performance
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeaderVisibility);
            ticking = true;
        }
    });
    
    // Handle resize events
    window.addEventListener('resize', function() {
        if (window.innerWidth > smallScreenMaxWidth) {
            siteHeader.classList.remove('header-hidden');
        }
    });
    
    // Initial check
    updateHeaderVisibility();
}