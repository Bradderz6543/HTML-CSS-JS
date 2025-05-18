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

// Collapsible header on scroll for small screens
const siteHeader = document.querySelector('.site-header');
let lastScrollTop = 0;
const scrollThreshold = 50; // Pixels to scroll before hiding header
const smallScreenMaxWidth = 768; // Matches CSS media query

if (siteHeader) {
    window.addEventListener('scroll', () => {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (window.innerWidth <= smallScreenMaxWidth) {
            if (st > lastScrollTop && st > scrollThreshold) {
                // Scroll Down and past threshold
                siteHeader.classList.add('header-hidden');
            } else if (st < lastScrollTop || st <= scrollThreshold / 2) { // Added a bit of hysteresis or if scrolling up towards top
                // Scroll Up or near the top
                siteHeader.classList.remove('header-hidden');
            }
        } else {
            // Ensure header is visible on larger screens or if conditions not met
            siteHeader.classList.remove('header-hidden');
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }, false);
}