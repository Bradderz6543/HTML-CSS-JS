// Image hover effect code (for index.html)
const mainImage = document.getElementById('mainImage');
if (mainImage) {
    const notDeadImagePath = 'Images/notdead.png';
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
    const slideshow = document.querySelector('.slideshow');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds

    if (slides.length && prevBtn && nextBtn && indicatorsContainer && slideshow) {
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('slide-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });

        const indicators = document.querySelectorAll('.slide-indicator');

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));

            slides[index].classList.add('active');
            indicators[index].classList.add('active');
            currentSlide = index;
        }

        function nextSlide() {
            const newIndex = (currentSlide + 1) % slides.length;
            showSlide(newIndex);
        }

        function prevSlide() {
            const newIndex = (currentSlide - 1 + slides.length) % slides.length;
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

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                nextSlide();
                resetInterval();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
                resetInterval();
            }
        });

        let touchStartX = 0;
        let touchEndX = 0;

        slideshow.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        slideshow.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);

        function handleSwipe() {
            const swipeThreshold = 50;
            const swipeDistance = touchStartX - touchEndX;

            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                resetInterval();
            }
        }

        showSlide(0);
        startInterval();
    }

    const themeButton = document.getElementById('theme-button');
    if (themeButton) {
        let isLightTheme = document.body.classList.contains('light-theme');

        const applyThemeIcon = () => {
            themeButton.classList.toggle('fa-sun', isLightTheme);
            themeButton.classList.toggle('fa-moon', !isLightTheme);
            themeButton.setAttribute('aria-pressed', isLightTheme ? 'true' : 'false');
        };

        applyThemeIcon();

        themeButton.addEventListener('click', () => {
            isLightTheme = !isLightTheme;
            document.body.classList.toggle('light-theme', isLightTheme);
            try {
                localStorage.setItem('selected-theme', isLightTheme ? 'light' : 'dark');
            } catch (error) {
                // Ignore storage failures in privacy-restricted environments.
            }
            applyThemeIcon();
        });

        themeButton.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                themeButton.click();
            }
        });
    }
});

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
